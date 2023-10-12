import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { ChildAndRefOmittedCompProps, CustomProps } from "~/type-helpers";
import { Song, SongCategory } from "~/types";

type Props = 
    ChildAndRefOmittedCompProps<"section"> & 
    CustomProps<{
        songIdx: number,
        category: "personalized" | "top-tracks",
        songs: Song[],
        onCategoryChange: (category: SongCategory) => void
    }>;

export function SongList(props: Props) {
    const {
        $category,
        $onCategoryChange,
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

    console.log($onCategoryChange);

    return (
        <section
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        border border-black
                    `
                ),
                otherProps.className
            )}
        >
            {$category}
            <input 
                type = "text"
                value = {filterStr}
                onChange = {e => setFilterStr(e.target.value)}
            />
            {
                filteredSongs
                    .map((song, songIdx) => (
                        <div
                            key = {song.id}
                        >
                            {song.name}
                            {
                                songIdx === $songIdx && " (selected)"
                            }
                        </div>
                    ))
            }
        </section>
    );
}
