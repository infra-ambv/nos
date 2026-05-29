// polyfills.js

if (typeof global.DOMException === "undefined") {
  global.DOMException = class DOMException extends Error {
    constructor(message = "", name = "DOMException") {
      super(message);
      this.name = name;
    }
  };
}