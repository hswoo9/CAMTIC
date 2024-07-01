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
                deptLevel : $("#deptLevel").val(),
                objType : $("#objType").val()
            };

            objArr.push(item);
        });

        var data = {
            type : $("#type").val(),
            baseYear : $("#year").val(),
            objArr : JSON.stringify(objArr),
            objType : $("#objType").val()
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
    },

    histBtn : function (){
        var url = "/cam_achieve/popup/popObjHist.do?year=" + $("#year").val() + "&deptLevel=2";
        var name = "_blank";
        var option = "width = 950, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}