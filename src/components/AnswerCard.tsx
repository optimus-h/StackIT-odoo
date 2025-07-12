
import React from 'react';
import { ArrowUp, ArrowDown, Clock, CheckCircle, User } from 'lucide-react';
import { Answer } from '../types';
import { useApp } from '../context/AppContext';

interface AnswerCardProps {
  answer: Answer;
  isQuestionOwner: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, isQuestionOwner }) => {
  const { voteAnswer, acceptAnswer, currentUser } = useApp();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleVote = (type: 'up' | 'down') => {
    if (currentUser) {
      voteAnswer(answer.id, type);
    }
  };

  const handleAccept = () => {
    if (isQuestionOwner && !answer.isAccepted) {
      acceptAnswer(answer.id);
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering for demonstration
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">{line.slice(3)}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h2>;
        }
        if (line.startsWith('```')) {
          return null; // Handle code blocks separately
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="ml-4">{line.slice(2)}</li>;
        }
        if (line.includes('`') && line.includes('`')) {
          const parts = line.split('`');
          return (
            <p key={index} className="mb-2">
              {parts.map((part, i) => 
                i % 2 === 1 ? 
                  <code key={i} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{part}</code> : 
                  part
              )}
            </p>
          );
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-2">{line}</p>;
      });
  };

  return (
    <div className={`bg-white rounded-lg border p-6 ${answer.isAccepted ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 flex-shrink-0">
          <button
            onClick={() => handleVote('up')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={!currentUser}
          >
            <ArrowUp className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{answer.votes}</span>
          <button
            onClick={() => handleVote('down')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={!currentUser}
          >
            <ArrowDown className="w-5 h-5 text-gray-600" />
          </button>

          {/* Accept Answer Button */}
          {isQuestionOwner && !answer.isAccepted && (
            <button
              onClick={handleAccept}
              className="mt-2 p-1 rounded hover:bg-green-100 transition-colors"
              title="Accept this answer"
            >
              <CheckCircle className="w-5 h-5 text-gray-400 hover:text-green-600" />
            </button>
          )}
          
          {answer.isAccepted && (
            <div className="mt-2 p-1" title="Accepted answer">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {answer.isAccepted && (
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Accepted Answer</span>
            </div>
          )}

          <div className="prose max-w-none">
            {renderContent(answer.content)}
          </div>

          {/* Author and timestamp */}
          <div className="flex items-center justify-end mt-6">
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-500 flex items-center justify-end">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeAgo(answer.createdAt)}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {answer.author.username}
                </p>
              </div>
              {answer.author.avatar ? (
                <img
                  src={answer.author.avatar}
                  alt={answer.author.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
