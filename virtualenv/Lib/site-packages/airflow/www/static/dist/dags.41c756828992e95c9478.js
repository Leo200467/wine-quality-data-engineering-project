(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dags"] = factory();
	else
		root["Airflow"] = root["Airflow"] || {}, root["Airflow"]["dags"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHtml", function() { return escapeHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertSecsToHumanReadable", function() { return convertSecsToHumanReadable; });
/* harmony import */ var _datetime_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
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

/* global $, moment, Airflow, window, localStorage, document, hostName, csrfToken */

window.isoDateToTimeEl = _datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* isoDateToTimeEl */ "e"];
/*
 We pull moment in via a webpack entrypoint rather than import
 so that we don't put it in more than a single .js file.
 This "exports" it to be globally available.
*/

window.moment = Airflow.moment;

function displayTime() {
  const now = moment();
  $('#clock').attr('datetime', now.format(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* dateTimeAttrFormat */ "a"])).html(`${now.format('HH:mm')} <strong>${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatTimezone */ "d"])(now)}</strong>`);
}

function changDisplayedTimezone(tz) {
  localStorage.setItem('selected-timezone', tz);
  Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* setDisplayedTimezone */ "f"])(tz);
  displayTime();
  $('body').trigger({
    type: 'airflow.timezone-change',
    timezone: tz
  });
}

const el = document.createElement('span');
function escapeHtml(text) {
  el.textContent = text;
  return el.innerHTML;
}
window.escapeHtml = escapeHtml;
function convertSecsToHumanReadable(seconds) {
  const oriSeconds = seconds;
  const floatingPart = oriSeconds - Math.floor(oriSeconds);
  seconds = Math.floor(seconds);
  const secondsPerHour = 60 * 60;
  const secondsPerMinute = 60;
  const hours = Math.floor(seconds / secondsPerHour);
  seconds -= hours * secondsPerHour;
  const minutes = Math.floor(seconds / secondsPerMinute);
  seconds -= minutes * secondsPerMinute;
  let readableFormat = '';

  if (hours > 0) {
    readableFormat += `${hours}Hours `;
  }

  if (minutes > 0) {
    readableFormat += `${minutes}Min `;
  }

  if (seconds + floatingPart > 0) {
    if (Math.floor(oriSeconds) === oriSeconds) {
      readableFormat += `${seconds}Sec`;
    } else {
      seconds += floatingPart;
      readableFormat += `${seconds.toFixed(3)}Sec`;
    }
  }

  return readableFormat;
}
window.convertSecsToHumanReadable = convertSecsToHumanReadable;

function postAsForm(url, parameters) {
  const form = $('<form></form>');
  form.attr('method', 'POST');
  form.attr('action', url);
  $.each(parameters || {}, (key, value) => {
    const field = $('<input></input>');
    field.attr('type', 'hidden');
    field.attr('name', key);
    field.attr('value', value);
    form.append(field);
  });
  const field = $('<input></input>');
  field.attr('type', 'hidden');
  field.attr('name', 'csrf_token');
  field.attr('value', csrfToken);
  form.append(field); // The form needs to be a part of the document in order for us to be able
  // to submit it.

  $(document.body).append(form);
  form.submit();
}

window.postAsForm = postAsForm;

function initializeUITimezone() {
  const local = moment.tz.guess();
  const selectedTz = localStorage.getItem('selected-timezone');
  const manualTz = localStorage.getItem('chosen-timezone');

  function setManualTimezone(tz) {
    localStorage.setItem('chosen-timezone', tz);

    if (tz === local && tz === Airflow.serverTimezone) {
      $('#timezone-manual').hide();
      return;
    }

    $('#timezone-manual a').data('timezone', tz).text(Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatTimezone */ "d"])(tz));
    $('#timezone-manual').show();
  }

  if (manualTz) {
    setManualTimezone(manualTz);
  }

  changDisplayedTimezone(selectedTz || Airflow.defaultUITimezone);

  if (Airflow.serverTimezone !== 'UTC') {
    $('#timezone-server a').html(`${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatTimezone */ "d"])(Airflow.serverTimezone)} <span class="label label-primary">Server</span>`);
    $('#timezone-server').show();
  }

  if (Airflow.serverTimezone !== local) {
    $('#timezone-local a').attr('data-timezone', local).html(`${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatTimezone */ "d"])(local)} <span class="label label-info">Local</span>`);
  } else {
    $('#timezone-local').hide();
  }

  $('a[data-timezone]').click(evt => {
    changDisplayedTimezone($(evt.target).data('timezone'));
  });
  $('#timezone-other').typeahead({
    source: $(moment.tz.names().map(tzName => {
      const category = tzName.split('/', 1)[0];
      return {
        category,
        name: tzName.replace('_', ' '),
        tzName
      };
    })),
    showHintOnFocus: 'all',
    showCategoryHeader: true,
    items: 'all',

    afterSelect(data) {
      // Clear it for next time we open the pop-up
      this.$element.val('');
      setManualTimezone(data.tzName);
      changDisplayedTimezone(data.tzName); // We need to delay the close event to not be in the form handler,
      // otherwise bootstrap ignores it, thinking it's caused by interaction on
      // the <form>

      setTimeout(() => {
        document.activeElement.blur(); // Bug in typeahed, it thinks it's still shown!

        this.shown = false;
        this.focused = false;
      }, 1);
    }

  });
}

