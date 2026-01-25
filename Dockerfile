# Use the official Playwright image (includes browsers + deps)
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package files first (better Docker caching)
COPY package.json package-lock.json* ./ 

# Install dependencies
RUN npm i

# Copy the rest of the project
COPY . .

# Install Playwright browsers (already included, but safe if custom)
RUN npx playwright install --with-deps

# Run tests by default
CMD ["npm", "run", "ui-test"]
