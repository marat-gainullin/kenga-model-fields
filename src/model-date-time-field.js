import Field from '../fields/date-time-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelDateTimeField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelDateTimeField;