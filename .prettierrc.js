export default {
  printWidth: 180,
  trailingComma: "all",
  tabWidth: 2,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      options: {
        parser: "typescript",
        plugins: ["prettier-plugin-organize-imports"],
      },
    },
    {
      files: ["*.json", ".prettierrc", "*.code-workspace"],
      options: {
        parser: "json",
      },
    },
    {
      files: ["*.js"],
      options: {
        parser: "babel",
      },
    },
    {
      files: "*.css",
      options: {
        parser: "css",
      },
    },
  ],
};
