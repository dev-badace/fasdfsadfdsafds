var commonjsGlobal =
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : {};

var indexMinimal = {},
  minimal$1 = {},
  aspromise = asPromise;
function asPromise(e, t) {
  for (
    var n = new Array(arguments.length - 1), r = 0, i = 2, o = !0;
    i < arguments.length;

  )
    n[r++] = arguments[i++];
  return new Promise(function (i, a) {
    n[r] = function (e) {
      if (o)
        if (((o = !1), e)) a(e);
        else {
          for (var t = new Array(arguments.length - 1), n = 0; n < t.length; )
            t[n++] = arguments[n];
          i.apply(null, t);
        }
    };
    try {
      e.apply(t || null, n);
    } catch (s) {
      o && ((o = !1), a(s));
    }
  });
}
var base64$2 = {};
!(function (e) {
  var t = base64$2;
  t.length = function (e) {
    var t = e.length;
    if (!t) return 0;
    for (var n = 0; --t % 4 > 1 && "=" === e.charAt(t); ) ++n;
    return Math.ceil(3 * e.length) / 4 - n;
  };
  for (var n = new Array(64), r = new Array(123), i = 0; i < 64; )
    r[
      (n[i] =
        i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)
    ] = i++;
  t.encode = function (e, t, r) {
    for (var i, o = null, a = [], s = 0, l = 0; t < r; ) {
      var u = e[t++];
      switch (l) {
        case 0:
          (a[s++] = n[u >> 2]), (i = (3 & u) << 4), (l = 1);
          break;
        case 1:
          (a[s++] = n[i | (u >> 4)]), (i = (15 & u) << 2), (l = 2);
          break;
        case 2:
          (a[s++] = n[i | (u >> 6)]), (a[s++] = n[63 & u]), (l = 0);
      }
      s > 8191 &&
        ((o || (o = [])).push(String.fromCharCode.apply(String, a)), (s = 0));
    }
    return (
      l && ((a[s++] = n[i]), (a[s++] = 61), 1 === l && (a[s++] = 61)),
      o
        ? (s && o.push(String.fromCharCode.apply(String, a.slice(0, s))),
          o.join(""))
        : String.fromCharCode.apply(String, a.slice(0, s))
    );
  };
  var o = "invalid encoding";
  (t.decode = function (e, t, n) {
    for (var i, a = n, s = 0, l = 0; l < e.length; ) {
      var u = e.charCodeAt(l++);
      if (61 === u && s > 1) break;
      if (void 0 === (u = r[u])) throw Error(o);
      switch (s) {
        case 0:
          (i = u), (s = 1);
          break;
        case 1:
          (t[n++] = (i << 2) | ((48 & u) >> 4)), (i = u), (s = 2);
          break;
        case 2:
          (t[n++] = ((15 & i) << 4) | ((60 & u) >> 2)), (i = u), (s = 3);
          break;
        case 3:
          (t[n++] = ((3 & i) << 6) | u), (s = 0);
      }
    }
    if (1 === s) throw Error(o);
    return n - a;
  }),
    (t.test = function (e) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        e
      );
    });
})();

