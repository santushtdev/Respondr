import type { ValidationResult } from '../index.js';

export interface ReportOptions {
  /** Optional title or endpoint identifier (e.g. 'GET /api/notes') */
  title?: string;
  /** Force enable or disable ANSI color codes */
  colors?: boolean;
  /** When true, omits output if validation succeeds */
  onlyFailures?: boolean;
  /** Alias for onlyFailures */
  quiet?: boolean;
}

/**
 * Formats a Respondr validation result into a terminal-friendly string.
 */
export function formatReport(result: ValidationResult, options?: ReportOptions): string;

/**
 * Prints the formatted report to console.log (if valid) or console.error (if invalid).
 * @returns boolean isValid status
 */
export function printReport(result: ValidationResult, options?: ReportOptions): boolean;
