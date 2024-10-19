import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus } from 'lucide-react';

interface Comment {
  text: string;
  children: Comment[];
  expanded: boolean;
}

interface ResultsPageProps {
  query: string;
  results: Comment[];
  onBack: () => void;
}


const ResultsPage: React.FC<ResultsPageProps> = ({ query, results, onBack }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full mx-auto p-4 space-y-8">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">{query}</h2>
        </div>
        {results.map((result, index) => (
          <div key={index} className="rounded-md overflow-hidden hover:bg-gray-100">
            <div
              className="p-4 flex justify-between items-center cursor-pointer transition-colors duration-150"
              onClick={() => {result.expanded = true;}}
            >
                <button className="ml-4 pt-1 text-gray-500 hover:text-gray-700 self-start">
                {result.expanded ? (
                  <Minus size={20} />
                ) : (
                  <Plus size={20} />
                )}
                </button>
                <p className="flex-grow pl-4">{result.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;