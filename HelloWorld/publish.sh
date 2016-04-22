#!/usr/bin/env bash

rm index.zip
cd src
zip -X -r ../index.zip *
cd ..
aws lambda update-function-code --function-name StarterKit  --zip-file fileb://index.zip
