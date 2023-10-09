# Use alpine to keep things lightweight
FROM node:16-alpine

WORKDIR /src

COPY . . 

RUN npm install

RUN npm run build

RUN ls -a

EXPOSE 3000

ENV PORT=3000

# Run the web service on container startup.
CMD ["npm", "run", "start"]