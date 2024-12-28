
export const validationMessages = {
    name: {
      isString: 'Name must be a string',
      notEmpty: 'Name is required',
    },
    value: {
      isNumeric: 'Value must be a number',
      notEmpty: 'Value is required',
    },
    currency: {
      isString: 'Currency must be a string',
      isIn: 'Currency must be one of the following: EUR, USD, GBP, JPY, AUD',
    },
  };
  