<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${toDate}"/></script>
<input type="hidden" id="pageName" value="bustripList"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">문자함</h4>
            <div class="title-road">시스템관리 > 문자 &gt; 문자함</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="tab">
            <ul class="tabnav">
                <li><a href="#tab03" class="tab03">문자보내기</a></li>
            </ul>
            <div class="tabcontent" style="background-color:#fff;">
                <div id="tab03">
                    <div>
                        <table>
                            <colgroup>
                                <col width="20%">
                                <col width="40%">
                                <col width="40%">
                            </colgroup>
                            <tbody>
                            <tr>
                                <td rowspan="2">
                                    <div id="menuTabStrip">
                                        <ul>
                                            <li class="k-state-active">
                                                전화번호부 목록
                                            </li>
                                        </ul>
                                        <div>
                                            <input id="menuSearch" name="menuSearch" placeholder="이름을 입력해주세요" style="width: 87%" onkeypress="if(window.event.keyCode==13){menuTreeSearch(this.value)}"/>
                                            <button type="button" class=" k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="menuTreeSearch($('#menuSearch').val())">
                                                <span class="k-icon k-i-search k-button-icon"></span>
                                            </button>
                                            <div id="gridForm" style="height:510px; width: 300px; padding:0 0 0 10px; overflow: auto;border: 1px solid #dedfdf; margin-top:5px;">
                                                <div id="menuTreeView">
                                                </div>
                                                <%--<p id="result1" style="margin-top:10px;">문자보낼 사람을 체크해주세요.</p>--%>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td rowspan="2">
                                    <div class="msg_con_wrap" style="height: 520px; display:flex;">
                                        <div style="border:1px solid #ddd; margin-left:10px; width:84%; padding-left:10px; overflow: scroll;">
                                            <div style="background-color:#eee; height:30px;text-align: center; padding-top: 5px; margin-bottom: 10px;">받는사람</div>
                                            <div id="destDiv"><input name="dest_phone" id="dest_phone" style="width:180px;" placeholder="받는사람을 체크해주세요."></div>
                                        </div>
                                        <div class="msg_mms_box" style="margin: 0 30px;" >
                                            <textarea name="tBox_Msg" class="MsgBox ImeMode" id="tBox_Msg" placeholder="[메시지입력창]" rows="12" cols="20"></textarea>
                                            <div class="mt60">
                                                <input id="send" type="button" value="전송">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style="vertical-align: top;">
                                    <div id="menuEditorTabStrip">
                                        <ul>
                                            <li class="k-state-active">
                                                그룹 등록/수정
                                            </li>
                                        </ul>
                                        <div id="gridForm2" style="height:190px;overflow: auto;border: 1px solid #dedfdf;">
                                            <form id="menuSaveFrm">
                                                <table class="table table-bordered mb-0" style="border: none;">
                                                    <colgroup>
                                                        <col width="30%">
                                                        <col width="70%">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="2" style="border: none">
                                                            <div style="display:flex; justify-content: flex-end;">
                                                                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="inputReset()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">초기화</span>
                                                                </button>
                                                                <button type="button" id="modifyBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px; display:none;" onclick="dataModGroup()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">수정</span>
                                                                </button>
                                                                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="setMenu()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">저장</span>
                                                                </button>
                                                                <button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setMenuDel()">
                                                                    <span class="k-icon k-i-cancel k-button-icon"></span>
                                                                    <span class="k-button-text">삭제</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">그룹번호
                                                        </th>
                                                        <td>
                                                            <input type="text" id="groupId" name="groupId" style="width:50%;" disabled>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">
                                                            <span class="red-star">*</span>그룹명
                                                        </th>
                                                        <td>
                                                            <input type="text" id="groupName" name="groupName">
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="menuEditorTabStripUser">
                                        <ul>
                                            <li class="k-state-active">
                                                사용자 등록/수정
                                            </li>
                                        </ul>
                                        <div id="gridForm2User" style="height:300px;overflow: auto;border: 1px solid #dedfdf;">
                                            <form id="menuSaveFrmUser">
                                                <table class="table table-bordered mb-0" style="border: none;">
                                                    <colgroup>
                                                        <col width="30%">
                                                        <col width="70%">
                                                    </colgroup>
                                                    <tbody>
                                                    <tr>
                                                        <td colspan="2" style="border: none">
                                                            <div style="display:flex; justify-content: flex-end;">
                                                                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="inputResetUser()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">초기화</span>
                                                                </button>
                                                                <button type="button" id="modifyBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px; display:none;" onclick="dataUserMod()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">수정</span>
                                                                </button>
                                                                <button type="button" id="saveBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="margin-right:5px;" onclick="setMenuUser()">
                                                                    <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                                                    <span class="k-button-text">저장</span>
                                                                </button>
                                                                <button type="button" id="delBtnUser" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="setMenuUserDel()">
                                                                    <span class="k-icon k-i-cancel k-button-icon"></span>
                                                                    <span class="k-button-text">삭제</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">
                                                            <span class="red-star">*</span>그룹명
                                                        </th>
                                                        <td>
                                                            <input type="text" id="userGroupId" name="userGroupId" style="width:50%;">

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">사용자번호
                                                        </th>
                                                        <td>
                                                            <input type="text" id="phoneUserId" name="phoneUserId" style="width:50%;" disabled>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">
                                                            <span class="red-star">*</span>사용자명
                                                        </th>
                                                        <td>
                                                            <input type="text" id="phoneNameUser" name="phoneNameUser">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center th-color">
                                                            <span class="red-star">*</span>핸드폰번호
                                                        </th>
                                                        <td>
                                                            <input type="text" id="phoneUserNum" name="phoneUserNum" oninput="autoHyphen2(this);" maxlength="13" placeholder="숫자만입력하세요!" >
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<form id="bustripDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="bustrip">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="hrBizReqId" name="hrBizReqId"/>
</form>

