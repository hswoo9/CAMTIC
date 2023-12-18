<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalUser/absent/absentSetPop.js?v=${today}'/>"></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">
<style>
	.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
		padding: 5px 15px;
		line-height: 1.42857143;
		vertical-align: middle;
		border-top: 1px solid #ffffff;
	}
</style>
<body style="font-size: 12px">
<div class="pop_head">
	<h1 id="mainTxt">부재 등록</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<div style="padding: 20px">
	<form id="archiveSaveFrm">
		<input type="hidden" id="isAdmin" name="isAdmin" value="${isAdmin}">
		<input type="hidden" id="dept_seq" name="dept_seq" value="${deptSeq}">

		<table class="searchTable table table-bordered mb-0">
			<colgroup>
				<col width="20%">
				<col width="30%">
				<col width="20%">
				<col width="30%">
			</colgroup>
			<tr>
				<th class="text-center th-color">
					<span class="red-star">*</span>부재자
				</th>
				<td id="absenceTxt_td">
					<input type="text" id="absenceTxt" name="absenceTxt" class="k-input k-textbox k-input-solid k-input-md" onclick="absentSetPop.userSearchPopup('1')" style="width: 63%;" readonly>
					<button type="button" id="absenceBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSetPop.userSearchPopup('1')" style="vertical-align: middle;">
						<span class="k-icon k-i-search k-button-icon"></span>
					</button>
				</td>
				<th class="text-center th-color">
					<span class="red-star">*</span>부재사유
				</th>
				<td colspan="3" id="absenceCode_td">
					<input type="text" name="absenceCode" id="absenceCode">
				</td>
				<input type="hidden" id="absenceSeq" value="">
				<input type="hidden" id="deptSeq" value="">
				<input type="hidden" id="oriAbsenceSeq" value="">
				<input type="hidden" id="oriDeptSeq" value="">
				<input type="hidden" id="c_aiseqnum" value="">
			</tr>
			<tr>
				<th class="text-center th-color">
					<span class="red-star">*</span>부재기간
				</th>
				<td colspan="3" id="aisday_td">
					<input type="text" name="aisday" id="aisday" style="width: 23%" onchange="absentSetPop.dateValidationCheck('aisday', 'aieday', 'aieday')">
					<input type="text" name="aistime" id="aistime" style="width: 15%" onchange="absentSetPop.timeValidationCheck('aistime', 'aietime', 'aietime')"> ~
					<input type="text" name="aieday" id="aieday" style="width: 23%" onchange="absentSetPop.dateValidationCheck('aisday', 'aieday', 'aisday')">
					<input type="text" name="aietime" id="aietime" style="width: 15%" onchange="absentSetPop.timeValidationCheck('aistime', 'aietime', 'aistime')">
				</td>
			</tr>

			<tr>
				<th class="text-center th-color">
					<span class="red-star">*</span>대결자
				</th>
				<td colspan="3" style="border-right: none; border-top: none" id="absentTxt_td">
					<input type="text" id="absentTxt" name="absentTxt" class="k-input k-textbox k-input-solid k-input-md" onclick="absentSetPop.userSearchPopup('2')" style="width: 90%;" readonly>
					<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="absentSetPop.userSearchPopup('2')" style="vertical-align: middle;">
						<span class="k-icon k-i-search k-button-icon"></span>
					</button>
					<input type="hidden" id="absentSeq" value="">
					<input type="hidden" id="viDeptSeq" value="">
				</td>
			</tr>
			<tr>
				<th class="text-center th-color">수동해제</th>
				<td id="manual_td" colspan="3">
					<input type="checkbox" name="manual" id="manual" class="k-checkbox checkbox" disabled />
				</td>
			</tr>
			<th class="text-center th-color">알림사용</th>
			<td colspan="3" id="c_aialim_td">
				<span id="rdo_01" style="float: left"></span>
				<span style="font-size: 12px;color: #058df5;float: right;margin-top: 9px;">※ 사용 시 대결 시작일시에 대결자에게 알림 제공</span>
			</td>
			</tr>
			<tr>
				<th class="text-center th-color">
					비고
				</th>
				<td colspan="3">
					<input name="absenceMemo" id="absenceMemo"/>
				</td>
			</tr>
		</table>
	</form>
	<div class="mt-10" style="text-align: right">
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="btnSave">
			<span class="k-button-text">저장</span>
		</button>
		<button type="button" id="btnCancel" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base">
			<span class="k-button-text">취소</span>
		</button>

		<button type="button" id="btnClose" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="window.close()">
			<span class="k-button-text">닫기</span>
		</button>

		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" id="btnDel" style="display:none;">
			<span class="k-button-text">삭제</span>
		</button>
	</div>
</div>
<script>
	var params = JSON.parse('${params}');
	absentSetPop.fnDefaultScript(params);

	function userPopupClose(row, code) {
		if(absentSetPop.global.code == "1"){
			absentSetPop.setAbsenceSeqEmpInfo(row);
		}else{
			absentSetPop.setAbsentEmpInfo(row);
		}
		absentSetPop.global.code = "";
	}
</script>
</body>
</html>