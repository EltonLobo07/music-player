import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";
import MusicPlayerUserPic from "~/images/music-player-user.webp";
import SpotifyLogo from "~/images/spotify-logo.webp";
import { SongListDialog } from "~/components/SongListDialog";
import { List } from "~/components/icons/List";

type Props = ChildAndRefOmittedCompProps<"header">;

export function Header(props: Props) {
    return (
        <header
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        py-8px tabAndUp:py-16px laptopAndUp:py-32px
                        flex
                        justify-between
                        tabAndUp:flex-col
                        gap-2
                    `
                ),
                props.className
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        items-center
                        gap-x-24px
                    `
                )}
            >
                <h1
                    className = {helpers.formatClassName(
                        `
                            w-[134px]
                            h-[40px]
                            relative
                        `
                    )}
                >
                    <img 
                        src = {SpotifyLogo}
                        alt = "company's logo"
                    />
                    <span
                        style = {styles.visuallyHidden}
                    >
                        spotify
                    </span>
                </h1>
                <SongListDialog>
                    <button
                        className = {helpers.formatClassName(
                            `
                                w-48px
                                h-48px
                                rounded-full
                              bg-[#24201C]
                              text-white
                                laptopAndUp:hidden
                                flex
                                justify-center
                                items-center 
                            `
                        )}
                    >
                        <List />
                    </button>
                </SongListDialog>
            </div>
            <button
                disabled
                type = "button"
                className = {helpers.formatClassName(
                    `
                        w-48px
                        h-48px
                        rounded-full
                        relative
                        bg-black
                    `
                )}
            >
                <img
                    src = {MusicPlayerUserPic}
                    alt = "user's profile picture"
                    className = {helpers.formatClassName(
                        `
                            w-full
                            h-full
                            rounded-[inherit]
                            object-center
                        `
                    )}
                />
                <span
                    style = {styles.visuallyHidden}
                >
                    logout
                </span>
            </button>
        </header>
    );
}
