import { ModernTemplate } from "./modern-template";
import { MinimalistTemplate } from "./minimalist-template";
import { ElegantTemplate } from "./elegant-template";
import { CreativeTemplate } from "./creative-template";
import { ArjunTemplate } from "./arjun-template";

export { ModernTemplate } from "./modern-template";
export { MinimalistTemplate } from "./minimalist-template";
export { ElegantTemplate } from "./elegant-template";
export { CreativeTemplate } from "./creative-template";
export { ArjunTemplate } from "./arjun-template";
export * from "./types";

// Template registry for easy access
export const TEMPLATES = [
  { label: "Modern", component: ModernTemplate },
  { label: "Minimalist", component: MinimalistTemplate },
  { label: "Elegant", component: ElegantTemplate },
  { label: "Creative", component: CreativeTemplate },
  { label: "Arjun's Template", component: ArjunTemplate },
];
