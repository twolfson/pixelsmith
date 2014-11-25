// Load our dependencies
var spritesmithEngineTest = require('spritesmith-engine-test');
var pixelsmith = require('../');

// Run our test
spritesmithEngineTest.run({
  engine: pixelsmith,
  engineName: 'pixelsmith'
});

// TODO: Should we test png, jpeg, and gif support?
