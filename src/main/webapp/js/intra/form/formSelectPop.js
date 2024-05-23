var fsp = {
    fn_defaultScript: function (params) {
        var treeview = $("#formTreeViewDiv").kendoTreeView({
            dataSource: params,
            dataTextField:['FORM_NAME']
        });

        $(".k-treeview .k-group .k-item .k-group .k-item .k-group .k-item").on("dblclick", function(e) {
            var node = $(e.target).closest(".k-item");
            var item = $("#formTreeViewDiv").data("kendoTreeView").dataItem(node);

            if ($(".formName:contains('"+item.FORM_NAME+"')").hasClass("formName") === true) {
                return;
            }


            var html = "";
            html += "<tr class=\"addData\">";
            html += "   <td class=\"text-center\"><input type=\"checkbox\" class=\"formId\" id=\""+item.FORM_ID+"\"></td>";
            html += "   <td class=\"text-center formName\">"+item.FORM_NAME+"</td>";
            html += "</tr>";

            var plusRow = $('#formItemInfo').children();
            plusRow.append(html);
        });
    },

    setFormList : function() {
        var formIdList = "";
        var formNameList = "";
        $.each($('.addData'), function(i, v){
            if(i != 0) {
                formIdList += ",";
                formNameList += ", ";
            }
            formIdList += $(v).find('.formId').attr("id");
            formNameList += $(v).find('.formName').text();
        });
        try {
            $(opener.document).find('#formIdList').val(formIdList);
            $(opener.document).find('#authSelectedText').val(formNameList);

            console.log(formIdList);
            console.log(formNameList);

            window.close();
        } catch (e) {
            alert("팝업창을 닫고 다시 시도해주세요.");
        }
    },

    tableDelete : function() {
        $("input:checkbox:checked").each(function (i, v) {
            $(v).closest(".addData").remove();
        })
    },

    checkAll : function() {
        if($('#checkAll').is(":checked") === true) {
            $("input:checkbox").prop("checked", true);
        } else {
            $("input:checkbox").prop("checked", false);
        }
    }


}