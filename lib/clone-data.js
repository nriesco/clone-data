const ObjectID = require('mongodb').ObjectID;

let encode = function (newKey) {
  if (newKey.includes('.') || newKey.includes('$')) {
    newKey = newKey.replace(/\./g, '[dot]');
    newKey = newKey.replace(/\$/g, '[$]');
  }
  return newKey;
};

let decode = function (newKey) {
  if (newKey.includes('[$') || newKey.includes('[dot]')) {
    newKey = newKey.replace(/\[\$.*\]/g, '$');
    newKey = newKey.replace(/\[dot\]/g, '.');
  }
  return newKey;
};

/**
 * Clones meta object and cleans it from circular references, replacing them
 * with string '[Circular]' and fixes field names to be storable within
 * MongoDB
 * @param {Object} node Current object or its leaf
 * @param {Array=} optParents Object's parents
 */
let clone = function (node, optParents) {
  if (!(node instanceof Object) || (node instanceof ObjectID) || (node instanceof Buffer)) {
    return node;
  }
  let copy = Array.isArray(node) ? [] : {}; // copy will be an empty array or an empty object
  if (node instanceof Date) { // @todo verify mongodb dates
    return new Date(node.getTime());
  } else if (node instanceof Error) {
    // This is needed because Error's message, name and stack isn't accessible when cycling through properties
    let { message, name, stack } = node;
    copy = { message, name, stack };
  }
  optParents = optParents || [];
  optParents.push(node);
  for (let key in node) {
    if (!Object.prototype.hasOwnProperty.call(node, key)) {
      continue;
    }
    let value = node[key];
    let newKey = key;
    newKey = encode(newKey);
    if (value instanceof Object) {
      if (optParents.indexOf(value) === -1) {
        copy[newKey] = clone(value, optParents);
      } else {
        copy[newKey] = '[Circular]';
      }
    } else {
      copy[newKey] = value;
    }
  }
  optParents.pop();
  return copy;
};

module.exports = {
  clone,
  encode,
  decode
};
