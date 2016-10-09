## Custom Install transformations

Depending on the type of artefact, the file set, the target environment, the project model and preferences, the installer will have a specific (default) installation procedure in mind. However this procedure can be further customised to suit the particular preferences of the developer, team or organisation.

Each file goes through a transformation pipeline with steps which can be customised. 
Example: generate `item.vue` component from multiple individual component files

The files `item.js` (vm), `item.html` (view) and `item.css` needs to be concatenated into a `item.vue` file

file: `item.vue`

```html
<template>
  // item.html
</template>
<script>
  exports default // item.js
</script>
<style>
  // item.css (or f.ex item.styl)
</style>
```


We need to achieve this while maintaining a sandbox execution environment. There are three scenarios we need to support:

```
file -> file (rename)
file1, file2 -> file (multiple files merged into one result file) 
file -> file1, file2 (one file split into multiple files)
```

To best achieve this, we can use a registry and a virtual file list. On first pass we add each file and file context to a registry entry of our choice. We can either add multiple files to one entry or split up a file into multiple entries. Then we iterate each registry entry to create one or more files which we finally save in the file system. This pipeline is illustrated here: 

```js
transform(ctx, file) {
  // add to registry entry
  if (ctx.isComponent) {
    this.registry[file.name] = this.registry[file.name] || {};
    this.registry[file.name][file.type] = content;
  }
}
```

Registry entry for `item`:

```js
item: {
  ctx: { 
    type: 'component'
  },
  css: [item.css]
  js: [item.js]
  html: [item.html]
  mountPath: 'contacts/item'
  language: 'js'
}
```

Then we can iterate the registry

```js
addFiles(entry) {
  // convert entry into one or more result files
  files.push({
    tags: [ ‘component’],
    content: …
    language: ‘js’
    mountPath: ‘contacts/item’
  })
```  

Finally we use a file saver to save all files based on the file definition of each entry in the resulting files list.

```js
files.transform() -> registry
registry.createFiles() -> files array
files.saveAll() -> save to disk
```

In short:

`await files.transform().createFiles().saveAll();`