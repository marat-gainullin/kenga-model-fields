import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/time-field';

class ModelTimeField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelTimeField;