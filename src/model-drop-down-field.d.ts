import Field from 'kenga-fields/drop-down-field';
import Bound from 'kenga/bound';
import Decorator from 'kenga/decorator';
import Widget from 'kenga/widget'

export default class ModelDropDownField extends Field implements Bound, Decorator {
  data: any
  field: string

  selector: HTMLElement
  clearer: HTMLElement

  nullable: boolean
  onValueSelect: (source: Widget) => void
  /**
   * An array of objects, used for drop-down.
   */
  values: any[]
  /**
   * A property of object in #values, with will be used as label for the drop-down items.
   */
  displayField: string
}
