import Field from '../fields/url-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelUrlField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelUrlField;