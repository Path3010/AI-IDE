# CodeAI - AI-Powered IDE

## Overview

CodeAI is an AI-powered integrated development environment that transforms how developers write code. Built as a modern web application, it provides a familiar VS Code-like interface enhanced with advanced AI capabilities including intelligent code completion, real-time analysis, smart debugging, and automated code generation. The application serves as a landing page showcasing the IDE's features with an early access program for developers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with **React 18** using TypeScript and follows a modern component-based architecture:
- **UI Framework**: Utilizes shadcn/ui components built on Radix UI primitives for consistent, accessible design
- **Styling**: TailwindCSS with custom VS Code-inspired dark theme variables and color scheme
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **Animation**: Framer Motion for smooth page transitions and interactive animations
- **Development**: Vite as the build tool with hot module replacement and TypeScript support

### Backend Architecture
The backend follows an **Express.js** REST API pattern:
- **Server Framework**: Express.js with TypeScript support
- **API Design**: RESTful architecture with `/api` prefix for all endpoints
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Development Server**: TSX for TypeScript execution with hot reloading

### Data Storage Architecture
**Database**: PostgreSQL as the primary database with the following design decisions:
- **ORM**: Drizzle ORM chosen for type-safe database operations and excellent TypeScript integration
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` with Zod validation
- **Migration Strategy**: Drizzle Kit for database migrations stored in `./migrations`
- **Connection**: Neon Database serverless driver for production-ready PostgreSQL hosting

### Component Architecture
**Design System**: 
- Custom component library based on shadcn/ui for consistent UI patterns
- Modular section-based page components (Hero, Features, Demo, Testimonials, Pricing)
- Responsive design with mobile-first approach
- Accessible components using Radix UI primitives

### Development Environment
**Replit Integration**: 
- Custom Vite plugins for Replit-specific development features
- Runtime error overlay for enhanced debugging
- Cartographer plugin for development environment mapping

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Radix UI**: Comprehensive component primitives library for accessibility
- **TailwindCSS**: Utility-first CSS framework with PostCSS processing
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Consistent icon library
- **React Icons**: Additional icon sets including Font Awesome

### Development Tools
- **Vite**: Fast build tool with React plugin and development server
- **TypeScript**: Type-safe JavaScript with strict configuration
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Vite Plugins**: Development environment enhancements for Replit

### Form and Data Management
- **React Hook Form**: Performant form library with validation
- **Hookform Resolvers**: Validation resolvers for form schemas
- **Zod**: Schema validation library integrated with Drizzle
- **TanStack React Query**: Server state management and caching
- **date-fns**: Date manipulation and formatting utilities

### Development Dependencies
- **TSX**: TypeScript execution engine for development
- **Wouter**: Lightweight routing library for React
- **Class Variance Authority**: Utility for managing CSS class variants
- **clsx**: Conditional className utility
- **cmdk**: Command palette component library