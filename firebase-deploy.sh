#!/bin/bash

# Firebase deployment script
echo "Starting Firebase deployment..."

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "Installing firebase-tools..."
    npm install -g firebase-tools || npm install firebase-tools
fi

# Firebase configuration
PROJECT_ID="senjin-firebase-github"
SITE_NAME="senjin-firebase-github"

# Create firebase.json if not exists
if [ ! -f firebase.json ]; then
    echo "Creating firebase.json..."
    cat > firebase.json << EOF
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "*.md",
      "*.sh",
      "*.js",
      "package*.json"
    ],
    "rewrites": []
  }
}
EOF
fi

# Update .firebaserc
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF

echo "Configuration complete!"
echo ""
echo "Next steps:"
echo "1. Run: npx firebase login"
echo "2. Run: npx firebase projects:create $PROJECT_ID --display-name 'Firebase GitHub Project' (if project doesn't exist)"
echo "3. Run: npx firebase deploy"
echo ""
echo "Or use this one-liner after login:"
echo "npx firebase deploy --project $PROJECT_ID"