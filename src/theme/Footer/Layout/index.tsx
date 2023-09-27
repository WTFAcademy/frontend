/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import { TAny } from "@site/src/typings/common";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: TAny): JSX.Element {
  return (
    <footer className="px-6 text-white py-[60px] md:py-[96px] md:px-[80px] bg-[#17171A] dark:bg-[#09090B]">
      <div className="flex flex-col justify-around md:flex-row">
        {(logo || copyright) && (
          <div className="mx-auto text-center w-[336px]">
            {logo && (
              <div className="mb-5 margin-bottom--sm h-[100px]">{logo}</div>
            )}
            <div className="text-xs text-gray-300">{copyright}</div>
          </div>
        )}
        <div className="flex-auto">
          <div className="flex justify-between w-full mt-8 md:justify-around lg:w-3/4">
            {links}
          </div>
        </div>
      </div>
    </footer>
  );
}
