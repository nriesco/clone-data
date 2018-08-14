const ObjectID = require('mongodb').ObjectID;

/**
 * Clones meta object and cleans it from circular references, replacing them
 * with string '[Circular]' and fixes field names to be storable within
 * MongoDB
 * @param {Object} node Current object or its leaf
 * @param {Array=} optParents Object's parents
 */
let cloneMeta = function (node, optParents) {
  if (!(node instanceof Object) || (node instanceof ObjectID) ||
      (node instanceof Buffer)) {
    return node;
  }
  let copy = Array.isArray(node) ? [] : {};
  if (node instanceof Date) {
    return new Date(node.getTime());
  } else if (node instanceof Error) {
    // This is needed because Error's message, name and stack isn't accessible when cycling through properties
    copy = {
      message: node.message,
      name: node.name,
      stack: node.stack
    };
  }
  optParents = optParents || [];
  optParents.push(node);
  for (let key in node) {
    if (!Object.prototype.hasOwnProperty.call(node, key)) {
      continue;
    }
    let value = node[key];
    let newKey = key;
    if (newKey.includes('.') || newKey.includes('$')) {
      newKey = newKey.replace(/\./g, '[dot]').replace(/\$/g, '[$]');
    }
    if (value instanceof Object) {
      if (optParents.indexOf(value) === -1) {
        copy[newKey] = cloneMeta(value, optParents);
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

module.exports = cloneMeta;
