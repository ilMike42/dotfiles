# Created by newuser for 5.9

# source antidote
source ${ZDOTDIR:-~}/.antidote/antidote.zsh


# initialize plugins statically with ${ZDOTDIR:-~}/.zsh_plugins.txt
antidote load


# start oh my posh
eval "$(oh-my-posh init zsh --config ~/.config/oh-my-posh/my-catppuccin-theme.toml)"

# PATH
export PATH=$PATH:/home/ilmike/.local/bin


# zoxide
eval "$(zoxide init zsh)"

# history
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=1000
setopt SHARE_HISTORY

# zsh case insensitive
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'
autoload -Uz compinit && compinit

# aliases

# GIT
source ~/.git_aliases.sh

# dotfiles
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME' 
alias s="kitten ssh"

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"


# pnpm
export PNPM_HOME="/home/ilmike/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
