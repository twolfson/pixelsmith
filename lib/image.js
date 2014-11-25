// Load in our dependencies
var async = require('async');
var ndarray = require('ndarray');
var getPixels = require('get-pixels');

// Mass image creation
function createImages(files, cb) {
  // In series
  async.waterfall([
    // Load the images into memory
    // DEV: If this becomes unwieldy, load in stats only. Then, inside of exporters, stream them in individually.
    function loadImages (cb) {
      async.map(files, function loadImage (filepath, cb) {
        getPixels(filepath, cb);
      }, cb);
    },
    function saveImgSizes (images, cb) {
      var i = 0;
      var len = images.length;
      for (; i < len; i++) {
        // If there are 4 dimensions, use the last 3
        // DEV: For gifs, the first dimension is frames
        var img = images[i];
        if (img.shape.length === 4) {
          console.log(img.shape[1]);
          console.log(img.shape[2]);
          console.log(img.shape[3]);
          img = images[i] = new ndarray(img.data, [img.shape[1], img.shape[2], img.shape[3]]);
        }

        // Save the width and height
        // DEV: These can be padded later on
        var shape = img.shape;
        img.width = shape[0];
        img.height = shape[1];
      }
      cb(null, images);
    }
  ], cb);
}

// Export single image creation and mass image creation
module.exports = {
  createImages: createImages
};