$(document).ready(() => {
  initializeUITimezone();
  $('#clock').attr('data-original-title', hostName).attr('data-placement', 'bottom').parent().show();
  displayTime();
  setInterval(displayTime, 1000);
  $.ajaxSetup({
    beforeSend(xhr, settings) {
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader('X-CSRFToken', csrfToken);
      }
    }

  });
  $.fn.datetimepicker.defaults.format = 'YYYY-MM-DD HH:mm:ssZ';
  $.fn.datetimepicker.defaults.sideBySide = true;
  $('.datetimepicker').datetimepicker(); // Fix up filter fields from FAB adds to the page. This event is fired after
  // the FAB registered one which adds the new control

  $('#filter_form a.filter').click(() => {
    $('.datetimepicker').datetimepicker();
  }); // Global Tooltip selector

  $('.js-tooltip').tooltip();
});

/***/ }),
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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tiTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskNoInstanceTooltip", function() { return taskNoInstanceTooltip; });
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _datetime_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _dag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
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

/* global window, moment, convertSecsToHumanReadable */
// We don't re-import moment again, otherwise webpack will include it twice in the bundle!




function makeDateTimeHTML(start, end) {
  // check task ended or not
  const isEnded = end && end instanceof moment && end.isValid();
  return `Started: ${start.format(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* defaultFormat */ "b"])}<br>Ended: ${isEnded ? end.format(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* defaultFormat */ "b"]) : 'Not ended yet'}<br>`;
}

function generateTooltipDateTimes(startTime, endTime, dagTimezone) {
  if (!startTime) {
    return '<br><em>Not yet started</em>';
  }

  const tzFormat = 'z (Z)';
  const localTZ = moment.defaultZone.name.toUpperCase();
  const startDate = moment.utc(startTime);
  const endDate = moment.utc(endTime);
  const dagTz = dagTimezone.toUpperCase(); // Generate UTC Start and End Date

  let tooltipHTML = '<br><strong>UTC:</strong><br>';
  tooltipHTML += makeDateTimeHTML(startDate, endDate); // Generate User's Local Start and End Date, unless it's UTC

  if (localTZ !== 'UTC') {
    startDate.tz(localTZ);
    tooltipHTML += `<br><strong>Local: ${startDate.format(tzFormat)}</strong><br>`;
    const localEndDate = endDate && endDate instanceof moment ? endDate.tz(localTZ) : endDate;
    tooltipHTML += makeDateTimeHTML(startDate, localEndDate);
  } // Generate DAG's Start and End Date


  if (dagTz !== 'UTC' && dagTz !== localTZ) {
    startDate.tz(dagTz);
    tooltipHTML += `<br><strong>DAG's TZ: ${startDate.format(tzFormat)}</strong><br>`;
    const dagTZEndDate = endDate && endDate instanceof moment ? endDate.tz(dagTz) : endDate;
    tooltipHTML += makeDateTimeHTML(startDate, dagTZEndDate);
  }

  return tooltipHTML;
}

