#!/bin/sh

echo "Start entrypoint"

MINI_CLOUD_CONFIG=http://192.168.0.104:11111/secrets
ENV=dev
API_GATEWAY_SECRET=Zmr03yATFimLW2xw7D3Vz4GfGDfYC1pB

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
