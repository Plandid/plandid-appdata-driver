DIR = "./.git"

if [ -d "$DIR"]; then
    git config core.hooksPath gitHooks
fi