#!/usr/bin/env bash
set -euo pipefail

# LocalStack init script to create required S3 buckets for development.
# Placed in localstack/init-scripts, this will be executed by LocalStack
# when the container becomes ready (/etc/localstack/init/ready.d/).

# List of buckets to create (matches .env defaults)
BUCKETS=(
  "${S3_STORAGE_EXPORTS_BUCKET:-graphidea-exports}"
  "${S3_STORAGE_FILES_BUCKET:-graphidea-files}"
  "${S3_STORAGE_MODULES_BUCKET:-graphidea-modules}"
  "${S3_STORAGE_SEARCH_BUCKET:-graphidea-search}"
  "${S3_STORAGE_SNAPSHOT_IMPORTS_BUCKET:-graphidea-snapshots}"
)

# awslocal is a thin wrapper for aws CLI provided in LocalStack images.
# Wait until LocalStack is up and responding to S3 API calls.

echo "[localstack-init] waiting for LocalStack S3 API..."
RETRIES=0
until awslocal s3api list-buckets >/dev/null 2>&1; do
  sleep 1
  RETRIES=$((RETRIES+1))
  if [ "$RETRIES" -ge 60 ]; then
    echo "[localstack-init] LocalStack S3 not available after ${RETRIES}s. Exiting." >&2
    exit 1
  fi
done

echo "[localstack-init] LocalStack S3 is available, creating buckets..."
for b in "${BUCKETS[@]}"; do
  if [ -z "$b" ]; then
    continue
  fi
  echo "[localstack-init] creating bucket: $b"
  # mb returns non-zero if bucket already exists; ignore errors
  awslocal s3 mb "s3://$b" || true
  # Optionally enable versioning for files bucket and modules if desired
  if [ "$b" = "${S3_STORAGE_FILES_BUCKET:-graphidea-files}" ] || [ "$b" = "${S3_STORAGE_MODULES_BUCKET:-graphidea-modules}" ]; then
    echo "[localstack-init] enabling versioning for $b"
    awslocal s3api put-bucket-versioning --bucket "$b" --versioning-configuration Status=Enabled || true
  fi
done

echo "[localstack-init] bucket setup complete."

# Keep exit 0 to indicate success
exit 0
