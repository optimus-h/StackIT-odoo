import React, { useState } from 'react';
import { Filter, TrendingUp, Clock} from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { questions, searchQuery, selectedTags } = useApp();
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'activity'>('newest');

  // Filter questions based on search and tags
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = searchQuery === '' || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tagName => 
        question.tags.some(tag => tag.name === tagName)
      );
    
    return matchesSearch && matchesTags;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'activity':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getSortIcon = (type: string) => {
    switch (type) {
      case 'votes':
        return <TrendingUp className="w-4 h-4" />;
      
      case 'newest':
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search results for "${searchQuery}"` : 'All Questions'}
          </h1>
          <p className="text-gray-600 mt-1">
            {sortedQuestions.length} question{sortedQuestions.length !== 1 ? 's' : ''}
            {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
          </p>
        </div>
        
        <button
          onClick={() => onNavigate('ask')}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ask Question
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
        </div>
        
        <div className="flex space-x-1">
          {[
            { key: 'newest', label: 'Newest' },
            { key: 'votes', label: 'Votes' },
          ].map(option => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key as any)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortBy === option.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {getSortIcon(option.key)}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedTags.length > 0 
                ? "Try adjusting your search or filter criteria"
                : "Be the first to ask a question!"
              }
            </p>
            <button
              onClick={() => onNavigate('ask')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ask Question
            </button>
          </div>
        ) : (
          sortedQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              onClick={() => onNavigate('question', question.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
