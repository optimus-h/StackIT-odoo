import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Clock, Eye, User, MessageCircle } from 'lucide-react';
import AnswerCard from '../components/AnswerCard';
import RichTextEditor from '../components/RichTextEditor';
import { useApp } from '../context/AppContext';

interface QuestionDetailPageProps {
  questionId: string;
  onNavigate: (page: string) => void;
}

const QuestionDetailPage: React.FC<QuestionDetailPageProps> = ({ questionId, onNavigate }) => {
  const { 
    getQuestionById, 
    getAnswersByQuestionId, 
    addAnswer, 
    voteQuestion, 
    currentUser,
    isLoggedIn 
  } = useApp();
  
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = getQuestionById(questionId);
  const answers = getAnswersByQuestionId(questionId);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Question not found</h2>
          <p className="text-gray-600 mb-4">The question you're looking for doesn't exist.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Questions
          </button>
        </div>
      </div>
    );
  }

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
      voteQuestion(question.id, type);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentUser || !answerContent.trim()) return;

    setIsSubmitting(true);
    try {
      addAnswer({
        questionId: question.id,
        content: answerContent,
        author: currentUser,
        votes: 0,
        isAccepted: false,
      });
      setAnswerContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">{line.slice(3)}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h2 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h2>;
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

  const isQuestionOwner = currentUser?.id === question.author.id;
  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.isAccepted && !b.isAccepted) return -1;
    if (!a.isAccepted && b.isAccepted) return 1;
    return b.votes - a.votes;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-blue-600 transition-colors"
        >
          Questions
        </button>
        <span>/</span>
        <span className="text-gray-900 truncate">{question.title}</span>
      </nav>

      {/* Question */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <button
              onClick={() => handleVote('up')}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={!currentUser}
            >
              <ArrowUp className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-xl font-bold text-gray-900">{question.votes}</span>
            <button
              onClick={() => handleVote('down')}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              disabled={!currentUser}
            >
              <ArrowDown className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            
            <div className="prose max-w-none mb-6">
              {renderContent(question.description)}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
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

            {/* Question Stats */}
            <div className="flex items-center justify-between">
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
                    Asked {formatTimeAgo(question.createdAt)}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {question.author.username}
                  </p>
                </div>
                {question.author.avatar ? (
                  <img
                    src={question.author.avatar}
                    alt={question.author.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        
        <div className="space-y-6">
          {sortedAnswers.map(answer => (
            <AnswerCard
              key={answer.id}
              answer={answer}
              isQuestionOwner={isQuestionOwner}
            />
          ))}
        </div>
      </div>

      {/* Answer Form */}
      {isLoggedIn ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
          
          <RichTextEditor
            value={answerContent}
            onChange={setAnswerContent}
            placeholder="Share your knowledge and help others solve this problem..."
          />
          
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitAnswer}
              disabled={!answerContent.trim() || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting ? 'Posting...' : 'Post Your Answer'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-gray-600 mb-4">You must be logged in to post an answer.</p>
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDetailPage;