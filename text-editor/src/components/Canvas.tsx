'use client';

import { useRef } from 'react';
import Draggable from 'react-draggable';

interface CanvasProps {
  image: string | null;
  text: string;
  textPosition: { x: number; y: number };
  fontSize: number;
  onTextPositionChange: (position: { x: number; y: number }) => void;
}

export default function Canvas({
  image,
  text,
  textPosition,
  fontSize,
  onTextPositionChange,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={canvasRef}
      className="relative aspect-video bg-gray-800/50 rounded-lg overflow-hidden"
    >
      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="w-full h-full object-contain"
        />
      )}
      
      {text && (
        <Draggable
          position={textPosition}
          onStop={(e, data) => onTextPositionChange({ x: data.x, y: data.y })}
          bounds="parent"
        >
          <div
            className="absolute cursor-move select-none"
            style={{
              fontSize: `${fontSize}px`,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {text}
          </div>
        </Draggable>
      )}
    </div>
  );
}