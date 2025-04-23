import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Risk {
  title: string;
  description: string;
  severity: string;
}

interface ReportProps {
  report: {
    summary: string;
    risks: Risk[];
    suggestions: string[];
    confidence: string;
  };
}

const getSeverityColor = (severity: string): string => {
  const severityLower = severity.toLowerCase();
  if (severityLower.includes('critical') || severityLower.includes('high')) {
    return 'bg-error-50 text-error-700 border-error-200';
  } else if (severityLower.includes('medium')) {
    return 'bg-warning-50 text-warning-700 border-warning-200';
  } else if (severityLower.includes('low')) {
    return 'bg-primary-50 text-primary-700 border-primary-200';
  } else {
    return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getSeverityIcon = (severity: string) => {
  const severityLower = severity.toLowerCase();
  if (severityLower.includes('critical') || severityLower.includes('high')) {
    return <AlertTriangle className="h-5 w-5 text-error-500" />;
  } else if (severityLower.includes('medium')) {
    return <AlertCircle className="h-5 w-5 text-warning-500" />;
  } else if (severityLower.includes('low')) {
    return <Info className="h-5 w-5 text-primary-500" />;
  } else {
    return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const getConfidenceColor = (confidence: string): string => {
  const confidenceLower = confidence.toLowerCase();
  if (confidenceLower.includes('high')) {
    return 'text-accent-600';
  } else if (confidenceLower.includes('medium')) {
    return 'text-primary-500';
  } else {
    return 'text-gray-500';
  }
};

const SecurityReport: React.FC<ReportProps> = ({ report }) => {
  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Security Report</h3>
        <div className="prose max-w-none">
          <p className="text-gray-700">{report.summary}</p>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-warning-500" />
          Identified Risks
        </h4>
        {report.risks && report.risks.length > 0 ? (
          <div className="space-y-4">
            {report.risks.map((risk, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-md ${getSeverityColor(risk.severity)} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{getSeverityIcon(risk.severity)}</div>
                  <div>
                    <h5 className="font-medium mb-1">{risk.title}</h5>
                    <p className="text-sm">{risk.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-current">
                        {risk.severity} severity
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-white rounded-md border border-gray-200">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-accent-500" />
            <p>No significant security risks identified.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-b border-gray-200">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-accent-500" />
          Suggestions
        </h4>
        {report.suggestions && report.suggestions.length > 0 ? (
          <ul className="space-y-2">
            {report.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-100 text-accent-800 mr-3 text-sm">
                  {index + 1}
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No suggestions provided.</p>
        )}
      </div>

      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Analysis Confidence</h4>
            <p className={`text-lg font-semibold ${getConfidenceColor(report.confidence)}`}>
              {report.confidence || 'N/A'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Powered by</p>
            <p className="font-medium">IO Intelligence API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReport;