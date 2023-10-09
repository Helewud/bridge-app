# Use alpine to keep things lightweight
FROM node:16-alpine

WORKDIR /src

COPY . . 

RUN yarn install

RUN yarn build

RUN ls -a

EXPOSE 3000

ENV PORT=3000

# Run the web service on container startup.
CMD ["yarn", "run", "start"]