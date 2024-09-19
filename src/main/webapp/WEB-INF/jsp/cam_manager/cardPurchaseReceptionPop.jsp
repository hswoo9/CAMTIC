<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>

<style>

</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="tmpBankNm" value="${params.bankNm}" />
<div class="col-lg-12 pop_sign_wrap" style="width:100%; padding:0;">
	<div class="card-header pop-header">
		<h3 class="card-title title_NM">카드 매입추심번호</h3>
	</div>
	<div style="margin: 10px;">
		<table class="popTable table table-bordered mb-0">
			<colgroup>
				<col width="10%">
				<col width="">
			</colgroup>
			<thead>
			<tr>
				<th scope="row" class="text-center th-color">카드번호</th>
				<td >
					<input type="text" id="srchCardNo" style="width: 20%;" onkeypress="if(window.event.keyCode==13){mainGrid();}">
					<button type="button" class="k-button k-button-solid-base" onclick="mainGrid();" >조회</button>
				</td>
			</tr>
			</thead>
		</table>
		<div id="mainGrid" style="margin: 10px 0;"></div>
	</div>

</div>
<script>
	$(document).ready(function() {
		customKendo.fn_textBox(["srchCardNo"]);
		mainGrid();
	})

	function mainGrid (){
		let dataSource = new kendo.data.DataSource({
			serverPaging: false,
			pageSize : 10,
			transport: {
				read : {
					url : '/kukgoh/getCardPuchasRecptnList',
					dataType : "json",
					type : "post"
				},
				parameterMap: function(data) {
					data.srchCardNo = $("#srchCardNo").val()
					return data;
				}

			},
			schema : {
				data: function (data) {
					return data.list;
				},
				total: function (data) {
					return data.list.length;
				},
			},
		});

		$("#mainGrid").kendoGrid({
			dataSource: dataSource,
			sortable: true,
			scrollable: true,
			selectable: "row",
			height: 500,
			pageable: {
				refresh: true,
				pageSizes : [ 10, 20, 50, "ALL" ],
				buttonCount: 5
			},
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			columns: [
				{
					field : "CARD_NO",
					title : "카드번호",
					width : 120
				}, {
					field : "CONFM_DE",
					title : "승인일자",
					width : 100,
					template : function(e) {
						return e.CONFM_DE.substring(0,4) + "-" + e.CONFM_DE.substring(4,6) + "-" + e.CONFM_DE.substring(6,8);
					}
				}, {
					field : "CONFM_TM",
					title : "승인시간",
					width : 80,
					template : function(e) {
						return e.CONFM_TM.substring(0,2) + ":" + e.CONFM_TM.substring(2,4) + ":" + e.CONFM_TM.substring(4,6);
					}
				}, {
					field : "PUCHAS_CONFM_NO",
					title : "매입승인번호",
					width : 100
				}, {
					field : "PUCHAS_DE",
					title : "매입일자",
					width : 80,
					template : function(e) {
						return e.PUCHAS_DE.substring(0,4) + "-" + e.PUCHAS_DE.substring(4,6) + "-" + e.PUCHAS_DE.substring(6,8);
					}
				}, {
					field : "PUCHAS_TKBAK_NO",
					title : "매입추심번호",
					width : 150
				}, {
					field : "SPLPC",
					title : "공급가액",
					width : 100,
					template : function(e) {
						return "<div style='text-align: right;'>" + comma(e.SPLPC) + "</div>"
					}
				}, {
					field : "VAT",
					title : "부가가치세",
					width : 100,
					template : function(e) {
						return "<div style='text-align: right;'>" + comma(e.VAT) + "</div>"
					}
				}, {
					field : "PUCHAS_TAMT",
					title : "매입합계금액",
					width : 100,
					template : function(e) {
						return "<div style='text-align: right;'>" + comma(e.PUCHAS_TAMT) + "</div>"
					}
				}, {
					field : "MRHST_NM",
					title : "가맹점명",
					width : 150
				}, {
					field : "",
					title : "",
					width : 60,
					template : function(e) {
						return '<button type="button" class="k-button k-button-solid-base" onclick="fn_selectPuchasRecptn(\''+ e.PUCHAS_TKBAK_NO +'\');">선택</button>'
					}
				}
			]
		}).data("kendoGrid");
	}

	function fn_selectPuchasRecptn(no){
		opener.parent.$("#PRUF_SE_NO").val(no);
		opener.parent.$("#PRUF_SE_NO_TXT").val(no);
		window.close();
	}
</script>
</body>
