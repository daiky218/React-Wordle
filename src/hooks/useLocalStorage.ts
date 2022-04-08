import { useState } from "react";

function useLoaclStorage<T>(key: string, initialValue: T) {

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (!item) {
                window.localStorage.setItem(key, JSON.stringify(initialValue))
                return initialValue;
            } else {
                return JSON.parse(item);
            }
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    })
    const setValue = (value: T | ((V: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore)
            typeof window !== 'undefined' && window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }
    return [storedValue, setValue] as const

}
export default useLoaclStorage