package egovframework.com.devjitsu.gw.dept.service.impl;

import egovframework.com.devjitsu.gw.dept.repository.DeptRepository;
import egovframework.com.devjitsu.gw.dept.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptRepository deptRepository;

    @Override
    public List<Map<String, Object>> getDeptAList(Map<String, Object> params) {
        return deptRepository.getDeptAList(params);
    }

    @Override
    public List<Map<String, Object>> getDeptBList(Map<String, Object> params) {
        return deptRepository.getDeptBList(params);
    }
}
