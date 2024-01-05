var etaxList = {

    fn_defaultScript: function (){

        var date = new Date();
        date.setMonth(date.getMonth() - 1);
        customKendo.fn_datePicker("strDt", "depth", "yyyy-MM-dd", date);
        customKendo.fn_datePicker("endDt", "depth", "yyyy-MM-dd", new Date());



        etaxList.mainGrid();
    },

    gridReload: function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/mng/getEtaxListAll',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.strDt = $("#strDt").val().toString().replace(/-/g, "");
                    data.endDt = $("#endDt").val().toString().replace(/-/g, "");
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="etaxList.syncEtaxG20Data()">' +
                            '	<span class="k-button-text">G20 동기화</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="etaxList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 50
                }, {
                    title: "사업장",
                    width: 120,
                    template: function (e){
                        return e.DIV_NM;
                    }
                }, {
                    title: "구분",
                    width: 80,
                    template: function (e){
                        if(e.ETAX_TY == 1){
                            return "일반";
                        } else if(e.ETAX_TY == 2){
                            return "수정";
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "작성일자",
                    width: 120,
                    template: function (e){
                        return e.ISU_DT.substring(0,4) + "-" + e.ISU_DT.substring(4,6) + "-" + e.ISU_DT.substring(6,8);
                    }
                }, {
                    title: "거래처명",
                    width: 200,
                    template: function (e){
                        return '<input type="hidden" id="trCd" value="' + e.TR_CD + '"/>' + e.TR_NM;
                    }
                }, {
                    title: "사업자번호",
                    width: 100,
                    template: function (e){
                        if(e.TRREG_NB != null){
                            return e.TRREG_NB.toString().substring(0,3) + "-" + e.TRREG_NB.toString().substring(3,5) + "-" + e.TRREG_NB.toString().substring(5,10);
                        } else {
                            return "";
                        }
                    }
                }, {
                    title: "공급가액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.SUP_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    title: "세액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.VAT_AM.toString().split(".")[0])+'</div>';
                    }
                }, {
                    title: "합계금액",
                    width: 100,
                    template: function (e){
                        return '<div style="text-align: right;">'+comma(e.SUM_AM.toString().split(".")[0])+'</div>';
                    }
                }
                // , {
                //     title: "결의서",
                //     width: 50,
                //     template: function (e){
                //         if(e.DOC_ID != null && e.DOC_ID != "" && e.DOC_ID != undefined){
                //             return '결의서';
                //         } else {
                //             return '미결의';
                //         }
                //     }
                // }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    syncEtaxG20Data : function (){
        var data = {
            strDt : $("#strDt").val(),
            endDt : $("#endDt").val(),
        }

        $.ajax({
            url : "/etax/syncEtaxG20Data",
            data : data,
            type : "post",
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success :function (rs){
                if(rs.code == 200){
                    alert("완료되었습니다.");
                    $("#mainGrid").data("kendoGrid").dataSource.read();
                    $("#my-spinner").hide();
                }
            },
            error : function(e){
                alert("오류가 발생하였습니다.");
                $("#my-spinner").hide();
            }
        });
    }
}