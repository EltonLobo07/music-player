import { ComponentProps } from "react";

export type ChildAndRefOmittedCompProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TComp extends React.JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements
> = Omit<ComponentProps<TComp>, "children" | "ref">;
