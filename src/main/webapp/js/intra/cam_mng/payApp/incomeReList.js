var incomeReList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        incomeReList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", incomeReList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change",incomeReList.gridReload);

        incomeReList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]

        customKendo.fn_dropDownList("searchKeyword", incomeReList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        incomeReList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="incomeReList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "결의일자",
                    width: 80,
                    field: "REG_DT",
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "적요",
                    field: "APP_CONT",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="incomeReList.fn_reqRegPopup('+e.PAY_INCP_SN+', '+e.PAY_INCP_RE_SN+');">'+e.APP_CONT+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                    template: function (e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return pjtNm + "...";
                    }
                }, {
                    title: "세출과목",
                    field: "BUDGET_NM",
                    width: 170,
                }, {
                    title: "작성자",
                    field: "EMP_NAME",
                    width: 80,
                }, {
                    title: "지출금액",
                    width: 100,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.PAY_INCP_RE_SN != null && e.PAY_INCP_RE_SN != "" && e.PAY_INCP_RE_SN != undefined){
                            if(e.RE_STAT == "Y"){
                                return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                            } else {
                                return '<div style="text-align: right">'+0+'</div>';
                            }
                        } else {
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 60,
                    template : function(e){
                        if(e.PAY_INCP_RE_SN != null && e.PAY_INCP_RE_SN != "" && e.PAY_INCP_RE_SN != undefined){
                            if(e.RE_STAT == "Y"){
                                return "승인"
                            } else {
                                return "미승인"
                            }
                        } else {
                            if(e.DOC_STATUS == "100"){
                                return "승인"
                            } else {
                                return "미승인"
                            }
                        }

                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        incomeReList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        incomeReList.mainGrid("/pay/getIncpReList", incomeReList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (paySn, payReSn){
        var url = "/payApp/pop/regIncmRePop.do";
        if(paySn != null && paySn != ""){
            url = "/payApp/pop/regIncmRePop.do?payIncpSn=" + paySn;
        }

        if(payReSn != undefined && payReSn != "" && payReSn != null && payReSn != "undefined"){
            url = "/payApp/pop/regIncpRePop.do?payIncpSn=" + paySn + "&payIncpReSn=" + payReSn;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}