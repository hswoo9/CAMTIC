package egovframework.com.devjitsu.gw.dept.service;

import java.util.List;
import java.util.Map;

public interface DeptService {
    List<Map<String, Object>> getDeptAList(Map<String, Object> params);

    List<Map<String, Object>> getDeptBList(Map<String, Object> params);
}
