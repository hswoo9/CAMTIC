package egovframework.com.devjitsu.inside.attend.service.impl;

import egovframework.com.devjitsu.inside.attend.repository.AttendRepository;
import egovframework.com.devjitsu.inside.attend.service.AttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AttendServiceImpl implements AttendService {

    @Autowired
    private AttendRepository attendRepository;

    @Override
    public List<Map<String, Object>> getPersonAttendList(Map<String, Object> params) {
        return attendRepository.getPersonAttendList(params);
    }

    @Override
    public Map<String, Object> getPersonHrStatus(Map<String, Object> params) {
        return attendRepository.getPersonHrStatus(params);
    }

    @Override
    public Map<String, Object> getPersonHolidayStatus(Map<String, Object> params) {
        return attendRepository.getPersonHolidayStatus(params);
    }

    @Override
    public List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params) {
        return attendRepository.getPersonAttendStat(params);
    }

    @Override
    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return attendRepository.personAnnvMainList(params);
    }

    @Override
    public List<Map<String, Object>> getPersonAnnvInfoList(Map<String, Object> params) {
        return attendRepository.getPersonAnnvInfoList(params);
    }

    @Override
    public Map<String, Object> getAttendAllCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendAllCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getAttendDeptCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendDeptCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getAttendPersonalCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendPersonalCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getSubHolidayApplyList(Map<String, Object> params){
        return attendRepository.getSubHolidayApplyList(params);
    }

    @Override
    public List<Map<String, Object>> getHolidayDetailsAdmin(Map<String,Object> params){
        return attendRepository.getHolidayDetailsAdmin(params);
    }

    @Override
    public List<Map<String, Object>> getVacCodeList2(Map<String, Object> params) {
        return attendRepository.getVacCodeList2(params);
    }

    @Override
    public void setHistoryWorkApplyDel(Map<String, Object> params) {
        attendRepository.setHistoryWorkApplyDel(params);
    }
}
