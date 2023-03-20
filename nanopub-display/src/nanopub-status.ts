import {LitElement, html, css} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

export const grlcNpApiUrls = [
  'https://grlc.nps.petapico.org/api/local/local',
  'https://grlc.services.np.trustyuri.net/api/local/local'
]

/**
 * A component to display the status of a Nanopublication.
 */
@customElement('nanopub-status')
export class NanopubStatus extends LitElement {
  static override styles = css`
    :host {
      font-family: sans-serif;
      font-size: small;
    }
  `

  /**
   * The URL of the nanopub to get status from
   */
  @property({type: String})
  url = ''

  /**
   * Latest versions retrieved from the grlc API for the nanopub
   */
  @state()
  latestVersions?: any

  /**
   * Error message to show if there is a problem retrieving the nanopub status
   */
  @state()
  error?: string

  /**
   * Run when the component is initialized to get the nanopub status
   */
  override async connectedCallback() {
    super.connectedCallback()
    if (this.url.startsWith('https://purl.org/np/')) {
      this.url = this.url.replace('https://purl.org/np/', 'http://purl.org/np/')
    }

    const shuffledApiUrls = [...grlcNpApiUrls].sort(() => 0.5 - Math.random())
    this.getUpdateStatusX(this.url, shuffledApiUrls)
  }

  /**
   * Get update status for a URI in one of the APIs
   */
  async getUpdateStatusX(npUri: string, apiUrls) {
    if (apiUrls.length == 0) {
      this.error = 'An error has occurred while checking for updates.'
      return
    }
    const apiUrl = apiUrls.shift()
    const requestUrl = apiUrl + '/get_latest_version?np=' + npUri

    try {
      const response = await fetch(requestUrl, {
        headers: {
          Accept: 'application/json'
        }
      })
      const r = await response.json()
      this.latestVersions = r['results']['bindings']
      return
    } catch (error) {
      this.getUpdateStatusX(npUri, apiUrls)
      // TODO: recall the API? It might create an endless loop if the 2 APIs are not responding
      // this.error = `⚠️ Issue fetching the nanopublication RDF at ${this.url}. ${error}`;
      return
    }
  }

  override render() {
    return html`
      <p>
        ${this.error
          ? html`<em>${this.error}</em>`
          : !this.latestVersions
          ? html`<em>Checking for updates...</em>`
          : this.latestVersions.length > 0 && this.latestVersions[0]['latest']['value'] === this.url
          ? html`This is the latest version.`
          : this.latestVersions.length == 0
          ? html`This nanopublication has been <strong>retracted</strong>.`
          : this.latestVersions.length > 1
          ? html`This nanopublication has <strong>newer versions</strong>:
              ${this.latestVersions.map((version: any) => {
                html` <code><a href="${version['latest']['value']}">${version['latest']['value']}</a></code>`
              })}`
          : html`This nanopublication has a <strong>newer version</strong>`}
      </p>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nanopub-status': NanopubStatus
  }
}
