use crate::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, PartialEq)]
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

    pub fn does_belong_to(&self, player: Player) -> bool {
        match self {
            TileType::Empty => false,
            TileType::Red => player == Player::Red,
            TileType::Black => player == Player::Black,
        }
    }
}

#[wasm_bindgen]
pub struct Board {
    row_count: usize,
    col_count: usize,
    pub player_turn: Player,
    pub winner: Option<Player>,
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
            winner: None,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn get_board(&self) -> js_sys::Uint8Array {
        let board: Vec<u8> = self.board.iter().map(|tile| tile.into()).collect();
        js_sys::Uint8Array::from(&board[..])
    }

    // Ends the current player's turn and sets the player turn to the next one
    fn end_player_turn(&mut self) {
        self.player_turn = match self.player_turn {
            Player::Red => Player::Black,
            Player::Black => Player::Red,
        }
    }

    /// Selects a column
    ///
    /// if the col_idx is out of bounds, rejects the move
    /// else makes a move
    /// returns the move outcome
    ///
    pub fn select_col(&mut self, col_idx: u8) {
        let col_idx = col_idx as usize;

        if self.winner.is_some() || !self.is_in_bounds(col_idx) {
            return;
        }

        self.make_move(col_idx);
    }

    /// Makes a move for the current player
    /// and ends the current player's turn
    ///
    fn make_move(&mut self, col_idx: usize) {
        let rows = self.board.chunks(self.col_count);
        let mut empty_row_idx: Option<usize> = None;
        for (idx, row) in rows.rev().enumerate() {
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

                // calculate the winner before ending the player's turn
                match self.is_game_over(empty_row_idx, col_idx) {
                    true => {
                        // update the winner
                        self.winner = Some(self.player_turn);
                    }
                    false => {}
                };

                self.end_player_turn();
            }
            None => {}
        }
    }

    /// Check if the game is over
    ///
    fn is_game_over(&self, row_idx: usize, col_idx: usize) -> bool {
        self.has_4_consecutive_tiles_in_row(self.player_turn, row_idx)
            || self.has_4_consecutive_tiles_in_col(self.player_turn, col_idx)
    }

    /// Check if there are 4 consecutive tiles in a row for the given player
    /// As row tiles are contiguous, we can just use a smaller slice
    ///
    fn has_4_consecutive_tiles_in_row(&self, player: Player, row_idx: usize) -> bool {
        let row_start_idx = self.idx_from_row_col(row_idx, 0);
        let row_end_idx = row_start_idx + self.col_count;
        // get a slice of tiles that belong to the row with `row_idx`
        let row_tiles = &self.board[row_start_idx..row_end_idx];

        let mut consecutive_count = 0;
        for tile in row_tiles {
            if tile.does_belong_to(player) {
                consecutive_count += 1;
                if consecutive_count >= 4 {
                    return true;
                }
            } else {
                consecutive_count = 0;
            }
        }

        false
    }

    /// Check if there are 4 consecutive tiles in a column for the given player
    /// have to iterate over all rows as column tiles are not contiguous
    ///
    fn has_4_consecutive_tiles_in_col(&self, player: Player, col_idx: usize) -> bool {
        let mut consecutive_count = 0;
        for row_idx in 0..self.row_count {
            let tile_idx = self.idx_from_row_col(row_idx, col_idx);
            let tile = &self.board[tile_idx];

            if tile.does_belong_to(player) {
                consecutive_count += 1;
                if consecutive_count >= 4 {
                    return true;
                }
            } else {
                consecutive_count = 0;
            }
        }

        false
    }

    /// Check whether the col_idx provided is in the board's bounds
    fn is_in_bounds(&self, col_idx: usize) -> bool {
        (col_idx as usize) < self.col_count
    }

    /// Get the board tile's index from a row and column index
    fn idx_from_row_col(&self, row_idx: usize, col_idx: usize) -> usize {
        self.col_count * row_idx + col_idx
    }
}
