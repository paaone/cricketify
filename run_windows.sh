#!/usr/bin/env bash
# Convenience script for Windows users using Git Bash or WSL

# Install backend dependencies
pushd backend >/dev/null
npm install
npm start &
BACK_PID=$!
popd >/dev/null

# Install frontend dependencies and start dev server
pushd frontend >/dev/null
npm install
npm run start &
FRONT_PID=$!
popd >/dev/null

# Wait for servers
wait $BACK_PID $FRONT_PID
