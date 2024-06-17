<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 시스템 페이지 자바스크립트 -->
<%--<script type="text/javascript" src="<c:url value='/js/intra/system/system.js'/>"></script>--%>
<style>
    #cmCodeRegistM { overflow: hidden !important;}
</style>
<div id="cmCodeRegistM" class="pop_wrap_dir">

</div>
<!-- 모달 스크립트 -->
<script>
	/** TODO. 2022.07.10 근무 코드 설정 모달 생성 */
	$("#cmCodeRegistM").kendoWindow({
		title : "공통코드 관리",
		width: "1000px",
		visible: false,
		modal: true,
		position : {
			top : 100,
			left : 480
		},
		open : function (){
			var htmlStr = '<input type="hidden" id="cmCodeIdCR" name="cmCodeIdCR">' +
						'<input type="hidden" id="cmGroupCodeIdM" name="cmGroupCodeIdM">' +
						'<div class="mb-10" style="text-align: right;">' +
						'	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cmCodeSaveCRM()">저장</button>' +
						'	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#cmCodeRegistM\').data(\'kendoWindow\').close()">닫기</button>' +
						'</div>' +
						'<table class="table table-bordered mb-0" style="margin-top: 10px">' +
						'	<colgroup>' +
						'		<col width="20%">' +
						'		<col width="35%">' +
						'		<col width="15%">' +
						'		<col width="30%">' +
						'	</colgroup>' +
						'	<tbody>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드</th>' +
						'			<td>' +
						'				<input type="text" id="cmGroupCodeIn" name="cmGroupCodeIn" style="width: 80.5%"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드명</th>' +
						'			<td>' +
						'				<input type="text" id="cmGroupCodeNmIn" name="cmGroupCodeNmIn" style="width: 80.5%"/>' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드 설명</th>' +
						'			<td colspan="3">' +
						'				<input type="text" name="cmGroupCodeDescIn" id="cmGroupCodeDescIn" style="width: 92.5%" placeholder="그룹코드 설명">' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드</th>' +
						'			<td>' +
						'				<input type="text" id="cmCode" name="cmCode" style="width: 80.5%"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드명</th>' +
						'			<td>' +
						'				<input type="text" id="cmCodeNm" name="cmCodeNm" style="width: 80.5%"/>' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드 설명</th>' +
						'			<td colspan="3">' +
						'				<input type="text" name="cmGroupCodeDescIn" id="cmCodeDesc" style="width: 92.5%" placeholder="코드 설명">' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th class="text-center th-color">기존그룹웨어 매핑코드</th>' +
						'			<td>' +
						'				<input type="text" name="mappingCodeCmCR" id="mappingCodeCmCR" style="width:80%;">' +
						'			</td>' +
						'			<th class="text-center th-color">G20매핑코드</th>' +
						'			<td>' +
						'				<input type="text" name="g20mappingCodeCmCR" id="g20mappingCodeCmCR" style="width:80%;">' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>순서</th>' +
						'			<td><input type="text" name="orderCmCR" id="orderCmCR" style="width:20%;"></td>' +
                        '			<th scope="row" class="text-center th-color">사용유무</th>' +
                        '			<td><input type="text" name="cmCodeActive" id="cmCodeActive" style="width:80%;"></td>' +
						'		</tr>' +
						'	</tbody>' +
						'</table>';

			$("#cmCodeRegistM").html(htmlStr);

			modalKendoSetCmCodeCM();
		},
		close: function () {
			$("#cmCodeRegistM").empty();
		}
	});

	/** [코드 보기] 근무 코드 select */
	function searchCmCodeDataCRM(cmCodeId){
		$("#cmCodeNewBtnCR").hide();
		setInputData();
		$.ajax({
			url : "<c:url value='/system/commonCodeManagement/getCmCodeInfo.do'/>",
			data : {
				cmCodeId : cmCodeId
			},
			dataType : "json",
			success : function(rs){
				var result = rs.result;
				$("#cmCodeIdCR").val(result.CM_CODE_ID);
				$("#cmCode").val(result.CM_CODE);
				$("#cmCodeNm").val(result.CM_CODE_NM);
				$("#cmCodeDesc").val(result.CM_CODE_DESC);
                $("#orderCmCR").val(result.SORT);
                $("#cmCodeActive").data("kendoDropDownList").value(result.ACTIVE);
			}
		});
	}

	function setInputData(){
		$("#cmGroupCodeIdM").val(codeM.global.gridDataItem.CM_GROUP_CODE_ID);
		$("#cmGroupCodeIn").val(codeM.global.gridDataItem.CM_GROUP_CODE);
		$("#cmGroupCodeNmIn").val(codeM.global.gridDataItem.CM_GROUP_CODE_NM);
		$("#cmGroupCodeDescIn").val(codeM.global.gridDataItem.CM_GROUP_CODE_DESC);
	}

	/** kendo Setting */
	function modalKendoSetCmCodeCM(){
		$("#cmGroupCodeIn, #cmGroupCodeNmIn, #cmGroupCodeDescIn").kendoTextBox({
			enable : false
		});

		$("#mappingCodeCmCR, #g20mappingCodeCmCR, #orderCmCR, #cmCode, #cmCodeNm, #cmCodeDesc").kendoTextBox();

        $("#cmCodeActive").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "사용", value: "Y" },
                { text: "미사용", value: "N" }
            ],
        })
	}

	/** [코드 등록] 근무 코드 insert, update */
	function cmCodeSaveCRM(){
		var flag = true;
		if($("#cmCode").val() == ""){
			alert("코드를 입력해주세요.");
			flag = false;
			return;
		}else if($("#cmCode").val() == ""){
			alert("코드명을 입력해주세요.");
			flag = false;
			return;
		}else if($("#cmCodeDesc").val() == ""){
			alert("코드 설명을 입력해주세요.");
			flag = false;
			return;
		}else if($("#orderCmCR").val() == ""){
            alert("코드 순서를 입력해주세요.");
            flag = false;
            return;
        }

		if(confirm("코드를 저장하시겠습니까?")){
			if(flag){
				var data = {
					cmCodeId : $("#cmCodeIdCR").val(),
					cmGroupCodeId : $("#cmGroupCodeIdM").val(),
					cmCode : $("#cmCode").val(),
					cmCodeNm : $("#cmCodeNm").val(),
					cmCodeDesc : $("#cmCodeDesc").val(),
                    orderCmCR : $("#orderCmCR").val(),
                    cmCodeActive : $("#cmCodeActive").val(),
					empSeq : $("#empSeq").val(),
				}

				$.ajax({
					url : "<c:url value='/system/commonCodeManagement/setCmCodeSave.do'/>",
					data : data,
                    type : "POST",
					dataType : "json",
					success : function(rs){
						var rs = rs.result;
						alert(rs.message);
						if(rs.code == "200"){
                            codeM.cmDetailCodeList(codeM.global.gridDataItem.CM_GROUP_CODE_ID);
							$('#cmCodeRegistM').data('kendoWindow').close();
						}
					}
				});
			}else{
				alert("입력값을 확인해주세요");
			}
		}
	}

</script>