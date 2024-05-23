package egovframework.com.devjitsu.etc.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface EtcService {

    List<Map<String, Object>> getSignInfoList(Map<String, Object> params);

    void setSignInfo(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

}
