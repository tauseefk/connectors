import { Board, Player, TileType } from "../connectors/connectors.js";

const ROW_COUNT = 6;
const COL_COUNT = 7;
// just so it's easy to render as a grid
const DISPLAY_TURN_MAP = {
  [Player.Red]: "R",
  [Player.Black]: "B",
};
const DISPLAY_TILE_MAP = {
  [TileType.Empty]: "_",
  [TileType.Red]: "R",
  [TileType.Black]: "B",
};

const playerTurnEl = document.getElementById("player-turn");
const gameBoardEl = document.getElementById("game-board");

const board = Board.new(ROW_COUNT, COL_COUNT);
const render = () => {
  // conditionally render the winner once the game concludes
  playerTurnEl.innerText =
    board.winner !== undefined
      ? `${DISPLAY_TURN_MAP[board.winner]} wins!`
      : DISPLAY_TURN_MAP[board.player_turn];

  if (board.winner !== undefined) {
    gameBoardEl.classList.add("pointer-none");
  }

  const tiles = Array.from(board.get_board).map(
    (tileEnumValue) => DISPLAY_TILE_MAP[tileEnumValue],
  );
  const fragment = document.createDocumentFragment();
  tiles.forEach((tile, idx) => {
    const span = document.createElement("span");
    span.textContent = tile;
    span.dataset.colIdx = Math.floor(idx % COL_COUNT);
    fragment.appendChild(span);
  });

  gameBoardEl.innerHTML = "";
  gameBoardEl.appendChild(fragment);
};

gameBoardEl.addEventListener("click", (event) => {
  const colIdx = parseInt(event.target.dataset.colIdx, 10);
  board.select_col(colIdx);
  render();
});

render();
