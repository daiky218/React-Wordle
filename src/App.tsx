import React, { useMemo, useState } from "react";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { MAX_GUESS_LENGTH, MAX_GUESS_TIMES } from "./constants/Settings";
import useFixedLengthString from "./hooks/useFixedLengthString";
import {
    isInvalidWord,
    isRightWord,
    isSufficientLengthWord,
} from "./utils/word";
import "./styles/index.scss";
import StatisticsModal from "./components/Modal/StatisticsModal/StatisticsModal";
import * as Notification from "./components/Base/Notification";
import { getKeysStates, updateKeysStates } from "./utils/key";
import { KeyStates } from "./constants/Keys";

function App() {
    const [guess, setGuess] = useFixedLengthString(MAX_GUESS_LENGTH);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [guessesStates, setGuessesStates] = useState<KeyStates[][]>([]);
    const [isStatisticsModalOpen, setIsStatisticsModalOpen] =
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
        if (guesses.length === MAX_GUESS_TIMES || isGameWin) {
            return;
        }
        if (!isSufficientLengthWord(guess)) {
            Notification.warning({
                content: "The word is not long enough.",
            });
            return;
        }
        if (isInvalidWord(guess)) {
            Notification.warning({
                content: "The word is not valid.",
            });
            return;
        }
        setGuessesStates([...guessesStates, updateKeysStates(guess)]);
        setGuesses([...guesses, guess]);

        if (isRightWord(guess)) {
            Notification.success({ content: "You guessed right." });
            setIsGameWin(true);
        } else {
            Notification.error({
                content: "You guessed wrong.",
            });
        }
        setGuess.reset();
    };
    return (
        <div className="App">
            {/* <>guess:{guess} guesses:{guesses} word:{wordOfDay}{" "}</>
            <button
                onClick={() => {
                    setIsStatisticsModalOpen(true);
                }}
            >
                Statistics
            </button> */}

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
            />
        </div>
    );
}

export default App;
