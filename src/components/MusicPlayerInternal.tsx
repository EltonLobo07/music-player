import { twMerge } from "tailwind-merge";
import { VisibilityWrapper } from "~/components/VisibilityWrapper";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { helpers } from "~/helpers";
import React from "react";
import { styles } from "~/styles";
import { Loading } from "~/components/Loading";
import { Song, FetchStatus } from "~/types";
import { MusicPlayerSlider } from "~/components/MusicPlayerSlider";
import { MusicPlayerBtns } from "~/components/MusicPlayerBtns";

type Props = 
    ChildAndRefOmittedCompProps<"div"> &
    CustomProps<{
        song: Pick<
            Song,
            | "name"
            | "artist"
            | "coverId"
        >,
        songDuration: number,
        songFetchStatus: FetchStatus,
        value: number[],
        onValueChange: (newValue: number) => void,
        muted: boolean,
        setMuted: (newMuted: boolean) => void,
        playing: boolean,
        setPlaying: (newPlaying: boolean) => void,
        onNextSongBtnClick: () => void,
        onPrevSongBtnClick: () => void
    }>;

export function MusicPlayerInternal(props: Props) {
    const {
        $song,
        $songFetchStatus,
        $value,
        $songDuration,
        $onValueChange,
        $muted,
        $setMuted,
        $playing,
        $setPlaying,
        $onNextSongBtnClick,
        $onPrevSongBtnClick,
        ...otherProps
    } = props;

    const [showSelf, setShowSelf] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setShowSelf(true);
        }, 100);
    }, []);

    const songDetailsSectionTitle = "song details";
    const playerControlsSectionTitle = "player controls";

    return (
        <VisibilityWrapper
            $as = "div"
            $show = {showSelf}
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        max-h-full
                        flex
                        flex-col
                    `
                ),
                otherProps.className
            )}
        >
            <section
                aria-label = {songDetailsSectionTitle}
                className = {helpers.formatClassName(
                    `
                        relative
                        mb-24px
                        grow
                        overflow-y-auto
                        flex
                        flex-col
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {songDetailsSectionTitle}
                </h3>
                <div
                    className = {helpers.formatClassName(
                        `
                            relative
                            flex
                            flex-col
                            gap-y-2
                            mb-32px
                        `
                    )}
                >
                    <span
                        style = {styles.visuallyHidden}
                    >
                        selected song
                    </span>
                    <span
                        className = {helpers.formatClassName(
                            `
                                text-[2rem]
                                leading-9
                                font-bold
                                text-white
                            `
                        )}
                    >
                        {$song.name}
                    </span>
                    <span
                        style = {styles.visuallyHidden}
                    >
                        by
                    </span>
                    <span
                        className = {helpers.formatClassName(
                            `
                                text-base
                                text-white/60   
                            `
                        )}
                    >
                        {$song.artist}
                    </span>
                </div>
                <img 
                    src = {helpers.getImageUrlFromCoverId($song.coverId)}
                    alt = {`${$song.name} song's cover`}
                    className = {helpers.formatClassName(
                        `
                            w-[360px] tabAndUp:w-[420px] laptopAndUp:w-[480px]
                            aspect-square
                            object-center
                            rounded-[8px]
                        `
                    )}
                />
            </section>
            <section
                aria-label = {playerControlsSectionTitle}
                className = {helpers.formatClassName(
                    `
                        shrink-0
                        relative
                        isolate
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {playerControlsSectionTitle}
                </h3>
                <Loading
                    $showLoadingMsg
                    $loading = {$songFetchStatus === "loading"}
                    $showLoadedMsg = {false}
                    className = {helpers.formatClassName(
                        `
                            absolute
                            w-full
                            h-full
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            ${
                                (
                                    $songFetchStatus === "loading"
                                    || 
                                    $songFetchStatus === "error"
                                )
                                ? "z-10"
                                : ""
                            }
                        `
                    )}
                >
                    {
                        $songFetchStatus === "loading"
                        ? "Loading selected song"
                        : $songFetchStatus === "error"
                          ? (
                            <span
                                className = {helpers.formatClassName(
                                    `
                                        text-red-500
                                        text-sm
                                    `
                                )}
                            >
                                Failed to load the selected song, maybe the song is not available.
                            </span>
                          )
                          : "Loaded selected song"
                    }
                </Loading>
                <VisibilityWrapper
                    $as = "div"
                    $show = {$songFetchStatus === "loaded"}
                    inert = {$songFetchStatus === "loading" || $songFetchStatus === "error" ? "" : undefined}
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-col
                            gap-y-32px
                        `
                    )}
                >
                    <MusicPlayerSlider
                        value = {$value}
                        onValueChange = {([ newTime ]) => $onValueChange(newTime)}
                        max = {Number.isFinite($songDuration) ? $songDuration : 100}
                    />
                    <MusicPlayerBtns
                        $muted = {$muted}
                        $onMutedChange = {$setMuted}
                        $playing = {$playing}
                        $onPlayingChange = {$setPlaying}
                        $onNextSongBtnClick = {$onNextSongBtnClick}
                        $onPreviousSongBtnClick = {$onPrevSongBtnClick}
                    />
                </VisibilityWrapper>
            </section>
        </VisibilityWrapper>
    );
}
