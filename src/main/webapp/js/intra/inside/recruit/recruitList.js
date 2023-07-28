var recruitList = {

    init : function(){
        recruitList.dataSet();
        recruitList.mainGrid();
    },

    dataSet() {
        $("#recruitYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "구분", value: "" },
                { text: "모집분야", value: "1" },
                { text: "공고명", value: "2" },
                { text: "공고번호", value: "3" },
                { text: "지원자", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : 'inside/getRecruitList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    console.log(data.list);
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">채용통계 조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">결재상신</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recruitList.recruitReqPop();">' +
                            '	<span class="k-button-text">채용공고등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="recruitList.recruitAdminPop();">' +
                            '	<span class="k-button-text">채용공고관리</span>' +
                            '</button>';
                    }
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
                    title: "순번"
                }, {
                    field: "RECRUIT_NUM",
                    title: "공고번호"
                }, {
                    field: "RECRUIT_TITLE",
                    title: "공고명"
                }, {
                    title: "모집기간",
                    template: function(row) {
                        return row.START_DT+" "+row.START_TIME+" ~ "+row.END_DT+" "+row.END_TIME;
                    },
                    width: 350
                }, {
                    field: "JOB_POSITION_ETC",
                    title: "모집분야"
                }, {
                    title: "경력",
                    template: function(row) {
                        return "-";
                    }
                }, {
                    title: "채용인원",
                    template: function(row) {
                        return "-";
                    }
                }, {
                    title: "접수인원",
                    template: function(row) {
                        return "-";
                    }
                }, {
                    field: "",
                    title: "서류심사",
                    template: function(row) {
                        return "-";
                    }
                }, {
                    field: "",
                    title: "면접심사",
                    template: function(row) {
                        return "-";
                    }
                }, {
                    field: "RECRUIT_STATUS_TEXT",
                    title: "상태"
                }
            ]
        }).data("kendoGrid");
    },

    recruitReqPop : function() {
        var url = "/Inside/pop/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1400, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function() {
        var url = "/Inside/pop/recruitAdminPop.do";
        var name = "recruitAdminPop";
        var option = "width=1400, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
