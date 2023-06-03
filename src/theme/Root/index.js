import React from 'react';
import Head from '@docusaurus/Head';
import { Analytics } from '@vercel/analytics/react';

// 默认实现，你可以自定义
export default function Root({children}) {
    return <>
        <Head>
            <script async src="https://analytics.umami.is/script.js" data-website-id="b5fb069d-1050-49cd-beab-37a97c1ef98e"></script>
        </Head>
        {children}
        <Analytics/>
    </>;
}