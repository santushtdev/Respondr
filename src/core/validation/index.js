/**
 * Respondr Core Validation Engine - Public API Entrypoint
 *
 * Responsibilities:
 * - Provide a unified, clean public facade for the engine.
 * - Accept raw JSON string and expected schema.
 * - Coordinate JSON parsing and schema validation.
 * - Deliver consistent, predictable structured results separating parsing and validation issues.
 */

import { parseJson, PARSE_ERROR_CODES } from './parser.js';
import { validate } from './validator.js';
import { VALIDATION_ERROR_CODES, getType } from './rules.js';

export { parseJson, PARSE_ERROR_CODES } from './parser.js';
export { validate } from './validator.js';
export {
  VALIDATION_ERROR_CODES,
  getType,
  validateType,
  validateRequiredFields,
  validateUnexpectedFields,
  validateValueConstraints
} from './rules.js';

/**
 * Validates a raw JSON API response string against an expected schema.
 *
 * @param {string} jsonString - The raw JSON string from an API response.
 * @param {object} schema - The expected schema definition.
 * @param {object} [options={}] - Optional configuration flags.
 * @param {boolean} [options.allowUnexpectedFields=true] - Whether to permit unmodeled properties.
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
export function validateApiResponse(jsonString, schema, options = {}) {
  // Step 1: JSON Parsing
  const parseResult = parseJson(jsonString);

  if (!parseResult.success) {
    return {
      isValid: false,
      stage: 'parse',
      checksPerformed: 1,
      issueCount: 1,
      parsingError: {
        code: parseResult.error.code,
        message: parseResult.error.message,
        details: parseResult.error.details || null
      },
      issues: [
        {
          code: parseResult.error.code,
          stage: 'parse',
          path: '$',
          expected: 'valid JSON string',
          actual: parseResult.error.code,
          message: parseResult.error.message
        }
      ]
    };
  }

  // Step 2: Schema Validation
  const validationResult = validate(parseResult.data, schema, options);

  return {
    isValid: validationResult.isValid,
    stage: 'validation',
    // Total checks = 1 (parse check) + all schema checks
    checksPerformed: validationResult.checksPerformed + 1,
    issueCount: validationResult.issueCount,
    parsingError: null,
    issues: validationResult.issues
  };
}

export default validateApiResponse;
