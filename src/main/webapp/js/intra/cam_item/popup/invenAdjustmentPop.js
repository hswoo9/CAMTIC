var invenAdjust = {
    
    global : {
    },
    
    fn_defaultScript : function(){
        const invenSn = $("#invenSn").val();

        var data = customKendo.fn_customAjax("/item/getItemInvenAdjustList.do", {invenSnArr : invenSn}).list;

        var inx = 0;
        for(var i = 0; i < data.length; i++){
            invenAdjust.addRow(data[i], inx);
            inx++;
        }

        $(".k-textbox").kendoTextBox();
    },

    addRow : function(e, inx){
        var html = "";

        html = "" +
            '<tr>' +
                '<td>' +
                    '<input type="text" id="whCdNm' + inx + '" class="whCdNm k-input k-textbox" value="' + e.WH_CD_NM + '" disabled>' +
                    '<input type="hidden" id="masterSn' + e.MASTER_SN + '" class="masterSn" value="' + e.MASTER_SN + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + inx + '" class="itemName k-input k-textbox" value="'+ e.itemName +'" disabled>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="currentInven' + inx + '" class="currentInven k-input k-textbox" style="text-align: right" value="'+ e.currentInven +'" disabled>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="actualInven' + inx + '" class="k-input k-textbox actualInven" style="text-align: right" value="'  + e.actualInven +'" oninput="invenAdjust.numericInput(event,'+inx+')">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="diffInven' + inx + '" class="diffInven k-input k-textbox" style="text-align: right" value="' + (e.currentInven - e.actualInven) +'" disabled>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="invenAjm' + inx + '" class="invenAjm k-input k-textbox" style="text-align: right" value="'+  e.invenAjm+'" oninput=\'invenAdjust.onlyNumber(this)\' >' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="invenAjmNote' + inx + '" class="invenAjmNote k-input k-textbox" value="'+ e.invenAjmNote +'">' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);
    },

    numericInput: function(event, inx) {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = inputValue;
    invenAdjust.fn_calInven(inx);
    },

    fn_calInven : function(inx){
        $("#diffInven"+inx).val(Number($("#currentInven"+inx).val()) - Number($("#actualInven"+inx).val()));

        $("#invenAjm"+inx).val(Number($("#diffInven"+inx).val()) * -1);
    },

    fn_save : function() {

        if(!confirm("저장하시겠습니까?")){return false;}

        var adjustArr = [];
        var index = 0;
        var empSeq = $("#empSeq").val() || '1';


        $("#listTb tr").each(function(){
            var masterSn = $(this).find(".masterSn").val();
            var actualInven = $(this).find("#actualInven"+index).val();
            var invenAjm = $(this).find("#invenAjm"+index).val();
            var invenAjmNote = $(this).find("#invenAjmNote"+index).val();

            var data = {
                masterSn : masterSn,
                actualInven : actualInven,
                invenAjm : invenAjm,
                invenAjmNote : invenAjmNote,
                empSeq : empSeq
            };

            adjustArr.push(data);
            index++;
        });

        customKendo.fn_customAjax("/item/setItemInvenAdjust.do", {adjustArr : JSON.stringify(adjustArr)});

        alert("재고조정 저장이 완료되었습니다.");
        opener.gridReload();
        window.close();
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    onlyNumber: function(e) {
        e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '').replace(/[.]/g, '');
    }
}
