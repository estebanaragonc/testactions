#!/bin/bash

# Define the path to the TypeScript file
ts_file="./updateTestSuiteNames.ts"

# Define the path to the JavaScript output file
js_file="./updateTestSuiteNames.js"

# Define the path to the base XML report folder
base_folder="../"

# Transpile TypeScript to JavaScript
tsc $ts_file

# Check if transpilation was successful
if [ $? -eq 0 ]; then
  echo "Transpilation successful."
else
  echo "Transpilation failed. Exiting."
  exit 1
fi

# Execute JavaScript with Node.js
node $js_file $base_folder

# Check if execution was successful
if [ $? -eq 0 ]; then
  echo "XML files updated successfully."
else
  echo "Error updating XML files. Exiting."
  exit 1
fi