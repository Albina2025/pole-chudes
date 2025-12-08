import  { useMemo, useEffect, useCallback } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setQuestion, resetGame } from "../../../store/gameSlice";
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

  const revealed = answer
    .split("")
    .map((ch) => {
      if (ch === " ") return " ";
      return guessed.includes(ch) ? ch : "_";
    })
    .join(" ");

  const isWin =
    game.fullAnswer &&
    game.fullAnswer.toUpperCase() === answer
      ? true
      : uniqueLetters.every((l) => guessed.includes(l));

  const isLose = wrongLetters.length >= 6;

  const pickRandomQuestion = useCallback(() => {
    if (questions.length === 0) return;
    const idx = Math.floor(Math.random() * questions.length);
    dispatch(setQuestion(questions[idx].id));
  }, [questions, dispatch]);

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

     
      <div style={{ marginTop: 16 }}>
        <h3>Сөз:</h3>
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            padding: 12,
            border: "1px solid #eee",
            borderRadius: 6,
            display: "inline-block",
            minWidth: 300,
            textAlign: "center",
            background: "#fff",
          }}
        >
          {revealed}
        </div>
      </div>

      {/* Статистика */}
      <div style={{ marginTop: 12 }}>
        <div>Туура эмес: {wrongLetters.join(", ") || "-"}</div>
        <div>Калганы: {Math.max(0, 6 - wrongLetters.length)}</div>
      </div>

   
      {isWin && (
        <div style={{ marginTop: 16, color: "green" }}>
          <h3>Сен жеңдиң!</h3>
          <div>Жооп: {answer}</div>
          <button
            style={{ marginTop: 8 }}
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
          <button onClick={pickRandomQuestion}>Кийинки суроо</button>
          <button onClick={() => dispatch(resetGame())} style={{ marginLeft: 8 }}>
            Restart
          </button>
        </div>
      )}

  
      {!isWin && !isLose && (
        <>
          <LetterInput />
          <WordInput />
        </>
      )}

      <div style={{ marginTop: 18 }}>
        <button onClick={pickRandomQuestion}>Тандоону жаңылоо</button>
        <button onClick={() => dispatch(resetGame())} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </div>
    </div>
  );
}
