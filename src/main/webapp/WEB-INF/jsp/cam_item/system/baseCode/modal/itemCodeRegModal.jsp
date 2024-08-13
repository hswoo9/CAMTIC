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
						'	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="cmCodeSaveItem()">저장</button>' +
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
                        '				<input type="hidden" id="itemCodeSn" name="itemCodeSn" />' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>그룹코드명</th>' +
						'			<td>' +
						'				<input type="text" id="lgCodeNm" name="lgCodeNm"" style="width: 80.5%"/>' +
						'			</td>' +
						'		</tr>' +
						'		<tr>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드</th>' +
						'			<td>' +
						'				<input type="text" id="cmCode" name="cmCode" style="width: 80.5%" onkeypress="if(window.event.keyCode==13){cmCodeSaveItem();}"/>' +
						'			</td>' +
						'			<th scope="row" class="text-center th-color"><span class="red-star">*</span>코드명</th>' +
						'			<td>' +
						'				<input type="text" id="cmCodeNm" name="cmCodeNm" style="width: 80.5%" onkeypress="if(window.event.keyCode==13){cmCodeSaveItem();}"/>' +
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
            url : "/item/saveGroupCode",
            data :data,
            type : "post",
            dataType : "json",
            success : function (){
                $("#grpCodeModal").data("kendoWindow").close()
            }
        });
    }

	function setInputData(e){
		$("#cmGroupCodeIdM").val(codeI.global.gridDataItem.LG_CD);
		$("#lgCode").val(codeI.global.gridDataItem.LG_CD);
		$("#lgCodeNm").val(codeI.global.gridDataItem.LG_CD_NM);
        $("#grpSn").val(codeI.global.gridDataItem.GRP_SN);
        $("#grpNm").val(codeI.global.gridDataItem.GRP_NM);
        if(e != null){
            $("#cmCodeIdCR").val(e.ITEM_CD_SN)
            $("#cmCode").val(e.ITEM_CD);
            $("#cmCodeNm").val(e.ITEM_CD_NM);
            $("#itemCodeSn").val(e.ITEM_CD_SN);
        } else {
            $("#itemCodeSn").val("");
        }
	}

	/** kendo Setting */
	function modalKendoSetCmCodeCM(){
		$("#lgCode, #lgCodeNm").kendoTextBox({
			enable : false
		});

        $("#grpCode, #grpCodeNm, #cmCode, #cmCodeNm").kendoTextBox();
	}

	function cmCodeSaveItem(){
		var flag = true;
		if($("#cmCode").val() == ""){
			alert("코드를 입력해주세요.");
			flag = false;
			return;
		}else if($("#cmCodeNm").val() == ""){
			alert("코드명을 입력해주세요.");
			flag = false;
			return;
		}

		if(confirm("코드를 저장하시겠습니까?")){
			if(flag){
				var data = {
                    itemCd : $("#cmCode").val(),
                    itemCdNm : $("#cmCodeNm").val(),
					lgCd : $("#lgCode").val(),
					lgCdNm : $("#lgCodeNm").val(),
					grpNm : $("#grpNm").val(),
					grpSn : $("#grpSn").val(),
				}

                if($("#itemCodeSn").val() != ""){
                    data.itemCdSn = $("#itemCodeSn").val();
                }

				$.ajax({
					url : "/item/insItemCode",
					data : data,
                    type : "POST",
					dataType : "json",
					success : function(rs){
						if(rs.code == "200"){
                            codeI.cmDetailCodeList(codeI.global.gridDataItem.GRP_SN, codeI.global.gridDataItem.LG_CD);
							$('#cmCodeRegistM').data('kendoWindow').close();
						} else if(rs.code == "500"){
                            alert("중복 코드가 있습니다. 코드를 확인해주세요.")
                        }
					}
				});
			}else{
				alert("입력값을 확인해주세요");
			}
		}
	}

</script>