export default function(ctx) {
  return (text) => {
    ctx.node.text = text;
  }
} 

