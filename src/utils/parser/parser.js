

export default class ScriptParser {
    #presets = {}
    constructor(presets) {
        presets?.forEach(this.registerPresets())
    }
    getParser(scriptJson) {
        return new Parser(this.#presets, scriptJson);
    }
    registerPresets(presets = {}) {
        for(let [k, v] of Object.entries(presets)) {
            this.#presets[k] = v
        }
        return this;
    }
}
//pData means "parsedData"
class Parser {
    #scriptR = {};
    #scriptD = {};
    #presetR = {};
    #presetD = {};
    #priority = [];
    static #spRegexp = /([\\^$.*+?=!:/()\[\]{}])/g
    constructor(presets, scriptJson) {
        this.#scriptR = scriptJson;
        if(presets.constructor === Array) presets.reduce((p, v) => {return {...p, ...v}})
        else this.#presetR = presets;
    }
    parse() {
        this.#scriptR["lang"].forEach((v, l) => {
            this.#priority[l] = v
        })
        this.#presetD = this.#parsePresets();
        let data = {};
        for(let [k, v] of Object.entries(this.#scriptR["script"])) {
            if(!this.#scriptR["lang"].find(i => { return i === k })) throw new Error("There is unexpected language in script data")
            data[k] = {}
            for(let [sN, sD] of Object.entries(v)) {
                data[k][sN] = {
                    options: this.#inherit(sN, k),
                    literal: sD.content
                }
                data[k][sN].regexp = Parser.#generateRegexp(data[k][sN].options.placeholder.characters)
            }
        }
        console.log(data);
    }
    #parsePresets() {
        let pD = {};
        Object.keys(this.#presetR).forEach(v => {
            for(let [key, value] of Object.entries(this.#presetR[v])) {
                if(pD[key] === undefined) pD[key] = value;
            }
        })
        return pD
    }
    #inherit(scriptName, lang) {
        let script = this.#scriptR.script[lang][scriptName];
        let inheritD  = script.inherited ? this.#priority.filter(i => {return i !== lang}).map(i => {
            let returnValue = []
            let lScript = this.#scriptR.script[i][scriptName]
            if(lScript?.options) {
                for(let [k, v] of Object.entries(lScript.options)) {
                    if(script[k] === undefined) {
                        let data = {};
                        data[k] = v
                        returnValue.push(data)
                    }
                }
                return returnValue;
            }
        }) : [];
        let inherition = inheritD.reduce((pv, cu) => {
            let mergeD = {};
            cu?.forEach(i => {
                for(let [k, v] of Object.entries(i)) {
                    if(pv[k] === undefined) mergeD[k] = v
                }
            })
            return {...pv, ...mergeD}
        }, {})
        for(let [k, v] of Object.entries(this.#presetD)) {
            if(k !== "content" && inherition[k] === undefined) {
                inherition[k] = v;
            }
        }
        return inherition
    }
    static #generateRegexp({startWith, endWith}) {
        startWith = startWith.replace(Parser.#spRegexp, '\\$1')
        endWith = endWith.replace(Parser.#spRegexp, '\\$1');
        return new RegExp(`/${startWith}(\w+)${endWith}/g`);
    }
}
