import Field from '../fields/time-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelTimeField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelTimeField;