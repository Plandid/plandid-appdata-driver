#!/bin/sh

if [ "$1" = "" ]; then
    echo "No commit message passed"
    exit 1
else
    npm run increment-feature
    git add .
    git commit -m "$1"
    exit 0
fi