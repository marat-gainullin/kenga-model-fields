import Field from '../fields/text-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelTextField extends Field {
    constructor(text) {
        if (arguments.length < 1)
            text = '';
        super(text, null, document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelTextField;