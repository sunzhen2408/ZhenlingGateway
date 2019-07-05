/**
 * Multi level sensor.
 *
 * UI element representing a sensor with multiple levels.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const Thing = require('./thing');
const Utils = require('../../utils');

class MultiLevelSensor extends Thing {
  /**
   * MultiLevelSensor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {Number} format See Constants.ThingFormat
   */
  constructor(model, description, format) {
    super(
      model,
      description,
      format,
      {
        baseIcon: '/optimized-images/thing-icons/multi_level_sensor.svg',
      }
    );
  }

  /**
   * Find any properties required for this view.
   */
  findProperties() {
    // this.levelProperty = null;
    this.levelProperty = [];
    console.log("1");
    // Look for properties by type first.
    for (const name in this.displayedProperties) {
      const type = this.displayedProperties[name].property['@type'];

      if (type === 'LevelProperty') {
        // this.levelProperty = name;
        this.levelProperty.push(name);
        break;
      }
    }

    // If necessary, match on name.
    if (this.levelProperty === null &&
        this.displayedProperties.hasOwnProperty('level')) {
      // this.levelProperty = 'level';
      this.levelProperty.add('level');
    }
  }

  get icon() {
    return this.element.querySelector('webthing-multi-level-sensor-capability');
  }

  /**
   * Update the display for the provided property.
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   */

  updateProperty(name, value) {
    // console.log('name:'+name);
    // console.log('value:'+value);
    if (name == 'temperature') {
      value = value / 10.0;
    }
    if (name == 'humidity') {
      value = value / 10.0;
    }
    super.updateProperty(name, value);
    if (!this.displayedProperties.hasOwnProperty(name)) {
      return;
    }
    console.log("this.levelProperty")
    console.log(this.levelProperty)
    //temp
    if (name === this.levelProperty) {
      console.log(this.levelProperty)
      console.log("inner this.levelProperty")
      value = parseFloat(value);
      this.icon.level = value;
    }

    // if (name === this.levelProperty) {
    // if (this.levelProperty.indexOf(name) !== -1) {
    //   console.log("我现在是: "+name);
    //   console.log("列表里有: "+this.levelProperty);
      value = parseFloat(value);
      if (name == 'temperature') {
        this.icon.temperature = value;
      }else if (name == 'pm2p5CC') {
        this.icon.pm25 = value;
      }else if (name == 'humidity') {
        this.icon.humidity = value;
      }else if (name == 'CH20NH3') {
        this.icon.CH20NH3 = value;
      }else if (name == 'VOCH2S') {
        this.icon.VOCH2S = value;
      }
    // }
  }

  iconView() {
    let unit = '';
    for (const name in this.displayedProperties) {
      const property = this.displayedProperties[name].property;
      if (name === 'level' || property['@type'] === 'LevelProperty') {
        unit = property.unit || '';
        break;
      }
    }

    unit = Utils.escapeHtml(Utils.unitNameToAbbreviation(unit));
    return `
      <webthing-multi-level-sensor-capability data-unit="${unit}">
      </webthing-multi-level-sensor-capability>`;
  }
}

module.exports = MultiLevelSensor;
