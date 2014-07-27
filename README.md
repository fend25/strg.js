### strg.js
Simple localStorage, sessionStorage and cookie operating library with the single API.
#### Getting started
Just download file and include it in your HTML document: `<script src="strg.min.js"></script>`<br>
You can use any set of localStorage, sessionStorage or cookie wrappers, all files are in the `/only` folder.
Also, if you use one of modern browsers which support localStorage, the easiest way is to use just localStorage wrapper, **or simply copy it to one of your JS files. It takes only [25 lines and contains ready and useful code.](https://github.com/fend25/strg.js/blob/master/only/localstore.js)** You can remove some functions from `localstore` object if you don't need them, or add some. Use, code and enjoy!
#### API
So, the `strg.js` containts three objects with single API:<br>
`localstore` - localStorage wrapper<br>
`sessionstore` - sessionStorage wrapper<br>
`cookielstore` - cookie wrapper<br>
and the fourth object `store`, that use localStorage if it's supported or cookies otherwise.

Each of them has 5 functions:<br>
`set(key, value)`: sets key-value pair. JSON is supported in values<br>
`get(key)`: returns just value for the key. returns `undefined` if no value found<br>
`getAll()`: returns object with all key-value pairs. JSON is parsed. returns `{}` on empty store<br>
`remove(key)`: removes key. returns `undefined`<br>
`removeAll()`: remove all key-value pairs, returns `undefined`<br>

In case of `cookiestore`, function `set` takes five params: key, value, expires, path, secure<br>
`expires`: Date, number or string, that can be used in `Date` constructor<br>
`path`: string, path for cookie<br>
`secure`: bool, secure flag for cookie<br>
Also, all objects contains two additional fields:<br>
`s`: storage object or document.cookie, for example: `window.localStorage`<br>
`type`: string, storage type, for example `'localStorage'`
#### Examples
```javascript
store.set('a', 1); // 1
store.set('b', {c: [1, '2', {d: 3}]})); // {"c":[1,"2",{"d":3}]}
store.getAll(); // {"a":1,"b":{"c":[1,"2",{"d":3}]}}
store.set('c', 'some string'); // "some string"
store.remove('b'); // undefined
store.getAll(); // {"a":1,"c":"some string"}
store.removeAll(); // undefined
store.getAll(); // {}
```
#### Tests
`/test/test.html`
Tests are made with simple and useful framework - [Angular Light](http://angularlight.org/). Even if you don't need this right now, just take a look - it worths it. Actually it is Angular in JS-way: no factories, services and so on. Just write less, do more, have fun and forget about jQuery with very simple and clear code.
#### License
MIT
