class Reader {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  read() {
  }
}


class Writer {
  constructor(descriptor) {
    this.descriptor = descriptor;    
  }

  write() {
  }  
}

export default {
  Reader: Reader,
  Writer: Writer 
}