import React from 'react';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import axios from 'axios';

interface Comment {
  text: string;
  children: Comment[];
  expanded: boolean;
  loaded?: boolean;  // Track if children have been loaded
}

interface ResultsPageProps {
  query: string;
  results: Comment[];
  onBack: () => void;
  onUpdateResults: (results: Comment[]) => void;
}

const CommentThread: React.FC<{
  comment: Comment;
  depth: number;
  onToggle: (comment: Comment) => Promise<void>;
}> = ({ comment, depth, onToggle }) => {
  return (
    <div style={{ paddingLeft: `${depth * 24}px` }}>
      <div className="rounded-md overflow-hidden hover:bg-gray-100">
        <button 
          className="w-full text-left flex items-start p-4"
          onClick={() => onToggle(comment)}
        >
          <div className="flex-shrink-0 text-gray-500 hover:text-gray-700">
            {comment.expanded ? <Minus size={20} /> : <Plus size={20} />}
          </div>
          <p className="flex-grow pl-3">{comment.text}</p>
        </button>
        {comment.expanded && (
          <div>
            {comment.children.length > 0 ? (
              <div className="border-l-2 border-gray-200">
                {comment.children.map((child, index) => (
                  <CommentThread
                    key={index}
                    comment={child}
                    depth={depth + 1}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            ) : comment.loaded && (
              <p className="text-gray-500 italic pl-11 pb-4">No further responses</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<ResultsPageProps> = ({ query, results, onBack, onUpdateResults }) => {
  // Function to toggle comment expansion and load children if needed
  const toggleComment = async (targetComment: Comment) => {
    // Helper function to recursively find and update the target comment
    const updateComment = async (comments: Comment[]): Promise<Comment[]> => {
      return await Promise.all(comments.map(async (comment) => {
        if (comment === targetComment) {
          // If this is the first time expanding and children haven't been loaded
          if (!comment.loaded && !comment.expanded) {
            try {
              const response = await axios.post<string[]>(
                'http://localhost:5000/generate', 
                { query: comment.text }
              );
              
              const newChildren = response.data.map(text => ({
                text,
                children: [],
                expanded: false,
                loaded: false
              }));

              return {
                ...comment,
                children: newChildren,
                expanded: true,
                loaded: true
              };
            } catch (error) {
              console.error('Error fetching child comments:', error);
              return { ...comment, expanded: true, loaded: true };
            }
          }
          // If children are already loaded, just toggle expansion
          return { ...comment, expanded: !comment.expanded };
        }
        return {
          ...comment,
          children: await updateComment(comment.children)
        };
      }));
    };

    // Create a new copy of results with the updated expansion state
    const updatedResults = await updateComment([...results]);
    onUpdateResults(updatedResults);
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
        <div className="space-y-4">
          {results.map((result, index) => (
            <CommentThread
              key={index}
              comment={result}
              depth={0}
              onToggle={toggleComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;