#!/usr/bin/env bash

# /Users/mccaul/Projects/Skills/aa/alexa-app-server/examples/apps


project=$1

target=../../Projects/Skills/aa/alexa-app-server/examples/apps/
echo "Deploying your project  $project  to alexa-app-server!"
# echo ./$project
rm -r $target/$project
cp -r ./$project $target

echo "all done"
