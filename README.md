# Text Behind Image Editor

A modern web application for creating stunning text-behind-image effects with 3D capabilities and real-time previews.

## 🚀 Features

- **Image Handling**
  - Drag and drop image upload
  - Multiple format support (JPEG, PNG, WebP)
  - Automatic image optimization
  - Size constraints (max 5MB)

- **Text Manipulation**
  - Multiple text layers
  - Font customization
  - Color picker with hex/rgba support
  - Size and position controls
  - Z-index management

- **Effects**
  - 3D text transformations
  - Glitch effects
  - Gradient overlays
  - Shadow effects
  - Animation options

- **Layer Management**
  - Drag-to-reorder layers
  - Visibility toggles
  - Duplicate/Delete operations
  - Layer positioning (front/behind image)

- **User Experience**
  - Responsive design
  - Keyboard shortcuts
  - Undo/Redo functionality
  - Real-time preview

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Staged files linter
- **TypeScript** - Type checking

### Build Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **cssnano** - CSS minification

### Deployment
- **Railway** - Deployment platform
- **Vercel** - (Alternative) Edge deployment

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/text-behind-image-editor.git
cd text-behind-image-editor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 8000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run format` - Format code with Prettier

## 🌐 Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL - Application URL (default: http://localhost:8000)
NEXT_PUBLIC_APP_NAME - Application name
NEXT_PUBLIC_APP_DESCRIPTION - Application description

# Feature Flags
NEXT_PUBLIC_ENABLE_3D_EFFECTS - Enable/disable 3D effects
NEXT_PUBLIC_ENABLE_ANIMATIONS - Enable/disable animations
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── effects/     # Visual effects components
│   │   └── layers/      # Layer management
│   ├── context/         # React context
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/              # Static files
└── tests/               # Test files
```

## 🔒 Security

- Image validation
- File size limits
- Content type checking
- Error boundaries
- Secure headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js for 3D rendering
- Framer Motion for animations
- Tailwind CSS for styling
- Next.js team for the framework
