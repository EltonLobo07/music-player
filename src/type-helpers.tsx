import { ComponentProps } from "react";

export type ChildAndRefOmittedCompProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TComp extends React.JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements
> = Omit<ComponentProps<TComp>, "children" | "ref">;

export type CustomProps<TObj extends Record<string, unknown>> = {
    /*
        To understand why I had to use "string & K" instead of "K",
            check: https://github.com/microsoft/TypeScript/issues/41196  
    */
    [K in keyof TObj as `$${string & K}`]: TObj[K]
};
