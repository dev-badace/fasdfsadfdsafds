import { Manager } from "socket.io-client";
import { Emitter } from "@socket.io/component-emitter"; // polyfill of Node.js EventEmitter in the browser
import { minimal, Decimal } from "./vendor.js";

const ss = new TextEncoder("utf-8");
const rs = new TextDecoder("utf-8");
const xs = new TextDecoder("utf-8");

function bufferToArrayBuffer(buffer) {
  // Convert Node.js Buffer to ArrayBuffer
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}

class ds extends Emitter {
  add(data) {
    var e = bufferToArrayBuffer(data);
    let t = (function (e) {
      let t,
        i,
        a,
        n,
        o,
        s = 0,
        r = -1;
      const l = new DataView(e, 0);
      (t = l.getUint8(s)),
        s++,
        t >= 128 && ((t %= 128), (r = l.getUint32(s)), (s += 4));
      return (
        (o = l.getUint8(s)),
        s++,
        (i = new Uint8Array(e, s, o)),
        (s += o),
        (o = l.getUint8(s)),
        s++,
        (a = new Uint8Array(e, s, o)),
        (s += o),
        (n = e.slice(s)),
        {
          type: t,
          data: n,
          namespace: rs.decode(i),
          event: rs.decode(a),
          ackId: r,
        }
      );
    })(e);
    5 === t.type && (t.type = 2), 6 === t.type && (t.type = 3);
    let i = {
      type: t.type,
      data: 3 === t.type ? [t.data] : [t.event, t.data],
      nsp: t.namespace,
      id: t.ackId,
    };
    this.emit("decoded", i);
  }
  destroy() {}
}
function hs(e) {
  let t,
    i,
    a = e.type,
    n = [];
  if (-1 !== e.ackId) {
    (a += 128), n.push(Uint8Array.of(a));
    let t = new Uint8Array(4);
    new DataView(t.buffer).setUint32(0, e.ackId), n.push(t);
  } else n.push(Uint8Array.of(a));
  return (
    (i = ss.encode(e.namespace)),
    n.push(Uint8Array.of(i.length)),
    n.push(i),
    (t = ss.encode(e.event)),
    n.push(Uint8Array.of(t.length)),
    n.push(t),
    n.push(new Uint8Array(e.data)),
    ms(Uint8Array, ...n).buffer
  );
}
const ms = (e, ...t) => {
  let i = 0;
  for (let o of t) i += o.length;
  let a = new e(i),
    n = 0;
  for (let o of t) a.set(o, n), (n += o.length);
  return a;
};

var ps = Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Encoder: class {
    encode(e, t) {
      let i, a, n;

      return (
        2 === e.type
          ? ((i = e.data[0]), (a = e.data[1]))
          : ((i = ""), (a = new ArrayBuffer(0))),
        (n = void 0 === e.id ? -1 : e.id),
        t([hs({ type: e.type, namespace: e.nsp, event: i, data: a, ackId: n })])
      );
    }
  },
  Decoder: ds,
  concatenate: ms,
});

function encode(e = "utf8") {
  return (t) => {
    if ("utf8" === e) return $s.encode(t);
    if ("json" === e) return $s.encode(JSON.stringify(t));
    if ("int8" === e) return Uint8Array.of(t);
    if ("int32" === e) {
      let e = new Uint8Array(4);
      return new DataView(e.buffer).setUint32(0, t), e;
    }
    if ("int64" === e) {
      let e = ee.fromNumber(t),
        i = new Uint8Array(8),
        a = new DataView(i.buffer);
      return a.setUint32(0, e.high), a.setUint32(4, e.low), i;
    }
    return e.encode(new e(t)).finish();
  };
}

function decode(e = "utf8") {
  return (t) => {
    let i;
    if ("utf8" === e) i = xs.decode(t);
    else if ("json" === e) i = JSON.parse(xs.decode(t));
    else if ("int8" === e) i = new DataView(t).getUint8(0);
    else if ("int32" === e) i = new DataView(t).getUint32(0);
    else if ("int64" === e) {
      let e = new DataView(t);
      i = new ee(e.getUint32(4), e.getUint32(0)).toNumber();
    } else i = e.decode(new Uint8Array(t));
    return i;
  };
}

