var Z = (_0x41db41, _0xc3d538) => () => {
  if (!_0xc3d538) {
    _0x41db41((_0xc3d538 = {
      exports: {}
    }).exports, _0xc3d538);
  }
  return _0xc3d538.exports;
};
var je = Z((_0x3def47, _0x456adf) => {
  'use strict';

  var _0x30d63f = require("node:fs");
  var _0x403598 = require("node:path");
  var _0x1c08d0 = "ezmax_node.node";
  var _0x46671c = new Set(["release", "cpython-signed"]);
  function _0x1fe6ba() {
    return _0x46671c.has(process.env.EZMAXSUB_SECURITY_PROFILE);
  }
  var _0x5a7f1c;
  function _0x1db299() {
    let _0x15c466 = _0x1fe6ba();
    let _0x336ed0 = [];
    if (!_0x15c466 && process.env.EZMAX_NODE_ADDON) {
      _0x336ed0.push(process.env.EZMAX_NODE_ADDON);
    }
    _0x336ed0.push(_0x403598.join(__dirname, _0x1c08d0));
    _0x336ed0.push(_0x403598.join(__dirname, "native", _0x1c08d0));
    if (!_0x15c466) {
      _0x336ed0.push(_0x403598.join(__dirname, "..", "..", "native", "target", "release", _0x1c08d0));
      _0x336ed0.push(_0x403598.join(__dirname, "..", "..", "native", "target", "debug", _0x1c08d0));
    }
    return _0x336ed0;
  }
  function _0x1fde05() {
    if (_0x5a7f1c !== undefined) {
      return _0x5a7f1c;
    }
    _0x5a7f1c = null;
    try {
      let _0x4897c9 = eval("require;");
      for (let _0xab432d of _0x1db299()) {
        try {
          if (_0xab432d && _0x30d63f.existsSync(_0xab432d)) {
            _0x5a7f1c = _0x4897c9(_0xab432d);
            break;
          }
        } catch {}
      }
    } catch (_0x1caf04) {
      _0x5a7f1c = null;
    }
    return _0x5a7f1c;
  }
  function _0x2c4eab(_0x2906b1) {
    if (_0x1fe6ba()) {
      return false;
    } else {
      return process.env[_0x2906b1] === "1";
    }
  }
  function _0x5955a5() {
    if (_0x2c4eab("EZMAX_RUST_CANONICAL")) {
      if (_0x1fde05()) {
        return "canonical";
      } else {
        return "off";
      }
    } else if (_0x2c4eab("EZMAX_RUST_SHADOW") && _0x1fde05()) {
      return "shadow";
    } else {
      return "off";
    }
  }
  function _0x43de5d() {
    return _0x2c4eab("EZMAX_RUST_SHADOW") && !!_0x1fde05();
  }
  function _0xd8a097(_0x1c4a89) {
    return JSON.parse(JSON.stringify(_0x1c4a89, (_0x3f2113, _0x3a2cdd) => _0x3a2cdd instanceof Set ? Array.from(_0x3a2cdd) : _0x3a2cdd));
  }
  function _0x55ec1d(_0x16ddcf, _0x1b2ce1) {
    if (_0x16ddcf === _0x1b2ce1) {
      return true;
    }
    if (typeof _0x16ddcf == "number" && typeof _0x1b2ce1 == "number") {
      return Math.abs(_0x16ddcf - _0x1b2ce1) <= 1e-9;
    }
    if (_0x16ddcf === null || _0x1b2ce1 === null) {
      return _0x16ddcf === _0x1b2ce1;
    }
    if (Array.isArray(_0x16ddcf) || Array.isArray(_0x1b2ce1)) {
      if (!Array.isArray(_0x16ddcf) || !Array.isArray(_0x1b2ce1) || _0x16ddcf.length !== _0x1b2ce1.length) {
        return false;
      }
      for (let _0x24a220 = 0; _0x24a220 < _0x16ddcf.length; _0x24a220++) {
        if (!_0x55ec1d(_0x16ddcf[_0x24a220], _0x1b2ce1[_0x24a220])) {
          return false;
        }
      }
      return true;
    }
    if (typeof _0x16ddcf == "object" && typeof _0x1b2ce1 == "object") {
      let _0x278c56 = Object.keys(_0x16ddcf);
      let _0x228a1f = Object.keys(_0x1b2ce1);
      if (_0x278c56.length !== _0x228a1f.length) {
        return false;
      }
      for (let _0x1e105d of _0x278c56) {
        if (!Object.prototype.hasOwnProperty.call(_0x1b2ce1, _0x1e105d) || !_0x55ec1d(_0x16ddcf[_0x1e105d], _0x1b2ce1[_0x1e105d])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  function _0x1590d1(_0x3a9a05, _0x588e33, _0x1db1e8 = 240) {
    let _0x27d486;
    try {
      _0x27d486 = "js=" + JSON.stringify(_0x3a9a05) + " rust=" + JSON.stringify(_0x588e33);
    } catch {
      _0x27d486 = "(unserializable)";
    }
    if (_0x27d486.length > _0x1db1e8) {
      return _0x27d486.slice(0, _0x1db1e8) + "…";
    } else {
      return _0x27d486;
    }
  }
  function _0x22e9f5(_0x318cbf) {
    try {
      let _0x3df1a1 = String(_0x318cbf).replace(/\r?\n$/, "");
      for (let _0x42f42c of _0x3df1a1.split(/\r?\n/)) {
        process.stdout.write("LOG: " + _0x42f42c + "\n");
      }
    } catch {}
  }
  var _0x11d652 = class extends Error {};
  function _0x395207(_0x40cef8, _0x38215d) {
    if (_0x40cef8 instanceof Set) {
      if (!Array.isArray(_0x38215d)) {
        throw new _0x11d652("expected array for Set contract");
      }
      return new Set(_0x38215d);
    }
    if (_0x40cef8 instanceof Map) {
      throw new _0x11d652("Map contract not reconstructable");
    }
    if (_0x40cef8 !== undefined) {
      if (_0x40cef8 === null) {
        return _0x38215d;
      }
      if (Array.isArray(_0x40cef8)) {
        if (!Array.isArray(_0x38215d) || _0x38215d.length !== _0x40cef8.length) {
          throw new _0x11d652("array shape mismatch");
        }
        return _0x40cef8.map((_0x502476, _0x54b3b6) => _0x395207(_0x502476, _0x38215d[_0x54b3b6]));
      }
      if (typeof _0x40cef8 == "object") {
        if (_0x38215d === null || typeof _0x38215d != "object" || Array.isArray(_0x38215d)) {
          throw new _0x11d652("object shape mismatch");
        }
        let _0x2f6c9d = {};
        for (let _0x21dc82 of Object.keys(_0x40cef8)) {
          let _0x356bb0 = Object.prototype.hasOwnProperty.call(_0x38215d, _0x21dc82);
          _0x2f6c9d[_0x21dc82] = _0x395207(_0x40cef8[_0x21dc82], _0x356bb0 ? _0x38215d[_0x21dc82] : undefined);
        }
        return _0x2f6c9d;
      }
      return _0x38215d;
    }
  }
  function _0x4ea344(_0x1dba6b, _0x563cf6, _0x4ae4b2) {
    let _0x4ea21f = _0x2c4eab("EZMAX_RUST_CANONICAL") || _0x2c4eab("EZMAX_RUST_SHADOW") ? _0x1fde05() : null;
    if (!_0x4ea21f) {
      return _0x563cf6;
    }
    try {
      let _0x1323c7 = _0x4ae4b2(_0x4ea21f);
      let _0x5e2d77 = _0xd8a097(_0x563cf6);
      let _0x52d515 = _0xd8a097(_0x1323c7);
      if (!_0x55ec1d(_0x5e2d77, _0x52d515)) {
        _0x22e9f5("[crosscheck] " + _0x1dba6b + " DIVERGENCE " + _0x1590d1(_0x5e2d77, _0x52d515));
      }
    } catch (_0x33869a) {
      _0x22e9f5("[crosscheck] " + _0x1dba6b + " error " + (_0x33869a && _0x33869a.message || String(_0x33869a)));
    }
    return _0x563cf6;
  }
  function _0x67e4cc(_0x57a125, _0x3fbd4e, _0x20833c) {
    let _0x30e5a4 = _0x5955a5();
    if (_0x30e5a4 === "off") {
      return _0x3fbd4e;
    }
    if (_0x30e5a4 === "shadow") {
      try {
        let _0x6910d5 = _0x20833c(_0x1fde05());
        let _0x2c964f = _0xd8a097(_0x3fbd4e);
        let _0x45f607 = _0xd8a097(_0x6910d5);
        if (!_0x55ec1d(_0x2c964f, _0x45f607)) {
          _0x22e9f5("[shadow] " + _0x57a125 + " DIVERGENCE " + _0x1590d1(_0x2c964f, _0x45f607));
        }
      } catch (_0x56a9c7) {
        _0x22e9f5("[shadow] " + _0x57a125 + " error " + (_0x56a9c7 && _0x56a9c7.message || String(_0x56a9c7)));
      }
      return _0x3fbd4e;
    }
    try {
      let _0x5c2b69 = _0x20833c(_0x1fde05());
      let _0x11eed7 = _0xd8a097(_0x3fbd4e);
      let _0x509fcd = _0xd8a097(_0x5c2b69);
      if (_0x55ec1d(_0x11eed7, _0x509fcd)) {
        return _0x395207(_0x3fbd4e, _0x5c2b69);
      } else {
        _0x22e9f5("[canonical] " + _0x57a125 + " fallback divergence " + _0x1590d1(_0x11eed7, _0x509fcd));
        return _0x3fbd4e;
      }
    } catch (_0x2caaf0) {
      _0x22e9f5("[canonical] " + _0x57a125 + " fallback " + (_0x2caaf0 && _0x2caaf0.message || String(_0x2caaf0)));
      return _0x3fbd4e;
    }
  }
  var _0x2a4e1 = class extends Error {};
  var _0xf77a37;
  function _0x105c9b() {
    if (_0xf77a37 !== undefined) {
      return _0xf77a37;
    }
    let _0x45b74c = _0x1fde05();
    if (!_0x45b74c) {
      _0xf77a37 = {
        ok: false,
        reason: "addon-not-loaded"
      };
      return _0xf77a37;
    }
    try {
      if (typeof _0x45b74c.buildInfo != "function" || typeof _0x45b74c.coreVersion != "function") {
        _0xf77a37 = {
          ok: false,
          reason: "addon missing buildInfo()/coreVersion()"
        };
        return _0xf77a37;
      }
      let _0x3f3aaa = JSON.parse(_0x45b74c.buildInfo());
      let _0x2aa7b0 = String(_0x45b74c.coreVersion() || "");
      if (_0x2aa7b0) {
        if (String(_0x3f3aaa.node_api) !== "8") {
          _0xf77a37 = {
            ok: false,
            reason: "node_api " + _0x3f3aaa.node_api + " != 8"
          };
        } else if (!_0x3f3aaa.git_commit || _0x3f3aaa.git_commit === "unknown") {
          _0xf77a37 = {
            ok: false,
            reason: "git_commit unknown"
          };
        } else if (!_0x3f3aaa.target_triple || _0x3f3aaa.target_triple === "unknown") {
          _0xf77a37 = {
            ok: false,
            reason: "target_triple unknown"
          };
        } else if (_0x1fe6ba() && _0x3f3aaa.profile !== "release") {
          _0xf77a37 = {
            ok: false,
            reason: "profile " + _0x3f3aaa.profile + " != release"
          };
        } else {
          _0xf77a37 = {
            ok: true,
            info: {
              ..._0x3f3aaa,
              coreVersion: _0x2aa7b0
            }
          };
        }
      } else {
        _0xf77a37 = {
          ok: false,
          reason: "empty coreVersion()"
        };
      }
    } catch (_0x3768e4) {
      _0xf77a37 = {
        ok: false,
        reason: "handshake error: " + (_0x3768e4 && _0x3768e4.message || String(_0x3768e4))
      };
    }
    return _0xf77a37;
  }
  function _0x38a0bb({
    algorithm: _0x42cdc3,
    method: _0x34170e,
    input: _0x3e15c2,
    validateOutput: _0x23fedd
  }) {
    if (!_0x43a26b(_0x42cdc3)) {
      throw new _0x2a4e1("native-required " + _0x42cdc3 + ": unknown algorithm (not in native-algorithms.json)");
    }
    let _0x52f05d = _0x4d4cb7(_0x42cdc3);
    if (_0x52f05d !== "native-required") {
      throw new _0x2a4e1("native-required " + _0x42cdc3 + ": policy is '" + _0x52f05d + "', not 'native-required'");
    }
    let _0x444d07 = _0x105c9b();
    if (!_0x444d07.ok) {
      throw new _0x2a4e1("native-required " + _0x42cdc3 + ": addon unavailable (" + _0x444d07.reason + ")");
    }
    let _0x45206b = _0x1fde05();
    if (typeof _0x45206b[_0x34170e] != "function") {
      throw new _0x2a4e1("native-required " + _0x42cdc3 + ": addon has no method '" + _0x34170e + "'");
    }
    let _0x1457e7 = _0x34170e.endsWith("Json");
    let _0x226eac;
    try {
      let _0x54bc3b = _0x1457e7 ? _0x45206b[_0x34170e](JSON.stringify(_0x3e15c2)) : _0x45206b[_0x34170e](_0x3e15c2);
      _0x226eac = _0x1457e7 ? JSON.parse(_0x54bc3b) : _0x54bc3b;
    } catch (_0x5caaea) {
      throw new _0x2a4e1("native-required " + _0x42cdc3 + ": rust error " + (_0x5caaea && _0x5caaea.message || String(_0x5caaea)));
    }
    if (typeof _0x23fedd == "function") {
      let _0x22af7b = _0x23fedd(_0x226eac);
      if (_0x22af7b) {
        throw new _0x2a4e1("native-required " + _0x42cdc3 + ": output failed validation (" + _0x22af7b + ")");
      }
    }
    return _0x226eac;
  }
  var _0x4ef1f1;
  var _0x426a23;
  function _0x57b9af() {
    if (_0x4ef1f1 !== undefined) {
      return _0x4ef1f1;
    }
    try {
      _0x4ef1f1 = JSON.parse(_0x30d63f.readFileSync(_0x403598.join(__dirname, "native-algorithms.json"), "utf8"));
    } catch {
      _0x4ef1f1 = {};
    }
    return _0x4ef1f1;
  }
  function _0x3bb0da() {
    return _0x426a23 || (_0x57b9af() || {}).algorithms || {};
  }
  function _0x43a26b(_0x56341a) {
    return Object.prototype.hasOwnProperty.call(_0x3bb0da(), _0x56341a);
  }
  function _0x4d4cb7(_0x160ed5) {
    return _0x3bb0da()[_0x160ed5] || "js";
  }
  function _0x46f136(_0xec3d89) {
    _0x426a23 = _0xec3d89 || undefined;
  }
  var _0x3977d3 = class extends Error {
    constructor(_0x104b64) {
      super(_0x104b64);
      this.name = "ExportGrantError";
      this.code = "EXPORT_GRANT_INVALID";
    }
  };
  function _0x5e454f() {
    let _0x92983e = _0x1fde05();
    if (!_0x92983e || typeof _0x92983e.machineFingerprint != "function") {
      return null;
    }
    try {
      return _0x92983e.machineFingerprint() || null;
    } catch {
      return null;
    }
  }
  function _0x206f2b(_0x143827) {
    let _0x243d3e = _0x105c9b();
    if (!_0x243d3e.ok) {
      throw new _0x3977d3("media digest: native addon unavailable (" + _0x243d3e.reason + ")");
    }
    let _0x2c6b0f = _0x1fde05();
    if (!_0x2c6b0f || typeof _0x2c6b0f.mediaDigestForPath != "function") {
      throw new _0x3977d3("media digest: addon has no mediaDigestForPath");
    }
    return _0x2c6b0f.mediaDigestForPath(String(_0x143827 || ""));
  }
  function _0x43fd34(_0x5093ff) {
    let _0x26e421 = _0x105c9b();
    if (!_0x26e421.ok) {
      throw new _0x3977d3("file lock: native addon unavailable (" + _0x26e421.reason + ")");
    }
    let _0x399947 = _0x1fde05();
    if (!_0x399947 || typeof _0x399947.holdFileForRead != "function") {
      throw new _0x3977d3("file lock: addon has no holdFileForRead");
    }
    return _0x399947.holdFileForRead(String(_0x5093ff || ""));
  }
  function _0x379e91({
    grant: _0x5dd833,
    request: _0x375909,
    nowUnix: _0x215bfa,
    machineId: _0x1bd4f1,
    licenseToken: _0xc2bbd8 = null
  }) {
    let _0x24a448 = _0x105c9b();
    if (!_0x24a448.ok) {
      throw new _0x3977d3("export grant: native addon unavailable (" + _0x24a448.reason + ")");
    }
    let _0x4f8b2b = _0x1fde05();
    if (!_0x4f8b2b || typeof _0x4f8b2b.verifyExportGrantJson != "function") {
      throw new _0x3977d3("export grant: addon has no verifyExportGrantJson");
    }
    let _0x1a3972;
    try {
      _0x1a3972 = _0x4f8b2b.verifyExportGrantJson(JSON.stringify({
        grant: _0x5dd833,
        request: _0x375909,
        nowUnix: _0x215bfa,
        machineId: _0x1bd4f1,
        licenseToken: _0xc2bbd8
      }));
    } catch (_0x2a83da) {
      throw new _0x3977d3("export grant: " + (_0x2a83da && _0x2a83da.message || String(_0x2a83da)));
    }
    try {
      return JSON.parse(_0x1a3972);
    } catch (_0x6c75b4) {
      throw new _0x3977d3("export grant: unreadable constraints (" + _0x6c75b4.message + ")");
    }
  }
  _0x456adf.exports = {
    loadAddon: _0x1fde05,
    emit: _0x22e9f5,
    verifyExportGrant: _0x379e91,
    mediaDigestForPath: _0x206f2b,
    holdFileForRead: _0x43fd34,
    machineFingerprint: _0x5e454f,
    ExportGrantError: _0x3977d3,
    shadowEnabled: _0x43de5d,
    rustMode: _0x5955a5,
    shadowCompare: _0x67e4cc,
    crossCheck: _0x4ea344,
    addonHandshake: _0x105c9b,
    executeNativeRequired: _0x38a0bb,
    NativeRequiredError: _0x2a4e1,
    readAlgorithmPolicy: _0x57b9af,
    algorithmPolicy: _0x4d4cb7,
    algorithmIsRegistered: _0x43a26b,
    setAlgorithmPolicyForTest: _0x46f136
  };
});
var gn = Z((_0x14d80c, _0x58a9de) => {
  var _0x3a03ff = je();
  var _0x9aed5b = 1.2;
  var _0x392dcf = 0.7;
  var _0x2e2f5e = 2.5;
  function _0x12322a(_0x4be64d, _0x3f3745) {
    let _0x130de5 = _0x3f3745 > 0 ? Math.round(_0x4be64d * _0x3f3745) / _0x3f3745 : _0x4be64d;
    return _0x3a03ff.shadowCompare("snapToFrame", _0x130de5, _0xd3317f => JSON.parse(_0xd3317f.snapToFrameJson(JSON.stringify({
      t: _0x4be64d,
      fps: _0x3f3745
    }))));
  }
  function _0x3fa898(_0x390222, _0x27152d, _0x440433, _0x2ecf3e = _0x392dcf) {
    let _0xcf1e50 = _0x3a29b6 => _0x3a03ff.shadowCompare("solveStretchScene", _0x3a29b6, _0x19850b => JSON.parse(_0x19850b.solveStretchSceneJson(JSON.stringify({
      A: _0x390222,
      V: _0x27152d,
      maxVoiceSpeed: _0x440433,
      minVideoSpeed: _0x2ecf3e
    }))));
    let _0xaa990e = _0x390222 / _0x27152d;
    if (_0xaa990e <= 1) {
      return _0xcf1e50({
        finalDuration: _0x27152d,
        videoSpeed: 1,
        audioTempo: 1,
        audioTrimSec: null
      });
    }
    if (_0xaa990e <= _0x440433) {
      return _0xcf1e50({
        finalDuration: _0x27152d,
        videoSpeed: 1,
        audioTempo: _0xaa990e,
        audioTrimSec: null
      });
    }
    let _0x2a76aa = _0x390222 / _0x440433;
    let _0xbc8414 = _0x27152d / _0x2a76aa;
    let _0x11d84d = _0x440433;
    let _0x509889 = null;
    if (_0xbc8414 < _0x2ecf3e) {
      _0xbc8414 = _0x2ecf3e;
      _0x2a76aa = _0x27152d / _0x2ecf3e;
      _0x11d84d = _0x390222 / _0x2a76aa;
      if (_0x11d84d > _0x2e2f5e) {
        _0x11d84d = _0x2e2f5e;
        _0x509889 = _0x2a76aa;
      }
    }
    return _0xcf1e50({
      finalDuration: _0x2a76aa,
      videoSpeed: _0xbc8414,
      audioTempo: _0x11d84d,
      audioTrimSec: _0x509889
    });
  }
  function _0x3e126c(_0x563458, _0x211b1a, _0x4ddf64 = 1, _0x2572fd = {}) {
    let _0x2807c0 = _0x2572fd.fitMode === "stretch_video" ? "stretch_video" : "speed_up_tts";
    let _0x220ef8 = _0x2572fd.maxVoiceSpeed ?? _0x9aed5b;
    let _0x244749 = _0x4ddf64 > 0 ? _0x4ddf64 : 1;
    let _0x48c586 = typeof _0x2572fd.fps == "number" && _0x2572fd.fps > 0 ? _0x2572fd.fps : 0;
    let _0xd3985f = _0x46256d => _0x3a03ff.shadowCompare("planTimeline", _0x46256d, _0x13f2ac => JSON.parse(_0x13f2ac.planTimelineJson(JSON.stringify({
      scenes: _0x563458,
      totalDuration: _0x211b1a,
      globalSpeed: _0x4ddf64,
      opts: _0x2572fd
    }))));
    let _0x2c8c07 = (_0x563458 || []).filter(_0x25dfb5 => _0x25dfb5 && typeof _0x25dfb5.startTime == "number" && typeof _0x25dfb5.endTime == "number" && _0x25dfb5.endTime > _0x25dfb5.startTime).map(_0x12f7a7 => ({
      ..._0x12f7a7,
      startTime: _0x12322a(_0x12f7a7.startTime, _0x48c586),
      endTime: _0x12322a(_0x12f7a7.endTime, _0x48c586)
    })).sort((_0x3429a0, _0x32c879) => _0x3429a0.startTime - _0x32c879.startTime);
    let _0x5f538e = _0x2c8c07.length ? _0x2c8c07[_0x2c8c07.length - 1].endTime : 0;
    let _0x168c6c = typeof _0x211b1a == "number" && _0x211b1a > _0x5f538e ? _0x211b1a : _0x5f538e;
    let _0x4c6175 = _0x12322a(_0x168c6c, _0x48c586);
    let _0x167463 = [];
    let _0x1c1e89 = 0;
    _0x2c8c07.forEach((_0x26d545, _0x55d25f) => {
      let _0x392917 = Math.max(_0x1c1e89, _0x26d545.startTime);
      if (_0x392917 - _0x1c1e89 > 0.000001) {
        _0x167463.push(_0x1891eb(_0x1c1e89, _0x392917, _0x244749));
      }
      let _0x3d8918 = typeof _0x26d545.audioDuration == "number" && _0x26d545.audioDuration > 0 ? _0x26d545.audioDuration : null;
      let _0x1c3734 = _0x26d545.endTime - _0x392917;
      if (_0x1c3734 <= 0.000001) {
        _0x1c1e89 = Math.max(_0x1c1e89, _0x26d545.endTime);
        return;
      }
      if (_0x3d8918 === null) {
        _0x167463.push(_0x1891eb(_0x392917, _0x26d545.endTime, _0x244749, _0x26d545.id));
      } else if (_0x2807c0 === "speed_up_tts") {
        let _0x41343c = _0x2c8c07.slice(_0x55d25f + 1).find(_0x465dc0 => typeof _0x465dc0.audioDuration == "number" && _0x465dc0.audioDuration > 0);
        let _0x1c24ad = _0x41343c ? _0x41343c.startTime - _0x26d545.startTime : _0x1c3734;
        let _0x3d0fa9 = _0x1c24ad > 0.000001 ? Math.max(1, _0x3d8918 / _0x1c24ad) : 1;
        let _0x4d0b7b = Math.min(_0x2e2f5e, _0x3d0fa9);
        _0x167463.push({
          type: "scene",
          id: _0x26d545.id,
          hasTts: true,
          origStart: _0x392917,
          origEnd: _0x26d545.endTime,
          originalDuration: _0x1c3734,
          audioDuration: _0x3d8918,
          finalDuration: _0x1c3734,
          videoSpeed: _0x244749,
          audioTempo: _0x4d0b7b,
          bedTempo: _0x244749,
          voicePlayedDuration: _0x3d8918 / _0x4d0b7b
        });
      } else {
        let {
          finalDuration: _0x56fb97,
          videoSpeed: _0x5261f9,
          audioTempo: _0x1b18b3,
          audioTrimSec: _0x51091c
        } = _0x3fa898(_0x3d8918, _0x1c3734, _0x220ef8, _0x2572fd.minVideoSpeed);
        _0x167463.push({
          type: "scene",
          id: _0x26d545.id,
          hasTts: true,
          origStart: _0x392917,
          origEnd: _0x26d545.endTime,
          originalDuration: _0x1c3734,
          audioDuration: _0x3d8918,
          finalDuration: _0x56fb97,
          videoSpeed: _0x5261f9,
          audioTempo: _0x1b18b3,
          audioTrimSec: _0x51091c ?? null,
          bedTempo: _0x5261f9,
          voicePlayedDuration: Math.min(_0x3d8918 / _0x1b18b3, _0x56fb97)
        });
      }
      _0x1c1e89 = Math.max(_0x1c1e89, _0x26d545.endTime);
    });
    if (_0x4c6175 - _0x1c1e89 > 0.000001) {
      _0x167463.push(_0x1891eb(_0x1c1e89, _0x4c6175, _0x244749));
    }
    if (_0x167463.length === 0) {
      return _0xd3985f({
        pieces: [],
        newTotalDuration: 0
      });
    }
    let _0x497c66 = 0;
    _0x167463.forEach(_0x137fd8 => {
      _0x137fd8.newStart = _0x497c66;
      _0x497c66 += _0x137fd8.finalDuration;
      _0x137fd8.newEnd = _0x497c66;
    });
    return _0xd3985f({
      pieces: _0x167463,
      newTotalDuration: _0x497c66
    });
  }
  function _0x1891eb(_0x14eb8a, _0x4740f1, _0x1f7c9b, _0x16e7b1) {
    let _0x70801a = _0x4740f1 - _0x14eb8a;
    return {
      type: "gap",
      id: _0x16e7b1 || null,
      hasTts: false,
      origStart: _0x14eb8a,
      origEnd: _0x4740f1,
      originalDuration: _0x70801a,
      audioDuration: null,
      finalDuration: _0x70801a / _0x1f7c9b,
      videoSpeed: _0x1f7c9b,
      audioTempo: _0x1f7c9b,
      bedTempo: _0x1f7c9b
    };
  }
  function _0x4b3cc4(_0x6a9ed7, _0x5dd5ac) {
    let _0x404cb5 = _0x5ae342 => _0x3a03ff.shadowCompare("mapOriginalToNew", _0x5ae342, _0x5a4302 => JSON.parse(_0x5a4302.mapOriginalToNewJson(JSON.stringify({
      pieces: _0x6a9ed7,
      t: _0x5dd5ac
    }))));
    if (!_0x6a9ed7.length) {
      return _0x404cb5(_0x5dd5ac);
    }
    let _0x5173b4 = 0;
    let _0x2d729d = _0x6a9ed7.length - 1;
    let _0x4715d2 = -1;
    while (_0x5173b4 <= _0x2d729d) {
      let _0x4fa9e1 = _0x5173b4 + _0x2d729d >> 1;
      if (_0x5dd5ac < _0x6a9ed7[_0x4fa9e1].origStart - 0.000001) {
        _0x2d729d = _0x4fa9e1 - 1;
      } else if (_0x5dd5ac > _0x6a9ed7[_0x4fa9e1].origEnd + 0.000001) {
        _0x5173b4 = _0x4fa9e1 + 1;
      } else {
        _0x4715d2 = _0x4fa9e1;
        break;
      }
    }
    if (_0x4715d2 >= 0) {
      while (_0x4715d2 > 0 && _0x5dd5ac <= _0x6a9ed7[_0x4715d2 - 1].origEnd + 0.000001) {
        _0x4715d2--;
      }
      let _0x4c78ea = _0x6a9ed7[_0x4715d2];
      let _0x10a355 = _0x4c78ea.originalDuration > 1e-9 ? (_0x5dd5ac - _0x4c78ea.origStart) / _0x4c78ea.originalDuration : 0;
      return _0x404cb5(_0x4c78ea.newStart + _0x10a355 * _0x4c78ea.finalDuration);
    }
    let _0x5b1995 = _0x6a9ed7[_0x6a9ed7.length - 1];
    if (_0x5dd5ac > _0x5b1995.origEnd) {
      return _0x404cb5(_0x5b1995.newEnd + (_0x5dd5ac - _0x5b1995.origEnd) / _0x5b1995.videoSpeed);
    } else {
      return _0x404cb5(_0x6a9ed7[0].newStart);
    }
  }
  _0x58a9de.exports = {
    planTimeline: _0x3e126c,
    mapOriginalToNew: _0x4b3cc4,
    solveStretchScene: _0x3fa898,
    snapToFrame: _0x12322a,
    MAX_VOICE_SPEED: _0x9aed5b,
    MIN_VIDEO_SPEED: _0x392dcf,
    TTS_TEMPO_MAX_HARD: _0x2e2f5e
  };
});
var ht = Z((_0x31616c, _0x1da1c7) => {
  var _0x50c4f0 = je();
  var _0x48c867 = Object.freeze({
    borrowSideMaxSec: 0.6,
    borrowSideMaxFrac: 0.5,
    borrowTotalMaxSec: 1,
    borrowTotalMaxFrac: 0.8,
    safetyGapSec: 0.08,
    minVideoSpeed: 0.4,
    maxVideoSpeed: 1,
    clusterMaxGapSec: 0.5,
    clusterMergeSpeedEps: 0.05,
    residualTempoCap: 1.06
  });
  var _0x20dcb9 = 0.000001;
  function _0x3f1cb9(_0x447533, _0x162722, _0x23a85b) {
    return Math.max(_0x162722, Math.min(_0x23a85b, _0x447533));
  }
  function _0x4e068a(_0x2f0212, _0xee3d3, _0x74e7dd = {}) {
    let _0x3bf103 = {
      ..._0x48c867,
      ...(_0x74e7dd.policy || {})
    };
    let _0x5db9a5 = _0x74e7dd.globalVoiceRate > 0 ? _0x74e7dd.globalVoiceRate : 1;
    let _0x5608a3 = typeof _0xee3d3 == "number" && _0xee3d3 > 0 ? _0xee3d3 : Number.POSITIVE_INFINITY;
    let _0x19b50f = (_0x2f0212 || []).filter(_0x3289d0 => _0x3289d0 && typeof _0x3289d0.startTime == "number" && typeof _0x3289d0.endTime == "number" && _0x3289d0.endTime > _0x3289d0.startTime && typeof _0x3289d0.audioDuration == "number" && _0x3289d0.audioDuration > 0).slice().sort((_0x58a91a, _0x7fe0d2) => _0x58a91a.startTime - _0x7fe0d2.startTime).map(_0x2b9bcf => {
      let _0x5c887d = _0x2b9bcf.endTime - _0x2b9bcf.startTime;
      let _0x5e1d58 = _0x2b9bcf.audioDuration;
      return {
        unitId: _0x2b9bcf.unitId,
        sceneIndex: _0x2b9bcf.sceneIndex ?? 0,
        speakerId: _0x2b9bcf.speakerId || null,
        origStart: _0x2b9bcf.startTime,
        origEnd: _0x2b9bcf.endTime,
        windowSec: _0x5c887d,
        speech: _0x5e1d58,
        deficit: Math.max(0, _0x5e1d58 - _0x5c887d),
        borrowLeftSec: 0,
        borrowRightSec: 0
      };
    });
    let _0x547d96 = _0x265f89 => Math.min(_0x3bf103.borrowSideMaxSec, _0x3bf103.borrowSideMaxFrac * _0x265f89.windowSec);
    let _0x373674 = _0x1f525e => Math.min(_0x3bf103.borrowTotalMaxSec, _0x3bf103.borrowTotalMaxFrac * _0x1f525e.windowSec);
    let _0x12de65 = _0x317858 => Math.max(0, _0x373674(_0x317858) - _0x317858.borrowLeftSec - _0x317858.borrowRightSec);
    for (let _0x536ef7 = 0; _0x536ef7 <= _0x19b50f.length; _0x536ef7++) {
      let _0x3dd55b = _0x536ef7 > 0 ? _0x19b50f[_0x536ef7 - 1] : null;
      let _0x5396eb = _0x536ef7 < _0x19b50f.length ? _0x19b50f[_0x536ef7] : null;
      let _0x33d846 = _0x3dd55b ? _0x3dd55b.origEnd : 0;
      let _0x5f3649 = _0x5396eb ? _0x5396eb.origStart : _0x5608a3;
      if (!Number.isFinite(_0x5f3649) && !_0x5396eb) {
        continue;
      }
      let _0x236a62 = _0x5f3649 - _0x33d846;
      if (_0x236a62 <= _0x20dcb9 || _0x3dd55b && _0x5396eb && (_0x3dd55b.sceneIndex !== _0x5396eb.sceneIndex || (_0x236a62 -= _0x3bf103.safetyGapSec, _0x236a62 <= _0x20dcb9))) {
        continue;
      }
      let _0x121ca8 = _0x3dd55b ? Math.min(_0x3dd55b.deficit, _0x547d96(_0x3dd55b), _0x12de65(_0x3dd55b)) : 0;
      let _0x450a6f = _0x5396eb ? Math.min(_0x5396eb.deficit, _0x547d96(_0x5396eb), _0x12de65(_0x5396eb)) : 0;
      if (_0x121ca8 + _0x450a6f <= _0x20dcb9) {
        continue;
      }
      let _0x4136c4 = 0;
      let _0xe78bba = 0;
      if (_0x121ca8 + _0x450a6f <= _0x236a62) {
        _0x4136c4 = _0x121ca8;
        _0xe78bba = _0x450a6f;
      } else {
        _0x4136c4 = _0x236a62 * _0x121ca8 / (_0x121ca8 + _0x450a6f);
        _0xe78bba = _0x236a62 - _0x4136c4;
        _0x4136c4 = Math.min(_0x4136c4, _0x121ca8);
        _0xe78bba = Math.min(_0x236a62 - _0x4136c4, _0x450a6f);
        _0x4136c4 = Math.min(_0x236a62 - _0xe78bba, _0x121ca8);
      }
      if (_0x3dd55b && _0x4136c4 > _0x20dcb9) {
        _0x3dd55b.borrowRightSec += _0x4136c4;
        _0x3dd55b.deficit = Math.max(0, _0x3dd55b.deficit - _0x4136c4);
      }
      if (_0x5396eb && _0xe78bba > _0x20dcb9) {
        _0x5396eb.borrowLeftSec += _0xe78bba;
        _0x5396eb.deficit = Math.max(0, _0x5396eb.deficit - _0xe78bba);
      }
    }
    _0x19b50f.forEach(_0x5e259f => {
      _0x5e259f.plannedStart = _0x5e259f.origStart - _0x5e259f.borrowLeftSec;
      _0x5e259f.plannedEnd = _0x5e259f.origEnd + _0x5e259f.borrowRightSec;
      _0x5e259f.plannedWindow = _0x5e259f.plannedEnd - _0x5e259f.plannedStart;
    });
    for (let _0x5dbf0c of _0x19b50f) {
      let _0x26b9ba = _0x5dbf0c.speech > _0x20dcb9 ? _0x5dbf0c.speech / _0x5dbf0c.plannedWindow : 1;
      _0x5dbf0c.audioTempo = _0x3f1cb9(Math.max(1, _0x26b9ba), 1, _0x3bf103.residualTempoCap);
      _0x5dbf0c.effSpeech = _0x5dbf0c.speech / _0x5dbf0c.audioTempo;
    }
    let _0x43f7ca = _0x19b50f.filter(_0x1040dc => _0x1040dc.effSpeech > _0x1040dc.plannedWindow + _0x20dcb9).map(_0x143035 => ({
      sceneIndex: _0x143035.sceneIndex,
      units: [_0x143035]
    }));
    let _0xa8db02 = [];
    _0x43f7ca.forEach((_0x4aeb42, _0x21669c) => {
      _0x4aeb42.id = "cluster_" + (_0x21669c + 1);
      let _0x217591 = 1;
      for (let _0x35511d of _0x4aeb42.units) {
        let _0x168590 = _0x35511d.effSpeech > _0x20dcb9 ? _0x35511d.plannedWindow / _0x35511d.effSpeech : 1;
        _0x217591 = Math.min(_0x217591, _0x168590);
      }
      _0x4aeb42.videoSpeed = _0x3f1cb9(_0x217591, _0x3bf103.minVideoSpeed, _0x3bf103.maxVideoSpeed);
      for (let _0x4c9a6f of _0x4aeb42.units) {
        _0x4c9a6f.clusterId = _0x4aeb42.id;
        _0x4c9a6f.videoSpeed = _0x4aeb42.videoSpeed;
        let _0x4eea2e = _0x4c9a6f.plannedWindow / _0x4aeb42.videoSpeed;
        if (_0x4c9a6f.effSpeech > _0x4eea2e + 0.001) {
          _0x4c9a6f.status = "timing_infeasible";
          _0xa8db02.push(_0x4c9a6f.unitId);
        } else {
          _0x4c9a6f.status = "slowed";
        }
      }
      _0x4aeb42.sourceStart = Math.min(..._0x4aeb42.units.map(_0x6c2ccd => _0x6c2ccd.plannedStart));
      _0x4aeb42.sourceEnd = Math.max(..._0x4aeb42.units.map(_0x2c2a65 => _0x2c2a65.plannedEnd));
    });
    for (let _0x444750 of _0x19b50f) {
      if (_0x444750.clusterId) {
        continue;
      }
      let _0x5414e0 = _0x43f7ca.find(_0x4c4342 => _0x444750.plannedStart < _0x4c4342.sourceEnd - _0x20dcb9 && _0x444750.plannedEnd > _0x4c4342.sourceStart + _0x20dcb9);
      _0x444750.videoSpeed = _0x5414e0 ? _0x5414e0.videoSpeed : 1;
      if (_0x5414e0) {
        _0x444750.clusterId = _0x5414e0.id;
      }
      _0x444750.status = _0x444750.borrowLeftSec > _0x20dcb9 || _0x444750.borrowRightSec > _0x20dcb9 ? "borrowed" : "fits";
    }
    let _0x5465c7 = [];
    for (let _0x1c91d1 of _0x43f7ca) {
      let _0x1fecaa = _0x5465c7[_0x5465c7.length - 1];
      if (_0x1fecaa && _0x1fecaa.sceneIndex === _0x1c91d1.sceneIndex && _0x1c91d1.sourceStart - _0x1fecaa.sourceEnd <= _0x3bf103.clusterMaxGapSec + _0x20dcb9 && Math.abs(_0x1fecaa.videoSpeed - _0x1c91d1.videoSpeed) <= _0x3bf103.clusterMergeSpeedEps && (_0x1fecaa.videoSpeed < 1 - _0x20dcb9 || _0x1c91d1.videoSpeed < 1 - _0x20dcb9)) {
        _0x1fecaa.videoSpeed = Math.min(_0x1fecaa.videoSpeed, _0x1c91d1.videoSpeed);
        _0x1fecaa.sourceEnd = _0x1c91d1.sourceEnd;
        _0x1fecaa.units.push(..._0x1c91d1.units);
        for (let _0x4879c9 of _0x1fecaa.units) {
          _0x4879c9.clusterId = _0x1fecaa.id;
          _0x4879c9.videoSpeed = _0x1fecaa.videoSpeed;
        }
      } else {
        _0x5465c7.push(_0x1c91d1);
      }
    }
    let _0x2d7cf3 = Number.isFinite(_0x5608a3) ? Math.max(_0x5608a3, _0x19b50f.length ? _0x19b50f[_0x19b50f.length - 1].plannedEnd : 0) : _0x19b50f.length ? _0x19b50f[_0x19b50f.length - 1].plannedEnd : 0;
    let _0x37cde1 = 0;
    let _0x4df6ce = 0;
    let _0x1d3028 = [];
    for (let _0x4ab39b of _0x5465c7) {
      let _0x25a760 = _0x4ab39b.sourceStart - _0x37cde1;
      if (_0x25a760 > _0x20dcb9) {
        _0x4df6ce += _0x25a760;
      }
      let _0x1e721c = _0x4ab39b.sourceEnd - _0x4ab39b.sourceStart;
      _0x4ab39b.outputStart = _0x4df6ce;
      _0x4ab39b.outputEnd = _0x4df6ce + _0x1e721c / _0x4ab39b.videoSpeed;
      _0x4df6ce = _0x4ab39b.outputEnd;
      _0x37cde1 = _0x4ab39b.sourceEnd;
      _0x1d3028.push({
        id: _0x4ab39b.id,
        sourceStart: _0x556116(_0x4ab39b.sourceStart),
        sourceEnd: _0x556116(_0x4ab39b.sourceEnd),
        videoSpeed: _0xab7072(_0x4ab39b.videoSpeed),
        outputStart: _0x556116(_0x4ab39b.outputStart),
        outputEnd: _0x556116(_0x4ab39b.outputEnd)
      });
    }
    let _0x4da566 = {
      version: 1,
      globalVoiceRate: _0x5db9a5,
      policy: _0x3bf103,
      units: _0x19b50f.map(_0x63c435 => ({
        unitId: _0x63c435.unitId,
        audioDuration: _0x556116(_0x63c435.speech),
        audioTempo: _0x30d475(_0x63c435.audioTempo ?? 1),
        borrowLeftSec: _0x556116(_0x63c435.borrowLeftSec),
        borrowRightSec: _0x556116(_0x63c435.borrowRightSec),
        plannedStart: _0x556116(_0x63c435.plannedStart),
        plannedEnd: _0x556116(_0x63c435.plannedEnd),
        clusterId: _0x63c435.clusterId || null,
        videoSpeed: _0xab7072(_0x63c435.videoSpeed ?? 1),
        status: _0x63c435.status || "fits"
      })),
      clusters: _0x1d3028,
      feasible: _0xa8db02.length === 0,
      infeasibleUnitIds: _0xa8db02
    };
    return _0x50c4f0.shadowCompare("buildDubbingPlan", _0x4da566, _0x4bff5c => JSON.parse(_0x4bff5c.buildDubbingPlanJson(JSON.stringify({
      units: _0x2f0212,
      totalDuration: _0xee3d3,
      opts: _0x74e7dd
    }))));
  }
  function _0x556116(_0x62b83b) {
    return Math.round(_0x62b83b * 1000) / 1000;
  }
  function _0xab7072(_0x53dbd3) {
    return Math.floor(_0x53dbd3 * 1000 + 1e-9) / 1000;
  }
  function _0x30d475(_0x1f0e00) {
    return Math.ceil(_0x1f0e00 * 1000 - 1e-9) / 1000;
  }
  function _0x1bc326(_0x4a72bb, _0x300feb, _0x4deeeb = {}) {
    let _0x5e8bcd = typeof _0x4deeeb.fps == "number" && _0x4deeeb.fps > 0 ? _0x4deeeb.fps : 0;
    let _0x241c6a = _0x258732 => _0x5e8bcd > 0 ? Math.round(_0x258732 * _0x5e8bcd) / _0x5e8bcd : _0x258732;
    let _0x4cd4fe = typeof _0x300feb == "number" && _0x300feb > 0 ? _0x300feb : _0x4a72bb.clusters.length ? _0x4a72bb.clusters[_0x4a72bb.clusters.length - 1].sourceEnd : 0;
    let _0x2827c9 = _0x241c6a(_0x4cd4fe);
    let _0x1ec2e8 = [];
    let _0xc998c8 = 0;
    let _0x5342e5 = (_0xdabea8, _0x3d4dea, _0x2e99c0, _0x5b3e52) => {
      if (!(_0x3d4dea - _0xdabea8 <= _0x20dcb9)) {
        _0x1ec2e8.push({
          type: _0x2e99c0 === 1 ? "gap" : "zone",
          id: _0x5b3e52 || null,
          origStart: _0xdabea8,
          origEnd: _0x3d4dea,
          originalDuration: _0x3d4dea - _0xdabea8,
          videoSpeed: _0x2e99c0,
          bedTempo: _0x2e99c0,
          audioTempo: 1,
          finalDuration: (_0x3d4dea - _0xdabea8) / _0x2e99c0
        });
      }
    };
    for (let _0x15b398 of _0x4a72bb.clusters || []) {
      let _0x453b79 = _0x241c6a(_0x15b398.sourceStart);
      let _0x531816 = Math.min(_0x241c6a(_0x15b398.sourceEnd), _0x2827c9);
      _0x5342e5(_0xc998c8, Math.min(_0x453b79, _0x2827c9), 1);
      _0x5342e5(Math.max(_0xc998c8, _0x453b79), _0x531816, _0x15b398.videoSpeed, _0x15b398.id);
      _0xc998c8 = Math.max(_0xc998c8, _0x531816);
      if (_0xc998c8 >= _0x2827c9 - _0x20dcb9) {
        break;
      }
    }
    _0x5342e5(_0xc998c8, _0x2827c9, 1);
    let _0x542c24 = 0;
    for (let _0x12db45 of _0x1ec2e8) {
      _0x12db45.newStart = _0x542c24;
      _0x542c24 += _0x12db45.finalDuration;
      _0x12db45.newEnd = _0x542c24;
    }
    let _0x41e164 = {
      pieces: _0x1ec2e8,
      newTotalDuration: _0x542c24
    };
    return _0x50c4f0.shadowCompare("planToTimelinePieces", _0x41e164, _0x4d692b => JSON.parse(_0x4d692b.planToTimelinePiecesJson(JSON.stringify({
      plan: _0x4a72bb,
      totalDuration: _0x300feb,
      opts: _0x4deeeb
    }))));
  }
  function _0x4ce75b(_0x2ef157, _0x3679c2) {
    let _0x1b5f34 = (() => {
      if (!_0x2ef157 || !_0x2ef157.length) {
        return _0x3679c2;
      }
      for (let _0x549a29 of _0x2ef157) {
        if (_0x3679c2 <= _0x549a29.origEnd + _0x20dcb9) {
          if (_0x3679c2 < _0x549a29.origStart - _0x20dcb9) {
            return _0x549a29.newStart;
          }
          let _0x21a383 = _0x549a29.originalDuration > _0x20dcb9 ? (_0x3679c2 - _0x549a29.origStart) / _0x549a29.originalDuration : 0;
          return _0x549a29.newStart + Math.max(0, Math.min(1, _0x21a383)) * _0x549a29.finalDuration;
        }
      }
      let _0x2b0db6 = _0x2ef157[_0x2ef157.length - 1];
      return _0x2b0db6.newEnd + (_0x3679c2 - _0x2b0db6.origEnd);
    })();
    return _0x50c4f0.shadowCompare("mapPlanTime", _0x1b5f34, _0x43d108 => JSON.parse(_0x43d108.mapPlanTimeJson(JSON.stringify({
      pieces: _0x2ef157,
      t: _0x3679c2
    }))));
  }
  function _0x2f57f8(_0x29a705, _0x2dace3) {
    let _0x4f177a = Number(_0x2dace3);
    if (!Number.isFinite(_0x4f177a) || _0x4f177a <= 0 || Math.abs(_0x4f177a - 1) <= 0.001) {
      return _0x29a705;
    } else {
      return {
        pieces: (_0x29a705.pieces || []).map(_0x1de62f => ({
          ..._0x1de62f,
          videoSpeed: _0x1de62f.videoSpeed * _0x4f177a,
          bedTempo: _0x1de62f.bedTempo * _0x4f177a,
          finalDuration: _0x1de62f.finalDuration / _0x4f177a,
          newStart: _0x1de62f.newStart / _0x4f177a,
          newEnd: _0x1de62f.newEnd / _0x4f177a
        })),
        newTotalDuration: _0x29a705.newTotalDuration / _0x4f177a
      };
    }
  }
  _0x1da1c7.exports = {
    DEFAULT_POLICY: _0x48c867,
    buildDubbingPlan: _0x4e068a,
    planToTimelinePieces: _0x1bc326,
    applyGlobalSpeedToPieces: _0x2f57f8,
    mapPlanTime: _0x4ce75b
  };
});
var Hi = Z((_0x27e4e9, _0x417cb6) => {
  _0x417cb6.exports = {
    version: 1,
    presets: [{
      id: "vivid",
      label: "Rực rỡ",
      sub: "Đậm màu, nét căng",
      swatch: ["#ff8a00", "#e52e71"],
      bright: 1,
      contrast: 1.12,
      sat: 1.45,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: null
    }, {
      id: "warm",
      label: "Ấm áp",
      sub: "Tông cam ấm",
      swatch: ["#ffb347", "#ff7847"],
      bright: 1.02,
      contrast: 1,
      sat: 1.08,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#ff9a3c",
        alpha: 0.12
      }
    }, {
      id: "cool",
      label: "Mát lạnh",
      sub: "Tông xanh mát",
      swatch: ["#67b7ff", "#3d5afe"],
      bright: 1,
      contrast: 1,
      sat: 1.05,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#3ca0ff",
        alpha: 0.12
      }
    }, {
      id: "cinematic",
      label: "Điện ảnh",
      sub: "Teal & orange điện ảnh",
      swatch: ["#0f4c5c", "#e36414"],
      bright: 0.98,
      contrast: 1.18,
      sat: 0.92,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#0e3a4a",
        alpha: 0.1
      }
    }, {
      id: "vintage",
      label: "Cổ điển",
      sub: "Hoài cổ, ngả vàng",
      swatch: ["#d4a373", "#6b4f3a"],
      bright: 1.04,
      contrast: 0.92,
      sat: 0.85,
      gamma: 1,
      sepia: 0.45,
      hue: 0,
      tint: null
    }, {
      id: "retro",
      label: "Retro",
      sub: "Phim cũ 80s",
      swatch: ["#f7c873", "#c46f4d"],
      bright: 1,
      contrast: 1.05,
      sat: 1.1,
      gamma: 1,
      sepia: 0.3,
      hue: 10,
      tint: {
        color: "#ffd27f",
        alpha: 0.08
      }
    }, {
      id: "bw",
      label: "Đen trắng",
      sub: "Trắng đen cơ bản",
      swatch: ["#e8e8e8", "#3a3a3a"],
      bright: 1,
      contrast: 1.08,
      sat: 0,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: null
    }, {
      id: "noir",
      label: "Noir",
      sub: "Trắng đen tương phản cao",
      swatch: ["#9a9a9a", "#111111"],
      bright: 0.95,
      contrast: 1.3,
      sat: 0,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: null
    }, {
      id: "sepia",
      label: "Sepia",
      sub: "Nâu đỏ cổ điển",
      swatch: ["#c9a36a", "#7a5a34"],
      bright: 1.02,
      contrast: 1,
      sat: 1,
      gamma: 1,
      sepia: 0.8,
      hue: 0,
      tint: null
    }, {
      id: "faded",
      label: "Phai màu",
      sub: "Màu phai, mờ nhẹ",
      swatch: ["#c7c3bb", "#8f8c85"],
      bright: 1.06,
      contrast: 0.85,
      sat: 0.8,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#d8d8d8",
        alpha: 0.07
      }
    }, {
      id: "pastel",
      label: "Pastel",
      sub: "Nhẹ nhàng, tươi sáng",
      swatch: ["#ffd6e7", "#c5e3ff"],
      bright: 1.08,
      contrast: 0.95,
      sat: 0.75,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#ffd6e7",
        alpha: 0.06
      }
    }, {
      id: "dramatic",
      label: "Kịch tính",
      sub: "Tương phản mạnh",
      swatch: ["#e0e0e0", "#101018"],
      bright: 0.97,
      contrast: 1.35,
      sat: 0.95,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: null
    }, {
      id: "sunset",
      label: "Hoàng hôn",
      sub: "Cam hồng hoàng hôn",
      swatch: ["#ff9e5e", "#ff5e3a"],
      bright: 1,
      contrast: 1,
      sat: 1.15,
      gamma: 1,
      sepia: 0,
      hue: -6,
      tint: {
        color: "#ff5e3a",
        alpha: 0.14
      }
    }, {
      id: "moody",
      label: "Trầm tối",
      sub: "Tối trầm, u ám",
      swatch: ["#39415c", "#151a2c"],
      bright: 0.92,
      contrast: 1.1,
      sat: 0.8,
      gamma: 1,
      sepia: 0,
      hue: 0,
      tint: {
        color: "#1f2a44",
        alpha: 0.12
      }
    }, {
      id: "emerald",
      label: "Xanh rêu",
      sub: "Phủ xanh rêu",
      swatch: ["#57c785", "#1d5c40"],
      bright: 1,
      contrast: 1,
      sat: 1.05,
      gamma: 1,
      sepia: 0,
      hue: 8,
      tint: {
        color: "#2fa66a",
        alpha: 0.1
      }
    }, {
      id: "cyberpunk",
      label: "Cyberpunk",
      sub: "Neon tím hồng",
      swatch: ["#ff2fd6", "#2fd6ff"],
      bright: 1,
      contrast: 1.15,
      sat: 1.3,
      gamma: 1,
      sepia: 0,
      hue: -12,
      tint: {
        color: "#b23cff",
        alpha: 0.1
      }
    }]
  };
});
var Yi = Z((_0x539dc0, _0x44590e) => {
  var _0x2cfd96 = Hi().presets;
  var _0x25d701 = new Map(_0x2cfd96.map(_0x581ca4 => [_0x581ca4.id, _0x581ca4]));
  function _0x22878f(_0xb67c8e) {
    return String(Number(_0xb67c8e.toFixed(4)));
  }
  function _0x54f47c(_0xdfc3c8) {
    let _0x5ef78a = Number(_0xdfc3c8 ?? 1);
    if (Number.isFinite(_0x5ef78a)) {
      return Math.min(1, Math.max(0, _0x5ef78a));
    } else {
      return 1;
    }
  }
  function _0x2631df(_0x4c20d7, _0x210a42, _0x506c1e) {
    return _0x210a42 + (_0x4c20d7 - _0x210a42) * _0x506c1e;
  }
  function _0x1f0547(_0x410685, _0x20d591, _0x34c5a0) {
    let _0x4456e3 = Number.parseInt(_0x410685.slice(0, 2), 16) / 255;
    let _0x3e16a4 = Number.parseInt(_0x410685.slice(2, 4), 16) / 255;
    let _0x86fe9 = Number.parseInt(_0x410685.slice(4, 6), 16) / 255;
    let _0x5ae385 = (_0x34c5a0 || 1080) >= 720 || (_0x20d591 || 1920) >= 1280;
    let [_0x2ee894, _0x175030] = _0x5ae385 ? [0.2126, 0.0722] : [0.299, 0.114];
    let _0x210aea = _0x2ee894 * _0x4456e3 + (1 - _0x2ee894 - _0x175030) * _0x3e16a4 + _0x175030 * _0x86fe9;
    return {
      y: 16 + _0x210aea * 219,
      u: 128 + (_0x86fe9 - _0x210aea) * 112 / (1 - _0x175030),
      v: 128 + (_0x4456e3 - _0x210aea) * 112 / (1 - _0x2ee894)
    };
  }
  function _0x187459(_0x5b881e, _0xef6af8, _0x1dba19, _0x352871, _0x3bdabb) {
    let _0x54d516 = _0x25d701.get(_0x5b881e);
    if (!_0x54d516) {
      return null;
    }
    let _0x36c5d4 = _0x54f47c(_0xef6af8);
    if (_0x36c5d4 <= 0) {
      return null;
    }
    let _0x2c069c = _0x1dba19 ? ":enable='" + _0x1dba19 + "'" : "";
    let _0xa11501 = [];
    let _0x373013 = (_0x54d516.sepia || 0) * _0x36c5d4;
    if (_0x373013 > 0.001) {
      let _0x45e8b8 = (_0x172634, _0x3c27b9) => _0x22878f(_0x2631df(_0x172634, _0x3c27b9, _0x373013));
      _0xa11501.push("colorchannelmixer=rr=" + _0x45e8b8(0.393, 1) + ":rg=" + _0x45e8b8(0.769, 0) + ":rb=" + _0x45e8b8(0.189, 0) + ":gr=" + _0x45e8b8(0.349, 0) + ":gg=" + _0x45e8b8(0.686, 1) + ":gb=" + _0x45e8b8(0.168, 0) + ":br=" + _0x45e8b8(0.272, 0) + ":bg=" + _0x45e8b8(0.534, 0) + ":bb=" + _0x45e8b8(0.131, 1) + _0x2c069c);
    }
    let _0x4b2d5c = (_0x54d516.hue || 0) * _0x36c5d4;
    if (Math.abs(_0x4b2d5c) > 0.05) {
      _0xa11501.push("hue=h=" + _0x22878f(_0x4b2d5c) + _0x2c069c);
    }
    let _0x9fd549 = _0x2631df(_0x54d516.contrast !== undefined ? _0x54d516.contrast : 1, 1, _0x36c5d4);
    let _0x17b4d3 = Math.max(0, _0x2631df(_0x54d516.sat !== undefined ? _0x54d516.sat : 1, 1, _0x36c5d4));
    let _0x365740 = _0x2631df(_0x54d516.gamma !== undefined ? _0x54d516.gamma : 1, 1, _0x36c5d4);
    let _0x5a4145 = ((_0x54d516.bright !== undefined ? _0x54d516.bright : 1) - 1) * 0.5 * _0x36c5d4;
    let _0x2f06ad = [];
    if (Math.abs(_0x9fd549 - 1) > 0.001) {
      _0x2f06ad.push("contrast=" + _0x22878f(_0x9fd549));
    }
    if (Math.abs(_0x17b4d3 - 1) > 0.001) {
      _0x2f06ad.push("saturation=" + _0x22878f(_0x17b4d3));
    }
    if (Math.abs(_0x365740 - 1) > 0.001) {
      _0x2f06ad.push("gamma=" + _0x22878f(_0x365740));
    }
    if (Math.abs(_0x5a4145) > 0.001) {
      _0x2f06ad.push("brightness=" + _0x22878f(_0x5a4145));
    }
    if (_0x2f06ad.length) {
      _0xa11501.push("eq=" + _0x2f06ad.join(":") + _0x2c069c);
    }
    if (_0x54d516.tint && _0x54d516.tint.color) {
      let _0x897150 = Math.min(1, Math.max(0, (_0x54d516.tint.alpha || 0) * _0x36c5d4));
      if (_0x897150 > 0.003) {
        let _0x270912 = String(_0x54d516.tint.color).replace("#", "").slice(0, 6);
        let _0xf72c86 = _0x1f0547(_0x270912, _0x352871, _0x3bdabb);
        let _0x1b4327 = _0x22878f(1 - _0x897150);
        _0xa11501.push("lutyuv=y='val*" + _0x1b4327 + "+" + _0x22878f(_0xf72c86.y * _0x897150) + "':u='val*" + _0x1b4327 + "+" + _0x22878f(_0xf72c86.u * _0x897150) + "':v='val*" + _0x1b4327 + "+" + _0x22878f(_0xf72c86.v * _0x897150) + "'" + _0x2c069c);
      }
    }
    if (_0xa11501.length) {
      return _0xa11501.join(",");
    } else {
      return null;
    }
  }
  _0x44590e.exports = {
    buildColorFilterChain: _0x187459,
    COLOR_FILTER_PRESETS: _0x2cfd96
  };
});
var Nn = Z((_0x384c25, _0x38ef61) => {
  function _0x2eab29(_0x276603) {
    let _0x512db8 = typeof _0x276603 == "number" ? _0x276603 : Number.parseFloat(_0x276603);
    if (Number.isFinite(_0x512db8) && _0x512db8 > 0) {
      return _0x512db8;
    } else {
      return 0;
    }
  }
  function _0x142d63(_0x158fc6) {
    let _0xea033c = Math.round(_0x2eab29(_0x158fc6) / 2) * 2;
    return Math.max(2, Math.min(16384, _0xea033c));
  }
  function _0x406950(_0x2301ce, _0x470b1c, _0x1cede9) {
    let _0x2115f0 = _0x2eab29(_0x470b1c);
    let _0x1ecd4d = _0x2eab29(_0x1cede9);
    let _0x939c30 = _0x2115f0 && _0x1ecd4d ? _0x2115f0 / _0x1ecd4d : 16 / 9;
    let _0x454e94 = String(_0x2301ce ?? "").trim();
    if (!_0x454e94 || _0x454e94 === "original") {
      return _0x939c30;
    }
    let _0x413832 = _0x454e94.match(/^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)$/);
    if (!_0x413832) {
      return _0x939c30;
    }
    let _0x47c9e0 = Number.parseFloat(_0x413832[1]);
    let _0x3919a5 = Number.parseFloat(_0x413832[2]);
    if (_0x47c9e0 > 0 && _0x3919a5 > 0) {
      return _0x47c9e0 / _0x3919a5;
    } else {
      return _0x939c30;
    }
  }
  function _0x392b4a(_0x2446ac, _0x3195fe) {
    let _0x1fa20e = Math.max(2, _0x2eab29(_0x2446ac) || 2);
    let _0x1bbee7 = _0x2eab29(_0x3195fe) || 16 / 9;
    let _0x33ac8b = _0x1bbee7 >= 1 ? _0x1fa20e * _0x1bbee7 : _0x1fa20e;
    let _0x40a462 = _0x1bbee7 >= 1 ? _0x1fa20e : _0x1fa20e / _0x1bbee7;
    return {
      width: _0x142d63(_0x33ac8b),
      height: _0x142d63(_0x40a462)
    };
  }
  function _0x3409de(_0x3e79ec) {
    let _0x21025b = _0x3e79ec || {};
    let _0x5df7b5 = _0x2eab29(_0x21025b.sourceWidth);
    let _0x3b71b4 = _0x2eab29(_0x21025b.sourceHeight);
    let _0x5a2594 = _0x406950(_0x21025b.previewRatio, _0x5df7b5, _0x3b71b4);
    let _0x52ca16 = _0x2eab29(_0x21025b.resolutionH);
    if (_0x52ca16) {
      return Object.assign(_0x392b4a(_0x52ca16, _0x5a2594), {
        aspect: _0x5a2594
      });
    }
    if (!_0x5df7b5 || !_0x3b71b4) {
      return {
        width: 0,
        height: 0,
        aspect: _0x5a2594
      };
    }
    let _0x3c85fa = _0x5df7b5 / _0x3b71b4;
    if (Math.abs(_0x3c85fa - _0x5a2594) <= Math.max(1, _0x5a2594) * 0.000001) {
      return {
        width: _0x142d63(_0x5df7b5),
        height: _0x142d63(_0x3b71b4),
        aspect: _0x5a2594
      };
    } else {
      return Object.assign(_0x392b4a(Math.min(_0x5df7b5, _0x3b71b4), _0x5a2594), {
        aspect: _0x5a2594
      });
    }
  }
  function _0x1a85c9(_0x48df5b, _0x5ee423, _0x492e5a) {
    let _0x1dbc8f = Number.isFinite(_0x492e5a && _0x492e5a.x) ? _0x492e5a.x : 0;
    let _0x4f7bac = Number.isFinite(_0x492e5a && _0x492e5a.y) ? _0x492e5a.y : 0;
    let _0x74cc6c = _0x2eab29(_0x492e5a && _0x492e5a.width);
    let _0x397d12 = _0x2eab29(_0x492e5a && _0x492e5a.height);
    let _0x435f68 = _0x2eab29(_0x48df5b);
    let _0x482c09 = _0x2eab29(_0x5ee423);
    if (!_0x74cc6c || !_0x397d12) {
      return {
        x: _0x1dbc8f,
        y: _0x4f7bac,
        width: 0,
        height: 0
      };
    }
    if (!_0x435f68 || !_0x482c09) {
      return {
        x: _0x1dbc8f,
        y: _0x4f7bac,
        width: _0x74cc6c,
        height: _0x397d12
      };
    }
    let _0x64d355 = _0x435f68 / _0x482c09;
    let _0x14508b = _0x74cc6c / _0x397d12;
    let _0x244442;
    let _0x27b0c1;
    if (_0x64d355 > _0x14508b) {
      _0x244442 = _0x74cc6c;
      _0x27b0c1 = _0x74cc6c / _0x64d355;
    } else {
      _0x27b0c1 = _0x397d12;
      _0x244442 = _0x397d12 * _0x64d355;
    }
    return {
      x: _0x1dbc8f + (_0x74cc6c - _0x244442) / 2,
      y: _0x4f7bac + (_0x397d12 - _0x27b0c1) / 2,
      width: _0x244442,
      height: _0x27b0c1
    };
  }
  function _0x3a92be(_0x59097b) {
    let _0x15e536 = !!_0x59097b && typeof _0x59097b == "object";
    let _0x4bf066 = _0x15e536 ? _0x59097b.type : _0x59097b;
    return _0x4bf066 !== "filter" && _0x4bf066 !== "audio" && _0x4bf066 !== "video" && (_0x4bf066 !== "blur" || !_0x15e536 || !_0x59097b.syncSubtitles);
  }
  function _0x51dbd4(_0x2013fa, _0x41a7f8, _0x4e989a) {
    if (!_0x2013fa || !Array.isArray(_0x2013fa.ocrBox) || _0x2013fa.ocrBox.length < 4) {
      return null;
    }
    let _0x4ac028 = _0x41a7f8.mapSourceNormBox(_0x2013fa.ocrBox, _0x4e989a);
    if (_0x4ac028.visible) {
      return {
        realOcrVisible: true,
        realOcrBoxX: _0x4ac028.x,
        realOcrBoxY: _0x4ac028.y,
        realOcrBoxWidth: _0x4ac028.width,
        realOcrBoxHeight: _0x4ac028.height
      };
    } else {
      return {
        realOcrVisible: false
      };
    }
  }
  function _0xec12b9(_0x312c5b, _0x381d1d, _0x5cf407, _0x1c2dbf) {
    let _0x5bbe3c = _0x2eab29(_0x312c5b);
    let _0x5a17ee = _0x2eab29(_0x381d1d);
    let _0x49e8b8 = _0x2eab29(_0x5cf407);
    let _0xe40987 = _0x2eab29(_0x1c2dbf);
    if (!_0x5bbe3c || !_0x5a17ee || !_0x49e8b8 || !_0xe40987) {
      return {
        x: 1,
        y: 1
      };
    } else {
      return {
        x: _0x49e8b8 / _0x5bbe3c,
        y: _0xe40987 / _0x5a17ee
      };
    }
  }
  function _0x20afdb(_0xd81684, _0x5879a9) {
    if (!_0xd81684 || typeof _0xd81684 != "object") {
      return null;
    }
    let _0x8d1d72 = _0x5879a9 || {};
    let _0x4f17fc = Math.round(_0x2eab29(_0xd81684.refCanvasWidth));
    let _0x8a0957 = Math.round(_0x2eab29(_0xd81684.refCanvasHeight));
    if (!_0x4f17fc || !_0x8a0957 || _0x4f17fc > 16384 || _0x8a0957 > 16384) {
      return null;
    }
    let _0x5af1fb = String(_0xd81684.previewRatio == null ? "" : _0xd81684.previewRatio).trim();
    let _0x27e6c5 = /^(original|\d{1,4}(?:\.\d+)?:\d{1,4}(?:\.\d+)?)$/.test(_0x5af1fb) ? _0x5af1fb : "original";
    let _0x2fb247 = _0x2eab29(_0x8d1d72.sourceWidth);
    let _0x2aae6e = _0x2eab29(_0x8d1d72.sourceHeight);
    let _0x52d147 = _0x3409de({
      sourceWidth: _0x2fb247,
      sourceHeight: _0x2aae6e,
      previewRatio: _0x27e6c5,
      resolutionH: _0x8d1d72.resolutionH
    });
    if (!_0x52d147.width || !_0x52d147.height) {
      return null;
    } else {
      return {
        previewRatio: _0x27e6c5,
        refCanvasWidth: _0x4f17fc,
        refCanvasHeight: _0x8a0957,
        outputWidth: _0x52d147.width,
        outputHeight: _0x52d147.height,
        sourceWidth: Math.round(_0x2fb247) || 0,
        sourceHeight: Math.round(_0x2aae6e) || 0,
        claimedWidth: Math.round(_0x2eab29(_0xd81684.outputWidth)) || 0,
        claimedHeight: Math.round(_0x2eab29(_0xd81684.outputHeight)) || 0
      };
    }
  }
  function _0x1382de(_0x46d51a) {
    let _0x2d420f = _0x46d51a || {};
    let _0x55a899 = _0x2d420f.composition || null;
    let _0xb68682 = !_0x55a899;
    let _0x49ba04 = _0x2eab29(_0x2d420f.sourceWidth);
    let _0x35d0cc = _0x2eab29(_0x2d420f.sourceHeight);
    let _0x2c10b5 = _0x2d420f.frameRect;
    let _0x1be921 = _0x2c10b5 && _0x2eab29(_0x2c10b5.width) && _0x2eab29(_0x2c10b5.height) ? _0x2c10b5 : {
      x: 0,
      y: 0,
      width: _0x49ba04,
      height: _0x35d0cc
    };
    let _0x119fba = _0xb68682 ? Math.round(_0x49ba04) : _0x55a899.outputWidth;
    let _0xe79f72 = _0xb68682 ? Math.round(_0x35d0cc) : _0x55a899.outputHeight;
    let _0x36b021 = _0xb68682 ? _0x1be921.width ? _0x49ba04 / _0x1be921.width : 1 : _0x55a899.outputWidth / _0x55a899.refCanvasWidth;
    let _0x489968 = _0xb68682 ? _0x1be921.height ? _0x35d0cc / _0x1be921.height : 1 : _0x55a899.outputHeight / _0x55a899.refCanvasHeight;
    let _0x3a207f = _0xb68682 ? _0x47dabc => (_0x47dabc - _0x1be921.x) * _0x36b021 : _0x3b4342 => _0x3b4342 * _0x36b021;
    let _0x4dab89 = _0xb68682 ? _0x4c5849 => (_0x4c5849 - _0x1be921.y) * _0x489968 : _0x1dfb41 => _0x1dfb41 * _0x489968;
    let _0x1f37fe = _0xb68682 || !_0x1be921.width || !_0x49ba04 ? 1 : _0x1be921.width / _0x49ba04 * _0x36b021;
    let _0x3785da = _0xb68682 || !_0x1be921.height || !_0x35d0cc ? 1 : _0x1be921.height / _0x35d0cc * _0x489968;
    let _0x2e7b96 = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: false
    };
    let _0xaad0ea = _0x259e92 => Math.max(0, Math.floor(_0x259e92 / 2) * 2);
    let _0x43ea1a = _0x1a470d => Math.max(2, Math.ceil(_0x1a470d / 2) * 2);
    function _0x3e4501(_0x2d63c3, _0x2745e3, _0x11317f, _0xedaf84) {
      let _0x52efb4 = Math.max(0, _0x2d63c3);
      let _0x4f561d = Math.max(0, _0x2745e3);
      let _0x20c974 = Math.min(_0x119fba, _0x11317f);
      let _0x4cef55 = Math.min(_0xe79f72, _0xedaf84);
      if (!(_0x20c974 > _0x52efb4) || !(_0x4cef55 > _0x4f561d)) {
        return _0x2e7b96;
      }
      let _0x2225a6 = _0xaad0ea(Math.round(_0x52efb4));
      let _0x319f39 = _0xaad0ea(Math.round(_0x4f561d));
      let _0x280971 = Math.min(_0x43ea1a(Math.round(_0x20c974) - _0x2225a6), _0x119fba - _0x2225a6);
      let _0xe1f5ad = Math.min(_0x43ea1a(Math.round(_0x4cef55) - _0x319f39), _0xe79f72 - _0x319f39);
      if (_0x280971 < 2 || _0xe1f5ad < 2) {
        return _0x2e7b96;
      } else {
        return {
          x: _0x2225a6,
          y: _0x319f39,
          width: _0x280971,
          height: _0xe1f5ad,
          visible: true
        };
      }
    }
    function _0x55922f(_0x4aa3fe) {
      let _0x55fb48 = Number(_0x4aa3fe && _0x4aa3fe.x) || 0;
      let _0x536e48 = Number(_0x4aa3fe && _0x4aa3fe.y) || 0;
      let _0x135ff1 = Number(_0x4aa3fe && _0x4aa3fe.width) || 0;
      let _0x430a76 = Number(_0x4aa3fe && _0x4aa3fe.height) || 0;
      if (_0xb68682) {
        let _0xa4d024 = Math.round(_0x3a207f(_0x55fb48));
        let _0x5f4817 = Math.round(_0x4dab89(_0x536e48));
        let _0x17a5ac = Math.max(2, Math.round(_0x135ff1 * _0x36b021));
        let _0x416f65 = Math.max(2, Math.round(_0x430a76 * _0x489968));
        _0xa4d024 = Math.max(0, Math.min(_0x119fba - 2, _0xa4d024));
        _0x5f4817 = Math.max(0, Math.min(_0xe79f72 - 2, _0x5f4817));
        if (_0xa4d024 + _0x17a5ac > _0x119fba) {
          _0x17a5ac = _0x119fba - _0xa4d024;
        }
        if (_0x5f4817 + _0x416f65 > _0xe79f72) {
          _0x416f65 = _0xe79f72 - _0x5f4817;
        }
        if (_0x17a5ac % 2 !== 0) {
          _0x17a5ac = Math.max(2, _0x17a5ac - 1);
        }
        if (_0x416f65 % 2 !== 0) {
          _0x416f65 = Math.max(2, _0x416f65 - 1);
        }
        if (_0xa4d024 % 2 !== 0) {
          _0xa4d024 = Math.max(0, _0xa4d024 - 1);
        }
        if (_0x5f4817 % 2 !== 0) {
          _0x5f4817 = Math.max(0, _0x5f4817 - 1);
        }
        return {
          x: _0xa4d024,
          y: _0x5f4817,
          width: _0x17a5ac,
          height: _0x416f65,
          visible: true
        };
      }
      let _0x3feb65 = _0x3a207f(_0x55fb48);
      let _0x59babc = _0x4dab89(_0x536e48);
      return _0x3e4501(_0x3feb65, _0x59babc, _0x3feb65 + _0x135ff1 * _0x36b021, _0x59babc + _0x430a76 * _0x489968);
    }
    function _0x55e04d(_0x3a5487, _0x439e6d) {
      let _0x214de9 = Number(_0x3a5487 && _0x3a5487[0]) || 0;
      let _0x1fa52d = Number(_0x3a5487 && _0x3a5487[1]) || 0;
      let _0x395e99 = Number(_0x3a5487 && _0x3a5487[2]) || 0;
      let _0xed59fa = Number(_0x3a5487 && _0x3a5487[3]) || 0;
      if (_0xb68682) {
        return {
          x: Math.max(0, Math.round(_0x214de9 * _0x49ba04)),
          y: Math.max(0, Math.round(_0x1fa52d * _0x35d0cc)),
          width: Math.max(2, Math.round((_0x395e99 - _0x214de9) * _0x49ba04)),
          height: Math.max(2, Math.round((_0xed59fa - _0x1fa52d) * _0x35d0cc)),
          visible: true
        };
      }
      let _0x5d62ac = _0x439e6d || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      let _0x41967e = (_0x5d62ac.x + _0x214de9 * _0x5d62ac.width) * _0x36b021;
      let _0x4e84a6 = (_0x5d62ac.y + _0x1fa52d * _0x5d62ac.height) * _0x489968;
      return _0x3e4501(_0x41967e, _0x4e84a6, _0x41967e + (_0x395e99 - _0x214de9) * _0x5d62ac.width * _0x36b021, _0x4e84a6 + (_0xed59fa - _0x1fa52d) * _0x5d62ac.height * _0x489968);
    }
    return {
      legacy: _0xb68682,
      outWidth: _0x119fba,
      outHeight: _0xe79f72,
      sx: _0x36b021,
      sy: _0x489968,
      toX: _0x3a207f,
      toY: _0x4dab89,
      sizeScale: _0x36b021,
      fontScale: _0x1f37fe,
      srcScaleY: _0x3785da,
      mapBox: _0x55922f,
      mapSourceNormBox: _0x55e04d
    };
  }
  function _0x4aaa89(_0xe501f5, _0x350ae2) {
    if (!_0xe501f5) {
      return _0xe501f5;
    }
    let _0x336c68 = _0x350ae2.mapBox(_0xe501f5);
    if (!_0x336c68.visible && _0x3a92be(_0xe501f5)) {
      return null;
    }
    let _0x5cc89a;
    if (_0xe501f5.type === "text" && _0xe501f5.fontSize) {
      let _0x47fafb = _0xe501f5.scale !== undefined && _0xe501f5.scale !== null ? Math.max(1, _0xe501f5.scale) : 100;
      _0x5cc89a = Math.max(1, Math.round(_0xe501f5.fontSize * _0x47fafb * _0x350ae2.fontScale / 100));
    }
    let _0x5ead49;
    let _0x407324;
    let _0x33e46c;
    let _0x4a0eaa;
    if (_0xe501f5.type === "blur") {
      _0x5ead49 = Math.max(1, Math.round((_0xe501f5.blurRadius || 25) * _0x350ae2.sizeScale));
      if (_0xe501f5.pixelSize !== undefined) {
        _0x407324 = Math.max(2, Math.round(_0xe501f5.pixelSize * _0x350ae2.sizeScale));
      }
      if (_0xe501f5.delogoBand !== undefined) {
        _0x33e46c = Math.max(1, Math.round(_0xe501f5.delogoBand * _0x350ae2.sizeScale));
      }
      _0x4a0eaa = {
        realOffsetLeft: (Number(_0xe501f5.offsetLeft) || 0) * _0x350ae2.fontScale,
        realOffsetRight: (Number(_0xe501f5.offsetRight) || 0) * _0x350ae2.fontScale,
        realOffsetTop: (Number(_0xe501f5.offsetTop) || 0) * _0x350ae2.srcScaleY,
        realOffsetBottom: (Number(_0xe501f5.offsetBottom) || 0) * _0x350ae2.srcScaleY
      };
    }
    return Object.assign({}, _0xe501f5, {
      realX: _0x336c68.x,
      realY: _0x336c68.y,
      realWidth: _0x336c68.width,
      realHeight: _0x336c68.height,
      realVisible: _0x336c68.visible,
      realFontSize: _0x5cc89a,
      realBlurRadius: _0x5ead49,
      realPixelSize: _0x407324,
      realDelogoBand: _0x33e46c
    }, _0x4a0eaa || {});
  }
  _0x38ef61.exports = {
    MIN_DIM: 2,
    MAX_DIM: 16384,
    createGeometryMapper: _0x1382de,
    mapOverlayForExport: _0x4aaa89,
    ocrBoxFieldsForExport: _0x51dbd4,
    overlayIsBoxOnly: _0x3a92be,
    parseAspect: _0x406950,
    frameFromShortSide: _0x392b4a,
    computeOutputFrame: _0x3409de,
    containRect: _0x1a85c9,
    compositionScale: _0xec12b9,
    sanitizeComposition: _0x20afdb,
    evenDim: _0x142d63
  };
});
var yn = Z((_0x440704, _0x14f479) => {
  var _0x2e97b4 = require("node:fs");
  var _0xb2976d = require("node:path");
  var _0x329368 = null;
  function _0x751908(_0x39599f) {
    if (!_0x39599f) {
      return new Map();
    }
    if (_0x329368 && _0x329368.dir === _0x39599f) {
      return _0x329368.map;
    }
    let _0x5d9f2a = new Map();
    try {
      let _0x36ef36 = _0x2e97b4.readFileSync(_0xb2976d.join(_0x39599f, "catalog.json"), "utf8");
      let _0x2cec23 = JSON.parse(_0x36ef36);
      for (let _0x4a45ec of _0x2cec23?.fonts || []) {
        if (!_0x4a45ec?.family || !_0x4a45ec?.file) {
          continue;
        }
        let _0x258097 = _0xb2976d.join(_0x39599f, _0xb2976d.basename(String(_0x4a45ec.file)));
        if (_0x2e97b4.existsSync(_0x258097)) {
          _0x5d9f2a.set(String(_0x4a45ec.family).toLowerCase(), _0x258097);
        }
      }
    } catch {}
    _0x329368 = {
      dir: _0x39599f,
      map: _0x5d9f2a
    };
    return _0x5d9f2a;
  }
  function _0x218956(_0x12ee71) {
    return String(_0x12ee71).replace(/\\/g, "/").replace(/:/g, "\\:");
  }
  function _0x42a2d4(_0xe5e622, _0x2627fd) {
    let _0x31e8c6 = _0x2627fd?.get?.(String(_0xe5e622 || "").toLowerCase());
    if (_0x31e8c6) {
      return "fontfile='" + _0x218956(_0x31e8c6) + "'";
    } else {
      return "font='" + _0xe5e622 + "'";
    }
  }
  var _0x38da13 = new Map();
  function _0x59b6b0(_0x3a5ee0, _0x5f1b8b) {
    return _0x3a5ee0.readUInt16BE(_0x5f1b8b);
  }
  function _0x31458b(_0x51ba7e) {
    try {
      let _0x445dca = _0x2e97b4.readFileSync(_0x51ba7e);
      let _0x1c0646 = 0;
      if (_0x445dca.toString("latin1", 0, 4) === "ttcf") {
        _0x1c0646 = _0x445dca.readUInt32BE(12);
      }
      let _0x1593a6 = _0x59b6b0(_0x445dca, _0x1c0646 + 4);
      let _0x24a751 = new Map();
      for (let _0x50e346 = 0; _0x50e346 < _0x1593a6; _0x50e346++) {
        let _0x32ac85 = _0x1c0646 + 12 + _0x50e346 * 16;
        _0x24a751.set(_0x445dca.toString("latin1", _0x32ac85, _0x32ac85 + 4), _0x445dca.readUInt32BE(_0x32ac85 + 8));
      }
      let _0x1eebf9 = _0x24a751.get("head");
      if (_0x1eebf9 === undefined) {
        return null;
      }
      let _0xfea905 = _0x59b6b0(_0x445dca, _0x1eebf9 + 18);
      if (!_0xfea905) {
        return null;
      }
      let _0x175fca = 0;
      let _0x5b6e8e = 0;
      let _0x482cf6 = _0x24a751.get("OS/2");
      if (_0x482cf6 !== undefined) {
        _0x175fca = _0x59b6b0(_0x445dca, _0x482cf6 + 74);
        _0x5b6e8e = _0x175fca + _0x59b6b0(_0x445dca, _0x482cf6 + 76);
      }
      if (!_0x5b6e8e) {
        let _0x4a04d7 = _0x24a751.get("hhea");
        if (_0x4a04d7 === undefined) {
          return null;
        }
        _0x175fca = _0x445dca.readInt16BE(_0x4a04d7 + 4);
        _0x5b6e8e = _0x175fca - _0x445dca.readInt16BE(_0x4a04d7 + 6);
      }
      if (!(_0x175fca > 0) || !(_0x5b6e8e > 0)) {
        return null;
      } else {
        return {
          upem: _0xfea905,
          winAsc: _0x175fca,
          cell: _0x5b6e8e
        };
      }
    } catch {
      return null;
    }
  }
  var _0x253b1e = new Map([["arial", ["arial.ttf"]], ["arial black", ["ariblk.ttf"]], ["segoe ui", ["segoeui.ttf"]], ["tahoma", ["tahoma.ttf"]], ["verdana", ["verdana.ttf"]], ["calibri", ["calibri.ttf"]], ["times new roman", ["times.ttf"]], ["georgia", ["georgia.ttf"]], ["bahnschrift", ["bahnschrift.ttf"]], ["candara", ["candara.ttf"]], ["corbel", ["corbel.ttf"]], ["franklin gothic medium", ["framd.ttf"]], ["trebuchet ms", ["trebuc.ttf"]], ["cambria", ["cambria.ttc"]], ["constantia", ["constan.ttf"]], ["palatino linotype", ["pala.ttf"]], ["sitka text", ["SitkaVF.ttf", "Sitka.ttc"]], ["impact", ["impact.ttf"]], ["comic sans ms", ["comic.ttf"]], ["gabriola", ["Gabriola.ttf"]], ["ink free", ["Inkfree.ttf"]], ["segoe print", ["segoepr.ttf"]], ["segoe script", ["segoesc.ttf"]], ["consolas", ["consola.ttf"]], ["courier new", ["cour.ttf"]], ["lucida console", ["lucon.ttf"]]]);
  function _0x228165(_0x4ef633, _0x53366c) {
    let _0x437dcb = String(_0x4ef633 || "").toLowerCase();
    let _0x29bbd1 = _0x53366c?.get?.(_0x437dcb);
    if (_0x29bbd1) {
      return _0x29bbd1;
    }
    let _0x1c1b01 = _0x253b1e.get(_0x437dcb);
    if (!_0x1c1b01) {
      return null;
    }
    let _0x2eb587 = _0xb2976d.join(process.env.WINDIR || "C:\\Windows", "Fonts");
    for (let _0x29eb2c of _0x1c1b01) {
      let _0x4cecbd = _0xb2976d.join(_0x2eb587, _0x29eb2c);
      if (_0x2e97b4.existsSync(_0x4cecbd)) {
        return _0x4cecbd;
      }
    }
    return null;
  }
  var _0x2a5fad = {
    fsScale: 1,
    topShiftPerEm: 0
  };
  function _0x120cc4(_0x123f5e, _0x3050d2) {
    let _0x35031c = _0x228165(_0x123f5e, _0x3050d2);
    if (!_0x35031c) {
      return _0x2a5fad;
    }
    if (!_0x38da13.has(_0x35031c)) {
      let _0x1b8ddf = _0x31458b(_0x35031c);
      let _0xbb4400 = _0x1b8ddf ? _0x1b8ddf.cell / _0x1b8ddf.upem : 1;
      if (!_0x1b8ddf || _0xbb4400 < 0.5 || _0xbb4400 > 4) {
        _0x38da13.set(_0x35031c, _0x2a5fad);
      } else {
        _0x38da13.set(_0x35031c, {
          fsScale: _0xbb4400,
          topShiftPerEm: _0x1b8ddf.winAsc * (_0x1b8ddf.upem - _0x1b8ddf.cell) / (_0x1b8ddf.cell * _0x1b8ddf.upem)
        });
      }
    }
    return _0x38da13.get(_0x35031c);
  }
  function _0x507bf8(_0x36058d, _0x15a942) {
    return _0x120cc4(_0x36058d, _0x15a942).fsScale;
  }
  _0x14f479.exports = {
    loadFontCatalog: _0x751908,
    escapeFilterPath: _0x218956,
    drawtextFontArg: _0x42a2d4,
    assFontMetrics: _0x120cc4,
    assFontSizeScale: _0x507bf8
  };
});
var ra = Z((_0x4df602, _0x2daed5) => {
  var _0x398dca = require("node:fs");
  var {
    buildColorFilterChain: _0x2bbab3
  } = Yi();
  var {
    containRect: _0x17c587
  } = Nn();
  var {
    drawtextFontArg: _0x495f7e,
    loadFontCatalog: _0x1b9d8f
  } = yn();
  var {
    mapOriginalToNew: _0x305a1f
  } = gn();
  var _0x2fb5c7 = 2.5;
  var _0x2eb4e0 = 1.3;
  var _0x4cb40f = "ezmaxsoft-v1";
  function _0x19b7c2(_0x11f13e) {
    let _0x458331 = Number.isFinite(_0x11f13e) && _0x11f13e > 0 ? _0x11f13e : 14400;
    let _0x4e72bb = 10;
    let _0xd2429f = 4000;
    let _0x3f1b13 = 2654435769;
    let _0x16b8ce = () => {
      _0x3f1b13 = Math.imul(_0x3f1b13, 1664525) + 1013904223 >>> 0;
      return _0x3f1b13 / 4294967296;
    };
    let _0x5a1c1a = [];
    let _0x2e41c3 = 0;
    while (_0x2e41c3 < _0x458331 && _0x5a1c1a.length < _0xd2429f) {
      let _0x24b74c = _0x16b8ce();
      let _0x2ca170 = _0x16b8ce();
      let _0x5da30d = Math.min(_0x458331, _0x2e41c3 + _0x4e72bb);
      _0x5a1c1a.push({
        start: _0x2e41c3,
        end: _0x5da30d,
        nx: _0x24b74c,
        ny: _0x2ca170
      });
      _0x2e41c3 = _0x5da30d;
    }
    if (_0x5a1c1a.length === 0) {
      _0x5a1c1a.push({
        start: 0,
        end: _0x458331,
        nx: 0.5,
        ny: 0.5
      });
    }
    return _0x5a1c1a;
  }
  function _0x3d75fe(_0x242901) {
    if (_0x242901.length === 0) {
      return "0";
    }
    if (_0x242901.length === 1) {
      return _0x242901[0];
    }
    if (_0x242901.length === 2) {
      return _0x242901[0] + "+" + _0x242901[1];
    }
    let _0x5c7fcd = _0x242901.length >> 1;
    return "(" + _0x3d75fe(_0x242901.slice(0, _0x5c7fcd)) + ")+(" + _0x3d75fe(_0x242901.slice(_0x5c7fcd)) + ")";
  }
  function _0x2c187d(_0x2a6027, {
    maxSlices: _0x18653a = 200,
    minSliceSec: _0x3ed3e2 = 0.15
  } = {}) {
    let _0x3c5c5d = _0x4026e8 => Math.max(0, Math.round(_0x4026e8 * 1000) / 1000);
    let _0x32d77c = new Set();
    _0x2a6027.forEach(_0x178707 => {
      _0x178707.forEach(([_0x386150, _0x14bcdc]) => {
        let _0x3ad72f = _0x3c5c5d(_0x386150);
        let _0xab84a1 = _0x3c5c5d(_0x14bcdc);
        if (!(_0xab84a1 <= _0x3ad72f)) {
          _0x32d77c.add(_0x3ad72f);
          _0x32d77c.add(_0xab84a1);
        }
      });
    });
    let _0x40fe2a = [];
    let _0x382f3e = 0;
    for (let _0x7f5937 of [..._0x32d77c].sort((_0x42d7f3, _0x56649a) => _0x42d7f3 - _0x56649a)) {
      if (_0x7f5937 - _0x382f3e >= _0x3ed3e2) {
        _0x40fe2a.push(_0x7f5937);
        _0x382f3e = _0x7f5937;
      }
    }
    let _0x16d396 = [];
    let _0x3d1583 = 0;
    for (let _0x268c22 of _0x40fe2a) {
      _0x16d396.push({
        t0: _0x3d1583,
        t1: _0x268c22,
        active: []
      });
      _0x3d1583 = _0x268c22;
    }
    _0x16d396.push({
      t0: _0x3d1583,
      t1: null,
      active: []
    });
    for (let _0x26410b of _0x16d396) {
      _0x2a6027.forEach((_0x46b461, _0x436662) => {
        if (_0x46b461.some(([_0x1fc5ac, _0x48177a]) => _0x3c5c5d(_0x48177a) > _0x26410b.t0 && (_0x26410b.t1 === null || _0x3c5c5d(_0x1fc5ac) < _0x26410b.t1))) {
          _0x26410b.active.push(_0x436662);
        }
      });
    }
    let _0x4a9b83 = [];
    for (let _0x1da5d2 of _0x16d396) {
      let _0x5bf220 = _0x4a9b83[_0x4a9b83.length - 1];
      if (_0x5bf220 && _0x5bf220.active.join(",") === _0x1da5d2.active.join(",")) {
        _0x5bf220.t1 = _0x1da5d2.t1;
      } else {
        _0x4a9b83.push(_0x1da5d2);
      }
    }
    while (_0x4a9b83.length > _0x18653a) {
      let _0x372fd9 = -1;
      let _0x15930f = Number.POSITIVE_INFINITY;
      for (let _0x2fb7f4 = 0; _0x2fb7f4 < _0x4a9b83.length; _0x2fb7f4++) {
        let _0x275aeb = _0x4a9b83[_0x2fb7f4].t1 === null ? Number.POSITIVE_INFINITY : _0x4a9b83[_0x2fb7f4].t1 - _0x4a9b83[_0x2fb7f4].t0;
        if (_0x275aeb < _0x15930f) {
          _0x15930f = _0x275aeb;
          _0x372fd9 = _0x2fb7f4;
        }
      }
      let _0xea570 = _0x372fd9 > 0 ? _0x372fd9 - 1 : _0x372fd9 + 1;
      let _0x399e00 = _0x4a9b83[Math.min(_0x372fd9, _0xea570)];
      let _0x540281 = _0x4a9b83[Math.max(_0x372fd9, _0xea570)];
      _0x399e00.t1 = _0x540281.t1;
      _0x399e00.active = [...new Set([..._0x399e00.active, ..._0x540281.active])].sort((_0x4e747d, _0x16b0aa) => _0x4e747d - _0x16b0aa);
      _0x4a9b83.splice(Math.max(_0x372fd9, _0xea570), 1);
    }
    return _0x4a9b83;
  }
  var _0x45bb3a = class extends Error {
    constructor(_0x74bc14, _0x24fe95, _0x4ca2d4) {
      super(_0x24fe95 || _0x74bc14);
      this.name = "ExportPolicyError";
      this.code = _0x74bc14;
      this.details = _0x4ca2d4 && typeof _0x4ca2d4 == "object" ? _0x4ca2d4 : {};
    }
  };
  function _0x34f09f(_0x32a4a3) {
    if (_0x32a4a3 && typeof _0x32a4a3.ttsDurationFit == "boolean") {
      return _0x32a4a3.ttsDurationFit;
    } else {
      return typeof _0x32a4a3?.voiceId == "string" && _0x32a4a3.voiceId.startsWith("voice_");
    }
  }
  function _0x37d95f(_0x209de3) {
    let _0x153570 = [];
    let _0x1ec95a = Number.isFinite(_0x209de3) && _0x209de3 > 0 ? _0x209de3 : 1;
    while (_0x1ec95a > 2) {
      _0x153570.push("atempo=2.0");
      _0x1ec95a /= 2;
    }
    while (_0x1ec95a < 0.5) {
      _0x153570.push("atempo=0.5");
      _0x1ec95a /= 0.5;
    }
    _0x153570.push("atempo=" + _0x1ec95a.toFixed(4));
    return _0x153570.join(",");
  }
  function _0x1b73fd(_0x328341) {
    if (_0x328341 && _0x328341.hasAlimiter === false) {
      return null;
    }
    let _0x2f430d = "alimiter=limit=0.95:attack=5:release=50:level=0";
    if (_0x328341 && _0x328341.hasLatency === false) {
      return _0x2f430d;
    } else {
      return _0x2f430d + ":latency=1";
    }
  }
  function _0xca7892(_0x543b1f, _0x2d9448 = 12) {
    let _0x41bee9 = Math.min(_0x2d9448 / 1000, Math.max(0, Number(_0x543b1f) || 0));
    return "afade=t=out:st=" + Math.max(0, (Number(_0x543b1f) || 0) - _0x41bee9).toFixed(3) + ":d=" + _0x41bee9.toFixed(3);
  }
  function _0x382503(_0xa51267, {
    pieceById: _0x4deec2,
    pieces: _0x5550de,
    speed: _0x581f9b,
    fitMode: _0xbfde38
  } = {}) {
    if (_0x4deec2) {
      if (_0xbfde38 === "natural_flow") {
        let _0x48af17 = _0x305a1f(_0x5550de, _0xa51267.startTime);
        let _0x3c398b = Number.isFinite(_0xa51267.audioTempo) && _0xa51267.audioTempo > 0 ? _0xa51267.audioTempo : 1;
        return {
          delayMs: Math.round(_0x48af17 * 1000),
          tempo: _0x3c398b,
          trimDuration: null
        };
      }
      let _0x5072d9 = _0x4deec2.get(_0xa51267.id);
      let _0x4bbec6 = _0x5072d9 && _0x5072d9.audioTempo ? _0x5072d9.audioTempo : 1;
      let _0x3032ac = _0x5072d9 ? _0x5072d9.newStart : _0x305a1f(_0x5550de, _0xa51267.startTime);
      let _0x4bace3 = _0x5072d9 && Number.isFinite(_0x5072d9.audioTrimSec) && _0x5072d9.audioTrimSec > 0 ? _0x5072d9.audioTrimSec : null;
      return {
        delayMs: Math.round(_0x3032ac * 1000),
        tempo: _0x4bbec6,
        trimDuration: _0x4bace3
      };
    }
    let _0xfc4e60 = _0x581f9b > 0 ? _0x581f9b : 1;
    let _0x556aa6 = Math.round(_0xa51267.startTime / _0xfc4e60 * 1000);
    let _0x3c15e0 = _0xa51267.ttsWindowSec !== undefined && _0xa51267.ttsWindowSec !== null && _0xa51267.ttsWindowSec > 0;
    let _0x138393 = (_0x3c15e0 ? _0xa51267.ttsWindowSec : Math.max(0.05, (_0xa51267.endTime || _0xa51267.startTime) - _0xa51267.startTime)) / _0xfc4e60;
    let _0x56c555 = 1;
    let _0x48e790 = 1;
    let _0x452688 = _0x2fb5c7;
    if (_0xbfde38 === "speed_up_tts" && Number.isFinite(_0xa51267.audioDuration) && _0xa51267.audioDuration > 0 && Number.isFinite(_0x138393) && _0x138393 > 0) {
      _0x452688 = _0x34f09f(_0xa51267) ? _0x2eb4e0 : _0x2fb5c7;
      _0x48e790 = _0xa51267.audioDuration / _0x138393;
      _0x56c555 = Math.max(1, Math.min(_0x452688, _0x48e790));
    }
    let _0x2e7df4 = null;
    if (_0xbfde38 === "speed_up_tts") {
      if (_0x3c15e0) {
        if (Number.isFinite(_0x138393) && Number.isFinite(_0xa51267.audioDuration) && _0xa51267.audioDuration > 0 && _0xa51267.audioDuration / _0x56c555 > _0x138393 + 0.001) {
          _0x2e7df4 = _0x138393;
        }
      } else {
        _0x2e7df4 = _0x138393;
      }
    }
    let _0xd6b64a = _0x2e7df4 !== null && _0x3c15e0 && _0x48e790 > _0x452688 + 0.001;
    return {
      delayMs: _0x556aa6,
      tempo: _0x56c555,
      trimDuration: _0x2e7df4,
      requiredTempo: _0x48e790,
      cap: _0x452688,
      cutRisk: _0xd6b64a
    };
  }
  var _0x529bd2 = class {
    _fontArg(_0x413d25) {
      if (this._fontCatalog === undefined) {
        this._fontCatalog = _0x1b9d8f(this._fontsDir);
      }
      return _0x495f7e(_0x413d25, this._fontCatalog);
    }
    _limitAudioOutput(_0x346920) {
      let _0xa12371 = _0x1b73fd(this._alimiterCaps);
      if (!_0xa12371) {
        return false;
      }
      let _0x5ac8a1 = -1;
      for (let _0x44466b = _0x346920.length - 1; _0x44466b >= 0; _0x44466b--) {
        if (_0x346920[_0x44466b].endsWith("[aout]")) {
          _0x5ac8a1 = _0x44466b;
          break;
        }
      }
      if (_0x5ac8a1 < 0) {
        return false;
      } else {
        _0x346920[_0x5ac8a1] = _0x346920[_0x5ac8a1].slice(0, -6) + "[aout_prelimit]";
        _0x346920.push("[aout_prelimit]" + _0xa12371 + "[aout]");
        return true;
      }
    }
    parseColorToFfmpeg(_0x57c69c, _0x1a61ae) {
      if (!_0x57c69c) {
        return "0x000000FF";
      }
      if (_0x57c69c.startsWith("#")) {
        let _0x11c50a = _0x57c69c.slice(1);
        let _0x16087b = "00";
        let _0x1e7b00 = "00";
        let _0x7d0ce = "00";
        let _0x1a9768 = "ff";
        if (_0x11c50a.length >= 6) {
          _0x16087b = _0x11c50a.slice(0, 2);
          _0x1e7b00 = _0x11c50a.slice(2, 4);
          _0x7d0ce = _0x11c50a.slice(4, 6);
        }
        if (_0x11c50a.length >= 8) {
          _0x1a9768 = _0x11c50a.slice(6, 8);
        }
        if (_0x1a61ae != null) {
          _0x1a9768 = Math.round(Math.max(0, Math.min(1, Number.parseFloat(_0x1a61ae))) * 255).toString(16).padStart(2, "0");
        }
        return "0x" + _0x16087b + _0x1e7b00 + _0x7d0ce + _0x1a9768;
      }
      let _0x726b52 = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i;
      let _0x85e732 = _0x57c69c.match(_0x726b52);
      if (_0x85e732) {
        let _0x10baa5 = Number.parseInt(_0x85e732[1]).toString(16).padStart(2, "0");
        let _0x4340c7 = Number.parseInt(_0x85e732[2]).toString(16).padStart(2, "0");
        let _0x46dd03 = Number.parseInt(_0x85e732[3]).toString(16).padStart(2, "0");
        let _0x4e3030 = _0x1a61ae != null ? Number.parseFloat(_0x1a61ae) : _0x85e732[4] !== undefined ? Number.parseFloat(_0x85e732[4]) : 1;
        let _0x2a6c83 = Math.round(Math.max(0, Math.min(1, _0x4e3030)) * 255).toString(16).padStart(2, "0");
        return "0x" + _0x10baa5 + _0x4340c7 + _0x46dd03 + _0x2a6c83;
      }
      return "0x000000FF";
    }
    buildBoxColor(_0x3117ca, _0x3230c7 = 0.6) {
      if (!_0x3117ca) {
        return this.parseColorToFfmpeg("#000000", _0x3230c7);
      }
      if (_0x3117ca.startsWith("rgba") || _0x3117ca.startsWith("rgb(")) {
        let _0x3439a5 = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i;
        let _0x2efe46 = _0x3117ca.match(_0x3439a5);
        if (_0x2efe46) {
          let _0x1e83e3 = _0x2efe46[4] !== undefined ? Number.parseFloat(_0x2efe46[4]) : 1;
          return this.parseColorToFfmpeg(_0x3117ca, _0x1e83e3);
        }
      }
      if (_0x3117ca.startsWith("#") && _0x3117ca.length === 9) {
        return this.parseColorToFfmpeg(_0x3117ca);
      } else {
        return this.parseColorToFfmpeg(_0x3117ca, _0x3230c7);
      }
    }
    escapeDrawtext(_0x51ae4e) {
      return (_0x51ae4e || "").replace(/\\/g, "\\\\").replace(/'/g, "’").replace(/:/g, "\\:").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
    }
    buildFilterGraph(_0x2c1642, _0x404cbc, _0x27018c = 1, _0x42ec09 = 1920, _0x1e525d = 1080, _0x192b68 = null, _0x3609d0 = {}) {
      let _0x5c130d = (_0x3609d0.audioSegments || _0x2c1642 || []).filter(_0x166b62 => _0x166b62 && _0x166b62.audioPath).length;
      let _0x5c622f = [];
      let _0x4d1222 = (_0x404cbc || []).map(_0x11e0cb => {
        if (_0x11e0cb && (_0x11e0cb.type === "image" || _0x11e0cb.type === "video" || _0x11e0cb.type === "audio") && _0x11e0cb.src) {
          let _0x5e7120 = {
            ..._0x11e0cb,
            _mediaInputIdx: 1 + _0x5c130d + _0x5c622f.length
          };
          _0x5c622f.push({
            path: _0x11e0cb.src,
            kind: _0x11e0cb.type,
            gif: /\.gif$/i.test(_0x11e0cb.src)
          });
          return _0x5e7120;
        }
        return _0x11e0cb;
      });
      let _0x5adda8 = _0x3609d0.videoSegments || [];
      let _0x2cb157 = typeof _0x3609d0.backgroundAudioPath == "string" && _0x3609d0.backgroundAudioPath ? _0x3609d0.backgroundAudioPath : null;
      let _0x2cf2e4 = _0x2cb157 ? 1 + _0x5c130d + _0x5c622f.length + (_0x3609d0.watermarkProfile ? 1 : 0) : 0;
      let _0x2f2b97 = _0x2cb157 ? true : _0x3609d0.hasAudio !== false;
      this._bg = _0x3609d0.background || null;
      this._fontsDir = _0x3609d0.fontsDir || null;
      this._fontCatalog = undefined;
      this._bgFps = Math.round(Number(_0x3609d0.sourceFps)) || 30;
      this._comp = _0x3609d0.composition || null;
      this._srcW = Math.round(Number(this._comp && this._comp.sourceWidth)) || 0;
      this._srcH = Math.round(Number(this._comp && this._comp.sourceHeight)) || 0;
      let _0x18eeb1 = [];
      this._buildBaseTracks(_0x5adda8, _0x2f2b97, _0x42ec09, _0x1e525d, _0x18eeb1, Number(_0x3609d0.sourceDurationSec) || null, _0x2cf2e4);
      let _0x53b4e3 = _0x2f2b97 === (_0x3609d0.hasAudio !== false) ? _0x3609d0 : {
        ..._0x3609d0,
        hasAudio: _0x2f2b97
      };
      let _0x70d3dc;
      if (!_0x192b68 || !_0x192b68.pieces || _0x192b68.pieces.length === 0) {
        _0x70d3dc = this._buildLegacyGraph(_0x2c1642, _0x4d1222, _0x27018c, _0x42ec09, _0x1e525d, _0x53b4e3);
      } else {
        _0x70d3dc = this._buildPlannedGraph(_0x2c1642, _0x4d1222, _0x27018c, _0x42ec09, _0x1e525d, _0x192b68, _0x53b4e3);
      }
      if (_0x18eeb1.length > 0) {
        _0x70d3dc.filterComplex = _0x18eeb1.join("; ") + "; " + _0x70d3dc.filterComplex;
      }
      _0x70d3dc.mediaInputs = _0x5c622f;
      this._appendEncodeScaleStage(_0x70d3dc, {
        targetW: _0x3609d0.targetWidth || null,
        targetH: _0x3609d0.targetHeight || null,
        fps: _0x3609d0.targetFps || null
      });
      _0x70d3dc.watermarkInput = this._appendWatermarkStage(_0x70d3dc, {
        videoWidth: _0x3609d0.targetWidth || _0x42ec09,
        videoHeight: _0x3609d0.targetHeight || _0x1e525d,
        ttsCount: _0x5c130d,
        mediaCount: _0x5c622f.length,
        profile: _0x3609d0.watermarkProfile || null,
        assetPath: _0x3609d0.watermarkAssetPath || null,
        durationSec: _0x3609d0.expectedDuration
      });
      if (_0x3609d0.watermarkProfile && !_0x70d3dc.watermarkInput) {
        throw new _0x45bb3a("watermark_profile_unknown", "Không dựng được watermark bắt buộc của gói Free.", {
          watermark_profile: _0x3609d0.watermarkProfile,
          reason: "watermark_stage_missing"
        });
      }
      _0x70d3dc.backgroundAudioInput = _0x2cb157 ? {
        index: _0x2cf2e4,
        path: _0x2cb157
      } : null;
      return _0x70d3dc;
    }
    _appendEncodeScaleStage(_0x18208e, {
      targetW: _0x2dc1f4,
      targetH: _0x4c2a18,
      fps: _0x1d5ad6
    }) {
      let _0x578238 = _0x522417 => Math.max(2, Math.round(Number(_0x522417) / 2) * 2);
      let _0x411a13 = Number.isFinite(_0x2dc1f4) && _0x2dc1f4 > 0 && Number.isFinite(_0x4c2a18) && _0x4c2a18 > 0;
      let _0xd8788b = Number.isFinite(_0x1d5ad6) && _0x1d5ad6 > 0;
      if (!_0x411a13 && !_0xd8788b || !_0x18208e.filterComplex || !_0x18208e.filterComplex.includes("[vout]")) {
        return false;
      }
      _0x18208e.filterComplex = _0x18208e.filterComplex.replace(/\[vout\]/g, "[vscale_in]");
      let _0x325120 = [];
      if (_0x411a13) {
        let _0x739a45 = _0x578238(_0x2dc1f4);
        let _0x2b3542 = _0x578238(_0x4c2a18);
        _0x325120.push("scale=" + _0x739a45 + ":" + _0x2b3542 + ":force_original_aspect_ratio=decrease", "pad=" + _0x739a45 + ":" + _0x2b3542 + ":(ow-iw)/2:(oh-ih)/2:" + this._bgFillColor(), "setsar=1");
      }
      if (_0xd8788b) {
        _0x325120.push("fps=" + Math.round(_0x1d5ad6));
      }
      _0x18208e.filterComplex += "; [vscale_in]" + _0x325120.join(",") + "[vout]";
      return true;
    }
    _appendWatermarkStage(_0x2e0aba, {
      videoWidth: _0x5a4fca,
      videoHeight: _0x590b4d,
      ttsCount: _0x57ba30,
      mediaCount: _0x4c59c8,
      profile: _0x592f96,
      assetPath: _0x5ae7c4,
      durationSec: _0x1112a0
    }) {
      if (!_0x592f96) {
        return null;
      }
      if (_0x592f96 !== _0x4cb40f) {
        throw new _0x45bb3a("watermark_profile_unknown", "Hồ sơ watermark không hợp lệ: " + _0x592f96, {
          watermark_profile: _0x592f96
        });
      }
      let _0x67fe4 = 1 + _0x57ba30 + _0x4c59c8;
      let _0x249c71 = Number.isFinite(_0x5a4fca) && _0x5a4fca > 0 ? Math.round(_0x5a4fca) : 1920;
      let _0x36e210 = Number.isFinite(_0x590b4d) && _0x590b4d > 0 ? Math.round(_0x590b4d) : 1080;
      let _0x20b4d2 = Math.min(_0x249c71, _0x36e210);
      let _0x14e050 = Math.round(_0x20b4d2 * 0.4 / 2) * 2;
      let _0x2bf94d = Math.max(2, Math.min(_0x14e050, Math.round(_0x20b4d2 * 0.42)));
      let _0x4485c5 = 0.6;
      let _0x57d334 = _0x19b7c2(_0x1112a0);
      let _0x13a410 = _0x620867 => _0x620867.toFixed(4) + "*(W-w)";
      let _0x47622f = _0x387424 => _0x387424.toFixed(4) + "*(H-h)";
      let _0x1f0553 = (_0x5b8a59, _0x482895) => _0x482895 ? "gte(t," + _0x5b8a59.start.toFixed(3) + ")" : "(gte(t," + _0x5b8a59.start.toFixed(3) + ")*lt(t," + _0x5b8a59.end.toFixed(3) + "))";
      let _0x2b9b4f = _0x3d75fe(_0x57d334.map((_0x151e5f, _0x399f56) => _0x1f0553(_0x151e5f, _0x399f56 === _0x57d334.length - 1) + "*" + _0x13a410(_0x151e5f.nx)));
      let _0x219acf = _0x3d75fe(_0x57d334.map((_0xae96bc, _0x452a95) => _0x1f0553(_0xae96bc, _0x452a95 === _0x57d334.length - 1) + "*" + _0x47622f(_0xae96bc.ny)));
      let _0x39c43b = "[vcontent]";
      if (_0x2e0aba.filterComplex.endsWith("[vout]")) {
        _0x2e0aba.filterComplex = _0x2e0aba.filterComplex.slice(0, -6) + _0x39c43b;
      } else {
        let _0x2ecc9c = _0x2e0aba.filterComplex.lastIndexOf("[vout]");
        _0x2e0aba.filterComplex = _0x2e0aba.filterComplex.slice(0, _0x2ecc9c) + _0x39c43b + _0x2e0aba.filterComplex.slice(_0x2ecc9c + 6);
      }
      let _0x3d7a2e = "[" + _0x67fe4 + ":v]format=rgba,colorchannelmixer=aa=" + _0x4485c5 + ",scale=" + _0x2bf94d + ":-1[ezwm]";
      let _0x860c89 = _0x39c43b + "[ezwm]overlay=x='" + _0x2b9b4f + "':y='" + _0x219acf + "'[vout]";
      _0x2e0aba.filterComplex += "; " + _0x3d7a2e + "; " + _0x860c89;
      return {
        index: _0x67fe4,
        path: _0x5ae7c4 || null,
        profile: _0x592f96
      };
    }
    _bgFillColor() {
      if (this._bg && this._bg.mode === "solid") {
        return this.parseColorToFfmpeg(this._bg.color, 1);
      } else {
        return "black";
      }
    }
    _bgGradientSource(_0x235554, _0x49144f, _0x5d4ffc) {
      let _0x4ab960 = this._bg;
      let _0x370d89 = this.parseColorToFfmpeg(_0x4ab960.color, 1);
      let _0x55db7a = this.parseColorToFfmpeg(_0x4ab960.color2, 1);
      let _0x163b24 = {
        45: [0, _0x49144f, _0x235554, 0],
        90: [0, Math.round(_0x49144f / 2), _0x235554, Math.round(_0x49144f / 2)],
        135: [0, 0, _0x235554, _0x49144f],
        180: [Math.round(_0x235554 / 2), 0, Math.round(_0x235554 / 2), _0x49144f]
      }[_0x4ab960.angle] || [Math.round(_0x235554 / 2), 0, Math.round(_0x235554 / 2), _0x49144f];
      return "gradients=s=" + _0x235554 + "x" + _0x49144f + ":c0=" + _0x370d89 + ":c1=" + _0x55db7a + ":x0=" + _0x163b24[0] + ":y0=" + _0x163b24[1] + ":x1=" + _0x163b24[2] + ":y1=" + _0x163b24[3] + ":nb_colors=2:speed=0.00001:rate=" + (this._bgFps || 30) + ":duration=" + Number(_0x5d4ffc).toFixed(4);
    }
    _bgBlurCoverChain(_0x27c973, _0x193acd) {
      let _0x3f93bb = Math.max(2, Math.round(_0x193acd * 320 / _0x27c973 / 2) * 2);
      let _0x43c4e6 = Math.max(0.5, Number(this._bg.blur || 24) * 320 / _0x27c973).toFixed(2);
      return "scale=" + _0x27c973 + ":" + _0x193acd + ":force_original_aspect_ratio=increase,crop=" + _0x27c973 + ":" + _0x193acd + ",scale=320:" + _0x3f93bb + ",gblur=sigma=" + _0x43c4e6 + ",scale=" + _0x27c973 + ":" + _0x193acd + ",setsar=1";
    }
    _placementRect(_0x5d00ac, _0x34aebb, _0x37d6d8) {
      let _0x860232 = [_0x5d00ac && _0x5d00ac.xN, _0x5d00ac && _0x5d00ac.yN, _0x5d00ac && _0x5d00ac.wN, _0x5d00ac && _0x5d00ac.hN].every(_0x2e6e10 => typeof _0x2e6e10 == "number" && isFinite(_0x2e6e10));
      let _0xd04004 = _0x860232 && _0x5d00ac.wN > 0 && _0x5d00ac.hN > 0;
      if (!this._comp) {
        if (_0x5d00ac && _0x5d00ac.hasBeenTransformed && _0x860232) {
          return {
            x: _0x5d00ac.xN * _0x34aebb,
            y: _0x5d00ac.yN * _0x37d6d8,
            width: _0x5d00ac.wN * _0x34aebb,
            height: _0x5d00ac.hN * _0x37d6d8
          };
        } else {
          return null;
        }
      }
      let _0xfb133a = _0xd04004 ? {
        x: _0x5d00ac.xN * _0x34aebb,
        y: _0x5d00ac.yN * _0x37d6d8,
        width: _0x5d00ac.wN * _0x34aebb,
        height: _0x5d00ac.hN * _0x37d6d8
      } : {
        x: 0,
        y: 0,
        width: _0x34aebb,
        height: _0x37d6d8
      };
      return _0x17c587(this._srcW, this._srcH, _0xfb133a);
    }
    _composeVideoTransform(_0x5af2a6, _0x28fdad, _0x204508, _0xacc18f, _0x1a504b, _0x221f86, _0x152bbe = null) {
      let _0x355ee6 = this._placementRect(_0x204508, _0xacc18f, _0x1a504b);
      if (!_0x355ee6) {
        _0x5af2a6.push(_0x28fdad + "null" + _0x221f86);
        return _0x221f86;
      }
      let _0xb9d553 = _0x36b4c9 => Math.max(2, Math.round(_0x36b4c9 / 2) * 2);
      let _0x2cd12d = _0x3e76a4 => Math.max(0, Math.floor(_0x3e76a4 / 2) * 2);
      let _0x21f561 = _0xb9d553(_0x355ee6.width);
      let _0x386bb9 = _0xb9d553(_0x355ee6.height);
      let _0x3a0957 = Math.round(_0x355ee6.x);
      let _0x424a45 = Math.round(_0x355ee6.y);
      if (this._comp && _0x3a0957 === 0 && _0x424a45 === 0 && _0x21f561 === _0xacc18f && _0x386bb9 === _0x1a504b) {
        _0x5af2a6.push(this._srcW === _0xacc18f && this._srcH === _0x1a504b ? _0x28fdad + "null" + _0x221f86 : _0x28fdad + "scale=" + _0xacc18f + ":" + _0x1a504b + ",setsar=1" + _0x221f86);
        return _0x221f86;
      }
      let _0xa31b97 = Math.max(0, _0x3a0957);
      let _0x2b7573 = Math.max(0, _0x424a45);
      let _0x4e4707 = Math.min(_0xacc18f, _0x3a0957 + _0x21f561);
      let _0x543132 = Math.min(_0x1a504b, _0x424a45 + _0x386bb9);
      let _0x42c029 = this._bg ? this._bg.mode : null;
      let _0x18fb2f = "bgx" + _0x221f86.replace(/[^a-zA-Z0-9]/g, "");
      if (_0x4e4707 - _0xa31b97 < 2 || _0x543132 - _0x2b7573 < 2) {
        if (_0x42c029 === "blur") {
          _0x5af2a6.push("" + _0x28fdad + this._bgBlurCoverChain(_0xacc18f, _0x1a504b) + _0x221f86);
        } else if (_0x42c029 === "gradient" && _0x152bbe != null) {
          _0x5af2a6.push(_0x28fdad + "scale=" + _0xacc18f + ":" + _0x1a504b + ",setsar=1[" + _0x18fb2f + "b]");
          _0x5af2a6.push(this._bgGradientSource(_0xacc18f, _0x1a504b, _0x152bbe) + "[" + _0x18fb2f + "g]");
          _0x5af2a6.push("[" + _0x18fb2f + "b][" + _0x18fb2f + "g]overlay=0:0:shortest=1,setsar=1" + _0x221f86);
        } else {
          _0x5af2a6.push(_0x28fdad + "scale=" + _0xacc18f + ":" + _0x1a504b + ",drawbox=0:0:" + _0xacc18f + ":" + _0x1a504b + ":" + this._bgFillColor() + ":t=fill,setsar=1" + _0x221f86);
        }
        return _0x221f86;
      }
      let _0x33eacd = _0x2cd12d(_0xa31b97 - _0x3a0957);
      let _0x59cb06 = _0x2cd12d(_0x2b7573 - _0x424a45);
      let _0xc9a4da = _0xb9d553(_0x4e4707 - _0xa31b97);
      let _0x323919 = _0xb9d553(_0x543132 - _0x2b7573);
      if (_0x33eacd + _0xc9a4da > _0x21f561) {
        _0xc9a4da = Math.max(2, _0x2cd12d(_0x21f561 - _0x33eacd));
      }
      if (_0x59cb06 + _0x323919 > _0x386bb9) {
        _0x323919 = Math.max(2, _0x2cd12d(_0x386bb9 - _0x59cb06));
      }
      let _0x5cdb6d = _0x2cd12d(_0xa31b97);
      let _0x4b6b83 = _0x2cd12d(_0x2b7573);
      if (_0x5cdb6d + _0xc9a4da > _0xacc18f) {
        _0x5cdb6d = _0x2cd12d(_0xacc18f - _0xc9a4da);
      }
      if (_0x4b6b83 + _0x323919 > _0x1a504b) {
        _0x4b6b83 = _0x2cd12d(_0x1a504b - _0x323919);
      }
      let _0x293575 = _0x33eacd === 0 && _0x59cb06 === 0 && _0xc9a4da === _0x21f561 && _0x323919 === _0x386bb9 ? "scale=" + _0x21f561 + ":" + _0x386bb9 : "scale=" + _0x21f561 + ":" + _0x386bb9 + ",crop=" + _0xc9a4da + ":" + _0x323919 + ":" + _0x33eacd + ":" + _0x59cb06;
      if (_0x42c029 === "blur") {
        _0x5af2a6.push(_0x28fdad + "split=2[" + _0x18fb2f + "bs][" + _0x18fb2f + "fs]");
        _0x5af2a6.push("[" + _0x18fb2f + "bs]" + this._bgBlurCoverChain(_0xacc18f, _0x1a504b) + "[" + _0x18fb2f + "bg]");
        _0x5af2a6.push("[" + _0x18fb2f + "fs]" + _0x293575 + "[" + _0x18fb2f + "fg]");
        _0x5af2a6.push("[" + _0x18fb2f + "bg][" + _0x18fb2f + "fg]overlay=" + _0x5cdb6d + ":" + _0x4b6b83 + ",setsar=1" + _0x221f86);
      } else if (_0x42c029 === "gradient" && _0x152bbe != null) {
        _0x5af2a6.push(this._bgGradientSource(_0xacc18f, _0x1a504b, _0x152bbe) + "[" + _0x18fb2f + "bg]");
        _0x5af2a6.push("" + _0x28fdad + _0x293575 + "[" + _0x18fb2f + "fg]");
        _0x5af2a6.push("[" + _0x18fb2f + "bg][" + _0x18fb2f + "fg]overlay=" + _0x5cdb6d + ":" + _0x4b6b83 + ":shortest=1,setsar=1" + _0x221f86);
      } else {
        _0x5af2a6.push("" + _0x28fdad + _0x293575 + ",pad=" + _0xacc18f + ":" + _0x1a504b + ":" + _0x5cdb6d + ":" + _0x4b6b83 + ":" + this._bgFillColor() + ",setsar=1" + _0x221f86);
      }
      return _0x221f86;
    }
    _emitTimeSlicedSync(_0x2b0c89, _0x4a0699, _0x4bed8a, _0x249a07, _0x484b2c, _0x5671b6) {
      let _0x639fae = _0x1818d0 => {
        let _0x223a83 = [..._0x1818d0].sort((_0x41fea4, _0x306db6) => _0x41fea4[0] - _0x306db6[0]);
        let _0x4c3e2f = [];
        for (let _0x5114d0 of _0x223a83) {
          let _0x530229 = _0x4c3e2f[_0x4c3e2f.length - 1];
          if (_0x530229 && _0x5114d0[0] <= _0x530229[1]) {
            _0x530229[1] = Math.max(_0x530229[1], _0x5114d0[1]);
          } else {
            _0x4c3e2f.push([_0x5114d0[0], _0x5114d0[1]]);
          }
        }
        return _0x4c3e2f;
      };
      let _0x55faab = _0x249a07.map(_0x1bde37 => _0x639fae(_0x1bde37.wins));
      let _0x283522 = _0x2c187d(_0x55faab);
      let _0x4569e2 = (_0x25cead, _0xc10956, _0x41d210, _0x905a75) => {
        let _0xd4802a = _0x41d210.t0;
        let _0x1f0f4e = _0x41d210.t1;
        let _0x362e4e = _0x25cead;
        _0x41d210.active.forEach((_0x5f2f89, _0x3b68a8) => {
          let _0x3f736c = _0x249a07[_0x5f2f89];
          let _0x3a4a20 = _0x55faab[_0x5f2f89].filter(([_0x7b87b7, _0x4749ef]) => _0x4749ef > _0xd4802a && (_0x1f0f4e === null || _0x7b87b7 < _0x1f0f4e));
          let _0x1b7490 = _0x3a4a20.length === 1 && _0x3a4a20[0][0] <= _0xd4802a && _0x1f0f4e !== null && _0x3a4a20[0][1] >= _0x1f0f4e ? null : "(" + _0x3d75fe(_0x3a4a20.map(([_0x5a8151, _0x243771]) => "between(t," + (_0x5a8151 - _0xd4802a).toFixed(3) + "," + (_0x243771 - _0xd4802a).toFixed(3) + ")")) + ")";
          let _0x572de5 = _0x3b68a8 === _0x41d210.active.length - 1 ? _0xc10956 : "[v_tsg" + _0x484b2c + _0x905a75 + "_" + _0x3b68a8 + "]";
          _0x5671b6(_0x3f736c.x, _0x3f736c.y, _0x3f736c.w, _0x3f736c.h, _0x1b7490, _0x362e4e, _0x572de5, _0x905a75 + "g" + _0x5f2f89);
          _0x362e4e = _0x572de5;
        });
      };
      if (_0x283522.length === 1) {
        if (_0x283522[0].active.length) {
          _0x4569e2(_0x4a0699, _0x4bed8a, _0x283522[0], "_w");
        } else {
          _0x2b0c89.push(_0x4a0699 + "null" + _0x4bed8a);
        }
        return;
      }
      let _0x207a9f = _0x283522.length;
      _0x2b0c89.push(_0x4a0699 + "split=" + _0x207a9f + _0x283522.map((_0x19dc31, _0x1c120c) => "[v_tsp" + _0x484b2c + "_" + _0x1c120c + "]").join(""));
      let _0x57cc34 = [];
      _0x283522.forEach((_0x4d5ec3, _0x2a83bf) => {
        let _0x535ecc = _0x4d5ec3.t1 === null ? "start=" + _0x4d5ec3.t0.toFixed(3) : "start=" + _0x4d5ec3.t0.toFixed(3) + ":end=" + _0x4d5ec3.t1.toFixed(3);
        let _0x1d99e7 = "setpts=PTS-STARTPTS";
        let _0xe21c4b = "[v_tso" + _0x484b2c + "_" + _0x2a83bf + "]";
        if (_0x4d5ec3.active.length) {
          let _0x21c6a4 = "[v_tst" + _0x484b2c + "_" + _0x2a83bf + "]";
          _0x2b0c89.push("[v_tsp" + _0x484b2c + "_" + _0x2a83bf + "]trim=" + _0x535ecc + "," + _0x1d99e7 + _0x21c6a4);
          _0x4569e2(_0x21c6a4, _0xe21c4b, _0x4d5ec3, "_s" + _0x2a83bf);
        } else {
          _0x2b0c89.push("[v_tsp" + _0x484b2c + "_" + _0x2a83bf + "]trim=" + _0x535ecc + "," + _0x1d99e7 + _0xe21c4b);
        }
        _0x57cc34.push(_0xe21c4b);
      });
      _0x2b0c89.push(_0x57cc34.join("") + "concat=n=" + _0x207a9f + ":v=1:a=0" + _0x4bed8a);
    }
    _isTransformedSeg(_0x2a2288) {
      return _0x2a2288 && _0x2a2288.hasBeenTransformed && [_0x2a2288.xN, _0x2a2288.yN, _0x2a2288.wN, _0x2a2288.hN].every(_0x39a8f7 => typeof _0x39a8f7 == "number" && isFinite(_0x39a8f7));
    }
    _needsCompose(_0x1b398c, _0x3d62f9, _0x461290) {
      if (!this._comp) {
        return this._isTransformedSeg(_0x1b398c);
      }
      let _0x47c6e5 = this._placementRect(_0x1b398c, _0x3d62f9, _0x461290);
      if (!_0x47c6e5) {
        return false;
      }
      let _0x1beda1 = _0x529a21 => Math.max(2, Math.round(_0x529a21 / 2) * 2);
      return Math.round(_0x47c6e5.x) !== 0 || Math.round(_0x47c6e5.y) !== 0 || _0x1beda1(_0x47c6e5.width) !== _0x3d62f9 || _0x1beda1(_0x47c6e5.height) !== _0x461290 || this._srcW !== _0x3d62f9 || this._srcH !== _0x461290;
    }
    _buildBaseTracks(_0x4039f6, _0x41ae5b, _0x531998, _0x12714f, _0x55d222, _0x2fb02d = null, _0x5409d2 = 0) {
      let _0x9c6329 = "[" + _0x5409d2 + ":a]";
      let _0x1f3a43 = _0x4bc868 => _0x55d222.push(_0x4bc868);
      if (!_0x4039f6 || _0x4039f6.length === 0) {
        let _0x18517d = {
          hasBeenTransformed: false
        };
        if (this._needsCompose(_0x18517d, _0x531998, _0x12714f)) {
          this._composeVideoTransform(_0x55d222, "[0:v]", _0x18517d, _0x531998, _0x12714f, "[vbase]", _0x2fb02d);
        } else {
          _0x55d222.push("[0:v]null[vbase]");
        }
        if (_0x41ae5b) {
          _0x1f3a43(_0x9c6329 + "anull[abase]");
        }
        return;
      }
      let _0x34859b = [..._0x4039f6].sort((_0x59a3bd, _0x2e1a5b) => _0x59a3bd.startTime - _0x2e1a5b.startTime);
      let _0x3e1cfe = _0x34859b.length;
      if (_0x3e1cfe === 1 && _0x34859b[0].startTime === 0) {
        let _0x40e138 = _0x34859b[0];
        let _0x13642d = (_0x40e138.trimStart || 0).toFixed(4);
        let _0x398603 = ((_0x40e138.trimStart || 0) + (_0x40e138.endTime - _0x40e138.startTime)).toFixed(4);
        if (this._needsCompose(_0x40e138, _0x531998, _0x12714f)) {
          _0x55d222.push("[0:v]trim=start=" + _0x13642d + ":end=" + _0x398603 + ",setpts=PTS-STARTPTS[vt0]");
          this._composeVideoTransform(_0x55d222, "[vt0]", _0x40e138, _0x531998, _0x12714f, "[vbase]", _0x40e138.endTime - _0x40e138.startTime);
        } else {
          _0x55d222.push("[0:v]trim=start=" + _0x13642d + ":end=" + _0x398603 + ",setpts=PTS-STARTPTS[vbase]");
        }
        if (_0x41ae5b) {
          _0x1f3a43(_0x9c6329 + "atrim=start=" + _0x13642d + ":end=" + _0x398603 + ",asetpts=PTS-STARTPTS[abase]");
        }
        return;
      }
      let _0x5d4994 = _0x3e1cfe > 1;
      if (_0x5d4994) {
        _0x55d222.push("[0:v]split=" + _0x3e1cfe + _0x34859b.map((_0x1c1c0c, _0x5caeca) => "[vsrc" + _0x5caeca + "]").join(""));
        if (_0x41ae5b) {
          _0x1f3a43(_0x9c6329 + "asplit=" + _0x3e1cfe + _0x34859b.map((_0x556621, _0x424a16) => "[asrc" + _0x424a16 + "]").join(""));
        }
      }
      let _0x4265e6 = 0;
      let _0x49e3f2 = [];
      let _0x3de6df = [];
      _0x34859b.forEach((_0x1fc7e9, _0x85db04) => {
        if (_0x1fc7e9.startTime > _0x4265e6 + 0.01) {
          let _0x20ea33 = _0x1fc7e9.startTime - _0x4265e6;
          let _0x1374ff = "[vgap" + _0x85db04 + "]";
          let _0x24836a = "[agap" + _0x85db04 + "]";
          if (this._bg && this._bg.mode === "gradient") {
            _0x55d222.push("" + this._bgGradientSource(_0x531998, _0x12714f, _0x20ea33) + _0x1374ff);
          } else {
            _0x55d222.push("color=c=" + this._bgFillColor() + ":s=" + _0x531998 + "x" + _0x12714f + ":d=" + _0x20ea33 + _0x1374ff);
          }
          if (_0x41ae5b) {
            _0x1f3a43("anullsrc=cl=stereo:d=" + _0x20ea33 + _0x24836a);
          }
          _0x49e3f2.push(_0x1374ff);
          _0x3de6df.push(_0x24836a);
        }
        let _0x51a1a3 = (_0x1fc7e9.trimStart || 0).toFixed(4);
        let _0x307ae1 = ((_0x1fc7e9.trimStart || 0) + (_0x1fc7e9.endTime - _0x1fc7e9.startTime)).toFixed(4);
        let _0x4f9735 = "[vseg" + _0x85db04 + "]";
        let _0x459396 = "[aseg" + _0x85db04 + "]";
        let _0x2dc889 = _0x5d4994 ? "[vsrc" + _0x85db04 + "]" : "[0:v]";
        let _0x380369 = _0x5d4994 ? "[asrc" + _0x85db04 + "]" : _0x9c6329;
        _0x55d222.push(_0x2dc889 + "trim=start=" + _0x51a1a3 + ":end=" + _0x307ae1 + ",setpts=PTS-STARTPTS" + _0x4f9735);
        if (_0x41ae5b) {
          _0x1f3a43(_0x380369 + "atrim=start=" + _0x51a1a3 + ":end=" + _0x307ae1 + ",asetpts=PTS-STARTPTS" + _0x459396);
          _0x3de6df.push(_0x459396);
        }
        if (this._needsCompose(_0x1fc7e9, _0x531998, _0x12714f)) {
          let _0x2d8fd7 = "[vsegT" + _0x85db04 + "]";
          this._composeVideoTransform(_0x55d222, _0x4f9735, _0x1fc7e9, _0x531998, _0x12714f, _0x2d8fd7, _0x1fc7e9.endTime - _0x1fc7e9.startTime);
          _0x49e3f2.push(_0x2d8fd7);
        } else {
          _0x49e3f2.push(_0x4f9735);
        }
        _0x4265e6 = _0x1fc7e9.endTime;
      });
      let _0x57b518 = _0x49e3f2.length;
      _0x55d222.push(_0x49e3f2.join("") + "concat=n=" + _0x57b518 + ":v=1:a=0[vbase]");
      if (_0x41ae5b) {
        let _0xee5a6c = _0x3de6df.length;
        _0x1f3a43(_0x3de6df.join("") + "concat=n=" + _0xee5a6c + ":v=0:a=1[abase]");
      }
    }
    _renderVisualLayers(_0xdb8bd5, _0x1e365c, _0x54fa5a, _0x4ea354, _0x239f4b, _0x4c5d48, _0x462fab = _0x4ea354, _0x3cf954 = null) {
      let _0x511624 = _0x1e365c;
      let _0xfb3923 = _0x57e51f => [..._0x57e51f].sort((_0x211512, _0x3efae8) => (_0x211512 && _0x211512.layer || 1) - (_0x3efae8 && _0x3efae8.layer || 1));
      [..._0xfb3923(_0x54fa5a.filter(_0x4d85ba => _0x4d85ba && _0x4d85ba.type === "filter")), ..._0xfb3923(_0x54fa5a.filter(_0x587397 => !_0x587397 || _0x587397.type !== "filter"))].forEach((_0x5aaa4b, _0x3406bb) => {
        let _0x253217 = "[v_ov" + _0x3406bb + "]";
        let _0x468ad4 = _0x5aaa4b.realX !== undefined ? _0x5aaa4b.realX : _0x5aaa4b.x || 0;
        let _0x485a68 = _0x5aaa4b.realY !== undefined ? _0x5aaa4b.realY : _0x5aaa4b.y || 0;
        let _0x3824c6 = _0x5aaa4b.realWidth !== undefined ? _0x5aaa4b.realWidth : _0x5aaa4b.width || 10;
        let _0x145c29 = _0x5aaa4b.realHeight !== undefined ? _0x5aaa4b.realHeight : _0x5aaa4b.height || 10;
        let _0x51a45c = Math.max(2, _0x3824c6);
        let _0x4735cd = Math.max(2, _0x145c29);
        let _0x325cfc = _0x5aaa4b.startTime.toFixed(3);
        let _0x36d055 = _0x5aaa4b.endTime.toFixed(3);
        let _0x172770 = "between(t," + _0x325cfc + "," + _0x36d055 + ")";
        let _0x2ad478 = _0x5aaa4b.type === "blur" && !!_0x5aaa4b.syncSubtitles && Array.isArray(_0x462fab) && _0x462fab.length > 0;
        if (_0x5aaa4b.type !== "filter" && _0x5aaa4b.type !== "audio" && !_0x2ad478 && (_0x5aaa4b.realVisible === false || !(_0x3824c6 >= 2) || !(_0x145c29 >= 2))) {
          _0xdb8bd5.push(_0x511624 + "null" + _0x253217);
          _0x511624 = _0x253217;
          return;
        }
        if (_0x5aaa4b.type === "blur") {
          let _0x1ae17d = ["gaussian", "pixelate", "blurStrip", "frostedGlass", "removeLogo", "removeSubtitle"];
          let _0x13cf50 = _0x5aaa4b.blurStyle && _0x1ae17d.includes(_0x5aaa4b.blurStyle) ? _0x5aaa4b.blurStyle : "gaussian";
          let _0x367387 = Math.max(2, Math.floor(_0x51a45c / 2) * 2);
          let _0x1347ad = Math.max(2, Math.floor(_0x4735cd / 2) * 2);
          let _0x33e126 = Math.floor(_0x468ad4 / 2) * 2;
          let _0x592a02 = Math.floor(_0x485a68 / 2) * 2;
          let _0x373caf = Math.min(_0x239f4b || 1920, _0x4c5d48 || 1080);
          let _0x25823c = _0x239f4b || 1920;
          let _0x14acd8 = _0x4c5d48 || 1080;
          let _0x39a134 = Number.isFinite(_0x5aaa4b.softness) ? Math.min(1, Math.max(0, _0x5aaa4b.softness)) : 0.5;
          let _0x5690fb = (_0x48827f, _0x485dc8) => {
            let _0x17a0d2 = Math.floor((Math.min(_0x48827f, _0x485dc8) - 2) / 2);
            return Math.max(0, Math.min(_0x17a0d2, Math.round(_0x39a134 * Math.min(_0x48827f, _0x485dc8) * 0.12)));
          };
          let _0x5856bb = (_0x3ab89d, _0x1699fc, _0x142dcc, _0x5abb0f = _0x511624, _0x1ded56 = _0x253217, _0x3d8af2 = _0x172770, _0x5b7856 = "") => {
            let _0x25fb5a = "[v_bsA" + _0x3406bb + _0x5b7856 + "]";
            let _0x22c36a = "[v_bsB" + _0x3406bb + _0x5b7856 + "]";
            let _0x332bfa = "[v_bl" + _0x3406bb + _0x5b7856 + "]";
            let _0x4f6016 = _0x3d8af2 ? ":enable='" + _0x3d8af2 + "'" : "";
            _0xdb8bd5.push(_0x5abb0f + "split" + _0x25fb5a + _0x22c36a);
            _0xdb8bd5.push("" + _0x22c36a + _0x3ab89d + _0x332bfa);
            _0xdb8bd5.push("" + _0x25fb5a + _0x332bfa + "overlay=" + _0x1699fc + ":" + _0x142dcc + _0x4f6016 + _0x1ded56);
          };
          let _0x378080 = (_0x12e1f8, _0x2eaaa6, _0xaeb471, _0x255397, _0x3e1130, _0x15a7bb = _0x511624, _0x3ddf1e = _0x253217, _0x1d4a00 = _0x172770, _0x2b8f5d = "") => {
            let _0x23f089 = _0x5690fb(_0x2eaaa6, _0xaeb471);
            if (_0x23f089 < 1) {
              _0x5856bb(_0x12e1f8, _0x255397, _0x3e1130, _0x15a7bb, _0x3ddf1e, _0x1d4a00, _0x2b8f5d);
              return;
            }
            let _0x55b54b = Math.max(2, _0x2eaaa6 - _0x23f089 * 2);
            let _0x19b3de = Math.max(2, _0xaeb471 - _0x23f089 * 2);
            let _0x2f009c = "[v_pr" + _0x3406bb + _0x2b8f5d + "]";
            let _0x40f204 = "[v_pm" + _0x3406bb + _0x2b8f5d + "]";
            let _0x76cb1f = "[v_msk" + _0x3406bb + _0x2b8f5d + "]";
            let _0x211f25 = "[v_bsA" + _0x3406bb + _0x2b8f5d + "]";
            let _0x199177 = "[v_bsB" + _0x3406bb + _0x2b8f5d + "]";
            let _0x241894 = "[v_bl" + _0x3406bb + _0x2b8f5d + "]";
            _0xdb8bd5.push(_0x15a7bb + "split" + _0x211f25 + _0x199177);
            _0xdb8bd5.push("" + _0x199177 + _0x12e1f8 + ",format=yuva420p,split" + _0x2f009c + _0x40f204);
            _0xdb8bd5.push(_0x40f204 + "drawbox=x=0:y=0:w=" + _0x2eaaa6 + ":h=" + _0xaeb471 + ":color=black:t=fill,drawbox=x=" + _0x23f089 + ":y=" + _0x23f089 + ":w=" + _0x55b54b + ":h=" + _0x19b3de + ":color=white:t=fill,boxblur=" + _0x23f089 + ":1,format=gray" + _0x76cb1f);
            _0xdb8bd5.push("" + _0x2f009c + _0x76cb1f + "alphamerge" + _0x241894);
            let _0x370b52 = _0x1d4a00 ? ":enable='" + _0x1d4a00 + "'" : "";
            _0xdb8bd5.push("" + _0x211f25 + _0x241894 + "overlay=" + _0x255397 + ":" + _0x3e1130 + _0x370b52 + _0x3ddf1e);
          };
          let _0x41ffdf = Number.isFinite(_0x5aaa4b.realDelogoBand) ? _0x5aaa4b.realDelogoBand : Math.max(2, Math.round((_0x5aaa4b.delogoBand || 4) * (_0x25823c / 1280)));
          let _0x20f06d = (_0x40dcc6, _0x3989b4, _0x3f53f6, _0x5f1cf7, _0x12ae63, _0x225726, _0x3514d6, _0x494930) => {
            let _0x5f465b = Math.max(2, Math.floor(_0x3f53f6 / 2) * 2);
            let _0x21c6c5 = Math.max(2, Math.floor(_0x5f1cf7 / 2) * 2);
            let _0x439c1b = Math.floor(_0x40dcc6 / 2) * 2;
            let _0x2a7b9f = Math.floor(_0x3989b4 / 2) * 2;
            if (_0x13cf50 === "pixelate") {
              let _0x3d516b = Number.isFinite(_0x5aaa4b.realPixelSize) ? _0x5aaa4b.realPixelSize : Math.max(6, Math.round((_0x5aaa4b.pixelSize || 16) * (_0x25823c / 1280)));
              let _0x2f3256 = Math.max(2, Math.min(_0x3d516b, Math.floor(Math.min(_0x5f465b, _0x21c6c5) / 2) || 2));
              let _0x4b045a = Math.max(1, Math.floor(_0x5f465b / _0x2f3256));
              let _0x4b39bd = Math.max(1, Math.floor(_0x21c6c5 / _0x2f3256));
              _0x378080("crop=" + _0x5f465b + ":" + _0x21c6c5 + ":" + _0x439c1b + ":" + _0x2a7b9f + ",scale=" + _0x4b045a + ":" + _0x4b39bd + ":flags=area,scale=" + _0x5f465b + ":" + _0x21c6c5 + ":flags=neighbor", _0x5f465b, _0x21c6c5, _0x439c1b, _0x2a7b9f, _0x225726, _0x3514d6, _0x12ae63, _0x494930);
            } else if (_0x13cf50 === "removeLogo" || _0x13cf50 === "removeSubtitle") {
              let _0x1ec3f8 = Math.max(_0x41ffdf + 2, Math.round(Math.min(_0x5f465b, _0x21c6c5) * 0.2));
              let _0x5ee8a6 = Math.floor(Math.max(0, _0x439c1b - _0x1ec3f8) / 2) * 2;
              let _0x30476 = Math.floor(Math.max(0, _0x2a7b9f - _0x1ec3f8) / 2) * 2;
              let _0x2f25a2 = Math.floor(Math.min(_0x25823c, _0x439c1b + _0x5f465b + _0x1ec3f8) / 2) * 2;
              let _0x51c9aa = Math.floor(Math.min(_0x14acd8, _0x2a7b9f + _0x21c6c5 + _0x1ec3f8) / 2) * 2;
              let _0x4beab0 = Math.max(4, _0x2f25a2 - _0x5ee8a6);
              let _0x35882d = Math.max(4, _0x51c9aa - _0x30476);
              let _0x4773cf = Math.max(1, _0x439c1b - _0x5ee8a6);
              let _0x2d35cf = Math.max(1, _0x2a7b9f - _0x30476);
              let _0x44d758 = _0x5f465b;
              let _0x22f2b4 = _0x21c6c5;
              if (_0x4773cf + _0x44d758 > _0x4beab0 - 1) {
                _0x44d758 = _0x4beab0 - 1 - _0x4773cf;
              }
              if (_0x2d35cf + _0x22f2b4 > _0x35882d - 1) {
                _0x22f2b4 = _0x35882d - 1 - _0x2d35cf;
              }
              _0x44d758 = Math.max(1, _0x44d758);
              _0x22f2b4 = Math.max(1, _0x22f2b4);
              let _0x3c40be = Math.max(0, Math.min(_0x439c1b - _0x5ee8a6, _0x4beab0 - 2));
              let _0xb94248 = Math.max(0, Math.min(_0x2a7b9f - _0x30476, _0x35882d - 2));
              let _0x25b44f = Math.min(_0x5f465b, _0x4beab0 - _0x3c40be);
              let _0xee8f68 = Math.min(_0x21c6c5, _0x35882d - _0xb94248);
              _0x25b44f = Math.max(2, _0x25b44f - _0x25b44f % 2);
              _0xee8f68 = Math.max(2, _0xee8f68 - _0xee8f68 % 2);
              _0x378080("crop=" + _0x4beab0 + ":" + _0x35882d + ":" + _0x5ee8a6 + ":" + _0x30476 + ",delogo=x=" + _0x4773cf + ":y=" + _0x2d35cf + ":w=" + _0x44d758 + ":h=" + _0x22f2b4 + ",crop=" + _0x25b44f + ":" + _0xee8f68 + ":" + _0x3c40be + ":" + _0xb94248, _0x25b44f, _0xee8f68, _0x439c1b, _0x2a7b9f, _0x225726, _0x3514d6, _0x12ae63, _0x494930);
            } else {
              let _0x332c23 = _0x5aaa4b.blurOpacity !== undefined ? _0x5aaa4b.blurOpacity : 100;
              let _0x22dc37 = Math.min(1, Math.max(0, _0x332c23 / 100));
              let _0xa0e505 = Math.min(5, Math.max(1, _0x332c23 / 100));
              let _0x620200 = (Number.isFinite(_0x5aaa4b.realBlurRadius) ? _0x5aaa4b.realBlurRadius : null) || Math.max(20, Math.round(_0x373caf / 25));
              let _0x5bee21 = Math.round(_0x620200 * _0xa0e505);
              let _0x4ed3b9 = Math.min(_0x5f465b, _0x21c6c5);
              let _0x19f157 = Math.floor((_0x4ed3b9 - 1) / 2);
              let _0x44f8a9 = Math.floor((_0x4ed3b9 - 1) / 4);
              let _0x55458c = Math.max(0, Math.min(_0x5bee21, _0x19f157));
              let _0x3e4835 = Math.max(0, Math.min(_0x55458c, _0x44f8a9));
              let _0x35f660 = 2;
              let _0x546d32 = "crop=" + _0x5f465b + ":" + _0x21c6c5 + ":" + _0x439c1b + ":" + _0x2a7b9f + ",boxblur=luma_radius=" + _0x55458c + ":luma_power=" + _0x35f660 + ":chroma_radius=" + _0x3e4835 + ":chroma_power=" + _0x35f660;
              if (_0x13cf50 === "blurStrip") {
                let _0x5e7930 = Math.min(1, Math.max(0, (_0x5aaa4b.stripDarkness !== undefined ? _0x5aaa4b.stripDarkness : 35) / 100));
                let _0x21529c = (1 - Math.min(1, _0x5e7930 * _0x22dc37)).toFixed(3);
                _0x546d32 += ",colorchannelmixer=rr=" + _0x21529c + ":gg=" + _0x21529c + ":bb=" + _0x21529c;
              } else if (_0x13cf50 === "frostedGlass") {
                let _0x53ddab = Math.min(1, Math.max(0, (_0x5aaa4b.frostGrain !== undefined ? _0x5aaa4b.frostGrain : 30) / 100));
                let _0xb32df8 = Math.max(1, Math.round(_0x53ddab * 40 * _0x22dc37));
                _0x546d32 += ",noise=alls=" + _0xb32df8 + ":allf=t+u";
              }
              if (_0x13cf50 === "gaussian") {
                if (_0x22dc37 < 1) {
                  _0x546d32 += ",format=yuva420p,colorchannelmixer=aa=" + _0x22dc37.toFixed(3);
                }
                _0x5856bb(_0x546d32, _0x439c1b, _0x2a7b9f, _0x225726, _0x3514d6, _0x12ae63, _0x494930);
              } else {
                _0x378080(_0x546d32, _0x5f465b, _0x21c6c5, _0x439c1b, _0x2a7b9f, _0x225726, _0x3514d6, _0x12ae63, _0x494930);
              }
            }
          };
          if (_0x2ad478) {
            let _0x40d09c = typeof _0x3cf954 == "function" ? _0x3cf954 : _0x198089 => _0x198089;
            let _0x2effa3 = Number.isFinite(_0x5aaa4b.padStart) ? Math.max(0, _0x5aaa4b.padStart) : 0.1;
            let _0x5d8e46 = Number.isFinite(_0x5aaa4b.padEnd) ? Math.max(0, _0x5aaa4b.padEnd) : 0.1;
            let _0x29aeb = Number.isFinite(_0x5aaa4b.realOffsetLeft) ? _0x5aaa4b.realOffsetLeft : Number.isFinite(_0x5aaa4b.offsetLeft) ? _0x5aaa4b.offsetLeft : 0;
            let _0x32e279 = Number.isFinite(_0x5aaa4b.realOffsetTop) ? _0x5aaa4b.realOffsetTop : Number.isFinite(_0x5aaa4b.offsetTop) ? _0x5aaa4b.offsetTop : 0;
            let _0xe1fe3 = Number.isFinite(_0x5aaa4b.realOffsetRight) ? _0x5aaa4b.realOffsetRight : Number.isFinite(_0x5aaa4b.offsetRight) ? _0x5aaa4b.offsetRight : 0;
            let _0x421efd = Number.isFinite(_0x5aaa4b.realOffsetBottom) ? _0x5aaa4b.realOffsetBottom : Number.isFinite(_0x5aaa4b.offsetBottom) ? _0x5aaa4b.offsetBottom : 0;
            let _0x44313a = [];
            for (let _0x285b4e of _0x462fab) {
              if (!(_0x285b4e.endTime > _0x285b4e.startTime) || _0x285b4e.realOcrVisible === false) {
                continue;
              }
              let _0x1ca901 = _0x285b4e.realOcrVisible === true || _0x285b4e.realOcrVisible === undefined && Number.isFinite(_0x285b4e.realOcrBoxX) && Number.isFinite(_0x285b4e.realOcrBoxWidth);
              if (_0x1ca901 && (!Number.isFinite(_0x285b4e.realOcrBoxX) || !Number.isFinite(_0x285b4e.realOcrBoxWidth))) {
                continue;
              }
              let _0x3b30aa = Number.isFinite(_0x285b4e.realBoxX) && Number.isFinite(_0x285b4e.realBoxWidth);
              let _0x3c4ef6 = _0x1ca901 ? _0x285b4e.realOcrBoxX : _0x3b30aa ? _0x285b4e.realBoxX : _0x33e126;
              let _0x2da51c = _0x1ca901 ? _0x285b4e.realOcrBoxY : _0x3b30aa ? _0x285b4e.realBoxY : _0x592a02;
              let _0x5b4580 = _0x1ca901 ? _0x285b4e.realOcrBoxWidth : _0x3b30aa ? _0x285b4e.realBoxWidth : _0x367387;
              let _0x5f070a = _0x1ca901 ? _0x285b4e.realOcrBoxHeight : _0x3b30aa ? _0x285b4e.realBoxHeight : _0x1347ad;
              _0x44313a.push({
                x0: _0x3c4ef6,
                y0: _0x2da51c,
                x1: _0x3c4ef6 + _0x5b4580,
                y1: _0x2da51c + _0x5f070a,
                w0: Math.max(0, _0x285b4e.startTime - _0x2effa3),
                w1: _0x285b4e.endTime + _0x5d8e46
              });
            }
            let _0x33fab8 = [...new Set(_0x44313a.flatMap(_0x34abb0 => [_0x34abb0.w0, _0x34abb0.w1]))].sort((_0x60f52f, _0x1c5409) => _0x60f52f - _0x1c5409);
            let _0x57103d = new Map();
            for (let _0x926d79 = 0; _0x926d79 + 1 < _0x33fab8.length; _0x926d79++) {
              let _0x4ff908 = _0x33fab8[_0x926d79];
              let _0xc7eff4 = _0x33fab8[_0x926d79 + 1];
              if (!(_0xc7eff4 > _0x4ff908)) {
                continue;
              }
              let _0xc4b6e4 = null;
              let _0xd8aeb4 = null;
              let _0x6039c6 = null;
              let _0x4fb523 = null;
              for (let _0x3f49b1 of _0x44313a) {
                if (!(_0x3f49b1.w0 >= _0xc7eff4) && !(_0x3f49b1.w1 <= _0x4ff908)) {
                  _0xc4b6e4 = _0xc4b6e4 === null ? _0x3f49b1.x0 : Math.min(_0xc4b6e4, _0x3f49b1.x0);
                  _0xd8aeb4 = _0xd8aeb4 === null ? _0x3f49b1.y0 : Math.min(_0xd8aeb4, _0x3f49b1.y0);
                  _0x6039c6 = _0x6039c6 === null ? _0x3f49b1.x1 : Math.max(_0x6039c6, _0x3f49b1.x1);
                  _0x4fb523 = _0x4fb523 === null ? _0x3f49b1.y1 : Math.max(_0x4fb523, _0x3f49b1.y1);
                }
              }
              if (_0xc4b6e4 === null) {
                continue;
              }
              let _0x2040d2 = Math.floor(Math.max(0, _0xc4b6e4 - _0x29aeb) / 2) * 2;
              let _0x2429a0 = Math.floor(Math.max(0, _0xd8aeb4 - _0x32e279) / 2) * 2;
              let _0x1910df = Math.max(2, Math.floor((_0x6039c6 - _0xc4b6e4 + _0x29aeb + _0xe1fe3) / 2) * 2);
              let _0x2e50b8 = Math.max(2, Math.floor((_0x4fb523 - _0xd8aeb4 + _0x32e279 + _0x421efd) / 2) * 2);
              if (_0x2040d2 + _0x1910df > _0x25823c) {
                _0x1910df = Math.max(2, Math.floor((_0x25823c - _0x2040d2) / 2) * 2);
              }
              if (_0x2429a0 + _0x2e50b8 > _0x14acd8) {
                _0x2e50b8 = Math.max(2, Math.floor((_0x14acd8 - _0x2429a0) / 2) * 2);
              }
              let _0x468192 = _0x2040d2 + "_" + _0x2429a0 + "_" + _0x1910df + "_" + _0x2e50b8;
              if (!_0x57103d.has(_0x468192)) {
                _0x57103d.set(_0x468192, {
                  x: _0x2040d2,
                  y: _0x2429a0,
                  w: _0x1910df,
                  h: _0x2e50b8,
                  wins: []
                });
              }
              _0x57103d.get(_0x468192).wins.push([Math.max(0, _0x40d09c(_0x4ff908)), _0x40d09c(_0xc7eff4)]);
            }
            let _0x173754 = [..._0x57103d.values()].filter(_0x7f60be => _0x7f60be.w >= 4 && _0x7f60be.h >= 4);
            let _0x19ee0b = 40;
            if (_0x173754.length > _0x19ee0b) {
              let _0x34f0ed = (_0x9b2c4f, _0xb8a2e3) => {
                let _0x360550 = Math.min(_0x9b2c4f.x, _0xb8a2e3.x);
                let _0x1639f6 = Math.min(_0x9b2c4f.y, _0xb8a2e3.y);
                return {
                  x: _0x360550,
                  y: _0x1639f6,
                  w: Math.max(_0x9b2c4f.x + _0x9b2c4f.w, _0xb8a2e3.x + _0xb8a2e3.w) - _0x360550,
                  h: Math.max(_0x9b2c4f.y + _0x9b2c4f.h, _0xb8a2e3.y + _0xb8a2e3.h) - _0x1639f6,
                  wins: _0x9b2c4f.wins.concat(_0xb8a2e3.wins)
                };
              };
              while (_0x173754.length > _0x19ee0b) {
                let _0x8cedce = 0;
                let _0x131ce3 = 1;
                let _0x221680 = Number.POSITIVE_INFINITY;
                for (let _0x22ee58 = 0; _0x22ee58 < _0x173754.length; _0x22ee58++) {
                  let _0x1f4a95 = _0x173754[_0x22ee58];
                  let _0x1db379 = _0x1f4a95.w * _0x1f4a95.h;
                  for (let _0x3a8154 = _0x22ee58 + 1; _0x3a8154 < _0x173754.length; _0x3a8154++) {
                    let _0x5b843d = _0x173754[_0x3a8154];
                    let _0x1a3f98 = Math.min(_0x1f4a95.x, _0x5b843d.x);
                    let _0x2eb0de = Math.min(_0x1f4a95.y, _0x5b843d.y);
                    let _0x404315 = Math.max(_0x1f4a95.x + _0x1f4a95.w, _0x5b843d.x + _0x5b843d.w) - _0x1a3f98;
                    let _0x3c5677 = Math.max(_0x1f4a95.y + _0x1f4a95.h, _0x5b843d.y + _0x5b843d.h) - _0x2eb0de;
                    let _0x2d081c = _0x404315 * _0x3c5677 - _0x1db379 - _0x5b843d.w * _0x5b843d.h;
                    if (_0x2d081c < _0x221680) {
                      _0x221680 = _0x2d081c;
                      _0x8cedce = _0x22ee58;
                      _0x131ce3 = _0x3a8154;
                    }
                  }
                }
                _0x173754[_0x8cedce] = _0x34f0ed(_0x173754[_0x8cedce], _0x173754[_0x131ce3]);
                _0x173754.splice(_0x131ce3, 1);
              }
            }
            if (_0x173754.length) {
              this._emitTimeSlicedSync(_0xdb8bd5, _0x511624, _0x253217, _0x173754, _0x3406bb, _0x20f06d);
            } else {
              _0xdb8bd5.push(_0x511624 + "null" + _0x253217);
            }
          } else {
            _0x20f06d(_0x33e126, _0x592a02, _0x367387, _0x1347ad, _0x172770, _0x511624, _0x253217, "");
          }
        } else if (_0x5aaa4b.type === "rect") {
          let _0x2259d4 = this.parseColorToFfmpeg(_0x5aaa4b.color || "#10b981", _0x5aaa4b.opacity !== undefined ? _0x5aaa4b.opacity : 1);
          let _0x5c60bc = Math.max(0, _0x5aaa4b.borderWidth !== undefined ? _0x5aaa4b.borderWidth : 2);
          let _0x1ae696 = this.parseColorToFfmpeg(_0x5aaa4b.borderColor || _0x5aaa4b.color || "#10b981", 1);
          let _0x4de7fa = "[v_rectfill" + _0x3406bb + "]";
          _0xdb8bd5.push(_0x511624 + "drawbox=x=" + _0x468ad4 + ":y=" + _0x485a68 + ":w=" + _0x51a45c + ":h=" + _0x4735cd + ":color=" + _0x2259d4 + ":t=fill:enable='" + _0x172770 + "'" + _0x4de7fa);
          if (_0x5c60bc > 0) {
            _0xdb8bd5.push(_0x4de7fa + "drawbox=x=" + _0x468ad4 + ":y=" + _0x485a68 + ":w=" + _0x51a45c + ":h=" + _0x4735cd + ":color=" + _0x1ae696 + ":t=" + _0x5c60bc + ":enable='" + _0x172770 + "'" + _0x253217);
          } else {
            _0xdb8bd5.push(_0x4de7fa + "null" + _0x253217);
          }
        } else if (_0x5aaa4b.type === "text") {
          let _0x8915db = _0x5aaa4b.opacity;
          let _0x47ee2c = _0x8915db == null ? 1 : Math.max(0, Math.min(1, Number(_0x8915db) <= 1 ? Number(_0x8915db) : Number(_0x8915db) / 100));
          let _0x42bd5f = this.parseColorToFfmpeg(_0x5aaa4b.fontColor || "#ffffff", _0x47ee2c);
          let _0x121a3c = Math.round(_0x5aaa4b.realFontSize || _0x5aaa4b.fontSize || 24);
          let _0x593d06 = String(_0x5aaa4b.fontFamily || "Arial").replace(/'/g, "");
          let _0x4565d7 = _0x5aaa4b.bgEnabled !== undefined ? !!_0x5aaa4b.bgEnabled : _0x5aaa4b.captionStyle ? _0x5aaa4b.captionStyle === "box" : true;
          let _0x3a6fbc = _0x5aaa4b.bgOpacity;
          let _0x52a080 = _0x3a6fbc === undefined ? 0.5 : _0x3a6fbc <= 1 ? _0x3a6fbc : _0x3a6fbc / 100;
          let _0x315c5e = _0x511624;
          if (_0x4565d7) {
            let _0x285926 = this.buildBoxColor(_0x5aaa4b.backgroundColor || "#000000", _0x52a080 * _0x47ee2c);
            let _0xde7be9 = "[v_txtbg" + _0x3406bb + "]";
            _0xdb8bd5.push(_0x511624 + "drawbox=x=" + _0x468ad4 + ":y=" + _0x485a68 + ":w=" + _0x51a45c + ":h=" + _0x4735cd + ":color=" + _0x285926 + ":t=fill:enable='" + _0x172770 + "'" + _0xde7be9);
            _0x315c5e = _0xde7be9;
          }
          let _0x52a4e9 = _0x5aaa4b.strokeEnabled !== undefined ? !!_0x5aaa4b.strokeEnabled : (_0x5aaa4b.captionStyle || "") === "outline";
          let _0x505876 = "";
          if (_0x52a4e9) {
            let _0x44d272 = Number.isFinite(_0x5aaa4b.strokeWidth) ? _0x5aaa4b.strokeWidth : 15;
            let _0x5876e5 = Math.max(1, Math.round(_0x121a3c * _0x44d272 / 100 / 2));
            let _0x404856 = this.parseColorToFfmpeg(_0x5aaa4b.strokeColor || "#000000", _0x47ee2c);
            _0x505876 = ":borderw=" + _0x5876e5 + ":bordercolor=" + _0x404856;
          }
          let _0x343a76 = this.escapeDrawtext(_0x5aaa4b.text || "");
          _0xdb8bd5.push(_0x315c5e + "drawtext=expansion=none:" + this._fontArg(_0x593d06) + ":text='" + _0x343a76 + "':x=" + _0x468ad4 + "+(" + _0x51a45c + "-text_w)/2:y=" + _0x485a68 + "+(" + _0x4735cd + "-text_h)/2:fontsize=" + _0x121a3c + ":fontcolor=" + _0x42bd5f + _0x505876 + ":enable='" + _0x172770 + "'" + _0x253217);
        } else if (_0x5aaa4b.type === "image" && _0x5aaa4b._mediaInputIdx !== undefined) {
          let _0x518b9d = "[v_med" + _0x3406bb + "]";
          _0xdb8bd5.push("[" + _0x5aaa4b._mediaInputIdx + ":v]scale=" + _0x51a45c + ":" + _0x4735cd + _0x518b9d);
          _0xdb8bd5.push("" + _0x511624 + _0x518b9d + "overlay=" + _0x468ad4 + ":" + _0x485a68 + ":enable='" + _0x172770 + "'" + _0x253217);
        } else if (_0x5aaa4b.type === "video" && _0x5aaa4b._mediaInputIdx !== undefined) {
          let _0x3ddd11 = "[v_med" + _0x3406bb + "]";
          _0xdb8bd5.push("[" + _0x5aaa4b._mediaInputIdx + ":v]scale=" + _0x51a45c + ":" + _0x4735cd + ",setpts=PTS-STARTPTS+" + _0x325cfc + "/TB" + _0x3ddd11);
          _0xdb8bd5.push("" + _0x511624 + _0x3ddd11 + "overlay=" + _0x468ad4 + ":" + _0x485a68 + ":eof_action=pass:enable='" + _0x172770 + "'" + _0x253217);
        } else if (_0x5aaa4b.type === "filter") {
          let _0x36d41e = _0x2bbab3(_0x5aaa4b.filterPreset, _0x5aaa4b.intensity, _0x172770, _0x239f4b, _0x4c5d48);
          _0xdb8bd5.push(_0x36d41e ? "" + _0x511624 + _0x36d41e + _0x253217 : _0x511624 + "null" + _0x253217);
        } else if (_0x5aaa4b.type === "audio") {
          _0xdb8bd5.push(_0x511624 + "null" + _0x253217);
        } else {
          _0xdb8bd5.push(_0x511624 + "null" + _0x253217);
        }
        _0x511624 = _0x253217;
      });
      _0x4ea354.forEach((_0x4aff22, _0xcff1f7) => {
        let _0x5ce59a = typeof _0x4aff22.subtitleRenderText == "string" && _0x4aff22.subtitleRenderText.length ? _0x4aff22.subtitleRenderText : _0x4aff22.translation !== undefined && _0x4aff22.translation !== null ? _0x4aff22.translation : _0x4aff22.text || "";
        let _0x473390 = _0x4aff22.wordsPerLine || 12;
        let _0x42c31e = _0x4aff22.linesPerSegment || 2;
        let _0x709ba5 = _0x5ce59a.replace(/\r?\n/g, " ").trim().split(/\s+/).filter(Boolean);
        let _0x3d478f = Array.isArray(_0x4aff22.realLines) && _0x4aff22.realLines.length ? [..._0x4aff22.realLines] : [];
        if (_0x3d478f.length === 0) {
          for (let _0xbeb199 = 0; _0xbeb199 < _0x709ba5.length; _0xbeb199 += _0x473390) {
            _0x3d478f.push(_0x709ba5.slice(_0xbeb199, _0xbeb199 + _0x473390).join(" "));
          }
          if (_0x3d478f.length > _0x42c31e) {
            _0x3d478f.length = _0x42c31e;
          }
        }
        if (_0x3d478f.length === 0) {
          return;
        }
        let _0x3914fc = Math.round(_0x4aff22.realFontSize || _0x4aff22.fontSize || 35);
        let _0x13ffb8 = String(_0x4aff22.fontFamily || "Arial").replace(/'/g, "");
        let _0x1af652 = this.parseColorToFfmpeg(_0x4aff22.fontColor || "#ffffff", 1);
        let _0xf600f3 = this.parseColorToFfmpeg(_0x4aff22.outlineColor || "#000000", 1);
        let _0x341298 = _0x4aff22.captionStyle || "box";
        let _0x295d51 = _0x4aff22.startTime.toFixed(3);
        let _0x4fea2e = _0x4aff22.endTime.toFixed(3);
        let _0x17dd54 = "between(t," + _0x295d51 + "," + _0x4fea2e + ")";
        let _0x28d394 = Math.round(_0x4aff22.realLineHeight || _0x3914fc * 1.25);
        let _0x47615a = Math.round(_0x4aff22.realPaddingY || 12);
        let _0xf8fd96 = _0x3d478f.length;
        let _0x2c3ff6 = Number.isFinite(_0x4aff22.realBoxX) ? Math.round(_0x4aff22.realBoxX) : null;
        let _0x33fb1a = Number.isFinite(_0x4aff22.realBoxY) ? Math.round(_0x4aff22.realBoxY) : null;
        let _0x489483 = Math.round(_0x4aff22.realBoxWidth || 0);
        let _0xf8795 = Math.round(_0x4aff22.realBoxHeight || 0);
        let _0x12c186 = _0x2c3ff6 !== null && _0x33fb1a !== null && _0x489483 > 0 && _0xf8795 > 0;
        if (_0x341298 === "box" && _0x12c186) {
          let _0x4c69b4 = this.buildBoxColor(_0x4aff22.backgroundColor || "#000000", 0.6);
          let _0x5056aa = "[v_subbox" + _0xcff1f7 + "]";
          _0xdb8bd5.push(_0x511624 + "drawbox=x=" + _0x2c3ff6 + ":y=" + _0x33fb1a + ":w=" + _0x489483 + ":h=" + _0xf8795 + ":color=" + _0x4c69b4 + ":t=fill:enable='" + _0x17dd54 + "'" + _0x5056aa);
          _0x511624 = _0x5056aa;
        }
        _0x3d478f.forEach((_0x49e8fc, _0x43c91b) => {
          let _0x402b05 = "[v_sub" + _0xcff1f7 + "_" + _0x43c91b + "]";
          let _0x434647 = this.escapeDrawtext(_0x49e8fc);
          let _0x40bd56;
          let _0x3e2212;
          if (_0x12c186) {
            _0x40bd56 = _0x2c3ff6 + "+(" + _0x489483 + "-text_w)/2";
            _0x3e2212 = "" + (_0x33fb1a + _0x47615a + _0x43c91b * _0x28d394);
          } else if (_0x4aff22.realX !== null && _0x4aff22.realX !== undefined) {
            _0x2c3ff6 = Math.round(_0x4aff22.realX);
            _0x33fb1a = Math.round(_0x4aff22.realY);
            _0x40bd56 = "" + _0x2c3ff6;
            _0x3e2212 = "" + (_0x33fb1a + _0x47615a + _0x43c91b * _0x28d394);
          } else {
            _0x40bd56 = "(w-text_w)/2";
            _0x3e2212 = "h-" + (80 + (_0xf8fd96 - _0x43c91b) * _0x28d394);
          }
          let _0x4d72e8 = "drawtext=expansion=none:" + this._fontArg(_0x13ffb8) + ":text='" + _0x434647 + "':x=" + _0x40bd56 + ":y=" + _0x3e2212 + ":fontsize=" + _0x3914fc + ":fontcolor=" + _0x1af652;
          if (_0x341298 === "box" && !_0x12c186) {
            let _0x192adf = this.buildBoxColor(_0x4aff22.backgroundColor || "#000000", 0.6);
            _0x4d72e8 += ":box=1:boxcolor=" + _0x192adf + ":boxborderw=" + _0x47615a;
          } else if (_0x341298 === "outline") {
            let _0x1a0e1e = Math.max(1, Math.round(_0x3914fc * 0.15 / 2));
            _0x4d72e8 += ":borderw=" + _0x1a0e1e + ":bordercolor=" + _0xf600f3;
          }
          _0x4d72e8 += ":enable='" + _0x17dd54 + "'";
          _0xdb8bd5.push("" + _0x511624 + _0x4d72e8 + _0x402b05);
          _0x511624 = _0x402b05;
        });
      });
      return _0x511624;
    }
    _mixInMediaAudio(_0x37ce65, _0x2c5748) {
      if (!_0x2c5748 || _0x2c5748.length === 0) {
        return false;
      }
      let _0x4ffcf8 = [];
      _0x2c5748.forEach((_0x187e93, _0x3e2cf4) => {
        let _0x1641b7 = Math.max(0, Math.round(_0x187e93.startTime * 1000));
        let _0xa9f9e3 = Math.max(0.05, _0x187e93.endTime - _0x187e93.startTime);
        let _0x5e1931 = _0x187e93.volume !== undefined ? _0x187e93.volume : 1;
        let _0x5070c5 = "[mau" + _0x3e2cf4 + "]";
        _0x37ce65.push("[" + _0x187e93._mediaInputIdx + ":a]atrim=duration=" + _0xa9f9e3.toFixed(3) + ",asetpts=PTS-STARTPTS,adelay=" + _0x1641b7 + "|" + _0x1641b7 + ",volume=" + _0x5e1931 + _0x5070c5);
        _0x4ffcf8.push(_0x5070c5);
      });
      let _0x230854 = -1;
      for (let _0x90b2db = _0x37ce65.length - 1; _0x90b2db >= 0; _0x90b2db--) {
        if (_0x37ce65[_0x90b2db].endsWith("[aout]")) {
          _0x230854 = _0x90b2db;
          break;
        }
      }
      if (_0x230854 >= 0) {
        _0x37ce65[_0x230854] = _0x37ce65[_0x230854].slice(0, -6) + "[amain]";
        _0x37ce65.push("[amain]" + _0x4ffcf8.join("") + "amix=inputs=" + (1 + _0x4ffcf8.length) + ":duration=longest:dropout_transition=0:normalize=0[aout]");
      } else if (_0x4ffcf8.length === 1) {
        _0x37ce65.push(_0x4ffcf8[0] + "anull[aout]");
      } else {
        _0x37ce65.push(_0x4ffcf8.join("") + "amix=inputs=" + _0x4ffcf8.length + ":duration=longest:dropout_transition=0:normalize=0[aout]");
      }
      return true;
    }
    _subtitlesFilter(_0x48e632) {
      let _0x3871a7 = _0x2e8999 => String(_0x2e8999).replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
      let _0x4f7a97 = this._fontsDir && _0x398dca.existsSync(this._fontsDir) ? ":fontsdir='" + _0x3871a7(this._fontsDir) + "'" : "";
      return "subtitles=filename='" + _0x3871a7(_0x48e632) + "'" + _0x4f7a97;
    }
    _buildLegacyGraph(_0x2e2722, _0xe3fe22, _0xa05571, _0x1f456f, _0x12250c, _0x569f31 = {}) {
      let _0x96aa72 = _0x569f31.videoSegments || [];
      let _0x433a37 = Number.isFinite(_0xa05571) && _0xa05571 > 0 ? _0xa05571 : 1;
      let _0xa57421 = [];
      _0xa57421.push("[vbase]setpts=" + (1 / _0x433a37).toFixed(6) + "*PTS[v_speed]");
      let _0x3136ef = _0x3769de => _0x433a37 === 1 ? _0x3769de : _0x3769de.map(_0x2d88ef => ({
        ..._0x2d88ef,
        startTime: _0x2d88ef.startTime / _0x433a37,
        endTime: _0x2d88ef.endTime / _0x433a37
      }));
      let _0x3387f1 = _0x569f31.subtitlesAssPath ? [] : _0x3136ef(_0x2e2722);
      let _0x406316 = _0x3136ef(_0xe3fe22);
      let _0x5a5039 = _0x569f31.syncSegments || _0x2e2722;
      let _0x158400 = _0x23d157 => _0x433a37 === 1 ? _0x23d157 : _0x23d157 / _0x433a37;
      let _0x1366a9 = this._renderVisualLayers(_0xa57421, "[v_speed]", _0x406316, _0x3387f1, _0x1f456f, _0x12250c, _0x5a5039, _0x158400);
      if (_0x569f31.subtitlesAssPath) {
        _0xa57421.push("" + _0x1366a9 + this._subtitlesFilter(_0x569f31.subtitlesAssPath) + "[vout]");
      } else {
        _0xa57421.push(_0x1366a9 + "null[vout]");
      }
      let _0x4dbe68 = (_0x569f31.audioSegments || _0x2e2722).filter(_0x3cf99b => _0x3cf99b && _0x3cf99b.audioPath);
      let _0xd3e3f4 = [];
      let _0x1f5b0d = _0x569f31.videoVolume !== undefined ? _0x569f31.videoVolume : 1;
      let _0xe1a4d3 = _0x569f31.ttsVolume !== undefined ? _0x569f31.ttsVolume : 1.5;
      let _0x57e730 = _0x569f31.hasAudio !== false;
      let _0xd58560 = _0x569f31.fitMode || "speed_up_tts";
      let _0x1b6133 = (_0x58064e, _0x338f38, _0x2d1434) => {
        let {
          delayMs: _0x94a4e9,
          tempo: _0x5ab2a8,
          trimDuration: _0x55d3e3
        } = _0x382503(_0x58064e, {
          speed: _0xa05571,
          fitMode: _0xd58560
        });
        let _0x494a31 = [];
        if (_0x5ab2a8 !== 1) {
          _0x494a31.push(this._buildAtempo(_0x5ab2a8));
        }
        if (_0x55d3e3 !== null) {
          _0x494a31.push("atrim=duration=" + _0x55d3e3.toFixed(3));
          _0x494a31.push(_0xca7892(_0x55d3e3));
        }
        _0x494a31.push("adelay=" + _0x94a4e9 + "|" + _0x94a4e9);
        _0x494a31.push("volume=" + _0xe1a4d3);
        _0xd3e3f4.push("[" + _0x338f38 + ":a]" + _0x494a31.join(",") + _0x2d1434);
      };
      if (_0x57e730) {
        if (_0x4dbe68.length === 0) {
          if (_0xa05571 !== 1) {
            _0xd3e3f4.push("[abase]" + this._buildAtempo(_0x433a37) + ",volume=" + _0x1f5b0d + "[aout]");
          } else if (_0x1f5b0d !== 1) {
            _0xd3e3f4.push("[abase]volume=" + _0x1f5b0d + "[aout]");
          } else {
            _0xd3e3f4.push("[abase]anull[aout]");
          }
        } else {
          let _0x4a519f;
          if (_0x433a37 !== 1) {
            _0xd3e3f4.push("[abase]" + this._buildAtempo(_0x433a37) + ",volume=" + _0x1f5b0d + "[orig_audio]");
            _0x4a519f = "[orig_audio]";
          } else if (_0x1f5b0d !== 1) {
            _0xd3e3f4.push("[abase]volume=" + _0x1f5b0d + "[orig_audio]");
            _0x4a519f = "[orig_audio]";
          } else {
            _0x4a519f = "[abase]";
          }
          let _0x2bbb9f = _0x4dbe68.map((_0x2f8436, _0x193cf3) => {
            let _0x21a462 = _0x193cf3 + 1;
            let _0x45d3d6 = "[tts" + _0x193cf3 + "]";
            _0x1b6133(_0x2f8436, _0x21a462, _0x45d3d6);
            return _0x45d3d6;
          });
          let _0x16094e = [_0x4a519f, ..._0x2bbb9f].join("");
          _0xd3e3f4.push(_0x16094e + "amix=inputs=" + (1 + _0x2bbb9f.length) + ":duration=longest:dropout_transition=0:normalize=0[aout]");
        }
      } else if (_0x4dbe68.length > 0) {
        let _0x36836e = _0x4dbe68.map((_0x29cb91, _0x1ce6af) => {
          let _0x42af83 = _0x1ce6af + 1;
          let _0x2ef227 = "[tts" + _0x1ce6af + "]";
          _0x1b6133(_0x29cb91, _0x42af83, _0x2ef227);
          return _0x2ef227;
        });
        if (_0x36836e.length === 1) {
          _0xd3e3f4.push(_0x36836e[0] + "anull[aout]");
        } else {
          let _0x500980 = _0x36836e.join("");
          _0xd3e3f4.push(_0x500980 + "amix=inputs=" + _0x36836e.length + ":duration=longest:dropout_transition=0:normalize=0[aout]");
        }
      }
      let _0x10d4ab = this._mixInMediaAudio(_0xd3e3f4, _0x406316.filter(_0x2f02db => _0x2f02db && _0x2f02db._mediaInputIdx !== undefined && (_0x2f02db.type === "audio" || _0x2f02db.type === "video" && _0x2f02db.mediaHasAudio === true)));
      this._limitAudioOutput(_0xd3e3f4);
      return {
        filterComplex: _0xa57421.join("; "),
        audioFilterComplex: _0xd3e3f4.join("; "),
        hasTtsAudio: _0x4dbe68.length > 0,
        ttsAudioPaths: _0x4dbe68.map(_0x2258df => _0x2258df.audioPath),
        needsAudioSpeedFilter: _0x57e730,
        producesAudioOut: _0x57e730 || _0x4dbe68.length > 0 || _0x10d4ab,
        hasMediaAudio: _0x10d4ab,
        newTotalDuration: null
      };
    }
    _buildPlannedGraph(_0x1dde28, _0x3505f3, _0x3966f6, _0x19ae89, _0x32534a, _0x1c0b02, _0x589e92 = {}) {
      let _0x5f2f38 = _0x1c0b02.pieces;
      let _0x58c85c = [];
      let _0x3626d5 = _0x589e92.hasAudio !== false;
      let _0x4df2ea = _0x5f2f38.length;
      let _0x4ab723 = _0x4d05db => _0x58c85c.push(_0x4d05db);
      _0x58c85c.push("[vbase]split=" + _0x4df2ea + _0x5f2f38.map((_0x16c6d3, _0x475203) => "[srcv" + _0x475203 + "]").join(""));
      if (_0x3626d5) {
        _0x4ab723("[abase]asplit=" + _0x4df2ea + _0x5f2f38.map((_0x198ed2, _0x211c94) => "[srca" + _0x211c94 + "]").join(""));
      }
      let _0x433de8 = [];
      let _0x4ceeb0 = [];
      _0x5f2f38.forEach((_0x4626c9, _0x2f3031) => {
        let _0x30a28b = _0x4626c9.origStart.toFixed(4);
        let _0x5999b3 = _0x4626c9.origEnd.toFixed(4);
        let _0x4929ba = (1 / _0x4626c9.videoSpeed).toFixed(6);
        let _0x535789 = "[pv" + _0x2f3031 + "]";
        let _0x6e8347 = "[pa" + _0x2f3031 + "]";
        _0x58c85c.push("[srcv" + _0x2f3031 + "]trim=start=" + _0x30a28b + ":end=" + _0x5999b3 + ",setpts=" + _0x4929ba + "*(PTS-STARTPTS)" + _0x535789);
        if (_0x3626d5) {
          _0x4ab723("[srca" + _0x2f3031 + "]atrim=start=" + _0x30a28b + ":end=" + _0x5999b3 + ",asetpts=PTS-STARTPTS," + this._buildAtempo(_0x4626c9.bedTempo) + _0x6e8347);
          _0x4ceeb0.push(_0x6e8347);
        }
        _0x433de8.push(_0x535789);
      });
      let _0x58808b = _0x5f2f38.length;
      _0x58c85c.push(_0x433de8.join("") + "concat=n=" + _0x58808b + ":v=1:a=0[vplanned]");
      if (_0x3626d5) {
        _0x4ab723(_0x4ceeb0.join("") + "concat=n=" + _0x58808b + ":v=0:a=1[abed]");
      }
      let _0x3bec30 = _0x3505f3.map(_0x595a52 => ({
        ..._0x595a52,
        startTime: _0x305a1f(_0x5f2f38, _0x595a52.startTime),
        endTime: _0x305a1f(_0x5f2f38, _0x595a52.endTime)
      }));
      let _0x43bcc6 = _0x5c39d2 => ({
        ..._0x5c39d2,
        startTime: _0x305a1f(_0x5f2f38, _0x5c39d2.startTime),
        endTime: _0x305a1f(_0x5f2f38, _0x5c39d2.endTime)
      });
      let _0x44d4dd = _0x589e92.subtitlesAssPath ? [] : _0x1dde28.map(_0x43bcc6);
      let _0x4fcdd0 = _0x589e92.syncSegments || _0x1dde28;
      let _0x166481 = _0x1e3f72 => _0x305a1f(_0x5f2f38, _0x1e3f72);
      let _0x3d8596 = this._renderVisualLayers(_0x58c85c, "[vplanned]", _0x3bec30, _0x44d4dd, _0x19ae89, _0x32534a, _0x4fcdd0, _0x166481);
      if (_0x589e92.subtitlesAssPath) {
        _0x58c85c.push("" + _0x3d8596 + this._subtitlesFilter(_0x589e92.subtitlesAssPath) + "[vout]");
      } else {
        _0x58c85c.push(_0x3d8596 + "null[vout]");
      }
      let _0x1bb36f = (_0x589e92.audioSegments || _0x1dde28).filter(_0x5d611a => _0x5d611a && _0x5d611a.audioPath);
      let _0x49c79a = [];
      let _0x660ac9 = new Map(_0x5f2f38.filter(_0x59ead6 => _0x59ead6.id != null).map(_0x493589 => [_0x493589.id, _0x493589]));
      let _0x3e22a0 = _0x589e92.videoVolume !== undefined ? _0x589e92.videoVolume : 1;
      let _0x1a3cbe = _0x589e92.ttsVolume !== undefined ? _0x589e92.ttsVolume : 1.5;
      let _0x54b180 = "[abed]";
      if (_0x3626d5 && _0x3e22a0 !== 1) {
        _0x49c79a.push("[abed]volume=" + _0x3e22a0 + "[abed_volumed]");
        _0x54b180 = "[abed_volumed]";
      }
      let _0x35460c = _0x1bb36f.map((_0x2112ab, _0x47f9bd) => {
        let _0x3c2051 = _0x47f9bd + 1;
        let {
          delayMs: _0x4021a5,
          tempo: _0x2c44f9,
          trimDuration: _0x229495
        } = _0x382503(_0x2112ab, {
          pieceById: _0x660ac9,
          pieces: _0x5f2f38,
          fitMode: _0x589e92.fitMode
        });
        let _0x4977a8 = "[tts" + _0x47f9bd + "]";
        let _0x5720a7 = _0x2c44f9 !== 1 ? this._buildAtempo(_0x2c44f9) + "," : "";
        let _0x33ae2d = _0x229495 !== null ? "atrim=duration=" + _0x229495.toFixed(3) + "," + _0xca7892(_0x229495) + "," : "";
        _0x49c79a.push("[" + _0x3c2051 + ":a]" + _0x5720a7 + _0x33ae2d + "adelay=" + _0x4021a5 + "|" + _0x4021a5 + ",volume=" + _0x1a3cbe + _0x4977a8);
        return _0x4977a8;
      });
      if (_0x35460c.length === 0) {
        if (_0x3626d5) {
          _0x49c79a.push(_0x54b180 + "anull[aout]");
        }
      } else if (_0x3626d5) {
        let _0x17005d = [_0x54b180, ..._0x35460c].join("");
        _0x49c79a.push(_0x17005d + "amix=inputs=" + (1 + _0x35460c.length) + ":duration=longest:dropout_transition=0:normalize=0[aout]");
      } else if (_0x35460c.length === 1) {
        _0x49c79a.push(_0x35460c[0] + "anull[aout]");
      } else {
        let _0x4f8612 = _0x35460c.join("");
        _0x49c79a.push(_0x4f8612 + "amix=inputs=" + _0x35460c.length + ":duration=longest:dropout_transition=0:normalize=0[aout]");
      }
      let _0x2535f2 = this._mixInMediaAudio(_0x49c79a, _0x3bec30.filter(_0x2d5fc9 => _0x2d5fc9 && _0x2d5fc9._mediaInputIdx !== undefined && (_0x2d5fc9.type === "audio" || _0x2d5fc9.type === "video" && _0x2d5fc9.mediaHasAudio === true)));
      this._limitAudioOutput(_0x49c79a);
      return {
        filterComplex: _0x58c85c.join("; "),
        audioFilterComplex: _0x49c79a.join("; "),
        hasTtsAudio: _0x1bb36f.length > 0,
        ttsAudioPaths: _0x1bb36f.map(_0x3fbfdb => _0x3fbfdb.audioPath),
        needsAudioSpeedFilter: false,
        producesAudioOut: _0x3626d5 || _0x35460c.length > 0 || _0x2535f2,
        hasMediaAudio: _0x2535f2,
        newTotalDuration: _0x1c0b02.newTotalDuration
      };
    }
    _buildAtempo(_0xdac368) {
      return _0x37d95f(_0xdac368);
    }
  };
  _0x2daed5.exports = {
    FfmpegExporter: _0x529bd2,
    TTS_TEMPO_MAX_HARD: _0x2fb5c7,
    buildAtempoChain: _0x37d95f,
    buildAlimiterFilter: _0x1b73fd,
    buildTrimFadeOut: _0xca7892,
    buildSyncSlices: _0x2c187d,
    computeTtsClipPlacement: _0x382503,
    ExportPolicyError: _0x45bb3a,
    WATERMARK_PROFILE_V1: _0x4cb40f,
    buildWatermarkSchedule: _0x19b7c2
  };
});
var sa = Z((_0x22d747, _0x37301b) => {
  var _0x252e79 = ["bcut", "capcut", "groq"];
  function _0x580af8(_0x1914c6) {
    let _0x3e7e3a = String(_0x1914c6 || "auto").toLowerCase();
    if (_0x3e7e3a === "auto" || _0x3e7e3a === "") {
      return true;
    } else {
      return _0x3e7e3a === "zh" || _0x3e7e3a.startsWith("zh-") || _0x3e7e3a === "en" || _0x3e7e3a.startsWith("en-");
    }
  }
  function _0x3c01f5(_0xb08342, _0x58143e, {
    groqApiKey: _0x1a3e12
  } = {}) {
    let _0x415f6e;
    let _0x5613d0 = null;
    let _0x4141a3 = null;
    if (_0x252e79.includes(_0xb08342)) {
      _0x415f6e = [_0xb08342];
    } else if (_0xb08342 !== "auto") {
      _0x415f6e = [];
    } else if (_0x580af8(_0x58143e)) {
      _0x415f6e = ["bcut", "capcut", "groq"];
      let _0xd9ab83 = String(_0x58143e || "auto").toLowerCase();
      if (_0xd9ab83 === "auto" || _0xd9ab83 === "") {
        _0x4141a3 = "Ngôn ngữ gốc để Tự động: thử BCut/CapCut trước (chỉ nhận tiếng Trung + tiếng Anh). Nếu video là tiếng Nhật/Hàn/Việt/Thái, hãy chọn đúng Ngôn ngữ gốc để dùng Groq Whisper.";
      }
    } else {
      _0x415f6e = ["groq"];
      _0x5613d0 = "Bỏ qua BCut/CapCut: ngôn ngữ gốc là \"" + _0x58143e + "\" (hai engine này chỉ nhận tiếng Trung + tiếng Anh)";
    }
    let _0x20757c = _0x415f6e.length === 1 && _0x415f6e[0] === "groq";
    return {
      engines: _0x415f6e,
      skipNote: _0x5613d0,
      autoHint: _0x4141a3,
      missingGroqKey: _0x20757c && !_0x1a3e12
    };
  }
  _0x37301b.exports = {
    chooseAsrEngines: _0x3c01f5
  };
});
var da = Z((_0x4b5c6b, _0x4373e1) => {
  var {
    execFile: _0x5cccd8
  } = require("node:child_process");
  function _0x496aff(_0x22ace1, _0x41fafe, _0x2d8664) {
    if (_0x2d8664 && _0x2d8664.length > 0) {
      let _0x317d82 = "";
      let _0x32dd67 = [];
      _0x2d8664.forEach((_0x45119c, _0x8b0dd1) => {
        let _0x33c5d1 = _0x45119c.endTime - _0x45119c.startTime;
        let _0x505d27 = _0x45119c.trimStart || 0;
        let _0x3766d9 = _0x505d27 + _0x33c5d1;
        _0x317d82 += "[0:a]atrim=start=" + _0x505d27 + ":end=" + _0x3766d9 + ",asetpts=PTS-STARTPTS[a" + _0x8b0dd1 + "]; ";
        _0x32dd67.push("[a" + _0x8b0dd1 + "]");
      });
      _0x317d82 += _0x32dd67.join("") + "concat=n=" + _0x2d8664.length + ":v=0:a=1[aout]; ";
      _0x317d82 += "[aout]highpass=f=80,lowpass=f=8000,afftdn=nf=-25[denoised]";
      return ["-y", "-i", _0x22ace1, "-filter_complex", _0x317d82, "-map", "[denoised]", "-vn", "-ar", "16000", "-ac", "1", "-b:a", "64k", _0x41fafe];
    }
    return ["-y", "-i", _0x22ace1, "-vn", "-af", "highpass=f=80,lowpass=f=8000,afftdn=nf=-25", "-ar", "16000", "-ac", "1", "-b:a", "64k", _0x41fafe];
  }
  function _0xa8d31c(_0x21e7ae, _0x5e4832, _0x1d86e5) {
    let _0x5db612 = _0x496aff(_0x21e7ae, _0x5e4832, _0x1d86e5);
    let _0x3aedde = _0x5db612.indexOf("-af");
    if (_0x3aedde !== -1) {
      _0x5db612.splice(_0x3aedde, 2);
      return _0x5db612;
    }
    let _0x40a5c9 = _0x5db612.indexOf("-filter_complex");
    if (_0x40a5c9 !== -1) {
      _0x5db612[_0x40a5c9 + 1] = _0x5db612[_0x40a5c9 + 1].replace("[aout]highpass=f=80,lowpass=f=8000,afftdn=nf=-25[denoised]", "[aout]anull[denoised]");
    }
    return _0x5db612;
  }
  function _0xd9690d(_0x197791, _0x1d2e01) {
    return new Promise((_0x1b07ae, _0x4c1afd) => {
      _0x5cccd8(_0x197791, _0x1d2e01, {
        windowsHide: true,
        maxBuffer: 8388608
      }, (_0xed0609, _0x45f31b, _0x127239) => {
        if (_0xed0609) {
          _0x4c1afd(new Error(String(_0x127239 || _0xed0609.message || "").slice(-500)));
        } else {
          _0x1b07ae();
        }
      });
    });
  }
  async function _0x20c67b(_0x88487c, _0x132bdc, _0x1365cc, _0xd25f51) {
    try {
      await _0xd9690d(_0x88487c, _0x496aff(_0x132bdc, _0x1365cc, _0xd25f51));
      return _0x1365cc;
    } catch (_0x4db9eb) {
      try {
        await _0xd9690d(_0x88487c, _0xa8d31c(_0x132bdc, _0x1365cc, _0xd25f51));
        return _0x1365cc;
      } catch (_0x4cfa7a) {
        let _0x5b797b = new Error("Không tách được audio để nhận dạng. Lọc ồn lỗi: " + _0x4db9eb.message + "; tách audio thô cũng lỗi: " + _0x4cfa7a.message);
        _0x5b797b.denoiseError = _0x4db9eb;
        _0x5b797b.rawError = _0x4cfa7a;
        throw _0x5b797b;
      }
    }
  }
  _0x4373e1.exports = {
    buildDenoiseArgs: _0x496aff,
    buildRawExtractArgs: _0xa8d31c,
    denoiseAudio: _0x20c67b
  };
});
var ga = Z((_0xd99a61, _0x4a64b6) => {
  var _0x4f22cb = require("axios");
  var _0x5aa6f0 = require("node:fs");
  var _0x2564ef = require("node:path");
  var _0x419e0f = "https://member.bilibili.com/x/bcut/rubick-interface";
  var _0x166627 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";
  var _0x546c75 = 120000;
  var _0x5c8775 = 0;
  var _0x2909ac = "";
  var _0x2966e6 = 0;
  var _0x113e1e = 2;
  function _0x1cdd34() {
    let _0x109881 = Math.ceil((_0x5c8775 - Date.now()) / 1000);
    return [_0x109881 > 0, Math.max(0, _0x109881)];
  }
  var _0x4928ba = class {
    constructor(_0x4585c3) {
      this.filePath = _0x4585c3;
    }
    safeName(_0x21d556) {
      if (!_0x21d556) {
        return "audio.wav";
      }
      let _0x4710de = _0x2564ef.extname(_0x21d556) || ".wav";
      let _0x4cac19 = _0x2564ef.basename(_0x21d556, _0x4710de).replace(/[^a-zA-Z0-9._-]/g, "_");
      let _0x2e56b5 = Math.max(1, 50 - _0x4710de.length);
      return _0x4cac19.slice(0, _0x2e56b5) + _0x4710de;
    }
    async createResource(_0x430c61) {
      let _0x4dea3b = _0x5aa6f0.statSync(_0x430c61).size;
      let _0x4cdf5f = this.safeName(_0x430c61);
      let _0xee6a5d = _0x2564ef.extname(_0x430c61).slice(1).toLowerCase();
      let _0x1a223c = ["flac", "aac", "m4a", "mp3", "wav"].includes(_0xee6a5d) ? _0xee6a5d : "wav";
      let _0x14fbe9 = new URLSearchParams({
        type: "2",
        name: _0x4cdf5f,
        size: String(_0x4dea3b),
        resource_file_type: _0x1a223c,
        model_id: "7"
      }).toString();
      let _0x1ee9de = await _0x4f22cb.post(_0x419e0f + "/resource/create", _0x14fbe9, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": _0x166627
        },
        timeout: 30000
      });
      if (_0x1ee9de.data.code !== 0) {
        throw new Error("BCut createResource failed: " + (_0x1ee9de.data.message || JSON.stringify(_0x1ee9de.data)));
      }
      return _0x1ee9de.data.data;
    }
    async uploadChunks(_0x158ad6, _0x92eed, _0x336a3f) {
      let _0x2f0433 = _0x5aa6f0.readFileSync(_0x158ad6);
      let _0x2d6be5 = [];
      let _0x4e6337 = _0x92eed.length;
      for (let _0xdd5d0a = 0; _0xdd5d0a < _0x4e6337; _0xdd5d0a++) {
        let _0x464663 = _0xdd5d0a * _0x336a3f;
        let _0x19e457 = Math.min((_0xdd5d0a + 1) * _0x336a3f, _0x2f0433.length);
        let _0x4dc786 = _0x2f0433.subarray(_0x464663, _0x19e457);
        let _0x3b334d = await _0x4f22cb.put(_0x92eed[_0xdd5d0a], _0x4dc786, {
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Length": _0x4dc786.length,
            "User-Agent": _0x166627
          },
          timeout: 120000
        });
        let _0x401c30 = _0x3b334d.headers.etag || _0x3b334d.headers.ETag || _0x3b334d.headers.etag || "";
        _0x2d6be5.push(_0x401c30);
      }
      return _0x2d6be5;
    }
    async completeUpload({
      resourceId: _0x4b69d5,
      inBossKey: _0x56acec,
      uploadId: _0x5b87ea,
      etags: _0x3f0338
    }) {
      let _0x5b596f = new URLSearchParams({
        in_boss_key: _0x56acec,
        resource_id: _0x4b69d5,
        etags: _0x3f0338.join(","),
        upload_id: _0x5b87ea,
        model_id: "7"
      }).toString();
      let _0x377642 = await _0x4f22cb.post(_0x419e0f + "/resource/create/complete", _0x5b596f, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": _0x166627
        },
        timeout: 30000
      });
      if (_0x377642.data.code !== 0) {
        throw new Error("BCut complete failed: " + (_0x377642.data.message || JSON.stringify(_0x377642.data)));
      }
      return _0x377642.data.data.download_url;
    }
    async submitTask(_0xf55694) {
      let _0x186348 = await _0x4f22cb.post(_0x419e0f + "/task", {
        resource: _0xf55694,
        model_id: "7"
      }, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": _0x166627
        },
        timeout: 30000
      });
      if (_0x186348.data.code !== 0) {
        throw new Error("BCut submit failed: " + (_0x186348.data.message || JSON.stringify(_0x186348.data)));
      }
      return _0x186348.data.data.task_id;
    }
    async query(_0x541f5a) {
      let _0x1bd7ef = await _0x4f22cb.get(_0x419e0f + "/task/result", {
        params: {
          model_id: 7,
          task_id: _0x541f5a
        },
        headers: {
          "User-Agent": _0x166627
        },
        timeout: 30000
      });
      if (_0x1bd7ef.data.code !== 0) {
        throw new Error("BCut query failed: " + (_0x1bd7ef.data.message || JSON.stringify(_0x1bd7ef.data)));
      }
      return _0x1bd7ef.data;
    }
    parseResult(_0x2842f0) {
      let _0x4d7bcb = _0x2842f0;
      if (typeof _0x4d7bcb == "string") {
        try {
          _0x4d7bcb = JSON.parse(_0x4d7bcb);
        } catch {
          return [];
        }
      }
      let _0x3d7059 = _0x4d7bcb.data || _0x4d7bcb;
      let _0x163de9 = {};
      if (_0x3d7059.result) {
        let _0x2dbc05 = _0x3d7059.result;
        if (typeof _0x2dbc05 == "string") {
          try {
            _0x163de9 = JSON.parse(_0x2dbc05);
          } catch {
            return [];
          }
        } else if (typeof _0x2dbc05 == "object" && _0x2dbc05 !== null) {
          _0x163de9 = _0x2dbc05;
        }
      } else if (_0x3d7059.utterances) {
        _0x163de9 = _0x3d7059;
      } else {
        return [];
      }
      return (_0x163de9.utterances || []).filter(_0x22fe4a => {
        let _0x453535 = (_0x22fe4a.transcript || _0x22fe4a.text || "").trim();
        let _0x3395eb = _0x22fe4a.start_time !== undefined ? _0x22fe4a.start_time : _0x22fe4a.start;
        let _0x310050 = _0x22fe4a.end_time !== undefined ? _0x22fe4a.end_time : _0x22fe4a.end;
        return _0x453535 && _0x3395eb !== undefined && _0x310050 !== undefined && Number(_0x310050) > Number(_0x3395eb);
      }).map(_0x3c80ae => {
        let _0x7f84e4 = (_0x3c80ae.transcript || _0x3c80ae.text || "").trim();
        let _0x584228 = _0x3c80ae.start_time !== undefined ? _0x3c80ae.start_time : _0x3c80ae.start;
        let _0x20ab5f = _0x3c80ae.end_time !== undefined ? _0x3c80ae.end_time : _0x3c80ae.end;
        return {
          startTime: Number(_0x584228) / 1000,
          endTime: Number(_0x20ab5f) / 1000,
          text: _0x7f84e4
        };
      });
    }
    async pollResult(_0xdc16de, _0x1b37da = 180000, _0x1b27fb) {
      let _0x4905da = Date.now();
      let _0x40885e = 0;
      let _0x4ddb07 = [4, "4", "COMPLETE"];
      let _0xf13c30 = [3, "3", "ERROR"];
      while (Date.now() - _0x4905da < _0x1b37da) {
        let _0x53b0de = await this.query(_0xdc16de);
        let _0x158e2b = _0x53b0de.data || _0x53b0de;
        let _0x3c00c0 = _0x158e2b.state;
        if (_0x4ddb07.includes(_0x3c00c0)) {
          let _0x378892 = this.parseResult(_0x53b0de);
          if (_0x378892 && _0x378892.length > 0) {
            if (_0x1b27fb) {
              _0x1b27fb("[Hàng Ỉm] Hoàn thành — " + _0x378892.length + " đoạn.");
            }
            return _0x378892;
          } else {
            if (_0x1b27fb) {
              _0x1b27fb("[Hàng Ỉm] Không nhận dạng được giọng nói.");
            }
            return [];
          }
        }
        if (_0xf13c30.includes(_0x3c00c0)) {
          let _0x4ba68d = _0x158e2b.remark || _0x158e2b.message || String(_0x3c00c0);
          throw new Error("Hàng Ỉm ASR job failed: " + _0x4ba68d);
        }
        let _0x4c90f8 = Date.now();
        if (_0x1b27fb && _0x4c90f8 - _0x40885e > 8000) {
          let _0x397d02 = _0x158e2b.remark || "";
          _0x1b27fb("[Hàng Ỉm] Đang xử lý... (state=" + _0x3c00c0 + (_0x397d02 ? ", remark=" + _0x397d02 : "") + ")");
          _0x40885e = _0x4c90f8;
        }
        let _0x4bc606 = (0.7 + Math.random() * 0.6) * 1500;
        await new Promise(_0x5eb975 => setTimeout(_0x5eb975, _0x4bc606));
      }
      throw new Error("Hàng Ỉm ASR timeout — không nhận được kết quả.");
    }
    async transcribe(_0x10c1db, _0x1a1a97 = {}) {
      let _0x2f7f81 = _0x10c1db || this.filePath;
      let _0x453c75 = _0x1a1a97.onStatus;
      let [_0x1a7eb3, _0x207cbc] = _0x1cdd34();
      if (_0x1a7eb3) {
        throw new Error("Hàng Ỉm đang tạm nghỉ " + _0x207cbc + "s: " + _0x2909ac);
      }
      try {
        if (_0x453c75) {
          _0x453c75("[Hàng Ỉm] Đang đăng ký upload...");
        }
        let _0x22a45c = await this.createResource(_0x2f7f81);
        let {
          resource_id: _0xd3197a,
          in_boss_key: _0xa0b3df,
          upload_id: _0x3b2eeb,
          upload_urls: _0x405150,
          per_size: _0x46095b
        } = _0x22a45c;
        if (!_0x405150 || _0x405150.length === 0) {
          throw new Error("BCut resource create returned no upload URLs");
        }
        let _0x4478cd = _0x5aa6f0.statSync(_0x2f7f81).size / 1048576;
        if (_0x453c75) {
          _0x453c75("[Hàng Ỉm] Đang upload audio (" + _0x4478cd.toFixed(1) + " MB, " + _0x405150.length + " phần)...");
        }
        let _0x4c635e = await this.uploadChunks(_0x2f7f81, _0x405150, _0x46095b || 5242880);
        if (_0x453c75) {
          _0x453c75("[Hàng Ỉm] Đang xác nhận upload...");
        }
        let _0x2985fa = await this.completeUpload({
          resourceId: _0xd3197a,
          inBossKey: _0xa0b3df,
          uploadId: _0x3b2eeb,
          etags: _0x4c635e
        });
        if (_0x453c75) {
          _0x453c75("[Hàng Ỉm] Đang gửi yêu cầu nhận dạng giọng nói...");
        }
        let _0x35cbb4 = await this.submitTask(_0x2985fa);
        if (_0x453c75) {
          _0x453c75("[Hàng Ỉm] Đang chờ kết quả...");
        }
        let _0x1fbd8b = await this.pollResult(_0x35cbb4, _0x1a1a97.maxWaitMs || 180000, _0x453c75);
        _0x2966e6 = 0;
        return _0x1fbd8b;
      } catch (_0x58f627) {
        _0x2966e6++;
        if (_0x2966e6 >= _0x113e1e) {
          _0x5c8775 = Date.now() + _0x546c75;
          _0x2909ac = "timeout " + _0x2966e6 + " lần liên tiếp";
        } else {
          _0x5c8775 = Date.now() + _0x546c75;
          _0x2909ac = _0x58f627.message || "unknown error";
        }
        throw _0x58f627;
      }
    }
  };
  _0x4a64b6.exports = {
    BCutASR: _0x4928ba,
    bcutOnCooldown: _0x1cdd34
  };
});
var On = Z((_0x2d18f4, _0xcb9b74) => {
  var _0x3f3521 = require("node:crypto");
  var _0x4e8f85 = require("axios");
  var _0x53a72a = require("node:fs");
  var _0x4f3d02 = require("node:path");
  var {
    execFile: _0xb83220
  } = require("node:child_process");
  var _0x44fc3f = "https://lv-pc-api-sinfonlinec.ulikecam.com";
  var _0x2283e5 = "Cronet/TTNetVersion:01594da2 2023-03-14 QuicVersion:46688bb4 2022-11-28";
  var _0x3b3b56 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 Thea/1.0.1";
  var _0x3da0fa = "6.0.0";
  var _0x281cb5 = "4";
  var _0x464e9c = "9e2c";
  var _0x31815d = "11ac";
  var _0x57ba41 = "cn";
  var _0x29c9c = "vod";
  var _0x6fdf30 = "lv-mac-recognition";
  var _0xce8db7 = 120000;
  var _0x55dd88 = 0;
  var _0x475722 = 0;
  function _0xd9ea3f(_0x269bef) {
    let _0x314dc = 4294967295;
    for (let _0x597660 of _0x269bef) {
      _0x314dc ^= _0x597660;
      for (let _0x394ad5 = 0; _0x394ad5 < 8; _0x394ad5++) {
        _0x314dc = _0x314dc & 1 ? _0x314dc >>> 1 ^ -306674912 : _0x314dc >>> 1;
      }
    }
    return ((_0x314dc ^ -1) >>> 0).toString(16).padStart(8, "0");
  }
  function _0x5e367b(_0x3cd0d0, _0x2283c6) {
    let _0x4046ed = Math.floor(Date.now() / 1000).toString();
    let _0x518010 = _0x2283c6.length >= 7 ? _0x2283c6.slice(-7) : _0x2283c6;
    let _0x1f7707 = _0x464e9c + "|" + _0x518010 + "|" + _0x281cb5 + "|" + _0x3da0fa + "|" + _0x4046ed + "|" + _0x3cd0d0 + "|" + _0x31815d;
    return {
      sign: _0x3f3521.createHash("md5").update(_0x1f7707, "utf8").digest("hex").toLowerCase(),
      deviceTime: _0x4046ed
    };
  }
  function _0x4a2635(_0x26379a, _0x53264b) {
    let {
      sign: _0x5dfaaa,
      deviceTime: _0x428402
    } = _0x5e367b(_0x26379a, _0x53264b);
    return {
      "User-Agent": _0x2283e5,
      appvr: _0x3da0fa,
      pf: _0x281cb5,
      sign: _0x5dfaaa,
      "sign-ver": "1",
      tdid: _0x26379a,
      "device-time": _0x428402,
      "Content-Type": "application/json"
    };
  }
  function _0x211c72(_0x1e9aba, _0x19c7da, _0x2b7d07) {
    let _0x5cee28 = _0x2b7d07["x-amz-date"];
    let _0x3903b2 = _0x5cee28.split("T")[0];
    let _0x2a6ad6 = "/";
    let _0x47ff21 = _0x19c7da;
    let _0x4e53e3 = Object.entries(_0x2b7d07).map(([_0x272d30, _0x3cd660]) => _0x272d30 + ":" + _0x3cd660 + "\n").join("");
    let _0x3ed033 = Object.keys(_0x2b7d07).join(";");
    let _0x5e2ab2 = _0x3f3521.createHash("sha256").update("").digest("hex");
    let _0x28e5c3 = ["GET", _0x2a6ad6, _0x47ff21, _0x4e53e3, _0x3ed033, _0x5e2ab2].join("\n");
    let _0x600dfb = "AWS4-HMAC-SHA256";
    let _0x36825f = _0x3903b2 + "/" + _0x57ba41 + "/" + _0x29c9c + "/aws4_request";
    let _0xb85d16 = [_0x600dfb, _0x5cee28, _0x36825f, _0x3f3521.createHash("sha256").update(_0x28e5c3).digest("hex")].join("\n");
    function _0x5cdd54(_0x3b4262, _0x5c203d) {
      return _0x3f3521.createHmac("sha256", _0x3b4262).update(_0x5c203d).digest();
    }
    let _0x4500b0 = _0x5cdd54("AWS4" + _0x1e9aba, _0x3903b2);
    let _0x52348a = _0x5cdd54(_0x4500b0, _0x57ba41);
    let _0x2b01ed = _0x5cdd54(_0x52348a, _0x29c9c);
    let _0x4df670 = _0x5cdd54(_0x2b01ed, "aws4_request");
    return _0x3f3521.createHmac("sha256", _0x4df670).update(_0xb85d16).digest("hex");
  }
  var _0x43b1db = class {
    constructor(_0x2d943d) {
      this.tdid = _0x2d943d || _0x3f3521.randomUUID().replace(/-/g, "").slice(0, 16);
      this._lastUsed = 0;
    }
    isCooledDown() {
      return Date.now() - this._lastUsed >= _0xce8db7;
    }
    markUsed() {
      this._lastUsed = Date.now();
    }
    generateSign(_0x46cb28) {
      return _0x5e367b(this.tdid, _0x46cb28);
    }
    _headers(_0x353493) {
      return _0x4a2635(this.tdid, _0x353493);
    }
    async _uploadSign() {
      let _0x906acc = "/lv/v1/upload_sign";
      let _0x5b4f9f = (await _0x4e8f85.post("" + _0x44fc3f + _0x906acc, {
        biz: "pc-recognition"
      }, {
        headers: this._headers(_0x906acc),
        timeout: 30000
      })).data.data;
      return {
        accessKey: _0x5b4f9f.access_key_id,
        secretKey: _0x5b4f9f.secret_access_key,
        sessionToken: _0x5b4f9f.session_token
      };
    }
    async _applyUpload({
      accessKey: _0x4ea29c,
      secretKey: _0xcd234f,
      sessionToken: _0x3943bb
    }, _0x1e3e68) {
      let _0x1ec509 = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
      let _0xf6eec7 = ["Action=ApplyUploadInner", "FileSize=" + _0x1e3e68, "FileType=object", "IsInner=1", "SpaceName=" + _0x6fdf30, "Version=2020-11-19", "s=5y0udbjapi"].join("&");
      let _0x4c2c45 = {
        "x-amz-date": _0x1ec509,
        "x-amz-security-token": _0x3943bb
      };
      let _0x1e0bb1 = _0x211c72(_0xcd234f, _0xf6eec7, _0x4c2c45);
      let _0x2099d6 = _0x1ec509.slice(0, 8);
      _0x4c2c45.authorization = ["AWS4-HMAC-SHA256 Credential=" + _0x4ea29c + "/" + _0x2099d6 + "/" + _0x57ba41 + "/" + _0x29c9c + "/aws4_request,", "SignedHeaders=x-amz-date;x-amz-security-token,", "Signature=" + _0x1e0bb1].join(" ");
      let _0x59eacb = (await _0x4e8f85.get("https://vod.bytedanceapi.com/?" + _0xf6eec7, {
        headers: _0x4c2c45,
        timeout: 30000
      })).data.Result.UploadAddress;
      let _0x183ea5 = _0x59eacb.StoreInfos[0];
      return {
        storeUri: _0x183ea5.StoreUri,
        auth: _0x183ea5.Auth,
        uploadId: _0x183ea5.UploadID,
        uploadHost: _0x59eacb.UploadHosts[0]
      };
    }
    async _uploadFile({
      uploadHost: _0x159152,
      storeUri: _0x4487e8,
      uploadId: _0x441a1d,
      auth: _0x13f537
    }, _0x11d7a2, _0x284db6) {
      let _0x1cb5cc = "https://" + _0x159152 + "/" + _0x4487e8 + "?partNumber=1&uploadID=" + _0x441a1d;
      let _0x3b3901 = await _0x4e8f85.put(_0x1cb5cc, _0x11d7a2, {
        headers: {
          "User-Agent": _0x3b3b56,
          Authorization: _0x13f537,
          "Content-CRC32": _0x284db6
        },
        timeout: 120000,
        maxBodyLength: Number.POSITIVE_INFINITY
      });
      if (_0x3b3901.data.success !== 0) {
        throw new Error("CapCut upload failed: " + JSON.stringify(_0x3b3901.data));
      }
    }
    async _uploadCheck({
      uploadHost: _0x49ada7,
      storeUri: _0x1a318b,
      uploadId: _0x365ea2,
      auth: _0x4f4a33
    }, _0x26e85f) {
      let _0x58f261 = "https://" + _0x49ada7 + "/" + _0x1a318b + "?uploadID=" + _0x365ea2;
      let _0x1c0d41 = "1:" + _0x26e85f;
      await _0x4e8f85.post(_0x58f261, _0x1c0d41, {
        headers: {
          "User-Agent": _0x3b3b56,
          Authorization: _0x4f4a33,
          "Content-CRC32": _0x26e85f
        },
        timeout: 30000
      });
    }
    async _uploadCommit({
      uploadHost: _0x3be13d,
      storeUri: _0x260be9,
      uploadId: _0x13fbd5,
      auth: _0x610ec8,
      sessionToken: _0x50b9ba
    }, _0x3c143e, _0x5c9b95) {
      let _0x320712 = "https://" + _0x3be13d + "/" + _0x260be9 + "?uploadID=" + _0x13fbd5 + "&partNumber=1&x-amz-security-token=" + encodeURIComponent(_0x50b9ba);
      try {
        await _0x4e8f85.put(_0x320712, _0x3c143e, {
          headers: {
            "User-Agent": _0x3b3b56,
            Authorization: _0x610ec8,
            "Content-CRC32": _0x5c9b95
          },
          timeout: 120000,
          maxBodyLength: Number.POSITIVE_INFINITY
        });
      } catch {}
    }
    async _submit(_0x307cf6) {
      let _0x297490 = "/lv/v1/audio_subtitle/submit";
      let _0x290cfe = {
        adjust_endtime: 200,
        audio: _0x307cf6,
        caption_type: 2,
        client_request_id: _0x3f3521.randomUUID(),
        max_lines: 1,
        songs_info: [],
        words_per_line: 16
      };
      let _0x29faf4 = await _0x4e8f85.post("" + _0x44fc3f + _0x297490, _0x290cfe, {
        headers: this._headers(_0x297490),
        timeout: 30000
      });
      let _0x41ea42 = _0x29faf4.data.code || 0;
      if (_0x41ea42 !== 0) {
        let _0x23d08a = _0x29faf4.data.message || _0x29faf4.data.msg || JSON.stringify(_0x29faf4.data);
        throw new Error("CapCut submit error " + _0x41ea42 + ": " + _0x23d08a);
      }
      return _0x29faf4.data.data.id;
    }
    async _query(_0x2fc0ff) {
      let _0x3f096b = "/lv/v1/audio_subtitle/query";
      let _0x17dc82 = await _0x4e8f85.post("" + _0x44fc3f + _0x3f096b, {
        id: _0x2fc0ff,
        pack_options: {
          need_attribute: true
        }
      }, {
        headers: this._headers(_0x3f096b),
        timeout: 30000
      });
      let _0x1b7d00 = _0x17dc82.data.code || 0;
      if (_0x1b7d00 !== 0) {
        let _0x177d05 = _0x17dc82.data.message || _0x17dc82.data.msg || JSON.stringify(_0x17dc82.data);
        throw new Error("CapCut query error " + _0x1b7d00 + ": " + _0x177d05);
      }
      return _0x17dc82.data;
    }
    _parseUtterances(_0x33635a) {
      return ((_0x33635a.data || _0x33635a).utterances || []).filter(_0x33d785 => _0x33d785.text && _0x33d785.text.trim()).filter(_0x255bd3 => _0x255bd3.end_time > _0x255bd3.start_time).map(_0x59304a => ({
        startTime: _0x59304a.start_time / 1000,
        endTime: _0x59304a.end_time / 1000,
        text: _0x59304a.text.trim()
      }));
    }
    async transcribe(_0x292763, {
      pollIntervalMs: _0x31cf48 = 1500,
      maxWaitMs: _0x28a5ac = 180000,
      onStatus: _0x2cfc78
    } = {}) {
      let _0x4df2bb = _0x53a72a.readFileSync(_0x292763);
      let _0x8f50d4 = _0x4df2bb.length;
      let _0x3ec8b5 = _0xd9ea3f(_0x4df2bb);
      if (_0x2cfc78) {
        _0x2cfc78("[CapCut ASR] Getting upload credentials...");
      }
      let _0x29e6c4 = await this._uploadSign();
      if (_0x2cfc78) {
        _0x2cfc78("[CapCut ASR] Registering upload...");
      }
      let _0x10b6ac = await this._applyUpload(_0x29e6c4, _0x8f50d4);
      if (_0x2cfc78) {
        _0x2cfc78("[CapCut ASR] Uploading audio (" + (_0x8f50d4 / 1024 / 1024).toFixed(1) + " MB)...");
      }
      await this._uploadFile(_0x10b6ac, _0x4df2bb, _0x3ec8b5);
      await this._uploadCheck(_0x10b6ac, _0x3ec8b5);
      await this._uploadCommit({
        ..._0x10b6ac,
        sessionToken: _0x29e6c4.sessionToken
      }, _0x4df2bb, _0x3ec8b5);
      if (_0x2cfc78) {
        _0x2cfc78("[CapCut ASR] Submitting ASR job...");
      }
      let _0x1f45d3 = await this._submit(_0x10b6ac.storeUri);
      if (_0x2cfc78) {
        _0x2cfc78("[CapCut ASR] Waiting for result...");
      }
      let _0x3f19ee = Date.now() + _0x28a5ac;
      while (Date.now() < _0x3f19ee) {
        let _0x59a66f = await this._query(_0x1f45d3);
        let _0x3b9932 = _0x59a66f.data || _0x59a66f;
        if (_0x3b9932.utterances !== undefined) {
          let _0x42542c = this._parseUtterances(_0x3b9932);
          if (_0x42542c.length > 0) {
            if (_0x2cfc78) {
              _0x2cfc78("[CapCut ASR] Done — " + _0x42542c.length + " segments.");
            }
            return _0x42542c;
          }
          if (((_0x3b9932.attribute || {}).extra || {}).empty_reason) {
            if (_0x2cfc78) {
              _0x2cfc78("[CapCut ASR] No speech detected.");
            }
            return [];
          }
        } else {
          let _0x4b6d93 = String(_0x3b9932.status || "").toLowerCase();
          if (["failed", "error", "fail"].includes(_0x4b6d93)) {
            throw new Error("CapCut ASR job failed: " + (_0x3b9932.message || _0x3b9932.msg || _0x4b6d93));
          }
          if (["completed", "success", "done", "finish", "finished"].includes(_0x4b6d93)) {
            let _0xf7466e = this._parseUtterances(_0x3b9932);
            if (_0xf7466e.length > 0) {
              return _0xf7466e;
            }
          }
        }
        let _0x4d0f4b = _0x31cf48 * (0.7 + Math.random() * 0.6);
        await new Promise(_0x219c99 => setTimeout(_0x219c99, _0x4d0f4b));
      }
      throw new Error("CapCut ASR timeout — no result received");
    }
    async getUploadAuth() {
      return this._uploadSign();
    }
    async submitTask(_0x30bf39) {
      return this._submit(_0x30bf39);
    }
    async pollResult(_0x28f6ee, _0x121767 = 180000) {
      let _0x4b93d2 = Date.now() + _0x121767;
      while (Date.now() < _0x4b93d2) {
        let _0x201bc5 = await this._query(_0x28f6ee);
        let _0x2bc59e = _0x201bc5.data || _0x201bc5;
        let _0x433544 = this._parseUtterances(_0x2bc59e);
        if (_0x433544.length > 0) {
          return _0x433544;
        }
        let _0x37f86d = String(_0x2bc59e.status || "").toLowerCase();
        if (["failed", "error", "fail"].includes(_0x37f86d)) {
          throw new Error("CapCut ASR task failed on server");
        }
        await new Promise(_0x1e4463 => setTimeout(_0x1e4463, 2000));
      }
      throw new Error("CapCut ASR timeout");
    }
    utterancesToSegments(_0x28cf5b) {
      return _0x28cf5b.map(_0x52f53c => ({
        startTime: _0x52f53c.start_time / 1000,
        endTime: _0x52f53c.end_time / 1000,
        text: _0x52f53c.text
      }));
    }
  };
  function _0x2ad24f() {
    return Date.now() < _0x55dd88;
  }
  function _0x52b330(_0x19843d) {
    _0x55dd88 = Date.now() + _0xce8db7;
    _0x475722++;
  }
  function _0x55a847() {
    _0x475722 = 0;
  }
  _0xcb9b74.exports = {
    CapCutASR: _0x43b1db,
    isOnCooldown: _0x2ad24f,
    setCooldown: _0x52b330,
    resetCooldown: _0x55a847
  };
});
var Ia = Z((_0x3426b7, _0x33f9a4) => {
  var _0x25bc35 = je();
  function _0x388c98(_0x3d8e60, _0x592674 = {}) {
    if (_0x592674 == null || typeof _0x592674 != "object" || Array.isArray(_0x592674)) {
      _0x105c92("plan opts must be an object");
    }
    let _0x45b1a3 = _0x592674.CHUNK_SECONDS ?? 45;
    let _0x16f5eb = _0x592674.CHUNK_OVERLAP_SECONDS ?? 3;
    if (typeof _0x45b1a3 != "number" || !Number.isFinite(_0x45b1a3) || _0x45b1a3 <= 0) {
      _0x105c92("CHUNK_SECONDS must be a positive finite number");
    }
    if (typeof _0x16f5eb != "number" || !Number.isFinite(_0x16f5eb) || _0x16f5eb < 0) {
      _0x105c92("CHUNK_OVERLAP_SECONDS must be a non-negative finite number");
    }
    let _0x1511df = typeof _0x3d8e60 == "number" && Number.isFinite(_0x3d8e60) ? _0x3d8e60 : null;
    if (_0x1511df > 0 && (!Number.isFinite(Math.ceil(_0x1511df / _0x45b1a3)) || Math.ceil(_0x1511df / _0x45b1a3) > 100000)) {
      _0x105c92("plan would exceed 100000 windows");
    }
    return _0x25bc35.executeNativeRequired({
      algorithm: "transcription.planChunkWindows",
      method: "planChunkWindowsJson",
      input: {
        duration: _0x1511df,
        opts: {
          ..._0x592674,
          CHUNK_SECONDS: _0x45b1a3,
          CHUNK_OVERLAP_SECONDS: _0x16f5eb
        }
      },
      validateOutput: _0x2e29f0 => _0xd0025(_0x2e29f0, _0x1511df, _0x45b1a3, _0x16f5eb)
    });
  }
  function _0xd0025(_0x19d833, _0x5138c8, _0xabec85, _0x221daa) {
    if (!Array.isArray(_0x19d833) || _0x19d833.length === 0 || _0x19d833.length > 100000) {
      return "expected 1..100000 windows";
    }
    if (!(_0x5138c8 > 0)) {
      let _0x220db1 = _0x19d833[0];
      if (_0x19d833.length === 1 && _0x220db1 && _0x220db1.index === 0 && _0x220db1.start === 0 && _0x220db1.length === null) {
        return null;
      } else {
        return "invalid full-file fallback window";
      }
    }
    let _0x4e249b = -1;
    for (let _0x37b5ca = 0; _0x37b5ca < _0x19d833.length; _0x37b5ca++) {
      let _0x233caf = _0x19d833[_0x37b5ca];
      if (!_0x233caf || _0x233caf.index !== _0x37b5ca) {
        return "window[" + _0x37b5ca + "] has invalid index";
      }
      if (typeof _0x233caf.start != "number" || !Number.isFinite(_0x233caf.start) || _0x233caf.start < 0) {
        return "window[" + _0x37b5ca + "].start must be a non-negative finite number";
      }
      if (_0x37b5ca === 0 && _0x233caf.start !== 0) {
        return "first window must start at 0";
      }
      if (_0x233caf.start <= _0x4e249b) {
        return "window starts must be strictly increasing";
      }
      if (_0x37b5ca > 0 && Math.abs(_0x233caf.start - (_0x4e249b + _0xabec85)) > 1e-9) {
        return "window[" + _0x37b5ca + "].start does not advance by CHUNK_SECONDS";
      }
      if (_0x233caf.start >= _0x5138c8) {
        return "window[" + _0x37b5ca + "].start is outside duration";
      }
      if (typeof _0x233caf.length != "number" || !Number.isFinite(_0x233caf.length) || _0x233caf.length <= 0) {
        return "window[" + _0x37b5ca + "].length must be a positive finite number";
      }
      if (_0x233caf.length > _0x5138c8 - _0x233caf.start + 1e-9) {
        return "window[" + _0x37b5ca + "] extends beyond duration";
      }
      let _0x4c0136 = Math.min(_0x5138c8 - _0x233caf.start, _0xabec85 + _0x221daa);
      if (Math.abs(_0x233caf.length - _0x4c0136) > 1e-9) {
        return "window[" + _0x37b5ca + "].length does not match the configured chunk and overlap";
      }
      _0x4e249b = _0x233caf.start;
    }
    let _0x57e911 = _0x19d833[_0x19d833.length - 1];
    if (_0x57e911.start + _0x57e911.length + 1e-9 >= _0x5138c8) {
      return null;
    } else {
      return "windows do not cover duration";
    }
  }
  function _0x24661b(_0x208f58, _0x6b321e, _0x4496ad) {
    let _0x4b2f0c = Array.isArray(_0x208f58) ? _0x208f58 : [];
    if (_0x4b2f0c.length > _0x2bf6df) {
      _0x105c92("too many segments (" + _0x4b2f0c.length + " > " + _0x2bf6df + ")");
    }
    if (typeof _0x6b321e != "number" || !Number.isFinite(_0x6b321e)) {
      _0x105c92("windowStart must be a finite number");
    }
    for (let _0x1ff3a5 = 0; _0x1ff3a5 < _0x4b2f0c.length; _0x1ff3a5++) {
      _0x15c17a(_0x4b2f0c[_0x1ff3a5], _0x1ff3a5);
    }
    let _0x3229d4 = typeof _0x4496ad == "number" && Number.isFinite(_0x4496ad) ? _0x4496ad : null;
    return _0x25bc35.executeNativeRequired({
      algorithm: "transcription.offsetSegments",
      method: "offsetSegmentsJson",
      input: {
        segs: _0x4b2f0c,
        windowStart: _0x6b321e,
        duration: _0x3229d4
      },
      validateOutput: _0x4890ce => _0x69aee6(_0x4890ce, _0x3229d4, _0x4b2f0c.length)
    });
  }
  function _0x15c17a(_0x2616f1, _0x4084de) {
    if (_0x2616f1 == null || typeof _0x2616f1 != "object" || Array.isArray(_0x2616f1)) {
      _0x105c92("segment[" + _0x4084de + "] must be an object");
    }
    for (let _0x208fd3 of ["startTime", "endTime"]) {
      let _0x111e94 = _0x2616f1[_0x208fd3];
      if (_0x111e94 != null && typeof _0x111e94 != "number" && typeof _0x111e94 != "string" && typeof _0x111e94 != "boolean") {
        _0x105c92("segment[" + _0x4084de + "]." + _0x208fd3 + " is not Number-coercible");
      }
    }
    if (_0x2616f1.text && typeof _0x2616f1.text != "string") {
      _0x105c92("segment[" + _0x4084de + "].text must be a string when truthy");
    }
    if (typeof _0x2616f1.text == "string" && _0x2616f1.text.length > _0x12ac94) {
      _0x105c92("segment[" + _0x4084de + "].text too long (" + _0x2616f1.text.length + " > " + _0x12ac94 + ")");
    }
  }
  function _0x69aee6(_0x53363b, _0x257fc6, _0x410b64) {
    if (!Array.isArray(_0x53363b) || _0x53363b.length > _0x410b64 || _0x53363b.length > _0x2bf6df) {
      return "expected a bounded segment array";
    }
    for (let _0x2b0534 = 0; _0x2b0534 < _0x53363b.length; _0x2b0534++) {
      let _0x4d4a0e = _0x53363b[_0x2b0534];
      if (_0x4d4a0e == null || typeof _0x4d4a0e != "object" || Array.isArray(_0x4d4a0e)) {
        return "segment[" + _0x2b0534 + "] must be an object";
      }
      if (typeof _0x4d4a0e.startTime != "number" || !Number.isFinite(_0x4d4a0e.startTime) || _0x4d4a0e.startTime < 0 || typeof _0x4d4a0e.endTime != "number" || !Number.isFinite(_0x4d4a0e.endTime) || _0x4d4a0e.endTime <= _0x4d4a0e.startTime) {
        return "segment[" + _0x2b0534 + "] has invalid time bounds";
      }
      if (_0x257fc6 > 0 && _0x4d4a0e.endTime > _0x257fc6 + 1e-9) {
        return "segment[" + _0x2b0534 + "] exceeds duration";
      }
      if (typeof _0x4d4a0e.text != "string" || !_0x4d4a0e.text || _0x4d4a0e.text !== _0x4d4a0e.text.trim() || _0x4d4a0e.text.length > _0x12ac94) {
        return "segment[" + _0x2b0534 + "] has invalid text";
      }
    }
    return null;
  }
  function _0x105c92(_0x15c14a) {
    throw new _0x25bc35.NativeRequiredError("transcriptionChunker adapter: " + _0x15c14a);
  }
  var _0x12ac94 = 1000000;
  var _0x2bf6df = 200000;
  function _0x3bdb9e(_0x3c45b6, _0x2ba99d) {
    if (_0x3c45b6 == null || typeof _0x3c45b6 != "object" || Array.isArray(_0x3c45b6)) {
      _0x105c92("segment " + _0x2ba99d + " must be an object");
    }
    if (typeof _0x3c45b6.startTime != "number" || !Number.isFinite(_0x3c45b6.startTime)) {
      _0x105c92("segment " + _0x2ba99d + ".startTime must be a finite number");
    }
    if (_0x3c45b6.text && typeof _0x3c45b6.text != "string") {
      _0x105c92("segment " + _0x2ba99d + ".text must be a string when truthy");
    }
    let _0x651fb0 = _0x3c45b6.text || "";
    if (_0x651fb0.length > _0x12ac94) {
      _0x105c92("segment " + _0x2ba99d + ".text too long (" + _0x651fb0.length + " > " + _0x12ac94 + ")");
    }
  }
  function _0x2a557d(_0x439282) {
    if (_0x439282 && typeof _0x439282 != "string") {
      _0x105c92("text must be a string when truthy (got " + typeof _0x439282 + ")");
    }
    let _0x5477d7 = _0x439282 || "";
    if (_0x5477d7.length > _0x12ac94) {
      _0x105c92("text too long (" + _0x5477d7.length + " > " + _0x12ac94 + ")");
    }
    return _0x25bc35.executeNativeRequired({
      algorithm: "transcription.normalizeText",
      method: "normalizeText",
      input: _0x5477d7,
      validateOutput: _0x34e319 => typeof _0x34e319 == "string" ? null : "expected string, got " + typeof _0x34e319
    });
  }
  function _0xb3fc8a(_0x5dc4f2, _0x179017, _0x3b5aa2) {
    _0x3bdb9e(_0x5dc4f2, "a");
    _0x3bdb9e(_0x179017, "b");
    if (typeof _0x3b5aa2 != "number" || !Number.isFinite(_0x3b5aa2)) {
      _0x105c92("gap must be a finite number (got " + _0x3b5aa2 + ")");
    }
    return _0x25bc35.executeNativeRequired({
      algorithm: "transcription.isDuplicate",
      method: "isDuplicateJson",
      input: {
        a: _0x5dc4f2,
        b: _0x179017,
        gap: _0x3b5aa2
      },
      validateOutput: _0x880f43 => typeof _0x880f43 == "boolean" ? null : "expected boolean, got " + typeof _0x880f43
    });
  }
  function _0x4575e7(_0xa64803, _0x56d01a = {}) {
    if (_0x56d01a == null || typeof _0x56d01a != "object" || Array.isArray(_0x56d01a)) {
      _0x105c92("merge opts must be an object");
    }
    let _0x6fe677 = _0x56d01a.CHUNK_DEDUPE_GAP ?? 0.6;
    if (typeof _0x6fe677 != "number" || !Number.isFinite(_0x6fe677)) {
      _0x105c92("CHUNK_DEDUPE_GAP must be a finite number");
    }
    let _0x17bae4 = _0xa64803 || [];
    if (!Array.isArray(_0x17bae4)) {
      _0x105c92("chunkSegmentArrays must be an array when truthy");
    }
    if (_0x17bae4.length > _0xce1992) {
      _0x105c92("too many chunk arrays (" + _0x17bae4.length + " > " + _0xce1992 + ")");
    }
    let _0x20ba7c = 0;
    for (let _0x47a189 = 0; _0x47a189 < _0x17bae4.length; _0x47a189++) {
      let _0x4ab4f7 = _0x17bae4[_0x47a189];
      if (Array.isArray(_0x4ab4f7)) {
        _0x20ba7c += _0x4ab4f7.length;
        if (_0x20ba7c > _0x2bf6df) {
          _0x105c92("too many segments (" + _0x20ba7c + " > " + _0x2bf6df + ")");
        }
        for (let _0x26592d = 0; _0x26592d < _0x4ab4f7.length; _0x26592d++) {
          _0x16536e(_0x4ab4f7[_0x26592d], _0x47a189 + "][" + _0x26592d);
        }
      }
    }
    let _0xf329b7;
    try {
      _0xf329b7 = JSON.parse(JSON.stringify(_0x17bae4));
    } catch (_0x4bb0fe) {
      _0x105c92("chunkSegmentArrays must be JSON-serializable (" + _0x4bb0fe.message + ")");
    }
    return _0x25bc35.executeNativeRequired({
      algorithm: "transcription.mergeChunkedSegments",
      method: "mergeChunkedSegmentsJson",
      input: {
        chunkSegmentArrays: _0xf329b7,
        opts: {
          ..._0x56d01a,
          CHUNK_DEDUPE_GAP: _0x6fe677
        }
      },
      validateOutput: _0xdea32f => _0x5237a6(_0xdea32f, _0xf329b7, _0x20ba7c)
    });
  }
  var _0xce1992 = 100000;
  function _0x16536e(_0x2e9bb8, _0x30f6a6) {
    if (_0x2e9bb8 == null || typeof _0x2e9bb8 != "object" || Array.isArray(_0x2e9bb8)) {
      _0x105c92("segment[" + _0x30f6a6 + "] must be an object");
    }
    for (let _0x2e3321 of ["startTime", "endTime"]) {
      if (typeof _0x2e9bb8[_0x2e3321] != "number" || !Number.isFinite(_0x2e9bb8[_0x2e3321])) {
        _0x105c92("segment[" + _0x30f6a6 + "]." + _0x2e3321 + " must be a finite number");
      }
    }
    if (_0x2e9bb8.text && typeof _0x2e9bb8.text != "string") {
      _0x105c92("segment[" + _0x30f6a6 + "].text must be a string when truthy");
    }
    if (typeof _0x2e9bb8.text == "string" && _0x2e9bb8.text.length > _0x12ac94) {
      _0x105c92("segment[" + _0x30f6a6 + "].text too long (" + _0x2e9bb8.text.length + " > " + _0x12ac94 + ")");
    }
  }
  function _0x36795c(_0x22ce33) {
    if (_0x22ce33 === null || typeof _0x22ce33 != "object") {
      return JSON.stringify(_0x22ce33);
    } else if (Array.isArray(_0x22ce33)) {
      return "[" + _0x22ce33.map(_0x36795c).join(",") + "]";
    } else {
      return "{" + Object.keys(_0x22ce33).sort().map(_0x555902 => JSON.stringify(_0x555902) + ":" + _0x36795c(_0x22ce33[_0x555902])).join(",") + "}";
    }
  }
  function _0x5237a6(_0x19c163, _0x22f252, _0x65c4af) {
    if (!Array.isArray(_0x19c163) || _0x19c163.length > _0x65c4af || _0x19c163.length > _0x2bf6df) {
      return "expected a bounded segment array";
    }
    if (_0x65c4af > 0 && _0x19c163.length === 0) {
      return "non-empty input produced no segments";
    }
    let _0x1ee705 = new Map();
    for (let _0x38efdf of _0x22f252) {
      if (Array.isArray(_0x38efdf)) {
        for (let _0x2b4dee of _0x38efdf) {
          let _0x3a12e3 = _0x36795c(_0x2b4dee);
          _0x1ee705.set(_0x3a12e3, (_0x1ee705.get(_0x3a12e3) || 0) + 1);
        }
      }
    }
    let _0x4cd753 = null;
    for (let _0x1028d5 = 0; _0x1028d5 < _0x19c163.length; _0x1028d5++) {
      let _0x6f435e = _0x19c163[_0x1028d5];
      if (_0x6f435e == null || typeof _0x6f435e != "object" || Array.isArray(_0x6f435e)) {
        return "segment[" + _0x1028d5 + "] must be an object";
      }
      if (typeof _0x6f435e.startTime != "number" || !Number.isFinite(_0x6f435e.startTime) || typeof _0x6f435e.endTime != "number" || !Number.isFinite(_0x6f435e.endTime)) {
        return "segment[" + _0x1028d5 + "] has invalid times";
      }
      if (_0x6f435e.text && typeof _0x6f435e.text != "string") {
        return "segment[" + _0x1028d5 + "] has invalid text";
      }
      if (typeof _0x6f435e.text == "string" && _0x6f435e.text.length > _0x12ac94) {
        return "segment[" + _0x1028d5 + "].text is too long";
      }
      if (_0x4cd753 && (_0x6f435e.startTime < _0x4cd753.startTime || _0x6f435e.startTime === _0x4cd753.startTime && _0x6f435e.endTime < _0x4cd753.endTime)) {
        return "segments are not sorted by startTime/endTime";
      }
      _0x4cd753 = _0x6f435e;
      let _0x4d07ab = _0x36795c(_0x6f435e);
      let _0x388cb3 = _0x1ee705.get(_0x4d07ab) || 0;
      if (_0x388cb3 === 0) {
        return "segment[" + _0x1028d5 + "] was not present in the input";
      }
      _0x1ee705.set(_0x4d07ab, _0x388cb3 - 1);
    }
    return null;
  }
  _0x33f9a4.exports = {
    planChunkWindows: _0x388c98,
    offsetSegments: _0x24661b,
    mergeChunkedSegments: _0x4575e7,
    normalizeText: _0x2a557d,
    isDuplicate: _0xb3fc8a,
    CHUNK_SECONDS: 45,
    CHUNK_OVERLAP_SECONDS: 3,
    CHUNK_DEDUPE_GAP: 0.6
  };
});
var Oa = Z((_0x25c6e8, _0xdae2d9) => {
  var {
    execFile: _0x4d30ad
  } = require("node:child_process");
  var _0x2e6686 = require("node:fs");
  var _0x165d8d = require("node:os");
  var _0x4a0dd0 = require("node:path");
  var {
    planChunkWindows: _0x4b4d3d,
    offsetSegments: _0x5deb73
  } = Ia();
  var {
    CapCutASR: _0x420d58
  } = On();
  var _0x48d95e = 300;
  var _0x2e8f3b = 5;
  var _0x14e475 = 2;
  function _0x5d8e45(_0x4d047e) {
    if (!_0x4d047e || _0x4d047e === "ffmpeg") {
      return "ffprobe";
    } else {
      return _0x4d047e.replace(/ffmpeg(\.exe)?$/i, "ffprobe$1");
    }
  }
  function _0x19eda1(_0x38a635, _0xf9c9f6) {
    return new Promise(_0x3832f9 => {
      _0x4d30ad(_0x5d8e45(_0x38a635), ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", _0xf9c9f6], (_0x509e63, _0x346937) => {
        if (_0x509e63) {
          return _0x3832f9(null);
        }
        let _0x58e7c2 = Number.parseFloat(String(_0x346937 || "").trim());
        _0x3832f9(Number.isFinite(_0x58e7c2) && _0x58e7c2 > 0 ? _0x58e7c2 : null);
      });
    });
  }
  function _0x6f70d9(_0x5e1cd4, _0x32d6b4, _0x3b72c1, _0x3dde2d, _0x1ddf6f) {
    return new Promise((_0x56b7bd, _0x71cf11) => {
      let _0x5ec657 = ["-y"];
      if (_0x3b72c1 > 0) {
        _0x5ec657.push("-ss", String(_0x3b72c1));
      }
      if (_0x3dde2d != null) {
        _0x5ec657.push("-t", String(_0x3dde2d));
      }
      _0x5ec657.push("-i", _0x32d6b4, "-acodec", "libmp3lame", "-q:a", "4", _0x1ddf6f);
      _0x4d30ad(_0x5e1cd4 || "ffmpeg", _0x5ec657, _0x1c14cd => _0x1c14cd ? _0x71cf11(_0x1c14cd) : _0x56b7bd());
    });
  }
  function _0x49e3ed(_0x5628df, _0x93de1c) {
    let _0x5ab2ef = Math.min(_0x5628df.endTime, _0x93de1c.endTime) - Math.max(_0x5628df.startTime, _0x93de1c.startTime);
    if (_0x5ab2ef <= 0) {
      return false;
    }
    let _0x2cc652 = Math.min(_0x5628df.endTime - _0x5628df.startTime, _0x93de1c.endTime - _0x93de1c.startTime) || 1e-9;
    return _0x5ab2ef / _0x2cc652 >= 0.3;
  }
  function _0x1b791d(_0x472cba) {
    let _0x21d170 = [];
    for (let _0x8d761b of _0x472cba || []) {
      if (Array.isArray(_0x8d761b)) {
        _0x21d170.push(..._0x8d761b);
      }
    }
    _0x21d170.sort((_0x5e3350, _0x5d0247) => _0x5e3350.startTime - _0x5d0247.startTime || _0x5e3350.endTime - _0x5d0247.endTime);
    let _0xc9d974 = [];
    for (let _0x323ce6 of _0x21d170) {
      let _0x1d0151 = _0xc9d974[_0xc9d974.length - 1];
      if (_0x1d0151 && _0x49e3ed(_0x1d0151, _0x323ce6)) {
        let _0x2660f0 = _0x323ce6.text.length > _0x1d0151.text.length ? _0x323ce6 : _0x1d0151;
        _0xc9d974[_0xc9d974.length - 1] = {
          startTime: Math.min(_0x1d0151.startTime, _0x323ce6.startTime),
          endTime: Math.max(_0x1d0151.endTime, _0x323ce6.endTime),
          text: _0x2660f0.text
        };
        continue;
      }
      _0xc9d974.push({
        startTime: _0x323ce6.startTime,
        endTime: _0x323ce6.endTime,
        text: _0x323ce6.text
      });
    }
    return _0xc9d974;
  }
  async function _0x504070(_0x815e8a, {
    ffmpegPath: _0x29a62f = "ffmpeg",
    tdid: _0x37665a,
    onStatus: _0x39b51d,
    onProgress: _0x56b24c
  } = {}) {
    let _0x5f3ef5 = await _0x19eda1(_0x29a62f, _0x815e8a);
    let _0x164ae1 = _0x4b4d3d(_0x5f3ef5, {
      CHUNK_SECONDS: _0x48d95e,
      CHUNK_OVERLAP_SECONDS: _0x2e8f3b
    });
    if (_0x164ae1.length <= 1) {
      if (_0x56b24c) {
        _0x56b24c({
          done: 0,
          total: 1
        });
      }
      let _0x42b3bb = new _0x420d58(_0x37665a);
      _0x42b3bb.markUsed();
      let _0xcff7bc = await _0x42b3bb.transcribe(_0x815e8a, {
        onStatus: _0x39b51d
      });
      if (_0x56b24c) {
        _0x56b24c({
          done: 1,
          total: 1
        });
      }
      return _0x5deb73(_0xcff7bc, 0, _0x5f3ef5);
    }
    if (_0x39b51d) {
      _0x39b51d("[CapCut ASR] Long audio (" + (_0x5f3ef5 / 60).toFixed(1) + " min) → " + _0x164ae1.length + " chunks");
    }
    let _0x9dae5a = _0x165d8d.tmpdir();
    let _0x473565 = [];
    let _0x3adbbf = [];
    if (_0x56b24c) {
      _0x56b24c({
        done: 0,
        total: _0x164ae1.length
      });
    }
    for (let _0x34a61b of _0x164ae1) {
      let _0x5a5008 = _0x4a0dd0.join(_0x9dae5a, "capcut_chunk_" + Date.now() + "_" + _0x34a61b.index + ".mp3");
      let _0x38d1e1 = false;
      let _0x2453d5 = null;
      for (let _0x2981bb = 1; _0x2981bb <= _0x14e475 && !_0x38d1e1; _0x2981bb++) {
        try {
          await _0x6f70d9(_0x29a62f, _0x815e8a, _0x34a61b.start, _0x34a61b.length, _0x5a5008);
          if (_0x39b51d) {
            _0x39b51d("[CapCut ASR] Chunk " + (_0x34a61b.index + 1) + "/" + _0x164ae1.length + " (@" + (_0x34a61b.start / 60).toFixed(1) + " min)" + (_0x2981bb > 1 ? " — thử lại " + _0x2981bb : "") + "...");
          }
          let _0x1f778d = new _0x420d58(_0x37665a);
          _0x1f778d.markUsed();
          let _0x4b3c33 = await _0x1f778d.transcribe(_0x5a5008, {
            onStatus: () => {}
          });
          _0x473565.push(_0x5deb73(_0x4b3c33, _0x34a61b.start, _0x5f3ef5));
          _0x38d1e1 = true;
          if (_0x56b24c) {
            _0x56b24c({
              done: _0x34a61b.index + 1,
              total: _0x164ae1.length
            });
          }
        } catch (_0x318133) {
          _0x2453d5 = _0x318133;
          if (_0x39b51d) {
            _0x39b51d("[CapCut ASR] Chunk " + (_0x34a61b.index + 1) + " thử " + _0x2981bb + " lỗi: " + _0x318133.message);
          }
        } finally {
          try {
            _0x2e6686.unlinkSync(_0x5a5008);
          } catch {}
        }
      }
      if (!_0x38d1e1) {
        let _0x562805 = _0x34a61b.start + (_0x34a61b.length ?? Math.max(0, _0x5f3ef5 - _0x34a61b.start));
        _0x3adbbf.push({
          index: _0x34a61b.index,
          start: _0x34a61b.start,
          end: _0x562805,
          error: _0x2453d5?.message || ""
        });
      }
    }
    if (_0x3adbbf.length) {
      let _0x5e0d3f = _0x3adbbf.map(_0x320e7d => (_0x320e7d.start / 60).toFixed(1) + "–" + (_0x320e7d.end / 60).toFixed(1) + " phút").join(", ");
      let _0x5b74a2 = new Error("CapCut ASR không hoàn chỉnh: " + _0x3adbbf.length + "/" + _0x164ae1.length + " đoạn lỗi (thiếu " + _0x5e0d3f + ").");
      _0x5b74a2.code = "ASR_INCOMPLETE";
      _0x5b74a2.missingRanges = _0x3adbbf;
      throw _0x5b74a2;
    }
    let _0x3c35af = _0x1b791d(_0x473565);
    if (_0x39b51d) {
      _0x39b51d("[CapCut ASR] Done — " + _0x3c35af.length + " segments from " + _0x164ae1.length + " chunks");
    }
    return _0x3c35af;
  }
  _0xdae2d9.exports = {
    transcribeCapcutChunked: _0x504070,
    mergeCapcutSegments: _0x1b791d,
    probeDuration: _0x19eda1,
    CAPCUT_CHUNK_SECONDS: _0x48d95e,
    CAPCUT_CHUNK_OVERLAP: _0x2e8f3b
  };
});
var La = Z((_0x1a821b, _0x38deff) => {
  var _0x44682b = require("axios");
  var _0x354280 = require("node:fs");
  var _0x3475e1 = require("form-data");
  var _0x19deaf = "https://api.groq.com/openai/v1/audio/transcriptions";
  var _0xca439c = 3;
  var _0x3e8d82 = 120000;
  var _0x54ea00 = class {
    constructor(_0x3529d5) {
      this.apiKey = _0x3529d5;
    }
    async transcribe(_0x2ed269, _0x5dae75 = null, _0x35ee51 = null, _0x10a7a6 = null, _0x1fded7 = null) {
      if (!this.apiKey) {
        throw new Error("No Groq API key configured");
      }
      let _0x2bbe42 = _0x35ee51 || _0x44682b;
      let _0x7ff1b0 = _0x10a7a6 || (_0x36d06a => new Promise(_0x59e45a => setTimeout(_0x59e45a, _0x36d06a)));
      let _0x20daa3 = _0x1fded7 || (_0x29ceda => _0x354280.createReadStream(_0x29ceda));
      let _0x33f152;
      for (let _0x21adb8 = 0; _0x21adb8 < _0xca439c; _0x21adb8++) {
        try {
          let _0x5a5ee6 = new _0x3475e1();
          _0x5a5ee6.append("file", _0x20daa3(_0x2ed269));
          _0x5a5ee6.append("model", "whisper-large-v3-turbo");
          _0x5a5ee6.append("response_format", "verbose_json");
          if (_0x5dae75 && _0x5dae75 !== "auto") {
            _0x5a5ee6.append("language", _0x5dae75);
          }
          return ((await _0x2bbe42.post(_0x19deaf, _0x5a5ee6, {
            headers: {
              ..._0x5a5ee6.getHeaders(),
              Authorization: "Bearer " + this.apiKey
            },
            timeout: _0x3e8d82,
            maxBodyLength: Infinity,
            maxContentLength: Infinity
          })).data.segments || []).map(_0x48a7cf => ({
            startTime: _0x48a7cf.start,
            endTime: _0x48a7cf.end,
            text: (_0x48a7cf.text || "").trim()
          }));
        } catch (_0x5efd65) {
          _0x33f152 = _0x5efd65;
          if (_0x21adb8 < _0xca439c - 1) {
            await _0x7ff1b0((_0x21adb8 + 1) * 1000);
          }
        }
      }
      throw _0x33f152;
    }
  };
  _0x38deff.exports = {
    GroqSTT: _0x54ea00
  };
});
var Gt = Z((_0x2ba8c0, _0x1e03e3) => {
  var _0x5ce806 = "https://api.deepseek.com/v1/chat/completions";
  function _0x304fc7(_0x52aa83) {
    return Math.max(20, Math.floor((_0x52aa83 - 1200) / 30));
  }
  var _0x115a58 = [{
    id: "grok",
    match: _0x26755f => _0x26755f.startsWith("grok"),
    name: "Grok",
    defaultUrl: "https://api.x.ai/v1/chat/completions",
    apiKeySettingKey: "grokApiKey",
    maxTokCap: _0x41f9c3 => _0x41f9c3.includes("grok-4.20") ? 16384 : 8192,
    chunkLines: 120,
    inputTokenBudget: 24000
  }, {
    id: "groq",
    match: _0x460cb9 => _0x460cb9.includes("gpt-oss") || _0x460cb9.includes("llama") || _0x460cb9.includes("qwen"),
    name: "Groq",
    defaultUrl: "https://api.groq.com/openai/v1/chat/completions",
    apiKeySettingKey: "groqApiKey",
    maxTokCap: () => 4096,
    fixedTokens: 4096,
    groqVi: true,
    chunkLines: _0x304fc7(4096),
    inputTokenBudget: 8000
  }, {
    id: "openai",
    match: _0x35e691 => _0x35e691.startsWith("gpt"),
    name: "OpenAI",
    defaultUrl: "https://api.openai.com/v1/chat/completions",
    apiKeySettingKey: "openaiApiKey",
    maxTokCap: () => 4096,
    fixedTokens: 4096,
    chunkLines: _0x304fc7(4096),
    inputTokenBudget: 24000
  }, {
    id: "gemini",
    match: _0x9bc6b4 => _0x9bc6b4.startsWith("gemini"),
    name: "Gemini",
    defaultUrl: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    apiKeySettingKey: "geminiApiKey",
    maxTokCap: () => 32768,
    isGeminiLike: true,
    chunkLines: 300,
    inputTokenBudget: 100000
  }, {
    id: "deepseek",
    match: () => true,
    name: "DeepSeek",
    defaultUrl: _0x5ce806,
    apiKeySettingKey: "deepseekApiKey",
    isDeepSeek: true,
    chunkLines: 120,
    inputTokenBudget: 24000
  }];
  var _0x5414ad = ["ag/gemini-3-flash"];
  function _0x37f680(_0x561661, _0x7e0f32) {
    let _0x5967ee = (_0x561661 || "").toLowerCase();
    if (_0x7e0f32 === "ezmax") {
      let _0x49fc64 = _0x5967ee.includes("gemini");
      return {
        id: "ezmax",
        name: "Ezmax Translate",
        defaultUrl: null,
        apiKeySettingKey: "ezmaxApiKey",
        maxTokCap: () => _0x49fc64 ? 32768 : 8192,
        isGeminiLike: _0x49fc64,
        isEzmax: true,
        chunkLines: 60,
        inputTokenBudget: 8000
      };
    }
    if (_0x7e0f32) {
      let _0x46441e = _0x5967ee.includes("gemini");
      return {
        id: "custom",
        name: "Custom",
        defaultUrl: null,
        apiKeySettingKey: "customApiKey",
        maxTokCap: () => _0x46441e ? 32768 : 8192,
        isGeminiLike: _0x46441e,
        chunkLines: 60,
        inputTokenBudget: 8000
      };
    }
    return _0x115a58.find(_0x4dbdf9 => _0x4dbdf9.match(_0x5967ee));
  }
  function _0x384246(_0x555c1d, _0x11ef03) {
    let _0x15a4bf = (_0x555c1d || "").toLowerCase();
    if (_0x11ef03) {
      return 60;
    }
    let _0x234f95 = _0x37f680(_0x555c1d, false);
    if (_0x234f95.id === "gemini") {
      if (_0x15a4bf.includes("lite")) {
        return 600;
      }
      if (_0x15a4bf.includes("flash")) {
        return 400;
      }
      if (_0x15a4bf.includes("pro")) {
        return 120;
      }
    }
    return _0x234f95.chunkLines;
  }
  function _0x3bdb95(_0x322b05, _0x374204, _0x139f9c) {
    let _0x547fc0 = _0x37f680(_0x322b05, _0x139f9c);
    let _0x47008a = (_0x322b05 || "").toLowerCase();
    return {
      id: _0x547fc0.id,
      name: _0x547fc0.name,
      url: _0x374204 || _0x547fc0.defaultUrl,
      apiKeySettingKey: _0x547fc0.apiKeySettingKey,
      maxTokCap: _0x547fc0.maxTokCap ? _0x547fc0.maxTokCap(_0x47008a) : undefined,
      fixedTokens: _0x547fc0.fixedTokens,
      groqVi: !!_0x547fc0.groqVi,
      isDeepSeek: !!_0x547fc0.isDeepSeek,
      isEzmax: !!_0x547fc0.isEzmax,
      isGeminiLike: !!_0x547fc0.isGeminiLike,
      inputTokenBudget: _0x547fc0.inputTokenBudget || 16000,
      chunkLines: _0x384246(_0x322b05, _0x139f9c)
    };
  }
  function _0x53e060(_0x3ade47) {
    if (_0x3ade47.ezmaxApiKey) {
      return _0x3ade47.ezmaxApiKey;
    }
    let _0x576441 = _0x3ade47.ezmaxAuth || {};
    if (_0x576441.licenseToken) {
      return _0x576441.licenseToken;
    } else {
      return "free:" + (_0x576441.machineId || "anon");
    }
  }
  _0x1e03e3.exports = {
    resolveProvider: _0x3bdb95,
    chunkLinesFor: _0x384246,
    resolveEzmaxBearer: _0x53e060,
    EZMAX_TRANSLATE_MODELS: _0x5414ad
  };
});
var Yt = Z((_0x536b07, _0x347ceb) => {
  var _0x356aae = {
    vi: "Vietnamese",
    en: "English",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    th: "Thai",
    id: "Indonesian",
    fr: "French",
    de: "German",
    es: "Spanish",
    pt: "Portuguese",
    ru: "Russian",
    ms: "Malay",
    hi: "Hindi",
    ar: "Arabic",
    tl: "Filipino",
    it: "Italian",
    tr: "Turkish",
    pl: "Polish",
    uk: "Ukrainian",
    nl: "Dutch",
    sv: "Swedish"
  };
  var _0x2a1e07 = {
    vi: 15,
    en: 11,
    ja: 9,
    ko: 11,
    zh: 9,
    fr: 16,
    es: 16,
    de: 13,
    th: 13,
    id: 14,
    ms: 14,
    hi: 10,
    ar: 10,
    tl: 14,
    it: 16,
    tr: 14,
    pl: 15,
    uk: 15,
    nl: 15,
    sv: 15
  };
  var _0x5254aa = {
    vi: 3,
    en: 2.9,
    ja: 2.2,
    ko: 3,
    zh: 1.3,
    fr: 3.7,
    es: 3.7,
    de: 3.5,
    th: 3.5,
    id: 3.5,
    ms: 3.5,
    hi: 2.5,
    ar: 2.8,
    tl: 3.5,
    it: 3.7,
    tr: 3.5,
    pl: 3.5,
    uk: 3,
    nl: 3.5,
    sv: 3.5
  };
  var _0x1b5d18 = {
    en: [13, 20],
    zh: [15, 24],
    ja: [18, 26],
    ko: [18, 26],
    fr: [22, 32],
    de: [20, 30],
    es: [22, 32],
    pt: [22, 32],
    ru: [20, 30],
    th: [22, 32],
    id: [22, 32],
    ms: [22, 32],
    hi: [20, 30],
    ar: [20, 30],
    tl: [22, 32],
    it: [22, 32],
    tr: [20, 30],
    pl: [20, 30],
    uk: [20, 30],
    nl: [20, 30],
    sv: [20, 30]
  };
  var _0x441c30 = new Set(["zh", "ja", "ko"]);
  var _0x27b835 = (() => {
    let _0x2c127c = {};
    for (let [_0xdee835, _0x13eeb8] of Object.entries(_0x356aae)) {
      _0x2c127c[_0x13eeb8.toLowerCase()] = _0xdee835;
    }
    Object.assign(_0x2c127c, {
      "tiếng việt": "vi",
      "tieng viet": "vi",
      vn: "vi",
      tagalog: "tl",
      mandarin: "zh",
      "chinese (simplified)": "zh",
      "chinese (traditional)": "zh"
    });
    return _0x2c127c;
  })();
  function _0x5dc004(_0x597459) {
    let _0x41a41e = String(_0x597459 ?? "").trim();
    if (!_0x41a41e) {
      return _0x41a41e;
    }
    let _0x4b3335 = _0x41a41e.toLowerCase();
    if (_0x356aae[_0x4b3335]) {
      return _0x4b3335;
    } else {
      return _0x27b835[_0x4b3335] || _0x41a41e;
    }
  }
  function _0x3f63b8(_0x2982b6) {
    return _0x356aae[_0x2982b6] || _0x2982b6;
  }
  function _0x1a5efe(_0x4aa20c) {
    return _0x2a1e07[_0x4aa20c] || 14;
  }
  function _0x1e707c(_0x524853) {
    return _0x5254aa[_0x524853] || 3;
  }
  function _0x5c4dcf(_0x106086, _0x500286 = false) {
    let _0x5da894 = _0x1b5d18[_0x106086] || [19, 29];
    if (_0x500286) {
      return _0x5da894[1];
    } else {
      return _0x5da894[0];
    }
  }
  function _0x350701(_0x24adec) {
    return _0x441c30.has(_0x24adec);
  }
  function _0xad9568(_0x406206) {
    let _0xf593b7 = 0;
    for (let _0x38f598 of _0x406206) {
      if (_0x38f598 >= "一" && _0x38f598 <= "鿿" || _0x38f598 >= "぀" && _0x38f598 <= "ヿ" || _0x38f598 >= "가" && _0x38f598 <= "힯") {
        _0xf593b7++;
      }
    }
    return _0xf593b7;
  }
  function _0xde6ea1(_0xd4fb98, _0x3691b8, _0x89bb08, _0x237b5f) {
    _0xd4fb98 = _0xd4fb98 || "";
    let _0xb7f913 = _0xad9568(_0xd4fb98);
    let _0x6e62dc = _0xd4fb98 ? _0xb7f913 > _0xd4fb98.length * 0.3 : false;
    let _0x54f7b7;
    if (_0x6e62dc) {
      _0x54f7b7 = _0x237b5f && _0x237b5f > 0 ? _0x237b5f : _0x5254aa[_0x89bb08] !== undefined ? _0x5254aa[_0x89bb08] : 3;
    } else {
      _0x54f7b7 = 1.35;
    }
    let _0x5c6219 = Math.max(12, Math.floor(_0xd4fb98.length * _0x54f7b7));
    if (_0x3691b8 != null && _0x3691b8 > 0) {
      let _0x5b214b = _0x2a1e07[_0x89bb08] !== undefined ? _0x2a1e07[_0x89bb08] : 14;
      _0x5c6219 = Math.min(_0x5c6219, Math.max(10, Math.floor(_0x3691b8 * _0x5b214b)));
    }
    return _0x5c6219;
  }
  _0x347ceb.exports = {
    TARGET_LANGS: _0x356aae,
    CHAR_PER_SEC: _0x2a1e07,
    CJK_EXPANSION: _0x5254aa,
    WORD_LIMITS: _0x1b5d18,
    CJK_LANGS: _0x441c30,
    langCodeOf: _0x5dc004,
    langName: _0x3f63b8,
    charPerSec: _0x1a5efe,
    cjkExpansion: _0x1e707c,
    maxWords: _0x5c4dcf,
    isCjkLang: _0x350701,
    cjkCharCount: _0xad9568,
    charLimit: _0xde6ea1
  };
});
var Rn = Z((_0x1f2426, _0x5a2519) => {
  var _0xe71210 = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  var _0x1c5248 = ["", "nghìn", "triệu"];
  function _0x366aad(_0x45ef18, _0x369fa1) {
    let _0x513da9 = Math.floor(_0x45ef18 / 100);
    let _0x62a0de = _0x45ef18 % 100;
    let _0x347123 = Math.floor(_0x62a0de / 10);
    let _0x1e882c = _0x62a0de % 10;
    let _0x450a21 = [];
    if (_0x513da9 > 0 || _0x369fa1) {
      _0x450a21.push(_0xe71210[_0x513da9], "trăm");
    }
    if (_0x347123 === 0) {
      if (_0x1e882c > 0 && (_0x513da9 > 0 || _0x369fa1)) {
        _0x450a21.push("lẻ");
      }
      if (_0x1e882c > 0) {
        _0x450a21.push(_0xe71210[_0x1e882c]);
      }
    } else if (_0x347123 === 1) {
      _0x450a21.push("mười");
      if (_0x1e882c === 5) {
        _0x450a21.push("lăm");
      } else if (_0x1e882c > 0) {
        _0x450a21.push(_0xe71210[_0x1e882c]);
      }
    } else {
      _0x450a21.push(_0xe71210[_0x347123], "mươi");
      if (_0x1e882c === 1) {
        _0x450a21.push("mốt");
      } else if (_0x1e882c === 5) {
        _0x450a21.push("lăm");
      } else if (_0x1e882c > 0) {
        _0x450a21.push(_0xe71210[_0x1e882c]);
      }
    }
    return _0x450a21;
  }
  function _0x19b9c3(_0x529be0) {
    if (_0x529be0 === 0) {
      return "không";
    }
    if (_0x529be0 < 0) {
      return "âm " + _0x19b9c3(-_0x529be0);
    }
    let _0x74f221 = [];
    let _0x8c601f = _0x529be0;
    while (_0x8c601f > 0) {
      _0x74f221.push(_0x8c601f % 1000);
      _0x8c601f = Math.floor(_0x8c601f / 1000);
    }
    let _0x4384d2 = _0x74f221.length - 1;
    while (_0x4384d2 > 0 && _0x74f221[_0x4384d2] === 0) {
      _0x4384d2 -= 1;
    }
    let _0x171135 = [];
    for (let _0xe1d575 = _0x4384d2; _0xe1d575 >= 0; _0xe1d575--) {
      let _0x4274a5 = _0x74f221[_0xe1d575];
      if (_0x4274a5 === 0) {
        continue;
      }
      _0x171135.push(..._0x366aad(_0x4274a5, _0xe1d575 < _0x4384d2));
      let _0x39e621 = _0x1c5248[_0xe1d575 % 3];
      let _0x423101 = Array(Math.floor(_0xe1d575 / 3)).fill("tỷ").join(" ");
      let _0xc6d8ef = (_0x39e621 + " " + _0x423101).trim();
      if (_0xc6d8ef) {
        _0x171135.push(_0xc6d8ef);
      }
    }
    return _0x171135.filter(Boolean).join(" ");
  }
  function _0x528b6f(_0x2fe4a8) {
    return [..._0x2fe4a8].filter(_0xf45993 => _0xf45993 >= "0" && _0xf45993 <= "9").map(_0x3f6f02 => _0xe71210[Number(_0x3f6f02)]).join(" ");
  }
  function _0x18f83a(_0x29927d, _0x24c3e9) {
    return (_0x29927d ? _0x19b9c3(Number.parseInt(_0x29927d, 10)) : "không") + " phẩy " + _0x528b6f(_0x24c3e9);
  }
  function _0x46381e(_0x30be88) {
    let _0x52a753 = /^([\d.]+),(\d+)$/.exec(_0x30be88);
    if (_0x52a753) {
      return _0x18f83a(_0x52a753[1].replace(/\./g, ""), _0x52a753[2]);
    }
    if (/^\d{1,3}(\.\d{3})+$/.test(_0x30be88)) {
      return _0x19b9c3(Number.parseInt(_0x30be88.replace(/\./g, ""), 10));
    }
    _0x52a753 = /^(\d+)\.(\d+)$/.exec(_0x30be88);
    if (_0x52a753) {
      return _0x18f83a(_0x52a753[1], _0x52a753[2]);
    }
    let _0x283283 = _0x30be88.replace(/\D/g, "");
    if (_0x283283) {
      if (_0x283283.length >= 2 && _0x283283[0] === "0" || _0x283283.length > 15) {
        return _0x528b6f(_0x283283);
      } else {
        return _0x19b9c3(Number.parseInt(_0x283283, 10));
      }
    } else {
      return _0x30be88;
    }
  }
  var _0x488876 = [["km/h", "ki lô mét trên giờ"], ["m/s", "mét trên giây"], ["km", "ki lô mét"], ["cm", "xen ti mét"], ["mm", "mi li mét"], ["kg", "ki lô gam"], ["mg", "mi li gam"], ["ml", "mi li lít"], ["kw", "ki lô oát"], ["%", "phần trăm"], ["vnđ", "đồng"], ["vnd", "đồng"], ["đ", "đồng"], ["₫", "đồng"], ["usd", "đô la"], ["$", "đô la"], ["g", "gam"], ["l", "lít"], ["m", "mét"]];
  var _0x55ad6e = _0x488876.map(([_0x48f6ea]) => _0x48f6ea.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|");
  var _0x117583 = new Map(_0x488876.map(([_0x19e6e9, _0x1d495b]) => [_0x19e6e9.toLowerCase(), _0x1d495b]));
  var _0x298fe6 = new RegExp("(-)?([$₫])?(\\d[\\d.,]*\\d|\\d)(" + _0x55ad6e + ")?", "gi");
  function _0x183369(_0x5ac151) {
    return String(_0x5ac151 || "").replace(_0x298fe6, (_0xa8119a, _0x1b3e02, _0x2153bd, _0x252d89, _0x1b1ba5) => {
      let _0x474dbe = _0x46381e(_0x252d89);
      if (_0x1b3e02 === "-") {
        _0x474dbe = "âm " + _0x474dbe;
      }
      let _0x519d63 = [_0x474dbe];
      if (_0x1b1ba5) {
        let _0x43dac5 = _0x117583.get(_0x1b1ba5.toLowerCase());
        if (_0x43dac5) {
          _0x519d63.push(_0x43dac5);
        }
      }
      if (_0x2153bd) {
        _0x519d63.push(_0x117583.get(_0x2153bd.toLowerCase()) || "");
      }
      return _0x519d63.filter(Boolean).join(" ");
    });
  }
  function _0x540299(_0x42b2da) {
    let _0x2fb1b6 = _0x42b2da.toLowerCase().match(/[aeiouy]+/g);
    if (_0x2fb1b6 && _0x2fb1b6.length) {
      return _0x2fb1b6.length;
    } else {
      return 1;
    }
  }
  var _0x581c09 = /[^0-9A-Za-zÀ-ỹĐđ]+/u;
  var _0x1373ff = /^[A-Za-z]+$/;
  function _0x3b444a(_0x58aa33) {
    let _0xfdffc5 = _0x183369(_0x58aa33);
    let _0x4663cb = 0;
    for (let _0x85d1f0 of _0xfdffc5.split(_0x581c09)) {
      if (_0x85d1f0) {
        _0x4663cb += _0x85d1f0.length >= 4 && _0x1373ff.test(_0x85d1f0) ? _0x540299(_0x85d1f0) : 1;
      }
    }
    return _0x4663cb;
  }
  _0x5a2519.exports = {
    readCardinal: _0x19b9c3,
    expandNumbersForSpeech: _0x183369,
    viSyllablesSpoken: _0x3b444a
  };
});
var Pt = Z((_0x3d422b, _0x32a38f) => {
  var {
    langName: _0x418d9
  } = Yt();
  var _0x3fc1e7 = je();
  function _0x5c1905(_0x2f7127) {
    let _0x3449de = "";
    if (_0x2f7127) {
      for (let _0x1b6a88 of _0x2f7127.trim().split("\n")) {
        _0x1b6a88 = _0x1b6a88.trim();
        if (_0x1b6a88.startsWith("[MEMORY]")) {
          _0x3449de = _0x1b6a88.slice(8).trim();
          break;
        }
      }
    }
    return _0x3fc1e7.shadowCompare("extractMemory", _0x3449de, _0x4d833e => _0x4d833e.extractMemory(_0x2f7127 ?? ""));
  }
  function _0x32ac8e(_0x2672be) {
    let _0x9b0c5a = 0;
    if (_0x2672be) {
      let _0x50cc3a = 0;
      let _0x377557 = 0;
      for (let _0x37edff of _0x2672be) {
        if (_0x37edff >= "一" && _0x37edff <= "鿿" || _0x37edff >= "㐀" && _0x37edff <= "䶿" || _0x37edff >= "\u3000" && _0x37edff <= "〿" || _0x37edff >= "぀" && _0x37edff <= "ヿ" || _0x37edff >= "가" && _0x37edff <= "힯") {
          _0x50cc3a++;
          _0x377557++;
        } else if (/[a-zA-ZÀ-ɏ]/.test(_0x37edff)) {
          _0x377557++;
        }
      }
      _0x9b0c5a = _0x377557 ? _0x50cc3a / _0x377557 : 0;
    }
    return _0x3fc1e7.shadowCompare("cjkRatio", _0x9b0c5a, _0x209755 => _0x209755.cjkRatio(_0x2672be ?? ""));
  }
  function _0x585dec(_0x5a7ab2) {
    if (_0x5a7ab2 === "ko") {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH: 저/제 → 'tôi/con/em' (khiêm nhường, nói với người trên), 나/내 → 'tôi/tớ'. 너 → 'cậu/em', 당신 → 'anh/ông' tùy vai. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' làm mặc định.\n- ⚠️ KÍNH NGỮ HÀN QUYẾT ĐỊNH XƯNG HÔ: câu có đuôi -요/-습니다 = người nói ĐANG TÔN TRỌNG người nghe → thêm 'ạ/dạ/thưa', xưng khiêm (con/em/cháu). Câu 반말 (đuôi -아/-어/-야, không kính) = thân mật/ngang hàng hoặc bề trên nói bề dưới → bỏ 'ạ', xưng thân.\n",
        family: "- 우리 아빠/엄마 → 'bố tôi/mẹ tôi' (KHÔNG 'bố tao/mẹ tao'). 오빠/형 → 'anh', 누나/언니 → 'chị', 동생 → 'em', 선배 → 'tiền bối/anh chị'.\n",
        naturalness: "- VD: '나도 그렇게 생각해' → 'Tôi cũng nghĩ vậy' (✅), KHÔNG 'Tôi cũng như thế mà nghĩ' (❌).\n- VD: '걱정하지 마' → 'Đừng lo' / 'Anh đừng lo' (✅), KHÔNG 'Đừng có lo lắng' (❌).\n- VD: '말도 안 돼' → 'Không thể nào' / 'Làm gì có' (✅).\n- VD: '뭐라고?' → 'Anh nói gì cơ?' / 'Hả?' (✅), KHÔNG 'Cái gì đã được nói' (❌).\n- VD: '두고 봐' → 'Cứ chờ đấy' / 'Để rồi xem' (✅).\n"
      };
    } else if (_0x5a7ab2 === "ja") {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH: 私/僕 → 'tôi/tớ', 俺 → 'tôi/tao' (thô, theo tính cách), あなた/君 → 'anh/em/cậu', お前 → 'mày/cậu' (suồng sã). TUYỆT ĐỐI KHÔNG dùng 'tao/mày' làm mặc định.\n- ⚠️ KÍNH NGỮ NHẬT QUYẾT ĐỊNH XƯNG HÔ: thể -ます/-です = lịch sự → thêm 'ạ/dạ', xưng khiêm. Thể thường (だ/だよ/だね) = thân mật/ngang hàng → bỏ 'ạ'.\n- Hậu tố: ～さん → 'anh/chị', ～様 → 'ngài/quý ngài', ～ちゃん → tên thân mật, ～君 → 'cậu', 先輩 → 'tiền bối/anh chị'.\n",
        family: "- お父さん/お母さん → 'bố/mẹ'. お兄さん/兄 → 'anh', お姉さん/姉 → 'chị', 弟/妹 → 'em'. KHÔNG hạ thành 'mày/tao'.\n",
        naturalness: "- VD: '私もそう思う' → 'Tôi cũng nghĩ vậy' (✅), KHÔNG 'Tôi cũng như thế suy nghĩ' (❌).\n- VD: '心配しないで' → 'Đừng lo' / 'Anh đừng lo' (✅).\n- VD: 'ありえない' → 'Không thể nào' / 'Làm gì có' (✅).\n- VD: '何だって?' / 'なんで?' → 'Hả?' / 'Cái gì cơ?' (✅), KHÔNG 'Cái gì đã được nói vậy' (❌).\n- VD: '覚えてろ' → 'Cứ chờ đấy' / 'Liệu hồn' (✅).\n"
      };
    } else if (_0x5a7ab2 === "en") {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH: 'I' → 'tôi/tớ', 'you' → 'anh/em/cậu/bạn' tùy quan hệ (tiếng Anh không phân biệt nên PHẢI suy từ ngữ cảnh). TUYỆT ĐỐI KHÔNG dùng 'tao/mày' làm mặc định.\n- Trang trọng (Sir/Madam/Mr./Ms.) → 'ông/bà/ngài'. Suồng sã/cãi nhau (dude, hey you, shut up) → mới dùng 'mày/cậu'.\n",
        family: "- Dad/Daddy → 'bố', Mom/Mommy → 'mẹ', bro → 'anh/em', sis → 'chị/em'. KHÔNG hạ thành 'mày/tao'.\n",
        naturalness: "- VD: 'I think so too' → 'Tôi cũng nghĩ vậy' (✅), KHÔNG 'Tôi nghĩ như vậy cũng' (❌).\n- VD: \"Don't worry\" → 'Đừng lo' / 'Anh đừng lo' (✅).\n- VD: 'No way' → 'Không thể nào' / 'Làm gì có' (✅).\n- VD: 'What?' → 'Hả?' / 'Anh nói gì cơ?' (✅).\n- VD: \"You'll pay for this\" → 'Cứ chờ đấy' / 'Liệu hồn' (✅), KHÔNG 'Mày sẽ trả giá cho việc này' (cứng) (❌).\n"
      };
    } else if (_0x5a7ab2 === "th") {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH: ผม (nam)/ฉัน/ดิฉัน → 'tôi/tớ', คุณ → 'anh/chị/bạn', เธอ → 'em/cậu'. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' làm mặc định.\n- Trợ từ lịch sự cuối câu ครับ (nam) / ค่ะ-คะ (nữ) = đang nói lễ phép → có thể thêm 'ạ' khi trang trọng, bỏ khi thân mật. KHÔNG dịch trợ từ thành chữ.\n",
        family: "- พ่อ/แม่ → 'bố/mẹ', พี่ → 'anh/chị', น้อง → 'em'. KHÔNG hạ thành 'mày/tao'.\n",
        naturalness: "- VD: 'ฉันก็คิดอย่างนั้น' → 'Tôi cũng nghĩ vậy' (✅).\n- VD: 'ไม่ต้องห่วง' → 'Đừng lo' / 'Anh đừng lo' (✅).\n- VD: 'เป็นไปไม่ได้' → 'Không thể nào' / 'Làm gì có' (✅).\n- VD: 'อะไรนะ' → 'Hả?' / 'Cái gì cơ?' (✅).\n"
      };
    } else if (_0x5a7ab2 === "zh") {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH BẮT BUỘC: 我 → 'tôi', 你 → 'anh/em/bạn'. TUYỆT ĐỐI KHÔNG dùng 'tao' hoặc 'mày' làm mặc định.\n",
        family: "- Khi nhân vật nói '我爸/我妈' → dịch 'bố tôi/mẹ tôi', TUYỆT ĐỐI KHÔNG dịch 'bố tao/mẹ tao'\n",
        naturalness: "- VD: '我也是这样想的' → 'Tôi cũng nghĩ vậy' (✅), KHÔNG 'Tôi cũng là như vậy mà nghĩ' (❌).\n- VD: '你别担心了' → 'Đừng lo' / 'Anh đừng lo' (✅), KHÔNG 'Anh không cần phải lo lắng' (❌).\n- VD: '不可能的事' → 'Không thể nào' / 'Làm gì có' (✅), KHÔNG 'Việc không thể có' (❌).\n- VD: '你说什么' → 'Anh nói gì cơ?' / 'Hả?' (✅), KHÔNG 'Anh đã nói gì vậy' (❌).\n- VD: '我会让他付出代价的' → 'Tao sẽ cho hắn biết tay' (✅), thay vì 'Tôi sẽ làm cho hắn trả giá' (cứng, dài).\n- Chiều ngược lại — gốc cộc thì nói cho tròn: '行吧' → 'Ừ, vậy cũng được.' (✅), KHÔNG 'Được.' (❌ cụt); '知道了' → 'Em biết rồi mà.' (✅), KHÔNG 'Biết rồi.' (❌ cụt).\n"
      };
    } else {
      return {
        pronoun_default: "- ⚠️ MẶC ĐỊNH: ngôi thứ nhất → 'tôi/tớ', ngôi thứ hai → 'anh/em/bạn' tùy quan hệ. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' làm mặc định.\n",
        family: "- Quan hệ gia đình/trên-dưới → xưng hô đúng vai (bố/mẹ/con, anh/chị/em, ông/bà/cháu). KHÔNG hạ thành 'mày/tao'.\n",
        naturalness: "- Dịch THOÁT Ý theo văn nói Việt, KHÔNG dịch sát từng chữ.\n- VD ý 'tôi cũng nghĩ vậy' → 'Tôi cũng nghĩ vậy' (✅), không câu cứng dài dòng.\n- Phủ định mạnh → 'Không thể nào' / 'Làm gì có'. Ngạc nhiên → 'Hả?' / 'Thật á?'.\n- Gốc cộc thì nói cho tròn câu: ý 'ừ, được' → 'Ừ, vậy cũng được.' (✅), KHÔNG 'Được.' (❌ cụt).\n"
      };
    }
  }
  function _0x41c03b(_0x45e755) {
    return {
      en: "\n★ NAME RULES:\n- Chinese names → Pinyin (e.g. 顾未易 → Gu Weiyi, 萧炎 → Xiao Yan)\n- Japanese names → Romaji (e.g. 田中太郎 → Tanaka Taro)\n- Korean names → Romanized (e.g. 이민호 → Lee Min Ho)\n- Western names/organizations → keep original (FBI, NASA, John)\n- Martial arts terms → translate meaning (e.g. 降龙十八掌 → Eighteen Dragon-Subduing Palms)\n",
      zh: "\n★ 名称规则:\n- 中文人名 → 保持原文 (顾未易、萧炎)\n- 日文名 → 保持原文汉字或注音 (田中太郎)\n- 韩文名 → 音译中文 (이민호 → 李敏镐)\n- 西方名/组织 → 保持原文 (FBI, NASA, John)\n- 武术术语 → 保持中文 (降龙十八掌、太极拳)\n",
      ja: "\n★ 名前のルール:\n- 中国語の名前 → カタカナ表記 (顾未易 → グー・ウェイイー, 萧炎 → シャオ・イェン)\n- 日本語の名前 → そのまま (田中太郎)\n- 韓国語の名前 → カタカナ表記 (이민호 → イ・ミンホ)\n- 西洋の名前/組織 → そのまま (FBI, NASA, John)\n",
      ko: "\n★ 이름 규칙:\n- 중국어 이름 → 한국어 음독 (顾未易 → 고미역)\n- 일본어 이름 → 한국어 표기 (田中太郎 → 다나카 타로)\n- 한국어 이름 → 원본 유지\n- 서양 이름/조직 → 원본 유지 (FBI, NASA, John)\n",
      th: "\n★ NAME RULES (Thai output):\n- Chinese/Japanese/Korean names & terms → TRANSLITERATE into THAI script (phonetic). Do NOT keep Han/Chinese/Kanji characters.\n- ⚠️ EVERY output line MUST be 100% Thai script — NO Chinese/Han character may remain in the output. Transliterate any leftover term into Thai rather than leaving it in Chinese.\n- Western names/organizations → keep original (FBI, NASA, John).\n"
    }[_0x45e755] || "\n★ NAME RULES:\n- Keep proper nouns (names, places, organizations) in their commonly recognized form.\n- Chinese names → Pinyin romanization.\n- Western names → keep original.\n";
  }
  function _0x34d7ab(_0x1da573) {
    if (!_0x1da573) {
      return _0x1da573;
    }
    let _0x5c0daf = [];
    for (let _0x4b032f of _0x1da573.split("\n")) {
      let _0x3983e9 = _0x4b032f.toLowerCase();
      if ((!_0x3983e9.includes("bỏ dấu chấm") || !_0x3983e9.includes("cuối")) && !_0x3983e9.includes("'cô' chỉ dùng") && !_0x3983e9.includes("không dùng 'cô'")) {
        _0x5c0daf.push(_0x4b032f);
      }
    }
    return _0x5c0daf.join("\n");
  }
  function _0x5cf431(_0x186f92, _0x33d28a, _0x5d5fae, _0x2527d0, _0x1ae55c, _0x418237) {
    let _0x173b79 = _0x585dec(_0x2527d0);
    let _0x241a11 = "";
    if (_0x33d28a) {
      _0x241a11 = "\n[VĂN PHONG/THỂ LOẠI — chỉ ảnh hưởng giọng điệu/từ vựng/xưng hô]\n" + _0x34d7ab(_0x33d28a.replace(/ngôn ngữ đích/g, _0x186f92)) + "\n[/VĂN PHONG]\n";
    }
    let _0x287da5 = _0x418237 ? "1. XƯNG HÔ (quan trọng nhất): xưng hô đi theo CẶP người-nói→người-nghe, KHÔNG theo nhân vật xuyên suốt phim. Dòng input dạng '[spkA→spkB]' nghĩa là A đang nói với B: chọn đại từ đúng cặp A→B (một người xưng 'con' với mẹ, 'em' với sếp, 'anh' với người yêu trong cùng một tập là BÌNH THƯỜNG — đổi người nghe là đổi cách xưng). '[spkA→?]' = chưa rõ người nghe → dùng cách xưng TRUNG TÍNH (tôi/anh/cô…), TUYỆT ĐỐI KHÔNG bê cặp xưng hô của câu/cảnh trước sang. THỨ TỰ ƯU TIÊN: (1) quyết định đã khóa trong HỒ SƠ PHIM, (2) quan hệ của cảnh hiện tại, (3) bằng chứng ngay trong lượt thoại, (4) trung tính. " : "1. XƯNG HÔ (quan trọng nhất): xưng hô đi theo CẶP người-nói→người-nghe, KHÔNG theo nhân vật xuyên suốt phim. Input KHÔNG có nhãn người nói: hãy SUY RA ai đang nói với ai ở từng câu từ ngữ cảnh (hô ngữ như 'bác ơi/chị à', lượt đối đáp, nội dung cảnh) rồi chọn đại từ đúng cặp đó (một người xưng 'con' với mẹ, 'em' với sếp, 'anh' với người yêu trong cùng một tập là BÌNH THƯỜNG — đổi người nghe là đổi cách xưng). Chưa rõ người nghe → dùng cách xưng TRUNG TÍNH (tôi/anh/cô…), TUYỆT ĐỐI KHÔNG bê cặp xưng hô của câu/cảnh trước sang. THỨ TỰ ƯU TIÊN: (1) quyết định đã khóa trong HỒ SƠ PHIM, (2) quan hệ của cảnh hiện tại, (3) bằng chứng ngay trong lượt thoại, (4) trung tính. ";
    return "Bạn là dịch giả phụ đề chuyên nghiệp, dịch sang " + _0x186f92 + " (văn nói đời thường).\nTrả về ĐÚNG " + _0x5d5fae + " dòng, mỗi dòng 'ID|nội dung'. KHÔNG markdown, KHÔNG giải thích, bắt đầu ngay bằng '1|'. Dịch HẾT mọi câu, không bỏ dòng.\n" + _0x241a11 + "\nQUY TẮC (theo thứ tự ưu tiên):\n" + _0x287da5 + ("Mặc định anh/em hoặc tôi/bạn; dùng mày/tao khi cãi nhau/đe doạ/khinh miệt/kẻ thù; cha-con, vợ-chồng, thầy-trò, chủ-tớ xưng đúng vai, KHÔNG đảo bề trên/bề dưới. ⚠️ SUY RA GIỚI TÍNH từng nhân vật từ ngữ cảnh (tên, cách người khác gọi, vai vế) rồi gọi/xưng cho ĐÚNG: nữ → cô/chị/em/bà/dì, nam → anh/chú/cậu/ông. TUYỆT ĐỐI KHÔNG gọi nhân vật NỮ là 'anh/ông/chú', KHÔNG gọi nhân vật NAM là 'chị/cô/bà'.\n" + _0x173b79.pronoun_default + _0x173b79.family + "2. TỰ NHIÊN: dịch thoát ý theo " + _0x186f92 + " nói thường ngày, KHÔNG word-for-word, ưu tiên từ thuần Việt, hạn chế Hán-Việt cứng (trừ khi văn phong thể loại yêu cầu); đọc lên phải xuôi tai như người Việt nói chuyện. Câu gốc quá cộc mà dịch sát nghe cụt lủn thì NÓI CHO TRÒN CÂU (thêm trợ từ ngữ khí, phục hồi chủ ngữ) miễn không thêm ý mới — tự nhiên quan trọng hơn ngắn.\n" + _0x173b79.naturalness + "3. TRỌN NGHĨA (bắt buộc): mỗi câu dịch phải đủ hành động, chủ thể/đối tượng cần thiết, phủ định, con số, tên riêng và sắc thái quan hệ của câu gốc; đọc một mình vẫn hiểu đúng. TUYỆT ĐỐI KHÔNG rút gọn, KHÔNG bỏ ý, KHÔNG cắt vế câu để khớp thời lượng đọc — việc khớp thời lượng do bước lồng tiếng xử lý sau. Khi câu gốc lược chủ ngữ mà bản Việt trở nên mơ hồ thì phục hồi chủ ngữ cho rõ; ngược lại đừng chèn đại từ máy móc khi tiếng Việt tự nhiên có thể lược mà vẫn rõ. Câu cụt chỉ hợp lệ khi câu gốc là mệnh lệnh ngắn, câu trả lời ngắn, cảm thán hoặc cố ý bỏ lửng. Cùng một ý, ưu tiên cách nói NGẮN tự nhiên hơn (không vòng vo) — gọn không có nghĩa là bỏ ý.\n4. DẤU CÂU: GIỮ ĐẦY ĐỦ dấu câu cho câu hoàn chỉnh, đặt ĐÚNG CHỖ — chấm (.) cuối câu kể, hỏi (?) cuối câu hỏi, than (!) cuối câu cảm thán/mệnh lệnh, phẩy (,) ngắt nghỉ, ba chấm (…) bỏ lửng. KHÔNG được bỏ dấu cuối câu (để câu đẹp + TTS đọc đúng ngữ điệu).\n5. Dịch hết từ nước ngoài xen kẽ. ĐƯỢC PHÉP thêm trợ từ ngữ khí (nhé, đấy, mà, chứ, cơ, thôi, à, đi, nào…) và từ nối (thế là, vậy mà, chứ sao…) khi chúng làm câu xuôi tai và đúng sắc thái người nói — đó là cách người Việt nói thật. KHÔNG thêm Ý MỚI, sự kiện hay chi tiết không có trong gốc, KHÔNG thêm tiếng cười nếu gốc không có. Chú thích âm thanh (nhạc nền, tiếng cười) → '...'.\n6. Nếu 1 câu là lời 2 NHÂN VẬT khác nhau → tách bằng '||' (mỗi vế là câu hoàn chỉnh).\n\nPhụ đề gốc do AI nhận giọng nói, có thể sai chính tả → đọc cả ngữ cảnh, suy luận từ phát âm gần giống; giữ nhất quán tên riêng.\n\nSau " + _0x5d5fae + " dòng dịch, thêm 1 dòng cuối: [MEMORY] <tóm tắt xưng hô + ai bề trên/bề dưới + tên riêng> để đoạn sau không đảo xưng hô.");
  }
  function _0xb067ff(_0x4f3788, _0x3f394f, _0x187230, _0x3e6e40, _0x380a1f, _0x466a1d, _0x50e1a4) {
    let _0x1cef22 = _0x3d9444(_0x3e6e40) || "source language";
    let _0x288495 = _0x3e6e40 !== "auto" ? "from " + _0x1cef22 + " " : "";
    let _0x255b5a = _0x41c03b(_0x4f3788);
    let _0x206194 = "";
    if (_0x380a1f) {
      _0x206194 = "\n[STYLE/GENRE — affects tone, vocabulary, forms of address only]\n" + _0x380a1f.replace(/ngôn ngữ đích/g, _0x3f394f).replace(/the target language/g, _0x3f394f) + "\n[/STYLE]\n";
    }
    let _0x27ab80 = _0x50e1a4 ? "1. FORMS OF ADDRESS / PRONOUNS (most important): address forms follow the speaker→LISTENER pair, never one character across the whole film. An input line tagged '[spkA→spkB]' means A speaks to B — pick the pronouns/honorifics for THAT pair (the same person may address their mother, their boss and their lover differently in one episode). '[spkA→?]' = listener unknown → use NEUTRAL forms and NEVER carry over the previous pair. Precedence: (1) locked decisions in the PROJECT BIBLE, (2) the current scene's relation, (3) evidence inside the turn itself, (4) neutral fallback. " : "1. FORMS OF ADDRESS / PRONOUNS (most important): address forms follow the speaker→LISTENER pair, never one character across the whole film. The input has NO speaker labels: INFER who speaks to whom on each line from context (vocatives, turn-taking, scene content) and pick the pronouns/honorifics for THAT pair (the same person may address their mother, their boss and their lover differently in one episode). Listener unknown → use NEUTRAL forms and NEVER carry over the previous pair. Precedence: (1) locked decisions in the PROJECT BIBLE, (2) the current scene's relation, (3) evidence inside the turn itself, (4) neutral fallback. ";
    return "You are a professional subtitle translator. Translate " + _0x288495 + "into " + _0x3f394f + ".\nReturn EXACTLY " + _0x187230 + " lines, each 'ID|translated text'. No markdown, no explanation, start immediately with '1|'. Translate EVERY line, skip none.\n🛑 Output ONLY in " + _0x3f394f + " (code " + _0x4f3788 + "), using " + _0x3f394f + "'s native script/orthography CONSISTENTLY for EVERY line. Never output the source language or English. Do NOT mix scripts (e.g. keep one consistent script the whole way).\n" + _0x206194 + "\nRULES (in priority order):\n" + _0x27ab80 + ("Match the relationship: respectful/formal for elders & superiors, intimate for family/lovers, rude/hostile ONLY when characters argue, threaten or are enemies. Never invert superior/inferior. INFER each character's GENDER from context and address them correctly (female vs male forms); never use a male address for a female character or vice versa.\n2. NATURAL: translate the MEANING into everyday spoken " + _0x3f394f + ", not word-by-word; keep each character's tone & emotion; sound natural read aloud. When a literal rendering sounds clipped/robotic, round the line out into how a native " + _0x3f394f + " speaker would actually say it — naturalness beats brevity.\n3. FULL MEANING (mandatory): every line must carry the complete action, the needed subject/object, negations, numbers, names and relationship nuance of the source, and be understandable on its own. Do NOT shorten, drop words or cut clauses to fit voice timing — timing is handled later by the dubbing planner. Restore an elided subject when the translation would otherwise be ambiguous. Fragments are only valid for short commands, short answers, interjections or intentional trailing off. For the same meaning, prefer the SHORTER natural spoken phrasing — concise never means dropping content.\n4. PUNCTUATION: use natural, COMPLETE punctuation placed correctly — period (.) to end statements, question mark (?) for questions, exclamation (!) for commands/strong emotion, comma (,) for pauses, ellipsis (…) for trailing off. Do NOT drop end-of-sentence punctuation (proper punctuation = cleaner text + correct TTS intonation).\n5. Translate any foreign words too. You MAY add " + _0x3f394f + "'s natural discourse particles/connectives when they make the line flow like real speech; do NOT add new ideas, facts or written laughter (hahaha) not in the source. Audio annotations (background music, laughter) → '...'.\n6. If ONE source line is spoken by 2 DIFFERENT characters → separate with '||'.\n" + _0x255b5a + "\nSource subtitles come from speech recognition and may contain errors → read the context and infer the intended words; keep character names consistent.\n\nAfter the " + _0x187230 + " lines, add one final line: [MEMORY] <names, relationships, pronouns used> to stay consistent in the next batch.");
  }
  function _0x249059(_0x6a4731) {
    let _0xcf54bc = "";
    if (Array.isArray(_0x6a4731) && _0x6a4731.length !== 0) {
      let _0x175071 = _0x6a4731.filter(_0x177640 => _0x177640 && _0x177640.source && _0x177640.target).map(_0x13fcc0 => "- \"" + String(_0x13fcc0.source).trim() + "\" → \"" + String(_0x13fcc0.target).trim() + "\"");
      if (_0x175071.length) {
        _0xcf54bc = "\nGLOSSARY (mandatory, preserve these terms exactly):\n" + _0x175071.join("\n") + "\n";
      }
    }
    return _0x3fc1e7.shadowCompare("buildGlossaryBlock", _0xcf54bc, _0x23c6c9 => JSON.parse(_0x23c6c9.buildGlossaryBlockJson(JSON.stringify({
      glossary: _0x6a4731
    }))));
  }
  function _0x3d9444(_0x1d2af5) {
    if (!_0x1d2af5 || _0x1d2af5 === "auto") {
      return "";
    } else {
      return _0x418d9(_0x1d2af5);
    }
  }
  function _0x1fb4e9(_0x5d42eb, _0x28fd61, _0x4bb67f, _0x48ea61, _0x222218, _0x5af279, _0x470cbf = false) {
    if (_0x5d42eb === "vi") {
      return _0x5cf431(_0x28fd61, _0x222218 || "", _0x4bb67f, _0x48ea61, _0x5af279, _0x470cbf);
    } else {
      return _0xb067ff(_0x5d42eb, _0x28fd61, _0x4bb67f, _0x48ea61, _0x222218 || "", _0x5af279, _0x470cbf);
    }
  }
  function _0x248514(_0x4fca78, _0xcd9c08) {
    let _0x53b3ec = String(_0x4fca78 || "").trim();
    if (!!_0x53b3ec && _0x53b3ec !== "default" && _0x53b3ec !== "Prompt Dịch") {
      return "";
    } else if (_0xcd9c08 === "ko") {
      return "⚠️ NHẮC LẠI: kính ngữ Hàn (-요/-습니다) → xưng khiêm + 'ạ'; 반말 → xưng thân. 저→'tôi/con/em', 나→'tôi/tớ'. KHÔNG dùng 'tao/mày' trừ khi cãi nhau/đe dọa. ";
    } else if (_0xcd9c08 === "ja") {
      return "⚠️ NHẮC LẠI: MẶC ĐỊNH 私/僕→'tôi', あなた/君→'anh/em/bạn' theo quan hệ + tuổi. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' trừ khi bạn thân cùng tuổi hoặc đang cãi nhau/đe dọa. ";
    } else if (_0xcd9c08 === "en") {
      return "⚠️ NHẮC LẠI: MẶC ĐỊNH I→'tôi', you→'anh/em/bạn' theo quan hệ + tuổi. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' trừ khi bạn thân cùng tuổi hoặc đang cãi nhau/đe dọa. ";
    } else if (_0xcd9c08 === "th") {
      return "⚠️ NHẮC LẠI: MẶC ĐỊNH ผม/ฉัน→'tôi', คุณ→'anh/em/bạn'; hạt lễ phép ครับ/ค่ะ → thêm 'ạ'. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' trừ khi bạn thân cùng tuổi hoặc đang cãi nhau/đe dọa. ";
    } else if (_0xcd9c08 === "zh" || _0xcd9c08 === "auto" || !_0xcd9c08) {
      return "⚠️ NHẮC LẠI: MẶC ĐỊNH 我→'tôi', 你→'anh/em/bạn'. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' trừ khi bạn thân cùng tuổi hoặc đang cãi nhau/đe dọa. ";
    } else {
      return "⚠️ NHẮC LẠI: chọn cặp xưng hô Việt (tôi/anh/em/bạn…) theo quan hệ + tuổi của người nói. TUYỆT ĐỐI KHÔNG dùng 'tao/mày' trừ khi bạn thân cùng tuổi hoặc đang cãi nhau/đe dọa. ";
    }
  }
  function _0x125824(_0x9949fc, _0x41c91c, _0x300112, _0x139b3b, _0x523e7e) {
    _0x523e7e = _0x523e7e || {};
    let {
      prompt_name: _0x20f6c3 = "",
      rolling_memory: _0x356066 = "",
      extra_hint: _0x5998f3 = "",
      eff_src: _0x409b19 = _0x300112,
      speakerLabels: _0x74ebe1 = null,
      bible_context: _0x49f982 = "",
      request_bible: _0x2fb2b2 = false
    } = _0x523e7e;
    let _0x279727 = _0x9949fc.map(_0x2ce4c7 => (_0x2ce4c7 || "").replace(/\n/g, " ").replace(/\r/g, ""));
    let _0x5f3a4c = [];
    for (let _0x4ec30b = 0; _0x4ec30b < _0x279727.length; _0x4ec30b++) {
      let _0x2fe147 = _0x74ebe1 && _0x74ebe1[_0x4ec30b] ? "[" + _0x74ebe1[_0x4ec30b] + "] " : "";
      _0x5f3a4c.push(_0x4ec30b + 1 + "|" + _0x2fe147 + _0x279727[_0x4ec30b]);
    }
    let _0x3edd95 = _0x5f3a4c.join("\n");
    let _0x38f780 = "";
    if (_0x49f982 || _0x2fb2b2) {
      let _0x42e3af = _0x49f982 ? _0x41c91c !== "vi" ? "\n★ PROJECT BIBLE (keep consistent):\n" + _0x49f982 + "\n" : "\n★ HỒ SƠ PHIM (giữ nhất quán tên + xưng hô):\n" + _0x49f982 + "\n" : _0x41c91c !== "vi" ? "\n★ PROJECT BIBLE: none yet — CREATE it from the lines below.\n" : "\n★ HỒ SƠ PHIM: chưa có — hãy TẠO từ các dòng bên dưới.\n";
      _0x38f780 = _0x41c91c !== "vi" ? _0x42e3af + "After the lines, add one line [BIBLE] {\"entities\":[{\"src\":..,\"tgt\":..,\"gender\":\"nam|nữ\"}],\"relationships\":[{\"speaker\":..,\"listener\":..,\"selfPronoun\":..,\"addressTerm\":..,\"relation\":..,\"confidence\":0.9,\"evidence\":[1,2]}]} for NEW names/relations only — one entry per speaker→listener DIRECTION, evidence = line numbers.\n⚠️ Field meaning: selfPronoun = the word the SPEAKER uses for THEMSELF when talking to that listener; addressTerm = the word the SPEAKER CALLS THE LISTENER. Example: {\"speaker\":\"Trương Tam\",\"listener\":\"Lý Thị\",\"selfPronoun\":\"anh\",\"addressTerm\":\"em\"} means Trương Tam says 'anh' about himself and calls Lý Thị 'em'. NEVER swap the two fields.\n\n" : _0x42e3af + "Sau các dòng dịch, thêm 1 dòng [BIBLE] {\"entities\":[{\"src\":..,\"tgt\":..,\"gender\":\"nam|nữ\"}],\"relationships\":[{\"speaker\":..,\"listener\":..,\"selfPronoun\":..,\"addressTerm\":..,\"relation\":..,\"confidence\":0.9,\"evidence\":[1,2]}]} cho tên/quan hệ MỚI — mỗi CHIỀU nói→nghe một mục, evidence = số dòng làm bằng chứng.\n⚠️ Nghĩa các trường: selfPronoun = từ NGƯỜI NÓI tự xưng về CHÍNH MÌNH khi nói với người nghe đó; addressTerm = từ NGƯỜI NÓI dùng để GỌI NGƯỜI NGHE. Ví dụ: {\"speaker\":\"Trương Tam\",\"listener\":\"Lý Thị\",\"selfPronoun\":\"anh\",\"addressTerm\":\"em\"} nghĩa là Trương Tam tự xưng 'anh' và gọi Lý Thị là 'em'. TUYỆT ĐỐI KHÔNG đảo ngược 2 trường.\n\n";
    }
    let _0x2a5450 = "";
    if (_0x356066) {
      if (_0x41c91c !== "vi") {
        _0x2a5450 = "\n[BACKGROUND — previous-batch summary, LOWEST priority]:\n" + _0x356066 + "\nUse for names/roles only; it must NOT override the PROJECT BIBLE or the current scene's speaker→listener context. Update [MEMORY] if new characters appear.\n\n";
      } else {
        _0x2a5450 = "\n[THAM KHẢO — tóm tắt đoạn trước, ưu tiên THẤP NHẤT]:\n" + _0x356066 + "\nChỉ dùng để nhớ tên/vai; KHÔNG được lấn át HỒ SƠ PHIM hoặc ngữ cảnh nói→nghe của cảnh hiện tại. Dịch xong, cập nhật lại [MEMORY] nếu có nhân vật mới.\n\n";
      }
    }
    let _0x333e21 = _0x5998f3 ? _0x5998f3 + "\n" : "";
    if (_0x41c91c !== "vi") {
      let _0x3a9865 = _0x3d9444(_0x300112) || "source language";
      let _0x51cf4f = _0x300112 !== "auto" ? "from " + _0x3a9865 + " " : "";
      return "Translate " + _0x9949fc.length + " subtitle lines " + _0x51cf4f + "into " + _0x139b3b + ". Return EXACTLY " + _0x9949fc.length + " lines: ID|Translated text.\n⚠️ FULL MEANING: translate each line completely and naturally — never shorten, drop words or cut clauses to fit voice timing (timing is handled later).\n" + _0x333e21 + "\n" + _0x38f780 + _0x2a5450 + _0x3edd95;
    }
    let _0x150e71 = _0x3d9444(_0x300112) || "ngôn ngữ gốc";
    let _0x182606 = _0x300112 !== "auto" ? "từ " + _0x150e71 + " " : "";
    let _0x30cdfb = _0x248514(_0x20f6c3, _0x409b19);
    return "Dịch " + _0x9949fc.length + " câu phụ đề " + _0x182606 + "sang " + _0x139b3b + ". Trả về ĐÚNG " + _0x9949fc.length + " dòng định dạng ID|Nội dung dịch.\n" + _0x30cdfb + "⚠️ BẮT BUỘC — TRỌN NGHĨA: dịch ĐỦ Ý từng câu, tự nhiên như người Việt nói. KHÔNG rút gọn, KHÔNG bỏ ý để khớp thời lượng đọc — việc đó bước lồng tiếng xử lý sau.\n" + _0x333e21 + "\n" + _0x38f780 + _0x2a5450 + _0x3edd95;
  }
  function _0x3325a2(_0x57aec2, _0x40d0f8, _0x23d1a6, _0x376ee6, _0x5131a3) {
    _0x5131a3 = _0x5131a3 || {};
    let {
      rolling_memory: _0x392094 = "",
      extra_hint: _0x2af64a = "",
      bible_context: _0x37ad17 = "",
      prompt_name: _0x4dc0db = "",
      eff_src: _0x796686 = _0x23d1a6
    } = _0x5131a3;
    let _0x19df20 = _0x40d0f8 === "vi";
    let _0x481a78 = _0x1ed96a => (_0x1ed96a || "").replace(/\n/g, " ").replace(/\r/g, "");
    let _0x3d3c9c = [];
    let _0x5d587f = 0;
    for (let _0x4b175c of _0x57aec2) {
      let _0xbaa889 = _0x481a78(_0x4b175c.text);
      if (_0x4b175c.contextOnly) {
        let _0x132716 = _0x481a78(_0x4b175c.translation) || "(chưa có)";
        _0x3d3c9c.push(_0x19df20 ? "[đã dịch] " + _0xbaa889 + " → " + _0x132716 : "[translated] " + _0xbaa889 + " → " + _0x132716);
      } else {
        _0x5d587f += 1;
        let _0xed236d = _0x4b175c.speakerLabel || _0x4b175c.speakerId;
        let _0x67a0cf = _0xed236d ? "[" + _0xed236d + "] " : "";
        _0x3d3c9c.push(_0x5d587f + "|" + _0x67a0cf + _0xbaa889);
      }
    }
    let _0x4f8aba = _0x5d587f;
    let _0x463d2b = _0x3d3c9c.join("\n");
    let _0x9702c = "";
    if (_0x37ad17) {
      _0x9702c = _0x19df20 ? "\n★ HỒ SƠ PHIM (giữ nhất quán tên + xưng hô):\n" + _0x37ad17 + "\n\n" : "\n★ PROJECT BIBLE (keep consistent):\n" + _0x37ad17 + "\n\n";
    }
    let _0x2aed19 = "";
    if (_0x392094) {
      _0x2aed19 = _0x19df20 ? "\n[THAM KHẢO — tóm tắt đoạn trước, ưu tiên THẤP NHẤT]:\n" + _0x392094 + "\nChỉ dùng để nhớ tên/vai; KHÔNG lấn át HỒ SƠ PHIM hoặc ngữ cảnh cảnh hiện tại.\n\n" : "\n[BACKGROUND — previous-batch summary, LOWEST priority]:\n" + _0x392094 + "\nNames/roles only; never outranks the PROJECT BIBLE or current-scene context.\n\n";
    }
    let _0x1374d6 = _0x2af64a ? _0x2af64a + "\n" : "";
    let _0x1fde2e = _0x3d9444(_0x23d1a6) || (_0x19df20 ? "ngôn ngữ gốc" : "source language");
    let _0x39a8fb = _0x23d1a6 && _0x23d1a6 !== "auto" ? _0x19df20 ? "từ " + _0x1fde2e + " " : "from " + _0x1fde2e + " " : "";
    if (_0x19df20) {
      return "Dịch " + _0x4f8aba + " câu phụ đề CÒN THIẾU " + _0x39a8fb + "sang " + _0x376ee6 + ". Trả về ĐÚNG " + _0x4f8aba + " dòng định dạng ID|Nội dung dịch (chỉ các dòng đánh số).\n⚠️ Các dòng '[đã dịch] gốc → bản dịch' CHỈ là ngữ cảnh để giữ nhất quán xưng hô/tên riêng — TUYỆT ĐỐI KHÔNG dịch lại và KHÔNG xuất chúng ra.\n" + _0x248514(_0x4dc0db, _0x796686) + "⚠️ BẮT BUỘC — TRỌN NGHĨA + TỰ NHIÊN: dịch ĐỦ Ý từng câu, thoát ý theo lối nói hằng ngày, TUYỆT ĐỐI KHÔNG dịch word-for-word/bám sát trật tự từ của câu gốc. Câu gốc cộc mà dịch sát nghe cụt lủn thì nói cho tròn câu (trợ từ ngữ khí, phục hồi chủ ngữ) miễn không thêm ý mới. KHÔNG rút gọn, KHÔNG bỏ ý để khớp thời lượng đọc — việc đó bước lồng tiếng xử lý sau.\n" + _0x1374d6 + _0x9702c + _0x2aed19 + _0x463d2b;
    } else {
      return "Translate the " + _0x4f8aba + " MISSING subtitle lines " + _0x39a8fb + "into " + _0x376ee6 + ". Return EXACTLY " + _0x4f8aba + " lines: ID|Translated text (only the numbered lines).\n⚠️ The '[translated] source → target' lines are CONTEXT ONLY for name/pronoun consistency — do NOT translate them again and do NOT output them.\n⚠️ FULL MEANING + NATURAL: translate each target completely, in everyday spoken register — never word-for-word, never mirror the source word order, never shorten or drop words to fit voice timing.\n" + _0x1374d6 + _0x9702c + _0x2aed19 + _0x463d2b;
    }
  }
  var _0x38c98a = new RegExp("[\\[\\(]\\s*[^\\]\\)\\n]{0,40}?[⏱≤][^\\]\\)\\n]{0,40}?[\\]\\)]|⏱\\s*[\\dXx.]+\\s*s?|≤\\s*[\\dYy]+\\s*(?:ch|chars?|kt|ký\\s*tự)|⏱", "giu");
  var _0x312e21 = "⟶";
  var _0x25ca85 = [/^[\[(]\s*(?:≤\s*\d+|\d+\s*[-–—]\s*\d+|\d+\s*(?:âm\s*tiết|words?|chars?|ký\s*tự))[^\])\n]{0,20}[\])]\s*/iu, /^(?:≤\s*)?\d+(?:\s*[-–—]\s*\d+)?\s*\|\s*/u, /^(?:≤\s*\d+|\d+\s*[-–—]\s*\d+)\s*(?:âm\s*tiết|words?|chars?|ký\s*tự)\s*/iu, /^(?:GỐC|BẢN\s*ĐỦ|BẢN\s*ĐỌC|NHÁP|SOURCE|FULL|DRAFT)\s*[:：]\s*/iu, /^\|+\s*/u];
  var _0x4cbbcb = /\[\s*spk[_\s]?\d+\s*(?:(?:→|->|=>|—>)\s*[^\]\n]{0,40})?\]\s*/giu;
  function _0x9a2b5c(_0xa529d8) {
    if (_0xa529d8.includes("[")) {
      return _0xa529d8.replace(_0x4cbbcb, "").trim();
    } else {
      return _0xa529d8;
    }
  }
  function _0x25a897(_0x48b90c) {
    let _0x4ad54e = _0x48b90c;
    let _0x71fde0 = _0x4ad54e.lastIndexOf(_0x312e21);
    if (_0x71fde0 >= 0) {
      _0x4ad54e = _0x4ad54e.slice(_0x71fde0 + _0x312e21.length).trim();
    }
    for (let _0x543c29 = 0; _0x543c29 < 4; _0x543c29++) {
      let _0xf80f20 = false;
      for (let _0x3a1133 of _0x25ca85) {
        let _0x4fd36f = _0x4ad54e.replace(_0x3a1133, "");
        if (_0x4fd36f !== _0x4ad54e) {
          _0x4ad54e = _0x4fd36f;
          _0xf80f20 = true;
        }
      }
      if (!_0xf80f20) {
        break;
      }
    }
    return _0x4ad54e.trim();
  }
  function _0x1ec900(_0x53df9e) {
    let _0x3e1d46;
    if (!_0x53df9e.includes("||")) {
      _0x3e1d46 = _0x53df9e;
    } else {
      let _0x15a062 = _0x53df9e.split("||").map(_0x2e3dba => _0x2e3dba.trim());
      _0x3e1d46 = _0x15a062.every(Boolean) ? _0x53df9e : _0x15a062.filter(Boolean).join(" || ");
    }
    return _0x3fc1e7.shadowCompare("normalizeDualSpeaker", _0x3e1d46, _0x1c6083 => _0x1c6083.normalizeDualSpeaker(_0x53df9e));
  }
  function _0x213ec7(_0x459133, _0x4375a2) {
    let _0x329353 = (_0x459133 || "").trim();
    if (_0x329353.startsWith("```")) {
      let _0x15c336 = _0x329353.indexOf("\n");
      _0x329353 = _0x15c336 >= 0 ? _0x329353.slice(_0x15c336 + 1) : _0x329353;
    }
    if (_0x329353.endsWith("```")) {
      _0x329353 = _0x329353.slice(0, _0x329353.lastIndexOf("```"));
    }
    let _0x534545 = {};
    for (let _0x3af844 of _0x329353.trim().split("\n")) {
      _0x3af844 = _0x3af844.trim();
      if (!_0x3af844 || _0x3af844.startsWith("[MEMORY]")) {
        continue;
      }
      let _0x546c01 = _0x3af844.indexOf("|");
      if (_0x546c01 === -1) {
        continue;
      }
      let _0x2eaa6d = _0x3af844.slice(0, _0x546c01).trim();
      let _0x249d48 = _0x3af844.slice(_0x546c01 + 1).trim();
      let _0x4d8fda = Number.parseInt(_0x2eaa6d, 10) - 1;
      if (Number.isFinite(_0x4d8fda)) {
        if (!_0x249d48.startsWith("[MEMORY]")) {
          _0x249d48 = _0x249d48.replace(/\[MEMORY\].*/s, "").trim();
          _0x249d48 = _0x249d48.replace(/\|\d+\s*$/, "").trim();
          _0x249d48 = _0x249d48.replace(_0x38c98a, "").trim();
          _0x249d48 = _0x249d48.replace(/(?<!\|)\|\s*$/, "").trim();
          _0x249d48 = _0x249d48.replace(/^[| ]+/, "");
          _0x249d48 = _0x249d48.replace(/^[#／> ]+/, "");
          _0x249d48 = _0x25a897(_0x249d48);
          _0x249d48 = _0x9a2b5c(_0x249d48);
          _0x249d48 = _0x1ec900(_0x249d48);
          if (_0x4d8fda >= 0 && _0x4d8fda < _0x4375a2 && _0x249d48) {
            _0x534545[_0x4d8fda] = _0x249d48;
          }
        }
      }
    }
    return _0x3fc1e7.shadowCompare("parseIdPipeResponse", _0x534545, _0x4f0399 => JSON.parse(_0x4f0399.parseIdPipeResponseJson(JSON.stringify({
      raw: _0x459133,
      nExpected: _0x4375a2
    }))));
  }
  function _0x531f73(_0x24f605, _0x1fcd98) {
    let _0xeacbe1 = [];
    for (let _0x2f721c = 0; _0x2f721c < _0x1fcd98.length; _0x2f721c++) {
      let _0x286af4 = _0x24f605[_0x2f721c];
      if (_0x286af4 == null) {
        _0xeacbe1.push(_0x1fcd98[_0x2f721c]);
        continue;
      }
      _0xeacbe1.push(_0x286af4);
    }
    return _0x3fc1e7.shadowCompare("mergeTranslated", _0xeacbe1, _0x51e5b5 => JSON.parse(_0x51e5b5.mergeTranslatedJson(JSON.stringify({
      resultMap: _0x24f605,
      texts: _0x1fcd98
    }))));
  }
  function _0x283fc8(_0x29be77) {
    return String(_0x29be77 || "").split(/[^0-9A-Za-zÀ-ỹĐđ]+/u).filter(Boolean).length;
  }
  var {
    viSyllablesSpoken: _0x49e239
  } = Rn();
  function _0x35e2fc(_0x4a05f0, _0x1fecb2, _0x592fed, _0x245a1b = {}) {
    let _0x3b95a = _0x592fed.length;
    let _0x3cc0bf = _0x245a1b.deep === true;
    let _0x212009 = _0x4a05f0 === "vi" ? _0x3cc0bf ? "Bạn là biên tập LỜI ĐỌC lồng tiếng. Các dòng dưới đây ĐÃ rút gọn một lần mà vẫn quá dài so với khung hình, nên cần NÉN SÂU: viết lại BẢN ĐỌC từ BẢN ĐỦ, độ dài NẰM TRONG khoảng âm tiết cho phép của dòng đó (1 từ tiếng Việt = 1 âm tiết) — khoảng 50–70% BẢN ĐỦ, KHÔNG được ngắn hơn mức tối thiểu. BẮT BUỘC GIỮ: ý cốt lõi (ai làm gì), con số, tên riêng, phủ định và cách xưng hô. Được phép: bỏ mệnh đề phụ/chi tiết bổ trợ, bỏ ví von nếu buộc phải chọn, gộp ý bằng cách nói ngắn tự nhiên. KHÔNG thêm ý mới, KHÔNG đổi nghĩa, KHÔNG viết cụt lủn kiểu điện tín — vẫn là câu nói trọn vẹn, đủ dấu câu.\nTrả về ĐÚNG " + _0x3b95a + " dòng, mỗi dòng 'ID|bản đọc'. KHÔNG markdown, KHÔNG giải thích." : "Bạn là biên tập LỜI ĐỌC lồng tiếng. Với mỗi dòng bên dưới, viết BẢN ĐỌC gọn hơn từ BẢN ĐỦ, độ dài NẰM TRONG khoảng âm tiết cho phép của dòng đó (1 từ tiếng Việt = 1 âm tiết) — tức khoảng 70–85% BẢN ĐỦ, KHÔNG được ngắn hơn mức tối thiểu. GIỮ NGUYÊN: ý chính, hành động, sắc thái/so sánh, con số, tên riêng, phủ định và cách xưng hô. Được phép: bỏ từ đưa đẩy/đệm, rút gọn cấu trúc, thay cụm dài bằng cách nói ngắn tự nhiên. KHÔNG thêm ý mới, KHÔNG đổi nghĩa, KHÔNG viết cụt lủn kiểu điện tín. Văn nói tự nhiên, đủ dấu câu.\nTrả về ĐÚNG " + _0x3b95a + " dòng, mỗi dòng 'ID|bản đọc'. KHÔNG markdown, KHÔNG giải thích." : _0x3cc0bf ? "You edit dubbing READ lines. The lines below were already condensed once and STILL overflow their screen time, so compress hard: rewrite the FULL version WITHIN the given syllable/word range (about 50-70% of the FULL line — never below the minimum). MUST KEEP: the core statement (who does what), numbers, names, negation and forms of address. Allowed: drop subordinate clauses and secondary detail, drop a simile if forced to choose, merge ideas into shorter natural phrasing. Do NOT add or change meaning, do NOT produce telegram-style stubs — keep complete spoken sentences with punctuation.\nReturn EXACTLY " + _0x3b95a + " lines, each 'ID|condensed text'. No markdown, no explanation." : "You edit dubbing READ lines. For each line below, rewrite the FULL version into a slightly shorter spoken take WITHIN the given syllable/word range (about 70-85% of the FULL line — never below the minimum). KEEP: core meaning, action, nuance/comparisons, numbers, names, negation and forms of address. Allowed: drop filler, tighten structure, use shorter natural phrasing. Do NOT add or change meaning, do NOT produce telegram-style stubs. Natural spoken register, full punctuation.\nReturn EXACTLY " + _0x3b95a + " lines, each 'ID|condensed text'. No markdown, no explanation.";
    let _0x1aac19 = _0x592fed.map(_0x384a01 => {
      let _0x2ed58b = _0x384a01.budgetMin && _0x384a01.budgetMin < _0x384a01.budget ? _0x384a01.budgetMin + "–" + _0x384a01.budget : "≤" + _0x384a01.budget;
      if (_0x4a05f0 === "vi") {
        return _0x384a01.n + "|[" + _0x2ed58b + " âm tiết] GỐC: " + _0x384a01.source + " ⟶ BẢN ĐỦ: " + _0x384a01.full;
      } else {
        return _0x384a01.n + "|[" + _0x2ed58b + " words] SOURCE: " + _0x384a01.source + " ⟶ FULL: " + _0x384a01.full;
      }
    }).join("\n");
    return _0x3fc1e7.shadowCompare("buildCondensePrompt", {
      system: _0x212009,
      user: _0x1aac19
    }, _0x383109 => JSON.parse(_0x383109.buildCondensePromptJson(JSON.stringify({
      target: _0x4a05f0,
      items: _0x592fed,
      deep: _0x245a1b.deep === true
    }))));
  }
  function _0x56d306(_0x2b9c72, _0x36c417, _0x5a84b5) {
    let _0x48b76a = _0x5a84b5.length;
    let _0x2b1bfc = _0x2b9c72 === "vi" ? "Bạn là biên tập viên bản địa hoá phim người Việt. Mỗi dòng dưới đây là một câu thoại ĐÃ DỊCH (NHÁP) kèm câu gốc. Viết lại NHÁP cho trôi chảy, tự nhiên như người Việt nói chuyện thật: thêm trợ từ ngữ khí (nhé, đấy, mà, chứ, cơ, thôi, à, đi…), từ nối, nói cho tròn câu nếu nháp cụt lủn; sửa trật tự từ còn hơi hướm tiếng nước ngoài. GIỮ NGUYÊN: nghĩa, hành động, con số, tên riêng, phủ định, CÁCH XƯNG HÔ (đại từ ai-với-ai, không đổi tôi/anh/em/cô/chú…) và mức trang trọng. KHÔNG thêm ý mới, KHÔNG lược ý, KHÔNG kéo câu dài lê thê. Nháp đã tự nhiên rồi thì trả lại y nguyên.\nTrả về ĐÚNG " + _0x48b76a + " dòng, mỗi dòng 'ID|câu đã biên tập'. KHÔNG markdown, KHÔNG giải thích." : "You are a native " + _0x36c417 + " localization editor. Each line below is a DRAFT translation next to its source. Rewrite the draft so it flows like real spoken " + _0x36c417 + ": natural discourse particles/connectives, round out clipped lines, fix source-shaped word order. KEEP UNCHANGED: meaning, actions, numbers, names, negation, the forms of address (who calls whom what) and the register. Do NOT add new ideas, drop content, or pad lines. If a draft already sounds natural, return it verbatim.\nReturn EXACTLY " + _0x48b76a + " lines, each 'ID|edited text'. No markdown, no explanation.";
    let _0x5c4666 = _0x5a84b5.map(_0x3ad7a5 => _0x2b9c72 === "vi" ? _0x3ad7a5.n + "|GỐC: " + _0x3ad7a5.source + " ⟶ NHÁP: " + _0x3ad7a5.draft : _0x3ad7a5.n + "|SOURCE: " + _0x3ad7a5.source + " ⟶ DRAFT: " + _0x3ad7a5.draft).join("\n");
    return {
      system: _0x2b1bfc,
      user: _0x5c4666
    };
  }
  _0x32a38f.exports = {
    extractMemory: _0x5c1905,
    cjkRatio: _0x32ac8e,
    srcLangExamples: _0x585dec,
    getMultilangNameRule: _0x41c03b,
    buildSystemPrompt: _0x1fb4e9,
    buildUserText: _0x125824,
    buildUserTextWithContext: _0x3325a2,
    buildCondensePrompt: _0x35e2fc,
    buildPolishPrompt: _0x56d306,
    buildGlossaryBlock: _0x249059,
    parseIdPipeResponse: _0x213ec7,
    normalizeDualSpeaker: _0x1ec900,
    mergeTranslated: _0x531f73,
    viSyllables: _0x283fc8,
    viSyllablesSpoken: _0x49e239
  };
});
var cr = Z((_0x1e6c0b, _0x1ccf01) => {
  var _0x34eefe = je();
  var _0x242894 = /\d[\d.,]*/g;
  var _0x2c1c42 = /(không|chẳng|chả|đừng|chưa|khỏi|đéo)/gi;
  var _0x1434c6 = /\b(not|no|never|n't|none|nothing|without)\b/gi;
  function _0x28061a(_0x3b234c) {
    return (String(_0x3b234c || "").match(_0x242894) || []).map(_0x1e80d5 => _0x1e80d5.replace(/[.,]+$/, ""));
  }
  function _0x3c1fa0(_0x5384ff, _0x2a5e81) {
    let _0x232df1 = _0x2a5e81 === "vi" ? _0x2c1c42 : _0x1434c6;
    return (String(_0x5384ff || "").match(_0x232df1) || []).length;
  }
  function _0x11fd50(_0x57accf, _0x160bd9, _0x548e26) {
    _0x548e26 = _0x548e26 || {};
    let _0x55a12b = _0x548e26.target || "vi";
    let _0x4f8bf1 = _0x548e26.entities || [];
    let _0x53c8de = [];
    let _0x32582d = String(_0x57accf || "");
    let _0x216da5 = String(_0x160bd9 || "");
    if (_0x216da5 && _0x32582d && _0x216da5 !== _0x32582d) {
      let _0xa4b8e = _0x28061a(_0x32582d);
      let _0x39cfc5 = new Set(_0x28061a(_0x216da5));
      let _0x2e82f3 = _0xa4b8e.filter(_0xbeccb5 => !_0x39cfc5.has(_0xbeccb5));
      if (_0x2e82f3.length) {
        _0x53c8de.push({
          type: "number_dropped",
          severity: "major",
          message: "Thiếu số so với bản chuẩn: " + _0x2e82f3.join(", ")
        });
      }
      let _0x5d6a3a = _0x3c1fa0(_0x32582d, _0x55a12b);
      let _0x3e365e = _0x3c1fa0(_0x216da5, _0x55a12b);
      if (_0x5d6a3a > 0 && _0x3e365e < _0x5d6a3a) {
        _0x53c8de.push({
          type: "negation_lost",
          severity: "critical",
          message: "Có thể mất phủ định so với bản chuẩn"
        });
      }
      for (let _0x495969 of _0x4f8bf1) {
        let _0x2489db = String(_0x495969 && _0x495969.tgt || "").trim();
        if (_0x2489db && _0x32582d.includes(_0x2489db) && !_0x216da5.includes(_0x2489db)) {
          _0x53c8de.push({
            type: "entity_dropped",
            severity: "major",
            message: "Thiếu tên riêng: " + _0x2489db
          });
        }
      }
    }
    return _0x34eefe.shadowCompare("semanticAnchorIssues", _0x53c8de, _0x234792 => JSON.parse(_0x234792.semanticAnchorIssuesJson(JSON.stringify({
      canonical: _0x57accf,
      adapted: _0x160bd9,
      opts: _0x548e26 ?? {}
    }))));
  }
  _0x1ccf01.exports = {
    semanticAnchorIssues: _0x11fd50
  };
});
var lr = Z((_0x15f3d6, _0x5b20ef) => {
  _0x5b20ef.exports = {
    default: "",
    ai_tong_hop_thong_minh: {
      vi: "BỐI CẢNH: KHÔNG biết trước thể loại — SUY LUẬN từ tên riêng, từ khóa, văn phong rồi áp văn phong tương ứng. MẶC ĐỊNH là HIỆN ĐẠI; chỉ chuyển thể loại khi ngữ cảnh xác nhận rõ.\n★ Cổ trang / cung đấu / kiếm hiệp / tiên hiệp (dấu hiệu: Hoàng thượng, triều đình, giang hồ, tu tiên) → ta/ngươi/hắn/nàng, Trẫm/Thần/Bản vương, tên Trung phiên Hán-Việt; TUYỆT ĐỐI không lẫn từ hiện đại (tôi, bạn, OK, công ty).\n★ Anime / Nhật (dấu hiệu: tên Romaji như Naruto, Tanjiro) → GIỮ tên Romaji, giữ kính ngữ Senpai/Sensei/Sama; học đường tớ/cậu.\n★ Isekai / game (Status, Skill, Level, Guild) → giữ thuật ngữ tiếng Anh; 魔王→Ma vương, 勇者→Dũng giả, 異世界→Dị giới.\n★ Hàn (tên Lee/Kim/Park, Oppa) → giữ tên Latin; Sunbae→Tiền bối.\n★ Âu Mỹ (John/Sarah, FBI) → giữ nguyên tên + tổ chức, KHÔNG phiên âm kiểu 'Giôn'.\n★ GIỌNG ĐIỆU THEO CẢNH: hài → câu gọn sắc, chốt đúng punch line; kinh dị → câu ngắn rợn, dùng '…' tạo suspense; hành động → dứt khoát, mạnh; kể chuyện/review → ngôi thứ ba hắn/nàng/gã.\n★ THÀNH NGỮ: ưu tiên thành ngữ/khẩu ngữ tương đương trong ngôn ngữ đích thay vì dịch chữ.",
      en: "GENRE UNKNOWN — infer it from names, keywords and diction, then apply the matching register. Default to MODERN speech; only switch when context clearly confirms it.\n★ Chinese period / palace / wuxia / cultivation (signals: emperor, imperial court, sects, cultivation) → archaic, ceremonious register of the target language with period-appropriate honorifics; never mix in modern vocabulary.\n★ Japanese anime (Romaji names like Naruto, Tanjiro) → keep Romaji names and Japanese honorifics (Senpai/Sensei/-sama).\n★ Isekai / game (Status, Skill, Level, Guild) → keep the English game terms.\n★ Korean (Lee/Kim/Park, Oppa) → keep romanized names; speech levels signal relationships.\n★ Western (John/Sarah, FBI) → keep every name and organization as-is; never transliterate.\n★ TONE PER SCENE: comedy → tight lines that land the punch line; horror → short chilling lines, '…' for suspense; action → clipped and forceful; narration/recap → third person.\n★ IDIOMS: prefer equivalent idioms of the target language over literal renderings."
    },
    ke_truyen: {
      vi: "BỐI CẢNH: video KỂ TRUYỆN / TÓM TẮT PHIM — một giọng kể dẫn dắt toàn bộ, xen thoại nhân vật.\n★ Lời KỂ: ngôi thứ ba (hắn, nàng, gã, y, ả); trầm ấm, lôi cuốn, nhịp gọn tạo kịch tính; nửa văn viết nửa văn nói cho dễ nghe; dùng '…' tạo khoảng lặng khi cần.\n★ Thoại NHÂN VẬT: theo bối cảnh phim — hiện đại (mặc định) xưng đúng quan hệ; cổ trang (chỉ khi ngữ cảnh xác nhận) dùng Hán-Việt (ta/ngươi, Hoàng thượng).\n★ TỪ NỐI DẪN TRUYỆN: 他没想到→Hắn không ngờ | 就在这时→Đúng lúc này | 结果→Kết quả | 然而→Nhưng.\n★ TÊN RIÊNG: tên Trung → phiên Hán-Việt; tên Tây/tổ chức quốc tế → giữ nguyên.",
      en: "NARRATED recap / story-summary video: one narrator drives the whole video, character dialogue interleaved.\n★ NARRATION: third person; warm, gripping, tight rhythm for drama; half-written half-spoken register that is easy to listen to; use '…' for dramatic pauses.\n★ CHARACTER LINES: follow the film's own setting — modern register by default, archaic register only when the setting is clearly historical.\n★ CONNECTIVES: keep narrative connectives punchy (He never expected… / Right at that moment… / In the end… / And yet…).\n★ NAMES: Chinese names → the target language's usual convention for Chinese names; Western names/organizations → keep as-is."
    },
    review_phim_co_trang: {
      vi: "BỐI CẢNH: phim CỔ TRANG / CUNG ĐẤU Trung Quốc — không khí cung đình, tôn ti nghiêm ngặt.\n★ VĂN PHONG: trang trọng, uy nghiêm; đại từ ta/ngươi/hắn/nàng; giữ khí chất từng vai (kẻ nịnh khúm núm, bậc đế vương uy quyền); TUYỆT ĐỐI không dùng từ hiện đại (tôi, bạn, OK, công ty, cảnh sát).\n★ TỰ XƯNG THEO THÂN PHẬN: 朕→Trẫm, 臣/微臣→Thần, 本王→Bản vương, 本宫→Bản cung.\n★ CHỨC DANH: 皇上→Hoàng thượng, 太后→Thái hậu, 王爷→Vương gia, 丞相→Thừa tướng, 太子→Thái tử, 公主→Công chúa, 大人→Đại nhân, 小姐→Tiểu thư, 公子→Công tử, 夫人→Phu nhân.\n★ LỄ NGHI: 报告→Bẩm, 遵命→Tuân lệnh, 告退→Cáo lui.\n★ TÊN RIÊNG: tên người Trung → phiên Hán-Việt (顾未易 → Cố Vị Dịch).",
      en: "Chinese PERIOD / PALACE-INTRIGUE drama — imperial court atmosphere, strict hierarchy.\n★ REGISTER: archaic, ceremonious register of the target language; emperors and nobles speak with authority, subjects speak humbly and never invert rank; no modern vocabulary at all.\n★ TITLES: translate court titles with period-appropriate equivalents (Emperor/Your Majesty, Empress Dowager, Prince, Chancellor, Crown Prince, Princess, My lord/lady, Young master/mistress, Madam).\n★ CEREMONY: render reports and orders with courtly formulas (I humbly report… / As you command… / I take my leave).\n★ NAMES: use the target language's usual convention for Chinese historical names, one consistent rendering per character."
    },
    review_phim_kiem_hiep: {
      vi: "BỐI CẢNH: phim KIẾM HIỆP / TIÊN HIỆP — giang hồ, môn phái, tu luyện.\n★ VĂN PHONG: hào sảng, dứt khoát, khí phách giang hồ; đại từ ta/ngươi/hắn/nàng, tại hạ; cảnh đánh nhau → câu cực ngắn (住手！→Dừng tay! | 受死吧！→Chịu chết đi!); đối thoại → trang trọng (得罪了→Xin đắc tội); không dùng từ hiện đại.\n★ SƯ MÔN / GIANG HỒ: 师父→Sư phụ, 师兄→Sư huynh, 师姐→Sư tỉ, 掌门→Chưởng môn, 前辈→Tiền bối, 大侠→Đại hiệp.\n★ CẤP BẬC TU LUYỆN (giữ đúng chuỗi, nhất quán cả video): 练气→Luyện Khí, 筑基→Trúc Cơ, 金丹→Kim Đan, 元婴→Nguyên Anh, 化神→Hóa Thần, 渡劫→Độ Kiếp, 大乘→Đại Thừa.\n★ THUẬT NGỮ HAY SAI: 金手指→Kim thủ chỉ, 法宝→Pháp bảo, 结界→Kết giới, 走火入魔→Tẩu hỏa nhập ma, 轻功→Khinh công.\n★ TÊN RIÊNG: người/chiêu thức/môn phái → Hán-Việt (令狐冲→Lệnh Hồ Xung, 降龙十八掌→Hàng Long Thập Bát Chưởng, 少林→Thiếu Lâm).",
      en: "Chinese WUXIA / CULTIVATION (xianxia) — martial world, sects, cultivation.\n★ REGISTER: bold, heroic, archaic register of the target language; fight scenes → very short forceful lines (Stop! / Die!); formal exchanges keep chivalrous courtesy; no modern vocabulary.\n★ SECT TERMS: keep the master/senior-junior hierarchy explicit (Master, Senior/Junior Brother-Sister, Sect Leader, Senior, Hero).\n★ CULTIVATION RANKS: translate the progression consistently for the whole video (Qi Refining, Foundation Establishment, Golden Core, Nascent Soul, Spirit Severing, Tribulation, Ascension) — never shuffle rank names between lines.\n★ NAMES: people/techniques/sects follow the target language's established wuxia conventions; one consistent rendering per name."
    },
    review_phim_xuyen_khong: {
      vi: "BỐI CẢNH: phim XUYÊN KHÔNG — người hiện đại sống trong thế giới cổ đại. Linh hồn thể loại là HAI TẦNG NGÔN NGỮ, phải giữ tương phản đó.\n★ Nhân vật xuyên không ĐỘC THOẠI / nói trong đầu → giọng HIỆN ĐẠI: tôi/tao, trời ơi, xong đời, toang rồi.\n★ Nhân vật xuyên không nói VỚI NGƯỜI CỔ ĐẠI → cố bắt chước cổ trang (ta, ngươi, Thần); lỡ lời hiện đại → GIỮ NGUYÊN, đó là chất hài.\n★ Người cổ đại → Hán-Việt thuần: ta/ngươi/hắn/nàng, Trẫm, Thần, Vương phi; tuyệt đối không lỡ từ hiện đại.\n★ THUẬT NGỮ: 穿越→Xuyên không, 金手指→Kim thủ chỉ, 系统→Hệ thống, 嫡女→Đích nữ, 庶女→Thứ nữ, 原身→Thân chủ gốc.\n★ GIỌNG ĐIỆU: cảnh lộ thân phận → cuống, lạc quẻ (完了完了，被发现了→Xong rồi, bị lộ rồi); cảnh cung đấu → sắc bén, trang trọng.\n★ TÊN RIÊNG: tên người Trung → phiên Hán-Việt.",
      en: "TRANSMIGRATION story — a modern person living in an ancient world. The soul of the genre is the TWO-REGISTER contrast; preserve it.\n★ Transmigrator's inner monologue → fully MODERN, casual register (oh no, I'm done for…).\n★ Transmigrator speaking to ancients → imitates the archaic register, with occasional modern slips — KEEP the slips, they are the comedy.\n★ Native ancients → pure archaic register, never a single modern word.\n★ TERMS: transmigration, golden finger (cheat power), the System, legitimate vs concubine-born daughter, the original host.\n★ TONE: near-exposure scenes → panicked, off-key; palace-intrigue scenes → sharp, formal.\n★ NAMES: the target language's usual convention for Chinese names."
    },
    review_phim_hien_dai: {
      vi: "BỐI CẢNH: phim TRUNG QUỐC HIỆN ĐẠI — đời thường, công sở, hành động, hài, sinh tồn. Xưng hô hiện đại; TUYỆT ĐỐI không dùng từ cổ trang (ta, ngươi, Vương gia, Trẫm) trừ khi nhân vật đang xem/đọc phim cổ trang.\n★ THUẬT NGỮ: 老板→Sếp, 总裁→Tổng tài, 黑帮→Băng đảng, 老大→Trùm, 小弟→Đàn em.\n★ GIỌNG ĐIỆU THEO KIỂU CẢNH:\n- Đời thường → văn nói tự nhiên, thoát ý (你到底想怎么样？→Rốt cuộc muốn gì? | 你疯了吗？→Điên rồi à?).\n- Hành động / căng thẳng → câu ngắn, tempo nhanh, dứt khoát (滚！→Cút đi!); lời kể review → ngôi ba hắn/gã/y.\n- Hài → câu gọn sắc, chốt đúng punch line; dịch sát mà mất hài → SÁNG TẠO câu hài mới cùng ý (你脑子进水了？→Não ngấm nước à? | 笑死我了→Cười xỉu!).\n- Sinh tồn / nguy hiểm → gấp gáp (注意！前方有蛇→Cẩn thận! Có rắn phía trước); mệnh lệnh ngắn dứt khoát.\n★ TÊN RIÊNG: tên Trung → phiên Hán-Việt; tên Tây/tổ chức (John, FBI, NASA) → giữ nguyên.",
      en: "MODERN Chinese drama — everyday life, office, action, comedy, survival. Modern register only; never archaic pronouns or court titles.\n★ TERMS: boss / CEO / gang boss / underling rendered with the target language's natural modern equivalents.\n★ TONE PER SCENE: everyday → natural spoken phrasing, meaning over words; action/tension → short lines, fast tempo (Get out!); comedy → tight lines that land the punch line — if a literal rendering kills the joke, recreate an equivalent joke with the same point; survival/danger → urgent, clipped commands (Watch out! Snake ahead!).\n★ NAMES: Chinese names follow the target language's convention; Western names/organizations (John, FBI, NASA) stay as-is."
    },
    review_phim_kinh_di: {
      vi: "BỐI CẢNH: phim KINH DỊ (Trung, linh dị, hay Âu Mỹ) — không khí rợn người là ưu tiên số 1.\n★ VĂN PHONG: câu ngắn sắc lạnh, dùng '…' tạo suspense; sợ → thì thầm; hoảng → gấp gáp (别回头！→Đừng quay lại! | 它不是人→Nó không phải người | 门自己开了→Cửa tự mở). Ma quỷ lên tiếng → giọng lạnh, câu cực ngắn.\n★ XƯNG HÔ: hiện đại (mặc định) → tôi/tao/mày; cổ trang (chỉ khi bối cảnh cổ đại) → ta/ngươi. KHÔNG trộn hai hệ.\n★ LINH DỊ TRUNG: 鬼→Ma/Quỷ, 厉鬼→Lệ quỷ, 僵尸→Cương thi, 附身→Ma nhập, 驱魔→Trừ tà, 道士→Đạo sĩ, 符咒→Bùa chú, 冤魂→Oan hồn, 诅咒→Lời nguyền, 阴气→Âm khí, 因果报应→Nhân quả báo ứng.\n★ KINH DỊ ÂU MỸ: 恶魔→Ác quỷ, 神父→Cha xứ, 附身→Quỷ ám, 丧尸→Zombie, 吸血鬼→Ma cà rồng, 该死→Chết tiệt, 上帝啊→Lạy Chúa.\n★ TÊN RIÊNG: tên Trung → Hán-Việt; tên Tây/quỷ Tây (Michael, Annabelle, Valak) → giữ nguyên.",
      en: "HORROR (Chinese supernatural or Western) — dread comes first.\n★ REGISTER: short, cold, razor-sharp lines; '…' for suspense; fear → whispered; panic → rushed (Don't turn around! / It's not human. / The door opened by itself.). When a ghost or demon speaks → icy, minimal lines.\n★ Modern setting (default) → modern casual register; ancient setting → archaic register; never mix the two.\n★ TERMS: translate ghost / vengeful spirit / possession / exorcism / Taoist priest / talisman / curse with the target language's established horror vocabulary; Western horror keeps demon / exorcism / priest / zombie / vampire conventions and interjections (Damn it / Oh my God).\n★ NAMES: Chinese names follow the target convention; Western names and demons (Michael, Annabelle, Valak) stay as-is."
    },
    review_anime_nhat_ban: {
      vi: "BỐI CẢNH: ANIME / HOẠT HÌNH (Nhật, donghua Trung, Hàn).\n★ XƯNG HÔ: học đường/đồng đội → tớ/cậu; chiến đấu/kẻ thù → tao/mày hoặc ta/ngươi; donghua cổ trang/tu tiên → ta/ngươi/hắn/nàng, Sư phụ.\n★ KÍNH NGỮ NHẬT GIỮ: Senpai (Tiền bối), Sensei (Thầy), Sama (Ngài), Aniki (Đại ca), Ojou-sama (Tiểu thư); KHÔNG thêm từ đệm Nhật (eto, ano) vào bản dịch.\n★ TÊN RIÊNG THEO GỐC: tên Nhật (Naruto, Tanjiro) → GIỮ Romaji, KHÔNG Hán-Việt hóa; tên Trung donghua (萧炎) → Hán-Việt (Tiêu Viêm); tên Hàn → giữ Latin; chiêu thức tiếng Anh → giữ nguyên, tiếng Nhật/Trung → dịch thoát ý hoặc giữ Romaji/Hán-Việt nếu đã quen thuộc.\n★ GIỌNG ĐIỆU: đời thường → nhẹ nhàng; shounen/chiến đấu → dứt khoát, máu lửa.",
      en: "ANIME / ANIMATION (Japanese, Chinese donghua, Korean).\n★ Keep Japanese honorifics (Senpai, Sensei, -sama, Aniki) where the target audience expects them; do not inject Japanese filler words (eto, ano) into the translation.\n★ NAMES BY ORIGIN: Japanese names stay Romaji (Naruto, Tanjiro); Chinese donghua names follow the target language's Chinese-name convention; Korean names stay romanized; English technique names stay English, Japanese/Chinese techniques get a natural translation or the established fan rendering.\n★ TONE: slice-of-life → light; shounen/battle → punchy, fired-up."
    },
    review_phim_han_quoc: {
      vi: "BỐI CẢNH: phim HÀN QUỐC — drama, tình cảm, xã hội.\n★ KÍNH NGỮ LÀ TÍN HIỆU QUAN HỆ: -요/-습니다 (kính) → thêm 'ạ/dạ', xưng khiêm (em/con/cháu); 반말 banmal (thân/bề trên) → bỏ 'ạ'. Giữ đúng từng lần chuyển kính ↔ thân — phim Hàn dùng nó để kể quan hệ.\n★ DANH XƯNG: Sunbae→Tiền bối, Hậu bối, 회장→Chủ tịch, Giám đốc, Trưởng phòng; xã hội/giang hồ → đại ca, tao/mày.\n★ TÊN RIÊNG: TUYỆT ĐỐI KHÔNG phiên Hán-Việt — giữ Latin (Lee Min Ho, Park); địa danh giữ nguyên (Seoul, Gangnam).\n★ GIỌNG ĐIỆU: lãng mạn, drama hoặc gay gắt tùy cảnh.\n★ LƯU Ý ASR: đuôi câu tiếng Hàn (yo, sum-ni-da) có thể bị nhận nhầm thành từ vô nghĩa → bỏ qua, dịch theo nghĩa chính.",
      en: "KOREAN drama — romance, family, society.\n★ SPEECH LEVELS ARE RELATIONSHIP SIGNALS: honorific endings (-yo/-seumnida) → respectful register; banmal → intimate/superior register. Preserve every switch between the two — K-drama uses it to tell the relationship story.\n★ TITLES: Sunbae/Hoobae, Chairman, Director, Team Leader; gang settings use boss/bro registers.\n★ NAMES: keep romanized Korean names (Lee Min Ho, Park) and places (Seoul, Gangnam) as-is.\n★ ASR NOTE: Korean sentence endings (yo, seumnida) may be mis-recognized as nonsense words → ignore them and translate the core meaning."
    },
    review_phim_au_my_chuan: {
      vi: "BỐI CẢNH: phim ÂU MỸ (Hollywood, Netflix) — nguồn thường là bản thuyết minh/phụ đề tiếng Trung của phim gốc.\n★ XƯNG HÔ: xã giao tôi/anh/cô; thân thiết tôi/cậu, anh/em; căng thẳng/kẻ thù tao/mày. KHÔNG dùng danh xưng Á Đông (huynh đệ, sư phụ, bệ hạ, ta, ngươi).\n★ GIỌNG ĐIỆU: hơi hướm thuyết minh phim ngoại kinh điển — 该死→Chết tiệt, 上帝啊→Lạy Chúa, Buddy→Anh bạn.\n★ TÊN RIÊNG: giữ nguyên 100% tên người/địa danh/tổ chức tiếng Anh (John, FBI, New York); TUYỆT ĐỐI KHÔNG phiên 'Giôn', 'Ma-ri'; giữ từ viết tắt khoa học/quân sự.",
      en: "WESTERN film (Hollywood, Netflix) — the source subtitles are often a Chinese dub/sub of the original.\n★ REGISTER: natural modern speech of the target language; formal ↔ casual ↔ hostile per relationship; never use East-Asian address forms (master, elder brother, Your Majesty) — restore Western interjections instead (Damn it, Oh my God, Buddy).\n★ NAMES: keep 100% of English names, places, organizations and military/scientific acronyms exactly as-is; never transliterate them."
    }
  };
});
var mr = Z((_0x4ce44e, _0x20d11b) => {
  var _0x8f2581 = lr();
  function _0x5d136b() {
    return Object.keys(_0x8f2581);
  }
  var _0x1d9cf5 = {
    ai_tong_hop: "ai_tong_hop_thong_minh",
    drama: "review_phim_hien_dai",
    historical: "review_phim_co_trang",
    xianxia: "review_phim_kiem_hiep",
    isekai: "review_phim_xuyen_khong",
    anime: "review_anime_nhat_ban",
    action: "review_phim_hien_dai",
    comedy: "review_phim_hien_dai",
    survival: "review_phim_hien_dai",
    horror: "review_phim_kinh_di",
    korean: "review_phim_han_quoc",
    western: "review_phim_au_my_chuan",
    review_phim_hanh_dong: "review_phim_hien_dai",
    review_phim_hai: "review_phim_hien_dai",
    review_phim_sinh_ton: "review_phim_hien_dai",
    review_phim_kinh_di_trung: "review_phim_kinh_di",
    review_phim_linh_di: "review_phim_kinh_di",
    review_phim_kinh_di_au_my: "review_phim_kinh_di"
  };
  function _0x3d2808(_0x960912, _0x49148, _0x5d90d7 = "vi") {
    if (!_0x960912) {
      return "";
    }
    if (_0x49148 && typeof _0x49148 == "object") {
      let _0x493b46 = _0x49148[_0x960912];
      if (_0x493b46 && typeof _0x493b46.content == "string") {
        return _0x493b46.content;
      }
    }
    if (_0x960912 === "default") {
      return "";
    }
    let _0x1d88aa = _0x1d9cf5[_0x960912] || _0x960912;
    let _0x1a152b = _0x8f2581[_0x1d88aa];
    if (_0x1a152b) {
      if (typeof _0x1a152b == "string") {
        return _0x1a152b;
      } else if (_0x5d90d7 === "vi") {
        return _0x1a152b.vi || "";
      } else {
        return _0x1a152b.en || "";
      }
    } else {
      return "";
    }
  }
  _0x20d11b.exports = {
    listPresets: _0x5d136b,
    getPresetTemplate: _0x3d2808,
    ALIASES: _0x1d9cf5
  };
});
var Ln = Z((_0x6073e1, _0x1ac525) => {
  var _0x50ab83 = je();
  function _0x91172(_0x1334fc, _0x55f1ca) {
    let _0x18ce74 = (() => {
      let _0xdaccc9 = (_0x1334fc || "").toLowerCase();
      if (_0x55f1ca) {
        return 60;
      } else if (_0xdaccc9.includes("flash-lite") || _0xdaccc9.includes("lite")) {
        return 600;
      } else if (_0xdaccc9.includes("flash")) {
        return 400;
      } else if (_0xdaccc9.includes("pro")) {
        return 120;
      } else if (_0xdaccc9.startsWith("gpt")) {
        return 200;
      } else if (_0xdaccc9.includes("gemini")) {
        return 300;
      } else {
        return 120;
      }
    })();
    return _0x50ab83.shadowCompare("chunkSizeForModel", _0x18ce74, _0xf675db => Number(_0xf675db.chunkSizeForModelJson(JSON.stringify({
      model: _0x1334fc,
      isCustom: _0x55f1ca
    }))));
  }
  function _0x525cd3(_0xfbdd3e, _0x3f678a = 120) {
    let _0x454456 = [];
    for (let _0x4f2214 = 0; _0x4f2214 < _0xfbdd3e.length; _0x4f2214 += _0x3f678a) {
      _0x454456.push(_0xfbdd3e.slice(_0x4f2214, _0x4f2214 + _0x3f678a));
    }
    return _0x50ab83.shadowCompare("chunkSegments", _0x454456, _0x27dc1e => JSON.parse(_0x27dc1e.chunkSegmentsJson(JSON.stringify({
      segments: _0xfbdd3e,
      maxLines: _0x3f678a
    }))));
  }
  function _0x90036d(_0x4df107, _0x43f1c1 = 120) {
    let _0x2589be = (() => {
      if (!_0x4df107 || !_0x4df107.length) {
        return [];
      }
      if (!_0x4df107.some(_0xa0d4a9 => _0xa0d4a9 && _0xa0d4a9.runId !== undefined && _0xa0d4a9.runId !== null)) {
        return _0x525cd3(_0x4df107, _0x43f1c1);
      }
      let _0x128830 = [];
      let _0x391715 = null;
      let _0x3c7efa;
      for (let _0x59ce31 of _0x4df107) {
        let _0x174afd = _0x59ce31.runId;
        if (!_0x391715 || _0x174afd !== _0x3c7efa) {
          _0x391715 = [];
          _0x3c7efa = _0x174afd;
          _0x128830.push(_0x391715);
        }
        _0x391715.push(_0x59ce31);
      }
      let _0x4bacde = [];
      let _0x585f49 = [];
      for (let _0x5d2099 of _0x128830) {
        if (_0x585f49.length && _0x585f49.length + _0x5d2099.length > _0x43f1c1) {
          _0x4bacde.push(_0x585f49);
          _0x585f49 = [];
        }
        _0x585f49.push(..._0x5d2099);
        if (_0x585f49.length >= _0x43f1c1) {
          _0x4bacde.push(_0x585f49);
          _0x585f49 = [];
        }
      }
      if (_0x585f49.length) {
        _0x4bacde.push(_0x585f49);
      }
      return _0x4bacde;
    })();
    return _0x50ab83.shadowCompare("chunkByRun", _0x2589be, _0x373151 => JSON.parse(_0x373151.chunkByRunJson(JSON.stringify({
      items: _0x4df107,
      maxLines: _0x43f1c1
    }))));
  }
  function _0x4c0cc8(_0x2d825b) {
    let _0x2f10eb = 0;
    let _0x828ad7 = 0;
    for (let _0x53f56a of _0x2d825b || "") {
      if (_0x53f56a >= "一" && _0x53f56a <= "鿿" || _0x53f56a >= "぀" && _0x53f56a <= "ヿ" || _0x53f56a >= "가" && _0x53f56a <= "힯") {
        _0x2f10eb++;
      } else {
        _0x828ad7++;
      }
    }
    let _0x4a4b00 = Math.ceil(_0x2f10eb + _0x828ad7 / 3.5);
    return _0x50ab83.shadowCompare("estimateTokens", _0x4a4b00, _0x2d0899 => Number(_0x2d0899.estimateTokensJson(JSON.stringify({
      text: _0x2d825b || ""
    }))));
  }
  function _0x520e73(_0x1a9363, _0xfff566) {
    let _0x519dd7 = (() => {
      let {
        maxLines: _0x16c8d2 = 200,
        tokenBudget: _0x2ccdfb = 8000,
        perLineOverhead: _0x29e444 = 12,
        sceneStart: _0x2a06b2 = null
      } = _0xfff566 || {};
      let _0x2fddbf = [];
      let _0x48d905 = [];
      let _0xd73c84 = 0;
      let _0x384a1d = () => {
        if (_0x48d905.length) {
          _0x2fddbf.push(_0x48d905);
          _0x48d905 = [];
          _0xd73c84 = 0;
        }
      };
      for (let _0x1aa867 = 0; _0x1aa867 < _0x1a9363.length; _0x1aa867++) {
        let _0x5513e7 = _0x4c0cc8(_0x1a9363[_0x1aa867].text) + _0x29e444;
        if (_0x48d905.length && _0x2a06b2 && _0x2a06b2.has(_0x1aa867) && (_0x48d905.length >= _0x16c8d2 / 2 || _0xd73c84 >= _0x2ccdfb / 2)) {
          _0x384a1d();
        }
        if (_0x48d905.length && (_0x48d905.length >= _0x16c8d2 || _0xd73c84 + _0x5513e7 > _0x2ccdfb)) {
          _0x384a1d();
        }
        _0x48d905.push(_0x1a9363[_0x1aa867]);
        _0xd73c84 += _0x5513e7;
      }
      _0x384a1d();
      return _0x2fddbf;
    })();
    return _0x50ab83.shadowCompare("chunkTokenAware", _0x519dd7, _0xed9832 => {
      let _0xe0a314 = _0xfff566 || {};
      let _0x2f56aa = {
        ..._0xe0a314
      };
      if (_0xe0a314.sceneStart instanceof Set) {
        _0x2f56aa.sceneStart = Array.from(_0xe0a314.sceneStart);
      }
      return JSON.parse(_0xed9832.chunkTokenAwareJson(JSON.stringify({
        segments: _0x1a9363,
        opts: _0x2f56aa
      })));
    });
  }
  _0x1ac525.exports = {
    chunkSizeForModel: _0x91172,
    chunkSegments: _0x525cd3,
    chunkByRun: _0x90036d,
    estimateTokens: _0x4c0cc8,
    chunkTokenAware: _0x520e73
  };
});
var Nr = Z((_0x5caea4, _0x1e2f8c) => {
  function _0x14b0a1(_0x386580) {
    return _0x386580 >= "가" && _0x386580 <= "힣" || _0x386580 >= "ᄀ" && _0x386580 <= "ᇿ" || _0x386580 >= "㄰" && _0x386580 <= "㆏";
  }
  function _0x4dc3f9(_0x4ec32f) {
    return _0x4ec32f >= "぀" && _0x4ec32f <= "ヿ";
  }
  function _0x3a11bc(_0x496225) {
    return _0x496225 >= "一" && _0x496225 <= "鿿" || _0x496225 >= "㐀" && _0x496225 <= "䶿";
  }
  function _0x2bbb8c(_0x209726) {
    return _0x209726 >= "฀" && _0x209726 <= "๿";
  }
  var _0x311b5b = /[A-Za-zÀ-ɏ]/;
  function _0x544f9d(_0xdeda84) {
    let _0x1a8744 = 0;
    let _0x28159e = 0;
    let _0x69d2e5 = 0;
    let _0x4f5797 = 0;
    let _0x10e87d = 0;
    for (let _0x25c9d7 of _0xdeda84 || []) {
      let _0x2a9f62 = _0x25c9d7 && _0x25c9d7.text || "";
      for (let _0x358373 of _0x2a9f62) {
        if (_0x14b0a1(_0x358373)) {
          _0x69d2e5++;
        } else if (_0x4dc3f9(_0x358373)) {
          _0x28159e++;
        } else if (_0x3a11bc(_0x358373)) {
          _0x1a8744++;
        } else if (_0x2bbb8c(_0x358373)) {
          _0x4f5797++;
        } else if (_0x311b5b.test(_0x358373)) {
          _0x10e87d++;
        }
      }
    }
    let _0x10a87b = _0x1a8744 + _0x28159e + _0x69d2e5 + _0x4f5797 + _0x10e87d;
    if (_0x10a87b === 0) {
      return {
        lang: "auto",
        confidence: 0
      };
    } else if (_0x28159e > 0 && _0x28159e / (_0x28159e + _0x1a8744) >= 0.15) {
      return {
        lang: "ja",
        confidence: (_0x28159e + _0x1a8744) / _0x10a87b
      };
    } else if (_0x69d2e5 > 0 && _0x69d2e5 >= _0x1a8744 && _0x69d2e5 >= _0x10e87d && _0x69d2e5 >= _0x4f5797) {
      return {
        lang: "ko",
        confidence: _0x69d2e5 / _0x10a87b
      };
    } else if (_0x4f5797 > 0 && _0x4f5797 >= _0x1a8744 && _0x4f5797 >= _0x10e87d) {
      return {
        lang: "th",
        confidence: _0x4f5797 / _0x10a87b
      };
    } else if (_0x1a8744 > 0 && _0x1a8744 >= _0x10e87d) {
      return {
        lang: "zh",
        confidence: _0x1a8744 / _0x10a87b
      };
    } else if (_0x10e87d > 0) {
      return {
        lang: "en",
        confidence: _0x10e87d / _0x10a87b
      };
    } else {
      return {
        lang: "auto",
        confidence: 0
      };
    }
  }
  _0x1e2f8c.exports = {
    detectSourceLang: _0x544f9d
  };
});
var St = Z((_0x4824b3, _0x422ea0) => {
  var _0xa962a7 = je();
  var _0x73eb0d = 200000;
  var _0x166bb7 = 1000000;
  function _0x43fce4(_0x424ca4) {
    throw new _0xa962a7.NativeRequiredError("scene adapter: " + _0x424ca4);
  }
  function _0x5b235a(_0x1c151f) {
    return typeof _0x1c151f == "number" && Number.isFinite(_0x1c151f);
  }
  function _0x22d06a(_0x4183ad) {
    return _0xa962a7.executeNativeRequired({
      algorithm: "scene.endsWithSentence",
      method: "endsWithSentence",
      input: _0x4183ad || "",
      validateOutput: _0x4d29ba => typeof _0x4d29ba == "boolean" ? null : "expected boolean, got " + typeof _0x4d29ba
    });
  }
  function _0x3f1a3f(_0x3331d5, _0x55bb30) {
    if (_0x3331d5 != null && !Array.isArray(_0x3331d5)) {
      _0x43fce4("segments must be an array");
    }
    if (_0x55bb30 != null && typeof _0x55bb30 != "object") {
      _0x43fce4("opts must be an object");
    }
    let _0x422b51 = Array.isArray(_0x3331d5) ? _0x3331d5.length : 0;
    if (_0x422b51 > _0x73eb0d) {
      _0x43fce4("too many segments (" + _0x422b51 + " > " + _0x73eb0d + ")");
    }
    let _0x4b54b3 = Array.isArray(_0x3331d5) ? _0x3331d5 : [];
    let _0x14961a = _0xa962a7.executeNativeRequired({
      algorithm: "scene.split",
      method: "sceneSplitJson",
      input: {
        segments: _0x3331d5,
        opts: _0x55bb30
      },
      validateOutput: _0x1ea4b5 => _0x5847d8(_0x1ea4b5, _0x4b54b3)
    });
    return {
      scenes: _0x14961a.scenes,
      sceneStartIndices: new Set(_0x14961a.sceneStartIndices)
    };
  }
  function _0x5847d8(_0x4da6ec, _0x52aa2b) {
    let _0x5eb1e1 = _0x52aa2b.length;
    if (!_0x4da6ec || !Array.isArray(_0x4da6ec.scenes) || !Array.isArray(_0x4da6ec.sceneStartIndices)) {
      return "expected { scenes: [], sceneStartIndices: [] }";
    }
    if (_0x5eb1e1 > 0 && _0x4da6ec.scenes.length === 0) {
      return "segments present but no scenes";
    }
    if (_0x4da6ec.scenes.length > _0x5eb1e1) {
      return "more scenes (" + _0x4da6ec.scenes.length + ") than segments (" + _0x5eb1e1 + ")";
    }
    if (_0x4da6ec.sceneStartIndices.length !== _0x4da6ec.scenes.length) {
      return "sceneStartIndices (" + _0x4da6ec.sceneStartIndices.length + ") != scenes (" + _0x4da6ec.scenes.length + ")";
    }
    let _0x431329 = -1;
    for (let _0x42fc8b = 0; _0x42fc8b < _0x4da6ec.scenes.length; _0x42fc8b++) {
      let _0x56160c = _0x4da6ec.sceneStartIndices[_0x42fc8b];
      if (!Number.isInteger(_0x56160c) || _0x56160c < 0 || _0x56160c >= _0x5eb1e1) {
        return "sceneStartIndices[" + _0x42fc8b + "] out of range (" + _0x56160c + ", n=" + _0x5eb1e1 + ")";
      }
      if (_0x42fc8b === 0 && _0x56160c !== 0) {
        return "first scene must start at index 0";
      }
      if (_0x56160c <= _0x431329) {
        return "sceneStartIndices must be strictly increasing";
      }
      _0x431329 = _0x56160c;
      let _0x171336 = _0x4da6ec.scenes[_0x42fc8b];
      if (!_0x171336 || typeof _0x171336.id != "string" || !Array.isArray(_0x171336.segIds)) {
        return "scene[" + _0x42fc8b + "] missing id/segIds";
      }
      if (_0x171336.segIds.length === 0) {
        return "scene[" + _0x42fc8b + "] has empty segIds";
      }
      if (_0x171336.startIndex !== _0x56160c) {
        return "scene[" + _0x42fc8b + "].startIndex (" + _0x171336.startIndex + ") != sceneStartIndices[" + _0x42fc8b + "] (" + _0x56160c + ")";
      }
      if (!_0x5b235a(_0x171336.startTime) || !_0x5b235a(_0x171336.endTime)) {
        return "scene[" + _0x42fc8b + "] start/endTime not finite";
      }
    }
    let _0x3513da = [];
    for (let _0x209190 of _0x4da6ec.scenes) {
      for (let _0x1f3998 of _0x209190.segIds) {
        _0x3513da.push(_0x1f3998);
      }
    }
    if (_0x3513da.length !== _0x5eb1e1) {
      return "flattened segIds (" + _0x3513da.length + ") != segments (" + _0x5eb1e1 + ")";
    }
    for (let _0x2d5f12 = 0; _0x2d5f12 < _0x5eb1e1; _0x2d5f12++) {
      let _0x2fdf8d = _0x52aa2b[_0x2d5f12] ? _0x52aa2b[_0x2d5f12].id : undefined;
      let _0x212894 = _0x3513da[_0x2d5f12];
      if (_0x212894 !== _0x2fdf8d && (_0x212894 != null || _0x2fdf8d != null)) {
        return "segIds[" + _0x2d5f12 + "] (" + JSON.stringify(_0x212894) + ") != input segment id (" + JSON.stringify(_0x2fdf8d) + ")";
      }
    }
    return null;
  }
  function _0x59a02b(_0x37cbb9, _0x28e577) {
    if (!Number.isInteger(_0x28e577) || _0x28e577 < 0 || _0x28e577 > _0x166bb7) {
      _0x43fce4("totalLen must be an integer in [0, " + _0x166bb7 + "] (got " + _0x28e577 + ")");
    }
    let _0x18dec2 = Array.from(_0x37cbb9 || []);
    let _0x285c07 = _0x18dec2.length;
    return _0xa962a7.executeNativeRequired({
      algorithm: "scene.indexByStart",
      method: "sceneIndexByStartJson",
      input: {
        sceneStartIndices: _0x18dec2,
        totalLen: _0x28e577
      },
      validateOutput: _0x3f614c => {
        if (!Array.isArray(_0x3f614c) || _0x3f614c.length !== _0x28e577) {
          return "expected number[" + _0x28e577 + "]";
        }
        let _0x34c6a3 = -1;
        for (let _0x5a1292 = 0; _0x5a1292 < _0x3f614c.length; _0x5a1292++) {
          let _0x45decc = _0x3f614c[_0x5a1292];
          if (!Number.isInteger(_0x45decc) || _0x45decc < 0) {
            return "index[" + _0x5a1292 + "] not a non-negative integer (" + _0x45decc + ")";
          }
          if (_0x285c07 === 0) {
            if (_0x45decc !== 0) {
              return "index[" + _0x5a1292 + "] (" + _0x45decc + ") but there are zero scenes (only 0 is valid)";
            }
          } else if (_0x45decc >= _0x285c07) {
            return "index[" + _0x5a1292 + "] (" + _0x45decc + ") >= scene count (" + _0x285c07 + ")";
          }
          if (_0x45decc < _0x34c6a3) {
            return "index[" + _0x5a1292 + "] (" + _0x45decc + ") < previous (" + _0x34c6a3 + ") — not monotonic";
          }
          _0x34c6a3 = _0x45decc;
        }
        return null;
      }
    });
  }
  _0x422ea0.exports = {
    sceneSplit: _0x3f1a3f,
    sceneIndexByStart: _0x59a02b,
    endsWithSentence: _0x22d06a
  };
});
var Gn = Z((_0x1d43bd, _0x33d7ac) => {
  var {
    buildDubbingPlan: _0xd81189,
    planToTimelinePieces: _0x38ff8b
  } = ht();
  var {
    viSyllables: _0x5544b1
  } = Pt();
  var _0x2dd07d = je();
  var _0x1fe8e6 = Object.freeze({
    default: 4.7,
    "bv:BV562_streaming": 4.75,
    "bv:BV074_streaming": 4.75
  });
  var _0x2fd1ff = Object.freeze({
    minRate: 1,
    maxRate: 1.3,
    step: 0.1,
    targetFactor: 1.08,
    maxInfeasibleFrac: 0.03
  });
  var _0xd45f2b = _0x2fd1ff.maxRate;
  function _0x2d13c4(_0x2124ce) {
    return _0x1fe8e6[_0x2124ce] || _0x1fe8e6.default;
  }
  function _0x21c176(_0x2376eb, _0x1d5f74 = {}) {
    let _0x429500 = _0x36d0fe => _0x2dd07d.shadowCompare("suggestGlobalVoiceRate", _0x36d0fe, _0x350404 => JSON.parse(_0x350404.suggestGlobalVoiceRateJson(JSON.stringify({
      units: _0x2376eb,
      opts: _0x1d5f74
    }))));
    let _0x27eb77 = {
      ..._0x2fd1ff,
      ..._0x1d5f74
    };
    let _0x3a17bc = _0x2d13c4(_0x1d5f74.voiceId);
    let _0x5f2ebf = Number(_0x1d5f74.totalDuration) || 0;
    let _0x4299a6 = [];
    for (let _0x5b6d40 of _0x2376eb || []) {
      if (!_0x5b6d40 || typeof _0x5b6d40.startTime != "number" || typeof _0x5b6d40.endTime != "number" || _0x5b6d40.endTime <= _0x5b6d40.startTime) {
        continue;
      }
      let _0x24df7e = null;
      if (Number.isFinite(_0x5b6d40.audioDuration) && _0x5b6d40.audioDuration > 0) {
        let _0x57c3d8 = Number.isFinite(_0x5b6d40.renderedSpeed) && _0x5b6d40.renderedSpeed > 0 ? _0x5b6d40.renderedSpeed : 1;
        _0x24df7e = _0x5b6d40.audioDuration * _0x57c3d8;
      } else {
        let _0x3d1c8f = Number.isFinite(_0x5b6d40.sylCount) ? _0x5b6d40.sylCount : _0x5544b1(_0x5b6d40.spokenText);
        if (_0x3d1c8f > 0) {
          _0x24df7e = _0x3d1c8f / _0x3a17bc;
        }
      }
      if (_0x24df7e !== null && !(_0x24df7e <= 0)) {
        _0x4299a6.push({
          ..._0x5b6d40,
          naturalSec: _0x24df7e
        });
      }
    }
    if (!_0x4299a6.length) {
      return _0x429500({
        rate: _0x27eb77.minRate,
        candidates: []
      });
    }
    let _0x681cd6 = [];
    let _0x5b75c2 = Math.round((_0x27eb77.maxRate - _0x27eb77.minRate) / _0x27eb77.step);
    for (let _0x37454b = 0; _0x37454b <= _0x5b75c2; _0x37454b++) {
      let _0x2404bb = Math.round((_0x27eb77.minRate + _0x37454b * _0x27eb77.step) * 100) / 100;
      let _0x48af96 = _0x4299a6.map(_0x4f8a9c => ({
        ..._0x4f8a9c,
        audioDuration: _0x4f8a9c.naturalSec / _0x2404bb
      }));
      let _0x29975c = _0xd81189(_0x48af96, _0x5f2ebf, {
        globalVoiceRate: _0x2404bb,
        policy: {
          ...(_0x1d5f74.policy || {}),
          residualTempoCap: 1
        }
      });
      let {
        newTotalDuration: _0x3f2346
      } = _0x38ff8b(_0x29975c, _0x5f2ebf);
      let _0x273593 = _0x5f2ebf > 0 ? _0x3f2346 / _0x5f2ebf : 1;
      let _0x501f39 = _0x29975c.clusters.length ? Math.min(..._0x29975c.clusters.map(_0x182688 => _0x182688.videoSpeed)) : 1;
      _0x681cd6.push({
        rate: _0x2404bb,
        infeasible: _0x29975c.infeasibleUnitIds.length,
        factor: Math.round(_0x273593 * 1000) / 1000,
        minVideoSpeed: _0x501f39
      });
    }
    let _0x1ac95b = Math.max(1, Math.ceil(_0x4299a6.length * _0x27eb77.maxInfeasibleFrac));
    let _0x109744 = _0x681cd6.find(_0x2b4f25 => _0x2b4f25.infeasible <= _0x1ac95b && _0x2b4f25.factor <= _0x27eb77.targetFactor);
    if (_0x109744) {
      return _0x429500({
        rate: _0x109744.rate,
        candidates: _0x681cd6
      });
    }
    let _0x444137 = _0x681cd6.slice().sort((_0x5e695a, _0x1495e9) => _0x5e695a.factor - _0x1495e9.factor || _0x5e695a.infeasible - _0x1495e9.infeasible)[0];
    return _0x429500({
      rate: _0x444137.rate,
      candidates: _0x681cd6
    });
  }
  _0x33d7ac.exports = {
    suggestGlobalVoiceRate: _0x21c176,
    baseSylPerSec: _0x2d13c4,
    RATE_CEILING: _0xd45f2b,
    VOICE_BASE_SYL_PER_SEC: _0x1fe8e6
  };
});
var Un = Z((_0x37ea24, _0x33037a) => {
  var _0x2d3cc4 = je();
  function _0x3f1868() {
    return {
      version: 2,
      rev: 0,
      detected: null,
      entities: [],
      relationships: [],
      sceneSummaries: {},
      decisions: []
    };
  }
  var _0x31d54e = 0;
  function _0x3edf40(_0x3c70f6) {
    _0x31d54e += 1;
    return "rel_" + (_0x3c70f6.rev || 0) + "_" + (_0x3c70f6.relationships || []).length + "_" + _0x31d54e;
  }
  function _0x1f9752(_0x416a12, _0x2e2909) {
    if (!_0x416a12) {
      return null;
    }
    let _0x42c3e0 = _0x416a12.speakerId || _0x416a12.speaker;
    let _0x2c7d6d = _0x416a12.listenerId || _0x416a12.listener;
    if (!_0x42c3e0 || !_0x2c7d6d) {
      return null;
    } else {
      return {
        id: _0x416a12.id || "rel_legacy_" + _0x2e2909,
        speakerId: _0x42c3e0,
        listenerId: _0x2c7d6d,
        fromScene: _0x416a12.fromScene ?? 0,
        toScene: _0x416a12.toScene ?? null,
        selfPronoun: _0x416a12.selfPronoun || null,
        addressTerm: _0x416a12.addressTerm || null,
        relation: _0x416a12.relation || null,
        register: _0x416a12.register || null,
        confidence: _0x416a12.confidence ?? 0.6,
        evidenceUnitIds: Array.isArray(_0x416a12.evidenceUnitIds) ? _0x416a12.evidenceUnitIds : [],
        locked: !!_0x416a12.locked
      };
    }
  }
  function _0x55cd09(_0x19f731) {
    let _0x28ffee = !_0x19f731 || typeof _0x19f731 != "object" ? _0x3f1868() : {
      version: 2,
      rev: _0x19f731.rev || 0,
      detected: _0x19f731.detected || null,
      entities: Array.isArray(_0x19f731.entities) ? _0x19f731.entities : [],
      relationships: (Array.isArray(_0x19f731.relationships) ? _0x19f731.relationships : []).map(_0x1f9752).filter(Boolean),
      sceneSummaries: _0x19f731.sceneSummaries || {},
      decisions: Array.isArray(_0x19f731.decisions) ? _0x19f731.decisions : []
    };
    return _0x2d3cc4.shadowCompare("normalizeBible", _0x28ffee, _0x2a3f0a => JSON.parse(_0x2a3f0a.normalizeBibleJson(JSON.stringify({
      bible: _0x19f731
    }))));
  }
  function _0x45a84f(_0x46e67f, _0x78ef71, _0x51020d, _0x1275f4) {
    let _0x78f82b = (() => {
      if (!_0x46e67f || !Array.isArray(_0x46e67f.relationships)) {
        return null;
      }
      let _0x4d6d69 = _0x46e67f.relationships.filter(_0x8d6abc => _0x8d6abc.speakerId === _0x78ef71 && _0x8d6abc.listenerId === _0x51020d && (_0x8d6abc.fromScene ?? 0) <= _0x1275f4 && (_0x8d6abc.toScene == null || _0x8d6abc.toScene >= _0x1275f4));
      if (!_0x4d6d69.length) {
        return null;
      }
      let _0x14835f = _0x4d6d69.filter(_0x3a4107 => _0x3a4107.locked);
      return (_0x14835f.length ? _0x14835f : _0x4d6d69).reduce((_0x388f15, _0x216b50) => (_0x216b50.fromScene ?? 0) >= (_0x388f15.fromScene ?? 0) ? _0x216b50 : _0x388f15);
    })();
    return _0x2d3cc4.crossCheck("activeRelationAt", _0x78f82b, _0x5b71fe => JSON.parse(_0x5b71fe.activeRelationAtJson(JSON.stringify({
      bible: _0x46e67f,
      speakerId: _0x78ef71,
      listenerId: _0x51020d,
      sceneIndex: _0x1275f4
    }))));
  }
  var _0x473e0e = new Set(["anh", "ông", "chú", "bố", "ba", "cha", "thầy", "chàng", "ổng"]);
  var _0x55886e = new Set(["chị", "cô", "bà", "dì", "mẹ", "má", "mợ", "thím", "nàng", "bả"]);
  function _0x6aab59(_0x21b141) {
    let _0x138cbc = String(_0x21b141 || "").trim().toLowerCase();
    if (["nam", "male", "m", "trai", "nam giới", "đàn ông"].includes(_0x138cbc)) {
      return "male";
    } else if (["nữ", "nu", "female", "f", "gái", "nữ giới", "phụ nữ", "đàn bà"].includes(_0x138cbc)) {
      return "female";
    } else {
      return null;
    }
  }
  function _0xf07838(_0x6ac962, _0x33ef5e, _0x506f84) {
    let _0x56ada4 = String(_0x6ac962 || "").trim().toLowerCase();
    if (!_0x56ada4) {
      return null;
    }
    for (let _0x220337 of _0x506f84 || []) {
      if (_0x220337 && (String(_0x220337.id || "").toLowerCase() === _0x56ada4 || String(_0x220337.name || "").toLowerCase() === _0x56ada4)) {
        let _0x444e1b = _0x6aab59(_0x220337.gender);
        if (_0x444e1b) {
          return _0x444e1b;
        }
      }
    }
    for (let _0x5a7b60 of _0x33ef5e || []) {
      if (!_0x5a7b60) {
        continue;
      }
      if ([_0x5a7b60.tgt, _0x5a7b60.src, ...(_0x5a7b60.aliases || [])].filter(Boolean).some(_0x167004 => String(_0x167004).toLowerCase() === _0x56ada4)) {
        let _0x32fe3a = _0x6aab59(_0x5a7b60.gender);
        if (_0x32fe3a) {
          return _0x32fe3a;
        }
      }
    }
    return null;
  }
  function _0x427eef(_0x4bf639) {
    let _0x1c7621 = String(_0x4bf639 || "").trim().toLowerCase();
    if (_0x473e0e.has(_0x1c7621)) {
      return "male";
    } else if (_0x55886e.has(_0x1c7621)) {
      return "female";
    } else {
      return null;
    }
  }
  function _0x557461(_0x4238ef, _0x21c7b7, _0x1ce32f) {
    let _0x7c1b65 = (() => {
      if (!_0x4238ef) {
        return null;
      }
      let _0x2acd7b = _0x427eef(_0x4238ef.selfPronoun);
      if (_0x2acd7b) {
        let _0x241f40 = _0xf07838(_0x4238ef.speakerId || _0x4238ef.speaker, _0x21c7b7, _0x1ce32f);
        if (_0x241f40 && _0x241f40 !== _0x2acd7b) {
          return "người nói giới '" + _0x241f40 + "' không thể tự xưng '" + _0x4238ef.selfPronoun + "'";
        }
      }
      let _0x5ba587 = _0x427eef(_0x4238ef.addressTerm);
      if (_0x5ba587) {
        let _0x2430a6 = _0xf07838(_0x4238ef.listenerId || _0x4238ef.listener, _0x21c7b7, _0x1ce32f);
        if (_0x2430a6 && _0x2430a6 !== _0x5ba587) {
          return "người nghe giới '" + _0x2430a6 + "' không thể bị gọi là '" + _0x4238ef.addressTerm + "'";
        }
      }
      return null;
    })();
    return _0x2d3cc4.shadowCompare("relationshipGenderIssue", _0x7c1b65, _0x39196d => JSON.parse(_0x39196d.relationshipGenderIssueJson(JSON.stringify({
      rel: _0x4238ef,
      entities: _0x21c7b7,
      speakers: _0x1ce32f
    }))));
  }
  function _0x834d37(_0x11a84b, _0x416898) {
    let _0x483b7c = _0x55cd09(_0x11a84b);
    for (let _0x59f787 of _0x416898 || []) {
      if (!_0x59f787 || !_0x59f787.source || !_0x59f787.target) {
        continue;
      }
      let _0x3a55bf = String(_0x59f787.source).toLowerCase();
      let _0x55cd36 = _0x483b7c.entities.find(_0x22ef56 => String(_0x22ef56.src).toLowerCase() === _0x3a55bf);
      if (_0x55cd36) {
        _0x55cd36.tgt = String(_0x59f787.target);
        _0x55cd36.locked = true;
        _0x55cd36.confidence = 1;
      } else {
        _0x483b7c.entities.push({
          id: "g:" + _0x59f787.source,
          src: String(_0x59f787.source),
          tgt: String(_0x59f787.target),
          aliases: [],
          type: "term",
          gender: null,
          confidence: 1,
          locked: true,
          evidence: []
        });
      }
    }
    return _0x2d3cc4.shadowCompare("seedFromGlossary", _0x483b7c, _0xb2045f => JSON.parse(_0xb2045f.seedFromGlossaryJson(JSON.stringify({
      bible: _0x11a84b,
      glossary: _0x416898
    }))));
  }
  function _0x1ad8be(_0x37c4b2) {
    let _0x4c5d98 = (() => {
      if (!_0x37c4b2) {
        return null;
      }
      let _0x410eeb = _0x37c4b2.indexOf("[BIBLE]");
      if (_0x410eeb === -1) {
        return null;
      }
      let _0x48c04a = _0x37c4b2.slice(_0x410eeb + 7);
      let _0x4d6ff5 = _0x48c04a.indexOf("{");
      if (_0x4d6ff5 === -1) {
        return null;
      }
      let _0x2256f9 = 0;
      let _0x4ff6df = -1;
      for (let _0x56a269 = _0x4d6ff5; _0x56a269 < _0x48c04a.length; _0x56a269++) {
        if (_0x48c04a[_0x56a269] === "{") {
          _0x2256f9++;
        } else if (_0x48c04a[_0x56a269] === "}" && (_0x2256f9--, _0x2256f9 === 0)) {
          _0x4ff6df = _0x56a269;
          break;
        }
      }
      if (_0x4ff6df === -1) {
        return null;
      }
      try {
        let _0x4ea22f = JSON.parse(_0x48c04a.slice(_0x4d6ff5, _0x4ff6df + 1));
        return {
          entities: Array.isArray(_0x4ea22f.entities) ? _0x4ea22f.entities : [],
          relationships: Array.isArray(_0x4ea22f.relationships) ? _0x4ea22f.relationships : []
        };
      } catch {
        return null;
      }
    })();
    return _0x2d3cc4.shadowCompare("parseBibleDelta", _0x4c5d98, _0xc3ba5c => JSON.parse(_0xc3ba5c.parseBibleDeltaJson(JSON.stringify({
      raw: _0x37c4b2
    }))));
  }
  function _0x41f6fe(_0x474b82, _0x58fe05, _0x5bbe28, _0x27e1ed = {}) {
    let _0x1cf4c9 = _0x55cd09(_0x474b82);
    let _0x360fab = [];
    if (!_0x58fe05) {
      return {
        bible: _0x1cf4c9,
        conflicts: _0x360fab
      };
    }
    let _0x19217a = _0x27e1ed.speakers || [];
    let _0x5757c6 = false;
    for (let _0x501e18 of _0x58fe05.entities || []) {
      if (!_0x501e18 || !_0x501e18.src || !_0x501e18.tgt) {
        continue;
      }
      let _0x5db8c0 = String(_0x501e18.src).toLowerCase();
      let _0xaa5dbe = _0x1cf4c9.entities.find(_0x16af93 => String(_0x16af93.src).toLowerCase() === _0x5db8c0);
      if (!_0xaa5dbe) {
        _0x5757c6 = true;
        _0x1cf4c9.entities.push({
          id: _0x501e18.id || "e:" + _0x501e18.src,
          src: String(_0x501e18.src),
          tgt: String(_0x501e18.tgt),
          aliases: Array.isArray(_0x501e18.aliases) ? _0x501e18.aliases : [],
          type: _0x501e18.type || "term",
          gender: _0x501e18.gender || null,
          confidence: _0x501e18.confidence ?? 0.6,
          locked: false,
          sceneIndex: _0x5bbe28,
          evidence: Array.isArray(_0x501e18.evidence) ? _0x501e18.evidence : []
        });
      } else if (!_0xaa5dbe.locked && _0xaa5dbe.tgt !== String(_0x501e18.tgt)) {
        let _0x186730 = _0x501e18.confidence ?? 0.6;
        if (_0x186730 > (_0xaa5dbe.confidence || 0)) {
          _0x5757c6 = true;
          _0x360fab.push({
            src: _0x501e18.src,
            kept: _0x501e18.tgt,
            rejected: _0xaa5dbe.tgt,
            sceneIndex: _0x5bbe28
          });
          _0xaa5dbe.tgt = String(_0x501e18.tgt);
          _0xaa5dbe.confidence = _0x186730;
        } else {
          _0x360fab.push({
            src: _0x501e18.src,
            kept: _0xaa5dbe.tgt,
            rejected: _0x501e18.tgt,
            sceneIndex: _0x5bbe28
          });
        }
      }
    }
    for (let _0x27389b of _0x58fe05.relationships || []) {
      let _0x290c98 = _0x27389b && (_0x27389b.speakerId || _0x27389b.speaker);
      let _0x51c834 = _0x27389b && (_0x27389b.listenerId || _0x27389b.listener);
      if (!_0x290c98 || !_0x51c834) {
        continue;
      }
      let _0x3005b2 = _0x27389b.selfPronoun || null;
      let _0x59926f = _0x27389b.addressTerm || null;
      let _0x3cfdac = _0x27389b.confidence ?? 0.6;
      let _0x40b2c3 = Array.isArray(_0x27389b.evidenceUnitIds) ? _0x27389b.evidenceUnitIds : Array.isArray(_0x27389b.evidence) ? _0x27389b.evidence : [];
      let _0x47fbf3 = _0x557461({
        speakerId: _0x290c98,
        listenerId: _0x51c834,
        selfPronoun: _0x3005b2,
        addressTerm: _0x59926f
      }, _0x1cf4c9.entities, _0x19217a);
      if (_0x47fbf3) {
        _0x360fab.push({
          type: "relationship_gender_mismatch",
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          rejected: _0x3005b2 + "/" + _0x59926f,
          reason: _0x47fbf3,
          sceneIndex: _0x5bbe28
        });
        continue;
      }
      let _0x1fb6e1 = _0x45a84f(_0x1cf4c9, _0x290c98, _0x51c834, _0x5bbe28);
      if (!_0x1fb6e1) {
        _0x5757c6 = true;
        _0x1cf4c9.relationships.push({
          id: _0x3edf40(_0x1cf4c9),
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          fromScene: _0x5bbe28,
          toScene: null,
          selfPronoun: _0x3005b2,
          addressTerm: _0x59926f,
          relation: _0x27389b.relation || null,
          register: _0x27389b.register || null,
          confidence: _0x3cfdac,
          evidenceUnitIds: _0x40b2c3,
          locked: false
        });
        continue;
      }
      if ((_0x1fb6e1.selfPronoun || null) === _0x3005b2 && (_0x1fb6e1.addressTerm || null) === _0x59926f) {
        if (_0x40b2c3.length) {
          _0x1fb6e1.evidenceUnitIds = [...new Set([...(_0x1fb6e1.evidenceUnitIds || []), ..._0x40b2c3])];
          _0x5757c6 = true;
        }
        if (_0x3cfdac > (_0x1fb6e1.confidence || 0)) {
          _0x1fb6e1.confidence = _0x3cfdac;
          _0x5757c6 = true;
        }
        continue;
      }
      if (_0x1fb6e1.locked) {
        _0x360fab.push({
          type: "relationship_locked",
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          kept: _0x1fb6e1.selfPronoun + "/" + _0x1fb6e1.addressTerm,
          rejected: _0x3005b2 + "/" + _0x59926f,
          sceneIndex: _0x5bbe28
        });
        continue;
      }
      if (_0x5bbe28 > (_0x1fb6e1.fromScene ?? 0)) {
        _0x5757c6 = true;
        _0x1fb6e1.toScene = _0x5bbe28 - 1;
        let _0x4ac37c = {
          id: _0x3edf40(_0x1cf4c9),
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          fromScene: _0x5bbe28,
          toScene: null,
          selfPronoun: _0x3005b2,
          addressTerm: _0x59926f,
          relation: _0x27389b.relation || null,
          register: _0x27389b.register || null,
          confidence: _0x3cfdac,
          evidenceUnitIds: _0x40b2c3,
          locked: false
        };
        _0x1cf4c9.relationships.push(_0x4ac37c);
        _0x360fab.push({
          type: "relation_transition",
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          from: _0x1fb6e1.selfPronoun + "/" + _0x1fb6e1.addressTerm,
          to: _0x3005b2 + "/" + _0x59926f,
          sceneIndex: _0x5bbe28,
          decisionId: _0x4ac37c.id,
          closedDecisionId: _0x1fb6e1.id
        });
      } else if (_0x3cfdac > (_0x1fb6e1.confidence || 0)) {
        _0x5757c6 = true;
        _0x360fab.push({
          type: "relationship_conflict",
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          kept: _0x3005b2 + "/" + _0x59926f,
          rejected: _0x1fb6e1.selfPronoun + "/" + _0x1fb6e1.addressTerm,
          sceneIndex: _0x5bbe28
        });
        _0x1fb6e1.selfPronoun = _0x3005b2;
        _0x1fb6e1.addressTerm = _0x59926f;
        _0x1fb6e1.confidence = _0x3cfdac;
        if (_0x40b2c3.length) {
          _0x1fb6e1.evidenceUnitIds = [...new Set([...(_0x1fb6e1.evidenceUnitIds || []), ..._0x40b2c3])];
        }
      } else {
        _0x360fab.push({
          type: "relationship_conflict",
          speakerId: _0x290c98,
          listenerId: _0x51c834,
          kept: _0x1fb6e1.selfPronoun + "/" + _0x1fb6e1.addressTerm,
          rejected: _0x3005b2 + "/" + _0x59926f,
          sceneIndex: _0x5bbe28
        });
      }
    }
    if (_0x5757c6) {
      _0x1cf4c9.rev = (_0x1cf4c9.rev || 0) + 1;
    }
    return {
      bible: _0x1cf4c9,
      conflicts: _0x360fab
    };
  }
  function _0x144045(_0x16ef94, _0x340954, _0x23d427, _0x3083be = null) {
    let _0x1bec97 = _0x55cd09(_0x16ef94);
    let _0x21eddb = (_0x340954 || []).map(_0x2b532e => _0x2b532e.text || "").join("\n").toLowerCase();
    let _0x3fe6af = _0x1bec97.entities.filter(_0x318d16 => _0x318d16.src && _0x21eddb.includes(String(_0x318d16.src).toLowerCase())).slice(0, 40);
    let _0x3f4139 = new Set((_0x340954 || []).map(_0x1259dd => _0x1259dd.speakerId).filter(Boolean));
    let _0x39a583 = _0x4217ea => _0x3083be == null ? _0x4217ea.toScene == null : (_0x4217ea.fromScene ?? 0) <= _0x3083be && (_0x4217ea.toScene == null || _0x4217ea.toScene >= _0x3083be);
    let _0x5694b4 = _0x1bec97.relationships.filter(_0x52afc1 => _0x39a583(_0x52afc1) && (_0x3f4139.size === 0 || _0x3f4139.has(_0x52afc1.speakerId) || _0x3f4139.has(_0x52afc1.listenerId)) && (_0x52afc1.locked || !_0x557461(_0x52afc1, _0x1bec97.entities, _0x23d427))).slice(0, _0x3f4139.size === 0 ? 10 : 20);
    let _0x3389a4 = (_0x23d427 || []).filter(_0x27a79d => _0x3f4139.has(_0x27a79d.id)).map(_0x53ccd8 => _0x53ccd8.id + "=" + _0x53ccd8.name + (_0x53ccd8.gender ? "(" + _0x53ccd8.gender + ")" : ""));
    let _0xd51aaa = [];
    if (_0x3389a4.length) {
      _0xd51aaa.push("Nhân vật: " + _0x3389a4.join("; "));
    }
    if (_0x3fe6af.length) {
      _0xd51aaa.push("Tên/thuật ngữ (giữ nhất quán): " + _0x3fe6af.map(_0x4559f7 => _0x4559f7.src + "=" + _0x4559f7.tgt + (_0x4559f7.gender ? "(" + _0x4559f7.gender + ")" : "")).join("; "));
    }
    if (_0x5694b4.length) {
      _0xd51aaa.push("Xưng hô theo CHIỀU nói→nghe (chỉ áp dụng khi đúng người nói và người nghe đó): " + _0x5694b4.map(_0x6a1cd5 => "khi " + _0x6a1cd5.speakerId + " nói với " + _0x6a1cd5.listenerId + " thì " + _0x6a1cd5.speakerId + " tự xưng '" + (_0x6a1cd5.selfPronoun || "?") + "' và gọi " + _0x6a1cd5.listenerId + " là '" + (_0x6a1cd5.addressTerm || "?") + "'" + (_0x6a1cd5.locked ? " (đã khóa)" : "")).join("; "));
    }
    return _0x2d3cc4.shadowCompare("bibleContextForChunk", _0xd51aaa.join("\n"), _0x3ef969 => JSON.parse(_0x3ef969.bibleContextForChunkJson(JSON.stringify({
      bible: _0x16ef94,
      chunk: _0x340954,
      speakers: _0x23d427,
      sceneIndex: _0x3083be
    }))));
  }
  _0x33037a.exports = {
    emptyBible: _0x3f1868,
    normalizeBible: _0x55cd09,
    seedFromGlossary: _0x834d37,
    parseBibleDelta: _0x1ad8be,
    mergeBibleDelta: _0x41f6fe,
    bibleContextForChunk: _0x144045,
    activeRelationAt: _0x45a84f,
    relationshipGenderIssue: _0x557461
  };
});
var Gr = Z((_0x173139, _0x5613fe) => {
  var {
    activeRelationAt: _0x538711
  } = Un();
  var _0x32e904 = je();
  var _0x14af76 = ["大家", "各位", "同志们", "兄弟们", "诸位", "mọi người", "các bạn", "cả nhà", "everyone", "everybody", "you all", "y'all", "여러분", "みんな", "皆さん", "ทุกคน"];
  function _0x33404f(_0x3b8ac9) {
    if (!_0x3b8ac9) {
      return false;
    }
    let _0x5ef655 = _0x3b8ac9.codePointAt(0);
    return _0x5ef655 >= 65 && _0x5ef655 <= 90 || _0x5ef655 >= 97 && _0x5ef655 <= 122 || _0x5ef655 >= 192 && _0x5ef655 <= 591 || _0x5ef655 >= 7680 && _0x5ef655 <= 7935;
  }
  function _0x23bb2f(_0x44684a) {
    for (let _0x1478fb of _0x44684a) {
      let _0x4e2015 = _0x1478fb.codePointAt(0);
      if (_0x4e2015 >= 11904 && _0x4e2015 <= 40959 || _0x4e2015 >= 12352 && _0x4e2015 <= 12543 || _0x4e2015 >= 44032 && _0x4e2015 <= 55215 || _0x4e2015 >= 3584 && _0x4e2015 <= 3711) {
        return true;
      }
    }
    return false;
  }
  function _0x37f6bb(_0x266631, _0x203d74) {
    if (!_0x203d74) {
      return false;
    }
    if (_0x23bb2f(_0x203d74)) {
      return _0x266631.includes(_0x203d74);
    }
    let _0x19cc0a = 0;
    while (true) {
      let _0x1f14f6 = _0x266631.indexOf(_0x203d74, _0x19cc0a);
      if (_0x1f14f6 < 0) {
        return false;
      }
      let _0x2c01c2 = _0x1f14f6 > 0 ? _0x266631[_0x1f14f6 - 1] : "";
      let _0x53803e = _0x1f14f6 + _0x203d74.length < _0x266631.length ? _0x266631[_0x1f14f6 + _0x203d74.length] : "";
      if (!_0x33404f(_0x2c01c2) && !_0x33404f(_0x53803e)) {
        return true;
      }
      _0x19cc0a = _0x1f14f6 + 1;
    }
  }
  function _0x1b0232(_0x8f1c94, _0x37537b) {
    let _0x97083d = new Map();
    let _0x3e90dd = _0x37537b && _0x37537b.entities || [];
    for (let _0xfc5a6c of _0x8f1c94 || []) {
      if (!_0xfc5a6c || !_0xfc5a6c.id) {
        continue;
      }
      let _0x310bc9 = new Set();
      if (_0xfc5a6c.name) {
        _0x310bc9.add(String(_0xfc5a6c.name).toLowerCase());
      }
      for (let _0x37dde8 of _0x3e90dd) {
        if (!!_0x37dde8 && !!_0x37dde8.tgt && !!_0xfc5a6c.name && String(_0x37dde8.tgt).toLowerCase() === String(_0xfc5a6c.name).toLowerCase()) {
          if (_0x37dde8.src) {
            _0x310bc9.add(String(_0x37dde8.src).toLowerCase());
          }
          for (let _0x1ff848 of _0x37dde8.aliases || []) {
            _0x310bc9.add(String(_0x1ff848).toLowerCase());
          }
        }
      }
      _0x97083d.set(_0xfc5a6c.id, [..._0x310bc9].filter(_0x5a5c40 => _0x5a5c40.length >= 2));
    }
    return _0x97083d;
  }
  function _0x51d395(_0x2c1ba1, _0x278363, _0x227464, _0x1a2050) {
    let _0xff45b1 = String(_0x2c1ba1 || "").toLowerCase();
    if (!_0xff45b1) {
      return null;
    }
    for (let _0x4260e0 of _0x14af76) {
      if (_0x37f6bb(_0xff45b1, _0x4260e0)) {
        return {
          listenerId: "group",
          confidence: 0.85,
          evidence: "vocative:" + _0x4260e0
        };
      }
    }
    for (let _0x1cd9e3 of _0x278363) {
      if (_0x1cd9e3 !== _0x1a2050) {
        for (let _0x314680 of _0x227464.get(_0x1cd9e3) || []) {
          if (_0x37f6bb(_0xff45b1, _0x314680)) {
            return {
              listenerId: _0x1cd9e3,
              confidence: 0.9,
              evidence: "vocative:" + _0x314680
            };
          }
        }
      }
    }
    return null;
  }
  function _0x34beaa(_0x49b83f, {
    sceneIdxByPos: _0x20a106,
    bible: _0x26b4f2 = null,
    speakers: _0x43d729 = []
  } = {}) {
    let _0x26ff4f = new Map();
    let _0x4e5ca4 = _0x49b83f || [];
    let _0x43b82a = _0x1b0232(_0x43d729, _0x26b4f2);
    let _0x24c8ca = new Map();
    _0x4e5ca4.forEach((_0x3df913, _0x399fa7) => {
      let _0xdc60c7 = _0x20a106 && _0x20a106[_0x399fa7] || 0;
      if (!_0x24c8ca.has(_0xdc60c7)) {
        _0x24c8ca.set(_0xdc60c7, []);
      }
      _0x24c8ca.get(_0xdc60c7).push(_0x399fa7);
    });
    for (let [_0x4d31f8, _0x37cc9e] of _0x24c8ca) {
      let _0x5576d0 = [...new Set(_0x37cc9e.map(_0x20b115 => _0x4e5ca4[_0x20b115].speakerId).filter(Boolean))];
      for (let _0x5e4ac0 = 0; _0x5e4ac0 < _0x37cc9e.length; _0x5e4ac0++) {
        let _0x574c03 = _0x37cc9e[_0x5e4ac0];
        let _0x5f4164 = _0x4e5ca4[_0x574c03];
        let _0x157446 = _0x5f4164.speakerId || null;
        if (!_0x157446) {
          _0x26ff4f.set(_0x5f4164.id, {
            listenerId: null,
            confidence: 0,
            evidence: "no_speaker"
          });
          continue;
        }
        let _0x1d19fb = _0x5576d0.filter(_0x370055 => _0x370055 !== _0x157446);
        let _0x146dc9 = (_0x26b4f2 && _0x26b4f2.relationships || []).filter(_0x5812f8 => _0x5812f8.locked && _0x5812f8.speakerId === _0x157446 && (_0x5812f8.fromScene ?? 0) <= _0x4d31f8 && (_0x5812f8.toScene == null || _0x5812f8.toScene >= _0x4d31f8) && (_0x1d19fb.length === 0 || _0x1d19fb.includes(_0x5812f8.listenerId)));
        if (_0x146dc9.length === 1) {
          _0x26ff4f.set(_0x5f4164.id, {
            listenerId: _0x146dc9[0].listenerId,
            confidence: 1,
            evidence: "user_lock",
            decisionId: _0x146dc9[0].id
          });
          continue;
        }
        let _0xc44124 = _0x51d395(_0x5f4164.text, _0x5576d0, _0x43b82a, _0x157446);
        if (_0xc44124) {
          let _0x36338d = _0xc44124.listenerId !== "group" ? _0x538711(_0x26b4f2, _0x157446, _0xc44124.listenerId, _0x4d31f8) : null;
          _0x26ff4f.set(_0x5f4164.id, {
            ..._0xc44124,
            decisionId: _0x36338d ? _0x36338d.id : undefined
          });
          continue;
        }
        if (_0x1d19fb.length === 1) {
          let _0x20c340 = _0x538711(_0x26b4f2, _0x157446, _0x1d19fb[0], _0x4d31f8);
          _0x26ff4f.set(_0x5f4164.id, {
            listenerId: _0x1d19fb[0],
            confidence: _0x20c340 ? 0.85 : 0.8,
            evidence: _0x20c340 ? "two_party_scene+relation" : "two_party_scene",
            decisionId: _0x20c340 ? _0x20c340.id : undefined
          });
          continue;
        }
        if (_0x1d19fb.length > 1) {
          let _0x30ddbc = null;
          for (let _0x3f4db5 = _0x5e4ac0 - 1; _0x3f4db5 >= 0; _0x3f4db5--) {
            let _0x5816fe = _0x4e5ca4[_0x37cc9e[_0x3f4db5]];
            if (_0x5816fe.speakerId && !_0x5816fe.speakerMixed && _0x5816fe.speakerId !== _0x157446) {
              _0x30ddbc = _0x5816fe.speakerId;
              break;
            }
          }
          if (!_0x30ddbc) {
            for (let _0x46db1a = _0x5e4ac0 + 1; _0x46db1a < _0x37cc9e.length; _0x46db1a++) {
              let _0x28a55b = _0x4e5ca4[_0x37cc9e[_0x46db1a]];
              if (_0x28a55b.speakerId && !_0x28a55b.speakerMixed && _0x28a55b.speakerId !== _0x157446) {
                _0x30ddbc = _0x28a55b.speakerId;
                break;
              }
            }
          }
          if (_0x30ddbc) {
            let _0x57f690 = _0x538711(_0x26b4f2, _0x157446, _0x30ddbc, _0x4d31f8);
            _0x26ff4f.set(_0x5f4164.id, {
              listenerId: _0x30ddbc,
              confidence: 0.5,
              evidence: "turn_adjacency",
              decisionId: _0x57f690 ? _0x57f690.id : undefined
            });
            continue;
          }
        }
        _0x26ff4f.set(_0x5f4164.id, {
          listenerId: null,
          confidence: 0,
          evidence: "unresolved"
        });
      }
    }
    if (_0x32e904.shadowEnabled()) {
      _0x32e904.shadowCompare("resolveListeners", Object.fromEntries(_0x26ff4f), _0x570bab => JSON.parse(_0x570bab.resolveListenersJson(JSON.stringify({
        segments: _0x49b83f || [],
        sceneIdxByPos: _0x20a106,
        bible: _0x26b4f2,
        speakers: _0x43d729
      }))));
    }
    return _0x26ff4f;
  }
  _0x5613fe.exports = {
    resolveListeners: _0x34beaa,
    buildNameIndex: _0x1b0232,
    GROUP_VOCATIVES: _0x14af76
  };
});
var Br = Z((_0x23c620, _0x2ab3a3) => {
  var {
    langName: _0x891bab
  } = Yt();
  var _0x4b98ca = 12;
  var _0x5c0083 = 14000;
  var _0x428565 = 400;
  function _0x653285(_0x28895e, _0x2076b0, _0x5f43be) {
    let _0x1fa754 = [];
    if (_0x5f43be <= 0 || _0x2076b0 <= _0x28895e) {
      return _0x1fa754;
    }
    let _0xa78549 = _0x2076b0 - _0x28895e;
    for (let _0x173536 = 0; _0x173536 < _0x5f43be; _0x173536++) {
      _0x1fa754.push(_0x28895e + Math.min(_0xa78549 - 1, Math.round(_0x173536 * _0xa78549 / _0x5f43be)));
    }
    return [...new Set(_0x1fa754)];
  }
  function _0x9fdd2f(_0x3dcaa5) {
    let _0x1b7d6e = (_0x3dcaa5 || []).map((_0x5d521c, _0x2c72f6) => ({
      n: _0x2c72f6 + 1,
      text: String(_0x5d521c && _0x5d521c.text || "").replace(/\s+/g, " ").trim(),
      label: _0x5d521c && (_0x5d521c.speakerLabel || _0x5d521c.speakerId) || null
    })).filter(_0x4d87fb => _0x4d87fb.text);
    let _0x378e27 = _0x1b7d6e.reduce((_0xc6a99, _0x273c96) => _0xc6a99 + _0x273c96.text.length, 0);
    if (_0x1b7d6e.length <= _0x428565 && _0x378e27 <= _0x5c0083) {
      return {
        lines: _0x1b7d6e,
        sampled: false
      };
    }
    let _0xbcd7db = Math.max(1, _0x378e27 / _0x1b7d6e.length);
    let _0x1d28cc = Math.max(60, Math.min(_0x428565, Math.floor(_0x5c0083 / _0xbcd7db)));
    let _0xaf2172 = Math.floor(_0x1d28cc * 0.5);
    let _0x518eef = Math.floor(_0x1d28cc * 0.2);
    let _0x515fdd = _0x1d28cc - _0xaf2172 - _0x518eef;
    let _0x1237e1 = new Set();
    for (let _0x1702e5 = 0; _0x1702e5 < Math.min(_0xaf2172, _0x1b7d6e.length); _0x1702e5++) {
      _0x1237e1.add(_0x1702e5);
    }
    for (let _0x42fe1c of _0x653285(_0xaf2172, Math.max(_0xaf2172, _0x1b7d6e.length - _0x518eef), _0x515fdd)) {
      _0x1237e1.add(_0x42fe1c);
    }
    for (let _0x12d3ca = Math.max(0, _0x1b7d6e.length - _0x518eef); _0x12d3ca < _0x1b7d6e.length; _0x12d3ca++) {
      _0x1237e1.add(_0x12d3ca);
    }
    return {
      lines: [..._0x1237e1].sort((_0x20c85c, _0x263384) => _0x20c85c - _0x263384).map(_0x695f9 => _0x1b7d6e[_0x695f9]),
      sampled: true
    };
  }
  function _0x4c0c74(_0x419b33, {
    targetLang: _0xf6febe,
    source: _0x5b6278,
    speakers: _0x93fef = []
  } = {}) {
    let _0x2bf263 = _0xf6febe === "vi";
    let _0x298606 = _0x891bab(_0xf6febe);
    let {
      lines: _0xa5a722,
      sampled: _0x5491f4
    } = _0x9fdd2f(_0x419b33);
    let _0x34c21f = _0xa5a722.some(_0x126345 => _0x126345.label);
    let _0x259889 = (_0x93fef || []).filter(_0x66fad1 => _0x66fad1 && _0x66fad1.id).map(_0x58d4c0 => _0x58d4c0.id + "=" + (_0x58d4c0.name || "?") + (_0x58d4c0.gender ? "(" + _0x58d4c0.gender + ")" : "")).join("; ");
    let _0x31fafc = _0x2bf263 ? "Bạn là trợ lý phân tích phim cho dịch giả phụ đề. Đọc phụ đề bên dưới và lập HỒ SƠ PHIM để giữ nhất quán tên + xưng hô khi dịch sang " + _0x298606 + ".\nTrả về DUY NHẤT một dòng: [CAST] {\"setting\":\"hiện đại|cổ trang|kiếm hiệp|đời thường|...\",\"summary\":\"1-2 câu: bối cảnh + ai là ai với ai\",\"entities\":[{\"src\":\"tên/vai trong ngôn ngữ gốc\",\"tgt\":\"tên/vai theo tiếng " + _0x298606 + "\",\"gender\":\"nam|nữ|?\",\"aliases\":[\"cách gọi khác\"]}],\"relationships\":[{\"speaker\":\"...\",\"listener\":\"...\",\"selfPronoun\":\"...\",\"addressTerm\":\"...\",\"relation\":\"vợ-chồng|mẹ-con|chủ quán-khách|...\",\"confidence\":0.9,\"evidence\":[3,15]}]}\nKHÔNG markdown, KHÔNG giải thích.\nQUY TẮC:\n- Liệt kê CẢ nhân vật KHÔNG CÓ TÊN theo vai (ví dụ 'chủ quán', 'khách nữ', 'người kể chuyện') — vai cũng là một entity.\n- gender: SUY TỪ BẰNG CHỨNG (cách tự xưng, được người khác gọi là gì, nội dung nói); không đủ bằng chứng → \"?\" , TUYỆT ĐỐI KHÔNG đoán bừa.\n" + (_0x34c21f ? "- Dòng có nhãn [spk_N→...] : dùng CHÍNH id spk_N làm speaker/listener trong relationships.\n" : "- speaker/listener phải trùng đúng src hoặc tgt của một entity đã liệt kê.\n") + "- selfPronoun = từ người nói TỰ XƯNG về mình; addressTerm = từ người nói GỌI người nghe. TUYỆT ĐỐI KHÔNG đảo 2 trường. Mỗi CHIỀU nói→nghe một mục riêng.\n- Xưng hô phải ĐÚNG GIỚI TÍNH và ĐÚNG QUAN HỆ: nhân vật nữ không bao giờ bị gọi 'anh/ông/chú', nhân vật nam không bao giờ bị gọi 'chị/cô/bà'. Hai người lạ ngang tuổi → 'tôi/chị/em', không tự động 'chú-cháu'.\n- evidence = số dòng trong phụ đề làm bằng chứng. Chỉ ghi những gì CÓ bằng chứng." : "You analyze a film transcript for a subtitle translator. Read the subtitles below and build a PROJECT BIBLE for consistent names + forms of address in " + _0x298606 + ".\nReturn EXACTLY one line: [CAST] {\"setting\":\"modern|period|wuxia|slice-of-life|...\",\"summary\":\"1-2 sentences: setting + who is who to whom\",\"entities\":[{\"src\":\"name/role in the source language\",\"tgt\":\"name/role in " + _0x298606 + "\",\"gender\":\"nam|nữ|?\",\"aliases\":[...]}],\"relationships\":[{\"speaker\":\"...\",\"listener\":\"...\",\"selfPronoun\":\"...\",\"addressTerm\":\"...\",\"relation\":\"...\",\"confidence\":0.9,\"evidence\":[3,15]}]}\nNo markdown, no explanation.\nRULES:\n- List UNNAMED characters too, by role ('shop owner', 'female customer', 'narrator') — a role is an entity.\n- gender: infer from EVIDENCE only (self-reference, how others address them); not enough evidence → \"?\", never guess.\n" + (_0x34c21f ? "- Lines tagged [spk_N→...]: use that exact spk_N id as speaker/listener.\n" : "- speaker/listener must match the src or tgt of a listed entity.\n") + "- selfPronoun = what the SPEAKER calls THEMSELF; addressTerm = what the speaker CALLS THE LISTENER. Never swap them. One entry per speaking DIRECTION.\n- Address forms must match GENDER and RELATION. evidence = subtitle line numbers. Only record what the lines support.";
    let _0x4cd539 = _0x2bf263 ? "Phụ đề" + (_0x5491f4 ? " (đã lấy mẫu, số dòng là vị trí thật trong phim)" : "") + (_0x5b6278 && _0x5b6278 !== "auto" ? " — ngôn ngữ gốc: " + _0x891bab(_0x5b6278) : "") + ":" : "Subtitles" + (_0x5491f4 ? " (sampled; numbers are real film positions)" : "") + (_0x5b6278 && _0x5b6278 !== "auto" ? " — source language: " + _0x891bab(_0x5b6278) : "") + ":";
    let _0xced21 = "" + (_0x259889 ? _0x2bf263 ? "Nhân vật đã nhận diện giọng: " + _0x259889 + "\n" : "Diarized speakers: " + _0x259889 + "\n" : "") + _0x4cd539 + "\n" + _0xa5a722.map(_0x2e6a7d => _0x2e6a7d.n + "|" + (_0x2e6a7d.label ? "[" + _0x2e6a7d.label + "] " : "") + _0x2e6a7d.text).join("\n");
    return {
      system: _0x31fafc,
      user: _0xced21,
      sampled: _0x5491f4,
      lineCount: _0xa5a722.length
    };
  }
  function _0x1025ee(_0x3c0be2) {
    if (!_0x3c0be2) {
      return null;
    }
    let _0x3e06a3 = _0x3c0be2.indexOf("[CAST]");
    if (_0x3e06a3 === -1) {
      return null;
    }
    let _0x4394c4 = _0x3c0be2.slice(_0x3e06a3 + 6);
    let _0x410e90 = _0x4394c4.indexOf("{");
    if (_0x410e90 === -1) {
      return null;
    }
    let _0x360ec2 = 0;
    let _0x748470 = -1;
    for (let _0x1b93ee = _0x410e90; _0x1b93ee < _0x4394c4.length; _0x1b93ee++) {
      if (_0x4394c4[_0x1b93ee] === "{") {
        _0x360ec2++;
      } else if (_0x4394c4[_0x1b93ee] === "}" && (_0x360ec2--, _0x360ec2 === 0)) {
        _0x748470 = _0x1b93ee;
        break;
      }
    }
    if (_0x748470 === -1) {
      return null;
    }
    let _0x4300cd;
    try {
      _0x4300cd = JSON.parse(_0x4394c4.slice(_0x410e90, _0x748470 + 1));
    } catch {
      return null;
    }
    let _0x10e8a0 = _0x38d613 => {
      let _0x154bde = String(_0x38d613 || "").trim().toLowerCase();
      if (["nam", "male", "m"].includes(_0x154bde)) {
        return "nam";
      } else if (["nữ", "nu", "female", "f"].includes(_0x154bde)) {
        return "nữ";
      } else {
        return null;
      }
    };
    let _0x3dfdc1 = (Array.isArray(_0x4300cd.entities) ? _0x4300cd.entities : []).filter(_0x3b9370 => _0x3b9370 && _0x3b9370.src && _0x3b9370.tgt).map(_0x5dc667 => ({
      src: String(_0x5dc667.src),
      tgt: String(_0x5dc667.tgt),
      aliases: Array.isArray(_0x5dc667.aliases) ? _0x5dc667.aliases.map(String) : [],
      type: "character",
      gender: _0x10e8a0(_0x5dc667.gender),
      confidence: 0.7,
      evidence: []
    }));
    let _0xfd3a56 = (Array.isArray(_0x4300cd.relationships) ? _0x4300cd.relationships : []).filter(_0x508413 => _0x508413 && (_0x508413.speaker || _0x508413.speakerId) && (_0x508413.listener || _0x508413.listenerId)).map(_0x74cca2 => ({
      speaker: String(_0x74cca2.speaker || _0x74cca2.speakerId),
      listener: String(_0x74cca2.listener || _0x74cca2.listenerId),
      selfPronoun: _0x74cca2.selfPronoun != null ? String(_0x74cca2.selfPronoun) : null,
      addressTerm: _0x74cca2.addressTerm != null ? String(_0x74cca2.addressTerm) : null,
      relation: _0x74cca2.relation != null ? String(_0x74cca2.relation) : null,
      confidence: Number.isFinite(_0x74cca2.confidence) ? _0x74cca2.confidence : 0.7,
      evidence: Array.isArray(_0x74cca2.evidence) ? _0x74cca2.evidence : []
    }));
    if (!_0x3dfdc1.length && !_0xfd3a56.length) {
      return null;
    } else {
      return {
        entities: _0x3dfdc1,
        relationships: _0xfd3a56,
        setting: _0x4300cd.setting != null ? String(_0x4300cd.setting) : null,
        summary: _0x4300cd.summary != null ? String(_0x4300cd.summary) : null
      };
    }
  }
  _0x2ab3a3.exports = {
    CAST_MIN_LINES: _0x4b98ca,
    sampleTranscript: _0x9fdd2f,
    buildCastPrompt: _0x4c0c74,
    parseCastAnalysis: _0x1025ee
  };
});
var Kn = Z((_0x3b7947, _0x315316) => {
  var _0x5063a0 = require("axios");
  var _0x2198d9 = require("crypto");
  var _0x865587 = je();
  var _0x34bd73 = 120000;
  var {
    extractMemory: _0x2202e9,
    cjkRatio: _0x7d7145,
    buildSystemPrompt: _0x4108fa,
    buildUserText: _0x14ece5,
    buildUserTextWithContext: _0x3ded6a,
    buildCondensePrompt: _0x45b477,
    buildPolishPrompt: _0x51ba5e,
    buildGlossaryBlock: _0x936c4d,
    parseIdPipeResponse: _0x4c6a1c,
    mergeTranslated: _0x424592,
    viSyllablesSpoken: _0x3bc174
  } = Pt();
  var {
    semanticAnchorIssues: _0x54878f
  } = cr();
  var {
    getPresetTemplate: _0x3a1144
  } = mr();
  var {
    chunkByRun: _0x4a908c
  } = Ln();
  var {
    langName: _0x48331c,
    langCodeOf: _0x5557d6
  } = Yt();
  var {
    detectSourceLang: _0x3f4366
  } = Nr();
  var {
    chunkTokenAware: _0x3f3552
  } = Ln();
  var {
    sceneSplit: _0x26e669,
    sceneIndexByStart: _0x2a41b9
  } = St();
  var {
    DEFAULT_POLICY: _0x36f001
  } = ht();
  var {
    baseSylPerSec: _0x49e406,
    RATE_CEILING: _0x323731
  } = Gn();
  var {
    normalizeBible: _0x44423b,
    seedFromGlossary: _0x255f83,
    parseBibleDelta: _0x4192b2,
    mergeBibleDelta: _0x5cca4f,
    bibleContextForChunk: _0x5a6912
  } = Un();
  var {
    resolveListeners: _0x53c02a
  } = Gr();
  var {
    CAST_MIN_LINES: _0x2903d9,
    buildCastPrompt: _0x42166c,
    parseCastAnalysis: _0x586f1b
  } = Br();
  var _0x4cf150 = 30;
  var _0x5eadf8 = _0x49e406() * _0x323731;
  var _0x2b985c = 0.95;
  var _0x28259f = 0.85;
  var _0x3acf2a = 0.7;
  var _0x5e322c = 0.65;
  var _0x50e888 = 0.5;
  function _0xba68ed(_0x2ad8ab) {
    let _0x1b2a85 = String(_0x2ad8ab || "").trim();
    if (_0x1b2a85.replace(/\|\|/g, "").includes("|")) {
      return "";
    } else {
      return _0x1b2a85;
    }
  }
  var _0x1672e8 = 15;
  var _0x45c14c = 3;
  var _0xb5b1c8 = _0x36f001.residualTempoCap;
  var _0x16fee5 = 200;
  var _0x2743e3 = 400;
  var _0x107a1e = 1000;
  var _0x2dc7a9 = 2;
  function _0xb50a30(_0x57faf6) {
    if (!_0x57faf6 || _0x57faf6 === 408 || _0x57faf6 === 429) {
      return false;
    } else {
      return _0x57faf6 >= 400 && _0x57faf6 < 500;
    }
  }
  function _0x5da0bd(_0x5a08bd, _0xd84e46) {
    let _0x101941 = _0x5a08bd && _0x5a08bd.data && Array.isArray(_0x5a08bd.data.choices) ? _0x5a08bd.data.choices[0] : null;
    if (!_0x101941 || !_0x101941.message || typeof _0x101941.message.content != "string") {
      let _0x457b80 = JSON.stringify(_0x5a08bd && _0x5a08bd.data || null).slice(0, 200);
      let _0x2e1972 = new Error(_0xd84e46 + " trả HTTP 200 nhưng sai định dạng phản hồi (thiếu choices[0].message.content). Kiểm tra base URL/model. Nội dung: " + _0x457b80);
      _0x2e1972.permanent = true;
      throw _0x2e1972;
    }
    return _0x101941.message.content;
  }
  function _0x3fd96c(_0x237d27) {
    let _0x29fd5d = _0x237d27 && _0x237d27.response && _0x237d27.response.headers;
    let _0x4a9b17 = _0x29fd5d && (_0x29fd5d["retry-after"] || _0x29fd5d["Retry-After"]);
    if (!_0x4a9b17) {
      return null;
    }
    let _0x1b6207 = Number(_0x4a9b17);
    if (Number.isFinite(_0x1b6207)) {
      return Math.min(60000, Math.max(0, _0x1b6207 * 1000));
    }
    let _0x265258 = Date.parse(_0x4a9b17);
    if (Number.isFinite(_0x265258)) {
      return Math.min(60000, Math.max(0, _0x265258 - Date.now()));
    } else {
      return null;
    }
  }
  var {
    resolveProvider: _0x5e3a76
  } = Gt();
  function _0x17ce94(_0x5bbaf1, _0x155356) {
    if (/gemini-[3-9]/i.test(String(_0x155356 || ""))) {
      _0x5bbaf1.reasoning_effort = "minimal";
      return;
    }
    _0x5bbaf1.reasoning_effort = "none";
    _0x5bbaf1.google = {
      thinking_config: {
        thinking_budget: 0
      }
    };
  }
  function _0x2c7b1f(_0x5a60f7, _0x2499e4, _0x1b1064) {
    return _0x5e3a76(_0x5a60f7, _0x2499e4, _0x1b1064);
  }
  function _0x101d48(_0x20f891, _0x1f373f, _0x13b404) {
    let _0x59e706 = new Set(_0x13b404);
    let _0x520869 = new Map();
    for (let _0x4b66db of _0x13b404) {
      for (let _0x265aa9 of [_0x4b66db - 2, _0x4b66db - 1, _0x4b66db + 1]) {
        if (_0x265aa9 < 0 || _0x265aa9 >= _0x20f891.length || _0x59e706.has(_0x265aa9) || _0x520869.has(_0x265aa9)) {
          continue;
        }
        let _0x4f4d14 = _0x1f373f[_0x265aa9];
        if (!!_0x4f4d14 && _0x4f4d14 !== _0x20f891[_0x265aa9].text) {
          _0x520869.set(_0x265aa9, {
            ..._0x20f891[_0x265aa9],
            translation: _0x4f4d14,
            contextOnly: true
          });
        }
      }
    }
    let _0x2c7229 = [..._0x520869.entries()].sort((_0x489bbc, _0x2e6e1d) => _0x489bbc[0] - _0x2e6e1d[0]).map(([, _0xad8741]) => _0xad8741).slice(0, 8);
    return _0x865587.shadowCompare("buildRetryContext", _0x2c7229, _0x54975d => JSON.parse(_0x54975d.buildRetryContextJson(JSON.stringify({
      targets: _0x20f891,
      translated: _0x1f373f,
      missIdx: _0x13b404
    }))));
  }
  function _0x38cdea(_0x4cc251) {
    let _0x5f5b64 = !(_0x4cc251?.entities || []).length && !(_0x4cc251?.relationships || []).length;
    return _0x865587.shadowCompare("bibleIsEmpty", _0x5f5b64, _0x116cda => _0x116cda.bibleIsEmptyJson(JSON.stringify({
      bible: _0x4cc251 ?? null
    })));
  }
  var _0x5c57e2 = new Set([...".,!?;:'\"“”‘’…()[]{}-–—"]);
  function _0x1faf95(_0x135d55) {
    let _0x5744a7 = "";
    for (let _0x43d5e1 of _0x135d55.toLowerCase()) {
      _0x5744a7 += _0x5c57e2.has(_0x43d5e1) ? " " : _0x43d5e1;
    }
    return _0x5744a7.split(/\s+/).filter(Boolean);
  }
  var _0x360e49 = class {
    constructor(_0xefc465) {
      this.apiKey = _0xefc465;
    }
    _needsRetry(_0x106b4a, _0x3ee9ff, _0x3307c4, _0x2c9fc9) {
      let _0x4e36f0;
      let _0x17a299 = (_0x106b4a || "").trim();
      if (!_0x17a299) {
        _0x4e36f0 = false;
      } else if (!/[a-zA-ZÀ-ɏ]/.test(_0x17a299) && _0x7d7145(_0x17a299) < 0.05) {
        _0x4e36f0 = false;
      } else {
        let _0x5542a3 = (_0x3ee9ff || "").trim();
        if (!_0x5542a3) {
          _0x4e36f0 = true;
        } else if (_0x17a299 === _0x5542a3) {
          _0x4e36f0 = true;
        } else if (["auto", "zh", "ja", "ko", ""].includes(_0x3307c4)) {
          _0x4e36f0 = !["zh", "ja", "ko"].includes(_0x2c9fc9) && _0x7d7145(_0x5542a3) >= 0.05;
        } else if (_0x3307c4 !== _0x2c9fc9) {
          let _0x58a3a3 = _0x1faf95(_0x17a299);
          _0x4e36f0 = _0x58a3a3.length >= 4 && _0x58a3a3.join(" ") === _0x1faf95(_0x5542a3).join(" ");
        } else {
          _0x4e36f0 = false;
        }
      }
      return _0x865587.shadowCompare("needsRetry", _0x4e36f0, _0x5336e2 => _0x5336e2.needsRetryJson(JSON.stringify({
        orig: _0x106b4a,
        trans: _0x3ee9ff,
        source: _0x3307c4,
        target: _0x2c9fc9
      })));
    }
    _groqExtras(_0x44f650, _0x553a3a) {
      if (!_0x553a3a.groqVi || _0x44f650 !== "vi") {
        return {
          hint: ""
        };
      } else {
        return {
          hint: "★ HƯỚNG DẪN RIÊNG (Groq, target=vi): GIỮ ĐẦY ĐỦ ý + honorifics ('phu nhân', 'phu quân', 'tướng công', 'đại nhân', 'ngài', tên gọi). TRÁNH bóp cụt văn vẻ — diễn đạt tự nhiên, đủ ý. Cụ thể: '夫人' → 'Phu nhân' (không bỏ), '多谢夫人' → 'Cảm ơn phu nhân' (không cắt thành 'Cảm ơn')."
        };
      }
    }
    async translateChunk(_0x4f2a67, _0x7a8675) {
      let {
        targetLang: _0x42204f,
        preset: _0x2928e6,
        memory: _0x2e5f8d,
        http: _0x1fcd69,
        sleep: _0xd1a71f,
        model: _0xd75a12,
        source: _0x2dfbd2,
        provider: _0x10c05b,
        onStatus: _0x50abb7,
        glossary: _0xd2f4b9,
        promptOverrides: _0x2515b9
      } = _0x7a8675;
      if (!this.apiKey) {
        throw new Error("No " + _0x10c05b.name + " API key configured");
      }
      let _0x281a32 = _0x5557d6(_0x42204f);
      let _0x478493 = _0x48331c(_0x281a32);
      let _0x305631 = _0x3a1144(_0x2928e6, _0x2515b9, _0x281a32);
      let _0x29af2b = _0x4f2a67.filter(_0x2cb59b => !_0x2cb59b.contextOnly);
      let _0x1ff2da = _0x29af2b.length !== _0x4f2a67.length;
      let _0x39cb5c = _0x1ff2da ? _0x4f2a67.slice().sort((_0x19b8da, _0x4f62bd) => (Number(_0x19b8da.startTime) || 0) - (Number(_0x4f62bd.startTime) || 0)) : _0x4f2a67;
      let _0x567754 = _0x39cb5c.filter(_0x44b211 => !_0x44b211.contextOnly);
      let _0x111f55 = _0x567754.length;
      let _0x4faf81 = _0x567754.map(_0x443be => _0x443be.text);
      let _0x2e0d13 = _0x3eef6f => {
        if (!_0x1ff2da) {
          return _0x3eef6f;
        }
        let _0x509707 = new Map(_0x567754.map((_0x4378e8, _0x23c6d3) => [_0x4378e8.id, _0x3eef6f[_0x23c6d3]]));
        return _0x29af2b.map((_0x1becb7, _0x33ef8a) => _0x509707.has(_0x1becb7.id) ? _0x509707.get(_0x1becb7.id) : _0x3eef6f[_0x33ef8a]);
      };
      let _0x48a56e = _0x2dfbd2 === "auto" || !_0x2dfbd2 ? undefined : _0x2dfbd2;
      let _0x3c77f8 = _0x567754.some(_0x56d85f => _0x56d85f.speakerLabel || _0x56d85f.speakerId);
      let _0x302664 = _0x936c4d(_0xd2f4b9);
      let _0x57f63a = _0x4108fa(_0x281a32, _0x478493, _0x111f55, _0x2dfbd2 || "auto", _0x305631, false, _0x3c77f8) + _0x302664;
      let {
        hint: _0x451507
      } = this._groqExtras(_0x281a32, _0x10c05b);
      let _0x40a196 = _0x1ff2da ? _0x3ded6a(_0x39cb5c, _0x281a32, _0x2dfbd2 || "auto", _0x478493, {
        rolling_memory: _0x2e5f8d || "",
        extra_hint: _0x451507,
        bible_context: _0x7a8675.bibleContext || "",
        prompt_name: _0x2928e6,
        eff_src: _0x48a56e
      }) : _0x14ece5(_0x4faf81, _0x281a32, _0x2dfbd2 || "auto", _0x478493, {
        prompt_name: _0x2928e6,
        rolling_memory: _0x2e5f8d || "",
        extra_hint: _0x451507,
        eff_src: _0x48a56e,
        speakerLabels: _0x567754.map(_0x348bcd => _0x348bcd.speakerLabel || _0x348bcd.speakerId || null),
        bible_context: _0x7a8675.bibleContext || "",
        request_bible: _0x7a8675.requestBible === true
      });
      let _0x43de26 = _0x7a8675.requestBible === true ? _0x107a1e : _0x2743e3;
      let _0x304b44 = _0x16fee5 + _0x43de26;
      let _0x503117 = _0x111f55 * 30;
      let _0x1b8242;
      if (_0x10c05b.fixedTokens) {
        _0x1b8242 = _0x10c05b.fixedTokens;
      } else if (_0x10c05b.isDeepSeek) {
        let _0x2e1e18 = _0xd75a12.toLowerCase().includes("v4");
        let _0x4dcde1 = Math.max(4096, _0x503117 + _0x304b44);
        _0x1b8242 = _0x2e1e18 ? _0x4dcde1 : Math.min(8192, _0x4dcde1);
      } else if (_0x10c05b.isGeminiLike) {
        _0x1b8242 = Math.min(_0x10c05b.maxTokCap, Math.max(16384, _0x111f55 * 280 + _0x304b44));
      } else {
        _0x1b8242 = Math.min(_0x10c05b.maxTokCap, Math.max(4096, _0x503117 + _0x304b44));
      }
      let _0x26f5ec = {
        model: _0xd75a12 || "deepseek-v4-flash",
        messages: [{
          role: "system",
          content: _0x57f63a
        }, {
          role: "user",
          content: _0x40a196
        }],
        temperature: 0.6,
        max_tokens: _0x1b8242,
        stream: false
      };
      if (_0x10c05b.isDeepSeek) {
        _0x26f5ec.thinking = {
          type: "disabled"
        };
      } else if (_0x10c05b.isGeminiLike) {
        _0x17ce94(_0x26f5ec, _0xd75a12);
      }
      let _0x26477e = _0x7a8675.budget;
      let _0x1fb134 = _0x7a8675.stats;
      let _0x571cfc;
      for (let _0x4d87b1 = 0; _0x4d87b1 < 10 && (!_0x26477e || !(_0x26477e.remaining <= 0)); _0x4d87b1++) {
        if (_0x26477e) {
          _0x26477e.remaining -= 1;
        }
        if (_0x1fb134) {
          _0x1fb134.attempts += 1;
        }
        try {
          let _0x3ec1c9 = await _0x1fcd69.post(_0x10c05b.url, _0x26f5ec, {
            headers: {
              Authorization: "Bearer " + this.apiKey,
              "Content-Type": "application/json"
            },
            timeout: _0x34bd73
          });
          let _0x18117c = _0x5da0bd(_0x3ec1c9, _0x10c05b.name);
          if (_0x1fb134) {
            _0x1fb134.estTokens += Math.ceil((_0x57f63a.length + _0x40a196.length + (_0x18117c || "").length) / 4);
          }
          let _0x4ba9f7 = _0x4c6a1c(_0x18117c, _0x111f55);
          let _0x194dce = Object.keys(_0x4ba9f7).length;
          if (_0x194dce === 0 && _0x50abb7) {
            _0x50abb7("⚠️ " + _0x10c05b.name + " returned 200 but 0/" + _0x111f55 + " lines parsed (model may not follow ID|text format). Raw head: " + (_0x18117c || "").slice(0, 120).replace(/\n/g, " "));
          }
          let _0x9d2257 = _0x424592(_0x4ba9f7, _0x4faf81);
          let _0x5f18e8 = _0x4192b2(_0x18117c);
          if (_0x50abb7 && _0x3ec1c9.data.choices[0].finish_reason === "length") {
            _0x50abb7("⚠️ " + _0x10c05b.name + " cắt câu trả lời vì hết max_tokens (" + _0x1b8242 + ") — " + _0x194dce + "/" + _0x111f55 + " dòng đọc được" + (_0x5f18e8 ? "" : ", KHÔNG nhận được [BIBLE]") + ". Giảm số dòng mỗi chunk cho model này.");
          }
          return {
            texts: _0x2e0d13(_0x9d2257),
            memory: _0x2202e9(_0x18117c),
            bibleDelta: _0x5f18e8
          };
        } catch (_0x21566a) {
          _0x571cfc = _0x21566a;
          let _0x10f128 = _0x21566a.response && _0x21566a.response.status;
          let _0x2b104e = _0x21566a.response && _0x21566a.response.data ? JSON.stringify(_0x21566a.response.data).slice(0, 200) : _0x21566a.message;
          if (_0x50abb7) {
            _0x50abb7("⚠️ " + _0x10c05b.name + " request failed (attempt " + (_0x4d87b1 + 1) + "/10)" + (_0x10f128 ? " [HTTP " + _0x10f128 + "]" : "") + ": " + _0x2b104e);
          }
          if (_0x21566a.permanent || _0xb50a30(_0x10f128)) {
            break;
          }
          if (_0x4d87b1 < 9 && (!_0x26477e || _0x26477e.remaining > 0)) {
            let _0x5736b1 = _0x3fd96c(_0x21566a);
            if (_0x5736b1 != null) {
              await _0xd1a71f(_0x5736b1);
            } else {
              let _0x5d86c4 = _0x10f128 === 429 || _0x10f128 >= 500 && _0x10f128 < 600 ? 8000 : 2000;
              let _0x57e5b6 = Math.min(60000, _0x5d86c4 * 2 ** _0x4d87b1);
              await _0xd1a71f(Math.round(_0x57e5b6 * (0.7 + Math.random() * 0.6)));
            }
          }
        }
      }
      if (_0x26477e && _0x26477e.remaining <= 0) {
        if (_0x50abb7) {
          _0x50abb7("⚠️ " + _0x10c05b.name + ": hết ngân sách thử lại cho chunk này; " + _0x111f55 + " dòng sẽ được đánh dấu để rà lại.");
        }
        return {
          texts: _0x29af2b.map(_0x2f571a => _0x2f571a.text),
          memory: "",
          bibleDelta: null
        };
      }
      throw _0x571cfc;
    }
    async analyzeCast(_0x4194f9, _0x15fafd) {
      let {
        http: _0x55712d,
        sleep: _0x1656f6,
        model: _0x29388c,
        provider: _0x2229e2,
        stats: _0x1c51d1,
        onStatus: _0x15691e,
        speakers: _0x25e907
      } = _0x15fafd;
      let _0x53ebeb = _0x5557d6(_0x15fafd.targetLang);
      let {
        system: _0x2e4400,
        user: _0x272dab,
        sampled: _0xe98608,
        lineCount: _0x47102f
      } = _0x42166c(_0x4194f9, {
        targetLang: _0x53ebeb,
        source: _0x15fafd.source,
        speakers: _0x25e907 || []
      });
      if (_0x15691e) {
        _0x15691e("Phân tích nhân vật + xưng hô trên " + _0x47102f + " dòng" + (_0xe98608 ? " (lấy mẫu)" : "") + " trước khi dịch...");
      }
      let _0x32acda = {
        model: _0x29388c || "deepseek-v4-flash",
        messages: [{
          role: "system",
          content: _0x2e4400
        }, {
          role: "user",
          content: _0x272dab
        }],
        temperature: 0.2,
        max_tokens: Math.min(_0x2229e2.maxTokCap || 8192, 3000),
        stream: false
      };
      if (_0x2229e2.isDeepSeek) {
        _0x32acda.thinking = {
          type: "disabled"
        };
      } else if (_0x2229e2.isGeminiLike) {
        _0x17ce94(_0x32acda, _0x29388c);
      }
      for (let _0x2c4fda = 0; _0x2c4fda < 2; _0x2c4fda++) {
        if (_0x1c51d1) {
          _0x1c51d1.attempts += 1;
        }
        try {
          let _0x3bca3f = await _0x55712d.post(_0x2229e2.url, _0x32acda, {
            headers: {
              Authorization: "Bearer " + this.apiKey,
              "Content-Type": "application/json"
            },
            timeout: _0x34bd73
          });
          let _0x1131df = _0x5da0bd(_0x3bca3f, _0x2229e2.name);
          if (_0x1c51d1) {
            _0x1c51d1.estTokens += Math.ceil((_0x2e4400.length + _0x272dab.length + (_0x1131df || "").length) / 4);
          }
          let _0x210cba = _0x586f1b(_0x1131df);
          if (_0x210cba && _0x15691e) {
            _0x15691e("Hồ sơ phim: " + _0x210cba.entities.length + " nhân vật, " + _0x210cba.relationships.length + " cặp xưng hô" + (_0x210cba.setting ? " · bối cảnh: " + _0x210cba.setting : "") + ".");
          }
          return {
            cast: _0x210cba
          };
        } catch (_0xd183d1) {
          let _0x12be20 = _0xd183d1.response && _0xd183d1.response.status;
          if (_0xd183d1.permanent || _0xb50a30(_0x12be20)) {
            break;
          }
          if (_0x2c4fda === 0) {
            await _0x1656f6(1500);
          }
        }
      }
      if (_0x15691e) {
        _0x15691e("⚠️ Phân tích nhân vật thất bại — dịch tiếp không có hồ sơ dựng sẵn.");
      }
      return null;
    }
    async polishChunk(_0x5291ad, _0x4928f5) {
      let {
        http: _0x31db2a,
        sleep: _0x38f715,
        model: _0x22c175,
        provider: _0x1836d9,
        budget: _0x5b67fa,
        stats: _0x3aa08e
      } = _0x4928f5;
      let _0x3492e0 = _0x5557d6(_0x4928f5.targetLang);
      let {
        system: _0x4135a0,
        user: _0x5f38f4
      } = _0x51ba5e(_0x3492e0, _0x48331c(_0x3492e0), _0x5291ad);
      let _0x11c87d = {
        model: _0x22c175 || "deepseek-v4-flash",
        messages: [{
          role: "system",
          content: _0x4135a0
        }, {
          role: "user",
          content: _0x5f38f4
        }],
        temperature: 0.45,
        max_tokens: Math.min(_0x1836d9.maxTokCap || 8192, Math.max(2048, _0x5291ad.length * (_0x1836d9.isGeminiLike ? 200 : 60))),
        stream: false
      };
      if (_0x1836d9.isDeepSeek) {
        _0x11c87d.thinking = {
          type: "disabled"
        };
      } else if (_0x1836d9.isGeminiLike) {
        _0x17ce94(_0x11c87d, _0x22c175);
      }
      for (let _0x4446f2 = 0; _0x4446f2 < 2 && (!_0x5b67fa || !(_0x5b67fa.remaining <= 0)); _0x4446f2++) {
        if (_0x5b67fa) {
          _0x5b67fa.remaining -= 1;
        }
        if (_0x3aa08e) {
          _0x3aa08e.attempts += 1;
        }
        try {
          let _0x4ad4fe = await _0x31db2a.post(_0x1836d9.url, _0x11c87d, {
            headers: {
              Authorization: "Bearer " + this.apiKey,
              "Content-Type": "application/json"
            },
            timeout: _0x34bd73
          });
          let _0x166d9d = _0x5da0bd(_0x4ad4fe, _0x1836d9.name);
          if (_0x3aa08e) {
            _0x3aa08e.estTokens += Math.ceil((_0x4135a0.length + _0x5f38f4.length + (_0x166d9d || "").length) / 4);
          }
          let _0x21a4f3 = _0x4c6a1c(_0x166d9d, _0x5291ad.length);
          return _0x5291ad.map(_0x49c7d4 => _0x21a4f3[_0x49c7d4.n - 1] || "");
        } catch (_0x5e9ddb) {
          let _0x45502b = _0x5e9ddb.response && _0x5e9ddb.response.status;
          if (_0x5e9ddb.permanent || _0xb50a30(_0x45502b)) {
            break;
          }
          if (_0x4446f2 === 0) {
            await _0x38f715(1500);
          }
        }
      }
      return _0x5291ad.map(() => "");
    }
    async condenseChunk(_0x2452a3, _0x4bfa9c) {
      let {
        http: _0x1b3064,
        sleep: _0x8168b8,
        model: _0x686b67,
        provider: _0x13d88d,
        budget: _0x14f535,
        stats: _0x32fda9
      } = _0x4bfa9c;
      let _0x5826e8 = _0x5557d6(_0x4bfa9c.targetLang);
      let {
        system: _0x3c67cc,
        user: _0x1c1c3a
      } = _0x45b477(_0x5826e8, _0x48331c(_0x5826e8), _0x2452a3, {
        deep: _0x4bfa9c.deep === true
      });
      let _0x1a5aab = {
        model: _0x686b67 || "deepseek-v4-flash",
        messages: [{
          role: "system",
          content: _0x3c67cc
        }, {
          role: "user",
          content: _0x1c1c3a
        }],
        temperature: 0.3,
        max_tokens: Math.max(2048, _0x2452a3.length * 80),
        stream: false
      };
      if (_0x13d88d.isDeepSeek) {
        _0x1a5aab.thinking = {
          type: "disabled"
        };
      } else if (_0x13d88d.isGeminiLike) {
        _0x17ce94(_0x1a5aab, _0x686b67);
      }
      for (let _0x59c22b = 0; _0x59c22b < 2 && (!_0x14f535 || !(_0x14f535.remaining <= 0)); _0x59c22b++) {
        if (_0x14f535) {
          _0x14f535.remaining -= 1;
        }
        if (_0x32fda9) {
          _0x32fda9.attempts += 1;
        }
        try {
          let _0x38ba09 = await _0x1b3064.post(_0x13d88d.url, _0x1a5aab, {
            headers: {
              Authorization: "Bearer " + this.apiKey,
              "Content-Type": "application/json"
            },
            timeout: _0x34bd73
          });
          let _0x214b0 = _0x5da0bd(_0x38ba09, _0x13d88d.name);
          if (_0x32fda9) {
            _0x32fda9.estTokens += Math.ceil((_0x3c67cc.length + _0x1c1c3a.length + (_0x214b0 || "").length) / 4);
          }
          let _0x533259 = _0x4c6a1c(_0x214b0, _0x2452a3.length);
          return _0x2452a3.map(_0x2d9d29 => _0xba68ed(_0x533259[_0x2d9d29.n - 1] || ""));
        } catch (_0x122d19) {
          let _0x12be36 = _0x122d19.response && _0x122d19.response.status;
          if (_0x122d19.permanent || _0xb50a30(_0x12be36)) {
            break;
          }
          if (_0x59c22b === 0) {
            await _0x8168b8(1500);
          }
        }
      }
      return _0x2452a3.map(() => "");
    }
    async condenseWithBudgets(_0x52e381, _0xd0ec63) {
      let {
        targetLang: _0x4a3c5d = "vi",
        model: _0x1f9b51 = "deepseek-v4-flash",
        url: _0x497cde,
        isCustomProvider: _0x43b14f,
        entities: _0x257865 = [],
        axiosInst: _0x4fc5b4,
        sleepFn: _0x222273,
        onStatus: _0x471e50,
        onProgress: _0x186643,
        parallelJobs: _0x38bd3d
      } = _0xd0ec63 || {};
      let _0x126f0e = _0x5557d6(_0x4a3c5d);
      let _0x2340bd = _0x2c7b1f(_0x1f9b51, _0x497cde, _0x43b14f);
      let _0x1ccd1d = _0x4fc5b4 || _0x5063a0;
      let _0x4d5820 = _0x222273 || (_0x423ecc => new Promise(_0xa73b86 => setTimeout(_0xa73b86, _0x423ecc)));
      let _0x38bdd3 = {};
      let _0x2432e2 = (_0x52e381 || []).filter(_0xc82066 => _0xc82066 && _0xc82066.id != null && _0xc82066.full && _0xc82066.read && Number.isFinite(_0xc82066.budgetSyl));
      for (let _0x2689b7 of _0x2432e2) {
        _0x38bdd3[_0x2689b7.id] = null;
      }
      if (!_0x2432e2.length) {
        return {
          takes: _0x38bdd3
        };
      }
      let _0xb1c86 = Math.max(_0x45c14c, Math.max(1, Math.min(10, Number.parseInt(_0x38bd3d, 10) || 1)));
      let _0x59f2d7 = (() => {
        let _0x1ebff1 = _0x2432e2.map(_0x5b2c91 => ({
          text: (_0x5b2c91.source || "") + " " + _0x5b2c91.full
        }));
        let _0xe0cb4 = Math.min(_0xb1c86, Math.max(1, Math.ceil(_0x2432e2.length / _0x1672e8)));
        let _0x1133f3 = _0x3f3552(_0x1ebff1, {
          maxLines: Math.max(1, Math.min(Math.ceil(_0x2432e2.length / _0xe0cb4), _0x2340bd.chunkLines || _0x1672e8)),
          tokenBudget: Math.floor((_0x2340bd.inputTokenBudget || 16000) * 0.35)
        }).map(_0x221a3f => _0x221a3f.length);
        if (_0x1133f3.reduce((_0x798d97, _0x347aca) => _0x798d97 + _0x347aca, 0) !== _0x2432e2.length) {
          return [_0x2432e2];
        }
        let _0x2e2271 = [];
        let _0x5b9f5a = 0;
        for (let _0x36a0ce of _0x1133f3) {
          _0x2e2271.push(_0x2432e2.slice(_0x5b9f5a, _0x5b9f5a + _0x36a0ce));
          _0x5b9f5a += _0x36a0ce;
        }
        return _0x2e2271;
      })();
      if (_0x471e50) {
        _0x471e50("Rút gọn theo số đo thật cho " + _0x2432e2.length + " câu vẫn vượt khung" + (_0x59f2d7.length > 1 ? " (" + _0x59f2d7.length + " lô)" : "") + "...");
      }
      let _0x25c64d = (_0x35d1f7, _0x50deb0) => {
        let _0x55b1bf = (_0x50deb0 || "").trim();
        if (!_0x55b1bf || _0x55b1bf === _0x35d1f7.full || _0x55b1bf === _0x35d1f7.read) {
          return;
        }
        let _0x2912b3 = _0x3bc174(_0x35d1f7.full);
        let _0x1b30e5 = _0x3bc174(_0x55b1bf);
        if (!(_0x1b30e5 >= _0x3bc174(_0x35d1f7.read)) && !(_0x1b30e5 < Math.floor(_0x2912b3 * _0x50e888)) && !_0x54878f(_0x35d1f7.full, _0x55b1bf, {
          target: _0x126f0e,
          entities: _0x257865
        }).length) {
          _0x38bdd3[_0x35d1f7.id] = _0x55b1bf;
        }
      };
      let _0x5d63ba = 0;
      let _0xe88378 = 0;
      let _0x30e729 = () => {
        if (_0x186643) {
          _0x186643({
            done: _0x5d63ba,
            total: _0x2432e2.length,
            batchesDone: _0xe88378,
            batches: _0x59f2d7.length
          });
        }
      };
      _0x30e729();
      let _0x1ba3c9 = async _0x3d2cd4 => {
        let _0x32b22d = _0x3d2cd4.map((_0x115adb, _0x9ad811) => ({
          n: _0x9ad811 + 1,
          source: _0x115adb.source || "",
          full: _0x115adb.full,
          budget: _0x115adb.budgetSyl,
          budgetMin: Number.isFinite(_0x115adb.budgetMinSyl) ? _0x115adb.budgetMinSyl : undefined
        }));
        let _0x1af773 = {
          remaining: 4
        };
        let _0x3f2eb0;
        try {
          _0x3f2eb0 = await this.condenseChunk(_0x32b22d, {
            http: _0x1ccd1d,
            sleep: _0x4d5820,
            model: _0x1f9b51,
            provider: _0x2340bd,
            targetLang: _0x126f0e,
            budget: _0x1af773,
            deep: true
          });
        } catch {
          _0x3f2eb0 = _0x32b22d.map(() => "");
        }
        _0x3d2cd4.forEach((_0x143a04, _0xf48b63) => _0x25c64d(_0x143a04, _0x3f2eb0[_0xf48b63]));
        _0x5d63ba += _0x3d2cd4.length;
        _0xe88378 += 1;
        _0x30e729();
      };
      if (_0x59f2d7.length === 1) {
        await _0x1ba3c9(_0x59f2d7[0]);
        return {
          takes: _0x38bdd3
        };
      }
      let _0x48a285 = 0;
      let _0x58da6e = async () => {
        while (true) {
          let _0x5057aa = _0x48a285++;
          if (_0x5057aa >= _0x59f2d7.length) {
            break;
          }
          await _0x1ba3c9(_0x59f2d7[_0x5057aa]);
        }
      };
      await Promise.all(Array.from({
        length: Math.min(_0xb1c86, _0x59f2d7.length)
      }, () => _0x58da6e()));
      return {
        takes: _0x38bdd3
      };
    }
    async translateSegments({
      segments: _0x126d53,
      targetLang: _0x5be04a = "vi",
      preset: _0x6fdd72 = "default",
      model: _0x18565f = "deepseek-v4-flash",
      axiosInst: _0x30d2a2,
      sleepFn: _0x1b02de,
      onStatus: _0x5c6435,
      url: _0x4d0e33,
      parallelJobs: _0x205c93 = 1,
      source: _0xed37b6,
      isCustomProvider: _0xbeca5,
      glossary: _0x390d80 = [],
      onProgress: _0x1d6bd1,
      onChunkResult: _0x531e2f,
      promptOverrides: _0x336f2a,
      bible: _0x560fd7 = null,
      speakers: _0x5bd86c = [],
      cacheGet: _0x989c4d = null,
      cacheSet: _0x3e7605 = null,
      polish: _0x4cbb3c = false,
      castAnalysis: _0xc112b5 = true
    }) {
      let _0x435001 = _0x30d2a2 || _0x5063a0;
      let _0x235fa6 = _0x1b02de || (_0x4dd010 => new Promise(_0x7e72d4 => setTimeout(_0x7e72d4, _0x4dd010)));
      let _0x346fa1 = _0x5557d6(_0x5be04a);
      let _0x2e971d = _0x2c7b1f(_0x18565f, _0x4d0e33, _0xbeca5);
      let _0x5da496 = _0xed37b6 && _0xed37b6 !== "auto" ? {
        lang: _0xed37b6,
        confidence: 1
      } : _0x3f4366(_0x126d53);
      let _0x2f9537 = _0xed37b6 && _0xed37b6 !== "auto" ? _0xed37b6 : _0x5da496.confidence >= 0.5 ? _0x5da496.lang : "auto";
      if (_0x5c6435 && (!_0xed37b6 || _0xed37b6 === "auto")) {
        _0x5c6435("Ngôn ngữ nguồn (auto): " + (_0x2f9537 === "auto" ? "không chắc → prompt trung tính" : _0x2f9537) + " (" + Math.round(_0x5da496.confidence * 100) + "%)");
      }
      let _0xd2856d = {
        attempts: 0,
        estTokens: 0,
        polished: 0
      };
      let _0x4a79a5 = _0x4cbb3c === true;
      let _0x1c0fad = _0x255f83(_0x44423b(_0x560fd7), _0x390d80);
      _0x1c0fad.detected = {
        sourceLang: _0x5da496.lang,
        confidence: _0x5da496.confidence
      };
      let _0x133747 = [];
      let _0x4a96ee = null;
      if (_0xc112b5 !== false && _0x38cdea(_0x1c0fad)) {
        let _0x594427 = _0x126d53.filter(_0x4f1ceb => _0x4f1ceb && !_0x4f1ceb.contextOnly && String(_0x4f1ceb.text || "").trim());
        if (_0x594427.length >= _0x2903d9) {
          let _0x4c7d17 = _0x989c4d || _0x3e7605 ? _0x2198d9.createHash("sha1").update(JSON.stringify({
            v: 1,
            kind: "cast",
            t: _0x594427.map(_0x174d63 => _0x174d63.text),
            lang: _0x346fa1,
            model: _0x18565f,
            src: _0x2f9537 || "auto"
          })).digest("hex") : null;
          let _0x13af0d = _0x4c7d17 && _0x989c4d ? _0x989c4d(_0x4c7d17) : undefined;
          if (!_0x13af0d || typeof _0x13af0d != "object" || !("cast" in _0x13af0d)) {
            _0x13af0d = await this.analyzeCast(_0x594427, {
              http: _0x435001,
              sleep: _0x235fa6,
              model: _0x18565f,
              provider: _0x2e971d,
              stats: _0xd2856d,
              onStatus: _0x5c6435,
              targetLang: _0x346fa1,
              source: _0x2f9537,
              speakers: _0x5bd86c
            });
            if (_0x13af0d && _0x4c7d17 && _0x3e7605) {
              _0x3e7605(_0x4c7d17, _0x13af0d);
            }
          }
          let _0x355b35 = _0x13af0d && _0x13af0d.cast;
          if (_0x355b35) {
            let _0x4aef24 = _0x5cca4f(_0x1c0fad, _0x355b35, 0, {
              speakers: _0x5bd86c
            });
            _0x1c0fad = _0x4aef24.bible;
            _0x133747.push(..._0x4aef24.conflicts);
            if (_0x355b35.setting || _0x355b35.summary) {
              _0x4a96ee = ["BỐI CẢNH:", _0x355b35.setting, _0x355b35.summary].filter(Boolean).join(" ");
            }
          }
        }
      }
      let _0xba539b = _0x126d53.some(_0x47e206 => _0x47e206 && _0x47e206.contextOnly);
      let _0x595aff = _0x126d53;
      let _0x3e50fc = _0x595aff.map(_0x4287b9 => ({
        ..._0x4287b9,
        duration: Math.max(0.1, (Number(_0x4287b9.endTime) || 0) - (Number(_0x4287b9.startTime) || 0))
      }));
      let {
        sceneStartIndices: _0x5c4f49
      } = _0x26e669(_0x3e50fc);
      let _0x529563 = _0x2a41b9(_0x5c4f49, _0x3e50fc.length);
      let _0x4eded7 = _0x59c7e6 => Math.min(_0x36f001.borrowSideMaxSec, _0x36f001.borrowSideMaxFrac * _0x59c7e6);
      let _0x4fd8a3 = _0x3cd38c => Math.min(_0x36f001.borrowTotalMaxSec, _0x36f001.borrowTotalMaxFrac * _0x3cd38c);
      _0x3e50fc.forEach((_0x22ea2a, _0x16d26f) => {
        let _0x54037d = _0x22ea2a.duration;
        let _0x49fa6a = _0x16d26f > 0 ? _0x3e50fc[_0x16d26f - 1] : null;
        let _0x48444a = _0x16d26f + 1 < _0x3e50fc.length ? _0x3e50fc[_0x16d26f + 1] : null;
        let _0x2501ee = _0x49fa6a ? _0x529563[_0x16d26f] !== _0x529563[_0x16d26f - 1] : true;
        let _0x4a3247 = _0x48444a ? _0x529563[_0x16d26f + 1] !== _0x529563[_0x16d26f] : true;
        let _0x38dd1b = 0;
        if (_0x49fa6a && !_0x2501ee) {
          _0x38dd1b = Math.max(0, _0x22ea2a.startTime - (_0x49fa6a.endTime || 0) - _0x36f001.safetyGapSec) * 0.5;
        } else if (!_0x49fa6a) {
          _0x38dd1b = Math.max(0, Number(_0x22ea2a.startTime) || 0);
        }
        let _0x390636 = 0;
        if (_0x48444a && !_0x4a3247) {
          _0x390636 = Math.max(0, _0x48444a.startTime - _0x22ea2a.endTime - _0x36f001.safetyGapSec) * 0.5;
        } else if (!_0x48444a) {
          _0x390636 = _0x4eded7(_0x54037d);
        }
        let _0x24dd02 = Math.min(Math.min(_0x38dd1b, _0x4eded7(_0x54037d)) + Math.min(_0x390636, _0x4eded7(_0x54037d)), _0x4fd8a3(_0x54037d));
        _0x22ea2a.budgetSyl = Math.max(2, Math.floor((_0x22ea2a.duration + _0x24dd02) * _0x5eadf8 * _0x2b985c));
      });
      let _0x35bc0e = _0x53c02a(_0x3e50fc, {
        sceneIdxByPos: _0x529563,
        bible: _0x1c0fad,
        speakers: _0x5bd86c
      });
      _0x3e50fc.forEach(_0x20af55 => {
        let _0x596544 = _0x35bc0e.get(_0x20af55.id);
        _0x20af55.listenerId = _0x596544 ? _0x596544.listenerId : null;
        _0x20af55.listenerConfidence = _0x596544 ? _0x596544.confidence : 0;
        _0x20af55.relationDecisionId = _0x596544 && _0x596544.decisionId || null;
        if (_0x20af55.speakerId) {
          let _0x2a0dd1 = _0x20af55.listenerId === "group" ? "nhóm" : _0x20af55.listenerId === null ? "?" : _0x20af55.listenerId;
          _0x20af55.speakerLabel = _0x20af55.speakerId + "→" + _0x2a0dd1;
        }
      });
      let _0x175c0f = _0xba539b ? _0x4a908c(_0x3e50fc, _0x2e971d.chunkLines) : _0x3f3552(_0x3e50fc, {
        maxLines: _0x2e971d.chunkLines,
        tokenBudget: Math.floor((_0x2e971d.inputTokenBudget || 16000) * 0.35),
        sceneStart: _0x5c4f49
      });
      let _0x3f0dd6 = _0x2d75ec => {
        let _0x1667fb = _0x2d75ec.find(_0x24ba3b => !_0x24ba3b.contextOnly) || _0x2d75ec[0];
        let _0xf5a626 = _0x1667fb ? _0x254856.get(_0x1667fb.id) : undefined;
        return _0xf5a626 !== undefined && _0x529563[_0xf5a626] || 0;
      };
      let _0x4d995a = new Array(_0x595aff.length);
      let _0xa359e3 = new Set();
      let _0x254856 = new Map(_0x595aff.map((_0x2911cb, _0x14d87c) => [_0x2911cb.id, _0x14d87c]));
      let _0x4d2b3e = _0x478a2a => {
        let _0x2be71f = _0x478a2a.map(_0x5ab752 => _0x5ab752.text || "").join("\n").toLowerCase();
        return (_0x390d80 || []).filter(_0x487ba1 => _0x487ba1 && _0x487ba1.source && _0x2be71f.includes(String(_0x487ba1.source).toLowerCase()));
      };
      let _0x10b319 = {
        targetLang: _0x346fa1,
        preset: _0x6fdd72,
        http: _0x435001,
        sleep: _0x235fa6,
        model: _0x18565f,
        source: _0x2f9537,
        provider: _0x2e971d,
        onStatus: _0x5c6435,
        promptOverrides: _0x336f2a,
        stats: _0xd2856d
      };
      let _0x4eeaed = Math.max(1, Math.min(10, Number.parseInt(_0x205c93, 10) || 1));
      let _0x33aa3f = 20;
      let _0x34fd = async (_0xe6f9a4, _0x57db29, _0x4652e9, _0x44113a, _0x29098d, _0xa343ea) => {
        let _0x566877 = _0xe6f9a4.filter(_0x5bef84 => !_0x5bef84.contextOnly);
        let _0x5568ea = _0xe6f9a4.filter(_0x1f379e => _0x1f379e.contextOnly);
        let _0xf3aa44 = _0x4d2b3e(_0xe6f9a4);
        let _0x36c0c7 = {
          remaining: _0x4cf150
        };
        let _0x386c41 = _0x57db29;
        let _0x3b53c4 = async (_0x224570, _0x49dd5d, _0x30ea1b) => {
          while (_0x36c0c7.remaining > 0) {
            try {
              return await this.translateChunk(_0x224570, {
                ..._0x10b319,
                glossary: _0x49dd5d,
                memory: _0x30ea1b,
                budget: _0x36c0c7,
                bibleContext: _0x44113a || "",
                requestBible: _0x29098d === true
              });
            } catch (_0x22147b) {
              let _0x5ccca7 = _0x22147b && _0x22147b.response && _0x22147b.response.status;
              if (_0x22147b.permanent || _0xb50a30(_0x5ccca7)) {
                throw _0x22147b;
              }
              _0x36c0c7.remaining -= 1;
            }
          }
          return {
            texts: _0x224570.filter(_0xc30130 => !_0xc30130.contextOnly).map(_0x4a95b9 => _0x4a95b9.text),
            memory: "",
            bibleDelta: null
          };
        };
        let _0x3eb3e4 = await _0x3b53c4(_0xe6f9a4, _0xf3aa44, _0x386c41);
        let _0xc71448 = _0x3eb3e4.texts.slice();
        let _0xb1aa95 = _0x3eb3e4.bibleDelta || null;
        if (_0x3eb3e4.memory) {
          _0x386c41 = _0x3eb3e4.memory;
        }
        let _0x203137 = Number.POSITIVE_INFINITY;
        let _0x23870a = 0;
        for (let _0x22dd50 = 0; _0x22dd50 < _0x33aa3f; _0x22dd50++) {
          let _0x8fb0c0 = [];
          for (let _0x1283a3 = 0; _0x1283a3 < _0x566877.length; _0x1283a3++) {
            if (this._needsRetry(_0x566877[_0x1283a3].text, _0xc71448[_0x1283a3], _0x2f9537, _0x346fa1)) {
              _0x8fb0c0.push(_0x1283a3);
            }
          }
          if (!_0x8fb0c0.length) {
            break;
          }
          if (_0x8fb0c0.length >= _0x203137) {
            if (++_0x23870a >= 2) {
              _0x8fb0c0.forEach(_0x49aca5 => _0xa359e3.add(_0x566877[_0x49aca5].id));
              break;
            }
          } else {
            _0x23870a = 0;
          }
          _0x203137 = _0x8fb0c0.length;
          if (_0x22dd50 === _0x33aa3f - 1) {
            _0x8fb0c0.forEach(_0x1867bf => _0xa359e3.add(_0x566877[_0x1867bf].id));
          }
          let _0x15dfc6 = _0x8fb0c0.map(_0x1ea9e2 => _0x566877[_0x1ea9e2]);
          if (_0x5c6435) {
            _0x5c6435("Retranslating " + _0x15dfc6.length + " missed segments" + _0x4652e9 + " (round " + (_0x22dd50 + 1) + "/" + _0x33aa3f + ")...");
          }
          let _0x233fee = _0x5568ea.length ? _0x5568ea : _0x101d48(_0x566877, _0xc71448, _0x8fb0c0);
          let _0x9c61ea = await _0x3b53c4([..._0x15dfc6, ..._0x233fee], _0xf3aa44, _0x386c41);
          if (_0x9c61ea.memory) {
            _0x386c41 = _0x9c61ea.memory;
          }
          _0x9c61ea.texts.forEach((_0xc757e8, _0x20f184) => {
            if (!this._needsRetry(_0x15dfc6[_0x20f184].text, _0xc757e8, _0x2f9537, _0x346fa1)) {
              _0xc71448[_0x8fb0c0[_0x20f184]] = _0xc757e8;
            }
          });
        }
        if (_0x4a79a5 && _0x36c0c7.remaining > 0) {
          let _0x5ca1aa = [];
          _0x566877.forEach((_0x5346e5, _0xbe58c5) => {
            let _0x1cafc2 = _0xc71448[_0xbe58c5];
            if (!!_0x1cafc2 && _0x1cafc2 !== _0x5346e5.text) {
              _0x5ca1aa.push({
                n: _0x5ca1aa.length + 1,
                source: _0x5346e5.text || "",
                draft: _0x1cafc2,
                idx: _0xbe58c5
              });
            }
          });
          if (_0x5ca1aa.length) {
            if (_0x5c6435) {
              _0x5c6435("Biên tập lại " + _0x5ca1aa.length + " câu cho trôi chảy" + _0x4652e9 + "...");
            }
            let _0x41fc97 = await this.polishChunk(_0x5ca1aa, {
              ..._0x10b319,
              budget: _0x36c0c7
            });
            _0x5ca1aa.forEach((_0x1756ce, _0x455aaf) => {
              let _0x46d2dc = (_0x41fc97[_0x455aaf] || "").trim();
              if (!_0x46d2dc || _0x46d2dc === _0x1756ce.draft || this._needsRetry(_0x566877[_0x1756ce.idx].text, _0x46d2dc, _0x2f9537, _0x346fa1)) {
                return;
              }
              let _0x2ba707 = _0x3bc174(_0x1756ce.draft);
              if (!(_0x3bc174(_0x46d2dc) > Math.max(_0x2ba707 + 4, Math.ceil(_0x2ba707 * 1.35) + 2)) && !_0x54878f(_0x1756ce.draft, _0x46d2dc, {
                target: _0x10b319.targetLang,
                entities: _0xa343ea || []
              }).length) {
                _0xc71448[_0x1756ce.idx] = _0x46d2dc;
                if (_0xd2856d) {
                  _0xd2856d.polished += 1;
                }
              }
            });
          }
        }
        let _0x538e39 = {};
        let _0x792d08 = [];
        _0x566877.forEach((_0x2d1b4d, _0x5493c6) => {
          let _0x7d73ba = _0xc71448[_0x5493c6];
          if (!!_0x2d1b4d.budgetSyl && !!_0x7d73ba && _0x7d73ba !== _0x2d1b4d.text) {
            if (_0x3bc174(_0x7d73ba) > _0x2d1b4d.budgetSyl * _0xb5b1c8) {
              _0x792d08.push({
                seg: _0x2d1b4d,
                idx: _0x5493c6
              });
            }
          }
        });
        if (_0x792d08.length && _0x36c0c7.remaining > 0) {
          if (_0x5c6435) {
            _0x5c6435("Rút gọn lời đọc cho " + _0x792d08.length + " câu vượt khung thời lượng" + _0x4652e9 + "...");
          }
          let _0x32c26e = _0x792d08.map((_0x4064a9, _0x3a3093) => {
            let _0x111b73 = _0x3bc174(_0xc71448[_0x4064a9.idx]);
            let _0x5b7fd7 = Math.min(Math.max(2, _0x111b73 - 1), Math.max(_0x4064a9.seg.budgetSyl, Math.ceil(_0x111b73 * _0x28259f)));
            let _0x390148 = Math.min(_0x5b7fd7, Math.ceil(_0x111b73 * _0x3acf2a));
            return {
              n: _0x3a3093 + 1,
              source: _0x4064a9.seg.text || "",
              full: _0xc71448[_0x4064a9.idx],
              budget: _0x5b7fd7,
              budgetMin: _0x390148
            };
          });
          let _0x184258 = await this.condenseChunk(_0x32c26e, {
            ..._0x10b319,
            budget: _0x36c0c7
          });
          _0x792d08.forEach((_0x1f1dba, _0x592829) => {
            let _0x9e2969 = (_0x184258[_0x592829] || "").trim();
            let _0x182c7b = _0xc71448[_0x1f1dba.idx];
            if (!_0x9e2969 || _0x9e2969 === _0x182c7b) {
              return;
            }
            let _0x43856e = _0x3bc174(_0x182c7b);
            let _0x48c8e8 = _0x3bc174(_0x9e2969);
            if (!(_0x48c8e8 >= _0x43856e) && !(_0x48c8e8 < Math.floor(_0x43856e * _0x5e322c)) && !_0x54878f(_0x182c7b, _0x9e2969, {
              target: _0x10b319.targetLang,
              entities: _0xa343ea || []
            }).length) {
              _0x538e39[_0x1f1dba.seg.id] = _0x9e2969;
            }
          });
        }
        let _0x2d392a = [];
        _0x566877.forEach((_0x2fa1b2, _0x2cf60c) => {
          let _0x392b9c = _0xc71448[_0x2cf60c];
          if (!_0x2fa1b2.budgetSyl || !_0x392b9c || _0x392b9c === _0x2fa1b2.text) {
            return;
          }
          let _0x575c97 = _0x538e39[_0x2fa1b2.id] || _0x392b9c;
          if (_0x3bc174(_0x575c97) > _0x2fa1b2.budgetSyl * _0xb5b1c8) {
            _0x2d392a.push({
              seg: _0x2fa1b2,
              idx: _0x2cf60c,
              read: _0x575c97
            });
          }
        });
        if (_0x2d392a.length && _0x36c0c7.remaining > 0) {
          if (_0x5c6435) {
            _0x5c6435("Rút gọn sâu (tối đa 50%) cho " + _0x2d392a.length + " câu vẫn vượt sức chứa khung hình" + _0x4652e9 + "...");
          }
          let _0x169fd4 = _0x2d392a.map((_0x238b5d, _0x59a517) => {
            let _0x5a44ec = _0x3bc174(_0xc71448[_0x238b5d.idx]);
            let _0x3a10fb = _0x3bc174(_0x238b5d.read);
            let _0x319d9b = Math.max(2, Math.ceil(_0x5a44ec * _0x50e888));
            let _0x1ceed1 = Math.max(_0x319d9b, Math.min(_0x3a10fb - 1, Math.max(_0x238b5d.seg.budgetSyl, _0x319d9b)));
            return {
              n: _0x59a517 + 1,
              source: _0x238b5d.seg.text || "",
              full: _0xc71448[_0x238b5d.idx],
              budget: _0x1ceed1,
              budgetMin: Math.min(_0x319d9b, _0x1ceed1)
            };
          });
          let _0x34dcae = await this.condenseChunk(_0x169fd4, {
            ..._0x10b319,
            budget: _0x36c0c7,
            deep: true
          });
          _0x2d392a.forEach((_0x289ad2, _0x3af989) => {
            let _0x4b0541 = (_0x34dcae[_0x3af989] || "").trim();
            let _0x45e68d = _0xc71448[_0x289ad2.idx];
            if (!_0x4b0541 || _0x4b0541 === _0x45e68d || _0x4b0541 === _0x289ad2.read) {
              return;
            }
            let _0x232f63 = _0x3bc174(_0x45e68d);
            let _0x3ff95a = _0x3bc174(_0x4b0541);
            if (!(_0x3ff95a >= _0x3bc174(_0x289ad2.read)) && !(_0x3ff95a < Math.floor(_0x232f63 * _0x50e888)) && !_0x54878f(_0x45e68d, _0x4b0541, {
              target: _0x10b319.targetLang,
              entities: _0xa343ea || []
            }).length) {
              _0x538e39[_0x289ad2.seg.id] = _0x4b0541;
            }
          });
        }
        return {
          translated: _0xc71448,
          memory: _0x386c41,
          targets: _0x566877,
          bibleDelta: _0xb1aa95,
          dubbing: _0x538e39
        };
      };
      let _0x5c9544 = _0x2198d9.createHash("sha1").update(JSON.stringify(_0x390d80 || [])).digest("hex").slice(0, 12);
      let _0x16185c = _0x2198d9.createHash("sha1").update(String(_0x3a1144(_0x6fdd72, _0x336f2a, _0x346fa1) || "")).digest("hex").slice(0, 12);
      let _0x423ed7 = _0x2198d9.createHash("sha1").update((_0x2e971d.name || "") + "|" + (_0x2e971d.url || "")).digest("hex").slice(0, 12);
      let _0x28db35 = (_0x58a5eb, _0x22a613) => {
        let _0x42c78d = _0x58a5eb.filter(_0x3f03f4 => !_0x3f03f4.contextOnly).map(_0xb8e375 => _0xb8e375.text);
        let _0x500168 = _0x2198d9.createHash("sha1").update(JSON.stringify({
          v: 3,
          t: _0x42c78d,
          lang: _0x346fa1,
          model: _0x18565f,
          preset: _0x6fdd72,
          pt: _0x16185c,
          src: _0x2f9537 || "auto",
          p: _0x423ed7,
          rb: _0x22a613 ? _0x2dc7a9 : 0,
          g: _0x5c9544
        })).digest("hex");
        let _0x30339e = _0x865587.shadowCompare("chunkCacheKey", _0x500168, _0x5637f8 => _0x5637f8.chunkCacheKeyJson(JSON.stringify({
          t: _0x42c78d,
          lang: _0x346fa1,
          model: _0x18565f,
          preset: _0x6fdd72,
          pt: _0x16185c,
          src: _0x2f9537 || "auto",
          p: _0x423ed7,
          rb: _0x22a613 ? _0x2dc7a9 : 0,
          g: _0x5c9544
        })));
        if (_0x4a79a5) {
          return _0x30339e + ":po1";
        } else {
          return _0x30339e;
        }
      };
      let _0xcf2750 = async (_0x5ac581, _0x33f8f2, _0x285a93, _0x3fa8d6, _0x3afeed, _0x5aef90) => {
        let _0x2e37aa = _0x989c4d || _0x3e7605 ? _0x28db35(_0x5ac581, _0x3afeed) : null;
        if (_0x2e37aa && _0x989c4d) {
          let _0xbaa667 = _0x989c4d(_0x2e37aa);
          if (_0xbaa667 && Array.isArray(_0xbaa667.translated)) {
            let _0x44c47c = _0x5ac581.filter(_0x135149 => !_0x135149.contextOnly);
            if (_0xbaa667.translated.length === _0x44c47c.length) {
              return {
                translated: _0xbaa667.translated,
                targets: _0x44c47c,
                memory: _0xbaa667.memory || _0x33f8f2,
                bibleDelta: _0xbaa667.bibleDelta || null,
                dubbing: _0xbaa667.dubbing || {}
              };
            }
          }
        }
        let _0x2d0ac5 = await _0x34fd(_0x5ac581, _0x33f8f2, _0x285a93, _0x3fa8d6, _0x3afeed, _0x5aef90);
        let _0x1f931a = _0x2d0ac5.targets.every((_0x53df18, _0xf9c171) => !this._needsRetry(_0x53df18.text, _0x2d0ac5.translated[_0xf9c171], _0x2f9537, _0x346fa1));
        if (_0x2e37aa && _0x3e7605 && _0x1f931a) {
          _0x3e7605(_0x2e37aa, {
            translated: _0x2d0ac5.translated,
            memory: _0x2d0ac5.memory || "",
            bibleDelta: _0x2d0ac5.bibleDelta || null,
            dubbing: _0x2d0ac5.dubbing || {}
          });
        }
        return _0x2d0ac5;
      };
      let _0x4c2cee = (_0x4cdac1, _0x1dcfc8) => {
        _0x4cdac1.forEach((_0x4d26a1, _0xc49016) => {
          let _0x10f7b4 = _0x254856.get(_0x4d26a1.id);
          if (_0x10f7b4 !== undefined) {
            _0x4d995a[_0x10f7b4] = _0x1dcfc8[_0xc49016];
          }
        });
      };
      let _0x35ea93 = (_0x250a41, _0x59930b, _0x185f00) => {
        let _0x3d163b = [];
        let _0x335c71 = [];
        let _0x41e4e2 = [];
        let _0xff66e6 = [];
        _0x250a41.forEach((_0x132232, _0x9bea68) => {
          let _0x591021 = _0xa359e3.has(_0x132232.id) ? "suspect" : _0x59930b[_0x9bea68] && _0x59930b[_0x9bea68] !== _0x132232.text ? "ok" : "source_fallback";
          _0x3d163b.push(_0x132232.id);
          _0x335c71.push(_0x59930b[_0x9bea68]);
          _0x41e4e2.push(_0x185f00 && _0x185f00[_0x132232.id] || null);
          _0xff66e6.push(_0x591021);
        });
        return {
          ids: _0x3d163b,
          texts: _0x335c71,
          dubbing: _0x41e4e2,
          statuses: _0xff66e6
        };
      };
      let _0x491830 = {};
      if (_0x4eeaed === 1 || _0x175c0f.length <= 1) {
        let _0xc62c92 = _0x4a96ee;
        let _0x32d058 = 0;
        for (let _0x4bbcf7 of _0x175c0f) {
          _0x32d058++;
          if (_0x5c6435) {
            _0x5c6435("Translating chunk " + _0x32d058 + "/" + _0x175c0f.length + " (" + _0x4bbcf7.length + " segments)...");
          }
          let _0x2b4861 = _0x5a6912(_0x1c0fad, _0x4bbcf7, _0x5bd86c, _0x3f0dd6(_0x4bbcf7));
          let _0x275864 = await _0xcf2750(_0x4bbcf7, _0xc62c92, "", _0x2b4861, _0x38cdea(_0x1c0fad), _0x1c0fad.entities);
          Object.assign(_0x491830, _0x275864.dubbing || {});
          if (_0x275864.memory) {
            _0xc62c92 = _0x275864.memory;
          }
          let _0x193ef8 = _0x5cca4f(_0x1c0fad, _0x275864.bibleDelta, _0x3f0dd6(_0x4bbcf7), {
            speakers: _0x5bd86c
          });
          _0x1c0fad = _0x193ef8.bible;
          _0x133747.push(..._0x193ef8.conflicts);
          _0x4c2cee(_0x275864.targets, _0x275864.translated);
          if (_0x1d6bd1) {
            _0x1d6bd1({
              done: _0x32d058,
              total: _0x175c0f.length
            });
          }
          if (_0x531e2f) {
            _0x531e2f(_0x35ea93(_0x275864.targets, _0x275864.translated, _0x275864.dubbing));
          }
        }
      } else {
        let _0x153624 = 0;
        let _0x521364 = _0x335dd7 => {
          _0x4c2cee(_0x335dd7.targets, _0x335dd7.translated);
          Object.assign(_0x491830, _0x335dd7.dubbing || {});
          _0x153624 += 1;
          if (_0x1d6bd1) {
            _0x1d6bd1({
              done: _0x153624,
              total: _0x175c0f.length
            });
          }
          if (_0x531e2f) {
            _0x531e2f(_0x35ea93(_0x335dd7.targets, _0x335dd7.translated, _0x335dd7.dubbing));
          }
        };
        if (_0x5c6435) {
          _0x5c6435("Translating seed chunk 1/" + _0x175c0f.length + " (" + _0x175c0f[0].length + " segments)...");
        }
        let _0x7321f4 = await _0xcf2750(_0x175c0f[0], _0x4a96ee, " in chunk 1", _0x5a6912(_0x1c0fad, _0x175c0f[0], _0x5bd86c, _0x3f0dd6(_0x175c0f[0])), _0x38cdea(_0x1c0fad), _0x1c0fad.entities);
        _0x521364(_0x7321f4);
        let _0x53ae7b = _0x7321f4.memory || null;
        let _0x5247fc = _0x5cca4f(_0x1c0fad, _0x7321f4.bibleDelta, _0x3f0dd6(_0x175c0f[0]), {
          speakers: _0x5bd86c
        });
        _0x1c0fad = _0x5247fc.bible;
        _0x133747.push(..._0x5247fc.conflicts);
        let _0x223391 = _0x44423b(JSON.parse(JSON.stringify(_0x1c0fad)));
        let _0x3410c0 = 1;
        let _0x37f929 = [];
        let _0x25cc6e = async () => {
          while (true) {
            let _0x45f2d0 = _0x3410c0++;
            if (_0x45f2d0 >= _0x175c0f.length) {
              break;
            }
            let _0x5633d2 = _0x175c0f[_0x45f2d0];
            if (_0x5c6435) {
              _0x5c6435("Translating chunk " + (_0x45f2d0 + 1) + "/" + _0x175c0f.length + " (" + _0x5633d2.length + " segments) in parallel...");
            }
            let _0x5dbd15 = await _0xcf2750(_0x5633d2, _0x53ae7b, " in chunk " + (_0x45f2d0 + 1), _0x5a6912(_0x223391, _0x5633d2, _0x5bd86c, _0x3f0dd6(_0x5633d2)), _0x38cdea(_0x223391), _0x223391.entities);
            if (_0x5dbd15.bibleDelta) {
              _0x37f929.push({
                sceneIndex: _0x3f0dd6(_0x5633d2),
                delta: _0x5dbd15.bibleDelta
              });
            }
            _0x521364(_0x5dbd15);
          }
        };
        let _0x184eb2 = Math.min(_0x4eeaed, _0x175c0f.length - 1);
        await Promise.all(Array.from({
          length: _0x184eb2
        }, () => _0x25cc6e()));
        _0x37f929.sort((_0x5b1481, _0x38ec10) => _0x5b1481.sceneIndex - _0x38ec10.sceneIndex);
        for (let _0x5d6d05 of _0x37f929) {
          let _0x29a9c6 = _0x5cca4f(_0x1c0fad, _0x5d6d05.delta, _0x5d6d05.sceneIndex, {
            speakers: _0x5bd86c
          });
          _0x1c0fad = _0x29a9c6.bible;
          _0x133747.push(..._0x29a9c6.conflicts);
        }
      }
      let _0x589d55 = _0x595aff.filter(_0x41f0a9 => !_0x41f0a9.contextOnly);
      let _0x164d92 = _0x589d55.map(_0x5f4aba => _0x5f4aba.id);
      let _0x36cd4e = {};
      let _0x5e1167 = _0x491830;
      let _0x200941 = {};
      for (let _0x16cae2 of _0x3e50fc) {
        if (!_0x16cae2.contextOnly && _0x16cae2.budgetSyl) {
          _0x200941[_0x16cae2.id] = _0x16cae2.budgetSyl;
        }
      }
      let _0x585587 = _0x589d55.map(_0x1c3534 => {
        let _0x38b2fe = _0x254856.get(_0x1c3534.id);
        let _0x313b34 = _0x38b2fe !== undefined ? _0x4d995a[_0x38b2fe] : undefined;
        _0x36cd4e[_0x1c3534.id] = _0xa359e3.has(_0x1c3534.id) ? "suspect" : _0x313b34 === undefined ? "source_fallback" : "ok";
        if (_0x313b34 !== undefined) {
          return _0x313b34;
        } else {
          return _0x1c3534.text;
        }
      });
      if (_0x5c6435) {
        let _0x2841de = _0x164d92.filter(_0xc34ed0 => _0x36cd4e[_0xc34ed0] === "ok").length;
        let _0x3845e3 = _0x164d92.filter(_0x51b91b => _0x36cd4e[_0x51b91b] === "source_fallback").length;
        let _0x2c77db = _0x164d92.filter(_0x342d8e => _0x36cd4e[_0x342d8e] === "suspect").length;
        let _0x31823e = Object.keys(_0x5e1167).length;
        let _0x2c54ef = _0x164d92.length ? Math.round(_0x31823e / _0x164d92.length * 100) : 0;
        _0x5c6435("Dịch xong: " + _0x2841de + " ok · " + _0x3845e3 + " giữ gốc · " + _0x2c77db + " nghi ngờ · " + _0x31823e + " câu rút gọn lời đọc (" + _0x2c54ef + "%)" + (_0x4a79a5 ? " · " + _0xd2856d.polished + " câu được biên tập lại" : "") + (" · " + _0xd2856d.attempts + " lượt gọi · ~" + _0xd2856d.estTokens + " tokens."));
      }
      let _0x1de3e7 = {};
      for (let _0x101a41 of _0x589d55) {
        let _0x34e84a = _0x35bc0e.get(_0x101a41.id);
        if (_0x34e84a) {
          _0x1de3e7[_0x101a41.id] = {
            listenerId: _0x34e84a.listenerId,
            confidence: _0x34e84a.confidence,
            decisionId: _0x34e84a.decisionId || null,
            evidence: _0x34e84a.evidence || null
          };
        }
      }
      return {
        translations: _0x585587,
        ids: _0x164d92,
        suspects: _0x164d92.filter(_0x17c6a7 => _0x36cd4e[_0x17c6a7] === "suspect"),
        statuses: _0x36cd4e,
        dubbing: _0x5e1167,
        budgets: _0x200941,
        listeners: _0x1de3e7,
        detectedSourceLang: _0x5da496.lang,
        bible: _0x1c0fad,
        bibleConflicts: _0x133747
      };
    }
  };
  _0x315316.exports = {
    DeepSeekTranslator: _0x360e49,
    buildRetryContext: _0x101d48,
    bibleIsEmpty: _0x38cdea
  };
});
var qn = Z((_0x123854, _0x39eb34) => {
  var _0xbe6f5f = class {
    constructor(_0x1a9fbf, _0x3377c2) {
      this.limit = _0x1a9fbf;
      this.windowMs = _0x3377c2;
      this.stamps = [];
      this._chain = Promise.resolve();
    }
    acquire() {
      let _0x2e5988 = this._chain.then(() => this._waitForSlot());
      this._chain = _0x2e5988.catch(() => {});
      return _0x2e5988;
    }
    async _waitForSlot() {
      while (true) {
        let _0x53f42a = Date.now();
        while (this.stamps.length && _0x53f42a - this.stamps[0] >= this.windowMs) {
          this.stamps.shift();
        }
        if (this.stamps.length < this.limit) {
          this.stamps.push(_0x53f42a);
          return;
        }
        let _0x1187ea = this.stamps[0] + this.windowMs - _0x53f42a;
        await new Promise(_0x36c7f0 => setTimeout(_0x36c7f0, Math.max(_0x1187ea, 25)));
      }
    }
  };
  var _0x54c819 = null;
  function _0xb472dc() {
    _0x54c819 ||= new _0xbe6f5f(60, 60000);
    return _0x54c819;
  }
  var _0x2863d8 = 10000;
  var _0x4ad35f = 10;
  function _0x55f887(_0x505d4f, _0x343c44, _0x259b62 = {}) {
    let _0x570223 = _0x259b62.sleepFn || (_0x2a0948 => new Promise(_0x10a942 => setTimeout(_0x10a942, _0x2a0948)));
    let _0x301ef9 = _0x259b62.maxRetries ?? _0x4ad35f;
    let _0x169b3e = _0x259b62.retryDelayMs ?? _0x2863d8;
    return {
      post: async (..._0x12e9b0) => {
        for (let _0xfd389d = 0;; _0xfd389d++) {
          await _0x343c44.acquire();
          try {
            return await _0x505d4f.post(..._0x12e9b0);
          } catch (_0xdfc64c) {
            if ((_0xdfc64c && _0xdfc64c.response && _0xdfc64c.response.status) !== 429 || _0xfd389d >= _0x301ef9) {
              throw _0xdfc64c;
            }
            if (_0x259b62.onRetry) {
              _0x259b62.onRetry(_0xfd389d + 1, _0x301ef9);
            }
            await _0x570223(_0x169b3e);
          }
        }
      }
    };
  }
  _0x39eb34.exports = {
    SlidingWindowRateLimiter: _0xbe6f5f,
    getEzmaxLimiter: _0xb472dc,
    rateLimitedHttp: _0x55f887,
    EZMAX_REQUESTS_PER_MINUTE: 60,
    EZMAX_429_RETRY_DELAY_MS: _0x2863d8,
    EZMAX_429_MAX_RETRIES: _0x4ad35f
  };
});
var Qn = Z((_0x5098fd, _0x4af68e) => {
  var _0x62110d = {
    ICL_en_female_jiaoao: "7530105822785899777",
    ICL_en_female_guanggao: "7530107275239869713",
    ICL_es_male_barney: "7527795878967446801",
    ICL_es_male_elmo: "7527814111502044433",
    ICL_es_male_cixing: "7527779392769002769",
    ICL_es_female_dianpo: "7527846655475928336",
    ICL_es_male_dorado: "7527778973296774416",
    ICL_es_female_dianyingpeiyin: "7527793325328452881",
    ICL_es_male_taici: "7522965008020507920",
    ICL_ja_female_laopopo: "7522976550736710913",
    ICL_ja_female_kuaizui02: "7522976550736678145",
    ICL_ja_female_shuanglang: "7522987643752303889",
    ICL_jp_female_jidongshaonv: "7522965008020475152",
    ICL_ja_male_gaoxiao: "7522976550736661761",
    ICL_ja_male_gaoxiao02: "7522987643752271121",
    ICL_en_male_callum: "7377653510566842881",
    en_us_002: "7130515992936976897",
    ICL_en_female_blanchett: "7444495548188463633",
    ICL_en_female_cc_bluetooth: "7427072447129588225",
    ICL_en_female_cc_megan: "7427044231073501712",
    ICL_en_female_chamberlain: "7444914314399453697",
    ICL_en_female_cm: "7441487929823728129",
    ICL_en_female_erica: "7444495148345463312",
    ICL_en_male_alastor: "7441487821946229265",
    ICL_en_male_attenborough: "7444495251286266385",
    ICL_en_male_aussie: "7426305396572164625",
    ICL_en_male_benjamin1: "7441488473686544897",
    ICL_en_male_benjamin2: "7441488683091366417",
    ICL_en_male_cc_chucky: "7427044129604899345",
    ICL_en_male_cc_dracula: "7427044330260402705",
    ICL_en_male_cc_ghostface4: "7427044378666865153",
    ICL_en_male_cc_jigsaw: "7427044277407978000",
    ICL_en_male_cc_lich: "7437470599682724369",
    ICL_en_male_cc_penny: "7427044180876071425",
    ICL_en_male_cc_rafael: "7437470496397988369",
    ICL_en_male_conductor1: "7438551500021830161",
    ICL_en_male_cumberbatch1: "7444495363311931920",
    ICL_en_male_cumberbatch2: "7444495463908119056",
    ICL_en_male_frosty1: "7438551726942065169",
    ICL_en_male_grinch2: "7438551356283032081",
    ICL_en_male_henry1: "7444494768240857616",
    ICL_en_male_henry2: "7444495042649002513",
    ICL_en_male_kevin2: "7438551246824280592",
    ICL_en_male_oogie2: "7438551608746578449",
    ICL_en_male_poetry: "7413601846863860225",
    ICL_en_male_severus: "7441487635048043009",
    ICL_en_male_sylus: "7403211571293327873",
    ICL_en_male_terrell: "7441488151983428097",
    ICL_en_male_xavier1: "7424050549269467649",
    ICL_en_male_zayne: "7424050504138756624",
    en_au_001: "7114563482472698370",
    en_au_002: "7114564716881515010",
    en_female_amie: "7306800306921148929",
    en_female_betty_boop: "7393229135348240913",
    en_female_british_queen: "7337195844971532801",
    en_female_candice_emo_v2_mars_bigtts: "7417662874270568961",
    en_female_caroline_clone2: "7232136837861478913",
    en_female_cartoon_bibble: "7379873499717833233",
    en_female_daisy_moon_bigtts: "7278146659211547138",
    en_female_doll: "7293115626711683585",
    en_female_drunk_bumpkin: "7360987195986940432",
    en_female_dwarf_karen: "7393231992759783953",
    en_female_elsa_amanda_crystal: "7328236234780709377",
    en_female_f08_salut_damour: "7245192978749198849",
    en_female_f08_twinkle: "7245192372613550594",
    en_female_f08_warmy_breeze: "7245192865905644033",
    en_female_food_amy: "7337195373867307522",
    en_female_fortune_feimster: "7360987978455323137",
    en_female_game_narration: "7351731040093737473",
    en_female_gloria: "7337195915368731138",
    en_female_grandma_amy: "7337195773446066690",
    en_female_ht_f08_halloween: "7245192656358216193",
    en_female_kid_eddie: "7337195145680392706",
    en_female_kourtney_kardashian: "7372473107635769872",
    en_female_loba_apex: "7360986396594541057",
    en_female_lois_familyguy: "7355036507519848961",
    en_female_makeup: "7256999130084413954",
    en_female_mary_emo_v2_mars_bigtts: "7430714470969643521",
    en_female_meangirl: "7351730508037886481",
    en_female_nail_artist: "7393228944540963344",
    en_female_naive_youngwoman: "7372472718723125761",
    en_female_nara_moon_bigtts: "7402094928337048065",
    en_female_onez_moon_bigtts: "7402094869667123729",
    en_female_product_darcie_moon_bigtts: "7337195598900105729",
    en_female_product_elise: "7337195523163558401",
    en_female_product_leah: "7337195678558327297",
    en_female_richgirl_stream: "7189462696201294338",
    en_female_samc: "7176107981098979841",
    en_female_sherry: "7278146554844680706",
    en_female_sinong_conversation_wvae_bigtts: "7372472342494056976",
    en_female_skye_emo_v2_mars_bigtts: "7430714795206119937",
    en_female_weak_child: "7393229078951629313",
    en_female_werewolf: "7293115150263915009",
    en_female_witch: "7293115285471498754",
    en_female_zombie: "7293115536584479233",
    en_male_adam_elf: "7309753082638766593",
    en_male_artistic_layne: "7337195454980952577",
    en_male_authoritative_marcus: "7393232129296962049",
    en_male_bender_futurama: "7360986724681388560",
    en_male_bojack_horseman: "7372472892174373377",
    en_male_british_narrator: "7360987855176339984",
    en_male_britishgamer: "7249264251536151042",
    en_male_bruce_moon_bigtts: "7398059612643004945",
    en_male_bumbling_idiot: "7337195992237740546",
    en_male_campaign_jamal_moon_bigtts: "7337194574688817666",
    en_male_charlie_conversation_wvae_bigtts_cc: "7371352611217216017",
    en_male_cody: "7176107532534944258",
    en_male_commentary_moon_bigtts: "7277818843358040578",
    en_male_corey_emo_v2_mars_bigtts: "7417663340761059856",
    en_male_cs_emo_v2_mars_bigtts: "7430714574728335888",
    en_male_dave_moon_bigtts: "7398059458733019665",
    en_male_david_gingerman: "7309752196122284545",
    en_male_deadpool: "7231025912261644802",
    en_male_death_rock: "7372472588859085313",
    en_male_drag_voice: "7355036740215640593",
    en_male_dramaqueen_zachk: "7337195243810329089",
    en_male_forrest_gump: "7372473041797779969",
    en_male_funny: "7114563483378651650",
    en_male_gebralter_apex: "7379905121657819664",
    en_male_glen_emo_v2_mars_bigtts: "7417662783333863953",
    en_male_golden_monkey: "7351730917590700545",
    en_male_greek_accent: "7351730796933157377",
    en_male_grumpy_penguin: "7360987676440269328",
    en_male_hades_moon_bigtts: "7398059512415916561",
    en_male_hoarse_mattmc: "7338752878611272194",
    en_male_homer_simpson: "7360987557812769296",
    en_male_irritable_kitten: "7379873622745158161",
    en_male_irritable_police_officer: "7355036625488843280",
    en_male_jarvis: "7249264092781744641",
    en_male_jeremy_emo_v2_mars_bigtts: "7430714636921475601",
    en_male_john_mulaney: "7360987403995058689",
    en_male_johnny_emo_v2_mars_bigtts: "7430714522609914384",
    en_male_kevin_minion: "7393228840861962769",
    en_male_leonardo_decaprio: "7360987035974242833",
    en_male_lowpitched_shouting: "7393228776978518529",
    en_male_m03_classical: "7245192458206712322",
    en_male_m2_xhxs_m03_christmas: "7245192557322310145",
    en_male_m2_xhxs_m03_silly: "7245192771231814145",
    en_male_michael_moon_bigtts: "7398059563758391825",
    en_male_narration_moon_bigtts: "7114563483210879490",
    en_male_peter_griffin: "7372472973485150721",
    en_male_positive_british: "7355036978116563473",
    en_male_positiveboy_duncan: "7337194306685374978",
    en_male_rick_sanchez: "7379873380536685072",
    en_male_scott_emo_v2_mars_bigtts: "7457793197306024449",
    en_male_sports_jomboy: "7337195054290702850",
    en_male_stewie_familyguy: "7360987300609659393",
    en_male_story_time: "7372472502842298897",
    en_male_tech_blogger: "7372473177747755537",
    en_male_ted_lasso: "7379873236122604033",
    en_male_tim_emo_v2_mars_bigtts: "7430714745574920720",
    en_male_trickster_stream: "7189462618589893121",
    en_male_ukbutler: "7256999218185769473",
    en_male_ukneighbor: "7256999312872182274",
    en_male_vernacular_plinio: "7393232053258424848",
    en_male_whispering_voice: "7355037095066341904",
    en_male_will_clone2: "7232136973664653825",
    en_male_xudong_conversation_wvae_bigtts_cc: "7371352319541121553",
    en_uk_003: "7114563482363630082",
    en_us_006: "7114563482518819329",
    en_us_007: "7114563482472681986",
    en_us_009: "7114563482418156033",
    en_us_010: "7114563482359435778"
  };
  var _0x587609 = {
    Trung_Caha: "ueSxRO0nLF1bj93J2hVt",
    Nam_Tram: "9EE00wK5qV6tPtpQIxvy",
    Ly_Nam: "7hsfEc7irDn6E8br0qfw",
    Duy_Bac: "1d5Bb0SMBPB10Gx6iQeu",
    Ha_Nu: "pGapy9MNHCukzJtjavF0",
    Sai_Nu: "xPEfmymXC4WdBxGMznS7"
  };
  _0x4af68e.exports = {
    ICL_RESOURCE_IDS: _0x62110d,
    VN_HASH_SPEAKERS: _0x587609
  };
});
var uo = Z((_0xcc3067, _0x40c2ed) => {
  var _0x2256d0 = require("axios");
  var _0xd6d70 = require("node:fs");
  var _0x547a2a = require("node:crypto");
  var _0x20bb2d = require("ws");
  var _0x54b8d0 = require("node:os");
  var _0x12a590 = require("node:path");
  var _0x412ebd = "https://edit-api-sg.capcut.com/lv/v1/common/tts/token";
  var _0x2c4433 = "https://edit-api-sg.capcut.com/storyboard/v1/tts/multi_platform";
  var _0x8011d8 = "wss://sami-sg1.byteintlapi.com/internal/api/v1/ws";
  var _0x5a48c0 = "https://edit-api-sg.capcut.com/lv/v2/intelligence/tts/get_audition";
  var _0x3dca62 = "9e2c";
  var _0x370d3b = "11ac";
  var _0x2879f4 = "5.8.0";
  var _0x28aec9 = "7";
  var _0x16b51e = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";
  var _0x11a233 = 19800000;
  var _0x2ea900 = 60000;
  var {
    ICL_RESOURCE_IDS: _0x23da41,
    VN_HASH_SPEAKERS: _0x4351ff
  } = Qn();
  var _0x327fea = class {
    constructor() {
      this.cookies = new Map();
    }
    addCookies(_0x1da0e5) {
      if (!_0x1da0e5) {
        return;
      }
      let _0x2e6ffb = Array.isArray(_0x1da0e5) ? _0x1da0e5 : [_0x1da0e5];
      for (let _0x4061f1 of _0x2e6ffb) {
        let _0x2e8f3a = _0x4061f1.split(";")[0].split("=");
        if (_0x2e8f3a.length >= 2) {
          let _0x57729f = _0x2e8f3a[0].trim();
          let _0x299de4 = _0x2e8f3a.slice(1).join("=").trim();
          this.cookies.set(_0x57729f, _0x299de4);
        }
      }
    }
    getCookieString() {
      let _0x31c94b = [];
      for (let [_0x14040b, _0x545930] of this.cookies.entries()) {
        _0x31c94b.push(_0x14040b + "=" + _0x545930);
      }
      return _0x31c94b.join("; ");
    }
  };
  function _0x4a3682() {
    let _0x86abe1 = Date.now().toString();
    let _0x55f81a = "";
    for (let _0x356535 = 0; _0x356535 < 12; _0x356535++) {
      _0x55f81a += Math.floor(Math.random() * 10).toString();
    }
    return (_0x86abe1 + _0x55f81a).slice(0, 19);
  }
  function _0x846af3() {
    let _0x3cc061 = Date.now().toString();
    let _0x35f8cb = "";
    for (let _0x286761 = 0; _0x286761 < 8; _0x286761++) {
      _0x35f8cb += Math.floor(Math.random() * 10).toString();
    }
    return (_0x3cc061 + _0x35f8cb).slice(0, 17);
  }
  function _0x257739(_0x22a38d, _0x4f6301) {
    let _0x1738eb = _0x22a38d.slice(-7);
    let _0x42d641 = Math.floor(Date.now() / 1000).toString();
    let _0x1f1744 = _0x3dca62 + "|" + _0x1738eb + "|" + _0x28aec9 + "|" + _0x2879f4 + "|" + _0x42d641 + "|" + _0x4f6301 + "|" + _0x370d3b;
    return {
      sign: _0x547a2a.createHash("md5").update(_0x1f1744, "utf8").digest("hex").toLowerCase(),
      deviceTime: _0x42d641
    };
  }
  var _0x151a4c = _0x12a590.join(_0x54b8d0.tmpdir(), "ezmaxsub_capcut_session.json");
  var _0x56b1de = null;
  function _0x5d1502() {
    try {
      let _0x4b2488 = JSON.parse(_0xd6d70.readFileSync(_0x151a4c, "utf8"));
      if (_0x4b2488 && _0x4b2488.token && _0x4b2488.ts && Date.now() - _0x4b2488.ts < _0x11a233) {
        return _0x4b2488;
      }
    } catch {}
    return null;
  }
  function _0x46de9a(_0x356720) {
    try {
      _0xd6d70.writeFileSync(_0x151a4c, JSON.stringify(_0x356720));
    } catch {}
  }
  function _0x550bfc() {
    try {
      _0xd6d70.unlinkSync(_0x151a4c);
    } catch {}
  }
  async function _0x2502c6(_0x4c9bf3 = _0x2256d0) {
    let _0x1f0b4f = _0x5d1502();
    return _0x1f0b4f || (_0x56b1de ||= (async () => {
      try {
        let _0x53fe9c = new _0x327fea();
        let _0x34790e = _0x846af3();
        let _0x479a88 = _0x4a3682();
        let _0x2bd6d4 = await _0x4c9bf3.get("https://www.capcut.com", {
          headers: {
            "User-Agent": _0x16b51e
          },
          timeout: _0x2ea900
        });
        _0x53fe9c.addCookies(_0x2bd6d4.headers["set-cookie"]);
        let {
          sign: _0x37126a,
          deviceTime: _0x292df0
        } = _0x257739("/lv/v1/common/tts/token", _0x34790e);
        let _0x3daf13 = {
          Appvr: _0x2879f4,
          "Device-Time": _0x292df0,
          Pf: _0x28aec9,
          Sign: _0x37126a,
          "Sign-Ver": "1",
          Origin: "https://www.capcut.com",
          Referer: "https://www.capcut.com/",
          "User-Agent": _0x16b51e,
          "Content-Type": "application/json",
          did: _0x479a88,
          tdid: _0x34790e,
          Cookie: _0x53fe9c.getCookieString()
        };
        let _0x598dae = await _0x4c9bf3.post(_0x412ebd, {}, {
          headers: _0x3daf13,
          timeout: _0x2ea900
        });
        _0x53fe9c.addCookies(_0x598dae.headers["set-cookie"]);
        let _0x456bcc = _0x598dae.data;
        if (_0x456bcc.ret !== 0 && _0x456bcc.ret !== "0") {
          throw new Error("CapCut token error: " + (_0x456bcc.errmsg || JSON.stringify(_0x456bcc)));
        }
        let _0x578acd = {
          token: _0x456bcc.data.token,
          appkey: _0x456bcc.data.app_key,
          tdid: _0x34790e,
          deviceId: _0x479a88,
          cookie: _0x53fe9c.getCookieString(),
          ts: Date.now()
        };
        _0x46de9a(_0x578acd);
        return _0x578acd;
      } catch (_0x4b97c8) {
        _0x56b1de = null;
        throw _0x4b97c8;
      }
    })(), _0x56b1de);
  }
  var _0x117e11 = class {
    async synthesize(_0x1ecc7a, _0x4708c2, _0x151e05, _0x2cb40f, _0x58b924 = _0x2256d0, _0xd8e094 = _0xd6d70) {
      if (!_0x1ecc7a || !_0x1ecc7a.trim()) {
        throw new Error("text is required for TTS");
      }
      _0x1ecc7a = _0x1ecc7a.toLowerCase();
      let _0x23a0ed = "icl";
      let _0x450d69 = _0x4708c2;
      if (_0x4708c2.startsWith("icl:")) {
        _0x23a0ed = "icl";
        _0x450d69 = _0x4708c2.slice(4);
      } else if (_0x4708c2.startsWith("bv:")) {
        _0x23a0ed = "bv";
        _0x450d69 = _0x4708c2.slice(3);
      } else if (_0x4708c2.startsWith("vn:")) {
        _0x23a0ed = "vn";
        _0x450d69 = _0x4708c2.slice(3);
      }
      try {
        if (_0x23a0ed === "bv") {
          await this._generateWs(_0x1ecc7a, _0x450d69, _0x151e05, _0x2cb40f, _0x58b924);
        } else if (_0x23a0ed === "vn") {
          await this._generateAudition(_0x1ecc7a, _0x450d69, _0x151e05, _0x2cb40f, _0x58b924, _0xd8e094);
        } else {
          await this._generateMp(_0x1ecc7a, _0x450d69, _0x151e05, _0x2cb40f, _0x58b924, _0xd8e094);
        }
      } catch (_0x3041d4) {
        _0x550bfc();
        throw _0x3041d4;
      }
    }
    async _generateMp(_0x3a87dd, _0x34a40b, _0x2daa37, _0x45d677, _0x50b71e, _0x478625) {
      let {
        token: _0xcd38ac,
        appkey: _0x4d7c20,
        tdid: _0xc989e6,
        deviceId: _0x90888b,
        cookie: _0x2b473a
      } = await _0x2502c6(_0x50b71e);
      let _0x23e6f9 = _0x23da41[_0x34a40b] || "";
      let _0x23900c = {
        texts: [_0x3a87dd],
        tts_conf: {
          speaker: _0x34a40b,
          rate: _0x2daa37,
          volume: 100,
          name: _0x34a40b,
          platform: "sami",
          effect_id: _0x23e6f9,
          resource_id: _0x23e6f9,
          is_clone: false
        },
        need_url: true,
        token: _0xcd38ac,
        appkey: _0x4d7c20
      };
      let {
        sign: _0x40f015,
        deviceTime: _0x317038
      } = _0x257739("/storyboard/v1/tts/multi_platform", _0xc989e6);
      let _0x50d51c = {
        Appvr: _0x2879f4,
        "Device-Time": _0x317038,
        Pf: _0x28aec9,
        Sign: _0x40f015,
        "Sign-Ver": "1",
        Origin: "https://www.capcut.com",
        Referer: "https://www.capcut.com/",
        "User-Agent": _0x16b51e,
        "Content-Type": "application/json",
        did: _0x90888b,
        tdid: _0xc989e6,
        Cookie: _0x2b473a
      };
      let _0x4579d4 = await _0x50b71e.post(_0x2c4433, _0x23900c, {
        headers: _0x50d51c,
        timeout: _0x2ea900
      });
      if (_0x4579d4.status !== 200) {
        throw new Error("CapCut TTS HTTP " + _0x4579d4.status);
      }
      let _0x49268e = _0x4579d4.data;
      let _0xad7aa5 = String(_0x49268e?.ret ?? -1);
      if (_0xad7aa5 !== "0") {
        throw new Error("CapCut TTS error " + _0xad7aa5 + ": " + (_0x49268e?.errmsg || JSON.stringify(_0x49268e)));
      }
      let _0x57911 = _0x49268e?.data?.tts_materials;
      if (!_0x57911 || !_0x57911[0]) {
        throw new Error("CapCut TTS: no audio materials returned");
      }
      let _0x28870c = _0x57911[0].meta_data || {};
      let _0x2a2931 = _0x28870c.status || "";
      let _0x2eef46 = _0x28870c.err_code || 0;
      if (_0x2a2931 === "failed" && _0x2eef46 === 40402004) {
        throw new Error("🔐 CapCut VIP required! Voice '" + _0x34a40b + "' requires a paid CapCut account.");
      }
      let _0x52d68c = _0x28870c.url || "";
      if (!_0x52d68c) {
        throw new Error("CapCut TTS: no audio URL (status=" + _0x2a2931 + ", errCode=" + _0x2eef46 + ")");
      }
      let _0x48e0bb = await _0x50b71e.get(_0x52d68c, {
        responseType: "arraybuffer",
        timeout: _0x2ea900
      });
      if (_0x48e0bb.status !== 200) {
        throw new Error("CapCut audio download HTTP " + _0x48e0bb.status);
      }
      _0x478625.writeFileSync(_0x45d677, Buffer.from(_0x48e0bb.data));
      if (_0x478625.statSync(_0x45d677).size < 100) {
        throw new Error("CapCut TTS: audio file too small");
      }
    }
    async _generateAudition(_0x4bee09, _0x3a842a, _0x5213eb, _0x415503, _0x8f9791, _0x58e31c) {
      let {
        token: _0x15d25a,
        appkey: _0x3520c9,
        tdid: _0x47b72b,
        deviceId: _0xffcd54,
        cookie: _0x55c2e0
      } = await _0x2502c6(_0x8f9791);
      let _0x326417 = _0x4351ff[_0x3a842a];
      if (!_0x326417) {
        throw new Error("CapCut VN: unknown voice '" + _0x3a842a + "'");
      }
      let _0x3545b4 = {
        platform: 2,
        speaker: _0x326417,
        text: _0x4bee09,
        audio_config: {
          speech_rate: 0,
          pitch_rate: 0
        },
        lan: "vi"
      };
      let {
        sign: _0x20fa19,
        deviceTime: _0x1a8d1d
      } = _0x257739("/lv/v2/intelligence/tts/get_audition", _0x47b72b);
      let _0x573a7c = {
        Appvr: _0x2879f4,
        "Device-Time": _0x1a8d1d,
        Pf: _0x28aec9,
        Sign: _0x20fa19,
        "Sign-Ver": "1",
        Origin: "https://www.capcut.com",
        Referer: "https://www.capcut.com/",
        "User-Agent": _0x16b51e,
        "Content-Type": "application/json",
        did: _0xffcd54,
        tdid: _0x47b72b,
        Cookie: _0x55c2e0
      };
      let _0x100029 = await _0x8f9791.post(_0x5a48c0, _0x3545b4, {
        headers: _0x573a7c,
        timeout: _0x2ea900
      });
      if (_0x100029.status !== 200) {
        throw new Error("CapCut VN HTTP " + _0x100029.status);
      }
      let _0x51793b = _0x100029.data;
      let _0x3b323c = String(_0x51793b?.ret ?? -1);
      if (_0x3b323c !== "0") {
        throw new Error("CapCut VN error " + _0x3b323c + ": " + (_0x51793b?.errmsg || JSON.stringify(_0x51793b)));
      }
      let _0x11ace0 = _0x51793b?.data?.url || "";
      if (!_0x11ace0) {
        throw new Error("CapCut VN: no audio URL in response");
      }
      let _0x370582 = await _0x8f9791.get(_0x11ace0, {
        responseType: "arraybuffer",
        timeout: _0x2ea900
      });
      if (_0x370582.status !== 200) {
        throw new Error("CapCut VN audio download HTTP " + _0x370582.status);
      }
      _0x58e31c.writeFileSync(_0x415503, Buffer.from(_0x370582.data));
      if (_0x58e31c.statSync(_0x415503).size < 100) {
        throw new Error("CapCut VN: audio file too small");
      }
    }
    _generateWs(_0x167e63, _0x579f6e, _0x2614dd, _0x22e8bf, _0x8926fd) {
      return new Promise(async (_0x1155ca, _0x4ed3a0) => {
        let _0x2a2f8e;
        let _0x4d1eef;
        try {
          let _0x55fc72 = await _0x2502c6(_0x8926fd);
          _0x2a2f8e = _0x55fc72.token;
          _0x4d1eef = _0x55fc72.appkey;
        } catch (_0x1b3c4a) {
          return _0x4ed3a0(_0x1b3c4a);
        }
        let _0x2f9a4a = new _0x20bb2d(_0x8011d8);
        let _0x27c90e = [];
        let _0x39c789 = null;
        let _0x13cd96 = false;
        let _0x32d34c = () => {
          if (_0x39c789) {
            clearTimeout(_0x39c789);
          }
          try {
            _0x2f9a4a.close();
          } catch {}
        };
        let _0xe33b96 = _0x3d128b => _0xce96fb(_0x1155ca, _0x3d128b);
        let _0x289b62 = _0x78cf64 => _0xce96fb(_0x4ed3a0, _0x78cf64);
        let _0xce96fb = (_0x5a6ca4, _0x329a5a) => {
          if (!_0x13cd96) {
            _0x13cd96 = true;
            _0x32d34c();
            if (_0x5a6ca4) {
              _0x4ed3a0(_0x5a6ca4);
            } else {
              _0x1155ca(_0x329a5a);
            }
          }
        };
        _0x39c789 = setTimeout(() => {
          _0xce96fb(new Error("CapCut WS: timeout after 60 seconds"));
        }, 60000);
        _0x2f9a4a.on("open", () => {
          let _0x3dcab1 = JSON.stringify({
            text: _0x167e63,
            speaker: _0x579f6e,
            pitch: 10,
            speed: Math.round(_0x2614dd * 10),
            volume: 10,
            rate: 24000,
            appid: "348188"
          });
          let _0x36c339 = JSON.stringify({
            token: _0x2a2f8e,
            appkey: _0x4d1eef,
            namespace: "TTS",
            event: "StartTask",
            payload: _0x3dcab1
          });
          _0x2f9a4a.send(_0x36c339);
        });
        _0x2f9a4a.on("message", (_0x278c85, _0x19b317) => {
          if (_0x19b317) {
            try {
              let _0x4bcc18 = _0x278c85.toString("utf8");
              let _0x5d25eb = JSON.parse(_0x4bcc18);
              _0x32340b(_0x5d25eb);
            } catch {
              _0x27c90e.push(_0x278c85);
            }
          } else {
            try {
              let _0x444e39 = _0x278c85.toString("utf8");
              let _0x219624 = JSON.parse(_0x444e39);
              _0x32340b(_0x219624);
            } catch {}
          }
        });
        function _0x32340b(_0x4dd06f) {
          let _0x54c26c = _0x4dd06f.event;
          if (_0x54c26c === "TaskFinished") {
            if (_0x27c90e.length === 0) {
              _0xce96fb(new Error("CapCut WS: no audio received"));
            } else {
              try {
                let _0x3dc463 = Buffer.concat(_0x27c90e);
                _0xd6d70.writeFileSync(_0x22e8bf, _0x3dc463);
                _0xce96fb(null, _0x22e8bf);
              } catch (_0x49ed65) {
                _0xce96fb(_0x49ed65);
              }
            }
          } else if (_0x54c26c === "TaskFailed") {
            _0xce96fb(new Error("CapCut WS task failed: " + (_0x4dd06f.status_text || JSON.stringify(_0x4dd06f))));
          }
        }
        _0x2f9a4a.on("error", _0x504946 => {
          _0xce96fb(_0x504946);
        });
        _0x2f9a4a.on("close", () => {
          _0xce96fb(new Error("CapCut WS: connection closed before task finished"));
        });
      });
    }
  };
  _0x40c2ed.exports = {
    CapcutTTS: _0x117e11
  };
});
var po = Z((_0x53fa15, _0x12c07e) => {
  var {
    execFile: _0x3903b8
  } = require("node:child_process");
  function _0x3ae1b5(_0x544388) {
    let _0x451924 = Math.trunc(((_0x544388 || 1) - 1) * 100);
    return "" + (_0x451924 >= 0 ? "+" : "") + _0x451924 + "%";
  }
  function _0x3ab89a(_0x588513) {
    let _0x44eb79 = (process.env.EZMAXSUB_PYTHON_BIN || "").trim();
    if (_0x44eb79) {
      return {
        file: _0x44eb79,
        args: ["-B", "-m", "edge_tts", ..._0x588513]
      };
    } else {
      return {
        file: "edge-tts",
        args: _0x588513
      };
    }
  }
  var _0x277f1d = class {
    async synthesize(_0x5849a8, _0x3ed4cf, _0x34ee88, _0x2d14b9) {
      let _0x460dc1 = _0x3ae1b5(_0x34ee88);
      let {
        file: _0x4d1dbd,
        args: _0x14003d
      } = _0x3ab89a(["--voice=" + _0x3ed4cf, "--text=" + _0x5849a8, "--rate=" + _0x460dc1, "--write-media=" + _0x2d14b9]);
      return new Promise((_0x433d21, _0x5dffb1) => {
        _0x3903b8(_0x4d1dbd, _0x14003d, {
          timeout: 120000
        }, _0x136631 => _0x136631 ? _0x5dffb1(_0x136631) : _0x433d21());
      });
    }
  };
  _0x12c07e.exports = {
    EdgeTTS: _0x277f1d,
    edgeCommand: _0x3ab89a
  };
});
var bo = Z((_0x12c41f, _0x1ae7bb) => {
  var _0x3ada4b = require("axios");
  var _0x3f8425 = require("node:fs");
  var _0x321ff3 = "https://api.fpt.ai/hmi/tts/v5";
  var _0x34608e = 2000;
  var _0xe34916 = 90000;
  var _0x4cdd52 = 60000;
  var _0x51788a = class {
    constructor(_0x328c7a) {
      this.apiKey = _0x328c7a;
    }
    mapSpeed(_0x4bd570) {
      if (_0x4bd570 <= 0.4) {
        return "-3";
      } else if (_0x4bd570 <= 0.6) {
        return "-2";
      } else if (_0x4bd570 <= 0.8) {
        return "-1";
      } else if (_0x4bd570 <= 1.2) {
        return "0";
      } else if (_0x4bd570 <= 1.5) {
        return "1";
      } else if (_0x4bd570 <= 1.8) {
        return "2";
      } else {
        return "3";
      }
    }
    async synthesize(_0x4fe74d, _0x2d36b8, _0x1d674e, _0x445ca8, _0x40a29b = _0x3ada4b, _0x2279f1 = _0x3f8425) {
      if (!this.apiKey) {
        throw new Error("No FPT API key configured");
      }
      let _0x31a246 = (await _0x40a29b.post(_0x321ff3, _0x4fe74d, {
        headers: {
          "api-key": this.apiKey,
          voice: _0x2d36b8,
          speed: this.mapSpeed(_0x1d674e),
          format: "mp3",
          "Content-Type": "text/plain"
        },
        timeout: _0x4cdd52
      })).data?.async;
      if (!_0x31a246) {
        throw new Error("FPT TTS: no async URL returned");
      }
      let _0x597535 = Date.now();
      while (Date.now() - _0x597535 < _0xe34916) {
        let _0x1300d2 = await _0x40a29b.get(_0x31a246, {
          responseType: "arraybuffer",
          timeout: _0x4cdd52,
          validateStatus: () => true
        });
        if (_0x1300d2.status === 200 && _0x1300d2.data.byteLength > 500) {
          _0x2279f1.writeFileSync(_0x445ca8, Buffer.from(_0x1300d2.data));
          return;
        }
        await new Promise(_0x3066ce => setTimeout(_0x3066ce, _0x34608e));
      }
      throw new Error("FPT TTS timeout");
    }
  };
  _0x1ae7bb.exports = {
    FptTTS: _0x51788a
  };
});
var yo = Z((_0x239280, _0x45f295) => {
  var _0x1d65b5 = require("axios");
  var _0x21b670 = require("node:fs");
  var _0x11d265 = 60000;
  var _0x5796a0 = class {
    constructor(_0x386225) {
      this.apiKey = _0x386225;
    }
    parseKey() {
      let _0x4fa6b4 = (this.apiKey || "").split("|");
      if (_0x4fa6b4.length < 2) {
        throw new Error("Invalid Vbee API key format (expected APP_ID|TOKEN)");
      }
      return {
        appId: _0x4fa6b4[0],
        token: _0x4fa6b4.slice(1).join("|")
      };
    }
    async synthesize(_0x3c38d2, _0x4ef455, _0x7a2a1c, _0x2da90e, _0x2c9278 = _0x1d65b5, _0x18aa79 = _0x21b670) {
      let {
        appId: _0x3d8c7b,
        token: _0x59fb80
      } = this.parseKey();
      let _0x20321a = (await _0x2c9278.post("https://vbee.vn/api/v1/tts", {
        app_id: _0x3d8c7b,
        input_text: _0x3c38d2,
        voice_code: _0x4ef455,
        audio_type: "mp3",
        speed_rate: String(_0x7a2a1c),
        bitrate: 128,
        response_type: "indirect",
        callback_url: "https://vbee.vn/callback"
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + _0x59fb80
        },
        timeout: _0x11d265
      })).data?.request_id;
      if (!_0x20321a) {
        throw new Error("Vbee TTS: no request_id");
      }
      let _0x24e820 = Date.now();
      while (Date.now() - _0x24e820 < 90000) {
        let _0x5e8c9f = await _0x2c9278.get("https://vbee.vn/api/v1/tts/" + _0x20321a, {
          headers: {
            Authorization: "Bearer " + _0x59fb80
          },
          timeout: _0x11d265
        });
        let _0x11a0df = _0x5e8c9f.data?.audio_link || _0x5e8c9f.data?.audio_url;
        if (_0x11a0df) {
          let _0x1c236d = await _0x2c9278.get(_0x11a0df, {
            responseType: "arraybuffer",
            timeout: _0x11d265
          });
          _0x18aa79.writeFileSync(_0x2da90e, Buffer.from(_0x1c236d.data));
          return;
        }
        let _0x403cb0 = _0x5e8c9f.data?.status;
        if (_0x403cb0 === "FAILED" || _0x403cb0 === "ERROR") {
          throw new Error("Vbee TTS failed");
        }
        await new Promise(_0x16b7f1 => setTimeout(_0x16b7f1, 2000));
      }
      throw new Error("Vbee TTS timeout");
    }
  };
  _0x45f295.exports = {
    VbeeTTS: _0x5796a0
  };
});
var To = Z((_0x299917, _0x1d7712) => {
  var _0x3fae24 = require("axios");
  var _0x3a35e9 = require("node:fs");
  var _0x408fb2 = 60000;
  var _0xdd88d0 = class _0x23db2 {
    constructor(_0x389cd3) {
      this.apiKey = _0x389cd3;
    }
    clampSpeed(_0x4edd87) {
      return Math.min(1.2, Math.max(0.8, _0x4edd87));
    }
    static MAX_INPUT_CHARS = 2000;
    assertLengthOk(_0x4480ed) {
      let _0x152f0d = String(_0x4480ed || "");
      if (_0x152f0d.length > _0x23db2.MAX_INPUT_CHARS) {
        throw new Error("Zalo AI chỉ đọc tối đa " + _0x23db2.MAX_INPUT_CHARS + " ký tự mỗi lần (đoạn này " + _0x152f0d.length + "). Hãy tách đoạn ngắn hơn hoặc chọn engine khác — trước đây phần vượt quá bị cắt âm thầm.");
      }
      return _0x152f0d;
    }
    async synthesize(_0x475bb4, _0x23afcb, _0x22e69b, _0x28f1f3, _0x2e7fa3 = _0x3fae24, _0x54e7ee = _0x3a35e9) {
      if (!this.apiKey) {
        throw new Error("No Zalo API key");
      }
      let _0x49af1d = new URLSearchParams({
        input: this.assertLengthOk(_0x475bb4),
        speaker_id: String(_0x23afcb),
        speed: String(this.clampSpeed(_0x22e69b)),
        encode_type: "1",
        quality: "0"
      });
      let _0xca46f7 = (await _0x2e7fa3.post("https://api.zalo.ai/v1/tts/synthesize", _0x49af1d.toString(), {
        headers: {
          apikey: this.apiKey,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: _0x408fb2
      })).data?.data?.url;
      if (!_0xca46f7) {
        throw new Error("Zalo TTS: no audio URL");
      }
      let _0x472de2 = await _0x2e7fa3.get(_0xca46f7, {
        responseType: "arraybuffer",
        timeout: _0x408fb2
      });
      _0x54e7ee.writeFileSync(_0x28f1f3, Buffer.from(_0x472de2.data));
    }
  };
  _0x1d7712.exports = {
    ZaloTTS: _0xdd88d0
  };
});
var vo = Z((_0x325b7b, _0x548083) => {
  var _0xc3a465 = require("axios").create({
    timeout: 90000
  });
  var _0x340b8b = require("node:fs");
  var _0x49f4fe = "https://api.elevenlabs.io/v1/text-to-speech";
  var _0x3cf808 = 60000;
  function _0x3ff046(_0x1b6c4c) {
    let _0x3aca1e = _0x1b6c4c?.response?.data;
    let _0x1886d1 = null;
    try {
      let _0x49d18b = Buffer.isBuffer(_0x3aca1e) ? _0x3aca1e.toString("utf8") : _0x3aca1e instanceof ArrayBuffer ? Buffer.from(_0x3aca1e).toString("utf8") : typeof _0x3aca1e == "string" ? _0x3aca1e : null;
      if (_0x49d18b) {
        _0x1886d1 = JSON.parse(_0x49d18b).detail;
      }
    } catch {}
    if (!_0x1886d1) {
      return _0x1b6c4c;
    }
    let _0x31544b = _0x1886d1.code || _0x1886d1.status || "";
    let _0x2bed75 = _0x1b6c4c?.response?.status ?? "";
    let _0x3076a7 = ["paid_plan_required", "free_users_not_allowed", "payment_required"].some(_0x54ef9c => _0x54ef9c === _0x1886d1.code || _0x54ef9c === _0x1886d1.status) ? " (giọng thư viện ElevenLabs cần gói trả phí — Free không dùng được, có giọng cần Creator trở lên)" : "";
    _0x1b6c4c.message = ("ElevenLabs " + _0x2bed75 + " " + _0x31544b + ": " + (_0x1886d1.message || _0x1b6c4c.message) + _0x3076a7).trim();
    return _0x1b6c4c;
  }
  var _0x185d7e = class {
    constructor(_0x240fef) {
      this.apiKey = _0x240fef;
    }
    buildPayload(_0x4d06d9, _0x32c37d) {
      return {
        text: _0x4d06d9,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
          speed: _0x32c37d
        }
      };
    }
    async synthesize(_0x52c29e, _0x885b8e, _0x73650d, _0x50a387, _0x5f15c8 = _0xc3a465, _0x102b1c = _0x340b8b) {
      if (!this.apiKey) {
        throw new Error("No ElevenLabs API key");
      }
      let _0x500479 = _0x49f4fe + "/" + _0x885b8e + "?output_format=mp3_44100_128";
      let _0x3e35e4;
      try {
        _0x3e35e4 = await _0x5f15c8.post(_0x500479, this.buildPayload(_0x52c29e, _0x73650d), {
          headers: {
            "xi-api-key": this.apiKey,
            "Content-Type": "application/json"
          },
          responseType: "arraybuffer",
          timeout: _0x3cf808
        });
      } catch (_0x31ffc4) {
        throw _0x3ff046(_0x31ffc4);
      }
      _0x102b1c.writeFileSync(_0x50a387, Buffer.from(_0x3e35e4.data));
    }
  };
  _0x548083.exports = {
    ElevenLabsTTS: _0x185d7e,
    decorateError: _0x3ff046
  };
});
var xo = Z((_0x4d5d9c, _0x3108b3) => {
  var _0x9bff3d = require("axios");
  var _0x536f14 = require("node:fs");
  var _0x40f6d8 = 60000;
  var _0x270afe = class {
    constructor(_0x48dd64) {
      this.apiKey = _0x48dd64;
    }
    buildPayload(_0x46fe7f, _0x51512a, _0x407542) {
      return {
        model: "speech-2.8-hd",
        text: _0x46fe7f,
        stream: false,
        voice_setting: {
          voice_id: _0x51512a,
          speed: _0x407542,
          vol: 1,
          pitch: 0
        },
        audio_setting: {
          sample_rate: 32000,
          bitrate: 128000,
          format: "mp3",
          channel: 1
        },
        output_format: "hex",
        language_boost: "Vietnamese"
      };
    }
    decodeHexAudio(_0x3c3ba6) {
      return Buffer.from(_0x3c3ba6, "hex");
    }
    async synthesize(_0x4e3412, _0x76cffa, _0x427457, _0xde6343, _0x576c06 = _0x9bff3d, _0x196b1a = _0x536f14) {
      if (!this.apiKey) {
        throw new Error("No MiniMax API key");
      }
      let _0x2f68cc = await _0x576c06.post("https://api.minimaxi.com/v1/t2a_v2", this.buildPayload(_0x4e3412, _0x76cffa, _0x427457), {
        headers: {
          Authorization: "Bearer " + this.apiKey,
          "Content-Type": "application/json"
        },
        timeout: _0x40f6d8
      });
      let _0x195463 = _0x2f68cc.data?.base_resp;
      if (_0x195463 && _0x195463.status_code !== 0) {
        throw new Error("MiniMax TTS: " + (_0x195463.status_msg || "status " + _0x195463.status_code));
      }
      let _0x453fe9 = _0x2f68cc.data?.data?.audio;
      if (!_0x453fe9) {
        throw new Error("MiniMax TTS: no audio hex in response");
      }
      _0x196b1a.writeFileSync(_0xde6343, this.decodeHexAudio(_0x453fe9));
    }
  };
  _0x3108b3.exports = {
    MiniMaxTTS: _0x270afe
  };
});
var Ao = Z((_0x2e6489, _0xb77877) => {
  var _0x1518a6 = require("axios").create({
    timeout: 90000
  });
  var _0x2e619a = require("node:fs");
  var _0x3f57a0 = {
    fish: "fishaudio/fish-speech-1.5",
    cosy: "FunAudioLLM/CosyVoice2-0.5B"
  };
  var _0x1996fe = 60000;
  var _0x2e872c = class {
    constructor(_0x51f014) {
      this.apiKey = _0x51f014;
    }
    resolveVoice(_0x280a87) {
      let _0xeb73fa = _0x280a87.indexOf(":");
      let _0x358987 = _0xeb73fa >= 0 ? _0x280a87.slice(0, _0xeb73fa) : "fish";
      let _0x560d30 = _0xeb73fa >= 0 ? _0x280a87.slice(_0xeb73fa + 1) : _0x280a87;
      let _0x448768 = _0x3f57a0[_0x358987] || _0x3f57a0.fish;
      return {
        model: _0x448768,
        voice: _0x448768 + ":" + _0x560d30
      };
    }
    async synthesize(_0x5980e7, _0x16512d, _0x2abf75, _0x2ebb8a, _0x485b84 = _0x1518a6, _0x21866c = _0x2e619a) {
      if (!this.apiKey) {
        throw new Error("No SiliconFlow API key");
      }
      let {
        model: _0x42bd50,
        voice: _0x3e4866
      } = this.resolveVoice(_0x16512d);
      let _0x3b96f7 = await _0x485b84.post("https://api.siliconflow.com/v1/audio/speech", {
        model: _0x42bd50,
        input: _0x5980e7,
        voice: _0x3e4866,
        response_format: "mp3",
        stream: false,
        speed: _0x2abf75
      }, {
        headers: {
          Authorization: "Bearer " + this.apiKey,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer",
        timeout: _0x1996fe
      });
      _0x21866c.writeFileSync(_0x2ebb8a, Buffer.from(_0x3b96f7.data));
    }
  };
  _0xb77877.exports = {
    SiliconFlowTTS: _0x2e872c
  };
});
var Do = Z((_0x34051e, _0x22752a) => {
  var _0x3731ca = _0x513e1e => _0x513e1e.replace(/([a-z])([A-Z])/g, "$1 $2");
  var _0x45773a = [["af-ZA-AdriNeural", "F"], ["af-ZA-WillemNeural", "M"], ["am-ET-AmehaNeural", "M"], ["am-ET-MekdesNeural", "F"], ["ar-AE-FatimaNeural", "F"], ["ar-AE-HamdanNeural", "M"], ["ar-BH-AliNeural", "M"], ["ar-BH-LailaNeural", "F"], ["ar-DZ-AminaNeural", "F"], ["ar-DZ-IsmaelNeural", "M"], ["ar-EG-SalmaNeural", "F"], ["ar-EG-ShakirNeural", "M"], ["ar-IQ-BasselNeural", "M"], ["ar-IQ-RanaNeural", "F"], ["ar-JO-SanaNeural", "F"], ["ar-JO-TaimNeural", "M"], ["ar-KW-FahedNeural", "M"], ["ar-KW-NouraNeural", "F"], ["ar-LB-LaylaNeural", "F"], ["ar-LB-RamiNeural", "M"], ["ar-LY-ImanNeural", "F"], ["ar-LY-OmarNeural", "M"], ["ar-MA-JamalNeural", "M"], ["ar-MA-MounaNeural", "F"], ["ar-OM-AbdullahNeural", "M"], ["ar-OM-AyshaNeural", "F"], ["ar-QA-AmalNeural", "F"], ["ar-QA-MoazNeural", "M"], ["ar-SA-HamedNeural", "M"], ["ar-SA-ZariyahNeural", "F"], ["ar-SY-AmanyNeural", "F"], ["ar-SY-LaithNeural", "M"], ["ar-TN-HediNeural", "M"], ["ar-TN-ReemNeural", "F"], ["ar-YE-MaryamNeural", "F"], ["ar-YE-SalehNeural", "M"], ["az-AZ-BabekNeural", "M"], ["az-AZ-BanuNeural", "F"], ["bg-BG-BorislavNeural", "M"], ["bg-BG-KalinaNeural", "F"], ["bn-BD-NabanitaNeural", "F"], ["bn-BD-PradeepNeural", "M"], ["bn-IN-BashkarNeural", "M"], ["bn-IN-TanishaaNeural", "F"], ["bs-BA-GoranNeural", "M"], ["bs-BA-VesnaNeural", "F"], ["ca-ES-EnricNeural", "M"], ["ca-ES-JoanaNeural", "F"], ["cs-CZ-AntoninNeural", "M"], ["cs-CZ-VlastaNeural", "F"], ["cy-GB-AledNeural", "M"], ["cy-GB-NiaNeural", "F"], ["da-DK-ChristelNeural", "F"], ["da-DK-JeppeNeural", "M"], ["de-AT-IngridNeural", "F"], ["de-AT-JonasNeural", "M"], ["de-CH-JanNeural", "M"], ["de-CH-LeniNeural", "F"], ["de-DE-AmalaNeural", "F"], ["de-DE-ConradNeural", "M"], ["de-DE-FlorianMultilingualNeural", "M"], ["de-DE-KatjaNeural", "F"], ["de-DE-KillianNeural", "M"], ["de-DE-SeraphinaMultilingualNeural", "F"], ["el-GR-NestorasNeural", "M"], ["en-AU-NatashaNeural", "F"], ["en-AU-WilliamMultilingualNeural", "M"], ["en-CA-ClaraNeural", "F"], ["en-CA-LiamNeural", "M"], ["en-GB-LibbyNeural", "F"], ["en-GB-MaisieNeural", "F"], ["en-GB-RyanNeural", "M"], ["en-GB-SoniaNeural", "F"], ["en-GB-ThomasNeural", "M"], ["en-HK-SamNeural", "M"], ["en-HK-YanNeural", "F"], ["en-IE-ConnorNeural", "M"], ["en-IE-EmilyNeural", "F"], ["en-IN-NeerjaExpressiveNeural", "F"], ["en-IN-NeerjaNeural", "F"], ["en-IN-PrabhatNeural", "M"], ["en-KE-AsiliaNeural", "F"], ["en-KE-ChilembaNeural", "M"], ["en-NG-AbeoNeural", "M"], ["en-NG-EzinneNeural", "F"], ["en-NZ-MitchellNeural", "M"], ["en-NZ-MollyNeural", "F"], ["en-PH-JamesNeural", "M"], ["en-PH-RosaNeural", "F"], ["en-SG-LunaNeural", "F"], ["en-SG-WayneNeural", "M"], ["en-TZ-ElimuNeural", "M"], ["en-TZ-ImaniNeural", "F"], ["en-US-AnaNeural", "F"], ["en-US-AndrewMultilingualNeural", "M"], ["en-US-AndrewNeural", "M"], ["en-US-AriaNeural", "F"], ["en-US-AvaMultilingualNeural", "F"], ["en-US-AvaNeural", "F"], ["en-US-BrianMultilingualNeural", "M"], ["en-US-BrianNeural", "M"], ["en-US-ChristopherNeural", "M"], ["en-US-EmmaMultilingualNeural", "F"], ["en-US-EmmaNeural", "F"], ["en-US-EricNeural", "M"], ["en-US-GuyNeural", "M"], ["en-US-JennyNeural", "F"], ["en-US-MichelleNeural", "F"], ["en-US-RogerNeural", "M"], ["en-US-SteffanNeural", "M"], ["en-ZA-LeahNeural", "F"], ["en-ZA-LukeNeural", "M"], ["es-AR-ElenaNeural", "F"], ["es-AR-TomasNeural", "M"], ["es-BO-MarceloNeural", "M"], ["es-BO-SofiaNeural", "F"], ["es-CL-CatalinaNeural", "F"], ["es-CL-LorenzoNeural", "M"], ["es-CO-GonzaloNeural", "M"], ["es-CO-SalomeNeural", "F"], ["es-CR-JuanNeural", "M"], ["es-CR-MariaNeural", "F"], ["es-CU-BelkysNeural", "F"], ["es-CU-ManuelNeural", "M"], ["es-DO-EmilioNeural", "M"], ["es-DO-RamonaNeural", "F"], ["es-EC-AndreaNeural", "F"], ["es-EC-LuisNeural", "M"], ["es-ES-AlvaroNeural", "M"], ["es-ES-ElviraNeural", "F"], ["es-ES-XimenaNeural", "F"], ["es-GQ-JavierNeural", "M"], ["es-GQ-TeresaNeural", "F"], ["es-GT-AndresNeural", "M"], ["es-GT-MartaNeural", "F"], ["es-HN-CarlosNeural", "M"], ["es-HN-KarlaNeural", "F"], ["es-MX-DaliaNeural", "F"], ["es-MX-JorgeNeural", "M"], ["es-NI-FedericoNeural", "M"], ["es-NI-YolandaNeural", "F"], ["es-PA-MargaritaNeural", "F"], ["es-PA-RobertoNeural", "M"], ["es-PE-AlexNeural", "M"], ["es-PE-CamilaNeural", "F"], ["es-PR-KarinaNeural", "F"], ["es-PR-VictorNeural", "M"], ["es-PY-MarioNeural", "M"], ["es-PY-TaniaNeural", "F"], ["es-SV-LorenaNeural", "F"], ["es-SV-RodrigoNeural", "M"], ["es-US-AlonsoNeural", "M"], ["es-US-PalomaNeural", "F"], ["es-UY-MateoNeural", "M"], ["es-UY-ValentinaNeural", "F"], ["es-VE-PaolaNeural", "F"], ["es-VE-SebastianNeural", "M"], ["et-EE-AnuNeural", "F"], ["et-EE-KertNeural", "M"], ["fa-IR-DilaraNeural", "F"], ["fa-IR-FaridNeural", "M"], ["fi-FI-HarriNeural", "M"], ["fi-FI-NooraNeural", "F"], ["fil-PH-AngeloNeural", "M"], ["fil-PH-BlessicaNeural", "F"], ["fr-BE-CharlineNeural", "F"], ["fr-BE-GerardNeural", "M"], ["fr-CA-AntoineNeural", "M"], ["fr-CA-JeanNeural", "M"], ["fr-CA-SylvieNeural", "F"], ["fr-CA-ThierryNeural", "M"], ["fr-CH-ArianeNeural", "F"], ["fr-CH-FabriceNeural", "M"], ["fr-FR-DeniseNeural", "F"], ["fr-FR-EloiseNeural", "F"], ["fr-FR-HenriNeural", "M"], ["fr-FR-RemyMultilingualNeural", "M"], ["fr-FR-VivienneMultilingualNeural", "F"], ["ga-IE-ColmNeural", "M"], ["ga-IE-OrlaNeural", "F"], ["gl-ES-RoiNeural", "M"], ["gl-ES-SabelaNeural", "F"], ["gu-IN-DhwaniNeural", "F"], ["gu-IN-NiranjanNeural", "M"], ["he-IL-AvriNeural", "M"], ["he-IL-HilaNeural", "F"], ["hi-IN-MadhurNeural", "M"], ["hi-IN-SwaraNeural", "F"], ["hr-HR-GabrijelaNeural", "F"], ["hr-HR-SreckoNeural", "M"], ["hu-HU-NoemiNeural", "F"], ["hu-HU-TamasNeural", "M"], ["id-ID-ArdiNeural", "M"], ["id-ID-GadisNeural", "F"], ["is-IS-GudrunNeural", "F"], ["is-IS-GunnarNeural", "M"], ["it-IT-DiegoNeural", "M"], ["it-IT-ElsaNeural", "F"], ["it-IT-GiuseppeMultilingualNeural", "M"], ["it-IT-IsabellaNeural", "F"], ["ja-JP-KeitaNeural", "M"], ["ja-JP-NanamiNeural", "F"], ["jv-ID-DimasNeural", "M"], ["jv-ID-SitiNeural", "F"], ["ka-GE-EkaNeural", "F"], ["ka-GE-GiorgiNeural", "M"], ["kk-KZ-AigulNeural", "F"], ["kk-KZ-DauletNeural", "M"], ["km-KH-PisethNeural", "M"], ["km-KH-SreymomNeural", "F"], ["kn-IN-GaganNeural", "M"], ["kn-IN-SapnaNeural", "F"], ["ko-KR-HyunsuMultilingualNeural", "M"], ["ko-KR-InJoonNeural", "M"], ["ko-KR-SunHiNeural", "F"], ["lo-LA-ChanthavongNeural", "M"], ["lo-LA-KeomanyNeural", "F"], ["lt-LT-LeonasNeural", "M"], ["lt-LT-OnaNeural", "F"], ["lv-LV-EveritaNeural", "F"], ["lv-LV-NilsNeural", "M"], ["mk-MK-AleksandarNeural", "M"], ["mk-MK-MarijaNeural", "F"], ["ml-IN-MidhunNeural", "M"], ["ml-IN-SobhanaNeural", "F"], ["mn-MN-BataaNeural", "M"], ["mn-MN-YesuiNeural", "F"], ["mr-IN-AarohiNeural", "F"], ["mr-IN-ManoharNeural", "M"], ["ms-MY-OsmanNeural", "M"], ["ms-MY-YasminNeural", "F"], ["mt-MT-GraceNeural", "F"], ["mt-MT-JosephNeural", "M"], ["my-MM-NilarNeural", "F"], ["my-MM-ThihaNeural", "M"], ["nb-NO-FinnNeural", "M"], ["nb-NO-PernilleNeural", "F"], ["ne-NP-HemkalaNeural", "F"], ["ne-NP-SagarNeural", "M"], ["nl-BE-ArnaudNeural", "M"], ["nl-BE-DenaNeural", "F"], ["nl-NL-ColetteNeural", "F"], ["nl-NL-FennaNeural", "F"], ["nl-NL-MaartenNeural", "M"], ["pl-PL-MarekNeural", "M"], ["pl-PL-ZofiaNeural", "F"], ["ps-AF-GulNawazNeural", "M"], ["ps-AF-LatifaNeural", "F"], ["pt-BR-AntonioNeural", "M"], ["pt-BR-FranciscaNeural", "F"], ["pt-BR-ThalitaMultilingualNeural", "F"], ["pt-PT-DuarteNeural", "M"], ["pt-PT-RaquelNeural", "F"], ["ro-RO-AlinaNeural", "F"], ["ro-RO-EmilNeural", "M"], ["ru-RU-DmitryNeural", "M"], ["ru-RU-SvetlanaNeural", "F"], ["si-LK-SameeraNeural", "M"], ["si-LK-ThiliniNeural", "F"], ["sk-SK-LukasNeural", "M"], ["sk-SK-ViktoriaNeural", "F"], ["sl-SI-PetraNeural", "F"], ["sl-SI-RokNeural", "M"], ["so-SO-MuuseNeural", "M"], ["so-SO-UbaxNeural", "F"], ["sq-AL-AnilaNeural", "F"], ["sq-AL-IlirNeural", "M"], ["sr-RS-NicholasNeural", "M"], ["sr-RS-SophieNeural", "F"], ["su-ID-JajangNeural", "M"], ["su-ID-TutiNeural", "F"], ["sv-SE-MattiasNeural", "M"], ["sv-SE-SofieNeural", "F"], ["sw-KE-RafikiNeural", "M"], ["sw-KE-ZuriNeural", "F"], ["sw-TZ-DaudiNeural", "M"], ["sw-TZ-RehemaNeural", "F"], ["ta-IN-PallaviNeural", "F"], ["ta-IN-ValluvarNeural", "M"], ["ta-LK-KumarNeural", "M"], ["ta-LK-SaranyaNeural", "F"], ["ta-MY-KaniNeural", "F"], ["ta-MY-SuryaNeural", "M"], ["ta-SG-AnbuNeural", "M"], ["ta-SG-VenbaNeural", "F"], ["te-IN-MohanNeural", "M"], ["te-IN-ShrutiNeural", "F"], ["th-TH-NiwatNeural", "M"], ["th-TH-PremwadeeNeural", "F"], ["tr-TR-AhmetNeural", "M"], ["tr-TR-EmelNeural", "F"], ["uk-UA-OstapNeural", "M"], ["uk-UA-PolinaNeural", "F"], ["ur-IN-GulNeural", "F"], ["ur-IN-SalmanNeural", "M"], ["ur-PK-AsadNeural", "M"], ["ur-PK-UzmaNeural", "F"], ["uz-UZ-MadinaNeural", "F"], ["uz-UZ-SardorNeural", "M"], ["zh-CN-XiaoxiaoNeural", "F"], ["zh-CN-XiaoyiNeural", "F"], ["zh-CN-YunjianNeural", "M"], ["zh-CN-YunxiNeural", "M"], ["zh-CN-YunxiaNeural", "M"], ["zh-CN-YunyangNeural", "M"], ["zh-CN-liaoning-XiaobeiNeural", "F"], ["zh-CN-shaanxi-XiaoniNeural", "F"], ["zh-HK-HiuGaaiNeural", "F"], ["zh-HK-HiuMaanNeural", "F"], ["zh-HK-WanLungNeural", "M"], ["zh-TW-HsiaoChenNeural", "F"], ["zh-TW-HsiaoYuNeural", "F"], ["zh-TW-YunJheNeural", "M"], ["zu-ZA-ThandoNeural", "F"], ["zu-ZA-ThembaNeural", "M"]];
  _0x22752a.exports = _0x45773a.map(([_0x15b2c4, _0x4501b9]) => {
    let _0x1eb525 = _0x15b2c4.split("-");
    let _0x5b3e71 = _0x3731ca(_0x1eb525.slice(2).join("-").replace(/Neural$/, "").replace("Multilingual", " Multilingual").replace(/-/g, " ")).trim();
    return {
      engine: "edge",
      voiceId: _0x15b2c4,
      label: _0x5b3e71,
      region: _0x1eb525[1],
      gender: _0x4501b9 === "F" ? "female" : "male",
      lang: _0x1eb525[0]
    };
  });
});
var Fo = Z((_0x2979de, _0x23161c) => {
  var _0x2dd0a0 = [["hpp4J3VqNfWAUOO0d1Us", "Bella", "female", "en", "US"], ["lbHkjRlsX8Rt31RbLmbq", "Albert", "male", "en", "US"], ["CwhRBWXzGAHq8TQ4Fs17", "Roger", "male", "en", "US"], ["EXAVITQu4vr4xnSDxMaL", "Sarah", "female", "en", "US"], ["FGY2WhTYpPnrIDTdsKH5", "Laura", "female", "en", "US"], ["IKne3meq5aSn9XLyUdCD", "Charlie", "male", "en", "AU"], ["JBFqnCBsd6RMkjVDRZzb", "George", "male", "en", "UK"], ["N2lVS1w4EtoT3dr4eOWO", "Callum", "male", "en", "US"], ["SAz9YHcvj6GT2YYXdXww", "River", "voice", "en", "US"], ["SOYHLrjzK2X1ezoPC6cr", "Harry", "male", "en", "US"], ["TX3LPaxmHKxFdv7VOQHJ", "Liam", "male", "en", "US"], ["Xb7hH8MSUJpSbSDYk0k2", "Alice", "female", "en", "UK"], ["XrExE9yKIg1WjnnlVkGX", "Matilda", "female", "en", "US"], ["bIHbv24MWmeRgasZH58o", "Will", "male", "en", "US"], ["cgSgspJ2msm6clMCkdW9", "Jessica", "female", "en", "US"], ["cjVigY5qzO86Huf0OWal", "Eric", "male", "en", "US"], ["iP95p4xoKVk53GoZ742B", "Chris", "male", "en", "US"], ["nPczCjzI2devNBz1zQrb", "Brian", "male", "en", "US"], ["onwK4e9ZLuTAKqWW03F9", "Daniel", "male", "en", "UK"], ["pFZP5JQG7iQjIQuC4Bku", "Lily", "female", "en", "UK"], ["pNInz6obpgDQGcFmaJgB", "Adam", "male", "en", "US"], ["pqHfZKP75CvOlQylNhV4", "Bill", "male", "en", "US"]];
  _0x23161c.exports = _0x2dd0a0.map(([_0x5d810e, _0xea95af, _0x2fdcc6, _0x501d40, _0xe0ece6]) => ({
    engine: "elevenlabs",
    voiceId: _0x5d810e,
    label: _0xea95af,
    region: _0xe0ece6,
    gender: _0x2fdcc6,
    lang: _0x501d40
  }));
});
var Oo = Z((_0x47e465, _0x37d55b) => {
  _0x37d55b.exports = {
    "3VnrjnYrskPMDsapTr8X": "https://storage.googleapis.com/eleven-public-prod/database/user/COsSJJG6gjWu8B6HtAYraUqntxT2/voices/3VnrjnYrskPMDsapTr8X/rTtnskqz8S0pmuxMwNB3.mp3",
    aN7cv9yXNrfIR87bDmyD: "https://storage.googleapis.com/eleven-public-prod/database/user/sOwFF8ejIvSefUvvGpTJ63HXubh1/voices/aN7cv9yXNrfIR87bDmyD/hfxx2raRzt2YVxtQiM8H.mp3",
    UsgbMVmY3U59ijwK5mdh: "https://api.us.elevenlabs.io/v1/voices/UsgbMVmY3U59ijwK5mdh/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJhODZjMjc1ZmQyMTk0ZjcwOTFkMGMyNjdmYWVmYmRhYyIsImZpbGVuYW1lIjoiZjkwMGEwNDAtMGFiZS00N2RiLWFlYjQtYzIwYjYzMDU2NDMzLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    ueSxRO0nLF1bj93J2hVt: "https://api.us.elevenlabs.io/v1/voices/ueSxRO0nLF1bj93J2hVt/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoieTZmS1RGRUc3RWUxN1oxekRaSG9HRk5zVktZMiIsImZpbGVuYW1lIjoiZGU0YWM2ZTktNzVkNy00NGM1LWJiNTAtMjMwNWRmZGRhMjgwLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    A5w1fw5x0uXded1LDvZp: "https://api.us.elevenlabs.io/v1/voices/A5w1fw5x0uXded1LDvZp/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI3ZjcyZmRlMzRmYTc0YTE3OWUyMTE4MmVkMjhhZTA5NCIsImZpbGVuYW1lIjoiUGw0NGR2cUFBR3J3eFpFdGE3bUUubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    d5HVupAWCwe4e6GvMCAL: "https://api.us.elevenlabs.io/v1/voices/d5HVupAWCwe4e6GvMCAL/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI0NzU1M2RiZThlMmE0MTkzYTJlOWMzNTkxMDBiZWEwNCIsImZpbGVuYW1lIjoiQWlRcEExRjNIQWlTVDJwQ1hwYVIubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    DvG3I1kDzdBY3u4EzYh6: "https://api.us.elevenlabs.io/v1/voices/DvG3I1kDzdBY3u4EzYh6/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiYzVrZEpDVG8zYVFzVnF3N0ZGWGIya2FpcGI4MyIsImZpbGVuYW1lIjoia1JUNWRjYjRYaXZ5S2hOSThEd0EubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "558B1EcdabtcSdleer40": "https://storage.googleapis.com/eleven-public-prod/database/user/DxkgIq1vnwhTYa8uL32YhmxjMou2/voices/558B1EcdabtcSdleer40/3gFzJJf8SfUG0fPjLHVQ.mp3",
    jdlxsPOZOHdGEfcItXVu: "https://api.us.elevenlabs.io/v1/voices/jdlxsPOZOHdGEfcItXVu/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiMTdOWnpTYmQ5SVA4MmdqYnd3c2N3eW1kQ0lFMyIsImZpbGVuYW1lIjoiYlF0OHpzOVhLQmo5WjBYcWk5Sm8ubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "7hsfEc7irDn6E8br0qfw": "https://storage.googleapis.com/eleven-public-prod/database/user/kg1F3Wh21fcmmmzFovRwWFO1G8H3/voices/7hsfEc7irDn6E8br0qfw/93dcf970-15c9-4d5d-9a0e-0922217412f6.mp3",
    "6adFm46eyy74snVn6YrT": "https://api.us.elevenlabs.io/v1/voices/6adFm46eyy74snVn6YrT/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIwNTQ1NTBkODc4YzI0MTQ2YTA1MDM4ZjAyNTVkZWNmMyIsImZpbGVuYW1lIjoiSzB5MFdLS01JdHp3b3FxMnBrbVMubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "0ggMuQ1r9f9jqBu50nJn": "https://storage.googleapis.com/eleven-public-prod/database/user/qLMxIirU8qeh6SoWEpHZArCyKC82/voices/0ggMuQ1r9f9jqBu50nJn/ijjXRso64oDa6QLfuwzH.mp3",
    KVzG2JMdZJKi6y7cwERP: "https://storage.googleapis.com/eleven-public-prod/database/user/aaVU9U8RcJTLZ80aHbgW3PcvNZi1/voices/KVzG2JMdZJKi6y7cwERP/2f0e77a9-a1d1-4295-ab0b-d3b259810ce8.mp3",
    "5vqV9IG7sDpzgzKOIZAv": "https://api.us.elevenlabs.io/v1/voices/5vqV9IG7sDpzgzKOIZAv/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJlOGUwZmUzMjM4MGI0MjgwOGQxNTliZGUzMGE3NDZkNyIsImZpbGVuYW1lIjoiYWJhNDhjZGMtMDkzYi00N2JkLThmZDYtODE0ZGQ1NWI3NzZlLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    XBDAUT8ybuJTTCoOLSUj: "https://storage.googleapis.com/eleven-public-prod/database/user/Gt3WUmSM8Dfv53wkfk785cWUf4a2/voices/XBDAUT8ybuJTTCoOLSUj/NyApKgQVL7sSD5vQLGJl.mp3",
    foH7s9fX31wFFH2yqrFa: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1e1bb97afeab43e996ceefadc09fce07/voices/foH7s9fX31wFFH2yqrFa/XEIsoRs7xArbmUx1pJpp.mp3",
    BlZK9tHPU6XXjwOSIiYA: "https://storage.googleapis.com/eleven-public-prod/database/user/sWaUHiGL96Yk2S2bX5HsxRaI9XS2/voices/BlZK9tHPU6XXjwOSIiYA/4847d94c-dc44-42db-ad21-fba7bb80f4ac.mp3",
    "9EE00wK5qV6tPtpQIxvy": "https://storage.googleapis.com/eleven-public-prod/database/user/YEywBE4jk3NNMiHyhOkjf0X6ysL2/voices/9EE00wK5qV6tPtpQIxvy/dcd40a37-bd29-4e24-b4b1-70a045e79467.mp3",
    FTYCiQT21H9XQvhRu0ch: "https://storage.googleapis.com/eleven-public-prod/database/user/9CKGEGlc24hvG3fABbarF04bjzI3/voices/FTYCiQT21H9XQvhRu0ch/efc9a24c-917d-49cb-a2ad-e2d28d121776.mp3",
    ywBZEqUhld86Jeajq94o: "https://storage.googleapis.com/eleven-public-prod/database/user/FEB1u5o3JcOVxpX1xcvd1niBiJ63/voices/ywBZEqUhld86Jeajq94o/KNojikC1H5tpYfj1gkN7.mp3",
    ipTvfDXAg1zowfF1rv9w: "https://api.us.elevenlabs.io/v1/voices/ipTvfDXAg1zowfF1rv9w/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoicVJMUU9oZEl4ZVIzb1h4cEdtcThkWlFmVmU2MiIsImZpbGVuYW1lIjoiWEpWUG0zVWxxUFcxQlNEaVBWc3UubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "1d5Bb0SMBPB10Gx6iQeu": "https://storage.googleapis.com/eleven-public-prod/database/user/xySPRx6W6TVRFbUaO4ZV0zjYohF3/voices/1d5Bb0SMBPB10Gx6iQeu/4fa59491-5277-44eb-9cba-8338034d77b0.mp3",
    BUPPIXeDaJWBz696iXRS: "https://storage.googleapis.com/eleven-public-prod/database/user/k2TSCRn9VRVf6lURD8l9LXgeMXI3/voices/BUPPIXeDaJWBz696iXRS/0d5e5718-e604-4df0-9639-f58cb86784d1.mp3",
    RmcV9cAq1TByxNSgbii7: "https://storage.googleapis.com/eleven-public-prod/database/user/NGzPfqnWuWSo142RllsvSRPXMPX2/voices/RmcV9cAq1TByxNSgbii7/4l1AWooECg9qi9xlhmBb.mp3",
    a3AkyqGG4v8Pg7SWQ0Y3: "https://storage.googleapis.com/eleven-public-prod/database/user/dIFexbiNQxgnb3WWjl4HVrbAQ5D3/voices/a3AkyqGG4v8Pg7SWQ0Y3/uKOB9hPHe57vcsoIvRNv.mp3",
    JxmKvRaNYFidf0N27Vng: "https://api.us.elevenlabs.io/v1/voices/JxmKvRaNYFidf0N27Vng/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiT3ltcmlYYmdKb1FicllBSXVCMmZFRGxTQXFOMiIsImZpbGVuYW1lIjoiWjlpYThCMDhHZVNRUWFXNlNHU3UubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    EcENCamMHdzIoMysqdsv: "https://storage.googleapis.com/eleven-public-prod/database/user/GjYjGlQ8jQbvytlMP71nFRgvWNq1/voices/EcENCamMHdzIoMysqdsv/H7P4FxvtA1e2h6eEYpyO.mp3",
    "7XOKiK112QRZRSLbCfMc": "https://storage.googleapis.com/eleven-public-prod/database/user/MEfqrYLerOUFmgoFEm43Itfbl0l1/voices/7XOKiK112QRZRSLbCfMc/c98864dc-4616-4cf6-9119-b51a357680ae.mp3",
    qByVAGjXwGlkcRDJoiHg: "https://storage.googleapis.com/eleven-public-prod/database/workspace/29ca19d1407e47fc86008497a8499f88/voices/qByVAGjXwGlkcRDJoiHg/e95723e3-1ba6-4b30-b302-6e4bcbf5b808.mp3",
    M0rVwr32hdQ5UXpkI3ni: "https://storage.googleapis.com/eleven-public-prod/database/user/vPhRu1PHR7TqGFJZ4bBlH9BiTmO2/voices/M0rVwr32hdQ5UXpkI3ni/TdQYzBzvE2L4Kns4yzi4.mp3",
    DXiwi9uoxet6zAiZXynP: "https://storage.googleapis.com/eleven-public-prod/database/user/9QZhyEJVONUlQbf4qCXpQIsiWM02/voices/DXiwi9uoxet6zAiZXynP/ZXEyuqQ2pfxLEM30hsbr.mp3",
    iSFxP4Z6YNcx9OXl62Ic: "https://storage.googleapis.com/eleven-public-prod/database/user/jPgCa3x52PQpWUqTcJn7Cjv4teV2/voices/iSFxP4Z6YNcx9OXl62Ic/a200d54c-0858-4812-a64f-811b882abd13.mp3",
    Si3s1VCb7dLbeqH57kiC: "https://storage.googleapis.com/eleven-public-prod/database/user/VwgYWV3dWefcgGig7BmZ0wFBwte2/voices/Si3s1VCb7dLbeqH57kiC/a6185f92-e1bd-4c52-b5a6-7ddff7a38240.mp3",
    X0V9HEDEuaVhVqzVPUKM: "https://storage.googleapis.com/eleven-public-prod/database/workspace/881dc96c1c13419a881a84cf204cd8c4/voices/X0V9HEDEuaVhVqzVPUKM/d2a848d5-704d-460c-b12c-ce5a2ac12149.mp3",
    "7WNWm0yUcEolHsfg5Bhk": "https://api.us.elevenlabs.io/v1/voices/7WNWm0yUcEolHsfg5Bhk/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiNFBSVW1rMGZKNllLRTRZUHN3blhSaTdXVXZIMiIsImZpbGVuYW1lIjoiNzVkNWNlM2MtMTc1ZS00NDc5LWEwZTktZTBjZDdkODQxNzQ1Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    N0Z0aL8qHhzwUHwRBcVo: "https://storage.googleapis.com/eleven-public-prod/database/workspace/a062d0ff83374655b7d4abe648c832f4/voices/N0Z0aL8qHhzwUHwRBcVo/LfArSwOE3zkhGLQPCEWE.mp3",
    HQZkBNMmZF5aISnrU842: "https://storage.googleapis.com/eleven-public-prod/database/user/h3ZsMzAhH8cGBa9cNI8JXOFQwtY2/voices/HQZkBNMmZF5aISnrU842/87183e43-5f71-4568-af78-553445ee0911.mp3",
    deC6NEXcbavaVWbzjgzb: "https://storage.googleapis.com/eleven-public-prod/database/user/xxqDuxFSCVMaxhi8dLF6bXx1Nsh2/voices/deC6NEXcbavaVWbzjgzb/0WjtU3OWcWtGW4jDm4aV.mp3",
    QqID1ZB0DTItNxAKGBNW: "https://api.us.elevenlabs.io/v1/voices/QqID1ZB0DTItNxAKGBNW/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIzY2RhM2MzM2RmNjA0ZGY0OTUzNWQ5NzNlMDE4MTE4ZSIsImZpbGVuYW1lIjoiOWQyZjIyOTgtYjFkMC00ZDUxLThjOWUtZjg4Mjk3ODE3NTNhLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    RxhjHDfpO54FYotYtKpw: "https://storage.googleapis.com/eleven-public-prod/database/user/XAJCCxJbqPbEF70aoiI1FyjULJQ2/voices/RxhjHDfpO54FYotYtKpw/gf3p8d9Qw6M008W63OAL.mp3",
    LPldyaIkUUSOPCRFrgYJ: "https://storage.googleapis.com/eleven-public-prod/database/user/8g4eGSy6nNftHbn2KMUBFwncSJg1/voices/LPldyaIkUUSOPCRFrgYJ/96a4a622-f41f-48d6-af9e-72337522bb9b.mp3",
    CxJbDdwqY48MY3gPVYwe: "https://storage.googleapis.com/eleven-public-prod/database/workspace/0be52d30c1b8412f9bafdbb817b9d3fd/voices/CxJbDdwqY48MY3gPVYwe/CuWykuMFEjFzJqT2Tkfc.mp3",
    KkZEqzG4FfkIHMbzFAnu: "https://storage.googleapis.com/eleven-public-prod/database/user/ltBMyaYdgRfNVgtXP6wNo2zA0fX2/voices/KkZEqzG4FfkIHMbzFAnu/e89f4b63-114a-4abd-a1ca-8213f9ae3cbc.mp3",
    HG0MlJIknmaXREpTckfK: "https://api.us.elevenlabs.io/v1/voices/HG0MlJIknmaXREpTckfK/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIyOGY3Y2NjMWMwMGM0YmYzYTBhYjAxMjhiMWQ1OTFjOCIsImZpbGVuYW1lIjoiU2NQc0pTRnE3T1UzR205TndjZWQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "4a9d2yNlrzn6YEoy5ZWT": "https://api.us.elevenlabs.io/v1/voices/4a9d2yNlrzn6YEoy5ZWT/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiY2tFU0M4RXFsQ01NV3FiUmJoUVdhdUQ1UWtmMiIsImZpbGVuYW1lIjoieUVUNUZld0hMSE1OdzJFTEZ1RHAubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "8PEPqUGgvwN1Fk9KR8jV": "https://storage.googleapis.com/eleven-public-prod/database/workspace/85d6d9bc50f6459aaaf1ec8572519ebf/voices/8PEPqUGgvwN1Fk9KR8jV/SfrwSQyGTr48TnsNwlkh.mp3",
    xVv8qLTTnsYnrysc2Lx4: "https://storage.googleapis.com/eleven-public-prod/database/user/n8ePpixCSKc9ZNARZitYmbgK3ow1/voices/xVv8qLTTnsYnrysc2Lx4/b60710b9-cdf2-4b3a-a163-7fcb015045cc.mp3",
    "5g2DMFQF8xR0KmnuNr4U": "https://api.us.elevenlabs.io/v1/voices/5g2DMFQF8xR0KmnuNr4U/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIxN2E0Nzg4MzUyNTc0Njc4YWM1OTE2MGI5YmMyYmY2ZiIsImZpbGVuYW1lIjoiS0xmbUNzS1pGZmI2OXJuZ2VrdHEubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    NSzi72jFi7P1JqCwPRuM: "https://storage.googleapis.com/eleven-public-prod/database/user/luAlPmY2SjaETAJembza6ctDyIY2/voices/NSzi72jFi7P1JqCwPRuM/eRa8JPGgbqQs4gPdXuv6.mp3",
    Vr1jwoqy1MDvyAPwDY9C: "https://storage.googleapis.com/eleven-public-prod/database/workspace/63b8c89e63254c848adadfce972bbb10/voices/Vr1jwoqy1MDvyAPwDY9C/63455403-f924-408d-90fa-33a0c27a35ab.mp3",
    Na15FlRRkMEDtEW4nVVP: "https://storage.googleapis.com/eleven-public-prod/database/workspace/fe9272e0064e4240a5ba1a8f70facffc/voices/Na15FlRRkMEDtEW4nVVP/efSopyeELYiSzaTdIVHq.mp3",
    oN0q7mZB5kootbGrbqix: "https://storage.googleapis.com/eleven-public-prod/database/user/4fXcwZZ81HSHYjr4FLqjLxT5plN2/voices/oN0q7mZB5kootbGrbqix/DnCt8WWiGa7SVPz2mdty.mp3",
    rXOGzMiqbmjugMpzKMEx: "https://storage.googleapis.com/eleven-public-prod/database/user/SqsZJjIn59WJShvYG9fFpuV5u3k1/voices/rXOGzMiqbmjugMpzKMEx/aRzQr2d6Q2zGlErQtWax.mp3",
    kPNz4WRTiKDplS7jAwHu: "https://storage.googleapis.com/eleven-public-prod/database/workspace/487b3830672647c18e63b1cfe3fb1957/voices/kPNz4WRTiKDplS7jAwHu/BQLdAtxWdmuoIUmBMm02.mp3",
    oLR5l8TbWm0sNc5LspDA: "https://storage.googleapis.com/eleven-public-prod/database/user/ALSlUmX7NRRgBvSkRh9nqhsWbUx2/voices/oLR5l8TbWm0sNc5LspDA/f09b6dee-8cde-4494-95f2-27c8f03aaf8c.mp3",
    "1l0C0QA9c9jN22EmWiB0": "https://storage.googleapis.com/eleven-public-prod/database/workspace/1e1bb97afeab43e996ceefadc09fce07/voices/1l0C0QA9c9jN22EmWiB0/vFO3lx21S99x88TEecy5.mp3",
    DVQIYWzpAqd5qcoIlirg: "https://storage.googleapis.com/eleven-public-prod/database/user/IN2IBlTa4Eeh74gqrrbU9AS5JMY2/voices/DVQIYWzpAqd5qcoIlirg/FQXOvtWxGQUwavDqW9gI.mp3",
    w2KTJ6MO4SIK6nWK4YH8: "https://api.us.elevenlabs.io/v1/voices/w2KTJ6MO4SIK6nWK4YH8/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI3MTU2ZTdmMDU0NDY0NWIyYjgwNGYxNzlkMGZmZmRhNSIsImZpbGVuYW1lIjoiWUlQQnA5ODQxWGR3c3B1UWRhWVcubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    HAAKLJlaJeGl18MKHYeg: "https://storage.googleapis.com/eleven-public-prod/database/user/ZKWCW9ChxGcxXCQVbKs7dYbwcF52/voices/HAAKLJlaJeGl18MKHYeg/zD0vyJoLQimI2pdR9IDK.mp3",
    K7ewtjKRNtwwt3lKQ6M0: "https://storage.googleapis.com/eleven-public-prod/database/workspace/29844bc2632a47a18c0d4f2fdc86c16a/voices/K7ewtjKRNtwwt3lKQ6M0/gHszf2C5JMLjRDDu5per.mp3",
    "1rqNHUqUbBGpY3OyzPMI": "https://storage.googleapis.com/eleven-public-prod/database/user/GjaS12TSpaRPl19WJR8EIfP34v12/voices/1rqNHUqUbBGpY3OyzPMI/ZPGjuD22x72Yi0nmK1V2.mp3",
    f5q6kePPoQAjCPYG6moa: "https://api.us.elevenlabs.io/v1/voices/f5q6kePPoQAjCPYG6moa/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJiNzJmNzQwNGU3YzM0MDhjOGUwNjBiODNlMjUwNjAzOSIsImZpbGVuYW1lIjoiMGtjcEdybU5xWjFYZVNaV3U1T1gubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    s6W2NupNY6TykGJoDtWy: "https://api.us.elevenlabs.io/v1/voices/s6W2NupNY6TykGJoDtWy/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIwZDg4YWExMTVlZGY0MDhlODQyYzNmMjE0OTQzOWU1OCIsImZpbGVuYW1lIjoiMERYNkczcEZibTc5T3lxTm0zblMubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    WVkYyTxxVgMOsw1IIVL0: "https://storage.googleapis.com/eleven-public-prod/database/user/2Oka77lSZtfb0ZXzuGAHZf3WD9w1/voices/WVkYyTxxVgMOsw1IIVL0/b9cb80e5-89f1-4230-be86-42a35c8aa9a4.mp3",
    mJLZ5p8I7Pk81BHpKwbx: "https://storage.googleapis.com/eleven-public-prod/database/user/0B9Gy9XsGPcNDeaxCHuHPhEbeq23/voices/mJLZ5p8I7Pk81BHpKwbx/182afc0c-622b-449c-99e0-1e8a6f689dc1.mp3",
    eZ248pfac00g3092s7h8: "https://api.us.elevenlabs.io/v1/voices/eZ248pfac00g3092s7h8/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiUHk0c1hGSHJKZVRvT1RGZnd4bTE1R3V0ZVFsMSIsImZpbGVuYW1lIjoibFF3N2JyMGgxa1JGY3BpV2RnRHoubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    nbv4fVbfyLxvuHzyIeDo: "https://storage.googleapis.com/eleven-public-prod/database/user/U0wDAmhEHhYffuTpPYQZAMQIXjv2/voices/nbv4fVbfyLxvuHzyIeDo/JkJf3wFdv4E3F57lx3YM.mp3",
    KpzB5RgCRuVkUlZeY6wb: "https://storage.googleapis.com/eleven-public-prod/database/user/SzxPjoVS1faLLltt3mHhbQBI9s33/voices/KpzB5RgCRuVkUlZeY6wb/0146408b-5077-4e99-9d85-3f7716a0a216.mp3",
    hfQXFFMygx7xoaljt9aE: "https://storage.googleapis.com/eleven-public-prod/database/workspace/c014ac02ceb942a9a7325af6bdac2c71/voices/hfQXFFMygx7xoaljt9aE/Av2RAWZIOtzXTx9WHdi1.mp3",
    q6uIUrmSRksEvUMlwYPR: "https://storage.googleapis.com/eleven-public-prod/database/user/cSyxqBrNHXVh8d8rxCNHGtd9htE3/voices/q6uIUrmSRksEvUMlwYPR/29woKB4NgJvFulJ0gxRb.mp3",
    "4HGP1feHKTQ1DJst6Tk8": "https://api.us.elevenlabs.io/v1/voices/4HGP1feHKTQ1DJst6Tk8/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJmMzY3ZTM2OTM0ZDc0ZmIwYWE5ZTFkZGI5ZmMwZGU0YiIsImZpbGVuYW1lIjoicVJ2VUluVHpES0I4Vm80OHNIdXcubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    ZsjEJaLQy3sgvwxicmDx: "https://storage.googleapis.com/eleven-public-prod/database/workspace/d34501e492854e51876b1e466f1e9254/voices/ZsjEJaLQy3sgvwxicmDx/ArqPV7irBkPMVFekCK5q.mp3",
    szlbmCOTZzG1seZ82nZs: "https://storage.googleapis.com/eleven-public-prod/database/user/5trMntiyBqN8o1xHozy6jDYiHBt2/voices/szlbmCOTZzG1seZ82nZs/6a7df1ee-b303-4578-afe1-795fcf8cafbc.mp3",
    L5c6tGA8OiORYKxez5Zu: "https://storage.googleapis.com/eleven-public-prod/database/user/8a6QMGjxe2PifBSOlsDRVmPJe952/voices/L5c6tGA8OiORYKxez5Zu/89saGHHUAFoEN2mJQAS2.mp3",
    In8K4JDLu1r9fGysc64F: "https://api.us.elevenlabs.io/v1/voices/In8K4JDLu1r9fGysc64F/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiREhrZ1pBRjJDbWV1dGxkTUozVDVoaXlic2F0MiIsImZpbGVuYW1lIjoiY2ZhMWNkNTctZmVhNy00ODMxLWIyZTYtYjYyYzYxMTVjMzJiLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    TSQmL8GUTyX83rgaewuP: "https://storage.googleapis.com/eleven-public-prod/database/workspace/cbea6639831b475d83f9ae8fc9777c5d/voices/TSQmL8GUTyX83rgaewuP/rW1ZuvIL9hXTw5DXqe3R.mp3",
    faGOoglJYMOx2d1ya5l9: "https://storage.googleapis.com/eleven-public-prod/database/user/csgyY4nh1Ufz0ftTjP8GlmmjHXE2/voices/faGOoglJYMOx2d1ya5l9/f41cb339-fac4-47c0-89c1-51ba1341cec0.mp3",
    P37gHF6iLTEvs2pLYhyv: "https://storage.googleapis.com/eleven-public-prod/database/user/user_9401ker0ft35ej98vrwtgvv04sgn/voices/P37gHF6iLTEvs2pLYhyv/WMj6L6CqaRA1WRtQTn1o.mp3",
    IovBBFnLZ6QzJhFLLroy: "https://api.us.elevenlabs.io/v1/voices/IovBBFnLZ6QzJhFLLroy/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoidXNlcl85MDAxa2U2eHpmMm1mNTB0YnZrc2ozbngycjdnIiwiZmlsZW5hbWUiOiJWcXp1Z21oY29pZjlFU3BZZVBUeS5tcDMiLCJ0aW1lc3RhbXAiOjE3ODU2Mzk2MDAwMDAwMDB9",
    jpmnSYDOADVEpZksbLmc: "https://storage.googleapis.com/eleven-public-prod/database/user/RmVK7sQIwCgL3f10fDvwffGGKe92/voices/jpmnSYDOADVEpZksbLmc/cQFGuQ32d6iC2g6OYQMk.mp3",
    VkftF4RyfVI5yIYa6wFa: "https://storage.googleapis.com/eleven-public-prod/database/user/bWhNSzzTdsd5mfBOgsvUylcJIYE2/voices/VkftF4RyfVI5yIYa6wFa/f08690de-7f58-4eda-90e5-4cb4f421b2ef.mp3",
    ArosID24mP18TEiQpNhs: "https://storage.googleapis.com/eleven-public-prod/database/user/qgkniOWhmVflg7NZMO4iSwwjY0b2/voices/ArosID24mP18TEiQpNhs/Wyo8g0DXFsIrAQ9n2AVN.mp3",
    KqbkuMVLVelcCTkFXEbE: "https://storage.googleapis.com/eleven-public-prod/database/workspace/248fc56ef7e34c3fa28059830c1df010/voices/KqbkuMVLVelcCTkFXEbE/wmV231UTj3XNhZQkAyxd.mp3",
    Sd0vUjtPZLtmojfIMHMx: "https://api.us.elevenlabs.io/v1/voices/Sd0vUjtPZLtmojfIMHMx/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoidUliZ0NmU2ZzamZpank5YmpWbk9HbzlUMVd3MiIsImZpbGVuYW1lIjoiODg5ZGJmNWUtM2QxNS00MDg4LWEzNDktZGU1Mzg3M2Y4YzMzLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    BLeuF5fPXWSDAwZScbTY: "https://storage.googleapis.com/eleven-public-prod/database/user/GNzBdeSMNucDPk9qFoKmwYSbv4B3/voices/BLeuF5fPXWSDAwZScbTY/2awnnvTMNflo9QumeqHi.mp3",
    JYT6xPLD3LGl0ui3YXNq: "https://storage.googleapis.com/eleven-public-prod/database/user/9Gr3pwbt14Y6zEIuO8xzRyUg1t92/voices/JYT6xPLD3LGl0ui3YXNq/e28d3c2a-079a-4f83-b8e6-ae0e8c326530.mp3",
    pGapy9MNHCukzJtjavF0: "https://storage.googleapis.com/eleven-public-prod/database/user/Bm5uBjtRdZaw9bOLWjFEY09Qk842/voices/pGapy9MNHCukzJtjavF0/duQY8YxBOH1Nje7wdDiR.mp3",
    g0UtKHMoHYe4SHQobaIL: "https://storage.googleapis.com/eleven-public-prod/database/workspace/9704bc8bebf241a8b4c7b556402d6dc8/voices/g0UtKHMoHYe4SHQobaIL/cb17e5c5-7148-4670-b080-d7faa7dff7dc.mp3",
    "7clfgAuss1M0JUYGlh1t": "https://storage.googleapis.com/eleven-public-prod/database/user/9hnX6ZqJbbRC9Is3XbIhiIJxNjD2/voices/7clfgAuss1M0JUYGlh1t/a7d33c3c-21c9-4e85-b2e1-f7b3ea5c5dd9.mp3",
    TIQkE9DDukawEm00ejgd: "https://storage.googleapis.com/eleven-public-prod/database/user/r9I9DnwygHP3lwOXtjFzLBpmXA23/voices/TIQkE9DDukawEm00ejgd/eba98d40-424a-4f5f-bd54-f091c096c681.mp3",
    QocxxnxEa0x8mrL2d4VT: "https://storage.googleapis.com/eleven-public-prod/database/user/48yTL0S0RkaHfoTzcR911EeNeGt1/voices/QocxxnxEa0x8mrL2d4VT/FV06WB8AFJlH61mAFqNO.mp3",
    f966mdF5njWREvreUG07: "https://storage.googleapis.com/eleven-public-prod/database/user/dQn3x0QUDcf2Y3FiEu32G1fVmCb2/voices/f966mdF5njWREvreUG07/zaacSsmRbxdMMPLOzd1H.mp3",
    FfC8yOt3HaUlZaet6DPx: "https://storage.googleapis.com/eleven-public-prod/database/user/kgDarH0QSrXCI1TCVIMe2DiiHQm1/voices/FfC8yOt3HaUlZaet6DPx/a260361a-f040-48c4-90ba-cb3100ff1d29.mp3",
    FSA98p0BgnTAzCpH8avM: "https://api.us.elevenlabs.io/v1/voices/FSA98p0BgnTAzCpH8avM/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiZkZtQUE1N1ZVb2hYcWZRWXdCV1Vxa3o2NWJtMSIsImZpbGVuYW1lIjoiVFU2S2ZnNlVveXEzZ05FSmpKdHQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "5GqeT84PUduicivx0y5x": "https://storage.googleapis.com/eleven-public-prod/database/user/VWgjOrGSkKNB1nrK5AUKUj74zSK2/voices/5GqeT84PUduicivx0y5x/887d8f30-2cb6-4a22-8521-3b0c61748285.mp3",
    xPEfmymXC4WdBxGMznS7: "https://storage.googleapis.com/eleven-public-prod/database/user/ZKWCW9ChxGcxXCQVbKs7dYbwcF52/voices/xPEfmymXC4WdBxGMznS7/xuq5fw3fKBo80gn9Ac5e.mp3",
    "2XWF6DSCzum3KkiywGE8": "https://api.us.elevenlabs.io/v1/voices/2XWF6DSCzum3KkiywGE8/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIzMzhkMGE0MDkzNmM0YmI3OTUzNGUxZGM1NWM5YjA1YyIsImZpbGVuYW1lIjoiMTMwMzI1NDctMjYzYi00N2MxLTgzNDgtMzMyNDZkMjE1ZTBlLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    z9AwTVuN8C7iJ75jitEW: "https://storage.googleapis.com/eleven-public-prod/database/user/N0cFkDOT4sRqA7wUUIS4ReicFP42/voices/z9AwTVuN8C7iJ75jitEW/07c8d228-2c4c-49c8-8cd6-4daf35609c6e.mp3",
    MqsnLOwcpkRUz9a4AhNi: "https://storage.googleapis.com/eleven-public-prod/database/user/U3lEQppSKBMmY21PvDnvVGSnafy2/voices/MqsnLOwcpkRUz9a4AhNi/GyfRFNvyAjrnQH4jp8UD.mp3",
    sbaSITtJLv4yb3vIi67Z: "https://storage.googleapis.com/eleven-public-prod/database/user/smeWBu93fchNNoTZYpcvAVtADk72/voices/sbaSITtJLv4yb3vIi67Z/VfaiEckVm0oK3fYyWyrQ.mp3",
    "2ZUpiKo5wCCuypvx2zaS": "https://storage.googleapis.com/eleven-public-prod/database/user/r7GgnjXQwHMhWzSU4ZMk50DdwaT2/voices/2ZUpiKo5wCCuypvx2zaS/76db9511-41d6-4430-aba8-9b3ae8b01109.mp3",
    wvL4QjDMWwrrTQuXUYlw: "https://storage.googleapis.com/eleven-public-prod/database/user/6Zt1ZPZThsOMUasUigILNIvJK9q2/voices/wvL4QjDMWwrrTQuXUYlw/9e21e9bc-5c29-43e9-a7f6-3c234b1acfa5.mp3",
    "9RpzPSAZdsH0F8tpXfP4": "https://storage.googleapis.com/eleven-public-prod/database/user/QtLl2zZ4umdmC5wh3LEkWIypF163/voices/9RpzPSAZdsH0F8tpXfP4/f7451dbb-fccb-4b5b-948c-056d679da995.mp3",
    Wzj3w9OuQFcoiuKPnk3j: "https://storage.googleapis.com/eleven-public-prod/database/user/bhNBU3J04YfAauJlCxDCnDtBFee2/voices/Wzj3w9OuQFcoiuKPnk3j/NGvwmqZgS1hjQMDJmQxY.mp3",
    oAvm5cbNCsMTdnhtmIs4: "https://storage.googleapis.com/eleven-public-prod/database/user/Dko2PI0TEUdVET7BKUfUkKlO7R02/voices/oAvm5cbNCsMTdnhtmIs4/1bb8930b-c2aa-4fee-8026-76b6be5de597.mp3",
    qp0lBtq2TxYPepHSR0D1: "https://storage.googleapis.com/eleven-public-prod/database/user/BHhuzgI2Gthxsf3DrWonYeFb3sp1/voices/qp0lBtq2TxYPepHSR0D1/bRbmTZVy1pY7511nv1rZ.mp3",
    pFEtwO9FWuRIINWTs00y: "https://api.us.elevenlabs.io/v1/voices/pFEtwO9FWuRIINWTs00y/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiV1V0cXpER1RsOE5wbHVUMEVvRjBHZDNORzQ3MyIsImZpbGVuYW1lIjoiZWIwZGI1OWUtYjYzOC00NDFlLWJmMGUtOTI3Y2IzNTk2ZWZlLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    "9w5lSVhu8VnBEqFqdrD9": "https://api.us.elevenlabs.io/v1/voices/9w5lSVhu8VnBEqFqdrD9/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiWFBUZ3gyQ2RsSFlzZUxjNmdrYVRBd0w1ZjVwMiIsImZpbGVuYW1lIjoiNDl2ZERuUDNXSDJ4NnFYVFhBZnIubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    zIusdI28yOZPwIBus0aI: "https://storage.googleapis.com/eleven-public-prod/database/user/vZEuPMj8jzNy2NleA2vKoY0Wrvn2/voices/zIusdI28yOZPwIBus0aI/ctAn5c5p35e6Zig8gzw7.mp3",
    ux9eagR6pSyxgfunaGxo: "https://storage.googleapis.com/eleven-public-prod/database/user/aBmFJMvvyOepDYyBxGHK6lz3kXR2/voices/ux9eagR6pSyxgfunaGxo/483fd238-e21f-42e1-91a6-a91f8aac6e6e.mp3",
    DTLhW2kDOWq9IAPipCcu: "https://storage.googleapis.com/eleven-public-prod/database/user/t1yDgQ257lhQQZXLRNNYdFcypL63/voices/DTLhW2kDOWq9IAPipCcu/7f886a03-97f1-45c0-ab62-18aade483c39.mp3",
    CQAD6iKxS73fEAGjSwt5: "https://storage.googleapis.com/eleven-public-prod/database/workspace/56decef8b5a648b7ab29b17eefba2fcd/voices/CQAD6iKxS73fEAGjSwt5/UmsJG3aeWYxO76OE1zmv.mp3",
    puBBfOSRT9Dbk3FUJQGd: "https://storage.googleapis.com/eleven-public-prod/database/user/Lc9YzU6BL8RzhWbnEbDkU3kPHAr1/voices/puBBfOSRT9Dbk3FUJQGd/3p0oC7bZRIwi8sIjoP92.mp3",
    D0dFzCacaMgMGjIksFuH: "https://storage.googleapis.com/eleven-public-prod/database/workspace/b912c04a468a4451808a2f10f112766b/voices/D0dFzCacaMgMGjIksFuH/RQODsdC9FqyN9wN6VQiB.mp3",
    mTMLdrFZdBqiPUW1W47D: "https://storage.googleapis.com/eleven-public-prod/database/user/cbuHncRZKtMjLQuaYkw9hcJvR1F2/voices/mTMLdrFZdBqiPUW1W47D/393f006b-f1dc-471c-9765-ca43a80a625b.mp3",
    OZ41k7uYyV1AwlxmkRx0: "https://storage.googleapis.com/eleven-public-prod/database/user/i3zOmWix2hd8ZNUHow5V4Hev4503/voices/OZ41k7uYyV1AwlxmkRx0/3992e471-e095-461a-8edd-f27e04dbc45e.mp3",
    BfchfKCM67ImGdaJ1smU: "https://storage.googleapis.com/eleven-public-prod/database/workspace/fe9272e0064e4240a5ba1a8f70facffc/voices/BfchfKCM67ImGdaJ1smU/YwrlHxXuLW4LKp1hBMxy.mp3",
    JDbnZf9C4zfUzF0EuIch: "https://storage.googleapis.com/eleven-public-prod/database/user/zHed2jy3YcNyr7WQ07h0Cvscla43/voices/JDbnZf9C4zfUzF0EuIch/8fbcfa49-d3e3-41ea-88ae-6dba7963698b.mp3",
    "5DIp7NodzHK1ZgA68hss": "https://storage.googleapis.com/eleven-public-prod/database/user/XzVhKkSPYpU73LWDDEt9MBAHFR83/voices/5DIp7NodzHK1ZgA68hss/4l19KnfjtivyBzhTqzgn.mp3",
    xYqBp1MrrrBpxIdqTvgb: "https://storage.googleapis.com/eleven-public-prod/database/workspace/4820374912f24b10993188dbb938dd06/voices/xYqBp1MrrrBpxIdqTvgb/544cd9fa-3a79-4b34-a0dd-017977c2d900.mp3",
    AYozKR5VAKhmcfQriHWo: "https://storage.googleapis.com/eleven-public-prod/database/workspace/fdef706887444d66b98e3c5c5ec3f322/voices/AYozKR5VAKhmcfQriHWo/0fb6c2d7-49f6-4c5f-abc7-7342eee82873.mp3",
    mMa5ygDNluQLD1EaTZLI: "https://storage.googleapis.com/eleven-public-prod/database/user/iMBL1TGftfNjtUKplJLrbNiJeZT2/voices/mMa5ygDNluQLD1EaTZLI/RntBCIcoAIrNYBYJAz9N.mp3",
    "0xI4eT7fHnn6AHTfF4Ro": "https://api.us.elevenlabs.io/v1/voices/0xI4eT7fHnn6AHTfF4Ro/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiZjRNNDAzWXowV2htR25SRFc5V2M5eW1yakh6MSIsImZpbGVuYW1lIjoiNDE3Njg4MzQtYzM5OC00YTlkLWE3NWQtZDU4NDNkMjliMGMxLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    s06eec3OqspIDuOznMK4: "https://storage.googleapis.com/eleven-public-prod/database/user/user_7301kg2jkq98fm0tb9snqz360zjr/voices/s06eec3OqspIDuOznMK4/ba53a78b-df82-4de6-a4c3-a9d50c0cbe37.mp3",
    MfnRBJHBrGwMSVFTatjK: "https://storage.googleapis.com/eleven-public-prod/database/user/y9E99xJLmwZBk9gfiLihCh6fTgj2/voices/MfnRBJHBrGwMSVFTatjK/e4b6993d-91ea-4fe6-a326-48518521304a.mp3",
    VAzxBZgjAoy5WCeMEmFW: "https://api.us.elevenlabs.io/v1/voices/VAzxBZgjAoy5WCeMEmFW/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiaVEzeERrQlgwQWRuOUFFV0V5R0hicjNtOFNFMyIsImZpbGVuYW1lIjoiOWUyYmJhOWQtM2YzNi00OWM4LTk3ZWQtNzNhNDgwMDQxMzlmLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    "2vT8WlUXV1qBtgiLZdSb": "https://storage.googleapis.com/eleven-public-prod/database/user/qfM5ikWt9kRUCRScilqlkdDoHwu2/voices/2vT8WlUXV1qBtgiLZdSb/LGmdgLp1pXX199g9qHjm.mp3",
    "0eXHGNoETNSO4IGTBKno": "https://storage.googleapis.com/eleven-public-prod/database/user/nSvcpdpa1CfEdIF9i0lgfhK6dOw1/voices/0eXHGNoETNSO4IGTBKno/f2eeeb94-bcea-4d19-bfe5-a2a5f70d5942.mp3",
    u8EWWYyBDfXFxHak7WM3: "https://api.us.elevenlabs.io/v1/voices/u8EWWYyBDfXFxHak7WM3/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiODlySnl3YXJ1UVJtSU10Y2oyOGozdW5MN1o5MiIsImZpbGVuYW1lIjoiNGlYTmdnZXllQ0c5eDdqVEQ3YkgubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    eMZSaad4tZC98eLRlyKT: "https://storage.googleapis.com/eleven-public-prod/database/user/mGkjudKxLSX9qp6FgBwBDDm4li63/voices/eMZSaad4tZC98eLRlyKT/e8217db9-19ff-4177-b965-a4568b784465.mp3",
    Y3DoBhgPgHh29oMNUEDk: "https://storage.googleapis.com/eleven-public-prod/database/user/tZtzhbvNvrXzQPVLfKoxkqVCrZe2/voices/Y3DoBhgPgHh29oMNUEDk/TlLWCe4W3PdpQon8h16R.mp3",
    aNgyJM3HqLEAaxmXxG1V: "https://api.us.elevenlabs.io/v1/voices/aNgyJM3HqLEAaxmXxG1V/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJlNzdlODhjZDc0YjM0Nzk5YjdkOWJiNWIwMDhmN2QyZCIsImZpbGVuYW1lIjoiTVhOemlxMnphYW9RSjNHRVRIakQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "2wMoasbnkroyeaj9FYxI": "https://api.us.elevenlabs.io/v1/voices/2wMoasbnkroyeaj9FYxI/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoidlpFdVBNajhqek55Mk5sZUEydktvWTBXcnZuMiIsImZpbGVuYW1lIjoibzFlMnBLSFp1VFpTeHdUazVCNmQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    hNe03uL2BbiU3txTclei: "https://api.us.elevenlabs.io/v1/voices/hNe03uL2BbiU3txTclei/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIzMTFmMTNhYjNhNTY0NjIyODUzZDUyYmIxN2U4YjE1MCIsImZpbGVuYW1lIjoidEFNUnk0UzEwcUlCdE9pQkpWQTUubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    xfUqvWWCktUreI6zhcEq: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1fcf258f352640f69aa56f2a5ad325e5/voices/xfUqvWWCktUreI6zhcEq/5ipEHsQOxoQobv2A4c3c.mp3",
    eqMFh4kWVrmjm0Bcil6E: "https://storage.googleapis.com/eleven-public-prod/database/user/yuC6ZEbRUbUKBYztSOjUTrUeCBr1/voices/eqMFh4kWVrmjm0Bcil6E/1mZJ7rLYCqzrssS0Qmll.mp3",
    ZlVlUEsl3JykOGluaNu1: "https://api.us.elevenlabs.io/v1/voices/ZlVlUEsl3JykOGluaNu1/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIxNWE3NjY2NjQxNjg0MDlhYTRiNGY2YWRhZGY2OGRkMSIsImZpbGVuYW1lIjoiVG40Yms3NlhmYWdRRkxtQ1pZUm8ubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    ikIaXswrYCYOUEVrkNVj: "https://api.us.elevenlabs.io/v1/voices/ikIaXswrYCYOUEVrkNVj/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI0NWQ5MGVhMTk1M2M0NDU0OGQ0NzkyMmM0YjliNTg5OSIsImZpbGVuYW1lIjoidlB6dWFDTHRTekdxU204WXJiMVQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    N8ES35RJ1GXQGHhdiimy: "https://api.us.elevenlabs.io/v1/voices/N8ES35RJ1GXQGHhdiimy/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiUjY1M25DVUdsaVhzM2I2SXpQUk40SDdxRU45MiIsImZpbGVuYW1lIjoiMzg5ODkwNzgtZTU2OC00MTRiLTk4MWYtODZhZDM4ZTU2Nzc1Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    M1eOJnaNVAbMVhDoXfRb: "https://storage.googleapis.com/eleven-public-prod/database/user/SKsc2duaOjRCCkbVR5YZhRpQB4S2/voices/M1eOJnaNVAbMVhDoXfRb/K2qzekZ5iJAwykvWJf20.mp3",
    yS7aiYdIV6YnJ3ZFcQZA: "https://storage.googleapis.com/eleven-public-prod/database/user/Yg6wPYZuRlQ3fZ8MOx02WQGiVTQ2/voices/yS7aiYdIV6YnJ3ZFcQZA/ee162e47-1170-46a9-b80c-d8cc9b41eee7.mp3",
    "6DozafBK77YWCkMMr2Ok": "https://storage.googleapis.com/eleven-public-prod/database/user/kbWak3FtLFQjRcvFciaG5df8iTg2/voices/6DozafBK77YWCkMMr2Ok/921faf72-650e-4a59-9a90-8e59085a85fb.mp3",
    zRKf3RQpAJq11rSezsxD: "https://storage.googleapis.com/eleven-public-prod/database/user/1bvJ6MGTHVOxfTwuEhCf0yWMqu22/voices/zRKf3RQpAJq11rSezsxD/QB9YGTkCjzIdNYJ6BDsW.mp3",
    IZKDEBDVLx4BnFc8W03D: "https://storage.googleapis.com/eleven-public-prod/database/user/d7OWNY850EO48zNk8riuVbVqDHp2/voices/IZKDEBDVLx4BnFc8W03D/WeyJ3CTzY0wjgaGFn582.mp3",
    "618Y3IAxt3co9hC3Dbsa": "https://api.us.elevenlabs.io/v1/voices/618Y3IAxt3co9hC3Dbsa/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiV0RtRENyajVESWFJOEpLN2xiakdWdG9EOVR5MSIsImZpbGVuYW1lIjoiaEVHWjE0UU9nR0NVUjA1d3ZXaHYubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    EVrmXYJtN1IV4SK0JLro: "https://storage.googleapis.com/eleven-public-prod/database/workspace/d66ac28b46094a9f888f3a36baf33811/voices/EVrmXYJtN1IV4SK0JLro/39a73746-a5e7-4d9b-b9e9-9b651620c5c4.mp3",
    "6Xq32rHt6oAu98TBDKfr": "https://storage.googleapis.com/eleven-public-prod/database/workspace/8ebfbe797c15440cbbb79d6cb287931c/voices/6Xq32rHt6oAu98TBDKfr/b351c397-6d7f-4f31-8934-411e27bbe6ef.mp3",
    jydR2VHYWfW6Yi35URqJ: "https://storage.googleapis.com/eleven-public-prod/database/user/6YS9ppPduBOiXZjYcxWA3eiPBhb2/voices/jydR2VHYWfW6Yi35URqJ/7bdd9ae9-526f-4f94-b879-a8317092c090.mp3",
    Zm5fDdtChmOUe69OSYwx: "https://storage.googleapis.com/eleven-public-prod/database/user/VAXlzzoGHgYxb9NfCxLn8mRsPVx2/voices/Zm5fDdtChmOUe69OSYwx/s2zC9VyzB8mFzu8SSh4u.mp3",
    h7K5CmpgjUpbfD1vi7Zz: "https://api.us.elevenlabs.io/v1/voices/h7K5CmpgjUpbfD1vi7Zz/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiNVlRZHYzNjU2M2ZRckltWWpCVDRZdDdRMUdPMiIsImZpbGVuYW1lIjoiQnNHUmNKTW9FZUVlYzhuNVRqWHoubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    z52gEIoQzfRHDNXFBlUl: "https://storage.googleapis.com/eleven-public-prod/database/workspace/e475517357fc4bb289063109ca5f3bc6/voices/z52gEIoQzfRHDNXFBlUl/bf034013-2de3-41e7-aeb6-b03f29c9107b.mp3",
    cvguG4SQfZYZ0wHQTNLF: "https://storage.googleapis.com/eleven-public-prod/database/user/Xo9SfPPDRxXQC6qPNGxCc8xr4Eo2/voices/cvguG4SQfZYZ0wHQTNLF/9iebIkaKkdQdutkLZv4y.mp3",
    e71pPu7iHH7VarkDhDNk: "https://storage.googleapis.com/eleven-public-prod/database/workspace/55bb4b10559849608769191de824c3d6/voices/e71pPu7iHH7VarkDhDNk/9c4vcgSzajJsId4xjSDo.mp3",
    GdbrbFjAI4wKg8XPPRWg: "https://api.us.elevenlabs.io/v1/voices/GdbrbFjAI4wKg8XPPRWg/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiWWRvY3M4OWFvbmdBaEdwOXQxVHNHcTcxT3NIMiIsImZpbGVuYW1lIjoidGVEU2NQdlZrbGdqdnk3UTVzbkEubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    rBPOXJ1BAFm78yP1UmBB: "https://storage.googleapis.com/eleven-public-prod/database/user/GK1ZcS6XkaMK8SLHhzXFSs5mKPJ3/voices/rBPOXJ1BAFm78yP1UmBB/z1MeOh7a7dq0mSSsbArM.mp3",
    t4D0JquCowxAJSt5S6b1: "https://storage.googleapis.com/eleven-public-prod/database/workspace/5c030ae94f3d4a6c9d1c55d11eb477a1/voices/t4D0JquCowxAJSt5S6b1/WXZ4WRw7UaNVgO9u5OLe.mp3",
    Y4Dv8VW6IGIXAJ67HiEv: "https://storage.googleapis.com/eleven-public-prod/database/user/OlXiU071PrWVe554lY6Tg3BJzgU2/voices/Y4Dv8VW6IGIXAJ67HiEv/974af4ec-70f2-4376-8387-2fa3f8fd19b0.mp3",
    yf9161zbUv3ksvUPn3Yg: "https://storage.googleapis.com/eleven-public-prod/database/workspace/cf7f87c8f008494c8498137fddecd5dd/voices/yf9161zbUv3ksvUPn3Yg/bd3040b4-0502-4b84-af57-0157c31cd578.mp3",
    Na53UVgcmbKZaZMsp5JE: "https://api.us.elevenlabs.io/v1/voices/Na53UVgcmbKZaZMsp5JE/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoidnk1eUgyUGFZNVZqa2Y3MGVEWnpYMDlOdkIxMiIsImZpbGVuYW1lIjoiNGNmYjg1ZDUtNDYwMS00OWU5LWI2ZDAtMjc2MmY1NzQzNDk1Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    ZdNc129jkL4w9IxtYipm: "https://api.us.elevenlabs.io/v1/voices/ZdNc129jkL4w9IxtYipm/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJhZTZiNDRkOWE2YWU0OGRjOTE4M2JkZmUwYWMwZmFlZSIsImZpbGVuYW1lIjoiMzBjZjg0NGItN2I4Ny00NzE3LThkZjYtNGQwODcxNGMwMjE5Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    QU8w26MMkEgMWCbCiebE: "https://api.us.elevenlabs.io/v1/voices/QU8w26MMkEgMWCbCiebE/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiU2FBVVVSYWdnQ1lVUHhnZmVCU0xVUk81cTczMiIsImZpbGVuYW1lIjoiMDk4NmM5NmYtNDVhOC00Y2FlLThiNDMtNDBlMWIzNmM4ODQ4Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    i5pAdlAfmoAYKmD5vJu5: "https://api.us.elevenlabs.io/v1/voices/i5pAdlAfmoAYKmD5vJu5/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiaXZoeXYzZUZpNlR3cnEzSXJMZGV1MEc2U201MyIsImZpbGVuYW1lIjoiVGdQNXhrcXZ4czVZS2NQU2tNM2EubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "47rM9DW5VmjOw23BVHWi": "https://storage.googleapis.com/eleven-public-prod/database/workspace/8b673ecd50964d0c9a44fd4be3ee4e75/voices/47rM9DW5VmjOw23BVHWi/k5S2vEYnPfG1H9GBorFI.mp3",
    SV45Oxy7wx09dotPbEsL: "https://storage.googleapis.com/eleven-public-prod/database/user/aebtjiDGQsYbSlwW9Va7dA5CmfC2/voices/SV45Oxy7wx09dotPbEsL/Q0a7NP0uI98LY1qP0zTY.mp3",
    QtiWG8SzdwWbDkee1llf: "https://storage.googleapis.com/eleven-public-prod/database/user/nYc9sLncligYnPtUuli1QLZm3EQ2/voices/QtiWG8SzdwWbDkee1llf/5bb16e1c-c7af-4a1b-bc32-be5e227885ba.mp3",
    jdCnxs34TN80uQ8DRnGR: "https://api.us.elevenlabs.io/v1/voices/jdCnxs34TN80uQ8DRnGR/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoicUo1NGNzVmcwUmhuaEFXSGZvb0hJUmliOUx1MiIsImZpbGVuYW1lIjoiZGI1Yjk5YzItZTBlMy00YmQ2LWEzMjMtYmE2NzUzMTA1NDg2Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    z0sFkIJmtuNe02qXdxS4: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1779f0a9611048b0aef02a618faeb758/voices/z0sFkIJmtuNe02qXdxS4/ed5880dd-ded4-4959-8d3c-89be19e8d8cc.mp3",
    t3OMlxHxJtV0RvnZAY1X: "https://storage.googleapis.com/eleven-public-prod/database/workspace/980cca7c4c8f4c44b8788023c39b0550/voices/t3OMlxHxJtV0RvnZAY1X/86b5ab99-e44d-4cb6-9b39-f2133ea2345a.mp3",
    ycdoVV3u5QkyL6D3WouV: "https://storage.googleapis.com/eleven-public-prod/database/workspace/b8bb23cd2a564f9c805150125ad0a9eb/voices/ycdoVV3u5QkyL6D3WouV/3ed6ee19-1510-4d7d-9d36-ad75199dfe2e.mp3",
    mwLufM1J13N37It93eQN: "https://storage.googleapis.com/eleven-public-prod/database/user/ha5bhOJw63U4IC0GEBdGzgUfk2H3/voices/mwLufM1J13N37It93eQN/Q5IQVQhjDUZzaJjSgfxm.mp3",
    o7eW6FU1U8btdmuKphGp: "https://storage.googleapis.com/eleven-public-prod/database/workspace/71c8e9aa82724ab7a3910f94aa87bd1e/voices/o7eW6FU1U8btdmuKphGp/59ce55ad-0fbf-4b6c-bf81-8fa392438a88.mp3",
    a1l7pVQbs9gSUbJwzceV: "https://storage.googleapis.com/eleven-public-prod/database/workspace/666a4c01d7534b96a0dd65bd3e5f91d6/voices/a1l7pVQbs9gSUbJwzceV/82b1a843-f4dc-4f2d-8ff8-44b949bfa4b6.mp3",
    bgEAVlb0lL0mCSoVll8V: "https://storage.googleapis.com/eleven-public-prod/database/workspace/8dc3c63197b1498db19678ef96d54018/voices/bgEAVlb0lL0mCSoVll8V/8061101d-b428-417b-bfec-980ce84c10a7.mp3",
    cn9QbYLDiF52pxTcyPCR: "https://storage.googleapis.com/eleven-public-prod/database/workspace/27d81469017d4183951537dc66bfc1ab/voices/cn9QbYLDiF52pxTcyPCR/79uNAWZ9URoYJTvvBmMx.mp3",
    oeKUzII6QxB7vwV6fpNJ: "https://storage.googleapis.com/eleven-public-prod/database/workspace/93ff6baa66e24fef9966022f5de35d23/voices/oeKUzII6QxB7vwV6fpNJ/TPoJ0unyRLvnSbDGZ8Ta.mp3",
    XjVSVJF6jufs6Ra4im1Y: "https://storage.googleapis.com/eleven-public-prod/database/workspace/891adfee9511461fa0ea750c1b55ef6c/voices/XjVSVJF6jufs6Ra4im1Y/485539b2-a74d-4ce0-ae31-45571c3bd1e9.mp3",
    ZvBK3ITp9pAzXbi1yZZH: "https://storage.googleapis.com/eleven-public-prod/database/workspace/872d9de6456448e3bd3629f430ffa9df/voices/ZvBK3ITp9pAzXbi1yZZH/xxAKnJT0lXPpbF4bIH3C.mp3",
    bGrXyJJO3GAb4CT9ltbv: "https://storage.googleapis.com/eleven-public-prod/database/workspace/034ccc408b4448ff927ae38a436a0745/voices/bGrXyJJO3GAb4CT9ltbv/wG1Kz71BFJhZKUByHut8.mp3",
    sCYt2S4nEa0lxHkRcAhF: "https://api.us.elevenlabs.io/v1/voices/sCYt2S4nEa0lxHkRcAhF/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJhMWIwNzdjODdiZGU0ZDI4OTkxMTgzNDQ3ZDA2NzM1ZiIsImZpbGVuYW1lIjoiWTN1aDdnOU1JWVZ0NGduN1FPZEYubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    NV65rsWKKwDTitsATdTM: "https://storage.googleapis.com/eleven-public-prod/database/workspace/f52bf2543b9a4d0d87b196e89a508e2e/voices/NV65rsWKKwDTitsATdTM/lVa71g4Ou9CaV2wPyYyh.mp3",
    RCmOaM1iiIH5xX3QXjIF: "https://storage.googleapis.com/eleven-public-prod/database/workspace/71d2e62f6bd946aca53d77fc2548d715/voices/RCmOaM1iiIH5xX3QXjIF/8a00ebd2-316a-4d0f-82b8-e973cd056351.mp3",
    Vp4b9bJAJtQ0y5rS5UUQ: "https://storage.googleapis.com/eleven-public-prod/database/workspace/807d94bf53da4544acb7f642a69a7474/voices/Vp4b9bJAJtQ0y5rS5UUQ/BHxkhVmICH0GZ702yE3x.mp3",
    tyd5A7L2LUoYAd7Fxa6G: "https://api.us.elevenlabs.io/v1/voices/tyd5A7L2LUoYAd7Fxa6G/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJjMzAyZDEwNzgxNDQ0MDNiODdlMmZmZWFlMzMzMDIwMCIsImZpbGVuYW1lIjoiMkd3RjNNNm43WEFhUjZZaEFXZ2EubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    pfqBArlVn2OAuI4hTapJ: "https://api.us.elevenlabs.io/v1/voices/pfqBArlVn2OAuI4hTapJ/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI5NTY4OThhYTRkNjE0MjdmYjQyODRhMzZiZmM4YTNhNSIsImZpbGVuYW1lIjoiNGNpSHpVVEN6bjN1dEFRMTkzekQubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    PFBSNl3TjKkPz6LaOfWE: "https://storage.googleapis.com/eleven-public-prod/database/workspace/9ae49928e31f4e8fb68768def454fddb/voices/PFBSNl3TjKkPz6LaOfWE/yZYlPQuPg5QyVmY4J0BZ.mp3",
    yzuu0gLb9YnVmWTF1V3K: "https://storage.googleapis.com/eleven-public-prod/database/workspace/091deb2b98dd40cbb96ecf1e93857c35/voices/yzuu0gLb9YnVmWTF1V3K/b152986c-b851-4206-b816-1cf82ea3df18.mp3",
    "9FhIljxdGFirnCpAoUES": "https://api.us.elevenlabs.io/v1/voices/9FhIljxdGFirnCpAoUES/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiIzOTk3MWVmMmY2N2I0MDkyYjZiNGM2ZWNmMTYyMjFlZSIsImZpbGVuYW1lIjoiTFVpMTFyTzJoRTdpYjZkRHRTczgubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    Dl80n1cw0TNTNuDzT8yo: "https://storage.googleapis.com/eleven-public-prod/database/workspace/ff2c8595affa4ae2b462d79be262210a/voices/Dl80n1cw0TNTNuDzT8yo/dM2XoGqNeJKNjz591Umo.mp3",
    n4euYTvlgaZvihJPnNDf: "https://api.us.elevenlabs.io/v1/voices/n4euYTvlgaZvihJPnNDf/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI5ZGI0ZGQyMDNhYTg0ZjA3Yjc3ZDExNWM4YTBjN2Q5YSIsImZpbGVuYW1lIjoiVFVWWDdQRXUxbXh1d00wVjFjbU4ubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    B03IOqmBRuBBd8BmKMso: "https://storage.googleapis.com/eleven-public-prod/database/workspace/c1b1accb6cba42fb81ebec35a300050c/voices/B03IOqmBRuBBd8BmKMso/c3ddb6e9-9095-4887-a06d-0dd52e3f75ed.mp3",
    qLk6yIwQI3GT5JfYLzBU: "https://storage.googleapis.com/eleven-public-prod/database/workspace/73dc925202d74b189621e31783019523/voices/qLk6yIwQI3GT5JfYLzBU/FEgGWwBdgMq7BBMULlfc.mp3",
    "0ie70vBIPQXddQI95OFn": "https://storage.googleapis.com/eleven-public-prod/database/workspace/861ef10330b447a1998f2c61df0b9d56/voices/0ie70vBIPQXddQI95OFn/UrgpU3MCtfuIre5b7MEv.mp3",
    VkVta8aQDb7eZk4ROlWP: "https://storage.googleapis.com/eleven-public-prod/database/workspace/91cc8177b06143efb640768fc18df7e8/voices/VkVta8aQDb7eZk4ROlWP/96e4d7e2-abad-4751-8a32-5346b19097b4.mp3",
    d2oNjZLIVz88ojPawBtI: "https://storage.googleapis.com/eleven-public-prod/database/workspace/be4464b5f9584d428693310993d84342/voices/d2oNjZLIVz88ojPawBtI/KTvUY3gcqp2ruYhH064U.mp3",
    v9xDI1D9j2A4DQX4FdMU: "https://storage.googleapis.com/eleven-public-prod/database/workspace/f43e508fedad47ec9355589624f22ea4/voices/v9xDI1D9j2A4DQX4FdMU/bcbc1dae-bf71-49cc-8c13-6d03721d7b69.mp3",
    DjY392W4TymVhSsT96jM: "https://storage.googleapis.com/eleven-public-prod/database/workspace/607c22e95ac64ad183e645bc236b0acf/voices/DjY392W4TymVhSsT96jM/0191db5f-aa47-4155-a858-a78c26841c4a.mp3",
    "047Dj7L3DxuCp5mNG76T": "https://storage.googleapis.com/eleven-public-prod/database/workspace/7ac0adbdd1ff497293dcb79cafc265bf/voices/047Dj7L3DxuCp5mNG76T/BN8yBCEltErMIEQO9Cgs.mp3",
    IGtlBHdBES5Eg7GWNRLm: "https://storage.googleapis.com/eleven-public-prod/database/workspace/dd1a72c67faf464cad9e8c28cf3d249c/voices/IGtlBHdBES5Eg7GWNRLm/QZVQ5CIlbVsvepzs3ZYZ.mp3",
    Tr84Gom1NKJwoYZT55td: "https://storage.googleapis.com/eleven-public-prod/database/workspace/d0ed37582ebd4b72a9cfab4dcc9e65e4/voices/Tr84Gom1NKJwoYZT55td/fBuP5vAmxuEezJT1L2oW.mp3",
    ayK39ZyrEC0R93eVpxWC: "https://storage.googleapis.com/eleven-public-prod/database/workspace/e54146406d1b460a87928cfe3a2979fe/voices/ayK39ZyrEC0R93eVpxWC/2f59d531-903f-4aa6-8b57-d42cb147a9d2.mp3",
    uN2lv5lSgnxa1hcYRElP: "https://api.us.elevenlabs.io/v1/voices/uN2lv5lSgnxa1hcYRElP/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJkMDYyYjVjNGJiOWE0NGQxOWNmMDljMTZjYmVlZTA0MCIsImZpbGVuYW1lIjoiRUllWlhMODI5dG9naUF1M0ZaWlEubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    "9KM1cGGyC93zv9n4CkYl": "https://api.us.elevenlabs.io/v1/voices/9KM1cGGyC93zv9n4CkYl/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJiNTE2ODM4ODg2NzM0NWZhYWU3NTQyNzE0MTkxNWQxZSIsImZpbGVuYW1lIjoiZTA1ODAxZTgtYzI4Mi00Mzc1LTllZTItYmY5YzA3ZDgzMDllLm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    GQli0CicYkuiZWSz59Ri: "https://storage.googleapis.com/eleven-public-prod/database/workspace/c03283e59e5548b5a9c4b23517796203/voices/GQli0CicYkuiZWSz59Ri/b124fcb2-fead-4944-a093-2b786c09a625.mp3",
    UuMSQK8FdLwaY2M8ZAnh: "https://storage.googleapis.com/eleven-public-prod/database/workspace/a725c63bf7f14d05aba8b2f32054e185/voices/UuMSQK8FdLwaY2M8ZAnh/82275d00-4b6b-4a98-b0cb-ef6590209b53.mp3",
    FakNc5gCZMILOW8jXlh1: "https://storage.googleapis.com/eleven-public-prod/database/workspace/7d05988a05f94f5584290b9ae442caf1/voices/FakNc5gCZMILOW8jXlh1/UOz5LUm8QehAWpIGup5n.mp3",
    DiLWfEG10HWdK9eTPvxa: "https://storage.googleapis.com/eleven-public-prod/database/workspace/801739ac72c64d3b96baab521a715d6d/voices/DiLWfEG10HWdK9eTPvxa/8Kd3241bDZOjCp3quGzp.mp3",
    WSNBMAKh6ZaZ1l2XCiCV: "https://api.us.elevenlabs.io/v1/voices/WSNBMAKh6ZaZ1l2XCiCV/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJmMTk3ZjA0NTU3YzY0MGU2YTk5ZGUwNTdlYjE2NGFmYiIsImZpbGVuYW1lIjoidFB2MW1tMlNlS2NXM0lDenh5aW4ubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    hNqI13qZhltY4utMKOCw: "https://storage.googleapis.com/eleven-public-prod/database/workspace/96b34ed932b34e2d9be7d7a8cc0e869c/voices/hNqI13qZhltY4utMKOCw/a21287ef-c3fe-4b48-bd9f-a3d01e85a1aa.mp3",
    "4RxSfcAmpcEpzF5xYuGb": "https://storage.googleapis.com/eleven-public-prod/database/workspace/491d504eedeb45a19424aea24da4fe7f/voices/4RxSfcAmpcEpzF5xYuGb/4cb61d20-f195-4236-9b83-56abd1292184.mp3",
    "6dzxwqhri4WiXg1AUok0": "https://storage.googleapis.com/eleven-public-prod/database/workspace/6d8ae452cecc4a479a05448d2db3ed12/voices/6dzxwqhri4WiXg1AUok0/Ms03rRODduoZOboKdQX5.mp3",
    uHLpwwj3Q860zFfPXdBO: "https://storage.googleapis.com/eleven-public-prod/database/workspace/b0ae804120de497d8895c34309a4827f/voices/uHLpwwj3Q860zFfPXdBO/7116e773-c08d-41a9-a2e6-28f756da8429.mp3",
    f7RZxl95emd0NO3GNqLy: "https://storage.googleapis.com/eleven-public-prod/database/workspace/e1e53436e181483badec6547be06bf2f/voices/f7RZxl95emd0NO3GNqLy/vm6G1ZwQHMNnFegzClzy.mp3",
    pLQJCzpzwaedKVuhI1Mq: "https://storage.googleapis.com/eleven-public-prod/database/workspace/bde48e9434a349c699bdb238f3b9b853/voices/pLQJCzpzwaedKVuhI1Mq/vJgaElDzzItDcgm7VrT6.mp3",
    ulcnobedG6TIzx8i5ddD: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1508953c22594b729de41e115783c515/voices/ulcnobedG6TIzx8i5ddD/IlsFKhm9OdIYiF3YJWy5.mp3",
    Jmio6r8OUeqiK3cZ3N0K: "https://storage.googleapis.com/eleven-public-prod/database/workspace/dbb40cfc6dee4f1a825121f45d59e95d/voices/Jmio6r8OUeqiK3cZ3N0K/ad87276c-299c-47c4-af78-16ab596106ac.mp3",
    sX6cITSHF665hc5Ox1Ok: "https://storage.googleapis.com/eleven-public-prod/database/workspace/ddfe2b1e20c14ee18aa5c39e2b4d5798/voices/sX6cITSHF665hc5Ox1Ok/jkQvaXrB4CzGxOcT5X7U.mp3",
    i40UIucSPU9QmRroAeUB: "https://storage.googleapis.com/eleven-public-prod/database/workspace/a878f838a6f149329569d0c9ff1706ae/voices/i40UIucSPU9QmRroAeUB/c25cf32d-b089-4bb5-a039-0c21f71ea3c6.mp3",
    iCOyvtdHUPOHaQYt93QQ: "https://storage.googleapis.com/eleven-public-prod/database/workspace/a0a53acd203b4f5d92b78f7efff1d170/voices/iCOyvtdHUPOHaQYt93QQ/K4rzzBgar0w0tm106uV6.mp3",
    xTG6Keq2fMgjU60Oru4s: "https://api.us.elevenlabs.io/v1/voices/xTG6Keq2fMgjU60Oru4s/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI2ZDUwYWQ2MWE4NzI0NzM0ODU5ZDNkNTBiMmJiYWMwNyIsImZpbGVuYW1lIjoiaDBRUHdSM2xLQ3RXeHBQV2d4M28ubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    X7SC5Yq9gxIhQRZFkW6n: "https://storage.googleapis.com/eleven-public-prod/database/workspace/2ea8c65aa79f48e59ad0d18a7f2d74ce/voices/X7SC5Yq9gxIhQRZFkW6n/6f148453-86a3-45e9-8dfd-ffaaaaa92a31.mp3",
    HlT1n0XsMzPtKnyI9giX: "https://storage.googleapis.com/eleven-public-prod/database/workspace/132cefac27384f5aaba8540b7d3b4c80/voices/HlT1n0XsMzPtKnyI9giX/5fe63566-df5c-4fb1-8d6c-ae9de2199e72.mp3",
    fHoTVXaCEnVi1gp23Khy: "https://api.us.elevenlabs.io/v1/voices/fHoTVXaCEnVi1gp23Khy/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI4OTJlYzBiODZkNTQ0OWQ3YmU5MDViYmE4ZjA1NzBiZSIsImZpbGVuYW1lIjoiMWI5MzNkNWUtYWM1NS00ZDBlLWJhMmEtMzkxMjU4ZmQ5ZTc1Lm1wMyIsInRpbWVzdGFtcCI6MTc4NTYzOTYwMDAwMDAwMH0%3D",
    iSV1G4KvpGE3D8qzAzwG: "https://storage.googleapis.com/eleven-public-prod/database/workspace/3020b36341374893b5e081711e4812e8/voices/iSV1G4KvpGE3D8qzAzwG/uL97ZUIacQXPSGfrR4j1.mp3",
    "5jN6oTwnKD3vABpzs579": "https://storage.googleapis.com/eleven-public-prod/database/workspace/6cb9cd11aa434c7a8844d6b89236d61e/voices/5jN6oTwnKD3vABpzs579/oPhO97nycokkhr17WjEL.mp3",
    YeV2u3R2gzLArVTYTis8: "https://storage.googleapis.com/eleven-public-prod/database/workspace/0baaf73cb5c74fd9a21ca47c1dc0b78d/voices/YeV2u3R2gzLArVTYTis8/ELBKuO0ZyOXRaPtZBdRg.mp3",
    CE5BJM57m1rtrAFVXfCq: "https://storage.googleapis.com/eleven-public-prod/database/workspace/b3945685504843abb8de2691d8b29315/voices/CE5BJM57m1rtrAFVXfCq/31KACOd61Lod0syxqwER.mp3",
    sXmVKe5kSMYZgJ9Vxulp: "https://storage.googleapis.com/eleven-public-prod/database/workspace/d734ea441a144049be8f50de8589c5af/voices/sXmVKe5kSMYZgJ9Vxulp/f1f90357-8c48-4660-810e-90be73f3a63a.mp3",
    Nlq3rQVjeL97IybteS9j: "https://storage.googleapis.com/eleven-public-prod/database/workspace/577ef34696144a76a7b2a9580552ebdf/voices/Nlq3rQVjeL97IybteS9j/0dd3e09a-2c52-40ac-a108-d0974460234e.mp3",
    RtGVS71XbXuxkXJEzl7D: "https://storage.googleapis.com/eleven-public-prod/database/workspace/f665490ae6ca4cab9ada57d725c79b56/voices/RtGVS71XbXuxkXJEzl7D/aefc6a24-ffd8-4e54-ab16-8c68b4bfe242.mp3",
    gLylrLE4itgnR8BOPv0E: "https://storage.googleapis.com/eleven-public-prod/database/workspace/b4c5b356221a430caef9846e31e71011/voices/gLylrLE4itgnR8BOPv0E/4ca73378-1e19-407b-9060-b7f42ada1516.mp3",
    X2s2nTXcNoEq7dFBXgNS: "https://api.us.elevenlabs.io/v1/voices/X2s2nTXcNoEq7dFBXgNS/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI4MTNmNWYzNjhkNzk0NDMwOWEwYmYzMDljYWRhNWYwMiIsImZpbGVuYW1lIjoiNVluRTVsQ0dYTXJmZ1Y3QzN4d3oubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D",
    HjaoeImYIRU5vd6s2g8w: "https://storage.googleapis.com/eleven-public-prod/database/workspace/e5a777e1ea8e49cab7ce7ec284d513cd/voices/HjaoeImYIRU5vd6s2g8w/8e5e2357-39c3-4e86-a7a9-886ad0383c4e.mp3",
    kyWPawcLE727zSyf3yY6: "https://api.us.elevenlabs.io/v1/voices/kyWPawcLE727zSyf3yY6/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI0NzdjZWY3NmQ1ZWU0MzYyYTFiNTlmYWY4NzU3Y2EyMiIsImZpbGVuYW1lIjoiMVY0OUVzdnVGb0ZtdkM2b3RHcFcubXAzIiwidGltZXN0YW1wIjoxNzg1NjM5NjAwMDAwMDAwfQ%3D%3D"
  };
});
var Ro = Z((_0x2bd0a8, _0x50e277) => {
  var _0x494ac3 = [["3VnrjnYrskPMDsapTr8X", "Tung Dang - Deep, Warm and Resonant", "male", "North"], ["aN7cv9yXNrfIR87bDmyD", "Ninh Đôn", "male", "North"], ["UsgbMVmY3U59ijwK5mdh", "Trieu Duong", "male", "South"], ["ueSxRO0nLF1bj93J2hVt", "Trung Caha - Clear, Firm and Informative", "male", "North"], ["A5w1fw5x0uXded1LDvZp", "Nhu", "female", "VN"], ["d5HVupAWCwe4e6GvMCAL", "Mai - Natural, Bright and Authentic", "female", "VN"], ["DvG3I1kDzdBY3u4EzYh6", "Ngân Nguyễn", "female", "VN"], ["558B1EcdabtcSdleer40", "Thảo - Soft, Calm and Gentle", "female", "North"], ["jdlxsPOZOHdGEfcItXVu", "Hien", "female", "North"], ["7hsfEc7irDn6E8br0qfw", "Hai Ly", "male", "South"], ["6adFm46eyy74snVn6YrT", "Nhật Phong", "male", "North"], ["0ggMuQ1r9f9jqBu50nJn", "Thắm", "female", "North"], ["KVzG2JMdZJKi6y7cwERP", "Quang Nguyen", "male", "North"], ["5vqV9IG7sDpzgzKOIZAv", "Kenh", "female", "VN"], ["XBDAUT8ybuJTTCoOLSUj", "Đức", "male", "North"], ["foH7s9fX31wFFH2yqrFa", "Huyen - Calm, Friendly and Clear", "female", "Central"], ["BlZK9tHPU6XXjwOSIiYA", "Trang - Clear, Smooth and Direct", "female", "North"], ["9EE00wK5qV6tPtpQIxvy", "Tuan - Friendly, Calm and Trustworthy", "male", "VN"], ["FTYCiQT21H9XQvhRu0ch", "Trung", "male", "South"], ["ywBZEqUhld86Jeajq94o", "Anh", "male", "North"], ["ipTvfDXAg1zowfF1rv9w", "Hoàng Đặng", "male", "North"], ["1d5Bb0SMBPB10Gx6iQeu", "Tung Dang - Warm, Calm and Gentle", "male", "North"], ["BUPPIXeDaJWBz696iXRS", "Dũng", "male", "North"], ["RmcV9cAq1TByxNSgbii7", "My", "female", "Central"], ["a3AkyqGG4v8Pg7SWQ0Y3", "Ngan", "female", "Central"], ["JxmKvRaNYFidf0N27Vng", "Son Tran", "male", "Central"], ["EcENCamMHdzIoMysqdsv", "Ethan", "male", "Central"], ["7XOKiK112QRZRSLbCfMc", "Liam", "male", "North"], ["qByVAGjXwGlkcRDJoiHg", "Kiều Linh", "female", "VN"], ["M0rVwr32hdQ5UXpkI3ni", "Hao", "male", "South"], ["DXiwi9uoxet6zAiZXynP", "Hung Tran", "male", "South"], ["iSFxP4Z6YNcx9OXl62Ic", "Viên", "female", "North"], ["Si3s1VCb7dLbeqH57kiC", "Quynh Anh", "female", "VN"], ["X0V9HEDEuaVhVqzVPUKM", "Giang - Warm, Confident and Inspiring", "female", "South"], ["7WNWm0yUcEolHsfg5Bhk", "Sang Truong", "male", "South"], ["N0Z0aL8qHhzwUHwRBcVo", "Thanh - Clear, Steady and Informative", "female", "South"], ["HQZkBNMmZF5aISnrU842", "Ly", "female", "VN"], ["deC6NEXcbavaVWbzjgzb", "Phuong", "female", "Central"], ["QqID1ZB0DTItNxAKGBNW", "Viết Linh", "male", "VN"], ["RxhjHDfpO54FYotYtKpw", "Phong - Warm, Clear and Expressive", "male", "North"], ["LPldyaIkUUSOPCRFrgYJ", "Hùng - Steady, Firm and Serious", "male", "South"], ["CxJbDdwqY48MY3gPVYwe", "Đô Trịnh", "male", "North"], ["KkZEqzG4FfkIHMbzFAnu", "Nam - Clear, Firm and Steady", "male", "South"], ["HG0MlJIknmaXREpTckfK", "Tuan Anh - Deep & Narrative", "male", "North"], ["4a9d2yNlrzn6YEoy5ZWT", "Kyle", "male", "VN"], ["8PEPqUGgvwN1Fk9KR8jV", "An Nhiên", "female", "South"], ["xVv8qLTTnsYnrysc2Lx4", "Thai", "male", "North"], ["5g2DMFQF8xR0KmnuNr4U", "Hoa - Smooth, Gentle and Poetic", "female", "South"], ["NSzi72jFi7P1JqCwPRuM", "Henry", "male", "Central"], ["Vr1jwoqy1MDvyAPwDY9C", "Xuân Lượng", "male", "North"], ["Na15FlRRkMEDtEW4nVVP", "Thanh Ngọc", "female", "South"], ["oN0q7mZB5kootbGrbqix", "Emma", "female", "VN"], ["rXOGzMiqbmjugMpzKMEx", "Freya", "female", "North"], ["kPNz4WRTiKDplS7jAwHu", "Tran Thanh", "male", "South"], ["oLR5l8TbWm0sNc5LspDA", "Thanh - Deep, Calm and Steady", "male", "South"], ["1l0C0QA9c9jN22EmWiB0", "Jade", "female", "Central"], ["DVQIYWzpAqd5qcoIlirg", "Duyen - Bright, Clear and Captivating", "female", "Central"], ["w2KTJ6MO4SIK6nWK4YH8", "Đuc Huy", "male", "South"], ["HAAKLJlaJeGl18MKHYeg", "Trang - Soft, Whispery and Peaceful", "female", "South"], ["K7ewtjKRNtwwt3lKQ6M0", "Tony Hoang", "male", "North"], ["1rqNHUqUbBGpY3OyzPMI", "Duyen - Sweet, Calm and Gentle", "female", "Central"], ["f5q6kePPoQAjCPYG6moa", "Giang - Northern female Narrator", "female", "North"], ["s6W2NupNY6TykGJoDtWy", "Giang", "female", "VN"], ["WVkYyTxxVgMOsw1IIVL0", "Hieu Tran", "male", "North"], ["mJLZ5p8I7Pk81BHpKwbx", "Nam Sadoma", "male", "VN"], ["eZ248pfac00g3092s7h8", "Huy Le", "male", "North"], ["nbv4fVbfyLxvuHzyIeDo", "Ngoc Diem Pham", "female", "North"], ["KpzB5RgCRuVkUlZeY6wb", "Trinh", "female", "North"], ["hfQXFFMygx7xoaljt9aE", "Zenson", "male", "VN"], ["q6uIUrmSRksEvUMlwYPR", "Huong", "female", "Central"], ["4HGP1feHKTQ1DJst6Tk8", "Ton", "male", "North"], ["ZsjEJaLQy3sgvwxicmDx", "Quang Toan", "male", "South"], ["szlbmCOTZzG1seZ82nZs", "Mai Hoàng", "female", "VN"], ["L5c6tGA8OiORYKxez5Zu", "Linh - Soft, Calm and Expressive", "female", "Central"], ["In8K4JDLu1r9fGysc64F", "Tuan", "male", "VN"], ["TSQmL8GUTyX83rgaewuP", "Xuan Hi", "male", "VN"], ["faGOoglJYMOx2d1ya5l9", "Xuan", "male", "VN"], ["P37gHF6iLTEvs2pLYhyv", "Anna Thu", "female", "VN"], ["IovBBFnLZ6QzJhFLLroy", "Tam Nguyen", "female", "VN"], ["jpmnSYDOADVEpZksbLmc", "Nhung", "female", "North"], ["VkftF4RyfVI5yIYa6wFa", "Huy Bùi", "male", "North"], ["ArosID24mP18TEiQpNhs", "Trang - Warm, Trustworthy and Inspiring", "female", "North"], ["KqbkuMVLVelcCTkFXEbE", "Man Nghi", "female", "South"], ["Sd0vUjtPZLtmojfIMHMx", "Lily", "female", "VN"], ["BLeuF5fPXWSDAwZScbTY", "Dahlia", "female", "VN"], ["JYT6xPLD3LGl0ui3YXNq", "Khanh", "male", "South"], ["pGapy9MNHCukzJtjavF0", "Hạnh", "female", "North"], ["g0UtKHMoHYe4SHQobaIL", "Kim - Storytelling, Calm & Real Voice", "female", "South"], ["7clfgAuss1M0JUYGlh1t", "Phước", "male", "South"], ["TIQkE9DDukawEm00ejgd", "Triet Ngo", "male", "South"], ["QocxxnxEa0x8mrL2d4VT", "Zara", "female", "Central"], ["f966mdF5njWREvreUG07", "Quyen Ru", "male", "VN"], ["FfC8yOt3HaUlZaet6DPx", "Trung Caha - Articulate and Informative", "male", "VN"], ["FSA98p0BgnTAzCpH8avM", "Vinh", "male", "Central"], ["5GqeT84PUduicivx0y5x", "Thang", "male", "South"], ["xPEfmymXC4WdBxGMznS7", "Tuyết", "female", "South"], ["2XWF6DSCzum3KkiywGE8", "Thanh - Storyteller", "male", "North"], ["z9AwTVuN8C7iJ75jitEW", "Huy", "male", "North"], ["MqsnLOwcpkRUz9a4AhNi", "Phương", "male", "VN"], ["sbaSITtJLv4yb3vIi67Z", "Nam - Calm, Warm Voice Actor", "male", "North"], ["2ZUpiKo5wCCuypvx2zaS", "Tony Nguyễn", "male", "North"], ["wvL4QjDMWwrrTQuXUYlw", "Simon", "male", "VN"], ["9RpzPSAZdsH0F8tpXfP4", "Truc Lam", "male", "South"], ["Wzj3w9OuQFcoiuKPnk3j", "Luci", "male", "VN"], ["oAvm5cbNCsMTdnhtmIs4", "Nguyet", "female", "VN"], ["qp0lBtq2TxYPepHSR0D1", "Minh - Clear and Firm Narrator", "male", "VN"], ["pFEtwO9FWuRIINWTs00y", "Ngọc - Warm, Smooth and Sincere", "male", "North"], ["9w5lSVhu8VnBEqFqdrD9", "Hop Le", "male", "Central"], ["zIusdI28yOZPwIBus0aI", "Ân", "female", "South"], ["ux9eagR6pSyxgfunaGxo", "Xuan Toan", "male", "VN"], ["DTLhW2kDOWq9IAPipCcu", "Hung", "male", "South"], ["CQAD6iKxS73fEAGjSwt5", "Giang - Podcast", "female", "VN"], ["puBBfOSRT9Dbk3FUJQGd", "Quan", "male", "Central"], ["D0dFzCacaMgMGjIksFuH", "Ngoc An", "female", "VN"], ["mTMLdrFZdBqiPUW1W47D", "Cuong Pham", "male", "North"], ["OZ41k7uYyV1AwlxmkRx0", "Loi", "male", "North"], ["BfchfKCM67ImGdaJ1smU", "Lam Vy", "female", "South"], ["JDbnZf9C4zfUzF0EuIch", "Sang Le", "male", "South"], ["5DIp7NodzHK1ZgA68hss", "Quy", "male", "Central"], ["xYqBp1MrrrBpxIdqTvgb", "Minh - Warm Vietnamese Female", "female", "VN"], ["AYozKR5VAKhmcfQriHWo", "Manh Huy", "male", "North"], ["mMa5ygDNluQLD1EaTZLI", "Tuyến", "female", "VN"], ["0xI4eT7fHnn6AHTfF4Ro", "Tieu Hong", "female", "South"], ["s06eec3OqspIDuOznMK4", "HTN", "female", "South"], ["MfnRBJHBrGwMSVFTatjK", "Tran", "female", "Central"], ["VAzxBZgjAoy5WCeMEmFW", "Lâm", "male", "South"], ["2vT8WlUXV1qBtgiLZdSb", "Mai - Warm, Formal and Professional", "female", "South"], ["0eXHGNoETNSO4IGTBKno", "Nam - Calm, Smooth and Relaxed", "male", "South"], ["u8EWWYyBDfXFxHak7WM3", "Nathan", "male", "Central"], ["eMZSaad4tZC98eLRlyKT", "Huyen - Clear, Confident Narrator", "female", "VN"], ["Y3DoBhgPgHh29oMNUEDk", "Ngọc - Soft, Thoughful and Elegant", "female", "Central"], ["aNgyJM3HqLEAaxmXxG1V", "Khanh Tu", "female", "South"], ["2wMoasbnkroyeaj9FYxI", "Dao", "female", "VN"], ["hNe03uL2BbiU3txTclei", "Dũng Trần", "male", "North"], ["xfUqvWWCktUreI6zhcEq", "Nation", "male", "VN"], ["eqMFh4kWVrmjm0Bcil6E", "Nguyen", "female", "Central"], ["ZlVlUEsl3JykOGluaNu1", "Thuy Tien", "female", "North"], ["ikIaXswrYCYOUEVrkNVj", "Tuyen Nguyen", "male", "VN"], ["N8ES35RJ1GXQGHhdiimy", "Rin Dinh", "male", "VN"], ["M1eOJnaNVAbMVhDoXfRb", "Hung Pham", "male", "VN"], ["yS7aiYdIV6YnJ3ZFcQZA", "Nari", "female", "South"], ["6DozafBK77YWCkMMr2Ok", "Huynh Duong", "male", "VN"], ["zRKf3RQpAJq11rSezsxD", "Bao", "female", "Central"], ["IZKDEBDVLx4BnFc8W03D", "Minh - Warm, Calm and Intelligent", "male", "Central"], ["618Y3IAxt3co9hC3Dbsa", "Phuc", "male", "VN"], ["EVrmXYJtN1IV4SK0JLro", "Phuc Anh", "male", "North"], ["6Xq32rHt6oAu98TBDKfr", "Tram", "female", "South"], ["jydR2VHYWfW6Yi35URqJ", "William", "male", "Central"], ["Zm5fDdtChmOUe69OSYwx", "Sơn", "male", "South"], ["h7K5CmpgjUpbfD1vi7Zz", "Gia", "male", "Central"], ["z52gEIoQzfRHDNXFBlUl", "Lam Ngo", "male", "South"], ["cvguG4SQfZYZ0wHQTNLF", "Hoàng", "male", "Central"], ["e71pPu7iHH7VarkDhDNk", "Minh Dang", "male", "North"], ["GdbrbFjAI4wKg8XPPRWg", "Ky Nguyen", "male", "Central"], ["rBPOXJ1BAFm78yP1UmBB", "Owen", "male", "VN"], ["t4D0JquCowxAJSt5S6b1", "Hoa - Narration & Dreamy", "female", "North"], ["Y4Dv8VW6IGIXAJ67HiEv", "Quốc", "male", "VN"], ["yf9161zbUv3ksvUPn3Yg", "Anh Le", "female", "North"], ["Na53UVgcmbKZaZMsp5JE", "Linh - Calm, Gentle and Compassionate", "female", "South"], ["ZdNc129jkL4w9IxtYipm", "Lam", "male", "VN"], ["QU8w26MMkEgMWCbCiebE", "Tim", "voice", "VN"], ["i5pAdlAfmoAYKmD5vJu5", "Phong - Formal and Steady", "male", "South"], ["47rM9DW5VmjOw23BVHWi", "Tuan Anh - Deep & Powerful Vietnamese", "male", "North"], ["SV45Oxy7wx09dotPbEsL", "Kim - Vibrant, Friendly and Clear", "female", "South"], ["QtiWG8SzdwWbDkee1llf", "Phi", "male", "VN"], ["jdCnxs34TN80uQ8DRnGR", "Linh - Clear and Expressive", "male", "VN"], ["z0sFkIJmtuNe02qXdxS4", "Tonle", "male", "North"], ["t3OMlxHxJtV0RvnZAY1X", "Yuen Yuen", "female", "North"], ["ycdoVV3u5QkyL6D3WouV", "Le Binh", "female", "VN"], ["mwLufM1J13N37It93eQN", "Tanny", "male", "VN"], ["o7eW6FU1U8btdmuKphGp", "Le Công", "male", "North"], ["a1l7pVQbs9gSUbJwzceV", "Chinh", "male", "North"], ["bgEAVlb0lL0mCSoVll8V", "Bob", "male", "North"], ["cn9QbYLDiF52pxTcyPCR", "Thảo - Sweet Southern Female", "female", "South"], ["oeKUzII6QxB7vwV6fpNJ", "Hùng - Northern Accent", "male", "North"], ["XjVSVJF6jufs6Ra4im1Y", "Miss Thảo", "female", "VN"], ["ZvBK3ITp9pAzXbi1yZZH", "Tony Rising", "male", "Central"], ["bGrXyJJO3GAb4CT9ltbv", "Bao Ngoc", "female", "South"], ["sCYt2S4nEa0lxHkRcAhF", "Sơn Hà", "male", "North"], ["NV65rsWKKwDTitsATdTM", "Lan Phuong", "female", "North"], ["RCmOaM1iiIH5xX3QXjIF", "Khanh Lam", "female", "North"], ["Vp4b9bJAJtQ0y5rS5UUQ", "Trong Nguyen", "male", "North"], ["tyd5A7L2LUoYAd7Fxa6G", "Thuỳ My", "female", "VN"], ["pfqBArlVn2OAuI4hTapJ", "Phuong Thao", "female", "VN"], ["PFBSNl3TjKkPz6LaOfWE", "Thức Dovin", "male", "VN"], ["yzuu0gLb9YnVmWTF1V3K", "Hien Ng", "female", "North"], ["9FhIljxdGFirnCpAoUES", "Thuy Hoa", "female", "Central"], ["Dl80n1cw0TNTNuDzT8yo", "Ngoc Tuyet", "female", "North"], ["n4euYTvlgaZvihJPnNDf", "Thao Linh", "female", "North"], ["B03IOqmBRuBBd8BmKMso", "Minh Tài", "male", "South"], ["qLk6yIwQI3GT5JfYLzBU", "Ngoc Ngan", "male", "VN"], ["0ie70vBIPQXddQI95OFn", "Vo HuuNhan", "male", "South"], ["VkVta8aQDb7eZk4ROlWP", "Do Bao", "male", "South"], ["d2oNjZLIVz88ojPawBtI", "Thiện Nguyen", "male", "VN"], ["v9xDI1D9j2A4DQX4FdMU", "Cong", "male", "South"], ["DjY392W4TymVhSsT96jM", "Minh Trí", "male", "South"], ["047Dj7L3DxuCp5mNG76T", "Xuan Hung", "male", "VN"], ["IGtlBHdBES5Eg7GWNRLm", "Minh Trung", "male", "South"], ["Tr84Gom1NKJwoYZT55td", "Thế Minh", "male", "North"], ["ayK39ZyrEC0R93eVpxWC", "Tuan Saigon", "male", "South"], ["uN2lv5lSgnxa1hcYRElP", "Binh Dinh", "male", "Central"], ["9KM1cGGyC93zv9n4CkYl", "Khải Lotis", "male", "North"], ["GQli0CicYkuiZWSz59Ri", "Bảo kaka", "male", "South"], ["UuMSQK8FdLwaY2M8ZAnh", "Phanh", "female", "North"], ["FakNc5gCZMILOW8jXlh1", "Hà Giang", "female", "VN"], ["DiLWfEG10HWdK9eTPvxa", "Jolyon", "male", "VN"], ["WSNBMAKh6ZaZ1l2XCiCV", "Ngoc Nhien", "female", "South"], ["hNqI13qZhltY4utMKOCw", "Long Bling", "male", "North"], ["4RxSfcAmpcEpzF5xYuGb", "Tài", "male", "VN"], ["6dzxwqhri4WiXg1AUok0", "Quang Tien", "male", "VN"], ["uHLpwwj3Q860zFfPXdBO", "Sen", "male", "South"], ["f7RZxl95emd0NO3GNqLy", "Thuy", "female", "VN"], ["pLQJCzpzwaedKVuhI1Mq", "Nhat Nam", "male", "North"], ["ulcnobedG6TIzx8i5ddD", "Ngọc Thùy", "female", "North"], ["Jmio6r8OUeqiK3cZ3N0K", "Thu Thảo", "female", "VN"], ["sX6cITSHF665hc5Ox1Ok", "Tien", "male", "North"], ["i40UIucSPU9QmRroAeUB", "Sophisticated Tũn", "male", "South"], ["iCOyvtdHUPOHaQYt93QQ", "Tieu Long", "male", "Central"], ["xTG6Keq2fMgjU60Oru4s", "Ngoc Son", "male", "VN"], ["X7SC5Yq9gxIhQRZFkW6n", "Ben", "male", "South"], ["HlT1n0XsMzPtKnyI9giX", "Minh Anh", "female", "South"], ["fHoTVXaCEnVi1gp23Khy", "Huyen - Emotional, Calm Warm & Gentle", "female", "South"], ["iSV1G4KvpGE3D8qzAzwG", "Hạ Vi", "female", "South"], ["5jN6oTwnKD3vABpzs579", "Hoàng Bảo", "male", "South"], ["YeV2u3R2gzLArVTYTis8", "Tuan Anh - Storyteller, Warm & Deep", "male", "North"], ["CE5BJM57m1rtrAFVXfCq", "VânCa", "male", "Central"], ["sXmVKe5kSMYZgJ9Vxulp", "Te Fung", "male", "VN"], ["Nlq3rQVjeL97IybteS9j", "Ahit", "male", "VN"], ["RtGVS71XbXuxkXJEzl7D", "Vincente Toan", "male", "VN"], ["gLylrLE4itgnR8BOPv0E", "Hieu", "male", "North"], ["X2s2nTXcNoEq7dFBXgNS", "Tuyen Lam", "male", "North"], ["HjaoeImYIRU5vd6s2g8w", "lưu ly", "female", "South"], ["kyWPawcLE727zSyf3yY6", "Vũ", "male", "VN"]];
  var _0x20b56c = Oo();
  _0x50e277.exports = _0x494ac3.map(([_0x250b0f, _0xdbec05, _0xb1ad29, _0x13a601]) => ({
    engine: "elevenlabs",
    voiceId: _0x250b0f,
    label: _0xdbec05,
    region: _0x13a601,
    gender: _0xb1ad29,
    lang: "vi",
    previewUrl: _0x20b56c[_0x250b0f] || undefined
  }));
});
var pi = Z((_0x36f8ad, _0x1c6475) => {
  var {
    ICL_RESOURCE_IDS: _0x158a09
  } = Qn();
  var _0x2da225 = Do();
  var _0x17250 = Fo();
  var _0x2416d6 = Ro();
  var _0x3a64ca = [{
    engine: "capcut",
    voiceId: "bv:vi_female_huong",
    label: "Hương (Nữ Phổ thông)",
    region: "North",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "bv:BV421_vivn_streaming",
    label: "Ngọt Ngào (Nữ)",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "bv:BV562_streaming",
    label: "Chí Mai (Nữ)",
    region: "North",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "bv:BV074_streaming",
    label: "Dễ Thương (Nữ)",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "bv:BV560_streaming",
    label: "Anh Dũng (Nam)",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "bv:BV075_streaming",
    label: "Tự Tin (Nam)",
    region: "South",
    gender: "male",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Trung_Caha",
    label: "Trung Caha (Nam)",
    region: "South",
    gender: "male",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Nam_Tram",
    label: "Nam Trầm (Nam)",
    region: "South",
    gender: "male",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Ly_Nam",
    label: "Ly Nam (Nữ)",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Duy_Bac",
    label: "Duy Bắc (Nam)",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Ha_Nu",
    label: "Hà Nữ (Nữ)",
    region: "North",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "vn:Sai_Nu",
    label: "Sài Nữ (Nữ)",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "capcut",
    voiceId: "icl:en_us_002",
    label: "Jessie",
    region: "US",
    gender: "female",
    lang: "en"
  }, {
    engine: "capcut",
    voiceId: "icl:ICL_en_female_jiaoao",
    label: "Bright Female",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "capcut",
    voiceId: "icl:ICL_en_male_callum",
    label: "Callum",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "edge",
    voiceId: "vi-VN-HoaiMyNeural",
    label: "Hoài My",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "edge",
    voiceId: "vi-VN-NamMinhNeural",
    label: "Nam Minh",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "fpt",
    voiceId: "leminh",
    label: "Lê Minh",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "fpt",
    voiceId: "lannhi",
    label: "Lan Nhi",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "fpt",
    voiceId: "myan",
    label: "Mỹ An",
    region: "Central",
    gender: "female",
    lang: "vi"
  }, {
    engine: "fpt",
    voiceId: "giahuy",
    label: "Gia Huy",
    region: "Central",
    gender: "male",
    lang: "vi"
  }, {
    engine: "vbee",
    voiceId: "north_female_1",
    label: "Miền Bắc Nữ",
    region: "North",
    gender: "female",
    lang: "vi"
  }, {
    engine: "vbee",
    voiceId: "south_female_1",
    label: "Miền Nam Nữ",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "zalo",
    voiceId: "1",
    label: "Nữ Bắc 1",
    region: "North",
    gender: "female",
    lang: "vi"
  }, {
    engine: "zalo",
    voiceId: "2",
    label: "Nam Bắc 1",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "zalo",
    voiceId: "3",
    label: "Nữ Nam 1",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "zalo",
    voiceId: "4",
    label: "Nam Nam 1",
    region: "South",
    gender: "male",
    lang: "vi"
  }, {
    engine: "minimax",
    voiceId: "Vietnamese_Female_1",
    label: "Nữ VI 1",
    region: "South",
    gender: "female",
    lang: "vi"
  }, {
    engine: "minimax",
    voiceId: "Vietnamese_Male_1",
    label: "Nam VI 1",
    region: "North",
    gender: "male",
    lang: "vi"
  }, {
    engine: "siliconflow",
    voiceId: "fish:alex",
    label: "Alex (Nam) — Fish",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:benjamin",
    label: "Benjamin (Nam) — Fish",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:charles",
    label: "Charles (Nam) — Fish",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:david",
    label: "David (Nam) — Fish",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:anna",
    label: "Anna (Nữ) — Fish",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:bella",
    label: "Bella (Nữ) — Fish",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:claire",
    label: "Claire (Nữ) — Fish",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "fish:diana",
    label: "Diana (Nữ) — Fish",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:alex",
    label: "Alex (Nam) — Cosy",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:benjamin",
    label: "Benjamin (Nam) — Cosy",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:charles",
    label: "Charles (Nam) — Cosy",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:david",
    label: "David (Nam) — Cosy",
    region: "EN",
    gender: "male",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:anna",
    label: "Anna (Nữ) — Cosy",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:bella",
    label: "Bella (Nữ) — Cosy",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:claire",
    label: "Claire (Nữ) — Cosy",
    region: "EN",
    gender: "female",
    lang: "en"
  }, {
    engine: "siliconflow",
    voiceId: "cosy:diana",
    label: "Diana (Nữ) — Cosy",
    region: "EN",
    gender: "female",
    lang: "en"
  }];
  var _0x2a676a = new Set(["en_us_002", "ICL_en_female_jiaoao", "ICL_en_male_callum"]);
  var _0x300698 = {
    en: "en",
    es: "es",
    ja: "ja",
    jp: "ja"
  };
  var _0x58f644 = {
    us: "US",
    au: "AU",
    uk: "UK"
  };
  var _0x57a632 = new Set(["en", "es", "ja", "jp", "male", "female", "us", "au", "uk", "cc"]);
  function _0x518890(_0x1e7bc6) {
    let _0x3887bc = _0x1e7bc6.replace(/^ICL_/, "").split("_");
    let _0x4dfa7b = _0x300698[_0x3887bc[0]] || "en";
    let _0x5bf422 = null;
    for (let _0x4394a3 of _0x3887bc) {
      if (_0x58f644[_0x4394a3]) {
        _0x5bf422 = _0x58f644[_0x4394a3];
      }
    }
    _0x5bf422 ||= {
      en: "EN",
      es: "ES",
      ja: "JP"
    }[_0x4dfa7b] || "EN";
    let _0x5230a8 = _0x3887bc.includes("female") ? "female" : _0x3887bc.includes("male") ? "male" : "voice";
    let _0x306574 = _0x3887bc.filter(_0x422a68 => !_0x57a632.has(_0x422a68));
    if (_0x306574.length === 0) {
      _0x306574 = _0x3887bc;
    }
    if (_0x306574.every(_0x8d174b => /^\d+$/.test(_0x8d174b))) {
      _0x306574 = [_0x5bf422, ..._0x306574];
    }
    let _0xf0e87c = _0x306574.join(" ").replace(/\b\w/g, _0x5c765e => _0x5c765e.toUpperCase());
    return {
      engine: "capcut",
      voiceId: "icl:" + _0x1e7bc6,
      label: _0xf0e87c,
      region: _0x5bf422,
      gender: _0x5230a8,
      lang: _0x4dfa7b
    };
  }
  for (let _0x4dca26 of Object.keys(_0x158a09)) {
    if (!_0x2a676a.has(_0x4dca26)) {
      _0x3a64ca.push(_0x518890(_0x4dca26));
    }
  }
  _0x3a64ca.push(..._0x2da225, ..._0x17250, ..._0x2416d6);
  var _0x5cd496 = _0x3a64ca.find(_0x433593 => _0x433593.engine === "capcut" && _0x433593.voiceId === "bv:vi_female_huong") || _0x3a64ca[0];
  var _0x4d069d = _0x3a64ca;
  function _0xe4a051() {
    return _0x4d069d;
  }
  function _0x167efa() {
    return _0x5cd496;
  }
  function _0x33f778(_0x4235a6) {
    return _0x4d069d.filter(_0x332adb => _0x332adb.engine === _0x4235a6);
  }
  function _0xba7165(_0x2c3d26) {
    return _0x4d069d.filter(_0x38e8f7 => _0x38e8f7.region === _0x2c3d26);
  }
  _0x1c6475.exports = {
    getAllVoices: _0xe4a051,
    getDefaultVoice: _0x167efa,
    getVoicesByEngine: _0x33f778,
    getVoicesByRegion: _0xba7165
  };
});
var Bo = Z((_0x22e49f, _0x3025c6) => {
  var {
    execFile: _0x40de3e
  } = require("node:child_process");
  var _0x2a61f9 = require("node:fs");
  var _0x1f1d17 = require("node:path");
  var _0x387d11 = 1;
  var _0x2e785d = -45;
  var _0x476089 = 0.03;
  var _0x33da7b = 0.04;
  var _0x4a7024 = 0.08;
  function _0x1eab07(_0x4390a1, _0x76e375) {
    return new Promise((_0x471b67, _0x884e30) => {
      _0x40de3e(_0x4390a1, _0x76e375, {
        windowsHide: true,
        maxBuffer: 8388608
      }, (_0xd9711, _0x91de37, _0x4705b3) => {
        if (_0xd9711 && _0xd9711.code !== 1) {
          return _0x884e30(Object.assign(_0xd9711, {
            stderr: _0x4705b3
          }));
        }
        _0x471b67({
          stdout: _0x91de37 || "",
          stderr: _0x4705b3 || ""
        });
      });
    });
  }
  function _0x2842fb(_0xe6ec3c) {
    let _0x425270 = _0xe6ec3c.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
    if (_0x425270) {
      return Number(_0x425270[1]) * 3600 + Number(_0x425270[2]) * 60 + Number(_0x425270[3]);
    } else {
      return null;
    }
  }
  async function _0x289606(_0x1efeb7, _0xb41df7) {
    let {
      stderr: _0x2824ec
    } = await _0x1eab07(_0xb41df7, ["-hide_banner", "-i", _0x1efeb7, "-af", "silencedetect=noise=" + _0x2e785d + "dB:d=" + _0x476089, "-f", "null", "-"]);
    let _0x16649f = _0x2842fb(_0x2824ec);
    let _0x8fdce3 = [..._0x2824ec.matchAll(/silence_start:\s*(-?[\d.]+)/g)].map(_0x255f1a => Number(_0x255f1a[1]));
    let _0x3f6bca = [..._0x2824ec.matchAll(/silence_end:\s*(-?[\d.]+)/g)].map(_0x22d2a7 => Number(_0x22d2a7[1]));
    let _0x35d6f9 = null;
    if (_0x8fdce3.length && _0x8fdce3[0] <= 0.01 && _0x3f6bca.length) {
      _0x35d6f9 = _0x3f6bca[0];
    }
    let _0x71ad9a = null;
    if (_0x8fdce3.length) {
      let _0x423273 = _0x8fdce3[_0x8fdce3.length - 1];
      let _0x1efee3 = _0x3f6bca.length ? _0x3f6bca[_0x3f6bca.length - 1] : null;
      if (_0x1efee3 === null || _0x1efee3 < _0x423273 || _0x16649f && _0x1efee3 >= _0x16649f - 0.02) {
        if (_0x8fdce3.length !== 1 || _0x35d6f9 === null || !(_0x423273 <= 0.01)) {
          _0x71ad9a = _0x423273;
        }
      }
    }
    return {
      duration: _0x16649f,
      leadEnd: _0x35d6f9,
      tailStart: _0x71ad9a
    };
  }
  async function _0x1677eb(_0x2539bb, {
    ffmpegBin: _0x459c05 = "ffmpeg"
  } = {}) {
    let _0x3a085d = null;
    try {
      let {
        duration: _0x64be6a,
        leadEnd: _0xa269dd,
        tailStart: _0x32cb04
      } = await _0x289606(_0x2539bb, _0x459c05);
      if (!_0x64be6a || _0x64be6a <= _0x4a7024) {
        return {
          trimmed: false
        };
      }
      let _0x291913 = _0xa269dd !== null ? Math.max(0, _0xa269dd - _0x33da7b) : 0;
      let _0x18167c = _0x32cb04 !== null ? Math.min(_0x64be6a, _0x32cb04 + _0x33da7b) : _0x64be6a;
      if (_0x18167c - _0x291913 < _0x4a7024) {
        return {
          trimmed: false
        };
      }
      if (_0x291913 <= 0.005 && _0x18167c >= _0x64be6a - 0.005) {
        return {
          trimmed: false
        };
      }
      let _0x14eac5 = _0x1f1d17.extname(_0x2539bb).toLowerCase();
      let _0xf4e2a6 = _0x14eac5 === ".wav" ? ["-c:a", "pcm_s16le"] : ["-c:a", "libmp3lame", "-b:a", "128k"];
      _0x3a085d = _0x2539bb + ".trim" + (_0x14eac5 || ".mp3");
      await _0x1eab07(_0x459c05, ["-y", "-hide_banner", "-loglevel", "error", "-i", _0x2539bb, "-af", "atrim=start=" + _0x291913.toFixed(3) + ":end=" + _0x18167c.toFixed(3) + ",asetpts=PTS-STARTPTS", ..._0xf4e2a6, _0x3a085d]);
      if (_0x2a61f9.statSync(_0x3a085d).size < 128) {
        throw new Error("trimmed output too small");
      }
      _0x2a61f9.renameSync(_0x3a085d, _0x2539bb);
      _0x3a085d = null;
      return {
        trimmed: true,
        durationBefore: _0x64be6a,
        start: _0x291913,
        end: _0x18167c
      };
    } catch {
      if (_0x3a085d) {
        try {
          _0x2a61f9.unlinkSync(_0x3a085d);
        } catch {}
      }
      return {
        trimmed: false
      };
    }
  }
  async function _0x2f7683(_0xf0c446, {
    tempo: _0xdbb454,
    ffmpegBin: _0x2f8c12 = "ffmpeg"
  } = {}) {
    if (!Number.isFinite(_0xdbb454) || _0xdbb454 <= 0 || Math.abs(_0xdbb454 - 1) < 0.01) {
      return {
        applied: false
      };
    }
    let _0x2b1257 = null;
    try {
      let _0x5fbab6 = _0x1f1d17.extname(_0xf0c446).toLowerCase();
      let _0x3a8c8a = _0x5fbab6 === ".wav" ? ["-c:a", "pcm_s16le"] : ["-c:a", "libmp3lame", "-b:a", "128k"];
      _0x2b1257 = _0xf0c446 + ".tempo" + (_0x5fbab6 || ".mp3");
      await _0x1eab07(_0x2f8c12, ["-y", "-hide_banner", "-loglevel", "error", "-i", _0xf0c446, "-af", "atempo=" + Math.min(2, Math.max(0.5, _0xdbb454)).toFixed(4), ..._0x3a8c8a, _0x2b1257]);
      if (_0x2a61f9.statSync(_0x2b1257).size < 128) {
        throw new Error("tempo output too small");
      }
      _0x2a61f9.renameSync(_0x2b1257, _0xf0c446);
      _0x2b1257 = null;
      return {
        applied: true
      };
    } catch {
      if (_0x2b1257) {
        try {
          _0x2a61f9.unlinkSync(_0x2b1257);
        } catch {}
      }
      return {
        applied: false
      };
    }
  }
  _0x3025c6.exports = {
    TTS_TRIM_VER: _0x387d11,
    trimEdgeSilence: _0x1677eb,
    detectEdges: _0x289606,
    applyAtempo: _0x2f7683
  };
});
var Qo = Z((_0x43a9a0, _0x45e600) => {
  var _0x2aac59 = require("node:fs");
  var {
    CapcutTTS: _0x158a5b
  } = uo();
  var {
    EdgeTTS: _0x34d64c
  } = po();
  var {
    FptTTS: _0x4fbc37
  } = bo();
  var {
    VbeeTTS: _0x2316a7
  } = yo();
  var {
    ZaloTTS: _0x591c6f
  } = To();
  var {
    ElevenLabsTTS: _0x528828
  } = vo();
  var {
    MiniMaxTTS: _0x2cbcd3
  } = xo();
  var {
    SiliconFlowTTS: _0x159507
  } = Ao();
  var {
    getDefaultVoice: _0x35b4e
  } = pi();
  function _0x9b1eff(_0x25de39) {
    if (!_0x25de39 || typeof _0x25de39 != "string") {
      return false;
    }
    let _0x1a1770 = _0x25de39.replace(/[\(\[\{].*?[\)\]\}]/g, "").trim();
    _0x1a1770 = _0x1a1770.replace(/[^\p{L}\p{N}]/gu, "").trim();
    return _0x1a1770.length > 0;
  }
  function _0x525fe8(_0x213730) {
    let _0x5f4a7d = Math.floor(12000) * 1 * 2;
    let _0x3374f5 = 44 + _0x5f4a7d;
    let _0x1ff350 = Buffer.alloc(_0x3374f5);
    _0x1ff350.write("RIFF", 0);
    _0x1ff350.writeUInt32LE(_0x3374f5 - 8, 4);
    _0x1ff350.write("WAVE", 8);
    _0x1ff350.write("fmt ", 12);
    _0x1ff350.writeUInt32LE(16, 16);
    _0x1ff350.writeUInt16LE(1, 20);
    _0x1ff350.writeUInt16LE(1, 22);
    _0x1ff350.writeUInt32LE(24000, 24);
    _0x1ff350.writeUInt32LE(48000, 28);
    _0x1ff350.writeUInt16LE(2, 32);
    _0x1ff350.writeUInt16LE(16, 34);
    _0x1ff350.write("data", 36);
    _0x1ff350.writeUInt32LE(_0x5f4a7d, 40);
    let _0x1de53c = require("node:path").dirname(_0x213730);
    if (_0x1de53c && !_0x2aac59.existsSync(_0x1de53c)) {
      _0x2aac59.mkdirSync(_0x1de53c, {
        recursive: true
      });
    }
    _0x2aac59.writeFileSync(_0x213730, _0x1ff350);
  }
  function _0x49e754(_0x54ab61) {
    if (_0x54ab61.length >= 12 && _0x54ab61.slice(0, 4).toString() === "RIFF" && _0x54ab61.slice(8, 12).toString() === "WAVE" || _0x54ab61.slice(0, 3).toString() === "ID3" || _0x54ab61.length >= 2 && _0x54ab61[0] === 255 && (_0x54ab61[1] & 224) === 224 || _0x54ab61.slice(0, 4).toString() === "OggS" || _0x54ab61.slice(0, 4).toString() === "fLaC" || _0x54ab61.length >= 12 && _0x54ab61.slice(4, 8).toString() === "ftyp") {
      return null;
    } else {
      return "Unsupported or invalid audio header";
    }
  }
  function _0x5582cd(_0x108260, _0x44b5af = 128) {
    let _0x3f7e98 = {
      path: _0x108260,
      exists: false,
      validAudio: false,
      sizeBytes: 0,
      reason: null
    };
    if (!_0x108260) {
      _0x3f7e98.reason = "Missing audio path";
      return _0x3f7e98;
    }
    try {
      if (!_0x2aac59.existsSync(_0x108260)) {
        _0x3f7e98.reason = "Audio file does not exist";
        return _0x3f7e98;
      }
      _0x3f7e98.exists = true;
      let _0x13f210 = _0x2aac59.statSync(_0x108260);
      if (!_0x13f210.isFile()) {
        _0x3f7e98.reason = "Audio path is not a file";
        return _0x3f7e98;
      }
      _0x3f7e98.sizeBytes = _0x13f210.size;
      if (_0x13f210.size < _0x44b5af) {
        _0x3f7e98.reason = "Audio file is too small (" + _0x13f210.size + " bytes)";
        return _0x3f7e98;
      }
      let _0x67613d = _0x2aac59.openSync(_0x108260, "r");
      let _0x330e48 = Buffer.alloc(16);
      try {
        _0x2aac59.readSync(_0x67613d, _0x330e48, 0, _0x330e48.length, 0);
      } finally {
        _0x2aac59.closeSync(_0x67613d);
      }
      let _0x146598 = _0x49e754(_0x330e48);
      if (_0x146598) {
        _0x3f7e98.reason = _0x146598;
        return _0x3f7e98;
      } else {
        _0x3f7e98.validAudio = true;
        return _0x3f7e98;
      }
    } catch (_0x472f40) {
      _0x3f7e98.reason = _0x472f40.message || String(_0x472f40);
      return _0x3f7e98;
    }
  }
  function _0x42cf3c(_0x48c496, _0x1fd6ca = 128) {
    let _0x23b022 = _0x5582cd(_0x48c496, _0x1fd6ca);
    if (!_0x23b022.validAudio) {
      throw new Error(_0x23b022.reason || "Invalid audio file");
    }
    return _0x23b022;
  }
  function _0x3c7a9e(_0x22e24b) {
    if (!!_0x22e24b && !!_0x2aac59.existsSync(_0x22e24b)) {
      try {
        _0x2aac59.unlinkSync(_0x22e24b);
      } catch {}
    }
  }
  var _0x29c48c = new Set(["ENOTFOUND", "EAI_AGAIN", "ECONNRESET", "ECONNREFUSED", "ECONNABORTED", "ETIMEDOUT", "ENETUNREACH", "EPIPE"]);
  function _0x3f8dca(_0xeb3dd8) {
    let _0x4d34f5 = _0xeb3dd8?.code || _0xeb3dd8?.cause?.code;
    if (_0x4d34f5 && _0x29c48c.has(String(_0x4d34f5))) {
      return true;
    }
    let _0x25ce63 = String(_0xeb3dd8?.message || _0xeb3dd8 || "").toLowerCase();
    return !/invalid\s*text|text\s*is\s*required|unknown\s*tts|unknown\s*voice|\bnot\s+found\b|unauthor|forbidden|permission|api\s*key|vip\s*required|payment|required\s*tier|\b40[01234]\b/.test(_0x25ce63);
  }
  function _0x14ba86(_0x2a1706) {
    let _0xea5978 = _0x2a1706 && _0x2a1706.response && _0x2a1706.response.headers || {};
    let _0x31ab79 = _0x2a1706?.retryAfter ?? _0xea5978["retry-after"] ?? _0xea5978["Retry-After"];
    if (_0x31ab79 == null) {
      return 0;
    }
    let _0x115dd6 = Number(_0x31ab79);
    if (Number.isFinite(_0x115dd6) && _0x115dd6 >= 0) {
      return Math.min(_0x115dd6 * 1000, 30000);
    }
    let _0xc827a8 = Date.parse(String(_0x31ab79));
    if (Number.isFinite(_0xc827a8)) {
      return Math.min(Math.max(0, _0xc827a8 - Date.now()), 30000);
    } else {
      return 0;
    }
  }
  function _0x2e076a(_0x4c473b, _0x4ad741, _0x5ec9ae = Math.random) {
    let _0x1c159a = 2 ** (_0x4ad741 - 1) * 500;
    let _0xeda727 = Math.max(_0x1c159a, _0x14ba86(_0x4c473b));
    return Math.round(_0xeda727 / 2 + _0x5ec9ae() * (_0xeda727 / 2));
  }
  var _0xdb718f = class {
    constructor(_0x310147) {
      this.settings = _0x310147 || {};
    }
    _getEngine(_0xb2cc38) {
      let _0x3c7934 = this.settings;
      let _0x4b8351 = _0xb2cc38 || _0x3c7934.ttsEngine || "capcut";
      switch (_0x4b8351) {
        case "capcut":
          return new _0x158a5b();
        case "edge":
          return new _0x34d64c();
        case "fpt":
          return new _0x4fbc37(_0x3c7934.fptApiKey || "");
        case "vbee":
          return new _0x2316a7(_0x3c7934.vbeeApiKey || "");
        case "zalo":
          return new _0x591c6f(_0x3c7934.zaloApiKey || "");
        case "elevenlabs":
          return new _0x528828(_0x3c7934.elevenLabsApiKey || "");
        case "minimax":
          return new _0x2cbcd3(_0x3c7934.minimaxApiKey || "");
        case "siliconflow":
          return new _0x159507(_0x3c7934.siliconflowApiKey || "");
        default:
          throw new Error("Unknown TTS engine: " + _0x4b8351);
      }
    }
    async synthesize(_0x4352be, _0x183882, _0x7f0c4a = {}) {
      if (!_0x9b1eff(_0x4352be)) {
        console.log("[TTS Skip] Text \"" + (_0x4352be || "").slice(0, 30) + "\" has no speakable words. Writing silent audio.");
        _0x525fe8(_0x183882);
        _0x42cf3c(_0x183882);
        return _0x183882;
      }
      let _0x42b1dc = _0x7f0c4a.voiceId || this.settings.ttsVoice || _0x35b4e().voiceId;
      let _0x44cde3 = _0x7f0c4a.speed || this.settings.defaultTtsSpeed || 1;
      let {
        getAllVoices: _0x4d1577
      } = pi();
      let _0x370f90 = _0x4d1577().find(_0x445e16 => _0x445e16.voiceId === _0x42b1dc);
      if (!_0x370f90) {
        throw new Error("Unknown TTS voice: " + _0x42b1dc);
      }
      let _0x78a832 = _0x370f90.engine;
      let _0x218b0e = this._getEngine(_0x78a832);
      let _0x2090d4 = 3;
      let _0x39217f = null;
      for (let _0x317ca6 = 1; _0x317ca6 <= _0x2090d4; _0x317ca6++) {
        try {
          _0x3c7a9e(_0x183882);
          await _0x218b0e.synthesize(_0x4352be, _0x42b1dc, _0x44cde3, _0x183882);
          _0x42cf3c(_0x183882);
          let {
            trimEdgeSilence: _0x5bbb1c,
            applyAtempo: _0x101253
          } = Bo();
          let _0x365314 = this.settings.ffmpegPath || "ffmpeg";
          await _0x5bbb1c(_0x183882, {
            ffmpegBin: _0x365314
          });
          if (_0x78a832 === "capcut" && Math.abs(_0x44cde3 - 1) > 0.01) {
            await _0x101253(_0x183882, {
              tempo: _0x44cde3,
              ffmpegBin: _0x365314
            });
          }
          _0x42cf3c(_0x183882);
          return _0x183882;
        } catch (_0x73bf35) {
          _0x39217f = _0x73bf35;
          console.error("[TTS Retry] Attempt " + _0x317ca6 + "/" + _0x2090d4 + " failed for text \"" + (_0x4352be || "").slice(0, 30) + "...\": " + _0x73bf35.message);
          if (!_0x3f8dca(_0x73bf35)) {
            throw _0x73bf35;
          }
          if (_0x317ca6 < _0x2090d4) {
            await new Promise(_0x4ae17c => setTimeout(_0x4ae17c, _0x2e076a(_0x73bf35, _0x317ca6)));
          }
        }
      }
      throw _0x39217f;
    }
  };
  _0x45e600.exports = {
    TtsRouter: _0xdb718f,
    hasSpeakableText: _0x9b1eff,
    writeSilentWav: _0x525fe8,
    validateAudioFile: _0x5582cd,
    assertValidAudioFile: _0x42cf3c,
    isRetryableTtsError: _0x3f8dca,
    retryAfterMs: _0x14ba86,
    retryDelayMs: _0x2e076a
  };
});
var ns = Z((_0x2a4ac8, _0x497c80) => {
  var {
    buildDubbingPlan: _0x51c83c,
    DEFAULT_POLICY: _0x54f80c
  } = ht();
  var {
    viSyllablesSpoken: _0x4a1ac4
  } = Rn();
  var {
    sceneSplit: _0x16271b,
    sceneIndexByStart: _0x1bcbc6
  } = St();
  var _0x2d037b = je();
  var _0x50c1da = 1.15;
  var _0x578c68 = 1.05;
  var _0x516d52 = 2;
  var _0x242928 = 0.3;
  var _0x38875c = 2;
  var _0x2dd17a = 12;
  var _0x436047 = 0.5;
  var _0x2c67b1 = new Set(["slowed", "timing_infeasible"]);
  function _0x46cbb8(_0x2b50b6, _0x182abd = {}) {
    let _0x35910a = _0x4eac0a => _0x2d037b.shadowCompare("verifyDubbingFit", _0x4eac0a, _0x2ce0fd => JSON.parse(_0x2ce0fd.verifyDubbingFitJson(JSON.stringify({
      segments: _0x2b50b6,
      opts: _0x182abd
    }))));
    let _0x375277 = {
      ..._0x54f80c,
      ...(_0x182abd.policy || {})
    };
    let _0x5b682d = _0x375277.residualTempoCap > 0 ? _0x375277.residualTempoCap : 1;
    let _0x37533 = Number(_0x182abd.totalDuration) || 0;
    let _0x5d9f38 = Number(_0x182abd.globalVoiceRate) > 0 ? Number(_0x182abd.globalVoiceRate) : 1;
    let _0x5c1c69 = (_0x2b50b6 || []).filter(_0x413d8c => _0x413d8c && typeof _0x413d8c.startTime == "number" && typeof _0x413d8c.endTime == "number" && _0x413d8c.endTime > _0x413d8c.startTime && Number.isFinite(_0x413d8c.audioDuration) && _0x413d8c.audioDuration > 0).slice().sort((_0x5177a2, _0x393032) => _0x5177a2.startTime - _0x393032.startTime);
    let _0x562b08 = {
      restores: [],
      restoreHints: [],
      condense: [],
      stats: {
        measured: 0,
        unreliable: 0
      }
    };
    if (!_0x5c1c69.length) {
      return _0x35910a(_0x562b08);
    }
    let {
      sceneStartIndices: _0x275cb6
    } = _0x16271b(_0x5c1c69);
    let _0x238c57 = _0x1bcbc6(_0x275cb6, _0x5c1c69.length);
    let _0x2d8f66 = _0x15b00b => _0x5c1c69.map((_0x371f2c, _0x25566e) => ({
      unitId: _0x371f2c.id,
      startTime: _0x371f2c.startTime,
      endTime: _0x371f2c.endTime,
      speakerId: _0x371f2c.speakerId || null,
      sceneIndex: _0x238c57[_0x25566e] || 0,
      audioDuration: _0x15b00b?.has(_0x371f2c.id) ? _0x15b00b.get(_0x371f2c.id) : _0x371f2c.audioDuration
    }));
    let _0x412f92 = _0x3c20d => _0x51c83c(_0x2d8f66(_0x3c20d), _0x37533, {
      globalVoiceRate: _0x5d9f38,
      policy: _0x375277
    });
    let _0x326654 = _0x412f92(null);
    let _0x57a65e = new Map(_0x326654.units.map(_0x28a96b => [_0x28a96b.unitId, _0x28a96b]));
    let _0x307e5d = _0x188588 => new Set(_0x188588.units.filter(_0x16dd44 => _0x2c67b1.has(_0x16dd44.status)).map(_0x5ab386 => _0x5ab386.unitId));
    let _0x49950d = _0x307e5d(_0x326654);
    let _0x4edb04 = 0;
    let _0x2a51db = new Map();
    for (let _0x45dde8 of _0x5c1c69) {
      let _0x140e88 = _0x4a1ac4(_0x45dde8.readText || "");
      if (_0x140e88 < _0x516d52 || _0x45dde8.audioDuration < _0x242928) {
        _0x4edb04 += 1;
        continue;
      }
      let _0x41e160 = _0x140e88 / _0x45dde8.audioDuration;
      if (_0x41e160 < _0x38875c || _0x41e160 > _0x2dd17a) {
        _0x4edb04 += 1;
        continue;
      }
      _0x2a51db.set(_0x45dde8.id, {
        spokenSyl: _0x140e88,
        rsps: _0x41e160
      });
    }
    let _0xf0b502 = [];
    let _0x45c213 = (_0x366b17, _0x3ce2cf) => {
      for (let _0x1699b1 of _0x307e5d(_0x366b17)) {
        if (!_0x49950d.has(_0x1699b1)) {
          return false;
        }
      }
      for (let _0x204e28 of _0x3ce2cf) {
        let _0x55fd9e = _0x366b17.units.find(_0x99aac9 => _0x99aac9.unitId === _0x204e28);
        if (!_0x55fd9e || _0x2c67b1.has(_0x55fd9e.status) || _0x55fd9e.videoSpeed < 0.999999999) {
          return false;
        }
      }
      return true;
    };
    let _0x2c3c0c = [];
    for (let _0x305320 of _0x5c1c69) {
      if (!_0x305320.hasTake || !_0x305320.fullReadText) {
        continue;
      }
      let _0x26f7a5 = _0x2a51db.get(_0x305320.id);
      if (!_0x26f7a5) {
        continue;
      }
      let _0x4ed13f = _0x4a1ac4(_0x305320.fullReadText);
      if (!_0x4ed13f) {
        continue;
      }
      let _0x2747bd = _0x4ed13f / _0x26f7a5.rsps;
      let _0x412c70 = _0x57a65e.get(_0x305320.id);
      if (!_0x412c70) {
        continue;
      }
      let _0xa210c5 = _0x2747bd * _0x50c1da;
      if (_0x45c213(_0x412f92(new Map([[_0x305320.id, _0xa210c5]])), [_0x305320.id])) {
        _0x2c3c0c.push({
          id: _0x305320.id,
          padded: _0xa210c5,
          slack: Math.round((_0x412c70.plannedEnd - _0x412c70.plannedStart) / _0x2747bd * 1000) / 1000
        });
      } else if (_0x45c213(_0x412f92(new Map([[_0x305320.id, _0x2747bd * _0x578c68]])), [_0x305320.id])) {
        _0xf0b502.push(_0x305320.id);
      }
    }
    _0x2c3c0c.sort((_0x1f9bfa, _0x1c81b9) => _0x1c81b9.slack - _0x1f9bfa.slack || String(_0x1f9bfa.id).localeCompare(String(_0x1c81b9.id)));
    let _0x29e8a8 = [];
    let _0x80cec7 = new Map();
    for (let _0x5f3bf4 of _0x2c3c0c) {
      let _0x3edbab = new Map(_0x80cec7);
      _0x3edbab.set(_0x5f3bf4.id, _0x5f3bf4.padded);
      let _0x422111 = _0x412f92(_0x3edbab);
      if (_0x45c213(_0x422111, [..._0x3edbab.keys()])) {
        _0x29e8a8.push(_0x5f3bf4.id);
        _0x80cec7.set(_0x5f3bf4.id, _0x5f3bf4.padded);
      } else {
        _0xf0b502.push(_0x5f3bf4.id);
      }
    }
    let _0x2f7616 = new Set(_0x29e8a8);
    let _0x98711a = [];
    for (let _0x18e5ac of _0x5c1c69) {
      if (!_0x18e5ac.fullReadText || _0x2f7616.has(_0x18e5ac.id)) {
        continue;
      }
      let _0x4964ce = _0x2a51db.get(_0x18e5ac.id);
      if (!_0x4964ce) {
        continue;
      }
      let _0x3c9e82 = _0x57a65e.get(_0x18e5ac.id);
      if (!_0x3c9e82 || !_0x2c67b1.has(_0x3c9e82.status)) {
        continue;
      }
      let _0x1226a0 = _0x4a1ac4(_0x18e5ac.fullReadText);
      if (!_0x1226a0) {
        continue;
      }
      let _0x389f95 = (_0x3c9e82.plannedEnd - _0x3c9e82.plannedStart) * _0x5b682d;
      let _0x233037 = Math.floor(_0x389f95 * _0x4964ce.rsps);
      let _0x1f24c6 = Math.max(2, Math.ceil(_0x1226a0 * _0x436047));
      let _0x53aae4 = Math.max(_0x1f24c6, Math.min(_0x4964ce.spokenSyl - 1, Math.max(_0x233037, _0x1f24c6)));
      if (!(_0x53aae4 >= _0x4964ce.spokenSyl)) {
        _0x98711a.push({
          id: _0x18e5ac.id,
          budgetSyl: _0x53aae4,
          budgetMinSyl: Math.min(_0x1f24c6, _0x53aae4),
          realSylPerSec: Math.round(_0x4964ce.rsps * 100) / 100
        });
      }
    }
    return _0x35910a({
      restores: _0x29e8a8,
      restoreHints: [...new Set(_0xf0b502)].filter(_0x22c793 => !_0x2f7616.has(_0x22c793)),
      condense: _0x98711a,
      stats: {
        measured: _0x2a51db.size,
        unreliable: _0x4edb04
      }
    });
  }
  _0x497c80.exports = {
    verifyDubbingFit: _0x46cbb8,
    RESTORE_MARGIN: _0x50c1da
  };
});
var W = require("node:fs");
var ve = require("node:path");
var lt = require("node:os");
var {
  planTimeline: Lh,
  mapOriginalToNew: is
} = gn();
var {
  buildDubbingPlan: jh,
  planToTimelinePieces: Gh,
  applyGlobalSpeedToPieces: Hh
} = ht();
var {
  FfmpegExporter: Uh,
  buildAtempoChain: zh,
  buildTrimFadeOut: Yh,
  computeTtsClipPlacement: Bh,
  ExportPolicyError: $e
} = ra();
var {
  loadFontCatalog: Ph,
  assFontMetrics: Wh
} = yn();
var {
  computeOutputFrame: _p,
  sanitizeComposition: Jh
} = Nn();
var {
  execFile: ds,
  spawn: Zh
} = require("node:child_process");
var as = 40;
var dn = 1 / 24;
var rs = 0;
function hn() {
  rs += 1;
  return "p" + process.pid + "_" + Date.now() + "_" + rs + "_" + Math.random().toString(36).slice(2, 8);
}
var Kh = ["ag_filter_", "ag_subs_", "ag_tts_premixed_", "denoised_", "ag_ttsmix_"];
var Xh = 86400000;
function qh() {
  let _0x1b81c6 = lt.tmpdir();
  let _0x33fbe5 = [];
  try {
    _0x33fbe5 = W.readdirSync(_0x1b81c6, {
      withFileTypes: true
    });
  } catch {
    return 0;
  }
  let _0x56479c = Date.now() - Xh;
  let _0x275cc3 = 0;
  for (let _0x4f0e3a of _0x33fbe5) {
    if (!Kh.some(_0x5a60d4 => _0x4f0e3a.name.startsWith(_0x5a60d4))) {
      continue;
    }
    let _0x599a78 = ve.join(_0x1b81c6, _0x4f0e3a.name);
    try {
      if (W.statSync(_0x599a78).mtimeMs > _0x56479c) {
        continue;
      }
      if (_0x4f0e3a.isDirectory()) {
        W.rmSync(_0x599a78, {
          recursive: true,
          force: true
        });
      } else {
        W.unlinkSync(_0x599a78);
      }
      _0x275cc3 += 1;
    } catch {}
  }
  return _0x275cc3;
}
function Re(_0x19f2b4) {
  let _0x107e32 = String(_0x19f2b4).replace(/\r?\n$/, "");
  for (let _0xa4d80b of _0x107e32.split(/\r?\n/)) {
    process.stdout.write("LOG: " + _0xa4d80b + "\n");
  }
}
function Je(_0x13837a) {
  process.stdout.write("EVENT: " + JSON.stringify(_0x13837a) + "\n");
}
console.log = (..._0x1730da) => {
  Re(_0x1730da.map(_0x286c6b => typeof _0x286c6b == "object" ? JSON.stringify(_0x286c6b) : String(_0x286c6b)).join(" "));
};
console.error = (..._0x2c483b) => {
  Re("[ERROR] " + _0x2c483b.map(_0x3f4986 => typeof _0x3f4986 == "object" ? JSON.stringify(_0x3f4986) : String(_0x3f4986)).join(" "));
};
async function Qh() {
  let _0x562c21 = await new Promise((_0x5a4b97, _0x2a3e81) => {
    let _0x3788ca = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", _0x224d4f => {
      _0x3788ca += _0x224d4f;
    });
    process.stdin.on("end", () => _0x5a4b97(_0x3788ca));
    process.stdin.on("error", _0x3222e4 => _0x2a3e81(_0x3222e4));
  });
  if (!_0x562c21.trim()) {
    throw new Error("No input data provided on stdin");
  }
  let _0x2b1238 = JSON.parse(_0x562c21);
  let _0x449604 = _0x2b1238.action;
  let _0x176455 = _0x2b1238.settings || {};
  let _0x5cec76 = _0x2b1238.data || {};
  try {
    let _0xbb2f13 = qh();
    if (_0xbb2f13 > 0) {
      Re("[Cleanup] Đã xoá " + _0xbb2f13 + " file tạm cũ (>24h) của lần chạy trước.");
    }
  } catch {}
  let _0x5e2ff5 = {
    sender: {
      send: (_0x2a6542, _0xd3a84b) => {
        Re(_0x2a6542 === "log-message" ? _0xd3a84b : "[" + _0x2a6542 + "] " + _0xd3a84b);
      }
    }
  };
  let _0x2a08fc = null;
  switch (_0x449604) {
    case "transcribe-video":
      _0x2a08fc = await em(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    case "translate-segments":
      _0x2a08fc = await tm(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    case "fetch-translate-models":
      _0x2a08fc = await nm(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    case "generate-tts":
      _0x2a08fc = await im(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    case "export-video":
      _0x2a08fc = await Im(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    case "compute-timing-plan":
      _0x2a08fc = bm(_0x5cec76);
      break;
    case "verify-dubbing-fit":
      _0x2a08fc = Nm(_0x5cec76);
      break;
    case "condense-lines":
      _0x2a08fc = await ym(_0x5e2ff5, _0x5cec76, _0x176455);
      break;
    default:
      throw new Error("Unknown action: " + _0x449604);
  }
  process.stdout.write("RESULT: " + JSON.stringify(_0x2a08fc) + "\n");
}
async function em(_0x4a0e7d, _0x318554, _0x2f6d62) {
  let {
    videoPath: _0x24a389,
    targetLang: _0x5a2882,
    sourceLang: _0x1819ca,
    transcribeEngine: _0x18069f,
    videoSegments: _0x3221e9,
    opId: _0x2f3fba
  } = _0x318554;
  let _0x539d61 = _0x18069f || "auto";
  let _0x3f21d1 = require("node:os").tmpdir();
  let _0x218711 = ve.join(_0x3f21d1, "denoised_" + hn() + ".mp3");
  let _0x2bb45f = _0x30a4bb => _0x4a0e7d.sender.send("log-message", _0x30a4bb);
  let _0x381916 = (_0x44b64e, _0x28899f) => {
    if (_0x2f3fba) {
      Je({
        type: "progress",
        op: "transcribe",
        opId: _0x2f3fba,
        stage: _0x44b64e,
        ...(_0x28899f || {})
      });
    }
  };
  let {
    chooseAsrEngines: _0xd3dcdd
  } = sa();
  let _0x4990ae = _0xd3dcdd(_0x539d61, _0x1819ca, {
    groqApiKey: _0x2f6d62.groqApiKey
  });
  if (_0x4990ae.skipNote) {
    _0x2bb45f("[Transcribe] " + _0x4990ae.skipNote + "\n");
  }
  if (_0x4990ae.autoHint) {
    _0x2bb45f("[Transcribe] " + _0x4990ae.autoHint + "\n");
  }
  if (_0x4990ae.missingGroqKey) {
    throw new Error("Ngôn ngữ gốc \"" + (_0x1819ca || "auto") + "\" cần Groq Whisper (BCut/CapCut chỉ nhận tiếng Trung + tiếng Anh). Hãy nhập Groq API key ở mục Nhận dạng giọng nói rồi thử lại.");
  }
  if (_0x4990ae.engines.length > 0) {
    _0x381916("denoise");
    try {
      let {
        denoiseAudio: _0x29f8b8
      } = da();
      let _0x5ad9c6 = _0x2f6d62.ffmpegPath || "ffmpeg";
      await _0x29f8b8(_0x5ad9c6, _0x24a389, _0x218711, _0x3221e9);
      _0x2bb45f("[Transcribe] Audio denoised successfully\n");
    } catch (_0x1ac9bc) {
      _0x2bb45f("[Transcribe] " + _0x1ac9bc.message + "\n");
      throw new Error("Không tạo được file audio cho nhận dạng: " + _0x1ac9bc.message + ". Kiểm tra file video còn nguyên và ffmpeg hoạt động, rồi thử lại.");
    }
  }
  let _0x3f803a = null;
  if (_0x4990ae.engines.includes("bcut") && W.existsSync(_0x218711)) {
    try {
      let {
        BCutASR: _0x82cedc,
        bcutOnCooldown: _0x3e0ca5
      } = ga();
      let [_0x2c6aa0, _0xd1969] = _0x3e0ca5();
      if (_0x2c6aa0) {
        _0x2bb45f("[Transcribe] BCut ASR is on cooldown (remaining: " + _0xd1969 + "s), skipping...\n");
      } else {
        _0x381916("asr", {
          engine: "bcut"
        });
        _0x2bb45f("[Transcribe] Trying BCut ASR...\n");
        _0x3f803a = await new _0x82cedc().transcribe(_0x218711, {
          onStatus: _0x1ac2c8 => _0x2bb45f("  " + _0x1ac2c8 + "\n")
        });
        _0x2bb45f("[Transcribe] BCut ASR success: " + _0x3f803a.length + " segments\n");
      }
    } catch (_0x346b2e) {
      _0x2bb45f("[Transcribe] BCut ASR failed: " + _0x346b2e.message + "\n");
    }
  }
  if (!_0x3f803a && _0x4990ae.engines.includes("capcut") && W.existsSync(_0x218711)) {
    try {
      let {
        isOnCooldown: _0x22cf72
      } = On();
      let {
        transcribeCapcutChunked: _0x3db090
      } = Oa();
      if (_0x22cf72()) {
        _0x2bb45f("[Transcribe] CapCut ASR is on cooldown, skipping...\n");
      } else {
        _0x381916("asr", {
          engine: "capcut"
        });
        _0x2bb45f("[Transcribe] Trying CapCut ASR...\n");
        _0x3f803a = await _0x3db090(_0x218711, {
          ffmpegPath: _0x2f6d62.ffmpegPath || "ffmpeg",
          tdid: _0x2f6d62.capcutTdid || require("node:crypto").randomUUID(),
          onStatus: _0x663084 => _0x2bb45f("  " + _0x663084 + "\n"),
          onProgress: ({
            done: _0x8755fc,
            total: _0x45acc2
          }) => _0x381916("asr", {
            engine: "capcut",
            done: _0x8755fc,
            total: _0x45acc2
          })
        });
        _0x2bb45f("[Transcribe] CapCut ASR success: " + _0x3f803a.length + " segments\n");
      }
    } catch (_0x339130) {
      _0x2bb45f("[Transcribe] CapCut ASR failed: " + _0x339130.message + "\n");
    }
  }
  if (!_0x3f803a && _0x4990ae.engines.includes("groq") && _0x2f6d62.groqApiKey && W.existsSync(_0x218711)) {
    try {
      _0x381916("asr", {
        engine: "groq"
      });
      _0x2bb45f("[Transcribe] Trying Groq Whisper STT...\n");
      let {
        GroqSTT: _0x133869
      } = La();
      _0x3f803a = await new _0x133869(_0x2f6d62.groqApiKey).transcribe(_0x218711, _0x1819ca && _0x1819ca !== "auto" ? _0x1819ca : null);
      _0x2bb45f("[Transcribe] Groq STT success: " + _0x3f803a.length + " segments\n");
    } catch (_0x46622a) {
      _0x2bb45f("[Transcribe] Groq STT failed: " + _0x46622a.message + "\n");
    }
  }
  try {
    if (W.existsSync(_0x218711)) {
      W.unlinkSync(_0x218711);
    }
  } catch {}
  if (_0x3f803a && _0x3f803a.length > 0) {
    _0x381916("done", {
      segments: _0x3f803a.length
    });
    return _0x3f803a.map((_0x565c4b, _0x1a8f8c) => ({
      id: String(_0x1a8f8c + 1),
      startTime: _0x565c4b.startTime,
      endTime: _0x565c4b.endTime,
      text: _0x565c4b.text,
      translation: ""
    }));
  }
  throw new Error("No ASR transcription engine succeeded.");
}
async function tm(_0x451f43, _0x3bdff2, _0x233f55) {
  let {
    segments: _0x5442e7,
    targetLang: _0x492de6,
    preset: _0x19f918,
    model: _0x139648,
    parallelJobs: _0x55e069,
    source: _0x5d9176,
    sourceLang: _0x393e44,
    glossary: _0x46880f,
    bible: _0x1a435a,
    speakers: _0x288837,
    opId: _0x434ed9
  } = _0x3bdff2;
  let _0x211017 = _0x3bdff2.provider || _0x233f55.translateProvider;
  let _0x4fd9c9 = _0x211017 === "custom";
  let _0x1337ef = _0x211017 === "ezmax";
  let {
    resolveProvider: _0x191485,
    resolveEzmaxBearer: _0x150153,
    EZMAX_TRANSLATE_MODELS: _0x3dea0d
  } = Gt();
  let _0x3b5cbc = _0x139648 || _0x233f55.deepseekModel || "deepseek-v4-flash";
  if (_0x1337ef && !_0x3dea0d.includes(_0x3b5cbc)) {
    _0x3b5cbc = _0x3dea0d[0];
  }
  let _0x331289 = _0x191485(_0x3b5cbc, undefined, _0x1337ef ? "ezmax" : _0x4fd9c9);
  let _0x2d4794 = _0x1337ef ? _0x150153(_0x233f55) : _0x233f55[_0x331289.apiKeySettingKey] || "";
  let _0x404002 = _0x331289.url;
  if (_0x1337ef) {
    _0x404002 = (_0x233f55.ezmaxApiEndpoint || "").trim().replace(/\/+$/, "");
    if (_0x404002 && !/\/chat\/completions$/.test(_0x404002)) {
      _0x404002 += "/chat/completions";
    }
    if (!_0x404002) {
      throw new Error("Ezmax Translate (beta): chưa cấu hình endpoint (ezmaxApiEndpoint)");
    }
  } else if (_0x4fd9c9) {
    _0x404002 = (_0x233f55.customApiEndpoint || "").trim().replace(/\/+$/, "");
    if (_0x404002 && !/\/chat\/completions$/.test(_0x404002)) {
      _0x404002 += "/chat/completions";
    }
    if (!_0x404002) {
      throw new Error("No custom API endpoint configured in settings");
    }
  } else if (_0x331289.id === "deepseek") {
    _0x404002 = _0x233f55.deepseekBaseUrl || _0x331289.url;
  }
  if (!_0x2d4794) {
    throw new Error("No " + _0x331289.name + " API key configured in settings");
  }
  let _0x5cbced = _0x3bdff2.cacheFile || null;
  let _0x11bf59 = {};
  if (_0x5cbced) {
    try {
      _0x11bf59 = JSON.parse(W.readFileSync(_0x5cbced, "utf8")) || {};
    } catch {
      _0x11bf59 = {};
    }
  }
  let _0x25df29 = 400;
  {
    let _0x47b9ca = Object.keys(_0x11bf59);
    if (_0x47b9ca.length > _0x25df29) {
      _0x47b9ca.sort((_0x3a1522, _0xfe80ba) => (_0x11bf59[_0x3a1522]?.ts || 0) - (_0x11bf59[_0xfe80ba]?.ts || 0)).slice(0, _0x47b9ca.length - _0x25df29).forEach(_0x539e2b => delete _0x11bf59[_0x539e2b]);
    }
  }
  let _0x295c69 = _0x5cbced ? _0x4a7339 => _0x11bf59[_0x4a7339] : null;
  let _0x356bfe = _0x5cbced ? (_0x3ca8f3, _0x5a2a5a) => {
    _0x11bf59[_0x3ca8f3] = {
      ..._0x5a2a5a,
      ts: Date.now()
    };
    try {
      W.writeFileSync(_0x5cbced, JSON.stringify(_0x11bf59));
    } catch {}
  } : null;
  let {
    DeepSeekTranslator: _0x6a911a
  } = Kn();
  let _0x213568 = new _0x6a911a(_0x2d4794);
  let _0x368429;
  if (_0x1337ef) {
    let {
      getEzmaxLimiter: _0xe249cb,
      rateLimitedHttp: _0x1bd702
    } = qn();
    _0x368429 = _0x1bd702(require("axios"), _0xe249cb(), {
      onRetry: (_0x2aae6b, _0x36da96) => _0x451f43.sender.send("log-message", "[Translate] Ezmax Translate đạt giới hạn yêu cầu — chờ 10s rồi thử lại (" + _0x2aae6b + "/" + _0x36da96 + ")...\n")
    });
  }
  let _0x142115 = await _0x213568.translateSegments({
    segments: _0x5442e7,
    targetLang: _0x492de6 || _0x233f55.translateTargetLang || "vi",
    source: _0x5d9176 || _0x393e44 || _0x233f55.translateSourceLang || undefined,
    preset: _0x19f918 || _0x233f55.translatePromptPreset || "default",
    model: _0x3b5cbc,
    url: _0x404002,
    isCustomProvider: _0x1337ef ? "ezmax" : _0x4fd9c9,
    axiosInst: _0x368429,
    promptOverrides: _0x233f55.translatePrompts || {},
    parallelJobs: _0x55e069 || _0x233f55.translateParallelJobs || 1,
    onStatus: _0x41fff7 => {
      _0x451f43.sender.send("log-message", "[Translate] " + _0x41fff7 + "\n");
    },
    onProgress: _0x2965c2 => {
      if (_0x434ed9) {
        Je({
          type: "progress",
          op: "translate",
          opId: _0x434ed9,
          ..._0x2965c2
        });
      }
    },
    onChunkResult: _0x149d5e => {
      if (_0x434ed9) {
        Je({
          type: "chunk-result",
          op: "translate",
          opId: _0x434ed9,
          ..._0x149d5e
        });
      }
    },
    glossary: _0x46880f || [],
    bible: _0x1a435a || null,
    speakers: _0x288837 || [],
    polish: _0x3bdff2.polish != null ? _0x3bdff2.polish === true : _0x233f55.translatePolishPass === true,
    cacheGet: _0x295c69,
    cacheSet: _0x356bfe,
    opId: _0x434ed9
  });
  if (_0x5cbced) {
    try {
      W.writeFileSync(_0x5cbced, JSON.stringify(_0x11bf59));
    } catch {}
  }
  return _0x142115;
}
async function nm(_0x1ac47b, _0x44b402, _0x2fc3a2) {
  let _0x295750 = require("axios");
  let _0x542e2e = (_0x44b402.endpoint || _0x2fc3a2.customApiEndpoint || "").trim().replace(/\/+$/, "");
  let _0x21b0a8 = _0x44b402.apiKey || _0x2fc3a2.customApiKey || "";
  if (!_0x542e2e) {
    throw new Error("No custom API endpoint provided");
  }
  if (!/\/models$/.test(_0x542e2e)) {
    _0x542e2e += "/models";
  }
  let _0x3a16ce = {
    "Content-Type": "application/json"
  };
  if (_0x21b0a8) {
    _0x3a16ce.Authorization = "Bearer " + _0x21b0a8;
  }
  let _0x207e2a = await _0x295750.get(_0x542e2e, {
    headers: _0x3a16ce,
    timeout: 15000
  });
  return (Array.isArray(_0x207e2a.data && _0x207e2a.data.data) ? _0x207e2a.data.data : Array.isArray(_0x207e2a.data) ? _0x207e2a.data : []).map(_0x345325 => typeof _0x345325 == "string" ? _0x345325 : _0x345325.id).filter(Boolean).sort().map(_0x2e1c73 => ({
    value: _0x2e1c73,
    label: _0x2e1c73
  }));
}
async function im(_0x427fd4, _0x231865, _0x4ebecb) {
  let {
    text: _0x45477d,
    voiceId: _0x18f1d3,
    destPath: _0x5b1a96,
    outputPath: _0x52b1ad,
    speed: _0x3a1d5d
  } = _0x231865;
  let {
    TtsRouter: _0x4810fa
  } = Qo();
  let _0x18a189 = new _0x4810fa(_0x4ebecb);
  let _0x2a7e32 = _0x52b1ad || _0x5b1a96;
  await _0x18a189.synthesize(_0x45477d, _0x2a7e32, {
    voiceId: _0x18f1d3,
    speed: _0x3a1d5d
  });
  return {
    success: true,
    outputPath: _0x2a7e32,
    validAudio: true
  };
}
function Fe(_0x30cc23, _0x3dc883) {
  let _0x228dee = typeof _0x30cc23 == "number" ? _0x30cc23 : Number.parseFloat(_0x30cc23);
  if (Number.isFinite(_0x228dee)) {
    return _0x228dee;
  } else {
    return _0x3dc883;
  }
}
function am(_0x517ca5, _0x322bd5, _0x8841c4, _0x1a3c06) {
  let _0x214dd3 = Math.round(Fe(_0x517ca5, _0x1a3c06));
  return Math.max(_0x322bd5, Math.min(_0x8841c4, _0x214dd3));
}
function rm(_0x469f76) {
  if (!_0x469f76 || typeof _0x469f76 != "object") {
    return null;
  }
  let _0x2eec7d = String(_0x469f76.mode || "");
  if (!["solid", "gradient", "blur"].includes(_0x2eec7d)) {
    return null;
  }
  let _0x16a14d = (_0x5151d8, _0x19f349) => /^#[0-9a-fA-F]{6}$/.test(String(_0x5151d8 || "")) ? String(_0x5151d8).toLowerCase() : _0x19f349;
  let _0x2de44d = Math.round(Fe(_0x469f76.angle, 180));
  return {
    mode: _0x2eec7d,
    color: _0x16a14d(_0x469f76.color, "#000000"),
    color2: _0x16a14d(_0x469f76.color2, "#0e0e12"),
    angle: [45, 90, 135, 180].includes(_0x2de44d) ? _0x2de44d : 180,
    blur: Math.min(80, Math.max(4, Math.round(Fe(_0x469f76.blur, 24))))
  };
}
function hs(_0xc38996, _0x5b3424) {
  let _0x2f3a1b = new Set(["speed_up_tts", "stretch_video", "natural_flow"]);
  let _0x18dbf9 = new Set(["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow"]);
  let _0x4631a1 = _0xc38996.fitMode || "natural_flow";
  let _0x558149 = _0xc38996.preset || _0x5b3424.exportPreset || "medium";
  let _0x37b6ae = new Set([480, 720, 1080, 1440, 2160]);
  let _0x4d9626 = new Set([24, 25, 30, 50, 60]);
  let _0x2f2943 = new Set(["h264", "hevc"]);
  let _0xff6c73 = new Set(["mp4", "mov", "mkv"]);
  let _0x2d1e8c = Math.round(Fe(_0xc38996.resolutionH, 0));
  let _0x4f73c5 = Math.round(Fe(_0xc38996.fps, 0));
  let _0x912b0d = Math.round(Fe(_0xc38996.bitrateKbps, 0));
  return {
    opId: _0xc38996.opId || "export_" + Date.now(),
    fitMode: _0x2f3a1b.has(_0x4631a1) ? _0x4631a1 : "natural_flow",
    crf: am(_0xc38996.crf ?? _0x5b3424.exportCrf, 0, 51, 18),
    preset: _0x18dbf9.has(_0x558149) ? _0x558149 : "medium",
    resolutionH: _0x37b6ae.has(_0x2d1e8c) ? _0x2d1e8c : null,
    fps: _0x4d9626.has(_0x4f73c5) ? _0x4f73c5 : null,
    bitrateKbps: _0x912b0d >= 500 && _0x912b0d <= 200000 ? _0x912b0d : null,
    codec: _0x2f2943.has(String(_0xc38996.codec || "")) ? String(_0xc38996.codec) : "h264",
    container: _0xff6c73.has(String(_0xc38996.container || "")) ? String(_0xc38996.container) : "mp4",
    videoVolume: Fe(_0xc38996.videoVolume, Fe(_0x5b3424.videoVolume, 1)),
    ttsVolume: Fe(_0xc38996.ttsVolume, Fe(_0x5b3424.ttsVolume, 1.5)),
    burnSubtitles: _0xc38996.burnSubtitles !== false,
    burnOverlays: _0xc38996.burnOverlays !== false,
    background: rm(_0xc38996.background),
    backgroundAudioPath: typeof _0xc38996.backgroundAudioPath == "string" && _0xc38996.backgroundAudioPath ? _0xc38996.backgroundAudioPath : null,
    ffmpegBin: _0xc38996.ffmpegBinPath || _0x5b3424.ffmpegPath || "ffmpeg"
  };
}
function ms(_0x5de77a) {
  if (!_0x5de77a || _0x5de77a === "ffmpeg") {
    return "ffprobe";
  }
  let _0x338058 = ve.parse(_0x5de77a);
  let _0x59e070 = _0x338058.base.toLowerCase();
  if (_0x59e070 === "ffmpeg.exe" || _0x59e070 === "ffmpeg") {
    let _0x43fc92 = _0x59e070.endsWith(".exe") ? "ffprobe.exe" : "ffprobe";
    return ve.join(_0x338058.dir, _0x43fc92);
  }
  return "ffprobe";
}
function mn(_0x1d81ff, _0x34d803) {
  return new Promise((_0x473cef, _0x16a03b) => {
    ds(_0x1d81ff, _0x34d803, {
      maxBuffer: 20971520
    }, (_0x2c13c6, _0x1b73eb, _0x4ac16e) => {
      if (_0x2c13c6) {
        _0x2c13c6.stderr = _0x4ac16e;
        return _0x16a03b(_0x2c13c6);
      }
      _0x473cef(_0x1b73eb);
    });
  });
}
var yi = new Map();
async function om(_0xda2b26) {
  let _0x30425b = _0xda2b26 || "ffmpeg";
  if (yi.has(_0x30425b)) {
    return yi.get(_0x30425b);
  }
  let _0x23de40;
  try {
    let _0x2091be = String((await mn(_0x30425b, ["-hide_banner", "-h", "filter=alimiter"])) || "");
    if (/unknown filter|no such filter/i.test(_0x2091be)) {
      _0x23de40 = {
        hasAlimiter: false,
        hasLatency: false
      };
    } else {
      _0x23de40 = {
        hasAlimiter: true,
        hasLatency: /(^|\n)\s*latency\s+</.test(_0x2091be)
      };
    }
  } catch (_0x33b603) {
    _0x23de40 = {
      hasAlimiter: false,
      hasLatency: false
    };
    Re("[export] alimiter probe failed for \"" + _0x30425b + "\": " + (_0x33b603?.message || _0x33b603));
  }
  if (_0x23de40.hasAlimiter) {
    if (!_0x23de40.hasLatency) {
      Re("[export] ffmpeg alimiter has no 'latency' option (pre-5.0) — omitting latency compensation");
    }
  } else {
    Re("[export] ffmpeg lacks the alimiter filter — exporting without the output peak limiter");
  }
  yi.set(_0x30425b, _0x23de40);
  return _0x23de40;
}
async function Si(_0x5e9838, _0x3dc8e8) {
  try {
    let _0x2c361b = await mn(_0x3dc8e8, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", _0x5e9838]);
    return Number.parseFloat(_0x2c361b.trim());
  } catch {
    return Number.NaN;
  }
}
async function sm(_0x529ed5, _0x349450) {
  try {
    let _0x251775 = await mn(_0x349450, ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", _0x529ed5]);
    let _0x4e6ed1 = JSON.parse(_0x251775 || "{}");
    let _0x3b2267 = Array.isArray(_0x4e6ed1.streams) ? _0x4e6ed1.streams : [];
    let _0x5348d5 = _0x3b2267.find(_0x5c4baf => _0x5c4baf.codec_type === "video") || {};
    let _0x3cabc5 = _0x3b2267.find(_0x1cc61f => _0x1cc61f.codec_type === "audio");
    let _0x141336 = Number.parseFloat(_0x4e6ed1.format && _0x4e6ed1.format.duration);
    let _0x4ddde = 0;
    let _0x4043d1 = _0x5348d5.avg_frame_rate || _0x5348d5.r_frame_rate || "";
    if (_0x4043d1.includes("/")) {
      let [_0x543113, _0x246548] = _0x4043d1.split("/").map(_0x2cddd5 => Number.parseFloat(_0x2cddd5));
      if (Number.isFinite(_0x543113) && Number.isFinite(_0x246548) && _0x246548 !== 0) {
        _0x4ddde = _0x543113 / _0x246548;
      }
    } else {
      _0x4ddde = Number.parseFloat(_0x4043d1) || 0;
    }
    return {
      duration: Number.isFinite(_0x141336) ? _0x141336 : Number.NaN,
      width: Number.isFinite(_0x5348d5.width) ? _0x5348d5.width : 1920,
      height: Number.isFinite(_0x5348d5.height) ? _0x5348d5.height : 1080,
      fps: Number.isFinite(_0x4ddde) ? _0x4ddde : 0,
      hasAudio: !!_0x3cabc5
    };
  } catch (_0x5218ce) {
    Re("[Export] ffprobe media probe failed: " + _0x5218ce.message + "\n");
    throw new Error("Không đọc được thông tin video nguồn (" + ve.basename(String(_0x529ed5)) + ") — file có thể hỏng hoặc định dạng không được hỗ trợ. Thử mở lại video hoặc chuyển mã sang MP4 rồi xuất lại.");
  }
}
function os(_0x298d55) {
  let _0x37d3f2 = Number.parseFloat(_0x298d55.out_time_ms || _0x298d55.out_time_us || "");
  if (Number.isFinite(_0x37d3f2) && _0x37d3f2 > 0) {
    return _0x37d3f2 / 1000000;
  }
  let _0x5b30e3 = _0x298d55.out_time || "";
  let _0x41a92e = String(_0x5b30e3).match(/^(\d+):(\d+):(\d+(?:\.\d+)?)$/);
  if (_0x41a92e) {
    return Number.parseInt(_0x41a92e[1], 10) * 3600 + Number.parseInt(_0x41a92e[2], 10) * 60 + Number.parseFloat(_0x41a92e[3]);
  } else {
    return 0;
  }
}
function cm(_0x30997b) {
  let _0x12ac73 = ve.extname(_0x30997b || "");
  return (_0x12ac73 ? String(_0x30997b).slice(0, -_0x12ac73.length) : String(_0x30997b || "")) + ".part" + (_0x12ac73 || ".mp4");
}
function lm(_0x5099d, _0x1615b8) {
  if (!_0x5099d || !_0x1615b8) {
    return false;
  }
  try {
    let _0x1e851c = _0x30ca8f => {
      let _0x36bbc6 = ve.resolve(String(_0x30ca8f));
      if (process.platform === "win32") {
        return _0x36bbc6.toLowerCase();
      } else {
        return _0x36bbc6;
      }
    };
    return _0x1e851c(_0x5099d) === _0x1e851c(_0x1615b8);
  } catch {
    return false;
  }
}
async function ss(_0x2d043a, _0x2a94ac, _0x2203a4) {
  let {
    opId: _0x89e66,
    outputFilePath: _0x2706b0,
    filterScriptPath: _0x1970fb,
    expectedDuration: _0x419dfe,
    extraCleanupPaths: _0x34df39
  } = _0x2203a4;
  let _0xa31dfc = _0x2203a4.encoderLabel || "";
  let _0x3d2da7 = !!_0x2203a4.keepTempOnFail;
  let _0x22a1a3 = "";
  let _0x517cc5 = "";
  let _0x487c70 = "";
  let _0x2891e3 = 0;
  let _0x21eaa3 = 0;
  let _0x4c6764 = {};
  return new Promise((_0x510317, _0x3f91eb) => {
    let _0x2c3148 = Zh(_0x2d043a, _0x2a94ac, {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let _0x2dfa2c = false;
    let _0xc3706e = () => {
      try {
        if (_0x1970fb && W.existsSync(_0x1970fb)) {
          W.unlinkSync(_0x1970fb);
        }
      } catch {}
      (_0x34df39 || []).forEach(_0x28fb49 => {
        try {
          if (_0x28fb49 && W.existsSync(_0x28fb49)) {
            W.unlinkSync(_0x28fb49);
          }
        } catch {}
      });
    };
    let _0x463fe3 = _0x1ab575 => {
      if (!_0x2dfa2c) {
        _0x2dfa2c = true;
        if (!_0x3d2da7) {
          _0xc3706e();
        }
        try {
          if (_0x2706b0 && W.existsSync(_0x2706b0)) {
            W.unlinkSync(_0x2706b0);
          }
        } catch {}
        _0x3f91eb(_0x1ab575);
      }
    };
    let _0x5aad8f = () => {
      if (!_0x2c3148.killed) {
        try {
          _0x2c3148.kill("SIGTERM");
        } catch {}
      }
    };
    process.once("exit", _0x5aad8f);
    process.once("SIGINT", _0x5aad8f);
    process.once("SIGTERM", _0x5aad8f);
    let _0x1fa6fc = (_0x478919 = false) => {
      let _0x2204d6 = Date.now();
      if (!_0x478919 && _0x2204d6 - _0x2891e3 < 500) {
        return;
      }
      _0x2891e3 = _0x2204d6;
      let _0x4554f3 = os(_0x4c6764);
      let _0x1164b2 = _0x419dfe > 0 ? Math.max(0, Math.min(100, _0x4554f3 / _0x419dfe * 100)) : 0;
      Je({
        type: "progress",
        op: "export",
        opId: _0x89e66,
        pct: _0x1164b2,
        outTime: _0x4554f3,
        fps: _0x4c6764.fps || "",
        speed: _0x4c6764.speed || "",
        encoder: _0xa31dfc
      });
    };
    _0x2c3148.stdout.on("data", _0x5ed083 => {
      _0x517cc5 += _0x5ed083.toString("utf8");
      let _0x4fe12f = _0x517cc5.split(/\r?\n/);
      _0x517cc5 = _0x4fe12f.pop() || "";
      _0x4fe12f.forEach(_0x575945 => {
        let _0x5ed1f0 = _0x575945.indexOf("=");
        if (_0x5ed1f0 === -1) {
          return;
        }
        let _0x539092 = _0x575945.slice(0, _0x5ed1f0).trim();
        let _0x7e8dcd = _0x575945.slice(_0x5ed1f0 + 1).trim();
        _0x4c6764[_0x539092] = _0x7e8dcd;
        if (_0x539092 === "progress") {
          _0x1fa6fc(_0x7e8dcd === "end");
        }
      });
    });
    _0x2c3148.stderr.on("data", _0x16233d => {
      let _0x2bf7ce = _0x16233d.toString("utf8");
      _0x22a1a3 = (_0x22a1a3 + _0x2bf7ce).slice(-12000);
      _0x487c70 += _0x2bf7ce;
      let _0x364459 = _0x487c70.split(/\r?\n/);
      _0x487c70 = _0x364459.pop() || "";
      let _0x1dee0b = Date.now();
      if (!(_0x1dee0b - _0x21eaa3 < 500) || !_0x364459.length) {
        _0x21eaa3 = _0x1dee0b;
        _0x364459.filter(Boolean).slice(-8).forEach(_0x1fa5e0 => {
          let _0x3c7568 = "[Export][ffmpeg] " + _0x1fa5e0 + "\n";
          Re(_0x3c7568);
          Je({
            type: "log",
            op: "export",
            opId: _0x89e66,
            message: _0x3c7568
          });
        });
      }
    });
    _0x2c3148.on("error", _0x69f733 => _0x463fe3(_0x69f733));
    _0x2c3148.on("close", (_0x5e763c, _0x49dee9) => {
      process.removeListener("exit", _0x5aad8f);
      process.removeListener("SIGINT", _0x5aad8f);
      process.removeListener("SIGTERM", _0x5aad8f);
      if (_0x2dfa2c) {
        return;
      }
      _0x2dfa2c = true;
      if (_0x5e763c === 0) {
        _0xc3706e();
        Je({
          type: "progress",
          op: "export",
          opId: _0x89e66,
          pct: 100,
          outTime: _0x419dfe || os(_0x4c6764),
          fps: _0x4c6764.fps || "",
          speed: _0x4c6764.speed || "",
          encoder: _0xa31dfc
        });
        return _0x510317();
      }
      if (!_0x3d2da7) {
        _0xc3706e();
      }
      try {
        if (_0x2706b0 && W.existsSync(_0x2706b0)) {
          W.unlinkSync(_0x2706b0);
        }
      } catch {}
      let _0x3d713c = _0x22a1a3 || "FFmpeg exited with code " + _0x5e763c + (_0x49dee9 ? " (" + _0x49dee9 + ")" : "");
      _0x3f91eb(new Error(_0x3d713c));
    });
  });
}
async function Ti(_0x59f13f, _0x3e7cef) {
  let _0x5d7b3a = new Array(_0x59f13f.length);
  let _0x3cc7f5 = 0;
  let _0x4adbfb = Array.from({
    length: Math.min(_0x3e7cef, _0x59f13f.length)
  }, async () => {
    while (_0x3cc7f5 < _0x59f13f.length) {
      let _0xfbee8f = _0x3cc7f5++;
      _0x5d7b3a[_0xfbee8f] = await _0x59f13f[_0xfbee8f]();
    }
  });
  await Promise.all(_0x4adbfb);
  return _0x5d7b3a;
}
function un(_0x1206ac, _0x181bb9) {
  return new Promise((_0x45d0e0, _0x2086f0) => {
    ds(_0x1206ac, _0x181bb9, {
      maxBuffer: 20971520
    }, (_0x36c2a7, _0x21ffdf, _0x4f94f1) => {
      if (_0x36c2a7) {
        _0x36c2a7.stderr = _0x4f94f1;
        return _0x2086f0(_0x36c2a7);
      }
      _0x45d0e0(_0x21ffdf);
    });
  });
}
function Mi(_0x34cf14) {
  let _0x585b81 = (_0x34cf14 && _0x34cf14.stderr || "") + "\n" + (_0x34cf14 && _0x34cf14.message || "");
  return /pthread_create|Resource temporarily unavailable|Cannot allocate memory|Error creating thread/i.test(_0x585b81);
}
function um(_0x1df0f0, _0x584a17, _0x40c89f, _0x32f02d) {
  let _0x3fca0c = null;
  try {
    _0x3fca0c = W.openSync(_0x1df0f0, "r");
    let _0x3bc025 = Buffer.alloc(12);
    if (W.readSync(_0x3fca0c, _0x3bc025, 0, 12, 0) !== 12 || _0x3bc025.toString("ascii", 0, 4) !== "RIFF" || _0x3bc025.toString("ascii", 8, 12) !== "WAVE") {
      return null;
    }
    let _0x1cd640 = W.fstatSync(_0x3fca0c).size;
    let _0x14213d = Buffer.alloc(8);
    let _0x1b769c = 12;
    while (_0x1b769c + 8 <= _0x1cd640) {
      if (W.readSync(_0x3fca0c, _0x14213d, 0, 8, _0x1b769c) !== 8) {
        return null;
      }
      let _0x3b2d70 = _0x14213d.toString("ascii", 0, 4);
      let _0x5b2ec8 = _0x14213d.readUInt32LE(4);
      if (_0x3b2d70 === "data") {
        if (_0x5b2ec8 === 4294967295 || _0x1b769c + 8 + _0x5b2ec8 > _0x1cd640) {
          _0x5b2ec8 = _0x1cd640 - _0x1b769c - 8;
        }
        return _0x5b2ec8 / (_0x584a17 * _0x40c89f * _0x32f02d);
      }
      _0x1b769c += 8 + _0x5b2ec8 + _0x5b2ec8 % 2;
    }
    return null;
  } catch {
    return null;
  } finally {
    if (_0x3fca0c !== null) {
      try {
        W.closeSync(_0x3fca0c);
      } catch {}
    }
  }
}
async function dm(_0x1b36ce, {
  plan: _0xa587ed,
  speed: _0x26ae03,
  fitMode: _0x34057b,
  ffmpegBin: _0x536289,
  log: _0x9359bf
}) {
  let _0x34146d = _0xa587ed && _0xa587ed.pieces && _0xa587ed.pieces.length ? new Map(_0xa587ed.pieces.filter(_0x2da98d => _0x2da98d.id != null).map(_0x2c7efe => [_0x2c7efe.id, _0x2c7efe])) : null;
  let _0x570a20 = _0x34146d ? _0xa587ed.pieces : null;
  let _0x6dc737 = 44100;
  let _0x32ee2d = [];
  for (let _0x58e67c of _0x1b36ce) {
    if (!_0x58e67c.audioPath || !W.existsSync(_0x58e67c.audioPath)) {
      continue;
    }
    let {
      delayMs: _0x297daf,
      tempo: _0x34fc24,
      trimDuration: _0x343a87
    } = Bh(_0x58e67c, {
      pieceById: _0x34146d,
      pieces: _0x570a20,
      speed: _0x26ae03,
      fitMode: _0x34057b
    });
    let _0x3a2cc3 = Number.isFinite(_0x58e67c.audioDuration) && _0x58e67c.audioDuration > 0 ? _0x58e67c.audioDuration : null;
    let _0x4f94a4 = _0x3a2cc3 ? _0x3a2cc3 / _0x34fc24 : null;
    if (_0x343a87 !== null && _0x4f94a4 !== null) {
      _0x4f94a4 = Math.min(_0x4f94a4, _0x343a87);
    }
    _0x32ee2d.push({
      src: _0x58e67c.audioPath,
      startSec: _0x297daf / 1000,
      tempo: _0x34fc24,
      trimDuration: _0x343a87,
      expectedDur: _0x4f94a4
    });
  }
  if (_0x32ee2d.length === 0) {
    return null;
  }
  _0x32ee2d.sort((_0x24c324, _0x4c5ddb) => _0x24c324.startSec - _0x4c5ddb.startSec);
  let _0x199a49 = W.mkdtempSync(ve.join(lt.tmpdir(), "ag_ttsmix_"));
  let _0x5a1113 = () => {
    try {
      W.rmSync(_0x199a49, {
        recursive: true,
        force: true
      });
    } catch {}
  };
  try {
    let _0x576000 = ["-threads", "1", "-filter_complex_threads", "1"];
    let _0x1c7c78 = _0x2677af => {
      let _0x1ca356 = [];
      if (_0x2677af.tempo !== 1) {
        _0x1ca356.push(zh(_0x2677af.tempo));
      }
      if (_0x2677af.trimDuration !== null) {
        _0x1ca356.push("atrim=duration=" + _0x2677af.trimDuration.toFixed(3));
        _0x1ca356.push(Yh(_0x2677af.trimDuration));
      }
      _0x1ca356.push("aresample=" + _0x6dc737, "aformat=sample_fmts=s16:channel_layouts=stereo");
      return _0x1ca356.join(",");
    };
    let _0x5b53de = false;
    let _0x270541 = async _0x89ce40 => {
      for (let _0x442be2 = 0;; _0x442be2++) {
        try {
          await un(_0x536289, ["-y", "-hide_banner", "-loglevel", "error", ..._0x576000, "-i", _0x89ce40.src, "-af", _0x1c7c78(_0x89ce40), "-c:a", "pcm_s16le", _0x89ce40.normPath]);
          return;
        } catch (_0x197575) {
          if (!Mi(_0x197575) || _0x442be2 >= 2) {
            throw _0x197575;
          }
          await new Promise(_0x369790 => setTimeout(_0x369790, (_0x442be2 + 1) * 1500));
        }
      }
    };
    let _0x5df660 = [];
    for (let _0x5a9744 = 0; _0x5a9744 * 15 < _0x32ee2d.length; _0x5a9744++) {
      let _0x1daa50 = _0x32ee2d.slice(_0x5a9744 * 15, (_0x5a9744 + 1) * 15);
      _0x5df660.push(async () => {
        _0x1daa50.forEach((_0x368d17, _0x2ff147) => {
          _0x368d17.normPath = ve.join(_0x199a49, "clip_" + _0x5a9744 + "_" + _0x2ff147 + ".wav");
        });
        let _0x352eb7 = false;
        if (!_0x5b53de) {
          let _0x2cd7cd = ["-y", "-hide_banner", "-loglevel", "error", ..._0x576000];
          _0x1daa50.forEach(_0x4df45b => _0x2cd7cd.push("-i", _0x4df45b.src));
          let _0x523c1d = _0x1daa50.map((_0x233ced, _0x16f72d) => "[" + _0x16f72d + ":a]" + _0x1c7c78(_0x233ced) + "[o" + _0x16f72d + "]");
          let _0x35aa6d = ve.join(_0x199a49, "norm_" + _0x5a9744 + ".txt");
          W.writeFileSync(_0x35aa6d, _0x523c1d.join("; "), "utf8");
          _0x2cd7cd.push("-filter_complex_script", _0x35aa6d);
          _0x1daa50.forEach((_0x46656c, _0x1eea0d) => _0x2cd7cd.push("-map", "[o" + _0x1eea0d + "]", "-c:a", "pcm_s16le", _0x46656c.normPath));
          try {
            await un(_0x536289, _0x2cd7cd);
            _0x352eb7 = true;
          } catch (_0x2e510e) {
            if (!Mi(_0x2e510e)) {
              throw _0x2e510e;
            }
            if (!_0x5b53de && _0x9359bf) {
              _0x9359bf("[Export] ⚠️ Máy đang cạn tài nguyên hệ thống (thread/bộ nhớ) — chuyển sang chuẩn hoá từng clip TTS một, sẽ chậm hơn một chút...\n");
            }
            _0x5b53de = true;
          }
        }
        if (!_0x352eb7) {
          for (let _0x414378 of _0x1daa50) {
            await _0x270541(_0x414378);
          }
        }
        _0x1daa50.forEach(_0x54f713 => {
          _0x54f713.actualDur = um(_0x54f713.normPath, _0x6dc737, 2, 2);
        });
      });
    }
    if (_0x9359bf) {
      _0x9359bf("[Export] Normalizing " + _0x32ee2d.length + " TTS clips (" + _0x5df660.length + " batches)...\n");
    }
    await Ti(_0x5df660, 4);
    for (let _0x1b61f3 of _0x32ee2d) {
      if (_0x1b61f3.actualDur === null || !Number.isFinite(_0x1b61f3.actualDur)) {
        let _0x4f98c8 = await Si(_0x1b61f3.normPath, ms(_0x536289));
        _0x1b61f3.actualDur = Number.isFinite(_0x4f98c8) && _0x4f98c8 > 0 ? _0x4f98c8 : _0x1b61f3.expectedDur !== null ? _0x1b61f3.expectedDur : 5;
      }
    }
    let _0x51b7b0 = 4;
    let _0x5b8655 = (_0x43f681, _0xac9a2f) => {
      let _0x561d4b = _0xac9a2f * _0x51b7b0;
      let _0x523de5 = Buffer.alloc(44);
      _0x523de5.write("RIFF", 0, "ascii");
      _0x523de5.writeUInt32LE(36 + _0x561d4b, 4);
      _0x523de5.write("WAVE", 8, "ascii");
      _0x523de5.write("fmt ", 12, "ascii");
      _0x523de5.writeUInt32LE(16, 16);
      _0x523de5.writeUInt16LE(1, 20);
      _0x523de5.writeUInt16LE(2, 22);
      _0x523de5.writeUInt32LE(_0x6dc737, 24);
      _0x523de5.writeUInt32LE(_0x6dc737 * _0x51b7b0, 28);
      _0x523de5.writeUInt16LE(_0x51b7b0, 32);
      _0x523de5.writeUInt16LE(16, 34);
      _0x523de5.write("data", 36, "ascii");
      _0x523de5.writeUInt32LE(_0x561d4b, 40);
      let _0x4e16c4 = W.openSync(_0x43f681, "w");
      try {
        W.writeSync(_0x4e16c4, _0x523de5);
        let _0x4bdd19 = Buffer.alloc(Math.min(_0x561d4b, 4194304));
        let _0x20997b = _0x561d4b;
        while (_0x20997b > 0) {
          let _0x594704 = Math.min(_0x20997b, _0x4bdd19.length);
          W.writeSync(_0x4e16c4, _0x4bdd19, 0, _0x594704);
          _0x20997b -= _0x594704;
        }
      } finally {
        W.closeSync(_0x4e16c4);
      }
    };
    let _0x415525 = (_0x3f5e65, _0x413881, _0x546c12) => {
      let _0x5ce562 = W.readFileSync(_0x3f5e65);
      let _0x2ede42 = 12;
      while (_0x2ede42 + 8 <= _0x5ce562.length) {
        let _0x597922 = _0x5ce562.toString("ascii", _0x2ede42, _0x2ede42 + 4);
        let _0x9a7287 = _0x5ce562.readUInt32LE(_0x2ede42 + 4);
        if (_0x597922 === "data") {
          let _0x3b202e = Math.min(_0x413881 * _0x51b7b0, _0x9a7287);
          let _0x170568 = _0x5ce562.subarray(_0x2ede42 + 8, _0x2ede42 + 8 + _0x9a7287 - _0x3b202e);
          let _0x2089f5 = ve.join(_0x199a49, "tail_" + _0x546c12 + "_" + ve.basename(_0x3f5e65));
          let _0x29b85c = Buffer.from(_0x5ce562.subarray(0, _0x2ede42 + 8));
          _0x29b85c.writeUInt32LE(36 + _0x170568.length, 4);
          _0x29b85c.writeUInt32LE(_0x170568.length, _0x2ede42 + 4);
          W.writeFileSync(_0x2089f5, Buffer.concat([_0x29b85c, _0x170568]));
          return _0x2089f5;
        }
        _0x2ede42 += 8 + _0x9a7287 + _0x9a7287 % 2;
      }
      return _0x3f5e65;
    };
    let _0x4e742a = (_0x584703, _0x41b428) => {
      let _0x461518 = W.readFileSync(_0x584703);
      let _0x4c52cb = 12;
      while (_0x4c52cb + 8 <= _0x461518.length) {
        let _0x1bb358 = _0x461518.toString("ascii", _0x4c52cb, _0x4c52cb + 4);
        let _0x1192be = _0x461518.readUInt32LE(_0x4c52cb + 4);
        if (_0x1bb358 === "data") {
          let _0x36bd5c = Math.min(_0x41b428 * _0x51b7b0, _0x1192be);
          let _0x2e4ee4 = _0x461518.subarray(_0x4c52cb + 8 + _0x36bd5c, _0x4c52cb + 8 + _0x1192be);
          let _0x113a7f = ve.join(_0x199a49, "trim_" + ve.basename(_0x584703));
          let _0x3e8fa9 = Buffer.from(_0x461518.subarray(0, _0x4c52cb + 8));
          _0x3e8fa9.writeUInt32LE(36 + _0x2e4ee4.length, 4);
          _0x3e8fa9.writeUInt32LE(_0x2e4ee4.length, _0x4c52cb + 4);
          W.writeFileSync(_0x113a7f, Buffer.concat([_0x3e8fa9, _0x2e4ee4]));
          return _0x113a7f;
        }
        _0x4c52cb += 8 + _0x1192be + _0x1192be % 2;
      }
      return _0x584703;
    };
    let _0x4fa64e = _0x6dc737 * 60;
    let _0x37f273 = null;
    let _0x43b4e9 = new Map();
    let _0x2155aa = _0x4f8766 => "'" + _0x4f8766.replace(/\\/g, "/").replace(/'/g, "'\\''") + "'";
    let _0x546b0d = ["ffconcat version 1.0"];
    let _0x1bd7a2 = 0;
    let _0x24a0ba = 0;
    let _0x2d787b = null;
    for (let _0x4a08cf of _0x32ee2d) {
      let _0x4b33e4 = Math.round(_0x4a08cf.startSec * _0x6dc737);
      let _0x22b2ef = Math.round(_0x4a08cf.actualDur * _0x6dc737);
      if (_0x4b33e4 < _0x24a0ba) {
        let _0x5d8ae3 = _0x24a0ba - _0x4b33e4;
        if (_0x2d787b && _0x2d787b.frames - _0x5d8ae3 >= _0x6dc737 * 0.2) {
          let _0xee13de = _0x415525(_0x2d787b.path, _0x5d8ae3, _0x2d787b.lineIdx);
          _0x546b0d[_0x2d787b.lineIdx] = "file " + _0x2155aa(_0xee13de);
          _0x2d787b.path = _0xee13de;
          _0x2d787b.frames -= _0x5d8ae3;
          _0x24a0ba -= _0x5d8ae3;
          if (_0x9359bf) {
            _0x9359bf("[Export] ⚠️ Giọng chồng lấn tại ~" + _0x4a08cf.startSec.toFixed(2) + "s — cắt " + (_0x5d8ae3 / _0x6dc737).toFixed(2) + "s phần đuôi tràn của câu TRƯỚC (plan lẽ ra phải chặn từ trước).\n");
          }
        }
      }
      let _0x45b5dc = _0x4b33e4 - _0x24a0ba;
      while (_0x45b5dc >= _0x4fa64e) {
        if (!_0x37f273) {
          _0x37f273 = ve.join(_0x199a49, "silence_60s.wav");
          _0x5b8655(_0x37f273, _0x4fa64e);
        }
        _0x546b0d.push("file " + _0x2155aa(_0x37f273));
        _0x24a0ba += _0x4fa64e;
        _0x45b5dc -= _0x4fa64e;
      }
      if (_0x45b5dc > 0) {
        let _0x1b8bdf = _0x43b4e9.get(_0x45b5dc);
        if (!_0x1b8bdf) {
          _0x1b8bdf = ve.join(_0x199a49, "silence_" + _0x1bd7a2++ + ".wav");
          _0x5b8655(_0x1b8bdf, _0x45b5dc);
          _0x43b4e9.set(_0x45b5dc, _0x1b8bdf);
        }
        _0x546b0d.push("file " + _0x2155aa(_0x1b8bdf));
        _0x24a0ba += _0x45b5dc;
      }
      let _0x3eb5d2 = _0x4a08cf.normPath;
      let _0x30f631 = _0x22b2ef;
      if (_0x4b33e4 < _0x24a0ba) {
        let _0x314ed0 = _0x24a0ba - _0x4b33e4;
        if (_0x314ed0 >= _0x22b2ef - _0x6dc737 * 0.01) {
          continue;
        }
        _0x3eb5d2 = _0x4e742a(_0x4a08cf.normPath, _0x314ed0);
        _0x30f631 = _0x22b2ef - _0x314ed0;
      }
      _0x546b0d.push("file " + _0x2155aa(_0x3eb5d2));
      _0x24a0ba += _0x30f631;
      _0x2d787b = {
        lineIdx: _0x546b0d.length - 1,
        path: _0x3eb5d2,
        frames: _0x30f631
      };
    }
    let _0x675290 = _0x24a0ba / _0x6dc737;
    let _0x1e273a = ve.join(_0x199a49, "concat.txt");
    W.writeFileSync(_0x1e273a, _0x546b0d.join("\n"), "utf8");
    let _0x16f5ab = ve.join(lt.tmpdir(), "ag_tts_premixed_" + hn() + ".flac");
    if (_0x9359bf) {
      _0x9359bf("[Export] Building combined TTS track (" + _0x32ee2d.length + " clips over " + (_0x675290 / 60).toFixed(1) + " min)...\n");
    }
    await un(_0x536289, ["-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", _0x1e273a, "-c:a", "flac", _0x16f5ab]);
    return _0x16f5ab;
  } finally {
    _0x5a1113();
  }
}
function xt(_0x415c1a, _0x1637f2) {
  let _0x2fed0d = 255;
  let _0xf61caa = 255;
  let _0x302283 = 255;
  let _0x597686 = 1;
  if (typeof _0x415c1a == "string") {
    if (_0x415c1a.startsWith("#")) {
      let _0x129b98 = _0x415c1a.slice(1);
      if (_0x129b98.length >= 6) {
        _0x2fed0d = Number.parseInt(_0x129b98.slice(0, 2), 16);
        _0xf61caa = Number.parseInt(_0x129b98.slice(2, 4), 16);
        _0x302283 = Number.parseInt(_0x129b98.slice(4, 6), 16);
      }
      if (_0x129b98.length >= 8) {
        _0x597686 = Number.parseInt(_0x129b98.slice(6, 8), 16) / 255;
      }
    } else {
      let _0x51a9ba = _0x415c1a.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
      if (_0x51a9ba) {
        _0x2fed0d = Number.parseInt(_0x51a9ba[1], 10);
        _0xf61caa = Number.parseInt(_0x51a9ba[2], 10);
        _0x302283 = Number.parseInt(_0x51a9ba[3], 10);
        if (_0x51a9ba[4] !== undefined) {
          _0x597686 = Number.parseFloat(_0x51a9ba[4]);
        }
      }
    }
  }
  if (_0x1637f2 != null) {
    _0x597686 = _0x1637f2;
  }
  let _0x1ec433 = _0x20fec9 => Math.max(0, Math.min(255, Math.round(_0x20fec9))).toString(16).padStart(2, "0").toUpperCase();
  return {
    color: "&H" + _0x1ec433(_0x302283) + _0x1ec433(_0xf61caa) + _0x1ec433(_0x2fed0d) + "&",
    alpha: "&H" + _0x1ec433((1 - _0x597686) * 255) + "&"
  };
}
function cs(_0x275eb0) {
  let _0x2363d1 = Math.max(0, _0x275eb0);
  let _0x327664 = Math.floor(_0x2363d1 / 3600);
  let _0x3358d5 = Math.floor(_0x2363d1 % 3600 / 60);
  let _0x2bd6fc = Math.floor(_0x2363d1 % 60);
  let _0x38fd56 = Math.floor((_0x2363d1 - Math.floor(_0x2363d1)) * 100);
  return _0x327664 + ":" + String(_0x3358d5).padStart(2, "0") + ":" + String(_0x2bd6fc).padStart(2, "0") + "." + String(_0x38fd56).padStart(2, "0");
}
function wi(_0x3a301e) {
  return String(_0x3a301e || "").replace(/\r?\n/g, " ").replace(/\\/g, "/").replace(/\{/g, "(").replace(/\}/g, ")");
}
function Ii(_0x1e699e) {
  let _0x570d56 = (_0x1e699e?.dubbingText || "").trim();
  if (_0x570d56) {
    return _0x570d56;
  }
  let _0x479007 = (_0x1e699e?.translation || "").trim();
  return _0x479007 || _0x1e699e?.text || "";
}
function ps(_0x143f15) {
  let {
    normalizeDualSpeaker: _0x41c9f3
  } = Pt();
  return _0x41c9f3(String(Ii(_0x143f15) || "")).replace(/\s*\|\|\s*/g, ". ").trim();
}
function xi(_0x56ac5f) {
  let _0x22d1bc = (_0x56ac5f.subtitleText || "").trim();
  return _0x22d1bc || Ii(_0x56ac5f);
}
function hm(_0x192c9f) {
  return String(_0x192c9f || "").split("||").map(_0x590f20 => _0x590f20.trim()).filter(Boolean).map(_0x282229 => "- " + _0x282229);
}
function gs(_0x5a1c53, _0x3e76af, _0x3156c3, _0xf13b81 = null) {
  let _0xab2068 = Ph(_0xf13b81);
  let _0x272ef7 = ["[Script Info]", "ScriptType: v4.00+", "PlayResX: " + _0x3e76af, "PlayResY: " + _0x3156c3, "YCbCr Matrix: " + (_0x3156c3 >= 720 || _0x3e76af >= 1280 ? "TV.709" : "TV.601"), "WrapStyle: 2", "ScaledBorderAndShadow: yes", "", "[V4+ Styles]", "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding", "Style: Default,Arial,35,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,0,0,80,1", "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"];
  let _0x30590c = [];
  for (let _0x1a2f42 of _0x5a1c53) {
    let _0x30484f = xi(_0x1a2f42);
    let _0x5b4ed9 = _0x30484f.includes("||") ? hm(_0x30484f) : Array.isArray(_0x1a2f42.realLines) && _0x1a2f42.realLines.length ? _0x1a2f42.realLines : null;
    if (!_0x5b4ed9) {
      let _0x281e25 = String(_0x30484f).replace(/\r?\n/g, " ").trim().split(/\s+/).filter(Boolean);
      if (!_0x281e25.length) {
        continue;
      }
      let _0x12bfa3 = _0x1a2f42.wordsPerLine || 12;
      _0x5b4ed9 = [];
      for (let _0x2a1fde = 0; _0x2a1fde < _0x281e25.length; _0x2a1fde += _0x12bfa3) {
        _0x5b4ed9.push(_0x281e25.slice(_0x2a1fde, _0x2a1fde + _0x12bfa3).join(" "));
      }
      _0x5b4ed9.length = Math.min(_0x5b4ed9.length, _0x1a2f42.linesPerSegment || 2);
    }
    if (!_0x5b4ed9.length) {
      continue;
    }
    let _0x33280f = cs(_0x1a2f42.startTime);
    let _0x3faeed = cs(_0x1a2f42.endTime);
    let _0x39d062 = Math.round(_0x1a2f42.realFontSize || _0x1a2f42.fontSize || 35);
    let _0x2f73eb = wi(_0x1a2f42.fontFamily || "Arial").replace(/[(),]/g, "");
    let _0x36ed3f = Wh(_0x1a2f42.fontFamily, _0xab2068);
    let _0x259362 = Math.max(1, Math.round(_0x39d062 * _0x36ed3f.fsScale));
    let _0x83d300 = _0x39d062 * _0x36ed3f.topShiftPerEm;
    let _0x5ca9b4 = _0x1a2f42.captionStyle || "box";
    let _0x5ab4a3 = _0x1a2f42.bgEnabled !== undefined ? !!_0x1a2f42.bgEnabled : _0x5ca9b4 === "box";
    let _0x44f18b = _0x1a2f42.strokeEnabled !== undefined ? !!_0x1a2f42.strokeEnabled : _0x5ca9b4 === "outline";
    let _0xd73523 = _0x1a2f42.bgOpacity;
    let _0x3a5a6f = _0xd73523 == null ? 0.6 : _0xd73523 <= 1 ? _0xd73523 : _0xd73523 / 100;
    let _0x3b1777 = Number.isFinite(_0x1a2f42.strokeWidth) ? Number(_0x1a2f42.strokeWidth) : 15;
    let _0x5dc894 = _0x1a2f42.textOpacity;
    let _0x30e46a = _0x5dc894 == null ? 1 : _0x5dc894 <= 1 ? _0x5dc894 : _0x5dc894 / 100;
    let _0x12dfb5 = xt(_0x1a2f42.fontColor || "#ffffff", _0x30e46a);
    let _0x3ac159 = Math.round(_0x1a2f42.realLineHeight || _0x39d062 * 1.25);
    let _0x56a391 = Math.round(_0x1a2f42.realPaddingY !== undefined ? _0x1a2f42.realPaddingY : 12);
    let _0x33a028 = Number.isFinite(_0x1a2f42.realBoxX) ? Math.round(_0x1a2f42.realBoxX) : null;
    let _0x172c77 = Number.isFinite(_0x1a2f42.realBoxY) ? Math.round(_0x1a2f42.realBoxY) : null;
    let _0x5e5eee = Math.round(_0x1a2f42.realBoxWidth || 0);
    let _0xc29b1a = Math.round(_0x1a2f42.realBoxHeight || 0);
    let _0x2c5d6a = _0x33a028 !== null && _0x172c77 !== null && _0x5e5eee > 0 && _0xc29b1a > 0;
    if (_0x5ab4a3 && _0x2c5d6a) {
      let _0x5ef953 = xt(_0x1a2f42.backgroundColor || "#000000", _0x3a5a6f * _0x30e46a);
      _0x30590c.push("Dialogue: 0," + _0x33280f + "," + _0x3faeed + ",Default,,0,0,0,,{\\an7\\pos(" + _0x33a028 + "," + _0x172c77 + ")\\1c" + _0x5ef953.color + "\\1a" + _0x5ef953.alpha + "\\bord0\\shad0\\p1}m 0 0 l " + _0x5e5eee + " 0 l " + _0x5e5eee + " " + _0xc29b1a + " l 0 " + _0xc29b1a + "{\\p0}");
    }
    let _0x11df1d = _0x44f18b ? "\\3c" + xt(_0x1a2f42.strokeColor || _0x1a2f42.outlineColor || "#000000").color + "\\3a" + xt("#000000", _0x30e46a).alpha + "\\bord" + Math.max(1, Math.round(_0x39d062 * (_0x3b1777 / 100) / 2)) : "\\bord0";
    if (_0x2c5d6a) {
      let _0x275a2b = Math.round(_0x33a028 + _0x5e5eee / 2);
      _0x5b4ed9.forEach((_0x3d471d, _0x12bf71) => {
        let _0x20e96f = Math.round(_0x172c77 + _0x56a391 + _0x12bf71 * _0x3ac159 + _0x83d300);
        _0x30590c.push("Dialogue: 1," + _0x33280f + "," + _0x3faeed + ",Default,,0,0,0,,{\\an8\\pos(" + _0x275a2b + "," + _0x20e96f + ")\\fn" + _0x2f73eb + "\\fs" + _0x259362 + "\\1c" + _0x12dfb5.color + "\\1a" + _0x12dfb5.alpha + _0x11df1d + "\\shad0}" + wi(_0x3d471d));
      });
    } else {
      let _0x2f1ba3 = _0x5ab4a3 && !_0x44f18b ? (() => {
        let _0x303606 = xt(_0x1a2f42.backgroundColor || "#000000", _0x3a5a6f * _0x30e46a);
        return "\\bord" + Math.max(4, Math.round(_0x39d062 * 0.5)) + "\\3c" + _0x303606.color + "\\3a" + _0x303606.alpha + "\\xbord0\\ybord0";
      })() : "";
      _0x30590c.push("Dialogue: 1," + _0x33280f + "," + _0x3faeed + ",Default,,0,0,80,,{\\an2\\fn" + _0x2f73eb + "\\fs" + _0x259362 + "\\1c" + _0x12dfb5.color + "\\1a" + _0x12dfb5.alpha + (_0x44f18b ? _0x11df1d : _0x2f1ba3) + "\\shad0}" + _0x5b4ed9.map(wi).join("\\N"));
    }
  }
  return "﻿" + _0x272ef7.concat(_0x30590c).join("\n") + "\n";
}
function mm(_0x4fc074, _0xd30b9f, _0x40b3d6, _0x6160a7, _0x71831d = null) {
  W.writeFileSync(_0x6160a7, gs(_0x4fc074, _0xd30b9f, _0x40b3d6, _0x71831d), "utf8");
  return _0x6160a7;
}
var ls = ve.join(lt.tmpdir(), "ezmaxsub_video_encoder.json");
var pm = 86400000;
var gm = 1800000;
async function us(_0x1a2f00, _0xea473a) {
  await un(_0x1a2f00, ["-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "color=black:s=256x256:d=0.3:r=30", "-frames:v", "8", "-c:v", _0xea473a, "-f", "null", "-"]);
}
async function fm(_0x12a88c, _0xfadff1 = "h264") {
  let _0x3642f0 = _0xfadff1 === "hevc" ? "hevc" : "h264";
  let _0x2d936f = _0x3642f0 === "hevc" ? [{
    name: "hevc_nvenc",
    label: "NVIDIA GPU (NVENC, HEVC)"
  }, {
    name: "hevc_qsv",
    label: "Intel GPU (QuickSync, HEVC)"
  }, {
    name: "hevc_amf",
    label: "AMD GPU (AMF, HEVC)"
  }] : [{
    name: "h264_nvenc",
    label: "NVIDIA GPU (NVENC)"
  }, {
    name: "h264_qsv",
    label: "Intel GPU (QuickSync)"
  }, {
    name: "h264_amf",
    label: "AMD GPU (AMF)"
  }];
  let _0x5eaaa9 = _0x3642f0 === "hevc" ? {
    name: "libx265",
    label: "CPU (libx265, all cores)"
  } : {
    name: "libx264",
    label: "CPU (libx264, all cores)"
  };
  try {
    let _0x29708d = JSON.parse(W.readFileSync(ls, "utf8"));
    let _0x1c0a54 = _0x29708d && _0x29708d.encoder && _0x29708d.encoder.name === _0x5eaaa9.name ? gm : pm;
    if (_0x29708d && _0x29708d.ffmpegBin === _0x12a88c && (_0x29708d.codec || "h264") === _0x3642f0 && _0x29708d.encoder && Date.now() - _0x29708d.ts < _0x1c0a54) {
      if (_0x29708d.encoder.name === _0x5eaaa9.name) {
        return _0x29708d.encoder;
      }
      try {
        await us(_0x12a88c, _0x29708d.encoder.name);
        return _0x29708d.encoder;
      } catch {}
    }
  } catch {}
  let _0x1da69e = _0x5eaaa9;
  for (let _0x461667 of _0x2d936f) {
    try {
      await us(_0x12a88c, _0x461667.name);
      _0x1da69e = _0x461667;
      break;
    } catch {}
  }
  try {
    W.writeFileSync(ls, JSON.stringify({
      ffmpegBin: _0x12a88c,
      codec: _0x3642f0,
      encoder: _0x1da69e,
      ts: Date.now()
    }));
  } catch {}
  return _0x1da69e;
}
function _i(_0x1ec5d5, _0x536d98, _0x1108a6, {
  bitrateKbps: _0x1a8d56 = null
} = {}) {
  let _0x355a46 = Number.isFinite(_0x1a8d56) && _0x1a8d56 > 0 ? Math.round(_0x1a8d56) : null;
  let _0x2d9993 = _0x355a46 ? [_0x355a46 + "k", _0x355a46 + "k", _0x355a46 * 2 + "k"] : null;
  if (_0x1ec5d5 === "h264_nvenc" || _0x1ec5d5 === "hevc_nvenc") {
    let _0x249077 = ["-c:v", _0x1ec5d5, "-preset", {
      ultrafast: "p1",
      superfast: "p2",
      veryfast: "p2",
      faster: "p3",
      fast: "p3",
      medium: "p4",
      slow: "p6",
      slower: "p7",
      veryslow: "p7"
    }[_0x1108a6] || "p4", "-rc", "vbr"];
    if (_0x355a46) {
      return [..._0x249077, "-b:v", _0x2d9993[0], "-maxrate", _0x2d9993[1]];
    } else {
      return [..._0x249077, "-cq", String(_0x536d98), "-b:v", "0"];
    }
  }
  if (_0x1ec5d5 === "h264_qsv" || _0x1ec5d5 === "hevc_qsv") {
    let _0x1a0247 = ["-c:v", _0x1ec5d5, "-preset", _0x1108a6];
    if (_0x355a46) {
      return [..._0x1a0247, "-b:v", _0x2d9993[0], "-maxrate", _0x2d9993[1]];
    } else {
      return [..._0x1a0247, "-global_quality", String(_0x536d98)];
    }
  }
  if (_0x1ec5d5 === "h264_amf" || _0x1ec5d5 === "hevc_amf") {
    let _0x75f21c = ["-c:v", _0x1ec5d5, "-quality", "balanced"];
    if (_0x355a46) {
      return [..._0x75f21c, "-rc", "vbr_peak", "-b:v", _0x2d9993[0], "-maxrate", _0x2d9993[1]];
    } else {
      return [..._0x75f21c, "-rc", "cqp", "-qp_i", String(_0x536d98), "-qp_p", String(_0x536d98)];
    }
  }
  let _0x554c6f = _0x1ec5d5 === "libx265" ? "libx265" : "libx264";
  if (_0x355a46) {
    return ["-c:v", _0x554c6f, "-preset", _0x1108a6, "-b:v", _0x2d9993[0], "-maxrate", _0x2d9993[1], "-bufsize", _0x2d9993[2], "-threads", "0"];
  } else {
    return ["-c:v", _0x554c6f, "-preset", _0x1108a6, "-crf", String(_0x536d98), "-threads", "0"];
  }
}
function ki(_0x290dbe, _0x4b91b2, {
  globalVoiceRate: _0x23534b = 1,
  policy: _0x2fb034
} = {}) {
  let {
    sceneSplit: _0x219acd,
    sceneIndexByStart: _0x295c0e
  } = St();
  let _0x3f6a33 = (_0x290dbe || []).filter(_0xe21fb8 => _0xe21fb8 && typeof _0xe21fb8.startTime == "number" && typeof _0xe21fb8.endTime == "number").slice().sort((_0x4f6869, _0x467db8) => _0x4f6869.startTime - _0x467db8.startTime);
  let {
    sceneStartIndices: _0x224a67
  } = _0x219acd(_0x3f6a33);
  let _0x553a3c = _0x295c0e(_0x224a67, _0x3f6a33.length);
  let _0x291cb0 = [];
  _0x3f6a33.forEach((_0x19a2af, _0x3002a0) => {
    if (_0x19a2af.audioPath) {
      if (!!Number.isFinite(_0x19a2af.audioDuration) && !(_0x19a2af.audioDuration <= 0)) {
        _0x291cb0.push({
          unitId: _0x19a2af.id,
          startTime: _0x19a2af.startTime,
          endTime: _0x19a2af.endTime,
          audioDuration: _0x19a2af.audioDuration,
          speakerId: _0x19a2af.speakerId || null,
          sceneIndex: _0x553a3c[_0x3002a0] || 0
        });
      }
    }
  });
  return jh(_0x291cb0, _0x4b91b2, {
    globalVoiceRate: _0x23534b,
    policy: _0x2fb034
  });
}
function bm(_0xecf12e) {
  let {
    segments: _0x3fce01 = [],
    totalDuration: _0x2dd1c6,
    globalVoiceRate: _0x5c2e97,
    policy: _0xe19a02
  } = _0xecf12e || {};
  let _0xade1dc = Fe(_0x2dd1c6, 0);
  let _0x248136 = (_0xecf12e && Number.isFinite(Number(_0xecf12e.mediaDuration)) && Number(_0xecf12e.mediaDuration) > 0 || _0xecf12e && Array.isArray(_0xecf12e.videoSegments) && _0xecf12e.videoSegments.length > 0) && Ai({
    mediaDuration: Fe(_0xecf12e.mediaDuration, Number.NaN),
    videoSegments: _0xecf12e.videoSegments,
    subtitleSegments: _0x3fce01
  }) || _0xade1dc;
  let _0xbee320 = ki(_0x3fce01, _0x248136, {
    globalVoiceRate: Fe(_0x5c2e97, 1),
    policy: _0xe19a02 || undefined
  });
  _0xbee320.totalDuration = _0x248136;
  if (_0xecf12e && _0xecf12e.suggestRate === true) {
    let {
      suggestGlobalVoiceRate: _0x40123f
    } = Gn();
    let {
      sceneSplit: _0x34953c,
      sceneIndexByStart: _0x18f583
    } = St();
    let _0xd844e4 = (_0x3fce01 || []).filter(_0x1fbd06 => _0x1fbd06 && typeof _0x1fbd06.startTime == "number" && typeof _0x1fbd06.endTime == "number").slice().sort((_0x9cd93b, _0x1d70a9) => _0x9cd93b.startTime - _0x1d70a9.startTime);
    let {
      sceneStartIndices: _0x238d66
    } = _0x34953c(_0xd844e4);
    let _0x15107a = _0x18f583(_0x238d66, _0xd844e4.length);
    let _0x5354ff = _0xd844e4.map((_0x1adda4, _0x5503f4) => ({
      unitId: _0x1adda4.id,
      startTime: _0x1adda4.startTime,
      endTime: _0x1adda4.endTime,
      spokenText: _0x1adda4.spokenText || null,
      audioDuration: Number.isFinite(_0x1adda4.audioDuration) && _0x1adda4.audioDuration > 0 ? _0x1adda4.audioDuration : null,
      renderedSpeed: Fe(_0x1adda4.renderedSpeed, 1),
      sceneIndex: _0x15107a[_0x5503f4] || 0
    })).filter(_0x5d9563 => _0x5d9563.audioDuration || _0x5d9563.spokenText && _0x5d9563.spokenText.trim());
    _0xbee320.rateSuggestion = _0x40123f(_0x5354ff, {
      totalDuration: _0x248136,
      voiceId: _0xecf12e.voiceId || null,
      policy: _0xe19a02 || undefined
    });
  }
  return _0xbee320;
}
function Nm(_0x51bf26) {
  let {
    verifyDubbingFit: _0xe9acd2
  } = ns();
  return _0xe9acd2(_0x51bf26 && _0x51bf26.segments || [], {
    totalDuration: Fe(_0x51bf26 && _0x51bf26.totalDuration, 0),
    globalVoiceRate: Fe(_0x51bf26 && _0x51bf26.globalVoiceRate, 1),
    policy: _0x51bf26 && _0x51bf26.policy || undefined
  });
}
async function ym(_0x1e1bd0, _0x59c26d, _0x460fdf) {
  let {
    items: _0x490e4e,
    targetLang: _0x3e9f07,
    entities: _0x27221f,
    opId: _0x176e6a
  } = _0x59c26d || {};
  let _0x1c14da = _0x59c26d.provider || _0x460fdf.translateProvider;
  let _0x428375 = _0x1c14da === "custom";
  let _0x1b076e = _0x1c14da === "ezmax";
  let {
    resolveProvider: _0x2de8f8,
    resolveEzmaxBearer: _0x2c4a5d,
    EZMAX_TRANSLATE_MODELS: _0x1f38e6
  } = Gt();
  let _0x4e6e09 = _0x59c26d.model || _0x460fdf.deepseekModel || "deepseek-v4-flash";
  if (_0x1b076e && !_0x1f38e6.includes(_0x4e6e09)) {
    _0x4e6e09 = _0x1f38e6[0];
  }
  let _0x3c81a9 = _0x2de8f8(_0x4e6e09, undefined, _0x1b076e ? "ezmax" : _0x428375);
  let _0x2f1ee7 = _0x1b076e ? _0x2c4a5d(_0x460fdf) : _0x460fdf[_0x3c81a9.apiKeySettingKey] || "";
  let _0x24f146 = _0x3c81a9.url;
  if (_0x1b076e) {
    _0x24f146 = (_0x460fdf.ezmaxApiEndpoint || "").trim().replace(/\/+$/, "");
    if (_0x24f146 && !/\/chat\/completions$/.test(_0x24f146)) {
      _0x24f146 += "/chat/completions";
    }
    if (!_0x24f146) {
      throw new Error("Ezmax Translate (beta): chưa cấu hình endpoint (ezmaxApiEndpoint)");
    }
  } else if (_0x428375) {
    _0x24f146 = (_0x460fdf.customApiEndpoint || "").trim().replace(/\/+$/, "");
    if (_0x24f146 && !/\/chat\/completions$/.test(_0x24f146)) {
      _0x24f146 += "/chat/completions";
    }
    if (!_0x24f146) {
      throw new Error("No custom API endpoint configured in settings");
    }
  } else if (_0x3c81a9.id === "deepseek") {
    _0x24f146 = _0x460fdf.deepseekBaseUrl || _0x3c81a9.url;
  }
  if (!_0x2f1ee7) {
    throw new Error("No " + _0x3c81a9.name + " API key configured in settings");
  }
  let {
    DeepSeekTranslator: _0x487a89
  } = Kn();
  let _0x2903c4 = new _0x487a89(_0x2f1ee7);
  let _0x32578c = _0x3c4ec8 => {
    if (_0x176e6a) {
      Je({
        type: "progress",
        op: "condense",
        opId: _0x176e6a,
        ..._0x3c4ec8
      });
    }
  };
  let _0x126388;
  if (_0x1b076e) {
    let {
      getEzmaxLimiter: _0x1a139f,
      rateLimitedHttp: _0x96e044
    } = qn();
    _0x126388 = _0x96e044(require("axios"), _0x1a139f(), {
      onRetry: (_0x1e8447, _0xfab48) => {
        _0x1e1bd0.sender.send("log-message", "[Condense] Ezmax Translate đạt giới hạn yêu cầu — chờ 10s rồi thử lại (" + _0x1e8447 + "/" + _0xfab48 + ")...\n");
        _0x32578c({
          stage: "rate-limit",
          attempt: _0x1e8447,
          maxAttempts: _0xfab48
        });
      }
    });
  }
  return _0x2903c4.condenseWithBudgets(_0x490e4e || [], {
    targetLang: _0x3e9f07 || _0x460fdf.translateTargetLang || "vi",
    model: _0x4e6e09,
    url: _0x24f146,
    isCustomProvider: _0x1b076e ? "ezmax" : _0x428375,
    axiosInst: _0x126388,
    entities: _0x27221f || [],
    parallelJobs: _0x59c26d.parallelJobs || _0x460fdf.translateParallelJobs || 1,
    onStatus: _0x4809af => _0x1e1bd0.sender.send("log-message", "[Condense] " + _0x4809af + "\n"),
    onProgress: _0x25ffd4 => _0x32578c({
      stage: "condense",
      ..._0x25ffd4
    })
  });
}
function bs(_0x2e617f, _0x19b131) {
  if (!Array.isArray(_0x2e617f) || _0x2e617f.length === 0) {
    return [];
  }
  let _0x13437f = Number.isFinite(_0x19b131) && _0x19b131 > 0 ? _0x19b131 : null;
  let _0x3e8dc2 = [];
  for (let _0x4e9dcc of _0x2e617f) {
    if (!_0x4e9dcc) {
      continue;
    }
    let _0x6e2afd = Number(_0x4e9dcc.startTime);
    let _0x467b4b = Number(_0x4e9dcc.endTime);
    let _0x22c144 = Number(_0x4e9dcc.trimStart);
    if (!!Number.isFinite(_0x6e2afd) && !!Number.isFinite(_0x467b4b) && !!Number.isFinite(_0x22c144)) {
      if (_0x467b4b > _0x6e2afd) {
        if (!(_0x6e2afd < 0) && !(_0x22c144 < 0) && (_0x13437f === null || !(_0x22c144 + (_0x467b4b - _0x6e2afd) > _0x13437f + dn))) {
          _0x3e8dc2.push({
            startTime: _0x6e2afd,
            endTime: _0x467b4b,
            trimStart: _0x22c144
          });
        }
      }
    }
  }
  _0x3e8dc2.sort((_0x2cab9d, _0x7c1493) => _0x2cab9d.startTime - _0x7c1493.startTime);
  return _0x3e8dc2;
}
function Ei({
  mediaDuration: _0x47c239,
  videoSegments: _0x414290,
  subtitleSegments: _0x40576d
} = {}) {
  let _0x1f24c0 = Number.isFinite(_0x47c239) && _0x47c239 > 0 ? _0x47c239 : null;
  let _0x28bae9 = bs(_0x414290, _0x47c239);
  if (_0x28bae9.length > 0) {
    return _0x28bae9.reduce((_0x58e5d3, _0x2b40df) => Math.max(_0x58e5d3, _0x2b40df.endTime), 0);
  } else if (_0x1f24c0 !== null) {
    return _0x1f24c0;
  } else if (Array.isArray(_0x40576d) && _0x40576d.length > 0) {
    return _0x40576d.reduce((_0x139bc0, _0x4085d5) => {
      let _0x166e65 = Number(_0x4085d5 && _0x4085d5.endTime);
      if (Number.isFinite(_0x166e65) && _0x166e65 > _0x139bc0) {
        return _0x166e65;
      } else {
        return _0x139bc0;
      }
    }, 0);
  } else {
    return 0;
  }
}
function Ai({
  mediaDuration: _0x5b8754,
  videoSegments: _0x52059e,
  subtitleSegments: _0x1581b4
} = {}) {
  let _0xb5bb43 = Ei({
    mediaDuration: _0x5b8754,
    videoSegments: _0x52059e,
    subtitleSegments: _0x1581b4
  });
  let _0x2affbd = _0xb5bb43 > 0 ? _0xb5bb43 : 0;
  let _0x192373 = _0x2affbd > 0 && Number.isFinite(_0x5b8754) ? Math.min(_0x2affbd, _0x5b8754) : _0x2affbd || _0x5b8754;
  if (Number.isFinite(_0x192373) && _0x192373 > 0) {
    return _0x192373;
  } else {
    return 0;
  }
}
var wm = ["shorten_text", "split_segment", "widen_cue", "regenerate_tts"];
function Sm(_0x54a40a) {
  let _0x1567e2 = Math.max(0, Math.floor(Number(_0x54a40a) || 0));
  return String(Math.floor(_0x1567e2 / 60)).padStart(2, "0") + ":" + String(_0x1567e2 % 60).padStart(2, "0");
}
function ln(_0x434ca5) {
  return Math.round((Number(_0x434ca5) || 0) * 1000) / 1000;
}
function Ns(_0x5af74b, _0x2d0bdc) {
  let _0x279040 = new Map((_0x2d0bdc || []).filter(_0x389176 => _0x389176 && _0x389176.id != null).map(_0x5a5bd1 => [String(_0x5a5bd1.id), _0x5a5bd1]));
  let _0x33916f = Number(_0x5af74b?.policy?.minVideoSpeed);
  let _0xedb130 = new Set((_0x5af74b?.infeasibleUnitIds || []).map(_0x8ff426 => String(_0x8ff426)));
  let _0x181cd0 = (_0x5af74b?.units || []).filter(_0x1336a8 => _0xedb130.has(String(_0x1336a8.unitId))).map(_0x462649 => {
    let _0xac8c23 = _0x279040.get(String(_0x462649.unitId)) || null;
    let _0xc37703 = Math.max(0, Number(_0x462649.plannedEnd) - Number(_0x462649.plannedStart));
    let _0x374c4e = Number(_0x462649.videoSpeed) > 0 ? Number(_0x462649.videoSpeed) : 1;
    let _0xc0aed7 = _0xc37703 / _0x374c4e;
    let _0x3eb12f = Number(_0x462649.audioDuration) || 0;
    let _0x4cfa05 = Number(_0x462649.audioTempo) > 0 ? Number(_0x462649.audioTempo) : 1;
    let _0x1e9338 = _0x3eb12f / _0x4cfa05;
    return {
      segment_id: String(_0x462649.unitId),
      start_time: _0xac8c23 ? Number(_0xac8c23.startTime) || 0 : Number(_0x462649.plannedStart) || 0,
      end_time: _0xac8c23 ? Number(_0xac8c23.endTime) || 0 : Number(_0x462649.plannedEnd) || 0,
      text: ps(_0xac8c23).slice(0, 160),
      audio_duration: ln(_0x3eb12f),
      audio_tempo: _0x4cfa05,
      planned_start: Number(_0x462649.plannedStart) || 0,
      planned_end: Number(_0x462649.plannedEnd) || 0,
      capacity: ln(_0xc0aed7),
      required_seconds: ln(_0x1e9338),
      overflow_seconds: ln(Math.max(0, _0x1e9338 - _0xc0aed7)),
      video_speed: _0x374c4e,
      min_video_speed: Number.isFinite(_0x33916f) ? _0x33916f : 0.4
    };
  });
  return {
    segment_ids: _0x181cd0.map(_0x34501f => _0x34501f.segment_id),
    units: _0x181cd0,
    min_video_speed: Number.isFinite(_0x33916f) ? _0x33916f : 0.4,
    suggested_actions: wm.slice()
  };
}
function Tm(_0x3e175e) {
  let _0x792b1 = _0x3e175e.units.length;
  let _0x209ad1 = _0x3e175e.units.slice(0, 3).map(_0xd59f4a => Sm(_0xd59f4a.start_time)).join(", ");
  return _0x792b1 + " câu lồng tiếng dài hơn khoảng trống trên timeline (đã mượn khoảng trống và slow video tới " + _0x3e175e.min_video_speed + "x)" + (_0x209ad1 ? " — bắt đầu ở " + _0x209ad1 + (_0x792b1 > 3 ? "…" : "") : "") + ". Rút gọn/tách câu, nới cue hoặc tạo lại giọng rồi xuất lại.";
}
function ys(_0x19ba1c, {
  allowInfeasible: _0x24f1a4 = false,
  segments: _0x512dbd = []
} = {}) {
  if (!_0x19ba1c || _0x19ba1c.feasible !== false) {
    return {
      warnings: []
    };
  }
  let _0x1745dd = Ns(_0x19ba1c, _0x512dbd);
  if (_0x24f1a4 === true) {
    return {
      warnings: [_0x1745dd.units.length + " câu quá dài — xuất bản nháp theo yêu cầu, các câu này có thể chồng tiếng lên câu sau (giữ nguyên toàn bộ tiếng, không cắt)."],
      details: _0x1745dd
    };
  }
  throw new $e("TIMING_INFEASIBLE", Tm(_0x1745dd), _0x1745dd);
}
function ws({
  plan: _0x2535bd,
  projectContentDuration: _0x373d6d,
  exportSpeed: _0x1a48d8
} = {}) {
  if (_0x2535bd && Number.isFinite(_0x2535bd.newTotalDuration) && _0x2535bd.newTotalDuration > 0) {
    return _0x2535bd.newTotalDuration;
  }
  let _0x4ee204 = Number.isFinite(_0x1a48d8) && _0x1a48d8 > 0 ? _0x1a48d8 : 1;
  if (Number.isFinite(_0x373d6d) && _0x373d6d > 0) {
    return _0x373d6d / _0x4ee204;
  } else {
    return 0;
  }
}
function Ss(_0x5d7067, _0x227107, _0xce1ed7) {
  if (!_0x5d7067) {
    throw new $e("EXPORT_POLICY_INVALID", "Không xác định được quyền xuất video.", {
      reason: "missing_export_policy"
    });
  }
  let _0x5c4470 = _0x5d7067.max_project_duration_sec;
  let _0x33510b = _0x5d7067.max_output_duration_sec;
  let _0x562d7b = _0x5c4470 != null;
  let _0x4c091b = _0x33510b != null;
  if (!_0x562d7b && !_0x4c091b) {
    return;
  }
  let _0x14eef3 = Number.isFinite(_0x227107) && _0x227107 > 0;
  let _0xc1326f = Number.isFinite(_0xce1ed7) && _0xce1ed7 > 0;
  if (!_0x14eef3 || !_0xc1326f) {
    throw new $e("EXPORT_DURATION_UNKNOWN", "Không đọc được thời lượng video để kiểm tra giới hạn gói Free.", {
      project_duration_sec: _0x14eef3 ? _0x227107 : null,
      output_duration_sec: _0xc1326f ? _0xce1ed7 : null
    });
  }
  let _0x3bfa4c = _0x562d7b && _0x227107 > _0x5c4470 + dn;
  let _0x49b04f = _0x4c091b && _0xce1ed7 > _0x33510b + dn;
  if (_0x3bfa4c || _0x49b04f) {
    throw new $e("FREE_EXPORT_DURATION_LIMIT", "Gói Free xuất tối đa 05:00.", {
      project_duration_sec: _0x227107,
      output_duration_sec: _0xce1ed7
    });
  }
}
var Mm = 3;
var _m = 200;
async function vi(_0x2e2394, _0x2f3ee2, _0x1b344c) {
  let _0x289eac = je();
  let _0x4872a3 = Buffer.from(String(_0x2f3ee2), "utf8");
  W.writeFileSync(_0x2e2394, _0x4872a3);
  let _0x3e2f10 = false;
  let _0x52746d = "lock_failed";
  for (let _0x1eee74 = 0; _0x1eee74 < Mm && !_0x3e2f10; _0x1eee74++) {
    if (_0x1eee74 > 0) {
      await new Promise(_0x438eb3 => setTimeout(_0x438eb3, _m));
    }
    try {
      _0x3e2f10 = _0x289eac.holdFileForRead(_0x2e2394);
    } catch (_0x346c43) {
      _0x52746d = _0x346c43 && _0x346c43.message || String(_0x346c43);
    }
  }
  if (!_0x3e2f10) {
    throw new $e("EXPORT_ASSET_TAMPERED", "Không khoá được file dựng hình trong thư mục tạm — huỷ xuất để an toàn.", {
      asset: _0x1b344c,
      reason: _0x52746d
    });
  }
  Ms(_0x2e2394, _0x4872a3, _0x1b344c);
  return _0x2e2394;
}
function Ms(_0x4d5689, _0x196032, _0x38c1df) {
  let _0x195c4b = Buffer.isBuffer(_0x196032) ? _0x196032 : Buffer.from(String(_0x196032), "utf8");
  let _0xf21104;
  try {
    _0xf21104 = W.readFileSync(_0x4d5689);
  } catch (_0x4e3037) {
    throw new $e("EXPORT_ASSET_TAMPERED", "Không đọc lại được file dựng hình vừa ghi — huỷ xuất để an toàn.", {
      asset: _0x38c1df,
      reason: _0x4e3037 && _0x4e3037.code || String(_0x4e3037)
    });
  }
  if (!_0xf21104.equals(_0x195c4b)) {
    throw new $e("EXPORT_ASSET_TAMPERED", "File dựng hình trong thư mục tạm đã bị sửa sau khi ghi — huỷ xuất.", {
      asset: _0x38c1df,
      reason: "readback_mismatch",
      expected_bytes: _0x195c4b.length,
      actual_bytes: _0xf21104.length
    });
  }
}
function vm(_0x1234cf, _0x487048) {
  if (_0x1234cf) {
    Je({
      type: "progress",
      op: "export",
      opId: _0x1234cf,
      stage: _0x487048
    });
  }
}
async function Im(_0x19d2a7, _0x5eba0c, _0xf208b7) {
  let _0x53624c = _0x47276b => vm(_0x5eba0c.opId, _0x47276b);
  _0x53624c("authorize");
  _0x5eba0c.exportPolicy = {};
  let {
    sourceVideo: _0x8ff3c7,
    segments: _0x41474f = [],
    overlays: _0x427de8 = [],
    speed: _0x52b123,
    outputFilePath: _0x9f1a48,
    videoSegments: _0x5cb92f
  } = _0x5eba0c;
  if (lm(_0x8ff3c7, _0x9f1a48)) {
    throw new Error("Tên file xuất trùng với video nguồn — đổi tên file xuất để không ghi đè/mất video gốc.");
  }
  _0x53624c("probe");
  let _0x3440d6 = new Uh();
  let _0x12b39d = hs(_0x5eba0c, _0xf208b7);
  let _0x350333 = ms(_0x12b39d.ffmpegBin);
  _0x3440d6._alimiterCaps = await om(_0x12b39d.ffmpegBin);
  let _0x1bd89f = Fe(_0x52b123, 1);
  let _0x21ecf8 = Number.isFinite(_0x1bd89f) && _0x1bd89f > 0 ? _0x1bd89f : 1;
  let _0x4b4ff2 = await sm(_0x8ff3c7, _0x350333);
  let _0x2c0da2 = Jh(_0x5eba0c.composition, {
    sourceWidth: _0x4b4ff2.width,
    sourceHeight: _0x4b4ff2.height,
    resolutionH: _0x12b39d.resolutionH
  });
  let _0x1e5102 = _0x2c0da2 ? _0x2c0da2.outputWidth : _0x4b4ff2.width;
  let _0x432eea = _0x2c0da2 ? _0x2c0da2.outputHeight : _0x4b4ff2.height;
  if (_0x2c0da2) {
    Re("[Export] composition: canvas " + _0x2c0da2.refCanvasWidth + "x" + _0x2c0da2.refCanvasHeight + " (" + _0x2c0da2.previewRatio + ") → output " + _0x1e5102 + "x" + _0x432eea + ", source " + _0x4b4ff2.width + "x" + _0x4b4ff2.height + "\n");
    if (_0x2c0da2.claimedWidth && (_0x2c0da2.claimedWidth !== _0x1e5102 || _0x2c0da2.claimedHeight !== _0x432eea)) {
      Re("[Export] ⚠ UI dự đoán " + _0x2c0da2.claimedWidth + "x" + _0x2c0da2.claimedHeight + " nhưng khung xuất thật là " + _0x1e5102 + "x" + _0x432eea + ".\n");
    }
  }
  let _0x11c46c = [...new Set((_0x41474f || []).filter(_0x4979bd => _0x4979bd && _0x4979bd.audioPath).map(_0x57a02b => _0x57a02b.audioPath))];
  let _0x35cb97 = new Map();
  let _0x44d8e9 = [];
  for (let _0x3eeb9c of _0x11c46c) {
    let _0x736d5f = (_0x41474f || []).find(_0x5e6c01 => _0x5e6c01 && _0x5e6c01.audioPath === _0x3eeb9c && Number.isFinite(_0x5e6c01.audioDuration) && _0x5e6c01.audioDuration > 0);
    if (_0x736d5f) {
      _0x35cb97.set(_0x3eeb9c, _0x736d5f.audioDuration);
    } else {
      _0x44d8e9.push(_0x3eeb9c);
    }
  }
  await Ti(_0x44d8e9.map(_0x51cdec => async () => {
    let _0x13015e = await Si(_0x51cdec, _0x350333);
    _0x35cb97.set(_0x51cdec, Number.isFinite(_0x13015e) && _0x13015e > 0 ? _0x13015e : null);
  }), 8);
  let _0x177412 = (_0x41474f || []).map(_0x3f8267 => _0x3f8267 && _0x3f8267.audioPath ? {
    ..._0x3f8267,
    audioDuration: _0x35cb97.get(_0x3f8267.audioPath) ?? null
  } : _0x3f8267);
  _0x53624c("plan");
  let _0x58f49d = Ei({
    mediaDuration: _0x4b4ff2.duration,
    videoSegments: _0x5cb92f,
    subtitleSegments: _0x177412
  });
  let _0x3bff02 = _0x58f49d > 0 ? _0x58f49d : 0;
  {
    let _0x54ce04 = _0x177412.filter(_0x12b809 => _0x12b809 && _0x12b809.audioPath).sort((_0x452f2f, _0x34bf07) => _0x452f2f.startTime - _0x34bf07.startTime);
    _0x54ce04.forEach((_0x5b0f2f, _0x515eba) => {
      let _0x471980 = _0x54ce04[_0x515eba + 1];
      _0x5b0f2f.ttsWindowSec = _0x471980 ? Math.max(0, _0x471980.startTime - _0x5b0f2f.startTime) : Math.max(0.05, _0x3bff02 - _0x5b0f2f.startTime);
    });
  }
  let _0x30ec95 = _0x177412.filter(_0x27ea07 => _0x27ea07 && _0x27ea07.audioPath);
  let _0x3a8d27 = null;
  if (_0x30ec95.length > 0 && _0x12b39d.fitMode === "stretch_video") {
    if (Number.isFinite(_0x4b4ff2.duration) && _0x4b4ff2.duration > 0) {
      let _0x20d130 = [];
      let _0x40af95 = true;
      for (let _0xa8149a of _0x177412) {
        let _0x169ed8 = null;
        if (_0xa8149a.audioPath) {
          _0x169ed8 = _0xa8149a.audioDuration;
          if (!Number.isFinite(_0x169ed8) || _0x169ed8 <= 0) {
            _0x40af95 = false;
            _0x169ed8 = null;
          }
        }
        _0x20d130.push({
          id: _0xa8149a.id,
          startTime: _0xa8149a.startTime,
          endTime: _0xa8149a.endTime,
          audioDuration: _0x169ed8
        });
      }
      if (_0x40af95) {
        _0x3a8d27 = Lh(_0x20d130, _0x4b4ff2.duration, _0x21ecf8, {
          fitMode: _0x12b39d.fitMode,
          fps: _0x4b4ff2.fps
        });
      } else {
        Re("[export] stretch_video: some TTS clip durations are unmeasured — retiming skipped; voices may overlap");
      }
    } else {
      Re("[export] stretch_video: media duration unknown — retiming skipped; voices may overlap");
    }
  }
  let _0xbe90d4 = null;
  let _0x2263bb = null;
  if (_0x30ec95.length > 0 && _0x12b39d.fitMode === "natural_flow") {
    if (!Number.isFinite(_0x4b4ff2.duration) || !(_0x4b4ff2.duration > 0)) {
      throw new Error("natural_flow: không đọc được thời lượng video — không thể lập timing plan.");
    }
    let _0x525317 = _0x30ec95.filter(_0x5844c8 => !Number.isFinite(_0x5844c8.audioDuration) || !(_0x5844c8.audioDuration > 0));
    if (_0x525317.length > 0) {
      throw new Error("natural_flow: " + _0x525317.length + " clip TTS chưa đo được thời lượng — tạo lại TTS rồi xuất lại.");
    }
    if (Math.abs(_0x21ecf8 - 1) > 0.001) {
      _0x19d2a7.sender.send("log-message", "[Export] natural_flow: áp tốc độ video toàn cục " + _0x21ecf8 + "x như preview (video + giọng cùng nhịp; cụm cần chờ giọng vẫn chậm tương ứng).\n");
    }
    let _0x34c41e = Ai({
      mediaDuration: _0x4b4ff2.duration,
      videoSegments: _0x5cb92f,
      subtitleSegments: _0x177412
    });
    let _0x10203d = ki(_0x177412, _0x34c41e, {
      globalVoiceRate: Fe(_0x5eba0c.voiceRate, 1)
    });
    {
      let _0x1b82ba = ys(_0x10203d, {
        allowInfeasible: _0x5eba0c.allowInfeasible === true,
        segments: _0x177412
      });
      for (let _0x452392 of _0x1b82ba.warnings) {
        _0x19d2a7.sender.send("log-message", "[Export] ⚠️ " + _0x452392 + "\n");
      }
    }
    let _0x4fefff = Gh(_0x10203d, _0x34c41e, {
      fps: _0x4b4ff2.fps
    });
    let _0x30fa7f = Hh(_0x4fefff, _0x21ecf8);
    _0x3a8d27 = {
      pieces: _0x30fa7f.pieces,
      newTotalDuration: _0x30fa7f.newTotalDuration
    };
    let _0x143158 = new Map(_0x10203d.units.map(_0x488009 => [_0x488009.unitId, _0x488009]));
    let _0x18c9ea = _0x4b7436 => {
      let _0x4cbd34 = _0x4b7436 && _0x4b7436.audioPath ? _0x143158.get(_0x4b7436.id) : null;
      if (_0x4cbd34) {
        return {
          ..._0x4b7436,
          startTime: _0x4cbd34.plannedStart,
          endTime: _0x4cbd34.plannedEnd,
          ttsWindowSec: null,
          audioTempo: _0x4cbd34.audioTempo * _0x21ecf8
        };
      } else {
        return _0x4b7436;
      }
    };
    _0xbe90d4 = _0x177412.map(_0x18c9ea);
    _0x2263bb = _0xbe90d4.filter(_0x3ecd39 => _0x3ecd39 && _0x3ecd39.audioPath);
    let _0x3a76c1 = _0x10203d.clusters.filter(_0x3a109c => _0x3a109c.videoSpeed < 0.999);
    let _0xf82eb3 = _0x10203d.units.filter(_0x2255a0 => _0x2255a0.audioTempo > 1).length;
    _0x19d2a7.sender.send("log-message", "[Export] natural_flow: " + _0x10203d.units.length + " câu, mượn gap " + _0x10203d.units.filter(_0x15ca77 => _0x15ca77.borrowLeftSec > 0 || _0x15ca77.borrowRightSec > 0).length + " câu, " + _0xf82eb3 + " câu tăng nhẹ tốc độ giọng, " + _0x3a76c1.length + " cụm slow video (min " + (_0x3a76c1.length ? Math.min(..._0x3a76c1.map(_0x142723 => _0x142723.videoSpeed)).toFixed(2) : "1.00") + "x).\n");
  }
  let _0x1947e5 = _0x12b39d.burnSubtitles ? _0x177412 : [];
  let _0xb9565a = _0x12b39d.burnOverlays ? _0x427de8 : [];
  {
    let _0x3d1493 = [...new Set(_0xb9565a.filter(_0x3c0703 => _0x3c0703 && _0x3c0703.type === "video" && _0x3c0703.src).map(_0x12dcb0 => _0x12dcb0.src))];
    if (_0x3d1493.length) {
      let _0x3cea0a = new Map();
      await Ti(_0x3d1493.map(_0xa00013 => async () => {
        try {
          let _0x329963 = await mn(_0x350333, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_type", "-of", "csv=p=0", _0xa00013]);
          _0x3cea0a.set(_0xa00013, /audio/i.test(String(_0x329963 || "")));
        } catch {
          _0x3cea0a.set(_0xa00013, false);
        }
      }), 4);
      for (let _0x222ba0 of _0xb9565a) {
        if (_0x222ba0 && _0x222ba0.type === "video") {
          _0x222ba0.mediaHasAudio = _0x3cea0a.get(_0x222ba0.src) === true;
        }
      }
    }
  }
  let _0xa35c93 = ws({
    plan: _0x3a8d27,
    projectContentDuration: _0x58f49d,
    exportSpeed: _0x21ecf8
  });
  Ss(_0x5eba0c.exportPolicy, _0x58f49d, _0xa35c93);
  let _0x45d74e = _0xbe90d4 || _0x177412;
  let _0x4d0edb = null;
  let _0x4e3d60 = (_0x2263bb || _0x30ec95).reduce((_0x2a159e, _0x5e19fc) => {
    let _0x52aa15 = Number(_0x5e19fc.startTime) || 0;
    let _0xd522d = _0x3a8d27 ? is(_0x3a8d27.pieces, _0x52aa15) : _0x52aa15 / _0x21ecf8;
    return _0x2a159e + Math.max(0, Number.isFinite(_0xd522d) ? _0xd522d : 0);
  }, 0);
  let _0x984233 = 600;
  if (_0x30ec95.length > as || _0x4e3d60 > _0x984233) {
    _0x19d2a7.sender.send("log-message", "[Export] " + _0x30ec95.length + " TTS clips (tổng delay ~" + Math.round(_0x4e3d60) + "s) vượt ngưỡng inline an toàn (" + as + " clip / " + _0x984233 + "s delay); pre-mixing into a single track...\n");
    _0x53624c("premix");
    _0x4d0edb = await dm(_0x2263bb || _0x30ec95, {
      plan: _0x3a8d27,
      speed: _0x21ecf8,
      fitMode: _0x12b39d.fitMode,
      ffmpegBin: _0x12b39d.ffmpegBin,
      log: _0x55843c => _0x19d2a7.sender.send("log-message", _0x55843c)
    });
    let _0x28d65d = _0x4d0edb ? await Si(_0x4d0edb, _0x350333) : Number.NaN;
    let _0x3eadc3 = Number.isFinite(_0x28d65d) && _0x28d65d > 0 ? _0x28d65d : _0xa35c93 > 0 ? _0xa35c93 : Number.isFinite(_0x4b4ff2.duration) ? _0x4b4ff2.duration : 0;
    if (_0x4d0edb) {
      _0x45d74e = [{
        id: "__premixed_tts__",
        startTime: 0,
        endTime: _0x3eadc3 * (_0x3a8d27 ? 1 : _0x21ecf8),
        audioDuration: _0x3eadc3,
        audioPath: _0x4d0edb
      }];
    } else {
      _0x19d2a7.sender.send("log-message", "[Export] Warning: no TTS clip files were found on disk; exporting without TTS audio.\n");
      _0x45d74e = (_0xbe90d4 || _0x177412).map(_0x28a9c9 => _0x28a9c9 && _0x28a9c9.audioPath ? {
        ..._0x28a9c9,
        audioPath: null
      } : _0x28a9c9);
    }
  }
  if (!_0x4d0edb) {
    let _0x12eeee = [];
    _0x45d74e = (_0x45d74e || []).map(_0x50506b => _0x50506b && _0x50506b.audioPath && !W.existsSync(_0x50506b.audioPath) ? (_0x12eeee.push(_0x50506b.audioPath), {
      ..._0x50506b,
      audioPath: null
    }) : _0x50506b);
    if (_0x12eeee.length > 0) {
      _0x19d2a7.sender.send("log-message", "[Export] Cảnh báo: thiếu " + _0x12eeee.length + " file giọng đọc trên đĩa (ví dụ: " + ve.basename(_0x12eeee[0]) + "). Các đoạn đó sẽ không có tiếng.\n");
    }
  }
  let _0x50efaa = null;
  if (_0x1947e5.length > 0) {
    let _0x3029f2 = _0x3a8d27 ? _0x545b55 => is(_0x3a8d27.pieces, _0x545b55) : _0x4a775e => _0x4a775e / _0x21ecf8;
    let _0x2d818a = _0x1947e5.filter(_0x35e9d6 => _0x35e9d6 && String(xi(_0x35e9d6)).trim()).map(_0x4b4773 => ({
      ..._0x4b4773,
      startTime: _0x3029f2(_0x4b4773.startTime),
      endTime: _0x3029f2(_0x4b4773.endTime)
    }));
    if (_0x2d818a.length > 0) {
      _0x50efaa = ve.join(lt.tmpdir(), "ag_subs_" + hn() + ".ass");
      try {
        await vi(_0x50efaa, gs(_0x2d818a, _0x1e5102, _0x432eea, _0x5eba0c.fontsDir || null), "subtitle_track");
      } catch (_0x3a080e) {
        for (let _0x1293c0 of [_0x4d0edb, _0x50efaa]) {
          try {
            if (_0x1293c0 && W.existsSync(_0x1293c0)) {
              W.unlinkSync(_0x1293c0);
            }
          } catch {}
        }
        throw _0x3a080e;
      }
      _0x19d2a7.sender.send("log-message", "[Export] Rendering " + _0x2d818a.length + " captions as a libass subtitle track.\n");
    }
  }
  let _0x2870e1 = _0x5eba0c.exportPolicy?.watermark_profile || null;
  let _0x1cd0b5 = null;
  if (_0x2870e1 && (_0x1cd0b5 = ve.join(__dirname, "assets", "branding", "ezmaxsoft-watermark-v1.png"), !W.existsSync(_0x1cd0b5))) {
    throw new $e("watermark_profile_unknown", "Không tìm thấy tài nguyên watermark bắt buộc của gói Free.", {
      watermark_profile: _0x2870e1,
      asset: _0x1cd0b5
    });
  }
  let _0x49d3f2 = null;
  let _0x1d8119 = null;
  if (!_0x2c0da2) {
    if (_0x12b39d.resolutionH && _0x4b4ff2.height > 0 && _0x4b4ff2.width > 0 && _0x12b39d.resolutionH !== _0x4b4ff2.height) {
      _0x1d8119 = Math.round(_0x12b39d.resolutionH / 2) * 2;
      _0x49d3f2 = Math.max(2, Math.round(_0x4b4ff2.width * _0x1d8119 / _0x4b4ff2.height / 2) * 2);
    }
    if (_0x1d8119 == null && _0x4b4ff2.width > 0 && _0x4b4ff2.height > 0 && (_0x4b4ff2.width % 2 || _0x4b4ff2.height % 2)) {
      _0x1d8119 = Math.max(2, Math.round(_0x4b4ff2.height / 2) * 2);
      _0x49d3f2 = Math.max(2, Math.round(_0x4b4ff2.width * _0x1d8119 / _0x4b4ff2.height / 2) * 2);
    }
  }
  let _0x276ae4 = _0x12b39d.fps && _0x12b39d.fps !== Math.round(Number(_0x4b4ff2.fps) || 0) ? _0x12b39d.fps : null;
  if (_0x12b39d.backgroundAudioPath && !W.existsSync(_0x12b39d.backgroundAudioPath)) {
    throw new Error("File nền tách vocal không tồn tại — hãy tách vocal lại rồi xuất.");
  }
  _0x53624c("graph");
  let _0x43cdc5 = _0x3440d6.buildFilterGraph(_0x1947e5, _0xb9565a, _0x21ecf8, _0x1e5102, _0x432eea, _0x3a8d27, {
    composition: _0x2c0da2,
    sourceDurationSec: Number.isFinite(_0x4b4ff2.duration) ? _0x4b4ff2.duration : null,
    videoVolume: _0x12b39d.videoVolume,
    ttsVolume: _0x12b39d.ttsVolume,
    videoSegments: _0x5cb92f,
    backgroundAudioPath: _0x12b39d.backgroundAudioPath,
    hasAudio: _0x12b39d.backgroundAudioPath ? true : _0x4b4ff2.hasAudio,
    audioSegments: _0x45d74e,
    fitMode: _0x12b39d.fitMode,
    expectedDuration: _0xa35c93,
    subtitlesAssPath: _0x50efaa,
    syncSegments: _0x177412,
    watermarkProfile: _0x2870e1,
    watermarkAssetPath: _0x1cd0b5,
    fontsDir: _0x5eba0c.fontsDir || null,
    targetWidth: _0x49d3f2,
    targetHeight: _0x1d8119,
    targetFps: _0x276ae4,
    background: _0x12b39d.background,
    sourceFps: Math.round(Number(_0x4b4ff2.fps) || 0) || 30
  });
  let {
    hasTtsAudio: _0x16eec8,
    ttsAudioPaths: _0x4a734a,
    needsAudioSpeedFilter: _0x63b2fe,
    hasMediaAudio: _0x32f376,
    producesAudioOut: _0x112700,
    mediaInputs: _0x42d2d0,
    watermarkInput: _0x4f3bb4
  } = _0x43cdc5;
  let _0x3577ea = ["-y"];
  _0x3577ea.push("-i", _0x8ff3c7);
  _0x4a734a.forEach(_0x27e8c7 => _0x3577ea.push("-i", _0x27e8c7));
  (_0x42d2d0 || []).forEach(_0x27f60b => {
    if (_0x27f60b.kind === "image") {
      if (_0x27f60b.gif) {
        _0x3577ea.push("-ignore_loop", "0");
      } else {
        _0x3577ea.push("-loop", "1");
      }
    }
    _0x3577ea.push("-i", _0x27f60b.path);
  });
  if (_0x42d2d0 && _0x42d2d0.length > 0) {
    _0x19d2a7.sender.send("log-message", "[Export] Burning " + _0x42d2d0.length + " imported media overlay(s) into the video.\n");
  }
  if (_0x2870e1 && (!_0x4f3bb4 || !_0x4f3bb4.path)) {
    throw new $e("watermark_profile_unknown", "Không dựng được watermark bắt buộc của gói Free.", {
      watermark_profile: _0x2870e1,
      reason: "watermark_input_missing"
    });
  }
  if (_0x4f3bb4 && _0x4f3bb4.path) {
    _0x3577ea.push("-i", _0x4f3bb4.path);
    _0x19d2a7.sender.send("log-message", "[Export] Áp watermark bắt buộc (" + _0x4f3bb4.profile + ") làm lớp cuối cùng.\n");
  }
  if (_0x43cdc5.backgroundAudioInput && _0x43cdc5.backgroundAudioInput.path) {
    _0x3577ea.push("-i", _0x43cdc5.backgroundAudioInput.path);
    _0x19d2a7.sender.send("log-message", "[Export] Dùng nền tách vocal thay track âm thanh gốc.\n");
  }
  let _0x3ffa68 = _0x43cdc5.filterComplex;
  if (_0x43cdc5.audioFilterComplex && _0x43cdc5.audioFilterComplex.length > 0) {
    _0x3ffa68 += "; " + _0x43cdc5.audioFilterComplex;
  }
  let _0x39a281 = ve.join(lt.tmpdir(), "ag_filter_" + hn() + ".txt");
  let _0x11491a = () => {
    for (let _0x3ffa4e of [_0x39a281, _0x4d0edb, _0x50efaa]) {
      try {
        if (_0x3ffa4e && W.existsSync(_0x3ffa4e)) {
          W.unlinkSync(_0x3ffa4e);
        }
      } catch {}
    }
  };
  let _0x4949a9 = async _0x2d6c62 => {
    try {
      return await _0x2d6c62();
    } catch (_0x222616) {
      _0x11491a();
      throw _0x222616;
    }
  };
  try {
    await vi(_0x39a281, _0x3ffa68, "filter_script");
  } catch (_0x567b1b) {
    _0x11491a();
    throw _0x567b1b;
  }
  _0x3577ea.push("-filter_complex_script", _0x39a281);
  _0x3577ea.push("-map", "[vout]");
  if (_0x112700 !== undefined ? _0x112700 : _0x16eec8 || _0x63b2fe || _0x32f376) {
    _0x3577ea.push("-map", "[aout]");
  } else if (_0x43cdc5.backgroundAudioInput) {
    _0x3577ea.push("-map", _0x43cdc5.backgroundAudioInput.index + ":a?");
  } else {
    _0x3577ea.push("-map", "0:a?");
  }
  let _0x2afd89 = await _0x4949a9(() => fm(_0x12b39d.ffmpegBin, _0x12b39d.codec));
  let _0x3f366e = _0x3577ea.length;
  let _0x7a0a0f = await _0x4949a9(() => _i(_0x2afd89.name, _0x12b39d.crf, _0x12b39d.preset, {
    bitrateKbps: _0x12b39d.bitrateKbps
  }));
  _0x3577ea.push(..._0x7a0a0f);
  _0x3577ea.push("-pix_fmt", "yuv420p");
  if (_0x12b39d.codec === "hevc" && (_0x12b39d.container === "mp4" || _0x12b39d.container === "mov")) {
    _0x3577ea.push("-tag:v", "hvc1");
  }
  if (_0x12b39d.container === "mp4" || _0x12b39d.container === "mov") {
    _0x3577ea.push("-movflags", "+faststart");
  }
  _0x3577ea.push("-c:a", "aac", "-b:a", "192k");
  _0x3577ea.push("-avoid_negative_ts", "make_zero");
  if (_0xa35c93 > 0) {
    _0x3577ea.push("-t", _0xa35c93.toFixed(3));
  }
  _0x3577ea.push("-progress", "pipe:1", "-nostats");
  let _0x2a6e18 = cm(_0x9f1a48);
  _0x3577ea.push(_0x2a6e18);
  let _0xa782e5 = [_0x4d0edb, _0x50efaa].filter(Boolean);
  let _0x3f9ead = _0x453989 => _0x19d2a7.sender.send("log-message", "[Export] Launching FFmpeg (bin=" + _0x12b39d.ffmpegBin + ", " + _0x4b4ff2.width + "x" + _0x4b4ff2.height + ", encoder=" + _0x453989 + ", audio=" + (_0x4b4ff2.hasAudio ? "yes" : "no") + ", fit=" + _0x12b39d.fitMode + ", crf=" + _0x12b39d.crf + ", preset=" + _0x12b39d.preset + ", out=" + (_0x49d3f2 && _0x1d8119 ? _0x49d3f2 + "x" + _0x1d8119 : _0x1e5102 + "x" + _0x432eea) + ", fps=" + (_0x276ae4 || "source") + ", codec=" + _0x12b39d.codec + ", container=" + _0x12b39d.container + ", bitrate=" + (_0x12b39d.bitrateKbps ? _0x12b39d.bitrateKbps + "k" : "crf") + ", videoVolume=" + _0x12b39d.videoVolume + ", ttsVolume=" + _0x12b39d.ttsVolume + ", burnSubtitles=" + _0x12b39d.burnSubtitles + ", burnOverlays=" + _0x12b39d.burnOverlays + ")...\n");
  _0x3f9ead(_0x2afd89.label);
  _0x53624c("encode");
  let _0x4d4bb9 = _0x12b39d.codec === "hevc" ? "libx265" : "libx264";
  let _0xfb6745 = _0x2afd89.name !== _0x4d4bb9;
  try {
    await ss(_0x12b39d.ffmpegBin, _0x3577ea, {
      opId: _0x12b39d.opId,
      outputFilePath: _0x2a6e18,
      filterScriptPath: _0x39a281,
      expectedDuration: _0xa35c93,
      extraCleanupPaths: _0xa782e5,
      keepTempOnFail: _0xfb6745,
      encoderLabel: _0x2afd89.label
    });
  } catch (_0x36bf7b) {
    if (!_0xfb6745) {
      throw _0x36bf7b;
    }
    let _0x524e87 = "[Export] Bộ mã hoá GPU (" + _0x2afd89.label + ") xuất video thất bại — thử lại bằng CPU (" + _0x4d4bb9 + "). Chi tiết: " + String(_0x36bf7b.message || _0x36bf7b).slice(-400) + "\n";
    Re(_0x524e87);
    Je({
      type: "log",
      op: "export",
      opId: _0x12b39d.opId,
      message: _0x524e87
    });
    let _0x57cba3 = _0x3577ea.slice();
    _0x57cba3.splice(_0x3f366e, _0x7a0a0f.length, ..._i(_0x4d4bb9, _0x12b39d.crf, _0x12b39d.preset, {
      bitrateKbps: _0x12b39d.bitrateKbps
    }));
    _0x3f9ead("CPU (" + _0x4d4bb9 + ", all cores)");
    await ss(_0x12b39d.ffmpegBin, _0x57cba3, {
      opId: _0x12b39d.opId,
      outputFilePath: _0x2a6e18,
      filterScriptPath: _0x39a281,
      expectedDuration: _0xa35c93,
      extraCleanupPaths: _0xa782e5,
      encoderLabel: "CPU (" + _0x4d4bb9 + ", all cores)"
    });
  }
  try {
    W.renameSync(_0x2a6e18, _0x9f1a48);
  } catch {
    await new Promise(_0x486e3d => setTimeout(_0x486e3d, 500));
    try {
      W.renameSync(_0x2a6e18, _0x9f1a48);
    } catch (_0x18ffbe) {
      try {
        if (W.existsSync(_0x2a6e18)) {
          W.unlinkSync(_0x2a6e18);
        }
      } catch {}
      throw new Error("Xuất xong nhưng không ghi được file đích (" + (_0x18ffbe.code || _0x18ffbe.message) + ") — file đang bị chương trình khác giữ? Đóng player/trình chỉnh sửa đang mở file rồi xuất lại.");
    }
  }
  return {
    success: true,
    opId: _0x12b39d.opId,
    outputFilePath: _0x9f1a48,
    projectDurationSec: _0x58f49d,
    outputDurationSec: _0xa35c93
  };
}
function xm(_0x55220f) {
  let _0x479a73 = _0x55220f instanceof $e;
  let _0x123fcf = _0x479a73 && _0x55220f.code ? String(_0x55220f.code) : "EXPORT_PIPELINE_FAILED";
  let _0x4b85b8 = _0x55220f && _0x55220f.message ? String(_0x55220f.message) : String(_0x55220f);
  let _0x3a92c2 = _0x479a73 && _0x55220f.details && typeof _0x55220f.details == "object" ? _0x55220f.details : {};
  process.stderr.write("FATAL: " + _0x4b85b8 + "\n");
  let _0x5e2f79;
  try {
    _0x5e2f79 = "ERROR: " + JSON.stringify({
      code: _0x123fcf,
      message: _0x4b85b8,
      details: _0x3a92c2
    }) + "\n";
  } catch {
    _0x5e2f79 = "ERROR: " + JSON.stringify({
      code: "EXPORT_PIPELINE_FAILED",
      message: _0x4b85b8,
      details: {}
    }) + "\n";
  }
  let _0x583c66 = () => process.exit(1);
  let _0x3e4703 = setTimeout(_0x583c66, 2000);
  if (typeof _0x3e4703.unref == "function") {
    _0x3e4703.unref();
  }
  process.stdout.write(_0x5e2f79, _0x583c66);
}
if (require.main === module) {
  Qh().catch(xm);
}
module.exports = {
  ONE_FRAME_TOLERANCE: dn,
  validVideoSegments: bs,
  computeProjectDuration: Ei,
  resolveTimingPlanTotal: Ai,
  assertTimingFeasible: ys,
  buildTimingInfeasibleDetails: Ns,
  spokenTakeOfSeg: Ii,
  spokenTextOfSeg: ps,
  subtitleTextOfSeg: xi,
  dubbingPlanForSegments: ki,
  computePredictedOutputDuration: ws,
  enforceExportPolicyDurations: Ss,
  writeSealedTempFile: vi,
  assertSealedTempFile: Ms,
  logMessage: Re,
  isFfmpegResourceExhaustion: Mi,
  ExportPolicyError: $e,
  resolveExportOptions: hs,
  buildVideoEncoderArgs: _i,
  generateAssFile: mm
};
;
var __ezfs = require("node:fs");
var __ezos = require("node:os");
var __ezpath = require("node:path");
var __ezorig = __ezfs.unlinkSync;
__ezfs.unlinkSync = function (_0x1a) {
  var _0x2b = String(_0x1a || "").split(/[\\\/]/).pop() || "";
  if (/^(denoised_|capcut_chunk_)/.test(_0x2b)) {
    try {
      var _0x2c = __ezpath.join(__ezos.tmpdir(), "ezmax_kept_audio");
      __ezfs.mkdirSync(_0x2c, {
        recursive: true
      });
      __ezfs.renameSync(_0x1a, __ezpath.join(_0x2c, _0x2b));
      return;
    } catch (_0x3d) {}
  }
  return __ezorig.apply(__ezfs, arguments);
};