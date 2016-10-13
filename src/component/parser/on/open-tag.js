export default function(ctx) {
  return (name, attribs) => {
    console.log('tag', name, attribs);
    if (ctx.ignoreTags.includes(name)) {
      return;           
    }

    if (name === 'nav')
      console.log('!!!! OPEN NAV');

    let id = attribs.id;
    let type = 'sibling';
    
    if (ctx.lastEvent === 'open') {
      type = 'child';
      ctx.currentLv++;
    }

    if (ctx.currentLv > ctx.maxLevel) {
      ctx.maxLevel = ctx.currentLv;
    }

    console.log('LEVEL', ctx.currentLv)
    ctx.lastEvent = 'open';
    ctx.opened = true;

    let config = {
      name: name,
      id: id, 
      attribs: attribs,
      parent: ctx.node,
      children: []
    };

    // TODO: this is WRONG! 
    // How can I detect if node is child or sibling!?
    if (type === 'child') {
      console.log('Add new CHILD', config)
      ctx.node.children.push(config);          
    }         
    ctx.node = config;

    // if crazy bad tree
    if (ctx.currentLv > 20) {
      console.error('ABORTING: Too many element levels!!! No more than 20 please!')
      process.exit(1);
    }

    if (ctx.quitComponent) return;

    if (!ctx.component && !ctx.startComponent) {
      console.log('no component');
      return;
    }            

    let componentConfig = Object.assign(config);
    delete componentConfig['parent'];

    console.log('component config', componentConfig);

    if (ctx.startComponent) {          
      console.log('STARTING COMPONENT', id);
      ctx.component = componentConfig;
      ctx.components[id] = ctx.component;            
      ctx.startComponent = false; 
    } else {
      // TODOL should max be 8 children!
      ctx.children++;
      console.log('child count', ctx.children)
      console.log('SUB CHILD', name); 

      if (type === 'child') {
        ctx.component.children.push(componentConfig);
      }

      ctx.component = componentConfig;                      
    }
  }
}
