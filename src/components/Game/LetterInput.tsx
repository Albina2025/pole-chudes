import Button from "../UI/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { guessLetter } from "../../store/gameSlice";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterInput() {
  const dispatch = useAppDispatch();
  const guessed = useAppSelector((s) => s.game.guessedLetters);
  const questions = useAppSelector((s) => s.questions.list);
  const currentId = useAppSelector((s) => s.game.currentQuestionId);
  const current = questions.find((q) => q.id === currentId);
  const answer = current ? current.answer.toUpperCase() : "";

  // disabled болгондор: мурун болжолдонгон тамгалар
  const handleClick = (letter: string) => {
    if (!guessed.includes(letter)) {
      dispatch(guessLetter(letter));
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 8 }}>Тамгаларды тап:</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ALPHABET.map((l) => {
          const disabled = guessed.includes(l);
        //   const isCorrect = answer.includes(l);
          return (
            <Button
              key={l}
              onClick={() => handleClick(l)}
              className={disabled 
                ? "btn--disabled"
                : ""}
            >
              {l}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
