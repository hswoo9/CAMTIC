<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/js/intra/approval/formManage/formFolderManage.js?v=4'/>"></script>
<style>
	.k-grid-norecords{
		justify-content: space-around;
	}
	.k-grid-toolbar{
		justify-content: flex-end !important;
	}
	.red-star {color: red; margin-right: 5px;}
</style>
<div class="col-md-12 col-lg-12 dash-left">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">양식폴더관리</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 양식관리 > 양식폴더관리</div>
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
							<span class="pdr5 pdl3per">양식폴더이름</span>
						</th>
						<td>
							<input type="text" id="searchKeyWord" name="searchKeyWord" style="width: 50%" placeholder="양식폴더명" onkeypress="if(window.event.keyCode==13){formFolderM.gridReload()}">
							<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="formFolderM.gridReload()">
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
						<div class="spanft" style="padding:16px 10px;font-weight: bold;">· 양식폴더목록</div>
					</div>
					<div id="mainGrid" style="width:97%; margin:0 auto;">

					</div>
				</div>
				<div class="table-responsive" style="width: 50%;border:1px solid #d5d5d5;">
					<div style="display:flex; justify-content: space-between; margin:0 10px;">
						<div class="spanft" style="margin-top: 17px;font-weight: bold;">· 양식폴더상세</div>
						<div class="btn-st" style="margin-top: 10px">
							<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="formFolderM.setFormFolder()">
								<span class="k-button-text">저장</span>
							</button>
						</div>
					</div>
					<div style="padding:14px 10px">
						<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
						<input type="hidden" id="formFolderId" name="formFolderId">
						<input type="hidden" id="formCompSeq" name="formCompSeq" value="1212">
						<input type="hidden" id="formCompName" name="formCompName" value="캠틱종합기술원">
						<table class="table table-bordered searchTable" style="margin: 0;">
							<colgroup>
								<col width="15%">
								<col width="85%">
							</colgroup>
							<tbody>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>폴더명
									</th>
									<td>
										<input type="text" id="formFolderName" name="formFolderName" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">노출여부</th>
									<td>
										<span type="text" id="visible" name="visible" style="width: 100%;"></span>
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">사용여부</th>
									<td>
										<span type="text" id="active" name="active" style="width: 100%;"></span>
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										정렬
									</th>
									<td>
										<input type="text" id="sort" name="sort" maxlength="2" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event)" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										비고
									</th>
									<td>
										<textarea id="remark" name="remark"></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	formFolderM.fnDefaultScript();
</script>