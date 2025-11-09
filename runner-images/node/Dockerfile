# Node.js Runner Image
FROM node:18-slim

# Create non-root user for security
RUN groupadd -r runner && useradd -r -g runner runner

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    git \
    curl \
    bash \
    nano \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install global Node.js packages
RUN npm install -g \
    typescript \
    ts-node \
    nodemon \
    eslint \
    prettier \
    @types/node \
    jest \
    webpack \
    webpack-cli \
    create-react-app \
    express-generator

# Create workspace directory with proper permissions
RUN mkdir -p /workspace/code && \
    chown -R runner:runner /workspace

# Don't switch to non-root user - keep as root for terminal access
# USER runner

# Set environment variables
ENV NODE_ENV=development
ENV PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

# Default command
CMD ["node"]