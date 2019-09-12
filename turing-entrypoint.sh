#!/usr/bin/env bash

set -x;

/bin/bash /entrypoint.sh mysqld > /dev/null 2>&1 &

cp .env.example .env;
npm run build;
if [[ ${NODE_ENV} == 'development' ]]; then
  npm run start:dev
else
  npm run start
fi
