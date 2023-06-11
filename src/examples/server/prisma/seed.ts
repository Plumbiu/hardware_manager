import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const hardware = [
  {
    name: 'LM358',
    type: 'IC',
    row: 'A',
    col: '1',
    box_num: '塑料柜-1',
  },
  {
    name: 'LM324',
    type: 'IC',
    row: 'A',
    col: '2',
    box_num: '塑料柜-1',
  },
  { name: 'OPA227u', type: 'IC', row: 'A', col: '3', box_num: '塑料柜-1' },
  {
    name: 'CSD19536KCS',
    type: 'IC',
    row: 'A',
    col: '4',
    box_num: '塑料柜-1',
  },
  { name: 'OPA330ADI', type: 'IC', row: 'A', col: '5', box_num: '塑料柜-1' },
  { name: 'OPA2227U', type: 'IC', row: 'A', col: '6', box_num: '塑料柜-1' },
  { name: 'NE555', type: 'IC', row: 'B', col: '1', box_num: '塑料柜-1' },
  {
    name: 'STM32F407VET6',
    type: 'IC',
    row: 'B',
    col: '2',
    box_num: '塑料柜-1',
  },
  {
    name: 'UCC21540DW',
    type: 'IC',
    row: 'B',
    col: '3',
    box_num: '塑料柜-1',
  },
  {
    name: 'UCC21540DWKR',
    type: 'IC',
    row: 'B',
    col: '4',
    box_num: '塑料柜-1',
  },
  { name: 'UCC215430', type: 'IC', row: 'B', col: '5', box_num: '塑料柜-1' },
  { name: 'UCC21520', type: 'IC', row: 'B', col: '6', box_num: '塑料柜-1' },
  { name: 'DRV8711', type: 'IC', row: 'C', col: '1', box_num: '塑料柜-1' },
  { name: 'DRV8886', type: 'IC', row: 'C', col: '2', box_num: '塑料柜-1' },
  { name: 'DRV8825', type: 'IC', row: 'C', col: '3', box_num: '塑料柜-1' },
  { name: 'LM5161', type: 'IC', row: 'C', col: '4', box_num: '塑料柜-1' },
  { name: 'IS0224A', type: 'IC', row: 'C', col: '5', box_num: '塑料柜-1' },
  { name: 'ISO0224B', type: 'IC', row: 'C', col: '6', box_num: '塑料柜-1' },
  {
    name: 'TPS5450DDA',
    type: 'IC',
    row: 'D',
    col: '1',
    box_num: '塑料柜-1',
  },
  { name: 'TPS55340', type: 'IC', row: 'D', col: '2', box_num: '塑料柜-1' },
  {
    name: 'TPS04211DGQ',
    type: 'IC',
    row: 'D',
    col: '3',
    box_num: '塑料柜-1',
  },
  {
    name: 'STM32F407ZGT6',
    type: 'IC',
    row: 'D',
    col: '4',
    box_num: '塑料柜-1',
  },
  { name: 'TPS54560', type: 'IC', row: 'D', col: '5', box_num: '塑料柜-1' },
  {
    name: 'STM32F103VCT6',
    type: 'IC',
    row: 'D',
    col: '6',
    box_num: '塑料柜-1',
  },
  {
    name: 'CSD19501KCS',
    type: 'IC',
    row: 'E',
    col: '1',
    box_num: '塑料柜-1',
  },
  { name: 'REF3133', type: 'IC', row: 'E', col: '4', box_num: '塑料柜-1' },
  {
    name: '74HC4040DR',
    type: 'IC',
    row: 'E',
    col: '5',
    box_num: '塑料柜-1',
  },
  { name: 'AMC1311', type: 'IC', row: 'E', col: '6', box_num: '塑料柜-1' },
  { name: 'TLV76050', type: 'IC', row: 'F', col: '1', box_num: '塑料柜-1' },
  { name: 'TLV76012', type: 'IC', row: 'F', col: '2', box_num: '塑料柜-1' },
  { name: 'ACS722', type: '10', row: 'B', col: 'I', box_num: '塑料柜-1' },
  { name: 'ACS722', type: '5A', row: 'B', col: 'C', box_num: '塑料柜-1' },
  { name: 'SX1308', type: 'IC', row: 'F', col: '5', box_num: '塑料柜-1' },
  { name: 'TPS7333', type: 'IC', row: 'F', col: '6', box_num: '塑料柜-1' },
]

async function main() {
  for (const u of hardware) {
    await prisma.hardware.create({
      data: u,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
