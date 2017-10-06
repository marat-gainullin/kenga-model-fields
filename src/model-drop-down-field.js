import Field from '../fields/drop-down-field';
import Bound from 'ui/bound';
import Decorator from '../decorator';

class ModelDropDownField extends Field {
    constructor() {
        super(document.createElement('div'));
        Bound.call(this);
        Decorator.call(this);

        const self = this;

        let lengthReg = null;
        let elementsReg = null;
        let values = null;
        let displayField = null;

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
                    self.addValue(displayField ? item[displayField] : item /* assume plain values */ , item);
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
    }
}

export default ModelDropDownField;
