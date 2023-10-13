import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";

type Props = ChildAndRefOmittedCompProps<"div">;

export function MusicPlayerBtns(props: Props) {
    const cornerBtnsClassName = helpers.formatClassName(
        `
            w-48px
            h-48px
            rounded-full
            bg-[#24201C]
            text-white
        `
    );
    const btnsNearPlayPauseClassName = helpers.formatClassName(
        `
            w-32px
            h-32px
            text-[#9B9A99]
            rounded-full
            bg-white
        `
    );

    return (
        <div
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `   
                        flex
                        justify-between
                    `
                ),
                props.className
            )}
        >
            <button
                type = "button"
                className = {helpers.formatClassName(
                    `
                        ${cornerBtnsClassName}
                        relative
                    `
                )}
            >
                <span
                    style = {styles.visuallyHidden}
                >
                    tbd
                </span>
            </button>
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        gap-x-32px
                        items-center
                    `
                )}
            >
                <button
                    className = {helpers.formatClassName(
                        `
                            ${btnsNearPlayPauseClassName}
                            relative
                        `
                    )}
                >
                    <span
                        style = {styles.visuallyHidden}
                    >
                        play previous song
                    </span>
                </button>
                <button
                    className = {helpers.formatClassName(
                        `
                            w-48px
                            h-48px
                            rounded-full
                            bg-white
                            text-black
                        `
                    )}
                >
                    play/pause selected song
                </button>
                <button
                    className = {helpers.formatClassName(
                        `
                            ${btnsNearPlayPauseClassName}
                            relative
                        `
                    )}
                >
                    <span
                        style = {styles.visuallyHidden}
                    >
                        play next song
                    </span>
                </button>
            </div>
            <button
                type = "button"
                className = {helpers.formatClassName(
                    `
                        ${cornerBtnsClassName}
                        relative
                    `
                )}
            >
                <span
                    style = {styles.visuallyHidden}
                >
                    mute/unmute music player
                </span>
            </button>
        </div>
    );
}
