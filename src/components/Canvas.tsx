'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from './effects/ParticleSystem';
import { Text3D } from './effects/Text3D';
import { useWindowSize } from '../hooks/useWindowSize';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useEditor } from '@/context/EditorContext';
import clsx from 'clsx';

export const Canvas = () => {
  const { width, height } = useWindowSize();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { state } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="relative w-full h-full">
      <motion.div 
        className={clsx(
          "canvas-container relative",
          isMobile ? "touch-manipulation" : "cursor-pointer"
        )}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        {state.layers.map(layer => (
          <motion.div
            key={layer.id}
            className="absolute"
            initial={false}
            animate={{
              x: layer.position.x,
              y: layer.position.y,
              z: layer.position.z,
            }}
          >
            {layer.type === 'text' && (
              <Text3D 
                text={layer.content}
                color={layer.effects.color}
                metalness={layer.effects.metalness}
                roughness={layer.effects.roughness}
              />
            )}
          </motion.div>
        ))}
        <ParticleSystem />
      </motion.div>
    </div>
  );
}; 