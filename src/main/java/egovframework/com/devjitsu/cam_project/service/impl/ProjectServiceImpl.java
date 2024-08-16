package egovframework.com.devjitsu.cam_project.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_manager.repository.PayAppRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.g20.repository.PRJRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private BustripRepository bustripRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private G20Repository g20Repository;

    @Autowired
    private PRJRepository prjRepository;

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private ProjectUnRndRepository projectUnRndRepository;

    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private PayAppRepository payAppRepository;
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private MenuManagementService menuManagementService;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Override
    public Map<String, Object> getProjectInfo(Map<String, Object> params) {
        return projectRepository.getProjectInfo(params);
    }

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return projectRepository.getProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getRndProjectList(Map<String, Object> params) {
        return projectRepository.getRndProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getDepoManageProjectList(Map<String, Object> params) {
        return projectRepository.getDepoManageProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getAllProjectList(Map<String, Object> params) {
        return projectRepository.getAllProjectList(params);
    }

    @Override
    public Map<String, Object> getProjectDataOne(Map<String, Object> params) {
        return projectRepository.getProjectDataOne(params);
    }

    @Override
    public List<Map<String, Object>> getG20ProjectList(Map<String, Object> params) {
        List<Map<String, Object>> g20List = g20Repository.getG20ProjectList(params);

        List<Map<String, Object>> list = new ArrayList<>();
        for(Map<String, Object> map : g20List){
            Map<String, Object> tempMap = projectRepository.getProjectCodeData(map);

            if(tempMap != null){
                /** 사업비 분리사용 체크 Y면 분리사용임 */
                if(tempMap.containsKey("SBJ_SEP") && "Y".equals(tempMap.get("SBJ_SEP").toString())){
                    map.put("pjtSn", tempMap.get("PJT_SN"));

                    Map<String, Object> amtMap = projectRepository.getCbAmtByAccount(map);
                    map.put("PJT_AMT", amtMap.get("BUDGET_AMT"));
                }else{
                    map.put("PJT_AMT", tempMap.get("PJT_AMT"));
                }
                map.put("BUSN_CLASS", tempMap.get("BUSN_CLASS"));
                map.put("BUSN_NM", tempMap.get("BUSN_NM"));
                map.put("STR_DT", tempMap.get("STR_DT"));
                map.put("END_DT", tempMap.get("END_DT"));
                map.put("PM", tempMap.get("PM"));
                map.put("EMP_NAME", tempMap.get("EMP_NAME"));
                map.put("PJT_STEP_NM", tempMap.get("PJT_STEP_NM"));
            } else {
                map.put("BUSN_CLASS", "");
                map.put("BUSN_NM", "");
                map.put("STR_DT", "");
                map.put("END_DT", "");
                map.put("PJT_AMT", "");
                map.put("PM", "");
                map.put("EMP_NAME", "");
                map.put("PJT_STEP_NM", "");
            }
            list.add(map);
        }

        return list;
    }

    @Override
    public void setProject(Map<String, Object> params) {

        String key = "";

        // 프로젝트 신규 등록 O
        if(!params.containsKey("pjtSn")){
            projectRepository.insProject(params);
            projectRepository.insPjtEngn(params);
            key = params.get("PJT_SN").toString();
        } else {
            projectRepository.updProjectInfo(params);
            projectRepository.updPjtEngn(params);
            key = params.get("pjtSn").toString();
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
    public Map<String, Object> getProjectStep(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        result = projectRepository.getProjectStep(params);
        return result;
    }

    @Override
    public List<Map<String, Object>> getMultiPjtList(Map<String, Object> params) {
        return projectRepository.getMultiPjtList(params);
    }

    @Override
    public List<Map<String, Object>> getTeamPjtList(Map<String, Object> params) {
        return projectRepository.getTeamPjtList(params);
    }

    @Override
    public void delProject(Map<String, Object> params) {
        projectRepository.delProject(params);
    }

    @Override
    public void delPjtBustrip(Map<String, Object> params) {
        bustripRepository.delPjtBustrip(params);
    }

    @Override
    public Map<String, Object> getProjectData(Map<String, Object> params) {
        return projectRepository.getProjectData(params);
    }


    @Override
    public void setEstInfo(Map<String, Object> params) {
        projectRepository.insEngnEstInfo(params);

        projectRepository.updProject(params);
        projectRepository.updEngn(params);
        projectRepository.updEngnAmt(params);
    }

    @Override
    public void setEstInfoDel(Map<String, Object> params) {
        projectRepository.setEstInfoDel(params);
        projectRepository.delEstSub(params);

        projectRepository.updEngnAmt(params);
    }

    @Override
    public Map<String, Object> getEstData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> estList = projectRepository.getEstList(params);

        if(estList.size() != 0){
            result.put("estList", estList);
//            params.put("estSn", estList.get(estList.size() - 1).get("EST_SN"));
            result.put("estSubList", projectRepository.getEstSubList(params));
        }

        return result;
    }

    @Override
    public Map<String, Object> getGoodsData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> estList = projectRepository.getEstList(params);

        if(estList.size() != 0){
            result.put("estList", estList);
            params.put("estSn", estList.get(estList.size() - 1).get("EST_SN"));
            result.put("estSubList", projectRepository.getEstSubList(params));
        }

        return result;
    }

    @Override
    public void setEstSub(Map<String, Object> params) {
        projectRepository.insEngnEstSub(params);
    }


    @Override
    public Map<String, Object> getStep1SubData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("estSub", projectRepository.getEstData(params));
        result.put("estSubList", projectRepository.getEstSubList(params));

        return result;
    }


    @Override
    public void insStep2(Map<String, Object> params) {

        int modCheck = projectRepository.checkModStep2(params);
        projectRepository.insStep2(params);

        // 전자결재 개발 완료 시 결재완료 시점으로 이동
        if(modCheck == 0) {
            projectRepository.updProjectStep(params);
            projectRepository.updProjectEngnStep(params);
        }
    }

    @Override
    public void insStep3(Map<String, Object> params) {

        int modCheck = projectRepository.checkModStep3(params);

        projectRepository.insStep3(params);
        if(modCheck == 0) {
            // 전자결재 개발 완료 시 결재완료 시점으로 이동
            projectRepository.updProjectStep(params);
            projectRepository.updProjectEngnStep(params);
        }
    }

    @Override
    public void setDevInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        int modCheck = projectRepository.checkModStep3(params);

        int checkAddVersion = projectRepository.checkAddVersion(params);

        Map<String, Object> map = new HashMap<>();


        if(checkAddVersion != 0){
            map = projectRepository.getDevData(params);
            params.put("devSn", map.get("DEV_SN"));
            projectRepository.updDevInfo(params);
        } else {
            projectRepository.insDevInfo(params);
        }

        projectRepository.updInvAndPs(params);


        if(modCheck == 0) {
            // 전자결재 개발 완료 시 결재완료 시점으로 이동
            projectRepository.updProject(params);
//            projectRepository.updEngn(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile estFile = request.getFile("estFile");
        MultipartFile devFile = request.getFile("devFile");

        if(estFile != null){
            if(!estFile.isEmpty()){
                params.put("menuCd", "devEstFile");
                fileInsMap = mainLib.fileUpload(estFile, filePath(params, SERVER_DIR));
                fileInsMap.put("devSn", params.get("devSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updDevEstFile(fileInsMap);
            }
        }
    }

    @Override
    public void setDevInfoDel(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        projectRepository.setDevInfoDel(params);
    }

    @Override
    public void insStep4(Map<String, Object> params) {
        int modCheck = projectRepository.checkModStep4(params);

        projectRepository.insStep4(params);

        if(modCheck == 0) {
            // 전자결재 개발 완료 시 결재완료 시점으로 이동
            projectRepository.updProjectStep(params);
            projectRepository.updProjectEngnStep(params);
        }
    }

    @Override
    public void updProjectDelv(Map<String, Object> params) {
        int pjtCdCnt = projectRepository.cntProjectCode(params);
        params.put("pjtCd", params.get("pjtTmpCd") + String.format("%02d", pjtCdCnt+1));
        projectRepository.updProjectDelv(params);

        int checkProjectCnt = projectRepository.checkProjectCode(params);

        if(checkProjectCnt == 0){
            projectRepository.updProjectDelvFn(params);
        }
    }

    @Override
    public Map<String, Object> getDelvData(Map<String, Object> params) {
        return projectRepository.getDelvData(params);
    }

    @Override
    public Map<String, Object> getDelvFile(Map<String, Object> params) {
        Map<String, Object> map = projectRepository.getDelvData(params);

        return projectRepository.getDelvFile(map);
    }

    @Override
    public Map<String, Object> getDevFile(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("devFile", projectRepository.getDevFile(params));
        result.put("estFile", projectRepository.getEstFile(params));

        return result;
    }

    @Override
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return projectRepository.groupCodeList(params);
    }

    @Override
    public void saveGroupCode(Map<String, Object> params) {
        projectRepository.saveGroupCode(params);
    }

    @Override
    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return projectRepository.codeList(params);
    }

    @Override
    public void insSetLgCode(Map<String, Object> params) {
        projectRepository.insSetLgCode(params);
    }

    @Override
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return projectRepository.smCodeList(params);
    }


    @Override
    public void insPjtCode(Map<String, Object> params) {
        projectRepository.insPjtCode(params);
    }

    @Override
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return projectRepository.selLgCode(params);
    }

    @Override
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return projectRepository.selSmCode(params);
    }

    @Override
    public List<Map<String, Object>> getDevPjtVerList(Map<String, Object> params) {
        return projectRepository.getDevPjtVerList(params);
    }

    @Override
    public Map<String, Object> getStep3PmInfo(Map<String, Object> params) {
        Map<String, Object> map = projectRepository.getDelvData(params);


        return projectRepository.getStep3PmInfo(map);
    }

    @Override
    public void insPjtPs(Map<String, Object> params) {
        projectRepository.insPjtPs(params);
    }

    @Override
    public List<Map<String, Object>> getProcessList(Map<String, Object> params) {
        return projectRepository.getProcessList(params);
    }

    @Override
    public List<Map<String, Object>> getProcessList2(Map<String, Object> params) {
        return projectRepository.getProcessList2(params);
    }

    @Override
    public void updProcess(Map<String, Object> params) {
        projectRepository.updProcess(params);
    }

    @Override
    public void delProcess(Map<String, Object> params) {
        projectRepository.delProcess(params);
    }

    @Override
    public void insInvData(Map<String, Object> params) {
        projectRepository.insInvData(params);
    }

    @Override
    public List<Map<String, Object>> getInvList(Map<String, Object> params) {
        return projectRepository.getInvList(params);
    }

    @Override
    public List<Map<String, Object>> getTeamInvList(Map<String, Object> params) {
        return projectRepository.getTeamInvList(params);
    }

    @Override
    public void updInvest(Map<String, Object> params) {
        projectRepository.updInvest(params);
    }

    @Override
    public void updPjtDevTotAmt(Map<String, Object> params) {
        projectRepository.updPjtDevTotAmt(params);
    }

    @Override
    public void delInvest(Map<String, Object> params) {
        projectRepository.delInvest(params);
        if(params.containsKey("ck")){
            projectRepository.updDevInfoAmt(params);
        }
    }

    @Override
    public Map<String, Object> getDevelopPlan(Map<String, Object> params) {
        return projectRepository.getDevelopPlan(params);
    }

    @Override
    public Map<String, Object> getPjtSnToDev(Map<String, Object> params) {
        return projectRepository.getPjtSnToDev(params);
    }

    @Override
    public List<Map<String, Object>> getPsList(Map<String, Object> params) {
        return projectRepository.getPsList(params);
    }

    @Override
    public void updStep5(Map<String, Object> params) {
        projectRepository.updStep5(params);
        projectRepository.updStepEst5(params);
        projectRepository.delStepEstSub5(params);

        int checkDelvStat = projectRepository.checkDelvStat(params);
        if(checkDelvStat == 0){
            projectRepository.updProjectStep(params);
            projectRepository.updProjectEngnStep(params);
        }
    }

    @Override
    public void setEngnCrmInfo(Map<String, Object> params) {
        projectRepository.updEngnCrmInfo(params);

        projectRepository.updProject(params);
        projectRepository.updEngn(params);
    }

    @Override
    public void setBustInfo(Map<String, Object> params) {
        projectRepository.updBustInfo(params);
    }

    @Override
    public void setDelvInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.containsKey("delvSn")){
            projectRepository.updDelvInfo(params);
        } else {
            projectRepository.insDelvInfo(params);
            projectRepository.updProject(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile delvFile = request.getFile("delvFile");
        params.put("menuCd", "delvFile");
        if(delvFile != null){
            if(!delvFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(delvFile, filePath(params, SERVER_DIR));
                fileInsMap.put("delvSn", params.get("delvSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updDelvFile(fileInsMap);
            }
        }
    }

    @Override
    public void setDelvApprove(Map<String, Object> params) {
        projectRepository.updProjectTmpCode(params);
        projectRepository.updDelvApproveStat(params);

        /** 최종 승인 일때 프로젝트 코드 생성 및 다음단계 활성화 */
        if(params.containsKey("ck")){
            Map<String, Object> pjtMap = projectRepository.getProjectData(params);

            if(pjtMap.get("BUSN_CLASS").toString().equals("D") || pjtMap.get("BUSN_CLASS").toString().equals("V")){
                projectRepository.updEngnProjectCode(pjtMap);
                params.put("pjtStep", "E3");
                params.put("pjtStepNm", "수주보고");
                projectRepository.updProjectStep(params);

            }else if(pjtMap.get("BUSN_CLASS").toString().equals("R") || pjtMap.get("BUSN_CLASS").toString().equals("S")){
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
                } catch(Exception e){
                    e.printStackTrace();
                }

                if(pjtMap.get("BUSN_CLASS").toString().equals("R")){
                    projectRndRepository.updRndProjectInfo(params);
                    params.put("pjtStep", "R2");
                    params.put("pjtStepNm", "수주보고");
                }else{
                    projectUnRndRepository.updUnRndProjectInfo(params);
                    params.put("pjtStep", "S2");
                    params.put("pjtStepNm", "수주보고");
                }
                projectRepository.updProjectStep(params);
            }

            params.put("type", "프로젝트 수주승인요청");
            params.put("frKey", params.get("pjtSn"));
            campusRepository.updPsStatus(params);
        }
    }

    @Override
    public void updDelvApproveStat(Map<String, Object> params) {
        projectRepository.updDelvApproveStat(params);

        if(params.containsKey("ck")){
            Map<String, Object> pjtMap = projectRepository.getProjectData(params);

            if(pjtMap.get("BUSN_CLASS").toString().equals("D") || pjtMap.get("BUSN_CLASS").toString().equals("V")){
                projectRepository.updEngnProjectCode(pjtMap);
                params.put("pjtStep", "E3");
                params.put("pjtStepNm", "수주보고");
                projectRepository.updProjectStep(params);

            }else if(pjtMap.get("BUSN_CLASS").toString().equals("R") || pjtMap.get("BUSN_CLASS").toString().equals("S")){
                try{
                    /** 사업비 분리 : 테이블 조회해서 데이터 없으면 단일(0)으로 생성, 있으면 for문 */
                    params.put("pjtTmpCd", pjtMap.get("PJT_TMP_CD"));
                    params.put("pProjectNM", pjtMap.get("PJT_NM"));
                    params.put("pProjectNMEx", pjtMap.get("BS_TITLE"));
                    params.put("pSDate", pjtMap.get("G20_STR_DT"));
                    params.put("pEDate", pjtMap.get("G20_END_DT"));
                    params.put("pType", "I");

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
                                params.put("pjtCd", params.get("pProjectCD"));
                                projectRepository.updProjectCode(params);
                            }
                            // G20 프로젝트 추가
                            g20Repository.insProject(params);
                        }
                    }
                } catch(Exception e){
                    e.printStackTrace();
                }

                if(pjtMap.get("BUSN_CLASS").toString().equals("R")){
                    projectRndRepository.updRndProjectInfo(params);
                    params.put("pjtStep", "R2");
                    params.put("pjtStepNm", "수주보고");
                }else{
                    projectUnRndRepository.updUnRndProjectInfo(params);
                    params.put("pjtStep", "S2");
                    params.put("pjtStepNm", "수주보고");
                }
                projectRepository.updProjectStep(params);
            }

            params.put("type", "프로젝트 수주승인요청");
            params.put("frKey", params.get("pjtSn"));
            campusRepository.updPsStatus(params);
        }
    }

    @Override
    public void updateDelvDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectRepository.updateDelvApprStat(params);
        }else if("20".equals(docSts)) { // 중간결재
            projectRepository.updateDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateDelvFinalApprStat(params);
        }else if("111".equals(docSts)){ // 임시저장
            projectRepository.updateDelvApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 delvData 호출 */
            Map<String, Object> delvMap = projectRepository.getDelvData(params);

            /** STEP2. delvData 에서 DELV_FILE_SN 있으면 update */
            if (delvMap != null && !delvMap.isEmpty()) {
                if(delvMap.containsKey("DELV_FILE_SN") && delvMap.get("DELV_FILE_SN") != null){
                    params.put("fileNo", delvMap.get("DELV_FILE_SN").toString());
                    projectRepository.setDelvFileDocNm(params);
                }
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
    public void updateDevDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectRepository.updateDevApprStat(params);
        }else if("20".equals(docSts) ) { // 중간 결재
            projectRepository.updateDevApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateDevApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateDevFinalApprStat(params);
            params.put("pjtStep", "E4");
            params.put("pjtStepNm", "공정");
            projectRepository.updProjectStepDev(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRepository.updateDevApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP0. devSn 으로 pjtSn 호출 */
            Map<String, Object> pjtMap = projectRepository.getPjtSnToDev(params);
            params.put("pjtSn", pjtMap.get("PJT_SN"));

            /** STEP1. pjtSn 으로 delvData 호출 */
            Map<String, Object> delvMap = projectRepository.getDelvData(params);

            /** STEP2. delvData 에서 DELV_FILE_SN 있으면 update */
            if (delvMap != null && !delvMap.isEmpty()) {
                if(delvMap.containsKey("DELV_FILE_SN") && delvMap.get("DELV_FILE_SN") != null){
                    params.put("fileNo", delvMap.get("DELV_FILE_SN").toString());
                    projectRepository.setDelvFileCopy(params);
                }
            }
        }
    }

    @Override
    public void updateResDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectRepository.updateResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateResFinalApprStat(params);

            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            crmRepository.insCrmEngnHist(pjtMap);

            params.put("pjtStep", "E6");
            params.put("pjtStepNm", "결과보고");
            projectRepository.updProjectStep(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRepository.updateDevApprStat(params);
        }

        if("10".equals(docSts)){

            /** STEP1. pjtSn 으로 delvData 호출 */
            Map<String, Object> delvMap = projectRepository.getDelvData(params);

            /** STEP2. delvData 에서 DELV_FILE_SN 있으면 update */
            if (delvMap != null && !delvMap.isEmpty()) {
                if(delvMap.containsKey("DELV_FILE_SN") && delvMap.get("DELV_FILE_SN") != null){
                    params.put("fileNo", delvMap.get("DELV_FILE_SN").toString());
                    projectRepository.setDelvFileCopy(params);
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
                if(resultMap.containsKey("DEV_FILE_SN")){
                    params.put("fileNo", resultMap.get("DEV_FILE_SN").toString());
                    projectRepository.setResultFileDocNm(params);
                }
            }

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
    public void updateCostDocState(Map<String, Object> bodyMap) throws Exception {
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
            projectRepository.updateCostApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateCostApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateCostFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRepository.updateCostApprStat(params);
        }
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return projectRepository.getCrmInfo(params);
    }

    @Override
    public Map<String, Object> getBustInfo(Map<String, Object> params) {
        return projectRepository.getBustInfo(params);
    }

    @Override
    public Map<String, Object> getDevData(Map<String, Object> params) {
        return projectRepository.getDevData(params);
    }

    @Override
    public void stopProject(Map<String, Object> params) {
        projectRepository.stopProject(params);
    }

    @Override
    public void setProcessInfo(Map<String, Object> params, MultipartFile[] fileList1, MultipartFile[] fileList2, MultipartFile[] fileList3, MultipartFile[] fileList4, MultipartFile[] fileList5, MultipartFile[] fileList6, String serverDir, String baseDir) {

        Map<String, Object> psPrepMap = new HashMap<>();

        psPrepMap = projectRepository.getPsPrepInfo(params);

        if(psPrepMap == null) {
            projectRepository.insPsPrepInfo(params);
        } else {
            params.put("psFileSn", psPrepMap.get("PS_FILE_SN"));
            projectRepository.updPsPrepInfo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList1.length > 0){
            params.put("menuCd", "engnPsFile1");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList1, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(fileList2.length > 0){
            params.put("menuCd", "engnPsFile2");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList2, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(fileList3.length > 0){
            params.put("menuCd", "engnPsFile3");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList3, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(fileList4.length > 0){
            params.put("menuCd", "engnPsFile4");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList4, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(fileList5.length > 0){
            params.put("menuCd", "engnPsFile5");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList5, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        if(fileList6.length > 0){
            params.put("menuCd", "engnPsFile6");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList6, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("psFileSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        projectRepository.updProject(params);
        projectRepository.updEngn(params);
    }

    @Override
    public Map<String, Object> getPsFile(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> psPrepMap = new HashMap<>();

        psPrepMap = projectRepository.getPsPrepInfo(params);

        if(psPrepMap == null) {
            return null;
        }

        params.put("psFileSn", psPrepMap.get("PS_FILE_SN"));

        result.put("psFile1List", projectRepository.getPsFile1(params));
        result.put("psFile2List", projectRepository.getPsFile2(params));
        result.put("psFile3List", projectRepository.getPsFile3(params));
        result.put("psFile4List", projectRepository.getPsFile4(params));
        result.put("psFile5List", projectRepository.getPsFile5(params));
        result.put("psFile6List", projectRepository.getPsFile6(params));

        return result;
    }

    @Override
    public Map<String, Object> setGoodsInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        projectRepository.updGoodsInfo(params);

        Map<String, Object> map =  projectRepository.getEstData(params);
        params.put("estSn", map.get("EST_SN"));
        Map<String, Object> devMap = projectRepository.getDevData(params);
        params.put("devSn", devMap.get("DEV_SN"));

        projectRepository.updEstInfo(params);
        projectRepository.delEstSub(params);

        projectRepository.updProject(params);
        projectRepository.updProjectGoods(params);

        return params;
    }


    @Override
    public void setEstSubMod(Map<String, Object> params) {
        projectRepository.insEngnEstSub(params);
    }


    @Override
    public void setResultInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        Map<String, Object> map = new HashMap<>();

        map = projectRepository.getResultInfo(params);

        if(map == null){
            projectRepository.insResultInfo(params);
        } else {
            params.put("rsSn", map.get("RS_SN"));
            projectRepository.updResultInfo(params);
        }
        params.put("menuCd", "engnRsFile");

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile devFile = request.getFile("devFile");
        MultipartFile designImg = request.getFile("designImg");
        MultipartFile prodImg = request.getFile("prodImg");

        if(devFile != null){
            if(!devFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(devFile, filePath(params, serverDir));
                fileInsMap.put("contentId", "prjEngnRs_" + params.get("rsSn"));
                fileInsMap.put("crmSn", params.get("rsSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rsSn", params.get("rsSn"));
                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updResultDevFile(fileInsMap);
            }
        }

        if(designImg != null){
            if(!designImg.isEmpty()){
                fileInsMap = mainLib.fileUpload(designImg, filePath(params, serverDir));
                fileInsMap.put("contentId", "prjEngnRs_" + params.get("rsSn"));
                fileInsMap.put("crmSn", params.get("rsSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rsSn", params.get("rsSn"));
                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updResultDesignFile(fileInsMap);
            }
        }

        if(prodImg != null){
            if(!prodImg.isEmpty()){
                fileInsMap = mainLib.fileUpload(prodImg, filePath(params, serverDir));
                fileInsMap.put("contentId", "prjEngnRs_" + params.get("rsSn"));
                fileInsMap.put("crmSn", params.get("rsSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rsSn", params.get("rsSn"));
                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updResultProdFile(fileInsMap);
            }
        }

        projectRepository.updProject(params);
        projectRepository.updEngn(params);
    }

    @Override
    public void setPerformanceInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        Map<String, Object> map = new HashMap<>();
        map = projectRepository.getResultInfo(params);
        if(map == null){
            projectRepository.insPerformanceInfo(params);
        } else {
            params.put("rsSn", map.get("RS_SN"));
            projectRepository.setPerformanceInfo(params);
        }
    }

    @Override
    public Map<String, Object> getResultInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> map = projectRepository.getResultInfo(params);
        result.put("map", map);
        result.put("devFileList", projectRepository.getGoodsFile(map));
        result.put("designFileList", projectRepository.getDesignFile(map));
        result.put("prodFileList", projectRepository.getProdFile(map));
        return result;
    }

    @Override
    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return projectRepository.getTeamList(params);
    }

    @Override
    public Map<String, Object> getTeamInfo(Map<String, Object> params) {
        return projectRepository.getTeamInfo(params);
    }

    @Override
    public Map<String, Object> getBustResInfo(Map<String, Object> params) {
        return projectRepository.getBustResInfo(params);
    }

    @Override
    public void setTeamInfo(Map<String, Object> params) {
        try{
            projectRepository.insTeamProject(params);

            projectRepository.insTeamInfo(params);

            projectRepository.updTeamProject(params);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void setCostInfo(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = projectRepository.getCostData(params);

        if(map == null){
            projectRepository.insCostInfo(params);
        } else {
            projectRepository.updCostInfo(params);
        }
    }

    @Override
    public Map<String, Object> getProjectDocInfo(Map<String, Object> params) {
        return projectRepository.getProjectDocInfo(params);
    }

    @Override
    public void addDevVersion(Map<String, Object> params) {

        List<Map<String, Object>> list = projectRepository.getPsList(params);
        List<Map<String, Object>> list2 = projectRepository.getInvList2(params);

        projectRepository.addDevVersion(params);

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

        for(Map<String, Object> map : list2){
            params.put("invRow", map.get("INV_ROW"));
            params.put("divCd", map.get("DIV_CD"));
            params.put("divNm", map.get("DIV_NM"));
            params.put("invNm", map.get("INV_NM"));
            params.put("invCnt", map.get("INV_CNT"));
            params.put("invUnit", map.get("INV_UNIT"));
            params.put("invUnitPrice", map.get("INV_UNIT_PRICE"));
            params.put("estTotAmt", map.get("EST_TOT_AMT"));
            params.put("estOfc", map.get("EST_OFC"));
            params.put("invEtc", map.get("INV_ETC"));
            params.put("regEmpSeq", map.get("REG_EMP_SEQ"));

            projectRepository.insInvData(params);
        }
    }

    @Override
    public void setDevTeamApp(Map<String, Object> params) {
        projectRepository.setDevTeamApp(params);
    }

    @Override
    public void setPjtTeamApp(Map<String, Object> params) {
        projectRepository.setPjtTeamApp(params);
    }

    @Override
    public List<Map<String, Object>> getPartRateVersionList(Map<String, Object> params) {
        return projectRepository.getPartRateVersionList(params);
    }

    @Override
    public Map<String, Object> getPartRateVer(Map<String, Object> params) {
        return projectRepository.getPartRateVer(params);
    }

    @Override
    public Map<String, Object> getPartRateBefVer(Map<String, Object> params) {
        return projectRepository.getPartRateBefVer(params);
    }

    @Override
    public Map<String, Object> getMngPartRate(Map<String, Object> map) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> projectMemberInfo = new ArrayList<>();

        String busnClass = map.get("busnClass").toString();
        Map<String, Object> manageInfo = new HashMap<>();
        if(busnClass.equals("R")){
            manageInfo = projectRepository.getProjectManagerInfo(map);
        }else if(busnClass.equals("S")){
            manageInfo = projectRepository.getProjectUnRndManagerInfo(map);
        }
        result.put("projectManagerInfo", manageInfo);

        if(!"".equals(map.get("JOIN_MEM_SN"))){
            String[] strArr = map.get("JOIN_MEM_SN").toString().split(",");
            String[] dtStrArr = strArr;

            dtStrArr = Arrays.stream(strArr).distinct().toArray(String[]::new);
            for(String str : dtStrArr){
            //if(!str.equals(manageInfo.get("MNG_EMP_SEQ").toString())){
                if("undefined".equals(str)){
                    continue;
                }

                map.put("MEMBER_SEQ", str);

                int cnt = 0;
                for(String cntStr : strArr){
                    if(str.equals(cntStr)){
                        cnt++;
                    }
                }
                List<Map<String, Object>> memberData = new ArrayList<>();
                memberData = projectRepository.getProjectMemberInfo(map);
                int tmpCnt = cnt - memberData.size();

                for(int i = 0 ; i < tmpCnt ; i++){
                    memberData.add(projectRepository.getProjectMemberTemp(map));
                }

                for(Map<String, Object> data : memberData){
                    if(!data.containsKey("EMP_SEQ")){
                        Map<String, Object> tempMap = new HashMap<>();
                        tempMap.put("empSeq", str);
                        Map<String, Object> empInfo = payAppRepository.getEmpInfo(tempMap);

                        data.put("EMP_NAME", empInfo.get("EMP_NAME_KR"));
                        data.put("EMP_SEQ", empInfo.get("EMP_SEQ"));
                        data.put("POSITION_NAME", empInfo.get("POSITION_NAME"));
                        data.put("DUTY_NAME", empInfo.get("DUTY_NAME"));
                    }

                    projectMemberInfo.add(data);
                }
            //}
            }
        }

        List<Map<String, Object>> manageArr = new ArrayList<>();
        List<Map<String, Object>> nonManageArr = new ArrayList<>();
        boolean flag = true;

        for(Map<String, Object> data2 : projectMemberInfo){
            if(data2.containsKey("GUBUN")){
                if(data2.get("GUBUN").toString().equals("책임자")){
                    manageArr.add(data2);
                }else{
                    nonManageArr.add(data2);
                }
            }else{
                flag = false;
                break;
            }
        }

        List<Map<String, Object>> finalList = new ArrayList<>(manageArr);
        finalList.addAll(nonManageArr);

        if(flag) {
            result.put("projectMemberInfo", finalList);
        }else{
            result.put("projectMemberInfo", projectMemberInfo);
        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getProjectBudgetList(Map<String, Object> params) {
        return projectRepository.getProjectBudgetList(params);
    }

    @Override
    public Map<String, Object> getProjectBudgetTotal(Map<String, Object> params) {
        return projectRepository.getProjectBudgetTotal(params);
    }

    @Override
    public List<Map<String, Object>> getProjectBudgetListSum(Map<String, Object> params) {
        return projectRepository.getProjectBudgetListSum(params);
    }

    @Override
    public Map<String, Object> getProjectTotalData(Map<String, Object> params) {
        return projectRepository.getProjectTotalData(params);
    }

    @Override
    public List<Map<String, Object>> getResultPsMember(Map<String, Object> params) {
        return projectRepository.getResultPsMember(params);
    }

    @Override
    public void delTeamProject(Map<String, Object> params) {
        projectRepository.delTeamProject(params);
    }

    @Override
    public Map<String, Object> getBankData(Map<String, Object> params) {
        Map<String, Object> g20ProjectData = g20Repository.getProjectData(params);
        Map<String, Object> map = new HashMap<>();
        if(g20ProjectData != null){
            map = g20Repository.getBankData(g20ProjectData);
        }
        return map;
    }

    @Override
    public Map<String, Object> getG20ProjectData(Map<String, Object> params) {
        return g20Repository.getProjectData(params);
    }

    @Override
    public List<Map<String, Object>> getTeamProjectList(Map<String, Object> params) {
        return projectRepository.getTeamProjectList(params);
    }

    @Override
    public List<Map<String, Object>> getPartRateEmpInfo(Map<String, Object> params) {
        String[] ar = params.get("empList").toString().split(",");


        return projectRepository.partRateEmpInfo(ar);
    }

    @Override
    public void confirmPartRate(Map<String, Object> params) {
        projectRepository.delPartRateMonthData(params);

        List<Map<String, Object>> list = projectRepository.getPartRateDet(params);

        List<Map<String, Object>> listMap = new ArrayList<>();

        for(Map<String, Object> map : list){
            Map<String, Object> partRateMap = new HashMap<>();

            String endDe = map.get("PART_DET_END_DT").toString().split("-")[0] + "-" + map.get("PART_DET_END_DT").toString().split("-")[1] + "-01";

            String strDe = map.get("PART_DET_STR_DT").toString().split("-")[0] + "-" + map.get("PART_DET_STR_DT").toString().split("-")[1] + "-01";
            partRateMap.put("PJT_SN", params.get("pjtSn"));
            partRateMap.put("EMP_SEQ", map.get("PART_EMP_SEQ"));
            partRateMap.put("BS_SAL", map.get("EMP_SAL"));
            partRateMap.put("MON_SAL", map.get("MON_SAL"));
            String year = "";
            while(true){
                if(!year.contains(strDe.split("-")[0])){
                    year += strDe.split("-")[0] + ",";
                }
                partRateMap.put("YEAR", strDe.split("-")[0]);
                partRateMap.put("MON_PAY_" + strDe.split("-")[1] + "_" + strDe.split("-")[0], map.get("PAY_RATE"));
                partRateMap.put("MON_ITEM_" + strDe.split("-")[1] + "_" + strDe.split("-")[0], map.get("ITEM_RATE"));

                if(strDe == endDe || strDe.equals(endDe)){
                    break;
                }

                strDe = LocalDate.parse(strDe).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            }
            partRateMap.put("YEAR", year.substring(0, year.length() - 1));


            listMap.add(partRateMap);
        }

        for(Map<String, Object> map : listMap){
            String yearArr[] = map.get("YEAR").toString().split(",");

            for(int i = 0; i < yearArr.length; i++){
                Map<String, Object> userPRMap = new HashMap<>();
                userPRMap.put("BS_YEAR", yearArr[i]);
                userPRMap.put("PJT_SN", map.get("PJT_SN"));
                userPRMap.put("EMP_SEQ", map.get("EMP_SEQ"));
                userPRMap.put("BS_SAL", map.get("BS_SAL"));
                userPRMap.put("MON_SAL", map.get("MON_SAL"));

                for(int j = 1 ; j <= 12 ; j++){
                    String key = String.format("%02d", j);
                    if(map.containsKey("MON_PAY_" + key + "_" + yearArr[i])){
                        userPRMap.put("MON_PAY_" + key, map.get("MON_PAY_" + key + "_" + yearArr[i]));
                    } else {
                        userPRMap.put("MON_PAY_" + key, 0);
                    }
                    if(map.containsKey("MON_ITEM_" + j + "_" + yearArr[i])){
                        userPRMap.put("MON_ITEM_" + key, map.get("MON_ITEM_" + key + "_" + yearArr[i]));
                    } else {
                        userPRMap.put("MON_ITEM_" + key, 0);
                    }
                }

                projectRepository.insPartRateMonth(userPRMap);
            }

        }


        // 이전버전 STATUS = N 으로 변경
        projectRepository.updPartRateBefVersionStatus(params);

        projectRepository.confirmPartRate(params);
    }

    @Override
    public List<Map<String, Object>> test(Map<String, Object> params) {
        projectRepository.delPartRateMonthData(params);

        List<Map<String, Object>> list = projectRepository.getPartRateDet(params);

        List<Map<String, Object>> listMap = new ArrayList<>();

        for(Map<String, Object> map : list){
            Map<String, Object> partRateMap = new HashMap<>();

            String endDe = map.get("PART_DET_END_DT").toString().split("-")[0] + "-" + map.get("PART_DET_END_DT").toString().split("-")[1] + "-01";

            String strDe = map.get("PART_DET_STR_DT").toString().split("-")[0] + "-" + map.get("PART_DET_STR_DT").toString().split("-")[1] + "-01";
            partRateMap.put("PJT_SN", params.get("pjtSn"));
            partRateMap.put("EMP_SEQ", map.get("PART_EMP_SEQ"));
            partRateMap.put("BS_SAL", map.get("EMP_SAL"));
            partRateMap.put("MON_SAL", map.get("MON_SAL"));
            String year = "";
            while(true){
                if(!year.contains(strDe.split("-")[0])){
                    year += strDe.split("-")[0] + ",";
                }
                partRateMap.put("YEAR", strDe.split("-")[0]);
                partRateMap.put("MON_PAY_" + strDe.split("-")[1] + "_" + strDe.split("-")[0], map.get("PAY_RATE"));
                partRateMap.put("MON_ITEM_" + strDe.split("-")[1] + "_" + strDe.split("-")[0], map.get("ITEM_RATE"));

                if(strDe == endDe || strDe.equals(endDe)){
                    break;
                }

                strDe = LocalDate.parse(strDe).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            }
            partRateMap.put("YEAR", year.substring(0, year.length() - 1));


            listMap.add(partRateMap);
        }

        for(Map<String, Object> map : listMap){
            String yearArr[] = map.get("YEAR").toString().split(",");

            for(int i = 0; i < yearArr.length; i++){
                Map<String, Object> userPRMap = new HashMap<>();
                userPRMap.put("BS_YEAR", yearArr[i]);
                userPRMap.put("PJT_SN", map.get("PJT_SN"));
                userPRMap.put("EMP_SEQ", map.get("EMP_SEQ"));
                userPRMap.put("BS_SAL", map.get("BS_SAL"));
                userPRMap.put("MON_SAL", map.get("MON_SAL"));

                for(int j = 1 ; j <= 12 ; j++){
                    String key = String.format("%02d", j);
                    if(map.containsKey("MON_PAY_" + key + "_" + yearArr[i])){
                        userPRMap.put("MON_PAY_" + key, map.get("MON_PAY_" + key + "_" + yearArr[i]));
                    } else {
                        userPRMap.put("MON_PAY_" + key, 0);
                    }
                    if(map.containsKey("MON_ITEM_" + j + "_" + yearArr[i])){
                        userPRMap.put("MON_ITEM_" + key, map.get("MON_ITEM_" + key + "_" + yearArr[i]));
                    } else {
                        userPRMap.put("MON_ITEM_" + key, 0);
                    }
                }

                projectRepository.insPartRateMonth(userPRMap);
            }

        }

        return listMap;
    }

    @Override
    public void updJoinMember(Map<String, Object> params) {
        projectRepository.updJoinMember(params);
    }

    @Override
    public Map<String, Object> getProjectByPjtCd(Map<String, Object> params) {
        return projectRepository.getProjectByPjtCd(params);
    }

    @Override
    public Map<String, Object> getProjectByPjtCd2(Map<String, Object> params) {
        return projectRepository.getProjectByPjtCd2(params);
    }

    @Override
    public Map<String, Object> getProjectByDocId(Map<String, Object> params) {
        return projectRepository.getProjectByDocId(params);
    }

    @Override
    public Map<String, Object> getProjectByDocId2(Map<String, Object> params) {
        return projectRepository.getProjectByDocId2(params);
    }

    @Override
    public List<Map<String, Object>> getDepositList(Map<String, Object> params) {
        return projectRepository.getDepositList(params);
    }

    @Override
    public Map<String, Object> getDevMap(Map<String, Object> params) {
        return projectRepository.getDevMap(params);
    }

    @Override
    public Map<String, Object> getPartStartBs(Map<String, Object> params) {
        return projectRepository.getPartStartBs(params);
    }

    @Override
    public void delJoinMember(Map<String, Object> params) {
        if(params.containsKey("partRateDet")){
            projectRepository.delJoinMember(params);
        }

        projectRepository.delUpdJoinMember(params);
    }

    @Override
    public List<Map<String, Object>> getFinalPartRateChangeDocList(Map<String, Object> params) {
        return projectRepository.getFinalPartRateChangeDocList(params);
    }

    @Override
    public void setReferencesAdd(Map<String, Object> params) {
        projectRepository.setReferencesAdd(params);
    }

    @Override
    public List<Map<String, Object>> getHistEngnList(Map<String, Object> params) {
        return prjRepository.getHistEngnList(params);
    }

    @Override
    public List<Map<String, Object>> getHistRndList(Map<String, Object> params) {
        return prjRepository.getHistRndList(params);
    }

    @Override
    public List<Map<String, Object>> getHistEduList(Map<String, Object> params) {
        return prjRepository.getHistEduList(params);
    }

    @Override
    public Map<String, Object> getProjectCodeData(Map<String, Object> params) {
        return projectRepository.getProjectCodeData(params);
    }

    @Override
    public void modProcessData(Map<String, Object> params) {
        projectRepository.modProcessData(params);
    }

    @Override
    public void updInvestData(Map<String, Object> params) {
        projectRepository.updInvestData(params);
    }

    @Override
    public Map<String, Object> projectEnterMemberList(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        // 참여인력 정보
        List<Map<String, Object>> partRateMemberList = projectRepository.getPartRateMemberList(params);

        // 수행계획 공정 참여 인원
        List<Map<String, Object>> psMemberList = projectRepository.getPsMemberList(params);

        // 경영지원실 사람들
        List<Map<String, Object>> aceMemberList = projectRepository.getAceMemberList(params);

        // 경영지원실 사람들
        List<Map<String, Object>> partRateAdminList = projectRepository.getPartRateAdminList(params);

        // PM 팀장/부서장
        List<Map<String, Object>> teamReaderList = projectRepository.getTeamReaderList(params);

        result.put("partRateMemberList", partRateMemberList);
        result.put("psMemberList", psMemberList);
        result.put("aceMemberList", aceMemberList);
        result.put("partRateAdminList", partRateAdminList);
        result.put("teamReaderList", teamReaderList);

        return result;
    }

    @Override
    public List<Map<String, Object>> getPjtYear(Map<String, Object> params) {
        return projectRepository.getPjtYear(params);
    }

    @Override
    public List<Map<String, Object>> payAppChooseList(Map<String, Object> params) {
        return projectRepository.payAppChooseList(params);
    }

    @Override
    public void updPayAppChoose(Map<String, Object> params) {
        projectRepository.updPayAppChoose(params);
    }
}


