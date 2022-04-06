export type KeyStates='correct'|'present'|'absent'
export type CellStates='empty'|'typing'| KeyStates
export const KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];
export const ENTER = 'ENTER';
export const DELETE = 'DELETE';

export const KEY_STATE_CORRECT:KeyStates='correct'
export const KEY_STATE_PRESENT:KeyStates='present'
export const KEY_STATE_ABSENT:KeyStates='absent'
export const CELL_STATE_EMPTY:CellStates='empty'
export const CELL_STATE_TYPING:CellStates='typing'

