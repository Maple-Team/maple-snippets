{
  function IsConstructor1(o) {
    if (typeof o !== "function") return false;
    o = Object.assign(o.bind(), { prototype: null });
    try {
      //@ts-ignore
      return class extends o {}, true;
    } catch {
      return false;
    }
  }
}
{
  function IsConstructor(o) {
    const mark = {};
    const args = {
      get length() {
        throw mark;
      },
    };
    try {
      //@ts-ignore
      Reflect.construct(o, args);
    } catch (e) {
      return e === mark;
    }
  }
}
