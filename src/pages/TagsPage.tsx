import React from "react";
import { useApp } from "../context/AppContext";

const TagsPage: React.FC = () => {
  const { tags } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tags</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tags.map(tag => (
          <div
            key={tag.id}
            className="bg-white border rounded-lg p-4 flex flex-col items-center shadow hover:shadow-md transition"
          >
            <span
              className="px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
            <span className="text-gray-500 text-xs">{tag.count} questions</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;