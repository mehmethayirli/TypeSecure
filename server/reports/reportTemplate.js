export function generateReport(result) {
  return {
    summary: result.summary,
    risks: result.risks || [],
    suggestions: result.suggestions || [],
    confidence: result.confidence || "N/A",
  };
}
