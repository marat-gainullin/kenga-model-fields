import Field from '../fields/meter-field';
import Bound from 'ui/bound';

class ModelMeterField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
    }
}

export default ModelMeterField;