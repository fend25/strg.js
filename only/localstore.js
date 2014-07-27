var localstore = {
  s: window.localStorage,
  type: 'localStorage',
  set: function(key, val) {
    if (val === undefined) { return store.remove(key) }
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