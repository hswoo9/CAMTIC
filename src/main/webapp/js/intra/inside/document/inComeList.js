var regisList = {
    init: function(){
        regisList.dataSet();
        regisList.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        let partArr = [
            {text: "캠틱종합기술원", value: "1"},
            {text: "발전협의회", value: "2"}
        ]
        customKendo.fn_dropDownList("documentPart", partArr, "text", "value", 1);;
        let deptPartArr = [
            {text: "전직원", value: "1"},
            {text: "경영지원실", value: "2"},
            {text: "R&BD사업본부", value: "3"},
            {text: "기업성장지원본부", value: "4"},
            {text: "사업부", value: "5"}
        ]
        customKendo.fn_dropDownList("deptPart", deptPartArr, "text", "value", 1);
        let searchTypeArr = [
            {text: "제목", value: "1"},
            {text: "접수번호", value: "2"},
            {text: "시행일자", value: "3"},
            {text: "발신기관", value: "4"},
            {text: "발송일자", value: "5"},
            {text: "접수자", value: "6"},
            {text: "비고", value: "7"},
            {text: "참조자", value: "8"}
        ]
        customKendo.fn_dropDownList("searchType", searchTypeArr, "text", "value", 1);
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getDocumentList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.docuType = 2;
                    data.documentPart = $("#documentPart").val();
                    data.deptPart = $("#deptPart").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regisList.inComePopup();">' +
                            '	<span class="k-button-text">문서등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: "5%"
                }, {
                    field: "SHIPMENT_DATE",
                    title: "접수 일자",
                    width: "10%"
                }, {
                    field: "RECEIVE_NAME",
                    title: "발신 기관",
                    width: "10%"
                }, {
                    field: "EFFECTIVE_DATE",
                    title: "시행 일자",
                    width: "10%"
                }, {
                    title: "접수 번호",
                    width: "10%",
                    template: function(row){
                        return row.DOCUMENT_FIRST_NUMBER+"-"+row.DOCUMENT_SECOND_NUMBER;
                    }
                }, {
                    field: "DOCUMENT_TITLE_NAME",
                    title: "제목",
                    width: "20%"
                }, {
                    field: "MANAGER_NAME",
                    title: "접수자",
                    width: "10%"
                }, {
                    field: "DEPT_PART_TEXT",
                    title: "담당부서",
                    width: "10%"
                }, {
                    title: "비고",
                    width: "10%",
                    template: function(row){
                        if(row.ETC_CN != "") {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'>보기</span>";
                        }
                    }
                }, {
                    title: "다운",
                    width: "5%",
                    template: function(row){
                        return "";
                    }
                }]
        }).data("kendoGrid");
    },

    inComePopup : function(){
        var url = "/Inside/pop/inComePop.do";
        var name = "popup test";
        var option = "width = 850, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
