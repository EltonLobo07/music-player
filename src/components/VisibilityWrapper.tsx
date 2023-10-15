import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { CustomProps } from "~/type-helpers";

type Props<TAs extends keyof React.JSX.IntrinsicElements> = 
    CustomProps<{
        as: TAs,
        show: boolean
    }> & React.ComponentProps<TAs>;

export function VisibilityWrapper<
    TAs extends keyof React.JSX.IntrinsicElements
>(props: Props<TAs>) {
    const {
        $as,
        $show,
        className,
        ...otherProps
    } = props;

    return React.createElement(
        $as,
        {
            className: twMerge(
                helpers.formatClassName(
                    `
                        transition-opacity
                        duration-1000
                        ${
                            $show
                            ? "opacity-1"
                            : "opacity-0"
                        }
                    `
                ),
                className
            ),
            ...otherProps
        }
    );
}
