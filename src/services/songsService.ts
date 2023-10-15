import { z } from "zod";
import { Song, SongCategory } from "~/types";
import { fetchedDataSchemas } from "./fetchedDataSchemas";
import axios from "axios";
import { helpers } from "~/helpers";

function transformFetchedSong(song: z.infer<typeof fetchedDataSchemas.songsSchema>[number]): Song {
    return {
        id: song.id,
        name: song.name,
        artist: song.artist,
        bgAccent: song.accent,
        coverId: song.cover,
        mp3Url: helpers.processUrl(song.url)
    };
}

async function getByCategory(
    category: SongCategory
): Promise<Song[]> {
    const filterTopTracks = category === "top-tracks";

    return (
        fetchedDataSchemas.songsSchema
            .parse((await axios.get("https://cms.samespace.com/items/songs")).data.data)
            .filter(song => (
                filterTopTracks && song.top_track
                ||
                !filterTopTracks && !song.top_track
            ))
            .map(transformFetchedSong)
    );
}

export const songsService = {
    getByCategory
};
