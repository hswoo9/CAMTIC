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
    },

    mainGrid: function (){
        var dataSource = new kendo.data.DataSource({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
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
                    title: "연번",
                    width: "5%"
                }, {
                    field: "CLASS_NAME",
                    title: "구분",
                    width: "5%"
                }, {
                    title: "계약 번호",
                    width: "8%",
                    template: function(row) {
                        return row.DOCU_YEAR_SN+"-"+row.DOCU_NO;
                    }
                }, {
                    field: "DOCU_DE",
                    title: "계약 일시",
                    width: "10%"
                }, {
                    field: "PROJECT_NAME",
                    title: "계약건명",
                    template : function(e){
                        if (e.DEL_STS == 1) {
                            return '<div style="text-align: left; text-decoration: none; font-weight: bold; cursor: pointer" onclick="docuContractList.docuPopup(' + e.DOCUMENT_CONTRACT_SN + ')">' + titleCut(e.PROJECT_NAME, 36) + '</div>';
                        }else if(e.DEL_STS == 10){
                            return '<div style="text-align: left; text-decoration: line-through; text-decoration-color:red; font-weight: bold; cursor: pointer" onclick="docuContractList.docuPopup(' + e.DOCUMENT_CONTRACT_SN + ')">' + titleCut(e.PROJECT_NAME, 36) + '</div>';
                        }

                    },
                    width: "29%"
                }, {
                    field: "PROJECT_MONEY",
                    title: "계약 금액",
                    width: "8%",
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
                    width: "15%",
                    template: function(row) {
                        return row.START_DE+" ~ "+row.END_DE;
                    }
                }, {
                    field: "CO_NAME",
                    title: "계약 업체(자)",
                    width: "15%"
                }, {
                    field: "",
                    title: "문서",
                    width: "5%",
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
                    title: "비고",
                    width: "5%",
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

    docuPopup: function(documentContractSn){
        var url = "/Inside/Pop/docuPop.do";
        if(documentContractSn != null){
            url += "?documentContractSn="+documentContractSn;
        }
        var name = "popup test";
        var option = "width = 1000, height = 550, top = 100, left = 200, location = no"
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
    

}
