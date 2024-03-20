const ojtView = {
    global: {
        ojtInfo: {},
        propagUser: [],
        ojtPlanLength: 0,
        ojtResultLength: 0
    },

    init: function(){
        window.resizeTo(1200, 900);
        ojtView.dataSet();
        ojtView.mainGrid();
        ojtView.ojtPlanGrid();
        ojtView.settingTempFileDataInit();
    },

    dataSet: function(){
        ojtView.buttonSet();

        let ojtOjtResultSn = customKendo.fn_customAjax("/campus/getOjtOjtResultSnOne", {
            pk: $("#pk").val()
        }).data;

        let ojtInfo = customKendo.fn_customAjax("/campus/getStudyInfoOne", {
            pk: $("#pk").val()
        }).data;

        ojtView.global.ojtOjtResultSn = ojtOjtResultSn;
        ojtView.global.ojtInfo = ojtInfo;

        if(ojtOjtResultSn == undefined) {
            $("#ojtOjtResultSn").val("");
        }else {
            $("#ojtOjtResultSn").val(ojtOjtResultSn.OJT_OJT_RESULT_SN);
        }
        $("#status").val(ojtInfo.STATUS);
        $("#ojtNameTd").text(ojtInfo.STUDY_NAME);
        $("#ojtDtTd").text(ojtInfo.START_DT+" ~ "+ojtInfo.END_DT);
        $("#ojtLocationTd").text(ojtInfo.STUDY_LOCATION);
        $("#ojtObjectTd").text(ojtInfo.STUDY_OBJECT);
        $("#ojtContentTd").text(ojtInfo.STUDY_CONTENT);
        $("#ojtAmtTd").text(fn_numberWithCommas(ojtInfo.STUDY_MONEY));
        $("#ojtAmtTextTd").text(ojtInfo.STUDY_MONEY_VAL);
        $("#regDateTd").text(ojtInfo.REG_DT);
        if(ojtInfo.STATUS == 0){
            $("#statusTd").text("신청서 작성중");
        }else if(ojtInfo.STATUS == 10){
            $("#statusTd").text("신청서 승인요청중");
        }else if(ojtInfo.STATUS == 30){
            $("#statusTd").text("신청서 반려됨");
        }else if(ojtInfo.STATUS == 100){
            $("#statusTd").text("OJT 진행중(0회)");
            $(".ojtResult").show();
            ojtView.ojtResultGrid();
        }else if(ojtInfo.STATUS == 101){
            $("#statusTd").text("OJT완료");
            $(".ojtResult").show();
            ojtView.ojtResultGrid();

            if(ojtInfo.ADD_STATUS == "Y" || ojtInfo.ADD_STATUS == "C" || ojtInfo.ADD_STATUS == "S"){
                $("#resultBtn").css("display", "");
            }
        }

        $("#regDeptTd").text(ojtInfo.deptNm + " " + ojtInfo.teamNm);
        if(ojtInfo.dutyNm == ""){
            $("#regPositionTd").text(ojtInfo.positionNm);
        }else{
            $("#regPositionTd").text(ojtInfo.dutyNm);
        }
        $("#regEmpNameTd").text(ojtInfo.REG_EMP_NAME);
        $("#jobDetailNmTd").text(ojtInfo.jobDetailNm);

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

        let buttonHtml = "";
        buttonHtml += "<button type=\"button\" id=\"resultBtn\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"ojtView.fn_resultPop()\">결과보고서</button>";
        if($("#typeView").val() != "A"){
            buttonHtml += "<input type=\"button\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" value=\"학습완료\" id=\"compBtn\" onclick=\"ojtView.fn_studyComplete();\"/>";
        }
        if(studyInfo != null){
            let status = studyInfo.STATUS;
            if(status == "0"){
                buttonHtml += "<input type=\"button\" id=\"studyModBtn\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-primary\" value=\"수정\" onclick=\"ojtView.fn_ojtUpdatePop();\"/>";
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px\" class=\"k-button k-button-solid-info\" onclick=\"ojtView.fn_ojtCertReq()\">상신</button>";
            }else if(status == "10" || status == "20" || status == "50"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-error\" onclick=\"docApprovalRetrieve('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', 1, 'retrieve');\">회수</button>";
                buttonHtml += "<button type=\"button\" id=\"recBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">결재</button>";
            }else if(status == "30" || status == "40"){
                buttonHtml += "<input type=\"button\" id=\"studyModBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-primary\" value=\"수정\" onclick=\"ojtView.fn_ojtUpdatePop();\"/>";
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-info\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'reDrafting');\">재상신</button>";
            }else if(status == "100"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"approveDocView('"+studyInfo.DOC_ID+"', '"+studyInfo.APPRO_KEY+"', '"+studyInfo.DOC_MENU_CD+"');\">열람</button>";
            }else if(status == "111"){
                buttonHtml += "<button type=\"button\" id=\"appBtn\" style=\"display: none; margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+studyInfo.DOC_ID+"', '"+studyInfo.DOC_MENU_CD+"', '"+studyInfo.APPRO_KEY+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }
        }
        buttonHtml += "<input type=\"button\" id=\"studyCloseBtn\" class=\"k-button k-button-solid-error\" value=\"닫기\" onclick=\"window.close();\"/>";
        $("#studyBtn").html(buttonHtml);
        console.log("buttonHtml", buttonHtml);

        let mode = $("#mode").val();
        let status = studyInfo.STATUS;
        if(mode == "mng"){
            $("#studyModBtn").hide();
            $("#ojtPlanAddBtn").hide();
            if(status == 10){
                $("#recBtn").show();
                $("#comBtn").show();
            }
        }else {
            if(status == 0 || status == 30){
                $("#appBtn").show();
                $("#studyModBtn").show();
            }else if(status == 10){
                $("#appBtn").show();
            }else if(status == 100 && $("#addStatus").val() == "N"){
                $("#ojtPlanAddBtn").hide();
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

    fn_ojtCertReq: function(status){
        if(status == 10 && ojtView.global.ojtPlanLength == 0){
            alert("지도계획이 작성되지 않았습니다"); return;
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




         /*if(status == 100 && ojtView.global.ojtResultLength == 0){
            alert("학습일지가 작성되지 않았습니다"); return;
        }*/

        /*let data = {
            studyInfoSn : $("#pk").val(),
            pk: $("#pk").val(),
            statusNow: $("#status").val(),
            status : status
        }

        if(data.statusNow == 100){
            $.ajax({
                url: "/campus/getOjtResultList",
                data: data,
                type: "post",
                dataType: "json",
                success: function (ojtResult) {

                    var ojtResultList = ojtResult.list;

                    if (ojtResultList.length === 0) {
                        alert("학습일지를 작성해주세요.");
                        return;
                    }

                    customKendo.fn_customAjax("/campus/setStudyInfoComplete", data);
                    var result = customKendo.fn_customAjax("/campus/studyReq", data);

                    if (result.flag) {
                        if (status == 10) {
                            alert("승인 요청이 완료되었습니다.");
                            window.close();
                        } else if (status == 100) {
                            alert("승인되었습니다.");
                            window.close();
                        } else if (status == 30) {
                            alert("반려되었습니다.");
                            window.close();
                        } else if (status == 0) {
                            alert("승인요청이 취소되었습니다.");
                            window.close();
                        } else if (status == 101) {
                            alert("지도 완료되었습니다.");
                            ojtView.fn_resultPop();

                        }
                        opener.gridReload();

                    }
                }
            });
        }else if(data.statusNow == 0) {
            $.ajax({
                url: "/campus/getOjtPlanList",
                data: data,
                type: "post",
                dataType: "json",
                success: function (ojtPlan) {

                    var ojtPlanList = ojtPlan.list;

                    if (ojtPlanList.length === 0) {
                        alert("지도내용을 작성해주세요.");
                        return;
                    }

                    customKendo.fn_customAjax("/campus/setStudyInfoComplete", data);
                    var result = customKendo.fn_customAjax("/campus/studyReq", data);

                    if (result.flag) {
                        if (status == 10) {
                            alert("승인 요청이 완료되었습니다.");
                            window.close();
                        } else if (status == 100) {
                            alert("승인되었습니다.");
                            window.close();
                        } else if (status == 30) {
                            alert("반려되었습니다.");
                            window.close();
                        } else if (status == 0) {
                            alert("승인요청이 취소되었습니다.");
                            window.close();
                        } else if (status == 101) {
                            alert("지도 완료되었습니다.");
                            ojtView.fn_resultPop();

                        }
                        opener.gridReload();

                    }
                }
            });
        }else{
            customKendo.fn_customAjax("/campus/setStudyInfoComplete", data);
            var result = customKendo.fn_customAjax("/campus/studyReq", data);

            if (result.flag) {
                if (status == 10) {
                    alert("승인 요청이 완료되었습니다.");
                    window.close();
                } else if (status == 100) {
                    alert("승인되었습니다.");
                    window.close();
                } else if (status == 30) {
                    alert("반려되었습니다.");
                    window.close();
                } else if (status == 0) {
                    alert("승인요청이 취소되었습니다.");
                    window.close();
                } else if (status == 101) {
                    alert("지도 완료되었습니다.");
                    ojtView.fn_resultPop();

                }
                opener.gridReload();

            }
        }*/
    },

    ojtPlanGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOjtPlanList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    ojtView.global.ojtPlanLength = data.list.length
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#ojtPlanGrid").kendoGrid({
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
                        return '<button type="button" id="ojtPlanAddBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtView.ojtPlanPop(\'ins\', '+$("#pk").val()+');">' +
                            '	<span class="k-button-text">추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "회차",
                    template: "#= ++record #차",
                    width: 70
                }, {
                    title: "기간",
                    width: 300,
                    template: function(row){
                        return row.START_DT + " ~ " + row.END_DT;
                    }
                }, {
                    field: "TITLE",
                    title: "중점 지도항목"
                }, {
                    field: "ETC",
                    title: "비고",
                    width: 300
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    ojtResultGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOjtResultList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.pk = $("#pk").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    ojtView.global.ojtResultLength = data.list.length
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#ojtResultGrid").kendoGrid({
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
                        return '<button type="button" id="ojtPlanAddBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtView.ojtResultPop(\'ins\', '+$("#pk").val()+');">' +
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
                    ojtView.ojtResultModifyPop('upd', dataItem.STUDY_INFO_SN, dataItem.OJT_RESULT_SN);
                });
            },
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 70
                }, {
                    title: "일시",
                    template: function(row){
                        return row.OJT_DT + " " + row.START_TIME + " ~ " + row.END_TIME;
                    }
                }, {
                    title: "지도시간",
                    field: "EDU_FULL_TIME",
                    width : 100,
                }, {
                    field: "EDU_TIME",
                    title: "인정시간",
                    columns : [{
                        field: "EDU_TIME",
                        title : "지도자",
                        width: 200
                    },{
                        title : "학습자",
                        width: 200,
                        template : function (e){
                            return e.EDU_TIME_HALF.toString().substring(0,3)
                        }
                    }],
                }, {
                    field: "",
                    title: "처리명령",
                    width: 200,
                    template: function(row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="ojtView.ojtPrintPop('+row.OJT_RESULT_SN+')">인쇄</button> ' +
                            '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-error" onclick="ojtView.fn_delete('+row.OJT_RESULT_SN+')">삭제</button>';
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    ojtPlanPop: function(mode, pk){
        let url = "/Campus/pop/ojtPlanPop.do?mode="+mode+"&pk="+pk;
        let name = "ojtPlanPop";
        let option = "width = 1060, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtResultPop: function(mode, pk){
        let url = "/Campus/pop/ojtResultPop.do?mode="+mode+"&pk="+pk;
        let name = "ojtResultPop";
        let option = "width = 1060, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtResultModifyPop: function(mode, pk, ojtResultSn){
        let url = "/Campus/pop/ojtResultPop.do?mode="+mode+"&pk="+pk+"&ojtResultSn="+ojtResultSn;
        let name = "ojtResultPop";
        let option = "width = 1060, height = 600, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtPrintPop: function(pk){
        let url = "/Campus/pop/ojtPrintPop.do?mode=upd&studyInfoSn="+$("#pk").val()+"&ojtResultSn="+pk;
        let name = "ojtPrintPop";
        let option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_delete: function (ojtResultSn){
        $.ajax({
            url : "/campus/deleteOjtResult",
            data : {
                ojtResultSn : ojtResultSn
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert(rs.msg);
                    $("#ojtResultGrid").data("kendoGrid").dataSource.read();
                }
            }
        })
    },

    fn_resultPop: function (){
        let url = "/campus/pop/resultOjtDocPop.do?pk="+$("#pk").val();

        let name = "studyOjtPop";
        let option = "width = 800, height = 700, top = 100, left = 200, location = no";

        /*if($("#mode").val() != ""){
            url += "&mode="+$("#mode").val();
        }*/

        if($("#ojtOjtResultSn").val() != "" && $("#ojtOjtResultSn").val() != "undefined" && $("#ojtOjtResultSn").val() != null){
            if($("#mode").val() == "mng"){
                url += "&mode="+$("#mode").val();
            }else{
                url += "&mode=modify";
            }
            /*url += "&mode=modify";*/

            url += "&ojtOjtResultSn="+$("#ojtOjtResultSn").val();

        } else {
            if($("#mode").val() != ""){
                url += "&mode="+$("#mode").val();
            }
            name = "studyOjtPop";
            option = "width = 800, height = 600, top = 100, left = 200, location = no";
        }

        window.open(url, name, option);
    },


    fn_ojtUpdatePop: function (){
        let url = "/Campus/pop/studyReqPop.do?mode=upd&pk="+$("#pk").val();
        let name = "studyReqPop";
        let option = "width = 1170, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_studyComplete : function (){
        var data = {
            studyInfoSn : $("#pk").val(),
            pk : $("#pk").val()
        }

        const ojtPlanList = customKendo.fn_customAjax("/campus/getOjtPlanList", data).list;
        const ojtResultList = customKendo.fn_customAjax("/campus/getOjtResultList", data).list;

        if (ojtPlanList.length === 0) {
            alert("지도내용을 작성해주세요.");
            return;
        }
        if (ojtResultList.length === 0) {
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
                    ojtView.fn_resultPop();
                    location.reload();
                }
            }
        });
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