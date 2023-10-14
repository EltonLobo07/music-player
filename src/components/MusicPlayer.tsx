import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song } from "~/types";
import { MusicPlayerSlider } from "~/components/MusicPlayerSlider";
import { MusicPlayerBtns } from "~/components/MusicPlayerBtns";

type Props = 
    Omit<ChildAndRefOmittedCompProps<"section">, "aria-label"> & 
    CustomProps<{
        song: Song | null,
        onNextSongBtnClick: () => void,
        onPrevSongBtnClick: () => void
    }>;

export function MusicPlayer(props: Props) {
    const {
        $song,
        $onNextSongBtnClick,
        $onPrevSongBtnClick,
        ...otherProps
    } = props;

    const [value, setValue] = React.useState([0]);
    const [playing, setPlaying] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const audioRef = React.useRef((() => {
        const audioElement = document.createElement("audio");
        audioElement.loop = true;
        return audioElement;
    })());

    const setPlayingWrapper = React.useCallback((newPlaying: boolean) => {
        console.log("setPlayingWrapper run");
        setPlaying(newPlaying);
        const audioElement = audioRef.current;
        if (newPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, []);

    const setMutedWrapper = React.useCallback((newMuted: boolean) => {
        setMuted(newMuted);
        audioRef.current.muted = newMuted;
    }, []);

    const updateAudioCurrentTime = React.useCallback((newTime: number) => {
        audioRef.current.currentTime = newTime;
    }, []);

    const songMp3Url = $song?.mp3Url;

    React.useEffect(() => {
        if (songMp3Url === undefined) {
            audioRef.current.pause();
        } else {
            setLoading(true);
            const audioElement = audioRef.current;
            let eventHandlerRemoved = false;
            const eventName = "canplaythrough";
            const eventHandler = () => {
                setLoading(false);
                setValue([0]);
                setPlayingWrapper(true);
                eventHandlerRemoved = true;
            };
            audioElement.addEventListener(eventName, eventHandler, {once: true});
            audioElement.src = songMp3Url;
            return () => {
                if (!eventHandlerRemoved) {
                    audioElement.removeEventListener(eventName, eventHandler);
                }
            };
        }
    }, [songMp3Url, setPlayingWrapper]);

    React.useEffect(() => {
        const audioElement = audioRef.current;
        const eventName = "timeupdate";
        const eventHandler = () => setValue([audioElement.currentTime]);
        audioElement.addEventListener(eventName, eventHandler);
        return () => {
            audioElement.removeEventListener(eventName, eventHandler);
        };
    }, []);

    let contentJSX: React.JSX.Element = (
        <p>
            Select a song from the song list
        </p>
    );
    if ($song) {
        const songDetailsSectionTitle = "song details";
        const playerControlsSectionTitle = "player controls";
        const songDuration = audioRef.current.duration;
        contentJSX = (
            <div>
                <section
                    aria-label = {songDetailsSectionTitle}
                    className = {helpers.formatClassName(
                        `
                            relative
                            mb-24px
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
                            `
                        )}
                    >
                        <span
                            style = {styles.visuallyHidden}
                        >
                            selected song
                        </span>
                        <span>
                            {$song.name}
                        </span>
                        <span
                            style = {styles.visuallyHidden}
                        >
                            by
                        </span>
                        <span>
                            {$song.artist}
                        </span>
                    </div>
                    <img 
                        src = {helpers.getImageUrlFromCoverId($song.coverId)}
                        alt = {`${$song.name} song's cover`}
                        className = {helpers.formatClassName(
                            `
                                w-[480px]
                                aspect-square
                                object-center
                            `
                        )}
                    />
                </section>
                <section
                    aria-label = {playerControlsSectionTitle}
                    className = {helpers.formatClassName(
                        `
                            relative
                            flex
                            flex-col
                            gap-y-32px
                        `
                    )}
                >
                    <h3
                        style = {styles.visuallyHidden}
                    >
                        {playerControlsSectionTitle}
                    </h3>
                    <MusicPlayerSlider
                        value = {value}
                        onValueChange = {([ newTime ]) => updateAudioCurrentTime(newTime)}
                        max = {Number.isFinite(songDuration) ? songDuration : 100}
                    />
                    <MusicPlayerBtns
                        $muted = {muted}
                        $onMutedChange = {setMutedWrapper}
                        $playing = {playing}
                        $onPlayingChange = {setPlayingWrapper}
                        $onNextSongBtnClick = {$onNextSongBtnClick}
                        $onPreviousSongBtnClick = {$onPrevSongBtnClick}
                    />
                </section>
            </div>
        );
    }
    if (loading) {
        contentJSX = (
            <p>
                Loading...
            </p>
        );
    }

    const mainSectionTitle = "music player";

    return (
        <section
            {...otherProps}
            aria-label = {mainSectionTitle}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        border border-black
                        relative
                        flex
                        items-center
                    `
                ),
                otherProps.className
            )}
        >
            <h2
                style = {styles.visuallyHidden}
            >
                {mainSectionTitle}
            </h2>
            {contentJSX}
        </section>
    );
}
