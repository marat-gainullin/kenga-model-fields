import Field from '../fields/progress-field';
import Bound from 'ui/bound';

class ModelProgressField extends Field {
    constructor() {
        super(null, document.createElement('div'));
        Bound.call(this);
    }
}

export default ModelProgressField;