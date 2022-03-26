(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dag"] = factory();
	else
		root["Airflow"] = root["Airflow"] || {}, root["Airflow"]["dag"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultFormat; });
/* unused harmony export defaultFormatWithTZ */
/* unused harmony export defaultTZFormat */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dateTimeAttrFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return formatTimezone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isoDateToTimeEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return formatDateTime; });
/* unused harmony export convertAndFormatUTC */
/* unused harmony export secondsToString */
/* unused harmony export updateAllDateTimes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setDisplayedTimezone; });
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

/* global moment, $, document */
const defaultFormat = 'YYYY-MM-DD, HH:mm:ss';
const defaultFormatWithTZ = 'YYYY-MM-DD, HH:mm:ss z';
const defaultTZFormat = 'z (Z)';
const dateTimeAttrFormat = 'YYYY-MM-DDThh:mm:ssTZD';
function formatTimezone(what) {
  if (what instanceof moment) {
    return what.isUTC() ? 'UTC' : what.format(defaultTZFormat);
  }

  if (what === 'UTC') {
    return what;
  }

  return moment().tz(what).format(defaultTZFormat);
}
function isoDateToTimeEl(datetime, options) {
  const dateTimeObj = moment(datetime);
  const addTitle = $.extend({
    title: true
  }, options).title;
  const el = document.createElement('time');
  el.setAttribute('datetime', dateTimeObj.format());

  if (addTitle) {
    el.setAttribute('title', dateTimeObj.isUTC() ? '' : `UTC: ${dateTimeObj.clone().utc().format()}`);
  }

  el.innerText = dateTimeObj.format(defaultFormat);
  return el;
}
const formatDateTime = datetime => moment(datetime).format(defaultFormatWithTZ);
const convertAndFormatUTC = (datetime, tz) => {
  let dateTimeObj = moment.utc(datetime);
  if (tz) dateTimeObj = dateTimeObj.tz(tz);
  return dateTimeObj.format(defaultFormatWithTZ);
};
const secondsToString = seconds => {
  const numdays = Math.floor(seconds % 31536000 / 86400);
  const numhours = Math.floor(seconds % 31536000 % 86400 / 3600);
  const numminutes = Math.floor(seconds % 31536000 % 86400 % 3600 / 60);
  const numseconds = Math.floor(seconds % 31536000 % 86400 % 3600 % 60);
  return (numdays > 0 ? numdays + (numdays === 1 ? ' day ' : ' days ') : '') + (numhours > 0 ? numhours + (numhours === 1 ? ' hour ' : ' hours ') : '') + (numminutes > 0 ? numminutes + (numminutes === 1 ? ' minute ' : ' minutes ') : '') + (numseconds > 0 ? numseconds + (numseconds === 1 ? ' second' : ' seconds') : '');
};
function updateAllDateTimes() {
  // Called after `moment.tz.setDefault` has changed the default TZ to display.
  $('time[data-datetime-convert!="false"]').each((_, el) => {
    const $el = $(el);
    const dt = moment($el.attr('datetime')); // eslint-disable-next-line no-underscore-dangle

    if (dt._isValid) {
      $el.text(dt.format(defaultFormat));
    }

    if ($el.attr('title') !== undefined) {
      // If displayed date is not UTC, have the UTC date in a title attribute
      $el.attr('title', dt.isUTC() ? '' : `UTC: ${dt.clone().utc().format()}`);
    }
  }); // Update any date-time inputs.
  //
  // Since we have set the default timezone for moment, it will automatically
  // convert it to the new target for us

  $('.datetime input').each((_, el) => {
    el.value = moment(el.value).format();
  });
}
function setDisplayedTimezone(tz) {
  moment.tz.setDefault(tz);
  updateAllDateTimes();
}

/***/ }),
/* 1 */
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
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dagTZ", function() { return dagTZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callModal", function() { return callModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callModalDag", function() { return callModalDag; });
/* harmony import */ var _meta_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _datetime_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
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

/* global document, window, $ */



function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';

  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }

  return `${uri}${separator}${key}=${value}`;
} // Pills highlighting


