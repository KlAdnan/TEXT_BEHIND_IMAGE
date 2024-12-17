export interface FontTemplate {
  id: string;
  name: string;
  category: 'minimal' | 'aesthetic' | 'vintage' | 'modern' | 'gradient' | 'creative';
  description: string;
  fonts: {
    primary: FontConfig;
    secondary?: FontConfig;
    accent?: FontConfig;
  };
  colors: ColorPalette;
  effects?: TextEffects;
}

// Add strict type checking
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface FontConfig {
  family: string;
  weight: FontWeight;
  size: string;
  letterSpacing?: string;
  style?: 'normal' | 'italic';
}

interface ColorPalette {
  primary: string;
  secondary?: string;
  accent?: string;
  background?: string;
}

interface TextEffects {
  gradient?: string;
  fadeOut?: boolean;
  shadow?: string;
  outline?: string;
  glow?: string;
  glitch?: boolean;
}

export const AESTHETIC_TEMPLATES: FontTemplate[] = [
  {
    id: 'minimal-contrast',
    name: 'Minimal Contrast',
    category: 'minimal',
    description: 'Bold headlines with delicate subtext',
    fonts: {
      primary: {
        family: 'Montserrat',
        weight: 800,
        size: '4rem',
        letterSpacing: '-0.02em'
      },
      secondary: {
        family: 'Cormorant Garamond',
        weight: 300,
        size: '1.5rem',
        letterSpacing: '0.05em',
        style: 'italic'
      }
    },
    colors: {
      primary: '#1a1a1a',
      secondary: '#666666',
      background: '#f8f8f8'
    }
  },
  {
    id: 'dreamy-aesthetic',
    name: 'Dreamy Aesthetic',
    category: 'aesthetic',
    description: 'Soft, ethereal typography with gradient effects',
    fonts: {
      primary: {
        family: 'Ginger',
        weight: 500,
        size: '3.5rem',
        letterSpacing: '0.03em'
      },
      accent: {
        family: 'La Belle Aurore',
        weight: 400,
        size: '2rem'
      }
    },
    colors: {
      primary: '#ff758c',
      secondary: '#ff7eb3',
      background: '#fff0f3'
    },
    effects: {
      gradient: 'linear-gradient(45deg, #ff758c 0%, #ff7eb3 100%)',
      glow: '0 0 20px rgba(255, 117, 140, 0.3)'
    }
  },
  {
    id: 'vintage-fade',
    name: 'Vintage Fade',
    category: 'vintage',
    description: 'Classic typography with elegant fade-out effect',
    fonts: {
      primary: {
        family: 'Butler',
        weight: 600,
        size: '4rem',
        letterSpacing: '0.04em'
      },
      secondary: {
        family: 'Old Standard TT',
        weight: 400,
        size: '1.2rem',
        style: 'italic'
      }
    },
    colors: {
      primary: '#2c1810',
      secondary: '#8b4513',
      background: '#f4e4bc'
    },
    effects: {
      fadeOut: true,
      shadow: '2px 2px 4px rgba(0,0,0,0.2)'
    }
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    category: 'modern',
    description: 'Bold neon-inspired typography with glow effects',
    fonts: {
      primary: {
        family: 'Clash Display',
        weight: 700,
        size: '5rem',
        letterSpacing: '-0.03em'
      }
    },
    colors: {
      primary: '#00fff5',
      secondary: '#ff00ff',
      background: '#0a0a0a'
    },
    effects: {
      glow: '0 0 20px #00fff5, 0 0 40px #00fff5, 0 0 60px #00fff5',
      outline: '2px solid #00fff5'
    }
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    category: 'aesthetic',
    description: 'Soft pastel gradients with dreamy typography',
    fonts: {
      primary: {
        family: 'Recoleta',
        weight: 500,
        size: '3.8rem'
      },
      secondary: {
        family: 'Quicksand',
        weight: 300,
        size: '1.4rem',
        letterSpacing: '0.1em'
      }
    },
    colors: {
      primary: '#e0c3fc',
      secondary: '#8ec5fc',
      background: '#ffffff'
    },
    effects: {
      gradient: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      shadow: '0 4px 15px rgba(224, 195, 252, 0.3)'
    }
  },
  {
    id: 'brutalist-bold',
    name: 'Brutalist Bold',
    category: 'modern',
    description: 'Strong, impactful typography with harsh contrasts',
    fonts: {
      primary: {
        family: 'Obviously',
        weight: 900,
        size: '6rem',
        letterSpacing: '-0.05em'
      },
      accent: {
        family: 'Space Mono',
        weight: 400,
        size: '1rem',
        letterSpacing: '0.2em'
      }
    },
    colors: {
      primary: '#000000',
      accent: '#ff0000',
      background: '#ffffff'
    }
  },
  {
    id: 'kawaii-cute',
    name: 'Kawaii Cute',
    category: 'aesthetic',
    description: 'Playful and cute Japanese-inspired typography',
    fonts: {
      primary: {
        family: 'Varela Round',
        weight: 400,
        size: '3.2rem',
        letterSpacing: '0.02em'
      },
      secondary: {
        family: 'M PLUS Rounded 1c',
        weight: 300,
        size: '1.2rem',
        letterSpacing: '0.1em'
      }
    },
    colors: {
      primary: '#ff9ed8',
      secondary: '#b8c0ff',
      background: '#fff0f9'
    },
    effects: {
      gradient: 'linear-gradient(45deg, #ff9ed8 0%, #b8c0ff 100%)',
      shadow: '4px 4px 0px #ffb7e5'
    }
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    category: 'aesthetic',
    description: 'Retro-futuristic aesthetic with bold gradients',
    fonts: {
      primary: {
        family: 'VCR OSD Mono',
        weight: 400,
        size: '4.5rem',
        letterSpacing: '0.15em'
      },
      accent: {
        family: 'Helios',
        weight: 700,
        size: '1.8rem',
        letterSpacing: '0.3em'
      }
    },
    colors: {
      primary: '#ff71ce',
      secondary: '#01cdfe',
      accent: '#05ffa1',
      background: '#1a1a1a'
    },
    effects: {
      gradient: 'linear-gradient(180deg, #ff71ce 0%, #01cdfe 50%, #05ffa1 100%)',
      glow: '0 0 10px #ff71ce, 0 0 20px #01cdfe, 0 0 30px #05ffa1'
    }
  },
  {
    id: 'minimalist-fade',
    name: 'Minimalist Fade',
    category: 'minimal',
    description: 'Clean typography with elegant fade effects',
    fonts: {
      primary: {
        family: 'Made Gentle',
        weight: 300,
        size: '5rem',
        letterSpacing: '-0.02em'
      }
    },
    colors: {
      primary: '#333333',
      background: '#ffffff'
    },
    effects: {
      fadeOut: true,
      gradient: 'linear-gradient(90deg, #333333 0%, transparent 100%)'
    }
  },
  {
    id: 'korean-aesthetic',
    name: 'K-Style',
    category: 'aesthetic',
    description: 'Modern Korean typography style',
    fonts: {
      primary: {
        family: 'Pretendard',
        weight: 600,
        size: '4.2rem',
        letterSpacing: '-0.03em'
      },
      secondary: {
        family: 'IBM Plex Sans KR',
        weight: 200,
        size: '1.4rem',
        letterSpacing: '0.2em'
      }
    },
    colors: {
      primary: '#000000',
      secondary: '#8e8e8e',
      background: '#f3f3f3'
    },
    effects: {
      shadow: '20px 20px 60px #cfcfcf, -20px -20px 60px #ffffff'
    }
  },
  {
    id: 'glitch-aesthetic',
    name: 'Glitch Effect',
    category: 'creative',
    description: 'Cyberpunk-inspired glitch typography',
    fonts: {
      primary: {
        family: 'Basement Grotesque',
        weight: 800,
        size: '5.5rem',
        letterSpacing: '-0.05em'
      }
    },
    colors: {
      primary: '#00ff00',
      secondary: '#ff0000',
      accent: '#0000ff',
      background: '#000000'
    },
    effects: {
      glitch: true,
      shadow: `
        2px 2px 0px #ff0000,
        -2px -2px 0px #00ff00,
        1px -1px 0px #0000ff
      `
    }
  }
];

