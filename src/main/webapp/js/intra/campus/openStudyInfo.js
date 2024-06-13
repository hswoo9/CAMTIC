var openStudy = {

    init: function(){
        openStudy.dataSet();
        openStudy.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_datePicker("eduYear", "decade", "yyyy", new Date());
        $("#eduYear").on("change", function() {
            openStudy.mainGrid();
        });
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="openStudy.setOpenStudyInfoDelete()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="openStudy.openStudyReqPop(\'ins\')">' +
                            '	<span class="k-button-text">모임개설</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="openStudy.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "오픈스터디 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            dataBound : openStudy.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'openStudyPk\');"/>',
                    /* template : "<input type='checkbox' id='eduPk#=EDU_INFO_ID#' name='eduPk' class='eduPk' value='#=EDU_INFO_ID#'/>",*/
                    template : function(row){
                        if(row.STEP == "A"){
                            return "<input type='checkbox' id='openStudyPk="+row.OPEN_STUDY_INFO_SN+"' name='openStudyPk' class='openStudyPk'  value='"+row.OPEN_STUDY_INFO_SN+"'>";
                        }
                        return "";
                    },
                    width: 50
                }, {
                    title: "순번",
                    width: 50,
                    template: "#= --record #"
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
                    field: "OPEN_STUDY_DT",
                    title: "학습기간",
                    width: 250,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " / " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "EDU_TIME",
                    title: "학습시간",
                    width: 80
                }, {
                    field: "REAL_EDU_TIME",
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 80
                }, {
                    field: "STEP",
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
    },

    setOpenStudyInfoDelete: function(){
        /*active=N 으로*/
        if(!confirm("모임개설을 취소하시겠습니까?")) {return false;}

        $("input[name=openStudyPk]:checked").each(function(){
            let dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));

            let data = {
                pk: $(this).val()
            }

            let url = "/campus/setOpenStudyInfoDelete";
            customKendo.fn_customAjax(url, data);
        });
        gridReload();
    }
}
