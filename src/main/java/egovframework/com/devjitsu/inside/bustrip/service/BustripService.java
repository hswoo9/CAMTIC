package egovframework.com.devjitsu.inside.bustrip.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BustripService {


    List<Map<String, Object>> getUserList(Map<String, Object> params);

    void setBustripReq(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    List<Map<String, Object>> getBustripReq(Map<String, Object> params);
}
