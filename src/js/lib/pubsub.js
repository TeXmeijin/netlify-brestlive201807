$(() => {
  class Pubsub {
    constructor() {
      this.methods = [];
    }
    subscribe(index, fn) {
      if (!this.methods[index]) {
        this.methods[index] = [];
        this.methods[index].push(fn);
        return;
      }
      this.methods[index].push(fn);
    }
    publish(index, argObj) {
      this.methods[index].forEach((el) => {
        el(argObj);
      });
    }
  }
  window.pubsub = new Pubsub();
});