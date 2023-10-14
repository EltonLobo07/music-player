import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function SpeakerXMark(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeLinecap = "round"
            strokeLinejoin = "round"
            strokeWidth = "2"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        w-[20px]
                        h-[20px]
                    `
                ),
                props.className
            )}
        >
            <path 
                d = "M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"
                fill = "currentColor"
            ></path>
            <path 
                d = "M23 9L17 15"
            ></path>
            <path 
                d = "M17 9L23 15"
            ></path>
        </svg>
    );
}
