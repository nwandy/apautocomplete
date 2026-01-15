
$.fn.apautocomplete = function (arg, a, b) {
    if (!arg) { arg = {}; }
    var me = new $.apautocomplete(arg, this);
    me.initDivs(this);
    return me;
};
$.apautocomplete = function (options, origin) {
    var me = this;
    me.valuefield = options.valuefield ? options.valuefield : me.valuefield;
    me.queryfield = options.queryfield ? options.queryfield : me.queryfield;
    me.querylen = options.querylen ? options.querylen : me.querylen;
    me.type = options.type ? options.type : me.type;
    me.url = options.url ? options.url : me.url;
    me.maxlen = options.maxlen ? options.maxlen : me.maxlen;
    me.fields = options.fields ? options.fields : me.fields;
    me.viewdatastart = options.viewdatastart ? options.viewdatastart : me.viewdatastart;
    me.viewdataend = options.viewdataend ? options.viewdataend : me.viewdataend;
    me.view = options.view ? options.view : me.view;
    me.tbclass = options.tbclass ? options.tbclass : me.tbclass;
    me.select = options.select ? options.select : me.select;
    me.divlist = options.divlist ? options.divlist : me.divlist;
    me.data = options.data ? options.data : me.data;
    me.origindata = me.data;
    me.mustexists = typeof options.mustexists === "undefined" ? me.mustexists: options.mustexists;
    $(origin).data('core', me);
};
$.apautocomplete.prototype = {
    inpidnum: 0,
    inpid: 0,
    queryfield: "",
    querylen: 1,
    type: "ajax",//json
    url: "",
    maxlen: 10,
    fields: [],
    control: "",
    divlist: "",
    data: [],
    viewdata: [],
    viewdatastart: 0,
    viewdataend: 0,
    mustexists: true,
    view: "list",//"table",
    tbclass: "table apactable",
    initDivs: function (origininput) {
        var me = this;
        // cerco id univoco
        var count = 0;
        while (me.inpidnum == 0) {
            count++;
            if ($("#apac" + count).length == 0) {
                me.inpidnum = count;
                me.inpid = "apac" + count;
            }
            // In caso di errore
            if (count > 1000) { return; }
        }
        // imposto dati tabella base
        me.inpid = "apac" + me.inpidnum;

        // Recupero il contenitore della tabella
        var contenitore = $(origininput).parent();
        // recupero html  
        originhtml = $("<div>").append($(origininput).clone()).html();

        // contenitore generale
        var $divwait = $("<div />", { class: "apacdiv", id: 'apacdivwait' + count });

        // contenuto flex generale
        var $divflex = $("<div>", { class: "apacdivwait d-flex justify-content-center d-none", id: 'apacdivflex' + count });
        // div attesa caricamento
        var $btnwait = $("<button>", {
            class: "btn btn-primary", type: "button", disabled: "disabled", id: 'apacbtnwait' + count
        });
        var $spanwait1 = $("<span>", {
            class: "spinner-border spinner-border-sm", "aria-hidden": "true", id: 'apacspanwait1' + count
        });
        var $spanwait2 = $("<span>", {
            class: "ms-4", id: 'apacspanwait2' + count
        });
        $spanwait2.append("Loading ...");
        $btnwait.append($spanwait1);
        $btnwait.append($spanwait2);
        $divflex.append($btnwait);
        $divwait.append($divflex);
        // div contenuti tabella
        var $divglobal = $("<div>", { class: "row apacdiv", id: 'apacdiv' + count });
        $divwait.append($divglobal);

        // id contenitore input base
        var iddiv = "apacbase" + count;
        var $divbase = $("<div>", { class: "apacbase", id: iddiv });

        $($divbase).append($(origininput));
        $(origininput).bind("input", me.getInput);

        $div = $("<div>", { id: me.inpid + "autocomplete-list", "class": "autocomplete-items" });
        $($divbase).append($div);
        me.control = $(origininput);
        me.divlist = $div;
        $(origininput).bind("focus", me.focus);
        $(origininput).bind("blur", me.blur);
        $divglobal.append($divbase);
        $divwait.appendTo($(contenitore));
        return me;
    },
    waiting: function (show) {
        var me = this;
        var wait = $("#apacdivflex" + me.inpidnum);
        var cont = $("#apacdiv" + + me.inpidnum);

        if (show) {
            wait.removeClass("d-none");
            cont.addClass("apacdivopaque");
        }
        else {
            wait.addClass("d-none");
            cont.removeClass("apacdivopaque");
        }
    },
    filterData: function () {
        var core = this;
        var $inp = $("#apacbase" + core.inpidnum).children("input");
        var val = $inp.val().toUpperCase();
        if (val == "") { core.viewdata = core.data; return; }
        var data = core.origindata;
        var datafiltered = [];
        $.each(data, function (k, r) {
            var f = r[core.valuefield].toUpperCase();
            if (f.indexOf(val) >= 0) {
                datafiltered.push(r);
            }
        })
        core.data = datafiltered;
        core.waiting(false);
        core.selectViewData();
    },
    focus: function () {
        var me = $(this);
        var core = me.data("core");
        var $list = core.divlist;
        $list.empty();
        $(document).trigger("apacfocus");
    },
    blur: function () {
        var me = $(this);
        var core = me.data("core");
        if (core.mustexists) {
            if (me.val() != "") {
                var f = core.data.find(t => t[core.valuefield] === me.val());
                if (!f) {
                    me.val("");
                }
            }
        }
        $(document).trigger("apacblur");
    },
    selectViewData: function () {
        var core = this;
        if (core.viewdataend == 0) {
            core.viewdataend = core.maxlen;
        }
        core.viewdata = core.data.slice(core.viewdatastart, core.viewdataend);
        var prec = false;
        var succ = false;
        if (core.viewdatastart > 0) {
            prec = true;
        }
        if (core.viewdataend < core.data.length) {
            succ = true;
        }
        core.viewData(prec, succ);
    },
    select: function (value, riga) {
        $(document).trigger("apacselect", [value, riga]);
    },
    viewData: function (prec, succ) {
        var core = this;
        var $list = core.divlist;
        $list.empty();
        if (core.viewdata.length == 0) { return; }
        $tbd = "";
        if (core.view == "table") {
            $tb = $("<table>", { class: core.tbclass });
            $thd = $("<thead>");
            $tr = $("<tr>");
            $.each(core.fields, function (k, v) {
                $th = $("<th>");
                $th.append(v)
                $tr.append($th)
            })
            $thd.append($tr)
            $tb.append($thd);
            $tbd = $("<tbody>");
            $tb.append($tbd);
        }
        for (i = 0; i < core.viewdata.length; i++) {
            var row = core.viewdata[i];
            if (core.view == "list") {
                var $b = $("<div>");
                $b.data("value", row);
                var val = "", add = "";
                $.each(core.fields, function (k, v) {
                    val += add + row[v];
                    add = " - ";
                })
                $b.append(val);
                $b.bind("click", function (e) {
                    e.preventDefault();
                    var $inp =  $("#apacbase" + core.inpidnum).children("input");
                    $inp.val(row[core.valuefield])
                    $inp.focus();
                    $list.empty();
                    core.select(row[core.valuefield], row);
                });
                $list.append($b);
            } // if list
            if (core.view == "table") {
                $tr = $("<tr>");
                $tr.data("value", row);
                $.each(core.fields, function (k, v) {
                    $th = $("<td>");
                    $th.append(row[v])
                    $tr.append($th)
                    /*if (v == core.field) {*/
                    $th.bind("click", function (e) {
                        e.preventDefault();
                        var $inp = $(this).closest("div").parent().children("input")
                        var ar = $(this).closest("tr").data("value");
                        $inp.val(ar[core.valuefield])
                        $inp.focus();
                        $list.empty();
                        core.select(ar[core.valuefield], ar);
                    });
                    //}
                })// if table
                $tbd.append($tr);
            }
        }// for
        if (prec || succ) {
            if (core.view == "list") {
                $riga = $("<div>", { class: "row" });
                $col1 = $("<div>", { class: "col-1" });
                $col2 = $("<div>", { class: "col-10" });
                $col3 = $("<div>", { class: "col-1 text-end" });
                $riga.append($col1);
                $riga.append($col2);
                $riga.append($col3);
                if (prec) {
                    $a = $("<a>", { "href": "#", "class": "apacleftbtn", "id": "apacleftbtn" + core.inpidnum });
                    $i = $("<i>", { "class": "fa fa-arrow-left" });
                    $a.append($i);
                    $a.bind("click", function (e) {// visualizza precedenti
                        e.preventDefault();
                        core.viewdatastart = core.viewdatastart - core.maxlen;
                        core.viewdataend = core.viewdatastart + core.maxlen;
                        core.selectViewData();
                    });
                    $col1.append($a);
                }
                if (succ) {
                    $a = $("<a>", { "href": "#", "class": "apacrightbtn", "id": "apacrightbtn" + core.inpidnum });
                    $i = $("<i>", { "class": "fa fa-arrow-right" });
                    $a.append($i);
                    $a.bind("click", function (e) {// visualizza successivi
                        e.preventDefault();
                        core.viewdatastart = core.viewdataend;
                        core.viewdataend = (core.viewdataend + core.maxlen) > core.data.length ? core.data.length : core.viewdataend + core.maxlen;
                        core.selectViewData();
                    });
                    $col3.append($a);
                }
                $list.append($riga);
            }
            if (core.view == "table") {
                $tr = $("<tr>");
                $th = $("<td>");
                if (prec) {
                    $a = $("<a>", { "href": "#", "class": "apacleftbtn", "id": "apacleftbtn" + core.inpidnum });
                    $i = $("<i>", { "class": "fa fa-arrow-left" });
                    $a.append($i);
                    $th.append($a);
                    $a.bind("click", function (e) {// visualizza precedenti
                        e.preventDefault();
                        core.viewdatastart = core.viewdatastart - core.maxlen;
                        core.viewdataend = core.viewdatastart + core.maxlen;
                        core.selectViewData();
                    });
                }
                $tr.append($th);
                if (core.fields.length > 2) {
                    $th = $("<td>", { "colspan": core.fields.length - 2 });
                    $tr.append($th);
                }
                $th = $("<td>", { class: "text-end" });
                if (succ) {
                    $a = $("<a>", { "href": "#", "class": "apacrightbtn", "id": "apacrightbtn" + core.inpidnum });
                    $i = $("<i>", { "class": "fa fa-arrow-right" });
                    $a.append($i);
                    $th.append($a);
                    $a.bind("click", function (e) {// visualizza successivi
                        e.preventDefault();
                        core.viewdatastart = core.viewdataend;
                        core.viewdataend = (core.viewdataend + core.maxlen) > core.data.length ? core.data.length : core.viewdataend + core.maxlen;
                        core.selectViewData();
                    });
                }
                $tr.append($th);
                $tbd.append($tr);
            }   // if table
        }
        if (core.view == "table") {
            $list.append($tb);
        }
    },
    getInput: function (e) {
        var me = $(this);
        var core = me.data("core");
        var val = me.val();

        if (val.length >= core.querylen) {
            core.waiting(true);
            if (core.type == "ajax")// query server
            {
                var url = core.url + (core.url.indexOf("?") > 0 ? "&" : "?") + core.queryfield + "=" + val;
                $.ajax({
                    url: url,
                    success: function (data) {
                        core.waiting(false);
                        core.origindata = data;
                        core.data = data;
                        core.viewdatastart = 0;
                        core.viewdataend = 0;
                        core.selectViewData();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        core.waiting(false);
                        var msg = "Si è verificato un errore richiamando la funzione - controllare i dati.";
                        msg += "<br/>DETTAGLI ERRORE:<br/><br/>" + jqXHR.responseText
                        console.log(msg);
                    }
                });
            }
            else { // filtra dati
                core.viewdatastart = 0;
                core.viewdataend = 0;
                core.filterData();
            }
        }
    }
}
