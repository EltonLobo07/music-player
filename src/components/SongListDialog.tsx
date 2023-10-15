import * as Dialog from '@radix-ui/react-dialog';
import React, { ComponentProps } from 'react';
import { helpers } from '~/helpers';
import { SongList } from '~/components/SongList';
import { CompulsoryKeys, FilterCustomProps } from '~/type-helpers';
import { styles } from '~/styles';
import { X } from '~/components/icons/X';
import { twMerge } from 'tailwind-merge';

type Props = 
    CompulsoryKeys<ComponentProps<typeof Dialog.Root>, "open" | "onOpenChange"> &
    {
        children: React.JSX.Element
    } & 
    FilterCustomProps<React.ComponentProps<typeof SongList>>;

export function SongListDialog(props: Props) {
    const {
        children,
        $category,
        $onCategoryChange,
        $songs,
        $onSongClick,
        open,
        ...otherProps
    } = props;

    const [transition, setTransition] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setTransition(open);
        }, open ? 100 : 500);
    }, [open]);
    
    return (
        <Dialog.Root
            modal = {false}
            open = {open || transition}
            {...otherProps}
        >
            <Dialog.Trigger
                asChild
            >
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content
                    className = {helpers.formatClassName(
                        `
                            fixed
                            top-0
                            bottom-0
                            left-0
                            ${styles.tw.songListWidth}
                            overflow-hidden
                        `
                    )}
                >
                    <div
                        className = {helpers.formatClassName(
                            `
                                w-full
                                flex
                                flex-col
                                bg-black/50
                                backdrop-blur-lg
                                transition-transform
                                duration-500
                                ${
                                    open
                                    ? transition
                                      ? "translate-x-0"
                                      : "-translate-x-full"
                                    : "-translate-x-full"
                                }
                            `
                        )}
                    >
                        <Dialog.Title
                            style = {styles.visuallyHidden}
                            className = {helpers.formatClassName(
                                `
                                    border border-white
                                    text-white
                                `
                            )}
                        >
                            song list and filter controls dialog
                        </Dialog.Title>
                        <Dialog.Close
                            asChild
                        >
                            <button
                                type = "button"
                                disabled = {!open}
                                className = {helpers.formatClassName(
                                    `
                                    ${
                                            twMerge(
                                                styles.tw.roundedBtn,
                                                "w-[40px] h-[40px] bg-transparent"   
                                            )
                                    }
                                        flex
                                        justify-center
                                        items-center
                                        my-8px
                                        ml-auto
                                        shrink-0
                                        relative
                                        mr-16px
                                    `
                                )}
                            >
                                <span
                                    style = {styles.visuallyHidden}
                                >
                                    close dialog
                                </span>
                                <X />
                            </button>
                        </Dialog.Close>
                        <div
                            className = {helpers.formatClassName(
                                `
                                    grow
                                    overflow-y-auto
                                `
                            )}
                        >
                            <SongList 
                                $category = {$category}
                                $onCategoryChange = {$onCategoryChange}
                                $songs = {$songs}
                                $onSongClick = {$onSongClick}
                                className = {helpers.formatClassName(
                                    `
                                        text-white
                                        flex
                                        flex-col
                                    `
                                )}
                            />
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}