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

    function fill(entity) {
        entity.push(
                {id: Id.next(), name: 'Joe', legs: 2, hungry: false, birth: new Date(), color: new Color('#fcfcfc'), house: house1},
                {id: Id.next(), name: 'Jane', legs: 2, hungry: false, birth: new Date(), color: new Color('#fafafa'), house: house1},
                {id: Id.next(), name: 'Nick', legs: 2, hungry: false, birth: new Date(), color: new Color('#fbfbfb'), house: house1},
                {id: Id.next(), name: 'Jack', legs: 2, hungry: false, birth: new Date(), color: new Color('#acacac'), house: house1},
                {id: Id.next(), name: 'Gala', legs: 2, hungry: false, birth: new Date(), color: new Color('#aaaaaa'), house: house1},
                {id: Id.next(), name: 'Nikolai', legs: 2, hungry: false, birth: new Date(), color: new Color('#ababab'), house: house1},
                {id: Id.next(), name: 'Shusha', legs: 4, hungry: false, birth: new Date(), color: new Color('#acacac'), house: house1}
        );
        expect(entity.cursor).toBe(entity[6]);
    }

    function expectPathReverseBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity(model, 'dummy', 'dummy_id');
        const entityData = entity.wrapData([]);
        fill(entityData);

        expect(instance.value).toBeNull();
        instance.data = entityData;
        instance.field = `cursor.${propertyName}`;

        if (propertyName === 'name')
            entityData[6][propertyName] += ' 1';
        else if (propertyName === 'legs')
            entityData[6][propertyName] += 1;
        else if (propertyName === 'birth')
            entityData[6][propertyName] = new Date();
        else if (propertyName === 'hungry')
            entityData[6][propertyName] = !entityData[6][propertyName];
        else if (propertyName === 'color')
            entityData[6][propertyName] = new Color('#0c0c0c');
        else if (propertyName === 'house')
            entityData[6][propertyName] = house2;
        else
            throw `Unknown property '${propertyName}'`;
        expect(instance.value).toBe(entityData[6][propertyName]);

        entityData.cursor = entityData[0];
        expect(instance.value).toBe(entityData[0][propertyName]);

        entityData.cursor = entityData[5];
        expect(instance.value).toBe(entityData[5][propertyName]);

        entityData.cursor = entityData[6];
        expect(instance.value).toBe(entityData[6][propertyName]);

        entityData.cursor = null;
        expect(instance.value).toBeNull();

        entityData.cursor = entityData[2];
        expect(instance.value).toBe(entityData[2][propertyName]);

        entityData.cursor = undefined;
        expect(instance.value).toBeNull();
    }

    function expectPlainReverseBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity(model, 'dummy', 'dummy_id');
        const entityData = entity.wrapData([]);
        fill(entityData, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entityData.cursor;
        instance.field = propertyName;

        expect(entityData.cursor).toBe(entityData[6]);
        if (propertyName === 'name')
            entityData[6][propertyName] += ' 1';
        else if (propertyName === 'legs')
            entityData[6][propertyName] += 1;
        else if (propertyName === 'birth')
            entityData[6][propertyName] = new Date();
        else if (propertyName === 'hungry')
            entityData[6][propertyName] = !entityData[6][propertyName];
        else if (propertyName === 'color')
            entityData[6][propertyName] = new Color('#0c0c0c');
        else if (propertyName === 'house')
            entityData[6][propertyName] = house2;
        else
            throw `Unknown property '${propertyName}'`;
        expect(instance.value).toBe(entityData[6][propertyName]);
    }

    function expectPathForwardBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity(model, 'dummy', 'dummy_id');
        const entityData = entity.wrapData([]);
        fill(entityData, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entityData;
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
        return new Promise((resolve) => {
            Invoke.later(() => {
                expect(entityData[6][propertyName]).toBe(instance.value);
                resolve();
            });
        });
    }

    function expectPlainForwardBinding(instance, propertyName) {
        const model = new Model();
        const entity = new Entity(model, 'dummy', 'dummy_id');
        const entityData = entity.wrapData([]);
        fill(entityData, Id, Color);

        expect(instance.value).toBeNull();
        instance.data = entityData.cursor;
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
        return new Promise((resolve) => {
            Invoke.later(() => {
                expect(entityData[6][propertyName]).toBe(instance.value);
                resolve();
            });
        });
    }

    it('ModelColorField.Structure', done => {
        const properyName = 'color';

        expectPathReverseBinding(new ModelColorField(), properyName);
        expectPlainReverseBinding(new ModelColorField(), properyName);

        expectPathForwardBinding(new ModelColorField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelColorField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelDateField.Structure', done => {
        const properyName = 'birth';

        expectPathReverseBinding(new ModelDateField(), properyName);
        expectPlainReverseBinding(new ModelDateField(), properyName);

        expectPathForwardBinding(new ModelDateField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelDateField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelDateTimeField.Structure', done => {
        const properyName = 'birth';

        expectPathReverseBinding(new ModelDateTimeField(), properyName);
        expectPlainReverseBinding(new ModelDateTimeField(), properyName);

        expectPathForwardBinding(new ModelDateTimeField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelDateTimeField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelDropDownField.Structure', done => {
        const properyName = 'house';

        const f1 = new ModelDropDownField();
        f1.values = houses;
        f1.displayField = 'name';
        expectPathReverseBinding(f1, properyName);
        const f2 = new ModelDropDownField();
        f2.values = houses;
        f2.displayField = 'name';
        expectPlainReverseBinding(f2, properyName);

        const f3 = new ModelDropDownField();
        f3.values = houses;
        f3.displayField = 'name';
        expectPathForwardBinding(f3, properyName)
                .then(() => {
                    const f4 = new ModelDropDownField();
                    f4.values = houses;
                    f4.displayField = 'name';
                    return expectPlainForwardBinding(f4, properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelEMailField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelEMailField(), properyName);
        expectPlainReverseBinding(new ModelEMailField(), properyName);

        expectPathForwardBinding(new ModelEMailField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelEMailField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelFormattedField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelFormattedField(), properyName);
        expectPlainReverseBinding(new ModelFormattedField(), properyName);

        expectPathForwardBinding(new ModelFormattedField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelFormattedField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelMeterField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelMeterField(), properyName);
        expectPlainReverseBinding(new ModelMeterField(), properyName);

        expectPathForwardBinding(new ModelMeterField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelMeterField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelNumberField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelNumberField(), properyName);
        expectPlainReverseBinding(new ModelNumberField(), properyName);

        expectPathForwardBinding(new ModelNumberField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelNumberField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelPasswordField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelPasswordField(), properyName);
        expectPlainReverseBinding(new ModelPasswordField(), properyName);

        expectPathForwardBinding(new ModelPasswordField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelPasswordField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelPhoneField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelPhoneField(), properyName);
        expectPlainReverseBinding(new ModelPhoneField(), properyName);

        expectPathForwardBinding(new ModelPhoneField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelPhoneField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelProgressField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelProgressField(), properyName);
        expectPlainReverseBinding(new ModelProgressField(), properyName);

        expectPathForwardBinding(new ModelProgressField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelProgressField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelRichTextArea.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelRichTextArea(), properyName);
        expectPlainReverseBinding(new ModelRichTextArea(), properyName);

        expectPathForwardBinding(new ModelRichTextArea(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelRichTextArea(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelSliderField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelSlider(), properyName);
        expectPlainReverseBinding(new ModelSlider(), properyName);

        expectPathForwardBinding(new ModelSlider(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelSlider(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelTextArea.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelTextArea(), properyName);
        expectPlainReverseBinding(new ModelTextArea(), properyName);

        expectPathForwardBinding(new ModelTextArea(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelTextArea(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelTextField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelTextField(), properyName);
        expectPlainReverseBinding(new ModelTextField(), properyName);

        expectPathForwardBinding(new ModelTextField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelTextField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelTimeField.Structure', done => {
        const properyName = 'legs';

        expectPathReverseBinding(new ModelTimeField(), properyName);
        expectPlainReverseBinding(new ModelTimeField(), properyName);

        expectPathForwardBinding(new ModelTimeField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelTimeField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
    it('ModelUrlField.Structure', done => {
        const properyName = 'name';

        expectPathReverseBinding(new ModelUrlField(), properyName);
        expectPlainReverseBinding(new ModelUrlField(), properyName);

        expectPathForwardBinding(new ModelUrlField(), properyName)
                .then(() => {
                    return expectPlainForwardBinding(new ModelUrlField(), properyName);
                })
                .then(done)
                .catch(done.fail);
    });
});
