FROM node:13.7.0-alpine

LABEL maintainer=kitko

# Copy Source code
WORKDIR /usr/src/

COPY dist/ ./dist/
COPY configs/ ./configs/

COPY package.json ./

# Install all dependencies.
RUN npm install --only=production

CMD [ "npm", "run", "schedule" ]