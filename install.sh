#!/bin/bash -e
if [ -z "${VERTICAL}" ] ; then
  echo "VERTICAL must be set"
  exit 1
fi
if [ -z "${MICROSERVICE}" ] ; then
  echo "MICROSERVICE must be set"
  exit 1
fi
if [ -z "${VERSION}" ] ; then
  echo "VERSION must be set"
  exit 1
fi

# generate package.json with version, microservice and vertical
sed -e "s/\$VERTICAL/${VERTICAL}/g" \
    -e "s/\$MICROSERVICE/${MICROSERVICE}/g" \
    -e "s/\$VERSION/${VERSION}/g" \
    package.template.json > package.json

# generate bower.json with version, microservice and vertical
sed -e "s/\$VERTICAL/${VERTICAL}/g" \
    -e "s/\$MICROSERVICE/${MICROSERVICE}/g" \
    -e "s/\$VERSION/${VERSION}/g" \
    bower.template.json > bower.json

rm -rf node_modules bower_components target && npm install && npm test
