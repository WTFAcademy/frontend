// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from "react";

export default {
    // Re-use the default mapping
    ...MDXComponents,
    // Add your custom mapping here
    h1: (props) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight" {...props} />,
    h2: (props) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0" {...props} />,
    h3: (props) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />,
    h4: (props) => <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
    h5: (props) => <h5 className="scroll-m-20 text-lg font-semibold tracking-tight" {...props} />,
    h6: (props) => <h6 className="scroll-m-20 text-base font-semibold tracking-tight" {...props} />,
    p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />,
    ul: (props) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
    a: (props) => <a className="scroll-m-20 text-blue-500 hover:underline" {...props} />,
    blockquote: (props) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
    table: (props) => (
        <div className="my-6 w-full overflow-y-auto" {...props}>
            <table className="w-full">
                <thead>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        King's Treasury
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        People's happiness
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Empty
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Overflowing
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Modest
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Satisfied
                    </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Full
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Ecstatic
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};
