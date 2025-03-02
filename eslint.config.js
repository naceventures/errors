// import { fileURLToPath } from 'node:url'
// import globals from 'globals'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))

export default ts.config(
   /* ESLint ignore */

   includeIgnoreFile(gitignorePath),

   /* Config */

   js.configs.recommended,
   ...ts.configs.recommended,
   prettier,

   /* Typescript */

   {
      name: 'typescript',
      files: ['**/*.{ts,mts}'],
      languageOptions: {
         parser: ts.parser,
      },
      rules: {
         '@typescript-eslint/no-explicit-any': 'off',
      },
   },
)
