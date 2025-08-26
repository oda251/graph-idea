import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": resolve(__dirname, "../src"),
    };
    return config;
  },
};

export default config;
