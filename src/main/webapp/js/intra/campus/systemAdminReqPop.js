const systemAdminReq = {
    init: function(){
        systemAdminReq.dataSet();
        systemAdminReq.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["reqText"])
        let levelDataSource = [
            {text: "LEVEL 0", value: "0"},
            {text: "LEVEL 1", value: "1"},
            {text: "LEVEL 2", value: "2"},
            {text: "LEVEL 3", value: "3"}
        ]
        customKendo.fn_dropDownList("level", levelDataSource, "text", "value", 2);
    },

    mainGrid: function(){
        let dataSourceA = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getCodeList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.campusGroupCodeId = "01";
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridA").kendoGrid({
            dataSource: dataSourceA,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionManagePop();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    systemAdminReq.global.largeCategoryId = dataItem.CAMPUS_DT_CODE;
                    systemAdminReq.global.largeCategoryName = dataItem.CAMPUS_DT_CODE_NM;
                    console.log(systemAdminReq.global.largeCategoryId);
                    console.log(systemAdminReq.global.largeCategoryName);
                    gridReload("categoryGridB");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllA" name="checkAllA" onclick="fn_checkAll(\'checkAllA\', \'largeCategoryPk\');"/>',
                    template : "<input type='checkbox' name='largeCategoryPk' class='largeCategoryPk'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "CAMPUS_DT_CODE_NM",
                    title: "분류명"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        let dataSourceB = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getEduCategoryList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.largeCategoryId = systemAdminReq.global.largeCategoryId == "" ? -1 : systemAdminReq.global.largeCategoryId;
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridB").kendoGrid({
            dataSource: dataSourceB,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionManagePop();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    systemAdminReq.global.eduCategoryId = dataItem.EDU_CATEGORY_ID;
                    systemAdminReq.global.eduCategoryName = dataItem.EDU_CATEGORY_NAME;
                    console.log(systemAdminReq.global.eduCategoryId);
                    console.log(systemAdminReq.global.eduCategoryName);
                    gridReload("categoryGridC");
                });
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllB" name="checkAllB" onclick="fn_checkAll(\'checkAllB\', \'categoryPk\');"/>',
                    template : "<input type='checkbox' name='categoryPk' class='categoryPk'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "EDU_CATEGORY_NAME",
                    title: "구분명"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");

        let dataSourceC = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getEduCategoryDetailList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.eduCategoryId = systemAdminReq.global.eduCategoryId == "" ? -1 : systemAdminReq.global.eduCategoryId;
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#categoryGridC").kendoGrid({
            dataSource: dataSourceC,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 541,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionManagePop();">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.assetCodePositionModChk()">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="classManage.fn_delBtn(1)">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" onclick="fn_checkAll(\'checkAllC\', \'categoryDetailPk\');"/>',
                    template : "<input type='checkbox' name='categoryDetailPk' class='categoryDetailPk'/>",
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width: 50
                }, {
                    field: "LEVEL_NAME",
                    title: "레벨",
                    width: 100
                }, {
                    field: "EDU_CATEGORY_DETAIL_NAME",
                    title: "항목명"
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            },
        }).data("kendoGrid");
    },

    saveBtn: function(){
        let level = $("#level").val();
        let levelName = "";
        let reqText = $("#reqText").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        if($("#type").val() == "C" && level == ""){ alert("레벨이 선택되지 않았습니다."); return; }
        if(reqText == ""){ alert("분류명이 작성되지 않았습니다."); return; }

        let data = {
            reqText: reqText,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if($("#type").val() == "A"){
            data.groupCode = 1;
            data.midleCode = "01";
            data.midleCodeName = "학습체계도_대분류";
        }
        if($("#type").val() == "B"){
            data.largeCategoryId = $("#largeCategoryId").val();
            data.largeCategoryName = $("#largeCategoryName").val();
        }
        if($("#type").val() == "C"){
            levelName = $("#level").data("kendoDropDownList").text();
            data.eduCategoryId = $("#eduCategoryId").val();
            data.eduCategoryName = $("#eduCategoryName").val();
            data.level = level;
            data.levelName = levelName;
        }

        if(!confirm("학습체계도를 저장하시겠습니까?")){
            return;
        }

        if($("#type").val() == "A"){
            systemAdminReq.setEduCode(data);
        }else if($("#type").val() == "B"){
            systemAdminReq.setEduCategory(data);
        }else if($("#type").val() == "C"){
            systemAdminReq.setEduCategoryDetail(data);
        }
    },

    setEduCode: function(data){
        $.ajax({
            url: "/campus/setEduCode",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridA");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategory: function(data){
        $.ajax({
            url: "/campus/setEduCategory",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridB");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategoryDetail: function(data){
        $.ajax({
            url: "/campus/setEduCategoryDetail",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridC");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}

function gridReload(str){
    $("#"+str).data("kendoGrid").dataSource.read();
}