// Add validation function
const validateTemplate = (template: FontTemplate): boolean => {
  try {
    const { fonts, colors, effects } = template;
    
    // Validate required fields
    if (!fonts.primary) return false;
    if (!colors.primary) return false;
    
    // Validate font weights
    if (fonts.primary.weight % 100 !== 0 || 
        fonts.primary.weight < 100 || 
        fonts.primary.weight > 900) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Template validation error:', error);
    return false;
  }
};

// Use validation in applyTemplate
export const applyTemplate = (element: HTMLElement | null, template: FontTemplate) => {
  if (!element) {
    console.warn('No element provided to applyTemplate');
    return;
  }
  
  if (!validateTemplate(template)) {
    console.error('Invalid template configuration');
    return;
  }
  
  try {
    const { fonts, colors, effects } = template;

    // Add type safety for style properties
    const style = element.style as CSSStyleDeclaration;
    style.fontFamily = fonts.primary.family;
    style.fontWeight = fonts.primary.weight.toString();
    style.fontSize = fonts.primary.size;
    style.letterSpacing = fonts.primary.letterSpacing || 'normal';

    // Apply effects with error handling
    if (effects) {
      applyEffects(element, effects, template.category);
    }
  } catch (error) {
    console.error('Error applying template:', error);
  }
};

// Add a separate function for applying effects
const applyEffects = (
  element: HTMLElement, 
  effects: TextEffects, 
  category: FontTemplate['category']
): void => {
  try {
    if (effects.gradient) {
      element.style.backgroundImage = effects.gradient;
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
    }

    if (effects.glow) {
      element.style.textShadow = effects.glow;
    }

    if (effects.fadeOut) {
      element.style.maskImage = 'linear-gradient(to right, black 80%, transparent 100%)';
      element.style.webkitMaskImage = 'linear-gradient(to right, black 80%, transparent 100%)';
    }

    if (effects.glitch) {
      element.classList.add('glitch-effect');
      element.setAttribute('data-text', element.textContent || '');
    }

    if (effects.shadow) {
      element.style.textShadow = effects.shadow;
    }

    // Add animation classes
    switch (category) {
      case 'aesthetic':
        element.classList.add('aesthetic-hover');
        break;
      case 'creative':
        element.classList.add('creative-transform');
        break;
      case 'minimal':
        element.classList.add('minimal-transition');
        break;
    }
  } catch (error) {
    console.error('Error applying effects:', error);
  }
}; 