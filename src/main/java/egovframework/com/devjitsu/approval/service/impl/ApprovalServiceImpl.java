package egovframework.com.devjitsu.approval.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.approval.service.ApprovalService;
import egovframework.com.devjitsu.common.repository.CommonCodeRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.ConvertUtil;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.formManagement.repository.FormManagementRepository;
import egovframework.com.devjitsu.user.service.UserService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApprovalServiceImpl implements ApprovalService {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalServiceImpl.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ApprovalRepository approvalRepository;

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
    @Transactional
    public void setApproveDocInfo(Map<String, Object> params, String base_dir) throws IOException {
        params = setDocInfo(params, base_dir);

        if(params.get("linkageType").equals("2")){
            linkageProcessSend(params);
        }
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
        /*Map<String, Object> approveDocFileSaveMap = new HashMap<>();
        if(!EgovStringUtil.nullConvert(params.get("docHWPFileData")).equals("")){
            ConvertUtil convertUtil = new ConvertUtil();
            String prevFile = approvalRepository.getApproveDocFileInfo(params);

            approveDocFileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docHWPFileData")), "hwp", params, base_dir, prevFile);
            //TODO.approveDocFileSaveMap 원인 파악 불가 나중에 해결해야함
            if((params.get("type").equals("draft") || params.get("type").equals("temp")) && StringUtils.isEmpty(params.get("atFileSn"))) {
                commonRepository.insOneFileInfo(approveDocFileSaveMap);
                params.put("fileNo", approveDocFileSaveMap.get("file_no"));
                approvalRepository.setApproveFileDocIdUpD(params);

                approvalRepository.setApproveDocFileUpD(params);
            }else{
                approveDocFileSaveMap.put("fileNo", params.get("atFileSn"));
                commonRepository.updOneFileInfo(approveDocFileSaveMap);
            }
        }*/

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
            //TODO.approveDocFileSaveMap 원인 파악 불가 나중에 해결해야함
            /*approveDocFileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docHWPFileData")), "hwp", params, base_dir, prevFile);
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
            }*/

            commonRepository.updOneFileInfo(approveDocFileSaveMap);
        }
    }


}
