import { describe, it, expect } from 'vitest';
import {
  validate,
  validateApiResponse,
  parseJson,
  PARSE_ERROR_CODES,
  VALIDATION_ERROR_CODES,
  getType,
  Respondr
} from '../../src/index.js';

describe('Respondr SDK Facade (src/index.js)', () => {
  const noteSchema = {
    type: 'object',
    required: ['id', 'title', 'content'],
    properties: {
      id: { type: 'number', min: 1 },
      title: { type: 'string', minLength: 1 },
      content: { type: 'string' },
      category: { type: 'string', nullable: true }
    }
  };

  const noteListSchema = {
    type: 'array',
    items: noteSchema,
    minItems: 1
  };

  describe('Polymorphic Input Handling', () => {
    it('validates a raw JSON string successfully', () => {
      const json = JSON.stringify({
        id: 1,
        title: 'Learn Vitest',
        content: 'Write unit tests for the SDK',
        category: 'testing'
      });

      const result = validate(json, noteSchema);
      expect(result.isValid).toBe(true);
      expect(result.stage).toBe('validation');
      expect(result.issueCount).toBe(0);
      expect(result.parsingError).toBeNull();
    });

    it('returns parse stage error when raw JSON string is malformed', () => {
      const malformed = '{"id": 1, "title": ';
      const result = validate(malformed, noteSchema);

      expect(result.isValid).toBe(false);
      expect(result.stage).toBe('parse');
      expect(result.parsingError).toBeDefined();
      expect(result.parsingError.code).toBe(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX);
      expect(result.issueCount).toBe(1);
    });

    it('validates an already-parsed JavaScript object successfully', () => {
      const obj = {
        id: 42,
        title: 'Pre-parsed object',
        content: 'From fetch res.json() or Axios',
        category: null
      };

      const result = validate(obj, noteSchema);
      expect(result.isValid).toBe(true);
      expect(result.stage).toBe('validation');
      expect(result.issueCount).toBe(0);
      expect(result.parsingError).toBeNull();
    });

    it('detects validation issues in an already-parsed JavaScript object', () => {
      const obj = {
        id: 'forty-two', // type mismatch
        // missing title
        content: 12345 // type mismatch
      };

      const result = validate(obj, noteSchema);
      expect(result.isValid).toBe(false);
      expect(result.stage).toBe('validation');
      expect(result.issueCount).toBeGreaterThanOrEqual(2);
      expect(result.parsingError).toBeNull();

      const paths = result.issues.map((i) => i.path);
      expect(paths).toContain('id');
      expect(paths).toContain('title');
      expect(paths).toContain('content');
    });
  });

  describe('Root Array Payload Validation (DevJournal Pattern)', () => {
    it('validates a valid root array of note objects', () => {
      const notes = [
        { id: 1, title: 'First Note', content: 'Hello world', category: 'general' },
        { id: 2, title: 'Second Note', content: 'No category', category: null }
      ];

      const result = validate(notes, noteListSchema);
      expect(result.isValid).toBe(true);
      expect(result.issueCount).toBe(0);
      expect(result.checksPerformed).toBeGreaterThan(0);
    });

    it('validates a valid root array passed as raw JSON string', () => {
      const json = JSON.stringify([
        { id: 10, title: 'JSON Note', content: 'Parsed from string', category: null }
      ]);

      const result = validate(json, noteListSchema);
      expect(result.isValid).toBe(true);
      expect(result.issueCount).toBe(0);
    });

    it('detects errors inside items of a root array with indexed paths', () => {
      const invalidNotes = [
        { id: 1, title: 'Valid note', content: 'All good' },
        { id: 'not-a-number', title: 'Invalid ID', content: 'Bad id type' },
        { id: 3, content: 'Missing title' }
      ];

      const result = validate(invalidNotes, noteListSchema);
      expect(result.isValid).toBe(false);

      const idIssue = result.issues.find((i) => i.path === '$[1].id');
      expect(idIssue).toBeDefined();
      expect(idIssue.code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);

      const titleIssue = result.issues.find((i) => i.path === '$[2].title');
      expect(titleIssue).toBeDefined();
      expect(titleIssue.code).toBe(VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD);
    });

    it('enforces minItems constraint on root array', () => {
      const emptyArray = [];
      const result = validate(emptyArray, noteListSchema);

      expect(result.isValid).toBe(false);
      const minIssue = result.issues.find((i) => i.code === VALIDATION_ERROR_CODES.INVALID_VALUE);
      expect(minIssue).toBeDefined();
      expect(minIssue.path).toBe('$');
    });

    it('detects type mismatch when root payload is object but array expected', () => {
      const objectInsteadOfArray = { id: 1, title: 'Single Note', content: 'Not in array' };
      const result = validate(objectInsteadOfArray, noteListSchema);

      expect(result.isValid).toBe(false);
      expect(result.issues[0].code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);
      expect(result.issues[0].expected).toBe('array');
      expect(result.issues[0].actual).toBe('object');
    });
  });

  describe('SDK Re-exports and Utilities', () => {
    it('exposes validateApiResponse, parseJson, getType, and error codes', () => {
      expect(typeof validateApiResponse).toBe('function');
      expect(typeof parseJson).toBe('function');
      expect(typeof getType).toBe('function');
      expect(getType([])).toBe('array');
      expect(getType({})).toBe('object');
      expect(getType(null)).toBe('null');
      expect(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX).toBe('INVALID_JSON_SYNTAX');
      expect(VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD).toBe('MISSING_REQUIRED_FIELD');
    });

    it('exposes Respondr namespace object', () => {
      expect(Respondr.validate).toBe(validate);
      expect(Respondr.validateApiResponse).toBe(validateApiResponse);
      expect(Respondr.parseJson).toBe(parseJson);
    });
  });
});
