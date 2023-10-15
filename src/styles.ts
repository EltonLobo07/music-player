import { CSSProperties } from "react";
import { helpers } from "~/helpers";

const visuallyHidden: CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    height: 1,
    width: 1,
    margin: 0,
    padding: 0,
    border: 0
};

export const styles = {
    visuallyHidden,
    tw: {
        maxWidthWrapper: helpers.formatClassName(
            `
                px-8px tabAndUp:px-16px laptopAndUp:px-32px
                max-w-[94.5rem]
                mx-auto
            `
        ),
        songListWidth: "w-[min(100%,27rem)]",
        roundedBtn: helpers.formatClassName(
            `
                w-[48px]
                h-[48px]
                rounded-full
                bg-white/10
                text-white
                hover:text-gray-300
            `
        )
    }
};
