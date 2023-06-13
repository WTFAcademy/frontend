/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import {isMultiColumnFooterLinks} from '@docusaurus/theme-common';
import FooterLinksMultiColumn from '@theme/Footer/Links/MultiColumn';
import FooterLinksSimple from '@theme/Footer/Links/Simple';
import {TAny} from "@site/src/typings/common";

export default function FooterLinks({links}: TAny): JSX.Element {
    return isMultiColumnFooterLinks(links) ? (
        <FooterLinksMultiColumn columns={links} />
    ) : (
        <FooterLinksSimple links={links} />
    );
}
