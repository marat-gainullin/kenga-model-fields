import Field from '../fields/color-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelColorField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelColorField;