FROM ghost:6-alpine AS base

WORKDIR /var/lib/ghost

# Initialise a minimal package.json for npm
RUN npm init -y >/dev/null

# Install the Cloudinary storage adapter (skip dev dependencies)
RUN npm install ghost-storage-cloudinary@latest --omit=dev

# Move the adapter to the location Ghost expects for custom storage adapters
RUN mkdir -p content/adapters/storage && \
    cp -r node_modules/ghost-storage-cloudinary content/adapters/storage/ghost-storage-cloudinary

# Clean up npm cache and temporary files to keep the image small
RUN rm -rf node_modules && npm cache clean --force


# Preserve Ghost's default entrypoint and command
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "current/index.js"]
