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
            dataBound: purcInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="purcInfo.fn_reqRegPopup()">' +
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
                        return '<div onclick="purcInfo.fn_reqRegPopup(' + e.PURC_SN + ')" style="cursor : pointer">' + e.PURC_REQ_PURPOSE + '</div>'
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
                    title: "상태",
                    field: "STATUS",
                    width: 100,
                    template : function(e){
                        if(e.STATUS == "W"){
                            return "작성중"
                        }else if(e.STATUS == "C"){
                            return "요청완료"
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        purcSum  += Number(e.PURC_ITEM_AMT_SUM);
                        return "<div style='text-align: right'>"+comma(e.PURC_ITEM_AMT_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(purcSum)+"</div>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function (key){
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
    }

}