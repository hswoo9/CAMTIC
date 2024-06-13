var recruitList = {

    global : {
        saveAjaxData : ""
    },

    init : function(){
        recruitList.dataSet();
        recruitList.gridReload();
    },

    dataSet : function() {
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
                { text: "전체", value: "" },
                { text: "모집분야", value: "1" },
                { text: "공고명", value: "2" },
                { text: "공고번호", value: "3" },
                { text: "지원자", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="delvAppBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="recruitList.recruitDraftingPop();">결재</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="recruitList.setRecruitDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="recruitList.recruitReqPop();">' +
                            '	<span class="k-button-text">채용공고등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "채용관리 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: recruitList.detailInit,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='recChk#=RECRUIT_INFO_SN#' name='recChk' value='#=RECRUIT_INFO_SN#'/>",
                    width: 50
                }, {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "RECRUIT_NUM",
                    title: "공고번호",
                    width : 100
                }, {
                    field: "RECRUIT_TITLE",
                    title: "공고명",
                    width: 350,
                    template : function (e){

                        return '<a href="javascript:void(0);" onclick="recruitList.recruitAdminPop(' + e.RECRUIT_INFO_SN + ');">'+e.RECRUIT_TITLE+'</a>';
                    }
                }, {
                    field: "START_DT",
                    title: "모집기간",
                    template: function(row) {
                        return row.START_DT+" ~ "+row.END_DT;
                    },
                    width: 240
                }, {
                    field: "JOB_TYPE",
                    title: "모집분야",
                    width: 200
                }, {
                    field: "careerType",
                    title: "경력",
                }, {
                    field : "RECRUITMENT",
                    title: "채용인원",
                    width : 70
                }, {
                    field : "APPLICATION_CNT",
                    title: "접수인원",
                    width : 70
                }, {
                    title: "서류심사",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN > 3){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'doc\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }, {
                    title: "면접심사",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN > 4){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitList.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'in\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "RECRUIT_STATUS_SN",
                    title: "상태",
                    width : 90,
                    template : function(e){
                        if(e.RECRUIT_STATUS_SN == "1"){
                            return "작성중";
                        }else if(e.RECRUIT_STATUS_SN == "2"){
                            return "접수중";
                        }else if(e.RECRUIT_STATUS_SN == "3"){
                            return "서류심사중";
                        }else if(e.RECRUIT_STATUS_SN == "4"){
                            return "면접심사중";
                        }else if(e.RECRUIT_STATUS_SN == "5"){
                            return "면접심사완료";
                        }else if(e.RECRUIT_STATUS_SN == "E"){
                            if(e.IN_SCREEN_CNT > 0){
                                return "채용완료";
                            }else{
                                return "미채용완료";
                            }
                        }
                    }
                }, /*{
                    title: "결재",
                    width : 90,
                    template : function(e){
                        return "<button type=\"button\" id=\"delvAppBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"recruitList.recruitDraftingPop('"+e.RECRUIT_INFO_SN+"')\">결재</button>";
                    }
                }*/
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=recChk]").prop("checked", true);
            else $("input[name=recChk]").prop("checked", false);
        });
    },

    gridReload : function(){
        console.log('채용관리 gridReload 함수 호출됨');

        var recruitYear = $("#recruitYear").val();

// 입력에서 날짜를 구문 분석하고 "yyyy-MM-dd" 형식으로 포맷합니다.
        if (recruitYear) {
            var dateObj = new Date(recruitYear);
            recruitYear = dateObj.toISOString().substr(0, 10);
        }
        recruitList.global.searchAjaxData = {
            recruitYear: $('#recruitYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val()
        };

        var recruitYear = recruitList.global.searchAjaxData.recruitYear;
        var searchType = recruitList.global.searchAjaxData.searchType;
        var searchVal = recruitList.global.searchAjaxData.searchVal;

        console.log('recruitYear: ' + recruitYear);
        console.log('SearchType: ' + searchType);
        console.log('Search Text: ' + searchVal);

        recruitList.mainGrid("inside/getRecruitList", recruitList.global.searchAjaxData);
    },

    recruitReqPop : function() {
        var url = "/Inside/pop/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function(e) {
        var url = "/inside/pop/recruitAdminPop.do?recruitInfoSn=" + e;
        var name = "recruitAdminPop";
        var option = "width=1750, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    detailInit : function(e){
        var detailRow = e.detailRow;

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            pageSize: 10,
            filter: { field: "RECRUIT_INFO_SN", operator: "eq", value: e.data.RECRUIT_INFO_SN },
            schema : {
                data: function (data) {
                    return e.data.recruitAreaList;
                },
                total: function (data) {
                    return de.data.recruitAreaList.length;
                },
            }
        });

        detailRow.find(".subGrid").kendoGrid({
            dataSource: e.data.recruitAreaList,
            scrollable: false,
            sortable: true,
            pageable: false,
            columns: [
                {
                    field: "JOB",
                    title: "모집분야",
                }, {
                    field: "DUTY",
                    title: "경력",
                }, {
                    field: "RECRUITMENT",
                    title: "채용인원",
                }, {
                    field: "APPLICATION_CNT",
                    title: "접수인원",
                }, {
                    field: "DOC_SCREEN_CNT",
                    title: "서류심사",
                }, {
                    field: "IN_SCREEN_CNT",
                    title: "면접심사",
                }
            ]
        });
    },

    recruitDetailPop : function (e) {
        var url = "/inside/pop/recruitDetailPop.do?recruitInfoSn="+e;
        var name = "recruitDetailPop";
        var option = "width=1000, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    screenViewPop : function(sn, e){
        var url = "/inside/pop/screenViewPop.do?recruitInfoSn=" + sn + "&type=" + e;
        var name = "screenViewPop";
        var option = "width=1000, height=300, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    getEvalUrlSet : function(r, e){
        if(e == "doc"){
            var url = "/evaluation/evalLogin.do?recruitInfoSn=" + r + "&type=" + e;
            var name = "evalLogin";
            var option = "width=500, height=275, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else{
            if(location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("localhost") > -1){
                alert("http://localhost:8090/evaluation/evalLogin.do?recruitInfoSn=" + r + "&type=" + e)
            }else if(location.host.indexOf("218.158.231.186") > -1){
                alert("http://218.158.231.186/evaluation/evalLogin.do?recruitInfoSn=" + r + "&type=" + e)
            }
        }
    },

    setRecruitDel : function(){
        if($("input[name='recChk']:checked").length == 0){
            alert("삭제할 채용공고를 선택해주세요.");
            return
        }

        if(confirm("선택한 채용공고를 삭제하시겠습니까?")){
            var recruitInfoSn = "";

            $.each($("input[name='recChk']:checked"), function(){
                recruitInfoSn += "," + $(this).val()
            })

            recruitList.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                recruitInfoSn : recruitInfoSn.substring(1)
            }

            var result = customKendo.fn_customAjax("/inside/setRecruitDel.do", recruitList.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                recruitList.gridReload();
            }
        }
    },

    recruitDraftingPop : function(){

        if($("input[name='recChk']:checked").length == 0){
            alert("채용공고를 선택해주세요.");
            return
        }

        var pk = "";
        $.each($("input[name='recChk']:checked"), function(){
            pk += "," + $(this).val()
        })

        var url = "/inside/pop/recruitDraftingPop.do?recruitInfoSn=" + pk.substring(1);
        var name = "recruitDraftingPop";
        var option = "width=1208, height=598, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
