#!/usr/bin/env sh

set -e

npm run build

cd docs/.vitepress/dist

git init -b main
git add -A
git commit -m 'deploy'

git push -f git@vam:maomincoding/strve-doc-zh.git main:pages
git push -f git@mm:maomincoding/strve-doc-zh.git main:pages

cd -