import FormBase from './formValidator/formBase';
import BaseInput from './formValidator/baseInput';

class WebFormValidator {
  constructor() {
    this.forms = [];

  }

  setupEvents() {
    this._formEls = document.querySelectorAll("[data-simple-form]");
    this._formEls.forEach( form => {
      this.forms.push( new FormBase(form) );
    });

  }

  reflow() {
    delete this._formEls;
    this.setupEvents();
  }

  extendValidations( validators ) {
    const keys = Object.keys(validators);
    keys.forEach( key => {
      BaseInput.prototype.VALIDATORS[key] = validators[key];
    });
    return this;
  }

  liveValidate(shouldValidate) {
    BaseInput.prototype.DEFAULTS.liveValidate = shouldValidate;
    this.reflow();
    return this;
  }


}

WebFormValidator.prototype.DEFAULTS = {
  selector: 'data-simple-form'
}

export let SimpleForm = new WebFormValidator();