# Respondr

**A lightweight SDK for API response validation.**

Respondr helps developers detect unexpected API responses by validating data against predefined schemas. It identifies parsing errors, missing fields, type mismatches, and structural inconsistencies with actionable terminal diagnostics.

## Features

- **Schema Validation** — Validate objects, arrays, and nested structures.
- **Error Diagnostics** — Identify validation failures with precise field paths.
- **Terminal Reporting** — Display readable validation results directly in the terminal.
- **TypeScript Support** — Built-in type definitions.
- **Zero Runtime Dependencies** — Lightweight and framework-independent.

## Quick Start

```javascript
import { validate } from 'respondr';
import { printReport } from 'respondr/reporter';

const schema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' }
  }
};

const response = { id: 1, name: 'Jane' };
const result = validate(response, schema);

printReport(result, {
  title: 'GET /api/users'
});
```

Respondr accepts raw JSON strings and parsed JavaScript objects or arrays.

## Development

```bash
git clone https://github.com/santushtdev/respondr.git
cd respondr
npm install
npm test
```

## Project Status

The validation engine, SDK interface, and terminal reporter are implemented. Application integrations, automatic response interception, and the web dashboard are planned.

