#!/bin/bash

if [[ $VERCEL_ENV == "production"  ]] ; then 
  git log -1 --pretty=oneline --abbrev-commit | grep -w "chore" && exit 0 || exit 1
else
  exit 1
fi