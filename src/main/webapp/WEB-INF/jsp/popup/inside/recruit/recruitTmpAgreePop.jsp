<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/camtic/application/applicationForm1.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/postcode.v2.js?autoload=false'/>"></script>
<style>
    #agreePop span {
        font-size: 14px;
    }

    .lab {
        display: flex;
        align-items: center;
    }

    .lab span {
        margin-left: auto; /* Move the span (radio buttons and labels) to the right */
        display: flex;
        align-items: center;
    }

    .lab input[type="radio"] {
        margin-left: 10px; /* Adjust the spacing between radio buttons and labels */
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px; padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">개인정보 수집 및 이용동의</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="recruitTmpAgree()">등록하기</button>
        </div>
    </div><!--card-header pop-header-->
    <form id="agreeForm" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0" id="agreePop">

            <tr>
                <td>
                    <span>
                    ■ 개인정보의 수집ㆍ이용 목적<br>
                    (사)캠틱종합기술원(이하 캠틱)은 단기 근무직원의 원활한 관리를 위하여 필요한 최소한의 범위 내에서<br>
                    개인정보를 수집하고 있습니다.
                    <br>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>
                    ■ 수집하려는 개인정보의 항목<br>
                    &nbsp&nbsp- 필수항목 : 성명, 주민등록번호, 주소, 전화번호, 휴대폰번호, 이메일, 차량정보
                    <br>
                    &nbsp&nbsp- 수집방법 : 웹사이트에 지원자가 직접 입력 및 서류제출
                    <br>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>
                    ■ 개인정보의 보유 및 이용기간<br>
                    근무과정에서 수집된 개인정보는 인사관리 및 업무추진 상 필요에 의해 영구보관 합니다.<br>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>
                    ■ 기타사항<br>
                    캠틱에서는 개인정보를 수집된 목적 범위에서 적합하게 처리하고 목적 외의 용도로 사용하지 않으며 개인정보를<br>
                    제공한 제공자는 언제나 자신이 입력한 개인정보의 열람·수정을 신청할 수 있고,<br>
                    수집된 개인정보는 개인정보보호를 위하여 암호화되어 처리됩니다.<br>
                    상기사항에 명기되지 않은 사항은 개인정보보호법 및 표준 개인정보 보호지침에 의거하여 관리합니다. <br>
                    </span>
                </td>
            </tr>

                </td>
                    </tr>

        </table>


        <div class="lab">
            <label class="__lab">
                <span style="display: inline;">개인정보 수집 및 이용에 동의합니다.</span>
                <input type="checkbox" id="chk1" name="chk" style="display: inline;" required>
            </label>
            <span>
                <input id="chkType_0" type="radio" name="chkType" value="1">
                <label for="chkType_0">위촉직원</label>
                <input id="chkType_1" type="radio" name="chkType" value="2">
                <label for="chkType_1">단기직원</label>
                <input id="chkType_2" type="radio" name="chkType" value="3">
                <label for="chkType_2">연수생/학생연구원</label>
            </span>
        </div>
    </form>
    </div>


</div><!-- col-md-9 -->
<script>
    function recruitTmpAgree(){
        if($("input[name='chk']:checked").length != 1){
            alert('개인정보 수집 및 이용 방침에 동의하세요.');
            return;
        }

        var radios = document.getElementsByName('chkType');
        var isChecked = false;
        var selectedValue = null;

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                isChecked = true;
                selectedValue = radios[i].value;
                break;
            }
        }
        if (!isChecked) {
            alert('단기직원 유형(위촉직원, 단기직원, 연수생/학생연구원)을 선택하시기 바랍니다.');
            return;
        }

        location.href = "/inside/recruitTmpForm.do?chkType="+selectedValue;

    }

</script>
</body>
