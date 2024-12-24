var employmentManage = {
    global : {
        searchAjaxData : "",
		dropDownDataSource : "",
		chkArr : [],
    },

    init : function(){
        employmentManage.dataSet();
        employmentManage.gridReload();
    },

	gridReload : function() {
		if($("#mainGrid").data("kendoGrid") != null){
			$("#mainGrid").data("kendoGrid").destroy();
		}
		
		employmentManage.global.searchAjaxData = {
			startDate : $('#startDate').val(),
			endDate : $("#endDate").val(),
			deptSeq : $("#deptSeq").val(),
			team : $("#team").val(),
			status : $("#status").val(),
			empName : $("#name").val(),
			adminYn : 'Y'
		}
		employmentManage.mainGrid('/userManage/getEmploymentContList.do', employmentManage.global.searchAjaxData);
	},

	mainGrid : function(url, params) {
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
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="employmentManage.setSalaryContractDel()">' +
							'	<span class="k-button-text">삭제</span>' +
							'</button>';
					}
				}, {
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employmentManage.excelFormDown()">' +
							'	<span class="k-button-text">등록양식 다운로드</span>' +
							'</button>';
					}
				}, {
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employmentManage.fn_excelUploadPop()">' +
							'	<span class="k-button-text">등록양식 업로드</span>' +
							'</button>';
					}
				},{
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="employmentManage.employmentReqPop()">' +
							'	<span class="k-button-text">연봉근로계약서 작성</span>' +
							'</button>';
					}
				}, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employmentManage.sendSalaryWorkerReq()">' +
                            '	<span class="k-button-text">계약서 발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                },  {
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employmentManage.gridReload()">' +
							'	<span class="k-button-text">조회</span>' +
							'</button>';
					}
				}
			],
            excel: {
	 	        fileName:  '연봉근로계약서 리스트.xlsx',
	 	        allPages: true
			},
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="employmentManage.selectAllcheck()"/>',
                    width: 50,
					template : function (e) {
						if (e.SEND_YN == "Y"){
							return '';
						}else{
							return '<input type="checkbox" id="scChk#=SALARY_CONTRACT_ID#" name="scChk" value='+ e.SALARY_CONTRACT_ID +' class="tdCheckBox"/>';
						}

					}
                }, {
                    field: "",
                    title: "번호",
					/*template : "<input type='checkbox' id='eqmnUsePk#=EQIPMN_USE_SN#' name='eqmnUsePk' value='#=EQIPMN_USE_SN#' class='k-checkbox checkbox'/>",*/
                    /*template : function (e) {
                        return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++)+'<input type="hidden" + value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    },*/
					template: "#= --record #",
					width: 50
                }, {
                    field: "parentDeptName",
                    title: "근무부서",
					width : 180
                }, {
                    field: "DEPT_NAME",
                    title: "팀",
					width : 180,
					template : function (e){
						if(e.parentDeptName == e.DEPT_NAME){
							return "";
						}else{
							return e.DEPT_NAME;
						}
					}
                }, {
                    field: "POSITION_NAME",
                    title: "직위",
					width : 180
                }, {
                    field: "EMP_NAME",
                    title: "성명"
                }, {
					field: "SALARY_CONTRACT_REQ_DT",
					title: "연봉근로계약서 작성일",
				},{
					title : "발송여부",
					template : function(e){
						if (e.SEND_YN == "Y"){
							return '발송';
						}else{
							return '미발송';
						}
					},
					width : 80
				}, {
					title : "연봉계약서",
					template : function(e){
						var rgb = "";
						var str = "";
						if(e.FLAG == "Y"){
							rgb = "info";
							str = "연봉계약 확인";
						}else if(e.FLAG == "N"){
							rgb = "error";
							str = "연봉계약서 미확인";
						}else{
							rgb = "error";
							str = "연봉계약서";
						}

						return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-' + rgb + '" onclick=\"employmentManage.employmentPop('+ e.SALARY_CONTRACT_ID + ')\">' +
							'<span class="k-button-text">' + str + '</span>' +
							'</button>';
					},
					width : 135
				}
            ],
			dataBinding: function(){
				record = employmentManage.fn_getRowNum(this, 2);
			}
        }).data("kendoGrid");

		$("#checkAll").click(function(){
			if($(this).is(":checked")) $("input[name=scChk]").prop("checked", true);
			else $("input[name=scChk]").prop("checked", false);
		});
    },

	employmentReqPop : function() {
		var url = "/inside/employmentReqPop.do";
		var name = "employmentReqPop";
		var option = "width=965, height=500, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
		var popup = window.open(url, name, option);
	},

	sendSalaryWorkerReq : function(){
		if($("input[name='scChk']:checked").length == 0){
			alert("발송할 데이터를 선택해주세요.");
			return;
		}else if(!confirm("발송하시겠습니까?")){
			return;
		}

		employmentManage.global.chkArr = [];
		$("input[name='scChk']").each(function(){
			if(this.checked){
				employmentManage.global.chkArr.push(this.value);
			}
		})

		employmentManage.global.saveAjaxData = {
			sendArr : employmentManage.global.chkArr
		}

		var result = customKendo.fn_customAjax("/userManage/sendSalaryWorkerReq.do", employmentManage.global.saveAjaxData);
		if(result.flag){
			alert("발송되었습니다.");
			employmentManage.gridReload();
		}
	},

	employmentPop : function(salaryContractId) {
		$("#employR").val(salaryContractId);
		$("#employRF").one("submit", function() {
			var url = "/inside/pop/employmentPop.do";
			var name = "employmentPop";
			var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
			var popup = window.open(url, name, option);
			this.action = "/inside/pop/employmentPop.do";
			this.method = 'POST';
			this.target = 'employmentPop';
		}).trigger("submit");
	},

	fn_excelUploadPop : function(){
		var url = "/inside/pop/employExcelUploadPop.do";
		var name = "_blank";
		var option = "width = 500, height = 230, top = 100, left = 400, location = no"
		var popup = window.open(url, name, option);
	},

	excelFormDown : function(){
		kendo.saveAs({
			dataURI: "/inside/employExcelFormDown.do"
		});
	},

	dataSet : function() {
		$("#startDate").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date().getFullYear() + '-01-01'
		});

		$("#endDate").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date().getFullYear() + '-12-31'
		});

		$("#status").kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: [
				{ text: "전체", value: "" },
				{ text: "확인", value: "Y" },
				{ text: "미확인", value: "N" },
			],
			index: 0,
			change : function(){
				employmentManage.gridReload()
			}
		});

		employmentManage.global.dropDownDataSource = customKendo.fn_customAjax("/dept/getDeptAList", {deptLevel : 1});
		customKendo.fn_dropDownList("deptSeq", employmentManage.global.dropDownDataSource.rs, "dept_name", "dept_seq");
		$("#deptSeq").data("kendoDropDownList").bind("change", employmentManage.setTeam);
		$("#deptSeq").data("kendoDropDownList").trigger("change");
		$("#name").kendoTextBox();
	},

	setTeam : function(){
		var data = {
			deptLevel : 2,
			parentDeptSeq : this.value()
		};

		employmentManage.global.dropDownDataSource = customKendo.fn_customAjax("/dept/getDeptAList", data);
		customKendo.fn_dropDownList("team", employmentManage.global.dropDownDataSource.rs, "dept_name", "dept_seq");

		employmentManage.gridReload()
	},

	setSalaryContractDel : function(){
		if($("input[name='scChk']:checked").length == 0){
			alert("삭제할 연봉계약을 선택해주세요.");
			return
		}

		if(confirm("선택한 연봉계약를 삭제하시겠습니까?")){
			var salaryContractId = "";

			$.each($("input[name='scChk']:checked"), function(){
				salaryContractId += "," + $(this).val()
			})

			var data = {
				regEmpSeq : $("#empSeq").val(),
				salaryContractId : salaryContractId.substring(1)
			}

			var result = customKendo.fn_customAjax("/userManage/setSalaryContractDel.do", data);
			if(result.flag){
				alert("처리되었습니다.");
				employmentManage.gridReload();
			}
		}
	},

	fn_getRowNum : function(e, type){
	/** type이 1이면 정순, 2면 역순, 3이면 페이징 없을때 역순 */
		let pageSize = e.dataSource.pageSize();
		if(pageSize == null){
			pageSize = 9999;
		}

		if(type == 1){
			return (e.dataSource.page() -1) * pageSize;
		}else if(type == 2){
			return e.dataSource._data.length+1 - ((e.dataSource.page() -1) * pageSize);
		}else if(type == 3){
			return e.dataSource._data.length+1 - ((0 -1) * 0);
		}else{
			return 0;
		}
	}
}

function gridReload(){
	employmentManage.gridReload()
}
