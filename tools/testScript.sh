# Prettier all the files
npx prettier -w .
# Check node server for errors
npx google-closure-compiler --checks_only --js=server.js --externs=tools/externs.js --compilation_level=ADVANCED --module_resolution=NODE
# Check all js files for errors
npx google-closure-compiler --checks_only --js=js/script.js --compilation_level=ADVANCED
