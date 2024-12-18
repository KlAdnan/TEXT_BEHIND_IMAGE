/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define which files to scan for classes
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom color definitions
      colors: {
        'editor-bg': '#0F172A',          // Editor background color
        'editor-surface': '#1E293B',     // Editor surface color
        'primary': '#6366F1',            // Primary theme color
        'primary-dark': '#4F46E5',       // Darker variant of primary
        'success': '#22C55E',            // Success state color
        'warning': '#F59E0B',            // Warning state color
        'danger': '#EF4444',             // Danger state color
      },
      // Custom animation definitions
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      // Custom keyframe definitions
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(99, 102, 241, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
        }
      }
    },
  },
  plugins: [],                           // No additional plugins
}; 
