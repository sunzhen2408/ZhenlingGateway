/**
 * LabelCapability
 *
 * A bubble showing an icon with a label.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

const BaseComponent = require('../base-component');

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      contain: content;
      text-align: center;
      color: white;
      font-size: 1rem;
      cursor: default;
    }

    .webthing-label-capability-container {
        box-sizing: content-box;
        width: 12rem;
        height: 12rem;
        border-radius: 20rem;
        border: 0.1rem solid white;
        transform: translate(0);
        background-color: #89b6d6;
        text-align: center;
      }
      
    .webthing-label-capability-container-humidity {
      box-sizing: content-box;
      width: 12rem;
      height: 2rem;
      border-radius: 10rem;
      border: 0.1rem solid white;
      transform: translate(0);
      background-color: #89b6d6;
      text-align: center;
    }

    .webthing-label-capability-contents-humidity {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-weight: bold;
      width: 10rem;
    }
    .webthing-label-capability-container-temperature {
      box-sizing: content-box;
      width: 12rem;
      height: 2rem;
      border-radius: 10rem;
      border: 0.1rem solid white;
      transform: translate(0);
      background-color: #89b6d6;
      text-align: center;
    }

    .webthing-label-capability-contents-temperature {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-weight: bold;
      width: 10rem;
    }
    
    .webthing-label-capability-container-pm25 {
      box-sizing: content-box;
      width: 12rem;
      height: 2rem;
      border-radius: 10rem;
      border: 0.1rem solid white;
      transform: translate(0);
      background-color: #89b6d6;
      text-align: center;
    }
    
    .webthing-label-capability-contents-pm25 {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-weight: bold;
      width: 10rem;
    }
    
    .webthing-label-capability-container-VOCH2S {
      box-sizing: content-box;
      width: 12rem;
      height: 2rem;
      border-radius: 10rem;
      border: 0.1rem solid white;
      transform: translate(0);
      background-color: #89b6d6;
      text-align: center;
    }
    
    .webthing-label-capability-contents-VOCH2S {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-weight: bold;
      width: 10rem;
    }
    
    .webthing-label-capability-container-CH20NH3 {
      box-sizing: content-box;
      width: 12rem;
      height: 2rem;
      border-radius: 10rem;
      border: 0.1rem solid white;
      transform: translate(0);
      background-color: #89b6d6;
      text-align: center;
    }
    
    .webthing-label-capability-contents-CH20NH3 {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
      font-weight: bold;
      width: 10rem;
    }
  </style>
  <div id="container" class="webthing-label-capability-container">
    <div id="container1" class="webthing-label-capability-container-humidity">
      <div id="contents_humidity" class="webthing-label-capability-contents-humidity">
        <span id="value_humidity" class="webthing-label-capability-value-humidity">
        </span>
        <span id="unit_humidity" class="webthing-label-capability-unit-humidity"></span>
      </div>
     </div>
      
     <div id="container2" class="webthing-label-capability-container-temperature">
      <div id="contents_temperature" class="webthing-label-capability-contents-temperature">
        <span id="value_temperature" class="webthing-label-capability-value-temperature">
        </span>
        <span id="unit_temperature" class="webthing-label-capability-unit-temperature"></span>
      </div>
     </div>
     
      <div id="container3" class="webthing-label-capability-container-pm25">
      <div id="contents_pm25" class="webthing-label-capability-contents-pm25">
        <span id="value_pm25" class="webthing-label-capability-value-pm25">
        </span>
        <span id="unit_pm25" class="webthing-label-capability-unit-pm25"></span>
      </div>
     </div>
     
     <div id="container4" class="webthing-label-capability-container-VOCH2S">
      <div id="contents_VOCH2S" class="webthing-label-capability-contents-VOCH2S">
        <span id="value_VOCH2S" class="webthing-label-capability-value-VOCH2S">
        </span>
        <span id="unit_VOCH2S" class="webthing-label-capability-unit-VOCH2S"></span>
      </div>
     </div>
     
     <div id="container5" class="webthing-label-capability-container-CH20NH3">
      <div id="contents_CH20NH3" class="webthing-label-capability-contents-CH20NH3">
        <span id="value_CH20NH3" class="webthing-label-capability-value-CH20NH3">
        </span>
        <span id="unit_CH20NH3" class="webthing-label-capability-unit-CH20NH3"></span>
      </div>
     </div>
   </div>
`;

class LabelCapability extends BaseComponent {
  constructor() {
    super(template);
    this._value_humidity = this.shadowRoot.querySelector(
      '.webthing-label-capability-value-humidity');
    this._unit_humidity = this.shadowRoot.querySelector(
      '.webthing-label-capability-unit-humidity');
    this._precision_humidity = 0;
    this._level_humidity = 0;

    this._value_temperature = this.shadowRoot.querySelector(
      '.webthing-label-capability-value-temperature');
    this._unit_temperature = this.shadowRoot.querySelector(
      '.webthing-label-capability-unit-temperature');
    this._precision_temperature = 0;
    this._level_temperature = 0;

    this._value_pm25 = this.shadowRoot.querySelector(
      '.webthing-label-capability-value-pm25');
    this._unit_pm25 = this.shadowRoot.querySelector(
      '.webthing-label-capability-unit-pm25');
    this._precision_pm25 = 0;
    this._level_pm25 = 0;

    this._value_VOCH2S = this.shadowRoot.querySelector(
      '.webthing-label-capability-value-VOCH2S');
    this._unit_VOCH2S = this.shadowRoot.querySelector(
      '.webthing-label-capability-unit-VOCH2S');
    this._precision_VOCH2S = 0;
    this._level_VOCH2S = 0;

    this._value_CH20NH3 = this.shadowRoot.querySelector(
      '.webthing-label-capability-value-CH20NH3');
    this._unit_CH20NH3 = this.shadowRoot.querySelector(
      '.webthing-label-capability-unit-CH20NH3');
    this._precision_CH20NH3 = 0;
    this._level_CH20NH3 = 0;
  }

  connectedCallback() {
    if (!this.level) {
      this.level =
        typeof this.dataset.level !== 'undefined' ? this.dataset.level : 0;
    }

    if (!this.unit) {
      this.unit =
        typeof this.dataset.unit !== 'undefined' ? this.dataset.unit : '';
    }

    if (!this.precision) {
      this.precision =
        typeof this.dataset.precision !== 'undefined' ?
          this.dataset.precision :
          0;
    }
  }
  get level() {
    return this._level;
  }
  //temp level
  set level(value) {
    this._level = Number(value);
    this._value.innerText = this._level.toFixed(this.precision);
  }

  get humidity() {
    return this._level_humidity;
  }

  set humidity(value) {
    this._level_humidity = Number(value);
    this._value_humidity.innerText = '湿度:'+ this._level_humidity.toFixed(this.precision);
  }

  get temperature() {
    return this._level_temperature;
  }
  set temperature(value) {
    this._level_temperature = Number(value);
    this._value_temperature.innerText = '温度:' + this._level_temperature.toFixed(this.precision);
  }

  get pm25() {
    return this._level_pm25;
  }
  set pm25(value) {
    this._level_pm25 = Number(value);
    this._value_pm25.innerText = '烟雾:' + this._level_pm25.toFixed(this.precision);
  }

  get VOCH2S() {
    return this._level_VOCH2S;
  }
  set VOCH2S(value) {
    this._level_VOCH2S = Number(value);
    this._value_VOCH2S.innerText = '臭味:' + this._level_VOCH2S.toFixed(this.precision);
  }

  get CH20NH3() {
    return this._level_CH20NH3;
  }

  set CH20NH3(value) {
    this._level_CH20NH3 = Number(value);
    this._value_CH20NH3.innerText = '异味:' + this._level_CH20NH3.toFixed(this.precision);
  }

  get unit() {
    return this._unit_humidity.innerText;
  }

  set unit(value) {
    this._unit_humidity.innerText = value;
  }

  get precision() {
    return this._precision_humidity;
  }

  set precision(value) {
    this._precision_humidity = parseInt(value, 10);
  }
}

window.customElements.define('webthing-label-capability', LabelCapability);
module.exports = LabelCapability;
