import { Writer, DataFactory } from 'n3';
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
export class NanopubWriter extends Writer {
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
//# sourceMappingURL=n3-writer.js.map