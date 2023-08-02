package egovframework.com.devjitsu.cam_project.service.impl;


import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return null;
    }
}
