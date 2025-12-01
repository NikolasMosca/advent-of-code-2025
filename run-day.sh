#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: yarn day <number>"
  echo "Example: yarn day 1"
  exit 1
fi

tsx "day-$1/index.ts"