function tiTooltip(ti, {
  includeTryNumber = false
} = {}) {
  let tt = '';

  if (ti.state !== undefined) {
    tt += `<strong>Status:</strong> ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(ti.state)}<br><br>`;
  }

  if (ti.task_id !== undefined) {
    tt += `Task_id: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(ti.task_id)}<br>`;
  }

  tt += `Run: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(ti.execution_date)}<br>`;

  if (ti.run_id !== undefined) {
    tt += `Run Id: <nobr>${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(ti.run_id)}</nobr><br>`;
  }

  if (ti.operator !== undefined) {
    tt += `Operator: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(ti.operator)}<br>`;
  } // Calculate duration on the fly if task instance is still running


  if (ti.state === 'running') {
    const startDate = ti.start_date instanceof moment ? ti.start_date : moment(ti.start_date);
    ti.duration = moment().diff(startDate, 'second');
  } else if (!ti.duration && ti.end_date) {
    const startDate = ti.start_date instanceof moment ? ti.start_date : moment(ti.start_date);
    const endDate = ti.end_date instanceof moment ? ti.end_date : moment(ti.end_date);
    ti.duration = moment(endDate).diff(startDate, 'second');
  }

  tt += `Duration: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(convertSecsToHumanReadable(ti.duration))}<br>`;
  const intervalStart = ti.data_interval_start;
  const intervalEnd = ti.data_interval_end;

  if (intervalStart && intervalEnd) {
    tt += '<br><strong>Data Interval:</strong><br>';
    tt += `Start: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(intervalStart)}<br>`;
    tt += `End: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_1__[/* formatDateTime */ "c"])(intervalEnd)}<br>`;
  }

  if (includeTryNumber) {
    tt += `Try Number: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(ti.try_number)}<br>`;
  } // dagTZ has been defined in dag.html


  tt += generateTooltipDateTimes(ti.start_date, ti.end_date, _dag__WEBPACK_IMPORTED_MODULE_2__["dagTZ"] || 'UTC');
  return tt;
}
function taskNoInstanceTooltip(taskId, task) {
  let tt = '';

  if (taskId) {
    tt += `Task_id: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(taskId)}<br>`;
  }

  if (task.task_type !== undefined) {
    tt += `Operator: ${Object(_main__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(task.task_type)}<br>`;
  }

  tt += '<br><em>DAG has yet to run.</em>';
  return tt;
}
window.tiTooltip = tiTooltip;
window.taskNoInstanceTooltip = taskNoInstanceTooltip;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _meta_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _task_instances__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _datetime_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
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

/* global document, window, $, d3, STATE_COLOR, isoDateToTimeEl */



