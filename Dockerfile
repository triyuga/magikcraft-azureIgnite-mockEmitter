FROM timmarwick/magikcraft-mock-emmitter

WORKDIR /build
ADD . .

RUN npm i \
  && node node_modules/gulp/bin/gulp.js build

EXPOSE 8666
CMD ["speedus", "node", "server.js"]
