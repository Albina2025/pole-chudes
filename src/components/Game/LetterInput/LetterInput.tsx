import { useMemo } from "react";
import Button from "../../UI/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { guessLetter } from "../../../store/gameSlice";

const ALPHABET = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789".split("");


export default function LetterInput() {
  const dispatch = useAppDispatch();
  const guessed = useAppSelector((s) => s.game?.guessedLetters ?? []);
  const questions = useAppSelector((s) => s.questions.list);
  const currentId = useAppSelector((s) => s.game?.currentQuestionId);

  
  console.log({ guessed, questions, currentId });

  
  const current = useMemo(
    () => questions.find((q) => q?.id === currentId),
    [questions, currentId]
  );

  
  const answer: string = useMemo(() => {
    const raw = current?.answer ?? "";
   
    return String(raw).toUpperCase();
  }, [current]);

  const handleClick = (letter: string) => {
    if (!guessed.includes(letter)) {
      dispatch(guessLetter(letter));
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 8 }}>Тамгаларды тап:</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 2, maxWidth: 500}}>
        {ALPHABET.map((l) => {
          const disabled = guessed.includes(l);
          const isCorrect = answer.includes(l);

          return (
            <Button
              key={l}
              onClick={() => handleClick(l)}
              className={disabled ? "btn--disabled" : ""}
              aria-pressed={isCorrect}
            >
              {l}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
