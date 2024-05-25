# Lit Decorator Migration CLI

`@lit-migrate` is a CLI tool designed to simplify the process of migrating experimental decorators from Lit v2 to standard decorators in Lit v3. 
 This tool scans your TypeScript files and automatically updates the decorators, ensuring a smooth transition to the latest version of Lit.

## Usage

To run the migration tool, use the following command:

```sh
npx lit-migrate --path <paths...>
```

### Default Path

If the `--path` option is not provided, the tool will default to searching for TypeScript files using the pattern `**/!(*.d).ts`. This means it will find and transform all TypeScript files except for declaration files (*.d.ts)
