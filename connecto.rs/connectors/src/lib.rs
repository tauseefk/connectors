// this is similar to suppressing unused export lint warnings
#![allow(dead_code)]

mod engine;

mod prelude {
    pub use std::fmt;

    pub use wasm_bindgen::prelude::wasm_bindgen;
}

use prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = mathRandom)]
    fn math_random() -> f32;
}

#[wasm_bindgen]
pub fn say_hello() {
    let random_float = math_random();
    web_sys::console::log_1(&format!("Random number: {}", random_float).into());
}
