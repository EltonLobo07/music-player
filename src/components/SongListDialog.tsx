import * as Dialog from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';

type Props = 
    ComponentProps<typeof Dialog.Root> &
    {
        children: React.JSX.Element
    };

export function SongListDialog(props: Props) {
    const {
        children,
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
                <Dialog.Content>
                    <Dialog.Title />
                    <Dialog.Description />
                    <Dialog.Close />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}