$(window).on('load', function onLoad() {
  $(`a[href*="${this.location.pathname}"]`).parent().addClass('active');
  $('.never_active').removeClass('active');
});
const dagId = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('dag_id');
const dagTZ = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('dag_timezone');
const logsWithMetadataUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('logs_with_metadata_url');
const externalLogUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('external_log_url');
const extraLinksUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('extra_links_url');
const pausedUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('paused_url');
const nextRun = {
  createAfter: Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('next_dagrun_create_after'),
  intervalStart: Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('next_dagrun_data_interval_start'),
  intervalEnd: Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('next_dagrun_data_interval_end')
};
let taskId = '';
let executionDate = '';
let subdagId = '';
const showExternalLogRedirect = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('show_external_log_redirect') === 'True';
const buttons = Array.from(document.querySelectorAll('a[id^="btn_"][data-base-url]')).reduce((obj, elm) => {
  obj[elm.id.replace('btn_', '')] = elm;
  return obj;
}, {});

function updateButtonUrl(elm, params) {
  elm.setAttribute('href', `${elm.dataset.baseUrl}?${$.param(params)}`);
}

function updateModalUrls() {
  updateButtonUrl(buttons.subdag, {
    dag_id: subdagId,
    execution_date: executionDate
  });
  updateButtonUrl(buttons.task, {
    dag_id: dagId,
    task_id: taskId,
    execution_date: executionDate
  });
  updateButtonUrl(buttons.rendered, {
    dag_id: dagId,
    task_id: taskId,
    execution_date: executionDate
  });

  if (buttons.rendered_k8s) {
    updateButtonUrl(buttons.rendered_k8s, {
      dag_id: dagId,
      task_id: taskId,
      execution_date: executionDate
    });
  }

  updateButtonUrl(buttons.ti, {
    _flt_3_dag_id: dagId,
    _flt_3_task_id: taskId,
    _oc_TaskInstanceModelView: executionDate
  });
  updateButtonUrl(buttons.log, {
    dag_id: dagId,
    task_id: taskId,
    execution_date: executionDate
  });
} // Update modal urls on toggle


