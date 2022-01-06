#!/bin/bash

# compromise
mkdir -p src/data
rm -rf src/data/compromise
svn export https://github.com/spencermountain/compromise.git/trunk/data src/data/compromise --force
grep -rl 'module.exports =' ./src/data/compromise | xargs sed -i '' -e 's/module.exports =/export default/g'
rm src/data/compromise/index.js src/data/compromise/misc.js
