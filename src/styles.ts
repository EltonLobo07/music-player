import { helpers } from "~/helpers";

export const styles = {
    maxWidthWrapper: helpers.formatClassName(
        `
            px-8px tabAndUp:px-16px laptopAndUp:px-32px
            max-w-[94.5rem]
            mx-auto
        `
    )
};
