#!/bin/zsh
# Build both apps and prepare for Firebase deploy

# 1. Build frontend
cd frontend && npm run build && cd ..

# 2. Build admin
cd admin && npm run build && cd ..

# 3. Copy admin build to frontend/dist/vendor
rm -rf frontend/dist/vendor
mkdir -p frontend/dist/vendor
cp -r admin/dist/* frontend/dist/vendor/

echo "Builds complete. You can now run: firebase deploy"