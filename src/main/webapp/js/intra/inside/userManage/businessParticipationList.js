var busnPartList = {


    fn_defaultScript : function (){

        customKendo.fn_datePicker("pjtYear", 'decade', "yyyy", new Date());

        $("#busnClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "R&D", value: "R"},
                {text: "비R&D", value: "S"},
                {text: "엔지니어링", value: "D"},
                {text: "기타/용역", value: "N"},
            ],
        });

        $("#payGubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "현금", value: "PAY"},
                {text: "현물", value: "ITEM"},
            ],
        });

        $("#pjtStep").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "진행", value: "I"},
                {text: "완료", value: "C"},
            ],
        });

        customKendo.fn_textBox(["pjtNm"])

        busnPartList.mainGrid();
    },

    gridReload: function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },


    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/inside/getBusinessParticipationList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtYear = $("#pjtYear").val();
                    data.payGubun = $("#payGubun").val();
                    data.busnClass = $("#busnClass").val();
                    data.pjtStep = $("#pjtStep").val();
                    data.pjtNm = $("#pjtNm").val();

                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
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
            height: 500,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="busnPartList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            columns: [
                {
                    title : "상태",
                    width: 50,
                    template: function (e){
                        console.log(e);
                        if(e.PJT_STEP == 'S3' || e.PJT_STEP == 'R3' || e.PJT_STEP ==  'E6'){
                            return "완료";
                        } else {
                            return "진행";
                        }
                    }
                }, {
                    title: "프로젝트명",
                    width: 200,
                    template : function(e){
                        return e.PJT_NM;
                    }
                }, {
                    title: "지원부처",
                    width : 130,
                    template : function(e){
                        return e.SBJ_DEP_NM;
                    }
                }, {
                    title: "유형",
                    width : 100,
                    template : function (e){
                        if(e.SBJ_CLASS == "1"){
                            return "법인위탁과제";
                        } else if(e.SBJ_CLASS == "2"){
                            return "법인주관과제";
                        } else if(e.SBJ_CLASS == "3"){
                            return "법인참여과제";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "시작일",
                    width: 80,
                    field: "PJT_STR_DE",
                }, {
                    title: "종료일",
                    width: 80,
                    field: "PJT_END_DE",
                }, {
                    title: "구분",
                    width: 70,
                    template : function(e){
                        if(e.PM_EMP_SEQ == e.PART_EMP_SEQ){
                            return "책임자";
                        } else {
                            return "참여자";
                        }
                    }
                }, {
                    title: "성명",
                    width: 70,
                    template : function(e){
                        return e.PART_EMP_NM;
                    }
                }, {
                    title: "부서/팀",
                    field: "DEPT_NAME",
                    width: 150,
                }, {
                    title: "참여시작",
                    field: "PART_DET_STR_DT",
                    width: 80,
                }, {
                    title: "참여종료",
                    field: "PART_DET_END_DT",
                    width: 80,
                }, {
                    title: "기준급여",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(e.EMP_SAL)+'</div>';
                    }
                }, {
                    title: "총참여율",
                    width: 70,
                    template:function(e){
                        return e.TOT_RATE + '%';
                    }
                }, {
                    title: "1월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_01) + Number(e.MON_ITEM_01))+'%</div>';
                    }
                }, {
                    title: "2월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_02) + Number(e.MON_ITEM_02))+'%</div>';
                    }
                }, {
                    title: "3월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_03) + Number(e.MON_ITEM_03))+'%</div>';
                    }
                }, {
                    title: "4월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_04) + Number(e.MON_ITEM_04))+'%</div>';
                    }
                }, {
                    title: "5월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_05) + Number(e.MON_ITEM_05))+'%</div>';
                    }
                }, {
                    title: "6월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_06) + Number(e.MON_ITEM_06))+'%</div>';
                    }
                }, {
                    title: "7월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_07) + Number(e.MON_ITEM_07))+'%</div>';
                    }
                }, {
                    title: "8월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_08) + Number(e.MON_ITEM_08))+'%</div>';
                    }
                }, {
                    title: "9월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_09) + Number(e.MON_ITEM_09))+'%</div>';
                    }
                }, {
                    title: "10월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_10) + Number(e.MON_ITEM_10))+'%</div>';
                    }
                }, {
                    title: "11월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_11) + Number(e.MON_ITEM_11))+'%</div>';
                    }
                }, {
                    title: "12월",
                    width: 80,
                    template : function (e){
                        return '<div style="text-align: right;">'+comma(Number(e.MON_PAY_12) + Number(e.MON_ITEM_12))+'%</div>';
                    }
                }
                // , {
                //     title: "지급총액",
                //     width: 80,
                //     template : function(e){
                //         return '<div style="text-align: right;">'+comma(e.EMP_SAL)+'</div>';
                //     }
                // }
            ],
        }).data("kendoGrid");
    }
}

function inputNumberFormat (obj){
    obj.value = comma(uncomma(obj.value));
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}