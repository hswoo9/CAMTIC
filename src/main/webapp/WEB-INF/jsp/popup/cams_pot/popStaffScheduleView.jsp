<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .dash-left .table > tbody > tr > td{
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
    }

    .percentInput {
        text-align: right;
    }

    label{
        margin-left: 3px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="scheduleBoardId" name="scheduleBoardId" value="${rs.SCHEDULE_BOARD_ID}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">일정조회</span>
            </h3>
            <div class="btn-st popButton">
                <%--                <button type="button" class="k-button k-button-solid-info" onclick="sr.setScheduleReg()">저장</button>--%>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div id="scheduleContent">
                <table class="searchTable table table-bordered mb-0 mt10">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="20%">
                        <col width="10%">
                        <col width="10%">
                        <col width="20%">
                        <col width="20%">
                    </colgroup>
                    <thead>
                        <tr>
                          <th>작성자</th>
                          <th>제목</th>
                          <th>내용</th>
                          <th>장소</th>
                          <th>종류</th>
                          <th>시작시간</th>
                          <th>종료시간</th>
                        </tr>
                    </thead>

                    <tbody id="scheduleContentList">
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

    $(function(){
        updateScheduleContent();
    });

    function updateScheduleContent() {
        var publicClass = 'ES';

        var urlParams = new URLSearchParams(window.location.search);
        var selectedDate = urlParams.get('selectDate');

        $.ajax({
            url: '/spot/getStaffScheduleList',
            type: 'GET',
            data: {
                publicClass : publicClass,
                selectedDate : selectedDate
            },
            success: function (data) {
                drawTable(data.rs);
            },
        });
    }
        function drawTable(data) {

            $("#scheduleContentList").html('');

            let html = "";

            data.forEach((item, index) => {

                var scheduleTypeList = {
                    "EV": "행사",
                    "ME": "회의",
                    "ED": "교육",
                    "WR": "업무관련",
                    "BD": "생일",
                    "TR": "출장",
                    "HD": "휴일",
                    "OT": "기타"
                };
                var scheduleType = scheduleTypeList[item.SCHEDULE_TYPE] || article.SCHEDULE_TYPE;

                html += '<tr>'
                html += '<td>' + item.REG_EMP_NAME + '</td>';
                html += '<td>' + item.title + '</td>';
                html += '<td>' + item.SCHEDULE_CONTENT + '</td>';
                html += '<td>' + item.SCHEDULE_PLACE + '</td>';
                html += '<td>' + scheduleType + '</td>';
                html += '<td>' + item.start + '</td>';
                html += '<td>' + item.end + '</td>';
                html += '</tr>';
            });
            $("#scheduleContentList").append(html);
        }

</script>
</body>
</html>