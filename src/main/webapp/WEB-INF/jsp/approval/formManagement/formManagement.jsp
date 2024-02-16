<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/approval/formManage/formManage.js?${today}'/>"></script>
<style>
	.k-grid-norecords{
		justify-content: space-around;
	}
	.k-grid-toolbar{
		justify-content: flex-end !important;
	}
	.k-radio-list-horizontal, .k-radio-list.k-list-horizontal{
		gap: 0;
	}
	.doc_file_nm {
		padding-left: 17px;
		background: url(/images/ico/ico_clip02.png) no-repeat 0px 4px;
		line-height: 23px;
		display: inline-block;
	}
	.red-star {color: red; margin-right: 5px;}

	#customFieldTable {
		display: block;
		border-collapse: collapse;
		border: 2px solid #000;
	}

	#customFieldTable th:nth-of-type(1), #customFieldTable td:nth-of-type(1) { width: 250px; }
	#customFieldTable th:nth-of-type(2), #customFieldTable td:nth-of-type(2) { width: 250px; }
	#customFieldTable th:nth-of-type(3), #customFieldTable td:nth-of-type(3) { width: 100px; }
	#customFieldTable th:nth-of-type(4), #customFieldTable td:nth-of-type(4) { width: 90px; padding: 0 }

	#customFieldTable tbody {
		display: block;
		height: 490px;
		overflow: auto;
	}

	#docPublicChkBoxGroup{
		width: 360px;
		float: left;
		padding: 0;
		margin-top: 5px;
		margin-bottom: 0;
	}

	.publicReasonChkLi{
		list-style: none;
		display:inline-block;
		margin-left: 5px;
	}
	.k-tabstrip{
		font-size: 12px;
	}
</style>

