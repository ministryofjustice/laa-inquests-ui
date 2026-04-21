// SassPlugin type definitions

export interface SassPluginOptions {
  resolveDir?: string;
  loadPaths?: string[];
  quietDeps?: boolean;
  transform?: (source: string) => string;
  // Add other possible options
}
