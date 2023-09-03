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
    public Map<String, Object> getProjectStep1(Map<String, Object> params) {
        return projectRepository.getProjectStep1(params);
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
    public void insStep1(Map<String, Object> params) {
        int modCheck = projectRepository.checkModStep1(params);
        projectRepository.insStep1(params);

        // 버전관리 (Step)
        if(modCheck == 0){
            projectRepository.updProjectStep(params);
            projectRepository.updProjectEngnStep(params);
        }
    }

    @Override
    public Map<String, Object> getStep1Data(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> estList = projectRepository.getStep1EstList(params);

        if(estList.size() != 0){
            result.put("estList", estList);
            params.put("estSn", estList.get(estList.size() - 1).get("EST_SN"));
            result.put("estSubList", projectRepository.getStep1EstSubList(params));
        }

        return result;
    }

    @Override
    public void insStep1Sub(Map<String, Object> params) {
        projectRepository.insStep1Sub(params);
    }

    @Override
    public Map<String, Object> getStep1SubData(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("estSubList", projectRepository.getStep1EstSubList(params));

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
    public Map<String, Object> getStep2DelvData(Map<String, Object> params) {
        return projectRepository.getStep2DelvData(params);
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
        Map<String, Object> map = projectRepository.getStep2DelvData(params);


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
}
