import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/url-field';

class ModelUrlField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelUrlField;