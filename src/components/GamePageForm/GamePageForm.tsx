import GameBoard from "../Game/GameBoard/GameBoard";

export const GamePageForm = () => {
  return (
    <div  style={{ padding: 30,}}>
      <h2>Поле Чудес — Оюн</h2>
      <GameBoard />
    </div>
  );
}