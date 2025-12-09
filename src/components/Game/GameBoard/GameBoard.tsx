import  { useMemo, useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setQuestion, resetGame, guessLetter } from "../../../store/gameSlice";
import LetterInput from "../LetterInput/LetterInput";
import WordInput from "../WordInput/WordInput";
import QuestionBox from "../QuestionBox/QuestionBox";
import "./GameBoard.css";

export default function GameBoard() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.list);
  const game = useAppSelector((s) => s.game);


  const current = questions.find((q) => q.id === game.currentQuestionId);
  const answer = current ? current.answer.toUpperCase() : "";
  const guessed = game.guessedLetters;


  const uniqueLetters = useMemo(() => {
    return Array.from(new Set(answer.replace(/\s+/g, "").split("")));
  }, [answer]);

  const wrongLetters = guessed.filter((l) => !answer.includes(l));


  const isWin =
    game.fullAnswer &&
    game.fullAnswer.toUpperCase() === answer
      ? true
      : uniqueLetters.every((l) => guessed.includes(l));

  const isLose = wrongLetters.length >= 3;

  const pickRandomQuestion = useCallback(() => {
    if (questions.length === 0) return;
    const idx = Math.floor(Math.random() * questions.length);
    dispatch(setQuestion(questions[idx].id));
  }, [questions, dispatch]);

    useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[А-ЯЁ0-9]$/.test(key)) {
        dispatch(guessLetter(key));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  useEffect(() => {
    if (!game.currentQuestionId && questions.length > 0) {
      pickRandomQuestion();
    }
  }, [questions, game.currentQuestionId, pickRandomQuestion]);

  return (
    <div style={{ padding: 12,
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      backgroundColor: "#f9f9f9",
      width: "100%",
      }}>
      <QuestionBox />

      
      <div className="board">
        {answer.split("").map((char, index) => {
          const visible = guessed.includes(char);

          return (
            <div key={index} className="cell">
              {visible ? char : ""}
            </div>
          );
        })}
      </div>

      {wrongLetters.length > 0 && (
        <div style={{ marginTop: 10, color: "red", minHeight: 24 }}>
          Ката тамгалар: {wrongLetters.join(", ")}
        </div>
      )}

   
      {isWin && (
        <div style={{ marginTop: 16, color: "green" }}>
          <h3>Сен жеңдиң!</h3>
          <div>Жооп: {answer}</div>
          <button
            style={{ margin: 15, fontSize: 15 }}
            onClick={pickRandomQuestion}
          >
            Кийинки суроо
          </button>
        </div>
      )}


      {isLose && (
        <div style={{ marginTop: 16, color: "red" }}>
          <h3>Утулдуң</h3>
          <div>Жооп: {answer}</div>
          <button style={{ margin: 15, fontSize: 15 }} 
            onClick={pickRandomQuestion}>Кийинки суроо</button>
        </div>
      )}

  
      {!isWin && !isLose && (
        <>
          <LetterInput />
          <WordInput />
        </>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="btn" onClick={pickRandomQuestion}>
          Суроону жаңылоо
        </button>

        <button
          className="btn"
          onClick={() => dispatch(resetGame())}
          style={{ marginLeft: 8 }}
        >
          Кайра баштоо
        </button>
      </div>

    </div>
  );
}

