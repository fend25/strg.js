var localstore = {
  s: window.localStorage,
  type: 'localStorage',
  set: function(key, val) {
    this.s.setItem(key, JSON.stringify(val));
    return val;
  },
  get: function(key) {
    var value = this.s.getItem(key);
    if (typeof value != 'string') { return undefined }
    try { return JSON.parse(value) }
    catch(e) { return value || undefined }
  },
  remove: function(key) { this.s.removeItem(key) },
  removeAll: function() { this.s.clear() },
  getAll: function() {
    var ret = {};
    for (var i=0; i<this.s.length; i++) {
      var key = this.s.key(i);
      ret[key] = this.get(key);
    }
    return ret;
  }
};
var sessionstore = {
  s: window.sessionStorage,
  type: 'sessionStorage',
  set: localstore.set,
  get: localstore.get,
  remove: localstore.remove,
  removeAll: localstore.removeAll,
  getAll: localstore.getAll
};
var cookiestore = {
  s: document.cookie,
  type: 'cookie',
  set: function (name, value, expires, path, secure) {
    if (value !== undefined && typeof(value) === "object") var valueToUse = JSON.stringify(value);
    else var valueToUse = encodeURIComponent(value);

    document.cookie = name + "=" + valueToUse +
      (expires ? ("; expires=" + new Date(expires).toUTCString()) : '') +
      "; path=" + (path || '/') +
      (secure ? "; secure" : '');
  },
  get: function (name) {
    var cookies = this.getAllRawOrProcessed(false);
    if (cookies.hasOwnProperty(name)) return this.processValue(cookies[name]);
    else return undefined;
  },
  processValue: function(value) {
    if (value.substring(0, 1) == "{") {
      try { return JSON.parse(value);}
      catch(e) {return value;}
    }
    if (value == "undefined") return undefined;
    return decodeURIComponent(value);
  },
  getAllRawOrProcessed: function(process) {
    //process - process value or return raw value
    var cookies = document.cookie.split('; '), s = {};
    if (cookies.length === 1 && cookies[0] === '') return s;
    for (var i = 0 ; i < cookies.length; i++) {
      var cookie = cookies[i].split('=');
      if (process) s[cookie[0]] = this.processValue(cookie[1]);
      else s[cookie[0]] = cookie[1];
    }
    return s;
  },
  getAll: function() {
    return this.getAllRawOrProcessed(true);
  },
  remove: function (name) {
    this.set(name, "", -1);
  },
  removeAll: function() {
    var cookies = this.getAll();
    for (var i in cookies) {
      this.remove(i);
    }
    return this.getAll();
  }
};
if (typeof Storage !== "undefined") window.store = localstore; else window.store = cookiestore;