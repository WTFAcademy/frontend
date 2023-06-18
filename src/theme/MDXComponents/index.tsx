// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from "react";
import * as DocExpansionComponents from "@site/src/components/docs";

export default {
    // Re-use the default mapping
    ...MDXComponents,
    ...DocExpansionComponents,
    // Add your custom mapping here
};
