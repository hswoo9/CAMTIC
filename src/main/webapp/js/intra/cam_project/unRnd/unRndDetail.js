var unRndDetail = {


    fn_defaultScript : function (){

        customKendo.fn_textBox(["mngDeptName", "mngEmpName"]);


        $("#unRndObj, #unRndCont").kendoTextArea({
            rows : 7
        });

        unRndDetail.fn_setData();
    },


    fn_save : function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),

            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),

            unRndObj : $("#unRndObj").val(),
            unRndCont : $("#unRndCont").val(),

            empSeq: $("#empSeq").val(),
            regEmpSeq : $("#empSeq").val(),
        }

        if($("#unRndSn").val() != "" && $("#unRndSn").val() != null){
            parameters.unRndSn = $("#unRndSn").val();
            parameters.stat = "upd"
        } else {
            parameters.stat = "ins"
        }

        var fd = new FormData();
        for(var key in parameters){
            fd.append(key, parameters[key]);
        }

        if($("#bsPlanFile")[0].files.length == 1){
            fd.append("bsPlanFile", $("#bsPlanFile")[0].files[0]);
        }

        if($("#bsPlanFileName").text() == ""){
            alert("사업계획서를 등록해주세요.");
            return;
        }

        $.ajax({
            url : "/projectUnRnd/setUnRndDetail",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    location.reload();
                }
            }
        })
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        var result = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", parameters);

        var rs = result.map;

        unRndDetail.fn_buttonSet(rs);

        if(rs != null){
            $("#rndSn").val(rs.RND_SN);
            $("#mngDeptName").val(rs.MNG_DEPT_NAME);
            $("#mngEmpName").val(rs.MNG_EMP_NAME);
            $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
            $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);
            $("#unRndObj").val(rs.UN_RND_OBJ);
            $("#unRndCont").val(rs.UN_RND_CONT);

            $("#unRndSn").val(rs.UN_RND_SN);
            $("#bsPlanFileName").text(rs.file_org_name + "." + rs.file_ext);
        }
    },

    fn_approve : function() {
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep2").val();
        var supDepSub = $("#supDepSub2").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);



        var parameters = {
            pjtSn : $("#pjtSn").val(),
            rndSn : $("#rndSn").val(),
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),
            pType : "I",
            pProjectNM : $("#pjtNm").val(),
            pState : '1',
            pProjectNMEx : $("#pjtSubNm").val(),
            pSDate : $("#sbjStrDe").val().replaceAll("-", ""),
            pEDate : $("#sbjEndDe").val().replaceAll("-", ""),
        }

        if(supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(pjtStat == ""){
            alert("사업성격을 선택해주세요.");
            return;
        }
        if(pjtStatSub == ""){
            alert("사업성격1을 선택해주세요.");
            return;
        }


        if(!confirm("수주확정을 하시겠습니까?")){
            return ;
        }

        $.ajax({
            url : "/projectUnRnd/setDelvApprove",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    /** 저장 성공 시 전자결재 상신프로세스 시작 */
                    $("#rndDelvDraftFrm").one("submit", function(){
                        const url = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
                        const name = "_self";
                        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
                        window.open(url, name, option);
                        this.action = "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do";
                        this.method = 'POST';
                        this.target = '_self';
                    }).trigger("submit");
                }
            }
        });
    },

    fn_buttonSet : function(rndMap){
        let buttonHtml = "";
        if(rndMap != null){
            if(rndMap.STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="approveBtn" style="float: right; margin-right:5px;" class="k-button k-button-solid-info" onclick="openModal()">상신</button>';
            }else if(rndMap.STATUS == "10"){
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+rndMap.DOC_ID+'\', \''+rndMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(rndMap.STATUS == "30" || rndMap.STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+rndMap.DOC_ID+'\', \''+rndMap.DOC_MENU_CD+'\', \''+rndMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(rndMap.STATUS == "100"){
                buttonHtml += '<button type="button" id="canBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+rndMap.DOC_ID+'\', \''+rndMap.APPRO_KEY+'\', \''+rndMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>';
        }

        $("#detailBtnDiv").html(buttonHtml);
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },
}