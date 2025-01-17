curl -X POST \
-H "Authorization: token ${GITHUB_TOKEN}" \
-H "Accept: application/vnd.github+json" \
https://api.github.com/repos/acuminous/knuff-github-driver/issues \
-d '{
  "title": "Label Bug",
  "body": "Demonstrates the Label Bug",
  "labels": ["l1", "l2", "knuff:test-a3e780fd40034e1502fa", "knuff:2024-12-25"]
}'
