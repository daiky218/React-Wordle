import React from "react";
import Modal from "../../Base/Modal/Modal";
import Countdown from "./Countdown";
import Distribution from "./Distribution";
import StatisticsBar, { GameStatistics } from "./StatisticsBar";
type StatisticsProps = {
    gameStatistics: GameStatistics;
    guessDistribution: number[];
};
type StatisticsModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
} & StatisticsProps;
const Statistics = ({ gameStatistics, guessDistribution }: StatisticsProps) => {
    return (
        <div className="statistics-content">
            <h3>Statistics</h3>
            <StatisticsBar gameStatistics={gameStatistics} />
            <h3>Guess Distribution</h3>
            <Distribution guessDistribution={guessDistribution} />
            <div className="statistics-row">
                <div className="countdown">
                    <h3 className="countdown-text">New word in</h3>
                    <Countdown />
                </div>
                <button className="share">Share</button>
            </div>
        </div>
    );
};
const StatisticsModal = ({
    isOpen,
    setOpen,
    gameStatistics,
    guessDistribution,
}: StatisticsModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <Statistics
                gameStatistics={gameStatistics}
                guessDistribution={guessDistribution}
            />
        </Modal>
    );
};
export default React.memo(StatisticsModal);
