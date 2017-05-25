const Dropdown = ( (window) => {

  class Dropdown {

    constructor(element) {
      this._el = element;
      this._toggleEl = document.querySelector( this._el.dataset.toggle );
      this.bindElement();
    }

    bindElement() {
      // if ( this._el.dataset.trigger == 'hover' ) {
      //   this._el.addEventListener( 'mouseenter', this.toggleDropdown.bind( this ) );
      //   // this._el.addEventListener( 'mouseleave', this.toggleDropdown.bind( this ) );
      //   return true;
      // }
      this._el.addEventListener( 'click', this.toggleDropdown.bind( this ) );
    }

    toggleDropdown() {
      this._isShown ? this.closeDropdown() : this.showDropdown();
    }

    closeDropdown() {
      this._toggleEl.classList.remove('active');
      this._isShown = false;
    }

    showDropdown() {
      this._toggleEl.classList.add('active');
      this._isShown = true;
    }

  }


  // document.load()
  document.querySelectorAll('[data-toggle]').forEach( el => new Dropdown(el) );

  return Dropdown;
})(window);

export default Dropdown;