import { debounce } from ".";
jest.useFakeTimers();
describe("utils test suits", () => {
  describe("debounce", () => {
    it("execute just once", () => {
      let func: jest.Mock;
      let debouncedFunc: Function;
      func = jest.fn();
      debouncedFunc = debounce(func, 1000);

      for (let i = 0; i < 100; i++) {
        debouncedFunc();
      }

      jest.runAllTimers(); //执行所有的macro-task
      expect(func).toBeCalled();
      expect(func).toHaveBeenCalledTimes(1);
    });
    it('execute before timeout', ()=>{

    })
    it('execute after timeout', ()=>{

    })
  });
});
