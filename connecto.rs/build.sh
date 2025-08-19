#!/bin/bash

set -euo pipefail

TARGET=bundler
OUTDIR=../../www/connectors

wasm-pack build connectors --target $TARGET --release --out-dir $OUTDIR
