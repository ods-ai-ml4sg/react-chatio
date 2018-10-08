# Build image including dev
FROM node:8.12.0-alpine as chatio-build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Build prod image
FROM node:8.12.0-alpine as chatio-prod

WORKDIR /app

ENV NODE_ENV production

COPY --from=chatio-build /app/.babelrc ./
COPY --from=chatio-build /app/package.json ./
COPY --from=chatio-build /app/build build
COPY --from=chatio-build /app/src/backend backend
COPY --from=chatio-build /app/src/common common
RUN npm install --only=production

ENTRYPOINT ["node", "backend/run.js"]