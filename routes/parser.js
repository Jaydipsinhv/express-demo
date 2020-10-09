/* eslint-disable no-eval */
/* eslint-disable no-console */
/* eslint-disable max-len */
const _ = require('lodash');

const operatorMapping = {
  AND: '&&',
  OR: '||',
};

/**
 * prepare the expression to evaluate the value either true/false
 * @param {Array} criteria raw data to generate the expression
 * @param {Object} model external input that effect the expression status
 */
const buildExpression = (criteria = [], model = { a: 'testA', b: 'testB' }) => {
  let expressionString = '';
  _.forEach(criteria, (c) => {
    if (c.conditions) {
      // recursive call to get n-level string of expression
      expressionString += ` ${(c.bool ? operatorMapping[c.bool] : '')} (${buildExpression(c.conditions, model)})`;
    } else {
      expressionString += ` ${(c.bool ? operatorMapping[c.bool] : '')} ('${model[c.leftOperand]}' ${c.comparison} '${c.rightOperand}')`;
    }
  });
  return expressionString;
};

// initial simple level criteria
// const criteria = [{
//   comparison: 'Equal',
//   leftOperand: 'a',
//   rightOperand: 'testA',
// }];
// const testResult = `((criteria) => {return ${prepareParser(criteria)}})(criteria)`;

// complex criteria with recursive parser
const criteria = [{
  conditions: [{
    comparison: '===',
    leftOperand: 'a',
    rightOperand: 'testA',
  }, {
    bool: 'AND',
    conditions: [{
      comparison: '===',
      leftOperand: 'b',
      rightOperand: 'testB',
    }, {
      bool: 'OR',
      comparison: '!==',
      leftOperand: 'a',
      rightOperand: 'testA',
    }],
  }],
}];

const expression = `((criteria) => {return ${buildExpression(criteria, { a: 'testA', b: 'testB' })}})(criteria)`;
console.log('------------------------------------');
console.log('Generate Expression : ', expression);
console.log('------------------------------------');

// get the result of the expression either true/false
const expressionResult = eval(expression);
console.log('Expression Result  : ', expressionResult);
console.log('------------------------------------');
// NOTES:
// If you think we can go with this approach we can implement the our rules property as array of object
// Basically, we need to list all the parts which are going to effected by rule
// we can set the availability of parts based on the result of the expression
// let me show you how we can create the rule array of more clarity

const rules = [{
  effectedParts: {
    partA: { availability: true }, // true/false/disabled/ or whatever we need to set to this part
    partB: { availability: false },
  },
  criteria: [{
    conditions: [{
      comparison: '===',
      leftOperand: 'a',
      rightOperand: 'testA',
    }, {
      bool: 'AND',
      conditions: [{
        comparison: '===',
        leftOperand: 'b',
        rightOperand: 'testB',
      }, {
        bool: 'OR',
        comparison: '!==',
        leftOperand: 'a',
        rightOperand: 'testA',
      }],
    }],
  }],
}, {
//  ...
}];
// console.log(rules);
// If we match the expression then we need to update the parts based on effectedParts objects
