#!/bin/sh

cd ./turing-config
npm version $1 --no-git-tag-version

cd ../turing-example
npm version $1 --no-git-tag-version

cd ../turing-health
npm version $1 --no-git-tag-version

cd ../turing-logging
npm version $1 --no-git-tag-version

cd ../turing-server
npm version $1 --no-git-tag-version

cd ../turing-status
npm version $1 --no-git-tag-version

cd ../turing-vault
npm version $1 --no-git-tag-version

cd ..
VERSION=$(npm version $1 --no-git-tag-version)

git ci -am $VERSION
git push

cd ./turing-config
npm publish

cd ../turing-example
npm publish

cd ../turing-health
npm publish

cd ../turing-logging
npm publish

cd ../turing-server
npm publish

cd ../turing-status
npm publish

cd ../turing-vault
npm publish

cd ..
npm publish
