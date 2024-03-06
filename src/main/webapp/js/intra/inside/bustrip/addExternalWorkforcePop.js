const externalReq = {
    init: function(){
        bustrip.fn_setPageName();
        externalReq.pageSet();
        externalReq.dataSet();
    },

    pageSet: function(){
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["belong", "spot", "name", "etc"]);
    },

    dataSet: function(){

    },

    fn_saveBtn: function(){
        const belong = $("#belong").val();
        const spot = $("#spot").val();
        const name = $("#name").val();
        const etc = $("#etc").val();

        if(name == ""){ alert("이름을 입력해주세요"); return; }

        const data = {
            belong: belong,
            spot: spot,
            name: name,
            etc: etc
        };
        externalReq.fn_makeRow(data);

        $("#belong").val("");
        $("#spot").val("");
        $("#name").val("");
        $("#etc").val("");
    },

    fn_makeRow: function(data){
        let html = '';
        html += '<tr class="addRow">';
        html += '   <td class="belong">'+data.belong+'</td>';
        html += '   <td class="spot">'+data.spot+'</td>';
        html += '   <td class="name">'+data.name+'</td>';
        html += '   <td class="etc">'+data.etc+'</td>';
        html += '   <td style="text-align: center"><button type="button" class="k-button k-button-solid-error" id="addBtn" onclick="externalReq.fn_delBtn(this);">삭제</button></td>';
        html += '</tr>';
        $("#externalThead").append(html)
    },

    fn_delBtn: function(e){
        $(e).parent().parent().remove();
    },

    fn_externalSave: function(){
        let externalArr = []

        let belongArr = "";
        let spotArr = "";
        let nameArr = "";
        let etcArr = "";

        $.each($(".addRow"), function(){
            let data = {
                belong : $(this).find(".belong").text(),
                spot : $(this).find(".spot").text(),
                name : $(this).find(".name").text(),
                etc : $(this).find(".etc").text(),
            }

            belongArr += data.belong + ",";
            spotArr += data.spot + ",";
            nameArr += data.name + ",";
            etcArr += data.etc + ",";

            externalArr.push(data);
        });

        opener.parent.externalDataSet(externalArr);
        window.close();
    },


}