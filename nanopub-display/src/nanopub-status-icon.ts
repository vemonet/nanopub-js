import {LitElement, html, css} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

const grlcNpApiUrls = [
  'https://grlc.nps.petapico.org/api/local/local',
  'https://grlc.services.np.trustyuri.net/api/local/local'
]

/**
 * A component to display the status of a Nanopublication.
 */
@customElement('nanopub-status-icon')
export class NanopubStatusIcon extends LitElement {
  static override styles = css`
    :host {
      font-family: sans-serif;
      display: flex;
      align-items: center;
      float: right;
      cursor: help;
    }
  `

  /**
   * The URL of the nanopub to get the status from
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

    if (!this.url) {
      this.error = 'No URL provided'
      return
    }

    if (this.url.startsWith('https://purl.org/np/')) {
      this.url = this.url.replace('https://purl.org/np/', 'http://purl.org/np/')
    }
    if (this.url.endsWith('.trig')) {
      this.url = this.url.slice(0, -5)
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
      const resp = await response.json()
      this.latestVersions = resp['results']['bindings']
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
      ${this.error
        ? html`<span title="${this.error}">❌</span>`
        : !this.latestVersions
        ? html`<span title="Checking for updates...">⏳️</span>`
        : this.latestVersions.length > 0 && this.latestVersions[0]['latest']['value'] === this.url
        ? html`<span title="This is the latest version.">✅</span>`
        : this.latestVersions.length == 0
        ? html`<span title="This nanopublication has been retracted.">⚠️🗑️</span>`
        : this.latestVersions.length > 1
        ? html`<span
            title="This nanopublication has newer versions: ${this.latestVersions.map((version: any) => {
              html` <code><a href="${version['latest']['value']}">${version['latest']['value']}</a></code>`
            })}"
            >⚠️⏫</span
          >`
        : html`<span title="This nanopublication has a newer version: ${this.latestVersions[0] || ''}">⚠️🔼</span>`}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nanopub-status-icon': NanopubStatusIcon
  }
}
