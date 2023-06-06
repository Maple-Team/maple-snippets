# Gamepad_API

```js
window.addEventListener('gamepadconnected', (event) => {
  console.log('A gamepad connected:')
  console.log(event.gamepad)
})

window.addEventListener('gamepaddisconnected', (event) => {
  console.log('A gamepad disconnected:')
  console.log(event.gamepad)
})
var gamepads = navigator.getGamepads()
console.log(gamepads)
```

# Resources

- [MDN Gamepad_API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [Gamepad Tester](https://gamepad-tester.com/)
