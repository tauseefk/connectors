use crate::prelude::*;

pub enum TileType {
    Empty,
    Red,
    Black,
}

impl fmt::Display for TileType {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        let tile_repr = match self {
            TileType::Empty => "Empty Tile",
            TileType::Red => "Player Red",
            TileType::Black => "Player Black",
        };

        write!(f, "{tile_repr}")
    }
}

impl From<u8> for TileType {
    fn from(value: u8) -> Self {
        match value {
            b'_' | 0 => TileType::Empty,
            b'R' | 1 => TileType::Red,
            b'B' | 2 => TileType::Black,
            _ => panic!("Unexpected character {value} found for tile."),
        }
    }
}

impl TileType {
    pub fn is_empty(&self) -> bool {
        matches!(self, TileType::Empty)
    }
}
