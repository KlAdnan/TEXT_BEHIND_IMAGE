'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontTemplate, AESTHETIC_TEMPLATES } from '@/utils/templates';

interface Props {
  onSelect: (template: FontTemplate) => void;
}

export default function TemplatePicker({ onSelect }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<FontTemplate['category'] | 'all'>('all');

  const categories = Array.from(
    new Set(AESTHETIC_TEMPLATES.map(t => t.category))
  );

  const filteredTemplates = AESTHETIC_TEMPLATES.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
            ${selectedCategory === 'all' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          All Styles
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm capitalize whitespace-nowrap transition-colors
              ${selectedCategory === category 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <motion.div
            key={template.id}
            layoutId={template.id}
            className="relative group cursor-pointer rounded-xl overflow-hidden"
            onClick={() => onSelect(template)}
          >
            {/* Preview */}
            <div 
              className="aspect-video p-6 flex items-center justify-center"
              style={{ 
                background: template.colors.background || '#ffffff',
                color: template.colors.primary
              }}
            >
              <div className="text-center">
                <div 
                  className="preview-text"
                  style={{
                    fontFamily: template.fonts.primary.family,
                    fontSize: template.fonts.primary.size,
                    fontWeight: template.fonts.primary.weight,
                    letterSpacing: template.fonts.primary.letterSpacing
                  }}
                >
                  Sample
                </div>
                {template.fonts.secondary && (
                  <div
                    className="mt-2"
                    style={{
                      fontFamily: template.fonts.secondary.family,
                      fontSize: template.fonts.secondary.size,
                      fontWeight: template.fonts.secondary.weight,
                      fontStyle: template.fonts.secondary.style
                    }}
                  >
                    Subtext
                  </div>
                )}
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                          transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">{template.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 