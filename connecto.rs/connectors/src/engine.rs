use crate::prelude::*;

pub enum TileType {
    Empty,
    Red,
    Black,
}

impl fmt::Display for TileType {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        let tile_repr = match self {
            TileType::Empty => "Empty",
            TileType::Red => "Player Red",
            TileType::Black => "Player Black",
        };

        write!(f, "{tile_repr}")
    }
}

impl TileType {
    pub fn is_empty(&self) -> bool {
        matches!(self, TileType::Empty)
    }
}
