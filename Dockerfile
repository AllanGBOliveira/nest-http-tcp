FROM node:alpine AS base

WORKDIR /app

# Install deps first (better caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && cp -r node_modules prod_node_modules

# Build stage
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
RUN npm ci
COPY tsconfig*.json ./
COPY src ./src
COPY eslint.config.mjs ./
RUN npx nest build

# Runtime stage
FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3009
ENV TCP_PORT=3008

# Copy runtime deps and built files
COPY --from=base /app/prod_node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3009 3008

CMD ["node", "dist/main.js"]