var float = factory(factory);
function factory(e) {
  return (
    "undefined" != typeof Float32Array
      ? (function () {
          var t = new Float32Array([-0]),
            n = new Uint8Array(t.buffer),
            r = 128 === n[3];
          function i(e, r, i) {
            (t[0] = e),
              (r[i] = n[0]),
              (r[i + 1] = n[1]),
              (r[i + 2] = n[2]),
              (r[i + 3] = n[3]);
          }
          function o(e, r, i) {
            (t[0] = e),
              (r[i] = n[3]),
              (r[i + 1] = n[2]),
              (r[i + 2] = n[1]),
              (r[i + 3] = n[0]);
          }
          function a(e, r) {
            return (
              (n[0] = e[r]),
              (n[1] = e[r + 1]),
              (n[2] = e[r + 2]),
              (n[3] = e[r + 3]),
              t[0]
            );
          }
          function s(e, r) {
            return (
              (n[3] = e[r]),
              (n[2] = e[r + 1]),
              (n[1] = e[r + 2]),
              (n[0] = e[r + 3]),
              t[0]
            );
          }
          (e.writeFloatLE = r ? i : o),
            (e.writeFloatBE = r ? o : i),
            (e.readFloatLE = r ? a : s),
            (e.readFloatBE = r ? s : a);
        })()
      : (function () {
          function t(e, t, n, r) {
            var i = t < 0 ? 1 : 0;
            if ((i && (t = -t), 0 === t)) e(1 / t > 0 ? 0 : 2147483648, n, r);
            else if (isNaN(t)) e(2143289344, n, r);
            else if (t > 34028234663852886e22)
              e(((i << 31) | 2139095040) >>> 0, n, r);
            else if (t < 11754943508222875e-54)
              e(((i << 31) | Math.round(t / 1401298464324817e-60)) >>> 0, n, r);
            else {
              var o = Math.floor(Math.log(t) / Math.LN2);
              e(
                ((i << 31) |
                  ((o + 127) << 23) |
                  (8388607 & Math.round(t * Math.pow(2, -o) * 8388608))) >>>
                  0,
                n,
                r
              );
            }
          }
          function n(e, t, n) {
            var r = e(t, n),
              i = 2 * (r >> 31) + 1,
              o = (r >>> 23) & 255,
              a = 8388607 & r;
            return 255 === o
              ? a
                ? NaN
                : i * (1 / 0)
              : 0 === o
              ? 1401298464324817e-60 * i * a
              : i * Math.pow(2, o - 150) * (a + 8388608);
          }
          (e.writeFloatLE = t.bind(null, writeUintLE)),
            (e.writeFloatBE = t.bind(null, writeUintBE)),
            (e.readFloatLE = n.bind(null, readUintLE)),
            (e.readFloatBE = n.bind(null, readUintBE));
        })(),
    "undefined" != typeof Float64Array
      ? (function () {
          var t = new Float64Array([-0]),
            n = new Uint8Array(t.buffer),
            r = 128 === n[7];
          function i(e, r, i) {
            (t[0] = e),
              (r[i] = n[0]),
              (r[i + 1] = n[1]),
              (r[i + 2] = n[2]),
              (r[i + 3] = n[3]),
              (r[i + 4] = n[4]),
              (r[i + 5] = n[5]),
              (r[i + 6] = n[6]),
              (r[i + 7] = n[7]);
          }
          function o(e, r, i) {
            (t[0] = e),
              (r[i] = n[7]),
              (r[i + 1] = n[6]),
              (r[i + 2] = n[5]),
              (r[i + 3] = n[4]),
              (r[i + 4] = n[3]),
              (r[i + 5] = n[2]),
              (r[i + 6] = n[1]),
              (r[i + 7] = n[0]);
          }
          function a(e, r) {
            return (
              (n[0] = e[r]),
              (n[1] = e[r + 1]),
              (n[2] = e[r + 2]),
              (n[3] = e[r + 3]),
              (n[4] = e[r + 4]),
              (n[5] = e[r + 5]),
              (n[6] = e[r + 6]),
              (n[7] = e[r + 7]),
              t[0]
            );
          }
          function s(e, r) {
            return (
              (n[7] = e[r]),
              (n[6] = e[r + 1]),
              (n[5] = e[r + 2]),
              (n[4] = e[r + 3]),
              (n[3] = e[r + 4]),
              (n[2] = e[r + 5]),
              (n[1] = e[r + 6]),
              (n[0] = e[r + 7]),
              t[0]
            );
          }
          (e.writeDoubleLE = r ? i : o),
            (e.writeDoubleBE = r ? o : i),
            (e.readDoubleLE = r ? a : s),
            (e.readDoubleBE = r ? s : a);
        })()
      : (function () {
          function t(e, t, n, r, i, o) {
            var a = r < 0 ? 1 : 0;
            if ((a && (r = -r), 0 === r))
              e(0, i, o + t), e(1 / r > 0 ? 0 : 2147483648, i, o + n);
            else if (isNaN(r)) e(0, i, o + t), e(2146959360, i, o + n);
            else if (r > 17976931348623157e292)
              e(0, i, o + t), e(((a << 31) | 2146435072) >>> 0, i, o + n);
            else {
              var s;
              if (r < 22250738585072014e-324)
                e((s = r / 5e-324) >>> 0, i, o + t),
                  e(((a << 31) | (s / 4294967296)) >>> 0, i, o + n);
              else {
                var l = Math.floor(Math.log(r) / Math.LN2);
                1024 === l && (l = 1023),
                  e(
                    (4503599627370496 * (s = r * Math.pow(2, -l))) >>> 0,
                    i,
                    o + t
                  ),
                  e(
                    ((a << 31) |
                      ((l + 1023) << 20) |
                      ((1048576 * s) & 1048575)) >>>
                      0,
                    i,
                    o + n
                  );
              }
            }
          }
          function n(e, t, n, r, i) {
            var o = e(r, i + t),
              a = e(r, i + n),
              s = 2 * (a >> 31) + 1,
              l = (a >>> 20) & 2047,
              u = 4294967296 * (1048575 & a) + o;
            return 2047 === l
              ? u
                ? NaN
                : s * (1 / 0)
              : 0 === l
              ? 5e-324 * s * u
              : s * Math.pow(2, l - 1075) * (u + 4503599627370496);
          }
          (e.writeDoubleLE = t.bind(null, writeUintLE, 0, 4)),
            (e.writeDoubleBE = t.bind(null, writeUintBE, 4, 0)),
            (e.readDoubleLE = n.bind(null, readUintLE, 0, 4)),
            (e.readDoubleBE = n.bind(null, readUintBE, 4, 0));
        })(),
    e
  );
}
function writeUintLE(e, t, n) {
  (t[n] = 255 & e),
    (t[n + 1] = (e >>> 8) & 255),
    (t[n + 2] = (e >>> 16) & 255),
    (t[n + 3] = e >>> 24);
}
function writeUintBE(e, t, n) {
  (t[n] = e >>> 24),
    (t[n + 1] = (e >>> 16) & 255),
    (t[n + 2] = (e >>> 8) & 255),
    (t[n + 3] = 255 & e);
}
function readUintLE(e, t) {
  return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0;
}
function readUintBE(e, t) {
  return ((e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]) >>> 0;
}
var inquire_1 = inquire;
function inquire(moduleName) {
  try {
    var mod = eval("quire".replace(/^/, "re"))(moduleName);
    if (mod && (mod.length || Object.keys(mod).length)) return mod;
  } catch (e2) {}
  return null;
}
var utf8$4 = {},
  utf82;
