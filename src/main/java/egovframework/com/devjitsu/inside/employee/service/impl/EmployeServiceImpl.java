package egovframework.com.devjitsu.inside.employee.service.impl;

import egovframework.com.devjitsu.inside.employee.repository.EmployRepository;
import egovframework.com.devjitsu.inside.employee.service.EmployService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmployeServiceImpl implements EmployService {

    @Autowired
    private EmployRepository employRepository;

    @Override
    public List<Map<String, Object>> getBusinessParticipationList(Map<String, Object> params) {
        return employRepository.getBusinessParticipationList(params);
    }
}
