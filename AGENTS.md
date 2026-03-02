# Agent Guidelines for neon-play

This guide is for agentic coding assistants working in this Next.js 15/React 19 codebase.

## Build & Test Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Production
npm run build            # Build for production (verifies TypeScript & ESLint)
npm run start            # Start production server

# Quality
npm run lint             # Run ESLint on the codebase
npm run clean            # Clear Next.js cache
```

Note: No test framework is currently configured. Add tests by setting up Vitest/Jest first.

## Code Style Guidelines

### Imports
- Client components start with `'use client'` directive
- Group imports: external libs → local `@/` modules → types
- Use `type` keyword for type-only imports: `import type {Metadata} from 'next'`
- Named imports preferred over default imports

Example:
```tsx
'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Game } from '@/lib/games';
import type { GameProps } from '@/types';
```

### File & Component Naming
- Components: PascalCase (GameCard.tsx, GameClient.tsx)
- Utilities: camelCase (formatNumber, formatDate)
- Hooks: camelCase with `use` prefix (useAnalytics, useFullscreen)
- Files: kebab-case (game-card.tsx, use-fullscreen.ts)

### Component Structure
- Define props interface before component
- Destructure props with default values
- Server components are `async` functions
- Client components use hooks (useState, useEffect, useCallback)

Example:
```tsx
interface GameCardProps {
  game: Game;
  position?: number;
  source?: 'grid' | 'related';
}

export default function GameCard({ game, position, source = 'grid' }: GameCardProps) {
  const handleClick = useCallback(() => {
    // logic
  }, [game.id]);

  return <div>...</div>;
}
```

### TypeScript Rules
- Strict mode enabled in tsconfig.json
- Explicit type annotations for function parameters
- Export types from lib files for reuse
- Use `interface` for object shapes, `type` for unions/primitives
- Avoid `any` - use `unknown` or proper typing

### React Patterns
- Use `useCallback` for event handlers to prevent re-renders
- Use `useEffect` for side effects and lifecycle
- Use `useRef` for DOM references and persistent values
- Custom hooks in `hooks/` or `lib/hooks/`
- Server components use `cache()` from React for memoization

### Styling (Tailwind CSS)
- Utility-first approach
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Neutral color scale for backgrounds/text
- Lime (`#84cc16`) for accents/hover states
- Use `cn()` utility from `@/lib/utils` for conditional classes

Example:
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "bg-neutral-800 p-4 rounded-lg",
  isActive && "bg-lime-400/10 border-lime-400"
)} />
```

### Error Handling
- Use try-catch for async operations
- Log descriptive errors with `console.error()`
- Graceful UI fallbacks where appropriate

### Analytics Tracking
All analytics go through `useAnalytics()` hook. Events follow pattern:
- `gameClick({ game_id, title, category, position, source })`
- `shareCompleted({ platform: 'twitter' | 'facebook' | 'copy' })`
- `fullscreenToggle('enter' | 'exit')`

### Code Organization
```
app/              # Next.js pages (server components by default)
components/       # Reusable UI components
lib/              # Utilities, data, and business logic
hooks/            # Custom React hooks
public/           # Static assets
```

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)
- Import like: `import { Game } from '@/lib/games'`

### ESLint
- Extends `eslint-config-next`
- Run `npm run lint` before committing
- Fix issues: `npm run lint -- --fix`

## Key Technical Details
- Next.js 15 with App Router
- React 19 with Server Components
- TypeScript strict mode
- Tailwind CSS v4
- Motion library for animations
- Client-side persistence via localStorage
