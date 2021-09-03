/*
 Highstock JS v9.2.2 (2021-09-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/aroon-oscillator",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,g,m,b){a.hasOwnProperty(g)||(a[g]=b.apply(null,m))}a=a?a._modules:{};e(a,"Mixins/MultipleLines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,
g){var m=g.defined,b=g.error,e=g.merge,h=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(k){var a=[];(this.pointArrayMap||[]).forEach(function(d){d!==k&&a.push("plot"+d.charAt(0).toUpperCase()+d.slice(1))});return a},toYData:function(k){var a=[];(this.pointArrayMap||[]).forEach(function(d){a.push(k[d])});return a},translate:function(){var a=this,b=a.pointArrayMap,d=[],f,l=a.modifyValue;d=a.getTranslatedLinesNames();
h.prototype.translate.apply(a,arguments);a.points.forEach(function(c){b.forEach(function(k,b){f=c[k];l&&(f=l.call(a,f));null!==f&&(c[d[b]]=a.yAxis.toPixels(f,!0))})})},drawGraph:function(){var a=this,g=a.linesApiNames,d=a.points,f=d.length,l=a.options,c=a.graph,r={options:{gapSize:l.gapSize}},p=[],n;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,c){for(p[c]=[];f--;)n=d[f],p[c].push({x:n.x,plotX:n.plotX,plotY:n[a],isNull:!m(n[a])});f=d.length});g.forEach(function(c,f){p[f]?(a.points=p[f],
l[c]?a.options=e(l[c].styles,r):b('Error: "There is no '+c+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+c],h.prototype.drawGraph.call(a),a["graph"+c]=a.graph):b('Error: "'+c+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=d;a.options=l;a.graph=c;h.prototype.drawGraph.call(a)}}});e(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],
function(a){var g=a.error;return{isParentLoaded:function(a,b,e,h,k){if(a)return h?h(a):!0;g(k||this.generateMessage(e,b));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});e(a,"Stock/Indicators/AroonOscillator/AroonOscillatorIndicator.js",[a["Mixins/MultipleLines.js"],a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,g,e,b){var m=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),h=e.seriesTypes.aroon,k=b.extend,q=b.merge,d=e.seriesTypes.aroon;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||
this;c.data=void 0;c.options=void 0;c.points=void 0;return c}m(b,a);b.prototype.getValues=function(a,b){var c=[],e=[],g=[];a=d.prototype.getValues.call(this,a,b);for(b=0;b<a.yData.length;b++){var f=a.yData[b][0];var h=a.yData[b][1];f-=h;c.push([a.xData[b],f]);e.push(a.xData[b]);g.push(f)}return{values:c,xData:e,yData:g}};b.prototype.init=function(){var a=arguments,b=this;g.isParentLoaded(d,"aroon",b.type,function(c){c.prototype.init.apply(b,a)})};b.defaultOptions=q(h.defaultOptions,{tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b>: {point.y}'}});
return b}(h);k(b.prototype,q(a,{nameBase:"Aroon Oscillator",pointArrayMap:["y"],pointValKey:"y",linesApiNames:[]}));e.registerSeriesType("aroonoscillator",b);"";return b});e(a,"masters/indicators/aroon-oscillator.src.js",[],function(){})});
//# sourceMappingURL=aroon-oscillator.js.map