const { ESLint } = require("eslint");
(async function main() {
    lint().then(async ({result, text}) => {
        if(ESLint.getErrorResults(result).length > 0) {
            throw new Error("EsLint failed, Some Syntax are violated ESLint Rules\n" + text)
        }
    }).catch(error => {
        throw error;
    })
})()
async function lint() {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(["src/**/*"]);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    return {results, resultText}
}
