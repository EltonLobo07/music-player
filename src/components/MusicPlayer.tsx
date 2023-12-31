import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song,FetchStatus } from "~/types";
import { MusicPlayerInternal } from "~/components/MusicPlayerInternal";
import { useLocalStorageState } from "~/custom-hooks/useLocalStorageState";

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
    const [muted, setMuted] = useLocalStorageState({
        initialState: false,
        isState: (possibleMuted: unknown): possibleMuted is boolean => typeof possibleMuted === "boolean",
        lsKey: "music-player-muted" 
    })
    const [songFetchStatus, setSongFetchStatus] = React.useState<FetchStatus>("loading");
    const audioRef = React.useRef((() => {
        const audioElement = document.createElement("audio");
        audioElement.loop = true;
        audioElement.preload = "auto";
        return audioElement;
    })());

    React.useEffect(() => {
        audioRef.current.muted = muted;
    }, [muted]);

    const setPlayingWrapper = React.useCallback((newPlaying: boolean) => {
        setPlaying(newPlaying);
        const audioElement = audioRef.current;
        if (newPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, []);

    const updateAudioCurrentTime = React.useCallback((newTime: number) => {
        audioRef.current.currentTime = newTime;
    }, []);

    const songMp3Url = $song?.mp3Url;
    const songName = $song?.name;
    const songArtist = $song?.artist;

    React.useEffect(() => {
        if (songName !== undefined && songArtist !== undefined) {
            document.title = `${songName} by ${songArtist}`;
        } else {
            document.title = "Music player";
        }
    }, [songName, songArtist]);

    React.useEffect(() => {
        if (songMp3Url === undefined) {
            audioRef.current.pause();
        } else {
            setSongFetchStatus("loading");
            const audioElement = audioRef.current;
            let canPlayThroughEventHandlerRemoved = false;
            const canPlayThroughEventName = "canplaythrough";
            const canPlayThroughEventHandler = () => {
                setSongFetchStatus("loaded");
                setValue([0]);
                setPlayingWrapper(true);
                canPlayThroughEventHandlerRemoved = true;
            };
            const errorEventName = "error";
            const errorEventHandler = () => setSongFetchStatus("error");
            audioElement.addEventListener(canPlayThroughEventName, canPlayThroughEventHandler, {once: true});
            audioElement.addEventListener(errorEventName, errorEventHandler);
            audioElement.src = songMp3Url;
            return () => {
                if (!canPlayThroughEventHandlerRemoved) {
                    audioElement.removeEventListener(canPlayThroughEventName, canPlayThroughEventHandler);
                }
                audioElement.removeEventListener(errorEventName, errorEventHandler);
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
        <p
            className = {helpers.formatClassName(
                `
                    text-white/60
                `
            )}
        >
            Select a song from the list
        </p>
    );
    if ($song) {
        contentJSX = (
            <MusicPlayerInternal 
                key = {songMp3Url}
                $songFetchStatus = {songFetchStatus}
                $muted = {muted}
                $playing = {playing}
                $song = {$song}
                $songDuration = {audioRef.current.duration}
                $value = {value}
                $setMuted = {setMuted}
                $setPlaying = {setPlayingWrapper}
                $onNextSongBtnClick = {$onNextSongBtnClick}
                $onPrevSongBtnClick = {$onPrevSongBtnClick}
                $onValueChange = {updateAudioCurrentTime}
            />
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
                        relative
                        flex
                        flex-col
                        items-center
                        overflow-y-auto
                        py-[8px] tabAndUp:py-[16px]
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
            <div
                className = "mt-auto"
            ></div>
            {contentJSX}
            <div
                className = "mb-auto"
            ></div>
        </section>
    );
}
