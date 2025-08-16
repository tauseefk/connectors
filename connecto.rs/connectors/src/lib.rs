use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn say_hello() {
    web_sys::console::log_1(&"Hello, WASM!".into());
}
