import { KeyStates } from "../../constants/Keys";
import Cell from "./Cell";
type ComplatedRowProps = {
    guess: string;
    guessStates:KeyStates[]

};
const ComplatedRow = ({ guess,guessStates }: ComplatedRowProps) => {
    return <div className="row">
        {guess.split('').map((letter,index)=><Cell key={index}  value={letter} type={guessStates[index]} />)}
    </div>;
};
export default ComplatedRow;
