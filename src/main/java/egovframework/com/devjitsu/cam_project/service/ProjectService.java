package egovframework.com.devjitsu.cam_project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    void setProject(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    Map<String, Object> getProjectStep1(Map<String, Object> params);
}
