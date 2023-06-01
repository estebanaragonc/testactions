#!/bin/bash

# Define the path to the TypeScript file
ts_file="./cleanXMLReport.ts"

# Define the path to the JavaScript output file
js_file="./cleanXMLReport.js"

# Define the path to the base XML report folder
base_folder="../"

# Function to clean XML reports using Node.js
clean_xml_reports() {
  find "$base_folder" -name "*.xml" -type f -print0 | while IFS= read -r -d $'\0' file; do
    node "$js_file" "$file"
  done
}

# Compile the TypeScript file to JavaScript
tsc "$ts_file" --outFile "$js_file"

# Call the function to clean XML reports
clean_xml_reports