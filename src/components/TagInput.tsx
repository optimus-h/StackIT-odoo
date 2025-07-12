import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Tag } from '../types';
import { useApp } from '../context/AppContext';

interface TagInputProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ selectedTags, onTagsChange, placeholder }) => {
  const { tags } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
    !selectedTags.some(selected => selected.id === tag.id)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleTagSelect = (tag: Tag) => {
    if (selectedTags.length < 5) { // Limit to 5 tags
      onTagsChange([...selectedTags, tag]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleTagRemove = (tagId: string) => {
    onTagsChange(selectedTags.filter(tag => tag.id !== tagId));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      // Create a new tag if it doesn't exist
      const existingTag = tags.find(tag => 
        tag.name.toLowerCase() === inputValue.trim().toLowerCase()
      );
      
      if (existingTag) {
        handleTagSelect(existingTag);
      } else {
        // Create a new tag
        const newTag: Tag = {
          id: `new_${Date.now()}`,
          name: inputValue.trim(),
          color: '#6B7280',
          count: 0
        };
        handleTagSelect(newTag);
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-lg min-h-[44px]">
        {selectedTags.map(tag => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
            }}
          >
            {tag.name}
            <button
              type="button"
              onClick={() => handleTagRemove(tag.id)}
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={selectedTags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none border-none bg-transparent"
          disabled={selectedTags.length >= 5}
        />
      </div>

      {showSuggestions && inputValue && filteredTags.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredTags.slice(0, 10).map(tag => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagSelect(tag)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                ></span>
                <span>{tag.name}</span>
              </span>
              <span className="text-xs text-gray-500">{tag.count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>Press Enter to add tags</span>
        <span>{selectedTags.length}/5 tags</span>
      </div>
    </div>
  );
};

export default TagInput;
