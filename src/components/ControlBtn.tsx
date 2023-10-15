import * as Tooltip from '@radix-ui/react-tooltip';
import { helpers } from '~/helpers';

type Props = {
    toolTipContent: string,
    children: React.JSX.Element
};

export function ControlBtnWrapper(props: Props) {
    return (
        <Tooltip.Provider
            delayDuration = {250}
        >
            <Tooltip.Root>
            <Tooltip.Trigger
                asChild
            >
                {props.children}
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    className = {helpers.formatClassName(
                        `
                            rounded-[4px]
                            px-8px
                            py-[12px]
                            text-black
                            text-sm
                            text-semibold
                            bg-white/80
                            backdrop-blur-md
                            max-w-full
                        `
                    )}
                >
                    <span>
                        {props.toolTipContent}
                    </span>
                    <Tooltip.Arrow 
                        className = {helpers.formatClassName(
                            `
                            fill-white/80
                            `
                        )}
                    />
                </Tooltip.Content>
            </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
