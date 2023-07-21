var archiveList = {
    init: function(){
        archiveList.dataSet();
        archiveList.mainGrid();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText"]);
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());
        let searchArr = [
            {text: "문서번호", value: "1"},
            {text: "부서명", value: "2"},
            {text: "문서위치", value: "3"},
            {text: "문서명", value: "4"},
            {text: "등록자", value: "5"}
        ]
        let stateArr = [
            {text: "보관", value: "1"},
            {text: "폐기", value: "2"}
        ]
        customKendo.fn_dropDownList("doclistState", stateArr, "text", "value", 1);
        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 1);
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getArchiveList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.mod = "manage";
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="archiveList.archiveReqPopup();">' +
                            '	<span class="k-button-text">문서고 등록</span>' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'carPk\');"/>',
                    template : "<input type='checkbox' name='carPk' class='carPk'/>",
                    width: 40
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "DOC_NUM",
                    title: "문서번호",
                    width: 200
                }, {
                    title: "부서",
                    width: 150,
                    template: function(row){
                        if (row.DEPT_NAME == "") {
                            return "전체";
                        }else {
                            return row.DEPT_NAME;
                        }
                    }
                }, {
                    title: "팀",
                    width: 150,
                    template: function(row){
                        if (row.TEAM_NAME == "") {
                            return "전체";
                        }else {
                            return row.TEAM_NAME;
                        }
                    }
                }, {
                    field: "VISIT",
                    title: "위치"
                }, {
                    field: "MANAGER_NAME",
                    title: "담당자",
                    width: 100
                }, {
                    field: "PRESERVATION_PERIOD",
                    title: "보존년한",
                    width: 100
                }, {
                    field: "DISPOSAL_YEAR",
                    title: "폐기년도",
                    width: 100
                }, {
                    title: "첨부파일",
                    width: 100
                }, {
                    title: "문서고 상태",
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    archiveReqPopup: function(){
        var url = "/Inside/pop/archiveReqPopup.do";
        var name = "archiveReqPopup";
        var option = "width = 1000, height = 520, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}