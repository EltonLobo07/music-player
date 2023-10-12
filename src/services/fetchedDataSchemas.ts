import { z } from "zod";

const songsSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    artist: z.string(),
    accent: z.string(),
    cover: z.string(),
    url: z.string(),
    top_track: z.boolean()
}));

export const fetchedDataSchemas = {
    songsSchema
};
