import { Type } from '@nestjs/common';

// we can't change function name
// but we can create new one with specific name

export function asClassWithName(classType: Type, className: string): Type {
  const res = { [className]() {} };
  res[className].prototype = classType.prototype;
  return res[className] as unknown as Type;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function asFunctionWithName(fn: Function, newFnName: string): Function {
  const res = {
    [newFnName](...args) {
      return fn.apply(this, args);
    },
  };

  return res[newFnName];
}
