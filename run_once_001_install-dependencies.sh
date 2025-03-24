#!/bin/bash

# Install Homebrew
if ! command -v brew &> /dev/null; then
    echo "[Installing] Homebrew..."
    NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "[Skipping] Homebrew already installed"
fi
