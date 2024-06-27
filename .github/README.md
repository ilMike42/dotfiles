# My Dotfiles

This repository contains personal configuration files (dotfiles) used to customize and set up various development environments on Linux and macOS. It includes configurations for Zsh, Vim, Git, and other tools.

You can find my NeoVim dotfiles in a [separate repository](https://github.com/ilMike42/kickstart.nvim).

The entire project is based on a [article](https://harfangk.github.io/2016/09/18/manage-dotfiles-with-a-git-bare-repository.html) I found online, all the credits for the alias configuration goes to the author.

## Repository Contents

- `.config/` - Directory for application configurations.
- `.git_aliases.sh` - Custom Git aliases.
- `.vimrc` - Vim configuration.
- `.zsh_linux.sh` - Zsh configuration for Linux.
- `.zsh_macOS.sh` - Zsh configuration for macOS.
- `.zsh_plugins.txt` - List of Zsh plugins.
- `.zshrc` - Main Zsh configuration.

## Requirements
- zsh
- antidote
- zoxide
- oh-my-posh
- fzf
- bat
- eza
- pnpm (?)


## Installing

To install these dotfiles:

```bash
    echo 'alias dotfiles="/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME"' >> $HOME/.zshrc
    source ~/.zshrc
    echo ".dotfiles.git" >> .gitignore
    git clone --bare https://github.com/ilMike42/dotfiles $HOME/.dotfiles.git
    dotfiles checkout
    dotfiles config --local status.showUntrackedFiles no
```

## Usage

Use it as it is: a git alias. So:

```bash
    dotfiles add .newDotfile
    dotfiles commit -m 'added new dotfile'
    dotfiles pull
    dotfiles push
```

## Previous Setup

This is the initial setup I used to create the repo:

```bash
git init --bare $HOME/.dotfiles.git
echo 'alias dotfiles="/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME"' >> $HOME/.zshrc
source ~/.zshrc
dotfiles config --local status.showUntrackedFiles no
```

## License

This project does not have a specific license. Feel free to use and modify these configuration files for your personal needs.

