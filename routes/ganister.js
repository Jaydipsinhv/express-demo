/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
/* eslint-disable no-console */
const express = require('express');
const _ = require('lodash');
const availableOptions = require('./availableOptions.json');
const sampleTest = require('./samples');

// we are using the Router method to handle the author routes individually
const router = express.Router();

// get all the available options for provided JSON
// Normally we get the data from the database query
// localhost:3000/ganister/options - POSTMAN

router.get('/options', (req, res) => res.status(200).json(availableOptions));

// get BOM object based on user inputs
// localhost:3000/ganister/bom?tou=tou002&pn=pn002&ja=ja002 - POSTMAN
router.get('/bom', (req, res) => {
  const {
    an, tou, ja, pn,
  } = req.query;
  console.log(an, tou, ja, pn);
  const samples = _.cloneDeep(sampleTest);
  const {
    baseSample, antenna, antennaVariant, wheels, tyreVariants, rimVariant,
  } = samples;

  if (an !== 'an003' && tou !== 'tou001') {
    // prepare the antenna object
    antennaVariant[1].available = false;
  }
  antenna.variants.push(antennaVariant);

  if (ja === 'ja001' && (pn === 'pn003' || pn === 'pn004' || pn === 'pn002')) {
    tyreVariants[0].available = false;
    rimVariant[0].available = false;
    wheels.components[0].variants = tyreVariants;
    wheels.components[1].variants = rimVariant;
  } else if (ja === 'ja002' && (pn === 'pn005' || pn === 'pn002')) {
    tyreVariants[2].available = false;
    tyreVariants[3].available = false;
    rimVariant[1].available = false;
    wheels.components[0].variants = tyreVariants;
    wheels.components[1].variants = rimVariant;
  } else {
    wheels.components[0].variants = tyreVariants;
    wheels.components[1].variants = rimVariant;
  }
  baseSample.components.push(wheels);
  baseSample.components.push(antenna);

  return res.status(200).json(baseSample);
});

module.exports = router;


/*

var boolMeaning = {
          "AND": '&&',
          "OR": '||',
          "*": '*',
          "/": '/',
          "+": '+',
          "-": '-',
          "%": '%'
        }
        
function parseCriteria(procId, criteria, format, model) {
          var val = '';
          _.forEach(criteria, function (c) {

            if(c.conditions){
              val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + '(' + parseCriteria(procId, c.conditions, format, model) + ')';
            } else {
              if(!_.isUndefined(c.comparison) && c.comparison !== null) {
                val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + operators[c.comparison](c.leftOperand, c.rightOperand, _.isObject(c.leftOperand) ? c.leftOperand.type.format.title : format);
              } else {
                if(!_.isUndefined(c.leftOperand) && c.leftOperand !== null) {
                  if(c.leftOperand['type']['format']['title'] === 'Exponential'){
                    val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + '(model[\'' + c.leftOperand['s#'] +'-'+ c.leftOperand['parentId'] + '\'] * (Math.pow(10, ' + c.leftOperand['type']['format']['metadata']['power'] + ')))';
                  } else {
                    val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + '(model[\'' + c.leftOperand['s#'] +'-'+ c.leftOperand['parentId'] + '\'])';
                  }
                } else if(!_.isUndefined(c.rightOperand) && c.rightOperand !== null) {
                  if(_.isObject(c.rightOperand) && c.rightOperand['type']['format']['title'] === 'Exponential'){
                    val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + (_.isObject(c.rightOperand) ? '(model[\'' + c.rightOperand['s#'] +'-'+ c.rightOperand['parentId'] + '\'] * (Math.pow(10, ' + c.rightOperand['type']['format']['metadata']['power'] + ')))' : parseFloat(c.rightOperand) ? parseFloat(c.rightOperand) : 0);
                  } else {
                    val = val + ' ' + (c.bool ? ' ' + boolMeaning[c.bool] + ' ' : '') + (_.isObject(c.rightOperand) ? '(model[\'' + c.rightOperand['s#'] +'-'+ c.rightOperand['parentId'] + '\'])' : parseFloat(c.rightOperand) ? parseFloat(c.rightOperand) : 0);
                  }
                }
              }
            }
          });
          return val;
        }
*/