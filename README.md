**Install**

`npm install jsdoc2md-anchors --save`

**Usage**

This utility outputs the github format by default. Its possible to pass 'bitbucket' as parameter in order to output bitbucket's format:
`jsdoc2md-anchors [bitbucket]`

**Example**

`jsdoc2md lib/**/*.js -t readme.hbs | jsdoc2md-anchors bitbucket > README.md`
