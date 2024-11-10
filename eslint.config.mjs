import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import neko from "eslint-config-neko";

const conf = [
  ...neko.configs.recommended,
  { ignores: ["**/**/*.mdx?", "lib", "docs", "coverage", "prism.js"] },
];

export default conf
  .concat(react.configs.flat.recommended)
  .concat({
    settings: { react: { version: "detect" } },
    plugins: { "react-hooks": hooks },
    rules: hooks.configs.recommended.rules,
  });
