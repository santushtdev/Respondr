import { describe, it, expect } from 'vitest';
import { validate } from '../../src/core/validation/validator.js';
import { validateApiResponse } from '../../src/core/validation/index.js';
import { VALIDATION_ERROR_CODES } from '../../src/core/validation/rules.js';
import { PARSE_ERROR_CODES } from '../../src/core/validation/parser.js';

describe('Validator & Public Facade (validator.js & index.js)', () => {
  const userSchema = {
    type: 'object',
    required: ['id', 'name', 'email'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string' },
      isActive: { type: 'boolean' },
      deletedAt: { type: 'null', nullable: true },
      address: {
        type: 'object',
        required: ['city'],
        properties: {
          city: { type: 'string' },
          zipCode: { type: 'string' }
        }
      },
      tags: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  };

  it('validates a correct payload against valid schema successfully', () => {
    const validData = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      isActive: true,
      deletedAt: null,
      address: {
        city: 'Metropolis',
        zipCode: '10001'
      },
      tags: ['engineer', 'admin']
    };

    const result = validate(validData, userSchema);

    expect(result.isValid).toBe(true);
    expect(result.issueCount).toBe(0);
    expect(result.issues).toEqual([]);
    expect(result.checksPerformed).toBeGreaterThan(0);
    expect(result.parsingError).toBeNull();
  });

  it('detects missing required fields', () => {
    const dataWithMissing = {
      name: 'Alice'
      // missing 'id' and 'email'
    };

    const result = validate(dataWithMissing, userSchema);

    expect(result.isValid).toBe(false);
    expect(result.issueCount).toBe(2);

    const idIssue = result.issues.find((i) => i.path === 'id');
    const emailIssue = result.issues.find((i) => i.path === 'email');

    expect(idIssue).toBeDefined();
    expect(idIssue.code).toBe(VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD);
    expect(idIssue.expected).toBe('defined');
    expect(idIssue.actual).toBe('undefined');

    expect(emailIssue).toBeDefined();
    expect(emailIssue.code).toBe(VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD);
  });

  it('does not require optional fields when they are omitted', () => {
    const minimalValid = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com'
      // isActive, deletedAt, address, tags omitted
    };

    const result = validate(minimalValid, userSchema);

    expect(result.isValid).toBe(true);
    expect(result.issueCount).toBe(0);
  });

  it('detects data type mismatches for primitive types', () => {
    const dataWithMismatches = {
      id: 'not-a-number', // expected number
      name: 12345, // expected string
      email: 'alice@example.com',
      isActive: 'yes' // expected boolean
    };

    const result = validate(dataWithMismatches, userSchema);

    expect(result.isValid).toBe(false);
    expect(result.issueCount).toBe(3);

    const idIssue = result.issues.find((i) => i.path === 'id');
    expect(idIssue.code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);
    expect(idIssue.expected).toBe('number');
    expect(idIssue.actual).toBe('string');

    const nameIssue = result.issues.find((i) => i.path === 'name');
    expect(nameIssue.expected).toBe('string');
    expect(nameIssue.actual).toBe('number');

    const activeIssue = result.issues.find((i) => i.path === 'isActive');
    expect(activeIssue.expected).toBe('boolean');
    expect(activeIssue.actual).toBe('string');
  });

  it('validates nested objects and identifies nested errors with exact path', () => {
    const dataWithNestedErrors = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      address: {
        // missing required 'city'
        zipCode: 12345 // expected string, received number
      }
    };

    const result = validate(dataWithNestedErrors, userSchema);

    expect(result.isValid).toBe(false);

    const cityIssue = result.issues.find((i) => i.path === 'address.city');
    expect(cityIssue).toBeDefined();
    expect(cityIssue.code).toBe(VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD);

    const zipIssue = result.issues.find((i) => i.path === 'address.zipCode');
    expect(zipIssue).toBeDefined();
    expect(zipIssue.code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);
    expect(zipIssue.expected).toBe('string');
    expect(zipIssue.actual).toBe('number');
  });

  it('validates arrays and detects invalid array elements with indexed paths', () => {
    const dataWithArrayErrors = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      tags: ['valid-tag', 999, 'another-tag', false]
    };

    const result = validate(dataWithArrayErrors, userSchema);

    expect(result.isValid).toBe(false);
    expect(result.issueCount).toBe(2);

    const tag1Issue = result.issues.find((i) => i.path === 'tags[1]');
    expect(tag1Issue).toBeDefined();
    expect(tag1Issue.code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);
    expect(tag1Issue.expected).toBe('string');
    expect(tag1Issue.actual).toBe('number');

    const tag3Issue = result.issues.find((i) => i.path === 'tags[3]');
    expect(tag3Issue).toBeDefined();
    expect(tag3Issue.expected).toBe('string');
    expect(tag3Issue.actual).toBe('boolean');
  });

  it('validates null values correctly (nullable fields vs non-nullable)', () => {
    // deletedAt is nullable
    const validNull = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      deletedAt: null
    };
    expect(validate(validNull, userSchema).isValid).toBe(true);

    // name is NOT nullable
    const invalidNull = {
      id: 1,
      name: null,
      email: 'alice@example.com'
    };
    const result = validate(invalidNull, userSchema);
    expect(result.isValid).toBe(false);
    const nameIssue = result.issues.find((i) => i.path === 'name');
    expect(nameIssue.code).toBe(VALIDATION_ERROR_CODES.TYPE_MISMATCH);
    expect(nameIssue.actual).toBe('null');
  });

  it('permits unexpected fields by default', () => {
    const dataWithExtra = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      unexpectedProp: 'hello'
    };

    const result = validate(dataWithExtra, userSchema);
    expect(result.isValid).toBe(true);
    expect(result.issueCount).toBe(0);
  });

  it('detects unexpected fields when allowUnexpectedFields is false in schema', () => {
    const strictSchema = {
      ...userSchema,
      allowUnexpectedFields: false
    };

    const dataWithExtra = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      internalSecret: 'sensitive_data'
    };

    const result = validate(dataWithExtra, strictSchema);

    expect(result.isValid).toBe(false);
    const extraIssue = result.issues.find((i) => i.path === 'internalSecret');
    expect(extraIssue).toBeDefined();
    expect(extraIssue.code).toBe(VALIDATION_ERROR_CODES.UNEXPECTED_FIELD);
    expect(extraIssue.actual).toBe('internalSecret');
  });

  it('detects unexpected fields via options override', () => {
    const dataWithExtra = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      extraField: true
    };

    const result = validate(dataWithExtra, userSchema, { allowUnexpectedFields: false });
    expect(result.isValid).toBe(false);
    expect(result.issues.some((i) => i.code === VALIDATION_ERROR_CODES.UNEXPECTED_FIELD)).toBe(true);
  });

  it('validates custom value rules: enum, min/max, string length, pattern', () => {
    const constrainedSchema = {
      type: 'object',
      properties: {
        role: { type: 'string', enum: ['admin', 'user'] },
        score: { type: 'number', min: 0, max: 100 },
        code: { type: 'string', minLength: 3, maxLength: 5, pattern: '^[A-Z]+$' }
      }
    };

    // Valid data
    expect(
      validate(
        {
          role: 'admin',
          score: 85,
          code: 'ABC'
        },
        constrainedSchema
      ).isValid
    ).toBe(true);

    // Invalid data
    const invalidResult = validate(
      {
        role: 'superadmin',
        score: 150,
        code: 'toolong123'
      },
      constrainedSchema
    );

    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.issues.length).toBe(4);
    expect(invalidResult.issues.every((i) => i.code === VALIDATION_ERROR_CODES.INVALID_VALUE)).toBe(true);
    expect(invalidResult.issues.map((i) => i.path)).toEqual([
      'role',
      'score',
      'code',
      'code'
    ]);
  });

  it('guards against invalid schema objects safely', () => {
    const result = validate({ id: 1 }, null);
    expect(result.isValid).toBe(false);
    expect(result.issueCount).toBe(1);
    expect(result.issues[0].code).toBe(VALIDATION_ERROR_CODES.INVALID_SCHEMA);
  });

  describe('Full End-to-End Integration (validateApiResponse)', () => {
    it('successfully parses and validates valid JSON API response', () => {
      const jsonString = JSON.stringify({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com'
      });

      const response = validateApiResponse(jsonString, userSchema);

      expect(response.isValid).toBe(true);
      expect(response.stage).toBe('validation');
      expect(response.issueCount).toBe(0);
      expect(response.parsingError).toBeNull();
      expect(response.checksPerformed).toBeGreaterThan(0);
    });

    it('separates parsing errors cleanly when JSON is malformed', () => {
      const malformedJson = '{"id": 1, "name": ';

      const response = validateApiResponse(malformedJson, userSchema);

      expect(response.isValid).toBe(false);
      expect(response.stage).toBe('parse');
      expect(response.parsingError).not.toBeNull();
      expect(response.parsingError.code).toBe(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX);
      expect(response.issueCount).toBe(1);
      expect(response.issues[0].stage).toBe('parse');
      expect(response.issues[0].code).toBe(PARSE_ERROR_CODES.INVALID_JSON_SYNTAX);
    });

    it('handles empty input in end-to-end flow safely', () => {
      const response = validateApiResponse('', userSchema);

      expect(response.isValid).toBe(false);
      expect(response.stage).toBe('parse');
      expect(response.parsingError.code).toBe(PARSE_ERROR_CODES.EMPTY_INPUT);
    });

    it('accumulates multiple validation issues in one response', () => {
      const payload = JSON.stringify({
        id: 'string_instead_of_number',
        // missing name and email
        extraField: 123
      });

      const response = validateApiResponse(payload, userSchema, { allowUnexpectedFields: false });

      expect(response.isValid).toBe(false);
      expect(response.stage).toBe('validation');
      expect(response.parsingError).toBeNull();
      // Should have:
      // 1. type mismatch for id
      // 2. missing required 'name'
      // 3. missing required 'email'
      // 4. unexpected field 'extraField'
      expect(response.issueCount).toBe(4);
      expect(response.issues.map((i) => i.code)).toEqual(
        expect.arrayContaining([
          VALIDATION_ERROR_CODES.TYPE_MISMATCH,
          VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD,
          VALIDATION_ERROR_CODES.UNEXPECTED_FIELD
        ])
      );
    });
  });
});
