var now = new Date();

var userInfoMod = {
    global : {
        searchAjaxData : "",
    },

    init : function(){
        userInfoMod.dataSet();
        userInfoMod.gridReload();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : ""
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : ""
        });

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "학력사항", value: "1" },
                { text: "경력사항", value: "2" },
                { text: "병력사항", value: "3" },
                { text: "가족사항", value: "4" },
                { text: "보유면허", value: "5" }
            ],
            index: 0
        });

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
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"},
                {text: "전북 조선업 도약센터", value: "전북 조선업 도약센터"},
                {text: "익산고용안정일자리센터", value: "익산고용안정일자리센터"}
            ],
            index: 0
        });

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "작성 중", value: "작성 중" },
                { text: "제출", value: "제출" },
                { text: "반려", value: "반려" },
                { text: "승인", value: "승인" }
            ],
            index: 0
        });
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_approval()">' +
                            '	<span class="k-button-text">승인</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_return()">' +
                            '	<span class="k-button-text">반려</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">취소</span>' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "번호",
                    template : function (e) {
                        return '<input type="hidden" value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "팀"
                }, {
                    field: "POSITION_NAME",
                    title: "직책"
                }, {
                    field: "EMP_NAME",
                    title: "성명"
                }, {
                    field: "REG_DATE",
                    title: "신청일"
                }, {
                    field: "typeName",
                    title: "신청항목"
                }, {
                    field : "admin_approval",
                    title: "처리상태",
                    template : function (e){
                        if(e.admin_approval == 'N') {
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_approvalTest(this)">' +
                                '	<span class="k-button-text">승인</span>' +
                                '</button>';
                        } else if(e.admin_approval == 'Y') {
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_cancelTest(this)">' +
                                '	<span class="k-button-text">승인취소</span>' +
                                '</button>';
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },
    fn_approvalTest : function(e) {
        if(confirm("승인 하시겠습니까?")){
            var data = {
                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
                TYPE : e.parentElement.parentElement.children[1].children[1].value,
                ID : e.parentElement.parentElement.children[1].children[2].value,
                KEY : e.parentElement.parentElement.children[1].children[3].value
            }
            $.ajax({
                url : '/userManage/setUpdateUserInfoModY',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (data){
                    alert("승인 되었습니다.");
                    if(data.rs == 'SUCCESS') {
                        $('#mainGrid').data('kendoGrid').dataSource.read();
                    }else {
                        alert("승인에 실패하였습니다.");
                    }
                }
            })

        }
    },

    fn_cancelTest : function(e) {
        if(confirm("취소 하시겠습니까?")){
            var data = {
                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
                TYPE : e.parentElement.parentElement.children[1].children[1].value,
                ID : e.parentElement.parentElement.children[1].children[2].value,
                KEY : e.parentElement.parentElement.children[1].children[3].value
            }
            $.ajax({
                url : '/userManage/setUpdateUserInfoModN',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (data){
                    alert("취소 되었습니다.");
                    if(data.rs == 'SUCCESS') {
                        $('#mainGrid').data('kendoGrid').dataSource.read();
                    }else {
                        alert("취소에 실패하였습니다.");
                    }
                }
            })

        }
    },

    recruitReqPop : function() {
        var url = "/Inside/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function() {
        var url = "/Inside/recruitAdminPop.do";
        var name = "recruitAdminPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_approval : function() {
        $.each($('.checkbox:checked'), function(index, item) {
            console.log('체크된 값 : ', $(item).parent());
            $.each($(item).parent().parent().find('td'), function(index, item) {
               console.log(index,'번째 td 값 : ', $(item).text());
            });
        });
    },

    fn_return : function() {
        $.each($('.checkbox:checked'), function(index, item) {
            console.log('체크된 값 : ', $(item).parent());
            $.each($(item).parent().parent().find('td'), function(index, item) {
                console.log(index,'번째 td 값 : ', $(item).text());
            });
        });
    },

    gridReload : function() {
        console.log('gridReload');
        userInfoMod.global.searchAjaxData = {
            startDate : $('#start_date').val(),
            endDate : $("#end_date").val(),
            drop1 : $("#drop1").val(),
            name : $("#name").val(),
        }
        console.log(userInfoMod.global.searchAjaxData);
        userInfoMod.mainGrid('/userManage/getPersonRecordApplyList',userInfoMod.global.searchAjaxData);
    }

}
