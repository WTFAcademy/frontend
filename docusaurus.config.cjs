// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// If you are using dotenv (https://www.npmjs.com/package/dotenv)
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'WTF Academy',
    tagline: 'Web3 Open University for Developers',
    url: 'https://wtf.academy',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    trailingSlash: false,

    organizationName: 'WTFAcademy',
    projectName: 'frontend',
    themes: ['solive-docusaurus-theme-code'],
    i18n: {
        defaultLocale: 'zh',
        locales: ['en', 'zh']
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    path: 'docs',
                    sidebarPath: path.resolve(__dirname, './sidebars.json'),
                    editUrl: 'https://github.com/WTFAcademy/frontend/tree/dev',
                    breadcrumbs: false,
                    showLastUpdateTime: true,
                },
                blog: false,
                theme: {
                    customCss: [
                        require.resolve('./src/styles/docusaurus.css'),
                        require.resolve('./src/styles/tailwind.css'),
                        require.resolve('./src/styles/other.css'),
                        require.resolve('./src/styles/prosemirror.css'),
                    ],
                },
            }),
        ],
    ],
    plugins: [
        path.resolve(__dirname, './plugins/webpack-plugin.cjs'),
        path.resolve(__dirname, './plugins/tailwind-loader.cjs'),
    ],
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'img/logo.png',
            navbar: {
                logo: {
                    alt: 'WTF Logo',
                    src: 'img/logo.png',
                    height: '24px',
                },
                items: [
                    {
                        label: 'Solidity 101',
                        type: 'doc',
                        docId: 'solidity-101/readme',
                        position: 'left',
                    },
                    {
                        label: 'Solidity 102',
                        type: 'doc',
                        docId: 'solidity-102/readme',
                        position: 'left',
                    },
                    {
                        label: 'Solidity 103',
                        type: 'doc',
                        docId: 'solidity-103/readme',
                        position: 'left',
                    },
                    {
                        label: 'Starknet Basecamp 2023',
                        type: 'doc',
                        docId: 'starknet-basecamp-2023/cairo/readme',
                        position: 'left',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                    {
                        type: 'custom-profile',
                        position: 'right'
                    }
                ],
            },
            footer: {
                logo: {
                    src: 'img/logo-full.png',
                    height: '40px',
                },
                links: [
                    {
                        title: 'Products',
                        items: [
                            {
                                label: 'Forum',
                                href: 'https://github.com/AmazingAng/WTFSolidity/discussions',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/WTFAcademy',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discord.gg/5akcruXrsk',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/0xAA_Science',
                            },
                            {
                                label: 'Wechat',
                                href: 'https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform',
                            },
                        ],
                    },
                    {
                        title: 'Donation',
                        items: [
                            {
                                label: 'Gitcoin',
                                href: 'https://gitcoin.co/grants/6090/wtf-solidity',
                            },
                            {
                                label: 'Mirror',
                                href: 'https://mirror.xyz/ninjak.eth/collection',
                            },
                        ],
                    },
                ],
                copyright: `© ${new Date().getFullYear()} WTF Academy.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ["solidity"]
            },
        }),
    customFields: {
        APP_URL: process.env.REACT_APP_API_URL,
    }
};

module.exports = config;
