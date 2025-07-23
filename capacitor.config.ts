import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rcl26.dreamweave',
  appName: 'dreamweave-ai',
  webDir: 'dist',
  server: {
    url: 'https://2409b9ba-1df9-4b04-a649-bf554b1562d5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;