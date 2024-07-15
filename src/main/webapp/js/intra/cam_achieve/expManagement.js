var expMn = {


    fn_defaultScript : function (){

        customKendo.fn_datePicker("year", "year", "yyyy-MM", new Date());

        $("#year").change(function(){
            expMn.gridReload1();
            expMn.gridReload2();
        });

        expMn.gridReload1();
        expMn.gridReload2();
    },

    gridReload1 : function(){
        expMn.mainGrid1();
        expMn.fn_dropDownListSet();
    },

    gridReload2 : function(){
        expMn.mainGrid2();
        expMn.fn_dropDownListSet();
    },

    mainGrid1 : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/cam_achieve/getIncpExpList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.year = $("#year").val().split("-")[0];
                    data.month = $("#year").val().split("-")[1];
                    data.baseYear = $("#year").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid1").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="expMn.mainGrid1();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 40
                }, {
                    title : "구분",
                    field : "GUBUN",
                    width: 50
                }, {
                    title : "세부",
                    field : "BUSN_NM",
                    width: 50
                }, {
                    title : "프로젝트명",
                    field : "PJT_NM",
                    width: 150
                }, {
                    title : "거래처",
                    field : "CRM_NM",
                    width: 100
                }, {
                    title : "입금예정액<br>(vat포함)",
                    field : "DEPO_AMT",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right;">'+ comma(e.DEPO_AMT) +'</div>'
                    }
                }, {
                    title : "입금예정일",
                    field : "PAY_INCP_DE",
                    width: 50
                }, {
                    title : "상태",
                    field : "",
                    width: 80,
                    template: function(e){
                        return '<input type="text" name="expStat" value="'+ e.STATUS +'" style="width: 60%; margin-right: 5px;">' +
                               '<button type="button" class="k-button k-button-solid-base" onclick="expMn.fn_insExpStatus(this)">저장</button>';
                    }
                }, {
                    title : "비고",
                    field : "",
                    width: 80
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");
    },

    mainGrid2 : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.year = $("#year").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="expMn.mainGrid2();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 40
                }, {
                    title : "구분",
                    field : "",
                    width: 80
                }, {
                    title : "세부",
                    field : "",
                    width: 80
                }, {
                    title : "예산프로젝트명",
                    field : "",
                    width: 80
                }, {
                    title : "거래처",
                    field : "",
                    width: 80
                }, {
                    title : "입금예정액\n(vat포함)",
                    field : "",
                    width: 80
                }, {
                    title : "지출예정일",
                    field : "",
                    width: 80
                }, {
                    title : "상태",
                    field : "",
                    width: 80
                }, {
                    title : "비고",
                    field : "",
                    width: 80
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");
    },

    fn_dropDownListSet : function(e){
        $("input[name='expStat']").each(function () {
            $(this).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    {text: "선택", value: ""},
                    {text: "확정", value: "A"},
                    {text: "예정", value: "B"},
                    {text: "추가", value: "C"},
                ],
                value: $(this).val()
            });
        });
    },

    fn_insExpStatus : function(e) {
        let target = $(e).parent().find("input[name='expStat']");
        let dataItem = $("#mainGrid1").data("kendoGrid").dataItem($(e).closest("tr"));
        let data = {
            expSn : dataItem.EXP_SN,
            gubun : dataItem.GUBUN,
            fKeyType : dataItem.F_KEY_TYPE,
            fKeySn : dataItem.PAY_INCP_SN,
            status : target.data("kendoDropDownList").value(),
            regEmpSeq : $("#regEmpSeq").val(),
        }

        $.ajax({
            url: "/cam_achieve/insExpStatus",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(){
                alert("저장되었습니다.");
                $("#mainGrid1").data("kendoGrid").dataSource.read();
                expMn.fn_dropDownListSet();
            },
            error: function() {

            }
        });
    }


}