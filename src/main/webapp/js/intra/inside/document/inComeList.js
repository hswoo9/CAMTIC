var record = 0;

var regisList = {
    global : {
        searchAjaxData : ""
    },
    init: function(){
        regisList.dataSet();
        regisList.gridReload();
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
        let partArr = [
            {text: "캠틱종합기술원", value: "1"}
            // {text: "발전협의회", value: "2"}
        ]
        customKendo.fn_dropDownList("documentPart", partArr, "text", "value", 1);;

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptPart", deptDsA.rs, "dept_name", "dept_seq");

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

        $("#searchText").keydown(function(event) {
            if (event.key === "Enter") {
                regisList.gridReload();
            }
        });

        $("#searchType").keyup(function(event) {
            if (event.key === "Enter") {
                regisList.gridReload();
            }
        });

        $("#deptPart").keyup(function(event) {
            if (event.key === "Enter") {
                regisList.gridReload();
            }
        });
    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regisList.gridReload()">' +
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
                    template: "#= --record #",
                    title: "순번",
                    width: "5%"
                }, {
                    field: "SHIPMENT_DATE",
                    title: "접수 일자",
                    width: "8%"
                }, {
                    field: "RECEIVE_NAME",
                    title: "발신 기관",
                    width: "10%"
                }, {
                    field: "EFFECTIVE_DATE",
                    title: "시행 일자",
                    width: "8%"
                }, {
                    title: "접수 번호",
                    width: "8%",
                    template: function(row){
                        return row.DOCUMENT_FIRST_NUMBER+"-"+row.DOCUMENT_SECOND_NUMBER;
                    }
                }, {
                    title: "제목",
                    width: "35%",
                    template : function(row) {
                        if (row.DEL_STS == 1) {
                            return "<span style='text-decoration: none;' >"+titleCut(row.DOCUMENT_TITLE_NAME, 48)+"</span>";
                        }else if(row.DEL_STS == 10){
                            return "<span style='text-decoration: line-through; cursor: pointer;' onclick=\"regisList.tmpDelCancel('" +row.DOCUMENT_SN + "', '" + row.DEL_STS + "', '" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">"+titleCut(row.DOCUMENT_TITLE_NAME, 48)+"</span>";
                        }
                    }
                }, {
                    field: "MANAGER_NAME",
                    title: "접수자",
                    width: "8%"
                }, {
                    field: "DEPT_PART_TEXT",
                    title: "담당부서",
                    width: "10%"
                }, {
                    title: "비고",
                    width: "7%",
                    template: function(row){
                        if(row.ETC_CN != "") {
                            return "<span onmouseover='docuList.showEtcDiv(\""+row.DOCUMENT_SN+"\")' onmouseout='docuList.hideEtcDiv(\""+row.DOCUMENT_SN+"\")'>보기</span>";
                        }
                    }
                }, {
                    title: "다운",
                    width: "5%",
                    template: function(row) {
                        if (row.file_uuid != null){
                            var fileName = row.file_org_name + '.' + row.file_ext;

                            return '<a style=\'color : blue;\' href=\"javascript:fileDown(\'' + row.file_path + row.file_uuid + '\',\'' + fileName + '\');\">다운로드</a>';

                        }else{
                            return "<span>없음</span>";
                        }
                    }
                }, {
                    title: "삭제",
                    width: "5%",
                    template: function(row){
                        return "<button type=\"button\" class=\"k-grid-button k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"regisList.tmpDel('" + row.DOCUMENT_SN + "', '" + row.DEL_STS + "','" + row.DOCUMENT_FIRST_NUMBER + "', '" + row.DOCUMENT_SECOND_NUMBER + "')\">삭제</button>";
                    }
                }],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    inComePopup : function(){
        var url = "/Inside/pop/inComePop.do";
        var name = "popup test";
        var option = "width = 850, height = 700, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    gridReload : function(){
        regisList.global.searchAjaxData = {
            docuType : 2,
            documentPart : $("#documentPart").val(),
            deptPart : $("#deptPart").val(),
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val(),
            start : $("#startDt").val(),
            end : $("#endDt").val()
        }

        regisList.mainGrid("/inside/getDocumentList", regisList.global.searchAjaxData);
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


    dblclick: function () {
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

    inComeListPopup: function (key) {
        var url = "/Inside/Pop/inComeUpdatePop.do";
        if (key != null && key != "") {
            url = "/Inside/Pop/inComeUpdatePop.do?documentSn=" + key;
        }
        var name = "inComeUpdatePop";
        var option = "width = 850, height = 700, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
