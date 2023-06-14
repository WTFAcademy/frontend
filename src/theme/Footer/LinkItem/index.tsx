/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {TAny} from "@site/src/typings/common";

// @ts-ignore
import IconExternalLink from '@theme/Icon/ExternalLink';

export default function FooterLinkItem({item}: TAny): JSX.Element {
    const {to, href, label, prependBaseUrlToHref, ...props} = item;
    const toUrl = useBaseUrl(to);
    const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

    return (
        <Link
            className="text-white inline-flex items-center"
            {...(href
                ? {
                    href: prependBaseUrlToHref ? normalizedHref : href,
                }
                : {
                    to: toUrl,
                })}
            {...props}>
            {label}
            {href && !isInternalUrl(href) && <IconExternalLink />}
        </Link>
    );
}
