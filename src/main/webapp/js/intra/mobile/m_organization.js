var mOrg = {
    global : {

    },

    fn_defaultScript : function(data) {
        mOrg.makeCharts(data);

        $(".moveDept").on("click", function(e){
            mOrg.moveToDeptEmpList($(this).attr("deptSeq"));
        })
    },

    makeCharts : function(e){
        return e.map(x => {
            var charts = "";
            if(x.dept_level == "0"){
                charts += '' +
                    '<div class="org-1" deptSeq="' + x.dept_seq + '">' +
                        '<span>' +
                            '<img src="/images/camspot_m/ico-org1.png"/>' +
                            '<font class="txt type28 fP800 moveDept" deptSeq="' + x.dept_seq + '">' + x.dept_name + '</font>' +
                        '</span>' +
                    '</div>';

                $("#chartsDiv").append(charts);
            }else if(x.dept_level == "1"){
                charts += '' +
                    '<div class="org-2">' +
                        '<span>' +
                            '<img src="/images/camspot_m/ico-org2.png"/>' +
                            '<font class="txt type28 fP600 moveDept" deptSeq="' + x.dept_seq + '">' + x.dept_name + '</font>' +
                        '</span>' +
                        '<div class="org-3" deptSeq="' + x.dept_seq + '">' +

                        '</div>' +
                    '</div>';

                $("div[deptSeq='" + x.parent_dept_seq + "']").append(charts);
            }else if(x.dept_level == "2"){
                charts += '' +
                    '<a href="javascript:void(0)">' +
                        '<font class="txt type26 moveDept" deptSeq="' + x.dept_seq + '">' + x.dept_name + '</font>' +
                    '</a>';

                $("div[deptSeq='" + x.parent_dept_seq + "']").append(charts);
            }

            if (Object.keys(x).findIndex(y => y === 'items') > -1) {
                mOrg.makeCharts(x.items) // children 속성이 있을 경우 재귀 호출
            }
            return x
        })
    },

    moveToDeptEmpList : function(e){
        location.href = '/m/organization_view.do?deptSeq=' + e;
    },
}