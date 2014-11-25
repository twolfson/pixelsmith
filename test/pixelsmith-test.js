// Load our dependencies
var spritesmithEngineTest = require('spritesmith-engine-test');
var pixelsmith = require('../');

// Run our test
// DEV: This covers png and jpeg inputs
spritesmithEngineTest.run({
  engine: pixelsmith,
  engineName: 'pixelsmith'
});

// Define custom tests
var spritesmithUtils = spritesmithEngineTest.spritesmithUtils;
describe('pixelsmith', function () {
  describe('working with multiple images', function () {
    describe('outputting a jpeg image', function () {
      // Render a jpeg image
      var multipleImages = spritesmithEngineTest.config.multipleImages;
      spritesmithUtils.interpretImages(pixelsmith, multipleImages.filepaths);
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: multipleImages.width,
        height: multipleImages.height,
        coordinateArr: multipleImages.coordinateArr,
        exportParams: {
          format: 'jpeg'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug.jpg');
      }

      it.only('outputs a jpeg image', function () {
        // TOOD: Complete me
      });
    });

    describe.skip('outputting a gif image', function () {
      it('outputs a gif image', function () {
        // TOOD: Complete me
      });
    });
  });
});
