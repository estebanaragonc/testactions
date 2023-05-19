export interface ViewportConfig {
  preset: string;
  description: string;
  isMobile: boolean;
  width?: number;
  height?: number;
}

export const mobileViewports: ViewportConfig[] = [
  {
    preset: 'iPhone14',
    description: 'iPhone 14',
    isMobile: true,
    width: 390,
    height: 844,
  },
  // {
  //   preset: 'S22',
  //   description: 'S22',
  //   isMobile: true,
  //   width: 360,
  //   height: 780,
  // },
  // {
  //   preset: 'ipad-pro',
  //   description: 'iPad Pro',
  //   isMobile: true,
  //   width: 1024,
  //   height: 1366,
  // },
  // {
  //   preset: 'galaxyS8',
  //   description: 'Galaxy S8',
  //   isMobile: true,
  //   width: 360,
  //   height: 740,
  // },
];