function decodeBind(e, t = "utf8") {
  return (i) => e(decode(t)(i));
}

const rn = minimal.util; //
const nn = minimal.Reader;
const an = minimal.Writer;

const on = minimal.roots.gameCrash || (minimal.roots.gameCrash = {});
on.CrashInfo = (() => {
  function t(t) {
    if (((this.players = []), (this.xBets = []), t))
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.gameId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.status = 0),
    (t.prototype.prepareTime = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.startTime = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.hash = ""),
    (t.prototype.maxRate = 0),
    (t.prototype.players = rn.emptyArray),
    (t.prototype.xBets = rn.emptyArray),
    (t.encode = function (t, e) {
      if (
        (e || (e = an.create()),
        null != t.gameId &&
          Object.hasOwnProperty.call(t, "gameId") &&
          e.uint32(8).int64(t.gameId),
        null != t.status &&
          Object.hasOwnProperty.call(t, "status") &&
          e.uint32(16).int32(t.status),
        null != t.prepareTime &&
          Object.hasOwnProperty.call(t, "prepareTime") &&
          e.uint32(24).int64(t.prepareTime),
        null != t.startTime &&
          Object.hasOwnProperty.call(t, "startTime") &&
          e.uint32(32).int64(t.startTime),
        null != t.hash &&
          Object.hasOwnProperty.call(t, "hash") &&
          e.uint32(50).string(t.hash),
        null != t.maxRate &&
          Object.hasOwnProperty.call(t, "maxRate") &&
          e.uint32(56).int32(t.maxRate),
        null != t.players && t.players.length)
      )
        for (let n = 0; n < t.players.length; ++n)
          on.CrashInfo.PlayerInfo.encode(
            t.players[n],
            e.uint32(66).fork()
          ).ldelim();
      if (null != t.xBets && t.xBets.length)
        for (let n = 0; n < t.xBets.length; ++n)
          on.XBet.encode(t.xBets[n], e.uint32(122).fork()).ldelim();
      return e;
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.CrashInfo();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.gameId = t.int64();
            break;
          case 2:
            i.status = t.int32();
            break;
          case 3:
            i.prepareTime = t.int64();
            break;
          case 4:
            i.startTime = t.int64();
            break;
          case 6:
            i.hash = t.string();
            break;
          case 7:
            i.maxRate = t.int32();
            break;
          case 8:
            (i.players && i.players.length) || (i.players = []),
              i.players.push(on.CrashInfo.PlayerInfo.decode(t, t.uint32()));
            break;
          case 15:
            (i.xBets && i.xBets.length) || (i.xBets = []),
              i.xBets.push(on.XBet.decode(t, t.uint32()));
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    (t.PlayerInfo = (function () {
      function t(t) {
        if (t)
          for (let e = Object.keys(t), n = 0; n < e.length; ++n)
            null != t[e[n]] && (this[e[n]] = t[e[n]]);
      }
      return (
        (t.prototype.userId = 0),
        (t.prototype.name = ""),
        (t.prototype.currencyName = ""),
        (t.prototype.bet = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
        (t.prototype.rate = 0),
        (t.encode = function (t, e) {
          return (
            e || (e = an.create()),
            null != t.userId &&
              Object.hasOwnProperty.call(t, "userId") &&
              e.uint32(8).int32(t.userId),
            null != t.name &&
              Object.hasOwnProperty.call(t, "name") &&
              e.uint32(18).string(t.name),
            null != t.currencyName &&
              Object.hasOwnProperty.call(t, "currencyName") &&
              e.uint32(26).string(t.currencyName),
            null != t.bet &&
              Object.hasOwnProperty.call(t, "bet") &&
              e.uint32(32).int64(t.bet),
            null != t.rate &&
              Object.hasOwnProperty.call(t, "rate") &&
              e.uint32(40).int32(t.rate),
            e
          );
        }),
        (t.decode = function (t, e) {
          t instanceof nn || (t = nn.create(t));
          let n = void 0 === e ? t.len : t.pos + e,
            i = new on.CrashInfo.PlayerInfo();
          for (; t.pos < n; ) {
            let e = t.uint32();
            switch (e >>> 3) {
              case 1:
                i.userId = t.int32();
                break;
              case 2:
                i.name = t.string();
                break;
              case 3:
                i.currencyName = t.string();
                break;
              case 4:
                i.bet = t.int64();
                break;
              case 5:
                i.rate = t.int32();
                break;
              default:
                t.skipType(7 & e);
            }
          }
          return i;
        }),
        t
      );
    })()),
    t
  );
})();
on.Prepare = (() => {
  function t(t) {
    if (t)
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.gameId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.prepareTime = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.startTime = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.encode = function (t, e) {
      return (
        e || (e = an.create()),
        null != t.gameId &&
          Object.hasOwnProperty.call(t, "gameId") &&
          e.uint32(8).int64(t.gameId),
        null != t.prepareTime &&
          Object.hasOwnProperty.call(t, "prepareTime") &&
          e.uint32(24).int64(t.prepareTime),
        null != t.startTime &&
          Object.hasOwnProperty.call(t, "startTime") &&
          e.uint32(32).int64(t.startTime),
        e
      );
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.Prepare();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.gameId = t.int64();
            break;
          case 3:
            i.prepareTime = t.int64();
            break;
          case 4:
            i.startTime = t.int64();
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    t
  );
})();

on.Progress = (() => {
  function t(t) {
    if (t)
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.elapsed = 0),
    (t.encode = function (t, e) {
      return (
        e || (e = an.create()),
        null != t.elapsed &&
          Object.hasOwnProperty.call(t, "elapsed") &&
          e.uint32(8).int32(t.elapsed),
        e
      );
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.Progress();
      for (; t.pos < n; ) {
        let e = t.uint32();
        if (e >>> 3 == 1) i.elapsed = t.int32();
        else t.skipType(7 & e);
      }
      return i;
    }),
    t
  );
})();

on.End = (() => {
  function t(t) {
    if (t)
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.gameId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.maxRate = 0),
    (t.prototype.hash = ""),
    (t.encode = function (t, e) {
      return (
        e || (e = an.create()),
        null != t.gameId &&
          Object.hasOwnProperty.call(t, "gameId") &&
          e.uint32(8).int64(t.gameId),
        null != t.maxRate &&
          Object.hasOwnProperty.call(t, "maxRate") &&
          e.uint32(48).int32(t.maxRate),
        null != t.hash &&
          Object.hasOwnProperty.call(t, "hash") &&
          e.uint32(58).string(t.hash),
        e
      );
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.End();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.gameId = t.int64();
            break;
          case 6:
            i.maxRate = t.int32();
            break;
          case 7:
            i.hash = t.string();
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    t
  );
})();

on.Begin = (() => {
  function t(t) {
    if (((this.betUserIds = []), t))
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.gameId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.startTime = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.betUserIds = rn.emptyArray),
    (t.encode = function (t, e) {
      if (
        (e || (e = an.create()),
        null != t.gameId &&
          Object.hasOwnProperty.call(t, "gameId") &&
          e.uint32(8).int64(t.gameId),
        null != t.startTime &&
          Object.hasOwnProperty.call(t, "startTime") &&
          e.uint32(32).int64(t.startTime),
        null != t.betUserIds && t.betUserIds.length)
      ) {
        e.uint32(42).fork();
        for (let n = 0; n < t.betUserIds.length; ++n) e.int32(t.betUserIds[n]);
        e.ldelim();
      }
      return e;
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.Begin();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.gameId = t.int64();
            break;
          case 4:
            i.startTime = t.int64();
            break;
          case 5:
            if (
              ((i.betUserIds && i.betUserIds.length) || (i.betUserIds = []),
              2 == (7 & e))
            ) {
              let e = t.uint32() + t.pos;
              for (; t.pos < e; ) i.betUserIds.push(t.int32());
            } else i.betUserIds.push(t.int32());
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    t
  );
})();

on.Escape = (() => {
  function t(t) {
    if (t)
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.userId = 0),
    (t.prototype.betId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.rate = 0),
    (t.prototype.force = !1),
    (t.encode = function (t, e) {
      return (
        e || (e = an.create()),
        null != t.userId &&
          Object.hasOwnProperty.call(t, "userId") &&
          e.uint32(8).int32(t.userId),
        null != t.betId &&
          Object.hasOwnProperty.call(t, "betId") &&
          e.uint32(16).int64(t.betId),
        null != t.rate &&
          Object.hasOwnProperty.call(t, "rate") &&
          e.uint32(24).int32(t.rate),
        null != t.force &&
          Object.hasOwnProperty.call(t, "force") &&
          e.uint32(32).bool(t.force),
        e
      );
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.Escape();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.userId = t.int32();
            break;
          case 2:
            i.betId = t.int64();
            break;
          case 3:
            i.rate = t.int32();
            break;
          case 4:
            i.force = t.bool();
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    t
  );
})();
on.Settle = (() => {
  function t(t) {
    if (((this.escapes = []), t))
      for (let e = Object.keys(t), n = 0; n < e.length; ++n)
        null != t[e[n]] && (this[e[n]] = t[e[n]]);
  }
  return (
    (t.prototype.gameId = rn.Long ? rn.Long.fromBits(0, 0, !1) : 0),
    (t.prototype.escapes = rn.emptyArray),
    (t.prototype.maxRate = 0),
    (t.prototype.hash = ""),
    (t.encode = function (t, e) {
      if (
        (e || (e = an.create()),
        null != t.gameId &&
          Object.hasOwnProperty.call(t, "gameId") &&
          e.uint32(8).int64(t.gameId),
        null != t.escapes && t.escapes.length)
      )
        for (let n = 0; n < t.escapes.length; ++n)
          on.Escape.encode(t.escapes[n], e.uint32(18).fork()).ldelim();
      return (
        null != t.maxRate &&
          Object.hasOwnProperty.call(t, "maxRate") &&
          e.uint32(48).int32(t.maxRate),
        null != t.hash &&
          Object.hasOwnProperty.call(t, "hash") &&
          e.uint32(58).string(t.hash),
        e
      );
    }),
    (t.decode = function (t, e) {
      t instanceof nn || (t = nn.create(t));
      let n = void 0 === e ? t.len : t.pos + e,
        i = new on.Settle();
      for (; t.pos < n; ) {
        let e = t.uint32();
        switch (e >>> 3) {
          case 1:
            i.gameId = t.int64();
            break;
          case 2:
            (i.escapes && i.escapes.length) || (i.escapes = []),
              i.escapes.push(on.Escape.decode(t, t.uint32()));
            break;
          case 6:
            i.maxRate = t.int32();
            break;
          case 7:
            i.hash = t.string();
            break;
          default:
            t.skipType(7 & e);
        }
      }
      return i;
    }),
    t
  );
})();

let gameId, status, hash, elapsed, rate, startTime;
function Fn(t) {
  return Math.pow(Math.E, 6e-5 * t);
}
function Ln(t) {
  return Math.log(t) / 6e-5;
}

function onPrepare({ gameId: t, startTime: e, prepareTime: n }) {
  (gameId = t),
    (status = 1),
    (hash = ""),
    (startTime = Date.now() + e - n),
    (rate = 0),
    (elapsed = 0),
    console.log({ gameId, startTime, prepareTime: n });
}

function onProgress({ elapsed: t }) {
  (status = 2), (elapsed = t), (rate = Fn(t));
  let e = Date.now() - elapsed;
  startTime > e && (startTime = e),
    console.log("game_progress ", rate.toFixed(2));
}

function onEnd(t) {
  (status = 3),
    (rate = new Decimal(t.maxRate).div(100).toNumber()),
    (elapsed = Ln(rate)),
    (hash = t.hash);

  console.log({ rate, hash });
}

function onSettle(...data) {
  console.log(`settle data`);
  console.log(data);
}

const manager = new Manager("wss://socket2v2.nanogames.io/", {
  timeout: 2e4,
  reconnectionDelayMax: 1e4,
  transports: ["websocket"],
  reconnectionAttempts: 2,
  query: { a: 1 },
  parser: ps,
});

export { manager, on, decodeBind, onPrepare, onProgress, onEnd, onSettle };
