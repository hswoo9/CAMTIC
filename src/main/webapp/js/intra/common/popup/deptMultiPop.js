
var deptMultiPop = {
    global : {
        flag : true,
        arrDeptSeq : [],
        arrDeptName : []
    },

    fnDefaultScript : function(){

        $("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },
            dataSource: datas,
            dataTextField: ['dept_name'],
            dataValueField : ['dept_seq'],
            check : function(e){
                var deptSeq = $('#treeview').data("kendoTreeView").dataItem(e.node).dept_seq;
                var deptName = $('#treeview').data("kendoTreeView").dataItem(e.node).dept_name;
                console.log($(e.node).attr("aria-checked"))
                if($(e.node).attr("aria-checked") == "true"){
                    deptMultiPop.global.arrDeptSeq.push(deptSeq);
                    deptMultiPop.global.arrDeptName.push(deptName);
                } else {
                    deptMultiPop.global.arrDeptSeq.forEach(function(v){
                        if(deptSeq == v){
                            deptMultiPop.global.arrDeptSeq.splice(deptMultiPop.global.arrDeptSeq.indexOf(deptSeq),1);
                            deptMultiPop.global.arrDeptName.splice(deptMultiPop.global.arrDeptName.indexOf(deptName),1);
                        }
                    });
                }
            },
            // select: deptMultiPop.treeClick,
        });


    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        $("#userList").data("kendoGrid").dataSource.read();
    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (e) {
        opener.parent.$("#deptName").val(deptMultiPop.global.arrDeptName);
        opener.parent.$("#deptSeq").val(deptMultiPop.global.arrDeptSeq);
        window.close();
    }

}
