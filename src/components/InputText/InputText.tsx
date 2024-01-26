import { useCallback, useRef } from "react";

import { InputTextProps } from "../../types";

import "./InputText.css";


export const InputText = ({
    placeholder,
    name,
    type,
    value,
    styleClasses,
    onInput,
    autoFocus,
}: InputTextProps) => {
    const ref = useRef(null);
    const onInputEvent = useCallback(() => {
        if (!ref.current) {
            return;
        }
        onInput(ref.current.value);
    }, [onInput, ref]);
    return (
        <input
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            onInput={onInputEvent}
            autoComplete="off"
            className={["input-text", ...(styleClasses || [])].join(" ")}
            autoFocus={autoFocus}
            ref={ref}
        />
    );
};
