var incomeList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(new Date().setMonth(new Date().getMonth() - 2)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#endDt").val($("#startDt").val());
            }
        });
        $("#endDt").change(function (){
            if($("#startDt").val() > $("#endDt").val()){
                $("#startDt").val($("#endDt").val());
            }
        });

        incomeList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", incomeList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", incomeList.gridReload);

        incomeList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]

        customKendo.fn_dropDownList("searchKeyword", incomeList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        incomeList.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="incomeList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">수입결의서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="incomeList.gridReload()">' +
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
                    field: "APP_DE",
                    // template: function(e){
                    //     return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    // }
                }, {
                    title: "적요",
                    field: "APP_CONT",
                    width: 280,
                    template: function(e){
                        console.log(e);
                        return '<div style="cursor: pointer; font-weight: bold" onclick="incomeList.fn_reqRegPopup('+e.PAY_INCP_SN+');">'+e.APP_CONT+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 200,
                    template: function (e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return e.PJT_NM;
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
                    title: "입금금액",
                    width: 100,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 60,
                    template : function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                            if(e.RE_CNT != 0){
                                if (e.RE_TOT_AMT != 0) {
                                    if (e.RE_TOT_COST == e.TOT_DET_AMT) {
                                        status = "입금완료"
                                    } else {
                                        status = "부분입금"
                                    }
                                }
                            }
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            status = "결재중"
                        } else {
                            status = "작성중"
                        }

                        return status;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        incomeList .global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val()
        }

        incomeList.mainGrid("/pay/getIncpList", incomeList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (paySn){
        var url = "/payApp/pop/regIncmPop.do";
        if(paySn != null && paySn != ""){
            url = "/payApp/pop/regIncmPop.do?payIncpSn=" + paySn;
        }

        // if(status != null && status != ""){
        //     url = url + "&status=" + status;
        // }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_incomePopup : function (payDepoSn, payIncpSn){
        var url = "/payApp/pop/regIncmPop.do";
        if(payDepoSn != null && payDepoSn != ""){
            url = "/payApp/pop/regIncmPop.do?payDepoSn=" + payDepoSn;
        }
        if(payIncpSn != null && payIncpSn != ""){
            url = "/payApp/pop/regIncmPop.do?payIncpSn=" + payIncpSn;
        }

        // if(status != null && status != ""){
        //     url = url + "&status=" + status;
        // }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_apprIncome: function(key){
        var data = {
            payDepoSn : key
        }

        var result = customKendo.fn_customAjax("/pay/setApprIncome", data);

        if(result.flag){
            alert("요청되었습니다.");
            location.href="/pay/pop/regPayDepoPop.do?payDepoSn=" + key + "&pjtSn=" + $("#paramPjtSn").val() + "&apprStat=Y";
        }
    }
}

function gridReload(){
    incomeList.gridReload();
}