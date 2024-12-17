import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useEditor } from '@/context/EditorContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Trash2, Copy, Move } from 'lucide-react';

interface Layer {
  id: string;
  type: 'text' | 'image';
  content: string;
  effects: {
    animation?: 'rotate' | 'float' | 'pulse' | 'none';
    color: string;
    metalness: number;
    roughness: number;
  };
  isVisible: boolean;
  opacity: number;
  position: { x: number; y: number; z: number };
}

interface EditorState {
  layers: Layer[];
  selectedLayerId: string | null;
}

export const LayerManager = () => {
  const { state, dispatch } = useEditor();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(state.layers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'REORDER_LAYERS', payload: items });
  };

  const handleAnimationChange = (id: string, animation: LayerProps['effects']['animation']) => {
    dispatch({
      type: 'UPDATE_LAYER',
      payload: {
        id,
        updates: { effects: { animation } }
      }
    });
  };

  const handleVisibilityToggle = (id: string) => {
    const layer = state.layers.find(l => l.id === id);
    if (layer) {
      dispatch({
        type: 'UPDATE_LAYER',
        payload: {
          id,
          updates: { isVisible: !layer.isVisible }
        }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <motion.div
        className="bg-editor-surface p-4 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-white text-sm font-medium mb-4">Layers</h3>
        <Droppable droppableId="layers">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2"
            >
              <AnimatePresence>
                {state.layers.map((layer, index) => (
                  <Draggable key={layer.id} draggableId={layer.id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`
                          bg-gray-800 rounded-lg p-3
                          ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500' : ''}
                          ${state.selectedLayerId === layer.id ? 'ring-2 ring-indigo-500' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps}>
                            <Move className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          <button
                            onClick={() => handleVisibilityToggle(layer.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {layer.isVisible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">
                              {layer.content || 'Text Layer'}
                            </p>
                          </div>

                          {layer.type === 'text' && (
                            <select
                              value={layer.effects.animation}
                              onChange={(e) => handleAnimationChange(layer.id, e.target.value as LayerProps['effects']['animation'])}
                              className="bg-gray-700 text-sm text-white rounded px-2 py-1"
                            >
                              <option value="none">No Animation</option>
                              <option value="rotate">Rotate</option>
                              <option value="float">Float</option>
                              <option value="pulse">Pulse</option>
                            </select>
                          )}

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dispatch({ type: 'DUPLICATE_LAYER', payload: layer.id })}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => dispatch({ type: 'DELETE_LAYER', payload: layer.id })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </motion.div>
    </DragDropContext>
  );
}; 