package egovframework.com.devjitsu.cam_project.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
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

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return projectRepository.getProjectList(params);
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
        return projectRepository.getProjectStep(params);
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
    }

    @Override
    public Map<String, Object> getEstData(Map<String, Object> params) {
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
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updDevEstFile(fileInsMap);
            }
        }
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
            projectRepository.updEngn(params);
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
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updDelvFile(fileInsMap);
            }
        }

        if(params.containsKey("pjtTmpCd")){
            projectRepository.updProjectTmpCode(params);
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRepository.updateDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateDelvFinalApprStat(params);
            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            projectRepository.updEngnProjectCode(pjtMap);
            params.put("pjtStep", "E3");
            params.put("pjtStepNm", "수주보고");
            projectRepository.updProjectStep(params);
        }

        /*if("10".equals(docSts) || "101".equals(docSts)){
            *//** STEP1. pjtSn 으로 delvData 호출 *//*
            Map<String, Object> delvMap = projectRepository.getDelvData(params);

            *//** STEP2. delvData 에서 DELV_FILE_SN 있으면 update *//*
            if (delvMap != null && !delvMap.isEmpty()) {
                if(delvMap.containsKey("DELV_FILE_SN") && delvMap.get("DELV_FILE_SN") != null){
                    params.put("fileNo", delvMap.get("DELV_FILE_SN").toString());
                    projectRepository.setDelvFileDocNm(params);
                }
            }
        }*/
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRepository.updateDevApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateDevApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateDevFinalApprStat(params);
        }

        /*if("10".equals(docSts) || "101".equals(docSts)){
            *//** STEP1. devSn 으로 pjtSn 찾기 *//*
            Map<String, Object> pjtMap = projectRepository.getPjtSnToDev(params);
            if (pjtMap != null && !pjtMap.isEmpty()) {
                *//** STEP2. pjtSn 으로 devData 호출 *//*
                params.put("pjtSn", pjtMap.get("PJT_SN").toString());
                Map<String, Object> devMap = projectRepository.getDevData(params);

                *//** STEP3. devData 에서 EST_FILE_SN, DEV_FILE_SN 찾기 *//*
                if (devMap != null && !devMap.isEmpty()) {
                    String text = "";
                    if(devMap.containsKey("EST_FILE_SN") && devMap.get("EST_FILE_SN") != null){
                        text += devMap.get("EST_FILE_SN").toString();
                    }
                    if(devMap.containsKey("DEV_FILE_SN") && devMap.get("DEV_FILE_SN") != null){
                        if(!text.equals("")){
                            text += ",";
                        }
                        text += devMap.get("DEV_FILE_SN").toString();
                    }

                    *//** STEP3. EST_FILE_SN 이나 DEV_FILE_SN 있으면 update *//*
                    if(!text.equals("")){
                        params.put("fileNo", text);
                        projectRepository.setDevFileDocNm(params);
                    }
                }
            }
        }*/
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRepository.updateResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateResFinalApprStat(params);
            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            crmRepository.insCrmEngnHist(pjtMap);
        }
        /*if("10".equals(docSts) || "101".equals(docSts)){
            *//** STEP1. pjtSn 으로 resultData 호출 *//*
            Map<String, Object> resultMap = projectRepository.getResultInfo(params);

            *//** STEP2. resultData 에서 DSGN_FILE_SN, PROD_FILE_SN 있으면 update *//*
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
        }*/
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectRepository.updateCostApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRepository.updateCostApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRepository.updateCostFinalApprStat(params);
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
    public void setProcessInfo(Map<String, Object> params, MultipartFile[] fileList1, MultipartFile[] fileList2, MultipartFile[] fileList3, MultipartFile[] fileList4, String serverDir, String baseDir) {

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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
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

        return result;
    }

    @Override
    public Map<String, Object> setGoodsInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        projectRepository.updGoodsInfo(params);

        Map<String, Object> map =  projectRepository.getEstData(params);

        params.put("estSn", map.get("EST_SN"));
        Map<String, Object> devMap = projectRepository.getDevData(params);
        params.put("devSn", devMap.get("DEV_SN"));
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile devFile = request.getFile("devFile");

        if(devFile != null){
            if(!devFile.isEmpty()){
                params.put("menuCd", "devFile");

                fileInsMap = mainLib.fileUpload(devFile, filePath(params, SERVER_DIR));
                fileInsMap.put("devSn", params.get("devSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectRepository.updDevFile(fileInsMap);
            }
        }


        projectRepository.updEstInfo(params);
        projectRepository.delEstSub(params);

        projectRepository.updProject(params);
//        projectRepository.updEngn(params);

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

        MultipartFile designImg = request.getFile("designImg");
        MultipartFile prodImg = request.getFile("prodImg");

        if(designImg != null){
            if(!designImg.isEmpty()){
                fileInsMap = mainLib.fileUpload(designImg, filePath(params, serverDir));
                fileInsMap.put("contentId", "prjEngnRs_" + params.get("rsSn"));
                fileInsMap.put("crmSn", params.get("rsSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
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
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
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
        result.put("designFileList", projectRepository.getDesignFile(map));
        result.put("prodFileList", projectRepository.getProdFile(map));
        return result;
    }

    @Override
    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return projectRepository.getTeamList(params);
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
            for(String str : strArr){
                if(!str.equals(manageInfo.get("MNG_EMP_SEQ").toString())){
                    map.put("MEMBER_SEQ", str);
                    Map<String, Object> memberData = new HashMap<>();

                    memberData = projectRepository.getProjectMemberInfo(map);

                    projectMemberInfo.add(memberData);
                }
            }
        }

        result.put("projectMemberInfo", projectMemberInfo);
        return result;
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
}


