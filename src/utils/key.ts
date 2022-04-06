import { KeyStates, KEY_STATE_ABSENT, KEY_STATE_CORRECT, KEY_STATE_PRESENT } from "../constants/Keys";
import { todayWord } from "./word";

const keysStates: { [key: string]: KeyStates } = {};
export const updateKeysStates = (word: string) => {
    const wordStates:KeyStates[] = word.split('').map((letter, index) => {
        if (letter === todayWord[index]) {
            keysStates[letter] = KEY_STATE_CORRECT;
        } else if (todayWord.includes(letter)) {
            keysStates[letter] = KEY_STATE_PRESENT;

        } else {
            keysStates[letter] = KEY_STATE_ABSENT;
        }
        return keysStates[letter];
    })
    return wordStates;
}

export const getKeysStates=()=>{    
    return keysStates;
}