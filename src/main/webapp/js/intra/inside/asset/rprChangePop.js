/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 지식재산권 리스트 - 일괄 변경(지식재산권 일괄변경)
 */

var rprChangePop = {
    fn_defaultScript: function () {

        $("#state").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "등록", value: "1" },
                { text: "출원", value: "2" },
                { text: "거절", value: "3" },
                { text: "소멸", value: "4" }
            ],
            index: 0
        });

        $("#tain").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "유지", value: "1" },
                { text: "소멸예정", value: "2" },
                { text: "소멸", value: "3" },
                { text: "유지여부 확인요망", value: "4" }
            ],
            index: 0
        });

        $("#tech").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "해당없음", value: "1" },
                { text: "이전완료", value: "2" },
                { text: "이전가능", value: "3" }
            ],
            index: 0
        });

        $("#conft").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "공개", value: "1" },
                { text: "비공개", value: "2" }
            ],
            index: 0
        });

    },

    rprChangeCheck : function(id){
        if($('input:checkbox[name="chkYn"]').is(":checked")){
            $('#'+id).val('Y');
        }else{
            $('#'+id).val('N');
        }
    },

    changeBtn : function(){

        if($("#statChkYN").val() == 'Y' && $("#state").val() == ''){
            alert("상태가 선택되지 않았습니다.");
            return;
        } else if($("#tainChkYN").val() == 'Y' && $("#tain").val() == ''){
            alert("유지여부가 선택되지 않았습니다.");
            return;
        } else if($("#techChkYN").val() == 'Y' && $("#tech").val() == ''){
            alert("기술이전이 선택되지 않았습니다.");
            return;
        } else if($("#conftChkYN").val() == 'Y' && $("#conft").val() == ''){
            alert("대외비가 선택되지 않았습니다.");
            return;
        } else if($("#statChkYN").val() == 'N' && $("#tainChkYN").val() == 'N' && $("#techChkYN").val() == 'N' && $("#conftChkYN").val() == 'N'){
            alert("체크된 항목이 없습니다.");
            return;
        }

        if(!confirm("변경하시겠습니까?")){
            return;
        }

        rprChangePop.rprAllChange();
    },

    rprAllChange : function(){
        var data = {
            statChkYN : $("#statChkYN").val(),
            tainChkYN : $("#tainChkYN").val(),
            techChkYN : $("#techChkYN").val(),
            conftChkYN : $("#conftChkYN").val(),

            stateSn : $("#state").val(),
            stateName : $("#state").data("kendoDropDownList").text(),
            tainSn : $("#tain").val(),
            tainName : $("#tain").data("kendoDropDownList").text(),
            techSn : $("#tech").val(),
            techName : $("#tech").data("kendoDropDownList").text(),
            confidentialitySn : $("#conft").val(),
            confidentialityName : $("#conft").data("kendoDropDownList").text(),
        }

        $.ajax({
            url : "/inside/updRprAllChange",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(){
                alert("일괄수정이 완료되었습니다.");
                opener.open_in_frame('/Inside/rprList.do');
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}


