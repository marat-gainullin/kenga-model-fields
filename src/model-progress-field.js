import Bound from 'kenga/bound';
import Field from 'kenga-fields/progress-field';

class ModelProgressField extends Field {
    constructor() {
        super(null, document.createElement('div'));
        Bound.call(this);
    }
}

export default ModelProgressField;