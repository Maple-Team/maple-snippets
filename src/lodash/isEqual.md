# isEqual

## syntax

```js
isEqual(value, other)
```

执行深比较来确定两者的值是否相等。

**注意**: 这个方法支持比较 `arrays`, `array buffers`, `booleans`, `date objects`, `error objects`, `maps`, `numbers`, `Object objects`, `regexes`, `sets`, `strings`, `symbols`, 以及 `typed arrays`. _`Object`对象值比较自身的属性_，不包括继承的和可枚举的属性。Functions and DOM nodes are compared by strict equality, i.e. ===.。

## Resources

- [isEqual 文档](https://www.lodashjs.com/docs/lodash.isEqual)
- [isEqual doc](https://lodash.com/docs/4.17.15#isEqual)