(utf82 = utf8$4),
  (utf82.length = function (e) {
    for (var t = 0, n = 0, r = 0; r < e.length; ++r)
      (n = e.charCodeAt(r)) < 128
        ? (t += 1)
        : n < 2048
        ? (t += 2)
        : 55296 == (64512 & n) && 56320 == (64512 & e.charCodeAt(r + 1))
        ? (++r, (t += 4))
        : (t += 3);
    return t;
  }),
  (utf82.read = function (e, t, n) {
    if (n - t < 1) return "";
    for (var r, i = null, o = [], a = 0; t < n; )
      (r = e[t++]) < 128
        ? (o[a++] = r)
        : r > 191 && r < 224
        ? (o[a++] = ((31 & r) << 6) | (63 & e[t++]))
        : r > 239 && r < 365
        ? ((r =
            (((7 & r) << 18) |
              ((63 & e[t++]) << 12) |
              ((63 & e[t++]) << 6) |
              (63 & e[t++])) -
            65536),
          (o[a++] = 55296 + (r >> 10)),
          (o[a++] = 56320 + (1023 & r)))
        : (o[a++] = ((15 & r) << 12) | ((63 & e[t++]) << 6) | (63 & e[t++])),
        a > 8191 &&
          ((i || (i = [])).push(String.fromCharCode.apply(String, o)), (a = 0));
    return i
      ? (a && i.push(String.fromCharCode.apply(String, o.slice(0, a))),
        i.join(""))
      : String.fromCharCode.apply(String, o.slice(0, a));
  }),
  (utf82.write = function (e, t, n) {
    for (var r, i, o = n, a = 0; a < e.length; ++a)
      (r = e.charCodeAt(a)) < 128
        ? (t[n++] = r)
        : r < 2048
        ? ((t[n++] = (r >> 6) | 192), (t[n++] = (63 & r) | 128))
        : 55296 == (64512 & r) && 56320 == (64512 & (i = e.charCodeAt(a + 1)))
        ? ((r = 65536 + ((1023 & r) << 10) + (1023 & i)),
          ++a,
          (t[n++] = (r >> 18) | 240),
          (t[n++] = ((r >> 12) & 63) | 128),
          (t[n++] = ((r >> 6) & 63) | 128),
          (t[n++] = (63 & r) | 128))
        : ((t[n++] = (r >> 12) | 224),
          (t[n++] = ((r >> 6) & 63) | 128),
          (t[n++] = (63 & r) | 128));
    return n - o;
  });
var pool_1 = pool;
function pool(e, t, n) {
  var r = n || 8192,
    i = r >>> 1,
    o = null,
    a = r;
  return function (n) {
    if (n < 1 || n > i) return e(n);
    a + n > r && ((o = e(r)), (a = 0));
    var s = t.call(o, a, (a += n));
    return 7 & a && (a = 1 + (7 | a)), s;
  };
}
var longbits = LongBits$2,
  util$5 = minimal$1;
