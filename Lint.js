// eslint-disable-next-line no-undef
const { ESLint } = require("eslint");
(async function main() {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(["src/**/*.js"]);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    if(ESLint.getErrorResults(results).length > 0) {
        throw new Error("EsLint failed, Some Syntax are violated ESLint Rules\n" + resultText)
    }
})()

