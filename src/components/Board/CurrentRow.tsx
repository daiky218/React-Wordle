import { CELL_STATE_EMPTY, CELL_STATE_TYPING } from "../../constants/Keys";
import { MAX_GUESS_LENGTH } from "../../constants/Settings";
import Cell from "./Cell";
type CurrentRowProps = {
    guess: string;

};
const CurrentRow = ({ guess}: CurrentRowProps) => {
    let letterCells = guess.split("");
    let emptyCells=Array(MAX_GUESS_LENGTH-letterCells.length).fill("")
    return (
        <div className={`row`}>
            {letterCells.map((letter,index) => (
                <Cell key={index} value={letter} type={CELL_STATE_TYPING}/>
            ))}
            {emptyCells.map((_,index) => (
                <Cell key={index} type={CELL_STATE_EMPTY}/>
            ))}
        </div>
    );
};
export default CurrentRow;
