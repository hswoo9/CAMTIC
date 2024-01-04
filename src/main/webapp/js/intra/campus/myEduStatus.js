var myEdu = {
    init: function(){
        myEdu.pageSet();
        myEdu.dataSet();
    },

    pageSet: function(){
        $("#userName").text($("#regEmpName").val());
        customKendo.fn_datePicker("applyYear", 'decade', "yyyy년", new Date());
        $("#applyYear").attr("readonly", true);
        $("#applyYear").data("kendoDatePicker").bind("change", myEdu.dataSet);
    },

    dataSet: function(){
        let data = customKendo.fn_customAjax("/campus/getEduMyStatList", {
            empSeq: $("#regEmpSeq").val(),
            eduYear: $("#applyYear").val().replace("년", "")
        }).list[0];

        $("#personalTime").text(data.PERSONAL_TIME+"시간");
        $("#studyTime").text(data.STUDY_TIME+"시간");
        $("#propagTime").text(data.PROPAG_TIME+"시간");
        $("#ojtTime").text(data.OJT_TIME+"시간");
        $("#openStudyTime").text(data.OPEN_STUDY_TIME+"시간");
        $("#commonEduTime").text(data.COMMON_EDU_TIME+"시간");

        let totalTime = Number(data.PERSONAL_TIME) + Number(data.STUDY_TIME) + Number(data.PROPAG_TIME)
                        + Number(data.OJT_TIME) + Number(data.OPEN_STUDY_TIME) + Number(data.COMMON_EDU_TIME);

        //alert(Number(data.PERSONAL_TIME));
        //alert(Number(data.STUDY_TIME));
        //alert(Number(data.PROPAG_TIME));
        //alert(Number(data.OJT_TIME));
        //alert(Number(data.OPEN_STUDY_TIME));
        //alert(Number(data.COMMON_EDU_TIME));
        $("#totalTime").text("총 교육시간은 "+totalTime+"시간");

        myEdu.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getEduInfoList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: myEdu.onDataBound,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                },  {
                    field: "",
                    title: "학습방법",
                    width: 200,
                    template: function(row){
                        if(row.EDU_FORM_TYPE == "1") {
                            return "교육기관 참가교육";
                        }else if(row.EDU_FORM_TYPE == "2") {
                            return "온라인 학습";
                        }else if(row.EDU_FORM_TYPE == "3") {
                            return "세미나/포럼/학술대회";
                        }else if(row.EDU_FORM_TYPE == "4") {
                            return "박람회/기술대전 참관";
                        }else if(row.EDU_FORM_TYPE == "5") {
                            return "도서학습";
                        }else if(row.EDU_FORM_TYPE == "6") {
                            return "논문/학술지 독서";
                        }else if(row.EDU_FORM_TYPE == "7") {
                            return "국내/외 논문 저술";
                        }else if(row.EDU_FORM_TYPE == "8") {
                            return "직무관련 저술";
                        }else if(row.EDU_FORM_TYPE == "9") {
                            return "국내외 현장견학";
                        }else if(row.EDU_FORM_TYPE == "10") {
                            return "자격증 취득";
                        }else {
                            return "데이터 오류";
                        }
                    }
                },{
                    field: "EDU_NAME",
                    title: "학습명",
                    width: 200
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 200
                }, {
                    field: "CARE_LOCATION",
                    title: "교육장소",
                    width: 200,
                    template: function(row){
                        return (row.CARE_LOCATION == null || row.CARE_LOCATION == "undefined") ? "" : row.CARE_LOCATION;
                    }
                }, {
                    title: "단위업무",
                    width: 100,
                    template: function(row){
                        if(row.DUTY_CLASS == 1){
                            return "주업무";
                        }else{
                            return "연계업무";
                        }
                    }
                }, {
                    field: "LEVEL_ID",
                    title: "목표레벨",
                    width: 100
                },  {
                    field: "",
                    title: "학습시간",
                    width: 100
                },{
                    field: "REAL_EDU_TIME",
                    title: "인정시간",
                    width: 100
                }, {
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        if(row.STATUS == "0" || row.STATUS == "30" ) {
                            return "계획";
                        }else if(row.STATUS == "10") {
                            return "학습신청서 승인요청중";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "1") {
                            return "신청완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "0") {
                            return "결과보고서 작성완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "10") {
                            return "결과보고서 승인요청중";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "N") {
                            return "교육완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "Y") {
                            return "이수완료";
                        }else {
                            return "교육취소";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        let dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getStudyInfoStatList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");;
                    data.studyClassSn = 1;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource2,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: myEdu.onDataBound2,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "STUDY_NAME",
                    title: "학습조명",
                    width: 350
                }, {
                    field: "REG_EMP_NAME",
                    title: "조장",
                    width: 100
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 300
                }, {
                    field: "STUDY_LOCATION",
                    title: "교육장소",
                    width: 250
                },{
                    title: "학습시간",
                    template: "<span>#=STUDY_TIME#시간</span>",
                    width: 100
                },  {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                },{
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        let studyClass = row.STUDY_CLASS_SN;
                        if(studyClass == 1){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 100){
                                if(row.ADD_STATUS == "Y"|| row.ADD_STATUS == "C"){
                                    return "학습완료";
                                } else if (row.ADD_STATUS == "S") {
                                    return "이수완료";
                                } else {
                                    return "학습 진행중"
                                }
                            }
                        }else if(studyClass == 2){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨"
                            }else if(row.STATUS == 100){
                                return "학습종료"
                            }
                        }else if(studyClass == 3){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨"
                            }else if(row.STATUS == 100){
                                return "OJT 진행중(0회)"
                            }else if(row.STATUS == 101){
                                return "OJT완료"
                            }
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        let dataSource3 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getStudyInfoStatList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");;
                    data.studyClassSn = 2;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid3").kendoGrid({
            dataSource: dataSource3,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: myEdu.onDataBound2,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "STUDY_NAME",
                    title: "학습주제",
                    width: 350
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 150
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 400
                }, {
                    title: "지도시간",
                    template: "<span>#=PROPAG_TIME#시간</span>",
                    width: 100
                },{
                    title: "학습시간",
                    template: "<span>#=STUDY_TIME#시간</span>",
                    width: 100
                },  {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                },{
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        let studyClass = row.STUDY_CLASS_SN;
                        if(studyClass == 1){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 100){
                                if(row.ADD_STATUS == "Y"|| row.ADD_STATUS == "C"){
                                    return "학습완료";
                                } else if (row.ADD_STATUS == "S") {
                                    return "이수완료";
                                } else {
                                    return "학습 진행중";
                                }
                            }
                        }else if(studyClass == 2){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨";
                            }else if(row.STATUS == 100){
                                return "학습종료";
                            }
                        }else if(studyClass == 3){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨";
                            }else if(row.STATUS == 100){
                                return "OJT 진행중(0회)";
                            }else if(row.STATUS == 101){
                                return "OJT완료";
                            }
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        let dataSource4 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getStudyInfoStatList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");;
                    data.studyClassSn = 3;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid4").kendoGrid({
            dataSource: dataSource4,
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: myEdu.onDataBound2,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "STUDY_NAME",
                    title: "지도명칭"
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 100
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 300
                }, {
                    title: "학습시간",
                    template: "<span>#=OJT_TIME#시간</span>",
                    width: 200
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        let dataSource5 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getOpenStudyInfoStatList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid5").kendoGrid({
            dataSource: dataSource5,
            sortable: true,
            selectable: "row",
            dataBound : myEdu.onDataBound3,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "학습주제"
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 100
                }, {
                    field: "OPEN_STUDY_DT",
                    title: "학습기간",
                    width: 300
                }, {
                    title: "학습시간",
                    template: "<span>#=EDU_TIME#시간</span>",
                    width: 200
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        let dataSource6 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getCommonEduStatList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#applyYear").val().replace("년", "");;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                }
            }
        });

        $("#mainGrid6").kendoGrid({
            dataSource: dataSource6,
            sortable: true,
            selectable: "row",
            dataBound : myEdu.onDataBound4,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "COMMON_CLASS_TEXT",
                    title: "구분",
                    width: 200
                }, {
                    field: "EDU_TITLE",
                    title: "학습명",
                    width: 300
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 300
                },{
                    field: "",
                    title: "교육장소",
                    width: 200
                }, {
                    title: "학습시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                },  {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                }, /*{
                    title: "교육시간",
                    template: "<span>#=EDU_TIME#시간</span>",
                    width: 200
                }, {
                    field: "EDU_LOCATION",
                    title: "장소",
                    width: 200
                },*/ {
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "계획";
                        }else{
                            return "수료";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const eduInfoId = dataItem.EDU_INFO_ID;
            myEdu.eduInfoViewPop(eduInfoId);
        });
    },

    onDataBound2: function(){
        let grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let studyClass = dataItem.STUDY_CLASS_SN;
            if(studyClass == 1){
                myEdu.studyViewPop("upd", dataItem.STUDY_INFO_SN);
            }else if(studyClass == 2){
                myEdu.propagViewPop("upd", dataItem.STUDY_INFO_SN);
            }else if(studyClass == 3){
                myEdu.ojtViewPop("upd", dataItem.STUDY_INFO_SN);
            }
        });
    },

    onDataBound3: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.OPEN_STUDY_INFO_SN;
            myEdu.openStudyResPop(pk);
        });
    },

    onDataBound4: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.COMMON_EDU_SN;
            myEdu.commonEduReqPop("view", pk);
        });
    },

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId;
        const name = "popup";
        const option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    studyViewPop: function(mode, pk){
        let url = "/Campus/pop/studyViewPop.do?mode="+mode+"&pk="+pk;
        const name = "studyReqPop";
        const option = "width = 920, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    propagViewPop: function(mode, pk){
        let url = "/Campus/pop/propagViewPop.do?mode="+mode+"&pk="+pk;
        const name = "studyReqPop";
        const option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtViewPop: function(mode, pk){
        let url = "/Campus/pop/ojtViewPop.do?mode="+mode+"&pk="+pk;
        const name = "ojtViewPop";
        const option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    openStudyResPop: function(pk) {
        let url = "/Campus/pop/openStudyResPop.do?mode=upd&pk="+pk;
        const name = "openStudyResPop";
        const option = "width = 1230, height = 935, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    commonEduReqPop: function(mode, pk){
        let url = "/Campus/pop/commonEduReqPop.do?mode="+mode;
        if(mode == "view"){
            url += "&pk="+pk;
        }
        const name = "commonEduReqPop";
        const option = "width = 1000, height = 489, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    campusGuide1Pop: function(){
        let url = "/Campus/pop/myStudy/campusGuide1Pop.do";
        const name = "campusGuide1Pop";
        const option = "width = 860, height = 800, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    campusGuide2Pop: function(){
        let url = "/Campus/pop/myStudy/campusGuide2Pop.do";
        const name = "campusGuide1Pop";
        const option = "width = 860, height = 800, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    campusGuide3Pop: function(){
        let url = "/Campus/pop/myStudy/campusGuide3Pop.do";
        const name = "campusGuide1Pop";
        const option = "width = 1200, height = 800, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}