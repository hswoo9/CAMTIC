var docuContractList = {
    init: function(){
        docuContractList.dataSet();
        docuContractList.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        let classArr = [
            {text: "외주", value : "1"},
            /*{text: "용역", value: "2"},*/
            {text: "구매", value : "3"},
            {text: "임대차", value : "4"},
            {text: "시설공사", value : "5"},
            {text: "리스", value : "6"},
            {text: "인사", value : "7"},
            {text: "기타", value : "8"},
            {text: "용역", value : "9"}

        ]
        customKendo.fn_dropDownList("classType", classArr, "text", "value", 1);
        let searchArr = [
            {text: "계약번호", value: "1"},
            {text: "계약제목(건명)", value: "2"},
            {text: "계약업체", value: "3"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);

        $("#searchText").keyup(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });

        $("#searchType").keyup(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });

        $("#classType").keyup(function(event) {
            if (event.key === "Enter") {
                gridReload();
            }
        });

        $("#searchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });
    },

    mainGrid: function (){
        var dataSource = new kendo.data.DataSource({
            pageSize: 9999,
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getDocuContractList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.classType = $("#classType").val();
                    data.searchType = $("#searchType").val();
                    data.searchText = $("#searchText").val();
                    data.searchYear = $("#searchYear").val();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docuContractList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="docuContractList.docuPopup();">' +
                            '	<span class="k-button-text">문서등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docuContractList.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }
            ],
            /*excel : {
                fileName : "계약대장 목록.xlsx",
                filterable : true
            },
            excelExport: function (e) {
                const data = e.data;
                const columns = e.sender.columns;
                const sheet = e.workbook.sheets[0];
                const columnTemplates = new Array();
                const visibleColumns = columns.filter(col => !col.hidden);
                const elem = document.createElement("div");

                for (let i=0; i<columns.length; i++){
                    if (!columns[i].hidden && columns[i].field){
                        visibleColumns.push(columns[i]);
                    }
                }

                for (let i=0; i<visibleColumns.length; i++){
                    if (visibleColumns[i].template){
                        columnTemplates.push({ cellIndex: i, template: kendo.template(visibleColumns[i].template) });
                    }
                }

                for (let i=1; i<sheet.rows.length; i++){
                    let footCk = false;
                    const row = sheet.rows[i];
                    const dataItem = data[i - 1];
                    for (let j=0; j<columnTemplates.length; j++){

                        const columnTemplate = columnTemplates[j];

                        if(row == null || row.type == null){
                            continue;
                        }if(row.type == "footer"){
                            footCk = true;
                        }else{
                            elem.innerHTML = columnTemplate.template(dataItem);
                            if (row.cells[columnTemplate.cellIndex] != undefined){
                                // 계약금액 처리
                                if(columnTemplate.cellIndex == 6){
                                    let moneyValue = dataItem.PROJECT_MONEY;
                                    if(moneyValue != null){
                                        moneyValue = Math.round(moneyValue);
                                        row.cells[columnTemplate.cellIndex].value = moneyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    } else {
                                        row.cells[columnTemplate.cellIndex].value = "";
                                    }
                                } else if(columnTemplate.cellIndex == 9){
                                //문서 처리
                                    let fileValue = dataItem.file_no;
                                    if(fileValue != null){
                                        row.cells[columnTemplate.cellIndex].value = "0";
                                    }else{
                                        row.cells[columnTemplate.cellIndex].value = "X";
                                    }
                                } else {
                                    row.cells[columnTemplate.cellIndex].value = elem.textContent.toString() || elem.innerText || "";
                                }
                            }
                        }
                    }
                    if(footCk){
                        for (let i=0; i<visibleColumns.length; i++){
                            row.cells[i].value = "";
                        }
                    }
                }
            },*/
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 50,
                },{
                    field: "METHOD_NAME",
                    title: "계약방법",
                    width: 60,
                },{
                    field: "CLASS_NAME",
                    title: "구분",
                    width: 60,
                }, {
                    field: "DOCU_NUM",
                    title: "계약 번호",
                    width: 70,
                    template: function(row) {
                        return row.DOCU_YEAR_SN+"-"+row.DOCU_NO;
                    }
                }, {
                    field: "DOCU_DE",
                    title: "계약 일시",
                    width: 80,
                }, {
                    field: "PROJECT_NAME",
                    title: "계약건명",
                    width: 250,
                    template : function(e){
                        if (e.DEL_STS == 1) {
                            return '<div style="text-align: left; text-decoration: none; font-weight: bold; cursor: pointer" onclick="docuContractList.docuPopup(' + e.DOCUMENT_CONTRACT_SN + ', ' + e.CLASS_SN + ')">' + titleCut(e.PROJECT_NAME, 36) + '</div>';
                        }else if(e.DEL_STS == 10){
                            return '<div style="text-align: left; text-decoration: line-through; text-decoration-color:red; font-weight: bold; cursor: pointer" onclick="docuContractList.docuPopup(' + e.DOCUMENT_CONTRACT_SN + ', ' + e.CLASS_SN  + ')">' + titleCut(e.PROJECT_NAME, 36) + '</div>';
                        }

                    },
                }, {
                    field: "PROJECT_MONEY",
                    title: "계약 금액",
                    width: 100,
                    attributes: { style: "text-align: right" },
                    template : function(e) {
                        if(e.PROJECT_MONEY != null){
                            var originalNumber = e.PROJECT_MONEY;
                            var convertedNumber = Math.round(originalNumber);

                           return convertedNumber.toString().toMoney() + " " +"원";
                        }else{
                            return "";
                        }
                    }
                }, {
                    title: "계약 기간",
                    width: 120,
                    template: function(row) {
                        return row.START_DE+" ~ "+row.END_DE;
                    }
                }, {
                    field: "CO_NAME",
                    title: "계약 업체(자)",
                    width: 120
                }, {
                    title: "문서",
                    width: 50,
                    template : function(row){
                        if(row.file_no != null){
                            var fileName = row.file_org_name;
                            if(fileName.indexOf(".") > -1){
                            }else{
                                fileName = row.file_org_name + "." + row.file_ext;
                            }
                            return '<a href=\"javascript:docuContractList.fileDown(\''+ row.file_path + row.file_uuid +'\',\''+ fileName +'\');\">보기</a>';
                        }else{
                            return '';
                        }

                    }
                }, {
                    field: "REMARK_CN",
                    title: "비고",
                    width: 50,
                    template: function(row){
                        if(row.ETC_CN != "") {
                            return "<span onmouseover='docuContractList.showEtcDiv(\""+row.DOCUMENT_CONTRACT_SN+"\")' onmouseout='docuContractList.hideEtcDiv(\""+row.DOCUMENT_CONTRACT_SN+"\")'>보기</span>";
                        }
                    }
                }, {
                    title: "삭제",
                    width: "10%",
                    template: function(row) {
                        if(row.DEL_STS == '10'){
                            let buttonHtml = '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docuContractList.tmpDel(\'' + row.DOCUMENT_CONTRACT_SN + '\', \'' + row.DEL_STS + '\', \'' + row.DOCU_YEAR_SN + '\', \'' + row.DOCU_NO + '\')">삭제</button>';
                            buttonHtml += '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-left:10px;" onclick="docuContractList.tmpDelCancel(\'' + row.DOCUMENT_CONTRACT_SN + '\', \'' + row.DEL_STS + '\', \'' + row.DOCU_YEAR_SN + '\', \'' + row.DOCU_NO + '\')">복원</button>';
                            return buttonHtml;
                        }else{
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docuContractList.tmpDel(\'' + row.DOCUMENT_CONTRACT_SN + '\', \'' + row.DEL_STS + '\', \'' + row.DOCU_YEAR_SN + '\', \'' + row.DOCU_NO + '\')">삭제</button>';
                        }
                    }
                }
            ]
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

    docuPopup: function(documentContractSn, classSn){
        var url = "/Inside/Pop/docuPop.do";
        if(documentContractSn != null){
            url += "?documentContractSn="+documentContractSn + "&classSn=" + classSn;
        }
        var name = "popup test";
        var option = "width = 1000, height = 750, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fileDown : function(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
        });
    },

    tmpDel: function (docSn, delSts, docuYearSn, docuNo) {
        if (delSts == 1) {
            if (confirm("계약번호" + "[" + docuYearSn + "-" + docuNo + "]" + "(을)를 삭제하시겠습니까?\n삭제된 문서는 복원이 가능합니다.")) {
                $.ajax({
                    url: "/inside/setDocuContractDel",
                    data: {
                        documentContractSn: docSn,
                        delSts: 10,
                    },
                    type: "post",
                    datatype: "json",
                    success: function () {
                        alert("삭제 완료 되었습니다.");
                        docuContractList.gridReload();
                    }
                });
            }
        } else if (delSts == 10) {
            if (confirm("계약번호" + "[" + docuYearSn + "-" + docuNo + "]" + "(을)를 완전히 삭제하시겠습니까?\n삭제된 문서는 복원이 불가능합니다.")) {
                $.ajax({
                    url: "/inside/setDocuContractDel",
                    data: {
                        documentContractSn: docSn,
                        delSts: 999
                    },
                    type: "post",
                    datatype: "json",
                    success: function () {
                        alert("최종 삭제 완료 되었습니다.");
                        docuContractList.gridReload();
                    }
                });
            }
        }
    },

    tmpDelCancel: function (docSn, delSts, docuYearSn, docuNo) {
        if (confirm("계약번호" + "[" + docuYearSn + "-" + docuNo + "]" + "(을)를 복원 하시겠습니까?")) {
            $.ajax({
                url: "/inside/setDocuContractDel",
                data: {
                    documentContractSn: docSn,
                    delSts: 1,
                },
                type: "post",
                datatype: "json",
                success: function () {
                    alert("복원 완료 되었습니다.");
                    docuContractList.gridReload();
                }
            })
        }
    },

    hiddenGrid: function(url, params){
        $("#hiddenGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params, 99999),
            sortable: true,
            selectable: "row",
            height: 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "연번",
                    width: 50
                },{
                    field: "METHOD_NAME",
                    title: "계약방법",
                    width: 60
                },{
                    field: "CLASS_NAME",
                    title: "구분",
                    width: 60
                }, {
                    field: "DOCU_NUM",
                    title: "계약 번호",
                    width: 100
                }, {
                    field: "DOCU_DE",
                    title: "계약 일시",
                    width: 80
                }, {
                    field: "PROJECT_NAME",
                    title: "계약건명",
                    width: 250
                }, {
                    field: "CUSTOM_PROJECT_MONEY",
                    title: "계약 금액",
                    width: 100
                }, {
                    field: "CONTRACT_PERIOD",
                    title: "계약 기간",
                    width: 200
                }, {
                    field: "CO_NAME",
                    title: "계약 업체(자)",
                    width: 200
                },{
                    field: "WARRANTY_INSURANCE_NAME",
                    title: "보증 보험",
                    width: 100
                },{
                    field: "WARRANTY_PERIOD",
                    title: "보증 기간",
                    width: 200
                }, {
                    field: "GUARANTEE_RATE_PER",
                    title: "보증 비율",
                    width: 100
                },{
                    field: "FILE_YN",
                    title: "문서",
                    width: 50
                }, {
                    field: "REMARK_CN",
                    title: "비고",
                    width: 300
                },{
                    field: "DOC_NO",
                    title: "문서번호",
                    width: 150
                }
            ]
        }).data("kendoGrid");
    },

    fn_excelDownload : function (){
        if (btnCk) {
            return;
        }
        btnCk = true;

        let data = {
            classType : $("#classType").val(),
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val(),
            searchYear : $("#searchYear").val()
        }

        docuContractList.hiddenGrid("/inside/getDocuContractExcelDownList", data);

        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "계약대장 목록.xlsx";
        });
        grid.saveAsExcel();

        setTimeout(() => {
            btnCk = false;
        }, 500);
    }


}
