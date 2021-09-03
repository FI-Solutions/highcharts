/*
 Highcharts Stock JS v9.2.2 (2021-09-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Karol Kolodziej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/klinger",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,e,m,b){a.hasOwnProperty(e)||(a[e]=b.apply(null,m))}a=a?a._modules:{};c(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var e=a.error;return{isParentLoaded:function(a,
b,c,h,f){if(a)return h?h(a):!0;e(f||this.generateMessage(c,b));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"Mixins/MultipleLines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,e){var c=e.defined,b=e.error,u=e.merge,h=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var f=
[];(this.pointArrayMap||[]).forEach(function(b){b!==a&&f.push("plot"+b.charAt(0).toUpperCase()+b.slice(1))});return f},toYData:function(a){var f=[];(this.pointArrayMap||[]).forEach(function(b){f.push(a[b])});return f},translate:function(){var a=this,b=a.pointArrayMap,e=[],c,k=a.modifyValue;e=a.getTranslatedLinesNames();h.prototype.translate.apply(a,arguments);a.points.forEach(function(f){b.forEach(function(b,l){c=f[b];k&&(c=k.call(a,c));null!==c&&(f[e[l]]=a.yAxis.toPixels(c,!0))})})},drawGraph:function(){var a=
this,e=a.linesApiNames,n=a.points,p=n.length,k=a.options,m=a.graph,w={options:{gapSize:k.gapSize}},l=[],d;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,r){for(l[r]=[];p--;)d=n[p],l[r].push({x:d.x,plotX:d.plotX,plotY:d[a],isNull:!c(d[a])});p=n.length});e.forEach(function(d,r){l[r]?(a.points=l[r],k[d]?a.options=u(k[d].styles,w):b('Error: "There is no '+d+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=
a["graph"+d],h.prototype.drawGraph.call(a),a["graph"+d]=a.graph):b('Error: "'+d+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=n;a.options=k;a.graph=m;h.prototype.drawGraph.call(a)}}});c(a,"Stock/Indicators/Klinger/KlingerIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Mixins/MultipleLines.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,e,c,b){var m=this&&this.__extends||function(){var a=function(b,
d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var g in d)d.hasOwnProperty(g)&&(a[g]=d[g])};return a(b,d)};return function(b,d){function g(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(g.prototype=d.prototype,new g)}}(),h=c.seriesTypes,f=h.sma,q=h.ema,n=b.correctFloat,p=b.error;h=b.extend;var k=b.isArray,v=b.merge;b=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.points=void 0;
a.options=void 0;a.volumeSeries=void 0;return a}m(c,b);c.prototype.init=function(){var d=arguments,g=this;a.isParentLoaded(q,"ema",g.type,function(a){a.prototype.init.apply(g,d)})};c.prototype.calculateTrend=function(a,g){return a[g][1]+a[g][2]+a[g][3]>a[g-1][1]+a[g-1][2]+a[g-1][3]?1:-1};c.prototype.isValidData=function(a){var d=this.chart,b=this.options,c=this.linkedParent;a=k(a)&&4===a.length;(d=this.volumeSeries||(this.volumeSeries=d.get(b.params.volumeSeriesID)))||p("Series "+b.params.volumeSeriesID+
" not found! Check `volumeSeriesID`.",!0,c.chart);return!(![c,d].every(function(a){return a&&a.xData&&a.xData.length>=b.params.slowAvgPeriod})||!a)};c.prototype.getCM=function(a,b,c,e,f){return n(b+(c===e?a:f))};c.prototype.getDM=function(a,b){return n(a-b)};c.prototype.getVolumeForce=function(a){var b=[],d=1;var c=0;var e=a[0][1]-a[0][2];var f=0;for(d;d<a.length;d++){var h=this.calculateTrend(a,d);var x=this.getDM(a[d][1],a[d][2]);c=this.getCM(c,x,h,f,e);f=this.volumeSeries.yData[d]*h*Math.abs(2*
(x/c-1))*100;b.push([f]);f=h;e=x}return b};c.prototype.getEMA=function(a,b,c,e,f,h,k){return q.prototype.calculateEma(k||[],a,"undefined"===typeof h?1:h,e,b,"undefined"===typeof f?-1:f,c)};c.prototype.getSMA=function(a,b,c){return q.prototype.accumulatePeriodPoints(a,b,c)/a};c.prototype.getValues=function(a,b){var c=[],d=a.xData;a=a.yData;var e=[],f=[],h=[],g,k=0,l=0,m=void 0,p=void 0,q=null;if(this.isValidData(a[0])){var t=this.getVolumeForce(a),u=this.getSMA(b.fastAvgPeriod,0,t),v=this.getSMA(b.slowAvgPeriod,
0,t),w=2/(b.fastAvgPeriod+1),y=2/(b.slowAvgPeriod+1);for(k;k<a.length;k++)k>=b.fastAvgPeriod&&(m=l=this.getEMA(t,m,u,w,0,k,d)[1]),k>=b.slowAvgPeriod&&(p=g=this.getEMA(t,p,v,y,0,k,d)[1],g=n(l-g),h.push(g),h.length>=b.signalPeriod&&(q=h.slice(-b.signalPeriod).reduce(function(a,b){return a+b})/b.signalPeriod),c.push([d[k],g,q]),e.push(d[k]),f.push([g,q]));return{values:c,xData:e,yData:f}}};c.defaultOptions=v(f.defaultOptions,{params:{fastAvgPeriod:34,slowAvgPeriod:55,signalPeriod:13,volumeSeriesID:"volume"},
signalLine:{styles:{lineWidth:1,lineColor:"#ff0000"}},dataGrouping:{approximation:"averages"},tooltip:{pointFormat:'<span style="color: {point.color}">\u25cf</span><b> {series.name}</b><br/><span style="color: {point.color}">Klinger</span>: {point.y}<br/><span style="color: {point.series.options.signalLine.styles.lineColor}">Signal</span>: {point.signal}<br/>'}});return c}(f);h(b.prototype,{linesApiNames:["signalLine"],nameBase:"Klinger",nameComponents:["fastAvgPeriod","slowAvgPeriod"],pointArrayMap:["y",
"signal"],parallelArrays:["x","y","signal"],pointValKey:"y",drawGraph:e.drawGraph,getTranslatedLinesNames:e.getTranslatedLinesNames,translate:e.translate,toYData:e.toYData});c.registerSeriesType("klinger",b);"";return b});c(a,"masters/indicators/klinger.src.js",[],function(){})});
//# sourceMappingURL=klinger.js.map