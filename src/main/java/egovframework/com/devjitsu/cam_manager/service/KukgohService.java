package egovframework.com.devjitsu.cam_manager.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface KukgohService {

    // 공통코드 리스트 조회
    List<Map<String, Object>> getCmmnCodeList(Map<String, Object> params);

    List<Map<String, Object>> getCmmnCodeDetailList(Map<String, Object> params);
}
