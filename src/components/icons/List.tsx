import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function List(props: Props) {
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
                        w-[24px]
                        h-[24px]
                    `
                ),
                props.className
            )}
        >
            <path d = "M8 6L21 6"></path>
            <path d = "M8 12L21 12"></path>
            <path d = "M8 18L21 18"></path>
            <path d = "M3 6L3.01 6"></path>
            <path d = "M3 12L3.01 12"></path>
            <path d = "M3 18L3.01 18"></path>
        </svg>
    );
}
