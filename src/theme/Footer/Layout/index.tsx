/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {TAny} from "@site/src/typings/common";

export default function FooterLayout(
    {
        style,
        links,
        logo,
        copyright,
    }: TAny
): JSX.Element {
    return (
        <footer
            className="text-white py-[60px] px-6 md:py-[96px] md:px-[80px]"
            style={{background: "linear-gradient(90deg, #392D39 0%, #221520 100%)"}}
        >
            <div className="flex justify-around flex-col md:flex-row">
                {(logo || copyright) && (
                    <div className="text-center w-[336px] mx-auto">
                        {logo && <div className="margin-bottom--sm h-[100px] mb-5">{logo}</div>}
                        <div className="text-xs text-gray-300">{copyright}</div>
                    </div>
                )}
                <div className="flex-auto">
                    <div className="w-full flex justify-between mt-8 md:justify-around lg:w-3/4">{links}</div>
                </div>
            </div>
        </footer>
    );
}
