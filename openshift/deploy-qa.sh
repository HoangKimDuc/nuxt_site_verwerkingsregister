#!/bin/bash

set -e

echo "Running as user: $(oc whoami)"
echo ""
echo "Changing project to webcomponentsqa"
oc project webcomponentsqa

echo "Processing template and creating"
oc process -f openshift/openshift-qa.yml | oc create -f - || true
NOT_CREATED=$?

if [ $NOT_CREATED ]; then
  echo "Resources already exist, replacing"
  oc process -f openshift/openshift-qa.yml | oc replace -f - || true
fi
echo "Done."
