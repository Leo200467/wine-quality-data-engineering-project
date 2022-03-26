(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["connectionForm"] = factory();
	else
		root["Airflow"] = root["Airflow"] || {}, root["Airflow"]["connectionForm"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getMetaValue; });
/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* global document */
function getMetaValue(name) {
  const elem = document.querySelector(`meta[name="${name}"]`);

  if (!elem) {
    return null;
  }

  return elem.getAttribute('content');
}

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _meta_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Created by janomar on 23/07/15.
 */

/* global document, DOMParser, $ */

const restApiEnabled = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('rest_api_enabled') === 'True';
const connectionTestUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('test_url');

function decode(str) {
  return new DOMParser().parseFromString(str, 'text/html').documentElement.textContent;
}
/**
 * Returns a map of connection type to its controls.
 */


function getConnTypesToControlsMap() {
  const connTypesToControlsMap = new Map();
  const extraFormControls = Array.from(document.querySelectorAll("[id^='extra__'"));
  extraFormControls.forEach(control => {
    const connTypeEnd = control.id.indexOf('__', 'extra__'.length);
    const connType = control.id.substring('extra__'.length, connTypeEnd);
    const controls = connTypesToControlsMap.has(connType) ? connTypesToControlsMap.get(connType) : [];
    controls.push(control.parentElement.parentElement);
    connTypesToControlsMap.set(connType, controls);
  });
  return connTypesToControlsMap;
}
/**
 * Returns the DOM element that contains the different controls.
 */


function getControlsContainer() {
  return document.getElementById('conn_id').parentElement.parentElement.parentElement;
}
/**
   * Restores the behaviour for all fields. Used to restore fields to a
   * well-known state during the change of connection types.
   */


function restoreFieldBehaviours() {
  Array.from(document.querySelectorAll('label[data-orig-text]')).forEach(elem => {
    elem.innerText = elem.dataset.origText;
    delete elem.dataset.origText;
  });
  Array.from(document.querySelectorAll('.form-control')).forEach(elem => {
    elem.placeholder = '';
    elem.parentElement.parentElement.classList.remove('hide');
  });
}
/**
   * Applies special behaviour for fields. The behaviour is defined through
   * config, passed by the server.
   *
   * @param {string} connection The connection object to apply to.
   */


function applyFieldBehaviours(connection) {
  if (connection) {
    if (Array.isArray(connection.hidden_fields)) {
      connection.hidden_fields.forEach(field => {
        document.getElementById(field).parentElement.parentElement.classList.add('hide');
      });
    }

    if (connection.relabeling) {
      Object.keys(connection.relabeling).forEach(field => {
        const label = document.querySelector(`label[for='${field}']`);
        label.dataset.origText = label.innerText;
        label.innerText = connection.relabeling[field];
      });
    }

    if (connection.placeholders) {
      Object.keys(connection.placeholders).forEach(field => {
        const placeholder = connection.placeholders[field];
        document.getElementById(field).placeholder = placeholder;
      });
    }
  }
}

$(document).ready(() => {
  const fieldBehavioursElem = document.getElementById('field_behaviours');
  const config = JSON.parse(decode(fieldBehavioursElem.textContent)); // Prevent login/password fields from triggering browser auth extensions

  const form = document.getElementById('model_form');
  if (form) form.setAttribute('autocomplete', 'off'); // Save all DOM elements into a map on load.

  const controlsContainer = getControlsContainer();
  const connTypesToControlsMap = getConnTypesToControlsMap(); // Create a test connection button & insert it right next to the save (submit) button

  const testConnBtn = $('<button id="test-connection" type="button" class="btn btn-sm btn-primary" ' + 'style="margin-left: 3px; pointer-events: all">Test\n <i class="fa fa-rocket"></i></button>');

  if (!restApiEnabled) {
    $(testConnBtn).addClass('disabled').attr('title', 'Airflow REST APIs have been disabled. ' + 'See api->auth_backend section of the Airflow configuration.');
  }

  $(testConnBtn).insertAfter($('form#model_form div.well.well-sm button:submit'));
  /**
   * Changes the connection type.
   * @param {string} connType The connection type to change to.
   */

  function changeConnType(connType) {
    Array.from(connTypesToControlsMap.values()).forEach(controls => {
      controls.filter(control => control.parentElement === controlsContainer).forEach(control => controlsContainer.removeChild(control));
    });
    const controls = connTypesToControlsMap.get(connType) || [];
    controls.forEach(control => controlsContainer.appendChild(control)); // Restore field behaviours.

    restoreFieldBehaviours(); // Apply behaviours to fields.

    applyFieldBehaviours(config[connType]);
  }
  /**
   * Produces JSON stringified data from a html form data
   *
   * @param {string} selector Jquery from selector string.
   * @returns {string} Form data as a JSON string
   */


  function getSerializedFormData(selector) {
    const outObj = {};
    const inArray = $(selector).serializeArray();
    $.each(inArray, function () {
      if (this.name === 'conn_id') {
        outObj.connection_id = this.value;
      } else if (this.value !== '' && this.name === 'port') {
        outObj[this.name] = Number(this.value);
      } else if (this.value !== '' && this.name !== 'csrf_token') {
        outObj[this.name] = this.value;
      }
    });
    return JSON.stringify(outObj);
  }
  /**
   * Displays the Flask style alert on UI via JS
   *
   * @param {boolean} status - true for success, false for error
   * @param {string} message - The text message to show in alert box
   */


  function displayAlert(status, message) {
    const alertClass = status ? 'alert-success' : 'alert-error';
    let alertBox = $('.container .row .alert');

    if (alertBox.length) {
      alertBox.removeClass('alert-success').removeClass('alert-error');
      alertBox.addClass(alertClass);
      alertBox.text(message);
      alertBox.show();
    } else {
      alertBox = $(`<div class="alert ${alertClass}">\n` + `<button type="button" class="close" data-dismiss="alert">×</button>\n${message}</div>`);
      $('.container .row').prepend(alertBox).show();
    }
  } // Bind click event to Test Connection button & perform an AJAX call via REST API


  $('#test-connection').on('click', e => {
    e.preventDefault();
    $.ajax({
      url: connectionTestUrl,
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      data: getSerializedFormData('form#model_form'),

      success(data) {
        displayAlert(data.status, data.message);
      },

      error(jq, err, msg) {
        displayAlert(false, msg);
      }

    });
  });
  const connTypeElem = document.getElementById('conn_type');
  $(connTypeElem).on('change', e => {
    const connType = e.target.value;
    changeConnType(connType);
  }); // Initialize the form by setting a connection type.

  changeConnType(connTypeElem.value);
});

/***/ })

/******/ });
});