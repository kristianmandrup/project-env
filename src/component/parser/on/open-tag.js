export default function(ctx) {
  return (name, attribs) => {
    console.log('OPEN tag', name, attribs);
    console.log('CTX', ctx);

    // ignore elements certain elements
    if (ctx.ignoreTags.includes(name)) {
      return;           
    }

    if (name === 'body')
      ctx.inBody = true;

    // only makes sense to proceed if we are inside a body
    if (!ctx.inBody)
      return;

    let id = attribs.id;
    let nodeType = 'sibling';
    
    if (ctx.lastEvent === 'open') {
      nodeType = 'newChild';
      ctx.currentLv++;
    }

    if (ctx.currentLv > ctx.lastLv) {
      console.log('ENTERED NEW SCOPE');
    }

    ctx.lastLv = ctx.currentLv; 

    if (ctx.currentLv > ctx.maxLevel) {
      ctx.maxLevelFound = ctx.currentLv;
    }

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
    if (nodeType === 'newChild') {
      ctx.parent = ctx.node;
    }
    if (ctx.parent.children) 
      ctx.parent.children.push(config);    

    ctx.node = config;

    // if crazy bad tree
    if (ctx.currentLv > ctx.maxLvAllowed) {
      console.error('ABORTING: Too many element levels!!! No more than 20 please!')
      process.exit(1);
    }

    if (ctx.quitComponent) return;

    if (!ctx.component && !ctx.startComponent) {
      return;
    }            

    let componentConfig = Object.assign(config);
    delete componentConfig['parent'];

    if (ctx.startComponent) {          
      ctx.component = componentConfig;
      ctx.components[id] = ctx.component;            
      ctx.startComponent = false; 
    } else {
      // TODOL should max be 8 children!
      ctx.children++;

      if (nodeType === 'child') {
        ctx.component.children.push(componentConfig);
      }

      ctx.component = componentConfig;                      
    }
  }
}
