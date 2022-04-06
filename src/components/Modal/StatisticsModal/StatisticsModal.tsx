import React from "react";
import Modal from "../../Base/Modal/Modal";
type StatisticsModalProps = {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
};
const Statistics = () => {
    return <div>Statistics</div>;
};
const StatisticsModal = ({ isOpen, setOpen }: StatisticsModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <Statistics />
        </Modal>
    );
};
export default React.memo(StatisticsModal);