function LongBits$2(e, t) {
  (this.lo = e >>> 0), (this.hi = t >>> 0);
}
var zero = (LongBits$2.zero = new LongBits$2(0, 0));
(zero.toNumber = function () {
  return 0;
}),
  (zero.zzEncode = zero.zzDecode =
    function () {
      return this;
    }),
  (zero.length = function () {
    return 1;
  });
var zeroHash = (LongBits$2.zeroHash = "\0\0\0\0\0\0\0\0");
(LongBits$2.fromNumber = function (e) {
  if (0 === e) return zero;
  var t = e < 0;
  t && (e = -e);
  var n = e >>> 0,
    r = ((e - n) / 4294967296) >>> 0;
  return (
    t &&
      ((r = ~r >>> 0),
      (n = ~n >>> 0),
      ++n > 4294967295 && ((n = 0), ++r > 4294967295 && (r = 0))),
    new LongBits$2(n, r)
  );
}),
  (LongBits$2.from = function (e) {
    if ("number" == typeof e) return LongBits$2.fromNumber(e);
    if (util$5.isString(e)) {
      if (!util$5.Long) return LongBits$2.fromNumber(parseInt(e, 10));
      e = util$5.Long.fromString(e);
    }
    return e.low || e.high ? new LongBits$2(e.low >>> 0, e.high >>> 0) : zero;
  }),
  (LongBits$2.prototype.toNumber = function (e) {
    if (!e && this.hi >>> 31) {
      var t = (1 + ~this.lo) >>> 0,
        n = ~this.hi >>> 0;
      return t || (n = (n + 1) >>> 0), -(t + 4294967296 * n);
    }
    return this.lo + 4294967296 * this.hi;
  }),
  (LongBits$2.prototype.toLong = function (e) {
    return util$5.Long
      ? new util$5.Long(0 | this.lo, 0 | this.hi, Boolean(e))
      : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e) };
  });
