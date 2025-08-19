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

const playerTurnEl = document.querySelector("#player-turn span");
const gameBoardEl = document.getElementById("game-board");

const board = Board.new(ROW_COUNT, COL_COUNT);
const render = () => {
  // conditionally render the winner once the game concludes
  const playerTurn =
    board.winner !== undefined
      ? DISPLAY_TURN_MAP[board.winner]
      : DISPLAY_TURN_MAP[board.player_turn];
  playerTurnEl.classList.remove("tile-R", "tile-B");
  playerTurnEl.classList.add(`tile-${playerTurn}`);

  if (board.winner !== undefined) {
    gameBoardEl.classList.add("pointer-none");
    playerTurnEl.classList.add(board.winner !== undefined ? "win" : "");
  }

  const tiles = Array.from(board.get_board).map(
    (tileEnumValue) => DISPLAY_TILE_MAP[tileEnumValue],
  );
  const fragment = document.createDocumentFragment();
  tiles.forEach((tile, idx) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = tile;
    span.classList.add("tile", `tile-${tile}`);
    div.dataset.colIdx = Math.floor(idx % COL_COUNT);
    div.appendChild(span);
    fragment.appendChild(div);
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
