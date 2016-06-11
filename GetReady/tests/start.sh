#!/usr/bin/env bash

# lambda-local -l ../src/index.js -h handler -e events/alexa-start-session.js
lambda-local -l ../src/index.js -h handler -e events/alexa-BrownBear-ISeeIntent.js

