export function buttonValue(b: GamepadButton) {
  return typeof b == 'number' ? b : b.value
}
