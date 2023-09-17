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
        let searchArr = [
            {text: "제목", value: "1"},
            {text: "문서번호", value: "2"},
            {text: "시행일자", value: "3"},
            {text: "수신처", value: "4"},
            {text: "발송일자", value: "5"},
            {text: "담당자", value: "6"},
            {text: "비고", value: "7"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="docuList.documentPopup();">' +
                            '	<span class="k-button-text">문서등록</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: docuList.onDataBound,
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
                    width: "20%",
                    template : function(row){
                        if (row.DEL_STS == 1) {
                            return "<span style='text-decoration: none;' >"+row.DOCUMENT_TITLE_NAME+"</span>";
                        }else if(row.DEL_STS == 10){
                            return "<span style='text-decoration: line-through; cursor: pointer; ' onclick=\"docuList.tmpDelCancel('" +row.DOCUMENT_SN + "', '" + row.DEL_STS + "', '" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">"+row.DOCUMENT_TITLE_NAME+"</span>";
                        }
                    }
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
                        if(row.REMARK_CN != "") {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'>보기</span>";
                        }
                    }
                }, {
                    title: "삭제",
                    width: "5%",
                    template: function(row){
                        return "<button type=\"button\" class=\"k-grid-button k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"docuList.tmpDel('" + row.DOCUMENT_SN + "', '" + row.DEL_STS + "','" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">삭제</button>";
                    }
                }]
        }).data("kendoGrid");
    },

    showEtcDiv: function(DOCUMENT_SN){
        console.log(DOCUMENT_SN);

        let html = "<div class=\"edcDiv\" style=\"width: 800px; height: 40px; border: 1px solid gray; background-color: aliceblue\"></div>";
        $(this).closest("tr").append(html);
    },

    hideEtcDiv: function(DOCUMENT_SN){
        console.log("out");
    },

    documentPopup: function(){
        var url = "/Inside/pop/documentPop.do";
        var name = "popup test";
        var option = "width = 750, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },
    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    tmpDel: function (docSn, delSts, docFirstNum, docSecondNum) {
        if (delSts == 1) {
            if (confirm("문서번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 삭제하시겠습니까?\n삭제된 문서는 복원이 가능합니다.")) {
                $.ajax({
                    url: "/inside/delDocumentList",
                    data: {
                        DOCUMENT_SN: docSn,
                        DEL_STS: delSts,
                        DOCUMENT_FIRST_NUMBER: docFirstNum,
                        DOCUMENT_SECOND_NUMBER: docSecondNum
                    },
                    type: "post",
                    datatype: "json",
                    success: function () {
                        alert("삭제 완료되었습니다.");
                        docuList.gridReload();
                    }
                });
            }
        } else if (delSts == 10) {
            if (confirm("문서번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 완전히 삭제하시겠습니까?\n삭제된 문서는 복원이 불가능합니다.")) {
                $.ajax({
                    url: "/inside/delFinalDocumentList",
                    data: {
                        DOCUMENT_SN: docSn,
                        DEL_STS: delSts,
                        DOCUMENT_FIRST_NUMBER: docFirstNum,
                        DOCUMENT_SECOND_NUMBER: docSecondNum
                    },
                    type: "post",
                    datatype: "json",
                    success: function () {
                        alert("최종 삭제 완료되었습니다.");
                        docuList.gridReload();
                    }
                });
            }
        }
    },

    tmpDelCancel: function (docSn, delSts, docFirstNum, docSecondNum) {
        if (confirm("문서번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 복원 하시겠습니까?")) {
            $.ajax({
                url: "/inside/delCancelDocumentList",
                data: {
                    DOCUMENT_SN: docSn,
                    DEL_STS: delSts,
                    DOCUMENT_FIRST_NUMBER: docFirstNum,
                    DOCUMENT_SECOND_NUMBER: docSecondNum
                },
                type: "post",
                datatype: "json",
                success: function () {
                    alert("복구 완료 되었습니다.");
                    docuList.gridReload();
                }
            })
        }
    },

    /* 등록대장 >> 수정Pop */
    onDataBound: function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            console.log(dataItem);
            console.log(dataItem.DOCUMENT_SN);

            /*const DOCUMENT_SN = dataItem.DOCUMENT_SN;*/
            docuList.documentInfoViewPop(dataItem.DOCUMENT_SN);
        });
    },

    documentInfoViewPop : function(key) {
        var url = "/Inside/pop/documentUpdatePop.do";
        if(key != null && key != ""){
            url = "/Inside/pop/documentUpdatePop.do?documentSn="+key;
        }
        var name = "documentInfoViewPop";
        var option = "width = 850, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }



}
