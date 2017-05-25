export default class TransformableContainer {
  constructor(element) {
    this._isOpen = false;
    this._el = element;
    this._btn = element.querySelector('button');
    this._content = element.querySelector('.transformable-content');
    this._closeBtn = element.querySelector('.close');
    this._initialPosition = this.getCurrentBounds();
    this.setStyleInitial();
    this._setBinding();
  }

  _setBinding() {
    this._btn.addEventListener( 'click', this.toggle.bind( this ) );
    this._resizeHandler = this.setStyleInitial.bind( this );
    window.addEventListener("resize",  this._resizeHandler );
  }

  getCurrentBounds() {
    return this._el.getBoundingClientRect();
  }

  setStyleInitial(e) {
    console.log('hit');
    this._initialPosition = this.getCurrentBounds();
    this._content.style.left = `${this._initialPosition.left}px`;
    this._content.style.top = `${this._initialPosition.top}px`;
    this._content.style.width = `${this._initialPosition.width}px`;
    this._content.style.height = `${this._initialPosition.height}px`;
    // this._content.style.borderRadius = '100%';
  }

  setStyleExpanded() {
    this._content.style.left = `0px`;
    this._content.style.top = `0px`;
    this._content.style.width = `100%`;
    this._content.style.height = `100%`; 
  }

  toggle() {
    this._isOpen ? this.close() : this.open();
  }

  close(e) {
    e.preventDefault();
    this.setStyleInitial();
    this._el.classList.add('closing');
    setTimeout( () => { this._el.classList.remove('active'); this._el.classList.remove('closing'); }, 800 )
    this._closeBtn.removeEventListener('click', this.close.bind( this ) );
    document.removeEventListener('keyup', this.checkEsc.bind( this ) );
    window.addEventListener("resize",  this._resizeHandler );
    this._isOpen = false;
  }

  open() {
    this.setStyleExpanded();
    window.removeEventListener("resize",  this._resizeHandler, false );
    this._el.classList.add('active');
    this._isOpen = true;
    this.bindCloseEvents();
  }

  checkEsc(e) {
    if ( e.keyCode === 27 )
      this.close(e);
  }

  bindCloseEvents() {
    document.addEventListener('keyup', this.checkEsc.bind( this ));
    this._closeBtn.addEventListener('click', this.close.bind( this ) );
  }

}