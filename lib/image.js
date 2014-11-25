// Load in our dependencies
var async = require('async');
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
      console.log('pre');
      var len = images.length;
      for (; i < len; i++) {
        var img = images[i];
        var shape = img.shape;
        img.width = shape[0];
        img.height = shape[1];
      }
      console.log('saved');
      cb(null, images);
    }
  ], cb);
}

// Export single image creation and mass image creation
module.exports = {
  createImages: createImages
};
