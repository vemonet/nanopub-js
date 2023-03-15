import { css, html, LitElement } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import { DataFactory, Writer, Parser } from 'n3';

const escape = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/, escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g, escapedCharacters = {
    '\\': '\\\\',
    '"': '\\"',
    '\t': '\\t',
    '\n': '\\n',
    '\r': '\\r',
    '\b': '\\b',
    '\f': '\\f'
};
const DEFAULTGRAPH = DataFactory.defaultGraph();
const aTagAttrs = `target="_blank" rel="noopener noreferrer"`;
class NanopubWriter extends Writer {
    _encodeIriOrBlank(entity) {
        if (entity.termType !== 'NamedNode') {
            if (this._lists && entity.value in this._lists)
                entity = this.list(this._lists[entity.value]);
            return 'id' in entity ? entity.id : `_:${entity.value}`;
        }
        let iri = entity.value;
        if (this._baseMatcher && this._baseMatcher.test(iri))
            iri = iri.substr(this._baseLength);
        if (escape.test(iri))
            iri = iri.replace(escapeAll, characterReplacer);
        const prefixMatch = this._prefixRegex.exec(iri);
        if (prefixMatch && !prefixMatch[2]) {
            prefixMatch[2] = '';
        }
        return !prefixMatch
            ? `<<a href="${iri}" title="${iri}" ${aTagAttrs}>${iri}</a>>`
            : !prefixMatch[1]
                ? iri
                : `<a href="${iri}" title="${iri}" ${aTagAttrs}>${this._prefixIRIs[prefixMatch[1]] + prefixMatch[2] || ':'}</a>`;
    }
    _writeQuad(subject, predicate, object, graph, done) {
        try {
            if (!graph.equals(this._graph)) {
                const graphStr = graph.id.toString().toLowerCase();
                let graphLabel = 'assertion';
                if (graphStr.endsWith('head'))
                    graphLabel = 'head';
                if (graphStr.endsWith('provenance') || graphStr.endsWith('prov'))
                    graphLabel = 'provenance';
                if (graphStr.endsWith('pubinfo'))
                    graphLabel = 'pubinfo';
                this._write((this._subject === null ? '' : this._inDefaultGraph ? '.<br/>' : ' .<br/>}</div>') +
                    (DEFAULTGRAPH.equals(graph)
                        ? ''
                        : `<div class="nanopub-graph" id="nanopub-${graphLabel}">${this._encodeIriOrBlank(graph)} {<br/>`));
                this._graph = graph;
                this._subject = null;
            }
            if (subject.equals(this._subject)) {
                if (predicate.equals(this._predicate))
                    this._write(`, ${this._encodeObject(object)}`, done);
                else
                    this._write(` ;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this._encodePredicate((this._predicate = predicate))} ${this._encodeObject(object)}`, done);
            }
            else {
                this._write(`${(this._subject === null ? '' : ' .<br/>') +
                    `&nbsp;&nbsp;&nbsp;&nbsp;` +
                    this._encodeSubject((this._subject = subject))} ${this._encodePredicate((this._predicate = predicate))} ${this._encodeObject(object)}`, done);
            }
        }
        catch (error) {
            done && done(error);
        }
    }
    addPrefixes(prefixes, done) {
        if (this._subject !== null) {
            this._write(this._inDefaultGraph ? '.<br/>' : '<br/>}<br/>');
            (this._subject = null), (this._graph = '');
        }
        if (!this._prefixIRIs)
            return done && done();
        let hasPrefixes = false;
        for (let prefix in prefixes) {
            let iri = prefixes[prefix];
            if (typeof iri !== 'string')
                iri = iri.value;
            hasPrefixes = true;
            this._prefixIRIs[iri] = prefix += ':';
        }
        if (hasPrefixes) {
            let IRIlist = '', prefixList = '';
            for (const prefixIRI in this._prefixIRIs) {
                IRIlist += IRIlist ? `|${prefixIRI}` : prefixIRI;
                prefixList += (prefixList ? '|' : '') + this._prefixIRIs[prefixIRI];
            }
            IRIlist = escapeRegex(IRIlist);
            this._prefixRegex = new RegExp(`^(?:${prefixList})[^\/]*$|` + `^(${IRIlist})([_a-zA-Z][\\-_a-zA-Z0-9]*)*$`);
        }
    }
    end(done) {
        if (this._subject !== null) {
            this._write(this._inDefaultGraph ? '.<br/>' : ' .<br/>}</div>');
            this._subject = null;
        }
        this._write = this._blockedWrite;
        let singleDone = done &&
            ((error, result) => {
                (singleDone = null), done(error, result);
            });
        if (this._endStream) {
            try {
                return this._outputStream.end(singleDone);
            }
            catch (error) {
            }
        }
        singleDone && singleDone();
    }
}
function escapeRegex(regex) {
    return regex.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, '\\$&');
}
function characterReplacer(character) {
    let result = escapedCharacters[character];
    if (result === undefined) {
        if (character.length === 1) {
            result = character.charCodeAt(0).toString(16);
            result = '\\u0000'.substr(0, 6 - result.length) + result;
        }
        else {
            result = ((character.charCodeAt(0) - 0xd800) * 0x400 + character.charCodeAt(1) + 0x2400).toString(16);
            result = '\\U00000000'.substr(0, 10 - result.length) + result;
        }
    }
    return result;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof undefined === "function") r = undefined(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const npColor = {
    head: css `#e8e8e8`,
    assertion: css `#99ccff`,
    provenance: css `#f3a08c`,
    pubinfo: css `#ffff66`,
    error: css `#f88b80`,
    grey: css `#d1d1d1`
};
let NanopubDisplay = class NanopubDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this.url = '';
        this.rdf = '';
        this.displayPrefixes = false;
        this.displayHead = false;
        this.displayPubinfo = true;
        this.displayProvenance = true;
        this.displayAssertion = true;
        this.hidePubinfo = false;
        this.hideProvenance = false;
        this.hideAssertion = false;
        this.disableDisplayButton = false;
        this.showDisplayOptions = false;
        this._handleClickOut = (e) => {
            const ele = this.renderRoot.querySelector(`.display-checklist`);
            if (window && !(ele === null || ele === void 0 ? void 0 : ele.contains(e.originalTarget))) {
                this.showDisplayOptions = false;
                window.removeEventListener('click', this._handleClickOut);
            }
        };
    }
    async connectedCallback() {
        super.connectedCallback();
        if (!this.url && !this.rdf) {
            this.error = `⚠️ No nanopublication has been provided, use the "url" or "rdf"
        attribute to provide the URL, or RDF in the TRiG format, of the nanopublication.`;
        }
        if (!this.error && this.url && !this.rdf) {
            if (this.url.startsWith('https://purl.org/np/') && !this.url.endsWith('.trig')) {
                this.url = this.url + '.trig';
            }
            try {
                const response = await fetch(this.url);
                this.rdf = await response.text();
            }
            catch (error) {
                this.error = `⚠️ Issue fetching the nanopublication RDF at ${this.url}. ${error}`;
            }
        }
        if (!this.error && this.rdf) {
            const parser = new Parser();
            const writer = new NanopubWriter(null, { format: 'application/trig' });
            const quadList = [];
            parser.parse(this.rdf, (error, quad, prefixes) => {
                if (error) {
                    this.error = `⚠️ Issue parsing the nanopublication RDF with n3.js, make sure it is in the TRiG format. ${error}`;
                    return null;
                }
                if (quad) {
                    quadList.push(quad);
                }
                else {
                    this.prefixes = {
                        this: prefixes['this'],
                        sub: prefixes['sub'],
                        ...prefixes
                    };
                    writer.addPrefixes(this.prefixes, null);
                    quadList.map((addQuad) => {
                        writer.addQuad(addQuad);
                    });
                    writer.end((_error, result) => {
                        this.html_rdf = unsafeHTML(result);
                        setTimeout(() => {
                            this._applyDisplay('displayPrefixes');
                            this._applyDisplay('displayHead');
                            if (this.hidePubinfo)
                                this.displayPubinfo = false;
                            this._applyDisplay('displayPubinfo');
                            if (this.hideProvenance)
                                this.displayProvenance = false;
                            this._applyDisplay('displayProvenance');
                            if (this.hideAssertion)
                                this.displayAssertion = false;
                            this._applyDisplay('displayAssertion');
                        }, 0);
                    });
                }
            });
        }
    }
    _applyDisplay(displayProp) {
        const displayLabel = displayProp.substring(7).toLowerCase();
        const ele = this.renderRoot.querySelector(`#nanopub-${displayLabel}`);
        if (ele) {
            ele.style.display = this[displayProp] ? 'inherit' : 'none';
        }
    }
    _switchDisplay(displayProp) {
        this[displayProp] = !this[displayProp];
        this._applyDisplay(displayProp);
    }
    _openDisplayOptions() {
        this.showDisplayOptions = !this.showDisplayOptions;
        if (window && this.showDisplayOptions) {
            window.addEventListener('click', this._handleClickOut);
        }
    }
    render() {
        return html `
      <div
        class="nanopub"
        style=${styleMap({
            'background-color': this.error ? npColor.error.toString() : 'inherit'
        })}
      >
        ${when(this.prefixes, () => {
            return html ` @prefix ${Object.keys(this.prefixes)[0]} <<a
              href="${this.prefixes[Object.keys(this.prefixes)[0]]}"
              target="_blank"
              rel="noopener noreferrer"
              >${this.prefixes[Object.keys(this.prefixes)[0]]}</a
            >> .
            ${!this.disableDisplayButton
                ? html `<div class="display-checklist" tabindex="100">
                  <span
                    class="anchor-display-checklist"
                    @click="${() => this._openDisplayOptions()}"
                    @touchstart="${() => this._openDisplayOptions()}"
                  >
                    ${displayIcon} ${this.showDisplayOptions ? html `Select the sections to display` : html ``}
                  </span>
                  ${this.showDisplayOptions
                    ? html `<div class="display-checklist-wrapper">
                        <ul class="items" id="display-checklist-items">
                          <li id="displayPrefixes" @click=${(e) => this._switchDisplay(e.target.id)}>
                            <label
                              ><input
                                type="checkbox"
                                value="displayPrefixes"
                                .checked=${this.displayPrefixes}
                                @click=${(e) => this._switchDisplay(e.target.value)}
                              />
                              Display prefixes
                            </label>
                          </li>
                          <li id="displayHead" @click=${(e) => this._switchDisplay(e.target.id)}>
                            <label
                              ><input
                                type="checkbox"
                                value="displayHead"
                                .checked=${this.displayHead}
                                @click=${(e) => this._switchDisplay(e.target.value)}
                              />
                              Display Head graph
                            </label>
                          </li>
                          <li id="displayAssertion" @click=${(e) => this._switchDisplay(e.target.id)}>
                            <label
                              ><input
                                type="checkbox"
                                value="displayAssertion"
                                .checked=${this.displayAssertion}
                                @click=${(e) => this._switchDisplay(e.target.value)}
                              />
                              Display Assertion graph
                            </label>
                          </li>
                          <li id="displayProvenance" @click=${(e) => this._switchDisplay(e.target.id)}>
                            <label
                              ><input
                                type="checkbox"
                                value="displayProvenance"
                                .checked=${this.displayProvenance}
                                @click=${(e) => this._switchDisplay(e.target.value)}
                              />
                              Display Provenance graph
                            </label>
                          </li>
                          <li id="displayPubinfo" @click=${(e) => this._switchDisplay(e.target.id)}>
                            <label
                              ><input
                                type="checkbox"
                                value="displayPubinfo"
                                .checked=${this.displayPubinfo}
                                @click=${(e) => this._switchDisplay(e.target.value)}
                              />
                              Display PubInfo graph
                            </label>
                          </li>
                        </ul>
                      </div>`
                    : html ``}
                </div>`
                : html ``}
            <br />

            <div id="nanopub-prefixes">
              ${Object.keys(this.prefixes).map((prefix, i) => {
                if (i === 0) {
                    return html ``;
                }
                return html `
                  @prefix ${prefix} <<a href="${this.prefixes[prefix]}" target="_blank" rel="noopener noreferrer"
                    >${this.prefixes[prefix]}</a
                  >> .
                  <br />
                `;
            })}
            </div>`;
        })}
        ${this.html_rdf ? html `${this.html_rdf}` : this.error ? html `${this.error}` : html `Loading...`}
      </div>
    `;
    }
};
NanopubDisplay.styles = css `
    :host {
      font-family: monaco, monospace;
      font-size: 11pt;
      color: #444;
      display: flex;
      height: 100%;
      width: 100%;
      word-break: break-all;
      margin-bottom: 8px;
    }
    a {
      color: #000;
      text-decoration: none;
    }
    a:hover {
      color: #666;
    }
    .nanopub {
      height: 100%;
      padding: 8px;
      border-radius: 8px;
      border: solid;
      border-width: 1px;
    }
    .nanopub-graph {
      padding: 8px;
      margin-top: 8px;
      border-radius: 8px;
    }
    #nanopub-prefixes {
      display: none;
    }
    #nanopub-head {
      display: none;
      background: ${npColor.head};
    }
    #nanopub-assertion {
      background: ${npColor.assertion};
    }
    #nanopub-provenance {
      background: ${npColor.provenance};
    }
    #nanopub-pubinfo {
      background: ${npColor.pubinfo};
    }
    .display-checklist {
      font-family: sans-serif;
      float: right;
      font-size: 9pt;
      background: ${npColor.head};
      border-radius: 7px;
      text-align: center;
    }
    .display-checklist .anchor-display-checklist {
      position: relative;
      display: inline-block;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 7px;
      cursor: help;
    }
    .display-checklist .anchor-display-checklist:hover {
      background: ${npColor.grey};
    }
    .display-checklist-wrapper {
      z-index: 1;
      position: absolute;
      margin-top: 1px;
    }
    .display-checklist ul.items {
      position: relative;
      min-width: 100px;
      text-align: left;
      width: max-content;
      padding: 2px;
      margin: 0;
      border: 1px solid #ccc;
      border-radius: 7px;
      background: #fff;
    }
    .display-checklist ul.items li {
      list-style: none;
      margin-right: 8px;
    }
    .display-checklist label,
    li,
    input[type='checkbox'] {
      cursor: pointer;
    }
  `;
__decorate([
    property({ type: String })
], NanopubDisplay.prototype, "url", void 0);
__decorate([
    property({ type: String })
], NanopubDisplay.prototype, "rdf", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "displayPrefixes", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "displayHead", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "displayPubinfo", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "displayProvenance", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "displayAssertion", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "hidePubinfo", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "hideProvenance", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "hideAssertion", void 0);
__decorate([
    property({ type: Boolean })
], NanopubDisplay.prototype, "disableDisplayButton", void 0);
__decorate([
    state()
], NanopubDisplay.prototype, "showDisplayOptions", void 0);
__decorate([
    state()
], NanopubDisplay.prototype, "html_rdf", void 0);
__decorate([
    state()
], NanopubDisplay.prototype, "prefixes", void 0);
__decorate([
    state()
], NanopubDisplay.prototype, "error", void 0);
NanopubDisplay = __decorate([
    customElement('nanopub-display')
], NanopubDisplay);
const displayIcon = html `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -80 1000 1000">
  <path
    d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"
  />
</svg>`;

export { NanopubDisplay, NanopubWriter };
