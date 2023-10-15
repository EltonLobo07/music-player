import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song as SongType, SongCategory } from "~/types";
import { Song } from "~/components/Song";
import { SearchInput } from "~/components/SearchInput";

type Props = 
    Omit<ChildAndRefOmittedCompProps<"section">, "aria-label"> & 
    CustomProps<{
        category: "personalized" | "top-tracks",
        songs: SongType[],
        onCategoryChange: (category: SongCategory) => void,
        onSongClick: (songIdx: number) => void
    }>;

export function SongList(props: Props) {
    const {
        $category,
        $onCategoryChange,
        $onSongClick,
        $songs,
        ...otherProps
    } = props;

    const [filterStr, setFilterStr] = React.useState("");
    
    const lCFilterStr = filterStr.toLowerCase();
    const filteredSongs = $songs.filter(song => (
        song.name.toLowerCase().includes(lCFilterStr)
        || 
        song.artist.toLowerCase().includes(lCFilterStr)
    ));

    const mainSectionTitle = "song list and filter controls";
    const filterControlsSectionTitle = "filter controls";
    const songListSectionTitle = "song list";

    const isTopTracksTabSelected = $category === "top-tracks";
    const isPersonalizedTabSelected = $category === "personalized";
    const tabBtnClassName = helpers.formatClassName(
        `
            font-bold
            text-2xl
            capitalize
            text-white/50
        `
    );

    return (
        <section
            {...otherProps}
            aria-label = {mainSectionTitle}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        ${styles.tw.songListWidth}
                        relative
                        pt-40px
                        max-h-full
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
            <section
                aria-label = {filterControlsSectionTitle}
                className = {helpers.formatClassName(
                    `
                        relative
                        shrink-0
                        px-16px
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {filterControlsSectionTitle}
                </h3>
                <div
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-wrap
                            gap-x-10
                            gap-y-4
                            mb-8
                        `
                    )}
                >
                    <button
                        type = "button"
                        aria-label = "display personalized tracks"
                        onClick = {() => $onCategoryChange("personalized")}
                        disabled = {isPersonalizedTabSelected}
                        className = {twMerge(
                            tabBtnClassName,
                            isPersonalizedTabSelected ? "text-white" : "hover:text-white/70"
                        )}
                    >
                        for you
                    </button>
                    <button
                        type = "button"
                        aria-label = "display top tracks"
                        onClick = {() => $onCategoryChange("top-tracks")}
                        disabled = {isTopTracksTabSelected}
                        className = {twMerge(
                            tabBtnClassName,
                            isTopTracksTabSelected ? "text-white" : "hover:text-white/70"
                        )}
                    >
                        top tracks
                    </button>
                </div>
                <SearchInput 
                    className = "mb-6"
                    $inputProps = {{
                        type: "text",
                        value: filterStr,
                        onChange: e => setFilterStr(e.target.value),
                        placeholder: "search song, artist"
                    }}
                />
            </section>
            <section
                aria-label = {songListSectionTitle}
                className = {helpers.formatClassName(
                    `
                        relative
                        grow
                        overflow-y-auto
                        p-[4px]
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {songListSectionTitle}
                </h3>
                <ul
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-col
                            gap-y-[2px]
                        `
                    )}
                >
                    {
                        filteredSongs
                            .map((song, songIdx) => (
                                <Song 
                                    key = {song.id}
                                    $name = {song.name}
                                    $artist = {song.artist}
                                    $coverId = {song.coverId}
                                    $mp3Url = {song.mp3Url}
                                    $onClick = {() => $onSongClick(songIdx)}
                                    $selfShowDelayInMs = {songIdx * 75}
                                />
                            ))
                    }
                    {
                        /*
                        (new Array(12).fill(undefined)).map((_, idx) => (
                            <li
                                key = {idx}
                                className = {helpers.formatClassName(
                                    `
                                        border border-yellow-500
                                        py-16px
                                    `
                                )}
                            >
                                test
                            </li>
                        ))
                        */
                    }
                </ul>
            </section>
        </section>
    );
}
