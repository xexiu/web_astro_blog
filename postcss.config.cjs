module.exports = {
   plugins: [
      require('postcss-mixins'),
      require('postcss-extend'),
      require('postcss-for'),
      require('postcss-nesting'),
      require('postcss-preset-env', {
         'stage': 0
      }),
      require('postcss-simple-vars'),
      require('cssnano'),
      require('autoprefixer')
   ]
};