const DAGS_INDEX = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('dags_index');
const ENTER_KEY_CODE = 13;
const pausedUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('paused_url');
const statusFilter = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('status_filter');
const autocompleteUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('autocomplete_url');
const graphUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('graph_url');
const dagRunUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('dag_run_url');
const taskInstanceUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('task_instance_url');
const blockedUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('blocked_url');
const csrfToken = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('csrf_token');
const lastDagRunsUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('last_dag_runs_url');
const dagStatsUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('dag_stats_url');
const taskStatsUrl = Object(_meta_value__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('task_stats_url');
$('#tags_filter').select2({
  placeholder: 'Filter DAGs by tag',
  allowClear: true
});
$('#tags_filter').on('change', e => {
  e.preventDefault();
  const query = new URLSearchParams(window.location.search);

  if (e.val.length) {
    if (query.has('tags')) query.delete('tags');
    e.val.forEach(value => {
      query.append('tags', value);
    });
  } else {
    query.delete('tags');
    query.set('reset_tags', 'reset');
  }

  if (query.has('page')) query.delete('page');
  window.location = `${DAGS_INDEX}?${query.toString()}`;
});
$('#tags_form').on('reset', e => {
  e.preventDefault();
  const query = new URLSearchParams(window.location.search);
  query.delete('tags');
  if (query.has('page')) query.delete('page');
  query.set('reset_tags', 'reset');
  window.location = `${DAGS_INDEX}?${query.toString()}`;
});
$('#dag_query').on('keypress', e => {
  // check for key press on ENTER (key code 13) to trigger the search
  if (e.which === ENTER_KEY_CODE) {
    const query = new URLSearchParams(window.location.search);
    query.set('search', e.target.value.trim());
    query.delete('page');
    window.location = `${DAGS_INDEX}?${query.toString()}`;
    e.preventDefault();
  }
});
$('#page_size').on('change', function onPageSizeChange() {
  const pSize = $(this).val();
  window.location = `${DAGS_INDEX}?page_size=${pSize}`;
});
const encodedDagIds = new URLSearchParams();
$.each($('[id^=toggle]'), function toggleId() {
  const $input = $(this);
  const dagId = $input.data('dag-id');
  encodedDagIds.append('dag_ids', dagId);
  $input.on('change', () => {
    const isPaused = $input.is(':checked');
    const url = `${pausedUrl}?is_paused=${isPaused}&dag_id=${encodeURIComponent(dagId)}`;
    $input.removeClass('switch-input--error'); // Remove focus on element so the tooltip will go away

    $input.trigger('blur');
    $.post(url).fail(() => {
      setTimeout(() => {
        $input.prop('checked', !isPaused);
        $input.addClass('switch-input--error');
      }, 500);
    });
  });
});
$('.typeahead').typeahead({
  source(query, callback) {
    return $.ajax(autocompleteUrl, {
      data: {
        query: encodeURIComponent(query),
        status: statusFilter
      },
      success: callback
    });
  },

  autoSelect: false,

  afterSelect(value) {
    const searchQuery = value.trim();

    if (searchQuery) {
      const query = new URLSearchParams(window.location.search);
      query.set('search', searchQuery);
      window.location = `${DAGS_INDEX}?${query}`;
    }
  }

});
$('#search_form').on('reset', () => {
  const query = new URLSearchParams(window.location.search);
  query.delete('search');
  query.delete('page');
  window.location = `${DAGS_INDEX}?${query}`;
});
$('#main_content').show(250);
const diameter = 25;
const circleMargin = 4;
const strokeWidth = 2;
const strokeWidthHover = 6;

function blockedHandler(error, json) {
  $.each(json, function handleBlock() {
    const a = document.querySelector(`[data-dag-id="${this.dag_id}"]`);
    a.title = `${this.active_dag_run}/${this.max_active_runs} active dag runs`;

    if (this.active_dag_run >= this.max_active_runs) {
      a.style.color = '#e43921';
    }
  });
}

function lastDagRunsHandler(error, json) {
  $('.js-loading-last-run').remove();
  Object.keys(json).forEach(safeDagId => {
    const dagId = json[safeDagId].dag_id;
    const executionDate = json[safeDagId].execution_date;
    const g = d3.select(`#last-run-${safeDagId}`); // Show last run as a link to the graph view

    g.selectAll('a').attr('href', `${graphUrl}?dag_id=${encodeURIComponent(dagId)}&execution_date=${encodeURIComponent(executionDate)}`).insert(isoDateToTimeEl.bind(null, executionDate, {
      title: false
    })); // Only show the tooltip when we have a last run and add the json to a custom data- attribute

    g.selectAll('span').style('display', null).attr('data-lastrun', JSON.stringify(json[safeDagId]));
  });
} // Load data-lastrun attribute data to populate the tooltip on hover


d3.selectAll('.js-last-run-tooltip').on('mouseover', function mouseoverLastRun() {
  const lastRunData = JSON.parse(d3.select(this).attr('data-lastrun'));
  d3.select(this).attr('data-original-title', Object(_task_instances__WEBPACK_IMPORTED_MODULE_1__["default"])(lastRunData));
});

function drawDagStatsForDag(dagId, states) {
  const g = d3.select(`svg#dag-run-${dagId.replace(/\./g, '__dot__')}`).attr('height', diameter + strokeWidthHover * 2).attr('width', '120px').selectAll('g').data(states).enter().append('g').attr('transform', (d, i) => {
    const x = i * (diameter + circleMargin) + (diameter / 2 + circleMargin);
    const y = diameter / 2 + strokeWidthHover;
    return `translate(${x},${y})`;
  });
  g.append('svg:a').attr('href', d => `${dagRunUrl}?_flt_3_dag_id=${dagId}&_flt_3_state=${d.state}`).append('circle').attr('id', d => `run-${dagId.replace(/\./g, '_')}${d.state || 'none'}`).attr('class', 'has-svg-tooltip').attr('stroke-width', d => {
    if (d.count > 0) return strokeWidth;
    return 1;
  }).attr('stroke', d => {
    if (d.count > 0) return STATE_COLOR[d.state];
    return 'gainsboro';
  }).attr('fill', '#fff').attr('r', diameter / 2).attr('title', d => d.state).on('mouseover', d => {
    if (d.count > 0) {
      d3.select(this).transition().duration(400).attr('fill', '#e2e2e2').style('stroke-width', strokeWidthHover);
    }
  }).on('mouseout', d => {
    if (d.count > 0) {
      d3.select(this).transition().duration(400).attr('fill', '#fff').style('stroke-width', strokeWidth);
    }
  }).style('opacity', 0).transition().duration(300).delay((d, i) => i * 50).style('opacity', 1);
  d3.select('.js-loading-dag-stats').remove();
  g.append('text').attr('fill', '#51504f').attr('text-anchor', 'middle').attr('vertical-align', 'middle').attr('font-size', 9).attr('y', 3).style('pointer-events', 'none').text(d => d.count > 0 ? d.count : '');
}

function dagStatsHandler(error, json) {
  Object.keys(json).forEach(dagId => {
    const states = json[dagId];
    drawDagStatsForDag(dagId, states);
  });
}

function drawTaskStatsForDag(dagId, states) {
  const g = d3.select(`svg#task-run-${dagId.replace(/\./g, '__dot__')}`).attr('height', diameter + strokeWidthHover * 2).attr('width', states.length * (diameter + circleMargin) + circleMargin).selectAll('g').data(states).enter().append('g').attr('transform', (d, i) => {
    const x = i * (diameter + circleMargin) + (diameter / 2 + circleMargin);
    const y = diameter / 2 + strokeWidthHover;
    return `translate(${x},${y})`;
  });
  g.append('svg:a').attr('href', d => `${taskInstanceUrl}?_flt_3_dag_id=${dagId}&_flt_3_state=${d.state}`).append('circle').attr('id', d => `task-${dagId.replace(/\./g, '_')}${d.state || 'none'}`).attr('class', 'has-svg-tooltip').attr('stroke-width', d => {
    if (d.count > 0) return strokeWidth;
    return 1;
  }).attr('stroke', d => {
    if (d.count > 0) return STATE_COLOR[d.state];
    return 'gainsboro';
  }).attr('fill', '#fff').attr('r', diameter / 2).attr('title', d => d.state || 'none').on('mouseover', function mouseOver(d) {
    if (d.count > 0) {
      d3.select(this).transition().duration(400).attr('fill', '#e2e2e2').style('stroke-width', strokeWidthHover);
    }
  }).on('mouseout', function mouseOut(d) {
    if (d.count > 0) {
      d3.select(this).transition().duration(400).attr('fill', '#fff').style('stroke-width', strokeWidth);
    }
  }).style('opacity', 0).transition().duration(300).delay((d, i) => i * 50).style('opacity', 1);
  d3.select('.js-loading-task-stats').remove();
  g.append('text').attr('fill', '#51504f').attr('text-anchor', 'middle').attr('vertical-align', 'middle').attr('font-size', 9).attr('y', 3).style('pointer-events', 'none').text(d => d.count > 0 ? d.count : '');
}

function taskStatsHandler(error, json) {
  Object.keys(json).forEach(dagId => {
    const states = json[dagId];
    drawTaskStatsForDag(dagId, states);
  });
}

if (encodedDagIds.has('dag_ids')) {
  // dags on page fetch stats
  d3.json(blockedUrl).header('X-CSRFToken', csrfToken).post(encodedDagIds, blockedHandler);
  d3.json(lastDagRunsUrl).header('X-CSRFToken', csrfToken).post(encodedDagIds, lastDagRunsHandler);
  d3.json(dagStatsUrl).header('X-CSRFToken', csrfToken).post(encodedDagIds, dagStatsHandler);
  d3.json(taskStatsUrl).header('X-CSRFToken', csrfToken).post(encodedDagIds, taskStatsHandler);
} else {
  // no dags, hide the loading dots
  $('.js-loading-task-stats').remove();
  $('.js-loading-dag-stats').remove();
}

function showSvgTooltip(text, circ) {
  const tip = $('#svg-tooltip');
  tip.children('.tooltip-inner').text(text);
  const centeringOffset = tip.width() / 2;
  tip.css({
    display: 'block',
    left: `${circ.left + 12.5 - centeringOffset}px`,
    // 12.5 == half of circle width
    top: `${circ.top - 25}px` // 25 == position above circle

  });
}

function hideSvgTooltip() {
  $('#svg-tooltip').css('display', 'none');
}

$(window).on('load', () => {
  $('body').on('mouseover', '.has-svg-tooltip', e => {
    const elem = e.target;
    const text = elem.getAttribute('title');
    const circ = elem.getBoundingClientRect();
    showSvgTooltip(text, circ);
  });
  $('body').on('mouseout', '.has-svg-tooltip', () => {
    hideSvgTooltip();
  });
});
$('.js-next-run-tooltip').each((i, run) => {
  $(run).on('mouseover', () => {
    $(run).attr('data-original-title', () => {
      const nextRunData = $(run).attr('data-nextrun');
      const [createAfter, intervalStart, intervalEnd] = nextRunData.split(',');
      let newTitle = '';
      newTitle += `<strong>Run After:</strong> ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_2__[/* formatDateTime */ "c"])(createAfter)}<br><br>`;
      newTitle += '<strong>Data Interval</strong><br>';
      newTitle += `Start: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_2__[/* formatDateTime */ "c"])(intervalStart)}<br>`;
      newTitle += `End: ${Object(_datetime_utils__WEBPACK_IMPORTED_MODULE_2__[/* formatDateTime */ "c"])(intervalEnd)}`;
      return newTitle;
    });
  });
});

/***/ })
/******/ ]);
});