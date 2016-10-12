const fs = require('fs-promise');
const ejs = require('ejs'); // default template
const path = require('path');

// TODO: reuse in ai-core
class Template {
  constructor({destination, template, data, render}) {
    // TODO: extract to function, avoid duplicate pattern!
    this.template = template || {};
    this.template.basePath = this.template.basePath || '';

    this.template.fullPath = this.template.fullPath || 
                             path.join(this.template.basePath, this.template.relativePath); 
 
    this.destination = destination || {};
    this.destination.basePath = this.destination.basePath || '';
    this.destination.relativePath = this.destination.relativePath || path.basename(template.relativePath);
    this.destination.fullPath = this.destination.fullPath || 
                                path.join(this.destination.basePath, this.destination.relativePath);

    this.data = data;
    this.render = render || ejs.render;
  }

  async assemble() {
    try {
      return await ejs.render(await this.template(), this.data);
    } catch (e) {
      console.error(e);
      throw `ERROR: assemble ${fullPath}`;
    }
  }

  async template() {
    return await fs.readFile(this.template.fullPath, 'utf8');
  }

  async fileContent() {
    return await this.assemble();
  }

  async createFile() {
    try {
      let content = await this.fileContent()
      await fs.writeFile(this.destination.fullPath, content);
      return content;
    } catch (e) {
      throw `Template write error: ${this.template.fullPath} -> ${this.destination.fullPath}`;
    }
  }

  // generates the template at the destination using template and data
  // returns content on success, otherwise throws error
  async generate() {
    try {
      await this.createFile();
    } catch (e) {
      throw `ERROR: generating ${this.template.fullPath}`;
    }
  }
}

// TODO: minimize argument
export default function ({destination, template, data}) {
  return new Template({destination, template, data});
}