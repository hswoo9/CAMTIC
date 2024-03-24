const studyView = {
    global: {
        studyUserList: {},
        mngEmpSeq: ""
    },

    init : function(){
        window.resizeTo(920, 900);
        studyView.mainGrid();
        studyView.dataSet();
        studyView.settingTempFileDataInit();
    },

    dataSet: function(){
        studyView.studyBtnSetting();

        if($("#addStatus").val() == "Y" /*|| $("#addStatus").val() == "C"*/) {
            $("#resultDoc").html("<div style='color : red'> 결과보고서가 등록되지 않았습니다.</div>");
            $("#resultBtn").css("display", "");
        }else if($("#addStatus").val() == "C"){
            $("#resultDoc").html("<div style='color : red'> 결과보고서 승인 요청 중 입니다.</div>");
            $("#resultBtn").css("display", "");
        }else if($("#addStatus").val() == "S") {
            $("#resultDoc").html("<div style='color : blue'> 결과보고서가 등록되어 있습니다. 결과보고서 버튼으로 조회가 가능합니다.</div>");
            $("#resultBtn").css("display", "");
        }

        if($("#typeView").val() == "A"){
            $("#resultBtn").css("display", "none");
        }else if($("#typeView").val() == "B"){
            $("#studyTitle").text("학습조 결과보고서 조회");
        }

        studyView.studyUserSetting();
    },

    settingTempFileDataInit: function(){
        var result = customKendo.fn_customAjax("/common/getFileList", { contentId: "studyInfo_" + $("#pk").val(), fileCd: "studyInfo" });
        if(result.flag){
            if(result.list.length > 0){
                var html = '';
                for(var i=0; i<result.list.length; i++){
                    html += '<li>';
                    html += '   <span style="cursor: pointer" onclick="fileDown(\'' + result.list[i].file_path + result.list[i].file_uuid + '\', \'' + result.list[i].file_org_name + '.' + result.list[i].file_ext + '\')">' + result.list[i].file_org_name + '.' + result.list[i].file_ext + '</span>';
                    html += '</li>';
                }

                $("#attachTr").append(html);
            } else {
                $("#ulSetFileName").empty();
            }
        }
    },

    studyUserSetting: function(){
        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getStudyUserList", data);
        studyView.global.studyUserList = result.list;
        let list = studyView.global.studyUserList;

        let html = '';
        html += '<colgroup>';
        html += '<col width="10%"><col width="30%"><col width="20%"><col width="20%"><col width="20%">';
        html += '</colgroup>';

        html += '<thead>';
        html += '<tr>';
        html += '<th>구분</th>';
        html += '<th>부서명</th>';
        html += '<th>직위</th>';
        html += '<th>성명</th>';
        html += '<th>조장/간사</th>';
        html += '</tr>';

        for(let i=0; i<list.length; i++){
            html += '<tr>';
            html += '<td style="text-align: center">'+list[i].STUDY_CLASS_TEXT+'</td>';
            html += '<td>'+list[i].STUDY_DEPT_NAME+' '+list[i].STUDY_TEAM_NAME+'</td>';
            html += '<td>'+list[i].STUDY_POSITION_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].STUDY_EMP_NAME+'</td>';
            html += '<td style="text-align: center">';
            if(list[i].STUDY_CLASS_TEXT == "조장") {
                html += '<input type="button" class="k-button k-button-solid-info" value="조장" onclick="studyView.updBtn(\''+list[i].STUDY_USER_SN+'\', \''+list[i].STUDY_INFO_SN+'\', \'1\', \'조장\')"/> ' + '<input type="button" class="k-button k-button-solid-base" value="간사" onclick="studyView.updBtn(\''+list[i].STUDY_USER_SN+'\', \''+list[i].STUDY_INFO_SN+'\', \'2\', \'간사\')"/>';
            } else if(list[i].STUDY_CLASS_TEXT == "간사"){
                html += '<input type="button" class="k-button k-button-solid-base" value="조장" onclick="studyView.updBtn(\''+list[i].STUDY_USER_SN+'\', \''+list[i].STUDY_INFO_SN+'\', \'1\', \'조장\')"/> ' + '<input type="button" class="k-button k-button-md k-button-solid k-button-solid-error" value="간사" onclick="studyView.updBtn(\''+list[i].STUDY_USER_SN+'\', \''+list[i].STUDY_INFO_SN+'\', \'2\', \'간사\')"/>';
            }else {
                html += '<input type="button" class="k-button k-button-solid-base" value="조장" onclick="studyView.updBtn(\'' + list[i].STUDY_USER_SN + '\', \'' + list[i].STUDY_INFO_SN + '\', \'1\', \'조장\')"/> ' + '<input type="button" class="k-button k-button-solid-base" value="간사" onclick="studyView.updBtn(\'' + list[i].STUDY_USER_SN + '\', \'' + list[i].STUDY_INFO_SN + '\', \'2\', \'간사\')"/>';
            }
            html += '</td>';
            html += '</tr>';
            if(list[i].STUDY_CLASS_TEXT == "조장"){
                studyView.global.mngEmpSeq = list[i].STUDY_EMP_SEQ;
            }
        }
        $("#studyUserTable").html(html);
    },

    studyBtnSetting: function(){

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: $("#pk").val()});
        const studyInfo = studyResult.data;

        let buttonHtml = "";
        buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"결과보고서\" id=\"resultBtn\" onclick=\"studyView.fn_resultDocPop();\"/>";
        if($("#typeView").val() != "A"){
            buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"학습완료\" id=\"compBtn\" onclick=\"studyView.fn_studyComplete();\"/>";
        } else{
            if(studyInfo != null){
                let status = studyInfo.STATUS;
                if(status == "0"){
                    buttonHtml += "<input type=\"button\" id=\"studyModBtn\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-primary\" value=\"수정\" onclick=\"studyView.studyUpdatePop();\"/>";
                    buttonHtml += "<button type=\"button\" id=\"studyReqBtn\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"studyView.studyReq()\">상신</button>";
                }else if(status == "10" || status == "20" || status == "50"){
                    buttonHtml += "<button type=\"button\" id=\"studyReqBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                    buttonHtml += "<button type=\"button\" id=\"studyAppBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">결재</button>";
                }else if(status == "30" || status == "40"){
                    buttonHtml += "<input type=\"button\" id=\"studyModBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-primary\" value=\"수정\" onclick=\"studyView.studyUpdatePop();\"/>";
                    buttonHtml += "<button type=\"button\" id=\"studyReqBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
                }else if(status == "100"){
                    buttonHtml += "<button type=\"button\" id=\"studyReqBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">열람</button>";
                }else if(status == "111"){
                    buttonHtml += "<button type=\"button\" id=\"studyReqBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
                }
            }
        }
        buttonHtml += "<input type=\"button\" id=\"studyCloseBtn\" class=\"k-button k-button-solid-error\" value=\"닫기\" onclick=\"window.close();\"/>";
        $("#studyBtn").html(buttonHtml);
        console.log("buttonHtml", buttonHtml);


        if($("#mode").val() == "mng"){
            /** 관리자일때 승인 및 반려 가능 */
            if($("#status").val() == 10 || $("#status").val() == 20) {
                $("#studyAppBtn").show();
                $("#studyComBtn").show();
            }
            /** 학습일지 추가 버튼은 안보임 */
            $("#journalPopBtn").hide();

        }else /*if(studyView.global.mngEmpSeq == $("#regEmpSeq").val())*/{
            /** 학습자 중에 조장만 수정 및 승인요청, 승인취소 가능 */
            $("#studyReqBtn").show();
            if($("#status").val() == 0 || $("#status").val() == 30){
                $("#studyModBtn").show();
                $("#studyCloseBtn").show();
            }else if($("#status").val() == 10) {
                $("#studyCancelBtn").show();
            }else if($("#status").val() == 100 && $("#addStatus").val() == "N"){
                $("#compBtn").show();
            } else if($("#status").val() == 40){
                $("#studyModBtn").show();
            }
        }
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/campus/getStudyJournalList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyInfoSn = $("#pk").val();
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
            height: 250,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        if($("#addStatus").val() != 'N'){
                            return '';
                        } else {
                            return '<button type="button" id="journalPopBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="studyView.studyJournalPop(1, '+$("#pk").val()+');">' +
                                '	<span class="k-button-text">추가</span>' +
                                '</button>';
                        }


                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    title: "일시",
                    width: 250,
                    template: function(row){
                        return row.JOURNAL_DT + " (" + row.JOURNAL_START_TIME +"~"+row.JOURNAL_END_TIME+" / "+row.JOURNAL_TIME+")";
                    }
                }, {
                    field: "JOURNAL_LOCATE",
                    title: "장소"
                }, {
                    title: "조장검토",
                    width: 100,
                    template: function(e){
                        if(e.CAPTAIN_APPOVAL_YN == 'Y'){
                            return '<div style="cursor: pointer; font-weight: bold" onclick="studyView.studyJournalPop(2, '+e.STUDY_INFO_SN+', '+e.STUDY_JOURNAL_SN+')">검토완료</div>';
                        }else{
                            return '<div style="cursor: pointer; font-weight: bold" onclick="studyView.studyJournalPop(2, '+e.STUDY_INFO_SN+', '+e.STUDY_JOURNAL_SN+')">검토미완료</div>';
                        }
                    }
                }, {
                    width: 150,
                    template: function(row){

                        if($("#addStatus").val() != 'N'){
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="studyView.studyPrintPop('+row.STUDY_JOURNAL_SN+')">인쇄</button> ';
                        } else {
                            return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="studyView.studyPrintPop('+row.STUDY_JOURNAL_SN+')">인쇄</button> ' +
                                '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" name="kbtn" onclick="studyView.fn_delete('+row.STUDY_JOURNAL_SN+')">삭제</button>';
                        }

                    }
                }
            ]
        }).data("kendoGrid");
    },


    studyReq: function(status){
        var data = {
            studyInfoSn : $("#pk").val(),
            status : status
        }

        if (!studyView.global.studyUserList.some(item => item.STUDY_CLASS_TEXT === '조장') || !studyView.global.studyUserList.some(item => item.STUDY_CLASS_TEXT === '간사')) {
            alert('조장 및 간사를 선택해주세요.');
            return;
        }


        $("#studyDraftFrm").one("submit", function() {
            var url = "/Campus/pop/studyApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/studyApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");

        /*if(studyView.global.mngEmpSeq != $("#regEmpSeq").val()){
            alert("승인요청은 조장만 가능합니다.");
            return;
        }*/

        //var result = customKendo.fn_customAjax("/campus/studyReq", data);

        /*if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 100){
                alert("승인이 완료되었습니다.");
            }
            window.close();
            opener.gridReload();
        }*/
    },

    updBtn: function(pk, fk, studyClass, studyText){
        if(pk == "" || pk == undefined || pk == null){
            alert("잘못된 접근입니다. 로그아웃 후 재시도 바랍니다.");
            return;
        }

        let data = {
            studyUserSn: pk,
            studyInfoSn: fk,
            studyClassSn: studyClass,
            studyClassText: studyText
        }
        studyView.setStudyUserMngUpdate(data);
    },

    studyPrintPop: function(pk){
        let url = "/Campus/pop/studyPrintPop.do?mode=upd&studyInfoSn="+$("#pk").val()+"&studyJournalSn="+pk;
        let name = "studyPrintPop";
        let option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    setStudyUserMngUpdate: function(data){
        $.ajax({
            url : "/campus/setStudyUserMngUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                studyView.dataSet();
            },
            error : function(e) {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    studyJournalPop: function(type, fk, pk){
        let url = "";
        if(fk == null || fk == "" || fk == undefined){
            url = "/Campus/pop/studyJournalPop.do";
        }else if(type == 1){
            url = "/Campus/pop/studyJournalPop.do?pk="+fk;
        }else if(type == 2){
            url = "/Campus/pop/studyJournalPop.do?pk="+fk+"&studyJournalSn="+pk;
        }
        let name = "studyJournalPop";
        let option = "width = 800, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_delete : function (key){
        if(!confirm("운영일지를 삭제하시겠습니까?")){
            return;
        }

        $.ajax({
            url : "/campus/deleteStudyJournal",
            data : {
                studyJournalSn : key
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(rs.msg);
                    studyView.mainGrid();
                }
            }
        })
    },

    fn_studyComplete : function (){

        var data = {
            studyInfoSn : $("#pk").val()
        }

        $.ajax({
            url: "/campus/getStudyJournalList",
            data: data,
            type: "post",
            dataType: "json",
            success: function (journalResult) {

                var journalList = journalResult.list;
                
                if (journalList.length === 0) {
                    alert("학습일지를 작성해주세요.");
                    return;
                }
                for (var i = 0; i < journalList.length; i++) {
                    var row = journalList[i];

                    if (row.CAPTAIN_APPOVAL_YN == 'N') {
                        alert("학습일지 조장 검토를 완료해주세요.");
                        return;
                    }
                }

                if(!confirm("학습완료 후에는 학습일지를 추가, 수정, 삭제하실 수 없습니다. 학습완료하시겠습니까?")){
                    return ;
                }


            $.ajax({
                url : "/campus/setStudyInfoComplete",
                data : data,
                type : "post",
                dataType : "json",
                success: function(rs){
                    if(rs.code == 200){
                        alert(rs.msg);
                        if(opener.parent != undefined){
                            opener.parent.studyInfo.mainGrid();
                        }
                        studyView.fn_resultDocPop();
                        location.reload();
                    }
                }
            });
        }

    });
},

    fn_resultDocPop : function (){
        let url = "/campus/pop/resultDocPop.do?pk="+$("#pk").val();

        let name = "studyJournalPop";
        let option = "width = 800, height = 700, top = 100, left = 200, location = no";

        if($("#mode").val() != ""){
            url += "&mode="+$("#mode").val();
        }

        if($("#studyResultSn").val() != ""){
            url += "&studyResultSn="+$("#studyResultSn").val();
        } else {
            name = "studyJournalPop";
            option = "width = 800, height = 600, top = 100, left = 200, location = no";
        }

        window.open(url, name, option);
    },

    studyUpdatePop: function(){
        let url = "/Campus/pop/studyReqPop.do?mode=upd&pk="+$("#pk").val();
        let name = "studyReqPop";
        let option = "width = 1170, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}