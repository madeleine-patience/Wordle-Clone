import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { sample } from "new-component/src/utils";
import { WORDS } from "../../data";

const answer = sample(WORDS);

let guessesWithPairs = [];
const Game = () => {
  const [guess, setGuess] = useState("");
  const [wordleGuess, setWordleGuess] = useState([]);

  const checkGuess = () => {
    const currentAnswer = answer.toUpperCase().split("");
    const currentGuess = guess.toUpperCase().split("");
    let newGuessArray = [];
    for (let i = 0; i < 5; i++) {
      if (currentAnswer[i] === currentGuess[i]) {
        newGuessArray.push({
          letter: currentGuess[i],
          isCorrect: true,
        });
      } else {
        newGuessArray.push({
          letter: currentGuess[i],
          isCorrect: false,
        });
      }
    }
    guessesWithPairs.push([newGuessArray]);
  };

  const handleAddGuess = (guess) => {
    const doesGuessExist = wordleGuess.some(
      (existingGuess) => existingGuess.guess === guess
    );

    if (doesGuessExist) {
      return;
    }

    const newGuess = { guess, id: Math.random() };
    const nextGuess = [...wordleGuess, newGuess];
    setWordleGuess(nextGuess);

    checkGuess();
  };

  return (
    <Box
      sx={{
        p: 5,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fe93de",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <label htmlFor="wordle-input">
          <Typography variant="h5"> Go for it</Typography>
        </label>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddGuess(guess);
            setGuess("");
          }}
        >
          <input
            minLength={5}
            maxLength={5}
            type="text"
            value={guess}
            disabled={wordleGuess.length > 5}
            id="wordle-input"
            onChange={(event) => {
              setGuess(event.target.value);
            }}
          />
          <Button type="submit">Submit Guess!</Button>
        </form>
      </Box>
      {guessesWithPairs.map((item, index) => {
        return (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            {item.map((arrays, innerIndex) => {
              return (
                <Box key={innerIndex} sx={{ display: "flex" }}>
                  {arrays.map(({ isCorrect, letter }, letterIndex) => {
                    return (
                      <Box
                        key={letterIndex}
                        width={100}
                        height={100}
                        backgroundColor={isCorrect ? "lightGreen" : "pink"}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h5">{letter}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default Game;
