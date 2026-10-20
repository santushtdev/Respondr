/**
 * Respondr SDK - Standalone API Response Validation SDK
 *
 * Responsibilities:
 * - Public SDK entrypoint for Respondr.
 * - Unified, polymorphic validation API accepting raw JSON strings or pre-parsed JavaScript objects/arrays.
 * - Re-exports underlying engine primitives for full modular control.
 */

import {
  parseJson,
  PARSE_ERROR_CODES,
  validate as coreValidate,
  validateApiResponse,
  VALIDATION_ERROR_CODES,
  getType,
  validateType,
  validateRequiredFields,
  validateUnexpectedFields,
  validateValueConstraints
} from './core/validation/index.js';

export {
  parseJson,
  PARSE_ERROR_CODES,
  coreValidate,
  validateApiResponse,
  VALIDATION_ERROR_CODES,
  getType,
  validateType,
  validateRequiredFields,
  validateUnexpectedFields,
  validateValueConstraints
};

/**
 * Validates an API response payload (raw JSON string OR parsed object/array) against an expected schema.
 *
 * @param {unknown} input - Raw JSON string OR already-parsed JS object/array/value.
 * @param {object} schema - Expected JSON schema definition.
 * @param {object} [options={}] - Validation options.
 * @param {boolean} [options.allowUnexpectedFields=true] - Whether to allow undeclared properties.
 * @returns {{
 *   isValid: boolean,
 *   stage: 'parse' | 'validation',
 *   checksPerformed: number,
 *   issueCount: number,
 *   parsingError: {
 *     code: string,
 *     message: string,
 *     details?: string | null
 *   } | null,
 *   issues: Array<{
 *     code: string,
 *     stage: 'parse' | 'validation',
 *     path: string,
 *     expected: any,
 *     actual: any,
 *     message: string
 *   }>
 * }}
 */
export function validate(input, schema, options = {}) {
  // If the input is a string, execute full parse-and-validate flow
  if (typeof input === 'string') {
    return validateApiResponse(input, schema, options);
  }

  // If the input is already a JavaScript value (object, array, etc.), validate directly
  const result = coreValidate(input, schema, options);

  return {
    isValid: result.isValid,
    stage: 'validation',
    checksPerformed: result.checksPerformed,
    issueCount: result.issueCount,
    parsingError: null,
    issues: result.issues
  };
}

export const Respondr = {
  validate,
  validateApiResponse,
  parseJson,
  getType,
  PARSE_ERROR_CODES,
  VALIDATION_ERROR_CODES
};

export default validate;
