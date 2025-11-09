# Java Runner Image
FROM openjdk:17-slim

# Create non-root user for security
RUN groupadd -r runner && useradd -r -g runner runner

# Install additional tools
RUN apt-get update && apt-get install -y \
    maven \
    gradle \
    git \
    curl \
    vim \
    nano \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Create workspace directory with proper permissions
RUN mkdir -p /workspace/code && \
    chown -R runner:runner /workspace

# Don't switch to non-root user - keep as root for terminal access
# USER runner

# Set environment variables
ENV JAVA_HOME=/usr/local/openjdk-17
ENV PATH="/usr/local/openjdk-17/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

# Default command - keep container alive  
CMD ["tail", "-f", "/dev/null"]