var charCodeAt = String.prototype.charCodeAt;
(LongBits$2.fromHash = function (e) {
  return e === zeroHash
    ? zero
    : new LongBits$2(
        (charCodeAt.call(e, 0) |
          (charCodeAt.call(e, 1) << 8) |
          (charCodeAt.call(e, 2) << 16) |
          (charCodeAt.call(e, 3) << 24)) >>>
          0,
        (charCodeAt.call(e, 4) |
          (charCodeAt.call(e, 5) << 8) |
          (charCodeAt.call(e, 6) << 16) |
          (charCodeAt.call(e, 7) << 24)) >>>
          0
      );
}),
  (function (e) {
    var t = minimal$1;
    function n(e, t, n) {
      for (var r = Object.keys(t), i = 0; i < r.length; ++i)
        (void 0 !== e[r[i]] && n) || (e[r[i]] = t[r[i]]);
      return e;
    }
    function r(e) {
      function t(e, r) {
        if (!(this instanceof t)) return new t(e, r);
        Object.defineProperty(this, "message", {
          get: function () {
            return e;
          },
        }),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, t)
            : Object.defineProperty(this, "stack", {
                value: new Error().stack || "",
              }),
          r && n(this, r);
      }
      return (
        ((t.prototype = Object.create(Error.prototype)).constructor = t),
        Object.defineProperty(t.prototype, "name", {
          get: function () {
            return e;
          },
        }),
        (t.prototype.toString = function () {
          return this.name + ": " + this.message;
        }),
        t
      );
    }
    (t.asPromise = aspromise),
      (t.base64 = base64$2),
      (t.float = float),
      (t.inquire = inquire_1),
      (t.utf8 = utf8$4),
      (t.pool = pool_1),
      (t.LongBits = longbits),
      (t.isNode = Boolean(
        void 0 !== commonjsGlobal &&
          commonjsGlobal &&
          commonjsGlobal.process &&
          commonjsGlobal.process.versions &&
          commonjsGlobal.process.versions.node
      )),
      (t.global =
        (t.isNode && commonjsGlobal) ||
        ("undefined" != typeof window && window) ||
        ("undefined" != typeof self && self) ||
        commonjsGlobal),
      (t.emptyArray = Object.freeze ? Object.freeze([]) : []),
      (t.emptyObject = Object.freeze ? Object.freeze({}) : {}),
      (t.isInteger =
        Number.isInteger ||
        function (e) {
          return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
        }),
      (t.isString = function (e) {
        return "string" == typeof e || e instanceof String;
      }),
      (t.isObject = function (e) {
        return e && "object" == typeof e;
      }),
      (t.isset = t.isSet =
        function (e, t) {
          var n = e[t];
          return (
            !(null == n || !e.hasOwnProperty(t)) &&
            ("object" != typeof n ||
              (Array.isArray(n) ? n.length : Object.keys(n).length) > 0)
          );
        }),
      (t.Buffer = (function () {
        try {
          var e = t.inquire("buffer").Buffer;
          return e.prototype.utf8Write ? e : null;
        } catch (n) {
          return null;
        }
      })()),
      (t._Buffer_from = null),
      (t._Buffer_allocUnsafe = null),
      (t.newBuffer = function (e) {
        return "number" == typeof e
          ? t.Buffer
            ? t._Buffer_allocUnsafe(e)
            : new t.Array(e)
          : t.Buffer
          ? t._Buffer_from(e)
          : "undefined" == typeof Uint8Array
          ? e
          : new Uint8Array(e);
      }),
      (t.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array),
      (t.Long =
        (t.global.dcodeIO && t.global.dcodeIO.Long) ||
        t.global.Long ||
        t.inquire("long")),
      (t.key2Re = /^true|false|0|1$/),
      (t.key32Re = /^-?(?:0|[1-9][0-9]*)$/),
      (t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/),
      (t.longToHash = function (e) {
        return e ? t.LongBits.from(e).toHash() : t.LongBits.zeroHash;
      }),
      (t.longFromHash = function (e, n) {
        var r = t.LongBits.fromHash(e);
        return t.Long ? t.Long.fromBits(r.lo, r.hi, n) : r.toNumber(Boolean(n));
      }),
      (t.merge = n),
      (t.lcFirst = function (e) {
        return e.charAt(0).toLowerCase() + e.substring(1);
      }),
      (t.newError = r),
      (t.ProtocolError = r("ProtocolError")),
      (t.oneOfGetter = function (e) {
        for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = 1;
        return function () {
          for (var e = Object.keys(this), n = e.length - 1; n > -1; --n)
            if (1 === t[e[n]] && void 0 !== this[e[n]] && null !== this[e[n]])
              return e[n];
        };
      }),
      (t.oneOfSetter = function (e) {
        return function (t) {
          for (var n = 0; n < e.length; ++n) e[n] !== t && delete this[e[n]];
        };
      }),
      (t.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0,
      }),
      (t._configure = function () {
        var e = t.Buffer;
        e
          ? ((t._Buffer_from =
              (e.from !== Uint8Array.from && e.from) ||
              function (t, n) {
                return new e(t, n);
              }),
            (t._Buffer_allocUnsafe =
              e.allocUnsafe ||
              function (t) {
                return new e(t);
              }))
          : (t._Buffer_from = t._Buffer_allocUnsafe = null);
      });
  })();
var writer = Writer$1,
  util$4 = minimal$1,
  BufferWriter$1,
  LongBits$1 = util$4.LongBits,
  base64$1 = util$4.base64,
  utf8$3 = util$4.utf8;
