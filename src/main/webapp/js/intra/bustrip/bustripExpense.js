/**
 * 2022.09.28 by. jsy
 * 마이페이지 > 복무 > 출장 > 여비정산
 *
 * 순서
 * 0. variable
 * 1. DataSource
 * 2. Grid Funtion
 * 3. CRUD Funtion
 * 4. Kendo data set
 */
var addRowData=[]; /* 출장 선택시 데이터 저장공간 */
var syncIdArr=[]; /*카드 정보 저장공간  */
var lmitCost1;/* 서울시 숙박비 한계금액 */
var lmitCost2;/* 경기 숙박비 한계금액 */
var lmitCost3;/* 기타 숙박비 한계금액 */
var lmitCost4;/* 특별자치도 숙박비 한계금액 */
/**
 *  출장신청 리스트 DataSource
 *  url : /bustrip/getBustripReqList.do
 */
var bustripExpenseDataSource = new kendo.data.DataSource({
	serverPaging: false,
	transport: {
		read : {
			url : "/bustrip/getBustripReqList.do",
			dataType : "json",
			type : "post"
		},
		parameterMap: function(data, operation) {
			data.status = $("#status").val();
			data.startDay = $("#start_day").val();
			data.endDay = $("#end_day").val();
			return data;
		}
	},
	schema : {
		data: function (data) {
			return data.data;
		},
		total: function (data) {
			return data.data.length;
		},
	}
});
/**
 *  KendoGrid List
 *  1. bustripExpenseGrid (출장 여비정산용 조회 리스트)
 */
