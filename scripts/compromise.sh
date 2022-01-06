#!/bin/bash

mkdir -p data
rm -rf data/compromise
svn export https://github.com/spencermountain/compromise.git/trunk/data data/compromise --force
rm data/compromise/index.js data/compromise/misc.js
