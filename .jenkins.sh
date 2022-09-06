npm install
npm run compile
tree dist
cp -r static/ dist/static/
cp package.json ./dist/package.json
cp .npmrc ./dist/.npmrc
rm .npmrc
cp .npmignore ./dist/.npmignore
tree -a -L 1
cd ./dist || exit
echo .npmrc
npm publish

