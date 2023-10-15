import { twMerge } from "tailwind-merge";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function Spinner(props: Props) {
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
                "w-[24px] h-[24px]",
                props.className
            )}
        >
            <path d = "M12 2L12 6"></path>
            <path d = "M12 18L12 22"></path>
            <path d = "M4.93 4.93L7.76 7.76"></path>
            <path d = "M16.24 16.24L19.07 19.07"></path>
            <path d = "M2 12L6 12"></path>
            <path d = "M18 12L22 12"></path>
            <path d = "M4.93 19.07L7.76 16.24"></path>
            <path d = "M16.24 7.76L19.07 4.93"></path>
        </svg>
    );
}