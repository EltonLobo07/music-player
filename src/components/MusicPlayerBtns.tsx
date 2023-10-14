import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Dot } from "~/components/Dot";
import { Previous } from "~/components/icons/Previous";
import { Pause } from "~/components/icons/Pause";
import { Play } from "~/components/icons/Play";
import { Next } from "~/components/icons/Next";
import { SpeakerXMark } from "~/components/icons/SpeakerXMark";
import { SpeakerWave } from "~/components/icons/SpeakerWave";

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
            flex
            justify-center
            items-center
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
                        flex
                        justify-center
                        items-center
                        gap-x-[4px]
                        relative
                    `
                )}
            >
                <span
                    style = {styles.visuallyHidden}
                >
                    do nothing
                </span>
                <Dot />
                <Dot />
                <Dot />
            </button>
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        gap-x-16px tabAndUp:gap-x-32px
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
                        play previous song in the list
                    </span>
                    <Previous
                        aria-hidden
                    />
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
                            relative
                            flex
                            justify-center
                            items-center
                        `
                    )}
                >
                    <span
                        style = {styles.visuallyHidden}
                    >
                        {
                            `${$playing ? "pause" : "play"} selected song`
                        }
                    </span>
                    {
                        $playing
                        ? (
                            <Pause 
                                aria-hidden
                            />
                        )
                        : (
                            <Play 
                                aria-hidden
                                className = {helpers.formatClassName(
                                    // horizontal optic centering
                                    `
                                        translate-x-[2px]
                                    `
                                )}
                            />
                        )
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
                        play next song in the list
                    </span>
                    <Next 
                        aria-hidden
                    />
                </button>
            </div>
            <button
                type = "button"
                onClick = {() => $onMutedChange(!$muted)}
                className = {helpers.formatClassName(
                    `
                        ${cornerBtnsClassName}
                        relative
                        flex
                        justify-center
                        items-center
                    `
                )}
            >
                <span
                    style = {styles.visuallyHidden}
                >
                    {
                        `${$muted ? "unmute" : "mute"} music player`
                    }
                </span>
                {
                    $muted
                    ? (
                        <SpeakerXMark 
                            aria-hidden
                        />
                    )
                    : (
                        <SpeakerWave 
                            aria-hidden
                        />
                    )
                }
            </button>
        </div>
    );
}
