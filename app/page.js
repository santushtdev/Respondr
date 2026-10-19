'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { validateApiResponse } from '../src/core/validation/index.js';

const SAMPLE_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": true,\n  "role": "admin"\n}`;

const SAMPLE_SCHEMA = `{\n  "type": "object",\n  "properties": {\n    "id": { "type": "number" },\n    "name": { "type": "string" },\n    "active": { "type": "boolean" },\n    "role": { "type": "string" }\n  },\n  "required": ["id", "name", "active"]\n}`;

const INVALID_TYPE_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": "yes",\n  "role": "admin"\n}`;

const PARSE_ERROR_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": true,\n  "role": "admin",\n}`;

export default function RespondrPage() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_PAYLOAD);
  const [schemaInput, setSchemaInput] = useState(SAMPLE_SCHEMA);
  const [validationResult, setValidationResult] = useState(null);
  const [activeState, setActiveState] = useState('empty');
  const [copyResponseSuccess, setCopyResponseSuccess] = useState(false);
  const [copySchemaSuccess, setCopySchemaSuccess] = useState(false);

  const jsonTextareaRef = useRef(null);
  const schemaTextareaRef = useRef(null);
  const responseGutterRef = useRef(null);
  const schemaGutterRef = useRef(null);

  // Synchronize textarea and gutter scrolling
  const handleScroll = (textarea, gutter) => {
    if (textarea && gutter) {
      gutter.scrollTop = textarea.scrollTop;
    }
  };

  // Compute line count and byte size for display
  const responseStats = useMemo(() => {
    const lines = (jsonInput.match(/\n/g) || []).length + 1;
    const bytes = new Blob([jsonInput]).size;
    return `${lines} lines • ${bytes} B`;
  }, [jsonInput]);

  const schemaStats = useMemo(() => {
    const lines = (schemaInput.match(/\n/g) || []).length + 1;
    const bytes = new Blob([schemaInput]).size;
    return `${lines} lines • ${bytes} B`;
  }, [schemaInput]);

  const responseLineCount = useMemo(() => {
    return (jsonInput.match(/\n/g) || []).length + 1;
  }, [jsonInput]);

  const schemaLineCount = useMemo(() => {
    return (schemaInput.match(/\n/g) || []).length + 1;
  }, [schemaInput]);

  // Execute actual validation using existing engine
  const executeValidation = (rawJson, rawSchema) => {
    const payloadText = (rawJson !== undefined ? rawJson : jsonInput).trim();
    const schemaText = (rawSchema !== undefined ? rawSchema : schemaInput).trim();

    if (!payloadText || !schemaText) {
      setValidationResult(null);
      setActiveState('empty');
      return;
    }

    // Step 1: Parse Schema JSON safely
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(schemaText);
    } catch (err) {
      const errorResult = {
        isValid: false,
        stage: 'parse',
        checksPerformed: 1,
        issueCount: 1,
        parsingError: {
          code: 'INVALID_SCHEMA_SYNTAX',
          message: `Expected Schema contains invalid JSON: ${err.message}`,
          details: err.message
        },
        issues: [
          {
            code: 'INVALID_SCHEMA_SYNTAX',
            stage: 'parse',
            path: '$',
            expected: 'valid JSON schema',
            actual: 'syntax_error',
            message: `Expected Schema contains invalid JSON: ${err.message}`
          }
        ]
      };
      setValidationResult(errorResult);
      setActiveState('error');
      return;
    }

    // Step 2: Run validation engine
    const result = validateApiResponse(payloadText, parsedSchema);
    setValidationResult(result);

    if (result.stage === 'parse' || result.parsingError) {
      setActiveState('error');
    } else if (result.isValid) {
      setActiveState('success');
    } else {
      setActiveState('invalid');
    }
  };

  // Quick Action Utilities
  const handleResetSample = () => {
    setJsonInput(SAMPLE_PAYLOAD);
    setSchemaInput(SAMPLE_SCHEMA);
    executeValidation(SAMPLE_PAYLOAD, SAMPLE_SCHEMA);
  };

  const handleClearAll = () => {
    setJsonInput('');
    setSchemaInput('');
    setValidationResult(null);
    setActiveState('empty');
  };

  const handleFormatAll = () => {
    let formattedJson = jsonInput;
    let formattedSchema = schemaInput;

    try {
      if (jsonInput.trim()) {
        formattedJson = JSON.stringify(JSON.parse(jsonInput), null, 2);
        setJsonInput(formattedJson);
      }
    } catch (e) {}

    try {
      if (schemaInput.trim()) {
        formattedSchema = JSON.stringify(JSON.parse(schemaInput), null, 2);
        setSchemaInput(formattedSchema);
      }
    } catch (e) {}
  };

  // Copy to clipboard handlers
  const handleCopy = (text, setSuccess) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1400);
      });
    }
  };

  // Switcher tab handlers (loads scenario & runs real engine)
  const handleTabClick = (state) => {
    if (state === 'empty') {
      handleClearAll();
    } else if (state === 'success') {
      setJsonInput(SAMPLE_PAYLOAD);
      setSchemaInput(SAMPLE_SCHEMA);
      executeValidation(SAMPLE_PAYLOAD, SAMPLE_SCHEMA);
    } else if (state === 'invalid') {
      setJsonInput(INVALID_TYPE_PAYLOAD);
      setSchemaInput(SAMPLE_SCHEMA);
      executeValidation(INVALID_TYPE_PAYLOAD, SAMPLE_SCHEMA);
    } else if (state === 'error') {
      setJsonInput(PARSE_ERROR_PAYLOAD);
      setSchemaInput(SAMPLE_SCHEMA);
      executeValidation(PARSE_ERROR_PAYLOAD, SAMPLE_SCHEMA);
    }
  };

  // Extract verified keys if available
  const verifiedKeys = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return Object.keys(parsed).join(', ');
      }
    } catch (e) {}
    return 'None';
  }, [jsonInput]);

  const activeTagLabel = useMemo(() => {
    switch (activeState) {
      case 'success':
        return 'Passed';
      case 'invalid':
        return validationResult?.issueCount === 1 ? '1 Violation' : `${validationResult?.issueCount || 0} Violations`;
      case 'error':
        return 'Syntax Error';
      default:
        return 'Idle';
    }
  }, [activeState, validationResult]);

  return (
    <>
      {/* Header */}
      <header className="w-full border-b border-[#191927]/10 bg-brandBg/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Respondr Logo Icon */}
            <div className="w-9 h-9 rounded-lg bg-brandDark flex items-center justify-center text-brandTeal shadow-sm">
              <span className="material-symbols-outlined text-[20px]">data_check</span>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-semibold text-lg tracking-tight text-brandDark">Respondr</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-brandDark/70 px-2.5 py-1 rounded bg-[#191927]/5 border border-[#191927]/10">
              <span className="w-2 h-2 rounded-full bg-brandTeal"></span>
              RFC Draft-07 Compliant
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Page Title & Actions Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brandDark">
              Validate JSON against Schema
            </h1>
            <p className="text-sm text-brandDark/75 mt-1">
              Verify payload structure, data types, and required constraints in real time.
            </p>
          </div>

          {/* Quick Action Utilities */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              id="btn-load-sample"
              type="button"
              onClick={handleResetSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-brandPurple">restore</span>
              Reset Sample
            </button>
            <button
              id="btn-format-all"
              type="button"
              onClick={handleFormatAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-brandTeal">auto_fix_high</span>
              Format
            </button>
            <button
              id="btn-clear-all"
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-[#DC2626]">clear_all</span>
              Clear
            </button>
          </div>
        </div>

        {/* Dual Code-Editor Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          {/* Left Panel: API Response */}
          <div className="flex flex-col rounded-xl overflow-hidden bg-brandDark border border-[#E4E3EC]/10 shadow-lg">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#13131F] border-b border-[#E4E3EC]/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brandTeal"></span>
                <span className="font-medium text-sm text-brandEditorText">API Response</span>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-brandTeal/15 text-brandTeal border border-brandTeal/30 font-semibold tracking-wide">
                  JSON
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-brandEditorDim" id="response-stats">
                  {responseStats}
                </span>
                <button
                  id="btn-copy-response"
                  type="button"
                  onClick={() => handleCopy(jsonInput, setCopyResponseSuccess)}
                  className="text-brandEditorDim hover:text-brandEditorText transition-colors p-1 cursor-pointer"
                  title="Copy JSON"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copyResponseSuccess ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Editor Surface with Line Numbers */}
            <div className="relative flex flex-1 min-h-[300px] bg-brandDark font-mono text-xs sm:text-sm">
              {/* Gutter */}
              <div
                ref={responseGutterRef}
                id="response-gutter"
                className="select-none py-3 px-3 text-right text-brandEditorDim/50 bg-brandEditorGutter w-10 flex flex-col leading-6 border-r border-[#E4E3EC]/5 font-mono overflow-hidden"
              >
                {Array.from({ length: responseLineCount }, (_, i) => (
                  <span key={i + 1}>{i + 1}</span>
                ))}
              </div>
              {/* Code Textarea */}
              <textarea
                ref={jsonTextareaRef}
                id="json-input"
                spellCheck="false"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                onScroll={() => handleScroll(jsonTextareaRef.current, responseGutterRef.current)}
                className="w-full flex-1 p-3 bg-transparent text-brandEditorText resize-none focus:outline-none leading-6 font-mono no-scrollbar"
              />
            </div>
          </div>

          {/* Right Panel: Expected Schema */}
          <div className="flex flex-col rounded-xl overflow-hidden bg-brandDark border border-[#E4E3EC]/10 shadow-lg">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#13131F] border-b border-[#E4E3EC]/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brandPurple"></span>
                <span className="font-medium text-sm text-brandEditorText">Expected Schema</span>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-brandPurple/20 text-brandPurple border border-brandPurple/30 font-semibold tracking-wide">
                  JSON Schema
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-brandEditorDim" id="schema-stats">
                  {schemaStats}
                </span>
                <button
                  id="btn-copy-schema"
                  type="button"
                  onClick={() => handleCopy(schemaInput, setCopySchemaSuccess)}
                  className="text-brandEditorDim hover:text-brandEditorText transition-colors p-1 cursor-pointer"
                  title="Copy Schema"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copySchemaSuccess ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Editor Surface with Line Numbers */}
            <div className="relative flex flex-1 min-h-[300px] bg-brandDark font-mono text-xs sm:text-sm">
              {/* Gutter */}
              <div
                ref={schemaGutterRef}
                id="schema-gutter"
                className="select-none py-3 px-3 text-right text-brandEditorDim/50 bg-brandEditorGutter w-10 flex flex-col leading-6 border-r border-[#E4E3EC]/5 font-mono overflow-hidden"
              >
                {Array.from({ length: schemaLineCount }, (_, i) => (
                  <span key={i + 1}>{i + 1}</span>
                ))}
              </div>
              {/* Code Textarea */}
              <textarea
                ref={schemaTextareaRef}
                id="schema-input"
                spellCheck="false"
                value={schemaInput}
                onChange={(e) => setSchemaInput(e.target.value)}
                onScroll={() => handleScroll(schemaTextareaRef.current, schemaGutterRef.current)}
                className="w-full flex-1 p-3 bg-transparent text-brandEditorText resize-none focus:outline-none leading-6 font-mono no-scrollbar"
              />
            </div>
          </div>
        </div>

        {/* Validation Action Button */}
        <div className="flex justify-center py-1">
          <button
            id="btn-validate"
            type="button"
            onClick={() => executeValidation()}
            className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-brandPurple hover:bg-brandPurpleHover active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">
              fact_check
            </span>
            <span>Validate Response</span>
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Validation Results Section */}
        <section className="flex flex-col bg-brandDark rounded-xl border border-[#E4E3EC]/10 p-5 sm:p-6 shadow-md text-brandEditorText">
          {/* Section Header & State Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E3EC]/10 gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="font-semibold text-base sm:text-lg text-brandEditorText">Validation Results</h2>
              <span
                id="active-state-tag"
                className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-[#E4E3EC]/10 text-brandEditorDim border border-[#E4E3EC]/10"
              >
                {activeTagLabel}
              </span>
            </div>

            {/* Segmented State Switcher (Quick Interactive Previews) */}
            <div className="flex items-center bg-[#13131F] p-1 rounded-lg border border-[#E4E3EC]/10 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleTabClick('empty')}
                className={`state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeState === 'empty'
                    ? 'bg-brandPurple text-white font-medium shadow-sm'
                    : 'text-brandEditorDim hover:text-brandEditorText'
                }`}
                data-state="empty"
              >
                Empty
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('success')}
                className={`state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeState === 'success'
                    ? 'bg-brandPurple text-white font-medium shadow-sm'
                    : 'text-brandEditorDim hover:text-brandEditorText'
                }`}
                data-state="success"
              >
                Valid (Success)
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('invalid')}
                className={`state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeState === 'invalid'
                    ? 'bg-brandPurple text-white font-medium shadow-sm'
                    : 'text-brandEditorDim hover:text-brandEditorText'
                }`}
                data-state="invalid"
              >
                Type Violations
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('error')}
                className={`state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeState === 'error'
                    ? 'bg-brandPurple text-white font-medium shadow-sm'
                    : 'text-brandEditorDim hover:text-brandEditorText'
                }`}
                data-state="error"
              >
                Parse Error
              </button>
            </div>
          </div>

          {/* Results Viewport */}
          <div className="pt-4" id="results-viewport">
            {/* 1) Empty State */}
            {activeState === 'empty' && (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center" id="state-empty">
                <div className="w-12 h-12 rounded-full bg-[#13131F] border border-[#E4E3EC]/10 flex items-center justify-center text-brandEditorDim mb-3">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <p className="font-medium text-brandEditorText text-sm sm:text-base mb-1">
                  Your validation results will appear here.
                </p>
                <p className="text-xs sm:text-sm text-brandEditorDim max-w-md">
                  Click &quot;Validate Response&quot; above to run client-side structural validation against your expected JSON schema.
                </p>
              </div>
            )}

            {/* 2) Success State */}
            {activeState === 'success' && (
              <div className="flex flex-col gap-4" id="state-success">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-brandTeal/10 border border-brandTeal/30 gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brandTeal flex items-center justify-center text-brandDark shrink-0">
                      <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-brandTeal">
                        Response is valid. All fields match the expected schema.
                      </p>
                      <p className="text-xs text-brandEditorDim mt-0.5">
                        {validationResult?.checksPerformed || 5} checks passed • 0 violations detected
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandTeal text-brandDark font-mono text-xs font-semibold self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandDark"></span>
                    200 OK • MATCH
                  </span>
                </div>

                {/* Quick Metadata Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10">
                    <span className="text-[11px] font-mono uppercase text-brandEditorDim block mb-1">
                      Verified Keys
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-brandEditorText font-medium">
                      {verifiedKeys}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10">
                    <span className="text-[11px] font-mono uppercase text-brandEditorDim block mb-1">
                      Total Checks
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-brandTeal font-medium">
                      {validationResult?.checksPerformed || 5} assertions passed
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10">
                    <span className="text-[11px] font-mono uppercase text-brandEditorDim block mb-1">
                      Engine Status
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-brandEditorText font-medium">
                      Client-side In-Memory Engine
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3) Validation Error State */}
            {activeState === 'invalid' && (
              <div className="flex flex-col gap-4" id="state-invalid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-[18px]">priority_high</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-white">
                        Validation Failed:{' '}
                        {validationResult?.issueCount || 1}{' '}
                        {validationResult?.issueCount === 1 ? 'schema mismatch found' : 'schema mismatches found'}
                      </p>
                      <p className="text-xs text-[#E4E3EC]/70 mt-0.5">
                        Payload violates specification constraints. Please review the details below.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#FCA5A5] font-mono text-xs font-semibold self-start sm:self-auto">
                    {validationResult?.issueCount || 1}{' '}
                    {validationResult?.issueCount === 1 ? 'ERROR' : 'ERRORS'}
                  </span>
                </div>

                {/* Structured Breakdown Table */}
                <div className="overflow-x-auto rounded-lg border border-[#E4E3EC]/10 bg-[#13131F]">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#E4E3EC]/10 text-brandEditorDim font-mono text-xs uppercase bg-[#181827]">
                        <th className="py-2.5 px-4 font-medium">Field Path</th>
                        <th className="py-2.5 px-3 font-medium">Expected Type</th>
                        <th className="py-2.5 px-3 font-medium">Actual Type</th>
                        <th className="py-2.5 px-4 font-medium">Diagnostic Error Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E3EC]/5 font-mono">
                      {validationResult?.issues?.map((issue, idx) => (
                        <tr key={idx} className="hover:bg-brandDark/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-brandPurple/20 text-brandPurple font-semibold">
                              {issue.path?.startsWith('$') ? issue.path : `$.${issue.path}`}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-brandTeal">{String(issue.expected)}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-[#EF4444]/20 text-[#FCA5A5]">
                              {String(issue.actual)}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-sans text-brandEditorText">
                            {issue.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4) Parser Error State */}
            {activeState === 'error' && (
              <div className="flex flex-col gap-3" id="state-error">
                <div className="p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/25 flex flex-col sm:flex-row items-start gap-3">
                  <span className="material-symbols-outlined text-[#EF4444] text-[22px] shrink-0 mt-0.5">
                    error
                  </span>
                  <div className="flex-1 w-full">
                    <p className="font-semibold text-sm sm:text-base text-white mb-1">
                      Invalid JSON Syntax
                    </p>
                    <div className="p-3 bg-[#13131F] border border-[#E4E3EC]/10 rounded-md font-mono text-xs text-[#FCA5A5] overflow-x-auto leading-relaxed my-2">
                      {validationResult?.parsingError?.message ||
                        validationResult?.issues?.[0]?.message ||
                        'SyntaxError: Malformed JSON syntax in API Response.'}
                    </div>
                    <p className="text-xs text-brandEditorDim">
                      Fix syntax characters or remove trailing commas in the left editor before schema validation can run.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 border-t border-[#191927]/10 text-center text-xs font-mono text-brandDark/60">
        Respondr • Client-side RFC Draft-07 API Validation • Single action schema checker
      </footer>
    </>
  );
}
