export class ExchangeValidationRules {
  static notSame(nameFrom, nameTo) {
    return { type: 'notSame', valid: nameFrom !== nameTo }
  }

  static isLessOrEqual(value, max) {
    return { type: 'isLessOrEqual', valid: +value <= max };
  }

  static notZero(value) {
    return { type: 'isLessOrEqual', valid: +value !== 0 };
  }

  static isNumerical(value) {
    return { type: 'isNumerical', valid: !isNaN(Number(value)) };
  }

  static validate(rules = []) {
    return rules.filter(rule => !rule.valid);
  }
}