function bustripExpenseGrid(){
	var grid = $("#mainGrid").kendoGrid({
		dataSource: bustripExpenseDataSource,
		height: 300,
		sortable: true,
		scrollable: true,
		excel : {
			fileName : "출장내역 저장 목록.xlsx",
			filterable : true
		},
		noRecords: {
			template: "데이터가 존재하지 않습니다."
		},
		columns: [
			{
				headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
				template : "<input type='checkbox' id='bustripPk#=hr_biz_req_id#' name='bustripPk' value='#=hr_biz_req_id#' class='k-checkbox checkbox'/>",
				width: 50
			}
			, { field: "hr_biz_req_id", title: "출장 번호", width: 80 }
			, { field: "nation", title: "장소", width: 80 }
			, { field : "title", title : "제목(출장목적)", width: 250}
			, { title : "출장기간", template : "<span>#=stime#</br>#=etime#</span>", width: 100 }
			, { field: "dept_name", title: "부서", width: 80 }
			, { field: "emp_name", title: "성명", width: 80 }
		]
	}).data("kendoGrid");
}
/* 출장 선택했을때 리스트 그려주기 */
$('#addOnnaraBiz').on("click",function(){
	$(".bustripAdd_bg").removeClass("show");
	var ch = $("input[name='bustripPk']:checked");
	if(ch.length == 0 ){
		alert('출장 정보를 선택해주세요');
		return;
	}
	$.each(ch, function(i,v){
		var totalData =$("#mainGrid").data("kendoGrid").dataItem($(v).closest("tr"))

		addRowData.push(totalData);

		var html= '';
		var html2= '';
		html2 += '<tr id = "hrBizReqId'+totalData.hr_biz_req_id+'">';
		html2 += '	<td scope="row" class="text-center"><button class="addBtn" onclick="tripDataSet('+totalData.hr_biz_req_id+')">선택</button></td>';
		html2 += '	<td scope="row" class="text-center" name="trip_day_f">'+totalData.trip_day_f+'</td>';
		html2 += '	<td class="text-center" name="trip_day_t">'+totalData.trip_day_t+'</td>';
		html2 += '	<td class="text-center" name="dept_name">'+totalData.dept_name+'</td>';
		html2 += '	<td class="text-center" name="emp_name">'+totalData.emp_name+'</td>';
		html2 += '	<td class="text-center" name="nation">'+totalData.nation+'</td>';
		html2 += '	<td class="text-center" name="title">'+totalData.title+'</td>';
		html2 += '	<td class="text-center"><a class="k-icon k-i-x" style="color: red"></td>';
		html2 += '	<input type="hidden" name="emp_seq" value="'+totalData.emp_seq+'">'
		html2 += '	<input type="hidden" name="dept_seq" value="'+totalData.dept_seq+'">'
		html2 += '	<input type="hidden" name="dept_seq" value="'+totalData.position_code+'">'
		html2 += '</tr>';
		$("#bustripTable tbody").append(html2);
		console.log("html : "+html2);
		console.log("totalData : "+JSON.stringify(totalData));
	})
	console.log("addRowData : "+addRowData);
})
/* 선택한 리스트중에 한줄을 선택했을때 데이터 세팅 */
function tripDataSet(hr_biz_req_id) {
	if(hr_biz_req_id == '' || hr_biz_req_id == "undefined" || hr_biz_req_id == null){
		alert("데이터 로딩에 실패하였습니다. 새로고침 후 다시 이용해주세요.");
		return;
	}
	// 기본값 교통비 0 / 교통수단 기본값이 교통값(없음)이니까
	$('#traficCost').val('');
	//데이터 초기화
	chogi();
	syncIdArr=[];
	var RowPK = "hrBizReqId"+hr_biz_req_id;
	var empSeq = $('#' + RowPK).children('[name=emp_seq]').val();
	var deptSeq = $('#' + RowPK).children('[name=dept_seq]').val();
	var positionCode = $('#' + RowPK).children('[name=position_code]').val();
	var tripDayF = $('#' + RowPK).children('[name=trip_day_f]').text();
	var tripDayT = $('#' + RowPK).children('[name=trip_day_t]').text();
	var deptName = $('#' + RowPK).children('[name=dept_name]').text();
	var empName = $('#' + RowPK).children('[name=emp_name]').text();
	var nation = $('#' + RowPK).children('[name=nation]').text();
	var purpose = $('#' + RowPK).children('[name=title]').text();
	// 해당 ROW값 가져오기
	$('#wjrdy').val("(국내여비) "+purpose);
	$('#positionCode').val(positionCode);
	$('#deptSeq').val(deptSeq);
	$('#empSeq').val(empSeq);
	$('#selectDept').val(deptName);
	$('#selectName').val(empName);
	$('#selectStartDay').val(tripDayF);
	$('#selectEndDay').val(tripDayT);
	$('#selectArea').val(nation);
	$('#selectTitle').val(purpose);
	$('#RowPK').val(RowPK);
	$("#addTransportationDay").data("kendoDatePicker").min(new Date(tripDayF));
	$("#addTransportationDay").data("kendoDatePicker").max(new Date(tripDayT));
	$("#addTransportationUgaDay").data("kendoDatePicker").min(new Date(tripDayF));
	$("#addTransportationUgaDay").data("kendoDatePicker").max(new Date(tripDayT));
	//기본값을 출장 첫날로
	$('#addTransportationDay').val(tripDayF);
	$('#addTransportationUgaDay').val(tripDayF);
	$('#foodCost').val(numberWithCommas(0));
	$('#dayCost').val(numberWithCommas(0));
	lmitCost1 = 50000;
	lmitCost2 = 50000;
	lmitCost3 = 50000;
	lmitCost4 = 50000;
	//autoCalTotalCost();
	if(1==1){
		return;
	}
}
//교통비 리셋
function autoCalDataReset() {
	$('[name=addTransportationUseCar]').prop('checked', false);
	$('#addTransportationMove').val('');
	$('#addTransportationUgaDay').data('kendoDatePicker').value('');
	$('#region').data('kendoDropDownList').value("0");
	$('#addTransportationoilType').data('kendoDropDownList').value("0");
	$('#regionOilMoney').val('');
	$('#addTransportationDepCost').val('');
	$('#addTransportationArrCost').val('');
	$('input[name=addTransportationUseCar]').bind({
		click : function() {
			var carYn = $('input[name=addTransportationUseCar]:checked').val();
			if (carYn == '이용함') {
				$('#carWayNo').hide();
				$('#addTransportationMoney').attr("readonly", false);
				//autoCalTotalCost();
			} else if (carYn == '이용안함') {
				$('#addTransportationMoney').val('');
				//autoCalTotalCost();
				$('#carWayNo').show();
				$('#addTransportationMove').val('');
				$('#addTransportationUgaDay').data('kendoDatePicker').value('');
				$('#region').data('kendoDropDownList').value("0");
				$('#addTransportationoilType').data('kendoDropDownList').value("0");
				$('#regionOilMoney').val('');
				$('#addTransportationMoney').attr("readonly", true);
			}
		}
	})
}
//초기화
function chogi() {
	$('.dataInputt').val('');
	autoCalDataReset();
	//resetCostData();
	/* hideTraficWay();
	$('#addTransportationMoney').attr("readonly", true);
	$('#trafic_way').data('kendoDropDownList').value('0');
	$('#BTDateFR').data('kendoDatePicker').value('');
	$('#BTDateTO').data('kendoDatePicker').value('');
	$('#giveRoom').data('kendoDropDownList').value('Y');
	$('#giveFood').data('kendoDropDownList').value('N');
	$('#biz_day').data('kendoDatePicker').value('');
	$('#cjaqn1 #temp').remove();
	$('#cjaqn2 #temp').remove();
	syncIdArr = [];
	$('#cjaqn3 #temp').remove();
	$('#cjaqn4 #temp').remove();
	/* $('#ed').hide();
	$('#cardYesanCd').val('');
	$('#cardView').val('');
	$('#carWayNo').hide();
	$("#carWay").hide();
	$("#trainWay").hide();
	$("#busWay").hide();
	$("#shipWay").hide();
	$("#airportWay").hide();
	$('#gridList3 tbody tr').remove();
	$("#carcar").data('kendoDropDownList').value('0');
	$("#carcarSpan").hide(); */
}
function showTraficWay(id) {
	if(id == '' || id == "undefined" || id == null){
		alert("데이터 로딩에 실패하였습니다. 새로고침 후 다시 이용해주세요.");
		return;
	}
	$("#carWay").hide();
	$("#etcWay").hide();
	$('#carWayNo').hide();
	if(Number(id) == "1") {
		$("#carWay").show();
	}else if(Number(id) == "0") {
	}else {
		$("#etcWay").show();
	}
}
/*출장선택 함수*/
function getBustripSelect(){
	bustripExpenseGrid();
	$(".bustripAdd_bg").addClass("show");
}
function ugaCal() {
	if ($('#addTransportationMove').val() == '') {
		alert("이동거리를 입력해주세요");
		return;
	}
	if ($('#addTransportationUgaDay').data('kendoDatePicker').value() == null) {
		alert("주유일을 입력해주세요");
		return;
	}
	if ($('#addTransportationoilType').val() == '0' && e.sender._old != 0) {
		alert("유류를 선택해주세요");
		return;
	}
	if ($('#region').data("kendoDropDownList").value() == '0') {
		alert("지역을 선택해주세요");
		return;
	}
	var oilCostData;
	$.ajax({
		url : "<c:url value='/busTrip/getOilTypeCost' />",
		data : {
			common_code_id : $('#oilType').val(),
			day 			:$('#UgaDay').val(),
		},
		type : 'POST',
		async : false,
		success : function(data) {
			oilCostData = data;
		}
	});
	var cst = $('#addTransportationMove').val()/ /*oilCostData.result.fuel_cost*/ 13.3 * $('#regionOilMoney').val();
	/* var cst2 = Math.floor(cst / 10) * 10 */
	var cst2 = cst;
	$('#addTransportationMoney').val(numberWithCommas(Math.floor((cst2/10))*10));
	/* autoCalTotalCost(); */
}
//출장신청 Data set
function dataSet() {

	//회계단위
	$("#lbErpDivName").kendoTextBox();
	//온나라문서제목
	$("#defaultInputBox").kendoTextBox();
	//리스트 선택 후 부서
	$("#selectDept").kendoTextBox();
	//리스트 선택 후 이름
	$("#selectName").kendoTextBox();

	//리스트 선택 후 출장일
	$("#selectStartDay").kendoTextBox();
	$("#selectEndDay").kendoTextBox();
	//리스트 선택 후 출장지
	$("#selectArea").kendoTextBox();
	//리스트 선택 후 목적
	$("#selectTitle").kendoTextBox();
	//교통수단 추가 출장일
	$("#addTransportationDay").kendoDatePicker({
		depth: "month",
		start: "month",
		culture : "ko-KR",
		format : "yyyy-MM-dd",
		change : function() {
			if($('#RowPK').val()==''){
				alert('출장 기본정보를 선택해주세요');
				$('#addTransportationDay').data('kendoDatePicker').value('');
			}
		}
	}).attr("readonly", true).data("kendoDatePicker");
	//교통수단 추가 이용차량
	var search_car =[
		{value: "0", text: "없음"}, {value: "1", text: "차량"}, {value: "2", text: "열차"}, {value: "3", text: "버스"}, {value: "4", text: "항공"}, {value: "5", text: "선박"}
	];
	$("#addTransportationCar").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: search_car,
		change : function() {
			if($('#addTransportationDay').val()==''){
				alert('출장 일자를 선택해 주세요');
				$('#addTransportationCar').data('kendoDropDownList').value('0');
			}
			showTraficWay($("#addTransportationCar").val());
			autoCalDataReset();
		}
	});
	//교통수단 추가
	$("#addTransportationMoney").kendoTextBox();

	//교통수단 추가 업무용 차량 이용여부
	var use_car =[
		{value: "이용안함", label: "이용안함"}, {value: "이용함", label: "이용함"}
	];
	$("#addTransportationUseCar").kendoRadioGroup({ layout : "horizontal", labelPosition : "after", items: use_car, value: "이용안함" }).data("kendoRadioGroup");
	//교통수단 추가 이동거리
	$("#addTransportationMove").kendoTextBox();
	//교통수단 추가 주유일
	$("#addTransportationUgaDay").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd"});

	//교통수단 추가 유류
	var oilType =[
		{value: "0", text: "선택"}, {value: "1", text: "휘발유"}, {value: "2", text: "경우"}, {value: "3", text: "LPG"}
	];
	$("#addTransportationoilType").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: oilType });

	//교통수단 추가 유류
	var regionCode =[
		{value: "0", text: "선택"}, {value: "1", text: "서울"}, {value: "2", text: "충남"}, {value: "3", text: "전북"}
	];
	$("#region").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: regionCode });
	//교통수단 추가 지역별 유가
	$("#regionOilMoney").kendoTextBox();
	//교통수단 추가 출발 비용
	$("#addTransportationDepCost").kendoTextBox();
	//교통수단 추가 복귀 비용
	$("#addTransportationArrCost").kendoTextBox();

	//여비 계산 식비 드롭박스
	var giveFoodCode =[
		{value: "0", text: "미제공"}, {value: "1", text: "1끼 제공"}, {value: "2", text: "2끼 제공"}, {value: "3", text: "3끼 제공"}
	];
	$("#giveFoodCode").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: giveFoodCode });
	//여비 계산 식비 가격
	$("#foodCost").kendoTextBox();
	//여비 계산 일비 감액 드롭박스
	var reduceDayCostCode =[
		{value: "0", text: "감액없음"}, {value: "1", text: "10% 감액"}, {value: "2", text: "20% 감액"}, {value: "3", text: "30% 감액"}, {value: "4", text: "100% 감액"}
	];
	$("#reduceDayCost").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: reduceDayCostCode });
	//여비 계산 일비 가격
	$("#dayCost").kendoTextBox();
	//여비 계산 증빙개인 교통비
	$("#traficCost").kendoTextBox();
	//여비 계산 증빙개인 숙박비 드롭박스
	var giveRoomCode =[
		{value: "0", text: "선택"}, {value: "1", text: "미제공"}, {value: "2", text: "제공"}
	];
	$("#giveRoom").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: giveRoomCode });
	//여비 계산 증빙개인 숙박비 가격
	$("#roomCost").kendoTextBox();
	//여비 계산 증빙개인 기타비
	$("#etcCost").kendoTextBox();
	//여비 계산 증빙법인 교통비
	$("#traficCostCard").kendoTextBox();
	//여비 계산 증빙법인 숙박비
	$("#roomCostCard").kendoTextBox();
	//여비 계산 증빙개인 기타비
	$("#etcCostCard").kendoTextBox();
	//여비 계산 합계
	$("#totalCos").kendoTextBox();

	//프로젝트
	$("#projectSeq").kendoTextBox();
	$("#projectView").kendoTextBox();
	//발의일자
	$("#qkfdml").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	//적요
	$("#wjrdy").kendoTextBox();
	//예산과목(예금)
	$("#yeSanCd").kendoTextBox();
	$("#yeSanView").kendoTextBox();

	//조회기간 시작
	$("#start_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date("2022-07-01") });
	//조회기간 끝
	$("#end_day").kendoDatePicker({ depth: "month", start: "month", culture : "ko-KR", format : "yyyy-MM-dd", value : new Date() });
	//팝업창 부서검색
	$("#searchOrgCode").kendoDropDownList({ dataTextField: "text", dataValueField: "value", dataSource: search_condition });
	//팝업창 이름검색
	$("#searchValue").kendoTextBox();
	$("#selectDept, #selectName, #selectStartDay, #selectEndDay, #selectArea, #selectTitle, #addTransportationMoney").attr("readonly", true);
	$("#carWay").hide();
	$("#etcWay").hide();
	$('#carWayNo').hide();
	$('[name=addTransport]').css('border-bottom', '1px solid #dee2e6');
}
function numberWithCommas(num) {
	if (!num) {
		return 0;
	}
	return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}