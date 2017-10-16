import Decorator from 'kenga/decorator';
import Bound from 'kenga/bound';
import Field from 'kenga-fields/formatted-field';

class ModelFormattedField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelFormattedField;