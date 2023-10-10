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
    public void setTeamInfo(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        map = projectMngRepository.getTeamCostData(params);

        if(map == null){
            projectMngRepository.insTeamCostInfo(params);

            projectMngRepository.insTeamCostHistInfo(params);
        } else {
            projectMngRepository.updTeamCostInfo(params);

            projectMngRepository.updTeamCostHistInfo(params);
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
    public List<Map<String, Object>> getTeamCostList(Map<String, Object> params) {
        return projectMngRepository.getTeamCostList(params);
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

    @Override
    public void insTeamCostHistInfo(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();

        map = projectMngRepository.getTeamCostData(params);

        if(map == null){
            projectMngRepository.insTeamCostInfo(params);
        }

        projectMngRepository.insTeamCostHistInfo(params);
    }


    @Override
    public void setProductInfo(Map<String, Object> params) {
        projectMngRepository.setProductInfo(params);
    }

    @Override
    public void setProductUpd(Map<String, Object> params) {
        projectMngRepository.setProductUpd(params);
    }

    @Override
    public void setProductDel(Map<String, Object> params) {
        projectMngRepository.setProductDel(params);
    }

    @Override
    public List<Map<String, Object>> getProductCodeInfo(Map<String, Object> params) {
        return projectMngRepository.getProductCodeInfo(params);
    }

    @Override
    public Map<String, Object> getProductCodeOne(Map<String, Object> params) {
        return projectMngRepository.getProductCodeOne(params);
    }
}
