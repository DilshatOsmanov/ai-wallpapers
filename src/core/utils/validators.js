import { helpers } from '@vuelidate/validators'

const customNumeric = helpers.withParams({ type: 'numeric' }, (value) => {
  if (!value) return true
  const parsedValue = value.toString().replace(',', '.')
  const numberValue = parseFloat(parsedValue)
  return !isNaN(numberValue) && numberValue > 0
})

export { customNumeric }
