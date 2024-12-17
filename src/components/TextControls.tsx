'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor } from '@/context/EditorContext';
import { FontPicker } from './FontPicker';
import { ColorPicker } from './ColorPicker';
import { TextLayer } from '@/types';
import { Loader2 } from 'lucide-react';

export const TextControls: React.FC = () => {
  const { state, dispatch } = useEditor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newText, setNewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddText = useCallback(async () => {
    if (!newText.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      dispatch({ type: 'ADD_TEXT', payload: newText.trim() });
      setNewText('');
    } catch (err) {
      setError('Failed to add text layer');
      console.error('Error adding text:', err);
    } finally {
      setIsLoading(false);
    }
  }, [newText, dispatch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddText();
    }
  }, [handleAddText]);

  const selectedLayer = state.textLayers.find(
    layer => layer.id === state.selectedLayerId
  );

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}
        
        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Add Text</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter text..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2
                       text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAddText}
              disabled={!newText.trim() || isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                       hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </div>

        {/* Layer Controls */}
        {selectedLayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 border border-gray-700 rounded-lg p-4"
          >
            {/* Font Controls */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Font</label>
              <FontPicker
                value={selectedLayer.fontFamily}
                onChange={(font) => 
                  dispatch({
                    type: 'UPDATE_LAYER',
                    payload: {
                      id: selectedLayer.id,
                      updates: { fontFamily: font }
                    }
                  })
                }
              />
            </div>

            {/* Size Control */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Size</label>
              <input
                type="range"
                min="8"
                max="200"
                value={selectedLayer.fontSize}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_LAYER',
                    payload: {
                      id: selectedLayer.id,
                      updates: { fontSize: Number(e.target.value) }
                    }
                  })
                }
                className="w-full"
              />
            </div>

            {/* Color Control */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Color</label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-8 h-8 rounded border border-gray-600 transition-transform
                              hover:scale-105 active:scale-95"
                    style={{ backgroundColor: selectedLayer.color }}
                  />
                  <input
                    type="text"
                    value={selectedLayer.color}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_LAYER',
                        payload: {
                          id: selectedLayer.id,
                          updates: { color: e.target.value }
                        }
                      })
                    }
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1
                             text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                {showColorPicker && (
                  <ColorPicker
                    color={selectedLayer.color}
                    onChange={(color) =>
                      dispatch({
                        type: 'UPDATE_LAYER',
                        payload: {
                          id: selectedLayer.id,
                          updates: { color }
                        }
                      })
                    }
                    onClose={() => setShowColorPicker(false)}
                  />
                )}
              </div>
            </div>

            {/* Layer Position */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLayer.isBehind}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_LAYER',
                      payload: {
                        id: selectedLayer.id,
                        updates: { isBehind: e.target.checked }
                      }
                    })
                  }
                  className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-400">Behind Image</span>
              </label>
            </div>

            {/* Layer Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => dispatch({ type: 'DUPLICATE_LAYER', payload: selectedLayer.id })}
                className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded
                         hover:bg-gray-600 transition-colors"
              >
                Duplicate
              </button>
              <button
                onClick={() => dispatch({ type: 'DELETE_LAYER', payload: selectedLayer.id })}
                className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded
                         hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default TextControls; 