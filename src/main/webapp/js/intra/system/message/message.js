var message = {
    global : {

    },
}

function checkedNodeIds(nodes, checkedNodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            if (nodes[i].PHONE_USER_NUM !== undefined) {
                checkedNodes.push(nodes[i].PHONE_USER_NUM);
            }
        }

        if (nodes[i].hasChildren) {
            checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
    }
}

function onCheck() {
    var checkedNodes = [],
        treeView = $("#menuTreeView").data("kendoTreeView"),
        message;

    checkedNodeIds(treeView.dataSource.view(), checkedNodes);
    console.log("checkedNodes");
    console.log(checkedNodes);
    if (checkedNodes.length > 0) {
        $("#destDiv").empty();
        $("#destDiv").append("<div style=\"color: red; text-align: left; width: 95%; margin: 5px auto;\">* 전화번호부 목록에서 선택</div>");
        for (var i = 0; i < checkedNodes.length; i++) {
            message = checkedNodes[i];
            console.log(message);
            var input = $("<input>")
                .attr("type", "text")
                .attr("name", "dest_phone")
                .attr("id", "dest_phone"+i)
                .attr("class", "dest_phone")
                .attr("cname", "테스트")
                .attr("value", message)
                .attr("phone", message)
                .attr("style", "width: 95%; margin-bottom:5px;")
                .attr("disabled", "disabled")
                .val(message);

            $("#destDiv").append(input);
        }
    } else {
        $("#destDiv").empty();
        $("#destDiv").append("<div style=\"color: red; text-align: left; width: 95%; margin: 5px auto;\">* 전화번호부 목록에서 선택</div>");
        var message = "받는사람을 체크해주세요.";
        var input = $("<input>")
            .attr("type", "text")
            .attr("name", "dest_phone")
            .attr("class", "destPhone")
            .attr("value", message)
            .attr("style", "width: 95%;")
            .attr("disabled", "disabled")
        $("#destDiv").append(input);
    }


}

function menuTreeSearch(e) {
    var query      = e;
    var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;
    filter(dataSource, query);
}

function filter(dataSource, query) {
    var hasVisibleChildren = false;
    var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var text = item.PHONE_USER_NAME || '';
        var itemVisible = query === true || query === "" || text.indexOf(query) >= 0;

        var anyVisibleChildren = filter(item.children, itemVisible || query);

        hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

        item.hidden = !itemVisible && !anyVisibleChildren;
    }

    if (data) {
        dataSource.filter({ field: "hidden", operator: "neq", value: true });
    }

    return hasVisibleChildren;
}

function treeClick(e){
    var item = $("#menuTreeView").data("kendoTreeView").dataItem(e.node);
    if(item.PHONE_USER_NAME == null){
        dataMod(item);
    }else{
        dataModUser(item);
    }
}

function inputReset(){
    var treeview = $("#menuTreeView").data("kendoTreeView");
    treeview.select($());
    /*getMenuList();*/
    $("#groupId, #groupName").val("");
    $("#modifyBtn").css('display','none');
    $("#saveBtn").show();
}

function inputResetUser(){
    var treeview = $("#menuTreeView").data("kendoTreeView");
    treeview.select($());
    /*getMenuList();*/
    $("#phoneNameUser, #phoneUserNum, #phoneUserId").val("");
    $("#userGroupId").data("kendoDropDownList").value("");
    $("#modifyBtnUser").css('display','none');
    $("#saveBtnUser").show();
}


function dataMod(v){
    $('#groupId').val(v.GROUP_ID);
    $('#groupName').val(v.GROUP_NAME);
    $('#loginEmpSeq').val(v.REG_EMP_SEQ);
    $("#modifyBtn").css('display','block');
    $("#saveBtn").css('display','none');

}

function dataModUser(v){
    $('#phoneNameUser').val(v.PHONE_USER_NAME);
    $('#phoneUserNum').val(v.PHONE_USER_NUM);
    $('#phoneUserId').val(v.PHONE_USER_ID);
    $('#loginEmpSeq').val(v.REG_EMP_SEQ);
    $('#userGroupId').data("kendoDropDownList").value(v.GROUP_ID);
    $("#modifyBtnUser").css('display','block');
    $("#saveBtnUser").css('display','none');

}