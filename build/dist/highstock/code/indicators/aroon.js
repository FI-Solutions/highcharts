/*
 Highstock JS v9.2.2 (2021-09-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/aroon",["highcharts","highcharts/modules/stock"],function(l){a(l);a.Highcharts=l;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function l(a,g,h,r){a.hasOwnProperty(g)||(a[g]=r.apply(null,h))}a=a?a._modules:{};l(a,"Mixins/MultipleLines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,g){var h=
g.defined,r=g.error,l=g.merge,m=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(e){var a=[];(this.pointArrayMap||[]).forEach(function(f){f!==e&&a.push("plot"+f.charAt(0).toUpperCase()+f.slice(1))});return a},toYData:function(e){var a=[];(this.pointArrayMap||[]).forEach(function(f){a.push(e[f])});return a},translate:function(){var e=this,a=e.pointArrayMap,f=[],d,c=e.modifyValue;f=e.getTranslatedLinesNames();m.prototype.translate.apply(e,
arguments);e.points.forEach(function(b){a.forEach(function(a,k){d=b[a];c&&(d=c.call(e,d));null!==d&&(b[f[k]]=e.yAxis.toPixels(d,!0))})})},drawGraph:function(){var a=this,g=a.linesApiNames,f=a.points,d=f.length,c=a.options,b=a.graph,v={options:{gapSize:c.gapSize}},k=[],q;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,b){for(k[b]=[];d--;)q=f[d],k[b].push({x:q.x,plotX:q.plotX,plotY:q[a],isNull:!h(q[a])});d=f.length});g.forEach(function(b,d){k[d]?(a.points=k[d],c[b]?a.options=l(c[b].styles,
v):r('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+b],m.prototype.drawGraph.call(a),a["graph"+b]=a.graph):r('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=f;a.options=c;a.graph=b;m.prototype.drawGraph.call(a)}}});l(a,"Stock/Indicators/Aroon/AroonIndicator.js",[a["Mixins/MultipleLines.js"],a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,g,h){function l(a,c){var b=a[0],d=0,k;for(k=1;k<a.length;k++)if("max"===c&&a[k]>=b||"min"===c&&a[k]<=b)b=a[k],d=k;return d}var t=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,
new d)}}(),m=g.seriesTypes.sma,e=h.extend,u=h.merge,f=h.pick;h=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}t(c,a);c.prototype.getValues=function(a,c){c=c.period;var b=a.xData,d=(a=a.yData)?a.length:0,e=[],g=[],h=[],n;for(n=c-1;n<d;n++){var p=a.slice(n-c+1,n+2);var m=l(p.map(function(a){return f(a[2],a)}),"min");p=l(p.map(function(a){return f(a[1],a)}),"max");p=p/c*100;m=m/c*100;b[n+1]&&(e.push([b[n+1],p,m]),g.push(b[n+
1]),h.push([p,m]))}return{values:e,xData:g,yData:h}};c.defaultOptions=u(m.defaultOptions,{params:{index:void 0,period:25},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Aroon Up: {point.y}<br/>Aroon Down: {point.aroonDown}<br/>'},aroonDown:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}});return c}(m);e(h.prototype,{linesApiNames:["aroonDown"],nameBase:"Aroon",pointArrayMap:["y","aroonDown"],pointValKey:"y",
drawGraph:a.drawGraph,getTranslatedLinesNames:a.getTranslatedLinesNames,toYData:a.toYData,translate:a.translate});g.registerSeriesType("aroon",h);"";return h});l(a,"masters/indicators/aroon.src.js",[],function(){})});
//# sourceMappingURL=aroon.js.map