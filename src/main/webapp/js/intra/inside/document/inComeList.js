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
            dataBound: regisList.dblclick,
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
                    title: "제목",
                    width: "20%",
                    template : function(row) {
                        if (row.DEL_STS == 1) {
                            return "<span style='text-decoration: none;' >'"+row.DOCUMENT_TITLE_NAME+"'</span>";
                        }else if(row.DEL_STS == 10){
                            return "<span style='text-decoration: line-through;' onclick=\"regisList.tmpDelCancel('" +row.DOCUMENT_SN + "', '" + row.DEL_STS + "', '" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">'"+row.DOCUMENT_TITLE_NAME+"'</span>";
                        }
                    }
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
                }, {
                    title: "삭제",
                    width: "5%",
                    template: function(row){
                        return "<button type=\"button\" class=\"k-grid-button k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"regisList.tmpDel('" + row.DOCUMENT_SN + "', '" + row.DEL_STS + "','" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">삭제</button>";
                    }
                }]
        }).data("kendoGrid");
    },

    inComePopup : function(){
        var url = "/Inside/pop/inComePop.do";
        var name = "popup test";
        var option = "width = 850, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    tmpDel: function (docSn, delSts, docFirstNum, docSecondNum) {
        if (delSts == 1) {
            if (confirm("접수번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 삭제하시겠습니까?\n삭제된 문서는 복원이 가능합니다.")) {
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
                        alert("삭제 완료 되었습니다.");
                        regisList.gridReload();
                    }
                });
            }
        } else if (delSts == 10) {
            if (confirm("접수번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 완전히 삭제하시겠습니까?\n삭제된 문서는 복원이 불가능합니다.")) {
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
                        alert("최종 삭제 완료 되었습니다.");
                        regisList.gridReload();
                    }
                });
            }
        }
    },

    tmpDelCancel: function (docSn, delSts, docFirstNum, docSecondNum) {
        if (confirm("접수번호" + "[" + docFirstNum + "-" + docSecondNum + "]" + "(을)를 복원 하시겠습니까?")) {
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
                    regisList.gridReload();
                }
            })
        }
    },


    dblclick : function(){
        var grid = this;
        //접수대장 리스트 행 더블 클릭시 수정 팝업창

        grid.tbody.find("tr").dblclick(function (e) {
            var selectedItem = grid.dataItem($(this));
            console.log(selectedItem);
            console.log(selectedItem.DOCUMENT_SN);
            //pk
            regisList.inComeListPopup(selectedItem.DOCUMENT_SN);
        });
    },

    inComeListPopup : function(key) {
        var url = "/Inside/Pop/inComeUpdatePop.do";
        if(key != null && key != ""){
            url = "/Inside/Pop/inComeUpdatePop.do?documentSn="+key;
        }
        var name = "inComeUpdatePop";
        var option = "width = 850, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }





}
