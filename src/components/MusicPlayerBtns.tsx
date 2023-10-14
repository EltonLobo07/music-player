import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";

type Props = 
    ChildAndRefOmittedCompProps<"div"> & 
    CustomProps<{
        muted: boolean,
        playing: boolean,
        onMutedChange: (newMuted: boolean) => void,
        onPlayingChange: (newPlaying: boolean) => void,
        onNextSongBtnClick: () => void,
        onPreviousSongBtnClick: () => void
    }>;

export function MusicPlayerBtns(props: Props) {
    const {
        $muted,
        $playing,
        $onMutedChange,
        $onPlayingChange,
        $onNextSongBtnClick,
        $onPreviousSongBtnClick,
        ...otherProps
    } = props;

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
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `   
                        flex
                        justify-between
                    `
                ),
                otherProps.className
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
                    type = "button"
                    onClick = {$onPreviousSongBtnClick}
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
                    onClick = {() => $onPlayingChange(!$playing)}
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
                    {
                        $playing
                        ? "pause"
                        : "play"
                    }
                </button>
                <button
                    onClick = {$onNextSongBtnClick}
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
                onClick = {() => $onMutedChange(!$muted)}
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
                {
                    $muted
                    ? "unmute"
                    : "mute"
                }
            </button>
        </div>
    );
}
