import Field from '../fields/phone-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelPhoneField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelPhoneField;