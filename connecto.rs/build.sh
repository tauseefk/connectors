#!/bin/bash

set -euo pipefail

TARGET=web
OUTDIR=../../www/connectors

wasm-pack build connectors --target $TARGET --release --out-dir $OUTDIR
