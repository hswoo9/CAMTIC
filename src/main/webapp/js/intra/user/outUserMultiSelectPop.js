
var outUserMultiSel = {
    global : {
        flag : true,
        pathName : "",
        searchAjaxData : "",
        // approveAddBtn : function(e) {
        //     return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="outUserMultiSel.gridChoose(\'A' + e.EMP_SEQ + '\', \''+ e.EMP_NAME+ '\' , \''+ e.DEPT_NAME+ '\')">' +
        //         '<span class="k-button-text">선택</span>	' +
        //         '</button>';
        // },
        approve : "",
        approve101 : "<span class='k-icon k-i-check-circle k-button-icon approve101'></span>",
        approveNo : "<span class='k-icon k-i-x-circle k-button-icon approveNo'></span>",
    },

    fnDefaultScript : function(){
        $("#apprLineTabStrip, #apprLineUserInfoTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#apprLineTypeTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            show : function(e){
                $("#userList").data("kendoGrid").dataSource.read();
            }
        });

        $("#addSubHLineGrid, #addCooperationLineGrid, #addReaderListGrid").kendoGrid({
            resizable: true,
            columns: [
                {
                    title : "순번",
                    width : "41px"
                }, {
                    title : "이름",
                    width : "106px"
                }, {
                    title : "부서",
                    width : "190px"
                }, {
                    title : "직급",
                    width : "106px"
                }, {
                    title : "직책",
                    width : "106px"
                }
            ]
        });
    },

    treeViewReload : function(dept){
        outUserMultiSel.global.searchAjaxData = {
            authorityGroupId: 14
        }

        var deptUserDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/system/getAuthorityGroupUserList.do",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.authorityGroupId = 14;
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    return data.rs.length;
                },
            },
            pageSize: 10,
        });

        $("#userList").kendoGrid({
            dataSource: deptUserDataSource,
            height: 395,
            sortable: true,
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="outUserMultiSel.treeViewReload();">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "100px",
                }, {
                    title: "직위",
                    width: "100px",
                    template: function(row){
                        if(row.DUTY_NAME != undefined && row.DUTY_NAME != "") {
                            return row.DUTY_NAME;
                        }else {
                            return row.POSITION_NAME;
                        }
                    }
                }, {
                    field: "EMP_NAME",
                    title: "이름",
                    width: "100px",
                }, {
                    width: "70px",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="outUserMultiSel.gridChoose(\'' + e.EMP_SEQ + '\', \'' + e.EMP_NAME + '\', \'' + e.DEPT_NAME + '\', this)">선택</button>'
                    },
                }],
        }).data("kendoGrid");
    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (empSeq, empName, deptName, e) {

        if($("#type").val() == "recruit"){
            let userArr = [];

            let empNameArr = "";
            let empSeqArr = "";

            let flag = true;
            /** 결재선 */
            const dataItem = $("#userList").data("kendoGrid").dataItem(e.closest("tr"));
            console.log("dataItem", dataItem);

            const data = {
                empSeq : dataItem.EMP_SEQ,
                empName : dataItem.EMP_NAME,
                positionName : dataItem.POSITION_NAME,
                dutyName : dataItem.DUTY_NAME,
                deptSeq : dataItem.DEPT_SEQ,
                deptName : dataItem.DEPT_NAME,
                loginId : dataItem.LOGIN_ID
            }

            empNameArr += data.empName + ",";
            empSeqArr += data.empSeq + ",";

            userArr.push(data);

            opener.parent.userDataSet(userArr, empNameArr, empSeqArr, "");
        }else{
            opener.parent.$("#regtrName").val(empName);
            opener.parent.$("#userName").val(empName);
            //emp_seq, dept_seq, dept_name
            opener.parent.$("#empSeq").val(empSeq);
            opener.parent.$("#deptSeq").val();
            opener.parent.$("#deptName").val(deptName);
        }

        window.close();
    },

    newFavApprove : function(e){
        $("#approvalLineDataTb tbody tr").remove();
    },

    rowDblClick : function(e){
        $.each($("input[name='readerPk']:checked"), function(i, e){
            $(this).closest("tr").remove();
        })
    },

    rowsel : function(e){
        // $(".apprLineTr").removeClass("active");
        // $(e).addClass("active");
        if($(e).is(":checked")){
            $(e).prop("checked", false);
            $(e).closest("tr").removeClass("active");
        }else{
            $(e).closest("tr").addClass("active");
            $(e).prop("checked", true);
        }
    },

    apprLineSave : function(){
        let userArr = [];

        let empNameArr = "";
        let empSeqArr = "";

        let flag = true;

        /** 결재선 */
        $.each($("#approvalLineDataTb tbody tr"), function(){
            let data = {
                empSeq : $(this).find("#approveEmpSeq").val(),
                empName : $(this).find("#approveEmpName").val(),
                positionName : $(this).find("#approvePositionName").val(),
                dutyName : $(this).find("#approveDutyName").val(),
                deptSeq : $(this).find("#approveDeptSeq").val(),
                deptName : $(this).find("#approveDeptName").val(),
                regTeamSeq : $(this).find("#approveTeamId").val(),
                loginId : $(this).find("#loginId").val()
            }

            if($("#type").val() == "openStudy"){
                data.regEmpSeq = $(this).find("#approveEmpSeq").val();
                data.pk = opener.parent.$("#pk").val();

                $.ajax({
                    url: "/campus/getOpenStudyUserDoubleChk",
                    data: data,
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function(rs) {
                        if(rs.rs == "1"){
                            flag = false;
                        }
                    },
                    error: function (e) {
                        console.log('error : ', e);
                    }
                });
            }

            empNameArr += data.empName + ",";
            empSeqArr += data.empSeq + ",";

            userArr.push(data);
        });

        if($("#type").val() == "openStudy" && !flag){
            alert("중복된 참여는 불가능합니다.");
            return false;
        }

        opener.parent.userDataSet(userArr, empNameArr, empSeqArr, $("#type").val());

        window.close();
    }

}
