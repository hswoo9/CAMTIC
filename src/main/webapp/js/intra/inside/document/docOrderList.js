var docuOrderList = {
    init: function(){
        docuOrderList.dataSet();
        docuOrderList.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["searchText"]);
        let classArr = [
            {text: "제작", value: "1"},
            {text: "가공", value: "2"},
            {text: "사업", value: "3"},
            {text: "기타", value: "4"}
        ]
        customKendo.fn_dropDownList("classType", classArr, "text", "value", 1);
        let searchArr = [
            {text: "계약번호", value: "1"},
            {text: "계약제목(건명)", value: "2"},
            {text: "계약업체", value: "3"}
        ]
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);

        $("#searchText").keydown(function(event) {
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
                    url : '/inside/getDocuOrderList',
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
                        return '<button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="docuOrderList.docOrderPopup();">' +
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
                    width: "6%",
                    template: function(row) {
                        return row.DOCU_YEAR_SN+"-"+row.DOCU_NO;
                    }
                }, {
                    field: "COUNSEL_CODE",
                    title: "상품화 코드",
                    width: "10%"
                }, {
                    field: "DOCU_DE",
                    title: "계약 일시",
                    width: "8%"
                }, {
                    field: "PROJECT_NAME",
                    title: "계약명",
                    width: "23%",
                    template : function(row) {
                        return titleCut(row.PROJECT_NAME, 28);
                    }
                }, {
                    title: "계약 금액",
                    width: "10%",
                    template: function(row) {
                        if(row.PROJECT_MONEY != null){
                            var originalNumber = row.PROJECT_MONEY;
                            var convertedNumber = Math.round(originalNumber / 1000);
                            return convertedNumber.toString().toMoney() + " " +"원";
                        }else{
                            return "";
                        }
                    }

                }, {
                    title: "계약 기간",
                    width: "13%",
                    template: function(row) {
                        return row.START_DE+" ~ "+row.END_DE;
                    }
                }, {
                    field: "CO_NAME",
                    title: "계약 업체",
                    width: "10%"
                }, {
                    field: "DOCU_CHECK_NAME",
                    title: "계약서",
                    width: "5%",
                    template : function(row){
                        if(row.file_no != 0){
                            var fileName = row.file_org_name;
                            if(fileName.indexOf(".") > -1){
                            }else{
                                fileName = row.file_org_name + "." + row.file_ext;
                            }
                            return '<a href=\"javascript:docuOrderList.fileDown(\''+ row.file_path + row.file_uuid +'\',\''+ fileName +'\');\">있음</a>';
                        }else{
                            return '없음';
                        }

                    }
                }, {
                    field: "",
                    title: "납품서",
                    width: "5%",
                    template : function(row){
                        if(row.file_no2 != null && row.file_no2 != 0){
                            var fileName = row.file_org_name2;
                            if(fileName.indexOf(".") > -1){
                            }else{
                                fileName = row.file_org_name2 + "." + row.file_ext2;
                            }
                            return '<a href=\"javascript:docuOrderList.fileDown(\''+ row.file_path2 + row.file_uuid2 +'\',\''+ fileName +'\');\">있음</a>';
                        }else{
                            return '없음';
                        }

                    }
                }]
        }).data("kendoGrid");
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    docOrderPopup: function(){
        var url = "/Inside/pop/docOrderPop.do";
        var name = "popup test";
        var option = "width = 1100, height = 680, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    fileDown : function(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
        });
    }
}
