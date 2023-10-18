<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- SheetJS CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.3/xlsx.full.min.js"></script>
<!-- FileSaver saveAs CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>
<style>
    .__galListhead{display: flex; flex-wrap: wrap; gap: 90px 26px;}
    .__galListhead .boxHead{display: block; width: calc((100% / 2) - (52px / 4)); border: 1px solid #ccc;}
    .__galListhead .boxHead .info{padding: 25px 15px 20px;}
    .__galListhead .boxHead .info .subject{font-size: 18px; line-height: 1.35; height: 2.7em; display: -webkit-box; word-wrap: break-word;
        -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; color: #252525; font-weight: 500; letter-spacing: -0.075em;}
    .__galListhead .boxHead .info .content{font-size: 15px; line-height:20px; color: #555;}

    @media (max-width: 1024px) {
        .__galListhead {gap: 10px;}
        .__galListhead .boxHead{width: calc((100% / 2) - (10px / 2));}
    }

    .__topAreaCustom {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        flex-direction: row;
        justify-content: space-between;
    }
    .__topAreaCustom .total {
        font-size: 16px;
        color: #464646;
    }
    .__topAreaCustom .total strong {
        color: #155996;
    }

    .custom-select {
	    /*appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;*/
        background: transparent;
        padding-left: 10px;
        text-align:left;
	    border: 1px solid #a1a1a1;
	    width:80px;
	    height:42px;
	    border-radius:5px;
	    font-size: 13px;
    }

    .custom-select::after {
        content: '\25BC';
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        pointer-events: none;
    }
</style>
<body>
<div id="wrap">
	<jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
	<div id="sub">
		<div class="inner">
			<jsp:include page="/WEB-INF/jsp/template/camtic/lnb.jsp" flush="false"/>
			<div id="content">

				<ul id="navigation">
					<li><a href="/camtic">홈으로</a></li>
					<li class="">홍보관</li>
					<li class="">뉴스레터</li>
					<li class="">뉴스레터 구독현황</li>
				</ul>
				<div id="title">
					<h3>뉴스레터 구독현황</h3>
				</div>

				<div class="__topAreaCustom">
					<div class="total">전체 신청자<strong><span id="totalCnt"></span></strong>명</div>

					<div>
						<%--<select class="custom-select">
							<option value="">전체</option>
							<option>구독자</option>
							<option>취소자</option>
						</select>--%>
						<button type="button" class="__btn1 grayLine" onclick="fn_excelDownload();" style="height:42px;">엑셀다운로드</button>
					</div>
				</div>

				<table class="__tblList respond1" id="countTable">
					<caption>공지사항 게시판</caption>
					<colgroup>
						<col style="width:100px;"/>
						<col style="width:100px;"/>
						<col />
						<col style="width:150px;"/>
						<col style="width:150px;"/>
						<col style="width:150px;"/>

					</colgroup>
					<thead>
					<tr>
						<th scope="col">번호</th>
						<th scope="col">성명</th>
						<th scope="col">이메일</th>
						<th scope="col">개인정보동의여부</th>
						<th scope="col">신청일</th>
						<th scope="col">취소일</th>
					</tr>
					</thead>

					<tbody id="tableBody">
					</tbody>
				</table>
				<div class="__botArea">
					<div class="cen">
						<div class="__paging">

						</div>

						<div class="rig">
							<a href="javascript:void(0);" onclick="fn_goList();" class="__btn1 blue"><span>목록</span></a>
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
	<jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<input type="hidden" id="category" value="${categoryId}" />
<script>
    var firstData = fn_customAjax('/board/getNewsSubscribeList.do?recordSize=10','');
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
        }
    }

    var data = firstData.boardArticleList.list;
    $(function () {

        $("#totalCnt").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

        dataChk();

        drawPage();
        drawTable(data);
    });

    function fn_goList() {
        location.href = '/camtic/pr/news.do';
    }

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
            pageSize: 10
        }
        var result = fn_customAjax("/board/getNewsSubscribeList.do?" + new URLSearchParams(queryParams).toString() + "&recordSize=10", "");

        flag = true;

        dataChk(result, flag);
        drawTable(result.boardArticleList.list);
        drawPage();
    }

    //게시글 리스트 그리기
    function drawTable(data) {
        //const tableBody = document.getElementById("tableBody");
        $("#tableBody").html('');

        let html = "";

        let num = total + 1;

        if(page != 1){
            num = num - ((page - 1) * 10);
        }
        data.forEach((item, index) => {
            num = num - 1;

            html += "<tr>";
            html += '<td>'+ (num) +'</td>';
            html += '<td>'+ item.applicant +'</td>';
            html += '<td>'+ item.email +'</td>';
            if(item.confirm1 == 'Y'){
                html += '<td>동의</td>';
            }else{
                html += '<td>미동의</td>';
            }
            const formattedMonth = String(item.apply_DATE.monthValue).padStart(2, '0');
            const formattedDay = String(item.apply_DATE.dayOfMonth).padStart(2, '0');
            html += '<td>'+ item.apply_DATE.year +'-'+ formattedMonth +'-'+ formattedDay +'</td>';

            if(item.cancle_DATE != null){
                const formattedMonth2 = String(item.cancle_DATE.monthValue).padStart(2, '0');
                const formattedDay2 = String(item.cancle_DATE.dayOfMonth).padStart(2, '0');
                html += '<td>'+ item.cancle_DATE.year +'-'+ formattedMonth2 +'-'+ formattedDay2 +'</td>';
            }else{
                html += '<td></td>';
            }

            html += "</tr>";
        });

        /*tableBody.innerHTML = html;*/
        $("#tableBody").append(html);
    }

    //페이징 그리기
    function drawPage(){
        let html = '';
        html += '<a href="javascript:void(0);" onclick="movePage(' + (page - 1) + ')" class="arr prev"><span class="hide">이전 페이지</span></a>';

        for (let i =startPage; i <= endPage; i++) {
            html += (i !== page)
                ? '<a href="javascript:void(0);" class="num" onclick="movePage('+i+');">'+ i +'</a>'
                : '<strong class="num active">' + i + '</strong>'
        }

        html += '<a href="javascript:void(0);" onclick="movePage(' + (page + 1) + ');" class="arr next"><span class="hide">다음 페이지</span></a>';
        $(".__paging").html(html);
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

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf); //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    }

    function fn_excelDownload(){
        // step 1. workbook 생성
        var wb = XLSX.utils.book_new();
        // step 2. 시트 만들기
        var newWorksheet = excelHandler.getWorksheet();
        // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
        XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
        // step 4. 엑셀 파일 만들기
        var wbout = XLSX.write(wb, {bookType:'xlsx', type: 'binary'});
        // step 5. 엑셀 파일 내보내기
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
    }

    var excelHandler = {
        getExcelFileName : function(){
            return 'List.xlsx';
        },
        getSheetName : function(){
            return 'Table Test Sheet';
        },
        getExcelData : function(){
            return document.getElementById('countTable');
        },
        getWorksheet : function(){
            return XLSX.utils.table_to_sheet(this.getExcelData());
        }
    }
</script>

</body>