const fs = require('fs');
const path = require('path');
const domify = require('domify');
const { camelCase } = require('lodash');
const jsdomLib = require('jsdom');
const jsdom = jsdomLib.jsdom();
const serializeDocument = jsdomLib.serializeDocument;

const htmlPagePath = path.join(__dirname, '../../fixtures/pages/page.html');
let page = fs.readFileSync(htmlPagePath, 'utf8');

const document = domify(page, jsdom.defaultView.document);

const components = document.querySelectorAll(".component");
// console.log('components', components);

const c = components[0];
// console.log('children', c.childNodes)

// alternatively simply use html2json or himalaya (recommended)
// this is for full control!!

// TODO: call with event handlers to make it flexible and externalise complex logic
// also make the signature: node, parent, ctx, options = {}
// perhaps we could even set parent in the context itself
// ctx: {root: {}, parent: [-> to Object in ctx tree]}

// the ctx is the context which assembles the resulting tree in root
// it could also collect various stats
// options contain various callbacks, for handling attributes, updating context etc.
// opts.element.onAttributes, opts.element.updateParent, opts.element.createChild 

function theDOMElementWalker(node, ctx = {}, parent) {
  if (node.nodeType == 3) {
    parent.text = node.nodeValue.trim();
    return; 
  }

  if (node.nodeType == 1) {
    // console.log(node.tagName);

    let isComponent = false;

    // handle attributes
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

    // create child
    let child = {
      id,
      attrs,
      name: node.tagName.toLowerCase()
    }

    if (isComponent) {
      child.isComponent = true;
      ctx.components[id] = child;
    }
      

    // update parent (which points to an Object in context)
    parent.children = parent.children || [];
    parent.children.push(child);

    // core traverse algorithm
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
var ctx = theDOMElementWalker(component, {root: {}, components: {}});
// console.log(JSON.stringify(ctx, null, '  '));

class HtmlConverter {
  constructor(node, indentationLv = 0, opts = {spaceCount: 2 }) {
    this.node = node;
    this.attrs = node.attrs;
    this.children = node.children;
    this.text = node.text;
    this.indentationLv = indentationLv; 
    this.spaceCount = opts.spaceCount || 2;
  }

  convert() {
    return this.createTag();
  }

  createAttribute(name, value) {
    if (Array.isArray(value))
      value = value.join(' ');

    return `${name}="${value}"`;
  }

  atrributes() {
    if (!this.attrs) return '';
    return Object.keys(this.attrs).map( (name) => {
      return this.createAttribute(name, this.attrs[name]);
    }).join(' ');
  }

  tag() {
    return [this.node.name, this.atrributes()].join(' ').trim();
  }

  indent(offSet) {
    return new Array((this.indentationLv + offSet) * this.spaceCount).join(' ');
  }

  get longText() {
    return this.text && this.text.length > 30;
  }

  childTags() {
    if (!this.children)
      return '';

    let indent = this.indent(1);
    let newIndentationLv = this.indentationLv + 1;
    let childHtml = this.children.map(child => new HtmlConverter(child, newIndentationLv).convert()).join(`\n${indent}`);
    let indented = [`\n${indent}${childHtml}\n`];       
    if (this.text && this.text.length > 0)
      indented.push(`\n${indent}${this.text}\n`);    
    
    return indented.join('');     
  }
  
  createTag() {
    if (this.children || this.longText) {
      return `<${this.tag()}>${this.childTags()}${this.indent(0)}</${this.node.name}>`;
    } else {
      return `<${this.tag()}>${this.text || ''}</${this.node.name}>`;
    }        
  }
}

class TextExtractor {
  constructor(node) {
    this.node = node;
    this.text = node.text;
    this.children = node.children;
  }

  extract(texts = []) {
    if (this.text && this.text.length > 0)
      texts.push(this.text)

    if (!this.children)
      return;

    for (let child of this.children) {
      new TextExtractor(child).extract(texts)
    } 
    return texts;   
  }
}


class VueComponent {
  constructor(component) {
    this.component = component;
  }

  get template() {
    return {
      name: 'template',
      children: [this.component]
    }
  }
  // make text nodes into data properties
  // create HTML for template
  view() {
    return new HtmlConverter(this.template).convert();
  }

  viewModel() {
    let texts = new TextExtractor(this.component).extract();

    return texts.reduce( (model, text) => {
      // console.log(text, model);
      let key = camelCase(text);
      model.data[key] = text;
      return model;
    }, {data: {}})
  }
}


let vue = new VueComponent(ctx.components['myNavWrapper']);
let view = vue.view();
let model = vue.viewModel();
// console.log(view);
console.log(model);

// https://www.kirupa.com/html5/traversing_the_dom.htm
// c.childNodes.map(node => console.log(node));

