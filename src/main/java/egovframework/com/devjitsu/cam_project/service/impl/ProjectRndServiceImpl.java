package egovframework.com.devjitsu.cam_project.service.impl;

import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProjectRndServiceImpl implements ProjectRndService {

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {

        projectRndRepository.insSubjectInfo(params);

    }
}

