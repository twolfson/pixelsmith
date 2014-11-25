var path = require('path');
var concat = require('concat-stream');
var ndarray = require('ndarray');
var savePixels = require('save-pixels');
var exporters = {};

// Function to add new exporters
function addExporter(name, exporter) {
  exporters[name] = exporter;
}

// Helper to create exporters (could be a class for better abstraction)
function getPngExporter(ext) {
  /**
   * Generic exporter
   * @param {Object} options Options to export with
   * @param {Number} [options.quality] Quality of the exported item
   * @param {Function} cb Error-first callback to return binary image string to
   */
  return function pngExporterFn (options, cb) {
    var that = this;

    // Add the image to the data itself (easier via offsets)
    var data = this.data;
    var images = this.images;
    images.forEach(function getUrlPath (imageObj) {
      // Iterate over the image's data across its rows
      // setting the original data at that offset
      // [1, 2, 0, 0,
      //  3, 4, 0, 0,
      //  0, 0, 5, 0,
      //  0, 0, 0, 6]
      // Set [1, 2] at 0 + 0 * canvasRow.length (x offset + ((y + imageRow index) * canvasRow length))
      // Set [3, 4] at 0 + 1 * canvasRow.length (x offset + ((y + imageRow index) * canvasRow length))
      var img = imageObj.img;
      var imageXOffset = imageObj.x * 4;
      var canvasRowWidth = that.width * 4;
      var imageRowWidth = img.width * 4;
      var imgData = img.data;
      var imageYOffset = imageObj.y;
      var imageRowIndex = 0;
      var imageRowCount = img.height;
      for (; imageRowIndex < imageRowCount; imageRowIndex += 1) {
        // TODO: Use ndarray operations
        // TODO: or move to separate node module
        // TODO: It would be more space efficient to iterate over the indices and set each one
        var subarray = imgData.subarray(imageRowIndex * imageRowWidth, (imageRowIndex + 1) * imageRowWidth);
        var offset = imageXOffset + ((imageYOffset + imageRowIndex) * canvasRowWidth);
        data.set(subarray, offset);
      }
    });

    // Concatenate the ndarray into a png
    // TODO: We should start sending back streams
    savePixels(this.ndarray, 'png').pipe(concat(function concatenateImage (buff) {
      cb(null, buff.toString('binary'));
    }));
  };
}

// Generate the png exporter
var pngExporter = getPngExporter('png');
addExporter('png', pngExporter);
addExporter('image/png', pngExporter);

// Export our exporters
module.exports = {
  exporters: exporters,
  addExporter: addExporter
};