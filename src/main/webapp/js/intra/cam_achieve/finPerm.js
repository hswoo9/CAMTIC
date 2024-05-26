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
    }
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}