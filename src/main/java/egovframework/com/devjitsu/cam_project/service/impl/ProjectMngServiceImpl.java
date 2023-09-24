package egovframework.com.devjitsu.cam_project.service.impl;

import egovframework.com.devjitsu.cam_project.repository.ProjectMngRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectMngService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectMngServiceImpl implements ProjectMngService {

    @Autowired
    private ProjectMngRepository projectMngRepository;

    @Autowired
    private CommonRepository commonRepository;


    @Override
    public void setLaborInfo(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        map = projectMngRepository.getLaborData(params);

        if(map == null){
            projectMngRepository.insLaborInfo(params);

            projectMngRepository.insLaborHistInfo(params);
        } else {
            projectMngRepository.updLaborInfo(params);

            projectMngRepository.updLaborHistInfo(params);
        }
    }

    @Override
    public Map<String, Object> getLaborData(Map<String, Object> params) {
        return projectMngRepository.getLaborData(params);
    }

    @Override
    public List<Map<String, Object>> getLaborList(Map<String, Object> params) {
        return projectMngRepository.getLaborList(params);
    }

    @Override
    public void insLaborHistInfo(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = projectMngRepository.getLaborData(params);

        if(map == null){
            projectMngRepository.insLaborInfo(params);
        }

        projectMngRepository.insLaborHistInfo(params);
    }

    @Override
    public Map<String, Object> getLaborHistData(Map<String, Object> params) {
        return projectMngRepository.getLaborHistData(params);
    }

    @Override
    public void delLaborHistData(Map<String, Object> params) {
        projectMngRepository.delLaborHistData(params);
    }
}
