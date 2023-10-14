import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"span">;

export function Dot(props: Props) {
    return (
        <span
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        inline-block
                        w-[5px]
                        h-[5px]
                        rounded-full
                        bg-white
                    `
                ),
                props.className
            )}
        >
        </span>
    );
}
