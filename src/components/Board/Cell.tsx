import { CellStates } from "../../constants/Keys";

type CellProps = {
    value?: string;
    type: CellStates;
};

const Cell = ({ value, type }: CellProps) => {
    return <div className={`cell ${type} `}>{value}</div>;
};
export default Cell;
