// Load our dependencies
var concat = require('concat-stream');
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
    //  Add each image to the canvas
    var canvas = this;
    var images = this.images;
    images.forEach(function getUrlPath (imageObj) {
      // Iterate over the image's data across its rows
      // setting the original data at that offset
      // [1, 2, 0, 0,
      //  3, 4, 0, 0,
      //  0, 0, 5, 0,
      //  0, 0, 0, 6]
      var img = imageObj.img;
      var xOffset = imageObj.x;
      var yOffset = imageObj.y;
      var rowIndex = 0;
      var rowCount = img.height; // DEV: Use `height` for padding
      for (; rowIndex < rowCount; rowIndex += 1) {
        var colIndex = 0;
        var colCount = img.width; // DEV: Use `width` for padding
        for (; colIndex < colCount; colIndex += 1) {
          var rgbaIndex = 0;
          var rgbaCount = 4;
          for (; rgbaIndex < rgbaCount; rgbaIndex += 1) {
            var val = img.get(rowIndex, colIndex, rgbaIndex);
            canvas.ndarray.set(yOffset + rowIndex, xOffset + colIndex, rgbaIndex, val);
          }
        }
      }
    });

    // Concatenate the ndarray into a png
    // TODO: We should start sending back streams
    savePixels(canvas.ndarray, 'png').pipe(concat(function concatenateImage (buff) {
      cb(null, buff.toString('binary'));
    }));
  };
}

// Generate the png exporter
// TODO: Add jpeg and gif exporters
var pngExporter = getPngExporter('png');
addExporter('png', pngExporter);
addExporter('image/png', pngExporter);

// Export our exporters
module.exports = {
  exporters: exporters,
  addExporter: addExporter
};
