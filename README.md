
# Mindset Coaching Website

A modern, responsive website for professional mindset coaching services built with React and TypeScript.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast loading with Vite build system
- 📱 Mobile-first approach with PWA capabilities
- 🔍 SEO optimized with structured data
- 🎯 Google Tag Manager integration
- 🛡️ Security headers and best practices
- 🎭 Component-based architecture with shadcn/ui
- 🔧 Admin dashboard for content management

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase
- **State Management**: React Query
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Analytics**: Google Tag Manager

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── admin/          # Admin dashboard components
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── styles/             # CSS and styling files
├── utils/              # Utility functions
└── main.tsx           # Application entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment on Netlify with:
- Automatic builds from Git
- Security headers
- SPA routing support
- Performance optimizations

## Admin Dashboard

Access the admin dashboard at `/dashboard-management-portal-9a7b2c3d` to manage:
- Content sections
- SEO settings
- Global settings
- Media library
- User management

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.
