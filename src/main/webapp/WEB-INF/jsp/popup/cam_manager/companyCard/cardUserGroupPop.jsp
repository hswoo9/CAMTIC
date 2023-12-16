<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<div>
	<div class="card-header pop-header">
		<h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="cardToTitle">
                    카드사용자 그룹 등록
                </span>
		</h3>
		<div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
			<button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="fn_save()">등록</button>
			<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
		</div>
	</div>

	<div style="padding: 10px">
		<table class="popTable table table-bordered mb-0">
			<colgroup>
				<col width="15%">
				<col width="auto">
			</colgroup>
			<thead>
			<tr>
				<th scope="row" class="text-center th-color">
					<span class="red-star">*</span>그룹명
				</th>
				<td>
					<input type="text" id="groupNm" style="width: 50%">
				</td>
			</tr>
			<tr>
				<th scope="row" class="text-center th-color">
					<span class="red-star">*</span>그룹 인원
				</th>
				<td>
					<input type="text" id="groupUser" style="width: 50%;" value="" disabled>
					<button type="button" class="k-button k-button-solid-base" onclick="fn_userMultiSelectPop()">추가</button>
				</td>
			</tr>
			<tr>
				<th scope="row" class="text-center th-color">
					<span class="red-star">*</span>사용 유무
				</th>
				<td>
					<input type="radio" id="useY" name="useYn" value="Y" checked><label for="useY" class="radioInput">사용</label>
					<input type="radio" id="useN" name="useYn" value="N"><label for="useN" class="radioInput">미사용</label>
				</td>
			</tr>
			</thead>
		</table>
	</div>
</div>

<script>
    var groupArr = [];

    $(function(){
        customKendo.fn_textBox(["groupNm", "groupUser"]);

    });

    function fn_userMultiSelectPop() {
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function userDataSet(arr){
        groupArr = [];

        for(var i = 0; i < arr.length; i++){
			groupArr.push(arr[i]);
		}
        if(arr.length == 1){
			$("#groupUser").val(arr[0].empName);
			return;
		}else{
            $("#groupUser").val(arr[0].empName + " 외 " + (arr.length - 1) + "명");
	    }
    }

    function fn_save(){
        if($("#groupNm").val() == ""){
            alert("그룹명을 입력해주세요.");
            return;
        }

        if($("#groupUser").val() == ""){
            alert("그룹 인원을 선택해주세요.");
            return;
        }

        console.log(groupArr);

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var parameters = {
			groupNm : $("#groupNm").val(),
	        regEmpSeq: $("#regEmpSeq").val(),
			useYn : $("input[name=useYn]:checked").val(),
            groupArr : JSON.stringify(groupArr)
        }

        $.ajax({
            url : "/card/saveCardUserGroup",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    /*alert("저장되었습니다.");
                    opener.parent.cardUserGroupList.mainGrid();
                    window.close();*/

                }
            }
        });
    }

    function fn_update(){
        if(!confirm("수정하시겠습니까?")){
            return;
        }


        var parameters = {
            trCd : $("#trCd").val(),
            trNm: $("#trNm").val(),
            cardToDe: $("#cardToDe").val(),
            empSeq: $("#empSeq").val(),
            empName: $("#empName").val(),
            jiroNm: $("#jiroNm").val(),
            baNb: $("#baNb").val(),
            depositor: $("#depositor").val(),
            cardBaNb: $("#cardBaNb").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            cardToSn : $("#cardToSn").val()
        }

        if(parameters.trNm == ""){
            alert("카드를 선택해주세요.");
            return;
        }

        if(parameters.empName == ""){
            alert("신청자를 선택해주세요.");
            return;
        }

        $.ajax({
            url : "/card/updRegCardTo",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("수정되었습니다.");
                    opener.parent.statementList.mainGrid();
                    window.close();
                }
            }
        })
    }
</script>