import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function Pause(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "currentColor"
            stroke = "currentColor"
            strokeWidth = "6"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        w-[24px]
                        h-[24px]
                    `
                ),
                props.className
            )}
        >
            <path
                strokeLinecap = "round"
                strokeLinejoin = "round"
                d = "M15.75 5.25v13.5m-7.5-13.5v13.5"
            ></path>
        </svg>
    );
}
