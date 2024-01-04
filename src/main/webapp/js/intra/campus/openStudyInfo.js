var openStudy = {

    init: function(){
        openStudy.dataSet();
        openStudy.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_datePicker("eduYear", "decade", "yyyy", new Date());
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.eduYear = $("#eduYear").val();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="openStudy.openStudyReqPop(\'ins\');">' +
                            '	<span class="k-button-text">모임개설</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : openStudy.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "학습주제"
                },{
                    field: "REG_EMP_NAME",
                    title: "주관직원",
                    width: 80
                }, {
                    field: "MEMBER_COUNT_TOTAL",
                    title: "구성원",
                    width: 100,
                    template: function (row){
                        return row.MEMBER_COUNT_TOTAL + "명"
                    }
                   /* template: function(row){
                        let text = row.MEMBER;
                        if(row.MEMBER_COUNT != 0){
                            text += " 외 "+row.MEMBER_COUNT+"명";
                        }
                        return text;
                    }*/
                }, {
                    title: "학습기간",
                    width: 250,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "EDU_TIME",
                    title: "학습시간",
                    width: 80
                }, {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 80
                }, {
                    field: "",
                    title: "진행현황",
                    width: 150,
                    template: function(row){
                        if(row.STEP == "A"){
                            return "작성중";
                        }else if(row.STEP == "B"){
                            return "참여자 모집";
                        }else if(row.STEP == "C"){
                            return "모임확정";
                        }else if(row.STEP == "D" && row.STATUS == 0){
                            return "결과보고서 작성중";
                        }else if(row.STEP == "D" && row.STATUS == 10){
                            return "승인요청중";
                        }else if(row.STEP == "D" && row.STATUS == 30){
                            return "반려";
                        }else if(row.STEP == "D" && row.STATUS == 100){
                            return "학습종료";
                        }else if(row.STEP == "N"){
                            return "모임취소";
                        }else{
                            return "-";
                        }
                        /*}else{
                            return "데이터오류";
                        }*/

                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.OPEN_STUDY_INFO_SN;

            if(dataItem.STEP == "D"){
                openStudy.openStudyResPop(pk);
            }else{
                openStudy.openStudyReqPop("upd", pk);
            }

        });
    },

    openStudyReqPop : function(mode, pk) {
        let url = "/Campus/pop/openStudyReqPop.do?mode="+mode;
        if(mode == "upd" || mode == "mng"){
            url += "&pk="+pk;
        }
        const name = "openStudyReqPop";
        const option = "width = 990, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    openStudyResPop : function(pk) {
        let url = "/Campus/pop/openStudyResPop.do?mode=upd&pk="+pk;
        const name = "openStudyResPop";
        const option = "width = 1230, height = 935, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}
