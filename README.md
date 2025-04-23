# TypeSecure - TypeScript Smart Contract Auditor

TypeSecure is an AI agent built on IO Intelligence infrastructure that specializes in security auditing for TypeScript-based smart contracts. It helps developers quickly audit their contract code and provides recommendations on potential security vulnerabilities.

## Overview

TypeSecure provides automated security analysis for TypeScript smart contracts. The agent leverages IO Intelligence API to perform deep security audits and produces comprehensive yet concise security reports.

## Features

- Security analysis using IO Intelligence API
- AI-powered recommendations and summary reports
- Exclusive focus on TypeScript smart contract files
- Detailed yet concise security reports (risks, summary, recommendations)
- Simple API backend architecture

## Technical Structure

### Folder Structure

```
type-secure-ai/
├── server/
│   ├── index.js                // Express backend
│   ├── services/
│   │   └── ioIntelligence.js  // IO Intelligence API integration
│   └── reports/
│       └── reportTemplate.js  // Report generator
├── .env                        // API key
└── package.json
```

### Environment Variables

Create a `.env` file with:

```
IO_API_KEY=your_io_intelligence_api_key
```

### Dependencies

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.0.0",
    "express": "^4.18.0"
  }
}
```

## API Usage

### POST /analyze

**Request Body:**

```json
{
  "code": "// TypeScript smart contract code here"
}
```

**Response:**

```json
{
  "success": true,
  "report": "Smart Contract Security Report: ..."
}
```

## Code Flow

1. User sends TypeScript smart contract code to POST /analyze endpoint
2. Code is processed by ioIntelligence.js and sent to IO Intelligence API with task "typescript_contract_audit"
3. Results are formatted in reportTemplate.js (risks, recommendations, confidence level, etc.)
4. Clean, readable report is returned to the user

## IO Intelligence API Integration

```javascript
// server/services/ioIntelligence.js
const axios = require("axios");

async function analyzeCode(code) {
  const apiKey = process.env.IO_API_KEY;
  const response = await axios.post(
    "https://api.iointelligence.io/analyze",
    {
      input: code,
      task: "typescript_contract_audit"
    },
    {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
}

module.exports = { analyzeCode };
```

## Report Format

```javascript
// server/reports/reportTemplate.js
function generateReport(result) {
  return `TypeScript Smart Contract Security Report

Summary:
${result.summary}

Risks Identified:
${result.risks?.map(risk => `- ${risk.title}: ${risk.description}`).join("\n") || "None"}

Suggestions:
${result.suggestions?.map(s => `- ${s}`).join("\n") || "No suggestions provided."}

Confidence: ${result.confidence || "N/A"}`;
}

module.exports = { generateReport };
```

## Future Development Ideas

- GitHub integration (automatic PR scanning)
- Simple frontend UI (upload code & view results)
- PDF report conversion
- Risk scoring (critical, medium, low)

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with your IO Intelligence API key
4. Run `npm run dev`
5. Send requests to `http://localhost:3000/analyze`

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
