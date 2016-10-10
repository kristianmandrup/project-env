## Pipeline architecture

The pipeline takes a filemap which is a description of files (ie. file descriptors) in some format.
The simplest map is a list of file paths.

```
let fileMap = ['my/path/to/file.html', 'my/other/nice-file.js'];
```

A richer map would be one as follows, where files are grouped by type and name of lib they belong to. 

```js
let fileMap = {
  ui: {
    name: 'bootstrap',
    files: ['my/path/to/file.html', 'my/other/nice-file.js']
  },
  {
    // ...
  }
}
```

Alternatively specifying folders for different types of files 

```js
{
  name: 'bootstrap',
  styles: ['my/path/to/bootstrap/v2/css'],
  scripts: ['my/path/to/bootstrap/v2/js']
}
```

The pipeline then uses an `adapter` to process the file map and uses a `FileReader` to read the file content of each.
The file descriptors and content are then processed by one or more `readTransform` steps 
and inserted into a `registry`.

A file traverse then traverses the registry and processes each using one or more `writeTransform` steps 
while building a new list of file action descriptors which is sent to an IO output adapter 
to be executed on a target, such as a project on disk. 

### File Reader

### Registry

### File Writer

### ReadTransform step

Has access to original file map, the file descriptor and file content.
Can define the name of the registry entry and what to store there.    

### WriteTransform step

Has access to the full registry and the registry entry.
Can build a valid output file descriptor to store in file map to be output.




