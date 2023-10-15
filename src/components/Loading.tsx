import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Spinner } from "~/components/icons/Spinner";
import { styles } from "~/styles";

type Props = 
    ChildAndRefOmittedCompProps<"span"> &
    {
        children: string | React.JSX.Element
    } &
    CustomProps<{
        loading: boolean,
        showLoadingMsg?: boolean,
        showLoadedMsg?: boolean,
        spinnerClassName?: string
    }>;

function displayOrHideStr(str: string, showStr = true): React.JSX.Element | string {
    if (!showStr) {
        return <span style = {styles.visuallyHidden}>{str}</span>;
    }
    return str;
}

export function Loading(props: Props) {
    const {
        children,
        $loading,
        $showLoadedMsg,
        $showLoadingMsg,
        $spinnerClassName,
        ...otherProps
    } = props;
    
    return (
        <span
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex
                        flex-col
                        gap-y-2
                        items-center
                        text-center
                        text-white/60
                    `
                ),
                otherProps.className
            )}
        >
            {
                $loading && (
                    <Spinner 
                        aria-hidden
                        className = {twMerge(
                            "animate-spin",
                            $spinnerClassName
                        )}
                    />
                )
            }
            <span
                aria-atomic
                aria-relevant = "all"
                aria-live = "off"
                className = {helpers.formatClassName(
                    `
                        relative
                    `
                )}
            >
                {
                    typeof children === "string"
                    ? $loading
                      ? displayOrHideStr(children, $showLoadingMsg)
                      : displayOrHideStr(children, $showLoadedMsg)
                    : children
                }
            </span>
        </span>
    );
}
