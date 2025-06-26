
import { isDevelopment } from '@/lib/config';

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: any;
}

class Logger {
  private shouldLog(level: 'info' | 'warn' | 'error'): boolean {
    if (isDevelopment) return true;
    return level === 'error'; // Only log errors in production
  }

  info(message: string, context?: LogContext) {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, context || '');
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, context || '');
    }
  }

  error(message: string, error?: Error, context?: LogContext) {
    // Always log errors, even in production, but sanitize sensitive data
    const sanitizedContext = this.sanitizeContext(context);
    console.error(`[ERROR] ${message}`, error || '', sanitizedContext || '');
  }

  // Security enhancement: sanitize sensitive data from logs
  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;
    
    const sanitized = { ...context };
    // Remove sensitive fields
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.email; // Remove email from production logs
    delete sanitized.phone;
    
    return sanitized;
  }

  // Production-safe logging for security events
  security(event: string, context?: LogContext) {
    const sanitizedContext = this.sanitizeContext(context);
    console.warn(`[SECURITY] ${event}`, sanitizedContext || '');
  }
}

export const logger = new Logger();
