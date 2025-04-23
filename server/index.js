import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeCode } from "./services/ioIntelligence.js";
import { generateReport } from "./reports/reportTemplate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Analyze endpoint
app.post("/analyze", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "No code provided" });
    }

    if (!isTypeScript(code)) {
      return res.status(400).json({
        success: false,
        message: "Only TypeScript smart contracts are supported",
      });
    }

    // In a real implementation, this would call the actual IO API
    const analysisResult = await analyzeCode(code);

    // Generate the formatted report
    const report = generateReport(analysisResult);

    res.json({ success: true, report });
  } catch (error) {
    console.error("Error analyzing code:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during analysis",
    });
  }
});

function isTypeScript(code) {
  const tsFeatures = [
    "interface ",
    "type ",
    ": string",
    ": number",
    ": boolean",
    ": any",
    "<",
    ">",
  ];

  return tsFeatures.some((feature) => code.includes(feature));
}

app.listen(PORT, () => {
  console.log(`TypeSecure server running on port ${PORT}`);
});
