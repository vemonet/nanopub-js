import { Parser } from 'n3';
export const cytoscapeGetConfig = (rdf) => {
    return {
        style: defaultCytoscapeStyle,
        elements: nanopubToCytoscapeElems(rdf),
        layout: layoutsConfig['cose-bilkent'],
        boxSelectionEnabled: true,
        autounselectify: true,
        autoungrabify: false,
        wheelSensitivity: 0.1,
        showOverlay: true,
    };
};
export const nanopubToCytoscapeElems = async (rdf) => {
    const parser = new Parser({ format: 'application/trig' });
    const cytoscapeElems = [];
    const graphs = {};
    parser.parse(rdf, (error, quad, prefixes) => {
        if (error) {
            console.log('Error parsing the RDF with n3 to display in cytoscape', error);
            return null;
        }
        if (quad && quad.subject.value && quad.object.value) {
            cytoscapeElems.push({
                data: {
                    id: quad.subject.value,
                    label: quad.subject.value,
                    shape: 'ellipse',
                    backgroundColor: '#90caf9',
                    parent: quad.graph.value,
                    valign: 'center',
                    fontSize: '30px',
                    fontWeight: '300',
                    textColor: '#212121'
                }
            });
            const cutLongObject = !quad.object.value.includes(' ') && quad.object.value.length > 100
                ? quad.object.value.replace(/(.{60})/g, '$1\n')
                : quad.object.value;
            cytoscapeElems.push({
                data: {
                    id: quad.object.value,
                    label: cutLongObject,
                    shape: quad.object.termType == 'NamedNode' ? 'ellipse' : 'round-rectangle',
                    backgroundColor: quad.object.termType == 'NamedNode' ? '#90caf9' : '#80cbc4',
                    textColor: '#000000',
                    parent: quad.graph.value,
                    valign: 'center',
                    fontSize: '30px',
                    fontWeight: '300'
                }
            });
            cytoscapeElems.push({
                data: {
                    source: quad.subject.value,
                    target: quad.object.value,
                    label: quad.predicate.value
                }
            });
            graphs[quad.graph.value] = quad.graph.value;
        }
        else {
            Object.keys(graphs).map((g) => {
                let graphColor = '#eceff1';
                let graphTextColor = '#000000';
                if (g.endsWith('assertion')) {
                    graphColor = '#e3f2fd';
                    graphTextColor = '#0d47a1';
                }
                else if (g.endsWith('provenance')) {
                    graphColor = '#ffebee';
                    graphTextColor = '#b71c1c';
                }
                else if (g.toLowerCase().endsWith('pubinfo')) {
                    graphColor = '#fffde7';
                    graphTextColor = '#f57f17';
                }
                cytoscapeElems.unshift({
                    data: {
                        id: g,
                        label: g,
                        shape: 'round-rectangle',
                        backgroundColor: graphColor,
                        textColor: graphTextColor,
                        valign: 'top',
                        fontSize: '50px',
                        fontWeight: '700'
                    }
                });
            });
            const allPrefixes = { ...prefixes, rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' };
            cytoscapeElems.map((elem) => {
                if (elem.data.label) {
                    elem.data.label = replacePrefix(elem.data.label, allPrefixes);
                }
            });
        }
    });
    return cytoscapeElems;
};
export const replacePrefix = (uri, prefixes) => {
    for (let i = 0; i < Object.keys(prefixes).length; i++) {
        const prefix = Object.keys(prefixes)[i];
        if (uri.startsWith(prefixes[prefix])) {
            return uri.replace(prefixes[prefix], prefix + ':');
        }
    }
    return uri;
};
export const displayLink = (urlString) => {
    if (/^(?:node[0-9]+)|((https?|ftp):.*)$/.test(urlString)) {
        return `<a href="${urlString}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
            ${urlString}
        </a>`;
    }
    else {
        return urlString;
    }
};
export const cytoscapeHighlightConnectedEdges = (e, cy) => {
    cy === null || cy === void 0 ? void 0 : cy.edges().style({
        'line-color': '#263238', 'color': '#263238',
        'width': 2, 'target-arrow-color': '#263238',
        'font-size': '30px'
    });
    const ele = e.target;
    ele.connectedEdges().style({
        'line-color': '#c62828', 'color': '#c62828',
        'width': 4, 'target-arrow-color': '#c62828',
        'font-size': '40px',
    });
};
export const cytoscapeShowNodeOnClick = (e) => {
    const ele = e.target;
    ele.popper({
        content: () => {
            if (window) {
                setTimeout(() => window.addEventListener('click', handleClickOut), 0);
            }
            const div = document.createElement('div');
            const elementLabel = ele.id().startsWith('graph-http') ? ele.id().replace('graph-http', 'http') : ele.id();
            div.innerHTML = `<div id="cytoscapePop" class="cytoscapePopper"
          style="background: #eff1f1; padding: 8px; border-radius: 8px; border: 1px solid #ccc;"
        >
          <span>${displayLink(elementLabel)}</span>
        </div>`;
            document.body.appendChild(div);
            return div;
        }
    });
};
const handleClickOut = (e) => {
    const popEle = document.getElementById('cytoscapePop');
    if (window && popEle && !(popEle === null || popEle === void 0 ? void 0 : popEle.contains(e.originalTarget))) {
        window.removeEventListener('click', handleClickOut);
        popEle === null || popEle === void 0 ? void 0 : popEle.remove();
    }
};
export const defaultCytoscapeStyle = [
    {
        selector: 'edge',
        style: {
            label: 'data(label)',
            color: '#263238',
            'line-color': '#263238',
            width: 2,
            'arrow-scale': 2,
            'target-arrow-color': '#263238',
            'text-wrap': 'wrap',
            'font-size': '30px',
            'text-opacity': 0.9,
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'control-point-step-size': 300
        }
    },
    {
        selector: 'edge:parent',
        style: {
            color: '#c62828',
            'line-color': '#c62828',
            width: 2,
            'arrow-scale': 2,
            'target-arrow-color': '#c62828'
        }
    },
    {
        selector: 'node',
        style: {
            label: 'data(label)',
            'text-wrap': 'wrap',
            'overflow-wrap': 'break-word',
            'text-max-width': '800px',
            'font-size': 'data(fontSize)',
            'text-valign': 'data(valign)',
            'text-halign': 'center',
            width: 'label',
            height: 'label',
            padding: '25px',
            shape: 'data(shape)',
            'background-color': 'data(backgroundColor)',
            color: 'data(textColor)'
        }
    }
];
export const layoutsConfig = {
    'cose-bilkent': {
        name: 'cose-bilkent',
        ready: function () { },
        stop: function () { },
        quality: 'default',
        nodeDimensionsIncludeLabels: false,
        refresh: 30,
        fit: true,
        padding: 10,
        randomize: true,
        nodeRepulsion: 4500,
        idealEdgeLength: 200,
        edgeElasticity: 0.45,
        nestingFactor: 0.1,
        gravity: 0.25,
        numIter: 2500,
        tile: true,
        animate: false,
        animationDuration: 500,
        tilingPaddingVertical: 10,
        tilingPaddingHorizontal: 10,
        gravityRangeCompound: 1.5,
        gravityCompound: 1.0,
        gravityRange: 3.8,
        initialEnergyOnIncremental: 0.5
    }
};
//# sourceMappingURL=cytoscape.js.map