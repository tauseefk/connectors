var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wasm-module:/Users/tauseefk/personal/rust/connectors/www/connectors/connectors_bg.wasm
var connectors_bg_exports = {};
__export(connectors_bg_exports, {
  __wbg_board_free: () => __wbg_board_free,
  __wbg_get_board_player_turn: () => __wbg_get_board_player_turn,
  __wbg_get_board_winner: () => __wbg_get_board_winner,
  __wbg_set_board_player_turn: () => __wbg_set_board_player_turn,
  __wbg_set_board_winner: () => __wbg_set_board_winner,
  __wbindgen_export_0: () => __wbindgen_export_0,
  __wbindgen_start: () => __wbindgen_start,
  board_get_board: () => board_get_board,
  board_new: () => board_new,
  board_select_col: () => board_select_col,
  instance: () => instance,
  memory: () => memory,
  module: () => module2
});

// wasm-deferred:/Users/tauseefk/personal/rust/connectors/www/connectors/connectors_bg.wasm
var connectors_bg_default = "./connectors_bg-ZE6KNLW5.wasm";

// connectors/connectors_bg.js
var wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
var lTextDecoder = typeof TextDecoder === "undefined" ? (0, module.require)("util").TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var Player = Object.freeze({
  Red: 0,
  "0": "Red",
  Black: 1,
  "1": "Black"
});
var TileType = Object.freeze({
  Empty: 0,
  "0": "Empty",
  Red: 1,
  "1": "Red",
  Black: 2,
  "2": "Black"
});
var BoardFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_board_free(ptr >>> 0, 1));
var Board = class _Board {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Board.prototype);
    obj.__wbg_ptr = ptr;
    BoardFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BoardFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_board_free(ptr, 0);
  }
  /**
   * @returns {Player}
   */
  get player_turn() {
    const ret = wasm.__wbg_get_board_player_turn(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {Player} arg0
   */
  set player_turn(arg0) {
    wasm.__wbg_set_board_player_turn(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Player | undefined}
   */
  get winner() {
    const ret = wasm.__wbg_get_board_winner(this.__wbg_ptr);
    return ret === 2 ? void 0 : ret;
  }
  /**
   * @param {Player | null} [arg0]
   */
  set winner(arg0) {
    wasm.__wbg_set_board_winner(this.__wbg_ptr, isLikeNone(arg0) ? 2 : arg0);
  }
  /**
   * @param {number} row_count
   * @param {number} col_count
   * @returns {Board}
   */
  static new(row_count, col_count) {
    const ret = wasm.board_new(row_count, col_count);
    return _Board.__wrap(ret);
  }
  /**
   * @returns {Uint8Array}
   */
  get get_board() {
    const ret = wasm.board_get_board(this.__wbg_ptr);
    return ret;
  }
  /**
   * Selects a column
   *
   * if the col_idx is out of bounds, rejects the move
   * else makes a move
   * returns the move outcome
   * @param {number} col_idx
   */
  select_col(col_idx) {
    wasm.board_select_col(this.__wbg_ptr, col_idx);
  }
};
function __wbg_buffer_609cc3eee51ed158(arg0) {
  const ret = arg0.buffer;
  return ret;
}
function __wbg_new_a12002a7f91c75be(arg0) {
  const ret = new Uint8Array(arg0);
  return ret;
}
function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0, arg1, arg2) {
  const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
  return ret;
}
function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_0;
  const offset = table.grow(4);
  table.set(0, void 0);
  table.set(offset + 0, void 0);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
  ;
}
function __wbindgen_memory() {
  const ret = wasm.memory;
  return ret;
}
function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}

// wasm-module:/Users/tauseefk/personal/rust/connectors/www/connectors/connectors_bg.wasm
var imports = {
  ["./connectors_bg.js"]: {
    __wbindgen_memory,
    __wbg_buffer_609cc3eee51ed158,
    __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a,
    __wbg_new_a12002a7f91c75be,
    __wbindgen_throw,
    __wbindgen_init_externref_table
  }
};
async function loadWasm(module3, imports2) {
  if (typeof module3 === "string") {
    if (module3.startsWith("./")) {
      module3 = new URL(module3, import.meta.url).href;
    }
    const moduleRequest = await fetch(module3);
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(moduleRequest, imports2);
      } catch (e) {
        if (moduleRequest.headers.get("Content-Type") != "application/wasm") {
          console.warn(e);
        } else {
          throw e;
        }
      }
    }
    module3 = await moduleRequest.arrayBuffer();
  }
  return await WebAssembly.instantiate(module3, imports2);
}
var { instance, module: module2 } = await loadWasm(connectors_bg_default, imports);
var memory = instance.exports.memory;
var __wbg_board_free = instance.exports.__wbg_board_free;
var __wbg_get_board_player_turn = instance.exports.__wbg_get_board_player_turn;
var __wbg_set_board_player_turn = instance.exports.__wbg_set_board_player_turn;
var __wbg_get_board_winner = instance.exports.__wbg_get_board_winner;
var __wbg_set_board_winner = instance.exports.__wbg_set_board_winner;
var board_new = instance.exports.board_new;
var board_get_board = instance.exports.board_get_board;
var board_select_col = instance.exports.board_select_col;
var __wbindgen_export_0 = instance.exports.__wbindgen_export_0;
var __wbindgen_start = instance.exports.__wbindgen_start;

// connectors/connectors.js
__wbg_set_wasm(connectors_bg_exports);
__wbindgen_start();

// src/index.js
var ROW_COUNT = 6;
var COL_COUNT = 7;
var DISPLAY_TURN_MAP = {
  [Player.Red]: "R",
  [Player.Black]: "B"
};
var DISPLAY_TILE_MAP = {
  [TileType.Empty]: "_",
  [TileType.Red]: "R",
  [TileType.Black]: "B"
};
var playerTurnEl = document.getElementById("player-turn");
var gameBoardEl = document.getElementById("game-board");
var board = Board.new(ROW_COUNT, COL_COUNT);
var render = () => {
  playerTurnEl.innerText = board.winner !== void 0 ? `${DISPLAY_TURN_MAP[board.winner]} wins!` : DISPLAY_TURN_MAP[board.player_turn];
  if (board.winner !== void 0) {
    gameBoardEl.classList.add("pointer-none");
  }
  const tiles = Array.from(board.get_board).map(
    (tileEnumValue) => DISPLAY_TILE_MAP[tileEnumValue]
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
