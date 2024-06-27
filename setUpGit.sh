#!/bin/bash

# Set Git user details from environment variables
git config --global user.name "$GIT_USER_NAME"
git config --global user.email "$GIT_USER_EMAIL"

# Initialize Git repository if it doesn't exist
if [ ! -d ".git" ]; then
  git init
fi

# Set remote origin if it doesn't exist
if ! git remote | grep -q origin; then
  git remote add origin https://$GIT_USER_NAME:$GIT_TOKEN@github.com/anmol420/JokesAPI.git
fi