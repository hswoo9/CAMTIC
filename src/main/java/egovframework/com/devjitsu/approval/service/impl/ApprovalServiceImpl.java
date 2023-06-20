package egovframework.com.devjitsu.approval.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.approval.repository.ApprovalUserRepository;
import egovframework.com.devjitsu.approval.service.ApprovalService;
import egovframework.com.devjitsu.system.repository.CommonCodeRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.ConvertUtil;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.formManagement.repository.FormManagementRepository;
import egovframework.com.devjitsu.user.service.UserService;
import org.apache.commons.collections4.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class ApprovalServiceImpl implements ApprovalService {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalServiceImpl.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ApprovalUserRepository approvalUserRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private CommonCodeRepository commonCodeRepository;

    @Autowired
    private FormManagementRepository formManagementRepository;

    @Override
    public Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params) {
        return approvalRepository.getLinkageProcessDocInterlock(params);
    }

    @Override
    public Map<String, Object> getDeptDocNum(Map<String, Object> params) {
        if(StringUtils.isEmpty(approvalRepository.getApprovalDocNoChk(params)) && !params.get("type").equals("temp")){
            Map<String, Object> docNumMap = approvalRepository.getDeptDocNum(params);
            params.put("docNo", docNumMap.get("docNo"));
            approvalRepository.setDeptDocNumUpd(docNumMap);
        }

        return params;
    }

    @Override
    public int getIsExistsAbsent(Map<String, Object> params) {
        return approvalRepository.getIsExistsAbsent(params);
    }

    @Override
    public void setDocApproveRouteReadDt(Map<String, Object> params) {
        approvalRepository.setDocApproveRouteReadDt(params);
    }

    @Override
    public Map<String, Object> getDocInfoApproveRoute(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> docInfo = approvalRepository.getDocInfo(params);
        params.put("fileNo", docInfo.get("ATFILE_SN"));

        result.put("templateFile", commonRepository.getApprovalDocHwpFile(params));

        List<Map<String, Object>> receiverList = approvalRepository.getDocReceiverAll(params);
        List<Map<String, Object>> readerList = approvalRepository.getDocReaderAll(params);

        if(docInfo.get("DOC_GBN").equals("001")){
            result.put("receiverAll", receiverList);
        }
        result.put("readerAll", readerList);

        String displayReceiverName = "";
        String displayReaderName = "";

        for(Map<String, Object> map : receiverList){
            if(map.get("SEQ_TYPE").equals("u")){
                displayReceiverName += ", " + map.get("RECEIVER_EMP_NAME") + "(" + map.get("RECEIVER_DUTY_NAME") + ")";
            }else{
                displayReceiverName += ", " + map.get("RECEIVER_DEPT_NAME");
            }
        }

        for(Map<String, Object> map : readerList){
            if(map.get("SEQ_TYPE").equals("u")){
                displayReaderName += ", " + map.get("READER_EMP_NAME") + "(" + map.get("READER_DUTY_NAME") + ")";
            }else{
                displayReaderName += ", " + map.get("READER_DEPT_NAME");
            }
        }

        result.put("approveRoute", approvalRepository.getDocApproveAllRoute(params));
        result.put("referencesAll", approvalRepository.getDocReferencesAll(params));

        result.put("displayReceiverName", displayReceiverName == "" ? "" : displayReceiverName.substring(2));
        result.put("displayReaderName", displayReaderName == "" ? "" : displayReaderName.substring(2));

        result.put("docContent", docInfo.get("DOC_CONTENT"));
        docInfo.remove("DOC_CONTENT");
        result.put("docInfo", docInfo);

        return result;
    }

    @Override
    public Map<String, Object> getDocApproveNowRoute(Map<String, Object> params) {
        List<String> absentUserList = new ArrayList<>();
        String absentUserEmpSeq = getAbsentUserQuery(params);
        if(!StringUtils.isEmpty(absentUserEmpSeq)){
            if(absentUserEmpSeq.indexOf(",") > -1){
                absentUserList = Arrays.asList(absentUserEmpSeq.split(","));
            }else{
                absentUserList.add(absentUserEmpSeq);
            }
        }

        Map<String, Object> result = approvalRepository.getDocApproveNowRoute(params);
        if(!MapUtils.isEmpty(result) || absentUserList.size() > 0) {
            if(absentUserList.size() > 0){
                for (String s : absentUserList) {
                    if (!MapUtils.isEmpty(result)){
                        if(result.get("APPROVE_EMP_SEQ").equals(Integer.parseInt(s))){
                            result.put("SUB_APPROVAL", "Y");
                        }else{
                            result.put("SUB_APPROVAL", "N");
                        }
                    }
                }
            }else{
                result.put("SUB_APPROVAL", "N");
            }
        }else{
            result = new HashMap<>();
            result.put("SUB_APPROVAL", "N");
        }

        return result;
    }

    @Override
    public Map<String, Object> getDocApprovePrevRoute(Map<String, Object> params) {
        List<String> absentUserList = new ArrayList<>();
        String absentUserEmpSeq = getAbsentUserQuery(params);
        if(!StringUtils.isEmpty(absentUserEmpSeq)){
            if(absentUserEmpSeq.indexOf(",") > -1){
                absentUserList = Arrays.asList(absentUserEmpSeq.split(","));
            }else{
                absentUserList.add(absentUserEmpSeq);
            }
        }

        Map<String, Object> result = approvalRepository.getDocApprovePrevRoute(params);
        if(!MapUtils.isEmpty(result) || absentUserList.size() > 0) {
            if(absentUserList.size() > 0){
                for (String s : absentUserList) {
                    if (!MapUtils.isEmpty(result)){
                        if(result.get("APPROVE_EMP_SEQ").equals(Integer.parseInt(s))){
                            result.put("SUB_APPROVAL", "Y");
                        }else{
                            result.put("SUB_APPROVAL", "N");
                        }
                    }
                }
            }else{
                result.put("SUB_APPROVAL", "N");
            }
        }else{
            result = new HashMap<>();
            result.put("SUB_APPROVAL", "N");
        }

        return result;
    }

    @Override
    @Transactional
    public void setApproveDocInfo(Map<String, Object> params, String base_dir) throws IOException {
        params = setDocInfo(params, base_dir);

        if(params.get("linkageType").equals("2")){
            linkageProcessSend(params);
        }
    }

    @Override
    public void setDocReaderReadUser(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("batchDocReadArr"))){
            StringBuilder deptPathQuery = new StringBuilder();
            deptPathQuery = getDeptPathQuery(params);
            params.put("deptPathQuery", deptPathQuery.toString());

            /** 문서의 열람자에 내가 포함 되는지 */
            int userDocReadUserChk = approvalRepository.getUserDocReadUserChk(params);
            if(userDocReadUserChk != 0){
                int docReaderUserCnt = approvalRepository.setDocReaderReadCnt(params);
                if(docReaderUserCnt > 0){
                    approvalRepository.setDocReaderUserReadDtUpd(params);
                }else{
                    approvalRepository.setDocReaderUser(params);
                }
            }
        }else{
            Gson gson = new Gson();
            List<Map<String, Object>> batchDocReadArr = gson.fromJson((String) params.get("batchDocReadArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
            for(Map<String, Object> map : batchDocReadArr){
                StringBuilder deptPathQuery = new StringBuilder();
                deptPathQuery = getDeptPathQuery(map);
                map.put("deptPathQuery", deptPathQuery.toString());

                /** 문서의 열람자에 내가 포함 되는지 */
                int userDocReadUserChk = approvalRepository.getUserDocReadUserChk(map);
                if(userDocReadUserChk != 0){
                    int docReaderUserCnt = approvalRepository.setDocReaderReadCnt(map);
                    if(docReaderUserCnt > 0){
                        approvalRepository.setDocReaderUserReadDtUpd(map);
                    }else{
                        approvalRepository.setDocReaderUser(map);
                    }
                }
            }
        }
    }

    @Override
    public Map<String, Object> getByApproveCmCodeInfo(Map<String, Object> params) {
        String cmCodeNm = params.get("cmCodeNm") == null ? "" : params.get("cmCodeNm").toString();

        Map<String, Object> returnMap = new HashMap<>();
        if(cmCodeNm == ""){
            if(params.get("subApproval").equals("Y")){
                if(params.get("lastApproveEmpSeq").equals(params.get("nowApproveEmpSeq")) && params.get("nowApproveType").equals("2")){
                    cmCodeNm = "finalType1Approve";
                }else if(params.get("lastApproveEmpSeq").equals(params.get("nowApproveEmpSeq")) && params.get("nowApproveType").equals("0")){
                    cmCodeNm = "finalApprove";
                }else{
                    cmCodeNm = "approve";
                }
            }else{
                if(params.get("lastApproveEmpSeq").equals(params.get("loginEmpSeq")) && params.get("nowApproveType").equals("2")){
                    cmCodeNm = "finalType1Approve";
                }else if(params.get("lastApproveEmpSeq").equals(params.get("loginEmpSeq")) && params.get("nowApproveType").equals("0")){
                    cmCodeNm = "finalApprove";
                }else{
                    cmCodeNm = "approve";
                }
            }
        }

        params.put("cmCodeNm", cmCodeNm);
        returnMap.putAll(commonCodeRepository.getCmCodeInfo(params));
        return returnMap;
    }

    @Override
    @Transactional
    public void setDocApproveNReturn(Map<String, Object> params, String base_dir) throws IOException {
        // 결재문서 파일 저장
        setDocApproveNReturnDataFileUpd(params, base_dir);
        linkageProcessSend(params);
    }

    private Map<String, Object> setDocInfo(Map<String, Object> params, String base_dir){
        Map<String, Object> draftUser = userService.getUserInfo(params);

        //결재상태 공통코드
        if(params.get("type").equals("temp") || params.get("type").equals("draft")){
            Map<String, Object> cmCodeMap = commonCodeRepository.getCmCodeInfo(params);
            params.put("approveStatCode", cmCodeMap.get("CM_CODE"));
            params.put("approveStatCodeDesc", cmCodeMap.get("CM_CODE_NM"));
        }

        //결재문서 정보 저장
        if(!StringUtils.isEmpty(params.get("lastApproveEmpSeq"))){
            if(params.get("type").equals("draft") || params.get("approversRouteChange").equals("Y")){
                Map<String, Object> lastApproveInfo = approvalRepository.getApproveUserInfo(params.get("lastApproveEmpSeq").toString());
                params.put("lastApproveEmpName", lastApproveInfo.get("EMP_NAME"));
                params.put("lastApprovePositionName", lastApproveInfo.get("POSITION_NAME"));
                params.put("lastApproveDutyName", lastApproveInfo.get("DUTY_NAME"));
            }
        }

        if((params.get("type").equals("draft") && StringUtils.isEmpty(params.get("docId"))) || (params.get("type").equals("temp") && StringUtils.isEmpty(params.get("docId")))) {
            params.put("draftEmpSeq", draftUser.get("EMP_SEQ"));
            params.put("draftEmpName", draftUser.get("EMP_NAME_KR"));
            params.put("draftDeptSeq", draftUser.get("DEPT_SEQ"));
            params.put("draftDeptName", draftUser.get("DEPT_NAME"));
            params.put("draftPositionName", draftUser.get("POSITION_NAME"));
            params.put("draftDutyName", draftUser.get("DUTY_NAME"));

            approvalRepository.setApproveDocInfo(params);
        }else{
            approvalRepository.setReferDocInfoStatUp(params);
        }

        // 결재문서 HWP 형식 파일 저장
        Map<String, Object> approveDocFileSaveMap = new HashMap<>();
        if(!EgovStringUtil.nullConvert(params.get("docHWPFileData")).equals("")){
            ConvertUtil convertUtil = new ConvertUtil();
            String prevFile = approvalRepository.getApproveDocFileInfo(params);

            approveDocFileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docHWPFileData")), "hwp", params, base_dir, prevFile);

            if((params.get("type").equals("draft") || params.get("type").equals("temp")) && StringUtils.isEmpty(params.get("atFileSn"))) {
                commonRepository.insOneFileInfo(approveDocFileSaveMap);
                params.put("fileNo", approveDocFileSaveMap.get("file_no"));
                approvalRepository.setApproveFileDocIdUpD(params);

                approvalRepository.setApproveDocFileUpD(params);
            }else{
                approveDocFileSaveMap.put("fileNo", params.get("atFileSn"));
                commonRepository.updOneFileInfo(approveDocFileSaveMap);
            }
        }

        if(StringUtils.isEmpty(params.get("docOpt"))){
            approvalRepository.setApproveDocOpt(params);
        }else{
            approvalRepository.setApproveDocOptUpd(params);
        }

        /** 상신자 결재유형 조회 Tyep == 1 자기전결 */
        if(params.get("draftUserApproveType").equals("2")){
            Map<String, Object> docInfoMap = approvalRepository.getDocInfo(params);
            docInfoMap.put("cmCodeNm", "finalType1Approve");

            Map<String, Object> approveType1CodeMap = commonCodeRepository.getCmCodeInfo(docInfoMap);
            docInfoMap.put("draftUserApproveCode", approveType1CodeMap.get("CM_CODE"));
            docInfoMap.put("draftUserApproveCodeDesc", approveType1CodeMap.get("CM_CODE_NM"));

            params.put("draftDocInfo", docInfoMap);
        }else{
            params.put("draftUserApproveCode", params.get("approveStatCode"));
            params.put("draftUserApproveCodeDesc", params.get("approveStatCodeDesc"));
        }

        int draftUserApproveRouteId = setDocInfoApproveLine(params, draftUser);

        if(params.containsKey("draftDocInfo")){
            Map<String, Object> draftDocInfo = (Map<String, Object>) params.get("draftDocInfo");
            draftDocInfo.put("draftUserApproveRouteId", draftUserApproveRouteId);
            params.put("draftDocInfo", draftDocInfo);
        }

        return params;
    }

    @Override
    public List<Map<String, Object>> getDocAttachmentList(Map<String, Object> params) {
        List<Map<String, Object>> returnMap = approvalRepository.getDocAttachmentList(params);

        if(!StringUtils.isEmpty(params.get("approKey"))){
            Map<String, Object> fileSearchMap = new HashMap<>();
            String approKey = params.get("approKey").toString();
            fileSearchMap.put("step", approKey.split("_")[0]);
            fileSearchMap.put("id", approKey.split("_")[1]);
            returnMap.addAll(approvalRepository.getDocAttachmentListForSys(fileSearchMap));
        }

        return returnMap;
    }

    private void linkageProcessSend(Map<String, Object> params) throws IOException {
        approvalRepository.setLinkageProcessDocInterlockUpd(params);

        String urlStr = formManagementRepository.getLinkageProcess(params);

        /** 연동 시스템 없으면 패스 */
        if(urlStr != null && urlStr != ""){
            String parameter = "approKey=" + params.get("approKey") + "&approveStatCode=" + params.get("approveStatCode");

            if(!StringUtils.isEmpty(params.get("DOC_ID"))){
                parameter += "&docId=" + params.get("DOC_ID");
            }else{
                parameter += "&docId=" + params.get("docId");
            }

            if(!StringUtils.isEmpty(params.get("docTitle"))){
                parameter += "&docTitle=" + params.get("docTitle");
            }

            if(!StringUtils.isEmpty(params.get("formName"))){
                parameter += "&formName=" + params.get("formName");
            }

            if(!StringUtils.isEmpty(params.get("empSeq"))){
                parameter += "&empSeq=" + params.get("empSeq");
            }

            if(!StringUtils.isEmpty(params.get("rmk"))){
                parameter += "&rmk=" + params.get("rmk");
            }

            if(!StringUtils.isEmpty(params.get("approveEmpSeq"))){
                parameter += "&approveEmpSeq=" + params.get("approveEmpSeq");
            }

            if(!StringUtils.isEmpty(params.get("prevPurcId"))){
                parameter += "&prevPurcId=" + params.get("prevPurcId");
            }

            if(!StringUtils.isEmpty(params.get("prevPurcChangeId"))){
                parameter += "&prevPurcChangeId=" + params.get("prevPurcChangeId");
            }

            if(!StringUtils.isEmpty(params.get("prevPurcPayId"))){
                parameter += "&prevPurcPayId=" + params.get("prevPurcPayId");
            }

            if(!StringUtils.isEmpty(params.get("prevPurcInspId"))){
                parameter += "&prevPurcInspId=" + params.get("prevPurcInspId");
            }

            if(!StringUtils.isEmpty(params.get("purcGroupId"))){
                parameter += "&purcGroupId=" + params.get("purcGroupId");
            }

            if(!StringUtils.isEmpty(params.get("purcPlanId"))){
                parameter += "&purcPlanId=" + params.get("purcPlanId");
            }

            if(!StringUtils.isEmpty(params.get("processId"))){
                parameter += "&processId=" + params.get("processId");
            }

            if(!StringUtils.isEmpty(params.get("compSeq"))){
                parameter += "&compSeq=" + params.get("compSeq");
            }

            if(!StringUtils.isEmpty(params.get("exnpType"))){
                parameter += "&exnpType=" + params.get("exnpType");
            }

            /** URL url = new URL("http://localhost:8080"+ urlStr); */
            /** 서버 url */
//            URL url = new URL("http://127.0.0.1:8010"+ urlStr);
//            URL url = new URL("http://127.0.0.1:5959"+ urlStr);
            URL url = new URL("http://127.0.0.1"+ urlStr);
//             URL url = new URL("http://localhost:8080"+ urlStr);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            OutputStream out = conn.getOutputStream();
            out.write(parameter.getBytes("utf-8"));
            out.close();

            int code = conn.getResponseCode();

            System.out.println("응답코드 : "+ code);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        }
    }

    private int setDocInfoApproveLine(Map<String, Object> params, Map<String, Object> draftUser){
        /** 결재라인 리스트 */
        Gson gson = new Gson();
        List<Map<String, Object>> approversRouteList = gson.fromJson((String) params.get("approversArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

        /** 결재문서 결재라인 저장
         * (임시저장 후 상신 오류로 주석)
         * */
        if(/*!params.get("type").equals("draft") && */!StringUtils.isEmpty(params.get("approversRouteChange"))){
            if(params.get("approversRouteChange").equals("Y")){
                approvalRepository.setReferDocApproveRouteDel(params);
            }
        }

        for(Map<String, Object> approve : approversRouteList){
            Map<String, Object> approveInfo = approvalRepository.getApproveUserInfo(approve.get("approveEmpSeq").toString());
            approve.put("approveEmpName", approveInfo.get("EMP_NAME"));
            approve.put("approveDeptName", approveInfo.get("DEPT_NAME"));
            approve.put("approvePositionName", approveInfo.get("POSITION_NAME"));
            approve.put("approveDutyName", approveInfo.get("DUTY_NAME"));
            approve.put("empSeq", draftUser.get("EMP_SEQ"));

            //결재 상태 코드
            if(approve.get("approveOrder").equals("0")){
                approve.put("approveStatCode", params.get("approveStatCode"));
                approve.put("approveStatCodeDesc", params.get("approveStatCodeDesc"));
            }

            if((params.get("type").equals("draft") || params.get("type").equals("temp")) && StringUtils.isEmpty(params.get("docId"))){
                approve.put("docId", params.get("DOC_ID"));
                approvalRepository.setDocApproveRoute(approve);
            }else{
                approve.put("docId", params.get("docId"));
                if(params.get("approversRouteChange").equals("Y")) {
                    approvalRepository.setDocApproveRoute(approve);
                }else{
                    approvalRepository.setReferDocApproveRouteUp(approve);
                }
            }
        }

        /** 참조문서, 수신자, 열람자 모두 삭제 후 재 저장 */
        if(!params.get("type").equals("draft")){
            approvalRepository.setDocReferencesDel(params);
            approvalRepository.setDocReceiverDel(params);
            approvalRepository.setDocReaderDel(params);
        }

        /** 참조문서 저장 (기존에 참조문서 있을 시 참조문서 모두 삭제 후 재 저장 */
        if(!StringUtils.isEmpty(params.get("referencesArr"))) {
            List<Map<String, Object>> referencesList = gson.fromJson((String) params.get("referencesArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

            for (Map<String, Object> references : referencesList) {
                if (StringUtils.isEmpty(params.get("docId"))) {
                    references.put("docId", params.get("DOC_ID"));
                } else {
                    references.put("docId", params.get("docId"));
                }
                references.put("empSeq", draftUser.get("EMP_SEQ"));
                approvalRepository.setDocReferences(references);
            }
        }

        /** 수신자 저장 */
        if(!StringUtils.isEmpty(params.get("receiversArr"))) {
            List<Map<String, Object>> receiverList = gson.fromJson((String) params.get("receiversArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

            for(Map<String, Object> receiver : receiverList){
                if(StringUtils.isEmpty(params.get("docId"))){
                    receiver.put("docId", params.get("DOC_ID"));
                }else{
                    receiver.put("docId", params.get("docId"));
                }
                receiver.put("empSeq", draftUser.get("EMP_SEQ"));
            }

            approvalRepository.setDocReceiver(receiverList);
        }

        /** 열람자 저장 */
        if(!StringUtils.isEmpty(params.get("readersArr"))) {
            List<Map<String, Object>> readersList = gson.fromJson((String) params.get("readersArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());

            for(Map<String, Object> reader : readersList){
                if(StringUtils.isEmpty(params.get("docId"))){
                    reader.put("docId", params.get("DOC_ID"));
                }else{
                    reader.put("docId", params.get("docId"));
                }
                reader.put("empSeq", draftUser.get("EMP_SEQ"));

            }

            approvalRepository.setDocReader(readersList);
        }


        return approvalRepository.getApproveRouteId(params);
    }

    private void setDocApproveNReturnDataFileUpd(Map<String, Object> params, String base_dir){
        setApprovalDocFileDelAndUpd(params, base_dir);

        approvalRepository.setDocInfoStatUp(params);

        approvalRepository.setDocApproveRouteUp(params);

        if(params.get("approveStatCode").equals("101")){
            List<Map<String, Object>> noApproveList = approvalRepository.getDocApproveType2List(params);

            Map<String, Object> noApproveCodeMap = new HashMap<>();
            noApproveCodeMap.put("cmCodeNm", "noApprove");
            noApproveCodeMap = commonCodeRepository.getCmCodeInfo(noApproveCodeMap);

            for(Map<String, Object> map : noApproveList){
                map.put("approveStatCodeDesc", noApproveCodeMap.get("CM_CODE_NM"));
                map.put("approveStatCode", noApproveCodeMap.get("CM_CODE"));
                map.put("approveOpin", "전결처리로 인해 결재안함");
                approvalRepository.setDocApproveRouteNoApproveUp(map);
            }
        }
    }

    private void setApprovalDocFileDelAndUpd(Map<String, Object> params, String base_dir){
        Map<String, Object> approveDocFileSaveMap = new HashMap<>();
        if(!EgovStringUtil.nullConvert(params.get("docHWPFileData")).equals("")){
            ConvertUtil convertUtil = new ConvertUtil();
            String prevFile = approvalRepository.getApproveDocFileInfo(params);
            approveDocFileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docHWPFileData")), "hwp", params, base_dir, prevFile);
            approveDocFileSaveMap.put("fileNo", params.get("atFileSn"));

            if(!StringUtils.isEmpty(params.get("type")) && params.get("type").equals("cancel")){
                approveDocFileSaveMap.put("empSeq", params.get("approveEmpSeq"));
            }else{
                if(params.containsValue("subApproval")){
                    if(params.get("subApproval").equals("Y")){
                        approveDocFileSaveMap.put("empSeq", params.get("approveEmpSeq"));
                    }else{
                        approveDocFileSaveMap.put("empSeq", params.get("proxyApproveEmpSeq"));
                    }
                }
            }

            commonRepository.updOneFileInfo(approveDocFileSaveMap);
        }
    }

    /** 대결자 추출 */
    private String getAbsentUserQuery(Map<String, Object> paramMap) {
        String np307 = "";
        try {
//            np307 = CommonCodeUtil.getOptionValue(EgovStringUtil.isNullToString(paramMap.get("groupSeq")), EgovStringUtil.isNullToString(paramMap.get("compSeq")), "np307");
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        paramMap.put("np307", np307);
        StringBuilder absentUserQuery = new StringBuilder();
        String absentUserEmpSeq = "";
//        absentUserQuery.append("\n SELECT '" + paramMap.get("empSeq") + "' AS C_UIUSERKEY , '" + paramMap.get("deptSeq") + "' AS C_OIORGCODE FROM DUAL");
//        if (np307.equals("2")) {
//            List<Map<String, Object>> empDeptList = approvalUserRepository.getEmpDeptList(paramMap);
//            for (int j = 0; j < empDeptList.size(); j++) {
//                absentUserQuery.append("\n UNION ALL");
//                absentUserQuery.append("\n SELECT  '" + ((Map)empDeptList.get(j)).get("EMP_SEQ") + "' AS C_UIUSERKEY , '" + ((Map)empDeptList.get(j)).get("DEPT_SEQ") + "' AS C_OIORGCODE FROM DUAL");
//            }
//        }
        List<Map<String, Object>> absentUserList = approvalUserRepository.getAbsentUserList(paramMap);
        for (int i = 0; i < absentUserList.size(); i++) {
            absentUserEmpSeq += "," + absentUserList.get(i).get("C_UIUSERKEY");
            absentUserQuery.append("\n SELECT  '" + ((Map)absentUserList.get(i)).get("C_UIUSERKEY") + "' AS C_UIUSERKEY , '" + ((Map)absentUserList.get(i)).get("C_OIORGCODE") + "' AS C_OIORGCODE FROM DUAL");
        }
        return absentUserEmpSeq == "" ? "" : absentUserEmpSeq.substring(1);
    }

    /** 열람자 추출 */
    private StringBuilder getDeptPathQuery(Map<String, Object> params) {
        List<Map<String, Object>> list = approvalUserRepository.getDeptPathList(params);
        StringBuilder deptPathQuery = new StringBuilder();
        deptPathQuery.append("\n SELECT  'u' AS GBN_ORG , '" + params.get("groupSeq") + "' AS GROUP_SEQ, '" + params.get("compSeq") +
                "' AS COMP_SEQ, '" + params.get("deptSeq") + "' AS DEPT_SEQ, '" + params.get("empSeq") + "' AS EMP_SEQ   FROM DUAL");
        for (int i = 0; i < list.size(); i++) {
            deptPathQuery.append("\n UNION ALL");
            deptPathQuery.append("\n SELECT  '" + ((Map)list.get(i)).get("GBN_ORG") + "' AS GBN_ORG , '" + ((Map)list.get(i)).get("GROUP_SEQ") +
                    "' AS GROUP_SEQ, '" + ((Map)list.get(i)).get("COMP_SEQ") + "' AS COMP_SEQ, '" + ((Map)list.get(i)).get("DEPT_SEQ") +
                    "' AS DEPT_SEQ, '" + ((Map)list.get(i)).get("EMP_SEQ") + "' AS EMP_SEQ   FROM DUAL");
        }

        return deptPathQuery;
    }


}
