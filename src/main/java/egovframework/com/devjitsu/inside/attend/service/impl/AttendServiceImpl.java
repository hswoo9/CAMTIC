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
    public List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params) {
        return attendRepository.getPersonAttendStat(params);
    }

    @Override
    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return attendRepository.personAnnvMainList(params);
    }
}
