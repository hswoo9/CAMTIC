var docuList = {
    init: function(){
        docuList.dataSet();
        docuList.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        let partArr = [
            { text: "미래전략기획본부", value: "56" },
            { text: "R&BD사업본부", value: "51" },
            { text: "기업성장지원본부", value: "52" },
            { text: "일자리혁신지원센터", value: "58" },
            { text: "우주항공사업부", value: "54" },
            { text: "드론사업부", value: "55" },
            { text: "스마트제조사업부", value: "53" },
            { text: "경영지원실", value: "57" }
        ]
        customKendo.fn_dropDownList("documentPart", partArr, "text", "value", 1);

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "제목", value: "1"},
                {text: "문서번호", value: "2"},
                {text: "시행일자", value: "3"},
                {text: "수신처", value: "4"},
                {text: "발송일자", value: "5"},
                {text: "담당자", value: "6"},
                {text: "비고", value: "7"}
            ],
            index: 0
        });
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getDocumentList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.docuType = 1;
                    data.documentPart = $("#documentPart").val();
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
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
                    title: "문서번호",
                    width: "20%",
                    template: function(row){
                        return row.DOCUMENT_FIRST_NUMBER+"-"+row.DOCUMENT_SECOND_NUMBER;
                    }
                }, {
                    field: "EFFECTIVE_DATE",
                    title: "시행 일자",
                    width: "15%"
                }, {
                    field: "RECEIVE_NAME",
                    title: "수신처(수신 기관)",
                    width: "15%"
                }, {
                    field: "DOCUMENT_TITLE_NAME",
                    title: "제목",
                    width: "20%"
                }, {
                    field: "SHIPMENT_DATE",
                    title: "발송 일자",
                    width: "10%"
                }, {
                    field: "MANAGER_NAME",
                    title: "담당자",
                    width: "10%"
                }, {
                    title: "비고",
                    width: "5%",
                    template: function(row){
                        if(row.ETC_CN != "") {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'>보기</span>";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    showEtcDiv: function(documentSn){
        console.log(documentSn);

        let html = "<div class=\"edcDiv\" style=\"width: 800px; height: 40px; border: 1px solid gray; background-color: aliceblue\"></div>";
        $(this).closest("tr").append(html);
    },

    hideEtcDiv: function(documentSn){
        console.log("outo");
    },

    documentPopup: function(){
        var url = "/Inside/pop/documentPop.do";
        var name = "popup test";
        var option = "width = 750, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
