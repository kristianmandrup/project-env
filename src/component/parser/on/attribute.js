export default function(ctx) {
  return (name, value) => {
    if (name === 'class') {
      let classes = value.split(/\s+/);
      // see if it's marked as a component
      if (classes.includes('component')) {
        console.log('Start component');
        ctx.startComponent = true;
      }
    }
  }
}