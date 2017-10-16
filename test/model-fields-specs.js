/* global expect */
/* global NaN */
import '../src/layout.css';
import '../src/theme.css';

import Id from 'septima-utils/id';
import Invoke from 'septima-utils/invoke';
import Model from 'septima-model/model';
import Entity from 'septima-model/entity';
import Color from 'kenga/color';
import ModelColorField from '../src/model-color-field';
import ModelDateField from '../src/model-date-field';
import ModelDateTimeField from '../src/model-date-time-field';
import ModelDropDownField from '../src/model-drop-down-field';
import ModelEMailField from '../src/model-email-field';
import ModelFormattedField from '../src/model-formatted-field';
import ModelMeterField from '../src/model-meter-field';
import ModelNumberField from '../src/model-number-field';
import ModelPasswordField from '../src/model-password-field';
import ModelPhoneField from '../src/model-phone-field';
import ModelProgressField from '../src/model-progress-field';
import ModelTextField from '../src/model-text-field';
import ModelTextArea from '../src/model-text-area';
import ModelRichTextArea from '../src/model-rich-text-area';
import ModelSlider from '../src/model-slider';
import ModelTimeField from '../src/model-time-field';
import ModelUrlField from '../src/model-url-field';

describe('Model fields Api', () => {

    const house1 = {name: 'Angelville'};
    const house2 = {name: 'Enville'};
    const houses = [house1, house2];

    function fill(entity, Id, Color) {
        entity.push(
                {id: Id.generate(), name: 'Joe', legs: 2, hungry: false, birth: new Date(), color: new Color('#fcfcfc'), house: house1},
                {id: Id.generate(), name: 'Jane', legs: 2, hungry: false, birth: new Date(), color: new Color('#fafafa'), house: house1},
                {id: Id.generate(), name: 'Nick', legs: 2, hungry: false, birth: new Date(), color: new Color('#fbfbfb'), house: house1},
                {id: Id.generate(), name: 'Jack', legs: 2, hungry: false, birth: new Date(), color: new Color('#acacac'), house: house1},
                {id: Id.generate(), name: 'Gala', legs: 2, hungry: false, birth: new Date(), color: new Color('#aaaaaa'), house: house1},
                {id: Id.generate(), name: 'Nikolai', legs: 2, hungry: false, birth: new Date(), color: new Color('#ababab'), house: house1},
                {id: Id.generate(), name: 'Shusha', legs: 4, hungry: false, birth: new Date(), color: new Color('#acacac'), house: house1}
        );
        expect(entity.cursor).toBe(entity[6]);
    }

    function expectPathReverseBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity();
        model.addEntity(entity);
        fill(entity, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entity;
        instance.field = `cursor.${propertyName}`;

        if (propertyName === 'name')
            entity[6][propertyName] += ' 1';
        else if (propertyName === 'legs')
            entity[6][propertyName] += 1;
        else if (propertyName === 'birth')
            entity[6][propertyName] = new Date();
        else if (propertyName === 'hungry')
            entity[6][propertyName] = !entity[6][propertyName];
        else if (propertyName === 'color')
            entity[6][propertyName] = new Color('#0c0c0c');
        else if (propertyName === 'house')
            entity[6][propertyName] = house2;
        else
            throw `Unknown property '${propertyName}'`;
        expect(instance.value).toBe(entity[6][propertyName]);

        entity.cursor = entity[0];
        expect(instance.value).toBe(entity[0][propertyName]);

        entity.cursor = entity[5];
        expect(instance.value).toBe(entity[5][propertyName]);

        entity.cursor = entity[6];
        expect(instance.value).toBe(entity[6][propertyName]);

        entity.cursor = null;
        expect(instance.value).toBeNull();

        entity.cursor = entity[2];
        expect(instance.value).toBe(entity[2][propertyName]);

        entity.cursor = undefined;
        expect(instance.value).toBeNull();
    }

    function expectPlainReverseBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity();
        model.addEntity(entity);
        fill(entity, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entity.cursor;
        instance.field = propertyName;

        expect(entity.cursor).toBe(entity[6]);
        if (propertyName === 'name')
            entity[6][propertyName] += ' 1';
        else if (propertyName === 'legs')
            entity[6][propertyName] += 1;
        else if (propertyName === 'birth')
            entity[6][propertyName] = new Date();
        else if (propertyName === 'hungry')
            entity[6][propertyName] = !entity[6][propertyName];
        else if (propertyName === 'color')
            entity[6][propertyName] = new Color('#0c0c0c');
        else if (propertyName === 'house')
            entity[6][propertyName] = house2;
        else
            throw `Unknown property '${propertyName}'`;
        expect(instance.value).toBe(entity[6][propertyName]);
    }

    function expectPathForwardBinding(instance, propertyName, done) {
        const model = new Model();
        const entity = new Entity();
        model.addEntity(entity);
        fill(entity, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entity;
        instance.field = `cursor.${propertyName}`;

        if (propertyName === 'name')
            instance.value += ' 1';
        else if (propertyName === 'legs')
            instance.value += 1;
        else if (propertyName === 'birth')
            instance.value = new Date();
        else if (propertyName === 'hungry')
            instance.value = !instance.value;
        else if (propertyName === 'color')
            instance.value = new Color('#0c0c0c');
        else if (propertyName === 'house')
            instance.value = house2;
        else
            throw `Unknown property '${propertyName}'`;
        Invoke.later(() => {
            expect(entity[6][propertyName]).toBe(instance.value);
            done();
        });
    }

    function expectPlainForwardBinding(instance, propertyName, done) {
        const model = new Model();
        const entity = new Entity();
        model.addEntity(entity);
        fill(entity, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entity.cursor;
        instance.field = propertyName;

        if (propertyName === 'name')
            instance.value += ' 1';
        else if (propertyName === 'legs')
            instance.value += 1;
        else if (propertyName === 'birth')
            instance.value = new Date();
        else if (propertyName === 'hungry')
            instance.value = !instance.value;
        else if (propertyName === 'color')
            instance.value = new Color('#0c0c0c');
        else if (propertyName === 'house')
            instance.value = house2;
        else
            throw `Unknown property '${propertyName}'`;
        Invoke.later(() => {
            expect(entity[6][propertyName]).toBe(instance.value);
            done();
        });
    }

    it('ModelColorField.Structure', done => {
        const properyName = 'color';

        expectPathReverseBinding(new ModelColorField(), properyName);
        expectPlainReverseBinding(new ModelColorField(), properyName);

        expectPathForwardBinding(new ModelColorField(), properyName, () => {
            expectPlainForwardBinding(new ModelColorField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelDateField.Structure', done => {
        const properyName = 'birth';

        expectPathReverseBinding(new ModelDateField(), properyName);
        expectPlainReverseBinding(new ModelDateField(), properyName);

        expectPathForwardBinding(new ModelDateField(), properyName, () => {
            expectPlainForwardBinding(new ModelDateField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelDateTimeField.Structure', done => {
        const properyName = 'birth';

        expectPathReverseBinding(new ModelDateTimeField(), properyName);
        expectPlainReverseBinding(new ModelDateTimeField(), properyName);

        expectPathForwardBinding(new ModelDateTimeField(), properyName, () => {
            expectPlainForwardBinding(new ModelDateTimeField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelDropDownField.Structure', done => {
        const properyName = 'house';

        const f1 = new ModelDropDownField();
        f1.displayList = houses;
        f1.displayField = 'name';
        expectPathReverseBinding(f1, properyName);
        const f2 = new ModelDropDownField();
        f2.displayList = houses;
        f2.displayField = 'name';
        expectPlainReverseBinding(f2, properyName);

        const f3 = new ModelDropDownField();
        f3.displayList = houses;
        f3.displayField = 'name';
        expectPathForwardBinding(f3, properyName, () => {
            const f4 = new ModelDropDownField();
            f4.displayList = houses;
            f4.displayField = 'name';
            expectPlainForwardBinding(f4, properyName, () => {
                done();
            });
        });
    });
    it('ModelEMailField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelEMailField(), properyName);
        expectPlainReverseBinding(new ModelEMailField(), properyName);

        expectPathForwardBinding(new ModelEMailField(), properyName, () => {
            expectPlainForwardBinding(new ModelEMailField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelFormattedField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelFormattedField(), properyName);
        expectPlainReverseBinding(new ModelFormattedField(), properyName);

        expectPathForwardBinding(new ModelFormattedField(), properyName, () => {
            expectPlainForwardBinding(new ModelFormattedField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelMeterField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelMeterField(), properyName);
        expectPlainReverseBinding(new ModelMeterField(), properyName);

        expectPathForwardBinding(new ModelMeterField(), properyName, () => {
            expectPlainForwardBinding(new ModelMeterField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelNumberField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelNumberField(), properyName);
        expectPlainReverseBinding(new ModelNumberField(), properyName);

        expectPathForwardBinding(new ModelNumberField(), properyName, () => {
            expectPlainForwardBinding(new ModelNumberField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelPasswordField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelPasswordField(), properyName);
        expectPlainReverseBinding(new ModelPasswordField(), properyName);

        expectPathForwardBinding(new ModelPasswordField(), properyName, () => {
            expectPlainForwardBinding(new ModelPasswordField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelPhoneField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelPhoneField(), properyName);
        expectPlainReverseBinding(new ModelPhoneField(), properyName);

        expectPathForwardBinding(new ModelPhoneField(), properyName, () => {
            expectPlainForwardBinding(new ModelPhoneField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelProgressField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelProgressField(), properyName);
        expectPlainReverseBinding(new ModelProgressField(), properyName);

        expectPathForwardBinding(new ModelProgressField(), properyName, () => {
            expectPlainForwardBinding(new ModelProgressField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelRichTextArea.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelRichTextArea(), properyName);
        expectPlainReverseBinding(new ModelRichTextArea(), properyName);

        expectPathForwardBinding(new ModelRichTextArea(), properyName, () => {
            expectPlainForwardBinding(new ModelRichTextArea(), properyName, () => {
                done();
            });
        });
    });
    it('ModelSliderField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelSlider(), properyName);
        expectPlainReverseBinding(new ModelSlider(), properyName);

        expectPathForwardBinding(new ModelSlider(), properyName, () => {
            expectPlainForwardBinding(new ModelSlider(), properyName, () => {
                done();
            });
        });
    });
    it('ModelTextArea.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelTextArea(), properyName);
        expectPlainReverseBinding(new ModelTextArea(), properyName);

        expectPathForwardBinding(new ModelTextArea(), properyName, () => {
            expectPlainForwardBinding(new ModelTextArea(), properyName, () => {
                done();
            });
        });
    });
    it('ModelTextField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelTextField(), properyName);
        expectPlainReverseBinding(new ModelTextField(), properyName);

        expectPathForwardBinding(new ModelTextField(), properyName, () => {
            expectPlainForwardBinding(new ModelTextField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelTimeField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelTimeField(), properyName);
        expectPlainReverseBinding(new ModelTimeField(), properyName);

        expectPathForwardBinding(new ModelTimeField(), properyName, () => {
            expectPlainForwardBinding(new ModelTimeField(), properyName, () => {
                done();
            });
        });
    });
    it('ModelUrlField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelUrlField(), properyName);
        expectPlainReverseBinding(new ModelUrlField(), properyName);

        expectPathForwardBinding(new ModelUrlField(), properyName, () => {
            expectPlainForwardBinding(new ModelUrlField(), properyName, () => {
                done();
            });
        });
    });
});
