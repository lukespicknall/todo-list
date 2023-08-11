/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n    margin: 0;\n    padding: 0;\n}\n#content {\n    height: 100vh;\n    width: 100vw;\n}\n\n#page-box {\n  width: 100%;\n  height: 100%;\n  display: grid;\n  grid-template-rows: 2fr 15fr 1fr;\n  grid-template-columns: 200px 8fr;\n  grid-template-areas:\n  'side-bar head' \n  'side-bar main '\n  'foot foot';\n   transition: 275ms;\n}\n\n.blurred {\n  filter: blur(2px);\n    transition: 275ms;\n}\n\n#head {\n    grid-area: head;\n    /* height: 100%;\n    width: 100%; */\n}\n\n#main {\n    grid-area: main;\n    height: 100%;\n    width: 100%;\n    background-color: rgb(214, 194, 194);\n}\n\n#side-bar {\n    grid-area: side-bar;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n    background-color: rgb(191, 212, 207);\n    align-items: center;\n}\n\n#add-task {\n    width: 100px;\n    height: 100px;\n    margin: 50px 0 0 0;\n    border-style: none;\n    border-radius: 35%;\n    background-color: rgb(241, 176, 176);\n    font-size: 50px;\n    transition: all ease-in-out 0.2s;\n}\n\n#add-task:hover {\n    /* width: 110px;\n    height: 110px; */\n    box-shadow: 7px 7px rgb(223, 101, 101);\n}\n\n/* FORM STLYE */\n/* This form-overlay transition code documented below it*/\n#task-overlay {\n  position: absolute;\n  display: flex;\n  width: 100vw;\n  justify-content: center;\n  align-items: center;\n  /* background-color: rgba(0, 0, 0, 0.329); */\n\n /* Hide the element content, while height = 0 */\n    overflow: hidden;\n    height: 0vh; /* start hiegh @ 0 */\n    opacity: 0; /* start opacity @ 0 */\n    transition: height 0ms 400ms, opacity 275ms 0ms;\n  /* height delays to the time it takes opacity to fade */ \n}\n\n#task-overlay-vis {\n  position: absolute;\n  display: flex;\n  width: 100vw;\n  justify-content: center;\n  align-items: center;\n  /* background-color: rgba(0, 0, 0, 0.329); */\n  overflow: hidden;\n  z-index: 2;\n  height: 100vh; /* bring height to 100vh */\n  opacity: 1; /* set opacity to 1 (full) */\n  transition: height 0ms 0ms, opacity 275ms 0ms; \n  /* height changes immediately, opacity fades in */\n}\n\n#task-card {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  border: 5px solid #ffff;\n  background-color: var(--my-green);\n  border-radius: 15px;\n  box-shadow: 25px 20px 70px -30px black;\n  transition: 1s;\n  padding: 8px;\n}\n\n#task-form {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\ninput {\n  padding: 2px;\n}\n\n#foot {\n    grid-area: foot;\n    height: 100%;\n    width: 100%;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todo-list/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://todo-list/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ui */ \"./src/modules/ui.js\");\n\n\n\n(0,_modules_ui__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/to-do.js":
/*!******************************!*\
  !*** ./src/modules/to-do.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst newTask = (tTask, tNotes, tDueDate, tPriority) => {\n  const task = tTask;\n  const notes = tNotes;\n  const due = tDueDate;\n  const priority = tPriority;\n\n  return {\n    task, notes, due, priority,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newTask);\n\n\n//# sourceURL=webpack://todo-list/./src/modules/to-do.js?");

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _to_do__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-do */ \"./src/modules/to-do.js\");\n// import newTask from './to-do';\n// import newProject from './project';\n\n\n\n// CREATE MAIN HTML DIVS\nconst taskList = [];\nconst tBody = document.createElement(\"tbody\");\nconst content = document.getElementById('content');\nconst load = () => {\n  const pageBox = document.createElement('div');\n  pageBox.id = 'page-box';\n  const main = document.createElement('div');\n  main.id = 'main';\n  const sideBar = document.createElement('div');\n  sideBar.id = 'side-bar';\n  const head = document.createElement('div');\n  head.id = 'head';\n  const foot = document.createElement('div');\n  foot.id = 'foot';\n  pageBox.append(main, sideBar, head, foot);\n\n  const addTask = document.createElement('button');\n  addTask.id = 'add-task';\n  addTask.textContent = '+';\n  sideBar.appendChild(addTask);\n\n  const handlers = (() => {\n    // ADD OVERLAY TO DOM BEFORE addBtn EVENT SO TRANSITION WORKS\n    const taskOverlay = document.createElement('div');\n    taskOverlay.id = 'task-overlay';\n    content.appendChild(taskOverlay);\n\n    // REMOVE BACKGROUND BLUR\n    const removeBlur = (a) => {\n      a.classList.remove('blurred');\n    };\n\n    // CREATE NEW TASK FORM HANDLER\n    addTask.addEventListener('click', () => {\n      // BLUR BACKGROUND\n      pageBox.classList.add('blurred');\n\n      // const taskOverlay = document.createElement('div');\n      taskOverlay.id = 'task-overlay-vis';\n      const taskCard = document.createElement('div');\n      taskCard.id = 'task-card';\n      const taskForm = document.createElement('form');\n      taskForm.id = 'task-form';\n      taskForm.setAttribute('action', '');\n      taskForm.setAttribute('method', 'post');\n\n      const titleLabel = document.createElement('label');\n      titleLabel.setAttribute('for', 'task-title');\n      titleLabel.textContent = 'Title';\n      const taskTitle = document.createElement('input');\n      taskTitle.setAttribute('type', 'text');\n      taskTitle.setAttribute('id', 'task-title');\n      taskTitle.setAttribute('placeholder', 'Task title . . .');\n      taskTitle.setAttribute('name', 'task-title');\n\n      const descriptionLabel = document.createElement('label');\n      descriptionLabel.setAttribute('for', 'task-description');\n      descriptionLabel.textContent = 'Description';\n      const taskDescription = document.createElement('input');\n      taskDescription.setAttribute('id', 'task-description');\n      taskDescription.setAttribute('type', 'text');\n      taskDescription.setAttribute('placeholder', 'Task description . . .');\n      taskDescription.setAttribute('name', 'task-description');\n\n      const dueLabel = document.createElement('label');\n      dueLabel.setAttribute('for', 'task-due');\n      dueLabel.textContent = 'Due date';\n      const taskDue = document.createElement('input');\n      taskDue.setAttribute('id', 'task-due');\n      taskDue.setAttribute('type', 'date');\n      taskDue.setAttribute('placeholder', 'Task due . . .');\n      taskDue.setAttribute('name', 'task-due');\n\n      const priorityLabel = document.createElement('label');\n      priorityLabel.setAttribute('for', 'task-priority');\n      priorityLabel.textContent = 'Priority';\n      const taskPriority = document.createElement('input');\n      taskPriority.setAttribute('id', 'task-priority');\n      taskPriority.setAttribute('type', 'radio');\n      taskPriority.setAttribute('placeholder', 'Task priority . . .');\n      taskPriority.setAttribute('name', 'task-priority');\n\n      const submitLabel = document.createElement('label');\n      submitLabel.setAttribute('for', 'task-submit');\n      const taskSubmit = document.createElement('input');\n      taskSubmit.setAttribute('id', 'task-submit');\n      taskSubmit.setAttribute('type', 'submit');\n      taskSubmit.setAttribute('placeholder', 'Task submit . . .');\n      taskSubmit.setAttribute('name', 'task-submit');\n\n      // ADD TASK INPUTS TO FROM AND FORM TO PAGE\n      taskForm.append(titleLabel, taskTitle);\n      taskForm.append(descriptionLabel, taskDescription);\n      taskForm.append(dueLabel, taskDue);\n      taskForm.append(priorityLabel, taskPriority);\n      taskForm.append(submitLabel, taskSubmit);\n      taskCard.appendChild(taskForm);\n      taskOverlay.appendChild(taskCard);\n\n      // SUMBIT FORM/CREATE OBJ/PUSH OBJ TO ARRAY/DISPLAY ARRAY VIALOOP\n      taskForm.addEventListener('submit', (e) => {\n        e.preventDefault(); // stops sumbit from sending data to server by default\n        const taskObj = (0,_to_do__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\n          taskTitle.value,\n          taskDescription.value,\n          taskDue.value,\n          taskPriority.value,\n        );\n        taskList.push(taskObj);\n        // sends data to new task\n        taskOverlay.setAttribute('id', 'task-overlay'); // adds hidden class\n        // makes form dissapear on submit\n        removeBlur(pageBox);\n        displayTasks();\n\n        // const taskDisplay = document.createElement('div');\n        // taskDisplay.textContent = JSON.stringify(taskObj);\n        // main.appendChild(taskDisplay);\n      });\n    });\n\n    const displayTasks = () => {\n      tBody.innerHTML = ''; // clears current tbody to avoid repeats\n      for (let i = 0; i < taskList.length; i += 1) {\n        // loop throu taskList[]\n        const row = document.createElement('tr'); // create new tr for new Task\n        row.className = 'table-row';\n        tBody.appendChild(row); // add that tr to tbody in libTable\n        const taskCell = document.createElement('td'); //\n        const notesCell = document.createElement('td'); //\n        const dueCell = document.createElement('td'); // create new cells for Task data\n        const priorityCell = document.createElement('td'); //\n        const completeCell = document.createElement('td'); //\n        dueCell.className = 'due-cell'; //\n        priorityCell.className = 'priority-cell'; // give class names to table cells\n        completeCell.className = 'complete-cell'; //\n        taskCell.textContent = taskList[i].task; //\n        notesCell.textContent = taskList[i].notes; // assign object value to cell content\n        dueCell.textContent = taskList[i].due; //\n        row.appendChild(taskCell); //\n        row.appendChild(notesCell); // add those cells to the new row\n        row.appendChild(dueCell); //\n        main.appendChild(tBody);\n      }\n    };\n\n    const clickout = (() => {\n      // click listener on taskOverlay\n      taskOverlay.addEventListener('click', (e) => {\n        // make clickSpot = the event target\n        const clickSpot = e.target;\n        // if click happened on taskOverlay, i.e. outisde of the task\n        if (clickSpot.id === 'task-overlay-vis') {\n          taskOverlay.id = 'task-overlay';\n          removeBlur(pageBox);\n        }\n      });\n      // }\n    })();\n  })();\n\n  content.appendChild(pageBox);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (load);\n\n// // puts Task{} data from taskList[] into libTable// MAKE THIS PRIORITY SELECTOR\n//     // Read Checkbox - - -\n//     const readCheck = document.createElement('input'); // create an input element\n//     readCheck.setAttribute('type', 'checkbox'); // make it a checkbox\n//     readCheck.setAttribute('data-id', [i]); // assign data-id that = object's array index\n//     readCheck.className = 'read-check'; // give it a class name\n//     if (taskList[i].read === 'no') {\n//       // if not read\n//       readCell.appendChild(readCheck); // add the default unchecked box to the cell\n//     } else if (taskList[i].read === 'yes') {\n//       // if read\n//       readCheck.checked = 'true'; // make the checkbox checked\n//       readCell.appendChild(readCheck); // add the checked box to the readCell\n//     }\n//     row.appendChild(readCell); // add readCell to row\n\n// MAKE THIS COMPLETE CHECKBOX\n//     // Delete Button\n//     const deleteBtn = document.createElement('button'); // create a button\n//     const deleteImg = document.createElement('img'); // create and img element\n//     deleteBtn.className = 'delete-btn'; // give button a class\n//     deleteImg.src = 'images/trash-can-outline.png'; // set img source\n//     deleteImg.className = 'delete-img'; // give img element a class\n//     deleteImg.setAttribute('data-id', [i]); // assign data-id that = object's array index\n//     deleteBtn.appendChild(deleteImg); // add image to button\n//     deleteCell.appendChild(deleteBtn); // add button to cell\n//     row.appendChild(deleteCell); // add cell to row\n//   }\n// }\n\n\n//# sourceURL=webpack://todo-list/./src/modules/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;