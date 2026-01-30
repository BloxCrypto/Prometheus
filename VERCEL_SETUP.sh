#!/bin/bash
# Vercel Deployment Setup Script

echo "🚀 Prometheus Web Obfuscator - Vercel Deployment Setup"
echo "======================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized"
    echo "Run: git init"
    exit 1
fi

echo "✅ Git repository detected"
echo ""

# Check directory structure
echo "📁 Checking directory structure..."

if [ ! -d "public" ]; then
    echo "❌ public/ directory not found"
    exit 1
fi

if [ ! -d "api" ]; then
    echo "❌ api/ directory not found"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found"
    exit 1
fi

echo "✅ All required directories exist"
echo ""

# List files
echo "📄 File structure:"
echo ""
echo "public/:"
ls -1 public/
echo ""
echo "api/:"
ls -1 api/
echo ""

# Check if vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI is installed"
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin master"
    echo "2. Go to https://vercel.com"
    echo "3. Import your GitHub repository"
    echo "4. Vercel will auto-detect and deploy!"
    echo ""
else
    echo "⚠️  Vercel CLI not installed"
    echo "Install with: npm i -g vercel"
    echo ""
fi

echo "📚 For more info, see README_WEB.md"
