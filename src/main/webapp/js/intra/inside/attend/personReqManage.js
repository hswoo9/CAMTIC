/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 근태신청현황
 */

var personReqManage = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(personReqManage.global.now.setMonth(personReqManage.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        $("#startDay, #endDay").attr("readonly", true);

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: '선택하세요', deptSeq: ''});

                $("#dept").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        var data = {
                            deptSeq : $("#dept").val()
                        }

                        $.ajax({
                            url : "/userManage/getDeptCodeList",
                            type : "post",
                            async: false,
                            data : data,
                            dataType : "json",
                            success : function(result){
                                var ds = result.list;
                                ds.unshift({text: '선택하세요', value: ''});

                                $("#team").kendoDropDownList({
                                    dataTextField: "text",
                                    dataValueField: "value",
                                    dataSource: ds,
                                    index: 0,
                                });
                            }
                        });
                    }
                });
            }
        });

        $("#team").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        $("#dept").data("kendoDropDownList").value($("#regDeptSeq").val())
        $("#dept").data("kendoDropDownList").trigger("change");
        $("#team").data("kendoDropDownList").value($("#regTeamSeq").val())

        $("#situation").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "승인 전", value: "승인 전"},
                {text: "결재 종결", value: "결재 종결"},
                {text: "결재 상신", value: "결재 상신"},
                {text: "승인", value: "승인"}
            ],
            index: 0
        });

        $("#attendanceItems").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "연가", value: "연가"},
                {text: "오전 반차", value: "오전 반차"},
                {text: "오후 반차", value: "오후 반차"},
                {text: "병가", value: "병가"},
                {text: "공가", value: "공가"},
                {text: "경조 휴가", value: "경조 휴가"},
                {text: "출산 휴가", value: "출산 휴가"},
                {text: "선택 근로", value: "선택 근로"},
                {text: "출장", value: "출장"},
                {text: "대체 휴가", value: "대체 휴가"},
                {text: "휴일 근로", value: "휴일 근로"}
            ],
            index: 0
        });

        personReqManage.gridReload();
    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                },
                {
                    name: '',
                    text: '삭제'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='ehiPk#=DOCUMENT_ID#' name='ehiPk' value='#=DOCUMENT_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "신청일",
                    width: "10%"
                }, {
                    field: "",
                    title: "기간",
                    width: "10%"
                }, {
                    field: "",
                    title: "부서",
                    width: "20%"
                }, {
                    field: "",
                    title: "직위",
                    width: "10%"
                }, {
                    field: "",
                    title: "성명",
                    width: "10%"
                }, {
                    field: "",
                    title: "근태항목",
                    width: "10%"
                }, {
                    field: "",
                    title: "상태",
                    width: "10%"
                }, {
                    field: "",
                    title: "신청 내역",
                    width: "20%"
                }]
        }).data("kendoGrid");
    },

    gridReload: function (){
        personReqManage.global.searchAjaxData = {
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            dept : $("#dept").val(),
            team : $("#team").val(),
            empSeq : $("#regEmpSeq").val()
        }

        personReqManage.mainGrid("/inside/getPersonAttendStat", personReqManage.global.searchAjaxData);
    },
}

