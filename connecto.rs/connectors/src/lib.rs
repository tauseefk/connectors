#![allow(dead_code)]

mod engine;

mod prelude {
    pub use std::fmt;

    pub use wasm_bindgen::prelude::wasm_bindgen;
}

use engine::TileType;
use prelude::*;

static ROWS_COUNT: usize = 6;
static COLS_COUNT: usize = 7;

/// Get n random values upto but not including k
fn get_random_values(n: usize, k: u8) -> Vec<u8> {
    let mut values = Vec::with_capacity(n);
    for _ in 0..n {
        values.push((js_sys::Math::random() * (k as f64)).floor() as u8);
    }
    values
}

fn pretty_print_grid(board: &Vec<TileType>) {
    let mut output = String::new();
    board.iter().enumerate().for_each(|(i, tile)| {
        if i % COLS_COUNT == 0 && i != 0 {
            output.push('\n');
        }
        output.push_str(&format!("{} ", tile));
    });
    output.push('\n');
    web_sys::console::log_1(&output.into());
}

#[wasm_bindgen]
pub fn say_hello() {
    let board = get_random_values(ROWS_COUNT * COLS_COUNT, 3);
    let board: Vec<TileType> = board.iter().map(|&v| v.into()).collect();
    pretty_print_grid(&board);
}
