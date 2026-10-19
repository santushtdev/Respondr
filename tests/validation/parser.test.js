import { describe, it, expect } from 'vitest';
import { parseJson, PARSE_ERROR_CODES } from '../../src/core/validation/parser.js';

describe('JSON Parser (parser.js)', () => {
  it('successfully parses valid JSON object string', () => {
    const raw = '{"id": 1, "name": "Respondr"}';
    const result = parseJson(raw);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ id: 1, name: 'Respondr' });
    expect(result.error).toBeNull();
  });

  it('successfully parses valid JSON array string', () => {
    const raw = '[1, "two", {"three": 3}]';
    const result = parseJson(raw);

    expect(result.success).toBe(true);
    expect(result.data).toEqual([1, 'two', { three: 3 }]);
    expect(result.error).toBeNull();
  });

  it('successfully parses valid JSON primitive strings', () => {
    expect(parseJson('"hello"').data).toBe('hello');
    expect(parseJson('42').data).toBe(42);
    expect(parseJson('true').data).toBe(true);
    expect(parseJson('null').data).toBeNull();
  });

  it('detects malformed JSON syntax with clear error', () => {
    const malformed = '{"id": 1, "name": }';
    const result = parseJson(malformed);

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBeDefined();
    expect(result.error.code).toBe(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX);
    expect(result.error.message).toContain('Malformed JSON');
  });

  it('handles unclosed brackets safely', () => {
    const unclosed = '{"items": [1, 2, 3}';
    const result = parseJson(unclosed);

    expect(result.success).toBe(false);
    expect(result.error.code).toBe(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX);
  });

  it('handles empty string and whitespace safely', () => {
    const emptyResult = parseJson('');
    expect(emptyResult.success).toBe(false);
    expect(emptyResult.error.code).toBe(PARSE_ERROR_CODES.EMPTY_INPUT);

    const whitespaceResult = parseJson('   \n\t  ');
    expect(whitespaceResult.success).toBe(false);
    expect(whitespaceResult.error.code).toBe(PARSE_ERROR_CODES.EMPTY_INPUT);
  });

  it('handles null and undefined input safely without throwing', () => {
    const nullResult = parseJson(null);
    expect(nullResult.success).toBe(false);
    expect(nullResult.error.code).toBe(PARSE_ERROR_CODES.EMPTY_INPUT);

    const undefinedResult = parseJson(undefined);
    expect(undefinedResult.success).toBe(false);
    expect(undefinedResult.error.code).toBe(PARSE_ERROR_CODES.EMPTY_INPUT);
  });

  it('handles non-string types safely without throwing', () => {
    const numberResult = parseJson(12345);
    expect(numberResult.success).toBe(false);
    expect(numberResult.error.code).toBe(PARSE_ERROR_CODES.INVALID_INPUT_TYPE);
    expect(numberResult.error.message).toContain("Expected JSON input to be of type 'string'");

    const objResult = parseJson({ already: 'parsed' });
    expect(objResult.success).toBe(false);
    expect(objResult.error.code).toBe(PARSE_ERROR_CODES.INVALID_INPUT_TYPE);
  });
});
