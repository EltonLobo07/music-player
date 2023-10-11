import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"header">;

export function Header(props: Props) {
    return (
        <header
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        py-8px tabAndUp:py-16px laptopAndUp:py-32px
                        flex
                        justify-between
                        tabAndUp:flex-col
                        gap-2
                        border-4 border-gray-500
                    `
                ),
                props.className
            )}
        >
            <h1>
                <span>
                    spotify
                </span>
            </h1>
            <button
                disabled
                type = "button"
                aria-label = "logout"
                className = {helpers.formatClassName(
                    `
                        w-48px
                        h-48px
                        rounded-full
                        bg-black
                    `
                )}
            >
            </button>
        </header>
    );
}
