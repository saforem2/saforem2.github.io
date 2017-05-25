import FormInput from './formInput';
export default class FormBase {
  constructor(element) {
    this._el = element;
    this.submitBtn = this._el.querySelector("input[type='submit']");
    this.inputs = [];
    let els = element.querySelectorAll('[data-validate]');
    els.forEach( input => {
      this.inputs.push( new FormInput(input) );
    } );

    this._el.addEventListener('submit', this.didSubmit.bind(this) );
  }

  didSubmit(e) {
    e.preventDefault();
    let invalidInputs = this.inputs.filter( input => !input.isValid() );
    if (invalidInputs.length) {
      invalidInputs.forEach( input => input.showError() );
    }
  }

}