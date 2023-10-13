import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    CustomProps 
} from "~/type-helpers";
import { Song as SongType, SongCategory } from "~/types";
import { Song } from "./Song";

type Props = 
    Omit<ChildAndRefOmittedCompProps<"section">, "aria-label"> & 
    CustomProps<{
        songIdx: number,
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
        $songIdx,
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

    console.log($songIdx);

    return (
        <section
            {...otherProps}
            aria-label = {mainSectionTitle}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        border border-black
                        relative
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
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {filterControlsSectionTitle}
                </h3>
                <div>
                    <button
                        type = "button"
                        aria-label = "display personalized tracks"
                        onClick = {() => $onCategoryChange("personalized")}
                        disabled = {$category === "personalized"}
                    >
                        for you
                    </button>
                    <button
                        type = "button"
                        aria-label = "display top tracks"
                        onClick = {() => $onCategoryChange("top-tracks")}
                        disabled = {$category === "top-tracks"}
                    >
                        top tracks
                    </button>
                </div>
                <input 
                    type = "text"
                    value = {filterStr}
                    onChange = {e => setFilterStr(e.target.value)}
                />
            </section>
            <section
                aria-label = {songListSectionTitle}
                className = {helpers.formatClassName(
                    `
                        relative
                    `
                )}
            >
                <h3
                    style = {styles.visuallyHidden}
                >
                    {songListSectionTitle}
                </h3>
                <ul>
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
                                />
                            ))
                    }
                </ul>
            </section>
        </section>
    );
}
