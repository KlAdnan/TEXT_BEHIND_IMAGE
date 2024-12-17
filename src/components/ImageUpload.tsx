'use client';
import React, { useCallback, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '@/context/EditorContext';
import { Upload } from 'lucide-react';
import clsx from 'clsx';

interface ImageDimensions {
  width: number;
  height: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageUpload: React.FC = () => {
  const { dispatch } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP)';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  const handleFileChange = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        dispatch({ 
          type: 'SET_IMAGE', 
          payload: { 
            url: e.target?.result as string,
            width: img.width,
            height: img.height
          }
        });
        setError(null);
      };
      img.onerror = () => {
        setError('Failed to load image');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  }, [handleFileChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  }, [handleFileChange]);

  return (
    <motion.div
      className={clsx(
        'relative border-2 border-dashed rounded-lg p-8 text-center',
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
      )}
      animate={{ scale: isDragging ? 1.02 : 1 }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleInputChange}
        ref={fileInputRef}
      />
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center gap-4 cursor-pointer"
      >
        <Upload className="w-8 h-8 text-gray-400" />
        <div className="text-sm text-gray-600">
          Drop your image here or click to browse
        </div>
      </label>
      {error && <div className="text-red-500">{error}</div>}
    </motion.div>
  );
}; 