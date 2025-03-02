import { defineConfig } from 'tsup'
// import { dependencies } from './package.json'

export default defineConfig(({ watch }) => ({
   entry: {
      index: 'src/index.ts',
   },
   outDir: 'dist',
   // platform: 'node',
   format: 'esm',
   bundle: true,
   // external: Object.keys(dependencies),
   minify: watch ? false : true,
   treeshake: true,
   dts: true,
   sourcemap: watch ? true : false,
   clean: true,
}))
