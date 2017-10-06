import Field from '../fields/slider';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelSliderField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelSliderField;