package egovframework.com.devjitsu.cam_project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<Map<String, Object>> getProjectList(Map<String, Object> params);

    void setProject(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    Map<String, Object> getProjectStep1(Map<String, Object> params);

    void delProject(Map<String, Object> params);

    Map<String, Object> getProjectData(Map<String, Object> params);

    void insStep1(Map<String, Object> params);

    void insStep1Sub(Map<String, Object> params);

    Map<String, Object> getStep1Data(Map<String, Object> params);

    Map<String, Object> getStep1SubData(Map<String, Object> params);

    Map<String, Object> getStep1EstData(Map<String, Object> params);

    void insStep2(Map<String, Object> params);

    void updProjectDelv(Map<String, Object> params);

    Map<String, Object> getStep2DelvData(Map<String, Object> params);
}
