// Load in our dependencies
var fs = require('fs');
var async = require('async');
var concat = require('concat-stream');
var getPixels = require('get-pixels');
var mime = require('mime-types');
var Vinyl = require('vinyl');
var Canvas = require('./canvas');

function Pixelsmith(options) {
  // There are no options for our constructor
}
Pixelsmith.specVersion = '2.0.0';
Pixelsmith.prototype = {
  createCanvas: function (width, height) {
    // Create and return a new canvas
    var canvas = new Canvas(width, height);
    return canvas;
  },
  // Define our mass image population
  createImages: function (files, callback) {
    // In series
    async.waterfall([
      // Load the images into memory
      function loadImages (cb) {
        // TODO: Abstract me
        async.map(files, function loadImage (file, cb) {
          // If the file is a string, upcast it to buffer-based vinyl
          // DEV: We don't use `Vinyl.isVinyl` since that was introduced in Sep 2015
          //   We want some backwards compatibility with older setups
          if (typeof file === 'string') {
            fs.readFile(file, function handleFileContent (err, buff) {
              // If there is an error, callback with it
              if (err) {
                return cb(err);
              }

              // Otherwise, callback with a buffer-based vinyl object
              cb(null, new Vinyl({
                path: file,
                contents: buff
              }));
            });
          // Otherwise, callback with the existing vinyl object
          } else {
            cb(null, file);
          }
        }, cb);
      },
      function loadPixels (files, cb) {
        async.map(files, function loadPixelsFn (file, cb) {
          // If the vinyl object is null, then load from disk
          if (file.isNull()) {
            getPixels(file.path, cb);
          } else {
            file.pipe(concat(function handleFileBuffer (buff) {
              // https://github.com/scijs/get-pixels/blob/2e8766f62a9043d74a4b1047294a25fea5b2eacf/node-pixels.js#L179
              getPixels(buff, mime.lookup(file.path), cb);
            }));
          }
        }, cb);
      },
      function saveImgSizes (images, cb) {
        var i = 0;
        var len = images.length;
        for (; i < len; i++) {
          // Save the width and height
          // DEV: These can be padded later on
          var img = images[i];

          // If there are 4 dimensions, use the last 3
          // DEV: For gifs, the first dimension is frames
          if (img.shape.length === 4) {
            img.width = img.shape[1];
            img.height = img.shape[2];
          // Otherwise, use the normal [width, height, rgba] set
          } else {
            img.width = img.shape[0];
            img.height = img.shape[1];
          }
        }
        cb(null, images);
      }
    ], callback);
  }
};

// Export our engine
module.exports = Pixelsmith;
