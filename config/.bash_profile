# MongoDB
export PATH=$PATH:/Users/jenwilhelm/mongodb-osx-x86_64-2.6.0/bin:/usr/local/sbin:/usr/local/bin

# Git
CYAN="\[\033[0;36m\]" 
RED="\[\033[0;31m\]" 
WHITE="\[\033[0;37m\]" 

if [ -n "$PS1" ]; then PS1="$CYAN \w$RED \`ruby -e \"print (%x{git branch 2> /dev/null}.split(%r{\n}).grep(/^\*/).first || '').gsub(/^\* (.+)$/, '(\1) ')\"\`$WHITE$ "; fi

CLICOLOR="YES";    export CLICOLOR
LSCOLORS="HxGxFxdxCxDxDxhbadExEx";    export LSCOLORS

# Aliases
alias l='ls -la'
alias ll='ls -asl'
alias sl='/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl'
alias bp='sl ~/.bash_profile'
alias ehosts='sl /etc/hosts'