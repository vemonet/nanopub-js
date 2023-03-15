/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = window, oe = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), _e = /* @__PURE__ */ new WeakMap();
let Oe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== de)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (oe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = _e.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && _e.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ze = (r) => new Oe(typeof r == "string" ? r : r + "", void 0, de), P = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, n) => i + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new Oe(t, r, de);
}, We = (r, e) => {
  oe ? r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), s = W.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  });
}, pe = oe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules)
    t += i.cssText;
  return Ze(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ee;
const V = window, be = V.trustedTypes, Ve = be ? be.emptyScript : "", ge = V.reactiveElementPolyfillSupport, he = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ve : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, De = (r, e) => e !== r && (e == e || r == r), te = { attribute: !0, type: String, converter: he, reflect: !1, hasChanged: De };
let k = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, i) => {
      const s = this._$Ep(i, t);
      s !== void 0 && (this._$Ev.set(s, i), e.push(s));
    }), e;
  }
  static createProperty(e, t = te) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Object.defineProperty(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(s) {
      const n = this[e];
      this[t] = s, this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || te;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i)
        this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i)
        t.unshift(pe(s));
    } else
      e !== void 0 && t.push(pe(e));
    return t;
  }
  static _$Ep(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return We(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$EO(e, t, i = te) {
    var s;
    const n = this.constructor._$Ep(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : he).toAttribute(t, i.type);
      this._$El = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i;
    const s = this.constructor, n = s._$Ev.get(e);
    if (n !== void 0 && this._$El !== n) {
      const a = s.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? a.converter : he;
      this._$El = n, this[n] = l.fromAttribute(t, a.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let s = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || De)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, n) => this[n] = s), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
        var n;
        return (n = s.hostUpdate) === null || n === void 0 ? void 0 : n.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw t = !1, this._$Ek(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
k.finalized = !0, k.elementProperties = /* @__PURE__ */ new Map(), k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, ge?.({ ReactiveElement: k }), ((ee = V.reactiveElementVersions) !== null && ee !== void 0 ? ee : V.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie;
const J = window, T = J.trustedTypes, ye = T ? T.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, w = `lit$${(Math.random() + "").slice(9)}$`, Le = "?" + w, Je = `<${Le}>`, C = document, H = (r = "") => C.createComment(r), z = (r) => r === null || typeof r != "object" && typeof r != "function", Me = Array.isArray, Ke = (r) => Me(r) || typeof r?.[Symbol.iterator] == "function", D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, $e = />/g, S = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, me = /"/g, Be = /^(?:script|style|textarea|title)$/i, Xe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), x = Xe(1), A = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), N = C.createTreeWalker(C, 129, null, !1), Ye = (r, e) => {
  const t = r.length - 1, i = [];
  let s, n = e === 2 ? "<svg>" : "", a = D;
  for (let u = 0; u < t; u++) {
    const c = r[u];
    let y, h, o = -1, _ = 0;
    for (; _ < c.length && (a.lastIndex = _, h = a.exec(c), h !== null); )
      _ = a.lastIndex, a === D ? h[1] === "!--" ? a = xe : h[1] !== void 0 ? a = $e : h[2] !== void 0 ? (Be.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = S) : h[3] !== void 0 && (a = S) : a === S ? h[0] === ">" ? (a = s ?? D, o = -1) : h[1] === void 0 ? o = -2 : (o = a.lastIndex - h[2].length, y = h[1], a = h[3] === void 0 ? S : h[3] === '"' ? me : ve) : a === me || a === ve ? a = S : a === xe || a === $e ? a = D : (a = S, s = void 0);
    const d = a === S && r[u + 1].startsWith("/>") ? " " : "";
    n += a === D ? c + Je : o >= 0 ? (i.push(y), c.slice(0, o) + "$lit$" + c.slice(o) + w + d) : c + w + (o === -2 ? (i.push(void 0), u) : d);
  }
  const l = n + (r[t] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [ye !== void 0 ? ye.createHTML(l) : l, i];
};
class G {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let n = 0, a = 0;
    const l = e.length - 1, u = this.parts, [c, y] = Ye(e, t);
    if (this.el = G.createElement(c, i), N.currentNode = this.el.content, t === 2) {
      const h = this.el.content, o = h.firstChild;
      o.remove(), h.append(...o.childNodes);
    }
    for (; (s = N.nextNode()) !== null && u.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const o of s.getAttributeNames())
            if (o.endsWith("$lit$") || o.startsWith(w)) {
              const _ = y[a++];
              if (h.push(o), _ !== void 0) {
                const d = s.getAttribute(_.toLowerCase() + "$lit$").split(w), p = /([.?@])?(.*)/.exec(_);
                u.push({ type: 1, index: n, name: p[2], strings: d, ctor: p[1] === "." ? tt : p[1] === "?" ? st : p[1] === "@" ? rt : K });
              } else
                u.push({ type: 6, index: n });
            }
          for (const o of h)
            s.removeAttribute(o);
        }
        if (Be.test(s.tagName)) {
          const h = s.textContent.split(w), o = h.length - 1;
          if (o > 0) {
            s.textContent = T ? T.emptyScript : "";
            for (let _ = 0; _ < o; _++)
              s.append(h[_], H()), N.nextNode(), u.push({ type: 2, index: ++n });
            s.append(h[o], H());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === Le)
          u.push({ type: 2, index: n });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(w, h + 1)) !== -1; )
            u.push({ type: 7, index: n }), h += w.length - 1;
        }
      n++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(r, e, t = r, i) {
  var s, n, a, l;
  if (e === A)
    return e;
  let u = i !== void 0 ? (s = t._$Co) === null || s === void 0 ? void 0 : s[i] : t._$Cl;
  const c = z(e) ? void 0 : e._$litDirective$;
  return u?.constructor !== c && ((n = u?._$AO) === null || n === void 0 || n.call(u, !1), c === void 0 ? u = void 0 : (u = new c(r), u._$AT(r, t, i)), i !== void 0 ? ((a = (l = t)._$Co) !== null && a !== void 0 ? a : l._$Co = [])[i] = u : t._$Cl = u), u !== void 0 && (e = O(r, u._$AS(r, e.values), u, i)), e;
}
class et {
  constructor(e, t) {
    this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(e) {
    var t;
    const { el: { content: i }, parts: s } = this._$AD, n = ((t = e?.creationScope) !== null && t !== void 0 ? t : C).importNode(i, !0);
    N.currentNode = n;
    let a = N.nextNode(), l = 0, u = 0, c = s[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let y;
        c.type === 2 ? y = new Q(a, a.nextSibling, this, e) : c.type === 1 ? y = new c.ctor(a, c.name, c.strings, this, e) : c.type === 6 && (y = new nt(a, this, e)), this.u.push(y), c = s[++u];
      }
      l !== c?.index && (a = N.nextNode(), l++);
    }
    return n;
  }
  p(e) {
    let t = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Q {
  constructor(e, t, i, s) {
    var n;
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cm = (n = s?.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cm;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = O(this, e, t), z(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== A && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ke(e) ? this.k(e) : this.g(e);
  }
  O(e, t = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, t);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  g(e) {
    this._$AH !== f && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var t;
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = G.createElement(s.h, this.options)), s);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === n)
      this._$AH.p(i);
    else {
      const a = new et(n, this), l = a.v(this.options);
      a.p(i), this.T(l), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = we.get(e.strings);
    return t === void 0 && we.set(e.strings, t = new G(e)), t;
  }
  k(e) {
    Me(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const n of e)
      s === t.length ? t.push(i = new Q(this.O(H()), this.O(H()), this, this.options)) : i = t[s], i._$AI(n), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cm = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class K {
  constructor(e, t, i, s, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, s) {
    const n = this.strings;
    let a = !1;
    if (n === void 0)
      e = O(this, e, t, 0), a = !z(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
    else {
      const l = e;
      let u, c;
      for (e = n[0], u = 0; u < n.length - 1; u++)
        c = O(this, l[i + u], t, u), c === A && (c = this._$AH[u]), a || (a = !z(c) || c !== this._$AH[u]), c === f ? e = f : e !== f && (e += (c ?? "") + n[u + 1]), this._$AH[u] = c;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class tt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
const it = T ? T.emptyScript : "";
class st extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== f ? this.element.setAttribute(this.name, it) : this.element.removeAttribute(this.name);
  }
}
class rt extends K {
  constructor(e, t, i, s, n) {
    super(e, t, i, s, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = O(this, e, t, 0)) !== null && i !== void 0 ? i : f) === A)
      return;
    const s = this._$AH, n = e === f && s !== f || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== f && (s === f || n);
    n && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class nt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const Ae = J.litHtmlPolyfillSupport;
Ae?.(G, Q), ((ie = J.litHtmlVersions) !== null && ie !== void 0 ? ie : J.litHtmlVersions = []).push("2.6.1");
const at = (r, e, t) => {
  var i, s;
  const n = (i = t?.renderBefore) !== null && i !== void 0 ? i : e;
  let a = n._$litPart$;
  if (a === void 0) {
    const l = (s = t?.renderBefore) !== null && s !== void 0 ? s : null;
    n._$litPart$ = a = new Q(e.insertBefore(H(), l), l, void 0, t ?? {});
  }
  return a._$AI(r), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var se, re;
class U extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, t;
    const i = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = i.firstChild), i;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = at(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return A;
  }
}
U.finalized = !0, U._$litElement$ = !0, (se = globalThis.litElementHydrateSupport) === null || se === void 0 || se.call(globalThis, { LitElement: U });
const Se = globalThis.litElementPolyfillSupport;
Se?.({ LitElement: U });
((re = globalThis.litElementVersions) !== null && re !== void 0 ? re : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = (r) => (e) => typeof e == "function" ? ((t, i) => (customElements.define(t, i), i))(r, e) : ((t, i) => {
  const { kind: s, elements: n } = i;
  return { kind: s, elements: n, finisher(a) {
    customElements.define(t, a);
  } };
})(r, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, r);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} };
function $(r) {
  return (e, t) => t !== void 0 ? ((i, s, n) => {
    s.constructor.createProperty(n, i);
  })(r, e, t) : ht(r, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function X(r) {
  return $({ ...r, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ne;
((ne = window.HTMLSlotElement) === null || ne === void 0 ? void 0 : ne.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ut(r, e, t) {
  return r ? e() : t?.();
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ue = (r) => (...e) => ({ _$litDirective$: r, values: e });
let qe = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ue extends qe {
  constructor(e) {
    if (super(e), this.it = f, e.type !== Fe.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === f || e == null)
      return this._t = void 0, this.it = e;
    if (e === A)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
ue.directiveName = "unsafeHTML", ue.resultType = 1;
const ot = Ue(ue);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = Ue(class extends qe {
  constructor(r) {
    var e;
    if (super(r), r.type !== Fe.ATTRIBUTE || r.name !== "style" || ((e = r.strings) === null || e === void 0 ? void 0 : e.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return Object.keys(r).reduce((e, t) => {
      const i = r[t];
      return i == null ? e : e + `${t = t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(r, [e]) {
    const { style: t } = r.element;
    if (this.vt === void 0) {
      this.vt = /* @__PURE__ */ new Set();
      for (const i in e)
        this.vt.add(i);
      return this.render(e);
    }
    this.vt.forEach((i) => {
      e[i] == null && (this.vt.delete(i), i.includes("-") ? t.removeProperty(i) : t[i] = "");
    });
    for (const i in e) {
      const s = e[i];
      s != null && (this.vt.add(i), i.includes("-") ? t.setProperty(i, s) : t[i] = s);
    }
    return A;
  }
}), L = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", M = "http://www.w3.org/2001/XMLSchema#", ae = "http://www.w3.org/2000/10/swap/", v = {
  xsd: {
    decimal: `${M}decimal`,
    boolean: `${M}boolean`,
    double: `${M}double`,
    integer: `${M}integer`,
    string: `${M}string`
  },
  rdf: {
    type: `${L}type`,
    nil: `${L}nil`,
    first: `${L}first`,
    rest: `${L}rest`,
    langString: `${L}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${ae}reify#forSome`,
    forAll: `${ae}reify#forAll`
  },
  log: {
    implies: `${ae}log#implies`
  }
};
var ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let Pe;
var ft = typeof queueMicrotask == "function" ? queueMicrotask.bind(typeof window < "u" ? window : ct) : (r) => (Pe || (Pe = Promise.resolve())).then(r).catch((e) => setTimeout(() => {
  throw e;
}, 0));
const _t = ft, { xsd: Z } = v, pt = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, Ee = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
}, bt = /[\x00-\x20<>\\"\{\}\|\^\`]/, gt = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, yt = /$0^/;
class xt {
  constructor(e) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, e = e || {}, this._lineMode = !!e.lineMode) {
      this._n3Mode = !1;
      for (const t in this)
        !(t in gt) && this[t] instanceof RegExp && (this[t] = yt);
    } else
      this._n3Mode = e.n3 !== !1;
    this._comments = !!e.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(e, t) {
    let i = this._input, s = i.length;
    for (; ; ) {
      let l, u;
      for (; l = this._newline.exec(i); )
        this._comments && (u = this._comment.exec(l[0])) && n("comment", u[1], "", this._line, l[0].length), i = i.substr(l[0].length, i.length), s = i.length, this._line++;
      if (!l && (l = this._whitespace.exec(i)) && (i = i.substr(l[0].length, i.length)), this._endOfFile.test(i))
        return t && (this._comments && (u = this._comment.exec(i)) && n("comment", u[1], "", this._line, i.length), i = null, n("eof", "", "", this._line, 0)), this._input = i;
      const c = this._line, y = i[0];
      let h = "", o = "", _ = "", d = null, p = 0, R = !1;
      switch (y) {
        case "^":
          if (i.length < 3)
            break;
          if (i[1] === "^") {
            if (this._previousMarker = "^^", i = i.substr(2), i[0] !== "<") {
              R = !0;
              break;
            }
          } else {
            this._n3Mode && (p = 1, h = "^");
            break;
          }
        case "<":
          if (d = this._unescapedIri.exec(i))
            h = "IRI", o = d[1];
          else if (d = this._iri.exec(i)) {
            if (o = this._unescape(d[1]), o === null || bt.test(o))
              return a(this);
            h = "IRI";
          } else
            i.length > 1 && i[1] === "<" ? (h = "<<", p = 2) : this._n3Mode && i.length > 1 && i[1] === "=" && (h = "inverse", p = 2, o = ">");
          break;
        case ">":
          i.length > 1 && i[1] === ">" && (h = ">>", p = 2);
          break;
        case "_":
          ((d = this._blank.exec(i)) || t && (d = this._blank.exec(`${i} `))) && (h = "blank", _ = "_", o = d[1]);
          break;
        case '"':
          if (d = this._simpleQuotedString.exec(i))
            o = d[1];
          else if ({ value: o, matchLength: p } = this._parseLiteral(i), o === null)
            return a(this);
          (d !== null || p !== 0) && (h = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (d = this._simpleApostropheString.exec(i))
              o = d[1];
            else if ({ value: o, matchLength: p } = this._parseLiteral(i), o === null)
              return a(this);
            (d !== null || p !== 0) && (h = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (d = this._variable.exec(i)) && (h = "var", o = d[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (d = this._langcode.exec(i)) ? (h = "langcode", o = d[1]) : (d = this._keyword.exec(i)) && (h = d[0]);
          break;
        case ".":
          if (i.length === 1 ? t : i[1] < "0" || i[1] > "9") {
            h = ".", p = 1;
            break;
          }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          (d = this._number.exec(i) || t && (d = this._number.exec(`${i} `))) && (h = "literal", o = d[0], _ = typeof d[1] == "string" ? Z.double : typeof d[2] == "string" ? Z.decimal : Z.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (d = this._sparqlKeyword.exec(i)) ? h = d[0].toUpperCase() : R = !0;
          break;
        case "f":
        case "t":
          (d = this._boolean.exec(i)) ? (h = "literal", o = d[0], _ = Z.boolean) : R = !0;
          break;
        case "a":
          (d = this._shortPredicates.exec(i)) ? (h = "abbreviation", o = "a") : R = !0;
          break;
        case "=":
          this._n3Mode && i.length > 1 && (h = "abbreviation", i[1] !== ">" ? (p = 1, o = "=") : (p = 2, o = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case ")":
        case "{":
        case "}":
          this._lineMode || (p = 1, h = y);
          break;
        default:
          R = !0;
      }
      if (R && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (d = this._prefix.exec(i)) ? (h = "prefix", o = d[1] || "") : ((d = this._prefixed.exec(i)) || t && (d = this._prefixed.exec(`${i} `))) && (h = "prefixed", _ = d[1] || "", o = this._unescape(d[2]))), this._previousMarker === "^^")
        switch (h) {
          case "prefixed":
            h = "type";
            break;
          case "IRI":
            h = "typeIRI";
            break;
          default:
            h = "";
        }
      if (!h)
        return t || !/^'''|^"""/.test(i) && /\n|\r/.test(i) ? a(this) : this._input = i;
      const fe = p || d[0].length, Qe = n(h, o, _, c, fe);
      this.previousToken = Qe, this._previousMarker = h, i = i.substr(fe, i.length);
    }
    function n(l, u, c, y, h) {
      const o = i ? s - i.length : s, _ = o + h, d = { type: l, value: u, prefix: c, line: y, start: o, end: _ };
      return e(null, d), d;
    }
    function a(l) {
      e(l._syntaxError(/^\S*/.exec(i)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(e) {
    let t = !1;
    const i = e.replace(pt, (s, n, a, l) => {
      if (typeof n == "string")
        return String.fromCharCode(Number.parseInt(n, 16));
      if (typeof a == "string") {
        let u = Number.parseInt(a, 16);
        return u <= 65535 ? String.fromCharCode(Number.parseInt(a, 16)) : String.fromCharCode(55296 + ((u -= 65536) >> 10), 56320 + (u & 1023));
      }
      return l in Ee ? Ee[l] : (t = !0, "");
    });
    return t ? null : i;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(e) {
    if (e.length >= 3) {
      const t = e.match(/^(?:"""|"|'''|'|)/)[0], i = t.length;
      let s = Math.max(this._literalClosingPos, i);
      for (; (s = e.indexOf(t, s)) > 0; ) {
        let n = 0;
        for (; e[s - n - 1] === "\\"; )
          n++;
        if (n % 2 === 0) {
          const a = e.substring(i, s), l = a.split(/\r\n|\r|\n/).length - 1, u = s + i;
          if (i === 1 && l !== 0 || i === 3 && this._lineMode)
            break;
          return this._line += l, { value: this._unescape(a), matchLength: u };
        }
        s++;
      }
      this._literalClosingPos = e.length - i + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(e) {
    this._input = null;
    const t = new Error(`Unexpected "${e}" on line ${this._line}.`);
    return t.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, t;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(e) {
    return e.startsWith("\uFEFF") ? e.substr(1) : e;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(e, t) {
    if (this._line = 1, typeof e == "string")
      if (this._input = this._readStartingBom(e), typeof t == "function")
        _t(() => this._tokenizeToEnd(t, !0));
      else {
        const i = [];
        let s;
        if (this._tokenizeToEnd((n, a) => n ? s = n : i.push(a), !0), s)
          throw s;
        return i;
      }
    else
      this._pendingBuffer = null, typeof e.setEncoding == "function" && e.setEncoding("utf8"), e.on("data", (i) => {
        this._input !== null && i.length !== 0 && (this._pendingBuffer && (i = Buffer.concat([this._pendingBuffer, i]), this._pendingBuffer = null), i[i.length - 1] & 128 ? this._pendingBuffer = i : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof i == "string" ? i : i.toString()) : this._input += i, this._tokenizeToEnd(t, !1)));
      }), e.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(t, !0);
      }), e.on("error", t);
  }
}
function $t(r) {
  return !!r && r.termType === "DefaultGraph";
}
const { rdf: vt, xsd: I } = v;
let Y, mt = 0;
const wt = {
  namedNode: Rt,
  blankNode: jt,
  variable: It,
  literal: kt,
  defaultGraph: Nt,
  quad: Re,
  triple: Re
}, ce = wt;
class m {
  constructor(e) {
    this.id = e;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof m ? this.id === e.id : !!e && this.termType === e.termType && this.value === e.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
}
class He extends m {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class q extends m {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const e = this.id;
    let t = e.lastIndexOf('"') + 1;
    return t < e.length && e[t++] === "@" ? e.substr(t).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new He(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const e = this.id, t = e.lastIndexOf('"') + 1, i = t < e.length ? e[t] : "";
    return i === "^" ? e.substr(t + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      i !== "@" ? I.string : vt.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof q ? this.id === e.id : !!e && !!e.datatype && this.termType === e.termType && this.value === e.value && this.language === e.language && this.datatype.value === e.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}
class At extends m {
  constructor(e) {
    super(`_:${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
}
class St extends m {
  constructor(e) {
    super(`?${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
}
class Pt extends m {
  constructor() {
    return super(""), Y || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return this === e || !!e && this.termType === e.termType;
  }
}
Y = new Pt();
class Et extends m {
  constructor(e, t, i, s) {
    super(""), this._subject = e, this._predicate = t, this._object = i, this._graph = s || Y;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(e) {
    return !!e && this._subject.equals(e.subject) && this._predicate.equals(e.predicate) && this._object.equals(e.object) && this._graph.equals(e.graph);
  }
}
function Rt(r) {
  return new He(r);
}
function jt(r) {
  return new At(r || `n3-${mt++}`);
}
function kt(r, e) {
  if (typeof e == "string")
    return new q(`"${r}"@${e.toLowerCase()}`);
  let t = e ? e.value : "";
  return t === "" && (typeof r == "boolean" ? t = I.boolean : typeof r == "number" && (Number.isFinite(r) ? t = Number.isInteger(r) ? I.integer : I.double : (t = I.double, Number.isNaN(r) || (r = r > 0 ? "INF" : "-INF")))), t === "" || t === I.string ? new q(`"${r}"`) : new q(`"${r}"^^${t}`);
}
function It(r) {
  return new St(r);
}
function Nt() {
  return Y;
}
function Re(r, e, t, i) {
  return new Et(r, e, t, i);
}
let je = 0;
class ze {
  constructor(e) {
    this._contextStack = [], this._graph = null, e = e || {}, this._setBase(e.baseIRI), e.factory && Ge(this, e.factory);
    const t = typeof e.format == "string" ? e.format.match(/\w*$/)[0].toLowerCase() : "", i = /turtle/.test(t), s = /trig/.test(t), n = /triple/.test(t), a = /quad/.test(t), l = this._n3Mode = /n3/.test(t), u = n || a;
    (this._supportsNamedGraphs = !(i || l)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(i || s || n || l), this._supportsRDFStar = t === "" || /star|\*$/.test(t), u && (this._resolveRelativeIRI = (c) => null), this._blankNodePrefix = typeof e.blankNodePrefix != "string" ? "" : e.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = e.lexer || new xt({ lineMode: u, n3: l }), this._explicitQuantifiers = !!e.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    je = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(e) {
    if (!e)
      this._base = "", this._basePath = "";
    else {
      const t = e.indexOf("#");
      t >= 0 && (e = e.substr(0, t)), this._base = e, this._basePath = e.indexOf("/") < 0 ? e : e.replace(/[^\/?]*(?:\?.*)?$/, ""), e = e.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = e[0], this._baseScheme = e[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(e, t, i, s, n) {
    const a = this._n3Mode;
    this._contextStack.push({
      type: e,
      subject: i,
      predicate: s,
      object: n,
      graph: t,
      inverse: a ? this._inversePredicate : !1,
      blankPrefix: a ? this._prefixes._ : "",
      quantified: a ? this._quantified : null
    }), a && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.id.substr(2)}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(e, t) {
    const i = this._contextStack.pop();
    if (!i || i.type !== e)
      return this._error(`Unexpected ${t.type}`, t);
    this._subject = i.subject, this._predicate = i.predicate, this._object = i.object, this._graph = i.graph, this._n3Mode && (this._inversePredicate = i.inverse, this._prefixes._ = i.blankPrefix, this._quantified = i.quantified);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(e) {
    switch (e.type) {
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", e) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      case "PREFIX":
        this._sparqlStyle = !0;
      case "@prefix":
        return this._readPrefix;
      case "BASE":
        this._sparqlStyle = !0;
      case "@base":
        return this._readBaseIRI;
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      default:
        return this._readSubject(e);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(e, t) {
    let i;
    switch (e.type) {
      case "IRI":
      case "typeIRI":
        const s = this._resolveIRI(e.value);
        if (s === null)
          return this._error("Invalid IRI", e);
        i = this._namedNode(s);
        break;
      case "type":
      case "prefixed":
        const n = this._prefixes[e.prefix];
        if (n === void 0)
          return this._error(`Undefined prefix "${e.prefix}:"`, e);
        i = this._namedNode(n + e.value);
        break;
      case "blank":
        i = this._blankNode(this._prefixes[e.prefix] + e.value);
        break;
      case "var":
        i = this._variable(e.value.substr(1));
        break;
      default:
        return this._error(`Expected entity but got ${e.type}`, e);
    }
    return !t && this._n3Mode && i.id in this._quantified && (i = this._quantified[i.id]), i;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(e) {
    switch (this._predicate = null, e.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "}":
        return this._readPunctuation(e);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = this._blankNode, this._readQuantifierList) : this._error('Unexpected "@forSome"', e);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = this._variable, this._readQuantifierList) : this._error('Unexpected "@forAll"', e);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", e);
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._completeSubjectLiteral;
        this._subject = this._literal(e.value, this._namedNode(e.prefix));
        break;
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF* syntax", e);
      default:
        if ((this._subject = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(e) {
    const t = e.type;
    switch (t) {
      case "inverse":
        this._inversePredicate = !0;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[e.value];
        break;
      case ".":
      case "]":
      case "}":
        return this._predicate === null ? this._error(`Unexpected ${t}`, e) : (this._subject = null, t === "]" ? this._readBlankNodeTail(e) : this._readPunctuation(e));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", e);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", e);
      default:
        if ((this._predicate = this._readEntity(e)) === void 0)
          return;
    }
    return this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(e) {
    switch (e.type) {
      case "literal":
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._readDataTypeOrLang;
        this._object = this._literal(e.value, this._namedNode(e.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._blankNode()
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF* syntax", e);
      default:
        if ((this._object = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(e) {
    return e.type === "{" ? this._readGraph(e) : this._readPredicate(e);
  }
  // ### `_readGraph` reads a graph
  _readGraph(e) {
    return e.type !== "{" ? this._error(`Expected graph but got ${e.type}`, e) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(e) {
    return e.type === "]" ? (this._subject = null, this._readBlankNodeTail(e)) : (this._predicate = null, this._readPredicate(e));
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(e) {
    if (e.type !== "]")
      return this._readBlankNodePunctuation(e);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const t = this._predicate === null;
    return this._restoreContext("blank", e), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : t ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(e) {
    switch (e.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(e);
      default:
        return this._readPredicate(e);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(e) {
    let t = null, i = null, s = this._readListItem;
    const n = this._subject, a = this._contextStack, l = a[a.length - 1];
    switch (e.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          i = this._blankNode(),
          this.RDF_FIRST,
          this._subject = t = this._blankNode()
        ), s = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          i = this._blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", e), a.length !== 0 && a[a.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (s = this._readPredicate, this._subject === this.RDF_NIL)
            return s;
        } else if (s = this._getContextEndReader(), this._object === this.RDF_NIL)
          return s;
        i = this.RDF_NIL;
        break;
      case "literal":
        e.prefix.length === 0 ? (this._literalValue = e.value, s = this._readListItemDataTypeOrLang) : (t = this._literal(e.value, this._namedNode(e.prefix)), s = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      default:
        if ((t = this._readEntity(e)) === void 0)
          return;
    }
    if (i === null && (this._subject = i = this._blankNode()), n === null ? l.predicate === null ? l.subject = i : l.object = i : this._emit(n, this.RDF_REST, i, this._graph), t !== null) {
      if (this._n3Mode && (e.type === "IRI" || e.type === "prefixed"))
        return this._saveContext("item", this._graph, i, this.RDF_FIRST, t), this._subject = t, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(i, this.RDF_FIRST, t, this._graph);
    }
    return s;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, !1);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, !0);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(e) {
    let t = this._literal(this._literalValue);
    switch (e.type) {
      case "type":
      case "typeIRI":
        const i = this._readEntity(e);
        if (i === void 0)
          return;
        t = this._literal(this._literalValue, i), e = null;
        break;
      case "langcode":
        t = this._literal(this._literalValue, e.value), e = null;
        break;
    }
    return { token: e, literal: t };
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(e) {
    return this._subject = this._completeLiteral(e).literal, this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(e, t) {
    const i = this._completeLiteral(e);
    if (i)
      return this._object = i.literal, t && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), i.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(i.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(e) {
    return e.type !== "}" ? this._readPunctuation(e) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", e), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(e) {
    let t, i = this._graph;
    const s = this._subject, n = this._inversePredicate;
    switch (e.type) {
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", e);
        if (this._n3Mode)
          return this._readFormulaTail(e);
        this._graph = null;
      case ".":
        this._subject = null, t = this._contextStack.length ? this._readSubject : this._readInTopContext, n && (this._inversePredicate = !1);
        break;
      case ";":
        t = this._readPredicate;
        break;
      case ",":
        t = this._readObject;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (i = this._readEntity(e)) !== void 0) {
          t = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    if (s !== null) {
      const a = this._predicate, l = this._object;
      n ? this._emit(l, a, s, i) : this._emit(s, a, l, i);
    }
    return t;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(e) {
    let t;
    switch (e.type) {
      case ";":
        t = this._readPredicate;
        break;
      case ",":
        t = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), t;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(e) {
    return e.type !== "." ? this._error("Expected dot to follow quad", e) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(e) {
    return e.type !== "prefix" ? this._error("Expected prefix to follow @prefix", e) : (this._prefix = e.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(e) {
    if (e.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, e);
    const t = this._readEntity(e);
    return this._prefixes[this._prefix] = t.value, this._prefixCallback(this._prefix, t), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(e) {
    const t = e.type === "IRI" && this._resolveIRI(e.value);
    return t ? (this._setBase(t), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", e);
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(e) {
    switch (e.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(e), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", e);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(e) {
    return e.type !== "]" ? this._error("Invalid graph label", e) : (this._subject = this._blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(e) {
    return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(e)) : e.type !== "." ? this._error("Expected declaration to end with a dot", e) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(e) {
    let t;
    switch (e.type) {
      case "IRI":
      case "prefixed":
        if ((t = this._readEntity(e, !0)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${e.type}`, e);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, t, this.QUANTIFIERS_GRAPH)) : this._quantified[t.id] = this._quantifier(this._blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(e) {
    return e.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(e));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(e) {
    return this._afterPath = e, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(e) {
    switch (e.type) {
      case "!":
        return this._readForwardPath;
      case "^":
        return this._readBackwardPath;
      default:
        const t = this._contextStack, i = t.length && t[t.length - 1];
        if (i && i.type === "item") {
          const s = this._subject;
          this._restoreContext("item", e), this._emit(this._subject, this.RDF_FIRST, s, this._graph);
        }
        return this._afterPath(e);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(e) {
    let t, i;
    const s = this._blankNode();
    if ((i = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (t = this._subject, this._subject = s) : (t = this._object, this._object = s), this._emit(t, i, s, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(e) {
    const t = this._blankNode();
    let i, s;
    if ((i = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (s = this._subject, this._subject = t) : (s = this._object, this._object = t), this._emit(t, i, s, this._graph), this._readPath;
  }
  // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF* quad or the end of a nested RDF* triple
  _readRDFStarTailOrGraph(e) {
    return e.type !== ">>" ? this._supportsQuads && this._graph === null && (this._graph = this._readEntity(e)) !== void 0 ? this._readRDFStarTail : this._error(`Expected >> to follow "${this._object.id}"`, e) : this._readRDFStarTail(e);
  }
  // ### `_readRDFStarTail` reads the end of a nested RDF* triple
  _readRDFStarTail(e) {
    if (e.type !== ">>")
      return this._error(`Expected >> but got ${e.type}`, e);
    const t = this._quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<", e), this._subject === null ? (this._subject = t, this._readPredicate) : (this._object = t, this._getContextEndReader());
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const e = this._contextStack;
    if (!e.length)
      return this._readPunctuation;
    switch (e[e.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<":
        return this._readRDFStarTailOrGraph;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(e, t, i, s) {
    this._callback(null, this._quad(e, t, i, s || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(e, t) {
    const i = new Error(`${e} on line ${t.line}.`);
    i.context = {
      token: t,
      line: t.line,
      previousToken: this._lexer.previousToken
    }, this._callback(i), this._callback = le;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(e) {
    return /^[a-z][a-z0-9+.-]*:/i.test(e) ? e : this._resolveRelativeIRI(e);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(e) {
    if (!e.length)
      return this._base;
    switch (e[0]) {
      case "#":
        return this._base + e;
      case "?":
        return this._base.replace(/(?:\?.*)?$/, e);
      case "/":
        return (e[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(e);
      default:
        return /^[^/:]*:/.test(e) ? null : this._removeDotSegments(this._basePath + e);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(e) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(e))
      return e;
    const t = e.length;
    let i = "", s = -1, n = -1, a = 0, l = "/";
    for (; s < t; ) {
      switch (l) {
        case ":":
          if (n < 0 && e[++s] === "/" && e[++s] === "/")
            for (; (n = s + 1) < t && e[n] !== "/"; )
              s = n;
          break;
        case "?":
        case "#":
          s = t;
          break;
        case "/":
          if (e[s + 1] === ".")
            switch (l = e[++s + 1], l) {
              case "/":
                i += e.substring(a, s - 1), a = s + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return i + e.substring(a, s) + e.substr(s + 1);
              case ".":
                if (l = e[++s + 1], l === void 0 || l === "/" || l === "?" || l === "#") {
                  if (i += e.substring(a, s - 2), (a = i.lastIndexOf("/")) >= n && (i = i.substr(0, a)), l !== "/")
                    return `${i}/${e.substr(s + 1)}`;
                  a = s + 1;
                }
            }
      }
      l = e[++s];
    }
    return i + e.substring(a);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the callback
  parse(e, t, i) {
    if (this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${je++}_`, this._prefixCallback = i || le, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !t) {
      const s = [];
      let n;
      if (this._callback = (a, l) => {
        a ? n = a : l && s.push(l);
      }, this._lexer.tokenize(e).every((a) => this._readCallback = this._readCallback(a)), n)
        throw n;
      return s;
    }
    this._callback = t, this._lexer.tokenize(e, (s, n) => {
      s !== null ? (this._callback(s), this._callback = le) : this._readCallback && (this._readCallback = this._readCallback(n));
    });
  }
}
function le() {
}
function Ge(r, e) {
  const t = e.namedNode;
  r._namedNode = t, r._blankNode = e.blankNode, r._literal = e.literal, r._variable = e.variable, r._quad = e.quad, r.DEFAULTGRAPH = e.defaultGraph(), r.RDF_FIRST = t(v.rdf.first), r.RDF_REST = t(v.rdf.rest), r.RDF_NIL = t(v.rdf.nil), r.N3_FORALL = t(v.r.forAll), r.N3_FORSOME = t(v.r.forSome), r.ABBREVIATIONS = {
    a: t(v.rdf.type),
    "=": t(v.owl.sameAs),
    ">": t(v.log.implies)
  }, r.QUANTIFIERS_GRAPH = t("urn:n3:quantifiers");
}
Ge(ze.prototype, ce);
const B = ce.defaultGraph(), { rdf: Tt, xsd: j } = v, ke = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/, Ie = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g, Ct = {
  "\\": "\\\\",
  '"': '\\"',
  "	": "\\t",
  "\n": "\\n",
  "\r": "\\r",
  "\b": "\\b",
  "\f": "\\f"
};
class F extends m {
  // Pretty-printed nodes are not equal to any other node
  // (e.g., [] does not equal [])
  equals() {
    return !1;
  }
}
class Ot {
  constructor(e, t) {
    if (this._prefixRegex = /$0^/, e && typeof e.write != "function" && (t = e, e = null), t = t || {}, this._lists = t.lists, e)
      this._outputStream = e, this._endStream = t.end === void 0 ? !0 : !!t.end;
    else {
      let i = "";
      this._outputStream = {
        write(s, n, a) {
          i += s, a && a();
        },
        end: (s) => {
          s && s(null, i);
        }
      }, this._endStream = !0;
    }
    this._subject = null, /triple|quad/i.test(t.format) ? (this._lineMode = !0, this._writeQuad = this._writeQuadLine) : (this._lineMode = !1, this._graph = B, this._prefixIRIs = /* @__PURE__ */ Object.create(null), t.prefixes && this.addPrefixes(t.prefixes), t.baseIRI && (this._baseMatcher = new RegExp(`^${Te(t.baseIRI)}${t.baseIRI.endsWith("/") ? "" : "[#?]"}`), this._baseLength = t.baseIRI.length));
  }
  // ## Private methods
  // ### Whether the current graph is the default graph
  get _inDefaultGraph() {
    return B.equals(this._graph);
  }
  // ### `_write` writes the argument to the output stream
  _write(e, t) {
    this._outputStream.write(e, "utf8", t);
  }
  // ### `_writeQuad` writes the quad to the output stream
  _writeQuad(e, t, i, s, n) {
    try {
      s.equals(this._graph) || (this._write((this._subject === null ? "" : this._inDefaultGraph ? `.
` : `
}
`) + (B.equals(s) ? "" : `${this._encodeIriOrBlank(s)} {
`)), this._graph = s, this._subject = null), e.equals(this._subject) ? t.equals(this._predicate) ? this._write(`, ${this._encodeObject(i)}`, n) : this._write(`;
    ${this._encodePredicate(this._predicate = t)} ${this._encodeObject(i)}`, n) : this._write(`${(this._subject === null ? "" : `.
`) + this._encodeSubject(this._subject = e)} ${this._encodePredicate(this._predicate = t)} ${this._encodeObject(i)}`, n);
    } catch (a) {
      n && n(a);
    }
  }
  // ### `_writeQuadLine` writes the quad to the output stream as a single line
  _writeQuadLine(e, t, i, s, n) {
    delete this._prefixMatch, this._write(this.quadToString(e, t, i, s), n);
  }
  // ### `quadToString` serializes a quad as a string
  quadToString(e, t, i, s) {
    return `${this._encodeSubject(e)} ${this._encodeIriOrBlank(t)} ${this._encodeObject(i)}${s && s.value ? ` ${this._encodeIriOrBlank(s)} .
` : ` .
`}`;
  }
  // ### `quadsToString` serializes an array of quads as a string
  quadsToString(e) {
    return e.map((t) => this.quadToString(t.subject, t.predicate, t.object, t.graph)).join("");
  }
  // ### `_encodeSubject` represents a subject
  _encodeSubject(e) {
    return e.termType === "Quad" ? this._encodeQuad(e) : this._encodeIriOrBlank(e);
  }
  // ### `_encodeIriOrBlank` represents an IRI or blank node
  _encodeIriOrBlank(e) {
    if (e.termType !== "NamedNode")
      return this._lists && e.value in this._lists && (e = this.list(this._lists[e.value])), "id" in e ? e.id : `_:${e.value}`;
    let t = e.value;
    this._baseMatcher && this._baseMatcher.test(t) && (t = t.substr(this._baseLength)), ke.test(t) && (t = t.replace(Ie, Ne));
    const i = this._prefixRegex.exec(t);
    return i ? i[1] ? this._prefixIRIs[i[1]] + i[2] : t : `<${t}>`;
  }
  // ### `_encodeLiteral` represents a literal
  _encodeLiteral(e) {
    let t = e.value;
    if (ke.test(t) && (t = t.replace(Ie, Ne)), e.language)
      return `"${t}"@${e.language}`;
    if (this._lineMode) {
      if (e.datatype.value === j.string)
        return `"${t}"`;
    } else
      switch (e.datatype.value) {
        case j.string:
          return `"${t}"`;
        case j.boolean:
          if (t === "true" || t === "false")
            return t;
          break;
        case j.integer:
          if (/^[+-]?\d+$/.test(t))
            return t;
          break;
        case j.decimal:
          if (/^[+-]?\d*\.\d+$/.test(t))
            return t;
          break;
        case j.double:
          if (/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(t))
            return t;
          break;
      }
    return `"${t}"^^${this._encodeIriOrBlank(e.datatype)}`;
  }
  // ### `_encodePredicate` represents a predicate
  _encodePredicate(e) {
    return e.value === Tt.type ? "a" : this._encodeIriOrBlank(e);
  }
  // ### `_encodeObject` represents an object
  _encodeObject(e) {
    switch (e.termType) {
      case "Quad":
        return this._encodeQuad(e);
      case "Literal":
        return this._encodeLiteral(e);
      default:
        return this._encodeIriOrBlank(e);
    }
  }
  // ### `_encodeQuad` encodes an RDF* quad
  _encodeQuad({ subject: e, predicate: t, object: i, graph: s }) {
    return `<<${this._encodeSubject(e)} ${this._encodePredicate(t)} ${this._encodeObject(i)}${$t(s) ? "" : ` ${this._encodeIriOrBlank(s)}`}>>`;
  }
  // ### `_blockedWrite` replaces `_write` after the writer has been closed
  _blockedWrite() {
    throw new Error("Cannot write because the writer has been closed.");
  }
  // ### `addQuad` adds the quad to the output stream
  addQuad(e, t, i, s, n) {
    i === void 0 ? this._writeQuad(e.subject, e.predicate, e.object, e.graph, t) : typeof s == "function" ? this._writeQuad(e, t, i, B, s) : this._writeQuad(e, t, i, s || B, n);
  }
  // ### `addQuads` adds the quads to the output stream
  addQuads(e) {
    for (let t = 0; t < e.length; t++)
      this.addQuad(e[t]);
  }
  // ### `addPrefix` adds the prefix to the output stream
  addPrefix(e, t, i) {
    const s = {};
    s[e] = t, this.addPrefixes(s, i);
  }
  // ### `addPrefixes` adds the prefixes to the output stream
  addPrefixes(e, t) {
    if (!this._prefixIRIs)
      return t && t();
    let i = !1;
    for (let s in e) {
      let n = e[s];
      typeof n != "string" && (n = n.value), i = !0, this._subject !== null && (this._write(this._inDefaultGraph ? `.
` : `
}
`), this._subject = null, this._graph = ""), this._prefixIRIs[n] = s += ":", this._write(`@prefix ${s} <${n}>.
`);
    }
    if (i) {
      let s = "", n = "";
      for (const a in this._prefixIRIs)
        s += s ? `|${a}` : a, n += (n ? "|" : "") + this._prefixIRIs[a];
      s = Te(s), this._prefixRegex = new RegExp(`^(?:${n})[^/]*$|^(${s})([_a-zA-Z][\\-_a-zA-Z0-9]*)$`);
    }
    this._write(i ? `
` : "", t);
  }
  // ### `blank` creates a blank node with the given content
  blank(e, t) {
    let i = e, s, n;
    switch (e === void 0 ? i = [] : e.termType ? i = [{ predicate: e, object: t }] : "length" in e || (i = [e]), n = i.length) {
      case 0:
        return new F("[]");
      case 1:
        if (s = i[0], !(s.object instanceof F))
          return new F(`[ ${this._encodePredicate(s.predicate)} ${this._encodeObject(s.object)} ]`);
      default:
        let a = "[";
        for (let l = 0; l < n; l++)
          s = i[l], s.predicate.equals(e) ? a += `, ${this._encodeObject(s.object)}` : (a += `${(l ? `;
  ` : `
  `) + this._encodePredicate(s.predicate)} ${this._encodeObject(s.object)}`, e = s.predicate);
        return new F(`${a}
]`);
    }
  }
  // ### `list` creates a list node with the given content
  list(e) {
    const t = e && e.length || 0, i = new Array(t);
    for (let s = 0; s < t; s++)
      i[s] = this._encodeObject(e[s]);
    return new F(`(${i.join(" ")})`);
  }
  // ### `end` signals the end of the output stream
  end(e) {
    this._subject !== null && (this._write(this._inDefaultGraph ? `.
` : `
}
`), this._subject = null), this._write = this._blockedWrite;
    let t = e && ((i, s) => {
      t = null, e(i, s);
    });
    if (this._endStream)
      try {
        return this._outputStream.end(t);
      } catch {
      }
    t && t();
  }
}
function Ne(r) {
  let e = Ct[r];
  return e === void 0 && (r.length === 1 ? (e = r.charCodeAt(0).toString(16), e = "\\u0000".substr(0, 6 - e.length) + e) : (e = ((r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) + 9216).toString(16), e = "\\U00000000".substr(0, 10 - e.length) + e)), e;
}
function Te(r) {
  return r.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, "\\$&");
}
const Dt = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/, Lt = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g, Mt = {
  "\\": "\\\\",
  '"': '\\"',
  "	": "\\t",
  "\n": "\\n",
  "\r": "\\r",
  "\b": "\\b",
  "\f": "\\f"
}, Bt = ce.defaultGraph(), Ce = 'target="_blank" rel="noopener noreferrer"';
class Ft extends Ot {
  // `_encodeIriOrBlank` represents an IRI or blank node
  _encodeIriOrBlank(e) {
    if (e.termType !== "NamedNode")
      return this._lists && e.value in this._lists && (e = this.list(this._lists[e.value])), "id" in e ? e.id : `_:${e.value}`;
    let t = e.value;
    this._baseMatcher && this._baseMatcher.test(t) && (t = t.substr(this._baseLength)), Dt.test(t) && (t = t.replace(Lt, qt));
    const i = this._prefixRegex.exec(t);
    return i && !i[2] && (i[2] = ""), i ? i[1] ? `<a href="${t}" ${Ce}>${this._prefixIRIs[i[1]] + i[2] || ":"}</a>` : t : `<<a href="${t}" ${Ce}>${t}</a>>`;
  }
  _writeQuad(e, t, i, s, n) {
    try {
      if (!s.equals(this._graph)) {
        const a = s.id.toString().toLowerCase();
        let l = "assertion";
        a.endsWith("head") && (l = "head"), (a.endsWith("provenance") || a.endsWith("prov")) && (l = "provenance"), a.endsWith("pubinfo") && (l = "pubinfo"), this._write(
          (this._subject === null ? "" : this._inDefaultGraph ? ".<br/>" : " .<br/>}</div>") + (Bt.equals(s) ? "" : `<div class="nanopub-graph" id="nanopub-${l}">${this._encodeIriOrBlank(
            s
          )} {<br/>`)
        ), this._graph = s, this._subject = null;
      }
      e.equals(this._subject) ? t.equals(this._predicate) ? this._write(`, ${this._encodeObject(i)}`, n) : this._write(
        ` ;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this._encodePredicate(
          this._predicate = t
        )} ${this._encodeObject(i)}`,
        n
      ) : this._write(
        `${(this._subject === null ? "" : " .<br/>") + "&nbsp;&nbsp;&nbsp;&nbsp;" + this._encodeSubject(this._subject = e)} ${this._encodePredicate(
          this._predicate = t
        )} ${this._encodeObject(i)}`,
        n
      );
    } catch (a) {
      n && n(a);
    }
  }
  addPrefixes(e, t) {
    if (this._subject !== null && (this._write(this._inDefaultGraph ? ".<br/>" : "<br/>}<br/>"), this._subject = null, this._graph = ""), !this._prefixIRIs)
      return t && t();
    let i = !1;
    for (let s in e) {
      let n = e[s];
      typeof n != "string" && (n = n.value), i = !0, this._prefixIRIs[n] = s += ":";
    }
    if (i) {
      let s = "", n = "";
      for (const a in this._prefixIRIs)
        s += s ? `|${a}` : a, n += (n ? "|" : "") + this._prefixIRIs[a];
      s = Ut(s), this._prefixRegex = new RegExp(
        `^(?:${n})[^/]*$|^(${s})([_a-zA-Z][\\-_a-zA-Z0-9]*)*$`
      );
    }
  }
  end(e) {
    this._subject !== null && (this._write(this._inDefaultGraph ? ".<br/>" : " .<br/>}</div>"), this._subject = null), this._write = this._blockedWrite;
    let t = e && ((i, s) => {
      t = null, e(i, s);
    });
    if (this._endStream)
      try {
        return this._outputStream.end(t);
      } catch {
      }
    t && t();
  }
}
function Ut(r) {
  return r.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, "\\$&");
}
function qt(r) {
  let e = Mt[r];
  return e === void 0 && (r.length === 1 ? (e = r.charCodeAt(0).toString(16), e = "\\u0000".substr(0, 6 - e.length) + e) : (e = ((r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) + 9216).toString(16), e = "\\U00000000".substr(0, 10 - e.length) + e)), e;
}
var Ht = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, g = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? zt(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (s = (i ? a(e, t, s) : a(s)) || s);
  return i && s && Ht(e, t, s), s;
};
const E = {
  head: P`#e8e8e8`,
  assertion: P`#99ccff`,
  provenance: P`#f3a08c`,
  pubinfo: P`#ffff66`,
  error: P`#f88b80`,
  grey: P`#d1d1d1`
};
let b = class extends U {
  constructor() {
    super(...arguments), this.url = "", this.rdf = "", this.displayPrefixes = !1, this.displayHead = !1, this.displayPubinfo = !0, this.displayProvenance = !0, this.displayAssertion = !0, this.hidePubinfo = !1, this.hideProvenance = !1, this.hideAssertion = !1, this.disableDisplayButton = !1, this.showDisplayOptions = !1, this._handleClickOut = (r) => {
      const e = this.renderRoot.querySelector(".display-checklist");
      window && !e?.contains(r.originalTarget) && (this.showDisplayOptions = !1, window.removeEventListener("click", this._handleClickOut));
    };
  }
  /**
   * Fetch the Nanopub if needed, parse the RDF TRiG using n3.js,
   * and generate the HTML to represent the nanopub
   */
  async connectedCallback() {
    if (super.connectedCallback(), !this.url && !this.rdf && (this.error = `⚠️ No nanopublication has been provided, use the "url" or "rdf"
        attribute to provide the URL, or RDF in the TRiG format, of the nanopublication.`), !this.error && this.url && !this.rdf) {
      this.url.startsWith("https://purl.org/np/") && !this.url.endsWith(".trig") && (this.url = this.url + ".trig");
      try {
        const r = await fetch(this.url);
        this.rdf = await r.text();
      } catch (r) {
        this.error = `⚠️ Issue fetching the nanopublication RDF at ${this.url}. ${r}`;
      }
    }
    if (!this.error && this.rdf) {
      const r = new ze(), e = new Ft(null, { format: "application/trig" }), t = [];
      r.parse(this.rdf, (i, s, n) => {
        if (i)
          return this.error = `⚠️ Issue parsing the nanopublication RDF with n3.js, make sure it is in the TRiG format. ${i}`, null;
        s ? t.push(s) : (this.prefixes = {
          this: n.this,
          sub: n.sub,
          ...n
        }, e.addPrefixes(this.prefixes, null), t.map((a) => {
          e.addQuad(a);
        }), e.end((a, l) => {
          this.html_rdf = ot(l), setTimeout(() => {
            this._applyDisplay("displayPrefixes"), this._applyDisplay("displayHead"), this.hidePubinfo && (this.displayPubinfo = !1), this._applyDisplay("displayPubinfo"), this.hideProvenance && (this.displayProvenance = !1), this._applyDisplay("displayProvenance"), this.hideAssertion && (this.displayAssertion = !1), this._applyDisplay("displayAssertion");
          }, 0);
        }));
      });
    }
  }
  /**
   * Apply display described in the state to a nanopub section in the HTML
   */
  _applyDisplay(r) {
    const e = r.substring(7).toLowerCase(), t = this.renderRoot.querySelector(
      `#nanopub-${e}`
    );
    t && (t.style.display = this[r] ? "inherit" : "none");
  }
  /**
   * Switch display of a nanopub section, called when checkbox clicked
   */
  _switchDisplay(r) {
    this[r] = !this[r], this._applyDisplay(r);
  }
  /**
   * Open the dropdown window to select which nanopub section to display
   */
  _openDisplayOptions() {
    this.showDisplayOptions = !this.showDisplayOptions, window && this.showDisplayOptions && window.addEventListener("click", this._handleClickOut);
  }
  render() {
    return x`
      <div
        class="nanopub"
        style=${dt({
      "background-color": this.error ? E.error.toString() : "inherit"
    })}
      >
        ${ut(this.prefixes, () => x` @prefix ${Object.keys(this.prefixes)[0]} <<a
              href="${this.prefixes[Object.keys(this.prefixes)[0]]}"
              target="_blank"
              rel="noopener noreferrer"
              >${this.prefixes[Object.keys(this.prefixes)[0]]}</a
            >> .
            ${this.disableDisplayButton ? x`` : x`<div class="display-checklist" tabindex="100">
                  <span
                    class="anchor-display-checklist"
                    @click="${() => this._openDisplayOptions()}"
                    @touchstart="${() => this._openDisplayOptions()}"
                  >
                    ${Gt}
                    ${this.showDisplayOptions ? x`Select the sections to display` : x``}
                  </span>
                  ${this.showDisplayOptions ? x`<div class="display-checklist-wrapper">
                        <ul class="items" id="display-checklist-items">
                          <li
                            id="displayPrefixes"
                            @click=${(r) => this._switchDisplay(r.target.id)}
                          >
                            <label
                              ><input
                                type="checkbox"
                                value="displayPrefixes"
                                .checked=${this.displayPrefixes}
                                @click=${(r) => this._switchDisplay(r.target.value)}
                              />
                              Display prefixes
                            </label>
                          </li>
                          <li
                            id="displayHead"
                            @click=${(r) => this._switchDisplay(r.target.id)}
                          >
                            <label
                              ><input
                                type="checkbox"
                                value="displayHead"
                                .checked=${this.displayHead}
                                @click=${(r) => this._switchDisplay(r.target.value)}
                              />
                              Display Head graph
                            </label>
                          </li>
                          <li
                            id="displayAssertion"
                            @click=${(r) => this._switchDisplay(r.target.id)}
                          >
                            <label
                              ><input
                                type="checkbox"
                                value="displayAssertion"
                                .checked=${this.displayAssertion}
                                @click=${(r) => this._switchDisplay(r.target.value)}
                              />
                              Display Assertion graph
                            </label>
                          </li>
                          <li
                            id="displayProvenance"
                            @click=${(r) => this._switchDisplay(r.target.id)}
                          >
                            <label
                              ><input
                                type="checkbox"
                                value="displayProvenance"
                                .checked=${this.displayProvenance}
                                @click=${(r) => this._switchDisplay(r.target.value)}
                              />
                              Display Provenance graph
                            </label>
                          </li>
                          <li
                            id="displayPubinfo"
                            @click=${(r) => this._switchDisplay(r.target.id)}
                          >
                            <label
                              ><input
                                type="checkbox"
                                value="displayPubinfo"
                                .checked=${this.displayPubinfo}
                                @click=${(r) => this._switchDisplay(r.target.value)}
                              />
                              Display PubInfo graph
                            </label>
                          </li>
                        </ul>
                      </div>` : x``}
                </div>`}
            <br />

            <div id="nanopub-prefixes">
              ${Object.keys(this.prefixes).map((r, e) => e === 0 ? x`` : x`
                  @prefix ${r} <<a
                    href="${this.prefixes[r]}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${this.prefixes[r]}</a
                  >> .
                  <br />
                `)}
            </div>`)}
        ${this.html_rdf ? x`${this.html_rdf}` : this.error ? x`${this.error}` : x`Loading...`}
      </div>
    `;
  }
};
b.styles = P`
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
      background: ${E.head};
    }
    #nanopub-assertion {
      background: ${E.assertion};
    }
    #nanopub-provenance {
      background: ${E.provenance};
    }
    #nanopub-pubinfo {
      background: ${E.pubinfo};
    }
    .display-checklist {
      font-family: sans-serif;
      float: right;
      font-size: 9pt;
      background: ${E.head};
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
      background: ${E.grey};
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
g([
  $({ type: String })
], b.prototype, "url", 2);
g([
  $({ type: String })
], b.prototype, "rdf", 2);
g([
  $({ type: Boolean })
], b.prototype, "displayPrefixes", 2);
g([
  $({ type: Boolean })
], b.prototype, "displayHead", 2);
g([
  $({ type: Boolean })
], b.prototype, "displayPubinfo", 2);
g([
  $({ type: Boolean })
], b.prototype, "displayProvenance", 2);
g([
  $({ type: Boolean })
], b.prototype, "displayAssertion", 2);
g([
  $({ type: Boolean })
], b.prototype, "hidePubinfo", 2);
g([
  $({ type: Boolean })
], b.prototype, "hideProvenance", 2);
g([
  $({ type: Boolean })
], b.prototype, "hideAssertion", 2);
g([
  $({ type: Boolean })
], b.prototype, "disableDisplayButton", 2);
g([
  X()
], b.prototype, "showDisplayOptions", 2);
g([
  X()
], b.prototype, "html_rdf", 2);
g([
  X()
], b.prototype, "prefixes", 2);
g([
  X()
], b.prototype, "error", 2);
b = g([
  lt("nanopub-display")
], b);
const Gt = x`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="16"
  width="16"
  viewBox="0 -80 1000 1000"
>
  <path
    d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"
  />
</svg>`;
export {
  b as NanopubDisplay
};
//# sourceMappingURL=nanopub-display.js.map
