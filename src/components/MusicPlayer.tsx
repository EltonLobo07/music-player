import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { ChildAndRefOmittedCompProps, CustomProps } from "~/type-helpers";
import { Song } from "~/types";
import { MusicPlayerSlider } from "~/components/MusicPlayerSlider";
import { MusicPlayerBtns } from "~/components/MusicPlayerBtns";

type Props = 
    Omit<ChildAndRefOmittedCompProps<"section">, "aria-label"> & 
    CustomProps<{
        song: Song | null
    }>;

export function MusicPlayer(props: Props) {
    const {
        $song,
        ...otherProps
    } = props;

    let contentJSX: React.JSX.Element = (
        <p>
            Select a song from the song list
        </p>
    );
    if ($song) {
        const songDetailsSectionTitle = "song details";
        const playerControlsSectionTitle = "player controls";

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
                    <MusicPlayerSlider />
                    <MusicPlayerBtns />
                </section>
            </div>
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
