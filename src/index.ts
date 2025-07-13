#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { z } from "zod";

// Type definitions for axios
interface AxiosError {
  response?: {
    status: number;
    data?: any;
  };
  request?: any;
  message: string;
}

// API Base URL for Doclasana
const DOCLASANA_API_BASE = "https://api.doclasana.com";

// Type definitions based on the API specification
interface Document {
  id: string;
  filename: string;
  content?: string;
  timestamp?: string;
  fileSize?: number;
  fileType?: string;
  userId?: string;
  ipAddress?: string;
  sessionGuid?: string;
  status?: string;
}

interface SearchDocument {
  documentId: string;
  filename: string;
  content?: string;
  timestamp?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface SearchResult {
  items: SearchDocument[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Validation schemas with transform to handle undefined values
const ListDocumentsArgsSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
}).transform((data: any) => ({
  page: data.page ?? 1,
  pageSize: data.pageSize ?? 20,
}));

const SearchDocumentsArgsSchema = z.object({
  searchTerm: z.string().min(1),
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
}).transform((data: any) => ({
  searchTerm: data.searchTerm,
  page: data.page ?? 1,
  pageSize: data.pageSize ?? 20,
}));

const GetDocumentArgsSchema = z.object({
  id: z.string().min(1),
});

class DoclasanaAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      "x-api-key": this.apiKey,
      "Content-Type": "application/json",
    };
  }

  private handleAPIError(error: AxiosError): never {
    if (error.response) {
      const status = error.response.status;
      const message = (error.response.data as any)?.title || error.message;

      switch (status) {
        case 401:
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Authentication failed: ${message}`
          );
        case 404:
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Resource not found: ${message}`
          );
        case 429:
          throw new McpError(
            ErrorCode.InternalError,
            "Too many requests. Please try again later."
          );
        case 500:
          throw new McpError(
            ErrorCode.InternalError,
            "Internal server error. Please try again later."
          );
        default:
          throw new McpError(
            ErrorCode.InternalError,
            `API error (${status}): ${message}`
          );
      }
    } else if (error.request) {
      throw new McpError(
        ErrorCode.InternalError,
        "Network error: Unable to reach Doclasana API"
      );
    } else {
      throw new McpError(ErrorCode.InternalError, `Request error: ${error.message}`);
    }
  }

  async listDocuments(page = 1, pageSize = 20): Promise<PaginatedResponse<Document>> {
    try {
      const response = await (axios as any).get(`${DOCLASANA_API_BASE}/api/v1/documents/my`, {
        headers: this.getHeaders(),
        params: { pageNumber: page, pageSize },
      });
      return response.data;
    } catch (error) {
      this.handleAPIError(error as AxiosError);
    }
  }

  async searchDocuments(
    searchTerm: string,
    page = 1,
    pageSize = 20
  ): Promise<SearchResult> {
    try {
      const response = await (axios as any).get(
        `${DOCLASANA_API_BASE}/api/v1/documents/search-content`,
        {
          headers: this.getHeaders(),
          params: { searchTerm, page, pageSize },
        }
      );
      return response.data;
    } catch (error) {
      this.handleAPIError(error as AxiosError);
    }
  }

  async getDocument(id: string): Promise<Document> {
    try {
      const response = await (axios as any).get(
        `${DOCLASANA_API_BASE}/api/v1/documents/getDocumentById/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleAPIError(error as AxiosError);
    }
  }
}

// Create MCP server
const server = new Server(
  {
    name: "doclasana-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// API will be initialized per request when API key is available

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_documents",
        description: "List all documents accessible to the authenticated user with pagination support",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Page number (default: 1)",
              minimum: 1,
            },
            pageSize: {
              type: "number",
              description: "Number of documents per page (default: 20, max: 100)",
              minimum: 1,
              maximum: 100,
            },
          },
        },
      },
      {
        name: "search_documents",
        description: "Search through document contents using server-side search with the specified search term",
        inputSchema: {
          type: "object",
          properties: {
            searchTerm: {
              type: "string",
              description: "The search term to look for in document contents",
              minLength: 1,
            },
            page: {
              type: "number",
              description: "Page number (default: 1)",
              minimum: 1,
            },
            pageSize: {
              type: "number",
              description: "Number of documents per page (default: 20, max: 100)",
              minimum: 1,
              maximum: 100,
            },
          },
          required: ["searchTerm"],
        },
      },
      {
        name: "get_document",
        description: "Retrieve the full content and metadata of a specific document by its ID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique ID of the document to retrieve",
              minLength: 1,
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  // Get API key from environment for each request
  const apiKey = process.env.DOCLASANA_API_KEY;
  if (!apiKey) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      "DOCLASANA_API_KEY environment variable is required. Please set it in your MCP client configuration."
    );
  }

  const doclasanaAPI = new DoclasanaAPI(apiKey);

  try {
    switch (name) {
      case "list_documents": {
        // Manual validation with fallbacks
        const page = (args && typeof args.page === 'number') ? Math.max(1, args.page) : 1;
        const pageSize = (args && typeof args.pageSize === 'number') ? Math.min(100, Math.max(1, args.pageSize)) : 20;
        
        const result = await doclasanaAPI.listDocuments(page, pageSize);

        // Safe handling of response
        const items = result?.items || [];
        const currentPage = result?.page || 1;
        const totalPages = result?.totalPages || 1;
        const totalCount = result?.totalCount || 0;

        const formattedResponse = [
          "# Documents List\n",
          `Found ${items.length} documents`,
          ` (Page ${currentPage} of ${totalPages}, Total: ${totalCount})`,
          "\n\n",
          items.map((doc: any, index: number) => {
            return [
              `## ${index + 1}. ${doc.filename}`,
              `- **ID:** \`${doc.id}\``,
              doc.fileType ? `- **Type:** ${doc.fileType}` : "",
              doc.fileSize ? `- **Size:** ${doc.fileSize} bytes` : "",
              doc.timestamp ? `- **Modified:** ${new Date(doc.timestamp).toLocaleString()}` : "",
            ].filter(Boolean).join("\n");
          }).join("\n\n"),
        ].join("");

        return {
          content: [
            {
              type: "text",
              text: formattedResponse,
            },
          ],
        };
      }

      case "search_documents": {
        // Manual validation with fallbacks
        if (!args || !args.searchTerm || typeof args.searchTerm !== 'string' || args.searchTerm.length === 0) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            "searchTerm is required and must be a non-empty string"
          );
        }
        
        const searchTerm = args.searchTerm;
        const page = (args && typeof args.page === 'number') ? Math.max(1, args.page) : 1;
        const pageSize = (args && typeof args.pageSize === 'number') ? Math.min(100, Math.max(1, args.pageSize)) : 20;
        
        const result = await doclasanaAPI.searchDocuments(searchTerm, page, pageSize);

        // Safe handling of response
        const items = result?.items || [];
        const currentPage = result?.page || 1;
        const totalPages = result?.totalPages || 1;
        const totalCount = result?.totalCount || 0;

        const formattedResponse = [
          `# Search Results for: "${searchTerm}"\n`,
          `Found ${items.length} matching documents`,
          ` (Page ${currentPage} of ${totalPages}, Total: ${totalCount})`,
          "\n\n",
          items.map((doc: any, index: number) => {
            return [
              `## ${index + 1}. ${doc.filename}`,
              `- **ID:** \`${doc.documentId}\``,
              doc.timestamp ? `- **Modified:** ${new Date(doc.timestamp).toLocaleString()}` : "",
              "",
              doc.content ? "### Content Preview:" : "",
              doc.content ? "```markdown" : "",
              doc.content ? doc.content.substring(0, 500) + (doc.content.length > 500 ? "..." : "") : "",
              doc.content ? "```" : "",
            ].filter(Boolean).join("\n");
          }).join("\n\n"),
        ].join("");

        return {
          content: [
            {
              type: "text",
              text: formattedResponse,
            },
          ],
        };
      }

      case "get_document": {
        // Manual validation
        if (!args || !args.id || typeof args.id !== 'string' || args.id.length === 0) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            "id is required and must be a non-empty string"
          );
        }
        
        const document = await doclasanaAPI.getDocument(args.id);

        const formattedResponse = [
          `# ${document.filename}\n`,
          `- **ID:** \`${document.id}\``,
          document.fileType ? `- **Type:** ${document.fileType}` : "",
          document.fileSize ? `- **Size:** ${document.fileSize} bytes` : "",
          document.timestamp ? `- **Modified:** ${new Date(document.timestamp).toLocaleString()}` : "",
          "\n## Content\n",
          "```markdown",
          document.content || "No content available",
          "```",
        ].filter(Boolean).join("\n");

        return {
          content: [
            {
              type: "text",
              text: formattedResponse,
            },
          ],
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error: unknown) {
    if (error instanceof McpError) {
      throw error;
    }
    if ((error as any).name === 'ZodError') {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Invalid arguments: ${(error as any).errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Unexpected error: ${(error as Error).message || String(error)}`
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
}); 