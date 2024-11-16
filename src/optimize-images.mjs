import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
  try {
    const files = await imagemin(['public/images/*.{jpg,png,webp}'], {
      destination: 'optimized-images',
      plugins: [
        imageminWebp({ quality: 90 }),
        imageminMozjpeg({ quality: 90 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    });

    files.forEach(file => {
      console.log(`Optimized: ${file.sourcePath} -> ${file.destinationPath}`);
    });
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
})();
