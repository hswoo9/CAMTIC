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
                    field : "",
                    width: 50,
                }, {
                    title: "프로젝트명",
                    field: "",
                    width: 200,
                }, {
                    title: "지원부처",
                    field: "",
                }, {
                    title: "유형",
                    field: "",
                }, {
                    title: "시작일",
                    field: "",
                }, {
                    title: "종료일",
                    field: "",
                }, {
                    title: "구분",
                    field: "",
                }, {
                    title: "성명",
                    field: "",
                }, {
                    title: "부서/팀",
                    field: "",
                }, {
                    title: "참여시작",
                    field: "",
                }, {
                    title: "참여종료",
                    field: "",
                }, {
                    title: "기준급여",
                    field: "",
                }, {
                    title: "예산총액",
                    field: "",
                }, {
                    title: "년도",
                    field: "",
                }, {
                    title: "총참여율",
                    field: "",
                }, {
                    title: "1월",
                    field: "",
                }, {
                    title: "2월",
                    field: "",
                }, {
                    title: "3월",
                    field: "",
                }, {
                    title: "4월",
                    field: "",
                }, {
                    title: "5월",
                    field: "",
                }, {
                    title: "6월",
                    field: "",
                }, {
                    title: "7월",
                    field: "",
                }, {
                    title: "8월",
                    field: "",
                }, {
                    title: "9월",
                    field: "",
                }, {
                    title: "10월",
                    field: "",
                }, {
                    title: "11월",
                    field: "",
                }, {
                    title: "12월",
                    field: "",
                }, {
                    title: "지급총액",
                    field: "",
                }
            ],
        }).data("kendoGrid");
    }
}