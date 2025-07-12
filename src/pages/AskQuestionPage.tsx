import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import TagInput from '../components/TagInput';
import { useApp } from '../context/AppContext';
import { Tag } from '../types';

interface AskQuestionPageProps {
  onNavigate: (page: string) => void;
}

const AskQuestionPage: React.FC<AskQuestionPageProps> = ({ onNavigate }) => {
  const { addQuestion, currentUser } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (title.length > 150) {
      newErrors.title = 'Title must be less than 150 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters';
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !currentUser) return;

    setIsSubmitting(true);
    try {
      addQuestion({
        title: title.trim(),
        description: description.trim(),
        author: currentUser,
        tags: selectedTags,
        votes: 0,
        answerCount: 0,
        viewCount: 0,
        isAnswered: false,
      });
      
      // Navigate back to home page
      onNavigate('home');
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || description.trim() || selectedTags.length > 0) {
      if (window.confirm('Are you sure you want to discard your question?')) {
        onNavigate('home');
      }
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Ask a Question</h1>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Writing a good question</h2>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Be specific and provide context</li>
          <li>• Include relevant code, error messages, or examples</li>
          <li>• Use clear, descriptive tags</li>
          <li>• Search for existing answers before posting</li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Be specific and imagine you're asking a question to another person"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-sm text-gray-500">{title.length}/150 characters</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <div className={`${errors.description ? 'border-red-500 border rounded-lg' : ''}`}>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Provide all the details someone would need to answer your question. Include any error messages, code samples, or specific scenarios."
            />
          </div>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          <p className="mt-1 text-sm text-gray-500">{description.length} characters</p>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags <span className="text-red-500">*</span>
          </label>
          <TagInput
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            placeholder="e.g. React, JavaScript, CSS"
          />
          {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
          <p className="mt-1 text-sm text-gray-500">
            Add up to 5 tags to describe what your question is about
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestionPage;