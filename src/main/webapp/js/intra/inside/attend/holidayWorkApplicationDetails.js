var holidayWorkApplicationDetails ={
    global: {
        now : new Date(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init: function(){
        holidayWorkApplicationDetails.dataSet();
        holidayWorkApplicationDetails.mainGrid();
    },

    dataSet : function() {

        let data = {
            mcCode : holidayWorkApplicationDetails.global.mcCode,
            mdCode : holidayWorkApplicationDetails.global.mdCode,
            empSeq : holidayWorkApplicationDetails.global.empSeq
        }

        const ds = holidayWorkApplicationDetails.global.vacGubun;



        customKendo.fn_datePicker("workDay", '', "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["searchText"]);


        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "승인", value: "Y" },
                { text: "반려", value: "E" }
            ],
            index: 0
        });


    },


    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/Inside/holidayWorkApplicationDetails.do',
                    type : "post"
                },
                parameterMap: function(data) {
                    data.workDay = $("#workDay").val();
                    data.status = $("#status").val();
                    // data.searchType = $("#searchType").val();
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
            dataBound: function(e) {
                var gridData = this.dataSource.view(); // 현재 페이지의 데이터 가져오기
                console.log("Kendo UI Grid 데이터:", gridData);
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplicationDetails.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : holidayWorkApplicationDetails.onDataBound,
            columns: [

                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: "80px"
                },
                {
                    field:"EMP_NAME_KR",
                    title:"성명",
                    width:"100px"
                },
                {
                    title:"구분",
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    width:"100px"
                },
                {
                    field: "APPLY_DAY",
                    title: "신청일자",
                    width: "100px"
                },
                {
                    field: "SUBHOLIDAY_WORK_DAY",
                    title: "근로일자",
                    width: "100px"
                },{
                    field: "APPR_STAT",
                    title: "승인상태",
                    width: "100px",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "작성 중";
                        } else if(e.APPR_STAT == "Y"){
                            return "승인";
                        } else if(e.APPR_STAT =="C"){
                            return "제출";
                        } else if(e.APPR_STAT =="E"){
                            return "반려";
                        }
                    },
                    width: 200,
                }, {
                    title: "신청자문서",
                    width: "100px",
                    template : function(e){
                        if(e.APPR_STAT == "Y"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else {
                            return "-";
                        }
                    }
                }, {
                    field: "ADMIN_APPR_STAT",
                    title: "담당자 승인상태",
                    width: "100px",
                    template : function(e){
                        if(e.ADMIN_APPR_STAT == "N"){
                            return "작성 중";
                        } else if(e.ADMIN_APPR_STAT == "Y"){
                            return "승인";
                        } else if(e.ADMIN_APPR_STAT =="C"){
                            return "제출";
                        } else if(e.ADMIN_APPR_STAT =="E"){
                            return "반려";
                        }
                    },
                }, {
                    title: "담당자문서",
                    width: "100px",
                    template : function(e){
                        if(e.ADMIN_APPR_STAT == "Y"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.ADMIN_DOC_ID+"\", \""+e.ADMIN_APPRO_KEY+"\", \""+e.ADMIN_DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else {
                            return "-";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(e) {
        var grid = e.sender;

        grid.element.find("tbody tr").each(function() {
            var dataItem = grid.dataItem(this);
            var docId = dataItem.DOC_ID;
            var menuCd = dataItem.DOC_MENU_CD;
            var approKey = dataItem.APPRO_KEY;

            $(this).dblclick(function() {
                var mod = "V";
                var url = '/approval/approvalDocView.do?docId=' + docId + '&menuCd=' + menuCd + '&mod=' + mod + '&approKey=' + approKey;
                var width = "1000";
                var height = "950";
                var windowX = Math.ceil((window.screen.width - width) / 2);
                var windowY = Math.ceil((window.screen.height - height) / 2);
                var pop = window.open(url, '결재 문서_' + approKey, "width=" + width + ", height=" + height + ", top=" + windowY + ", left=" + windowX + ", resizable=NO, scrollbars=NO");
            });
        });
    },



    gridReload: function (){
        console.log('gridReload 함수 호출됨');

        holidayWorkApplicationDetails.global.searchAjaxData = {
            workDay: $('#workDay').val(),
            status: $('#status').val(),
            searchType: $('#searchType').val(),
            searchText: $('#searchText').val()
        };

        var workDay = holidayWorkApplicationDetails.global.searchAjaxData.workDay;
        var status = holidayWorkApplicationDetails.global.searchAjaxData.status;
        var searchType = holidayWorkApplicationDetails.global.searchAjaxData.searchType;
        var searchText = holidayWorkApplicationDetails.global.searchAjaxData.searchText;

        console.log('workDay:' + workDay);
        console.log('status:' + status);
        console.log('searchType:' + searchType);
        console.log('searchText:' + searchText);

        holidayWorkApplicationDetails.mainGrid('/Inside/holidayWorkApplicationDetails.do', holidayWorkApplicationDetails.global.searchAjaxData);
    }


}