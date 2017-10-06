import Field from '../fields/email-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelEMailField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelEMailField;