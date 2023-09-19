var now = new Date();

var commissionerManage = {

    global : {
        searchAjaxData : ""
    },

    init : function(){
        commissionerManage.dataSet();
        commissionerManage.gridReload();
    },

    dataSet() {
        $("#expertise").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" }
            ],
            index: 0
        });

        $("#searchName").kendoTextBox();
        $("#searchComp").kendoTextBox();

    },

    mainGrid : function(url, params) {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/inside/getCommissionerList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
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
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="commissionerManage.commissionerReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '전체위원 다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='' name='' value=''/>",
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "연번"
                }, {
                    field: "NAME",
                    title: "성명"
                }, {
                    field: "GENDER",
                    title: "성별",
                    template: function(e){
                        if(e.GENDER != null){
                            if(e.GENDER == "M"){
                                return "남";
                            }else if(e.GENDER == "F"){
                                return "여";
                            }
                        }else{
                            return "-";
                        }
                    }
                }, {
                    field: "BELONG",
                    title: "기관(소속)"
                }, {
                    field: "DUTY_POSITION",
                    title: "직급(직책)"
                }, {
                    field: "TEL_NUM",
                    title: "휴대폰"
                }, {
                    field: "BMK",
                    title: "비고"
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function(){
        commissionerManage.global.searchAjaxData = {
            id : $("#id").val(),
            name : $("#name").val(),
            belong : $("#belong").val(),
        }

        commissionerManage.mainGrid("/inside/getCommissionerList", commissionerManage.global.searchAjaxData);
    },

    commissionerReqPop : function() {
        var url = "/Inside/pop/commissionerReqPop.do";
        var name = "recruitReqPop";
        var option = "width=900, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
