#!/bin/bash

set -e

echo "Running as user: $(oc whoami)"
echo ""
echo "Changing project to webcomponentsdv"
oc project webcomponentsdv

echo "Importing nodejs S2I image"
oc import-image registry.access.redhat.com/rhscl/nodejs-8-rhel7:latest --confirm || true

echo "Processing template and creating"
oc process -f openshift/openshift-dvdv.yml | oc create -f - || true
NOT_CREATED=$?

if [ $NOT_CREATED ]; then
  echo "Resources already exist, replacing"
  oc process -f openshift/openshift-dvdv.yml | oc replace -f - || true
fi
echo "Done."
