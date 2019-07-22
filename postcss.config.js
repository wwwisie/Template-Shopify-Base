const cssnano = require("cssnano");
const mergelonghand = require("postcss-merge-longhand");
const uniqueselectors = require("postcss-unique-selectors");
const csspresetenv = require("postcss-preset-env");
const mqpacker = require("css-mqpacker");

module.exports = {
	plugins: [
		mergelonghand(),
		uniqueselectors(),
		csspresetenv({ stage: 2 }),
		mqpacker({
		  	sort: require('sort-css-media-queries').desktopFirst,
		}),
		cssnano(),
	]
}