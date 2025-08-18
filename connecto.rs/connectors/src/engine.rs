use crate::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub enum Player {
    Red,
    Black,
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub enum TileType {
    Empty,
    Red,
    Black,
}

impl fmt::Display for TileType {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        let tile_repr = match self {
            TileType::Empty => "_",
            TileType::Red => "R",
            TileType::Black => "B",
        };

        write!(f, "{tile_repr}")
    }
}

impl From<&TileType> for u8 {
    fn from(value: &TileType) -> Self {
        match value {
            TileType::Empty => 0,
            TileType::Red => 1,
            TileType::Black => 2,
        }
    }
}

impl From<u8> for TileType {
    fn from(value: u8) -> Self {
        match value {
            0 => TileType::Empty,
            1 => TileType::Red,
            2 => TileType::Black,
            _ => panic!("Unexpected character {value} found for tile."),
        }
    }
}

impl TileType {
    pub fn is_empty(&self) -> bool {
        matches!(self, TileType::Empty)
    }
}

#[wasm_bindgen]
pub struct Board {
    row_count: usize,
    col_count: usize,
    pub player_turn: Player,
    board: Vec<TileType>,
}

#[wasm_bindgen]
impl Board {
    pub fn new(row_count: usize, col_count: usize) -> Self {
        let board: Vec<TileType> = vec![TileType::Empty; row_count * col_count];

        Self {
            row_count,
            col_count,
            board,
            player_turn: Player::Red,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn get_board(&self) -> js_sys::Uint8Array {
        let board: Vec<u8> = self.board.iter().map(|tile| tile.into()).collect();
        js_sys::Uint8Array::from(&board[..])
    }

    fn end_player_turn(&mut self) {
        self.player_turn = match self.player_turn {
            Player::Red => Player::Black,
            Player::Black => Player::Red,
        }
    }

    /// Selects a column
    ///
    /// if the col_idx is out of bounds, return false
    /// if it's in bounds updates the last empty tile for the column
    /// and ends the current player's turn
    pub fn select_col(&mut self, col_idx: u8) -> bool {
        if !self.is_in_bounds(col_idx) {
            return false;
        }
        let rows = self.board.chunks(self.col_count);
        let rows_reversed = rows.rev();
        let mut empty_row_idx: Option<usize> = None;
        for (idx, row) in rows_reversed.enumerate() {
            let tile_in_row = row.get(col_idx as usize).expect("This cannot happen");

            if tile_in_row.is_empty() {
                // as the rows are reversed we need to subtract from row_count
                empty_row_idx = Some(self.row_count - idx - 1);
                break;
            }
        }

        // if no empty row found for `col_idx` return false
        match empty_row_idx {
            Some(empty_row_idx) => {
                let idx_to_update = self.idx_from_row_col(empty_row_idx, col_idx as usize);
                // update board with the tile corresponding to current player turn
                self.board = self
                    .board
                    .iter()
                    .enumerate()
                    .map(|(idx, tile)| {
                        if idx == idx_to_update {
                            return match self.player_turn {
                                Player::Red => TileType::Red,
                                Player::Black => TileType::Black,
                            };
                        } else {
                            return *tile;
                        }
                    })
                    .collect();
                self.end_player_turn();
                true
            }
            None => false,
        }
    }

    fn is_in_bounds(&self, col_idx: u8) -> bool {
        (col_idx as usize) < self.col_count
    }

    fn idx_from_row_col(&self, row_idx: usize, col_idx: usize) -> usize {
        self.col_count * row_idx + col_idx
    }
}
