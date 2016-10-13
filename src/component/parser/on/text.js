export default function(ctx) {
  return (text) => {
    let trimmed = text.trim();
    if (/\S/.test(trimmed)) {      
      ctx.node.text = trimmed;
    }     
  }
} 

