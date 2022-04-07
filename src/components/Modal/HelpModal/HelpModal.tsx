import React from "react";
import { MAX_GUESS_TIMES } from "../../../constants/Settings";
import Modal from "../../Base/Modal/Modal";
import Cell from "../../Board/Cell";
type HelpModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
};
const HelpContent = () => {
    return (
        <div className="help-content">
            <h3 className="help-title">HOW TO PLAY</h3>
            <p className="help-text">Guess the WORDLE in {MAX_GUESS_TIMES} tries.Each guess must be a valid five-letter word. Hit the enter
                button to submit.</p>
            <div className="row">
                <Cell value="W" type='correct' />
                <Cell value="E" type='typing' />
                <Cell value="A" type='typing' />
                <Cell value="R" type='typing' />
                <Cell value="Y" type='typing' />
            </div>
            <p className="help-text">The letter W is in the word and in the correct spot.</p>
            <div className="row">
                <Cell value="P" type='typing' />
                <Cell value="I" type='present' />
                <Cell value="L" type='typing' />
                <Cell value="L" type='typing' />
                <Cell value="S" type='typing' />
            </div>
            <p className="help-text">The letter I is in the word but in the wrong spot.</p>
            <div className="row">
                <Cell value="V" type='typing' />
                <Cell value="A" type='typing' />
                <Cell value="G" type='typing' />
                <Cell value="U" type='absent' />
                <Cell value="E" type='typing' />
            </div>
            <p className="help-text">The letter U is not in the word in any spot.</p>
        </div>
    );
};
const HelpModal = ({ isOpen, setOpen }: HelpModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <HelpContent />
        </Modal>
    );
};
export default React.memo(HelpModal);
