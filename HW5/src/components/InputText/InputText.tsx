import { InputTextProps } from "../../types";
import "./InputText.css";

export const InputText = ({
    placeholder,
    name,
    type,
    value,
    styleClasses,
    onInput,
    autoFocus
}: InputTextProps) => {
    return (
        <input
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            onInput={onInput}
            autoComplete="off"
            className={["input-text", ...(styleClasses || [])].join(" ")}
            autoFocus={autoFocus}
        />
    );
};
