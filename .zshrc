# Created by newuser for 5.9

# ********** ANTIDOTE **********
# source antidote
source ${ZDOTDIR:-~}/.antidote/antidote.zsh

# ********** PATH **********
export PATH=$PATH:/home/ilmike/.local/bin

# initialize plugins statically with ${ZDOTDIR:-~}/.zsh_plugins.txt
antidote load

# ********** OH MY POSH ***********
# start oh my posh
eval "$(oh-my-posh init zsh --config ~/.config/oh-my-posh/my-catppuccin-theme.toml)"

# ********** ZOXIDE **********
eval "$(zoxide init zsh)"

# ********** HISTORY CONFIG **********
HISTFILE=~/.zsh_history
export HISTSIZE=5000000
export SAVEHIST=$HISTSIZE
setopt SHARE_HISTORY

setopt EXTENDED_HISTORY          # Write the history file in the ':start:elapsed;command' format.
setopt HIST_EXPIRE_DUPS_FIRST    # Expire a duplicate event first when trimming history.
setopt HIST_FIND_NO_DUPS         # Do not display a previously found event.
setopt HIST_IGNORE_ALL_DUPS      # Delete an old recorded event if a new event is a duplicate.
setopt HIST_IGNORE_DUPS          # Do not record an event that was just recorded again.
setopt HIST_IGNORE_SPACE         # Do not record an event starting with a space.
setopt HIST_SAVE_NO_DUPS         # Do not write a duplicate event to the history file.
setopt SHARE_HISTORY             # Share history between all sessions.


# ********** ZSH CASE INSENSITIVE **********
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'
autoload -Uz compinit && compinit

# ********** ALIASES **********

# git
source ~/.git_aliases.sh

# dotfiles
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME' 
alias s="kitten ssh"



# ********** PNPM **********
export PNPM_HOME="/home/ilmike/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac


# ********** BAT **********
export BAT_THEME="Catppuccin Macchiato"



# ********** FZF **********
# catppuccin theme
export FZF_DEFAULT_OPTS=" \
--color=bg+:#363a4f,bg:#24273a,spinner:#f4dbd6,hl:#ed8796 \
--color=fg:#cad3f5,header:#ed8796,info:#c6a0f6,pointer:#f4dbd6 \
--color=marker:#f4dbd6,fg+:#cad3f5,prompt:#c6a0f6,hl+:#ed8796"

# Set up fzf key bindings and fuzzy completion
eval "$(fzf --zsh)"

# add bat preview to CTRL-T
export FZF_CTRL_T_OPTS="--preview 'bat -n --color=always --line-range :500 {}'"

# add eza --tree preview to ALT-C
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


# ********** EZA **********
alias lsa="eza --color=always --long --git --no-filesize --icons=always --no-time --no-user --no-permissions"


#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

# ********** ZELLIJ **********
# Autostart zsh in zellij
# eval "$(zellij setup --generate-auto-start zsh)"

# bun completions
[ -s "/home/ilmike/.bun/_bun" ] && source "/home/ilmike/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
