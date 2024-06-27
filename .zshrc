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

# pnpm
export PNPM_HOME="/home/ilmike/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end


# ---- BAT -----

export BAT_THEME="Catppuccin Macchiato"


# ---- FZF -----

# catppuccin theme
export FZF_DEFAULT_OPTS=" \
--color=bg+:#363a4f,bg:#24273a,spinner:#f4dbd6,hl:#ed8796 \
--color=fg:#cad3f5,header:#ed8796,info:#c6a0f6,pointer:#f4dbd6 \
--color=marker:#f4dbd6,fg+:#cad3f5,prompt:#c6a0f6,hl+:#ed8796"

# Set up fzf key bindings and fuzzy completion
eval "$(fzf --zsh)"

# ---- Eza (better ls) -----

alias ls="eza --color=always --long --git --no-filesize --icons=always --no-time --no-user --no-permissions"

# -------------

export FZF_CTRL_T_OPTS="--preview 'bat -n --color=always --line-range :500 {}'"
export FZF_ALT_C_OPTS="--preview 'eza --tree --color=always {} | head -200'"

# Advanced customization of fzf options via _fzf_comprun function
# - The first argument to the function is the name of the command.
# - You should make sure to pass the rest of the arguments to fzf.
_fzf_comprun() {
  local command=$1
  shift

  case "$command" in
    cd)           fzf --preview 'eza --tree --color=always {} | head -200' "$@" ;;
    export|unset) fzf --preview "eval 'echo $'{}"         "$@" ;;
    ssh)          fzf --preview 'dig {}'                   "$@" ;;
    *)            fzf --preview "bat -n --color=always --line-range :500 {}" "$@" ;;
  esac
}


#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