function Op(e, t, n) {
  (this.fn = e), (this.len = t), (this.next = void 0), (this.val = n);
}
function noop$6() {}
function State(e) {
  (this.head = e.head),
    (this.tail = e.tail),
    (this.len = e.len),
    (this.next = e.states);
}
function Writer$1() {
  (this.len = 0),
    (this.head = new Op(noop$6, 0, 0)),
    (this.tail = this.head),
    (this.states = null);
}
var create$1 = function () {
  return util$4.Buffer
    ? function () {
        return (Writer$1.create = function () {
          return new BufferWriter$1();
        })();
      }
    : function () {
        return new Writer$1();
      };
};
function writeByte(e, t, n) {
  t[n] = 255 & e;
}
function writeVarint32(e, t, n) {
  for (; e > 127; ) (t[n++] = (127 & e) | 128), (e >>>= 7);
  t[n] = e;
}
function VarintOp(e, t) {
  (this.len = e), (this.next = void 0), (this.val = t);
}
function writeVarint64(e, t, n) {
  for (; e.hi; )
    (t[n++] = (127 & e.lo) | 128),
      (e.lo = ((e.lo >>> 7) | (e.hi << 25)) >>> 0),
      (e.hi >>>= 7);
  for (; e.lo > 127; ) (t[n++] = (127 & e.lo) | 128), (e.lo = e.lo >>> 7);
  t[n++] = e.lo;
}
function writeFixed32(e, t, n) {
  (t[n] = 255 & e),
    (t[n + 1] = (e >>> 8) & 255),
    (t[n + 2] = (e >>> 16) & 255),
    (t[n + 3] = e >>> 24);
}
(Writer$1.create = create$1()),
  (Writer$1.alloc = function (e) {
    return new util$4.Array(e);
  }),
  util$4.Array !== Array &&
    (Writer$1.alloc = util$4.pool(
      Writer$1.alloc,
      util$4.Array.prototype.subarray
    )),
  (Writer$1.prototype._push = function (e, t, n) {
    return (
      (this.tail = this.tail.next = new Op(e, t, n)), (this.len += t), this
    );
  }),
  (VarintOp.prototype = Object.create(Op.prototype)),
  (VarintOp.prototype.fn = writeVarint32),
  (Writer$1.prototype.uint32 = function (e) {
    return (
      (this.len += (this.tail = this.tail.next =
        new VarintOp(
          (e >>>= 0) < 128
            ? 1
            : e < 16384
            ? 2
            : e < 2097152
            ? 3
            : e < 268435456
            ? 4
            : 5,
          e
        )).len),
      this
    );
  }),
  (Writer$1.prototype.int32 = function (e) {
    return e < 0
      ? this._push(writeVarint64, 10, LongBits$1.fromNumber(e))
      : this.uint32(e);
  }),
  (Writer$1.prototype.sint32 = function (e) {
    return this.uint32(((e << 1) ^ (e >> 31)) >>> 0);
  }),
  (Writer$1.prototype.uint64 = function (e) {
    var t = LongBits$1.from(e);
    return this._push(writeVarint64, t.length(), t);
  }),
  (Writer$1.prototype.int64 = Writer$1.prototype.uint64),
  (Writer$1.prototype.sint64 = function (e) {
    var t = LongBits$1.from(e).zzEncode();
    return this._push(writeVarint64, t.length(), t);
  }),
  (Writer$1.prototype.bool = function (e) {
    return this._push(writeByte, 1, e ? 1 : 0);
  }),
  (Writer$1.prototype.fixed32 = function (e) {
    return this._push(writeFixed32, 4, e >>> 0);
  }),
  (Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32),
  (Writer$1.prototype.fixed64 = function (e) {
    var t = LongBits$1.from(e);
    return this._push(writeFixed32, 4, t.lo)._push(writeFixed32, 4, t.hi);
  }),
  (Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64),
  (Writer$1.prototype.float = function (e) {
    return this._push(util$4.float.writeFloatLE, 4, e);
  }),
  (Writer$1.prototype.double = function (e) {
    return this._push(util$4.float.writeDoubleLE, 8, e);
  });
var writeBytes = util$4.Array.prototype.set
  ? function (e, t, n) {
      t.set(e, n);
    }
  : function (e, t, n) {
      for (var r = 0; r < e.length; ++r) t[n + r] = e[r];
    };
(Writer$1.prototype.bytes = function (e) {
  var t = e.length >>> 0;
  if (!t) return this._push(writeByte, 1, 0);
  if (util$4.isString(e)) {
    var n = Writer$1.alloc((t = base64$1.length(e)));
    base64$1.decode(e, n, 0), (e = n);
  }
  return this.uint32(t)._push(writeBytes, t, e);
}),
  (Writer$1.prototype.string = function (e) {
    var t = utf8$3.length(e);
    return t
      ? this.uint32(t)._push(utf8$3.write, t, e)
      : this._push(writeByte, 1, 0);
  }),
  (Writer$1.prototype.fork = function () {
    return (
      (this.states = new State(this)),
      (this.head = this.tail = new Op(noop$6, 0, 0)),
      (this.len = 0),
      this
    );
  }),
  (Writer$1.prototype.reset = function () {
    return (
      this.states
        ? ((this.head = this.states.head),
          (this.tail = this.states.tail),
          (this.len = this.states.len),
          (this.states = this.states.next))
        : ((this.head = this.tail = new Op(noop$6, 0, 0)), (this.len = 0)),
      this
    );
  }),
  (Writer$1.prototype.ldelim = function () {
    var e = this.head,
      t = this.tail,
      n = this.len;
    return (
      this.reset().uint32(n),
      n && ((this.tail.next = e.next), (this.tail = t), (this.len += n)),
      this
    );
  }),
  (Writer$1.prototype.finish = function () {
    for (
      var e = this.head.next, t = this.constructor.alloc(this.len), n = 0;
      e;

    )
      e.fn(e.val, t, n), (n += e.len), (e = e.next);
    return t;
  }),
  (Writer$1._configure = function (e) {
    (BufferWriter$1 = e),
      (Writer$1.create = create$1()),
      BufferWriter$1._configure();
  });
