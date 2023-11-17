package egovframework.com.devjitsu.inside.employee.service;

import java.util.List;
import java.util.Map;

public interface EmployService {
    List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params);

    List<Map<String, Object>> getBusinessParticipationData(Map<String, Object> params);
}
