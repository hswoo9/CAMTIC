package egovframework.com.devjitsu.cam_project.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<Map<String, Object>> getProjectList(Map<String, Object> params);
}
