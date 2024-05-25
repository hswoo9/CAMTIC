/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 유연근무 - 유연근무 승인
 */

var workPlanApp = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(workPlanApp.global.now.setMonth(workPlanApp.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });

        $("#team").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "제조혁신팀", value: "제조혁신팀"},
                {text: "신기술융합팀", value: "신기술융합팀"},
                {text: "우주개발팀", value: "우주개발팀"},
                {text: "항공개발팀", value: "항공개발팀"},
                {text: "사업지원팀", value: "사업지원팀"},
                {text: "인재개발팀", value: "인재개발팀"},
                {text: "일자리창업팀", value: "일자리창업팀"},
                {text: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터"},
                {text: "지역산업육성팀", value: "지역산업육성팀"},
                {text: "경영지원팀", value: "경영지원팀"},
                {text: "미래전략기획팀", value: "미래전략기획팀"},
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"}
            ],
            index: 0
        });

        $("#name").kendoTextBox();

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "작성 중", value: "작성 중" },
                { text: "제출", value: "제출" },
                { text: "승인", value: "승인" },
                { text: "반려", value: "반려" }
            ],
            index: 0
        });

    },
    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/workPlan/getWorkPlanReqSubList.do",
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    data.startDay = $("#startDay").val();
                    data.endDay = $("#endDay").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    console.log(data.data);
                    return data.data;
                },
                total: function (data) {
                    return data.data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                    name: 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick=\'workPlanApp.updateApprStat("E");\'>' +
                            '	<span class="k-button-text">반려</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick=\'workPlanApp.updateApprStat("N");\'>' +
                            '	<span class="k-button-text">반려취소</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick=\'workPlanApp.updateApprStat("Y");\'>' +
                            '	<span class="k-button-text">승인</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick=\'workPlanApp.updateApprStat("N");\'>' +
                            '	<span class="k-button-text">승인취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='wpcPk#=WORK_PLAN_CHANGE_ID#' name='wpcPk' value='#=WORK_PLAN_CHANGE_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번",
                    width: "50px",
                }, {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "100px"
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: "80px"
                }, {
                    field: "WORK_PLAN_TYPE",
                    title: "근무 유형",
                    width: "80px"
                }, {
                    field: "REQUEST_DATE",
                    title: "신청일자",
                    width: "80px"
                }, {
                    field: "APPLY_DATE",
                    title: "적용기간",
                    width: "200px"
                }, {
                    field: "",
                    title: "진행 상태",
                    width: "70px",
                    template : function(row){
                        console.log(row);
                        if(row.apprStat == "N"){
                            return "대기";
                        }else if(row.apprStat == "Y"){
                            return "승인";
                        }else if(row.apprStat == "E"){
                            return "반려";
                        }else{
                            return "";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    updateApprStat : function(type){
        var checkGroup = $("input[name='wpcPk']:checked");
        var dataList = [];
        if(checkGroup.length > 0){
            $.each(checkGroup, function(i, v){
               dataList.push($(v).val());
            });
            console.log(dataList);
            var saveParams = {
                empSeq : $("#empSeq").val(),
                apprStat : type,
                selectList : JSON.stringify(dataList),
            };

            $.ajax({
                url: getContextPath() + "/updateApprStat",
                data: saveParams,
                dataType: "json",
                type: "POST",
                async: false,
                success: function (result) {
                    alert(result.data.message);
                    workPlanApp.gridReload();
                }
            });
        }else{
            alert("1개이상 선택해주세요.");
            return;
        }

    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}

