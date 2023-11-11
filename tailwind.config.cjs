const {
    fontFamily
} = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
                "4xl": "1920px"
            },
        },
        extend: {
            colors: {
                // WTF 基础变量
                white: "var(--wtf-white)",
                black: "var(--wtf-black)",
                transparent: "var(--wtf-transparent)",
                brand: {
                    faint: "var(--wtf-brand-faint)",
                    muted: "var(--wtf-brand-muted)",
                    DEFAULT: "var(--wtf-brand)",
                    emphasis: "var(--wtf-brand-emphasis)",
                    inverted: "var(--wtf-brand-inverted)",
                    special: "var(--wtf-brand-special)"
                },
                background: {
                    faint: "var(--wtf-bg-faint)",
                    muted: "var(--wtf-bg-muted)",
                    subtle: "var(--wtf-bg-subtle)",
                    DEFAULT: "var(--wtf-bg)",
                    emphasis: "var(--wtf-bg-emphasis)",
                },
                border: {
                    muted: "var(--wtf-border-muted)",
                    DEFAULT: "var(--wtf-border)",
                },
                content: {
                    faint: "var(--wtf-content-faint)",
                    muted: "var(--wtf-content-muted)",
                    subtle: "var(--wtf-content-subtle)",
                    DEFAULT: "var(--wtf-content)",
                    emphasis: "var(--wtf-content-emphasis)",
                    strong: "var(--wtf-content-strong)",
                    inverted: "var(--wtf-content-inverted)",
                },
                success: {
                    muted: "var(--wtf-success-muted)",
                    subtle: "var(--wtf-success-subtle)",
                    DEFAULT: "var(--wtf-success)",
                    emphasis: "var(--wtf-success-emphasis)",
                },
                error: {
                    muted: "var(--wtf-error-muted)",
                    subtle: "var(--wtf-error-subtle)",
                    DEFAULT: "var(--wtf-error)",
                    emphasis: "var(--wtf-error-emphasis)",
                    inverted: "var(--wtf-error-inverted)",
                },
                warning: {
                    muted: "var(--wtf-warning-muted)",
                    subtle: "var(--wtf-warning-subtle)",
                    DEFAULT: "var(--wtf-warning)",
                    emphasis: "var(--wtf-warning-emphasis)",
                },
                // UI 变量
                // background: "var(--ui-background)",
                foreground: "var(--ui-background-foreground)",
                primary: {
                    DEFAULT: "var(--ui-primary)",
                    foreground: "var(--ui-primary-foreground)"
                },
                secondary: {
                    DEFAULT: "var(--ui-secondary)",
                    foreground: "var(--ui-secondary-foreground)"
                },
                input: "var(--ui-border-input)",
                ring: "var(--ui-ring)",
                destructive: {
                    DEFAULT: "var(--ui-destructive)",
                    foreground: "var(--ui-destructive-foreground)"
                },
                muted: {
                    DEFAULT: "var(--ui-muted)",
                    foreground: "var(--ui-muted-foreground)"
                },
                accent: {
                    DEFAULT: "var(--ui-accents)",
                    foreground: "var(--ui-accents-foreground)"
                },
                popover: {
                    DEFAULT: "var(--ui-popover)",
                    foreground: "var(--ui-popover-foreground)"
                },
                card: {
                    DEFAULT: "var(--ui-card)",
                    foreground: "var(--ui-card-foreground)"
                },
                switch: {
                    DEFAULT: "var(--ui-switch)",
                    foreground: "var(--ui-switch-foreground)"
                },
                other1: {
                    DEFAULT: "var(--ui-btn-other1)",
                    foreground: "var(--ui-btn-other1-foreground)",
                }
            },
            borderRadius: {
                lg: `var(--ui-radius)`,
                md: `calc(var(--ui-radius) - 2px)`,
                sm: "calc(var(--ui-radius) - 4px)"
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                ubuntu: ["Ubuntu", ...fontFamily.sans],
                press_start_2p: ["PressStart2P", ...fontFamily.sans]
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: 0
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)"
                    }
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)"
                    },
                    to: {
                        height: 0
                    }
                },
                "spin": {
                    from: {
                        transform: "rotate(0deg)"
                    },
                    to: {
                        transform: "rotate(360deg)"
                    }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin": "spin 2s linear infinite"
            },
            zIndex: {
                highest: '300',
                high: '200',
                medium: '100',
                low: '50',
                lowest: '10',
            },
            typography: ({
                theme
            }) => ({
                blue: {
                    css: {
                        '--tw-prose-body': "var(--wtf-content)",
                        '--tw-prose-pre-code': "var(--ifm-pre-color)",
                        '--tw-prose-pre-bg': "var(--ifm-pre-background)",
                    }
                }
            })
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        require('@tailwindcss/typography'),
    ]
};