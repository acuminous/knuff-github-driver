#!/bin/bash
set -x

OWNER=acuminous
REPO=knuff-github-driver
ID=$(openssl rand -base64 12)

curl -X POST \
-H "Authorization: token ${GITHUB_TOKEN}" \
-H "Accept: application/vnd.github+json" \
https://api.github.com/repos/${OWNER}/${REPO}/issues \
-d "{
  \"title\": \"Label Bug\",
  \"body\": \"Demonstrates the Label Bug\",
  \"labels\": [\"knuff:test-${ID}\"]
}"
