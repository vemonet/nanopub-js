import {
    attr,
    html,
    css,
    customElement,
    observable,
    when,
    FASTElement,
} from "@microsoft/fast-element";
import { Parser, Quad } from 'n3';

import { NanopubWriter } from './n3-writer'

const template = html<NanopubDisplay>`
  <div>
    ${x => x.html_rdf}
  </div>

  ${when(x => !x.html_rdf, html<NanopubDisplay>`
    Loading...
  `)}
`;

const styles = css`
  :host {
    font-family: monaco,monospace;
    font-size: 11pt;
    color: #444;
    display: flex;
    height: 100%;
    width: 100%;
    word-break: break-all;
    margin-bottom: 8px;
  }

  a { color: #000; text-decoration: none; }
  a:hover { color: #666; }
  .nanopub { margin: 0 0 30px 0; padding: 0px 10px 10px 10px; border-radius: 10px; border: solid; border-width: 1px; }
  .nanopub-prefixes { margin-top: 10px; }
  .nanopub-head { background: #e8e8e8; padding: 10px; margin-top: 10px; border-radius: 10px; }
  .nanopub-assertion { background: #99ccff; padding: 10px; margin-top: 10px; border-radius: 10px; }
  .nanopub-provenance { background: #f3a08c; padding: 10px; margin-top: 10px; border-radius: 10px; }
  .nanopub-pubinfo { background: #ffff66; padding: 10px; margin-top: 10px; border-radius: 10px; }
`;


@customElement({
    name: "nanopub-display",
    template,
    styles,
    // shadowOptions: { delegatesFocus: true, mode: 'open' },
})
export class NanopubDisplay extends FASTElement {
    @attr url: string = "";
    @attr rdf: string = "";
    prefixes?: any;

    @observable
    html_rdf?: any;

    async connectedCallback() {
      super.connectedCallback();

      if (this.url && !this.rdf) {
        const response = await fetch(this.url);
        this.rdf = await response.text();
      }

      const parser = new Parser({ format: 'application/trig' })
      const writer = new NanopubWriter(null, { format: 'application/trig' });
      const quadList: Quad[] = []

      parser.parse(
        this.rdf,
        (error: any, quad: Quad, prefixes: any): any => {
            if (error) {
            console.log("Error parsing the RDF with n3:", error)
                return null
            }
            if (quad) {
              quadList.push(quad)
            } else {
              writer.addPrefixes({
                sub: prefixes["sub"],
                this: prefixes["this"],
                ...prefixes
              }, null)
              // Add the quads to the writer after the prefixes
              quadList.map((addQuad: Quad) => {
                writer.addQuad(addQuad)
              })
              writer.end((_error: any, result: string) => {
                this.html_rdf = html`${result}`
              });
            }
          }
      )
    }

}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       ['nanopub-display']: CustomElement<NanopubDisplay>;
//     }
//   }
// }