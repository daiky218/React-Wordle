import { createPortal } from "react-dom";
import { createContainer } from "../../../utils/container";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};
const modalContainer=createContainer('modalPortal');
const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    if (!isOpen) {
        return null;
    }
    const handleClick = () => {
        onClose();
    };
    return (
        createPortal(<div className="modal-container" onClick={handleClick}>
            <div
                className="container"
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>,modalContainer)
        
    );
};
export default Modal;
