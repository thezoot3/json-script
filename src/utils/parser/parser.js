/**
 * Script Parser for ScriptLoader.jsx
 * @type { (presets: Array) =>  ScriptParser}
 */
export default class ScriptParser {
    #presets = {}
    /* eslint-disable-next-line require-jsdoc */
    constructor(presets) {
        presets?.forEach(this.registerPresets());
        return this;
    }
    /**
     * Returns Parser executed by ScriptLoader.jsx
     * @param scriptJson
     * @returns {Parser}
     * @type { (scriptJson: Object) => Parser}
     */
    getParser(scriptJson) {
        return new Parser(this.#presets, scriptJson);
    }
    /**
     * Register Extended file presets
     * @param presets
     * @returns {ScriptParser}
     * @type { (presets: Object) => ScriptParser}
     */
    registerPresets(presets = {}) {
        for(const [k, v] of Object.entries(presets)) {
            this.#presets[k] = v;
        }
        return this;
    }
}
// pData means 'parsedData'
/**
 * Divided Class from ScriptParser due to Security
 */
class Parser {
    #scriptR = {};
    #scriptD = {};
    #presetR = {};
    #presetD = {};
    #priority = [];
    static #spRegexp = /([\\^$.*+?=!:/()\[\]{}])/g
    /* eslint-disable-next-line require-jsdoc */
    constructor(presets, scriptJson) {
        this.#scriptR = scriptJson;
        if(presets.constructor === Array) {
            presets.reduce((p, v) => {
                return {...p, ...v}
            });
        } else {
            this.#presetR = presets;
        }
        return this;
    }

    /**
     * @desc Parse Script with Presets
     * @returns {Object}
     */
    parse() {
        this.#scriptR['lang'].forEach((v, l) => {
            this.#priority[l] = v;
        })
        this.#presetD = this.#parsePresets();
        const data = {};
        for(const [k, v] of Object.entries(this.#scriptR['script'])) {
            if(!this.#scriptR['lang'].find(i => {
                return i === k
            })) {
                throw new Error('There is unexpected language in script data');
            }
            data[k] = {};
            for(const [sN, sD] of Object.entries(v)) {
                data[k][sN] = {
                    options: this.#inherit(sN, k),
                    literal: sD.content,
                };
                data[k][sN].regexp = Parser.#generateRegexp(data[k][sN].options.placeholder.characters);
            }
        }
        return data;
    }

    /**
     * Merge Presets by subtracting overlaps
     * @returns {Object}
     */
    #parsePresets() {
        const pD = {};
        Object.keys(this.#presetR).forEach(v => {
            for(const [key, value] of Object.entries(this.#presetR[v])) {
                if(pD[key] === undefined) pD[key] = value;
            }
        })
        return pD;
    }

    /**
     * Inherit Option by config
     * @param scriptName
     * @param lang
     * @returns {Object}
     * @type { (scriptName: String, lang: String) => Object }
     */
    #inherit(scriptName, lang) {
        const script = this.#scriptR.script[lang][scriptName];
        const inheritD = script.inherited ? this.#priority.filter(i => {
            return i !== lang
        }).map(i => {
            const returnValue = [];
            const lScript = this.#scriptR.script[i][scriptName];
            if(lScript?.options) {
                for(const [k, v] of Object.entries(lScript.options)) {
                    if(script[k] === undefined) {
                        const data = {};
                        data[k] = v;
                        returnValue.push(data);
                    }
                }
                return returnValue;
            }
        }) : [];
        const inherition = inheritD.reduce((pv, cu) => {
            const mergeD = {};
            cu?.forEach(i => {
                for(const [k, v] of Object.entries(i)) {
                    if(pv[k] === undefined) mergeD[k] = v;
                }
            })
            return {...pv, ...mergeD};
        }, {})
        for(const [k, v] of Object.entries(this.#presetD)) {
            if(k !== 'content' && inherition[k] === undefined) {
                inherition[k] = v;
            }
        }
        return inherition;
    }
    /**
     * Generate Regexp for Replace placeholder
     * @param startWith
     * @param endWith
     * @returns {RegExp}
     * @type { (startWith: String, endWith: String) => RegExp}
     */
    static #generateRegexp({startWith, endWith}) {
        startWith = startWith.replace(Parser.#spRegexp, '\\$1');
        endWith = endWith.replace(Parser.#spRegexp, '\\$1');
        return new RegExp(`/${startWith}(\w+)${endWith}/g`);
    }
}
