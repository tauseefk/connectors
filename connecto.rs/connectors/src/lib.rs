mod engine;

mod prelude {
    pub use std::fmt;

    pub use wasm_bindgen::prelude::wasm_bindgen;

    pub use crate::engine::*;
}

use prelude::*;

#[wasm_bindgen]
pub fn say_hello() {
    let tile_1 = TileType::Red;
    let tile_2 = TileType::Black;
    let tile_3 = TileType::Empty;

    web_sys::console::log_1(&format!("Tile 1 belongs to: {}", tile_1).into());
    web_sys::console::log_1(&format!("Tile 2 belongs to: {}", tile_2).into());
    web_sys::console::log_1(&format!("Tile 3 is: {}", tile_3).into());
    web_sys::console::log_1(&format!("Is Tile 3 empty: {}", tile_3.is_empty()).into());
}
