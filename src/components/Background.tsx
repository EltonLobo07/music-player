import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";

type Props = 
    ChildAndRefOmittedCompProps<"div"> &
    CustomProps<{
        background: React.CSSProperties["background"]
    }>;

function getVisibilityClassName(isElementVisible: boolean): string {
    return (
        isElementVisible
        ? "opacity-0 z-10"
        : "z-0"
    );
}

const TIME_BEFORE_TRANSITION_START_IN_MS = 100;

export function Background(props: Props) {
    const {
        $background,
        ...otherProps
    } = props;

    const [showFirstDiv, setShowFirstDiv] = React.useState(false);
    const [previousBackground, setPreviousBackground] = React.useState($background);
    const [makeElementVisible, setMakeElementVisible] = React.useState(false);
    const previousBackgroundRef = React.useRef($background);
    const timeoutIdRef = React.useRef<number | null>(null);
    const initialRenderRef = React.useRef({
        layoutEffect: true,
        effect: true
    });

    React.useLayoutEffect(() => {
        if (initialRenderRef.current.layoutEffect) {
            initialRenderRef.current.layoutEffect = false;
            return;
        }
        setShowFirstDiv(prevShowFirstDiv => !prevShowFirstDiv);
        setMakeElementVisible(false);
        setPreviousBackground(previousBackgroundRef.current);
        previousBackgroundRef.current = $background;
    }, [$background]);

    React.useEffect(() => {
        if (initialRenderRef.current.effect) {
            initialRenderRef.current.effect = false;
            return;
        }
        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(() => {
            setMakeElementVisible(true);
            timeoutIdRef.current = null;
        }, TIME_BEFORE_TRANSITION_START_IN_MS);
    }, [$background]);

    const commonChildDivClassName = helpers.formatClassName(
        `
            absolute
            top-0
            left-0
            right-0
            bottom-0
        `
    );

    function getClassNameWhenMakeVisible(shouldElementBeVisible: boolean): string {
        if (!shouldElementBeVisible || !makeElementVisible) {
            return "";
        }
        return "opacity-1 transition-opacity duration-1000";
    }

    return (
        <div
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        absolute
                        top-0
                        left-0
                        right-0
                        bottom-0
                        isolate
                    `
                ),
                otherProps.className
            )}
        >
            <div
                style = {{
                    background: showFirstDiv ? $background : previousBackground
                }}
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            ${commonChildDivClassName}
                            ${getVisibilityClassName(showFirstDiv)}
                        `
                    ),
                    getClassNameWhenMakeVisible(showFirstDiv)
                )}
            >
            </div>
            <div
                style = {{
                    background: showFirstDiv ? previousBackground : $background
                }}
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            ${commonChildDivClassName}
                            ${getVisibilityClassName(!showFirstDiv)}
                        `
                    ),
                    getClassNameWhenMakeVisible(!showFirstDiv)
                )}
            >
            </div>
        </div>
    );
}
