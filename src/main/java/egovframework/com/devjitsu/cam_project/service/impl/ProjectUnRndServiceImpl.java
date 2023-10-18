package egovframework.com.devjitsu.cam_project.service.impl;

import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProjectUnRndServiceImpl implements ProjectUnRndService {

    @Autowired
    private ProjectUnRndRepository projectUnRndRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        if(!params.containsKey("pjtSn")){
            projectUnRndRepository.insSubjectInfo(params);
        } else {
            projectUnRndRepository.updSubjectInfo(params);
        }
    }
}
