// Change this to toggle transform
const TRANSFORM_ALL = false;

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    ignore: [
      /* Return true if files need to be ignored https://babeljs.io/docs/en/options#matchpattern */
      function (filename) {
        const isMiddleware = !!filename?.match(/_middleware\.js?$/);

        // Helper logs
        console.log('__filename__', filename);
        console.log('middleware', isMiddleware);

        // Transform all files if specified, otherwise only ignore middleware files
        return TRANSFORM_ALL ? false : isMiddleware;
      },
    ],
  };
};
