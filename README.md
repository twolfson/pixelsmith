# pngsmith [![Build status](https://travis-ci.org/twolfson/pngsmith.png?branch=master)](https://travis-ci.org/twolfson/pngsmith)

`png` engine for [spritesmith][].

[spritesmith]: https://github.com/Ensighten/spritesmith

This can be used for constructing a canvas, placing images on it, and extracting the result image.

## Getting Started
Install the module with: `npm install pngsmith`

```javascript
// Convert images into pngsmith objects
var images = ['img1.jpg', 'img2.png'];
pngsmith.createImages(this.images, function handleImages (err, imgs) {
  // Create a canvas to draw onto (200 pixels wide, 300 pixels tall)
  pngsmith.createCanvas(200, 200, function (err, canvas) {
    // Add each image at a specific location (upper left corner = {x, y})
    var coordinatesArr = [{x: 0, y: 0}, {x: 50, y: 50}];
    imgs.forEach(function (img, i) {
      var coordinates = coordinatesArr[i];
      canvas.addImage(img, coordinates.x, coordinates.y);
    }, canvas);

    // Export canvas to image
    canvas['export']({format: 'png'}, function (err, result) {
      result; // Binary string representing a PNG image of the canvas
    });
  });
});
```

## Documentation
This module was built to the specification for all spritesmith modules.

https://github.com/twolfson/spritesmith-engine-test

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint using [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Dec 13 2013, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
