<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/enaralink.js?v=${today}'/>"></script>

<style>

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">e-나라도움</h4>
            <div class="title-road">캠매니저 > e-나라도움</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="7%">
                        <col width="8%">
                        <col width="7%">
                        <col width="8%">
                        <col width="7%">
                        <col width="19%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">발의 기간</th>
                        <td>
                            <input type="text" id="fromMonth" style="width: 45%;"> ~ <input type="text" id="endMonth" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">발의부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">발의자</th>
                        <td>
                            <input type="text" id="searchValue" style="width: 90%;">
                        </td>
                        <th class="text-center th-color">전송상태</th>
                        <td>
                            <input type="text" id="status" style="width: 150px;">
                        </td>
                    </tr>
                </table>

                <div id="sendResolutionGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->


<div class="pop_wrap_dir" id="filePop" style="width:400px; display: none;">
    <div class="pop_con">
        <form id="fileForm" method="post" enctype="multipart/form-data" >
            <!-- 타이틀/버튼 -->
            <div class="btn_div mt0">
                <input type="hidden" id="FILE_ID" name="FILE_ID"  value=''/>
                <input type="hidden" id="KUKGO_STATE_YN" name="KUKGO_STATE_YN"  value=''/>
                <div class="right_div">
                    <input type="button" id = "insertFileBtn" onclick="upFile();" value="첨부파일 등록"/>
                </div>
            </div>
            <div class="btn_div mt0">
                <div class="left_div"  style="width: 120px;">
                    <h5><span id="popupTitle"></span> 첨부파일</h5>
                    <input type="hidden" id="loginEmpSeq" name="empSeq" value="${empSeq}" />
                </div>
                <div class="" style="fload : left;" id="">
                    <table id="fileDiv"></table>
                    <div class="le" id="addfileID">
                    </div>
                </div>
                <div class="">

				<span id="orgFile">
					<input type="file" id="fileID" name="fileNm" value="" onChange="getFileNm(this);" class="hidden" />
				</span>
                </div>
            </div>
        </form>
    </div>
    <div class="pop_foot">
        <div class="btn_cen pt12">
            <input type="button" class="gray_btn" value="닫기" onclick="filepopClose();"/>
        </div>
    </div><!-- //pop_foot -->
</div>


<div class="pop_wrap_dir" id="loadingPop" style="width: 443px;">
    <div class="pop_con">
        <table class="fwb ac" style="width:100%;">
            <tr>
                <td>
                    <span class=""><img src="<c:url value='/images/ico/loading.gif'/>" alt="" />  &nbsp;&nbsp;&nbsp;지출결의서 전송 진행 중입니다. </span>
                </td>
            </tr>
        </table>
    </div>
</div>


<div>
    <form id="submitPage" name="submitPage" action="/kukgoh/newResolutionSubmitPage" method="POST">
        <input type="hidden" id="submitData" name = "submitData" value=""/>
    </form>
</div>


<div class="pop_wrap_dir" id="popUp" style="width: 1000px;">
    <div class="pop_head">
        <h1>전자(세금)계산서 승인번호 입력</h1>
    </div>
    <div class="pop_con">
        <p class="tit_p mt5 mt20">전자(세금)계산서는 승인번호 전송 기준 10분~20분 후 e나라도움 연계 집행전송이 가능합니다</p>

        <div class="com_ta mt15" style="">
            <input type="hidden" id="BSNSYEAR"  />
            <input type="hidden" id="DDTLBZ_ID"  />
            <input type="hidden" id="EXC_INSTT_ID"  />

            <input type="hidden" id="GISU_DT"  />
            <input type="hidden" id="GISU_SQ"  />
            <input type="hidden" id="BG_SQ"  />
            <input type="hidden" id="LN_SQ"  />
            <input type="hidden" id="CO_CD"  />
            <div id="kukgohInvoiceInsertGrid"></div>
        </div>
    </div>
    <!-- //pop_con -->

    <div class="pop_foot">
        <div class="btn_cen pt12">
            <input type="button" class="gray_btn" id="cancle2" value="닫기" />
        </div>
    </div>
    <!-- //pop_foot -->
</div>

<script>
    enaralink.fn_defaultScript();
</script>
