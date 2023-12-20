let purcSum = 0;

var purcInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        commonProject.setPjtStat();
        this.gridReload();
    },

    gridReload: function (){
        purcInfo.global.searchAjaxData = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        purcInfo.mainGrid("/purc/getPurcReqList.do", purcInfo.global.searchAjaxData);
        purcInfo.subGrid("/purc/getPjtPurcItemList", purcInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#purcInfoMainGrid").kendoGrid({
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
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcInfo.fn_reqPurcRegPopup()">' +
                            '	<span class="k-button-text">구매요청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
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
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        return e.PURC_REQ_PURPOSE
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>투자금액</div>";
                    }
                }, {
                    title: "구매",
                    width: 100,
                    template : function(e){
                        return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                    },
                    footerTemplate: function(){
                        const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
                        let invSum = 0;
                        for(let i=0; i<list.length; i++){
                            invSum += Number(list[i].EST_TOT_AMT);
                        }
                        return "<div style='text-align: right'>"+comma(invSum)+"</div>";
                    }
                }, {
                    title: "구매요청서",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        /** 구매요청서 */
                        if(e.DOC_STATUS == "100"){
                            status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        } else {
                            status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqPurcRegPopup(' + e.PURC_SN + ')">구매요청서</button>';
                        }

                        return status
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>잔여금액</div>";
                    }
                },
                {
                    title: "검수",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        console.log(e);
                        if(e.CLAIM_STATUS == "CAYSY"){
                            if(e.ORDER_DT != ""){
                                if(e.INSPECT_STATUS != "100"){
                                    status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                }else{
                                    status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                }
                            }
                        }

                        return status
                    },
                    footerTemplate: function(){
                        const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
                        let invSum = 0;
                        for(let i=0; i<list.length; i++){
                            invSum += Number(list[i].EST_TOT_AMT);
                        }

                        const leftList = customKendo.fn_customAjax("/purc/getProjectPurcReqList", {pjtSn: $("#pjtSn").val()}).list;
                        let purcSum2 = 0;
                        let leftSum = 0;
                        for(let i=0; i<leftList.length; i++){
                            purcSum2 += Number(leftList[i].PURC_ITEM_AMT);
                        }
                        leftSum = invSum - purcSum2;
                        return "<div style='text-align: right'>"+comma(leftSum)+"</div>";
                    }
                }, {
                    title: "지급신청",
                    width: 100,
                    template: function(e){
                        if(e.INSPECT_STATUS == "100"){
                            return '<button type="button" id="payBtn" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqRegPopup(' + e.PURC_SN + ')">지급신청서</button>';
                        }
                        return "";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>청구 합계</div>";
                    }
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(purcSum)+"</div>";
                    }
                }, {
                    title: "처리",
                    width: 100,
                    template: function(e){
                        if(e.DOC_STATUS == "0"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-error' onclick='purcInfo.fn_pjtPurcDel(" + e.PURC_SN + ")'>삭제</button>";
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    subGrid: function(url, params){
        $("#purcInfoSubGrid").kendoGrid({
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
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="purcInfo.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "품명",
                    field: "ITEM_NM",
                }, {
                    title: "규격",
                    field: "ITEM_STD",
                }, {
                    title: "수량",
                    field: "ITEM_EA",
                }, {
                    title: "단위",
                    field: "ITEM_UNIT",
                }, {
                    title: "단가",
                    field: "ITEM_UNIT_AMT",
                    template: function(row){
                        return fn_numberWithCommas(row.ITEM_UNIT_AMT);
                    }
                }, {
                    title: "업체",
                    field: "CRM_NM",
                }, {
                    title: "비고",
                    field: "RMK",
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 120,
                    template : function(e){
                        var status = "구매청구완료";
                        /** 구매요청서 */
                        if(e.INSPECT_YN == "Y"){
                            if(e.INSPECT_STATUS != "100"){
                                status = "검수요청중";
                            }else{
                                status = "<div style='font-weight: bold'>검수승인완료</div>";
                            }
                        }
                        return status
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_pjtPurcDel : function (purcSn){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        var result = customKendo.fn_customAjax("/purc/delPurcReq.do", {purcSn : purcSn});

        if(result.flag){
            alert("삭제 되었습니다.");
            purcInfo.gridReload();
        }
    },

    fn_reqPurcRegPopup : function (key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
            url = url + "&pjtSn=" + $("#pjtSn").val();
        } else {
            url = url + "?pjtSn=" + $("#pjtSn").val();
        }


        var name = "_blank";
        var option = "width = 1690, height = 820, top = 100, left = 600, location = no"
        var popup = window.open(url, name, option);
    },

    onDataBound : function(){
        purcSum = 0;
    },

    fn_inspectionPopup : function(key){
        var url = "/purc/pop/purcInspectionPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/purcInspectionPop.do?purcSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1690, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppPop.do?purcSn=" + key + "&reqType=purc";
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}

function gridReload(){
    purcInfo.mainGrid();
}