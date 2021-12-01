//@ https://gist.github.com/Robert-Ro/61369e81b8977b588ac0269feded2785
// https://mp.weixin.qq.com/s/7CD_F0hEZtYRK0fvBWb_gQ
export function debounce(
  func: (...args: unknown[]) => unknown,
  delay: number = 1000,
  immediate:boolean
): (...args: unknown[]) => unknown {
  return () => {};
}
export function throttle(
  func: (...args: unknown[]) => unknown,
  delay: number = 1000
): (...args: unknown[]) => unknown {
  return () => {};
}

export function mapleNew(
  func: (...args: unknown[]) => unknown,
  ...args: unknown[]
): unknown {
  return;
}
export function mapleBind(context: Object): (...args: unknown[]) => unknown {
  return;
}
export function mapleCall(context: Object): unknown {
  return;
}
export function mapleApply(context: Object): unknown {
  return;
}

export function deepCopy(
  obj: Object,
  cache: WeakMap<String | Symbol, unknown>
) {}

interface MapleEventEmitter {
  on(name: string, func: (...args: unknown[]) => unknown);
  off(name: string, func: (...args: unknown[]) => unknown);
  emit(name: string): unknown;
}
//@ts-ignore
export function mapleCurry(
  func: (...args: unknown[]) => unknown
): (...args: unknown[]) => unknown;
//es5 bind
// instanceof
// 异步并发数限制
/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
//@ts-ignore
export function limit<T>(
  count: number,
  array: T[],
  iterateFunc: (...args: unknown[]) => unknown
): unknown {
  return;
}

// 13. 异步串行 | 异步并行
// 14. vue reactive
// 15. promise
// 16. 数组扁平化
// 17. 对象扁平化
// 18. 图片懒加载
