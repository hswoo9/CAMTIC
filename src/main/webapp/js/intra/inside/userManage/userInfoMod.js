var now = new Date();

var userInfoMod = {

    init : function(){
        userInfoMod.dataSet();
        userInfoMod.mainGrid();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
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

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/userManage/getAllUserPersonnelRecordList',
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.sDate = $("#start_date").val();
                    data.eDate = $("#end_date").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    console.log('데이터 : ',data);
                    return data.rs;
                },
                total: function (data) {
                    return data.rs.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                    field: "MSI_INFO_ID",
                    title: "번호"
                }, {
                    field: "EMP_SEQ",
                    title: "부서"
                }, {
                    field: "MILITARY_SVC_TYPE",
                    title: "팀"
                }, {
                    field: "MILITARY_SVC_TYPE",
                    title: "직책"
                }, {
                    field: "MILITARY_SVC_TYPE",
                    title: "성명"
                }, {
                    field: "REG_DATE",
                    title: "신청일"
                }, {
                    field: "M_UNFUL_REASON",
                    title: "신청항목"
                }, {
                    field: "ACTIVE",
                    title: "처리상태"
                }
            ]
        }).data("kendoGrid");
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
    }
}
