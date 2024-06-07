var busnCostPreCon = {

    global : {
        dropDownDataSource : [],
        now : new Date()
    },

    fn_defaultScript: function (){

        busnCostPreCon.global.dropDownDataSource = [
            { text: "진행", value: "1" },
            { text: "종료", value: "2" }
        ]
        customKendo.fn_dropDownList("searchDept", busnCostPreCon.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", busnCostPreCon.gridReload);

        customKendo.fn_datePicker("strDate", "depth", "yyyy-MM-dd", new Date(busnCostPreCon.global.now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("endDate", "depth", "yyyy-MM-dd", new Date(busnCostPreCon.global.now.getFullYear() + '-12-31'));


        busnCostPreCon.global.dropDownDataSource = [
            { text: "프로젝트 명", value: "PJT_NM" },
            { text: "프로젝트 코드", value: "PJT_CD" },
        ]

        customKendo.fn_dropDownList("searchKeyword", busnCostPreCon.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        busnCostPreCon.mainGrid();

    },


    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/g20/getProjectList2',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.searchDept = $("#searchDept").val();
                    data.pjtFromDate = $("#strDate").val();
                    data.pjtToDate = $("#endDate").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();

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

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="busnCostPreCon.fn_asyncCall()">' +
                            '	<span class="k-button-text">동기화</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="busnCostPreCon.gridReload()">' +
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
                    title : "코드",
                    field : "pjtSeq",
                    width: 80
                }, {
                    title : "프로젝트 명",
                    width: 300,
                    template:function (e){
                        return "<a href='javascript:void(0);' style='font-weight: bold' onclick='busnCostPreCon.fn_popBudgetDetail(\"" + e.pjtSeq + "\")'>" + e.pjtName + "</a>";
                    }
                }, {
                    field: "pjtFromDate",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "pjtToDate",
                    title: "종료일자",
                    width: 80,
                }, {
                    field: "bankNumber",
                    title: "계좌",
                    width: 100,
                    template: function (e){
                        if(e.bankNumber == 0){
                            return "";
                        } else {
                            return e.bankNumber;
                        }
                    }
                }, {
                    title: "시재",
                    width: 80,
                    template: function (e){
                        console.log(e)

                        var rs = e.rs;
                        var cash = 0;
                        var point = 0;
                        if(e.carryoverCash != ''){
                            cash = e.carryoverCash;
                        }
                        if(e.carryoverPoint != ''){
                            point = e.carryoverPoint;
                        }
                        var overPay = (cash + point);

                        var totPay = overPay + Number(rs.incpA) - Number(rs.exnpA) + Number(rs.incpB) - Number(rs.exnpB);

                        return '<div style="text-align: right">'+comma(totPay)+'</div>';
                    }
                }, {
                    title: "수입예산",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.g20IncpBgtAmt || 0)+'</div>';
                    }
                }, {
                    title: "수입예산잔액",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.g20IncpBgtAmt || 0) - Number(e.approveIncpAmt || 0))+'</div>';
                    }
                }, {
                    title: "지출예산",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.g20exnpBgtAmt || 0))+'</div>';
                    }
                }, {
                    title: "지출예산잔액",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(Number(e.g20exnpBgtAmt || 0) - Number(e.approveExnpAmt || 0))+'</div>';
                    }
                }, {
                    field: "",
                    title: "집행률",
                    width: 50,
                }, {
                    field: "ibranchAmt",
                    title: "금융CM연동시재",
                    width: 80,
                    template: function(e){
                        return '<div style="text-align : right">'+comma(e.ibranchAmt)+'</div>'
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_popBudgetDetail: function (pjtCd){
        var url = "/budget/pop/busnCostDetailView.do?pjtCd=" + pjtCd;
        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    fn_asyncCall: function(){
        var data= {
            searchDept: $("#searchDept").val(),
            pjtFromDate: $("#strDate").val(),
            pjtToDate: $("#endDate").val(),
            searchKeyword: $("#searchKeyword").val(),
            searchValue: $("#searchValue").val()
        }

        $.ajax({
            url: "/mng/updProjectPayAsync",
            type: "POST",
            data: data,
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success: function () {
                alert("동기화가 완료되었습니다.");
                busnCostPreCon.gridReload();
                $("#my-spinner").hide();
            }
        })
    }
}