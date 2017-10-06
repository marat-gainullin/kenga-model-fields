import Area from '../fields/rich-text-area';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelRichTextArea extends Area {
    constructor(text) {
        if (arguments.length < 1)
            text = '';
        super(text);
        Bound.call(this);
        Decorator.call(this);
    }
}

export default ModelRichTextArea;