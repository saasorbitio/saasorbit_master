#!/bin/bash

# SaaS Orbit Deployment Script
# This script builds both frontend (vendor) and admin apps, then deploys to Firebase

set -e

echo "🚀 Starting SaaS Orbit deployment..."
echo ""

# Build frontend (vendor app)
echo "📦 Building frontend (vendor app)..."
cd frontend
npm run build
cd ..
echo "✅ Frontend built successfully"
echo ""

# Build admin
echo "📦 Building admin..."
cd admin
npm run build
cd ..
echo "✅ Admin built successfully"
echo ""

# Copy frontend dist to admin dist/vendor
echo "📋 Copying frontend (vendor) app to admin dist/vendor..."
mkdir -p admin/dist/vendor
rm -rf admin/dist/vendor/*
cp -r frontend/dist/* admin/dist/vendor/
echo "✅ Frontend copied to vendor directory successfully"
echo ""

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting
echo "✅ Deployment complete!"
echo ""

echo "🎉 SaaS Orbit deployed successfully!"
echo "📍 Admin: https://project-softclap7676674426.web.app"
echo "📍 Vendor (Frontend): https://project-softclap7676674426.web.app/vendor"
