#!/bin/bash
cd ./_artifact
HEROKU_APP='site-4wardfabrication-staging'
heroku apps | grep "^$HEROKU_APP\b" || heroku create --no-remote "$HEROKU_APP" --stack 'cedar'
git init .
git add --all
MESSAGE="Site update at $(date '+%d/%m/%Y %H:%M:%S')"
git commit -m "$MESSAGE"
git push --force "git@heroku.com:$HEROKU_APP.git" 'master:master'
