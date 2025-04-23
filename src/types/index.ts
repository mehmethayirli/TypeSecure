export interface SecurityRisk {
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
}

export interface SecurityReport {
  summary: string;
  risks: SecurityRisk[];
  suggestions: string[];
  confidence: string;
}

export interface AnalysisResult {
  success: boolean;
  report: SecurityReport;
}