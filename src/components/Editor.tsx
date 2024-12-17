'use client';
import React from 'react';
import ImageUpload from './ImageUpload';
import Canvas from './Canvas';
import TextControls from './TextControls';
import { useEditor } from '@/context/EditorContext';
import { UploadedImage } from '@/types';

export default function Editor({ className = '' }: { className?: string }) {
  const { dispatch } = useEditor();

  const handleImageUpload = (image: UploadedImage) => {
    dispatch({ type: 'SET_IMAGE', payload: image });
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <ImageUpload onUpload={handleImageUpload} />
      <Canvas />
      <TextControls />
    </div>
  );
} 