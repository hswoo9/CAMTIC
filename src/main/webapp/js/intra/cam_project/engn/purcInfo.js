let purcSum = 0;

var purcInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
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
                    }
                }, {
                    title: "구매",
                    width: 100,
                    template : function(e){
                        return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                    }
                }, {
                    title: "외주",
                    width: 100
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
                },
                // , {
                //     title: "구매청구서",
                //     field: "STATUS",
                //     width: 100,
                //     template : function(e){
                //         var status = "";
                //
                //         /** 구매청구서 */
                //         if(e.DOC_STATUS == "100" || e.DOC_STATUS == "101"){
                //             if(e.CLAIM_STATUS == "CAYSY"){
                //                 status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_reqRegPopup(' + e.PURC_SN + ')">구매청구서</button>';
                //             }else{
                //                 status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_reqRegPopup(' + e.PURC_SN + ')">구매청구서</button>';
                //             }
                //         }
                //
                //         return status
                //     },
                // },
                {
                    title: "검수",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        var status = "";
                        if(e.CLAIM_STATUS == "CAYSY"){
                            if(e.INSPECT_YN == "Y"){
                                if(e.INSPECT_STATUS != "100"){
                                    status = '<button type="button" class="k-button k-button-solid-base" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                }else{
                                    status = '<button type="button" class="k-button k-button-solid-info" onclick="purcInfo.fn_inspectionPopup(' + e.PURC_SN + ')">검수</button>';
                                }
                            }
                        }

                        return status
                    },
                    footerTemplate: "청구 합계"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        console.log(e)
                        if(e.CLAIM_STATUS == "CAYSY"){
                            purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        }
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(purcSum)+"</div>";
                    }
                }, {
                    title: "기타",
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
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}

function gridReload(){
    purcInfo.mainGrid();
}