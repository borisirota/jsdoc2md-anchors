#!/usr/bin/env node
'use strict';

var replace = require('replacestream');
var anchor = require('anchor-markdown-header');
var SERVICES = ['github', 'bitbucket'];
var service = SERVICES[0];

if ((process.argv.length >= 2) && SERVICES.indexOf(process.argv[2]) !== -1) {
    service = process.argv[2];
}

if (service === SERVICES[0]) {

    process.stdin
        //make the inner links (anchors) inside the readme to be compatible with github
        .pipe(replace(/\[(.+)\]\((#.+)\)/g, function (match) {
            return anchor(match[1], 'github.com');
        }))
        .pipe(process.stdout);

} else {

    process.stdin
        //remove all local anchors
        .pipe(replace(/\n<a name=.+><\/a>/g, ''))
        //adjust to bitbucket's markdown levels
        .pipe(replace(/(  +)([*\-])/g, function (match) {
            return new Array(match[1].length + 1).join('  ') + match[2];
        }))
        //make the inner links (anchors) inside the readme to be compatible with bitbucket
        .pipe(replace(/\[(.+)\]\((#.+)\)/g, function (match) {
            return anchor(match[1], 'bitbucket.org');
        }))
        .pipe(process.stdout);

}
