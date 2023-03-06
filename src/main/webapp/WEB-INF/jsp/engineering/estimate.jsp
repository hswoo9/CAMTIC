<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 5:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>

<style>
    .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
    .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
    .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}
</style>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">개발상담서 조회</h4>
        </div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table popupTable">
                    <thead>
                    <tr>
                        <th>상담일자</th>
                        <td colspan="3" style="padding:5px;">
                            <div class="input-group" style="display:flex; ">
                                <input type="text" class="form-control" placeholder="yyyy/mm/dd" id="datepicker1" style="width:100px; border-right:0;">
                                <span class="input-group-addon" style="padding-right:22px;"><i class="glyphicon glyphicon-calendar"></i></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="조영산업-FEMS구축사업" style="width:80%;"></td>
                    </tr>
                    <tr>
                        <th>예상견적가</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="" style="width:20%;">원</td>
                    </tr>
                    <tr>
                        <th>장소</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="캠틱종합기술원" style="width:50%;"></td>
                        <th>면담자</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="장수영" style="width:30%;"></td>
                    </tr>
                    <tr>
                        <th>업체코드(*)</th>
                        <td style="padding:5px;">
                            <input type="text" class="textInput" value="C200612002" style="width:30%;" disabled>
                            <button class="btn btn-primary" style="width:50px; margin:0;height:27px; line-height:0;">검색</button>
                        </td>
                        <th>소재지</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="" style="width:50%;"></td>
                    </tr>
                    <tr>
                        <th>업체명</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="주식회사 모디" style="width:30%;"></td>
                        <th>주요생산품</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="" style="width:50%;"></td>
                    </tr>
                    <tr>
                        <th>대표자</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="박현호" style="width:30%;"></td>
                        <th>우편번호</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="54969" style="width:30%;"></td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="전북 전주시 완산구 홍산2길 5-8, 3층" style="width:80%;"></td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="063-211-1140" style="width:30%;"></td>
                        <th>팩스번호</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="" style="width:30%;"></td>
                    </tr>
                    <tr>
                        <th>의뢰인</th>
                        <td style="padding:5px;">
                            <input type="text" class="textInput" value="박현호" style="width:30%;" disabled>
                            <button class="btn btn-primary" style="width:50px; margin:0;height:27px; line-height:0;">검색</button>
                        </td>
                        <th>핸드폰</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="010-4572-1010" style="width:30%;"></td>
                    </tr>
                    <tr>
                        <th>홈페이지</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="http://" style="width:50%;"></td>
                    </tr>
                    <tr>
                        <th>메일주소</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="moddi@moddi.co.kr" style="width:50%;"></td>
                    </tr>
                    <tr>
                        <th>상담내용</th>
                        <td colspan="3" style="padding:5px;"><textarea class="form-control" rows="2" placeholder="-FEMS 구축사업: 중소기업 활성화 사업 연계 프로젝트"></textarea></td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    <tr>
                        <th>이미지</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    </thead>
                </table>
                <div class="mt10" style="display:flex;justify-content: center;">
                    <button class="btn btn-quirk infoBtn">저장</button>
                    <button class="btn btn-quirk infoBtn">닫기</button>
                </div>
            </div><!-- table-responsive -->
        </div>
    </div>

    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">견적서</h4>
        </div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table popupTable">
                    <thead>
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th>상담코드</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="Dl1e32301" disabled></td>
                        <th>수신</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="주식회사 모디" disabled></td>
                        <th>작성자</th>
                        <td style="padding:5px;">
                            <input type="text" class="textInput" value="우주개발팀" style="width:30%;" disabled>
                            <input type="text" class="textInput" value="홍길동" style="width:30%;" disabled>
                            <button class="btn btn-primary" style="width:50px; margin:0;height:27px; line-height:0;">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>견적번호</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="2023-01-001" disabled></td>
                        <th>버전</th>
                        <td style="padding:5px;"><input type="text" class="textInput" value="1.0" disabled></td>
                        <th>견적가</th>
                        <td style="padding:5px;">
                            <input type="text" class="textInput" value="12,000,000" style="width:30%;">
                        </td>
                    </tr>
                    <tr>
                        <th>견적명</th>
                        <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="조영산업 - FEMS 구축사업"></td>

                        <th>견적일자</th>
                        <td style="padding:5px;">
                            <div class="input-group" style="display:flex; ">
                                <input type="text" class="form-control" placeholder="yyyy/mm/dd" id="datepicker2" style="width:100px; border-right:0;">
                                <span class="input-group-addon" style="padding-right:22px;"><i class="glyphicon glyphicon-calendar"></i></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>부가세여부</th>
                        <td colspan="5" style="padding:5px;">
                            <select id="select1" class="form-control" style="width: 100px; background-color:#fff;">
                                <option value="미포함">미포함</option>
                                <option value="포함">포함</option>
                                <option value="면세">면세</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>특이사항</th>
                        <td colspan="5" style="padding:5px;">
                            <input type="text" class="textInput" value="" style="width:100%;">
                        </td>
                    </tr>
                    </thead>
                </table>
                <div class="mt10" style="display:flex;justify-content: space-between;">
                    <div>
                        <button class="btn btn-primary" style="width:50px; margin:5px;height:27px; line-height:0;">추가</button>
                        <button class="btn btn-primary" style="width:50px; margin:0;height:27px; line-height:0;">삭제</button>
                        <button class="btn btn-warning" style="width:100px; margin:5px;height:27px; line-height:0;">Excel Upload</button>
                    </div>
                    <div>
                        <button class="btn btn-warning" style="width:150px; margin:5px;height:27px; line-height:0;">업로드 양식 다운로드</button>
                    </div>
                </div>
                <table class="table table-bordered">
                    <tr>
                        <th class="tableThSt"></th>
                        <th class="tableThSt">품명 및 규격</th>
                        <th class="tableThSt">수량</th>
                        <th class="tableThSt">단위</th>
                        <th class="tableThSt">단가(원)</th>
                        <th class="tableThSt">공급가액(원)</th>
                        <th class="tableThSt">비고</th>
                    </tr>
                    <tr>
                        <td class="tableTdSt">1</td>
                        <td class="tableTdSt">PLC 및 제어부품</td>
                        <td class="tableTdSt">1</td>
                        <td class="tableTdSt"></td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt"></td>
                    </tr>
                    <tr>
                        <td class="tableTdSt">2</td>
                        <td class="tableTdSt">SCADA 구입 및 프로그램</td>
                        <td class="tableTdSt">1</td>
                        <td class="tableTdSt"></td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt"></td>
                    </tr>
                    <tr>
                        <td class="tableTdSt">3</td>
                        <td class="tableTdSt">프로그램 및 현장설치</td>
                        <td class="tableTdSt">1</td>
                        <td class="tableTdSt"></td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt">2,880,000</td>
                        <td class="tableTdSt"></td>
                    </tr>
                </table>
                <div class="mt10" style="display:flex;justify-content: center;">
                    <button class="btn btn-quirk infoBtn">저장</button>
                    <button class="btn btn-quirk infoBtn">수정</button>
                    <button class="btn btn-quirk infoBtn">완료</button>
                    <button class="btn btn-quirk infoBtn">출력</button>
                </div>
            </div><!-- table-responsive -->
        </div>
        <div class="mt10" style="display:flex; margin-left:20px;">
            <h4>버전관리</h4>
            <button class="btn btn-primary" style="width:50px; margin:0 10px;height:27px; line-height:0;">추가</button>
            <button class="btn btn-primary" style="width:50px; margin:0;height:27px; line-height:0;">삭제</button>
        </div>

        <div class="panel-body" style="padding-top:0;">
            <div class="table-responsive">
                <table class="table table-bordered">
                    <tr>
                        <th class="tableThSt">ver</th>
                        <th class="tableThSt">견적명</th>
                        <th class="tableThSt">총견적가(원)</th>
                        <th class="tableThSt">항목수(건)</th>
                        <th class="tableThSt">등록일</th>
                        <th class="tableThSt">수정일</th>
                        <th class="tableThSt">작성자</th>
                    </tr>
                    <tr>
                        <td class="tableTdSt">1.0</td>
                        <td class="tableTdSt">조영산업 - FEMS 구축사업</td>
                        <td class="tableTdSt">12,000,000</td>
                        <td class="tableTdSt">5</td>
                        <td class="tableTdSt">2023-01-01</td>
                        <td class="tableTdSt">2023-01-01</td>
                        <td class="tableTdSt"></td>
                    </tr>
                    <tr>
                        <td class="tableTdSt">2.0</td>
                        <td class="tableTdSt">조영산업 - FEMS 구축사업_수정</td>
                        <td class="tableTdSt">12,500,000</td>
                        <td class="tableTdSt">6</td>
                        <td class="tableTdSt">2023-01-01</td>
                        <td class="tableTdSt">2023-01-01</td>
                        <td class="tableTdSt"></td>
                    </tr>
                </table>
            </div><!-- table-responsive -->
        </div>
    </div><!-- panel -->
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>