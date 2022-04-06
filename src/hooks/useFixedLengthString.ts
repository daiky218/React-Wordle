import { useState } from "react";

export interface StringActions {
    add: (letter: string) => void;
    del: () => void;
    reset:()=>void;
}
const useFixedLengthString = (maxLength: number, initialValue: string=''): [string, StringActions] => {
    const [string, setString] = useState(initialValue);
    const add = (value: string) => {
        if (string.length < maxLength && string.length + value.length <= maxLength) {
            setString(string + value);
        }
    };
    const del = () => {
        string.length && setString(string.slice(0, -1))
    };
    const reset =()=>{
        setString(initialValue)
    }
    return [string, { add, del ,reset}];
}
export default useFixedLengthString