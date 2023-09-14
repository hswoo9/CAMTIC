package egovframework.com.devjitsu.cam_project.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Map<String, Object> getStep1EstData(Map<String, Object> params) {
        return projectRepository.getStep1EstData(params);
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
    public void setDevInfo(Map<String, Object> params) {
        int modCheck = projectRepository.checkModStep3(params);

        projectRepository.insDevInfo(params);

        projectRepository.updInvAndPs(params);

        if(modCheck == 0) {
            // 전자결재 개발 완료 시 결재완료 시점으로 이동
            projectRepository.updProject(params);
            projectRepository.updEngn(params);
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
    public void setDelvInfo(Map<String, Object> params) {

        if(params.containsKey("delvSn")){
            projectRepository.updDelvInfo(params);
        } else {
            projectRepository.insDelvInfo(params);
            projectRepository.updProject(params);
            projectRepository.updEngn(params);
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
        params.put("pjtSn", approKey);
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
    }

    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return projectRepository.getCrmInfo(params);
    }

    @Override
    public Map<String, Object> getBustInfo(Map<String, Object> params) {
        return projectRepository.getBustInfo(params);
    }
}


