var finPerm = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        let data = {}
        data.deptLevel = 2;
        const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        finPerm.fn_searchData();


    },

    fn_searchData : function(){
        $("#engnGrid").css("display", "none");

        var parameters = {
            year : $("#year").val(),
            deptSeq : $("#dept").val()
        }
        var rs = customKendo.fn_customAjax("/cam_achieve/getAllPjtCalc", parameters);

        var result = rs.map;
        $("#expEngnAmt").text(comma(result.expEngnAmt));
        $("#expRndAmt").text(comma(result.expRndAmt));
        $("#engnDelvAmt").text(comma(result.engnAmt));
        $("#rndDelvAmt").text(comma(result.rndAmt));

        $("#rndSaleAmt").text(comma(result.saleRndAmt || 0));
        $("#engnSaleAmt").text(comma(result.saleEngnAmt || 0));

        $("#expSaleEngnAmt").text(comma(result.expSaleEngnAmt || 0));
        $("#expSaleRndAmt").text(comma(result.expSaleRndAmt || 0));

        $("#rndIncpAmt").text(comma(result.incpRndAmt || 0));
        $("#engnIncpAmt").text(comma(result.incpEngnAmt || 0));

        $("#expIncpEngnAmt").text(comma(result.expIncpEngnAmt || 0));
        $("#expIncpRndAmt").text(comma(result.expIncpRndAmt || 0));

        $("#delvTotAmt").text(comma(result.engnAmt + result.rndAmt));
        $("#saleTotAmt").text(comma((result.saleRndAmt || 0) + (result.saleEngnAmt || 0)));
        $("#incpTotAmt").text(comma((result.incpRndAmt || 0) + (result.incpEngnAmt || 0)));

        $("#expTotAmt").text(comma((result.expEngnAmt || 0) + (result.expRndAmt || 0)));
        $("#expSaleTotAmt").text(comma((result.expSaleEngnAmt || 0) + (result.expSaleRndAmt || 0)));
        $("#expIncpTotAmt").text(comma((result.expIncpEngnAmt || 0) + (result.expIncpRndAmt || 0)));
    },

    fn_engnSearch : function (){
        $("#engnGrid").css("display", "block");

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/cam_achieve/getEngnList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.year = $("#year").val();
                    data.deptSeq = $("#dept").val();

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


        let totAmt = 0;
        let delvTotAmt = 0;
        let saleTotAmt = 0;
        let incpTotAmt = 0;

        let expTotAmt = 0;
        let expSaleTotAmt = 0;
        let expIncpTotAmt = 0;

        $("#engnGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 500,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function (){
                totAmt = 0;
                delvTotAmt = 0;
                saleTotAmt = 0;
                incpTotAmt = 0;

                expTotAmt = 0;
                expSaleTotAmt = 0;
                expIncpTotAmt = 0;
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 35
                },{
                    title: "수주/협업/이월",
                    width: 80,
                    field: "STAT_A"
                }, {
                    title: "수주일자",
                    field: "DELV_DE",
                    width: 80
                }, {
                    title: "수주일자",
                    field: "DELV_EST_DE",
                    width: 80
                }, {
                    title: "납품예정일자",
                    field: "DELV_DE",
                    width: 80
                }, {
                    title: "프로젝트명",
                    field: "PJT_NM",
                    width: 200
                }, {
                    title: "업체명",
                    field: "CRM_NM",
                    width: 100,
                    footerTemplate: "합계",
                }, {
                    title: "총 사업비",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        totAmt += e.PJT_AMT;
                        return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(totAmt)+"</div>";
                    }
                }, {
                    title: "수주액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        delvTotAmt += e.PJT_AMT;
                        return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(delvTotAmt)+"</div>";
                    }
                }, {
                    title: "매출액",
                    field: "PJT_AMT",
                    width: 100,
                    template: function(e){
                        if(e.RESULT_STATUS != 100){
                            return '<div style="text-align: right">0</div>'
                        } else {
                            saleTotAmt += e.PJT_AMT;
                            return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(saleTotAmt)+"</div>";
                    }
                }, {
                    title: "운영수익",
                    width: 100,
                    template: function(e){
                        var saleAmt = 0;

                        if(e.RESULT_STATUS == 100){
                            saleAmt = e.PJT_AMT;
                        }

                        saleAmt = (saleAmt || 0) - (e.PURC_TOT_AMT || 0) - (e.RES_EXNP_SUM || 0);

                        incpTotAmt += saleAmt;
                        return '<div style="text-align: right">'+comma(saleAmt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(incpTotAmt)+"</div>";
                    }
                }, {
                    title: "예상매출액",
                    width: 100,
                    template: function(e){
                        if(e.RESULT_STATUS != 100){
                            return '<div style="text-align: right">0</div>'
                        } else {
                            expSaleTotAmt += e.PJT_AMT;
                            return '<div style="text-align: right">'+comma(e.PJT_AMT)+'</div>'
                        }
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expSaleTotAmt)+"</div>";
                    }
                }, {
                    title: "예상운영수익",
                    width: 100,
                    template: function(e){
                        var saleAmt = 0;

                        if(e.RESULT_STATUS == 100){
                            saleAmt = e.PJT_AMT;
                        }

                        saleAmt = (saleAmt || 0) - (e.PURC_TOT_AMT || 0) - (e.RES_EXNP_SUM || 0);

                        expIncpTotAmt += saleAmt;
                        return '<div style="text-align: right">'+comma(saleAmt)+'</div>'
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(expIncpTotAmt)+"</div>";
                    }
                }, {
                    title: "전년도<br>매출액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'
                    }
                }, {
                    title: "전년도<br>수익액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'

                    }
                }, {
                    title: "차년도<br>매출액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'

                    }
                }, {
                    title: "차년도<br>수익액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: center">-</div>'
                    }
                }, {
                    title: "비고",
                    width: 100,
                    template: function(e){
                        return '';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");



    },

    fn_objSetting : function(){
        var url = "/cam_achieve/popObjSetting.do?year=" + $("#year").val() + "&deptLevel=2";

        if($("#dept").val() != ""){
            url += "&deptSeq=" + $("#dept").val();
        }

        var name = "_blank";
        var option = "width = 680, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}