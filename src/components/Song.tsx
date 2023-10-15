import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song as SongType } from "~/types";
import { Loading } from "~/components/Loading";
import { VisibilityWrapper } from "./VisibilityWrapper";

type Props = 
    ChildAndRefOmittedCompProps<"li"> & 
    CustomProps<
        Pick<
            SongType,
            | "name"
            | "artist"
            | "coverId"
            | "mp3Url"
        > & {
            onClick: () => void,
            selfShowDelayInMs?: number
        }
    >;

export function Song(props: Props) {
    const {
        $name,
        $artist,
        $coverId,
        $onClick,
        $mp3Url,
        $selfShowDelayInMs = 0,
        ...otherProps
    } = props;

    const [showSelf, setShowSelf] = React.useState(false);
    const [duration, setDuration] = React.useState<number | null>(null);
    const [error, setError] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        setTimeout(() => {
            setShowSelf(true);
        }, $selfShowDelayInMs);
    }, [$selfShowDelayInMs]);

    React.useEffect(() => {
        const audioElement = document.createElement("audio");
        audioElement.preload = "metadata";
        audioElement.src = $mp3Url;
        const loadedEventName = "loadedmetadata";
        const loadedEventHandler = () => setDuration(audioElement.duration);
        const errorEventName = "error";
        const errorEventHandler = () => setError(true);
        audioElement.addEventListener(loadedEventName, loadedEventHandler);
        audioElement.addEventListener(errorEventName, errorEventHandler);
        return () => {
            audioElement.removeEventListener(loadedEventName, loadedEventHandler);
            audioElement.removeEventListener(errorEventName, errorEventHandler);
        };
    }, [$mp3Url]);

    const loading = duration === null && error === null;

    return (
        <VisibilityWrapper
            {...otherProps}
            $as = "li"
            $show = {showSelf}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        relative
                        px-[16px]
                        py-4
                        rounded-[8px]
                        hover:bg-white/10
                    `
                ),
                props.className
            )}
        >
            <button
                type = "button"
                onClick = {$onClick}
                className = {helpers.formatClassName(
                    `
                        absolute
                        w-full
                        h-full
                        top-0
                        left-0
                    `
                )}
            >
                <span
                    style = {styles.visuallyHidden}
                >
                    {`play ${$name} by ${$artist}`}
                </span>
            </button>
            <div
                className = {helpers.formatClassName(
                    `
                        relative
                        pointer-events-none
                        flex
                        gap-x-4
                        items-center
                    `
                )}
            >
                <img 
                    src = {helpers.getImageUrlFromCoverId($coverId)}
                    alt = {`${$name} song's cover`}
                    className = {helpers.formatClassName(
                        `
                            w-48px
                            h-48px
                            rounded-full
                            object-center
                        `
                    )}
                />
                <div
                    className = {helpers.formatClassName(
                        `
                            grow
                        `
                    )}
                >
                    <h3
                        className = {helpers.formatClassName(
                            `
                                text-[1.125rem]
                                leading-6
                                text-white
                            `
                        )}
                    >
                        {$name}
                    </h3>
                    <p
                        className = {helpers.formatClassName(
                            `
                                text-[0.875rem]
                                leading-6
                                text-white/60
                            `
                        )}
                    >
                        {$artist}
                    </p>
                </div>
                <div>
                    {
                        <Loading 
                            $loading = {loading} 
                            $showLoadedMsg = {false}
                            $showLoadingMsg = {false}                            
                        >
                            {
                                loading
                                ? "loading duration"
                                : error
                                  ? (
                                    <span
                                        className = {helpers.formatClassName(
                                            `
                                                relative
                                            `
                                        )}
                                    >
                                        <span
                                            style = {styles.visuallyHidden}
                                        >
                                            error loading duration
                                        </span>
                                        <span
                                            aria-hidden
                                            className = {helpers.formatClassName(
                                                `
                                                    inline-block
                                                    text-red-500
                                                    text-sm
                                                    capitalize
                                                `
                                            )}
                                        >
                                            failed
                                        </span>
                                    </span>
                                  )
                                  : "loaded duration"
                            }
                        </Loading>
                    }
                    {
                        <VisibilityWrapper
                            $as = "span"
                            $show = {duration !== null}
                        >
                            {
                                duration !== null && (
                                    <time
                                        dateTime = {helpers.getSingleSpacedStr(
                                            `
                                                ${helpers.getMinutesPortionOfMColonSSFormat(duration)}m
                                                ${helpers.getSecondsPortionOfMColonSSFormat(duration)}s
                                            `
                                        )}
                                        className = {helpers.formatClassName(
                                            `
                                                text-[1.125rem]
                                                leading-6
                                                text-white/60
                                            `
                                        )}
                                    >
                                        {helpers.secondsToMColonSSFormat(duration)}
                                    </time>
                                )
                            }
                        </VisibilityWrapper>
                    }
                </div>
            </div>
        </VisibilityWrapper>
    );
}
