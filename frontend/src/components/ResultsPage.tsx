import React, { useState } from 'react';
import { ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'; // Import the ChevronLeft icon

interface ResultsPageProps {
  query: string;
  results: Result[];
  onBack: () => void;
}

interface Result {
  text: string;
  comments: string[];
}


const ResultsPage: React.FC<ResultsPageProps> = ({ query, results, onBack }) => {
  const [expandedAnswer, setExpandedAnswer] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setExpandedAnswer(expandedAnswer === index ? null : index);
  };

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
          <div key={index} className="border rounded-md overflow-hidden">
            <div
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-150"
              onClick={() => toggleAnswer(index)}
            >
              <p className="flex-grow">{result.text}</p>
              <button className="ml-4 text-gray-500 hover:text-gray-700">
                {expandedAnswer === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            {expandedAnswer === index && (
              <div className="p-4 bg-white border-t">
                {result.comments.length > 0 ? (
                  result.comments.map((comment, commentIndex) => (
                    <p key={commentIndex} className="mb-2 text-gray-700">
                      {comment}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;