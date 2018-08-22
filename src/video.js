const cv = require('opencv4nodejs');
const { drawGreenRect } = require('./util.js');
  
const handleVideo = (client, moving, onRect) => {
  const pngStream = client.getPngStream();
  pngStream.on('data', async buffer => {
    if (buffer) {
      const image = cv.imdecode(buffer);

      const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
      const gray = image.bgrToGray();

      const { objects: rects } = await classifier.detectMultiScaleAsync(gray);
      rect = rects.length ? 
        rects.reduce((biggest, rect) => (
          rect.height * rect.width > biggest.height * biggest.width
            ? rect
            : biggest
          )
      ) : null;

      if (rect) {
        drawGreenRect(image, rect)
        if (onRect) onRect(rect)
      } else if (moving) {
        console.log('Drone stopping')
        client.stop()
      }

      cv.imshow('Drone', image)
      cv.waitKey(1);
    }
  });
}
  
module.exports = {
  handleVideo,
}
