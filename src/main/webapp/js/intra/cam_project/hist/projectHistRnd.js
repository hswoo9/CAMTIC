var histRnd = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["subject"]);

        this.gridReload();
    },

    gridReload: function(){
        histRnd.global.searchAjaxData = {
            subject : $("#subject").val()
        }
        histRnd.mainGrid("/projectHist/getHistRndList", histRnd.global.searchAjaxData);
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
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histRnd.gridReload()">' +
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
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "PrjNo",
                    title: "과제번호",
                    width: 100
                }, {
                    field: "Comit",
                    title: "지원기관",
                    width: 150
                }, {
                    field: "Subject",
                    title: "상담제목",
                    template: function(e){
                        const id = $("#regId").val();
                        var pjtNm = e.Subject;
                        var pjtEx = pjtNm;
                        if(pjtNm.toString().length > 34){
                            pjtEx = pjtNm.toString().substring(0, 34)+ "...";
                        }
                        return "<a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"RnD/ReschList/Progress/Index.aspx?ID="+e.PrjID+"' target='_blank' style='font-weight: bold'>" + pjtEx + "</a>";
                    }
                }, {
                    field: "MainComit",
                    title: "주관기관",
                    width: 300
                }, {
                    field: "SubMoney",
                    title: "총사업비",
                    width: 100,
                    template: function(row){
                        if(row.SubMoney != null){
                            return "<div style='text-align: right'>"+comma(row.SubMoney)+"</div>";
                        }else{
                            return "<div style='text-align: right'>0</div>";
                        }
                    }
                }, {
                    field: "NMoney",
                    title: "법인연구비",
                    width: 100,
                    template: function(row){
                        if(row.NMoney != null){
                            return "<div style='text-align: right'>"+comma(row.NMoney)+"</div>";
                        }else{
                            return "<div style='text-align: right'>0</div>";
                        }
                    }
                }, {
                    field: "master",
                    title: "연구책임자",
                    width: 80
                }, {
                    field: "pm",
                    title: "담당자",
                    width: 80
                }, {
                    field: "count",
                    title: "연구원수",
                    width: 50
                }, {
                    field: "PSDate",
                    title: "시작일",
                    width: 80
                }, {
                    field: "PEDate",
                    title: "종료일",
                    width: 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },
}