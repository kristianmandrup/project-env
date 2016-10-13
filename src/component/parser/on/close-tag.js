export default function(ctx) {
  return (name) => {
    console.log('CLOSE tag', name);
    console.log('CTX', ctx);
    
    if (ctx.lastEvent === 'close') {
      ctx.currentLv--;
    }
    ctx.lastLv = ctx.currentLv;    

    // signal to parser that last event was a close tag
    // this means that next tag is not a "First Child" but must be a sibling
    ctx.lastEvent = 'close';

    // see if we are back at the node of the current component
    if (ctx.component) {
      // if the id matches current component, we must assume we are exciting compnent scope
      if (ctx.node.id === ctx.component.id) {
        // signal to parser that we are no longer in a component scope
        ctx.quitComponent = true;
      }                
    }

    // set node to parent since we are exciting current scope/level
    if (ctx.node.parent) {
      ctx.node = ctx.node.parent
    }
  }
}