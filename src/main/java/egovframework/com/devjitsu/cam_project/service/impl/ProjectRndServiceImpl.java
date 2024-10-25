package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.inside.employee.repository.EmployRepository;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectRndServiceImpl implements ProjectRndService {

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private MenuManagementService menuManagementService;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private EmployRepository employRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("empSeq", params.get("mngEmpSeq"));

        Map<String, Object> map = userRepository.getUserInfo(params);
        map.put("regEmpSeq", params.get("regEmpSeq"));
        map.put("mngCheck", "Y");
        map.put("psPrepNm", "연구책임자");

        if(!params.containsKey("pjtSn")){
            projectRndRepository.insSubjectInfo(params);
            projectRndRepository.insRndDetail2(params);
            map.put("pjtSn", params.get("pjtSn"));
            projectRndRepository.insRschData(map);
            projectRndRepository.insPjtPsRnd(map);

            /** 승인함 권한 : 회계관리자 */
            params.put("authorityGroupId", "31");
            List<Map<String, Object>> authUser = menuManagementService.getAuthorityGroupUserList(params);
            String recEmpSeq = "|";
            for(Map<String, Object> map2 : authUser){
                recEmpSeq += map2.get("EMP_SEQ") + "|";
            }

            params.put("sdEmpSeq", params.get("empSeq"));           // 요청자 사번
            params.put("SND_EMP_NM", params.get("empName"));        // 요청자 성명
            params.put("SND_DEPT_SEQ", params.get("deptSeq"));      // 요청자 부서
            params.put("SND_DEPT_NM", params.get("deptName"));      // 요청자 부서
            params.put("recEmpSeq", recEmpSeq);              // 승인자
            params.put("ntUrl", "/setManagement/projectDepositManagement.do");   // url
            params.put("frKey", params.get("pjtSn"));
            params.put("psType", "세무정보 설정");

            commonRepository.setPsCheck(params);
        } else {
            projectRndRepository.updSubjectInfo(params);
            projectRndRepository.updRndDetail2(params);
            map.put("pjtSn", params.get("pjtSn"));
            projectRndRepository.updRschData(map);
            projectRndRepository.updPjtPsRnd(map);
        }
        // 프로젝트 총괄 책임자 변경
        projectRepository.updPMInfo(params);
    }

    @Override
    public List<Map<String, Object>> getPopRschList(Map<String, Object> params) {
        return projectRndRepository.getPopRschList(params);
    }

    @Override
    public Map<String, Object> getRschData(Map<String, Object> params) {
        return projectRndRepository.getRschData(params);
    }

    @Override
    public void setRschData(Map<String, Object> params) {
        projectRndRepository.insRschData(params);
    }

    @Override
    public List<Map<String, Object>> getPjtRschInfo(Map<String, Object> params) {
        return projectRndRepository.getPjtRschInfo(params);
    }

    @Override
    public int getRschCount(Map<String, Object> params) {
        return projectRndRepository.getRschCount(params);
    }

    @Override
    public void delRschData(Map<String, Object> params) {
        projectRndRepository.delRschData(params);
    }

    @Override
    public void updRschStatus(Map<String, Object> params) {
        projectRndRepository.updRschStatus(params);
    }

    @Override
    public void setDevPjtVer(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();

        list = projectRepository.getPsList(params);

        projectRndRepository.insDevPjtVer(params);

        for(Map<String, Object> map : list){
            params.put("psRow", map.get("PS_ROW"));
            params.put("psPrep", map.get("PS_PREP"));
            params.put("psPrepNm", map.get("PS_PREP_NM"));
            params.put("psNm", map.get("PS_NM"));
            params.put("psStrDe", map.get("PS_STR_DE"));
            params.put("psEndDe", map.get("PS_END_DE"));
            params.put("psEmpSeq", map.get("PS_EMP_SEQ"));
            params.put("psEmpNm", map.get("PS_EMP_NM"));
            params.put("regEmpSeq", map.get("REG_EMP_SEQ"));

            projectRepository.insPjtPs(params);
        }
    }

    @Override
    public void setDevInfo(Map<String, Object> params) {
        projectRndRepository.updDevInfo(params);
    }

    @Override
    public List<Map<String, Object>> getRndDevScheduleList(Map<String, Object> params) {
        return projectRndRepository.getRndDevScheduleList(params);
    }

    @Override
    public void setDevSchData(Map<String, Object> params) {
        projectRndRepository.insDevSchData(params);
    }

    @Override
    public List<Map<String, Object>> getRndDevJobList(Map<String, Object> params) {
        return projectRndRepository.getRndDevJobList(params);
    }

    @Override
    public void setDevJobInfo(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR) {

        if(!params.containsKey("devSchSn")){
            Map<String, Object> map = new HashMap<>();

            map = projectRndRepository.getDevJobData(params);

            params.put("devSchSn", map.get("DEV_SCH_SN"));
        }

        projectRndRepository.updDevJobInfo(params);


        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "devSchJob");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("devSchSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getDevSchInfo(Map<String, Object> params) {
        return projectRndRepository.getDevSchInfo(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;

    }

    @Override
    public Map<String, Object> getRndDetail(Map<String, Object> params) {
        return projectRndRepository.getRndDetail(params);
    }

    @Override
    public Map<String, Object> getRndFileList(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();

        params.put("fileCd", "unRnd");
        params.put("contentId", params.get("pjtSn"));
        resultMap.put("bsPlanFile", commonRepository.getFileList(params));

        params.put("contentId", "agreement_" + params.get("pjtSn"));
        resultMap.put("agreementFile", commonRepository.getFileList(params));

        params.put("contentId", "etc_" + params.get("pjtSn"));
        resultMap.put("etcFile", commonRepository.getFileList(params));

        return resultMap;
    }

    @Override
    public void setRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectRndRepository.insRndDetail(params);
        } else {
            projectRndRepository.updRndDetail(params);
        }
        projectRndRepository.delAccountInfo(params);
        projectRndRepository.updPjtSepRnd(params);
        if(params.containsKey("sbjSep") && params.get("sbjSep").toString().equals("Y")) {
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>() {
            }.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile[] bsPlanFileList = request.getFiles("bsPlanFileList").toArray(new MultipartFile[0]);
        MultipartFile[] agreementFileList = request.getFiles("agreementFileList").toArray(new MultipartFile[0]);
        MultipartFile[] etcFileList = request.getFiles("etcFileList").toArray(new MultipartFile[0]);

        params.put("menuCd", "unRnd");

        /* 사업계획서 첨부파일 */
        if(bsPlanFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(bsPlanFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        /* 협약서 첨부파일 */
        if(agreementFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(agreementFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "agreement_" + params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        /* 기타 첨부파일 */
        if(etcFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(etcFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "etc_" + params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        projectRepository.delCustomBudget(params);
        Gson gson = new Gson();
        List<Map<String, Object>> list = gson.fromJson((String) params.get("customBudget"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(list.size() > 0){
            for(Map<String, Object> cbMap : list){
                projectRepository.insCustomBudget(cbMap);
            }
        }

        Map<String, Object> pjtMap = projectRepository.getProjectData(params);
        if(pjtMap.get("SBJ_SEP") != null){
            if(pjtMap.get("SBJ_SEP").toString().equals("Y")){
                projectRndRepository.updRndTotResCost(params);
            }else{
                projectRndRepository.updRndTotResCost2(params);
            }
        }
    }

    @Override
    public void setDelvApprove(Map<String, Object> params) {
        projectRepository.updTmpProjectCode(params);
    }

    @Override
    public void setReqPartRateData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        if(!params.containsKey("partRateSn") || params.containsKey("type")){
            projectRndRepository.insReqPartRateData(params);
        } else {
            projectRndRepository.updReqPartRateData(params);
        }


        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "rndPartRate");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("partRateSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getReqPartRateData(Map<String, Object> params) {
        return projectRndRepository.getReqPartRateData(params);
    }

    @Override
    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        params.put("contentId", params.get("PART_RATE_SN"));
        params.put("fileCd", "rndPartRate");

        return commonRepository.getFileList(params);
    }

    @Override
    public void setPartRateRequest(Map<String, Object> params) {
        projectRndRepository.setPartRateRequest(params);

        Map<String, Object> map = projectRndRepository.getReqPartRateData(params);

        map.put("pjtSn", map.get("PJT_SN"));
        int partRateCnt = projectRndRepository.getPartRateVerCount(map);

        if(partRateCnt == 0){
            map.put("REQ_SORT", "신규");
        }else{
            map.put("REQ_SORT", "변경");
        }
        
        map.put("partRateCnt", partRateCnt);
        map.put("PART_RATE_VER", (partRateCnt + 1));
        map.put("EMP_NAME", params.get("empName"));
        map.put("EMP_SEQ", params.get("empSeq"));
        map.put("JOIN_MEM_NM", params.get("joinMemNm"));
        map.put("JOIN_MEM_SN", params.get("joinMemberSn"));

        /*Map<String, Object> verMap = projectRndRepository.getPartRateVerBerData(map);
        if(verMap != null){
            if("".equals(map.get("JOIN_MEM_SN"))){
                map.put("JOIN_MEM_SN", verMap.get("JOIN_MEM_SN"));
            } else {
                map.put("JOIN_MEM_SN", verMap.get("JOIN_MEM_SN") + "," + map.get("JOIN_MEM_SN"));
            }
        }

        if("".equals(map.get("JOIN_MEM_NM"))){
            map.put("JOIN_MEM_NM", verMap.get("JOIN_MEM_NM"));
        } else {
            map.put("JOIN_MEM_NM", verMap.get("JOIN_MEM_NM") + "," + map.get("JOIN_MEM_NM"));
        }*/

        projectRndRepository.insReqPartRateVerData(map);

        projectRndRepository.insPartRateDetBef(map);

        setPsCheck(params, "32", "/inside/participationRateList.do", "참여율요청", map.get("partRateVerSn").toString());
    }

    @Override
    public List<Map<String, Object>> getReqPartRateVerList(Map<String, Object> params) {
        return projectRndRepository.getReqPartRateVerList(params);
    }

    @Override
    public List<Map<String, Object>> getAccountInfo(Map<String, Object> params) {
        return projectRndRepository.getAccountInfo(params);
    }

    @Override
    public List<Map<String, Object>> getChangeList(Map<String, Object> params) {
        return projectRndRepository.getChangeList(params);
    }
    @Override
    public Map<String, Object> getChangeOne(Map<String, Object> params) {
        return projectRndRepository.getChangeOne(params);
    }

    @Override
    public void setPartRateDetail(Map<String, Object> params) {
        projectRndRepository.insPartRateDetail(params);
        projectRndRepository.updPartRateVer(params);
    }

    @Override
    public void checkPartRateDetail(Map<String, Object> params) {
        projectRndRepository.delPartRateDetail(params);
    }

    @Override
    public void setReqPartRateStatus(Map<String, Object> params) {
        projectRndRepository.updReqPartRateStatus(params);
        projectRndRepository.updReqPartRateVerToReqPartRate(params);

        /** 참여율 변경 설정완료시 사업별 참여율 설정 삭제 */
        if(params.containsKey("partRateVer")){
            List<Map<String, Object>> checkList = employRepository.getBusnPartRatePay(params);

            if(!checkList.isEmpty()){
                employRepository.delBusnPartRatePay(params);
            }
        }

        setPsAppr(params, params.get("partRateVerSn").toString());
    }

    @Override
    public Map<String, Object> getPjtDevSchData(Map<String, Object> params) {
        return projectRndRepository.getPjtDevSchData(params);
    }

    @Override
    public void tmpUpdDevPlanApprove(Map<String, Object> params) {
        projectRndRepository.tmpUpdDevPlanApprove(params);
    }

    @Override
    public void delPjtPsRnd(Map<String, Object> params) {
        projectRndRepository.delPjtPsRnd(params);
    }

    @Override
    public void insPjtPsRnd(Map<String, Object> params) {
        Map<String, Object> map = userRepository.getUserInfo(params);
        params.put("EMP_SEQ", map.get("EMP_SEQ"));
        params.put("EMP_NAME_KR", map.get("EMP_NAME_KR"));
        params.put("psPrepNm", "참여인력");
        projectRndRepository.insPjtPsRnd(params);
    }

    @Override
    public void updateRndDelvDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pjtSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateRndDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndDelvFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndDelvApprStat(params);
        }

        if("10".equals(docSts) || "50".equals(docSts)){
            /** STEP1. pjtSn 으로 rndData 호출 */
            Map<String, Object> rndMap = projectRndRepository.getRndDetail(params);

            /** STEP2. rndData 에서 RND_FILE_SN 있으면 update */
            if (rndMap != null && !rndMap.isEmpty()) {
                if(rndMap.containsKey("RND_FILE_SN") && rndMap.get("RND_FILE_SN") != null){
                    params.put("fileNo", rndMap.get("RND_FILE_SN").toString());
                    projectRepository.setFileDocNm(params);
                }
            }

            params.put("fileCd", "unRnd");
            params.put("contentId", params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }

            params.put("contentId", "agreement_" + params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }

            params.put("contentId", "etc_" + params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }
        }

        /** 승인함 */
        if("100".equals(docSts) || "101".equals(docSts)){
            /** 상신자 정보 조회 */
            Map<String, Object> result = approvalRepository.getDraftEmpSeq(params);

            params.put("authorityGroupId", "28");
            List<Map<String, Object>> authUser = menuManagementService.getAuthorityGroupUserList(params);
            String recEmpSeq = "|";
            for(Map<String, Object> map : authUser){
                recEmpSeq += map.get("EMP_SEQ") + "|";
            }

            params.put("sdEmpSeq", result.get("DRAFT_EMP_SEQ"));           // 요청자 사번
            params.put("SND_EMP_NM", result.get("DRAFT_EMP_NAME"));        // 요청자 성명
            params.put("SND_DEPT_SEQ", result.get("DRAFT_DEPT_SEQ"));      // 요청자 부서
            params.put("SND_DEPT_NM", result.get("DRAFT_DEPT_NAME"));      // 요청자 부서
            params.put("recEmpSeq", recEmpSeq);              // 승인자
            params.put("ntUrl", "/setManagement/projectCorpMng.do");   // url
            params.put("frKey", approKey);
            params.put("psType", "프로젝트 수주승인요청");

            commonRepository.setPsCheck(params);
        }
    }

    @Override
    public void updateRndDevDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("devSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateRndDevApprStat(params);
        }else if("20".equals(docSts)) { // 중간 결재
            projectRndRepository.updateRndDevApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndDevApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndDevFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndDevApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP0. devSn 으로 pjtSn 호출 */
            Map<String, Object> pjtMap = projectRepository.getPjtSnToDev(params);
            params.put("pjtSn", pjtMap.get("PJT_SN"));
            /** STEP1. pjtSn 으로 rndData 호출 */
            Map<String, Object> rndMap = projectRndRepository.getRndDetail(params);

            /** STEP2. rndData 에서 RND_FILE_SN 있으면 update */
            if (rndMap != null && !rndMap.isEmpty()) {
                if(rndMap.containsKey("RND_FILE_SN") && rndMap.get("RND_FILE_SN") != null){
                    params.put("fileNo", rndMap.get("RND_FILE_SN").toString());
                    projectRepository.setFileCopy(params);
                }
            }
        }
    }

    @Override
    public void updateRndResDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pjtSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateRndResApprStat(params);

            /** STEP1. pjtSn 으로 resultData 호출 */
            Map<String, Object> resultMap = projectRepository.getResultInfo(params);

            /** STEP2. resultData 에서 DSGN_FILE_SN, PROD_FILE_SN 있으면 update */
            if (resultMap != null && !resultMap.isEmpty()) {
                params.put("contentId", "prjEngnRs_" + resultMap.get("RS_SN"));
                params.put("fileCd", "engnRsFile");

                for(Map<String, Object> fMap : commonRepository.getFileList(params)) {
                    params.put("fileNo", fMap.get("file_no"));
                    projectRepository.setResultFileDocNm(params);
                }
            }

        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndResFinalApprStat(params);

            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            crmRepository.insCrmEngnHist(pjtMap);

            projectRndRepository.updRndProjectInfoRes(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndResApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 rndData 호출 */
            Map<String, Object> rndMap = projectRndRepository.getRndDetail(params);

            /** STEP2. rndData 에서 RND_FILE_SN 있으면 update */
            if (rndMap != null && !rndMap.isEmpty()) {
                if(rndMap.containsKey("RND_FILE_SN") && rndMap.get("RND_FILE_SN") != null){
                    params.put("fileNo", rndMap.get("RND_FILE_SN").toString());
                    projectRepository.setFileCopy(params);
                }
            }

            /** STEP1. pjtSn 으로 psMap 호출 */
            Map<String, Object> psPrepMap = projectRepository.getPsPrepInfo(params);

            /** STEP2. psPrepMap 에서 psFile1List ~ psFile6List 있으면 update */
            if(psPrepMap != null && !psPrepMap.isEmpty()) {
                params.put("psFileSn", psPrepMap.get("PS_FILE_SN").toString());
                List<Map<String, Object>> psFile1List = projectRepository.getPsFile1(params);
                List<Map<String, Object>> psFile2List = projectRepository.getPsFile2(params);
                List<Map<String, Object>> psFile3List = projectRepository.getPsFile3(params);
                List<Map<String, Object>> psFile4List = projectRepository.getPsFile4(params);
                List<Map<String, Object>> psFile5List = projectRepository.getPsFile5(params);
                List<Map<String, Object>> psFile6List = projectRepository.getPsFile6(params);

                if(psFile1List.size() > 0){
                    for(Map<String, Object> data : psFile1List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile2List.size() > 0){
                    for(Map<String, Object> data : psFile2List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile3List.size() > 0){
                    for(Map<String, Object> data : psFile3List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile4List.size() > 0){
                    for(Map<String, Object> data : psFile4List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile5List.size() > 0){
                    for(Map<String, Object> data : psFile5List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile6List.size() > 0){
                    for(Map<String, Object> data : psFile6List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
            }

            /** STEP1. pjtSn 으로 resultData 호출 */
            /*Map<String, Object> resultMap = projectRepository.getResultInfo(params);*/

            /** STEP2. resultData 에서 DSGN_FILE_SN, PROD_FILE_SN 있으면 update */
            /*if (resultMap != null && !resultMap.isEmpty()) {
                if(resultMap.containsKey("DEV_FILE_SN")){
                    params.put("fileNo", resultMap.get("DEV_FILE_SN").toString());
                    projectRepository.setResultFileDocNm(params);
                }
            }*/

            /** STEP1. pjtSn 으로 purcFile 호출 */
            /*List<Map<String, Object>> purcFiles = purcRepository.getProjectReqFile(params);*/

            /** STEP2. purcFile에 데이터 있으면 update */
            /*for(Map<String, Object> data : purcFiles){
                data.put("docId", params.get("docId"));
                projectRepository.setPurcFileDocNm(data);
            }*/
        }
    }

    @Override
    public void updateChangeDocState(Map<String, Object> bodyMap, int num) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pjtChSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        params.put("num", num);

        /*if("10".equals(docSts)) { // 상신
            projectRndRepository.insChangeInfo(params);
        }*/

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateChangeApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateChangeApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateChangeFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateChangeApprStat(params);
        }
    }

    @Override
    public void updateRateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("partRateVerSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateRateApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRateApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRateFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRateApprStat(params);
        }
    }

    @Override
    public void delDevSch(Map<String, Object> params) {
        projectRndRepository.delDevSch(params);
    }

    @Override
    public void carryoverApp(Map<String, Object> params) {
        projectRndRepository.carryoverApp(params);
    }

    private void setPsCheck(Map<String, Object> params, String menuGroupId, String url, String type, String pk) {
        /** 승인함 */
        params.put("authorityGroupId", menuGroupId);
        List<Map<String, Object>> authUser = menuManagementService.getAuthorityGroupUserList(params);
        String recEmpSeq = "|";
        for(Map<String, Object> map : authUser){
            recEmpSeq += map.get("EMP_SEQ") + "|";
        }

        params.put("sdEmpSeq", params.get("regEmpSeq"));           // 요청자 사번
        params.put("SND_EMP_NM", params.get("regEmpName"));        // 요청자 성명
        params.put("SND_DEPT_SEQ", params.get("regOrgnztId"));      // 요청자 부서
        params.put("SND_DEPT_NM", params.get("regOrgnztNm"));      // 요청자 부서
        params.put("recEmpSeq", recEmpSeq);              // 승인자
        params.put("ntUrl", url);   // url
        params.put("frKey", pk);
        params.put("psType", type);

        commonRepository.setPsCheck(params);
    }

    private void setPsAppr(Map<String, Object> params, String pk) {
        /** 승인함 승인 */
        params.put("type", "참여율요청");
        params.put("frKey", pk);
        campusRepository.updPsStatus(params);
    }

    @Override
    public void insChangeInfo(Map<String, Object> params) {
        projectRndRepository.insChangeInfo(params);
    }
}

