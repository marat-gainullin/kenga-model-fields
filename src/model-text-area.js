import Field from '../fields/text-area';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelTextArea extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelTextArea;