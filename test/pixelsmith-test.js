// Load our dependencies
var spritesmithEngineTest = require('spritesmith-engine-test');
var pixelsmith = require('../');

// Override images with png variants
// TODO: Define as a flag inside of `spritesmith-engine-test`
// spritesmithEngineTest.config.multipleImages = spritesmithEngineTest.config.multiplePngImages;
// spritesmithEngineTest.config.repeatingImages = spritesmithEngineTest.config.repeatingPngImages;

// Run our test
spritesmithEngineTest.run({
  engine: pixelsmith,
  engineName: 'pixelsmith'
});

// TODO: Should we test png, jpeg, and gif support?