<script type="text/javascript">
    var autoHyphen2 = (target) => {
        target.value = target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
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
        console.log(checkedNodes);
        if (checkedNodes.length > 0) {
            $("#destDiv").empty();
            for (var i = 0; i < checkedNodes.length; i++) {
                message = checkedNodes[i];
                console.log(message);
                var input = $("<input>")
                    .attr("type", "text")
                    .attr("name", "dest_phone")
                    .attr("id", "dest_phone")
                    .attr("value", message)
                    .attr("phone", message)
                    .attr("style", "margin-bottom:5px;")
                    .val(message);

                $("#destDiv").append(input);
            }
        } else {
            $("#destDiv").empty();
            var message = "받는사람을 체크해주세요.";
            var input = $("<input>")
                .attr("type", "text")
                .attr("name", "dest_phone")
                .attr("class", "destPhone")
                .attr("value", message);
            $("#destDiv").append(input);
        }


    }

    function menuTreeSearch(e) {
        var query      = e;
        var dataSource = $("#menuTreeView").data("kendoTreeView").dataSource;
        filter(dataSource, query);
    }

    $(function(){
        $("#menuTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#menuEditorTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#menuEditorTabStripUser").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        makeTreeView();
        setKendoTextBox(["menuSearch", "groupId", "groupName", "phoneNameUser", "phoneUserNum", "phoneUserId"]);

        /*getMenuList();*/


    })

    function makeTreeView(){

        var ds = customKendo.fn_customAjax('/textMessages/makeTreeView.do', {});

        $("#userGroupId").kendoDropDownList({
            dataTextField: "GROUP_NAME",
            dataValueField: "GROUP_ID",
            dataSource: ds.rs,
            index: 0
        });

        $("#menuTreeView").kendoTreeView({
            dataSource: ds.rs,
            /*dataTextField: "GROUP_NAME","PHONE_USER_NAME",*/
            checkboxes: {
                checkChildren: true
            },
            template: "#= item.GROUP_NAME ##= item.PHONE_USER_NAME ? ' - ' + item.PHONE_USER_NAME : '' #",
            check: onCheck,
            select: treeClick
        });

        menuTreeSearch($("#menuSearch").val());
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
        dataMod(item);
        dataModUser(item);
        console.log(item);
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

    function dataModGroup(){
        var data = {
            "groupId": $("#groupId").val(),
            "groupName": $("#groupName").val(),
            "loginEmpSeq": $("#loginEmpSeq").val()
        }

        $.ajax({
            url: getContextPath() + '/textMessages/setMenuMod.do',
            data: data,
            dataType: "json",
            type: "POST",
            /*async: false,*/
            success: function () {
                alert("그룹이 수정 되었습니다.");
                $("#menuTreeView").data("kendoTreeView").destroy();
                makeTreeView();
            },
            error: function () {
                alert("그룹 수정 중 에러가 발생했습니다.");
            }
        })

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

    function dataUserMod(){
        var data = {
            "userGroupId" : $("#userGroupId").val(),
            "groupName" : $("#groupName").val(),
            "phoneUserId" : $("#phoneUserId").val(),
            "phoneNameUser" : $("#phoneNameUser").val(),
            "phoneUserNum" : $("#phoneUserNum").val(),
            "loginEmpSeq" : $("#loginEmpSeq").val()
        }
        console.log(data);
        $.ajax({
            url: getContextPath() + '/textMessages/setMenuModUser.do',
            data: data,
            dataType: "json",
            type: "POST",
            /*async: false,*/
            success: function () {
                alert("사용자가 수정 되었습니다.");
                $("#menuTreeView").data("kendoTreeView").destroy();
                makeTreeView();
            },
            error: function () {
                alert("사용자 수정 중 에러가 발생했습니다.");
            }
        })

    }

    function setMenu(){
        var flag = true;

        if(!$("#groupName").val()){
            alert("그룹이름을 입력해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var data = {
                    "groupId" : $("#groupId").val(),
                    "groupName" : $("#groupName").val(),
                    "loginEmpSeq" : $("#loginEmpSeq").val()
                }

                $.ajax({
                    url : getContextPath() + '/textMessages/setMenu.do',
                    data : data,
                    dataType : "json",
                    type : "POST",
                    async : false,
                    success : function (){
                        alert("그룹이 등록 되었습니다.");
                        $("#menuTreeView").data("kendoTreeView").destroy();
                        makeTreeView();
                    },
                    error : function (){
                        alert("그룹 등록 중 에러가 발생했습니다.");
                    }
                })
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    }

    function setMenuUser(){
        var flag = true;

        if(!$("#phoneNameUser").val()){
            alert("사용자이름을 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#phoneUserNum").val()){
            alert("사용자의 핸드폰 번호를 입력해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var data = {
                    "userGroupId" : $("#userGroupId").val(),
                    "groupName" : $("#groupName").val(),
                    "phoneUserId" : $("#phoneUserId").val(),
                    "phoneNameUser" : $("#phoneNameUser").val(),
                    "phoneUserNum" : $("#phoneUserNum").val(),
                    "loginEmpSeq" : $("#loginEmpSeq").val()
                }

                $.ajax({
                    url : getContextPath() + '/textMessages/setMenuUser.do',
                    data : data,
                    dataType : "json",
                    type : "POST",
                    async : false,
                    success : function (){
                        alert("사용자가 등록 되었습니다.");
                        $("#menuTreeView").data("kendoTreeView").destroy();
                        makeTreeView();
                    },
                    error : function (){
                        alert("사용자 등록 중 에러가 발생했습니다.");
                    }
                })
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    }

    function setMenuDel(){
        if(!$("#groupId").val()){
            alert("삭제 할 그룹를 선택해주세요.");
            return;
        }

        if(confirm("삭제 시 해당 메뉴와 하위 메뉴 전체를 사용할 수 없습니다.\n선택한 메뉴를 삭제 하시겠습니까?")){
            var data = {
                "groupId" : $("#groupId").val()
            }

            $.ajax({
                url : getContextPath() + '/textMessages/setMenuDel.do',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (){
                    alert("그룹이 삭제 되었습니다.");
                    $("#menuTreeView").data("kendoTreeView").destroy();
                    makeTreeView();
                },
                error : function (){
                    alert("그룹 삭제 중 에러가 발생했습니다.");
                }
            })
        }

    }

    function setMenuUserDel(){
        if(!$("#phoneUserId").val()){
            alert("삭제 할 사용자를 선택해주세요.");
            return;
        }

        if(confirm("삭제 하시겠습니까?")){
            var data = {
                "phoneUserId" : $("#phoneUserId").val()
            }

            $.ajax({
                url : getContextPath() + '/textMessages/setMenuUserDel.do',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (){
                    alert("사용자가 삭제 되었습니다.");
                    $("#menuTreeView").data("kendoTreeView").destroy();
                    makeTreeView();
                },
                error : function (){
                    alert("사용자 삭제 중 에러가 발생했습니다.");
                }
            })
        }

    }
</script>