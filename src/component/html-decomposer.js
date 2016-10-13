const htmlparser = require('htmlparser2');

export default function parsePage(page) {
  return new Promise((resolve, reject) => {
    let node = {}; 
    let component = undefined;
    let child = undefined;
    let components = [];
    let children = 0;
    let currentLv = 0;
    let lastLv = 0;
    let opened = false; 
    var lastEvent;
    let maxLevel = 0;
    let startComponent = false;
    let quitComponent = undefined;

    let ignoreTags = ['head', 'meta', 'link', 'title']

    const parser = new htmlparser.Parser({
        onopentag: (name, attribs) => {
          console.log('tag', name, attribs);
          if(ignoreTags.includes(name)) {
            return;           
          }

          if (name === 'nav')
            console.log('!!!! OPEN NAV');

          let id = attribs.id;
          let type = 'sibling';
          
          if (lastEvent === 'open') {
            type = 'child';
            currentLv++;
          }

          if (currentLv > maxLevel) {
            maxLevel = currentLv;
          }

          console.log('LEVEL', currentLv)
          lastEvent = 'open';
          opened = true;

          let config = {
            name: name,
            id: id, 
            attribs: attribs,
            parent: node,
            children: []
          };

          // TODO: this is WRONG! 
          // How can I detect if node is child or sibling!?
          if (type === 'child') {
            console.log('Add new CHILD', config)
            node.children.push(config);          
          }         
          node = config;

          // if crazy bad tree
          if (currentLv > 10) {
            process.exit(1);
          }

          if (quitComponent) return;

          if (!component && !startComponent) {
            console.log('no component');
            return;
          }            

          let componentConfig = Object.assign(config);
          delete componentConfig['parent'];

          console.log('component config', componentConfig);

          if (startComponent) {          
            console.log('STARTING COMPONENT', id);
            component = componentConfig;
            components.push(component);            
            startComponent = false; 
          } else {
            // TODOL should max be 8 children!
            children++;
            console.log('child count', children)
            console.log('SUB CHILD', name); 

            if (type === 'child') {
              component.children.push(componentConfig);
            }

            component = componentConfig;                      
          }
        },

        onattribute: (name, value) => {
          if (name === 'class') {
            let classes = value.split(/\s+/);
            // see if it's marked as a component
            if (classes.includes('component')) {
              console.log('Start component');
              startComponent = true;
            }
          }
        },

        ontext: (text) => {
          node.text = text;
        },

        onclosetag: (name) => {
          if (lastEvent === 'close') {
            currentLv--;
          }

          lastEvent = 'close';

          console.log('LEVEL', currentLv)

          console.log('ID', node.id)
          if (name !== 'nav')
            return;

          console.log('!!!    CLOSE', name);

          if (component) {
            console.log('node id', node.id, 'component id', component.id);
            let parent = node.parent;
            if (parent) {
              if (node.id === component.id) {
                console.log('END component')
                quitComponent = true;
              }                
            }        
          }
          if (node.parent) {
            node = node.parent
          } else {
            console.log('no parent :()')
          }
        },

        onerror: (err) => {
          reject(err);
        },

        onend: () => {
          console.log('MAX level', maxLevel);
          console.log('return', components);
          resolve(components);
        }
    }, {decodeEntities: true});

    parser.write(page);
    parser.end();
  })
}

