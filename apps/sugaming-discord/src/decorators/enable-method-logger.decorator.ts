import { Logger } from '@nestjs/common';

export const EnableMethodLoggerDecorator = () => {
  return (
    target: { constructor: { name: string } },
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    const logger = new Logger(target.constructor.name);

    // Rewrite the original method with try/catch wrapper
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (...args: never) => {
      logger.log(`START: ${propertyKey}()`);
      try {
        const result = originalMethod.apply(this, args);

        // Check if the method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          try {
            await result;
          } catch (error) {
            logger.error(`ERROR: ${propertyKey}(): ${error}`);
            return error.message;
          }
        }

        // Return actual result
        return result;
      } catch (error) {
        logger.error(`ERROR: ${originalMethod.name}(): ${error}`);
        return error.message;
      } finally {
        logger.log(`END: ${propertyKey}()`);
      }
    };

    return descriptor;
  };
};
