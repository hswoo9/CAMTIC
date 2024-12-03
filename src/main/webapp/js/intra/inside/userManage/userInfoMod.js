var now = new Date();

var userInfoMod = {
    global : {
        searchAjaxData : "",
    },

    init : function(){
        userInfoMod.dataSet();
        userInfoMod.gridReload();
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

        fn_deptSetting();

		$("#name").kendoTextBox();

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
						return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.gridReload()">' +
							'	<span class="k-button-text">조회</span>' +
							'</button>';
					}
				},
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_approval()">' +
                            '	<span class="k-button-text">승인</span>' +
                            '</button>';
                    }
                }/*,
                 {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_cancel()">' +
                            '	<span class="k-button-text">승인취소</span>' +
                            '</button>';
                    }
                }*/, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_returnYcheck()">' +
                            '	<span class="k-button-text">반려</span>' +
                            '</button>';
                    }
                }/*,
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_returnCancel()">' +
                            '	<span class="k-button-text">반려취소</span>' +
                            '</button>';
                    }
                }*/, {
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
				      console.log(e.data[i]);
				      console.log(e.data[i].returnyn);
				      console.log(e.data[i].admin_approval);
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
			dataBound : userInfoMod.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="userInfoMod.selectAllcheck()"/>',
                    template : "<input type='checkbox' id='btnCheck' name='btnCheck' value='' class='tdCheckBox'/>",
                    width: 50
                },  {
					attributes : { style : "text-align : center;"},
					width: "50px",
					field: "",
					title: "번호",
					hidden: true, // 이 부분을 추가합니다.
					template : function (e) {
						return ($("#mainGrid").data("kendoGrid").dataSource.total() - record++)+'<input type="hidden" value="'+e.EMP_SEQ+'"/><input type="hidden" value="'+e.type+'"/><input type="hidden" value="'+e.ID+'"/><input type="hidden" value="'+e.key+'"/>';
					}
				}
				, {
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
                    title: "성명",
					template: function(e) {
						return "<a href='#' style='color: rgb(0, 51, 255);' onclick='userInfoMod.fn_openModDetail(\"" + e.key + "\", \"" + e.type + "\", \"" + e.ID + "\", \"" + e.typeName + "\")'>" + e.EMP_NAME + "</a>";
					}
                }, {
					attributes : { style : "text-align : center;"},
					width: "100px",	
                    field: "REG_DATE",
                    title: "신청일"
				},{
					attributes : { style : "text-align : center;"},
					width: "100px",
					field: "APPLICATION_ACTIVE",
					title: "신청구분"
                }, {
					attributes : { style : "text-align : center;"},
					width: "90px",
                    field: "typeName",
                    title: "신청항목"
                }, {
					attributes : { style : "text-align : center;"},
					width: "150px",
                    field : "admin_approval",
                    title: "처리상태",
                    template : function (e){
							console.log(e);
                        if(e.admin_approval == 'N' && e.returnyn == 'N') {
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="margin-right :10px;" onclick="userInfoMod.fn_approvalTest(this)">' +
                                '	<span class="k-button-text">승인</span>' +
                                '</button>' +
                                '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userInfoMod.fn_returnY(this)">' +
                                '	<span class="k-button-text">반려</span>' +
                                '</button>';
                        } else if(e.admin_approval == 'Y' && e.returnyn == 'N') {
                            /*return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:105px;" onclick="userInfoMod.fn_cancelTest(this)">' +
                                '	<span class="k-button-text">승인취소</span>' +
                                '</button>';*/
							return "처리완료(승인)"
                        }else if(e.admin_approval == 'N' && e.returnyn == 'Y'){
							/*return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:105px;" onclick="userInfoMod.fn_returnN(this)">' +
                                '	<span class="k-button-text">반려취소</span>' +
                                '</button>';*/
							return "처리완료(반려)"
						}
                    }
                },
            ]
        }).data("kendoGrid");
    },

	/*onDataBound : function(){
		var grid = this;
		grid.tbody.find("tr").dblclick(function (e) {
			var dataItem = grid.dataItem($(this));
			var data = {
				key : dataItem.key,
				type : dataItem.type,
				id : dataItem.ID
			}
			userInfoMod.fn_openModDetail(data, dataItem.typeName);
		});
	},*/

	fn_openModDetail: function(key, type, id, typeName) {
		var url = "/userManage/modDetailPop.do?typeName=" + typeName + "&key=" + key + "&type=" + type + "_tmp" + "&id=" + id;
		var name = "detail";
		var option = "width = 600, height = 550, top = 100, left = 200, location = no";
		var popup = window.open(url, name, option);
		userInfoMod.global.jsonData = { key: key, type: type, id: id };
	},

    fn_approvalTest : function(e) {
        if(confirm("승인 하시겠습니까?")){
            var data = {
                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
                TYPE : e.parentElement.parentElement.children[1].children[1].value,
                ID : e.parentElement.parentElement.children[1].children[2].value,
                KEY : e.parentElement.parentElement.children[1].children[3].value
            }
            $.ajax({
                url : '/userManage/setUpdateUserInfoModY',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (data){
                    if(data.rs == 'SUCCESS') {
                        $('#mainGrid').data('kendoGrid').dataSource.read();
	                    alert("승인 되었습니다.");
                    }else {
                        alert("승인에 실패하였습니다.");
                    }
                }
            })

        }
    },

    fn_cancelTest : function(e) {
        if(confirm("취소 하시겠습니까?")){
            var data = {
                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
                TYPE : e.parentElement.parentElement.children[1].children[1].value,
                ID : e.parentElement.parentElement.children[1].children[2].value,
                KEY : e.parentElement.parentElement.children[1].children[3].value
            }

            $.ajax({
                url : '/userManage/setUpdateUserInfoModN',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (data){
                    if(data.rs == 'SUCCESS') {
	                    alert("취소 되었습니다.");
                        $('#mainGrid').data('kendoGrid').dataSource.read();
                    }else {
                        alert("취소에 실패하였습니다.");
                    }
                }
            })

        }
    },
        fn_returnY : function(e) {
        if(confirm("반려 하시겠습니까?")){
            var data = {
                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
                TYPE : e.parentElement.parentElement.children[1].children[1].value,
                ID : e.parentElement.parentElement.children[1].children[2].value,
                KEY : e.parentElement.parentElement.children[1].children[3].value
            }
            $.ajax({
                url : '/userManage/setUpdateUserInfoReturnY',
                data : data,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (data){
                    if(data.rs == 'SUCCESS') {
	                    alert("반려 되었습니다.");
                        $('#mainGrid').data('kendoGrid').dataSource.read();
                    }else {
                        alert("반려에 실패하였습니다.");
                    }
                }
            })

        }
    },
        fn_returnN : function(e) {
	        if(confirm("반려를 취소 하시겠습니까?")){
	            var data = {
	                EMP_SEQ : e.parentElement.parentElement.children[1].children[0].value,
	                TYPE : e.parentElement.parentElement.children[1].children[1].value,
	                ID : e.parentElement.parentElement.children[1].children[2].value,
	                KEY : e.parentElement.parentElement.children[1].children[3].value
	            }
	            $.ajax({
	                url : '/userManage/setUpdateUserInfoReturnN',
	                data : data,
	                dataType : "json",
	                type : "POST",
	                async : false,
	                success : function (data){
	                    if(data.rs == 'SUCCESS') {
		                    alert("취소 되었습니다.");
	                        $('#mainGrid').data('kendoGrid').dataSource.read();
	                    }else {
	                        alert("취소에 실패하였습니다.");
	                    }
	                }
	            })
	        }
    },

    recruitReqPop : function() {
        var url = "/Inside/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function() {
        var url = "/Inside/recruitAdminPop.do";
        var name = "recruitAdminPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_approval : function() {
		if($('.tdCheckBox').is(':checked') == true){
			var data = {};
			var checkCnt = 0;
			var successCnt = 0;
			var checkStatus = 0;
						
			$.each($('.tdCheckBox:checked'), function(index, item) {
	            $.each($(item).parent().parent().find('td'), function(index, item) {
					if(index ==8){
						console.log(index,'번째 td 값 : ', $(item));
						if($(item)[0].innerText == "승인취소" || $(item)[0].innerText == "반려취소"){	
							checkStatus++;
						}
					}
	            });
	        });
			if(checkStatus > 0){
				alert("제출상태 만 선택해 주세요.");
				return;
			}
	        if(confirm("승인 하시겠습니까?")){
	        $.each($('.tdCheckBox:checked'), function(index, item) {
				checkCnt++;
	            console.log('체크된 값 : ', $(item).parent());
	            $.each($(item).parent().parent().find('td'), function(index, item) {
					if(index ==1){					
		               console.log(index,'번째 td 값 : ', $(item)[0].children[0].value);					
		               console.log(index,'번째 td 값 : ', $(item)[0].children[1].value);					
		               console.log(index,'번째 td 값 : ', $(item)[0].children[2].value);					
		               console.log(index,'번째 td 값 : ', $(item)[0].children[3].value);					
			             data = {
			                EMP_SEQ : $(item)[0].children[0].value,
			                TYPE : $(item)[0].children[1].value,
			                ID : $(item)[0].children[2].value,
			                KEY : $(item)[0].children[3].value
			            }
					}
					if(index ==8){
						console.log(index,'번째 td 값 : ', $(item));
						console.log(index,'번째 td 값 : ', $(item)[0].innerText);	
					}
	            });
	            $.ajax({
	                url : '/userManage/setUpdateUserInfoModY',
	                data : data,
	                dataType : "json",
	                type : "POST",
	                async : false,
	                success : function (data){
	                    if(data.rs == 'SUCCESS') {
							successCnt++;
	                    }
	                }
	            })
	        });
	        console.log(checkCnt)
	        console.log(successCnt)
	        if(checkCnt == successCnt){
				alert("승인 되었습니다.");
				$('#mainGrid').data('kendoGrid').dataSource.read();            
			}else {
	              alert("승인에 실패하였습니다.");
			}
	        }
		}else{
			alert("체크버튼을 체크해 주세요!")
		}
    },    
	fn_returnYcheck: function() {
		if ($('.tdCheckBox').is(':checked') == true) {
			var data = {};
			var checkCnt = 0;
			var successCnt = 0;
			var checkStatus = 0;
						
			$.each($('.tdCheckBox:checked'), function(index, item) {
	            $.each($(item).parent().parent().find('td'), function(index, item) {
					if(index ==8){
						console.log(index,'번째 td 값 : ', $(item));
						if($(item)[0].innerText == "승인취소" || $(item)[0].innerText == "반려취소"){	
							checkStatus++;
						}
					}
	            });
	        });
			if(checkStatus > 0){
				alert("제출상태 만 선택해 주세요.");
				return;
			}
			if (confirm("반려 하시겠습니까?")) {
				$.each($('.tdCheckBox:checked'), function(index, item) {
					checkCnt++;
					console.log('체크된 값 : ', $(item).parent());
					$.each($(item).parent().parent().find('td'), function(index, item) {
						if (index == 1) {
							console.log(index, '번째 td 값 : ', $(item)[0].children[0].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[1].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[2].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[3].value);
							data = {
								EMP_SEQ: $(item)[0].children[0].value,
								TYPE: $(item)[0].children[1].value,
								ID: $(item)[0].children[2].value,
								KEY: $(item)[0].children[3].value
							}
						}
					});
					$.ajax({
						url: '/userManage/setUpdateUserInfoReturnY',
						data: data,
						dataType: "json",
						type: "POST",
						async: false,
						success: function(data) {
							if (data.rs == 'SUCCESS') {
								successCnt++;
							}
						}
					})
				});
				if (checkCnt == successCnt) {
					alert("반려 되었습니다.");
					$('#mainGrid').data('kendoGrid').dataSource.read();
				} else {
					alert("반려에 실패하였습니다.");
				}
			}
		} else {
			alert("체크버튼을 체크해 주세요!")
		}
	},
	fn_returnCancel: function(e) {
		if ($('.tdCheckBox').is(':checked') == true) {
			var data = {};
			var checkCnt = 0;
			var successCnt = 0;
			var checkStatus = 0;

			$.each($('.tdCheckBox:checked'), function(index, item) {
				$.each($(item).parent().parent().find('td'), function(index, item) {
					if(index == 1){
						console.log(index,'번째 td 값 : ', $(item));
						if($(item)[0].innerText == "반려취소"){
							checkStatus++;
						}
					}
				});
			});
			if(checkStatus > 0){
				alert("반려상태 만 선택해 주세요.");
				return;
			}
			if (confirm("반려를 취소 하시겠습니까?")) {
				$.each($('.tdCheckBox:checked'), function(index, item) {
					checkCnt++;
					console.log('체크된 값 : ', $(item).parent());
					$.each($(item).parent().parent().find('td'), function(index, item) {
						if (index == 1) {
							console.log(index, '번째 td 값 : ', $(item)[0].children[0].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[1].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[2].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[3].value);
							data = {
								EMP_SEQ: $(item)[0].children[0].value,
								TYPE: $(item)[0].children[1].value,
								ID: $(item)[0].children[2].value,
								KEY: $(item)[0].children[3].value
							}
						}
					});
					$.ajax({
						url: '/userManage/setUpdateUserInfoReturnN',
						data: data,
						dataType: "json",
						type: "POST",
						async: false,
						success: function(data) {
							if (data.rs == 'SUCCESS') {
								successCnt++;
							}
						}
					})
				});
				console.log(checkCnt)
				console.log(successCnt)
				if (checkCnt == successCnt) {
					alert("반려가 취소 되었습니다.");
					$('#mainGrid').data('kendoGrid').dataSource.read();
				} else {
					alert("반려 취소를 실패하였습니다.");
				}
			}
		} else {
			alert("체크버튼을 체크해 주세요!")
		}
	},
