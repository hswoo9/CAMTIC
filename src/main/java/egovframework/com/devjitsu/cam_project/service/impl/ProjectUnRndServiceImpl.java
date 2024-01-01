package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectUnRndServiceImpl implements ProjectUnRndService {

    @Autowired
    private ProjectUnRndRepository projectUnRndRepository;

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private PurcRepository purcRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        if(!params.containsKey("pjtSn")){
            projectUnRndRepository.insSubjectInfo(params);
        } else {
            projectUnRndRepository.updSubjectInfo(params);
        }
    }

    @Override
    public Map<String, Object> getUnRndDetail(Map<String, Object> params) {
        return projectUnRndRepository.getUnRndDetail(params);
    }

    @Override
    public void setUnRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        Map<String, Object> map = userRepository.getUserInfo(params);
        map.put("pjtSn", params.get("pjtSn"));
        map.put("regEmpSeq", params.get("regEmpSeq"));
        map.put("mngCheck", "Y");
        map.put("psPrepNm", "연구책임자");

        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectUnRndRepository.insUnRndDetail(params);
            projectRndRepository.insRschData(map);
            projectRndRepository.insPjtPsRnd(map);
        } else {
            projectUnRndRepository.updUnRndDetail(params);
            projectRndRepository.updRschData(map);
            projectRndRepository.updPjtPsRnd(map);
        }
        projectRndRepository.delAccountInfo(params);
        projectRndRepository.updPjtSepRnd(params);
        if(params.get("sbjSep").toString().equals("Y")) {
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>() {
            }.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }

        // 프로젝트 총괄 책임자 변경
        projectRepository.updPMInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile bsPlanFile = request.getFile("bsPlanFile");
        if(bsPlanFile != null){
            if(!bsPlanFile.isEmpty()){
                params.put("menuCd", "unRnd");
                fileInsMap = mainLib.fileUpload(bsPlanFile, filePath(params, SERVER_DIR));
                fileInsMap.put("unRndSn", params.get("unRndSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectUnRndRepository.updUnRndFileSn(fileInsMap);
            }
        }

        projectRepository.delCustomBudget(map);
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
                projectUnRndRepository.updUnRndTotResCost(params);
            }else{
                projectUnRndRepository.updUnRndTotResCost2(params);
            }
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void setDelvApprove(Map<String, Object> params) {

        try{
            projectRepository.updTmpProjectCode(params);

            /** 사업비 분리 : 테이블 조회해서 데이터 없으면 단일(0)으로 생성, 있으면 for문 */
            List<Map<String, Object>> list = projectRndRepository.getAccountInfo(params);
            int pjtCnt = g20Repository.getProjectCount(params);
            String pjtCd = params.get("pjtCd").toString();
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
                        params.put("pjtCd", params.get("pProjectCD"));
                        projectRepository.updProjectCode(params);
                    }
                    // G20 프로젝트 추가
                    g20Repository.insProject(params);
                }
            }
            // 결재 완료 처리
            projectUnRndRepository.updUnRndProjectInfo(params);
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<Map<String, Object>> getLectureTeacherList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherList(params);
    }
    @Override
    public List<Map<String, Object>> getPersonList(Map<String, Object> params) {
        return projectUnRndRepository.getPersonList(params);
    }

    @Override
    public Map<String, Object> getPersonData(Map<String, Object> params) {
        return projectUnRndRepository.getPersonData(params);
    }

    @Override
    public Map<String, Object> getPersonReqData(Map<String, Object> params) {
        return projectUnRndRepository.getPersonReqData(params);
    }

    @Override
    public Map<String, Object> getTeacherData(Map<String, Object> params) {
        return projectUnRndRepository.getTeacherData(params);
    }

    @Override
    public List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherReqList(params);
    }

    @Override
    public List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params) {
        return projectUnRndRepository.getLecturePersonReqList(params);
    }

    @Override
    public List<Map<String, Object>> getLecturePersonDupleCk(Map<String, Object> params) {
        return projectUnRndRepository.getLecturePersonDupleCk(params);
    }

    @Override
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureList(params);
    }

    @Override
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        return projectUnRndRepository.getLectureInfo(params);
    }
    @Override
    public void insLectureTeacherInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> TEACHER_LIST = gson.fromJson((String) params.get("teacherList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("teacherList", TEACHER_LIST);
        projectUnRndRepository.insLectureTeacherInfo(params);
    }
    @Override
    public void insLecturePersonInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> PERSON_LIST = gson.fromJson((String) params.get("personList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("personList", PERSON_LIST);
        projectUnRndRepository.insLecturePersonInfo(params);
    }
    @Override
    public void setLecturePersonData(Map<String, Object> params) {
        if(!params.containsKey("personSn")){
            projectUnRndRepository.insPersonData(params);
        }else{
            projectUnRndRepository.updPersonData(params);
        }
    }
    @Override
    public void setLectureTeacherData(Map<String, Object> params) {
        if(!params.containsKey("teacherSn")){
            projectUnRndRepository.insTeacherData(params);
        }else{
            projectUnRndRepository.updTeacherData(params);
        }
    }
    @Override
    public void delLecturePersonData(Map<String, Object> params) {
        projectUnRndRepository.delPersonData(params);
    }
    @Override
    public void delLectureTeacherData(Map<String, Object> params) {
        projectUnRndRepository.delTeacherData(params);
    }
    @Override
    public void insLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.insLectureInfo(params);
    }
    @Override
    public void updLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.updLectureInfo(params);
    }
    @Override
    public void updPersonApp(Map<String, Object> params) {
        projectUnRndRepository.updPersonApp(params);
    }
    @Override
    public void updPersonPartic(Map<String, Object> params) {
        projectUnRndRepository.updPersonPartic(params);
    }
    @Override
    public void updPersonAudit(Map<String, Object> params) {
        projectUnRndRepository.updPersonAudit(params);
    }
    @Override
    public void updPersonRefund(Map<String, Object> params) {
        projectUnRndRepository.updPersonRefund(params);
    }
    @Override
    public void updPersonPay(Map<String, Object> params) {
        projectUnRndRepository.updPersonPay(params);
    }
    @Override
    public void delLecturePersonInfo(Map<String, Object> params) {
        projectUnRndRepository.delLecturePersonInfo(params);
    }
    @Override
    public void delLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.delLectureInfo(params);
    }
    @Override
    public void delLectureTeacherInfo(Map<String, Object> params) {
        projectUnRndRepository.delLectureTeacherInfo(params);
    }

    @Override
    public void updateUnRndDelvDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectUnRndRepository.updateUnRndDelvFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndData = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 UN_RND_FILE_SN 있으면 update */
            if (unRndData != null && !unRndData.isEmpty()) {
                if(unRndData.containsKey("UN_RND_FILE_SN") && unRndData.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndData.get("UN_RND_FILE_SN").toString());
                    projectRepository.setFileDocNm(params);
                }
            }
        }
    }

    @Override
    public void updateUnRndDevDocState(Map<String, Object> bodyMap) throws Exception {
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

        if("10".equals(docSts)){
            /** STEP0. devSn 으로 pjtSn 호출 */
            Map<String, Object> pjtMap = projectRepository.getPjtSnToDev(params);
            params.put("pjtSn", pjtMap.get("PJT_SN"));

            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndMap = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 RND_FILE_SN 있으면 update */
            if (unRndMap != null && !unRndMap.isEmpty()) {
                if(unRndMap.containsKey("UN_RND_FILE_SN") && unRndMap.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndMap.get("UN_RND_FILE_SN").toString());
                    projectRepository.setFileCopy(params);
                }
            }
        }
    }

    @Override
    public void updateUnRndResDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectUnRndRepository.updateUnRndResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectUnRndRepository.updateUnRndResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectUnRndRepository.updateUnRndResFinalApprStat(params);

            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            crmRepository.insCrmEngnHist(pjtMap);

            projectUnRndRepository.updUnRndProjectInfoRes(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectUnRndRepository.updateUnRndResApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndMap = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 RND_FILE_SN 있으면 update */
            if (unRndMap != null && !unRndMap.isEmpty()) {
                if(unRndMap.containsKey("UN_RND_FILE_SN") && unRndMap.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndMap.get("UN_RND_FILE_SN").toString());
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
            Map<String, Object> resultMap = projectRepository.getResultInfo(params);

            /** STEP2. resultData 에서 DSGN_FILE_SN, PROD_FILE_SN 있으면 update */
            if (resultMap != null && !resultMap.isEmpty()) {
                if(resultMap.containsKey("DSGN_FILE_SN")){
                    params.put("fileNo", resultMap.get("DSGN_FILE_SN").toString());
                    projectRepository.setResultFileDocNm(params);
                }

                if(resultMap.containsKey("PROD_FILE_SN")){
                    params.put("fileNo", resultMap.get("PROD_FILE_SN").toString());
                    projectRepository.setResultFileDocNm(params);
                }
            }

            /** STEP1. pjtSn 으로 purcFile 호출 */
            List<Map<String, Object>> purcFiles = purcRepository.getProjectReqFile(params);

            /** STEP2. purcFile에 데이터 있으면 update */
            for(Map<String, Object> data : purcFiles){
                data.put("docId", params.get("docId"));
                projectRepository.setPurcFileDocNm(data);
            }
        }
    }
}
