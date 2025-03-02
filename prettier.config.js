/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
   parser: 'typescript',
   printWidth: 100,
   useTabs: false,
   tabWidth: 3,
   semi: false,
   singleQuote: true,
   quoteProps: 'consistent',
   trailingComma: 'all',
   overrides: [
      {
         files: '*.yml',
         options: {
            parser: 'yaml',
            tabWidth: 4,
         },
      },
   ],
}
