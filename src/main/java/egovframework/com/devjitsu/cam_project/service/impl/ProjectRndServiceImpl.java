package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
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

    @Override
    public void setSubjectInfo(Map<String, Object> params) {

        if(!params.containsKey("pjtSn")){
            projectRndRepository.insSubjectInfo(params);
        } else {
            projectRndRepository.updSubjectInfo(params);
            projectRndRepository.delAccountInfo(params);
        }

        if(params.get("sbjSep").toString().equals("Y")){
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }
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
        projectRndRepository.insDevPjtVer(params);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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
    public void setRndDetail(Map<String, Object> params) {
        Map<String, Object> map = userRepository.getUserInfo(params);
        map.put("pjtSn", params.get("pjtSn"));
        map.put("regEmpSeq", params.get("regEmpSeq"));
        map.put("mngCheck", "Y");
        map.put("psPrepNm", "연구책임자");

        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectRndRepository.insRndDetail(params);
            projectRndRepository.insRschData(map);
            projectRndRepository.insPjtPsRnd(map);
        } else {
            projectRndRepository.updRndDetail(params);
            projectRndRepository.updRschData(map);
            projectRndRepository.updPjtPsRnd(map);
        }


        projectRepository.delCustomBudget(map);
        Gson gson = new Gson();
        List<Map<String, Object>> list = gson.fromJson((String) params.get("customBudget"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(list.size() > 0){
            for(Map<String, Object> cbMap : list){
                projectRepository.insCustomBudget(cbMap);
            }
        }


        projectRepository.updPMInfo(params);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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

        map.put("partRateCnt", partRateCnt);
        map.put("PART_RATE_VER", (partRateCnt + 1));
        map.put("EMP_NAME", params.get("empName"));
        map.put("EMP_SEQ", params.get("empSeq"));
        map.put("REQ_SORT", params.get("reqSort"));

        Map<String, Object> verMap = projectRndRepository.getPartRateVerBerData(map);
        if(verMap != null){
            if("".equals(map.get("JOIN_MEM_SN"))){
                map.put("JOIN_MEM_SN", verMap.get("JOIN_MEM_SN"));
            } else {
                map.put("JOIN_MEM_SN", verMap.get("JOIN_MEM_SN") + "," + map.get("JOIN_MEM_SN"));
            }

            if("".equals(map.get("JOIN_MEM_NM"))){
                map.put("JOIN_MEM_NM", verMap.get("JOIN_MEM_NM"));
            } else {
                map.put("JOIN_MEM_NM", verMap.get("JOIN_MEM_NM") + "," + map.get("JOIN_MEM_NM"));
            }
        }


        projectRndRepository.insReqPartRateVerData(map);

        projectRndRepository.insPartRateDetBef(map);

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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRndRepository.updateRndDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndDelvFinalApprStat(params);

            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            try{
                /** 사업비 분리 : 테이블 조회해서 데이터 없으면 단일(0)으로 생성, 있으면 for문 */
                params.put("pjtTmpCd", pjtMap.get("PJT_TMP_CD"));

                List<Map<String, Object>> list = projectRndRepository.getAccountInfo(params);

                int pjtCnt = g20Repository.getProjectCount(params);
                String pjtCd = pjtMap.get("PJT_TMP_CD").toString();
                String cntCode = String.format("%02d", (pjtCnt + 1));

                if(list.size() == 0){
                    params.put("pjtCd", pjtCd + cntCode + "0");
                    params.put("pProjectCD", params.get("pjtCd"));
                    // G20 프로젝트 추가
                    g20Repository.insProject(params);
                    projectRepository.updProjectCode(params);
                }else{
                    for(int i = 0 ; i < list.size() ; i++){
                        params.put("pProjectCD", pjtCd + cntCode + list.get(i).get("IS_TYPE"));
                        if(i == 0){
                            params.put("pjtCd", pjtMap.get("PJT_TMP_CD"));
                            projectRepository.updProjectCode(params);
                        }
                        // G20 프로젝트 추가
                        g20Repository.insProject(params);
                    }
                }
                // 결재 완료 처리
                projectRndRepository.updRndProjectInfo(params);
            } catch(Exception e){
                e.printStackTrace();
            }

            params.put("pjtStep", "R2");
            params.put("pjtStepNm", "수주보고");
            projectRepository.updProjectStep(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndDelvApprStat(params);
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRndRepository.updateRndDevApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndDevApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndDevFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndDevApprStat(params);
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRndRepository.updateRndResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndResFinalApprStat(params);
            projectRndRepository.updRndProjectInfoRes(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndResApprStat(params);
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
        params.put("pjtSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);
        params.put("num", num);

        if("10".equals(docSts)) { // 상신
            projectRndRepository.insChangeInfo(params);
        }

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
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
}

