const itemApp = {

    global: {
        flag : true,
        data : ""
    },

    init: function () {
        itemApp.pageSet();
        itemApp.dataSet();
    },

    pageSet: function(){
        $("#searchDe").kendoDatePicker({
            depth: "year",
            start: "year",
            culture: "ko-KR",
            format: "yyyy-MM",
            value: new Date(),
            change: itemApp.dataSet
        });
        $("#searchDe").attr("readonly", true);
    },

    dataSet: function(){
        let data = {
            searchDe: $("#searchDe").val()
        }
        $("#title").text("["+$("#searchDe").val().split("-")[0]+"년 "+$("#searchDe").val().split("-")[1]+"월 재고현황]");

        $.ajax({
            url : "/item/getItemApprovalInfo",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                data = result.list[0];

                itemApp.global.flag = result.flag;
                itemApp.global.data = data;
                //데이터 있음
                if(result.flag == "false"){
                    $("#eqipnmApprovalSn").val(data.eqipnmApprovalSn);
                }
                //신청가능(중복없음) true
                if(result.flag == "true") {
                    $("#approvalBtn").show();
                    $("#approvalViewBtn").hide();

                    $("#statusText").text("신청가능");
                }else{
                    $("#approvalBtn").hide();
                    $("#approvalViewBtn").show();
                    if(data.STATUS == "0"){
                        $("#statusText").text("미결재");
                    }else if(data.STATUS == "10"){
                        $("#statusText").text("상신");
                    }else if(data.STATUS == "30"){
                        $("#statusText").text("반려");
                    }else if(data.STATUS == "40"){
                        $("#statusText").text("회수");
                    }else if(data.STATUS == "100"){
                        $("#statusText").text("결재완료");
                    }else {
                        return "-";
                    }
                }
            },
            error : function() {
                alert("데이터 조회 중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.");
                flag = false;
            }
        });
    },

    saveBtn: function(){
        let data = {
            searchDe: $("#searchDe").val(),
            regEmpSeq: $("#regEmpSeq").val(),
            regEmpName: $("#regEmpName").val()
        }


        if(itemApp.global.flag == "true"){
            itemApp.setItemApprovalInfo(data);
        } else {
            itemApp.itemDrafting();
        }
    },

    viewBtn:function (){

        /*$.ajax({
            url : "/item/getApprovalData",
            data : itemApp.global.data,
            type :"post",
            dataType : "json",
            success : function(rs){
                console.log(rs)
                // approveDocView(itemApp.global.data.DOC_ID)
            }
        });*/
    },

    setItemApprovalInfo: function(data){
        $.ajax({
            url : "/item/setItemApprovalInfo",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                $("#itemApprovalSn").val(result.data.itemApprovalSn);
                itemApp.itemDrafting();
            },
            error : function(e) {
                window.close();
            }
        });
    },

    itemDrafting: function() {
        $("#invenDeadLineDraftFrm").one("submit", function() {
            var url = "/item/pop/approvalFormPopup/invenDeadLineApprovalPop.do";
            var name = "invenDeadLineApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/item/pop/approvalFormPopup/invenDeadLineApprovalPop.do";
            this.method = 'POST';
            this.target = 'invenDeadLineApprovalPop';
        }).trigger("submit");
    }
}