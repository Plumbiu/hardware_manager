interface ISpanMethod {
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

export {
  ISpanMethod,
  IHardware
}