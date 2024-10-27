import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Field from 'kenga-fields/lookup-field';

class ModelLookupField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);

        const self = this;

        let lengthReg = null;
        let elementsReg = null;
        let values = null;
        let displayField = null;
        let onRender = null

        function unbindValues() {
            if (lengthReg) {
                lengthReg.unlisten();
                lengthReg = null;
            }
            if (elementsReg) {
                elementsReg.unlisten();
                elementsReg = null;
            }
            self.clear();
        }

        function bindValues() {
            if (values) {
                values.forEach(item => {
                    self.addValue(onRender ? onRender(item) : displayField ? Bound.getPathData(item, displayField) : item , item);
                });
                lengthReg = Bound.listen(values, evt => {
                    if (evt.propertyName === 'length')
                        rebindValues();
                });
                elementsReg = Bound.observeElements(values, evt => {
                    if (evt.propertyName === displayField)
                        self.updateLabel(evt.source, evt.newValue);
                });
            }
        }

        function rebindValues() {
            unbindValues();
            bindValues();
        }

        Object.defineProperty(this, 'values', {
            get: function() {
                return values;
            },
            set: function(aValue) {
                if (values !== aValue) {
                    unbindValues();
                    values = aValue;
                    bindValues();
                }
            }
        });


        Object.defineProperty(this, 'displayField', {
            get: function() {
                return displayField;
            },
            set: function(aValue) {
                if (displayField !== aValue) {
                    displayField = aValue;
                    rebindValues();
                }
            }
        });

        Object.defineProperty(this, 'onRender', {
            get: function() {
                return onRender;
            },
            set: function(aValue) {
                if (onRender !== aValue) {
                    onRender = aValue;
                    rebindValues();
                }
            }
        });
    }
}

export default ModelLookupField;