var writer_buffer = BufferWriter,
  Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor =
  BufferWriter;
var util$3 = minimal$1;
function BufferWriter() {
  Writer.call(this);
}
function writeStringBuffer(e, t, n) {
  e.length < 40
    ? util$3.utf8.write(e, t, n)
    : t.utf8Write
    ? t.utf8Write(e, n)
    : t.write(e, n);
}
(BufferWriter._configure = function () {
  (BufferWriter.alloc = util$3._Buffer_allocUnsafe),
    (BufferWriter.writeBytesBuffer =
      util$3.Buffer &&
      util$3.Buffer.prototype instanceof Uint8Array &&
      "set" === util$3.Buffer.prototype.set.name
        ? function (e, t, n) {
            t.set(e, n);
          }
        : function (e, t, n) {
            if (e.copy) e.copy(t, n, 0, e.length);
            else for (var r = 0; r < e.length; ) t[n++] = e[r++];
          });
}),
  (BufferWriter.prototype.bytes = function (e) {
    util$3.isString(e) && (e = util$3._Buffer_from(e, "base64"));
    var t = e.length >>> 0;
    return (
      this.uint32(t), t && this._push(BufferWriter.writeBytesBuffer, t, e), this
    );
  }),
  (BufferWriter.prototype.string = function (e) {
    var t = util$3.Buffer.byteLength(e);
    return this.uint32(t), t && this._push(writeStringBuffer, t, e), this;
  }),
  BufferWriter._configure();
var reader = Reader$1,
  util$2 = minimal$1,
  BufferReader$1,
  LongBits = util$2.LongBits,
  utf8$2 = util$2.utf8;
function indexOutOfRange(e, t) {
  return RangeError(
    "index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len
  );
}
function Reader$1(e) {
  (this.buf = e), (this.pos = 0), (this.len = e.length);
}
var create_array =
    "undefined" != typeof Uint8Array
      ? function (e) {
          if (e instanceof Uint8Array || Array.isArray(e))
            return new Reader$1(e);
          throw Error("illegal buffer");
        }
      : function (e) {
          if (Array.isArray(e)) return new Reader$1(e);
          throw Error("illegal buffer");
        },
  create = function () {
    return util$2.Buffer
      ? function (e) {
          return (Reader$1.create = function (e) {
            return util$2.Buffer.isBuffer(e)
              ? new BufferReader$1(e)
              : create_array(e);
          })(e);
        }
      : create_array;
  },
  value;
