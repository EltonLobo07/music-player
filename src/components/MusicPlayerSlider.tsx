import React from "react";
import * as Slider from '@radix-ui/react-slider';
import { helpers } from '~/helpers';
import { twMerge } from "tailwind-merge";
import { ChildAndRefOmittedCompProps, CompulsoryKeys } from "~/type-helpers";

type Props = 
    CompulsoryKeys<
        Omit<ChildAndRefOmittedCompProps<typeof Slider.Root>, "onPointerDown" | "onPointerUp">, 
        "value" | "onValueChange"
    >;

export function MusicPlayerSlider(props: Props) {
    const {
        value,
        onValueChange,
        ...otherProps
    } = props;

    const [mouseDownState, setMouseDownState] = React.useState<
        | {
            captureValue: true,
            internalValue: number[]
        }
        | {
            captureValue: false,
            internalValue: null
        }
    >({
        captureValue: false,
        internalValue: null
    });

    const internalStartValueRef = React.useRef<number | null>(null);

    return (
        <Slider.Root
            {...otherProps}
            {
                ...mouseDownState.captureValue
                ? {
                    value: mouseDownState.internalValue, 
                    onValueChange: (newValue) => setMouseDownState({...mouseDownState, internalValue: newValue})
                  }
                : {
                    value, 
                    onValueChange
                  }
            }
            onPointerDown = {() => {
                internalStartValueRef.current = value[0];
                setMouseDownState({
                    captureValue: true,
                    internalValue: value
                });
            }}
            onPointerUp = {async () => {
                if (
                    mouseDownState.captureValue && 
                    internalStartValueRef.current !== mouseDownState.internalValue[0]
                ) {
                    onValueChange(mouseDownState.internalValue);
                    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
                }
                internalStartValueRef.current = null;
                setMouseDownState({
                    captureValue: false,
                    internalValue: null
                });
            }}
            className = {twMerge(
                helpers.formatClassName(
                    `   
                        relative
                        w-full
                        h-[6px]
                        rounded-[16px]
                        flex
                        items-center
                        focus:outline-2
                        outline-white
                        cursor-pointer
                    `
                ),
                otherProps.className
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
            <Slider.Thumb 
                className = {helpers.formatClassName(
                    `
                        inline-block
                        bg-white hover:bg-gray-300
                        translate-y-[1px]
                        w-16px
                        h-16px
                        rounded-full
                        focus:shadow-[0_0_0_5px_rgba(178,184,180,0.5)]
                    `
                )}
            />
        </Slider.Root>
    );
}
