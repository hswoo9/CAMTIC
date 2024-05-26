package egovframework.com.devjitsu.cam_achieve.service;

import java.util.List;
import java.util.Map;

public interface AchieveService {

    Map<String, Object> getAllPjtCalc(Map<String, Object> params);

    List<Map<String, Object>> getEngnList(Map<String, Object> params);
}
