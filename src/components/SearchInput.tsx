import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Search } from "~/components/icons/Search";

type Props = 
    ChildAndRefOmittedCompProps<"div"> & 
    CustomProps<{
        inputProps?: ChildAndRefOmittedCompProps<"input">
    }>;

export function SearchInput(props: Props) {
    const {
        $inputProps,
        ...otherProps
    } = props;

    return (
        <div
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        bg-white/5
                        relative
                        rounded-[8px]
                    `
                ),
                otherProps.className
            )}
        >
            <input 
                {...$inputProps}
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            w-full
                            pl-[16px]
                            py-[0.625rem]
                            bg-inherit
                            placeholder:capitalize
                            pr-[44px]
                            rounded-[inherit]
                            placeholder:text-white/60
                            text-white
                            text-lg
                        `
                    ),
                    $inputProps?.className
                )}
            />
            <Search
                aria-hidden 
                className = {helpers.formatClassName(
                    `
                        w-[20px]
                        h-[20px]
                        absolute
                        top-1/2
                        -translate-y-1/2
                        right-[16px]
                        pointer-events-none
                        rounded-[inherit]
                        text-white/50
                    `
                )}
            />
        </div>
    );
}
