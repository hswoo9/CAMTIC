var note = {

    global : {

    }
}



function userSearchPopup(code, no){
    window.open('/common/userPopup.do?code='+code+'&no='+no , '조직도', 'scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=875, height=700');
}

function userPopupClose(row, code, no){
    console.log(row);
    var html = '' +
        '   <span name="opr_dept_1" id="opr_dept_1">'+row.dept_name+'</span>'+
        '   <input type="hidden" name="opr_dept_seq_1" id="opr_dept_seq_1" value="'+row.dept_seq+'">'+
        '   <span name="opr_emp_name_1" id="opr_emp_name_1">'+row.emp_name+'</span>'+
        '   <input type="hidden" name="opr_emp_seq_1" id="opr_emp_seq_1" value="'+row.emp_seq+'">'+
        '   <span class="k-icon k-i-x k-button-icon"></span>';

    $("#groupDeptEmp").append(html);

    $('#opr_dept_' + no).text(row.dept_name);
    $('#opr_emp_name_' + no).text(row.emp_name);
    $('#opr_dept_seq_' + no).val(row.dept_seq);
    $('#opr_emp_seq_' + no).val(row.emp_seq);
}

function noteSave(){
    var data = {
        ntContent : $("#noteContent").val(),
        recEmpSeq : $("#opr_emp_seq_1").val()
    }

    let url = '${contextPath}/note/noteList.do';

    $.ajax({
        url : "/note/noteSave.do",
        data : data,
        dataType : "json",
        type : "POST",
        success : function(rs){
            socket.send("관리자,"+ data.recEmpSeq +","+data.ntContent+","+url);
            alert("전송이 완료되었습니다.");
            location.reload();
        }
    });
}

function resetBtn(){
    $("#noteContent").val("");
}


