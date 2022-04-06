import { useEffect } from "react";
import { KEYS, ENTER, DELETE, KeyStates } from "../../constants/Keys";
import Key from "./Key";

type KeyboardProps = {
    onLetter: (letter: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    keysStates:{ [key: string]: KeyStates }
};

const Keyboard = ({ onLetter, onDelete, onEnter,keysStates }: KeyboardProps) => {
    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === "Enter") {
                onEnter();
            } else if (event.code === "Backspace") {
                onDelete();
            } else {
                const key = event.key.toLocaleUpperCase();
                if (key.length === 1 && key >= "A" && key <= "Z") {
                    onLetter(key);
                }
            }
        };
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [onLetter, onDelete, onEnter]);
    return (
        <div className="keyboard">
            {KEYS.map((row, index) => (
                <div key={index} className="row">
                    {index === KEYS.length - 1 && (
                        <Key key={ENTER} value={ENTER} onClick={onEnter} />
                    )}
                    {row.map((value) => (
                        <Key key={value} value={value} onClick={onLetter} state={keysStates[value]} />
                    ))}
                    {index === KEYS.length - 1 && (
                        <Key key={DELETE} value={DELETE} onClick={onDelete} />
                    )}
                </div>
            ))}
        </div>
    );
};
export default Keyboard;
