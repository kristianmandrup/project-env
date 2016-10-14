const fs = require('fs');
const path = require('path');
const domify = require('domify');
const jsdomLib = require('jsdom');
const jsdom = jsdomLib.jsdom();
const serializeDocument = jsdomLib.serializeDocument;

const htmlPagePath = path.join(__dirname, '../../fixtures/pages/page.html');
let page = fs.readFileSync(htmlPagePath, 'utf8');

const document = domify(page, jsdom.defaultView.document);

const components = document.querySelectorAll(".component");
console.log('components', components);

const c = components[0];
console.log('children', c.childNodes)

// alternatively simply use html2json or himalaya (recommended)
// this is for full control!!

function theDOMElementWalker(node, ctx = {}, parent) {
  if (node.nodeType == 3) {
    parent.text = node.nodeValue;
    return; 
  }

  if (node.nodeType == 1) {
    console.log(node.tagName);

    let isComponent = false;
    let attrs = {};
    let attributes = node.attributes;
    for (var i = 0; i < attributes.length; i++) {
      var attrib = attributes[i];
      if (attrib.specified) {
        let name = attrib.name;
        let value = attrib.value;
        if (name === 'class') {
          value = value.split(/\s/);
          if (value.includes('component')) {
            isComponent = true;
          } 
        }        
        attrs[name] = value;
      }
    }

    if (!parent)
      parent = ctx.root;

    let id = undefined;
    if (attrs.id) {
      id = attrs.id;
      delete attrs.id;
    }

    parent.children = parent.children || [];
    let child = {
      id,
      attrs,
      name: node.tagName.toLowerCase()
    }

    if (isComponent)
      child.isComponent = true;

    parent.children.push(child);

    let childNode = node.firstChild;

    // while traversing children of node
    while (childNode) {
      theDOMElementWalker(childNode, ctx, child);
      childNode = childNode.nextSibling;
    }
    return ctx;
  }
}

var component = document.querySelector(".component");
var ctx = theDOMElementWalker(component, {root: {}});
console.log(JSON.stringify(ctx, null, '  '));

// https://www.kirupa.com/html5/traversing_the_dom.htm
// c.childNodes.map(node => console.log(node));

