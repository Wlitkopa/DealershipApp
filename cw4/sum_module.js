

// const EventEmitter = require('node:events');

// module.exports = class Operation {}

class Operations {


    /**
   * Save given numbers as attributes.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
 * Rozwiązuje równanie typu x + y = r
 * @example
 * // returns 15
 * globalNS.method1(5, 10);
 * @example
 * // returns 20
 * globalNS.method(5, 15);
 * @returns {Number} Zwraca wartość r równania.
 */
  sum() {
    let sumResult = 0;
    sumResult = this.x + this.y;
    return sumResult;
  }
};

export { Operations }

