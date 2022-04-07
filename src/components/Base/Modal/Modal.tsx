import { createPortal } from "react-dom";
import { createContainer } from "../../../utils/container";
import classNames from "classnames";
type ModalProps = {
    isOpen: boolean;
    children?: React.ReactNode;
    mask?: boolean;
    closable?: boolean;
    maskClosable?: boolean;
    onClose: () => void;
};
const modalContainer = createContainer("modalPortal");
const Modal = ({
    children,
    isOpen,
    mask = true,
    closable = true,
    maskClosable = true,
    onClose,
}: ModalProps) => {
    if (!isOpen) {
        return null;
    }
    const className = classNames("modal-container", { mask });
    const handleMaskClick = () => {
        maskClosable && onClose();
    };
    const handleButtonClick = () => {
        closable && onClose();
    };
    return createPortal(
        <div className={className} onClick={handleMaskClick}>
            <div
                className="children-container"
                onClick={(event) => event.stopPropagation()}
            >
                {closable && (
                    <div className="close" onClick={handleButtonClick} />
                )}
                {children}
            </div>
        </div>,
        modalContainer
    );
};
export default Modal;
