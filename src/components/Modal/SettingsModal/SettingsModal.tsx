import React from "react";
import Modal from "../../Base/Modal/Modal";
type SettingsModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
};
const SettingsModal = ({ isOpen, setOpen }: SettingsModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            SETTINGS
        </Modal>
    );
};
export default React.memo(SettingsModal);
