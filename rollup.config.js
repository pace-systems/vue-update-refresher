import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: [
			{
				name: 'vue-update-refresher', file: pkg.browser,
				format: "umd", plugins: [terser()], sourcemap: true,
				exports: 'named'
			},
		],
		plugins: [
			resolve(), // so Rollup can find external deps
			commonjs() // so Rollup can convert external deps to an ES module
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: [], //['ms'],
		output: [
			{ file: pkg.main, format: 'cjs', plugins: [terser()], sourcemap: true,
				exports: 'named'  },
			{ file: pkg.module, format: 'es', plugins: [terser()], sourcemap: true,
				exports: 'named'  }
		]
	}
];