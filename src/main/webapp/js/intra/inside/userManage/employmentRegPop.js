var employmentRegPop = {
    global : {
		now : new Date(),
        searchAjaxData : "",
		saveAjaxData : "",
    },

    init : function(){
		customKendo.fn_datePicker("regDt", '', "yyyy-MM-dd", employmentRegPop.global.now);
		customKendo.fn_datePicker("contractStDt", '', "yyyy-MM-dd", employmentRegPop.global.now);
		customKendo.fn_datePicker("contractEnDt", '', "yyyy-MM-dd", new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
		customKendo.fn_textBox(["monthSalary", "totalSalary"]);
		$("#bySalary, #nyRaiseSalary").keyup(function(){
			$("#bySalary").val(comma(uncomma($("#bySalary").val())));
			$("#nyRaiseSalary").val(comma(uncomma($("#nyRaiseSalary").val())));

			$("#nySalary").val(comma(Number(uncomma($("#bySalary").val())) + Number(uncomma($("#nyRaiseSalary").val()))))

			$("#nyDecisionSalary").val(comma(Number(uncomma($("#nySalary").val())) * 12));
		});
    },

	setEmploymentContract : function(){
		if(!$("#empSeq").val()){
			alert("사용자를 선택해주세요.");
			return;
		}else if(!$("#bySalary").val()){
			alert("전년도 연봉월액을 입력해주세요.");
			$("#bySalary").focus();
			return;
		}else if(!$("#nyRaiseSalary").val()){
			alert("금년도 월 인상액을 입력해주세요.");
			$("#nyRaiseSalary").focus();
			return;
		}

		if(confirm("저장하시겠습니까?")){
			employmentRegPop.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				deptSeq : $("#deptSeq").val(),
				empName : $("#empName").val(),
				deptName : $("#deptName").val(),
				positionName : $("#positionName").val(),
				bySalary : uncomma($("#bySalary").val()),
				nyRaiseSalary : uncomma($("#nyRaiseSalary").val()),
				nySalary : uncomma($("#nySalary").val()),
				nyDecisionSalary : uncomma($("#nyDecisionSalary").val()),
				regDt : $("#regDt").val(),
				regEmpSeq : $("#regEmpSeq").val()
			}

			var result = customKendo.fn_customAjax("/userManage/setEmploymentContract.do", employmentRegPop.global.saveAjaxData);
			if(result.flag){
				alert("저장되었습니다.");
				opener.employmentManage.gridReload();
				window.close();
			}
		}
	},

	uncomma: function(str) {
		str = String(str);
		return str.replace(/[^\d]+/g, '');
	},

	comma: function(str) {
		str = String(str);
		return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	},
}
