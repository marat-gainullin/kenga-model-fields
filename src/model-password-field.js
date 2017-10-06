import Field from '../fields/password-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelPasswordField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelPasswordField;