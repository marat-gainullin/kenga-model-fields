import Bound from 'kenga/bound';
import Field from 'kenga-fields/meter-field';

class ModelMeterField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
    }
}

export default ModelMeterField;