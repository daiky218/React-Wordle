import { WORDLE_TEXT } from "../../constants/Settings";
import { BsBarChart, BsQuestionCircle, BsGear } from "react-icons/bs";
type HeaderProps = {
    setIsStatisticsModalOpen: (value: boolean) => void;
    setIsSettingsModalOpen: (value: boolean) => void;
    setIsHelpModalOpen: (value: boolean) => void;
};
const Header = ({
    setIsStatisticsModalOpen,
    setIsSettingsModalOpen,
    setIsHelpModalOpen,
}: HeaderProps) => {
    return (
        <div className="header">
            <div className="left">
                <button className="icon" onClick={()=>{setIsHelpModalOpen(true)}}>
                    <BsQuestionCircle />
                </button>
            </div>
            <div className="center">
                <div className="title">{WORDLE_TEXT}</div>
            </div>
            <div className="right">
                <button className="icon" onClick={()=>{setIsStatisticsModalOpen(true)}}>
                    <BsBarChart />
                </button>
                <button className="icon" onClick={()=>{setIsSettingsModalOpen(true)}}>
                    <BsGear />
                </button>
            </div>
        </div>
    );
};
export default Header;