<div class="col-md-12 col-lg-12 dash-left">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">양식관리</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 양식관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div class="panel-body">
			<div class="table-responsive" style="margin-bottom:10px;">
				<input type="hidden" id="searchCompSeq" name="searchCompSeq" value="1212" style="width: 20%">
				<input type="hidden" id="searchCompName" name="searchCompName" value="캠틱종합기술원" style="width: 20%">
				<table class="searchTable table table-bordered">
					<colgroup>
						<col width="10%">
						<col width="25%">
						<col width="10%">
						<col width="auto">
					</colgroup>
					<tbody>
					<tr>
						<th class="text-center th-color">사용여부</th>
						<td>
							<input type="text" id="searchActive" name="searchActive" style="width: 50%">
						</td>
						<th class="text-center th-color">
							<span class="pdr5 pdl3per">양식명</span>
						</th>
						<td>
							<input type="text" id="searchKeyWord" name="searchKeyWord" style="width: 50%" placeholder="양식명" onkeypress="if(window.event.keyCode==13){formM.gridReload()}">
							<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.gridReload()">
								<span class="k-button-text">조회</span>
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div style="display:flex;">
				<div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
					<div style="display:flex; justify-content: space-between; margin:0 10px;">
						<div class="spanft" style="padding:16px 10px;font-weight: bold;">· 양식목록</div>
					</div>
					<div id="mainGrid" style="width:97%; margin:0 auto;">

					</div>
				</div>
				<div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
					<div style="display:flex; justify-content: space-between; margin:0 13px;">
						<div class="spanft" style="margin-top: 17px;font-weight: bold;">· 양식상세</div>
						<div class="btn-st" style="margin-top: 15px;">
							<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.setForm()">
								<span class="k-button-text">저장</span>
							</button>
							<button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="display: none" >
								<span class="k-button-text">삭제</span>
							</button>
						</div>
					</div>
					<div id="formEditorTabStrip" style="width: 97%;margin: 7px auto;">
						<ul>
							<li class="k-state-active">
								기본정보
							</li>
							<li>
								양식정보
							</li>
							<li>
								추가항목
							</li>
							<li>
								위임전결
							</li>
						</ul>
						<div id="gridForm" style="height:558px;overflow: auto;border: 1px solid #dedfdf;">
							<div style="display:flex; justify-content: space-between; margin:0 10px;">
								<div class="spanft" style="margin-bottom: 17px;font-weight: bold;">· 양식기본 정보</div>
							</div>

							<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
							<input type="hidden" id="formId" name="formId">
							<input type="hidden" id="formReqOptId" name="formReqOptId">
							<input type="hidden" id="formCompSeq" name="formCompSeq" value="1212">
							<input type="hidden" id="formCompName" name="formCompName" value="캠틱종합기술원">
							<table class="searchTable table table-bordered" style="width: 99%">
								<colgroup>
									<col width="18%">
									<col width="35%">
								</colgroup>
								<tbody>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>양식폴더
										</th>
										<td colspan="3">
											<input type="text" id="formFolderId" name="formFolderId"> <!-- 드롭다운 -->
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>양식명
										</th>
										<td colspan="3">
											<input type="text" id="formName" name="formName" style="width: 100%;">
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>사용여부
										</th>
										<td>
											<span type="text" id="active" name="active" style="width: 100%;"></span>
										</td>
										<th class="text-center th-color">
											<span class="red-star">*</span>노출여부
										</th>
										<td>
											<span type="text" id="visible" name="visible" style="width: 100%;"></span>
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>메일주소입력
										</th>
										<td>
											<span type="text" id="emailAddress" name="emailAddress" style="width: 100%;"></span>
										</td>
										<th class="text-center th-color">
											<span class="red-star">*</span>결재자표시
										</th>
										<td>
											<span type="text" id="approverMark" name="approverMark" style="width: 100%;"></span>
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>정렬순서
										</th>
										<td colspan="3">
											<input type="text" id="sort" name="sort" maxlength="2" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" style="width: 100%;">
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>연동종류
										</th>
										<td colspan="3">
											<input type="text" id="linkageType" name="linkageType" style="width: 39%;">
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">상부캠페인</th>
										<td colspan="3">
											<input type="text" id="headerCampaign" name="headerCampaign" style="width: 100%;">
										</td>
									</tr>
									<tr style="border-bottom: 1px solid #dcdcdc;">
										<th class="text-center th-color">하부캠페인</th>
										<td colspan="3">
											<input type="text" id="footerCampaign" name="footerCampaign" style="width: 100%;">
										</td>
									</tr>
									<tr class="linkageType2InfoTr">
										<th class="text-center th-color">연동종류</th>
										<td colspan="3">
											<input type="text" id="linkageProcessId" name="linkageProcessId" style="width: 39%;">
										</td>
									</tr>
									<tr class="linkageType2InfoTr" style="border-bottom: 1px solid #dcdcdc;">
										<th class="text-center th-color">팝업 사용여부</th>
										<td>
											<span type="text" id="linkagePopActive" name="linkagePopActive" style="width: 100%;"></span>
										</td>
										<th class="text-center th-color">팝업 사이즈</th>
										<td>
											가로 <input type="text" id="linkagePopWidth" style="width: 45px" class="k-input k-textbox k-input-solid k-input-md" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)">
											세로 <input type="text" id="linkagePopHeight"style="width: 45px" class="k-input k-textbox k-input-solid k-input-md" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)">
										</td>
									</tr>
									<tr>
										<th class="text-center th-color">
											<span class="red-star">*</span>결재선관리<br>노출여부
										</th>
										<td colspan="3">
											<span type="text" id="visibleAppr" name="visibleAppr" style="width: 100%;"></span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div id="gridForm2" style="height:550px;overflow: auto;border: 1px solid #dedfdf;">
							<div>
								<div style="display:flex; justify-content: space-between; margin:0 10px;">
									<div class="spanft" style="margin-bottom: 17px;font-weight: bold;">· 양식파일 정보</div>
								</div>

								<table class="table table-bordered searchTable" style="height: 100%;">
									<colgroup>
										<col width="15%">
									</colgroup>
									<tbody>
										<tr>
											<th class="text-right th-color">양식 유형
											</th>
											<td colspan="3">
												<span id="formType"></span>
											</td>
										</tr>
										<tr>
											<th class="text-right th-color">
												<span class="red-star">*</span>기본파일
											</th>
											<td colspan="3">
												<div class="filebox">
													<input type="text" id="formFileName" class="formFileName" readonly style="width:417px;">
													<label for="formFileInput" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin:0 0 0 5px; height:auto;font-size: 13px">파일첨부</label>
													<input type="file" id="formFileInput" name="file" class="hidden" onchange="formM.fileInputChange(this, 'form')"/>
												</div>
											</td>
										</tr>
										<tr>
											<th class="text-right th-color">
												로고이미지
											</th>
											<td colspan="3">
												<div class="filebox">
													<input type="text" id="formLogoFileName" class="formLogoFileName" readonly style="width:417px;">
													<label for="formLogoFileInput" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin:0 0 0 5px; height:auto;font-size: 13px">파일첨부</label>
													<input type="file" id="formLogoFileInput" name="file" class="hidden" onchange="formM.fileInputChange(this, 'formLogo')"/>
												</div>
											</td>
										</tr>
										<tr style="border-bottom: 1px solid #dcdcdc;">
											<th class="text-right th-color">
												심볼이미지
											</th>
											<td colspan="3">
												<div class="filebox">
													<input type="text" id="formSymbolFileName" class="formSymbolFileName" readonly style="width:417px;">
													<label for="formSymbolFileInput" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin:0 0 0 5px; height:auto;font-size: 13px">파일첨부</label>
													<input type="file" id="formSymbolFileInput" name="file" class="hidden" onchange="formM.fileInputChange(this, 'formSymbol')"/>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<div style="display:flex; justify-content: space-between; margin:0 10px;">
									<div class="spanft" style="margin-bottom: 17px;margin-top: 17px;font-weight: bold;">· 필수 기본항목 설정</div>
								</div>
								<table class="table table-bordered searchTable" style="height: 100%;">
									<colgroup>
										<col width="15%">
									</colgroup>
									<tbody>
									<tr>
										<th class="text-right th-color">보존연한
										</th>
										<td colspan="3">
											<span id="preservePeriod"></span>
										</td>
									</tr>
									<tr>
										<th class="text-right th-color">보안여부
										</th>
										<td colspan="3">
											<span id="securityType"></span>
										</td>
									</tr>
									<tr>
										<th class="text-right th-color">문서구분
										</th>
										<td colspan="3">
											<span id="docGbn"></span>
										</td>
									</tr>
									<tr style="border-bottom: 1px solid #dcdcdc;display: none" id="readerTr">
										<th class="text-right th-color">열람자
										</th>
										<td colspan="3">
											<input type="hidden" id="readerId" name="readerId">
											<input type="text" id="readerName" name="readerName" class="k-input k-textbox k-input-solid k-input-md" onclick="formM.readerSelectPopup()" readonly style="width: 90%">
											<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.readerSelectPopup()" style="vertical-align: middle;">
												<span class="k-button-text">선택</span>
											</button>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div id="gridForm3" style="height:550px;overflow: auto;border: 1px solid #dedfdf;">
							<div>
								<div style="display:flex; justify-content: space-between; margin:0 10px;">
									<div class="spanft" style="margin-bottom: 17px;font-weight: bold;">· 추가항목</div>
									<div class="btn-st" style="margin:0">
										<button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.addRowCustomFieldTr()">
											<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
											<span class="k-button-text">추가</span>
										</button>
									</div>
								</div>

								<table class="searchTable table table-bordered" style="border : none" id="customFieldTable">
									<tbody id="customFieldTbody">
									<tr>
										<th class="text-center th-color">필드명</th>
										<th class="text-center th-color">설명</th>
										<th class="text-center th-color">등록자</th>
										<th class="text-center th-color"></th>
									</tr>

									</tbody>
								</table>
							</div>
						</div>

						<div id="gridForm4" style="height:550px;overflow: auto;border: 1px solid #dedfdf;">
							<div style="display:flex; justify-content: space-between; margin:0 10px;">
								<div class="spanft" style="margin-bottom: 17px;font-weight: bold;">· 위임전결 설정</div>
							</div>
							<input type="hidden" id="approvalMngSn">
							<table class="searchTable table table-bordered" style="width: 99%">
								<colgroup>
									<col width="15%">
									<col width="38%">
								</colgroup>
								<tbody>
								<tr>
									<th style="text-align: left">
										위임전결 구분
									</th>
									<td colspan="3">
										<span id="approvalType"></span>
									</td>
								</tr>
								</tbody>
							</table>

							<div id="approvalType1">
								<table class="searchTable table table-bordered" style="width: 99%; margin-top: 20px">
									<colgroup>
										<col width="15%">
										<col width="38%">
									</colgroup>
									<tbody>
									<tr class="approvalData">
										<th style="text-align: left">
											부서장급
										</th>
										<td colspan="3">
											<input id="headLevel" class="dutyType" style="width: 150px">
										</td>
									</tr>
									<tr class="approvalData">
										<th style="text-align: left">
											팀장급
										</th>
										<td colspan="3">
											<input id="leaderLevel" class="dutyType" style="width: 150px">
										</td>
									</tr>
									<tr class="approvalData">
										<th style="text-align: left">
											팀원
										</th>
										<td colspan="3">
											<input id="memberLevel" class="dutyType" style="width: 150px">
										</td>
									</tr>
									</tbody>
								</table>
							</div>

							<div id="approvalType2" style="display: none">
								<div style="float: right; margin:0px 10px; padding-bottom: 10px">
									<div class="btn-st" style="margin:0">
										<button type="button" id="addBtn2" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.addRowApprovalFieldTr()">
											<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
											<span class="k-button-text">추가</span>
										</button>
									</div>
								</div>
								<table class="searchTable table table-bordered" style="border : none;">
									<colgroup>
										<col width="40%">
										<col width="8%">
										<col width="5%">
									</colgroup>
									<tbody id="approvalTbody">
									</tbody>
								</table>
							</div>

							<table class="searchTable table table-bordered" style="width: 99%">
								<colgroup>
									<col width="15%">
									<col width="38%">
								</colgroup>
								<tbody>
								<tr>
									<th style="text-align: left">
										협조 설정1
									</th>
									<td colspan="3">
										<input id="other_emp1" name="other_emp" class="defaultVal" style="width: 15%;" disabled>
										<input type="hidden" id="otherEmpSeq1">
										<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="$('#otherEmpType').val(1); userSearch()">검색</button>
										<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.dataClear(1);">초기화</button>
										<input id="otherTmpDept1" style="width: 30%;">
										<input id="copperDecisonYn" style="width: 25%;">
									</td>
								</tr>
								<tr>
									<th style="text-align: left">
										협조 설정2
									</th>
									<td colspan="3">
										<input id="other_emp2" name="other_emp" class="defaultVal" style="width: 15%;" disabled>
										<input type="hidden" id="otherEmpSeq2">
										<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="$('#otherEmpType').val(2); userSearch()">검색</button>
										<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="formM.dataClear(2);">초기화</button>
										<input id="otherTmpDept2" style="width: 30%;">
									</td>
								</tr>
								</tbody>
							</table>
							<input type="hidden" id="otherEmpType">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	formM.fnDefaultScript();

	function userSearch() {
		window.open("/common/deptListPop.do?type=copper", "조직도", "width=750, height=650");
	}

	function userDataSet(userData) {
		console.log("userData", userData);
		let other_emp = userData.EMP_NAME_KR;
		let otherEmpSeq = userData.EMP_SEQ;
		$("#other_emp"+$("#otherEmpType").val()).val(other_emp);
		$("#otherEmpSeq"+$("#otherEmpType").val()).val(otherEmpSeq);

		const data = {
			empSeq : otherEmpSeq
		}
		const result = customKendo.fn_customAjax("/userManage/getAllDutyList", data);
		const allDutyList = result.list;

		customKendo.fn_dropDownList("otherTmpDept"+$("#otherEmpType").val(), allDutyList, "DEPT_NAME", "DEPT_SEQ", 3);

		if(allDutyList.length < 2){
			$("#otherTmpDept"+$("#otherEmpType").val()).data("kendoDropDownList").enable(false);
		}else{
			$("#otherTmpDept"+$("#otherEmpType").val()).data("kendoDropDownList").enable(true);
		}
	}
</script>