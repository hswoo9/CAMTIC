var bustripExnpPop = {



    fn_defaultScript : function (){

        $(".empName, .oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost").kendoTextBox();

        var costData = $(".oilCost, .trafCost, .trafDayCost, .tollCost, .dayCost, .eatCost, .parkingCost, .etcCost, .totalCost");

        costData.css("text-align", "right");
        costData.val(0)
        costData.bind("keyup keydown", function(){
            bustripExnpPop.inputNumberFormat(this);

            if(this.value == ""){
                this.value = 0;
            }

            var bustExnpTb = document.getElementById('bustExnpTb');

            var rowList = bustExnpTb.rows;

            for(var i = 1 ; i < rowList.length ; i++){
                var row = rowList[i];
                var tdsNum = row.childElementCount;
                var totalCost = 0;

                for (var j = 1; j < tdsNum - 1; j++) {
                    totalCost += parseInt($(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                    console.log("j = " + j + ", " + $(row.cells[j]).find("input[type=text]").val().replace(/,/g, ""));
                }

                if(totalCost != 0){
                    $(row.cells[tdsNum - 1]).find("input[type=text]").val(bustripExnpPop.fn_comma(totalCost));
                } else {
                    $(row.cells[tdsNum - 1]).find("input[type=text]").val(0);
                }


            }
        });

        costData.bind("change", function(){

        });



    },

    inputNumberFormat: function (obj){
        obj.value = bustripExnpPop.fn_comma(obj.value);

    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    }
}