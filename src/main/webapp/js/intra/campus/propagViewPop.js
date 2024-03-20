const propagView = {
    global: {
        propagInfo: {},
        propagUser: []
    },

    init: function(){
        window.resizeTo(1200, 700);
        propagView.dataSet();
        propagView.mainGrid();
        propagView.settingTempFileDataInit();
    },

    dataSet: function(){
        propagView.buttonSet();

        let propagInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;
        propagView.global.propagInfo = propagInfo;

        $("#propagNameTd").text(propagInfo.STUDY_NAME);
        $("#propagDtTd").text(propagInfo.START_DT+" ~ "+propagInfo.END_DT+" / 매회"+propagInfo.START_TIME+" ~ "+propagInfo.END_TIME+" (총 "+propagInfo.EDU_TERM+"회 "+propagInfo.EDU_TIME+"시간)");
        $("#propagLocationTd").text(propagInfo.STUDY_LOCATION);
        $("#propagObjectTd").text(propagInfo.STUDY_OBJECT);
        $("#propagContentTd").text(propagInfo.STUDY_CONTENT);
        $("#propagAmtTd").text(fn_numberWithCommas(propagInfo.STUDY_MONEY));
        $("#propagAmtTextTd").text(propagInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(propagInfo.REG_DT);
        if(propagInfo.STATUS == 0){
            $("#statusTd").text("신청서 작성중");
        }else if(propagInfo.STATUS == 10){
            $("#statusTd").text("신청서 승인요청중");
        }else if(propagInfo.STATUS == 30){
            $("#statusTd").text("신청서 반려됨");
        }else if(propagInfo.STATUS == 100){
            $("#statusTd").text("학습 진행중");
            $("#propagGrid").show();
            propagView.mainGrid3();
            if(propagInfo.ADD_STATUS == "N"){
                let count = customKendo.fn_customAjax("/campus/getStudyPropagList", {
                    studyInfoSn: $("#pk").val()
                }).list.length;
                    $("#compBtn").show();
            }else{
                $("#resultBtn").show();
            }
        }

        $("#regDeptTd").text(propagInfo.deptNm + " " + propagInfo.teamNm);
        if(propagInfo.dutyNm == ""){
            $("#regPositionTd").text(propagInfo.positionNm);
        }else{
            $("#regPositionTd").text(propagInfo.dutyNm);
        }
        $("#regEmpNameTd").text(propagInfo.REG_EMP_NAME);

        if($("#addStatus").val() == "Y" /*|| $("#addStatus").val() == "C"*/) {
            $("#resultBtn").css("display", "");
        }else if($("#addStatus").val() == "C"){
            $("#resultBtn").css("display", "");
        }else if($("#addStatus").val() == "S") {
            $("#resultBtn").css("display", "");
        }
    },

    buttonSet: function(){

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: $("#pk").val()});
        const studyInfo = studyResult.data;
        console.log("studyR",studyResult);

        let buttonHtml = "";
        buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"결과보고서\" id=\"resultBtn\" onclick=\"propagView.fn_resultDocPop();\"/>";
        if($("#typeView").val() != "A"){
            buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"학습완료\" id=\"compBtn\" onclick=\"propagView.fn_studyComplete();\"/>";
        }
        if(studyInfo != null){
            let status = studyInfo.STATUS;
            if(status == "0"){
                buttonHtml += "<button type=\"button\" id=\"modBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-primary\" onclick=\"propagView.fn_propagMod();\">수정</button>";
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"propagView.fn_propagCertReq()\">상신</button>";
            }else if(status == "10" || status == "20" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                buttonHtml += "<button type=\"button\" id=\"recBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">결재</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<button type=\"button\" id=\"modBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-primary\" onclick=\"propagView.fn_propagMod();\">수정</button>";
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">열람</button>";
            }else if(status == "111"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }
        }
        buttonHtml += "<input type=\"button\" id=\"studyCloseBtn\" class=\"k-button k-button-solid-error\" value=\"닫기\" onclick=\"window.close();\"/>";
        $("#studyBtn").html(buttonHtml);
        console.log("buttonHtml", buttonHtml)

        let mode = $("#mode").val();
        let status = studyInfo.STATUS;
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == "10" || status == "20"){
                $("#recBtn").show();
                $("#comBtn").show();
            }
        }else{
            if(status == "0" || status == "30"){
                $("#appBtn").show();
                $("#modBtn").show();
            }else if(status == "10"){
                $("#appBtn").show();
            }else if($("#status").val() == 100 && $("#addStatus").val() == "N"){
                $("#compBtn").show();
            }
        }
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 4;
                    data.pk = $("#pk").val();
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
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");

        let subDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyUserList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.studyClassSn = 5;
                    data.pk = $("#pk").val();
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

        $("#subGrid").kendoGrid({
            dataSource: subDataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "소속",
                    width: 300,
                    template: function(row){
                        return row.STUDY_DEPT_NAME + " " + row.STUDY_TEAM_NAME;
                    }
                }, {
                    title: "직위",
                    template: function(row){
                        return row.STUDY_DUTY_NAME == "" ? row.STUDY_POSITION_NAME : row.STUDY_DUTY_NAME;
                    }
                }, {
                    field: "STUDY_EMP_NAME",
                    title: "성명",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    mainGrid3: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/campus/getStudyPropagList",
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

        $("#mainGrid3").kendoGrid({
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
                        return '<button type="button" id="journalPopBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="propagView.studyPropagPop(1, '+$("#pk").val()+');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(){
                let grid = this;
                grid.element.off('dblclick');
                grid.tbody.find("tr").dblclick(function(){
                    const dataItem = grid.dataItem($(this).closest("tr"));
                    propagView.studyPropagPop(2, dataItem.STUDY_INFO_SN, dataItem.STUDY_PROPAG_SN);
                });
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "일시",
                    template: function(row){
                        return row.PROPAG_DT + " (" + row.START_TIME +"~"+row.END_TIME+" / "+row.EDU_TIME+")";
                    }
                }, {
                    title: "학습시간",
                    width: 150,
                    template: function(row){
                        return row.EDU_TIME + "시간";
                    }
                }, {
                    title: "인정시간",
                    columns : [
                        {
                            title: "지도자",
                            width: 150,
                            template: function(row){
                                return row.EDU_MNG_TIME + "시간";
                            }
                        }, {
                            title: "학습자",
                            width: 150,
                            template: function(row){
                                return row.EDU_USER_TIME + "시간";
                            }
                        }
                    ]
                }, {
                    title: "처리명령",
                    template: function(row){
                        return '<button type="button" style="margin-right:5px;" class="k-button k-button-solid-base" onclick="propagView.propagPrintPop('+row.STUDY_PROPAG_SN+')">인쇄</button>' +
                            '<button type="button" class="k-button k-button-solid-error" onclick="propagView.fn_delBtn('+row.STUDY_PROPAG_SN+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_propagCertReq: function(status){
        /*let data = {
            studyInfoSn : $("#pk").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/studyReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인요청이 취소되었습니다.");
            }
            opener.gridReload();
            window.close();
        }*/

        $("#studyDraftFrm").one("submit", function() {
            var url = "/Campus/pop/studyApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/studyApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    studyPropagPop: function(type, fk, pk){
        let url = "";
        if(fk == null || fk == "" || fk == undefined){
            url = "/Campus/pop/studyPropagPop.do";
        }else if(type == 1){
            url = "/Campus/pop/studyPropagPop.do?pk="+fk;
        }else if(type == 2){
            url = "/Campus/pop/studyPropagPop.do?pk="+fk+"&studyPropagSn="+pk;
        }
        let name = "studyPropagPop";
        let option = "width = 800, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    propagPrintPop: function(pk){
        let url = "/Campus/pop/propagPrintPop.do?mode=upd&studyInfoSn="+$("#pk").val()+"&studyPropagSn="+pk;
        let name = "propagPrintPop";
        let option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_delBtn: function(pk){
        customKendo.fn_customAjax("/campus/setPropagDelete", {
            pk: pk
        });
        gridReload();
    },

    fn_studyComplete : function (){
        var data = {
            studyInfoSn : $("#pk").val()
        }

        $.ajax({
            url: "/campus/getStudyPropagList",
            data: data,
            type: "post",
            dataType: "json",
            success: function (journalResult) {

                var journalList = journalResult.list;

                if (journalList.length === 0) {
                    alert("학습일지를 작성해주세요.");
                    return;
                }

                if(!confirm("학습완료 후에는 학습일지를 추가, 수정, 삭제하실 수 없습니다. 학습완료하시겠습니까?")){
                    return ;
                }

                $.ajax({
                    url: "/campus/setStudyInfoComplete",
                    data: data,
                    type: "post",
                    dataType: "json",
                    success: function (rs) {

                        if (rs.code == 200) {
                            alert(rs.msg);
                            propagView.fn_resultDocPop();
                            location.reload();
                        }
                    }
                });
            }
        });
    },

    fn_resultDocPop : function (){
        let url = "/campus/pop/resultPropagDocPop.do?pk="+$("#pk").val();

        let name = "resultPropagDocPop";
        let option = "width = 1200, height = 900, top = 100, left = 200, location = no";

        if($("#mode").val() != ""){
            url += "&mode="+$("#mode").val();
        }

        if($("#studyResultSn").val() != ""){
            url += "&studyResultSn="+$("#studyResultSn").val();
        } else {
            name = "resultPropagDocPop";
            option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        }

        window.open(url, name, option);
    },

    fn_propagMod: function(){
        let url = "/Campus/pop/studyReqPop.do?mode=upd&pk="+$("#pk").val();
        let name = "studyReqPop";
        let option = "width = 1170, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
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
}

function gridReload(){
    propagView.mainGrid3();
    propagView.dataSet();
}