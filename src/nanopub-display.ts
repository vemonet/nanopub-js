import {LitElement, html, css,} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {styleMap} from 'lit/directives/style-map.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import { Parser, Quad } from 'n3';

import { NanopubWriter } from './n3-writer'

// Use ref and async loading: https://lit.dev/docs/templates/directives/#ref

const npColor = {
  head: css`#e8e8e8`,
  headDark: css`#d1d1d1`,
  assertion: css`#99ccff`,
  provenance: css`#f3a08c`,
  pubinfo: css`#ffff66`,
}

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
    .nanopub-collapse-button {
      float: right;
      font-size: 9pt;
      background: ${npColor.head};
      padding: 5px;
      margin-left: 8px;
      border-radius: 7px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .nanopub-collapse-button:hover {
      background: ${npColor.headDark};
    }
    #nanopub-collapse-pubinfo:hover {
      background: ${npColor.pubinfo};
    }
    a { color: #000; text-decoration: none; }
    a:hover { color: #666; }
    .nanopub { margin: 0 0 30px 0; padding: 0px 8px 8px 8px; border-radius: 8px; border: solid; border-width: 1px; }
    .nanopub-head { display: none; background: ${npColor.head}; padding: 8px; margin-top: 8px; border-radius: 8px; }
    .nanopub-assertion { background: ${npColor.assertion}; padding: 8px; margin-top: 8px; border-radius: 8px; }
    .nanopub-provenance { background: ${npColor.provenance}; padding: 8px; margin-top: 8px; border-radius: 8px; }
    .nanopub-pubinfo { background: ${npColor.pubinfo}; padding: 8px; margin-top: 8px; border-radius: 8px; }
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

  /**
   * The RDF string of the nanopublication to display. Will be downloaded from URL if not provided.
   */
  @property({type: Boolean})
  collapsePrefixes: boolean = true;

  @state()
  prefixesHidden: boolean = true;
  @state()
  headHidden: boolean = true;
  @state()
  pubinfoHidden: boolean = false;
  // provenanceHidden: boolean = true;

  @state()
  html_rdf?: any;

  @state()
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
            this.prefixes = {
              this: prefixes["this"],
              sub: prefixes["sub"],
              ...prefixes
            }
            writer.addPrefixes(this.prefixes, null)
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

  // const myElement = document.querySelector('my-element');
  // myElement.addEventListener('my-event', (e) => {console.log(e)});

  // ${when(this.prefixes, () => {
  // })}

  override render() {
    return html`
      <div>
        ${when(this.prefixes, () => {
          return html`
            @prefix ${Object.keys(this.prefixes)[0]} <<a href="${this.prefixes[Object.keys(this.prefixes)[0]]}" target="_blank" rel="noopener noreferrer">${this.prefixes[Object.keys(this.prefixes)[0]]}</a>> .
            <button @click="${this._expandPrefixes}" class="nanopub-collapse-button" id="nanopub-collapse-prefixes">
              ${(this.prefixesHidden) ? 'Show all prefixes' : 'Collapse prefixes'}
            </button>
            <button @click="${this._expandHead}" class="nanopub-collapse-button" id="nanopub-collapse-head">
              ${(this.headHidden) ? 'Show Head graph' : 'Collapse Head graph'}
            </button>
            <button @click="${this._expandPubinfo}" class="nanopub-collapse-button" id="nanopub-collapse-pubinfo">
              ${(this.pubinfoHidden) ? 'Show pubinfo graph' : 'Collapse pubinfo graph'}
            </button>
            <br/>
            <div class="nanopub-prefixes" style=${styleMap({ display: this.prefixesHidden ? 'none' : 'inherit' })}>
              ${Object.keys(this.prefixes).map((prefix, i) => {
                // console.log(prefix, i, this.prefixes[prefix])
                if (i === 0) {
                  return html``
                }
                return html`
                  @prefix ${prefix} <<a href="${this.prefixes[prefix]}" target="_blank" rel="noopener noreferrer">${this.prefixes[prefix]}</a>> .
                  <br/>
                `
              })}
            </div>`
        })}
        ${html`${this.html_rdf}`}
      </div>
      ${when(!this.html_rdf, () => html`Loading...`)}
    `;
  }

  _expandPrefixes() {
    this.prefixesHidden = !this.prefixesHidden
  }

  _expandHead() {
    this.headHidden = !this.headHidden
    const ele: HTMLElement|null = this.renderRoot.querySelector('.nanopub-head');
    if (ele) {
      ele.style.display = (this.headHidden) ? "none" : "inherit"
    }
  }

  _expandPubinfo() {
    this.pubinfoHidden = !this.pubinfoHidden
    const ele: HTMLElement|null = this.renderRoot.querySelector('.nanopub-pubinfo');
    if (ele) {
      ele.style.display = (this.pubinfoHidden) ? "none" : "inherit"
    }
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