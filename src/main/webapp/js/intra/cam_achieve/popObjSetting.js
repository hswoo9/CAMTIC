var popObjSet = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defaultScript: function (){
        $("input[name='delvObj'], input[name='saleObj'], input[name='incpObj']").kendoTextBox();
        $("input[name='payrollObj'], input[name='exnpObj'], input[name='commObj']").kendoTextBox();
    },

    saveBtn : function() {

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var objArr = [];
        $.each($(".objTr"), function(i, v){
            var item = {
                baseYear : $("#year").val(),
                deptSeq : $(this).find(".deptSeq").val(),
                delvObj : uncomma($(this).find("input[name='delvObj']").val()),
                saleObj : uncomma($(this).find("input[name='saleObj']").val()),
                incpObj : uncomma($(this).find("input[name='incpObj']").val()),
                payrollObj : uncomma($(this).find("input[name='payrollObj']").val()),
                exnpObj : uncomma($(this).find("input[name='exnpObj']").val()),
                commObj : uncomma($(this).find("input[name='commObj']").val()),
                empSeq : $("#regEmpSeq").val(),
                deptLevel : $("#deptLevel").val()
            };

            objArr.push(item);
        });

        var data = {
            type : $("#type").val(),
            objArr : JSON.stringify(objArr),
        }

        $.ajax({
            url : "/achieve/insDeptObjSetting",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    if($("#deptLevel").val() == "1"){
                        opener.parent.weekMeet.fn_searchData();
                    } else {
                        opener.parent.finPerm.fn_searchData();
                    }

                    window.close();
                }
            }
        });
    }

}