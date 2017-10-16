import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/number-field';

class ModelNumberField extends Field {
    constructor() {
        super(null, document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelNumberField;