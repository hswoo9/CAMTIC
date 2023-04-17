<%--
  Created by IntelliJ IDEA.
  User: 정호진
  Date: 2023-04-16
  Time: 오후 8:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-widget.k-treeview {
        overflow: hidden;
    }
    #approvalLineDataTb tbody tr:hover:not(.active) {
        background-color: #ededed;
    }
    .active{
        background-color: rgb(241, 248, 255);
    }
    #treeViewDiv{
        width: auto !important;
    }
    .k-treeview .k-i-collapse:before{background: url("/images/ico/ico_organ03_open.png");content: "";}
    .k-treeview .k-i-expand:before{background: url("/images/ico/ico_organ03_close.png");content: "";}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-collapse:before{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-treeview-top.k-treeview-bot .k-i-expand:before{background: url("/images/ico/ico_organ01.png")}
    /*yh*/
    .k-treeview .k-top.k-bot .k-i-collapse{background: url("/images/ico/ico_organ01.png")}
    .k-treeview .k-top.k-bot .k-i-expand{background: url("/images/ico/ico_organ01.png")}

    .k-treeview .k-i-expand-disabled, .k-treeview .k-i-collapse-disabled {
        cursor: default
    }
    /*yh*/
    .k-treeview .k-treeview-top,
    .k-treeview .k-treeview-mid,
    .k-treeview .k-treeview-bot {
        background-image: url('/images/bg/treeview-nodes.png');
        background-repeat: no-repeat;
        margin-left: -16px;
        padding-left: 16px;
    }
    .k-treeview .k-treeview-top .k-treeview-bot{background: none; background-position: -25px -66px;}
    /*yh*/
    .k-treeview .k-item { background-image: url('/images/bg/treeview-line.png'); }
    .k-treeview .k-last { background-image: none; }
    .k-treeview .k-treeview-top { background-position: -91px 0; }
    .k-treeview .k-treeview-bot { background-position: -69px -22px; }
    .k-treeview .k-treeview-mid { background-position: -47px -44px; }
    .k-treeview .k-last .k-treeview-top { background-position: -25px -66px; }
    .k-treeview .k-group .k-last { background-position: -69px -22px; }
    .k-treeview .k-item {
        background-repeat: no-repeat;
    }
    /*yh*/
    .k-treeview .k-first {
        background-repeat: no-repeat;
        background-position: 0 16px;
    }

    .pop_head{
        height: 32px;
        position: relative;
        background: #1385db;
    }
    .pop_head h1 {
        font-size: 12px;
        color: #fff;
        line-height: 32px;
        padding-left: 16px;
    }

    #treeview{
        background: #fff;
        overflow: auto;
        font-size: 12px;
    }

    li.k-item.k-treeview-item:last-child{background:#fff;}
    li.k-item.k-treeview-item:last-child .k-treeview-mid{padding-top:2px;}
    .k-treeview-leaf.k-selected{background-color: #1984c8!important;}
    .k-treeview-leaf.k-selected.k-hover, .k-treeview-leaf.k-selected:hover{background-color: #1A5089!important;}
    .k-drag-clue, .k-grid-header, .k-grouping-header, .k-header, .k-menu, .k-panelbar>.k-panelbar-header>.k-link, .k-progressbar, .k-state-highlight, .k-tabstrip, .k-tabstrip-items .k-item, .k-toolbar{background-color: #E4EBF3;}
    .k-grid-content tr:last-child>td, .k-grid-content-locked tr:last-child>td{border-bottom-width: 1px;}

    .approve101{
        color: blue;
        font-size: 14px;
        vertical-align: bottom;
    }

    .approveNo{
        color: red;
        font-size: 14px;
        vertical-align: bottom;
    }
</style>
<div class="pop_wrap" id="approvalPopup">
    <div class="pop_con">
        <div class="top_box">
            <div class="table-responsive" style="border: 1px solid #dedfdf;">
                <input type="hidden" id="selectKey">
                <input type="hidden" id="appType">
                <input type="hidden" id="approvalKind">
                <input type="hidden" id="positionNm" value="${loginVO.positionNm}">
                <input type="hidden" id="dutyNm" value="${loginVO.dutyNm}">
                <input type="hidden" id="orgnztId" value="${loginVO.orgnztId}">
                <input type="hidden" id="orgnztNm" value="${loginVO.orgnztNm}">
                <input type="hidden" id="uniqId" value="${loginVO.uniqId}">
                <input type="hidden" id="name" value="${loginVO.name}">
                <table style="padding: 20px;">
                    <colgroup>
                        <col width="272px">
                        <col width="272px">
                        <col width="500px">
                    </colgroup>
                    <tr>
                        <td>
                            <div id="apprLineTabStrip" style="width: 285px;">
                                <ul>
                                    <li class="k-state-active">
                                        조직도
                                    </li>
                                </ul>
                                <div id="gridForm" style="height:447px; width: 275px;overflow: auto;border: 0px solid #dedfdf;">
                                    <div id="treeview" style="background-color:#fff;width: 300px; height: 602px; border: 0px solid #dbdbde">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="apprLineUserInfoTabStrip" style="width: 420px;">
                                <ul>
                                    <li class="k-state-active">
                                        직원 정보
                                    </li>
                                </ul>
                                <div style="height:447px;width: 410px;">
                                    <div id="userList">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="apprLineTypeTabStrip" style="width: 600px;">
                                <ul>
                                    <li class="k-state-active">
                                        승인 지정
                                    </li>
                                </ul>
                                <div>
                                    <div style="margin-top: 10px;margin-bottom: 48px;">
                                        <div style="float: left">
                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id='approve' onclick="approvelService.approveTypeChange('approve')">
                                                <span class="k-button-text">승인</span>
                                            </button>
                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id='cooperation' onclick="approvelService.approveTypeChange('cooperation')">
                                                <span class="k-button-text">협조</span>
                                            </button>
                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" id='examine' onclick="approvelService.approveTypeChange('examine')">
                                                <span class="k-button-text">검토</span>
                                            </button>
                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="approvelService.fn_approvalSend()" style="margin-left: 5px">
                                                <span class="k-button-text">승인요청</span>
                                            </button>
                                        </div>

                                        <div style="float:right;">
                                            <button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="approvelService.newFavApprove()">
                                                <span class="k-icon k-i-plus k-button-icon"></span>
                                                <span class="k-button-text">초기화</span>
                                            </button>

                                            <button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="approvelService.rowDelClick()">
                                                <span class="k-button-text">삭제</span>
                                            </button>

                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="approvelService.apprLineUpdate('up')" style='margin-left: 5px'>
                                                <span class="k-icon k-i-caret-double-alt-up k-button-icon"></span>
                                            </button>
                                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="approvelService.apprLineUpdate('down')" style="margin-left: 5px">
                                                <span class="k-icon k-i-caret-double-alt-down k-button-icon"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="addApprLineGrid" style="margin-top:10px">

                                    </div>
                                    <div id="approvalLineDataDiv" style="max-height: 306px; height:306px; overflow-y: scroll;border: 1px solid #dedfdf;" >
                                        <table class="table table-bordered" id="approvalLineDataTb" style="border:none;text-align: center;">
                                            <colgroup>
                                                <col width="6.6%">
                                                <col width="8.6%">
                                                <col width="12.8%">
                                                <col width="auto">
                                                <col width="20.3%">
                                                <col width="16.1%">
                                                <col width="12.5%">
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th class="text-center th-color">
                                                    <input type="checkbox" class="k-checkbox checkbox" name="approveChkAll" onclick="approvelService.checkProp(this);">
                                                </th>
                                                <th class="text-center th-color">순번</th>
                                                <th class="text-center th-color">이름</th>
                                                <th class="text-center th-color">부서</th>
                                                <th class="text-center th-color">직급</th>
                                                <th class="text-center th-color">직위</th>
                                                <th class="text-center th-color">요청</th>
                                            </tr>
                                            </thead>
                                            <tbody id="approvalLineDataBody">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="approvalPopupGrid" style="margin-top: 20px; width: 49%; display: inline-block;"></div>
        <%--<div id="selectApprovalEmpList" style="width: 49%; height: 639px; border: 1px solid black; display: inline-block;"></div>--%>
        <div id="selectApprovalEmpGrid" style="margin-top: 20px; width: 49%; display: inline-block;"></div>
    </div>
    <div class="pop_foot">
    </div>
</div>
<div class="pop_wrap" id="approvalType">
    <input type="hidden" id="approvalEtcEmpSeq">
    <button type="button" onclick="approvelService.fn_approvalTypeSelect('A');">승인</button>
    <button type="button" onclick="approvelService.fn_approvalTypeSelect('C');">협조</button>
    <button type="button" onclick="approvelService.fn_approvalTypeSelect('E');">검토</button>
</div>
<script>
    /*var datas = JSON.parse('${data}');*/
    approvelService.fn_defaultScript();
</script>

