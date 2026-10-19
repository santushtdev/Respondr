 HEAD
# Respondr — Stage 1: Core Validation Engine

Respondr is a framework-independent API Response Detector that helps developers identify invalid JSON, missing fields, data type mismatches, and unexpected API response structures.

This repository contains **Stage 1: Core Validation Engine**, designed to be framework-agnostic, zero-runtime-dependency, and ready for future integration into Next.js API routes or client-side frontends.



## Architecture Overview

```
respondr/
├── src/
│   └── core/
│       └── validation/
│           ├── parser.js      # Safe JSON parser & parsing syntax error diagnostics
│           ├── rules.js       # Reusable atomic validation rules & type detectors
│           ├── validator.js   # Recursive schema validator (objects, arrays, primitives)
│           └── index.js       # Unified public API facade (validateApiResponse)
├── tests/
│   └── validation/
│       ├── parser.test.js     # Parser unit tests
│       └── validator.test.js  # Validator & integration unit tests
├── examples/
│   └── sample-responses.json  # Representative sample payloads and schemas
├── package.json
└── README.md
```

### Data Flow
1. **Raw Input**: The consumer calls `validateApiResponse(rawJsonString, schema, options)`.
2. **Parsing (`parser.js`)**:
   - Guards against non-strings, `null`, `undefined`, or empty whitespace inputs.
   - Parses the JSON string safely with `JSON.parse`.
   - If parsing fails, execution halts early and returns a structured result with `stage: 'parse'`, `parsingError`, and error details.
3. **Validation (`validator.js` & `rules.js`)**:
   - If parsing succeeds, `validate(parsedData, schema, options)` is invoked.
   - Recursively traverses properties and array elements.
   - Checks presence for explicitly declared `required` fields.
   - Evaluates type matches (`string`, `number`, `boolean`, `object`, `array`, `null`).
   - Flags unexpected fields when configured (`allowUnexpectedFields: false` or `additionalProperties: false`).
   - Asserts custom constraint rules (`enum` / `allowedValues`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `minItems`, `maxItems`).
4. **Structured Results**:
   - Produces a consistent, predictable JavaScript object with overall validity, checks performed, issue count, and detailed issue descriptors.

---

## Quick Start & Usage

```javascript
import { validateApiResponse } from './src/core/validation/index.js';

const schema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  allowUnexpectedFields: false,
  properties: {
    id: { type: 'number', min: 1 },
    name: { type: 'string', minLength: 2 },
    email: { type: 'string' },
    role: { type: 'string', enum: ['admin', 'viewer'] },
    tags: {
      type: 'array',
      items: { type: 'string' }
    }
  }
};

const jsonString = '{"id": 1, "name": "Jane", "email": "jane@example.com", "role": "admin", "tags": ["eng"]}';

const result = validateApiResponse(jsonString, schema);
console.log(result);
```

### Structured Output Shape

```json
{
  "isValid": true,
  "stage": "validation",
  "checksPerformed": 6,
  "issueCount": 0,
  "parsingError": null,
  "issues": []
}
```

If issues are found:

```json
{
  "isValid": false,
  "stage": "validation",
  "checksPerformed": 6,
  "issueCount": 2,
  "parsingError": null,
  "issues": [
    {
      "code": "TYPE_MISMATCH",
      "stage": "validation",
      "path": "id",
      "expected": "number",
      "actual": "string",
      "message": "Field 'id' expected type 'number', but received 'string'."
    },
    {
      "code": "MISSING_REQUIRED_FIELD",
      "stage": "validation",
      "path": "email",
      "expected": "defined",
      "actual": "undefined",
      "message": "Missing required field 'email'."
    }
  ]
}
```

---

## Running the Tests

To run the automated Vitest test suite:

```bash
npm test
```

To run in watch mode during development:

```bash
npm run test:watch
```
=======
# Respondr
Analyse the API and respond 
 882ceae83cd7f4fd5cb42068aae4d3d2a991f0ec
