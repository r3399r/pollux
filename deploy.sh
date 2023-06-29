#!/bin/bash
set -e

env=$1
project=pollux
subDomain=infinity
domain=celestialstudio.net

echo ====================================================================================
echo env: $env
echo project: $project
echo domain: $subDomain.$domain
echo ====================================================================================

echo deploy backend AWS...
aws cloudformation package --template-file aws/cloudformation/template.yaml --output-template-file packaged.yaml --s3-bucket y-cf-midway-singapore
aws cloudformation deploy --template-file packaged.yaml --stack-name $project-$env-stack --parameter-overrides TargetEnvr=$env Project=$project SubDomain=$subDomain Domain=$domain --no-fail-on-empty-changeset --s3-bucket y-cf-midway-singapore
echo ====================================================================================

echo deploy frontend to S3...
npm ci
npm run pre:deploy
aws s3 sync ./dist s3://$project-$env-y --delete --cache-control no-cache
echo ====================================================================================
