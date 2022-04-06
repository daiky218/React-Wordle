import { MAX_GUESS_LENGTH } from "../constants/Settings";
import { WORDS } from "../constants/Words";

export const getTodayWord = () => {
    const startDate = new Date(2022, 0).valueOf();
    const msOfDay = 86400000;
    const nowDate = Date.now();
    const wordIndex = Math.floor((nowDate - startDate) / msOfDay)
    return WORDS[wordIndex % WORDS.length].toLocaleUpperCase();
}

export const isSufficientLengthWord = (word: string) => {
    return word.length === MAX_GUESS_LENGTH;
}
export const isInvalidWord = (word: string) => {
    return !WORDS.includes(word.toLocaleLowerCase());
}
export const isRightWord = (word: string) => {
    return word === getTodayWord();
}
export const todayWord =getTodayWord();