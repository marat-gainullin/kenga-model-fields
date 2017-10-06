import Field from '../fields/number-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelNumberField extends Field {
    constructor() {
        super(null, document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelNumberField;