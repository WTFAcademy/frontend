
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import LinkItem from '@theme/Footer/LinkItem';
import {TAny} from "@site/src/typings/common";

type ColumnType = TAny['columns'][number];
type ColumnItemType = ColumnType['items'][number];

function ColumnLinkItem({item}: {item: ColumnItemType}) {
    return item.html ? (
        <li
            className="footer__item"
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: item.html}}
        />
    ) : (
        <li key={item.href ?? item.to} className="footer__item">
            <LinkItem item={item} />
        </li>
    );
}

function Column({column}: {column: ColumnType}) {
    return (
        <div className="inline-flex flex-col items-center md:items-start">
            <div className="mb-6 font-bold text-lg md:text-xl">{column.title}</div>
            <ul className="clean-list flex flex-col gap-4 text-sm md:text-base">
                {column.items.map((item, i) => (
                    <ColumnLinkItem key={i} item={item} />
                ))}
            </ul>
        </div>
    );
}

export default function FooterLinksMultiColumn({columns}: TAny): JSX.Element {
    return (
        <>
            {columns.map((column, i) => (
                <Column key={i} column={column} />
            ))}
        </>
    );
}
