import React from "react";
import Modal from "../../Base/Modal/Modal";
import Countdown from "./Countdown";
import Distribution from "./Distribution";
import StatisticsBar, { GameStatistics } from "./StatisticsBar";
export type GameStats = GameStatistics&{
    guessDistribution: number[];
    gamesFailed:number;
};
type StatisticsProps = {
    gameStats: GameStats;
};
type StatisticsModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    gameStats: GameStats;
};
const Statistics = ({ gameStats }: StatisticsProps) => {
    return (
        <div className="statistics-content">
            <h3>Statistics</h3>
            <StatisticsBar gameStatistics={gameStats} />
            <h3>Guess Distribution</h3>
            <Distribution guessDistribution={gameStats.guessDistribution} />
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
    gameStats,
}: StatisticsModalProps) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <Statistics gameStats={gameStats} />
        </Modal>
    );
};
export default React.memo(StatisticsModal);
