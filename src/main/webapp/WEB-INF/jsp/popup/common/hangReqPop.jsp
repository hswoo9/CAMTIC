<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="bgVal" value="${params.bgVal}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">예산비목 [항]</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="fn_saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;" onsubmit="return false;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th>코드</th>
                    <td>
                        <input type="text" id="hangCd" style="width:90%" value=""/>
                    </td>
                    <th>분류명</th>
                    <td>
                        <input type="text" id="hangNm" style="width:90%" value=""/>
                    </td>
                </tr>
                <tr>
                    <th>정부사업</th>
                    <td>
                        <input type="text" id="hangJbCd" style="width:90%" value=""/>
                    </td>
                    <th>법인운영</th>
                    <td>
                        <input type="text" id="hangBiCd" style="width:90%" value=""/>
                    </td>
                </tr>
                <tr>
                    <th>항 설명</th>
                    <td colspan="3">
                        <input type="text" id="hangCont" style="width:90%" value=""/>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div><!-- col-md-9 -->

<script>
    $(function(){
        customKendo.fn_textBox(["hangCd","hangNm","hangCont"]);

        $("#hangJbCd, #hangBiCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "직접비", value: "직접비"},
                {text: "간접비", value: "간접비"},
                {text: "인건비", value: "인건비"},
                {text: "제외", value: "제외"},
            ],
        });

        if($("#bgVal").val() == "B"){
            $("#hangJbCd").data("kendoDropDownList").value("제외");
            $("#hangBiCd").data("kendoDropDownList").value("제외");

            $("#hangJbCd").data("kendoDropDownList").enable(false);
            $("#hangBiCd").data("kendoDropDownList").enable(false);
        }

        $.ajax({
            data : {pk : $("#pk").val()},
            dataType : "json",
            type : "POST",
            url : "/common/getHangInfo",
            success : function (rs){
                var rs = rs.map;

                $("#hangCd").val(rs.HANG_CD);
                $("#hangNm").val(rs.HANG_NM);
                $("#hangCont").val(rs.HANG_CONT);
                $("#hangJbCd").data("kendoDropDownList").value(rs.HANG_JB_CD);
                $("#hangBiCd").data("kendoDropDownList").value(rs.HANG_BI_CD);
            }
        })
    });


    function fn_saveBtn(){
        var msg = "";

        if($("#pk").val() == ""){
            msg = "저장하시겠습니까?";
        } else {
            msg = "수정하시겠습니까?";
        }

        if(!confirm(msg)){
            return;
        }

        var data = {
            hangCd : $("#hangCd").val(),
            hangNm : $("#hangNm").val(),
            hangCont : $("#hangCont").val(),
            hangJbCd : $("#hangJbCd").data("kendoDropDownList").value(),
            hangBiCd : $("#hangBiCd").data("kendoDropDownList").value(),
            budgetVal : $("#bgVal").val()
        }

        if($("#pk").val() != ""){
            data.pk = $("#pk").val();
        }

        $.ajax({
            url  : "/common/setHangInfo",
            data : data,
            type : "POST",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    opener.parent.$("#hangGrid").data("kendoGrid").dataSource.read();
                    window.close();
                }
            }
        })
    }
</script>
</body>
</html>
