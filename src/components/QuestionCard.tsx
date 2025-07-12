import React from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Eye, Clock, CheckCircle } from 'lucide-react';
import { Question } from '../types';
import { useApp } from '../context/AppContext';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onClick }) => {
  const { voteQuestion, currentUser } = useApp();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleVote = (e: React.MouseEvent, type: 'up' | 'down') => {
    e.stopPropagation();
    if (currentUser) {
      voteQuestion(question.id, type);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 flex-shrink-0">
          <button
            onClick={(e) => handleVote(e, 'up')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={!currentUser}
          >
            <ArrowUp className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{question.votes}</span>
          <button
            onClick={(e) => handleVote(e, 'down')}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            disabled={!currentUser}
          >
            <ArrowDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {question.title}
            </h3>
            {question.isAnswered && (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
            )}
          </div>
          
          <p className="text-gray-600 mt-2 line-clamp-3">
            {question.description.length > 150
              ? `${question.description.substring(0, 150)}...`
              : question.description
            }
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {question.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Stats and Author */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{question.answerCount} answers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{question.viewCount} views</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeAgo(question.createdAt)}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {question.author.username}
                </p>
              </div>
              {question.author.avatar ? (
                <img
                  src={question.author.avatar}
                  alt={question.author.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {question.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
