var histPurc = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        this.gridReload();
    },

    gridReload: function(){
        histPurc.global.searchAjaxData = {
            empSeq : $("#empSeq").val()
        }
        histPurc.mainGrid("/purcHist/getHistPurcList", histPurc.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    for(var key in params){
                        data[key] = params[key];
                    }
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histPurc.gridReload()">' +
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
                    field: "SeqNo",
                    title: "번호",
                    width: 50
                }, {
                    field: "IsDocNo",
                    title: "문서번호",
                    width: 150
                }, {
                    field: "RequestDate",
                    title: "요청일",
                    width: 120
                }, {
                    field: "Name",
                    title: "요청자",
                    width: 120
                }, {
                    title: "단위사업명",
                    template: function(e){
                        const id = $("#regId").val();
                        var pjtNm = e.IsReason;
                        var pjtEx = pjtNm;
                        if(pjtNm.toString().length > 80){
                            pjtEx = pjtNm.toString().substring(0, 80)+ "...";
                        }
                        return "<a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"BIz/Request/RequestView.aspx?NUM="+e.SeqNo+"' target='_blank' style='font-weight: bold'>" + pjtEx + "</a>";
                    }
                }, {
                    field: "STAT",
                    title: "상태",
                    width: 80
                }, {
                    field: "EduTotal",
                    title: "구매",
                    width: 110,
                    template: function(row){
                        return row.COUNT1+"건 / <span style='color:red'>"+row.COUNT2+"건</span>";
                    }
                }, {
                    field: "EduTotal",
                    title: "외주",
                    width: 110,
                    template: function(row){
                        return row.COUNT3+"건 / <span style='color:red'>"+row.COUNT4+"건</span>";
                    }
                }
            ]
        }).data("kendoGrid");
    },
}