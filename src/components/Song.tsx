import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song as SongType } from "~/types";

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
            onClick: () => void
        }
    >;

export function Song(props: Props) {
    const {
        $name,
        $artist,
        $coverId,
        $onClick,
        $mp3Url,
        ...otherProps
    } = props;

    const [duration, setDuration] = React.useState<number | null>(null);

    React.useEffect(() => {
        const audioElement = document.createElement("audio");
        audioElement.preload = "metadata";
        audioElement.src = $mp3Url;
        const eventName = "loadedmetadata";
        const eventHandler = () => setDuration(audioElement.duration);
        audioElement.addEventListener(eventName, eventHandler);
        return () => {
            audioElement.removeEventListener(eventName, eventHandler);
        };
    }, [$mp3Url]);

    return (
        <li
            {...otherProps}
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
                                text-[#A29F9B]
                            `
                        )}
                    >
                        {$artist}
                    </p>
                </div>
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
                                    text-[#A09E9A]
                                `
                            )}
                        >
                            {helpers.secondsToMColonSSFormat(duration)}
                        </time>
                    )
                }
            </div>
        </li>
    );
}
