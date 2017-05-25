class EventEmitter {
  constructor() {
    this._events = {};
  }




  when(eventName, callback) {
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].push(callback);
  }

  unsubscribe (e, callback) {
    if (this._events[e]) {
      for (var i = 0; i < this._events[e].length; i++) {
        if (this._events[e][i] === callback) {
          this._events[e].splice(i, 1);
          break;
        }
      };
    }
  }


  publish(e, data) {
    if (this._events[e]) {
      this._events[e].forEach(function (fn) {
        fn.call(data);
      });
    }
  }

}

// const events = new EventEmitter();

export let events = new EventEmitter();