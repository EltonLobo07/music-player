export type SongCategory = "personalized" | "top-tracks";

export type Song = 
    Record<
        | "name"
        | "artist"
        | "bgAccent"
        | "coverId"
        | "mp3Url",
        string
    > & {
        id: number
    };