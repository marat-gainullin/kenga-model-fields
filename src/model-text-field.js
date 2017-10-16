import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/text-field';

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