
// Production configuration
export const config = {
  // Supabase configuration
  supabase: {
    url: 'https://pidctstmpphlkpnndrcq.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZGN0c3RtcHBobGtwbm5kcmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODY0MTQsImV4cCI6MjA2NTA2MjQxNH0._UfhZWpu4lHhqJrhWdRqkJu8-dW3eUPxH2zLA_0bvEo'
  },
  
  // App configuration
  app: {
    name: 'Opstean Healthcare',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development'
  },
  
  // Feature flags
  features: {
    enableAnalytics: import.meta.env.PROD,
    enableErrorReporting: import.meta.env.PROD,
    enablePerformanceMonitoring: import.meta.env.PROD
  }
};

export const isDevelopment = config.app.environment === 'development';
export const isProduction = config.app.environment === 'production';
