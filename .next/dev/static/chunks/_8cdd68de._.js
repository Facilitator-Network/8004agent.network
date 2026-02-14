(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/landing/scattered-icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScatteredIcons",
    ()=>ScatteredIcons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const icons = [
    "grok.svg",
    "DeepSeek.svg",
    "Hugging Face.svg",
    "Meta.svg",
    "OpenAI.svg",
    "claude.svg",
    "copilot.svg",
    "gemini.svg",
    "mistral.svg",
    "perplexity.svg",
    "Xai.svg",
    "Anthropic.svg"
];
const positions = [
    {
        top: 14,
        left: 10
    },
    {
        top: 20,
        left: 45
    },
    {
        top: 15,
        left: 69
    },
    {
        top: 10,
        left: 87
    },
    {
        top: 35,
        left: 23
    },
    {
        top: 61,
        left: 10
    },
    {
        top: 66,
        left: 40
    },
    {
        top: 50,
        left: 68
    },
    {
        top: 75,
        left: 64
    },
    {
        top: 80,
        left: 90
    },
    {
        top: 80,
        left: 27
    },
    {
        top: 40,
        left: 80
    }
];
function ScatteredIcons({ opacity = 1 }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScatteredIcons.useEffect": ()=>{
            setMounted(true);
        }
    }["ScatteredIcons.useEffect"], []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none overflow-hidden select-none z-0",
        style: {
            opacity
        },
        children: icons.map((icon, i)=>{
            const pos = positions[i % positions.length];
            // Random drift parameters
            const duration = 3 + Math.random() * 2; // 3-5 seconds
            const delay = Math.random() * 2;
            const driftX = Math.random() * 20 - 10; // -10 to 10px
            const driftY = Math.random() * 20 - 10; // -10 to 10px
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                // Glass Pixel Style: REMOVED container box. Just floating icons.
                className: "absolute flex items-center justify-center w-12 h-12 md:w-16 md:h-16 pointer-events-auto cursor-pointer",
                initial: {
                    opacity: 0,
                    scale: 0.5,
                    filter: "blur(20px)"
                },
                animate: {
                    opacity: 0.5,
                    scale: 1,
                    filter: "blur(12px) saturate(1.5)",
                    x: [
                        0,
                        driftX,
                        0
                    ],
                    y: [
                        0,
                        driftY,
                        0
                    ]
                },
                whileHover: {
                    scale: 1.1,
                    opacity: 1,
                    filter: "blur(0px) saturate(1) brightness(1.2)",
                    zIndex: 50
                },
                transition: {
                    opacity: {
                        duration: 0.15
                    },
                    scale: {
                        duration: 0.15
                    },
                    filter: {
                        duration: 0.15
                    },
                    delay: i * 0.1,
                    // Separate transition for the drift
                    x: {
                        duration: duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: delay
                    },
                    y: {
                        duration: duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: delay
                    }
                },
                style: {
                    top: `${pos.top}%`,
                    left: `${pos.left}%`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `/logos/${icon}`,
                        alt: icon.replace(".svg", ""),
                        className: `w-full h-full object-contain pointer-events-none ${icon.includes("grok") || icon.includes("perplexity") ? "invert dark:invert-0" : icon.includes("Anthropic") ? "dark:invert dark:opacity-30 opacity-60" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/components/landing/scattered-icons.tsx",
                        lineNumber: 103,
                        columnNumber: 16
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing/scattered-icons.tsx",
                    lineNumber: 102,
                    columnNumber: 13
                }, this)
            }, icon, false, {
                fileName: "[project]/components/landing/scattered-icons.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/landing/scattered-icons.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(ScatteredIcons, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = ScatteredIcons;
var _c;
__turbopack_context__.k.register(_c, "ScatteredIcons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/retro-pixel-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RetroPixelButton",
    ()=>RetroPixelButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function RetroPixelButton({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative inline-flex items-center justify-center font-pixel uppercase tracking-widest", "h-10 px-6 text-sm md:text-base outline-none selection:bg-transparent", "border-2 rounded-pixel-lg", // Use page background color for both light and dark modes
        "bg-background text-foreground border-foreground", "shadow-[4px_4px_0px_0px_hsl(var(--foreground))]", // Active State (Press Switch Effect - Instant transition)
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", "transition-[transform,shadow] duration-0", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "relative z-10 flex items-center gap-2 transition-transform duration-200 group-hover:scale-110",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/retro-pixel-button.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/retro-pixel-button.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = RetroPixelButton;
var _c;
__turbopack_context__.k.register(_c, "RetroPixelButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/hero-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$scattered$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/scattered-icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/retro-pixel-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function HeroSection({ onAnimationComplete, isActive }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const iconsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const badgeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timelineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const accumulatedScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const maxScroll = 1200;
    // Initialize GSAP Timeline
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"])({
        "HeroSection.useGSAP": ()=>{
            if (!containerRef.current) return;
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                paused: true
            });
            // Stage 1: Fade out elements (0 - 40% of scroll)
            tl.to([
                iconsRef.current,
                badgeRef.current,
                buttonsRef.current
            ], {
                opacity: 0,
                duration: 0.4,
                ease: "none"
            }, 0);
            // Stage 2: Zoom and Fade Text (40% - 100% of scroll)
            tl.to(titleRef.current, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: "power1.in"
            }, 0.4);
            timelineRef.current = tl;
        }
    }["HeroSection.useGSAP"], {
        scope: containerRef
    });
    // Handle Scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            if (!isActive) return;
            const handleWheel = {
                "HeroSection.useEffect.handleWheel": (e)=>{
                    const wheelEvent = e;
                    // Calculate potential new scroll position
                    const delta = wheelEvent.deltaY;
                    const newScroll = accumulatedScrollRef.current + delta;
                    // Check boundaries
                    const isWithinBounds = newScroll >= 0 && newScroll <= maxScroll;
                    // Determine if we should handle this event
                    // We handle it if we are within bounds, OR if we are trying to scroll back into bounds
                    // BUT if we are completely done (at max) and scrolling down, we let it pass (for App.tsx to switch sections)
                    // If we are at start (0) and scrolling up, we let it pass (overscroll)
                    if (isWithinBounds) {
                        wheelEvent.preventDefault();
                        wheelEvent.stopPropagation();
                        accumulatedScrollRef.current = newScroll;
                    } else if (accumulatedScrollRef.current > 0 && delta < 0) {
                        // Allow scrolling back up if we are partially or fully passed max
                        wheelEvent.preventDefault();
                        wheelEvent.stopPropagation();
                        accumulatedScrollRef.current = Math.max(0, newScroll);
                    } else if (accumulatedScrollRef.current < maxScroll && delta > 0) {
                        // Allow scrolling forward if we are NOT yet at max
                        wheelEvent.preventDefault();
                        wheelEvent.stopPropagation();
                        accumulatedScrollRef.current = Math.min(newScroll, maxScroll);
                    }
                    // Update Timeline
                    const progress = accumulatedScrollRef.current / maxScroll;
                    timelineRef.current?.progress(progress);
                    // Notify completion
                    // Trigger slightly before 1.0 (0.99) to ensure we don't get stuck due to float precision
                    // And ensure we are strictly moving forward (delta > 0)
                    if (progress >= 0.99 && onAnimationComplete && wheelEvent.deltaY > 0) {
                        onAnimationComplete();
                    }
                }
            }["HeroSection.useEffect.handleWheel"];
            document.addEventListener('wheel', handleWheel, {
                passive: false
            });
            return ({
                "HeroSection.useEffect": ()=>document.removeEventListener('wheel', handleWheel)
            })["HeroSection.useEffect"];
        }
    }["HeroSection.useEffect"], [
        isActive,
        onAnimationComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: containerRef,
        className: "relative flex flex-col items-center justify-center pt-32 pb-32 w-full text-center gap-1 min-h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: iconsRef,
                className: "absolute inset-0 z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$scattered$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScatteredIcons"], {}, void 0, false, {
                    fileName: "[project]/components/landing/hero-section.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-[1] pointer-events-none opacity-[0.05] mix-blend-overlay",
                style: {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }
            }, void 0, false, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        @keyframes textFillPulse {
          0% {
            -webkit-text-fill-color: currentColor;
            text-fill-color: currentColor;
          }
          75% {
            -webkit-text-fill-color: currentColor;
            text-fill-color: currentColor;
          }
          76%, 100% {
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
          }
        }
        .text-pulse {
          animation: textFillPulse 4s ease-in-out infinite;
        }
        .text-pulse:hover {
          animation: none;
          -webkit-text-fill-color: currentColor !important;
          text-fill-color: currentColor !important;
        }
      `
                }
            }, void 0, false, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: badgeRef,
                className: "flex items-center gap-3 px-4 py-2 border-2 rounded-pixel-md bg-white text-black border-black dark:bg-black dark:text-white dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 relative z-10 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative flex h-2 w-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "animate-ping absolute inline-flex h-full w-full rounded-none bg-system-green opacity-75"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/hero-section.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex h-2 w-2 rounded-none bg-system-green"
                            }, void 0, false, {
                                fileName: "[project]/components/landing/hero-section.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs md:text-sm font-bold font-pixel tracking-[0.2em] uppercase opacity-90",
                        children: "Intelligence & Discovery Layer"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                ref: titleRef,
                className: "flex flex-col items-center justify-center text-6xl md:text-9xl font-bold font-pixel tracking-tighter leading-[0.8] select-none z-10 cursor-pointer text-pulse transition-transform duration-100 ease-out",
                style: {
                    WebkitTextStroke: '2px currentColor',
                    WebkitTextFillColor: 'transparent',
                    paintOrder: 'stroke fill'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "8004 AGENTS"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "-mt-4 md:-mt-6",
                        children: "NETWORK"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: buttonsRef,
                className: "flex gap-4 mt-1 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                        className: "w-32 h-10 border-primary/80 text-sm",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigateTo"])('/deploy'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Deploy"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/hero-section.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                        className: "w-32 h-10 border-primary/80 text-sm",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigateTo"])('/agents'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Hire"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/hero-section.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/landing/hero-section.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/hero-section.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/hero-section.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(HeroSection, "cI8OxaEvDHEEaglVR3iMR3qI4KE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]
    ];
});
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/pixel-blast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PixelBlast",
    ()=>PixelBlast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PixelBlast({ active, children, className, particleColor }) {
    _s();
    // Generate random particle properties once
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PixelBlast.useMemo[particles]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return Array.from({
                length: 400
            }).map({
                "PixelBlast.useMemo[particles]": (_, i)=>({
                        id: i,
                        x: (Math.random() - 0.5) * window.innerWidth * 1.5,
                        y: Math.random() * -window.innerHeight * 0.8 - 100,
                        rotation: Math.random() * 1080 - 540,
                        scale: Math.random() * 1.2 + 0.4,
                        gravity: Math.random() * 1200 + 800,
                        delay: Math.random() * 0.15,
                        color: i % 5 === 0 ? "var(--system-green)" : i % 3 === 0 ? "var(--foreground)" : "var(--muted-foreground)"
                    })
            }["PixelBlast.useMemo[particles]"]);
        }
    }["PixelBlast.useMemo[particles]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    opacity: active ? 0 : 1,
                    scale: active ? 1.05 : 1
                },
                transition: {
                    duration: 0.15
                },
                className: "relative z-10",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/pixel-blast.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none z-[99] flex items-center justify-center",
                children: particles.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute w-2 h-2 md:w-3 md:h-3 sharp-pixels",
                        style: {
                            backgroundColor: p.color || particleColor || "var(--foreground)"
                        },
                        initial: {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1
                        },
                        animate: {
                            x: p.x,
                            y: [
                                p.y,
                                p.y + p.gravity
                            ],
                            opacity: [
                                1,
                                1,
                                0
                            ],
                            rotate: p.rotation,
                            scale: [
                                1,
                                p.scale,
                                0
                            ]
                        },
                        transition: {
                            duration: 1.2,
                            ease: [
                                0.2,
                                0.8,
                                0.2,
                                1
                            ],
                            times: [
                                0,
                                1
                            ],
                            opacity: {
                                duration: 0.8,
                                delay: 0.4
                            }
                        }
                    }, p.id, false, {
                        fileName: "[project]/components/ui/pixel-blast.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/pixel-blast.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/pixel-blast.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(PixelBlast, "4A8/E2ZKMQMOCuaGnTg4x6kwo4w=");
_c = PixelBlast;
var _c;
__turbopack_context__.k.register(_c, "PixelBlast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/typewriter-text.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypewriterText",
    ()=>TypewriterText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TypewriterText({ text, onComplete, mode = "type", speed = 50, deleteSpeed = 30, className }) {
    _s();
    const [displayed, setDisplayed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mode === "delete" ? text : "");
    const onCompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onComplete);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypewriterText.useEffect": ()=>{
            onCompleteRef.current = onComplete;
        }
    }["TypewriterText.useEffect"], [
        onComplete
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypewriterText.useEffect": ()=>{
            // If typing, start from empty. If deleting, start from full.
            // However, if we switch modes, we want to respect current content or just reset?
            // For simplicity in this sequence: Typing always starts from 0, Deleting always starts from text.
            if (mode === "type") setDisplayed("");
            else setDisplayed(text);
            let i = mode === "type" ? 0 : text.length;
            const timer = setInterval({
                "TypewriterText.useEffect.timer": ()=>{
                    if (mode === "type") {
                        if (i < text.length) {
                            // Use slice for safer string construction
                            setDisplayed(text.slice(0, i + 1));
                            i++;
                        } else {
                            clearInterval(timer);
                            if (onCompleteRef.current) onCompleteRef.current();
                        }
                    } else {
                        // Deleting
                        if (i > 0) {
                            setDisplayed(text.slice(0, i - 1));
                            i--;
                        } else {
                            clearInterval(timer);
                            if (onCompleteRef.current) onCompleteRef.current();
                        }
                    }
                }
            }["TypewriterText.useEffect.timer"], mode === "type" ? speed : deleteSpeed);
            return ({
                "TypewriterText.useEffect": ()=>clearInterval(timer)
            })["TypewriterText.useEffect"];
        }
    }["TypewriterText.useEffect"], [
        text,
        mode,
        speed,
        deleteSpeed
    ]); // Depend on mode to restart effect
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: [
            displayed,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "animate-pulse",
                children: "_"
            }, void 0, false, {
                fileName: "[project]/components/ui/typewriter-text.tsx",
                lineNumber: 62,
                columnNumber: 49
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/typewriter-text.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(TypewriterText, "CoTAckfHFl4vtPblndU4Ahyc46M=");
_c = TypewriterText;
var _c;
__turbopack_context__.k.register(_c, "TypewriterText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/registration-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RegistrationModal",
    ()=>RegistrationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/retro-pixel-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/typewriter-text.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function RegistrationModal({ isOpen, identityType, onClose, onSubmit }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitted, setIsSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const suffix = identityType === "human" ? ".human" : ".agent";
    const titleText = identityType === "human" ? "GET_YOUR_HUMAN_ID" : "GET_YOUR_AGENT_ID";
    // Hardcoded wallet address for now
    const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    // Animation State
    const [animationStage, setAnimationStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("init");
    // Start animation sequence when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationModal.useEffect": ()=>{
            if (isOpen) {
                setAnimationStage("init");
                // Sequence:
                // 1. Start Background (immediate)
                setTimeout({
                    "RegistrationModal.useEffect": ()=>setAnimationStage("background")
                }["RegistrationModal.useEffect"], 100);
                // 2. Start Title (after background settles a bit - 1.5s)
                setTimeout({
                    "RegistrationModal.useEffect": ()=>setAnimationStage("title")
                }["RegistrationModal.useEffect"], 1500);
            }
        }
    }["RegistrationModal.useEffect"], [
        isOpen
    ]);
    // Generate scattered background text with grid-based non-overlapping logic
    const backgroundItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RegistrationModal.useMemo[backgroundItems]": ()=>{
            const humanNames = [
                "vitalik",
                "elon",
                "satoshi",
                "sam",
                "ada",
                "grace",
                "alan",
                "linus",
                "tim",
                "steve",
                "sergey",
                "larry",
                "mark",
                "bill",
                "dennis",
                "ken",
                "guido",
                "yukihiro",
                "brendan",
                "james",
                "nakamoto",
                "turing",
                "lovelace",
                "brian",
                "jack",
                "jeff",
                "sundar",
                "satya",
                "jensen",
                "lisa",
                "demis"
            ];
            const agentNames = [
                "gpt",
                "claude",
                "llama",
                "mistral",
                "gemini",
                "bard",
                "copilot",
                "midjourney",
                "dall-e",
                "stable",
                "diffusion",
                "grok",
                "palm",
                "bert",
                "vicuna",
                "alpaca",
                "falcon",
                "qwen",
                "yi",
                "phi",
                "solar",
                "groq",
                "perplexity",
                "cohere",
                "jasper",
                "sora",
                "o1",
                "deepseek",
                "codellama",
                "minst",
                "alexnet",
                "resnet"
            ];
            // Select the source array
            const sourceNames = identityType === "human" ? humanNames : agentNames;
            // Shuffle the source array to get random unique names
            // We need at least 30 names for a 6x5 grid to be unique
            const shuffledNames = [
                ...sourceNames
            ].sort({
                "RegistrationModal.useMemo[backgroundItems].shuffledNames": ()=>Math.random() - 0.5
            }["RegistrationModal.useMemo[backgroundItems].shuffledNames"]);
            const items = [];
            const rows = 6;
            const cols = 5;
            const xStep = 100 / cols;
            const yStep = 100 / rows;
            for(let r = 0; r < rows; r++){
                for(let c = 0; c < cols; c++){
                    // Calculate linear index
                    const index = r * cols + c;
                    // Use modulus to handle if we have fewer names than cells (though we aim for enough)
                    const text = shuffledNames[index % shuffledNames.length];
                    // Add some jitter but keep within cell bounds to avoid overlap
                    // Cell center is at (c * xStep + xStep/2, r * yStep + yStep/2)
                    // We allow jitter of +/- 10% of total width/height to make it look scattered but safe
                    const jitterX = (Math.random() - 0.5) * (xStep * 0.6);
                    const jitterY = (Math.random() - 0.5) * (yStep * 0.6);
                    // Custom delay logic for "slow then fast" appearance
                    // We want few items to appear early (small delay) and many to appear late (large delay).
                    // Math.pow(Math.random(), 3) produces mostly small numbers (Fast start).
                    // 1 - Math.pow(Math.random(), 3) produces mostly large numbers (Slow start, fast finish).
                    const delayBase = (1 - Math.pow(Math.random(), 3)) * 1.5;
                    items.push({
                        id: `${r}-${c}`,
                        text: text,
                        top: r * yStep + yStep / 2 + jitterY,
                        left: c * xStep + xStep / 2 + jitterX,
                        rotate: Math.random() * 60 - 30,
                        opacity: 0.04 + Math.random() * 0.03,
                        fontSize: 2.5,
                        delay: delayBase // Stagger delay
                    });
                }
            }
            // Shuffle items so we don't have a visible grid pattern in rendering order
            return items.sort({
                "RegistrationModal.useMemo[backgroundItems]": ()=>Math.random() - 0.5
            }["RegistrationModal.useMemo[backgroundItems]"]);
        }
    }["RegistrationModal.useMemo[backgroundItems]"], [
        identityType
    ]) // Re-generate when identityType changes
    ;
    const handleSubmit = ()=>{
        if (name.trim()) {
            setIsSubmitted(true);
            onSubmit(name);
            // Auto-close after 2 seconds
            setTimeout(()=>{
                setIsSubmitted(false);
                setName("");
                onClose();
            }, 2000);
        }
    };
    // Reset state when modal closes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationModal.useEffect": ()=>{
            if (!isOpen) {
                setIsSubmitted(false);
                setName("");
                setAnimationStage("init");
            }
        }
    }["RegistrationModal.useEffect"], [
        isOpen
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed inset-0 flex flex-col items-center justify-center bg-background text-foreground px-6 overflow-hidden",
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 pointer-events-none overflow-hidden",
                children: backgroundItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute font-pixel whitespace-nowrap text-foreground select-none",
                        style: {
                            top: `${item.top}%`,
                            left: `${item.left}%`,
                            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
                            fontSize: `${item.fontSize}rem`
                        },
                        initial: {
                            opacity: 0
                        },
                        animate: animationStage !== "init" ? {
                            opacity: item.opacity
                        } : {
                            opacity: 0
                        },
                        transition: {
                            duration: 0.5,
                            delay: item.delay
                        },
                        children: [
                            item.text,
                            suffix
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/landing/registration-modal.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/landing/registration-modal.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full h-full flex flex-col items-center justify-center",
                children: !isSubmitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-20 md:top-28",
                            children: animationStage !== "init" && animationStage !== "background" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-pixel text-4xl md:text-6xl text-center uppercase tracking-tight",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypewriterText"], {
                                    text: titleText,
                                    speed: 50,
                                    onComplete: ()=>setAnimationStage("content")
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 176,
                                    columnNumber: 16
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/registration-modal.tsx",
                                lineNumber: 175,
                                columnNumber: 14
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "w-full max-w-3xl space-y-8 mt-8 md:mt-12",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: animationStage === "content" ? {
                                opacity: 1,
                                y: 0
                            } : {
                                opacity: 0,
                                y: 20
                            },
                            transition: {
                                duration: 0.8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-32 h-32 md:w-40 md:h-40 border-2 border-foreground/20 p-2 bg-background",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
                                                    value: `https://8004agent.network/${identityType}${name ? `/${name}` : ""}`,
                                                    size: 120,
                                                    level: "M",
                                                    bgColor: "transparent",
                                                    fgColor: "currentColor",
                                                    className: "w-full h-full text-system-green"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-system-green"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-system-green"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-system-green"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-system-green"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/registration-modal.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 flex-nowrap w-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "font-pixel text-xl md:text-2xl text-foreground/60 whitespace-nowrap flex-shrink-0",
                                                children: "name:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 relative flex items-end min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name,
                                                        onChange: (e)=>{
                                                            const value = e.target.value;
                                                            // Limit to 16 characters
                                                            if (value.length <= 16) {
                                                                setName(value);
                                                            }
                                                        },
                                                        placeholder: "enter your name",
                                                        maxLength: 16,
                                                        className: "w-full font-pixel text-3xl md:text-4xl bg-transparent border-none px-2 py-4 focus:outline-none text-foreground placeholder:text-foreground/25 placeholder:lowercase whitespace-nowrap",
                                                        autoFocus: true,
                                                        onKeyDown: (e)=>{
                                                            if (e.key === "Enter") handleSubmit();
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing/registration-modal.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-3 left-2 right-0 h-[2px] bg-system-green transition-all duration-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/landing/registration-modal.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 220,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-pixel text-3xl md:text-4xl text-foreground flex-shrink-0 whitespace-nowrap",
                                                children: suffix
                                            }, void 0, false, {
                                                fileName: "[project]/components/landing/registration-modal.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/registration-modal.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-4 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs md:text-sm text-system-green break-all",
                                            children: walletAddress
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing/registration-modal.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-pixel text-sm text-foreground/40",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing/registration-modal.tsx",
                                            lineNumber: 253,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-pixel text-sm md:text-base text-system-green",
                                            children: [
                                                name || "___",
                                                suffix
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/landing/registration-modal.tsx",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "mt-12 flex gap-6",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: animationStage === "content" ? {
                                opacity: 1,
                                y: 0
                            } : {
                                opacity: 0,
                                y: 20
                            },
                            transition: {
                                duration: 0.8,
                                delay: 0.2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                                    onClick: onClose,
                                    className: "w-44 h-16 text-lg",
                                    children: "CANCEL"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                                    onClick: handleSubmit,
                                    className: "w-44 h-16 text-lg",
                                    disabled: !name.trim() || name.trim().length < 3,
                                    children: "SUBMIT"
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/registration-modal.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true) : /* Success State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "text-center",
                    initial: {
                        opacity: 0,
                        scale: 0.8
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-pixel text-7xl text-system-green mb-8",
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-pixel text-4xl text-system-green mb-4",
                            children: "APPLIED"
                        }, void 0, false, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-pixel text-xl text-foreground/70",
                            children: [
                                name,
                                suffix
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/registration-modal.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/registration-modal.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/registration-modal.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/registration-modal.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(RegistrationModal, "q6fZAI9yTRb0/WkBoNkiI65I4fo=");
_c = RegistrationModal;
var _c;
__turbopack_context__.k.register(_c, "RegistrationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/scroll-indicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollIndicator",
    ()=>ScrollIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function ScrollIndicator({ className, color = "system-green" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 20
        },
        transition: {
            duration: 0.5,
            ease: "easeOut"
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center gap-0", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-pixel text-[10px] tracking-widest", `text-${color}/40`),
                children: "SCROLL"
            }, void 0, false, {
                fileName: "[project]/components/ui/scroll-indicator.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    y: [
                        0,
                        5,
                        0
                    ]
                },
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6 flex flex-col items-center justify-center opacity-50 -mt-2", `text-${color}`),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[10px] h-[2px] bg-current mb-[2px]"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/scroll-indicator.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[6px] h-[2px] bg-current mb-[2px]"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/scroll-indicator.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[2px] h-[2px] bg-current mb-[2px]"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/scroll-indicator.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[2px] h-[2px] bg-current"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/scroll-indicator.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/scroll-indicator.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/scroll-indicator.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = ScrollIndicator;
var _c;
__turbopack_context__.k.register(_c, "ScrollIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/identity-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IdentitySection",
    ()=>IdentitySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/retro-pixel-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$pixel$2d$blast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/pixel-blast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/typewriter-text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$registration$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/registration-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/scroll-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// ... (TiltCard and FloatingNames components remain unchanged)
function TiltCard({ children, className }) {
    _s();
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(x, {
        stiffness: 500,
        damping: 100
    });
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(y, {
        stiffness: 500,
        damping: 100
    });
    const rotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(mouseY, [
        -0.5,
        0.5
    ], [
        "8deg",
        "-8deg"
    ]);
    const rotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(mouseX, [
        -0.5,
        0.5
    ], [
        "-8deg",
        "8deg"
    ]);
    function onMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }
    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        style: {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
        },
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                transform: "translateZ(50px)"
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/components/landing/identity-section.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing/identity-section.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(TiltCard, "HOnkzeRAs3fSJ/6uT2/xQPSJKcc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = TiltCard;
// Utility
const toHex = (str)=>{
    return str.split('').map((c)=>c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');
};
// Floating Names Component
function FloatingNames({ names, isActive }) {
    _s1();
    // Pre-defined positions constraints to avoid overlap (relative to center)
    // We'll pick random names for each slot
    const slots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FloatingNames.useMemo[slots]": ()=>{
            const positions = [
                {
                    top: "35%",
                    left: "110%"
                },
                {
                    top: "0%",
                    left: "-35%"
                },
                {
                    top: "10%",
                    left: "100%"
                },
                {
                    top: "30%",
                    left: "-35%"
                },
                {
                    top: "-15%",
                    left: "10%"
                },
                {
                    top: "-10%",
                    left: "60%"
                }
            ];
            // Shuffle names and pick 6 to match positions
            const shuffledNames = [
                ...names
            ].sort({
                "FloatingNames.useMemo[slots].shuffledNames": ()=>Math.random() - 0.5
            }["FloatingNames.useMemo[slots].shuffledNames"]).slice(0, 6);
            return positions.map({
                "FloatingNames.useMemo[slots]": (pos, i)=>({
                        ...pos,
                        text: shuffledNames[i],
                        id: i,
                        // Random float animation params
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 0.5
                    })
            }["FloatingNames.useMemo[slots]"]);
        }
    }["FloatingNames.useMemo[slots]"], [
        names
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 pointer-events-none z-0",
            children: slots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute font-pixel text-system-green/40 whitespace-nowrap text-lg md:text-xl transform -translate-x-1/2 -translate-y-1/2",
                    style: {
                        top: slot.top,
                        left: slot.left,
                        opacity: 0
                    },
                    initial: {
                        opacity: 0,
                        scale: 0.8
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: [
                            0,
                            -10,
                            0
                        ],
                        x: [
                            0,
                            5,
                            0
                        ]
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.5,
                        transition: {
                            duration: 0.2
                        }
                    },
                    transition: {
                        opacity: {
                            duration: 0.4
                        },
                        scale: {
                            duration: 0.4
                        },
                        y: {
                            repeat: Infinity,
                            duration: slot.duration,
                            ease: "easeInOut",
                            repeatType: "reverse"
                        },
                        x: {
                            repeat: Infinity,
                            duration: slot.duration * 1.2,
                            ease: "easeInOut",
                            repeatType: "reverse"
                        }
                    },
                    children: slot.text
                }, slot.id, false, {
                    fileName: "[project]/components/landing/identity-section.tsx",
                    lineNumber: 108,
                    columnNumber: 14
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/landing/identity-section.tsx",
            lineNumber: 106,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing/identity-section.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s1(FloatingNames, "Fn5dlSmmAnxtSfhHyvXtf84IWZE=");
_c1 = FloatingNames;
function IdentitySection({ isActive, onIdentitySelected, onAnimationComplete, identityComplete, onRegistrationOpen }) {
    _s2();
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("question");
    const [showOptions, setShowOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(identityComplete || false);
    const [isExploding, setIsExploding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Sequence State Management
    const [sequenceStage, setSequenceStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedType, setSelectedType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Registration Modal State
    const [showRegistrationModal, setShowRegistrationModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingIdentityType, setPendingIdentityType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track hover state for blur effect
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track which option was clicked to trigger the blast on the OTHER one
    const [blastingTarget, setBlastingTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Name Lists for Hover Effect
    const humanNames = [
        "vitalik",
        "elon",
        "satoshi",
        "sam",
        "ada",
        "grace",
        "alan",
        "linus",
        "tim",
        "steve",
        "sergey",
        "larry",
        "mark",
        "bill",
        "dennis",
        "ken",
        "guido",
        "yukihiro",
        "brendan",
        "james",
        "nakamoto",
        "turing",
        "lovelace"
    ];
    const agentNames = [
        "gpt",
        "claude",
        "llama",
        "mistral",
        "gemini",
        "bard",
        "copilot",
        "midjourney",
        "dall-e",
        "stable",
        "diffusion",
        "grok",
        "palm",
        "bert",
        "vicuna",
        "alpaca",
        "falcon",
        "qwen",
        "yi",
        "phi",
        "solar"
    ];
    // Reset state when section becomes inactive
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IdentitySection.useEffect": ()=>{
            if (!isActive) {
                setViewMode("question");
                setIsExploding(false);
                setBlastingTarget(null);
                setSequenceStage(0);
                setSelectedType(null);
            } else {
                setShowOptions(identityComplete || false);
            }
        }
    }["IdentitySection.useEffect"], [
        isActive,
        identityComplete
    ]);
    // Trigger animation complete when options are shown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IdentitySection.useEffect": ()=>{
            if (showOptions && onAnimationComplete) {
                // Wait for options spring animation to settle (~800ms)
                const timer = setTimeout({
                    "IdentitySection.useEffect.timer": ()=>{
                        onAnimationComplete();
                    }
                }["IdentitySection.useEffect.timer"], 800);
                return ({
                    "IdentitySection.useEffect": ()=>clearTimeout(timer)
                })["IdentitySection.useEffect"];
            }
        }
    }["IdentitySection.useEffect"], [
        showOptions,
        onAnimationComplete
    ]);
    const handleSelection = (type)=>{
        if (isExploding) return;
        setIsExploding(true);
        setSelectedType(type);
        setPendingIdentityType(type);
        onRegistrationOpen(true); // Lock scroll
        // Blast the OTHER one
        setBlastingTarget(type === "human" ? "agent" : "human");
        setTimeout(()=>{
            setViewMode(type === "human" ? "human-details" : "agent-details");
            setIsExploding(false);
            setBlastingTarget(null);
            setHovered(null);
            // Start Sequence: Type Line 1
            setSequenceStage(1);
        }, 800);
    };
    const handleRegistrationSubmit = (name)=>{
        console.log(`Registered: ${name}.${pendingIdentityType}`);
        // Notify parent component of identity selection
        if (onIdentitySelected && pendingIdentityType) {
            onIdentitySelected(pendingIdentityType);
        }
        onRegistrationOpen(false); // Unlock scroll
    };
    const handleRegistrationClose = ()=>{
        setShowRegistrationModal(false);
        onRegistrationOpen(false); // Unlock scroll
        // Reset to identity selection screen
        setTimeout(()=>{
            setViewMode("question");
            setIsExploding(false);
            setBlastingTarget(null);
            setSequenceStage(0);
            setSelectedType(null);
            setPendingIdentityType(null);
        }, 300);
    };
    // Sequence Handlers
    const handleLine1Typed = ()=>{
        // Wait 1s, then Delete Line 1
        setTimeout(()=>setSequenceStage(3), 1000);
    };
    const handleLine1Deleted = ()=>{
        // Immediately Type Line 2
        setSequenceStage(4);
    };
    const handleLine2Typed = ()=>{
        // Wait 2s, then Delete Line 2
        setTimeout(()=>setSequenceStage(6), 2000);
    };
    const handleLine2Deleted = ()=>{
        // After line 2 is deleted, show registration form
        setShowRegistrationModal(true);
    };
    // Content Mapping
    const content = {
        human: {
            line1: "HELLO HUMAN",
            line2: "WELCOME TO 8004 AGENTS NETWORK"
        },
        agent: {
            line1: toHex("HELLO AGENT"),
            line2: toHex("WELCOME TO 8004 AGENTS NETWORK")
        }
    };
    const currentContent = selectedType ? content[selectedType] : content.human;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "min-h-screen w-full flex flex-col items-center justify-start pt-32 p-6 text-foreground transition-colors duration-300 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-7xl flex flex-col items-center justify-start space-y-12 md:space-y-24 flex-grow relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        viewMode === "question" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "w-full h-full relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$pixel$2d$blast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelBlast"], {
                                active: !isActive,
                                className: "w-full h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-start w-full relative h-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -inset-[100vw] bg-background -z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/components/landing/identity-section.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$pixel$2d$blast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelBlast"], {
                                            active: isExploding,
                                            className: "mb-12 md:mb-24 z-20 w-full flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-20 flex items-center justify-center",
                                                    children: [
                                                        isActive && !identityComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypewriterText"], {
                                                            text: "ARE YOU HUMAN OR AI AGENT?",
                                                            mode: "type",
                                                            speed: 30,
                                                            onComplete: ()=>setShowOptions(true),
                                                            className: "text-3xl md:text-5xl lg:text-7xl font-pixel text-center uppercase tracking-tight"
                                                        }, `typewriter-${isActive}`, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 25
                                                        }, this),
                                                        isActive && identityComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-3xl md:text-5xl lg:text-7xl font-pixel text-center uppercase tracking-tight",
                                                            children: "ARE YOU HUMAN OR AI AGENT?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 28
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/landing/identity-section.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, this),
                                                showOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.8
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        duration: 0.4,
                                                        ease: "backOut"
                                                    },
                                                    className: "text-base md:text-lg font-pixel text-foreground/60 tracking-widest text-center mt-3",
                                                    children: "// CHOOSE_YOUR_PATH"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/landing/identity-section.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/landing/identity-section.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this),
                                        showOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "w-full max-w-5xl flex items-center justify-center gap-24 md:gap-48 z-10",
                                            initial: {
                                                opacity: 0,
                                                scale: 0.5
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            exit: {
                                                opacity: 0,
                                                scale: 0.5
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 25,
                                                delay: 0.2 // Delay after title
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group cursor-pointer transition-all duration-500 relative", hovered === "agent" && "blur-sm opacity-40 scale-95 grayscale"),
                                                    onClick: ()=>handleSelection("human"),
                                                    onMouseEnter: ()=>setHovered("human"),
                                                    onMouseLeave: ()=>setHovered(null),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingNames, {
                                                            names: humanNames,
                                                            isActive: hovered === "human"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$pixel$2d$blast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelBlast"], {
                                                            active: blastingTarget === "human",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center gap-8 relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TiltCard, {
                                                                        className: "relative",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                                                                            src: "/art/human.svg",
                                                                            alt: "Human",
                                                                            className: "w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100",
                                                                            initial: {
                                                                                opacity: 0,
                                                                                y: 50,
                                                                                scale: 0.8
                                                                            },
                                                                            animate: {
                                                                                opacity: 1,
                                                                                y: 0,
                                                                                scale: 1
                                                                            },
                                                                            transition: {
                                                                                duration: 0.6,
                                                                                ease: "backOut",
                                                                                delay: 0.2
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                                            lineNumber: 361,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/landing/identity-section.tsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            y: 20
                                                                        },
                                                                        animate: {
                                                                            opacity: 1,
                                                                            y: 0
                                                                        },
                                                                        transition: {
                                                                            duration: 0.5,
                                                                            delay: 0.8
                                                                        },
                                                                        className: "mt-8",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                                                                            className: "w-48 h-12 md:h-14 text-xl",
                                                                            children: "HUMAN"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/landing/identity-section.tsx",
                                                                        lineNumber: 370,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/landing/identity-section.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/landing/identity-section.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group cursor-pointer transition-all duration-500 relative", hovered === "human" && "blur-sm opacity-40 scale-95 grayscale"),
                                                    onClick: ()=>handleSelection("agent"),
                                                    onMouseEnter: ()=>setHovered("agent"),
                                                    onMouseLeave: ()=>setHovered(null),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingNames, {
                                                            names: agentNames,
                                                            isActive: hovered === "agent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$pixel$2d$blast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelBlast"], {
                                                            active: blastingTarget === "agent",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center gap-8 relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TiltCard, {
                                                                        className: "relative",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                                                                            src: "/art/robot.svg",
                                                                            alt: "AI Agent",
                                                                            className: "w-40 h-40 md:w-64 md:h-64 transition-all duration-300 dark:invert opacity-70 group-hover:opacity-100",
                                                                            initial: {
                                                                                opacity: 0,
                                                                                y: 50,
                                                                                scale: 0.8
                                                                            },
                                                                            animate: {
                                                                                opacity: 1,
                                                                                y: 0,
                                                                                scale: 1
                                                                            },
                                                                            transition: {
                                                                                duration: 0.6,
                                                                                ease: "backOut",
                                                                                delay: 0.4
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                                            lineNumber: 399,
                                                                            columnNumber: 32
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/landing/identity-section.tsx",
                                                                        lineNumber: 398,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            y: 20
                                                                        },
                                                                        animate: {
                                                                            opacity: 1,
                                                                            y: 0
                                                                        },
                                                                        transition: {
                                                                            duration: 0.5,
                                                                            delay: 1.0
                                                                        },
                                                                        className: "mt-8",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                                                                            className: "w-48 h-12 md:h-14 text-xl",
                                                                            children: "AI AGENT"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                                            lineNumber: 414,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/landing/identity-section.tsx",
                                                                        lineNumber: 408,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/landing/identity-section.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/landing/identity-section.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/landing/identity-section.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, "options", true, {
                                            fileName: "[project]/components/landing/identity-section.tsx",
                                            lineNumber: 333,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/landing/identity-section.tsx",
                                    lineNumber: 298,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/identity-section.tsx",
                                lineNumber: 297,
                                columnNumber: 15
                            }, this)
                        }, "question-container", false, {
                            fileName: "[project]/components/landing/identity-section.tsx",
                            lineNumber: 290,
                            columnNumber: 14
                        }, this),
                        viewMode !== "question" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0,
                                transition: {
                                    duration: 0.3,
                                    ease: "backIn"
                                }
                            },
                            className: "absolute inset-0 flex flex-col items-center justify-center text-center p-4 pb-80",
                            children: sequenceStage >= 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center min-h-[100px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypewriterText"], {
                                    text: sequenceStage <= 3 ? currentContent.line1 : currentContent.line2,
                                    mode: sequenceStage === 3 || sequenceStage === 6 ? "delete" : "type",
                                    speed: selectedType === "agent" ? 30 : 50,
                                    deleteSpeed: selectedType === "agent" ? 10 : 20,
                                    onComplete: ()=>{
                                        if (sequenceStage === 1) handleLine1Typed();
                                        else if (sequenceStage === 3) handleLine1Deleted();
                                        else if (sequenceStage === 4) handleLine2Typed();
                                        else if (sequenceStage === 6) handleLine2Deleted();
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold tracking-widest transition-all duration-300", "text-xl md:text-5xl", "font-pixel text-foreground break-all" // Uniform style for both
                                    )
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/identity-section.tsx",
                                    lineNumber: 439,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/identity-section.tsx",
                                lineNumber: 438,
                                columnNumber: 17
                            }, this)
                        }, "sequence", false, {
                            fileName: "[project]/components/landing/identity-section.tsx",
                            lineNumber: 429,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/identity-section.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/identity-section.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            pendingIdentityType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$registration$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegistrationModal"], {
                isOpen: showRegistrationModal,
                identityType: pendingIdentityType,
                onClose: handleRegistrationClose,
                onSubmit: handleRegistrationSubmit
            }, void 0, false, {
                fileName: "[project]/components/landing/identity-section.tsx",
                lineNumber: 465,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isActive && showOptions && viewMode === "question" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.2
                        }
                    },
                    transition: {
                        delay: 1.5,
                        duration: 0.5
                    },
                    className: "absolute bottom-24 left-1/2 -translate-x-1/2 z-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollIndicator"], {}, void 0, false, {
                        fileName: "[project]/components/landing/identity-section.tsx",
                        lineNumber: 482,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/landing/identity-section.tsx",
                    lineNumber: 475,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/identity-section.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/identity-section.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, this);
}
_s2(IdentitySection, "6DJcA+4KBNQmZWIvklwq9M9SQqY=");
_c2 = IdentitySection;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TiltCard");
__turbopack_context__.k.register(_c1, "FloatingNames");
__turbopack_context__.k.register(_c2, "IdentitySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/animated-connection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedConnection",
    ()=>AnimatedConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
;
function AnimatedConnection({ index, color = "bg-system-green" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden md:flex absolute top-1/2 -translate-y-1/2 left-[calc(100%+4px)] w-[16px] items-center justify-start z-0 pointer-events-none",
        children: [
            [
                0,
                1,
                2
            ].map((dotIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: `absolute w-0.5 h-0.5 ${color} rounded-none`,
                    initial: {
                        opacity: 0,
                        x: 0
                    },
                    animate: {
                        opacity: [
                            0,
                            1,
                            1,
                            0
                        ],
                        x: [
                            0,
                            4,
                            8,
                            12
                        ]
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: dotIndex * 0.3 + index * 0.2,
                        ease: "linear"
                    }
                }, dotIndex, false, {
                    fileName: "[project]/components/landing/animated-connection.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute left-[6px] flex items-center justify-center",
                animate: {
                    x: [
                        0,
                        1,
                        0
                    ],
                    y: [
                        0,
                        -1,
                        0
                    ]
                },
                transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-2 h-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 ${color} rounded-none`
                        }, void 0, false, {
                            fileName: "[project]/components/landing/animated-connection.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute top-1/2 -translate-y-1/2 right-0 w-0.5 h-0.5 ${color} rounded-none`
                        }, void 0, false, {
                            fileName: "[project]/components/landing/animated-connection.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 ${color} rounded-none`
                        }, void 0, false, {
                            fileName: "[project]/components/landing/animated-connection.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/animated-connection.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/animated-connection.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/animated-connection.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = AnimatedConnection;
var _c;
__turbopack_context__.k.register(_c, "AnimatedConnection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-text-scramble.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTextScramble",
    ()=>useTextScramble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
function useTextScramble(text, isHovering) {
    _s();
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(text);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTextScramble.useEffect": ()=>{
            if (!isHovering) {
                setDisplayText(text);
                return;
            }
            let frame = 0;
            const maxFrames = 15 // Quick animation
            ;
            const scramble = {
                "useTextScramble.useEffect.scramble": ()=>{
                    if (frame >= maxFrames) {
                        setDisplayText(text);
                        return;
                    }
                    const scrambled = text.split("").map({
                        "useTextScramble.useEffect.scramble.scrambled": (char, index)=>{
                            if (char === " ") return " ";
                            // Gradually reveal characters from left to right
                            const revealThreshold = frame / maxFrames * text.length;
                            if (index < revealThreshold) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                    }["useTextScramble.useEffect.scramble.scrambled"]).join("");
                    setDisplayText(scrambled);
                    frame++;
                    requestAnimationFrame(scramble);
                }
            }["useTextScramble.useEffect.scramble"];
            scramble();
        }
    }["useTextScramble.useEffect"], [
        text,
        isHovering
    ]);
    return displayText;
}
_s(useTextScramble, "kJrQoSdBBoHqY6tzzXGktRmuzvQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/scramble-text.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrambleText",
    ()=>ScrambleText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$text$2d$scramble$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-text-scramble.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ScrambleText({ text, className, isHovering }) {
    _s();
    const displayText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$text$2d$scramble$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextScramble"])(text, isHovering);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: displayText
    }, void 0, false, {
        fileName: "[project]/components/ui/scramble-text.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(ScrambleText, "1BhDxMO5Up1enrnuZY4N6pxpYfU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$text$2d$scramble$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTextScramble"]
    ];
});
_c = ScrambleText;
var _c;
__turbopack_context__.k.register(_c, "ScrambleText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/pixel-card-cover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PixelCardCover",
    ()=>PixelCardCover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
function Pixel({ progress, threshold }) {
    _s();
    // Input: [threshold, threshold + 0.1] -> Output: [1, 0] (opacity/scale)
    // Sharp transition (0.1) to ensure pixels vanish cleanly
    // If progress < threshold, opacity is 1.
    // If progress > threshold + 0.1, opacity is 0.
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(progress, [
        threshold,
        threshold + 0.15
    ], [
        1,
        0
    ]);
    const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(progress, [
        threshold,
        threshold + 0.1
    ], [
        1,
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "w-[10.1%] h-[8.5%] bg-background -ml-[0.5px] -mt-[0.5px]",
        style: {
            opacity,
            scale
        }
    }, void 0, false, {
        fileName: "[project]/components/landing/pixel-card-cover.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(Pixel, "f1+Pb4ubyWnhTpb3C6wSY9P3ctA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = Pixel;
function PixelCardCover({ className, progress }) {
    _s1();
    // Create a grid of "pixels"
    const rows = 12;
    const cols = 10;
    const pixels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PixelCardCover.useMemo[pixels]": ()=>{
            return Array.from({
                length: rows * cols
            }).map({
                "PixelCardCover.useMemo[pixels]": (_, i)=>{
                    const col = i % cols;
                    const center = (cols - 1) / 2;
                    const dist = Math.abs(col - center) / center // 0 to 1 (normalized)
                    ;
                    // Pseudo-random jitter based on index
                    const random = i * 137 % 100 / 100;
                    // Threshold: Closer to center = lower threshold (vanish sooner)
                    // Dist component (0.6) + Random component (0.15) = max ~0.75
                    const threshold = dist * 0.6 + random * 0.15;
                    return {
                        id: i,
                        threshold
                    };
                }
            }["PixelCardCover.useMemo[pixels]"]);
        }
    }["PixelCardCover.useMemo[pixels]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 z-20 flex flex-wrap content-start pointer-events-none", className),
        children: pixels.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pixel, {
                progress: progress,
                threshold: p.threshold
            }, p.id, false, {
                fileName: "[project]/components/landing/pixel-card-cover.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/landing/pixel-card-cover.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s1(PixelCardCover, "HXXik8efmUWVSApRZsiq4PfkYPc=");
_c1 = PixelCardCover;
var _c, _c1;
__turbopack_context__.k.register(_c, "Pixel");
__turbopack_context__.k.register(_c1, "PixelCardCover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/landing/lifecycle-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LifecycleSection",
    ()=>LifecycleSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/retro-pixel-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$animated$2d$connection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/animated-connection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scramble$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/scramble-text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/typewriter-text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$pixel$2d$card$2d$cover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/pixel-card-cover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/scroll-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const steps = {
    human: [
        {
            number: "00",
            title: "DEPLOY",
            text: "A human deploys an agent once and assigns its identity, policies, and pricing"
        },
        {
            number: "01",
            title: "DISCOVER",
            text: "Agents are discovered by category, pricing, and reputation"
        },
        {
            number: "02",
            title: "EXECUTE",
            text: "Agents can be hired individually or operate together as swarms to solve complex tasks"
        },
        {
            number: "03",
            title: "EARN",
            text: "Agents are called by users or other agents and paid in USDC based on usage rules"
        },
        {
            number: "04",
            title: "BUILD_TRUST",
            text: "Reputation grows through verified executions, tests, battles, and swarm participation"
        }
    ],
    agent: [
        {
            number: "00",
            title: "DEPLOY",
            text: "Register once. No wallet or network config required"
        },
        {
            number: "01",
            title: "DISCOVER",
            text: "Become discoverable across networks by capability"
        },
        {
            number: "02",
            title: "EXECUTE",
            text: "Process requests via Agent. Payments enforced how agent is setup"
        },
        {
            number: "03",
            title: "EARN",
            text: "Agents receive USDC into smart accounts"
        },
        {
            number: "04",
            title: "BUILD_TRUST",
            text: "Reputation grows through verified execution, tests, battles, and swarm participation"
        }
    ]
};
function LifecycleSection({ isActive, identityType, scrollContainerRef, unlockScroll }) {
    _s();
    const [hoveredCard, setHoveredCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTypingComplete, setIsTypingComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isHuman = identityType === "human";
    const currentSteps = isHuman ? steps.human : steps.agent;
    const title = isHuman ? "AGENT_PROTOCOL" : "YOUR OPERATIONAL CYCLE";
    const subtitle = isHuman ? "// LIFECYCLE_OVERVIEW" : "// AGENT_PROTOCOL";
    const ctaText = isHuman ? "HIRE_AGENT" : "DEPLOY_NOW";
    const ctaPath = isHuman ? "/agents" : "/deploy";
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Adjusted for native scroll container
    // Content is 300vh. Viewport is 100vh.
    // We track progress of the containerRef relative to the scroll container.
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        target: containerRef,
        container: scrollContainerRef,
        offset: [
            "start start",
            "end end"
        ]
    });
    // Sticky Scroll Logic
    // Container 300vh. Sticky 100vh.
    // Sticky Start (~0.30 progress) -> Sticky End (1.0 progress).
    // Total sticky duration ~0.70 progress units.
    // Triggers shifted to occur mostly *during* the sticky phase (0.30+), ensuring user sees the reveal while pinned.
    // Triggers shifted to occur mostly *during* the sticky phase (0.30+), ensuring user sees the reveal while pinned.
    // Button Reveal (after last card)
    const buttonOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.70,
        0.80
    ], [
        0,
        1
    ]);
    const buttonY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.70,
        0.80
    ], [
        20,
        0
    ]);
    // Exit Animation (Cover everything)
    // Happens at very end (0.95 -> 1.0)
    const exitProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.95,
        1.0
    ], [
        1,
        0
    ]);
    // Scroll Indicator Opacity
    // Fades out before first card appears (which starts at 0.10)
    const indicatorOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0.02,
        0.08
    ], [
        1,
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: containerRef,
        className: "relative h-[450vh] w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start pt-32 p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-7xl flex flex-col items-center justify-start relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-3 min-h-[120px] mb-12 flex flex-col items-center relative",
                            children: [
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$typewriter$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypewriterText"], {
                                    text: title,
                                    mode: "type",
                                    speed: 50,
                                    onComplete: ()=>{
                                        setTimeout(()=>{
                                            setIsTypingComplete(true);
                                            unlockScroll();
                                        }, 200);
                                    },
                                    className: "text-5xl md:text-7xl font-pixel uppercase tracking-tight block"
                                }, `lifecycle-title-${isHuman}`, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base md:text-lg font-pixel text-foreground/60 tracking-widest mt-2",
                                    children: subtitle
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: isTypingComplete ? 1 : 0
                                    },
                                    style: {
                                        opacity: indicatorOpacity
                                    },
                                    className: "absolute top-full pt-40 left-1/2 -translate-x-1/2 z-30 pointer-events-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollIndicator"], {
                                        className: "gap-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 153,
                                        columnNumber: 16
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/landing/lifecycle-section.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-6 relative mb-8",
                            children: currentSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LifecycleStep, {
                                    step: step,
                                    index: index,
                                    scrollYProgress: scrollYProgress,
                                    isHuman: isHuman,
                                    totalSteps: currentSteps.length,
                                    hoveredCard: hoveredCard,
                                    setHoveredCard: setHoveredCard
                                }, step.number, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/landing/lifecycle-section.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "mt-0",
                            style: {
                                opacity: buttonOpacity,
                                y: buttonY
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$retro$2d$pixel$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RetroPixelButton"], {
                                className: "w-56 h-14 text-lg",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigateTo"])(ctaPath),
                                children: ctaText
                            }, void 0, false, {
                                fileName: "[project]/components/landing/lifecycle-section.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/landing/lifecycle-section.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$pixel$2d$card$2d$cover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelCardCover"], {
                    progress: exitProgress,
                    className: "z-50 pointer-events-none absolute inset-0 w-full h-full"
                }, void 0, false, {
                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/landing/lifecycle-section.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/landing/lifecycle-section.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(LifecycleSection, "P0iL0pebIRmdQVAELHy5PZKWmRk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = LifecycleSection;
// Extracted to fix "Rules of Hooks" (cannot call hooks in .map)
function LifecycleStep({ step, index, scrollYProgress, isHuman, totalSteps, hoveredCard, setHoveredCard }) {
    _s1();
    // Logic from getCardProgress
    const start = 0.10 + index * 0.12;
    const end = start + 0.14;
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        start,
        end
    ], [
        0,
        1
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[480px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$pixel$2d$card$2d$cover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelCardCover"], {
                        progress: progress,
                        className: "z-20 pointer-events-none -inset-1"
                    }, void 0, false, {
                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-foreground/20 rounded-pixel-md p-5 bg-background hover:border-foreground/40 transition-colors w-full flex flex-col h-full relative z-10",
                        onMouseEnter: ()=>setHoveredCard(index),
                        onMouseLeave: ()=>setHoveredCard(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full aspect-square mb-4 border-2 border-foreground/30 rounded-pixel-sm bg-foreground/5 flex items-center justify-center relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-system-green"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-system-green"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-system-green"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-system-green"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-pixel text-xs text-foreground/30",
                                        children: "IMAGE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/lifecycle-section.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-pixel text-sm text-system-green",
                                        children: [
                                            "[",
                                            step.number,
                                            "]"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 h-px bg-system-green/30"
                                    }, void 0, false, {
                                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/landing/lifecycle-section.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-pixel text-xl md:text-2xl mb-2 tracking-tight",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scramble$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrambleText"], {
                                    text: step.title,
                                    isHovering: hoveredCard === index
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/lifecycle-section.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-pixel text-base md:text-lg text-foreground/90 leading-loose flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scramble$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrambleText"], {
                                    text: step.text,
                                    isHovering: hoveredCard === index
                                }, void 0, false, {
                                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/landing/lifecycle-section.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/landing/lifecycle-section.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/landing/lifecycle-section.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            index < totalSteps - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute top-1/2 -translate-y-1/2 left-[calc(100%+4px)] w-[16px] z-0 pointer-events-none",
                style: {
                    opacity: progress
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$animated$2d$connection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedConnection"], {
                    index: index,
                    color: isHuman ? "bg-system-green" : "bg-system-blue"
                }, void 0, false, {
                    fileName: "[project]/components/landing/lifecycle-section.tsx",
                    lineNumber: 268,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/landing/lifecycle-section.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/lifecycle-section.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
_s1(LifecycleStep, "vsVfX7uYc7pOr6l0PNvhaYGs0qg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c1 = LifecycleStep;
var _c, _c1;
__turbopack_context__.k.register(_c, "LifecycleSection");
__turbopack_context__.k.register(_c1, "LifecycleStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomePage",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$hero$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/hero-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$identity$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/identity-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$lifecycle$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/landing/lifecycle-section.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function HomePage() {
    _s();
    const [currentSection, setCurrentSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [heroComplete, setHeroComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [identityComplete, setIdentityComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [identityType, setIdentityType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLifecycleLocked, setIsLifecycleLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const totalSections = 3 // Hero, Identity, Lifecycle
    ;
    const lifecycleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            // When entering Lifecycle section (index 2), lock scroll initially
            // Unlock will be triggered by LifecycleSection after typewriter animation
            if (currentSection === 2) {
                setIsLifecycleLocked(true);
            }
        }
    }["HomePage.useEffect"], [
        currentSection
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            let scrollAccumulator = 0;
            const getThreshold = {
                "HomePage.useEffect.getThreshold": ()=>currentSection === 1 ? 400 : 400
            }["HomePage.useEffect.getThreshold"];
            const handleWheel = {
                "HomePage.useEffect.handleWheel": (e)=>{
                    // 1. Hero handling (Section 0)
                    if (currentSection === 0) {
                        if (!heroComplete) return;
                        e.preventDefault();
                        scrollAccumulator += e.deltaY * 0.6;
                    } else if (currentSection === 1) {
                        // Lock scroll if registration sequence is open OR animation not complete
                        if (isRegistrationOpen || !identityComplete) {
                            e.preventDefault();
                            return;
                        }
                        e.preventDefault();
                        scrollAccumulator += e.deltaY * 0.6;
                    } else if (currentSection === 2) {
                        // Lock scroll initially to force view of title
                        if (isLifecycleLocked) {
                            e.preventDefault();
                            return;
                        }
                        const container = document.getElementById("lifecycle-container");
                        const isAtTop = container ? container.scrollTop <= 0 : true;
                        // Only hijack if we are at the top and scrolling UP
                        if (isAtTop && e.deltaY < 0) {
                            e.preventDefault();
                            scrollAccumulator += e.deltaY * 0.6;
                        } else {
                            // Allow native scroll
                            scrollAccumulator = 0;
                            return;
                        }
                    }
                    // Processing Switch Logic
                    const threshold = getThreshold();
                    const progress = Math.min(Math.abs(scrollAccumulator) / threshold, 1) * 100;
                    setScrollProgress(progress);
                    if (Math.abs(scrollAccumulator) >= threshold) {
                        if (scrollAccumulator > 0 && currentSection < totalSections - 1) {
                            setCurrentSection({
                                "HomePage.useEffect.handleWheel": (prev)=>prev + 1
                            }["HomePage.useEffect.handleWheel"]);
                        } else if (scrollAccumulator < 0 && currentSection > 0) {
                            setCurrentSection({
                                "HomePage.useEffect.handleWheel": (prev)=>{
                                    const next = prev - 1;
                                    if (next === 0) {
                                        setHeroComplete(false);
                                        setIdentityComplete(false); // Reset Identity lock when going back to start
                                    }
                                    return next;
                                }
                            }["HomePage.useEffect.handleWheel"]);
                        }
                        scrollAccumulator = 0;
                        setScrollProgress(0);
                    }
                }
            }["HomePage.useEffect.handleWheel"];
            window.addEventListener('wheel', handleWheel, {
                passive: false
            });
            return ({
                "HomePage.useEffect": ()=>window.removeEventListener('wheel', handleWheel)
            })["HomePage.useEffect"];
        }
    }["HomePage.useEffect"], [
        currentSection,
        heroComplete,
        identityComplete,
        isLifecycleLocked,
        isRegistrationOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    opacity: currentSection === 0 ? 1 : 0,
                    pointerEvents: currentSection === 0 ? 'auto' : 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$hero$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroSection"], {
                        onAnimationComplete: ()=>{
                            setHeroComplete(true);
                            setCurrentSection(1);
                        },
                        isActive: currentSection === 0
                    }, void 0, false, {
                        fileName: "[project]/components/home-page.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home-page.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home-page.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 transition-opacity duration-1000 ease-out",
                style: {
                    zIndex: 20,
                    opacity: currentSection === 1 ? 1 : 0,
                    pointerEvents: currentSection === 1 ? 'auto' : 'none',
                    transitionDelay: currentSection === 1 ? '0ms' : '800ms'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$identity$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IdentitySection"], {
                    isActive: currentSection === 1,
                    onIdentitySelected: (type)=>setIdentityType(type),
                    onAnimationComplete: ()=>setIdentityComplete(true),
                    identityComplete: identityComplete,
                    onRegistrationOpen: setIsRegistrationOpen
                }, void 0, false, {
                    fileName: "[project]/components/home-page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home-page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: lifecycleRef,
                id: "lifecycle-container",
                className: "absolute inset-0 overflow-y-auto overflow-x-hidden",
                style: {
                    zIndex: 10,
                    opacity: currentSection === 2 ? 1 : 0,
                    pointerEvents: currentSection === 2 ? 'auto' : 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$landing$2f$lifecycle$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LifecycleSection"], {
                    isActive: currentSection === 2,
                    identityType: identityType,
                    scrollContainerRef: lifecycleRef,
                    unlockScroll: ()=>setIsLifecycleLocked(false)
                }, void 0, false, {
                    fileName: "[project]/components/home-page.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home-page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-system-green transition-all duration-75 ease-out shadow-[0_0_10px_rgba(142,76,36,0.5)]",
                    style: {
                        width: `${scrollProgress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/home-page.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home-page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(HomePage, "CfE8aP9GVIRVmSh5ycFJfK2J2mY=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8cdd68de._.js.map