var eduInfoMng = {

    global: {
        htmlStr: "",
    },

    init: function(){
        eduInfoMng.dataSet();
        eduInfoMng.mainGrid();
    },

    dataSet: function(){
        var data = {};

        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        let studyDataSource = [
            { text: "교육기관 참가교육", value: "1" },
            { text: "온라인 학습", value: "2" },
            { text: "세미나/포럼/학술대회", value: "3" },
            { text: "박람회/기술대전 참관", value: "4" },
            { text: "도서학습", value: "5" },
            { text: "논문/학술지 독서", value: "6" },
            { text: "국내/외 논문 저술", value: "7" },
            { text: "직무관련 저술", value: "8" },
            { text: "국내외 현장견학", value: "9" },
            { text: "자격증 취득", value: "10" }
        ]
        customKendo.fn_dropDownList("studyClass", studyDataSource, "text", "value");
        $("#studyClass").data("kendoDropDownList").bind("change", eduInfoMng.gridReload);
        $("#studyClass").data("kendoDropDownList").select(0);
        $("#studyClass").data("kendoDropDownList").trigger("change");

        $("#kindContent").kendoTextBox();

        let statusDataSource = [
            { text: "계획", value: "0" },
            { text: "학습신청서승인요청중", value: "10"},
            { text: "신청완료", value: "100"},
            { text: "결과보고서작성완료", value: "100" },
            { text: "결과보고서승인요청중", value: "100"},
            { text: "교육완료", value: "100"},
            { text: "이수완료", value: "100"}
        ]
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value");
        $("#status").data("kendoDropDownList").bind("change", eduInfoMng.fn_resStatus);
        $("#status").data("kendoDropDownList").select(0);
        $("#status").data("kendoDropDownList").trigger("change");

        let positionCode = [
            {text: "수석행정원 / 1급", value: "수석행정원"},
            {text: "수석매니저 / 1급", value: "수석매니저"},
            {text: "수석연구원 / 1급", value: "수석연구원"},
            {text: "책임행정원 / 2급", value: "책임행정원"},
            {text: "책임매니저 / 2급", value: "책임매니저"},
            {text: "책임연구원 / 2급", value: "책임연구원"},
            {text: "선임연구원 / 3급", value: "선임연구원"},
            {text: "선임매니저 / 3급", value: "선임매니저"},
            {text: "선임행정원 / 3급", value: "선임행정원"},
            {text: "주임매니저 / 4급", value: "주임매니저"},
            {text: "행정원 / 4급", value: "행정원"},
            {text: "주임행정원 / 4급", value: "주임행정원"},
            {text: "매니저 / 4급", value: "매니저"},
            {text: "주임연구원 / 4급", value: "주임연구원"},
            {text: "연구원 / 4급", value: "연구원"}
        ]
        customKendo.fn_dropDownList("position", positionCode, "text", "value");

        let dutyCode = [
            {text: "원장", value: "1"},
            {text: "본부장", value: "2"},
            {text: "사업부장", value: "3"},
            {text: "센터장", value: "4"},
            {text: "팀장", value: "5"}
        ]
        customKendo.fn_dropDownList("duty", dutyCode, "text", "value");


        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");
        $("#deptComp").data("kendoDropDownList").bind("change", eduInfoMng.fn_chngDeptComp);
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");
    },

    fn_resStatus: function () {
        let selectedText = $("#status").data("kendoDropDownList").text();

        switch (selectedText) {
            case "신청완료":
                $("#resStatus").val("1");
                $("#mngCheck").val("");
                break;
            case "결과보고서작성완료":
                $("#resStatus").val("0");
                $("#mngCheck").val("");
                break;
            case "결과보고서승인요청중":
                $("#resStatus").val("10");
                $("#mngCheck").val("");
                break;
            case "교육완료":
                $("#resStatus").val("100");
                $("#mngCheck").val("N");
                break;
            case "이수완료":
                $("#resStatus").val("100");
                $("#mngCheck").val("Y");
                break;
            default:
                $("#resStatus").val("");
                $("#mngCheck").val("");
                break;
        }
    },

    fn_chngDeptComp : function (){
        var data = {};
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq");
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
                    data.position = $("#position").val();
                    data.duty = $("#duty").val();
                    data.status = $("#status").val();
                    data.resStatus =$("#resStatus").val();
                    data.mngCheck =$("#mngCheck").val();
                    data.studyClass = $("#studyClass").val();
                    data.deptComp = $("#deptComp").val();
                    data.deptTeam = $("#deptTeam").val();
                    data.kindContent = $("#kindContent").val();
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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="eduInfoMng.responsable();">' +
                            '	<span class="k-button-text">회계담당자 설정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="eduInfoMng.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, /*{
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="eduInfoMng.setMngCheck(\'N\');">' +
                            '	<span class="k-button-text">이수취소</span>' +
                            '</button>';
                    }
                }*/
            ],
            excel : {
                fileName : "직원학습 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound: eduInfoMng.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'eduPk\');"/>',
                    width: 50,
                    template : function(row){
                        if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "Y") {
                            return "<input type='checkbox' id='eduPk" + row.EDU_INFO_ID + "' name='eduPk' class='eduPk' value='" + row.EDU_INFO_ID + "'/>";
                        } else {
                            return "";
                        }
                    },
                }, {
                    field: "EDU_FORM_TYPE",
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
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명"
                }, {
                    field: "EDU_NAME",
                    title: "학습명"
                }, {
                    field: "START_DT",
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 200
                }, {
                    field: "CARE_LOCATION",
                    title: "학습장소",
                    width: 200,
                    template: function(row){
                        if(row.CARE_LOCATION == null || row.CARE_LOCATION == "" || row.CARE_LOCATION == "undefined") {
                            return "-";
                        } else {
                            return row.CARE_LOCATION;
                        }
                    }
                }, {
                    field: "TERM_TIME",
                    title: "교육시간",
                    width: 100
                }, {
                    field: "REAL_EDU_TIME",
                    title: "인정시간",
                    width: 100
                }, {
                    field: "STATUS",
                    title: "이수상태",
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
                }, {
                    title: "학습신청서",
                    width: 85,
                    template: function(row){
                        if(row.STATUS == "100" || row.STATUS == "101"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="eduInfoMng.eduReqPop('+row.EDU_INFO_ID+', '+row.EDU_FORM_TYPE+');">' +
                                '	<span class="k-button-text">결재완료</span>' +
                                '</button>';
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "결과보고서",
                    width: 85,
                    template: function(row){
                        if(row.STATUS == "100"){
                            if(row.RES_STATUS == "100" || row.RES_STATUS == "101"){
                                return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="eduInfoMng.eduResultReqPop('+row.EDU_INFO_ID+', '+row.RES_STATUS+');">' +
                                    '	<span class="k-button-text">결재완료</span>' +
                                    '</button>';
                            } else {
                                return "";
                            }
                        } else {
                            return "";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    /*onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {


            const dataItem = grid.dataItem($(this));
            const eduInfoId = dataItem.EDU_INFO_ID;
            eduInfoMng.eduInfoViewPop(eduInfoId);
        });
    },
*/
    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const RES_STATUS = dataItem.RES_STATUS;

            if(RES_STATUS == "0" || RES_STATUS == "10" || RES_STATUS == "100"){
                const dataItem = grid.dataItem($(this));
                const eduInfoId = dataItem.EDU_INFO_ID;
                eduInfoMng.eduResultViewPop(eduInfoId);
            }else{
                const dataItem = grid.dataItem($(this));
                const eduInfoId = dataItem.EDU_INFO_ID;
                eduInfoMng.eduInfoViewPop(eduInfoId);
            }
        });
    },

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId+"&isAdmin=Y";
        const name = "popup";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduResultViewPop: function(eduInfoId) {
        let mode = "mng";
        let url = "/Campus/pop/eduResultViewPop.do?eduInfoId="+eduInfoId;
        url += "&mode="+mode;
        const name = "popup";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduReqPop : function(eduInfoId, eduFormType){
        let url = "/Campus/pop/eduReqPop.do?eduInfoId="+eduInfoId+"&eduFormType="+eduFormType+"&mode=mng";
        const name = "popup";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduResultReqPop: function(eduInfoId, resStatus) {
        var url = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduInfoId+"&mode=mng";

        var name = "_target";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    responsable: function() {
        let mode = "mng";
        let url = "/Campus/pop/eduResponsablePop.do;";
        const name = "popup";
        const option = "width = 500, height = 450, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    setMngCheck: function(value){
        // if(!confirm("교육완료 상태만 처리 가능합니다. 진행하시겠습니까?")) {return false;}
        if($("input[name=eduPk]:checked").length == 0) {
            alert("선택된 학습이 없습니다.");
            return;
        } else if($("input[name=eduPk]:checked").length > 1){
            alert("한개의 학습만 선택해주세요.");
            return;
        }

        let mngCheckArr = [];
        $("input[name=eduPk]:checked").each(function(){
            let dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            let eduYear = $("#eduYear").val();
            let eduFormType = Number(dataItem.EDU_FORM_TYPE);
            let empSeq = dataItem.REG_EMP_SEQ;
            let realEduTime = 0;
            let eduTime = dataItem.TERM_TIME;
            let termDay = dataItem.TERM_DAY;
            let eduFormText = "";

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
                    eduFormText = "교육기관 참가교육";
                    break;
                case 2:
                    /** 온라인 학습 : 교육시간 100%, 건당 최대 30시간 */
                    if(eduTime > 30){
                        realEduTime = 30;
                    }else{
                        realEduTime = eduTime;
                    }
                    eduFormText = "온라인 학습";
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
                    eduFormText = "세미나/포럼/학술대회";
                    break;
                case 4:
                    /** 박람회/기술대전 참관 : 건당 최대 4시간 */
                    if(eduTime > 4){
                        realEduTime = 4;
                    }else{
                        realEduTime = eduTime;
                    }
                    eduFormText = "박람회/기술대전 참관";
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
                    eduFormText = "도서학습";
                    break;
                case 6:
                    /** 논문/학술지 독서 : 2편당 1시간 */
                    let treaUnit = Number(dataItem.TREA_UNIT);
                    if(treaUnit > 1){
                        realEduTime = 1;
                    }else {
                        realEduTime = 0;
                    }
                    eduFormText = "논문/학술지 독서";
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
                    eduFormText = "국내/외 논문 저술";
                    break;
                case 8:
                    /** 직무관련 저술 : 권당 30시간, 연간 최대 50시간*/
                    let bookUnit = Number(dataItem.BOOK_UNIT);
                    let bookUnitTime = bookUnit * 30;
                    realEduTime = bookUnitTime;
                    if(realEduTimeYear + realEduTime > 50){
                        realEduTime = 50 - realEduTimeYear;
                    }
                    eduFormText = "직무관련 저술";
                    break;
                case 9:
                    /** 국내외 현장견학 : 1일당 최대 4시간, 건당 최대 30시간 */
                    if(termDay * 4 < eduTime){
                        realEduTime = termDay * 4
                    }else{
                        realEduTime = eduTime
                    }
                    eduFormText = "국내외 현장견학";
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
                    eduFormText = "자격증 취득";
                    break;
            }
            if(value != "Y"){
                realEduTime = 0;
            }

            mngCheckArr = {
                mngCheck: value,
                pk: $(this).val(),
                realEduTime: realEduTime,

                eduFormText: eduFormText,
                mngStatus: dataItem.MNG_CHECK,  // 기존 이수여부
                regEmpName: dataItem.REG_EMP_NAME,
                eduName: dataItem.EDU_NAME,
                eduTime: eduTime,
                saveEduTime: dataItem.REAL_EDU_TIME
            }
        });

        eduInfoMng.global.htmlStr = "" +
            '<div class="card-header" style="margin-left:8px;">' +
            '   <table class="table table-bordered mb-0">' +
            '		<colgroup>' +
            '			<col width="10%">' +
            '			<col width="25%">' +
            '			<col width="40%">' +
            '			<col width="10%">' +
            '			<col width="10%">' +
            '		</colgroup>' +
            '		<tbody>' +
            '			<tr>' +
            '				<th class="text-center th-color" style="padding: 15px 0; background-color: #8fa1c04a;">성명</th>' +
            '				<th class="text-center th-color" style="padding: 15px 0; background-color: #8fa1c04a;">학습방법</th>' +
            '				<th class="text-center th-color" style="padding: 15px 0; background-color: #8fa1c04a;">학습명</th>' +
            '				<th class="text-center th-color" style="padding: 15px 0; background-color: #8fa1c04a;">교육시간</th>' +
            '				<th class="text-center th-color" style="padding: 15px 0; background-color: #8fa1c04a;">인정시간</th>' +
            '			</tr>' +
            '	        <tr class="eduInfoTr">' +
            '		        <input type="hidden" id="eduInfoId'+ mngCheckArr.pk +'" name="eduInfoId" value="' + mngCheckArr.pk + '">' +
            '		        <td class="text-center" style="background-color: #fff;">' + mngCheckArr.regEmpName + '</td>' +
            '		        <td class="text-center" style="background-color: #fff;">' + mngCheckArr.eduFormText + '</td>' +
            '		        <td class="text-center" style="background-color: #fff;">' + mngCheckArr.eduName + '</td>' +
            '		        <td class="text-center" style="background-color: #fff;">' + mngCheckArr.eduTime + '</td>';
                    if(mngCheckArr.mngStatus == "Y"){
                eduInfoMng.global.htmlStr += "" +
                    '		<td class="text-center" style="background-color: #fff;"><input type="text" name="realEduTime" value="' + mngCheckArr.saveEduTime + '" style="width: 50px; text-align: center;" </td>';
                    } else {
                eduInfoMng.global.htmlStr += "" +
                    '		<td class="text-center" style="background-color: #fff;"><input type="text" name="realEduTime" value="' + mngCheckArr.realEduTime + '" style="width: 50px; text-align: center;" </td>';
                    }
                eduInfoMng.global.htmlStr += "" +
            '	        </tr>' +
            '		</tbody>' +
            '	</table>' +
            '   <button type="button" id="updBtn" class="k-button k-button-solid-info" style="float: right;" onclick="eduInfoMng.fn_mngCheck();">이수완료</button>' +
            '</div>';



        var dialog = $("#dialog").data("kendoWindow");

        dialog.open();
        dialog.center();


        // if(value == "Y"){
        //     alert("이수처리 되었습니다.");
        // }else if(value == "N"){
        //     alert("이수취소 되었습니다.");
        // }
        // gridReload();
    },

    fn_mngCheck : function(){

        if(!confirm("이수처리 하시겠습니까?")){
            return;
        }

        var data = {
            eduInfoId : $("input[name='eduInfoId']").val(),
            realEduTime : $("input[name='realEduTime']").val()
        };

        // $(".eduInfoTr").each(function(){
        //
        //     var eduInfoId = $(this).find("input[name=eduInfoId]").val();
        //     var realEduTime = $(this).find("input[name=realEduTime]").val();
        //
        //     var itemArr = {
        //         eduInfoId : eduInfoId,
        //         realEduTime : realEduTime
        //     }
        //
        //     data.push(itemArr);
        // });

        $.ajax({
            url: "/campus/setEduResultEduTimeUpd",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(rs) {
                if(rs.code == "200"){
                    alert("이수처리 되었습니다.");
                    $("#dialog").data("kendoWindow").close();
                    eduInfoMng.mainGrid();
                }
            },
            error: function (e) {
                console.log('error : ', e);
            }
        });
    }
}