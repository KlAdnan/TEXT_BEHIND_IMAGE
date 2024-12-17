'use client';
import React, { createContext, useContext, useReducer } from 'react';
import { TextLayer, UploadedImage } from '@/types';

interface Layer {
  id: string;
  type: 'text' | 'image';
  content: string;
  effects: {
    depth: number;
    metalness: number;
    roughness: number;
    color: string;
    animation: string;
  };
  position: { x: number; y: number; z: number };
}

interface EditorState {
  layers: Layer[];
  textLayers: TextLayer[];
  selectedLayerId: string | null;
  history: Layer[][];
  currentHistoryIndex: number;
}

type Action = 
  | { type: 'SET_IMAGE'; payload: UploadedImage }
  | { type: 'ADD_TEXT'; payload: string }
  | { type: 'UPDATE_LAYER'; payload: { id: string; updates: Partial<Layer> } }
  | { type: 'DELETE_LAYER'; payload: string }
  | { type: 'DUPLICATE_LAYER'; payload: string }
  | { type: 'SELECT_LAYER'; payload: string | null }
  | { type: 'REORDER_LAYERS'; payload: Layer[] }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const initialState: EditorState = {
  layers: [],
  textLayers: [],
  selectedLayerId: null,
  history: [],
  currentHistoryIndex: 0
};

function editorReducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, layers: [...state.layers, { id: Date.now().toString(), type: 'image', content: '', effects: { depth: 0, metalness: 0, roughness: 0, color: '', animation: '' }, position: { x: 0, y: 0, z: 0 } }] };
    
    case 'ADD_TEXT':
      const newLayer: TextLayer = {
        id: Date.now().toString(),
        text: action.payload,
        x: 50,
        y: 50,
        fontSize: 24,
        fontFamily: 'Inter',
        color: '#ffffff',
        isBehind: false
      };
      return {
        ...state,
        layers: [...state.layers, { id: newLayer.id, type: 'text', content: newLayer.text, effects: { depth: 0, metalness: 0, roughness: 0, color: newLayer.color, animation: '' }, position: { x: newLayer.x, y: newLayer.y, z: 0 } }],
        selectedLayerId: newLayer.id
      };
    
    case 'UPDATE_LAYER':
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === action.payload.id
            ? { ...layer, ...action.payload.updates }
            : layer
        )
      };
    
    case 'DELETE_LAYER':
      return {
        ...state,
        layers: state.layers.filter(layer => layer.id !== action.payload),
        selectedLayerId: state.selectedLayerId === action.payload ? null : state.selectedLayerId
      };
    
    case 'DUPLICATE_LAYER':
      const layerToDuplicate = state.layers.find(l => l.id === action.payload);
      if (!layerToDuplicate) return state;
      
      const duplicatedLayer: TextLayer = {
        ...layerToDuplicate,
        id: Date.now().toString(),
        x: layerToDuplicate.x + 20,
        y: layerToDuplicate.y + 20
      };
      
      return {
        ...state,
        layers: [...state.layers, { id: duplicatedLayer.id, type: 'text', content: duplicatedLayer.text, effects: { depth: 0, metalness: 0, roughness: 0, color: duplicatedLayer.color, animation: '' }, position: { x: duplicatedLayer.x, y: duplicatedLayer.y, z: 0 } }],
        selectedLayerId: duplicatedLayer.id
      };
    
    case 'SELECT_LAYER':
      return {
        ...state,
        selectedLayerId: action.payload
      };
    
    case 'REORDER_LAYERS':
      return {
        ...state,
        layers: action.payload
      };
    
    case 'UNDO':
      if (state.currentHistoryIndex > 0) {
        return {
          ...state,
          layers: state.history[state.currentHistoryIndex - 1],
          currentHistoryIndex: state.currentHistoryIndex - 1
        };
      }
      return state;
    
    case 'REDO':
      if (state.currentHistoryIndex < state.history.length - 1) {
        return {
          ...state,
          layers: state.history[state.currentHistoryIndex + 1],
          currentHistoryIndex: state.currentHistoryIndex + 1
        };
      }
      return state;
    
    default:
      return state;
  }
}

const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
} 