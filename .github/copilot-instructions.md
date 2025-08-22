# RubberDuckDev Blog - Gatsby TypeScript Project

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

This is a static blog generator built with Gatsby, TypeScript, and React. The blog is deployed to Azure Static Web Apps and serves content from https://rubberduckdev.com/

## Critical Requirements & Setup

### Node.js Version Requirement
**CRITICAL: Only builds with Node.js 16.14.x or 16.20.x**
- Use Node.js 16.14.2 specifically for best compatibility
- **DO NOT** attempt to build with Node.js 18+ or 20+ - it will fail
- Install using NVM if not available:
```bash
# Install NVM if not present
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use correct Node.js version
nvm install 16.14.2
nvm use 16.14.2
```

### Initial Setup Commands
Run these commands EXACTLY in this order for first-time setup:
```bash
# 1. Ensure correct Node.js version
nvm use 16.14.2
node --version  # Should show v16.14.2

# 2. Install global dependencies
npm install --global yarn
npm install --global gatsby-cli@3.15.0

# 3. Install project dependencies (takes ~90 seconds)
yarn install

# 4. Verify installation
yarn --version
gatsby --version
```

## Build & Development Commands

### Development Server
```bash
# Start development server (takes ~8 seconds to start)
gatsby develop
# Server runs on http://localhost:8000/
# GraphQL explorer available at http://localhost:8000/___graphql
```

### Production Build
```bash
# Build for production - NEVER CANCEL: Takes 4-5 minutes to complete
# Set timeout to 10+ minutes to avoid premature cancellation
gatsby build

# Build output goes to ./public/ directory
# Verify build with: ls -la public
```

### Linting & Code Quality
```bash
# Run ESLint (takes <5 seconds)
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Clean Build
```bash
# Clean previous build artifacts
npm run clean
# Then run gatsby build
```

## Docker Build (Optional - May Fail in Restricted Networks)
```bash
# Build Docker image (may fail due to network restrictions)
docker build -t dpblog/test .

# Run Docker container if build succeeds
docker run --rm -p 80:80 dpblog/test
# Access at http://localhost
```

## Manual Validation Requirements

**ALWAYS perform these validation steps after making changes:**

1. **Build Validation**:
   ```bash
   gatsby build
   # Must complete successfully in 4-5 minutes
   # Check for build output: ls -la public/
   ```

2. **Development Server Test**:
   ```bash
   gatsby develop
   # Wait for "You can now view gatsby-casper in the browser" message
   # Verify server starts and is accessible at http://localhost:8000
   ```

3. **Content Validation**:
   - Open http://localhost:8000 in browser
   - Verify blog posts are visible and properly formatted
   - Test navigation between posts
   - Verify images and styling load correctly

4. **GraphQL Interface Test**:
   - Navigate to http://localhost:8000/___graphql
   - Verify GraphQL explorer loads
   - Test a simple query like `{ site { siteMetadata { title } } }`

5. **Linting Validation**:
   ```bash
   npm run lint
   # Must pass without errors for CI to succeed
   ```

## Timing Expectations & Timeouts

**NEVER CANCEL these commands - always wait for completion:**

- `yarn install`: ~90 seconds - **Set timeout: 3+ minutes**
- `gatsby build`: ~4 minutes - **Set timeout: 10+ minutes**
- `gatsby develop`: ~8 seconds to start - **Set timeout: 30+ seconds**
- `npm run lint`: <5 seconds - **Set timeout: 30+ seconds**
- Docker build: 5+ minutes (if network allows) - **Set timeout: 15+ minutes**

## Project Structure & Key Locations

### Repository Root
```
.
├── .github/
│   └── workflows/azure-static-web-apps-*.yml  # CI/CD pipeline
├── src/
│   ├── content/                               # Blog posts (Markdown)
│   ├── components/                            # React components
│   ├── layouts/                               # Page layouts
│   ├── pages/                                 # Static pages
│   ├── templates/                             # Post templates
│   └── styles/                                # CSS/styling
├── gatsby-config.js                           # Gatsby configuration
├── gatsby-node.js                             # Build-time logic
├── package.json                               # Dependencies & scripts
├── tsconfig.json                              # TypeScript config
├── .eslintrc.js                               # ESLint configuration
└── Dockerfile                                 # Docker build definition
```

### Important Files to Know

- **Blog Posts**: `src/content/*.md` - All blog content in Markdown format
- **Site Configuration**: `gatsby-config.js` - Site metadata, plugins, settings
- **Author Info**: `src/content/author.yaml` - Author details and bio
- **TypeScript Config**: `tsconfig.json` - TypeScript compiler settings
- **CI/CD**: `.github/workflows/` - Azure Static Web Apps deployment

### Content Management

- **Adding Posts**: Create new `.md` files in `src/content/`
- **Post Format**: Include frontmatter with title, date, author, tags
- **Images**: Store in `src/content/img/` and reference relatively
- **Site Settings**: Edit `siteMetadata` in `gatsby-config.js`

## Common Issues & Troubleshooting

### Plugin Compatibility Warnings
**These warnings are NORMAL and non-blocking:**
```
warning Plugin gatsby-plugin-sharp is not compatible with your gatsby version
error Your plugins must export known APIs from their gatsby-node.js
```
- The build will succeed despite these warnings
- Do not attempt to "fix" these warnings unless specifically required

### Network Issues
- Docker builds may fail in restricted network environments
- yarn install may retry due to network timeouts - this is normal
- If persistent network issues, use local development instead of Docker

### Build Failures
- Always ensure Node.js 16.14.x is being used
- Run `gatsby clean` before rebuilding if encountering cache issues
- Check that all dependencies are installed with `yarn install`

## CI/CD Pipeline

The project uses Azure Static Web Apps for deployment:
- **Trigger**: Push to `main` branch or PR creation
- **Build Process**: 
  1. Install Node.js 16.20.x
  2. Run `yarn install --immutable --immutable-cache --check-cache`
  3. Install `gatsby-cli@3.15.0`
  4. Run `gatsby build`
  5. Deploy to Azure Static Web Apps

**Before pushing changes:**
- Always run `npm run lint` to ensure code quality
- Test locally with `gatsby develop` and `gatsby build`
- Verify manual validation scenarios pass

## Development Best Practices

1. **Always use the correct Node.js version** - check with `node --version`
2. **Run linting before commits** - use `npm run lint`
3. **Test builds locally** - run `gatsby build` to catch issues early
4. **Validate content changes** - start dev server and review in browser
5. **Check GraphQL queries** - use http://localhost:8000/___graphql for testing
6. **Monitor build times** - builds taking significantly longer may indicate issues

## Quick Reference Commands

```bash
# Setup (one-time)
nvm use 16.14.2 && npm install -g yarn gatsby-cli@3.15.0 && yarn install

# Development workflow
gatsby develop                    # Start dev server
gatsby build                     # Production build
npm run lint                     # Check code quality
npm run clean                    # Clean build cache

# Validation
curl http://localhost:8000        # Test dev server
ls -la public/                   # Verify build output
```

Remember: **NEVER CANCEL long-running commands** - builds may take 4+ minutes and that is normal and expected behavior.