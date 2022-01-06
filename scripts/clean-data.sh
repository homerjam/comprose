#!/bin/bash

export LC_CTYPE=C
export LANG=C

# change cjs > module
grep -rl 'module\["exports"\] =' ./data | xargs sed -i '' -e 's/module\["exports"\] =/export default/g'
grep -rl "module\['exports'\] =" ./data | xargs sed -i '' -e "s/module\['exports'\] =/export default/g"
grep -rl 'module.exports =' ./data | xargs sed -i '' -e 's/module.exports =/export default/g'

# delete index.js files
find ./data -name 'index.js' -delete

# delete any files with require()
rm -f $(grep -rl "^[^\/\/].*require(.*)" ./data)

# delete any files with #{pattern}
rm -f $(grep -rl "#{.*}" ./data)

# delete any files with {{pattern}}
# rm -f $(grep -rl "{{.*}}" ./data)

# delete 'credit_card' directories
rm -rf $(find ./data -type d -name credit_card)

# lint and fix
# eslint data/* --fix
