import { CELL_STATE_EMPTY } from "../../constants/Keys"
import { MAX_GUESS_LENGTH } from "../../constants/Settings"
import Cell from "./Cell"

const EmptyRow=()=>{
    return (<div className="row">
        {Array(MAX_GUESS_LENGTH).fill(null).map((_,index)=><Cell key={index} type={CELL_STATE_EMPTY}/>)}
    </div>)
}
export default EmptyRow