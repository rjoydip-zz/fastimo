export const get = <T extends { new (...args: any[]): {} }>(...args: any[]) => {
  console.log("Console", ...args);
  return (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) => {
    console.log(
      "Method info decorator log >>>>>>  ",
      target,
      " >>> ",
      propertyName,
      " >>> ",
      descriptor
    );
  };
};
