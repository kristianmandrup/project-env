export default function(ctx, reject) {
  return (err) => {
    console.log('ERROR', err)
    reject(err);
  }
}