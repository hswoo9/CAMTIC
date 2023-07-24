var rprResReq = {
    init: function(){
        rprResReq.pageSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["userText", "title"]);
        $("#detailCn, #regNum").kendoTextArea();
        let typeDataSource = [
            { text: "특허", value: "1" },
            { text: "실용신안", value: "2" },
            { text: "상표권", value: "3" },
            { text: "논문", value: "4" },
            { text: "도서", value: "5" },
            { text: "디자인권", value: "6" },
            { text: "저작권", value: "7" }
        ]
        customKendo.fn_dropDownList("iprClass", typeDataSource, "text", "value", 2);
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        $("#regDate").attr("readonly", true);
    },

    dataSet: function(inventionInfoSn){
        $("#inventionInfoSn").val(inventionInfoSn);

        if($("#inventionInfoSn").val() != ""){
            const result = customKendo.fn_customAjax("/inside/getInventionInfo", {
                inventionInfoSn: $("#inventionInfoSn").val()
            });
            const invenInfo = result.rs.info;
            const shareList = result.rs.shareList;

            $("#userSn").val(invenInfo.SHARE_SN);
            $("#userText").val(invenInfo.SHARE_NAME);
            rprResReq.useDataChange(shareList);
            $("#iprClass").data("kendoDropDownList").value(invenInfo.IPR_CLASS);
            $("#title").val(invenInfo.TITLE);
            $("#detailCn").val(invenInfo.DETAIL_CN);
            $("#regNum").val(invenInfo.REG_NUM);
        }

        $("#title").data("kendoTextBox").enable(false);
        $("#userText").data("kendoTextBox").enable(false);
        $("#iprClass").data("kendoDropDownList").enable(false);
        $("#detailCn").data("kendoTextArea").enable(false);
    },

    useDataChange: function(shareList){
        let html = "";
        html += "<table>";
        for(let i=0; i<shareList.length; i++){
            html += "<tr class='addData'>";
            html += "<input type='hidden' class='shareEmpSeq' value='"+shareList[i].EMP_SEQ+"'/>";
            html += "<th class='shareEmpName'>"+shareList[i].EMP_NAME+"</th>";
            html += "<td><input type='text' id='share"+shareList[i].EMP_SEQ+"' style='width: 80%; text-align: right' class='share' oninput='onlyNumber(this);' value='"+shareList[i].SHARE+"'/> %</td>";
            html += "</tr>";
        }
        html += "</table>";
        $("#shareTd").html(html);
        $("#shareTd .share").kendoTextBox();
        $(".shareTr").show();
    },

    saveBtn: function(){
        let userSn = $("#userSn").val();
        let userText = $("#userText").val();
        let iprClass = $("#iprClass").val();
        let iprName = $("#iprClass").data("kendoDropDownList").text();
        let title = $("#title").val();
        let detailCn = $("#detailCn").val();
        let regNum = $("#regNum").val();
        let regDate = $("#regDate").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let shareUserArr = new Array();
        $.each($('.addData'), function(i, v){
            let empSeq = $(v).find('.shareEmpSeq').val();
            let shareInfo = {
                shareEmpSeq					: $(v).find('.shareEmpSeq').val(),
                shareEmpName				: $(v).find('.shareEmpName').text(),
                share         				: $(v).find('#share'+empSeq).val()
            }
            shareUserArr.push(shareInfo);
        });

        let data = {
            rprClass: 3,
            rprName: "포상급지급 신청서",
            shareSn: userSn,
            shareName: userText,
            iprClass: iprClass,
            iprName: iprName,
            title: title,
            detailCn: detailCn,
            regNum: regNum,
            regDate: regDate,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            shareUser: JSON.stringify(shareUserArr)
        }

        if(userSn == "") { alert("발명자(저자)가 선택되지 않았습니다."); return; }
        if(iprClass == "") { alert("지식재산권 종류가 선택되지 않았습니다."); return; }
        if(title == "") { alert("지식재산권 명칭이 작성되지 않았습니다."); return; }
        if(detailCn == "") { alert("주요내용이 작성되지 않았습니다."); return; }
        if(!confirm("포상급지급 신청을 진행하시겠습니까?")){
            return;
        }
        rprResReq.setRprResultInsert(data);

    },

    setRprResultInsert: function(data){
        $.ajax({
            url : "/inside/setRprResultInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                $("#inventionInfoSn").val(result.inventionInfoSn);
                $("#rprResDraftFrm").one("submit", function() {
                    const url = "/popup/inside/approvalFormPopup/rprResApprovalPop.do";
                    const name = "_self";
                    const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                    window.open(url, name, option);
                    this.action = "/popup/inside/approvalFormPopup/rprResApprovalPop.do";
                    this.method = 'POST';
                    this.target = '_self';
                }).trigger("submit");
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    searchRprPop : function() {
        const url = "/Inside/pop/searchRprPop.do";
        const name = "searchRprPop";
        const option = "width=800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },
}