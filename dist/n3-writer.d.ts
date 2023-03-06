import { Writer } from 'n3';
export declare class NanopubWriter extends Writer {
    _lists: any;
    _baseMatcher: any;
    _baseLength: any;
    _prefixRegex: any;
    _prefixIRIs: any;
    _inDefaultGraph: any;
    _graph: any;
    _subject: any;
    _predicate: any;
    _blockedWrite: any;
    _outputStream: any;
    _endStream: any;
    _encodeSubject: any;
    _encodePredicate: any;
    _encodeObject: any;
    _write: any;
    _encodeIriOrBlank(entity: any): any;
    _writeQuad(subject: any, predicate: any, object: any, graph: any, done: any): void;
    addPrefixes(prefixes: any, done: any): any;
    end(done: any): any;
}
//# sourceMappingURL=n3-writer.d.ts.map