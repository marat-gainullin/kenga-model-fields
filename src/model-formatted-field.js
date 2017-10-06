import Field from '../fields/formatted-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelFormattedField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelFormattedField;