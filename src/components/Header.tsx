import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { styles } from "~/styles";
import { 
    ChildAndRefOmittedCompProps, 
    FilterCustomProps 
} from "~/type-helpers";
import MusicPlayerUserPic from "~/images/music-player-user.webp";
import SpotifyLogo from "~/images/spotify-logo.webp";
import { SongListDialog } from "~/components/SongListDialog";
import { List } from "~/components/icons/List";
import { SongList } from "~/components/SongList";

type Props = 
    ChildAndRefOmittedCompProps<"header"> & 
    FilterCustomProps<React.ComponentProps<typeof SongList>>;

export function Header(props: Props) {
    const {
        $category,
        $onCategoryChange,
        $songs,
        $onSongClick,
        $fetchStatus,
        $selectedSongIdx,
        ...otherProps
    } = props;

    const [songListDialogOpen, setSongListDialogOpen] = React.useState(false);
    const mqlRef = React.useRef(window.matchMedia("(min-width: 81.25rem)"));

    React.useEffect(() => {
        const mql = mqlRef.current;
        const eventName = "change";
        const eventHandler = (e: MediaQueryListEvent) => {
            if (e.matches && songListDialogOpen) {
                setSongListDialogOpen(false);
            } 
        };
        mql.addEventListener(eventName, eventHandler);
        return () => {
            mql.removeEventListener(eventName, eventHandler);
        };
    }, [songListDialogOpen]);

    return (
        <header
            {...otherProps}
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
                otherProps.className
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
                <SongListDialog
                    open = {songListDialogOpen}
                    onOpenChange = {setSongListDialogOpen}
                    $category = {$category}
                    $onCategoryChange = {$onCategoryChange}
                    $songs = {$songs}
                    $fetchStatus = {$fetchStatus}
                    $selectedSongIdx = {$selectedSongIdx}
                    $onSongClick = {newSongIdx => {
                        setSongListDialogOpen(false);
                        $onSongClick(newSongIdx);
                    }}
                >
                    <button
                        type = "button"
                        disabled = {songListDialogOpen}
                        className = {helpers.formatClassName(
                            `
                                ${
                                    twMerge(
                                        styles.tw.roundedBtn,
                                        "w-[40px] h-[40px] bg-transparent"
                                    )
                                }
                              text-white
                                laptopAndUp:hidden
                                flex
                                justify-center
                                items-center
                                relative
                                transition-opacity
                                duration-500
                                ${
                                    songListDialogOpen
                                    ? "opacity-0"
                                    : "opacity-1"
                                } 
                            `
                        )}
                    >
                        <span
                            style = {styles.visuallyHidden}
                        >
                            open song list dialog
                        </span>
                        <List
                            aria-hidden
                        />
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
                            ${styles.tw.imgBgColor}
                        `
                    )}
                />
                <span
                    style = {styles.visuallyHidden}
                >
                    log out
                </span>
            </button>
        </header>
    );
}
