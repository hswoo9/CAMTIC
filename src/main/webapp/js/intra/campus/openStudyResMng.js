var openStudyResMng = {

    init: function(){
        openStudyResMng.dataSet();
        openStudyResMng.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_datePicker("eduYear", "decade", "yyyy", new Date());
        $("#eduYear").on("change", function() {
            openStudyResMng.mainGrid();
        });
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyInfoAdminList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.eduYear = $("#eduYear").val();
                    data.step = "D";
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="openStudyResMng.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "오픈스터리(관리자) 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            dataBound : openStudyResMng.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "학습주제"
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 80
                }, {
                    field: "MEMBER",
                    title: "구성원",
                    width: 150,
                    template: function(row){
                        let text = row.MEMBER;
                        if(row.MEMBER_COUNT != 0){
                            text += " 외 "+row.MEMBER_COUNT+"명";
                        }
                        return text;
                    }
                }, {
                    field: "OPEN_STUDY_DT",
                    title: "학습기간",
                    width: 300,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " / " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "EDU_TIME",
                    title: "학습시간",
                    width: 80
                }, {
                    field: "STEP",
                    title: "진행현황",
                    width: 150,
                    template: function(row){
                        if(row.STEP == "B"){
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
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.OPEN_STUDY_INFO_SN;
            openStudyResMng.openStudyResPop(pk);
        });
    },

    openStudyResPop : function(pk) {
        let url = "/Campus/pop/openStudyResPop.do?mode=mng&pk="+pk;
        const name = "openStudyResPop";
        const option = "width = 1230, height = 935, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}
