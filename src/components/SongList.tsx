import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"section">;

export function SongList(props: Props) {
    return (
        <section
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        border border-black
                    `
                ),
                props.className
            )}
        >
            song list
        </section>
    );
}
