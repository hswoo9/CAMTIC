package egovframework.com.devjitsu.cam_project.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectTeamRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectTeamService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProjectTeamServiceImpl implements ProjectTeamService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectTeamRepository projectTeamRepository;
    @Autowired
    private CommonRepository commonRepository;
    @Autowired
    private BustripRepository bustripRepository;
    @Autowired
    private CrmRepository crmRepository;

    @Override
    public List<Map<String, Object>> getTeamVersion(Map<String, Object> params) {
        return projectTeamRepository.getTeamVersion(params);
    }

    @Override
    public List<Map<String, Object>> getTeamList(Map<String, Object> params) {
        return projectTeamRepository.getTeamList(params);
    }

    @Override
    public List<Map<String, Object>> getTeamMngList(Map<String, Object> params) {
        return projectTeamRepository.getTeamMngList(params);
    }

    @Override
    public Map<String, Object> getVerLeftAmt(Map<String, Object> params) {
        return projectTeamRepository.getVerLeftAmt(params);
    }

    @Override
    public void setTeamAddVersion(Map<String, Object> params) {
        projectTeamRepository.setTeamAddVersion(params);

        /** 버전 저장 후 자가 부서 정보 insert */
        projectTeamRepository.setTeamDelv(params);
    }

    @Override
    public void updMyTeam(Map<String, Object> params) {
        projectTeamRepository.updMyTeam(params);
    }

    @Override
    public void setTeam(Map<String, Object> params) {
        projectTeamRepository.setTeam(params);
    }

    @Override
    public void updTeamVersionAppStat(Map<String, Object> params) {
        projectTeamRepository.updTeamVersionAppStat(params);

        if(params.get("stat").toString().equals("100")){
            params.put("teamCk", "1");
            List<Map<String, Object>> list = projectTeamRepository.getTeamList(params);
            for(int i=0; i>list.size(); i++){
                projectTeamRepository.setTeamProject(list.get(i));
            }
        }
    }

    private String filePath(Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}


