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
		employmentManage.global.searchAjaxData = {
			startDate : $('#startDate').val(),
			endDate : $("#endDate").val(),
			deptSeq : $("#deptSeq").val(),
			team : $("#team").val(),
			status : $("#status").val(),
			empName : $("#empName").val()
		}
		employmentManage.mainGrid('/userManage/getEmploymentContList.do',employmentManage.global.searchAjaxData);
	},

	mainGrid : function(url, params) {
		var record = 0;
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
				pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
				{
					name : 'button',
					template : function (e){
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employmentManage.gridReload()">' +
							'	<span class="k-button-text">조회</span>' +
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
                    template : "<input type='checkbox' id='btnCheck' name='btnCheck' value='#=SALARY_CONTRACT_ID#' class='tdCheckBox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "번호",    /*template : "<input type='checkbox' id='eqmnUsePk#=EQIPMN_USE_SN#' name='eqmnUsePk' value='#=EQIPMN_USE_SN#' class='k-checkbox checkbox'/>",*/
                    template : function (e) {
                        return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++)+'<input type="hidden" + value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
                    },
					width: 50
                }, {
                    field: "DEPT_NAME",
                    title: "근무부서",
					width : 180
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "팀",
					width : 180
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
							str = "연봉계약 체결";
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
            ]
        }).data("kendoGrid");

		$("#checkAll").click(function(){
			if($(this).is(":checked")) $("input[name=btnCheck]").prop("checked", true);
			else $("input[name=btnCheck]").prop("checked", false);
		});
    },

	employmentReqPop : function() {
		var url = "/inside/employmentReqPop.do";
		var name = "employmentReqPop";
		var option = "width=965, height=500, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
		var popup = window.open(url, name, option);
	},

	sendSalaryWorkerReq : function(){
		if($("input[name='btnCheck']:checked").length == 0){
			alert("발송할 데이터를 선택해주세요.");
			return;
		}else if(!confirm("발송하시겠습니까?")){
			return;
		}

		employmentManage.global.chkArr = [];
		$("input[name='btnCheck']").each(function(){
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
		var url = "/inside/pop/employmentPop.do?salaryContractId="+salaryContractId;
		var name = "certifiPrintPop";
		var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
		var popup = window.open(url, name, option);
	},

	dataSet : function() {
		$("#startDate").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date(now.setMonth(now.getMonth() - 1))
		});

		$("#endDate").kendoDatePicker({
			depth: "month",
			start: "month",
			culture : "ko-KR",
			format : "yyyy-MM-dd",
			value : new Date()
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
	}
}

function gridReload(){
	employmentManage.gridReload()
}
