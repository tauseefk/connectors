## Connecto.rs

This is connect-4 with a Rust core compiled to WASM, wrapped in Typescript, rendered in HTML.

The goal is to encourage more Javascript engineers to write Rust.
Demonstrating the `why` of writing Rust is outside the scope of this repository, demonstrating all the great things you can do with Rust is also outside the scope as I am in no way an authority on idiomatic Rust.

But if you're already curious about Rust, hopefully this repository will speed up the process of going from `whaaa` to `whoaa`.

May the connect-4s be with you.

### Outcomes

These are some of the things you will be able to do by the end of this series:

- see similarities and differences between parts of Rust and Javascript
- send data back and forth between the Rust (WASM) and Javascript context
- expose the minimal set of APIs from your Rust code to structure your application
- play connect 4 in a browser

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (for running the web-server)
- [Rust toolchain](https://www.rust-lang.org/tools/install) (for running the Rust code)
- [wasm-pack](https://drager.github.io/wasm-pack/installer/) (for compiling to WASM)

### Development

```bash
# building the engine
cd connecto.rs
chmod +x build.sh
./build.sh

# starting the node server
cd www
npm i
npm run dev
```

### Directory Structure

```
connectors/
├─ connecto.rs/                // Rust workspace
│  ├─ build.sh                 // compiles engine to WASM
│  └─ connectors/
│     ├─ src/lib.rs            // Rust entry point
│     └─ src/engine.rs         // engine code
└─ www/                        // client-side code
```

### Blog Posts

- [Rust for Javascript Engineers - Intro](https://www.afloat.boats/posts/rust-for-javascript-engineers-pt-1)

#### Code branches

- Part 0 - Prologue
  - [Initial Commit](https://github.com/tauseefk/connectors/tree/making-connections)
  - [Structuring Data](https://github.com/tauseefk/connectors/tree/data-as-enums)
- Part 1 - Setting the board
  - [Calling JS functions from Rust](https://github.com/tauseefk/connectors/tree/calling-home)
  - [Using `js_sys` crate](https://github.com/tauseefk/connectors/tree/calling-home-again)
  - [Returning data to Javascript](https://github.com/tauseefk/connectors/tree/returning-a-grid)
  - [Rendering the board as HTML](https://github.com/tauseefk/connectors/tree/rendering-html-grid)
- Part 2 - Playing the game
  - [Making moves](https://github.com/tauseefk/connectors/tree/making-moves)
  - [Adding interactivity](https://github.com/tauseefk/connectors/tree/interactivity)
- Part 3 - Winning the game
  - [Computing the winner](https://github.com/tauseefk/connectors/tree/winning-move)
- Bonus - Dev ops
  - [Build and deploy](https://github.com/tauseefk/connectors/tree/deployment)

### Other Resources

[The Rust Book](https://doc.rust-lang.org/book/title-page.html)

[Rust by Example](https://doc.rust-lang.org/rust-by-example/index.html)

[WASM Game of Life](https://rustwasm.github.io/book/game-of-life/introduction.html)

[Bare Metal WASM](https://cliffle.com/blog/bare-metal-wasm/)
