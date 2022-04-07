import React, { useMemo, useState } from "react";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { MAX_GUESS_LENGTH, MAX_GUESS_TIMES } from "./constants/Settings";
import useFixedLengthString from "./hooks/useFixedLengthString";
import {
    getTodayWord,
    isInvalidWord,
    isRightWord,
    isSufficientLengthWord,
} from "./utils/word";
import "./styles/index.scss";
import StatisticsModal from "./components/Modal/StatisticsModal/StatisticsModal";
import * as Notification from "./components/Base/Notification";
import { getKeysStates, updateKeysStates } from "./utils/key";
import { KeyStates } from "./constants/Keys";
import Header from "./components/Header/Header";
import HelpModal from "./components/Modal/HelpModal/HelpModal";
import SettingsModal from "./components/Modal/SettingsModal/SettingsModal";

function App() {
    const [guess, setGuess] = useFixedLengthString(MAX_GUESS_LENGTH);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [guessesStates, setGuessesStates] = useState<KeyStates[][]>([]);
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] =
        useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] =
        useState<boolean>(false);
    const [isHelpModalOpen, setIsHelpModalOpen] =
        useState<boolean>(false);
    const [isGameWin, setIsGameWin] = useState<boolean>(false);
    const onLetter = (letter: string) => {
        if (guesses.length < MAX_GUESS_TIMES && !isGameWin) {
            setGuess.add(letter);
        }
    };
    const onDelete = () => {
        setGuess.del();
    };
    const onEnter = () => {
        // 游戏结束或胜利
        if (guesses.length === MAX_GUESS_TIMES || isGameWin) {
            return;
        }
        // 单词长度
        if (!isSufficientLengthWord(guess)) {
            Notification.warning({
                content: "The word is not long enough.",
            });
            return;
        }
        // 单词有效性
        if (isInvalidWord(guess)) {
            Notification.warning({
                content: "The word is not valid.",
            });
            return;
        }

        // 单词正确性
        if (isRightWord(guess)) {
            Notification.success({ content: "You guessed right." });
            setIsGameWin(true);
        } else {
            guesses.length + 1 < MAX_GUESS_TIMES
                ? Notification.error({
                      content: "You guessed wrong.",
                  })
                : Notification.error({
                      content: `The word is ${getTodayWord()}`,
                      duration: 0,
                  });
        }
        setGuessesStates([...guessesStates, updateKeysStates(guess)]);
        setGuesses([...guesses, guess]);
        setGuess.reset();
    };
    return (
        <div className="App">
            <Header 
            setIsStatisticsModalOpen={setIsStatisticsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
            setIsHelpModalOpen={setIsHelpModalOpen}/>
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
                gameStatistics={{
                    totalTries: 0,
                    successRate: 0,
                    currentStreak: 0,
                    bestStreak: 0,
                }}
                guessDistribution={[0, 0, 0, 0, 0, 0]}
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
