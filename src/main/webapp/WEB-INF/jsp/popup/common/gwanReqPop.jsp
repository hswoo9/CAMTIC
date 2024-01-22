<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="type" value="${params.type}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="bgVal" value="${params.bgVal}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">예산비목 [관]</h3>
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
                        <input type="text" id="gwanCd" style="width:90%" value=""/>
                    </td>
                    <th>분류명</th>
                    <td>
                        <input type="text" id="gwanNm" style="width:90%" value=""/>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div><!-- col-md-9 -->

<script>
    $(function(){
        customKendo.fn_textBox(["gwanCd","gwanNm"]);

        $.ajax({
            data : {pk : $("#pk").val()},
            dataType : "json",
            type : "POST",
            url : "/common/getGwanInfo",
            success : function (rs){
                var rs = rs.map;

                $("#gwanCd").val(rs.GWAN_CD);
                $("#gwanNm").val(rs.GWAN_NM);
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
            gwanCd : $("#gwanCd").val(),
            gwanNm : $("#gwanNm").val(),
            budgetVal : $("#bgVal").val()
        }

        if($("#pk").val() != ""){
            data.pk = $("#pk").val();
        }

        $.ajax({
            url  : "/common/setGwanInfo",
            data : data,
            type : "POST",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    opener.parent.$("#gwanGrid").data("kendoGrid").dataSource.read();
                    window.close();
                }
            }
        })
    }
</script>
</body>
</html>
