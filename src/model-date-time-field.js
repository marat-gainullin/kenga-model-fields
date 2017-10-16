import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/date-time-field';

class ModelDateTimeField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelDateTimeField;