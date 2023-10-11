import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { ChildAndRefOmittedCompProps } from "~/type-helpers";
import MusicPlayerUserPic from "~/../public/images/music-player-user.webp";
import SpotifyLogo from "~/../public/images/spotify-logo.webp";

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
