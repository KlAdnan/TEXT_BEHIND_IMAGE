export interface FontOption {
  name: string;
  family: string;
  category: FontCategory;
  variants?: string[];
  fallback: string;
}

export type FontCategory = 
  | 'sans-serif'
  | 'serif'
  | 'display'
  | 'handwriting'
  | 'monospace'
  | 'creative';

export const FONT_CATEGORIES: FontCategory[] = [
  'sans-serif',
  'serif',
  'display',
  'handwriting',
  'monospace',
  'creative'
];

export const FONTS: FontOption[] = [
  // Sans-Serif Fonts
  {
    name: 'Inter',
    family: 'Inter',
    category: 'sans-serif',
    variants: ['300', '400', '500', '600', '700'],
    fallback: 'system-ui'
  },
  {
    name: 'Roboto',
    family: 'Roboto',
    category: 'sans-serif',
    variants: ['300', '400', '500', '700'],
    fallback: 'Arial'
  },
  
  // Serif Fonts
  {
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    variants: ['400', '500', '600', '700', '800'],
    fallback: 'Georgia'
  },
  {
    name: 'Merriweather',
    family: 'Merriweather',
    category: 'serif',
    variants: ['300', '400', '700'],
    fallback: 'Times New Roman'
  },

  // Display Fonts
  {
    name: 'Bebas Neue',
    family: 'Bebas Neue',
    category: 'display',
    variants: ['400'],
    fallback: 'Impact'
  },
  {
    name: 'Righteous',
    family: 'Righteous',
    category: 'display',
    variants: ['400'],
    fallback: 'Arial Black'
  },

  // Handwriting Fonts
  {
    name: 'Dancing Script',
    family: 'Dancing Script',
    category: 'handwriting',
    variants: ['400', '500', '600', '700'],
    fallback: 'cursive'
  },
  {
    name: 'Pacifico',
    family: 'Pacifico',
    category: 'handwriting',
    variants: ['400'],
    fallback: 'cursive'
  },

  // Monospace Fonts
  {
    name: 'Fira Code',
    family: 'Fira Code',
    category: 'monospace',
    variants: ['300', '400', '500', '600', '700'],
    fallback: 'monospace'
  },
  {
    name: 'JetBrains Mono',
    family: 'JetBrains Mono',
    category: 'monospace',
    variants: ['400', '700'],
    fallback: 'monospace'
  },

  // Creative Fonts
  {
    name: 'Fredoka One',
    family: 'Fredoka One',
    category: 'creative',
    variants: ['400'],
    fallback: 'Arial'
  },
  {
    name: 'Permanent Marker',
    family: 'Permanent Marker',
    category: 'creative',
    variants: ['400'],
    fallback: 'Impact'
  }
];

// Font loading utility
export const loadFonts = async () => {
  const fontFamilies = FONTS.map(font => ({
    family: font.family,
    variants: font.variants || ['400']
  }));

  try {
    await Promise.all(
      fontFamilies.map(async ({ family, variants }) => {
        const fontFaces = variants.map(weight => new FontFace(
          family,
          `url(https://fonts.googleapis.com/css2?family=${family.replace(' ', '+')}:wght@${weight})`
        ));
        await Promise.all(fontFaces.map(face => face.load()));
        fontFaces.forEach(face => document.fonts.add(face));
      })
    );
  } catch (error) {
    console.error('Failed to load fonts:', error);
  }
}; 