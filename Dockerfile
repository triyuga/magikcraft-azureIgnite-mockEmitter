FROM sitapati/docker-ubuntu-node-speedus

WORKDIR /build
ADD . .

RUN npm i \
  && node node_modules/gulp/bin/gulp.js build

EXPOSE 8667
CMD ["speedus", "node", "server.js"]
