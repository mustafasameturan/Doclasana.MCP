# Doclasana MCP Server

[![NPM Version](https://img.shields.io/npm/v/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![NPM Downloads](https://img.shields.io/npm/dm/doclasana-mcp-server.svg)](https://www.npmjs.com/package/doclasana-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Store your documents on Doclasana and access them directly from AI-powered IDEs like Cursor, Cline, and Windsurf.

## Features

- List and search your documents
- View document contents
- Secure API key authentication
- Works with all MCP-compatible IDEs

## Installation

### Option 1: NPM (Recommended)

```bash
npm install -g doclasana-mcp-server
```

### Option 2: From Source

```bash
git clone https://github.com/mustafasameturan/Doclasana.MCP.git
cd Doclasana.MCP
npm install
npm run build
```

## Setup

### 1. Get Your API Key
Get your API key from [Doclasana](https://doclasana.com) account settings.

### 2. Configure Your IDE

#### Cursor IDE
Add this to your MCP settings:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "doclasana-mcp",
      "env": {
        "DOCLASANA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

#### From Source Installation
If you installed from source, use this:

```json
{
  "mcpServers": {
    "doclasana": {
      "command": "node",
      "args": ["/path/to/Doclasana.MCP/dist/index.js"],
      "env": {
        "DOCLASANA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 3. Start Using
After configuration is complete, you can ask your AI assistant:
- "List my documents"
- "Search for documents about API"
- "Get document with ID abc123"

## Available Commands

- `list_documents` - Lists all your documents with pagination
- `search_documents` - Searches within document contents
- `get_document` - Retrieves the full content of a specific document

## Development

### Commands
- `npm run build` - Compile TypeScript
- `npm run dev` - Run in development mode
- `npm start` - Start the server
- `npm test` - Run tests

### Project Structure
```
src/
├── index.ts          # Main MCP server
└── global.d.ts       # Type definitions
dist/                 # Compiled output
```

## License

MIT License - see [LICENSE](LICENSE) file.

## Support

For questions or issues, visit [GitHub Issues](https://github.com/mustafasameturan/Doclasana.MCP/issues).