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
    public List<Map<String, Object>> personAttendList(Map<String, Object> params) {
        return attendRepository.personAttendList(params);
    }
}
