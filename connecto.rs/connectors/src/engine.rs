use crate::prelude::*;

#[wasm_bindgen]
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
}

#[wasm_bindgen]
impl Board {
    pub fn new(row_count: usize, col_count: usize) -> Self {
        Self {
            row_count,
            col_count,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn get_board(&self) -> js_sys::Uint8Array {
        let board = get_random_values(self.row_count * self.col_count, 3);
        js_sys::Uint8Array::from(&board[..])
    }
}
