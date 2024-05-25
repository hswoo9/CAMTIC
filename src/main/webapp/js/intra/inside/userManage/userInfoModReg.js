var now = new Date();

var userInfoModReg = {
    global : {
        searchAjaxData : "",
    },

    init : function(){
        userInfoModReg.dataSet();
        userInfoModReg.gridReload();
    },

    mainGrid : function(url, params) {
		var record = 0;
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
				pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
				{
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoModReg.gridReload()">' +
							'	<span class="k-button-text">조회</span>' +
							'</button>';
					}
				},
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel: {
	 	        fileName:  '인사정보 변경신청 리스트.xlsx',
	 	        allPages: true
 	         },
 	       excelExport: function(e) {
		    var data = e.workbook.sheets[0];
			    for (var i = 0; i < e.data.length; i++) {
				      var row = data.rows[i +1];
				      if(e.data[i].admin_approval == 'N' && e.data[i].returnyn == 'N'){
						  row.cells[6].value = "제출";
					  }else if(e.data[i].admin_approval == 'Y' && e.data[i].returnyn == 'N'){
						  row.cells[6].value = "승인";
					  }else if(e.data[i].admin_approval == 'N' && e.data[i].returnyn == 'Y'){
						  row.cells[6].value = "반려";
					  }	
			      }
  			},
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
			dataBound : userInfoModReg.onDataBound,
            columns: [
                /*{
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="userInfoModReg.selectAllcheck()"/>',
                    template : "<input type='checkbox' id='btnCheck' name='btnCheck' value='' class='tdCheckBox'/>",
                    width: 50
                }, */{
					attributes : { style : "text-align : center;"},
					width: "50px",	
                    field: "",
                    title: "번호",    /*template : "<input type='checkbox' id='eqmnUsePk#=EQIPMN_USE_SN#' name='eqmnUsePk' value='#=EQIPMN_USE_SN#' class='k-checkbox checkbox'/>",*/
                    template : function (e) {
                        return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++)+'<input type="hidden" + value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    }
                }, {
					attributes : { style : "text-align : center;"},
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
					attributes : { style : "text-align : center;"},
                    field: "DEPT_TEAM_NAME",
                    title: "팀"
                }, {
					attributes : { style : "text-align : center;"},
                    field: "POSITION_NAME",
                    title: "직책"
                }, {
					attributes : { style : "text-align : center;"},
					width: "80px",
                    field: "EMP_NAME",
                    title: "성명"
                }, {
					attributes : { style : "text-align : center;"},
					width: "100px",	
                    field: "REG_DATE",
                    title: "신청일"
                }, {
					attributes : { style : "text-align : center;"},
					width: "90px",
                    field: "typeName",
                    title: "신청항목"
                },
            ]
        }).data("kendoGrid");
    },

	onDataBound : function(){
		var grid = this;
		grid.tbody.find("tr").dblclick(function (e) {
			var dataItem = grid.dataItem($(this));
			var data = {
				key : dataItem.key,
				type : dataItem.type,
				id : dataItem.ID
			}
			userInfoModReg.fn_openModDetail(data, dataItem.typeName);
		});
	},

	fn_openModDetail : function(e,n) {
		var typeName = n;
		var url = "/userManage/modDetailPop.do?typeName="+typeName + "&key=" + e.key + "&type=" + e.type + "&id=" + e.id;
		var name = "detail";
		var option = "width = 600, height = 550, top = 100, left = 200, location = no"
		var popup = window.open(url, name, option);
	},

    gridReload : function() {
        userInfoModReg.global.searchAjaxData = {
            startDate : $('#start_date').val(),
            endDate : $("#end_date").val(),
            drop1 : $("#drop1").val(),
            status : $("#status").val(),
			empSeq : $("#empSeq").val()
        }
        userInfoModReg.mainGrid('/userManage/getPersonRecordApplyList2',userInfoModReg.global.searchAjaxData);
    },
    
	dataSet() {
		$("#start_date").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date(now.setMonth(now.getMonth() - 1))
		});

		$("#end_date").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date()
		});

		$("#drop1").kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
				{ text: "전체", value: "" },
				{ text: "학력사항", value: "1" },
				{ text: "경력사항", value: "2" },
				{ text: "병역사항", value: "3" },
				{ text: "가족사항", value: "4" },
				{ text: "보유면허", value: "5" },
				/*{ text: "발령사항", value: "6" },*/
				{ text: "상벌사항", value: "7" },
				{ text: "직무사항", value: "8" },
				{ text: "제안제도", value: "9" },
			],
			index: 0
		});

		$("#status").kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
				{ text: "전체", value: "" },
				{ text: "제출", value: "1" },
				{ text: "반려", value: "2" },
				{ text: "승인", value: "3" }
			],
			index: 0
		});

		customKendo.fn_textBox(["deptName", "teamNm", "empName"]);
	},
}
