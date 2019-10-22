#!/bin/bash

set +e

echo "Running as user: $(oc whoami)"
echo ""
echo "Changing project to webcomponentspr"
oc project webcomponentspr

echo "Processing template and creating"
oc process -f openshift/openshift-pr.yml | oc create -f - || true
NOT_CREATED=$?

if [ $NOT_CREATED ]; then
  echo "Resources already exist, replacing"
  oc process -f openshift/openshift-pr.yml | oc replace -f - || true
fi
echo "Done."
