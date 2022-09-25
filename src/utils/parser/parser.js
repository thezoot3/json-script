/**
 * Script Parser for ScriptLoader.jsx
 * @type { (presets: Array) =>  scriptParser}
 */
export default class scriptParser {
    presets;
    static #spRegexp = /([\\^$.*+?=!:/()\[\]{}])/g
    /* eslint-disable-next-line require-jsdoc */
    constructor(presets = {}) {
        this.presets = {}
        for(const [k, v] of Object.entries(presets)) {
            this.presets[k] = v;
        }
    }
    /**
     * Returns parsed data
     * @param scriptJson
     * @returns {{}}
     * @type { (scriptJson: Object) => Object}
     */
    parse(scriptJson) {
        const parsePresets = () => {
            const pD = {};
            scriptJson.presets.forEach(v => {
                if(!this.presets[v]) {
                    throw new Error(`Missing presets are existing Presets: ${v}`)
                }
                for(const [key, value] of Object.entries(this.presets[v])) {
                    if(pD[key] === undefined) pD[key] = value;
                }
            })
            return pD;
        }
        const generateRegexp = ({startWith, endWith}) => {
            startWith = startWith.replace(scriptParser.#spRegexp, '\\$1');
            endWith = endWith.replace(scriptParser.#spRegexp, '\\$1');
            return [new RegExp(`${startWith}(\\w+)${endWith}`, 'g'), new RegExp(`${startWith}\\w+${endWith}`, 'g')]
        }
        const data = {};
        data["config"] = parsePresets();
        const [regCapture, regOrigin] = generateRegexp({...data["config"]["placeholder"]["characters"]})
        data["config"]["regexp"] = {
            regCapture,
            regOrigin
        }
        data.script = {};
        for(const [k, v] of Object.entries(scriptJson['script'])) {
            if(!scriptJson['lang'].find(i => {
                return i === k
            })) {
                throw new Error('There is unexpected language in script data');
            }
            data.script[k] = {}
            for(const [sN, sD] of Object.entries(v)) {
                data.script[k][sN] = sD
            }
        }
        return data;
    }
}
