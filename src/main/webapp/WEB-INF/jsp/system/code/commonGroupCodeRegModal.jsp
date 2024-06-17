<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 시스템 페이지 자바스크립트 -->
<%--<script type="text/javascript" src="<c:url value='/js/intra/system/system.js'/>"></script>--%>
<style>
    #cmGroupCodeRegistM { overflow: hidden !important;}
</style>
<div id="cmGroupCodeRegistM" class="pop_wrap_dir" style="overflow-x: hidden;">

</div>
<!-- 모달 스크립트 -->
<script>
	/** TODO. 2022.07.10 공통 코드 설정 모달 생성 */
	$("#cmGroupCodeRegistM").kendoWindow({
		title : "공통 그룹코드 관리",
		width: "1000px",
		visible: false,
		modal: true,
		position : {
			top : 100,
			left : 480
		},
		open : function (){
			var htmlStr = '<input type="hidden" id="cmGroupCodeIdCR" name="cmGroupCodeIdCR">' +
						'<div class="mb-10" style="text-align: right;">' +
						'	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cmGroupCodeSaveCRM()">' +
                        '       <span class="k-button-text">저장</span>' +
                        '   </button>' +
						'	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#cmGroupCodeRegistM\').data(\'kendoWindow\').close()">' +
                        '       <span class="k-button-text">닫기</span>' +
                        '   </button>' +
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
						'				<input type="text" id="cmGroupCodeCR" name="cmGroupCodeCR" style="width: 80.5%"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드명</th>' +
						'			<td>' +
						'				<input type="text" id="cmGroupCodeNmCR" name="cmGroupCodeNmCR" style="width: 80.5%"/>' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드 설명</th>' +
						'			<td colspan="3">' +
						'				<input type="text" name="cmGroupCodeDescCR" id="cmGroupCodeDescCR" style="width: 92.5%" placeholder="그룹코드 설명">' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th class="text-center th-color">기존그룹웨어 매핑코드</th>' +
						'			<td>' +
						'				<input type="text" name="mappingCodeCmGCR" id="mappingCodeCmGCR" style="width:80%;">' +
						'			</td>' +
						'			<th class="text-center th-color">G20매핑코드</th>' +
						'			<td>' +
						'				<input type="text" name="g20mappingCodeCmGCR" id="g20mappingCodeCmGCR" style="width:80%;">' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>순서</th>' +
						'			<td><input type="text" name="orderCmGCR" id="orderCmGCR" style="width:20%;"></td>' +
                        '			<th scope="row" class="text-center th-color">사용유무</th>' +
                        '			<td><input type="text" name="active" id="active" style="width:80%;"></td>' +
						'		</tr>' +
						'	</tbody>' +
						'</table>';

			$("#cmGroupCodeRegistM").append(htmlStr);

			modalKendoSetCmGroupCM();
		},
		close: function () {
			$("#cmGroupCodeRegistM").empty();
		}
	});

	/** [코드 보기] 공통 코드 select */
	function searchCmGCodeDataCRM(cmGroupCodeId){
		$("#cmCodeNewBtnCR").hide();
		$.ajax({
			url : "<c:url value='/system/commonCodeManagement/getCmGroupCodeInfo.do'/>",
			data : {
				cmGroupCodeId : cmGroupCodeId
			},
			dataType : "json",
			success : function(rs){
				var result = rs.result;

				$("#cmGroupCodeIdCR").val(result.CM_GROUP_CODE_ID)
				$("#cmGroupCodeCR").val(result.CM_GROUP_CODE);
				$("#cmGroupCodeNmCR").val(result.CM_GROUP_CODE_NM);
				$("#cmGroupCodeDescCR").val(result.CM_GROUP_CODE_DESC);
                $("#orderCmGCR").val(result.SORT);
                $("#active").data("kendoDropDownList").value(result.ACTIVE);
			}
		});
	}

	/** kendo Setting */
	function modalKendoSetCmGroupCM(){
		$("#cmGroupCodeCR, #cmGroupCodeNmCR, #cmGroupCodeDescCR, #mappingCodeCmGCR, #g20mappingCodeCmGCR, #orderCmGCR").kendoTextBox();

        $("#active").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "사용", value: "Y" },
                { text: "미사용", value: "N" }
            ],
            index: 0
        })
	}

	/** [코드 등록] 공통 코드 insert, update */
	function cmGroupCodeSaveCRM(){
		var flag = true;
		if($("#cmGroupCodeCR").val() == ""){
			alert("그룹코드를 입력해주세요.");
			flag = false;
			return;
		}else if($("#cmGroupCodeNmCR").val() == ""){
			alert("그룹코드명을 입력해주세요.");
			flag = false;
			return;
		}else if($("#cmGroupCodeDescCR").val() == ""){
			alert("그룹코드 설명을 입력해주세요.");
			flag = false;
			return;
		}else if($("#orderCmGCR").val() == ""){
            alert("그룹코드 순서를 입력해주세요.");
            flag = false;
            return;
        }

		if(confirm("코드를 저장하시겠습니까?")){
			if(flag){
				var data = {
					cmGroupCodeId : $("#cmGroupCodeIdCR").val(),
					cmGroupCode : $("#cmGroupCodeCR").val(),
					cmGroupCodeNm : $("#cmGroupCodeNmCR").val(),
					cmGroupCodeDesc : $("#cmGroupCodeDescCR").val(),
                    orderCmGCR : $("#orderCmGCR").val(),
                    active : $("#active").val(),
					empSeq : $("#empSeq").val(),
				}

				$.ajax({
					url : "<c:url value='/system/commonCodeManagement/setCmGroupCodeSave.do'/>",
                    type : "POST",
					data : data,
					dataType : "json",
					success : function(rs){
						var rs = rs.result;
						alert(rs.message);
						if(rs.code == "200"){
							gridReload('mainGrid');
							$('#cmGroupCodeRegistM').data('kendoWindow').close();
						}
					}
				});
			}else{
				alert("입력값을 확인해주세요");
			}
		}
	}
</script>