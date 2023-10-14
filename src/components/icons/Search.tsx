import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function Search(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            width = "24"
            height = "24"
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
                        w-[24px] 
                        h-[24px]
                    `
                ),
                props.className
            )}
        >
            <circle 
                cx = "11" cy = "11" r = "8"
            >
            </circle>
            <path 
                d = "M21 21L16.65 16.65">
            </path>
        </svg>
    );
}
