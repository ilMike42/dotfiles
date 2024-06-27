#####################################################
################# Linux ZSH settings ################
#####################################################

# Aliases
alias pacman-autoremove='sudo pacman -R $(pacman -Qdtq)'

# Add local bins to path
PATH=$PATH:~/.local/bin

# Tilix VTE fix
if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi
