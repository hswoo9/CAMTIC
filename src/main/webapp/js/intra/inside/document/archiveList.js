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
            {text: "담당자", value: "5"}
        ]
        let stateArr = [
            {text: "보관", value: "1"},
            {text: "폐기예정", value: "2"},
            {text: "폐기", value: "3"}
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
                    data.searchDate = $("#searchDate").val();
                    data.doclistState = $("#doclistState").getKendoDropDownList().value();
                    data.searchType = $("#searchType").getKendoDropDownList().value();
                    /*if(searchType == 1) {
                        data.searchVal = "DOC_NUM"
                    }else if(searchType == 2) {
                        data.searchVal = "DEPT_NAME"
                    }else if(searchType == 3) {
                        data.searchVal = "VISIT"
                    }/!*else if(searchType == 4) {
                        data.searchText = ""
                    }*!/else if(searchType == 5) {
                        data.searchVal = "MANAGER_NAME"
                    }*/
                    data.searchText = $("#searchText").val();
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
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="archiveList.archiveReqPopup();">' +
                            '	<span class="k-button-text">문서고 등록</span>' +
                            '</button>';
                    }
                }, {
                    name: '',
                    text: '폐기',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="archiveList.selectChkScrap()">' +
                            '   <span class="k-button-text">폐기</span>' +
                            '</button>';
                    }
                }, /*{
                    name: '',
                    text: '선택 삭제',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="archiveList.selectChkDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },*/ {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: archiveList.dblclick,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="archiveList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template : "<input type='checkbox' id='archivePk#=ARCHIVE_INFO_SN#' name='archivePk' value='#=ARCHIVE_INFO_SN#'/>",
                    width: 40
                }, /*{
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50,
                    template: function(row){
                        if (row.DISPOSE_YN == "Y") {
                            return "<span style='text-decoration: line-through;'>"+row.ROW_NUM+"</span>";
                        }else {
                            return row.ROW_NUM;
                        }
                    }
                }, */{
                    field: "DOC_NUM",
                    title: "문서번호",
                    width: 200,
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.DOC_NUM+"</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.DOC_NUM+"</span>";
                        }else{
                            return row.DOC_NUM;
                        }
                    }
                }, {
                    title: "부서",
                    width: 150,
                    template: function(row){
                        if (row.DEPT_NAME == "") {
                            if (row.ACTIVE == "D") {
                                return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>전체</span>";
                            }else if(row.DISPOSE_YN == "Y"){
                                return "<span style='text-decoration: line-through;'>전체</span>";
                            }else{
                                return 전체;
                            }
                        }else {
                            if (row.ACTIVE == "D") {
                                return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.DEPT_NAME+"</span>";
                            }else if(row.DISPOSE_YN == "Y"){
                                return "<span style='text-decoration: line-through;'>"+row.DEPT_NAME+"</span>";
                            }else{
                                return row.DEPT_NAME;
                            }
                        }
                    }
                }, {
                    title: "팀",
                    width: 150,
                    template: function(row){
                        if (row.TEAM_NAME == "") {
                            if (row.ACTIVE == "D") {
                                return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>전체</span>";
                            }else if(row.DISPOSE_YN == "Y"){
                                return "<span style='text-decoration: line-through;'>전체</span>";
                            }else{
                                return 전체;
                            }
                        }else {
                            if (row.ACTIVE == "D") {
                                return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.TEAM_NAME+"</span>";
                            }else if(row.DISPOSE_YN == "Y"){
                                return "<span style='text-decoration: line-through;'>"+row.TEAM_NAME+"</span>";
                            }else{
                                return row.TEAM_NAME;
                            }
                        }
                    }
                }, {
                    field: "VISIT",
                    title: "위치",
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.VISIT+"</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.VISIT+"</span>";
                        }else{
                            return row.VISIT;
                        }
                    }
                }, {
                    field: "DOC_NAME",
                    title: "문서명",
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.DOC_NAME+"</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.DOC_NAME+"</span>";
                        }else{
                            return row.DOC_NAME;
                        }
                    }
                }, {
                    field: "MANAGER_NAME",
                    title: "담당자",
                    width: 100,
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.MANAGER_NAME+"</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.MANAGER_NAME+"</span>";
                        }else{
                            return row.MANAGER_NAME;
                        }
                    }
                }, {
                    field: "PRESERVATION_PERIOD",
                    title: "보존년한",
                    width: 100,
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.PRESERVATION_PERIOD+"년</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.PRESERVATION_PERIOD+"년</span>";
                        }else{
                            return row.PRESERVATION_PERIOD +"년";
                        }
                    }
                }, {
                    field: "DISPOSAL_YEAR",
                    title: "폐기년도",
                    width: 100,
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>"+row.DISPOSAL_YEAR+"</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>"+row.DISPOSAL_YEAR+"</span>";
                        }else{
                            return row.DISPOSAL_YEAR;
                        }
                    }
                }, {
                    title: "첨부파일",
                    width: 100,
                    template: function(row) {
                        if (row.file_no != 0) {
                            console.log(row);
                            var fileName = row.file_org_name;
                            if (fileName.indexOf(".") > -1) {
                            } else {
                                fileName = row.file_org_name + "." + row.file_ext;
                            }
                            if (row.ACTIVE == "D") {
                                return '<a style=\'text-decoration: line-through; text-decoration-color: red; color : red;\' href=\"javascript:fileDown(\'' + row.file_path + row.file_uuid + '\',\'' + fileName + '\');\">있음</a>';
                            }else if(row.DISPOSE_YN == "Y"){
                                return '<a style=\'text-decoration: line-through;\' href=\"javascript:fileDown(\'' + row.file_path + row.file_uuid + '\',\'' + fileName + '\');\">있음</a>';
                            }else{
                                return '<a style=\'color : blue;\' href=\"javascript:fileDown(\'' + row.file_path + row.file_uuid + '\',\'' + fileName + '\');\">있음</a>';
                            }
                        } else {
                            if (row.ACTIVE == "D") {
                                return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>없음</span>";
                            }else if(row.DISPOSE_YN == "Y"){
                                return "<span style='text-decoration: line-through;'>없음</span>";
                            }else{
                                return "<span style='color : red;'>없음</span>";
                            }
                        }
                    }
                }, {
                    title: "문서고 상태",
                    width: 100,
                    template: function(row){
                        if (row.ACTIVE == "D") {
                            return "<span style='text-decoration: line-through; text-decoration-color: red; color : red;'>폐기</span>";
                        }else if(row.DISPOSE_YN == "Y"){
                            return "<span style='text-decoration: line-through;'>폐기예정</span>";
                        }else{
                            return "보관";
                        }
                    }
                }
            ]
        }).data("kendoGrid");


    },

    dblclick : function(){
        const grid = this;
        //문서고 리스트 더블 클릭시 수정 팝업창

        grid.tbody.find("tr").dblclick(function (e) {
            var selectedItem = grid.dataItem($(this));
            console.log(selectedItem);
            console.log(selectedItem.ARCHIVE_INFO_SN);
            //pk
            archiveList.archiveUpdatePop(selectedItem.ARCHIVE_INFO_SN);

        });

    },

    selectChkDel : function (){
        if($("input[name='archivePk']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
            return;
        }

        var archivePk = new Array();
        $("input[name='archivePk']").each(function(){
            if(this.checked){
                archivePk.push(this.value);
            }
        })

        $.ajax({
            url : '/document/setAchiveDelete',
            data : {
                archivePk : archivePk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
                if(rs.code == "200"){
                    gridReload();
                }
            }
        });
        location.reload();
    },

    selectChkScrap : function (){
        if($("input[name='archivePk']:checked").length == 0){
            alert("폐기할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 데이터를 폐기하시겠습니까?")){
            return;
        }

        var archivePk = new Array();
        $("input[name='archivePk']").each(function(){
            if(this.checked){
                archivePk.push(this.value);
            }
        })

        $.ajax({
            url : '/document/setAchiveScrap',
            data : {
                archivePk : archivePk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
                if(rs.code == "200"){
                    gridReload();
                }
            }
        });
        location.reload();
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='archivePk']").prop("checked", true);
        }else{
            $("input[name='archivePk']").prop("checked", false);
        }
    },

    archiveReqPopup: function(){
        var url = "/Inside/pop/archiveReqPopup.do";
        var name = "archiveReqPopup";
        var option = "width = 1000, height = 520, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    archiveUpdatePop: function(data){
        console.log(data);
        var url = "/Inside/pop/archiveUpdatePop.do?pk="+data;
        var name = "archiveUpdatePop";
        var option = "width = 1000, height = 520, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    fileDown : function(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
        });
    }
}