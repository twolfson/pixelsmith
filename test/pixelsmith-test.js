// Load our dependencies
var assert = require('assert');
var fs = require('fs');
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
  describe('loading a GIF image', function () {
    describe('when rendered', function () {
      it.skip('used the first frame of the GIF image', function () {
        // TODO: Complete me
      });
    });
  });

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

      it('outputs a jpeg image', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/multiple.jpg', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });

    describe('outputting a gif image', function () {
      // Render a jpeg image
      var multipleImages = spritesmithEngineTest.config.multipleImages;
      spritesmithUtils.interpretImages(pixelsmith, multipleImages.filepaths);
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: multipleImages.width,
        height: multipleImages.height,
        coordinateArr: multipleImages.coordinateArr,
        exportParams: {
          format: 'gif'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug.gif');
      }

      it('outputs a gif image', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/multiple.gif', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });
  });
});
