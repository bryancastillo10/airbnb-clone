"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps{
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter = ({title, subtitle, value, onChange}:CounterProps) => {
    const addCount = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const minusCount = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChange(value - 1)
    }, [onChange, value]);

    return (
    <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>           
            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="size-10 rounded-full border border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                         onClick={minusCount}
                    >
                    <AiOutlineMinus/>
                </div>
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <div onClick={addCount}
                     className="size-10 rounded-full border border-neutral-400 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                    >
                    <AiOutlinePlus/>
            </div>
      </div>
    </div>
  )
}

export default Counter
