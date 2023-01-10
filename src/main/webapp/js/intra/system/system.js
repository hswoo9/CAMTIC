/**
 * 2022.07.07 by. 김은진
 * 전체관리 > 시스템관리 > 인사코드관리
 *
 * function / global variable / local variable setting
 */
 
//alert("test");
 


$(document).ready(function() {
	//공통코드 신청
	//대분류코드
	$("#bigCode").kendoRadioGroup({
		items: [
			{label : "인사" , value : "1"},
			{label : "근태" , value : "2"},
			{label : "교육" , value : "3"},
			{label : "총무" , value : "4"},
			{label : "제안평가" , value : "5"}
		],
		layout : "horizontal",
		labelPosition : "after"
	}).data("kendoRadioGroup");
	
	$("#midCode").kendoTextBox();
	$("#midCodename").kendoTextBox();
	$("#detailCode").kendoTextBox();
	$("#detailCodename").kendoTextBox();
	
	//사용유무
	$("#useYn").kendoRadioGroup({
        items: ["사용", "미사용"],
        layout : "horizontal",
        labelPosition : "after",
        value: "사용"
    }).data("kendoRadioGroup");
    
    $("#mappingCode").kendoTextBox();
	$("#g20mappingCode").kendoTextBox();
	$("#order").kendoTextBox();
    
    //공통코드 목록
    //코드구분
    $("#codeDivision").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{ text: "전체", value: "0" },
			{ text: "전체1", value: "1" },
			{ text: "전체2", value: "2" }
		],
			index: 0
	});
	$("#subcodeDivision").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{ text: "전체", value: "0" },
			{ text: "전체1", value: "1" },
			{ text: "전체2", value: "2" }
		],
		index: 0
	});

	$("#codeName").kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: [
			{ text: "코드명", value: "0" },
			{ text: "코드명1", value: "1" },
			{ text: "코드명2", value: "2" },
		],
		index: 0
	});

	$("#searchWord").kendoTextBox();
	
});