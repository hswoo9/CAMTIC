package egovframework.com.devjitsu.inside.attend.service;

import java.util.List;
import java.util.Map;

public interface AttendService {
    /** 개인근태리스트 */
    List<Map<String, Object>> personAttendList(Map<String, Object> params);

    /** 개인연차현황 리스트 조회*/
    List<Map<String, Object>> personAnnvMainList(Map<String, Object> params);
}
