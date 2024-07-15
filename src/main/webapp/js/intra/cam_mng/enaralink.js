var enaralink = {

    global: {
        dropDownDataSource: "",
        searchAjaxData: "",
        saveAjaxData: "",
        selData: ""
    },

        fn_defaultScript: function () {

        var d = new Date();
        var bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달

        var bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() + 1)).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2);

        var data = {};
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_datePicker("fromMonth", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endMonth", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");
        customKendo.fn_textBox(["searchValue"]);

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "999"},
                {text: "미전송", value: "0"},
                {text: "전송진행중", value: "2"},
                {text: "전송", value: "1"}
            ],
            index: 0
        });
        $("#fromMonth, #endMonth").attr("readonly", true);
        $("#fromMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);
        $("#endMonth").data("kendoDatePicker").bind("change", enaralink.gridReload);


        enaralink.mainGrid();
    },



    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getPayAppList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    data.strDt = $("#fromMonth").val();
                    data.endDt = $("#endMonth").val();

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

        $("#sendResolutionGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            resizable : true,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (){

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">일괄 전송취소</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">전송취소</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">전송제외</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">집행정보 일괄전송</span>' +
                            '</button>'+

                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            persistSelection : true,
            columns: [
                {
                    field : "",
                    title: "전송가능여부",
                    width: 50,
                    locked: true
                },
                {
                    title: "전송불가사유",
                    width: 150,
                    locked: true,
                    encoded: false
                },
                {
                    title: "전송/확인",
                    width: 100,
                    template : function(dataItem) {
                        if (dataItem.KUKGO_STATE === "전송완료" || dataItem.KUKGO_STATE === '전송진행중' || dataItem.KUKGO_STATE === '전송실패') {
                            return "<input type='button' class='btnChoice k-button k-button-solid-base' value='확인' onclick='enaralink.fn_openSubmitPage("+dataItem.PAY_APP_DET_SN+");'>";
                        } else {
                            return "<input type='button' class='btnChoice k-button k-button-solid-base' value='전송' onclick='enaralink.fn_openSubmitPage("+dataItem.PAY_APP_DET_SN+");'>";
                        }
                    },
                    locked: true,
                    encoded: false
                },
                {
                    title: "지출결의 정보",
                    columns: [
                        {
                            field: "",
                            title: "상태",
                            width: 70,
                            template:function(e){
                                return '미전송'
                            }
                        }, {
                            field: "EMP_NAME",
                            title: "결의자",
                            width: 70
                        }, {
                            field: "DOC_NO",
                            title: "문서번호",
                            width: 150
                        }, {
                            field: "DOC_TITLE",
                            title: "문서제목",
                            width: 300
                        },{
                            field: "PJT_NM",
                            title: "프로젝트",
                            width: 150
                        },  {
                            field: "BUDGET_NM",
                            title: "예산과목",
                            width: 150
                        }, {
                            field: "EVID_TYPE",
                            title: "결재수단",
                            width: 80,
                            template : function (e){
                                if(e.EVID_TYPE == 1){
                                    return "세금계산서"
                                } else if (e.EVID_TYPE == 2){
                                    return "계산서"
                                } else if(e.EVID_TYPE == 3){
                                    return "신용카드"
                                } else if(e.EVID_TYPE == 4){
                                    return "직원지급"
                                } else if(e.EVID_TYPE == 5){
                                    return "사업소득자"
                                } else if(e.EVID_TYPE == 6){
                                    return "기타"
                                } else if(e.EVID_TYPE == 9) {
                                    return "기타소득자";
                                }
                            }
                        }, {
                            field: "",
                            title: "금액",
                            width: 100,
                            template : function (e){
                                return '<div style="text-align: right">'+enaralink.comma(e.TOT_COST)+'</div>'
                            }
                        }]
                },
                {
                    title: "ENARA 집행 전송 정보",
                    columns: [
                        {
                            field: "",
                            title: "증빙선택",
                            width: 100
                        }, {
                            field: "",
                            title: "승인번호",
                            width: 300
                        }, {
                            field: "",
                            title: "증빙일자",
                            width: 100
                        }, {
                            field: "",
                            title: "합계금액",
                            width: 100
                        }, {
                            field: "",
                            title: "거래처명",
                            width: 300
                        }, {
                            field: "",
                            title: "사업자등록번호<br>(주민등록번호)",
                            width: 300
                        }, {
                            field: "",
                            title: "이체구분",
                            width: 150
                        }, {
                            field: "",
                            title: "이체구분",
                            width: 150
                        }, {
                            field: "",
                            title: "은행명",
                            width: 100
                        }, {
                            field: "",
                            title: "계좌번호",
                            width: 150
                        }, {
                            field: "",
                            title: "정산서류",
                            width: 100
                        }]
                }
            ]
        }).data("kendoGrid");
    },

    fn_openSubmitPage : function(e) {
        var url = "/mng/newResolutionSubmitPage.do";
        var name = "newResolutionSubmitPage";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },



}