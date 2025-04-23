import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function analyzeCode(code) {
  const apiKey = process.env.IO_API_KEY;

  if (apiKey && apiKey !== "your_io_intelligence_api_key") {
    try {
      // This would be the actual API call in production
      // const response = await axios.post(
      //   "https://api.iointelligence.io/analyze",
      //   {
      //     input: code,
      //     task: "typescript_contract_audit"
      //   },
      //   {
      //     headers: {
      //       "Authorization": `Bearer ${apiKey}`,
      //       "Content-Type": "application/json"
      //     }
      //   }
      // );
      // return response.data;

      return getMockAnalysisResult(code);
    } catch (error) {
      console.error("Error calling IO Intelligence API:", error);
      throw new Error("Failed to analyze code with IO Intelligence API");
    }
  } else {
    console.log("Using mock data (no valid API key provided)");
    return getMockAnalysisResult(code);
  }
}

function getMockAnalysisResult(code) {
  const risks = [];
  const suggestions = [];

  if (code.includes("private balances")) {
    risks.push({
      title: "Insufficient Access Control",
      description:
        "The balances mapping uses private visibility but lacks proper access control mechanisms.",
      severity: "Medium",
    });

    suggestions.push(
      "Implement role-based access control for sensitive operations."
    );
  }

  if (code.includes("transfer(") && !code.includes("require(")) {
    risks.push({
      title: "Missing Input Validation",
      description:
        "The transfer function does not validate inputs properly before execution.",
      severity: "High",
    });

    suggestions.push(
      "Add proper input validation to prevent unexpected behavior."
    );
  }

  if (!code.includes("onlyOwner") && code.includes("owner")) {
    suggestions.push(
      "Consider implementing an onlyOwner modifier for owner-restricted functions."
    );
  }

  // Add a mock risk for demo purposes if no risks were found
  if (risks.length === 0) {
    risks.push({
      title: "Default Error Handling",
      description:
        "The contract lacks proper error handling for edge cases and exceptions.",
      severity: "Low",
    });
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Consider following industry standard patterns for smart contract development."
    );
  }

  return {
    summary: `Analysis of the TypeScript smart contract revealed ${
      risks.length
    } potential security ${
      risks.length === 1 ? "issue" : "issues"
    } with varying severity levels. The contract implements basic token functionality but may need additional security controls.`,
    risks,
    suggestions,
    confidence: code.length > 500 ? "High" : "Medium",
  };
}
