/**
 * Respondr Core Validation Engine - Rules
 *
 * Responsibilities:
 * - Define and implement reusable validation rules (type, presence, constraints, unexpected fields).
 * - Accurately detect JavaScript types including array vs object vs null.
 * - Format clear human-readable error messages and structured issue records.
 */

export const VALIDATION_ERROR_CODES = Object.freeze({
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  TYPE_MISMATCH: 'TYPE_MISMATCH',
  UNEXPECTED_FIELD: 'UNEXPECTED_FIELD',
  INVALID_VALUE: 'INVALID_VALUE',
  INVALID_SCHEMA: 'INVALID_SCHEMA'
});

/**
 * Returns the precise type name of any JavaScript value.
 * Distinguishes null, array, object, and NaN.
 *
 * @param {unknown} value
 * @returns {'string'|'number'|'boolean'|'object'|'array'|'null'|'undefined'|'nan'|'function'|'unknown'}
 */
export function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') {
    return Number.isNaN(value) ? 'nan' : 'number';
  }
  return typeof value;
}

/**
 * Validates whether a value matches the expected type or types.
 *
 * @param {unknown} value - Value being checked.
 * @param {string|string[]} expectedType - Expected type name or list of allowed types.
 * @param {string} path - JSON path of the field.
 * @param {{ nullable?: boolean }} [options={}]
 * @returns {{ isValid: boolean, issue: object | null }}
 */
export function validateType(value, expectedType, path, options = {}) {
  const actualType = getType(value);

  // If nullable is explicitly allowed and value is null, type check passes
  if (options.nullable === true && actualType === 'null') {
    return { isValid: true, issue: null };
  }

  const allowedTypes = Array.isArray(expectedType) ? expectedType : [expectedType];

  const isMatch = allowedTypes.some((t) => {
    if (t === actualType) return true;
    if (t === 'integer' && actualType === 'number' && Number.isInteger(value)) return true;
    return false;
  });

  if (!isMatch) {
    const expectedLabel = allowedTypes.join(' or ');
    return {
      isValid: false,
      issue: {
        code: VALIDATION_ERROR_CODES.TYPE_MISMATCH,
        stage: 'validation',
        path,
        expected: expectedLabel,
        actual: actualType,
        message: `Field '${path}' expected type '${expectedLabel}', but received '${actualType}'.`
      }
    };
  }

  return { isValid: true, issue: null };
}

/**
 * Validates that all required fields are present in the target object.
 *
 * @param {Record<string, any>} object - Object being checked.
 * @param {string[]} requiredFields - List of required keys.
 * @param {string} parentPath - Path of the parent object.
 * @returns {Array<object>} List of detected missing field issues.
 */
export function validateRequiredFields(object, requiredFields, parentPath) {
  const issues = [];
  if (!requiredFields || !Array.isArray(requiredFields)) return issues;

  for (const field of requiredFields) {
    const fieldPath = parentPath === '$' ? field : `${parentPath}.${field}`;
    const value = object?.[field];

    if (value === undefined) {
      issues.push({
        code: VALIDATION_ERROR_CODES.MISSING_REQUIRED_FIELD,
        stage: 'validation',
        path: fieldPath,
        expected: 'defined',
        actual: 'undefined',
        message: `Missing required field '${fieldPath}'.`
      });
    }
  }

  return issues;
}

/**
 * Validates that an object contains no unexpected properties when configured.
 *
 * @param {Record<string, any>} object - Object being checked.
 * @param {string[]} allowedFields - List of allowed property names.
 * @param {string} parentPath - Path of the object.
 * @returns {Array<object>} List of unexpected field issues.
 */
export function validateUnexpectedFields(object, allowedFields, parentPath) {
  const issues = [];
  if (!object || typeof object !== 'object' || Array.isArray(object)) return issues;

  const allowedSet = new Set(allowedFields);
  const objectKeys = Object.keys(object);

  for (const key of objectKeys) {
    if (!allowedSet.has(key)) {
      const fieldPath = parentPath === '$' ? key : `${parentPath}.${key}`;
      issues.push({
        code: VALIDATION_ERROR_CODES.UNEXPECTED_FIELD,
        stage: 'validation',
        path: fieldPath,
        expected: 'property to be defined in schema',
        actual: key,
        message: `Unexpected field '${fieldPath}' is not permitted by schema.`
      });
    }
  }

  return issues;
}

/**
 * Validates value constraints (allowedValues/enum, min/max numbers, min/max length, pattern).
 *
 * @param {unknown} value - Value being checked.
 * @param {object} rules - Rule definitions.
 * @param {string} path - JSON path.
 * @returns {Array<object>} List of rule violation issues.
 */
export function validateValueConstraints(value, rules = {}, path) {
  const issues = [];
  if (value === undefined || value === null) return issues;

  // Enum / Allowed values check
  if (Array.isArray(rules.enum) || Array.isArray(rules.allowedValues)) {
    const allowed = rules.enum || rules.allowedValues;
    if (!allowed.includes(value)) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: allowed,
        actual: value,
        message: `Value at '${path}' must be one of [${allowed.map((v) => JSON.stringify(v)).join(', ')}], but received ${JSON.stringify(value)}.`
      });
    }
  }

  // Number range checks
  if (typeof value === 'number') {
    if (typeof rules.min === 'number' && value < rules.min) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `>= ${rules.min}`,
        actual: value,
        message: `Value at '${path}' must be greater than or equal to ${rules.min}, but received ${value}.`
      });
    }

    if (typeof rules.max === 'number' && value > rules.max) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `<= ${rules.max}`,
        actual: value,
        message: `Value at '${path}' must be less than or equal to ${rules.max}, but received ${value}.`
      });
    }
  }

  // String constraints (minLength, maxLength, pattern)
  if (typeof value === 'string') {
    if (typeof rules.minLength === 'number' && value.length < rules.minLength) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `length >= ${rules.minLength}`,
        actual: `length ${value.length}`,
        message: `String at '${path}' must have length >= ${rules.minLength}, but received length ${value.length}.`
      });
    }

    if (typeof rules.maxLength === 'number' && value.length > rules.maxLength) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `length <= ${rules.maxLength}`,
        actual: `length ${value.length}`,
        message: `String at '${path}' must have length <= ${rules.maxLength}, but received length ${value.length}.`
      });
    }

    if (rules.pattern) {
      const regex = typeof rules.pattern === 'string' ? new RegExp(rules.pattern) : rules.pattern;
      if (!regex.test(value)) {
        issues.push({
          code: VALIDATION_ERROR_CODES.INVALID_VALUE,
          stage: 'validation',
          path,
          expected: `match pattern ${rules.pattern.toString()}`,
          actual: value,
          message: `String at '${path}' does not match required pattern ${rules.pattern.toString()}.`
        });
      }
    }
  }

  // Array constraints (minItems, maxItems)
  if (Array.isArray(value)) {
    if (typeof rules.minItems === 'number' && value.length < rules.minItems) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `item count >= ${rules.minItems}`,
        actual: `item count ${value.length}`,
        message: `Array at '${path}' must contain at least ${rules.minItems} items, but received ${value.length}.`
      });
    }

    if (typeof rules.maxItems === 'number' && value.length > rules.maxItems) {
      issues.push({
        code: VALIDATION_ERROR_CODES.INVALID_VALUE,
        stage: 'validation',
        path,
        expected: `item count <= ${rules.maxItems}`,
        actual: `item count ${value.length}`,
        message: `Array at '${path}' must contain at most ${rules.maxItems} items, but received ${value.length}.`
      });
    }
  }

  return issues;
}
