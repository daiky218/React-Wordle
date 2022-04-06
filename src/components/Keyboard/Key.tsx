import { MouseEvent } from "react";
import { KeyStates } from "../../constants/Keys";

type KeyProps = {
    value: string;
    onClick: (value: string) => void;
    state?:KeyStates
};
const Key = ({ value, onClick,state }: KeyProps) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(value);
    };
    return (
        <button onClick={handleClick} className={`key ${state||''}`}>
            {value}
        </button>
    );
};
export default Key;
