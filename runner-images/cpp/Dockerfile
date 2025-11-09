# C/C++ Runner Image
FROM gcc:latest

# Create non-root user for security
RUN groupadd -r runner && useradd -r -g runner runner

# Install additional tools
RUN apt-get update && apt-get install -y \
    make \
    cmake \
    gdb \
    valgrind \
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
ENV CC=gcc
ENV CXX=g++
ENV PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

# Default command - keep container alive
CMD ["tail", "-f", "/dev/null"]