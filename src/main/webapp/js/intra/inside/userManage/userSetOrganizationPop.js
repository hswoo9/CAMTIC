var userSetOrganization = {
    global : {
        datas : "",
    },

    init : function(){
        customKendo.fn_textBox(["deptName", "teamName", "deptSortSn", "teamSortSn"]);
        userSetOrganization.makeTreeView();
    },

    makeTreeView : function(){
        var result = customKendo.fn_customAjax("/common/organizationMakeTreeView.do", {});
        if(result.flag){
            userSetOrganization.global.datas = JSON.parse(result.data)
            $("#deptTree").kendoTreeView({
                dataSource: JSON.parse(result.data),
                dataTextField:['dept_name'],
                select: userSetOrganization.treeClick,
            });
        }
    },

    treeClick : function(e) {
        var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
        $(".teamTr").show();
        $("#deptSeq").val("");
        $("#deptName").val("");
        $("#deptSortSn").val("");
        $("#teamSeq").val("");
        $("#teamName").val("");
        $("#teamSortSn").val("");

        $("#newDeptChk").prop("checked", false);
        $("#newTeamChk").prop("checked", false);

        if(item.dept_seq != "1000"){
            if(item.dept_level == '1'){
                $("#deptSeq").val(item.dept_seq);
                $("#deptName").val(item.dept_name);
                $("#deptSortSn").val(item.order_sn);
            }else{
                $("#deptSeq").val(item.parent_dept_seq);
                $("#deptName").val(userSetOrganization.global.datas[0].items.find(element => element.dept_seq === item.parent_dept_seq).dept_name);
                $("#deptSortSn").val(userSetOrganization.global.datas[0].items.find(element => element.dept_seq === item.parent_dept_seq).order_sn);
                $("#teamSeq").val(item.dept_seq);
                $("#teamName").val(item.dept_name);
                $("#teamSortSn").val(item.order_sn);
            }
        }
    },

    newChk : function(e){
        if($(e).attr("id") == "newDeptChk"){
            $(".teamTr").hide();
            $('#deptSeq').val('');
            $('#deptName').val('');
            $("#deptSortSn").val('');
            var item = $("#deptTree").data("kendoTreeView").dataItem($("span.k-selected"));
            if(item.dept_level == "2"){
                $("#teamSeq").val(item.dept_seq);
                $("#teamName").val(item.dept_name);
                $("#teamSortSn").val(item.order_sn);
            }
        }else{
            $(".teamTr").show();
            $('#teamName').val('');
            $('#teamSeq').val('');
            $("#teamSortSn").val('');
            var item = $("#deptTree").data("kendoTreeView").dataItem($("span.k-selected"));
            if(item.dept_level == "1"){
                $("#deptSeq").val(item.dept_seq);
                $("#deptName").val(item.dept_name);
                $("#deptSortSn").val(item.order_sn);
            }else{
                $("#deptSeq").val(item.parent_dept_seq);
                $("#deptName").val(userSetOrganization.global.datas[0].items.find(element => element.dept_seq === item.parent_dept_seq).dept_name);
                $("#deptSortSn").val(userSetOrganization.global.datas[0].items.find(element => element.dept_seq === item.parent_dept_seq).order_sn);
            }
        }
    },

    setDeptInfo : function(){
        if(!$("#deptName").val()){
            alert("부서 이름을 입력해주세요.");
            $("#deptName").focus();
            return;
        }

        if($("#newTeamChk").is(":checked") && !$("#deptSeq").val()){
            alert("부서를 선택해주세요.");
            return;
        }else if($("#newTeamChk").is(":checked")){
            if(!$("#teamName").val()){
                alert("팀 이름을 입력해주세요.");
                return;
            }
        }

        if(!$("#newDeptChk").is(":checked") && !$("#newTeamChk").is(":checked") && (!$("#deptSeq").val() || !$("#teamSeq").val())){
            alert("수정 할 데이터가 없습니다.\n부서 생성시 신규 버튼을 선택해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            var data = {
                deptSeq : $("#deptSeq").val(),
                deptName : $("#deptName").val(),
                deptSortSn : $("#deptSortSn").val(),
                newDeptChk : $("#newDeptChk").is(":checked") ? "Y" : "N",
                teamSeq : $("#teamSeq").val(),
                teamName : $("#teamName").val(),
                newTeamChk : $("#newTeamChk").is(":checked") ? "Y" : "N",
                teamSortSn : $("#teamSortSn").val(),
                empSeq : $("#regEmpSeq").val(),
            }

            var result = customKendo.fn_customAjax("/common/setDeptInfo.do", data);
            if(result.flag){
                alert("저장되었습니다.");
                $("#deptTree").data("kendoTreeView").destroy();
                userSetOrganization.makeTreeView();
            }
        }
    },

    setDeptInfoDel : function(){
        var item = $("#deptTree").data("kendoTreeView").dataItem($("span.k-selected"));
        if(item == null){
            alert("선택된 부서가 없습니다.");
            return;
        }

        if(confirm("부서 삭제시 하위 부서 데이터와 직원 데이터를 사용할 수 없습니다.\n부서를 삭제하시겠습니까? \n\n선택 부서 : [" + item.dept_name + "]")){
            var data = {
                deptSeq : item.dept_seq,
                empSeq : $("#regEmpSeq").val(),
            }

            var result = customKendo.fn_customAjax("/common/setDeptInfoDel.do", data);
            if(result.flag){
                alert("삭제되었습니다.");
                $("#deptTree").data("kendoTreeView").destroy();
                userSetOrganization.makeTreeView();
                $(".teamTr").show();
                $("#deptSeq").val("");
                $("#deptName").val("");
                $("#deptSortSn").val("");
                $("#teamSeq").val("");
                $("#teamName").val("");
                $("#teamSortSn").val("");

                $("#newDeptChk").prop("checked", false);
                $("#newTeamChk").prop("checked", false);
            }
        }
    },

    userSetOrganizationPop : function(e){
        var url = "/user/pop/userSetOrganizationPop.do"
        var name = "userSetOrganizationPop";
        var option = "width=1100, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}