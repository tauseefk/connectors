# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## VCS

This project uses `jj-vsc` version `0.32`, refer to the documentation when needed at the url `https://jj-vcs.github.io/jj/v0.32.0/tutorial/`

- Never push things automatically to `main`, always use `jj git push -c @`
- always create a new empty change when working on a TODO item from the plan using `jj new -m "CLAUDE: <message>"`

## Development Commands

### Frontend (www/)
- `npm run build` - Build the project for production
- `npm run dev` - Start all development services in parallel
- `npm run dev:build` - Watch and rebuild on TypeScript/WASM changes
- `npm run dev:server` - Run the WebSocket signaling server on port 8080
- `npm run dev:tsc` - Run TypeScript compiler in watch mode
- `npm run start` - Start the built application
- `npm run lint` - Lint TypeScript code with Biome

### Rust Engine (flashlighte.rs/)
- `./build.sh` - Build WASM modules and output to www/engine and www/pathfinder
- `cargo build` - Build Rust workspace (from flashlighte.rs/ directory)
- `cargo test` - Run Rust tests

### Server (www/flashes-server/)
- `shuttle run --working-directory flashes-server --port 8080` - Run development server

## Architecture

### Core Structure
This is a multiplayer game engine with a Rust/WASM core and TypeScript frontend:

**Rust Engine (flashlighte.rs/)**
- **flashlight/** - Main game engine with CRDT-based state management using Yrs
- **pathfinder/** - Pathfinding algorithms
- **batteries/** - Core utilities and data structures

**Frontend (www/)**
- **src/** - TypeScript game client using reactive streams (rextream)
- **engine/** - Built WASM modules from flashlight
- **pathfinder/** - Built WASM modules from pathfinder
- **flashes-server/** - WebSocket signaling server for multiplayer

### Key Patterns

**CRDT State Management**
- Game state uses Yrs CRDT documents for conflict-free multiplayer synchronization
- State changes are serialized as binary deltas and transmitted between clients

**WASM Integration**
- Rust engine compiled to WASM with wasm-bindgen
- TypeScript interfaces exposed via globalAPI.ts
- Binary state deltas sent via window.sendDelta() callback

**Reactive Event Handling**
- Frontend uses reactive streams for all user input and game events
- Separate streams for keyboard, mouse, timers, and announcements
- Event handlers in eventHandlers.ts coordinate between UI and WASM engine

**Game Architecture**
- Grid-based game with fog and flashlight mechanics
- Camera system for viewport management
- Visibility calculations using shadowcaster library

### Build Process
- Rust WASM modules built via build.sh using wasm-pack
- TypeScript bundled with esbuild using custom build.js
- WASM files loaded as modules in browser
- Development uses file watchers and parallel processes via npm-run-all

### Multiplayer Components
- WebSocket signaling server handles player/spectator sessions
- WebRTC used for direct client communication
- CRDT state vectors synchronized between clients
- 1 player + 1 spectators supported per game session

## Coding Guidelines

### Rust coding guidelines

- Prioritize code correctness and clarity. Speed and efficiency are secondary priorities unless otherwise specified.
- Do not write organizational or comments that summarize the code. Comments should only be written in order to explain "why" the code is written in some way in the case there is a reason that is tricky / non-obvious.
- Prefer implementing functionality in existing files unless it is a new logical component. Avoid creating many small files.
- Avoid using functions that panic like `unwrap()`, instead use mechanisms like `?` to propagate errors.
- Be careful with operations like indexing which may panic if the indexes are out of bounds.
- Never silently discard errors with `let _ =` on fallible operations. Always handle errors appropriately:
  - Propagate errors with `?` when the calling function should handle them
  - Use `.log_err()` or similar when you need to ignore errors but want visibility
  - Use explicit error handling with `match` or `if let Err(...)` when you need custom logic
  - Example: avoid `let _ = client.request(...).await?;` - use `client.request(...).await?;` instead
- When implementing async operations that may fail, ensure errors propagate to the UI layer so users get meaningful feedback.
- Never create files with `mod.rs` paths - prefer `src/some_module.rs` instead of `src/some_module/mod.rs`.

### General coding workflow: Step-by-Step Methodology

When responding to user instructions, Claude should follow this process to ensure clarity, correctness, and maintainability:

- Consult Relevant Guidance: When the user gives an instruction, consult the relevant instructions from CLAUDE.md files (both root and directory-specific) for the request.
- Clarify Ambiguities: Based on what you could gather, see if there's any need for clarifications. If so, ask the user targeted questions before proceeding.
- Break Down & Plan: Break down the task at hand and chalk out a rough plan for carrying it out, referencing project conventions and best practices.
- Trivial Tasks: If the plan/request is trivial, go ahead and get started immediately.
- Non-Trivial Tasks: Create a design-doc in the /design-docs directory, using the /design-docs/template.md
- Track Progress: Use a to-do list (internally, or optionally in a TODOS.md file) to keep track of your progress on multi-step or complex tasks.
- If Stuck, Re-plan: If you get stuck or blocked, return to step 3 to re-evaluate and adjust your plan.
- Update Documentation: Once the user's request is fulfilled, update relevant anchor comments (AIDEV-NOTE, etc.) and CLAUDE.md files in the files and directories you touched.
- User Review: After completing the task, ask the user to review what you've done, and repeat the process as needed.
- Session Boundaries: If the user's request isn't directly related to the current context and can be safely started in a fresh session, suggest starting from scratch to avoid context confusion.
