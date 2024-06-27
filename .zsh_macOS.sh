#####################################################
################## Mac ZSH settings @@###############
#####################################################

alias notifyDone='terminal-notifier -title "Terminal" -message "Done with task!" -sound default' 
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
alias studio="open -a /Applications/Android\ Studio.app"
alias python="python3"

# Android export
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export ANDROID_SDK_ROOT=~/Library/Android/sdk

# IDEA export
export PATH=${PATH}:"/Applications/IntelliJ IDEA CE.app/Contents/MacOS"

# Gem homebrew bin
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"



