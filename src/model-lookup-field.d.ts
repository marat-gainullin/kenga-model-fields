import Field from 'kenga-fields/lookup-field'
import Bound from 'kenga/bound'
import Decorator from 'kenga/decorator'
import Widget from 'kenga/widget'

export default class ModelLookupField extends Field implements Bound, Decorator {
  data: any
  field: string

  selector: HTMLElement
  clearer: HTMLElement

  nullable: boolean
  onValueSelect: (source: Widget) => void
  /**
   * An array of objects, used for lookup.
   */
  values: any[]
  /**
   * A function which will be called to compute a label for object in #values.
   */
  onRender: (item : any) => string
  /**
   * A property of object in #values, with will be used as label for the drop-down items.
   */
  displayField: string
}
