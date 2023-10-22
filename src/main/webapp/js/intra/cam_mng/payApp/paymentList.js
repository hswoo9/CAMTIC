var paymentList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        paymentList.global.dropDownDataSource = [
            { text: "작성중", value: "1" },
            { text: "결재대기", value: "2" },
            { text: "결재완료", value: "3" },
        ]
        customKendo.fn_dropDownList("searchDept", paymentList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", paymentList.gridReload);

        paymentList.global.dropDownDataSource = [
            { text: "문서번호", value: "DOC_NO" },
        ]

        customKendo.fn_dropDownList("searchKeyword", paymentList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        paymentList.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="paymentList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">지급신청서 작성</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="paymentList.gridReload()">' +
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
                        return '<a onclick="paymentList.fn_reqRegPopup(' + e.PURC_SN + ')">' + e.PURC_REQ_PURPOSE + '</a>'
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
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        paymentList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            searchDept : $("#searchDept").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        paymentList.mainGrid("/purc/getPurcReqList.do", paymentList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
        }
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}