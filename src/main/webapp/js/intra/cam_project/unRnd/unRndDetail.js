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

        if(rs.STATUS == 100){
            $("#aBtn").css("display", "");
        } else if(rs.UN_RND_SN != "" && rs.UN_RND_SN != null && rs.UN_RND_SN != undefined){
            $("#approveBtn").css("display", "");
        }

        $("#rndSn").val(rs.RND_SN);
        $("#mngDeptName").val(rs.MNG_DEPT_NAME);
        $("#mngEmpName").val(rs.MNG_EMP_NAME);
        $("#mngDeptSeq").val(rs.MNG_DEPT_SEQ);
        $("#mngEmpSeq").val(rs.MNG_EMP_SEQ);
        $("#unRndObj").val(rs.UN_RND_OBJ);
        $("#unRndCont").val(rs.UN_RND_CONT);

        $("#unRndSn").val(rs.UN_RND_SN);
        $("#bsPlanFileName").text(rs.file_org_name + "." + rs.file_ext);
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
                    location.reload();
                }
            }
        });
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },
}