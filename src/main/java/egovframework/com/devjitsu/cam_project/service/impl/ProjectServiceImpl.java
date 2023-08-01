package egovframework.com.devjitsu.cam_project.service.impl;


import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;


}
