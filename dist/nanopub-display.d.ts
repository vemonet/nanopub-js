import { LitElement } from 'lit';
export declare class NanopubDisplay extends LitElement {
    static styles: import("lit").CSSResult;
    url: string;
    rdf: string;
    displayPrefixes: boolean;
    displayHead: boolean;
    displayPubinfo: boolean;
    displayProvenance: boolean;
    displayAssertion: boolean;
    hidePubinfo: boolean;
    hideProvenance: boolean;
    hideAssertion: boolean;
    disableDisplayButton: boolean;
    showDisplayOptions: boolean;
    html_rdf?: any;
    prefixes?: any;
    error?: string;
    connectedCallback(): Promise<void>;
    _applyDisplay(displayProp: string): void;
    _switchDisplay(displayProp: string): void;
    _openDisplayOptions(): void;
    _handleClickOut: (e: any) => void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nanopub-display': NanopubDisplay;
    }
}
export declare namespace JSX {
    interface NanopubDisplay {
        url?: string;
        rdf?: string;
    }
    interface IntrinsicElements {
        'nanopub-display': NanopubDisplay;
    }
}
//# sourceMappingURL=nanopub-display.d.ts.map