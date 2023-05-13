export interface ViewportConfig {
  preset: string;
  description: string;
  width?: number;
  height?: number;
}

export const mobileViewports: ViewportConfig[] = [
  { preset: 'iPhone14', description: 'iPhone 14', width: 390, height: 844 },
  { preset: 'S22', description: 'S22', width: 360, height: 780 },
  { preset: 'ipad-pro', description: 'iPad Pro', width: 1024, height: 1366 },
  { preset: 'galaxyS8', description: 'Galaxy S8', width: 360, height: 740 },
];
