package egovframework.com.devjitsu.inside.bustrip.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BustripService {


    List<Map<String, Object>> getUserList(Map<String, Object> params);

    void setBustripReq(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    List<Map<String, Object>> getBustripReq(Map<String, Object> params);

    void delBustripReq(Map<String, Object> params);

    Map<String, Object> getBustripReqInfo(Map<String, Object> params);

    List<Map<String, Object>> getBustripReqCheck(Map<String, Object> params);

    List<Map<String, Object>> getBustripTotInfo(Map<String, Object> params);

    /**
     * 출장신청서 전자결재 상태값 업데이트
     * @param bodyMap
     * @throws Exception
     */
    void updateDocState(Map<String, Object> bodyMap) throws Exception;
}
