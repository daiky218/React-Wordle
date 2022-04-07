import {
    BEST_STREAK_TEXT,
    CURRENT_STREAK_TEXT,
    SUCCESS_RATE_TEXT,
    TOTAL_TRIES_TEXT,
} from "../../../constants/Settings";

type StatisticsItemProps = {
    data: number | string;
    label: string;
};
export type GameStatistics = {
    totalTries: number;
    successRate: number;
    currentStreak: number;
    bestStreak: number;
};
type StatisticsBarProps = {
    gameStatistics: GameStatistics;
};
const StatisticsItem = ({ data, label }: StatisticsItemProps) => {
    return (
        <div className="statistic">
            <div className="statistic-data">{data}</div>
            <div className="statistic-label">{label}</div>
        </div>
    );
};

const StatisticsBar = ({ gameStatistics }: StatisticsBarProps) => {
    return (
        <div className="statistics-container">
            <StatisticsItem
                data={gameStatistics.totalTries}
                label={TOTAL_TRIES_TEXT}
            />
            <StatisticsItem
                data={gameStatistics.successRate}
                label={SUCCESS_RATE_TEXT}
            />
            <StatisticsItem
                data={gameStatistics.currentStreak}
                label={CURRENT_STREAK_TEXT}
            />
            <StatisticsItem
                data={gameStatistics.bestStreak}
                label={BEST_STREAK_TEXT}
            />
        </div>
    );
};
export default StatisticsBar;
