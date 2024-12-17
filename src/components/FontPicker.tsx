'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FONTS = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Playfair Display'
];

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded
                 text-left text-white hover:bg-gray-600 transition-colors
                 focus:outline-none focus:border-indigo-500"
      >
        <span style={{ fontFamily: value }}>{value}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700
                     rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {FONTS.map(font => (
              <button
                key={font}
                onClick={() => {
                  onChange(font);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-gray-700
                         transition-colors ${value === font ? 'text-indigo-400' : 'text-white'}`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 