/*
    fn_return : function() {
		if($('.tdCheckBox').is(':checked') == true){
	        $.each($('.checkbox:checked'), function(index, item) {
	            console.log('체크된 값 : ', $(item).parent());
	            $.each($(item).parent().parent().find('td'), function(index, item) {
	                console.log(index,'번째 td 값 : ', $(item).text());
	            });
	        });			
		}else{
			alert("체크버튼을 체크해 주세요!")
		}
    },
*/
    gridReload : function() {
		if($("#mainGrid").data("kendoGrid") != null){
			$("#mainGrid").data("kendoGrid").destroy();
		}

        userInfoMod.global.searchAjaxData = {
            startDate : $('#start_date').val(),
            endDate : $("#end_date").val(),
            dept : $("#dept").val(),
            team : $("#team").val(),
            drop1 : $("#drop1").val(),
            status : $("#status").val(),
            name : $("#name").val()
        }
        userInfoMod.mainGrid('/userManage/getPersonRecordApplyList',userInfoMod.global.searchAjaxData);
    },
    
	fn_cancel: function(e) {
		if($('.tdCheckBox').is(':checked') == true){
			var data = {};
			var checkCnt = 0;
			var successCnt = 0;
			var checkStatus = 0;
			$.each($('.tdCheckBox:checked'), function(index, item) {
	            $.each($(item).parent().parent().find('td'), function(index, item) {
					if(index ==8){
						console.log(index,'번째 td 값 : ', $(item));
						if($(item)[0].innerText != "승인취소"){	
							checkStatus++;
						}
					}
	            });
	        });
			if(checkStatus > 0){
				alert("승인상태 만 선택해 주세요.");
				return;
			}
			if (confirm("취소 하시겠습니까?")) {
				$.each($('.tdCheckBox:checked'), function(index, item) {
					checkCnt++;
					console.log('체크된 값 : ', $(item).parent());
					$.each($(item).parent().parent().find('td'), function(index, item) {
						if (index == 1) {
							console.log(index, '번째 td 값 : ', $(item)[0].children[0].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[1].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[2].value);
							console.log(index, '번째 td 값 : ', $(item)[0].children[3].value);
							data = {
								EMP_SEQ: $(item)[0].children[0].value,
								TYPE: $(item)[0].children[1].value,
								ID: $(item)[0].children[2].value,
								KEY: $(item)[0].children[3].value
							}
						}
					});
					$.ajax({
						url: '/userManage/setUpdateUserInfoModN',
						data: data,
						dataType: "json",
						type: "POST",
						async: false,
						success: function(data) {
							if (data.rs == 'SUCCESS') {
								successCnt++;
							}
						}
					})
				});
				console.log(checkCnt)
				console.log(successCnt)
				if (checkCnt == successCnt) {
					alert("취소 되었습니다.");
					$('#mainGrid').data('kendoGrid').dataSource.read();
				} else {
					alert("취소에 실패하였습니다.");
				}
			}
			
		}else{
			alert("체크버튼을 체크해 주세요!")
		}
	},
	
	 selectAllcheck : function(){
		 console.log($('#checkAll').is(":checked"));
	    if($('#checkAll').is(":checked")){
	        $("input[name='btnCheck']:checkbox").prop("checked", true);
	        console.log($("input[name='btnCheck']:checkbox"));    
	    }else{
	        $("input[name='btnCheck']:checkbox").prop("checked", false);
	        console.log($("input[name='btnCheck']:checkbox"));
	    }
	},

	userPersonnelRecordPop : function(data){
        console.log(data);
        var url = "/useManage/userPersonnelRecordPop.do?popName="+data;
        var name = "userPersonnelRecordPop";
        var option = "width = 1000, height = 500, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }

	/*test : function() {
		$("#mainGrid tbody tr").dblclick(function(){
			var tr = $(this);
			var td = tr.children();
			var windowPopUrl = "";
			alert(tr);
			//popName = "vacSaving";
			//popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=1075, height=630";
			//window.open(windowPopUrl, popName, popStyle);
		})
	}*/
}
