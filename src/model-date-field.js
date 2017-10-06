import Field from '../fields/date-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelDateField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelDateField;