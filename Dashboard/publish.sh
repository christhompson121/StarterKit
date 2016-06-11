#!/usr/bin/env bash
# be sure this shell script has execute and write permissions  (use chmod if needed)

rm index.zip
cd src
zip -X -r ../index.zip *
cd ..
aws lambda update-function-code --function-name Dashboard  --zip-file fileb://index.zip

