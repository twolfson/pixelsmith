// Mass image creation
var async = require('async');
var getPixels = require('get-pixels');
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
      images.forEach(function saveImgSize (img) {
        var shape = img.shape;
        img.height = shape[0];
        img.width = shape[1];
      });
      cb(null, images);
    }
  ], cb);
}

// Export single image creation and mass image creation
module.exports = {
  createImages: createImages
};