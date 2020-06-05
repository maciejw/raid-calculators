const tsconfig = require("./tsconfig.json");

const sources = "src/**/*.ts?(x)";
const tests = "src/**/*.test.ts?(x)";
const typings = "src/**/*.d.ts";

function not(wildcard) {
  return `!${wildcard}`;
}
module.exports = function (wallaby) {
  return {
    files: [sources, not(tests), not(typings)],
    testFramework: "jest",
    debug: true,
    env: {
      type: "node",
    },
    tests: [tests],
    compilers: {
      [sources]: wallaby.compilers.typeScript({
        ...tsconfig.compilerOptions,
        module: "CommonJS",
      }),
    },
  };
};
