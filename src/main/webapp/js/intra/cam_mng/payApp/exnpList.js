var exnpList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        exnpList.global.dropDownDataSource2 = [
            { text: "결의일자", value: "1" },
            { text: "지출요청일", value: "" },
            { text: "지출완료일", value: "3" }
        ]

        exnpList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", exnpList.gridReload);

        exnpList.global.dropDownDataSource = [
            { text: "승인", value: "1" },
            { text: "미결", value: "2" },
        ]
        customKendo.fn_dropDownList("searchDept2", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchDept2").data("kendoDropDownList").bind("change", exnpList.gridReload);

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 2)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)


        customKendo.fn_dropDownList("searchDate", exnpList.global.dropDownDataSource2, "text", "value", 3);
        $("#searchDate").data("kendoDropDownList").value("");
        customKendo.fn_datePicker("exnpStrDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("exnpEndDe", "depth", "yyyy-MM-dd", new Date());

        exnpList.global.dropDownDataSource = [
            { text: "문서번호", value: "A" },
            { text: "적요", value: "B" },
            { text: "거래처", value: "D" },
            { text: "프로젝트명", value: "C" },
            { text: "작성자", value: "E" },
            { text: "세출과목(장,관,항)", value: "F" },
        ]
        customKendo.fn_dropDownList("searchKeyword", exnpList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", exnpList.gridReload);

        customKendo.fn_textBox(["searchValue"]);
        exnpList.gridReload();
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
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="exnpList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            columns: [
                {
                    title: "번호",
                    width: 40,
                    template: "#= --record #"
                }, {
                    title: "문서유형",
                    width: 70,
                    template: function(e){
                        if(e.EVI_TYPE == 1){
                            return "세금계산서";
                        } else if (e.EVI_TYPE == 2){
                            return "계산서";
                        } else if(e.EVI_TYPE == 3){
                            return "신용카드";
                        } else if(e.EVI_TYPE == 4){
                            return "직원지급";
                        } else if(e.EVI_TYPE == 5){
                            return "소득신고자";
                        } else {
                            return "기타";
                        }
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "적요",
                    field: "EXNP_BRIEFS",
                    width: 200,
                    template: function(e){
                        return '<div style="cursor: pointer; font-weight: bold" onclick="exnpList.fn_reqRegPopup('+e.EXNP_SN+', \''+e.PAY_APP_SN+'\', \'rev\')">'+e.EXNP_BRIEFS+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 180,
                    template: function (e){
                        return e.PJT_NM;
                    }
                }, {
                    title: "세출과목",
                    field: "BUDGET_NM_EX",
                    width: 160
                }, {
                    title: "작성자",
                    field: "REG_EMP_NAME",
                    width: 60
                }, {
                    title: "신청일",
                    width: 70,
                    field: "REG_DT",
                    template: function(e){
                        return new Date(e.REG_DT + 3240 * 10000).toISOString().split("T")[0];
                    }
                }, {
                    title: "결의일자",
                    width: 70,
                    field: "EXNP_DE"
                }, {
                    title: "지출요청일",
                    width: 70,
                    field: "REQ_DE"
                }, {
                    title: "지출예정일",
                    width: 70,
                    field: "PAY_EXNP_DE"
                }, {
                    title: "지출완료일",
                    width: 70,
                    field: "REQ_END_DE",
                    template: function(e){
                        if(e.RE_STAT == "Y"){
                            return e.REQ_END_DE;
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "지출금액",
                    width: 70,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.TOT_COST != null && e.TOT_COST != "" && e.TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "결의상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                        } else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "50"){
                            status = "결재중"
                        } else {
                            status = "작성중"
                        }

                        return status;
                    }
                }, {
                    title: "승인상태",
                    width: 60,
                    template: function(e){
                        var status = "";
                        if(e.DOC_STATUS == "100"){
                            status = "결재완료";
                            if(e.REQ_END_DE != null && e.REQ_END_DE != "" && e.REQ_END_DE != undefined){
                                if(e.RE_STAT == "Y"){
                                    status = "승인";
                                } else {
                                    status = "미결";
                                }
                            } else {
                                if(e.EVI_TYPE == 1 || e.EVI_TYPE == 2 || e.EVI_TYPE == 3){
                                    status = "승인";
                                } else {
                                    status = "미결";
                                }
                            }
                        } else {
                            status = "미결";
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
        exnpList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDate : $("#searchDate").val(),
            searchDept : $("#searchDept").val(),
            searchDept2 : $("#searchDept2").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            strDe : $("#exnpStrDe").val(),
            endDe : $("#exnpEndDe").val(),
            payAppType : 1
        }

        exnpList.mainGrid("/pay/getExnpList", exnpList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key, paySn, status){
        var url = "/payApp/pop/regExnpPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regExnpPop.do?payAppSn=" + paySn + "&exnpSn=" + key;
        }

        if(status != null && status != ""){
            url = url + "&status=" + status;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}