import { saveAs } from 'file-saver';

export async function downloadCanvas(canvas: HTMLCanvasElement, filename: string, format: string) {
  return new Promise<void>((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            saveAs(blob, `${filename}.${format}`);
            resolve();
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        `image/${format}`,
        1.0
      );
    } catch (error) {
      reject(error);
    }
  });
} 