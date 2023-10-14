import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';
import { helpers } from '~/helpers';
import { SongList } from '~/components/SongList';
import { FilterCustomProps } from '~/type-helpers';
import { styles } from '~/styles';
import { X } from '~/components/icons/X';

type Props = 
    ComponentProps<typeof Dialog.Root> &
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
        ...otherProps
    } = props;
    
    return (
        <Dialog.Root
            modal = {false}
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
                            max-w-full
                            bg-black
                            flex
                            flex-col
                            ${styles.tw.songListWidth}
                            border-r
                            border-[#2A2419]
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
                            className = {helpers.formatClassName(
                                `
                                    text-white
                                    w-40px
                                    h-40px
                                    rounded-full
                                    bg-[#24201C]
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}