/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// @ts-expect-error: TODO, we need to make theme-classic have type: module
import type {Props} from '@theme/CodeBlock/CopyButton';
import {cn} from "@site/src/utils/class-utils";
import {CheckIcon, CopyIcon} from "@radix-ui/react-icons";

async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value)
}

export default function CopyButton({code, className, ...props}: Props): JSX.Element {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <button
            className="relative z-20 inline-flex h-[34px] w-[34px] items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none"
            onClick={() => {
                copyToClipboardWithMeta(
                    code
                )
                setHasCopied(true)
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <CheckIcon className="h-6 w-6"/>
            ) : (
                <CopyIcon className="h-6 w-6"/>
            )}
        </button>
    );
}
