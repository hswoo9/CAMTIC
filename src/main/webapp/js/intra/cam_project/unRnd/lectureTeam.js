const lectureTeam = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        if($("#pjtUnitSn").val() != ""){
            this.fn_dataSet();
        }
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["lectureName", "crmNm"]);
        customKendo.fn_textArea(["unitObj"]);

        /** 사업구분 drop box */
        ub.fn_projectTypeSet();

        /** 교육기간 date picker */
        lectureTeam.fn_dateSet();

        var result = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#pjtSn").val()});
        var data = result.rs;

        $("#unitBusnStrDt").val(data.PJT_STR_DT);
        $("#unitBusnEndDt").val(data.PJT_END_DT);

        var html = "";
        $("#unitBusnBody").html(html);
        html += '' +
            '<tr id="tr'+0+'" len="0" class="crmTr">' +
            '   <td>1</td>' +
            '   <td>' +
            '       <input type="text" id="crmNm0" disabled style="width: 80%"/>' +
            '       <input type="hidden" id="crmSn0" />' +
            '       <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeam.fn_popCamCrmList(0)">' +
            '           조회' +
            '       </button>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="busnAmt0" style="text-align: right" value="0" onkeyup="lectureTeam.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />' +
            '   </td>' +
            '   <td>' +
            '       <button type="button" id="addBtn0" class="k-button k-button-solid-base" onclick="lectureTeam.addBtn()">추가</button>' +
            '   </td>' +
            '</tr>';

        $("#unitBusnBody").append(html);

        customKendo.fn_textBox(["crmNm0", "busnAmt0"]);
    },

    addBtn : function(){
        var i = Number($("#unitBusnBody").find("tr").last().attr("len")) + 1;

        var html = "";
        html += '' +
            '<tr id="tr'+i+'" len="'+i+'" class="crmTr">' +
            '   <td>'+(i+1)+'</td>' +
            '   <td>' +
            '       <input type="text" id="crmNm'+i+'" disabled style="width: 80%" />' +
            '       <input type="hidden" id="crmSn'+i+'" />' +
            '       <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeam.fn_popCamCrmList('+i+')">' +
            '           조회' +
            '       </button>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="busnAmt'+i+'" style="text-align: right" value="0" onkeyup="lectureTeam.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />' +
            '   </td>' +
            '   <td style="display: flex;">' +
            '       <button type="button" id="addBtn0" class="k-button k-button-solid-base" onclick="lectureTeam.addBtn()">추가</button>' +
            '       <button type="button" id="addBtn'+i+'" class="k-button k-button-solid-error" onclick="lectureTeam.delBtn(this)">삭제</button>' +
            '   </td>' +
            '</tr>';

        $("#unitBusnBody").append(html)

        customKendo.fn_textBox(["crmNm" + i, "busnAmt" + i]);
    },

    delBtn : function(obj){
        $(obj).closest("tr").remove();
    },

    inputNumberFormat : function (obj){
        obj.value = lectureTeam.comma(lectureTeam.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_dateSet: function(){
        customKendo.fn_datePicker("unitBusnStrDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("unitBusnEndDt", 'month', "yyyy-MM-dd", new Date());
        $("#unitBusnStrDt").on("change", function(){
            if($(this).val() > $("#unitBusnEndDt").val()){
                $("#unitBusnEndDt").val($(this).val());
            }
        });
        $("#unitBusnEndDt").on("change", function(){
            if($(this).val() < $("#unitBusnStrDt").val()){
                $("#unitBusnStrDt").val($(this).val());
            }
        });
        $("#unitBusnStrDt, #unitBusnEndDt").attr("readonly", true);
    },

    fn_dataSet: function(){
        const data = {
            pjtUnitSn: $("#pjtUnitSn").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getPjtUnitData", data);
        const map = result.map;
        const ls = result.list;

        $("#projectType").data("kendoDropDownList").value(map.PJT_SN);

        $("#lectureName").val(map.LEC_NM);

        $("#unitBusnStrDt").val(map.STR_DT);
        $("#unitBusnEndDt").val(map.END_DT);

        $("#unitObj").val(map.UNIT_OBJ);

        this.fn_btnSet(map);
        var html = "";
        $("#unitBusnBody").html(html)
        for(var i = 0; i < ls.length; i++){
            var item = ls[i];
            html = '' +
                '<tr id="tr'+i+'" len="'+i+'" class="crmTr">' +
                '   <td>'+(i+1)+'</td>' +
                '   <td>' +
                '       <input type="text" id="crmNm'+i+'" value="'+item.CRM_NM+'" disabled style="width: 80%" />' +
                '       <input type="hidden" id="crmSn'+i+'" value="'+item.CRM_SN+'" />' +
                '       <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureTeam.fn_popCamCrmList('+i+')">' +
                '           조회' +
                '       </button>' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="busnAmt'+i+'" style="text-align: right" value="'+lectureTeam.comma(item.BUSN_AMT)+'" onkeyup="lectureTeam.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" />' +
                '   </td>';
                if(i == 0){
                    html += '' +
                        '   <td>' +
                        '       <button type="button" id="addBtn'+i+'" class="k-button k-button-solid-base" onclick="lectureTeam.addBtn()">추가</button>' +
                        '   </td>';
                } else {
                    html += '' +
                        '   <td>' +
                        '       <button type="button" id="addBtn'+i+'" class="k-button k-button-solid-error" onclick="lectureTeam.delBtn(this)">삭제</button>' +
                        '   </td>';
                }
                '</tr>';

            $("#unitBusnBody").append(html)

            customKendo.fn_textBox(["crmNm" + i, "busnAmt" + i]);
        }


    },

    fn_btnSet: function(lecMap){
        if(lecMap != null){
            $("#saveBtn").hide();
            $("#modBtn").show();
        }
    },

    fn_saveBtn: function(){

        if(!confirm("저장하시겠습니까?")){
            return ;
        }

        const parameters = {
            pjtSn: $("#pjtSn").val(),
            pjtType: $("#projectType").data("kendoDropDownList").value(),
            lecNm: $("#lectureName").val(),
            strDt: $("#unitBusnStrDt").val(),
            endDt: $("#unitBusnEndDt").val(),
            unitObj: $("#unitObj").val(),
            regEmpSeq: $("#regEmpSeq").val()
        }

        if($("#pjtUnitSn").val() != ""){
            parameters.pjtUnitSn = $("#pjtUnitSn").val();
        }

        /** 유효성 검사 */
        if(parameters.projectType == ""){ alert("사업구분이 선택되지 않았습니다."); return; }
        if(parameters.lectureName == ""){ alert("사업명이 작성되지 않았습니다."); return; }

        let url = "/projectUnRnd/setUnitBusnInfo";
        var itemArr = new Array()

        $.each($(".crmTr"), function(i, v){
            var idx = $(this).attr("len");


            var data = {
                busnAmt : lectureTeam.uncomma($("#busnAmt"+idx).val()),
                crmNm : $("#crmNm"+idx).val(),
                crmSn : $("#crmSn"+idx).val(),
                regEmpSeq : $("#regEmpSeq").val(),
            }

            itemArr.push(data);
        });

        parameters.itemArr = JSON.stringify(itemArr);

        $.ajax({
            url : url,
            data: parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);

                if(rs.code == 200){
                    alert("단위사업이 등록되었습니다.");
                    opener.lectList.unitMainGrid();
                    window.close();
                }
            }
        });


    },

    fn_popCamCrmList : function (idx){
        var url = "/crm/pop/popCrmList.do?idx=" + idx;
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}