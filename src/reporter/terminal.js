/**
 * Respondr SDK - Terminal Reporter
 *
 * Responsibilities:
 * - Decoupled formatting of validation results for CLI / terminal display.
 * - Supports ANSI color styling with automatic detection or manual toggle.
 * - Formats both passing summaries and detailed issue breakdowns.
 * - Provides non-intrusive console printing.
 */

// ANSI Color Codes
const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Determines whether colors should be used based on options and environment.
 *
 * @param {boolean | undefined} colorOption
 * @returns {boolean}
 */
function shouldEnableColor(colorOption) {
  if (typeof colorOption === 'boolean') {
    return colorOption;
  }
  if (typeof process !== 'undefined') {
    if (process.env?.NO_COLOR || process.env?.NODE_DISABLE_COLORS) {
      return false;
    }
    if (process.env?.FORCE_COLOR) {
      return true;
    }
    return Boolean(process.stdout?.isTTY);
  }
  return false;
}

/**
 * Creates color wrapper helpers based on color toggle.
 *
 * @param {boolean} enabled
 */
function createStyler(enabled) {
  if (!enabled) {
    const noop = (str) => String(str);
    return {
      bold: noop,
      dim: noop,
      red: noop,
      green: noop,
      yellow: noop,
      cyan: noop,
      gray: noop
    };
  }

  return {
    bold: (str) => `${ANSI.bold}${str}${ANSI.reset}`,
    dim: (str) => `${ANSI.dim}${str}${ANSI.reset}`,
    red: (str) => `${ANSI.red}${str}${ANSI.reset}`,
    green: (str) => `${ANSI.green}${str}${ANSI.reset}`,
    yellow: (str) => `${ANSI.yellow}${str}${ANSI.reset}`,
    cyan: (str) => `${ANSI.cyan}${str}${ANSI.reset}`,
    gray: (str) => `${ANSI.gray}${str}${ANSI.reset}`
  };
}

/**
 * Formats a validation result into a terminal-friendly string.
 *
 * @param {object} result - Validation result object from Respondr.
 * @param {object} [options={}] - Formatting options.
 * @param {string} [options.title] - Optional label (e.g. endpoint name, 'GET /api/notes').
 * @param {boolean} [options.colors] - Force enable or disable ANSI colors.
 * @param {boolean} [options.onlyFailures=false] - If true, returns empty string when result is valid.
 * @param {boolean} [options.quiet=false] - Alias for onlyFailures.
 * @returns {string} Formatted terminal string.
 */
export function formatReport(result, options = {}) {
  if (!result || typeof result !== 'object') {
    return '';
  }

  const quiet = options.onlyFailures || options.quiet;
  if (quiet && result.isValid) {
    return '';
  }

  const useColors = shouldEnableColor(options.colors);
  const style = createStyler(useColors);

  const titleSuffix = options.title ? ` ${style.bold(options.title)}` : '';
  const lines = [];

  if (result.isValid) {
    const checksText = result.checksPerformed === 1 ? '1 check' : `${result.checksPerformed} checks`;
    lines.push(
      `${style.green('✔')} ${style.bold('[Respondr]')} ${style.green('PASS')}:${titleSuffix} ${style.gray(`(${checksText} passed, 0 issues)`)}`
    );
    return lines.join('\n');
  }

  // Failure formatting
  const issueCount = result.issueCount ?? result.issues?.length ?? 1;
  const issueText = issueCount === 1 ? '1 issue' : `${issueCount} issues`;
  const checksText = result.checksPerformed === 1 ? '1 check' : `${result.checksPerformed} checks`;

  lines.push(
    `${style.red('✖')} ${style.bold('[Respondr]')} ${style.red('FAIL')}:${titleSuffix} ${style.gray(`(${issueText} found, ${checksText} performed)`)}`
  );

  if (result.stage) {
    lines.push(`  ${style.gray('Stage:')} ${style.yellow(result.stage)}`);
  }

  if (result.parsingError) {
    lines.push('');
    lines.push(`  ${style.red('Parsing Error:')}`);
    lines.push(`    ${style.bold('Code:')}    ${result.parsingError.code}`);
    lines.push(`    ${style.bold('Message:')} ${result.parsingError.message}`);
    if (result.parsingError.details) {
      lines.push(`    ${style.gray('Details:')} ${result.parsingError.details}`);
    }
  }

  if (Array.isArray(result.issues) && result.issues.length > 0) {
    lines.push('');
    lines.push(`  ${style.bold('Issues:')}`);

    result.issues.forEach((issue, index) => {
      const num = `${index + 1}.`;
      const codeLabel = style.yellow(`[${issue.code}]`);
      const pathLabel = style.cyan(issue.path || '$');

      lines.push(`    ${style.gray(num)} ${codeLabel} at ${pathLabel}`);
      lines.push(`       ${style.gray('Expected:')} ${formatValue(issue.expected)}`);
      lines.push(`       ${style.gray('Actual:')}   ${formatValue(issue.actual)}`);
      lines.push(`       ${style.gray('Message:')}  ${issue.message}`);
      if (index < result.issues.length - 1) {
        lines.push('');
      }
    });
  }

  return lines.join('\n');
}

/**
 * Pretty prints the formatted report to stdout or stderr.
 *
 * @param {object} result - Validation result object from Respondr.
 * @param {object} [options={}] - Formatting and print options.
 * @returns {boolean} Returns result.isValid.
 */
export function printReport(result, options = {}) {
  const report = formatReport(result, options);
  if (!report) {
    return result?.isValid ?? false;
  }

  if (result?.isValid) {
    console.log(report);
  } else {
    console.error(report);
  }

  return result?.isValid ?? false;
}

/**
 * Safely format values for report output.
 */
function formatValue(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return `'${val}'`;
  if (Array.isArray(val)) {
    return `[${val.map((v) => (typeof v === 'string' ? `'${v}'` : String(v))).join(', ')}]`;
  }
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val);
    } catch {
      return '[object]';
    }
  }
  return String(val);
}
