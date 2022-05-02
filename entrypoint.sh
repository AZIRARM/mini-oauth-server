#!/bin/sh

echo "Start entrypoint"

URL=${MINI_CLOUD_CONFIG}/${ENV}"/mini-oauth-server/?option=properties"
echo "Url of cloud config : ${URL}"

echo "Retreive secrets from cloud config"
#SECRETS
curl -X POST  ${URL} \
   --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --header "api-key: "${API_GATEWAY_SECRET}>/app/.env

echo "[server-startup] Starting node application : mini-oauth-server"
exec node /app/server.js
