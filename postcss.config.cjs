module.exports = {
   plugins: [
      require('postcss-mixins'),
      require('postcss-extend'),
      require('postcss-each'),
      require('postcss-nesting'),
      require('postcss-preset-env', {
         'stage': 4
      }),
      require('postcss-simple-vars')({
         unknown(node, name, result) {
            // Print out warning if the node still exists at the end.
            // node.warn(result, 'Unknown variable ' + name);
         }
      }),
      require('cssnano'),
      require('autoprefixer')
   ]
};