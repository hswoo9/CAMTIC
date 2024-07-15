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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="expMn.gridReload1();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 40
                }, {
                    title : "구분",
                    field : "GUBUN",
                    width: 50
                }, {
                    title : "세부",
                    field : "GUBUN_DETAIL",
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
                               '<button type="button" class="k-button k-button-solid-base" onclick="expMn.fn_insExpStatus(this, \'incp\')">저장</button>';
                    }
                }, {
                    title : "비고",
                    field : "",
                    width: 80
                },
            ],
            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    mainGrid2 : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/cam_achieve/getExnpExpList',
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="expMn.gridReload2();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 40
                }, {
                    title : "구분",
                    field : "GUBUN",
                    width: 50
                }, {
                    title : "세부",
                    field : "GUBUN_DETAIL",
                    width: 50
                }, {
                    title : "예산프로젝트명",
                    field : "CORP_PJT_NM",
                    width: 150
                }, {
                    title : "거래처",
                    field : "CRM_NM",
                    width: 100
                }, {
                    title : "지출예정액<br>(vat포함)",
                    field : "REQ_AMT",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right;">'+ comma(e.REQ_AMT) +'</div>'
                    }
                }, {
                    title : "지출예정일",
                    field : "EXP_DE",
                    width: 50
                }, {
                    title : "상태",
                    field : "STATUS",
                    width: 80,
                    template: function(e){
                        return '<input type="text" name="expStat" value="'+ e.STATUS +'" style="width: 60%; margin-right: 5px;">' +
                            '<button type="button" class="k-button k-button-solid-base" onclick="expMn.fn_insExpStatus(this, \'exnp\')">저장</button>';
                    }
                }, {
                    title : "비고",
                    field : "",
                    width: 80
                },
            ],
            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
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

    fn_insExpStatus : function(e, t) {
        let target = $(e).parent().find("input[name='expStat']");
        let grid = "";

        if(t == "incp") {
            grid = $("#mainGrid1").data("kendoGrid");
        } else {
            grid = $("#mainGrid2").data("kendoGrid");
        }

        let dataItem = grid.dataItem($(e).closest("tr"));
        let data = {
            expSn : dataItem.EXP_SN,
            budgetType: dataItem.BUDGET_TYPE,
            gubun : dataItem.GUBUN,
            fKeyType : dataItem.F_KEY_TYPE,
            fKeySn : dataItem.F_KEY_SN,
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

                if(data.budgetType == "incp"){
                    $("#mainGrid1").data("kendoGrid").dataSource.read();
                } else {
                    $("#mainGrid2").data("kendoGrid").dataSource.read();
                }

                expMn.fn_dropDownListSet();
            },
            error: function() {

            }
        });
    }


}