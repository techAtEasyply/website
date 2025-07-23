# Resume Templates

This directory contains modular resume templates for the resume builder application.

## Structure

```
src/templates/
├── index.ts                 # Main export file
├── types.ts                 # Shared TypeScript interfaces
├── modern-template.tsx      # Modern template component
├── minimalist-template.tsx  # Minimalist template component
├── elegant-template.tsx     # Elegant template component
├── creative-template.tsx    # Creative template component
└── arjun-template.tsx       # Arjun's custom template component
```

## Usage

Import templates from the main templates directory:

```typescript
import { 
  ModernTemplate, 
  MinimalistTemplate, 
  ElegantTemplate, 
  CreativeTemplate, 
  ArjunTemplate,
  TEMPLATES,
  ResumeData,
  TemplateProps 
} from '../templates';
```

## Template Structure

Each template is a React component that accepts `TemplateProps`:

```typescript
interface TemplateProps {
  resumeData: ResumeData;
  fontFamily: string;
}
```

## Adding New Templates

1. Create a new file in the `src/templates/` directory (e.g., `new-template.tsx`)
2. Export your template component
3. Add the export to `index.ts`
4. Add the template to the `TEMPLATES` array

Example:

```typescript
// new-template.tsx
import React from "react";
import { TemplateProps } from "./types";

export function NewTemplate({ resumeData, fontFamily }: TemplateProps) {
  // Your template implementation
}

// index.ts
export { NewTemplate } from "./new-template";

export const TEMPLATES = [
  // ... existing templates
  { label: "New Template", component: NewTemplate },
];
```

## Benefits of This Structure

- **Modularity**: Each template is in its own file
- **Maintainability**: Easy to update individual templates
- **Scalability**: Simple to add new templates
- **Type Safety**: Shared types ensure consistency
- **Clean Imports**: Single import point for all templates
