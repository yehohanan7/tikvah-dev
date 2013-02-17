var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if(goog.getObjectByName(namespace)) {
        break
      }
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(name) {
    return!goog.implicitNamespaces_[name] && !!goog.getObjectByName(name)
  };
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = true;
goog.require = function(name) {
  if(!COMPILED) {
    if(goog.isProvided_(name)) {
      return
    }
    if(goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if(path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return
      }
    }
    var errorMessage = "goog.require could not find: " + name;
    if(goog.global.console) {
      goog.global.console["error"](errorMessage)
    }
    throw Error(errorMessage);
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(!goog.isProvided_(requireName)) {
            if(requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName])
            }else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return goog.propertyIsEnumerableCustom_(object, propName)
  }
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
Object.prototype.clone;
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if(!fn) {
    throw new Error;
  }
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs)
    }
  }else {
    return function() {
      return fn.apply(selfObj, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if(!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING
}
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }
  return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if(test1 < test2) {
    return-1
  }else {
    if(test1 == test2) {
      return 0
    }else {
      return 1
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2) {
    return 0
  }
  if(!str1) {
    return-1
  }
  if(!str2) {
    return 1
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for(var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2) {
          return num1 - num2
        }
      }
      return a < b ? -1 : 1
    }
  }
  if(tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length
  }
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str)) {
    return encodeURIComponent(str)
  }
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(str)) {
      return str
    }
    if(str.indexOf("&") != -1) {
      str = str.replace(goog.string.amperRe_, "&amp;")
    }
    if(str.indexOf("<") != -1) {
      str = str.replace(goog.string.ltRe_, "&lt;")
    }
    if(str.indexOf(">") != -1) {
      str = str.replace(goog.string.gtRe_, "&gt;")
    }
    if(str.indexOf('"') != -1) {
      str = str.replace(goog.string.quotRe_, "&quot;")
    }
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&")) {
    if("document" in goog.global) {
      return goog.string.unescapeEntitiesUsingDom_(str)
    }else {
      return goog.string.unescapePureXmlEntities_(str)
    }
  }
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div = document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if(value) {
      return value
    }
    if(entity.charAt(0) == "#") {
      var n = Number("0" + entity.substr(1));
      if(!isNaN(n)) {
        value = String.fromCharCode(n)
      }
    }
    if(!value) {
      div.innerHTML = s + " ";
      value = div.firstChild.nodeValue.slice(0, -1)
    }
    return seen[s] = value
  })
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n)) {
            return String.fromCharCode(n)
          }
        }
        return s
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for(var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1)
    }
  }
  return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(str.length > chars) {
    str = str.substring(0, chars - 3) + "..."
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(opt_trailingChars && str.length > chars) {
    if(opt_trailingChars > chars) {
      opt_trailingChars = chars
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint)
  }else {
    if(str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos)
    }
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote) {
    return s.quote()
  }else {
    var sb = ['"'];
    for(var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch))
    }
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for(var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i))
  }
  return sb.join("")
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c]
  }
  if(c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c]
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127) {
    rv = c
  }else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256) {
        rv += "0"
      }
    }else {
      rv = "\\u";
      if(cc < 4096) {
        rv += "0"
      }
    }
    rv += cc.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  var rv = {};
  for(var i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = true
  }
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength)
  }
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for(var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }
  return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right) {
    return-1
  }else {
    if(left > right) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for(var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }
  return result
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str)) {
    return NaN
  }
  return num
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(str) {
  return goog.string.toCamelCaseCache_[str] || (goog.string.toCamelCaseCache_[str] = String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(str) {
  return goog.string.toSelectorCaseCache_[str] || (goog.string.toSelectorCaseCache_[str] = String(str).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.string");
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if(givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs
  }else {
    if(defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs
    }
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return condition
};
goog.asserts.fail = function(opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3))
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.indexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i < arr.length;i++) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex)
  }
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.lastIndexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i >= 0;i--) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;--i) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      var val = arr2[i];
      if(f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val
      }
    }
  }
  return res
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr)
    }
  }
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce) {
    if(opt_obj) {
      return arr.reduce(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduce(f, val)
    }
  }
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight) {
    if(opt_obj) {
      return arr.reduceRight(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduceRight(f, val)
    }
  }
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false
    }
  }
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;i--) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr)) {
    for(var i = arr.length - 1;i >= 0;i--) {
      delete arr[i]
    }
  }
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  if(!goog.array.contains(arr, obj)) {
    arr.push(obj)
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if(arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj)
  }else {
    goog.array.insertAt(arr, obj, i)
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if(rv = i >= 0) {
    goog.array.removeAt(arr, i)
  }
  return rv
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }
  return false
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr)) {
    return goog.array.concat(arr)
  }else {
    var rv = [];
    for(var i = 0, len = arr.length;i < len;i++) {
      rv[i] = arr[i]
    }
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object)) {
    return goog.array.concat(object)
  }
  return goog.array.clone(object)
};
goog.array.extend = function(arr1, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    var isArrayLike;
    if(goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && arr2.hasOwnProperty("callee")) {
      arr1.push.apply(arr1, arr2)
    }else {
      if(isArrayLike) {
        var len1 = arr1.length;
        var len2 = arr2.length;
        for(var j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j]
        }
      }else {
        arr1.push(arr2)
      }
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if(arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start)
  }else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
  }
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  var returnArray = opt_rv || arr;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while(cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
    if(!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current
    }
  }
  returnArray.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target)
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj)
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while(left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if(isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr)
    }else {
      compareResult = compareFn(opt_target, arr[middle])
    }
    if(compareResult > 0) {
      left = middle + 1
    }else {
      right = middle;
      found = !compareResult
    }
  }
  return found ? left : ~left
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for(var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]}
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  goog.array.sort(arr, stableCompareFn);
  for(var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value
  }
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for(var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if(compareResult > 0 || compareResult == 0 && opt_strict) {
      return false
    }
  }
  return true
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for(var i = 0;i < l;i++) {
    if(!equalsFn(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  var l = Math.min(arr1.length, arr2.length);
  for(var i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if(result != 0) {
      return result
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }
  return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  var buckets = {};
  for(var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter(value, i, array);
    if(goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value)
    }
  }
  return buckets
};
goog.array.repeat = function(value, n) {
  var array = [];
  for(var i = 0;i < n;i++) {
    array[i] = value
  }
  return array
};
goog.array.flatten = function(var_args) {
  var result = [];
  for(var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if(goog.isArray(element)) {
      result.push.apply(result, goog.array.flatten.apply(null, element))
    }else {
      result.push(element)
    }
  }
  return result
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if(array.length) {
    n %= array.length;
    if(n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n))
    }else {
      if(n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
      }
    }
  }
  return array
};
goog.array.zip = function(var_args) {
  if(!arguments.length) {
    return[]
  }
  var result = [];
  for(var i = 0;true;i++) {
    var value = [];
    for(var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if(i >= arr.length) {
        return result
      }
      value.push(arr[i])
    }
    result.push(value)
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for(var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp
  }
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj) {
    f.call(opt_obj, obj[key], key, obj)
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key]
    }
  }
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj)
  }
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      return true
    }
  }
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(!f.call(opt_obj, obj[key], key, obj)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj) {
    rv++
  }
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj) {
    return key
  }
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj) {
    return obj[key]
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = obj[key]
  }
  return res
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = key
  }
  return res
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for(var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if(!goog.isDef(obj)) {
      break
    }
  }
  return obj
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj) {
    if(obj[key] == val) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj) {
    if(f.call(opt_this, obj[key], key, obj)) {
      return key
    }
  }
  return undefined
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj) {
    return false
  }
  return true
};
goog.object.clear = function(obj) {
  for(var i in obj) {
    delete obj[i]
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj) {
    delete obj[key]
  }
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj) {
    return obj[key]
  }
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj) {
    res[key] = obj[key]
  }
  return res
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key])
    }
    return clone
  }
  return obj
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj) {
    transposed[obj[key]] = key
  }
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for(var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source) {
      target[key] = source[key]
    }
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for(var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1]
  }
  return rv
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  var rv = {};
  for(var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true
  }
  return rv
};
goog.provide("goog.string.format");
goog.require("goog.string");
goog.string.format = function(formatString, var_args) {
  var args = Array.prototype.slice.call(arguments);
  var template = args.shift();
  if(typeof template == "undefined") {
    throw Error("[goog.string.format] Template required");
  }
  var formatRe = /%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g;
  function replacerDemuxer(match, flags, width, dotp, precision, type, offset, wholeString) {
    if(type == "%") {
      return"%"
    }
    var value = args.shift();
    if(typeof value == "undefined") {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = value;
    return goog.string.format.demuxes_[type].apply(null, arguments)
  }
  return template.replace(formatRe, replacerDemuxer)
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_["s"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value;
  if(isNaN(width) || width == "" || replacement.length >= width) {
    return replacement
  }
  if(flags.indexOf("-", 0) > -1) {
    replacement = replacement + goog.string.repeat(" ", width - replacement.length)
  }else {
    replacement = goog.string.repeat(" ", width - replacement.length) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["f"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  var replacement = value.toString();
  if(!(isNaN(precision) || precision == "")) {
    replacement = value.toFixed(precision)
  }
  var sign;
  if(value < 0) {
    sign = "-"
  }else {
    if(flags.indexOf("+") >= 0) {
      sign = "+"
    }else {
      if(flags.indexOf(" ") >= 0) {
        sign = " "
      }else {
        sign = ""
      }
    }
  }
  if(value >= 0) {
    replacement = sign + replacement
  }
  if(isNaN(width) || replacement.length >= width) {
    return replacement
  }
  replacement = isNaN(precision) ? Math.abs(value).toString() : Math.abs(value).toFixed(precision);
  var padCount = width - replacement.length - sign.length;
  if(flags.indexOf("-", 0) >= 0) {
    replacement = sign + replacement + goog.string.repeat(" ", padCount)
  }else {
    var paddingChar = flags.indexOf("0", 0) >= 0 ? "0" : " ";
    replacement = sign + goog.string.repeat(paddingChar, padCount) + replacement
  }
  return replacement
};
goog.string.format.demuxes_["d"] = function(value, flags, width, dotp, precision, type, offset, wholeString) {
  return goog.string.format.demuxes_["f"](parseInt(value, 10), flags, width, dotp, 0, type, offset, wholeString)
};
goog.string.format.demuxes_["i"] = goog.string.format.demuxes_["d"];
goog.string.format.demuxes_["u"] = goog.string.format.demuxes_["d"];
goog.provide("goog.userAgent.jscript");
goog.require("goog.string");
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  var hasScriptEngine = "ScriptEngine" in goog.global;
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = hasScriptEngine && goog.global["ScriptEngine"]() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global["ScriptEngineMajorVersion"]() + "." + goog.global["ScriptEngineMinorVersion"]() + "." + goog.global["ScriptEngineBuildVersion"]() : "0"
};
if(!goog.userAgent.jscript.ASSUME_NO_JSCRIPT) {
  goog.userAgent.jscript.init_()
}
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};
goog.provide("goog.string.StringBuffer");
goog.require("goog.userAgent.jscript");
goog.string.StringBuffer = function(opt_a1, var_args) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  if(opt_a1 != null) {
    this.append.apply(this, arguments)
  }
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if(opt_a2 == null) {
      this.buffer_[this.bufferLength_++] = a1
    }else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }
    return this
  }
}else {
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    this.buffer_ += a1;
    if(opt_a2 != null) {
      for(var i = 1;i < arguments.length;i++) {
        this.buffer_ += arguments[i]
      }
    }
    return this
  }
}
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;
    this.bufferLength_ = 0
  }else {
    this.buffer_ = ""
  }
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    if(str) {
      this.append(str)
    }
    return str
  }else {
    return this.buffer_
  }
};
goog.provide("cljs.core");
goog.require("goog.array");
goog.require("goog.object");
goog.require("goog.string.format");
goog.require("goog.string.StringBuffer");
goog.require("goog.string");
cljs.core._STAR_unchecked_if_STAR_ = false;
cljs.core._STAR_print_fn_STAR_ = function _STAR_print_fn_STAR_(_) {
  throw new Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function truth_(x) {
  return x != null && x !== false
};
cljs.core.type_satisfies_ = function type_satisfies_(p, x) {
  var x__6273 = x == null ? null : x;
  if(p[goog.typeOf(x__6273)]) {
    return true
  }else {
    if(p["_"]) {
      return true
    }else {
      if("\ufdd0'else") {
        return false
      }else {
        return null
      }
    }
  }
};
cljs.core.is_proto_ = function is_proto_(x) {
  return x.constructor.prototype === x
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function missing_protocol(proto, obj) {
  return Error(["No protocol method ", proto, " defined for type ", goog.typeOf(obj), ": ", obj].join(""))
};
cljs.core.aclone = function aclone(array_like) {
  return array_like.slice()
};
cljs.core.array = function array(var_args) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var make_array = null;
  var make_array__1 = function(size) {
    return new Array(size)
  };
  var make_array__2 = function(type, size) {
    return make_array.call(null, size)
  };
  make_array = function(type, size) {
    switch(arguments.length) {
      case 1:
        return make_array__1.call(this, type);
      case 2:
        return make_array__2.call(this, type, size)
    }
    throw"Invalid arity: " + arguments.length;
  };
  make_array.cljs$lang$arity$1 = make_array__1;
  make_array.cljs$lang$arity$2 = make_array__2;
  return make_array
}();
cljs.core.aget = function() {
  var aget = null;
  var aget__2 = function(array, i) {
    return array[i]
  };
  var aget__3 = function() {
    var G__6274__delegate = function(array, i, idxs) {
      return cljs.core.apply.call(null, aget, aget.call(null, array, i), idxs)
    };
    var G__6274 = function(array, i, var_args) {
      var idxs = null;
      if(goog.isDef(var_args)) {
        idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6274__delegate.call(this, array, i, idxs)
    };
    G__6274.cljs$lang$maxFixedArity = 2;
    G__6274.cljs$lang$applyTo = function(arglist__6275) {
      var array = cljs.core.first(arglist__6275);
      var i = cljs.core.first(cljs.core.next(arglist__6275));
      var idxs = cljs.core.rest(cljs.core.next(arglist__6275));
      return G__6274__delegate(array, i, idxs)
    };
    G__6274.cljs$lang$arity$variadic = G__6274__delegate;
    return G__6274
  }();
  aget = function(array, i, var_args) {
    var idxs = var_args;
    switch(arguments.length) {
      case 2:
        return aget__2.call(this, array, i);
      default:
        return aget__3.cljs$lang$arity$variadic(array, i, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  aget.cljs$lang$maxFixedArity = 2;
  aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
  aget.cljs$lang$arity$2 = aget__2;
  aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
  return aget
}();
cljs.core.aset = function aset(array, i, val) {
  return array[i] = val
};
cljs.core.alength = function alength(array) {
  return array.length
};
cljs.core.into_array = function() {
  var into_array = null;
  var into_array__1 = function(aseq) {
    return into_array.call(null, null, aseq)
  };
  var into_array__2 = function(type, aseq) {
    return cljs.core.reduce.call(null, function(a, x) {
      a.push(x);
      return a
    }, [], aseq)
  };
  into_array = function(type, aseq) {
    switch(arguments.length) {
      case 1:
        return into_array__1.call(this, type);
      case 2:
        return into_array__2.call(this, type, aseq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  into_array.cljs$lang$arity$1 = into_array__1;
  into_array.cljs$lang$arity$2 = into_array__2;
  return into_array
}();
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var _invoke = null;
  var _invoke__1 = function(this$) {
    if(function() {
      var and__3822__auto____6360 = this$;
      if(and__3822__auto____6360) {
        return this$.cljs$core$IFn$_invoke$arity$1
      }else {
        return and__3822__auto____6360
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$1(this$)
    }else {
      var x__2363__auto____6361 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6362 = cljs.core._invoke[goog.typeOf(x__2363__auto____6361)];
        if(or__3824__auto____6362) {
          return or__3824__auto____6362
        }else {
          var or__3824__auto____6363 = cljs.core._invoke["_"];
          if(or__3824__auto____6363) {
            return or__3824__auto____6363
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var _invoke__2 = function(this$, a) {
    if(function() {
      var and__3822__auto____6364 = this$;
      if(and__3822__auto____6364) {
        return this$.cljs$core$IFn$_invoke$arity$2
      }else {
        return and__3822__auto____6364
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$2(this$, a)
    }else {
      var x__2363__auto____6365 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6366 = cljs.core._invoke[goog.typeOf(x__2363__auto____6365)];
        if(or__3824__auto____6366) {
          return or__3824__auto____6366
        }else {
          var or__3824__auto____6367 = cljs.core._invoke["_"];
          if(or__3824__auto____6367) {
            return or__3824__auto____6367
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a)
    }
  };
  var _invoke__3 = function(this$, a, b) {
    if(function() {
      var and__3822__auto____6368 = this$;
      if(and__3822__auto____6368) {
        return this$.cljs$core$IFn$_invoke$arity$3
      }else {
        return and__3822__auto____6368
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$3(this$, a, b)
    }else {
      var x__2363__auto____6369 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6370 = cljs.core._invoke[goog.typeOf(x__2363__auto____6369)];
        if(or__3824__auto____6370) {
          return or__3824__auto____6370
        }else {
          var or__3824__auto____6371 = cljs.core._invoke["_"];
          if(or__3824__auto____6371) {
            return or__3824__auto____6371
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b)
    }
  };
  var _invoke__4 = function(this$, a, b, c) {
    if(function() {
      var and__3822__auto____6372 = this$;
      if(and__3822__auto____6372) {
        return this$.cljs$core$IFn$_invoke$arity$4
      }else {
        return and__3822__auto____6372
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$4(this$, a, b, c)
    }else {
      var x__2363__auto____6373 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6374 = cljs.core._invoke[goog.typeOf(x__2363__auto____6373)];
        if(or__3824__auto____6374) {
          return or__3824__auto____6374
        }else {
          var or__3824__auto____6375 = cljs.core._invoke["_"];
          if(or__3824__auto____6375) {
            return or__3824__auto____6375
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c)
    }
  };
  var _invoke__5 = function(this$, a, b, c, d) {
    if(function() {
      var and__3822__auto____6376 = this$;
      if(and__3822__auto____6376) {
        return this$.cljs$core$IFn$_invoke$arity$5
      }else {
        return and__3822__auto____6376
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$5(this$, a, b, c, d)
    }else {
      var x__2363__auto____6377 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6378 = cljs.core._invoke[goog.typeOf(x__2363__auto____6377)];
        if(or__3824__auto____6378) {
          return or__3824__auto____6378
        }else {
          var or__3824__auto____6379 = cljs.core._invoke["_"];
          if(or__3824__auto____6379) {
            return or__3824__auto____6379
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d)
    }
  };
  var _invoke__6 = function(this$, a, b, c, d, e) {
    if(function() {
      var and__3822__auto____6380 = this$;
      if(and__3822__auto____6380) {
        return this$.cljs$core$IFn$_invoke$arity$6
      }else {
        return and__3822__auto____6380
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$6(this$, a, b, c, d, e)
    }else {
      var x__2363__auto____6381 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6382 = cljs.core._invoke[goog.typeOf(x__2363__auto____6381)];
        if(or__3824__auto____6382) {
          return or__3824__auto____6382
        }else {
          var or__3824__auto____6383 = cljs.core._invoke["_"];
          if(or__3824__auto____6383) {
            return or__3824__auto____6383
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e)
    }
  };
  var _invoke__7 = function(this$, a, b, c, d, e, f) {
    if(function() {
      var and__3822__auto____6384 = this$;
      if(and__3822__auto____6384) {
        return this$.cljs$core$IFn$_invoke$arity$7
      }else {
        return and__3822__auto____6384
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$7(this$, a, b, c, d, e, f)
    }else {
      var x__2363__auto____6385 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6386 = cljs.core._invoke[goog.typeOf(x__2363__auto____6385)];
        if(or__3824__auto____6386) {
          return or__3824__auto____6386
        }else {
          var or__3824__auto____6387 = cljs.core._invoke["_"];
          if(or__3824__auto____6387) {
            return or__3824__auto____6387
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f)
    }
  };
  var _invoke__8 = function(this$, a, b, c, d, e, f, g) {
    if(function() {
      var and__3822__auto____6388 = this$;
      if(and__3822__auto____6388) {
        return this$.cljs$core$IFn$_invoke$arity$8
      }else {
        return and__3822__auto____6388
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$8(this$, a, b, c, d, e, f, g)
    }else {
      var x__2363__auto____6389 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6390 = cljs.core._invoke[goog.typeOf(x__2363__auto____6389)];
        if(or__3824__auto____6390) {
          return or__3824__auto____6390
        }else {
          var or__3824__auto____6391 = cljs.core._invoke["_"];
          if(or__3824__auto____6391) {
            return or__3824__auto____6391
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g)
    }
  };
  var _invoke__9 = function(this$, a, b, c, d, e, f, g, h) {
    if(function() {
      var and__3822__auto____6392 = this$;
      if(and__3822__auto____6392) {
        return this$.cljs$core$IFn$_invoke$arity$9
      }else {
        return and__3822__auto____6392
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$9(this$, a, b, c, d, e, f, g, h)
    }else {
      var x__2363__auto____6393 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6394 = cljs.core._invoke[goog.typeOf(x__2363__auto____6393)];
        if(or__3824__auto____6394) {
          return or__3824__auto____6394
        }else {
          var or__3824__auto____6395 = cljs.core._invoke["_"];
          if(or__3824__auto____6395) {
            return or__3824__auto____6395
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h)
    }
  };
  var _invoke__10 = function(this$, a, b, c, d, e, f, g, h, i) {
    if(function() {
      var and__3822__auto____6396 = this$;
      if(and__3822__auto____6396) {
        return this$.cljs$core$IFn$_invoke$arity$10
      }else {
        return and__3822__auto____6396
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$10(this$, a, b, c, d, e, f, g, h, i)
    }else {
      var x__2363__auto____6397 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6398 = cljs.core._invoke[goog.typeOf(x__2363__auto____6397)];
        if(or__3824__auto____6398) {
          return or__3824__auto____6398
        }else {
          var or__3824__auto____6399 = cljs.core._invoke["_"];
          if(or__3824__auto____6399) {
            return or__3824__auto____6399
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i)
    }
  };
  var _invoke__11 = function(this$, a, b, c, d, e, f, g, h, i, j) {
    if(function() {
      var and__3822__auto____6400 = this$;
      if(and__3822__auto____6400) {
        return this$.cljs$core$IFn$_invoke$arity$11
      }else {
        return and__3822__auto____6400
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$11(this$, a, b, c, d, e, f, g, h, i, j)
    }else {
      var x__2363__auto____6401 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6402 = cljs.core._invoke[goog.typeOf(x__2363__auto____6401)];
        if(or__3824__auto____6402) {
          return or__3824__auto____6402
        }else {
          var or__3824__auto____6403 = cljs.core._invoke["_"];
          if(or__3824__auto____6403) {
            return or__3824__auto____6403
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j)
    }
  };
  var _invoke__12 = function(this$, a, b, c, d, e, f, g, h, i, j, k) {
    if(function() {
      var and__3822__auto____6404 = this$;
      if(and__3822__auto____6404) {
        return this$.cljs$core$IFn$_invoke$arity$12
      }else {
        return and__3822__auto____6404
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$12(this$, a, b, c, d, e, f, g, h, i, j, k)
    }else {
      var x__2363__auto____6405 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6406 = cljs.core._invoke[goog.typeOf(x__2363__auto____6405)];
        if(or__3824__auto____6406) {
          return or__3824__auto____6406
        }else {
          var or__3824__auto____6407 = cljs.core._invoke["_"];
          if(or__3824__auto____6407) {
            return or__3824__auto____6407
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k)
    }
  };
  var _invoke__13 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l) {
    if(function() {
      var and__3822__auto____6408 = this$;
      if(and__3822__auto____6408) {
        return this$.cljs$core$IFn$_invoke$arity$13
      }else {
        return and__3822__auto____6408
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$13(this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }else {
      var x__2363__auto____6409 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6410 = cljs.core._invoke[goog.typeOf(x__2363__auto____6409)];
        if(or__3824__auto____6410) {
          return or__3824__auto____6410
        }else {
          var or__3824__auto____6411 = cljs.core._invoke["_"];
          if(or__3824__auto____6411) {
            return or__3824__auto____6411
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }
  };
  var _invoke__14 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m) {
    if(function() {
      var and__3822__auto____6412 = this$;
      if(and__3822__auto____6412) {
        return this$.cljs$core$IFn$_invoke$arity$14
      }else {
        return and__3822__auto____6412
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$14(this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }else {
      var x__2363__auto____6413 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6414 = cljs.core._invoke[goog.typeOf(x__2363__auto____6413)];
        if(or__3824__auto____6414) {
          return or__3824__auto____6414
        }else {
          var or__3824__auto____6415 = cljs.core._invoke["_"];
          if(or__3824__auto____6415) {
            return or__3824__auto____6415
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }
  };
  var _invoke__15 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if(function() {
      var and__3822__auto____6416 = this$;
      if(and__3822__auto____6416) {
        return this$.cljs$core$IFn$_invoke$arity$15
      }else {
        return and__3822__auto____6416
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$15(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }else {
      var x__2363__auto____6417 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6418 = cljs.core._invoke[goog.typeOf(x__2363__auto____6417)];
        if(or__3824__auto____6418) {
          return or__3824__auto____6418
        }else {
          var or__3824__auto____6419 = cljs.core._invoke["_"];
          if(or__3824__auto____6419) {
            return or__3824__auto____6419
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }
  };
  var _invoke__16 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    if(function() {
      var and__3822__auto____6420 = this$;
      if(and__3822__auto____6420) {
        return this$.cljs$core$IFn$_invoke$arity$16
      }else {
        return and__3822__auto____6420
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$16(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }else {
      var x__2363__auto____6421 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6422 = cljs.core._invoke[goog.typeOf(x__2363__auto____6421)];
        if(or__3824__auto____6422) {
          return or__3824__auto____6422
        }else {
          var or__3824__auto____6423 = cljs.core._invoke["_"];
          if(or__3824__auto____6423) {
            return or__3824__auto____6423
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }
  };
  var _invoke__17 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if(function() {
      var and__3822__auto____6424 = this$;
      if(and__3822__auto____6424) {
        return this$.cljs$core$IFn$_invoke$arity$17
      }else {
        return and__3822__auto____6424
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$17(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }else {
      var x__2363__auto____6425 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6426 = cljs.core._invoke[goog.typeOf(x__2363__auto____6425)];
        if(or__3824__auto____6426) {
          return or__3824__auto____6426
        }else {
          var or__3824__auto____6427 = cljs.core._invoke["_"];
          if(or__3824__auto____6427) {
            return or__3824__auto____6427
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }
  };
  var _invoke__18 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    if(function() {
      var and__3822__auto____6428 = this$;
      if(and__3822__auto____6428) {
        return this$.cljs$core$IFn$_invoke$arity$18
      }else {
        return and__3822__auto____6428
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$18(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }else {
      var x__2363__auto____6429 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6430 = cljs.core._invoke[goog.typeOf(x__2363__auto____6429)];
        if(or__3824__auto____6430) {
          return or__3824__auto____6430
        }else {
          var or__3824__auto____6431 = cljs.core._invoke["_"];
          if(or__3824__auto____6431) {
            return or__3824__auto____6431
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }
  };
  var _invoke__19 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s) {
    if(function() {
      var and__3822__auto____6432 = this$;
      if(and__3822__auto____6432) {
        return this$.cljs$core$IFn$_invoke$arity$19
      }else {
        return and__3822__auto____6432
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$19(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }else {
      var x__2363__auto____6433 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6434 = cljs.core._invoke[goog.typeOf(x__2363__auto____6433)];
        if(or__3824__auto____6434) {
          return or__3824__auto____6434
        }else {
          var or__3824__auto____6435 = cljs.core._invoke["_"];
          if(or__3824__auto____6435) {
            return or__3824__auto____6435
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }
  };
  var _invoke__20 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t) {
    if(function() {
      var and__3822__auto____6436 = this$;
      if(and__3822__auto____6436) {
        return this$.cljs$core$IFn$_invoke$arity$20
      }else {
        return and__3822__auto____6436
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$20(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }else {
      var x__2363__auto____6437 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6438 = cljs.core._invoke[goog.typeOf(x__2363__auto____6437)];
        if(or__3824__auto____6438) {
          return or__3824__auto____6438
        }else {
          var or__3824__auto____6439 = cljs.core._invoke["_"];
          if(or__3824__auto____6439) {
            return or__3824__auto____6439
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }
  };
  var _invoke__21 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    if(function() {
      var and__3822__auto____6440 = this$;
      if(and__3822__auto____6440) {
        return this$.cljs$core$IFn$_invoke$arity$21
      }else {
        return and__3822__auto____6440
      }
    }()) {
      return this$.cljs$core$IFn$_invoke$arity$21(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }else {
      var x__2363__auto____6441 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____6442 = cljs.core._invoke[goog.typeOf(x__2363__auto____6441)];
        if(or__3824__auto____6442) {
          return or__3824__auto____6442
        }else {
          var or__3824__auto____6443 = cljs.core._invoke["_"];
          if(or__3824__auto____6443) {
            return or__3824__auto____6443
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
  };
  _invoke = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    switch(arguments.length) {
      case 1:
        return _invoke__1.call(this, this$);
      case 2:
        return _invoke__2.call(this, this$, a);
      case 3:
        return _invoke__3.call(this, this$, a, b);
      case 4:
        return _invoke__4.call(this, this$, a, b, c);
      case 5:
        return _invoke__5.call(this, this$, a, b, c, d);
      case 6:
        return _invoke__6.call(this, this$, a, b, c, d, e);
      case 7:
        return _invoke__7.call(this, this$, a, b, c, d, e, f);
      case 8:
        return _invoke__8.call(this, this$, a, b, c, d, e, f, g);
      case 9:
        return _invoke__9.call(this, this$, a, b, c, d, e, f, g, h);
      case 10:
        return _invoke__10.call(this, this$, a, b, c, d, e, f, g, h, i);
      case 11:
        return _invoke__11.call(this, this$, a, b, c, d, e, f, g, h, i, j);
      case 12:
        return _invoke__12.call(this, this$, a, b, c, d, e, f, g, h, i, j, k);
      case 13:
        return _invoke__13.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l);
      case 14:
        return _invoke__14.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m);
      case 15:
        return _invoke__15.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n);
      case 16:
        return _invoke__16.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
      case 17:
        return _invoke__17.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
      case 18:
        return _invoke__18.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
      case 19:
        return _invoke__19.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s);
      case 20:
        return _invoke__20.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t);
      case 21:
        return _invoke__21.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _invoke.cljs$lang$arity$1 = _invoke__1;
  _invoke.cljs$lang$arity$2 = _invoke__2;
  _invoke.cljs$lang$arity$3 = _invoke__3;
  _invoke.cljs$lang$arity$4 = _invoke__4;
  _invoke.cljs$lang$arity$5 = _invoke__5;
  _invoke.cljs$lang$arity$6 = _invoke__6;
  _invoke.cljs$lang$arity$7 = _invoke__7;
  _invoke.cljs$lang$arity$8 = _invoke__8;
  _invoke.cljs$lang$arity$9 = _invoke__9;
  _invoke.cljs$lang$arity$10 = _invoke__10;
  _invoke.cljs$lang$arity$11 = _invoke__11;
  _invoke.cljs$lang$arity$12 = _invoke__12;
  _invoke.cljs$lang$arity$13 = _invoke__13;
  _invoke.cljs$lang$arity$14 = _invoke__14;
  _invoke.cljs$lang$arity$15 = _invoke__15;
  _invoke.cljs$lang$arity$16 = _invoke__16;
  _invoke.cljs$lang$arity$17 = _invoke__17;
  _invoke.cljs$lang$arity$18 = _invoke__18;
  _invoke.cljs$lang$arity$19 = _invoke__19;
  _invoke.cljs$lang$arity$20 = _invoke__20;
  _invoke.cljs$lang$arity$21 = _invoke__21;
  return _invoke
}();
cljs.core.ICounted = {};
cljs.core._count = function _count(coll) {
  if(function() {
    var and__3822__auto____6448 = coll;
    if(and__3822__auto____6448) {
      return coll.cljs$core$ICounted$_count$arity$1
    }else {
      return and__3822__auto____6448
    }
  }()) {
    return coll.cljs$core$ICounted$_count$arity$1(coll)
  }else {
    var x__2363__auto____6449 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6450 = cljs.core._count[goog.typeOf(x__2363__auto____6449)];
      if(or__3824__auto____6450) {
        return or__3824__auto____6450
      }else {
        var or__3824__auto____6451 = cljs.core._count["_"];
        if(or__3824__auto____6451) {
          return or__3824__auto____6451
        }else {
          throw cljs.core.missing_protocol.call(null, "ICounted.-count", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function _empty(coll) {
  if(function() {
    var and__3822__auto____6456 = coll;
    if(and__3822__auto____6456) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1
    }else {
      return and__3822__auto____6456
    }
  }()) {
    return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
  }else {
    var x__2363__auto____6457 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6458 = cljs.core._empty[goog.typeOf(x__2363__auto____6457)];
      if(or__3824__auto____6458) {
        return or__3824__auto____6458
      }else {
        var or__3824__auto____6459 = cljs.core._empty["_"];
        if(or__3824__auto____6459) {
          return or__3824__auto____6459
        }else {
          throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ICollection = {};
cljs.core._conj = function _conj(coll, o) {
  if(function() {
    var and__3822__auto____6464 = coll;
    if(and__3822__auto____6464) {
      return coll.cljs$core$ICollection$_conj$arity$2
    }else {
      return and__3822__auto____6464
    }
  }()) {
    return coll.cljs$core$ICollection$_conj$arity$2(coll, o)
  }else {
    var x__2363__auto____6465 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6466 = cljs.core._conj[goog.typeOf(x__2363__auto____6465)];
      if(or__3824__auto____6466) {
        return or__3824__auto____6466
      }else {
        var or__3824__auto____6467 = cljs.core._conj["_"];
        if(or__3824__auto____6467) {
          return or__3824__auto____6467
        }else {
          throw cljs.core.missing_protocol.call(null, "ICollection.-conj", coll);
        }
      }
    }().call(null, coll, o)
  }
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var _nth = null;
  var _nth__2 = function(coll, n) {
    if(function() {
      var and__3822__auto____6476 = coll;
      if(and__3822__auto____6476) {
        return coll.cljs$core$IIndexed$_nth$arity$2
      }else {
        return and__3822__auto____6476
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
    }else {
      var x__2363__auto____6477 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6478 = cljs.core._nth[goog.typeOf(x__2363__auto____6477)];
        if(or__3824__auto____6478) {
          return or__3824__auto____6478
        }else {
          var or__3824__auto____6479 = cljs.core._nth["_"];
          if(or__3824__auto____6479) {
            return or__3824__auto____6479
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__3 = function(coll, n, not_found) {
    if(function() {
      var and__3822__auto____6480 = coll;
      if(and__3822__auto____6480) {
        return coll.cljs$core$IIndexed$_nth$arity$3
      }else {
        return and__3822__auto____6480
      }
    }()) {
      return coll.cljs$core$IIndexed$_nth$arity$3(coll, n, not_found)
    }else {
      var x__2363__auto____6481 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6482 = cljs.core._nth[goog.typeOf(x__2363__auto____6481)];
        if(or__3824__auto____6482) {
          return or__3824__auto____6482
        }else {
          var or__3824__auto____6483 = cljs.core._nth["_"];
          if(or__3824__auto____6483) {
            return or__3824__auto____6483
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n, not_found)
    }
  };
  _nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return _nth__2.call(this, coll, n);
      case 3:
        return _nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _nth.cljs$lang$arity$2 = _nth__2;
  _nth.cljs$lang$arity$3 = _nth__3;
  return _nth
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function _first(coll) {
  if(function() {
    var and__3822__auto____6488 = coll;
    if(and__3822__auto____6488) {
      return coll.cljs$core$ISeq$_first$arity$1
    }else {
      return and__3822__auto____6488
    }
  }()) {
    return coll.cljs$core$ISeq$_first$arity$1(coll)
  }else {
    var x__2363__auto____6489 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6490 = cljs.core._first[goog.typeOf(x__2363__auto____6489)];
      if(or__3824__auto____6490) {
        return or__3824__auto____6490
      }else {
        var or__3824__auto____6491 = cljs.core._first["_"];
        if(or__3824__auto____6491) {
          return or__3824__auto____6491
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(function() {
    var and__3822__auto____6496 = coll;
    if(and__3822__auto____6496) {
      return coll.cljs$core$ISeq$_rest$arity$1
    }else {
      return and__3822__auto____6496
    }
  }()) {
    return coll.cljs$core$ISeq$_rest$arity$1(coll)
  }else {
    var x__2363__auto____6497 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6498 = cljs.core._rest[goog.typeOf(x__2363__auto____6497)];
      if(or__3824__auto____6498) {
        return or__3824__auto____6498
      }else {
        var or__3824__auto____6499 = cljs.core._rest["_"];
        if(or__3824__auto____6499) {
          return or__3824__auto____6499
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.INext = {};
cljs.core._next = function _next(coll) {
  if(function() {
    var and__3822__auto____6504 = coll;
    if(and__3822__auto____6504) {
      return coll.cljs$core$INext$_next$arity$1
    }else {
      return and__3822__auto____6504
    }
  }()) {
    return coll.cljs$core$INext$_next$arity$1(coll)
  }else {
    var x__2363__auto____6505 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6506 = cljs.core._next[goog.typeOf(x__2363__auto____6505)];
      if(or__3824__auto____6506) {
        return or__3824__auto____6506
      }else {
        var or__3824__auto____6507 = cljs.core._next["_"];
        if(or__3824__auto____6507) {
          return or__3824__auto____6507
        }else {
          throw cljs.core.missing_protocol.call(null, "INext.-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var _lookup = null;
  var _lookup__2 = function(o, k) {
    if(function() {
      var and__3822__auto____6516 = o;
      if(and__3822__auto____6516) {
        return o.cljs$core$ILookup$_lookup$arity$2
      }else {
        return and__3822__auto____6516
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$2(o, k)
    }else {
      var x__2363__auto____6517 = o == null ? null : o;
      return function() {
        var or__3824__auto____6518 = cljs.core._lookup[goog.typeOf(x__2363__auto____6517)];
        if(or__3824__auto____6518) {
          return or__3824__auto____6518
        }else {
          var or__3824__auto____6519 = cljs.core._lookup["_"];
          if(or__3824__auto____6519) {
            return or__3824__auto____6519
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__3 = function(o, k, not_found) {
    if(function() {
      var and__3822__auto____6520 = o;
      if(and__3822__auto____6520) {
        return o.cljs$core$ILookup$_lookup$arity$3
      }else {
        return and__3822__auto____6520
      }
    }()) {
      return o.cljs$core$ILookup$_lookup$arity$3(o, k, not_found)
    }else {
      var x__2363__auto____6521 = o == null ? null : o;
      return function() {
        var or__3824__auto____6522 = cljs.core._lookup[goog.typeOf(x__2363__auto____6521)];
        if(or__3824__auto____6522) {
          return or__3824__auto____6522
        }else {
          var or__3824__auto____6523 = cljs.core._lookup["_"];
          if(or__3824__auto____6523) {
            return or__3824__auto____6523
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k, not_found)
    }
  };
  _lookup = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return _lookup__2.call(this, o, k);
      case 3:
        return _lookup__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _lookup.cljs$lang$arity$2 = _lookup__2;
  _lookup.cljs$lang$arity$3 = _lookup__3;
  return _lookup
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function _contains_key_QMARK_(coll, k) {
  if(function() {
    var and__3822__auto____6528 = coll;
    if(and__3822__auto____6528) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2
    }else {
      return and__3822__auto____6528
    }
  }()) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll, k)
  }else {
    var x__2363__auto____6529 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6530 = cljs.core._contains_key_QMARK_[goog.typeOf(x__2363__auto____6529)];
      if(or__3824__auto____6530) {
        return or__3824__auto____6530
      }else {
        var or__3824__auto____6531 = cljs.core._contains_key_QMARK_["_"];
        if(or__3824__auto____6531) {
          return or__3824__auto____6531
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(function() {
    var and__3822__auto____6536 = coll;
    if(and__3822__auto____6536) {
      return coll.cljs$core$IAssociative$_assoc$arity$3
    }else {
      return and__3822__auto____6536
    }
  }()) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, k, v)
  }else {
    var x__2363__auto____6537 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6538 = cljs.core._assoc[goog.typeOf(x__2363__auto____6537)];
      if(or__3824__auto____6538) {
        return or__3824__auto____6538
      }else {
        var or__3824__auto____6539 = cljs.core._assoc["_"];
        if(or__3824__auto____6539) {
          return or__3824__auto____6539
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", coll);
        }
      }
    }().call(null, coll, k, v)
  }
};
cljs.core.IMap = {};
cljs.core._dissoc = function _dissoc(coll, k) {
  if(function() {
    var and__3822__auto____6544 = coll;
    if(and__3822__auto____6544) {
      return coll.cljs$core$IMap$_dissoc$arity$2
    }else {
      return and__3822__auto____6544
    }
  }()) {
    return coll.cljs$core$IMap$_dissoc$arity$2(coll, k)
  }else {
    var x__2363__auto____6545 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6546 = cljs.core._dissoc[goog.typeOf(x__2363__auto____6545)];
      if(or__3824__auto____6546) {
        return or__3824__auto____6546
      }else {
        var or__3824__auto____6547 = cljs.core._dissoc["_"];
        if(or__3824__auto____6547) {
          return or__3824__auto____6547
        }else {
          throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core.IMapEntry = {};
cljs.core._key = function _key(coll) {
  if(function() {
    var and__3822__auto____6552 = coll;
    if(and__3822__auto____6552) {
      return coll.cljs$core$IMapEntry$_key$arity$1
    }else {
      return and__3822__auto____6552
    }
  }()) {
    return coll.cljs$core$IMapEntry$_key$arity$1(coll)
  }else {
    var x__2363__auto____6553 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6554 = cljs.core._key[goog.typeOf(x__2363__auto____6553)];
      if(or__3824__auto____6554) {
        return or__3824__auto____6554
      }else {
        var or__3824__auto____6555 = cljs.core._key["_"];
        if(or__3824__auto____6555) {
          return or__3824__auto____6555
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._val = function _val(coll) {
  if(function() {
    var and__3822__auto____6560 = coll;
    if(and__3822__auto____6560) {
      return coll.cljs$core$IMapEntry$_val$arity$1
    }else {
      return and__3822__auto____6560
    }
  }()) {
    return coll.cljs$core$IMapEntry$_val$arity$1(coll)
  }else {
    var x__2363__auto____6561 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6562 = cljs.core._val[goog.typeOf(x__2363__auto____6561)];
      if(or__3824__auto____6562) {
        return or__3824__auto____6562
      }else {
        var or__3824__auto____6563 = cljs.core._val["_"];
        if(or__3824__auto____6563) {
          return or__3824__auto____6563
        }else {
          throw cljs.core.missing_protocol.call(null, "IMapEntry.-val", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISet = {};
cljs.core._disjoin = function _disjoin(coll, v) {
  if(function() {
    var and__3822__auto____6568 = coll;
    if(and__3822__auto____6568) {
      return coll.cljs$core$ISet$_disjoin$arity$2
    }else {
      return and__3822__auto____6568
    }
  }()) {
    return coll.cljs$core$ISet$_disjoin$arity$2(coll, v)
  }else {
    var x__2363__auto____6569 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6570 = cljs.core._disjoin[goog.typeOf(x__2363__auto____6569)];
      if(or__3824__auto____6570) {
        return or__3824__auto____6570
      }else {
        var or__3824__auto____6571 = cljs.core._disjoin["_"];
        if(or__3824__auto____6571) {
          return or__3824__auto____6571
        }else {
          throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", coll);
        }
      }
    }().call(null, coll, v)
  }
};
cljs.core.IStack = {};
cljs.core._peek = function _peek(coll) {
  if(function() {
    var and__3822__auto____6576 = coll;
    if(and__3822__auto____6576) {
      return coll.cljs$core$IStack$_peek$arity$1
    }else {
      return and__3822__auto____6576
    }
  }()) {
    return coll.cljs$core$IStack$_peek$arity$1(coll)
  }else {
    var x__2363__auto____6577 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6578 = cljs.core._peek[goog.typeOf(x__2363__auto____6577)];
      if(or__3824__auto____6578) {
        return or__3824__auto____6578
      }else {
        var or__3824__auto____6579 = cljs.core._peek["_"];
        if(or__3824__auto____6579) {
          return or__3824__auto____6579
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(function() {
    var and__3822__auto____6584 = coll;
    if(and__3822__auto____6584) {
      return coll.cljs$core$IStack$_pop$arity$1
    }else {
      return and__3822__auto____6584
    }
  }()) {
    return coll.cljs$core$IStack$_pop$arity$1(coll)
  }else {
    var x__2363__auto____6585 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6586 = cljs.core._pop[goog.typeOf(x__2363__auto____6585)];
      if(or__3824__auto____6586) {
        return or__3824__auto____6586
      }else {
        var or__3824__auto____6587 = cljs.core._pop["_"];
        if(or__3824__auto____6587) {
          return or__3824__auto____6587
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-pop", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IVector = {};
cljs.core._assoc_n = function _assoc_n(coll, n, val) {
  if(function() {
    var and__3822__auto____6592 = coll;
    if(and__3822__auto____6592) {
      return coll.cljs$core$IVector$_assoc_n$arity$3
    }else {
      return and__3822__auto____6592
    }
  }()) {
    return coll.cljs$core$IVector$_assoc_n$arity$3(coll, n, val)
  }else {
    var x__2363__auto____6593 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6594 = cljs.core._assoc_n[goog.typeOf(x__2363__auto____6593)];
      if(or__3824__auto____6594) {
        return or__3824__auto____6594
      }else {
        var or__3824__auto____6595 = cljs.core._assoc_n["_"];
        if(or__3824__auto____6595) {
          return or__3824__auto____6595
        }else {
          throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", coll);
        }
      }
    }().call(null, coll, n, val)
  }
};
cljs.core.IDeref = {};
cljs.core._deref = function _deref(o) {
  if(function() {
    var and__3822__auto____6600 = o;
    if(and__3822__auto____6600) {
      return o.cljs$core$IDeref$_deref$arity$1
    }else {
      return and__3822__auto____6600
    }
  }()) {
    return o.cljs$core$IDeref$_deref$arity$1(o)
  }else {
    var x__2363__auto____6601 = o == null ? null : o;
    return function() {
      var or__3824__auto____6602 = cljs.core._deref[goog.typeOf(x__2363__auto____6601)];
      if(or__3824__auto____6602) {
        return or__3824__auto____6602
      }else {
        var or__3824__auto____6603 = cljs.core._deref["_"];
        if(or__3824__auto____6603) {
          return or__3824__auto____6603
        }else {
          throw cljs.core.missing_protocol.call(null, "IDeref.-deref", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function _deref_with_timeout(o, msec, timeout_val) {
  if(function() {
    var and__3822__auto____6608 = o;
    if(and__3822__auto____6608) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3
    }else {
      return and__3822__auto____6608
    }
  }()) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o, msec, timeout_val)
  }else {
    var x__2363__auto____6609 = o == null ? null : o;
    return function() {
      var or__3824__auto____6610 = cljs.core._deref_with_timeout[goog.typeOf(x__2363__auto____6609)];
      if(or__3824__auto____6610) {
        return or__3824__auto____6610
      }else {
        var or__3824__auto____6611 = cljs.core._deref_with_timeout["_"];
        if(or__3824__auto____6611) {
          return or__3824__auto____6611
        }else {
          throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", o);
        }
      }
    }().call(null, o, msec, timeout_val)
  }
};
cljs.core.IMeta = {};
cljs.core._meta = function _meta(o) {
  if(function() {
    var and__3822__auto____6616 = o;
    if(and__3822__auto____6616) {
      return o.cljs$core$IMeta$_meta$arity$1
    }else {
      return and__3822__auto____6616
    }
  }()) {
    return o.cljs$core$IMeta$_meta$arity$1(o)
  }else {
    var x__2363__auto____6617 = o == null ? null : o;
    return function() {
      var or__3824__auto____6618 = cljs.core._meta[goog.typeOf(x__2363__auto____6617)];
      if(or__3824__auto____6618) {
        return or__3824__auto____6618
      }else {
        var or__3824__auto____6619 = cljs.core._meta["_"];
        if(or__3824__auto____6619) {
          return or__3824__auto____6619
        }else {
          throw cljs.core.missing_protocol.call(null, "IMeta.-meta", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function _with_meta(o, meta) {
  if(function() {
    var and__3822__auto____6624 = o;
    if(and__3822__auto____6624) {
      return o.cljs$core$IWithMeta$_with_meta$arity$2
    }else {
      return and__3822__auto____6624
    }
  }()) {
    return o.cljs$core$IWithMeta$_with_meta$arity$2(o, meta)
  }else {
    var x__2363__auto____6625 = o == null ? null : o;
    return function() {
      var or__3824__auto____6626 = cljs.core._with_meta[goog.typeOf(x__2363__auto____6625)];
      if(or__3824__auto____6626) {
        return or__3824__auto____6626
      }else {
        var or__3824__auto____6627 = cljs.core._with_meta["_"];
        if(or__3824__auto____6627) {
          return or__3824__auto____6627
        }else {
          throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", o);
        }
      }
    }().call(null, o, meta)
  }
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var _reduce = null;
  var _reduce__2 = function(coll, f) {
    if(function() {
      var and__3822__auto____6636 = coll;
      if(and__3822__auto____6636) {
        return coll.cljs$core$IReduce$_reduce$arity$2
      }else {
        return and__3822__auto____6636
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$2(coll, f)
    }else {
      var x__2363__auto____6637 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6638 = cljs.core._reduce[goog.typeOf(x__2363__auto____6637)];
        if(or__3824__auto____6638) {
          return or__3824__auto____6638
        }else {
          var or__3824__auto____6639 = cljs.core._reduce["_"];
          if(or__3824__auto____6639) {
            return or__3824__auto____6639
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__3 = function(coll, f, start) {
    if(function() {
      var and__3822__auto____6640 = coll;
      if(and__3822__auto____6640) {
        return coll.cljs$core$IReduce$_reduce$arity$3
      }else {
        return and__3822__auto____6640
      }
    }()) {
      return coll.cljs$core$IReduce$_reduce$arity$3(coll, f, start)
    }else {
      var x__2363__auto____6641 = coll == null ? null : coll;
      return function() {
        var or__3824__auto____6642 = cljs.core._reduce[goog.typeOf(x__2363__auto____6641)];
        if(or__3824__auto____6642) {
          return or__3824__auto____6642
        }else {
          var or__3824__auto____6643 = cljs.core._reduce["_"];
          if(or__3824__auto____6643) {
            return or__3824__auto____6643
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f, start)
    }
  };
  _reduce = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return _reduce__2.call(this, coll, f);
      case 3:
        return _reduce__3.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _reduce.cljs$lang$arity$2 = _reduce__2;
  _reduce.cljs$lang$arity$3 = _reduce__3;
  return _reduce
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function _kv_reduce(coll, f, init) {
  if(function() {
    var and__3822__auto____6648 = coll;
    if(and__3822__auto____6648) {
      return coll.cljs$core$IKVReduce$_kv_reduce$arity$3
    }else {
      return and__3822__auto____6648
    }
  }()) {
    return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll, f, init)
  }else {
    var x__2363__auto____6649 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6650 = cljs.core._kv_reduce[goog.typeOf(x__2363__auto____6649)];
      if(or__3824__auto____6650) {
        return or__3824__auto____6650
      }else {
        var or__3824__auto____6651 = cljs.core._kv_reduce["_"];
        if(or__3824__auto____6651) {
          return or__3824__auto____6651
        }else {
          throw cljs.core.missing_protocol.call(null, "IKVReduce.-kv-reduce", coll);
        }
      }
    }().call(null, coll, f, init)
  }
};
cljs.core.IEquiv = {};
cljs.core._equiv = function _equiv(o, other) {
  if(function() {
    var and__3822__auto____6656 = o;
    if(and__3822__auto____6656) {
      return o.cljs$core$IEquiv$_equiv$arity$2
    }else {
      return and__3822__auto____6656
    }
  }()) {
    return o.cljs$core$IEquiv$_equiv$arity$2(o, other)
  }else {
    var x__2363__auto____6657 = o == null ? null : o;
    return function() {
      var or__3824__auto____6658 = cljs.core._equiv[goog.typeOf(x__2363__auto____6657)];
      if(or__3824__auto____6658) {
        return or__3824__auto____6658
      }else {
        var or__3824__auto____6659 = cljs.core._equiv["_"];
        if(or__3824__auto____6659) {
          return or__3824__auto____6659
        }else {
          throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", o);
        }
      }
    }().call(null, o, other)
  }
};
cljs.core.IHash = {};
cljs.core._hash = function _hash(o) {
  if(function() {
    var and__3822__auto____6664 = o;
    if(and__3822__auto____6664) {
      return o.cljs$core$IHash$_hash$arity$1
    }else {
      return and__3822__auto____6664
    }
  }()) {
    return o.cljs$core$IHash$_hash$arity$1(o)
  }else {
    var x__2363__auto____6665 = o == null ? null : o;
    return function() {
      var or__3824__auto____6666 = cljs.core._hash[goog.typeOf(x__2363__auto____6665)];
      if(or__3824__auto____6666) {
        return or__3824__auto____6666
      }else {
        var or__3824__auto____6667 = cljs.core._hash["_"];
        if(or__3824__auto____6667) {
          return or__3824__auto____6667
        }else {
          throw cljs.core.missing_protocol.call(null, "IHash.-hash", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISeqable = {};
cljs.core._seq = function _seq(o) {
  if(function() {
    var and__3822__auto____6672 = o;
    if(and__3822__auto____6672) {
      return o.cljs$core$ISeqable$_seq$arity$1
    }else {
      return and__3822__auto____6672
    }
  }()) {
    return o.cljs$core$ISeqable$_seq$arity$1(o)
  }else {
    var x__2363__auto____6673 = o == null ? null : o;
    return function() {
      var or__3824__auto____6674 = cljs.core._seq[goog.typeOf(x__2363__auto____6673)];
      if(or__3824__auto____6674) {
        return or__3824__auto____6674
      }else {
        var or__3824__auto____6675 = cljs.core._seq["_"];
        if(or__3824__auto____6675) {
          return or__3824__auto____6675
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function _rseq(coll) {
  if(function() {
    var and__3822__auto____6680 = coll;
    if(and__3822__auto____6680) {
      return coll.cljs$core$IReversible$_rseq$arity$1
    }else {
      return and__3822__auto____6680
    }
  }()) {
    return coll.cljs$core$IReversible$_rseq$arity$1(coll)
  }else {
    var x__2363__auto____6681 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6682 = cljs.core._rseq[goog.typeOf(x__2363__auto____6681)];
      if(or__3824__auto____6682) {
        return or__3824__auto____6682
      }else {
        var or__3824__auto____6683 = cljs.core._rseq["_"];
        if(or__3824__auto____6683) {
          return or__3824__auto____6683
        }else {
          throw cljs.core.missing_protocol.call(null, "IReversible.-rseq", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function _sorted_seq(coll, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____6688 = coll;
    if(and__3822__auto____6688) {
      return coll.cljs$core$ISorted$_sorted_seq$arity$2
    }else {
      return and__3822__auto____6688
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll, ascending_QMARK_)
  }else {
    var x__2363__auto____6689 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6690 = cljs.core._sorted_seq[goog.typeOf(x__2363__auto____6689)];
      if(or__3824__auto____6690) {
        return or__3824__auto____6690
      }else {
        var or__3824__auto____6691 = cljs.core._sorted_seq["_"];
        if(or__3824__auto____6691) {
          return or__3824__auto____6691
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", coll);
        }
      }
    }().call(null, coll, ascending_QMARK_)
  }
};
cljs.core._sorted_seq_from = function _sorted_seq_from(coll, k, ascending_QMARK_) {
  if(function() {
    var and__3822__auto____6696 = coll;
    if(and__3822__auto____6696) {
      return coll.cljs$core$ISorted$_sorted_seq_from$arity$3
    }else {
      return and__3822__auto____6696
    }
  }()) {
    return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll, k, ascending_QMARK_)
  }else {
    var x__2363__auto____6697 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6698 = cljs.core._sorted_seq_from[goog.typeOf(x__2363__auto____6697)];
      if(or__3824__auto____6698) {
        return or__3824__auto____6698
      }else {
        var or__3824__auto____6699 = cljs.core._sorted_seq_from["_"];
        if(or__3824__auto____6699) {
          return or__3824__auto____6699
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", coll);
        }
      }
    }().call(null, coll, k, ascending_QMARK_)
  }
};
cljs.core._entry_key = function _entry_key(coll, entry) {
  if(function() {
    var and__3822__auto____6704 = coll;
    if(and__3822__auto____6704) {
      return coll.cljs$core$ISorted$_entry_key$arity$2
    }else {
      return and__3822__auto____6704
    }
  }()) {
    return coll.cljs$core$ISorted$_entry_key$arity$2(coll, entry)
  }else {
    var x__2363__auto____6705 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6706 = cljs.core._entry_key[goog.typeOf(x__2363__auto____6705)];
      if(or__3824__auto____6706) {
        return or__3824__auto____6706
      }else {
        var or__3824__auto____6707 = cljs.core._entry_key["_"];
        if(or__3824__auto____6707) {
          return or__3824__auto____6707
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", coll);
        }
      }
    }().call(null, coll, entry)
  }
};
cljs.core._comparator = function _comparator(coll) {
  if(function() {
    var and__3822__auto____6712 = coll;
    if(and__3822__auto____6712) {
      return coll.cljs$core$ISorted$_comparator$arity$1
    }else {
      return and__3822__auto____6712
    }
  }()) {
    return coll.cljs$core$ISorted$_comparator$arity$1(coll)
  }else {
    var x__2363__auto____6713 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6714 = cljs.core._comparator[goog.typeOf(x__2363__auto____6713)];
      if(or__3824__auto____6714) {
        return or__3824__auto____6714
      }else {
        var or__3824__auto____6715 = cljs.core._comparator["_"];
        if(or__3824__auto____6715) {
          return or__3824__auto____6715
        }else {
          throw cljs.core.missing_protocol.call(null, "ISorted.-comparator", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function _pr_seq(o, opts) {
  if(function() {
    var and__3822__auto____6720 = o;
    if(and__3822__auto____6720) {
      return o.cljs$core$IPrintable$_pr_seq$arity$2
    }else {
      return and__3822__auto____6720
    }
  }()) {
    return o.cljs$core$IPrintable$_pr_seq$arity$2(o, opts)
  }else {
    var x__2363__auto____6721 = o == null ? null : o;
    return function() {
      var or__3824__auto____6722 = cljs.core._pr_seq[goog.typeOf(x__2363__auto____6721)];
      if(or__3824__auto____6722) {
        return or__3824__auto____6722
      }else {
        var or__3824__auto____6723 = cljs.core._pr_seq["_"];
        if(or__3824__auto____6723) {
          return or__3824__auto____6723
        }else {
          throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", o);
        }
      }
    }().call(null, o, opts)
  }
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function _realized_QMARK_(d) {
  if(function() {
    var and__3822__auto____6728 = d;
    if(and__3822__auto____6728) {
      return d.cljs$core$IPending$_realized_QMARK_$arity$1
    }else {
      return and__3822__auto____6728
    }
  }()) {
    return d.cljs$core$IPending$_realized_QMARK_$arity$1(d)
  }else {
    var x__2363__auto____6729 = d == null ? null : d;
    return function() {
      var or__3824__auto____6730 = cljs.core._realized_QMARK_[goog.typeOf(x__2363__auto____6729)];
      if(or__3824__auto____6730) {
        return or__3824__auto____6730
      }else {
        var or__3824__auto____6731 = cljs.core._realized_QMARK_["_"];
        if(or__3824__auto____6731) {
          return or__3824__auto____6731
        }else {
          throw cljs.core.missing_protocol.call(null, "IPending.-realized?", d);
        }
      }
    }().call(null, d)
  }
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function _notify_watches(this$, oldval, newval) {
  if(function() {
    var and__3822__auto____6736 = this$;
    if(and__3822__auto____6736) {
      return this$.cljs$core$IWatchable$_notify_watches$arity$3
    }else {
      return and__3822__auto____6736
    }
  }()) {
    return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$, oldval, newval)
  }else {
    var x__2363__auto____6737 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6738 = cljs.core._notify_watches[goog.typeOf(x__2363__auto____6737)];
      if(or__3824__auto____6738) {
        return or__3824__auto____6738
      }else {
        var or__3824__auto____6739 = cljs.core._notify_watches["_"];
        if(or__3824__auto____6739) {
          return or__3824__auto____6739
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(function() {
    var and__3822__auto____6744 = this$;
    if(and__3822__auto____6744) {
      return this$.cljs$core$IWatchable$_add_watch$arity$3
    }else {
      return and__3822__auto____6744
    }
  }()) {
    return this$.cljs$core$IWatchable$_add_watch$arity$3(this$, key, f)
  }else {
    var x__2363__auto____6745 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6746 = cljs.core._add_watch[goog.typeOf(x__2363__auto____6745)];
      if(or__3824__auto____6746) {
        return or__3824__auto____6746
      }else {
        var or__3824__auto____6747 = cljs.core._add_watch["_"];
        if(or__3824__auto____6747) {
          return or__3824__auto____6747
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(function() {
    var and__3822__auto____6752 = this$;
    if(and__3822__auto____6752) {
      return this$.cljs$core$IWatchable$_remove_watch$arity$2
    }else {
      return and__3822__auto____6752
    }
  }()) {
    return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$, key)
  }else {
    var x__2363__auto____6753 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____6754 = cljs.core._remove_watch[goog.typeOf(x__2363__auto____6753)];
      if(or__3824__auto____6754) {
        return or__3824__auto____6754
      }else {
        var or__3824__auto____6755 = cljs.core._remove_watch["_"];
        if(or__3824__auto____6755) {
          return or__3824__auto____6755
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", this$);
        }
      }
    }().call(null, this$, key)
  }
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function _as_transient(coll) {
  if(function() {
    var and__3822__auto____6760 = coll;
    if(and__3822__auto____6760) {
      return coll.cljs$core$IEditableCollection$_as_transient$arity$1
    }else {
      return and__3822__auto____6760
    }
  }()) {
    return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll)
  }else {
    var x__2363__auto____6761 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6762 = cljs.core._as_transient[goog.typeOf(x__2363__auto____6761)];
      if(or__3824__auto____6762) {
        return or__3824__auto____6762
      }else {
        var or__3824__auto____6763 = cljs.core._as_transient["_"];
        if(or__3824__auto____6763) {
          return or__3824__auto____6763
        }else {
          throw cljs.core.missing_protocol.call(null, "IEditableCollection.-as-transient", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function _conj_BANG_(tcoll, val) {
  if(function() {
    var and__3822__auto____6768 = tcoll;
    if(and__3822__auto____6768) {
      return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2
    }else {
      return and__3822__auto____6768
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
  }else {
    var x__2363__auto____6769 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6770 = cljs.core._conj_BANG_[goog.typeOf(x__2363__auto____6769)];
      if(or__3824__auto____6770) {
        return or__3824__auto____6770
      }else {
        var or__3824__auto____6771 = cljs.core._conj_BANG_["_"];
        if(or__3824__auto____6771) {
          return or__3824__auto____6771
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", tcoll);
        }
      }
    }().call(null, tcoll, val)
  }
};
cljs.core._persistent_BANG_ = function _persistent_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6776 = tcoll;
    if(and__3822__auto____6776) {
      return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1
    }else {
      return and__3822__auto____6776
    }
  }()) {
    return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll)
  }else {
    var x__2363__auto____6777 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6778 = cljs.core._persistent_BANG_[goog.typeOf(x__2363__auto____6777)];
      if(or__3824__auto____6778) {
        return or__3824__auto____6778
      }else {
        var or__3824__auto____6779 = cljs.core._persistent_BANG_["_"];
        if(or__3824__auto____6779) {
          return or__3824__auto____6779
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientCollection.-persistent!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function _assoc_BANG_(tcoll, key, val) {
  if(function() {
    var and__3822__auto____6784 = tcoll;
    if(and__3822__auto____6784) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3
    }else {
      return and__3822__auto____6784
    }
  }()) {
    return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, key, val)
  }else {
    var x__2363__auto____6785 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6786 = cljs.core._assoc_BANG_[goog.typeOf(x__2363__auto____6785)];
      if(or__3824__auto____6786) {
        return or__3824__auto____6786
      }else {
        var or__3824__auto____6787 = cljs.core._assoc_BANG_["_"];
        if(or__3824__auto____6787) {
          return or__3824__auto____6787
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientAssociative.-assoc!", tcoll);
        }
      }
    }().call(null, tcoll, key, val)
  }
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function _dissoc_BANG_(tcoll, key) {
  if(function() {
    var and__3822__auto____6792 = tcoll;
    if(and__3822__auto____6792) {
      return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2
    }else {
      return and__3822__auto____6792
    }
  }()) {
    return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll, key)
  }else {
    var x__2363__auto____6793 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6794 = cljs.core._dissoc_BANG_[goog.typeOf(x__2363__auto____6793)];
      if(or__3824__auto____6794) {
        return or__3824__auto____6794
      }else {
        var or__3824__auto____6795 = cljs.core._dissoc_BANG_["_"];
        if(or__3824__auto____6795) {
          return or__3824__auto____6795
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientMap.-dissoc!", tcoll);
        }
      }
    }().call(null, tcoll, key)
  }
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function _assoc_n_BANG_(tcoll, n, val) {
  if(function() {
    var and__3822__auto____6800 = tcoll;
    if(and__3822__auto____6800) {
      return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3
    }else {
      return and__3822__auto____6800
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, n, val)
  }else {
    var x__2363__auto____6801 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6802 = cljs.core._assoc_n_BANG_[goog.typeOf(x__2363__auto____6801)];
      if(or__3824__auto____6802) {
        return or__3824__auto____6802
      }else {
        var or__3824__auto____6803 = cljs.core._assoc_n_BANG_["_"];
        if(or__3824__auto____6803) {
          return or__3824__auto____6803
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", tcoll);
        }
      }
    }().call(null, tcoll, n, val)
  }
};
cljs.core._pop_BANG_ = function _pop_BANG_(tcoll) {
  if(function() {
    var and__3822__auto____6808 = tcoll;
    if(and__3822__auto____6808) {
      return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1
    }else {
      return and__3822__auto____6808
    }
  }()) {
    return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll)
  }else {
    var x__2363__auto____6809 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6810 = cljs.core._pop_BANG_[goog.typeOf(x__2363__auto____6809)];
      if(or__3824__auto____6810) {
        return or__3824__auto____6810
      }else {
        var or__3824__auto____6811 = cljs.core._pop_BANG_["_"];
        if(or__3824__auto____6811) {
          return or__3824__auto____6811
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientVector.-pop!", tcoll);
        }
      }
    }().call(null, tcoll)
  }
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function _disjoin_BANG_(tcoll, v) {
  if(function() {
    var and__3822__auto____6816 = tcoll;
    if(and__3822__auto____6816) {
      return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2
    }else {
      return and__3822__auto____6816
    }
  }()) {
    return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll, v)
  }else {
    var x__2363__auto____6817 = tcoll == null ? null : tcoll;
    return function() {
      var or__3824__auto____6818 = cljs.core._disjoin_BANG_[goog.typeOf(x__2363__auto____6817)];
      if(or__3824__auto____6818) {
        return or__3824__auto____6818
      }else {
        var or__3824__auto____6819 = cljs.core._disjoin_BANG_["_"];
        if(or__3824__auto____6819) {
          return or__3824__auto____6819
        }else {
          throw cljs.core.missing_protocol.call(null, "ITransientSet.-disjoin!", tcoll);
        }
      }
    }().call(null, tcoll, v)
  }
};
cljs.core.IComparable = {};
cljs.core._compare = function _compare(x, y) {
  if(function() {
    var and__3822__auto____6824 = x;
    if(and__3822__auto____6824) {
      return x.cljs$core$IComparable$_compare$arity$2
    }else {
      return and__3822__auto____6824
    }
  }()) {
    return x.cljs$core$IComparable$_compare$arity$2(x, y)
  }else {
    var x__2363__auto____6825 = x == null ? null : x;
    return function() {
      var or__3824__auto____6826 = cljs.core._compare[goog.typeOf(x__2363__auto____6825)];
      if(or__3824__auto____6826) {
        return or__3824__auto____6826
      }else {
        var or__3824__auto____6827 = cljs.core._compare["_"];
        if(or__3824__auto____6827) {
          return or__3824__auto____6827
        }else {
          throw cljs.core.missing_protocol.call(null, "IComparable.-compare", x);
        }
      }
    }().call(null, x, y)
  }
};
cljs.core.IChunk = {};
cljs.core._drop_first = function _drop_first(coll) {
  if(function() {
    var and__3822__auto____6832 = coll;
    if(and__3822__auto____6832) {
      return coll.cljs$core$IChunk$_drop_first$arity$1
    }else {
      return and__3822__auto____6832
    }
  }()) {
    return coll.cljs$core$IChunk$_drop_first$arity$1(coll)
  }else {
    var x__2363__auto____6833 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6834 = cljs.core._drop_first[goog.typeOf(x__2363__auto____6833)];
      if(or__3824__auto____6834) {
        return or__3824__auto____6834
      }else {
        var or__3824__auto____6835 = cljs.core._drop_first["_"];
        if(or__3824__auto____6835) {
          return or__3824__auto____6835
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunk.-drop-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function _chunked_first(coll) {
  if(function() {
    var and__3822__auto____6840 = coll;
    if(and__3822__auto____6840) {
      return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1
    }else {
      return and__3822__auto____6840
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll)
  }else {
    var x__2363__auto____6841 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6842 = cljs.core._chunked_first[goog.typeOf(x__2363__auto____6841)];
      if(or__3824__auto____6842) {
        return or__3824__auto____6842
      }else {
        var or__3824__auto____6843 = cljs.core._chunked_first["_"];
        if(or__3824__auto____6843) {
          return or__3824__auto____6843
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._chunked_rest = function _chunked_rest(coll) {
  if(function() {
    var and__3822__auto____6848 = coll;
    if(and__3822__auto____6848) {
      return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1
    }else {
      return and__3822__auto____6848
    }
  }()) {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }else {
    var x__2363__auto____6849 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6850 = cljs.core._chunked_rest[goog.typeOf(x__2363__auto____6849)];
      if(or__3824__auto____6850) {
        return or__3824__auto____6850
      }else {
        var or__3824__auto____6851 = cljs.core._chunked_rest["_"];
        if(or__3824__auto____6851) {
          return or__3824__auto____6851
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function _chunked_next(coll) {
  if(function() {
    var and__3822__auto____6856 = coll;
    if(and__3822__auto____6856) {
      return coll.cljs$core$IChunkedNext$_chunked_next$arity$1
    }else {
      return and__3822__auto____6856
    }
  }()) {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }else {
    var x__2363__auto____6857 = coll == null ? null : coll;
    return function() {
      var or__3824__auto____6858 = cljs.core._chunked_next[goog.typeOf(x__2363__auto____6857)];
      if(or__3824__auto____6858) {
        return or__3824__auto____6858
      }else {
        var or__3824__auto____6859 = cljs.core._chunked_next["_"];
        if(or__3824__auto____6859) {
          return or__3824__auto____6859
        }else {
          throw cljs.core.missing_protocol.call(null, "IChunkedNext.-chunked-next", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.identical_QMARK_ = function identical_QMARK_(x, y) {
  return x === y
};
cljs.core._EQ_ = function() {
  var _EQ_ = null;
  var _EQ___1 = function(x) {
    return true
  };
  var _EQ___2 = function(x, y) {
    var or__3824__auto____6861 = x === y;
    if(or__3824__auto____6861) {
      return or__3824__auto____6861
    }else {
      return cljs.core._equiv.call(null, x, y)
    }
  };
  var _EQ___3 = function() {
    var G__6862__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__6863 = y;
            var G__6864 = cljs.core.first.call(null, more);
            var G__6865 = cljs.core.next.call(null, more);
            x = G__6863;
            y = G__6864;
            more = G__6865;
            continue
          }else {
            return _EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__6862 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6862__delegate.call(this, x, y, more)
    };
    G__6862.cljs$lang$maxFixedArity = 2;
    G__6862.cljs$lang$applyTo = function(arglist__6866) {
      var x = cljs.core.first(arglist__6866);
      var y = cljs.core.first(cljs.core.next(arglist__6866));
      var more = cljs.core.rest(cljs.core.next(arglist__6866));
      return G__6862__delegate(x, y, more)
    };
    G__6862.cljs$lang$arity$variadic = G__6862__delegate;
    return G__6862
  }();
  _EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ___1.call(this, x);
      case 2:
        return _EQ___2.call(this, x, y);
      default:
        return _EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ_.cljs$lang$maxFixedArity = 2;
  _EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
  _EQ_.cljs$lang$arity$1 = _EQ___1;
  _EQ_.cljs$lang$arity$2 = _EQ___2;
  _EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
  return _EQ_
}();
cljs.core.nil_QMARK_ = function nil_QMARK_(x) {
  return x == null
};
cljs.core.type = function type(x) {
  if(x == null) {
    return null
  }else {
    return x.constructor
  }
};
cljs.core.instance_QMARK_ = function instance_QMARK_(t, o) {
  return o instanceof t
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function(o) {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var G__6867 = null;
  var G__6867__2 = function(o, k) {
    return null
  };
  var G__6867__3 = function(o, k, not_found) {
    return not_found
  };
  G__6867 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6867__2.call(this, o, k);
      case 3:
        return G__6867__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6867
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(_, k, v) {
  return cljs.core.hash_map.call(null, k, v)
};
cljs.core.INext["null"] = true;
cljs.core._next["null"] = function(_) {
  return null
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(_, o) {
  return cljs.core.list.call(null, o)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var G__6868 = null;
  var G__6868__2 = function(_, f) {
    return f.call(null)
  };
  var G__6868__3 = function(_, f, start) {
    return start
  };
  G__6868 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6868__2.call(this, _, f);
      case 3:
        return G__6868__3.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6868
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function(o) {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function(_, v) {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function(_) {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function(_) {
  return null
};
cljs.core._pop["null"] = function(_) {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function(_) {
  return null
};
cljs.core._rest["null"] = function(_) {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(_, o) {
  return o == null
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function(_, meta) {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function(_) {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var G__6869 = null;
  var G__6869__2 = function(_, n) {
    return null
  };
  var G__6869__3 = function(_, n, not_found) {
    return not_found
  };
  G__6869 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6869__2.call(this, _, n);
      case 3:
        return G__6869__3.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6869
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function(_) {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function(_, k) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var and__3822__auto____6870 = cljs.core.instance_QMARK_.call(null, Date, other);
  if(and__3822__auto____6870) {
    return o.toString() === other.toString()
  }else {
    return and__3822__auto____6870
  }
};
cljs.core.IHash["number"] = true;
cljs.core._hash["number"] = function(o) {
  return o
};
cljs.core.IEquiv["number"] = true;
cljs.core._equiv["number"] = function(x, o) {
  return x === o
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(o) {
  if(o === true) {
    return 1
  }else {
    return 0
  }
};
cljs.core.IHash["_"] = true;
cljs.core._hash["_"] = function(o) {
  return goog.getUid(o)
};
cljs.core.inc = function inc(x) {
  return x + 1
};
cljs.core.ci_reduce = function() {
  var ci_reduce = null;
  var ci_reduce__2 = function(cicoll, f) {
    var cnt__6883 = cljs.core._count.call(null, cicoll);
    if(cnt__6883 === 0) {
      return f.call(null)
    }else {
      var val__6884 = cljs.core._nth.call(null, cicoll, 0);
      var n__6885 = 1;
      while(true) {
        if(n__6885 < cnt__6883) {
          var nval__6886 = f.call(null, val__6884, cljs.core._nth.call(null, cicoll, n__6885));
          if(cljs.core.reduced_QMARK_.call(null, nval__6886)) {
            return cljs.core.deref.call(null, nval__6886)
          }else {
            var G__6895 = nval__6886;
            var G__6896 = n__6885 + 1;
            val__6884 = G__6895;
            n__6885 = G__6896;
            continue
          }
        }else {
          return val__6884
        }
        break
      }
    }
  };
  var ci_reduce__3 = function(cicoll, f, val) {
    var cnt__6887 = cljs.core._count.call(null, cicoll);
    var val__6888 = val;
    var n__6889 = 0;
    while(true) {
      if(n__6889 < cnt__6887) {
        var nval__6890 = f.call(null, val__6888, cljs.core._nth.call(null, cicoll, n__6889));
        if(cljs.core.reduced_QMARK_.call(null, nval__6890)) {
          return cljs.core.deref.call(null, nval__6890)
        }else {
          var G__6897 = nval__6890;
          var G__6898 = n__6889 + 1;
          val__6888 = G__6897;
          n__6889 = G__6898;
          continue
        }
      }else {
        return val__6888
      }
      break
    }
  };
  var ci_reduce__4 = function(cicoll, f, val, idx) {
    var cnt__6891 = cljs.core._count.call(null, cicoll);
    var val__6892 = val;
    var n__6893 = idx;
    while(true) {
      if(n__6893 < cnt__6891) {
        var nval__6894 = f.call(null, val__6892, cljs.core._nth.call(null, cicoll, n__6893));
        if(cljs.core.reduced_QMARK_.call(null, nval__6894)) {
          return cljs.core.deref.call(null, nval__6894)
        }else {
          var G__6899 = nval__6894;
          var G__6900 = n__6893 + 1;
          val__6892 = G__6899;
          n__6893 = G__6900;
          continue
        }
      }else {
        return val__6892
      }
      break
    }
  };
  ci_reduce = function(cicoll, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return ci_reduce__2.call(this, cicoll, f);
      case 3:
        return ci_reduce__3.call(this, cicoll, f, val);
      case 4:
        return ci_reduce__4.call(this, cicoll, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
  ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
  ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
  return ci_reduce
}();
cljs.core.array_reduce = function() {
  var array_reduce = null;
  var array_reduce__2 = function(arr, f) {
    var cnt__6913 = arr.length;
    if(arr.length === 0) {
      return f.call(null)
    }else {
      var val__6914 = arr[0];
      var n__6915 = 1;
      while(true) {
        if(n__6915 < cnt__6913) {
          var nval__6916 = f.call(null, val__6914, arr[n__6915]);
          if(cljs.core.reduced_QMARK_.call(null, nval__6916)) {
            return cljs.core.deref.call(null, nval__6916)
          }else {
            var G__6925 = nval__6916;
            var G__6926 = n__6915 + 1;
            val__6914 = G__6925;
            n__6915 = G__6926;
            continue
          }
        }else {
          return val__6914
        }
        break
      }
    }
  };
  var array_reduce__3 = function(arr, f, val) {
    var cnt__6917 = arr.length;
    var val__6918 = val;
    var n__6919 = 0;
    while(true) {
      if(n__6919 < cnt__6917) {
        var nval__6920 = f.call(null, val__6918, arr[n__6919]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6920)) {
          return cljs.core.deref.call(null, nval__6920)
        }else {
          var G__6927 = nval__6920;
          var G__6928 = n__6919 + 1;
          val__6918 = G__6927;
          n__6919 = G__6928;
          continue
        }
      }else {
        return val__6918
      }
      break
    }
  };
  var array_reduce__4 = function(arr, f, val, idx) {
    var cnt__6921 = arr.length;
    var val__6922 = val;
    var n__6923 = idx;
    while(true) {
      if(n__6923 < cnt__6921) {
        var nval__6924 = f.call(null, val__6922, arr[n__6923]);
        if(cljs.core.reduced_QMARK_.call(null, nval__6924)) {
          return cljs.core.deref.call(null, nval__6924)
        }else {
          var G__6929 = nval__6924;
          var G__6930 = n__6923 + 1;
          val__6922 = G__6929;
          n__6923 = G__6930;
          continue
        }
      }else {
        return val__6922
      }
      break
    }
  };
  array_reduce = function(arr, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return array_reduce__2.call(this, arr, f);
      case 3:
        return array_reduce__3.call(this, arr, f, val);
      case 4:
        return array_reduce__4.call(this, arr, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_reduce.cljs$lang$arity$2 = array_reduce__2;
  array_reduce.cljs$lang$arity$3 = array_reduce__3;
  array_reduce.cljs$lang$arity$4 = array_reduce__4;
  return array_reduce
}();
cljs.core.IndexedSeq = function(a, i) {
  this.a = a;
  this.i = i;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199546
};
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6931 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function(_) {
  var this__6932 = this;
  if(this__6932.i + 1 < this__6932.a.length) {
    return new cljs.core.IndexedSeq(this__6932.a, this__6932.i + 1)
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6933 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__6934 = this;
  var c__6935 = coll.cljs$core$ICounted$_count$arity$1(coll);
  if(c__6935 > 0) {
    return new cljs.core.RSeq(coll, c__6935 - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.IndexedSeq.prototype.toString = function() {
  var this__6936 = this;
  var this__6937 = this;
  return cljs.core.pr_str.call(null, this__6937)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__6938 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6938.a)) {
    return cljs.core.ci_reduce.call(null, this__6938.a, f, this__6938.a[this__6938.i], this__6938.i + 1)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, this__6938.a[this__6938.i], 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__6939 = this;
  if(cljs.core.counted_QMARK_.call(null, this__6939.a)) {
    return cljs.core.ci_reduce.call(null, this__6939.a, f, start, this__6939.i)
  }else {
    return cljs.core.ci_reduce.call(null, coll, f, start, 0)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__6940 = this;
  return this$
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__6941 = this;
  return this__6941.a.length - this__6941.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(_) {
  var this__6942 = this;
  return this__6942.a[this__6942.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(_) {
  var this__6943 = this;
  if(this__6943.i + 1 < this__6943.a.length) {
    return new cljs.core.IndexedSeq(this__6943.a, this__6943.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6944 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__6945 = this;
  var i__6946 = n + this__6945.i;
  if(i__6946 < this__6945.a.length) {
    return this__6945.a[i__6946]
  }else {
    return null
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__6947 = this;
  var i__6948 = n + this__6947.i;
  if(i__6948 < this__6947.a.length) {
    return this__6947.a[i__6948]
  }else {
    return not_found
  }
};
cljs.core.IndexedSeq;
cljs.core.prim_seq = function() {
  var prim_seq = null;
  var prim_seq__1 = function(prim) {
    return prim_seq.call(null, prim, 0)
  };
  var prim_seq__2 = function(prim, i) {
    if(prim.length === 0) {
      return null
    }else {
      return new cljs.core.IndexedSeq(prim, i)
    }
  };
  prim_seq = function(prim, i) {
    switch(arguments.length) {
      case 1:
        return prim_seq__1.call(this, prim);
      case 2:
        return prim_seq__2.call(this, prim, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  prim_seq.cljs$lang$arity$1 = prim_seq__1;
  prim_seq.cljs$lang$arity$2 = prim_seq__2;
  return prim_seq
}();
cljs.core.array_seq = function() {
  var array_seq = null;
  var array_seq__1 = function(array) {
    return cljs.core.prim_seq.call(null, array, 0)
  };
  var array_seq__2 = function(array, i) {
    return cljs.core.prim_seq.call(null, array, i)
  };
  array_seq = function(array, i) {
    switch(arguments.length) {
      case 1:
        return array_seq__1.call(this, array);
      case 2:
        return array_seq__2.call(this, array, i)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_seq.cljs$lang$arity$1 = array_seq__1;
  array_seq.cljs$lang$arity$2 = array_seq__2;
  return array_seq
}();
cljs.core.IReduce["array"] = true;
cljs.core._reduce["array"] = function() {
  var G__6949 = null;
  var G__6949__2 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__6949__3 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__6949 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__6949__2.call(this, array, f);
      case 3:
        return G__6949__3.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6949
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__6950 = null;
  var G__6950__2 = function(array, k) {
    return array[k]
  };
  var G__6950__3 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__6950 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6950__2.call(this, array, k);
      case 3:
        return G__6950__3.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6950
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__6951 = null;
  var G__6951__2 = function(array, n) {
    if(n < array.length) {
      return array[n]
    }else {
      return null
    }
  };
  var G__6951__3 = function(array, n, not_found) {
    if(n < array.length) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__6951 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__6951__2.call(this, array, n);
      case 3:
        return G__6951__3.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__6951
}();
cljs.core.ICounted["array"] = true;
cljs.core._count["array"] = function(a) {
  return a.length
};
cljs.core.ISeqable["array"] = true;
cljs.core._seq["array"] = function(array) {
  return cljs.core.array_seq.call(null, array, 0)
};
cljs.core.RSeq = function(ci, i, meta) {
  this.ci = ci;
  this.i = i;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__6952 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__6953 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.RSeq.prototype.toString = function() {
  var this__6954 = this;
  var this__6955 = this;
  return cljs.core.pr_str.call(null, this__6955)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__6956 = this;
  return coll
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__6957 = this;
  return this__6957.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__6958 = this;
  return cljs.core._nth.call(null, this__6958.ci, this__6958.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__6959 = this;
  if(this__6959.i > 0) {
    return new cljs.core.RSeq(this__6959.ci, this__6959.i - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__6960 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, new_meta) {
  var this__6961 = this;
  return new cljs.core.RSeq(this__6961.ci, this__6961.i, new_meta)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__6962 = this;
  return this__6962.meta
};
cljs.core.RSeq;
cljs.core.seq = function seq(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6966__6967 = coll;
      if(G__6966__6967) {
        if(function() {
          var or__3824__auto____6968 = G__6966__6967.cljs$lang$protocol_mask$partition0$ & 32;
          if(or__3824__auto____6968) {
            return or__3824__auto____6968
          }else {
            return G__6966__6967.cljs$core$ASeq$
          }
        }()) {
          return true
        }else {
          if(!G__6966__6967.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6966__6967)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ASeq, G__6966__6967)
      }
    }()) {
      return coll
    }else {
      return cljs.core._seq.call(null, coll)
    }
  }
};
cljs.core.first = function first(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6973__6974 = coll;
      if(G__6973__6974) {
        if(function() {
          var or__3824__auto____6975 = G__6973__6974.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6975) {
            return or__3824__auto____6975
          }else {
            return G__6973__6974.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6973__6974.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6973__6974)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6973__6974)
      }
    }()) {
      return cljs.core._first.call(null, coll)
    }else {
      var s__6976 = cljs.core.seq.call(null, coll);
      if(s__6976 == null) {
        return null
      }else {
        return cljs.core._first.call(null, s__6976)
      }
    }
  }
};
cljs.core.rest = function rest(coll) {
  if(!(coll == null)) {
    if(function() {
      var G__6981__6982 = coll;
      if(G__6981__6982) {
        if(function() {
          var or__3824__auto____6983 = G__6981__6982.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____6983) {
            return or__3824__auto____6983
          }else {
            return G__6981__6982.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__6981__6982.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6981__6982)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__6981__6982)
      }
    }()) {
      return cljs.core._rest.call(null, coll)
    }else {
      var s__6984 = cljs.core.seq.call(null, coll);
      if(!(s__6984 == null)) {
        return cljs.core._rest.call(null, s__6984)
      }else {
        return cljs.core.List.EMPTY
      }
    }
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.next = function next(coll) {
  if(coll == null) {
    return null
  }else {
    if(function() {
      var G__6988__6989 = coll;
      if(G__6988__6989) {
        if(function() {
          var or__3824__auto____6990 = G__6988__6989.cljs$lang$protocol_mask$partition0$ & 128;
          if(or__3824__auto____6990) {
            return or__3824__auto____6990
          }else {
            return G__6988__6989.cljs$core$INext$
          }
        }()) {
          return true
        }else {
          if(!G__6988__6989.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6988__6989)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.INext, G__6988__6989)
      }
    }()) {
      return cljs.core._next.call(null, coll)
    }else {
      return cljs.core.seq.call(null, cljs.core.rest.call(null, coll))
    }
  }
};
cljs.core.second = function second(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.ffirst = function ffirst(coll) {
  return cljs.core.first.call(null, cljs.core.first.call(null, coll))
};
cljs.core.nfirst = function nfirst(coll) {
  return cljs.core.next.call(null, cljs.core.first.call(null, coll))
};
cljs.core.fnext = function fnext(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.nnext = function nnext(coll) {
  return cljs.core.next.call(null, cljs.core.next.call(null, coll))
};
cljs.core.last = function last(s) {
  while(true) {
    var sn__6992 = cljs.core.next.call(null, s);
    if(!(sn__6992 == null)) {
      var G__6993 = sn__6992;
      s = G__6993;
      continue
    }else {
      return cljs.core.first.call(null, s)
    }
    break
  }
};
cljs.core.IEquiv["_"] = true;
cljs.core._equiv["_"] = function(x, o) {
  return x === o
};
cljs.core.not = function not(x) {
  if(cljs.core.truth_(x)) {
    return false
  }else {
    return true
  }
};
cljs.core.conj = function() {
  var conj = null;
  var conj__2 = function(coll, x) {
    return cljs.core._conj.call(null, coll, x)
  };
  var conj__3 = function() {
    var G__6994__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__6995 = conj.call(null, coll, x);
          var G__6996 = cljs.core.first.call(null, xs);
          var G__6997 = cljs.core.next.call(null, xs);
          coll = G__6995;
          x = G__6996;
          xs = G__6997;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__6994 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__6994__delegate.call(this, coll, x, xs)
    };
    G__6994.cljs$lang$maxFixedArity = 2;
    G__6994.cljs$lang$applyTo = function(arglist__6998) {
      var coll = cljs.core.first(arglist__6998);
      var x = cljs.core.first(cljs.core.next(arglist__6998));
      var xs = cljs.core.rest(cljs.core.next(arglist__6998));
      return G__6994__delegate(coll, x, xs)
    };
    G__6994.cljs$lang$arity$variadic = G__6994__delegate;
    return G__6994
  }();
  conj = function(coll, x, var_args) {
    var xs = var_args;
    switch(arguments.length) {
      case 2:
        return conj__2.call(this, coll, x);
      default:
        return conj__3.cljs$lang$arity$variadic(coll, x, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  conj.cljs$lang$maxFixedArity = 2;
  conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
  conj.cljs$lang$arity$2 = conj__2;
  conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
  return conj
}();
cljs.core.empty = function empty(coll) {
  return cljs.core._empty.call(null, coll)
};
cljs.core.accumulating_seq_count = function accumulating_seq_count(coll) {
  var s__7001 = cljs.core.seq.call(null, coll);
  var acc__7002 = 0;
  while(true) {
    if(cljs.core.counted_QMARK_.call(null, s__7001)) {
      return acc__7002 + cljs.core._count.call(null, s__7001)
    }else {
      var G__7003 = cljs.core.next.call(null, s__7001);
      var G__7004 = acc__7002 + 1;
      s__7001 = G__7003;
      acc__7002 = G__7004;
      continue
    }
    break
  }
};
cljs.core.count = function count(coll) {
  if(cljs.core.counted_QMARK_.call(null, coll)) {
    return cljs.core._count.call(null, coll)
  }else {
    return cljs.core.accumulating_seq_count.call(null, coll)
  }
};
cljs.core.linear_traversal_nth = function() {
  var linear_traversal_nth = null;
  var linear_traversal_nth__2 = function(coll, n) {
    if(coll == null) {
      throw new Error("Index out of bounds");
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          throw new Error("Index out of bounds");
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1)
          }else {
            if("\ufdd0'else") {
              throw new Error("Index out of bounds");
            }else {
              return null
            }
          }
        }
      }
    }
  };
  var linear_traversal_nth__3 = function(coll, n, not_found) {
    if(coll == null) {
      return not_found
    }else {
      if(n === 0) {
        if(cljs.core.seq.call(null, coll)) {
          return cljs.core.first.call(null, coll)
        }else {
          return not_found
        }
      }else {
        if(cljs.core.indexed_QMARK_.call(null, coll)) {
          return cljs.core._nth.call(null, coll, n, not_found)
        }else {
          if(cljs.core.seq.call(null, coll)) {
            return linear_traversal_nth.call(null, cljs.core.next.call(null, coll), n - 1, not_found)
          }else {
            if("\ufdd0'else") {
              return not_found
            }else {
              return null
            }
          }
        }
      }
    }
  };
  linear_traversal_nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return linear_traversal_nth__2.call(this, coll, n);
      case 3:
        return linear_traversal_nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
  linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
  return linear_traversal_nth
}();
cljs.core.nth = function() {
  var nth = null;
  var nth__2 = function(coll, n) {
    if(coll == null) {
      return null
    }else {
      if(function() {
        var G__7011__7012 = coll;
        if(G__7011__7012) {
          if(function() {
            var or__3824__auto____7013 = G__7011__7012.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____7013) {
              return or__3824__auto____7013
            }else {
              return G__7011__7012.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__7011__7012.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7011__7012)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7011__7012)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n))
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n))
      }
    }
  };
  var nth__3 = function(coll, n, not_found) {
    if(!(coll == null)) {
      if(function() {
        var G__7014__7015 = coll;
        if(G__7014__7015) {
          if(function() {
            var or__3824__auto____7016 = G__7014__7015.cljs$lang$protocol_mask$partition0$ & 16;
            if(or__3824__auto____7016) {
              return or__3824__auto____7016
            }else {
              return G__7014__7015.cljs$core$IIndexed$
            }
          }()) {
            return true
          }else {
            if(!G__7014__7015.cljs$lang$protocol_mask$partition0$) {
              return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7014__7015)
            }else {
              return false
            }
          }
        }else {
          return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7014__7015)
        }
      }()) {
        return cljs.core._nth.call(null, coll, Math.floor(n), not_found)
      }else {
        return cljs.core.linear_traversal_nth.call(null, coll, Math.floor(n), not_found)
      }
    }else {
      return not_found
    }
  };
  nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return nth__2.call(this, coll, n);
      case 3:
        return nth__3.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  nth.cljs$lang$arity$2 = nth__2;
  nth.cljs$lang$arity$3 = nth__3;
  return nth
}();
cljs.core.get = function() {
  var get = null;
  var get__2 = function(o, k) {
    return cljs.core._lookup.call(null, o, k)
  };
  var get__3 = function(o, k, not_found) {
    return cljs.core._lookup.call(null, o, k, not_found)
  };
  get = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return get__2.call(this, o, k);
      case 3:
        return get__3.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get.cljs$lang$arity$2 = get__2;
  get.cljs$lang$arity$3 = get__3;
  return get
}();
cljs.core.assoc = function() {
  var assoc = null;
  var assoc__3 = function(coll, k, v) {
    return cljs.core._assoc.call(null, coll, k, v)
  };
  var assoc__4 = function() {
    var G__7019__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__7018 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__7020 = ret__7018;
          var G__7021 = cljs.core.first.call(null, kvs);
          var G__7022 = cljs.core.second.call(null, kvs);
          var G__7023 = cljs.core.nnext.call(null, kvs);
          coll = G__7020;
          k = G__7021;
          v = G__7022;
          kvs = G__7023;
          continue
        }else {
          return ret__7018
        }
        break
      }
    };
    var G__7019 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7019__delegate.call(this, coll, k, v, kvs)
    };
    G__7019.cljs$lang$maxFixedArity = 3;
    G__7019.cljs$lang$applyTo = function(arglist__7024) {
      var coll = cljs.core.first(arglist__7024);
      var k = cljs.core.first(cljs.core.next(arglist__7024));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7024)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7024)));
      return G__7019__delegate(coll, k, v, kvs)
    };
    G__7019.cljs$lang$arity$variadic = G__7019__delegate;
    return G__7019
  }();
  assoc = function(coll, k, v, var_args) {
    var kvs = var_args;
    switch(arguments.length) {
      case 3:
        return assoc__3.call(this, coll, k, v);
      default:
        return assoc__4.cljs$lang$arity$variadic(coll, k, v, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  assoc.cljs$lang$maxFixedArity = 3;
  assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
  assoc.cljs$lang$arity$3 = assoc__3;
  assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
  return assoc
}();
cljs.core.dissoc = function() {
  var dissoc = null;
  var dissoc__1 = function(coll) {
    return coll
  };
  var dissoc__2 = function(coll, k) {
    return cljs.core._dissoc.call(null, coll, k)
  };
  var dissoc__3 = function() {
    var G__7027__delegate = function(coll, k, ks) {
      while(true) {
        var ret__7026 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__7028 = ret__7026;
          var G__7029 = cljs.core.first.call(null, ks);
          var G__7030 = cljs.core.next.call(null, ks);
          coll = G__7028;
          k = G__7029;
          ks = G__7030;
          continue
        }else {
          return ret__7026
        }
        break
      }
    };
    var G__7027 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7027__delegate.call(this, coll, k, ks)
    };
    G__7027.cljs$lang$maxFixedArity = 2;
    G__7027.cljs$lang$applyTo = function(arglist__7031) {
      var coll = cljs.core.first(arglist__7031);
      var k = cljs.core.first(cljs.core.next(arglist__7031));
      var ks = cljs.core.rest(cljs.core.next(arglist__7031));
      return G__7027__delegate(coll, k, ks)
    };
    G__7027.cljs$lang$arity$variadic = G__7027__delegate;
    return G__7027
  }();
  dissoc = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return dissoc__1.call(this, coll);
      case 2:
        return dissoc__2.call(this, coll, k);
      default:
        return dissoc__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  dissoc.cljs$lang$maxFixedArity = 2;
  dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
  dissoc.cljs$lang$arity$1 = dissoc__1;
  dissoc.cljs$lang$arity$2 = dissoc__2;
  dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
  return dissoc
}();
cljs.core.with_meta = function with_meta(o, meta) {
  return cljs.core._with_meta.call(null, o, meta)
};
cljs.core.meta = function meta(o) {
  if(function() {
    var G__7035__7036 = o;
    if(G__7035__7036) {
      if(function() {
        var or__3824__auto____7037 = G__7035__7036.cljs$lang$protocol_mask$partition0$ & 131072;
        if(or__3824__auto____7037) {
          return or__3824__auto____7037
        }else {
          return G__7035__7036.cljs$core$IMeta$
        }
      }()) {
        return true
      }else {
        if(!G__7035__7036.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__7035__7036)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__7035__7036)
    }
  }()) {
    return cljs.core._meta.call(null, o)
  }else {
    return null
  }
};
cljs.core.peek = function peek(coll) {
  return cljs.core._peek.call(null, coll)
};
cljs.core.pop = function pop(coll) {
  return cljs.core._pop.call(null, coll)
};
cljs.core.disj = function() {
  var disj = null;
  var disj__1 = function(coll) {
    return coll
  };
  var disj__2 = function(coll, k) {
    return cljs.core._disjoin.call(null, coll, k)
  };
  var disj__3 = function() {
    var G__7040__delegate = function(coll, k, ks) {
      while(true) {
        var ret__7039 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__7041 = ret__7039;
          var G__7042 = cljs.core.first.call(null, ks);
          var G__7043 = cljs.core.next.call(null, ks);
          coll = G__7041;
          k = G__7042;
          ks = G__7043;
          continue
        }else {
          return ret__7039
        }
        break
      }
    };
    var G__7040 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7040__delegate.call(this, coll, k, ks)
    };
    G__7040.cljs$lang$maxFixedArity = 2;
    G__7040.cljs$lang$applyTo = function(arglist__7044) {
      var coll = cljs.core.first(arglist__7044);
      var k = cljs.core.first(cljs.core.next(arglist__7044));
      var ks = cljs.core.rest(cljs.core.next(arglist__7044));
      return G__7040__delegate(coll, k, ks)
    };
    G__7040.cljs$lang$arity$variadic = G__7040__delegate;
    return G__7040
  }();
  disj = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return disj__1.call(this, coll);
      case 2:
        return disj__2.call(this, coll, k);
      default:
        return disj__3.cljs$lang$arity$variadic(coll, k, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  disj.cljs$lang$maxFixedArity = 2;
  disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
  disj.cljs$lang$arity$1 = disj__1;
  disj.cljs$lang$arity$2 = disj__2;
  disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
  return disj
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function add_to_string_hash_cache(k) {
  var h__7046 = goog.string.hashCode(k);
  cljs.core.string_hash_cache[k] = h__7046;
  cljs.core.string_hash_cache_count = cljs.core.string_hash_cache_count + 1;
  return h__7046
};
cljs.core.check_string_hash_cache = function check_string_hash_cache(k) {
  if(cljs.core.string_hash_cache_count > 255) {
    cljs.core.string_hash_cache = {};
    cljs.core.string_hash_cache_count = 0
  }else {
  }
  var h__7048 = cljs.core.string_hash_cache[k];
  if(!(h__7048 == null)) {
    return h__7048
  }else {
    return cljs.core.add_to_string_hash_cache.call(null, k)
  }
};
cljs.core.hash = function() {
  var hash = null;
  var hash__1 = function(o) {
    return hash.call(null, o, true)
  };
  var hash__2 = function(o, check_cache) {
    if(function() {
      var and__3822__auto____7050 = goog.isString(o);
      if(and__3822__auto____7050) {
        return check_cache
      }else {
        return and__3822__auto____7050
      }
    }()) {
      return cljs.core.check_string_hash_cache.call(null, o)
    }else {
      return cljs.core._hash.call(null, o)
    }
  };
  hash = function(o, check_cache) {
    switch(arguments.length) {
      case 1:
        return hash__1.call(this, o);
      case 2:
        return hash__2.call(this, o, check_cache)
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash.cljs$lang$arity$1 = hash__1;
  hash.cljs$lang$arity$2 = hash__2;
  return hash
}();
cljs.core.empty_QMARK_ = function empty_QMARK_(coll) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.coll_QMARK_ = function coll_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7054__7055 = x;
    if(G__7054__7055) {
      if(function() {
        var or__3824__auto____7056 = G__7054__7055.cljs$lang$protocol_mask$partition0$ & 8;
        if(or__3824__auto____7056) {
          return or__3824__auto____7056
        }else {
          return G__7054__7055.cljs$core$ICollection$
        }
      }()) {
        return true
      }else {
        if(!G__7054__7055.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__7054__7055)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, G__7054__7055)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7060__7061 = x;
    if(G__7060__7061) {
      if(function() {
        var or__3824__auto____7062 = G__7060__7061.cljs$lang$protocol_mask$partition0$ & 4096;
        if(or__3824__auto____7062) {
          return or__3824__auto____7062
        }else {
          return G__7060__7061.cljs$core$ISet$
        }
      }()) {
        return true
      }else {
        if(!G__7060__7061.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__7060__7061)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, G__7060__7061)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var G__7066__7067 = x;
  if(G__7066__7067) {
    if(function() {
      var or__3824__auto____7068 = G__7066__7067.cljs$lang$protocol_mask$partition0$ & 512;
      if(or__3824__auto____7068) {
        return or__3824__auto____7068
      }else {
        return G__7066__7067.cljs$core$IAssociative$
      }
    }()) {
      return true
    }else {
      if(!G__7066__7067.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__7066__7067)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, G__7066__7067)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var G__7072__7073 = x;
  if(G__7072__7073) {
    if(function() {
      var or__3824__auto____7074 = G__7072__7073.cljs$lang$protocol_mask$partition0$ & 16777216;
      if(or__3824__auto____7074) {
        return or__3824__auto____7074
      }else {
        return G__7072__7073.cljs$core$ISequential$
      }
    }()) {
      return true
    }else {
      if(!G__7072__7073.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__7072__7073)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, G__7072__7073)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var G__7078__7079 = x;
  if(G__7078__7079) {
    if(function() {
      var or__3824__auto____7080 = G__7078__7079.cljs$lang$protocol_mask$partition0$ & 2;
      if(or__3824__auto____7080) {
        return or__3824__auto____7080
      }else {
        return G__7078__7079.cljs$core$ICounted$
      }
    }()) {
      return true
    }else {
      if(!G__7078__7079.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__7078__7079)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, G__7078__7079)
  }
};
cljs.core.indexed_QMARK_ = function indexed_QMARK_(x) {
  var G__7084__7085 = x;
  if(G__7084__7085) {
    if(function() {
      var or__3824__auto____7086 = G__7084__7085.cljs$lang$protocol_mask$partition0$ & 16;
      if(or__3824__auto____7086) {
        return or__3824__auto____7086
      }else {
        return G__7084__7085.cljs$core$IIndexed$
      }
    }()) {
      return true
    }else {
      if(!G__7084__7085.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7084__7085)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IIndexed, G__7084__7085)
  }
};
cljs.core.reduceable_QMARK_ = function reduceable_QMARK_(x) {
  var G__7090__7091 = x;
  if(G__7090__7091) {
    if(function() {
      var or__3824__auto____7092 = G__7090__7091.cljs$lang$protocol_mask$partition0$ & 524288;
      if(or__3824__auto____7092) {
        return or__3824__auto____7092
      }else {
        return G__7090__7091.cljs$core$IReduce$
      }
    }()) {
      return true
    }else {
      if(!G__7090__7091.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7090__7091)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7090__7091)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(x == null) {
    return false
  }else {
    var G__7096__7097 = x;
    if(G__7096__7097) {
      if(function() {
        var or__3824__auto____7098 = G__7096__7097.cljs$lang$protocol_mask$partition0$ & 1024;
        if(or__3824__auto____7098) {
          return or__3824__auto____7098
        }else {
          return G__7096__7097.cljs$core$IMap$
        }
      }()) {
        return true
      }else {
        if(!G__7096__7097.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__7096__7097)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, G__7096__7097)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var G__7102__7103 = x;
  if(G__7102__7103) {
    if(function() {
      var or__3824__auto____7104 = G__7102__7103.cljs$lang$protocol_mask$partition0$ & 16384;
      if(or__3824__auto____7104) {
        return or__3824__auto____7104
      }else {
        return G__7102__7103.cljs$core$IVector$
      }
    }()) {
      return true
    }else {
      if(!G__7102__7103.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__7102__7103)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, G__7102__7103)
  }
};
cljs.core.chunked_seq_QMARK_ = function chunked_seq_QMARK_(x) {
  var G__7108__7109 = x;
  if(G__7108__7109) {
    if(cljs.core.truth_(function() {
      var or__3824__auto____7110 = null;
      if(cljs.core.truth_(or__3824__auto____7110)) {
        return or__3824__auto____7110
      }else {
        return G__7108__7109.cljs$core$IChunkedSeq$
      }
    }())) {
      return true
    }else {
      if(!G__7108__7109.cljs$lang$protocol_mask$partition$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__7108__7109)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedSeq, G__7108__7109)
  }
};
cljs.core.js_obj = function() {
  var js_obj = null;
  var js_obj__0 = function() {
    return{}
  };
  var js_obj__1 = function() {
    var G__7111__delegate = function(keyvals) {
      return cljs.core.apply.call(null, goog.object.create, keyvals)
    };
    var G__7111 = function(var_args) {
      var keyvals = null;
      if(goog.isDef(var_args)) {
        keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__7111__delegate.call(this, keyvals)
    };
    G__7111.cljs$lang$maxFixedArity = 0;
    G__7111.cljs$lang$applyTo = function(arglist__7112) {
      var keyvals = cljs.core.seq(arglist__7112);
      return G__7111__delegate(keyvals)
    };
    G__7111.cljs$lang$arity$variadic = G__7111__delegate;
    return G__7111
  }();
  js_obj = function(var_args) {
    var keyvals = var_args;
    switch(arguments.length) {
      case 0:
        return js_obj__0.call(this);
      default:
        return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  js_obj.cljs$lang$maxFixedArity = 0;
  js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
  js_obj.cljs$lang$arity$0 = js_obj__0;
  js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
  return js_obj
}();
cljs.core.js_keys = function js_keys(obj) {
  var keys__7114 = [];
  goog.object.forEach(obj, function(val, key, obj) {
    return keys__7114.push(key)
  });
  return keys__7114
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.array_copy = function array_copy(from, i, to, j, len) {
  var i__7118 = i;
  var j__7119 = j;
  var len__7120 = len;
  while(true) {
    if(len__7120 === 0) {
      return to
    }else {
      to[j__7119] = from[i__7118];
      var G__7121 = i__7118 + 1;
      var G__7122 = j__7119 + 1;
      var G__7123 = len__7120 - 1;
      i__7118 = G__7121;
      j__7119 = G__7122;
      len__7120 = G__7123;
      continue
    }
    break
  }
};
cljs.core.array_copy_downward = function array_copy_downward(from, i, to, j, len) {
  var i__7127 = i + (len - 1);
  var j__7128 = j + (len - 1);
  var len__7129 = len;
  while(true) {
    if(len__7129 === 0) {
      return to
    }else {
      to[j__7128] = from[i__7127];
      var G__7130 = i__7127 - 1;
      var G__7131 = j__7128 - 1;
      var G__7132 = len__7129 - 1;
      i__7127 = G__7130;
      j__7128 = G__7131;
      len__7129 = G__7132;
      continue
    }
    break
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function false_QMARK_(x) {
  return x === false
};
cljs.core.true_QMARK_ = function true_QMARK_(x) {
  return x === true
};
cljs.core.undefined_QMARK_ = function undefined_QMARK_(x) {
  return void 0 === x
};
cljs.core.seq_QMARK_ = function seq_QMARK_(s) {
  if(s == null) {
    return false
  }else {
    var G__7136__7137 = s;
    if(G__7136__7137) {
      if(function() {
        var or__3824__auto____7138 = G__7136__7137.cljs$lang$protocol_mask$partition0$ & 64;
        if(or__3824__auto____7138) {
          return or__3824__auto____7138
        }else {
          return G__7136__7137.cljs$core$ISeq$
        }
      }()) {
        return true
      }else {
        if(!G__7136__7137.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7136__7137)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7136__7137)
    }
  }
};
cljs.core.seqable_QMARK_ = function seqable_QMARK_(s) {
  var G__7142__7143 = s;
  if(G__7142__7143) {
    if(function() {
      var or__3824__auto____7144 = G__7142__7143.cljs$lang$protocol_mask$partition0$ & 8388608;
      if(or__3824__auto____7144) {
        return or__3824__auto____7144
      }else {
        return G__7142__7143.cljs$core$ISeqable$
      }
    }()) {
      return true
    }else {
      if(!G__7142__7143.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__7142__7143)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, G__7142__7143)
  }
};
cljs.core.boolean$ = function boolean$(x) {
  if(cljs.core.truth_(x)) {
    return true
  }else {
    return false
  }
};
cljs.core.string_QMARK_ = function string_QMARK_(x) {
  var and__3822__auto____7147 = goog.isString(x);
  if(and__3822__auto____7147) {
    return!function() {
      var or__3824__auto____7148 = x.charAt(0) === "\ufdd0";
      if(or__3824__auto____7148) {
        return or__3824__auto____7148
      }else {
        return x.charAt(0) === "\ufdd1"
      }
    }()
  }else {
    return and__3822__auto____7147
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3822__auto____7150 = goog.isString(x);
  if(and__3822__auto____7150) {
    return x.charAt(0) === "\ufdd0"
  }else {
    return and__3822__auto____7150
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3822__auto____7152 = goog.isString(x);
  if(and__3822__auto____7152) {
    return x.charAt(0) === "\ufdd1"
  }else {
    return and__3822__auto____7152
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber(n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction(f)
};
cljs.core.ifn_QMARK_ = function ifn_QMARK_(f) {
  var or__3824__auto____7157 = cljs.core.fn_QMARK_.call(null, f);
  if(or__3824__auto____7157) {
    return or__3824__auto____7157
  }else {
    var G__7158__7159 = f;
    if(G__7158__7159) {
      if(function() {
        var or__3824__auto____7160 = G__7158__7159.cljs$lang$protocol_mask$partition0$ & 1;
        if(or__3824__auto____7160) {
          return or__3824__auto____7160
        }else {
          return G__7158__7159.cljs$core$IFn$
        }
      }()) {
        return true
      }else {
        if(!G__7158__7159.cljs$lang$protocol_mask$partition0$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7158__7159)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IFn, G__7158__7159)
    }
  }
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3822__auto____7162 = cljs.core.number_QMARK_.call(null, n);
  if(and__3822__auto____7162) {
    return n == n.toFixed()
  }else {
    return and__3822__auto____7162
  }
};
cljs.core.contains_QMARK_ = function contains_QMARK_(coll, v) {
  if(cljs.core._lookup.call(null, coll, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return false
  }else {
    return true
  }
};
cljs.core.find = function find(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3822__auto____7165 = coll;
    if(cljs.core.truth_(and__3822__auto____7165)) {
      var and__3822__auto____7166 = cljs.core.associative_QMARK_.call(null, coll);
      if(and__3822__auto____7166) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3822__auto____7166
      }
    }else {
      return and__3822__auto____7165
    }
  }())) {
    return cljs.core.PersistentVector.fromArray([k, cljs.core._lookup.call(null, coll, k)], true)
  }else {
    return null
  }
};
cljs.core.distinct_QMARK_ = function() {
  var distinct_QMARK_ = null;
  var distinct_QMARK___1 = function(x) {
    return true
  };
  var distinct_QMARK___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var distinct_QMARK___3 = function() {
    var G__7175__delegate = function(x, y, more) {
      if(!cljs.core._EQ_.call(null, x, y)) {
        var s__7171 = cljs.core.PersistentHashSet.fromArray([y, x]);
        var xs__7172 = more;
        while(true) {
          var x__7173 = cljs.core.first.call(null, xs__7172);
          var etc__7174 = cljs.core.next.call(null, xs__7172);
          if(cljs.core.truth_(xs__7172)) {
            if(cljs.core.contains_QMARK_.call(null, s__7171, x__7173)) {
              return false
            }else {
              var G__7176 = cljs.core.conj.call(null, s__7171, x__7173);
              var G__7177 = etc__7174;
              s__7171 = G__7176;
              xs__7172 = G__7177;
              continue
            }
          }else {
            return true
          }
          break
        }
      }else {
        return false
      }
    };
    var G__7175 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7175__delegate.call(this, x, y, more)
    };
    G__7175.cljs$lang$maxFixedArity = 2;
    G__7175.cljs$lang$applyTo = function(arglist__7178) {
      var x = cljs.core.first(arglist__7178);
      var y = cljs.core.first(cljs.core.next(arglist__7178));
      var more = cljs.core.rest(cljs.core.next(arglist__7178));
      return G__7175__delegate(x, y, more)
    };
    G__7175.cljs$lang$arity$variadic = G__7175__delegate;
    return G__7175
  }();
  distinct_QMARK_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return distinct_QMARK___1.call(this, x);
      case 2:
        return distinct_QMARK___2.call(this, x, y);
      default:
        return distinct_QMARK___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  distinct_QMARK_.cljs$lang$maxFixedArity = 2;
  distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
  distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
  distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
  distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
  return distinct_QMARK_
}();
cljs.core.compare = function compare(x, y) {
  if(x === y) {
    return 0
  }else {
    if(x == null) {
      return-1
    }else {
      if(y == null) {
        return 1
      }else {
        if(cljs.core.type.call(null, x) === cljs.core.type.call(null, y)) {
          if(function() {
            var G__7182__7183 = x;
            if(G__7182__7183) {
              if(cljs.core.truth_(function() {
                var or__3824__auto____7184 = null;
                if(cljs.core.truth_(or__3824__auto____7184)) {
                  return or__3824__auto____7184
                }else {
                  return G__7182__7183.cljs$core$IComparable$
                }
              }())) {
                return true
              }else {
                if(!G__7182__7183.cljs$lang$protocol_mask$partition$) {
                  return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7182__7183)
                }else {
                  return false
                }
              }
            }else {
              return cljs.core.type_satisfies_.call(null, cljs.core.IComparable, G__7182__7183)
            }
          }()) {
            return cljs.core._compare.call(null, x, y)
          }else {
            return goog.array.defaultCompare(x, y)
          }
        }else {
          if("\ufdd0'else") {
            throw new Error("compare on non-nil objects of different types");
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.compare_indexed = function() {
  var compare_indexed = null;
  var compare_indexed__2 = function(xs, ys) {
    var xl__7189 = cljs.core.count.call(null, xs);
    var yl__7190 = cljs.core.count.call(null, ys);
    if(xl__7189 < yl__7190) {
      return-1
    }else {
      if(xl__7189 > yl__7190) {
        return 1
      }else {
        if("\ufdd0'else") {
          return compare_indexed.call(null, xs, ys, xl__7189, 0)
        }else {
          return null
        }
      }
    }
  };
  var compare_indexed__4 = function(xs, ys, len, n) {
    while(true) {
      var d__7191 = cljs.core.compare.call(null, cljs.core.nth.call(null, xs, n), cljs.core.nth.call(null, ys, n));
      if(function() {
        var and__3822__auto____7192 = d__7191 === 0;
        if(and__3822__auto____7192) {
          return n + 1 < len
        }else {
          return and__3822__auto____7192
        }
      }()) {
        var G__7193 = xs;
        var G__7194 = ys;
        var G__7195 = len;
        var G__7196 = n + 1;
        xs = G__7193;
        ys = G__7194;
        len = G__7195;
        n = G__7196;
        continue
      }else {
        return d__7191
      }
      break
    }
  };
  compare_indexed = function(xs, ys, len, n) {
    switch(arguments.length) {
      case 2:
        return compare_indexed__2.call(this, xs, ys);
      case 4:
        return compare_indexed__4.call(this, xs, ys, len, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
  compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
  return compare_indexed
}();
cljs.core.fn__GT_comparator = function fn__GT_comparator(f) {
  if(cljs.core._EQ_.call(null, f, cljs.core.compare)) {
    return cljs.core.compare
  }else {
    return function(x, y) {
      var r__7198 = f.call(null, x, y);
      if(cljs.core.number_QMARK_.call(null, r__7198)) {
        return r__7198
      }else {
        if(cljs.core.truth_(r__7198)) {
          return-1
        }else {
          if(cljs.core.truth_(f.call(null, y, x))) {
            return 1
          }else {
            return 0
          }
        }
      }
    }
  }
};
cljs.core.sort = function() {
  var sort = null;
  var sort__1 = function(coll) {
    return sort.call(null, cljs.core.compare, coll)
  };
  var sort__2 = function(comp, coll) {
    if(cljs.core.seq.call(null, coll)) {
      var a__7200 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort(a__7200, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__7200)
    }else {
      return cljs.core.List.EMPTY
    }
  };
  sort = function(comp, coll) {
    switch(arguments.length) {
      case 1:
        return sort__1.call(this, comp);
      case 2:
        return sort__2.call(this, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort.cljs$lang$arity$1 = sort__1;
  sort.cljs$lang$arity$2 = sort__2;
  return sort
}();
cljs.core.sort_by = function() {
  var sort_by = null;
  var sort_by__2 = function(keyfn, coll) {
    return sort_by.call(null, keyfn, cljs.core.compare, coll)
  };
  var sort_by__3 = function(keyfn, comp, coll) {
    return cljs.core.sort.call(null, function(x, y) {
      return cljs.core.fn__GT_comparator.call(null, comp).call(null, keyfn.call(null, x), keyfn.call(null, y))
    }, coll)
  };
  sort_by = function(keyfn, comp, coll) {
    switch(arguments.length) {
      case 2:
        return sort_by__2.call(this, keyfn, comp);
      case 3:
        return sort_by__3.call(this, keyfn, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  sort_by.cljs$lang$arity$2 = sort_by__2;
  sort_by.cljs$lang$arity$3 = sort_by__3;
  return sort_by
}();
cljs.core.seq_reduce = function() {
  var seq_reduce = null;
  var seq_reduce__2 = function(f, coll) {
    var temp__3971__auto____7206 = cljs.core.seq.call(null, coll);
    if(temp__3971__auto____7206) {
      var s__7207 = temp__3971__auto____7206;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__7207), cljs.core.next.call(null, s__7207))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3 = function(f, val, coll) {
    var val__7208 = val;
    var coll__7209 = cljs.core.seq.call(null, coll);
    while(true) {
      if(coll__7209) {
        var nval__7210 = f.call(null, val__7208, cljs.core.first.call(null, coll__7209));
        if(cljs.core.reduced_QMARK_.call(null, nval__7210)) {
          return cljs.core.deref.call(null, nval__7210)
        }else {
          var G__7211 = nval__7210;
          var G__7212 = cljs.core.next.call(null, coll__7209);
          val__7208 = G__7211;
          coll__7209 = G__7212;
          continue
        }
      }else {
        return val__7208
      }
      break
    }
  };
  seq_reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return seq_reduce__2.call(this, f, val);
      case 3:
        return seq_reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
  seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
  return seq_reduce
}();
cljs.core.shuffle = function shuffle(coll) {
  var a__7214 = cljs.core.to_array.call(null, coll);
  goog.array.shuffle(a__7214);
  return cljs.core.vec.call(null, a__7214)
};
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__2 = function(f, coll) {
    if(function() {
      var G__7221__7222 = coll;
      if(G__7221__7222) {
        if(function() {
          var or__3824__auto____7223 = G__7221__7222.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7223) {
            return or__3824__auto____7223
          }else {
            return G__7221__7222.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7221__7222.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7221__7222)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7221__7222)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f)
    }else {
      return cljs.core.seq_reduce.call(null, f, coll)
    }
  };
  var reduce__3 = function(f, val, coll) {
    if(function() {
      var G__7224__7225 = coll;
      if(G__7224__7225) {
        if(function() {
          var or__3824__auto____7226 = G__7224__7225.cljs$lang$protocol_mask$partition0$ & 524288;
          if(or__3824__auto____7226) {
            return or__3824__auto____7226
          }else {
            return G__7224__7225.cljs$core$IReduce$
          }
        }()) {
          return true
        }else {
          if(!G__7224__7225.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7224__7225)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReduce, G__7224__7225)
      }
    }()) {
      return cljs.core._reduce.call(null, coll, f, val)
    }else {
      return cljs.core.seq_reduce.call(null, f, val, coll)
    }
  };
  reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return reduce__2.call(this, f, val);
      case 3:
        return reduce__3.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reduce.cljs$lang$arity$2 = reduce__2;
  reduce.cljs$lang$arity$3 = reduce__3;
  return reduce
}();
cljs.core.reduce_kv = function reduce_kv(f, init, coll) {
  return cljs.core._kv_reduce.call(null, coll, f, init)
};
cljs.core.Reduced = function(val) {
  this.val = val;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function(o) {
  var this__7227 = this;
  return this__7227.val
};
cljs.core.Reduced;
cljs.core.reduced_QMARK_ = function reduced_QMARK_(r) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Reduced, r)
};
cljs.core.reduced = function reduced(x) {
  return new cljs.core.Reduced(x)
};
cljs.core._PLUS_ = function() {
  var _PLUS_ = null;
  var _PLUS___0 = function() {
    return 0
  };
  var _PLUS___1 = function(x) {
    return x
  };
  var _PLUS___2 = function(x, y) {
    return x + y
  };
  var _PLUS___3 = function() {
    var G__7228__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, x + y, more)
    };
    var G__7228 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7228__delegate.call(this, x, y, more)
    };
    G__7228.cljs$lang$maxFixedArity = 2;
    G__7228.cljs$lang$applyTo = function(arglist__7229) {
      var x = cljs.core.first(arglist__7229);
      var y = cljs.core.first(cljs.core.next(arglist__7229));
      var more = cljs.core.rest(cljs.core.next(arglist__7229));
      return G__7228__delegate(x, y, more)
    };
    G__7228.cljs$lang$arity$variadic = G__7228__delegate;
    return G__7228
  }();
  _PLUS_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _PLUS___0.call(this);
      case 1:
        return _PLUS___1.call(this, x);
      case 2:
        return _PLUS___2.call(this, x, y);
      default:
        return _PLUS___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _PLUS_.cljs$lang$maxFixedArity = 2;
  _PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
  _PLUS_.cljs$lang$arity$0 = _PLUS___0;
  _PLUS_.cljs$lang$arity$1 = _PLUS___1;
  _PLUS_.cljs$lang$arity$2 = _PLUS___2;
  _PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
  return _PLUS_
}();
cljs.core._ = function() {
  var _ = null;
  var ___1 = function(x) {
    return-x
  };
  var ___2 = function(x, y) {
    return x - y
  };
  var ___3 = function() {
    var G__7230__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, x - y, more)
    };
    var G__7230 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7230__delegate.call(this, x, y, more)
    };
    G__7230.cljs$lang$maxFixedArity = 2;
    G__7230.cljs$lang$applyTo = function(arglist__7231) {
      var x = cljs.core.first(arglist__7231);
      var y = cljs.core.first(cljs.core.next(arglist__7231));
      var more = cljs.core.rest(cljs.core.next(arglist__7231));
      return G__7230__delegate(x, y, more)
    };
    G__7230.cljs$lang$arity$variadic = G__7230__delegate;
    return G__7230
  }();
  _ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return ___1.call(this, x);
      case 2:
        return ___2.call(this, x, y);
      default:
        return ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _.cljs$lang$maxFixedArity = 2;
  _.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
  _.cljs$lang$arity$1 = ___1;
  _.cljs$lang$arity$2 = ___2;
  _.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
  return _
}();
cljs.core._STAR_ = function() {
  var _STAR_ = null;
  var _STAR___0 = function() {
    return 1
  };
  var _STAR___1 = function(x) {
    return x
  };
  var _STAR___2 = function(x, y) {
    return x * y
  };
  var _STAR___3 = function() {
    var G__7232__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, x * y, more)
    };
    var G__7232 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7232__delegate.call(this, x, y, more)
    };
    G__7232.cljs$lang$maxFixedArity = 2;
    G__7232.cljs$lang$applyTo = function(arglist__7233) {
      var x = cljs.core.first(arglist__7233);
      var y = cljs.core.first(cljs.core.next(arglist__7233));
      var more = cljs.core.rest(cljs.core.next(arglist__7233));
      return G__7232__delegate(x, y, more)
    };
    G__7232.cljs$lang$arity$variadic = G__7232__delegate;
    return G__7232
  }();
  _STAR_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _STAR___0.call(this);
      case 1:
        return _STAR___1.call(this, x);
      case 2:
        return _STAR___2.call(this, x, y);
      default:
        return _STAR___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _STAR_.cljs$lang$maxFixedArity = 2;
  _STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
  _STAR_.cljs$lang$arity$0 = _STAR___0;
  _STAR_.cljs$lang$arity$1 = _STAR___1;
  _STAR_.cljs$lang$arity$2 = _STAR___2;
  _STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
  return _STAR_
}();
cljs.core._SLASH_ = function() {
  var _SLASH_ = null;
  var _SLASH___1 = function(x) {
    return _SLASH_.call(null, 1, x)
  };
  var _SLASH___2 = function(x, y) {
    return x / y
  };
  var _SLASH___3 = function() {
    var G__7234__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__7234 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7234__delegate.call(this, x, y, more)
    };
    G__7234.cljs$lang$maxFixedArity = 2;
    G__7234.cljs$lang$applyTo = function(arglist__7235) {
      var x = cljs.core.first(arglist__7235);
      var y = cljs.core.first(cljs.core.next(arglist__7235));
      var more = cljs.core.rest(cljs.core.next(arglist__7235));
      return G__7234__delegate(x, y, more)
    };
    G__7234.cljs$lang$arity$variadic = G__7234__delegate;
    return G__7234
  }();
  _SLASH_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _SLASH___1.call(this, x);
      case 2:
        return _SLASH___2.call(this, x, y);
      default:
        return _SLASH___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _SLASH_.cljs$lang$maxFixedArity = 2;
  _SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
  _SLASH_.cljs$lang$arity$1 = _SLASH___1;
  _SLASH_.cljs$lang$arity$2 = _SLASH___2;
  _SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
  return _SLASH_
}();
cljs.core._LT_ = function() {
  var _LT_ = null;
  var _LT___1 = function(x) {
    return true
  };
  var _LT___2 = function(x, y) {
    return x < y
  };
  var _LT___3 = function() {
    var G__7236__delegate = function(x, y, more) {
      while(true) {
        if(x < y) {
          if(cljs.core.next.call(null, more)) {
            var G__7237 = y;
            var G__7238 = cljs.core.first.call(null, more);
            var G__7239 = cljs.core.next.call(null, more);
            x = G__7237;
            y = G__7238;
            more = G__7239;
            continue
          }else {
            return y < cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7236 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7236__delegate.call(this, x, y, more)
    };
    G__7236.cljs$lang$maxFixedArity = 2;
    G__7236.cljs$lang$applyTo = function(arglist__7240) {
      var x = cljs.core.first(arglist__7240);
      var y = cljs.core.first(cljs.core.next(arglist__7240));
      var more = cljs.core.rest(cljs.core.next(arglist__7240));
      return G__7236__delegate(x, y, more)
    };
    G__7236.cljs$lang$arity$variadic = G__7236__delegate;
    return G__7236
  }();
  _LT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT___1.call(this, x);
      case 2:
        return _LT___2.call(this, x, y);
      default:
        return _LT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT_.cljs$lang$maxFixedArity = 2;
  _LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
  _LT_.cljs$lang$arity$1 = _LT___1;
  _LT_.cljs$lang$arity$2 = _LT___2;
  _LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
  return _LT_
}();
cljs.core._LT__EQ_ = function() {
  var _LT__EQ_ = null;
  var _LT__EQ___1 = function(x) {
    return true
  };
  var _LT__EQ___2 = function(x, y) {
    return x <= y
  };
  var _LT__EQ___3 = function() {
    var G__7241__delegate = function(x, y, more) {
      while(true) {
        if(x <= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7242 = y;
            var G__7243 = cljs.core.first.call(null, more);
            var G__7244 = cljs.core.next.call(null, more);
            x = G__7242;
            y = G__7243;
            more = G__7244;
            continue
          }else {
            return y <= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7241 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7241__delegate.call(this, x, y, more)
    };
    G__7241.cljs$lang$maxFixedArity = 2;
    G__7241.cljs$lang$applyTo = function(arglist__7245) {
      var x = cljs.core.first(arglist__7245);
      var y = cljs.core.first(cljs.core.next(arglist__7245));
      var more = cljs.core.rest(cljs.core.next(arglist__7245));
      return G__7241__delegate(x, y, more)
    };
    G__7241.cljs$lang$arity$variadic = G__7241__delegate;
    return G__7241
  }();
  _LT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT__EQ___1.call(this, x);
      case 2:
        return _LT__EQ___2.call(this, x, y);
      default:
        return _LT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT__EQ_.cljs$lang$maxFixedArity = 2;
  _LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
  _LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
  _LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
  _LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
  return _LT__EQ_
}();
cljs.core._GT_ = function() {
  var _GT_ = null;
  var _GT___1 = function(x) {
    return true
  };
  var _GT___2 = function(x, y) {
    return x > y
  };
  var _GT___3 = function() {
    var G__7246__delegate = function(x, y, more) {
      while(true) {
        if(x > y) {
          if(cljs.core.next.call(null, more)) {
            var G__7247 = y;
            var G__7248 = cljs.core.first.call(null, more);
            var G__7249 = cljs.core.next.call(null, more);
            x = G__7247;
            y = G__7248;
            more = G__7249;
            continue
          }else {
            return y > cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7246 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7246__delegate.call(this, x, y, more)
    };
    G__7246.cljs$lang$maxFixedArity = 2;
    G__7246.cljs$lang$applyTo = function(arglist__7250) {
      var x = cljs.core.first(arglist__7250);
      var y = cljs.core.first(cljs.core.next(arglist__7250));
      var more = cljs.core.rest(cljs.core.next(arglist__7250));
      return G__7246__delegate(x, y, more)
    };
    G__7246.cljs$lang$arity$variadic = G__7246__delegate;
    return G__7246
  }();
  _GT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT___1.call(this, x);
      case 2:
        return _GT___2.call(this, x, y);
      default:
        return _GT___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT_.cljs$lang$maxFixedArity = 2;
  _GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
  _GT_.cljs$lang$arity$1 = _GT___1;
  _GT_.cljs$lang$arity$2 = _GT___2;
  _GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
  return _GT_
}();
cljs.core._GT__EQ_ = function() {
  var _GT__EQ_ = null;
  var _GT__EQ___1 = function(x) {
    return true
  };
  var _GT__EQ___2 = function(x, y) {
    return x >= y
  };
  var _GT__EQ___3 = function() {
    var G__7251__delegate = function(x, y, more) {
      while(true) {
        if(x >= y) {
          if(cljs.core.next.call(null, more)) {
            var G__7252 = y;
            var G__7253 = cljs.core.first.call(null, more);
            var G__7254 = cljs.core.next.call(null, more);
            x = G__7252;
            y = G__7253;
            more = G__7254;
            continue
          }else {
            return y >= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7251 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7251__delegate.call(this, x, y, more)
    };
    G__7251.cljs$lang$maxFixedArity = 2;
    G__7251.cljs$lang$applyTo = function(arglist__7255) {
      var x = cljs.core.first(arglist__7255);
      var y = cljs.core.first(cljs.core.next(arglist__7255));
      var more = cljs.core.rest(cljs.core.next(arglist__7255));
      return G__7251__delegate(x, y, more)
    };
    G__7251.cljs$lang$arity$variadic = G__7251__delegate;
    return G__7251
  }();
  _GT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT__EQ___1.call(this, x);
      case 2:
        return _GT__EQ___2.call(this, x, y);
      default:
        return _GT__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT__EQ_.cljs$lang$maxFixedArity = 2;
  _GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
  _GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
  _GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
  _GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
  return _GT__EQ_
}();
cljs.core.dec = function dec(x) {
  return x - 1
};
cljs.core.max = function() {
  var max = null;
  var max__1 = function(x) {
    return x
  };
  var max__2 = function(x, y) {
    return x > y ? x : y
  };
  var max__3 = function() {
    var G__7256__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, x > y ? x : y, more)
    };
    var G__7256 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7256__delegate.call(this, x, y, more)
    };
    G__7256.cljs$lang$maxFixedArity = 2;
    G__7256.cljs$lang$applyTo = function(arglist__7257) {
      var x = cljs.core.first(arglist__7257);
      var y = cljs.core.first(cljs.core.next(arglist__7257));
      var more = cljs.core.rest(cljs.core.next(arglist__7257));
      return G__7256__delegate(x, y, more)
    };
    G__7256.cljs$lang$arity$variadic = G__7256__delegate;
    return G__7256
  }();
  max = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return max__1.call(this, x);
      case 2:
        return max__2.call(this, x, y);
      default:
        return max__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max.cljs$lang$maxFixedArity = 2;
  max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
  max.cljs$lang$arity$1 = max__1;
  max.cljs$lang$arity$2 = max__2;
  max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
  return max
}();
cljs.core.min = function() {
  var min = null;
  var min__1 = function(x) {
    return x
  };
  var min__2 = function(x, y) {
    return x < y ? x : y
  };
  var min__3 = function() {
    var G__7258__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, x < y ? x : y, more)
    };
    var G__7258 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7258__delegate.call(this, x, y, more)
    };
    G__7258.cljs$lang$maxFixedArity = 2;
    G__7258.cljs$lang$applyTo = function(arglist__7259) {
      var x = cljs.core.first(arglist__7259);
      var y = cljs.core.first(cljs.core.next(arglist__7259));
      var more = cljs.core.rest(cljs.core.next(arglist__7259));
      return G__7258__delegate(x, y, more)
    };
    G__7258.cljs$lang$arity$variadic = G__7258__delegate;
    return G__7258
  }();
  min = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return min__1.call(this, x);
      case 2:
        return min__2.call(this, x, y);
      default:
        return min__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min.cljs$lang$maxFixedArity = 2;
  min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
  min.cljs$lang$arity$1 = min__1;
  min.cljs$lang$arity$2 = min__2;
  min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
  return min
}();
cljs.core.fix = function fix(q) {
  if(q >= 0) {
    return Math.floor.call(null, q)
  }else {
    return Math.ceil.call(null, q)
  }
};
cljs.core.int$ = function int$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.long$ = function long$(x) {
  return cljs.core.fix.call(null, x)
};
cljs.core.mod = function mod(n, d) {
  return n % d
};
cljs.core.quot = function quot(n, d) {
  var rem__7261 = n % d;
  return cljs.core.fix.call(null, (n - rem__7261) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__7263 = cljs.core.quot.call(null, n, d);
  return n - d * q__7263
};
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return Math.random.call(null)
  };
  var rand__1 = function(n) {
    return n * rand.call(null)
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, n))
};
cljs.core.bit_xor = function bit_xor(x, y) {
  return x ^ y
};
cljs.core.bit_and = function bit_and(x, y) {
  return x & y
};
cljs.core.bit_or = function bit_or(x, y) {
  return x | y
};
cljs.core.bit_and_not = function bit_and_not(x, y) {
  return x & ~y
};
cljs.core.bit_clear = function bit_clear(x, n) {
  return x & ~(1 << n)
};
cljs.core.bit_flip = function bit_flip(x, n) {
  return x ^ 1 << n
};
cljs.core.bit_not = function bit_not(x) {
  return~x
};
cljs.core.bit_set = function bit_set(x, n) {
  return x | 1 << n
};
cljs.core.bit_test = function bit_test(x, n) {
  return(x & 1 << n) != 0
};
cljs.core.bit_shift_left = function bit_shift_left(x, n) {
  return x << n
};
cljs.core.bit_shift_right = function bit_shift_right(x, n) {
  return x >> n
};
cljs.core.bit_shift_right_zero_fill = function bit_shift_right_zero_fill(x, n) {
  return x >>> n
};
cljs.core.bit_count = function bit_count(v) {
  var v__7266 = v - (v >> 1 & 1431655765);
  var v__7267 = (v__7266 & 858993459) + (v__7266 >> 2 & 858993459);
  return(v__7267 + (v__7267 >> 4) & 252645135) * 16843009 >> 24
};
cljs.core._EQ__EQ_ = function() {
  var _EQ__EQ_ = null;
  var _EQ__EQ___1 = function(x) {
    return true
  };
  var _EQ__EQ___2 = function(x, y) {
    return cljs.core._equiv.call(null, x, y)
  };
  var _EQ__EQ___3 = function() {
    var G__7268__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.next.call(null, more)) {
            var G__7269 = y;
            var G__7270 = cljs.core.first.call(null, more);
            var G__7271 = cljs.core.next.call(null, more);
            x = G__7269;
            y = G__7270;
            more = G__7271;
            continue
          }else {
            return _EQ__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__7268 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7268__delegate.call(this, x, y, more)
    };
    G__7268.cljs$lang$maxFixedArity = 2;
    G__7268.cljs$lang$applyTo = function(arglist__7272) {
      var x = cljs.core.first(arglist__7272);
      var y = cljs.core.first(cljs.core.next(arglist__7272));
      var more = cljs.core.rest(cljs.core.next(arglist__7272));
      return G__7268__delegate(x, y, more)
    };
    G__7268.cljs$lang$arity$variadic = G__7268__delegate;
    return G__7268
  }();
  _EQ__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ__EQ___1.call(this, x);
      case 2:
        return _EQ__EQ___2.call(this, x, y);
      default:
        return _EQ__EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ__EQ_.cljs$lang$maxFixedArity = 2;
  _EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
  _EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
  _EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
  _EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
  return _EQ__EQ_
}();
cljs.core.pos_QMARK_ = function pos_QMARK_(n) {
  return n > 0
};
cljs.core.zero_QMARK_ = function zero_QMARK_(n) {
  return n === 0
};
cljs.core.neg_QMARK_ = function neg_QMARK_(x) {
  return x < 0
};
cljs.core.nthnext = function nthnext(coll, n) {
  var n__7276 = n;
  var xs__7277 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3822__auto____7278 = xs__7277;
      if(and__3822__auto____7278) {
        return n__7276 > 0
      }else {
        return and__3822__auto____7278
      }
    }())) {
      var G__7279 = n__7276 - 1;
      var G__7280 = cljs.core.next.call(null, xs__7277);
      n__7276 = G__7279;
      xs__7277 = G__7280;
      continue
    }else {
      return xs__7277
    }
    break
  }
};
cljs.core.str_STAR_ = function() {
  var str_STAR_ = null;
  var str_STAR___0 = function() {
    return""
  };
  var str_STAR___1 = function(x) {
    if(x == null) {
      return""
    }else {
      if("\ufdd0'else") {
        return x.toString()
      }else {
        return null
      }
    }
  };
  var str_STAR___2 = function() {
    var G__7281__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7282 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__7283 = cljs.core.next.call(null, more);
            sb = G__7282;
            more = G__7283;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__7281 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7281__delegate.call(this, x, ys)
    };
    G__7281.cljs$lang$maxFixedArity = 1;
    G__7281.cljs$lang$applyTo = function(arglist__7284) {
      var x = cljs.core.first(arglist__7284);
      var ys = cljs.core.rest(arglist__7284);
      return G__7281__delegate(x, ys)
    };
    G__7281.cljs$lang$arity$variadic = G__7281__delegate;
    return G__7281
  }();
  str_STAR_ = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str_STAR___0.call(this);
      case 1:
        return str_STAR___1.call(this, x);
      default:
        return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str_STAR_.cljs$lang$maxFixedArity = 1;
  str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
  str_STAR_.cljs$lang$arity$0 = str_STAR___0;
  str_STAR_.cljs$lang$arity$1 = str_STAR___1;
  str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
  return str_STAR_
}();
cljs.core.str = function() {
  var str = null;
  var str__0 = function() {
    return""
  };
  var str__1 = function(x) {
    if(cljs.core.symbol_QMARK_.call(null, x)) {
      return x.substring(2, x.length)
    }else {
      if(cljs.core.keyword_QMARK_.call(null, x)) {
        return cljs.core.str_STAR_.call(null, ":", x.substring(2, x.length))
      }else {
        if(x == null) {
          return""
        }else {
          if("\ufdd0'else") {
            return x.toString()
          }else {
            return null
          }
        }
      }
    }
  };
  var str__2 = function() {
    var G__7285__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__7286 = sb.append(str.call(null, cljs.core.first.call(null, more)));
            var G__7287 = cljs.core.next.call(null, more);
            sb = G__7286;
            more = G__7287;
            continue
          }else {
            return cljs.core.str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str.call(null, x)), ys)
    };
    var G__7285 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__7285__delegate.call(this, x, ys)
    };
    G__7285.cljs$lang$maxFixedArity = 1;
    G__7285.cljs$lang$applyTo = function(arglist__7288) {
      var x = cljs.core.first(arglist__7288);
      var ys = cljs.core.rest(arglist__7288);
      return G__7285__delegate(x, ys)
    };
    G__7285.cljs$lang$arity$variadic = G__7285__delegate;
    return G__7285
  }();
  str = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str__0.call(this);
      case 1:
        return str__1.call(this, x);
      default:
        return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  str.cljs$lang$maxFixedArity = 1;
  str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
  str.cljs$lang$arity$0 = str__0;
  str.cljs$lang$arity$1 = str__1;
  str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
  return str
}();
cljs.core.subs = function() {
  var subs = null;
  var subs__2 = function(s, start) {
    return s.substring(start)
  };
  var subs__3 = function(s, start, end) {
    return s.substring(start, end)
  };
  subs = function(s, start, end) {
    switch(arguments.length) {
      case 2:
        return subs__2.call(this, s, start);
      case 3:
        return subs__3.call(this, s, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subs.cljs$lang$arity$2 = subs__2;
  subs.cljs$lang$arity$3 = subs__3;
  return subs
}();
cljs.core.format = function() {
  var format__delegate = function(fmt, args) {
    return cljs.core.apply.call(null, goog.string.format, fmt, args)
  };
  var format = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return format__delegate.call(this, fmt, args)
  };
  format.cljs$lang$maxFixedArity = 1;
  format.cljs$lang$applyTo = function(arglist__7289) {
    var fmt = cljs.core.first(arglist__7289);
    var args = cljs.core.rest(arglist__7289);
    return format__delegate(fmt, args)
  };
  format.cljs$lang$arity$variadic = format__delegate;
  return format
}();
cljs.core.symbol = function() {
  var symbol = null;
  var symbol__1 = function(name) {
    if(cljs.core.symbol_QMARK_.call(null, name)) {
      name
    }else {
      if(cljs.core.keyword_QMARK_.call(null, name)) {
        cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, name, 2))
      }else {
      }
    }
    return cljs.core.str_STAR_.call(null, "\ufdd1", "'", name)
  };
  var symbol__2 = function(ns, name) {
    return symbol.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  symbol = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return symbol__1.call(this, ns);
      case 2:
        return symbol__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  symbol.cljs$lang$arity$1 = symbol__1;
  symbol.cljs$lang$arity$2 = symbol__2;
  return symbol
}();
cljs.core.keyword = function() {
  var keyword = null;
  var keyword__1 = function(name) {
    if(cljs.core.keyword_QMARK_.call(null, name)) {
      return name
    }else {
      if(cljs.core.symbol_QMARK_.call(null, name)) {
        return cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, name, 2))
      }else {
        if("\ufdd0'else") {
          return cljs.core.str_STAR_.call(null, "\ufdd0", "'", name)
        }else {
          return null
        }
      }
    }
  };
  var keyword__2 = function(ns, name) {
    return keyword.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  keyword = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return keyword__1.call(this, ns);
      case 2:
        return keyword__2.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  keyword.cljs$lang$arity$1 = keyword__1;
  keyword.cljs$lang$arity$2 = keyword__2;
  return keyword
}();
cljs.core.equiv_sequential = function equiv_sequential(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.sequential_QMARK_.call(null, y) ? function() {
    var xs__7292 = cljs.core.seq.call(null, x);
    var ys__7293 = cljs.core.seq.call(null, y);
    while(true) {
      if(xs__7292 == null) {
        return ys__7293 == null
      }else {
        if(ys__7293 == null) {
          return false
        }else {
          if(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__7292), cljs.core.first.call(null, ys__7293))) {
            var G__7294 = cljs.core.next.call(null, xs__7292);
            var G__7295 = cljs.core.next.call(null, ys__7293);
            xs__7292 = G__7294;
            ys__7293 = G__7295;
            continue
          }else {
            if("\ufdd0'else") {
              return false
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }() : null)
};
cljs.core.hash_combine = function hash_combine(seed, hash) {
  return seed ^ hash + 2654435769 + (seed << 6) + (seed >> 2)
};
cljs.core.hash_coll = function hash_coll(coll) {
  return cljs.core.reduce.call(null, function(p1__7296_SHARP_, p2__7297_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__7296_SHARP_, cljs.core.hash.call(null, p2__7297_SHARP_, false))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll), false), cljs.core.next.call(null, coll))
};
cljs.core.hash_imap = function hash_imap(m) {
  var h__7301 = 0;
  var s__7302 = cljs.core.seq.call(null, m);
  while(true) {
    if(s__7302) {
      var e__7303 = cljs.core.first.call(null, s__7302);
      var G__7304 = (h__7301 + (cljs.core.hash.call(null, cljs.core.key.call(null, e__7303)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, e__7303)))) % 4503599627370496;
      var G__7305 = cljs.core.next.call(null, s__7302);
      h__7301 = G__7304;
      s__7302 = G__7305;
      continue
    }else {
      return h__7301
    }
    break
  }
};
cljs.core.hash_iset = function hash_iset(s) {
  var h__7309 = 0;
  var s__7310 = cljs.core.seq.call(null, s);
  while(true) {
    if(s__7310) {
      var e__7311 = cljs.core.first.call(null, s__7310);
      var G__7312 = (h__7309 + cljs.core.hash.call(null, e__7311)) % 4503599627370496;
      var G__7313 = cljs.core.next.call(null, s__7310);
      h__7309 = G__7312;
      s__7310 = G__7313;
      continue
    }else {
      return h__7309
    }
    break
  }
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__7334__7335 = cljs.core.seq.call(null, fn_map);
  if(G__7334__7335) {
    var G__7337__7339 = cljs.core.first.call(null, G__7334__7335);
    var vec__7338__7340 = G__7337__7339;
    var key_name__7341 = cljs.core.nth.call(null, vec__7338__7340, 0, null);
    var f__7342 = cljs.core.nth.call(null, vec__7338__7340, 1, null);
    var G__7334__7343 = G__7334__7335;
    var G__7337__7344 = G__7337__7339;
    var G__7334__7345 = G__7334__7343;
    while(true) {
      var vec__7346__7347 = G__7337__7344;
      var key_name__7348 = cljs.core.nth.call(null, vec__7346__7347, 0, null);
      var f__7349 = cljs.core.nth.call(null, vec__7346__7347, 1, null);
      var G__7334__7350 = G__7334__7345;
      var str_name__7351 = cljs.core.name.call(null, key_name__7348);
      obj[str_name__7351] = f__7349;
      var temp__3974__auto____7352 = cljs.core.next.call(null, G__7334__7350);
      if(temp__3974__auto____7352) {
        var G__7334__7353 = temp__3974__auto____7352;
        var G__7354 = cljs.core.first.call(null, G__7334__7353);
        var G__7355 = G__7334__7353;
        G__7337__7344 = G__7354;
        G__7334__7345 = G__7355;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return obj
};
cljs.core.List = function(meta, first, rest, count, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.count = count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413358
};
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7356 = this;
  var h__2192__auto____7357 = this__7356.__hash;
  if(!(h__2192__auto____7357 == null)) {
    return h__2192__auto____7357
  }else {
    var h__2192__auto____7358 = cljs.core.hash_coll.call(null, coll);
    this__7356.__hash = h__2192__auto____7358;
    return h__2192__auto____7358
  }
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7359 = this;
  if(this__7359.count === 1) {
    return null
  }else {
    return this__7359.rest
  }
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7360 = this;
  return new cljs.core.List(this__7360.meta, o, coll, this__7360.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  var this__7361 = this;
  var this__7362 = this;
  return cljs.core.pr_str.call(null, this__7362)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7363 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7364 = this;
  return this__7364.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7365 = this;
  return this__7365.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7366 = this;
  return coll.cljs$core$ISeq$_rest$arity$1(coll)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7367 = this;
  return this__7367.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7368 = this;
  if(this__7368.count === 1) {
    return cljs.core.List.EMPTY
  }else {
    return this__7368.rest
  }
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7369 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7370 = this;
  return new cljs.core.List(meta, this__7370.first, this__7370.rest, this__7370.count, this__7370.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7371 = this;
  return this__7371.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7372 = this;
  return cljs.core.List.EMPTY
};
cljs.core.List;
cljs.core.EmptyList = function(meta) {
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7373 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7374 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7375 = this;
  return new cljs.core.List(this__7375.meta, o, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  var this__7376 = this;
  var this__7377 = this;
  return cljs.core.pr_str.call(null, this__7377)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7378 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__7379 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__7380 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__7381 = this;
  throw new Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7382 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7383 = this;
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7384 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7385 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7386 = this;
  return this__7386.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7387 = this;
  return coll
};
cljs.core.EmptyList;
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function reversible_QMARK_(coll) {
  var G__7391__7392 = coll;
  if(G__7391__7392) {
    if(function() {
      var or__3824__auto____7393 = G__7391__7392.cljs$lang$protocol_mask$partition0$ & 134217728;
      if(or__3824__auto____7393) {
        return or__3824__auto____7393
      }else {
        return G__7391__7392.cljs$core$IReversible$
      }
    }()) {
      return true
    }else {
      if(!G__7391__7392.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7391__7392)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IReversible, G__7391__7392)
  }
};
cljs.core.rseq = function rseq(coll) {
  return cljs.core._rseq.call(null, coll)
};
cljs.core.reverse = function reverse(coll) {
  if(cljs.core.reversible_QMARK_.call(null, coll)) {
    return cljs.core.rseq.call(null, coll)
  }else {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, coll)
  }
};
cljs.core.list = function() {
  var list = null;
  var list__0 = function() {
    return cljs.core.List.EMPTY
  };
  var list__1 = function(x) {
    return cljs.core.conj.call(null, cljs.core.List.EMPTY, x)
  };
  var list__2 = function(x, y) {
    return cljs.core.conj.call(null, list.call(null, y), x)
  };
  var list__3 = function(x, y, z) {
    return cljs.core.conj.call(null, list.call(null, y, z), x)
  };
  var list__4 = function() {
    var G__7394__delegate = function(x, y, z, items) {
      return cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.conj.call(null, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items)), z), y), x)
    };
    var G__7394 = function(x, y, z, var_args) {
      var items = null;
      if(goog.isDef(var_args)) {
        items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7394__delegate.call(this, x, y, z, items)
    };
    G__7394.cljs$lang$maxFixedArity = 3;
    G__7394.cljs$lang$applyTo = function(arglist__7395) {
      var x = cljs.core.first(arglist__7395);
      var y = cljs.core.first(cljs.core.next(arglist__7395));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7395)));
      var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7395)));
      return G__7394__delegate(x, y, z, items)
    };
    G__7394.cljs$lang$arity$variadic = G__7394__delegate;
    return G__7394
  }();
  list = function(x, y, z, var_args) {
    var items = var_args;
    switch(arguments.length) {
      case 0:
        return list__0.call(this);
      case 1:
        return list__1.call(this, x);
      case 2:
        return list__2.call(this, x, y);
      case 3:
        return list__3.call(this, x, y, z);
      default:
        return list__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list.cljs$lang$maxFixedArity = 3;
  list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
  list.cljs$lang$arity$0 = list__0;
  list.cljs$lang$arity$1 = list__1;
  list.cljs$lang$arity$2 = list__2;
  list.cljs$lang$arity$3 = list__3;
  list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
  return list
}();
cljs.core.Cons = function(meta, first, rest, __hash) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7396 = this;
  var h__2192__auto____7397 = this__7396.__hash;
  if(!(h__2192__auto____7397 == null)) {
    return h__2192__auto____7397
  }else {
    var h__2192__auto____7398 = cljs.core.hash_coll.call(null, coll);
    this__7396.__hash = h__2192__auto____7398;
    return h__2192__auto____7398
  }
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7399 = this;
  if(this__7399.rest == null) {
    return null
  }else {
    return cljs.core._seq.call(null, this__7399.rest)
  }
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7400 = this;
  return new cljs.core.Cons(null, o, coll, this__7400.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  var this__7401 = this;
  var this__7402 = this;
  return cljs.core.pr_str.call(null, this__7402)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7403 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7404 = this;
  return this__7404.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7405 = this;
  if(this__7405.rest == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7405.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7406 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7407 = this;
  return new cljs.core.Cons(meta, this__7407.first, this__7407.rest, this__7407.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7408 = this;
  return this__7408.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7409 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7409.meta)
};
cljs.core.Cons;
cljs.core.cons = function cons(x, coll) {
  if(function() {
    var or__3824__auto____7414 = coll == null;
    if(or__3824__auto____7414) {
      return or__3824__auto____7414
    }else {
      var G__7415__7416 = coll;
      if(G__7415__7416) {
        if(function() {
          var or__3824__auto____7417 = G__7415__7416.cljs$lang$protocol_mask$partition0$ & 64;
          if(or__3824__auto____7417) {
            return or__3824__auto____7417
          }else {
            return G__7415__7416.cljs$core$ISeq$
          }
        }()) {
          return true
        }else {
          if(!G__7415__7416.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7415__7416)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, G__7415__7416)
      }
    }
  }()) {
    return new cljs.core.Cons(null, x, coll, null)
  }else {
    return new cljs.core.Cons(null, x, cljs.core.seq.call(null, coll), null)
  }
};
cljs.core.list_QMARK_ = function list_QMARK_(x) {
  var G__7421__7422 = x;
  if(G__7421__7422) {
    if(function() {
      var or__3824__auto____7423 = G__7421__7422.cljs$lang$protocol_mask$partition0$ & 33554432;
      if(or__3824__auto____7423) {
        return or__3824__auto____7423
      }else {
        return G__7421__7422.cljs$core$IList$
      }
    }()) {
      return true
    }else {
      if(!G__7421__7422.cljs$lang$protocol_mask$partition0$) {
        return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7421__7422)
      }else {
        return false
      }
    }
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IList, G__7421__7422)
  }
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__7424 = null;
  var G__7424__2 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__7424__3 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__7424 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__7424__2.call(this, string, f);
      case 3:
        return G__7424__3.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7424
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__7425 = null;
  var G__7425__2 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__7425__3 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__7425 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7425__2.call(this, string, k);
      case 3:
        return G__7425__3.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7425
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__7426 = null;
  var G__7426__2 = function(string, n) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__7426__3 = function(string, n, not_found) {
    if(n < cljs.core._count.call(null, string)) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__7426 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7426__2.call(this, string, n);
      case 3:
        return G__7426__3.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7426
}();
cljs.core.ICounted["string"] = true;
cljs.core._count["string"] = function(s) {
  return s.length
};
cljs.core.ISeqable["string"] = true;
cljs.core._seq["string"] = function(string) {
  return cljs.core.prim_seq.call(null, string, 0)
};
cljs.core.IHash["string"] = true;
cljs.core._hash["string"] = function(o) {
  return goog.string.hashCode(o)
};
cljs.core.Keyword = function(k) {
  this.k = k;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var G__7438 = null;
  var G__7438__2 = function(this_sym7429, coll) {
    var this__7431 = this;
    var this_sym7429__7432 = this;
    var ___7433 = this_sym7429__7432;
    if(coll == null) {
      return null
    }else {
      var strobj__7434 = coll.strobj;
      if(strobj__7434 == null) {
        return cljs.core._lookup.call(null, coll, this__7431.k, null)
      }else {
        return strobj__7434[this__7431.k]
      }
    }
  };
  var G__7438__3 = function(this_sym7430, coll, not_found) {
    var this__7431 = this;
    var this_sym7430__7435 = this;
    var ___7436 = this_sym7430__7435;
    if(coll == null) {
      return not_found
    }else {
      return cljs.core._lookup.call(null, coll, this__7431.k, not_found)
    }
  };
  G__7438 = function(this_sym7430, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7438__2.call(this, this_sym7430, coll);
      case 3:
        return G__7438__3.call(this, this_sym7430, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7438
}();
cljs.core.Keyword.prototype.apply = function(this_sym7427, args7428) {
  var this__7437 = this;
  return this_sym7427.call.apply(this_sym7427, [this_sym7427].concat(args7428.slice()))
};
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = function() {
  var G__7447 = null;
  var G__7447__2 = function(this_sym7441, coll) {
    var this_sym7441__7443 = this;
    var this__7444 = this_sym7441__7443;
    return cljs.core._lookup.call(null, coll, this__7444.toString(), null)
  };
  var G__7447__3 = function(this_sym7442, coll, not_found) {
    var this_sym7442__7445 = this;
    var this__7446 = this_sym7442__7445;
    return cljs.core._lookup.call(null, coll, this__7446.toString(), not_found)
  };
  G__7447 = function(this_sym7442, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__7447__2.call(this, this_sym7442, coll);
      case 3:
        return G__7447__3.call(this, this_sym7442, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__7447
}();
String.prototype.apply = function(this_sym7439, args7440) {
  return this_sym7439.call.apply(this_sym7439, [this_sym7439].concat(args7440.slice()))
};
String.prototype.apply = function(s, args) {
  if(cljs.core.count.call(null, args) < 2) {
    return cljs.core._lookup.call(null, args[0], s, null)
  }else {
    return cljs.core._lookup.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__7449 = lazy_seq.x;
  if(lazy_seq.realized) {
    return x__7449
  }else {
    lazy_seq.x = x__7449.call(null);
    lazy_seq.realized = true;
    return lazy_seq.x
  }
};
cljs.core.LazySeq = function(meta, realized, x, __hash) {
  this.meta = meta;
  this.realized = realized;
  this.x = x;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__7450 = this;
  var h__2192__auto____7451 = this__7450.__hash;
  if(!(h__2192__auto____7451 == null)) {
    return h__2192__auto____7451
  }else {
    var h__2192__auto____7452 = cljs.core.hash_coll.call(null, coll);
    this__7450.__hash = h__2192__auto____7452;
    return h__2192__auto____7452
  }
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__7453 = this;
  return cljs.core._seq.call(null, coll.cljs$core$ISeq$_rest$arity$1(coll))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__7454 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.toString = function() {
  var this__7455 = this;
  var this__7456 = this;
  return cljs.core.pr_str.call(null, this__7456)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7457 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7458 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7459 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7460 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__7461 = this;
  return new cljs.core.LazySeq(meta, this__7461.realized, this__7461.x, this__7461.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7462 = this;
  return this__7462.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__7463 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__7463.meta)
};
cljs.core.LazySeq;
cljs.core.ChunkBuffer = function(buf, end) {
  this.buf = buf;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7464 = this;
  return this__7464.end
};
cljs.core.ChunkBuffer.prototype.add = function(o) {
  var this__7465 = this;
  var ___7466 = this;
  this__7465.buf[this__7465.end] = o;
  return this__7465.end = this__7465.end + 1
};
cljs.core.ChunkBuffer.prototype.chunk = function(o) {
  var this__7467 = this;
  var ___7468 = this;
  var ret__7469 = new cljs.core.ArrayChunk(this__7467.buf, 0, this__7467.end);
  this__7467.buf = null;
  return ret__7469
};
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = function chunk_buffer(capacity) {
  return new cljs.core.ChunkBuffer(cljs.core.make_array.call(null, capacity), 0)
};
cljs.core.ArrayChunk = function(arr, off, end) {
  this.arr = arr;
  this.off = off;
  this.end = end;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__7470 = this;
  return cljs.core.ci_reduce.call(null, coll, f, this__7470.arr[this__7470.off], this__7470.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__7471 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start, this__7471.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function(coll) {
  var this__7472 = this;
  if(this__7472.off === this__7472.end) {
    throw new Error("-drop-first of empty chunk");
  }else {
    return new cljs.core.ArrayChunk(this__7472.arr, this__7472.off + 1, this__7472.end)
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, i) {
  var this__7473 = this;
  return this__7473.arr[this__7473.off + i]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, i, not_found) {
  var this__7474 = this;
  if(function() {
    var and__3822__auto____7475 = i >= 0;
    if(and__3822__auto____7475) {
      return i < this__7474.end - this__7474.off
    }else {
      return and__3822__auto____7475
    }
  }()) {
    return this__7474.arr[this__7474.off + i]
  }else {
    return not_found
  }
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function(_) {
  var this__7476 = this;
  return this__7476.end - this__7476.off
};
cljs.core.ArrayChunk;
cljs.core.array_chunk = function() {
  var array_chunk = null;
  var array_chunk__1 = function(arr) {
    return array_chunk.call(null, arr, 0, arr.length)
  };
  var array_chunk__2 = function(arr, off) {
    return array_chunk.call(null, arr, off, arr.length)
  };
  var array_chunk__3 = function(arr, off, end) {
    return new cljs.core.ArrayChunk(arr, off, end)
  };
  array_chunk = function(arr, off, end) {
    switch(arguments.length) {
      case 1:
        return array_chunk__1.call(this, arr);
      case 2:
        return array_chunk__2.call(this, arr, off);
      case 3:
        return array_chunk__3.call(this, arr, off, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  array_chunk.cljs$lang$arity$1 = array_chunk__1;
  array_chunk.cljs$lang$arity$2 = array_chunk__2;
  array_chunk.cljs$lang$arity$3 = array_chunk__3;
  return array_chunk
}();
cljs.core.ChunkedCons = function(chunk, more, meta) {
  this.chunk = chunk;
  this.more = more;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27656296
};
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(this$, o) {
  var this__7477 = this;
  return cljs.core.cons.call(null, o, this$)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__7478 = this;
  return coll
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__7479 = this;
  return cljs.core._nth.call(null, this__7479.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__7480 = this;
  if(cljs.core._count.call(null, this__7480.chunk) > 1) {
    return new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this__7480.chunk), this__7480.more, this__7480.meta)
  }else {
    if(this__7480.more == null) {
      return cljs.core.List.EMPTY
    }else {
      return this__7480.more
    }
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__7481 = this;
  if(this__7481.more == null) {
    return null
  }else {
    return this__7481.more
  }
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__7482 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__7483 = this;
  return new cljs.core.ChunkedCons(this__7483.chunk, this__7483.more, m)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__7484 = this;
  return this__7484.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__7485 = this;
  return this__7485.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__7486 = this;
  if(this__7486.more == null) {
    return cljs.core.List.EMPTY
  }else {
    return this__7486.more
  }
};
cljs.core.ChunkedCons;
cljs.core.chunk_cons = function chunk_cons(chunk, rest) {
  if(cljs.core._count.call(null, chunk) === 0) {
    return rest
  }else {
    return new cljs.core.ChunkedCons(chunk, rest, null)
  }
};
cljs.core.chunk_append = function chunk_append(b, x) {
  return b.add(x)
};
cljs.core.chunk = function chunk(b) {
  return b.chunk()
};
cljs.core.chunk_first = function chunk_first(s) {
  return cljs.core._chunked_first.call(null, s)
};
cljs.core.chunk_rest = function chunk_rest(s) {
  return cljs.core._chunked_rest.call(null, s)
};
cljs.core.chunk_next = function chunk_next(s) {
  if(function() {
    var G__7490__7491 = s;
    if(G__7490__7491) {
      if(cljs.core.truth_(function() {
        var or__3824__auto____7492 = null;
        if(cljs.core.truth_(or__3824__auto____7492)) {
          return or__3824__auto____7492
        }else {
          return G__7490__7491.cljs$core$IChunkedNext$
        }
      }())) {
        return true
      }else {
        if(!G__7490__7491.cljs$lang$protocol_mask$partition$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7490__7491)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IChunkedNext, G__7490__7491)
    }
  }()) {
    return cljs.core._chunked_next.call(null, s)
  }else {
    return cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, s))
  }
};
cljs.core.to_array = function to_array(s) {
  var ary__7495 = [];
  var s__7496 = s;
  while(true) {
    if(cljs.core.seq.call(null, s__7496)) {
      ary__7495.push(cljs.core.first.call(null, s__7496));
      var G__7497 = cljs.core.next.call(null, s__7496);
      s__7496 = G__7497;
      continue
    }else {
      return ary__7495
    }
    break
  }
};
cljs.core.to_array_2d = function to_array_2d(coll) {
  var ret__7501 = cljs.core.make_array.call(null, cljs.core.count.call(null, coll));
  var i__7502 = 0;
  var xs__7503 = cljs.core.seq.call(null, coll);
  while(true) {
    if(xs__7503) {
      ret__7501[i__7502] = cljs.core.to_array.call(null, cljs.core.first.call(null, xs__7503));
      var G__7504 = i__7502 + 1;
      var G__7505 = cljs.core.next.call(null, xs__7503);
      i__7502 = G__7504;
      xs__7503 = G__7505;
      continue
    }else {
    }
    break
  }
  return ret__7501
};
cljs.core.long_array = function() {
  var long_array = null;
  var long_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return long_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("long-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var long_array__2 = function(size, init_val_or_seq) {
    var a__7513 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7514 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7515 = 0;
      var s__7516 = s__7514;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7517 = s__7516;
          if(and__3822__auto____7517) {
            return i__7515 < size
          }else {
            return and__3822__auto____7517
          }
        }())) {
          a__7513[i__7515] = cljs.core.first.call(null, s__7516);
          var G__7520 = i__7515 + 1;
          var G__7521 = cljs.core.next.call(null, s__7516);
          i__7515 = G__7520;
          s__7516 = G__7521;
          continue
        }else {
          return a__7513
        }
        break
      }
    }else {
      var n__2527__auto____7518 = size;
      var i__7519 = 0;
      while(true) {
        if(i__7519 < n__2527__auto____7518) {
          a__7513[i__7519] = init_val_or_seq;
          var G__7522 = i__7519 + 1;
          i__7519 = G__7522;
          continue
        }else {
        }
        break
      }
      return a__7513
    }
  };
  long_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return long_array__1.call(this, size);
      case 2:
        return long_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  long_array.cljs$lang$arity$1 = long_array__1;
  long_array.cljs$lang$arity$2 = long_array__2;
  return long_array
}();
cljs.core.double_array = function() {
  var double_array = null;
  var double_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return double_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("double-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var double_array__2 = function(size, init_val_or_seq) {
    var a__7530 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7531 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7532 = 0;
      var s__7533 = s__7531;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7534 = s__7533;
          if(and__3822__auto____7534) {
            return i__7532 < size
          }else {
            return and__3822__auto____7534
          }
        }())) {
          a__7530[i__7532] = cljs.core.first.call(null, s__7533);
          var G__7537 = i__7532 + 1;
          var G__7538 = cljs.core.next.call(null, s__7533);
          i__7532 = G__7537;
          s__7533 = G__7538;
          continue
        }else {
          return a__7530
        }
        break
      }
    }else {
      var n__2527__auto____7535 = size;
      var i__7536 = 0;
      while(true) {
        if(i__7536 < n__2527__auto____7535) {
          a__7530[i__7536] = init_val_or_seq;
          var G__7539 = i__7536 + 1;
          i__7536 = G__7539;
          continue
        }else {
        }
        break
      }
      return a__7530
    }
  };
  double_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return double_array__1.call(this, size);
      case 2:
        return double_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  double_array.cljs$lang$arity$1 = double_array__1;
  double_array.cljs$lang$arity$2 = double_array__2;
  return double_array
}();
cljs.core.object_array = function() {
  var object_array = null;
  var object_array__1 = function(size_or_seq) {
    if(cljs.core.number_QMARK_.call(null, size_or_seq)) {
      return object_array.call(null, size_or_seq, null)
    }else {
      if(cljs.core.seq_QMARK_.call(null, size_or_seq)) {
        return cljs.core.into_array.call(null, size_or_seq)
      }else {
        if("\ufdd0'else") {
          throw new Error("object-array called with something other than size or ISeq");
        }else {
          return null
        }
      }
    }
  };
  var object_array__2 = function(size, init_val_or_seq) {
    var a__7547 = cljs.core.make_array.call(null, size);
    if(cljs.core.seq_QMARK_.call(null, init_val_or_seq)) {
      var s__7548 = cljs.core.seq.call(null, init_val_or_seq);
      var i__7549 = 0;
      var s__7550 = s__7548;
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3822__auto____7551 = s__7550;
          if(and__3822__auto____7551) {
            return i__7549 < size
          }else {
            return and__3822__auto____7551
          }
        }())) {
          a__7547[i__7549] = cljs.core.first.call(null, s__7550);
          var G__7554 = i__7549 + 1;
          var G__7555 = cljs.core.next.call(null, s__7550);
          i__7549 = G__7554;
          s__7550 = G__7555;
          continue
        }else {
          return a__7547
        }
        break
      }
    }else {
      var n__2527__auto____7552 = size;
      var i__7553 = 0;
      while(true) {
        if(i__7553 < n__2527__auto____7552) {
          a__7547[i__7553] = init_val_or_seq;
          var G__7556 = i__7553 + 1;
          i__7553 = G__7556;
          continue
        }else {
        }
        break
      }
      return a__7547
    }
  };
  object_array = function(size, init_val_or_seq) {
    switch(arguments.length) {
      case 1:
        return object_array__1.call(this, size);
      case 2:
        return object_array__2.call(this, size, init_val_or_seq)
    }
    throw"Invalid arity: " + arguments.length;
  };
  object_array.cljs$lang$arity$1 = object_array__1;
  object_array.cljs$lang$arity$2 = object_array__2;
  return object_array
}();
cljs.core.bounded_count = function bounded_count(s, n) {
  if(cljs.core.counted_QMARK_.call(null, s)) {
    return cljs.core.count.call(null, s)
  }else {
    var s__7561 = s;
    var i__7562 = n;
    var sum__7563 = 0;
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____7564 = i__7562 > 0;
        if(and__3822__auto____7564) {
          return cljs.core.seq.call(null, s__7561)
        }else {
          return and__3822__auto____7564
        }
      }())) {
        var G__7565 = cljs.core.next.call(null, s__7561);
        var G__7566 = i__7562 - 1;
        var G__7567 = sum__7563 + 1;
        s__7561 = G__7565;
        i__7562 = G__7566;
        sum__7563 = G__7567;
        continue
      }else {
        return sum__7563
      }
      break
    }
  }
};
cljs.core.spread = function spread(arglist) {
  if(arglist == null) {
    return null
  }else {
    if(cljs.core.next.call(null, arglist) == null) {
      return cljs.core.seq.call(null, cljs.core.first.call(null, arglist))
    }else {
      if("\ufdd0'else") {
        return cljs.core.cons.call(null, cljs.core.first.call(null, arglist), spread.call(null, cljs.core.next.call(null, arglist)))
      }else {
        return null
      }
    }
  }
};
cljs.core.concat = function() {
  var concat = null;
  var concat__0 = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    }, null)
  };
  var concat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return x
    }, null)
  };
  var concat__2 = function(x, y) {
    return new cljs.core.LazySeq(null, false, function() {
      var s__7572 = cljs.core.seq.call(null, x);
      if(s__7572) {
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7572)) {
          return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, s__7572), concat.call(null, cljs.core.chunk_rest.call(null, s__7572), y))
        }else {
          return cljs.core.cons.call(null, cljs.core.first.call(null, s__7572), concat.call(null, cljs.core.rest.call(null, s__7572), y))
        }
      }else {
        return y
      }
    }, null)
  };
  var concat__3 = function() {
    var G__7576__delegate = function(x, y, zs) {
      var cat__7575 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__7574 = cljs.core.seq.call(null, xys);
          if(xys__7574) {
            if(cljs.core.chunked_seq_QMARK_.call(null, xys__7574)) {
              return cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, xys__7574), cat.call(null, cljs.core.chunk_rest.call(null, xys__7574), zs))
            }else {
              return cljs.core.cons.call(null, cljs.core.first.call(null, xys__7574), cat.call(null, cljs.core.rest.call(null, xys__7574), zs))
            }
          }else {
            if(cljs.core.truth_(zs)) {
              return cat.call(null, cljs.core.first.call(null, zs), cljs.core.next.call(null, zs))
            }else {
              return null
            }
          }
        }, null)
      };
      return cat__7575.call(null, concat.call(null, x, y), zs)
    };
    var G__7576 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7576__delegate.call(this, x, y, zs)
    };
    G__7576.cljs$lang$maxFixedArity = 2;
    G__7576.cljs$lang$applyTo = function(arglist__7577) {
      var x = cljs.core.first(arglist__7577);
      var y = cljs.core.first(cljs.core.next(arglist__7577));
      var zs = cljs.core.rest(cljs.core.next(arglist__7577));
      return G__7576__delegate(x, y, zs)
    };
    G__7576.cljs$lang$arity$variadic = G__7576__delegate;
    return G__7576
  }();
  concat = function(x, y, var_args) {
    var zs = var_args;
    switch(arguments.length) {
      case 0:
        return concat__0.call(this);
      case 1:
        return concat__1.call(this, x);
      case 2:
        return concat__2.call(this, x, y);
      default:
        return concat__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  concat.cljs$lang$maxFixedArity = 2;
  concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
  concat.cljs$lang$arity$0 = concat__0;
  concat.cljs$lang$arity$1 = concat__1;
  concat.cljs$lang$arity$2 = concat__2;
  concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
  return concat
}();
cljs.core.list_STAR_ = function() {
  var list_STAR_ = null;
  var list_STAR___1 = function(args) {
    return cljs.core.seq.call(null, args)
  };
  var list_STAR___2 = function(a, args) {
    return cljs.core.cons.call(null, a, args)
  };
  var list_STAR___3 = function(a, b, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, args))
  };
  var list_STAR___4 = function(a, b, c, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, args)))
  };
  var list_STAR___5 = function() {
    var G__7578__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__7578 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7578__delegate.call(this, a, b, c, d, more)
    };
    G__7578.cljs$lang$maxFixedArity = 4;
    G__7578.cljs$lang$applyTo = function(arglist__7579) {
      var a = cljs.core.first(arglist__7579);
      var b = cljs.core.first(cljs.core.next(arglist__7579));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7579)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7579))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7579))));
      return G__7578__delegate(a, b, c, d, more)
    };
    G__7578.cljs$lang$arity$variadic = G__7578__delegate;
    return G__7578
  }();
  list_STAR_ = function(a, b, c, d, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return list_STAR___1.call(this, a);
      case 2:
        return list_STAR___2.call(this, a, b);
      case 3:
        return list_STAR___3.call(this, a, b, c);
      case 4:
        return list_STAR___4.call(this, a, b, c, d);
      default:
        return list_STAR___5.cljs$lang$arity$variadic(a, b, c, d, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  list_STAR_.cljs$lang$maxFixedArity = 4;
  list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
  list_STAR_.cljs$lang$arity$1 = list_STAR___1;
  list_STAR_.cljs$lang$arity$2 = list_STAR___2;
  list_STAR_.cljs$lang$arity$3 = list_STAR___3;
  list_STAR_.cljs$lang$arity$4 = list_STAR___4;
  list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
  return list_STAR_
}();
cljs.core.transient$ = function transient$(coll) {
  return cljs.core._as_transient.call(null, coll)
};
cljs.core.persistent_BANG_ = function persistent_BANG_(tcoll) {
  return cljs.core._persistent_BANG_.call(null, tcoll)
};
cljs.core.conj_BANG_ = function conj_BANG_(tcoll, val) {
  return cljs.core._conj_BANG_.call(null, tcoll, val)
};
cljs.core.assoc_BANG_ = function assoc_BANG_(tcoll, key, val) {
  return cljs.core._assoc_BANG_.call(null, tcoll, key, val)
};
cljs.core.dissoc_BANG_ = function dissoc_BANG_(tcoll, key) {
  return cljs.core._dissoc_BANG_.call(null, tcoll, key)
};
cljs.core.pop_BANG_ = function pop_BANG_(tcoll) {
  return cljs.core._pop_BANG_.call(null, tcoll)
};
cljs.core.disj_BANG_ = function disj_BANG_(tcoll, val) {
  return cljs.core._disjoin_BANG_.call(null, tcoll, val)
};
cljs.core.apply_to = function apply_to(f, argc, args) {
  var args__7621 = cljs.core.seq.call(null, args);
  if(argc === 0) {
    return f.call(null)
  }else {
    var a__7622 = cljs.core._first.call(null, args__7621);
    var args__7623 = cljs.core._rest.call(null, args__7621);
    if(argc === 1) {
      if(f.cljs$lang$arity$1) {
        return f.cljs$lang$arity$1(a__7622)
      }else {
        return f.call(null, a__7622)
      }
    }else {
      var b__7624 = cljs.core._first.call(null, args__7623);
      var args__7625 = cljs.core._rest.call(null, args__7623);
      if(argc === 2) {
        if(f.cljs$lang$arity$2) {
          return f.cljs$lang$arity$2(a__7622, b__7624)
        }else {
          return f.call(null, a__7622, b__7624)
        }
      }else {
        var c__7626 = cljs.core._first.call(null, args__7625);
        var args__7627 = cljs.core._rest.call(null, args__7625);
        if(argc === 3) {
          if(f.cljs$lang$arity$3) {
            return f.cljs$lang$arity$3(a__7622, b__7624, c__7626)
          }else {
            return f.call(null, a__7622, b__7624, c__7626)
          }
        }else {
          var d__7628 = cljs.core._first.call(null, args__7627);
          var args__7629 = cljs.core._rest.call(null, args__7627);
          if(argc === 4) {
            if(f.cljs$lang$arity$4) {
              return f.cljs$lang$arity$4(a__7622, b__7624, c__7626, d__7628)
            }else {
              return f.call(null, a__7622, b__7624, c__7626, d__7628)
            }
          }else {
            var e__7630 = cljs.core._first.call(null, args__7629);
            var args__7631 = cljs.core._rest.call(null, args__7629);
            if(argc === 5) {
              if(f.cljs$lang$arity$5) {
                return f.cljs$lang$arity$5(a__7622, b__7624, c__7626, d__7628, e__7630)
              }else {
                return f.call(null, a__7622, b__7624, c__7626, d__7628, e__7630)
              }
            }else {
              var f__7632 = cljs.core._first.call(null, args__7631);
              var args__7633 = cljs.core._rest.call(null, args__7631);
              if(argc === 6) {
                if(f__7632.cljs$lang$arity$6) {
                  return f__7632.cljs$lang$arity$6(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632)
                }else {
                  return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632)
                }
              }else {
                var g__7634 = cljs.core._first.call(null, args__7633);
                var args__7635 = cljs.core._rest.call(null, args__7633);
                if(argc === 7) {
                  if(f__7632.cljs$lang$arity$7) {
                    return f__7632.cljs$lang$arity$7(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634)
                  }else {
                    return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634)
                  }
                }else {
                  var h__7636 = cljs.core._first.call(null, args__7635);
                  var args__7637 = cljs.core._rest.call(null, args__7635);
                  if(argc === 8) {
                    if(f__7632.cljs$lang$arity$8) {
                      return f__7632.cljs$lang$arity$8(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636)
                    }else {
                      return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636)
                    }
                  }else {
                    var i__7638 = cljs.core._first.call(null, args__7637);
                    var args__7639 = cljs.core._rest.call(null, args__7637);
                    if(argc === 9) {
                      if(f__7632.cljs$lang$arity$9) {
                        return f__7632.cljs$lang$arity$9(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638)
                      }else {
                        return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638)
                      }
                    }else {
                      var j__7640 = cljs.core._first.call(null, args__7639);
                      var args__7641 = cljs.core._rest.call(null, args__7639);
                      if(argc === 10) {
                        if(f__7632.cljs$lang$arity$10) {
                          return f__7632.cljs$lang$arity$10(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640)
                        }else {
                          return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640)
                        }
                      }else {
                        var k__7642 = cljs.core._first.call(null, args__7641);
                        var args__7643 = cljs.core._rest.call(null, args__7641);
                        if(argc === 11) {
                          if(f__7632.cljs$lang$arity$11) {
                            return f__7632.cljs$lang$arity$11(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642)
                          }else {
                            return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642)
                          }
                        }else {
                          var l__7644 = cljs.core._first.call(null, args__7643);
                          var args__7645 = cljs.core._rest.call(null, args__7643);
                          if(argc === 12) {
                            if(f__7632.cljs$lang$arity$12) {
                              return f__7632.cljs$lang$arity$12(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644)
                            }else {
                              return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644)
                            }
                          }else {
                            var m__7646 = cljs.core._first.call(null, args__7645);
                            var args__7647 = cljs.core._rest.call(null, args__7645);
                            if(argc === 13) {
                              if(f__7632.cljs$lang$arity$13) {
                                return f__7632.cljs$lang$arity$13(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646)
                              }else {
                                return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646)
                              }
                            }else {
                              var n__7648 = cljs.core._first.call(null, args__7647);
                              var args__7649 = cljs.core._rest.call(null, args__7647);
                              if(argc === 14) {
                                if(f__7632.cljs$lang$arity$14) {
                                  return f__7632.cljs$lang$arity$14(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648)
                                }else {
                                  return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648)
                                }
                              }else {
                                var o__7650 = cljs.core._first.call(null, args__7649);
                                var args__7651 = cljs.core._rest.call(null, args__7649);
                                if(argc === 15) {
                                  if(f__7632.cljs$lang$arity$15) {
                                    return f__7632.cljs$lang$arity$15(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650)
                                  }else {
                                    return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650)
                                  }
                                }else {
                                  var p__7652 = cljs.core._first.call(null, args__7651);
                                  var args__7653 = cljs.core._rest.call(null, args__7651);
                                  if(argc === 16) {
                                    if(f__7632.cljs$lang$arity$16) {
                                      return f__7632.cljs$lang$arity$16(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652)
                                    }else {
                                      return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652)
                                    }
                                  }else {
                                    var q__7654 = cljs.core._first.call(null, args__7653);
                                    var args__7655 = cljs.core._rest.call(null, args__7653);
                                    if(argc === 17) {
                                      if(f__7632.cljs$lang$arity$17) {
                                        return f__7632.cljs$lang$arity$17(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654)
                                      }else {
                                        return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654)
                                      }
                                    }else {
                                      var r__7656 = cljs.core._first.call(null, args__7655);
                                      var args__7657 = cljs.core._rest.call(null, args__7655);
                                      if(argc === 18) {
                                        if(f__7632.cljs$lang$arity$18) {
                                          return f__7632.cljs$lang$arity$18(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656)
                                        }else {
                                          return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656)
                                        }
                                      }else {
                                        var s__7658 = cljs.core._first.call(null, args__7657);
                                        var args__7659 = cljs.core._rest.call(null, args__7657);
                                        if(argc === 19) {
                                          if(f__7632.cljs$lang$arity$19) {
                                            return f__7632.cljs$lang$arity$19(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656, s__7658)
                                          }else {
                                            return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656, s__7658)
                                          }
                                        }else {
                                          var t__7660 = cljs.core._first.call(null, args__7659);
                                          var args__7661 = cljs.core._rest.call(null, args__7659);
                                          if(argc === 20) {
                                            if(f__7632.cljs$lang$arity$20) {
                                              return f__7632.cljs$lang$arity$20(a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656, s__7658, t__7660)
                                            }else {
                                              return f__7632.call(null, a__7622, b__7624, c__7626, d__7628, e__7630, f__7632, g__7634, h__7636, i__7638, j__7640, k__7642, l__7644, m__7646, n__7648, o__7650, p__7652, q__7654, r__7656, s__7658, t__7660)
                                            }
                                          }else {
                                            throw new Error("Only up to 20 arguments supported on functions");
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
cljs.core.apply = function() {
  var apply = null;
  var apply__2 = function(f, args) {
    var fixed_arity__7676 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7677 = cljs.core.bounded_count.call(null, args, fixed_arity__7676 + 1);
      if(bc__7677 <= fixed_arity__7676) {
        return cljs.core.apply_to.call(null, f, bc__7677, args)
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3 = function(f, x, args) {
    var arglist__7678 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__7679 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7680 = cljs.core.bounded_count.call(null, arglist__7678, fixed_arity__7679 + 1);
      if(bc__7680 <= fixed_arity__7679) {
        return cljs.core.apply_to.call(null, f, bc__7680, arglist__7678)
      }else {
        return f.cljs$lang$applyTo(arglist__7678)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7678))
    }
  };
  var apply__4 = function(f, x, y, args) {
    var arglist__7681 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__7682 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7683 = cljs.core.bounded_count.call(null, arglist__7681, fixed_arity__7682 + 1);
      if(bc__7683 <= fixed_arity__7682) {
        return cljs.core.apply_to.call(null, f, bc__7683, arglist__7681)
      }else {
        return f.cljs$lang$applyTo(arglist__7681)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7681))
    }
  };
  var apply__5 = function(f, x, y, z, args) {
    var arglist__7684 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__7685 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      var bc__7686 = cljs.core.bounded_count.call(null, arglist__7684, fixed_arity__7685 + 1);
      if(bc__7686 <= fixed_arity__7685) {
        return cljs.core.apply_to.call(null, f, bc__7686, arglist__7684)
      }else {
        return f.cljs$lang$applyTo(arglist__7684)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__7684))
    }
  };
  var apply__6 = function() {
    var G__7690__delegate = function(f, a, b, c, d, args) {
      var arglist__7687 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__7688 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        var bc__7689 = cljs.core.bounded_count.call(null, arglist__7687, fixed_arity__7688 + 1);
        if(bc__7689 <= fixed_arity__7688) {
          return cljs.core.apply_to.call(null, f, bc__7689, arglist__7687)
        }else {
          return f.cljs$lang$applyTo(arglist__7687)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__7687))
      }
    };
    var G__7690 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__7690__delegate.call(this, f, a, b, c, d, args)
    };
    G__7690.cljs$lang$maxFixedArity = 5;
    G__7690.cljs$lang$applyTo = function(arglist__7691) {
      var f = cljs.core.first(arglist__7691);
      var a = cljs.core.first(cljs.core.next(arglist__7691));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7691)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7691))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7691)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7691)))));
      return G__7690__delegate(f, a, b, c, d, args)
    };
    G__7690.cljs$lang$arity$variadic = G__7690__delegate;
    return G__7690
  }();
  apply = function(f, a, b, c, d, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 2:
        return apply__2.call(this, f, a);
      case 3:
        return apply__3.call(this, f, a, b);
      case 4:
        return apply__4.call(this, f, a, b, c);
      case 5:
        return apply__5.call(this, f, a, b, c, d);
      default:
        return apply__6.cljs$lang$arity$variadic(f, a, b, c, d, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  apply.cljs$lang$maxFixedArity = 5;
  apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
  apply.cljs$lang$arity$2 = apply__2;
  apply.cljs$lang$arity$3 = apply__3;
  apply.cljs$lang$arity$4 = apply__4;
  apply.cljs$lang$arity$5 = apply__5;
  apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
  return apply
}();
cljs.core.vary_meta = function() {
  var vary_meta__delegate = function(obj, f, args) {
    return cljs.core.with_meta.call(null, obj, cljs.core.apply.call(null, f, cljs.core.meta.call(null, obj), args))
  };
  var vary_meta = function(obj, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return vary_meta__delegate.call(this, obj, f, args)
  };
  vary_meta.cljs$lang$maxFixedArity = 2;
  vary_meta.cljs$lang$applyTo = function(arglist__7692) {
    var obj = cljs.core.first(arglist__7692);
    var f = cljs.core.first(cljs.core.next(arglist__7692));
    var args = cljs.core.rest(cljs.core.next(arglist__7692));
    return vary_meta__delegate(obj, f, args)
  };
  vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
  return vary_meta
}();
cljs.core.not_EQ_ = function() {
  var not_EQ_ = null;
  var not_EQ___1 = function(x) {
    return false
  };
  var not_EQ___2 = function(x, y) {
    return!cljs.core._EQ_.call(null, x, y)
  };
  var not_EQ___3 = function() {
    var G__7693__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__7693 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__7693__delegate.call(this, x, y, more)
    };
    G__7693.cljs$lang$maxFixedArity = 2;
    G__7693.cljs$lang$applyTo = function(arglist__7694) {
      var x = cljs.core.first(arglist__7694);
      var y = cljs.core.first(cljs.core.next(arglist__7694));
      var more = cljs.core.rest(cljs.core.next(arglist__7694));
      return G__7693__delegate(x, y, more)
    };
    G__7693.cljs$lang$arity$variadic = G__7693__delegate;
    return G__7693
  }();
  not_EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return not_EQ___1.call(this, x);
      case 2:
        return not_EQ___2.call(this, x, y);
      default:
        return not_EQ___3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  not_EQ_.cljs$lang$maxFixedArity = 2;
  not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
  not_EQ_.cljs$lang$arity$1 = not_EQ___1;
  not_EQ_.cljs$lang$arity$2 = not_EQ___2;
  not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
  return not_EQ_
}();
cljs.core.not_empty = function not_empty(coll) {
  if(cljs.core.seq.call(null, coll)) {
    return coll
  }else {
    return null
  }
};
cljs.core.every_QMARK_ = function every_QMARK_(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll) == null) {
      return true
    }else {
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, coll)))) {
        var G__7695 = pred;
        var G__7696 = cljs.core.next.call(null, coll);
        pred = G__7695;
        coll = G__7696;
        continue
      }else {
        if("\ufdd0'else") {
          return false
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.not_every_QMARK_ = function not_every_QMARK_(pred, coll) {
  return!cljs.core.every_QMARK_.call(null, pred, coll)
};
cljs.core.some = function some(pred, coll) {
  while(true) {
    if(cljs.core.seq.call(null, coll)) {
      var or__3824__auto____7698 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3824__auto____7698)) {
        return or__3824__auto____7698
      }else {
        var G__7699 = pred;
        var G__7700 = cljs.core.next.call(null, coll);
        pred = G__7699;
        coll = G__7700;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.not_any_QMARK_ = function not_any_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.some.call(null, pred, coll))
};
cljs.core.even_QMARK_ = function even_QMARK_(n) {
  if(cljs.core.integer_QMARK_.call(null, n)) {
    return(n & 1) === 0
  }else {
    throw new Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(n)].join(""));
  }
};
cljs.core.odd_QMARK_ = function odd_QMARK_(n) {
  return!cljs.core.even_QMARK_.call(null, n)
};
cljs.core.identity = function identity(x) {
  return x
};
cljs.core.complement = function complement(f) {
  return function() {
    var G__7701 = null;
    var G__7701__0 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__7701__1 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__7701__2 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__7701__3 = function() {
      var G__7702__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__7702 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__7702__delegate.call(this, x, y, zs)
      };
      G__7702.cljs$lang$maxFixedArity = 2;
      G__7702.cljs$lang$applyTo = function(arglist__7703) {
        var x = cljs.core.first(arglist__7703);
        var y = cljs.core.first(cljs.core.next(arglist__7703));
        var zs = cljs.core.rest(cljs.core.next(arglist__7703));
        return G__7702__delegate(x, y, zs)
      };
      G__7702.cljs$lang$arity$variadic = G__7702__delegate;
      return G__7702
    }();
    G__7701 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__7701__0.call(this);
        case 1:
          return G__7701__1.call(this, x);
        case 2:
          return G__7701__2.call(this, x, y);
        default:
          return G__7701__3.cljs$lang$arity$variadic(x, y, cljs.core.array_seq(arguments, 2))
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__7701.cljs$lang$maxFixedArity = 2;
    G__7701.cljs$lang$applyTo = G__7701__3.cljs$lang$applyTo;
    return G__7701
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__7704__delegate = function(args) {
      return x
    };
    var G__7704 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__7704__delegate.call(this, args)
    };
    G__7704.cljs$lang$maxFixedArity = 0;
    G__7704.cljs$lang$applyTo = function(arglist__7705) {
      var args = cljs.core.seq(arglist__7705);
      return G__7704__delegate(args)
    };
    G__7704.cljs$lang$arity$variadic = G__7704__delegate;
    return G__7704
  }()
};
cljs.core.comp = function() {
  var comp = null;
  var comp__0 = function() {
    return cljs.core.identity
  };
  var comp__1 = function(f) {
    return f
  };
  var comp__2 = function(f, g) {
    return function() {
      var G__7712 = null;
      var G__7712__0 = function() {
        return f.call(null, g.call(null))
      };
      var G__7712__1 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__7712__2 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__7712__3 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__7712__4 = function() {
        var G__7713__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__7713 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7713__delegate.call(this, x, y, z, args)
        };
        G__7713.cljs$lang$maxFixedArity = 3;
        G__7713.cljs$lang$applyTo = function(arglist__7714) {
          var x = cljs.core.first(arglist__7714);
          var y = cljs.core.first(cljs.core.next(arglist__7714));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7714)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7714)));
          return G__7713__delegate(x, y, z, args)
        };
        G__7713.cljs$lang$arity$variadic = G__7713__delegate;
        return G__7713
      }();
      G__7712 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7712__0.call(this);
          case 1:
            return G__7712__1.call(this, x);
          case 2:
            return G__7712__2.call(this, x, y);
          case 3:
            return G__7712__3.call(this, x, y, z);
          default:
            return G__7712__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7712.cljs$lang$maxFixedArity = 3;
      G__7712.cljs$lang$applyTo = G__7712__4.cljs$lang$applyTo;
      return G__7712
    }()
  };
  var comp__3 = function(f, g, h) {
    return function() {
      var G__7715 = null;
      var G__7715__0 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__7715__1 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__7715__2 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__7715__3 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__7715__4 = function() {
        var G__7716__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__7716 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7716__delegate.call(this, x, y, z, args)
        };
        G__7716.cljs$lang$maxFixedArity = 3;
        G__7716.cljs$lang$applyTo = function(arglist__7717) {
          var x = cljs.core.first(arglist__7717);
          var y = cljs.core.first(cljs.core.next(arglist__7717));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7717)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7717)));
          return G__7716__delegate(x, y, z, args)
        };
        G__7716.cljs$lang$arity$variadic = G__7716__delegate;
        return G__7716
      }();
      G__7715 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__7715__0.call(this);
          case 1:
            return G__7715__1.call(this, x);
          case 2:
            return G__7715__2.call(this, x, y);
          case 3:
            return G__7715__3.call(this, x, y, z);
          default:
            return G__7715__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7715.cljs$lang$maxFixedArity = 3;
      G__7715.cljs$lang$applyTo = G__7715__4.cljs$lang$applyTo;
      return G__7715
    }()
  };
  var comp__4 = function() {
    var G__7718__delegate = function(f1, f2, f3, fs) {
      var fs__7709 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__7719__delegate = function(args) {
          var ret__7710 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__7709), args);
          var fs__7711 = cljs.core.next.call(null, fs__7709);
          while(true) {
            if(fs__7711) {
              var G__7720 = cljs.core.first.call(null, fs__7711).call(null, ret__7710);
              var G__7721 = cljs.core.next.call(null, fs__7711);
              ret__7710 = G__7720;
              fs__7711 = G__7721;
              continue
            }else {
              return ret__7710
            }
            break
          }
        };
        var G__7719 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7719__delegate.call(this, args)
        };
        G__7719.cljs$lang$maxFixedArity = 0;
        G__7719.cljs$lang$applyTo = function(arglist__7722) {
          var args = cljs.core.seq(arglist__7722);
          return G__7719__delegate(args)
        };
        G__7719.cljs$lang$arity$variadic = G__7719__delegate;
        return G__7719
      }()
    };
    var G__7718 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__7718__delegate.call(this, f1, f2, f3, fs)
    };
    G__7718.cljs$lang$maxFixedArity = 3;
    G__7718.cljs$lang$applyTo = function(arglist__7723) {
      var f1 = cljs.core.first(arglist__7723);
      var f2 = cljs.core.first(cljs.core.next(arglist__7723));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7723)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7723)));
      return G__7718__delegate(f1, f2, f3, fs)
    };
    G__7718.cljs$lang$arity$variadic = G__7718__delegate;
    return G__7718
  }();
  comp = function(f1, f2, f3, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 0:
        return comp__0.call(this);
      case 1:
        return comp__1.call(this, f1);
      case 2:
        return comp__2.call(this, f1, f2);
      case 3:
        return comp__3.call(this, f1, f2, f3);
      default:
        return comp__4.cljs$lang$arity$variadic(f1, f2, f3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  comp.cljs$lang$maxFixedArity = 3;
  comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
  comp.cljs$lang$arity$0 = comp__0;
  comp.cljs$lang$arity$1 = comp__1;
  comp.cljs$lang$arity$2 = comp__2;
  comp.cljs$lang$arity$3 = comp__3;
  comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
  return comp
}();
cljs.core.partial = function() {
  var partial = null;
  var partial__2 = function(f, arg1) {
    return function() {
      var G__7724__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__7724 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7724__delegate.call(this, args)
      };
      G__7724.cljs$lang$maxFixedArity = 0;
      G__7724.cljs$lang$applyTo = function(arglist__7725) {
        var args = cljs.core.seq(arglist__7725);
        return G__7724__delegate(args)
      };
      G__7724.cljs$lang$arity$variadic = G__7724__delegate;
      return G__7724
    }()
  };
  var partial__3 = function(f, arg1, arg2) {
    return function() {
      var G__7726__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__7726 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7726__delegate.call(this, args)
      };
      G__7726.cljs$lang$maxFixedArity = 0;
      G__7726.cljs$lang$applyTo = function(arglist__7727) {
        var args = cljs.core.seq(arglist__7727);
        return G__7726__delegate(args)
      };
      G__7726.cljs$lang$arity$variadic = G__7726__delegate;
      return G__7726
    }()
  };
  var partial__4 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__7728__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__7728 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__7728__delegate.call(this, args)
      };
      G__7728.cljs$lang$maxFixedArity = 0;
      G__7728.cljs$lang$applyTo = function(arglist__7729) {
        var args = cljs.core.seq(arglist__7729);
        return G__7728__delegate(args)
      };
      G__7728.cljs$lang$arity$variadic = G__7728__delegate;
      return G__7728
    }()
  };
  var partial__5 = function() {
    var G__7730__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__7731__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__7731 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__7731__delegate.call(this, args)
        };
        G__7731.cljs$lang$maxFixedArity = 0;
        G__7731.cljs$lang$applyTo = function(arglist__7732) {
          var args = cljs.core.seq(arglist__7732);
          return G__7731__delegate(args)
        };
        G__7731.cljs$lang$arity$variadic = G__7731__delegate;
        return G__7731
      }()
    };
    var G__7730 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__7730__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__7730.cljs$lang$maxFixedArity = 4;
    G__7730.cljs$lang$applyTo = function(arglist__7733) {
      var f = cljs.core.first(arglist__7733);
      var arg1 = cljs.core.first(cljs.core.next(arglist__7733));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7733)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7733))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7733))));
      return G__7730__delegate(f, arg1, arg2, arg3, more)
    };
    G__7730.cljs$lang$arity$variadic = G__7730__delegate;
    return G__7730
  }();
  partial = function(f, arg1, arg2, arg3, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return partial__2.call(this, f, arg1);
      case 3:
        return partial__3.call(this, f, arg1, arg2);
      case 4:
        return partial__4.call(this, f, arg1, arg2, arg3);
      default:
        return partial__5.cljs$lang$arity$variadic(f, arg1, arg2, arg3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  partial.cljs$lang$maxFixedArity = 4;
  partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
  partial.cljs$lang$arity$2 = partial__2;
  partial.cljs$lang$arity$3 = partial__3;
  partial.cljs$lang$arity$4 = partial__4;
  partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
  return partial
}();
cljs.core.fnil = function() {
  var fnil = null;
  var fnil__2 = function(f, x) {
    return function() {
      var G__7734 = null;
      var G__7734__1 = function(a) {
        return f.call(null, a == null ? x : a)
      };
      var G__7734__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b)
      };
      var G__7734__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b, c)
      };
      var G__7734__4 = function() {
        var G__7735__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b, c, ds)
        };
        var G__7735 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7735__delegate.call(this, a, b, c, ds)
        };
        G__7735.cljs$lang$maxFixedArity = 3;
        G__7735.cljs$lang$applyTo = function(arglist__7736) {
          var a = cljs.core.first(arglist__7736);
          var b = cljs.core.first(cljs.core.next(arglist__7736));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7736)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7736)));
          return G__7735__delegate(a, b, c, ds)
        };
        G__7735.cljs$lang$arity$variadic = G__7735__delegate;
        return G__7735
      }();
      G__7734 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__7734__1.call(this, a);
          case 2:
            return G__7734__2.call(this, a, b);
          case 3:
            return G__7734__3.call(this, a, b, c);
          default:
            return G__7734__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7734.cljs$lang$maxFixedArity = 3;
      G__7734.cljs$lang$applyTo = G__7734__4.cljs$lang$applyTo;
      return G__7734
    }()
  };
  var fnil__3 = function(f, x, y) {
    return function() {
      var G__7737 = null;
      var G__7737__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7737__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c)
      };
      var G__7737__4 = function() {
        var G__7738__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c, ds)
        };
        var G__7738 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7738__delegate.call(this, a, b, c, ds)
        };
        G__7738.cljs$lang$maxFixedArity = 3;
        G__7738.cljs$lang$applyTo = function(arglist__7739) {
          var a = cljs.core.first(arglist__7739);
          var b = cljs.core.first(cljs.core.next(arglist__7739));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7739)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7739)));
          return G__7738__delegate(a, b, c, ds)
        };
        G__7738.cljs$lang$arity$variadic = G__7738__delegate;
        return G__7738
      }();
      G__7737 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7737__2.call(this, a, b);
          case 3:
            return G__7737__3.call(this, a, b, c);
          default:
            return G__7737__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7737.cljs$lang$maxFixedArity = 3;
      G__7737.cljs$lang$applyTo = G__7737__4.cljs$lang$applyTo;
      return G__7737
    }()
  };
  var fnil__4 = function(f, x, y, z) {
    return function() {
      var G__7740 = null;
      var G__7740__2 = function(a, b) {
        return f.call(null, a == null ? x : a, b == null ? y : b)
      };
      var G__7740__3 = function(a, b, c) {
        return f.call(null, a == null ? x : a, b == null ? y : b, c == null ? z : c)
      };
      var G__7740__4 = function() {
        var G__7741__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, a == null ? x : a, b == null ? y : b, c == null ? z : c, ds)
        };
        var G__7741 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7741__delegate.call(this, a, b, c, ds)
        };
        G__7741.cljs$lang$maxFixedArity = 3;
        G__7741.cljs$lang$applyTo = function(arglist__7742) {
          var a = cljs.core.first(arglist__7742);
          var b = cljs.core.first(cljs.core.next(arglist__7742));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7742)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7742)));
          return G__7741__delegate(a, b, c, ds)
        };
        G__7741.cljs$lang$arity$variadic = G__7741__delegate;
        return G__7741
      }();
      G__7740 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__7740__2.call(this, a, b);
          case 3:
            return G__7740__3.call(this, a, b, c);
          default:
            return G__7740__4.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__7740.cljs$lang$maxFixedArity = 3;
      G__7740.cljs$lang$applyTo = G__7740__4.cljs$lang$applyTo;
      return G__7740
    }()
  };
  fnil = function(f, x, y, z) {
    switch(arguments.length) {
      case 2:
        return fnil__2.call(this, f, x);
      case 3:
        return fnil__3.call(this, f, x, y);
      case 4:
        return fnil__4.call(this, f, x, y, z)
    }
    throw"Invalid arity: " + arguments.length;
  };
  fnil.cljs$lang$arity$2 = fnil__2;
  fnil.cljs$lang$arity$3 = fnil__3;
  fnil.cljs$lang$arity$4 = fnil__4;
  return fnil
}();
cljs.core.map_indexed = function map_indexed(f, coll) {
  var mapi__7758 = function mapi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7766 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7766) {
        var s__7767 = temp__3974__auto____7766;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7767)) {
          var c__7768 = cljs.core.chunk_first.call(null, s__7767);
          var size__7769 = cljs.core.count.call(null, c__7768);
          var b__7770 = cljs.core.chunk_buffer.call(null, size__7769);
          var n__2527__auto____7771 = size__7769;
          var i__7772 = 0;
          while(true) {
            if(i__7772 < n__2527__auto____7771) {
              cljs.core.chunk_append.call(null, b__7770, f.call(null, idx + i__7772, cljs.core._nth.call(null, c__7768, i__7772)));
              var G__7773 = i__7772 + 1;
              i__7772 = G__7773;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7770), mapi.call(null, idx + size__7769, cljs.core.chunk_rest.call(null, s__7767)))
        }else {
          return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__7767)), mapi.call(null, idx + 1, cljs.core.rest.call(null, s__7767)))
        }
      }else {
        return null
      }
    }, null)
  };
  return mapi__7758.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____7783 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____7783) {
      var s__7784 = temp__3974__auto____7783;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__7784)) {
        var c__7785 = cljs.core.chunk_first.call(null, s__7784);
        var size__7786 = cljs.core.count.call(null, c__7785);
        var b__7787 = cljs.core.chunk_buffer.call(null, size__7786);
        var n__2527__auto____7788 = size__7786;
        var i__7789 = 0;
        while(true) {
          if(i__7789 < n__2527__auto____7788) {
            var x__7790 = f.call(null, cljs.core._nth.call(null, c__7785, i__7789));
            if(x__7790 == null) {
            }else {
              cljs.core.chunk_append.call(null, b__7787, x__7790)
            }
            var G__7792 = i__7789 + 1;
            i__7789 = G__7792;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7787), keep.call(null, f, cljs.core.chunk_rest.call(null, s__7784)))
      }else {
        var x__7791 = f.call(null, cljs.core.first.call(null, s__7784));
        if(x__7791 == null) {
          return keep.call(null, f, cljs.core.rest.call(null, s__7784))
        }else {
          return cljs.core.cons.call(null, x__7791, keep.call(null, f, cljs.core.rest.call(null, s__7784)))
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__7818 = function keepi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____7828 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____7828) {
        var s__7829 = temp__3974__auto____7828;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__7829)) {
          var c__7830 = cljs.core.chunk_first.call(null, s__7829);
          var size__7831 = cljs.core.count.call(null, c__7830);
          var b__7832 = cljs.core.chunk_buffer.call(null, size__7831);
          var n__2527__auto____7833 = size__7831;
          var i__7834 = 0;
          while(true) {
            if(i__7834 < n__2527__auto____7833) {
              var x__7835 = f.call(null, idx + i__7834, cljs.core._nth.call(null, c__7830, i__7834));
              if(x__7835 == null) {
              }else {
                cljs.core.chunk_append.call(null, b__7832, x__7835)
              }
              var G__7837 = i__7834 + 1;
              i__7834 = G__7837;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__7832), keepi.call(null, idx + size__7831, cljs.core.chunk_rest.call(null, s__7829)))
        }else {
          var x__7836 = f.call(null, idx, cljs.core.first.call(null, s__7829));
          if(x__7836 == null) {
            return keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7829))
          }else {
            return cljs.core.cons.call(null, x__7836, keepi.call(null, idx + 1, cljs.core.rest.call(null, s__7829)))
          }
        }
      }else {
        return null
      }
    }, null)
  };
  return keepi__7818.call(null, 0, coll)
};
cljs.core.every_pred = function() {
  var every_pred = null;
  var every_pred__1 = function(p) {
    return function() {
      var ep1 = null;
      var ep1__0 = function() {
        return true
      };
      var ep1__1 = function(x) {
        return cljs.core.boolean$.call(null, p.call(null, x))
      };
      var ep1__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7923 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7923)) {
            return p.call(null, y)
          }else {
            return and__3822__auto____7923
          }
        }())
      };
      var ep1__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7924 = p.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7924)) {
            var and__3822__auto____7925 = p.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7925)) {
              return p.call(null, z)
            }else {
              return and__3822__auto____7925
            }
          }else {
            return and__3822__auto____7924
          }
        }())
      };
      var ep1__4 = function() {
        var G__7994__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7926 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7926)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3822__auto____7926
            }
          }())
        };
        var G__7994 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7994__delegate.call(this, x, y, z, args)
        };
        G__7994.cljs$lang$maxFixedArity = 3;
        G__7994.cljs$lang$applyTo = function(arglist__7995) {
          var x = cljs.core.first(arglist__7995);
          var y = cljs.core.first(cljs.core.next(arglist__7995));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7995)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7995)));
          return G__7994__delegate(x, y, z, args)
        };
        G__7994.cljs$lang$arity$variadic = G__7994__delegate;
        return G__7994
      }();
      ep1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep1__0.call(this);
          case 1:
            return ep1__1.call(this, x);
          case 2:
            return ep1__2.call(this, x, y);
          case 3:
            return ep1__3.call(this, x, y, z);
          default:
            return ep1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep1.cljs$lang$maxFixedArity = 3;
      ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
      ep1.cljs$lang$arity$0 = ep1__0;
      ep1.cljs$lang$arity$1 = ep1__1;
      ep1.cljs$lang$arity$2 = ep1__2;
      ep1.cljs$lang$arity$3 = ep1__3;
      ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
      return ep1
    }()
  };
  var every_pred__2 = function(p1, p2) {
    return function() {
      var ep2 = null;
      var ep2__0 = function() {
        return true
      };
      var ep2__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7938 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7938)) {
            return p2.call(null, x)
          }else {
            return and__3822__auto____7938
          }
        }())
      };
      var ep2__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7939 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7939)) {
            var and__3822__auto____7940 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7940)) {
              var and__3822__auto____7941 = p2.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7941)) {
                return p2.call(null, y)
              }else {
                return and__3822__auto____7941
              }
            }else {
              return and__3822__auto____7940
            }
          }else {
            return and__3822__auto____7939
          }
        }())
      };
      var ep2__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7942 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7942)) {
            var and__3822__auto____7943 = p1.call(null, y);
            if(cljs.core.truth_(and__3822__auto____7943)) {
              var and__3822__auto____7944 = p1.call(null, z);
              if(cljs.core.truth_(and__3822__auto____7944)) {
                var and__3822__auto____7945 = p2.call(null, x);
                if(cljs.core.truth_(and__3822__auto____7945)) {
                  var and__3822__auto____7946 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7946)) {
                    return p2.call(null, z)
                  }else {
                    return and__3822__auto____7946
                  }
                }else {
                  return and__3822__auto____7945
                }
              }else {
                return and__3822__auto____7944
              }
            }else {
              return and__3822__auto____7943
            }
          }else {
            return and__3822__auto____7942
          }
        }())
      };
      var ep2__4 = function() {
        var G__7996__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7947 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7947)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7793_SHARP_) {
                var and__3822__auto____7948 = p1.call(null, p1__7793_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7948)) {
                  return p2.call(null, p1__7793_SHARP_)
                }else {
                  return and__3822__auto____7948
                }
              }, args)
            }else {
              return and__3822__auto____7947
            }
          }())
        };
        var G__7996 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7996__delegate.call(this, x, y, z, args)
        };
        G__7996.cljs$lang$maxFixedArity = 3;
        G__7996.cljs$lang$applyTo = function(arglist__7997) {
          var x = cljs.core.first(arglist__7997);
          var y = cljs.core.first(cljs.core.next(arglist__7997));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7997)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7997)));
          return G__7996__delegate(x, y, z, args)
        };
        G__7996.cljs$lang$arity$variadic = G__7996__delegate;
        return G__7996
      }();
      ep2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep2__0.call(this);
          case 1:
            return ep2__1.call(this, x);
          case 2:
            return ep2__2.call(this, x, y);
          case 3:
            return ep2__3.call(this, x, y, z);
          default:
            return ep2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep2.cljs$lang$maxFixedArity = 3;
      ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
      ep2.cljs$lang$arity$0 = ep2__0;
      ep2.cljs$lang$arity$1 = ep2__1;
      ep2.cljs$lang$arity$2 = ep2__2;
      ep2.cljs$lang$arity$3 = ep2__3;
      ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
      return ep2
    }()
  };
  var every_pred__3 = function(p1, p2, p3) {
    return function() {
      var ep3 = null;
      var ep3__0 = function() {
        return true
      };
      var ep3__1 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7967 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7967)) {
            var and__3822__auto____7968 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7968)) {
              return p3.call(null, x)
            }else {
              return and__3822__auto____7968
            }
          }else {
            return and__3822__auto____7967
          }
        }())
      };
      var ep3__2 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7969 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7969)) {
            var and__3822__auto____7970 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7970)) {
              var and__3822__auto____7971 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7971)) {
                var and__3822__auto____7972 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7972)) {
                  var and__3822__auto____7973 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7973)) {
                    return p3.call(null, y)
                  }else {
                    return and__3822__auto____7973
                  }
                }else {
                  return and__3822__auto____7972
                }
              }else {
                return and__3822__auto____7971
              }
            }else {
              return and__3822__auto____7970
            }
          }else {
            return and__3822__auto____7969
          }
        }())
      };
      var ep3__3 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3822__auto____7974 = p1.call(null, x);
          if(cljs.core.truth_(and__3822__auto____7974)) {
            var and__3822__auto____7975 = p2.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7975)) {
              var and__3822__auto____7976 = p3.call(null, x);
              if(cljs.core.truth_(and__3822__auto____7976)) {
                var and__3822__auto____7977 = p1.call(null, y);
                if(cljs.core.truth_(and__3822__auto____7977)) {
                  var and__3822__auto____7978 = p2.call(null, y);
                  if(cljs.core.truth_(and__3822__auto____7978)) {
                    var and__3822__auto____7979 = p3.call(null, y);
                    if(cljs.core.truth_(and__3822__auto____7979)) {
                      var and__3822__auto____7980 = p1.call(null, z);
                      if(cljs.core.truth_(and__3822__auto____7980)) {
                        var and__3822__auto____7981 = p2.call(null, z);
                        if(cljs.core.truth_(and__3822__auto____7981)) {
                          return p3.call(null, z)
                        }else {
                          return and__3822__auto____7981
                        }
                      }else {
                        return and__3822__auto____7980
                      }
                    }else {
                      return and__3822__auto____7979
                    }
                  }else {
                    return and__3822__auto____7978
                  }
                }else {
                  return and__3822__auto____7977
                }
              }else {
                return and__3822__auto____7976
              }
            }else {
              return and__3822__auto____7975
            }
          }else {
            return and__3822__auto____7974
          }
        }())
      };
      var ep3__4 = function() {
        var G__7998__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3822__auto____7982 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3822__auto____7982)) {
              return cljs.core.every_QMARK_.call(null, function(p1__7794_SHARP_) {
                var and__3822__auto____7983 = p1.call(null, p1__7794_SHARP_);
                if(cljs.core.truth_(and__3822__auto____7983)) {
                  var and__3822__auto____7984 = p2.call(null, p1__7794_SHARP_);
                  if(cljs.core.truth_(and__3822__auto____7984)) {
                    return p3.call(null, p1__7794_SHARP_)
                  }else {
                    return and__3822__auto____7984
                  }
                }else {
                  return and__3822__auto____7983
                }
              }, args)
            }else {
              return and__3822__auto____7982
            }
          }())
        };
        var G__7998 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__7998__delegate.call(this, x, y, z, args)
        };
        G__7998.cljs$lang$maxFixedArity = 3;
        G__7998.cljs$lang$applyTo = function(arglist__7999) {
          var x = cljs.core.first(arglist__7999);
          var y = cljs.core.first(cljs.core.next(arglist__7999));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7999)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7999)));
          return G__7998__delegate(x, y, z, args)
        };
        G__7998.cljs$lang$arity$variadic = G__7998__delegate;
        return G__7998
      }();
      ep3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep3__0.call(this);
          case 1:
            return ep3__1.call(this, x);
          case 2:
            return ep3__2.call(this, x, y);
          case 3:
            return ep3__3.call(this, x, y, z);
          default:
            return ep3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep3.cljs$lang$maxFixedArity = 3;
      ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
      ep3.cljs$lang$arity$0 = ep3__0;
      ep3.cljs$lang$arity$1 = ep3__1;
      ep3.cljs$lang$arity$2 = ep3__2;
      ep3.cljs$lang$arity$3 = ep3__3;
      ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
      return ep3
    }()
  };
  var every_pred__4 = function() {
    var G__8000__delegate = function(p1, p2, p3, ps) {
      var ps__7985 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__0 = function() {
          return true
        };
        var epn__1 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__7795_SHARP_) {
            return p1__7795_SHARP_.call(null, x)
          }, ps__7985)
        };
        var epn__2 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__7796_SHARP_) {
            var and__3822__auto____7990 = p1__7796_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7990)) {
              return p1__7796_SHARP_.call(null, y)
            }else {
              return and__3822__auto____7990
            }
          }, ps__7985)
        };
        var epn__3 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__7797_SHARP_) {
            var and__3822__auto____7991 = p1__7797_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3822__auto____7991)) {
              var and__3822__auto____7992 = p1__7797_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3822__auto____7992)) {
                return p1__7797_SHARP_.call(null, z)
              }else {
                return and__3822__auto____7992
              }
            }else {
              return and__3822__auto____7991
            }
          }, ps__7985)
        };
        var epn__4 = function() {
          var G__8001__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3822__auto____7993 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3822__auto____7993)) {
                return cljs.core.every_QMARK_.call(null, function(p1__7798_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__7798_SHARP_, args)
                }, ps__7985)
              }else {
                return and__3822__auto____7993
              }
            }())
          };
          var G__8001 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__8001__delegate.call(this, x, y, z, args)
          };
          G__8001.cljs$lang$maxFixedArity = 3;
          G__8001.cljs$lang$applyTo = function(arglist__8002) {
            var x = cljs.core.first(arglist__8002);
            var y = cljs.core.first(cljs.core.next(arglist__8002));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8002)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8002)));
            return G__8001__delegate(x, y, z, args)
          };
          G__8001.cljs$lang$arity$variadic = G__8001__delegate;
          return G__8001
        }();
        epn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return epn__0.call(this);
            case 1:
              return epn__1.call(this, x);
            case 2:
              return epn__2.call(this, x, y);
            case 3:
              return epn__3.call(this, x, y, z);
            default:
              return epn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        epn.cljs$lang$maxFixedArity = 3;
        epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
        epn.cljs$lang$arity$0 = epn__0;
        epn.cljs$lang$arity$1 = epn__1;
        epn.cljs$lang$arity$2 = epn__2;
        epn.cljs$lang$arity$3 = epn__3;
        epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
        return epn
      }()
    };
    var G__8000 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8000__delegate.call(this, p1, p2, p3, ps)
    };
    G__8000.cljs$lang$maxFixedArity = 3;
    G__8000.cljs$lang$applyTo = function(arglist__8003) {
      var p1 = cljs.core.first(arglist__8003);
      var p2 = cljs.core.first(cljs.core.next(arglist__8003));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8003)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8003)));
      return G__8000__delegate(p1, p2, p3, ps)
    };
    G__8000.cljs$lang$arity$variadic = G__8000__delegate;
    return G__8000
  }();
  every_pred = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return every_pred__1.call(this, p1);
      case 2:
        return every_pred__2.call(this, p1, p2);
      case 3:
        return every_pred__3.call(this, p1, p2, p3);
      default:
        return every_pred__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  every_pred.cljs$lang$maxFixedArity = 3;
  every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
  every_pred.cljs$lang$arity$1 = every_pred__1;
  every_pred.cljs$lang$arity$2 = every_pred__2;
  every_pred.cljs$lang$arity$3 = every_pred__3;
  every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
  return every_pred
}();
cljs.core.some_fn = function() {
  var some_fn = null;
  var some_fn__1 = function(p) {
    return function() {
      var sp1 = null;
      var sp1__0 = function() {
        return null
      };
      var sp1__1 = function(x) {
        return p.call(null, x)
      };
      var sp1__2 = function(x, y) {
        var or__3824__auto____8084 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8084)) {
          return or__3824__auto____8084
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3 = function(x, y, z) {
        var or__3824__auto____8085 = p.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8085)) {
          return or__3824__auto____8085
        }else {
          var or__3824__auto____8086 = p.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8086)) {
            return or__3824__auto____8086
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__4 = function() {
        var G__8155__delegate = function(x, y, z, args) {
          var or__3824__auto____8087 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8087)) {
            return or__3824__auto____8087
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__8155 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8155__delegate.call(this, x, y, z, args)
        };
        G__8155.cljs$lang$maxFixedArity = 3;
        G__8155.cljs$lang$applyTo = function(arglist__8156) {
          var x = cljs.core.first(arglist__8156);
          var y = cljs.core.first(cljs.core.next(arglist__8156));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8156)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8156)));
          return G__8155__delegate(x, y, z, args)
        };
        G__8155.cljs$lang$arity$variadic = G__8155__delegate;
        return G__8155
      }();
      sp1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp1__0.call(this);
          case 1:
            return sp1__1.call(this, x);
          case 2:
            return sp1__2.call(this, x, y);
          case 3:
            return sp1__3.call(this, x, y, z);
          default:
            return sp1__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp1.cljs$lang$maxFixedArity = 3;
      sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
      sp1.cljs$lang$arity$0 = sp1__0;
      sp1.cljs$lang$arity$1 = sp1__1;
      sp1.cljs$lang$arity$2 = sp1__2;
      sp1.cljs$lang$arity$3 = sp1__3;
      sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
      return sp1
    }()
  };
  var some_fn__2 = function(p1, p2) {
    return function() {
      var sp2 = null;
      var sp2__0 = function() {
        return null
      };
      var sp2__1 = function(x) {
        var or__3824__auto____8099 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8099)) {
          return or__3824__auto____8099
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__2 = function(x, y) {
        var or__3824__auto____8100 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8100)) {
          return or__3824__auto____8100
        }else {
          var or__3824__auto____8101 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8101)) {
            return or__3824__auto____8101
          }else {
            var or__3824__auto____8102 = p2.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8102)) {
              return or__3824__auto____8102
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3 = function(x, y, z) {
        var or__3824__auto____8103 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8103)) {
          return or__3824__auto____8103
        }else {
          var or__3824__auto____8104 = p1.call(null, y);
          if(cljs.core.truth_(or__3824__auto____8104)) {
            return or__3824__auto____8104
          }else {
            var or__3824__auto____8105 = p1.call(null, z);
            if(cljs.core.truth_(or__3824__auto____8105)) {
              return or__3824__auto____8105
            }else {
              var or__3824__auto____8106 = p2.call(null, x);
              if(cljs.core.truth_(or__3824__auto____8106)) {
                return or__3824__auto____8106
              }else {
                var or__3824__auto____8107 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8107)) {
                  return or__3824__auto____8107
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__4 = function() {
        var G__8157__delegate = function(x, y, z, args) {
          var or__3824__auto____8108 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8108)) {
            return or__3824__auto____8108
          }else {
            return cljs.core.some.call(null, function(p1__7838_SHARP_) {
              var or__3824__auto____8109 = p1.call(null, p1__7838_SHARP_);
              if(cljs.core.truth_(or__3824__auto____8109)) {
                return or__3824__auto____8109
              }else {
                return p2.call(null, p1__7838_SHARP_)
              }
            }, args)
          }
        };
        var G__8157 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8157__delegate.call(this, x, y, z, args)
        };
        G__8157.cljs$lang$maxFixedArity = 3;
        G__8157.cljs$lang$applyTo = function(arglist__8158) {
          var x = cljs.core.first(arglist__8158);
          var y = cljs.core.first(cljs.core.next(arglist__8158));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8158)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8158)));
          return G__8157__delegate(x, y, z, args)
        };
        G__8157.cljs$lang$arity$variadic = G__8157__delegate;
        return G__8157
      }();
      sp2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp2__0.call(this);
          case 1:
            return sp2__1.call(this, x);
          case 2:
            return sp2__2.call(this, x, y);
          case 3:
            return sp2__3.call(this, x, y, z);
          default:
            return sp2__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp2.cljs$lang$maxFixedArity = 3;
      sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
      sp2.cljs$lang$arity$0 = sp2__0;
      sp2.cljs$lang$arity$1 = sp2__1;
      sp2.cljs$lang$arity$2 = sp2__2;
      sp2.cljs$lang$arity$3 = sp2__3;
      sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
      return sp2
    }()
  };
  var some_fn__3 = function(p1, p2, p3) {
    return function() {
      var sp3 = null;
      var sp3__0 = function() {
        return null
      };
      var sp3__1 = function(x) {
        var or__3824__auto____8128 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8128)) {
          return or__3824__auto____8128
        }else {
          var or__3824__auto____8129 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8129)) {
            return or__3824__auto____8129
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__2 = function(x, y) {
        var or__3824__auto____8130 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8130)) {
          return or__3824__auto____8130
        }else {
          var or__3824__auto____8131 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8131)) {
            return or__3824__auto____8131
          }else {
            var or__3824__auto____8132 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8132)) {
              return or__3824__auto____8132
            }else {
              var or__3824__auto____8133 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8133)) {
                return or__3824__auto____8133
              }else {
                var or__3824__auto____8134 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8134)) {
                  return or__3824__auto____8134
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3 = function(x, y, z) {
        var or__3824__auto____8135 = p1.call(null, x);
        if(cljs.core.truth_(or__3824__auto____8135)) {
          return or__3824__auto____8135
        }else {
          var or__3824__auto____8136 = p2.call(null, x);
          if(cljs.core.truth_(or__3824__auto____8136)) {
            return or__3824__auto____8136
          }else {
            var or__3824__auto____8137 = p3.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8137)) {
              return or__3824__auto____8137
            }else {
              var or__3824__auto____8138 = p1.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8138)) {
                return or__3824__auto____8138
              }else {
                var or__3824__auto____8139 = p2.call(null, y);
                if(cljs.core.truth_(or__3824__auto____8139)) {
                  return or__3824__auto____8139
                }else {
                  var or__3824__auto____8140 = p3.call(null, y);
                  if(cljs.core.truth_(or__3824__auto____8140)) {
                    return or__3824__auto____8140
                  }else {
                    var or__3824__auto____8141 = p1.call(null, z);
                    if(cljs.core.truth_(or__3824__auto____8141)) {
                      return or__3824__auto____8141
                    }else {
                      var or__3824__auto____8142 = p2.call(null, z);
                      if(cljs.core.truth_(or__3824__auto____8142)) {
                        return or__3824__auto____8142
                      }else {
                        return p3.call(null, z)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      var sp3__4 = function() {
        var G__8159__delegate = function(x, y, z, args) {
          var or__3824__auto____8143 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3824__auto____8143)) {
            return or__3824__auto____8143
          }else {
            return cljs.core.some.call(null, function(p1__7839_SHARP_) {
              var or__3824__auto____8144 = p1.call(null, p1__7839_SHARP_);
              if(cljs.core.truth_(or__3824__auto____8144)) {
                return or__3824__auto____8144
              }else {
                var or__3824__auto____8145 = p2.call(null, p1__7839_SHARP_);
                if(cljs.core.truth_(or__3824__auto____8145)) {
                  return or__3824__auto____8145
                }else {
                  return p3.call(null, p1__7839_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__8159 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__8159__delegate.call(this, x, y, z, args)
        };
        G__8159.cljs$lang$maxFixedArity = 3;
        G__8159.cljs$lang$applyTo = function(arglist__8160) {
          var x = cljs.core.first(arglist__8160);
          var y = cljs.core.first(cljs.core.next(arglist__8160));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8160)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8160)));
          return G__8159__delegate(x, y, z, args)
        };
        G__8159.cljs$lang$arity$variadic = G__8159__delegate;
        return G__8159
      }();
      sp3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp3__0.call(this);
          case 1:
            return sp3__1.call(this, x);
          case 2:
            return sp3__2.call(this, x, y);
          case 3:
            return sp3__3.call(this, x, y, z);
          default:
            return sp3__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp3.cljs$lang$maxFixedArity = 3;
      sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
      sp3.cljs$lang$arity$0 = sp3__0;
      sp3.cljs$lang$arity$1 = sp3__1;
      sp3.cljs$lang$arity$2 = sp3__2;
      sp3.cljs$lang$arity$3 = sp3__3;
      sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
      return sp3
    }()
  };
  var some_fn__4 = function() {
    var G__8161__delegate = function(p1, p2, p3, ps) {
      var ps__8146 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__0 = function() {
          return null
        };
        var spn__1 = function(x) {
          return cljs.core.some.call(null, function(p1__7840_SHARP_) {
            return p1__7840_SHARP_.call(null, x)
          }, ps__8146)
        };
        var spn__2 = function(x, y) {
          return cljs.core.some.call(null, function(p1__7841_SHARP_) {
            var or__3824__auto____8151 = p1__7841_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8151)) {
              return or__3824__auto____8151
            }else {
              return p1__7841_SHARP_.call(null, y)
            }
          }, ps__8146)
        };
        var spn__3 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__7842_SHARP_) {
            var or__3824__auto____8152 = p1__7842_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3824__auto____8152)) {
              return or__3824__auto____8152
            }else {
              var or__3824__auto____8153 = p1__7842_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3824__auto____8153)) {
                return or__3824__auto____8153
              }else {
                return p1__7842_SHARP_.call(null, z)
              }
            }
          }, ps__8146)
        };
        var spn__4 = function() {
          var G__8162__delegate = function(x, y, z, args) {
            var or__3824__auto____8154 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3824__auto____8154)) {
              return or__3824__auto____8154
            }else {
              return cljs.core.some.call(null, function(p1__7843_SHARP_) {
                return cljs.core.some.call(null, p1__7843_SHARP_, args)
              }, ps__8146)
            }
          };
          var G__8162 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__8162__delegate.call(this, x, y, z, args)
          };
          G__8162.cljs$lang$maxFixedArity = 3;
          G__8162.cljs$lang$applyTo = function(arglist__8163) {
            var x = cljs.core.first(arglist__8163);
            var y = cljs.core.first(cljs.core.next(arglist__8163));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8163)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8163)));
            return G__8162__delegate(x, y, z, args)
          };
          G__8162.cljs$lang$arity$variadic = G__8162__delegate;
          return G__8162
        }();
        spn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return spn__0.call(this);
            case 1:
              return spn__1.call(this, x);
            case 2:
              return spn__2.call(this, x, y);
            case 3:
              return spn__3.call(this, x, y, z);
            default:
              return spn__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        spn.cljs$lang$maxFixedArity = 3;
        spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
        spn.cljs$lang$arity$0 = spn__0;
        spn.cljs$lang$arity$1 = spn__1;
        spn.cljs$lang$arity$2 = spn__2;
        spn.cljs$lang$arity$3 = spn__3;
        spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
        return spn
      }()
    };
    var G__8161 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__8161__delegate.call(this, p1, p2, p3, ps)
    };
    G__8161.cljs$lang$maxFixedArity = 3;
    G__8161.cljs$lang$applyTo = function(arglist__8164) {
      var p1 = cljs.core.first(arglist__8164);
      var p2 = cljs.core.first(cljs.core.next(arglist__8164));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8164)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8164)));
      return G__8161__delegate(p1, p2, p3, ps)
    };
    G__8161.cljs$lang$arity$variadic = G__8161__delegate;
    return G__8161
  }();
  some_fn = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return some_fn__1.call(this, p1);
      case 2:
        return some_fn__2.call(this, p1, p2);
      case 3:
        return some_fn__3.call(this, p1, p2, p3);
      default:
        return some_fn__4.cljs$lang$arity$variadic(p1, p2, p3, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  some_fn.cljs$lang$maxFixedArity = 3;
  some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
  some_fn.cljs$lang$arity$1 = some_fn__1;
  some_fn.cljs$lang$arity$2 = some_fn__2;
  some_fn.cljs$lang$arity$3 = some_fn__3;
  some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
  return some_fn
}();
cljs.core.map = function() {
  var map = null;
  var map__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8183 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8183) {
        var s__8184 = temp__3974__auto____8183;
        if(cljs.core.chunked_seq_QMARK_.call(null, s__8184)) {
          var c__8185 = cljs.core.chunk_first.call(null, s__8184);
          var size__8186 = cljs.core.count.call(null, c__8185);
          var b__8187 = cljs.core.chunk_buffer.call(null, size__8186);
          var n__2527__auto____8188 = size__8186;
          var i__8189 = 0;
          while(true) {
            if(i__8189 < n__2527__auto____8188) {
              cljs.core.chunk_append.call(null, b__8187, f.call(null, cljs.core._nth.call(null, c__8185, i__8189)));
              var G__8201 = i__8189 + 1;
              i__8189 = G__8201;
              continue
            }else {
            }
            break
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8187), map.call(null, f, cljs.core.chunk_rest.call(null, s__8184)))
        }else {
          return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__8184)), map.call(null, f, cljs.core.rest.call(null, s__8184)))
        }
      }else {
        return null
      }
    }, null)
  };
  var map__3 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8190 = cljs.core.seq.call(null, c1);
      var s2__8191 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8192 = s1__8190;
        if(and__3822__auto____8192) {
          return s2__8191
        }else {
          return and__3822__auto____8192
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8190), cljs.core.first.call(null, s2__8191)), map.call(null, f, cljs.core.rest.call(null, s1__8190), cljs.core.rest.call(null, s2__8191)))
      }else {
        return null
      }
    }, null)
  };
  var map__4 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8193 = cljs.core.seq.call(null, c1);
      var s2__8194 = cljs.core.seq.call(null, c2);
      var s3__8195 = cljs.core.seq.call(null, c3);
      if(function() {
        var and__3822__auto____8196 = s1__8193;
        if(and__3822__auto____8196) {
          var and__3822__auto____8197 = s2__8194;
          if(and__3822__auto____8197) {
            return s3__8195
          }else {
            return and__3822__auto____8197
          }
        }else {
          return and__3822__auto____8196
        }
      }()) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__8193), cljs.core.first.call(null, s2__8194), cljs.core.first.call(null, s3__8195)), map.call(null, f, cljs.core.rest.call(null, s1__8193), cljs.core.rest.call(null, s2__8194), cljs.core.rest.call(null, s3__8195)))
      }else {
        return null
      }
    }, null)
  };
  var map__5 = function() {
    var G__8202__delegate = function(f, c1, c2, c3, colls) {
      var step__8200 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__8199 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8199)) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__8199), step.call(null, map.call(null, cljs.core.rest, ss__8199)))
          }else {
            return null
          }
        }, null)
      };
      return map.call(null, function(p1__8004_SHARP_) {
        return cljs.core.apply.call(null, f, p1__8004_SHARP_)
      }, step__8200.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__8202 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8202__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8202.cljs$lang$maxFixedArity = 4;
    G__8202.cljs$lang$applyTo = function(arglist__8203) {
      var f = cljs.core.first(arglist__8203);
      var c1 = cljs.core.first(cljs.core.next(arglist__8203));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8203)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8203))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8203))));
      return G__8202__delegate(f, c1, c2, c3, colls)
    };
    G__8202.cljs$lang$arity$variadic = G__8202__delegate;
    return G__8202
  }();
  map = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return map__2.call(this, f, c1);
      case 3:
        return map__3.call(this, f, c1, c2);
      case 4:
        return map__4.call(this, f, c1, c2, c3);
      default:
        return map__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  map.cljs$lang$maxFixedArity = 4;
  map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
  map.cljs$lang$arity$2 = map__2;
  map.cljs$lang$arity$3 = map__3;
  map.cljs$lang$arity$4 = map__4;
  map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
  return map
}();
cljs.core.take = function take(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    if(n > 0) {
      var temp__3974__auto____8206 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8206) {
        var s__8207 = temp__3974__auto____8206;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__8207), take.call(null, n - 1, cljs.core.rest.call(null, s__8207)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.drop = function drop(n, coll) {
  var step__8213 = function(n, coll) {
    while(true) {
      var s__8211 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8212 = n > 0;
        if(and__3822__auto____8212) {
          return s__8211
        }else {
          return and__3822__auto____8212
        }
      }())) {
        var G__8214 = n - 1;
        var G__8215 = cljs.core.rest.call(null, s__8211);
        n = G__8214;
        coll = G__8215;
        continue
      }else {
        return s__8211
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8213.call(null, n, coll)
  }, null)
};
cljs.core.drop_last = function() {
  var drop_last = null;
  var drop_last__1 = function(s) {
    return drop_last.call(null, 1, s)
  };
  var drop_last__2 = function(n, s) {
    return cljs.core.map.call(null, function(x, _) {
      return x
    }, s, cljs.core.drop.call(null, n, s))
  };
  drop_last = function(n, s) {
    switch(arguments.length) {
      case 1:
        return drop_last__1.call(this, n);
      case 2:
        return drop_last__2.call(this, n, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  drop_last.cljs$lang$arity$1 = drop_last__1;
  drop_last.cljs$lang$arity$2 = drop_last__2;
  return drop_last
}();
cljs.core.take_last = function take_last(n, coll) {
  var s__8218 = cljs.core.seq.call(null, coll);
  var lead__8219 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(lead__8219) {
      var G__8220 = cljs.core.next.call(null, s__8218);
      var G__8221 = cljs.core.next.call(null, lead__8219);
      s__8218 = G__8220;
      lead__8219 = G__8221;
      continue
    }else {
      return s__8218
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__8227 = function(pred, coll) {
    while(true) {
      var s__8225 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3822__auto____8226 = s__8225;
        if(and__3822__auto____8226) {
          return pred.call(null, cljs.core.first.call(null, s__8225))
        }else {
          return and__3822__auto____8226
        }
      }())) {
        var G__8228 = pred;
        var G__8229 = cljs.core.rest.call(null, s__8225);
        pred = G__8228;
        coll = G__8229;
        continue
      }else {
        return s__8225
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__8227.call(null, pred, coll)
  }, null)
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8232 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8232) {
      var s__8233 = temp__3974__auto____8232;
      return cljs.core.concat.call(null, s__8233, cycle.call(null, s__8233))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_at = function split_at(n, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null, n, coll), cljs.core.drop.call(null, n, coll)], true)
};
cljs.core.repeat = function() {
  var repeat = null;
  var repeat__1 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, x, repeat.call(null, x))
    }, null)
  };
  var repeat__2 = function(n, x) {
    return cljs.core.take.call(null, n, repeat.call(null, x))
  };
  repeat = function(n, x) {
    switch(arguments.length) {
      case 1:
        return repeat__1.call(this, n);
      case 2:
        return repeat__2.call(this, n, x)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeat.cljs$lang$arity$1 = repeat__1;
  repeat.cljs$lang$arity$2 = repeat__2;
  return repeat
}();
cljs.core.replicate = function replicate(n, x) {
  return cljs.core.take.call(null, n, cljs.core.repeat.call(null, x))
};
cljs.core.repeatedly = function() {
  var repeatedly = null;
  var repeatedly__1 = function(f) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, f.call(null), repeatedly.call(null, f))
    }, null)
  };
  var repeatedly__2 = function(n, f) {
    return cljs.core.take.call(null, n, repeatedly.call(null, f))
  };
  repeatedly = function(n, f) {
    switch(arguments.length) {
      case 1:
        return repeatedly__1.call(this, n);
      case 2:
        return repeatedly__2.call(this, n, f)
    }
    throw"Invalid arity: " + arguments.length;
  };
  repeatedly.cljs$lang$arity$1 = repeatedly__1;
  repeatedly.cljs$lang$arity$2 = repeatedly__2;
  return repeatedly
}();
cljs.core.iterate = function iterate(f, x) {
  return cljs.core.cons.call(null, x, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, f, f.call(null, x))
  }, null))
};
cljs.core.interleave = function() {
  var interleave = null;
  var interleave__2 = function(c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__8238 = cljs.core.seq.call(null, c1);
      var s2__8239 = cljs.core.seq.call(null, c2);
      if(function() {
        var and__3822__auto____8240 = s1__8238;
        if(and__3822__auto____8240) {
          return s2__8239
        }else {
          return and__3822__auto____8240
        }
      }()) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__8238), cljs.core.cons.call(null, cljs.core.first.call(null, s2__8239), interleave.call(null, cljs.core.rest.call(null, s1__8238), cljs.core.rest.call(null, s2__8239))))
      }else {
        return null
      }
    }, null)
  };
  var interleave__3 = function() {
    var G__8242__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__8241 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__8241)) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__8241), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__8241)))
        }else {
          return null
        }
      }, null)
    };
    var G__8242 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8242__delegate.call(this, c1, c2, colls)
    };
    G__8242.cljs$lang$maxFixedArity = 2;
    G__8242.cljs$lang$applyTo = function(arglist__8243) {
      var c1 = cljs.core.first(arglist__8243);
      var c2 = cljs.core.first(cljs.core.next(arglist__8243));
      var colls = cljs.core.rest(cljs.core.next(arglist__8243));
      return G__8242__delegate(c1, c2, colls)
    };
    G__8242.cljs$lang$arity$variadic = G__8242__delegate;
    return G__8242
  }();
  interleave = function(c1, c2, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return interleave__2.call(this, c1, c2);
      default:
        return interleave__3.cljs$lang$arity$variadic(c1, c2, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  interleave.cljs$lang$maxFixedArity = 2;
  interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
  interleave.cljs$lang$arity$2 = interleave__2;
  interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
  return interleave
}();
cljs.core.interpose = function interpose(sep, coll) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, sep), coll))
};
cljs.core.flatten1 = function flatten1(colls) {
  var cat__8253 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____8251 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____8251) {
        var coll__8252 = temp__3971__auto____8251;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__8252), cat.call(null, cljs.core.rest.call(null, coll__8252), colls))
      }else {
        if(cljs.core.seq.call(null, colls)) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    }, null)
  };
  return cat__8253.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__2 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3 = function() {
    var G__8254__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__8254 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__8254__delegate.call(this, f, coll, colls)
    };
    G__8254.cljs$lang$maxFixedArity = 2;
    G__8254.cljs$lang$applyTo = function(arglist__8255) {
      var f = cljs.core.first(arglist__8255);
      var coll = cljs.core.first(cljs.core.next(arglist__8255));
      var colls = cljs.core.rest(cljs.core.next(arglist__8255));
      return G__8254__delegate(f, coll, colls)
    };
    G__8254.cljs$lang$arity$variadic = G__8254__delegate;
    return G__8254
  }();
  mapcat = function(f, coll, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapcat__2.call(this, f, coll);
      default:
        return mapcat__3.cljs$lang$arity$variadic(f, coll, cljs.core.array_seq(arguments, 2))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapcat.cljs$lang$maxFixedArity = 2;
  mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
  mapcat.cljs$lang$arity$2 = mapcat__2;
  mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
  return mapcat
}();
cljs.core.filter = function filter(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____8265 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____8265) {
      var s__8266 = temp__3974__auto____8265;
      if(cljs.core.chunked_seq_QMARK_.call(null, s__8266)) {
        var c__8267 = cljs.core.chunk_first.call(null, s__8266);
        var size__8268 = cljs.core.count.call(null, c__8267);
        var b__8269 = cljs.core.chunk_buffer.call(null, size__8268);
        var n__2527__auto____8270 = size__8268;
        var i__8271 = 0;
        while(true) {
          if(i__8271 < n__2527__auto____8270) {
            if(cljs.core.truth_(pred.call(null, cljs.core._nth.call(null, c__8267, i__8271)))) {
              cljs.core.chunk_append.call(null, b__8269, cljs.core._nth.call(null, c__8267, i__8271))
            }else {
            }
            var G__8274 = i__8271 + 1;
            i__8271 = G__8274;
            continue
          }else {
          }
          break
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, b__8269), filter.call(null, pred, cljs.core.chunk_rest.call(null, s__8266)))
      }else {
        var f__8272 = cljs.core.first.call(null, s__8266);
        var r__8273 = cljs.core.rest.call(null, s__8266);
        if(cljs.core.truth_(pred.call(null, f__8272))) {
          return cljs.core.cons.call(null, f__8272, filter.call(null, pred, r__8273))
        }else {
          return filter.call(null, pred, r__8273)
        }
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.remove = function remove(pred, coll) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, pred), coll)
};
cljs.core.tree_seq = function tree_seq(branch_QMARK_, children, root) {
  var walk__8277 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    }, null)
  };
  return walk__8277.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__8275_SHARP_) {
    return!cljs.core.sequential_QMARK_.call(null, p1__8275_SHARP_)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  if(function() {
    var G__8281__8282 = to;
    if(G__8281__8282) {
      if(function() {
        var or__3824__auto____8283 = G__8281__8282.cljs$lang$protocol_mask$partition1$ & 1;
        if(or__3824__auto____8283) {
          return or__3824__auto____8283
        }else {
          return G__8281__8282.cljs$core$IEditableCollection$
        }
      }()) {
        return true
      }else {
        if(!G__8281__8282.cljs$lang$protocol_mask$partition1$) {
          return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8281__8282)
        }else {
          return false
        }
      }
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IEditableCollection, G__8281__8282)
    }
  }()) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core.transient$.call(null, to), from))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, to, from)
  }
};
cljs.core.mapv = function() {
  var mapv = null;
  var mapv__2 = function(f, coll) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
      return cljs.core.conj_BANG_.call(null, v, f.call(null, o))
    }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
  };
  var mapv__3 = function(f, c1, c2) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2))
  };
  var mapv__4 = function(f, c1, c2, c3) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, f, c1, c2, c3))
  };
  var mapv__5 = function() {
    var G__8284__delegate = function(f, c1, c2, c3, colls) {
      return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, f, c1, c2, c3, colls))
    };
    var G__8284 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__8284__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__8284.cljs$lang$maxFixedArity = 4;
    G__8284.cljs$lang$applyTo = function(arglist__8285) {
      var f = cljs.core.first(arglist__8285);
      var c1 = cljs.core.first(cljs.core.next(arglist__8285));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8285)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8285))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8285))));
      return G__8284__delegate(f, c1, c2, c3, colls)
    };
    G__8284.cljs$lang$arity$variadic = G__8284__delegate;
    return G__8284
  }();
  mapv = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapv__2.call(this, f, c1);
      case 3:
        return mapv__3.call(this, f, c1, c2);
      case 4:
        return mapv__4.call(this, f, c1, c2, c3);
      default:
        return mapv__5.cljs$lang$arity$variadic(f, c1, c2, c3, cljs.core.array_seq(arguments, 4))
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapv.cljs$lang$maxFixedArity = 4;
  mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
  mapv.cljs$lang$arity$2 = mapv__2;
  mapv.cljs$lang$arity$3 = mapv__3;
  mapv.cljs$lang$arity$4 = mapv__4;
  mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
  return mapv
}();
cljs.core.filterv = function filterv(pred, coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(v, o) {
    if(cljs.core.truth_(pred.call(null, o))) {
      return cljs.core.conj_BANG_.call(null, v, o)
    }else {
      return v
    }
  }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.partition = function() {
  var partition = null;
  var partition__2 = function(n, coll) {
    return partition.call(null, n, n, coll)
  };
  var partition__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8292 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8292) {
        var s__8293 = temp__3974__auto____8292;
        var p__8294 = cljs.core.take.call(null, n, s__8293);
        if(n === cljs.core.count.call(null, p__8294)) {
          return cljs.core.cons.call(null, p__8294, partition.call(null, n, step, cljs.core.drop.call(null, step, s__8293)))
        }else {
          return null
        }
      }else {
        return null
      }
    }, null)
  };
  var partition__4 = function(n, step, pad, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____8295 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____8295) {
        var s__8296 = temp__3974__auto____8295;
        var p__8297 = cljs.core.take.call(null, n, s__8296);
        if(n === cljs.core.count.call(null, p__8297)) {
          return cljs.core.cons.call(null, p__8297, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__8296)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__8297, pad)))
        }
      }else {
        return null
      }
    }, null)
  };
  partition = function(n, step, pad, coll) {
    switch(arguments.length) {
      case 2:
        return partition__2.call(this, n, step);
      case 3:
        return partition__3.call(this, n, step, pad);
      case 4:
        return partition__4.call(this, n, step, pad, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition.cljs$lang$arity$2 = partition__2;
  partition.cljs$lang$arity$3 = partition__3;
  partition.cljs$lang$arity$4 = partition__4;
  return partition
}();
cljs.core.get_in = function() {
  var get_in = null;
  var get_in__2 = function(m, ks) {
    return cljs.core.reduce.call(null, cljs.core.get, m, ks)
  };
  var get_in__3 = function(m, ks, not_found) {
    var sentinel__8302 = cljs.core.lookup_sentinel;
    var m__8303 = m;
    var ks__8304 = cljs.core.seq.call(null, ks);
    while(true) {
      if(ks__8304) {
        var m__8305 = cljs.core._lookup.call(null, m__8303, cljs.core.first.call(null, ks__8304), sentinel__8302);
        if(sentinel__8302 === m__8305) {
          return not_found
        }else {
          var G__8306 = sentinel__8302;
          var G__8307 = m__8305;
          var G__8308 = cljs.core.next.call(null, ks__8304);
          sentinel__8302 = G__8306;
          m__8303 = G__8307;
          ks__8304 = G__8308;
          continue
        }
      }else {
        return m__8303
      }
      break
    }
  };
  get_in = function(m, ks, not_found) {
    switch(arguments.length) {
      case 2:
        return get_in__2.call(this, m, ks);
      case 3:
        return get_in__3.call(this, m, ks, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  get_in.cljs$lang$arity$2 = get_in__2;
  get_in.cljs$lang$arity$3 = get_in__3;
  return get_in
}();
cljs.core.assoc_in = function assoc_in(m, p__8309, v) {
  var vec__8314__8315 = p__8309;
  var k__8316 = cljs.core.nth.call(null, vec__8314__8315, 0, null);
  var ks__8317 = cljs.core.nthnext.call(null, vec__8314__8315, 1);
  if(cljs.core.truth_(ks__8317)) {
    return cljs.core.assoc.call(null, m, k__8316, assoc_in.call(null, cljs.core._lookup.call(null, m, k__8316, null), ks__8317, v))
  }else {
    return cljs.core.assoc.call(null, m, k__8316, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__8318, f, args) {
    var vec__8323__8324 = p__8318;
    var k__8325 = cljs.core.nth.call(null, vec__8323__8324, 0, null);
    var ks__8326 = cljs.core.nthnext.call(null, vec__8323__8324, 1);
    if(cljs.core.truth_(ks__8326)) {
      return cljs.core.assoc.call(null, m, k__8325, cljs.core.apply.call(null, update_in, cljs.core._lookup.call(null, m, k__8325, null), ks__8326, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__8325, cljs.core.apply.call(null, f, cljs.core._lookup.call(null, m, k__8325, null), args))
    }
  };
  var update_in = function(m, p__8318, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__8318, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__8327) {
    var m = cljs.core.first(arglist__8327);
    var p__8318 = cljs.core.first(cljs.core.next(arglist__8327));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8327)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8327)));
    return update_in__delegate(m, p__8318, f, args)
  };
  update_in.cljs$lang$arity$variadic = update_in__delegate;
  return update_in
}();
cljs.core.Vector = function(meta, array, __hash) {
  this.meta = meta;
  this.array = array;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8330 = this;
  var h__2192__auto____8331 = this__8330.__hash;
  if(!(h__2192__auto____8331 == null)) {
    return h__2192__auto____8331
  }else {
    var h__2192__auto____8332 = cljs.core.hash_coll.call(null, coll);
    this__8330.__hash = h__2192__auto____8332;
    return h__2192__auto____8332
  }
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8333 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8334 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8335 = this;
  var new_array__8336 = this__8335.array.slice();
  new_array__8336[k] = v;
  return new cljs.core.Vector(this__8335.meta, new_array__8336, null)
};
cljs.core.Vector.prototype.call = function() {
  var G__8367 = null;
  var G__8367__2 = function(this_sym8337, k) {
    var this__8339 = this;
    var this_sym8337__8340 = this;
    var coll__8341 = this_sym8337__8340;
    return coll__8341.cljs$core$ILookup$_lookup$arity$2(coll__8341, k)
  };
  var G__8367__3 = function(this_sym8338, k, not_found) {
    var this__8339 = this;
    var this_sym8338__8342 = this;
    var coll__8343 = this_sym8338__8342;
    return coll__8343.cljs$core$ILookup$_lookup$arity$3(coll__8343, k, not_found)
  };
  G__8367 = function(this_sym8338, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8367__2.call(this, this_sym8338, k);
      case 3:
        return G__8367__3.call(this, this_sym8338, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8367
}();
cljs.core.Vector.prototype.apply = function(this_sym8328, args8329) {
  var this__8344 = this;
  return this_sym8328.call.apply(this_sym8328, [this_sym8328].concat(args8329.slice()))
};
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8345 = this;
  var new_array__8346 = this__8345.array.slice();
  new_array__8346.push(o);
  return new cljs.core.Vector(this__8345.meta, new_array__8346, null)
};
cljs.core.Vector.prototype.toString = function() {
  var this__8347 = this;
  var this__8348 = this;
  return cljs.core.pr_str.call(null, this__8348)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8349 = this;
  return cljs.core.ci_reduce.call(null, this__8349.array, f)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8350 = this;
  return cljs.core.ci_reduce.call(null, this__8350.array, f, start)
};
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8351 = this;
  if(this__8351.array.length > 0) {
    var vector_seq__8352 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < this__8351.array.length) {
          return cljs.core.cons.call(null, this__8351.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      }, null)
    };
    return vector_seq__8352.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8353 = this;
  return this__8353.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8354 = this;
  var count__8355 = this__8354.array.length;
  if(count__8355 > 0) {
    return this__8354.array[count__8355 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8356 = this;
  if(this__8356.array.length > 0) {
    var new_array__8357 = this__8356.array.slice();
    new_array__8357.pop();
    return new cljs.core.Vector(this__8356.meta, new_array__8357, null)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8358 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8359 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8360 = this;
  return new cljs.core.Vector(meta, this__8360.array, this__8360.__hash)
};
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8361 = this;
  return this__8361.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8362 = this;
  if(function() {
    var and__3822__auto____8363 = 0 <= n;
    if(and__3822__auto____8363) {
      return n < this__8362.array.length
    }else {
      return and__3822__auto____8363
    }
  }()) {
    return this__8362.array[n]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8364 = this;
  if(function() {
    var and__3822__auto____8365 = 0 <= n;
    if(and__3822__auto____8365) {
      return n < this__8364.array.length
    }else {
      return and__3822__auto____8365
    }
  }()) {
    return this__8364.array[n]
  }else {
    return not_found
  }
};
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8366 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8366.meta)
};
cljs.core.Vector;
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, [], 0);
cljs.core.Vector.fromArray = function(xs) {
  return new cljs.core.Vector(null, xs, null)
};
cljs.core.VectorNode = function(edit, arr) {
  this.edit = edit;
  this.arr = arr
};
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = function(this__2310__auto__) {
  return cljs.core.list.call(null, "cljs.core/VectorNode")
};
cljs.core.VectorNode;
cljs.core.pv_fresh_node = function pv_fresh_node(edit) {
  return new cljs.core.VectorNode(edit, cljs.core.make_array.call(null, 32))
};
cljs.core.pv_aget = function pv_aget(node, idx) {
  return node.arr[idx]
};
cljs.core.pv_aset = function pv_aset(node, idx, val) {
  return node.arr[idx] = val
};
cljs.core.pv_clone_node = function pv_clone_node(node) {
  return new cljs.core.VectorNode(node.edit, node.arr.slice())
};
cljs.core.tail_off = function tail_off(pv) {
  var cnt__8369 = pv.cnt;
  if(cnt__8369 < 32) {
    return 0
  }else {
    return cnt__8369 - 1 >>> 5 << 5
  }
};
cljs.core.new_path = function new_path(edit, level, node) {
  var ll__8375 = level;
  var ret__8376 = node;
  while(true) {
    if(ll__8375 === 0) {
      return ret__8376
    }else {
      var embed__8377 = ret__8376;
      var r__8378 = cljs.core.pv_fresh_node.call(null, edit);
      var ___8379 = cljs.core.pv_aset.call(null, r__8378, 0, embed__8377);
      var G__8380 = ll__8375 - 5;
      var G__8381 = r__8378;
      ll__8375 = G__8380;
      ret__8376 = G__8381;
      continue
    }
    break
  }
};
cljs.core.push_tail = function push_tail(pv, level, parent, tailnode) {
  var ret__8387 = cljs.core.pv_clone_node.call(null, parent);
  var subidx__8388 = pv.cnt - 1 >>> level & 31;
  if(5 === level) {
    cljs.core.pv_aset.call(null, ret__8387, subidx__8388, tailnode);
    return ret__8387
  }else {
    var child__8389 = cljs.core.pv_aget.call(null, parent, subidx__8388);
    if(!(child__8389 == null)) {
      var node_to_insert__8390 = push_tail.call(null, pv, level - 5, child__8389, tailnode);
      cljs.core.pv_aset.call(null, ret__8387, subidx__8388, node_to_insert__8390);
      return ret__8387
    }else {
      var node_to_insert__8391 = cljs.core.new_path.call(null, null, level - 5, tailnode);
      cljs.core.pv_aset.call(null, ret__8387, subidx__8388, node_to_insert__8391);
      return ret__8387
    }
  }
};
cljs.core.array_for = function array_for(pv, i) {
  if(function() {
    var and__3822__auto____8395 = 0 <= i;
    if(and__3822__auto____8395) {
      return i < pv.cnt
    }else {
      return and__3822__auto____8395
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, pv)) {
      return pv.tail
    }else {
      var node__8396 = pv.root;
      var level__8397 = pv.shift;
      while(true) {
        if(level__8397 > 0) {
          var G__8398 = cljs.core.pv_aget.call(null, node__8396, i >>> level__8397 & 31);
          var G__8399 = level__8397 - 5;
          node__8396 = G__8398;
          level__8397 = G__8399;
          continue
        }else {
          return node__8396.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in vector of length "), cljs.core.str(pv.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(pv, level, node, i, val) {
  var ret__8402 = cljs.core.pv_clone_node.call(null, node);
  if(level === 0) {
    cljs.core.pv_aset.call(null, ret__8402, i & 31, val);
    return ret__8402
  }else {
    var subidx__8403 = i >>> level & 31;
    cljs.core.pv_aset.call(null, ret__8402, subidx__8403, do_assoc.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8403), i, val));
    return ret__8402
  }
};
cljs.core.pop_tail = function pop_tail(pv, level, node) {
  var subidx__8409 = pv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8410 = pop_tail.call(null, pv, level - 5, cljs.core.pv_aget.call(null, node, subidx__8409));
    if(function() {
      var and__3822__auto____8411 = new_child__8410 == null;
      if(and__3822__auto____8411) {
        return subidx__8409 === 0
      }else {
        return and__3822__auto____8411
      }
    }()) {
      return null
    }else {
      var ret__8412 = cljs.core.pv_clone_node.call(null, node);
      cljs.core.pv_aset.call(null, ret__8412, subidx__8409, new_child__8410);
      return ret__8412
    }
  }else {
    if(subidx__8409 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        var ret__8413 = cljs.core.pv_clone_node.call(null, node);
        cljs.core.pv_aset.call(null, ret__8413, subidx__8409, null);
        return ret__8413
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector = function(meta, cnt, shift, root, tail, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8416 = this;
  return new cljs.core.TransientVector(this__8416.cnt, this__8416.shift, cljs.core.tv_editable_root.call(null, this__8416.root), cljs.core.tv_editable_tail.call(null, this__8416.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8417 = this;
  var h__2192__auto____8418 = this__8417.__hash;
  if(!(h__2192__auto____8418 == null)) {
    return h__2192__auto____8418
  }else {
    var h__2192__auto____8419 = cljs.core.hash_coll.call(null, coll);
    this__8417.__hash = h__2192__auto____8419;
    return h__2192__auto____8419
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8420 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8421 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8422 = this;
  if(function() {
    var and__3822__auto____8423 = 0 <= k;
    if(and__3822__auto____8423) {
      return k < this__8422.cnt
    }else {
      return and__3822__auto____8423
    }
  }()) {
    if(cljs.core.tail_off.call(null, coll) <= k) {
      var new_tail__8424 = this__8422.tail.slice();
      new_tail__8424[k & 31] = v;
      return new cljs.core.PersistentVector(this__8422.meta, this__8422.cnt, this__8422.shift, this__8422.root, new_tail__8424, null)
    }else {
      return new cljs.core.PersistentVector(this__8422.meta, this__8422.cnt, this__8422.shift, cljs.core.do_assoc.call(null, coll, this__8422.shift, this__8422.root, k, v), this__8422.tail, null)
    }
  }else {
    if(k === this__8422.cnt) {
      return coll.cljs$core$ICollection$_conj$arity$2(coll, v)
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Index "), cljs.core.str(k), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this__8422.cnt), cljs.core.str("]")].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentVector.prototype.call = function() {
  var G__8472 = null;
  var G__8472__2 = function(this_sym8425, k) {
    var this__8427 = this;
    var this_sym8425__8428 = this;
    var coll__8429 = this_sym8425__8428;
    return coll__8429.cljs$core$ILookup$_lookup$arity$2(coll__8429, k)
  };
  var G__8472__3 = function(this_sym8426, k, not_found) {
    var this__8427 = this;
    var this_sym8426__8430 = this;
    var coll__8431 = this_sym8426__8430;
    return coll__8431.cljs$core$ILookup$_lookup$arity$3(coll__8431, k, not_found)
  };
  G__8472 = function(this_sym8426, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8472__2.call(this, this_sym8426, k);
      case 3:
        return G__8472__3.call(this, this_sym8426, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8472
}();
cljs.core.PersistentVector.prototype.apply = function(this_sym8414, args8415) {
  var this__8432 = this;
  return this_sym8414.call.apply(this_sym8414, [this_sym8414].concat(args8415.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(v, f, init) {
  var this__8433 = this;
  var step_init__8434 = [0, init];
  var i__8435 = 0;
  while(true) {
    if(i__8435 < this__8433.cnt) {
      var arr__8436 = cljs.core.array_for.call(null, v, i__8435);
      var len__8437 = arr__8436.length;
      var init__8441 = function() {
        var j__8438 = 0;
        var init__8439 = step_init__8434[1];
        while(true) {
          if(j__8438 < len__8437) {
            var init__8440 = f.call(null, init__8439, j__8438 + i__8435, arr__8436[j__8438]);
            if(cljs.core.reduced_QMARK_.call(null, init__8440)) {
              return init__8440
            }else {
              var G__8473 = j__8438 + 1;
              var G__8474 = init__8440;
              j__8438 = G__8473;
              init__8439 = G__8474;
              continue
            }
          }else {
            step_init__8434[0] = len__8437;
            step_init__8434[1] = init__8439;
            return init__8439
          }
          break
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8441)) {
        return cljs.core.deref.call(null, init__8441)
      }else {
        var G__8475 = i__8435 + step_init__8434[0];
        i__8435 = G__8475;
        continue
      }
    }else {
      return step_init__8434[1]
    }
    break
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8442 = this;
  if(this__8442.cnt - cljs.core.tail_off.call(null, coll) < 32) {
    var new_tail__8443 = this__8442.tail.slice();
    new_tail__8443.push(o);
    return new cljs.core.PersistentVector(this__8442.meta, this__8442.cnt + 1, this__8442.shift, this__8442.root, new_tail__8443, null)
  }else {
    var root_overflow_QMARK___8444 = this__8442.cnt >>> 5 > 1 << this__8442.shift;
    var new_shift__8445 = root_overflow_QMARK___8444 ? this__8442.shift + 5 : this__8442.shift;
    var new_root__8447 = root_overflow_QMARK___8444 ? function() {
      var n_r__8446 = cljs.core.pv_fresh_node.call(null, null);
      cljs.core.pv_aset.call(null, n_r__8446, 0, this__8442.root);
      cljs.core.pv_aset.call(null, n_r__8446, 1, cljs.core.new_path.call(null, null, this__8442.shift, new cljs.core.VectorNode(null, this__8442.tail)));
      return n_r__8446
    }() : cljs.core.push_tail.call(null, coll, this__8442.shift, this__8442.root, new cljs.core.VectorNode(null, this__8442.tail));
    return new cljs.core.PersistentVector(this__8442.meta, this__8442.cnt + 1, new_shift__8445, new_root__8447, [o], null)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__8448 = this;
  if(this__8448.cnt > 0) {
    return new cljs.core.RSeq(coll, this__8448.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(coll) {
  var this__8449 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(coll) {
  var this__8450 = this;
  return coll.cljs$core$IIndexed$_nth$arity$2(coll, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  var this__8451 = this;
  var this__8452 = this;
  return cljs.core.pr_str.call(null, this__8452)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(v, f) {
  var this__8453 = this;
  return cljs.core.ci_reduce.call(null, v, f)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(v, f, start) {
  var this__8454 = this;
  return cljs.core.ci_reduce.call(null, v, f, start)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8455 = this;
  if(this__8455.cnt === 0) {
    return null
  }else {
    return cljs.core.chunked_seq.call(null, coll, 0, 0)
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8456 = this;
  return this__8456.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8457 = this;
  if(this__8457.cnt > 0) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, this__8457.cnt - 1)
  }else {
    return null
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8458 = this;
  if(this__8458.cnt === 0) {
    throw new Error("Can't pop empty vector");
  }else {
    if(1 === this__8458.cnt) {
      return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8458.meta)
    }else {
      if(1 < this__8458.cnt - cljs.core.tail_off.call(null, coll)) {
        return new cljs.core.PersistentVector(this__8458.meta, this__8458.cnt - 1, this__8458.shift, this__8458.root, this__8458.tail.slice(0, -1), null)
      }else {
        if("\ufdd0'else") {
          var new_tail__8459 = cljs.core.array_for.call(null, coll, this__8458.cnt - 2);
          var nr__8460 = cljs.core.pop_tail.call(null, coll, this__8458.shift, this__8458.root);
          var new_root__8461 = nr__8460 == null ? cljs.core.PersistentVector.EMPTY_NODE : nr__8460;
          var cnt_1__8462 = this__8458.cnt - 1;
          if(function() {
            var and__3822__auto____8463 = 5 < this__8458.shift;
            if(and__3822__auto____8463) {
              return cljs.core.pv_aget.call(null, new_root__8461, 1) == null
            }else {
              return and__3822__auto____8463
            }
          }()) {
            return new cljs.core.PersistentVector(this__8458.meta, cnt_1__8462, this__8458.shift - 5, cljs.core.pv_aget.call(null, new_root__8461, 0), new_tail__8459, null)
          }else {
            return new cljs.core.PersistentVector(this__8458.meta, cnt_1__8462, this__8458.shift, new_root__8461, new_tail__8459, null)
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8464 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8465 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8466 = this;
  return new cljs.core.PersistentVector(meta, this__8466.cnt, this__8466.shift, this__8466.root, this__8466.tail, this__8466.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8467 = this;
  return this__8467.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8468 = this;
  return cljs.core.array_for.call(null, coll, n)[n & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8469 = this;
  if(function() {
    var and__3822__auto____8470 = 0 <= n;
    if(and__3822__auto____8470) {
      return n < this__8469.cnt
    }else {
      return and__3822__auto____8470
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8471 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8471.meta)
};
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null, null);
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(xs, no_clone) {
  var l__8476 = xs.length;
  var xs__8477 = no_clone === true ? xs : xs.slice();
  if(l__8476 < 32) {
    return new cljs.core.PersistentVector(null, l__8476, 5, cljs.core.PersistentVector.EMPTY_NODE, xs__8477, null)
  }else {
    var node__8478 = xs__8477.slice(0, 32);
    var v__8479 = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, node__8478, null);
    var i__8480 = 32;
    var out__8481 = cljs.core._as_transient.call(null, v__8479);
    while(true) {
      if(i__8480 < l__8476) {
        var G__8482 = i__8480 + 1;
        var G__8483 = cljs.core.conj_BANG_.call(null, out__8481, xs__8477[i__8480]);
        i__8480 = G__8482;
        out__8481 = G__8483;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__8481)
      }
      break
    }
  }
};
cljs.core.vec = function vec(coll) {
  return cljs.core._persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core._as_transient.call(null, cljs.core.PersistentVector.EMPTY), coll))
};
cljs.core.vector = function() {
  var vector__delegate = function(args) {
    return cljs.core.vec.call(null, args)
  };
  var vector = function(var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return vector__delegate.call(this, args)
  };
  vector.cljs$lang$maxFixedArity = 0;
  vector.cljs$lang$applyTo = function(arglist__8484) {
    var args = cljs.core.seq(arglist__8484);
    return vector__delegate(args)
  };
  vector.cljs$lang$arity$variadic = vector__delegate;
  return vector
}();
cljs.core.ChunkedSeq = function(vec, node, i, off, meta) {
  this.vec = vec;
  this.node = node;
  this.i = i;
  this.off = off;
  this.meta = meta;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 27525356
};
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(coll) {
  var this__8485 = this;
  if(this__8485.off + 1 < this__8485.node.length) {
    var s__8486 = cljs.core.chunked_seq.call(null, this__8485.vec, this__8485.node, this__8485.i, this__8485.off + 1);
    if(s__8486 == null) {
      return null
    }else {
      return s__8486
    }
  }else {
    return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8487 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8488 = this;
  return coll
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8489 = this;
  return this__8489.node[this__8489.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8490 = this;
  if(this__8490.off + 1 < this__8490.node.length) {
    var s__8491 = cljs.core.chunked_seq.call(null, this__8490.vec, this__8490.node, this__8490.i, this__8490.off + 1);
    if(s__8491 == null) {
      return cljs.core.List.EMPTY
    }else {
      return s__8491
    }
  }else {
    return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll)
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(coll) {
  var this__8492 = this;
  var l__8493 = this__8492.node.length;
  var s__8494 = this__8492.i + l__8493 < cljs.core._count.call(null, this__8492.vec) ? cljs.core.chunked_seq.call(null, this__8492.vec, this__8492.i + l__8493, 0) : null;
  if(s__8494 == null) {
    return null
  }else {
    return s__8494
  }
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8495 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, m) {
  var this__8496 = this;
  return cljs.core.chunked_seq.call(null, this__8496.vec, this__8496.node, this__8496.i, this__8496.off, m)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function(coll) {
  var this__8497 = this;
  return this__8497.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8498 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this__8498.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(coll) {
  var this__8499 = this;
  return cljs.core.array_chunk.call(null, this__8499.node, this__8499.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(coll) {
  var this__8500 = this;
  var l__8501 = this__8500.node.length;
  var s__8502 = this__8500.i + l__8501 < cljs.core._count.call(null, this__8500.vec) ? cljs.core.chunked_seq.call(null, this__8500.vec, this__8500.i + l__8501, 0) : null;
  if(s__8502 == null) {
    return cljs.core.List.EMPTY
  }else {
    return s__8502
  }
};
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = function() {
  var chunked_seq = null;
  var chunked_seq__3 = function(vec, i, off) {
    return chunked_seq.call(null, vec, cljs.core.array_for.call(null, vec, i), i, off, null)
  };
  var chunked_seq__4 = function(vec, node, i, off) {
    return chunked_seq.call(null, vec, node, i, off, null)
  };
  var chunked_seq__5 = function(vec, node, i, off, meta) {
    return new cljs.core.ChunkedSeq(vec, node, i, off, meta)
  };
  chunked_seq = function(vec, node, i, off, meta) {
    switch(arguments.length) {
      case 3:
        return chunked_seq__3.call(this, vec, node, i);
      case 4:
        return chunked_seq__4.call(this, vec, node, i, off);
      case 5:
        return chunked_seq__5.call(this, vec, node, i, off, meta)
    }
    throw"Invalid arity: " + arguments.length;
  };
  chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
  chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
  chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
  return chunked_seq
}();
cljs.core.Subvec = function(meta, v, start, end, __hash) {
  this.meta = meta;
  this.v = v;
  this.start = start;
  this.end = end;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8505 = this;
  var h__2192__auto____8506 = this__8505.__hash;
  if(!(h__2192__auto____8506 == null)) {
    return h__2192__auto____8506
  }else {
    var h__2192__auto____8507 = cljs.core.hash_coll.call(null, coll);
    this__8505.__hash = h__2192__auto____8507;
    return h__2192__auto____8507
  }
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8508 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8509 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, key, val) {
  var this__8510 = this;
  var v_pos__8511 = this__8510.start + key;
  return new cljs.core.Subvec(this__8510.meta, cljs.core._assoc.call(null, this__8510.v, v_pos__8511, val), this__8510.start, this__8510.end > v_pos__8511 + 1 ? this__8510.end : v_pos__8511 + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var G__8537 = null;
  var G__8537__2 = function(this_sym8512, k) {
    var this__8514 = this;
    var this_sym8512__8515 = this;
    var coll__8516 = this_sym8512__8515;
    return coll__8516.cljs$core$ILookup$_lookup$arity$2(coll__8516, k)
  };
  var G__8537__3 = function(this_sym8513, k, not_found) {
    var this__8514 = this;
    var this_sym8513__8517 = this;
    var coll__8518 = this_sym8513__8517;
    return coll__8518.cljs$core$ILookup$_lookup$arity$3(coll__8518, k, not_found)
  };
  G__8537 = function(this_sym8513, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8537__2.call(this, this_sym8513, k);
      case 3:
        return G__8537__3.call(this, this_sym8513, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8537
}();
cljs.core.Subvec.prototype.apply = function(this_sym8503, args8504) {
  var this__8519 = this;
  return this_sym8503.call.apply(this_sym8503, [this_sym8503].concat(args8504.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8520 = this;
  return new cljs.core.Subvec(this__8520.meta, cljs.core._assoc_n.call(null, this__8520.v, this__8520.end, o), this__8520.start, this__8520.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  var this__8521 = this;
  var this__8522 = this;
  return cljs.core.pr_str.call(null, this__8522)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(coll, f) {
  var this__8523 = this;
  return cljs.core.ci_reduce.call(null, coll, f)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(coll, f, start) {
  var this__8524 = this;
  return cljs.core.ci_reduce.call(null, coll, f, start)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8525 = this;
  var subvec_seq__8526 = function subvec_seq(i) {
    if(i === this__8525.end) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__8525.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }, null))
    }
  };
  return subvec_seq__8526.call(null, this__8525.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8527 = this;
  return this__8527.end - this__8527.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8528 = this;
  return cljs.core._nth.call(null, this__8528.v, this__8528.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8529 = this;
  if(this__8529.start === this__8529.end) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__8529.meta, this__8529.v, this__8529.start, this__8529.end - 1, null)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(coll, n, val) {
  var this__8530 = this;
  return coll.cljs$core$IAssociative$_assoc$arity$3(coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8531 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8532 = this;
  return new cljs.core.Subvec(meta, this__8532.v, this__8532.start, this__8532.end, this__8532.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8533 = this;
  return this__8533.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8534 = this;
  return cljs.core._nth.call(null, this__8534.v, this__8534.start + n)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8535 = this;
  return cljs.core._nth.call(null, this__8535.v, this__8535.start + n, not_found)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8536 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__8536.meta)
};
cljs.core.Subvec;
cljs.core.subvec = function() {
  var subvec = null;
  var subvec__2 = function(v, start) {
    return subvec.call(null, v, start, cljs.core.count.call(null, v))
  };
  var subvec__3 = function(v, start, end) {
    return new cljs.core.Subvec(null, v, start, end, null)
  };
  subvec = function(v, start, end) {
    switch(arguments.length) {
      case 2:
        return subvec__2.call(this, v, start);
      case 3:
        return subvec__3.call(this, v, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subvec.cljs$lang$arity$2 = subvec__2;
  subvec.cljs$lang$arity$3 = subvec__3;
  return subvec
}();
cljs.core.tv_ensure_editable = function tv_ensure_editable(edit, node) {
  if(edit === node.edit) {
    return node
  }else {
    return new cljs.core.VectorNode(edit, node.arr.slice())
  }
};
cljs.core.tv_editable_root = function tv_editable_root(node) {
  return new cljs.core.VectorNode({}, node.arr.slice())
};
cljs.core.tv_editable_tail = function tv_editable_tail(tl) {
  var ret__8539 = cljs.core.make_array.call(null, 32);
  cljs.core.array_copy.call(null, tl, 0, ret__8539, 0, tl.length);
  return ret__8539
};
cljs.core.tv_push_tail = function tv_push_tail(tv, level, parent, tail_node) {
  var ret__8543 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, parent);
  var subidx__8544 = tv.cnt - 1 >>> level & 31;
  cljs.core.pv_aset.call(null, ret__8543, subidx__8544, level === 5 ? tail_node : function() {
    var child__8545 = cljs.core.pv_aget.call(null, ret__8543, subidx__8544);
    if(!(child__8545 == null)) {
      return tv_push_tail.call(null, tv, level - 5, child__8545, tail_node)
    }else {
      return cljs.core.new_path.call(null, tv.root.edit, level - 5, tail_node)
    }
  }());
  return ret__8543
};
cljs.core.tv_pop_tail = function tv_pop_tail(tv, level, node) {
  var node__8550 = cljs.core.tv_ensure_editable.call(null, tv.root.edit, node);
  var subidx__8551 = tv.cnt - 2 >>> level & 31;
  if(level > 5) {
    var new_child__8552 = tv_pop_tail.call(null, tv, level - 5, cljs.core.pv_aget.call(null, node__8550, subidx__8551));
    if(function() {
      var and__3822__auto____8553 = new_child__8552 == null;
      if(and__3822__auto____8553) {
        return subidx__8551 === 0
      }else {
        return and__3822__auto____8553
      }
    }()) {
      return null
    }else {
      cljs.core.pv_aset.call(null, node__8550, subidx__8551, new_child__8552);
      return node__8550
    }
  }else {
    if(subidx__8551 === 0) {
      return null
    }else {
      if("\ufdd0'else") {
        cljs.core.pv_aset.call(null, node__8550, subidx__8551, null);
        return node__8550
      }else {
        return null
      }
    }
  }
};
cljs.core.editable_array_for = function editable_array_for(tv, i) {
  if(function() {
    var and__3822__auto____8558 = 0 <= i;
    if(and__3822__auto____8558) {
      return i < tv.cnt
    }else {
      return and__3822__auto____8558
    }
  }()) {
    if(i >= cljs.core.tail_off.call(null, tv)) {
      return tv.tail
    }else {
      var root__8559 = tv.root;
      var node__8560 = root__8559;
      var level__8561 = tv.shift;
      while(true) {
        if(level__8561 > 0) {
          var G__8562 = cljs.core.tv_ensure_editable.call(null, root__8559.edit, cljs.core.pv_aget.call(null, node__8560, i >>> level__8561 & 31));
          var G__8563 = level__8561 - 5;
          node__8560 = G__8562;
          level__8561 = G__8563;
          continue
        }else {
          return node__8560.arr
        }
        break
      }
    }
  }else {
    throw new Error([cljs.core.str("No item "), cljs.core.str(i), cljs.core.str(" in transient vector of length "), cljs.core.str(tv.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(cnt, shift, root, tail) {
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 22
};
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var G__8603 = null;
  var G__8603__2 = function(this_sym8566, k) {
    var this__8568 = this;
    var this_sym8566__8569 = this;
    var coll__8570 = this_sym8566__8569;
    return coll__8570.cljs$core$ILookup$_lookup$arity$2(coll__8570, k)
  };
  var G__8603__3 = function(this_sym8567, k, not_found) {
    var this__8568 = this;
    var this_sym8567__8571 = this;
    var coll__8572 = this_sym8567__8571;
    return coll__8572.cljs$core$ILookup$_lookup$arity$3(coll__8572, k, not_found)
  };
  G__8603 = function(this_sym8567, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8603__2.call(this, this_sym8567, k);
      case 3:
        return G__8603__3.call(this, this_sym8567, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8603
}();
cljs.core.TransientVector.prototype.apply = function(this_sym8564, args8565) {
  var this__8573 = this;
  return this_sym8564.call.apply(this_sym8564, [this_sym8564].concat(args8565.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8574 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8575 = this;
  return coll.cljs$core$IIndexed$_nth$arity$3(coll, k, not_found)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(coll, n) {
  var this__8576 = this;
  if(this__8576.root.edit) {
    return cljs.core.array_for.call(null, coll, n)[n & 31]
  }else {
    throw new Error("nth after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(coll, n, not_found) {
  var this__8577 = this;
  if(function() {
    var and__3822__auto____8578 = 0 <= n;
    if(and__3822__auto____8578) {
      return n < this__8577.cnt
    }else {
      return and__3822__auto____8578
    }
  }()) {
    return coll.cljs$core$IIndexed$_nth$arity$2(coll, n)
  }else {
    return not_found
  }
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8579 = this;
  if(this__8579.root.edit) {
    return this__8579.cnt
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(tcoll, n, val) {
  var this__8580 = this;
  if(this__8580.root.edit) {
    if(function() {
      var and__3822__auto____8581 = 0 <= n;
      if(and__3822__auto____8581) {
        return n < this__8580.cnt
      }else {
        return and__3822__auto____8581
      }
    }()) {
      if(cljs.core.tail_off.call(null, tcoll) <= n) {
        this__8580.tail[n & 31] = val;
        return tcoll
      }else {
        var new_root__8586 = function go(level, node) {
          var node__8584 = cljs.core.tv_ensure_editable.call(null, this__8580.root.edit, node);
          if(level === 0) {
            cljs.core.pv_aset.call(null, node__8584, n & 31, val);
            return node__8584
          }else {
            var subidx__8585 = n >>> level & 31;
            cljs.core.pv_aset.call(null, node__8584, subidx__8585, go.call(null, level - 5, cljs.core.pv_aget.call(null, node__8584, subidx__8585)));
            return node__8584
          }
        }.call(null, this__8580.shift, this__8580.root);
        this__8580.root = new_root__8586;
        return tcoll
      }
    }else {
      if(n === this__8580.cnt) {
        return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll, val)
      }else {
        if("\ufdd0'else") {
          throw new Error([cljs.core.str("Index "), cljs.core.str(n), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(this__8580.cnt)].join(""));
        }else {
          return null
        }
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(tcoll) {
  var this__8587 = this;
  if(this__8587.root.edit) {
    if(this__8587.cnt === 0) {
      throw new Error("Can't pop empty vector");
    }else {
      if(1 === this__8587.cnt) {
        this__8587.cnt = 0;
        return tcoll
      }else {
        if((this__8587.cnt - 1 & 31) > 0) {
          this__8587.cnt = this__8587.cnt - 1;
          return tcoll
        }else {
          if("\ufdd0'else") {
            var new_tail__8588 = cljs.core.editable_array_for.call(null, tcoll, this__8587.cnt - 2);
            var new_root__8590 = function() {
              var nr__8589 = cljs.core.tv_pop_tail.call(null, tcoll, this__8587.shift, this__8587.root);
              if(!(nr__8589 == null)) {
                return nr__8589
              }else {
                return new cljs.core.VectorNode(this__8587.root.edit, cljs.core.make_array.call(null, 32))
              }
            }();
            if(function() {
              var and__3822__auto____8591 = 5 < this__8587.shift;
              if(and__3822__auto____8591) {
                return cljs.core.pv_aget.call(null, new_root__8590, 1) == null
              }else {
                return and__3822__auto____8591
              }
            }()) {
              var new_root__8592 = cljs.core.tv_ensure_editable.call(null, this__8587.root.edit, cljs.core.pv_aget.call(null, new_root__8590, 0));
              this__8587.root = new_root__8592;
              this__8587.shift = this__8587.shift - 5;
              this__8587.cnt = this__8587.cnt - 1;
              this__8587.tail = new_tail__8588;
              return tcoll
            }else {
              this__8587.root = new_root__8590;
              this__8587.cnt = this__8587.cnt - 1;
              this__8587.tail = new_tail__8588;
              return tcoll
            }
          }else {
            return null
          }
        }
      }
    }
  }else {
    throw new Error("pop! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__8593 = this;
  return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll, key, val)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8594 = this;
  if(this__8594.root.edit) {
    if(this__8594.cnt - cljs.core.tail_off.call(null, tcoll) < 32) {
      this__8594.tail[this__8594.cnt & 31] = o;
      this__8594.cnt = this__8594.cnt + 1;
      return tcoll
    }else {
      var tail_node__8595 = new cljs.core.VectorNode(this__8594.root.edit, this__8594.tail);
      var new_tail__8596 = cljs.core.make_array.call(null, 32);
      new_tail__8596[0] = o;
      this__8594.tail = new_tail__8596;
      if(this__8594.cnt >>> 5 > 1 << this__8594.shift) {
        var new_root_array__8597 = cljs.core.make_array.call(null, 32);
        var new_shift__8598 = this__8594.shift + 5;
        new_root_array__8597[0] = this__8594.root;
        new_root_array__8597[1] = cljs.core.new_path.call(null, this__8594.root.edit, this__8594.shift, tail_node__8595);
        this__8594.root = new cljs.core.VectorNode(this__8594.root.edit, new_root_array__8597);
        this__8594.shift = new_shift__8598;
        this__8594.cnt = this__8594.cnt + 1;
        return tcoll
      }else {
        var new_root__8599 = cljs.core.tv_push_tail.call(null, tcoll, this__8594.shift, this__8594.root, tail_node__8595);
        this__8594.root = new_root__8599;
        this__8594.cnt = this__8594.cnt + 1;
        return tcoll
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8600 = this;
  if(this__8600.root.edit) {
    this__8600.root.edit = null;
    var len__8601 = this__8600.cnt - cljs.core.tail_off.call(null, tcoll);
    var trimmed_tail__8602 = cljs.core.make_array.call(null, len__8601);
    cljs.core.array_copy.call(null, this__8600.tail, 0, trimmed_tail__8602, 0, len__8601);
    return new cljs.core.PersistentVector(null, this__8600.cnt, this__8600.shift, this__8600.root, trimmed_tail__8602, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientVector;
cljs.core.PersistentQueueSeq = function(meta, front, rear, __hash) {
  this.meta = meta;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8604 = this;
  var h__2192__auto____8605 = this__8604.__hash;
  if(!(h__2192__auto____8605 == null)) {
    return h__2192__auto____8605
  }else {
    var h__2192__auto____8606 = cljs.core.hash_coll.call(null, coll);
    this__8604.__hash = h__2192__auto____8606;
    return h__2192__auto____8606
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8607 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  var this__8608 = this;
  var this__8609 = this;
  return cljs.core.pr_str.call(null, this__8609)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8610 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8611 = this;
  return cljs.core._first.call(null, this__8611.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8612 = this;
  var temp__3971__auto____8613 = cljs.core.next.call(null, this__8612.front);
  if(temp__3971__auto____8613) {
    var f1__8614 = temp__3971__auto____8613;
    return new cljs.core.PersistentQueueSeq(this__8612.meta, f1__8614, this__8612.rear, null)
  }else {
    if(this__8612.rear == null) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__8612.meta, this__8612.rear, null, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8615 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8616 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__8616.front, this__8616.rear, this__8616.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8617 = this;
  return this__8617.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8618 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__8618.meta)
};
cljs.core.PersistentQueueSeq;
cljs.core.PersistentQueue = function(meta, count, front, rear, __hash) {
  this.meta = meta;
  this.count = count;
  this.front = front;
  this.rear = rear;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8619 = this;
  var h__2192__auto____8620 = this__8619.__hash;
  if(!(h__2192__auto____8620 == null)) {
    return h__2192__auto____8620
  }else {
    var h__2192__auto____8621 = cljs.core.hash_coll.call(null, coll);
    this__8619.__hash = h__2192__auto____8621;
    return h__2192__auto____8621
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__8622 = this;
  if(cljs.core.truth_(this__8622.front)) {
    return new cljs.core.PersistentQueue(this__8622.meta, this__8622.count + 1, this__8622.front, cljs.core.conj.call(null, function() {
      var or__3824__auto____8623 = this__8622.rear;
      if(cljs.core.truth_(or__3824__auto____8623)) {
        return or__3824__auto____8623
      }else {
        return cljs.core.PersistentVector.EMPTY
      }
    }(), o), null)
  }else {
    return new cljs.core.PersistentQueue(this__8622.meta, this__8622.count + 1, cljs.core.conj.call(null, this__8622.front, o), cljs.core.PersistentVector.EMPTY, null)
  }
};
cljs.core.PersistentQueue.prototype.toString = function() {
  var this__8624 = this;
  var this__8625 = this;
  return cljs.core.pr_str.call(null, this__8625)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8626 = this;
  var rear__8627 = cljs.core.seq.call(null, this__8626.rear);
  if(cljs.core.truth_(function() {
    var or__3824__auto____8628 = this__8626.front;
    if(cljs.core.truth_(or__3824__auto____8628)) {
      return or__3824__auto____8628
    }else {
      return rear__8627
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__8626.front, cljs.core.seq.call(null, rear__8627), null)
  }else {
    return null
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8629 = this;
  return this__8629.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function(coll) {
  var this__8630 = this;
  return cljs.core._first.call(null, this__8630.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(coll) {
  var this__8631 = this;
  if(cljs.core.truth_(this__8631.front)) {
    var temp__3971__auto____8632 = cljs.core.next.call(null, this__8631.front);
    if(temp__3971__auto____8632) {
      var f1__8633 = temp__3971__auto____8632;
      return new cljs.core.PersistentQueue(this__8631.meta, this__8631.count - 1, f1__8633, this__8631.rear, null)
    }else {
      return new cljs.core.PersistentQueue(this__8631.meta, this__8631.count - 1, cljs.core.seq.call(null, this__8631.rear), cljs.core.PersistentVector.EMPTY, null)
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__8634 = this;
  return cljs.core.first.call(null, this__8634.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__8635 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8636 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8637 = this;
  return new cljs.core.PersistentQueue(meta, this__8637.count, this__8637.front, this__8637.rear, this__8637.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8638 = this;
  return this__8638.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8639 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__8640 = this;
  return false
};
cljs.core.NeverEquiv;
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function equiv_map(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.map_QMARK_.call(null, y) ? cljs.core.count.call(null, x) === cljs.core.count.call(null, y) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(xkv) {
    return cljs.core._EQ_.call(null, cljs.core._lookup.call(null, y, cljs.core.first.call(null, xkv), cljs.core.never_equiv), cljs.core.second.call(null, xkv))
  }, x)) : null : null)
};
cljs.core.scan_array = function scan_array(incr, k, array) {
  var len__8643 = array.length;
  var i__8644 = 0;
  while(true) {
    if(i__8644 < len__8643) {
      if(k === array[i__8644]) {
        return i__8644
      }else {
        var G__8645 = i__8644 + incr;
        i__8644 = G__8645;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_compare_keys = function obj_map_compare_keys(a, b) {
  var a__8648 = cljs.core.hash.call(null, a);
  var b__8649 = cljs.core.hash.call(null, b);
  if(a__8648 < b__8649) {
    return-1
  }else {
    if(a__8648 > b__8649) {
      return 1
    }else {
      if("\ufdd0'else") {
        return 0
      }else {
        return null
      }
    }
  }
};
cljs.core.obj_map__GT_hash_map = function obj_map__GT_hash_map(m, k, v) {
  var ks__8657 = m.keys;
  var len__8658 = ks__8657.length;
  var so__8659 = m.strobj;
  var out__8660 = cljs.core.with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, cljs.core.meta.call(null, m));
  var i__8661 = 0;
  var out__8662 = cljs.core.transient$.call(null, out__8660);
  while(true) {
    if(i__8661 < len__8658) {
      var k__8663 = ks__8657[i__8661];
      var G__8664 = i__8661 + 1;
      var G__8665 = cljs.core.assoc_BANG_.call(null, out__8662, k__8663, so__8659[k__8663]);
      i__8661 = G__8664;
      out__8662 = G__8665;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, out__8662, k, v))
    }
    break
  }
};
cljs.core.obj_clone = function obj_clone(obj, ks) {
  var new_obj__8671 = {};
  var l__8672 = ks.length;
  var i__8673 = 0;
  while(true) {
    if(i__8673 < l__8672) {
      var k__8674 = ks[i__8673];
      new_obj__8671[k__8674] = obj[k__8674];
      var G__8675 = i__8673 + 1;
      i__8673 = G__8675;
      continue
    }else {
    }
    break
  }
  return new_obj__8671
};
cljs.core.ObjMap = function(meta, keys, strobj, update_count, __hash) {
  this.meta = meta;
  this.keys = keys;
  this.strobj = strobj;
  this.update_count = update_count;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8678 = this;
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null), coll))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8679 = this;
  var h__2192__auto____8680 = this__8679.__hash;
  if(!(h__2192__auto____8680 == null)) {
    return h__2192__auto____8680
  }else {
    var h__2192__auto____8681 = cljs.core.hash_imap.call(null, coll);
    this__8679.__hash = h__2192__auto____8681;
    return h__2192__auto____8681
  }
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8682 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8683 = this;
  if(function() {
    var and__3822__auto____8684 = goog.isString(k);
    if(and__3822__auto____8684) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8683.keys) == null)
    }else {
      return and__3822__auto____8684
    }
  }()) {
    return this__8683.strobj[k]
  }else {
    return not_found
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8685 = this;
  if(goog.isString(k)) {
    if(function() {
      var or__3824__auto____8686 = this__8685.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD;
      if(or__3824__auto____8686) {
        return or__3824__auto____8686
      }else {
        return this__8685.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD
      }
    }()) {
      return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
    }else {
      if(!(cljs.core.scan_array.call(null, 1, k, this__8685.keys) == null)) {
        var new_strobj__8687 = cljs.core.obj_clone.call(null, this__8685.strobj, this__8685.keys);
        new_strobj__8687[k] = v;
        return new cljs.core.ObjMap(this__8685.meta, this__8685.keys, new_strobj__8687, this__8685.update_count + 1, null)
      }else {
        var new_strobj__8688 = cljs.core.obj_clone.call(null, this__8685.strobj, this__8685.keys);
        var new_keys__8689 = this__8685.keys.slice();
        new_strobj__8688[k] = v;
        new_keys__8689.push(k);
        return new cljs.core.ObjMap(this__8685.meta, new_keys__8689, new_strobj__8688, this__8685.update_count + 1, null)
      }
    }
  }else {
    return cljs.core.obj_map__GT_hash_map.call(null, coll, k, v)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8690 = this;
  if(function() {
    var and__3822__auto____8691 = goog.isString(k);
    if(and__3822__auto____8691) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8690.keys) == null)
    }else {
      return and__3822__auto____8691
    }
  }()) {
    return true
  }else {
    return false
  }
};
cljs.core.ObjMap.prototype.call = function() {
  var G__8713 = null;
  var G__8713__2 = function(this_sym8692, k) {
    var this__8694 = this;
    var this_sym8692__8695 = this;
    var coll__8696 = this_sym8692__8695;
    return coll__8696.cljs$core$ILookup$_lookup$arity$2(coll__8696, k)
  };
  var G__8713__3 = function(this_sym8693, k, not_found) {
    var this__8694 = this;
    var this_sym8693__8697 = this;
    var coll__8698 = this_sym8693__8697;
    return coll__8698.cljs$core$ILookup$_lookup$arity$3(coll__8698, k, not_found)
  };
  G__8713 = function(this_sym8693, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8713__2.call(this, this_sym8693, k);
      case 3:
        return G__8713__3.call(this, this_sym8693, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8713
}();
cljs.core.ObjMap.prototype.apply = function(this_sym8676, args8677) {
  var this__8699 = this;
  return this_sym8676.call.apply(this_sym8676, [this_sym8676].concat(args8677.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8700 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.toString = function() {
  var this__8701 = this;
  var this__8702 = this;
  return cljs.core.pr_str.call(null, this__8702)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8703 = this;
  if(this__8703.keys.length > 0) {
    return cljs.core.map.call(null, function(p1__8666_SHARP_) {
      return cljs.core.vector.call(null, p1__8666_SHARP_, this__8703.strobj[p1__8666_SHARP_])
    }, this__8703.keys.sort(cljs.core.obj_map_compare_keys))
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8704 = this;
  return this__8704.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8705 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8706 = this;
  return new cljs.core.ObjMap(meta, this__8706.keys, this__8706.strobj, this__8706.update_count, this__8706.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8707 = this;
  return this__8707.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8708 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__8708.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8709 = this;
  if(function() {
    var and__3822__auto____8710 = goog.isString(k);
    if(and__3822__auto____8710) {
      return!(cljs.core.scan_array.call(null, 1, k, this__8709.keys) == null)
    }else {
      return and__3822__auto____8710
    }
  }()) {
    var new_keys__8711 = this__8709.keys.slice();
    var new_strobj__8712 = cljs.core.obj_clone.call(null, this__8709.strobj, this__8709.keys);
    new_keys__8711.splice(cljs.core.scan_array.call(null, 1, k, new_keys__8711), 1);
    cljs.core.js_delete.call(null, new_strobj__8712, k);
    return new cljs.core.ObjMap(this__8709.meta, new_keys__8711, new_strobj__8712, this__8709.update_count + 1, null)
  }else {
    return coll
  }
};
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = function(ks, obj) {
  return new cljs.core.ObjMap(null, ks, obj, 0, null)
};
cljs.core.HashMap = function(meta, count, hashobj, __hash) {
  this.meta = meta;
  this.count = count;
  this.hashobj = hashobj;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8717 = this;
  var h__2192__auto____8718 = this__8717.__hash;
  if(!(h__2192__auto____8718 == null)) {
    return h__2192__auto____8718
  }else {
    var h__2192__auto____8719 = cljs.core.hash_imap.call(null, coll);
    this__8717.__hash = h__2192__auto____8719;
    return h__2192__auto____8719
  }
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8720 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8721 = this;
  var bucket__8722 = this__8721.hashobj[cljs.core.hash.call(null, k)];
  var i__8723 = cljs.core.truth_(bucket__8722) ? cljs.core.scan_array.call(null, 2, k, bucket__8722) : null;
  if(cljs.core.truth_(i__8723)) {
    return bucket__8722[i__8723 + 1]
  }else {
    return not_found
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8724 = this;
  var h__8725 = cljs.core.hash.call(null, k);
  var bucket__8726 = this__8724.hashobj[h__8725];
  if(cljs.core.truth_(bucket__8726)) {
    var new_bucket__8727 = bucket__8726.slice();
    var new_hashobj__8728 = goog.object.clone(this__8724.hashobj);
    new_hashobj__8728[h__8725] = new_bucket__8727;
    var temp__3971__auto____8729 = cljs.core.scan_array.call(null, 2, k, new_bucket__8727);
    if(cljs.core.truth_(temp__3971__auto____8729)) {
      var i__8730 = temp__3971__auto____8729;
      new_bucket__8727[i__8730 + 1] = v;
      return new cljs.core.HashMap(this__8724.meta, this__8724.count, new_hashobj__8728, null)
    }else {
      new_bucket__8727.push(k, v);
      return new cljs.core.HashMap(this__8724.meta, this__8724.count + 1, new_hashobj__8728, null)
    }
  }else {
    var new_hashobj__8731 = goog.object.clone(this__8724.hashobj);
    new_hashobj__8731[h__8725] = [k, v];
    return new cljs.core.HashMap(this__8724.meta, this__8724.count + 1, new_hashobj__8731, null)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8732 = this;
  var bucket__8733 = this__8732.hashobj[cljs.core.hash.call(null, k)];
  var i__8734 = cljs.core.truth_(bucket__8733) ? cljs.core.scan_array.call(null, 2, k, bucket__8733) : null;
  if(cljs.core.truth_(i__8734)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.call = function() {
  var G__8759 = null;
  var G__8759__2 = function(this_sym8735, k) {
    var this__8737 = this;
    var this_sym8735__8738 = this;
    var coll__8739 = this_sym8735__8738;
    return coll__8739.cljs$core$ILookup$_lookup$arity$2(coll__8739, k)
  };
  var G__8759__3 = function(this_sym8736, k, not_found) {
    var this__8737 = this;
    var this_sym8736__8740 = this;
    var coll__8741 = this_sym8736__8740;
    return coll__8741.cljs$core$ILookup$_lookup$arity$3(coll__8741, k, not_found)
  };
  G__8759 = function(this_sym8736, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8759__2.call(this, this_sym8736, k);
      case 3:
        return G__8759__3.call(this, this_sym8736, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8759
}();
cljs.core.HashMap.prototype.apply = function(this_sym8715, args8716) {
  var this__8742 = this;
  return this_sym8715.call.apply(this_sym8715, [this_sym8715].concat(args8716.slice()))
};
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8743 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.toString = function() {
  var this__8744 = this;
  var this__8745 = this;
  return cljs.core.pr_str.call(null, this__8745)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8746 = this;
  if(this__8746.count > 0) {
    var hashes__8747 = cljs.core.js_keys.call(null, this__8746.hashobj).sort();
    return cljs.core.mapcat.call(null, function(p1__8714_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__8746.hashobj[p1__8714_SHARP_]))
    }, hashes__8747)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8748 = this;
  return this__8748.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8749 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8750 = this;
  return new cljs.core.HashMap(meta, this__8750.count, this__8750.hashobj, this__8750.__hash)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8751 = this;
  return this__8751.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8752 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__8752.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8753 = this;
  var h__8754 = cljs.core.hash.call(null, k);
  var bucket__8755 = this__8753.hashobj[h__8754];
  var i__8756 = cljs.core.truth_(bucket__8755) ? cljs.core.scan_array.call(null, 2, k, bucket__8755) : null;
  if(cljs.core.not.call(null, i__8756)) {
    return coll
  }else {
    var new_hashobj__8757 = goog.object.clone(this__8753.hashobj);
    if(3 > bucket__8755.length) {
      cljs.core.js_delete.call(null, new_hashobj__8757, h__8754)
    }else {
      var new_bucket__8758 = bucket__8755.slice();
      new_bucket__8758.splice(i__8756, 2);
      new_hashobj__8757[h__8754] = new_bucket__8758
    }
    return new cljs.core.HashMap(this__8753.meta, this__8753.count - 1, new_hashobj__8757, null)
  }
};
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, {}, 0);
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__8760 = ks.length;
  var i__8761 = 0;
  var out__8762 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(i__8761 < len__8760) {
      var G__8763 = i__8761 + 1;
      var G__8764 = cljs.core.assoc.call(null, out__8762, ks[i__8761], vs[i__8761]);
      i__8761 = G__8763;
      out__8762 = G__8764;
      continue
    }else {
      return out__8762
    }
    break
  }
};
cljs.core.array_map_index_of = function array_map_index_of(m, k) {
  var arr__8768 = m.arr;
  var len__8769 = arr__8768.length;
  var i__8770 = 0;
  while(true) {
    if(len__8769 <= i__8770) {
      return-1
    }else {
      if(cljs.core._EQ_.call(null, arr__8768[i__8770], k)) {
        return i__8770
      }else {
        if("\ufdd0'else") {
          var G__8771 = i__8770 + 2;
          i__8770 = G__8771;
          continue
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.PersistentArrayMap = function(meta, cnt, arr, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.arr = arr;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__8774 = this;
  return new cljs.core.TransientArrayMap({}, this__8774.arr.length, this__8774.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__8775 = this;
  var h__2192__auto____8776 = this__8775.__hash;
  if(!(h__2192__auto____8776 == null)) {
    return h__2192__auto____8776
  }else {
    var h__2192__auto____8777 = cljs.core.hash_imap.call(null, coll);
    this__8775.__hash = h__2192__auto____8777;
    return h__2192__auto____8777
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__8778 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__8779 = this;
  var idx__8780 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8780 === -1) {
    return not_found
  }else {
    return this__8779.arr[idx__8780 + 1]
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__8781 = this;
  var idx__8782 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8782 === -1) {
    if(this__8781.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
      return new cljs.core.PersistentArrayMap(this__8781.meta, this__8781.cnt + 1, function() {
        var G__8783__8784 = this__8781.arr.slice();
        G__8783__8784.push(k);
        G__8783__8784.push(v);
        return G__8783__8784
      }(), null)
    }else {
      return cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, coll)), k, v))
    }
  }else {
    if(v === this__8781.arr[idx__8782 + 1]) {
      return coll
    }else {
      if("\ufdd0'else") {
        return new cljs.core.PersistentArrayMap(this__8781.meta, this__8781.cnt, function() {
          var G__8785__8786 = this__8781.arr.slice();
          G__8785__8786[idx__8782 + 1] = v;
          return G__8785__8786
        }(), null)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__8787 = this;
  return!(cljs.core.array_map_index_of.call(null, coll, k) === -1)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var G__8819 = null;
  var G__8819__2 = function(this_sym8788, k) {
    var this__8790 = this;
    var this_sym8788__8791 = this;
    var coll__8792 = this_sym8788__8791;
    return coll__8792.cljs$core$ILookup$_lookup$arity$2(coll__8792, k)
  };
  var G__8819__3 = function(this_sym8789, k, not_found) {
    var this__8790 = this;
    var this_sym8789__8793 = this;
    var coll__8794 = this_sym8789__8793;
    return coll__8794.cljs$core$ILookup$_lookup$arity$3(coll__8794, k, not_found)
  };
  G__8819 = function(this_sym8789, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__8819__2.call(this, this_sym8789, k);
      case 3:
        return G__8819__3.call(this, this_sym8789, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__8819
}();
cljs.core.PersistentArrayMap.prototype.apply = function(this_sym8772, args8773) {
  var this__8795 = this;
  return this_sym8772.call.apply(this_sym8772, [this_sym8772].concat(args8773.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__8796 = this;
  var len__8797 = this__8796.arr.length;
  var i__8798 = 0;
  var init__8799 = init;
  while(true) {
    if(i__8798 < len__8797) {
      var init__8800 = f.call(null, init__8799, this__8796.arr[i__8798], this__8796.arr[i__8798 + 1]);
      if(cljs.core.reduced_QMARK_.call(null, init__8800)) {
        return cljs.core.deref.call(null, init__8800)
      }else {
        var G__8820 = i__8798 + 2;
        var G__8821 = init__8800;
        i__8798 = G__8820;
        init__8799 = G__8821;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__8801 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  var this__8802 = this;
  var this__8803 = this;
  return cljs.core.pr_str.call(null, this__8803)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__8804 = this;
  if(this__8804.cnt > 0) {
    var len__8805 = this__8804.arr.length;
    var array_map_seq__8806 = function array_map_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(i < len__8805) {
          return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([this__8804.arr[i], this__8804.arr[i + 1]], true), array_map_seq.call(null, i + 2))
        }else {
          return null
        }
      }, null)
    };
    return array_map_seq__8806.call(null, 0)
  }else {
    return null
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__8807 = this;
  return this__8807.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__8808 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__8809 = this;
  return new cljs.core.PersistentArrayMap(meta, this__8809.cnt, this__8809.arr, this__8809.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__8810 = this;
  return this__8810.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__8811 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this__8811.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__8812 = this;
  var idx__8813 = cljs.core.array_map_index_of.call(null, coll, k);
  if(idx__8813 >= 0) {
    var len__8814 = this__8812.arr.length;
    var new_len__8815 = len__8814 - 2;
    if(new_len__8815 === 0) {
      return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll)
    }else {
      var new_arr__8816 = cljs.core.make_array.call(null, new_len__8815);
      var s__8817 = 0;
      var d__8818 = 0;
      while(true) {
        if(s__8817 >= len__8814) {
          return new cljs.core.PersistentArrayMap(this__8812.meta, this__8812.cnt - 1, new_arr__8816, null)
        }else {
          if(cljs.core._EQ_.call(null, k, this__8812.arr[s__8817])) {
            var G__8822 = s__8817 + 2;
            var G__8823 = d__8818;
            s__8817 = G__8822;
            d__8818 = G__8823;
            continue
          }else {
            if("\ufdd0'else") {
              new_arr__8816[d__8818] = this__8812.arr[s__8817];
              new_arr__8816[d__8818 + 1] = this__8812.arr[s__8817 + 1];
              var G__8824 = s__8817 + 2;
              var G__8825 = d__8818 + 2;
              s__8817 = G__8824;
              d__8818 = G__8825;
              continue
            }else {
              return null
            }
          }
        }
        break
      }
    }
  }else {
    return coll
  }
};
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = function(ks, vs) {
  var len__8826 = cljs.core.count.call(null, ks);
  var i__8827 = 0;
  var out__8828 = cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY);
  while(true) {
    if(i__8827 < len__8826) {
      var G__8829 = i__8827 + 1;
      var G__8830 = cljs.core.assoc_BANG_.call(null, out__8828, ks[i__8827], vs[i__8827]);
      i__8827 = G__8829;
      out__8828 = G__8830;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__8828)
    }
    break
  }
};
cljs.core.TransientArrayMap = function(editable_QMARK_, len, arr) {
  this.editable_QMARK_ = editable_QMARK_;
  this.len = len;
  this.arr = arr;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__8831 = this;
  if(cljs.core.truth_(this__8831.editable_QMARK_)) {
    var idx__8832 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8832 >= 0) {
      this__8831.arr[idx__8832] = this__8831.arr[this__8831.len - 2];
      this__8831.arr[idx__8832 + 1] = this__8831.arr[this__8831.len - 1];
      var G__8833__8834 = this__8831.arr;
      G__8833__8834.pop();
      G__8833__8834.pop();
      G__8833__8834;
      this__8831.len = this__8831.len - 2
    }else {
    }
    return tcoll
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__8835 = this;
  if(cljs.core.truth_(this__8835.editable_QMARK_)) {
    var idx__8836 = cljs.core.array_map_index_of.call(null, tcoll, key);
    if(idx__8836 === -1) {
      if(this__8835.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
        this__8835.len = this__8835.len + 2;
        this__8835.arr.push(key);
        this__8835.arr.push(val);
        return tcoll
      }else {
        return cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this__8835.len, this__8835.arr), key, val)
      }
    }else {
      if(val === this__8835.arr[idx__8836 + 1]) {
        return tcoll
      }else {
        this__8835.arr[idx__8836 + 1] = val;
        return tcoll
      }
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__8837 = this;
  if(cljs.core.truth_(this__8837.editable_QMARK_)) {
    if(function() {
      var G__8838__8839 = o;
      if(G__8838__8839) {
        if(function() {
          var or__3824__auto____8840 = G__8838__8839.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____8840) {
            return or__3824__auto____8840
          }else {
            return G__8838__8839.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__8838__8839.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8838__8839)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__8838__8839)
      }
    }()) {
      return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll, cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__8841 = cljs.core.seq.call(null, o);
      var tcoll__8842 = tcoll;
      while(true) {
        var temp__3971__auto____8843 = cljs.core.first.call(null, es__8841);
        if(cljs.core.truth_(temp__3971__auto____8843)) {
          var e__8844 = temp__3971__auto____8843;
          var G__8850 = cljs.core.next.call(null, es__8841);
          var G__8851 = tcoll__8842.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__8842, cljs.core.key.call(null, e__8844), cljs.core.val.call(null, e__8844));
          es__8841 = G__8850;
          tcoll__8842 = G__8851;
          continue
        }else {
          return tcoll__8842
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__8845 = this;
  if(cljs.core.truth_(this__8845.editable_QMARK_)) {
    this__8845.editable_QMARK_ = false;
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this__8845.len, 2), this__8845.arr, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__8846 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, k, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__8847 = this;
  if(cljs.core.truth_(this__8847.editable_QMARK_)) {
    var idx__8848 = cljs.core.array_map_index_of.call(null, tcoll, k);
    if(idx__8848 === -1) {
      return not_found
    }else {
      return this__8847.arr[idx__8848 + 1]
    }
  }else {
    throw new Error("lookup after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__8849 = this;
  if(cljs.core.truth_(this__8849.editable_QMARK_)) {
    return cljs.core.quot.call(null, this__8849.len, 2)
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = function array__GT_transient_hash_map(len, arr) {
  var out__8854 = cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY);
  var i__8855 = 0;
  while(true) {
    if(i__8855 < len) {
      var G__8856 = cljs.core.assoc_BANG_.call(null, out__8854, arr[i__8855], arr[i__8855 + 1]);
      var G__8857 = i__8855 + 2;
      out__8854 = G__8856;
      i__8855 = G__8857;
      continue
    }else {
      return out__8854
    }
    break
  }
};
cljs.core.Box = function(val) {
  this.val = val
};
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = function(this__2310__auto__) {
  return cljs.core.list.call(null, "cljs.core/Box")
};
cljs.core.Box;
cljs.core.key_test = function key_test(key, other) {
  if(goog.isString(key)) {
    return key === other
  }else {
    return cljs.core._EQ_.call(null, key, other)
  }
};
cljs.core.mask = function mask(hash, shift) {
  return hash >>> shift & 31
};
cljs.core.clone_and_set = function() {
  var clone_and_set = null;
  var clone_and_set__3 = function(arr, i, a) {
    var G__8862__8863 = arr.slice();
    G__8862__8863[i] = a;
    return G__8862__8863
  };
  var clone_and_set__5 = function(arr, i, a, j, b) {
    var G__8864__8865 = arr.slice();
    G__8864__8865[i] = a;
    G__8864__8865[j] = b;
    return G__8864__8865
  };
  clone_and_set = function(arr, i, a, j, b) {
    switch(arguments.length) {
      case 3:
        return clone_and_set__3.call(this, arr, i, a);
      case 5:
        return clone_and_set__5.call(this, arr, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
  clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
  return clone_and_set
}();
cljs.core.remove_pair = function remove_pair(arr, i) {
  var new_arr__8867 = cljs.core.make_array.call(null, arr.length - 2);
  cljs.core.array_copy.call(null, arr, 0, new_arr__8867, 0, 2 * i);
  cljs.core.array_copy.call(null, arr, 2 * (i + 1), new_arr__8867, 2 * i, new_arr__8867.length - 2 * i);
  return new_arr__8867
};
cljs.core.bitmap_indexed_node_index = function bitmap_indexed_node_index(bitmap, bit) {
  return cljs.core.bit_count.call(null, bitmap & bit - 1)
};
cljs.core.bitpos = function bitpos(hash, shift) {
  return 1 << (hash >>> shift & 31)
};
cljs.core.edit_and_set = function() {
  var edit_and_set = null;
  var edit_and_set__4 = function(inode, edit, i, a) {
    var editable__8870 = inode.ensure_editable(edit);
    editable__8870.arr[i] = a;
    return editable__8870
  };
  var edit_and_set__6 = function(inode, edit, i, a, j, b) {
    var editable__8871 = inode.ensure_editable(edit);
    editable__8871.arr[i] = a;
    editable__8871.arr[j] = b;
    return editable__8871
  };
  edit_and_set = function(inode, edit, i, a, j, b) {
    switch(arguments.length) {
      case 4:
        return edit_and_set__4.call(this, inode, edit, i, a);
      case 6:
        return edit_and_set__6.call(this, inode, edit, i, a, j, b)
    }
    throw"Invalid arity: " + arguments.length;
  };
  edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
  edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
  return edit_and_set
}();
cljs.core.inode_kv_reduce = function inode_kv_reduce(arr, f, init) {
  var len__8878 = arr.length;
  var i__8879 = 0;
  var init__8880 = init;
  while(true) {
    if(i__8879 < len__8878) {
      var init__8883 = function() {
        var k__8881 = arr[i__8879];
        if(!(k__8881 == null)) {
          return f.call(null, init__8880, k__8881, arr[i__8879 + 1])
        }else {
          var node__8882 = arr[i__8879 + 1];
          if(!(node__8882 == null)) {
            return node__8882.kv_reduce(f, init__8880)
          }else {
            return init__8880
          }
        }
      }();
      if(cljs.core.reduced_QMARK_.call(null, init__8883)) {
        return cljs.core.deref.call(null, init__8883)
      }else {
        var G__8884 = i__8879 + 2;
        var G__8885 = init__8883;
        i__8879 = G__8884;
        init__8880 = G__8885;
        continue
      }
    }else {
      return init__8880
    }
    break
  }
};
cljs.core.BitmapIndexedNode = function(edit, bitmap, arr) {
  this.edit = edit;
  this.bitmap = bitmap;
  this.arr = arr
};
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(e, bit, i) {
  var this__8886 = this;
  var inode__8887 = this;
  if(this__8886.bitmap === bit) {
    return null
  }else {
    var editable__8888 = inode__8887.ensure_editable(e);
    var earr__8889 = editable__8888.arr;
    var len__8890 = earr__8889.length;
    editable__8888.bitmap = bit ^ editable__8888.bitmap;
    cljs.core.array_copy.call(null, earr__8889, 2 * (i + 1), earr__8889, 2 * i, len__8890 - 2 * (i + 1));
    earr__8889[len__8890 - 2] = null;
    earr__8889[len__8890 - 1] = null;
    return editable__8888
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8891 = this;
  var inode__8892 = this;
  var bit__8893 = 1 << (hash >>> shift & 31);
  var idx__8894 = cljs.core.bitmap_indexed_node_index.call(null, this__8891.bitmap, bit__8893);
  if((this__8891.bitmap & bit__8893) === 0) {
    var n__8895 = cljs.core.bit_count.call(null, this__8891.bitmap);
    if(2 * n__8895 < this__8891.arr.length) {
      var editable__8896 = inode__8892.ensure_editable(edit);
      var earr__8897 = editable__8896.arr;
      added_leaf_QMARK_.val = true;
      cljs.core.array_copy_downward.call(null, earr__8897, 2 * idx__8894, earr__8897, 2 * (idx__8894 + 1), 2 * (n__8895 - idx__8894));
      earr__8897[2 * idx__8894] = key;
      earr__8897[2 * idx__8894 + 1] = val;
      editable__8896.bitmap = editable__8896.bitmap | bit__8893;
      return editable__8896
    }else {
      if(n__8895 >= 16) {
        var nodes__8898 = cljs.core.make_array.call(null, 32);
        var jdx__8899 = hash >>> shift & 31;
        nodes__8898[jdx__8899] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
        var i__8900 = 0;
        var j__8901 = 0;
        while(true) {
          if(i__8900 < 32) {
            if((this__8891.bitmap >>> i__8900 & 1) === 0) {
              var G__8954 = i__8900 + 1;
              var G__8955 = j__8901;
              i__8900 = G__8954;
              j__8901 = G__8955;
              continue
            }else {
              nodes__8898[i__8900] = !(this__8891.arr[j__8901] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, cljs.core.hash.call(null, this__8891.arr[j__8901]), this__8891.arr[j__8901], this__8891.arr[j__8901 + 1], added_leaf_QMARK_) : this__8891.arr[j__8901 + 1];
              var G__8956 = i__8900 + 1;
              var G__8957 = j__8901 + 2;
              i__8900 = G__8956;
              j__8901 = G__8957;
              continue
            }
          }else {
          }
          break
        }
        return new cljs.core.ArrayNode(edit, n__8895 + 1, nodes__8898)
      }else {
        if("\ufdd0'else") {
          var new_arr__8902 = cljs.core.make_array.call(null, 2 * (n__8895 + 4));
          cljs.core.array_copy.call(null, this__8891.arr, 0, new_arr__8902, 0, 2 * idx__8894);
          new_arr__8902[2 * idx__8894] = key;
          new_arr__8902[2 * idx__8894 + 1] = val;
          cljs.core.array_copy.call(null, this__8891.arr, 2 * idx__8894, new_arr__8902, 2 * (idx__8894 + 1), 2 * (n__8895 - idx__8894));
          added_leaf_QMARK_.val = true;
          var editable__8903 = inode__8892.ensure_editable(edit);
          editable__8903.arr = new_arr__8902;
          editable__8903.bitmap = editable__8903.bitmap | bit__8893;
          return editable__8903
        }else {
          return null
        }
      }
    }
  }else {
    var key_or_nil__8904 = this__8891.arr[2 * idx__8894];
    var val_or_node__8905 = this__8891.arr[2 * idx__8894 + 1];
    if(key_or_nil__8904 == null) {
      var n__8906 = val_or_node__8905.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8906 === val_or_node__8905) {
        return inode__8892
      }else {
        return cljs.core.edit_and_set.call(null, inode__8892, edit, 2 * idx__8894 + 1, n__8906)
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8904)) {
        if(val === val_or_node__8905) {
          return inode__8892
        }else {
          return cljs.core.edit_and_set.call(null, inode__8892, edit, 2 * idx__8894 + 1, val)
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return cljs.core.edit_and_set.call(null, inode__8892, edit, 2 * idx__8894, null, 2 * idx__8894 + 1, cljs.core.create_node.call(null, edit, shift + 5, key_or_nil__8904, val_or_node__8905, hash, key, val))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  var this__8907 = this;
  var inode__8908 = this;
  return cljs.core.create_inode_seq.call(null, this__8907.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8909 = this;
  var inode__8910 = this;
  var bit__8911 = 1 << (hash >>> shift & 31);
  if((this__8909.bitmap & bit__8911) === 0) {
    return inode__8910
  }else {
    var idx__8912 = cljs.core.bitmap_indexed_node_index.call(null, this__8909.bitmap, bit__8911);
    var key_or_nil__8913 = this__8909.arr[2 * idx__8912];
    var val_or_node__8914 = this__8909.arr[2 * idx__8912 + 1];
    if(key_or_nil__8913 == null) {
      var n__8915 = val_or_node__8914.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
      if(n__8915 === val_or_node__8914) {
        return inode__8910
      }else {
        if(!(n__8915 == null)) {
          return cljs.core.edit_and_set.call(null, inode__8910, edit, 2 * idx__8912 + 1, n__8915)
        }else {
          if(this__8909.bitmap === bit__8911) {
            return null
          }else {
            if("\ufdd0'else") {
              return inode__8910.edit_and_remove_pair(edit, bit__8911, idx__8912)
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8913)) {
        removed_leaf_QMARK_[0] = true;
        return inode__8910.edit_and_remove_pair(edit, bit__8911, idx__8912)
      }else {
        if("\ufdd0'else") {
          return inode__8910
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(e) {
  var this__8916 = this;
  var inode__8917 = this;
  if(e === this__8916.edit) {
    return inode__8917
  }else {
    var n__8918 = cljs.core.bit_count.call(null, this__8916.bitmap);
    var new_arr__8919 = cljs.core.make_array.call(null, n__8918 < 0 ? 4 : 2 * (n__8918 + 1));
    cljs.core.array_copy.call(null, this__8916.arr, 0, new_arr__8919, 0, 2 * n__8918);
    return new cljs.core.BitmapIndexedNode(e, this__8916.bitmap, new_arr__8919)
  }
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(f, init) {
  var this__8920 = this;
  var inode__8921 = this;
  return cljs.core.inode_kv_reduce.call(null, this__8920.arr, f, init)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__8922 = this;
  var inode__8923 = this;
  var bit__8924 = 1 << (hash >>> shift & 31);
  if((this__8922.bitmap & bit__8924) === 0) {
    return not_found
  }else {
    var idx__8925 = cljs.core.bitmap_indexed_node_index.call(null, this__8922.bitmap, bit__8924);
    var key_or_nil__8926 = this__8922.arr[2 * idx__8925];
    var val_or_node__8927 = this__8922.arr[2 * idx__8925 + 1];
    if(key_or_nil__8926 == null) {
      return val_or_node__8927.inode_find(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8926)) {
        return cljs.core.PersistentVector.fromArray([key_or_nil__8926, val_or_node__8927], true)
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(shift, hash, key) {
  var this__8928 = this;
  var inode__8929 = this;
  var bit__8930 = 1 << (hash >>> shift & 31);
  if((this__8928.bitmap & bit__8930) === 0) {
    return inode__8929
  }else {
    var idx__8931 = cljs.core.bitmap_indexed_node_index.call(null, this__8928.bitmap, bit__8930);
    var key_or_nil__8932 = this__8928.arr[2 * idx__8931];
    var val_or_node__8933 = this__8928.arr[2 * idx__8931 + 1];
    if(key_or_nil__8932 == null) {
      var n__8934 = val_or_node__8933.inode_without(shift + 5, hash, key);
      if(n__8934 === val_or_node__8933) {
        return inode__8929
      }else {
        if(!(n__8934 == null)) {
          return new cljs.core.BitmapIndexedNode(null, this__8928.bitmap, cljs.core.clone_and_set.call(null, this__8928.arr, 2 * idx__8931 + 1, n__8934))
        }else {
          if(this__8928.bitmap === bit__8930) {
            return null
          }else {
            if("\ufdd0'else") {
              return new cljs.core.BitmapIndexedNode(null, this__8928.bitmap ^ bit__8930, cljs.core.remove_pair.call(null, this__8928.arr, idx__8931))
            }else {
              return null
            }
          }
        }
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8932)) {
        return new cljs.core.BitmapIndexedNode(null, this__8928.bitmap ^ bit__8930, cljs.core.remove_pair.call(null, this__8928.arr, idx__8931))
      }else {
        if("\ufdd0'else") {
          return inode__8929
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__8935 = this;
  var inode__8936 = this;
  var bit__8937 = 1 << (hash >>> shift & 31);
  var idx__8938 = cljs.core.bitmap_indexed_node_index.call(null, this__8935.bitmap, bit__8937);
  if((this__8935.bitmap & bit__8937) === 0) {
    var n__8939 = cljs.core.bit_count.call(null, this__8935.bitmap);
    if(n__8939 >= 16) {
      var nodes__8940 = cljs.core.make_array.call(null, 32);
      var jdx__8941 = hash >>> shift & 31;
      nodes__8940[jdx__8941] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      var i__8942 = 0;
      var j__8943 = 0;
      while(true) {
        if(i__8942 < 32) {
          if((this__8935.bitmap >>> i__8942 & 1) === 0) {
            var G__8958 = i__8942 + 1;
            var G__8959 = j__8943;
            i__8942 = G__8958;
            j__8943 = G__8959;
            continue
          }else {
            nodes__8940[i__8942] = !(this__8935.arr[j__8943] == null) ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, cljs.core.hash.call(null, this__8935.arr[j__8943]), this__8935.arr[j__8943], this__8935.arr[j__8943 + 1], added_leaf_QMARK_) : this__8935.arr[j__8943 + 1];
            var G__8960 = i__8942 + 1;
            var G__8961 = j__8943 + 2;
            i__8942 = G__8960;
            j__8943 = G__8961;
            continue
          }
        }else {
        }
        break
      }
      return new cljs.core.ArrayNode(null, n__8939 + 1, nodes__8940)
    }else {
      var new_arr__8944 = cljs.core.make_array.call(null, 2 * (n__8939 + 1));
      cljs.core.array_copy.call(null, this__8935.arr, 0, new_arr__8944, 0, 2 * idx__8938);
      new_arr__8944[2 * idx__8938] = key;
      new_arr__8944[2 * idx__8938 + 1] = val;
      cljs.core.array_copy.call(null, this__8935.arr, 2 * idx__8938, new_arr__8944, 2 * (idx__8938 + 1), 2 * (n__8939 - idx__8938));
      added_leaf_QMARK_.val = true;
      return new cljs.core.BitmapIndexedNode(null, this__8935.bitmap | bit__8937, new_arr__8944)
    }
  }else {
    var key_or_nil__8945 = this__8935.arr[2 * idx__8938];
    var val_or_node__8946 = this__8935.arr[2 * idx__8938 + 1];
    if(key_or_nil__8945 == null) {
      var n__8947 = val_or_node__8946.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
      if(n__8947 === val_or_node__8946) {
        return inode__8936
      }else {
        return new cljs.core.BitmapIndexedNode(null, this__8935.bitmap, cljs.core.clone_and_set.call(null, this__8935.arr, 2 * idx__8938 + 1, n__8947))
      }
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8945)) {
        if(val === val_or_node__8946) {
          return inode__8936
        }else {
          return new cljs.core.BitmapIndexedNode(null, this__8935.bitmap, cljs.core.clone_and_set.call(null, this__8935.arr, 2 * idx__8938 + 1, val))
        }
      }else {
        if("\ufdd0'else") {
          added_leaf_QMARK_.val = true;
          return new cljs.core.BitmapIndexedNode(null, this__8935.bitmap, cljs.core.clone_and_set.call(null, this__8935.arr, 2 * idx__8938, null, 2 * idx__8938 + 1, cljs.core.create_node.call(null, shift + 5, key_or_nil__8945, val_or_node__8946, hash, key, val)))
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__8948 = this;
  var inode__8949 = this;
  var bit__8950 = 1 << (hash >>> shift & 31);
  if((this__8948.bitmap & bit__8950) === 0) {
    return not_found
  }else {
    var idx__8951 = cljs.core.bitmap_indexed_node_index.call(null, this__8948.bitmap, bit__8950);
    var key_or_nil__8952 = this__8948.arr[2 * idx__8951];
    var val_or_node__8953 = this__8948.arr[2 * idx__8951 + 1];
    if(key_or_nil__8952 == null) {
      return val_or_node__8953.inode_lookup(shift + 5, hash, key, not_found)
    }else {
      if(cljs.core.key_test.call(null, key, key_or_nil__8952)) {
        return val_or_node__8953
      }else {
        if("\ufdd0'else") {
          return not_found
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, cljs.core.make_array.call(null, 0));
cljs.core.pack_array_node = function pack_array_node(array_node, edit, idx) {
  var arr__8969 = array_node.arr;
  var len__8970 = 2 * (array_node.cnt - 1);
  var new_arr__8971 = cljs.core.make_array.call(null, len__8970);
  var i__8972 = 0;
  var j__8973 = 1;
  var bitmap__8974 = 0;
  while(true) {
    if(i__8972 < len__8970) {
      if(function() {
        var and__3822__auto____8975 = !(i__8972 === idx);
        if(and__3822__auto____8975) {
          return!(arr__8969[i__8972] == null)
        }else {
          return and__3822__auto____8975
        }
      }()) {
        new_arr__8971[j__8973] = arr__8969[i__8972];
        var G__8976 = i__8972 + 1;
        var G__8977 = j__8973 + 2;
        var G__8978 = bitmap__8974 | 1 << i__8972;
        i__8972 = G__8976;
        j__8973 = G__8977;
        bitmap__8974 = G__8978;
        continue
      }else {
        var G__8979 = i__8972 + 1;
        var G__8980 = j__8973;
        var G__8981 = bitmap__8974;
        i__8972 = G__8979;
        j__8973 = G__8980;
        bitmap__8974 = G__8981;
        continue
      }
    }else {
      return new cljs.core.BitmapIndexedNode(edit, bitmap__8974, new_arr__8971)
    }
    break
  }
};
cljs.core.ArrayNode = function(edit, cnt, arr) {
  this.edit = edit;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__8982 = this;
  var inode__8983 = this;
  var idx__8984 = hash >>> shift & 31;
  var node__8985 = this__8982.arr[idx__8984];
  if(node__8985 == null) {
    var editable__8986 = cljs.core.edit_and_set.call(null, inode__8983, edit, idx__8984, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_));
    editable__8986.cnt = editable__8986.cnt + 1;
    return editable__8986
  }else {
    var n__8987 = node__8985.inode_assoc_BANG_(edit, shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__8987 === node__8985) {
      return inode__8983
    }else {
      return cljs.core.edit_and_set.call(null, inode__8983, edit, idx__8984, n__8987)
    }
  }
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  var this__8988 = this;
  var inode__8989 = this;
  return cljs.core.create_array_node_seq.call(null, this__8988.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__8990 = this;
  var inode__8991 = this;
  var idx__8992 = hash >>> shift & 31;
  var node__8993 = this__8990.arr[idx__8992];
  if(node__8993 == null) {
    return inode__8991
  }else {
    var n__8994 = node__8993.inode_without_BANG_(edit, shift + 5, hash, key, removed_leaf_QMARK_);
    if(n__8994 === node__8993) {
      return inode__8991
    }else {
      if(n__8994 == null) {
        if(this__8990.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__8991, edit, idx__8992)
        }else {
          var editable__8995 = cljs.core.edit_and_set.call(null, inode__8991, edit, idx__8992, n__8994);
          editable__8995.cnt = editable__8995.cnt - 1;
          return editable__8995
        }
      }else {
        if("\ufdd0'else") {
          return cljs.core.edit_and_set.call(null, inode__8991, edit, idx__8992, n__8994)
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.ArrayNode.prototype.ensure_editable = function(e) {
  var this__8996 = this;
  var inode__8997 = this;
  if(e === this__8996.edit) {
    return inode__8997
  }else {
    return new cljs.core.ArrayNode(e, this__8996.cnt, this__8996.arr.slice())
  }
};
cljs.core.ArrayNode.prototype.kv_reduce = function(f, init) {
  var this__8998 = this;
  var inode__8999 = this;
  var len__9000 = this__8998.arr.length;
  var i__9001 = 0;
  var init__9002 = init;
  while(true) {
    if(i__9001 < len__9000) {
      var node__9003 = this__8998.arr[i__9001];
      if(!(node__9003 == null)) {
        var init__9004 = node__9003.kv_reduce(f, init__9002);
        if(cljs.core.reduced_QMARK_.call(null, init__9004)) {
          return cljs.core.deref.call(null, init__9004)
        }else {
          var G__9023 = i__9001 + 1;
          var G__9024 = init__9004;
          i__9001 = G__9023;
          init__9002 = G__9024;
          continue
        }
      }else {
        return null
      }
    }else {
      return init__9002
    }
    break
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__9005 = this;
  var inode__9006 = this;
  var idx__9007 = hash >>> shift & 31;
  var node__9008 = this__9005.arr[idx__9007];
  if(!(node__9008 == null)) {
    return node__9008.inode_find(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode.prototype.inode_without = function(shift, hash, key) {
  var this__9009 = this;
  var inode__9010 = this;
  var idx__9011 = hash >>> shift & 31;
  var node__9012 = this__9009.arr[idx__9011];
  if(!(node__9012 == null)) {
    var n__9013 = node__9012.inode_without(shift + 5, hash, key);
    if(n__9013 === node__9012) {
      return inode__9010
    }else {
      if(n__9013 == null) {
        if(this__9009.cnt <= 8) {
          return cljs.core.pack_array_node.call(null, inode__9010, null, idx__9011)
        }else {
          return new cljs.core.ArrayNode(null, this__9009.cnt - 1, cljs.core.clone_and_set.call(null, this__9009.arr, idx__9011, n__9013))
        }
      }else {
        if("\ufdd0'else") {
          return new cljs.core.ArrayNode(null, this__9009.cnt, cljs.core.clone_and_set.call(null, this__9009.arr, idx__9011, n__9013))
        }else {
          return null
        }
      }
    }
  }else {
    return inode__9010
  }
};
cljs.core.ArrayNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__9014 = this;
  var inode__9015 = this;
  var idx__9016 = hash >>> shift & 31;
  var node__9017 = this__9014.arr[idx__9016];
  if(node__9017 == null) {
    return new cljs.core.ArrayNode(null, this__9014.cnt + 1, cljs.core.clone_and_set.call(null, this__9014.arr, idx__9016, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_)))
  }else {
    var n__9018 = node__9017.inode_assoc(shift + 5, hash, key, val, added_leaf_QMARK_);
    if(n__9018 === node__9017) {
      return inode__9015
    }else {
      return new cljs.core.ArrayNode(null, this__9014.cnt, cljs.core.clone_and_set.call(null, this__9014.arr, idx__9016, n__9018))
    }
  }
};
cljs.core.ArrayNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__9019 = this;
  var inode__9020 = this;
  var idx__9021 = hash >>> shift & 31;
  var node__9022 = this__9019.arr[idx__9021];
  if(!(node__9022 == null)) {
    return node__9022.inode_lookup(shift + 5, hash, key, not_found)
  }else {
    return not_found
  }
};
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = function hash_collision_node_find_index(arr, cnt, key) {
  var lim__9027 = 2 * cnt;
  var i__9028 = 0;
  while(true) {
    if(i__9028 < lim__9027) {
      if(cljs.core.key_test.call(null, key, arr[i__9028])) {
        return i__9028
      }else {
        var G__9029 = i__9028 + 2;
        i__9028 = G__9029;
        continue
      }
    }else {
      return-1
    }
    break
  }
};
cljs.core.HashCollisionNode = function(edit, collision_hash, cnt, arr) {
  this.edit = edit;
  this.collision_hash = collision_hash;
  this.cnt = cnt;
  this.arr = arr
};
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(edit, shift, hash, key, val, added_leaf_QMARK_) {
  var this__9030 = this;
  var inode__9031 = this;
  if(hash === this__9030.collision_hash) {
    var idx__9032 = cljs.core.hash_collision_node_find_index.call(null, this__9030.arr, this__9030.cnt, key);
    if(idx__9032 === -1) {
      if(this__9030.arr.length > 2 * this__9030.cnt) {
        var editable__9033 = cljs.core.edit_and_set.call(null, inode__9031, edit, 2 * this__9030.cnt, key, 2 * this__9030.cnt + 1, val);
        added_leaf_QMARK_.val = true;
        editable__9033.cnt = editable__9033.cnt + 1;
        return editable__9033
      }else {
        var len__9034 = this__9030.arr.length;
        var new_arr__9035 = cljs.core.make_array.call(null, len__9034 + 2);
        cljs.core.array_copy.call(null, this__9030.arr, 0, new_arr__9035, 0, len__9034);
        new_arr__9035[len__9034] = key;
        new_arr__9035[len__9034 + 1] = val;
        added_leaf_QMARK_.val = true;
        return inode__9031.ensure_editable_array(edit, this__9030.cnt + 1, new_arr__9035)
      }
    }else {
      if(this__9030.arr[idx__9032 + 1] === val) {
        return inode__9031
      }else {
        return cljs.core.edit_and_set.call(null, inode__9031, edit, idx__9032 + 1, val)
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(edit, 1 << (this__9030.collision_hash >>> shift & 31), [null, inode__9031, null, null])).inode_assoc_BANG_(edit, shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  var this__9036 = this;
  var inode__9037 = this;
  return cljs.core.create_inode_seq.call(null, this__9036.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(edit, shift, hash, key, removed_leaf_QMARK_) {
  var this__9038 = this;
  var inode__9039 = this;
  var idx__9040 = cljs.core.hash_collision_node_find_index.call(null, this__9038.arr, this__9038.cnt, key);
  if(idx__9040 === -1) {
    return inode__9039
  }else {
    removed_leaf_QMARK_[0] = true;
    if(this__9038.cnt === 1) {
      return null
    }else {
      var editable__9041 = inode__9039.ensure_editable(edit);
      var earr__9042 = editable__9041.arr;
      earr__9042[idx__9040] = earr__9042[2 * this__9038.cnt - 2];
      earr__9042[idx__9040 + 1] = earr__9042[2 * this__9038.cnt - 1];
      earr__9042[2 * this__9038.cnt - 1] = null;
      earr__9042[2 * this__9038.cnt - 2] = null;
      editable__9041.cnt = editable__9041.cnt - 1;
      return editable__9041
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(e) {
  var this__9043 = this;
  var inode__9044 = this;
  if(e === this__9043.edit) {
    return inode__9044
  }else {
    var new_arr__9045 = cljs.core.make_array.call(null, 2 * (this__9043.cnt + 1));
    cljs.core.array_copy.call(null, this__9043.arr, 0, new_arr__9045, 0, 2 * this__9043.cnt);
    return new cljs.core.HashCollisionNode(e, this__9043.collision_hash, this__9043.cnt, new_arr__9045)
  }
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(f, init) {
  var this__9046 = this;
  var inode__9047 = this;
  return cljs.core.inode_kv_reduce.call(null, this__9046.arr, f, init)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(shift, hash, key, not_found) {
  var this__9048 = this;
  var inode__9049 = this;
  var idx__9050 = cljs.core.hash_collision_node_find_index.call(null, this__9048.arr, this__9048.cnt, key);
  if(idx__9050 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__9048.arr[idx__9050])) {
      return cljs.core.PersistentVector.fromArray([this__9048.arr[idx__9050], this__9048.arr[idx__9050 + 1]], true)
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_without = function(shift, hash, key) {
  var this__9051 = this;
  var inode__9052 = this;
  var idx__9053 = cljs.core.hash_collision_node_find_index.call(null, this__9051.arr, this__9051.cnt, key);
  if(idx__9053 === -1) {
    return inode__9052
  }else {
    if(this__9051.cnt === 1) {
      return null
    }else {
      if("\ufdd0'else") {
        return new cljs.core.HashCollisionNode(null, this__9051.collision_hash, this__9051.cnt - 1, cljs.core.remove_pair.call(null, this__9051.arr, cljs.core.quot.call(null, idx__9053, 2)))
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(shift, hash, key, val, added_leaf_QMARK_) {
  var this__9054 = this;
  var inode__9055 = this;
  if(hash === this__9054.collision_hash) {
    var idx__9056 = cljs.core.hash_collision_node_find_index.call(null, this__9054.arr, this__9054.cnt, key);
    if(idx__9056 === -1) {
      var len__9057 = this__9054.arr.length;
      var new_arr__9058 = cljs.core.make_array.call(null, len__9057 + 2);
      cljs.core.array_copy.call(null, this__9054.arr, 0, new_arr__9058, 0, len__9057);
      new_arr__9058[len__9057] = key;
      new_arr__9058[len__9057 + 1] = val;
      added_leaf_QMARK_.val = true;
      return new cljs.core.HashCollisionNode(null, this__9054.collision_hash, this__9054.cnt + 1, new_arr__9058)
    }else {
      if(cljs.core._EQ_.call(null, this__9054.arr[idx__9056], val)) {
        return inode__9055
      }else {
        return new cljs.core.HashCollisionNode(null, this__9054.collision_hash, this__9054.cnt, cljs.core.clone_and_set.call(null, this__9054.arr, idx__9056 + 1, val))
      }
    }
  }else {
    return(new cljs.core.BitmapIndexedNode(null, 1 << (this__9054.collision_hash >>> shift & 31), [null, inode__9055])).inode_assoc(shift, hash, key, val, added_leaf_QMARK_)
  }
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(shift, hash, key, not_found) {
  var this__9059 = this;
  var inode__9060 = this;
  var idx__9061 = cljs.core.hash_collision_node_find_index.call(null, this__9059.arr, this__9059.cnt, key);
  if(idx__9061 < 0) {
    return not_found
  }else {
    if(cljs.core.key_test.call(null, key, this__9059.arr[idx__9061])) {
      return this__9059.arr[idx__9061 + 1]
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(e, count, array) {
  var this__9062 = this;
  var inode__9063 = this;
  if(e === this__9062.edit) {
    this__9062.arr = array;
    this__9062.cnt = count;
    return inode__9063
  }else {
    return new cljs.core.HashCollisionNode(this__9062.edit, this__9062.collision_hash, count, array)
  }
};
cljs.core.HashCollisionNode;
cljs.core.create_node = function() {
  var create_node = null;
  var create_node__6 = function(shift, key1, val1, key2hash, key2, val2) {
    var key1hash__9068 = cljs.core.hash.call(null, key1);
    if(key1hash__9068 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__9068, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___9069 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift, key1hash__9068, key1, val1, added_leaf_QMARK___9069).inode_assoc(shift, key2hash, key2, val2, added_leaf_QMARK___9069)
    }
  };
  var create_node__7 = function(edit, shift, key1, val1, key2hash, key2, val2) {
    var key1hash__9070 = cljs.core.hash.call(null, key1);
    if(key1hash__9070 === key2hash) {
      return new cljs.core.HashCollisionNode(null, key1hash__9070, 2, [key1, val1, key2, val2])
    }else {
      var added_leaf_QMARK___9071 = new cljs.core.Box(false);
      return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit, shift, key1hash__9070, key1, val1, added_leaf_QMARK___9071).inode_assoc_BANG_(edit, shift, key2hash, key2, val2, added_leaf_QMARK___9071)
    }
  };
  create_node = function(edit, shift, key1, val1, key2hash, key2, val2) {
    switch(arguments.length) {
      case 6:
        return create_node__6.call(this, edit, shift, key1, val1, key2hash, key2);
      case 7:
        return create_node__7.call(this, edit, shift, key1, val1, key2hash, key2, val2)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_node.cljs$lang$arity$6 = create_node__6;
  create_node.cljs$lang$arity$7 = create_node__7;
  return create_node
}();
cljs.core.NodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9072 = this;
  var h__2192__auto____9073 = this__9072.__hash;
  if(!(h__2192__auto____9073 == null)) {
    return h__2192__auto____9073
  }else {
    var h__2192__auto____9074 = cljs.core.hash_coll.call(null, coll);
    this__9072.__hash = h__2192__auto____9074;
    return h__2192__auto____9074
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9075 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.NodeSeq.prototype.toString = function() {
  var this__9076 = this;
  var this__9077 = this;
  return cljs.core.pr_str.call(null, this__9077)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9078 = this;
  return this$
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9079 = this;
  if(this__9079.s == null) {
    return cljs.core.PersistentVector.fromArray([this__9079.nodes[this__9079.i], this__9079.nodes[this__9079.i + 1]], true)
  }else {
    return cljs.core.first.call(null, this__9079.s)
  }
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9080 = this;
  if(this__9080.s == null) {
    return cljs.core.create_inode_seq.call(null, this__9080.nodes, this__9080.i + 2, null)
  }else {
    return cljs.core.create_inode_seq.call(null, this__9080.nodes, this__9080.i, cljs.core.next.call(null, this__9080.s))
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9081 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9082 = this;
  return new cljs.core.NodeSeq(meta, this__9082.nodes, this__9082.i, this__9082.s, this__9082.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9083 = this;
  return this__9083.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9084 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9084.meta)
};
cljs.core.NodeSeq;
cljs.core.create_inode_seq = function() {
  var create_inode_seq = null;
  var create_inode_seq__1 = function(nodes) {
    return create_inode_seq.call(null, nodes, 0, null)
  };
  var create_inode_seq__3 = function(nodes, i, s) {
    if(s == null) {
      var len__9091 = nodes.length;
      var j__9092 = i;
      while(true) {
        if(j__9092 < len__9091) {
          if(!(nodes[j__9092] == null)) {
            return new cljs.core.NodeSeq(null, nodes, j__9092, null, null)
          }else {
            var temp__3971__auto____9093 = nodes[j__9092 + 1];
            if(cljs.core.truth_(temp__3971__auto____9093)) {
              var node__9094 = temp__3971__auto____9093;
              var temp__3971__auto____9095 = node__9094.inode_seq();
              if(cljs.core.truth_(temp__3971__auto____9095)) {
                var node_seq__9096 = temp__3971__auto____9095;
                return new cljs.core.NodeSeq(null, nodes, j__9092 + 2, node_seq__9096, null)
              }else {
                var G__9097 = j__9092 + 2;
                j__9092 = G__9097;
                continue
              }
            }else {
              var G__9098 = j__9092 + 2;
              j__9092 = G__9098;
              continue
            }
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.NodeSeq(null, nodes, i, s, null)
    }
  };
  create_inode_seq = function(nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_inode_seq__1.call(this, nodes);
      case 3:
        return create_inode_seq__3.call(this, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
  create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
  return create_inode_seq
}();
cljs.core.ArrayNodeSeq = function(meta, nodes, i, s, __hash) {
  this.meta = meta;
  this.nodes = nodes;
  this.i = i;
  this.s = s;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9099 = this;
  var h__2192__auto____9100 = this__9099.__hash;
  if(!(h__2192__auto____9100 == null)) {
    return h__2192__auto____9100
  }else {
    var h__2192__auto____9101 = cljs.core.hash_coll.call(null, coll);
    this__9099.__hash = h__2192__auto____9101;
    return h__2192__auto____9101
  }
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9102 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  var this__9103 = this;
  var this__9104 = this;
  return cljs.core.pr_str.call(null, this__9104)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9105 = this;
  return this$
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(coll) {
  var this__9106 = this;
  return cljs.core.first.call(null, this__9106.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(coll) {
  var this__9107 = this;
  return cljs.core.create_array_node_seq.call(null, null, this__9107.nodes, this__9107.i, cljs.core.next.call(null, this__9107.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9108 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9109 = this;
  return new cljs.core.ArrayNodeSeq(meta, this__9109.nodes, this__9109.i, this__9109.s, this__9109.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9110 = this;
  return this__9110.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9111 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9111.meta)
};
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = function() {
  var create_array_node_seq = null;
  var create_array_node_seq__1 = function(nodes) {
    return create_array_node_seq.call(null, null, nodes, 0, null)
  };
  var create_array_node_seq__4 = function(meta, nodes, i, s) {
    if(s == null) {
      var len__9118 = nodes.length;
      var j__9119 = i;
      while(true) {
        if(j__9119 < len__9118) {
          var temp__3971__auto____9120 = nodes[j__9119];
          if(cljs.core.truth_(temp__3971__auto____9120)) {
            var nj__9121 = temp__3971__auto____9120;
            var temp__3971__auto____9122 = nj__9121.inode_seq();
            if(cljs.core.truth_(temp__3971__auto____9122)) {
              var ns__9123 = temp__3971__auto____9122;
              return new cljs.core.ArrayNodeSeq(meta, nodes, j__9119 + 1, ns__9123, null)
            }else {
              var G__9124 = j__9119 + 1;
              j__9119 = G__9124;
              continue
            }
          }else {
            var G__9125 = j__9119 + 1;
            j__9119 = G__9125;
            continue
          }
        }else {
          return null
        }
        break
      }
    }else {
      return new cljs.core.ArrayNodeSeq(meta, nodes, i, s, null)
    }
  };
  create_array_node_seq = function(meta, nodes, i, s) {
    switch(arguments.length) {
      case 1:
        return create_array_node_seq__1.call(this, meta);
      case 4:
        return create_array_node_seq__4.call(this, meta, nodes, i, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
  create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
  return create_array_node_seq
}();
cljs.core.PersistentHashMap = function(meta, cnt, root, has_nil_QMARK_, nil_val, __hash) {
  this.meta = meta;
  this.cnt = cnt;
  this.root = root;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9128 = this;
  return new cljs.core.TransientHashMap({}, this__9128.root, this__9128.cnt, this__9128.has_nil_QMARK_, this__9128.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9129 = this;
  var h__2192__auto____9130 = this__9129.__hash;
  if(!(h__2192__auto____9130 == null)) {
    return h__2192__auto____9130
  }else {
    var h__2192__auto____9131 = cljs.core.hash_imap.call(null, coll);
    this__9129.__hash = h__2192__auto____9131;
    return h__2192__auto____9131
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9132 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9133 = this;
  if(k == null) {
    if(this__9133.has_nil_QMARK_) {
      return this__9133.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__9133.root == null) {
      return not_found
    }else {
      if("\ufdd0'else") {
        return this__9133.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9134 = this;
  if(k == null) {
    if(function() {
      var and__3822__auto____9135 = this__9134.has_nil_QMARK_;
      if(and__3822__auto____9135) {
        return v === this__9134.nil_val
      }else {
        return and__3822__auto____9135
      }
    }()) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__9134.meta, this__9134.has_nil_QMARK_ ? this__9134.cnt : this__9134.cnt + 1, this__9134.root, true, v, null)
    }
  }else {
    var added_leaf_QMARK___9136 = new cljs.core.Box(false);
    var new_root__9137 = (this__9134.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__9134.root).inode_assoc(0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___9136);
    if(new_root__9137 === this__9134.root) {
      return coll
    }else {
      return new cljs.core.PersistentHashMap(this__9134.meta, added_leaf_QMARK___9136.val ? this__9134.cnt + 1 : this__9134.cnt, new_root__9137, this__9134.has_nil_QMARK_, this__9134.nil_val, null)
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9138 = this;
  if(k == null) {
    return this__9138.has_nil_QMARK_
  }else {
    if(this__9138.root == null) {
      return false
    }else {
      if("\ufdd0'else") {
        return!(this__9138.root.inode_lookup(0, cljs.core.hash.call(null, k), k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var G__9161 = null;
  var G__9161__2 = function(this_sym9139, k) {
    var this__9141 = this;
    var this_sym9139__9142 = this;
    var coll__9143 = this_sym9139__9142;
    return coll__9143.cljs$core$ILookup$_lookup$arity$2(coll__9143, k)
  };
  var G__9161__3 = function(this_sym9140, k, not_found) {
    var this__9141 = this;
    var this_sym9140__9144 = this;
    var coll__9145 = this_sym9140__9144;
    return coll__9145.cljs$core$ILookup$_lookup$arity$3(coll__9145, k, not_found)
  };
  G__9161 = function(this_sym9140, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9161__2.call(this, this_sym9140, k);
      case 3:
        return G__9161__3.call(this, this_sym9140, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9161
}();
cljs.core.PersistentHashMap.prototype.apply = function(this_sym9126, args9127) {
  var this__9146 = this;
  return this_sym9126.call.apply(this_sym9126, [this_sym9126].concat(args9127.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9147 = this;
  var init__9148 = this__9147.has_nil_QMARK_ ? f.call(null, init, null, this__9147.nil_val) : init;
  if(cljs.core.reduced_QMARK_.call(null, init__9148)) {
    return cljs.core.deref.call(null, init__9148)
  }else {
    if(!(this__9147.root == null)) {
      return this__9147.root.kv_reduce(f, init__9148)
    }else {
      if("\ufdd0'else") {
        return init__9148
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9149 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  var this__9150 = this;
  var this__9151 = this;
  return cljs.core.pr_str.call(null, this__9151)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9152 = this;
  if(this__9152.cnt > 0) {
    var s__9153 = !(this__9152.root == null) ? this__9152.root.inode_seq() : null;
    if(this__9152.has_nil_QMARK_) {
      return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this__9152.nil_val], true), s__9153)
    }else {
      return s__9153
    }
  }else {
    return null
  }
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9154 = this;
  return this__9154.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9155 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9156 = this;
  return new cljs.core.PersistentHashMap(meta, this__9156.cnt, this__9156.root, this__9156.has_nil_QMARK_, this__9156.nil_val, this__9156.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9157 = this;
  return this__9157.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9158 = this;
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this__9158.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9159 = this;
  if(k == null) {
    if(this__9159.has_nil_QMARK_) {
      return new cljs.core.PersistentHashMap(this__9159.meta, this__9159.cnt - 1, this__9159.root, false, null, null)
    }else {
      return coll
    }
  }else {
    if(this__9159.root == null) {
      return coll
    }else {
      if("\ufdd0'else") {
        var new_root__9160 = this__9159.root.inode_without(0, cljs.core.hash.call(null, k), k);
        if(new_root__9160 === this__9159.root) {
          return coll
        }else {
          return new cljs.core.PersistentHashMap(this__9159.meta, this__9159.cnt - 1, new_root__9160, this__9159.has_nil_QMARK_, this__9159.nil_val, null)
        }
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, false, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(ks, vs) {
  var len__9162 = ks.length;
  var i__9163 = 0;
  var out__9164 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
  while(true) {
    if(i__9163 < len__9162) {
      var G__9165 = i__9163 + 1;
      var G__9166 = cljs.core.assoc_BANG_.call(null, out__9164, ks[i__9163], vs[i__9163]);
      i__9163 = G__9165;
      out__9164 = G__9166;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9164)
    }
    break
  }
};
cljs.core.TransientHashMap = function(edit, root, count, has_nil_QMARK_, nil_val) {
  this.edit = edit;
  this.root = root;
  this.count = count;
  this.has_nil_QMARK_ = has_nil_QMARK_;
  this.nil_val = nil_val;
  this.cljs$lang$protocol_mask$partition1$ = 14;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(tcoll, key) {
  var this__9167 = this;
  return tcoll.without_BANG_(key)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(tcoll, key, val) {
  var this__9168 = this;
  return tcoll.assoc_BANG_(key, val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, val) {
  var this__9169 = this;
  return tcoll.conj_BANG_(val)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9170 = this;
  return tcoll.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, k) {
  var this__9171 = this;
  if(k == null) {
    if(this__9171.has_nil_QMARK_) {
      return this__9171.nil_val
    }else {
      return null
    }
  }else {
    if(this__9171.root == null) {
      return null
    }else {
      return this__9171.root.inode_lookup(0, cljs.core.hash.call(null, k), k)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, k, not_found) {
  var this__9172 = this;
  if(k == null) {
    if(this__9172.has_nil_QMARK_) {
      return this__9172.nil_val
    }else {
      return not_found
    }
  }else {
    if(this__9172.root == null) {
      return not_found
    }else {
      return this__9172.root.inode_lookup(0, cljs.core.hash.call(null, k), k, not_found)
    }
  }
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9173 = this;
  if(this__9173.edit) {
    return this__9173.count
  }else {
    throw new Error("count after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(o) {
  var this__9174 = this;
  var tcoll__9175 = this;
  if(this__9174.edit) {
    if(function() {
      var G__9176__9177 = o;
      if(G__9176__9177) {
        if(function() {
          var or__3824__auto____9178 = G__9176__9177.cljs$lang$protocol_mask$partition0$ & 2048;
          if(or__3824__auto____9178) {
            return or__3824__auto____9178
          }else {
            return G__9176__9177.cljs$core$IMapEntry$
          }
        }()) {
          return true
        }else {
          if(!G__9176__9177.cljs$lang$protocol_mask$partition0$) {
            return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9176__9177)
          }else {
            return false
          }
        }
      }else {
        return cljs.core.type_satisfies_.call(null, cljs.core.IMapEntry, G__9176__9177)
      }
    }()) {
      return tcoll__9175.assoc_BANG_(cljs.core.key.call(null, o), cljs.core.val.call(null, o))
    }else {
      var es__9179 = cljs.core.seq.call(null, o);
      var tcoll__9180 = tcoll__9175;
      while(true) {
        var temp__3971__auto____9181 = cljs.core.first.call(null, es__9179);
        if(cljs.core.truth_(temp__3971__auto____9181)) {
          var e__9182 = temp__3971__auto____9181;
          var G__9193 = cljs.core.next.call(null, es__9179);
          var G__9194 = tcoll__9180.assoc_BANG_(cljs.core.key.call(null, e__9182), cljs.core.val.call(null, e__9182));
          es__9179 = G__9193;
          tcoll__9180 = G__9194;
          continue
        }else {
          return tcoll__9180
        }
        break
      }
    }
  }else {
    throw new Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(k, v) {
  var this__9183 = this;
  var tcoll__9184 = this;
  if(this__9183.edit) {
    if(k == null) {
      if(this__9183.nil_val === v) {
      }else {
        this__9183.nil_val = v
      }
      if(this__9183.has_nil_QMARK_) {
      }else {
        this__9183.count = this__9183.count + 1;
        this__9183.has_nil_QMARK_ = true
      }
      return tcoll__9184
    }else {
      var added_leaf_QMARK___9185 = new cljs.core.Box(false);
      var node__9186 = (this__9183.root == null ? cljs.core.BitmapIndexedNode.EMPTY : this__9183.root).inode_assoc_BANG_(this__9183.edit, 0, cljs.core.hash.call(null, k), k, v, added_leaf_QMARK___9185);
      if(node__9186 === this__9183.root) {
      }else {
        this__9183.root = node__9186
      }
      if(added_leaf_QMARK___9185.val) {
        this__9183.count = this__9183.count + 1
      }else {
      }
      return tcoll__9184
    }
  }else {
    throw new Error("assoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(k) {
  var this__9187 = this;
  var tcoll__9188 = this;
  if(this__9187.edit) {
    if(k == null) {
      if(this__9187.has_nil_QMARK_) {
        this__9187.has_nil_QMARK_ = false;
        this__9187.nil_val = null;
        this__9187.count = this__9187.count - 1;
        return tcoll__9188
      }else {
        return tcoll__9188
      }
    }else {
      if(this__9187.root == null) {
        return tcoll__9188
      }else {
        var removed_leaf_QMARK___9189 = new cljs.core.Box(false);
        var node__9190 = this__9187.root.inode_without_BANG_(this__9187.edit, 0, cljs.core.hash.call(null, k), k, removed_leaf_QMARK___9189);
        if(node__9190 === this__9187.root) {
        }else {
          this__9187.root = node__9190
        }
        if(cljs.core.truth_(removed_leaf_QMARK___9189[0])) {
          this__9187.count = this__9187.count - 1
        }else {
        }
        return tcoll__9188
      }
    }
  }else {
    throw new Error("dissoc! after persistent!");
  }
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  var this__9191 = this;
  var tcoll__9192 = this;
  if(this__9191.edit) {
    this__9191.edit = null;
    return new cljs.core.PersistentHashMap(null, this__9191.count, this__9191.root, this__9191.has_nil_QMARK_, this__9191.nil_val, null)
  }else {
    throw new Error("persistent! called twice");
  }
};
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = function tree_map_seq_push(node, stack, ascending_QMARK_) {
  var t__9197 = node;
  var stack__9198 = stack;
  while(true) {
    if(!(t__9197 == null)) {
      var G__9199 = ascending_QMARK_ ? t__9197.left : t__9197.right;
      var G__9200 = cljs.core.conj.call(null, stack__9198, t__9197);
      t__9197 = G__9199;
      stack__9198 = G__9200;
      continue
    }else {
      return stack__9198
    }
    break
  }
};
cljs.core.PersistentTreeMapSeq = function(meta, stack, ascending_QMARK_, cnt, __hash) {
  this.meta = meta;
  this.stack = stack;
  this.ascending_QMARK_ = ascending_QMARK_;
  this.cnt = cnt;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850570
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9201 = this;
  var h__2192__auto____9202 = this__9201.__hash;
  if(!(h__2192__auto____9202 == null)) {
    return h__2192__auto____9202
  }else {
    var h__2192__auto____9203 = cljs.core.hash_coll.call(null, coll);
    this__9201.__hash = h__2192__auto____9203;
    return h__2192__auto____9203
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9204 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  var this__9205 = this;
  var this__9206 = this;
  return cljs.core.pr_str.call(null, this__9206)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(this$) {
  var this__9207 = this;
  return this$
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9208 = this;
  if(this__9208.cnt < 0) {
    return cljs.core.count.call(null, cljs.core.next.call(null, coll)) + 1
  }else {
    return this__9208.cnt
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(this$) {
  var this__9209 = this;
  return cljs.core.peek.call(null, this__9209.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(this$) {
  var this__9210 = this;
  var t__9211 = cljs.core.first.call(null, this__9210.stack);
  var next_stack__9212 = cljs.core.tree_map_seq_push.call(null, this__9210.ascending_QMARK_ ? t__9211.right : t__9211.left, cljs.core.next.call(null, this__9210.stack), this__9210.ascending_QMARK_);
  if(!(next_stack__9212 == null)) {
    return new cljs.core.PersistentTreeMapSeq(null, next_stack__9212, this__9210.ascending_QMARK_, this__9210.cnt - 1, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9213 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9214 = this;
  return new cljs.core.PersistentTreeMapSeq(meta, this__9214.stack, this__9214.ascending_QMARK_, this__9214.cnt, this__9214.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9215 = this;
  return this__9215.meta
};
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = function create_tree_map_seq(tree, ascending_QMARK_, cnt) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push.call(null, tree, null, ascending_QMARK_), ascending_QMARK_, cnt, null)
};
cljs.core.balance_left = function balance_left(key, val, ins, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
      return new cljs.core.RedNode(ins.key, ins.val, ins.left.blacken(), new cljs.core.BlackNode(key, val, ins.right, right, null), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
        return new cljs.core.RedNode(ins.right.key, ins.right.val, new cljs.core.BlackNode(ins.key, ins.val, ins.left, ins.right.left, null), new cljs.core.BlackNode(key, val, ins.right.right, right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, ins, right, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, ins, right, null)
  }
};
cljs.core.balance_right = function balance_right(key, val, left, ins) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins)) {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.right)) {
      return new cljs.core.RedNode(ins.key, ins.val, new cljs.core.BlackNode(key, val, left, ins.left, null), ins.right.blacken(), null)
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, ins.left)) {
        return new cljs.core.RedNode(ins.left.key, ins.left.val, new cljs.core.BlackNode(key, val, left, ins.left.left, null), new cljs.core.BlackNode(ins.key, ins.val, ins.left.right, ins.right, null), null)
      }else {
        if("\ufdd0'else") {
          return new cljs.core.BlackNode(key, val, left, ins, null)
        }else {
          return null
        }
      }
    }
  }else {
    return new cljs.core.BlackNode(key, val, left, ins, null)
  }
};
cljs.core.balance_left_del = function balance_left_del(key, val, del, right) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, del.blacken(), right, null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right)) {
      return cljs.core.balance_right.call(null, key, val, del, right.redden())
    }else {
      if(function() {
        var and__3822__auto____9217 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right);
        if(and__3822__auto____9217) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, right.left)
        }else {
          return and__3822__auto____9217
        }
      }()) {
        return new cljs.core.RedNode(right.left.key, right.left.val, new cljs.core.BlackNode(key, val, del, right.left.left, null), cljs.core.balance_right.call(null, right.key, right.val, right.left.right, right.right.redden()), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.balance_right_del = function balance_right_del(key, val, left, del) {
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, del)) {
    return new cljs.core.RedNode(key, val, left, del.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left)) {
      return cljs.core.balance_left.call(null, key, val, left.redden(), del)
    }else {
      if(function() {
        var and__3822__auto____9219 = cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left);
        if(and__3822__auto____9219) {
          return cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, left.right)
        }else {
          return and__3822__auto____9219
        }
      }()) {
        return new cljs.core.RedNode(left.right.key, left.right.val, cljs.core.balance_left.call(null, left.key, left.val, left.left.redden(), left.right.left), new cljs.core.BlackNode(key, val, left.right.right, del, null), null)
      }else {
        if("\ufdd0'else") {
          throw new Error("red-black tree invariant violation");
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(node, f, init) {
  var init__9223 = f.call(null, init, node.key, node.val);
  if(cljs.core.reduced_QMARK_.call(null, init__9223)) {
    return cljs.core.deref.call(null, init__9223)
  }else {
    var init__9224 = !(node.left == null) ? tree_map_kv_reduce.call(null, node.left, f, init__9223) : init__9223;
    if(cljs.core.reduced_QMARK_.call(null, init__9224)) {
      return cljs.core.deref.call(null, init__9224)
    }else {
      var init__9225 = !(node.right == null) ? tree_map_kv_reduce.call(null, node.right, f, init__9224) : init__9224;
      if(cljs.core.reduced_QMARK_.call(null, init__9225)) {
        return cljs.core.deref.call(null, init__9225)
      }else {
        return init__9225
      }
    }
  }
};
cljs.core.BlackNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9228 = this;
  var h__2192__auto____9229 = this__9228.__hash;
  if(!(h__2192__auto____9229 == null)) {
    return h__2192__auto____9229
  }else {
    var h__2192__auto____9230 = cljs.core.hash_coll.call(null, coll);
    this__9228.__hash = h__2192__auto____9230;
    return h__2192__auto____9230
  }
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9231 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9232 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9233 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9233.key, this__9233.val], true), k, v)
};
cljs.core.BlackNode.prototype.call = function() {
  var G__9281 = null;
  var G__9281__2 = function(this_sym9234, k) {
    var this__9236 = this;
    var this_sym9234__9237 = this;
    var node__9238 = this_sym9234__9237;
    return node__9238.cljs$core$ILookup$_lookup$arity$2(node__9238, k)
  };
  var G__9281__3 = function(this_sym9235, k, not_found) {
    var this__9236 = this;
    var this_sym9235__9239 = this;
    var node__9240 = this_sym9235__9239;
    return node__9240.cljs$core$ILookup$_lookup$arity$3(node__9240, k, not_found)
  };
  G__9281 = function(this_sym9235, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9281__2.call(this, this_sym9235, k);
      case 3:
        return G__9281__3.call(this, this_sym9235, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9281
}();
cljs.core.BlackNode.prototype.apply = function(this_sym9226, args9227) {
  var this__9241 = this;
  return this_sym9226.call.apply(this_sym9226, [this_sym9226].concat(args9227.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9242 = this;
  return cljs.core.PersistentVector.fromArray([this__9242.key, this__9242.val, o], true)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9243 = this;
  return this__9243.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9244 = this;
  return this__9244.val
};
cljs.core.BlackNode.prototype.add_right = function(ins) {
  var this__9245 = this;
  var node__9246 = this;
  return ins.balance_right(node__9246)
};
cljs.core.BlackNode.prototype.redden = function() {
  var this__9247 = this;
  var node__9248 = this;
  return new cljs.core.RedNode(this__9247.key, this__9247.val, this__9247.left, this__9247.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(del) {
  var this__9249 = this;
  var node__9250 = this;
  return cljs.core.balance_right_del.call(null, this__9249.key, this__9249.val, this__9249.left, del)
};
cljs.core.BlackNode.prototype.replace = function(key, val, left, right) {
  var this__9251 = this;
  var node__9252 = this;
  return new cljs.core.BlackNode(key, val, left, right, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(f, init) {
  var this__9253 = this;
  var node__9254 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9254, f, init)
};
cljs.core.BlackNode.prototype.remove_left = function(del) {
  var this__9255 = this;
  var node__9256 = this;
  return cljs.core.balance_left_del.call(null, this__9255.key, this__9255.val, del, this__9255.right)
};
cljs.core.BlackNode.prototype.add_left = function(ins) {
  var this__9257 = this;
  var node__9258 = this;
  return ins.balance_left(node__9258)
};
cljs.core.BlackNode.prototype.balance_left = function(parent) {
  var this__9259 = this;
  var node__9260 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, node__9260, parent.right, null)
};
cljs.core.BlackNode.prototype.toString = function() {
  var G__9282 = null;
  var G__9282__0 = function() {
    var this__9261 = this;
    var this__9263 = this;
    return cljs.core.pr_str.call(null, this__9263)
  };
  G__9282 = function() {
    switch(arguments.length) {
      case 0:
        return G__9282__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9282
}();
cljs.core.BlackNode.prototype.balance_right = function(parent) {
  var this__9264 = this;
  var node__9265 = this;
  return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9265, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  var this__9266 = this;
  var node__9267 = this;
  return node__9267
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9268 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9269 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9270 = this;
  return cljs.core.list.call(null, this__9270.key, this__9270.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9271 = this;
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9272 = this;
  return this__9272.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9273 = this;
  return cljs.core.PersistentVector.fromArray([this__9273.key], true)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9274 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9274.key, this__9274.val], true), n, v)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9275 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9276 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9276.key, this__9276.val], true), meta)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9277 = this;
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9278 = this;
  if(n === 0) {
    return this__9278.key
  }else {
    if(n === 1) {
      return this__9278.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__9279 = this;
  if(n === 0) {
    return this__9279.key
  }else {
    if(n === 1) {
      return this__9279.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__9280 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.BlackNode;
cljs.core.RedNode = function(key, val, left, right, __hash) {
  this.key = key;
  this.val = val;
  this.left = left;
  this.right = right;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9285 = this;
  var h__2192__auto____9286 = this__9285.__hash;
  if(!(h__2192__auto____9286 == null)) {
    return h__2192__auto____9286
  }else {
    var h__2192__auto____9287 = cljs.core.hash_coll.call(null, coll);
    this__9285.__hash = h__2192__auto____9287;
    return h__2192__auto____9287
  }
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(node, k) {
  var this__9288 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(node, k, not_found) {
  var this__9289 = this;
  return node.cljs$core$IIndexed$_nth$arity$3(node, k, not_found)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(node, k, v) {
  var this__9290 = this;
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this__9290.key, this__9290.val], true), k, v)
};
cljs.core.RedNode.prototype.call = function() {
  var G__9338 = null;
  var G__9338__2 = function(this_sym9291, k) {
    var this__9293 = this;
    var this_sym9291__9294 = this;
    var node__9295 = this_sym9291__9294;
    return node__9295.cljs$core$ILookup$_lookup$arity$2(node__9295, k)
  };
  var G__9338__3 = function(this_sym9292, k, not_found) {
    var this__9293 = this;
    var this_sym9292__9296 = this;
    var node__9297 = this_sym9292__9296;
    return node__9297.cljs$core$ILookup$_lookup$arity$3(node__9297, k, not_found)
  };
  G__9338 = function(this_sym9292, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9338__2.call(this, this_sym9292, k);
      case 3:
        return G__9338__3.call(this, this_sym9292, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9338
}();
cljs.core.RedNode.prototype.apply = function(this_sym9283, args9284) {
  var this__9298 = this;
  return this_sym9283.call.apply(this_sym9283, [this_sym9283].concat(args9284.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(node, o) {
  var this__9299 = this;
  return cljs.core.PersistentVector.fromArray([this__9299.key, this__9299.val, o], true)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(node) {
  var this__9300 = this;
  return this__9300.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(node) {
  var this__9301 = this;
  return this__9301.val
};
cljs.core.RedNode.prototype.add_right = function(ins) {
  var this__9302 = this;
  var node__9303 = this;
  return new cljs.core.RedNode(this__9302.key, this__9302.val, this__9302.left, ins, null)
};
cljs.core.RedNode.prototype.redden = function() {
  var this__9304 = this;
  var node__9305 = this;
  throw new Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(del) {
  var this__9306 = this;
  var node__9307 = this;
  return new cljs.core.RedNode(this__9306.key, this__9306.val, this__9306.left, del, null)
};
cljs.core.RedNode.prototype.replace = function(key, val, left, right) {
  var this__9308 = this;
  var node__9309 = this;
  return new cljs.core.RedNode(key, val, left, right, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(f, init) {
  var this__9310 = this;
  var node__9311 = this;
  return cljs.core.tree_map_kv_reduce.call(null, node__9311, f, init)
};
cljs.core.RedNode.prototype.remove_left = function(del) {
  var this__9312 = this;
  var node__9313 = this;
  return new cljs.core.RedNode(this__9312.key, this__9312.val, del, this__9312.right, null)
};
cljs.core.RedNode.prototype.add_left = function(ins) {
  var this__9314 = this;
  var node__9315 = this;
  return new cljs.core.RedNode(this__9314.key, this__9314.val, ins, this__9314.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(parent) {
  var this__9316 = this;
  var node__9317 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9316.left)) {
    return new cljs.core.RedNode(this__9316.key, this__9316.val, this__9316.left.blacken(), new cljs.core.BlackNode(parent.key, parent.val, this__9316.right, parent.right, null), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9316.right)) {
      return new cljs.core.RedNode(this__9316.right.key, this__9316.right.val, new cljs.core.BlackNode(this__9316.key, this__9316.val, this__9316.left, this__9316.right.left, null), new cljs.core.BlackNode(parent.key, parent.val, this__9316.right.right, parent.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, node__9317, parent.right, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.toString = function() {
  var G__9339 = null;
  var G__9339__0 = function() {
    var this__9318 = this;
    var this__9320 = this;
    return cljs.core.pr_str.call(null, this__9320)
  };
  G__9339 = function() {
    switch(arguments.length) {
      case 0:
        return G__9339__0.call(this)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9339
}();
cljs.core.RedNode.prototype.balance_right = function(parent) {
  var this__9321 = this;
  var node__9322 = this;
  if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9321.right)) {
    return new cljs.core.RedNode(this__9321.key, this__9321.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9321.left, null), this__9321.right.blacken(), null)
  }else {
    if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, this__9321.left)) {
      return new cljs.core.RedNode(this__9321.left.key, this__9321.left.val, new cljs.core.BlackNode(parent.key, parent.val, parent.left, this__9321.left.left, null), new cljs.core.BlackNode(this__9321.key, this__9321.val, this__9321.left.right, this__9321.right, null), null)
    }else {
      if("\ufdd0'else") {
        return new cljs.core.BlackNode(parent.key, parent.val, parent.left, node__9322, null)
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.blacken = function() {
  var this__9323 = this;
  var node__9324 = this;
  return new cljs.core.BlackNode(this__9323.key, this__9323.val, this__9323.left, this__9323.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(node, f) {
  var this__9325 = this;
  return cljs.core.ci_reduce.call(null, node, f)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(node, f, start) {
  var this__9326 = this;
  return cljs.core.ci_reduce.call(null, node, f, start)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(node) {
  var this__9327 = this;
  return cljs.core.list.call(null, this__9327.key, this__9327.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function(node) {
  var this__9328 = this;
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function(node) {
  var this__9329 = this;
  return this__9329.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function(node) {
  var this__9330 = this;
  return cljs.core.PersistentVector.fromArray([this__9330.key], true)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(node, n, v) {
  var this__9331 = this;
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this__9331.key, this__9331.val], true), n, v)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9332 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(node, meta) {
  var this__9333 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this__9333.key, this__9333.val], true), meta)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(node) {
  var this__9334 = this;
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(node, n) {
  var this__9335 = this;
  if(n === 0) {
    return this__9335.key
  }else {
    if(n === 1) {
      return this__9335.val
    }else {
      if("\ufdd0'else") {
        return null
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(node, n, not_found) {
  var this__9336 = this;
  if(n === 0) {
    return this__9336.key
  }else {
    if(n === 1) {
      return this__9336.val
    }else {
      if("\ufdd0'else") {
        return not_found
      }else {
        return null
      }
    }
  }
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(node) {
  var this__9337 = this;
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode;
cljs.core.tree_map_add = function tree_map_add(comp, tree, k, v, found) {
  if(tree == null) {
    return new cljs.core.RedNode(k, v, null, null, null)
  }else {
    var c__9343 = comp.call(null, k, tree.key);
    if(c__9343 === 0) {
      found[0] = tree;
      return null
    }else {
      if(c__9343 < 0) {
        var ins__9344 = tree_map_add.call(null, comp, tree.left, k, v, found);
        if(!(ins__9344 == null)) {
          return tree.add_left(ins__9344)
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var ins__9345 = tree_map_add.call(null, comp, tree.right, k, v, found);
          if(!(ins__9345 == null)) {
            return tree.add_right(ins__9345)
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.core.tree_map_append = function tree_map_append(left, right) {
  if(left == null) {
    return right
  }else {
    if(right == null) {
      return left
    }else {
      if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, left)) {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          var app__9348 = tree_map_append.call(null, left.right, right.left);
          if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9348)) {
            return new cljs.core.RedNode(app__9348.key, app__9348.val, new cljs.core.RedNode(left.key, left.val, left.left, app__9348.left, null), new cljs.core.RedNode(right.key, right.val, app__9348.right, right.right, null), null)
          }else {
            return new cljs.core.RedNode(left.key, left.val, left.left, new cljs.core.RedNode(right.key, right.val, app__9348, right.right, null), null)
          }
        }else {
          return new cljs.core.RedNode(left.key, left.val, left.left, tree_map_append.call(null, left.right, right), null)
        }
      }else {
        if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, right)) {
          return new cljs.core.RedNode(right.key, right.val, tree_map_append.call(null, left, right.left), right.right, null)
        }else {
          if("\ufdd0'else") {
            var app__9349 = tree_map_append.call(null, left.right, right.left);
            if(cljs.core.instance_QMARK_.call(null, cljs.core.RedNode, app__9349)) {
              return new cljs.core.RedNode(app__9349.key, app__9349.val, new cljs.core.BlackNode(left.key, left.val, left.left, app__9349.left, null), new cljs.core.BlackNode(right.key, right.val, app__9349.right, right.right, null), null)
            }else {
              return cljs.core.balance_left_del.call(null, left.key, left.val, left.left, new cljs.core.BlackNode(right.key, right.val, app__9349, right.right, null))
            }
          }else {
            return null
          }
        }
      }
    }
  }
};
cljs.core.tree_map_remove = function tree_map_remove(comp, tree, k, found) {
  if(!(tree == null)) {
    var c__9355 = comp.call(null, k, tree.key);
    if(c__9355 === 0) {
      found[0] = tree;
      return cljs.core.tree_map_append.call(null, tree.left, tree.right)
    }else {
      if(c__9355 < 0) {
        var del__9356 = tree_map_remove.call(null, comp, tree.left, k, found);
        if(function() {
          var or__3824__auto____9357 = !(del__9356 == null);
          if(or__3824__auto____9357) {
            return or__3824__auto____9357
          }else {
            return!(found[0] == null)
          }
        }()) {
          if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.left)) {
            return cljs.core.balance_left_del.call(null, tree.key, tree.val, del__9356, tree.right)
          }else {
            return new cljs.core.RedNode(tree.key, tree.val, del__9356, tree.right, null)
          }
        }else {
          return null
        }
      }else {
        if("\ufdd0'else") {
          var del__9358 = tree_map_remove.call(null, comp, tree.right, k, found);
          if(function() {
            var or__3824__auto____9359 = !(del__9358 == null);
            if(or__3824__auto____9359) {
              return or__3824__auto____9359
            }else {
              return!(found[0] == null)
            }
          }()) {
            if(cljs.core.instance_QMARK_.call(null, cljs.core.BlackNode, tree.right)) {
              return cljs.core.balance_right_del.call(null, tree.key, tree.val, tree.left, del__9358)
            }else {
              return new cljs.core.RedNode(tree.key, tree.val, tree.left, del__9358, null)
            }
          }else {
            return null
          }
        }else {
          return null
        }
      }
    }
  }else {
    return null
  }
};
cljs.core.tree_map_replace = function tree_map_replace(comp, tree, k, v) {
  var tk__9362 = tree.key;
  var c__9363 = comp.call(null, k, tk__9362);
  if(c__9363 === 0) {
    return tree.replace(tk__9362, v, tree.left, tree.right)
  }else {
    if(c__9363 < 0) {
      return tree.replace(tk__9362, tree.val, tree_map_replace.call(null, comp, tree.left, k, v), tree.right)
    }else {
      if("\ufdd0'else") {
        return tree.replace(tk__9362, tree.val, tree.left, tree_map_replace.call(null, comp, tree.right, k, v))
      }else {
        return null
      }
    }
  }
};
cljs.core.PersistentTreeMap = function(comp, tree, cnt, meta, __hash) {
  this.comp = comp;
  this.tree = tree;
  this.cnt = cnt;
  this.meta = meta;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9366 = this;
  var h__2192__auto____9367 = this__9366.__hash;
  if(!(h__2192__auto____9367 == null)) {
    return h__2192__auto____9367
  }else {
    var h__2192__auto____9368 = cljs.core.hash_imap.call(null, coll);
    this__9366.__hash = h__2192__auto____9368;
    return h__2192__auto____9368
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, k) {
  var this__9369 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, k, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, k, not_found) {
  var this__9370 = this;
  var n__9371 = coll.entry_at(k);
  if(!(n__9371 == null)) {
    return n__9371.val
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(coll, k, v) {
  var this__9372 = this;
  var found__9373 = [null];
  var t__9374 = cljs.core.tree_map_add.call(null, this__9372.comp, this__9372.tree, k, v, found__9373);
  if(t__9374 == null) {
    var found_node__9375 = cljs.core.nth.call(null, found__9373, 0);
    if(cljs.core._EQ_.call(null, v, found_node__9375.val)) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9372.comp, cljs.core.tree_map_replace.call(null, this__9372.comp, this__9372.tree, k, v), this__9372.cnt, this__9372.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9372.comp, t__9374.blacken(), this__9372.cnt + 1, this__9372.meta, null)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(coll, k) {
  var this__9376 = this;
  return!(coll.entry_at(k) == null)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var G__9410 = null;
  var G__9410__2 = function(this_sym9377, k) {
    var this__9379 = this;
    var this_sym9377__9380 = this;
    var coll__9381 = this_sym9377__9380;
    return coll__9381.cljs$core$ILookup$_lookup$arity$2(coll__9381, k)
  };
  var G__9410__3 = function(this_sym9378, k, not_found) {
    var this__9379 = this;
    var this_sym9378__9382 = this;
    var coll__9383 = this_sym9378__9382;
    return coll__9383.cljs$core$ILookup$_lookup$arity$3(coll__9383, k, not_found)
  };
  G__9410 = function(this_sym9378, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9410__2.call(this, this_sym9378, k);
      case 3:
        return G__9410__3.call(this, this_sym9378, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9410
}();
cljs.core.PersistentTreeMap.prototype.apply = function(this_sym9364, args9365) {
  var this__9384 = this;
  return this_sym9364.call.apply(this_sym9364, [this_sym9364].concat(args9365.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(coll, f, init) {
  var this__9385 = this;
  if(!(this__9385.tree == null)) {
    return cljs.core.tree_map_kv_reduce.call(null, this__9385.tree, f, init)
  }else {
    return init
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, entry) {
  var this__9386 = this;
  if(cljs.core.vector_QMARK_.call(null, entry)) {
    return coll.cljs$core$IAssociative$_assoc$arity$3(coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9387 = this;
  if(this__9387.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9387.tree, false, this__9387.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.toString = function() {
  var this__9388 = this;
  var this__9389 = this;
  return cljs.core.pr_str.call(null, this__9389)
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(k) {
  var this__9390 = this;
  var coll__9391 = this;
  var t__9392 = this__9390.tree;
  while(true) {
    if(!(t__9392 == null)) {
      var c__9393 = this__9390.comp.call(null, k, t__9392.key);
      if(c__9393 === 0) {
        return t__9392
      }else {
        if(c__9393 < 0) {
          var G__9411 = t__9392.left;
          t__9392 = G__9411;
          continue
        }else {
          if("\ufdd0'else") {
            var G__9412 = t__9392.right;
            t__9392 = G__9412;
            continue
          }else {
            return null
          }
        }
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__9394 = this;
  if(this__9394.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9394.tree, ascending_QMARK_, this__9394.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9395 = this;
  if(this__9395.cnt > 0) {
    var stack__9396 = null;
    var t__9397 = this__9395.tree;
    while(true) {
      if(!(t__9397 == null)) {
        var c__9398 = this__9395.comp.call(null, k, t__9397.key);
        if(c__9398 === 0) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, stack__9396, t__9397), ascending_QMARK_, -1, null)
        }else {
          if(cljs.core.truth_(ascending_QMARK_)) {
            if(c__9398 < 0) {
              var G__9413 = cljs.core.conj.call(null, stack__9396, t__9397);
              var G__9414 = t__9397.left;
              stack__9396 = G__9413;
              t__9397 = G__9414;
              continue
            }else {
              var G__9415 = stack__9396;
              var G__9416 = t__9397.right;
              stack__9396 = G__9415;
              t__9397 = G__9416;
              continue
            }
          }else {
            if("\ufdd0'else") {
              if(c__9398 > 0) {
                var G__9417 = cljs.core.conj.call(null, stack__9396, t__9397);
                var G__9418 = t__9397.right;
                stack__9396 = G__9417;
                t__9397 = G__9418;
                continue
              }else {
                var G__9419 = stack__9396;
                var G__9420 = t__9397.left;
                stack__9396 = G__9419;
                t__9397 = G__9420;
                continue
              }
            }else {
              return null
            }
          }
        }
      }else {
        if(stack__9396 == null) {
          return new cljs.core.PersistentTreeMapSeq(null, stack__9396, ascending_QMARK_, -1, null)
        }else {
          return null
        }
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__9399 = this;
  return cljs.core.key.call(null, entry)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9400 = this;
  return this__9400.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9401 = this;
  if(this__9401.cnt > 0) {
    return cljs.core.create_tree_map_seq.call(null, this__9401.tree, true, this__9401.cnt)
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9402 = this;
  return this__9402.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9403 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9404 = this;
  return new cljs.core.PersistentTreeMap(this__9404.comp, this__9404.tree, this__9404.cnt, meta, this__9404.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9405 = this;
  return this__9405.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9406 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this__9406.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(coll, k) {
  var this__9407 = this;
  var found__9408 = [null];
  var t__9409 = cljs.core.tree_map_remove.call(null, this__9407.comp, this__9407.tree, k, found__9408);
  if(t__9409 == null) {
    if(cljs.core.nth.call(null, found__9408, 0) == null) {
      return coll
    }else {
      return new cljs.core.PersistentTreeMap(this__9407.comp, null, 0, this__9407.meta, null)
    }
  }else {
    return new cljs.core.PersistentTreeMap(this__9407.comp, t__9409.blacken(), this__9407.cnt - 1, this__9407.meta, null)
  }
};
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in__9423 = cljs.core.seq.call(null, keyvals);
    var out__9424 = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);
    while(true) {
      if(in__9423) {
        var G__9425 = cljs.core.nnext.call(null, in__9423);
        var G__9426 = cljs.core.assoc_BANG_.call(null, out__9424, cljs.core.first.call(null, in__9423), cljs.core.second.call(null, in__9423));
        in__9423 = G__9425;
        out__9424 = G__9426;
        continue
      }else {
        return cljs.core.persistent_BANG_.call(null, out__9424)
      }
      break
    }
  };
  var hash_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return hash_map__delegate.call(this, keyvals)
  };
  hash_map.cljs$lang$maxFixedArity = 0;
  hash_map.cljs$lang$applyTo = function(arglist__9427) {
    var keyvals = cljs.core.seq(arglist__9427);
    return hash_map__delegate(keyvals)
  };
  hash_map.cljs$lang$arity$variadic = hash_map__delegate;
  return hash_map
}();
cljs.core.array_map = function() {
  var array_map__delegate = function(keyvals) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, cljs.core.count.call(null, keyvals), 2), cljs.core.apply.call(null, cljs.core.array, keyvals), null)
  };
  var array_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return array_map__delegate.call(this, keyvals)
  };
  array_map.cljs$lang$maxFixedArity = 0;
  array_map.cljs$lang$applyTo = function(arglist__9428) {
    var keyvals = cljs.core.seq(arglist__9428);
    return array_map__delegate(keyvals)
  };
  array_map.cljs$lang$arity$variadic = array_map__delegate;
  return array_map
}();
cljs.core.obj_map = function() {
  var obj_map__delegate = function(keyvals) {
    var ks__9432 = [];
    var obj__9433 = {};
    var kvs__9434 = cljs.core.seq.call(null, keyvals);
    while(true) {
      if(kvs__9434) {
        ks__9432.push(cljs.core.first.call(null, kvs__9434));
        obj__9433[cljs.core.first.call(null, kvs__9434)] = cljs.core.second.call(null, kvs__9434);
        var G__9435 = cljs.core.nnext.call(null, kvs__9434);
        kvs__9434 = G__9435;
        continue
      }else {
        return cljs.core.ObjMap.fromObject.call(null, ks__9432, obj__9433)
      }
      break
    }
  };
  var obj_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return obj_map__delegate.call(this, keyvals)
  };
  obj_map.cljs$lang$maxFixedArity = 0;
  obj_map.cljs$lang$applyTo = function(arglist__9436) {
    var keyvals = cljs.core.seq(arglist__9436);
    return obj_map__delegate(keyvals)
  };
  obj_map.cljs$lang$arity$variadic = obj_map__delegate;
  return obj_map
}();
cljs.core.sorted_map = function() {
  var sorted_map__delegate = function(keyvals) {
    var in__9439 = cljs.core.seq.call(null, keyvals);
    var out__9440 = cljs.core.PersistentTreeMap.EMPTY;
    while(true) {
      if(in__9439) {
        var G__9441 = cljs.core.nnext.call(null, in__9439);
        var G__9442 = cljs.core.assoc.call(null, out__9440, cljs.core.first.call(null, in__9439), cljs.core.second.call(null, in__9439));
        in__9439 = G__9441;
        out__9440 = G__9442;
        continue
      }else {
        return out__9440
      }
      break
    }
  };
  var sorted_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_map__delegate.call(this, keyvals)
  };
  sorted_map.cljs$lang$maxFixedArity = 0;
  sorted_map.cljs$lang$applyTo = function(arglist__9443) {
    var keyvals = cljs.core.seq(arglist__9443);
    return sorted_map__delegate(keyvals)
  };
  sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
  return sorted_map
}();
cljs.core.sorted_map_by = function() {
  var sorted_map_by__delegate = function(comparator, keyvals) {
    var in__9446 = cljs.core.seq.call(null, keyvals);
    var out__9447 = new cljs.core.PersistentTreeMap(comparator, null, 0, null, 0);
    while(true) {
      if(in__9446) {
        var G__9448 = cljs.core.nnext.call(null, in__9446);
        var G__9449 = cljs.core.assoc.call(null, out__9447, cljs.core.first.call(null, in__9446), cljs.core.second.call(null, in__9446));
        in__9446 = G__9448;
        out__9447 = G__9449;
        continue
      }else {
        return out__9447
      }
      break
    }
  };
  var sorted_map_by = function(comparator, var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_map_by__delegate.call(this, comparator, keyvals)
  };
  sorted_map_by.cljs$lang$maxFixedArity = 1;
  sorted_map_by.cljs$lang$applyTo = function(arglist__9450) {
    var comparator = cljs.core.first(arglist__9450);
    var keyvals = cljs.core.rest(arglist__9450);
    return sorted_map_by__delegate(comparator, keyvals)
  };
  sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
  return sorted_map_by
}();
cljs.core.keys = function keys(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, hash_map))
};
cljs.core.key = function key(map_entry) {
  return cljs.core._key.call(null, map_entry)
};
cljs.core.vals = function vals(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, hash_map))
};
cljs.core.val = function val(map_entry) {
  return cljs.core._val.call(null, map_entry)
};
cljs.core.merge = function() {
  var merge__delegate = function(maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      return cljs.core.reduce.call(null, function(p1__9451_SHARP_, p2__9452_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3824__auto____9454 = p1__9451_SHARP_;
          if(cljs.core.truth_(or__3824__auto____9454)) {
            return or__3824__auto____9454
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), p2__9452_SHARP_)
      }, maps)
    }else {
      return null
    }
  };
  var merge = function(var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return merge__delegate.call(this, maps)
  };
  merge.cljs$lang$maxFixedArity = 0;
  merge.cljs$lang$applyTo = function(arglist__9455) {
    var maps = cljs.core.seq(arglist__9455);
    return merge__delegate(maps)
  };
  merge.cljs$lang$arity$variadic = merge__delegate;
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__9463 = function(m, e) {
        var k__9461 = cljs.core.first.call(null, e);
        var v__9462 = cljs.core.second.call(null, e);
        if(cljs.core.contains_QMARK_.call(null, m, k__9461)) {
          return cljs.core.assoc.call(null, m, k__9461, f.call(null, cljs.core._lookup.call(null, m, k__9461, null), v__9462))
        }else {
          return cljs.core.assoc.call(null, m, k__9461, v__9462)
        }
      };
      var merge2__9465 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__9463, function() {
          var or__3824__auto____9464 = m1;
          if(cljs.core.truth_(or__3824__auto____9464)) {
            return or__3824__auto____9464
          }else {
            return cljs.core.ObjMap.EMPTY
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__9465, maps)
    }else {
      return null
    }
  };
  var merge_with = function(f, var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return merge_with__delegate.call(this, f, maps)
  };
  merge_with.cljs$lang$maxFixedArity = 1;
  merge_with.cljs$lang$applyTo = function(arglist__9466) {
    var f = cljs.core.first(arglist__9466);
    var maps = cljs.core.rest(arglist__9466);
    return merge_with__delegate(f, maps)
  };
  merge_with.cljs$lang$arity$variadic = merge_with__delegate;
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__9471 = cljs.core.ObjMap.EMPTY;
  var keys__9472 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(keys__9472) {
      var key__9473 = cljs.core.first.call(null, keys__9472);
      var entry__9474 = cljs.core._lookup.call(null, map, key__9473, "\ufdd0'cljs.core/not-found");
      var G__9475 = cljs.core.not_EQ_.call(null, entry__9474, "\ufdd0'cljs.core/not-found") ? cljs.core.assoc.call(null, ret__9471, key__9473, entry__9474) : ret__9471;
      var G__9476 = cljs.core.next.call(null, keys__9472);
      ret__9471 = G__9475;
      keys__9472 = G__9476;
      continue
    }else {
      return ret__9471
    }
    break
  }
};
cljs.core.PersistentHashSet = function(meta, hash_map, __hash) {
  this.meta = meta;
  this.hash_map = hash_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(coll) {
  var this__9480 = this;
  return new cljs.core.TransientHashSet(cljs.core.transient$.call(null, this__9480.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9481 = this;
  var h__2192__auto____9482 = this__9481.__hash;
  if(!(h__2192__auto____9482 == null)) {
    return h__2192__auto____9482
  }else {
    var h__2192__auto____9483 = cljs.core.hash_iset.call(null, coll);
    this__9481.__hash = h__2192__auto____9483;
    return h__2192__auto____9483
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9484 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9485 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9485.hash_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var G__9506 = null;
  var G__9506__2 = function(this_sym9486, k) {
    var this__9488 = this;
    var this_sym9486__9489 = this;
    var coll__9490 = this_sym9486__9489;
    return coll__9490.cljs$core$ILookup$_lookup$arity$2(coll__9490, k)
  };
  var G__9506__3 = function(this_sym9487, k, not_found) {
    var this__9488 = this;
    var this_sym9487__9491 = this;
    var coll__9492 = this_sym9487__9491;
    return coll__9492.cljs$core$ILookup$_lookup$arity$3(coll__9492, k, not_found)
  };
  G__9506 = function(this_sym9487, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9506__2.call(this, this_sym9487, k);
      case 3:
        return G__9506__3.call(this, this_sym9487, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9506
}();
cljs.core.PersistentHashSet.prototype.apply = function(this_sym9478, args9479) {
  var this__9493 = this;
  return this_sym9478.call.apply(this_sym9478, [this_sym9478].concat(args9479.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9494 = this;
  return new cljs.core.PersistentHashSet(this__9494.meta, cljs.core.assoc.call(null, this__9494.hash_map, o, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  var this__9495 = this;
  var this__9496 = this;
  return cljs.core.pr_str.call(null, this__9496)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9497 = this;
  return cljs.core.keys.call(null, this__9497.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9498 = this;
  return new cljs.core.PersistentHashSet(this__9498.meta, cljs.core.dissoc.call(null, this__9498.hash_map, v), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9499 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9500 = this;
  var and__3822__auto____9501 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9501) {
    var and__3822__auto____9502 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9502) {
      return cljs.core.every_QMARK_.call(null, function(p1__9477_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9477_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9502
    }
  }else {
    return and__3822__auto____9501
  }
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9503 = this;
  return new cljs.core.PersistentHashSet(meta, this__9503.hash_map, this__9503.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9504 = this;
  return this__9504.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9505 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this__9505.meta)
};
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.hash_map.call(null), 0);
cljs.core.PersistentHashSet.fromArray = function(items) {
  var len__9507 = cljs.core.count.call(null, items);
  var i__9508 = 0;
  var out__9509 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
  while(true) {
    if(i__9508 < len__9507) {
      var G__9510 = i__9508 + 1;
      var G__9511 = cljs.core.conj_BANG_.call(null, out__9509, items[i__9508]);
      i__9508 = G__9510;
      out__9509 = G__9511;
      continue
    }else {
      return cljs.core.persistent_BANG_.call(null, out__9509)
    }
    break
  }
};
cljs.core.TransientHashSet = function(transient_map) {
  this.transient_map = transient_map;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 34
};
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var G__9529 = null;
  var G__9529__2 = function(this_sym9515, k) {
    var this__9517 = this;
    var this_sym9515__9518 = this;
    var tcoll__9519 = this_sym9515__9518;
    if(cljs.core._lookup.call(null, this__9517.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return null
    }else {
      return k
    }
  };
  var G__9529__3 = function(this_sym9516, k, not_found) {
    var this__9517 = this;
    var this_sym9516__9520 = this;
    var tcoll__9521 = this_sym9516__9520;
    if(cljs.core._lookup.call(null, this__9517.transient_map, k, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
      return not_found
    }else {
      return k
    }
  };
  G__9529 = function(this_sym9516, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9529__2.call(this, this_sym9516, k);
      case 3:
        return G__9529__3.call(this, this_sym9516, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9529
}();
cljs.core.TransientHashSet.prototype.apply = function(this_sym9513, args9514) {
  var this__9522 = this;
  return this_sym9513.call.apply(this_sym9513, [this_sym9513].concat(args9514.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(tcoll, v) {
  var this__9523 = this;
  return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll, v, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(tcoll, v, not_found) {
  var this__9524 = this;
  if(cljs.core._lookup.call(null, this__9524.transient_map, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) {
    return not_found
  }else {
    return v
  }
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(tcoll) {
  var this__9525 = this;
  return cljs.core.count.call(null, this__9525.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(tcoll, v) {
  var this__9526 = this;
  this__9526.transient_map = cljs.core.dissoc_BANG_.call(null, this__9526.transient_map, v);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(tcoll, o) {
  var this__9527 = this;
  this__9527.transient_map = cljs.core.assoc_BANG_.call(null, this__9527.transient_map, o, null);
  return tcoll
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(tcoll) {
  var this__9528 = this;
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this__9528.transient_map), null)
};
cljs.core.TransientHashSet;
cljs.core.PersistentTreeSet = function(meta, tree_map, __hash) {
  this.meta = meta;
  this.tree_map = tree_map;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(coll) {
  var this__9532 = this;
  var h__2192__auto____9533 = this__9532.__hash;
  if(!(h__2192__auto____9533 == null)) {
    return h__2192__auto____9533
  }else {
    var h__2192__auto____9534 = cljs.core.hash_iset.call(null, coll);
    this__9532.__hash = h__2192__auto____9534;
    return h__2192__auto____9534
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(coll, v) {
  var this__9535 = this;
  return coll.cljs$core$ILookup$_lookup$arity$3(coll, v, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(coll, v, not_found) {
  var this__9536 = this;
  if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__9536.tree_map, v))) {
    return v
  }else {
    return not_found
  }
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var G__9562 = null;
  var G__9562__2 = function(this_sym9537, k) {
    var this__9539 = this;
    var this_sym9537__9540 = this;
    var coll__9541 = this_sym9537__9540;
    return coll__9541.cljs$core$ILookup$_lookup$arity$2(coll__9541, k)
  };
  var G__9562__3 = function(this_sym9538, k, not_found) {
    var this__9539 = this;
    var this_sym9538__9542 = this;
    var coll__9543 = this_sym9538__9542;
    return coll__9543.cljs$core$ILookup$_lookup$arity$3(coll__9543, k, not_found)
  };
  G__9562 = function(this_sym9538, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__9562__2.call(this, this_sym9538, k);
      case 3:
        return G__9562__3.call(this, this_sym9538, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__9562
}();
cljs.core.PersistentTreeSet.prototype.apply = function(this_sym9530, args9531) {
  var this__9544 = this;
  return this_sym9530.call.apply(this_sym9530, [this_sym9530].concat(args9531.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(coll, o) {
  var this__9545 = this;
  return new cljs.core.PersistentTreeSet(this__9545.meta, cljs.core.assoc.call(null, this__9545.tree_map, o, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function(coll) {
  var this__9546 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this__9546.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  var this__9547 = this;
  var this__9548 = this;
  return cljs.core.pr_str.call(null, this__9548)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(coll, ascending_QMARK_) {
  var this__9549 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this__9549.tree_map, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(coll, k, ascending_QMARK_) {
  var this__9550 = this;
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this__9550.tree_map, k, ascending_QMARK_))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(coll, entry) {
  var this__9551 = this;
  return entry
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function(coll) {
  var this__9552 = this;
  return cljs.core._comparator.call(null, this__9552.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(coll) {
  var this__9553 = this;
  return cljs.core.keys.call(null, this__9553.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(coll, v) {
  var this__9554 = this;
  return new cljs.core.PersistentTreeSet(this__9554.meta, cljs.core.dissoc.call(null, this__9554.tree_map, v), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function(coll) {
  var this__9555 = this;
  return cljs.core.count.call(null, this__9555.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(coll, other) {
  var this__9556 = this;
  var and__3822__auto____9557 = cljs.core.set_QMARK_.call(null, other);
  if(and__3822__auto____9557) {
    var and__3822__auto____9558 = cljs.core.count.call(null, coll) === cljs.core.count.call(null, other);
    if(and__3822__auto____9558) {
      return cljs.core.every_QMARK_.call(null, function(p1__9512_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__9512_SHARP_)
      }, other)
    }else {
      return and__3822__auto____9558
    }
  }else {
    return and__3822__auto____9557
  }
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(coll, meta) {
  var this__9559 = this;
  return new cljs.core.PersistentTreeSet(meta, this__9559.tree_map, this__9559.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(coll) {
  var this__9560 = this;
  return this__9560.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(coll) {
  var this__9561 = this;
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this__9561.meta)
};
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map.call(null), 0);
cljs.core.hash_set = function() {
  var hash_set = null;
  var hash_set__0 = function() {
    return cljs.core.PersistentHashSet.EMPTY
  };
  var hash_set__1 = function() {
    var G__9567__delegate = function(keys) {
      var in__9565 = cljs.core.seq.call(null, keys);
      var out__9566 = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);
      while(true) {
        if(cljs.core.seq.call(null, in__9565)) {
          var G__9568 = cljs.core.next.call(null, in__9565);
          var G__9569 = cljs.core.conj_BANG_.call(null, out__9566, cljs.core.first.call(null, in__9565));
          in__9565 = G__9568;
          out__9566 = G__9569;
          continue
        }else {
          return cljs.core.persistent_BANG_.call(null, out__9566)
        }
        break
      }
    };
    var G__9567 = function(var_args) {
      var keys = null;
      if(goog.isDef(var_args)) {
        keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__9567__delegate.call(this, keys)
    };
    G__9567.cljs$lang$maxFixedArity = 0;
    G__9567.cljs$lang$applyTo = function(arglist__9570) {
      var keys = cljs.core.seq(arglist__9570);
      return G__9567__delegate(keys)
    };
    G__9567.cljs$lang$arity$variadic = G__9567__delegate;
    return G__9567
  }();
  hash_set = function(var_args) {
    var keys = var_args;
    switch(arguments.length) {
      case 0:
        return hash_set__0.call(this);
      default:
        return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw"Invalid arity: " + arguments.length;
  };
  hash_set.cljs$lang$maxFixedArity = 0;
  hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
  hash_set.cljs$lang$arity$0 = hash_set__0;
  hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
  return hash_set
}();
cljs.core.set = function set(coll) {
  return cljs.core.apply.call(null, cljs.core.hash_set, coll)
};
cljs.core.sorted_set = function() {
  var sorted_set__delegate = function(keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, keys)
  };
  var sorted_set = function(var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return sorted_set__delegate.call(this, keys)
  };
  sorted_set.cljs$lang$maxFixedArity = 0;
  sorted_set.cljs$lang$applyTo = function(arglist__9571) {
    var keys = cljs.core.seq(arglist__9571);
    return sorted_set__delegate(keys)
  };
  sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
  return sorted_set
}();
cljs.core.sorted_set_by = function() {
  var sorted_set_by__delegate = function(comparator, keys) {
    return cljs.core.reduce.call(null, cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by.call(null, comparator), 0), keys)
  };
  var sorted_set_by = function(comparator, var_args) {
    var keys = null;
    if(goog.isDef(var_args)) {
      keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return sorted_set_by__delegate.call(this, comparator, keys)
  };
  sorted_set_by.cljs$lang$maxFixedArity = 1;
  sorted_set_by.cljs$lang$applyTo = function(arglist__9573) {
    var comparator = cljs.core.first(arglist__9573);
    var keys = cljs.core.rest(arglist__9573);
    return sorted_set_by__delegate(comparator, keys)
  };
  sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
  return sorted_set_by
}();
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.vector_QMARK_.call(null, coll)) {
    var n__9579 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3971__auto____9580 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3971__auto____9580)) {
        var e__9581 = temp__3971__auto____9580;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__9581))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__9579, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__9572_SHARP_) {
      var temp__3971__auto____9582 = cljs.core.find.call(null, smap, p1__9572_SHARP_);
      if(cljs.core.truth_(temp__3971__auto____9582)) {
        var e__9583 = temp__3971__auto____9582;
        return cljs.core.second.call(null, e__9583)
      }else {
        return p1__9572_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__9613 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__9606, seen) {
        while(true) {
          var vec__9607__9608 = p__9606;
          var f__9609 = cljs.core.nth.call(null, vec__9607__9608, 0, null);
          var xs__9610 = vec__9607__9608;
          var temp__3974__auto____9611 = cljs.core.seq.call(null, xs__9610);
          if(temp__3974__auto____9611) {
            var s__9612 = temp__3974__auto____9611;
            if(cljs.core.contains_QMARK_.call(null, seen, f__9609)) {
              var G__9614 = cljs.core.rest.call(null, s__9612);
              var G__9615 = seen;
              p__9606 = G__9614;
              seen = G__9615;
              continue
            }else {
              return cljs.core.cons.call(null, f__9609, step.call(null, cljs.core.rest.call(null, s__9612), cljs.core.conj.call(null, seen, f__9609)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    }, null)
  };
  return step__9613.call(null, coll, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function butlast(s) {
  var ret__9618 = cljs.core.PersistentVector.EMPTY;
  var s__9619 = s;
  while(true) {
    if(cljs.core.next.call(null, s__9619)) {
      var G__9620 = cljs.core.conj.call(null, ret__9618, cljs.core.first.call(null, s__9619));
      var G__9621 = cljs.core.next.call(null, s__9619);
      ret__9618 = G__9620;
      s__9619 = G__9621;
      continue
    }else {
      return cljs.core.seq.call(null, ret__9618)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.string_QMARK_.call(null, x)) {
    return x
  }else {
    if(function() {
      var or__3824__auto____9624 = cljs.core.keyword_QMARK_.call(null, x);
      if(or__3824__auto____9624) {
        return or__3824__auto____9624
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }()) {
      var i__9625 = x.lastIndexOf("/");
      if(i__9625 < 0) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__9625 + 1)
      }
    }else {
      if("\ufdd0'else") {
        throw new Error([cljs.core.str("Doesn't support name: "), cljs.core.str(x)].join(""));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function namespace(x) {
  if(function() {
    var or__3824__auto____9628 = cljs.core.keyword_QMARK_.call(null, x);
    if(or__3824__auto____9628) {
      return or__3824__auto____9628
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }()) {
    var i__9629 = x.lastIndexOf("/");
    if(i__9629 > -1) {
      return cljs.core.subs.call(null, x, 2, i__9629)
    }else {
      return null
    }
  }else {
    throw new Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(x)].join(""));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__9636 = cljs.core.ObjMap.EMPTY;
  var ks__9637 = cljs.core.seq.call(null, keys);
  var vs__9638 = cljs.core.seq.call(null, vals);
  while(true) {
    if(function() {
      var and__3822__auto____9639 = ks__9637;
      if(and__3822__auto____9639) {
        return vs__9638
      }else {
        return and__3822__auto____9639
      }
    }()) {
      var G__9640 = cljs.core.assoc.call(null, map__9636, cljs.core.first.call(null, ks__9637), cljs.core.first.call(null, vs__9638));
      var G__9641 = cljs.core.next.call(null, ks__9637);
      var G__9642 = cljs.core.next.call(null, vs__9638);
      map__9636 = G__9640;
      ks__9637 = G__9641;
      vs__9638 = G__9642;
      continue
    }else {
      return map__9636
    }
    break
  }
};
cljs.core.max_key = function() {
  var max_key = null;
  var max_key__2 = function(k, x) {
    return x
  };
  var max_key__3 = function(k, x, y) {
    if(k.call(null, x) > k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var max_key__4 = function() {
    var G__9645__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9630_SHARP_, p2__9631_SHARP_) {
        return max_key.call(null, k, p1__9630_SHARP_, p2__9631_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__9645 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9645__delegate.call(this, k, x, y, more)
    };
    G__9645.cljs$lang$maxFixedArity = 3;
    G__9645.cljs$lang$applyTo = function(arglist__9646) {
      var k = cljs.core.first(arglist__9646);
      var x = cljs.core.first(cljs.core.next(arglist__9646));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9646)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9646)));
      return G__9645__delegate(k, x, y, more)
    };
    G__9645.cljs$lang$arity$variadic = G__9645__delegate;
    return G__9645
  }();
  max_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return max_key__2.call(this, k, x);
      case 3:
        return max_key__3.call(this, k, x, y);
      default:
        return max_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  max_key.cljs$lang$maxFixedArity = 3;
  max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
  max_key.cljs$lang$arity$2 = max_key__2;
  max_key.cljs$lang$arity$3 = max_key__3;
  max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
  return max_key
}();
cljs.core.min_key = function() {
  var min_key = null;
  var min_key__2 = function(k, x) {
    return x
  };
  var min_key__3 = function(k, x, y) {
    if(k.call(null, x) < k.call(null, y)) {
      return x
    }else {
      return y
    }
  };
  var min_key__4 = function() {
    var G__9647__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__9643_SHARP_, p2__9644_SHARP_) {
        return min_key.call(null, k, p1__9643_SHARP_, p2__9644_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__9647 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9647__delegate.call(this, k, x, y, more)
    };
    G__9647.cljs$lang$maxFixedArity = 3;
    G__9647.cljs$lang$applyTo = function(arglist__9648) {
      var k = cljs.core.first(arglist__9648);
      var x = cljs.core.first(cljs.core.next(arglist__9648));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9648)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9648)));
      return G__9647__delegate(k, x, y, more)
    };
    G__9647.cljs$lang$arity$variadic = G__9647__delegate;
    return G__9647
  }();
  min_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return min_key__2.call(this, k, x);
      case 3:
        return min_key__3.call(this, k, x, y);
      default:
        return min_key__4.cljs$lang$arity$variadic(k, x, y, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  min_key.cljs$lang$maxFixedArity = 3;
  min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
  min_key.cljs$lang$arity$2 = min_key__2;
  min_key.cljs$lang$arity$3 = min_key__3;
  min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
  return min_key
}();
cljs.core.partition_all = function() {
  var partition_all = null;
  var partition_all__2 = function(n, coll) {
    return partition_all.call(null, n, n, coll)
  };
  var partition_all__3 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9651 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9651) {
        var s__9652 = temp__3974__auto____9651;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__9652), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__9652)))
      }else {
        return null
      }
    }, null)
  };
  partition_all = function(n, step, coll) {
    switch(arguments.length) {
      case 2:
        return partition_all__2.call(this, n, step);
      case 3:
        return partition_all__3.call(this, n, step, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partition_all.cljs$lang$arity$2 = partition_all__2;
  partition_all.cljs$lang$arity$3 = partition_all__3;
  return partition_all
}();
cljs.core.take_while = function take_while(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9655 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9655) {
      var s__9656 = temp__3974__auto____9655;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__9656)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__9656), take_while.call(null, pred, cljs.core.rest.call(null, s__9656)))
      }else {
        return null
      }
    }else {
      return null
    }
  }, null)
};
cljs.core.mk_bound_fn = function mk_bound_fn(sc, test, key) {
  return function(e) {
    var comp__9658 = cljs.core._comparator.call(null, sc);
    return test.call(null, comp__9658.call(null, cljs.core._entry_key.call(null, sc, e), key), 0)
  }
};
cljs.core.subseq = function() {
  var subseq = null;
  var subseq__3 = function(sc, test, key) {
    var include__9670 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, cljs.core._GT__EQ_]).call(null, test))) {
      var temp__3974__auto____9671 = cljs.core._sorted_seq_from.call(null, sc, key, true);
      if(cljs.core.truth_(temp__3974__auto____9671)) {
        var vec__9672__9673 = temp__3974__auto____9671;
        var e__9674 = cljs.core.nth.call(null, vec__9672__9673, 0, null);
        var s__9675 = vec__9672__9673;
        if(cljs.core.truth_(include__9670.call(null, e__9674))) {
          return s__9675
        }else {
          return cljs.core.next.call(null, s__9675)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9670, cljs.core._sorted_seq.call(null, sc, true))
    }
  };
  var subseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9676 = cljs.core._sorted_seq_from.call(null, sc, start_key, true);
    if(cljs.core.truth_(temp__3974__auto____9676)) {
      var vec__9677__9678 = temp__3974__auto____9676;
      var e__9679 = cljs.core.nth.call(null, vec__9677__9678, 0, null);
      var s__9680 = vec__9677__9678;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, end_test, end_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, start_test, start_key).call(null, e__9679)) ? s__9680 : cljs.core.next.call(null, s__9680))
    }else {
      return null
    }
  };
  subseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return subseq__3.call(this, sc, start_test, start_key);
      case 5:
        return subseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  subseq.cljs$lang$arity$3 = subseq__3;
  subseq.cljs$lang$arity$5 = subseq__5;
  return subseq
}();
cljs.core.rsubseq = function() {
  var rsubseq = null;
  var rsubseq__3 = function(sc, test, key) {
    var include__9692 = cljs.core.mk_bound_fn.call(null, sc, test, key);
    if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, cljs.core._LT__EQ_]).call(null, test))) {
      var temp__3974__auto____9693 = cljs.core._sorted_seq_from.call(null, sc, key, false);
      if(cljs.core.truth_(temp__3974__auto____9693)) {
        var vec__9694__9695 = temp__3974__auto____9693;
        var e__9696 = cljs.core.nth.call(null, vec__9694__9695, 0, null);
        var s__9697 = vec__9694__9695;
        if(cljs.core.truth_(include__9692.call(null, e__9696))) {
          return s__9697
        }else {
          return cljs.core.next.call(null, s__9697)
        }
      }else {
        return null
      }
    }else {
      return cljs.core.take_while.call(null, include__9692, cljs.core._sorted_seq.call(null, sc, false))
    }
  };
  var rsubseq__5 = function(sc, start_test, start_key, end_test, end_key) {
    var temp__3974__auto____9698 = cljs.core._sorted_seq_from.call(null, sc, end_key, false);
    if(cljs.core.truth_(temp__3974__auto____9698)) {
      var vec__9699__9700 = temp__3974__auto____9698;
      var e__9701 = cljs.core.nth.call(null, vec__9699__9700, 0, null);
      var s__9702 = vec__9699__9700;
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, sc, start_test, start_key), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, sc, end_test, end_key).call(null, e__9701)) ? s__9702 : cljs.core.next.call(null, s__9702))
    }else {
      return null
    }
  };
  rsubseq = function(sc, start_test, start_key, end_test, end_key) {
    switch(arguments.length) {
      case 3:
        return rsubseq__3.call(this, sc, start_test, start_key);
      case 5:
        return rsubseq__5.call(this, sc, start_test, start_key, end_test, end_key)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rsubseq.cljs$lang$arity$3 = rsubseq__3;
  rsubseq.cljs$lang$arity$5 = rsubseq__5;
  return rsubseq
}();
cljs.core.Range = function(meta, start, end, step, __hash) {
  this.meta = meta;
  this.start = start;
  this.end = end;
  this.step = step;
  this.__hash = __hash;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(rng) {
  var this__9703 = this;
  var h__2192__auto____9704 = this__9703.__hash;
  if(!(h__2192__auto____9704 == null)) {
    return h__2192__auto____9704
  }else {
    var h__2192__auto____9705 = cljs.core.hash_coll.call(null, rng);
    this__9703.__hash = h__2192__auto____9705;
    return h__2192__auto____9705
  }
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function(rng) {
  var this__9706 = this;
  if(this__9706.step > 0) {
    if(this__9706.start + this__9706.step < this__9706.end) {
      return new cljs.core.Range(this__9706.meta, this__9706.start + this__9706.step, this__9706.end, this__9706.step, null)
    }else {
      return null
    }
  }else {
    if(this__9706.start + this__9706.step > this__9706.end) {
      return new cljs.core.Range(this__9706.meta, this__9706.start + this__9706.step, this__9706.end, this__9706.step, null)
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(rng, o) {
  var this__9707 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.toString = function() {
  var this__9708 = this;
  var this__9709 = this;
  return cljs.core.pr_str.call(null, this__9709)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(rng, f) {
  var this__9710 = this;
  return cljs.core.ci_reduce.call(null, rng, f)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(rng, f, s) {
  var this__9711 = this;
  return cljs.core.ci_reduce.call(null, rng, f, s)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(rng) {
  var this__9712 = this;
  if(this__9712.step > 0) {
    if(this__9712.start < this__9712.end) {
      return rng
    }else {
      return null
    }
  }else {
    if(this__9712.start > this__9712.end) {
      return rng
    }else {
      return null
    }
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(rng) {
  var this__9713 = this;
  if(cljs.core.not.call(null, rng.cljs$core$ISeqable$_seq$arity$1(rng))) {
    return 0
  }else {
    return Math.ceil((this__9713.end - this__9713.start) / this__9713.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function(rng) {
  var this__9714 = this;
  return this__9714.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(rng) {
  var this__9715 = this;
  if(!(rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)) {
    return new cljs.core.Range(this__9715.meta, this__9715.start + this__9715.step, this__9715.end, this__9715.step, null)
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(rng, other) {
  var this__9716 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(rng, meta) {
  var this__9717 = this;
  return new cljs.core.Range(meta, this__9717.start, this__9717.end, this__9717.step, this__9717.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function(rng) {
  var this__9718 = this;
  return this__9718.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(rng, n) {
  var this__9719 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9719.start + n * this__9719.step
  }else {
    if(function() {
      var and__3822__auto____9720 = this__9719.start > this__9719.end;
      if(and__3822__auto____9720) {
        return this__9719.step === 0
      }else {
        return and__3822__auto____9720
      }
    }()) {
      return this__9719.start
    }else {
      throw new Error("Index out of bounds");
    }
  }
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(rng, n, not_found) {
  var this__9721 = this;
  if(n < rng.cljs$core$ICounted$_count$arity$1(rng)) {
    return this__9721.start + n * this__9721.step
  }else {
    if(function() {
      var and__3822__auto____9722 = this__9721.start > this__9721.end;
      if(and__3822__auto____9722) {
        return this__9721.step === 0
      }else {
        return and__3822__auto____9722
      }
    }()) {
      return this__9721.start
    }else {
      return not_found
    }
  }
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(rng) {
  var this__9723 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__9723.meta)
};
cljs.core.Range;
cljs.core.range = function() {
  var range = null;
  var range__0 = function() {
    return range.call(null, 0, Number.MAX_VALUE, 1)
  };
  var range__1 = function(end) {
    return range.call(null, 0, end, 1)
  };
  var range__2 = function(start, end) {
    return range.call(null, start, end, 1)
  };
  var range__3 = function(start, end, step) {
    return new cljs.core.Range(null, start, end, step, null)
  };
  range = function(start, end, step) {
    switch(arguments.length) {
      case 0:
        return range__0.call(this);
      case 1:
        return range__1.call(this, start);
      case 2:
        return range__2.call(this, start, end);
      case 3:
        return range__3.call(this, start, end, step)
    }
    throw"Invalid arity: " + arguments.length;
  };
  range.cljs$lang$arity$0 = range__0;
  range.cljs$lang$arity$1 = range__1;
  range.cljs$lang$arity$2 = range__2;
  range.cljs$lang$arity$3 = range__3;
  return range
}();
cljs.core.take_nth = function take_nth(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9726 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9726) {
      var s__9727 = temp__3974__auto____9726;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__9727), take_nth.call(null, n, cljs.core.drop.call(null, n, s__9727)))
    }else {
      return null
    }
  }, null)
};
cljs.core.split_with = function split_with(pred, coll) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null, pred, coll), cljs.core.drop_while.call(null, pred, coll)], true)
};
cljs.core.partition_by = function partition_by(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3974__auto____9734 = cljs.core.seq.call(null, coll);
    if(temp__3974__auto____9734) {
      var s__9735 = temp__3974__auto____9734;
      var fst__9736 = cljs.core.first.call(null, s__9735);
      var fv__9737 = f.call(null, fst__9736);
      var run__9738 = cljs.core.cons.call(null, fst__9736, cljs.core.take_while.call(null, function(p1__9728_SHARP_) {
        return cljs.core._EQ_.call(null, fv__9737, f.call(null, p1__9728_SHARP_))
      }, cljs.core.next.call(null, s__9735)));
      return cljs.core.cons.call(null, run__9738, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__9738), s__9735))))
    }else {
      return null
    }
  }, null)
};
cljs.core.frequencies = function frequencies(coll) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(counts, x) {
    return cljs.core.assoc_BANG_.call(null, counts, x, cljs.core._lookup.call(null, counts, x, 0) + 1)
  }, cljs.core.transient$.call(null, cljs.core.ObjMap.EMPTY), coll))
};
cljs.core.reductions = function() {
  var reductions = null;
  var reductions__2 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3971__auto____9753 = cljs.core.seq.call(null, coll);
      if(temp__3971__auto____9753) {
        var s__9754 = temp__3971__auto____9753;
        return reductions.call(null, f, cljs.core.first.call(null, s__9754), cljs.core.rest.call(null, s__9754))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    }, null)
  };
  var reductions__3 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3974__auto____9755 = cljs.core.seq.call(null, coll);
      if(temp__3974__auto____9755) {
        var s__9756 = temp__3974__auto____9755;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__9756)), cljs.core.rest.call(null, s__9756))
      }else {
        return null
      }
    }, null))
  };
  reductions = function(f, init, coll) {
    switch(arguments.length) {
      case 2:
        return reductions__2.call(this, f, init);
      case 3:
        return reductions__3.call(this, f, init, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  reductions.cljs$lang$arity$2 = reductions__2;
  reductions.cljs$lang$arity$3 = reductions__3;
  return reductions
}();
cljs.core.juxt = function() {
  var juxt = null;
  var juxt__1 = function(f) {
    return function() {
      var G__9759 = null;
      var G__9759__0 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__9759__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__9759__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__9759__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__9759__4 = function() {
        var G__9760__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__9760 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9760__delegate.call(this, x, y, z, args)
        };
        G__9760.cljs$lang$maxFixedArity = 3;
        G__9760.cljs$lang$applyTo = function(arglist__9761) {
          var x = cljs.core.first(arglist__9761);
          var y = cljs.core.first(cljs.core.next(arglist__9761));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9761)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9761)));
          return G__9760__delegate(x, y, z, args)
        };
        G__9760.cljs$lang$arity$variadic = G__9760__delegate;
        return G__9760
      }();
      G__9759 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9759__0.call(this);
          case 1:
            return G__9759__1.call(this, x);
          case 2:
            return G__9759__2.call(this, x, y);
          case 3:
            return G__9759__3.call(this, x, y, z);
          default:
            return G__9759__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9759.cljs$lang$maxFixedArity = 3;
      G__9759.cljs$lang$applyTo = G__9759__4.cljs$lang$applyTo;
      return G__9759
    }()
  };
  var juxt__2 = function(f, g) {
    return function() {
      var G__9762 = null;
      var G__9762__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__9762__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__9762__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__9762__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__9762__4 = function() {
        var G__9763__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__9763 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9763__delegate.call(this, x, y, z, args)
        };
        G__9763.cljs$lang$maxFixedArity = 3;
        G__9763.cljs$lang$applyTo = function(arglist__9764) {
          var x = cljs.core.first(arglist__9764);
          var y = cljs.core.first(cljs.core.next(arglist__9764));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9764)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9764)));
          return G__9763__delegate(x, y, z, args)
        };
        G__9763.cljs$lang$arity$variadic = G__9763__delegate;
        return G__9763
      }();
      G__9762 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9762__0.call(this);
          case 1:
            return G__9762__1.call(this, x);
          case 2:
            return G__9762__2.call(this, x, y);
          case 3:
            return G__9762__3.call(this, x, y, z);
          default:
            return G__9762__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9762.cljs$lang$maxFixedArity = 3;
      G__9762.cljs$lang$applyTo = G__9762__4.cljs$lang$applyTo;
      return G__9762
    }()
  };
  var juxt__3 = function(f, g, h) {
    return function() {
      var G__9765 = null;
      var G__9765__0 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__9765__1 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__9765__2 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__9765__3 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__9765__4 = function() {
        var G__9766__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__9766 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__9766__delegate.call(this, x, y, z, args)
        };
        G__9766.cljs$lang$maxFixedArity = 3;
        G__9766.cljs$lang$applyTo = function(arglist__9767) {
          var x = cljs.core.first(arglist__9767);
          var y = cljs.core.first(cljs.core.next(arglist__9767));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9767)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9767)));
          return G__9766__delegate(x, y, z, args)
        };
        G__9766.cljs$lang$arity$variadic = G__9766__delegate;
        return G__9766
      }();
      G__9765 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__9765__0.call(this);
          case 1:
            return G__9765__1.call(this, x);
          case 2:
            return G__9765__2.call(this, x, y);
          case 3:
            return G__9765__3.call(this, x, y, z);
          default:
            return G__9765__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__9765.cljs$lang$maxFixedArity = 3;
      G__9765.cljs$lang$applyTo = G__9765__4.cljs$lang$applyTo;
      return G__9765
    }()
  };
  var juxt__4 = function() {
    var G__9768__delegate = function(f, g, h, fs) {
      var fs__9758 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__9769 = null;
        var G__9769__0 = function() {
          return cljs.core.reduce.call(null, function(p1__9739_SHARP_, p2__9740_SHARP_) {
            return cljs.core.conj.call(null, p1__9739_SHARP_, p2__9740_SHARP_.call(null))
          }, cljs.core.PersistentVector.EMPTY, fs__9758)
        };
        var G__9769__1 = function(x) {
          return cljs.core.reduce.call(null, function(p1__9741_SHARP_, p2__9742_SHARP_) {
            return cljs.core.conj.call(null, p1__9741_SHARP_, p2__9742_SHARP_.call(null, x))
          }, cljs.core.PersistentVector.EMPTY, fs__9758)
        };
        var G__9769__2 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__9743_SHARP_, p2__9744_SHARP_) {
            return cljs.core.conj.call(null, p1__9743_SHARP_, p2__9744_SHARP_.call(null, x, y))
          }, cljs.core.PersistentVector.EMPTY, fs__9758)
        };
        var G__9769__3 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__9745_SHARP_, p2__9746_SHARP_) {
            return cljs.core.conj.call(null, p1__9745_SHARP_, p2__9746_SHARP_.call(null, x, y, z))
          }, cljs.core.PersistentVector.EMPTY, fs__9758)
        };
        var G__9769__4 = function() {
          var G__9770__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__9747_SHARP_, p2__9748_SHARP_) {
              return cljs.core.conj.call(null, p1__9747_SHARP_, cljs.core.apply.call(null, p2__9748_SHARP_, x, y, z, args))
            }, cljs.core.PersistentVector.EMPTY, fs__9758)
          };
          var G__9770 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__9770__delegate.call(this, x, y, z, args)
          };
          G__9770.cljs$lang$maxFixedArity = 3;
          G__9770.cljs$lang$applyTo = function(arglist__9771) {
            var x = cljs.core.first(arglist__9771);
            var y = cljs.core.first(cljs.core.next(arglist__9771));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9771)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9771)));
            return G__9770__delegate(x, y, z, args)
          };
          G__9770.cljs$lang$arity$variadic = G__9770__delegate;
          return G__9770
        }();
        G__9769 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__9769__0.call(this);
            case 1:
              return G__9769__1.call(this, x);
            case 2:
              return G__9769__2.call(this, x, y);
            case 3:
              return G__9769__3.call(this, x, y, z);
            default:
              return G__9769__4.cljs$lang$arity$variadic(x, y, z, cljs.core.array_seq(arguments, 3))
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__9769.cljs$lang$maxFixedArity = 3;
        G__9769.cljs$lang$applyTo = G__9769__4.cljs$lang$applyTo;
        return G__9769
      }()
    };
    var G__9768 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__9768__delegate.call(this, f, g, h, fs)
    };
    G__9768.cljs$lang$maxFixedArity = 3;
    G__9768.cljs$lang$applyTo = function(arglist__9772) {
      var f = cljs.core.first(arglist__9772);
      var g = cljs.core.first(cljs.core.next(arglist__9772));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9772)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9772)));
      return G__9768__delegate(f, g, h, fs)
    };
    G__9768.cljs$lang$arity$variadic = G__9768__delegate;
    return G__9768
  }();
  juxt = function(f, g, h, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 1:
        return juxt__1.call(this, f);
      case 2:
        return juxt__2.call(this, f, g);
      case 3:
        return juxt__3.call(this, f, g, h);
      default:
        return juxt__4.cljs$lang$arity$variadic(f, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw"Invalid arity: " + arguments.length;
  };
  juxt.cljs$lang$maxFixedArity = 3;
  juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
  juxt.cljs$lang$arity$1 = juxt__1;
  juxt.cljs$lang$arity$2 = juxt__2;
  juxt.cljs$lang$arity$3 = juxt__3;
  juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
  return juxt
}();
cljs.core.dorun = function() {
  var dorun = null;
  var dorun__1 = function(coll) {
    while(true) {
      if(cljs.core.seq.call(null, coll)) {
        var G__9775 = cljs.core.next.call(null, coll);
        coll = G__9775;
        continue
      }else {
        return null
      }
      break
    }
  };
  var dorun__2 = function(n, coll) {
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3822__auto____9774 = cljs.core.seq.call(null, coll);
        if(and__3822__auto____9774) {
          return n > 0
        }else {
          return and__3822__auto____9774
        }
      }())) {
        var G__9776 = n - 1;
        var G__9777 = cljs.core.next.call(null, coll);
        n = G__9776;
        coll = G__9777;
        continue
      }else {
        return null
      }
      break
    }
  };
  dorun = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return dorun__1.call(this, n);
      case 2:
        return dorun__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  dorun.cljs$lang$arity$1 = dorun__1;
  dorun.cljs$lang$arity$2 = dorun__2;
  return dorun
}();
cljs.core.doall = function() {
  var doall = null;
  var doall__1 = function(coll) {
    cljs.core.dorun.call(null, coll);
    return coll
  };
  var doall__2 = function(n, coll) {
    cljs.core.dorun.call(null, n, coll);
    return coll
  };
  doall = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return doall__1.call(this, n);
      case 2:
        return doall__2.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  doall.cljs$lang$arity$1 = doall__1;
  doall.cljs$lang$arity$2 = doall__2;
  return doall
}();
cljs.core.regexp_QMARK_ = function regexp_QMARK_(o) {
  return o instanceof RegExp
};
cljs.core.re_matches = function re_matches(re, s) {
  var matches__9779 = re.exec(s);
  if(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__9779), s)) {
    if(cljs.core.count.call(null, matches__9779) === 1) {
      return cljs.core.first.call(null, matches__9779)
    }else {
      return cljs.core.vec.call(null, matches__9779)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__9781 = re.exec(s);
  if(matches__9781 == null) {
    return null
  }else {
    if(cljs.core.count.call(null, matches__9781) === 1) {
      return cljs.core.first.call(null, matches__9781)
    }else {
      return cljs.core.vec.call(null, matches__9781)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__9786 = cljs.core.re_find.call(null, re, s);
  var match_idx__9787 = s.search(re);
  var match_str__9788 = cljs.core.coll_QMARK_.call(null, match_data__9786) ? cljs.core.first.call(null, match_data__9786) : match_data__9786;
  var post_match__9789 = cljs.core.subs.call(null, s, match_idx__9787 + cljs.core.count.call(null, match_str__9788));
  if(cljs.core.truth_(match_data__9786)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__9786, re_seq.call(null, re, post_match__9789))
    }, null)
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  var vec__9796__9797 = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, s);
  var ___9798 = cljs.core.nth.call(null, vec__9796__9797, 0, null);
  var flags__9799 = cljs.core.nth.call(null, vec__9796__9797, 1, null);
  var pattern__9800 = cljs.core.nth.call(null, vec__9796__9797, 2, null);
  return new RegExp(pattern__9800, flags__9799)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([begin], true), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.PersistentVector.fromArray([sep], true), cljs.core.map.call(null, function(p1__9790_SHARP_) {
    return print_one.call(null, p1__9790_SHARP_, opts)
  }, coll))), cljs.core.PersistentVector.fromArray([end], true))
};
cljs.core.string_print = function string_print(x) {
  cljs.core._STAR_print_fn_STAR_.call(null, x);
  return null
};
cljs.core.flush = function flush() {
  return null
};
cljs.core.pr_seq = function pr_seq(obj, opts) {
  if(obj == null) {
    return cljs.core.list.call(null, "nil")
  }else {
    if(void 0 === obj) {
      return cljs.core.list.call(null, "#<undefined>")
    }else {
      if("\ufdd0'else") {
        return cljs.core.concat.call(null, cljs.core.truth_(function() {
          var and__3822__auto____9810 = cljs.core._lookup.call(null, opts, "\ufdd0'meta", null);
          if(cljs.core.truth_(and__3822__auto____9810)) {
            var and__3822__auto____9814 = function() {
              var G__9811__9812 = obj;
              if(G__9811__9812) {
                if(function() {
                  var or__3824__auto____9813 = G__9811__9812.cljs$lang$protocol_mask$partition0$ & 131072;
                  if(or__3824__auto____9813) {
                    return or__3824__auto____9813
                  }else {
                    return G__9811__9812.cljs$core$IMeta$
                  }
                }()) {
                  return true
                }else {
                  if(!G__9811__9812.cljs$lang$protocol_mask$partition0$) {
                    return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9811__9812)
                  }else {
                    return false
                  }
                }
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, G__9811__9812)
              }
            }();
            if(cljs.core.truth_(and__3822__auto____9814)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3822__auto____9814
            }
          }else {
            return and__3822__auto____9810
          }
        }()) ? cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["^"], true), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.PersistentVector.fromArray([" "], true)) : null, function() {
          var and__3822__auto____9815 = !(obj == null);
          if(and__3822__auto____9815) {
            return obj.cljs$lang$type
          }else {
            return and__3822__auto____9815
          }
        }() ? obj.cljs$lang$ctorPrSeq(obj) : function() {
          var G__9816__9817 = obj;
          if(G__9816__9817) {
            if(function() {
              var or__3824__auto____9818 = G__9816__9817.cljs$lang$protocol_mask$partition0$ & 536870912;
              if(or__3824__auto____9818) {
                return or__3824__auto____9818
              }else {
                return G__9816__9817.cljs$core$IPrintable$
              }
            }()) {
              return true
            }else {
              if(!G__9816__9817.cljs$lang$protocol_mask$partition0$) {
                return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9816__9817)
              }else {
                return false
              }
            }
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, G__9816__9817)
          }
        }() ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, obj)) ? cljs.core.list.call(null, '#"', obj.source, '"') : "\ufdd0'else" ? cljs.core.list.call(null, "#<", [cljs.core.str(obj)].join(""), ">") : null)
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb = function pr_sb(objs, opts) {
  var sb__9838 = new goog.string.StringBuffer;
  var G__9839__9840 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9839__9840) {
    var string__9841 = cljs.core.first.call(null, G__9839__9840);
    var G__9839__9842 = G__9839__9840;
    while(true) {
      sb__9838.append(string__9841);
      var temp__3974__auto____9843 = cljs.core.next.call(null, G__9839__9842);
      if(temp__3974__auto____9843) {
        var G__9839__9844 = temp__3974__auto____9843;
        var G__9857 = cljs.core.first.call(null, G__9839__9844);
        var G__9858 = G__9839__9844;
        string__9841 = G__9857;
        G__9839__9842 = G__9858;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9845__9846 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9845__9846) {
    var obj__9847 = cljs.core.first.call(null, G__9845__9846);
    var G__9845__9848 = G__9845__9846;
    while(true) {
      sb__9838.append(" ");
      var G__9849__9850 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9847, opts));
      if(G__9849__9850) {
        var string__9851 = cljs.core.first.call(null, G__9849__9850);
        var G__9849__9852 = G__9849__9850;
        while(true) {
          sb__9838.append(string__9851);
          var temp__3974__auto____9853 = cljs.core.next.call(null, G__9849__9852);
          if(temp__3974__auto____9853) {
            var G__9849__9854 = temp__3974__auto____9853;
            var G__9859 = cljs.core.first.call(null, G__9849__9854);
            var G__9860 = G__9849__9854;
            string__9851 = G__9859;
            G__9849__9852 = G__9860;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9855 = cljs.core.next.call(null, G__9845__9848);
      if(temp__3974__auto____9855) {
        var G__9845__9856 = temp__3974__auto____9855;
        var G__9861 = cljs.core.first.call(null, G__9845__9856);
        var G__9862 = G__9845__9856;
        obj__9847 = G__9861;
        G__9845__9848 = G__9862;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return sb__9838
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  return[cljs.core.str(cljs.core.pr_sb.call(null, objs, opts))].join("")
};
cljs.core.prn_str_with_opts = function prn_str_with_opts(objs, opts) {
  var sb__9864 = cljs.core.pr_sb.call(null, objs, opts);
  sb__9864.append("\n");
  return[cljs.core.str(sb__9864)].join("")
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var G__9883__9884 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, cljs.core.first.call(null, objs), opts));
  if(G__9883__9884) {
    var string__9885 = cljs.core.first.call(null, G__9883__9884);
    var G__9883__9886 = G__9883__9884;
    while(true) {
      cljs.core.string_print.call(null, string__9885);
      var temp__3974__auto____9887 = cljs.core.next.call(null, G__9883__9886);
      if(temp__3974__auto____9887) {
        var G__9883__9888 = temp__3974__auto____9887;
        var G__9901 = cljs.core.first.call(null, G__9883__9888);
        var G__9902 = G__9883__9888;
        string__9885 = G__9901;
        G__9883__9886 = G__9902;
        continue
      }else {
      }
      break
    }
  }else {
  }
  var G__9889__9890 = cljs.core.seq.call(null, cljs.core.next.call(null, objs));
  if(G__9889__9890) {
    var obj__9891 = cljs.core.first.call(null, G__9889__9890);
    var G__9889__9892 = G__9889__9890;
    while(true) {
      cljs.core.string_print.call(null, " ");
      var G__9893__9894 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__9891, opts));
      if(G__9893__9894) {
        var string__9895 = cljs.core.first.call(null, G__9893__9894);
        var G__9893__9896 = G__9893__9894;
        while(true) {
          cljs.core.string_print.call(null, string__9895);
          var temp__3974__auto____9897 = cljs.core.next.call(null, G__9893__9896);
          if(temp__3974__auto____9897) {
            var G__9893__9898 = temp__3974__auto____9897;
            var G__9903 = cljs.core.first.call(null, G__9893__9898);
            var G__9904 = G__9893__9898;
            string__9895 = G__9903;
            G__9893__9896 = G__9904;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3974__auto____9899 = cljs.core.next.call(null, G__9889__9892);
      if(temp__3974__auto____9899) {
        var G__9889__9900 = temp__3974__auto____9899;
        var G__9905 = cljs.core.first.call(null, G__9889__9900);
        var G__9906 = G__9889__9900;
        obj__9891 = G__9905;
        G__9889__9892 = G__9906;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.newline = function newline(opts) {
  cljs.core.string_print.call(null, "\n");
  if(cljs.core.truth_(cljs.core._lookup.call(null, opts, "\ufdd0'flush-on-newline", null))) {
    return cljs.core.flush.call(null)
  }else {
    return null
  }
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function pr_opts() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var pr_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr_str__delegate.call(this, objs)
  };
  pr_str.cljs$lang$maxFixedArity = 0;
  pr_str.cljs$lang$applyTo = function(arglist__9907) {
    var objs = cljs.core.seq(arglist__9907);
    return pr_str__delegate(objs)
  };
  pr_str.cljs$lang$arity$variadic = pr_str__delegate;
  return pr_str
}();
cljs.core.prn_str = function() {
  var prn_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var prn_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn_str__delegate.call(this, objs)
  };
  prn_str.cljs$lang$maxFixedArity = 0;
  prn_str.cljs$lang$applyTo = function(arglist__9908) {
    var objs = cljs.core.seq(arglist__9908);
    return prn_str__delegate(objs)
  };
  prn_str.cljs$lang$arity$variadic = prn_str__delegate;
  return prn_str
}();
cljs.core.pr = function() {
  var pr__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr__delegate.call(this, objs)
  };
  pr.cljs$lang$maxFixedArity = 0;
  pr.cljs$lang$applyTo = function(arglist__9909) {
    var objs = cljs.core.seq(arglist__9909);
    return pr__delegate(objs)
  };
  pr.cljs$lang$arity$variadic = pr__delegate;
  return pr
}();
cljs.core.print = function() {
  var cljs_core_print__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var cljs_core_print = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return cljs_core_print__delegate.call(this, objs)
  };
  cljs_core_print.cljs$lang$maxFixedArity = 0;
  cljs_core_print.cljs$lang$applyTo = function(arglist__9910) {
    var objs = cljs.core.seq(arglist__9910);
    return cljs_core_print__delegate(objs)
  };
  cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
  return cljs_core_print
}();
cljs.core.print_str = function() {
  var print_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var print_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return print_str__delegate.call(this, objs)
  };
  print_str.cljs$lang$maxFixedArity = 0;
  print_str.cljs$lang$applyTo = function(arglist__9911) {
    var objs = cljs.core.seq(arglist__9911);
    return print_str__delegate(objs)
  };
  print_str.cljs$lang$arity$variadic = print_str__delegate;
  return print_str
}();
cljs.core.println = function() {
  var println__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var println = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println__delegate.call(this, objs)
  };
  println.cljs$lang$maxFixedArity = 0;
  println.cljs$lang$applyTo = function(arglist__9912) {
    var objs = cljs.core.seq(arglist__9912);
    return println__delegate(objs)
  };
  println.cljs$lang$arity$variadic = println__delegate;
  return println
}();
cljs.core.println_str = function() {
  var println_str__delegate = function(objs) {
    return cljs.core.prn_str_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var println_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println_str__delegate.call(this, objs)
  };
  println_str.cljs$lang$maxFixedArity = 0;
  println_str.cljs$lang$applyTo = function(arglist__9913) {
    var objs = cljs.core.seq(arglist__9913);
    return println_str__delegate(objs)
  };
  println_str.cljs$lang$arity$variadic = println_str__delegate;
  return println_str
}();
cljs.core.prn = function() {
  var prn__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var prn = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn__delegate.call(this, objs)
  };
  prn.cljs$lang$maxFixedArity = 0;
  prn.cljs$lang$applyTo = function(arglist__9914) {
    var objs = cljs.core.seq(arglist__9914);
    return prn__delegate(objs)
  };
  prn.cljs$lang$arity$variadic = prn__delegate;
  return prn
}();
cljs.core.printf = function() {
  var printf__delegate = function(fmt, args) {
    return cljs.core.print.call(null, cljs.core.apply.call(null, cljs.core.format, fmt, args))
  };
  var printf = function(fmt, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return printf__delegate.call(this, fmt, args)
  };
  printf.cljs$lang$maxFixedArity = 1;
  printf.cljs$lang$applyTo = function(arglist__9915) {
    var fmt = cljs.core.first(arglist__9915);
    var args = cljs.core.rest(arglist__9915);
    return printf__delegate(fmt, args)
  };
  printf.cljs$lang$arity$variadic = printf__delegate;
  return printf
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9916 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9916, "{", ", ", "}", opts, coll)
};
cljs.core.IPrintable["number"] = true;
cljs.core._pr_seq["number"] = function(n, opts) {
  return cljs.core.list.call(null, [cljs.core.str(n)].join(""))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9917 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9917, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9918 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9918, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#queue [", " ", "]", opts, cljs.core.seq.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(bool, opts) {
  return cljs.core.list.call(null, [cljs.core.str(bool)].join(""))
};
cljs.core.IPrintable["string"] = true;
cljs.core._pr_seq["string"] = function(obj, opts) {
  if(cljs.core.keyword_QMARK_.call(null, obj)) {
    return cljs.core.list.call(null, [cljs.core.str(":"), cljs.core.str(function() {
      var temp__3974__auto____9919 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3974__auto____9919)) {
        var nspc__9920 = temp__3974__auto____9919;
        return[cljs.core.str(nspc__9920), cljs.core.str("/")].join("")
      }else {
        return null
      }
    }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
  }else {
    if(cljs.core.symbol_QMARK_.call(null, obj)) {
      return cljs.core.list.call(null, [cljs.core.str(function() {
        var temp__3974__auto____9921 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3974__auto____9921)) {
          var nspc__9922 = temp__3974__auto____9921;
          return[cljs.core.str(nspc__9922), cljs.core.str("/")].join("")
        }else {
          return null
        }
      }()), cljs.core.str(cljs.core.name.call(null, obj))].join(""))
    }else {
      if("\ufdd0'else") {
        return cljs.core.list.call(null, cljs.core.truth_((new cljs.core.Keyword("\ufdd0'readably")).call(null, opts)) ? goog.string.quote(obj) : obj)
      }else {
        return null
      }
    }
  }
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9923 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9923, "{", ", ", "}", opts, coll)
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["array"] = true;
cljs.core._pr_seq["array"] = function(a, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", opts, a)
};
cljs.core.IPrintable["function"] = true;
cljs.core._pr_seq["function"] = function(this$) {
  return cljs.core.list.call(null, "#<", [cljs.core.str(this$)].join(""), ">")
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.list.call(null, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(d, _) {
  var normalize__9925 = function(n, len) {
    var ns__9924 = [cljs.core.str(n)].join("");
    while(true) {
      if(cljs.core.count.call(null, ns__9924) < len) {
        var G__9927 = [cljs.core.str("0"), cljs.core.str(ns__9924)].join("");
        ns__9924 = G__9927;
        continue
      }else {
        return ns__9924
      }
      break
    }
  };
  return cljs.core.list.call(null, [cljs.core.str('#inst "'), cljs.core.str(d.getUTCFullYear()), cljs.core.str("-"), cljs.core.str(normalize__9925.call(null, d.getUTCMonth() + 1, 2)), cljs.core.str("-"), cljs.core.str(normalize__9925.call(null, d.getUTCDate(), 2)), cljs.core.str("T"), cljs.core.str(normalize__9925.call(null, d.getUTCHours(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9925.call(null, d.getUTCMinutes(), 2)), cljs.core.str(":"), cljs.core.str(normalize__9925.call(null, d.getUTCSeconds(), 
  2)), cljs.core.str("."), cljs.core.str(normalize__9925.call(null, d.getUTCMilliseconds(), 3)), cljs.core.str("-"), cljs.core.str('00:00"')].join(""))
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  var pr_pair__9926 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__9926, "{", ", ", "}", opts, coll)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(x, y) {
  return cljs.core.compare_indexed.call(null, x, y)
};
cljs.core.Atom = function(state, meta, validator, watches) {
  this.state = state;
  this.meta = meta;
  this.validator = validator;
  this.watches = watches;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2690809856
};
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__9928 = this;
  return goog.getUid(this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(this$, oldval, newval) {
  var this__9929 = this;
  var G__9930__9931 = cljs.core.seq.call(null, this__9929.watches);
  if(G__9930__9931) {
    var G__9933__9935 = cljs.core.first.call(null, G__9930__9931);
    var vec__9934__9936 = G__9933__9935;
    var key__9937 = cljs.core.nth.call(null, vec__9934__9936, 0, null);
    var f__9938 = cljs.core.nth.call(null, vec__9934__9936, 1, null);
    var G__9930__9939 = G__9930__9931;
    var G__9933__9940 = G__9933__9935;
    var G__9930__9941 = G__9930__9939;
    while(true) {
      var vec__9942__9943 = G__9933__9940;
      var key__9944 = cljs.core.nth.call(null, vec__9942__9943, 0, null);
      var f__9945 = cljs.core.nth.call(null, vec__9942__9943, 1, null);
      var G__9930__9946 = G__9930__9941;
      f__9945.call(null, key__9944, this$, oldval, newval);
      var temp__3974__auto____9947 = cljs.core.next.call(null, G__9930__9946);
      if(temp__3974__auto____9947) {
        var G__9930__9948 = temp__3974__auto____9947;
        var G__9955 = cljs.core.first.call(null, G__9930__9948);
        var G__9956 = G__9930__9948;
        G__9933__9940 = G__9955;
        G__9930__9941 = G__9956;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(this$, key, f) {
  var this__9949 = this;
  return this$.watches = cljs.core.assoc.call(null, this__9949.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(this$, key) {
  var this__9950 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__9950.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, opts) {
  var this__9951 = this;
  return cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray(["#<Atom: "], true), cljs.core._pr_seq.call(null, this__9951.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function(_) {
  var this__9952 = this;
  return this__9952.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9953 = this;
  return this__9953.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(o, other) {
  var this__9954 = this;
  return o === other
};
cljs.core.Atom;
cljs.core.atom = function() {
  var atom = null;
  var atom__1 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__2 = function() {
    var G__9968__delegate = function(x, p__9957) {
      var map__9963__9964 = p__9957;
      var map__9963__9965 = cljs.core.seq_QMARK_.call(null, map__9963__9964) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9963__9964) : map__9963__9964;
      var validator__9966 = cljs.core._lookup.call(null, map__9963__9965, "\ufdd0'validator", null);
      var meta__9967 = cljs.core._lookup.call(null, map__9963__9965, "\ufdd0'meta", null);
      return new cljs.core.Atom(x, meta__9967, validator__9966, null)
    };
    var G__9968 = function(x, var_args) {
      var p__9957 = null;
      if(goog.isDef(var_args)) {
        p__9957 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__9968__delegate.call(this, x, p__9957)
    };
    G__9968.cljs$lang$maxFixedArity = 1;
    G__9968.cljs$lang$applyTo = function(arglist__9969) {
      var x = cljs.core.first(arglist__9969);
      var p__9957 = cljs.core.rest(arglist__9969);
      return G__9968__delegate(x, p__9957)
    };
    G__9968.cljs$lang$arity$variadic = G__9968__delegate;
    return G__9968
  }();
  atom = function(x, var_args) {
    var p__9957 = var_args;
    switch(arguments.length) {
      case 1:
        return atom__1.call(this, x);
      default:
        return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  atom.cljs$lang$maxFixedArity = 1;
  atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
  atom.cljs$lang$arity$1 = atom__1;
  atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
  return atom
}();
cljs.core.reset_BANG_ = function reset_BANG_(a, new_value) {
  var temp__3974__auto____9973 = a.validator;
  if(cljs.core.truth_(temp__3974__auto____9973)) {
    var validate__9974 = temp__3974__auto____9973;
    if(cljs.core.truth_(validate__9974.call(null, new_value))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 6440))))].join(""));
    }
  }else {
  }
  var old_value__9975 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__9975, new_value);
  return new_value
};
cljs.core.swap_BANG_ = function() {
  var swap_BANG_ = null;
  var swap_BANG___2 = function(a, f) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state))
  };
  var swap_BANG___3 = function(a, f, x) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x))
  };
  var swap_BANG___4 = function(a, f, x, y) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y))
  };
  var swap_BANG___5 = function(a, f, x, y, z) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y, z))
  };
  var swap_BANG___6 = function() {
    var G__9976__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__9976 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__9976__delegate.call(this, a, f, x, y, z, more)
    };
    G__9976.cljs$lang$maxFixedArity = 5;
    G__9976.cljs$lang$applyTo = function(arglist__9977) {
      var a = cljs.core.first(arglist__9977);
      var f = cljs.core.first(cljs.core.next(arglist__9977));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9977)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9977))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9977)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9977)))));
      return G__9976__delegate(a, f, x, y, z, more)
    };
    G__9976.cljs$lang$arity$variadic = G__9976__delegate;
    return G__9976
  }();
  swap_BANG_ = function(a, f, x, y, z, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return swap_BANG___2.call(this, a, f);
      case 3:
        return swap_BANG___3.call(this, a, f, x);
      case 4:
        return swap_BANG___4.call(this, a, f, x, y);
      case 5:
        return swap_BANG___5.call(this, a, f, x, y, z);
      default:
        return swap_BANG___6.cljs$lang$arity$variadic(a, f, x, y, z, cljs.core.array_seq(arguments, 5))
    }
    throw"Invalid arity: " + arguments.length;
  };
  swap_BANG_.cljs$lang$maxFixedArity = 5;
  swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
  swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
  swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
  swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
  swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
  swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
  return swap_BANG_
}();
cljs.core.compare_and_set_BANG_ = function compare_and_set_BANG_(a, oldval, newval) {
  if(cljs.core._EQ_.call(null, a.state, oldval)) {
    cljs.core.reset_BANG_.call(null, a, newval);
    return true
  }else {
    return false
  }
};
cljs.core.deref = function deref(o) {
  return cljs.core._deref.call(null, o)
};
cljs.core.set_validator_BANG_ = function set_validator_BANG_(iref, val) {
  return iref.validator = val
};
cljs.core.get_validator = function get_validator(iref) {
  return iref.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var alter_meta_BANG___delegate = function(iref, f, args) {
    return iref.meta = cljs.core.apply.call(null, f, iref.meta, args)
  };
  var alter_meta_BANG_ = function(iref, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__9978) {
    var iref = cljs.core.first(arglist__9978);
    var f = cljs.core.first(cljs.core.next(arglist__9978));
    var args = cljs.core.rest(cljs.core.next(arglist__9978));
    return alter_meta_BANG___delegate(iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
  return alter_meta_BANG_
}();
cljs.core.reset_meta_BANG_ = function reset_meta_BANG_(iref, m) {
  return iref.meta = m
};
cljs.core.add_watch = function add_watch(iref, key, f) {
  return cljs.core._add_watch.call(null, iref, key, f)
};
cljs.core.remove_watch = function remove_watch(iref, key) {
  return cljs.core._remove_watch.call(null, iref, key)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var gensym = null;
  var gensym__0 = function() {
    return gensym.call(null, "G__")
  };
  var gensym__1 = function(prefix_string) {
    if(cljs.core.gensym_counter == null) {
      cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
    }else {
    }
    return cljs.core.symbol.call(null, [cljs.core.str(prefix_string), cljs.core.str(cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc))].join(""))
  };
  gensym = function(prefix_string) {
    switch(arguments.length) {
      case 0:
        return gensym__0.call(this);
      case 1:
        return gensym__1.call(this, prefix_string)
    }
    throw"Invalid arity: " + arguments.length;
  };
  gensym.cljs$lang$arity$0 = gensym__0;
  gensym.cljs$lang$arity$1 = gensym__1;
  return gensym
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(state, f) {
  this.state = state;
  this.f = f;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073774592
};
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function(d) {
  var this__9979 = this;
  return(new cljs.core.Keyword("\ufdd0'done")).call(null, cljs.core.deref.call(null, this__9979.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function(_) {
  var this__9980 = this;
  return(new cljs.core.Keyword("\ufdd0'value")).call(null, cljs.core.swap_BANG_.call(null, this__9980.state, function(p__9981) {
    var map__9982__9983 = p__9981;
    var map__9982__9984 = cljs.core.seq_QMARK_.call(null, map__9982__9983) ? cljs.core.apply.call(null, cljs.core.hash_map, map__9982__9983) : map__9982__9983;
    var curr_state__9985 = map__9982__9984;
    var done__9986 = cljs.core._lookup.call(null, map__9982__9984, "\ufdd0'done", null);
    if(cljs.core.truth_(done__9986)) {
      return curr_state__9985
    }else {
      return cljs.core.ObjMap.fromObject(["\ufdd0'done", "\ufdd0'value"], {"\ufdd0'done":true, "\ufdd0'value":this__9980.f.call(null)})
    }
  }))
};
cljs.core.Delay;
cljs.core.delay_QMARK_ = function delay_QMARK_(x) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, x)
};
cljs.core.force = function force(x) {
  if(cljs.core.delay_QMARK_.call(null, x)) {
    return cljs.core.deref.call(null, x)
  }else {
    return x
  }
};
cljs.core.realized_QMARK_ = function realized_QMARK_(d) {
  return cljs.core._realized_QMARK_.call(null, d)
};
cljs.core.js__GT_clj = function() {
  var js__GT_clj__delegate = function(x, options) {
    var map__10007__10008 = options;
    var map__10007__10009 = cljs.core.seq_QMARK_.call(null, map__10007__10008) ? cljs.core.apply.call(null, cljs.core.hash_map, map__10007__10008) : map__10007__10008;
    var keywordize_keys__10010 = cljs.core._lookup.call(null, map__10007__10009, "\ufdd0'keywordize-keys", null);
    var keyfn__10011 = cljs.core.truth_(keywordize_keys__10010) ? cljs.core.keyword : cljs.core.str;
    var f__10026 = function thisfn(x) {
      if(cljs.core.seq_QMARK_.call(null, x)) {
        return cljs.core.doall.call(null, cljs.core.map.call(null, thisfn, x))
      }else {
        if(cljs.core.coll_QMARK_.call(null, x)) {
          return cljs.core.into.call(null, cljs.core.empty.call(null, x), cljs.core.map.call(null, thisfn, x))
        }else {
          if(cljs.core.truth_(goog.isArray(x))) {
            return cljs.core.vec.call(null, cljs.core.map.call(null, thisfn, x))
          }else {
            if(cljs.core.type.call(null, x) === Object) {
              return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, function() {
                var iter__2462__auto____10025 = function iter__10019(s__10020) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__10020__10023 = s__10020;
                    while(true) {
                      if(cljs.core.seq.call(null, s__10020__10023)) {
                        var k__10024 = cljs.core.first.call(null, s__10020__10023);
                        return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([keyfn__10011.call(null, k__10024), thisfn.call(null, x[k__10024])], true), iter__10019.call(null, cljs.core.rest.call(null, s__10020__10023)))
                      }else {
                        return null
                      }
                      break
                    }
                  }, null)
                };
                return iter__2462__auto____10025.call(null, cljs.core.js_keys.call(null, x))
              }())
            }else {
              if("\ufdd0'else") {
                return x
              }else {
                return null
              }
            }
          }
        }
      }
    };
    return f__10026.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__10027) {
    var x = cljs.core.first(arglist__10027);
    var options = cljs.core.rest(arglist__10027);
    return js__GT_clj__delegate(x, options)
  };
  js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__10032 = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY);
  return function() {
    var G__10036__delegate = function(args) {
      var temp__3971__auto____10033 = cljs.core._lookup.call(null, cljs.core.deref.call(null, mem__10032), args, null);
      if(cljs.core.truth_(temp__3971__auto____10033)) {
        var v__10034 = temp__3971__auto____10033;
        return v__10034
      }else {
        var ret__10035 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__10032, cljs.core.assoc, args, ret__10035);
        return ret__10035
      }
    };
    var G__10036 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__10036__delegate.call(this, args)
    };
    G__10036.cljs$lang$maxFixedArity = 0;
    G__10036.cljs$lang$applyTo = function(arglist__10037) {
      var args = cljs.core.seq(arglist__10037);
      return G__10036__delegate(args)
    };
    G__10036.cljs$lang$arity$variadic = G__10036__delegate;
    return G__10036
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__1 = function(f) {
    while(true) {
      var ret__10039 = f.call(null);
      if(cljs.core.fn_QMARK_.call(null, ret__10039)) {
        var G__10040 = ret__10039;
        f = G__10040;
        continue
      }else {
        return ret__10039
      }
      break
    }
  };
  var trampoline__2 = function() {
    var G__10041__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__10041 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__10041__delegate.call(this, f, args)
    };
    G__10041.cljs$lang$maxFixedArity = 1;
    G__10041.cljs$lang$applyTo = function(arglist__10042) {
      var f = cljs.core.first(arglist__10042);
      var args = cljs.core.rest(arglist__10042);
      return G__10041__delegate(f, args)
    };
    G__10041.cljs$lang$arity$variadic = G__10041__delegate;
    return G__10041
  }();
  trampoline = function(f, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 1:
        return trampoline__1.call(this, f);
      default:
        return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1))
    }
    throw"Invalid arity: " + arguments.length;
  };
  trampoline.cljs$lang$maxFixedArity = 1;
  trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
  trampoline.cljs$lang$arity$1 = trampoline__1;
  trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
  return trampoline
}();
cljs.core.rand = function() {
  var rand = null;
  var rand__0 = function() {
    return rand.call(null, 1)
  };
  var rand__1 = function(n) {
    return Math.random.call(null) * n
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__0.call(this);
      case 1:
        return rand__1.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  rand.cljs$lang$arity$0 = rand__0;
  rand.cljs$lang$arity$1 = rand__1;
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return Math.floor.call(null, Math.random.call(null) * n)
};
cljs.core.rand_nth = function rand_nth(coll) {
  return cljs.core.nth.call(null, coll, cljs.core.rand_int.call(null, cljs.core.count.call(null, coll)))
};
cljs.core.group_by = function group_by(f, coll) {
  return cljs.core.reduce.call(null, function(ret, x) {
    var k__10044 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__10044, cljs.core.conj.call(null, cljs.core._lookup.call(null, ret, k__10044, cljs.core.PersistentVector.EMPTY), x))
  }, cljs.core.ObjMap.EMPTY, coll)
};
cljs.core.make_hierarchy = function make_hierarchy() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.EMPTY, "\ufdd0'descendants":cljs.core.ObjMap.EMPTY, "\ufdd0'ancestors":cljs.core.ObjMap.EMPTY})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var isa_QMARK_ = null;
  var isa_QMARK___2 = function(child, parent) {
    return isa_QMARK_.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), child, parent)
  };
  var isa_QMARK___3 = function(h, child, parent) {
    var or__3824__auto____10053 = cljs.core._EQ_.call(null, child, parent);
    if(or__3824__auto____10053) {
      return or__3824__auto____10053
    }else {
      var or__3824__auto____10054 = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h).call(null, child), parent);
      if(or__3824__auto____10054) {
        return or__3824__auto____10054
      }else {
        var and__3822__auto____10055 = cljs.core.vector_QMARK_.call(null, parent);
        if(and__3822__auto____10055) {
          var and__3822__auto____10056 = cljs.core.vector_QMARK_.call(null, child);
          if(and__3822__auto____10056) {
            var and__3822__auto____10057 = cljs.core.count.call(null, parent) === cljs.core.count.call(null, child);
            if(and__3822__auto____10057) {
              var ret__10058 = true;
              var i__10059 = 0;
              while(true) {
                if(function() {
                  var or__3824__auto____10060 = cljs.core.not.call(null, ret__10058);
                  if(or__3824__auto____10060) {
                    return or__3824__auto____10060
                  }else {
                    return i__10059 === cljs.core.count.call(null, parent)
                  }
                }()) {
                  return ret__10058
                }else {
                  var G__10061 = isa_QMARK_.call(null, h, child.call(null, i__10059), parent.call(null, i__10059));
                  var G__10062 = i__10059 + 1;
                  ret__10058 = G__10061;
                  i__10059 = G__10062;
                  continue
                }
                break
              }
            }else {
              return and__3822__auto____10057
            }
          }else {
            return and__3822__auto____10056
          }
        }else {
          return and__3822__auto____10055
        }
      }
    }
  };
  isa_QMARK_ = function(h, child, parent) {
    switch(arguments.length) {
      case 2:
        return isa_QMARK___2.call(this, h, child);
      case 3:
        return isa_QMARK___3.call(this, h, child, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
  isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
  return isa_QMARK_
}();
cljs.core.parents = function() {
  var parents = null;
  var parents__1 = function(tag) {
    return parents.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var parents__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, null))
  };
  parents = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return parents__1.call(this, h);
      case 2:
        return parents__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  parents.cljs$lang$arity$1 = parents__1;
  parents.cljs$lang$arity$2 = parents__2;
  return parents
}();
cljs.core.ancestors = function() {
  var ancestors = null;
  var ancestors__1 = function(tag) {
    return ancestors.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var ancestors__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, null))
  };
  ancestors = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return ancestors__1.call(this, h);
      case 2:
        return ancestors__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  ancestors.cljs$lang$arity$1 = ancestors__1;
  ancestors.cljs$lang$arity$2 = ancestors__2;
  return ancestors
}();
cljs.core.descendants = function() {
  var descendants = null;
  var descendants__1 = function(tag) {
    return descendants.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var descendants__2 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core._lookup.call(null, (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), tag, null))
  };
  descendants = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return descendants__1.call(this, h);
      case 2:
        return descendants__2.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  descendants.cljs$lang$arity$1 = descendants__1;
  descendants.cljs$lang$arity$2 = descendants__2;
  return descendants
}();
cljs.core.derive = function() {
  var derive = null;
  var derive__2 = function(tag, parent) {
    if(cljs.core.truth_(cljs.core.namespace.call(null, parent))) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6724))))].join(""));
    }
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, derive, tag, parent);
    return null
  };
  var derive__3 = function(h, tag, parent) {
    if(cljs.core.not_EQ_.call(null, tag, parent)) {
    }else {
      throw new Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 6728))))].join(""));
    }
    var tp__10071 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var td__10072 = (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h);
    var ta__10073 = (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h);
    var tf__10074 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core._lookup.call(null, targets, k, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3824__auto____10075 = cljs.core.contains_QMARK_.call(null, tp__10071.call(null, tag), parent) ? null : function() {
      if(cljs.core.contains_QMARK_.call(null, ta__10073.call(null, tag), parent)) {
        throw new Error([cljs.core.str(tag), cljs.core.str("already has"), cljs.core.str(parent), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      if(cljs.core.contains_QMARK_.call(null, ta__10073.call(null, parent), tag)) {
        throw new Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(parent), cljs.core.str("has"), cljs.core.str(tag), cljs.core.str("as ancestor")].join(""));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, (new cljs.core.Keyword("\ufdd0'parents")).call(null, h), tag, cljs.core.conj.call(null, cljs.core._lookup.call(null, tp__10071, tag, cljs.core.PersistentHashSet.EMPTY), parent)), "\ufdd0'ancestors":tf__10074.call(null, (new cljs.core.Keyword("\ufdd0'ancestors")).call(null, h), tag, td__10072, parent, ta__10073), "\ufdd0'descendants":tf__10074.call(null, 
      (new cljs.core.Keyword("\ufdd0'descendants")).call(null, h), parent, ta__10073, tag, td__10072)})
    }();
    if(cljs.core.truth_(or__3824__auto____10075)) {
      return or__3824__auto____10075
    }else {
      return h
    }
  };
  derive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return derive__2.call(this, h, tag);
      case 3:
        return derive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  derive.cljs$lang$arity$2 = derive__2;
  derive.cljs$lang$arity$3 = derive__3;
  return derive
}();
cljs.core.underive = function() {
  var underive = null;
  var underive__2 = function(tag, parent) {
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, underive, tag, parent);
    return null
  };
  var underive__3 = function(h, tag, parent) {
    var parentMap__10080 = (new cljs.core.Keyword("\ufdd0'parents")).call(null, h);
    var childsParents__10081 = cljs.core.truth_(parentMap__10080.call(null, tag)) ? cljs.core.disj.call(null, parentMap__10080.call(null, tag), parent) : cljs.core.PersistentHashSet.EMPTY;
    var newParents__10082 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__10081)) ? cljs.core.assoc.call(null, parentMap__10080, tag, childsParents__10081) : cljs.core.dissoc.call(null, parentMap__10080, tag);
    var deriv_seq__10083 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__10063_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__10063_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__10063_SHARP_), cljs.core.second.call(null, p1__10063_SHARP_)))
    }, cljs.core.seq.call(null, newParents__10082)));
    if(cljs.core.contains_QMARK_.call(null, parentMap__10080.call(null, tag), parent)) {
      return cljs.core.reduce.call(null, function(p1__10064_SHARP_, p2__10065_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__10064_SHARP_, p2__10065_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__10083))
    }else {
      return h
    }
  };
  underive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return underive__2.call(this, h, tag);
      case 3:
        return underive__3.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  underive.cljs$lang$arity$2 = underive__2;
  underive.cljs$lang$arity$3 = underive__3;
  return underive
}();
cljs.core.reset_cache = function reset_cache(method_cache, method_table, cached_hierarchy, hierarchy) {
  cljs.core.swap_BANG_.call(null, method_cache, function(_) {
    return cljs.core.deref.call(null, method_table)
  });
  return cljs.core.swap_BANG_.call(null, cached_hierarchy, function(_) {
    return cljs.core.deref.call(null, hierarchy)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(x, y, prefer_table) {
  var xprefs__10091 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3824__auto____10093 = cljs.core.truth_(function() {
    var and__3822__auto____10092 = xprefs__10091;
    if(cljs.core.truth_(and__3822__auto____10092)) {
      return xprefs__10091.call(null, y)
    }else {
      return and__3822__auto____10092
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3824__auto____10093)) {
    return or__3824__auto____10093
  }else {
    var or__3824__auto____10095 = function() {
      var ps__10094 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.count.call(null, ps__10094) > 0) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__10094), prefer_table))) {
          }else {
          }
          var G__10098 = cljs.core.rest.call(null, ps__10094);
          ps__10094 = G__10098;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3824__auto____10095)) {
      return or__3824__auto____10095
    }else {
      var or__3824__auto____10097 = function() {
        var ps__10096 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.count.call(null, ps__10096) > 0) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__10096), y, prefer_table))) {
            }else {
            }
            var G__10099 = cljs.core.rest.call(null, ps__10096);
            ps__10096 = G__10099;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3824__auto____10097)) {
        return or__3824__auto____10097
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3824__auto____10101 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3824__auto____10101)) {
    return or__3824__auto____10101
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__10119 = cljs.core.reduce.call(null, function(be, p__10111) {
    var vec__10112__10113 = p__10111;
    var k__10114 = cljs.core.nth.call(null, vec__10112__10113, 0, null);
    var ___10115 = cljs.core.nth.call(null, vec__10112__10113, 1, null);
    var e__10116 = vec__10112__10113;
    if(cljs.core.isa_QMARK_.call(null, dispatch_val, k__10114)) {
      var be2__10118 = cljs.core.truth_(function() {
        var or__3824__auto____10117 = be == null;
        if(or__3824__auto____10117) {
          return or__3824__auto____10117
        }else {
          return cljs.core.dominates.call(null, k__10114, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__10116 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__10118), k__10114, prefer_table))) {
      }else {
        throw new Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(name), cljs.core.str("' match dispatch value: "), cljs.core.str(dispatch_val), cljs.core.str(" -> "), cljs.core.str(k__10114), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, be2__10118)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return be2__10118
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__10119)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__10119));
      return cljs.core.second.call(null, best_entry__10119)
    }else {
      cljs.core.reset_cache.call(null, method_cache, method_table, cached_hierarchy, hierarchy);
      return find_and_cache_best_method.call(null, name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy)
    }
  }else {
    return null
  }
};
cljs.core.IMultiFn = {};
cljs.core._reset = function _reset(mf) {
  if(function() {
    var and__3822__auto____10124 = mf;
    if(and__3822__auto____10124) {
      return mf.cljs$core$IMultiFn$_reset$arity$1
    }else {
      return and__3822__auto____10124
    }
  }()) {
    return mf.cljs$core$IMultiFn$_reset$arity$1(mf)
  }else {
    var x__2363__auto____10125 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10126 = cljs.core._reset[goog.typeOf(x__2363__auto____10125)];
      if(or__3824__auto____10126) {
        return or__3824__auto____10126
      }else {
        var or__3824__auto____10127 = cljs.core._reset["_"];
        if(or__3824__auto____10127) {
          return or__3824__auto____10127
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(function() {
    var and__3822__auto____10132 = mf;
    if(and__3822__auto____10132) {
      return mf.cljs$core$IMultiFn$_add_method$arity$3
    }else {
      return and__3822__auto____10132
    }
  }()) {
    return mf.cljs$core$IMultiFn$_add_method$arity$3(mf, dispatch_val, method)
  }else {
    var x__2363__auto____10133 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10134 = cljs.core._add_method[goog.typeOf(x__2363__auto____10133)];
      if(or__3824__auto____10134) {
        return or__3824__auto____10134
      }else {
        var or__3824__auto____10135 = cljs.core._add_method["_"];
        if(or__3824__auto____10135) {
          return or__3824__auto____10135
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____10140 = mf;
    if(and__3822__auto____10140) {
      return mf.cljs$core$IMultiFn$_remove_method$arity$2
    }else {
      return and__3822__auto____10140
    }
  }()) {
    return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf, dispatch_val)
  }else {
    var x__2363__auto____10141 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10142 = cljs.core._remove_method[goog.typeOf(x__2363__auto____10141)];
      if(or__3824__auto____10142) {
        return or__3824__auto____10142
      }else {
        var or__3824__auto____10143 = cljs.core._remove_method["_"];
        if(or__3824__auto____10143) {
          return or__3824__auto____10143
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(function() {
    var and__3822__auto____10148 = mf;
    if(and__3822__auto____10148) {
      return mf.cljs$core$IMultiFn$_prefer_method$arity$3
    }else {
      return and__3822__auto____10148
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf, dispatch_val, dispatch_val_y)
  }else {
    var x__2363__auto____10149 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10150 = cljs.core._prefer_method[goog.typeOf(x__2363__auto____10149)];
      if(or__3824__auto____10150) {
        return or__3824__auto____10150
      }else {
        var or__3824__auto____10151 = cljs.core._prefer_method["_"];
        if(or__3824__auto____10151) {
          return or__3824__auto____10151
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(function() {
    var and__3822__auto____10156 = mf;
    if(and__3822__auto____10156) {
      return mf.cljs$core$IMultiFn$_get_method$arity$2
    }else {
      return and__3822__auto____10156
    }
  }()) {
    return mf.cljs$core$IMultiFn$_get_method$arity$2(mf, dispatch_val)
  }else {
    var x__2363__auto____10157 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10158 = cljs.core._get_method[goog.typeOf(x__2363__auto____10157)];
      if(or__3824__auto____10158) {
        return or__3824__auto____10158
      }else {
        var or__3824__auto____10159 = cljs.core._get_method["_"];
        if(or__3824__auto____10159) {
          return or__3824__auto____10159
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(function() {
    var and__3822__auto____10164 = mf;
    if(and__3822__auto____10164) {
      return mf.cljs$core$IMultiFn$_methods$arity$1
    }else {
      return and__3822__auto____10164
    }
  }()) {
    return mf.cljs$core$IMultiFn$_methods$arity$1(mf)
  }else {
    var x__2363__auto____10165 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10166 = cljs.core._methods[goog.typeOf(x__2363__auto____10165)];
      if(or__3824__auto____10166) {
        return or__3824__auto____10166
      }else {
        var or__3824__auto____10167 = cljs.core._methods["_"];
        if(or__3824__auto____10167) {
          return or__3824__auto____10167
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(function() {
    var and__3822__auto____10172 = mf;
    if(and__3822__auto____10172) {
      return mf.cljs$core$IMultiFn$_prefers$arity$1
    }else {
      return and__3822__auto____10172
    }
  }()) {
    return mf.cljs$core$IMultiFn$_prefers$arity$1(mf)
  }else {
    var x__2363__auto____10173 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10174 = cljs.core._prefers[goog.typeOf(x__2363__auto____10173)];
      if(or__3824__auto____10174) {
        return or__3824__auto____10174
      }else {
        var or__3824__auto____10175 = cljs.core._prefers["_"];
        if(or__3824__auto____10175) {
          return or__3824__auto____10175
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._dispatch = function _dispatch(mf, args) {
  if(function() {
    var and__3822__auto____10180 = mf;
    if(and__3822__auto____10180) {
      return mf.cljs$core$IMultiFn$_dispatch$arity$2
    }else {
      return and__3822__auto____10180
    }
  }()) {
    return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf, args)
  }else {
    var x__2363__auto____10181 = mf == null ? null : mf;
    return function() {
      var or__3824__auto____10182 = cljs.core._dispatch[goog.typeOf(x__2363__auto____10181)];
      if(or__3824__auto____10182) {
        return or__3824__auto____10182
      }else {
        var or__3824__auto____10183 = cljs.core._dispatch["_"];
        if(or__3824__auto____10183) {
          return or__3824__auto____10183
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_dispatch = function do_dispatch(mf, dispatch_fn, args) {
  var dispatch_val__10186 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__10187 = cljs.core._get_method.call(null, mf, dispatch_val__10186);
  if(cljs.core.truth_(target_fn__10187)) {
  }else {
    throw new Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(dispatch_val__10186)].join(""));
  }
  return cljs.core.apply.call(null, target_fn__10187, args)
};
cljs.core.MultiFn = function(name, dispatch_fn, default_dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  this.name = name;
  this.dispatch_fn = dispatch_fn;
  this.default_dispatch_val = default_dispatch_val;
  this.hierarchy = hierarchy;
  this.method_table = method_table;
  this.prefer_table = prefer_table;
  this.method_cache = method_cache;
  this.cached_hierarchy = cached_hierarchy;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 64
};
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10188 = this;
  return goog.getUid(this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(mf) {
  var this__10189 = this;
  cljs.core.swap_BANG_.call(null, this__10189.method_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10189.method_cache, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10189.prefer_table, function(mf) {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this__10189.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(mf, dispatch_val, method) {
  var this__10190 = this;
  cljs.core.swap_BANG_.call(null, this__10190.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__10190.method_cache, this__10190.method_table, this__10190.cached_hierarchy, this__10190.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(mf, dispatch_val) {
  var this__10191 = this;
  cljs.core.swap_BANG_.call(null, this__10191.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__10191.method_cache, this__10191.method_table, this__10191.cached_hierarchy, this__10191.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(mf, dispatch_val) {
  var this__10192 = this;
  if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__10192.cached_hierarchy), cljs.core.deref.call(null, this__10192.hierarchy))) {
  }else {
    cljs.core.reset_cache.call(null, this__10192.method_cache, this__10192.method_table, this__10192.cached_hierarchy, this__10192.hierarchy)
  }
  var temp__3971__auto____10193 = cljs.core.deref.call(null, this__10192.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3971__auto____10193)) {
    var target_fn__10194 = temp__3971__auto____10193;
    return target_fn__10194
  }else {
    var temp__3971__auto____10195 = cljs.core.find_and_cache_best_method.call(null, this__10192.name, dispatch_val, this__10192.hierarchy, this__10192.method_table, this__10192.prefer_table, this__10192.method_cache, this__10192.cached_hierarchy);
    if(cljs.core.truth_(temp__3971__auto____10195)) {
      var target_fn__10196 = temp__3971__auto____10195;
      return target_fn__10196
    }else {
      return cljs.core.deref.call(null, this__10192.method_table).call(null, this__10192.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__10197 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__10197.prefer_table))) {
    throw new Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this__10197.name), cljs.core.str("': "), cljs.core.str(dispatch_val_y), cljs.core.str(" is already preferred to "), cljs.core.str(dispatch_val_x)].join(""));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__10197.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core._lookup.call(null, old, dispatch_val_x, cljs.core.PersistentHashSet.EMPTY), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__10197.method_cache, this__10197.method_table, this__10197.cached_hierarchy, this__10197.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function(mf) {
  var this__10198 = this;
  return cljs.core.deref.call(null, this__10198.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function(mf) {
  var this__10199 = this;
  return cljs.core.deref.call(null, this__10199.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(mf, args) {
  var this__10200 = this;
  return cljs.core.do_dispatch.call(null, mf, this__10200.dispatch_fn, args)
};
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = function() {
  var G__10202__delegate = function(_, args) {
    var self__10201 = this;
    return cljs.core._dispatch.call(null, self__10201, args)
  };
  var G__10202 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__10202__delegate.call(this, _, args)
  };
  G__10202.cljs$lang$maxFixedArity = 1;
  G__10202.cljs$lang$applyTo = function(arglist__10203) {
    var _ = cljs.core.first(arglist__10203);
    var args = cljs.core.rest(arglist__10203);
    return G__10202__delegate(_, args)
  };
  G__10202.cljs$lang$arity$variadic = G__10202__delegate;
  return G__10202
}();
cljs.core.MultiFn.prototype.apply = function(_, args) {
  var self__10204 = this;
  return cljs.core._dispatch.call(null, self__10204, args)
};
cljs.core.remove_all_methods = function remove_all_methods(multifn) {
  return cljs.core._reset.call(null, multifn)
};
cljs.core.remove_method = function remove_method(multifn, dispatch_val) {
  return cljs.core._remove_method.call(null, multifn, dispatch_val)
};
cljs.core.prefer_method = function prefer_method(multifn, dispatch_val_x, dispatch_val_y) {
  return cljs.core._prefer_method.call(null, multifn, dispatch_val_x, dispatch_val_y)
};
cljs.core.methods$ = function methods$(multifn) {
  return cljs.core._methods.call(null, multifn)
};
cljs.core.get_method = function get_method(multifn, dispatch_val) {
  return cljs.core._get_method.call(null, multifn, dispatch_val)
};
cljs.core.prefers = function prefers(multifn) {
  return cljs.core._prefers.call(null, multifn)
};
cljs.core.UUID = function(uuid) {
  this.uuid = uuid;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 543162368
};
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = function(this__2309__auto__) {
  return cljs.core.list.call(null, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(this$) {
  var this__10205 = this;
  return goog.string.hashCode(cljs.core.pr_str.call(null, this$))
};
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(_10207, _) {
  var this__10206 = this;
  return cljs.core.list.call(null, [cljs.core.str('#uuid "'), cljs.core.str(this__10206.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(_, other) {
  var this__10208 = this;
  var and__3822__auto____10209 = cljs.core.instance_QMARK_.call(null, cljs.core.UUID, other);
  if(and__3822__auto____10209) {
    return this__10208.uuid === other.uuid
  }else {
    return and__3822__auto____10209
  }
};
cljs.core.UUID.prototype.toString = function() {
  var this__10210 = this;
  var this__10211 = this;
  return cljs.core.pr_str.call(null, this__10211)
};
cljs.core.UUID;
goog.provide("goog.userAgent");
goog.require("goog.string");
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global["navigator"] ? goog.global["navigator"].userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global["navigator"]
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = false;
  goog.userAgent.detectedIe_ = false;
  goog.userAgent.detectedWebkit_ = false;
  goog.userAgent.detectedMobile_ = false;
  goog.userAgent.detectedGecko_ = false;
  var ua;
  if(!goog.userAgent.BROWSER_KNOWN_ && (ua = goog.userAgent.getUserAgentString())) {
    var navigator = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = ua.indexOf("Opera") == 0;
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && ua.indexOf("MSIE") != -1;
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && ua.indexOf("WebKit") != -1;
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && ua.indexOf("Mobile") != -1;
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && navigator.product == "Gecko"
  }
};
if(!goog.userAgent.BROWSER_KNOWN_) {
  goog.userAgent.init_()
}
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigator();
  return navigator && navigator.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator()["appVersion"] || "", "X11")
};
if(!goog.userAgent.PLATFORM_KNOWN_) {
  goog.userAgent.initPlatform_()
}
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var version = "", re;
  if(goog.userAgent.OPERA && goog.global["opera"]) {
    var operaVersion = goog.global["opera"].version;
    version = typeof operaVersion == "function" ? operaVersion() : operaVersion
  }else {
    if(goog.userAgent.GECKO) {
      re = /rv\:([^\);]+)(\)|;)/
    }else {
      if(goog.userAgent.IE) {
        re = /MSIE\s+([^\);]+)(\)|;)/
      }else {
        if(goog.userAgent.WEBKIT) {
          re = /WebKit\/(\S+)/
        }
      }
    }
    if(re) {
      var arr = re.exec(goog.userAgent.getUserAgentString());
      version = arr ? arr[1] : ""
    }
  }
  if(goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if(docMode > parseFloat(version)) {
      return String(docMode)
    }
  }
  return version
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global["document"];
  return doc ? doc["documentMode"] : undefined
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return goog.string.compareVersions(v1, v2)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(version) {
  return goog.userAgent.isVersionCache_[version] || (goog.userAgent.isVersionCache_[version] = goog.string.compareVersions(goog.userAgent.VERSION, version) >= 0)
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(documentMode) {
  return goog.userAgent.isDocumentModeCache_[documentMode] || (goog.userAgent.isDocumentModeCache_[documentMode] = goog.userAgent.IE && document.documentMode && document.documentMode >= documentMode)
};
goog.provide("goog.events.EventType");
goog.require("goog.userAgent");
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", MESSAGE:"message", CONNECT:"connect", TRANSITIONEND:goog.userAgent.WEBKIT ? "webkitTransitionEnd" : goog.userAgent.OPERA ? "oTransitionEnd" : "transitionend"};
goog.provide("goog.disposable.IDisposable");
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose;
goog.disposable.IDisposable.prototype.isDisposed;
goog.provide("goog.Disposable");
goog.provide("goog.dispose");
goog.require("goog.disposable.IDisposable");
goog.Disposable = function() {
  if(goog.Disposable.ENABLE_MONITORING) {
    goog.Disposable.instances_[goog.getUid(this)] = this
  }
};
goog.Disposable.ENABLE_MONITORING = false;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var ret = [];
  for(var id in goog.Disposable.instances_) {
    if(goog.Disposable.instances_.hasOwnProperty(id)) {
      ret.push(goog.Disposable.instances_[Number(id)])
    }
  }
  return ret
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.dependentDisposables_;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
    if(goog.Disposable.ENABLE_MONITORING) {
      var uid = goog.getUid(this);
      if(!goog.Disposable.instances_.hasOwnProperty(uid)) {
        throw Error(this + " did not call the goog.Disposable base " + "constructor or was disposed of after a clearUndisposedObjects " + "call");
      }
      delete goog.Disposable.instances_[uid]
    }
  }
};
goog.Disposable.prototype.registerDisposable = function(disposable) {
  if(!this.dependentDisposables_) {
    this.dependentDisposables_ = []
  }
  this.dependentDisposables_.push(disposable)
};
goog.Disposable.prototype.disposeInternal = function() {
  if(this.dependentDisposables_) {
    goog.disposeAll.apply(null, this.dependentDisposables_)
  }
};
goog.dispose = function(obj) {
  if(obj && typeof obj.dispose == "function") {
    obj.dispose()
  }
};
goog.disposeAll = function(var_args) {
  for(var i = 0, len = arguments.length;i < len;++i) {
    var disposable = arguments[i];
    if(goog.isArrayLike(disposable)) {
      goog.disposeAll.apply(null, disposable)
    }else {
      goog.dispose(disposable)
    }
  }
};
goog.provide("goog.debug.EntryPointMonitor");
goog.provide("goog.debug.entryPointRegistry");
goog.require("goog.asserts");
goog.debug.EntryPointMonitor = function() {
};
goog.debug.EntryPointMonitor.prototype.wrap;
goog.debug.EntryPointMonitor.prototype.unwrap;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = false;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if(goog.debug.entryPointRegistry.monitorsMayExist_) {
    var monitors = goog.debug.entryPointRegistry.monitors_;
    for(var i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]))
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = true;
  var transformer = goog.bind(monitor.wrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor)
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  var transformer = goog.bind(monitor.unwrap, monitor);
  for(var i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer)
  }
  monitors.length--
};
goog.provide("goog.debug.errorHandlerWeakDep");
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(fn, opt_tracers) {
  return fn
}};
goog.provide("goog.events.BrowserFeature");
goog.require("goog.userAgent");
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.provide("goog.events.Event");
goog.require("goog.Disposable");
goog.events.Event = function(type, opt_target) {
  goog.Disposable.call(this);
  this.type = type;
  this.target = opt_target;
  this.currentTarget = this.target
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = false;
goog.events.Event.prototype.returnValue_ = true;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = true
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = false
};
goog.events.Event.stopPropagation = function(e) {
  e.stopPropagation()
};
goog.events.Event.preventDefault = function(e) {
  e.preventDefault()
};
goog.provide("goog.reflect");
goog.reflect.object = function(type, object) {
  return object
};
goog.reflect.sinkValue = function(x) {
  goog.reflect.sinkValue[" "](x);
  return x
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(obj, prop) {
  try {
    goog.reflect.sinkValue(obj[prop]);
    return true
  }catch(e) {
  }
  return false
};
goog.provide("goog.events.BrowserEvent");
goog.provide("goog.events.BrowserEvent.MouseButton");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Event");
goog.require("goog.events.EventType");
goog.require("goog.reflect");
goog.require("goog.userAgent");
goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  if(opt_e) {
    this.init(opt_e, opt_currentTarget)
  }
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.currentTarget;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = false;
goog.events.BrowserEvent.prototype.altKey = false;
goog.events.BrowserEvent.prototype.shiftKey = false;
goog.events.BrowserEvent.prototype.metaKey = false;
goog.events.BrowserEvent.prototype.state;
goog.events.BrowserEvent.prototype.platformModifierKey = false;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  var type = this.type = e.type;
  goog.events.Event.call(this, type);
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  if(relatedTarget) {
    if(goog.userAgent.GECKO) {
      if(!goog.reflect.canAccessProperty(relatedTarget, "nodeName")) {
        relatedTarget = null
      }
    }
  }else {
    if(type == goog.events.EventType.MOUSEOVER) {
      relatedTarget = e.fromElement
    }else {
      if(type == goog.events.EventType.MOUSEOUT) {
        relatedTarget = e.toElement
      }
    }
  }
  this.relatedTarget = relatedTarget;
  this.offsetX = e.offsetX !== undefined ? e.offsetX : e.layerX;
  this.offsetY = e.offsetY !== undefined ? e.offsetY : e.layerY;
  this.clientX = e.clientX !== undefined ? e.clientX : e.pageX;
  this.clientY = e.clientY !== undefined ? e.clientY : e.pageY;
  this.screenX = e.screenX || 0;
  this.screenY = e.screenY || 0;
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? e.metaKey : e.ctrlKey;
  this.state = e.state;
  this.event_ = e;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(button) {
  if(!goog.events.BrowserFeature.HAS_W3C_BUTTON) {
    if(this.type == "click") {
      return button == goog.events.BrowserEvent.MouseButton.LEFT
    }else {
      return!!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[button])
    }
  }else {
    return this.event_.button == button
  }
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  if(this.event_.stopPropagation) {
    this.event_.stopPropagation()
  }else {
    this.event_.cancelBubble = true
  }
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  if(!be.preventDefault) {
    be.returnValue = false;
    if(goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        var VK_F1 = 112;
        var VK_F12 = 123;
        if(be.ctrlKey || be.keyCode >= VK_F1 && be.keyCode <= VK_F12) {
          be.keyCode = -1
        }
      }catch(ex) {
      }
    }
  }else {
    be.preventDefault()
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.event_ = null;
  this.target = null;
  this.currentTarget = null;
  this.relatedTarget = null
};
goog.provide("goog.events.EventWrapper");
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.events.EventWrapper.prototype.unlisten = function(src, listener, opt_capt, opt_scope, opt_eventHandler) {
};
goog.provide("goog.events.Listener");
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.isFunctionListener_;
goog.events.Listener.prototype.listener;
goog.events.Listener.prototype.proxy;
goog.events.Listener.prototype.src;
goog.events.Listener.prototype.type;
goog.events.Listener.prototype.capture;
goog.events.Listener.prototype.handler;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = false;
goog.events.Listener.prototype.callOnce = false;
goog.events.Listener.prototype.init = function(listener, proxy, src, type, capture, opt_handler) {
  if(goog.isFunction(listener)) {
    this.isFunctionListener_ = true
  }else {
    if(listener && listener.handleEvent && goog.isFunction(listener.handleEvent)) {
      this.isFunctionListener_ = false
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.callOnce = false;
  this.key = ++goog.events.Listener.counter_;
  this.removed = false
};
goog.events.Listener.prototype.handleEvent = function(eventObject) {
  if(this.isFunctionListener_) {
    return this.listener.call(this.handler || this.src, eventObject)
  }
  return this.listener.handleEvent.call(this.listener, eventObject)
};
goog.provide("goog.events");
goog.require("goog.array");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.BrowserFeature");
goog.require("goog.events.Event");
goog.require("goog.events.EventWrapper");
goog.require("goog.events.Listener");
goog.require("goog.object");
goog.require("goog.userAgent");
goog.events.ASSUME_GOOD_GC = false;
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(src, type, listener, opt_capt, opt_handler) {
  if(!type) {
    throw Error("Invalid event type");
  }else {
    if(goog.isArray(type)) {
      for(var i = 0;i < type.length;i++) {
        goog.events.listen(src, type[i], listener, opt_capt, opt_handler)
      }
      return null
    }else {
      var capture = !!opt_capt;
      var map = goog.events.listenerTree_;
      if(!(type in map)) {
        map[type] = {count_:0, remaining_:0}
      }
      map = map[type];
      if(!(capture in map)) {
        map[capture] = {count_:0, remaining_:0};
        map.count_++
      }
      map = map[capture];
      var srcUid = goog.getUid(src);
      var listenerArray, listenerObj;
      map.remaining_++;
      if(!map[srcUid]) {
        listenerArray = map[srcUid] = [];
        map.count_++
      }else {
        listenerArray = map[srcUid];
        for(var i = 0;i < listenerArray.length;i++) {
          listenerObj = listenerArray[i];
          if(listenerObj.listener == listener && listenerObj.handler == opt_handler) {
            if(listenerObj.removed) {
              break
            }
            return listenerArray[i].key
          }
        }
      }
      var proxy = goog.events.getProxy();
      proxy.src = src;
      listenerObj = new goog.events.Listener;
      listenerObj.init(listener, proxy, src, type, capture, opt_handler);
      var key = listenerObj.key;
      proxy.key = key;
      listenerArray.push(listenerObj);
      goog.events.listeners_[key] = listenerObj;
      if(!goog.events.sources_[srcUid]) {
        goog.events.sources_[srcUid] = []
      }
      goog.events.sources_[srcUid].push(listenerObj);
      if(src.addEventListener) {
        if(src == goog.global || !src.customEvent_) {
          src.addEventListener(type, proxy, capture)
        }
      }else {
        src.attachEvent(goog.events.getOnString_(type), proxy)
      }
      return key
    }
  }
};
goog.events.getProxy = function() {
  var proxyCallbackFunction = goog.events.handleBrowserEvent_;
  var f = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.key, eventObject)
  } : function(eventObject) {
    var v = proxyCallbackFunction.call(f.src, f.key, eventObject);
    if(!v) {
      return v
    }
  };
  return f
};
goog.events.listenOnce = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.listenOnce(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var key = goog.events.listen(src, type, listener, opt_capt, opt_handler);
  var listenerObj = goog.events.listeners_[key];
  listenerObj.callOnce = true;
  return key
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler)
};
goog.events.unlisten = function(src, type, listener, opt_capt, opt_handler) {
  if(goog.isArray(type)) {
    for(var i = 0;i < type.length;i++) {
      goog.events.unlisten(src, type[i], listener, opt_capt, opt_handler)
    }
    return null
  }
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(!listenerArray) {
    return false
  }
  for(var i = 0;i < listenerArray.length;i++) {
    if(listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
      return goog.events.unlistenByKey(listenerArray[i].key)
    }
  }
  return false
};
goog.events.unlistenByKey = function(key) {
  if(!goog.events.listeners_[key]) {
    return false
  }
  var listener = goog.events.listeners_[key];
  if(listener.removed) {
    return false
  }
  var src = listener.src;
  var type = listener.type;
  var proxy = listener.proxy;
  var capture = listener.capture;
  if(src.removeEventListener) {
    if(src == goog.global || !src.customEvent_) {
      src.removeEventListener(type, proxy, capture)
    }
  }else {
    if(src.detachEvent) {
      src.detachEvent(goog.events.getOnString_(type), proxy)
    }
  }
  var srcUid = goog.getUid(src);
  var listenerArray = goog.events.listenerTree_[type][capture][srcUid];
  if(goog.events.sources_[srcUid]) {
    var sourcesArray = goog.events.sources_[srcUid];
    goog.array.remove(sourcesArray, listener);
    if(sourcesArray.length == 0) {
      delete goog.events.sources_[srcUid]
    }
  }
  listener.removed = true;
  listenerArray.needsCleanup_ = true;
  goog.events.cleanUp_(type, capture, srcUid, listenerArray);
  delete goog.events.listeners_[key];
  return true
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler)
};
goog.events.cleanUp_ = function(type, capture, srcUid, listenerArray) {
  if(!listenerArray.locked_) {
    if(listenerArray.needsCleanup_) {
      for(var oldIndex = 0, newIndex = 0;oldIndex < listenerArray.length;oldIndex++) {
        if(listenerArray[oldIndex].removed) {
          var proxy = listenerArray[oldIndex].proxy;
          proxy.src = null;
          continue
        }
        if(oldIndex != newIndex) {
          listenerArray[newIndex] = listenerArray[oldIndex]
        }
        newIndex++
      }
      listenerArray.length = newIndex;
      listenerArray.needsCleanup_ = false;
      if(newIndex == 0) {
        delete goog.events.listenerTree_[type][capture][srcUid];
        goog.events.listenerTree_[type][capture].count_--;
        if(goog.events.listenerTree_[type][capture].count_ == 0) {
          delete goog.events.listenerTree_[type][capture];
          goog.events.listenerTree_[type].count_--
        }
        if(goog.events.listenerTree_[type].count_ == 0) {
          delete goog.events.listenerTree_[type]
        }
      }
    }
  }
};
goog.events.removeAll = function(opt_obj, opt_type, opt_capt) {
  var count = 0;
  var noObj = opt_obj == null;
  var noType = opt_type == null;
  var noCapt = opt_capt == null;
  opt_capt = !!opt_capt;
  if(!noObj) {
    var srcUid = goog.getUid(opt_obj);
    if(goog.events.sources_[srcUid]) {
      var sourcesArray = goog.events.sources_[srcUid];
      for(var i = sourcesArray.length - 1;i >= 0;i--) {
        var listener = sourcesArray[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    }
  }else {
    goog.object.forEach(goog.events.sources_, function(listeners) {
      for(var i = listeners.length - 1;i >= 0;i--) {
        var listener = listeners[i];
        if((noType || opt_type == listener.type) && (noCapt || opt_capt == listener.capture)) {
          goog.events.unlistenByKey(listener.key);
          count++
        }
      }
    })
  }
  return count
};
goog.events.getListeners = function(obj, type, capture) {
  return goog.events.getListeners_(obj, type, capture) || []
};
goog.events.getListeners_ = function(obj, type, capture) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      map = map[capture];
      var objUid = goog.getUid(obj);
      if(map[objUid]) {
        return map[objUid]
      }
    }
  }
  return null
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  var capture = !!opt_capt;
  var listenerArray = goog.events.getListeners_(src, type, capture);
  if(listenerArray) {
    for(var i = 0;i < listenerArray.length;i++) {
      if(!listenerArray[i].removed && listenerArray[i].listener == listener && listenerArray[i].capture == capture && listenerArray[i].handler == opt_handler) {
        return listenerArray[i]
      }
    }
  }
  return null
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  var objUid = goog.getUid(obj);
  var listeners = goog.events.sources_[objUid];
  if(listeners) {
    var hasType = goog.isDef(opt_type);
    var hasCapture = goog.isDef(opt_capture);
    if(hasType && hasCapture) {
      var map = goog.events.listenerTree_[opt_type];
      return!!map && !!map[opt_capture] && objUid in map[opt_capture]
    }else {
      if(!(hasType || hasCapture)) {
        return true
      }else {
        return goog.array.some(listeners, function(listener) {
          return hasType && listener.type == opt_type || hasCapture && listener.capture == opt_capture
        })
      }
    }
  }
  return false
};
goog.events.expose = function(e) {
  var str = [];
  for(var key in e) {
    if(e[key] && e[key].id) {
      str.push(key + " = " + e[key] + " (" + e[key].id + ")")
    }else {
      str.push(key + " = " + e[key])
    }
  }
  return str.join("\n")
};
goog.events.getOnString_ = function(type) {
  if(type in goog.events.onStringMap_) {
    return goog.events.onStringMap_[type]
  }
  return goog.events.onStringMap_[type] = goog.events.onString_ + type
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  var map = goog.events.listenerTree_;
  if(type in map) {
    map = map[type];
    if(capture in map) {
      return goog.events.fireListeners_(map[capture], obj, type, capture, eventObject)
    }
  }
  return true
};
goog.events.fireListeners_ = function(map, obj, type, capture, eventObject) {
  var retval = 1;
  var objUid = goog.getUid(obj);
  if(map[objUid]) {
    map.remaining_--;
    var listenerArray = map[objUid];
    if(!listenerArray.locked_) {
      listenerArray.locked_ = 1
    }else {
      listenerArray.locked_++
    }
    try {
      var length = listenerArray.length;
      for(var i = 0;i < length;i++) {
        var listener = listenerArray[i];
        if(listener && !listener.removed) {
          retval &= goog.events.fireListener(listener, eventObject) !== false
        }
      }
    }finally {
      listenerArray.locked_--;
      goog.events.cleanUp_(type, capture, objUid, listenerArray)
    }
  }
  return Boolean(retval)
};
goog.events.fireListener = function(listener, eventObject) {
  var rv = listener.handleEvent(eventObject);
  if(listener.callOnce) {
    goog.events.unlistenByKey(listener.key)
  }
  return rv
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(src, e) {
  var type = e.type || e;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  if(goog.isString(e)) {
    e = new goog.events.Event(e, src)
  }else {
    if(!(e instanceof goog.events.Event)) {
      var oldEvent = e;
      e = new goog.events.Event(type, src);
      goog.object.extend(e, oldEvent)
    }else {
      e.target = e.target || src
    }
  }
  var rv = 1, ancestors;
  map = map[type];
  var hasCapture = true in map;
  var targetsMap;
  if(hasCapture) {
    ancestors = [];
    for(var parent = src;parent;parent = parent.getParentEventTarget()) {
      ancestors.push(parent)
    }
    targetsMap = map[true];
    targetsMap.remaining_ = targetsMap.count_;
    for(var i = ancestors.length - 1;!e.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
      e.currentTarget = ancestors[i];
      rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, true, e) && e.returnValue_ != false
    }
  }
  var hasBubble = false in map;
  if(hasBubble) {
    targetsMap = map[false];
    targetsMap.remaining_ = targetsMap.count_;
    if(hasCapture) {
      for(var i = 0;!e.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
        e.currentTarget = ancestors[i];
        rv &= goog.events.fireListeners_(targetsMap, ancestors[i], e.type, false, e) && e.returnValue_ != false
      }
    }else {
      for(var current = src;!e.propagationStopped_ && current && targetsMap.remaining_;current = current.getParentEventTarget()) {
        e.currentTarget = current;
        rv &= goog.events.fireListeners_(targetsMap, current, e.type, false, e) && e.returnValue_ != false
      }
    }
  }
  return Boolean(rv)
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(key, opt_evt) {
  if(!goog.events.listeners_[key]) {
    return true
  }
  var listener = goog.events.listeners_[key];
  var type = listener.type;
  var map = goog.events.listenerTree_;
  if(!(type in map)) {
    return true
  }
  map = map[type];
  var retval, targetsMap;
  if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var ieEvent = opt_evt || goog.getObjectByName("window.event");
    var hasCapture = true in map;
    var hasBubble = false in map;
    if(hasCapture) {
      if(goog.events.isMarkedIeEvent_(ieEvent)) {
        return true
      }
      goog.events.markIeEvent_(ieEvent)
    }
    var evt = new goog.events.BrowserEvent;
    evt.init(ieEvent, this);
    retval = true;
    try {
      if(hasCapture) {
        var ancestors = [];
        for(var parent = evt.currentTarget;parent;parent = parent.parentNode) {
          ancestors.push(parent)
        }
        targetsMap = map[true];
        targetsMap.remaining_ = targetsMap.count_;
        for(var i = ancestors.length - 1;!evt.propagationStopped_ && i >= 0 && targetsMap.remaining_;i--) {
          evt.currentTarget = ancestors[i];
          retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, true, evt)
        }
        if(hasBubble) {
          targetsMap = map[false];
          targetsMap.remaining_ = targetsMap.count_;
          for(var i = 0;!evt.propagationStopped_ && i < ancestors.length && targetsMap.remaining_;i++) {
            evt.currentTarget = ancestors[i];
            retval &= goog.events.fireListeners_(targetsMap, ancestors[i], type, false, evt)
          }
        }
      }else {
        retval = goog.events.fireListener(listener, evt)
      }
    }finally {
      if(ancestors) {
        ancestors.length = 0
      }
      evt.dispose()
    }
    return retval
  }
  var be = new goog.events.BrowserEvent(opt_evt, this);
  try {
    retval = goog.events.fireListener(listener, be)
  }finally {
    be.dispose()
  }
  return retval
};
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = false;
  if(e.keyCode == 0) {
    try {
      e.keyCode = -1;
      return
    }catch(ex) {
      useReturnValue = true
    }
  }
  if(useReturnValue || e.returnValue == undefined) {
    e.returnValue = true
  }
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_)
});
goog.provide("goog.events.EventTarget");
goog.require("goog.Disposable");
goog.require("goog.events");
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = true;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(parent) {
  this.parentEventTarget_ = parent
};
goog.events.EventTarget.prototype.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope)
};
goog.events.EventTarget.prototype.dispatchEvent = function(e) {
  return goog.events.dispatchEvent(this, e)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.provide("clojure.browser.event");
goog.require("cljs.core");
goog.require("goog.events.EventType");
goog.require("goog.events.EventTarget");
goog.require("goog.events");
clojure.browser.event.EventType = {};
clojure.browser.event.event_types = function event_types(this$) {
  if(function() {
    var and__3822__auto____10369 = this$;
    if(and__3822__auto____10369) {
      return this$.clojure$browser$event$EventType$event_types$arity$1
    }else {
      return and__3822__auto____10369
    }
  }()) {
    return this$.clojure$browser$event$EventType$event_types$arity$1(this$)
  }else {
    var x__2363__auto____10370 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____10371 = clojure.browser.event.event_types[goog.typeOf(x__2363__auto____10370)];
      if(or__3824__auto____10371) {
        return or__3824__auto____10371
      }else {
        var or__3824__auto____10372 = clojure.browser.event.event_types["_"];
        if(or__3824__auto____10372) {
          return or__3824__auto____10372
        }else {
          throw cljs.core.missing_protocol.call(null, "EventType.event-types", this$);
        }
      }
    }().call(null, this$)
  }
};
Element.prototype.clojure$browser$event$EventType$ = true;
Element.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10373) {
    var vec__10374__10375 = p__10373;
    var k__10376 = cljs.core.nth.call(null, vec__10374__10375, 0, null);
    var v__10377 = cljs.core.nth.call(null, vec__10374__10375, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10376.toLowerCase()), v__10377], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
goog.events.EventTarget.prototype.clojure$browser$event$EventType$ = true;
goog.events.EventTarget.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10378) {
    var vec__10379__10380 = p__10378;
    var k__10381 = cljs.core.nth.call(null, vec__10379__10380, 0, null);
    var v__10382 = cljs.core.nth.call(null, vec__10379__10380, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10381.toLowerCase()), v__10382], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
clojure.browser.event.listen = function() {
  var listen = null;
  var listen__3 = function(src, type, fn) {
    return listen.call(null, src, type, fn, false)
  };
  var listen__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listen(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen__3.call(this, src, type, fn);
      case 4:
        return listen__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  listen.cljs$lang$arity$3 = listen__3;
  listen.cljs$lang$arity$4 = listen__4;
  return listen
}();
clojure.browser.event.listen_once = function() {
  var listen_once = null;
  var listen_once__3 = function(src, type, fn) {
    return listen_once.call(null, src, type, fn, false)
  };
  var listen_once__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.listenOnce(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  listen_once = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return listen_once__3.call(this, src, type, fn);
      case 4:
        return listen_once__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  listen_once.cljs$lang$arity$3 = listen_once__3;
  listen_once.cljs$lang$arity$4 = listen_once__4;
  return listen_once
}();
clojure.browser.event.unlisten = function() {
  var unlisten = null;
  var unlisten__3 = function(src, type, fn) {
    return unlisten.call(null, src, type, fn, false)
  };
  var unlisten__4 = function(src, type, fn, capture_QMARK_) {
    return goog.events.unlisten(src, cljs.core._lookup.call(null, clojure.browser.event.event_types.call(null, src), type, type), fn, capture_QMARK_)
  };
  unlisten = function(src, type, fn, capture_QMARK_) {
    switch(arguments.length) {
      case 3:
        return unlisten__3.call(this, src, type, fn);
      case 4:
        return unlisten__4.call(this, src, type, fn, capture_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  unlisten.cljs$lang$arity$3 = unlisten__3;
  unlisten.cljs$lang$arity$4 = unlisten__4;
  return unlisten
}();
clojure.browser.event.unlisten_by_key = function unlisten_by_key(key) {
  return goog.events.unlistenByKey(key)
};
clojure.browser.event.dispatch_event = function dispatch_event(src, event) {
  return goog.events.dispatchEvent(src, event)
};
clojure.browser.event.expose = function expose(e) {
  return goog.events.expose(e)
};
clojure.browser.event.fire_listeners = function fire_listeners(obj, type, capture, event) {
  return null
};
clojure.browser.event.total_listener_count = function total_listener_count() {
  return goog.events.getTotalListenerCount()
};
clojure.browser.event.get_listener = function get_listener(src, type, listener, opt_capt, opt_handler) {
  return null
};
clojure.browser.event.all_listeners = function all_listeners(obj, type, capture) {
  return null
};
clojure.browser.event.unique_event_id = function unique_event_id(event_type) {
  return null
};
clojure.browser.event.has_listener = function has_listener(obj, opt_type, opt_capture) {
  return null
};
clojure.browser.event.remove_all = function remove_all(opt_obj, opt_type, opt_capt) {
  return null
};
goog.provide("goog.structs");
goog.require("goog.array");
goog.require("goog.object");
goog.structs.getCount = function(col) {
  if(typeof col.getCount == "function") {
    return col.getCount()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return col.length
  }
  return goog.object.getCount(col)
};
goog.structs.getValues = function(col) {
  if(typeof col.getValues == "function") {
    return col.getValues()
  }
  if(goog.isString(col)) {
    return col.split("")
  }
  if(goog.isArrayLike(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(col[i])
    }
    return rv
  }
  return goog.object.getValues(col)
};
goog.structs.getKeys = function(col) {
  if(typeof col.getKeys == "function") {
    return col.getKeys()
  }
  if(typeof col.getValues == "function") {
    return undefined
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    var rv = [];
    var l = col.length;
    for(var i = 0;i < l;i++) {
      rv.push(i)
    }
    return rv
  }
  return goog.object.getKeys(col)
};
goog.structs.contains = function(col, val) {
  if(typeof col.contains == "function") {
    return col.contains(val)
  }
  if(typeof col.containsValue == "function") {
    return col.containsValue(val)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.contains(col, val)
  }
  return goog.object.containsValue(col, val)
};
goog.structs.isEmpty = function(col) {
  if(typeof col.isEmpty == "function") {
    return col.isEmpty()
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.isEmpty(col)
  }
  return goog.object.isEmpty(col)
};
goog.structs.clear = function(col) {
  if(typeof col.clear == "function") {
    col.clear()
  }else {
    if(goog.isArrayLike(col)) {
      goog.array.clear(col)
    }else {
      goog.object.clear(col)
    }
  }
};
goog.structs.forEach = function(col, f, opt_obj) {
  if(typeof col.forEach == "function") {
    col.forEach(f, opt_obj)
  }else {
    if(goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach(col, f, opt_obj)
    }else {
      var keys = goog.structs.getKeys(col);
      var values = goog.structs.getValues(col);
      var l = values.length;
      for(var i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col)
      }
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if(typeof col.filter == "function") {
    return col.filter(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], keys[i], col)) {
        rv[keys[i]] = values[i]
      }
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      if(f.call(opt_obj, values[i], undefined, col)) {
        rv.push(values[i])
      }
    }
  }
  return rv
};
goog.structs.map = function(col, f, opt_obj) {
  if(typeof col.map == "function") {
    return col.map(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map(col, f, opt_obj)
  }
  var rv;
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  if(keys) {
    rv = {};
    for(var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col)
    }
  }else {
    rv = [];
    for(var i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], undefined, col)
    }
  }
  return rv
};
goog.structs.some = function(col, f, opt_obj) {
  if(typeof col.some == "function") {
    return col.some(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(f.call(opt_obj, values[i], keys && keys[i], col)) {
      return true
    }
  }
  return false
};
goog.structs.every = function(col, f, opt_obj) {
  if(typeof col.every == "function") {
    return col.every(f, opt_obj)
  }
  if(goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every(col, f, opt_obj)
  }
  var keys = goog.structs.getKeys(col);
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    if(!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return false
    }
  }
  return true
};
goog.provide("goog.iter");
goog.provide("goog.iter.Iterator");
goog.provide("goog.iter.StopIteration");
goog.require("goog.array");
goog.require("goog.asserts");
goog.iter.Iterable;
if("StopIteration" in goog.global) {
  goog.iter.StopIteration = goog.global["StopIteration"]
}else {
  goog.iter.StopIteration = Error("StopIteration")
}
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(opt_keys) {
  return this
};
goog.iter.toIterator = function(iterable) {
  if(iterable instanceof goog.iter.Iterator) {
    return iterable
  }
  if(typeof iterable.__iterator__ == "function") {
    return iterable.__iterator__(false)
  }
  if(goog.isArrayLike(iterable)) {
    var i = 0;
    var newIter = new goog.iter.Iterator;
    newIter.next = function() {
      while(true) {
        if(i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if(!(i in iterable)) {
          i++;
          continue
        }
        return iterable[i++]
      }
    };
    return newIter
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if(goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach(iterable, f, opt_obj)
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }else {
    iterable = goog.iter.toIterator(iterable);
    try {
      while(true) {
        f.call(opt_obj, iterable.next(), undefined, iterable)
      }
    }catch(ex) {
      if(ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(f.call(opt_obj, val, undefined, iterable)) {
        return val
      }
    }
  };
  return newIter
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0;
  var stop = startOrStop;
  var step = opt_step || 1;
  if(arguments.length > 1) {
    start = startOrStop;
    stop = opt_stop
  }
  if(step == 0) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if(step > 0 && start >= stop || step < 0 && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv
  };
  return newIter
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator)
};
goog.iter.map = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      return f.call(opt_obj, val, undefined, iterable)
    }
  };
  return newIter
};
goog.iter.reduce = function(iterable, f, val, opt_obj) {
  var rval = val;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val)
  });
  return rval
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return true
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return false
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    while(true) {
      if(!f.call(opt_obj, iterable.next(), undefined, iterable)) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return true
};
goog.iter.chain = function(var_args) {
  var args = arguments;
  var length = args.length;
  var i = 0;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    try {
      if(i >= length) {
        throw goog.iter.StopIteration;
      }
      var current = goog.iter.toIterator(args[i]);
      return current.next()
    }catch(ex) {
      if(ex !== goog.iter.StopIteration || i >= length) {
        throw ex;
      }else {
        i++;
        return this.next()
      }
    }
  };
  return newIter
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var dropping = true;
  newIter.next = function() {
    while(true) {
      var val = iterable.next();
      if(dropping && f.call(opt_obj, val, undefined, iterable)) {
        continue
      }else {
        dropping = false
      }
      return val
    }
  };
  return newIter
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  var newIter = new goog.iter.Iterator;
  var taking = true;
  newIter.next = function() {
    while(true) {
      if(taking) {
        var val = iterable.next();
        if(f.call(opt_obj, val, undefined, iterable)) {
          return val
        }else {
          taking = false
        }
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return newIter
};
goog.iter.toArray = function(iterable) {
  if(goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable)
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val)
  });
  return array
};
goog.iter.equals = function(iterable1, iterable2) {
  iterable1 = goog.iter.toIterator(iterable1);
  iterable2 = goog.iter.toIterator(iterable2);
  var b1, b2;
  try {
    while(true) {
      b1 = b2 = false;
      var val1 = iterable1.next();
      b1 = true;
      var val2 = iterable2.next();
      b2 = true;
      if(val1 != val2) {
        return false
      }
    }
  }catch(ex) {
    if(ex !== goog.iter.StopIteration) {
      throw ex;
    }else {
      if(b1 && !b2) {
        return false
      }
      if(!b2) {
        try {
          val2 = iterable2.next();
          return false
        }catch(ex1) {
          if(ex1 !== goog.iter.StopIteration) {
            throw ex1;
          }
          return true
        }
      }
    }
  }
  return false
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next()
  }catch(e) {
    if(e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue
  }
};
goog.iter.product = function(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return!arr.length
  });
  if(someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator
  }
  var iter = new goog.iter.Iterator;
  var arrays = arguments;
  var indicies = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if(indicies) {
      var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex]
      });
      for(var i = indicies.length - 1;i >= 0;i--) {
        goog.asserts.assert(indicies);
        if(indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break
        }
        if(i == 0) {
          indicies = null;
          break
        }
        indicies[i] = 0
      }
      return retVal
    }
    throw goog.iter.StopIteration;
  };
  return iter
};
goog.iter.cycle = function(iterable) {
  var baseIterator = goog.iter.toIterator(iterable);
  var cache = [];
  var cacheIndex = 0;
  var iter = new goog.iter.Iterator;
  var useCache = false;
  iter.next = function() {
    var returnElement = null;
    if(!useCache) {
      try {
        returnElement = baseIterator.next();
        cache.push(returnElement);
        return returnElement
      }catch(e) {
        if(e != goog.iter.StopIteration || goog.array.isEmpty(cache)) {
          throw e;
        }
        useCache = true
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return returnElement
  };
  return iter
};
goog.provide("goog.structs.Map");
goog.require("goog.iter.Iterator");
goog.require("goog.iter.StopIteration");
goog.require("goog.object");
goog.require("goog.structs");
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  var argLength = arguments.length;
  if(argLength > 1) {
    if(argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1])
    }
  }else {
    if(opt_map) {
      this.addAll(opt_map)
    }
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  var rv = [];
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key])
  }
  return rv
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key)
};
goog.structs.Map.prototype.containsValue = function(val) {
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if(goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return true
    }
  }
  return false
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if(this === otherMap) {
    return true
  }
  if(this.count_ != otherMap.getCount()) {
    return false
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var key, i = 0;key = this.keys_[i];i++) {
    if(!equalityFn(this.get(key), otherMap.get(key))) {
      return false
    }
  }
  return true
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return this.count_ == 0
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.keys_.length = 0;
  this.count_ = 0;
  this.version_ = 0
};
goog.structs.Map.prototype.remove = function(key) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    delete this.map_[key];
    this.count_--;
    this.version_++;
    if(this.keys_.length > 2 * this.count_) {
      this.cleanupKeysArray_()
    }
    return true
  }
  return false
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(goog.structs.Map.hasKey_(this.map_, key)) {
        this.keys_[destIndex++] = key
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
  if(this.count_ != this.keys_.length) {
    var seen = {};
    var srcIndex = 0;
    var destIndex = 0;
    while(srcIndex < this.keys_.length) {
      var key = this.keys_[srcIndex];
      if(!goog.structs.Map.hasKey_(seen, key)) {
        this.keys_[destIndex++] = key;
        seen[key] = 1
      }
      srcIndex++
    }
    this.keys_.length = destIndex
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  if(goog.structs.Map.hasKey_(this.map_, key)) {
    return this.map_[key]
  }
  return opt_val
};
goog.structs.Map.prototype.set = function(key, value) {
  if(!goog.structs.Map.hasKey_(this.map_, key)) {
    this.count_++;
    this.keys_.push(key);
    this.version_++
  }
  this.map_[key] = value
};
goog.structs.Map.prototype.addAll = function(map) {
  var keys, values;
  if(map instanceof goog.structs.Map) {
    keys = map.getKeys();
    values = map.getValues()
  }else {
    keys = goog.object.getKeys(map);
    values = goog.object.getValues(map)
  }
  for(var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  var transposed = new goog.structs.Map;
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    var value = this.map_[key];
    transposed.set(value, key)
  }
  return transposed
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  var obj = {};
  for(var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key]
  }
  return obj
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(true)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(false)
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0;
  var keys = this.keys_;
  var map = this.map_;
  var version = this.version_;
  var selfObj = this;
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    while(true) {
      if(version != selfObj.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(i >= keys.length) {
        throw goog.iter.StopIteration;
      }
      var key = keys[i++];
      return opt_keys ? key : map[key]
    }
  };
  return newIter
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
};
goog.provide("goog.uri.utils");
goog.provide("goog.uri.utils.ComponentIndex");
goog.provide("goog.uri.utils.QueryArray");
goog.provide("goog.uri.utils.QueryValue");
goog.provide("goog.uri.utils.StandardQueryParam");
goog.require("goog.asserts");
goog.require("goog.string");
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = [];
  if(opt_scheme) {
    out.push(opt_scheme, ":")
  }
  if(opt_domain) {
    out.push("//");
    if(opt_userInfo) {
      out.push(opt_userInfo, "@")
    }
    out.push(opt_domain);
    if(opt_port) {
      out.push(":", opt_port)
    }
  }
  if(opt_path) {
    out.push(opt_path)
  }
  if(opt_queryData) {
    out.push("?", opt_queryData)
  }
  if(opt_fragment) {
    out.push("#", opt_fragment)
  }
  return out.join("")
};
goog.uri.utils.splitRe_ = new RegExp("^" + "(?:" + "([^:/?#.]+)" + ":)?" + "(?://" + "(?:([^/?#]*)@)?" + "([\\w\\d\\-\\u0100-\\uffff.%]*)" + "(?::([0-9]+))?" + ")?" + "([^?#]+)?" + "(?:\\?([^#]*))?" + "(?:#(.*))?" + "$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(uri) {
  return uri.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(uri) {
  return uri && decodeURIComponent(uri)
};
goog.uri.utils.getComponentByIndex_ = function(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null
};
goog.uri.utils.getScheme = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri)
};
goog.uri.utils.getUserInfoEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri)
};
goog.uri.utils.getUserInfo = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri))
};
goog.uri.utils.getDomainEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri)
};
goog.uri.utils.getDomain = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri))
};
goog.uri.utils.getPort = function(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null
};
goog.uri.utils.getPathEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri)
};
goog.uri.utils.getPath = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri))
};
goog.uri.utils.getQueryData = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri)
};
goog.uri.utils.getFragmentEncoded = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? null : uri.substr(hashIndex + 1)
};
goog.uri.utils.setFragmentEncoded = function(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "")
};
goog.uri.utils.getFragment = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri))
};
goog.uri.utils.getHost = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? uri : uri.substr(0, hashIndex)
};
goog.uri.utils.haveSameDomain = function(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1);
  var pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(uri) {
  if(goog.DEBUG && (uri.indexOf("#") >= 0 || uri.indexOf("?") >= 0)) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not " + "supported: [" + uri + "]");
  }
};
goog.uri.utils.QueryValue;
goog.uri.utils.QueryArray;
goog.uri.utils.appendQueryData_ = function(buffer) {
  if(buffer[1]) {
    var baseUri = buffer[0];
    var hashIndex = baseUri.indexOf("#");
    if(hashIndex >= 0) {
      buffer.push(baseUri.substr(hashIndex));
      buffer[0] = baseUri = baseUri.substr(0, hashIndex)
    }
    var questionIndex = baseUri.indexOf("?");
    if(questionIndex < 0) {
      buffer[1] = "?"
    }else {
      if(questionIndex == baseUri.length - 1) {
        buffer[1] = undefined
      }
    }
  }
  return buffer.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(key, value, pairs) {
  if(goog.isArray(value)) {
    value = value;
    for(var j = 0;j < value.length;j++) {
      pairs.push("&", key);
      if(value[j] !== "") {
        pairs.push("=", goog.string.urlEncode(value[j]))
      }
    }
  }else {
    if(value != null) {
      pairs.push("&", key);
      if(value !== "") {
        pairs.push("=", goog.string.urlEncode(value))
      }
    }
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(buffer, keysAndValues, opt_startIndex) {
  goog.asserts.assert(Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  for(var i = opt_startIndex || 0;i < keysAndValues.length;i += 2) {
    goog.uri.utils.appendKeyValuePairs_(keysAndValues[i], keysAndValues[i + 1], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryData = function(keysAndValues, opt_startIndex) {
  var buffer = goog.uri.utils.buildQueryDataBuffer_([], keysAndValues, opt_startIndex);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(buffer, map) {
  for(var key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], buffer)
  }
  return buffer
};
goog.uri.utils.buildQueryDataFromMap = function(map) {
  var buffer = goog.uri.utils.buildQueryDataBufferFromMap_([], map);
  buffer[0] = "";
  return buffer.join("")
};
goog.uri.utils.appendParams = function(uri, var_args) {
  return goog.uri.utils.appendQueryData_(arguments.length == 2 ? goog.uri.utils.buildQueryDataBuffer_([uri], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([uri], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(uri, map) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([uri], map))
};
goog.uri.utils.appendParam = function(uri, key, value) {
  return goog.uri.utils.appendQueryData_([uri, "&", key, "=", goog.string.urlEncode(value)])
};
goog.uri.utils.findParam_ = function(uri, startIndex, keyEncoded, hashOrEndIndex) {
  var index = startIndex;
  var keyLength = keyEncoded.length;
  while((index = uri.indexOf(keyEncoded, index)) >= 0 && index < hashOrEndIndex) {
    var precedingChar = uri.charCodeAt(index - 1);
    if(precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if(!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index
      }
    }
    index += keyLength + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(uri, keyEncoded) {
  return goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_)) >= 0
};
goog.uri.utils.getParamValue = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if(foundIndex < 0) {
    return null
  }else {
    var endPosition = uri.indexOf("&", foundIndex);
    if(endPosition < 0 || endPosition > hashOrEndIndex) {
      endPosition = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    return goog.string.urlDecode(uri.substr(foundIndex, endPosition - foundIndex))
  }
};
goog.uri.utils.getParamValues = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var result = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    position = uri.indexOf("&", foundIndex);
    if(position < 0 || position > hashOrEndIndex) {
      position = hashOrEndIndex
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.substr(foundIndex, position - foundIndex)))
  }
  return result
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_);
  var position = 0;
  var foundIndex;
  var buffer = [];
  while((foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0) {
    buffer.push(uri.substring(position, foundIndex));
    position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex)
  }
  buffer.push(uri.substr(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value)
};
goog.uri.utils.appendPath = function(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  if(goog.string.endsWith(baseUri, "/")) {
    baseUri = baseUri.substr(0, baseUri.length - 1)
  }
  if(goog.string.startsWith(path, "/")) {
    path = path.substr(1)
  }
  return goog.string.buildString(baseUri, "/", path)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.provide("goog.Uri");
goog.provide("goog.Uri.QueryData");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.require("goog.uri.utils.ComponentIndex");
goog.Uri = function(opt_uri, opt_ignoreCase) {
  var m;
  if(opt_uri instanceof goog.Uri) {
    this.setIgnoreCase(opt_ignoreCase == null ? opt_uri.getIgnoreCase() : opt_ignoreCase);
    this.setScheme(opt_uri.getScheme());
    this.setUserInfo(opt_uri.getUserInfo());
    this.setDomain(opt_uri.getDomain());
    this.setPort(opt_uri.getPort());
    this.setPath(opt_uri.getPath());
    this.setQueryData(opt_uri.getQueryData().clone());
    this.setFragment(opt_uri.getFragment())
  }else {
    if(opt_uri && (m = goog.uri.utils.split(String(opt_uri)))) {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || "", true);
      this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", true);
      this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", true);
      this.setPort(m[goog.uri.utils.ComponentIndex.PORT]);
      this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", true);
      this.setQuery(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", true);
      this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", true)
    }else {
      this.setIgnoreCase(!!opt_ignoreCase);
      this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_)
    }
  }
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.queryData_;
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = false;
goog.Uri.prototype.ignoreCase_ = false;
goog.Uri.prototype.toString = function() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var out = [];
  if(this.scheme_) {
    out.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":")
  }
  if(this.domain_) {
    out.push("//");
    if(this.userInfo_) {
      out.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@")
    }
    out.push(goog.Uri.encodeString_(this.domain_));
    if(this.port_ != null) {
      out.push(":", String(this.getPort()))
    }
  }
  if(this.path_) {
    if(this.hasDomain() && this.path_.charAt(0) != "/") {
      out.push("/")
    }
    out.push(goog.Uri.encodeSpecialChars_(this.path_, this.path_.charAt(0) == "/" ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_))
  }
  var query = String(this.queryData_);
  if(query) {
    out.push("?", query)
  }
  if(this.fragment_) {
    out.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_))
  }
  return this.cachedToString_ = out.join("")
};
goog.Uri.prototype.resolve = function(relativeUri) {
  var absoluteUri = this.clone();
  var overridden = relativeUri.hasScheme();
  if(overridden) {
    absoluteUri.setScheme(relativeUri.getScheme())
  }else {
    overridden = relativeUri.hasUserInfo()
  }
  if(overridden) {
    absoluteUri.setUserInfo(relativeUri.getUserInfo())
  }else {
    overridden = relativeUri.hasDomain()
  }
  if(overridden) {
    absoluteUri.setDomain(relativeUri.getDomain())
  }else {
    overridden = relativeUri.hasPort()
  }
  var path = relativeUri.getPath();
  if(overridden) {
    absoluteUri.setPort(relativeUri.getPort())
  }else {
    overridden = relativeUri.hasPath();
    if(overridden) {
      if(path.charAt(0) != "/") {
        if(this.hasDomain() && !this.hasPath()) {
          path = "/" + path
        }else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          if(lastSlashIndex != -1) {
            path = absoluteUri.getPath().substr(0, lastSlashIndex + 1) + path
          }
        }
      }
      path = goog.Uri.removeDotSegments(path)
    }
  }
  if(overridden) {
    absoluteUri.setPath(path)
  }else {
    overridden = relativeUri.hasQuery()
  }
  if(overridden) {
    absoluteUri.setQuery(relativeUri.getDecodedQuery())
  }else {
    overridden = relativeUri.hasFragment()
  }
  if(overridden) {
    absoluteUri.setFragment(relativeUri.getFragment())
  }
  return absoluteUri
};
goog.Uri.prototype.clone = function() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(newScheme, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme) : newScheme;
  if(this.scheme_) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(newDomain, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain) : newDomain;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(newPort) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(newPort) {
    newPort = Number(newPort);
    if(isNaN(newPort) || newPort < 0) {
      throw Error("Bad port number " + newPort);
    }
    this.port_ = newPort
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return this.port_ != null
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(newPath, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath) : newPath;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return this.queryData_.toString() !== ""
};
goog.Uri.prototype.setQueryData = function(queryData, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(queryData instanceof goog.Uri.QueryData) {
    this.queryData_ = queryData;
    this.queryData_.uri_ = this;
    this.queryData_.setIgnoreCase(this.ignoreCase_)
  }else {
    if(!opt_decode) {
      queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_)
    }
    this.queryData_ = new goog.Uri.QueryData(queryData, this, this.ignoreCase_)
  }
  return this
};
goog.Uri.prototype.setQuery = function(newQuery, opt_decode) {
  return this.setQueryData(newQuery, opt_decode)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(key, value) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set(key, value);
  return this
};
goog.Uri.prototype.setParameterValues = function(key, values) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(!goog.isArray(values)) {
    values = [String(values)]
  }
  this.queryData_.setValues(key, values);
  return this
};
goog.Uri.prototype.getParameterValues = function(name) {
  return this.queryData_.getValues(name)
};
goog.Uri.prototype.getParameterValue = function(paramName) {
  return this.queryData_.get(paramName)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(newFragment, opt_decode) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(uri2) {
  return(!this.hasDomain() && !uri2.hasDomain() || this.getDomain() == uri2.getDomain()) && (!this.hasPort() && !uri2.hasPort() || this.getPort() == uri2.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(key) {
  this.enforceReadOnly();
  this.queryData_.remove(key);
  return this
};
goog.Uri.prototype.setReadOnly = function(isReadOnly) {
  this.isReadOnly_ = isReadOnly;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  if(this.queryData_) {
    this.queryData_.setIgnoreCase(ignoreCase)
  }
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase)
};
goog.Uri.create = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri
};
goog.Uri.resolve = function(base, rel) {
  if(!(base instanceof goog.Uri)) {
    base = goog.Uri.parse(base)
  }
  if(!(rel instanceof goog.Uri)) {
    rel = goog.Uri.parse(rel)
  }
  return base.resolve(rel)
};
goog.Uri.removeDotSegments = function(path) {
  if(path == ".." || path == ".") {
    return""
  }else {
    if(!goog.string.contains(path, "./") && !goog.string.contains(path, "/.")) {
      return path
    }else {
      var leadingSlash = goog.string.startsWith(path, "/");
      var segments = path.split("/");
      var out = [];
      for(var pos = 0;pos < segments.length;) {
        var segment = segments[pos++];
        if(segment == ".") {
          if(leadingSlash && pos == segments.length) {
            out.push("")
          }
        }else {
          if(segment == "..") {
            if(out.length > 1 || out.length == 1 && out[0] != "") {
              out.pop()
            }
            if(leadingSlash && pos == segments.length) {
              out.push("")
            }
          }else {
            out.push(segment);
            leadingSlash = true
          }
        }
      }
      return out.join("/")
    }
  }
};
goog.Uri.decodeOrEmpty_ = function(val) {
  return val ? decodeURIComponent(val) : ""
};
goog.Uri.encodeString_ = function(unescapedPart) {
  if(goog.isString(unescapedPart)) {
    return encodeURIComponent(unescapedPart)
  }
  return null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function(unescapedPart, extra) {
  var ret = null;
  if(goog.isString(unescapedPart)) {
    ret = unescapedPart;
    if(!goog.Uri.encodeSpecialRegExp_.test(ret)) {
      ret = encodeURI(unescapedPart)
    }
    if(ret.search(extra) >= 0) {
      ret = ret.replace(extra, goog.Uri.encodeChar_)
    }
  }
  return ret
};
goog.Uri.encodeChar_ = function(ch) {
  var n = ch.charCodeAt(0);
  return"%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String);
  var pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(opt_query, opt_uri, opt_ignoreCase) {
  this.encodedQuery_ = opt_query || null;
  this.uri_ = opt_uri || null;
  this.ignoreCase_ = !!opt_ignoreCase
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_) {
    this.keyMap_ = new goog.structs.Map;
    this.count_ = 0;
    if(this.encodedQuery_) {
      var pairs = this.encodedQuery_.split("&");
      for(var i = 0;i < pairs.length;i++) {
        var indexOfEquals = pairs[i].indexOf("=");
        var name = null;
        var value = null;
        if(indexOfEquals >= 0) {
          name = pairs[i].substring(0, indexOfEquals);
          value = pairs[i].substring(indexOfEquals + 1)
        }else {
          name = pairs[i]
        }
        name = goog.string.urlDecode(name);
        name = this.getKeyName_(name);
        this.add(name, value ? goog.string.urlDecode(value) : "")
      }
    }
  }
};
goog.Uri.QueryData.createFromMap = function(map, opt_uri, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if(typeof keys == "undefined") {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues(keys, goog.structs.getValues(map), opt_uri, opt_ignoreCase)
};
goog.Uri.QueryData.createFromKeysValues = function(keys, values, opt_uri, opt_ignoreCase) {
  if(keys.length != values.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  var queryData = new goog.Uri.QueryData(null, opt_uri, opt_ignoreCase);
  for(var i = 0;i < keys.length;i++) {
    queryData.add(keys[i], values[i])
  }
  return queryData
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(!this.containsKey(key)) {
    this.keyMap_.set(key, value)
  }else {
    var current = this.keyMap_.get(key);
    if(goog.isArray(current)) {
      current.push(value)
    }else {
      this.keyMap_.set(key, [current, value])
    }
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.keyMap_.containsKey(key)) {
    this.invalidateCache_();
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
    return this.keyMap_.remove(key)
  }
  return false
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  if(this.keyMap_) {
    this.keyMap_.clear()
  }
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return this.count_ == 0
};
goog.Uri.QueryData.prototype.containsKey = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.containsKey(key)
};
goog.Uri.QueryData.prototype.containsValue = function(value) {
  var vals = this.getValues();
  return goog.array.contains(vals, value)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  var vals = this.keyMap_.getValues();
  var keys = this.keyMap_.getKeys();
  var rv = [];
  for(var i = 0;i < keys.length;i++) {
    var val = vals[i];
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        rv.push(keys[i])
      }
    }else {
      rv.push(keys[i])
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.getValues = function(opt_key) {
  this.ensureKeyMapInitialized_();
  var rv;
  if(opt_key) {
    var key = this.getKeyName_(opt_key);
    if(this.containsKey(key)) {
      var value = this.keyMap_.get(key);
      if(goog.isArray(value)) {
        return value
      }else {
        rv = [];
        rv.push(value)
      }
    }else {
      rv = []
    }
  }else {
    var vals = this.keyMap_.getValues();
    rv = [];
    for(var i = 0;i < vals.length;i++) {
      var val = vals[i];
      if(goog.isArray(val)) {
        goog.array.extend(rv, val)
      }else {
        rv.push(val)
      }
    }
  }
  return rv
};
goog.Uri.QueryData.prototype.set = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  this.keyMap_.set(key, value);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(key, opt_default) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      return val[0]
    }else {
      return val
    }
  }else {
    return opt_default
  }
};
goog.Uri.QueryData.prototype.setValues = function(key, values) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  if(this.containsKey(key)) {
    var old = this.keyMap_.get(key);
    if(goog.isArray(old)) {
      this.count_ -= old.length
    }else {
      this.count_--
    }
  }
  if(values.length > 0) {
    this.keyMap_.set(key, values);
    this.count_ += values.length
  }
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  var sb = [];
  var count = 0;
  var keys = this.keyMap_.getKeys();
  for(var i = 0;i < keys.length;i++) {
    var key = keys[i];
    var encodedKey = goog.string.urlEncode(key);
    var val = this.keyMap_.get(key);
    if(goog.isArray(val)) {
      for(var j = 0;j < val.length;j++) {
        if(count > 0) {
          sb.push("&")
        }
        sb.push(encodedKey);
        if(val[j] !== "") {
          sb.push("=", goog.string.urlEncode(val[j]))
        }
        count++
      }
    }else {
      if(count > 0) {
        sb.push("&")
      }
      sb.push(encodedKey);
      if(val !== "") {
        sb.push("=", goog.string.urlEncode(val))
      }
      count++
    }
  }
  return this.encodedQuery_ = sb.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  if(!this.decodedQuery_) {
    this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString())
  }
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  if(this.uri_) {
    delete this.uri_.cachedToString_
  }
};
goog.Uri.QueryData.prototype.filterKeys = function(keys) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(value, key, map) {
    if(!goog.array.contains(keys, key)) {
      this.remove(key)
    }
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var rv = new goog.Uri.QueryData;
  if(this.decodedQuery_) {
    rv.decodedQuery_ = this.decodedQuery_
  }
  if(this.encodedQuery_) {
    rv.encodedQuery_ = this.encodedQuery_
  }
  if(this.keyMap_) {
    rv.keyMap_ = this.keyMap_.clone()
  }
  return rv
};
goog.Uri.QueryData.prototype.getKeyName_ = function(arg) {
  var keyName = String(arg);
  if(this.ignoreCase_) {
    keyName = keyName.toLowerCase()
  }
  return keyName
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  if(resetKeys) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    goog.structs.forEach(this.keyMap_, function(value, key, map) {
      var lowerCase = key.toLowerCase();
      if(key != lowerCase) {
        this.remove(key);
        this.add(lowerCase, value)
      }
    }, this)
  }
  this.ignoreCase_ = ignoreCase
};
goog.Uri.QueryData.prototype.extend = function(var_args) {
  for(var i = 0;i < arguments.length;i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value)
    }, this)
  }
};
goog.provide("goog.dom.BrowserFeature");
goog.require("goog.userAgent");
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.provide("goog.dom.TagName");
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.provide("goog.dom.classes");
goog.require("goog.array");
goog.dom.classes.set = function(element, className) {
  element.className = className
};
goog.dom.classes.get = function(element) {
  var className = element.className;
  return className && typeof className.split == "function" ? className.split(/\s+/) : []
};
goog.dom.classes.add = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.add_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.remove = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var b = goog.dom.classes.remove_(classes, args);
  element.className = classes.join(" ");
  return b
};
goog.dom.classes.add_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < args.length;i++) {
    if(!goog.array.contains(classes, args[i])) {
      classes.push(args[i]);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.remove_ = function(classes, args) {
  var rv = 0;
  for(var i = 0;i < classes.length;i++) {
    if(goog.array.contains(args, classes[i])) {
      goog.array.splice(classes, i--, 1);
      rv++
    }
  }
  return rv == args.length
};
goog.dom.classes.swap = function(element, fromClass, toClass) {
  var classes = goog.dom.classes.get(element);
  var removed = false;
  for(var i = 0;i < classes.length;i++) {
    if(classes[i] == fromClass) {
      goog.array.splice(classes, i--, 1);
      removed = true
    }
  }
  if(removed) {
    classes.push(toClass);
    element.className = classes.join(" ")
  }
  return removed
};
goog.dom.classes.addRemove = function(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  if(goog.isString(classesToRemove)) {
    goog.array.remove(classes, classesToRemove)
  }else {
    if(goog.isArray(classesToRemove)) {
      goog.dom.classes.remove_(classes, classesToRemove)
    }
  }
  if(goog.isString(classesToAdd) && !goog.array.contains(classes, classesToAdd)) {
    classes.push(classesToAdd)
  }else {
    if(goog.isArray(classesToAdd)) {
      goog.dom.classes.add_(classes, classesToAdd)
    }
  }
  element.className = classes.join(" ")
};
goog.dom.classes.has = function(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className)
};
goog.dom.classes.enable = function(element, className, enabled) {
  if(enabled) {
    goog.dom.classes.add(element, className)
  }else {
    goog.dom.classes.remove(element, className)
  }
};
goog.dom.classes.toggle = function(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add
};
goog.provide("goog.math.Coordinate");
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = goog.isDef(opt_x) ? opt_x : 0;
  this.y = goog.isDef(opt_y) ? opt_y : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return"(" + this.x + ", " + this.y + ")"
  }
}
goog.math.Coordinate.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return dx * dx + dy * dy
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.provide("goog.math.Size");
goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height
};
goog.math.Size.equals = function(a, b) {
  if(a == b) {
    return true
  }
  if(!a || !b) {
    return false
  }
  return a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return"(" + this.width + " x " + this.height + ")"
  }
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return(this.width + this.height) * 2
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(target) {
  return this.width <= target.width && this.height <= target.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(s) {
  this.width *= s;
  this.height *= s;
  return this
};
goog.math.Size.prototype.scaleToFit = function(target) {
  var s = this.aspectRatio() > target.aspectRatio() ? target.width / this.width : target.height / this.height;
  return this.scale(s)
};
goog.provide("goog.dom");
goog.provide("goog.dom.DomHelper");
goog.provide("goog.dom.NodeType");
goog.require("goog.array");
goog.require("goog.dom.BrowserFeature");
goog.require("goog.dom.TagName");
goog.require("goog.dom.classes");
goog.require("goog.math.Coordinate");
goog.require("goog.math.Size");
goog.require("goog.object");
goog.require("goog.string");
goog.require("goog.userAgent");
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.defaultDomHelper_;
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(element) {
  return goog.isString(element) ? document.getElementById(element) : element
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el)
};
goog.dom.getElementsByClass = function(className, opt_el) {
  var parent = opt_el || document;
  if(goog.dom.canUseQuerySelector_(parent)) {
    return parent.querySelectorAll("." + className)
  }else {
    if(parent.getElementsByClassName) {
      return parent.getElementsByClassName(className)
    }
  }
  return goog.dom.getElementsByTagNameAndClass_(document, "*", className, opt_el)
};
goog.dom.getElementByClass = function(className, opt_el) {
  var parent = opt_el || document;
  var retVal = null;
  if(goog.dom.canUseQuerySelector_(parent)) {
    retVal = parent.querySelector("." + className)
  }else {
    retVal = goog.dom.getElementsByClass(className, opt_el)[0]
  }
  return retVal || null
};
goog.dom.canUseQuerySelector_ = function(parent) {
  return parent.querySelectorAll && parent.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc;
  var tagName = opt_tag && opt_tag != "*" ? opt_tag.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(parent) && (tagName || opt_class)) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query)
  }
  if(opt_class && parent.getElementsByClassName) {
    var els = parent.getElementsByClassName(opt_class);
    if(tagName) {
      var arrayLike = {};
      var len = 0;
      for(var i = 0, el;el = els[i];i++) {
        if(tagName == el.nodeName) {
          arrayLike[len++] = el
        }
      }
      arrayLike.length = len;
      return arrayLike
    }else {
      return els
    }
  }
  var els = parent.getElementsByTagName(tagName || "*");
  if(opt_class) {
    var arrayLike = {};
    var len = 0;
    for(var i = 0, el;el = els[i];i++) {
      var className = el.className;
      if(typeof className.split == "function" && goog.array.contains(className.split(/\s+/), opt_class)) {
        arrayLike[len++] = el
      }
    }
    arrayLike.length = len;
    return arrayLike
  }else {
    return els
  }
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  goog.object.forEach(properties, function(val, key) {
    if(key == "style") {
      element.style.cssText = val
    }else {
      if(key == "class") {
        element.className = val
      }else {
        if(key == "for") {
          element.htmlFor = val
        }else {
          if(key in goog.dom.DIRECT_ATTRIBUTE_MAP_) {
            element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val)
          }else {
            if(goog.string.startsWith(key, "aria-")) {
              element.setAttribute(key, val)
            }else {
              element[key] = val
            }
          }
        }
      }
    }
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {"cellpadding":"cellPadding", "cellspacing":"cellSpacing", "colspan":"colSpan", "rowspan":"rowSpan", "valign":"vAlign", "height":"height", "width":"width", "usemap":"useMap", "frameborder":"frameBorder", "maxlength":"maxLength", "type":"type"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window)
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    if(typeof win.innerHeight == "undefined") {
      win = window
    }
    var innerHeight = win.innerHeight;
    var scrollHeight = win.document.documentElement.scrollHeight;
    if(win == win.top) {
      if(scrollHeight < innerHeight) {
        innerHeight -= 15
      }
    }
    return new goog.math.Size(win.innerWidth, innerHeight)
  }
  var el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document;
  var height = 0;
  if(doc) {
    var vh = goog.dom.getViewportSize_(win).height;
    var body = doc.body;
    var docEl = doc.documentElement;
    if(goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight
    }else {
      var sh = docEl.scrollHeight;
      var oh = docEl.offsetHeight;
      if(docEl.clientHeight != oh) {
        sh = body.scrollHeight;
        oh = body.offsetHeight
      }
      if(sh > vh) {
        height = sh > oh ? sh : oh
      }else {
        height = sh < oh ? sh : oh
      }
    }
  }
  return height
};
goog.dom.getPageScroll = function(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc);
  var win = goog.dom.getWindow_(doc);
  return new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window
};
goog.dom.getWindow_ = function(doc) {
  return doc.parentWindow || doc.defaultView
};
goog.dom.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = args[0];
  var attributes = args[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && attributes && (attributes.name || attributes.type)) {
    var tagNameArr = ["<", tagName];
    if(attributes.name) {
      tagNameArr.push(' name="', goog.string.htmlEscape(attributes.name), '"')
    }
    if(attributes.type) {
      tagNameArr.push(' type="', goog.string.htmlEscape(attributes.type), '"');
      var clone = {};
      goog.object.extend(clone, attributes);
      attributes = clone;
      delete attributes.type
    }
    tagNameArr.push(">");
    tagName = tagNameArr.join("")
  }
  var element = doc.createElement(tagName);
  if(attributes) {
    if(goog.isString(attributes)) {
      element.className = attributes
    }else {
      if(goog.isArray(attributes)) {
        goog.dom.classes.add.apply(null, [element].concat(attributes))
      }else {
        goog.dom.setProperties(element, attributes)
      }
    }
  }
  if(args.length > 2) {
    goog.dom.append_(doc, element, args, 2)
  }
  return element
};
goog.dom.append_ = function(doc, parent, args, startIndex) {
  function childHandler(child) {
    if(child) {
      parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child)
    }
  }
  for(var i = startIndex;i < args.length;i++) {
    var arg = args[i];
    if(goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg)) {
      goog.array.forEach(goog.dom.isNodeList(arg) ? goog.array.clone(arg) : arg, childHandler)
    }else {
      childHandler(arg)
    }
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return document.createElement(name)
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(content)
};
goog.dom.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.createTable_ = function(doc, rows, columns, fillWithNbsp) {
  var rowHtml = ["<tr>"];
  for(var i = 0;i < columns;i++) {
    rowHtml.push(fillWithNbsp ? "<td>&nbsp;</td>" : "<td></td>")
  }
  rowHtml.push("</tr>");
  rowHtml = rowHtml.join("");
  var totalHtml = ["<table>"];
  for(i = 0;i < rows;i++) {
    totalHtml.push(rowHtml)
  }
  totalHtml.push("</table>");
  var elem = doc.createElement(goog.dom.TagName.DIV);
  elem.innerHTML = totalHtml.join("");
  return elem.removeChild(elem.firstChild)
};
goog.dom.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(document, htmlString)
};
goog.dom.htmlToDocumentFragment_ = function(doc, htmlString) {
  var tempDiv = doc.createElement("div");
  if(goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT) {
    tempDiv.innerHTML = "<br>" + htmlString;
    tempDiv.removeChild(tempDiv.firstChild)
  }else {
    tempDiv.innerHTML = htmlString
  }
  if(tempDiv.childNodes.length == 1) {
    return tempDiv.removeChild(tempDiv.firstChild)
  }else {
    var fragment = doc.createDocumentFragment();
    while(tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }
    return fragment
  }
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(doc) {
  if(goog.dom.COMPAT_MODE_KNOWN_) {
    return goog.dom.ASSUME_STANDARDS_MODE
  }
  return doc.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(node) {
  if(node.nodeType != goog.dom.NodeType.ELEMENT) {
    return false
  }
  switch(node.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return false
  }
  return true
};
goog.dom.appendChild = function(parent, child) {
  parent.appendChild(child)
};
goog.dom.append = function(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1)
};
goog.dom.removeChildren = function(node) {
  var child;
  while(child = node.firstChild) {
    node.removeChild(child)
  }
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode)
  }
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  if(refNode.parentNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling)
  }
};
goog.dom.insertChildAt = function(parent, child, index) {
  parent.insertBefore(child, parent.childNodes[index] || null)
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null
};
goog.dom.replaceNode = function(newNode, oldNode) {
  var parent = oldNode.parentNode;
  if(parent) {
    parent.replaceChild(newNode, oldNode)
  }
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if(parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(element.removeNode) {
      return element.removeNode(false)
    }else {
      while(child = element.firstChild) {
        parent.insertBefore(child, element)
      }
      return goog.dom.removeNode(element)
    }
  }
};
goog.dom.getChildren = function(element) {
  if(goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && element.children != undefined) {
    return element.children
  }
  return goog.array.filter(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(node) {
  if(node.firstElementChild != undefined) {
    return node.firstElementChild
  }
  return goog.dom.getNextElementNode_(node.firstChild, true)
};
goog.dom.getLastElementChild = function(node) {
  if(node.lastElementChild != undefined) {
    return node.lastElementChild
  }
  return goog.dom.getNextElementNode_(node.lastChild, false)
};
goog.dom.getNextElementSibling = function(node) {
  if(node.nextElementSibling != undefined) {
    return node.nextElementSibling
  }
  return goog.dom.getNextElementNode_(node.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(node) {
  if(node.previousElementSibling != undefined) {
    return node.previousElementSibling
  }
  return goog.dom.getNextElementNode_(node.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(node, forward) {
  while(node && node.nodeType != goog.dom.NodeType.ELEMENT) {
    node = forward ? node.nextSibling : node.previousSibling
  }
  return node
};
goog.dom.getNextNode = function(node) {
  if(!node) {
    return null
  }
  if(node.firstChild) {
    return node.firstChild
  }
  while(node && !node.nextSibling) {
    node = node.parentNode
  }
  return node ? node.nextSibling : null
};
goog.dom.getPreviousNode = function(node) {
  if(!node) {
    return null
  }
  if(!node.previousSibling) {
    return node.parentNode
  }
  node = node.previousSibling;
  while(node && node.lastChild) {
    node = node.lastChild
  }
  return node
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0
};
goog.dom.isElement = function(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(obj) {
  return goog.isObject(obj) && obj["window"] == obj
};
goog.dom.contains = function(parent, descendant) {
  if(parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant)
  }
  if(typeof parent.compareDocumentPosition != "undefined") {
    return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16)
  }
  while(descendant && parent != descendant) {
    descendant = descendant.parentNode
  }
  return descendant == parent
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if(node1 == node2) {
    return 0
  }
  if(node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1
  }
  if("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT;
    var isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if(isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex
    }else {
      var parent1 = node1.parentNode;
      var parent2 = node2.parentNode;
      if(parent1 == parent2) {
        return goog.dom.compareSiblingOrder_(node1, node2)
      }
      if(!isElement1 && goog.dom.contains(parent1, node2)) {
        return-1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2)
      }
      if(!isElement2 && goog.dom.contains(parent2, node1)) {
        return goog.dom.compareParentsDescendantNodeIe_(node2, node1)
      }
      return(isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex)
    }
  }
  var doc = goog.dom.getOwnerDocument(node1);
  var range1, range2;
  range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(true);
  range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(true);
  return range1.compareBoundaryPoints(goog.global["Range"].START_TO_END, range2)
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if(parent == node) {
    return-1
  }
  var sibling = node;
  while(sibling.parentNode != parent) {
    sibling = sibling.parentNode
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode)
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  var s = node2;
  while(s = s.previousSibling) {
    if(s == node1) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(var_args) {
  var i, count = arguments.length;
  if(!count) {
    return null
  }else {
    if(count == 1) {
      return arguments[0]
    }
  }
  var paths = [];
  var minLength = Infinity;
  for(i = 0;i < count;i++) {
    var ancestors = [];
    var node = arguments[i];
    while(node) {
      ancestors.unshift(node);
      node = node.parentNode
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length)
  }
  var output = null;
  for(i = 0;i < minLength;i++) {
    var first = paths[0][i];
    for(var j = 1;j < count;j++) {
      if(first != paths[j][i]) {
        return output
      }
    }
    output = first
  }
  return output
};
goog.dom.getOwnerDocument = function(node) {
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document
};
goog.dom.getFrameContentDocument = function(frame) {
  var doc = frame.contentDocument || frame.contentWindow.document;
  return doc
};
goog.dom.getFrameContentWindow = function(frame) {
  return frame.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(frame))
};
goog.dom.setTextContent = function(element, text) {
  if("textContent" in element) {
    element.textContent = text
  }else {
    if(element.firstChild && element.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      while(element.lastChild != element.firstChild) {
        element.removeChild(element.lastChild)
      }
      element.firstChild.data = text
    }else {
      goog.dom.removeChildren(element);
      var doc = goog.dom.getOwnerDocument(element);
      element.appendChild(doc.createTextNode(text))
    }
  }
};
goog.dom.getOuterHtml = function(element) {
  if("outerHTML" in element) {
    return element.outerHTML
  }else {
    var doc = goog.dom.getOwnerDocument(element);
    var div = doc.createElement("div");
    div.appendChild(element.cloneNode(true));
    return div.innerHTML
  }
};
goog.dom.findNode = function(root, p) {
  var rv = [];
  var found = goog.dom.findNodes_(root, p, rv, true);
  return found ? rv[0] : undefined
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, false);
  return rv
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if(root != null) {
    var child = root.firstChild;
    while(child) {
      if(p(child)) {
        rv.push(child);
        if(findOne) {
          return true
        }
      }
      if(goog.dom.findNodes_(child, p, rv, findOne)) {
        return true
      }
      child = child.nextSibling
    }
  }
  return false
};
goog.dom.TAGS_TO_IGNORE_ = {"SCRIPT":1, "STYLE":1, "HEAD":1, "IFRAME":1, "OBJECT":1};
goog.dom.PREDEFINED_TAG_VALUES_ = {"IMG":" ", "BR":"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  var attrNode = element.getAttributeNode("tabindex");
  if(attrNode && attrNode.specified) {
    var index = element.tabIndex;
    return goog.isNumber(index) && index >= 0 && index < 32768
  }
  return false
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  if(enable) {
    element.tabIndex = 0
  }else {
    element.tabIndex = -1;
    element.removeAttribute("tabIndex")
  }
};
goog.dom.getTextContent = function(node) {
  var textContent;
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in node) {
    textContent = goog.string.canonicalizeNewlines(node.innerText)
  }else {
    var buf = [];
    goog.dom.getTextContent_(node, buf, true);
    textContent = buf.join("")
  }
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  if(!goog.dom.BrowserFeature.CAN_USE_INNER_TEXT) {
    textContent = textContent.replace(/ +/g, " ")
  }
  if(textContent != " ") {
    textContent = textContent.replace(/^\s*/, "")
  }
  return textContent
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, false);
  return buf.join("")
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if(node.nodeName in goog.dom.TAGS_TO_IGNORE_) {
  }else {
    if(node.nodeType == goog.dom.NodeType.TEXT) {
      if(normalizeWhitespace) {
        buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
      }else {
        buf.push(node.nodeValue)
      }
    }else {
      if(node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName])
      }else {
        var child = node.firstChild;
        while(child) {
          goog.dom.getTextContent_(child, buf, normalizeWhitespace);
          child = child.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body;
  var buf = [];
  while(node && node != root) {
    var cur = node;
    while(cur = cur.previousSibling) {
      buf.unshift(goog.dom.getTextContent(cur))
    }
    node = node.parentNode
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  var stack = [parent], pos = 0, cur;
  while(stack.length > 0 && pos < offset) {
    cur = stack.pop();
    if(cur.nodeName in goog.dom.TAGS_TO_IGNORE_) {
    }else {
      if(cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
        pos += text.length
      }else {
        if(cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length
        }else {
          for(var i = cur.childNodes.length - 1;i >= 0;i--) {
            stack.push(cur.childNodes[i])
          }
        }
      }
    }
  }
  if(goog.isObject(opt_result)) {
    opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0;
    opt_result.node = cur
  }
  return cur
};
goog.dom.isNodeList = function(val) {
  if(val && typeof val.length == "number") {
    if(goog.isObject(val)) {
      return typeof val.item == "function" || typeof val.item == "string"
    }else {
      if(goog.isFunction(val)) {
        return typeof val.item == "function"
      }
    }
  }
  return false
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class) {
  var tagName = opt_tag ? opt_tag.toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return(!tagName || node.nodeName == tagName) && (!opt_class || goog.dom.classes.has(node, opt_class))
  }, true)
};
goog.dom.getAncestorByClass = function(element, opt_class) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, opt_class)
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  if(!opt_includeNode) {
    element = element.parentNode
  }
  var ignoreSearchSteps = opt_maxSearchSteps == null;
  var steps = 0;
  while(element && (ignoreSearchSteps || steps <= opt_maxSearchSteps)) {
    if(matcher(element)) {
      return element
    }
    element = element.parentNode;
    steps++
  }
  return null
};
goog.dom.getActiveElement = function(doc) {
  try {
    return doc && doc.activeElement
  }catch(e) {
  }
  return null
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(document) {
  this.document_ = document
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(element) {
  if(goog.isString(element)) {
    return this.document_.getElementById(element)
  }else {
    return element
  }
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc)
};
goog.dom.DomHelper.prototype.getElementByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.Appendable;
goog.dom.DomHelper.prototype.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(name) {
  return this.document_.createElement(name)
};
goog.dom.DomHelper.prototype.createTextNode = function(content) {
  return this.document_.createTextNode(content)
};
goog.dom.DomHelper.prototype.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(htmlString) {
  return goog.dom.htmlToDocumentFragment_(this.document_, htmlString)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.provide("goog.json");
goog.provide("goog.json.Serializer");
goog.json.isValid_ = function(s) {
  if(/^\s*$/.test(s)) {
    return false
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g;
  var simpleValuesRe = /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g;
  var remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""))
};
goog.json.parse = function(s) {
  var o = String(s);
  if(goog.json.isValid_(o)) {
    try {
      return eval("(" + o + ")")
    }catch(ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.unsafeParse = function(s) {
  return eval("(" + s + ")")
};
goog.json.Replacer;
goog.json.serialize = function(object, opt_replacer) {
  return(new goog.json.Serializer(opt_replacer)).serialize(object)
};
goog.json.Serializer = function(opt_replacer) {
  this.replacer_ = opt_replacer
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serialize_(object, sb);
  return sb.join("")
};
goog.json.Serializer.prototype.serialize_ = function(object, sb) {
  switch(typeof object) {
    case "string":
      this.serializeString_(object, sb);
      break;
    case "number":
      this.serializeNumber_(object, sb);
      break;
    case "boolean":
      sb.push(object);
      break;
    case "undefined":
      sb.push("null");
      break;
    case "object":
      if(object == null) {
        sb.push("null");
        break
      }
      if(goog.isArray(object)) {
        this.serializeArray_(object, sb);
        break
      }
      this.serializeObject_(object, sb);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof object);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    if(c in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[c]
    }
    var cc = c.charCodeAt(0);
    var rv = "\\u";
    if(cc < 16) {
      rv += "000"
    }else {
      if(cc < 256) {
        rv += "00"
      }else {
        if(cc < 4096) {
          rv += "0"
        }
      }
    }
    return goog.json.Serializer.charToJsonCharCache_[c] = rv + cc.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? n : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  var sep = "";
  for(var i = 0;i < l;i++) {
    sb.push(sep);
    var value = arr[i];
    this.serialize_(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ","
  }
  sb.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "";
  for(var key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      if(typeof value != "function") {
        sb.push(sep);
        this.serializeString_(key, sb);
        sb.push(":");
        this.serialize_(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb);
        sep = ","
      }
    }
  }
  sb.push("}")
};
goog.provide("goog.structs.Collection");
goog.structs.Collection = function() {
};
goog.structs.Collection.prototype.add;
goog.structs.Collection.prototype.remove;
goog.structs.Collection.prototype.contains;
goog.structs.Collection.prototype.getCount;
goog.provide("goog.structs.Set");
goog.require("goog.structs");
goog.require("goog.structs.Collection");
goog.require("goog.structs.Map");
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  if(opt_values) {
    this.addAll(opt_values)
  }
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  if(type == "object" && val || type == "function") {
    return"o" + goog.getUid(val)
  }else {
    return type.substr(0, 1) + val
  }
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element)
};
goog.structs.Set.prototype.addAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.add(values[i])
  }
};
goog.structs.Set.prototype.removeAll = function(col) {
  var values = goog.structs.getValues(col);
  var l = values.length;
  for(var i = 0;i < l;i++) {
    this.remove(values[i])
  }
};
goog.structs.Set.prototype.remove = function(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element))
};
goog.structs.Set.prototype.containsAll = function(col) {
  return goog.structs.every(col, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(col) {
  var result = new goog.structs.Set;
  var values = goog.structs.getValues(col);
  for(var i = 0;i < values.length;i++) {
    var value = values[i];
    if(this.contains(value)) {
      result.add(value)
    }
  }
  return result
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col)
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if(this.getCount() > colCount) {
    return false
  }
  if(!(col instanceof goog.structs.Set) && colCount > 5) {
    col = new goog.structs.Set(col)
  }
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value)
  })
};
goog.structs.Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false)
};
goog.provide("goog.debug");
goog.require("goog.array");
goog.require("goog.string");
goog.require("goog.structs.Set");
goog.require("goog.userAgent");
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global;
  var oldErrorHandler = target.onerror;
  var retVal = goog.userAgent.WEBKIT ? !opt_cancel : !!opt_cancel;
  target.onerror = function(message, url, line) {
    if(oldErrorHandler) {
      oldErrorHandler(message, url, line)
    }
    logFunc({message:message, fileName:url, line:line});
    return retVal
  }
};
goog.debug.expose = function(obj, opt_showFn) {
  if(typeof obj == "undefined") {
    return"undefined"
  }
  if(obj == null) {
    return"NULL"
  }
  var str = [];
  for(var x in obj) {
    if(!opt_showFn && goog.isFunction(obj[x])) {
      continue
    }
    var s = x + " = ";
    try {
      s += obj[x]
    }catch(e) {
      s += "*** " + e + " ***"
    }
    str.push(s)
  }
  return str.join("\n")
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var previous = new goog.structs.Set;
  var str = [];
  var helper = function(obj, space) {
    var nestspace = space + "  ";
    var indentMultiline = function(str) {
      return str.replace(/\n/g, "\n" + space)
    };
    try {
      if(!goog.isDef(obj)) {
        str.push("undefined")
      }else {
        if(goog.isNull(obj)) {
          str.push("NULL")
        }else {
          if(goog.isString(obj)) {
            str.push('"' + indentMultiline(obj) + '"')
          }else {
            if(goog.isFunction(obj)) {
              str.push(indentMultiline(String(obj)))
            }else {
              if(goog.isObject(obj)) {
                if(previous.contains(obj)) {
                  str.push("*** reference loop detected ***")
                }else {
                  previous.add(obj);
                  str.push("{");
                  for(var x in obj) {
                    if(!opt_showFn && goog.isFunction(obj[x])) {
                      continue
                    }
                    str.push("\n");
                    str.push(nestspace);
                    str.push(x + " = ");
                    helper(obj[x], nestspace)
                  }
                  str.push("\n" + space + "}")
                }
              }else {
                str.push(obj)
              }
            }
          }
        }
      }
    }catch(e) {
      str.push("*** " + e + " ***")
    }
  };
  helper(obj, "");
  return str.join("")
};
goog.debug.exposeArray = function(arr) {
  var str = [];
  for(var i = 0;i < arr.length;i++) {
    if(goog.isArray(arr[i])) {
      str.push(goog.debug.exposeArray(arr[i]))
    }else {
      str.push(arr[i])
    }
  }
  return"[ " + str.join(", ") + " ]"
};
goog.debug.exposeException = function(err, opt_fn) {
  try {
    var e = goog.debug.normalizeErrorObject(err);
    var error = "Message: " + goog.string.htmlEscape(e.message) + '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' + e.fileName + "</a>\nLine: " + e.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(e.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(opt_fn) + "-> ");
    return error
  }catch(e2) {
    return"Exception trying to expose exception! You win, we lose. " + e2
  }
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  if(goog.isString(err)) {
    return{"message":err, "name":"Unknown error", "lineNumber":"Not available", "fileName":href, "stack":"Not available"}
  }
  var lineNumber, fileName;
  var threwError = false;
  try {
    lineNumber = err.lineNumber || err.line || "Not available"
  }catch(e) {
    lineNumber = "Not available";
    threwError = true
  }
  try {
    fileName = err.fileName || err.filename || err.sourceURL || href
  }catch(e) {
    fileName = "Not available";
    threwError = true
  }
  if(threwError || !err.lineNumber || !err.fileName || !err.stack) {
    return{"message":err.message, "name":err.name, "lineNumber":lineNumber, "fileName":fileName, "stack":err.stack || "Not available"}
  }
  return err
};
goog.debug.enhanceError = function(err, opt_message) {
  var error = typeof err == "string" ? Error(err) : err;
  if(!error.stack) {
    error.stack = goog.debug.getStacktrace(arguments.callee.caller)
  }
  if(opt_message) {
    var x = 0;
    while(error["message" + x]) {
      ++x
    }
    error["message" + x] = String(opt_message)
  }
  return error
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  var sb = [];
  var fn = arguments.callee.caller;
  var depth = 0;
  while(fn && (!opt_depth || depth < opt_depth)) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller
    }catch(e) {
      sb.push("[exception trying to get caller]\n");
      break
    }
    depth++;
    if(depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break
    }
  }
  if(opt_depth && depth >= opt_depth) {
    sb.push("[...reached max depth limit...]")
  }else {
    sb.push("[end]")
  }
  return sb.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(opt_fn) {
  return goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if(goog.array.contains(visited, fn)) {
    sb.push("[...circular reference...]")
  }else {
    if(fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
      sb.push(goog.debug.getFunctionName(fn) + "(");
      var args = fn.arguments;
      for(var i = 0;i < args.length;i++) {
        if(i > 0) {
          sb.push(", ")
        }
        var argDesc;
        var arg = args[i];
        switch(typeof arg) {
          case "object":
            argDesc = arg ? "object" : "null";
            break;
          case "string":
            argDesc = arg;
            break;
          case "number":
            argDesc = String(arg);
            break;
          case "boolean":
            argDesc = arg ? "true" : "false";
            break;
          case "function":
            argDesc = goog.debug.getFunctionName(arg);
            argDesc = argDesc ? argDesc : "[fn]";
            break;
          case "undefined":
          ;
          default:
            argDesc = typeof arg;
            break
        }
        if(argDesc.length > 40) {
          argDesc = argDesc.substr(0, 40) + "..."
        }
        sb.push(argDesc)
      }
      visited.push(fn);
      sb.push(")\n");
      try {
        sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited))
      }catch(e) {
        sb.push("[exception trying to get caller]\n")
      }
    }else {
      if(fn) {
        sb.push("[...long stack...]")
      }else {
        sb.push("[end]")
      }
    }
  }
  return sb.join("")
};
goog.debug.setFunctionResolver = function(resolver) {
  goog.debug.fnNameResolver_ = resolver
};
goog.debug.getFunctionName = function(fn) {
  if(goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn]
  }
  if(goog.debug.fnNameResolver_) {
    var name = goog.debug.fnNameResolver_(fn);
    if(name) {
      goog.debug.fnNameCache_[fn] = name;
      return name
    }
  }
  var functionSource = String(fn);
  if(!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    if(matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method
    }else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]"
    }
  }
  return goog.debug.fnNameCache_[functionSource]
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.fnNameResolver_;
goog.provide("goog.debug.LogRecord");
goog.debug.LogRecord = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  this.reset(level, msg, loggerName, opt_time, opt_sequenceNumber)
};
goog.debug.LogRecord.prototype.time_;
goog.debug.LogRecord.prototype.level_;
goog.debug.LogRecord.prototype.msg_;
goog.debug.LogRecord.prototype.loggerName_;
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = true;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(level, msg, loggerName, opt_time, opt_sequenceNumber) {
  if(goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS) {
    this.sequenceNumber_ = typeof opt_sequenceNumber == "number" ? opt_sequenceNumber : goog.debug.LogRecord.nextSequenceNumber_++
  }
  this.time_ = opt_time || goog.now();
  this.level_ = level;
  this.msg_ = msg;
  this.loggerName_ = loggerName;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(exception) {
  this.exception_ = exception
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(text) {
  this.exceptionText_ = text
};
goog.debug.LogRecord.prototype.setLoggerName = function(loggerName) {
  this.loggerName_ = loggerName
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(level) {
  this.level_ = level
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(msg) {
  this.msg_ = msg
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(time) {
  this.time_ = time
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.provide("goog.debug.LogBuffer");
goog.require("goog.asserts");
goog.require("goog.debug.LogRecord");
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining " + "goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  if(!goog.debug.LogBuffer.instance_) {
    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer
  }
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.buffer_;
goog.debug.LogBuffer.prototype.curIndex_;
goog.debug.LogBuffer.prototype.isFull_;
goog.debug.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {
  var curIndex = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = curIndex;
  if(this.isFull_) {
    var ret = this.buffer_[curIndex];
    ret.reset(level, msg, loggerName);
    return ret
  }
  this.isFull_ = curIndex == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[curIndex] = new goog.debug.LogRecord(level, msg, loggerName)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return goog.debug.LogBuffer.CAPACITY > 0
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = new Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = false
};
goog.debug.LogBuffer.prototype.forEachRecord = function(func) {
  var buffer = this.buffer_;
  if(!buffer[0]) {
    return
  }
  var curIndex = this.curIndex_;
  var i = this.isFull_ ? curIndex : -1;
  do {
    i = (i + 1) % goog.debug.LogBuffer.CAPACITY;
    func(buffer[i])
  }while(i != curIndex)
};
goog.provide("goog.debug.LogManager");
goog.provide("goog.debug.Logger");
goog.provide("goog.debug.Logger.Level");
goog.require("goog.array");
goog.require("goog.asserts");
goog.require("goog.debug");
goog.require("goog.debug.LogBuffer");
goog.require("goog.debug.LogRecord");
goog.debug.Logger = function(name) {
  this.name_ = name
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = true;
if(!goog.debug.Logger.ENABLE_HIERARCHY) {
  goog.debug.Logger.rootHandlers_ = [];
  goog.debug.Logger.rootLevel_
}
goog.debug.Logger.Level = function(name, value) {
  this.name = name;
  this.value = value
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var i = 0, level;level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];i++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[level.value] = level;
    goog.debug.Logger.Level.predefinedLevelsCache_[level.name] = level
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(name) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  return goog.debug.Logger.Level.predefinedLevelsCache_[name] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(value) {
  if(!goog.debug.Logger.Level.predefinedLevelsCache_) {
    goog.debug.Logger.Level.createPredefinedLevelsCache_()
  }
  if(value in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[value]
  }
  for(var i = 0;i < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++i) {
    var level = goog.debug.Logger.Level.PREDEFINED_LEVELS[i];
    if(level.value <= value) {
      return level
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(name) {
  return goog.debug.LogManager.getLogger(name)
};
goog.debug.Logger.logToProfilers = function(msg) {
  if(goog.global["console"]) {
    if(goog.global["console"]["timeStamp"]) {
      goog.global["console"]["timeStamp"](msg)
    }else {
      if(goog.global["console"]["markTimeline"]) {
        goog.global["console"]["markTimeline"](msg)
      }
    }
  }
  if(goog.global["msWriteProfilerMark"]) {
    goog.global["msWriteProfilerMark"](msg)
  }
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(handler) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(handler)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootHandlers_.push(handler)
  }
};
goog.debug.Logger.prototype.removeHandler = function(handler) {
  var handlers = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!handlers && goog.array.remove(handlers, handler)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(level) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    this.level_ = level
  }else {
    goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when " + "goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootLevel_ = level
  }
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(level) {
  return level.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(level, msg, opt_exception) {
  if(this.isLoggable(level)) {
    this.doLogRecord_(this.getLogRecord(level, msg, opt_exception))
  }
};
goog.debug.Logger.prototype.getLogRecord = function(level, msg, opt_exception) {
  if(goog.debug.LogBuffer.isBufferingEnabled()) {
    var logRecord = goog.debug.LogBuffer.getInstance().addRecord(level, msg, this.name_)
  }else {
    logRecord = new goog.debug.LogRecord(level, String(msg), this.name_)
  }
  if(opt_exception) {
    logRecord.setException(opt_exception);
    logRecord.setExceptionText(goog.debug.exposeException(opt_exception, arguments.callee.caller))
  }
  return logRecord
};
goog.debug.Logger.prototype.shout = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SHOUT, msg, opt_exception)
};
goog.debug.Logger.prototype.severe = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.SEVERE, msg, opt_exception)
};
goog.debug.Logger.prototype.warning = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.WARNING, msg, opt_exception)
};
goog.debug.Logger.prototype.info = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.INFO, msg, opt_exception)
};
goog.debug.Logger.prototype.config = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.CONFIG, msg, opt_exception)
};
goog.debug.Logger.prototype.fine = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINE, msg, opt_exception)
};
goog.debug.Logger.prototype.finer = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINER, msg, opt_exception)
};
goog.debug.Logger.prototype.finest = function(msg, opt_exception) {
  this.log(goog.debug.Logger.Level.FINEST, msg, opt_exception)
};
goog.debug.Logger.prototype.logRecord = function(logRecord) {
  if(this.isLoggable(logRecord.getLevel())) {
    this.doLogRecord_(logRecord)
  }
};
goog.debug.Logger.prototype.doLogRecord_ = function(logRecord) {
  goog.debug.Logger.logToProfilers("log:" + logRecord.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var target = this;
    while(target) {
      target.callPublish_(logRecord);
      target = target.getParent()
    }
  }else {
    for(var i = 0, handler;handler = goog.debug.Logger.rootHandlers_[i++];) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(logRecord) {
  if(this.handlers_) {
    for(var i = 0, handler;handler = this.handlers_[i];i++) {
      handler(logRecord)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(parent) {
  this.parent_ = parent
};
goog.debug.Logger.prototype.addChild_ = function(name, logger) {
  this.getChildren()[name] = logger
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(name) {
  goog.debug.LogManager.initialize();
  var ret = goog.debug.LogManager.loggers_[name];
  return ret || goog.debug.LogManager.createLogger_(name)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(opt_logger) {
  return function(info) {
    var logger = opt_logger || goog.debug.LogManager.getRoot();
    logger.severe("Error: " + info.message + " (" + info.fileName + " @ Line: " + info.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(name) {
  var logger = new goog.debug.Logger(name);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var lastDotIndex = name.lastIndexOf(".");
    var parentName = name.substr(0, lastDotIndex);
    var leafName = name.substr(lastDotIndex + 1);
    var parentLogger = goog.debug.LogManager.getLogger(parentName);
    parentLogger.addChild_(leafName, logger);
    logger.setParent_(parentLogger)
  }
  goog.debug.LogManager.loggers_[name] = logger;
  return logger
};
goog.provide("goog.messaging.MessageChannel");
goog.messaging.MessageChannel = function() {
};
goog.messaging.MessageChannel.prototype.connect = function(opt_connectCb) {
};
goog.messaging.MessageChannel.prototype.isConnected = function() {
};
goog.messaging.MessageChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
};
goog.messaging.MessageChannel.prototype.registerDefaultService = function(callback) {
};
goog.messaging.MessageChannel.prototype.send = function(serviceName, payload) {
};
goog.provide("goog.messaging.AbstractChannel");
goog.require("goog.Disposable");
goog.require("goog.debug");
goog.require("goog.debug.Logger");
goog.require("goog.json");
goog.require("goog.messaging.MessageChannel");
goog.messaging.AbstractChannel = function() {
  goog.base(this);
  this.services_ = {}
};
goog.inherits(goog.messaging.AbstractChannel, goog.Disposable);
goog.messaging.AbstractChannel.prototype.defaultService_;
goog.messaging.AbstractChannel.prototype.logger = goog.debug.Logger.getLogger("goog.messaging.AbstractChannel");
goog.messaging.AbstractChannel.prototype.connect = function(opt_connectCb) {
  if(opt_connectCb) {
    opt_connectCb()
  }
};
goog.messaging.AbstractChannel.prototype.isConnected = function() {
  return true
};
goog.messaging.AbstractChannel.prototype.registerService = function(serviceName, callback, opt_objectPayload) {
  this.services_[serviceName] = {callback:callback, objectPayload:!!opt_objectPayload}
};
goog.messaging.AbstractChannel.prototype.registerDefaultService = function(callback) {
  this.defaultService_ = callback
};
goog.messaging.AbstractChannel.prototype.send = goog.abstractMethod;
goog.messaging.AbstractChannel.prototype.deliver = function(serviceName, payload) {
  var service = this.getService(serviceName, payload);
  if(!service) {
    return
  }
  var decodedPayload = this.decodePayload(serviceName, payload, service.objectPayload);
  if(goog.isDefAndNotNull(decodedPayload)) {
    service.callback(decodedPayload)
  }
};
goog.messaging.AbstractChannel.prototype.getService = function(serviceName, payload) {
  var service = this.services_[serviceName];
  if(service) {
    return service
  }else {
    if(this.defaultService_) {
      var callback = goog.partial(this.defaultService_, serviceName);
      var objectPayload = goog.isObject(payload);
      return{callback:callback, objectPayload:objectPayload}
    }
  }
  this.logger.warning('Unknown service name "' + serviceName + '"');
  return null
};
goog.messaging.AbstractChannel.prototype.decodePayload = function(serviceName, payload, objectPayload) {
  if(objectPayload && goog.isString(payload)) {
    try {
      return goog.json.parse(payload)
    }catch(err) {
      this.logger.warning("Expected JSON payload for " + serviceName + ', was "' + payload + '"');
      return null
    }
  }else {
    if(!objectPayload && !goog.isString(payload)) {
      return goog.json.serialize(payload)
    }
  }
  return payload
};
goog.messaging.AbstractChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  goog.dispose(this.logger);
  delete this.logger;
  delete this.services_;
  delete this.defaultService_
};
goog.provide("goog.net.xpc");
goog.provide("goog.net.xpc.CfgFields");
goog.provide("goog.net.xpc.ChannelStates");
goog.provide("goog.net.xpc.TransportNames");
goog.provide("goog.net.xpc.TransportTypes");
goog.provide("goog.net.xpc.UriCfgFields");
goog.require("goog.debug.Logger");
goog.net.xpc.TransportTypes = {NATIVE_MESSAGING:1, FRAME_ELEMENT_METHOD:2, IFRAME_RELAY:3, IFRAME_POLLING:4, FLASH:5, NIX:6};
goog.net.xpc.TransportNames = {1:"NativeMessagingTransport", 2:"FrameElementMethodTransport", 3:"IframeRelayTransport", 4:"IframePollingTransport", 5:"FlashTransport", 6:"NixTransport"};
goog.net.xpc.CfgFields = {CHANNEL_NAME:"cn", AUTH_TOKEN:"at", REMOTE_AUTH_TOKEN:"rat", PEER_URI:"pu", IFRAME_ID:"ifrid", TRANSPORT:"tp", LOCAL_RELAY_URI:"lru", PEER_RELAY_URI:"pru", LOCAL_POLL_URI:"lpu", PEER_POLL_URI:"ppu", PEER_HOSTNAME:"ph"};
goog.net.xpc.UriCfgFields = [goog.net.xpc.CfgFields.PEER_URI, goog.net.xpc.CfgFields.LOCAL_RELAY_URI, goog.net.xpc.CfgFields.PEER_RELAY_URI, goog.net.xpc.CfgFields.LOCAL_POLL_URI, goog.net.xpc.CfgFields.PEER_POLL_URI];
goog.net.xpc.ChannelStates = {NOT_CONNECTED:1, CONNECTED:2, CLOSED:3};
goog.net.xpc.TRANSPORT_SERVICE_ = "tp";
goog.net.xpc.SETUP = "SETUP";
goog.net.xpc.SETUP_ACK_ = "SETUP_ACK";
goog.net.xpc.channels_ = {};
goog.net.xpc.getRandomString = function(length, opt_characters) {
  var chars = opt_characters || goog.net.xpc.randomStringCharacters_;
  var charsLength = chars.length;
  var s = "";
  while(length-- > 0) {
    s += chars.charAt(Math.floor(Math.random() * charsLength))
  }
  return s
};
goog.net.xpc.randomStringCharacters_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
goog.net.xpc.logger = goog.debug.Logger.getLogger("goog.net.xpc");
goog.provide("goog.net.xpc.CrossPageChannelRole");
goog.net.xpc.CrossPageChannelRole = {OUTER:0, INNER:1};
goog.provide("goog.net.xpc.Transport");
goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.net.xpc");
goog.net.xpc.Transport = function(opt_domHelper) {
  goog.Disposable.call(this);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper()
};
goog.inherits(goog.net.xpc.Transport, goog.Disposable);
goog.net.xpc.Transport.prototype.transportType = 0;
goog.net.xpc.Transport.prototype.getType = function() {
  return this.transportType
};
goog.net.xpc.Transport.prototype.getWindow = function() {
  return this.domHelper_.getWindow()
};
goog.net.xpc.Transport.prototype.getName = function() {
  return goog.net.xpc.TransportNames[this.transportType] || ""
};
goog.net.xpc.Transport.prototype.transportServiceHandler = goog.abstractMethod;
goog.net.xpc.Transport.prototype.connect = goog.abstractMethod;
goog.net.xpc.Transport.prototype.send = goog.abstractMethod;
goog.provide("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.FrameElementMethodTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.queue_ = [];
  this.deliverQueuedCb_ = goog.bind(this.deliverQueued_, this)
};
goog.inherits(goog.net.xpc.FrameElementMethodTransport, goog.net.xpc.Transport);
goog.net.xpc.FrameElementMethodTransport.prototype.transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD;
goog.net.xpc.FrameElementMethodTransport.prototype.recursive_ = false;
goog.net.xpc.FrameElementMethodTransport.prototype.timer_ = 0;
goog.net.xpc.FrameElementMethodTransport.outgoing_ = null;
goog.net.xpc.FrameElementMethodTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
    this.iframeElm_ = this.channel_.iframeElement_;
    this.iframeElm_["XPC_toOuter"] = goog.bind(this.incoming_, this)
  }else {
    this.attemptSetup_()
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.attemptSetup_ = function() {
  var retry = true;
  try {
    if(!this.iframeElm_) {
      this.iframeElm_ = this.getWindow().frameElement
    }
    if(this.iframeElm_ && this.iframeElm_["XPC_toOuter"]) {
      this.outgoing_ = this.iframeElm_["XPC_toOuter"];
      this.iframeElm_["XPC_toOuter"]["XPC_toInner"] = goog.bind(this.incoming_, this);
      retry = false;
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(retry) {
    if(!this.attemptSetupCb_) {
      this.attemptSetupCb_ = goog.bind(this.attemptSetup_, this)
    }
    this.getWindow().setTimeout(this.attemptSetupCb_, 100)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.transportServiceHandler = function(payload) {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER && !this.channel_.isConnected() && payload == goog.net.xpc.SETUP_ACK_) {
    this.outgoing_ = this.iframeElm_["XPC_toOuter"]["XPC_toInner"];
    this.channel_.notifyConnected_()
  }else {
    throw Error("Got unexpected transport message.");
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.incoming_ = function(serviceName, payload) {
  if(!this.recursive_ && this.queue_.length == 0) {
    this.channel_.deliver_(serviceName, payload)
  }else {
    this.queue_.push({serviceName:serviceName, payload:payload});
    if(this.queue_.length == 1) {
      this.timer_ = this.getWindow().setTimeout(this.deliverQueuedCb_, 1)
    }
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.deliverQueued_ = function() {
  while(this.queue_.length) {
    var msg = this.queue_.shift();
    this.channel_.deliver_(msg.serviceName, msg.payload)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.send = function(service, payload) {
  this.recursive_ = true;
  this.outgoing_(service, payload);
  this.recursive_ = false
};
goog.net.xpc.FrameElementMethodTransport.prototype.disposeInternal = function() {
  goog.net.xpc.FrameElementMethodTransport.superClass_.disposeInternal.call(this);
  this.outgoing_ = null;
  this.iframeElm_ = null
};
goog.provide("goog.net.xpc.IframePollingTransport");
goog.provide("goog.net.xpc.IframePollingTransport.Receiver");
goog.provide("goog.net.xpc.IframePollingTransport.Sender");
goog.require("goog.array");
goog.require("goog.dom");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframePollingTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.sendUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI];
  this.rcvUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI];
  this.sendQueue_ = []
};
goog.inherits(goog.net.xpc.IframePollingTransport, goog.net.xpc.Transport);
goog.net.xpc.IframePollingTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING;
goog.net.xpc.IframePollingTransport.prototype.sequence_ = 0;
goog.net.xpc.IframePollingTransport.prototype.waitForAck_ = false;
goog.net.xpc.IframePollingTransport.prototype.initialized_ = false;
goog.net.xpc.IframePollingTransport.IFRAME_PREFIX = "googlexpc";
goog.net.xpc.IframePollingTransport.prototype.getMsgFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_msg"
};
goog.net.xpc.IframePollingTransport.prototype.getAckFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_ack"
};
goog.net.xpc.IframePollingTransport.prototype.connect = function() {
  if(this.isDisposed()) {
    return
  }
  goog.net.xpc.logger.fine("transport connect called");
  if(!this.initialized_) {
    goog.net.xpc.logger.fine("initializing...");
    this.constructSenderFrames_();
    this.initialized_ = true
  }
  this.checkForeignFramesReady_()
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrames_ = function() {
  var name = this.getMsgFrameName_();
  this.msgIframeElm_ = this.constructSenderFrame_(name);
  this.msgWinObj_ = this.getWindow().frames[name];
  name = this.getAckFrameName_();
  this.ackIframeElm_ = this.constructSenderFrame_(name);
  this.ackWinObj_ = this.getWindow().frames[name]
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrame_ = function(id) {
  goog.net.xpc.logger.finest("constructing sender frame: " + id);
  var ifr = goog.dom.createElement("iframe");
  var s = ifr.style;
  s.position = "absolute";
  s.top = "-10px";
  s.left = "10px";
  s.width = "1px";
  s.height = "1px";
  ifr.id = ifr.name = id;
  ifr.src = this.sendUri_ + "#INITIAL";
  this.getWindow().document.body.appendChild(ifr);
  return ifr
};
goog.net.xpc.IframePollingTransport.prototype.innerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("innerPeerReconnect called");
  this.channel_.name = goog.net.xpc.getRandomString(10);
  goog.net.xpc.logger.finest("switching channels: " + this.channel_.name);
  this.deconstructSenderFrames_();
  this.initialized_ = false;
  this.reconnectFrame_ = this.constructSenderFrame_(goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_reconnect_" + this.channel_.name)
};
goog.net.xpc.IframePollingTransport.prototype.outerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("outerPeerReconnect called");
  var frames = this.channel_.peerWindowObject_.frames;
  var length = frames.length;
  for(var i = 0;i < length;i++) {
    var frameName;
    try {
      if(frames[i] && frames[i].name) {
        frameName = frames[i].name
      }
    }catch(e) {
    }
    if(!frameName) {
      continue
    }
    var message = frameName.split("_");
    if(message.length == 3 && message[0] == goog.net.xpc.IframePollingTransport.IFRAME_PREFIX && message[1] == "reconnect") {
      this.channel_.name = message[2];
      this.deconstructSenderFrames_();
      this.initialized_ = false;
      break
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.deconstructSenderFrames_ = function() {
  goog.net.xpc.logger.finest("deconstructSenderFrames called");
  if(this.msgIframeElm_) {
    this.msgIframeElm_.parentNode.removeChild(this.msgIframeElm_);
    this.msgIframeElm_ = null;
    this.msgWinObj_ = null
  }
  if(this.ackIframeElm_) {
    this.ackIframeElm_.parentNode.removeChild(this.ackIframeElm_);
    this.ackIframeElm_ = null;
    this.ackWinObj_ = null
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkForeignFramesReady_ = function() {
  if(!(this.isRcvFrameReady_(this.getMsgFrameName_()) && this.isRcvFrameReady_(this.getAckFrameName_()))) {
    goog.net.xpc.logger.finest("foreign frames not (yet) present");
    if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.INNER && !this.reconnectFrame_) {
      this.innerPeerReconnect_()
    }else {
      if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
        this.outerPeerReconnect_()
      }
    }
    this.getWindow().setTimeout(goog.bind(this.connect, this), 100)
  }else {
    goog.net.xpc.logger.fine("foreign frames present");
    this.msgReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getMsgFrameName_()], goog.bind(this.processIncomingMsg, this));
    this.ackReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getAckFrameName_()], goog.bind(this.processIncomingAck, this));
    this.checkLocalFramesPresent_()
  }
};
goog.net.xpc.IframePollingTransport.prototype.isRcvFrameReady_ = function(frameName) {
  goog.net.xpc.logger.finest("checking for receive frame: " + frameName);
  try {
    var winObj = this.channel_.peerWindowObject_.frames[frameName];
    if(!winObj || winObj.location.href.indexOf(this.rcvUri_) != 0) {
      return false
    }
  }catch(e) {
    return false
  }
  return true
};
goog.net.xpc.IframePollingTransport.prototype.checkLocalFramesPresent_ = function() {
  var frames = this.channel_.peerWindowObject_.frames;
  if(!(frames[this.getAckFrameName_()] && frames[this.getMsgFrameName_()])) {
    if(!this.checkLocalFramesPresentCb_) {
      this.checkLocalFramesPresentCb_ = goog.bind(this.checkLocalFramesPresent_, this)
    }
    this.getWindow().setTimeout(this.checkLocalFramesPresentCb_, 100);
    goog.net.xpc.logger.fine("local frames not (yet) present")
  }else {
    this.msgSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.msgWinObj_);
    this.ackSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.ackWinObj_);
    goog.net.xpc.logger.fine("local frames ready");
    this.getWindow().setTimeout(goog.bind(function() {
      this.msgSender_.send(goog.net.xpc.SETUP);
      this.sentConnectionSetup_ = true;
      this.waitForAck_ = true;
      goog.net.xpc.logger.fine("SETUP sent")
    }, this), 100)
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkIfConnected_ = function() {
  if(this.sentConnectionSetupAck_ && this.rcvdConnectionSetupAck_) {
    this.channel_.notifyConnected_();
    if(this.deliveryQueue_) {
      goog.net.xpc.logger.fine("delivering queued messages " + "(" + this.deliveryQueue_.length + ")");
      for(var i = 0, m;i < this.deliveryQueue_.length;i++) {
        m = this.deliveryQueue_[i];
        this.channel_.deliver_(m.service, m.payload)
      }
      delete this.deliveryQueue_
    }
  }else {
    goog.net.xpc.logger.finest("checking if connected: " + "ack sent:" + this.sentConnectionSetupAck_ + ", ack rcvd: " + this.rcvdConnectionSetupAck_)
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingMsg = function(raw) {
  goog.net.xpc.logger.finest("msg received: " + raw);
  if(raw == goog.net.xpc.SETUP) {
    if(!this.ackSender_) {
      return
    }
    this.ackSender_.send(goog.net.xpc.SETUP_ACK_);
    goog.net.xpc.logger.finest("SETUP_ACK sent");
    this.sentConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected() || this.sentConnectionSetupAck_) {
      var pos = raw.indexOf("|");
      var head = raw.substring(0, pos);
      var frame = raw.substring(pos + 1);
      pos = head.indexOf(",");
      if(pos == -1) {
        var seq = head;
        this.ackSender_.send("ACK:" + seq);
        this.deliverPayload_(frame)
      }else {
        var seq = head.substring(0, pos);
        this.ackSender_.send("ACK:" + seq);
        var partInfo = head.substring(pos + 1).split("/");
        var part0 = parseInt(partInfo[0], 10);
        var part1 = parseInt(partInfo[1], 10);
        if(part0 == 1) {
          this.parts_ = []
        }
        this.parts_.push(frame);
        if(part0 == part1) {
          this.deliverPayload_(this.parts_.join(""));
          delete this.parts_
        }
      }
    }else {
      goog.net.xpc.logger.warning("received msg, but channel is not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingAck = function(msgStr) {
  goog.net.xpc.logger.finest("ack received: " + msgStr);
  if(msgStr == goog.net.xpc.SETUP_ACK_) {
    this.waitForAck_ = false;
    this.rcvdConnectionSetupAck_ = true;
    this.checkIfConnected_()
  }else {
    if(this.channel_.isConnected()) {
      if(!this.waitForAck_) {
        goog.net.xpc.logger.warning("got unexpected ack");
        return
      }
      var seq = parseInt(msgStr.split(":")[1], 10);
      if(seq == this.sequence_) {
        this.waitForAck_ = false;
        this.sendNextFrame_()
      }else {
        goog.net.xpc.logger.warning("got ack with wrong sequence")
      }
    }else {
      goog.net.xpc.logger.warning("received ack, but channel not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.sendNextFrame_ = function() {
  if(this.waitForAck_ || !this.sendQueue_.length) {
    return
  }
  var s = this.sendQueue_.shift();
  ++this.sequence_;
  this.msgSender_.send(this.sequence_ + s);
  goog.net.xpc.logger.finest("msg sent: " + this.sequence_ + s);
  this.waitForAck_ = true
};
goog.net.xpc.IframePollingTransport.prototype.deliverPayload_ = function(s) {
  var pos = s.indexOf(":");
  var service = s.substr(0, pos);
  var payload = s.substring(pos + 1);
  if(!this.channel_.isConnected()) {
    (this.deliveryQueue_ || (this.deliveryQueue_ = [])).push({service:service, payload:payload});
    goog.net.xpc.logger.finest("queued delivery")
  }else {
    this.channel_.deliver_(service, payload)
  }
};
goog.net.xpc.IframePollingTransport.prototype.MAX_FRAME_LENGTH_ = 3800;
goog.net.xpc.IframePollingTransport.prototype.send = function(service, payload) {
  var frame = service + ":" + payload;
  if(!goog.userAgent.IE || payload.length <= this.MAX_FRAME_LENGTH_) {
    this.sendQueue_.push("|" + frame)
  }else {
    var l = payload.length;
    var num = Math.ceil(l / this.MAX_FRAME_LENGTH_);
    var pos = 0;
    var i = 1;
    while(pos < l) {
      this.sendQueue_.push("," + i + "/" + num + "|" + frame.substr(pos, this.MAX_FRAME_LENGTH_));
      i++;
      pos += this.MAX_FRAME_LENGTH_
    }
  }
  this.sendNextFrame_()
};
goog.net.xpc.IframePollingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  var receivers = goog.net.xpc.IframePollingTransport.receivers_;
  goog.array.remove(receivers, this.msgReceiver_);
  goog.array.remove(receivers, this.ackReceiver_);
  this.msgReceiver_ = this.ackReceiver_ = null;
  goog.dom.removeNode(this.msgIframeElm_);
  goog.dom.removeNode(this.ackIframeElm_);
  this.msgIframeElm_ = this.ackIframeElm_ = null;
  this.msgWinObj_ = this.ackWinObj_ = null
};
goog.net.xpc.IframePollingTransport.receivers_ = [];
goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ = 10;
goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_ = 100;
goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ = 1E3;
goog.net.xpc.IframePollingTransport.receive_ = function() {
  var rcvd = false;
  try {
    for(var i = 0, l = goog.net.xpc.IframePollingTransport.receivers_.length;i < l;i++) {
      rcvd = rcvd || goog.net.xpc.IframePollingTransport.receivers_[i].receive()
    }
  }catch(e) {
    goog.net.xpc.logger.info("receive_() failed: " + e);
    goog.net.xpc.IframePollingTransport.receivers_[i].transport_.channel_.notifyTransportError_();
    if(!goog.net.xpc.IframePollingTransport.receivers_.length) {
      return
    }
  }
  var now = goog.now();
  if(rcvd) {
    goog.net.xpc.IframePollingTransport.lastActivity_ = now
  }
  var t = now - goog.net.xpc.IframePollingTransport.lastActivity_ < goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ ? goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ : goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_;
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, t)
};
goog.net.xpc.IframePollingTransport.receiveCb_ = goog.bind(goog.net.xpc.IframePollingTransport.receive_, goog.net.xpc.IframePollingTransport);
goog.net.xpc.IframePollingTransport.startRcvTimer_ = function() {
  goog.net.xpc.logger.fine("starting receive-timer");
  goog.net.xpc.IframePollingTransport.lastActivity_ = goog.now();
  if(goog.net.xpc.IframePollingTransport.rcvTimer_) {
    window.clearTimeout(goog.net.xpc.IframePollingTransport.rcvTimer_)
  }
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_)
};
goog.net.xpc.IframePollingTransport.Sender = function(url, windowObj) {
  this.sendUri_ = url;
  this.sendFrame_ = windowObj;
  this.cycle_ = 0
};
goog.net.xpc.IframePollingTransport.Sender.prototype.send = function(payload) {
  this.cycle_ = ++this.cycle_ % 2;
  var url = this.sendUri_ + "#" + this.cycle_ + encodeURIComponent(payload);
  try {
    if(goog.userAgent.WEBKIT) {
      this.sendFrame_.location.href = url
    }else {
      this.sendFrame_.location.replace(url)
    }
  }catch(e) {
    goog.net.xpc.logger.severe("sending failed", e)
  }
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver = function(transport, windowObj, callback) {
  this.transport_ = transport;
  this.rcvFrame_ = windowObj;
  this.cb_ = callback;
  this.currentLoc_ = this.rcvFrame_.location.href.split("#")[0] + "#INITIAL";
  goog.net.xpc.IframePollingTransport.receivers_.push(this);
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver.prototype.receive = function() {
  var loc = this.rcvFrame_.location.href;
  if(loc != this.currentLoc_) {
    this.currentLoc_ = loc;
    var payload = loc.split("#")[1];
    if(payload) {
      payload = payload.substr(1);
      this.cb_(decodeURIComponent(payload))
    }
    return true
  }else {
    return false
  }
};
goog.provide("goog.net.xpc.IframeRelayTransport");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.IframeRelayTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerRelayUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI];
  this.peerIframeId_ = this.channel_.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.startCleanupTimer_()
  }
};
goog.inherits(goog.net.xpc.IframeRelayTransport, goog.net.xpc.Transport);
if(goog.userAgent.WEBKIT) {
  goog.net.xpc.IframeRelayTransport.iframeRefs_ = [];
  goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_ = 1E3;
  goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_ = 3E3;
  goog.net.xpc.IframeRelayTransport.cleanupTimer_ = 0;
  goog.net.xpc.IframeRelayTransport.startCleanupTimer_ = function() {
    if(!goog.net.xpc.IframeRelayTransport.cleanupTimer_) {
      goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(function() {
        goog.net.xpc.IframeRelayTransport.cleanup_()
      }, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
    }
  };
  goog.net.xpc.IframeRelayTransport.cleanup_ = function(opt_maxAge) {
    var now = goog.now();
    var maxAge = opt_maxAge || goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_;
    while(goog.net.xpc.IframeRelayTransport.iframeRefs_.length && now - goog.net.xpc.IframeRelayTransport.iframeRefs_[0].timestamp >= maxAge) {
      var ifr = goog.net.xpc.IframeRelayTransport.iframeRefs_.shift().iframeElement;
      goog.dom.removeNode(ifr);
      goog.net.xpc.logger.finest("iframe removed")
    }
    goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(goog.net.xpc.IframeRelayTransport.cleanupCb_, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
  };
  goog.net.xpc.IframeRelayTransport.cleanupCb_ = function() {
    goog.net.xpc.IframeRelayTransport.cleanup_()
  }
}
goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_ = 1800;
goog.net.xpc.IframeRelayTransport.FragmentInfo;
goog.net.xpc.IframeRelayTransport.fragmentMap_ = {};
goog.net.xpc.IframeRelayTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY;
goog.net.xpc.IframeRelayTransport.prototype.connect = function() {
  if(!this.getWindow()["xpcRelay"]) {
    this.getWindow()["xpcRelay"] = goog.net.xpc.IframeRelayTransport.receiveMessage_
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP)
};
goog.net.xpc.IframeRelayTransport.receiveMessage_ = function(channelName, frame) {
  var pos = frame.indexOf(":");
  var header = frame.substr(0, pos);
  var payload = frame.substr(pos + 1);
  if(!goog.userAgent.IE || (pos = header.indexOf("|")) == -1) {
    var service = header
  }else {
    var service = header.substr(0, pos);
    var fragmentIdStr = header.substr(pos + 1);
    pos = fragmentIdStr.indexOf("+");
    var messageIdStr = fragmentIdStr.substr(0, pos);
    var fragmentNum = parseInt(fragmentIdStr.substr(pos + 1), 10);
    var fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr];
    if(!fragmentInfo) {
      fragmentInfo = goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr] = {fragments:[], received:0, expected:0}
    }
    if(goog.string.contains(fragmentIdStr, "++")) {
      fragmentInfo.expected = fragmentNum + 1
    }
    fragmentInfo.fragments[fragmentNum] = payload;
    fragmentInfo.received++;
    if(fragmentInfo.received != fragmentInfo.expected) {
      return
    }
    payload = fragmentInfo.fragments.join("");
    delete goog.net.xpc.IframeRelayTransport.fragmentMap_[messageIdStr]
  }
  goog.net.xpc.channels_[channelName].deliver_(service, decodeURIComponent(payload))
};
goog.net.xpc.IframeRelayTransport.prototype.transportServiceHandler = function(payload) {
  if(payload == goog.net.xpc.SETUP) {
    this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
    this.channel_.notifyConnected_()
  }else {
    if(payload == goog.net.xpc.SETUP_ACK_) {
      this.channel_.notifyConnected_()
    }
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send = function(service, payload) {
  var encodedPayload = encodeURIComponent(payload);
  var encodedLen = encodedPayload.length;
  var maxSize = goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_;
  if(goog.userAgent.IE && encodedLen > maxSize) {
    var messageIdStr = goog.string.getRandomString();
    for(var startIndex = 0, fragmentNum = 0;startIndex < encodedLen;fragmentNum++) {
      var payloadFragment = encodedPayload.substr(startIndex, maxSize);
      startIndex += maxSize;
      var fragmentIdStr = messageIdStr + (startIndex >= encodedLen ? "++" : "+") + fragmentNum;
      this.send_(service, payloadFragment, fragmentIdStr)
    }
  }else {
    this.send_(service, encodedPayload)
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send_ = function(service, encodedPayload, opt_fragmentIdStr) {
  if(goog.userAgent.IE) {
    var div = this.getWindow().document.createElement("div");
    div.innerHTML = '<iframe onload="this.xpcOnload()"></iframe>';
    var ifr = div.childNodes[0];
    div = null;
    ifr["xpcOnload"] = goog.net.xpc.IframeRelayTransport.iframeLoadHandler_
  }else {
    var ifr = this.getWindow().document.createElement("iframe");
    if(goog.userAgent.WEBKIT) {
      goog.net.xpc.IframeRelayTransport.iframeRefs_.push({timestamp:goog.now(), iframeElement:ifr})
    }else {
      goog.events.listen(ifr, "load", goog.net.xpc.IframeRelayTransport.iframeLoadHandler_)
    }
  }
  var style = ifr.style;
  style.visibility = "hidden";
  style.width = ifr.style.height = "0px";
  style.position = "absolute";
  var url = this.peerRelayUri_;
  url += "#" + this.channel_.name;
  if(this.peerIframeId_) {
    url += "," + this.peerIframeId_
  }
  url += "|" + service;
  if(opt_fragmentIdStr) {
    url += "|" + opt_fragmentIdStr
  }
  url += ":" + encodedPayload;
  ifr.src = url;
  this.getWindow().document.body.appendChild(ifr);
  goog.net.xpc.logger.finest("msg sent: " + url)
};
goog.net.xpc.IframeRelayTransport.iframeLoadHandler_ = function() {
  goog.net.xpc.logger.finest("iframe-load");
  goog.dom.removeNode(this);
  this.xpcOnload = null
};
goog.net.xpc.IframeRelayTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(goog.userAgent.WEBKIT) {
    goog.net.xpc.IframeRelayTransport.cleanup_(0)
  }
};
goog.provide("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.events");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.net.xpc.NativeMessagingTransport = function(channel, peerHostname, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.peerHostname_ = peerHostname || "*"
};
goog.inherits(goog.net.xpc.NativeMessagingTransport, goog.net.xpc.Transport);
goog.net.xpc.NativeMessagingTransport.prototype.initialized_ = false;
goog.net.xpc.NativeMessagingTransport.prototype.transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING;
goog.net.xpc.NativeMessagingTransport.activeCount_ = {};
goog.net.xpc.NativeMessagingTransport.initialize_ = function(listenWindow) {
  var uid = goog.getUid(listenWindow);
  var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
  if(!goog.isNumber(value)) {
    value = 0
  }
  if(value == 0) {
    goog.events.listen(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
  }
  goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value + 1
};
goog.net.xpc.NativeMessagingTransport.messageReceived_ = function(msgEvt) {
  var data = msgEvt.getBrowserEvent().data;
  if(!goog.isString(data)) {
    return false
  }
  var headDelim = data.indexOf("|");
  var serviceDelim = data.indexOf(":");
  if(headDelim == -1 || serviceDelim == -1) {
    return false
  }
  var channelName = data.substring(0, headDelim);
  var service = data.substring(headDelim + 1, serviceDelim);
  var payload = data.substring(serviceDelim + 1);
  goog.net.xpc.logger.fine("messageReceived: channel=" + channelName + ", service=" + service + ", payload=" + payload);
  var channel = goog.net.xpc.channels_[channelName];
  if(channel) {
    channel.deliver_(service, payload, msgEvt.getBrowserEvent().origin);
    return true
  }
  for(var staleChannelName in goog.net.xpc.channels_) {
    var staleChannel = goog.net.xpc.channels_[staleChannelName];
    if(staleChannel.getRole() == goog.net.xpc.CrossPageChannelRole.INNER && !staleChannel.isConnected() && service == goog.net.xpc.TRANSPORT_SERVICE_ && payload == goog.net.xpc.SETUP) {
      goog.net.xpc.logger.fine("changing channel name to " + channelName);
      staleChannel.name = channelName;
      delete goog.net.xpc.channels_[staleChannelName];
      goog.net.xpc.channels_[channelName] = staleChannel;
      staleChannel.deliver_(service, payload);
      return true
    }
  }
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return false
};
goog.net.xpc.NativeMessagingTransport.prototype.transportServiceHandler = function(payload) {
  switch(payload) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      break;
    case goog.net.xpc.SETUP_ACK_:
      this.channel_.notifyConnected_();
      break
  }
};
goog.net.xpc.NativeMessagingTransport.prototype.connect = function() {
  goog.net.xpc.NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = true;
  this.connectWithRetries_()
};
goog.net.xpc.NativeMessagingTransport.prototype.connectWithRetries_ = function() {
  if(this.channel_.isConnected() || this.isDisposed()) {
    return
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP);
  this.getWindow().setTimeout(goog.bind(this.connectWithRetries_, this), 100)
};
goog.net.xpc.NativeMessagingTransport.prototype.send = function(service, payload) {
  var win = this.channel_.peerWindowObject_;
  if(!win) {
    goog.net.xpc.logger.fine("send(): window not ready");
    return
  }
  var obj = win.postMessage ? win : win.document;
  this.send = function(service, payload) {
    goog.net.xpc.logger.fine("send(): payload=" + payload + " to hostname=" + this.peerHostname_);
    obj.postMessage(this.channel_.name + "|" + service + ":" + payload, this.peerHostname_)
  };
  this.send(service, payload)
};
goog.net.xpc.NativeMessagingTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  if(this.initialized_) {
    var listenWindow = this.getWindow();
    var uid = goog.getUid(listenWindow);
    var value = goog.net.xpc.NativeMessagingTransport.activeCount_[uid];
    goog.net.xpc.NativeMessagingTransport.activeCount_[uid] = value - 1;
    if(value == 1) {
      goog.events.unlisten(listenWindow.postMessage ? listenWindow : listenWindow.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, false, goog.net.xpc.NativeMessagingTransport)
    }
  }
  delete this.send
};
goog.provide("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.Transport");
goog.require("goog.reflect");
goog.net.xpc.NixTransport = function(channel, opt_domHelper) {
  goog.base(this, opt_domHelper);
  this.channel_ = channel;
  this.authToken_ = channel[goog.net.xpc.CfgFields.AUTH_TOKEN] || "";
  this.remoteAuthToken_ = channel[goog.net.xpc.CfgFields.REMOTE_AUTH_TOKEN] || "";
  goog.net.xpc.NixTransport.conductGlobalSetup_(this.getWindow());
  this[goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE] = this.handleMessage_;
  this[goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL] = this.createChannel_
};
goog.inherits(goog.net.xpc.NixTransport, goog.net.xpc.Transport);
goog.net.xpc.NixTransport.NIX_WRAPPER = "GCXPC____NIXVBS_wrapper";
goog.net.xpc.NixTransport.NIX_GET_WRAPPER = "GCXPC____NIXVBS_get_wrapper";
goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE = "GCXPC____NIXJS_handle_message";
goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL = "GCXPC____NIXJS_create_channel";
goog.net.xpc.NixTransport.NIX_ID_FIELD = "GCXPC____NIXVBS_container";
goog.net.xpc.NixTransport.isNixSupported = function() {
  var isSupported = false;
  try {
    var oldOpener = window.opener;
    window.opener = {};
    isSupported = goog.reflect.canAccessProperty(window, "opener");
    window.opener = oldOpener
  }catch(e) {
  }
  return isSupported
};
goog.net.xpc.NixTransport.conductGlobalSetup_ = function(listenWindow) {
  if(listenWindow["nix_setup_complete"]) {
    return
  }
  var vbscript = "Class " + goog.net.xpc.NixTransport.NIX_WRAPPER + "\n " + "Private m_Transport\n" + "Private m_Auth\n" + "Public Sub SetTransport(transport)\n" + "If isEmpty(m_Transport) Then\n" + "Set m_Transport = transport\n" + "End If\n" + "End Sub\n" + "Public Sub SetAuth(auth)\n" + "If isEmpty(m_Auth) Then\n" + "m_Auth = auth\n" + "End If\n" + "End Sub\n" + "Public Function GetAuthToken()\n " + "GetAuthToken = m_Auth\n" + "End Function\n" + "Public Sub SendMessage(service, payload)\n " + 
  "Call m_Transport." + goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE + "(service, payload)\n" + "End Sub\n" + "Public Sub CreateChannel(channel)\n " + "Call m_Transport." + goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL + "(channel)\n" + "End Sub\n" + "Public Sub " + goog.net.xpc.NixTransport.NIX_ID_FIELD + "()\n " + "End Sub\n" + "End Class\n " + "Function " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + "(transport, auth)\n" + "Dim wrap\n" + "Set wrap = New " + goog.net.xpc.NixTransport.NIX_WRAPPER + 
  "\n" + "wrap.SetTransport transport\n" + "wrap.SetAuth auth\n" + "Set " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + " = wrap\n" + "End Function";
  try {
    listenWindow.execScript(vbscript, "vbscript");
    listenWindow["nix_setup_complete"] = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting global setup: " + e)
  }
};
goog.net.xpc.NixTransport.prototype.transportType = goog.net.xpc.TransportTypes.NIX;
goog.net.xpc.NixTransport.prototype.localSetupCompleted_ = false;
goog.net.xpc.NixTransport.prototype.nixChannel_ = null;
goog.net.xpc.NixTransport.prototype.connect = function() {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannelRole.OUTER) {
    this.attemptOuterSetup_()
  }else {
    this.attemptInnerSetup_()
  }
};
goog.net.xpc.NixTransport.prototype.attemptOuterSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  var innerFrame = this.channel_.iframeElement_;
  try {
    innerFrame.contentWindow.opener = this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_);
    this.localSetupCompleted_ = true
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e)
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptOuterSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.attemptInnerSetup_ = function() {
  if(this.localSetupCompleted_) {
    return
  }
  try {
    var opener = this.getWindow().opener;
    if(opener && goog.net.xpc.NixTransport.NIX_ID_FIELD in opener) {
      this.nixChannel_ = opener;
      var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
      if(remoteAuthToken != this.remoteAuthToken_) {
        goog.net.xpc.logger.severe("Invalid auth token from other party");
        return
      }
      this.nixChannel_["CreateChannel"](this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_));
      this.localSetupCompleted_ = true;
      this.channel_.notifyConnected_()
    }
  }catch(e) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + e);
    return
  }
  if(!this.localSetupCompleted_) {
    this.getWindow().setTimeout(goog.bind(this.attemptInnerSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.createChannel_ = function(channel) {
  if(typeof channel != "unknown" || !(goog.net.xpc.NixTransport.NIX_ID_FIELD in channel)) {
    goog.net.xpc.logger.severe("Invalid NIX channel given to createChannel_")
  }
  this.nixChannel_ = channel;
  var remoteAuthToken = this.nixChannel_["GetAuthToken"]();
  if(remoteAuthToken != this.remoteAuthToken_) {
    goog.net.xpc.logger.severe("Invalid auth token from other party");
    return
  }
  this.channel_.notifyConnected_()
};
goog.net.xpc.NixTransport.prototype.handleMessage_ = function(serviceName, payload) {
  function deliveryHandler() {
    this.channel_.deliver_(serviceName, payload)
  }
  this.getWindow().setTimeout(goog.bind(deliveryHandler, this), 1)
};
goog.net.xpc.NixTransport.prototype.send = function(service, payload) {
  if(typeof this.nixChannel_ !== "unknown") {
    goog.net.xpc.logger.severe("NIX channel not connected")
  }
  this.nixChannel_["SendMessage"](service, payload)
};
goog.net.xpc.NixTransport.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.nixChannel_ = null
};
goog.provide("goog.net.xpc.CrossPageChannel");
goog.require("goog.Disposable");
goog.require("goog.Uri");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.json");
goog.require("goog.messaging.AbstractChannel");
goog.require("goog.net.xpc");
goog.require("goog.net.xpc.CrossPageChannelRole");
goog.require("goog.net.xpc.FrameElementMethodTransport");
goog.require("goog.net.xpc.IframePollingTransport");
goog.require("goog.net.xpc.IframeRelayTransport");
goog.require("goog.net.xpc.NativeMessagingTransport");
goog.require("goog.net.xpc.NixTransport");
goog.require("goog.net.xpc.Transport");
goog.require("goog.userAgent");
goog.net.xpc.CrossPageChannel = function(cfg, opt_domHelper) {
  goog.base(this);
  for(var i = 0, uriField;uriField = goog.net.xpc.UriCfgFields[i];i++) {
    if(uriField in cfg && !/^https?:\/\//.test(cfg[uriField])) {
      throw Error("URI " + cfg[uriField] + " is invalid for field " + uriField);
    }
  }
  this.cfg_ = cfg;
  this.name = this.cfg_[goog.net.xpc.CfgFields.CHANNEL_NAME] || goog.net.xpc.getRandomString(10);
  this.domHelper_ = opt_domHelper || goog.dom.getDomHelper();
  this.deferredDeliveries_ = [];
  cfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = cfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] || goog.uri.utils.getHost(this.domHelper_.getWindow().location.href) + "/robots.txt";
  cfg[goog.net.xpc.CfgFields.PEER_POLL_URI] = cfg[goog.net.xpc.CfgFields.PEER_POLL_URI] || goog.uri.utils.getHost(cfg[goog.net.xpc.CfgFields.PEER_URI] || "") + "/robots.txt";
  goog.net.xpc.channels_[this.name] = this;
  goog.events.listen(window, "unload", goog.net.xpc.CrossPageChannel.disposeAll_);
  goog.net.xpc.logger.info("CrossPageChannel created: " + this.name)
};
goog.inherits(goog.net.xpc.CrossPageChannel, goog.messaging.AbstractChannel);
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_ = new RegExp("^%*" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_ = new RegExp("^%+" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.prototype.transport_ = null;
goog.net.xpc.CrossPageChannel.prototype.state_ = goog.net.xpc.ChannelStates.NOT_CONNECTED;
goog.net.xpc.CrossPageChannel.prototype.isConnected = function() {
  return this.state_ == goog.net.xpc.ChannelStates.CONNECTED
};
goog.net.xpc.CrossPageChannel.prototype.peerWindowObject_ = null;
goog.net.xpc.CrossPageChannel.prototype.iframeElement_ = null;
goog.net.xpc.CrossPageChannel.prototype.setPeerWindowObject = function(peerWindowObject) {
  this.peerWindowObject_ = peerWindowObject
};
goog.net.xpc.CrossPageChannel.prototype.determineTransportType_ = function() {
  var transportType;
  if(goog.isFunction(document.postMessage) || goog.isFunction(window.postMessage) || goog.userAgent.IE && window.postMessage) {
    transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING
  }else {
    if(goog.userAgent.GECKO) {
      transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD
    }else {
      if(goog.userAgent.IE && this.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI]) {
        transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY
      }else {
        if(goog.userAgent.IE && goog.net.xpc.NixTransport.isNixSupported()) {
          transportType = goog.net.xpc.TransportTypes.NIX
        }else {
          transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING
        }
      }
    }
  }
  return transportType
};
goog.net.xpc.CrossPageChannel.prototype.createTransport_ = function() {
  if(this.transport_) {
    return
  }
  if(!this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] = this.determineTransportType_()
  }
  switch(this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
    case goog.net.xpc.TransportTypes.NATIVE_MESSAGING:
      this.transport_ = new goog.net.xpc.NativeMessagingTransport(this, this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME], this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.NIX:
      this.transport_ = new goog.net.xpc.NixTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD:
      this.transport_ = new goog.net.xpc.FrameElementMethodTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_RELAY:
      this.transport_ = new goog.net.xpc.IframeRelayTransport(this, this.domHelper_);
      break;
    case goog.net.xpc.TransportTypes.IFRAME_POLLING:
      this.transport_ = new goog.net.xpc.IframePollingTransport(this, this.domHelper_);
      break
  }
  if(this.transport_) {
    goog.net.xpc.logger.info("Transport created: " + this.transport_.getName())
  }else {
    throw Error("CrossPageChannel: No suitable transport found!");
  }
};
goog.net.xpc.CrossPageChannel.prototype.getTransportType = function() {
  return this.transport_.getType()
};
goog.net.xpc.CrossPageChannel.prototype.getTransportName = function() {
  return this.transport_.getName()
};
goog.net.xpc.CrossPageChannel.prototype.getPeerConfiguration = function() {
  var peerCfg = {};
  peerCfg[goog.net.xpc.CfgFields.CHANNEL_NAME] = this.name;
  peerCfg[goog.net.xpc.CfgFields.TRANSPORT] = this.cfg_[goog.net.xpc.CfgFields.TRANSPORT];
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_RELAY_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]
  }
  if(this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]
  }
  return peerCfg
};
goog.net.xpc.CrossPageChannel.prototype.createPeerIframe = function(parentElm, opt_configureIframeCb, opt_addCfgParam) {
  var iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  if(!iframeId) {
    iframeId = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID] = "xpcpeer" + goog.net.xpc.getRandomString(4)
  }
  var iframeElm = goog.dom.createElement("IFRAME");
  iframeElm.id = iframeElm.name = iframeId;
  if(opt_configureIframeCb) {
    opt_configureIframeCb(iframeElm)
  }else {
    iframeElm.style.width = iframeElm.style.height = "100%"
  }
  var peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI];
  if(goog.isString(peerUri)) {
    peerUri = this.cfg_[goog.net.xpc.CfgFields.PEER_URI] = new goog.Uri(peerUri)
  }
  if(opt_addCfgParam !== false) {
    peerUri.setParameterValue("xpc", goog.json.serialize(this.getPeerConfiguration()))
  }
  if(goog.userAgent.GECKO || goog.userAgent.WEBKIT) {
    this.deferConnect_ = true;
    window.setTimeout(goog.bind(function() {
      this.deferConnect_ = false;
      parentElm.appendChild(iframeElm);
      iframeElm.src = peerUri.toString();
      goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")");
      if(this.connectDeferred_) {
        this.connect(this.connectCb_)
      }
    }, this), 1)
  }else {
    iframeElm.src = peerUri.toString();
    parentElm.appendChild(iframeElm);
    goog.net.xpc.logger.info("peer iframe created (" + iframeId + ")")
  }
  return iframeElm
};
goog.net.xpc.CrossPageChannel.prototype.deferConnect_ = false;
goog.net.xpc.CrossPageChannel.prototype.connectDeferred_ = false;
goog.net.xpc.CrossPageChannel.prototype.connect = function(opt_connectCb) {
  this.connectCb_ = opt_connectCb || goog.nullFunction;
  if(this.deferConnect_) {
    goog.net.xpc.logger.info("connect() deferred");
    this.connectDeferred_ = true;
    return
  }
  this.connectDeferred_ = false;
  goog.net.xpc.logger.info("connect()");
  if(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]) {
    this.iframeElement_ = this.domHelper_.getElement(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID])
  }
  if(this.iframeElement_) {
    var winObj = this.iframeElement_.contentWindow;
    if(!winObj) {
      winObj = window.frames[this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]]
    }
    this.setPeerWindowObject(winObj)
  }
  if(!this.peerWindowObject_) {
    if(window == top) {
      throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
    }else {
      this.setPeerWindowObject(window.parent)
    }
  }
  this.createTransport_();
  this.transport_.connect();
  while(this.deferredDeliveries_.length > 0) {
    this.deferredDeliveries_.shift()()
  }
};
goog.net.xpc.CrossPageChannel.prototype.close = function() {
  if(!this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CLOSED;
  this.transport_.dispose();
  this.transport_ = null;
  this.connectCb_ = null;
  this.connectDeferred_ = false;
  this.deferredDeliveries_.length = 0;
  goog.net.xpc.logger.info('Channel "' + this.name + '" closed')
};
goog.net.xpc.CrossPageChannel.prototype.notifyConnected_ = function() {
  if(this.isConnected()) {
    return
  }
  this.state_ = goog.net.xpc.ChannelStates.CONNECTED;
  goog.net.xpc.logger.info('Channel "' + this.name + '" connected');
  this.connectCb_()
};
goog.net.xpc.CrossPageChannel.prototype.notifyTransportError_ = function() {
  goog.net.xpc.logger.info("Transport Error");
  this.close()
};
goog.net.xpc.CrossPageChannel.prototype.send = function(serviceName, payload) {
  if(!this.isConnected()) {
    goog.net.xpc.logger.severe("Can't send. Channel not connected.");
    return
  }
  if(Boolean(this.peerWindowObject_.closed)) {
    goog.net.xpc.logger.severe("Peer has disappeared.");
    this.close();
    return
  }
  if(goog.isObject(payload)) {
    payload = goog.json.serialize(payload)
  }
  this.transport_.send(this.escapeServiceName_(serviceName), payload)
};
goog.net.xpc.CrossPageChannel.prototype.deliver_ = function(serviceName, payload, opt_origin) {
  if(this.connectDeferred_) {
    this.deferredDeliveries_.push(goog.bind(this.deliver_, this, serviceName, payload, opt_origin));
    return
  }
  if(!this.isMessageOriginAcceptable_(opt_origin)) {
    goog.net.xpc.logger.warning('Message received from unapproved origin "' + opt_origin + '" - rejected.');
    return
  }
  if(this.isDisposed()) {
    goog.net.xpc.logger.warning("CrossPageChannel::deliver_(): Disposed.")
  }else {
    if(!serviceName || serviceName == goog.net.xpc.TRANSPORT_SERVICE_) {
      this.transport_.transportServiceHandler(payload)
    }else {
      if(this.isConnected()) {
        this.deliver(this.unescapeServiceName_(serviceName), payload)
      }else {
        goog.net.xpc.logger.info("CrossPageChannel::deliver_(): Not connected.")
      }
    }
  }
};
goog.net.xpc.CrossPageChannel.prototype.escapeServiceName_ = function(name) {
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_.test(name)) {
    name = "%" + name
  }
  return name.replace(/[%:|]/g, encodeURIComponent)
};
goog.net.xpc.CrossPageChannel.prototype.unescapeServiceName_ = function(name) {
  name = name.replace(/%[0-9a-f]{2}/gi, decodeURIComponent);
  if(goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_.test(name)) {
    return name.substring(1)
  }else {
    return name
  }
};
goog.net.xpc.CrossPageChannel.prototype.getRole = function() {
  return window.parent == this.peerWindowObject_ ? goog.net.xpc.CrossPageChannelRole.INNER : goog.net.xpc.CrossPageChannelRole.OUTER
};
goog.net.xpc.CrossPageChannel.prototype.isMessageOriginAcceptable_ = function(opt_origin) {
  var peerHostname = this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME];
  return goog.string.isEmptySafe(opt_origin) || goog.string.isEmptySafe(peerHostname) || opt_origin == this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME]
};
goog.net.xpc.CrossPageChannel.prototype.disposeInternal = function() {
  goog.base(this, "disposeInternal");
  this.close();
  this.peerWindowObject_ = null;
  this.iframeElement_ = null;
  delete goog.net.xpc.channels_[this.name];
  this.deferredDeliveries_.length = 0
};
goog.net.xpc.CrossPageChannel.disposeAll_ = function() {
  for(var name in goog.net.xpc.channels_) {
    var ch = goog.net.xpc.channels_[name];
    if(ch) {
      ch.dispose()
    }
  }
};
goog.provide("goog.net.EventType");
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.provide("goog.Timer");
goog.require("goog.events.EventTarget");
goog.Timer = function(opt_interval, opt_timerObject) {
  goog.events.EventTarget.call(this);
  this.interval_ = opt_interval || 1;
  this.timerObject_ = opt_timerObject || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = false;
goog.Timer.defaultTimerObject = goog.global["window"];
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function(interval) {
  this.interval_ = interval;
  if(this.timer_ && this.enabled) {
    this.stop();
    this.start()
  }else {
    if(this.timer_) {
      this.stop()
    }
  }
};
goog.Timer.prototype.tick_ = function() {
  if(this.enabled) {
    var elapsed = goog.now() - this.last_;
    if(elapsed > 0 && elapsed < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - elapsed);
      return
    }
    this.dispatchTick();
    if(this.enabled) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
      this.last_ = goog.now()
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
  this.enabled = true;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_);
    this.last_ = goog.now()
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = false;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_);
    this.timer_ = null
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(listener, opt_delay, opt_handler) {
  if(goog.isFunction(listener)) {
    if(opt_handler) {
      listener = goog.bind(listener, opt_handler)
    }
  }else {
    if(listener && typeof listener.handleEvent == "function") {
      listener = goog.bind(listener.handleEvent, listener)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  if(opt_delay > goog.Timer.MAX_TIMEOUT_) {
    return-1
  }else {
    return goog.Timer.defaultTimerObject.setTimeout(listener, opt_delay || 0)
  }
};
goog.Timer.clear = function(timerId) {
  goog.Timer.defaultTimerObject.clearTimeout(timerId)
};
goog.provide("goog.net.ErrorCode");
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};
goog.provide("goog.net.HttpStatus");
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, QUIRK_IE_NO_CONTENT:1223};
goog.provide("goog.net.XmlHttpFactory");
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
goog.provide("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.WrapperXmlHttpFactory = function(xhrFactory, optionsFactory) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = xhrFactory;
  this.optionsFactory_ = optionsFactory
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_()
};
goog.provide("goog.net.DefaultXmlHttpFactory");
goog.provide("goog.net.XmlHttp");
goog.provide("goog.net.XmlHttp.OptionType");
goog.provide("goog.net.XmlHttp.ReadyState");
goog.require("goog.net.WrapperXmlHttpFactory");
goog.require("goog.net.XmlHttpFactory");
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.factory_;
goog.net.XmlHttp.setFactory = function(factory, optionsFactory) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(factory, optionsFactory))
};
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  goog.net.XmlHttp.factory_ = factory
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var progId = this.getProgId_();
  if(progId) {
    return new ActiveXObject(progId)
  }else {
    return new XMLHttpRequest
  }
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var progId = this.getProgId_();
  var options = {};
  if(progId) {
    options[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = true;
    options[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = true
  }
  return options
};
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_ = null;
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if(!this.ieProgId_ && typeof XMLHttpRequest == "undefined" && typeof ActiveXObject != "undefined") {
    var ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    for(var i = 0;i < ACTIVE_X_IDENTS.length;i++) {
      var candidate = ACTIVE_X_IDENTS[i];
      try {
        new ActiveXObject(candidate);
        this.ieProgId_ = candidate;
        return candidate
      }catch(e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled," + " or MSXML might not be installed");
  }
  return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.provide("goog.net.xhrMonitor");
goog.require("goog.array");
goog.require("goog.debug.Logger");
goog.require("goog.userAgent");
goog.net.XhrMonitor_ = function() {
  if(!goog.userAgent.GECKO) {
    return
  }
  this.contextsToXhr_ = {};
  this.xhrToContexts_ = {};
  this.stack_ = []
};
goog.net.XhrMonitor_.getKey = function(obj) {
  return goog.isString(obj) ? obj : goog.isObject(obj) ? goog.getUid(obj) : ""
};
goog.net.XhrMonitor_.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.xhrMonitor");
goog.net.XhrMonitor_.prototype.enabled_ = goog.userAgent.GECKO;
goog.net.XhrMonitor_.prototype.setEnabled = function(val) {
  this.enabled_ = goog.userAgent.GECKO && val
};
goog.net.XhrMonitor_.prototype.pushContext = function(context) {
  if(!this.enabled_) {
    return
  }
  var key = goog.net.XhrMonitor_.getKey(context);
  this.logger_.finest("Pushing context: " + context + " (" + key + ")");
  this.stack_.push(key)
};
goog.net.XhrMonitor_.prototype.popContext = function() {
  if(!this.enabled_) {
    return
  }
  var context = this.stack_.pop();
  this.logger_.finest("Popping context: " + context);
  this.updateDependentContexts_(context)
};
goog.net.XhrMonitor_.prototype.isContextSafe = function(context) {
  if(!this.enabled_) {
    return true
  }
  var deps = this.contextsToXhr_[goog.net.XhrMonitor_.getKey(context)];
  this.logger_.fine("Context is safe : " + context + " - " + deps);
  return!deps
};
goog.net.XhrMonitor_.prototype.markXhrOpen = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Opening XHR : " + uid);
  for(var i = 0;i < this.stack_.length;i++) {
    var context = this.stack_[i];
    this.addToMap_(this.contextsToXhr_, context, uid);
    this.addToMap_(this.xhrToContexts_, uid, context)
  }
};
goog.net.XhrMonitor_.prototype.markXhrClosed = function(xhr) {
  if(!this.enabled_) {
    return
  }
  var uid = goog.getUid(xhr);
  this.logger_.fine("Closing XHR : " + uid);
  delete this.xhrToContexts_[uid];
  for(var context in this.contextsToXhr_) {
    goog.array.remove(this.contextsToXhr_[context], uid);
    if(this.contextsToXhr_[context].length == 0) {
      delete this.contextsToXhr_[context]
    }
  }
};
goog.net.XhrMonitor_.prototype.updateDependentContexts_ = function(xhrUid) {
  var contexts = this.xhrToContexts_[xhrUid];
  var xhrs = this.contextsToXhr_[xhrUid];
  if(contexts && xhrs) {
    this.logger_.finest("Updating dependent contexts");
    goog.array.forEach(contexts, function(context) {
      goog.array.forEach(xhrs, function(xhr) {
        this.addToMap_(this.contextsToXhr_, context, xhr);
        this.addToMap_(this.xhrToContexts_, xhr, context)
      }, this)
    }, this)
  }
};
goog.net.XhrMonitor_.prototype.addToMap_ = function(map, key, value) {
  if(!map[key]) {
    map[key] = []
  }
  if(!goog.array.contains(map[key], value)) {
    map[key].push(value)
  }
};
goog.net.xhrMonitor = new goog.net.XhrMonitor_;
goog.provide("goog.net.XhrIo");
goog.provide("goog.net.XhrIo.ResponseType");
goog.require("goog.Timer");
goog.require("goog.debug.Logger");
goog.require("goog.debug.entryPointRegistry");
goog.require("goog.debug.errorHandlerWeakDep");
goog.require("goog.events.EventTarget");
goog.require("goog.json");
goog.require("goog.net.ErrorCode");
goog.require("goog.net.EventType");
goog.require("goog.net.HttpStatus");
goog.require("goog.net.XmlHttp");
goog.require("goog.net.xhrMonitor");
goog.require("goog.object");
goog.require("goog.structs");
goog.require("goog.structs.Map");
goog.require("goog.uri.utils");
goog.net.XhrIo = function(opt_xmlHttpFactory) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = opt_xmlHttpFactory || null
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?:?$/i;
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval) {
  var x = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(x);
  if(opt_callback) {
    goog.events.listen(x, goog.net.EventType.COMPLETE, opt_callback)
  }
  goog.events.listen(x, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, x));
  if(opt_timeoutInterval) {
    x.setTimeoutInterval(opt_timeoutInterval)
  }
  x.send(url, opt_method, opt_content, opt_headers)
};
goog.net.XhrIo.cleanup = function() {
  var instances = goog.net.XhrIo.sendInstances_;
  while(instances.length) {
    instances.pop().dispose()
  }
};
goog.net.XhrIo.protectEntryPoints = function(errorHandler) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.cleanupSend_ = function(XhrIo) {
  XhrIo.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, XhrIo)
};
goog.net.XhrIo.prototype.active_ = false;
goog.net.XhrIo.prototype.xhr_ = null;
goog.net.XhrIo.prototype.xhrOptions_ = null;
goog.net.XhrIo.prototype.lastUri_ = "";
goog.net.XhrIo.prototype.lastMethod_ = "";
goog.net.XhrIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
goog.net.XhrIo.prototype.lastError_ = "";
goog.net.XhrIo.prototype.errorDispatched_ = false;
goog.net.XhrIo.prototype.inSend_ = false;
goog.net.XhrIo.prototype.inOpen_ = false;
goog.net.XhrIo.prototype.inAbort_ = false;
goog.net.XhrIo.prototype.timeoutInterval_ = 0;
goog.net.XhrIo.prototype.timeoutId_ = null;
goog.net.XhrIo.prototype.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
goog.net.XhrIo.prototype.withCredentials_ = false;
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms)
};
goog.net.XhrIo.prototype.setResponseType = function(type) {
  this.responseType_ = type
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function(withCredentials) {
  this.withCredentials_ = withCredentials
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_
};
goog.net.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
  if(this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  var method = opt_method ? opt_method.toUpperCase() : "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = method;
  this.errorDispatched_ = false;
  this.active_ = true;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  goog.net.xhrMonitor.markXhrOpen(this.xhr_);
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr"));
    this.inOpen_ = true;
    this.xhr_.open(method, url, true);
    this.inOpen_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return
  }
  var content = opt_content || "";
  var headers = this.headers.clone();
  if(opt_headers) {
    goog.structs.forEach(opt_headers, function(value, key) {
      headers.set(key, value)
    })
  }
  if(method == "POST" && !headers.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER)) {
    headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE)
  }
  goog.structs.forEach(headers, function(value, key) {
    this.xhr_.setRequestHeader(key, value)
  }, this);
  if(this.responseType_) {
    this.xhr_.responseType = this.responseType_
  }
  if(goog.object.containsKey(this.xhr_, "withCredentials")) {
    this.xhr_.withCredentials = this.withCredentials_
  }
  try {
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(this.timeoutInterval_ > 0) {
      this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete"));
      this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)
    }
    this.logger_.fine(this.formatMsg_("Sending request"));
    this.inSend_ = true;
    this.xhr_.send(content);
    this.inSend_ = false
  }catch(err) {
    this.logger_.fine(this.formatMsg_("Send error: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err)
  }
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp()
};
goog.net.XhrIo.prototype.dispatchEvent = function(e) {
  if(this.xhr_) {
    goog.net.xhrMonitor.pushContext(this.xhr_);
    try {
      return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
    }finally {
      goog.net.xhrMonitor.popContext()
    }
  }else {
    return goog.net.XhrIo.superClass_.dispatchEvent.call(this, e)
  }
};
goog.net.XhrIo.prototype.timeout_ = function() {
  if(typeof goog == "undefined") {
  }else {
    if(this.xhr_) {
      this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting";
      this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT;
      this.logger_.fine(this.formatMsg_(this.lastError_));
      this.dispatchEvent(goog.net.EventType.TIMEOUT);
      this.abort(goog.net.ErrorCode.TIMEOUT)
    }
  }
};
goog.net.XhrIo.prototype.error_ = function(errorCode, err) {
  this.active_ = false;
  if(this.xhr_) {
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false
  }
  this.lastError_ = err;
  this.lastErrorCode_ = errorCode;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  if(!this.errorDispatched_) {
    this.errorDispatched_ = true;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ERROR)
  }
};
goog.net.XhrIo.prototype.abort = function(opt_failureCode) {
  if(this.xhr_ && this.active_) {
    this.logger_.fine(this.formatMsg_("Aborting"));
    this.active_ = false;
    this.inAbort_ = true;
    this.xhr_.abort();
    this.inAbort_ = false;
    this.lastErrorCode_ = opt_failureCode || goog.net.ErrorCode.ABORT;
    this.dispatchEvent(goog.net.EventType.COMPLETE);
    this.dispatchEvent(goog.net.EventType.ABORT);
    this.cleanUpXhr_()
  }
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  if(this.xhr_) {
    if(this.active_) {
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false
    }
    this.cleanUpXhr_(true)
  }
  goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if(!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
    this.onReadyStateChangeEntryPoint_()
  }else {
    this.onReadyStateChangeHelper_()
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if(!this.active_) {
    return
  }
  if(typeof goog == "undefined") {
  }else {
    if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && this.getStatus() == 2) {
      this.logger_.fine(this.formatMsg_("Local request error detected and ignored"))
    }else {
      if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0);
        return
      }
      this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE);
      if(this.isComplete()) {
        this.logger_.fine(this.formatMsg_("Request complete"));
        this.active_ = false;
        if(this.isSuccess()) {
          this.dispatchEvent(goog.net.EventType.COMPLETE);
          this.dispatchEvent(goog.net.EventType.SUCCESS)
        }else {
          this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR;
          this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]";
          this.dispatchErrors_()
        }
        this.cleanUpXhr_()
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(opt_fromDispose) {
  if(this.xhr_) {
    var xhr = this.xhr_;
    var clearedOnReadyStateChange = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhr_ = null;
    this.xhrOptions_ = null;
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_);
      this.timeoutId_ = null
    }
    if(!opt_fromDispose) {
      goog.net.xhrMonitor.pushContext(xhr);
      this.dispatchEvent(goog.net.EventType.READY);
      goog.net.xhrMonitor.popContext()
    }
    goog.net.xhrMonitor.markXhrClosed(xhr);
    try {
      xhr.onreadystatechange = clearedOnReadyStateChange
    }catch(e) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
};
goog.net.XhrIo.prototype.isActive = function() {
  return!!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function() {
  switch(this.getStatus()) {
    case 0:
      return!this.isLastUriEffectiveSchemeHttp_();
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.CREATED:
    ;
    case goog.net.HttpStatus.ACCEPTED:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
    ;
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return true;
    default:
      return false
  }
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var lastUriScheme = goog.isString(this.lastUri_) ? goog.uri.utils.getScheme(this.lastUri_) : this.lastUri_.getScheme();
  if(lastUriScheme) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(lastUriScheme)
  }
  if(self.location) {
    return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(self.location.protocol)
  }else {
    return true
  }
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch(e) {
    this.logger_.warning("Can not get status: " + e.message);
    return-1
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch(e) {
    this.logger_.fine("Can not get status: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return String(this.lastUri_)
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : ""
  }catch(e) {
    this.logger_.fine("Can not get responseText: " + e.message);
    return""
  }
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null
  }catch(e) {
    this.logger_.fine("Can not get responseXML: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(opt_xssiPrefix) {
  if(!this.xhr_) {
    return undefined
  }
  var responseText = this.xhr_.responseText;
  if(opt_xssiPrefix && responseText.indexOf(opt_xssiPrefix) == 0) {
    responseText = responseText.substring(opt_xssiPrefix.length)
  }
  return goog.json.parse(responseText)
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    if(!this.xhr_) {
      return null
    }
    if("response" in this.xhr_) {
      return this.xhr_.response
    }
    switch(this.responseType_) {
      case goog.net.XhrIo.ResponseType.DEFAULT:
      ;
      case goog.net.XhrIo.ResponseType.TEXT:
        return this.xhr_.responseText;
      case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
        if("mozResponseArrayBuffer" in this.xhr_) {
          return this.xhr_.mozResponseArrayBuffer
        }
    }
    this.logger_.severe("Response type " + this.responseType_ + " is not " + "supported on this browser");
    return null
  }catch(e) {
    this.logger_.fine("Can not get response: " + e.message);
    return null
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(key) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(key) : undefined
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_)
};
goog.net.XhrIo.prototype.formatMsg_ = function(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
goog.provide("clojure.browser.net");
goog.require("cljs.core");
goog.require("goog.json");
goog.require("goog.net.xpc.CrossPageChannel");
goog.require("goog.net.xpc.CfgFields");
goog.require("goog.net.EventType");
goog.require("goog.net.XhrIo");
goog.require("clojure.browser.event");
clojure.browser.net._STAR_timeout_STAR_ = 1E4;
clojure.browser.net.event_types = cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10232) {
  var vec__10233__10234 = p__10232;
  var k__10235 = cljs.core.nth.call(null, vec__10233__10234, 0, null);
  var v__10236 = cljs.core.nth.call(null, vec__10233__10234, 1, null);
  return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10235.toLowerCase()), v__10236], true)
}, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = function() {
  var connect = null;
  var connect__1 = function(this$) {
    if(function() {
      var and__3822__auto____10253 = this$;
      if(and__3822__auto____10253) {
        return this$.clojure$browser$net$IConnection$connect$arity$1
      }else {
        return and__3822__auto____10253
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$1(this$)
    }else {
      var x__2363__auto____10254 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10255 = clojure.browser.net.connect[goog.typeOf(x__2363__auto____10254)];
        if(or__3824__auto____10255) {
          return or__3824__auto____10255
        }else {
          var or__3824__auto____10256 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10256) {
            return or__3824__auto____10256
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var connect__2 = function(this$, opt1) {
    if(function() {
      var and__3822__auto____10257 = this$;
      if(and__3822__auto____10257) {
        return this$.clojure$browser$net$IConnection$connect$arity$2
      }else {
        return and__3822__auto____10257
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$2(this$, opt1)
    }else {
      var x__2363__auto____10258 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10259 = clojure.browser.net.connect[goog.typeOf(x__2363__auto____10258)];
        if(or__3824__auto____10259) {
          return or__3824__auto____10259
        }else {
          var or__3824__auto____10260 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10260) {
            return or__3824__auto____10260
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1)
    }
  };
  var connect__3 = function(this$, opt1, opt2) {
    if(function() {
      var and__3822__auto____10261 = this$;
      if(and__3822__auto____10261) {
        return this$.clojure$browser$net$IConnection$connect$arity$3
      }else {
        return and__3822__auto____10261
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$3(this$, opt1, opt2)
    }else {
      var x__2363__auto____10262 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10263 = clojure.browser.net.connect[goog.typeOf(x__2363__auto____10262)];
        if(or__3824__auto____10263) {
          return or__3824__auto____10263
        }else {
          var or__3824__auto____10264 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10264) {
            return or__3824__auto____10264
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2)
    }
  };
  var connect__4 = function(this$, opt1, opt2, opt3) {
    if(function() {
      var and__3822__auto____10265 = this$;
      if(and__3822__auto____10265) {
        return this$.clojure$browser$net$IConnection$connect$arity$4
      }else {
        return and__3822__auto____10265
      }
    }()) {
      return this$.clojure$browser$net$IConnection$connect$arity$4(this$, opt1, opt2, opt3)
    }else {
      var x__2363__auto____10266 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10267 = clojure.browser.net.connect[goog.typeOf(x__2363__auto____10266)];
        if(or__3824__auto____10267) {
          return or__3824__auto____10267
        }else {
          var or__3824__auto____10268 = clojure.browser.net.connect["_"];
          if(or__3824__auto____10268) {
            return or__3824__auto____10268
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", this$);
          }
        }
      }().call(null, this$, opt1, opt2, opt3)
    }
  };
  connect = function(this$, opt1, opt2, opt3) {
    switch(arguments.length) {
      case 1:
        return connect__1.call(this, this$);
      case 2:
        return connect__2.call(this, this$, opt1);
      case 3:
        return connect__3.call(this, this$, opt1, opt2);
      case 4:
        return connect__4.call(this, this$, opt1, opt2, opt3)
    }
    throw"Invalid arity: " + arguments.length;
  };
  connect.cljs$lang$arity$1 = connect__1;
  connect.cljs$lang$arity$2 = connect__2;
  connect.cljs$lang$arity$3 = connect__3;
  connect.cljs$lang$arity$4 = connect__4;
  return connect
}();
clojure.browser.net.transmit = function() {
  var transmit = null;
  var transmit__2 = function(this$, opt) {
    if(function() {
      var and__3822__auto____10289 = this$;
      if(and__3822__auto____10289) {
        return this$.clojure$browser$net$IConnection$transmit$arity$2
      }else {
        return and__3822__auto____10289
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$2(this$, opt)
    }else {
      var x__2363__auto____10290 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10291 = clojure.browser.net.transmit[goog.typeOf(x__2363__auto____10290)];
        if(or__3824__auto____10291) {
          return or__3824__auto____10291
        }else {
          var or__3824__auto____10292 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10292) {
            return or__3824__auto____10292
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt)
    }
  };
  var transmit__3 = function(this$, opt, opt2) {
    if(function() {
      var and__3822__auto____10293 = this$;
      if(and__3822__auto____10293) {
        return this$.clojure$browser$net$IConnection$transmit$arity$3
      }else {
        return and__3822__auto____10293
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$3(this$, opt, opt2)
    }else {
      var x__2363__auto____10294 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10295 = clojure.browser.net.transmit[goog.typeOf(x__2363__auto____10294)];
        if(or__3824__auto____10295) {
          return or__3824__auto____10295
        }else {
          var or__3824__auto____10296 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10296) {
            return or__3824__auto____10296
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2)
    }
  };
  var transmit__4 = function(this$, opt, opt2, opt3) {
    if(function() {
      var and__3822__auto____10297 = this$;
      if(and__3822__auto____10297) {
        return this$.clojure$browser$net$IConnection$transmit$arity$4
      }else {
        return and__3822__auto____10297
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$4(this$, opt, opt2, opt3)
    }else {
      var x__2363__auto____10298 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10299 = clojure.browser.net.transmit[goog.typeOf(x__2363__auto____10298)];
        if(or__3824__auto____10299) {
          return or__3824__auto____10299
        }else {
          var or__3824__auto____10300 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10300) {
            return or__3824__auto____10300
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3)
    }
  };
  var transmit__5 = function(this$, opt, opt2, opt3, opt4) {
    if(function() {
      var and__3822__auto____10301 = this$;
      if(and__3822__auto____10301) {
        return this$.clojure$browser$net$IConnection$transmit$arity$5
      }else {
        return and__3822__auto____10301
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$5(this$, opt, opt2, opt3, opt4)
    }else {
      var x__2363__auto____10302 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10303 = clojure.browser.net.transmit[goog.typeOf(x__2363__auto____10302)];
        if(or__3824__auto____10303) {
          return or__3824__auto____10303
        }else {
          var or__3824__auto____10304 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10304) {
            return or__3824__auto____10304
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4)
    }
  };
  var transmit__6 = function(this$, opt, opt2, opt3, opt4, opt5) {
    if(function() {
      var and__3822__auto____10305 = this$;
      if(and__3822__auto____10305) {
        return this$.clojure$browser$net$IConnection$transmit$arity$6
      }else {
        return and__3822__auto____10305
      }
    }()) {
      return this$.clojure$browser$net$IConnection$transmit$arity$6(this$, opt, opt2, opt3, opt4, opt5)
    }else {
      var x__2363__auto____10306 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10307 = clojure.browser.net.transmit[goog.typeOf(x__2363__auto____10306)];
        if(or__3824__auto____10307) {
          return or__3824__auto____10307
        }else {
          var or__3824__auto____10308 = clojure.browser.net.transmit["_"];
          if(or__3824__auto____10308) {
            return or__3824__auto____10308
          }else {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", this$);
          }
        }
      }().call(null, this$, opt, opt2, opt3, opt4, opt5)
    }
  };
  transmit = function(this$, opt, opt2, opt3, opt4, opt5) {
    switch(arguments.length) {
      case 2:
        return transmit__2.call(this, this$, opt);
      case 3:
        return transmit__3.call(this, this$, opt, opt2);
      case 4:
        return transmit__4.call(this, this$, opt, opt2, opt3);
      case 5:
        return transmit__5.call(this, this$, opt, opt2, opt3, opt4);
      case 6:
        return transmit__6.call(this, this$, opt, opt2, opt3, opt4, opt5)
    }
    throw"Invalid arity: " + arguments.length;
  };
  transmit.cljs$lang$arity$2 = transmit__2;
  transmit.cljs$lang$arity$3 = transmit__3;
  transmit.cljs$lang$arity$4 = transmit__4;
  transmit.cljs$lang$arity$5 = transmit__5;
  transmit.cljs$lang$arity$6 = transmit__6;
  return transmit
}();
clojure.browser.net.close = function close(this$) {
  if(function() {
    var and__3822__auto____10313 = this$;
    if(and__3822__auto____10313) {
      return this$.clojure$browser$net$IConnection$close$arity$1
    }else {
      return and__3822__auto____10313
    }
  }()) {
    return this$.clojure$browser$net$IConnection$close$arity$1(this$)
  }else {
    var x__2363__auto____10314 = this$ == null ? null : this$;
    return function() {
      var or__3824__auto____10315 = clojure.browser.net.close[goog.typeOf(x__2363__auto____10314)];
      if(or__3824__auto____10315) {
        return or__3824__auto____10315
      }else {
        var or__3824__auto____10316 = clojure.browser.net.close["_"];
        if(or__3824__auto____10316) {
          return or__3824__auto____10316
        }else {
          throw cljs.core.missing_protocol.call(null, "IConnection.close", this$);
        }
      }
    }().call(null, this$)
  }
};
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = true;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types$arity$1 = function(this$) {
  return cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10317) {
    var vec__10318__10319 = p__10317;
    var k__10320 = cljs.core.nth.call(null, vec__10318__10319, 0, null);
    var v__10321 = cljs.core.nth.call(null, vec__10318__10319, 1, null);
    return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10320.toLowerCase()), v__10321], true)
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))))
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$2 = function(this$, uri) {
  return clojure.browser.net.transmit.call(null, this$, uri, "GET", null, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$3 = function(this$, uri, method) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, null, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$4 = function(this$, uri, method, content) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, content, null, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$5 = function(this$, uri, method, content, headers) {
  return clojure.browser.net.transmit.call(null, this$, uri, method, content, headers, clojure.browser.net._STAR_timeout_STAR_)
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$6 = function(this$, uri, method, content, headers, timeout) {
  this$.setTimeoutInterval(timeout);
  return this$.send(uri, method, content, headers)
};
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null, cljs.core.ObjMap.EMPTY, cljs.core.map.call(null, function(p__10322) {
  var vec__10323__10324 = p__10322;
  var k__10325 = cljs.core.nth.call(null, vec__10323__10324, 0, null);
  var v__10326 = cljs.core.nth.call(null, vec__10323__10324, 1, null);
  return cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null, k__10325.toLowerCase()), v__10326], true)
}, cljs.core.js__GT_clj.call(null, goog.net.xpc.CfgFields)));
clojure.browser.net.xhr_connection = function xhr_connection() {
  return new goog.net.XhrIo
};
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = function() {
  var register_service = null;
  var register_service__3 = function(this$, service_name, fn) {
    if(function() {
      var and__3822__auto____10335 = this$;
      if(and__3822__auto____10335) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3
      }else {
        return and__3822__auto____10335
      }
    }()) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3(this$, service_name, fn)
    }else {
      var x__2363__auto____10336 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10337 = clojure.browser.net.register_service[goog.typeOf(x__2363__auto____10336)];
        if(or__3824__auto____10337) {
          return or__3824__auto____10337
        }else {
          var or__3824__auto____10338 = clojure.browser.net.register_service["_"];
          if(or__3824__auto____10338) {
            return or__3824__auto____10338
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn)
    }
  };
  var register_service__4 = function(this$, service_name, fn, encode_json_QMARK_) {
    if(function() {
      var and__3822__auto____10339 = this$;
      if(and__3822__auto____10339) {
        return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4
      }else {
        return and__3822__auto____10339
      }
    }()) {
      return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4(this$, service_name, fn, encode_json_QMARK_)
    }else {
      var x__2363__auto____10340 = this$ == null ? null : this$;
      return function() {
        var or__3824__auto____10341 = clojure.browser.net.register_service[goog.typeOf(x__2363__auto____10340)];
        if(or__3824__auto____10341) {
          return or__3824__auto____10341
        }else {
          var or__3824__auto____10342 = clojure.browser.net.register_service["_"];
          if(or__3824__auto____10342) {
            return or__3824__auto____10342
          }else {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", this$);
          }
        }
      }().call(null, this$, service_name, fn, encode_json_QMARK_)
    }
  };
  register_service = function(this$, service_name, fn, encode_json_QMARK_) {
    switch(arguments.length) {
      case 3:
        return register_service__3.call(this, this$, service_name, fn);
      case 4:
        return register_service__4.call(this, this$, service_name, fn, encode_json_QMARK_)
    }
    throw"Invalid arity: " + arguments.length;
  };
  register_service.cljs$lang$arity$3 = register_service__3;
  register_service.cljs$lang$arity$4 = register_service__4;
  return register_service
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$1 = function(this$) {
  return clojure.browser.net.connect.call(null, this$, null)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$2 = function(this$, on_connect_fn) {
  return this$.connect(on_connect_fn)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$3 = function(this$, on_connect_fn, config_iframe_fn) {
  return clojure.browser.net.connect.call(null, this$, on_connect_fn, config_iframe_fn, document.body)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$4 = function(this$, on_connect_fn, config_iframe_fn, iframe_parent) {
  this$.createPeerIframe(iframe_parent, config_iframe_fn);
  return this$.connect(on_connect_fn)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit$arity$3 = function(this$, service_name, payload) {
  return this$.send(cljs.core.name.call(null, service_name), payload)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close$arity$1 = function(this$) {
  return this$.close(cljs.core.List.EMPTY)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$3 = function(this$, service_name, fn) {
  return clojure.browser.net.register_service.call(null, this$, service_name, fn, false)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$4 = function(this$, service_name, fn, encode_json_QMARK_) {
  return this$.registerService(cljs.core.name.call(null, service_name), fn, encode_json_QMARK_)
};
clojure.browser.net.xpc_connection = function() {
  var xpc_connection = null;
  var xpc_connection__0 = function() {
    var temp__3974__auto____10354 = (new goog.Uri(window.location.href)).getParameterValue("xpc");
    if(cljs.core.truth_(temp__3974__auto____10354)) {
      var config__10355 = temp__3974__auto____10354;
      return new goog.net.xpc.CrossPageChannel(goog.json.parse(config__10355))
    }else {
      return null
    }
  };
  var xpc_connection__1 = function(config) {
    return new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null, function(sum, p__10356) {
      var vec__10357__10358 = p__10356;
      var k__10359 = cljs.core.nth.call(null, vec__10357__10358, 0, null);
      var v__10360 = cljs.core.nth.call(null, vec__10357__10358, 1, null);
      var temp__3971__auto____10361 = cljs.core._lookup.call(null, clojure.browser.net.xpc_config_fields, k__10359, null);
      if(cljs.core.truth_(temp__3971__auto____10361)) {
        var field__10362 = temp__3971__auto____10361;
        var G__10363__10364 = sum;
        G__10363__10364[field__10362] = v__10360;
        return G__10363__10364
      }else {
        return sum
      }
    }, {}, config))
  };
  xpc_connection = function(config) {
    switch(arguments.length) {
      case 0:
        return xpc_connection__0.call(this);
      case 1:
        return xpc_connection__1.call(this, config)
    }
    throw"Invalid arity: " + arguments.length;
  };
  xpc_connection.cljs$lang$arity$0 = xpc_connection__0;
  xpc_connection.cljs$lang$arity$1 = xpc_connection__1;
  return xpc_connection
}();
goog.provide("clojure.browser.repl");
goog.require("cljs.core");
goog.require("clojure.browser.event");
goog.require("clojure.browser.net");
clojure.browser.repl.xpc_connection = cljs.core.atom.call(null, null);
clojure.browser.repl.repl_print = function repl_print(data) {
  var temp__3971__auto____10214 = cljs.core.deref.call(null, clojure.browser.repl.xpc_connection);
  if(cljs.core.truth_(temp__3971__auto____10214)) {
    var conn__10215 = temp__3971__auto____10214;
    return clojure.browser.net.transmit.call(null, conn__10215, "\ufdd0'print", cljs.core.pr_str.call(null, data))
  }else {
    return null
  }
};
clojure.browser.repl.evaluate_javascript = function evaluate_javascript(conn, block) {
  var result__10221 = function() {
    try {
      return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value"], {"\ufdd0'status":"\ufdd0'success", "\ufdd0'value":[cljs.core.str(eval(block))].join("")})
    }catch(e10219) {
      if(cljs.core.instance_QMARK_.call(null, Error, e10219)) {
        var e__10220 = e10219;
        return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value", "\ufdd0'stacktrace"], {"\ufdd0'status":"\ufdd0'exception", "\ufdd0'value":cljs.core.pr_str.call(null, e__10220), "\ufdd0'stacktrace":cljs.core.truth_(e__10220.hasOwnProperty("stack")) ? e__10220.stack : "No stacktrace available."})
      }else {
        if("\ufdd0'else") {
          throw e10219;
        }else {
          return null
        }
      }
    }
  }();
  return cljs.core.pr_str.call(null, result__10221)
};
clojure.browser.repl.send_result = function send_result(connection, url, data) {
  return clojure.browser.net.transmit.call(null, connection, url, "POST", data, null, 0)
};
clojure.browser.repl.send_print = function() {
  var send_print = null;
  var send_print__2 = function(url, data) {
    return send_print.call(null, url, data, 0)
  };
  var send_print__3 = function(url, data, n) {
    var conn__10223 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, conn__10223, "\ufdd0'error", function(_) {
      if(n < 10) {
        return send_print.call(null, url, data, n + 1)
      }else {
        return console.log([cljs.core.str("Could not send "), cljs.core.str(data), cljs.core.str(" after "), cljs.core.str(n), cljs.core.str(" attempts.")].join(""))
      }
    });
    return clojure.browser.net.transmit.call(null, conn__10223, url, "POST", data, null, 0)
  };
  send_print = function(url, data, n) {
    switch(arguments.length) {
      case 2:
        return send_print__2.call(this, url, data);
      case 3:
        return send_print__3.call(this, url, data, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  send_print.cljs$lang$arity$2 = send_print__2;
  send_print.cljs$lang$arity$3 = send_print__3;
  return send_print
}();
clojure.browser.repl.order = cljs.core.atom.call(null, 0);
clojure.browser.repl.wrap_message = function wrap_message(t, data) {
  return cljs.core.pr_str.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'content", "\ufdd0'order"], {"\ufdd0'type":t, "\ufdd0'content":data, "\ufdd0'order":cljs.core.swap_BANG_.call(null, clojure.browser.repl.order, cljs.core.inc)}))
};
clojure.browser.repl.start_evaluator = function start_evaluator(url) {
  var temp__3971__auto____10227 = clojure.browser.net.xpc_connection.call(null);
  if(cljs.core.truth_(temp__3971__auto____10227)) {
    var repl_connection__10228 = temp__3971__auto____10227;
    var connection__10229 = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, connection__10229, "\ufdd0'success", function(e) {
      return clojure.browser.net.transmit.call(null, repl_connection__10228, "\ufdd0'evaluate-javascript", e.currentTarget.getResponseText(cljs.core.List.EMPTY))
    });
    clojure.browser.net.register_service.call(null, repl_connection__10228, "\ufdd0'send-result", function(data) {
      return clojure.browser.repl.send_result.call(null, connection__10229, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'result", data))
    });
    clojure.browser.net.register_service.call(null, repl_connection__10228, "\ufdd0'print", function(data) {
      return clojure.browser.repl.send_print.call(null, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'print", data))
    });
    clojure.browser.net.connect.call(null, repl_connection__10228, cljs.core.constantly.call(null, null));
    return setTimeout(function() {
      return clojure.browser.repl.send_result.call(null, connection__10229, url, clojure.browser.repl.wrap_message.call(null, "\ufdd0'ready", "ready"))
    }, 50)
  }else {
    return alert("No 'xpc' param provided to child iframe.")
  }
};
clojure.browser.repl.connect = function connect(repl_server_url) {
  var repl_connection__10231 = clojure.browser.net.xpc_connection.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'peer_uri"], {"\ufdd0'peer_uri":repl_server_url}));
  cljs.core.swap_BANG_.call(null, clojure.browser.repl.xpc_connection, cljs.core.constantly.call(null, repl_connection__10231));
  clojure.browser.net.register_service.call(null, repl_connection__10231, "\ufdd0'evaluate-javascript", function(js) {
    return clojure.browser.net.transmit.call(null, repl_connection__10231, "\ufdd0'send-result", clojure.browser.repl.evaluate_javascript.call(null, repl_connection__10231, js))
  });
  return clojure.browser.net.connect.call(null, repl_connection__10231, cljs.core.constantly.call(null, null), function(iframe) {
    return iframe.style.display = "none"
  })
};
goog.provide("tikvah.home");
goog.require("cljs.core");
goog.require("clojure.browser.repl");
clojure.browser.repl.connect.call(null, "http://localhost:9000/repl");
