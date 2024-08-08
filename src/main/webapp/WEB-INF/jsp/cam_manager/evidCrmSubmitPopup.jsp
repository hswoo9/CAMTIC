<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/intra/cam_mng/newResolutionSubmitPage.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<style>

    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
	.thTop{font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<input type="hidden" id="payAppDetSn" value="${params.payAppDetSn}" />

<input type="hidden" id="BSNSYEAR" />
<input type="hidden" id="DDTLBZ_ID" />
<input type="hidden" id="EXC_INSTT_ID" />
<div class="col-lg-12" style="padding:0;">
	<div class="table-responsive">
		<div class="card-header pop-header">
			<h3 class="card-title title_NM">전자(세금)계산서 승인번호 입력</h3>
			<div class="btn-st popButton">
				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
			</div>
		</div>
		<form id="sendForm" style="padding: 20px 30px;">
			<input type="hidden" name="C_DIKEYCODE" id="C_DIKEYCODE" value="${data.C_DIKEYCODE}" />
			<div style="font-weight: bold;">
				· 전자(세금)계산서는 승인번호 전송 기준 10분~20분 후 e나라도움 연계 집행전송이 가능합니다
			</div>
			<table class="popTable table table-bordered mb-0" id="">
				<colgroup>
					<col width="12%">
					<col width="12%">
					<col width="12%">
					<col width="12%">
					<col width="12%">
					<col width="30%">
					<col width="12%">
				</colgroup>
				<thead>
				<tr>
					<th class="thTop">거래처명</th>
					<th class="thTop">사업자번호</th>
					<th class="thTop">합계금액</th>
					<th class="thTop">공급가</th>
					<th class="thTop">부가세</th>
					<th class="thTop">전자(세금)계산서 번호<br><span style="color: red;">('-'를 제외한 숫자만 입력해주세요.)</span></th>
					<th class="thTop">전송결과</th>
				</tr>
				<tr>
					<td style="text-align: center;" id="trNm">

					</td>
					<td style="text-align: center;" id="regNo">

					</td>
					<td style="text-align: right;" id="sumAm">

					</td>
					<td style="text-align: right;" id="supAm">

					</td>
					<td style="text-align: right;" id="vatAm">

					</td>
					<td style="text-align: center;">
						<input style="width: 70%;" type="text" class="k-input" id="issNo" name="issNo" value="" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
						<input type="button" style="margin-left:5px;width: 20%;" class="k-button k-button-solid-base" onclick="fn_etaxSend()" value="전송">
					</td>
					<td style="text-align: center;">

					</td>
				</tr>
				</thead>
			</table>

		</form>
	</div>
</div>

<script>

    $(function(){

        var data = {
            payAppDetSn : $("#payAppDetSn").val()
        }


        $.ajax({
            url : "/kukgoh/getEtaxInfo",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                console.log(rs)
                var ed = rs.result;
                $("#trNm").text(ed.TR_NM);
                $("#regNo").text(ed.TRREG_NB);
                $("#sumAm").text(comma(ed.SUM_AM.toString().split(".")[0]));
                $("#supAm").text(comma(ed.SUP_AM.toString().split(".")[0]));
                $("#vatAm").text(comma(ed.VAT_AM.toString().split(".")[0]));
                $("#issNo").val(ed.ISS_NO);

                $("#BSNSYEAR").val(ed.BSNSYEAR);
                $("#DDTLBZ_ID").val(ed.DDTLBZ_ID);
                $("#EXC_INSTT_ID").val(ed.EXC_INSTT_ID);
            }, error : function (e){
                console.log(e);
            }
        });
    });

    function fn_etaxSend(){
        var data = {
            payAppDetSn : $("#payAppDetSn").val(),
            issNo : $("#issNo").val(),
            BSNSYEAR : $("#BSNSYEAR").val(),
            DDTLBZ_ID : $("#DDTLBZ_ID").val(),
            EXC_INSTT_ID : $("#EXC_INSTT_ID").val()
        }

        if(data.BSNSYEAR == ""){
            alert("사업 프로젝트를 설정해주세요.");
            return;
        }

        $.ajax({
            url : "/kukgoh/sendEtaxData",
            data : data,
            dataType : "json",
            type : "post",
			beforeSend : function(){
				$("#my-spinner").show();
			},
            success : function (rs){

                $.ajax({
                    url : "/kukgoh/test",
                    data: rs.reParams,
                    type : "post",
                    dataType : "json",
                    success : function (rs){
                        alert("전송이 완료되었습니다.");
						$("#my-spinner").hide();
                    }
                })
            }, error : function (e){
                console.log(e);
            }
        })
    }


</script>
</body>
</html>