!function () {
    var e = {
        8901: function (e, t, n) {
            var o, s;
            n.amdD,
                o = [n(9567)],
                s = function (e) {
                    return function () {
                        var t, n, o, s = 0, i = {
                            clear: function (n, o) {
                                var s = u();
                                t || a(s),
                                    r(n, s, o) || function (n) {
                                        for (var o = t.children(), s = o.length - 1; s >= 0; s--)
                                            r(e(o[s]), n)
                                    }(s)
                            },
                            remove: function (n) {
                                var o = u();
                                t || a(o),
                                    n && 0 === e(":focus", n).length ? d(n) : t.children().length && t.remove()
                            },
                            error: function (e, t, n) {
                                return c({
                                    type: "error",
                                    iconClass: u().iconClasses.error,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            },
                            getContainer: a,
                            info: function (e, t, n) {
                                return c({
                                    type: "info",
                                    iconClass: u().iconClasses.info,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            },
                            options: {},
                            subscribe: function (e) {
                                n = e
                            },
                            success: function (e, t, n) {
                                return c({
                                    type: "success",
                                    iconClass: u().iconClasses.success,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            },
                            version: "2.1.4",
                            warning: function (e, t, n) {
                                return c({
                                    type: "warning",
                                    iconClass: u().iconClasses.warning,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            },
                            danger: function (e, t, n) {
                                return c({
                                    type: "danger",
                                    iconClass: u().iconClasses.danger,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            },
                            primary: function (e, t, n) {
                                return c({
                                    type: "primary",
                                    iconClass: u().iconClasses.primary,
                                    message: e,
                                    optionsOverride: n,
                                    title: t
                                })
                            }
                        };
                        return i;
                        function a(n, o) {
                            return n || (n = u()),
                                (t = e("#" + n.containerId)).length || o && (t = function (n) {
                                    return (t = e("<div/>").attr("id", n.containerId).addClass(n.positionClass)).appendTo(e(n.target)),
                                        t
                                }(n)),
                                t
                        }
                        function r(t, n, o) {
                            var s = !(!o || !o.force) && o.force;
                            return !(!t || !s && 0 !== e(":focus", t).length || (t[n.hideMethod]({
                                duration: n.hideDuration,
                                easing: n.hideEasing,
                                complete: function () {
                                    d(t)
                                }
                            }),
                                0))
                        }
                        function l(e) {
                            n && n(e)
                        }
                        function c(n) {
                            var i = u()
                                , r = n.iconClass || i.iconClass;
                            if (void 0 !== n.optionsOverride && (i = e.extend(i, n.optionsOverride),
                                r = n.optionsOverride.iconClass || r),
                                !function (e, t) {
                                    if (e.preventDuplicates) {
                                        if (t.message === o)
                                            return !0;
                                        o = t.message
                                    }
                                    return !1
                                }(i, n)) {
                                s++,
                                    t = a(i, !0);
                                var c = null
                                    , p = e("<div/>")
                                    , f = e("<div/>")
                                    , g = e("<div/>")
                                    , m = e("<div/>")
                                    , v = e(i.closeHtml)
                                    , h = {
                                        intervalId: null,
                                        hideEta: null,
                                        maxHideTime: null
                                    }
                                    , C = {
                                        toastId: s,
                                        state: "visible",
                                        startTime: new Date,
                                        options: i,
                                        map: n
                                    };
                                return n.iconClass && p.addClass(i.toastClass).addClass(r),
                                    function () {
                                        if (n.title) {
                                            var e = n.title;
                                            i.escapeHtml && (e = w(n.title)),
                                                f.append(e).addClass(i.titleClass),
                                                p.append(f)
                                        }
                                    }(),
                                    function () {
                                        if (n.message) {
                                            var e = n.message;
                                            i.escapeHtml && (e = w(n.message)),
                                                g.append(e).addClass(i.messageClass),
                                                p.append(g)
                                        }
                                    }(),
                                    i.closeButton && (v.addClass(i.closeClass).attr("role", "button"),
                                        p.prepend(v)),
                                    i.progressBar && (m.addClass(i.progressClass),
                                        p.prepend(m)),
                                    i.rtl && p.addClass("rtl"),
                                    i.newestOnTop ? t.prepend(p) : t.append(p),
                                    function () {
                                        var e = "";
                                        switch (n.iconClass) {
                                            case "toast-success":
                                            case "toast-info":
                                                e = "polite";
                                                break;
                                            default:
                                                e = "assertive"
                                        }
                                        p.attr("aria-live", e)
                                    }(),
                                    p.hide(),
                                    p[i.showMethod]({
                                        duration: i.showDuration,
                                        easing: i.showEasing,
                                        complete: i.onShown
                                    }),
                                    i.timeOut > 0 && (c = setTimeout(b, i.timeOut),
                                        h.maxHideTime = parseFloat(i.timeOut),
                                        h.hideEta = (new Date).getTime() + h.maxHideTime,
                                        i.progressBar && (h.intervalId = setInterval((function () {
                                            var e = (h.hideEta - (new Date).getTime()) / h.maxHideTime * 100;
                                            m.width(e + "%")
                                        }
                                        ), 10))),
                                    i.closeOnHover && p.hover((function () {
                                        clearTimeout(c),
                                            h.hideEta = 0,
                                            p.stop(!0, !0)[i.showMethod]({
                                                duration: i.showDuration,
                                                easing: i.showEasing
                                            })
                                    }
                                    ), (function () {
                                        (i.timeOut > 0 || i.extendedTimeOut > 0) && (c = setTimeout(b, i.extendedTimeOut),
                                            h.maxHideTime = parseFloat(i.extendedTimeOut),
                                            h.hideEta = (new Date).getTime() + h.maxHideTime)
                                    }
                                    )),
                                    !i.onclick && i.tapToDismiss && p.click(b),
                                    i.closeButton && v && v.click((function (e) {
                                        e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && !0 !== e.cancelBubble && (e.cancelBubble = !0),
                                            i.onCloseClick && i.onCloseClick(e),
                                            b(!0)
                                    }
                                    )),
                                    i.onclick && p.click((function (e) {
                                        i.onclick(e),
                                            b()
                                    }
                                    )),
                                    l(C),
                                    i.debug && console && console.log(C),
                                    p
                            }
                            function w(e) {
                                return null == e && (e = ""),
                                    e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                            }
                            function b(t) {
                                var n = t && !1 !== i.closeMethod ? i.closeMethod : i.hideMethod
                                    , o = t && !1 !== i.closeDuration ? i.closeDuration : i.hideDuration
                                    , s = t && !1 !== i.closeEasing ? i.closeEasing : i.hideEasing;
                                if (!e(":focus", p).length || t)
                                    return clearTimeout(h.intervalId),
                                        p[n]({
                                            duration: o,
                                            easing: s,
                                            complete: function () {
                                                d(p),
                                                    clearTimeout(c),
                                                    i.onHidden && "hidden" !== C.state && i.onHidden(),
                                                    C.state = "hidden",
                                                    C.endTime = new Date,
                                                    l(C)
                                            }
                                        })
                            }
                        }
                        function u() {
                            return e.extend({}, {
                                tapToDismiss: !0,
                                toastClass: "toast",
                                containerId: "toast-container",
                                debug: !1,
                                showMethod: "fadeIn",
                                showDuration: 300,
                                showEasing: "swing",
                                onShown: void 0,
                                hideMethod: "fadeOut",
                                hideDuration: 1e3,
                                hideEasing: "swing",
                                onHidden: void 0,
                                closeMethod: !1,
                                closeDuration: !1,
                                closeEasing: !1,
                                closeOnHover: !0,
                                extendedTimeOut: 1e3,
                                iconClasses: {
                                    error: "toast-error",
                                    info: "toast-info",
                                    success: "toast-success",
                                    warning: "toast-warning",
                                    primary: "toast-primary",
                                    danger: "toast-danger",
                                },
                                iconClass: "toast-info",
                                positionClass: "toast-top-right",
                                timeOut: 5e3,
                                titleClass: "toast-title",
                                messageClass: "toast-message",
                                escapeHtml: !1,
                                target: "body",
                                closeHtml: '<button type="button">&times;</button>',
                                closeClass: "toast-close-button",
                                newestOnTop: !0,
                                preventDuplicates: !1,
                                progressBar: !1,
                                progressClass: "toast-progress",
                                rtl: !1
                            }, i.options)
                        }
                        function d(e) {
                            t || (t = a()),
                                e.is(":visible") || (e.remove(),
                                    e = null,
                                    0 === t.children().length && (t.remove(),
                                        o = void 0))
                        }
                    }()
                }
                    .apply(t, o),
                void 0 === s || (e.exports = s)
        },
        9567: function (e) {
            "use strict";
            e.exports = window.jQuery
        }
    }
        , t = {};
    function n(o) {
        var s = t[o];
        if (void 0 !== s)
            return s.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o](i, i.exports, n),
            i.exports
    }
    n.amdD = function () {
        throw new Error("define cannot be used indirect")
    }
        ,
        n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            }
                : function () {
                    return e
                }
                ;
            return n.d(t, {
                a: t
            }),
                t
        }
        ,
        n.d = function (e, t) {
            for (var o in t)
                n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, {
                    enumerable: !0,
                    get: t[o]
                })
        }
        ,
        n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ;
    var o = {};
    !function () {
        "use strict";
        n.r(o),
            n.d(o, {
                toastr: function () {
                    return e
                }
            });
        var e = n(8901)
    }();
    var s = window;
    for (var i in o)
        s[i] = o[i];
    o.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    })
}();
