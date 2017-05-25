export default class BaseInput {
  constructor(element) {
    this._isValid = false;
    this._inputType = element.nodeName;
    this.element = element;
    this.customValidator = element.dataset.validator;
    this.pattern = element.dataset.pattern;
    this.formatter = element.dataset.format;
    this.bindEvents();
    // this.element.addEventListener()
  }


  validateDefault() {
    return this.element.value !== '';
  }


  bindEvents() {
   // this.DEFAULTS.events[ this._inputType ].forEach( eventName => {
   //    this.element.addEventListener()
   //  }); 
  // debugger;
  // if (this._inputType === 'TEXT') {

    if (this.DEFAULTS.liveValidate) {
      this.element.addEventListener('mousedown', this.didStartEditing.bind( this ) )
    }
    this.element.addEventListener('keyup', this.didChangeValue.bind( this ) )
    
  // }
   // this.element.addEventListener('change', this.didFinishEditing.bind( this ) );
   this.element.addEventListener('blur', this.didFinishEditing.bind( this ) );
  }
}

BaseInput.prototype.VALIDATORS = {
  notEmpty: value => value !== ''
}

BaseInput.prototype.PATTERNS = {
  creditCard: /\d{16}/gi,
  email: /.+@{1}.+/
}

BaseInput.prototype.FORMATTERS = {
  phone: value => {

    let cleanedVal = value.replace(/\D/gi, "");
    if (cleanedVal.length > 3) {
      const REGEX = cleanedVal.length < 7 ? /(\d{3})(\d*)/gi : /(\d{3}).*?(\d{3}).*?(\d{1,4})/gi;
      
      let nums = cleanedVal.split(REGEX).filter( obj => !/\D/.test(obj) && obj.length !== 0 );
      return nums.join('-');
    }

    return value;
  }

}


BaseInput.prototype.DEFAULTS = {
  liveValidate: false,
  events: {
    "SELECT": [{
      name: 'input', 
      callback: 'didEndEditing'
    }, 
    {
      name: 'change', 
      callback: 'didEndEditing'
    }],
    "TEXT": ['blur', 'textInput', 'input', 'change']
  }
}

// monitorEvents(document.querySelector('input'));