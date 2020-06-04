const tsconfig = require("./tsconfig.json");

const sources = "src/**/*.ts?(x)";
const tests = "src/**/*.test.ts?(x)";

module.exports = function (wallaby) {
  return {
    files: [sources, `!${tests}`],
    testFramework: "jest",
    debug: true,
    env: {
      type: "node",
    },
    tests: [tests],
    compilers: {
      [tests]: wallaby.compilers.typeScript({
        ...tsconfig.compilerOptions,
        module: "CommonJS",
      }),
    },
  };
};
