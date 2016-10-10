// registry is used to hold a virtual file system
export default class Registry {
  constructor() {
    this.store = {};     
  }

  read(id) {
    return this.store[id];
  }

  write(id, obj) {
    this.store[id] = obj;
  }
}