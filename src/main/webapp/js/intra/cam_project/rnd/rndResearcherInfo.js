var rndRschInfo = {


    fn_defaultScript : function(){

        rndRschInfo.fn_rschMainGrid();
    },

    gridReload: function(){
        $("#rschMainGrid").data("kendoGrid").dataSource.read();
    },


    fn_rschMainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getRschInfo",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#rschMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch(\'rndResearcher\','+$("#pjtSn").val()+')">' +
                            '	    <span class="k-button-text">등록</span>' +
                            '   </button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        var chk = "";
                        if(e.CHK > 0){
                            chk = "checked";
                        }

                        return "<input type='checkbox' id='rsch_" + e.RECRUIT_COMMISSIONER_INFO_SN + "' name='rschChk' value='" + e.PJT_RSCH_SN + "' " + chk + "/>";
                    },
                    width: 50
                }, {
                    template: "#= ++record #",
                    title: "순번",
                    width : 80
                }, {
                    title: "구분",
                    field: "PJT_RSCH_POSITION",
                    width: 200
                }, {
                    title: "이름",
                    field: "PJT_RSCH_NM",
                    width: 200
                }, {
                    title: "소속",
                    field : "PJT_RSCH_COMP",
                }, {
                    title: "진행과제수",
                    width: 200,
                    template : function (e){
                        return "0";
                    }
                }, {
                    title : "참여율",
                    width: 200,
                    template : function (e){
                        return "0%";
                    }
                }, {
                    title : "실제 참여 여부",
                    width: 100,
                    template: function(e){
                        if(e.PJT_MNG_CHECK == "Y"){
                            return '연구책임자'
                        }else{
                            if(e.REAL_YN == "Y"){
                                return '<button type="button" class="k-button k-button-solid-error" onclick="rndRschInfo.fn_realCheck('+e.PJT_RSCH_SN+', \'C\', '+e.PJT_RSCH_EMP_SEQ+')">취소</button>'
                            }else{
                                return '<button type="button" class="k-button k-button-solid-info" onclick="rndRschInfo.fn_realCheck('+e.PJT_RSCH_SN+', \'Y\', '+e.PJT_RSCH_EMP_SEQ+')">등록</button>'
                            }
                        }
                    }
                }, {
                    title : "삭제",
                    width: 100,
                    template: function(e){
                        if(e.PJT_MNG_CHECK == "Y"){
                            return '연구책임자'
                        }else{
                            return '<button type="button" class="k-button k-button-solid-error" onclick="rndRschInfo.fn_del('+e.PJT_RSCH_SN+')">삭제</button>'
                        }
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");


        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=rschChk]").prop("checked", true);
            else $("input[name=rschChk]").prop("checked", false);
        });
    },

    fn_del : function (key){
        var data= {
            pjtRschSn : key
        }

        $.ajax({
            url : "/projectRnd/delRschData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
               if(rs.code == 200){
                   $("#rschMainGrid").data("kendoGrid").dataSource.read();
               }
            }
        })
    },

    fn_realCheck : function(key, status, empSeq){
        var data= {
            pjtRschSn : key,
            status: status,
            pjtSn: $("#pjtSn").val(),
            empSeq: empSeq,
            regEmpSeq: $("#regEmpSeq").val()
        }

        /** 참여인력 테이블 업데이트 */
        $.ajax({
            url : "/projectRnd/updRschStatus",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    $("#rschMainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });

        if(status == "Y"){
            rndRschInfo.fn_insPjtPsRnd(data);
        }else{
            rndRschInfo.fn_delPjtPsRnd(data);
        }

    },

    fn_insPjtPsRnd: function(data){
        /** 실제 참여자 등록시 결과보고 유저 테이블에 insert */
        $.ajax({
            url : "/projectRnd/insPjtPsRnd",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    $("#rschMainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });
    },

    fn_delPjtPsRnd: function(data){
        /** 실제 참여자 취소시 결과보고 유저 테이블에 delete */
        $.ajax({
            url : "/projectRnd/delPjtPsRnd",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    $("#rschMainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });
    }
}