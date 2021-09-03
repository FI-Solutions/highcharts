/*
 Highcharts Gantt JS v9.2.2 (2021-09-03)

 Tree Grid

 (c) 2016-2021 Jon Arild Nygard

 License: www.highcharts.com/license
*/
'use strict';(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/treegrid",["highcharts"],function(A){f(A);f.Highcharts=A;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function A(f,t,y,v){f.hasOwnProperty(t)||(f[t]=v.apply(null,y))}f=f?f._modules:{};A(f,"Core/Axis/BrokenAxis.js",[f["Extensions/Stacking.js"],f["Core/Utilities.js"]],function(f,t){var y=t.addEvent,v=t.find,
z=t.fireEvent,k=t.isArray,p=t.isNumber,u=t.pick,m;(function(a){function m(){"undefined"!==typeof this.brokenAxis&&this.brokenAxis.setBreaks(this.options.breaks,!1)}function q(){this.brokenAxis&&this.brokenAxis.hasBreaks&&(this.options.ordinal=!1)}function D(){var g=this.brokenAxis;if(g&&g.hasBreaks){for(var E=this.tickPositions,c=this.tickPositions.info,a=[],d=0;d<E.length;d++)g.isInAnyBreak(E[d])||a.push(E[d]);this.tickPositions=a;this.tickPositions.info=c}}function t(){this.brokenAxis||(this.brokenAxis=
new e(this))}function C(){var g=this.options.connectNulls,c=this.points,a=this.xAxis,e=this.yAxis;if(this.isDirty)for(var d=c.length;d--;){var b=c[d],n=!(null===b.y&&!1===g)&&(a&&a.brokenAxis&&a.brokenAxis.isInAnyBreak(b.x,!0)||e&&e.brokenAxis&&e.brokenAxis.isInAnyBreak(b.y,!0));b.visible=n?!1:!1!==b.options.visible}}function b(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,u(this.pointArrayMap,["y"]))}function c(g,c){var a=this,E=a.points,d,e,n,l;if(g&&g.brokenAxis&&g.brokenAxis.hasBreaks){var b=
g.brokenAxis;c.forEach(function(c){d=b&&b.breakArray||[];e=g.isXAxis?g.min:u(a.options.threshold,g.min);E.forEach(function(a){l=u(a["stack"+c.toUpperCase()],a[c]);d.forEach(function(d){if(p(e)&&p(l)){n=!1;if(e<d.from&&l>d.to||e>d.from&&l<d.from)n="pointBreak";else if(e<d.from&&l>d.from&&l<d.to||e>d.from&&l>d.to&&l<d.from)n="pointInBreak";n&&z(g,n,{point:a,brk:d})}})})})}}function r(){var g=this.currentDataGrouping,c=g&&g.gapSize;g=this.points.slice();var a=this.yAxis,e=this.options.gapSize,d=g.length-
1,b;if(e&&0<d)for("value"!==this.options.gapUnit&&(e*=this.basePointRange),c&&c>e&&c>=this.basePointRange&&(e=c),b=void 0;d--;)b&&!1!==b.visible||(b=g[d+1]),c=g[d],!1!==b.visible&&!1!==c.visible&&(b.x-c.x>e&&(b=(c.x+b.x)/2,g.splice(d+1,0,{isNull:!0,x:b}),a.stacking&&this.options.stacking&&(b=a.stacking.stacks[this.stackKey][b]=new f(a,a.options.stackLabels,!1,b,this.stack),b.total=0)),b=c);return this.getGraphPath(g)}var w=[];a.compose=function(g,a){-1===w.indexOf(g)&&(w.push(g),g.keepProps.push("brokenAxis"),
y(g,"init",t),y(g,"afterInit",m),y(g,"afterSetTickPositions",D),y(g,"afterSetOptions",q));if(-1===w.indexOf(a)){w.push(a);var e=a.prototype;e.drawBreaks=c;e.gappedPath=r;y(a,"afterGeneratePoints",C);y(a,"afterRender",b)}return g};var e=function(){function c(c){this.hasBreaks=!1;this.axis=c}c.isInBreak=function(c,a){var b=c.repeat||Infinity,d=c.from,e=c.to-c.from;a=a>=d?(a-d)%b:b-(d-a)%b;return c.inclusive?a<=e:a<e&&0!==a};c.lin2Val=function(a){var b=this.brokenAxis;b=b&&b.breakArray;if(!b||!p(a))return a;
var e;for(e=0;e<b.length;e++){var d=b[e];if(d.from>=a)break;else d.to<a?a+=d.len:c.isInBreak(d,a)&&(a+=d.len)}return a};c.val2Lin=function(a){var b=this.brokenAxis;b=b&&b.breakArray;if(!b||!p(a))return a;var e=a,d;for(d=0;d<b.length;d++){var g=b[d];if(g.to<=a)e-=g.len;else if(g.from>=a)break;else if(c.isInBreak(g,a)){e-=a-g.from;break}}return e};c.prototype.findBreakAt=function(c,a){return v(a,function(a){return a.from<c&&c<a.to})};c.prototype.isInAnyBreak=function(a,b){var e=this.axis,d=e.options.breaks||
[],g=d.length,n;if(g&&p(a)){for(;g--;)if(c.isInBreak(d[g],a)){var l=!0;n||(n=u(d[g].showPoints,!e.isXAxis))}var w=l&&b?l&&!n:l}return w};c.prototype.setBreaks=function(a,b){var e=this,d=e.axis,g=k(a)&&!!a.length;d.isDirty=e.hasBreaks!==g;e.hasBreaks=g;d.options.breaks=d.userOptions.breaks=a;d.forceRedraw=!0;d.series.forEach(function(a){a.isDirty=!0});g||d.val2lin!==c.val2Lin||(delete d.val2lin,delete d.lin2val);g&&(d.userOptions.ordinal=!1,d.lin2val=c.lin2Val,d.val2lin=c.val2Lin,d.setExtremes=function(a,
c,b,g,w){if(e.hasBreaks){for(var l=this.options.breaks||[],n;n=e.findBreakAt(a,l);)a=n.to;for(;n=e.findBreakAt(c,l);)c=n.from;c<a&&(c=a)}d.constructor.prototype.setExtremes.call(this,a,c,b,g,w)},d.setAxisTranslation=function(){d.constructor.prototype.setAxisTranslation.call(this);e.unitLength=void 0;if(e.hasBreaks){var a=d.options.breaks||[],b=[],g=[],w=u(d.pointRangePadding,0),r=0,m,k=d.userMin||d.min,f=d.userMax||d.max,q;a.forEach(function(h){m=h.repeat||Infinity;p(k)&&p(f)&&(c.isInBreak(h,k)&&
(k+=h.to%m-k%m),c.isInBreak(h,f)&&(f-=f%m-h.from%m))});a.forEach(function(x){h=x.from;m=x.repeat||Infinity;if(p(k)&&p(f)){for(;h-m>k;)h-=m;for(;h<k;)h+=m;for(q=h;q<f;q+=m)b.push({value:q,move:"in"}),b.push({value:q+x.to-x.from,move:"out",size:x.breakSize})}});b.sort(function(h,x){return h.value===x.value?("in"===h.move?0:1)-("in"===x.move?0:1):h.value-x.value});var x=0;var h=k;b.forEach(function(a){x+="in"===a.move?1:-1;1===x&&"in"===a.move&&(h=a.value);0===x&&p(h)&&(g.push({from:h,to:a.value,len:a.value-
h-(a.size||0)}),r+=a.value-h-(a.size||0))});e.breakArray=g;p(k)&&p(f)&&p(d.min)&&(e.unitLength=f-k-r+w,z(d,"afterBreaks"),d.staticScale?d.transA=d.staticScale:e.unitLength&&(d.transA*=(f-d.min+w)/e.unitLength),w&&(d.minPixelPadding=d.transA*(d.minPointOffset||0)),d.min=k,d.max=f)}});u(b,!0)&&d.chart.redraw()};return c}();a.Additions=e})(m||(m={}));return m});A(f,"Core/Axis/GridAxis.js",[f["Core/Axis/Axis.js"],f["Core/Axis/AxisDefaults.js"],f["Core/Globals.js"],f["Core/Utilities.js"]],function(f,t,
y,v){var z=y.dateFormats,k=v.addEvent,p=v.defined,u=v.erase,m=v.find,a=v.isArray,B=v.isNumber,q=v.merge,D=v.pick,F=v.timeUnits,C=v.wrap,b;(function(c){function b(x,h){var a={width:0,height:0};h.forEach(function(h){h=x[h];if(v.isObject(h,!0)){var c=v.isObject(h.label,!0)?h.label:{};h=c.getBBox?c.getBBox().height:0;c.textStr&&!B(c.textPxLength)&&(c.textPxLength=c.getBBox().width);var b=B(c.textPxLength)?Math.round(c.textPxLength):0;c.textStr&&(b=Math.round(c.getBBox().width));a.height=Math.max(h,a.height);
a.width=Math.max(b,a.width)}});"treegrid"===this.options.type&&this.treeGrid&&this.treeGrid.mapOfPosToGridNode&&(a.width+=this.options.labels.indentation*((this.treeGrid.mapOfPosToGridNode[-1].height||0)-1));return a}function w(){var a=this.grid;(a&&a.columns||[]).forEach(function(h){h.getOffset()})}function e(a){if(!0===(this.options.grid||{}).enabled){var h=this.axisTitle,x=this.height,b=this.horiz,e=this.left,d=this.offset,g=this.opposite,l=this.options,n=this.top,w=this.width,r=this.tickSize(),
m=h&&h.getBBox().width,k=l.title.x,f=l.title.y,G=D(l.title.margin,b?5:10);h=this.chart.renderer.fontMetrics(l.title.style.fontSize,h).f;r=(b?n+x:e)+(b?1:-1)*(g?-1:1)*(r?r[0]/2:0)+(this.side===c.Side.bottom?h:0);a.titlePosition.x=b?e-(m||0)/2-G+k:r+(g?w:0)+d+k;a.titlePosition.y=b?r-(g?x:0)+(g?h:-h)/2+d+f:n-G+f}}function g(){var a=this.chart,h=this.options.grid;h=void 0===h?{}:h;var c=this.userOptions;if(h.enabled){var b=this.options;b.labels.align=D(b.labels.align,"center");this.categories||(b.showLastLabel=
!1);this.labelRotation=0;b.labels.rotation=0}if(h.columns){b=this.grid.columns=[];for(var e=this.grid.columnIndex=0;++e<h.columns.length;){var d=q(c,h.columns[h.columns.length-e-1],{linkedTo:0,type:"category",scrollbar:{enabled:!1}});delete d.grid.columns;d=new f(this.chart,d);d.grid.isColumn=!0;d.grid.columnIndex=e;u(a.axes,d);u(a[this.coll],d);b.push(d)}}}function E(){var a=this.grid,h=this.options;if(!0===(h.grid||{}).enabled){var b=this.min||0,e=this.max||0;this.maxLabelDimensions=this.getMaxLabelDimensions(this.ticks,
this.tickPositions);this.rightWall&&this.rightWall.destroy();if(this.grid&&this.grid.isOuterAxis()&&this.axisLine){var d=h.lineWidth;if(d){d=this.getLinePath(d);var g=d[0],l=d[1],n=((this.tickSize("tick")||[1])[0]-1)*(this.side===c.Side.top||this.side===c.Side.left?-1:1);"M"===g[0]&&"L"===l[0]&&(this.horiz?(g[2]+=n,l[2]+=n):(g[1]+=n,l[1]+=n));!this.horiz&&this.chart.marginRight&&(g=[g,["L",this.left,g[2]||0]],n=["L",this.chart.chartWidth-this.chart.marginRight,this.toPixels(e+this.tickmarkOffset)],
l=[["M",l[1]||0,this.toPixels(e+this.tickmarkOffset)],n],this.grid.upperBorder||0===b%1||(this.grid.upperBorder=this.grid.renderBorder(g)),this.grid.upperBorder&&(this.grid.upperBorder.attr({stroke:h.lineColor,"stroke-width":h.lineWidth}),this.grid.upperBorder.animate({d:g})),this.grid.lowerBorder||0===e%1||(this.grid.lowerBorder=this.grid.renderBorder(l)),this.grid.lowerBorder&&(this.grid.lowerBorder.attr({stroke:h.lineColor,"stroke-width":h.lineWidth}),this.grid.lowerBorder.animate({d:l})));this.grid.axisLineExtra?
(this.grid.axisLineExtra.attr({stroke:h.lineColor,"stroke-width":h.lineWidth}),this.grid.axisLineExtra.animate({d:d})):this.grid.axisLineExtra=this.grid.renderBorder(d);this.axisLine[this.showAxis?"show":"hide"](!0)}}(a&&a.columns||[]).forEach(function(a){a.render()});if(!this.horiz&&this.chart.hasRendered&&(this.scrollbar||this.linkedParent&&this.linkedParent.scrollbar)){a=this.tickmarkOffset;h=this.tickPositions[this.tickPositions.length-1];d=this.tickPositions[0];for(l=void 0;(l=this.hiddenLabels.pop())&&
l.element;)l.show();(l=this.ticks[d].label)&&(b-d>a?this.hiddenLabels.push(l.hide()):l.show());(l=this.ticks[h].label)&&(h-e>a?this.hiddenLabels.push(l.hide()):l.show());(b=this.ticks[h].mark)&&(h-e<a&&0<h-e&&this.ticks[h].isLast?b.hide():this.ticks[h-1]&&b.show())}}}function z(){var a=this.tickPositions&&this.tickPositions.info,h=this.options,c=this.userOptions.labels||{};(h.grid||{}).enabled&&(this.horiz?(this.series.forEach(function(a){a.options.pointRange=0}),a&&h.dateTimeLabelFormats&&h.labels&&
!p(c.align)&&(!1===h.dateTimeLabelFormats[a.unitName].range||1<a.count)&&(h.labels.align="left",p(c.x)||(h.labels.x=3))):"treegrid"!==this.options.type&&this.grid&&this.grid.columns&&(this.minPointOffset=this.tickInterval))}function H(a){var h=this.options;a=a.userOptions;var c=h&&v.isObject(h.grid,!0)?h.grid:{};if(!0===c.enabled){var b=q(!0,{className:"highcharts-grid-axis "+(a.className||""),dateTimeLabelFormats:{hour:{list:["%H:%M","%H"]},day:{list:["%A, %e. %B","%a, %e. %b","%E"]},week:{list:["Week %W",
"W%W"]},month:{list:["%B","%b","%o"]}},grid:{borderWidth:1},labels:{padding:2,style:{fontSize:"13px"}},margin:0,title:{text:null,reserveSpace:!1,rotation:0},units:[["millisecond",[1,10,100]],["second",[1,10]],["minute",[1,5,15]],["hour",[1,6]],["day",[1]],["week",[1]],["month",[1]],["year",null]]},a);"xAxis"===this.coll&&(p(a.linkedTo)&&!p(a.tickPixelInterval)&&(b.tickPixelInterval=350),p(a.tickPixelInterval)||!p(a.linkedTo)||p(a.tickPositioner)||p(a.tickInterval)||(b.tickPositioner=function(a,h){var c=
this.linkedParent&&this.linkedParent.tickPositions&&this.linkedParent.tickPositions.info;if(c){for(var x=b.units||[],d=void 0,e=void 0,l=void 0,g=0;g<x.length;g++)if(x[g][0]===c.unitName){d=g;break}x[d+1]?(l=x[d+1][0],e=(x[d+1][1]||[1])[0]):"year"===c.unitName&&(l="year",e=10*c.count);c=F[l];this.tickInterval=c*e;return this.getTimeTicks({unitRange:c,count:e,unitName:l},a,h,this.options.startOfWeek)}}));q(!0,this.options,b);this.horiz&&(h.minPadding=D(a.minPadding,0),h.maxPadding=D(a.maxPadding,0));
B(h.grid.borderWidth)&&(h.tickWidth=h.lineWidth=c.borderWidth)}}function d(a){a=(a=a.userOptions)&&a.grid||{};var h=a.columns;a.enabled&&h&&q(!0,this.options,h[h.length-1])}function J(){(this.grid.columns||[]).forEach(function(a){a.setScale()})}function n(c){var h=t.defaultLeftAxisOptions,b=this.horiz,d=this.maxLabelDimensions,e=this.options.grid;e=void 0===e?{}:e;e.enabled&&d&&(h=2*Math.abs(h.labels.x),b=b?e.cellHeight||h+d.height:h+d.width,a(c.tickSize)?c.tickSize[0]=b:c.tickSize=[b,0])}function l(){this.axes.forEach(function(a){(a.grid&&
a.grid.columns||[]).forEach(function(a){a.setAxisSize();a.setAxisTranslation()})})}function K(a){var h=this.grid;(h.columns||[]).forEach(function(h){h.destroy(a.keepEvents)});h.columns=void 0}function G(a){a=a.userOptions||{};var h=a.grid||{};h.enabled&&p(h.borderColor)&&(a.tickColor=a.lineColor=h.borderColor);this.grid||(this.grid=new I(this));this.hiddenLabels=[]}function L(a){var h=this.label,b=this.axis,e=b.reversed,d=b.chart,l=b.options.grid||{},g=b.options.labels,x=g.align,n=c.Side[b.side],
w=a.tickmarkOffset,r=b.tickPositions,k=this.pos-w;r=B(r[a.index+1])?r[a.index+1]-w:(b.max||0)+w;var m=b.tickSize("tick");w=m?m[0]:0;m=m?m[1]/2:0;if(!0===l.enabled){if("top"===n){l=b.top+b.offset;var f=l-w}else"bottom"===n?(f=d.chartHeight-b.bottom+b.offset,l=f+w):(l=b.top+b.len-(b.translate(e?r:k)||0),f=b.top+b.len-(b.translate(e?k:r)||0));"right"===n?(n=d.chartWidth-b.right+b.offset,e=n+w):"left"===n?(e=b.left+b.offset,n=e-w):(n=Math.round(b.left+(b.translate(e?r:k)||0))-m,e=Math.min(Math.round(b.left+
(b.translate(e?k:r)||0))-m,b.left+b.len));this.slotWidth=e-n;a.pos.x="left"===x?n:"right"===x?e:n+(e-n)/2;a.pos.y=f+(l-f)/2;d=d.renderer.fontMetrics(g.style.fontSize,h&&h.element);h=h?h.getBBox().height:0;g.useHTML?a.pos.y+=d.b+-(h/2):(h=Math.round(h/d.h),a.pos.y+=(d.b-(d.h-d.f))/2+-((h-1)*d.h/2));a.pos.x+=b.horiz&&g.x||0}}function M(a){var b=a.axis,c=a.value;if(b.options.grid&&b.options.grid.enabled){var e=b.tickPositions,d=(b.linkedParent||b).series[0],l=c===e[0];e=c===e[e.length-1];var g=d&&m(d.options.data,
function(a){return a[b.isXAxis?"x":"y"]===c}),x=void 0;g&&d.is("gantt")&&(x=q(g),y.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(x));a.isFirst=l;a.isLast=e;a.point=x}}function N(){var a=this.options,b=this.categories,c=this.tickPositions,e=c[0],d=c[c.length-1],l=this.linkedParent&&this.linkedParent.min||this.min,g=this.linkedParent&&this.linkedParent.max||this.max,n=this.tickInterval;!0!==(a.grid||{}).enabled||b||!this.horiz&&!this.isLinked||(e<l&&e+n>l&&!a.startOnTick&&(c[0]=l),d>g&&
d-n<g&&!a.endOnTick&&(c[c.length-1]=g))}function O(a){var b=this.options.grid;return!0===(void 0===b?{}:b).enabled&&this.categories?this.tickInterval:a.apply(this,Array.prototype.slice.call(arguments,1))}(function(a){a[a.top=0]="top";a[a.right=1]="right";a[a.bottom=2]="bottom";a[a.left=3]="left"})(c.Side||(c.Side={}));c.compose=function(a,c,r){-1===a.keepProps.indexOf("grid")&&(a.keepProps.push("grid"),a.prototype.getMaxLabelDimensions=b,C(a.prototype,"unsquish",O),k(a,"init",G),k(a,"afterGetOffset",
w),k(a,"afterGetTitlePosition",e),k(a,"afterInit",g),k(a,"afterRender",E),k(a,"afterSetAxisTranslation",z),k(a,"afterSetOptions",H),k(a,"afterSetOptions",d),k(a,"afterSetScale",J),k(a,"afterTickSize",n),k(a,"trimTicks",N),k(a,"destroy",K));k(c,"afterSetChartSize",l);k(r,"afterGetLabelPosition",L);k(r,"labelFormat",M);return a};var I=function(){function a(a){this.axis=a}a.prototype.isOuterAxis=function(){var a=this.axis,b=a.grid.columnIndex,c=a.linkedParent&&a.linkedParent.grid.columns||a.grid.columns,
e=b?a.linkedParent:a,d=-1,l=0;a.chart[a.coll].forEach(function(b,c){b.side!==a.side||b.options.isInternal||(l=c,b===e&&(d=c))});return l===d&&(B(b)?c.length===b:!0)};a.prototype.renderBorder=function(a){var b=this.axis,c=b.chart.renderer,e=b.options;a=c.path(a).addClass("highcharts-axis-line").add(b.axisBorder);c.styledMode||a.attr({stroke:e.lineColor,"stroke-width":e.lineWidth,zIndex:7});return a};return a}();c.Additions=I})(b||(b={}));z.E=function(a){return this.dateFormat("%a",a,!0).charAt(0)};
z.W=function(a){a=new this.Date(a);var b=(this.get("Day",a)+6)%7,c=new this.Date(a.valueOf());this.set("Date",c,this.get("Date",a)-b+3);b=new this.Date(this.get("FullYear",c),0,1);4!==this.get("Day",b)&&(this.set("Month",a,0),this.set("Date",a,1+(11-this.get("Day",b))%7));return(1+Math.floor((c.valueOf()-b.valueOf())/6048E5)).toString()};"";return b});A(f,"Gantt/Tree.js",[f["Core/Utilities.js"]],function(f){var t=f.extend,y=f.isNumber,v=f.pick,z=function(f,k){var m=f.reduce(function(a,f){var m=v(f.parent,
"");"undefined"===typeof a[m]&&(a[m]=[]);a[m].push(f);return a},{});Object.keys(m).forEach(function(a,f){var q=m[a];""!==a&&-1===k.indexOf(a)&&(q.forEach(function(a){f[""].push(a)}),delete f[a])});return m},k=function(f,u,m,a,B,q){var p=0,z=0,C=q&&q.after,b=q&&q.before;u={data:a,depth:m-1,id:f,level:m,parent:u};var c,r;"function"===typeof b&&b(u,q);b=(B[f]||[]).map(function(a){var b=k(a.id,f,m+1,a,B,q),g=a.start;a=!0===a.milestone?g:a.end;c=!y(c)||g<c?g:c;r=!y(r)||a>r?a:r;p=p+1+b.descendants;z=Math.max(b.height+
1,z);return b});a&&(a.start=v(a.start,c),a.end=v(a.end,r));t(u,{children:b,descendants:p,height:z});"function"===typeof C&&C(u,q);return u};return{getListOfParents:z,getNode:k,getTree:function(f,u){var m=f.map(function(a){return a.id});f=z(f,m);return k("",null,1,null,f,u)}}});A(f,"Core/Axis/TreeGridTick.js",[f["Core/Color/Palette.js"],f["Core/Utilities.js"]],function(f,t){var y=t.addEvent,v=t.isObject,z=t.isNumber,k=t.pick,p=t.wrap,u;(function(m){function a(){this.treeGrid||(this.treeGrid=new C(this))}
function u(a,c){a=a.treeGrid;var b=!a.labelIcon,m=c.renderer,e=c.xy,g=c.options,q=g.width||0,u=g.height||0,p=e.x-q/2-(g.padding||0);e=e.y-u/2;var d=c.collapsed?90:180,t=c.show&&z(e),n=a.labelIcon;n||(a.labelIcon=n=m.path(m.symbols[g.type](g.x||0,g.y||0,q,u)).addClass("highcharts-label-icon").add(c.group));n.attr({y:t?0:-9999});m.styledMode||n.attr({cursor:"pointer",fill:k(c.color,f.neutralColor60),"stroke-width":1,stroke:g.lineColor,strokeWidth:g.lineWidth||0});n[b?"attr":"animate"]({translateX:p,
translateY:e,rotation:d})}function q(a,c,f,m,e,g,q,u,p){var b=k(this.options&&this.options.labels,g);g=this.pos;var r=this.axis,n="treegrid"===r.options.type;a=a.apply(this,[c,f,m,e,b,q,u,p]);n&&(c=b&&v(b.symbol,!0)?b.symbol:{},b=b&&z(b.indentation)?b.indentation:0,g=(g=(r=r.treeGrid.mapOfPosToGridNode)&&r[g])&&g.depth||1,a.x+=(c.width||0)+2*(c.padding||0)+(g-1)*b);return a}function t(a){var b=this,f=b.pos,m=b.axis,e=b.label,g=m.treeGrid.mapOfPosToGridNode,q=m.options,p=k(b.options&&b.options.labels,
q&&q.labels),t=p&&v(p.symbol,!0)?p.symbol:{},d=(g=g&&g[f])&&g.depth;q="treegrid"===q.type;var B=-1<m.tickPositions.indexOf(f);f=m.chart.styledMode;q&&g&&e&&e.element&&e.addClass("highcharts-treegrid-node-level-"+d);a.apply(b,Array.prototype.slice.call(arguments,1));q&&e&&e.element&&g&&g.descendants&&0<g.descendants&&(m=m.treeGrid.isCollapsed(g),u(b,{color:!f&&e.styles&&e.styles.color||"",collapsed:m,group:e.parentGroup,options:t,renderer:e.renderer,show:B,xy:e.xy}),t="highcharts-treegrid-node-"+(m?
"expanded":"collapsed"),e.addClass("highcharts-treegrid-node-"+(m?"collapsed":"expanded")).removeClass(t),f||e.css({cursor:"pointer"}),[e,b.treeGrid.labelIcon].forEach(function(a){a&&!a.attachedTreeGridEvents&&(y(a.element,"mouseover",function(){e.addClass("highcharts-treegrid-node-active");e.renderer.styledMode||e.css({textDecoration:"underline"})}),y(a.element,"mouseout",function(){var a=v(p.style)?p.style:{};e.removeClass("highcharts-treegrid-node-active");e.renderer.styledMode||e.css({textDecoration:a.textDecoration})}),
y(a.element,"click",function(){b.treeGrid.toggleCollapse()}),a.attachedTreeGridEvents=!0)}))}var F=!1;m.compose=function(b){F||(y(b,"init",a),p(b.prototype,"getLabelPosition",q),p(b.prototype,"renderLabel",t),b.prototype.collapse=function(a){this.treeGrid.collapse(a)},b.prototype.expand=function(a){this.treeGrid.expand(a)},b.prototype.toggleCollapse=function(a){this.treeGrid.toggleCollapse(a)},F=!0)};var C=function(){function a(a){this.tick=a}a.prototype.collapse=function(a){var b=this.tick,c=b.axis,
e=c.brokenAxis;e&&c.treeGrid.mapOfPosToGridNode&&(b=c.treeGrid.collapse(c.treeGrid.mapOfPosToGridNode[b.pos]),e.setBreaks(b,k(a,!0)))};a.prototype.expand=function(a){var b=this.tick,c=b.axis,e=c.brokenAxis;e&&c.treeGrid.mapOfPosToGridNode&&(b=c.treeGrid.expand(c.treeGrid.mapOfPosToGridNode[b.pos]),e.setBreaks(b,k(a,!0)))};a.prototype.toggleCollapse=function(a){var b=this.tick,c=b.axis,e=c.brokenAxis;e&&c.treeGrid.mapOfPosToGridNode&&(b=c.treeGrid.toggleCollapse(c.treeGrid.mapOfPosToGridNode[b.pos]),
e.setBreaks(b,k(a,!0)))};return a}();m.Additions=C})(u||(u={}));return u});A(f,"Mixins/TreeSeries.js",[f["Core/Color/Color.js"],f["Core/Utilities.js"]],function(f,t){var y=t.extend,v=t.isArray,z=t.isNumber,k=t.isObject,p=t.merge,u=t.pick;return{getColor:function(m,a){var k=a.index,q=a.mapOptionsToLevel,p=a.parentColor,t=a.parentColorIndex,v=a.series,b=a.colors,c=a.siblings,r=v.points,w=v.chart.options.chart,e;if(m){r=r[m.i];m=q[m.level]||{};if(q=r&&m.colorByPoint){var g=r.index%(b?b.length:w.colorCount);
var y=b&&b[g]}if(!v.chart.styledMode){b=r&&r.options.color;w=m&&m.color;if(e=p)e=(e=m&&m.colorVariation)&&"brightness"===e.key?f.parse(p).brighten(k/c*e.to).get():p;e=u(b,w,y,e,v.color)}var z=u(r&&r.options.colorIndex,m&&m.colorIndex,g,t,a.colorIndex)}return{color:e,colorIndex:z}},getLevelOptions:function(f){var a=null;if(k(f)){a={};var m=z(f.from)?f.from:1;var q=f.levels;var t={};var u=k(f.defaults)?f.defaults:{};v(q)&&(t=q.reduce(function(a,b){if(k(b)&&z(b.level)){var c=p({},b);var f="boolean"===
typeof c.levelIsConstant?c.levelIsConstant:u.levelIsConstant;delete c.levelIsConstant;delete c.level;b=b.level+(f?0:m-1);k(a[b])?y(a[b],c):a[b]=c}return a},{}));q=z(f.to)?f.to:1;for(f=0;f<=q;f++)a[f]=p({},u,k(t[f])?t[f]:{})}return a},setTreeValues:function q(a,f){var k=f.before,p=f.idRoot,t=f.mapIdToNode[p],b=f.points[a.i],c=b&&b.options||{},r=0,w=[];a.levelDynamic=a.level-(("boolean"===typeof f.levelIsConstant?f.levelIsConstant:1)?0:t.level);a.name=u(b&&b.name,"");a.visible=p===a.id||("boolean"===
typeof f.visible?f.visible:!1);"function"===typeof k&&(a=k(a,f));a.children.forEach(function(b,c){var e=y({},f);y(e,{index:c,siblings:a.children.length,visible:a.visible});b=q(b,e);w.push(b);b.visible&&(r+=b.val)});k=u(c.value,r);a.visible=0<=k&&(0<r||a.visible);a.children=w;a.childrenTotal=r;a.isLeaf=a.visible&&!r;a.val=k;return a},updateRootId:function(a){if(k(a)){var f=k(a.options)?a.options:{};f=u(a.rootNode,f.rootId,"");k(a.userOptions)&&(a.userOptions.rootId=f);a.rootNode=f}return f}}});A(f,
"Core/Axis/TreeGridAxis.js",[f["Core/Axis/BrokenAxis.js"],f["Core/Axis/GridAxis.js"],f["Gantt/Tree.js"],f["Core/Axis/TreeGridTick.js"],f["Mixins/TreeSeries.js"],f["Core/Utilities.js"]],function(f,t,y,v,z,k){var p=z.getLevelOptions,u=k.addEvent,m=k.find,a=k.fireEvent,B=k.isArray,q=k.isObject,A=k.isString,F=k.merge,C=k.pick,b=k.wrap,c;(function(c){function k(a,b){var c=a.collapseEnd||0;a=a.collapseStart||0;c>=b&&(a-=.5);return{from:a,to:c,showPoints:!1}}function e(a,b,c){var e=[],d=[],f={},l="boolean"===
typeof b?b:!1,g={},k=-1;a=y.getTree(a,{after:function(a){a=g[a.pos];var b=0,c=0;a.children.forEach(function(a){c+=(a.descendants||0)+1;b=Math.max((a.height||0)+1,b)});a.descendants=c;a.height=b;a.collapsed&&d.push(a)},before:function(a){var b=q(a.data,!0)?a.data:{},c=A(b.name)?b.name:"",d=f[a.parent];d=q(d,!0)?g[d.pos]:null;var n=function(a){return a.name===c},p;l&&q(d,!0)&&(p=m(d.children,n))?(n=p.pos,p.nodes.push(a)):n=k++;g[n]||(g[n]=p={depth:d?d.depth+1:0,name:c,id:b.id,nodes:[a],children:[],
pos:n},-1!==n&&e.push(c),q(d,!0)&&d.children.push(p));A(a.id)&&(f[a.id]=a);p&&!0===b.collapsed&&(p.collapsed=!0);a.pos=n}});g=function(a,b){var c=function(a,d,e){var f=d+(-1===d?0:b-1),g=(f-d)/2,l=d+g;a.nodes.forEach(function(a){var b=a.data;q(b,!0)&&(b.y=d+(b.seriesIndex||0),delete b.seriesIndex);a.pos=l});e[l]=a;a.pos=l;a.tickmarkOffset=g+.5;a.collapseStart=f+.5;a.children.forEach(function(a){c(a,f+1,e);f=(a.collapseEnd||0)-.5});a.collapseEnd=f+.5;return e};return c(a["-1"],-1,{})}(g,c);return{categories:e,
mapOfIdToNode:f,mapOfPosToGridNode:g,collapsedNodes:d,tree:a}}function g(a){a.target.axes.filter(function(a){return"treegrid"===a.options.type}).forEach(function(b){var c=b.options||{},d=c.labels,f=c.uniqueNames;c=c.max;var g=0;if(!b.treeGrid.mapOfPosToGridNode||b.series.some(function(a){return!a.hasRendered||a.isDirtyData||a.isDirty})){var l=b.series.reduce(function(a,b){b.visible&&((b.options.data||[]).forEach(function(c){b.options.keys&&b.options.keys.length&&(c=b.pointClass.prototype.optionsToObject.call({series:b},
c),b.pointClass.setGanttPointAliases(c));q(c,!0)&&(c.seriesIndex=g,a.push(c))}),!0===f&&g++);return a},[]);if(c&&l.length<c)for(var n=l.length;n<=c;n++)l.push({name:n+"\u200b"});c=e(l,f||!1,!0===f?g:1);b.categories=c.categories;b.treeGrid.mapOfPosToGridNode=c.mapOfPosToGridNode;b.hasNames=!0;b.treeGrid.tree=c.tree;b.series.forEach(function(a){var b=(a.options.data||[]).map(function(b){B(b)&&a.options.keys&&a.options.keys.length&&l.forEach(function(a){0<=b.indexOf(a.x)&&0<=b.indexOf(a.x2)&&(b=a)});
return q(b,!0)?F(b):b});a.visible&&a.setData(b,!1)});b.treeGrid.mapOptionsToLevel=p({defaults:d,from:1,levels:d&&d.levels,to:b.treeGrid.tree&&b.treeGrid.tree.height});"beforeRender"===a.type&&(b.treeGrid.collapsedNodes=c.collapsedNodes)}})}function r(a,b){var c=this.treeGrid.mapOptionsToLevel||{},e=this.ticks,f=e[b],g;if("treegrid"===this.options.type&&this.treeGrid.mapOfPosToGridNode){var l=this.treeGrid.mapOfPosToGridNode[b];(c=c[l.depth])&&(g={labels:c});!f&&d?e[b]=new d(this,b,void 0,void 0,{category:l.name,
tickmarkOffset:l.tickmarkOffset,options:g}):(f.parameters.category=l.name,f.options=g,f.addLabel())}else a.apply(this,Array.prototype.slice.call(arguments,1))}function z(a,b,c){var d=this,f="treegrid"===c.type;d.treeGrid||(d.treeGrid=new D(d));f&&(u(b,"beforeRender",g),u(b,"beforeRedraw",g),u(b,"addSeries",function(a){a.options.data&&(a=e(a.options.data,c.uniqueNames||!1,1),d.treeGrid.collapsedNodes=(d.treeGrid.collapsedNodes||[]).concat(a.collapsedNodes))}),u(d,"foundExtremes",function(){d.treeGrid.collapsedNodes&&
d.treeGrid.collapsedNodes.forEach(function(a){var b=d.treeGrid.collapse(a);d.brokenAxis&&(d.brokenAxis.setBreaks(b,!1),d.treeGrid.collapsedNodes&&(d.treeGrid.collapsedNodes=d.treeGrid.collapsedNodes.filter(function(b){return a.collapseStart!==b.collapseStart||a.collapseEnd!==b.collapseEnd})))})}),u(d,"afterBreaks",function(){"yAxis"===d.coll&&!d.staticScale&&d.chart.options.chart.height&&(d.isDirty=!0)}),c=F({grid:{enabled:!0},labels:{align:"left",levels:[{level:void 0},{level:1,style:{fontWeight:"bold"}}],
symbol:{type:"triangle",x:-5,y:-5,height:10,width:10,padding:5}},uniqueNames:!1},c,{reversed:!0,grid:{columns:void 0}}));a.apply(d,[b,c]);f&&(d.hasNames=!0,d.options.showLastLabel=!0)}function H(b){var c=this.options;"treegrid"===c.type?(this.min=C(this.userMin,c.min,this.dataMin),this.max=C(this.userMax,c.max,this.dataMax),a(this,"foundExtremes"),this.setAxisTranslation(),this.tickmarkOffset=.5,this.tickInterval=1,this.tickPositions=this.treeGrid.mapOfPosToGridNode?this.treeGrid.getTickPositions():
[]):b.apply(this,Array.prototype.slice.call(arguments,1))}var d;c.compose=function(a,c,e,g){-1===a.keepProps.indexOf("treeGrid")&&(a.keepProps.push("treeGrid"),d=g,b(a.prototype,"generateTick",r),b(a.prototype,"init",z),b(a.prototype,"setTickInterval",H),a.prototype.utils={getNode:y.getNode},t.compose(a,c,g),f.compose(a,e),v.compose(g));return a};var D=function(){function a(a){this.axis=a}a.prototype.setCollapsedStatus=function(a){var b=this.axis,c=b.chart;b.series.forEach(function(b){var d=b.options.data;
if(a.id&&d){var e=c.get(a.id);b=d[b.data.indexOf(e)];e&&b&&(e.collapsed=a.collapsed,b.collapsed=a.collapsed)}})};a.prototype.collapse=function(a){var b=this.axis,c=b.options.breaks||[],d=k(a,b.max);c.push(d);a.collapsed=!0;b.treeGrid.setCollapsedStatus(a);return c};a.prototype.expand=function(a){var b=this.axis,c=b.options.breaks||[],d=k(a,b.max);a.collapsed=!1;b.treeGrid.setCollapsedStatus(a);return c.reduce(function(a,b){b.to===d.to&&b.from===d.from||a.push(b);return a},[])};a.prototype.getTickPositions=
function(){var a=this.axis,b=Math.floor(a.min/a.tickInterval)*a.tickInterval,c=Math.ceil(a.max/a.tickInterval)*a.tickInterval;return Object.keys(a.treeGrid.mapOfPosToGridNode||{}).reduce(function(d,e){e=+e;!(e>=b&&e<=c)||a.brokenAxis&&a.brokenAxis.isInAnyBreak(e)||d.push(e);return d},[])};a.prototype.isCollapsed=function(a){var b=this.axis,c=b.options.breaks||[],d=k(a,b.max);return c.some(function(a){return a.from===d.from&&a.to===d.to})};a.prototype.toggleCollapse=function(a){return this.isCollapsed(a)?
this.expand(a):this.collapse(a)};return a}();c.Additions=D})(c||(c={}));return c});A(f,"masters/modules/treegrid.src.js",[f["Core/Globals.js"],f["Core/Axis/TreeGridAxis.js"]],function(f,t){t.compose(f.Axis,f.Chart,f.Series,f.Tick)})});
//# sourceMappingURL=treegrid.js.map