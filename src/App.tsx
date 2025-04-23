import React from "react";
import { Shield, Github } from "lucide-react";
import CodeAnalyzer from "./components/CodeAnalyzer";
import { ApiProvider } from "./context/ApiContext";

function App() {
  return (
    <ApiProvider>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">TypeSecure</h1>
                <p className="text-sm text-gray-500">
                  TS Smart Contract Auditor
                </p>
              </div>
            </div>
            <a
              href="https://github.com/mehmethayirli/TypeSecure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                TypeScript Smart Contract Security Audit
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Analyze and identify potential security vulnerabilities in your
                TypeScript smart contracts using AI-powered intelligence.
              </p>
            </div>

            <CodeAnalyzer />
          </section>
        </main>

        <footer className="bg-gray-50 border-t border-gray-200 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>TypeSecure • Powered by IO Intelligence</p>
          </div>
        </footer>
      </div>
    </ApiProvider>
  );
}

export default App;
