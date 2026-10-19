(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RespondrPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/core/validation/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const SAMPLE_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": true,\n  "role": "admin"\n}`;
const SAMPLE_SCHEMA = `{\n  "type": "object",\n  "properties": {\n    "id": { "type": "number" },\n    "name": { "type": "string" },\n    "active": { "type": "boolean" },\n    "role": { "type": "string" }\n  },\n  "required": ["id", "name", "active"]\n}`;
const INVALID_TYPE_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": "yes",\n  "role": "admin"\n}`;
const PARSE_ERROR_PAYLOAD = `{\n  "id": 101,\n  "name": "Alex",\n  "active": true,\n  "role": "admin",\n}`;
function RespondrPage() {
    _s();
    const [jsonInput, setJsonInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SAMPLE_PAYLOAD);
    const [schemaInput, setSchemaInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SAMPLE_SCHEMA);
    const [validationResult, setValidationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeState, setActiveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('empty');
    const [copyResponseSuccess, setCopyResponseSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copySchemaSuccess, setCopySchemaSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const jsonTextareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const schemaTextareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const responseGutterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const schemaGutterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Synchronize textarea and gutter scrolling
    const handleScroll = (textarea, gutter)=>{
        if (textarea && gutter) {
            gutter.scrollTop = textarea.scrollTop;
        }
    };
    // Compute line count and byte size for display
    const responseStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[responseStats]": ()=>{
            const lines = (jsonInput.match(/\n/g) || []).length + 1;
            const bytes = new Blob([
                jsonInput
            ]).size;
            return `${lines} lines • ${bytes} B`;
        }
    }["RespondrPage.useMemo[responseStats]"], [
        jsonInput
    ]);
    const schemaStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[schemaStats]": ()=>{
            const lines = (schemaInput.match(/\n/g) || []).length + 1;
            const bytes = new Blob([
                schemaInput
            ]).size;
            return `${lines} lines • ${bytes} B`;
        }
    }["RespondrPage.useMemo[schemaStats]"], [
        schemaInput
    ]);
    const responseLineCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[responseLineCount]": ()=>{
            return (jsonInput.match(/\n/g) || []).length + 1;
        }
    }["RespondrPage.useMemo[responseLineCount]"], [
        jsonInput
    ]);
    const schemaLineCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[schemaLineCount]": ()=>{
            return (schemaInput.match(/\n/g) || []).length + 1;
        }
    }["RespondrPage.useMemo[schemaLineCount]"], [
        schemaInput
    ]);
    // Execute actual validation using existing engine
    const executeValidation = (rawJson, rawSchema)=>{
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
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateApiResponse"])(payloadText, parsedSchema);
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
    const handleResetSample = ()=>{
        setJsonInput(SAMPLE_PAYLOAD);
        setSchemaInput(SAMPLE_SCHEMA);
        executeValidation(SAMPLE_PAYLOAD, SAMPLE_SCHEMA);
    };
    const handleClearAll = ()=>{
        setJsonInput('');
        setSchemaInput('');
        setValidationResult(null);
        setActiveState('empty');
    };
    const handleFormatAll = ()=>{
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
    const handleCopy = (text, setSuccess)=>{
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(()=>{
                setSuccess(true);
                setTimeout(()=>setSuccess(false), 1400);
            });
        }
    };
    // Switcher tab handlers (loads scenario & runs real engine)
    const handleTabClick = (state)=>{
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
    const verifiedKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[verifiedKeys]": ()=>{
            try {
                const parsed = JSON.parse(jsonInput);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    return Object.keys(parsed).join(', ');
                }
            } catch (e) {}
            return 'None';
        }
    }["RespondrPage.useMemo[verifiedKeys]"], [
        jsonInput
    ]);
    const activeTagLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RespondrPage.useMemo[activeTagLabel]": ()=>{
            switch(activeState){
                case 'success':
                    return 'Passed';
                case 'invalid':
                    return validationResult?.issueCount === 1 ? '1 Violation' : `${validationResult?.issueCount || 0} Violations`;
                case 'error':
                    return 'Syntax Error';
                default:
                    return 'Idle';
            }
        }
    }["RespondrPage.useMemo[activeTagLabel]"], [
        activeState,
        validationResult
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "w-full border-b border-[#191927]/10 bg-brandBg/90 backdrop-blur sticky top-0 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-lg bg-brandDark flex items-center justify-center text-brandTeal shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-[20px]",
                                        children: "data_check"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-baseline gap-2.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-lg tracking-tight text-brandDark",
                                        children: "Respondr"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-brandDark/70 px-2.5 py-1 rounded bg-[#191927]/5 border border-[#191927]/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-brandTeal"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    "RFC Draft-07 Compliant"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl sm:text-3xl font-bold tracking-tight text-brandDark",
                                        children: "Validate JSON against Schema"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-brandDark/75 mt-1",
                                        children: "Verify payload structure, data types, and required constraints in real time."
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 self-start sm:self-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "btn-load-sample",
                                        type: "button",
                                        onClick: handleResetSample,
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-[15px] text-brandPurple",
                                                children: "restore"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, this),
                                            "Reset Sample"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "btn-format-all",
                                        type: "button",
                                        onClick: handleFormatAll,
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-[15px] text-brandTeal",
                                                children: "auto_fix_high"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this),
                                            "Format"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "btn-clear-all",
                                        type: "button",
                                        onClick: handleClearAll,
                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#191927]/8 hover:bg-[#191927]/12 text-brandDark border border-[#191927]/10 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-[15px] text-[#DC2626]",
                                                children: "clear_all"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 258,
                                                columnNumber: 15
                                            }, this),
                                            "Clear"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-5 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col rounded-xl overflow-hidden bg-brandDark border border-[#E4E3EC]/10 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between px-4 py-3 bg-[#13131F] border-b border-[#E4E3EC]/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-full bg-brandTeal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 271,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm text-brandEditorText",
                                                        children: "API Response"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 272,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-brandTeal/15 text-brandTeal border border-brandTeal/30 font-semibold tracking-wide",
                                                        children: "JSON"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 273,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-mono text-brandEditorDim",
                                                        id: "response-stats",
                                                        children: responseStats
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        id: "btn-copy-response",
                                                        type: "button",
                                                        onClick: ()=>handleCopy(jsonInput, setCopyResponseSuccess),
                                                        className: "text-brandEditorDim hover:text-brandEditorText transition-colors p-1 cursor-pointer",
                                                        title: "Copy JSON",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-[16px]",
                                                            children: copyResponseSuccess ? 'check' : 'content_copy'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 288,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 281,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 277,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex flex-1 min-h-[300px] bg-brandDark font-mono text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: responseGutterRef,
                                                id: "response-gutter",
                                                className: "select-none py-3 px-3 text-right text-brandEditorDim/50 bg-brandEditorGutter w-10 flex flex-col leading-6 border-r border-[#E4E3EC]/5 font-mono overflow-hidden",
                                                children: Array.from({
                                                    length: responseLineCount
                                                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: i + 1
                                                    }, i + 1, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 304,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                ref: jsonTextareaRef,
                                                id: "json-input",
                                                spellCheck: "false",
                                                value: jsonInput,
                                                onChange: (e)=>setJsonInput(e.target.value),
                                                onScroll: ()=>handleScroll(jsonTextareaRef.current, responseGutterRef.current),
                                                className: "w-full flex-1 p-3 bg-transparent text-brandEditorText resize-none focus:outline-none leading-6 font-mono no-scrollbar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col rounded-xl overflow-hidden bg-brandDark border border-[#E4E3EC]/10 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between px-4 py-3 bg-[#13131F] border-b border-[#E4E3EC]/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-full bg-brandPurple"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 325,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-sm text-brandEditorText",
                                                        children: "Expected Schema"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 326,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-brandPurple/20 text-brandPurple border border-brandPurple/30 font-semibold tracking-wide",
                                                        children: "JSON Schema"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 327,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 324,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-mono text-brandEditorDim",
                                                        id: "schema-stats",
                                                        children: schemaStats
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 332,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        id: "btn-copy-schema",
                                                        type: "button",
                                                        onClick: ()=>handleCopy(schemaInput, setCopySchemaSuccess),
                                                        className: "text-brandEditorDim hover:text-brandEditorText transition-colors p-1 cursor-pointer",
                                                        title: "Copy Schema",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-[16px]",
                                                            children: copySchemaSuccess ? 'check' : 'content_copy'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 342,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 335,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 331,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 323,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex flex-1 min-h-[300px] bg-brandDark font-mono text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: schemaGutterRef,
                                                id: "schema-gutter",
                                                className: "select-none py-3 px-3 text-right text-brandEditorDim/50 bg-brandEditorGutter w-10 flex flex-col leading-6 border-r border-[#E4E3EC]/5 font-mono overflow-hidden",
                                                children: Array.from({
                                                    length: schemaLineCount
                                                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: i + 1
                                                    }, i + 1, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 352,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                ref: schemaTextareaRef,
                                                id: "schema-input",
                                                spellCheck: "false",
                                                value: schemaInput,
                                                onChange: (e)=>setSchemaInput(e.target.value),
                                                onScroll: ()=>handleScroll(schemaTextareaRef.current, schemaGutterRef.current),
                                                className: "w-full flex-1 p-3 bg-transparent text-brandEditorText resize-none focus:outline-none leading-6 font-mono no-scrollbar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 362,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center py-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            id: "btn-validate",
                            type: "button",
                            onClick: ()=>executeValidation(),
                            className: "group flex items-center justify-center gap-2 px-8 py-3.5 bg-brandPurple hover:bg-brandPurpleHover active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition-all cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12",
                                    children: "fact_check"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Validate Response"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5",
                                    children: "arrow_forward"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 387,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col bg-brandDark rounded-xl border border-[#E4E3EC]/10 p-5 sm:p-6 shadow-md text-brandEditorText",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E3EC]/10 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-base sm:text-lg text-brandEditorText",
                                                children: "Validation Results"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 398,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                id: "active-state-tag",
                                                className: "px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-[#E4E3EC]/10 text-brandEditorDim border border-[#E4E3EC]/10",
                                                children: activeTagLabel
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 399,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center bg-[#13131F] p-1 rounded-lg border border-[#E4E3EC]/10 overflow-x-auto no-scrollbar",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleTabClick('empty'),
                                                className: `state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${activeState === 'empty' ? 'bg-brandPurple text-white font-medium shadow-sm' : 'text-brandEditorDim hover:text-brandEditorText'}`,
                                                "data-state": "empty",
                                                children: "Empty"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 409,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleTabClick('success'),
                                                className: `state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${activeState === 'success' ? 'bg-brandPurple text-white font-medium shadow-sm' : 'text-brandEditorDim hover:text-brandEditorText'}`,
                                                "data-state": "success",
                                                children: "Valid (Success)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleTabClick('invalid'),
                                                className: `state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${activeState === 'invalid' ? 'bg-brandPurple text-white font-medium shadow-sm' : 'text-brandEditorDim hover:text-brandEditorText'}`,
                                                "data-state": "invalid",
                                                children: "Type Violations"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleTabClick('error'),
                                                className: `state-tab-btn px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${activeState === 'error' ? 'bg-brandPurple text-white font-medium shadow-sm' : 'text-brandEditorDim hover:text-brandEditorText'}`,
                                                "data-state": "error",
                                                children: "Parse Error"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 445,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 408,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4",
                                id: "results-viewport",
                                children: [
                                    activeState === 'empty' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center py-10 px-4 text-center",
                                        id: "state-empty",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-full bg-[#13131F] border border-[#E4E3EC]/10 flex items-center justify-center text-brandEditorDim mb-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-[24px]",
                                                    children: "terminal"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 466,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-brandEditorText text-sm sm:text-base mb-1",
                                                children: "Your validation results will appear here."
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs sm:text-sm text-brandEditorDim max-w-md",
                                                children: 'Click "Validate Response" above to run client-side structural validation against your expected JSON schema.'
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this),
                                    activeState === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        id: "state-success",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-brandTeal/10 border border-brandTeal/30 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start sm:items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-brandTeal flex items-center justify-center text-brandDark shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "material-symbols-outlined text-[20px] font-bold",
                                                                    children: "check"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 483,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 482,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-sm sm:text-base text-brandTeal",
                                                                        children: "Response is valid. All fields match the expected schema."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 486,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-brandEditorDim mt-0.5",
                                                                        children: [
                                                                            validationResult?.checksPerformed || 5,
                                                                            " checks passed • 0 violations detected"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 489,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 485,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandTeal text-brandDark font-mono text-xs font-semibold self-start sm:self-auto",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-brandDark"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 495,
                                                                columnNumber: 21
                                                            }, this),
                                                            "200 OK • MATCH"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 494,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 480,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-mono uppercase text-brandEditorDim block mb-1",
                                                                children: "Verified Keys"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 503,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs sm:text-sm font-mono text-brandEditorText font-medium",
                                                                children: verifiedKeys
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 506,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 502,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-mono uppercase text-brandEditorDim block mb-1",
                                                                children: "Total Checks"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 511,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs sm:text-sm font-mono text-brandTeal font-medium",
                                                                children: [
                                                                    validationResult?.checksPerformed || 5,
                                                                    " assertions passed"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 514,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 510,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-[#13131F] border border-[#E4E3EC]/10",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-mono uppercase text-brandEditorDim block mb-1",
                                                                children: "Engine Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 519,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs sm:text-sm font-mono text-brandEditorText font-medium",
                                                                children: "Client-side In-Memory Engine"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 522,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 518,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 501,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this),
                                    activeState === 'invalid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        id: "state-invalid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start sm:items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center text-white shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "material-symbols-outlined text-[18px]",
                                                                    children: "priority_high"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 536,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 535,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-sm sm:text-base text-white",
                                                                        children: [
                                                                            "Validation Failed:",
                                                                            ' ',
                                                                            validationResult?.issueCount || 1,
                                                                            ' ',
                                                                            validationResult?.issueCount === 1 ? 'schema mismatch found' : 'schema mismatches found'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 539,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-[#E4E3EC]/70 mt-0.5",
                                                                        children: "Payload violates specification constraints. Please review the details below."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 544,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 538,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 534,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center px-2.5 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#FCA5A5] font-mono text-xs font-semibold self-start sm:self-auto",
                                                        children: [
                                                            validationResult?.issueCount || 1,
                                                            ' ',
                                                            validationResult?.issueCount === 1 ? 'ERROR' : 'ERRORS'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 549,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 533,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "overflow-x-auto rounded-lg border border-[#E4E3EC]/10 bg-[#13131F]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full text-left text-xs sm:text-sm border-collapse",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-b border-[#E4E3EC]/10 text-brandEditorDim font-mono text-xs uppercase bg-[#181827]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "py-2.5 px-4 font-medium",
                                                                        children: "Field Path"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 560,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "py-2.5 px-3 font-medium",
                                                                        children: "Expected Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 561,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "py-2.5 px-3 font-medium",
                                                                        children: "Actual Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 562,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "py-2.5 px-4 font-medium",
                                                                        children: "Diagnostic Error Message"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.js",
                                                                        lineNumber: 563,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.js",
                                                                lineNumber: 559,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 558,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            className: "divide-y divide-[#E4E3EC]/5 font-mono",
                                                            children: validationResult?.issues?.map((issue, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "hover:bg-brandDark/50 transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3 px-4",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-2 py-0.5 rounded bg-brandPurple/20 text-brandPurple font-semibold",
                                                                                children: issue.path?.startsWith('$') ? issue.path : `$.${issue.path}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.js",
                                                                                lineNumber: 570,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.js",
                                                                            lineNumber: 569,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3 px-3",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-brandTeal",
                                                                                children: String(issue.expected)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.js",
                                                                                lineNumber: 575,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.js",
                                                                            lineNumber: 574,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3 px-3",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-1.5 py-0.5 rounded bg-[#EF4444]/20 text-[#FCA5A5]",
                                                                                children: String(issue.actual)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.js",
                                                                                lineNumber: 578,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.js",
                                                                            lineNumber: 577,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3 px-4 font-sans text-brandEditorText",
                                                                            children: issue.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.js",
                                                                            lineNumber: 582,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/app/page.js",
                                                                    lineNumber: 568,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 566,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 557,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 556,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 532,
                                        columnNumber: 15
                                    }, this),
                                    activeState === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3",
                                        id: "state-error",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/25 flex flex-col sm:flex-row items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-[#EF4444] text-[22px] shrink-0 mt-0.5",
                                                    children: "error"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 597,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-sm sm:text-base text-white mb-1",
                                                            children: "Invalid JSON Syntax"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 601,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3 bg-[#13131F] border border-[#E4E3EC]/10 rounded-md font-mono text-xs text-[#FCA5A5] overflow-x-auto leading-relaxed my-2",
                                                            children: validationResult?.parsingError?.message || validationResult?.issues?.[0]?.message || 'SyntaxError: Malformed JSON syntax in API Response.'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 604,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-brandEditorDim",
                                                            children: "Fix syntax characters or remove trailing commas in the left editor before schema validation can run."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.js",
                                                            lineNumber: 609,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 600,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 596,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 595,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "w-full py-4 border-t border-[#191927]/10 text-center text-xs font-mono text-brandDark/60",
                children: "Respondr • Client-side RFC Draft-07 API Validation • Single action schema checker"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 621,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s(RespondrPage, "6cg9iPe7DLx0OrnZiRmvlRTyBQ4=");
_c = RespondrPage;
var _c;
__turbopack_context__.k.register(_c, "RespondrPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/validation/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "validateApiResponse",
    ()=>validateApiResponse
]);
/**
 * Respondr Core Validation Engine - Public API Entrypoint
 *
 * Responsibilities:
 * - Provide a unified, clean public facade for the engine.
 * - Accept raw JSON string and expected schema.
 * - Coordinate JSON parsing and schema validation.
 * - Deliver consistent, predictable structured results separating parsing and validation issues.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/validation/parser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/validation/validator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/validation/rules.js [app-client] (ecmascript)");
;
;
;
;
;
;
function validateApiResponse(jsonString, schema, options = {}) {
    // Step 1: JSON Parsing
    const parseResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJson"])(jsonString);
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
    const validationResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"])(parseResult.data, schema, options);
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
const __TURBOPACK__default__export__ = validateApiResponse;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/validation/parser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Respondr Core Validation Engine - JSON Parser
 *
 * Responsibilities:
 * - Safely parse JSON strings.
 * - Guard against non-string, empty, null, or undefined inputs.
 * - Capture syntax errors with actionable diagnostics without throwing unhandled exceptions.
 */ __turbopack_context__.s([
    "PARSE_ERROR_CODES",
    ()=>PARSE_ERROR_CODES,
    "parseJson",
    ()=>parseJson
]);
const PARSE_ERROR_CODES = Object.freeze({
    EMPTY_INPUT: 'EMPTY_INPUT',
    INVALID_INPUT_TYPE: 'INVALID_INPUT_TYPE',
    INVALID_JSON_SYNTAX: 'INVALID_JSON_SYNTAX'
});
function parseJson(input) {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/validation/rules.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Respondr Core Validation Engine - Rules
 *
 * Responsibilities:
 * - Define and implement reusable validation rules (type, presence, constraints, unexpected fields).
 * - Accurately detect JavaScript types including array vs object vs null.
 * - Format clear human-readable error messages and structured issue records.
 */ __turbopack_context__.s([
    "VALIDATION_ERROR_CODES",
    ()=>VALIDATION_ERROR_CODES,
    "getType",
    ()=>getType,
    "validateRequiredFields",
    ()=>validateRequiredFields,
    "validateType",
    ()=>validateType,
    "validateUnexpectedFields",
    ()=>validateUnexpectedFields,
    "validateValueConstraints",
    ()=>validateValueConstraints
]);
const VALIDATION_ERROR_CODES = Object.freeze({
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    TYPE_MISMATCH: 'TYPE_MISMATCH',
    UNEXPECTED_FIELD: 'UNEXPECTED_FIELD',
    INVALID_VALUE: 'INVALID_VALUE',
    INVALID_SCHEMA: 'INVALID_SCHEMA'
});
function getType(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'number') {
        return Number.isNaN(value) ? 'nan' : 'number';
    }
    return typeof value;
}
function validateType(value, expectedType, path, options = {}) {
    const actualType = getType(value);
    // If nullable is explicitly allowed and value is null, type check passes
    if (options.nullable === true && actualType === 'null') {
        return {
            isValid: true,
            issue: null
        };
    }
    const allowedTypes = Array.isArray(expectedType) ? expectedType : [
        expectedType
    ];
    const isMatch = allowedTypes.some((t)=>{
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
    return {
        isValid: true,
        issue: null
    };
}
function validateRequiredFields(object, requiredFields, parentPath) {
    const issues = [];
    if (!requiredFields || !Array.isArray(requiredFields)) return issues;
    for (const field of requiredFields){
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
function validateUnexpectedFields(object, allowedFields, parentPath) {
    const issues = [];
    if (!object || typeof object !== 'object' || Array.isArray(object)) return issues;
    const allowedSet = new Set(allowedFields);
    const objectKeys = Object.keys(object);
    for (const key of objectKeys){
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
function validateValueConstraints(value, rules = {}, path) {
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
                message: `Value at '${path}' must be one of [${allowed.map((v)=>JSON.stringify(v)).join(', ')}], but received ${JSON.stringify(value)}.`
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/core/validation/validator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validate",
    ()=>validate
]);
/**
 * Respondr Core Validation Engine - Validator
 *
 * Responsibilities:
 * - Recursively validate parsed data against an expected schema.
 * - Accurately track checks performed and issues discovered.
 * - Detect missing required fields, type mismatches, unexpected fields,
 *   nested object errors, array item errors, and rule violations.
 * - Produce structured, predictable results ready for consumers and UI display.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/core/validation/rules.js [app-client] (ecmascript)");
;
function validate(data, schema, options = {}) {
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
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VALIDATION_ERROR_CODES"].INVALID_SCHEMA,
                    stage: 'validation',
                    path: '$',
                    expected: 'object',
                    actual: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getType"])(schema),
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
 */ function validateNode(value, schemaNode, currentPath, context) {
    if (!schemaNode || typeof schemaNode !== 'object') {
        return;
    }
    // 1. Type validation
    if (schemaNode.type !== undefined) {
        context.checksPerformed++;
        const typeResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateType"])(value, schemaNode.type, currentPath, {
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
    const actualType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getType"])(value);
    // 2. Object validation
    if (actualType === 'object') {
        validateObjectNode(value, schemaNode, currentPath, context);
    }
    // 3. Array validation
    if (actualType === 'array') {
        validateArrayNode(value, schemaNode, currentPath, context);
    }
    // 4. Value constraints (enum, min/max, string length, regex pattern)
    const hasConstraints = schemaNode.enum !== undefined || schemaNode.allowedValues !== undefined || schemaNode.min !== undefined || schemaNode.max !== undefined || schemaNode.minLength !== undefined || schemaNode.maxLength !== undefined || schemaNode.pattern !== undefined || schemaNode.minItems !== undefined || schemaNode.maxItems !== undefined;
    if (hasConstraints) {
        context.checksPerformed++;
        const constraintIssues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateValueConstraints"])(value, schemaNode, currentPath);
        context.issues.push(...constraintIssues);
    }
}
/**
 * Validates object properties, required fields, and unexpected fields.
 */ function validateObjectNode(object, schemaNode, currentPath, context) {
    const properties = schemaNode.properties || {};
    const propertyKeys = Object.keys(properties);
    // Gather required fields from both schema.required array and property.required === true
    const requiredSet = new Set(Array.isArray(schemaNode.required) ? schemaNode.required : []);
    for (const [key, propDef] of Object.entries(properties)){
        if (propDef && typeof propDef === 'object' && propDef.required === true) {
            requiredSet.add(key);
        }
    }
    // A. Check required fields
    if (requiredSet.size > 0) {
        context.checksPerformed++;
        const missingIssues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateRequiredFields"])(object, Array.from(requiredSet), currentPath);
        context.issues.push(...missingIssues);
    }
    // B. Check unexpected fields
    const allowUnexpected = schemaNode.allowUnexpectedFields ?? schemaNode.additionalProperties ?? context.options.allowUnexpectedFields;
    if (allowUnexpected === false) {
        context.checksPerformed++;
        const unexpectedIssues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$core$2f$validation$2f$rules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateUnexpectedFields"])(object, propertyKeys, currentPath);
        context.issues.push(...unexpectedIssues);
    }
    // C. Recursively validate defined properties
    for (const key of propertyKeys){
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
 */ function validateArrayNode(array, schemaNode, currentPath, context) {
    if (schemaNode.items && typeof schemaNode.items === 'object') {
        array.forEach((item, index)=>{
            const itemPath = `${currentPath}[${index}]`;
            validateNode(item, schemaNode.items, itemPath, context);
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_0bvgx9w23iny1._.js.map