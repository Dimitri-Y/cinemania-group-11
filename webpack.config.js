// import { resolve } from 'path';
// import { webpack } from 'webpack';

// export const mode = 'production';
// export const entry = './src/index.js';
// export const output = {
//   path: resolve(__dirname, 'dist'),
//   filename: 'main.js',
// };
export const module = [
  rules[
    {
      test: /\.(jpg|png|svg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'image',
            useRelativePath: true,
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70,
            },
          },
        },
      ],
    }
  ],
];
