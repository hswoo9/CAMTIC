<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePersonMng.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>


<style>
    table{border: 1px solid #dfdfdf;}
    table th{border: 1px solid #dfdfdf;padding:5px 0; font-size: 18px;}
    table td{border: 1px solid #dfdfdf;padding:10px 0; font-size: 15px;text-align: center;}
    .row:hover {background-color: #f5f5f5;}
</style>
</head>
<body>


<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;">학교 선택</span></h3>
        </div>

        <table class="searchTable table table-bordered mb-0">
            <tr>
                <td>
                    <div style="display: flex; justify-content: flex-start;">
                        <select name="searchCategory" id="searchCategory" style="border:1px solid #dfdfdf; width:200px; height:28px;margin-right: 15px;">
                            <option value="1">전체</option>
                            <option value="2">업체명</option>
                            <option value="3">사업자번호</option>
                        </select>
                        <input type="text" id="inputText" placeholder="검색어를 입력하세요" onkeydown="searchOnEnter(event);" style="border: 1px solid #dfdfdf; width:400px; margin-right: 15px;">
                        <button type="button" onclick="fn_searchInput()">조회</button>
                    </div>
                </td>
            </tr>
        </table>

        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="30%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>학교명</th>
                <th>사업자번호</th>
                <th>대표자</th>
            </tr>
            </thead>
            <tbody id="crmList">
            </tbody>
        </table>

    </div>
</div>


<script>
    function searchOnEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            fn_searchInput();
        }
    }

    function fn_searchInput() {
        var data = {
            nameSearch :  $("#inputText").val()
        }

        $.ajax({
            url :"/projectUnRnd/getPopCrmList",
            type:'POST',
            data:data,
            dataType:"json",
            success: function(rs){
                var html = "";

                $("#crmList").html("");
                for(var i = 0 ; i < rs.list.length ; i++) {
                    console.log(rs.list[i]);
                    html += '<tr id="row'+rs.list[i].CRM_SN +'" ondblclick="rowDblClick(' + rs.list[i].CRM_SN + ')">'
                    html += '<td>' + rs.list[i].CRM_NM + '</td>';
                    html += '<td>' + rs.list[i].CRM_NO + '</td>';
                    html += '<td>' + rs.list[i].CRM_CEO + '</td>';
                    html += '</tr>'
                }

                $("#crmList").html(html);
            },
            error:function(){
                alert("다시 시도하시기 바랍니다.");
            }
        });
    }

    function rowDblClick(crmSn){
        var data = {
            crmSn :  crmSn
        }
        $.ajax({
            url :"/projectUnRnd/getPopCrmOne",
            type:'POST',
            data:data,
            dataType:"json",
            success: function(rs){
                $("#crmSn", opener.document).val(rs.data.CRM_SN);
                $("#schoolName", opener.document).val(rs.data.CRM_NM);
                window.close();
            },
            error:function(){
                alert("다시 시도하시기 바랍니다.");
            }
        });
    }

</script>
</body>
</html>