var depoInfo = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        this.gridReload();
    },

    gridReload: function (){
        depoInfo.global.searchAjaxData = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        depoInfo.mainGrid("/project/getDepositList", depoInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#depositMainGrid").kendoGrid({
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
            dataBound: depoInfo.onDataBound,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="depoInfo.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">입금처리 요청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.gridReload()">' +
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
                    title: "구분",
                    width: 180,
                    template: function(e){
                        var gubun = "";
                        if(e.GUBUN == "a"){
                            gubun = "입금";
                        }else if(e.GUBUN == "b"){
                            gubun = "설치";
                        }
                        return gubun;
                    }
                }, {
                    title: "입금여부",
                    width: 120,
                    template: function(e){
                        var depoStat = "";
                        if(e.DEPO_STAT == "1"){
                            depoStat = "미입금";
                        }else if(e.DEPO_STAT == "2"){
                            depoStat = "입금완료";
                        }
                        return depoStat;
                    }
                }, {
                    title: "작성일자",
                    field: "APP_DE",
                    width: 100
                }, {
                    title: "공급가액",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(e.DEPO_AMT - (e.DEPO_AMT / 10)) + "</div>";
                    }
                }, {
                    title: "세엑",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(e.DEPO_AMT / 10) + "</div>";
                    }
                }, {
                    title: "합계",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(e.DEPO_AMT) + "</div>";

                    }
                }, {
                    title: "입금예정일",
                    template : function(e){
                        return e.PAY_INCP_DE;
                    }
                }, {
                    title: "입금일",
                    template : function(e){
                        return '';
                    }
                }, {
                    title: "입금액",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(0) + "</div>";
                    }
                }, {
                    title: "잔액",
                    template : function(e){
                        return "<div style='text-align:right;'>" + comma(e.DEPO_AMT) + "</div>";
                    }
                }, {
                    title: "상태",
                    width: 100,
                    template: function(e){
                        if(e.APPR_STAT == "Y"){
                            return "요청완료"
                        } else {
                            return "작성중"
                        }
                    },
                }, {
                    title: "기타",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depoInfo.fn_reqRegPopup(' + e.PAY_DEPO_SN + ')">보기</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound : function(){
        purcSum = 0;
    },

    fn_reqRegPopup : function(key){
        var url = "/pay/pop/regPayDepoPop.do";

        if(key != null && key != ""){
            url = "/pay/pop/regPayDepoPop.do?payDepoSn=" + key;
            if($("#pjtSn").val() != ""){
                url += "&pjtSn=" + $("#pjtSn").val();
            }
        } else {
            if($("#pjtSn").val() != ""){
                url += "?pjtSn=" + $("#pjtSn").val();
            }
        }

        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}