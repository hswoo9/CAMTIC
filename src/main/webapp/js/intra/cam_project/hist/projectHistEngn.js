var histEngn = {
    global: {
        searchAjaxData: {}
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["jSubject"]);

        this.gridReload();
    },

    gridReload: function(){
        histEngn.global.searchAjaxData = {
            jSubject : $("#jSubject").val()
        }

        histEngn.mainGrid("/projectHist/getHistEngnList", histEngn.global.searchAjaxData);
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
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="histEngn.gridReload()">' +
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
                    field: "JCode",
                    title: "프로젝트 코드",
                    width: 100
                }, {
                    field: "JSubject",
                    title: "상담제목",
                    template: function(e){
                        const id = $("#regId").val();
                        var pjtNm = e.JSubject;
                        var pjtEx = pjtNm;
                        if(pjtNm.toString().length > 62){
                            pjtEx = pjtNm.toString().substring(0, 62)+ "...";
                        }
                        return "<a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Biz/Development/ProjectView.aspx?ID="+e.JNum+"' target='_blank' style='font-weight: bold'>" + pjtEx + "</a>";
                    }
                }, {
                    field: "JCompany",
                    title: "업체명",
                    width: 250
                }, {
                    field: "JWorkDate",
                    title: "수주일",
                    width: 100
                }, {
                    field: "JSendDate",
                    title: "납기예정일",
                    width: 100
                }, {
                    field: "JDate2",
                    title: "납품일",
                    width: 100
                }, {
                    field: "PJT_AMT",
                    title: "수주금액",
                    width: 100,
                    template: function(row){
                        if(row.JTotal != null && row.JTotal != ""){
                            return "<div style='text-align: right'>"+comma(row.JTotal)+"</div>";
                        }else if(row.JTax != null && row.JTax != ""){
                            return "<div style='text-align: right'>"+comma(row.JTax)+"</div>";
                        }else{
                            return 0;
                        }
                    }
                }, {
                    field: "PM",
                    title: "PM",
                    width: 60
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },
}