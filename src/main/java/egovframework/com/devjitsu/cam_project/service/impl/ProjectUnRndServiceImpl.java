package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
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
                projectUnRndRepository.updUnRndProjectInfo(params);
            } catch(Exception e){
                e.printStackTrace();
            }

            params.put("pjtStep", "S2");
            params.put("pjtStepNm", "수주보고");
            projectRepository.updProjectStep(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectUnRndRepository.updateUnRndDelvApprStat(params);
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
    }
}
