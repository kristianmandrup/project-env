export default function(ctx, resolve) {
  return () => {
    console.log('MAX level', ctx.maxLevel);
    console.log('return', ctx.components);
    resolve(ctx.components);
  }
}