const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            },
        },
        extend: {
            colors: {
                // WTF 基础变量
                gray: {
                    DEFAULT: "var(--wtf-gray)",
                    50: "var(--wtf-gray-50)",
                    100: "var(--wtf-gray-100)",
                    200: "var(--wtf-gray-200)",
                    300: "var(--wtf-gray-300)",
                    400: "var(--wtf-gray-400)",
                    500: "var(--wtf-gray-500)",
                    600: "var(--wtf-gray-600)",
                    700: "var(--wtf-gray-700)",
                    800: "var(--wtf-gray-800)",
                    900: "var(--wtf-gray-900)"
                },
                blue: {
                    DEFAULT: "var(--wtf-blue)",
                    50: "var(--wtf-blue-50)",
                    100: "var(--wtf-blue-100)",
                    200: "var(--wtf-blue-200)",
                    600: "var(--wtf-blue-600)",
                    700: "var(--wtf-blue-700)",
                    800: "var(--wtf-blue-800)"
                },
                // UI 变量
                background: "var(--ui-background)",
                foreground: "var(--ui-background-foreground)",
                primary: {
                    DEFAULT: "var(--ui-primary)",
                    dark: "var(--ui-primary-dark)",
                    darker: "var(--ui-primary-darker)",
                    darkest: "var(--ui-primary-darkest)",
                    light: "var(--ui-primary-light)",
                    lighter: "var(--ui-primary-lighter)",
                    lightest: "var(--ui-primary-lightest)",
                    foreground: "var(--ui-primary-foreground)"
                },
                secondary: {
                    DEFAULT: "var(--ui-secondary)",
                    foreground: "var(--ui-secondary-foreground)"
                },
                border: "var(--ui-border)",
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
                    DEFAULT: "var(--ui-accent)",
                    foreground: "var(--ui-accent-foreground)"
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
                }
            },
            borderRadius: {
                lg: `var(--ui-radius)`,
                md: `calc(var(--ui-radius) - 2px)`,
                sm: "calc(var(--ui-radius) - 4px)"
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans]
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            },
            boxShadow: {
                "chat-shadow": "0px 0px 8px -2px rgba(0, 0, 0, 0.25)",
                "role-tag-shadow": "0px 0px 6px -2px rgba(0, 0, 0, 0.25)",
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};
