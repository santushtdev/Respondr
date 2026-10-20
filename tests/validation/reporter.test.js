import { describe, it, expect, vi } from 'vitest';
import { formatReport, printReport } from '../../src/reporter/index.js';
import { VALIDATION_ERROR_CODES } from '../../src/core/validation/rules.js';
import { PARSE_ERROR_CODES } from '../../src/core/validation/parser.js';

describe('Respondr Terminal Reporter (src/reporter/)', () => {
  it('formats a successful validation report with check counts (without colors)', () => {
    const validResult = {
      isValid: true,
      stage: 'validation',
      checksPerformed: 5,
      issueCount: 0,
      parsingError: null,
      issues: []
    };

    const output = formatReport(validResult, { colors: false, title: 'GET /api/notes' });

    expect(output).toContain('[Respondr] PASS: GET /api/notes');
    expect(output).toContain('(5 checks passed, 0 issues)');
    expect(output).toContain('✔');
  });

  it('formats a failure report with detailed issues (without colors)', () => {
    const failedResult = {
      isValid: false,
      stage: 'validation',
      checksPerformed: 12,
      issueCount: 2,
      parsingError: null,
      issues: [
        {
          code: VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD,
          stage: 'validation',
          path: 'notes[0].title',
          expected: 'defined',
          actual: 'undefined',
          message: "Missing required field 'notes[0].title'."
        },
        {
          code: VALIDATION_ERROR_CODES.TYPE_MISMATCH,
          stage: 'validation',
          path: 'notes[1].id',
          expected: 'number',
          actual: 'string',
          message: "Field 'notes[1].id' expected type 'number', but received 'string'."
        }
      ]
    };

    const output = formatReport(failedResult, { colors: false, title: 'GET /api/notes' });

    expect(output).toContain('[Respondr] FAIL: GET /api/notes');
    expect(output).toContain('(2 issues found, 12 checks performed)');
    expect(output).toContain('Stage: validation');
    expect(output).toContain('[MISSING_REQUIRED_FIELD] at notes[0].title');
    expect(output).toContain("Expected: 'defined'");
    expect(output).toContain("Actual:   'undefined'");
    expect(output).toContain('[TYPE_MISMATCH] at notes[1].id');
    expect(output).toContain("Expected: 'number'");
    expect(output).toContain("Actual:   'string'");
  });

  it('formats a JSON parsing error report cleanly', () => {
    const parseErrorResult = {
      isValid: false,
      stage: 'parse',
      checksPerformed: 1,
      issueCount: 1,
      parsingError: {
        code: PARSE_ERROR_CODES.INVALID_JSON_SYNTAX,
        message: 'Malformed JSON: Unexpected end of JSON input',
        details: 'Unexpected end of JSON input'
      },
      issues: [
        {
          code: PARSE_ERROR_CODES.INVALID_JSON_SYNTAX,
          stage: 'parse',
          path: '$',
          expected: 'valid JSON string',
          actual: 'INVALID_JSON_SYNTAX',
          message: 'Malformed JSON: Unexpected end of JSON input'
        }
      ]
    };

    const output = formatReport(parseErrorResult, { colors: false, title: 'POST /api/register' });

    expect(output).toContain('[Respondr] FAIL: POST /api/register');
    expect(output).toContain('Stage: parse');
    expect(output).toContain('Parsing Error:');
    expect(output).toContain('Code:    INVALID_JSON_SYNTAX');
    expect(output).toContain('Message: Malformed JSON: Unexpected end of JSON input');
  });

  it('applies ANSI color codes when colors: true is specified', () => {
    const validResult = {
      isValid: true,
      stage: 'validation',
      checksPerformed: 3,
      issueCount: 0,
      parsingError: null,
      issues: []
    };

    const output = formatReport(validResult, { colors: true });
    // ANSI green code \x1b[32m should be present
    expect(output).toContain('\x1b[32m');
    expect(output).toContain('\x1b[0m');
  });

  it('respects onlyFailures / quiet flag', () => {
    const validResult = {
      isValid: true,
      stage: 'validation',
      checksPerformed: 4,
      issueCount: 0,
      parsingError: null,
      issues: []
    };

    expect(formatReport(validResult, { onlyFailures: true })).toBe('');
    expect(formatReport(validResult, { quiet: true })).toBe('');

    const failedResult = {
      isValid: false,
      stage: 'validation',
      checksPerformed: 1,
      issueCount: 1,
      parsingError: null,
      issues: [
        {
          code: 'TYPE_MISMATCH',
          path: '$',
          expected: 'number',
          actual: 'string',
          message: 'Wrong type'
        }
      ]
    };

    expect(formatReport(failedResult, { onlyFailures: true })).not.toBe('');
  });

  describe('printReport', () => {
    it('calls console.log on valid result and returns true', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const validResult = {
        isValid: true,
        checksPerformed: 2,
        issueCount: 0,
        issues: []
      };

      const status = printReport(validResult, { colors: false });
      expect(status).toBe(true);
      expect(logSpy).toHaveBeenCalledTimes(1);
      logSpy.mockRestore();
    });

    it('calls console.error on invalid result and returns false', () => {
      const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const invalidResult = {
        isValid: false,
        stage: 'validation',
        checksPerformed: 2,
        issueCount: 1,
        issues: [
          {
            code: 'TYPE_MISMATCH',
            path: 'id',
            expected: 'number',
            actual: 'string',
            message: 'Wrong'
          }
        ]
      };

      const status = printReport(invalidResult, { colors: false });
      expect(status).toBe(false);
      expect(errSpy).toHaveBeenCalledTimes(1);
      errSpy.mockRestore();
    });

    it('does not log when onlyFailures is true and result is valid', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const validResult = {
        isValid: true,
        checksPerformed: 2,
        issueCount: 0,
        issues: []
      };

      const status = printReport(validResult, { onlyFailures: true });
      expect(status).toBe(true);
      expect(logSpy).not.toHaveBeenCalled();
      logSpy.mockRestore();
    });
  });
});
