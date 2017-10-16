import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Area from 'kenga-fields/rich-text-area';

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