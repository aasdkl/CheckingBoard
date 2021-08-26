set -e

yarn build --base='CheckingBoard'

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/aasdkl/CheckingBoard.git master:gh-pages

cd -