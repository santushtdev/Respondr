/**
 * TypeScript Declarations for Respondr SDK
 */

export interface ValidationParsingError {
  code: string;
  message: string;
  details?: string | null;
}

export interface ValidationIssue {
  code: string;
  stage: 'parse' | 'validation';
  path: string;
  expected: any;
  actual: any;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  stage: 'parse' | 'validation';
  checksPerformed: number;
  issueCount: number;
  parsingError: ValidationParsingError | null;
  issues: ValidationIssue[];
}

export interface ValidationOptions {
  /** Whether to permit fields not explicitly declared in schema. Defaults to true. */
  allowUnexpectedFields?: boolean;
  [key: string]: any;
}

export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | string;

export interface SchemaDefinition {
  type?: SchemaType | SchemaType[];
  required?: string[] | boolean;
  properties?: Record<string, SchemaDefinition>;
  items?: SchemaDefinition;
  nullable?: boolean;
  enum?: any[];
  allowedValues?: any[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
  minItems?: number;
  maxItems?: number;
  allowUnexpectedFields?: boolean;
  additionalProperties?: boolean;
  [key: string]: any;
}

export const PARSE_ERROR_CODES: {
  readonly EMPTY_INPUT: 'EMPTY_INPUT';
  readonly INVALID_INPUT_TYPE: 'INVALID_INPUT_TYPE';
  readonly INVALID_JSON_SYNTAX: 'INVALID_JSON_SYNTAX';
};

export const VALIDATION_ERROR_CODES: {
  readonly MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD';
  readonly TYPE_MISMATCH: 'TYPE_MISMATCH';
  readonly UNEXPECTED_FIELD: 'UNEXPECTED_FIELD';
  readonly INVALID_VALUE: 'INVALID_VALUE';
  readonly INVALID_SCHEMA: 'INVALID_SCHEMA';
};

/**
 * Validates an API response payload (raw JSON string OR parsed object/array) against an expected schema.
 */
export function validate(
  input: unknown,
  schema: SchemaDefinition,
  options?: ValidationOptions
): ValidationResult;

/**
 * Validates a raw JSON string against an expected schema.
 */
export function validateApiResponse(
  jsonString: string,
  schema: SchemaDefinition,
  options?: ValidationOptions
): ValidationResult;

/**
 * Validates parsed JavaScript data directly against an expected schema.
 */
export function coreValidate(
  data: unknown,
  schema: SchemaDefinition,
  options?: ValidationOptions
): ValidationResult;

/**
 * Safely parses a JSON string.
 */
export function parseJson(input: unknown): {
  success: boolean;
  data: any;
  error: ValidationParsingError | null;
};

/**
 * Returns accurate JavaScript type name ('string', 'number', 'boolean', 'object', 'array', 'null', 'nan', etc.).
 */
export function getType(value: unknown): string;

export const Respondr: {
  validate: typeof validate;
  validateApiResponse: typeof validateApiResponse;
  parseJson: typeof parseJson;
  getType: typeof getType;
  PARSE_ERROR_CODES: typeof PARSE_ERROR_CODES;
  VALIDATION_ERROR_CODES: typeof VALIDATION_ERROR_CODES;
};

export default validate;
