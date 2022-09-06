npm install
npm run compile
tree dist
cp -r static/ dist/static/
cp package.json ./dist/package.json
cp .npmrc ./dist/.npmrc
cd ./dist || exit
npm publish

