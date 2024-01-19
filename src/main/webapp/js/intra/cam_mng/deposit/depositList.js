var depositList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },


    fn_defaultScript : function (){

        $("#eviType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "세금계산서", value: 1 },
                { text: "계산서", value: 2 },
                { text: "신용카드", value: 3 },
                { text: "현금영수증", value: 4 },
                { text: "미발행", value: 5 }
            ],
            index: 0,
            change : function (){
                depositList.gridReload();
            }
        });

        depositList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]

        customKendo.fn_dropDownList("searchKeyword", depositList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        depositList.gridReload();

    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                // {
                //     name: 'button',
                //     template: function(){
                //         return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="depositList.fn_reqRegPopup()">' +
                //             '	<span class="k-button-text">입금신청서 작성</span>' +
                //             '</button>';
                //     }
                // },
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depositList.gridReload()">' +
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
                    title: "구분",
                    width: 90,
                    template: function(e){
                        var eviType = "";
                        if(e.EVI_TYPE == "1"){
                            eviType = "세금계산서";
                        }else if(e.GUBUN == "2"){
                            eviType = "계산서";
                        } else if (e.GUBUN == "3"){
                            eviType = "신용카드";
                        } else if(e.GUBUN == "4"){
                            eviType = "현금영수증";
                        } else {
                            eviType = "미발행";
                        }
                        return eviType;
                    }
                }, {
                    title: "입금여부",
                    width: 90,
                    template: function(e){
                        var stat = "";
                        if(e.APPR_STAT == "Y") {
                            stat = "미입금";
                            if(e.TOT_AMT == 0){
                                stat = "미입금";
                            } else if(e.DEPO_AMT <= e.TOT_AMT){
                                stat = "입금완료";
                            } else if(e.DEPO_AMT > e.TOT_AMT){
                                stat = "부분입금";
                            }

                        } else {
                            stat = "미입금";
                        }

                        return stat;
                    }
                }, {
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 120,
                }, {
                    title: "입금여부",
                    width: 120,
                    template: function(e){
                        var depoStat = "";
                        if(e.DEPO_STAT == "1"){
                            depoStat = "전액";
                        }else if(e.DEPO_STAT == "2"){
                            depoStat = "선금";
                        } else if (e.DEPO_STAT == "3"){
                            depoStat = "중도금";
                        } else if (e.DEPO_STAT == "4"){
                            depoStat = "잔금";
                        }
                        return depoStat;
                    }
                }, {
                    title: "신청건명",
                    field: "DEPO_TITLE",
                    width: 250,
                    template: function(e){
                        var status = "";

                        return '<div style="cursor: pointer; font-weight: bold" onclick="depositList.fn_reqRegPopup('+e.PAY_DEPO_SN+', \''+status+'\', \'user\')">'+e.DEPO_TITLE+'</div>';
                    }
                }, {
                    title: "프로젝트 명",
                    field: "PJT_NM",
                    width: 130,
                    template: function(e){
                        var pjtNm = e.PJT_NM.toString().substring(0, 25);
                        return pjtNm + "...";
                    }
                }, {
                    title: "입금요청일",
                    width: 80,
                    field: "APP_DE"
                }, {
                    title: "입금예정일",
                    width: 80,
                    field: "PAY_INCP_DE"
                }, {
                    title: "입금완료일",
                    width: 80,
                    field: ""
                },{
                    title: "입금금액",
                    width: 80,
                    template: function(e){
                        var cost = e.TOT_COST;
                        if(e.RE_TOT_COST != null && e.RE_TOT_COST != "" && e.RE_TOT_COST != undefined){
                            return '<div style="text-align: right">'+comma(e.RE_TOT_COST)+'</div>';
                        } else {
                            return '<div style="text-align: right">'+0+'</div>';
                        }
                    }
                }, {
                    title: "상태",
                    width: 90,
                    template : function(e){
                        var status = "";
                        if(e.PAY_INCP_SN != null){
                            if(e.DOC_STATUS == '100'){
                                if(e.RE_CNT == 0){
                                    status = "수입결의완료"
                                } else {
                                    if(e.RE_TOT_COST == 0){
                                        status = "미결"
                                    } else {
                                        if(e.RE_TOT_COST == e.TOT_DET_AMT){
                                            status = "입금완료"
                                        } else {
                                            status = "부분입금"
                                        }
                                    }
                                }
                            } else if (e.DOC_STATUS != '0' && e.DOC_STATUS != '30' && e.DOC_STATUS != '40'){
                                status = "수입결의결재중"
                            } else {
                                status = "수입결의작성중"
                            }
                        } else {
                            if(e.APPR_STAT == 'Y'){
                                status = "요청완료";
                            } else {
                                status = "작성중"
                            }
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

    gridReload : function(){
        depositList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            eviType : $("#eviType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        depositList.mainGrid("/pay/getDepositList", depositList.global.searchAjaxData);
    },

    fn_reqRegPopup : function(key, status, auth){
        var url = "/pay/pop/regPayDepoPop.do";
        if(key != null && key != ""){
            url = "/pay/pop/regPayDepoPop.do?payDepoSn=" + key;
        }
        if(status != null && status != ""){
            url += "&status=" + status;
        }
        if(auth != null && auth != ""){
            url += "&auth=" + auth;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}