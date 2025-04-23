import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useApi } from '../context/ApiContext';
import SecurityReport from './SecurityReport';

const SAMPLE_CODE = `// Example TypeScript Smart Contract
export class Token {
  private balances: Map<string, number> = new Map();
  private owner: string;
  
  constructor(initialOwner: string) {
    this.owner = initialOwner;
    this.balances.set(initialOwner, 1000000);
  }
  
  public transfer(from: string, to: string, amount: number): boolean {
    const fromBalance = this.balances.get(from) || 0;
    
    if (fromBalance < amount) return false;
    
    this.balances.set(from, fromBalance - amount);
    this.balances.set(to, (this.balances.get(to) || 0) + amount);
    
    return true;
  }
  
  public getBalance(address: string): number {
    return this.balances.get(address) || 0;
  }
}`;

interface AnalysisResult {
  success: boolean;
  report: {
    summary: string;
    risks: Array<{ title: string; description: string; severity: string }>;
    suggestions: string[];
    confidence: string;
  };
}

const CodeAnalyzer: React.FC = () => {
  const [code, setCode] = useState<string>(SAMPLE_CODE);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { analyzeCode } = useApi();

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter TypeScript smart contract code.');
      return;
    }

    try {
      setError(null);
      setIsAnalyzing(true);
      const result = await analyzeCode(code);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze code. Please try again.');
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium">TypeScript Smart Contract Code</h3>
          <p className="text-sm text-gray-500">Paste your TypeScript smart contract code below</p>
        </div>
        <div className="p-0 border-b border-gray-200 bg-gray-50">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.typescript, 'typescript')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: '300px',
              backgroundColor: '#f9fafb',
            }}
            className="min-h-[300px]"
          />
        </div>
        <div className="p-4 flex justify-between items-center bg-white">
          <button
            onClick={handleClearAnalysis}
            className="btn btn-secondary"
            disabled={isAnalyzing}
          >
            Clear
          </button>
          <button
            onClick={handleAnalyze}
            className="btn btn-primary"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Run Security Analysis'
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {isAnalyzing && (
        <div className="card p-8 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-4 text-primary-500 animate-spin" />
          <h3 className="text-lg font-medium mb-2">Analyzing Smart Contract</h3>
          <p className="text-gray-600">
            Using AI to identify potential security vulnerabilities...
          </p>
        </div>
      )}

      {analysisResult && !isAnalyzing && (
        <div className="mt-8 animate-fade-in">
          <div className="mb-4 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-accent-500" />
            <h3 className="text-lg font-medium">Analysis Complete</h3>
          </div>
          <SecurityReport report={analysisResult.report} />
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzer;