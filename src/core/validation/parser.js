/**
 * Respondr Core Validation Engine - JSON Parser
 *
 * Responsibilities:
 * - Safely parse JSON strings.
 * - Guard against non-string, empty, null, or undefined inputs.
 * - Capture syntax errors with actionable diagnostics without throwing unhandled exceptions.
 */

export const PARSE_ERROR_CODES = Object.freeze({
  EMPTY_INPUT: 'EMPTY_INPUT',
  INVALID_INPUT_TYPE: 'INVALID_INPUT_TYPE',
  INVALID_JSON_SYNTAX: 'INVALID_JSON_SYNTAX'
});

/**
 * Parses a JSON string safely and returns a standardized result.
 *
 * @param {unknown} input - The raw input expected to be a JSON string.
 * @returns {{
 *   success: boolean,
 *   data: any,
 *   error: {
 *     code: string,
 *     message: string,
 *     details?: string
 *   } | null
 * }}
 */
export function parseJson(input) {
  if (input === null || input === undefined) {
    return {
      success: false,
      data: null,
      error: {
        code: PARSE_ERROR_CODES.EMPTY_INPUT,
        message: 'Expected a JSON string, but received null or undefined.'
      }
    };
  }

  if (typeof input !== 'string') {
    return {
      success: false,
      data: null,
      error: {
        code: PARSE_ERROR_CODES.INVALID_INPUT_TYPE,
        message: `Expected JSON input to be of type 'string', but received '${typeof input}'.`
      }
    };
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return {
      success: false,
      data: null,
      error: {
        code: PARSE_ERROR_CODES.EMPTY_INPUT,
        message: 'JSON input string cannot be empty or contain only whitespace.'
      }
    };
  }

  try {
    const data = JSON.parse(trimmed);
    return {
      success: true,
      data,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: {
        code: PARSE_ERROR_CODES.INVALID_JSON_SYNTAX,
        message: `Malformed JSON: ${err.message}`,
        details: err.message
      }
    };
  }
}
