// this is similar to suppressing unused export lint warnings
#![allow(dead_code)]

mod engine;

mod prelude {
    pub use std::fmt;

    pub use wasm_bindgen::prelude::wasm_bindgen;
}

use prelude::*;

#[wasm_bindgen]
pub fn say_hello() {
    // js_sys crate provides Math::random()
    let random_float = js_sys::Math::random();
    web_sys::console::log_1(&format!("Random number: {}", random_float).into());
}
