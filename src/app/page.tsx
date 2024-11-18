import React from 'react';
import { Settings, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CE Intern</h1>
          <p className="text-xl text-gray-600">
            Your AI assistant for technical follow-up emails
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Query Panel Card */}
          <div className="bg-white rounded-lg shadow-md group hover:shadow-lg transition-shadow duration-300">
            <a href="/query" className="block h-full p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Query Panel</h2>
                <p className="text-gray-500 mb-4">
                  Generate technical follow-up emails based on call transcripts
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>Process call transcripts</li>
                  <li>Generate detailed technical responses</li>
                  <li>Include relevant documentation links</li>
                </ul>
              </div>
            </a>
          </div>

          {/* Admin Panel Card */}
          <div className="bg-white rounded-lg shadow-md group hover:shadow-lg transition-shadow duration-300">
            <a href="/admin" className="block h-full p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
                <p className="text-gray-500 mb-4">
                  Manage documentation indexing and system status
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>Monitor indexing status</li>
                  <li>Add documentation URLs</li>
                  <li>Track indexed documents</li>
                </ul>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by RAG technology and Google Cloud Documentation</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;