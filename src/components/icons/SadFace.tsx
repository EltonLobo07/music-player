import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"svg">;

export function SadFace(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        w-[48px]
                        h-[48px]
                    `
                ),
                props.className
            )}
        >
            <path
                strokeLinecap = "round"
                strokeLinejoin = "round"
                d = "M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            ></path>
        </svg>
    );
}
