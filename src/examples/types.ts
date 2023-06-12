import type { TableColumnCtx } from 'element-plus'
interface IHardware {
  id: number
  name: string
  type: string
  box_num: string
  col: string
  row: string
  createdAt: Date
}

interface ISpanMethod {
  row: IHardware
  column: TableColumnCtx<IHardware>
  rowIndex: number
  columnIndex: number
}
interface IHardware {
  id:        number
  createdAt: Date
  updatedAt: Date
  box_num:   string
  name:     string
  type:     string
  col:     string
  row:     string
}

type TEdit = 'update' | 'delete'

type TUpdate = 'submit' | 'cancel'

export {
  ISpanMethod,
  IHardware,
  TEdit,
  TUpdate
}