import { describe, it, expect } from 'vitest';
import { validateApiResponse } from '../../src/core/validation/index.js';

describe('UI Validation Scenarios', () => {
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      active: { type: 'boolean' },
      role: { type: 'string' }
    },
    required: ['id', 'name', 'active']
  };

  it('Scenario 1: Valid JSON response matching schema', () => {
    const payload = JSON.stringify({
      id: 101,
      name: 'Alex',
      active: true,
      role: 'admin'
    });

    const result = validateApiResponse(payload, schema);
    expect(result.isValid).toBe(true);
    expect(result.issueCount).toBe(0);
    expect(result.checksPerformed).toBeGreaterThan(0);
    expect(result.parsingError).toBeNull();
  });

  it('Scenario 2: Invalid JSON response with type mismatch (active is "yes")', () => {
    const payload = JSON.stringify({
      id: 101,
      name: 'Alex',
      active: 'yes',
      role: 'admin'
    });

    const result = validateApiResponse(payload, schema);
    expect(result.isValid).toBe(false);
    expect(result.issueCount).toBe(1);
    expect(result.issues[0].path).toBe('active');
    expect(result.issues[0].expected).toBe('boolean');
    expect(result.issues[0].actual).toBe('string');
  });

  it('Scenario 3: Malformed JSON syntax error', () => {
    const malformed = '{\n  "id": 101,\n  "name": "Alex",\n  "active": true,\n  "role": "admin",\n}';
    const result = validateApiResponse(malformed, schema);
    expect(result.isValid).toBe(false);
    expect(result.stage).toBe('parse');
    expect(result.parsingError).toBeDefined();
    expect(result.parsingError.code).toBe('INVALID_JSON_SYNTAX');
  });
});
