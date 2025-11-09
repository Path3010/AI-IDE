# Python Runner Image
FROM python:3.11-slim

# Create non-root user for security
RUN groupadd -r runner && useradd -r -g runner runner

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    git \
    curl \
    bash \
    nano \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install common Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create workspace directory with proper permissions
RUN mkdir -p /workspace/code && \
    chown -R runner:runner /workspace

# Don't switch to non-root user - keep as root for terminal access
# USER runner

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin"

# Default command
CMD ["python3"]