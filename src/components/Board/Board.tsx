import { useMemo } from "react";
import { KeyStates } from "../../constants/Keys";
import { MAX_GUESS_TIMES } from "../../constants/Settings";
import ComplatedRow from "./ComplatedRow";
import CurrentRow from "./CurrentRow";
import EmptyRow from "./EmptyRow";

type BoardProps = {
    guesses: string[];
    guess: string;
    guessesStates:KeyStates[][];
    
};
const Board = ({ guess, guesses ,guessesStates}: BoardProps) => {
    const emptyRowLength =
        MAX_GUESS_TIMES - guesses.length - (guess? 1 : 0);
    const emptyRows = useMemo(()=>Array(emptyRowLength).fill(""),[emptyRowLength]);
   
    return (
        <div className="board">
            {guesses.map((complatedGuess,index) => (
                <ComplatedRow key={index} guess={complatedGuess} guessStates={guessesStates[index]} />
            ))}
            {guess&&<CurrentRow  guess={guess}/>}
            {emptyRows.map((_,index) => (
                <EmptyRow key={index}/>
            ))}
        </div>
    );
};

export default Board;
