import React from "react";
import * as Slider from '@radix-ui/react-slider';
import { helpers } from '~/helpers';
import { twMerge } from "tailwind-merge";

type Props = {
    className?: string
};

export function MusicPlayerSlider(props: Props) {
    const [value, setValue] = React.useState([0]);

    return (
        <Slider.Root
            value = {value}
            onValueChange = {newValue => setValue(newValue)}
            className = {twMerge(
                helpers.formatClassName(
                    `   
                        relative
                        w-full
                        h-[6px]
                        rounded-[16px]
                        flex
                        items-center
                    `
                ),
                props.className
            )}
        >
            <Slider.Track
                className = {helpers.formatClassName(
                    `
                        grow
                        relative
                        h-full
                        bg-[#383635]
                        rounded-[inherit]
                    `
                )}
            >
                <Slider.Range 
                    className = {helpers.formatClassName(
                        `
                            absolute
                            bg-white
                            h-full
                            rounded-[inherit]
                        `
                    )}
                />
            </Slider.Track>
            <Slider.Thumb />
        </Slider.Root>
    );
}
