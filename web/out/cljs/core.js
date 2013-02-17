goog.provide('cljs.core');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string.format');
goog.require('goog.string.StringBuffer');
goog.require('goog.string');
cljs.core._STAR_unchecked_if_STAR_ = false;
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var x__7130 = (((x == null))?null:x);
if((p[goog.typeOf(x__7130)]))
{return true;
} else
{if((p["_"]))
{return true;
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
});
cljs.core.is_proto_ = (function is_proto_(x){
return (x.constructor.prototype === x);
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error(["No protocol method ",proto," defined for type ",goog.typeOf(obj),": ",obj].join(""));
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return array_like.slice();
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
cljs.core.make_array = (function() {
var make_array = null;
var make_array__1 = (function (size){
return (new Array(size));
});
var make_array__2 = (function (type,size){
return make_array.call(null,size);
});
make_array = function(type,size){
switch(arguments.length){
case 1:
return make_array__1.call(this,type);
case 2:
return make_array__2.call(this,type,size);
}
throw('Invalid arity: ' + arguments.length);
};
make_array.cljs$lang$arity$1 = make_array__1;
make_array.cljs$lang$arity$2 = make_array__2;
return make_array;
})()
;
/**
* Returns the value at the index.
* @param {...*} var_args
*/
cljs.core.aget = (function() {
var aget = null;
var aget__2 = (function (array,i){
return (array[i]);
});
var aget__3 = (function() { 
var G__7131__delegate = function (array,i,idxs){
return cljs.core.apply.call(null,aget,aget.call(null,array,i),idxs);
};
var G__7131 = function (array,i,var_args){
var idxs = null;
if (goog.isDef(var_args)) {
  idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7131__delegate.call(this, array, i, idxs);
};
G__7131.cljs$lang$maxFixedArity = 2;
G__7131.cljs$lang$applyTo = (function (arglist__7132){
var array = cljs.core.first(arglist__7132);
var i = cljs.core.first(cljs.core.next(arglist__7132));
var idxs = cljs.core.rest(cljs.core.next(arglist__7132));
return G__7131__delegate(array, i, idxs);
});
G__7131.cljs$lang$arity$variadic = G__7131__delegate;
return G__7131;
})()
;
aget = function(array,i,var_args){
var idxs = var_args;
switch(arguments.length){
case 2:
return aget__2.call(this,array,i);
default:
return aget__3.cljs$lang$arity$variadic(array,i, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
aget.cljs$lang$maxFixedArity = 2;
aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
aget.cljs$lang$arity$2 = aget__2;
aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
return aget;
})()
;
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.into_array = (function() {
var into_array = null;
var into_array__1 = (function (aseq){
return into_array.call(null,null,aseq);
});
var into_array__2 = (function (type,aseq){
return cljs.core.reduce.call(null,(function (a,x){
a.push(x);
return a;
}),[],aseq);
});
into_array = function(type,aseq){
switch(arguments.length){
case 1:
return into_array__1.call(this,type);
case 2:
return into_array__2.call(this,type,aseq);
}
throw('Invalid arity: ' + arguments.length);
};
into_array.cljs$lang$arity$1 = into_array__1;
into_array.cljs$lang$arity$2 = into_array__2;
return into_array;
})()
;
cljs.core.IFn = {};
cljs.core._invoke = (function() {
var _invoke = null;
var _invoke__1 = (function (this$){
if((function (){var and__3822__auto____7217 = this$;
if(and__3822__auto____7217)
{return this$.cljs$core$IFn$_invoke$arity$1;
} else
{return and__3822__auto____7217;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$1(this$);
} else
{var x__3220__auto____7218 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7219 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7218)]);
if(or__3824__auto____7219)
{return or__3824__auto____7219;
} else
{var or__3824__auto____7220 = (cljs.core._invoke["_"]);
if(or__3824__auto____7220)
{return or__3824__auto____7220;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$);
}
});
var _invoke__2 = (function (this$,a){
if((function (){var and__3822__auto____7221 = this$;
if(and__3822__auto____7221)
{return this$.cljs$core$IFn$_invoke$arity$2;
} else
{return and__3822__auto____7221;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$2(this$,a);
} else
{var x__3220__auto____7222 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7223 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7222)]);
if(or__3824__auto____7223)
{return or__3824__auto____7223;
} else
{var or__3824__auto____7224 = (cljs.core._invoke["_"]);
if(or__3824__auto____7224)
{return or__3824__auto____7224;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a);
}
});
var _invoke__3 = (function (this$,a,b){
if((function (){var and__3822__auto____7225 = this$;
if(and__3822__auto____7225)
{return this$.cljs$core$IFn$_invoke$arity$3;
} else
{return and__3822__auto____7225;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$3(this$,a,b);
} else
{var x__3220__auto____7226 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7227 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7226)]);
if(or__3824__auto____7227)
{return or__3824__auto____7227;
} else
{var or__3824__auto____7228 = (cljs.core._invoke["_"]);
if(or__3824__auto____7228)
{return or__3824__auto____7228;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b);
}
});
var _invoke__4 = (function (this$,a,b,c){
if((function (){var and__3822__auto____7229 = this$;
if(and__3822__auto____7229)
{return this$.cljs$core$IFn$_invoke$arity$4;
} else
{return and__3822__auto____7229;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$4(this$,a,b,c);
} else
{var x__3220__auto____7230 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7231 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7230)]);
if(or__3824__auto____7231)
{return or__3824__auto____7231;
} else
{var or__3824__auto____7232 = (cljs.core._invoke["_"]);
if(or__3824__auto____7232)
{return or__3824__auto____7232;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var _invoke__5 = (function (this$,a,b,c,d){
if((function (){var and__3822__auto____7233 = this$;
if(and__3822__auto____7233)
{return this$.cljs$core$IFn$_invoke$arity$5;
} else
{return and__3822__auto____7233;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$5(this$,a,b,c,d);
} else
{var x__3220__auto____7234 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7235 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7234)]);
if(or__3824__auto____7235)
{return or__3824__auto____7235;
} else
{var or__3824__auto____7236 = (cljs.core._invoke["_"]);
if(or__3824__auto____7236)
{return or__3824__auto____7236;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var _invoke__6 = (function (this$,a,b,c,d,e){
if((function (){var and__3822__auto____7237 = this$;
if(and__3822__auto____7237)
{return this$.cljs$core$IFn$_invoke$arity$6;
} else
{return and__3822__auto____7237;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$6(this$,a,b,c,d,e);
} else
{var x__3220__auto____7238 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7239 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7238)]);
if(or__3824__auto____7239)
{return or__3824__auto____7239;
} else
{var or__3824__auto____7240 = (cljs.core._invoke["_"]);
if(or__3824__auto____7240)
{return or__3824__auto____7240;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var _invoke__7 = (function (this$,a,b,c,d,e,f){
if((function (){var and__3822__auto____7241 = this$;
if(and__3822__auto____7241)
{return this$.cljs$core$IFn$_invoke$arity$7;
} else
{return and__3822__auto____7241;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$7(this$,a,b,c,d,e,f);
} else
{var x__3220__auto____7242 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7243 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7242)]);
if(or__3824__auto____7243)
{return or__3824__auto____7243;
} else
{var or__3824__auto____7244 = (cljs.core._invoke["_"]);
if(or__3824__auto____7244)
{return or__3824__auto____7244;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var _invoke__8 = (function (this$,a,b,c,d,e,f,g){
if((function (){var and__3822__auto____7245 = this$;
if(and__3822__auto____7245)
{return this$.cljs$core$IFn$_invoke$arity$8;
} else
{return and__3822__auto____7245;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$8(this$,a,b,c,d,e,f,g);
} else
{var x__3220__auto____7246 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7247 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7246)]);
if(or__3824__auto____7247)
{return or__3824__auto____7247;
} else
{var or__3824__auto____7248 = (cljs.core._invoke["_"]);
if(or__3824__auto____7248)
{return or__3824__auto____7248;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var _invoke__9 = (function (this$,a,b,c,d,e,f,g,h){
if((function (){var and__3822__auto____7249 = this$;
if(and__3822__auto____7249)
{return this$.cljs$core$IFn$_invoke$arity$9;
} else
{return and__3822__auto____7249;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$9(this$,a,b,c,d,e,f,g,h);
} else
{var x__3220__auto____7250 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7251 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7250)]);
if(or__3824__auto____7251)
{return or__3824__auto____7251;
} else
{var or__3824__auto____7252 = (cljs.core._invoke["_"]);
if(or__3824__auto____7252)
{return or__3824__auto____7252;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var _invoke__10 = (function (this$,a,b,c,d,e,f,g,h,i){
if((function (){var and__3822__auto____7253 = this$;
if(and__3822__auto____7253)
{return this$.cljs$core$IFn$_invoke$arity$10;
} else
{return and__3822__auto____7253;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$10(this$,a,b,c,d,e,f,g,h,i);
} else
{var x__3220__auto____7254 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7255 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7254)]);
if(or__3824__auto____7255)
{return or__3824__auto____7255;
} else
{var or__3824__auto____7256 = (cljs.core._invoke["_"]);
if(or__3824__auto____7256)
{return or__3824__auto____7256;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var _invoke__11 = (function (this$,a,b,c,d,e,f,g,h,i,j){
if((function (){var and__3822__auto____7257 = this$;
if(and__3822__auto____7257)
{return this$.cljs$core$IFn$_invoke$arity$11;
} else
{return and__3822__auto____7257;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$11(this$,a,b,c,d,e,f,g,h,i,j);
} else
{var x__3220__auto____7258 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7259 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7258)]);
if(or__3824__auto____7259)
{return or__3824__auto____7259;
} else
{var or__3824__auto____7260 = (cljs.core._invoke["_"]);
if(or__3824__auto____7260)
{return or__3824__auto____7260;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var _invoke__12 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){
if((function (){var and__3822__auto____7261 = this$;
if(and__3822__auto____7261)
{return this$.cljs$core$IFn$_invoke$arity$12;
} else
{return and__3822__auto____7261;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$12(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{var x__3220__auto____7262 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7263 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7262)]);
if(or__3824__auto____7263)
{return or__3824__auto____7263;
} else
{var or__3824__auto____7264 = (cljs.core._invoke["_"]);
if(or__3824__auto____7264)
{return or__3824__auto____7264;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var _invoke__13 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){
if((function (){var and__3822__auto____7265 = this$;
if(and__3822__auto____7265)
{return this$.cljs$core$IFn$_invoke$arity$13;
} else
{return and__3822__auto____7265;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$13(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{var x__3220__auto____7266 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7267 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7266)]);
if(or__3824__auto____7267)
{return or__3824__auto____7267;
} else
{var or__3824__auto____7268 = (cljs.core._invoke["_"]);
if(or__3824__auto____7268)
{return or__3824__auto____7268;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var _invoke__14 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){
if((function (){var and__3822__auto____7269 = this$;
if(and__3822__auto____7269)
{return this$.cljs$core$IFn$_invoke$arity$14;
} else
{return and__3822__auto____7269;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$14(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{var x__3220__auto____7270 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7271 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7270)]);
if(or__3824__auto____7271)
{return or__3824__auto____7271;
} else
{var or__3824__auto____7272 = (cljs.core._invoke["_"]);
if(or__3824__auto____7272)
{return or__3824__auto____7272;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var _invoke__15 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){
if((function (){var and__3822__auto____7273 = this$;
if(and__3822__auto____7273)
{return this$.cljs$core$IFn$_invoke$arity$15;
} else
{return and__3822__auto____7273;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$15(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{var x__3220__auto____7274 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7275 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7274)]);
if(or__3824__auto____7275)
{return or__3824__auto____7275;
} else
{var or__3824__auto____7276 = (cljs.core._invoke["_"]);
if(or__3824__auto____7276)
{return or__3824__auto____7276;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var _invoke__16 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
if((function (){var and__3822__auto____7277 = this$;
if(and__3822__auto____7277)
{return this$.cljs$core$IFn$_invoke$arity$16;
} else
{return and__3822__auto____7277;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$16(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{var x__3220__auto____7278 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7279 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7278)]);
if(or__3824__auto____7279)
{return or__3824__auto____7279;
} else
{var or__3824__auto____7280 = (cljs.core._invoke["_"]);
if(or__3824__auto____7280)
{return or__3824__auto____7280;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var _invoke__17 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
if((function (){var and__3822__auto____7281 = this$;
if(and__3822__auto____7281)
{return this$.cljs$core$IFn$_invoke$arity$17;
} else
{return and__3822__auto____7281;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$17(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{var x__3220__auto____7282 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7283 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7282)]);
if(or__3824__auto____7283)
{return or__3824__auto____7283;
} else
{var or__3824__auto____7284 = (cljs.core._invoke["_"]);
if(or__3824__auto____7284)
{return or__3824__auto____7284;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var _invoke__18 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
if((function (){var and__3822__auto____7285 = this$;
if(and__3822__auto____7285)
{return this$.cljs$core$IFn$_invoke$arity$18;
} else
{return and__3822__auto____7285;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$18(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{var x__3220__auto____7286 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7287 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7286)]);
if(or__3824__auto____7287)
{return or__3824__auto____7287;
} else
{var or__3824__auto____7288 = (cljs.core._invoke["_"]);
if(or__3824__auto____7288)
{return or__3824__auto____7288;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var _invoke__19 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){
if((function (){var and__3822__auto____7289 = this$;
if(and__3822__auto____7289)
{return this$.cljs$core$IFn$_invoke$arity$19;
} else
{return and__3822__auto____7289;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$19(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{var x__3220__auto____7290 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7291 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7290)]);
if(or__3824__auto____7291)
{return or__3824__auto____7291;
} else
{var or__3824__auto____7292 = (cljs.core._invoke["_"]);
if(or__3824__auto____7292)
{return or__3824__auto____7292;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var _invoke__20 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){
if((function (){var and__3822__auto____7293 = this$;
if(and__3822__auto____7293)
{return this$.cljs$core$IFn$_invoke$arity$20;
} else
{return and__3822__auto____7293;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$20(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{var x__3220__auto____7294 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7295 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7294)]);
if(or__3824__auto____7295)
{return or__3824__auto____7295;
} else
{var or__3824__auto____7296 = (cljs.core._invoke["_"]);
if(or__3824__auto____7296)
{return or__3824__auto____7296;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var _invoke__21 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
if((function (){var and__3822__auto____7297 = this$;
if(and__3822__auto____7297)
{return this$.cljs$core$IFn$_invoke$arity$21;
} else
{return and__3822__auto____7297;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$21(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{var x__3220__auto____7298 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7299 = (cljs.core._invoke[goog.typeOf(x__3220__auto____7298)]);
if(or__3824__auto____7299)
{return or__3824__auto____7299;
} else
{var or__3824__auto____7300 = (cljs.core._invoke["_"]);
if(or__3824__auto____7300)
{return or__3824__auto____7300;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
});
_invoke = function(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
switch(arguments.length){
case 1:
return _invoke__1.call(this,this$);
case 2:
return _invoke__2.call(this,this$,a);
case 3:
return _invoke__3.call(this,this$,a,b);
case 4:
return _invoke__4.call(this,this$,a,b,c);
case 5:
return _invoke__5.call(this,this$,a,b,c,d);
case 6:
return _invoke__6.call(this,this$,a,b,c,d,e);
case 7:
return _invoke__7.call(this,this$,a,b,c,d,e,f);
case 8:
return _invoke__8.call(this,this$,a,b,c,d,e,f,g);
case 9:
return _invoke__9.call(this,this$,a,b,c,d,e,f,g,h);
case 10:
return _invoke__10.call(this,this$,a,b,c,d,e,f,g,h,i);
case 11:
return _invoke__11.call(this,this$,a,b,c,d,e,f,g,h,i,j);
case 12:
return _invoke__12.call(this,this$,a,b,c,d,e,f,g,h,i,j,k);
case 13:
return _invoke__13.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l);
case 14:
return _invoke__14.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
case 15:
return _invoke__15.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
case 16:
return _invoke__16.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
case 17:
return _invoke__17.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
case 18:
return _invoke__18.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return _invoke__19.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
case 20:
return _invoke__20.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
case 21:
return _invoke__21.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
throw('Invalid arity: ' + arguments.length);
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
return _invoke;
})()
;
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if((function (){var and__3822__auto____7305 = coll;
if(and__3822__auto____7305)
{return coll.cljs$core$ICounted$_count$arity$1;
} else
{return and__3822__auto____7305;
}
})())
{return coll.cljs$core$ICounted$_count$arity$1(coll);
} else
{var x__3220__auto____7306 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7307 = (cljs.core._count[goog.typeOf(x__3220__auto____7306)]);
if(or__3824__auto____7307)
{return or__3824__auto____7307;
} else
{var or__3824__auto____7308 = (cljs.core._count["_"]);
if(or__3824__auto____7308)
{return or__3824__auto____7308;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if((function (){var and__3822__auto____7313 = coll;
if(and__3822__auto____7313)
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1;
} else
{return and__3822__auto____7313;
}
})())
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var x__3220__auto____7314 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7315 = (cljs.core._empty[goog.typeOf(x__3220__auto____7314)]);
if(or__3824__auto____7315)
{return or__3824__auto____7315;
} else
{var or__3824__auto____7316 = (cljs.core._empty["_"]);
if(or__3824__auto____7316)
{return or__3824__auto____7316;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if((function (){var and__3822__auto____7321 = coll;
if(and__3822__auto____7321)
{return coll.cljs$core$ICollection$_conj$arity$2;
} else
{return and__3822__auto____7321;
}
})())
{return coll.cljs$core$ICollection$_conj$arity$2(coll,o);
} else
{var x__3220__auto____7322 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7323 = (cljs.core._conj[goog.typeOf(x__3220__auto____7322)]);
if(or__3824__auto____7323)
{return or__3824__auto____7323;
} else
{var or__3824__auto____7324 = (cljs.core._conj["_"]);
if(or__3824__auto____7324)
{return or__3824__auto____7324;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__2 = (function (coll,n){
if((function (){var and__3822__auto____7333 = coll;
if(and__3822__auto____7333)
{return coll.cljs$core$IIndexed$_nth$arity$2;
} else
{return and__3822__auto____7333;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{var x__3220__auto____7334 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7335 = (cljs.core._nth[goog.typeOf(x__3220__auto____7334)]);
if(or__3824__auto____7335)
{return or__3824__auto____7335;
} else
{var or__3824__auto____7336 = (cljs.core._nth["_"]);
if(or__3824__auto____7336)
{return or__3824__auto____7336;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__3 = (function (coll,n,not_found){
if((function (){var and__3822__auto____7337 = coll;
if(and__3822__auto____7337)
{return coll.cljs$core$IIndexed$_nth$arity$3;
} else
{return and__3822__auto____7337;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$3(coll,n,not_found);
} else
{var x__3220__auto____7338 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7339 = (cljs.core._nth[goog.typeOf(x__3220__auto____7338)]);
if(or__3824__auto____7339)
{return or__3824__auto____7339;
} else
{var or__3824__auto____7340 = (cljs.core._nth["_"]);
if(or__3824__auto____7340)
{return or__3824__auto____7340;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return _nth__2.call(this,coll,n);
case 3:
return _nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_nth.cljs$lang$arity$2 = _nth__2;
_nth.cljs$lang$arity$3 = _nth__3;
return _nth;
})()
;
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if((function (){var and__3822__auto____7345 = coll;
if(and__3822__auto____7345)
{return coll.cljs$core$ISeq$_first$arity$1;
} else
{return and__3822__auto____7345;
}
})())
{return coll.cljs$core$ISeq$_first$arity$1(coll);
} else
{var x__3220__auto____7346 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7347 = (cljs.core._first[goog.typeOf(x__3220__auto____7346)]);
if(or__3824__auto____7347)
{return or__3824__auto____7347;
} else
{var or__3824__auto____7348 = (cljs.core._first["_"]);
if(or__3824__auto____7348)
{return or__3824__auto____7348;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if((function (){var and__3822__auto____7353 = coll;
if(and__3822__auto____7353)
{return coll.cljs$core$ISeq$_rest$arity$1;
} else
{return and__3822__auto____7353;
}
})())
{return coll.cljs$core$ISeq$_rest$arity$1(coll);
} else
{var x__3220__auto____7354 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7355 = (cljs.core._rest[goog.typeOf(x__3220__auto____7354)]);
if(or__3824__auto____7355)
{return or__3824__auto____7355;
} else
{var or__3824__auto____7356 = (cljs.core._rest["_"]);
if(or__3824__auto____7356)
{return or__3824__auto____7356;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.INext = {};
cljs.core._next = (function _next(coll){
if((function (){var and__3822__auto____7361 = coll;
if(and__3822__auto____7361)
{return coll.cljs$core$INext$_next$arity$1;
} else
{return and__3822__auto____7361;
}
})())
{return coll.cljs$core$INext$_next$arity$1(coll);
} else
{var x__3220__auto____7362 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7363 = (cljs.core._next[goog.typeOf(x__3220__auto____7362)]);
if(or__3824__auto____7363)
{return or__3824__auto____7363;
} else
{var or__3824__auto____7364 = (cljs.core._next["_"]);
if(or__3824__auto____7364)
{return or__3824__auto____7364;
} else
{throw cljs.core.missing_protocol.call(null,"INext.-next",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__2 = (function (o,k){
if((function (){var and__3822__auto____7373 = o;
if(and__3822__auto____7373)
{return o.cljs$core$ILookup$_lookup$arity$2;
} else
{return and__3822__auto____7373;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$2(o,k);
} else
{var x__3220__auto____7374 = (((o == null))?null:o);
return (function (){var or__3824__auto____7375 = (cljs.core._lookup[goog.typeOf(x__3220__auto____7374)]);
if(or__3824__auto____7375)
{return or__3824__auto____7375;
} else
{var or__3824__auto____7376 = (cljs.core._lookup["_"]);
if(or__3824__auto____7376)
{return or__3824__auto____7376;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__3 = (function (o,k,not_found){
if((function (){var and__3822__auto____7377 = o;
if(and__3822__auto____7377)
{return o.cljs$core$ILookup$_lookup$arity$3;
} else
{return and__3822__auto____7377;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$3(o,k,not_found);
} else
{var x__3220__auto____7378 = (((o == null))?null:o);
return (function (){var or__3824__auto____7379 = (cljs.core._lookup[goog.typeOf(x__3220__auto____7378)]);
if(or__3824__auto____7379)
{return or__3824__auto____7379;
} else
{var or__3824__auto____7380 = (cljs.core._lookup["_"]);
if(or__3824__auto____7380)
{return or__3824__auto____7380;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case 2:
return _lookup__2.call(this,o,k);
case 3:
return _lookup__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_lookup.cljs$lang$arity$2 = _lookup__2;
_lookup.cljs$lang$arity$3 = _lookup__3;
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if((function (){var and__3822__auto____7385 = coll;
if(and__3822__auto____7385)
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2;
} else
{return and__3822__auto____7385;
}
})())
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll,k);
} else
{var x__3220__auto____7386 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7387 = (cljs.core._contains_key_QMARK_[goog.typeOf(x__3220__auto____7386)]);
if(or__3824__auto____7387)
{return or__3824__auto____7387;
} else
{var or__3824__auto____7388 = (cljs.core._contains_key_QMARK_["_"]);
if(or__3824__auto____7388)
{return or__3824__auto____7388;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if((function (){var and__3822__auto____7393 = coll;
if(and__3822__auto____7393)
{return coll.cljs$core$IAssociative$_assoc$arity$3;
} else
{return and__3822__auto____7393;
}
})())
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,k,v);
} else
{var x__3220__auto____7394 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7395 = (cljs.core._assoc[goog.typeOf(x__3220__auto____7394)]);
if(or__3824__auto____7395)
{return or__3824__auto____7395;
} else
{var or__3824__auto____7396 = (cljs.core._assoc["_"]);
if(or__3824__auto____7396)
{return or__3824__auto____7396;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if((function (){var and__3822__auto____7401 = coll;
if(and__3822__auto____7401)
{return coll.cljs$core$IMap$_dissoc$arity$2;
} else
{return and__3822__auto____7401;
}
})())
{return coll.cljs$core$IMap$_dissoc$arity$2(coll,k);
} else
{var x__3220__auto____7402 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7403 = (cljs.core._dissoc[goog.typeOf(x__3220__auto____7402)]);
if(or__3824__auto____7403)
{return or__3824__auto____7403;
} else
{var or__3824__auto____7404 = (cljs.core._dissoc["_"]);
if(or__3824__auto____7404)
{return or__3824__auto____7404;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.IMapEntry = {};
cljs.core._key = (function _key(coll){
if((function (){var and__3822__auto____7409 = coll;
if(and__3822__auto____7409)
{return coll.cljs$core$IMapEntry$_key$arity$1;
} else
{return and__3822__auto____7409;
}
})())
{return coll.cljs$core$IMapEntry$_key$arity$1(coll);
} else
{var x__3220__auto____7410 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7411 = (cljs.core._key[goog.typeOf(x__3220__auto____7410)]);
if(or__3824__auto____7411)
{return or__3824__auto____7411;
} else
{var or__3824__auto____7412 = (cljs.core._key["_"]);
if(or__3824__auto____7412)
{return or__3824__auto____7412;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-key",coll);
}
}
})().call(null,coll);
}
});
cljs.core._val = (function _val(coll){
if((function (){var and__3822__auto____7417 = coll;
if(and__3822__auto____7417)
{return coll.cljs$core$IMapEntry$_val$arity$1;
} else
{return and__3822__auto____7417;
}
})())
{return coll.cljs$core$IMapEntry$_val$arity$1(coll);
} else
{var x__3220__auto____7418 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7419 = (cljs.core._val[goog.typeOf(x__3220__auto____7418)]);
if(or__3824__auto____7419)
{return or__3824__auto____7419;
} else
{var or__3824__auto____7420 = (cljs.core._val["_"]);
if(or__3824__auto____7420)
{return or__3824__auto____7420;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-val",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if((function (){var and__3822__auto____7425 = coll;
if(and__3822__auto____7425)
{return coll.cljs$core$ISet$_disjoin$arity$2;
} else
{return and__3822__auto____7425;
}
})())
{return coll.cljs$core$ISet$_disjoin$arity$2(coll,v);
} else
{var x__3220__auto____7426 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7427 = (cljs.core._disjoin[goog.typeOf(x__3220__auto____7426)]);
if(or__3824__auto____7427)
{return or__3824__auto____7427;
} else
{var or__3824__auto____7428 = (cljs.core._disjoin["_"]);
if(or__3824__auto____7428)
{return or__3824__auto____7428;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if((function (){var and__3822__auto____7433 = coll;
if(and__3822__auto____7433)
{return coll.cljs$core$IStack$_peek$arity$1;
} else
{return and__3822__auto____7433;
}
})())
{return coll.cljs$core$IStack$_peek$arity$1(coll);
} else
{var x__3220__auto____7434 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7435 = (cljs.core._peek[goog.typeOf(x__3220__auto____7434)]);
if(or__3824__auto____7435)
{return or__3824__auto____7435;
} else
{var or__3824__auto____7436 = (cljs.core._peek["_"]);
if(or__3824__auto____7436)
{return or__3824__auto____7436;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if((function (){var and__3822__auto____7441 = coll;
if(and__3822__auto____7441)
{return coll.cljs$core$IStack$_pop$arity$1;
} else
{return and__3822__auto____7441;
}
})())
{return coll.cljs$core$IStack$_pop$arity$1(coll);
} else
{var x__3220__auto____7442 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7443 = (cljs.core._pop[goog.typeOf(x__3220__auto____7442)]);
if(or__3824__auto____7443)
{return or__3824__auto____7443;
} else
{var or__3824__auto____7444 = (cljs.core._pop["_"]);
if(or__3824__auto____7444)
{return or__3824__auto____7444;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if((function (){var and__3822__auto____7449 = coll;
if(and__3822__auto____7449)
{return coll.cljs$core$IVector$_assoc_n$arity$3;
} else
{return and__3822__auto____7449;
}
})())
{return coll.cljs$core$IVector$_assoc_n$arity$3(coll,n,val);
} else
{var x__3220__auto____7450 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7451 = (cljs.core._assoc_n[goog.typeOf(x__3220__auto____7450)]);
if(or__3824__auto____7451)
{return or__3824__auto____7451;
} else
{var or__3824__auto____7452 = (cljs.core._assoc_n["_"]);
if(or__3824__auto____7452)
{return or__3824__auto____7452;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if((function (){var and__3822__auto____7457 = o;
if(and__3822__auto____7457)
{return o.cljs$core$IDeref$_deref$arity$1;
} else
{return and__3822__auto____7457;
}
})())
{return o.cljs$core$IDeref$_deref$arity$1(o);
} else
{var x__3220__auto____7458 = (((o == null))?null:o);
return (function (){var or__3824__auto____7459 = (cljs.core._deref[goog.typeOf(x__3220__auto____7458)]);
if(or__3824__auto____7459)
{return or__3824__auto____7459;
} else
{var or__3824__auto____7460 = (cljs.core._deref["_"]);
if(or__3824__auto____7460)
{return or__3824__auto____7460;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if((function (){var and__3822__auto____7465 = o;
if(and__3822__auto____7465)
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3;
} else
{return and__3822__auto____7465;
}
})())
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o,msec,timeout_val);
} else
{var x__3220__auto____7466 = (((o == null))?null:o);
return (function (){var or__3824__auto____7467 = (cljs.core._deref_with_timeout[goog.typeOf(x__3220__auto____7466)]);
if(or__3824__auto____7467)
{return or__3824__auto____7467;
} else
{var or__3824__auto____7468 = (cljs.core._deref_with_timeout["_"]);
if(or__3824__auto____7468)
{return or__3824__auto____7468;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if((function (){var and__3822__auto____7473 = o;
if(and__3822__auto____7473)
{return o.cljs$core$IMeta$_meta$arity$1;
} else
{return and__3822__auto____7473;
}
})())
{return o.cljs$core$IMeta$_meta$arity$1(o);
} else
{var x__3220__auto____7474 = (((o == null))?null:o);
return (function (){var or__3824__auto____7475 = (cljs.core._meta[goog.typeOf(x__3220__auto____7474)]);
if(or__3824__auto____7475)
{return or__3824__auto____7475;
} else
{var or__3824__auto____7476 = (cljs.core._meta["_"]);
if(or__3824__auto____7476)
{return or__3824__auto____7476;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if((function (){var and__3822__auto____7481 = o;
if(and__3822__auto____7481)
{return o.cljs$core$IWithMeta$_with_meta$arity$2;
} else
{return and__3822__auto____7481;
}
})())
{return o.cljs$core$IWithMeta$_with_meta$arity$2(o,meta);
} else
{var x__3220__auto____7482 = (((o == null))?null:o);
return (function (){var or__3824__auto____7483 = (cljs.core._with_meta[goog.typeOf(x__3220__auto____7482)]);
if(or__3824__auto____7483)
{return or__3824__auto____7483;
} else
{var or__3824__auto____7484 = (cljs.core._with_meta["_"]);
if(or__3824__auto____7484)
{return or__3824__auto____7484;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__2 = (function (coll,f){
if((function (){var and__3822__auto____7493 = coll;
if(and__3822__auto____7493)
{return coll.cljs$core$IReduce$_reduce$arity$2;
} else
{return and__3822__auto____7493;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$2(coll,f);
} else
{var x__3220__auto____7494 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7495 = (cljs.core._reduce[goog.typeOf(x__3220__auto____7494)]);
if(or__3824__auto____7495)
{return or__3824__auto____7495;
} else
{var or__3824__auto____7496 = (cljs.core._reduce["_"]);
if(or__3824__auto____7496)
{return or__3824__auto____7496;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__3 = (function (coll,f,start){
if((function (){var and__3822__auto____7497 = coll;
if(and__3822__auto____7497)
{return coll.cljs$core$IReduce$_reduce$arity$3;
} else
{return and__3822__auto____7497;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$3(coll,f,start);
} else
{var x__3220__auto____7498 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7499 = (cljs.core._reduce[goog.typeOf(x__3220__auto____7498)]);
if(or__3824__auto____7499)
{return or__3824__auto____7499;
} else
{var or__3824__auto____7500 = (cljs.core._reduce["_"]);
if(or__3824__auto____7500)
{return or__3824__auto____7500;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case 2:
return _reduce__2.call(this,coll,f);
case 3:
return _reduce__3.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
_reduce.cljs$lang$arity$2 = _reduce__2;
_reduce.cljs$lang$arity$3 = _reduce__3;
return _reduce;
})()
;
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = (function _kv_reduce(coll,f,init){
if((function (){var and__3822__auto____7505 = coll;
if(and__3822__auto____7505)
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3;
} else
{return and__3822__auto____7505;
}
})())
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll,f,init);
} else
{var x__3220__auto____7506 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7507 = (cljs.core._kv_reduce[goog.typeOf(x__3220__auto____7506)]);
if(or__3824__auto____7507)
{return or__3824__auto____7507;
} else
{var or__3824__auto____7508 = (cljs.core._kv_reduce["_"]);
if(or__3824__auto____7508)
{return or__3824__auto____7508;
} else
{throw cljs.core.missing_protocol.call(null,"IKVReduce.-kv-reduce",coll);
}
}
})().call(null,coll,f,init);
}
});
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if((function (){var and__3822__auto____7513 = o;
if(and__3822__auto____7513)
{return o.cljs$core$IEquiv$_equiv$arity$2;
} else
{return and__3822__auto____7513;
}
})())
{return o.cljs$core$IEquiv$_equiv$arity$2(o,other);
} else
{var x__3220__auto____7514 = (((o == null))?null:o);
return (function (){var or__3824__auto____7515 = (cljs.core._equiv[goog.typeOf(x__3220__auto____7514)]);
if(or__3824__auto____7515)
{return or__3824__auto____7515;
} else
{var or__3824__auto____7516 = (cljs.core._equiv["_"]);
if(or__3824__auto____7516)
{return or__3824__auto____7516;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if((function (){var and__3822__auto____7521 = o;
if(and__3822__auto____7521)
{return o.cljs$core$IHash$_hash$arity$1;
} else
{return and__3822__auto____7521;
}
})())
{return o.cljs$core$IHash$_hash$arity$1(o);
} else
{var x__3220__auto____7522 = (((o == null))?null:o);
return (function (){var or__3824__auto____7523 = (cljs.core._hash[goog.typeOf(x__3220__auto____7522)]);
if(or__3824__auto____7523)
{return or__3824__auto____7523;
} else
{var or__3824__auto____7524 = (cljs.core._hash["_"]);
if(or__3824__auto____7524)
{return or__3824__auto____7524;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if((function (){var and__3822__auto____7529 = o;
if(and__3822__auto____7529)
{return o.cljs$core$ISeqable$_seq$arity$1;
} else
{return and__3822__auto____7529;
}
})())
{return o.cljs$core$ISeqable$_seq$arity$1(o);
} else
{var x__3220__auto____7530 = (((o == null))?null:o);
return (function (){var or__3824__auto____7531 = (cljs.core._seq[goog.typeOf(x__3220__auto____7530)]);
if(or__3824__auto____7531)
{return or__3824__auto____7531;
} else
{var or__3824__auto____7532 = (cljs.core._seq["_"]);
if(or__3824__auto____7532)
{return or__3824__auto____7532;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = (function _rseq(coll){
if((function (){var and__3822__auto____7537 = coll;
if(and__3822__auto____7537)
{return coll.cljs$core$IReversible$_rseq$arity$1;
} else
{return and__3822__auto____7537;
}
})())
{return coll.cljs$core$IReversible$_rseq$arity$1(coll);
} else
{var x__3220__auto____7538 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7539 = (cljs.core._rseq[goog.typeOf(x__3220__auto____7538)]);
if(or__3824__auto____7539)
{return or__3824__auto____7539;
} else
{var or__3824__auto____7540 = (cljs.core._rseq["_"]);
if(or__3824__auto____7540)
{return or__3824__auto____7540;
} else
{throw cljs.core.missing_protocol.call(null,"IReversible.-rseq",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISorted = {};
cljs.core._sorted_seq = (function _sorted_seq(coll,ascending_QMARK_){
if((function (){var and__3822__auto____7545 = coll;
if(and__3822__auto____7545)
{return coll.cljs$core$ISorted$_sorted_seq$arity$2;
} else
{return and__3822__auto____7545;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll,ascending_QMARK_);
} else
{var x__3220__auto____7546 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7547 = (cljs.core._sorted_seq[goog.typeOf(x__3220__auto____7546)]);
if(or__3824__auto____7547)
{return or__3824__auto____7547;
} else
{var or__3824__auto____7548 = (cljs.core._sorted_seq["_"]);
if(or__3824__auto____7548)
{return or__3824__auto____7548;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq",coll);
}
}
})().call(null,coll,ascending_QMARK_);
}
});
cljs.core._sorted_seq_from = (function _sorted_seq_from(coll,k,ascending_QMARK_){
if((function (){var and__3822__auto____7553 = coll;
if(and__3822__auto____7553)
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3;
} else
{return and__3822__auto____7553;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll,k,ascending_QMARK_);
} else
{var x__3220__auto____7554 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7555 = (cljs.core._sorted_seq_from[goog.typeOf(x__3220__auto____7554)]);
if(or__3824__auto____7555)
{return or__3824__auto____7555;
} else
{var or__3824__auto____7556 = (cljs.core._sorted_seq_from["_"]);
if(or__3824__auto____7556)
{return or__3824__auto____7556;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq-from",coll);
}
}
})().call(null,coll,k,ascending_QMARK_);
}
});
cljs.core._entry_key = (function _entry_key(coll,entry){
if((function (){var and__3822__auto____7561 = coll;
if(and__3822__auto____7561)
{return coll.cljs$core$ISorted$_entry_key$arity$2;
} else
{return and__3822__auto____7561;
}
})())
{return coll.cljs$core$ISorted$_entry_key$arity$2(coll,entry);
} else
{var x__3220__auto____7562 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7563 = (cljs.core._entry_key[goog.typeOf(x__3220__auto____7562)]);
if(or__3824__auto____7563)
{return or__3824__auto____7563;
} else
{var or__3824__auto____7564 = (cljs.core._entry_key["_"]);
if(or__3824__auto____7564)
{return or__3824__auto____7564;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-entry-key",coll);
}
}
})().call(null,coll,entry);
}
});
cljs.core._comparator = (function _comparator(coll){
if((function (){var and__3822__auto____7569 = coll;
if(and__3822__auto____7569)
{return coll.cljs$core$ISorted$_comparator$arity$1;
} else
{return and__3822__auto____7569;
}
})())
{return coll.cljs$core$ISorted$_comparator$arity$1(coll);
} else
{var x__3220__auto____7570 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7571 = (cljs.core._comparator[goog.typeOf(x__3220__auto____7570)]);
if(or__3824__auto____7571)
{return or__3824__auto____7571;
} else
{var or__3824__auto____7572 = (cljs.core._comparator["_"]);
if(or__3824__auto____7572)
{return or__3824__auto____7572;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-comparator",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if((function (){var and__3822__auto____7577 = o;
if(and__3822__auto____7577)
{return o.cljs$core$IPrintable$_pr_seq$arity$2;
} else
{return and__3822__auto____7577;
}
})())
{return o.cljs$core$IPrintable$_pr_seq$arity$2(o,opts);
} else
{var x__3220__auto____7578 = (((o == null))?null:o);
return (function (){var or__3824__auto____7579 = (cljs.core._pr_seq[goog.typeOf(x__3220__auto____7578)]);
if(or__3824__auto____7579)
{return or__3824__auto____7579;
} else
{var or__3824__auto____7580 = (cljs.core._pr_seq["_"]);
if(or__3824__auto____7580)
{return or__3824__auto____7580;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if((function (){var and__3822__auto____7585 = d;
if(and__3822__auto____7585)
{return d.cljs$core$IPending$_realized_QMARK_$arity$1;
} else
{return and__3822__auto____7585;
}
})())
{return d.cljs$core$IPending$_realized_QMARK_$arity$1(d);
} else
{var x__3220__auto____7586 = (((d == null))?null:d);
return (function (){var or__3824__auto____7587 = (cljs.core._realized_QMARK_[goog.typeOf(x__3220__auto____7586)]);
if(or__3824__auto____7587)
{return or__3824__auto____7587;
} else
{var or__3824__auto____7588 = (cljs.core._realized_QMARK_["_"]);
if(or__3824__auto____7588)
{return or__3824__auto____7588;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if((function (){var and__3822__auto____7593 = this$;
if(and__3822__auto____7593)
{return this$.cljs$core$IWatchable$_notify_watches$arity$3;
} else
{return and__3822__auto____7593;
}
})())
{return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$,oldval,newval);
} else
{var x__3220__auto____7594 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7595 = (cljs.core._notify_watches[goog.typeOf(x__3220__auto____7594)]);
if(or__3824__auto____7595)
{return or__3824__auto____7595;
} else
{var or__3824__auto____7596 = (cljs.core._notify_watches["_"]);
if(or__3824__auto____7596)
{return or__3824__auto____7596;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if((function (){var and__3822__auto____7601 = this$;
if(and__3822__auto____7601)
{return this$.cljs$core$IWatchable$_add_watch$arity$3;
} else
{return and__3822__auto____7601;
}
})())
{return this$.cljs$core$IWatchable$_add_watch$arity$3(this$,key,f);
} else
{var x__3220__auto____7602 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7603 = (cljs.core._add_watch[goog.typeOf(x__3220__auto____7602)]);
if(or__3824__auto____7603)
{return or__3824__auto____7603;
} else
{var or__3824__auto____7604 = (cljs.core._add_watch["_"]);
if(or__3824__auto____7604)
{return or__3824__auto____7604;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if((function (){var and__3822__auto____7609 = this$;
if(and__3822__auto____7609)
{return this$.cljs$core$IWatchable$_remove_watch$arity$2;
} else
{return and__3822__auto____7609;
}
})())
{return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$,key);
} else
{var x__3220__auto____7610 = (((this$ == null))?null:this$);
return (function (){var or__3824__auto____7611 = (cljs.core._remove_watch[goog.typeOf(x__3220__auto____7610)]);
if(or__3824__auto____7611)
{return or__3824__auto____7611;
} else
{var or__3824__auto____7612 = (cljs.core._remove_watch["_"]);
if(or__3824__auto____7612)
{return or__3824__auto____7612;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.IEditableCollection = {};
cljs.core._as_transient = (function _as_transient(coll){
if((function (){var and__3822__auto____7617 = coll;
if(and__3822__auto____7617)
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1;
} else
{return and__3822__auto____7617;
}
})())
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll);
} else
{var x__3220__auto____7618 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7619 = (cljs.core._as_transient[goog.typeOf(x__3220__auto____7618)]);
if(or__3824__auto____7619)
{return or__3824__auto____7619;
} else
{var or__3824__auto____7620 = (cljs.core._as_transient["_"]);
if(or__3824__auto____7620)
{return or__3824__auto____7620;
} else
{throw cljs.core.missing_protocol.call(null,"IEditableCollection.-as-transient",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = (function _conj_BANG_(tcoll,val){
if((function (){var and__3822__auto____7625 = tcoll;
if(and__3822__auto____7625)
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2;
} else
{return and__3822__auto____7625;
}
})())
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{var x__3220__auto____7626 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7627 = (cljs.core._conj_BANG_[goog.typeOf(x__3220__auto____7626)]);
if(or__3824__auto____7627)
{return or__3824__auto____7627;
} else
{var or__3824__auto____7628 = (cljs.core._conj_BANG_["_"]);
if(or__3824__auto____7628)
{return or__3824__auto____7628;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-conj!",tcoll);
}
}
})().call(null,tcoll,val);
}
});
cljs.core._persistent_BANG_ = (function _persistent_BANG_(tcoll){
if((function (){var and__3822__auto____7633 = tcoll;
if(and__3822__auto____7633)
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1;
} else
{return and__3822__auto____7633;
}
})())
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll);
} else
{var x__3220__auto____7634 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7635 = (cljs.core._persistent_BANG_[goog.typeOf(x__3220__auto____7634)]);
if(or__3824__auto____7635)
{return or__3824__auto____7635;
} else
{var or__3824__auto____7636 = (cljs.core._persistent_BANG_["_"]);
if(or__3824__auto____7636)
{return or__3824__auto____7636;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-persistent!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = (function _assoc_BANG_(tcoll,key,val){
if((function (){var and__3822__auto____7641 = tcoll;
if(and__3822__auto____7641)
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3;
} else
{return and__3822__auto____7641;
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,key,val);
} else
{var x__3220__auto____7642 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7643 = (cljs.core._assoc_BANG_[goog.typeOf(x__3220__auto____7642)]);
if(or__3824__auto____7643)
{return or__3824__auto____7643;
} else
{var or__3824__auto____7644 = (cljs.core._assoc_BANG_["_"]);
if(or__3824__auto____7644)
{return or__3824__auto____7644;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientAssociative.-assoc!",tcoll);
}
}
})().call(null,tcoll,key,val);
}
});
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = (function _dissoc_BANG_(tcoll,key){
if((function (){var and__3822__auto____7649 = tcoll;
if(and__3822__auto____7649)
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2;
} else
{return and__3822__auto____7649;
}
})())
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll,key);
} else
{var x__3220__auto____7650 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7651 = (cljs.core._dissoc_BANG_[goog.typeOf(x__3220__auto____7650)]);
if(or__3824__auto____7651)
{return or__3824__auto____7651;
} else
{var or__3824__auto____7652 = (cljs.core._dissoc_BANG_["_"]);
if(or__3824__auto____7652)
{return or__3824__auto____7652;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientMap.-dissoc!",tcoll);
}
}
})().call(null,tcoll,key);
}
});
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = (function _assoc_n_BANG_(tcoll,n,val){
if((function (){var and__3822__auto____7657 = tcoll;
if(and__3822__auto____7657)
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3;
} else
{return and__3822__auto____7657;
}
})())
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,n,val);
} else
{var x__3220__auto____7658 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7659 = (cljs.core._assoc_n_BANG_[goog.typeOf(x__3220__auto____7658)]);
if(or__3824__auto____7659)
{return or__3824__auto____7659;
} else
{var or__3824__auto____7660 = (cljs.core._assoc_n_BANG_["_"]);
if(or__3824__auto____7660)
{return or__3824__auto____7660;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-assoc-n!",tcoll);
}
}
})().call(null,tcoll,n,val);
}
});
cljs.core._pop_BANG_ = (function _pop_BANG_(tcoll){
if((function (){var and__3822__auto____7665 = tcoll;
if(and__3822__auto____7665)
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1;
} else
{return and__3822__auto____7665;
}
})())
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll);
} else
{var x__3220__auto____7666 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7667 = (cljs.core._pop_BANG_[goog.typeOf(x__3220__auto____7666)]);
if(or__3824__auto____7667)
{return or__3824__auto____7667;
} else
{var or__3824__auto____7668 = (cljs.core._pop_BANG_["_"]);
if(or__3824__auto____7668)
{return or__3824__auto____7668;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-pop!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = (function _disjoin_BANG_(tcoll,v){
if((function (){var and__3822__auto____7673 = tcoll;
if(and__3822__auto____7673)
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2;
} else
{return and__3822__auto____7673;
}
})())
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll,v);
} else
{var x__3220__auto____7674 = (((tcoll == null))?null:tcoll);
return (function (){var or__3824__auto____7675 = (cljs.core._disjoin_BANG_[goog.typeOf(x__3220__auto____7674)]);
if(or__3824__auto____7675)
{return or__3824__auto____7675;
} else
{var or__3824__auto____7676 = (cljs.core._disjoin_BANG_["_"]);
if(or__3824__auto____7676)
{return or__3824__auto____7676;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientSet.-disjoin!",tcoll);
}
}
})().call(null,tcoll,v);
}
});
cljs.core.IComparable = {};
cljs.core._compare = (function _compare(x,y){
if((function (){var and__3822__auto____7681 = x;
if(and__3822__auto____7681)
{return x.cljs$core$IComparable$_compare$arity$2;
} else
{return and__3822__auto____7681;
}
})())
{return x.cljs$core$IComparable$_compare$arity$2(x,y);
} else
{var x__3220__auto____7682 = (((x == null))?null:x);
return (function (){var or__3824__auto____7683 = (cljs.core._compare[goog.typeOf(x__3220__auto____7682)]);
if(or__3824__auto____7683)
{return or__3824__auto____7683;
} else
{var or__3824__auto____7684 = (cljs.core._compare["_"]);
if(or__3824__auto____7684)
{return or__3824__auto____7684;
} else
{throw cljs.core.missing_protocol.call(null,"IComparable.-compare",x);
}
}
})().call(null,x,y);
}
});
cljs.core.IChunk = {};
cljs.core._drop_first = (function _drop_first(coll){
if((function (){var and__3822__auto____7689 = coll;
if(and__3822__auto____7689)
{return coll.cljs$core$IChunk$_drop_first$arity$1;
} else
{return and__3822__auto____7689;
}
})())
{return coll.cljs$core$IChunk$_drop_first$arity$1(coll);
} else
{var x__3220__auto____7690 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7691 = (cljs.core._drop_first[goog.typeOf(x__3220__auto____7690)]);
if(or__3824__auto____7691)
{return or__3824__auto____7691;
} else
{var or__3824__auto____7692 = (cljs.core._drop_first["_"]);
if(or__3824__auto____7692)
{return or__3824__auto____7692;
} else
{throw cljs.core.missing_protocol.call(null,"IChunk.-drop-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = (function _chunked_first(coll){
if((function (){var and__3822__auto____7697 = coll;
if(and__3822__auto____7697)
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1;
} else
{return and__3822__auto____7697;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll);
} else
{var x__3220__auto____7698 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7699 = (cljs.core._chunked_first[goog.typeOf(x__3220__auto____7698)]);
if(or__3824__auto____7699)
{return or__3824__auto____7699;
} else
{var or__3824__auto____7700 = (cljs.core._chunked_first["_"]);
if(or__3824__auto____7700)
{return or__3824__auto____7700;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._chunked_rest = (function _chunked_rest(coll){
if((function (){var and__3822__auto____7705 = coll;
if(and__3822__auto____7705)
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1;
} else
{return and__3822__auto____7705;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
} else
{var x__3220__auto____7706 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7707 = (cljs.core._chunked_rest[goog.typeOf(x__3220__auto____7706)]);
if(or__3824__auto____7707)
{return or__3824__auto____7707;
} else
{var or__3824__auto____7708 = (cljs.core._chunked_rest["_"]);
if(or__3824__auto____7708)
{return or__3824__auto____7708;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = (function _chunked_next(coll){
if((function (){var and__3822__auto____7713 = coll;
if(and__3822__auto____7713)
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1;
} else
{return and__3822__auto____7713;
}
})())
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
} else
{var x__3220__auto____7714 = (((coll == null))?null:coll);
return (function (){var or__3824__auto____7715 = (cljs.core._chunked_next[goog.typeOf(x__3220__auto____7714)]);
if(or__3824__auto____7715)
{return or__3824__auto____7715;
} else
{var or__3824__auto____7716 = (cljs.core._chunked_next["_"]);
if(or__3824__auto____7716)
{return or__3824__auto____7716;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedNext.-chunked-next",coll);
}
}
})().call(null,coll);
}
});
/**
* Tests if 2 arguments are the same object
*/
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
/**
* Equality. Returns true if x equals y, false if not. Compares
* numbers and collections in a type-independent manner.  Clojure's immutable data
* structures define -equiv (and thus =) as a value, not an identity,
* comparison.
* @param {...*} var_args
*/
cljs.core._EQ_ = (function() {
var _EQ_ = null;
var _EQ___1 = (function (x){
return true;
});
var _EQ___2 = (function (x,y){
var or__3824__auto____7718 = (x === y);
if(or__3824__auto____7718)
{return or__3824__auto____7718;
} else
{return cljs.core._equiv.call(null,x,y);
}
});
var _EQ___3 = (function() { 
var G__7719__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__7720 = y;
var G__7721 = cljs.core.first.call(null,more);
var G__7722 = cljs.core.next.call(null,more);
x = G__7720;
y = G__7721;
more = G__7722;
continue;
}
} else
{return _EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7719 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7719__delegate.call(this, x, y, more);
};
G__7719.cljs$lang$maxFixedArity = 2;
G__7719.cljs$lang$applyTo = (function (arglist__7723){
var x = cljs.core.first(arglist__7723);
var y = cljs.core.first(cljs.core.next(arglist__7723));
var more = cljs.core.rest(cljs.core.next(arglist__7723));
return G__7719__delegate(x, y, more);
});
G__7719.cljs$lang$arity$variadic = G__7719__delegate;
return G__7719;
})()
;
_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ___1.call(this,x);
case 2:
return _EQ___2.call(this,x,y);
default:
return _EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ_.cljs$lang$maxFixedArity = 2;
_EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
_EQ_.cljs$lang$arity$1 = _EQ___1;
_EQ_.cljs$lang$arity$2 = _EQ___2;
_EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
return _EQ_;
})()
;
/**
* Returns true if x is nil, false otherwise.
*/
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x == null);
});
cljs.core.type = (function type(x){
if((x == null))
{return null;
} else
{return x.constructor;
}
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o instanceof t);
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__7724 = null;
var G__7724__2 = (function (o,k){
return null;
});
var G__7724__3 = (function (o,k,not_found){
return not_found;
});
G__7724 = function(o,k,not_found){
switch(arguments.length){
case 2:
return G__7724__2.call(this,o,k);
case 3:
return G__7724__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7724;
})()
);
(cljs.core.IAssociative["null"] = true);
(cljs.core._assoc["null"] = (function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
(cljs.core.INext["null"] = true);
(cljs.core._next["null"] = (function (_){
return null;
}));
(cljs.core.ICollection["null"] = true);
(cljs.core._conj["null"] = (function (_,o){
return cljs.core.list.call(null,o);
}));
(cljs.core.IReduce["null"] = true);
(cljs.core._reduce["null"] = (function() {
var G__7725 = null;
var G__7725__2 = (function (_,f){
return f.call(null);
});
var G__7725__3 = (function (_,f,start){
return start;
});
G__7725 = function(_,f,start){
switch(arguments.length){
case 2:
return G__7725__2.call(this,_,f);
case 3:
return G__7725__3.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7725;
})()
);
(cljs.core.IPrintable["null"] = true);
(cljs.core._pr_seq["null"] = (function (o){
return cljs.core.list.call(null,"nil");
}));
(cljs.core.ISet["null"] = true);
(cljs.core._disjoin["null"] = (function (_,v){
return null;
}));
(cljs.core.ICounted["null"] = true);
(cljs.core._count["null"] = (function (_){
return 0;
}));
(cljs.core.IStack["null"] = true);
(cljs.core._peek["null"] = (function (_){
return null;
}));
(cljs.core._pop["null"] = (function (_){
return null;
}));
(cljs.core.ISeq["null"] = true);
(cljs.core._first["null"] = (function (_){
return null;
}));
(cljs.core._rest["null"] = (function (_){
return cljs.core.list.call(null);
}));
(cljs.core.IEquiv["null"] = true);
(cljs.core._equiv["null"] = (function (_,o){
return (o == null);
}));
(cljs.core.IWithMeta["null"] = true);
(cljs.core._with_meta["null"] = (function (_,meta){
return null;
}));
(cljs.core.IMeta["null"] = true);
(cljs.core._meta["null"] = (function (_){
return null;
}));
(cljs.core.IIndexed["null"] = true);
(cljs.core._nth["null"] = (function() {
var G__7726 = null;
var G__7726__2 = (function (_,n){
return null;
});
var G__7726__3 = (function (_,n,not_found){
return not_found;
});
G__7726 = function(_,n,not_found){
switch(arguments.length){
case 2:
return G__7726__2.call(this,_,n);
case 3:
return G__7726__3.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7726;
})()
);
(cljs.core.IEmptyableCollection["null"] = true);
(cljs.core._empty["null"] = (function (_){
return null;
}));
(cljs.core.IMap["null"] = true);
(cljs.core._dissoc["null"] = (function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var and__3822__auto____7727 = cljs.core.instance_QMARK_.call(null,Date,other);
if(and__3822__auto____7727)
{return (o.toString() === other.toString());
} else
{return and__3822__auto____7727;
}
});
(cljs.core.IHash["number"] = true);
(cljs.core._hash["number"] = (function (o){
return o;
}));
(cljs.core.IEquiv["number"] = true);
(cljs.core._equiv["number"] = (function (x,o){
return (x === o);
}));
(cljs.core.IHash["boolean"] = true);
(cljs.core._hash["boolean"] = (function (o){
if((o === true))
{return 1;
} else
{return 0;
}
}));
(cljs.core.IHash["_"] = true);
(cljs.core._hash["_"] = (function (o){
return goog.getUid(o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__2 = (function (cicoll,f){
var cnt__7740 = cljs.core._count.call(null,cicoll);
if((cnt__7740 === 0))
{return f.call(null);
} else
{var val__7741 = cljs.core._nth.call(null,cicoll,0);
var n__7742 = 1;
while(true){
if((n__7742 < cnt__7740))
{var nval__7743 = f.call(null,val__7741,cljs.core._nth.call(null,cicoll,n__7742));
if(cljs.core.reduced_QMARK_.call(null,nval__7743))
{return cljs.core.deref.call(null,nval__7743);
} else
{{
var G__7752 = nval__7743;
var G__7753 = (n__7742 + 1);
val__7741 = G__7752;
n__7742 = G__7753;
continue;
}
}
} else
{return val__7741;
}
break;
}
}
});
var ci_reduce__3 = (function (cicoll,f,val){
var cnt__7744 = cljs.core._count.call(null,cicoll);
var val__7745 = val;
var n__7746 = 0;
while(true){
if((n__7746 < cnt__7744))
{var nval__7747 = f.call(null,val__7745,cljs.core._nth.call(null,cicoll,n__7746));
if(cljs.core.reduced_QMARK_.call(null,nval__7747))
{return cljs.core.deref.call(null,nval__7747);
} else
{{
var G__7754 = nval__7747;
var G__7755 = (n__7746 + 1);
val__7745 = G__7754;
n__7746 = G__7755;
continue;
}
}
} else
{return val__7745;
}
break;
}
});
var ci_reduce__4 = (function (cicoll,f,val,idx){
var cnt__7748 = cljs.core._count.call(null,cicoll);
var val__7749 = val;
var n__7750 = idx;
while(true){
if((n__7750 < cnt__7748))
{var nval__7751 = f.call(null,val__7749,cljs.core._nth.call(null,cicoll,n__7750));
if(cljs.core.reduced_QMARK_.call(null,nval__7751))
{return cljs.core.deref.call(null,nval__7751);
} else
{{
var G__7756 = nval__7751;
var G__7757 = (n__7750 + 1);
val__7749 = G__7756;
n__7750 = G__7757;
continue;
}
}
} else
{return val__7749;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case 2:
return ci_reduce__2.call(this,cicoll,f);
case 3:
return ci_reduce__3.call(this,cicoll,f,val);
case 4:
return ci_reduce__4.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
return ci_reduce;
})()
;
cljs.core.array_reduce = (function() {
var array_reduce = null;
var array_reduce__2 = (function (arr,f){
var cnt__7770 = arr.length;
if((arr.length === 0))
{return f.call(null);
} else
{var val__7771 = (arr[0]);
var n__7772 = 1;
while(true){
if((n__7772 < cnt__7770))
{var nval__7773 = f.call(null,val__7771,(arr[n__7772]));
if(cljs.core.reduced_QMARK_.call(null,nval__7773))
{return cljs.core.deref.call(null,nval__7773);
} else
{{
var G__7782 = nval__7773;
var G__7783 = (n__7772 + 1);
val__7771 = G__7782;
n__7772 = G__7783;
continue;
}
}
} else
{return val__7771;
}
break;
}
}
});
var array_reduce__3 = (function (arr,f,val){
var cnt__7774 = arr.length;
var val__7775 = val;
var n__7776 = 0;
while(true){
if((n__7776 < cnt__7774))
{var nval__7777 = f.call(null,val__7775,(arr[n__7776]));
if(cljs.core.reduced_QMARK_.call(null,nval__7777))
{return cljs.core.deref.call(null,nval__7777);
} else
{{
var G__7784 = nval__7777;
var G__7785 = (n__7776 + 1);
val__7775 = G__7784;
n__7776 = G__7785;
continue;
}
}
} else
{return val__7775;
}
break;
}
});
var array_reduce__4 = (function (arr,f,val,idx){
var cnt__7778 = arr.length;
var val__7779 = val;
var n__7780 = idx;
while(true){
if((n__7780 < cnt__7778))
{var nval__7781 = f.call(null,val__7779,(arr[n__7780]));
if(cljs.core.reduced_QMARK_.call(null,nval__7781))
{return cljs.core.deref.call(null,nval__7781);
} else
{{
var G__7786 = nval__7781;
var G__7787 = (n__7780 + 1);
val__7779 = G__7786;
n__7780 = G__7787;
continue;
}
}
} else
{return val__7779;
}
break;
}
});
array_reduce = function(arr,f,val,idx){
switch(arguments.length){
case 2:
return array_reduce__2.call(this,arr,f);
case 3:
return array_reduce__3.call(this,arr,f,val);
case 4:
return array_reduce__4.call(this,arr,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
array_reduce.cljs$lang$arity$2 = array_reduce__2;
array_reduce.cljs$lang$arity$3 = array_reduce__3;
array_reduce.cljs$lang$arity$4 = array_reduce__4;
return array_reduce;
})()
;

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 166199546;
})
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/IndexedSeq");
});
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7788 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var this__7789 = this;
if(((this__7789.i + 1) < this__7789.a.length))
{return (new cljs.core.IndexedSeq(this__7789.a,(this__7789.i + 1)));
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7790 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__7791 = this;
var c__7792 = coll.cljs$core$ICounted$_count$arity$1(coll);
if((c__7792 > 0))
{return (new cljs.core.RSeq(coll,(c__7792 - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.IndexedSeq.prototype.toString = (function (){
var this__7793 = this;
var this__7794 = this;
return cljs.core.pr_str.call(null,this__7794);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__7795 = this;
if(cljs.core.counted_QMARK_.call(null,this__7795.a))
{return cljs.core.ci_reduce.call(null,this__7795.a,f,(this__7795.a[this__7795.i]),(this__7795.i + 1));
} else
{return cljs.core.ci_reduce.call(null,coll,f,(this__7795.a[this__7795.i]),0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__7796 = this;
if(cljs.core.counted_QMARK_.call(null,this__7796.a))
{return cljs.core.ci_reduce.call(null,this__7796.a,f,start,this__7796.i);
} else
{return cljs.core.ci_reduce.call(null,coll,f,start,0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__7797 = this;
return this$;
});
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7798 = this;
return (this__7798.a.length - this__7798.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var this__7799 = this;
return (this__7799.a[this__7799.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var this__7800 = this;
if(((this__7800.i + 1) < this__7800.a.length))
{return (new cljs.core.IndexedSeq(this__7800.a,(this__7800.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7801 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__7802 = this;
var i__7803 = (n + this__7802.i);
if((i__7803 < this__7802.a.length))
{return (this__7802.a[i__7803]);
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__7804 = this;
var i__7805 = (n + this__7804.i);
if((i__7805 < this__7804.a.length))
{return (this__7804.a[i__7805]);
} else
{return not_found;
}
});
cljs.core.IndexedSeq;
cljs.core.prim_seq = (function() {
var prim_seq = null;
var prim_seq__1 = (function (prim){
return prim_seq.call(null,prim,0);
});
var prim_seq__2 = (function (prim,i){
if((prim.length === 0))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
prim_seq = function(prim,i){
switch(arguments.length){
case 1:
return prim_seq__1.call(this,prim);
case 2:
return prim_seq__2.call(this,prim,i);
}
throw('Invalid arity: ' + arguments.length);
};
prim_seq.cljs$lang$arity$1 = prim_seq__1;
prim_seq.cljs$lang$arity$2 = prim_seq__2;
return prim_seq;
})()
;
cljs.core.array_seq = (function() {
var array_seq = null;
var array_seq__1 = (function (array){
return cljs.core.prim_seq.call(null,array,0);
});
var array_seq__2 = (function (array,i){
return cljs.core.prim_seq.call(null,array,i);
});
array_seq = function(array,i){
switch(arguments.length){
case 1:
return array_seq__1.call(this,array);
case 2:
return array_seq__2.call(this,array,i);
}
throw('Invalid arity: ' + arguments.length);
};
array_seq.cljs$lang$arity$1 = array_seq__1;
array_seq.cljs$lang$arity$2 = array_seq__2;
return array_seq;
})()
;
(cljs.core.IReduce["array"] = true);
(cljs.core._reduce["array"] = (function() {
var G__7806 = null;
var G__7806__2 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__7806__3 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__7806 = function(array,f,start){
switch(arguments.length){
case 2:
return G__7806__2.call(this,array,f);
case 3:
return G__7806__3.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7806;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__7807 = null;
var G__7807__2 = (function (array,k){
return (array[k]);
});
var G__7807__3 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__7807 = function(array,k,not_found){
switch(arguments.length){
case 2:
return G__7807__2.call(this,array,k);
case 3:
return G__7807__3.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7807;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__7808 = null;
var G__7808__2 = (function (array,n){
if((n < array.length))
{return (array[n]);
} else
{return null;
}
});
var G__7808__3 = (function (array,n,not_found){
if((n < array.length))
{return (array[n]);
} else
{return not_found;
}
});
G__7808 = function(array,n,not_found){
switch(arguments.length){
case 2:
return G__7808__2.call(this,array,n);
case 3:
return G__7808__3.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7808;
})()
);
(cljs.core.ICounted["array"] = true);
(cljs.core._count["array"] = (function (a){
return a.length;
}));
(cljs.core.ISeqable["array"] = true);
(cljs.core._seq["array"] = (function (array){
return cljs.core.array_seq.call(null,array,0);
}));

/**
* @constructor
*/
cljs.core.RSeq = (function (ci,i,meta){
this.ci = ci;
this.i = i;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850570;
})
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/RSeq");
});
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7809 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7810 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.RSeq.prototype.toString = (function (){
var this__7811 = this;
var this__7812 = this;
return cljs.core.pr_str.call(null,this__7812);
});
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7813 = this;
return coll;
});
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7814 = this;
return (this__7814.i + 1);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7815 = this;
return cljs.core._nth.call(null,this__7815.ci,this__7815.i);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7816 = this;
if((this__7816.i > 0))
{return (new cljs.core.RSeq(this__7816.ci,(this__7816.i - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7817 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var this__7818 = this;
return (new cljs.core.RSeq(this__7818.ci,this__7818.i,new_meta));
});
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7819 = this;
return this__7819.meta;
});
cljs.core.RSeq;
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__7823__7824 = coll;
if(G__7823__7824)
{if((function (){var or__3824__auto____7825 = (G__7823__7824.cljs$lang$protocol_mask$partition0$ & 32);
if(or__3824__auto____7825)
{return or__3824__auto____7825;
} else
{return G__7823__7824.cljs$core$ASeq$;
}
})())
{return true;
} else
{if((!G__7823__7824.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__7823__7824);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__7823__7824);
}
})())
{return coll;
} else
{return cljs.core._seq.call(null,coll);
}
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__7830__7831 = coll;
if(G__7830__7831)
{if((function (){var or__3824__auto____7832 = (G__7830__7831.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7832)
{return or__3824__auto____7832;
} else
{return G__7830__7831.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7830__7831.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7830__7831);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7830__7831);
}
})())
{return cljs.core._first.call(null,coll);
} else
{var s__7833 = cljs.core.seq.call(null,coll);
if((s__7833 == null))
{return null;
} else
{return cljs.core._first.call(null,s__7833);
}
}
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
if(!((coll == null)))
{if((function (){var G__7838__7839 = coll;
if(G__7838__7839)
{if((function (){var or__3824__auto____7840 = (G__7838__7839.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7840)
{return or__3824__auto____7840;
} else
{return G__7838__7839.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7838__7839.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7838__7839);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7838__7839);
}
})())
{return cljs.core._rest.call(null,coll);
} else
{var s__7841 = cljs.core.seq.call(null,coll);
if(!((s__7841 == null)))
{return cljs.core._rest.call(null,s__7841);
} else
{return cljs.core.List.EMPTY;
}
}
} else
{return cljs.core.List.EMPTY;
}
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__7845__7846 = coll;
if(G__7845__7846)
{if((function (){var or__3824__auto____7847 = (G__7845__7846.cljs$lang$protocol_mask$partition0$ & 128);
if(or__3824__auto____7847)
{return or__3824__auto____7847;
} else
{return G__7845__7846.cljs$core$INext$;
}
})())
{return true;
} else
{if((!G__7845__7846.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__7845__7846);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__7845__7846);
}
})())
{return cljs.core._next.call(null,coll);
} else
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
}
}
});
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
var sn__7849 = cljs.core.next.call(null,s);
if(!((sn__7849 == null)))
{{
var G__7850 = sn__7849;
s = G__7850;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
(cljs.core.IEquiv["_"] = true);
(cljs.core._equiv["_"] = (function (x,o){
return (x === o);
}));
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__2 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__3 = (function() { 
var G__7851__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__7852 = conj.call(null,coll,x);
var G__7853 = cljs.core.first.call(null,xs);
var G__7854 = cljs.core.next.call(null,xs);
coll = G__7852;
x = G__7853;
xs = G__7854;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__7851 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7851__delegate.call(this, coll, x, xs);
};
G__7851.cljs$lang$maxFixedArity = 2;
G__7851.cljs$lang$applyTo = (function (arglist__7855){
var coll = cljs.core.first(arglist__7855);
var x = cljs.core.first(cljs.core.next(arglist__7855));
var xs = cljs.core.rest(cljs.core.next(arglist__7855));
return G__7851__delegate(coll, x, xs);
});
G__7851.cljs$lang$arity$variadic = G__7851__delegate;
return G__7851;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case 2:
return conj__2.call(this,coll,x);
default:
return conj__3.cljs$lang$arity$variadic(coll,x, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
conj.cljs$lang$arity$2 = conj__2;
conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
cljs.core.accumulating_seq_count = (function accumulating_seq_count(coll){
var s__7858 = cljs.core.seq.call(null,coll);
var acc__7859 = 0;
while(true){
if(cljs.core.counted_QMARK_.call(null,s__7858))
{return (acc__7859 + cljs.core._count.call(null,s__7858));
} else
{{
var G__7860 = cljs.core.next.call(null,s__7858);
var G__7861 = (acc__7859 + 1);
s__7858 = G__7860;
acc__7859 = G__7861;
continue;
}
}
break;
}
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
if(cljs.core.counted_QMARK_.call(null,coll))
{return cljs.core._count.call(null,coll);
} else
{return cljs.core.accumulating_seq_count.call(null,coll);
}
});
cljs.core.linear_traversal_nth = (function() {
var linear_traversal_nth = null;
var linear_traversal_nth__2 = (function (coll,n){
if((coll == null))
{throw (new Error("Index out of bounds"));
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{throw (new Error("Index out of bounds"));
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n);
} else
{if(cljs.core.seq.call(null,coll))
{return linear_traversal_nth.call(null,cljs.core.next.call(null,coll),(n - 1));
} else
{if("\uFDD0'else")
{throw (new Error("Index out of bounds"));
} else
{return null;
}
}
}
}
}
});
var linear_traversal_nth__3 = (function (coll,n,not_found){
if((coll == null))
{return not_found;
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{return not_found;
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n,not_found);
} else
{if(cljs.core.seq.call(null,coll))
{return linear_traversal_nth.call(null,cljs.core.next.call(null,coll),(n - 1),not_found);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
}
});
linear_traversal_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return linear_traversal_nth__2.call(this,coll,n);
case 3:
return linear_traversal_nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
return linear_traversal_nth;
})()
;
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__2 = (function (coll,n){
if((coll == null))
{return null;
} else
{if((function (){var G__7868__7869 = coll;
if(G__7868__7869)
{if((function (){var or__3824__auto____7870 = (G__7868__7869.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7870)
{return or__3824__auto____7870;
} else
{return G__7868__7869.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7868__7869.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7868__7869);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7868__7869);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n));
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n));
}
}
});
var nth__3 = (function (coll,n,not_found){
if(!((coll == null)))
{if((function (){var G__7871__7872 = coll;
if(G__7871__7872)
{if((function (){var or__3824__auto____7873 = (G__7871__7872.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7873)
{return or__3824__auto____7873;
} else
{return G__7871__7872.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7871__7872.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7871__7872);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7871__7872);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n),not_found);
}
} else
{return not_found;
}
});
nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return nth__2.call(this,coll,n);
case 3:
return nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
nth.cljs$lang$arity$2 = nth__2;
nth.cljs$lang$arity$3 = nth__3;
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__2 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__3 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case 2:
return get__2.call(this,o,k);
case 3:
return get__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get.cljs$lang$arity$2 = get__2;
get.cljs$lang$arity$3 = get__3;
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__3 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__4 = (function() { 
var G__7876__delegate = function (coll,k,v,kvs){
while(true){
var ret__7875 = assoc.call(null,coll,k,v);
if(cljs.core.truth_(kvs))
{{
var G__7877 = ret__7875;
var G__7878 = cljs.core.first.call(null,kvs);
var G__7879 = cljs.core.second.call(null,kvs);
var G__7880 = cljs.core.nnext.call(null,kvs);
coll = G__7877;
k = G__7878;
v = G__7879;
kvs = G__7880;
continue;
}
} else
{return ret__7875;
}
break;
}
};
var G__7876 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7876__delegate.call(this, coll, k, v, kvs);
};
G__7876.cljs$lang$maxFixedArity = 3;
G__7876.cljs$lang$applyTo = (function (arglist__7881){
var coll = cljs.core.first(arglist__7881);
var k = cljs.core.first(cljs.core.next(arglist__7881));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7881)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7881)));
return G__7876__delegate(coll, k, v, kvs);
});
G__7876.cljs$lang$arity$variadic = G__7876__delegate;
return G__7876;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 3:
return assoc__3.call(this,coll,k,v);
default:
return assoc__4.cljs$lang$arity$variadic(coll,k,v, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
assoc.cljs$lang$arity$3 = assoc__3;
assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__1 = (function (coll){
return coll;
});
var dissoc__2 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__3 = (function() { 
var G__7884__delegate = function (coll,k,ks){
while(true){
var ret__7883 = dissoc.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__7885 = ret__7883;
var G__7886 = cljs.core.first.call(null,ks);
var G__7887 = cljs.core.next.call(null,ks);
coll = G__7885;
k = G__7886;
ks = G__7887;
continue;
}
} else
{return ret__7883;
}
break;
}
};
var G__7884 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7884__delegate.call(this, coll, k, ks);
};
G__7884.cljs$lang$maxFixedArity = 2;
G__7884.cljs$lang$applyTo = (function (arglist__7888){
var coll = cljs.core.first(arglist__7888);
var k = cljs.core.first(cljs.core.next(arglist__7888));
var ks = cljs.core.rest(cljs.core.next(arglist__7888));
return G__7884__delegate(coll, k, ks);
});
G__7884.cljs$lang$arity$variadic = G__7884__delegate;
return G__7884;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return dissoc__1.call(this,coll);
case 2:
return dissoc__2.call(this,coll,k);
default:
return dissoc__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
dissoc.cljs$lang$arity$1 = dissoc__1;
dissoc.cljs$lang$arity$2 = dissoc__2;
dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if((function (){var G__7892__7893 = o;
if(G__7892__7893)
{if((function (){var or__3824__auto____7894 = (G__7892__7893.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____7894)
{return or__3824__auto____7894;
} else
{return G__7892__7893.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__7892__7893.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7892__7893);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7892__7893);
}
})())
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__1 = (function (coll){
return coll;
});
var disj__2 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__3 = (function() { 
var G__7897__delegate = function (coll,k,ks){
while(true){
var ret__7896 = disj.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__7898 = ret__7896;
var G__7899 = cljs.core.first.call(null,ks);
var G__7900 = cljs.core.next.call(null,ks);
coll = G__7898;
k = G__7899;
ks = G__7900;
continue;
}
} else
{return ret__7896;
}
break;
}
};
var G__7897 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7897__delegate.call(this, coll, k, ks);
};
G__7897.cljs$lang$maxFixedArity = 2;
G__7897.cljs$lang$applyTo = (function (arglist__7901){
var coll = cljs.core.first(arglist__7901);
var k = cljs.core.first(cljs.core.next(arglist__7901));
var ks = cljs.core.rest(cljs.core.next(arglist__7901));
return G__7897__delegate(coll, k, ks);
});
G__7897.cljs$lang$arity$variadic = G__7897__delegate;
return G__7897;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return disj__1.call(this,coll);
case 2:
return disj__2.call(this,coll,k);
default:
return disj__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
disj.cljs$lang$arity$1 = disj__1;
disj.cljs$lang$arity$2 = disj__2;
disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
return disj;
})()
;
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = (function add_to_string_hash_cache(k){
var h__7903 = goog.string.hashCode(k);
(cljs.core.string_hash_cache[k] = h__7903);
cljs.core.string_hash_cache_count = (cljs.core.string_hash_cache_count + 1);
return h__7903;
});
cljs.core.check_string_hash_cache = (function check_string_hash_cache(k){
if((cljs.core.string_hash_cache_count > 255))
{cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
} else
{}
var h__7905 = (cljs.core.string_hash_cache[k]);
if(!((h__7905 == null)))
{return h__7905;
} else
{return cljs.core.add_to_string_hash_cache.call(null,k);
}
});
cljs.core.hash = (function() {
var hash = null;
var hash__1 = (function (o){
return hash.call(null,o,true);
});
var hash__2 = (function (o,check_cache){
if((function (){var and__3822__auto____7907 = goog.isString(o);
if(and__3822__auto____7907)
{return check_cache;
} else
{return and__3822__auto____7907;
}
})())
{return cljs.core.check_string_hash_cache.call(null,o);
} else
{return cljs.core._hash.call(null,o);
}
});
hash = function(o,check_cache){
switch(arguments.length){
case 1:
return hash__1.call(this,o);
case 2:
return hash__2.call(this,o,check_cache);
}
throw('Invalid arity: ' + arguments.length);
};
hash.cljs$lang$arity$1 = hash__1;
hash.cljs$lang$arity$2 = hash__2;
return hash;
})()
;
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7911__7912 = x;
if(G__7911__7912)
{if((function (){var or__3824__auto____7913 = (G__7911__7912.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3824__auto____7913)
{return or__3824__auto____7913;
} else
{return G__7911__7912.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__7911__7912.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7911__7912);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7911__7912);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7917__7918 = x;
if(G__7917__7918)
{if((function (){var or__3824__auto____7919 = (G__7917__7918.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3824__auto____7919)
{return or__3824__auto____7919;
} else
{return G__7917__7918.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__7917__7918.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7917__7918);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7917__7918);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var G__7923__7924 = x;
if(G__7923__7924)
{if((function (){var or__3824__auto____7925 = (G__7923__7924.cljs$lang$protocol_mask$partition0$ & 512);
if(or__3824__auto____7925)
{return or__3824__auto____7925;
} else
{return G__7923__7924.cljs$core$IAssociative$;
}
})())
{return true;
} else
{if((!G__7923__7924.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7923__7924);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7923__7924);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var G__7929__7930 = x;
if(G__7929__7930)
{if((function (){var or__3824__auto____7931 = (G__7929__7930.cljs$lang$protocol_mask$partition0$ & 16777216);
if(or__3824__auto____7931)
{return or__3824__auto____7931;
} else
{return G__7929__7930.cljs$core$ISequential$;
}
})())
{return true;
} else
{if((!G__7929__7930.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7929__7930);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7929__7930);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var G__7935__7936 = x;
if(G__7935__7936)
{if((function (){var or__3824__auto____7937 = (G__7935__7936.cljs$lang$protocol_mask$partition0$ & 2);
if(or__3824__auto____7937)
{return or__3824__auto____7937;
} else
{return G__7935__7936.cljs$core$ICounted$;
}
})())
{return true;
} else
{if((!G__7935__7936.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7935__7936);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__7935__7936);
}
});
/**
* Returns true if coll implements nth in constant time
*/
cljs.core.indexed_QMARK_ = (function indexed_QMARK_(x){
var G__7941__7942 = x;
if(G__7941__7942)
{if((function (){var or__3824__auto____7943 = (G__7941__7942.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3824__auto____7943)
{return or__3824__auto____7943;
} else
{return G__7941__7942.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__7941__7942.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7941__7942);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__7941__7942);
}
});
/**
* Returns true if coll satisfies IReduce
*/
cljs.core.reduceable_QMARK_ = (function reduceable_QMARK_(x){
var G__7947__7948 = x;
if(G__7947__7948)
{if((function (){var or__3824__auto____7949 = (G__7947__7948.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____7949)
{return or__3824__auto____7949;
} else
{return G__7947__7948.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7947__7948.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7947__7948);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7947__7948);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7953__7954 = x;
if(G__7953__7954)
{if((function (){var or__3824__auto____7955 = (G__7953__7954.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3824__auto____7955)
{return or__3824__auto____7955;
} else
{return G__7953__7954.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__7953__7954.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7953__7954);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7953__7954);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var G__7959__7960 = x;
if(G__7959__7960)
{if((function (){var or__3824__auto____7961 = (G__7959__7960.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3824__auto____7961)
{return or__3824__auto____7961;
} else
{return G__7959__7960.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__7959__7960.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7959__7960);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7959__7960);
}
});
cljs.core.chunked_seq_QMARK_ = (function chunked_seq_QMARK_(x){
var G__7965__7966 = x;
if(G__7965__7966)
{if(cljs.core.truth_((function (){var or__3824__auto____7967 = null;
if(cljs.core.truth_(or__3824__auto____7967))
{return or__3824__auto____7967;
} else
{return G__7965__7966.cljs$core$IChunkedSeq$;
}
})()))
{return true;
} else
{if((!G__7965__7966.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7965__7966);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7965__7966);
}
});
/**
* @param {...*} var_args
*/
cljs.core.js_obj = (function() {
var js_obj = null;
var js_obj__0 = (function (){
return {};
});
var js_obj__1 = (function() { 
var G__7968__delegate = function (keyvals){
return cljs.core.apply.call(null,goog.object.create,keyvals);
};
var G__7968 = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7968__delegate.call(this, keyvals);
};
G__7968.cljs$lang$maxFixedArity = 0;
G__7968.cljs$lang$applyTo = (function (arglist__7969){
var keyvals = cljs.core.seq(arglist__7969);;
return G__7968__delegate(keyvals);
});
G__7968.cljs$lang$arity$variadic = G__7968__delegate;
return G__7968;
})()
;
js_obj = function(var_args){
var keyvals = var_args;
switch(arguments.length){
case 0:
return js_obj__0.call(this);
default:
return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
js_obj.cljs$lang$maxFixedArity = 0;
js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
js_obj.cljs$lang$arity$0 = js_obj__0;
js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
return js_obj;
})()
;
cljs.core.js_keys = (function js_keys(obj){
var keys__7971 = [];
goog.object.forEach(obj,(function (val,key,obj){
return keys__7971.push(key);
}));
return keys__7971;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.array_copy = (function array_copy(from,i,to,j,len){
var i__7975 = i;
var j__7976 = j;
var len__7977 = len;
while(true){
if((len__7977 === 0))
{return to;
} else
{(to[j__7976] = (from[i__7975]));
{
var G__7978 = (i__7975 + 1);
var G__7979 = (j__7976 + 1);
var G__7980 = (len__7977 - 1);
i__7975 = G__7978;
j__7976 = G__7979;
len__7977 = G__7980;
continue;
}
}
break;
}
});
cljs.core.array_copy_downward = (function array_copy_downward(from,i,to,j,len){
var i__7984 = (i + (len - 1));
var j__7985 = (j + (len - 1));
var len__7986 = len;
while(true){
if((len__7986 === 0))
{return to;
} else
{(to[j__7985] = (from[i__7984]));
{
var G__7987 = (i__7984 - 1);
var G__7988 = (j__7985 - 1);
var G__7989 = (len__7986 - 1);
i__7984 = G__7987;
j__7985 = G__7988;
len__7986 = G__7989;
continue;
}
}
break;
}
});
cljs.core.lookup_sentinel = {};
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if((s == null))
{return false;
} else
{var G__7993__7994 = s;
if(G__7993__7994)
{if((function (){var or__3824__auto____7995 = (G__7993__7994.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____7995)
{return or__3824__auto____7995;
} else
{return G__7993__7994.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7993__7994.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7993__7994);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7993__7994);
}
}
});
/**
* Return true if s satisfies ISeqable
*/
cljs.core.seqable_QMARK_ = (function seqable_QMARK_(s){
var G__7999__8000 = s;
if(G__7999__8000)
{if((function (){var or__3824__auto____8001 = (G__7999__8000.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3824__auto____8001)
{return or__3824__auto____8001;
} else
{return G__7999__8000.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__7999__8000.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7999__8000);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7999__8000);
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3822__auto____8004 = goog.isString(x);
if(and__3822__auto____8004)
{return !((function (){var or__3824__auto____8005 = (x.charAt(0) === "\uFDD0");
if(or__3824__auto____8005)
{return or__3824__auto____8005;
} else
{return (x.charAt(0) === "\uFDD1");
}
})());
} else
{return and__3822__auto____8004;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3822__auto____8007 = goog.isString(x);
if(and__3822__auto____8007)
{return (x.charAt(0) === "\uFDD0");
} else
{return and__3822__auto____8007;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3822__auto____8009 = goog.isString(x);
if(and__3822__auto____8009)
{return (x.charAt(0) === "\uFDD1");
} else
{return and__3822__auto____8009;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber(n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction(f);
});
cljs.core.ifn_QMARK_ = (function ifn_QMARK_(f){
var or__3824__auto____8014 = cljs.core.fn_QMARK_.call(null,f);
if(or__3824__auto____8014)
{return or__3824__auto____8014;
} else
{var G__8015__8016 = f;
if(G__8015__8016)
{if((function (){var or__3824__auto____8017 = (G__8015__8016.cljs$lang$protocol_mask$partition0$ & 1);
if(or__3824__auto____8017)
{return or__3824__auto____8017;
} else
{return G__8015__8016.cljs$core$IFn$;
}
})())
{return true;
} else
{if((!G__8015__8016.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__8015__8016);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__8015__8016);
}
}
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3822__auto____8019 = cljs.core.number_QMARK_.call(null,n);
if(and__3822__auto____8019)
{return (n == n.toFixed());
} else
{return and__3822__auto____8019;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if((cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if(cljs.core.truth_((function (){var and__3822__auto____8022 = coll;
if(cljs.core.truth_(and__3822__auto____8022))
{var and__3822__auto____8023 = cljs.core.associative_QMARK_.call(null,coll);
if(and__3822__auto____8023)
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3822__auto____8023;
}
} else
{return and__3822__auto____8022;
}
})()))
{return cljs.core.PersistentVector.fromArray([k,cljs.core._lookup.call(null,coll,k)], true);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___1 = (function (x){
return true;
});
var distinct_QMARK___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___3 = (function() { 
var G__8032__delegate = function (x,y,more){
if(!(cljs.core._EQ_.call(null,x,y)))
{var s__8028 = cljs.core.PersistentHashSet.fromArray([y,x]);
var xs__8029 = more;
while(true){
var x__8030 = cljs.core.first.call(null,xs__8029);
var etc__8031 = cljs.core.next.call(null,xs__8029);
if(cljs.core.truth_(xs__8029))
{if(cljs.core.contains_QMARK_.call(null,s__8028,x__8030))
{return false;
} else
{{
var G__8033 = cljs.core.conj.call(null,s__8028,x__8030);
var G__8034 = etc__8031;
s__8028 = G__8033;
xs__8029 = G__8034;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__8032 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8032__delegate.call(this, x, y, more);
};
G__8032.cljs$lang$maxFixedArity = 2;
G__8032.cljs$lang$applyTo = (function (arglist__8035){
var x = cljs.core.first(arglist__8035);
var y = cljs.core.first(cljs.core.next(arglist__8035));
var more = cljs.core.rest(cljs.core.next(arglist__8035));
return G__8032__delegate(x, y, more);
});
G__8032.cljs$lang$arity$variadic = G__8032__delegate;
return G__8032;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return distinct_QMARK___1.call(this,x);
case 2:
return distinct_QMARK___2.call(this,x,y);
default:
return distinct_QMARK___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses IComparable if available and google.array.defaultCompare for objects
* of the same type and special-cases nil to be less than any other object.
*/
cljs.core.compare = (function compare(x,y){
if((x === y))
{return 0;
} else
{if((x == null))
{return -1;
} else
{if((y == null))
{return 1;
} else
{if((cljs.core.type.call(null,x) === cljs.core.type.call(null,y)))
{if((function (){var G__8039__8040 = x;
if(G__8039__8040)
{if(cljs.core.truth_((function (){var or__3824__auto____8041 = null;
if(cljs.core.truth_(or__3824__auto____8041))
{return or__3824__auto____8041;
} else
{return G__8039__8040.cljs$core$IComparable$;
}
})()))
{return true;
} else
{if((!G__8039__8040.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__8039__8040);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__8039__8040);
}
})())
{return cljs.core._compare.call(null,x,y);
} else
{return goog.array.defaultCompare(x,y);
}
} else
{if("\uFDD0'else")
{throw (new Error("compare on non-nil objects of different types"));
} else
{return null;
}
}
}
}
}
});
/**
* Compare indexed collection.
*/
cljs.core.compare_indexed = (function() {
var compare_indexed = null;
var compare_indexed__2 = (function (xs,ys){
var xl__8046 = cljs.core.count.call(null,xs);
var yl__8047 = cljs.core.count.call(null,ys);
if((xl__8046 < yl__8047))
{return -1;
} else
{if((xl__8046 > yl__8047))
{return 1;
} else
{if("\uFDD0'else")
{return compare_indexed.call(null,xs,ys,xl__8046,0);
} else
{return null;
}
}
}
});
var compare_indexed__4 = (function (xs,ys,len,n){
while(true){
var d__8048 = cljs.core.compare.call(null,cljs.core.nth.call(null,xs,n),cljs.core.nth.call(null,ys,n));
if((function (){var and__3822__auto____8049 = (d__8048 === 0);
if(and__3822__auto____8049)
{return ((n + 1) < len);
} else
{return and__3822__auto____8049;
}
})())
{{
var G__8050 = xs;
var G__8051 = ys;
var G__8052 = len;
var G__8053 = (n + 1);
xs = G__8050;
ys = G__8051;
len = G__8052;
n = G__8053;
continue;
}
} else
{return d__8048;
}
break;
}
});
compare_indexed = function(xs,ys,len,n){
switch(arguments.length){
case 2:
return compare_indexed__2.call(this,xs,ys);
case 4:
return compare_indexed__4.call(this,xs,ys,len,n);
}
throw('Invalid arity: ' + arguments.length);
};
compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
return compare_indexed;
})()
;
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core._EQ_.call(null,f,cljs.core.compare))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__8055 = f.call(null,x,y);
if(cljs.core.number_QMARK_.call(null,r__8055))
{return r__8055;
} else
{if(cljs.core.truth_(r__8055))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__1 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__2 = (function (comp,coll){
if(cljs.core.seq.call(null,coll))
{var a__8057 = cljs.core.to_array.call(null,coll);
goog.array.stableSort(a__8057,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__8057);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case 1:
return sort__1.call(this,comp);
case 2:
return sort__2.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort.cljs$lang$arity$1 = sort__1;
sort.cljs$lang$arity$2 = sort__2;
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__2 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__3 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case 2:
return sort_by__2.call(this,keyfn,comp);
case 3:
return sort_by__3.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort_by.cljs$lang$arity$2 = sort_by__2;
sort_by.cljs$lang$arity$3 = sort_by__3;
return sort_by;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__2 = (function (f,coll){
var temp__3971__auto____8063 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____8063)
{var s__8064 = temp__3971__auto____8063;
return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__8064),cljs.core.next.call(null,s__8064));
} else
{return f.call(null);
}
});
var seq_reduce__3 = (function (f,val,coll){
var val__8065 = val;
var coll__8066 = cljs.core.seq.call(null,coll);
while(true){
if(coll__8066)
{var nval__8067 = f.call(null,val__8065,cljs.core.first.call(null,coll__8066));
if(cljs.core.reduced_QMARK_.call(null,nval__8067))
{return cljs.core.deref.call(null,nval__8067);
} else
{{
var G__8068 = nval__8067;
var G__8069 = cljs.core.next.call(null,coll__8066);
val__8065 = G__8068;
coll__8066 = G__8069;
continue;
}
}
} else
{return val__8065;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return seq_reduce__2.call(this,f,val);
case 3:
return seq_reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
return seq_reduce;
})()
;
/**
* Return a random permutation of coll
*/
cljs.core.shuffle = (function shuffle(coll){
var a__8071 = cljs.core.to_array.call(null,coll);
goog.array.shuffle(a__8071);
return cljs.core.vec.call(null,a__8071);
});
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__2 = (function (f,coll){
if((function (){var G__8078__8079 = coll;
if(G__8078__8079)
{if((function (){var or__3824__auto____8080 = (G__8078__8079.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____8080)
{return or__3824__auto____8080;
} else
{return G__8078__8079.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__8078__8079.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__8078__8079);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__8078__8079);
}
})())
{return cljs.core._reduce.call(null,coll,f);
} else
{return cljs.core.seq_reduce.call(null,f,coll);
}
});
var reduce__3 = (function (f,val,coll){
if((function (){var G__8081__8082 = coll;
if(G__8081__8082)
{if((function (){var or__3824__auto____8083 = (G__8081__8082.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3824__auto____8083)
{return or__3824__auto____8083;
} else
{return G__8081__8082.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__8081__8082.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__8081__8082);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__8081__8082);
}
})())
{return cljs.core._reduce.call(null,coll,f,val);
} else
{return cljs.core.seq_reduce.call(null,f,val,coll);
}
});
reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return reduce__2.call(this,f,val);
case 3:
return reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reduce.cljs$lang$arity$2 = reduce__2;
reduce.cljs$lang$arity$3 = reduce__3;
return reduce;
})()
;
/**
* Reduces an associative collection. f should be a function of 3
* arguments. Returns the result of applying f to init, the first key
* and the first value in coll, then applying f to that result and the
* 2nd key and value, etc. If coll contains no entries, returns init
* and f is not called. Note that reduce-kv is supported on vectors,
* where the keys will be the ordinals.
*/
cljs.core.reduce_kv = (function reduce_kv(f,init,coll){
return cljs.core._kv_reduce.call(null,coll,f,init);
});

/**
* @constructor
*/
cljs.core.Reduced = (function (val){
this.val = val;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32768;
})
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Reduced");
});
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var this__8084 = this;
return this__8084.val;
});
cljs.core.Reduced;
/**
* Returns true if x is the result of a call to reduced
*/
cljs.core.reduced_QMARK_ = (function reduced_QMARK_(r){
return cljs.core.instance_QMARK_.call(null,cljs.core.Reduced,r);
});
/**
* Wraps x in a way such that a reduce will terminate with the value x
*/
cljs.core.reduced = (function reduced(x){
return (new cljs.core.Reduced(x));
});
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___0 = (function (){
return 0;
});
var _PLUS___1 = (function (x){
return x;
});
var _PLUS___2 = (function (x,y){
return (x + y);
});
var _PLUS___3 = (function() { 
var G__8085__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,(x + y),more);
};
var G__8085 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8085__delegate.call(this, x, y, more);
};
G__8085.cljs$lang$maxFixedArity = 2;
G__8085.cljs$lang$applyTo = (function (arglist__8086){
var x = cljs.core.first(arglist__8086);
var y = cljs.core.first(cljs.core.next(arglist__8086));
var more = cljs.core.rest(cljs.core.next(arglist__8086));
return G__8085__delegate(x, y, more);
});
G__8085.cljs$lang$arity$variadic = G__8085__delegate;
return G__8085;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _PLUS___0.call(this);
case 1:
return _PLUS___1.call(this,x);
case 2:
return _PLUS___2.call(this,x,y);
default:
return _PLUS___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
_PLUS_.cljs$lang$arity$0 = _PLUS___0;
_PLUS_.cljs$lang$arity$1 = _PLUS___1;
_PLUS_.cljs$lang$arity$2 = _PLUS___2;
_PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___1 = (function (x){
return (- x);
});
var ___2 = (function (x,y){
return (x - y);
});
var ___3 = (function() { 
var G__8087__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,(x - y),more);
};
var G__8087 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8087__delegate.call(this, x, y, more);
};
G__8087.cljs$lang$maxFixedArity = 2;
G__8087.cljs$lang$applyTo = (function (arglist__8088){
var x = cljs.core.first(arglist__8088);
var y = cljs.core.first(cljs.core.next(arglist__8088));
var more = cljs.core.rest(cljs.core.next(arglist__8088));
return G__8087__delegate(x, y, more);
});
G__8087.cljs$lang$arity$variadic = G__8087__delegate;
return G__8087;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return ___1.call(this,x);
case 2:
return ___2.call(this,x,y);
default:
return ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
_.cljs$lang$arity$1 = ___1;
_.cljs$lang$arity$2 = ___2;
_.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___0 = (function (){
return 1;
});
var _STAR___1 = (function (x){
return x;
});
var _STAR___2 = (function (x,y){
return (x * y);
});
var _STAR___3 = (function() { 
var G__8089__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,(x * y),more);
};
var G__8089 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8089__delegate.call(this, x, y, more);
};
G__8089.cljs$lang$maxFixedArity = 2;
G__8089.cljs$lang$applyTo = (function (arglist__8090){
var x = cljs.core.first(arglist__8090);
var y = cljs.core.first(cljs.core.next(arglist__8090));
var more = cljs.core.rest(cljs.core.next(arglist__8090));
return G__8089__delegate(x, y, more);
});
G__8089.cljs$lang$arity$variadic = G__8089__delegate;
return G__8089;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _STAR___0.call(this);
case 1:
return _STAR___1.call(this,x);
case 2:
return _STAR___2.call(this,x,y);
default:
return _STAR___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
_STAR_.cljs$lang$arity$0 = _STAR___0;
_STAR_.cljs$lang$arity$1 = _STAR___1;
_STAR_.cljs$lang$arity$2 = _STAR___2;
_STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___1 = (function (x){
return _SLASH_.call(null,1,x);
});
var _SLASH___2 = (function (x,y){
return (x / y);
});
var _SLASH___3 = (function() { 
var G__8091__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__8091 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8091__delegate.call(this, x, y, more);
};
G__8091.cljs$lang$maxFixedArity = 2;
G__8091.cljs$lang$applyTo = (function (arglist__8092){
var x = cljs.core.first(arglist__8092);
var y = cljs.core.first(cljs.core.next(arglist__8092));
var more = cljs.core.rest(cljs.core.next(arglist__8092));
return G__8091__delegate(x, y, more);
});
G__8091.cljs$lang$arity$variadic = G__8091__delegate;
return G__8091;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _SLASH___1.call(this,x);
case 2:
return _SLASH___2.call(this,x,y);
default:
return _SLASH___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
_SLASH_.cljs$lang$arity$1 = _SLASH___1;
_SLASH_.cljs$lang$arity$2 = _SLASH___2;
_SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___1 = (function (x){
return true;
});
var _LT___2 = (function (x,y){
return (x < y);
});
var _LT___3 = (function() { 
var G__8093__delegate = function (x,y,more){
while(true){
if((x < y))
{if(cljs.core.next.call(null,more))
{{
var G__8094 = y;
var G__8095 = cljs.core.first.call(null,more);
var G__8096 = cljs.core.next.call(null,more);
x = G__8094;
y = G__8095;
more = G__8096;
continue;
}
} else
{return (y < cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__8093 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8093__delegate.call(this, x, y, more);
};
G__8093.cljs$lang$maxFixedArity = 2;
G__8093.cljs$lang$applyTo = (function (arglist__8097){
var x = cljs.core.first(arglist__8097);
var y = cljs.core.first(cljs.core.next(arglist__8097));
var more = cljs.core.rest(cljs.core.next(arglist__8097));
return G__8093__delegate(x, y, more);
});
G__8093.cljs$lang$arity$variadic = G__8093__delegate;
return G__8093;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT___1.call(this,x);
case 2:
return _LT___2.call(this,x,y);
default:
return _LT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
_LT_.cljs$lang$arity$1 = _LT___1;
_LT_.cljs$lang$arity$2 = _LT___2;
_LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___1 = (function (x){
return true;
});
var _LT__EQ___2 = (function (x,y){
return (x <= y);
});
var _LT__EQ___3 = (function() { 
var G__8098__delegate = function (x,y,more){
while(true){
if((x <= y))
{if(cljs.core.next.call(null,more))
{{
var G__8099 = y;
var G__8100 = cljs.core.first.call(null,more);
var G__8101 = cljs.core.next.call(null,more);
x = G__8099;
y = G__8100;
more = G__8101;
continue;
}
} else
{return (y <= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__8098 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8098__delegate.call(this, x, y, more);
};
G__8098.cljs$lang$maxFixedArity = 2;
G__8098.cljs$lang$applyTo = (function (arglist__8102){
var x = cljs.core.first(arglist__8102);
var y = cljs.core.first(cljs.core.next(arglist__8102));
var more = cljs.core.rest(cljs.core.next(arglist__8102));
return G__8098__delegate(x, y, more);
});
G__8098.cljs$lang$arity$variadic = G__8098__delegate;
return G__8098;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT__EQ___1.call(this,x);
case 2:
return _LT__EQ___2.call(this,x,y);
default:
return _LT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
_LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
_LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
_LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___1 = (function (x){
return true;
});
var _GT___2 = (function (x,y){
return (x > y);
});
var _GT___3 = (function() { 
var G__8103__delegate = function (x,y,more){
while(true){
if((x > y))
{if(cljs.core.next.call(null,more))
{{
var G__8104 = y;
var G__8105 = cljs.core.first.call(null,more);
var G__8106 = cljs.core.next.call(null,more);
x = G__8104;
y = G__8105;
more = G__8106;
continue;
}
} else
{return (y > cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__8103 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8103__delegate.call(this, x, y, more);
};
G__8103.cljs$lang$maxFixedArity = 2;
G__8103.cljs$lang$applyTo = (function (arglist__8107){
var x = cljs.core.first(arglist__8107);
var y = cljs.core.first(cljs.core.next(arglist__8107));
var more = cljs.core.rest(cljs.core.next(arglist__8107));
return G__8103__delegate(x, y, more);
});
G__8103.cljs$lang$arity$variadic = G__8103__delegate;
return G__8103;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT___1.call(this,x);
case 2:
return _GT___2.call(this,x,y);
default:
return _GT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
_GT_.cljs$lang$arity$1 = _GT___1;
_GT_.cljs$lang$arity$2 = _GT___2;
_GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___1 = (function (x){
return true;
});
var _GT__EQ___2 = (function (x,y){
return (x >= y);
});
var _GT__EQ___3 = (function() { 
var G__8108__delegate = function (x,y,more){
while(true){
if((x >= y))
{if(cljs.core.next.call(null,more))
{{
var G__8109 = y;
var G__8110 = cljs.core.first.call(null,more);
var G__8111 = cljs.core.next.call(null,more);
x = G__8109;
y = G__8110;
more = G__8111;
continue;
}
} else
{return (y >= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__8108 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8108__delegate.call(this, x, y, more);
};
G__8108.cljs$lang$maxFixedArity = 2;
G__8108.cljs$lang$applyTo = (function (arglist__8112){
var x = cljs.core.first(arglist__8112);
var y = cljs.core.first(cljs.core.next(arglist__8112));
var more = cljs.core.rest(cljs.core.next(arglist__8112));
return G__8108__delegate(x, y, more);
});
G__8108.cljs$lang$arity$variadic = G__8108__delegate;
return G__8108;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT__EQ___1.call(this,x);
case 2:
return _GT__EQ___2.call(this,x,y);
default:
return _GT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
_GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
_GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
_GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return (x - 1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__1 = (function (x){
return x;
});
var max__2 = (function (x,y){
return ((x > y) ? x : y);
});
var max__3 = (function() { 
var G__8113__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,((x > y) ? x : y),more);
};
var G__8113 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8113__delegate.call(this, x, y, more);
};
G__8113.cljs$lang$maxFixedArity = 2;
G__8113.cljs$lang$applyTo = (function (arglist__8114){
var x = cljs.core.first(arglist__8114);
var y = cljs.core.first(cljs.core.next(arglist__8114));
var more = cljs.core.rest(cljs.core.next(arglist__8114));
return G__8113__delegate(x, y, more);
});
G__8113.cljs$lang$arity$variadic = G__8113__delegate;
return G__8113;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return max__1.call(this,x);
case 2:
return max__2.call(this,x,y);
default:
return max__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
max.cljs$lang$arity$1 = max__1;
max.cljs$lang$arity$2 = max__2;
max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__1 = (function (x){
return x;
});
var min__2 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3 = (function() { 
var G__8115__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,((x < y) ? x : y),more);
};
var G__8115 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8115__delegate.call(this, x, y, more);
};
G__8115.cljs$lang$maxFixedArity = 2;
G__8115.cljs$lang$applyTo = (function (arglist__8116){
var x = cljs.core.first(arglist__8116);
var y = cljs.core.first(cljs.core.next(arglist__8116));
var more = cljs.core.rest(cljs.core.next(arglist__8116));
return G__8115__delegate(x, y, more);
});
G__8115.cljs$lang$arity$variadic = G__8115__delegate;
return G__8115;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return min__1.call(this,x);
case 2:
return min__2.call(this,x,y);
default:
return min__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
min.cljs$lang$arity$1 = min__1;
min.cljs$lang$arity$2 = min__2;
min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
return min;
})()
;
cljs.core.fix = (function fix(q){
if((q >= 0))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Coerce to int by stripping decimal places.
*/
cljs.core.int$ = (function int$(x){
return cljs.core.fix.call(null,x);
});
/**
* Coerce to long by stripping decimal places. Identical to `int'.
*/
cljs.core.long$ = (function long$(x){
return cljs.core.fix.call(null,x);
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__8118 = (n % d);
return cljs.core.fix.call(null,((n - rem__8118) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__8120 = cljs.core.quot.call(null,n,d);
return (n - (d * q__8120));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return Math.random.call(null);
});
var rand__1 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~ x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Bitwise shift right with zero fill
*/
cljs.core.bit_shift_right_zero_fill = (function bit_shift_right_zero_fill(x,n){
return (x >>> n);
});
/**
* Counts the number of bits set in n
*/
cljs.core.bit_count = (function bit_count(v){
var v__8123 = (v - ((v >> 1) & 1431655765));
var v__8124 = ((v__8123 & 858993459) + ((v__8123 >> 2) & 858993459));
return ((((v__8124 + (v__8124 >> 4)) & 252645135) * 16843009) >> 24);
});
/**
* Returns non-nil if nums all have the equivalent
* value, otherwise false. Behavior on non nums is
* undefined.
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___1 = (function (x){
return true;
});
var _EQ__EQ___2 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3 = (function() { 
var G__8125__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__8126 = y;
var G__8127 = cljs.core.first.call(null,more);
var G__8128 = cljs.core.next.call(null,more);
x = G__8126;
y = G__8127;
more = G__8128;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__8125 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8125__delegate.call(this, x, y, more);
};
G__8125.cljs$lang$maxFixedArity = 2;
G__8125.cljs$lang$applyTo = (function (arglist__8129){
var x = cljs.core.first(arglist__8129);
var y = cljs.core.first(cljs.core.next(arglist__8129));
var more = cljs.core.rest(cljs.core.next(arglist__8129));
return G__8125__delegate(x, y, more);
});
G__8125.cljs$lang$arity$variadic = G__8125__delegate;
return G__8125;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ__EQ___1.call(this,x);
case 2:
return _EQ__EQ___2.call(this,x,y);
default:
return _EQ__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
_EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
_EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
_EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (n > 0);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (n === 0);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__8133 = n;
var xs__8134 = cljs.core.seq.call(null,coll);
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8135 = xs__8134;
if(and__3822__auto____8135)
{return (n__8133 > 0);
} else
{return and__3822__auto____8135;
}
})()))
{{
var G__8136 = (n__8133 - 1);
var G__8137 = cljs.core.next.call(null,xs__8134);
n__8133 = G__8136;
xs__8134 = G__8137;
continue;
}
} else
{return xs__8134;
}
break;
}
});
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___0 = (function (){
return "";
});
var str_STAR___1 = (function (x){
if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___2 = (function() { 
var G__8138__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__8139 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__8140 = cljs.core.next.call(null,more);
sb = G__8139;
more = G__8140;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__8138 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__8138__delegate.call(this, x, ys);
};
G__8138.cljs$lang$maxFixedArity = 1;
G__8138.cljs$lang$applyTo = (function (arglist__8141){
var x = cljs.core.first(arglist__8141);
var ys = cljs.core.rest(arglist__8141);
return G__8138__delegate(x, ys);
});
G__8138.cljs$lang$arity$variadic = G__8138__delegate;
return G__8138;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str_STAR___0.call(this);
case 1:
return str_STAR___1.call(this,x);
default:
return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
str_STAR_.cljs$lang$arity$0 = str_STAR___0;
str_STAR_.cljs$lang$arity$1 = str_STAR___1;
str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__0 = (function (){
return "";
});
var str__1 = (function (x){
if(cljs.core.symbol_QMARK_.call(null,x))
{return x.substring(2,x.length);
} else
{if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__2 = (function() { 
var G__8142__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__8143 = sb.append(str.call(null,cljs.core.first.call(null,more)));
var G__8144 = cljs.core.next.call(null,more);
sb = G__8143;
more = G__8144;
continue;
}
} else
{return cljs.core.str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str.call(null,x))),ys);
};
var G__8142 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__8142__delegate.call(this, x, ys);
};
G__8142.cljs$lang$maxFixedArity = 1;
G__8142.cljs$lang$applyTo = (function (arglist__8145){
var x = cljs.core.first(arglist__8145);
var ys = cljs.core.rest(arglist__8145);
return G__8142__delegate(x, ys);
});
G__8142.cljs$lang$arity$variadic = G__8142__delegate;
return G__8142;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str__0.call(this);
case 1:
return str__1.call(this,x);
default:
return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
str.cljs$lang$arity$0 = str__0;
str.cljs$lang$arity$1 = str__1;
str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__2 = (function (s,start){
return s.substring(start);
});
var subs__3 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case 2:
return subs__2.call(this,s,start);
case 3:
return subs__3.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subs.cljs$lang$arity$2 = subs__2;
subs.cljs$lang$arity$3 = subs__3;
return subs;
})()
;
/**
* Formats a string using goog.string.format.
* @param {...*} var_args
*/
cljs.core.format = (function() { 
var format__delegate = function (fmt,args){
return cljs.core.apply.call(null,goog.string.format,fmt,args);
};
var format = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return format__delegate.call(this, fmt, args);
};
format.cljs$lang$maxFixedArity = 1;
format.cljs$lang$applyTo = (function (arglist__8146){
var fmt = cljs.core.first(arglist__8146);
var args = cljs.core.rest(arglist__8146);
return format__delegate(fmt, args);
});
format.cljs$lang$arity$variadic = format__delegate;
return format;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__1 = (function (name){
if(cljs.core.symbol_QMARK_.call(null,name))
{name;
} else
{if(cljs.core.keyword_QMARK_.call(null,name))
{cljs.core.str_STAR_.call(null,"\uFDD1","'",cljs.core.subs.call(null,name,2));
} else
{}
}
return cljs.core.str_STAR_.call(null,"\uFDD1","'",name);
});
var symbol__2 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case 1:
return symbol__1.call(this,ns);
case 2:
return symbol__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
symbol.cljs$lang$arity$1 = symbol__1;
symbol.cljs$lang$arity$2 = symbol__2;
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__1 = (function (name){
if(cljs.core.keyword_QMARK_.call(null,name))
{return name;
} else
{if(cljs.core.symbol_QMARK_.call(null,name))
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",cljs.core.subs.call(null,name,2));
} else
{if("\uFDD0'else")
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",name);
} else
{return null;
}
}
}
});
var keyword__2 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case 1:
return keyword__1.call(this,ns);
case 2:
return keyword__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
keyword.cljs$lang$arity$1 = keyword__1;
keyword.cljs$lang$arity$2 = keyword__2;
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,((cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__8149 = cljs.core.seq.call(null,x);
var ys__8150 = cljs.core.seq.call(null,y);
while(true){
if((xs__8149 == null))
{return (ys__8150 == null);
} else
{if((ys__8150 == null))
{return false;
} else
{if(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__8149),cljs.core.first.call(null,ys__8150)))
{{
var G__8151 = cljs.core.next.call(null,xs__8149);
var G__8152 = cljs.core.next.call(null,ys__8150);
xs__8149 = G__8151;
ys__8150 = G__8152;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return (seed ^ (((hash + 2654435769) + (seed << 6)) + (seed >> 2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__8153_SHARP_,p2__8154_SHARP_){
return cljs.core.hash_combine.call(null,p1__8153_SHARP_,cljs.core.hash.call(null,p2__8154_SHARP_,false));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll),false),cljs.core.next.call(null,coll));
});
cljs.core.hash_imap = (function hash_imap(m){
var h__8158 = 0;
var s__8159 = cljs.core.seq.call(null,m);
while(true){
if(s__8159)
{var e__8160 = cljs.core.first.call(null,s__8159);
{
var G__8161 = ((h__8158 + (cljs.core.hash.call(null,cljs.core.key.call(null,e__8160)) ^ cljs.core.hash.call(null,cljs.core.val.call(null,e__8160)))) % 4503599627370496);
var G__8162 = cljs.core.next.call(null,s__8159);
h__8158 = G__8161;
s__8159 = G__8162;
continue;
}
} else
{return h__8158;
}
break;
}
});
cljs.core.hash_iset = (function hash_iset(s){
var h__8166 = 0;
var s__8167 = cljs.core.seq.call(null,s);
while(true){
if(s__8167)
{var e__8168 = cljs.core.first.call(null,s__8167);
{
var G__8169 = ((h__8166 + cljs.core.hash.call(null,e__8168)) % 4503599627370496);
var G__8170 = cljs.core.next.call(null,s__8167);
h__8166 = G__8169;
s__8167 = G__8170;
continue;
}
} else
{return h__8166;
}
break;
}
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__8191__8192 = cljs.core.seq.call(null,fn_map);
if(G__8191__8192)
{var G__8194__8196 = cljs.core.first.call(null,G__8191__8192);
var vec__8195__8197 = G__8194__8196;
var key_name__8198 = cljs.core.nth.call(null,vec__8195__8197,0,null);
var f__8199 = cljs.core.nth.call(null,vec__8195__8197,1,null);
var G__8191__8200 = G__8191__8192;
var G__8194__8201 = G__8194__8196;
var G__8191__8202 = G__8191__8200;
while(true){
var vec__8203__8204 = G__8194__8201;
var key_name__8205 = cljs.core.nth.call(null,vec__8203__8204,0,null);
var f__8206 = cljs.core.nth.call(null,vec__8203__8204,1,null);
var G__8191__8207 = G__8191__8202;
var str_name__8208 = cljs.core.name.call(null,key_name__8205);
(obj[str_name__8208] = f__8206);
var temp__3974__auto____8209 = cljs.core.next.call(null,G__8191__8207);
if(temp__3974__auto____8209)
{var G__8191__8210 = temp__3974__auto____8209;
{
var G__8211 = cljs.core.first.call(null,G__8191__8210);
var G__8212 = G__8191__8210;
G__8194__8201 = G__8211;
G__8191__8202 = G__8212;
continue;
}
} else
{}
break;
}
} else
{}
return obj;
});

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413358;
})
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/List");
});
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8213 = this;
var h__3049__auto____8214 = this__8213.__hash;
if(!((h__3049__auto____8214 == null)))
{return h__3049__auto____8214;
} else
{var h__3049__auto____8215 = cljs.core.hash_coll.call(null,coll);
this__8213.__hash = h__3049__auto____8215;
return h__3049__auto____8215;
}
});
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8216 = this;
if((this__8216.count === 1))
{return null;
} else
{return this__8216.rest;
}
});
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8217 = this;
return (new cljs.core.List(this__8217.meta,o,coll,(this__8217.count + 1),null));
});
cljs.core.List.prototype.toString = (function (){
var this__8218 = this;
var this__8219 = this;
return cljs.core.pr_str.call(null,this__8219);
});
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8220 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8221 = this;
return this__8221.count;
});
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8222 = this;
return this__8222.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8223 = this;
return coll.cljs$core$ISeq$_rest$arity$1(coll);
});
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8224 = this;
return this__8224.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8225 = this;
if((this__8225.count === 1))
{return cljs.core.List.EMPTY;
} else
{return this__8225.rest;
}
});
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8226 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8227 = this;
return (new cljs.core.List(meta,this__8227.first,this__8227.rest,this__8227.count,this__8227.__hash));
});
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8228 = this;
return this__8228.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8229 = this;
return cljs.core.List.EMPTY;
});
cljs.core.List;

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413326;
})
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/EmptyList");
});
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8230 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8231 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8232 = this;
return (new cljs.core.List(this__8232.meta,o,null,1,null));
});
cljs.core.EmptyList.prototype.toString = (function (){
var this__8233 = this;
var this__8234 = this;
return cljs.core.pr_str.call(null,this__8234);
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8235 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8236 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8237 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8238 = this;
throw (new Error("Can't pop empty list"));
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8239 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8240 = this;
return cljs.core.List.EMPTY;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8241 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8242 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8243 = this;
return this__8243.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8244 = this;
return coll;
});
cljs.core.EmptyList;
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
cljs.core.reversible_QMARK_ = (function reversible_QMARK_(coll){
var G__8248__8249 = coll;
if(G__8248__8249)
{if((function (){var or__3824__auto____8250 = (G__8248__8249.cljs$lang$protocol_mask$partition0$ & 134217728);
if(or__3824__auto____8250)
{return or__3824__auto____8250;
} else
{return G__8248__8249.cljs$core$IReversible$;
}
})())
{return true;
} else
{if((!G__8248__8249.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__8248__8249);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__8248__8249);
}
});
cljs.core.rseq = (function rseq(coll){
return cljs.core._rseq.call(null,coll);
});
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
if(cljs.core.reversible_QMARK_.call(null,coll))
{return cljs.core.rseq.call(null,coll);
} else
{return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
}
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() {
var list = null;
var list__0 = (function (){
return cljs.core.List.EMPTY;
});
var list__1 = (function (x){
return cljs.core.conj.call(null,cljs.core.List.EMPTY,x);
});
var list__2 = (function (x,y){
return cljs.core.conj.call(null,list.call(null,y),x);
});
var list__3 = (function (x,y,z){
return cljs.core.conj.call(null,list.call(null,y,z),x);
});
var list__4 = (function() { 
var G__8251__delegate = function (x,y,z,items){
return cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items)),z),y),x);
};
var G__8251 = function (x,y,z,var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8251__delegate.call(this, x, y, z, items);
};
G__8251.cljs$lang$maxFixedArity = 3;
G__8251.cljs$lang$applyTo = (function (arglist__8252){
var x = cljs.core.first(arglist__8252);
var y = cljs.core.first(cljs.core.next(arglist__8252));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8252)));
var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8252)));
return G__8251__delegate(x, y, z, items);
});
G__8251.cljs$lang$arity$variadic = G__8251__delegate;
return G__8251;
})()
;
list = function(x,y,z,var_args){
var items = var_args;
switch(arguments.length){
case 0:
return list__0.call(this);
case 1:
return list__1.call(this,x);
case 2:
return list__2.call(this,x,y);
case 3:
return list__3.call(this,x,y,z);
default:
return list__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
list.cljs$lang$maxFixedArity = 3;
list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
list.cljs$lang$arity$0 = list__0;
list.cljs$lang$arity$1 = list__1;
list.cljs$lang$arity$2 = list__2;
list.cljs$lang$arity$3 = list__3;
list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
return list;
})()
;

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65405164;
})
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Cons");
});
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8253 = this;
var h__3049__auto____8254 = this__8253.__hash;
if(!((h__3049__auto____8254 == null)))
{return h__3049__auto____8254;
} else
{var h__3049__auto____8255 = cljs.core.hash_coll.call(null,coll);
this__8253.__hash = h__3049__auto____8255;
return h__3049__auto____8255;
}
});
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8256 = this;
if((this__8256.rest == null))
{return null;
} else
{return cljs.core._seq.call(null,this__8256.rest);
}
});
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8257 = this;
return (new cljs.core.Cons(null,o,coll,this__8257.__hash));
});
cljs.core.Cons.prototype.toString = (function (){
var this__8258 = this;
var this__8259 = this;
return cljs.core.pr_str.call(null,this__8259);
});
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8260 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8261 = this;
return this__8261.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8262 = this;
if((this__8262.rest == null))
{return cljs.core.List.EMPTY;
} else
{return this__8262.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8263 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8264 = this;
return (new cljs.core.Cons(meta,this__8264.first,this__8264.rest,this__8264.__hash));
});
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8265 = this;
return this__8265.meta;
});
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8266 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8266.meta);
});
cljs.core.Cons;
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,coll){
if((function (){var or__3824__auto____8271 = (coll == null);
if(or__3824__auto____8271)
{return or__3824__auto____8271;
} else
{var G__8272__8273 = coll;
if(G__8272__8273)
{if((function (){var or__3824__auto____8274 = (G__8272__8273.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto____8274)
{return or__3824__auto____8274;
} else
{return G__8272__8273.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__8272__8273.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__8272__8273);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__8272__8273);
}
}
})())
{return (new cljs.core.Cons(null,x,coll,null));
} else
{return (new cljs.core.Cons(null,x,cljs.core.seq.call(null,coll),null));
}
});
cljs.core.list_QMARK_ = (function list_QMARK_(x){
var G__8278__8279 = x;
if(G__8278__8279)
{if((function (){var or__3824__auto____8280 = (G__8278__8279.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3824__auto____8280)
{return or__3824__auto____8280;
} else
{return G__8278__8279.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__8278__8279.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__8278__8279);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__8278__8279);
}
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__8281 = null;
var G__8281__2 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__8281__3 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__8281 = function(string,f,start){
switch(arguments.length){
case 2:
return G__8281__2.call(this,string,f);
case 3:
return G__8281__3.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8281;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__8282 = null;
var G__8282__2 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__8282__3 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__8282 = function(string,k,not_found){
switch(arguments.length){
case 2:
return G__8282__2.call(this,string,k);
case 3:
return G__8282__3.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8282;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__8283 = null;
var G__8283__2 = (function (string,n){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return null;
}
});
var G__8283__3 = (function (string,n,not_found){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return not_found;
}
});
G__8283 = function(string,n,not_found){
switch(arguments.length){
case 2:
return G__8283__2.call(this,string,n);
case 3:
return G__8283__3.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8283;
})()
);
(cljs.core.ICounted["string"] = true);
(cljs.core._count["string"] = (function (s){
return s.length;
}));
(cljs.core.ISeqable["string"] = true);
(cljs.core._seq["string"] = (function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
(cljs.core.IHash["string"] = true);
(cljs.core._hash["string"] = (function (o){
return goog.string.hashCode(o);
}));

/**
* @constructor
*/
cljs.core.Keyword = (function (k){
this.k = k;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1;
})
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Keyword");
});
cljs.core.Keyword.prototype.call = (function() {
var G__8295 = null;
var G__8295__2 = (function (this_sym8286,coll){
var this__8288 = this;
var this_sym8286__8289 = this;
var ___8290 = this_sym8286__8289;
if((coll == null))
{return null;
} else
{var strobj__8291 = coll.strobj;
if((strobj__8291 == null))
{return cljs.core._lookup.call(null,coll,this__8288.k,null);
} else
{return (strobj__8291[this__8288.k]);
}
}
});
var G__8295__3 = (function (this_sym8287,coll,not_found){
var this__8288 = this;
var this_sym8287__8292 = this;
var ___8293 = this_sym8287__8292;
if((coll == null))
{return not_found;
} else
{return cljs.core._lookup.call(null,coll,this__8288.k,not_found);
}
});
G__8295 = function(this_sym8287,coll,not_found){
switch(arguments.length){
case 2:
return G__8295__2.call(this,this_sym8287,coll);
case 3:
return G__8295__3.call(this,this_sym8287,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8295;
})()
;
cljs.core.Keyword.prototype.apply = (function (this_sym8284,args8285){
var this__8294 = this;
return this_sym8284.call.apply(this_sym8284,[this_sym8284].concat(args8285.slice()));
});
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = (function() {
var G__8304 = null;
var G__8304__2 = (function (this_sym8298,coll){
var this_sym8298__8300 = this;
var this__8301 = this_sym8298__8300;
return cljs.core._lookup.call(null,coll,this__8301.toString(),null);
});
var G__8304__3 = (function (this_sym8299,coll,not_found){
var this_sym8299__8302 = this;
var this__8303 = this_sym8299__8302;
return cljs.core._lookup.call(null,coll,this__8303.toString(),not_found);
});
G__8304 = function(this_sym8299,coll,not_found){
switch(arguments.length){
case 2:
return G__8304__2.call(this,this_sym8299,coll);
case 3:
return G__8304__3.call(this,this_sym8299,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8304;
})()
;
String.prototype.apply = (function (this_sym8296,args8297){
return this_sym8296.call.apply(this_sym8296,[this_sym8296].concat(args8297.slice()));
});
String.prototype.apply = (function (s,args){
if((cljs.core.count.call(null,args) < 2))
{return cljs.core._lookup.call(null,(args[0]),s,null);
} else
{return cljs.core._lookup.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__8306 = lazy_seq.x;
if(lazy_seq.realized)
{return x__8306;
} else
{lazy_seq.x = x__8306.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x,__hash){
this.meta = meta;
this.realized = realized;
this.x = x;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850700;
})
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/LazySeq");
});
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8307 = this;
var h__3049__auto____8308 = this__8307.__hash;
if(!((h__3049__auto____8308 == null)))
{return h__3049__auto____8308;
} else
{var h__3049__auto____8309 = cljs.core.hash_coll.call(null,coll);
this__8307.__hash = h__3049__auto____8309;
return h__3049__auto____8309;
}
});
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8310 = this;
return cljs.core._seq.call(null,coll.cljs$core$ISeq$_rest$arity$1(coll));
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8311 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.toString = (function (){
var this__8312 = this;
var this__8313 = this;
return cljs.core.pr_str.call(null,this__8313);
});
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8314 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8315 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8316 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8317 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8318 = this;
return (new cljs.core.LazySeq(meta,this__8318.realized,this__8318.x,this__8318.__hash));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8319 = this;
return this__8319.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8320 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8320.meta);
});
cljs.core.LazySeq;

/**
* @constructor
*/
cljs.core.ChunkBuffer = (function (buf,end){
this.buf = buf;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2;
})
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkBuffer");
});
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__8321 = this;
return this__8321.end;
});
cljs.core.ChunkBuffer.prototype.add = (function (o){
var this__8322 = this;
var ___8323 = this;
(this__8322.buf[this__8322.end] = o);
return this__8322.end = (this__8322.end + 1);
});
cljs.core.ChunkBuffer.prototype.chunk = (function (o){
var this__8324 = this;
var ___8325 = this;
var ret__8326 = (new cljs.core.ArrayChunk(this__8324.buf,0,this__8324.end));
this__8324.buf = null;
return ret__8326;
});
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = (function chunk_buffer(capacity){
return (new cljs.core.ChunkBuffer(cljs.core.make_array.call(null,capacity),0));
});

/**
* @constructor
*/
cljs.core.ArrayChunk = (function (arr,off,end){
this.arr = arr;
this.off = off;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 524306;
})
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayChunk");
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__8327 = this;
return cljs.core.ci_reduce.call(null,coll,f,(this__8327.arr[this__8327.off]),(this__8327.off + 1));
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__8328 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__8328.off);
});
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = (function (coll){
var this__8329 = this;
if((this__8329.off === this__8329.end))
{throw (new Error("-drop-first of empty chunk"));
} else
{return (new cljs.core.ArrayChunk(this__8329.arr,(this__8329.off + 1),this__8329.end));
}
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,i){
var this__8330 = this;
return (this__8330.arr[(this__8330.off + i)]);
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,i,not_found){
var this__8331 = this;
if((function (){var and__3822__auto____8332 = (i >= 0);
if(and__3822__auto____8332)
{return (i < (this__8331.end - this__8331.off));
} else
{return and__3822__auto____8332;
}
})())
{return (this__8331.arr[(this__8331.off + i)]);
} else
{return not_found;
}
});
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__8333 = this;
return (this__8333.end - this__8333.off);
});
cljs.core.ArrayChunk;
cljs.core.array_chunk = (function() {
var array_chunk = null;
var array_chunk__1 = (function (arr){
return array_chunk.call(null,arr,0,arr.length);
});
var array_chunk__2 = (function (arr,off){
return array_chunk.call(null,arr,off,arr.length);
});
var array_chunk__3 = (function (arr,off,end){
return (new cljs.core.ArrayChunk(arr,off,end));
});
array_chunk = function(arr,off,end){
switch(arguments.length){
case 1:
return array_chunk__1.call(this,arr);
case 2:
return array_chunk__2.call(this,arr,off);
case 3:
return array_chunk__3.call(this,arr,off,end);
}
throw('Invalid arity: ' + arguments.length);
};
array_chunk.cljs$lang$arity$1 = array_chunk__1;
array_chunk.cljs$lang$arity$2 = array_chunk__2;
array_chunk.cljs$lang$arity$3 = array_chunk__3;
return array_chunk;
})()
;

/**
* @constructor
*/
cljs.core.ChunkedCons = (function (chunk,more,meta){
this.chunk = chunk;
this.more = more;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 27656296;
})
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedCons");
});
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,o){
var this__8334 = this;
return cljs.core.cons.call(null,o,this$);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8335 = this;
return coll;
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8336 = this;
return cljs.core._nth.call(null,this__8336.chunk,0);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8337 = this;
if((cljs.core._count.call(null,this__8337.chunk) > 1))
{return (new cljs.core.ChunkedCons(cljs.core._drop_first.call(null,this__8337.chunk),this__8337.more,this__8337.meta));
} else
{if((this__8337.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__8337.more;
}
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__8338 = this;
if((this__8338.more == null))
{return null;
} else
{return this__8338.more;
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8339 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__8340 = this;
return (new cljs.core.ChunkedCons(this__8340.chunk,this__8340.more,m));
});
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8341 = this;
return this__8341.meta;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__8342 = this;
return this__8342.chunk;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__8343 = this;
if((this__8343.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__8343.more;
}
});
cljs.core.ChunkedCons;
cljs.core.chunk_cons = (function chunk_cons(chunk,rest){
if((cljs.core._count.call(null,chunk) === 0))
{return rest;
} else
{return (new cljs.core.ChunkedCons(chunk,rest,null));
}
});
cljs.core.chunk_append = (function chunk_append(b,x){
return b.add(x);
});
cljs.core.chunk = (function chunk(b){
return b.chunk();
});
cljs.core.chunk_first = (function chunk_first(s){
return cljs.core._chunked_first.call(null,s);
});
cljs.core.chunk_rest = (function chunk_rest(s){
return cljs.core._chunked_rest.call(null,s);
});
cljs.core.chunk_next = (function chunk_next(s){
if((function (){var G__8347__8348 = s;
if(G__8347__8348)
{if(cljs.core.truth_((function (){var or__3824__auto____8349 = null;
if(cljs.core.truth_(or__3824__auto____8349))
{return or__3824__auto____8349;
} else
{return G__8347__8348.cljs$core$IChunkedNext$;
}
})()))
{return true;
} else
{if((!G__8347__8348.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__8347__8348);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__8347__8348);
}
})())
{return cljs.core._chunked_next.call(null,s);
} else
{return cljs.core.seq.call(null,cljs.core._chunked_rest.call(null,s));
}
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__8352 = [];
var s__8353 = s;
while(true){
if(cljs.core.seq.call(null,s__8353))
{ary__8352.push(cljs.core.first.call(null,s__8353));
{
var G__8354 = cljs.core.next.call(null,s__8353);
s__8353 = G__8354;
continue;
}
} else
{return ary__8352;
}
break;
}
});
/**
* Returns a (potentially-ragged) 2-dimensional array
* containing the contents of coll.
*/
cljs.core.to_array_2d = (function to_array_2d(coll){
var ret__8358 = cljs.core.make_array.call(null,cljs.core.count.call(null,coll));
var i__8359 = 0;
var xs__8360 = cljs.core.seq.call(null,coll);
while(true){
if(xs__8360)
{(ret__8358[i__8359] = cljs.core.to_array.call(null,cljs.core.first.call(null,xs__8360)));
{
var G__8361 = (i__8359 + 1);
var G__8362 = cljs.core.next.call(null,xs__8360);
i__8359 = G__8361;
xs__8360 = G__8362;
continue;
}
} else
{}
break;
}
return ret__8358;
});
cljs.core.long_array = (function() {
var long_array = null;
var long_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return long_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("long-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var long_array__2 = (function (size,init_val_or_seq){
var a__8370 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8371 = cljs.core.seq.call(null,init_val_or_seq);
var i__8372 = 0;
var s__8373 = s__8371;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8374 = s__8373;
if(and__3822__auto____8374)
{return (i__8372 < size);
} else
{return and__3822__auto____8374;
}
})()))
{(a__8370[i__8372] = cljs.core.first.call(null,s__8373));
{
var G__8377 = (i__8372 + 1);
var G__8378 = cljs.core.next.call(null,s__8373);
i__8372 = G__8377;
s__8373 = G__8378;
continue;
}
} else
{return a__8370;
}
break;
}
} else
{var n__3384__auto____8375 = size;
var i__8376 = 0;
while(true){
if((i__8376 < n__3384__auto____8375))
{(a__8370[i__8376] = init_val_or_seq);
{
var G__8379 = (i__8376 + 1);
i__8376 = G__8379;
continue;
}
} else
{}
break;
}
return a__8370;
}
});
long_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return long_array__1.call(this,size);
case 2:
return long_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
long_array.cljs$lang$arity$1 = long_array__1;
long_array.cljs$lang$arity$2 = long_array__2;
return long_array;
})()
;
cljs.core.double_array = (function() {
var double_array = null;
var double_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return double_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("double-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var double_array__2 = (function (size,init_val_or_seq){
var a__8387 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8388 = cljs.core.seq.call(null,init_val_or_seq);
var i__8389 = 0;
var s__8390 = s__8388;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8391 = s__8390;
if(and__3822__auto____8391)
{return (i__8389 < size);
} else
{return and__3822__auto____8391;
}
})()))
{(a__8387[i__8389] = cljs.core.first.call(null,s__8390));
{
var G__8394 = (i__8389 + 1);
var G__8395 = cljs.core.next.call(null,s__8390);
i__8389 = G__8394;
s__8390 = G__8395;
continue;
}
} else
{return a__8387;
}
break;
}
} else
{var n__3384__auto____8392 = size;
var i__8393 = 0;
while(true){
if((i__8393 < n__3384__auto____8392))
{(a__8387[i__8393] = init_val_or_seq);
{
var G__8396 = (i__8393 + 1);
i__8393 = G__8396;
continue;
}
} else
{}
break;
}
return a__8387;
}
});
double_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return double_array__1.call(this,size);
case 2:
return double_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
double_array.cljs$lang$arity$1 = double_array__1;
double_array.cljs$lang$arity$2 = double_array__2;
return double_array;
})()
;
cljs.core.object_array = (function() {
var object_array = null;
var object_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return object_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("object-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var object_array__2 = (function (size,init_val_or_seq){
var a__8404 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__8405 = cljs.core.seq.call(null,init_val_or_seq);
var i__8406 = 0;
var s__8407 = s__8405;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8408 = s__8407;
if(and__3822__auto____8408)
{return (i__8406 < size);
} else
{return and__3822__auto____8408;
}
})()))
{(a__8404[i__8406] = cljs.core.first.call(null,s__8407));
{
var G__8411 = (i__8406 + 1);
var G__8412 = cljs.core.next.call(null,s__8407);
i__8406 = G__8411;
s__8407 = G__8412;
continue;
}
} else
{return a__8404;
}
break;
}
} else
{var n__3384__auto____8409 = size;
var i__8410 = 0;
while(true){
if((i__8410 < n__3384__auto____8409))
{(a__8404[i__8410] = init_val_or_seq);
{
var G__8413 = (i__8410 + 1);
i__8410 = G__8413;
continue;
}
} else
{}
break;
}
return a__8404;
}
});
object_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return object_array__1.call(this,size);
case 2:
return object_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
object_array.cljs$lang$arity$1 = object_array__1;
object_array.cljs$lang$arity$2 = object_array__2;
return object_array;
})()
;
cljs.core.bounded_count = (function bounded_count(s,n){
if(cljs.core.counted_QMARK_.call(null,s))
{return cljs.core.count.call(null,s);
} else
{var s__8418 = s;
var i__8419 = n;
var sum__8420 = 0;
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____8421 = (i__8419 > 0);
if(and__3822__auto____8421)
{return cljs.core.seq.call(null,s__8418);
} else
{return and__3822__auto____8421;
}
})()))
{{
var G__8422 = cljs.core.next.call(null,s__8418);
var G__8423 = (i__8419 - 1);
var G__8424 = (sum__8420 + 1);
s__8418 = G__8422;
i__8419 = G__8423;
sum__8420 = G__8424;
continue;
}
} else
{return sum__8420;
}
break;
}
}
});
cljs.core.spread = (function spread(arglist){
if((arglist == null))
{return null;
} else
{if((cljs.core.next.call(null,arglist) == null))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if("\uFDD0'else")
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__0 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
}),null));
});
var concat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
}),null));
});
var concat__2 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__8429 = cljs.core.seq.call(null,x);
if(s__8429)
{if(cljs.core.chunked_seq_QMARK_.call(null,s__8429))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,s__8429),concat.call(null,cljs.core.chunk_rest.call(null,s__8429),y));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__8429),concat.call(null,cljs.core.rest.call(null,s__8429),y));
}
} else
{return y;
}
}),null));
});
var concat__3 = (function() { 
var G__8433__delegate = function (x,y,zs){
var cat__8432 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__8431 = cljs.core.seq.call(null,xys);
if(xys__8431)
{if(cljs.core.chunked_seq_QMARK_.call(null,xys__8431))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,xys__8431),cat.call(null,cljs.core.chunk_rest.call(null,xys__8431),zs));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__8431),cat.call(null,cljs.core.rest.call(null,xys__8431),zs));
}
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
}),null));
});
return cat__8432.call(null,concat.call(null,x,y),zs);
};
var G__8433 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8433__delegate.call(this, x, y, zs);
};
G__8433.cljs$lang$maxFixedArity = 2;
G__8433.cljs$lang$applyTo = (function (arglist__8434){
var x = cljs.core.first(arglist__8434);
var y = cljs.core.first(cljs.core.next(arglist__8434));
var zs = cljs.core.rest(cljs.core.next(arglist__8434));
return G__8433__delegate(x, y, zs);
});
G__8433.cljs$lang$arity$variadic = G__8433__delegate;
return G__8433;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return concat__0.call(this);
case 1:
return concat__1.call(this,x);
case 2:
return concat__2.call(this,x,y);
default:
return concat__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
concat.cljs$lang$arity$0 = concat__0;
concat.cljs$lang$arity$1 = concat__1;
concat.cljs$lang$arity$2 = concat__2;
concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___1 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___2 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___4 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___5 = (function() { 
var G__8435__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__8435 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8435__delegate.call(this, a, b, c, d, more);
};
G__8435.cljs$lang$maxFixedArity = 4;
G__8435.cljs$lang$applyTo = (function (arglist__8436){
var a = cljs.core.first(arglist__8436);
var b = cljs.core.first(cljs.core.next(arglist__8436));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8436)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8436))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8436))));
return G__8435__delegate(a, b, c, d, more);
});
G__8435.cljs$lang$arity$variadic = G__8435__delegate;
return G__8435;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return list_STAR___1.call(this,a);
case 2:
return list_STAR___2.call(this,a,b);
case 3:
return list_STAR___3.call(this,a,b,c);
case 4:
return list_STAR___4.call(this,a,b,c,d);
default:
return list_STAR___5.cljs$lang$arity$variadic(a,b,c,d, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
list_STAR_.cljs$lang$arity$1 = list_STAR___1;
list_STAR_.cljs$lang$arity$2 = list_STAR___2;
list_STAR_.cljs$lang$arity$3 = list_STAR___3;
list_STAR_.cljs$lang$arity$4 = list_STAR___4;
list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
return list_STAR_;
})()
;
cljs.core.transient$ = (function transient$(coll){
return cljs.core._as_transient.call(null,coll);
});
cljs.core.persistent_BANG_ = (function persistent_BANG_(tcoll){
return cljs.core._persistent_BANG_.call(null,tcoll);
});
cljs.core.conj_BANG_ = (function conj_BANG_(tcoll,val){
return cljs.core._conj_BANG_.call(null,tcoll,val);
});
cljs.core.assoc_BANG_ = (function assoc_BANG_(tcoll,key,val){
return cljs.core._assoc_BANG_.call(null,tcoll,key,val);
});
cljs.core.dissoc_BANG_ = (function dissoc_BANG_(tcoll,key){
return cljs.core._dissoc_BANG_.call(null,tcoll,key);
});
cljs.core.pop_BANG_ = (function pop_BANG_(tcoll){
return cljs.core._pop_BANG_.call(null,tcoll);
});
cljs.core.disj_BANG_ = (function disj_BANG_(tcoll,val){
return cljs.core._disjoin_BANG_.call(null,tcoll,val);
});
cljs.core.apply_to = (function apply_to(f,argc,args){
var args__8478 = cljs.core.seq.call(null,args);
if((argc === 0))
{return f.call(null);
} else
{var a__8479 = cljs.core._first.call(null,args__8478);
var args__8480 = cljs.core._rest.call(null,args__8478);
if((argc === 1))
{if(f.cljs$lang$arity$1)
{return f.cljs$lang$arity$1(a__8479);
} else
{return f.call(null,a__8479);
}
} else
{var b__8481 = cljs.core._first.call(null,args__8480);
var args__8482 = cljs.core._rest.call(null,args__8480);
if((argc === 2))
{if(f.cljs$lang$arity$2)
{return f.cljs$lang$arity$2(a__8479,b__8481);
} else
{return f.call(null,a__8479,b__8481);
}
} else
{var c__8483 = cljs.core._first.call(null,args__8482);
var args__8484 = cljs.core._rest.call(null,args__8482);
if((argc === 3))
{if(f.cljs$lang$arity$3)
{return f.cljs$lang$arity$3(a__8479,b__8481,c__8483);
} else
{return f.call(null,a__8479,b__8481,c__8483);
}
} else
{var d__8485 = cljs.core._first.call(null,args__8484);
var args__8486 = cljs.core._rest.call(null,args__8484);
if((argc === 4))
{if(f.cljs$lang$arity$4)
{return f.cljs$lang$arity$4(a__8479,b__8481,c__8483,d__8485);
} else
{return f.call(null,a__8479,b__8481,c__8483,d__8485);
}
} else
{var e__8487 = cljs.core._first.call(null,args__8486);
var args__8488 = cljs.core._rest.call(null,args__8486);
if((argc === 5))
{if(f.cljs$lang$arity$5)
{return f.cljs$lang$arity$5(a__8479,b__8481,c__8483,d__8485,e__8487);
} else
{return f.call(null,a__8479,b__8481,c__8483,d__8485,e__8487);
}
} else
{var f__8489 = cljs.core._first.call(null,args__8488);
var args__8490 = cljs.core._rest.call(null,args__8488);
if((argc === 6))
{if(f__8489.cljs$lang$arity$6)
{return f__8489.cljs$lang$arity$6(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489);
}
} else
{var g__8491 = cljs.core._first.call(null,args__8490);
var args__8492 = cljs.core._rest.call(null,args__8490);
if((argc === 7))
{if(f__8489.cljs$lang$arity$7)
{return f__8489.cljs$lang$arity$7(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491);
}
} else
{var h__8493 = cljs.core._first.call(null,args__8492);
var args__8494 = cljs.core._rest.call(null,args__8492);
if((argc === 8))
{if(f__8489.cljs$lang$arity$8)
{return f__8489.cljs$lang$arity$8(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493);
}
} else
{var i__8495 = cljs.core._first.call(null,args__8494);
var args__8496 = cljs.core._rest.call(null,args__8494);
if((argc === 9))
{if(f__8489.cljs$lang$arity$9)
{return f__8489.cljs$lang$arity$9(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495);
}
} else
{var j__8497 = cljs.core._first.call(null,args__8496);
var args__8498 = cljs.core._rest.call(null,args__8496);
if((argc === 10))
{if(f__8489.cljs$lang$arity$10)
{return f__8489.cljs$lang$arity$10(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497);
}
} else
{var k__8499 = cljs.core._first.call(null,args__8498);
var args__8500 = cljs.core._rest.call(null,args__8498);
if((argc === 11))
{if(f__8489.cljs$lang$arity$11)
{return f__8489.cljs$lang$arity$11(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499);
}
} else
{var l__8501 = cljs.core._first.call(null,args__8500);
var args__8502 = cljs.core._rest.call(null,args__8500);
if((argc === 12))
{if(f__8489.cljs$lang$arity$12)
{return f__8489.cljs$lang$arity$12(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501);
}
} else
{var m__8503 = cljs.core._first.call(null,args__8502);
var args__8504 = cljs.core._rest.call(null,args__8502);
if((argc === 13))
{if(f__8489.cljs$lang$arity$13)
{return f__8489.cljs$lang$arity$13(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503);
}
} else
{var n__8505 = cljs.core._first.call(null,args__8504);
var args__8506 = cljs.core._rest.call(null,args__8504);
if((argc === 14))
{if(f__8489.cljs$lang$arity$14)
{return f__8489.cljs$lang$arity$14(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505);
}
} else
{var o__8507 = cljs.core._first.call(null,args__8506);
var args__8508 = cljs.core._rest.call(null,args__8506);
if((argc === 15))
{if(f__8489.cljs$lang$arity$15)
{return f__8489.cljs$lang$arity$15(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507);
}
} else
{var p__8509 = cljs.core._first.call(null,args__8508);
var args__8510 = cljs.core._rest.call(null,args__8508);
if((argc === 16))
{if(f__8489.cljs$lang$arity$16)
{return f__8489.cljs$lang$arity$16(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509);
}
} else
{var q__8511 = cljs.core._first.call(null,args__8510);
var args__8512 = cljs.core._rest.call(null,args__8510);
if((argc === 17))
{if(f__8489.cljs$lang$arity$17)
{return f__8489.cljs$lang$arity$17(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511);
}
} else
{var r__8513 = cljs.core._first.call(null,args__8512);
var args__8514 = cljs.core._rest.call(null,args__8512);
if((argc === 18))
{if(f__8489.cljs$lang$arity$18)
{return f__8489.cljs$lang$arity$18(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513);
}
} else
{var s__8515 = cljs.core._first.call(null,args__8514);
var args__8516 = cljs.core._rest.call(null,args__8514);
if((argc === 19))
{if(f__8489.cljs$lang$arity$19)
{return f__8489.cljs$lang$arity$19(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513,s__8515);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513,s__8515);
}
} else
{var t__8517 = cljs.core._first.call(null,args__8516);
var args__8518 = cljs.core._rest.call(null,args__8516);
if((argc === 20))
{if(f__8489.cljs$lang$arity$20)
{return f__8489.cljs$lang$arity$20(a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513,s__8515,t__8517);
} else
{return f__8489.call(null,a__8479,b__8481,c__8483,d__8485,e__8487,f__8489,g__8491,h__8493,i__8495,j__8497,k__8499,l__8501,m__8503,n__8505,o__8507,p__8509,q__8511,r__8513,s__8515,t__8517);
}
} else
{throw (new Error("Only up to 20 arguments supported on functions"));
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
});
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__2 = (function (f,args){
var fixed_arity__8533 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8534 = cljs.core.bounded_count.call(null,args,(fixed_arity__8533 + 1));
if((bc__8534 <= fixed_arity__8533))
{return cljs.core.apply_to.call(null,f,bc__8534,args);
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3 = (function (f,x,args){
var arglist__8535 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__8536 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8537 = cljs.core.bounded_count.call(null,arglist__8535,(fixed_arity__8536 + 1));
if((bc__8537 <= fixed_arity__8536))
{return cljs.core.apply_to.call(null,f,bc__8537,arglist__8535);
} else
{return f.cljs$lang$applyTo(arglist__8535);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8535));
}
});
var apply__4 = (function (f,x,y,args){
var arglist__8538 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__8539 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8540 = cljs.core.bounded_count.call(null,arglist__8538,(fixed_arity__8539 + 1));
if((bc__8540 <= fixed_arity__8539))
{return cljs.core.apply_to.call(null,f,bc__8540,arglist__8538);
} else
{return f.cljs$lang$applyTo(arglist__8538);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8538));
}
});
var apply__5 = (function (f,x,y,z,args){
var arglist__8541 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__8542 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8543 = cljs.core.bounded_count.call(null,arglist__8541,(fixed_arity__8542 + 1));
if((bc__8543 <= fixed_arity__8542))
{return cljs.core.apply_to.call(null,f,bc__8543,arglist__8541);
} else
{return f.cljs$lang$applyTo(arglist__8541);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8541));
}
});
var apply__6 = (function() { 
var G__8547__delegate = function (f,a,b,c,d,args){
var arglist__8544 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__8545 = f.cljs$lang$maxFixedArity;
if(cljs.core.truth_(f.cljs$lang$applyTo))
{var bc__8546 = cljs.core.bounded_count.call(null,arglist__8544,(fixed_arity__8545 + 1));
if((bc__8546 <= fixed_arity__8545))
{return cljs.core.apply_to.call(null,f,bc__8546,arglist__8544);
} else
{return f.cljs$lang$applyTo(arglist__8544);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__8544));
}
};
var G__8547 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__8547__delegate.call(this, f, a, b, c, d, args);
};
G__8547.cljs$lang$maxFixedArity = 5;
G__8547.cljs$lang$applyTo = (function (arglist__8548){
var f = cljs.core.first(arglist__8548);
var a = cljs.core.first(cljs.core.next(arglist__8548));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8548)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8548))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8548)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8548)))));
return G__8547__delegate(f, a, b, c, d, args);
});
G__8547.cljs$lang$arity$variadic = G__8547__delegate;
return G__8547;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case 2:
return apply__2.call(this,f,a);
case 3:
return apply__3.call(this,f,a,b);
case 4:
return apply__4.call(this,f,a,b,c);
case 5:
return apply__5.call(this,f,a,b,c,d);
default:
return apply__6.cljs$lang$arity$variadic(f,a,b,c,d, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
apply.cljs$lang$arity$2 = apply__2;
apply.cljs$lang$arity$3 = apply__3;
apply.cljs$lang$arity$4 = apply__4;
apply.cljs$lang$arity$5 = apply__5;
apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__8549){
var obj = cljs.core.first(arglist__8549);
var f = cljs.core.first(cljs.core.next(arglist__8549));
var args = cljs.core.rest(cljs.core.next(arglist__8549));
return vary_meta__delegate(obj, f, args);
});
vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___1 = (function (x){
return false;
});
var not_EQ___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3 = (function() { 
var G__8550__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__8550 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8550__delegate.call(this, x, y, more);
};
G__8550.cljs$lang$maxFixedArity = 2;
G__8550.cljs$lang$applyTo = (function (arglist__8551){
var x = cljs.core.first(arglist__8551);
var y = cljs.core.first(cljs.core.next(arglist__8551));
var more = cljs.core.rest(cljs.core.next(arglist__8551));
return G__8550__delegate(x, y, more);
});
G__8550.cljs$lang$arity$variadic = G__8550__delegate;
return G__8550;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return not_EQ___1.call(this,x);
case 2:
return not_EQ___2.call(this,x,y);
default:
return not_EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
not_EQ_.cljs$lang$arity$1 = not_EQ___1;
not_EQ_.cljs$lang$arity$2 = not_EQ___2;
not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.seq.call(null,coll))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if((cljs.core.seq.call(null,coll) == null))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__8552 = pred;
var G__8553 = cljs.core.next.call(null,coll);
pred = G__8552;
coll = G__8553;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return !(cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.seq.call(null,coll))
{var or__3824__auto____8555 = pred.call(null,cljs.core.first.call(null,coll));
if(cljs.core.truth_(or__3824__auto____8555))
{return or__3824__auto____8555;
} else
{{
var G__8556 = pred;
var G__8557 = cljs.core.next.call(null,coll);
pred = G__8556;
coll = G__8557;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.integer_QMARK_.call(null,n))
{return ((n & 1) === 0);
} else
{throw (new Error([cljs.core.str("Argument must be an integer: "),cljs.core.str(n)].join('')));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return !(cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__8558 = null;
var G__8558__0 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__8558__1 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__8558__2 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__8558__3 = (function() { 
var G__8559__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__8559 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8559__delegate.call(this, x, y, zs);
};
G__8559.cljs$lang$maxFixedArity = 2;
G__8559.cljs$lang$applyTo = (function (arglist__8560){
var x = cljs.core.first(arglist__8560);
var y = cljs.core.first(cljs.core.next(arglist__8560));
var zs = cljs.core.rest(cljs.core.next(arglist__8560));
return G__8559__delegate(x, y, zs);
});
G__8559.cljs$lang$arity$variadic = G__8559__delegate;
return G__8559;
})()
;
G__8558 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return G__8558__0.call(this);
case 1:
return G__8558__1.call(this,x);
case 2:
return G__8558__2.call(this,x,y);
default:
return G__8558__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
G__8558.cljs$lang$maxFixedArity = 2;
G__8558.cljs$lang$applyTo = G__8558__3.cljs$lang$applyTo;
return G__8558;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__8561__delegate = function (args){
return x;
};
var G__8561 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8561__delegate.call(this, args);
};
G__8561.cljs$lang$maxFixedArity = 0;
G__8561.cljs$lang$applyTo = (function (arglist__8562){
var args = cljs.core.seq(arglist__8562);;
return G__8561__delegate(args);
});
G__8561.cljs$lang$arity$variadic = G__8561__delegate;
return G__8561;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__0 = (function (){
return cljs.core.identity;
});
var comp__1 = (function (f){
return f;
});
var comp__2 = (function (f,g){
return (function() {
var G__8569 = null;
var G__8569__0 = (function (){
return f.call(null,g.call(null));
});
var G__8569__1 = (function (x){
return f.call(null,g.call(null,x));
});
var G__8569__2 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__8569__3 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__8569__4 = (function() { 
var G__8570__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__8570 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8570__delegate.call(this, x, y, z, args);
};
G__8570.cljs$lang$maxFixedArity = 3;
G__8570.cljs$lang$applyTo = (function (arglist__8571){
var x = cljs.core.first(arglist__8571);
var y = cljs.core.first(cljs.core.next(arglist__8571));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8571)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8571)));
return G__8570__delegate(x, y, z, args);
});
G__8570.cljs$lang$arity$variadic = G__8570__delegate;
return G__8570;
})()
;
G__8569 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__8569__0.call(this);
case 1:
return G__8569__1.call(this,x);
case 2:
return G__8569__2.call(this,x,y);
case 3:
return G__8569__3.call(this,x,y,z);
default:
return G__8569__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8569.cljs$lang$maxFixedArity = 3;
G__8569.cljs$lang$applyTo = G__8569__4.cljs$lang$applyTo;
return G__8569;
})()
});
var comp__3 = (function (f,g,h){
return (function() {
var G__8572 = null;
var G__8572__0 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__8572__1 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__8572__2 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__8572__3 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__8572__4 = (function() { 
var G__8573__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__8573 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8573__delegate.call(this, x, y, z, args);
};
G__8573.cljs$lang$maxFixedArity = 3;
G__8573.cljs$lang$applyTo = (function (arglist__8574){
var x = cljs.core.first(arglist__8574);
var y = cljs.core.first(cljs.core.next(arglist__8574));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8574)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8574)));
return G__8573__delegate(x, y, z, args);
});
G__8573.cljs$lang$arity$variadic = G__8573__delegate;
return G__8573;
})()
;
G__8572 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__8572__0.call(this);
case 1:
return G__8572__1.call(this,x);
case 2:
return G__8572__2.call(this,x,y);
case 3:
return G__8572__3.call(this,x,y,z);
default:
return G__8572__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8572.cljs$lang$maxFixedArity = 3;
G__8572.cljs$lang$applyTo = G__8572__4.cljs$lang$applyTo;
return G__8572;
})()
});
var comp__4 = (function() { 
var G__8575__delegate = function (f1,f2,f3,fs){
var fs__8566 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));
return (function() { 
var G__8576__delegate = function (args){
var ret__8567 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__8566),args);
var fs__8568 = cljs.core.next.call(null,fs__8566);
while(true){
if(fs__8568)
{{
var G__8577 = cljs.core.first.call(null,fs__8568).call(null,ret__8567);
var G__8578 = cljs.core.next.call(null,fs__8568);
ret__8567 = G__8577;
fs__8568 = G__8578;
continue;
}
} else
{return ret__8567;
}
break;
}
};
var G__8576 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8576__delegate.call(this, args);
};
G__8576.cljs$lang$maxFixedArity = 0;
G__8576.cljs$lang$applyTo = (function (arglist__8579){
var args = cljs.core.seq(arglist__8579);;
return G__8576__delegate(args);
});
G__8576.cljs$lang$arity$variadic = G__8576__delegate;
return G__8576;
})()
;
};
var G__8575 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8575__delegate.call(this, f1, f2, f3, fs);
};
G__8575.cljs$lang$maxFixedArity = 3;
G__8575.cljs$lang$applyTo = (function (arglist__8580){
var f1 = cljs.core.first(arglist__8580);
var f2 = cljs.core.first(cljs.core.next(arglist__8580));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8580)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8580)));
return G__8575__delegate(f1, f2, f3, fs);
});
G__8575.cljs$lang$arity$variadic = G__8575__delegate;
return G__8575;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case 0:
return comp__0.call(this);
case 1:
return comp__1.call(this,f1);
case 2:
return comp__2.call(this,f1,f2);
case 3:
return comp__3.call(this,f1,f2,f3);
default:
return comp__4.cljs$lang$arity$variadic(f1,f2,f3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
comp.cljs$lang$arity$0 = comp__0;
comp.cljs$lang$arity$1 = comp__1;
comp.cljs$lang$arity$2 = comp__2;
comp.cljs$lang$arity$3 = comp__3;
comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__2 = (function (f,arg1){
return (function() { 
var G__8581__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__8581 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8581__delegate.call(this, args);
};
G__8581.cljs$lang$maxFixedArity = 0;
G__8581.cljs$lang$applyTo = (function (arglist__8582){
var args = cljs.core.seq(arglist__8582);;
return G__8581__delegate(args);
});
G__8581.cljs$lang$arity$variadic = G__8581__delegate;
return G__8581;
})()
;
});
var partial__3 = (function (f,arg1,arg2){
return (function() { 
var G__8583__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__8583 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8583__delegate.call(this, args);
};
G__8583.cljs$lang$maxFixedArity = 0;
G__8583.cljs$lang$applyTo = (function (arglist__8584){
var args = cljs.core.seq(arglist__8584);;
return G__8583__delegate(args);
});
G__8583.cljs$lang$arity$variadic = G__8583__delegate;
return G__8583;
})()
;
});
var partial__4 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__8585__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__8585 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8585__delegate.call(this, args);
};
G__8585.cljs$lang$maxFixedArity = 0;
G__8585.cljs$lang$applyTo = (function (arglist__8586){
var args = cljs.core.seq(arglist__8586);;
return G__8585__delegate(args);
});
G__8585.cljs$lang$arity$variadic = G__8585__delegate;
return G__8585;
})()
;
});
var partial__5 = (function() { 
var G__8587__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__8588__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__8588 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__8588__delegate.call(this, args);
};
G__8588.cljs$lang$maxFixedArity = 0;
G__8588.cljs$lang$applyTo = (function (arglist__8589){
var args = cljs.core.seq(arglist__8589);;
return G__8588__delegate(args);
});
G__8588.cljs$lang$arity$variadic = G__8588__delegate;
return G__8588;
})()
;
};
var G__8587 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8587__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__8587.cljs$lang$maxFixedArity = 4;
G__8587.cljs$lang$applyTo = (function (arglist__8590){
var f = cljs.core.first(arglist__8590);
var arg1 = cljs.core.first(cljs.core.next(arglist__8590));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8590)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8590))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8590))));
return G__8587__delegate(f, arg1, arg2, arg3, more);
});
G__8587.cljs$lang$arity$variadic = G__8587__delegate;
return G__8587;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return partial__2.call(this,f,arg1);
case 3:
return partial__3.call(this,f,arg1,arg2);
case 4:
return partial__4.call(this,f,arg1,arg2,arg3);
default:
return partial__5.cljs$lang$arity$variadic(f,arg1,arg2,arg3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
partial.cljs$lang$arity$2 = partial__2;
partial.cljs$lang$arity$3 = partial__3;
partial.cljs$lang$arity$4 = partial__4;
partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__2 = (function (f,x){
return (function() {
var G__8591 = null;
var G__8591__1 = (function (a){
return f.call(null,(((a == null))?x:a));
});
var G__8591__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),b);
});
var G__8591__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),b,c);
});
var G__8591__4 = (function() { 
var G__8592__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),b,c,ds);
};
var G__8592 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8592__delegate.call(this, a, b, c, ds);
};
G__8592.cljs$lang$maxFixedArity = 3;
G__8592.cljs$lang$applyTo = (function (arglist__8593){
var a = cljs.core.first(arglist__8593);
var b = cljs.core.first(cljs.core.next(arglist__8593));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8593)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8593)));
return G__8592__delegate(a, b, c, ds);
});
G__8592.cljs$lang$arity$variadic = G__8592__delegate;
return G__8592;
})()
;
G__8591 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 1:
return G__8591__1.call(this,a);
case 2:
return G__8591__2.call(this,a,b);
case 3:
return G__8591__3.call(this,a,b,c);
default:
return G__8591__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8591.cljs$lang$maxFixedArity = 3;
G__8591.cljs$lang$applyTo = G__8591__4.cljs$lang$applyTo;
return G__8591;
})()
});
var fnil__3 = (function (f,x,y){
return (function() {
var G__8594 = null;
var G__8594__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__8594__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),c);
});
var G__8594__4 = (function() { 
var G__8595__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),c,ds);
};
var G__8595 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8595__delegate.call(this, a, b, c, ds);
};
G__8595.cljs$lang$maxFixedArity = 3;
G__8595.cljs$lang$applyTo = (function (arglist__8596){
var a = cljs.core.first(arglist__8596);
var b = cljs.core.first(cljs.core.next(arglist__8596));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8596)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8596)));
return G__8595__delegate(a, b, c, ds);
});
G__8595.cljs$lang$arity$variadic = G__8595__delegate;
return G__8595;
})()
;
G__8594 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__8594__2.call(this,a,b);
case 3:
return G__8594__3.call(this,a,b,c);
default:
return G__8594__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8594.cljs$lang$maxFixedArity = 3;
G__8594.cljs$lang$applyTo = G__8594__4.cljs$lang$applyTo;
return G__8594;
})()
});
var fnil__4 = (function (f,x,y,z){
return (function() {
var G__8597 = null;
var G__8597__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__8597__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c));
});
var G__8597__4 = (function() { 
var G__8598__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c),ds);
};
var G__8598 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8598__delegate.call(this, a, b, c, ds);
};
G__8598.cljs$lang$maxFixedArity = 3;
G__8598.cljs$lang$applyTo = (function (arglist__8599){
var a = cljs.core.first(arglist__8599);
var b = cljs.core.first(cljs.core.next(arglist__8599));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8599)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8599)));
return G__8598__delegate(a, b, c, ds);
});
G__8598.cljs$lang$arity$variadic = G__8598__delegate;
return G__8598;
})()
;
G__8597 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__8597__2.call(this,a,b);
case 3:
return G__8597__3.call(this,a,b,c);
default:
return G__8597__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__8597.cljs$lang$maxFixedArity = 3;
G__8597.cljs$lang$applyTo = G__8597__4.cljs$lang$applyTo;
return G__8597;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case 2:
return fnil__2.call(this,f,x);
case 3:
return fnil__3.call(this,f,x,y);
case 4:
return fnil__4.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
fnil.cljs$lang$arity$2 = fnil__2;
fnil.cljs$lang$arity$3 = fnil__3;
fnil.cljs$lang$arity$4 = fnil__4;
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__8615 = (function mapi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8623 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8623)
{var s__8624 = temp__3974__auto____8623;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8624))
{var c__8625 = cljs.core.chunk_first.call(null,s__8624);
var size__8626 = cljs.core.count.call(null,c__8625);
var b__8627 = cljs.core.chunk_buffer.call(null,size__8626);
var n__3384__auto____8628 = size__8626;
var i__8629 = 0;
while(true){
if((i__8629 < n__3384__auto____8628))
{cljs.core.chunk_append.call(null,b__8627,f.call(null,(idx + i__8629),cljs.core._nth.call(null,c__8625,i__8629)));
{
var G__8630 = (i__8629 + 1);
i__8629 = G__8630;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8627),mapi.call(null,(idx + size__8626),cljs.core.chunk_rest.call(null,s__8624)));
} else
{return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__8624)),mapi.call(null,(idx + 1),cljs.core.rest.call(null,s__8624)));
}
} else
{return null;
}
}),null));
});
return mapi__8615.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8640 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8640)
{var s__8641 = temp__3974__auto____8640;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8641))
{var c__8642 = cljs.core.chunk_first.call(null,s__8641);
var size__8643 = cljs.core.count.call(null,c__8642);
var b__8644 = cljs.core.chunk_buffer.call(null,size__8643);
var n__3384__auto____8645 = size__8643;
var i__8646 = 0;
while(true){
if((i__8646 < n__3384__auto____8645))
{var x__8647 = f.call(null,cljs.core._nth.call(null,c__8642,i__8646));
if((x__8647 == null))
{} else
{cljs.core.chunk_append.call(null,b__8644,x__8647);
}
{
var G__8649 = (i__8646 + 1);
i__8646 = G__8649;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8644),keep.call(null,f,cljs.core.chunk_rest.call(null,s__8641)));
} else
{var x__8648 = f.call(null,cljs.core.first.call(null,s__8641));
if((x__8648 == null))
{return keep.call(null,f,cljs.core.rest.call(null,s__8641));
} else
{return cljs.core.cons.call(null,x__8648,keep.call(null,f,cljs.core.rest.call(null,s__8641)));
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__8675 = (function keepi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____8685 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____8685)
{var s__8686 = temp__3974__auto____8685;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8686))
{var c__8687 = cljs.core.chunk_first.call(null,s__8686);
var size__8688 = cljs.core.count.call(null,c__8687);
var b__8689 = cljs.core.chunk_buffer.call(null,size__8688);
var n__3384__auto____8690 = size__8688;
var i__8691 = 0;
while(true){
if((i__8691 < n__3384__auto____8690))
{var x__8692 = f.call(null,(idx + i__8691),cljs.core._nth.call(null,c__8687,i__8691));
if((x__8692 == null))
{} else
{cljs.core.chunk_append.call(null,b__8689,x__8692);
}
{
var G__8694 = (i__8691 + 1);
i__8691 = G__8694;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8689),keepi.call(null,(idx + size__8688),cljs.core.chunk_rest.call(null,s__8686)));
} else
{var x__8693 = f.call(null,idx,cljs.core.first.call(null,s__8686));
if((x__8693 == null))
{return keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__8686));
} else
{return cljs.core.cons.call(null,x__8693,keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__8686)));
}
}
} else
{return null;
}
}),null));
});
return keepi__8675.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__1 = (function (p){
return (function() {
var ep1 = null;
var ep1__0 = (function (){
return true;
});
var ep1__1 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8780 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____8780))
{return p.call(null,y);
} else
{return and__3822__auto____8780;
}
})());
});
var ep1__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8781 = p.call(null,x);
if(cljs.core.truth_(and__3822__auto____8781))
{var and__3822__auto____8782 = p.call(null,y);
if(cljs.core.truth_(and__3822__auto____8782))
{return p.call(null,z);
} else
{return and__3822__auto____8782;
}
} else
{return and__3822__auto____8781;
}
})());
});
var ep1__4 = (function() { 
var G__8851__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8783 = ep1.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8783))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3822__auto____8783;
}
})());
};
var G__8851 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8851__delegate.call(this, x, y, z, args);
};
G__8851.cljs$lang$maxFixedArity = 3;
G__8851.cljs$lang$applyTo = (function (arglist__8852){
var x = cljs.core.first(arglist__8852);
var y = cljs.core.first(cljs.core.next(arglist__8852));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8852)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8852)));
return G__8851__delegate(x, y, z, args);
});
G__8851.cljs$lang$arity$variadic = G__8851__delegate;
return G__8851;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep1__0.call(this);
case 1:
return ep1__1.call(this,x);
case 2:
return ep1__2.call(this,x,y);
case 3:
return ep1__3.call(this,x,y,z);
default:
return ep1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
ep1.cljs$lang$arity$0 = ep1__0;
ep1.cljs$lang$arity$1 = ep1__1;
ep1.cljs$lang$arity$2 = ep1__2;
ep1.cljs$lang$arity$3 = ep1__3;
ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
return ep1;
})()
});
var every_pred__2 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__0 = (function (){
return true;
});
var ep2__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8795 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8795))
{return p2.call(null,x);
} else
{return and__3822__auto____8795;
}
})());
});
var ep2__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8796 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8796))
{var and__3822__auto____8797 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8797))
{var and__3822__auto____8798 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8798))
{return p2.call(null,y);
} else
{return and__3822__auto____8798;
}
} else
{return and__3822__auto____8797;
}
} else
{return and__3822__auto____8796;
}
})());
});
var ep2__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8799 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8799))
{var and__3822__auto____8800 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8800))
{var and__3822__auto____8801 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____8801))
{var and__3822__auto____8802 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8802))
{var and__3822__auto____8803 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8803))
{return p2.call(null,z);
} else
{return and__3822__auto____8803;
}
} else
{return and__3822__auto____8802;
}
} else
{return and__3822__auto____8801;
}
} else
{return and__3822__auto____8800;
}
} else
{return and__3822__auto____8799;
}
})());
});
var ep2__4 = (function() { 
var G__8853__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8804 = ep2.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8804))
{return cljs.core.every_QMARK_.call(null,(function (p1__8650_SHARP_){
var and__3822__auto____8805 = p1.call(null,p1__8650_SHARP_);
if(cljs.core.truth_(and__3822__auto____8805))
{return p2.call(null,p1__8650_SHARP_);
} else
{return and__3822__auto____8805;
}
}),args);
} else
{return and__3822__auto____8804;
}
})());
};
var G__8853 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8853__delegate.call(this, x, y, z, args);
};
G__8853.cljs$lang$maxFixedArity = 3;
G__8853.cljs$lang$applyTo = (function (arglist__8854){
var x = cljs.core.first(arglist__8854);
var y = cljs.core.first(cljs.core.next(arglist__8854));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8854)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8854)));
return G__8853__delegate(x, y, z, args);
});
G__8853.cljs$lang$arity$variadic = G__8853__delegate;
return G__8853;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep2__0.call(this);
case 1:
return ep2__1.call(this,x);
case 2:
return ep2__2.call(this,x,y);
case 3:
return ep2__3.call(this,x,y,z);
default:
return ep2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
ep2.cljs$lang$arity$0 = ep2__0;
ep2.cljs$lang$arity$1 = ep2__1;
ep2.cljs$lang$arity$2 = ep2__2;
ep2.cljs$lang$arity$3 = ep2__3;
ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
return ep2;
})()
});
var every_pred__3 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__0 = (function (){
return true;
});
var ep3__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8824 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8824))
{var and__3822__auto____8825 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8825))
{return p3.call(null,x);
} else
{return and__3822__auto____8825;
}
} else
{return and__3822__auto____8824;
}
})());
});
var ep3__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8826 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8826))
{var and__3822__auto____8827 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8827))
{var and__3822__auto____8828 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____8828))
{var and__3822__auto____8829 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8829))
{var and__3822__auto____8830 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8830))
{return p3.call(null,y);
} else
{return and__3822__auto____8830;
}
} else
{return and__3822__auto____8829;
}
} else
{return and__3822__auto____8828;
}
} else
{return and__3822__auto____8827;
}
} else
{return and__3822__auto____8826;
}
})());
});
var ep3__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8831 = p1.call(null,x);
if(cljs.core.truth_(and__3822__auto____8831))
{var and__3822__auto____8832 = p2.call(null,x);
if(cljs.core.truth_(and__3822__auto____8832))
{var and__3822__auto____8833 = p3.call(null,x);
if(cljs.core.truth_(and__3822__auto____8833))
{var and__3822__auto____8834 = p1.call(null,y);
if(cljs.core.truth_(and__3822__auto____8834))
{var and__3822__auto____8835 = p2.call(null,y);
if(cljs.core.truth_(and__3822__auto____8835))
{var and__3822__auto____8836 = p3.call(null,y);
if(cljs.core.truth_(and__3822__auto____8836))
{var and__3822__auto____8837 = p1.call(null,z);
if(cljs.core.truth_(and__3822__auto____8837))
{var and__3822__auto____8838 = p2.call(null,z);
if(cljs.core.truth_(and__3822__auto____8838))
{return p3.call(null,z);
} else
{return and__3822__auto____8838;
}
} else
{return and__3822__auto____8837;
}
} else
{return and__3822__auto____8836;
}
} else
{return and__3822__auto____8835;
}
} else
{return and__3822__auto____8834;
}
} else
{return and__3822__auto____8833;
}
} else
{return and__3822__auto____8832;
}
} else
{return and__3822__auto____8831;
}
})());
});
var ep3__4 = (function() { 
var G__8855__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8839 = ep3.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8839))
{return cljs.core.every_QMARK_.call(null,(function (p1__8651_SHARP_){
var and__3822__auto____8840 = p1.call(null,p1__8651_SHARP_);
if(cljs.core.truth_(and__3822__auto____8840))
{var and__3822__auto____8841 = p2.call(null,p1__8651_SHARP_);
if(cljs.core.truth_(and__3822__auto____8841))
{return p3.call(null,p1__8651_SHARP_);
} else
{return and__3822__auto____8841;
}
} else
{return and__3822__auto____8840;
}
}),args);
} else
{return and__3822__auto____8839;
}
})());
};
var G__8855 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8855__delegate.call(this, x, y, z, args);
};
G__8855.cljs$lang$maxFixedArity = 3;
G__8855.cljs$lang$applyTo = (function (arglist__8856){
var x = cljs.core.first(arglist__8856);
var y = cljs.core.first(cljs.core.next(arglist__8856));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8856)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8856)));
return G__8855__delegate(x, y, z, args);
});
G__8855.cljs$lang$arity$variadic = G__8855__delegate;
return G__8855;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep3__0.call(this);
case 1:
return ep3__1.call(this,x);
case 2:
return ep3__2.call(this,x,y);
case 3:
return ep3__3.call(this,x,y,z);
default:
return ep3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
ep3.cljs$lang$arity$0 = ep3__0;
ep3.cljs$lang$arity$1 = ep3__1;
ep3.cljs$lang$arity$2 = ep3__2;
ep3.cljs$lang$arity$3 = ep3__3;
ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
return ep3;
})()
});
var every_pred__4 = (function() { 
var G__8857__delegate = function (p1,p2,p3,ps){
var ps__8842 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var epn = null;
var epn__0 = (function (){
return true;
});
var epn__1 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__8652_SHARP_){
return p1__8652_SHARP_.call(null,x);
}),ps__8842);
});
var epn__2 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__8653_SHARP_){
var and__3822__auto____8847 = p1__8653_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____8847))
{return p1__8653_SHARP_.call(null,y);
} else
{return and__3822__auto____8847;
}
}),ps__8842);
});
var epn__3 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__8654_SHARP_){
var and__3822__auto____8848 = p1__8654_SHARP_.call(null,x);
if(cljs.core.truth_(and__3822__auto____8848))
{var and__3822__auto____8849 = p1__8654_SHARP_.call(null,y);
if(cljs.core.truth_(and__3822__auto____8849))
{return p1__8654_SHARP_.call(null,z);
} else
{return and__3822__auto____8849;
}
} else
{return and__3822__auto____8848;
}
}),ps__8842);
});
var epn__4 = (function() { 
var G__8858__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3822__auto____8850 = epn.call(null,x,y,z);
if(cljs.core.truth_(and__3822__auto____8850))
{return cljs.core.every_QMARK_.call(null,(function (p1__8655_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__8655_SHARP_,args);
}),ps__8842);
} else
{return and__3822__auto____8850;
}
})());
};
var G__8858 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8858__delegate.call(this, x, y, z, args);
};
G__8858.cljs$lang$maxFixedArity = 3;
G__8858.cljs$lang$applyTo = (function (arglist__8859){
var x = cljs.core.first(arglist__8859);
var y = cljs.core.first(cljs.core.next(arglist__8859));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8859)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8859)));
return G__8858__delegate(x, y, z, args);
});
G__8858.cljs$lang$arity$variadic = G__8858__delegate;
return G__8858;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return epn__0.call(this);
case 1:
return epn__1.call(this,x);
case 2:
return epn__2.call(this,x,y);
case 3:
return epn__3.call(this,x,y,z);
default:
return epn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
epn.cljs$lang$arity$0 = epn__0;
epn.cljs$lang$arity$1 = epn__1;
epn.cljs$lang$arity$2 = epn__2;
epn.cljs$lang$arity$3 = epn__3;
epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
return epn;
})()
};
var G__8857 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8857__delegate.call(this, p1, p2, p3, ps);
};
G__8857.cljs$lang$maxFixedArity = 3;
G__8857.cljs$lang$applyTo = (function (arglist__8860){
var p1 = cljs.core.first(arglist__8860);
var p2 = cljs.core.first(cljs.core.next(arglist__8860));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8860)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8860)));
return G__8857__delegate(p1, p2, p3, ps);
});
G__8857.cljs$lang$arity$variadic = G__8857__delegate;
return G__8857;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return every_pred__1.call(this,p1);
case 2:
return every_pred__2.call(this,p1,p2);
case 3:
return every_pred__3.call(this,p1,p2,p3);
default:
return every_pred__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
every_pred.cljs$lang$arity$1 = every_pred__1;
every_pred.cljs$lang$arity$2 = every_pred__2;
every_pred.cljs$lang$arity$3 = every_pred__3;
every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__1 = (function (p){
return (function() {
var sp1 = null;
var sp1__0 = (function (){
return null;
});
var sp1__1 = (function (x){
return p.call(null,x);
});
var sp1__2 = (function (x,y){
var or__3824__auto____8941 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8941))
{return or__3824__auto____8941;
} else
{return p.call(null,y);
}
});
var sp1__3 = (function (x,y,z){
var or__3824__auto____8942 = p.call(null,x);
if(cljs.core.truth_(or__3824__auto____8942))
{return or__3824__auto____8942;
} else
{var or__3824__auto____8943 = p.call(null,y);
if(cljs.core.truth_(or__3824__auto____8943))
{return or__3824__auto____8943;
} else
{return p.call(null,z);
}
}
});
var sp1__4 = (function() { 
var G__9012__delegate = function (x,y,z,args){
var or__3824__auto____8944 = sp1.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8944))
{return or__3824__auto____8944;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__9012 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9012__delegate.call(this, x, y, z, args);
};
G__9012.cljs$lang$maxFixedArity = 3;
G__9012.cljs$lang$applyTo = (function (arglist__9013){
var x = cljs.core.first(arglist__9013);
var y = cljs.core.first(cljs.core.next(arglist__9013));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9013)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9013)));
return G__9012__delegate(x, y, z, args);
});
G__9012.cljs$lang$arity$variadic = G__9012__delegate;
return G__9012;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp1__0.call(this);
case 1:
return sp1__1.call(this,x);
case 2:
return sp1__2.call(this,x,y);
case 3:
return sp1__3.call(this,x,y,z);
default:
return sp1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
sp1.cljs$lang$arity$0 = sp1__0;
sp1.cljs$lang$arity$1 = sp1__1;
sp1.cljs$lang$arity$2 = sp1__2;
sp1.cljs$lang$arity$3 = sp1__3;
sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
return sp1;
})()
});
var some_fn__2 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__0 = (function (){
return null;
});
var sp2__1 = (function (x){
var or__3824__auto____8956 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8956))
{return or__3824__auto____8956;
} else
{return p2.call(null,x);
}
});
var sp2__2 = (function (x,y){
var or__3824__auto____8957 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8957))
{return or__3824__auto____8957;
} else
{var or__3824__auto____8958 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8958))
{return or__3824__auto____8958;
} else
{var or__3824__auto____8959 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8959))
{return or__3824__auto____8959;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3 = (function (x,y,z){
var or__3824__auto____8960 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8960))
{return or__3824__auto____8960;
} else
{var or__3824__auto____8961 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8961))
{return or__3824__auto____8961;
} else
{var or__3824__auto____8962 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8962))
{return or__3824__auto____8962;
} else
{var or__3824__auto____8963 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8963))
{return or__3824__auto____8963;
} else
{var or__3824__auto____8964 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8964))
{return or__3824__auto____8964;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__4 = (function() { 
var G__9014__delegate = function (x,y,z,args){
var or__3824__auto____8965 = sp2.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____8965))
{return or__3824__auto____8965;
} else
{return cljs.core.some.call(null,(function (p1__8695_SHARP_){
var or__3824__auto____8966 = p1.call(null,p1__8695_SHARP_);
if(cljs.core.truth_(or__3824__auto____8966))
{return or__3824__auto____8966;
} else
{return p2.call(null,p1__8695_SHARP_);
}
}),args);
}
};
var G__9014 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9014__delegate.call(this, x, y, z, args);
};
G__9014.cljs$lang$maxFixedArity = 3;
G__9014.cljs$lang$applyTo = (function (arglist__9015){
var x = cljs.core.first(arglist__9015);
var y = cljs.core.first(cljs.core.next(arglist__9015));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9015)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9015)));
return G__9014__delegate(x, y, z, args);
});
G__9014.cljs$lang$arity$variadic = G__9014__delegate;
return G__9014;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp2__0.call(this);
case 1:
return sp2__1.call(this,x);
case 2:
return sp2__2.call(this,x,y);
case 3:
return sp2__3.call(this,x,y,z);
default:
return sp2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
sp2.cljs$lang$arity$0 = sp2__0;
sp2.cljs$lang$arity$1 = sp2__1;
sp2.cljs$lang$arity$2 = sp2__2;
sp2.cljs$lang$arity$3 = sp2__3;
sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
return sp2;
})()
});
var some_fn__3 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__0 = (function (){
return null;
});
var sp3__1 = (function (x){
var or__3824__auto____8985 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8985))
{return or__3824__auto____8985;
} else
{var or__3824__auto____8986 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8986))
{return or__3824__auto____8986;
} else
{return p3.call(null,x);
}
}
});
var sp3__2 = (function (x,y){
var or__3824__auto____8987 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8987))
{return or__3824__auto____8987;
} else
{var or__3824__auto____8988 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8988))
{return or__3824__auto____8988;
} else
{var or__3824__auto____8989 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8989))
{return or__3824__auto____8989;
} else
{var or__3824__auto____8990 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8990))
{return or__3824__auto____8990;
} else
{var or__3824__auto____8991 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8991))
{return or__3824__auto____8991;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3 = (function (x,y,z){
var or__3824__auto____8992 = p1.call(null,x);
if(cljs.core.truth_(or__3824__auto____8992))
{return or__3824__auto____8992;
} else
{var or__3824__auto____8993 = p2.call(null,x);
if(cljs.core.truth_(or__3824__auto____8993))
{return or__3824__auto____8993;
} else
{var or__3824__auto____8994 = p3.call(null,x);
if(cljs.core.truth_(or__3824__auto____8994))
{return or__3824__auto____8994;
} else
{var or__3824__auto____8995 = p1.call(null,y);
if(cljs.core.truth_(or__3824__auto____8995))
{return or__3824__auto____8995;
} else
{var or__3824__auto____8996 = p2.call(null,y);
if(cljs.core.truth_(or__3824__auto____8996))
{return or__3824__auto____8996;
} else
{var or__3824__auto____8997 = p3.call(null,y);
if(cljs.core.truth_(or__3824__auto____8997))
{return or__3824__auto____8997;
} else
{var or__3824__auto____8998 = p1.call(null,z);
if(cljs.core.truth_(or__3824__auto____8998))
{return or__3824__auto____8998;
} else
{var or__3824__auto____8999 = p2.call(null,z);
if(cljs.core.truth_(or__3824__auto____8999))
{return or__3824__auto____8999;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__4 = (function() { 
var G__9016__delegate = function (x,y,z,args){
var or__3824__auto____9000 = sp3.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____9000))
{return or__3824__auto____9000;
} else
{return cljs.core.some.call(null,(function (p1__8696_SHARP_){
var or__3824__auto____9001 = p1.call(null,p1__8696_SHARP_);
if(cljs.core.truth_(or__3824__auto____9001))
{return or__3824__auto____9001;
} else
{var or__3824__auto____9002 = p2.call(null,p1__8696_SHARP_);
if(cljs.core.truth_(or__3824__auto____9002))
{return or__3824__auto____9002;
} else
{return p3.call(null,p1__8696_SHARP_);
}
}
}),args);
}
};
var G__9016 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9016__delegate.call(this, x, y, z, args);
};
G__9016.cljs$lang$maxFixedArity = 3;
G__9016.cljs$lang$applyTo = (function (arglist__9017){
var x = cljs.core.first(arglist__9017);
var y = cljs.core.first(cljs.core.next(arglist__9017));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9017)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9017)));
return G__9016__delegate(x, y, z, args);
});
G__9016.cljs$lang$arity$variadic = G__9016__delegate;
return G__9016;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp3__0.call(this);
case 1:
return sp3__1.call(this,x);
case 2:
return sp3__2.call(this,x,y);
case 3:
return sp3__3.call(this,x,y,z);
default:
return sp3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
sp3.cljs$lang$arity$0 = sp3__0;
sp3.cljs$lang$arity$1 = sp3__1;
sp3.cljs$lang$arity$2 = sp3__2;
sp3.cljs$lang$arity$3 = sp3__3;
sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
return sp3;
})()
});
var some_fn__4 = (function() { 
var G__9018__delegate = function (p1,p2,p3,ps){
var ps__9003 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var spn = null;
var spn__0 = (function (){
return null;
});
var spn__1 = (function (x){
return cljs.core.some.call(null,(function (p1__8697_SHARP_){
return p1__8697_SHARP_.call(null,x);
}),ps__9003);
});
var spn__2 = (function (x,y){
return cljs.core.some.call(null,(function (p1__8698_SHARP_){
var or__3824__auto____9008 = p1__8698_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____9008))
{return or__3824__auto____9008;
} else
{return p1__8698_SHARP_.call(null,y);
}
}),ps__9003);
});
var spn__3 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__8699_SHARP_){
var or__3824__auto____9009 = p1__8699_SHARP_.call(null,x);
if(cljs.core.truth_(or__3824__auto____9009))
{return or__3824__auto____9009;
} else
{var or__3824__auto____9010 = p1__8699_SHARP_.call(null,y);
if(cljs.core.truth_(or__3824__auto____9010))
{return or__3824__auto____9010;
} else
{return p1__8699_SHARP_.call(null,z);
}
}
}),ps__9003);
});
var spn__4 = (function() { 
var G__9019__delegate = function (x,y,z,args){
var or__3824__auto____9011 = spn.call(null,x,y,z);
if(cljs.core.truth_(or__3824__auto____9011))
{return or__3824__auto____9011;
} else
{return cljs.core.some.call(null,(function (p1__8700_SHARP_){
return cljs.core.some.call(null,p1__8700_SHARP_,args);
}),ps__9003);
}
};
var G__9019 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9019__delegate.call(this, x, y, z, args);
};
G__9019.cljs$lang$maxFixedArity = 3;
G__9019.cljs$lang$applyTo = (function (arglist__9020){
var x = cljs.core.first(arglist__9020);
var y = cljs.core.first(cljs.core.next(arglist__9020));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9020)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9020)));
return G__9019__delegate(x, y, z, args);
});
G__9019.cljs$lang$arity$variadic = G__9019__delegate;
return G__9019;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return spn__0.call(this);
case 1:
return spn__1.call(this,x);
case 2:
return spn__2.call(this,x,y);
case 3:
return spn__3.call(this,x,y,z);
default:
return spn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
spn.cljs$lang$arity$0 = spn__0;
spn.cljs$lang$arity$1 = spn__1;
spn.cljs$lang$arity$2 = spn__2;
spn.cljs$lang$arity$3 = spn__3;
spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
return spn;
})()
};
var G__9018 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9018__delegate.call(this, p1, p2, p3, ps);
};
G__9018.cljs$lang$maxFixedArity = 3;
G__9018.cljs$lang$applyTo = (function (arglist__9021){
var p1 = cljs.core.first(arglist__9021);
var p2 = cljs.core.first(cljs.core.next(arglist__9021));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9021)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9021)));
return G__9018__delegate(p1, p2, p3, ps);
});
G__9018.cljs$lang$arity$variadic = G__9018__delegate;
return G__9018;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return some_fn__1.call(this,p1);
case 2:
return some_fn__2.call(this,p1,p2);
case 3:
return some_fn__3.call(this,p1,p2,p3);
default:
return some_fn__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
some_fn.cljs$lang$arity$1 = some_fn__1;
some_fn.cljs$lang$arity$2 = some_fn__2;
some_fn.cljs$lang$arity$3 = some_fn__3;
some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9040 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9040)
{var s__9041 = temp__3974__auto____9040;
if(cljs.core.chunked_seq_QMARK_.call(null,s__9041))
{var c__9042 = cljs.core.chunk_first.call(null,s__9041);
var size__9043 = cljs.core.count.call(null,c__9042);
var b__9044 = cljs.core.chunk_buffer.call(null,size__9043);
var n__3384__auto____9045 = size__9043;
var i__9046 = 0;
while(true){
if((i__9046 < n__3384__auto____9045))
{cljs.core.chunk_append.call(null,b__9044,f.call(null,cljs.core._nth.call(null,c__9042,i__9046)));
{
var G__9058 = (i__9046 + 1);
i__9046 = G__9058;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9044),map.call(null,f,cljs.core.chunk_rest.call(null,s__9041)));
} else
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__9041)),map.call(null,f,cljs.core.rest.call(null,s__9041)));
}
} else
{return null;
}
}),null));
});
var map__3 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__9047 = cljs.core.seq.call(null,c1);
var s2__9048 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____9049 = s1__9047;
if(and__3822__auto____9049)
{return s2__9048;
} else
{return and__3822__auto____9049;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__9047),cljs.core.first.call(null,s2__9048)),map.call(null,f,cljs.core.rest.call(null,s1__9047),cljs.core.rest.call(null,s2__9048)));
} else
{return null;
}
}),null));
});
var map__4 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__9050 = cljs.core.seq.call(null,c1);
var s2__9051 = cljs.core.seq.call(null,c2);
var s3__9052 = cljs.core.seq.call(null,c3);
if((function (){var and__3822__auto____9053 = s1__9050;
if(and__3822__auto____9053)
{var and__3822__auto____9054 = s2__9051;
if(and__3822__auto____9054)
{return s3__9052;
} else
{return and__3822__auto____9054;
}
} else
{return and__3822__auto____9053;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__9050),cljs.core.first.call(null,s2__9051),cljs.core.first.call(null,s3__9052)),map.call(null,f,cljs.core.rest.call(null,s1__9050),cljs.core.rest.call(null,s2__9051),cljs.core.rest.call(null,s3__9052)));
} else
{return null;
}
}),null));
});
var map__5 = (function() { 
var G__9059__delegate = function (f,c1,c2,c3,colls){
var step__9057 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__9056 = map.call(null,cljs.core.seq,cs);
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__9056))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__9056),step.call(null,map.call(null,cljs.core.rest,ss__9056)));
} else
{return null;
}
}),null));
});
return map.call(null,(function (p1__8861_SHARP_){
return cljs.core.apply.call(null,f,p1__8861_SHARP_);
}),step__9057.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__9059 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__9059__delegate.call(this, f, c1, c2, c3, colls);
};
G__9059.cljs$lang$maxFixedArity = 4;
G__9059.cljs$lang$applyTo = (function (arglist__9060){
var f = cljs.core.first(arglist__9060);
var c1 = cljs.core.first(cljs.core.next(arglist__9060));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9060)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9060))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9060))));
return G__9059__delegate(f, c1, c2, c3, colls);
});
G__9059.cljs$lang$arity$variadic = G__9059__delegate;
return G__9059;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return map__2.call(this,f,c1);
case 3:
return map__3.call(this,f,c1,c2);
case 4:
return map__4.call(this,f,c1,c2,c3);
default:
return map__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
map.cljs$lang$arity$2 = map__2;
map.cljs$lang$arity$3 = map__3;
map.cljs$lang$arity$4 = map__4;
map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if((n > 0))
{var temp__3974__auto____9063 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9063)
{var s__9064 = temp__3974__auto____9063;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__9064),take.call(null,(n - 1),cljs.core.rest.call(null,s__9064)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__9070 = (function (n,coll){
while(true){
var s__9068 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____9069 = (n > 0);
if(and__3822__auto____9069)
{return s__9068;
} else
{return and__3822__auto____9069;
}
})()))
{{
var G__9071 = (n - 1);
var G__9072 = cljs.core.rest.call(null,s__9068);
n = G__9071;
coll = G__9072;
continue;
}
} else
{return s__9068;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__9070.call(null,n,coll);
}),null));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__1 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__2 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case 1:
return drop_last__1.call(this,n);
case 2:
return drop_last__2.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
drop_last.cljs$lang$arity$1 = drop_last__1;
drop_last.cljs$lang$arity$2 = drop_last__2;
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__9075 = cljs.core.seq.call(null,coll);
var lead__9076 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));
while(true){
if(lead__9076)
{{
var G__9077 = cljs.core.next.call(null,s__9075);
var G__9078 = cljs.core.next.call(null,lead__9076);
s__9075 = G__9077;
lead__9076 = G__9078;
continue;
}
} else
{return s__9075;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__9084 = (function (pred,coll){
while(true){
var s__9082 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3822__auto____9083 = s__9082;
if(and__3822__auto____9083)
{return pred.call(null,cljs.core.first.call(null,s__9082));
} else
{return and__3822__auto____9083;
}
})()))
{{
var G__9085 = pred;
var G__9086 = cljs.core.rest.call(null,s__9082);
pred = G__9085;
coll = G__9086;
continue;
}
} else
{return s__9082;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__9084.call(null,pred,coll);
}),null));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9089 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9089)
{var s__9090 = temp__3974__auto____9089;
return cljs.core.concat.call(null,s__9090,cycle.call(null,s__9090));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)], true);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
}),null));
});
var repeat__2 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case 1:
return repeat__1.call(this,n);
case 2:
return repeat__2.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
repeat.cljs$lang$arity$1 = repeat__1;
repeat.cljs$lang$arity$2 = repeat__2;
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__1 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
}),null));
});
var repeatedly__2 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case 1:
return repeatedly__1.call(this,n);
case 2:
return repeatedly__2.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
repeatedly.cljs$lang$arity$1 = repeatedly__1;
repeatedly.cljs$lang$arity$2 = repeatedly__2;
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}),null)));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__2 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__9095 = cljs.core.seq.call(null,c1);
var s2__9096 = cljs.core.seq.call(null,c2);
if((function (){var and__3822__auto____9097 = s1__9095;
if(and__3822__auto____9097)
{return s2__9096;
} else
{return and__3822__auto____9097;
}
})())
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__9095),cljs.core.cons.call(null,cljs.core.first.call(null,s2__9096),interleave.call(null,cljs.core.rest.call(null,s1__9095),cljs.core.rest.call(null,s2__9096))));
} else
{return null;
}
}),null));
});
var interleave__3 = (function() { 
var G__9099__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__9098 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__9098))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__9098),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__9098)));
} else
{return null;
}
}),null));
};
var G__9099 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__9099__delegate.call(this, c1, c2, colls);
};
G__9099.cljs$lang$maxFixedArity = 2;
G__9099.cljs$lang$applyTo = (function (arglist__9100){
var c1 = cljs.core.first(arglist__9100);
var c2 = cljs.core.first(cljs.core.next(arglist__9100));
var colls = cljs.core.rest(cljs.core.next(arglist__9100));
return G__9099__delegate(c1, c2, colls);
});
G__9099.cljs$lang$arity$variadic = G__9099__delegate;
return G__9099;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return interleave__2.call(this,c1,c2);
default:
return interleave__3.cljs$lang$arity$variadic(c1,c2, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
interleave.cljs$lang$arity$2 = interleave__2;
interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__9110 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3971__auto____9108 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____9108)
{var coll__9109 = temp__3971__auto____9108;
return cljs.core.cons.call(null,cljs.core.first.call(null,coll__9109),cat.call(null,cljs.core.rest.call(null,coll__9109),colls));
} else
{if(cljs.core.seq.call(null,colls))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
}),null));
});
return cat__9110.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__2 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3 = (function() { 
var G__9111__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__9111 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__9111__delegate.call(this, f, coll, colls);
};
G__9111.cljs$lang$maxFixedArity = 2;
G__9111.cljs$lang$applyTo = (function (arglist__9112){
var f = cljs.core.first(arglist__9112);
var coll = cljs.core.first(cljs.core.next(arglist__9112));
var colls = cljs.core.rest(cljs.core.next(arglist__9112));
return G__9111__delegate(f, coll, colls);
});
G__9111.cljs$lang$arity$variadic = G__9111__delegate;
return G__9111;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapcat__2.call(this,f,coll);
default:
return mapcat__3.cljs$lang$arity$variadic(f,coll, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
mapcat.cljs$lang$arity$2 = mapcat__2;
mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9122 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9122)
{var s__9123 = temp__3974__auto____9122;
if(cljs.core.chunked_seq_QMARK_.call(null,s__9123))
{var c__9124 = cljs.core.chunk_first.call(null,s__9123);
var size__9125 = cljs.core.count.call(null,c__9124);
var b__9126 = cljs.core.chunk_buffer.call(null,size__9125);
var n__3384__auto____9127 = size__9125;
var i__9128 = 0;
while(true){
if((i__9128 < n__3384__auto____9127))
{if(cljs.core.truth_(pred.call(null,cljs.core._nth.call(null,c__9124,i__9128))))
{cljs.core.chunk_append.call(null,b__9126,cljs.core._nth.call(null,c__9124,i__9128));
} else
{}
{
var G__9131 = (i__9128 + 1);
i__9128 = G__9131;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9126),filter.call(null,pred,cljs.core.chunk_rest.call(null,s__9123)));
} else
{var f__9129 = cljs.core.first.call(null,s__9123);
var r__9130 = cljs.core.rest.call(null,s__9123);
if(cljs.core.truth_(pred.call(null,f__9129)))
{return cljs.core.cons.call(null,f__9129,filter.call(null,pred,r__9130));
} else
{return filter.call(null,pred,r__9130);
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__9134 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
}),null));
});
return walk__9134.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__9132_SHARP_){
return !(cljs.core.sequential_QMARK_.call(null,p1__9132_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
if((function (){var G__9138__9139 = to;
if(G__9138__9139)
{if((function (){var or__3824__auto____9140 = (G__9138__9139.cljs$lang$protocol_mask$partition1$ & 1);
if(or__3824__auto____9140)
{return or__3824__auto____9140;
} else
{return G__9138__9139.cljs$core$IEditableCollection$;
}
})())
{return true;
} else
{if((!G__9138__9139.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__9138__9139);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__9138__9139);
}
})())
{return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core.transient$.call(null,to),from));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,to,from);
}
});
/**
* Returns a vector consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.mapv = (function() {
var mapv = null;
var mapv__2 = (function (f,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
return cljs.core.conj_BANG_.call(null,v,f.call(null,o));
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
var mapv__3 = (function (f,c1,c2){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2));
});
var mapv__4 = (function (f,c1,c2,c3){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2,c3));
});
var mapv__5 = (function() { 
var G__9141__delegate = function (f,c1,c2,c3,colls){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.apply.call(null,cljs.core.map,f,c1,c2,c3,colls));
};
var G__9141 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__9141__delegate.call(this, f, c1, c2, c3, colls);
};
G__9141.cljs$lang$maxFixedArity = 4;
G__9141.cljs$lang$applyTo = (function (arglist__9142){
var f = cljs.core.first(arglist__9142);
var c1 = cljs.core.first(cljs.core.next(arglist__9142));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9142)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9142))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9142))));
return G__9141__delegate(f, c1, c2, c3, colls);
});
G__9141.cljs$lang$arity$variadic = G__9141__delegate;
return G__9141;
})()
;
mapv = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapv__2.call(this,f,c1);
case 3:
return mapv__3.call(this,f,c1,c2);
case 4:
return mapv__4.call(this,f,c1,c2,c3);
default:
return mapv__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
mapv.cljs$lang$maxFixedArity = 4;
mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
mapv.cljs$lang$arity$2 = mapv__2;
mapv.cljs$lang$arity$3 = mapv__3;
mapv.cljs$lang$arity$4 = mapv__4;
mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
return mapv;
})()
;
/**
* Returns a vector of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filterv = (function filterv(pred,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
if(cljs.core.truth_(pred.call(null,o)))
{return cljs.core.conj_BANG_.call(null,v,o);
} else
{return v;
}
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__2 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9149 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9149)
{var s__9150 = temp__3974__auto____9149;
var p__9151 = cljs.core.take.call(null,n,s__9150);
if((n === cljs.core.count.call(null,p__9151)))
{return cljs.core.cons.call(null,p__9151,partition.call(null,n,step,cljs.core.drop.call(null,step,s__9150)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
var partition__4 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____9152 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____9152)
{var s__9153 = temp__3974__auto____9152;
var p__9154 = cljs.core.take.call(null,n,s__9153);
if((n === cljs.core.count.call(null,p__9154)))
{return cljs.core.cons.call(null,p__9154,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__9153)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__9154,pad)));
}
} else
{return null;
}
}),null));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case 2:
return partition__2.call(this,n,step);
case 3:
return partition__3.call(this,n,step,pad);
case 4:
return partition__4.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition.cljs$lang$arity$2 = partition__2;
partition.cljs$lang$arity$3 = partition__3;
partition.cljs$lang$arity$4 = partition__4;
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of keys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__2 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3 = (function (m,ks,not_found){
var sentinel__9159 = cljs.core.lookup_sentinel;
var m__9160 = m;
var ks__9161 = cljs.core.seq.call(null,ks);
while(true){
if(ks__9161)
{var m__9162 = cljs.core._lookup.call(null,m__9160,cljs.core.first.call(null,ks__9161),sentinel__9159);
if((sentinel__9159 === m__9162))
{return not_found;
} else
{{
var G__9163 = sentinel__9159;
var G__9164 = m__9162;
var G__9165 = cljs.core.next.call(null,ks__9161);
sentinel__9159 = G__9163;
m__9160 = G__9164;
ks__9161 = G__9165;
continue;
}
}
} else
{return m__9160;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case 2:
return get_in__2.call(this,m,ks);
case 3:
return get_in__3.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get_in.cljs$lang$arity$2 = get_in__2;
get_in.cljs$lang$arity$3 = get_in__3;
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__9166,v){
var vec__9171__9172 = p__9166;
var k__9173 = cljs.core.nth.call(null,vec__9171__9172,0,null);
var ks__9174 = cljs.core.nthnext.call(null,vec__9171__9172,1);
if(cljs.core.truth_(ks__9174))
{return cljs.core.assoc.call(null,m,k__9173,assoc_in.call(null,cljs.core._lookup.call(null,m,k__9173,null),ks__9174,v));
} else
{return cljs.core.assoc.call(null,m,k__9173,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__9175,f,args){
var vec__9180__9181 = p__9175;
var k__9182 = cljs.core.nth.call(null,vec__9180__9181,0,null);
var ks__9183 = cljs.core.nthnext.call(null,vec__9180__9181,1);
if(cljs.core.truth_(ks__9183))
{return cljs.core.assoc.call(null,m,k__9182,cljs.core.apply.call(null,update_in,cljs.core._lookup.call(null,m,k__9182,null),ks__9183,f,args));
} else
{return cljs.core.assoc.call(null,m,k__9182,cljs.core.apply.call(null,f,cljs.core._lookup.call(null,m,k__9182,null),args));
}
};
var update_in = function (m,p__9175,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__9175, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__9184){
var m = cljs.core.first(arglist__9184);
var p__9175 = cljs.core.first(cljs.core.next(arglist__9184));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9184)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9184)));
return update_in__delegate(m, p__9175, f, args);
});
update_in.cljs$lang$arity$variadic = update_in__delegate;
return update_in;
})()
;

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array,__hash){
this.meta = meta;
this.array = array;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Vector");
});
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9187 = this;
var h__3049__auto____9188 = this__9187.__hash;
if(!((h__3049__auto____9188 == null)))
{return h__3049__auto____9188;
} else
{var h__3049__auto____9189 = cljs.core.hash_coll.call(null,coll);
this__9187.__hash = h__3049__auto____9189;
return h__3049__auto____9189;
}
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9190 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9191 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9192 = this;
var new_array__9193 = this__9192.array.slice();
(new_array__9193[k] = v);
return (new cljs.core.Vector(this__9192.meta,new_array__9193,null));
});
cljs.core.Vector.prototype.call = (function() {
var G__9224 = null;
var G__9224__2 = (function (this_sym9194,k){
var this__9196 = this;
var this_sym9194__9197 = this;
var coll__9198 = this_sym9194__9197;
return coll__9198.cljs$core$ILookup$_lookup$arity$2(coll__9198,k);
});
var G__9224__3 = (function (this_sym9195,k,not_found){
var this__9196 = this;
var this_sym9195__9199 = this;
var coll__9200 = this_sym9195__9199;
return coll__9200.cljs$core$ILookup$_lookup$arity$3(coll__9200,k,not_found);
});
G__9224 = function(this_sym9195,k,not_found){
switch(arguments.length){
case 2:
return G__9224__2.call(this,this_sym9195,k);
case 3:
return G__9224__3.call(this,this_sym9195,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9224;
})()
;
cljs.core.Vector.prototype.apply = (function (this_sym9185,args9186){
var this__9201 = this;
return this_sym9185.call.apply(this_sym9185,[this_sym9185].concat(args9186.slice()));
});
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9202 = this;
var new_array__9203 = this__9202.array.slice();
new_array__9203.push(o);
return (new cljs.core.Vector(this__9202.meta,new_array__9203,null));
});
cljs.core.Vector.prototype.toString = (function (){
var this__9204 = this;
var this__9205 = this;
return cljs.core.pr_str.call(null,this__9205);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__9206 = this;
return cljs.core.ci_reduce.call(null,this__9206.array,f);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__9207 = this;
return cljs.core.ci_reduce.call(null,this__9207.array,f,start);
});
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9208 = this;
if((this__9208.array.length > 0))
{var vector_seq__9209 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < this__9208.array.length))
{return cljs.core.cons.call(null,(this__9208.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
}),null));
});
return vector_seq__9209.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9210 = this;
return this__9210.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9211 = this;
var count__9212 = this__9211.array.length;
if((count__9212 > 0))
{return (this__9211.array[(count__9212 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9213 = this;
if((this__9213.array.length > 0))
{var new_array__9214 = this__9213.array.slice();
new_array__9214.pop();
return (new cljs.core.Vector(this__9213.meta,new_array__9214,null));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9215 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9216 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9217 = this;
return (new cljs.core.Vector(meta,this__9217.array,this__9217.__hash));
});
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9218 = this;
return this__9218.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9219 = this;
if((function (){var and__3822__auto____9220 = (0 <= n);
if(and__3822__auto____9220)
{return (n < this__9219.array.length);
} else
{return and__3822__auto____9220;
}
})())
{return (this__9219.array[n]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9221 = this;
if((function (){var and__3822__auto____9222 = (0 <= n);
if(and__3822__auto____9222)
{return (n < this__9221.array.length);
} else
{return and__3822__auto____9222;
}
})())
{return (this__9221.array[n]);
} else
{return not_found;
}
});
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9223 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__9223.meta);
});
cljs.core.Vector;
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,[],0));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs,null));
});

/**
* @constructor
*/
cljs.core.VectorNode = (function (edit,arr){
this.edit = edit;
this.arr = arr;
})
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = (function (this__3167__auto__){
return cljs.core.list.call(null,"cljs.core/VectorNode");
});
cljs.core.VectorNode;
cljs.core.pv_fresh_node = (function pv_fresh_node(edit){
return (new cljs.core.VectorNode(edit,cljs.core.make_array.call(null,32)));
});
cljs.core.pv_aget = (function pv_aget(node,idx){
return (node.arr[idx]);
});
cljs.core.pv_aset = (function pv_aset(node,idx,val){
return (node.arr[idx] = val);
});
cljs.core.pv_clone_node = (function pv_clone_node(node){
return (new cljs.core.VectorNode(node.edit,node.arr.slice()));
});
cljs.core.tail_off = (function tail_off(pv){
var cnt__9226 = pv.cnt;
if((cnt__9226 < 32))
{return 0;
} else
{return (((cnt__9226 - 1) >>> 5) << 5);
}
});
cljs.core.new_path = (function new_path(edit,level,node){
var ll__9232 = level;
var ret__9233 = node;
while(true){
if((ll__9232 === 0))
{return ret__9233;
} else
{var embed__9234 = ret__9233;
var r__9235 = cljs.core.pv_fresh_node.call(null,edit);
var ___9236 = cljs.core.pv_aset.call(null,r__9235,0,embed__9234);
{
var G__9237 = (ll__9232 - 5);
var G__9238 = r__9235;
ll__9232 = G__9237;
ret__9233 = G__9238;
continue;
}
}
break;
}
});
cljs.core.push_tail = (function push_tail(pv,level,parent,tailnode){
var ret__9244 = cljs.core.pv_clone_node.call(null,parent);
var subidx__9245 = (((pv.cnt - 1) >>> level) & 31);
if((5 === level))
{cljs.core.pv_aset.call(null,ret__9244,subidx__9245,tailnode);
return ret__9244;
} else
{var child__9246 = cljs.core.pv_aget.call(null,parent,subidx__9245);
if(!((child__9246 == null)))
{var node_to_insert__9247 = push_tail.call(null,pv,(level - 5),child__9246,tailnode);
cljs.core.pv_aset.call(null,ret__9244,subidx__9245,node_to_insert__9247);
return ret__9244;
} else
{var node_to_insert__9248 = cljs.core.new_path.call(null,null,(level - 5),tailnode);
cljs.core.pv_aset.call(null,ret__9244,subidx__9245,node_to_insert__9248);
return ret__9244;
}
}
});
cljs.core.array_for = (function array_for(pv,i){
if((function (){var and__3822__auto____9252 = (0 <= i);
if(and__3822__auto____9252)
{return (i < pv.cnt);
} else
{return and__3822__auto____9252;
}
})())
{if((i >= cljs.core.tail_off.call(null,pv)))
{return pv.tail;
} else
{var node__9253 = pv.root;
var level__9254 = pv.shift;
while(true){
if((level__9254 > 0))
{{
var G__9255 = cljs.core.pv_aget.call(null,node__9253,((i >>> level__9254) & 31));
var G__9256 = (level__9254 - 5);
node__9253 = G__9255;
level__9254 = G__9256;
continue;
}
} else
{return node__9253.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in vector of length "),cljs.core.str(pv.cnt)].join('')));
}
});
cljs.core.do_assoc = (function do_assoc(pv,level,node,i,val){
var ret__9259 = cljs.core.pv_clone_node.call(null,node);
if((level === 0))
{cljs.core.pv_aset.call(null,ret__9259,(i & 31),val);
return ret__9259;
} else
{var subidx__9260 = ((i >>> level) & 31);
cljs.core.pv_aset.call(null,ret__9259,subidx__9260,do_assoc.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__9260),i,val));
return ret__9259;
}
});
cljs.core.pop_tail = (function pop_tail(pv,level,node){
var subidx__9266 = (((pv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__9267 = pop_tail.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__9266));
if((function (){var and__3822__auto____9268 = (new_child__9267 == null);
if(and__3822__auto____9268)
{return (subidx__9266 === 0);
} else
{return and__3822__auto____9268;
}
})())
{return null;
} else
{var ret__9269 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__9269,subidx__9266,new_child__9267);
return ret__9269;
}
} else
{if((subidx__9266 === 0))
{return null;
} else
{if("\uFDD0'else")
{var ret__9270 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__9270,subidx__9266,null);
return ret__9270;
} else
{return null;
}
}
}
});

/**
* @constructor
*/
cljs.core.PersistentVector = (function (meta,cnt,shift,root,tail,__hash){
this.meta = meta;
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 167668511;
})
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentVector");
});
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9273 = this;
return (new cljs.core.TransientVector(this__9273.cnt,this__9273.shift,cljs.core.tv_editable_root.call(null,this__9273.root),cljs.core.tv_editable_tail.call(null,this__9273.tail)));
});
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9274 = this;
var h__3049__auto____9275 = this__9274.__hash;
if(!((h__3049__auto____9275 == null)))
{return h__3049__auto____9275;
} else
{var h__3049__auto____9276 = cljs.core.hash_coll.call(null,coll);
this__9274.__hash = h__3049__auto____9276;
return h__3049__auto____9276;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9277 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9278 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9279 = this;
if((function (){var and__3822__auto____9280 = (0 <= k);
if(and__3822__auto____9280)
{return (k < this__9279.cnt);
} else
{return and__3822__auto____9280;
}
})())
{if((cljs.core.tail_off.call(null,coll) <= k))
{var new_tail__9281 = this__9279.tail.slice();
(new_tail__9281[(k & 31)] = v);
return (new cljs.core.PersistentVector(this__9279.meta,this__9279.cnt,this__9279.shift,this__9279.root,new_tail__9281,null));
} else
{return (new cljs.core.PersistentVector(this__9279.meta,this__9279.cnt,this__9279.shift,cljs.core.do_assoc.call(null,coll,this__9279.shift,this__9279.root,k,v),this__9279.tail,null));
}
} else
{if((k === this__9279.cnt))
{return coll.cljs$core$ICollection$_conj$arity$2(coll,v);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(k),cljs.core.str(" out of bounds  [0,"),cljs.core.str(this__9279.cnt),cljs.core.str("]")].join('')));
} else
{return null;
}
}
}
});
cljs.core.PersistentVector.prototype.call = (function() {
var G__9329 = null;
var G__9329__2 = (function (this_sym9282,k){
var this__9284 = this;
var this_sym9282__9285 = this;
var coll__9286 = this_sym9282__9285;
return coll__9286.cljs$core$ILookup$_lookup$arity$2(coll__9286,k);
});
var G__9329__3 = (function (this_sym9283,k,not_found){
var this__9284 = this;
var this_sym9283__9287 = this;
var coll__9288 = this_sym9283__9287;
return coll__9288.cljs$core$ILookup$_lookup$arity$3(coll__9288,k,not_found);
});
G__9329 = function(this_sym9283,k,not_found){
switch(arguments.length){
case 2:
return G__9329__2.call(this,this_sym9283,k);
case 3:
return G__9329__3.call(this,this_sym9283,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9329;
})()
;
cljs.core.PersistentVector.prototype.apply = (function (this_sym9271,args9272){
var this__9289 = this;
return this_sym9271.call.apply(this_sym9271,[this_sym9271].concat(args9272.slice()));
});
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (v,f,init){
var this__9290 = this;
var step_init__9291 = [0,init];
var i__9292 = 0;
while(true){
if((i__9292 < this__9290.cnt))
{var arr__9293 = cljs.core.array_for.call(null,v,i__9292);
var len__9294 = arr__9293.length;
var init__9298 = (function (){var j__9295 = 0;
var init__9296 = (step_init__9291[1]);
while(true){
if((j__9295 < len__9294))
{var init__9297 = f.call(null,init__9296,(j__9295 + i__9292),(arr__9293[j__9295]));
if(cljs.core.reduced_QMARK_.call(null,init__9297))
{return init__9297;
} else
{{
var G__9330 = (j__9295 + 1);
var G__9331 = init__9297;
j__9295 = G__9330;
init__9296 = G__9331;
continue;
}
}
} else
{(step_init__9291[0] = len__9294);
(step_init__9291[1] = init__9296);
return init__9296;
}
break;
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__9298))
{return cljs.core.deref.call(null,init__9298);
} else
{{
var G__9332 = (i__9292 + (step_init__9291[0]));
i__9292 = G__9332;
continue;
}
}
} else
{return (step_init__9291[1]);
}
break;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9299 = this;
if(((this__9299.cnt - cljs.core.tail_off.call(null,coll)) < 32))
{var new_tail__9300 = this__9299.tail.slice();
new_tail__9300.push(o);
return (new cljs.core.PersistentVector(this__9299.meta,(this__9299.cnt + 1),this__9299.shift,this__9299.root,new_tail__9300,null));
} else
{var root_overflow_QMARK___9301 = ((this__9299.cnt >>> 5) > (1 << this__9299.shift));
var new_shift__9302 = ((root_overflow_QMARK___9301)?(this__9299.shift + 5):this__9299.shift);
var new_root__9304 = ((root_overflow_QMARK___9301)?(function (){var n_r__9303 = cljs.core.pv_fresh_node.call(null,null);
cljs.core.pv_aset.call(null,n_r__9303,0,this__9299.root);
cljs.core.pv_aset.call(null,n_r__9303,1,cljs.core.new_path.call(null,null,this__9299.shift,(new cljs.core.VectorNode(null,this__9299.tail))));
return n_r__9303;
})():cljs.core.push_tail.call(null,coll,this__9299.shift,this__9299.root,(new cljs.core.VectorNode(null,this__9299.tail))));
return (new cljs.core.PersistentVector(this__9299.meta,(this__9299.cnt + 1),new_shift__9302,new_root__9304,[o],null));
}
});
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9305 = this;
if((this__9305.cnt > 0))
{return (new cljs.core.RSeq(coll,(this__9305.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (coll){
var this__9306 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,0);
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (coll){
var this__9307 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,1);
});
cljs.core.PersistentVector.prototype.toString = (function (){
var this__9308 = this;
var this__9309 = this;
return cljs.core.pr_str.call(null,this__9309);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__9310 = this;
return cljs.core.ci_reduce.call(null,v,f);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__9311 = this;
return cljs.core.ci_reduce.call(null,v,f,start);
});
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9312 = this;
if((this__9312.cnt === 0))
{return null;
} else
{return cljs.core.chunked_seq.call(null,coll,0,0);
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9313 = this;
return this__9313.cnt;
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9314 = this;
if((this__9314.cnt > 0))
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,(this__9314.cnt - 1));
} else
{return null;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9315 = this;
if((this__9315.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__9315.cnt))
{return cljs.core._with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9315.meta);
} else
{if((1 < (this__9315.cnt - cljs.core.tail_off.call(null,coll))))
{return (new cljs.core.PersistentVector(this__9315.meta,(this__9315.cnt - 1),this__9315.shift,this__9315.root,this__9315.tail.slice(0,-1),null));
} else
{if("\uFDD0'else")
{var new_tail__9316 = cljs.core.array_for.call(null,coll,(this__9315.cnt - 2));
var nr__9317 = cljs.core.pop_tail.call(null,coll,this__9315.shift,this__9315.root);
var new_root__9318 = (((nr__9317 == null))?cljs.core.PersistentVector.EMPTY_NODE:nr__9317);
var cnt_1__9319 = (this__9315.cnt - 1);
if((function (){var and__3822__auto____9320 = (5 < this__9315.shift);
if(and__3822__auto____9320)
{return (cljs.core.pv_aget.call(null,new_root__9318,1) == null);
} else
{return and__3822__auto____9320;
}
})())
{return (new cljs.core.PersistentVector(this__9315.meta,cnt_1__9319,(this__9315.shift - 5),cljs.core.pv_aget.call(null,new_root__9318,0),new_tail__9316,null));
} else
{return (new cljs.core.PersistentVector(this__9315.meta,cnt_1__9319,this__9315.shift,new_root__9318,new_tail__9316,null));
}
} else
{return null;
}
}
}
}
});
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9321 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9322 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9323 = this;
return (new cljs.core.PersistentVector(meta,this__9323.cnt,this__9323.shift,this__9323.root,this__9323.tail,this__9323.__hash));
});
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9324 = this;
return this__9324.meta;
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9325 = this;
return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9326 = this;
if((function (){var and__3822__auto____9327 = (0 <= n);
if(and__3822__auto____9327)
{return (n < this__9326.cnt);
} else
{return and__3822__auto____9327;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9328 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9328.meta);
});
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null,null);
cljs.core.PersistentVector.EMPTY = (new cljs.core.PersistentVector(null,0,5,cljs.core.PersistentVector.EMPTY_NODE,[],0));
cljs.core.PersistentVector.fromArray = (function (xs,no_clone){
var l__9333 = xs.length;
var xs__9334 = (((no_clone === true))?xs:xs.slice());
if((l__9333 < 32))
{return (new cljs.core.PersistentVector(null,l__9333,5,cljs.core.PersistentVector.EMPTY_NODE,xs__9334,null));
} else
{var node__9335 = xs__9334.slice(0,32);
var v__9336 = (new cljs.core.PersistentVector(null,32,5,cljs.core.PersistentVector.EMPTY_NODE,node__9335,null));
var i__9337 = 32;
var out__9338 = cljs.core._as_transient.call(null,v__9336);
while(true){
if((i__9337 < l__9333))
{{
var G__9339 = (i__9337 + 1);
var G__9340 = cljs.core.conj_BANG_.call(null,out__9338,(xs__9334[i__9337]));
i__9337 = G__9339;
out__9338 = G__9340;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9338);
}
break;
}
}
});
cljs.core.vec = (function vec(coll){
return cljs.core._persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core._as_transient.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__9341){
var args = cljs.core.seq(arglist__9341);;
return vector__delegate(args);
});
vector.cljs$lang$arity$variadic = vector__delegate;
return vector;
})()
;

/**
* @constructor
*/
cljs.core.ChunkedSeq = (function (vec,node,i,off,meta){
this.vec = vec;
this.node = node;
this.i = i;
this.off = off;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 27525356;
})
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedSeq");
});
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__9342 = this;
if(((this__9342.off + 1) < this__9342.node.length))
{var s__9343 = cljs.core.chunked_seq.call(null,this__9342.vec,this__9342.node,this__9342.i,(this__9342.off + 1));
if((s__9343 == null))
{return null;
} else
{return s__9343;
}
} else
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9344 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9345 = this;
return coll;
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9346 = this;
return (this__9346.node[this__9346.off]);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9347 = this;
if(((this__9347.off + 1) < this__9347.node.length))
{var s__9348 = cljs.core.chunked_seq.call(null,this__9347.vec,this__9347.node,this__9347.i,(this__9347.off + 1));
if((s__9348 == null))
{return cljs.core.List.EMPTY;
} else
{return s__9348;
}
} else
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__9349 = this;
var l__9350 = this__9349.node.length;
var s__9351 = ((((this__9349.i + l__9350) < cljs.core._count.call(null,this__9349.vec)))?cljs.core.chunked_seq.call(null,this__9349.vec,(this__9349.i + l__9350),0):null);
if((s__9351 == null))
{return null;
} else
{return s__9351;
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9352 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__9353 = this;
return cljs.core.chunked_seq.call(null,this__9353.vec,this__9353.node,this__9353.i,this__9353.off,m);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = (function (coll){
var this__9354 = this;
return this__9354.meta;
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9355 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__9355.meta);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__9356 = this;
return cljs.core.array_chunk.call(null,this__9356.node,this__9356.off);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__9357 = this;
var l__9358 = this__9357.node.length;
var s__9359 = ((((this__9357.i + l__9358) < cljs.core._count.call(null,this__9357.vec)))?cljs.core.chunked_seq.call(null,this__9357.vec,(this__9357.i + l__9358),0):null);
if((s__9359 == null))
{return cljs.core.List.EMPTY;
} else
{return s__9359;
}
});
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = (function() {
var chunked_seq = null;
var chunked_seq__3 = (function (vec,i,off){
return chunked_seq.call(null,vec,cljs.core.array_for.call(null,vec,i),i,off,null);
});
var chunked_seq__4 = (function (vec,node,i,off){
return chunked_seq.call(null,vec,node,i,off,null);
});
var chunked_seq__5 = (function (vec,node,i,off,meta){
return (new cljs.core.ChunkedSeq(vec,node,i,off,meta));
});
chunked_seq = function(vec,node,i,off,meta){
switch(arguments.length){
case 3:
return chunked_seq__3.call(this,vec,node,i);
case 4:
return chunked_seq__4.call(this,vec,node,i,off);
case 5:
return chunked_seq__5.call(this,vec,node,i,off,meta);
}
throw('Invalid arity: ' + arguments.length);
};
chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
return chunked_seq;
})()
;

/**
* @constructor
*/
cljs.core.Subvec = (function (meta,v,start,end,__hash){
this.meta = meta;
this.v = v;
this.start = start;
this.end = end;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Subvec");
});
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9362 = this;
var h__3049__auto____9363 = this__9362.__hash;
if(!((h__3049__auto____9363 == null)))
{return h__3049__auto____9363;
} else
{var h__3049__auto____9364 = cljs.core.hash_coll.call(null,coll);
this__9362.__hash = h__3049__auto____9364;
return h__3049__auto____9364;
}
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9365 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9366 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,key,val){
var this__9367 = this;
var v_pos__9368 = (this__9367.start + key);
return (new cljs.core.Subvec(this__9367.meta,cljs.core._assoc.call(null,this__9367.v,v_pos__9368,val),this__9367.start,((this__9367.end > (v_pos__9368 + 1)) ? this__9367.end : (v_pos__9368 + 1)),null));
});
cljs.core.Subvec.prototype.call = (function() {
var G__9394 = null;
var G__9394__2 = (function (this_sym9369,k){
var this__9371 = this;
var this_sym9369__9372 = this;
var coll__9373 = this_sym9369__9372;
return coll__9373.cljs$core$ILookup$_lookup$arity$2(coll__9373,k);
});
var G__9394__3 = (function (this_sym9370,k,not_found){
var this__9371 = this;
var this_sym9370__9374 = this;
var coll__9375 = this_sym9370__9374;
return coll__9375.cljs$core$ILookup$_lookup$arity$3(coll__9375,k,not_found);
});
G__9394 = function(this_sym9370,k,not_found){
switch(arguments.length){
case 2:
return G__9394__2.call(this,this_sym9370,k);
case 3:
return G__9394__3.call(this,this_sym9370,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9394;
})()
;
cljs.core.Subvec.prototype.apply = (function (this_sym9360,args9361){
var this__9376 = this;
return this_sym9360.call.apply(this_sym9360,[this_sym9360].concat(args9361.slice()));
});
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9377 = this;
return (new cljs.core.Subvec(this__9377.meta,cljs.core._assoc_n.call(null,this__9377.v,this__9377.end,o),this__9377.start,(this__9377.end + 1),null));
});
cljs.core.Subvec.prototype.toString = (function (){
var this__9378 = this;
var this__9379 = this;
return cljs.core.pr_str.call(null,this__9379);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__9380 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__9381 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9382 = this;
var subvec_seq__9383 = (function subvec_seq(i){
if((i === this__9382.end))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__9382.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}),null)));
}
});
return subvec_seq__9383.call(null,this__9382.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9384 = this;
return (this__9384.end - this__9384.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9385 = this;
return cljs.core._nth.call(null,this__9385.v,(this__9385.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9386 = this;
if((this__9386.start === this__9386.end))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__9386.meta,this__9386.v,this__9386.start,(this__9386.end - 1),null));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__9387 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9388 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9389 = this;
return (new cljs.core.Subvec(meta,this__9389.v,this__9389.start,this__9389.end,this__9389.__hash));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9390 = this;
return this__9390.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9391 = this;
return cljs.core._nth.call(null,this__9391.v,(this__9391.start + n));
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9392 = this;
return cljs.core._nth.call(null,this__9392.v,(this__9392.start + n),not_found);
});
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9393 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__9393.meta);
});
cljs.core.Subvec;
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__2 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__3 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end,null));
});
subvec = function(v,start,end){
switch(arguments.length){
case 2:
return subvec__2.call(this,v,start);
case 3:
return subvec__3.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subvec.cljs$lang$arity$2 = subvec__2;
subvec.cljs$lang$arity$3 = subvec__3;
return subvec;
})()
;
cljs.core.tv_ensure_editable = (function tv_ensure_editable(edit,node){
if((edit === node.edit))
{return node;
} else
{return (new cljs.core.VectorNode(edit,node.arr.slice()));
}
});
cljs.core.tv_editable_root = (function tv_editable_root(node){
return (new cljs.core.VectorNode({},node.arr.slice()));
});
cljs.core.tv_editable_tail = (function tv_editable_tail(tl){
var ret__9396 = cljs.core.make_array.call(null,32);
cljs.core.array_copy.call(null,tl,0,ret__9396,0,tl.length);
return ret__9396;
});
cljs.core.tv_push_tail = (function tv_push_tail(tv,level,parent,tail_node){
var ret__9400 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,parent);
var subidx__9401 = (((tv.cnt - 1) >>> level) & 31);
cljs.core.pv_aset.call(null,ret__9400,subidx__9401,(((level === 5))?tail_node:(function (){var child__9402 = cljs.core.pv_aget.call(null,ret__9400,subidx__9401);
if(!((child__9402 == null)))
{return tv_push_tail.call(null,tv,(level - 5),child__9402,tail_node);
} else
{return cljs.core.new_path.call(null,tv.root.edit,(level - 5),tail_node);
}
})()));
return ret__9400;
});
cljs.core.tv_pop_tail = (function tv_pop_tail(tv,level,node){
var node__9407 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,node);
var subidx__9408 = (((tv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__9409 = tv_pop_tail.call(null,tv,(level - 5),cljs.core.pv_aget.call(null,node__9407,subidx__9408));
if((function (){var and__3822__auto____9410 = (new_child__9409 == null);
if(and__3822__auto____9410)
{return (subidx__9408 === 0);
} else
{return and__3822__auto____9410;
}
})())
{return null;
} else
{cljs.core.pv_aset.call(null,node__9407,subidx__9408,new_child__9409);
return node__9407;
}
} else
{if((subidx__9408 === 0))
{return null;
} else
{if("\uFDD0'else")
{cljs.core.pv_aset.call(null,node__9407,subidx__9408,null);
return node__9407;
} else
{return null;
}
}
}
});
cljs.core.editable_array_for = (function editable_array_for(tv,i){
if((function (){var and__3822__auto____9415 = (0 <= i);
if(and__3822__auto____9415)
{return (i < tv.cnt);
} else
{return and__3822__auto____9415;
}
})())
{if((i >= cljs.core.tail_off.call(null,tv)))
{return tv.tail;
} else
{var root__9416 = tv.root;
var node__9417 = root__9416;
var level__9418 = tv.shift;
while(true){
if((level__9418 > 0))
{{
var G__9419 = cljs.core.tv_ensure_editable.call(null,root__9416.edit,cljs.core.pv_aget.call(null,node__9417,((i >>> level__9418) & 31)));
var G__9420 = (level__9418 - 5);
node__9417 = G__9419;
level__9418 = G__9420;
continue;
}
} else
{return node__9417.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in transient vector of length "),cljs.core.str(tv.cnt)].join('')));
}
});

/**
* @constructor
*/
cljs.core.TransientVector = (function (cnt,shift,root,tail){
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.cljs$lang$protocol_mask$partition0$ = 275;
this.cljs$lang$protocol_mask$partition1$ = 22;
})
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/TransientVector");
});
cljs.core.TransientVector.prototype.call = (function() {
var G__9460 = null;
var G__9460__2 = (function (this_sym9423,k){
var this__9425 = this;
var this_sym9423__9426 = this;
var coll__9427 = this_sym9423__9426;
return coll__9427.cljs$core$ILookup$_lookup$arity$2(coll__9427,k);
});
var G__9460__3 = (function (this_sym9424,k,not_found){
var this__9425 = this;
var this_sym9424__9428 = this;
var coll__9429 = this_sym9424__9428;
return coll__9429.cljs$core$ILookup$_lookup$arity$3(coll__9429,k,not_found);
});
G__9460 = function(this_sym9424,k,not_found){
switch(arguments.length){
case 2:
return G__9460__2.call(this,this_sym9424,k);
case 3:
return G__9460__3.call(this,this_sym9424,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9460;
})()
;
cljs.core.TransientVector.prototype.apply = (function (this_sym9421,args9422){
var this__9430 = this;
return this_sym9421.call.apply(this_sym9421,[this_sym9421].concat(args9422.slice()));
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9431 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9432 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__9433 = this;
if(this__9433.root.edit)
{return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
} else
{throw (new Error("nth after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__9434 = this;
if((function (){var and__3822__auto____9435 = (0 <= n);
if(and__3822__auto____9435)
{return (n < this__9434.cnt);
} else
{return and__3822__auto____9435;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9436 = this;
if(this__9436.root.edit)
{return this__9436.cnt;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = (function (tcoll,n,val){
var this__9437 = this;
if(this__9437.root.edit)
{if((function (){var and__3822__auto____9438 = (0 <= n);
if(and__3822__auto____9438)
{return (n < this__9437.cnt);
} else
{return and__3822__auto____9438;
}
})())
{if((cljs.core.tail_off.call(null,tcoll) <= n))
{(this__9437.tail[(n & 31)] = val);
return tcoll;
} else
{var new_root__9443 = (function go(level,node){
var node__9441 = cljs.core.tv_ensure_editable.call(null,this__9437.root.edit,node);
if((level === 0))
{cljs.core.pv_aset.call(null,node__9441,(n & 31),val);
return node__9441;
} else
{var subidx__9442 = ((n >>> level) & 31);
cljs.core.pv_aset.call(null,node__9441,subidx__9442,go.call(null,(level - 5),cljs.core.pv_aget.call(null,node__9441,subidx__9442)));
return node__9441;
}
}).call(null,this__9437.shift,this__9437.root);
this__9437.root = new_root__9443;
return tcoll;
}
} else
{if((n === this__9437.cnt))
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(n),cljs.core.str(" out of bounds for TransientVector of length"),cljs.core.str(this__9437.cnt)].join('')));
} else
{return null;
}
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = (function (tcoll){
var this__9444 = this;
if(this__9444.root.edit)
{if((this__9444.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__9444.cnt))
{this__9444.cnt = 0;
return tcoll;
} else
{if((((this__9444.cnt - 1) & 31) > 0))
{this__9444.cnt = (this__9444.cnt - 1);
return tcoll;
} else
{if("\uFDD0'else")
{var new_tail__9445 = cljs.core.editable_array_for.call(null,tcoll,(this__9444.cnt - 2));
var new_root__9447 = (function (){var nr__9446 = cljs.core.tv_pop_tail.call(null,tcoll,this__9444.shift,this__9444.root);
if(!((nr__9446 == null)))
{return nr__9446;
} else
{return (new cljs.core.VectorNode(this__9444.root.edit,cljs.core.make_array.call(null,32)));
}
})();
if((function (){var and__3822__auto____9448 = (5 < this__9444.shift);
if(and__3822__auto____9448)
{return (cljs.core.pv_aget.call(null,new_root__9447,1) == null);
} else
{return and__3822__auto____9448;
}
})())
{var new_root__9449 = cljs.core.tv_ensure_editable.call(null,this__9444.root.edit,cljs.core.pv_aget.call(null,new_root__9447,0));
this__9444.root = new_root__9449;
this__9444.shift = (this__9444.shift - 5);
this__9444.cnt = (this__9444.cnt - 1);
this__9444.tail = new_tail__9445;
return tcoll;
} else
{this__9444.root = new_root__9447;
this__9444.cnt = (this__9444.cnt - 1);
this__9444.tail = new_tail__9445;
return tcoll;
}
} else
{return null;
}
}
}
}
} else
{throw (new Error("pop! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9450 = this;
return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,key,val);
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9451 = this;
if(this__9451.root.edit)
{if(((this__9451.cnt - cljs.core.tail_off.call(null,tcoll)) < 32))
{(this__9451.tail[(this__9451.cnt & 31)] = o);
this__9451.cnt = (this__9451.cnt + 1);
return tcoll;
} else
{var tail_node__9452 = (new cljs.core.VectorNode(this__9451.root.edit,this__9451.tail));
var new_tail__9453 = cljs.core.make_array.call(null,32);
(new_tail__9453[0] = o);
this__9451.tail = new_tail__9453;
if(((this__9451.cnt >>> 5) > (1 << this__9451.shift)))
{var new_root_array__9454 = cljs.core.make_array.call(null,32);
var new_shift__9455 = (this__9451.shift + 5);
(new_root_array__9454[0] = this__9451.root);
(new_root_array__9454[1] = cljs.core.new_path.call(null,this__9451.root.edit,this__9451.shift,tail_node__9452));
this__9451.root = (new cljs.core.VectorNode(this__9451.root.edit,new_root_array__9454));
this__9451.shift = new_shift__9455;
this__9451.cnt = (this__9451.cnt + 1);
return tcoll;
} else
{var new_root__9456 = cljs.core.tv_push_tail.call(null,tcoll,this__9451.shift,this__9451.root,tail_node__9452);
this__9451.root = new_root__9456;
this__9451.cnt = (this__9451.cnt + 1);
return tcoll;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9457 = this;
if(this__9457.root.edit)
{this__9457.root.edit = null;
var len__9458 = (this__9457.cnt - cljs.core.tail_off.call(null,tcoll));
var trimmed_tail__9459 = cljs.core.make_array.call(null,len__9458);
cljs.core.array_copy.call(null,this__9457.tail,0,trimmed_tail__9459,0,len__9458);
return (new cljs.core.PersistentVector(null,this__9457.cnt,this__9457.shift,this__9457.root,trimmed_tail__9459,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientVector;

/**
* @constructor
*/
cljs.core.PersistentQueueSeq = (function (meta,front,rear,__hash){
this.meta = meta;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9461 = this;
var h__3049__auto____9462 = this__9461.__hash;
if(!((h__3049__auto____9462 == null)))
{return h__3049__auto____9462;
} else
{var h__3049__auto____9463 = cljs.core.hash_coll.call(null,coll);
this__9461.__hash = h__3049__auto____9463;
return h__3049__auto____9463;
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9464 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.toString = (function (){
var this__9465 = this;
var this__9466 = this;
return cljs.core.pr_str.call(null,this__9466);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9467 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9468 = this;
return cljs.core._first.call(null,this__9468.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9469 = this;
var temp__3971__auto____9470 = cljs.core.next.call(null,this__9469.front);
if(temp__3971__auto____9470)
{var f1__9471 = temp__3971__auto____9470;
return (new cljs.core.PersistentQueueSeq(this__9469.meta,f1__9471,this__9469.rear,null));
} else
{if((this__9469.rear == null))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__9469.meta,this__9469.rear,null,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9472 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9473 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__9473.front,this__9473.rear,this__9473.__hash));
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9474 = this;
return this__9474.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9475 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9475.meta);
});
cljs.core.PersistentQueueSeq;

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear,__hash){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31858766;
})
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueue");
});
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9476 = this;
var h__3049__auto____9477 = this__9476.__hash;
if(!((h__3049__auto____9477 == null)))
{return h__3049__auto____9477;
} else
{var h__3049__auto____9478 = cljs.core.hash_coll.call(null,coll);
this__9476.__hash = h__3049__auto____9478;
return h__3049__auto____9478;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9479 = this;
if(cljs.core.truth_(this__9479.front))
{return (new cljs.core.PersistentQueue(this__9479.meta,(this__9479.count + 1),this__9479.front,cljs.core.conj.call(null,(function (){var or__3824__auto____9480 = this__9479.rear;
if(cljs.core.truth_(or__3824__auto____9480))
{return or__3824__auto____9480;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),o),null));
} else
{return (new cljs.core.PersistentQueue(this__9479.meta,(this__9479.count + 1),cljs.core.conj.call(null,this__9479.front,o),cljs.core.PersistentVector.EMPTY,null));
}
});
cljs.core.PersistentQueue.prototype.toString = (function (){
var this__9481 = this;
var this__9482 = this;
return cljs.core.pr_str.call(null,this__9482);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9483 = this;
var rear__9484 = cljs.core.seq.call(null,this__9483.rear);
if(cljs.core.truth_((function (){var or__3824__auto____9485 = this__9483.front;
if(cljs.core.truth_(or__3824__auto____9485))
{return or__3824__auto____9485;
} else
{return rear__9484;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__9483.front,cljs.core.seq.call(null,rear__9484),null));
} else
{return null;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9486 = this;
return this__9486.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__9487 = this;
return cljs.core._first.call(null,this__9487.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__9488 = this;
if(cljs.core.truth_(this__9488.front))
{var temp__3971__auto____9489 = cljs.core.next.call(null,this__9488.front);
if(temp__3971__auto____9489)
{var f1__9490 = temp__3971__auto____9489;
return (new cljs.core.PersistentQueue(this__9488.meta,(this__9488.count - 1),f1__9490,this__9488.rear,null));
} else
{return (new cljs.core.PersistentQueue(this__9488.meta,(this__9488.count - 1),cljs.core.seq.call(null,this__9488.rear),cljs.core.PersistentVector.EMPTY,null));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9491 = this;
return cljs.core.first.call(null,this__9491.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9492 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9493 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9494 = this;
return (new cljs.core.PersistentQueue(meta,this__9494.count,this__9494.front,this__9494.rear,this__9494.__hash));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9495 = this;
return this__9495.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9496 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.PersistentVector.EMPTY,0));

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
})
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/NeverEquiv");
});
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__9497 = this;
return false;
});
cljs.core.NeverEquiv;
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,((cljs.core.map_QMARK_.call(null,y))?(((cljs.core.count.call(null,x) === cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core._lookup.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__9500 = array.length;
var i__9501 = 0;
while(true){
if((i__9501 < len__9500))
{if((k === (array[i__9501])))
{return i__9501;
} else
{{
var G__9502 = (i__9501 + incr);
i__9501 = G__9502;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_compare_keys = (function obj_map_compare_keys(a,b){
var a__9505 = cljs.core.hash.call(null,a);
var b__9506 = cljs.core.hash.call(null,b);
if((a__9505 < b__9506))
{return -1;
} else
{if((a__9505 > b__9506))
{return 1;
} else
{if("\uFDD0'else")
{return 0;
} else
{return null;
}
}
}
});
cljs.core.obj_map__GT_hash_map = (function obj_map__GT_hash_map(m,k,v){
var ks__9514 = m.keys;
var len__9515 = ks__9514.length;
var so__9516 = m.strobj;
var out__9517 = cljs.core.with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,cljs.core.meta.call(null,m));
var i__9518 = 0;
var out__9519 = cljs.core.transient$.call(null,out__9517);
while(true){
if((i__9518 < len__9515))
{var k__9520 = (ks__9514[i__9518]);
{
var G__9521 = (i__9518 + 1);
var G__9522 = cljs.core.assoc_BANG_.call(null,out__9519,k__9520,(so__9516[k__9520]));
i__9518 = G__9521;
out__9519 = G__9522;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,out__9519,k,v));
}
break;
}
});
cljs.core.obj_clone = (function obj_clone(obj,ks){
var new_obj__9528 = {};
var l__9529 = ks.length;
var i__9530 = 0;
while(true){
if((i__9530 < l__9529))
{var k__9531 = (ks[i__9530]);
(new_obj__9528[k__9531] = (obj[k__9531]));
{
var G__9532 = (i__9530 + 1);
i__9530 = G__9532;
continue;
}
} else
{}
break;
}
return new_obj__9528;
});

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj,update_count,__hash){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
this.update_count = update_count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ObjMap");
});
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9535 = this;
return cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null),coll));
});
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9536 = this;
var h__3049__auto____9537 = this__9536.__hash;
if(!((h__3049__auto____9537 == null)))
{return h__3049__auto____9537;
} else
{var h__3049__auto____9538 = cljs.core.hash_imap.call(null,coll);
this__9536.__hash = h__3049__auto____9538;
return h__3049__auto____9538;
}
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9539 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9540 = this;
if((function (){var and__3822__auto____9541 = goog.isString(k);
if(and__3822__auto____9541)
{return !((cljs.core.scan_array.call(null,1,k,this__9540.keys) == null));
} else
{return and__3822__auto____9541;
}
})())
{return (this__9540.strobj[k]);
} else
{return not_found;
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9542 = this;
if(goog.isString(k))
{if((function (){var or__3824__auto____9543 = (this__9542.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD);
if(or__3824__auto____9543)
{return or__3824__auto____9543;
} else
{return (this__9542.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD);
}
})())
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
} else
{if(!((cljs.core.scan_array.call(null,1,k,this__9542.keys) == null)))
{var new_strobj__9544 = cljs.core.obj_clone.call(null,this__9542.strobj,this__9542.keys);
(new_strobj__9544[k] = v);
return (new cljs.core.ObjMap(this__9542.meta,this__9542.keys,new_strobj__9544,(this__9542.update_count + 1),null));
} else
{var new_strobj__9545 = cljs.core.obj_clone.call(null,this__9542.strobj,this__9542.keys);
var new_keys__9546 = this__9542.keys.slice();
(new_strobj__9545[k] = v);
new_keys__9546.push(k);
return (new cljs.core.ObjMap(this__9542.meta,new_keys__9546,new_strobj__9545,(this__9542.update_count + 1),null));
}
}
} else
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9547 = this;
if((function (){var and__3822__auto____9548 = goog.isString(k);
if(and__3822__auto____9548)
{return !((cljs.core.scan_array.call(null,1,k,this__9547.keys) == null));
} else
{return and__3822__auto____9548;
}
})())
{return true;
} else
{return false;
}
});
cljs.core.ObjMap.prototype.call = (function() {
var G__9570 = null;
var G__9570__2 = (function (this_sym9549,k){
var this__9551 = this;
var this_sym9549__9552 = this;
var coll__9553 = this_sym9549__9552;
return coll__9553.cljs$core$ILookup$_lookup$arity$2(coll__9553,k);
});
var G__9570__3 = (function (this_sym9550,k,not_found){
var this__9551 = this;
var this_sym9550__9554 = this;
var coll__9555 = this_sym9550__9554;
return coll__9555.cljs$core$ILookup$_lookup$arity$3(coll__9555,k,not_found);
});
G__9570 = function(this_sym9550,k,not_found){
switch(arguments.length){
case 2:
return G__9570__2.call(this,this_sym9550,k);
case 3:
return G__9570__3.call(this,this_sym9550,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9570;
})()
;
cljs.core.ObjMap.prototype.apply = (function (this_sym9533,args9534){
var this__9556 = this;
return this_sym9533.call.apply(this_sym9533,[this_sym9533].concat(args9534.slice()));
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9557 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.toString = (function (){
var this__9558 = this;
var this__9559 = this;
return cljs.core.pr_str.call(null,this__9559);
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9560 = this;
if((this__9560.keys.length > 0))
{return cljs.core.map.call(null,(function (p1__9523_SHARP_){
return cljs.core.vector.call(null,p1__9523_SHARP_,(this__9560.strobj[p1__9523_SHARP_]));
}),this__9560.keys.sort(cljs.core.obj_map_compare_keys));
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9561 = this;
return this__9561.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9562 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9563 = this;
return (new cljs.core.ObjMap(meta,this__9563.keys,this__9563.strobj,this__9563.update_count,this__9563.__hash));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9564 = this;
return this__9564.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9565 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__9565.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9566 = this;
if((function (){var and__3822__auto____9567 = goog.isString(k);
if(and__3822__auto____9567)
{return !((cljs.core.scan_array.call(null,1,k,this__9566.keys) == null));
} else
{return and__3822__auto____9567;
}
})())
{var new_keys__9568 = this__9566.keys.slice();
var new_strobj__9569 = cljs.core.obj_clone.call(null,this__9566.strobj,this__9566.keys);
new_keys__9568.splice(cljs.core.scan_array.call(null,1,k,new_keys__9568),1);
cljs.core.js_delete.call(null,new_strobj__9569,k);
return (new cljs.core.ObjMap(this__9566.meta,new_keys__9568,new_strobj__9569,(this__9566.update_count + 1),null));
} else
{return coll;
}
});
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,[],{},0,0));
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj,0,null));
});

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj,__hash){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/HashMap");
});
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9574 = this;
var h__3049__auto____9575 = this__9574.__hash;
if(!((h__3049__auto____9575 == null)))
{return h__3049__auto____9575;
} else
{var h__3049__auto____9576 = cljs.core.hash_imap.call(null,coll);
this__9574.__hash = h__3049__auto____9576;
return h__3049__auto____9576;
}
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9577 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9578 = this;
var bucket__9579 = (this__9578.hashobj[cljs.core.hash.call(null,k)]);
var i__9580 = (cljs.core.truth_(bucket__9579)?cljs.core.scan_array.call(null,2,k,bucket__9579):null);
if(cljs.core.truth_(i__9580))
{return (bucket__9579[(i__9580 + 1)]);
} else
{return not_found;
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9581 = this;
var h__9582 = cljs.core.hash.call(null,k);
var bucket__9583 = (this__9581.hashobj[h__9582]);
if(cljs.core.truth_(bucket__9583))
{var new_bucket__9584 = bucket__9583.slice();
var new_hashobj__9585 = goog.object.clone(this__9581.hashobj);
(new_hashobj__9585[h__9582] = new_bucket__9584);
var temp__3971__auto____9586 = cljs.core.scan_array.call(null,2,k,new_bucket__9584);
if(cljs.core.truth_(temp__3971__auto____9586))
{var i__9587 = temp__3971__auto____9586;
(new_bucket__9584[(i__9587 + 1)] = v);
return (new cljs.core.HashMap(this__9581.meta,this__9581.count,new_hashobj__9585,null));
} else
{new_bucket__9584.push(k,v);
return (new cljs.core.HashMap(this__9581.meta,(this__9581.count + 1),new_hashobj__9585,null));
}
} else
{var new_hashobj__9588 = goog.object.clone(this__9581.hashobj);
(new_hashobj__9588[h__9582] = [k,v]);
return (new cljs.core.HashMap(this__9581.meta,(this__9581.count + 1),new_hashobj__9588,null));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9589 = this;
var bucket__9590 = (this__9589.hashobj[cljs.core.hash.call(null,k)]);
var i__9591 = (cljs.core.truth_(bucket__9590)?cljs.core.scan_array.call(null,2,k,bucket__9590):null);
if(cljs.core.truth_(i__9591))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__9616 = null;
var G__9616__2 = (function (this_sym9592,k){
var this__9594 = this;
var this_sym9592__9595 = this;
var coll__9596 = this_sym9592__9595;
return coll__9596.cljs$core$ILookup$_lookup$arity$2(coll__9596,k);
});
var G__9616__3 = (function (this_sym9593,k,not_found){
var this__9594 = this;
var this_sym9593__9597 = this;
var coll__9598 = this_sym9593__9597;
return coll__9598.cljs$core$ILookup$_lookup$arity$3(coll__9598,k,not_found);
});
G__9616 = function(this_sym9593,k,not_found){
switch(arguments.length){
case 2:
return G__9616__2.call(this,this_sym9593,k);
case 3:
return G__9616__3.call(this,this_sym9593,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9616;
})()
;
cljs.core.HashMap.prototype.apply = (function (this_sym9572,args9573){
var this__9599 = this;
return this_sym9572.call.apply(this_sym9572,[this_sym9572].concat(args9573.slice()));
});
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9600 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.toString = (function (){
var this__9601 = this;
var this__9602 = this;
return cljs.core.pr_str.call(null,this__9602);
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9603 = this;
if((this__9603.count > 0))
{var hashes__9604 = cljs.core.js_keys.call(null,this__9603.hashobj).sort();
return cljs.core.mapcat.call(null,(function (p1__9571_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__9603.hashobj[p1__9571_SHARP_])));
}),hashes__9604);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9605 = this;
return this__9605.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9606 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9607 = this;
return (new cljs.core.HashMap(meta,this__9607.count,this__9607.hashobj,this__9607.__hash));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9608 = this;
return this__9608.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9609 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__9609.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9610 = this;
var h__9611 = cljs.core.hash.call(null,k);
var bucket__9612 = (this__9610.hashobj[h__9611]);
var i__9613 = (cljs.core.truth_(bucket__9612)?cljs.core.scan_array.call(null,2,k,bucket__9612):null);
if(cljs.core.not.call(null,i__9613))
{return coll;
} else
{var new_hashobj__9614 = goog.object.clone(this__9610.hashobj);
if((3 > bucket__9612.length))
{cljs.core.js_delete.call(null,new_hashobj__9614,h__9611);
} else
{var new_bucket__9615 = bucket__9612.slice();
new_bucket__9615.splice(i__9613,2);
(new_hashobj__9614[h__9611] = new_bucket__9615);
}
return (new cljs.core.HashMap(this__9610.meta,(this__9610.count - 1),new_hashobj__9614,null));
}
});
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,{},0));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__9617 = ks.length;
var i__9618 = 0;
var out__9619 = cljs.core.HashMap.EMPTY;
while(true){
if((i__9618 < len__9617))
{{
var G__9620 = (i__9618 + 1);
var G__9621 = cljs.core.assoc.call(null,out__9619,(ks[i__9618]),(vs[i__9618]));
i__9618 = G__9620;
out__9619 = G__9621;
continue;
}
} else
{return out__9619;
}
break;
}
});
cljs.core.array_map_index_of = (function array_map_index_of(m,k){
var arr__9625 = m.arr;
var len__9626 = arr__9625.length;
var i__9627 = 0;
while(true){
if((len__9626 <= i__9627))
{return -1;
} else
{if(cljs.core._EQ_.call(null,(arr__9625[i__9627]),k))
{return i__9627;
} else
{if("\uFDD0'else")
{{
var G__9628 = (i__9627 + 2);
i__9627 = G__9628;
continue;
}
} else
{return null;
}
}
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentArrayMap = (function (meta,cnt,arr,__hash){
this.meta = meta;
this.cnt = cnt;
this.arr = arr;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentArrayMap");
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9631 = this;
return (new cljs.core.TransientArrayMap({},this__9631.arr.length,this__9631.arr.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9632 = this;
var h__3049__auto____9633 = this__9632.__hash;
if(!((h__3049__auto____9633 == null)))
{return h__3049__auto____9633;
} else
{var h__3049__auto____9634 = cljs.core.hash_imap.call(null,coll);
this__9632.__hash = h__3049__auto____9634;
return h__3049__auto____9634;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9635 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9636 = this;
var idx__9637 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9637 === -1))
{return not_found;
} else
{return (this__9636.arr[(idx__9637 + 1)]);
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9638 = this;
var idx__9639 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9639 === -1))
{if((this__9638.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD))
{return (new cljs.core.PersistentArrayMap(this__9638.meta,(this__9638.cnt + 1),(function (){var G__9640__9641 = this__9638.arr.slice();
G__9640__9641.push(k);
G__9640__9641.push(v);
return G__9640__9641;
})(),null));
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.PersistentHashMap.EMPTY,coll)),k,v));
}
} else
{if((v === (this__9638.arr[(idx__9639 + 1)])))
{return coll;
} else
{if("\uFDD0'else")
{return (new cljs.core.PersistentArrayMap(this__9638.meta,this__9638.cnt,(function (){var G__9642__9643 = this__9638.arr.slice();
(G__9642__9643[(idx__9639 + 1)] = v);
return G__9642__9643;
})(),null));
} else
{return null;
}
}
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9644 = this;
return !((cljs.core.array_map_index_of.call(null,coll,k) === -1));
});
cljs.core.PersistentArrayMap.prototype.call = (function() {
var G__9676 = null;
var G__9676__2 = (function (this_sym9645,k){
var this__9647 = this;
var this_sym9645__9648 = this;
var coll__9649 = this_sym9645__9648;
return coll__9649.cljs$core$ILookup$_lookup$arity$2(coll__9649,k);
});
var G__9676__3 = (function (this_sym9646,k,not_found){
var this__9647 = this;
var this_sym9646__9650 = this;
var coll__9651 = this_sym9646__9650;
return coll__9651.cljs$core$ILookup$_lookup$arity$3(coll__9651,k,not_found);
});
G__9676 = function(this_sym9646,k,not_found){
switch(arguments.length){
case 2:
return G__9676__2.call(this,this_sym9646,k);
case 3:
return G__9676__3.call(this,this_sym9646,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9676;
})()
;
cljs.core.PersistentArrayMap.prototype.apply = (function (this_sym9629,args9630){
var this__9652 = this;
return this_sym9629.call.apply(this_sym9629,[this_sym9629].concat(args9630.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9653 = this;
var len__9654 = this__9653.arr.length;
var i__9655 = 0;
var init__9656 = init;
while(true){
if((i__9655 < len__9654))
{var init__9657 = f.call(null,init__9656,(this__9653.arr[i__9655]),(this__9653.arr[(i__9655 + 1)]));
if(cljs.core.reduced_QMARK_.call(null,init__9657))
{return cljs.core.deref.call(null,init__9657);
} else
{{
var G__9677 = (i__9655 + 2);
var G__9678 = init__9657;
i__9655 = G__9677;
init__9656 = G__9678;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9658 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentArrayMap.prototype.toString = (function (){
var this__9659 = this;
var this__9660 = this;
return cljs.core.pr_str.call(null,this__9660);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9661 = this;
if((this__9661.cnt > 0))
{var len__9662 = this__9661.arr.length;
var array_map_seq__9663 = (function array_map_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < len__9662))
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([(this__9661.arr[i]),(this__9661.arr[(i + 1)])], true),array_map_seq.call(null,(i + 2)));
} else
{return null;
}
}),null));
});
return array_map_seq__9663.call(null,0);
} else
{return null;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9664 = this;
return this__9664.cnt;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9665 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9666 = this;
return (new cljs.core.PersistentArrayMap(meta,this__9666.cnt,this__9666.arr,this__9666.__hash));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9667 = this;
return this__9667.meta;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9668 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentArrayMap.EMPTY,this__9668.meta);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9669 = this;
var idx__9670 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__9670 >= 0))
{var len__9671 = this__9669.arr.length;
var new_len__9672 = (len__9671 - 2);
if((new_len__9672 === 0))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var new_arr__9673 = cljs.core.make_array.call(null,new_len__9672);
var s__9674 = 0;
var d__9675 = 0;
while(true){
if((s__9674 >= len__9671))
{return (new cljs.core.PersistentArrayMap(this__9669.meta,(this__9669.cnt - 1),new_arr__9673,null));
} else
{if(cljs.core._EQ_.call(null,k,(this__9669.arr[s__9674])))
{{
var G__9679 = (s__9674 + 2);
var G__9680 = d__9675;
s__9674 = G__9679;
d__9675 = G__9680;
continue;
}
} else
{if("\uFDD0'else")
{(new_arr__9673[d__9675] = (this__9669.arr[s__9674]));
(new_arr__9673[(d__9675 + 1)] = (this__9669.arr[(s__9674 + 1)]));
{
var G__9681 = (s__9674 + 2);
var G__9682 = (d__9675 + 2);
s__9674 = G__9681;
d__9675 = G__9682;
continue;
}
} else
{return null;
}
}
}
break;
}
}
} else
{return coll;
}
});
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = (new cljs.core.PersistentArrayMap(null,0,[],null));
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = (function (ks,vs){
var len__9683 = cljs.core.count.call(null,ks);
var i__9684 = 0;
var out__9685 = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i__9684 < len__9683))
{{
var G__9686 = (i__9684 + 1);
var G__9687 = cljs.core.assoc_BANG_.call(null,out__9685,(ks[i__9684]),(vs[i__9684]));
i__9684 = G__9686;
out__9685 = G__9687;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9685);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientArrayMap = (function (editable_QMARK_,len,arr){
this.editable_QMARK_ = editable_QMARK_;
this.len = len;
this.arr = arr;
this.cljs$lang$protocol_mask$partition1$ = 14;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/TransientArrayMap");
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__9688 = this;
if(cljs.core.truth_(this__9688.editable_QMARK_))
{var idx__9689 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__9689 >= 0))
{(this__9688.arr[idx__9689] = (this__9688.arr[(this__9688.len - 2)]));
(this__9688.arr[(idx__9689 + 1)] = (this__9688.arr[(this__9688.len - 1)]));
var G__9690__9691 = this__9688.arr;
G__9690__9691.pop();
G__9690__9691.pop();
G__9690__9691;
this__9688.len = (this__9688.len - 2);
} else
{}
return tcoll;
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9692 = this;
if(cljs.core.truth_(this__9692.editable_QMARK_))
{var idx__9693 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__9693 === -1))
{if(((this__9692.len + 2) <= (2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD)))
{this__9692.len = (this__9692.len + 2);
this__9692.arr.push(key);
this__9692.arr.push(val);
return tcoll;
} else
{return cljs.core.assoc_BANG_.call(null,cljs.core.array__GT_transient_hash_map.call(null,this__9692.len,this__9692.arr),key,val);
}
} else
{if((val === (this__9692.arr[(idx__9693 + 1)])))
{return tcoll;
} else
{(this__9692.arr[(idx__9693 + 1)] = val);
return tcoll;
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9694 = this;
if(cljs.core.truth_(this__9694.editable_QMARK_))
{if((function (){var G__9695__9696 = o;
if(G__9695__9696)
{if((function (){var or__3824__auto____9697 = (G__9695__9696.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____9697)
{return or__3824__auto____9697;
} else
{return G__9695__9696.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__9695__9696.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9695__9696);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9695__9696);
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__9698 = cljs.core.seq.call(null,o);
var tcoll__9699 = tcoll;
while(true){
var temp__3971__auto____9700 = cljs.core.first.call(null,es__9698);
if(cljs.core.truth_(temp__3971__auto____9700))
{var e__9701 = temp__3971__auto____9700;
{
var G__9707 = cljs.core.next.call(null,es__9698);
var G__9708 = tcoll__9699.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__9699,cljs.core.key.call(null,e__9701),cljs.core.val.call(null,e__9701));
es__9698 = G__9707;
tcoll__9699 = G__9708;
continue;
}
} else
{return tcoll__9699;
}
break;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9702 = this;
if(cljs.core.truth_(this__9702.editable_QMARK_))
{this__9702.editable_QMARK_ = false;
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,this__9702.len,2),this__9702.arr,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__9703 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,k,null);
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__9704 = this;
if(cljs.core.truth_(this__9704.editable_QMARK_))
{var idx__9705 = cljs.core.array_map_index_of.call(null,tcoll,k);
if((idx__9705 === -1))
{return not_found;
} else
{return (this__9704.arr[(idx__9705 + 1)]);
}
} else
{throw (new Error("lookup after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__9706 = this;
if(cljs.core.truth_(this__9706.editable_QMARK_))
{return cljs.core.quot.call(null,this__9706.len,2);
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = (function array__GT_transient_hash_map(len,arr){
var out__9711 = cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY);
var i__9712 = 0;
while(true){
if((i__9712 < len))
{{
var G__9713 = cljs.core.assoc_BANG_.call(null,out__9711,(arr[i__9712]),(arr[(i__9712 + 1)]));
var G__9714 = (i__9712 + 2);
out__9711 = G__9713;
i__9712 = G__9714;
continue;
}
} else
{return out__9711;
}
break;
}
});

/**
* @constructor
*/
cljs.core.Box = (function (val){
this.val = val;
})
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = (function (this__3167__auto__){
return cljs.core.list.call(null,"cljs.core/Box");
});
cljs.core.Box;
cljs.core.key_test = (function key_test(key,other){
if(goog.isString(key))
{return (key === other);
} else
{return cljs.core._EQ_.call(null,key,other);
}
});
cljs.core.mask = (function mask(hash,shift){
return ((hash >>> shift) & 31);
});
cljs.core.clone_and_set = (function() {
var clone_and_set = null;
var clone_and_set__3 = (function (arr,i,a){
var G__9719__9720 = arr.slice();
(G__9719__9720[i] = a);
return G__9719__9720;
});
var clone_and_set__5 = (function (arr,i,a,j,b){
var G__9721__9722 = arr.slice();
(G__9721__9722[i] = a);
(G__9721__9722[j] = b);
return G__9721__9722;
});
clone_and_set = function(arr,i,a,j,b){
switch(arguments.length){
case 3:
return clone_and_set__3.call(this,arr,i,a);
case 5:
return clone_and_set__5.call(this,arr,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
return clone_and_set;
})()
;
cljs.core.remove_pair = (function remove_pair(arr,i){
var new_arr__9724 = cljs.core.make_array.call(null,(arr.length - 2));
cljs.core.array_copy.call(null,arr,0,new_arr__9724,0,(2 * i));
cljs.core.array_copy.call(null,arr,(2 * (i + 1)),new_arr__9724,(2 * i),(new_arr__9724.length - (2 * i)));
return new_arr__9724;
});
cljs.core.bitmap_indexed_node_index = (function bitmap_indexed_node_index(bitmap,bit){
return cljs.core.bit_count.call(null,(bitmap & (bit - 1)));
});
cljs.core.bitpos = (function bitpos(hash,shift){
return (1 << ((hash >>> shift) & 0x01f));
});
cljs.core.edit_and_set = (function() {
var edit_and_set = null;
var edit_and_set__4 = (function (inode,edit,i,a){
var editable__9727 = inode.ensure_editable(edit);
(editable__9727.arr[i] = a);
return editable__9727;
});
var edit_and_set__6 = (function (inode,edit,i,a,j,b){
var editable__9728 = inode.ensure_editable(edit);
(editable__9728.arr[i] = a);
(editable__9728.arr[j] = b);
return editable__9728;
});
edit_and_set = function(inode,edit,i,a,j,b){
switch(arguments.length){
case 4:
return edit_and_set__4.call(this,inode,edit,i,a);
case 6:
return edit_and_set__6.call(this,inode,edit,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
return edit_and_set;
})()
;
cljs.core.inode_kv_reduce = (function inode_kv_reduce(arr,f,init){
var len__9735 = arr.length;
var i__9736 = 0;
var init__9737 = init;
while(true){
if((i__9736 < len__9735))
{var init__9740 = (function (){var k__9738 = (arr[i__9736]);
if(!((k__9738 == null)))
{return f.call(null,init__9737,k__9738,(arr[(i__9736 + 1)]));
} else
{var node__9739 = (arr[(i__9736 + 1)]);
if(!((node__9739 == null)))
{return node__9739.kv_reduce(f,init__9737);
} else
{return init__9737;
}
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__9740))
{return cljs.core.deref.call(null,init__9740);
} else
{{
var G__9741 = (i__9736 + 2);
var G__9742 = init__9740;
i__9736 = G__9741;
init__9737 = G__9742;
continue;
}
}
} else
{return init__9737;
}
break;
}
});

/**
* @constructor
*/
cljs.core.BitmapIndexedNode = (function (edit,bitmap,arr){
this.edit = edit;
this.bitmap = bitmap;
this.arr = arr;
})
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/BitmapIndexedNode");
});
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = (function (e,bit,i){
var this__9743 = this;
var inode__9744 = this;
if((this__9743.bitmap === bit))
{return null;
} else
{var editable__9745 = inode__9744.ensure_editable(e);
var earr__9746 = editable__9745.arr;
var len__9747 = earr__9746.length;
editable__9745.bitmap = (bit ^ editable__9745.bitmap);
cljs.core.array_copy.call(null,earr__9746,(2 * (i + 1)),earr__9746,(2 * i),(len__9747 - (2 * (i + 1))));
(earr__9746[(len__9747 - 2)] = null);
(earr__9746[(len__9747 - 1)] = null);
return editable__9745;
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9748 = this;
var inode__9749 = this;
var bit__9750 = (1 << ((hash >>> shift) & 0x01f));
var idx__9751 = cljs.core.bitmap_indexed_node_index.call(null,this__9748.bitmap,bit__9750);
if(((this__9748.bitmap & bit__9750) === 0))
{var n__9752 = cljs.core.bit_count.call(null,this__9748.bitmap);
if(((2 * n__9752) < this__9748.arr.length))
{var editable__9753 = inode__9749.ensure_editable(edit);
var earr__9754 = editable__9753.arr;
added_leaf_QMARK_.val = true;
cljs.core.array_copy_downward.call(null,earr__9754,(2 * idx__9751),earr__9754,(2 * (idx__9751 + 1)),(2 * (n__9752 - idx__9751)));
(earr__9754[(2 * idx__9751)] = key);
(earr__9754[((2 * idx__9751) + 1)] = val);
editable__9753.bitmap = (editable__9753.bitmap | bit__9750);
return editable__9753;
} else
{if((n__9752 >= 16))
{var nodes__9755 = cljs.core.make_array.call(null,32);
var jdx__9756 = ((hash >>> shift) & 0x01f);
(nodes__9755[jdx__9756] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
var i__9757 = 0;
var j__9758 = 0;
while(true){
if((i__9757 < 32))
{if((((this__9748.bitmap >>> i__9757) & 1) === 0))
{{
var G__9811 = (i__9757 + 1);
var G__9812 = j__9758;
i__9757 = G__9811;
j__9758 = G__9812;
continue;
}
} else
{(nodes__9755[i__9757] = ((!(((this__9748.arr[j__9758]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),cljs.core.hash.call(null,(this__9748.arr[j__9758])),(this__9748.arr[j__9758]),(this__9748.arr[(j__9758 + 1)]),added_leaf_QMARK_):(this__9748.arr[(j__9758 + 1)])));
{
var G__9813 = (i__9757 + 1);
var G__9814 = (j__9758 + 2);
i__9757 = G__9813;
j__9758 = G__9814;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(edit,(n__9752 + 1),nodes__9755));
} else
{if("\uFDD0'else")
{var new_arr__9759 = cljs.core.make_array.call(null,(2 * (n__9752 + 4)));
cljs.core.array_copy.call(null,this__9748.arr,0,new_arr__9759,0,(2 * idx__9751));
(new_arr__9759[(2 * idx__9751)] = key);
(new_arr__9759[((2 * idx__9751) + 1)] = val);
cljs.core.array_copy.call(null,this__9748.arr,(2 * idx__9751),new_arr__9759,(2 * (idx__9751 + 1)),(2 * (n__9752 - idx__9751)));
added_leaf_QMARK_.val = true;
var editable__9760 = inode__9749.ensure_editable(edit);
editable__9760.arr = new_arr__9759;
editable__9760.bitmap = (editable__9760.bitmap | bit__9750);
return editable__9760;
} else
{return null;
}
}
}
} else
{var key_or_nil__9761 = (this__9748.arr[(2 * idx__9751)]);
var val_or_node__9762 = (this__9748.arr[((2 * idx__9751) + 1)]);
if((key_or_nil__9761 == null))
{var n__9763 = val_or_node__9762.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9763 === val_or_node__9762))
{return inode__9749;
} else
{return cljs.core.edit_and_set.call(null,inode__9749,edit,((2 * idx__9751) + 1),n__9763);
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9761))
{if((val === val_or_node__9762))
{return inode__9749;
} else
{return cljs.core.edit_and_set.call(null,inode__9749,edit,((2 * idx__9751) + 1),val);
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return cljs.core.edit_and_set.call(null,inode__9749,edit,(2 * idx__9751),null,((2 * idx__9751) + 1),cljs.core.create_node.call(null,edit,(shift + 5),key_or_nil__9761,val_or_node__9762,hash,key,val));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_seq = (function (){
var this__9764 = this;
var inode__9765 = this;
return cljs.core.create_inode_seq.call(null,this__9764.arr);
});
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9766 = this;
var inode__9767 = this;
var bit__9768 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9766.bitmap & bit__9768) === 0))
{return inode__9767;
} else
{var idx__9769 = cljs.core.bitmap_indexed_node_index.call(null,this__9766.bitmap,bit__9768);
var key_or_nil__9770 = (this__9766.arr[(2 * idx__9769)]);
var val_or_node__9771 = (this__9766.arr[((2 * idx__9769) + 1)]);
if((key_or_nil__9770 == null))
{var n__9772 = val_or_node__9771.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__9772 === val_or_node__9771))
{return inode__9767;
} else
{if(!((n__9772 == null)))
{return cljs.core.edit_and_set.call(null,inode__9767,edit,((2 * idx__9769) + 1),n__9772);
} else
{if((this__9766.bitmap === bit__9768))
{return null;
} else
{if("\uFDD0'else")
{return inode__9767.edit_and_remove_pair(edit,bit__9768,idx__9769);
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9770))
{(removed_leaf_QMARK_[0] = true);
return inode__9767.edit_and_remove_pair(edit,bit__9768,idx__9769);
} else
{if("\uFDD0'else")
{return inode__9767;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.ensure_editable = (function (e){
var this__9773 = this;
var inode__9774 = this;
if((e === this__9773.edit))
{return inode__9774;
} else
{var n__9775 = cljs.core.bit_count.call(null,this__9773.bitmap);
var new_arr__9776 = cljs.core.make_array.call(null,(((n__9775 < 0))?4:(2 * (n__9775 + 1))));
cljs.core.array_copy.call(null,this__9773.arr,0,new_arr__9776,0,(2 * n__9775));
return (new cljs.core.BitmapIndexedNode(e,this__9773.bitmap,new_arr__9776));
}
});
cljs.core.BitmapIndexedNode.prototype.kv_reduce = (function (f,init){
var this__9777 = this;
var inode__9778 = this;
return cljs.core.inode_kv_reduce.call(null,this__9777.arr,f,init);
});
cljs.core.BitmapIndexedNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9779 = this;
var inode__9780 = this;
var bit__9781 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9779.bitmap & bit__9781) === 0))
{return not_found;
} else
{var idx__9782 = cljs.core.bitmap_indexed_node_index.call(null,this__9779.bitmap,bit__9781);
var key_or_nil__9783 = (this__9779.arr[(2 * idx__9782)]);
var val_or_node__9784 = (this__9779.arr[((2 * idx__9782) + 1)]);
if((key_or_nil__9783 == null))
{return val_or_node__9784.inode_find((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9783))
{return cljs.core.PersistentVector.fromArray([key_or_nil__9783,val_or_node__9784], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_without = (function (shift,hash,key){
var this__9785 = this;
var inode__9786 = this;
var bit__9787 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9785.bitmap & bit__9787) === 0))
{return inode__9786;
} else
{var idx__9788 = cljs.core.bitmap_indexed_node_index.call(null,this__9785.bitmap,bit__9787);
var key_or_nil__9789 = (this__9785.arr[(2 * idx__9788)]);
var val_or_node__9790 = (this__9785.arr[((2 * idx__9788) + 1)]);
if((key_or_nil__9789 == null))
{var n__9791 = val_or_node__9790.inode_without((shift + 5),hash,key);
if((n__9791 === val_or_node__9790))
{return inode__9786;
} else
{if(!((n__9791 == null)))
{return (new cljs.core.BitmapIndexedNode(null,this__9785.bitmap,cljs.core.clone_and_set.call(null,this__9785.arr,((2 * idx__9788) + 1),n__9791)));
} else
{if((this__9785.bitmap === bit__9787))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.BitmapIndexedNode(null,(this__9785.bitmap ^ bit__9787),cljs.core.remove_pair.call(null,this__9785.arr,idx__9788)));
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9789))
{return (new cljs.core.BitmapIndexedNode(null,(this__9785.bitmap ^ bit__9787),cljs.core.remove_pair.call(null,this__9785.arr,idx__9788)));
} else
{if("\uFDD0'else")
{return inode__9786;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9792 = this;
var inode__9793 = this;
var bit__9794 = (1 << ((hash >>> shift) & 0x01f));
var idx__9795 = cljs.core.bitmap_indexed_node_index.call(null,this__9792.bitmap,bit__9794);
if(((this__9792.bitmap & bit__9794) === 0))
{var n__9796 = cljs.core.bit_count.call(null,this__9792.bitmap);
if((n__9796 >= 16))
{var nodes__9797 = cljs.core.make_array.call(null,32);
var jdx__9798 = ((hash >>> shift) & 0x01f);
(nodes__9797[jdx__9798] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_));
var i__9799 = 0;
var j__9800 = 0;
while(true){
if((i__9799 < 32))
{if((((this__9792.bitmap >>> i__9799) & 1) === 0))
{{
var G__9815 = (i__9799 + 1);
var G__9816 = j__9800;
i__9799 = G__9815;
j__9800 = G__9816;
continue;
}
} else
{(nodes__9797[i__9799] = ((!(((this__9792.arr[j__9800]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),cljs.core.hash.call(null,(this__9792.arr[j__9800])),(this__9792.arr[j__9800]),(this__9792.arr[(j__9800 + 1)]),added_leaf_QMARK_):(this__9792.arr[(j__9800 + 1)])));
{
var G__9817 = (i__9799 + 1);
var G__9818 = (j__9800 + 2);
i__9799 = G__9817;
j__9800 = G__9818;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(null,(n__9796 + 1),nodes__9797));
} else
{var new_arr__9801 = cljs.core.make_array.call(null,(2 * (n__9796 + 1)));
cljs.core.array_copy.call(null,this__9792.arr,0,new_arr__9801,0,(2 * idx__9795));
(new_arr__9801[(2 * idx__9795)] = key);
(new_arr__9801[((2 * idx__9795) + 1)] = val);
cljs.core.array_copy.call(null,this__9792.arr,(2 * idx__9795),new_arr__9801,(2 * (idx__9795 + 1)),(2 * (n__9796 - idx__9795)));
added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,(this__9792.bitmap | bit__9794),new_arr__9801));
}
} else
{var key_or_nil__9802 = (this__9792.arr[(2 * idx__9795)]);
var val_or_node__9803 = (this__9792.arr[((2 * idx__9795) + 1)]);
if((key_or_nil__9802 == null))
{var n__9804 = val_or_node__9803.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9804 === val_or_node__9803))
{return inode__9793;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__9792.bitmap,cljs.core.clone_and_set.call(null,this__9792.arr,((2 * idx__9795) + 1),n__9804)));
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9802))
{if((val === val_or_node__9803))
{return inode__9793;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__9792.bitmap,cljs.core.clone_and_set.call(null,this__9792.arr,((2 * idx__9795) + 1),val)));
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,this__9792.bitmap,cljs.core.clone_and_set.call(null,this__9792.arr,(2 * idx__9795),null,((2 * idx__9795) + 1),cljs.core.create_node.call(null,(shift + 5),key_or_nil__9802,val_or_node__9803,hash,key,val))));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9805 = this;
var inode__9806 = this;
var bit__9807 = (1 << ((hash >>> shift) & 0x01f));
if(((this__9805.bitmap & bit__9807) === 0))
{return not_found;
} else
{var idx__9808 = cljs.core.bitmap_indexed_node_index.call(null,this__9805.bitmap,bit__9807);
var key_or_nil__9809 = (this__9805.arr[(2 * idx__9808)]);
var val_or_node__9810 = (this__9805.arr[((2 * idx__9808) + 1)]);
if((key_or_nil__9809 == null))
{return val_or_node__9810.inode_lookup((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__9809))
{return val_or_node__9810;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = (new cljs.core.BitmapIndexedNode(null,0,cljs.core.make_array.call(null,0)));
cljs.core.pack_array_node = (function pack_array_node(array_node,edit,idx){
var arr__9826 = array_node.arr;
var len__9827 = (2 * (array_node.cnt - 1));
var new_arr__9828 = cljs.core.make_array.call(null,len__9827);
var i__9829 = 0;
var j__9830 = 1;
var bitmap__9831 = 0;
while(true){
if((i__9829 < len__9827))
{if((function (){var and__3822__auto____9832 = !((i__9829 === idx));
if(and__3822__auto____9832)
{return !(((arr__9826[i__9829]) == null));
} else
{return and__3822__auto____9832;
}
})())
{(new_arr__9828[j__9830] = (arr__9826[i__9829]));
{
var G__9833 = (i__9829 + 1);
var G__9834 = (j__9830 + 2);
var G__9835 = (bitmap__9831 | (1 << i__9829));
i__9829 = G__9833;
j__9830 = G__9834;
bitmap__9831 = G__9835;
continue;
}
} else
{{
var G__9836 = (i__9829 + 1);
var G__9837 = j__9830;
var G__9838 = bitmap__9831;
i__9829 = G__9836;
j__9830 = G__9837;
bitmap__9831 = G__9838;
continue;
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,bitmap__9831,new_arr__9828));
}
break;
}
});

/**
* @constructor
*/
cljs.core.ArrayNode = (function (edit,cnt,arr){
this.edit = edit;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNode");
});
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9839 = this;
var inode__9840 = this;
var idx__9841 = ((hash >>> shift) & 0x01f);
var node__9842 = (this__9839.arr[idx__9841]);
if((node__9842 == null))
{var editable__9843 = cljs.core.edit_and_set.call(null,inode__9840,edit,idx__9841,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
editable__9843.cnt = (editable__9843.cnt + 1);
return editable__9843;
} else
{var n__9844 = node__9842.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9844 === node__9842))
{return inode__9840;
} else
{return cljs.core.edit_and_set.call(null,inode__9840,edit,idx__9841,n__9844);
}
}
});
cljs.core.ArrayNode.prototype.inode_seq = (function (){
var this__9845 = this;
var inode__9846 = this;
return cljs.core.create_array_node_seq.call(null,this__9845.arr);
});
cljs.core.ArrayNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9847 = this;
var inode__9848 = this;
var idx__9849 = ((hash >>> shift) & 0x01f);
var node__9850 = (this__9847.arr[idx__9849]);
if((node__9850 == null))
{return inode__9848;
} else
{var n__9851 = node__9850.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__9851 === node__9850))
{return inode__9848;
} else
{if((n__9851 == null))
{if((this__9847.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__9848,edit,idx__9849);
} else
{var editable__9852 = cljs.core.edit_and_set.call(null,inode__9848,edit,idx__9849,n__9851);
editable__9852.cnt = (editable__9852.cnt - 1);
return editable__9852;
}
} else
{if("\uFDD0'else")
{return cljs.core.edit_and_set.call(null,inode__9848,edit,idx__9849,n__9851);
} else
{return null;
}
}
}
}
});
cljs.core.ArrayNode.prototype.ensure_editable = (function (e){
var this__9853 = this;
var inode__9854 = this;
if((e === this__9853.edit))
{return inode__9854;
} else
{return (new cljs.core.ArrayNode(e,this__9853.cnt,this__9853.arr.slice()));
}
});
cljs.core.ArrayNode.prototype.kv_reduce = (function (f,init){
var this__9855 = this;
var inode__9856 = this;
var len__9857 = this__9855.arr.length;
var i__9858 = 0;
var init__9859 = init;
while(true){
if((i__9858 < len__9857))
{var node__9860 = (this__9855.arr[i__9858]);
if(!((node__9860 == null)))
{var init__9861 = node__9860.kv_reduce(f,init__9859);
if(cljs.core.reduced_QMARK_.call(null,init__9861))
{return cljs.core.deref.call(null,init__9861);
} else
{{
var G__9880 = (i__9858 + 1);
var G__9881 = init__9861;
i__9858 = G__9880;
init__9859 = G__9881;
continue;
}
}
} else
{return null;
}
} else
{return init__9859;
}
break;
}
});
cljs.core.ArrayNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9862 = this;
var inode__9863 = this;
var idx__9864 = ((hash >>> shift) & 0x01f);
var node__9865 = (this__9862.arr[idx__9864]);
if(!((node__9865 == null)))
{return node__9865.inode_find((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode.prototype.inode_without = (function (shift,hash,key){
var this__9866 = this;
var inode__9867 = this;
var idx__9868 = ((hash >>> shift) & 0x01f);
var node__9869 = (this__9866.arr[idx__9868]);
if(!((node__9869 == null)))
{var n__9870 = node__9869.inode_without((shift + 5),hash,key);
if((n__9870 === node__9869))
{return inode__9867;
} else
{if((n__9870 == null))
{if((this__9866.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__9867,null,idx__9868);
} else
{return (new cljs.core.ArrayNode(null,(this__9866.cnt - 1),cljs.core.clone_and_set.call(null,this__9866.arr,idx__9868,n__9870)));
}
} else
{if("\uFDD0'else")
{return (new cljs.core.ArrayNode(null,this__9866.cnt,cljs.core.clone_and_set.call(null,this__9866.arr,idx__9868,n__9870)));
} else
{return null;
}
}
}
} else
{return inode__9867;
}
});
cljs.core.ArrayNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9871 = this;
var inode__9872 = this;
var idx__9873 = ((hash >>> shift) & 0x01f);
var node__9874 = (this__9871.arr[idx__9873]);
if((node__9874 == null))
{return (new cljs.core.ArrayNode(null,(this__9871.cnt + 1),cljs.core.clone_and_set.call(null,this__9871.arr,idx__9873,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_))));
} else
{var n__9875 = node__9874.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__9875 === node__9874))
{return inode__9872;
} else
{return (new cljs.core.ArrayNode(null,this__9871.cnt,cljs.core.clone_and_set.call(null,this__9871.arr,idx__9873,n__9875)));
}
}
});
cljs.core.ArrayNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9876 = this;
var inode__9877 = this;
var idx__9878 = ((hash >>> shift) & 0x01f);
var node__9879 = (this__9876.arr[idx__9878]);
if(!((node__9879 == null)))
{return node__9879.inode_lookup((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = (function hash_collision_node_find_index(arr,cnt,key){
var lim__9884 = (2 * cnt);
var i__9885 = 0;
while(true){
if((i__9885 < lim__9884))
{if(cljs.core.key_test.call(null,key,(arr[i__9885])))
{return i__9885;
} else
{{
var G__9886 = (i__9885 + 2);
i__9885 = G__9886;
continue;
}
}
} else
{return -1;
}
break;
}
});

/**
* @constructor
*/
cljs.core.HashCollisionNode = (function (edit,collision_hash,cnt,arr){
this.edit = edit;
this.collision_hash = collision_hash;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/HashCollisionNode");
});
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__9887 = this;
var inode__9888 = this;
if((hash === this__9887.collision_hash))
{var idx__9889 = cljs.core.hash_collision_node_find_index.call(null,this__9887.arr,this__9887.cnt,key);
if((idx__9889 === -1))
{if((this__9887.arr.length > (2 * this__9887.cnt)))
{var editable__9890 = cljs.core.edit_and_set.call(null,inode__9888,edit,(2 * this__9887.cnt),key,((2 * this__9887.cnt) + 1),val);
added_leaf_QMARK_.val = true;
editable__9890.cnt = (editable__9890.cnt + 1);
return editable__9890;
} else
{var len__9891 = this__9887.arr.length;
var new_arr__9892 = cljs.core.make_array.call(null,(len__9891 + 2));
cljs.core.array_copy.call(null,this__9887.arr,0,new_arr__9892,0,len__9891);
(new_arr__9892[len__9891] = key);
(new_arr__9892[(len__9891 + 1)] = val);
added_leaf_QMARK_.val = true;
return inode__9888.ensure_editable_array(edit,(this__9887.cnt + 1),new_arr__9892);
}
} else
{if(((this__9887.arr[(idx__9889 + 1)]) === val))
{return inode__9888;
} else
{return cljs.core.edit_and_set.call(null,inode__9888,edit,(idx__9889 + 1),val);
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,(1 << ((this__9887.collision_hash >>> shift) & 0x01f)),[null,inode__9888,null,null])).inode_assoc_BANG_(edit,shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_seq = (function (){
var this__9893 = this;
var inode__9894 = this;
return cljs.core.create_inode_seq.call(null,this__9893.arr);
});
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__9895 = this;
var inode__9896 = this;
var idx__9897 = cljs.core.hash_collision_node_find_index.call(null,this__9895.arr,this__9895.cnt,key);
if((idx__9897 === -1))
{return inode__9896;
} else
{(removed_leaf_QMARK_[0] = true);
if((this__9895.cnt === 1))
{return null;
} else
{var editable__9898 = inode__9896.ensure_editable(edit);
var earr__9899 = editable__9898.arr;
(earr__9899[idx__9897] = (earr__9899[((2 * this__9895.cnt) - 2)]));
(earr__9899[(idx__9897 + 1)] = (earr__9899[((2 * this__9895.cnt) - 1)]));
(earr__9899[((2 * this__9895.cnt) - 1)] = null);
(earr__9899[((2 * this__9895.cnt) - 2)] = null);
editable__9898.cnt = (editable__9898.cnt - 1);
return editable__9898;
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable = (function (e){
var this__9900 = this;
var inode__9901 = this;
if((e === this__9900.edit))
{return inode__9901;
} else
{var new_arr__9902 = cljs.core.make_array.call(null,(2 * (this__9900.cnt + 1)));
cljs.core.array_copy.call(null,this__9900.arr,0,new_arr__9902,0,(2 * this__9900.cnt));
return (new cljs.core.HashCollisionNode(e,this__9900.collision_hash,this__9900.cnt,new_arr__9902));
}
});
cljs.core.HashCollisionNode.prototype.kv_reduce = (function (f,init){
var this__9903 = this;
var inode__9904 = this;
return cljs.core.inode_kv_reduce.call(null,this__9903.arr,f,init);
});
cljs.core.HashCollisionNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__9905 = this;
var inode__9906 = this;
var idx__9907 = cljs.core.hash_collision_node_find_index.call(null,this__9905.arr,this__9905.cnt,key);
if((idx__9907 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9905.arr[idx__9907])))
{return cljs.core.PersistentVector.fromArray([(this__9905.arr[idx__9907]),(this__9905.arr[(idx__9907 + 1)])], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_without = (function (shift,hash,key){
var this__9908 = this;
var inode__9909 = this;
var idx__9910 = cljs.core.hash_collision_node_find_index.call(null,this__9908.arr,this__9908.cnt,key);
if((idx__9910 === -1))
{return inode__9909;
} else
{if((this__9908.cnt === 1))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.HashCollisionNode(null,this__9908.collision_hash,(this__9908.cnt - 1),cljs.core.remove_pair.call(null,this__9908.arr,cljs.core.quot.call(null,idx__9910,2))));
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__9911 = this;
var inode__9912 = this;
if((hash === this__9911.collision_hash))
{var idx__9913 = cljs.core.hash_collision_node_find_index.call(null,this__9911.arr,this__9911.cnt,key);
if((idx__9913 === -1))
{var len__9914 = this__9911.arr.length;
var new_arr__9915 = cljs.core.make_array.call(null,(len__9914 + 2));
cljs.core.array_copy.call(null,this__9911.arr,0,new_arr__9915,0,len__9914);
(new_arr__9915[len__9914] = key);
(new_arr__9915[(len__9914 + 1)] = val);
added_leaf_QMARK_.val = true;
return (new cljs.core.HashCollisionNode(null,this__9911.collision_hash,(this__9911.cnt + 1),new_arr__9915));
} else
{if(cljs.core._EQ_.call(null,(this__9911.arr[idx__9913]),val))
{return inode__9912;
} else
{return (new cljs.core.HashCollisionNode(null,this__9911.collision_hash,this__9911.cnt,cljs.core.clone_and_set.call(null,this__9911.arr,(idx__9913 + 1),val)));
}
}
} else
{return (new cljs.core.BitmapIndexedNode(null,(1 << ((this__9911.collision_hash >>> shift) & 0x01f)),[null,inode__9912])).inode_assoc(shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__9916 = this;
var inode__9917 = this;
var idx__9918 = cljs.core.hash_collision_node_find_index.call(null,this__9916.arr,this__9916.cnt,key);
if((idx__9918 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__9916.arr[idx__9918])))
{return (this__9916.arr[(idx__9918 + 1)]);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable_array = (function (e,count,array){
var this__9919 = this;
var inode__9920 = this;
if((e === this__9919.edit))
{this__9919.arr = array;
this__9919.cnt = count;
return inode__9920;
} else
{return (new cljs.core.HashCollisionNode(this__9919.edit,this__9919.collision_hash,count,array));
}
});
cljs.core.HashCollisionNode;
cljs.core.create_node = (function() {
var create_node = null;
var create_node__6 = (function (shift,key1,val1,key2hash,key2,val2){
var key1hash__9925 = cljs.core.hash.call(null,key1);
if((key1hash__9925 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9925,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9926 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift,key1hash__9925,key1,val1,added_leaf_QMARK___9926).inode_assoc(shift,key2hash,key2,val2,added_leaf_QMARK___9926);
}
});
var create_node__7 = (function (edit,shift,key1,val1,key2hash,key2,val2){
var key1hash__9927 = cljs.core.hash.call(null,key1);
if((key1hash__9927 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9927,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9928 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,shift,key1hash__9927,key1,val1,added_leaf_QMARK___9928).inode_assoc_BANG_(edit,shift,key2hash,key2,val2,added_leaf_QMARK___9928);
}
});
create_node = function(edit,shift,key1,val1,key2hash,key2,val2){
switch(arguments.length){
case 6:
return create_node__6.call(this,edit,shift,key1,val1,key2hash,key2);
case 7:
return create_node__7.call(this,edit,shift,key1,val1,key2hash,key2,val2);
}
throw('Invalid arity: ' + arguments.length);
};
create_node.cljs$lang$arity$6 = create_node__6;
create_node.cljs$lang$arity$7 = create_node__7;
return create_node;
})()
;

/**
* @constructor
*/
cljs.core.NodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/NodeSeq");
});
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9929 = this;
var h__3049__auto____9930 = this__9929.__hash;
if(!((h__3049__auto____9930 == null)))
{return h__3049__auto____9930;
} else
{var h__3049__auto____9931 = cljs.core.hash_coll.call(null,coll);
this__9929.__hash = h__3049__auto____9931;
return h__3049__auto____9931;
}
});
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9932 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.NodeSeq.prototype.toString = (function (){
var this__9933 = this;
var this__9934 = this;
return cljs.core.pr_str.call(null,this__9934);
});
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9935 = this;
return this$;
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9936 = this;
if((this__9936.s == null))
{return cljs.core.PersistentVector.fromArray([(this__9936.nodes[this__9936.i]),(this__9936.nodes[(this__9936.i + 1)])], true);
} else
{return cljs.core.first.call(null,this__9936.s);
}
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9937 = this;
if((this__9937.s == null))
{return cljs.core.create_inode_seq.call(null,this__9937.nodes,(this__9937.i + 2),null);
} else
{return cljs.core.create_inode_seq.call(null,this__9937.nodes,this__9937.i,cljs.core.next.call(null,this__9937.s));
}
});
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9938 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9939 = this;
return (new cljs.core.NodeSeq(meta,this__9939.nodes,this__9939.i,this__9939.s,this__9939.__hash));
});
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9940 = this;
return this__9940.meta;
});
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9941 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9941.meta);
});
cljs.core.NodeSeq;
cljs.core.create_inode_seq = (function() {
var create_inode_seq = null;
var create_inode_seq__1 = (function (nodes){
return create_inode_seq.call(null,nodes,0,null);
});
var create_inode_seq__3 = (function (nodes,i,s){
if((s == null))
{var len__9948 = nodes.length;
var j__9949 = i;
while(true){
if((j__9949 < len__9948))
{if(!(((nodes[j__9949]) == null)))
{return (new cljs.core.NodeSeq(null,nodes,j__9949,null,null));
} else
{var temp__3971__auto____9950 = (nodes[(j__9949 + 1)]);
if(cljs.core.truth_(temp__3971__auto____9950))
{var node__9951 = temp__3971__auto____9950;
var temp__3971__auto____9952 = node__9951.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9952))
{var node_seq__9953 = temp__3971__auto____9952;
return (new cljs.core.NodeSeq(null,nodes,(j__9949 + 2),node_seq__9953,null));
} else
{{
var G__9954 = (j__9949 + 2);
j__9949 = G__9954;
continue;
}
}
} else
{{
var G__9955 = (j__9949 + 2);
j__9949 = G__9955;
continue;
}
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.NodeSeq(null,nodes,i,s,null));
}
});
create_inode_seq = function(nodes,i,s){
switch(arguments.length){
case 1:
return create_inode_seq__1.call(this,nodes);
case 3:
return create_inode_seq__3.call(this,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
return create_inode_seq;
})()
;

/**
* @constructor
*/
cljs.core.ArrayNodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNodeSeq");
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9956 = this;
var h__3049__auto____9957 = this__9956.__hash;
if(!((h__3049__auto____9957 == null)))
{return h__3049__auto____9957;
} else
{var h__3049__auto____9958 = cljs.core.hash_coll.call(null,coll);
this__9956.__hash = h__3049__auto____9958;
return h__3049__auto____9958;
}
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9959 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ArrayNodeSeq.prototype.toString = (function (){
var this__9960 = this;
var this__9961 = this;
return cljs.core.pr_str.call(null,this__9961);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9962 = this;
return this$;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9963 = this;
return cljs.core.first.call(null,this__9963.s);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9964 = this;
return cljs.core.create_array_node_seq.call(null,null,this__9964.nodes,this__9964.i,cljs.core.next.call(null,this__9964.s));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9965 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9966 = this;
return (new cljs.core.ArrayNodeSeq(meta,this__9966.nodes,this__9966.i,this__9966.s,this__9966.__hash));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9967 = this;
return this__9967.meta;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9968 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9968.meta);
});
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = (function() {
var create_array_node_seq = null;
var create_array_node_seq__1 = (function (nodes){
return create_array_node_seq.call(null,null,nodes,0,null);
});
var create_array_node_seq__4 = (function (meta,nodes,i,s){
if((s == null))
{var len__9975 = nodes.length;
var j__9976 = i;
while(true){
if((j__9976 < len__9975))
{var temp__3971__auto____9977 = (nodes[j__9976]);
if(cljs.core.truth_(temp__3971__auto____9977))
{var nj__9978 = temp__3971__auto____9977;
var temp__3971__auto____9979 = nj__9978.inode_seq();
if(cljs.core.truth_(temp__3971__auto____9979))
{var ns__9980 = temp__3971__auto____9979;
return (new cljs.core.ArrayNodeSeq(meta,nodes,(j__9976 + 1),ns__9980,null));
} else
{{
var G__9981 = (j__9976 + 1);
j__9976 = G__9981;
continue;
}
}
} else
{{
var G__9982 = (j__9976 + 1);
j__9976 = G__9982;
continue;
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.ArrayNodeSeq(meta,nodes,i,s,null));
}
});
create_array_node_seq = function(meta,nodes,i,s){
switch(arguments.length){
case 1:
return create_array_node_seq__1.call(this,meta);
case 4:
return create_array_node_seq__4.call(this,meta,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
return create_array_node_seq;
})()
;

/**
* @constructor
*/
cljs.core.PersistentHashMap = (function (meta,cnt,root,has_nil_QMARK_,nil_val,__hash){
this.meta = meta;
this.cnt = cnt;
this.root = root;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashMap");
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9985 = this;
return (new cljs.core.TransientHashMap({},this__9985.root,this__9985.cnt,this__9985.has_nil_QMARK_,this__9985.nil_val));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9986 = this;
var h__3049__auto____9987 = this__9986.__hash;
if(!((h__3049__auto____9987 == null)))
{return h__3049__auto____9987;
} else
{var h__3049__auto____9988 = cljs.core.hash_imap.call(null,coll);
this__9986.__hash = h__3049__auto____9988;
return h__3049__auto____9988;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9989 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9990 = this;
if((k == null))
{if(this__9990.has_nil_QMARK_)
{return this__9990.nil_val;
} else
{return not_found;
}
} else
{if((this__9990.root == null))
{return not_found;
} else
{if("\uFDD0'else")
{return this__9990.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9991 = this;
if((k == null))
{if((function (){var and__3822__auto____9992 = this__9991.has_nil_QMARK_;
if(and__3822__auto____9992)
{return (v === this__9991.nil_val);
} else
{return and__3822__auto____9992;
}
})())
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9991.meta,((this__9991.has_nil_QMARK_)?this__9991.cnt:(this__9991.cnt + 1)),this__9991.root,true,v,null));
}
} else
{var added_leaf_QMARK___9993 = (new cljs.core.Box(false));
var new_root__9994 = (((this__9991.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9991.root).inode_assoc(0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9993);
if((new_root__9994 === this__9991.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9991.meta,((added_leaf_QMARK___9993.val)?(this__9991.cnt + 1):this__9991.cnt),new_root__9994,this__9991.has_nil_QMARK_,this__9991.nil_val,null));
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9995 = this;
if((k == null))
{return this__9995.has_nil_QMARK_;
} else
{if((this__9995.root == null))
{return false;
} else
{if("\uFDD0'else")
{return !((this__9995.root.inode_lookup(0,cljs.core.hash.call(null,k),k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel));
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.call = (function() {
var G__10018 = null;
var G__10018__2 = (function (this_sym9996,k){
var this__9998 = this;
var this_sym9996__9999 = this;
var coll__10000 = this_sym9996__9999;
return coll__10000.cljs$core$ILookup$_lookup$arity$2(coll__10000,k);
});
var G__10018__3 = (function (this_sym9997,k,not_found){
var this__9998 = this;
var this_sym9997__10001 = this;
var coll__10002 = this_sym9997__10001;
return coll__10002.cljs$core$ILookup$_lookup$arity$3(coll__10002,k,not_found);
});
G__10018 = function(this_sym9997,k,not_found){
switch(arguments.length){
case 2:
return G__10018__2.call(this,this_sym9997,k);
case 3:
return G__10018__3.call(this,this_sym9997,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10018;
})()
;
cljs.core.PersistentHashMap.prototype.apply = (function (this_sym9983,args9984){
var this__10003 = this;
return this_sym9983.call.apply(this_sym9983,[this_sym9983].concat(args9984.slice()));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__10004 = this;
var init__10005 = ((this__10004.has_nil_QMARK_)?f.call(null,init,null,this__10004.nil_val):init);
if(cljs.core.reduced_QMARK_.call(null,init__10005))
{return cljs.core.deref.call(null,init__10005);
} else
{if(!((this__10004.root == null)))
{return this__10004.root.kv_reduce(f,init__10005);
} else
{if("\uFDD0'else")
{return init__10005;
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__10006 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentHashMap.prototype.toString = (function (){
var this__10007 = this;
var this__10008 = this;
return cljs.core.pr_str.call(null,this__10008);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10009 = this;
if((this__10009.cnt > 0))
{var s__10010 = ((!((this__10009.root == null)))?this__10009.root.inode_seq():null);
if(this__10009.has_nil_QMARK_)
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([null,this__10009.nil_val], true),s__10010);
} else
{return s__10010;
}
} else
{return null;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10011 = this;
return this__10011.cnt;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10012 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10013 = this;
return (new cljs.core.PersistentHashMap(meta,this__10013.cnt,this__10013.root,this__10013.has_nil_QMARK_,this__10013.nil_val,this__10013.__hash));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10014 = this;
return this__10014.meta;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10015 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,this__10015.meta);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__10016 = this;
if((k == null))
{if(this__10016.has_nil_QMARK_)
{return (new cljs.core.PersistentHashMap(this__10016.meta,(this__10016.cnt - 1),this__10016.root,false,null,null));
} else
{return coll;
}
} else
{if((this__10016.root == null))
{return coll;
} else
{if("\uFDD0'else")
{var new_root__10017 = this__10016.root.inode_without(0,cljs.core.hash.call(null,k),k);
if((new_root__10017 === this__10016.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__10016.meta,(this__10016.cnt - 1),new_root__10017,this__10016.has_nil_QMARK_,this__10016.nil_val,null));
}
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = (new cljs.core.PersistentHashMap(null,0,null,false,null,0));
cljs.core.PersistentHashMap.fromArrays = (function (ks,vs){
var len__10019 = ks.length;
var i__10020 = 0;
var out__10021 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if((i__10020 < len__10019))
{{
var G__10022 = (i__10020 + 1);
var G__10023 = cljs.core.assoc_BANG_.call(null,out__10021,(ks[i__10020]),(vs[i__10020]));
i__10020 = G__10022;
out__10021 = G__10023;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10021);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientHashMap = (function (edit,root,count,has_nil_QMARK_,nil_val){
this.edit = edit;
this.root = root;
this.count = count;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.cljs$lang$protocol_mask$partition1$ = 14;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashMap");
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__10024 = this;
return tcoll.without_BANG_(key);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__10025 = this;
return tcoll.assoc_BANG_(key,val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,val){
var this__10026 = this;
return tcoll.conj_BANG_(val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__10027 = this;
return tcoll.persistent_BANG_();
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__10028 = this;
if((k == null))
{if(this__10028.has_nil_QMARK_)
{return this__10028.nil_val;
} else
{return null;
}
} else
{if((this__10028.root == null))
{return null;
} else
{return this__10028.root.inode_lookup(0,cljs.core.hash.call(null,k),k);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__10029 = this;
if((k == null))
{if(this__10029.has_nil_QMARK_)
{return this__10029.nil_val;
} else
{return not_found;
}
} else
{if((this__10029.root == null))
{return not_found;
} else
{return this__10029.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10030 = this;
if(this__10030.edit)
{return this__10030.count;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.conj_BANG_ = (function (o){
var this__10031 = this;
var tcoll__10032 = this;
if(this__10031.edit)
{if((function (){var G__10033__10034 = o;
if(G__10033__10034)
{if((function (){var or__3824__auto____10035 = (G__10033__10034.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3824__auto____10035)
{return or__3824__auto____10035;
} else
{return G__10033__10034.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__10033__10034.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__10033__10034);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__10033__10034);
}
})())
{return tcoll__10032.assoc_BANG_(cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__10036 = cljs.core.seq.call(null,o);
var tcoll__10037 = tcoll__10032;
while(true){
var temp__3971__auto____10038 = cljs.core.first.call(null,es__10036);
if(cljs.core.truth_(temp__3971__auto____10038))
{var e__10039 = temp__3971__auto____10038;
{
var G__10050 = cljs.core.next.call(null,es__10036);
var G__10051 = tcoll__10037.assoc_BANG_(cljs.core.key.call(null,e__10039),cljs.core.val.call(null,e__10039));
es__10036 = G__10050;
tcoll__10037 = G__10051;
continue;
}
} else
{return tcoll__10037;
}
break;
}
}
} else
{throw (new Error("conj! after persistent"));
}
});
cljs.core.TransientHashMap.prototype.assoc_BANG_ = (function (k,v){
var this__10040 = this;
var tcoll__10041 = this;
if(this__10040.edit)
{if((k == null))
{if((this__10040.nil_val === v))
{} else
{this__10040.nil_val = v;
}
if(this__10040.has_nil_QMARK_)
{} else
{this__10040.count = (this__10040.count + 1);
this__10040.has_nil_QMARK_ = true;
}
return tcoll__10041;
} else
{var added_leaf_QMARK___10042 = (new cljs.core.Box(false));
var node__10043 = (((this__10040.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__10040.root).inode_assoc_BANG_(this__10040.edit,0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___10042);
if((node__10043 === this__10040.root))
{} else
{this__10040.root = node__10043;
}
if(added_leaf_QMARK___10042.val)
{this__10040.count = (this__10040.count + 1);
} else
{}
return tcoll__10041;
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.without_BANG_ = (function (k){
var this__10044 = this;
var tcoll__10045 = this;
if(this__10044.edit)
{if((k == null))
{if(this__10044.has_nil_QMARK_)
{this__10044.has_nil_QMARK_ = false;
this__10044.nil_val = null;
this__10044.count = (this__10044.count - 1);
return tcoll__10045;
} else
{return tcoll__10045;
}
} else
{if((this__10044.root == null))
{return tcoll__10045;
} else
{var removed_leaf_QMARK___10046 = (new cljs.core.Box(false));
var node__10047 = this__10044.root.inode_without_BANG_(this__10044.edit,0,cljs.core.hash.call(null,k),k,removed_leaf_QMARK___10046);
if((node__10047 === this__10044.root))
{} else
{this__10044.root = node__10047;
}
if(cljs.core.truth_((removed_leaf_QMARK___10046[0])))
{this__10044.count = (this__10044.count - 1);
} else
{}
return tcoll__10045;
}
}
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.persistent_BANG_ = (function (){
var this__10048 = this;
var tcoll__10049 = this;
if(this__10048.edit)
{this__10048.edit = null;
return (new cljs.core.PersistentHashMap(null,this__10048.count,this__10048.root,this__10048.has_nil_QMARK_,this__10048.nil_val,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = (function tree_map_seq_push(node,stack,ascending_QMARK_){
var t__10054 = node;
var stack__10055 = stack;
while(true){
if(!((t__10054 == null)))
{{
var G__10056 = ((ascending_QMARK_)?t__10054.left:t__10054.right);
var G__10057 = cljs.core.conj.call(null,stack__10055,t__10054);
t__10054 = G__10056;
stack__10055 = G__10057;
continue;
}
} else
{return stack__10055;
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentTreeMapSeq = (function (meta,stack,ascending_QMARK_,cnt,__hash){
this.meta = meta;
this.stack = stack;
this.ascending_QMARK_ = ascending_QMARK_;
this.cnt = cnt;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850570;
})
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMapSeq");
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10058 = this;
var h__3049__auto____10059 = this__10058.__hash;
if(!((h__3049__auto____10059 == null)))
{return h__3049__auto____10059;
} else
{var h__3049__auto____10060 = cljs.core.hash_coll.call(null,coll);
this__10058.__hash = h__3049__auto____10060;
return h__3049__auto____10060;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__10061 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.toString = (function (){
var this__10062 = this;
var this__10063 = this;
return cljs.core.pr_str.call(null,this__10063);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__10064 = this;
return this$;
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10065 = this;
if((this__10065.cnt < 0))
{return (cljs.core.count.call(null,cljs.core.next.call(null,coll)) + 1);
} else
{return this__10065.cnt;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this__10066 = this;
return cljs.core.peek.call(null,this__10066.stack);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this__10067 = this;
var t__10068 = cljs.core.first.call(null,this__10067.stack);
var next_stack__10069 = cljs.core.tree_map_seq_push.call(null,((this__10067.ascending_QMARK_)?t__10068.right:t__10068.left),cljs.core.next.call(null,this__10067.stack),this__10067.ascending_QMARK_);
if(!((next_stack__10069 == null)))
{return (new cljs.core.PersistentTreeMapSeq(null,next_stack__10069,this__10067.ascending_QMARK_,(this__10067.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10070 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10071 = this;
return (new cljs.core.PersistentTreeMapSeq(meta,this__10071.stack,this__10071.ascending_QMARK_,this__10071.cnt,this__10071.__hash));
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10072 = this;
return this__10072.meta;
});
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = (function create_tree_map_seq(tree,ascending_QMARK_,cnt){
return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.tree_map_seq_push.call(null,tree,null,ascending_QMARK_),ascending_QMARK_,cnt,null));
});
cljs.core.balance_left = (function balance_left(key,val,ins,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.key,ins.val,ins.left.blacken(),(new cljs.core.BlackNode(key,val,ins.right,right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.right.key,ins.right.val,(new cljs.core.BlackNode(ins.key,ins.val,ins.left,ins.right.left,null)),(new cljs.core.BlackNode(key,val,ins.right.right,right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,ins,right,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,ins,right,null));
}
});
cljs.core.balance_right = (function balance_right(key,val,left,ins){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.key,ins.val,(new cljs.core.BlackNode(key,val,left,ins.left,null)),ins.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.left.key,ins.left.val,(new cljs.core.BlackNode(key,val,left,ins.left.left,null)),(new cljs.core.BlackNode(ins.key,ins.val,ins.left.right,ins.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,left,ins,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,left,ins,null));
}
});
cljs.core.balance_left_del = (function balance_left_del(key,val,del,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,del.blacken(),right,null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right))
{return cljs.core.balance_right.call(null,key,val,del,right.redden());
} else
{if((function (){var and__3822__auto____10074 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right);
if(and__3822__auto____10074)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right.left);
} else
{return and__3822__auto____10074;
}
})())
{return (new cljs.core.RedNode(right.left.key,right.left.val,(new cljs.core.BlackNode(key,val,del,right.left.left,null)),cljs.core.balance_right.call(null,right.key,right.val,right.left.right,right.right.redden()),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.balance_right_del = (function balance_right_del(key,val,left,del){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,left,del.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left))
{return cljs.core.balance_left.call(null,key,val,left.redden(),del);
} else
{if((function (){var and__3822__auto____10076 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left);
if(and__3822__auto____10076)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left.right);
} else
{return and__3822__auto____10076;
}
})())
{return (new cljs.core.RedNode(left.right.key,left.right.val,cljs.core.balance_left.call(null,left.key,left.val,left.left.redden(),left.right.left),(new cljs.core.BlackNode(key,val,left.right.right,del,null)),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_kv_reduce = (function tree_map_kv_reduce(node,f,init){
var init__10080 = f.call(null,init,node.key,node.val);
if(cljs.core.reduced_QMARK_.call(null,init__10080))
{return cljs.core.deref.call(null,init__10080);
} else
{var init__10081 = ((!((node.left == null)))?tree_map_kv_reduce.call(null,node.left,f,init__10080):init__10080);
if(cljs.core.reduced_QMARK_.call(null,init__10081))
{return cljs.core.deref.call(null,init__10081);
} else
{var init__10082 = ((!((node.right == null)))?tree_map_kv_reduce.call(null,node.right,f,init__10081):init__10081);
if(cljs.core.reduced_QMARK_.call(null,init__10082))
{return cljs.core.deref.call(null,init__10082);
} else
{return init__10082;
}
}
}
});

/**
* @constructor
*/
cljs.core.BlackNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/BlackNode");
});
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10085 = this;
var h__3049__auto____10086 = this__10085.__hash;
if(!((h__3049__auto____10086 == null)))
{return h__3049__auto____10086;
} else
{var h__3049__auto____10087 = cljs.core.hash_coll.call(null,coll);
this__10085.__hash = h__3049__auto____10087;
return h__3049__auto____10087;
}
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__10088 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__10089 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__10090 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__10090.key,this__10090.val], true),k,v);
});
cljs.core.BlackNode.prototype.call = (function() {
var G__10138 = null;
var G__10138__2 = (function (this_sym10091,k){
var this__10093 = this;
var this_sym10091__10094 = this;
var node__10095 = this_sym10091__10094;
return node__10095.cljs$core$ILookup$_lookup$arity$2(node__10095,k);
});
var G__10138__3 = (function (this_sym10092,k,not_found){
var this__10093 = this;
var this_sym10092__10096 = this;
var node__10097 = this_sym10092__10096;
return node__10097.cljs$core$ILookup$_lookup$arity$3(node__10097,k,not_found);
});
G__10138 = function(this_sym10092,k,not_found){
switch(arguments.length){
case 2:
return G__10138__2.call(this,this_sym10092,k);
case 3:
return G__10138__3.call(this,this_sym10092,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10138;
})()
;
cljs.core.BlackNode.prototype.apply = (function (this_sym10083,args10084){
var this__10098 = this;
return this_sym10083.call.apply(this_sym10083,[this_sym10083].concat(args10084.slice()));
});
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__10099 = this;
return cljs.core.PersistentVector.fromArray([this__10099.key,this__10099.val,o], true);
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__10100 = this;
return this__10100.key;
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__10101 = this;
return this__10101.val;
});
cljs.core.BlackNode.prototype.add_right = (function (ins){
var this__10102 = this;
var node__10103 = this;
return ins.balance_right(node__10103);
});
cljs.core.BlackNode.prototype.redden = (function (){
var this__10104 = this;
var node__10105 = this;
return (new cljs.core.RedNode(this__10104.key,this__10104.val,this__10104.left,this__10104.right,null));
});
cljs.core.BlackNode.prototype.remove_right = (function (del){
var this__10106 = this;
var node__10107 = this;
return cljs.core.balance_right_del.call(null,this__10106.key,this__10106.val,this__10106.left,del);
});
cljs.core.BlackNode.prototype.replace = (function (key,val,left,right){
var this__10108 = this;
var node__10109 = this;
return (new cljs.core.BlackNode(key,val,left,right,null));
});
cljs.core.BlackNode.prototype.kv_reduce = (function (f,init){
var this__10110 = this;
var node__10111 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__10111,f,init);
});
cljs.core.BlackNode.prototype.remove_left = (function (del){
var this__10112 = this;
var node__10113 = this;
return cljs.core.balance_left_del.call(null,this__10112.key,this__10112.val,del,this__10112.right);
});
cljs.core.BlackNode.prototype.add_left = (function (ins){
var this__10114 = this;
var node__10115 = this;
return ins.balance_left(node__10115);
});
cljs.core.BlackNode.prototype.balance_left = (function (parent){
var this__10116 = this;
var node__10117 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,node__10117,parent.right,null));
});
cljs.core.BlackNode.prototype.toString = (function() {
var G__10139 = null;
var G__10139__0 = (function (){
var this__10118 = this;
var this__10120 = this;
return cljs.core.pr_str.call(null,this__10120);
});
G__10139 = function(){
switch(arguments.length){
case 0:
return G__10139__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10139;
})()
;
cljs.core.BlackNode.prototype.balance_right = (function (parent){
var this__10121 = this;
var node__10122 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__10122,null));
});
cljs.core.BlackNode.prototype.blacken = (function (){
var this__10123 = this;
var node__10124 = this;
return node__10124;
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__10125 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__10126 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__10127 = this;
return cljs.core.list.call(null,this__10127.key,this__10127.val);
});
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__10128 = this;
return 2;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__10129 = this;
return this__10129.val;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__10130 = this;
return cljs.core.PersistentVector.fromArray([this__10130.key], true);
});
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__10131 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__10131.key,this__10131.val], true),n,v);
});
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10132 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__10133 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__10133.key,this__10133.val], true),meta);
});
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__10134 = this;
return null;
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__10135 = this;
if((n === 0))
{return this__10135.key;
} else
{if((n === 1))
{return this__10135.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__10136 = this;
if((n === 0))
{return this__10136.key;
} else
{if((n === 1))
{return this__10136.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__10137 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.BlackNode;

/**
* @constructor
*/
cljs.core.RedNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/RedNode");
});
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10142 = this;
var h__3049__auto____10143 = this__10142.__hash;
if(!((h__3049__auto____10143 == null)))
{return h__3049__auto____10143;
} else
{var h__3049__auto____10144 = cljs.core.hash_coll.call(null,coll);
this__10142.__hash = h__3049__auto____10144;
return h__3049__auto____10144;
}
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__10145 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__10146 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__10147 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__10147.key,this__10147.val], true),k,v);
});
cljs.core.RedNode.prototype.call = (function() {
var G__10195 = null;
var G__10195__2 = (function (this_sym10148,k){
var this__10150 = this;
var this_sym10148__10151 = this;
var node__10152 = this_sym10148__10151;
return node__10152.cljs$core$ILookup$_lookup$arity$2(node__10152,k);
});
var G__10195__3 = (function (this_sym10149,k,not_found){
var this__10150 = this;
var this_sym10149__10153 = this;
var node__10154 = this_sym10149__10153;
return node__10154.cljs$core$ILookup$_lookup$arity$3(node__10154,k,not_found);
});
G__10195 = function(this_sym10149,k,not_found){
switch(arguments.length){
case 2:
return G__10195__2.call(this,this_sym10149,k);
case 3:
return G__10195__3.call(this,this_sym10149,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10195;
})()
;
cljs.core.RedNode.prototype.apply = (function (this_sym10140,args10141){
var this__10155 = this;
return this_sym10140.call.apply(this_sym10140,[this_sym10140].concat(args10141.slice()));
});
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__10156 = this;
return cljs.core.PersistentVector.fromArray([this__10156.key,this__10156.val,o], true);
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__10157 = this;
return this__10157.key;
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__10158 = this;
return this__10158.val;
});
cljs.core.RedNode.prototype.add_right = (function (ins){
var this__10159 = this;
var node__10160 = this;
return (new cljs.core.RedNode(this__10159.key,this__10159.val,this__10159.left,ins,null));
});
cljs.core.RedNode.prototype.redden = (function (){
var this__10161 = this;
var node__10162 = this;
throw (new Error("red-black tree invariant violation"));
});
cljs.core.RedNode.prototype.remove_right = (function (del){
var this__10163 = this;
var node__10164 = this;
return (new cljs.core.RedNode(this__10163.key,this__10163.val,this__10163.left,del,null));
});
cljs.core.RedNode.prototype.replace = (function (key,val,left,right){
var this__10165 = this;
var node__10166 = this;
return (new cljs.core.RedNode(key,val,left,right,null));
});
cljs.core.RedNode.prototype.kv_reduce = (function (f,init){
var this__10167 = this;
var node__10168 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__10168,f,init);
});
cljs.core.RedNode.prototype.remove_left = (function (del){
var this__10169 = this;
var node__10170 = this;
return (new cljs.core.RedNode(this__10169.key,this__10169.val,del,this__10169.right,null));
});
cljs.core.RedNode.prototype.add_left = (function (ins){
var this__10171 = this;
var node__10172 = this;
return (new cljs.core.RedNode(this__10171.key,this__10171.val,ins,this__10171.right,null));
});
cljs.core.RedNode.prototype.balance_left = (function (parent){
var this__10173 = this;
var node__10174 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10173.left))
{return (new cljs.core.RedNode(this__10173.key,this__10173.val,this__10173.left.blacken(),(new cljs.core.BlackNode(parent.key,parent.val,this__10173.right,parent.right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10173.right))
{return (new cljs.core.RedNode(this__10173.right.key,this__10173.right.val,(new cljs.core.BlackNode(this__10173.key,this__10173.val,this__10173.left,this__10173.right.left,null)),(new cljs.core.BlackNode(parent.key,parent.val,this__10173.right.right,parent.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,node__10174,parent.right,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.toString = (function() {
var G__10196 = null;
var G__10196__0 = (function (){
var this__10175 = this;
var this__10177 = this;
return cljs.core.pr_str.call(null,this__10177);
});
G__10196 = function(){
switch(arguments.length){
case 0:
return G__10196__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10196;
})()
;
cljs.core.RedNode.prototype.balance_right = (function (parent){
var this__10178 = this;
var node__10179 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10178.right))
{return (new cljs.core.RedNode(this__10178.key,this__10178.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__10178.left,null)),this__10178.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__10178.left))
{return (new cljs.core.RedNode(this__10178.left.key,this__10178.left.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__10178.left.left,null)),(new cljs.core.BlackNode(this__10178.key,this__10178.val,this__10178.left.right,this__10178.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__10179,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.blacken = (function (){
var this__10180 = this;
var node__10181 = this;
return (new cljs.core.BlackNode(this__10180.key,this__10180.val,this__10180.left,this__10180.right,null));
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__10182 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__10183 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__10184 = this;
return cljs.core.list.call(null,this__10184.key,this__10184.val);
});
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__10185 = this;
return 2;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__10186 = this;
return this__10186.val;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__10187 = this;
return cljs.core.PersistentVector.fromArray([this__10187.key], true);
});
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__10188 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__10188.key,this__10188.val], true),n,v);
});
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10189 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__10190 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__10190.key,this__10190.val], true),meta);
});
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__10191 = this;
return null;
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__10192 = this;
if((n === 0))
{return this__10192.key;
} else
{if((n === 1))
{return this__10192.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__10193 = this;
if((n === 0))
{return this__10193.key;
} else
{if((n === 1))
{return this__10193.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__10194 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.RedNode;
cljs.core.tree_map_add = (function tree_map_add(comp,tree,k,v,found){
if((tree == null))
{return (new cljs.core.RedNode(k,v,null,null,null));
} else
{var c__10200 = comp.call(null,k,tree.key);
if((c__10200 === 0))
{(found[0] = tree);
return null;
} else
{if((c__10200 < 0))
{var ins__10201 = tree_map_add.call(null,comp,tree.left,k,v,found);
if(!((ins__10201 == null)))
{return tree.add_left(ins__10201);
} else
{return null;
}
} else
{if("\uFDD0'else")
{var ins__10202 = tree_map_add.call(null,comp,tree.right,k,v,found);
if(!((ins__10202 == null)))
{return tree.add_right(ins__10202);
} else
{return null;
}
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_append = (function tree_map_append(left,right){
if((left == null))
{return right;
} else
{if((right == null))
{return left;
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{var app__10205 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__10205))
{return (new cljs.core.RedNode(app__10205.key,app__10205.val,(new cljs.core.RedNode(left.key,left.val,left.left,app__10205.left,null)),(new cljs.core.RedNode(right.key,right.val,app__10205.right,right.right,null)),null));
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,(new cljs.core.RedNode(right.key,right.val,app__10205,right.right,null)),null));
}
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,tree_map_append.call(null,left.right,right),null));
}
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{return (new cljs.core.RedNode(right.key,right.val,tree_map_append.call(null,left,right.left),right.right,null));
} else
{if("\uFDD0'else")
{var app__10206 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__10206))
{return (new cljs.core.RedNode(app__10206.key,app__10206.val,(new cljs.core.BlackNode(left.key,left.val,left.left,app__10206.left,null)),(new cljs.core.BlackNode(right.key,right.val,app__10206.right,right.right,null)),null));
} else
{return cljs.core.balance_left_del.call(null,left.key,left.val,left.left,(new cljs.core.BlackNode(right.key,right.val,app__10206,right.right,null)));
}
} else
{return null;
}
}
}
}
}
});
cljs.core.tree_map_remove = (function tree_map_remove(comp,tree,k,found){
if(!((tree == null)))
{var c__10212 = comp.call(null,k,tree.key);
if((c__10212 === 0))
{(found[0] = tree);
return cljs.core.tree_map_append.call(null,tree.left,tree.right);
} else
{if((c__10212 < 0))
{var del__10213 = tree_map_remove.call(null,comp,tree.left,k,found);
if((function (){var or__3824__auto____10214 = !((del__10213 == null));
if(or__3824__auto____10214)
{return or__3824__auto____10214;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.left))
{return cljs.core.balance_left_del.call(null,tree.key,tree.val,del__10213,tree.right);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,del__10213,tree.right,null));
}
} else
{return null;
}
} else
{if("\uFDD0'else")
{var del__10215 = tree_map_remove.call(null,comp,tree.right,k,found);
if((function (){var or__3824__auto____10216 = !((del__10215 == null));
if(or__3824__auto____10216)
{return or__3824__auto____10216;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.right))
{return cljs.core.balance_right_del.call(null,tree.key,tree.val,tree.left,del__10215);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,tree.left,del__10215,null));
}
} else
{return null;
}
} else
{return null;
}
}
}
} else
{return null;
}
});
cljs.core.tree_map_replace = (function tree_map_replace(comp,tree,k,v){
var tk__10219 = tree.key;
var c__10220 = comp.call(null,k,tk__10219);
if((c__10220 === 0))
{return tree.replace(tk__10219,v,tree.left,tree.right);
} else
{if((c__10220 < 0))
{return tree.replace(tk__10219,tree.val,tree_map_replace.call(null,comp,tree.left,k,v),tree.right);
} else
{if("\uFDD0'else")
{return tree.replace(tk__10219,tree.val,tree.left,tree_map_replace.call(null,comp,tree.right,k,v));
} else
{return null;
}
}
}
});

/**
* @constructor
*/
cljs.core.PersistentTreeMap = (function (comp,tree,cnt,meta,__hash){
this.comp = comp;
this.tree = tree;
this.cnt = cnt;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 418776847;
})
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMap");
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10223 = this;
var h__3049__auto____10224 = this__10223.__hash;
if(!((h__3049__auto____10224 == null)))
{return h__3049__auto____10224;
} else
{var h__3049__auto____10225 = cljs.core.hash_imap.call(null,coll);
this__10223.__hash = h__3049__auto____10225;
return h__3049__auto____10225;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__10226 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__10227 = this;
var n__10228 = coll.entry_at(k);
if(!((n__10228 == null)))
{return n__10228.val;
} else
{return not_found;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__10229 = this;
var found__10230 = [null];
var t__10231 = cljs.core.tree_map_add.call(null,this__10229.comp,this__10229.tree,k,v,found__10230);
if((t__10231 == null))
{var found_node__10232 = cljs.core.nth.call(null,found__10230,0);
if(cljs.core._EQ_.call(null,v,found_node__10232.val))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__10229.comp,cljs.core.tree_map_replace.call(null,this__10229.comp,this__10229.tree,k,v),this__10229.cnt,this__10229.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__10229.comp,t__10231.blacken(),(this__10229.cnt + 1),this__10229.meta,null));
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__10233 = this;
return !((coll.entry_at(k) == null));
});
cljs.core.PersistentTreeMap.prototype.call = (function() {
var G__10267 = null;
var G__10267__2 = (function (this_sym10234,k){
var this__10236 = this;
var this_sym10234__10237 = this;
var coll__10238 = this_sym10234__10237;
return coll__10238.cljs$core$ILookup$_lookup$arity$2(coll__10238,k);
});
var G__10267__3 = (function (this_sym10235,k,not_found){
var this__10236 = this;
var this_sym10235__10239 = this;
var coll__10240 = this_sym10235__10239;
return coll__10240.cljs$core$ILookup$_lookup$arity$3(coll__10240,k,not_found);
});
G__10267 = function(this_sym10235,k,not_found){
switch(arguments.length){
case 2:
return G__10267__2.call(this,this_sym10235,k);
case 3:
return G__10267__3.call(this,this_sym10235,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10267;
})()
;
cljs.core.PersistentTreeMap.prototype.apply = (function (this_sym10221,args10222){
var this__10241 = this;
return this_sym10221.call.apply(this_sym10221,[this_sym10221].concat(args10222.slice()));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__10242 = this;
if(!((this__10242.tree == null)))
{return cljs.core.tree_map_kv_reduce.call(null,this__10242.tree,f,init);
} else
{return init;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__10243 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__10244 = this;
if((this__10244.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10244.tree,false,this__10244.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.toString = (function (){
var this__10245 = this;
var this__10246 = this;
return cljs.core.pr_str.call(null,this__10246);
});
cljs.core.PersistentTreeMap.prototype.entry_at = (function (k){
var this__10247 = this;
var coll__10248 = this;
var t__10249 = this__10247.tree;
while(true){
if(!((t__10249 == null)))
{var c__10250 = this__10247.comp.call(null,k,t__10249.key);
if((c__10250 === 0))
{return t__10249;
} else
{if((c__10250 < 0))
{{
var G__10268 = t__10249.left;
t__10249 = G__10268;
continue;
}
} else
{if("\uFDD0'else")
{{
var G__10269 = t__10249.right;
t__10249 = G__10269;
continue;
}
} else
{return null;
}
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__10251 = this;
if((this__10251.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10251.tree,ascending_QMARK_,this__10251.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__10252 = this;
if((this__10252.cnt > 0))
{var stack__10253 = null;
var t__10254 = this__10252.tree;
while(true){
if(!((t__10254 == null)))
{var c__10255 = this__10252.comp.call(null,k,t__10254.key);
if((c__10255 === 0))
{return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.conj.call(null,stack__10253,t__10254),ascending_QMARK_,-1,null));
} else
{if(cljs.core.truth_(ascending_QMARK_))
{if((c__10255 < 0))
{{
var G__10270 = cljs.core.conj.call(null,stack__10253,t__10254);
var G__10271 = t__10254.left;
stack__10253 = G__10270;
t__10254 = G__10271;
continue;
}
} else
{{
var G__10272 = stack__10253;
var G__10273 = t__10254.right;
stack__10253 = G__10272;
t__10254 = G__10273;
continue;
}
}
} else
{if("\uFDD0'else")
{if((c__10255 > 0))
{{
var G__10274 = cljs.core.conj.call(null,stack__10253,t__10254);
var G__10275 = t__10254.right;
stack__10253 = G__10274;
t__10254 = G__10275;
continue;
}
} else
{{
var G__10276 = stack__10253;
var G__10277 = t__10254.left;
stack__10253 = G__10276;
t__10254 = G__10277;
continue;
}
}
} else
{return null;
}
}
}
} else
{if((stack__10253 == null))
{return (new cljs.core.PersistentTreeMapSeq(null,stack__10253,ascending_QMARK_,-1,null));
} else
{return null;
}
}
break;
}
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__10256 = this;
return cljs.core.key.call(null,entry);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__10257 = this;
return this__10257.comp;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10258 = this;
if((this__10258.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__10258.tree,true,this__10258.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10259 = this;
return this__10259.cnt;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10260 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10261 = this;
return (new cljs.core.PersistentTreeMap(this__10261.comp,this__10261.tree,this__10261.cnt,meta,this__10261.__hash));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10262 = this;
return this__10262.meta;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10263 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeMap.EMPTY,this__10263.meta);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__10264 = this;
var found__10265 = [null];
var t__10266 = cljs.core.tree_map_remove.call(null,this__10264.comp,this__10264.tree,k,found__10265);
if((t__10266 == null))
{if((cljs.core.nth.call(null,found__10265,0) == null))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__10264.comp,null,0,this__10264.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__10264.comp,t__10266.blacken(),(this__10264.cnt - 1),this__10264.meta,null));
}
});
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = (new cljs.core.PersistentTreeMap(cljs.core.compare,null,0,null,0));
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in__10280 = cljs.core.seq.call(null,keyvals);
var out__10281 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if(in__10280)
{{
var G__10282 = cljs.core.nnext.call(null,in__10280);
var G__10283 = cljs.core.assoc_BANG_.call(null,out__10281,cljs.core.first.call(null,in__10280),cljs.core.second.call(null,in__10280));
in__10280 = G__10282;
out__10281 = G__10283;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10281);
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__10284){
var keyvals = cljs.core.seq(arglist__10284);;
return hash_map__delegate(keyvals);
});
hash_map.cljs$lang$arity$variadic = hash_map__delegate;
return hash_map;
})()
;
/**
* keyval => key val
* Returns a new array map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.array_map = (function() { 
var array_map__delegate = function (keyvals){
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,cljs.core.count.call(null,keyvals),2),cljs.core.apply.call(null,cljs.core.array,keyvals),null));
};
var array_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return array_map__delegate.call(this, keyvals);
};
array_map.cljs$lang$maxFixedArity = 0;
array_map.cljs$lang$applyTo = (function (arglist__10285){
var keyvals = cljs.core.seq(arglist__10285);;
return array_map__delegate(keyvals);
});
array_map.cljs$lang$arity$variadic = array_map__delegate;
return array_map;
})()
;
/**
* keyval => key val
* Returns a new object map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.obj_map = (function() { 
var obj_map__delegate = function (keyvals){
var ks__10289 = [];
var obj__10290 = {};
var kvs__10291 = cljs.core.seq.call(null,keyvals);
while(true){
if(kvs__10291)
{ks__10289.push(cljs.core.first.call(null,kvs__10291));
(obj__10290[cljs.core.first.call(null,kvs__10291)] = cljs.core.second.call(null,kvs__10291));
{
var G__10292 = cljs.core.nnext.call(null,kvs__10291);
kvs__10291 = G__10292;
continue;
}
} else
{return cljs.core.ObjMap.fromObject.call(null,ks__10289,obj__10290);
}
break;
}
};
var obj_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return obj_map__delegate.call(this, keyvals);
};
obj_map.cljs$lang$maxFixedArity = 0;
obj_map.cljs$lang$applyTo = (function (arglist__10293){
var keyvals = cljs.core.seq(arglist__10293);;
return obj_map__delegate(keyvals);
});
obj_map.cljs$lang$arity$variadic = obj_map__delegate;
return obj_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.sorted_map = (function() { 
var sorted_map__delegate = function (keyvals){
var in__10296 = cljs.core.seq.call(null,keyvals);
var out__10297 = cljs.core.PersistentTreeMap.EMPTY;
while(true){
if(in__10296)
{{
var G__10298 = cljs.core.nnext.call(null,in__10296);
var G__10299 = cljs.core.assoc.call(null,out__10297,cljs.core.first.call(null,in__10296),cljs.core.second.call(null,in__10296));
in__10296 = G__10298;
out__10297 = G__10299;
continue;
}
} else
{return out__10297;
}
break;
}
};
var sorted_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_map__delegate.call(this, keyvals);
};
sorted_map.cljs$lang$maxFixedArity = 0;
sorted_map.cljs$lang$applyTo = (function (arglist__10300){
var keyvals = cljs.core.seq(arglist__10300);;
return sorted_map__delegate(keyvals);
});
sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
return sorted_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_map_by = (function() { 
var sorted_map_by__delegate = function (comparator,keyvals){
var in__10303 = cljs.core.seq.call(null,keyvals);
var out__10304 = (new cljs.core.PersistentTreeMap(comparator,null,0,null,0));
while(true){
if(in__10303)
{{
var G__10305 = cljs.core.nnext.call(null,in__10303);
var G__10306 = cljs.core.assoc.call(null,out__10304,cljs.core.first.call(null,in__10303),cljs.core.second.call(null,in__10303));
in__10303 = G__10305;
out__10304 = G__10306;
continue;
}
} else
{return out__10304;
}
break;
}
};
var sorted_map_by = function (comparator,var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_map_by__delegate.call(this, comparator, keyvals);
};
sorted_map_by.cljs$lang$maxFixedArity = 1;
sorted_map_by.cljs$lang$applyTo = (function (arglist__10307){
var comparator = cljs.core.first(arglist__10307);
var keyvals = cljs.core.rest(arglist__10307);
return sorted_map_by__delegate(comparator, keyvals);
});
sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
return sorted_map_by;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns the key of the map entry.
*/
cljs.core.key = (function key(map_entry){
return cljs.core._key.call(null,map_entry);
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns the value in the map entry.
*/
cljs.core.val = (function val(map_entry){
return cljs.core._val.call(null,map_entry);
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__10308_SHARP_,p2__10309_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3824__auto____10311 = p1__10308_SHARP_;
if(cljs.core.truth_(or__3824__auto____10311))
{return or__3824__auto____10311;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),p2__10309_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__10312){
var maps = cljs.core.seq(arglist__10312);;
return merge__delegate(maps);
});
merge.cljs$lang$arity$variadic = merge__delegate;
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__10320 = (function (m,e){
var k__10318 = cljs.core.first.call(null,e);
var v__10319 = cljs.core.second.call(null,e);
if(cljs.core.contains_QMARK_.call(null,m,k__10318))
{return cljs.core.assoc.call(null,m,k__10318,f.call(null,cljs.core._lookup.call(null,m,k__10318,null),v__10319));
} else
{return cljs.core.assoc.call(null,m,k__10318,v__10319);
}
});
var merge2__10322 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__10320,(function (){var or__3824__auto____10321 = m1;
if(cljs.core.truth_(or__3824__auto____10321))
{return or__3824__auto____10321;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),cljs.core.seq.call(null,m2));
});
return cljs.core.reduce.call(null,merge2__10322,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__10323){
var f = cljs.core.first(arglist__10323);
var maps = cljs.core.rest(arglist__10323);
return merge_with__delegate(f, maps);
});
merge_with.cljs$lang$arity$variadic = merge_with__delegate;
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__10328 = cljs.core.ObjMap.EMPTY;
var keys__10329 = cljs.core.seq.call(null,keyseq);
while(true){
if(keys__10329)
{var key__10330 = cljs.core.first.call(null,keys__10329);
var entry__10331 = cljs.core._lookup.call(null,map,key__10330,"\uFDD0'cljs.core/not-found");
{
var G__10332 = ((cljs.core.not_EQ_.call(null,entry__10331,"\uFDD0'cljs.core/not-found"))?cljs.core.assoc.call(null,ret__10328,key__10330,entry__10331):ret__10328);
var G__10333 = cljs.core.next.call(null,keys__10329);
ret__10328 = G__10332;
keys__10329 = G__10333;
continue;
}
} else
{return ret__10328;
}
break;
}
});

/**
* @constructor
*/
cljs.core.PersistentHashSet = (function (meta,hash_map,__hash){
this.meta = meta;
this.hash_map = hash_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 15077647;
})
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashSet");
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__10337 = this;
return (new cljs.core.TransientHashSet(cljs.core.transient$.call(null,this__10337.hash_map)));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10338 = this;
var h__3049__auto____10339 = this__10338.__hash;
if(!((h__3049__auto____10339 == null)))
{return h__3049__auto____10339;
} else
{var h__3049__auto____10340 = cljs.core.hash_iset.call(null,coll);
this__10338.__hash = h__3049__auto____10340;
return h__3049__auto____10340;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__10341 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__10342 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__10342.hash_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentHashSet.prototype.call = (function() {
var G__10363 = null;
var G__10363__2 = (function (this_sym10343,k){
var this__10345 = this;
var this_sym10343__10346 = this;
var coll__10347 = this_sym10343__10346;
return coll__10347.cljs$core$ILookup$_lookup$arity$2(coll__10347,k);
});
var G__10363__3 = (function (this_sym10344,k,not_found){
var this__10345 = this;
var this_sym10344__10348 = this;
var coll__10349 = this_sym10344__10348;
return coll__10349.cljs$core$ILookup$_lookup$arity$3(coll__10349,k,not_found);
});
G__10363 = function(this_sym10344,k,not_found){
switch(arguments.length){
case 2:
return G__10363__2.call(this,this_sym10344,k);
case 3:
return G__10363__3.call(this,this_sym10344,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10363;
})()
;
cljs.core.PersistentHashSet.prototype.apply = (function (this_sym10335,args10336){
var this__10350 = this;
return this_sym10335.call.apply(this_sym10335,[this_sym10335].concat(args10336.slice()));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__10351 = this;
return (new cljs.core.PersistentHashSet(this__10351.meta,cljs.core.assoc.call(null,this__10351.hash_map,o,null),null));
});
cljs.core.PersistentHashSet.prototype.toString = (function (){
var this__10352 = this;
var this__10353 = this;
return cljs.core.pr_str.call(null,this__10353);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10354 = this;
return cljs.core.keys.call(null,this__10354.hash_map);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__10355 = this;
return (new cljs.core.PersistentHashSet(this__10355.meta,cljs.core.dissoc.call(null,this__10355.hash_map,v),null));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10356 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10357 = this;
var and__3822__auto____10358 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____10358)
{var and__3822__auto____10359 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____10359)
{return cljs.core.every_QMARK_.call(null,(function (p1__10334_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__10334_SHARP_);
}),other);
} else
{return and__3822__auto____10359;
}
} else
{return and__3822__auto____10358;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10360 = this;
return (new cljs.core.PersistentHashSet(meta,this__10360.hash_map,this__10360.__hash));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10361 = this;
return this__10361.meta;
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10362 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentHashSet.EMPTY,this__10362.meta);
});
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = (new cljs.core.PersistentHashSet(null,cljs.core.hash_map.call(null),0));
cljs.core.PersistentHashSet.fromArray = (function (items){
var len__10364 = cljs.core.count.call(null,items);
var i__10365 = 0;
var out__10366 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if((i__10365 < len__10364))
{{
var G__10367 = (i__10365 + 1);
var G__10368 = cljs.core.conj_BANG_.call(null,out__10366,(items[i__10365]));
i__10365 = G__10367;
out__10366 = G__10368;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10366);
}
break;
}
});

/**
* @constructor
*/
cljs.core.TransientHashSet = (function (transient_map){
this.transient_map = transient_map;
this.cljs$lang$protocol_mask$partition0$ = 259;
this.cljs$lang$protocol_mask$partition1$ = 34;
})
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashSet");
});
cljs.core.TransientHashSet.prototype.call = (function() {
var G__10386 = null;
var G__10386__2 = (function (this_sym10372,k){
var this__10374 = this;
var this_sym10372__10375 = this;
var tcoll__10376 = this_sym10372__10375;
if((cljs.core._lookup.call(null,this__10374.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return null;
} else
{return k;
}
});
var G__10386__3 = (function (this_sym10373,k,not_found){
var this__10374 = this;
var this_sym10373__10377 = this;
var tcoll__10378 = this_sym10373__10377;
if((cljs.core._lookup.call(null,this__10374.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return k;
}
});
G__10386 = function(this_sym10373,k,not_found){
switch(arguments.length){
case 2:
return G__10386__2.call(this,this_sym10373,k);
case 3:
return G__10386__3.call(this,this_sym10373,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10386;
})()
;
cljs.core.TransientHashSet.prototype.apply = (function (this_sym10370,args10371){
var this__10379 = this;
return this_sym10370.call.apply(this_sym10370,[this_sym10370].concat(args10371.slice()));
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,v){
var this__10380 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,v,null);
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,v,not_found){
var this__10381 = this;
if((cljs.core._lookup.call(null,this__10381.transient_map,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return v;
}
});
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__10382 = this;
return cljs.core.count.call(null,this__10382.transient_map);
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = (function (tcoll,v){
var this__10383 = this;
this__10383.transient_map = cljs.core.dissoc_BANG_.call(null,this__10383.transient_map,v);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__10384 = this;
this__10384.transient_map = cljs.core.assoc_BANG_.call(null,this__10384.transient_map,o,null);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__10385 = this;
return (new cljs.core.PersistentHashSet(null,cljs.core.persistent_BANG_.call(null,this__10385.transient_map),null));
});
cljs.core.TransientHashSet;

/**
* @constructor
*/
cljs.core.PersistentTreeSet = (function (meta,tree_map,__hash){
this.meta = meta;
this.tree_map = tree_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 417730831;
})
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeSet");
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__10389 = this;
var h__3049__auto____10390 = this__10389.__hash;
if(!((h__3049__auto____10390 == null)))
{return h__3049__auto____10390;
} else
{var h__3049__auto____10391 = cljs.core.hash_iset.call(null,coll);
this__10389.__hash = h__3049__auto____10391;
return h__3049__auto____10391;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__10392 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__10393 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__10393.tree_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentTreeSet.prototype.call = (function() {
var G__10419 = null;
var G__10419__2 = (function (this_sym10394,k){
var this__10396 = this;
var this_sym10394__10397 = this;
var coll__10398 = this_sym10394__10397;
return coll__10398.cljs$core$ILookup$_lookup$arity$2(coll__10398,k);
});
var G__10419__3 = (function (this_sym10395,k,not_found){
var this__10396 = this;
var this_sym10395__10399 = this;
var coll__10400 = this_sym10395__10399;
return coll__10400.cljs$core$ILookup$_lookup$arity$3(coll__10400,k,not_found);
});
G__10419 = function(this_sym10395,k,not_found){
switch(arguments.length){
case 2:
return G__10419__2.call(this,this_sym10395,k);
case 3:
return G__10419__3.call(this,this_sym10395,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__10419;
})()
;
cljs.core.PersistentTreeSet.prototype.apply = (function (this_sym10387,args10388){
var this__10401 = this;
return this_sym10387.call.apply(this_sym10387,[this_sym10387].concat(args10388.slice()));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__10402 = this;
return (new cljs.core.PersistentTreeSet(this__10402.meta,cljs.core.assoc.call(null,this__10402.tree_map,o,null),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__10403 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core.rseq.call(null,this__10403.tree_map));
});
cljs.core.PersistentTreeSet.prototype.toString = (function (){
var this__10404 = this;
var this__10405 = this;
return cljs.core.pr_str.call(null,this__10405);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__10406 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq.call(null,this__10406.tree_map,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__10407 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq_from.call(null,this__10407.tree_map,k,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__10408 = this;
return entry;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__10409 = this;
return cljs.core._comparator.call(null,this__10409.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__10410 = this;
return cljs.core.keys.call(null,this__10410.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__10411 = this;
return (new cljs.core.PersistentTreeSet(this__10411.meta,cljs.core.dissoc.call(null,this__10411.tree_map,v),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__10412 = this;
return cljs.core.count.call(null,this__10412.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__10413 = this;
var and__3822__auto____10414 = cljs.core.set_QMARK_.call(null,other);
if(and__3822__auto____10414)
{var and__3822__auto____10415 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3822__auto____10415)
{return cljs.core.every_QMARK_.call(null,(function (p1__10369_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__10369_SHARP_);
}),other);
} else
{return and__3822__auto____10415;
}
} else
{return and__3822__auto____10414;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__10416 = this;
return (new cljs.core.PersistentTreeSet(meta,this__10416.tree_map,this__10416.__hash));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__10417 = this;
return this__10417.meta;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__10418 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeSet.EMPTY,this__10418.meta);
});
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = (new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map.call(null),0));
/**
* @param {...*} var_args
*/
cljs.core.hash_set = (function() {
var hash_set = null;
var hash_set__0 = (function (){
return cljs.core.PersistentHashSet.EMPTY;
});
var hash_set__1 = (function() { 
var G__10424__delegate = function (keys){
var in__10422 = cljs.core.seq.call(null,keys);
var out__10423 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if(cljs.core.seq.call(null,in__10422))
{{
var G__10425 = cljs.core.next.call(null,in__10422);
var G__10426 = cljs.core.conj_BANG_.call(null,out__10423,cljs.core.first.call(null,in__10422));
in__10422 = G__10425;
out__10423 = G__10426;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__10423);
}
break;
}
};
var G__10424 = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__10424__delegate.call(this, keys);
};
G__10424.cljs$lang$maxFixedArity = 0;
G__10424.cljs$lang$applyTo = (function (arglist__10427){
var keys = cljs.core.seq(arglist__10427);;
return G__10424__delegate(keys);
});
G__10424.cljs$lang$arity$variadic = G__10424__delegate;
return G__10424;
})()
;
hash_set = function(var_args){
var keys = var_args;
switch(arguments.length){
case 0:
return hash_set__0.call(this);
default:
return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
hash_set.cljs$lang$maxFixedArity = 0;
hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
hash_set.cljs$lang$arity$0 = hash_set__0;
hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
return hash_set;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
return cljs.core.apply.call(null,cljs.core.hash_set,coll);
});
/**
* Returns a new sorted set with supplied keys.
* @param {...*} var_args
*/
cljs.core.sorted_set = (function() { 
var sorted_set__delegate = function (keys){
return cljs.core.reduce.call(null,cljs.core._conj,cljs.core.PersistentTreeSet.EMPTY,keys);
};
var sorted_set = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_set__delegate.call(this, keys);
};
sorted_set.cljs$lang$maxFixedArity = 0;
sorted_set.cljs$lang$applyTo = (function (arglist__10428){
var keys = cljs.core.seq(arglist__10428);;
return sorted_set__delegate(keys);
});
sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
return sorted_set;
})()
;
/**
* Returns a new sorted set with supplied keys, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_set_by = (function() { 
var sorted_set_by__delegate = function (comparator,keys){
return cljs.core.reduce.call(null,cljs.core._conj,(new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map_by.call(null,comparator),0)),keys);
};
var sorted_set_by = function (comparator,var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_set_by__delegate.call(this, comparator, keys);
};
sorted_set_by.cljs$lang$maxFixedArity = 1;
sorted_set_by.cljs$lang$applyTo = (function (arglist__10430){
var comparator = cljs.core.first(arglist__10430);
var keys = cljs.core.rest(arglist__10430);
return sorted_set_by__delegate(comparator, keys);
});
sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
return sorted_set_by;
})()
;
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.vector_QMARK_.call(null,coll))
{var n__10436 = cljs.core.count.call(null,coll);
return cljs.core.reduce.call(null,(function (v,i){
var temp__3971__auto____10437 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));
if(cljs.core.truth_(temp__3971__auto____10437))
{var e__10438 = temp__3971__auto____10437;
return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__10438));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__10436,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__10429_SHARP_){
var temp__3971__auto____10439 = cljs.core.find.call(null,smap,p1__10429_SHARP_);
if(cljs.core.truth_(temp__3971__auto____10439))
{var e__10440 = temp__3971__auto____10439;
return cljs.core.second.call(null,e__10440);
} else
{return p1__10429_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__10470 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__10463,seen){
while(true){
var vec__10464__10465 = p__10463;
var f__10466 = cljs.core.nth.call(null,vec__10464__10465,0,null);
var xs__10467 = vec__10464__10465;
var temp__3974__auto____10468 = cljs.core.seq.call(null,xs__10467);
if(temp__3974__auto____10468)
{var s__10469 = temp__3974__auto____10468;
if(cljs.core.contains_QMARK_.call(null,seen,f__10466))
{{
var G__10471 = cljs.core.rest.call(null,s__10469);
var G__10472 = seen;
p__10463 = G__10471;
seen = G__10472;
continue;
}
} else
{return cljs.core.cons.call(null,f__10466,step.call(null,cljs.core.rest.call(null,s__10469),cljs.core.conj.call(null,seen,f__10466)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
}),null));
});
return step__10470.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});
cljs.core.butlast = (function butlast(s){
var ret__10475 = cljs.core.PersistentVector.EMPTY;
var s__10476 = s;
while(true){
if(cljs.core.next.call(null,s__10476))
{{
var G__10477 = cljs.core.conj.call(null,ret__10475,cljs.core.first.call(null,s__10476));
var G__10478 = cljs.core.next.call(null,s__10476);
ret__10475 = G__10477;
s__10476 = G__10478;
continue;
}
} else
{return cljs.core.seq.call(null,ret__10475);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.string_QMARK_.call(null,x))
{return x;
} else
{if((function (){var or__3824__auto____10481 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____10481)
{return or__3824__auto____10481;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__10482 = x.lastIndexOf("/");
if((i__10482 < 0))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__10482 + 1));
}
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Doesn't support name: "),cljs.core.str(x)].join('')));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if((function (){var or__3824__auto____10485 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3824__auto____10485)
{return or__3824__auto____10485;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__10486 = x.lastIndexOf("/");
if((i__10486 > -1))
{return cljs.core.subs.call(null,x,2,i__10486);
} else
{return null;
}
} else
{throw (new Error([cljs.core.str("Doesn't support namespace: "),cljs.core.str(x)].join('')));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__10493 = cljs.core.ObjMap.EMPTY;
var ks__10494 = cljs.core.seq.call(null,keys);
var vs__10495 = cljs.core.seq.call(null,vals);
while(true){
if((function (){var and__3822__auto____10496 = ks__10494;
if(and__3822__auto____10496)
{return vs__10495;
} else
{return and__3822__auto____10496;
}
})())
{{
var G__10497 = cljs.core.assoc.call(null,map__10493,cljs.core.first.call(null,ks__10494),cljs.core.first.call(null,vs__10495));
var G__10498 = cljs.core.next.call(null,ks__10494);
var G__10499 = cljs.core.next.call(null,vs__10495);
map__10493 = G__10497;
ks__10494 = G__10498;
vs__10495 = G__10499;
continue;
}
} else
{return map__10493;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__2 = (function (k,x){
return x;
});
var max_key__3 = (function (k,x,y){
if((k.call(null,x) > k.call(null,y)))
{return x;
} else
{return y;
}
});
var max_key__4 = (function() { 
var G__10502__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__10487_SHARP_,p2__10488_SHARP_){
return max_key.call(null,k,p1__10487_SHARP_,p2__10488_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__10502 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10502__delegate.call(this, k, x, y, more);
};
G__10502.cljs$lang$maxFixedArity = 3;
G__10502.cljs$lang$applyTo = (function (arglist__10503){
var k = cljs.core.first(arglist__10503);
var x = cljs.core.first(cljs.core.next(arglist__10503));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10503)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10503)));
return G__10502__delegate(k, x, y, more);
});
G__10502.cljs$lang$arity$variadic = G__10502__delegate;
return G__10502;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return max_key__2.call(this,k,x);
case 3:
return max_key__3.call(this,k,x,y);
default:
return max_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
max_key.cljs$lang$arity$2 = max_key__2;
max_key.cljs$lang$arity$3 = max_key__3;
max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__2 = (function (k,x){
return x;
});
var min_key__3 = (function (k,x,y){
if((k.call(null,x) < k.call(null,y)))
{return x;
} else
{return y;
}
});
var min_key__4 = (function() { 
var G__10504__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__10500_SHARP_,p2__10501_SHARP_){
return min_key.call(null,k,p1__10500_SHARP_,p2__10501_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__10504 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10504__delegate.call(this, k, x, y, more);
};
G__10504.cljs$lang$maxFixedArity = 3;
G__10504.cljs$lang$applyTo = (function (arglist__10505){
var k = cljs.core.first(arglist__10505);
var x = cljs.core.first(cljs.core.next(arglist__10505));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10505)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10505)));
return G__10504__delegate(k, x, y, more);
});
G__10504.cljs$lang$arity$variadic = G__10504__delegate;
return G__10504;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return min_key__2.call(this,k,x);
case 3:
return min_key__3.call(this,k,x,y);
default:
return min_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
min_key.cljs$lang$arity$2 = min_key__2;
min_key.cljs$lang$arity$3 = min_key__3;
min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__2 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10508 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10508)
{var s__10509 = temp__3974__auto____10508;
return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__10509),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__10509)));
} else
{return null;
}
}),null));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case 2:
return partition_all__2.call(this,n,step);
case 3:
return partition_all__3.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition_all.cljs$lang$arity$2 = partition_all__2;
partition_all.cljs$lang$arity$3 = partition_all__3;
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10512 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10512)
{var s__10513 = temp__3974__auto____10512;
if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__10513))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__10513),take_while.call(null,pred,cljs.core.rest.call(null,s__10513)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
cljs.core.mk_bound_fn = (function mk_bound_fn(sc,test,key){
return (function (e){
var comp__10515 = cljs.core._comparator.call(null,sc);
return test.call(null,comp__10515.call(null,cljs.core._entry_key.call(null,sc,e),key),0);
});
});
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.subseq = (function() {
var subseq = null;
var subseq__3 = (function (sc,test,key){
var include__10527 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_,cljs.core._GT__EQ_]).call(null,test)))
{var temp__3974__auto____10528 = cljs.core._sorted_seq_from.call(null,sc,key,true);
if(cljs.core.truth_(temp__3974__auto____10528))
{var vec__10529__10530 = temp__3974__auto____10528;
var e__10531 = cljs.core.nth.call(null,vec__10529__10530,0,null);
var s__10532 = vec__10529__10530;
if(cljs.core.truth_(include__10527.call(null,e__10531)))
{return s__10532;
} else
{return cljs.core.next.call(null,s__10532);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__10527,cljs.core._sorted_seq.call(null,sc,true));
}
});
var subseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____10533 = cljs.core._sorted_seq_from.call(null,sc,start_key,true);
if(cljs.core.truth_(temp__3974__auto____10533))
{var vec__10534__10535 = temp__3974__auto____10533;
var e__10536 = cljs.core.nth.call(null,vec__10534__10535,0,null);
var s__10537 = vec__10534__10535;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,end_test,end_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,start_test,start_key).call(null,e__10536))?s__10537:cljs.core.next.call(null,s__10537)));
} else
{return null;
}
});
subseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return subseq__3.call(this,sc,start_test,start_key);
case 5:
return subseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
subseq.cljs$lang$arity$3 = subseq__3;
subseq.cljs$lang$arity$5 = subseq__5;
return subseq;
})()
;
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a reverse seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.rsubseq = (function() {
var rsubseq = null;
var rsubseq__3 = (function (sc,test,key){
var include__10549 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_,cljs.core._LT__EQ_]).call(null,test)))
{var temp__3974__auto____10550 = cljs.core._sorted_seq_from.call(null,sc,key,false);
if(cljs.core.truth_(temp__3974__auto____10550))
{var vec__10551__10552 = temp__3974__auto____10550;
var e__10553 = cljs.core.nth.call(null,vec__10551__10552,0,null);
var s__10554 = vec__10551__10552;
if(cljs.core.truth_(include__10549.call(null,e__10553)))
{return s__10554;
} else
{return cljs.core.next.call(null,s__10554);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__10549,cljs.core._sorted_seq.call(null,sc,false));
}
});
var rsubseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__3974__auto____10555 = cljs.core._sorted_seq_from.call(null,sc,end_key,false);
if(cljs.core.truth_(temp__3974__auto____10555))
{var vec__10556__10557 = temp__3974__auto____10555;
var e__10558 = cljs.core.nth.call(null,vec__10556__10557,0,null);
var s__10559 = vec__10556__10557;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,start_test,start_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,end_test,end_key).call(null,e__10558))?s__10559:cljs.core.next.call(null,s__10559)));
} else
{return null;
}
});
rsubseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return rsubseq__3.call(this,sc,start_test,start_key);
case 5:
return rsubseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
rsubseq.cljs$lang$arity$3 = rsubseq__3;
rsubseq.cljs$lang$arity$5 = rsubseq__5;
return rsubseq;
})()
;

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step,__hash){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32375006;
})
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Range");
});
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = (function (rng){
var this__10560 = this;
var h__3049__auto____10561 = this__10560.__hash;
if(!((h__3049__auto____10561 == null)))
{return h__3049__auto____10561;
} else
{var h__3049__auto____10562 = cljs.core.hash_coll.call(null,rng);
this__10560.__hash = h__3049__auto____10562;
return h__3049__auto____10562;
}
});
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = (function (rng){
var this__10563 = this;
if((this__10563.step > 0))
{if(((this__10563.start + this__10563.step) < this__10563.end))
{return (new cljs.core.Range(this__10563.meta,(this__10563.start + this__10563.step),this__10563.end,this__10563.step,null));
} else
{return null;
}
} else
{if(((this__10563.start + this__10563.step) > this__10563.end))
{return (new cljs.core.Range(this__10563.meta,(this__10563.start + this__10563.step),this__10563.end,this__10563.step,null));
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = (function (rng,o){
var this__10564 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.toString = (function (){
var this__10565 = this;
var this__10566 = this;
return cljs.core.pr_str.call(null,this__10566);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (rng,f){
var this__10567 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (rng,f,s){
var this__10568 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (rng){
var this__10569 = this;
if((this__10569.step > 0))
{if((this__10569.start < this__10569.end))
{return rng;
} else
{return null;
}
} else
{if((this__10569.start > this__10569.end))
{return rng;
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = (function (rng){
var this__10570 = this;
if(cljs.core.not.call(null,rng.cljs$core$ISeqable$_seq$arity$1(rng)))
{return 0;
} else
{return Math.ceil(((this__10570.end - this__10570.start) / this__10570.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = (function (rng){
var this__10571 = this;
return this__10571.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = (function (rng){
var this__10572 = this;
if(!((rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)))
{return (new cljs.core.Range(this__10572.meta,(this__10572.start + this__10572.step),this__10572.end,this__10572.step,null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (rng,other){
var this__10573 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (rng,meta){
var this__10574 = this;
return (new cljs.core.Range(meta,this__10574.start,this__10574.end,this__10574.step,this__10574.__hash));
});
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = (function (rng){
var this__10575 = this;
return this__10575.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (rng,n){
var this__10576 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__10576.start + (n * this__10576.step));
} else
{if((function (){var and__3822__auto____10577 = (this__10576.start > this__10576.end);
if(and__3822__auto____10577)
{return (this__10576.step === 0);
} else
{return and__3822__auto____10577;
}
})())
{return this__10576.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (rng,n,not_found){
var this__10578 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__10578.start + (n * this__10578.step));
} else
{if((function (){var and__3822__auto____10579 = (this__10578.start > this__10578.end);
if(and__3822__auto____10579)
{return (this__10578.step === 0);
} else
{return and__3822__auto____10579;
}
})())
{return this__10578.start;
} else
{return not_found;
}
}
});
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (rng){
var this__10580 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__10580.meta);
});
cljs.core.Range;
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__0 = (function (){
return range.call(null,0,Number.MAX_VALUE,1);
});
var range__1 = (function (end){
return range.call(null,0,end,1);
});
var range__2 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step,null));
});
range = function(start,end,step){
switch(arguments.length){
case 0:
return range__0.call(this);
case 1:
return range__1.call(this,start);
case 2:
return range__2.call(this,start,end);
case 3:
return range__3.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
range.cljs$lang$arity$0 = range__0;
range.cljs$lang$arity$1 = range__1;
range.cljs$lang$arity$2 = range__2;
range.cljs$lang$arity$3 = range__3;
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10583 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10583)
{var s__10584 = temp__3974__auto____10583;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__10584),take_nth.call(null,n,cljs.core.drop.call(null,n,s__10584)));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)], true);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10591 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10591)
{var s__10592 = temp__3974__auto____10591;
var fst__10593 = cljs.core.first.call(null,s__10592);
var fv__10594 = f.call(null,fst__10593);
var run__10595 = cljs.core.cons.call(null,fst__10593,cljs.core.take_while.call(null,(function (p1__10585_SHARP_){
return cljs.core._EQ_.call(null,fv__10594,f.call(null,p1__10585_SHARP_));
}),cljs.core.next.call(null,s__10592)));
return cljs.core.cons.call(null,run__10595,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__10595),s__10592))));
} else
{return null;
}
}),null));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc_BANG_.call(null,counts,x,(cljs.core._lookup.call(null,counts,x,0) + 1));
}),cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY),coll));
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3971__auto____10610 = cljs.core.seq.call(null,coll);
if(temp__3971__auto____10610)
{var s__10611 = temp__3971__auto____10610;
return reductions.call(null,f,cljs.core.first.call(null,s__10611),cljs.core.rest.call(null,s__10611));
} else
{return cljs.core.list.call(null,f.call(null));
}
}),null));
});
var reductions__3 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3974__auto____10612 = cljs.core.seq.call(null,coll);
if(temp__3974__auto____10612)
{var s__10613 = temp__3974__auto____10612;
return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__10613)),cljs.core.rest.call(null,s__10613));
} else
{return null;
}
}),null)));
});
reductions = function(f,init,coll){
switch(arguments.length){
case 2:
return reductions__2.call(this,f,init);
case 3:
return reductions__3.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reductions.cljs$lang$arity$2 = reductions__2;
reductions.cljs$lang$arity$3 = reductions__3;
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__1 = (function (f){
return (function() {
var G__10616 = null;
var G__10616__0 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__10616__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__10616__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__10616__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__10616__4 = (function() { 
var G__10617__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__10617 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10617__delegate.call(this, x, y, z, args);
};
G__10617.cljs$lang$maxFixedArity = 3;
G__10617.cljs$lang$applyTo = (function (arglist__10618){
var x = cljs.core.first(arglist__10618);
var y = cljs.core.first(cljs.core.next(arglist__10618));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10618)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10618)));
return G__10617__delegate(x, y, z, args);
});
G__10617.cljs$lang$arity$variadic = G__10617__delegate;
return G__10617;
})()
;
G__10616 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10616__0.call(this);
case 1:
return G__10616__1.call(this,x);
case 2:
return G__10616__2.call(this,x,y);
case 3:
return G__10616__3.call(this,x,y,z);
default:
return G__10616__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10616.cljs$lang$maxFixedArity = 3;
G__10616.cljs$lang$applyTo = G__10616__4.cljs$lang$applyTo;
return G__10616;
})()
});
var juxt__2 = (function (f,g){
return (function() {
var G__10619 = null;
var G__10619__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__10619__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__10619__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__10619__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__10619__4 = (function() { 
var G__10620__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__10620 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10620__delegate.call(this, x, y, z, args);
};
G__10620.cljs$lang$maxFixedArity = 3;
G__10620.cljs$lang$applyTo = (function (arglist__10621){
var x = cljs.core.first(arglist__10621);
var y = cljs.core.first(cljs.core.next(arglist__10621));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10621)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10621)));
return G__10620__delegate(x, y, z, args);
});
G__10620.cljs$lang$arity$variadic = G__10620__delegate;
return G__10620;
})()
;
G__10619 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10619__0.call(this);
case 1:
return G__10619__1.call(this,x);
case 2:
return G__10619__2.call(this,x,y);
case 3:
return G__10619__3.call(this,x,y,z);
default:
return G__10619__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10619.cljs$lang$maxFixedArity = 3;
G__10619.cljs$lang$applyTo = G__10619__4.cljs$lang$applyTo;
return G__10619;
})()
});
var juxt__3 = (function (f,g,h){
return (function() {
var G__10622 = null;
var G__10622__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__10622__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__10622__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__10622__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__10622__4 = (function() { 
var G__10623__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__10623 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10623__delegate.call(this, x, y, z, args);
};
G__10623.cljs$lang$maxFixedArity = 3;
G__10623.cljs$lang$applyTo = (function (arglist__10624){
var x = cljs.core.first(arglist__10624);
var y = cljs.core.first(cljs.core.next(arglist__10624));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10624)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10624)));
return G__10623__delegate(x, y, z, args);
});
G__10623.cljs$lang$arity$variadic = G__10623__delegate;
return G__10623;
})()
;
G__10622 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10622__0.call(this);
case 1:
return G__10622__1.call(this,x);
case 2:
return G__10622__2.call(this,x,y);
case 3:
return G__10622__3.call(this,x,y,z);
default:
return G__10622__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10622.cljs$lang$maxFixedArity = 3;
G__10622.cljs$lang$applyTo = G__10622__4.cljs$lang$applyTo;
return G__10622;
})()
});
var juxt__4 = (function() { 
var G__10625__delegate = function (f,g,h,fs){
var fs__10615 = cljs.core.list_STAR_.call(null,f,g,h,fs);
return (function() {
var G__10626 = null;
var G__10626__0 = (function (){
return cljs.core.reduce.call(null,(function (p1__10596_SHARP_,p2__10597_SHARP_){
return cljs.core.conj.call(null,p1__10596_SHARP_,p2__10597_SHARP_.call(null));
}),cljs.core.PersistentVector.EMPTY,fs__10615);
});
var G__10626__1 = (function (x){
return cljs.core.reduce.call(null,(function (p1__10598_SHARP_,p2__10599_SHARP_){
return cljs.core.conj.call(null,p1__10598_SHARP_,p2__10599_SHARP_.call(null,x));
}),cljs.core.PersistentVector.EMPTY,fs__10615);
});
var G__10626__2 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__10600_SHARP_,p2__10601_SHARP_){
return cljs.core.conj.call(null,p1__10600_SHARP_,p2__10601_SHARP_.call(null,x,y));
}),cljs.core.PersistentVector.EMPTY,fs__10615);
});
var G__10626__3 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__10602_SHARP_,p2__10603_SHARP_){
return cljs.core.conj.call(null,p1__10602_SHARP_,p2__10603_SHARP_.call(null,x,y,z));
}),cljs.core.PersistentVector.EMPTY,fs__10615);
});
var G__10626__4 = (function() { 
var G__10627__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__10604_SHARP_,p2__10605_SHARP_){
return cljs.core.conj.call(null,p1__10604_SHARP_,cljs.core.apply.call(null,p2__10605_SHARP_,x,y,z,args));
}),cljs.core.PersistentVector.EMPTY,fs__10615);
};
var G__10627 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10627__delegate.call(this, x, y, z, args);
};
G__10627.cljs$lang$maxFixedArity = 3;
G__10627.cljs$lang$applyTo = (function (arglist__10628){
var x = cljs.core.first(arglist__10628);
var y = cljs.core.first(cljs.core.next(arglist__10628));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10628)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10628)));
return G__10627__delegate(x, y, z, args);
});
G__10627.cljs$lang$arity$variadic = G__10627__delegate;
return G__10627;
})()
;
G__10626 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__10626__0.call(this);
case 1:
return G__10626__1.call(this,x);
case 2:
return G__10626__2.call(this,x,y);
case 3:
return G__10626__3.call(this,x,y,z);
default:
return G__10626__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__10626.cljs$lang$maxFixedArity = 3;
G__10626.cljs$lang$applyTo = G__10626__4.cljs$lang$applyTo;
return G__10626;
})()
};
var G__10625 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__10625__delegate.call(this, f, g, h, fs);
};
G__10625.cljs$lang$maxFixedArity = 3;
G__10625.cljs$lang$applyTo = (function (arglist__10629){
var f = cljs.core.first(arglist__10629);
var g = cljs.core.first(cljs.core.next(arglist__10629));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10629)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__10629)));
return G__10625__delegate(f, g, h, fs);
});
G__10625.cljs$lang$arity$variadic = G__10625__delegate;
return G__10625;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case 1:
return juxt__1.call(this,f);
case 2:
return juxt__2.call(this,f,g);
case 3:
return juxt__3.call(this,f,g,h);
default:
return juxt__4.cljs$lang$arity$variadic(f,g,h, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
juxt.cljs$lang$arity$1 = juxt__1;
juxt.cljs$lang$arity$2 = juxt__2;
juxt.cljs$lang$arity$3 = juxt__3;
juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__1 = (function (coll){
while(true){
if(cljs.core.seq.call(null,coll))
{{
var G__10632 = cljs.core.next.call(null,coll);
coll = G__10632;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__2 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3822__auto____10631 = cljs.core.seq.call(null,coll);
if(and__3822__auto____10631)
{return (n > 0);
} else
{return and__3822__auto____10631;
}
})()))
{{
var G__10633 = (n - 1);
var G__10634 = cljs.core.next.call(null,coll);
n = G__10633;
coll = G__10634;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case 1:
return dorun__1.call(this,n);
case 2:
return dorun__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
dorun.cljs$lang$arity$1 = dorun__1;
dorun.cljs$lang$arity$2 = dorun__2;
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__1 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__2 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case 1:
return doall__1.call(this,n);
case 2:
return doall__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
doall.cljs$lang$arity$1 = doall__1;
doall.cljs$lang$arity$2 = doall__2;
return doall;
})()
;
cljs.core.regexp_QMARK_ = (function regexp_QMARK_(o){
return o instanceof RegExp;
});
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__10636 = re.exec(s);
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__10636),s))
{if((cljs.core.count.call(null,matches__10636) === 1))
{return cljs.core.first.call(null,matches__10636);
} else
{return cljs.core.vec.call(null,matches__10636);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__10638 = re.exec(s);
if((matches__10638 == null))
{return null;
} else
{if((cljs.core.count.call(null,matches__10638) === 1))
{return cljs.core.first.call(null,matches__10638);
} else
{return cljs.core.vec.call(null,matches__10638);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__10643 = cljs.core.re_find.call(null,re,s);
var match_idx__10644 = s.search(re);
var match_str__10645 = ((cljs.core.coll_QMARK_.call(null,match_data__10643))?cljs.core.first.call(null,match_data__10643):match_data__10643);
var post_match__10646 = cljs.core.subs.call(null,s,(match_idx__10644 + cljs.core.count.call(null,match_str__10645)));
if(cljs.core.truth_(match_data__10643))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__10643,re_seq.call(null,re,post_match__10646));
}),null));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
var vec__10653__10654 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,s);
var ___10655 = cljs.core.nth.call(null,vec__10653__10654,0,null);
var flags__10656 = cljs.core.nth.call(null,vec__10653__10654,1,null);
var pattern__10657 = cljs.core.nth.call(null,vec__10653__10654,2,null);
return (new RegExp(pattern__10657,flags__10656));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([begin], true),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.PersistentVector.fromArray([sep], true),cljs.core.map.call(null,(function (p1__10647_SHARP_){
return print_one.call(null,p1__10647_SHARP_,opts);
}),coll))),cljs.core.PersistentVector.fromArray([end], true));
});
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});
cljs.core.pr_seq = (function pr_seq(obj,opts){
if((obj == null))
{return cljs.core.list.call(null,"nil");
} else
{if((void 0 === obj))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if("\uFDD0'else")
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3822__auto____10667 = cljs.core._lookup.call(null,opts,"\uFDD0'meta",null);
if(cljs.core.truth_(and__3822__auto____10667))
{var and__3822__auto____10671 = (function (){var G__10668__10669 = obj;
if(G__10668__10669)
{if((function (){var or__3824__auto____10670 = (G__10668__10669.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3824__auto____10670)
{return or__3824__auto____10670;
} else
{return G__10668__10669.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__10668__10669.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__10668__10669);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__10668__10669);
}
})();
if(cljs.core.truth_(and__3822__auto____10671))
{return cljs.core.meta.call(null,obj);
} else
{return and__3822__auto____10671;
}
} else
{return and__3822__auto____10667;
}
})())?cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["^"], true),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.PersistentVector.fromArray([" "], true)):null),(((function (){var and__3822__auto____10672 = !((obj == null));
if(and__3822__auto____10672)
{return obj.cljs$lang$type;
} else
{return and__3822__auto____10672;
}
})())?obj.cljs$lang$ctorPrSeq(obj):(((function (){var G__10673__10674 = obj;
if(G__10673__10674)
{if((function (){var or__3824__auto____10675 = (G__10673__10674.cljs$lang$protocol_mask$partition0$ & 536870912);
if(or__3824__auto____10675)
{return or__3824__auto____10675;
} else
{return G__10673__10674.cljs$core$IPrintable$;
}
})())
{return true;
} else
{if((!G__10673__10674.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__10673__10674);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__10673__10674);
}
})())?cljs.core._pr_seq.call(null,obj,opts):(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,obj))?cljs.core.list.call(null,"#\"",obj.source,"\""):(("\uFDD0'else")?cljs.core.list.call(null,"#<",[cljs.core.str(obj)].join(''),">"):null)))));
} else
{return null;
}
}
}
});
cljs.core.pr_sb = (function pr_sb(objs,opts){
var sb__10695 = (new goog.string.StringBuffer());
var G__10696__10697 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__10696__10697)
{var string__10698 = cljs.core.first.call(null,G__10696__10697);
var G__10696__10699 = G__10696__10697;
while(true){
sb__10695.append(string__10698);
var temp__3974__auto____10700 = cljs.core.next.call(null,G__10696__10699);
if(temp__3974__auto____10700)
{var G__10696__10701 = temp__3974__auto____10700;
{
var G__10714 = cljs.core.first.call(null,G__10696__10701);
var G__10715 = G__10696__10701;
string__10698 = G__10714;
G__10696__10699 = G__10715;
continue;
}
} else
{}
break;
}
} else
{}
var G__10702__10703 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__10702__10703)
{var obj__10704 = cljs.core.first.call(null,G__10702__10703);
var G__10702__10705 = G__10702__10703;
while(true){
sb__10695.append(" ");
var G__10706__10707 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__10704,opts));
if(G__10706__10707)
{var string__10708 = cljs.core.first.call(null,G__10706__10707);
var G__10706__10709 = G__10706__10707;
while(true){
sb__10695.append(string__10708);
var temp__3974__auto____10710 = cljs.core.next.call(null,G__10706__10709);
if(temp__3974__auto____10710)
{var G__10706__10711 = temp__3974__auto____10710;
{
var G__10716 = cljs.core.first.call(null,G__10706__10711);
var G__10717 = G__10706__10711;
string__10708 = G__10716;
G__10706__10709 = G__10717;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____10712 = cljs.core.next.call(null,G__10702__10705);
if(temp__3974__auto____10712)
{var G__10702__10713 = temp__3974__auto____10712;
{
var G__10718 = cljs.core.first.call(null,G__10702__10713);
var G__10719 = G__10702__10713;
obj__10704 = G__10718;
G__10702__10705 = G__10719;
continue;
}
} else
{}
break;
}
} else
{}
return sb__10695;
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
return [cljs.core.str(cljs.core.pr_sb.call(null,objs,opts))].join('');
});
/**
* Same as pr-str-with-opts followed by (newline)
*/
cljs.core.prn_str_with_opts = (function prn_str_with_opts(objs,opts){
var sb__10721 = cljs.core.pr_sb.call(null,objs,opts);
sb__10721.append("\n");
return [cljs.core.str(sb__10721)].join('');
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var G__10740__10741 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,cljs.core.first.call(null,objs),opts));
if(G__10740__10741)
{var string__10742 = cljs.core.first.call(null,G__10740__10741);
var G__10740__10743 = G__10740__10741;
while(true){
cljs.core.string_print.call(null,string__10742);
var temp__3974__auto____10744 = cljs.core.next.call(null,G__10740__10743);
if(temp__3974__auto____10744)
{var G__10740__10745 = temp__3974__auto____10744;
{
var G__10758 = cljs.core.first.call(null,G__10740__10745);
var G__10759 = G__10740__10745;
string__10742 = G__10758;
G__10740__10743 = G__10759;
continue;
}
} else
{}
break;
}
} else
{}
var G__10746__10747 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
if(G__10746__10747)
{var obj__10748 = cljs.core.first.call(null,G__10746__10747);
var G__10746__10749 = G__10746__10747;
while(true){
cljs.core.string_print.call(null," ");
var G__10750__10751 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__10748,opts));
if(G__10750__10751)
{var string__10752 = cljs.core.first.call(null,G__10750__10751);
var G__10750__10753 = G__10750__10751;
while(true){
cljs.core.string_print.call(null,string__10752);
var temp__3974__auto____10754 = cljs.core.next.call(null,G__10750__10753);
if(temp__3974__auto____10754)
{var G__10750__10755 = temp__3974__auto____10754;
{
var G__10760 = cljs.core.first.call(null,G__10750__10755);
var G__10761 = G__10750__10755;
string__10752 = G__10760;
G__10750__10753 = G__10761;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3974__auto____10756 = cljs.core.next.call(null,G__10746__10749);
if(temp__3974__auto____10756)
{var G__10746__10757 = temp__3974__auto____10756;
{
var G__10762 = cljs.core.first.call(null,G__10746__10757);
var G__10763 = G__10746__10757;
obj__10748 = G__10762;
G__10746__10749 = G__10763;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core._lookup.call(null,opts,"\uFDD0'flush-on-newline",null)))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["\uFDD0'flush-on-newline","\uFDD0'readably","\uFDD0'meta","\uFDD0'dup"],{"\uFDD0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"\uFDD0'readably":cljs.core._STAR_print_readably_STAR_,"\uFDD0'meta":cljs.core._STAR_print_meta_STAR_,"\uFDD0'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__10764){
var objs = cljs.core.seq(arglist__10764);;
return pr_str__delegate(objs);
});
pr_str.cljs$lang$arity$variadic = pr_str__delegate;
return pr_str;
})()
;
/**
* Same as pr-str followed by (newline)
* @param {...*} var_args
*/
cljs.core.prn_str = (function() { 
var prn_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var prn_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn_str__delegate.call(this, objs);
};
prn_str.cljs$lang$maxFixedArity = 0;
prn_str.cljs$lang$applyTo = (function (arglist__10765){
var objs = cljs.core.seq(arglist__10765);;
return prn_str__delegate(objs);
});
prn_str.cljs$lang$arity$variadic = prn_str__delegate;
return prn_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__10766){
var objs = cljs.core.seq(arglist__10766);;
return pr__delegate(objs);
});
pr.cljs$lang$arity$variadic = pr__delegate;
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__10767){
var objs = cljs.core.seq(arglist__10767);;
return cljs_core_print__delegate(objs);
});
cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
return cljs_core_print;
})()
;
/**
* print to a string, returning it
* @param {...*} var_args
*/
cljs.core.print_str = (function() { 
var print_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var print_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return print_str__delegate.call(this, objs);
};
print_str.cljs$lang$maxFixedArity = 0;
print_str.cljs$lang$applyTo = (function (arglist__10768){
var objs = cljs.core.seq(arglist__10768);;
return print_str__delegate(objs);
});
print_str.cljs$lang$arity$variadic = print_str__delegate;
return print_str;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__10769){
var objs = cljs.core.seq(arglist__10769);;
return println__delegate(objs);
});
println.cljs$lang$arity$variadic = println__delegate;
return println;
})()
;
/**
* println to a string, returning it
* @param {...*} var_args
*/
cljs.core.println_str = (function() { 
var println_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var println_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println_str__delegate.call(this, objs);
};
println_str.cljs$lang$maxFixedArity = 0;
println_str.cljs$lang$applyTo = (function (arglist__10770){
var objs = cljs.core.seq(arglist__10770);;
return println_str__delegate(objs);
});
println_str.cljs$lang$arity$variadic = println_str__delegate;
return println_str;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__10771){
var objs = cljs.core.seq(arglist__10771);;
return prn__delegate(objs);
});
prn.cljs$lang$arity$variadic = prn__delegate;
return prn;
})()
;
/**
* Prints formatted output, as per format
* @param {...*} var_args
*/
cljs.core.printf = (function() { 
var printf__delegate = function (fmt,args){
return cljs.core.print.call(null,cljs.core.apply.call(null,cljs.core.format,fmt,args));
};
var printf = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return printf__delegate.call(this, fmt, args);
};
printf.cljs$lang$maxFixedArity = 1;
printf.cljs$lang$applyTo = (function (arglist__10772){
var fmt = cljs.core.first(arglist__10772);
var args = cljs.core.rest(arglist__10772);
return printf__delegate(fmt, args);
});
printf.cljs$lang$arity$variadic = printf__delegate;
return printf;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10773 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10773,"{",", ","}",opts,coll);
});
(cljs.core.IPrintable["number"] = true);
(cljs.core._pr_seq["number"] = (function (n,opts){
return cljs.core.list.call(null,[cljs.core.str(n)].join(''));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10774 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10774,"{",", ","}",opts,coll);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10775 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10775,"{",", ","}",opts,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#queue ["," ","]",opts,cljs.core.seq.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintable["boolean"] = true);
(cljs.core._pr_seq["boolean"] = (function (bool,opts){
return cljs.core.list.call(null,[cljs.core.str(bool)].join(''));
}));
(cljs.core.IPrintable["string"] = true);
(cljs.core._pr_seq["string"] = (function (obj,opts){
if(cljs.core.keyword_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str(":"),cljs.core.str((function (){var temp__3974__auto____10776 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____10776))
{var nspc__10777 = temp__3974__auto____10776;
return [cljs.core.str(nspc__10777),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if(cljs.core.symbol_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str((function (){var temp__3974__auto____10778 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__3974__auto____10778))
{var nspc__10779 = temp__3974__auto____10778;
return [cljs.core.str(nspc__10779),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'readably")).call(null,opts))?goog.string.quote(obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10780 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10780,"{",", ","}",opts,coll);
});
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["array"] = true);
(cljs.core._pr_seq["array"] = (function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
(cljs.core.IPrintable["function"] = true);
(cljs.core._pr_seq["function"] = (function (this$){
return cljs.core.list.call(null,"#<",[cljs.core.str(this$)].join(''),">");
}));
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (d,_){
var normalize__10782 = (function (n,len){
var ns__10781 = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns__10781) < len))
{{
var G__10784 = [cljs.core.str("0"),cljs.core.str(ns__10781)].join('');
ns__10781 = G__10784;
continue;
}
} else
{return ns__10781;
}
break;
}
});
return cljs.core.list.call(null,[cljs.core.str("#inst \""),cljs.core.str(d.getUTCFullYear()),cljs.core.str("-"),cljs.core.str(normalize__10782.call(null,(d.getUTCMonth() + 1),2)),cljs.core.str("-"),cljs.core.str(normalize__10782.call(null,d.getUTCDate(),2)),cljs.core.str("T"),cljs.core.str(normalize__10782.call(null,d.getUTCHours(),2)),cljs.core.str(":"),cljs.core.str(normalize__10782.call(null,d.getUTCMinutes(),2)),cljs.core.str(":"),cljs.core.str(normalize__10782.call(null,d.getUTCSeconds(),2)),cljs.core.str("."),cljs.core.str(normalize__10782.call(null,d.getUTCMilliseconds(),3)),cljs.core.str("-"),cljs.core.str("00:00\"")].join(''));
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__10783 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__10783,"{",", ","}",opts,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = (function (x,y){
return cljs.core.compare_indexed.call(null,x,y);
});

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2690809856;
})
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Atom");
});
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10785 = this;
return goog.getUid(this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var this__10786 = this;
var G__10787__10788 = cljs.core.seq.call(null,this__10786.watches);
if(G__10787__10788)
{var G__10790__10792 = cljs.core.first.call(null,G__10787__10788);
var vec__10791__10793 = G__10790__10792;
var key__10794 = cljs.core.nth.call(null,vec__10791__10793,0,null);
var f__10795 = cljs.core.nth.call(null,vec__10791__10793,1,null);
var G__10787__10796 = G__10787__10788;
var G__10790__10797 = G__10790__10792;
var G__10787__10798 = G__10787__10796;
while(true){
var vec__10799__10800 = G__10790__10797;
var key__10801 = cljs.core.nth.call(null,vec__10799__10800,0,null);
var f__10802 = cljs.core.nth.call(null,vec__10799__10800,1,null);
var G__10787__10803 = G__10787__10798;
f__10802.call(null,key__10801,this$,oldval,newval);
var temp__3974__auto____10804 = cljs.core.next.call(null,G__10787__10803);
if(temp__3974__auto____10804)
{var G__10787__10805 = temp__3974__auto____10804;
{
var G__10812 = cljs.core.first.call(null,G__10787__10805);
var G__10813 = G__10787__10805;
G__10790__10797 = G__10812;
G__10787__10798 = G__10813;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var this__10806 = this;
return this$.watches = cljs.core.assoc.call(null,this__10806.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var this__10807 = this;
return this$.watches = cljs.core.dissoc.call(null,this__10807.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (a,opts){
var this__10808 = this;
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["#<Atom: "], true),cljs.core._pr_seq.call(null,this__10808.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var this__10809 = this;
return this__10809.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__10810 = this;
return this__10810.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__10811 = this;
return (o === other);
});
cljs.core.Atom;
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__1 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__2 = (function() { 
var G__10825__delegate = function (x,p__10814){
var map__10820__10821 = p__10814;
var map__10820__10822 = ((cljs.core.seq_QMARK_.call(null,map__10820__10821))?cljs.core.apply.call(null,cljs.core.hash_map,map__10820__10821):map__10820__10821);
var validator__10823 = cljs.core._lookup.call(null,map__10820__10822,"\uFDD0'validator",null);
var meta__10824 = cljs.core._lookup.call(null,map__10820__10822,"\uFDD0'meta",null);
return (new cljs.core.Atom(x,meta__10824,validator__10823,null));
};
var G__10825 = function (x,var_args){
var p__10814 = null;
if (goog.isDef(var_args)) {
  p__10814 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10825__delegate.call(this, x, p__10814);
};
G__10825.cljs$lang$maxFixedArity = 1;
G__10825.cljs$lang$applyTo = (function (arglist__10826){
var x = cljs.core.first(arglist__10826);
var p__10814 = cljs.core.rest(arglist__10826);
return G__10825__delegate(x, p__10814);
});
G__10825.cljs$lang$arity$variadic = G__10825__delegate;
return G__10825;
})()
;
atom = function(x,var_args){
var p__10814 = var_args;
switch(arguments.length){
case 1:
return atom__1.call(this,x);
default:
return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
atom.cljs$lang$arity$1 = atom__1;
atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3974__auto____10830 = a.validator;
if(cljs.core.truth_(temp__3974__auto____10830))
{var validate__10831 = temp__3974__auto____10830;
if(cljs.core.truth_(validate__10831.call(null,new_value)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Validator rejected reference state"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'validate","\uFDD1'new-value"),cljs.core.hash_map("\uFDD0'line",6440))))].join('')));
}
} else
{}
var old_value__10832 = a.state;
a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__10832,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___2 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___3 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___5 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___6 = (function() { 
var G__10833__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__10833 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__10833__delegate.call(this, a, f, x, y, z, more);
};
G__10833.cljs$lang$maxFixedArity = 5;
G__10833.cljs$lang$applyTo = (function (arglist__10834){
var a = cljs.core.first(arglist__10834);
var f = cljs.core.first(cljs.core.next(arglist__10834));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__10834)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10834))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10834)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__10834)))));
return G__10833__delegate(a, f, x, y, z, more);
});
G__10833.cljs$lang$arity$variadic = G__10833__delegate;
return G__10833;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return swap_BANG___2.call(this,a,f);
case 3:
return swap_BANG___3.call(this,a,f,x);
case 4:
return swap_BANG___4.call(this,a,f,x,y);
case 5:
return swap_BANG___5.call(this,a,f,x,y,z);
default:
return swap_BANG___6.cljs$lang$arity$variadic(a,f,x,y,z, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core._EQ_.call(null,a.state,oldval))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__10835){
var iref = cljs.core.first(arglist__10835);
var f = cljs.core.first(cljs.core.next(arglist__10835));
var args = cljs.core.rest(cljs.core.next(arglist__10835));
return alter_meta_BANG___delegate(iref, f, args);
});
alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__0 = (function (){
return gensym.call(null,"G__");
});
var gensym__1 = (function (prefix_string){
if((cljs.core.gensym_counter == null))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,[cljs.core.str(prefix_string),cljs.core.str(cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc))].join(''));
});
gensym = function(prefix_string){
switch(arguments.length){
case 0:
return gensym__0.call(this);
case 1:
return gensym__1.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
gensym.cljs$lang$arity$0 = gensym__0;
gensym.cljs$lang$arity$1 = gensym__1;
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

/**
* @constructor
*/
cljs.core.Delay = (function (state,f){
this.state = state;
this.f = f;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1073774592;
})
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/Delay");
});
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = (function (d){
var this__10836 = this;
return (new cljs.core.Keyword("\uFDD0'done")).call(null,cljs.core.deref.call(null,this__10836.state));
});
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__10837 = this;
return (new cljs.core.Keyword("\uFDD0'value")).call(null,cljs.core.swap_BANG_.call(null,this__10837.state,(function (p__10838){
var map__10839__10840 = p__10838;
var map__10839__10841 = ((cljs.core.seq_QMARK_.call(null,map__10839__10840))?cljs.core.apply.call(null,cljs.core.hash_map,map__10839__10840):map__10839__10840);
var curr_state__10842 = map__10839__10841;
var done__10843 = cljs.core._lookup.call(null,map__10839__10841,"\uFDD0'done",null);
if(cljs.core.truth_(done__10843))
{return curr_state__10842;
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":true,"\uFDD0'value":this__10837.f.call(null)});
}
})));
});
cljs.core.Delay;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.delay_QMARK_.call(null,x))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__10864__10865 = options;
var map__10864__10866 = ((cljs.core.seq_QMARK_.call(null,map__10864__10865))?cljs.core.apply.call(null,cljs.core.hash_map,map__10864__10865):map__10864__10865);
var keywordize_keys__10867 = cljs.core._lookup.call(null,map__10864__10866,"\uFDD0'keywordize-keys",null);
var keyfn__10868 = (cljs.core.truth_(keywordize_keys__10867)?cljs.core.keyword:cljs.core.str);
var f__10883 = (function thisfn(x){
if(cljs.core.seq_QMARK_.call(null,x))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.coll_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray(x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if((cljs.core.type.call(null,x) === Object))
{return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,(function (){var iter__3319__auto____10882 = (function iter__10876(s__10877){
return (new cljs.core.LazySeq(null,false,(function (){
var s__10877__10880 = s__10877;
while(true){
if(cljs.core.seq.call(null,s__10877__10880))
{var k__10881 = cljs.core.first.call(null,s__10877__10880);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([keyfn__10868.call(null,k__10881),thisfn.call(null,(x[k__10881]))], true),iter__10876.call(null,cljs.core.rest.call(null,s__10877__10880)));
} else
{return null;
}
break;
}
}),null));
});
return iter__3319__auto____10882.call(null,cljs.core.js_keys.call(null,x));
})());
} else
{if("\uFDD0'else")
{return x;
} else
{return null;
}
}
}
}
}
});
return f__10883.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__10884){
var x = cljs.core.first(arglist__10884);
var options = cljs.core.rest(arglist__10884);
return js__GT_clj__delegate(x, options);
});
js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__10889 = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
return (function() { 
var G__10893__delegate = function (args){
var temp__3971__auto____10890 = cljs.core._lookup.call(null,cljs.core.deref.call(null,mem__10889),args,null);
if(cljs.core.truth_(temp__3971__auto____10890))
{var v__10891 = temp__3971__auto____10890;
return v__10891;
} else
{var ret__10892 = cljs.core.apply.call(null,f,args);
cljs.core.swap_BANG_.call(null,mem__10889,cljs.core.assoc,args,ret__10892);
return ret__10892;
}
};
var G__10893 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__10893__delegate.call(this, args);
};
G__10893.cljs$lang$maxFixedArity = 0;
G__10893.cljs$lang$applyTo = (function (arglist__10894){
var args = cljs.core.seq(arglist__10894);;
return G__10893__delegate(args);
});
G__10893.cljs$lang$arity$variadic = G__10893__delegate;
return G__10893;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__1 = (function (f){
while(true){
var ret__10896 = f.call(null);
if(cljs.core.fn_QMARK_.call(null,ret__10896))
{{
var G__10897 = ret__10896;
f = G__10897;
continue;
}
} else
{return ret__10896;
}
break;
}
});
var trampoline__2 = (function() { 
var G__10898__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__10898 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10898__delegate.call(this, f, args);
};
G__10898.cljs$lang$maxFixedArity = 1;
G__10898.cljs$lang$applyTo = (function (arglist__10899){
var f = cljs.core.first(arglist__10899);
var args = cljs.core.rest(arglist__10899);
return G__10898__delegate(f, args);
});
G__10898.cljs$lang$arity$variadic = G__10898__delegate;
return G__10898;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case 1:
return trampoline__1.call(this,f);
default:
return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
trampoline.cljs$lang$arity$1 = trampoline__1;
trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return rand.call(null,1);
});
var rand__1 = (function (n){
return (Math.random.call(null) * n);
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor.call(null,(Math.random.call(null) * n));
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__10901 = f.call(null,x);
return cljs.core.assoc.call(null,ret,k__10901,cljs.core.conj.call(null,cljs.core._lookup.call(null,ret,k__10901,cljs.core.PersistentVector.EMPTY),x));
}),cljs.core.ObjMap.EMPTY,coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'descendants","\uFDD0'ancestors"],{"\uFDD0'parents":cljs.core.ObjMap.EMPTY,"\uFDD0'descendants":cljs.core.ObjMap.EMPTY,"\uFDD0'ancestors":cljs.core.ObjMap.EMPTY});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a JavaScript type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___2 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___3 = (function (h,child,parent){
var or__3824__auto____10910 = cljs.core._EQ_.call(null,child,parent);
if(or__3824__auto____10910)
{return or__3824__auto____10910;
} else
{var or__3824__auto____10911 = cljs.core.contains_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h).call(null,child),parent);
if(or__3824__auto____10911)
{return or__3824__auto____10911;
} else
{var and__3822__auto____10912 = cljs.core.vector_QMARK_.call(null,parent);
if(and__3822__auto____10912)
{var and__3822__auto____10913 = cljs.core.vector_QMARK_.call(null,child);
if(and__3822__auto____10913)
{var and__3822__auto____10914 = (cljs.core.count.call(null,parent) === cljs.core.count.call(null,child));
if(and__3822__auto____10914)
{var ret__10915 = true;
var i__10916 = 0;
while(true){
if((function (){var or__3824__auto____10917 = cljs.core.not.call(null,ret__10915);
if(or__3824__auto____10917)
{return or__3824__auto____10917;
} else
{return (i__10916 === cljs.core.count.call(null,parent));
}
})())
{return ret__10915;
} else
{{
var G__10918 = isa_QMARK_.call(null,h,child.call(null,i__10916),parent.call(null,i__10916));
var G__10919 = (i__10916 + 1);
ret__10915 = G__10918;
i__10916 = G__10919;
continue;
}
}
break;
}
} else
{return and__3822__auto____10914;
}
} else
{return and__3822__auto____10913;
}
} else
{return and__3822__auto____10912;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case 2:
return isa_QMARK___2.call(this,h,child);
case 3:
return isa_QMARK___3.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__1 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,null));
});
parents = function(h,tag){
switch(arguments.length){
case 1:
return parents__1.call(this,h);
case 2:
return parents__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
parents.cljs$lang$arity$1 = parents__1;
parents.cljs$lang$arity$2 = parents__2;
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__1 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,null));
});
ancestors = function(h,tag){
switch(arguments.length){
case 1:
return ancestors__1.call(this,h);
case 2:
return ancestors__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
ancestors.cljs$lang$arity$1 = ancestors__1;
ancestors.cljs$lang$arity$2 = ancestors__2;
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on JavaScript type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__1 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),tag,null));
});
descendants = function(h,tag){
switch(arguments.length){
case 1:
return descendants__1.call(this,h);
case 2:
return descendants__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
descendants.cljs$lang$arity$1 = descendants__1;
descendants.cljs$lang$arity$2 = descendants__2;
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__2 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'namespace","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6724))))].join('')));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__3 = (function (h,tag,parent){
if(cljs.core.not_EQ_.call(null,tag,parent))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD1'tag","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6728))))].join('')));
}
var tp__10928 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var td__10929 = (new cljs.core.Keyword("\uFDD0'descendants")).call(null,h);
var ta__10930 = (new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h);
var tf__10931 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core._lookup.call(null,targets,k,cljs.core.PersistentHashSet.EMPTY),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});
var or__3824__auto____10932 = ((cljs.core.contains_QMARK_.call(null,tp__10928.call(null,tag),parent))?null:(function (){if(cljs.core.contains_QMARK_.call(null,ta__10930.call(null,tag),parent))
{throw (new Error([cljs.core.str(tag),cljs.core.str("already has"),cljs.core.str(parent),cljs.core.str("as ancestor")].join('')));
} else
{}
if(cljs.core.contains_QMARK_.call(null,ta__10930.call(null,parent),tag))
{throw (new Error([cljs.core.str("Cyclic derivation:"),cljs.core.str(parent),cljs.core.str("has"),cljs.core.str(tag),cljs.core.str("as ancestor")].join('')));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'ancestors","\uFDD0'descendants"],{"\uFDD0'parents":cljs.core.assoc.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,cljs.core.conj.call(null,cljs.core._lookup.call(null,tp__10928,tag,cljs.core.PersistentHashSet.EMPTY),parent)),"\uFDD0'ancestors":tf__10931.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,td__10929,parent,ta__10930),"\uFDD0'descendants":tf__10931.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),parent,ta__10930,tag,td__10929)});
})());
if(cljs.core.truth_(or__3824__auto____10932))
{return or__3824__auto____10932;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case 2:
return derive__2.call(this,h,tag);
case 3:
return derive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
derive.cljs$lang$arity$2 = derive__2;
derive.cljs$lang$arity$3 = derive__3;
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__2 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__3 = (function (h,tag,parent){
var parentMap__10937 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var childsParents__10938 = (cljs.core.truth_(parentMap__10937.call(null,tag))?cljs.core.disj.call(null,parentMap__10937.call(null,tag),parent):cljs.core.PersistentHashSet.EMPTY);
var newParents__10939 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__10938))?cljs.core.assoc.call(null,parentMap__10937,tag,childsParents__10938):cljs.core.dissoc.call(null,parentMap__10937,tag));
var deriv_seq__10940 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__10920_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__10920_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__10920_SHARP_),cljs.core.second.call(null,p1__10920_SHARP_)));
}),cljs.core.seq.call(null,newParents__10939)));
if(cljs.core.contains_QMARK_.call(null,parentMap__10937.call(null,tag),parent))
{return cljs.core.reduce.call(null,(function (p1__10921_SHARP_,p2__10922_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__10921_SHARP_,p2__10922_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__10940));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case 2:
return underive__2.call(this,h,tag);
case 3:
return underive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
underive.cljs$lang$arity$2 = underive__2;
underive.cljs$lang$arity$3 = underive__3;
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__10948 = cljs.core.deref.call(null,prefer_table).call(null,x);
var or__3824__auto____10950 = (cljs.core.truth_((function (){var and__3822__auto____10949 = xprefs__10948;
if(cljs.core.truth_(and__3822__auto____10949))
{return xprefs__10948.call(null,y);
} else
{return and__3822__auto____10949;
}
})())?true:null);
if(cljs.core.truth_(or__3824__auto____10950))
{return or__3824__auto____10950;
} else
{var or__3824__auto____10952 = (function (){var ps__10951 = cljs.core.parents.call(null,y);
while(true){
if((cljs.core.count.call(null,ps__10951) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__10951),prefer_table)))
{} else
{}
{
var G__10955 = cljs.core.rest.call(null,ps__10951);
ps__10951 = G__10955;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10952))
{return or__3824__auto____10952;
} else
{var or__3824__auto____10954 = (function (){var ps__10953 = cljs.core.parents.call(null,x);
while(true){
if((cljs.core.count.call(null,ps__10953) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__10953),y,prefer_table)))
{} else
{}
{
var G__10956 = cljs.core.rest.call(null,ps__10953);
ps__10953 = G__10956;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3824__auto____10954))
{return or__3824__auto____10954;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3824__auto____10958 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);
if(cljs.core.truth_(or__3824__auto____10958))
{return or__3824__auto____10958;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__10976 = cljs.core.reduce.call(null,(function (be,p__10968){
var vec__10969__10970 = p__10968;
var k__10971 = cljs.core.nth.call(null,vec__10969__10970,0,null);
var ___10972 = cljs.core.nth.call(null,vec__10969__10970,1,null);
var e__10973 = vec__10969__10970;
if(cljs.core.isa_QMARK_.call(null,dispatch_val,k__10971))
{var be2__10975 = (cljs.core.truth_((function (){var or__3824__auto____10974 = (be == null);
if(or__3824__auto____10974)
{return or__3824__auto____10974;
} else
{return cljs.core.dominates.call(null,k__10971,cljs.core.first.call(null,be),prefer_table);
}
})())?e__10973:be);
if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__10975),k__10971,prefer_table)))
{} else
{throw (new Error([cljs.core.str("Multiple methods in multimethod '"),cljs.core.str(name),cljs.core.str("' match dispatch value: "),cljs.core.str(dispatch_val),cljs.core.str(" -> "),cljs.core.str(k__10971),cljs.core.str(" and "),cljs.core.str(cljs.core.first.call(null,be2__10975)),cljs.core.str(", and neither is preferred")].join('')));
}
return be2__10975;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));
if(cljs.core.truth_(best_entry__10976))
{if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy)))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__10976));
return cljs.core.second.call(null,best_entry__10976);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if((function (){var and__3822__auto____10981 = mf;
if(and__3822__auto____10981)
{return mf.cljs$core$IMultiFn$_reset$arity$1;
} else
{return and__3822__auto____10981;
}
})())
{return mf.cljs$core$IMultiFn$_reset$arity$1(mf);
} else
{var x__3220__auto____10982 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10983 = (cljs.core._reset[goog.typeOf(x__3220__auto____10982)]);
if(or__3824__auto____10983)
{return or__3824__auto____10983;
} else
{var or__3824__auto____10984 = (cljs.core._reset["_"]);
if(or__3824__auto____10984)
{return or__3824__auto____10984;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if((function (){var and__3822__auto____10989 = mf;
if(and__3822__auto____10989)
{return mf.cljs$core$IMultiFn$_add_method$arity$3;
} else
{return and__3822__auto____10989;
}
})())
{return mf.cljs$core$IMultiFn$_add_method$arity$3(mf,dispatch_val,method);
} else
{var x__3220__auto____10990 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10991 = (cljs.core._add_method[goog.typeOf(x__3220__auto____10990)]);
if(or__3824__auto____10991)
{return or__3824__auto____10991;
} else
{var or__3824__auto____10992 = (cljs.core._add_method["_"]);
if(or__3824__auto____10992)
{return or__3824__auto____10992;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if((function (){var and__3822__auto____10997 = mf;
if(and__3822__auto____10997)
{return mf.cljs$core$IMultiFn$_remove_method$arity$2;
} else
{return and__3822__auto____10997;
}
})())
{return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf,dispatch_val);
} else
{var x__3220__auto____10998 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____10999 = (cljs.core._remove_method[goog.typeOf(x__3220__auto____10998)]);
if(or__3824__auto____10999)
{return or__3824__auto____10999;
} else
{var or__3824__auto____11000 = (cljs.core._remove_method["_"]);
if(or__3824__auto____11000)
{return or__3824__auto____11000;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if((function (){var and__3822__auto____11005 = mf;
if(and__3822__auto____11005)
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3;
} else
{return and__3822__auto____11005;
}
})())
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf,dispatch_val,dispatch_val_y);
} else
{var x__3220__auto____11006 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____11007 = (cljs.core._prefer_method[goog.typeOf(x__3220__auto____11006)]);
if(or__3824__auto____11007)
{return or__3824__auto____11007;
} else
{var or__3824__auto____11008 = (cljs.core._prefer_method["_"]);
if(or__3824__auto____11008)
{return or__3824__auto____11008;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if((function (){var and__3822__auto____11013 = mf;
if(and__3822__auto____11013)
{return mf.cljs$core$IMultiFn$_get_method$arity$2;
} else
{return and__3822__auto____11013;
}
})())
{return mf.cljs$core$IMultiFn$_get_method$arity$2(mf,dispatch_val);
} else
{var x__3220__auto____11014 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____11015 = (cljs.core._get_method[goog.typeOf(x__3220__auto____11014)]);
if(or__3824__auto____11015)
{return or__3824__auto____11015;
} else
{var or__3824__auto____11016 = (cljs.core._get_method["_"]);
if(or__3824__auto____11016)
{return or__3824__auto____11016;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if((function (){var and__3822__auto____11021 = mf;
if(and__3822__auto____11021)
{return mf.cljs$core$IMultiFn$_methods$arity$1;
} else
{return and__3822__auto____11021;
}
})())
{return mf.cljs$core$IMultiFn$_methods$arity$1(mf);
} else
{var x__3220__auto____11022 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____11023 = (cljs.core._methods[goog.typeOf(x__3220__auto____11022)]);
if(or__3824__auto____11023)
{return or__3824__auto____11023;
} else
{var or__3824__auto____11024 = (cljs.core._methods["_"]);
if(or__3824__auto____11024)
{return or__3824__auto____11024;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if((function (){var and__3822__auto____11029 = mf;
if(and__3822__auto____11029)
{return mf.cljs$core$IMultiFn$_prefers$arity$1;
} else
{return and__3822__auto____11029;
}
})())
{return mf.cljs$core$IMultiFn$_prefers$arity$1(mf);
} else
{var x__3220__auto____11030 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____11031 = (cljs.core._prefers[goog.typeOf(x__3220__auto____11030)]);
if(or__3824__auto____11031)
{return or__3824__auto____11031;
} else
{var or__3824__auto____11032 = (cljs.core._prefers["_"]);
if(or__3824__auto____11032)
{return or__3824__auto____11032;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._dispatch = (function _dispatch(mf,args){
if((function (){var and__3822__auto____11037 = mf;
if(and__3822__auto____11037)
{return mf.cljs$core$IMultiFn$_dispatch$arity$2;
} else
{return and__3822__auto____11037;
}
})())
{return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf,args);
} else
{var x__3220__auto____11038 = (((mf == null))?null:mf);
return (function (){var or__3824__auto____11039 = (cljs.core._dispatch[goog.typeOf(x__3220__auto____11038)]);
if(or__3824__auto____11039)
{return or__3824__auto____11039;
} else
{var or__3824__auto____11040 = (cljs.core._dispatch["_"]);
if(or__3824__auto____11040)
{return or__3824__auto____11040;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-dispatch",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_dispatch = (function do_dispatch(mf,dispatch_fn,args){
var dispatch_val__11043 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__11044 = cljs.core._get_method.call(null,mf,dispatch_val__11043);
if(cljs.core.truth_(target_fn__11044))
{} else
{throw (new Error([cljs.core.str("No method in multimethod '"),cljs.core.str(cljs.core.name),cljs.core.str("' for dispatch value: "),cljs.core.str(dispatch_val__11043)].join('')));
}
return cljs.core.apply.call(null,target_fn__11044,args);
});

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
this.cljs$lang$protocol_mask$partition0$ = 4194304;
this.cljs$lang$protocol_mask$partition1$ = 64;
})
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/MultiFn");
});
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__11045 = this;
return goog.getUid(this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = (function (mf){
var this__11046 = this;
cljs.core.swap_BANG_.call(null,this__11046.method_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__11046.method_cache,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__11046.prefer_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__11046.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = (function (mf,dispatch_val,method){
var this__11047 = this;
cljs.core.swap_BANG_.call(null,this__11047.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__11047.method_cache,this__11047.method_table,this__11047.cached_hierarchy,this__11047.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = (function (mf,dispatch_val){
var this__11048 = this;
cljs.core.swap_BANG_.call(null,this__11048.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__11048.method_cache,this__11048.method_table,this__11048.cached_hierarchy,this__11048.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = (function (mf,dispatch_val){
var this__11049 = this;
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__11049.cached_hierarchy),cljs.core.deref.call(null,this__11049.hierarchy)))
{} else
{cljs.core.reset_cache.call(null,this__11049.method_cache,this__11049.method_table,this__11049.cached_hierarchy,this__11049.hierarchy);
}
var temp__3971__auto____11050 = cljs.core.deref.call(null,this__11049.method_cache).call(null,dispatch_val);
if(cljs.core.truth_(temp__3971__auto____11050))
{var target_fn__11051 = temp__3971__auto____11050;
return target_fn__11051;
} else
{var temp__3971__auto____11052 = cljs.core.find_and_cache_best_method.call(null,this__11049.name,dispatch_val,this__11049.hierarchy,this__11049.method_table,this__11049.prefer_table,this__11049.method_cache,this__11049.cached_hierarchy);
if(cljs.core.truth_(temp__3971__auto____11052))
{var target_fn__11053 = temp__3971__auto____11052;
return target_fn__11053;
} else
{return cljs.core.deref.call(null,this__11049.method_table).call(null,this__11049.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = (function (mf,dispatch_val_x,dispatch_val_y){
var this__11054 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__11054.prefer_table)))
{throw (new Error([cljs.core.str("Preference conflict in multimethod '"),cljs.core.str(this__11054.name),cljs.core.str("': "),cljs.core.str(dispatch_val_y),cljs.core.str(" is already preferred to "),cljs.core.str(dispatch_val_x)].join('')));
} else
{}
cljs.core.swap_BANG_.call(null,this__11054.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core._lookup.call(null,old,dispatch_val_x,cljs.core.PersistentHashSet.EMPTY),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__11054.method_cache,this__11054.method_table,this__11054.cached_hierarchy,this__11054.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = (function (mf){
var this__11055 = this;
return cljs.core.deref.call(null,this__11055.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = (function (mf){
var this__11056 = this;
return cljs.core.deref.call(null,this__11056.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = (function (mf,args){
var this__11057 = this;
return cljs.core.do_dispatch.call(null,mf,this__11057.dispatch_fn,args);
});
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = (function() { 
var G__11059__delegate = function (_,args){
var self__11058 = this;
return cljs.core._dispatch.call(null,self__11058,args);
};
var G__11059 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__11059__delegate.call(this, _, args);
};
G__11059.cljs$lang$maxFixedArity = 1;
G__11059.cljs$lang$applyTo = (function (arglist__11060){
var _ = cljs.core.first(arglist__11060);
var args = cljs.core.rest(arglist__11060);
return G__11059__delegate(_, args);
});
G__11059.cljs$lang$arity$variadic = G__11059__delegate;
return G__11059;
})()
;
cljs.core.MultiFn.prototype.apply = (function (_,args){
var self__11061 = this;
return cljs.core._dispatch.call(null,self__11061,args);
});
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});

/**
* @constructor
*/
cljs.core.UUID = (function (uuid){
this.uuid = uuid;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 543162368;
})
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = (function (this__3166__auto__){
return cljs.core.list.call(null,"cljs.core/UUID");
});
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__11062 = this;
return goog.string.hashCode(cljs.core.pr_str.call(null,this$));
});
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (_11064,_){
var this__11063 = this;
return cljs.core.list.call(null,[cljs.core.str("#uuid \""),cljs.core.str(this__11063.uuid),cljs.core.str("\"")].join(''));
});
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var this__11065 = this;
var and__3822__auto____11066 = cljs.core.instance_QMARK_.call(null,cljs.core.UUID,other);
if(and__3822__auto____11066)
{return (this__11065.uuid === other.uuid);
} else
{return and__3822__auto____11066;
}
});
cljs.core.UUID.prototype.toString = (function (){
var this__11067 = this;
var this__11068 = this;
return cljs.core.pr_str.call(null,this__11068);
});
cljs.core.UUID;
