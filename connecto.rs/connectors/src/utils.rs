/// Get n random values upto but not including k
pub fn get_random_values(n: usize, k: u8) -> Vec<u8> {
    let mut values = Vec::with_capacity(n);
    for _ in 0..n {
        values.push((js_sys::Math::random() * (k as f64)).floor() as u8);
    }
    values
}
