var docuList = {
    init: function(){
        docuList.dataSet();
        docuList.mainGrid();
    },

    dataSet: function(){
        var now = new Date();

        $("#startDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#endDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() + 2))
        });

        customKendo.fn_textBox(["searchText"]);

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("documentPart", deptDsA.rs, "dept_name", "dept_seq");

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

        // Enter 키 이벤트 처리
        $("#searchText").keydown(function(event) {
            if (event.key === "Enter") {
                docuList.gridReload();
            }
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
                    data.start = $("#startDt").val();
                    data.end = $("#endDt").val();

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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    width: "13%",
                    template: function(row){
                        return row.DOCUMENT_FIRST_NUMBER+"-"+row.DOCUMENT_SECOND_NUMBER;
                    }
                }, {
                    field: "EFFECTIVE_DATE",
                    title: "시행 일자",
                    width: "10%"
                }, {
                    field: "RECEIVE_NAME",
                    title: "수신처(수신 기관)",
                    width: "10%"
                }, {
                    field: "DOCUMENT_TITLE_NAME",
                    title: "제목",
                    width: "35%",
                    template : function(row){
                        if (row.DEL_STS == 1) {
                            return "<span style='text-decoration: none;' >"+titleCut(row.DOCUMENT_TITLE_NAME, 48)+"</span>";
                        }else if(row.DEL_STS == 10){
                            return "<span style='text-decoration: line-through; cursor: pointer; ' onclick=\"docuList.tmpDelCancel('" +row.DOCUMENT_SN + "', '" + row.DEL_STS + "', '" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">"+titleCut(row.DOCUMENT_TITLE_NAME, 48)+"</span>";
                        }
                    }
                }, {
                    field: "SHIPMENT_DATE",
                    title: "발송 일자",
                    width: "10%"
                }, {
                    field: "MANAGER_NAME",
                    title: "담당자",
                    width: "8%"
                }, {
                    title: "비고",
                    width: "5%",
                    template: function(row){
                        if(row.REMARK_CN != "") {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'>보기</span>";
                        } else {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'></span>";
                        }
                    }
                }, {
                    title: "삭제",
                    width: "5%",
                    template: function(row){
                        return "";
                        // return "<button type=\"button\" class=\"k-grid-button k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"docuList.tmpDel('" + row.DOCUMENT_SN + "', '" + row.DEL_STS + "','" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">삭제</button>";
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

        alert("캠스팟 2.0의 문서번호는 전자결재에서 자동으로 생성됩니다.\n(최종결재 완료시)\n현재 등록대장 화면 삭제 예정입니다.");

        // var url = "/Inside/pop/documentPop.do";
        // var name = "popup test";
        // var option = "width = 750, height = 360, top = 100, left = 200, location = no"
        // var popup = window.open(url, name, option);
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
