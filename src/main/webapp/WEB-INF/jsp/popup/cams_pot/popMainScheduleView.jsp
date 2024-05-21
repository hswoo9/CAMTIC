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

    a:hover {
        text-decoration: underline;
    }

    .pagination {
        display: inline-block;
    }

    .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
    }

    .pagination a.active {
        background-color: #00397f96;
        color: white;
        border-radius: 5px;
    }

    .pagination a:hover:not(.active) {
        background-color: #ddd;
        border-radius: 5px;
    }

    #articleListTb thead tr th{
        background-color: #00397f96;
        color: white;
        text-align: center;
    }

    .__botArea {margin-top:20px;position:relative;min-height:20px;}
    .__botArea .cen {text-align:center;}
    .__botArea .lef {position:absolute;left:0;top:0;}
    .__botArea .rig {position:absolute;right:0;top:0;}

    .__paging {font-size:0; margin-top:-15px;}
    .__paging .num {display:inline-block;box-sizing:border-box;vertical-align:top;width:25px;height:25px;line-height:22px;border:1px solid #ccc;text-align:center;color:#898989;z-index:0;margin:0 4px;position:relative;font-weight:300;font-size:12px;}
    .__paging .num:hover {border-color:#000;}
    .__paging .num.active {color:#000;font-weight:bold;background:#f7f7f7;}
    .__paging .arr {width:14px;height:25px;display:inline-block;vertical-align:middle;}
    .__paging .prev {margin-right:15px;background:url(/images/camtic/ico-prev.png) no-repeat 50% 50% / contain;}
    .__paging .next {margin-left:15px;background:url(/images/camtic/ico-next.png) no-repeat 50% 50% / contain;}

    .__sch .inp input[type='text'] {display:block;width:100%;border:none;height:34px;padding-left:10px;font-size:14px;color:#2a2a2a; border:2px solid #00397F96;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="publicClass" name="publicClass" value="${params.publicClass}">
        <input type="hidden" id="selectedDate" name="selectedDate" value="${params.selectedDate}">
        <input type="hidden" id="type" name="type" value="${params.type}">
        <input type="hidden" id="scheduleBoardId" name="scheduleBoardId" value="${rs.SCHEDULE_BOARD_ID}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">일정조회</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div id="title">
            <%--<c:choose>
                <c:when test="${rs.PUBLIC_CLASS eq 'ES'}"><h3><span>직원일정</span></h3></c:when>
                <c:otherwise><h3><span>법인일정</span></h3></c:otherwise>
            </c:choose>--%>
            </div>
            <form class="__sch" style="float:right; margin-bottom:10px;">
                <c:if test="${params.publicClass ne 'ES'}">
                    <div class="inp">
                        <input type="text" id="inputText" placeholder="검색어를 입력하세요" onkeydown="searchOnEnter(event);">
                            <%--<button type="button">검색</button>--%>
                    </div>
                </c:if>
            </form>
            <div id="scheduleContent">
                <c:choose>
                    <c:when test="${params.publicClass eq 'ES'}"><h4 style="font-size:21px;">직원일정</h4></c:when>
                    <c:otherwise><h4 style="font-size:21px;">법인일정</h4></c:otherwise>
                </c:choose>

                <table class="searchTable table table-bordered mb-0 mt10">
                    <colgroup>
                        <c:choose>
                            <c:when test="${params.publicClass eq 'ES'}">
                                <col width="7%">
                                <col width="10%">
                                <col width="15%">
                                <col width="25%">
                                <col width="25%">
                                <col width="10%">
                            </c:when>
                            <c:otherwise>
                                <col width="7%">
                                <col width="10%">
                                <col>
                                <col>
                                <col width="10%">
                                <col width="10%">
                                <col width="15%">
                                <col width="15%">
                            </c:otherwise>
                        </c:choose>
                    </colgroup>
                    <thead>
                        <tr>
                            <c:choose>
                            <c:when test="${params.publicClass eq 'ES'}">
                                <th scope="col">번호</th>
                                <th scope="col">구분</th>
                                <th scope="col">부서</th>
                                <th scope="col">팀</th>
                                <th scope="col">이름</th>
                                <th scope="col"></th>
                            </c:when>
                            <c:otherwise>
                                <th scope="col">번호</th>
                                <th scope="col">작성자</th>
                                <th scope="col">제목</th>
                                <th scope="col">내용</th>
                                <th scope="col">장소</th>
                                <th scope="col">종류</th>
                                <th scope="col">시작시간</th>
                                <th scope="col">종료시간</th>
                            </c:otherwise>
                            </c:choose>
                        </tr>
                    </thead>

                    <tbody id="tableBody">
                    </tbody>

                </table>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript">

    var firstData = fn_customAjax('/spot/getMainScheduleList', {
        recordSize : 10,
        publicClass : $("#publicClass").val(),
        selectedDate : $("#selectedDate").val(),
        type : $("#type").val()
    });

    var flag = false;

    var paginationData;
    var startPage;
    var endPage;
    var page;
    var total = firstData.articlePage.pagination.totalRecordCount;


    /** 최초의 데이터와 페이지 이동할 때의 데이터 구분 */
    function dataChk(e, f) {
        if(flag == false){
            paginationData = firstData.articlePage.pagination;
            startPage = paginationData.startPage;
            endPage = paginationData.endPage;
            page = firstData.articlePage.page;
        }else if(flag == true){
            paginationData = e.articlePage.pagination;
            startPage = paginationData.startPage;
            endPage = paginationData.endPage;
            page = e.articlePage.page;
            total = e.articlePage.pagination.totalRecordCount;
        }
    }

    var data = firstData.rs.list;
    $(function () {

        $("#totalCnt").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        drawTable(data);
    });

    /**
     * 페이지 이동
     * page : 페이지
     * recordSize : 리스트에 출력할 데이터 수
     * pageSize : 페이징 넘버 수
     * ArticlePage.java 참조
     * */
    function movePage(page){
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 10,
            pageSize: 10,
            publicClass : $("#publicClass").val(),
            selectedDate : $("#selectedDate").val(),
            type : $("#type").val()
        }
        var inputText = $("#inputText").val();
        var result = fn_customAjax("/spot/getMainScheduleList?" + new URLSearchParams(queryParams).toString() + '&recordSize=10&searchInput=' + inputText, "");
        flag = true;

        dataChk(result, flag);
        drawTable(result.rs.list);
    }

    //게시글 리스트 그리기
    function drawTable(data) {
        if (data.length == 0) {
            document.querySelector('.__paging').innerHTML = '';
            $("#totalCnt").text(0);
            $("#tableBody").html('');
            return;
        }

        $("#tableBody").html('');

        let html = "";

        let num = total + 1;
        data.forEach((item, index) => {
            num = num - 1;
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
            if($("#publicClass").val() == "ES"){
                console.log(item);
                html += '' +
                    '<tr>' +
                        '<td style="text-align: center;">'+ (num) +'</td>' +
                        '<td style="text-align: center;">' + item.schedule_TYPE + '</td>' +
                        '<td style="text-align: center;">' + item.dept_NAME.split(" ")[0] + '</td>' +
                        '<td style="text-align: center;">' + item.dept_NAME.split(" ")[1] + '</td>' +
                        '<td style="text-align: center;">' + item.reg_EMP_NAME + '</td>';
                if(item.hr_BIZ_REQ_ID != null && item.hr_BIZ_REQ_ID != ""){
                    html += '' +
                        '<td style="text-align: center;">' +
                            '<a href="javascript:void(0)" onclick="bustripDetail(' + item.hr_BIZ_REQ_ID + ');">상세보기</a>'
                        '</td>';
                }else{
                    html += '' +
                        '<td style="text-align: center;"></td>';
                }
                html += '' +
                    '</tr>'
            }else{
                var scheduleType = scheduleTypeList[item.schedule_TYPE] || article.SCHEDULE_TYPE;
                html += '<tr>'
                html += '<td style="text-align: center;">'+ (num) +'</td>';
                html += '<td style="text-align: center;">' + item.reg_EMP_NAME + '</td>';
                html += '<td>' + item.title + '</td>';
                html += '<td>' + item.schedule_CONTENT + '</td>';
                html += '<td style="text-align: center;">' + item.schedule_PLACE + '</td>';
                html += '<td style="text-align: center;">' + scheduleType + '</td>';
                html += '<td style="text-align: center;">' + item.start + '</td>';
                html += '<td style="text-align: center;">' + item.end + '</td>';
                html += '</tr>';
            }
        });
        $("#tableBody").append(html);
    }

    function searchOnEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Enter 키의 기본 동작 방지
            fn_searchInput(); // 검색 함수 호출
        }
    }

    function fn_searchInput(){
        var inputText = $("#inputText").val();
        var result = fn_customAjax('/spot/getMainScheduleList?recordSize=10&searchInput=' + encodeURI(inputText, "UTF-8"),'');

        flag = true;

        if(result.articlePage.pagination != null){
            dataChk(result);
        }
        drawTable(result.rs.list);

        $("#totalCnt").text(result.articlePage.pagination.totalRecordCount);
    }

    function fn_customAjax(url, data){
        var result;

        $.ajax({
            url : url,
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs) {
                result = rs;
                result.flag = true;
            },
            error :function (e) {
                result.flag = false;
                console.log('error : ', e);
            }
        });

        return result;
    }




    /*$(function(){
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
        }*/

    function bustripDetail(hrBizReqId){
        let url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+hrBizReqId;
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
</script>
</body>
</html>