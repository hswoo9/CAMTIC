package egovframework.com.devjitsu.cam_project.service.impl;

import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProjectRndServiceImpl implements ProjectRndService {

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {

        if(!params.containsKey("pjtSn")){
            projectRndRepository.insSubjectInfo(params);
        } else {
            projectRndRepository.updSubjectInfo(params);
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
}