document.addEventListener('click', event => {
  if (event.target.matches('button[data-toggle="button"]')) {
    updateModalUrls();
  }
});
function callModal(t, d, extraLinks, tryNumbers, sd) {
  taskId = t;
  const location = String(window.location);
  $('#btn_filter').on('click', () => {
    window.location = updateQueryStringParameter(location, 'root', taskId);
  });
  subdagId = sd;
  executionDate = d;
  $('#task_id').text(t);
  $('#execution_date').text(Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(d));
  $('#taskInstanceModal').modal({});
  $('#taskInstanceModal').css('margin-top', '0');
  $('#extra_links').prev('hr').hide();
  $('#extra_links').empty().hide();
  if (subdagId === undefined) $('#div_btn_subdag').hide();else {
    $('#div_btn_subdag').show();
    subdagId = `${dagId}.${t}`;
  }
  $('#dag_dl_logs').hide();
  $('#dag_redir_logs').hide();

  if (tryNumbers > 0) {
    $('#dag_dl_logs').show();

    if (showExternalLogRedirect) {
      $('#dag_redir_logs').show();
    }
  }

  updateModalUrls();
  $('#try_index > li').remove();
  $('#redir_log_try_index > li').remove();
  const startIndex = tryNumbers > 2 ? 0 : 1;

  for (let index = startIndex; index < tryNumbers; index += 1) {
    let url = `${logsWithMetadataUrl}?dag_id=${encodeURIComponent(dagId)}&task_id=${encodeURIComponent(taskId)}&execution_date=${encodeURIComponent(executionDate)}&metadata=null` + '&format=file';
    let showLabel = index;

    if (index !== 0) {
      url += `&try_number=${index}`;
    } else {
      showLabel = 'All';
    }

    $('#try_index').append(`<li role="presentation" style="display:inline">
      <a href="${url}"> ${showLabel} </a>
      </li>`);

    if (index !== 0 || showExternalLogRedirect) {
      const redirLogUrl = `${externalLogUrl}?dag_id=${encodeURIComponent(dagId)}&task_id=${encodeURIComponent(taskId)}&execution_date=${encodeURIComponent(executionDate)}&try_number=${index}`;
      $('#redir_log_try_index').append(`<li role="presentation" style="display:inline">
      <a href="${redirLogUrl}"> ${showLabel} </a>
      </li>`);
    }
  }

  if (extraLinks && extraLinks.length > 0) {
    const markupArr = [];
    extraLinks.sort();
    $.each(extraLinks, (i, link) => {
      const url = `${extraLinksUrl}?task_id=${encodeURIComponent(taskId)}&dag_id=${encodeURIComponent(dagId)}&execution_date=${encodeURIComponent(executionDate)}&link_name=${encodeURIComponent(link)}`;
      const externalLink = $('<a href="#" class="btn btn-primary disabled"></a>');
      const linkTooltip = $('<span class="tool-tip" data-toggle="tooltip" style="padding-right: 2px; padding-left: 3px" data-placement="top" ' + 'title="link not yet available"></span>');
      linkTooltip.append(externalLink);
      externalLink.text(link);
      $.ajax({
        url,
        cache: false,

        success(data) {
          externalLink.attr('href', data.url); // open absolute (external) links in a new tab/window and relative (local) links
          // directly

          if (/^(?:[a-z]+:)?\/\//.test(data.url)) {
            externalLink.attr('target', '_blank');
          }

          externalLink.removeClass('disabled');
          linkTooltip.tooltip('disable');
        },

        error(data) {
          linkTooltip.tooltip('hide').attr('title', data.responseJSON.error).tooltip('fixTitle');
        }

      });
      markupArr.push(linkTooltip);
    });
    const extraLinksSpan = $('#extra_links');
    extraLinksSpan.prev('hr').show();
    extraLinksSpan.append(markupArr).show();
    extraLinksSpan.find('[data-toggle="tooltip"]').tooltip();
  }
}
function callModalDag(dag) {
  $('#dagModal').modal({});
  $('#dagModal').css('margin-top', '0');
  executionDate = dag.execution_date;
  updateButtonUrl(buttons.dag_graph_view, {
    dag_id: dag && dag.dag_id,
    execution_date: dag && dag.execution_date
  });
} // Task Instance Modal actions

$('form[data-action]').on('submit', function submit(e) {
  e.preventDefault();
  const form = $(this).get(0); // Somehow submit is fired twice. Only once is the executionDate valid

  if (executionDate) {
    form.execution_date.value = executionDate;
    form.origin.value = window.location;

    if (form.task_id) {
      form.task_id.value = taskId;
    }

    form.action = $(this).data('action');
    form.submit();
  }
}); // DAG Modal actions

$('form button[data-action]').on('click', function onClick() {
  const form = $(this).closest('form').get(0); // Somehow submit is fired twice. Only once is the executionDate valid

  if (executionDate) {
    form.execution_date.value = executionDate;
    form.origin.value = window.location;

    if (form.task_id) {
      form.task_id.value = taskId;
    }

    form.action = $(this).data('action');
    form.submit();
  }
});
$('#pause_resume').on('change', function onChange() {
  const $input = $(this);
  const id = $input.data('dag-id');
  const isPaused = $input.is(':checked');
  const url = `${pausedUrl}?is_paused=${isPaused}&dag_id=${encodeURIComponent(id)}`; // Remove focus on element so the tooltip will go away

  $input.trigger('blur');
  $input.removeClass('switch-input--error');
  $.post(url).fail(() => {
    setTimeout(() => {
      $input.prop('checked', !isPaused);
      $input.addClass('switch-input--error');
    }, 500);
  });
});
$('#next-run').on('mouseover', () => {
  $('#next-run').attr('data-original-title', () => {
    let newTitle = '';
    if (nextRun.createAfter) newTitle += `<strong>Run After:</strong> ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(nextRun.createAfter)}<br><br>`;

    if (nextRun.intervalStart && nextRun.intervalEnd) {
      newTitle += '<strong>Data Interval</strong><br>';
      newTitle += `Start: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(nextRun.intervalStart)}<br>`;
      newTitle += `End: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(nextRun.intervalEnd)}`;
    }

    return newTitle;
  });
});

/***/ })
/******/ ]);
});