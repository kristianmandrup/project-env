export default function(ctx) {
  return (name) => {
    if (ctx.lastEvent === 'close') {
      ctx.currentLv--;
    }

    ctx.lastEvent = 'close';

    console.log('LEVEL', ctx.currentLv)

    console.log('ID', ctx.node.id)
    if (name !== 'nav')
      return;

    console.log('!!!    CLOSE', name);

    if (ctx.component) {
      console.log('node id', ctx.node.id, 'component id', ctx.component.id);
      let parent = ctx.node.parent;
      if (parent) {
        if (ctx.node.id === ctx.component.id) {
          console.log('END component')
          ctx.quitComponent = true;
        }                
      }        
    }
    if (ctx.node.parent) {
      ctx.node = ctx.node.parent
    }
  }
}