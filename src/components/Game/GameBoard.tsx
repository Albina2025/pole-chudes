import React, { useMemo } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setQuestion, resetGame } from "../../store/gameSlice";
import LetterInput from "./LetterInput";
import WordInput from "./WordInput";
import QuestionBox from "./QuestionBox";

export default function GameBoard() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.list);
  const game = useAppSelector((s) => s.game);
  const current = questions.find((q) => q.id === game.currentQuestionId);

  const answer = current ? current.answer.toUpperCase() : "";


  const uniqueLetters = useMemo(() => {
    return Array.from(new Set(answer.replace(/\s+/g, "").split("")));
  }, [answer]);

  const wrongLetters = game.guessedLetters.filter((l) => !answer.includes(l));
//   const correctLetters = game.guessedLetters.filter((l) => answer.includes(l));

  const revealed = answer
    .split("")
    .map((ch) => {
      if (ch === " ") return " ";
      return game.guessedLetters.includes(ch) ? ch : "_";
    })
    .join(" ");

  const isWin =
    game.fullAnswer && game.fullAnswer.toUpperCase() === answer
      ? true
      : uniqueLetters.every((l) => game.guessedLetters.includes(l));

  const isLose = wrongLetters.length >= 6;

  const pickRandomQuestion = () => {
    if (questions.length === 0) return;
    const idx = Math.floor(Math.random() * questions.length);
    dispatch(setQuestion(questions[idx].id));
  };

  
  React.useEffect(() => {
    if (!game.currentQuestionId && questions.length > 0) {
      pickRandomQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length]);

  return (
    <div style={{ padding: 12 }}>
      <QuestionBox />

      <div style={{ marginTop: 16 }}>
        <h3>Сөз: </h3>
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

      <div style={{ marginTop: 12 }}>
        <div>Туура эмес болжолдор: {wrongLetters.join(", ") || "-"}</div>
        <div>Калган мүмкүнчүлүктөр: {Math.max(0, 6 - wrongLetters.length)}</div>
      </div>

     
      {isWin && (
        <div style={{ marginTop: 16, color: "green" }}>
          <h3>Сен жеңдиң! 🎉</h3>
          <div>Жооп: {answer}</div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => {
                
                if (questions.length > 0) {
                  const idList = questions.map((q) => q.id);
                  const rnd = idList[Math.floor(Math.random() * idList.length)];
                  dispatch(setQuestion(rnd));
                }
              }}
            >
              Кийинки суроо
            </button>
          </div>
        </div>
      )}

      {isLose && (
        <div style={{ marginTop: 16, color: "red" }}>
          <h3>Оюн аяктады — утулдуң 😞</h3>
          <div>Жооп: {answer}</div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => {
                if (questions.length > 0) {
                  const idList = questions.map((q) => q.id);
                  const rnd = idList[Math.floor(Math.random() * idList.length)];
                  dispatch(setQuestion(rnd));
                }
              }}
            >
              Кийинки суроо
            </button>

            <button
              onClick={() => dispatch(resetGame())}
              style={{ marginLeft: 8 }}
            >
              Оюнду өчүрүү
            </button>
          </div>
        </div>
      )}

      {/* Эгер оюн уланууда болсо — интерфейстер көрсөтүбүз */}
      {!isWin && !isLose && (
        <>
          <LetterInput />
          <WordInput />
        </>
      )}

      {/* Тест/админ үчүн тез баскычтар */}
      <div style={{ marginTop: 18 }}>
        <button onClick={() => pickRandomQuestion()}>Тандоону жаңылоо</button>
        <button onClick={() => dispatch(resetGame())} style={{ marginLeft: 8 }}>
          Оюнду reset кылуу
        </button>
      </div>
    </div>
  );
}
