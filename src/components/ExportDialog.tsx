'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadCanvas } from '@/utils/fileHandler';

interface ExportDialogProps {
  canvas: HTMLCanvasElement | null;
  onClose: () => void;
}

interface ExportOptions {
  format: 'png' | 'jpeg' | 'webp';
  quality: number;
  scale: number;
  filename: string;
  background: string;
  effects: {
    shadow: boolean;
    border: boolean;
    watermark: boolean;
    gradient: boolean;
    noise: boolean;
    vignette: boolean;
  };
  borderRadius: number;
  padding: number;
  style: {
    borderWidth: number;
    borderColor: string;
    shadowColor: string;
    shadowBlur: number;
    gradientColors: [string, string];
    noiseOpacity: number;
    vignetteIntensity: number;
  };
}

export function ExportDialog({ canvas, onClose }: ExportDialogProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'png',
    quality: 1.0,
    scale: 2,
    filename: 'my-image',
    background: '#ffffff',
    effects: {
      shadow: true,
      border: false,
      watermark: false,
      gradient: false,
      noise: false,
      vignette: false
    },
    borderRadius: 16,
    padding: 20,
    style: {
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.2)',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowBlur: 20,
      gradientColors: ['#00000000', '#00000066'],
      noiseOpacity: 0.05,
      vignetteIntensity: 0.3
    }
  });
  const [isExporting, setIsExporting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Add noise effect to canvas
  const addNoise = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const noise = options.style.noiseOpacity;

    for (let i = 0; i < data.length; i += 4) {
      const random = (Math.random() - 0.5) * noise;
      data[i] += random * 255;     // Red
      data[i + 1] += random * 255; // Green
      data[i + 2] += random * 255; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // Add vignette effect
  const addVignette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 1.5
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, `rgba(0,0,0,${options.style.vignetteIntensity})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  // Generate preview when options change
  React.useEffect(() => {
    if (!canvas) return;
    const preview = document.createElement('canvas');
    const ctx = preview.getContext('2d');
    if (!ctx) return;

    // Set dimensions with padding
    const padding = options.padding * 2;
    preview.width = (canvas.width + padding) / 2;
    preview.height = (canvas.height + padding) / 2;

    // Clear canvas
    ctx.clearRect(0, 0, preview.width, preview.height);

    // Apply effects in order
    if (options.effects.shadow) {
      ctx.shadowColor = options.style.shadowColor;
      ctx.shadowBlur = options.style.shadowBlur;
      ctx.shadowOffsetY = 10;
    }

    // Draw with border radius if enabled
    if (options.borderRadius > 0) {
      ctx.beginPath();
      ctx.moveTo(options.borderRadius, 0);
      ctx.lineTo(preview.width - options.borderRadius, 0);
      ctx.quadraticCurveTo(preview.width, 0, preview.width, options.borderRadius);
      ctx.lineTo(preview.width, preview.height - options.borderRadius);
      ctx.quadraticCurveTo(preview.width, preview.height, preview.width - options.borderRadius, preview.height);
      ctx.lineTo(options.borderRadius, preview.height);
      ctx.quadraticCurveTo(0, preview.height, 0, preview.height - options.borderRadius);
      ctx.lineTo(0, options.borderRadius);
      ctx.quadraticCurveTo(0, 0, options.borderRadius, 0);
      ctx.closePath();
      ctx.clip();
    }

    // Draw background
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, preview.width, preview.height);

    // Draw image
    ctx.drawImage(canvas, 0, 0, preview.width, preview.height);

    // Add border if enabled
    if (options.effects.border) {
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, preview.width, preview.height);
    }

    // Add watermark if enabled
    if (options.effects.watermark) {
      ctx.font = '14px Inter';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.textAlign = 'right';
      ctx.fillText('Created with Text Behind Image Editor', preview.width - 10, preview.height - 10);
    }

    // Add gradient overlay
    if (options.effects.gradient) {
      const gradient = ctx.createLinearGradient(0, 0, 0, preview.height);
      gradient.addColorStop(0, options.style.gradientColors[0]);
      gradient.addColorStop(1, options.style.gradientColors[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, preview.width, preview.height);
    }

    // Add noise
    if (options.effects.noise) {
      addNoise(ctx, preview.width, preview.height);
    }

    // Add vignette
    if (options.effects.vignette) {
      addVignette(ctx, preview.width, preview.height);
    }

    setPreviewUrl(preview.toDataURL());
  }, [canvas, options]);

  const handleExport = async () => {
    if (!canvas) return;
    
    try {
      setIsExporting(true);
      await downloadCanvas(canvas, options.filename, options.format);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full space-y-4"
      >
        <h2 className="text-xl font-semibold text-white">Export Image</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Preview</h3>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="space-y-4">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Format</label>
              <select
                value={options.format}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  format: e.target.value as ExportOptions['format']
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2
                         text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="png">PNG (Lossless)</option>
                <option value="webp">WebP (Best compression)</option>
                <option value="jpeg">JPEG (Smaller size)</option>
              </select>
            </div>

            {/* Quality Control */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Quality</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={options.quality}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  quality: Number(e.target.value)
                }))}
                className="w-full"
              />
              <div className="text-sm text-gray-400 text-right">
                {Math.round(options.quality * 100)}%
              </div>
            </div>

            {/* Scale Control */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Scale</label>
              <select
                value={options.scale}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  scale: Number(e.target.value)
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2
                         text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="1">1x (Original)</option>
                <option value="2">2x (High-res)</option>
                <option value="4">4x (Ultra HD)</option>
              </select>
            </div>

            {/* Filename Input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Filename</label>
              <input
                type="text"
                value={options.filename}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  filename: e.target.value
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2
                         text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* New controls */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Border Radius</label>
              <input
                type="range"
                min="0"
                max="50"
                value={options.borderRadius}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  borderRadius: Number(e.target.value)
                }))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Background</label>
              <input
                type="color"
                value={options.background}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  background: e.target.value
                }))}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Effects</label>
              <div className="space-y-2">
                {Object.entries(options.effects).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setOptions(prev => ({
                        ...prev,
                        effects: {
                          ...prev.effects,
                          [key]: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-600"
                    />
                    <span className="text-sm text-gray-400 capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Advanced Style Controls */}
            {Object.keys(options.effects).some(key => options.effects[key]) && (
              <div className="mt-4 space-y-4 border-t border-gray-700 pt-4">
                <h3 className="text-sm font-medium text-gray-400">Style Options</h3>
                
                {options.effects.border && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Border Width</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={options.style.borderWidth}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          style: {
                            ...prev.style,
                            borderWidth: Number(e.target.value)
                          }
                        }))}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Border Color</label>
                      <input
                        type="color"
                        value={options.style.borderColor}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          style: {
                            ...prev.style,
                            borderColor: e.target.value
                          }
                        }))}
                        className="w-full h-8 rounded"
                      />
                    </div>
                  </>
                )}

                {/* Add similar controls for other effects */}
                {options.effects.gradient && (
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Gradient Colors</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={options.style.gradientColors[0]}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          style: {
                            ...prev.style,
                            gradientColors: [e.target.value, prev.style.gradientColors[1]]
                          }
                        }))}
                        className="flex-1 h-8 rounded"
                      />
                      <input
                        type="color"
                        value={options.style.gradientColors[1]}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          style: {
                            ...prev.style,
                            gradientColors: [prev.style.gradientColors[0], e.target.value]
                          }
                        }))}
                        className="flex-1 h-8 rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Add controls for noise and vignette intensity */}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <span className="animate-spin">↻</span>
                Exporting...
              </>
            ) : (
              'Export'
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 