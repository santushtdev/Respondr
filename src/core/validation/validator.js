/**
 * Respondr Core Validation Engine - Validator
 *
 * Responsibilities:
 * - Recursively validate parsed data against an expected schema.
 * - Accurately track checks performed and issues discovered.
 * - Detect missing required fields, type mismatches, unexpected fields,
 *   nested object errors, array item errors, and rule violations.
 * - Produce structured, predictable results ready for consumers and UI display.
 */

import {
  getType,
  validateType,
  validateRequiredFields,
  validateUnexpectedFields,
  validateValueConstraints,
  VALIDATION_ERROR_CODES
} from './rules.js';

/**
 * Validates a parsed JavaScript value/object against a schema.
 *
 * @param {unknown} data - The parsed API response data.
 * @param {object} schema - The expected schema definition.
 * @param {object} [options={}] - Validation options.
 * @param {boolean} [options.allowUnexpectedFields=true] - Default behavior for unexpected fields.
 * @returns {{
 *   isValid: boolean,
 *   stage: 'validation',
 *   checksPerformed: number,
 *   issueCount: number,
 *   parsingError: null,
 *   issues: Array<{
 *     code: string,
 *     stage: 'validation',
 *     path: string,
 *     expected: any,
 *     actual: any,
 *     message: string
 *   }>
 * }}
 */
export function validate(data, schema, options = {}) {
  // Validate schema definition sanity
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
    return {
      isValid: false,
      stage: 'validation',
      checksPerformed: 0,
      issueCount: 1,
      parsingError: null,
      issues: [
        {
          code: VALIDATION_ERROR_CODES.INVALID_SCHEMA,
          stage: 'validation',
          path: '$',
          expected: 'object',
          actual: getType(schema),
          message: 'The provided schema must be a valid non-null object.'
        }
      ]
    };
  }

  const context = {
    checksPerformed: 0,
    issues: [],
    options: {
      allowUnexpectedFields: options.allowUnexpectedFields ?? true,
      ...options
    }
  };

  validateNode(data, schema, '$', context);

  return {
    isValid: context.issues.length === 0,
    stage: 'validation',
    checksPerformed: context.checksPerformed,
    issueCount: context.issues.length,
    parsingError: null,
    issues: context.issues
  };
}

/**
 * Recursively validates a single node against its schema node.
 *
 * @param {unknown} value - The value to validate.
 * @param {object} schemaNode - The schema definition for this node.
 * @param {string} currentPath - Current path in the data tree.
 * @param {object} context - Shared validation context.
 */
function validateNode(value, schemaNode, currentPath, context) {
  if (!schemaNode || typeof schemaNode !== 'object') {
    return;
  }

  // 1. Type validation
  if (schemaNode.type !== undefined) {
    context.checksPerformed++;
    const typeResult = validateType(value, schemaNode.type, currentPath, {
      nullable: schemaNode.nullable === true
    });

    if (!typeResult.isValid) {
      context.issues.push(typeResult.issue);
      // Type mismatch on this node halts deeper property/item inspection for this node
      return;
    }
  }

  // If value is null and nullable is permitted, no further inner checks are needed
  if (value === null && schemaNode.nullable === true) {
    return;
  }

  const actualType = getType(value);

  // 2. Object validation
  if (actualType === 'object') {
    validateObjectNode(value, schemaNode, currentPath, context);
  }

  // 3. Array validation
  if (actualType === 'array') {
    validateArrayNode(value, schemaNode, currentPath, context);
  }

  // 4. Value constraints (enum, min/max, string length, regex pattern)
  const hasConstraints =
    schemaNode.enum !== undefined ||
    schemaNode.allowedValues !== undefined ||
    schemaNode.min !== undefined ||
    schemaNode.max !== undefined ||
    schemaNode.minLength !== undefined ||
    schemaNode.maxLength !== undefined ||
    schemaNode.pattern !== undefined ||
    schemaNode.minItems !== undefined ||
    schemaNode.maxItems !== undefined;

  if (hasConstraints) {
    context.checksPerformed++;
    const constraintIssues = validateValueConstraints(value, schemaNode, currentPath);
    context.issues.push(...constraintIssues);
  }
}

/**
 * Validates object properties, required fields, and unexpected fields.
 */
function validateObjectNode(object, schemaNode, currentPath, context) {
  const properties = schemaNode.properties || {};
  const propertyKeys = Object.keys(properties);

  // Gather required fields from both schema.required array and property.required === true
  const requiredSet = new Set(Array.isArray(schemaNode.required) ? schemaNode.required : []);
  for (const [key, propDef] of Object.entries(properties)) {
    if (propDef && typeof propDef === 'object' && propDef.required === true) {
      requiredSet.add(key);
    }
  }

  // A. Check required fields
  if (requiredSet.size > 0) {
    context.checksPerformed++;
    const missingIssues = validateRequiredFields(object, Array.from(requiredSet), currentPath);
    context.issues.push(...missingIssues);
  }

  // B. Check unexpected fields
  const allowUnexpected =
    schemaNode.allowUnexpectedFields ??
    schemaNode.additionalProperties ??
    context.options.allowUnexpectedFields;

  if (allowUnexpected === false) {
    context.checksPerformed++;
    const unexpectedIssues = validateUnexpectedFields(object, propertyKeys, currentPath);
    context.issues.push(...unexpectedIssues);
  }

  // C. Recursively validate defined properties
  for (const key of propertyKeys) {
    const propSchema = properties[key];
    const childPath = currentPath === '$' ? key : `${currentPath}.${key}`;
    const childValue = object[key];

    // If field is undefined, it was already checked by required rules. Skip deeper inspection if absent.
    if (childValue !== undefined) {
      validateNode(childValue, propSchema, childPath, context);
    }
  }
}

/**
 * Validates array items against item schema.
 */
function validateArrayNode(array, schemaNode, currentPath, context) {
  if (schemaNode.items && typeof schemaNode.items === 'object') {
    array.forEach((item, index) => {
      const itemPath = `${currentPath}[${index}]`;
      validateNode(item, schemaNode.items, itemPath, context);
    });
  }
}
