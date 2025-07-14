# Doclasana MCP Server

[![NPM Version](https://img.shields.io/npm/v/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![NPM Downloads](https://img.shields.io/npm/dm/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/doclasana-mcp-server.svg)](https://nodejs.org/)

This MCP (Model Context Protocol) server enables developers to access documentation from the Doclasana platform directly within AI-powered IDEs like Cursor, Cline, and Windsurf.

## ✨ Features

- **🔐 Secure Authentication**: Secure connection with API key
- **📋 Document Listing**: List all documents with pagination support
- **📖 Document Viewing**: View complete content of specific documents
- **🔍 Content Search**: Server-side search within document contents
- **📝 Markdown Support**: Full support for Markdown formatted documents
- **🚨 Error Handling**: Clear and user-friendly error messages

## 📦 Installation

### NPM

```bash
npm install -g doclasana-mcp-server
```

### From Source

```bash
git clone https://github.com/doclasana/doclasana-mcp-server.git
cd doclasana-mcp-server
npm install
npm run build
```

## 🚀 Quick Start

### 1. Build the Project

```bash
npm run build
```

### 2. Start the MCP Server

```bash
npm start
```

For development mode:
```bash
npm run dev
```

**Note:** The API key is specified in IDE configuration, not at server startup.

## ⚙️ IDE Configuration

### Cursor IDE

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "node",
      "args": ["/path/to/your/node_modules/doclasana-mcp-server/dist/index.js"],
      "env": {
        "DOCLASANA_API_KEY": "your-actual-doclasana-api-key"
      }
    }
  }
}
```

### Using Global Installation

If you installed globally:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "doclasana-mcp",
      "env": {
        "DOCLASANA_API_KEY": "your-actual-doclasana-api-key"
      }
    }
  }
}
```

**Important:** 
- Update the `args` path to your project directory if installing from source
- Replace `DOCLASANA_API_KEY` value with your actual API key

### Other MCP-Compatible IDEs

You can configure this MCP server in other IDEs similarly. Just specify the Node.js command and required environment variables.

## 🛠️ Available Tools

This MCP server provides the following tools:

### 1. `list_documents`

Lists all documents accessible to the authenticated user.

**Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Documents per page (default: 20, max: 100)

**Example:**
```
List my documents
```

### 2. `search_documents`

Searches for keywords within document contents.

**Parameters:**
- `searchTerm` (required): Keyword to search for
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Documents per page (default: 20, max: 100)

**Example:**
```
Search for documents containing "API key"
```

### 3. `get_document`

Retrieves the complete content of a specific document.

**Parameters:**
- `id` (required): Document ID

**Example:**
```
Get document with ID "abc123"
```

## 💡 Usage Scenarios

### Scenario 1: Exploring Project Documentation
1. Tell your AI assistant in the IDE: "List my documents"
2. Note the ID of an interesting document
3. Use "Get document with ID [document-id]" to read the full content

### Scenario 2: Finding Specific Information
1. Search with a keyword like "API usage"
2. Select the relevant document from results
3. View full content if needed

### Scenario 3: Tracking Updates
1. Regularly list documents
2. Check modification dates for updated documents
3. Review updated document contents

## 🔧 Troubleshooting

### API Key Error
- Ensure `DOCLASANA_API_KEY` is correctly set in IDE configuration
- Verify your API key is valid and active
- If you get "DOCLASANA_API_KEY environment variable is required" error, check your IDE configuration

### Connection Error
- Check your internet connection
- Verify Doclasana API service is operational

### Authorization Error
- Ensure your API key has necessary permissions for documents

## 🧪 Development

### Project Structure
```
doclasana-mcp-server/
├── src/
│   ├── index.ts          # Main MCP server code
│   └── global.d.ts       # TypeScript type definitions
├── dist/                 # Compiled JavaScript files
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── LICENSE              # MIT License
└── README.md            # This file
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the compiled server
- `npm test` - Run tests
- `npm run prepublishOnly` - Pre-publish build hook

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or suggestions, please reach out through [GitHub Issues](https://github.com/doclasana/doclasana-mcp-server/issues).

## 🏷️ Version History

### v1.0.0
- Initial MVP release
- Basic document listing, searching, and viewing features
- Secure API key authentication
- Markdown document support

## 🔗 Related

- [Doclasana Platform](https://doclasana.com)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Cursor IDE](https://cursor.sh/)

---

Made with ❤️ by the [Doclasana Team](https://doclasana.com) 