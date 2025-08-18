## Connecto.rs

This is connect-4 with a Rust core compiled to WASM, wrapped in Typescript, rendered in HTML.

The goal is to bait more Javascript-ies to write Rust.
Demonstrating the `why` of writing Rust is outside the scope of this repository, demonstrating all the great things you can do with Rust is also outside the scope as I am in no way an authority on writing idiomatic Rust.

But if you're already curious about Rust, hopefully this repository will speed up the process of going from `whaaa` to `whoaa`.

May the connect-4s be with you.

## Prerequisites

- Node.js (for running the web-server)
- Rust toolchain (for running the Rust code)
- wasm-pack (for compiling to WASM)

## Outcomes [WIP]

These are some of the things you will be able to do by the end of this series:

- see similarities and differences between parts of Rust and Javascript
- send data back and forth between the Rust (WASM) and Javascript context
- expose the minimal set of APIs from your Rust code to structure your application
- play connect 4 in a browser

## Chapters [WIP]

- [Chapter 1 - Initial Commit](https://github.com/tauseefk/connectors/tree/making-connections)
- [Chapter 2 - Structuring Data](https://github.com/tauseefk/connectors/tree/data-as-enums)
- Chapter 3
  - [3.1 - Calling JS functions from Rust](https://github.com/tauseefk/connectors/tree/calling-home)
  - [3.2 - Using `js_sys` crate](https://github.com/tauseefk/connectors/tree/calling-home-again)
- Chapter 4
  - [4.1 - Returning data to Javascript](https://github.com/tauseefk/connectors/tree/returning-a-grid)
  - [4.2 - Rendering the board as HTML](https://github.com/tauseefk/connectors/tree/rendering-html-grid)
- Chapter 5
  - [5.1 - Making moves](https://github.com/tauseefk/connectors/tree/making-moves)
  - [5.2 - Adding interactivity](https://github.com/tauseefk/connectors/tree/interactivity)
- Chapter 6
  - [Chapter 6 - Computing the winner](https://github.com/tauseefk/connectors/tree/winning-move)

## Other Resources

[WASM Game of Life](https://rustwasm.github.io/book/game-of-life/introduction.html)

[Bare Metal WASM](https://cliffle.com/blog/bare-metal-wasm/)
