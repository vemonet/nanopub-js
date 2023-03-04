import {LitElement, html, css,} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import { Parser, Quad } from 'n3';

import { NanopubWriter } from './n3-writer'

// Use ref and async loading: https://lit.dev/docs/templates/directives/#ref

/**
 * A component to display a Nanopublication.
 */
@customElement('nanopub-display')
export class NanopubDisplay extends LitElement {

  static override styles = css`
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
    a { color: #000; text-decoration: none; }
    a:hover { color: #666; }
    .nanopub { margin: 0 0 30px 0; padding: 0px 10px 10px 10px; border-radius: 10px; border: solid; border-width: 1px; }
    .nanopub-prefixes { margin-top: 10px; }
    .nanopub-head { background: #e8e8e8; padding: 10px; margin-top: 10px; border-radius: 10px; }
    .nanopub-assertion { background: #99ccff; padding: 10px; margin-top: 10px; border-radius: 10px; }
    .nanopub-provenance { background: #f3a08c; padding: 10px; margin-top: 10px; border-radius: 10px; }
    .nanopub-pubinfo { background: #ffff66; padding: 10px; margin-top: 10px; border-radius: 10px; }
  `;

  /**
   * The URL of the nanopublication to display
   */
  @property({type: String})
  url: string = '';

  /**
   * The RDF string of the nanopublication to display. Will be downloaded from URL if not provided.
   */
  @property({type: String})
  rdf: string = '';

  @state()
  html_rdf?: any;

  prefixes?: any;


  override async connectedCallback() {
    super.connectedCallback();

    if (this.url && !this.rdf) {
      if (this.url.startsWith("https://purl.org/np/") && !this.url.endsWith(".trig")) {
        this.url = this.url + ".trig"
      }
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
              this.html_rdf = unsafeHTML(result)
              // this.html_rdf = html`${result}`
            });
          }
        }
    )
  }


  override render() {
    return html`
      <div>
        ${html`${this.html_rdf}`}
      </div>
      ${when(!this.html_rdf, () => html`Loading...`)}
    `;
  }

}



declare global {
  interface HTMLElementTagNameMap {
    'nanopub-display': NanopubDisplay;
  }
}
// declare namespace JSX {
//   interface IntrinsicElements {
//       "nanopub-display": React.DetailedHTMLProps<
//           React.HTMLAttributes<HTMLElement>,
//           HTMLElement
//       > & {
//           url?: string;
//           rdf?: string;
//       };
//   }
// }