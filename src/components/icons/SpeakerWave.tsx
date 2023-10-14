import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function SpeakerWave(props: Props) {
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
                d = "M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
            ></path>
        </svg>
    );
}