function readLongVarint() {
  var e = new LongBits(0, 0),
    t = 0;
  if (!(this.len - this.pos > 4)) {
    for (; t < 3; ++t) {
      if (this.pos >= this.len) throw indexOutOfRange(this);
      if (
        ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << (7 * t))) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return e;
    }
    return (e.lo = (e.lo | ((127 & this.buf[this.pos++]) << (7 * t))) >>> 0), e;
  }
  for (; t < 4; ++t)
    if (
      ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << (7 * t))) >>> 0),
      this.buf[this.pos++] < 128)
    )
      return e;
  if (
    ((e.lo = (e.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
    (e.hi = (e.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
    this.buf[this.pos++] < 128)
  )
    return e;
  if (((t = 0), this.len - this.pos > 4)) {
    for (; t < 5; ++t)
      if (
        ((e.hi = (e.hi | ((127 & this.buf[this.pos]) << (7 * t + 3))) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return e;
  } else
    for (; t < 5; ++t) {
      if (this.pos >= this.len) throw indexOutOfRange(this);
      if (
        ((e.hi = (e.hi | ((127 & this.buf[this.pos]) << (7 * t + 3))) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return e;
    }
  throw Error("invalid varint encoding");
}
function readFixed32_end(e, t) {
  return (
    (e[t - 4] | (e[t - 3] << 8) | (e[t - 2] << 16) | (e[t - 1] << 24)) >>> 0
  );
}
function readFixed64() {
  if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
  return new LongBits(
    readFixed32_end(this.buf, (this.pos += 4)),
    readFixed32_end(this.buf, (this.pos += 4))
  );
}
(Reader$1.create = create()),
  (Reader$1.prototype._slice =
    util$2.Array.prototype.subarray || util$2.Array.prototype.slice),
  (Reader$1.prototype.uint32 =
    ((value = 4294967295),
    function () {
      if (
        ((value = (127 & this.buf[this.pos]) >>> 0), this.buf[this.pos++] < 128)
      )
        return value;
      if (
        ((value = (value | ((127 & this.buf[this.pos]) << 7)) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return value;
      if (
        ((value = (value | ((127 & this.buf[this.pos]) << 14)) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return value;
      if (
        ((value = (value | ((127 & this.buf[this.pos]) << 21)) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return value;
      if (
        ((value = (value | ((15 & this.buf[this.pos]) << 28)) >>> 0),
        this.buf[this.pos++] < 128)
      )
        return value;
      if ((this.pos += 5) > this.len)
        throw ((this.pos = this.len), indexOutOfRange(this, 10));
      return value;
    })),
  (Reader$1.prototype.int32 = function () {
    return 0 | this.uint32();
  }),
  (Reader$1.prototype.sint32 = function () {
    var e = this.uint32();
    return ((e >>> 1) ^ -(1 & e)) | 0;
  }),
  (Reader$1.prototype.bool = function () {
    return 0 !== this.uint32();
  }),
  (Reader$1.prototype.fixed32 = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, (this.pos += 4));
  }),
  (Reader$1.prototype.sfixed32 = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return 0 | readFixed32_end(this.buf, (this.pos += 4));
  }),
  (Reader$1.prototype.float = function () {
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    var e = util$2.float.readFloatLE(this.buf, this.pos);
    return (this.pos += 4), e;
  }),
  (Reader$1.prototype.double = function () {
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
    var e = util$2.float.readDoubleLE(this.buf, this.pos);
    return (this.pos += 8), e;
  }),
  (Reader$1.prototype.bytes = function () {
    var e = this.uint32(),
      t = this.pos,
      n = this.pos + e;
    if (n > this.len) throw indexOutOfRange(this, e);
    return (
      (this.pos += e),
      Array.isArray(this.buf)
        ? this.buf.slice(t, n)
        : t === n
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, t, n)
    );
  }),
  (Reader$1.prototype.string = function () {
    var e = this.bytes();
    return utf8$2.read(e, 0, e.length);
  }),
  (Reader$1.prototype.skip = function (e) {
    if ("number" == typeof e) {
      if (this.pos + e > this.len) throw indexOutOfRange(this, e);
      this.pos += e;
    } else
      do {
        if (this.pos >= this.len) throw indexOutOfRange(this);
      } while (128 & this.buf[this.pos++]);
    return this;
  }),
  (Reader$1.prototype.skipType = function (e) {
    switch (e) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        for (; 4 != (e = 7 & this.uint32()); ) this.skipType(e);
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error("invalid wire type " + e + " at offset " + this.pos);
    }
    return this;
  }),
  (Reader$1._configure = function (e) {
    (BufferReader$1 = e),
      (Reader$1.create = create()),
      BufferReader$1._configure();
    var t = util$2.Long ? "toLong" : "toNumber";
    util$2.merge(Reader$1.prototype, {
      int64: function () {
        return readLongVarint.call(this)[t](!1);
      },
      uint64: function () {
        return readLongVarint.call(this)[t](!0);
      },
      sint64: function () {
        return readLongVarint.call(this).zzDecode()[t](!1);
      },
      fixed64: function () {
        return readFixed64.call(this)[t](!0);
      },
      sfixed64: function () {
        return readFixed64.call(this)[t](!1);
      },
    });
  });
var reader_buffer = BufferReader,
  Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor =
  BufferReader;
var util$1 = minimal$1;
function BufferReader(e) {
  Reader.call(this, e);
}
(BufferReader._configure = function () {
  util$1.Buffer &&
    (BufferReader.prototype._slice = util$1.Buffer.prototype.slice);
}),
  (BufferReader.prototype.string = function () {
    var e = this.uint32();
    return this.buf.utf8Slice
      ? this.buf.utf8Slice(
          this.pos,
          (this.pos = Math.min(this.pos + e, this.len))
        )
      : this.buf.toString(
          "utf-8",
          this.pos,
          (this.pos = Math.min(this.pos + e, this.len))
        );
  }),
  BufferReader._configure();
var rpc = {};
var roots = {};
!(function (e) {
  var t = indexMinimal;
  function n() {
    t.util._configure(),
      t.Writer._configure(t.BufferWriter),
      t.Reader._configure(t.BufferReader);
  }
  (t.build = "minimal"),
    (t.Writer = writer),
    (t.BufferWriter = writer_buffer),
    (t.Reader = reader),
    (t.BufferReader = reader_buffer),
    (t.util = minimal$1),
    (t.rpc = rpc),
    (t.roots = roots),
    (t.configure = n),
    n();
})();
var minimal = indexMinimal;

export { minimal };
