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
		$("#monthSalary").keyup(function(){
			if($(this).val().toString().toMoney().charAt(0) == "0"){
				$(this).val($(this).val().toString().substring(1).toMoney());
			}else{
				$(this).val($(this).val().toString().toMoney());
			}

			employmentRegPop.setTotalSalaryInput();
		});
    },

	setTotalSalaryInput : function(){
		var monthSalary = Number($("#monthSalary").val().toString().toMoney2());
		$("#totalSalary").val((monthSalary * 12).toString().toMoney());
	},

	setEmploymentContract : function(){
		if(!$("#empSeq").val()){
			alert("사용자를 선택해주세요.");
			return;
		}else if(!$("#monthSalary").val()){
			alert("월기준급여액을 입력해주세요.");
			return;
		}

		if(confirm("저장하시겠습니까?")){
			employmentRegPop.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				deptSeq : $("#deptSeq").val(),
				empName : $("#empName").val(),
				deptName : $("#deptName").val(),
				jobDetail : $("#jobDetail").val(),
				contractStDt : $("#contractStDt").val(),
				contractEnDt : $("#contractEnDt").val(),
				monthSalary : $("#monthSalary").val().toString().toMoney2(),
				totalSalary : $("#totalSalary").val().toString().toMoney2(),
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
	}
}
