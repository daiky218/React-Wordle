import React, { useEffect, useMemo, useState } from "react";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { MAX_GUESS_LENGTH, MAX_GUESS_TIMES } from "./constants/Settings";
import useFixedLengthString from "./hooks/useFixedLengthString";
import {
    isInvalidWord,
    isRightWord,
    isSufficientLengthWord,
    todayWord,
} from "./utils/word";
import "./styles/index.scss";
import StatisticsModal, {
    GameStats,
} from "./components/Modal/StatisticsModal/StatisticsModal";
import * as Notification from "./components/Base/Notification";
import { getKeysStates, updateKeysStates } from "./utils/key";
import { KeyStates } from "./constants/Keys";
import Header from "./components/Header/Header";
import HelpModal from "./components/Modal/HelpModal/HelpModal";
import SettingsModal from "./components/Modal/SettingsModal/SettingsModal";
import useLoaclStorage from "./hooks/useLocalStorage";
type GameState = {
    guesses: string[];
    todayWord: string;
};
function App() {
    const [guess, setGuess] = useFixedLengthString(MAX_GUESS_LENGTH);
    const [gameStats, setGameStats] = useLoaclStorage<GameStats>("gameStats", {
        totalTries: 0,
        successRate: 0,
        currentStreak: 0,
        bestStreak: 0,
        guessDistribution: [0, 0, 0, 0, 0, 0],
        gamesFailed: 0,
    });
    const [gameState, setGameState] = useLoaclStorage<GameState>("gameState", {
        guesses: [],
        todayWord: todayWord,
    });
    const [guesses, setGuesses] = useState<string[]>(() => {
        if (todayWord !== gameState.todayWord) {
            setGameState({
                guesses: [],
                todayWord: todayWord,
            });
            return [];
        }
        return gameState.guesses;
    });

    const [isGameWin, setIsGameWin] = useState<boolean>(() =>
        guesses.includes(todayWord)
    );
    const [guessesStates, setGuessesStates] = useState<KeyStates[][]>(() =>
        guesses.map((guess) => updateKeysStates(guess))
    );
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] =
        useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] =
        useState<boolean>(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    useEffect(() => {
        if (isGameWin) {
            Notification.success({
                content: "You've won.",
                duration: 0,
            });
        } else if (guesses.length === MAX_GUESS_TIMES) {
            Notification.error({
                content: `The word is ${todayWord}`,
                duration: 0,
            });
        }
    }, []);
    const updateGameStats = (isGameWin: boolean) => {
        const stats = gameStats;
        stats.totalTries += 1;
        if (isGameWin) {
            stats.currentStreak += 1;
            stats.bestStreak = Math.max(stats.currentStreak, stats.bestStreak);
            stats.guessDistribution = stats.guessDistribution.map(
                (value, index) => {
                    return index === guesses.length - 1 ? value + 1 : value;
                }
            );
        } else {
            stats.currentStreak = 0;
            stats.gamesFailed += 1;
        }
        stats.successRate = Math.round(
            (100 * (stats.totalTries - stats.gamesFailed)) /
                Math.max(stats.totalTries, 1)
        );
        setGameStats(stats);
    };
    const onLetter = (letter: string) => {
        if (guesses.length < MAX_GUESS_TIMES && !isGameWin) {
            setGuess.add(letter);
        }
    };
    const onDelete = () => {
        setGuess.del();
    };
    const onEnter = () => {
        // ?????????????????????
        if (guesses.length === MAX_GUESS_TIMES || isGameWin) {
            return;
        }
        // ????????????
        if (!isSufficientLengthWord(guess)) {
            Notification.warning({
                content: "The word is not long enough.",
            });
            return;
        }
        // ???????????????
        if (isInvalidWord(guess)) {
            Notification.warning({
                content: "The word is not valid.",
            });
            return;
        }

        // ???????????????
        if (isRightWord(guess)) {
            Notification.success({ content: "You guessed right." });
            setIsGameWin(true);
            updateGameStats(true);
        } else {
            if (guesses.length + 1 < MAX_GUESS_TIMES) {
                Notification.error({
                    content: "You guessed wrong.",
                });
            } else {
                Notification.error({
                    content: `The word is ${todayWord}`,
                    duration: 0,
                });
                updateGameStats(false);
            }
        }
        setGuessesStates([...guessesStates, updateKeysStates(guess)]);
        setGuesses([...guesses, guess]);
        setGameState({
            ...gameState,
            guesses: [...guesses, guess],
        });
        setGuess.reset();
    };

    return (
        <div className="App">
            <Header
                setIsStatisticsModalOpen={setIsStatisticsModalOpen}
                setIsSettingsModalOpen={setIsSettingsModalOpen}
                setIsHelpModalOpen={setIsHelpModalOpen}
            />
            <Board
                guess={guess}
                guesses={guesses}
                guessesStates={guessesStates}
            />
            <Keyboard
                onLetter={onLetter}
                onDelete={onDelete}
                onEnter={onEnter}
                keysStates={useMemo(() => getKeysStates(), [])}
            />
            <StatisticsModal
                isOpen={isStatisticsModalOpen}
                setOpen={React.useCallback(setIsStatisticsModalOpen, [
                    isStatisticsModalOpen,
                    setIsStatisticsModalOpen,
                ])}
                gameStats={gameStats}
            />
            <HelpModal
                isOpen={isHelpModalOpen}
                setOpen={React.useCallback(setIsHelpModalOpen, [
                    isHelpModalOpen,
                    setIsHelpModalOpen,
                ])}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                setOpen={React.useCallback(setIsSettingsModalOpen, [
                    isSettingsModalOpen,
                    setIsSettingsModalOpen,
                ])}
            />
        </div>
    );
}

export default App;
