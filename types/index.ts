import {
  yupAbiConstructorSchema,
  yupAbiEnumSchema,
  yupAbiEventSchema,
  yupAbiFunctionSchema,
  yupAbiImplSchema,
  yupAbiInterfaceSchema,
  yupAbiL1HandlerSchema,
  yupAbiStructSchema,
} from 'starknet-abi-forms'
import * as Yup from 'yup'

const abiSchema = Yup.array().of(
  Yup.object().test(
    'schema-test',
    'Must follow schema of respective type, if type: "function" | "constructor" | "l1_handler" | "struct" | "enum" | "interface" | "impl" | "event"',
    (value: any) => {
      try {
        switch (value.type) {
          case 'function':
            yupAbiFunctionSchema.validateSync(value)
            return true
          case 'constructor':
            yupAbiConstructorSchema.validateSync(value)
            return true
          case 'l1_handler':
            yupAbiL1HandlerSchema.validateSync(value)
            return true
          case 'struct':
            yupAbiStructSchema.validateSync(value)
            return true
          case 'enum':
            yupAbiEnumSchema.validateSync(value)
            return true
          case 'interface':
            yupAbiInterfaceSchema.validateSync(value)
            return true
          case 'impl':
            yupAbiImplSchema.validateSync(value)
            return true
          case 'event':
            yupAbiEventSchema.validateSync(value)
            return true
          default:
            return false
        }
      } catch (e: any) {
        throw new Yup.ValidationError(e)
      }
    }
  )
)

type CallbackReturnType = {
  functionName: string
  stateMutability: string
  inputs: any[]
}


export { abiSchema }

export type { CallbackReturnType }
