import BaseInput from './baseInput';

export default class FormInput extends BaseInput {
  constructor(element) {
    super(element);
  }

  didStartEditing(e) {
    console.log('started!')
  }

  didFinishEditing(e) {
    this.element.classList.add('touched');
    this.validate();

    if ( this.isValid() ) {
      this.hideError();
    } else {
      this.showError();
    }
  }

  didChangeValue() {
    if ( !!this.formatter ) {
      console.log(this.formatter);
      let newVal = this.FORMATTERS[this.formatter].call( this, this.element.value );
      this.element.value = newVal;
    }
  }

  showError() {
    this.element.classList.remove('valid');
    this.element.classList.add('invalid');
    this.element.nextElementSibling.style.display = "block";
  }

  hideError() {
    this.element.classList.remove('invalid');
    this.element.classList.add('valid');
    this.element.nextElementSibling.style.display = "none";
  }


  validate() {
    this._isValid = this.VALIDATORS.notEmpty.call(this, this.element.value);

    if (!!this.customValidator) {
        this._isValid = this.VALIDATORS[this.customValidator].call(this, this.element.value);
        // return true;
    }
    
    if ( !!this.pattern ) {
      this._isValid = this.PATTERNS[this.pattern].test( this.element.value );
    }

  }

  isValid() {
    return this._isValid;
  }

  didFailValidation(e) {
    
  }

}