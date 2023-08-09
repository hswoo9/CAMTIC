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
                        '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹 코드</th>' +
                        '			<td colspan="3">' +
                        '				<input type="text" name="grpCode" id="grpCode" style="width: 35%" >' +
                        '			</td>' +
                        '		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>대분류코드</th>' +
						'			<td>' +
						'				<input type="text" id="lgCode" name="lgCode" style="width: 80.5%"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>대분류코드명</th>' +
						'			<td>' +
						'				<input type="text" id="lgCodeNm" name="lgCodeNm" style="width: 80.5%"/>' +
						'			</td>' +
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
	function searchCmGCodeDataCRM(grpCd, lgCd){
		$("#cmCodeNewBtnCR").hide();
		$.ajax({
			url : "<c:url value='/system/commonCodeManagement/getCmGroupCodeInfo.do'/>",
			data : {
                lgCd : lgCd,
				grpCd : grpCd
			},
			dataType : "json",
			success : function(rs){
				var result = rs.result;

				$("#cmGroupCodeIdCR").val(result.CM_GROUP_CODE_ID)
				$("#cmGroupCodeCR").val(result.CM_GROUP_CODE);
				$("#cmGroupCodeNmCR").val(result.CM_GROUP_CODE_NM);
				$("#cmGroupCodeDescCR").val(result.CM_GROUP_CODE_DESC);
			}
		});
	}

	/** kendo Setting */
	function modalKendoSetCmGroupCM(){
        var data = {

        }
        var rs = customKendo.fn_customAjax("/project/groupCodeList", data);
        console.log(rs.list);
        customKendo.fn_dropDownList("grpCode", rs.list, "GRP_NM", "GRP_SN");

		$("#lgCode, #lgCodeNm").kendoTextBox();
	}

	/** [코드 등록] 공통 코드 insert, update */
	function cmGroupCodeSaveCRM(){
		var flag = true;
		if($("#grpCode").val() == ""){
			alert("그룹코드를 선택해주세요.");
			flag = false;
			return;
		}else if($("#lgCodeNm").val() == ""){
			alert("대분류 코드명을 입력해주세요.");
			flag = false;
			return;
		}else if($("#lgCode").val() == ""){
			alert("대분류코드를 입력해주세요.");
			flag = false;
			return;
		}

		if(confirm("코드를 저장하시겠습니까?")){
			if(flag){
				var data = {
					lgCode : $("#lgCode").val(),
                    lgCodeNm : $("#lgCodeNm").val(),
					grpSn : $("#grpCode").val(),
					grpNm : $("#grpCode").data("kendoDropDownList").text()
				}

				$.ajax({
					url : "/project/insSetLgCode",
                    type : "POST",
					data : data,
					dataType : "json",
					success : function(rs){
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