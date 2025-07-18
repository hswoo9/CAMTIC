<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 시스템 페이지 자바스크립트 -->
<%--<script type="text/javascript" src="<c:url value='/js/intra/system/system.js'/>"></script>--%>
<style>
    #cmCodeRegistM, #grpCodeModal { overflow: hidden !important;}
</style>
<div id="cmCodeRegistM" class="pop_wrap_dir">

</div>

<div id="grpCodeModal" class="pop_wrap_dir">

</div>
<!-- 모달 스크립트 -->
<script>

    $("#grpCodeModal").kendoWindow({
        title : "공통코드 관리",
        width: "1000px",
        visible: false,
        modal: true,
        position : {
            top : 300,
            left : 480
        },
        open : function (){
            var htmlStr = '<input type="hidden" id="cmCodeIdCR" name="cmCodeIdCR">' +
                '<input type="hidden" id="cmGroupCodeIdM" name="cmGroupCodeIdM">' +
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="saveGrpCode()">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#grpCodeModal\').data(\'kendoWindow\').close()">닫기</button>' +
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
                '				<input type="text" id="grpCode" name="grpCode" style="width: 80.5%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드명</th>' +
                '			<td>' +
                '				<input type="text" id="grpCodeNm" name="grpCodeNm" style="width: 80.5%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#grpCodeModal").html(htmlStr);

            modalKendoSetCmCodeCM();
        },
        close: function () {
            $("#grpCodeModal").empty();
        }
    });

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
                        '<input type="hidden" id="grpSn" name="grpSn">' +
                        '<input type="hidden" id="grpNm" name="grpNm">' +
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
						'				<input type="text" id="lgCode" name="lgCode" style="width: 80.5%"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드명</th>' +
						'			<td>' +
						'				<input type="text" id="lgCodeNm" name="lgCodeNm"" style="width: 80.5%"/>' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드</th>' +
						'			<td>' +
						'				<input type="text" id="cmCode" name="cmCode" style="width: 80.5%" onkeypress="if(window.event.keyCode==13){cmCodeSaveCRM();}"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드명</th>' +
						'			<td>' +
						'				<input type="text" id="cmCodeNm" name="cmCodeNm" style="width: 80.5%" onkeypress="if(window.event.keyCode==13){cmCodeSaveCRM();}"/>' +
						'			</td>' +
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

    function saveGrpCode(){
        var data = {
            grpSn : $("#grpCode").val(),
            grpNm : $("#grpCodeNm").val()
        }

        $.ajax({
            url : "/crm/saveGroupCode",
            data :data,
            type : "post",
            dataType : "json",
            success : function (){
                $("#grpCodeModal").data("kendoWindow").close()
            }
        });
    }

	/** [코드 보기] 근무 코드 select */
	function searchCmCodeDataCRM(cmCodeId){
		$("#cmCodeNewBtnCR").hide();
		setInputData();
		$.ajax({
			url : "<c:url value='/system/commoncodePanagement/getCmCodeInfo.do'/>",
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
			}
		});
	}

	function setInputData(){
		$("#cmGroupCodeIdM").val(codeC.global.gridDataItem.LG_CD);
		$("#lgCode").val(codeC.global.gridDataItem.LG_CD);
		$("#lgCodeNm").val(codeC.global.gridDataItem.LG_CD_NM);
        $("#grpSn").val(codeC.global.gridDataItem.GRP_SN);
        $("#grpNm").val(codeC.global.gridDataItem.GRP_NM);
	}

	/** kendo Setting */
	function modalKendoSetCmCodeCM(){
		$("#lgCode, #lgCodeNm").kendoTextBox({
			enable : false
		});

        $("#grpCode, #grpCodeNm, #cmCode, #cmCodeNm").kendoTextBox();
	}

	/** [코드 등록] 근무 코드 insert, update */
	function cmCodeSaveCRM(){
		var flag = true;
		if($("#crmCd").val() == ""){
			alert("코드를 입력해주세요.");
			flag = false;
			return;
		}else if($("#crmNm").val() == ""){
			alert("코드명을 입력해주세요.");
			flag = false;
			return;
		}

		if(confirm("코드를 저장하시겠습니까?")){
			if(flag){
				var data = {
					crmCd : $("#cmCode").val(),
					crmCdNm : $("#cmCodeNm").val(),
					lgCd : $("#lgCode").val(),
					lgCdNm : $("#lgCodeNm").val(),
					grpNm : $("#grpNm").val(),
					grpSn : $("#grpSn").val(),
				}

				$.ajax({
					url : "/crm/insCrmCode",
					data : data,
                    type : "POST",
					dataType : "json",
					success : function(rs){
						if(rs.code == "200"){
                            codeC.cmDetailCodeList(codeC.global.gridDataItem.GRP_SN, codeC.global.gridDataItem.LG_CD);
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