var eduInfoMng = {
    init: function(){
        eduInfoMng.dataSet();
        eduInfoMng.mainGrid();
    },

    dataSet: function(){
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });
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
                parameterMap: function(data) {
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#eduYear").val();
                    return data;
                }
            },
            schema: {
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
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="eduInfoMng.setMngCheck(\'Y\');">' +
                            '	<span class="k-button-text">이수완료</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="eduInfoMng.setMngCheck(\'N\');">' +
                            '	<span class="k-button-text">이수취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: eduInfoMng.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'eduPk\');"/>',
                    template : "<input type='checkbox' id='eduPk#=EDU_INFO_ID#' name='eduPk' class='eduPk' value='#=EDU_INFO_ID#'/>",
                    width: 50
                }, {
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
                            return "데이터 오류"
                        }
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명"
                }, {
                    field: "EDU_NAME",
                    title: "학습명"
                }, {
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 200
                }, {
                    field: "CARE_LOCATION",
                    title: "학습장소",
                    width: 200
                }, {
                    field: "TERM_TIME",
                    title: "교육시간",
                    width: 100
                }, {
                    field: "REAL_EDU_TIME",
                    title: "인정시간",
                    width: 100
                }, {
                    title: "이수상태",
                    width: 180,
                    template: function(row){
                        if(row.STATUS == "0") {
                            return "계획";
                        }else if(row.STATUS == "10") {
                            return "신청완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "1") {
                            return "교육완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "0") {
                            return "결과보고서 작성완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "10") {
                            return "결과보고서 승인요청중";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "N") {
                            return "교육완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "Y") {
                            return "이수완료";
                        }else {
                            return "교육취소"
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const eduInfoId = dataItem.EDU_INFO_ID;
            eduInfoMng.eduInfoViewPop(eduInfoId);
        });
    },

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId+"&isAdmin=Y";
        const name = "popup";
        const option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    setMngCheck: function(value){
        if(!confirm("교육완료 상태만 처리 가능합니다. 진행하시겠습니까?")) {return false;}
        $("input[name=eduPk]:checked").each(function(){
            let dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            let eduYear = $("#eduYear").val();
            let eduFormType = Number(dataItem.EDU_FORM_TYPE);
            let empSeq = dataItem.REG_EMP_SEQ;
            let realEduTime = 0;
            let eduTime = dataItem.TERM_TIME;
            let termDay = dataItem.TERM_DAY;

            /** 학습별 이번년도 실제 인정시간 조회 */
            let realEduTimeYear = customKendo.fn_customAjax("/campus/getRealEduTimeYear", {
                eduYear: eduYear,
                eduFormType: eduFormType,
                empSeq: empSeq
            }).data.REAL_EDU_TIME;

            switch (eduFormType){
                case 1:
                    /** 교육기관 참가교육 : 교육시간 100% */
                    realEduTime = eduTime;
                    break;
                case 2:
                    /** 온라인 학습 : 교육시간 100%, 건당 최대 30시간 */
                    if(eduTime > 30){
                        realEduTime = 30;
                    }else{
                        realEduTime = eduTime;
                    }
                    break;
                case 3:
                    /** 세미나/포럼/학술대회 : 주제발표 100%, 단순참가 50%*/
                    let objectForumType = dataItem.OBJECT_FORUM_TYPE;
                    if(objectForumType == "주제발표" || objectForumType == 1){
                        if(eduTime > 8){
                            realEduTime = 8;
                        }else {
                            realEduTime = eduTime;
                        }
                    }else{
                        if((eduTime/2) > 8){
                            realEduTime = 8;
                        }else {
                            realEduTime = (eduTime/2);
                        }
                    }
                    break;
                case 4:
                    /** 박람회/기술대전 참관 : 건당 최대 4시간 */
                    if(eduTime > 4){
                        realEduTime = 4;
                    }else{
                        realEduTime = eduTime;
                    }
                    break;
                case 5:
                    /** 도서학습 : 50페이지당 1시간, 건당 최대 10시간 */
                    let bookPageVal = Number(dataItem.BOOK_PAGE_VAL);
                    let bookTime = parseInt(bookPageVal / 50);
                    if(bookTime > 8){
                        realEduTime = 8;
                    }else{
                        realEduTime = bookTime;
                    }
                    break;
                case 6:
                    /** 논문/학술지 독서 : 2편당 1시간 */
                    let treaUnit = Number(dataItem.TREA_UNIT);
                    if(treaUnit > 1){
                        realEduTime = 1;
                    }else {
                        realEduTime = 0;
                    }
                    break;
                case 7:
                    /** 국내/외 논문 저술 : 국제학술지 저자 20시간, 교신저자 10시간, 국내학술지 저자 10시간, 교신저자 5시간, 연간 최대 30시간 */
                    let treaType = dataItem.TREA_TYPE;
                    let treaUser = dataItem.TREA_USER;

                    if(treaType == "국외"){
                        if(treaUser == "저자"){
                            realEduTime = 20;
                        }else{
                            realEduTime = 10;
                        }
                    }else{
                        if(treaUser == "저자"){
                            realEduTime = 10;
                        }else{
                            realEduTime = 5;
                        }
                    }
                    if(realEduTimeYear + realEduTime > 30){
                        realEduTime = 30 - realEduTimeYear;
                    }
                    break;
                case 8:
                    /** 직무관련 저술 : 권당 30시간, 연간 최대 50시간*/
                    let bookUnit = Number(dataItem.BOOK_UNIT);
                    let bookUnitTime = bookUnit * 30;
                    realEduTime = bookUnitTime;
                    if(realEduTimeYear + realEduTime > 50){
                        realEduTime = 50 - realEduTimeYear;
                    }
                    break;
                case 9:
                    /** 국내외 현장견학 : 1일당 최대 4시간, 건당 최대 30시간 */
                    if(termDay * 4 < eduTime){
                        realEduTime = termDay * 4
                    }else{
                        realEduTime = eduTime
                    }
                    break;
                case 10:
                    /** 자격증 취득 : 기술사 30시간, 기사 20시간, 나머지 15시간, 연간 최대 30시간 */
                    let compType = dataItem.COMP_TYPE;
                    if(compType == "기술사"){
                        realEduTime = 30;
                    }else if(compType == "기사"){
                        realEduTime = 20;
                    }else{
                        realEduTime = 15;
                    }
                    if(realEduTimeYear + realEduTime > 30){
                        realEduTime = 30 - realEduTimeYear;
                    }
                    break;
            }
            if(value != "Y"){
                realEduTime = 0;
            }

            let data = {
                mngCheck: value,
                pk: $(this).val(),
                realEduTime: realEduTime
            }

            let url = "/campus/setMngCheckUpd";
            customKendo.fn_customAjax(url, data);
        });

        if(value == "Y"){
            alert("이수처리 되었습니다.");
        }else if(value == "N"){
            alert("이수취소 되었습니다.");
        }
        gridReload();
    }
}