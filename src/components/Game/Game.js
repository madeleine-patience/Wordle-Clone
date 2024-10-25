import React, { useState } from "react";

import { Button } from "@mui/material";

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// // To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

const Game = () => {
  const [guess, setGuess] = useState("");
  const [wordleGuess, setWordleGuess] = useState([]);
  console.log(wordleGuess);

  // This is our function that will actually do the adding of the form. So we take our array of worldGuesses, and we add in the extra guess.
  const handleAddGuess = (guess) => {
    const newGuess = { guess, id: Math.random() };
    const nextGuess = [...wordleGuess, newGuess];
    setWordleGuess(nextGuess);
  };

  return (
    <>
      <label htmlFor="wordle-input"> Your Guess: </label>
      {/* this is the form that will submit everything. Here inside goes our function from above and it takes in a single guess from the value and adds it in with the function.
      we are also reseting the value as well, and the value is guess so that has what we want to be displabed in the inptu. */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddGuess(guess);
          setGuess("");
        }}
      >
        {/* This is for a form, we've set a max length of 6, our type of text. other tyhpes include radio buttosn exct. value is what is displayed in the input. so if we tyhpe 12345. The input will show 123456. But it will have a max of 6. */}
        {/* The on change here, is held in state. Event.target.value is the active keystroke. So i type 1, that event is 1. So when we store a input inside of the value, we hodl on to what our input says. That is how we submit our guess. */}
        <input
          maxLength={6}
          type="text"
          value={guess}
          id="wordle-input"
          onChange={(event) => {
            setGuess(event.target.value);
          }}
        />
        {/* Unfuotunately this was  abug for me from material ui. My fautl for getting too fancy! */}
        <Button type="submit">Submit Guess!</Button>
      </form>
    </>
  );
};

export default Game;
