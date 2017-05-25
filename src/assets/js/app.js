import "../scss/app.scss";
import { events } from './util/eventEmitter';

// import { SimpleForm } from './simpleForm';
import Dropdown from './components/dropdown';
import TransformableContainer from './components/transformable';

// setTimeout( () => {
  document.querySelectorAll('.js-transformable').forEach( transformContainer => new TransformableContainer(transformContainer) );
  
// }, 300)